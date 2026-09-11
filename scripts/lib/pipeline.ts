/**
 * Конвейер перевода на промптах из scripts/prompts/ и клиенты провайдеров.
 *
 * Контент (text): main → editor → review → fix. Editor/fix возвращают
 * полный документ (структуру и порядок элементов фиксирует мердж), review —
 * список замечаний, fix правит по ним («критикуй отдельно, правь
 * отдельно», как в translation-agent/Aphra).
 * UI/keys:        main → editor → tech — однозапросная смысловая сверка.
 *
 * Порт логики scripts/lingo_proxy.py (качество которого подтверждено слепым
 * MQM-сравнением) + legacy-адаптер для старых браузерных провайдеров.
 *
 * ⚠️ ЛИМИТ МОДЕЛИ: не более modelConcurrency (раннер ставит 3) одновременных
 *    запросов — общий семафор всех VllmClient процесса; задачи (файл×язык)
 *    раннер гонит пулом. Запросы уходят с пониженным приоритетом vLLM
 *    (--scheduling-policy priority: больше = позже) — перевод не отбивает
 *    канал у интерактивных потребителей модели.
 */
import { loadPrompt } from './prompt-loader.js';
import { loadGlossary } from './glossary-utils.js';
import { normalizeLangCode } from './lang-codes.js';
import type { GlossaryItem } from './types.js';
import { parseWithRepair } from './json-repair.js';
import { reconcileTags, stripInstagramAttributes, normalizeTagQuotes } from './tag-reconcile.js';
import { buildSubtree } from './tree.js';
import type { AIProvider, ProviderType } from './types.js';

// ─────────────────────────────────────────────────────────────────────────────
// Интерфейс провайдера стадии
// ─────────────────────────────────────────────────────────────────────────────

export interface StageRequest {
  system: string;
  user: string;
  temperature?: number;
  maxTokens?: number;
  /** vLLM: response_format json_object (на ретраях битого JSON). */
  jsonMode?: boolean;
  /** Перекрывает requestPriority клиента для этого запроса (0 = поле не слать). */
  priority?: number;
  /**
   * vLLM: рассуждающий режим модели (chat_template_kwargs.enable_thinking).
   * Размышления приходят в message.reasoning, content остаётся чистым;
   * maxTokens увеличивается, т.к. reasoning расходует токены генерации.
   */
  thinking?: boolean;
}

export interface StageClient {
  name: string;
  complete(req: StageRequest): Promise<string>;
  close?(): Promise<void>;
}

// ─────────────────────────────────────────────────────────────────────────────
// vLLM (основной провайдер)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Глобальный шлюз к модели: не более modelConcurrency одновременных запросов.
 * Общий для всех VllmClient процесса. Дефолт 1 (судья и QA-инструменты ходят
 * по одному); раннер поднимает лимит через setModelConcurrency.
 */
let modelConcurrency = 1;
let inFlight = 0;
const waiters: (() => void)[] = [];

export function setModelConcurrency(n: number): void {
  modelConcurrency = Math.max(1, Math.floor(n));
}

async function acquireModelSlot(): Promise<void> {
  while (inFlight >= modelConcurrency) {
    await new Promise<void>((resolve) => waiters.push(resolve));
  }
  inFlight++;
}

function releaseModelSlot(): void {
  inFlight = Math.max(0, inFlight - 1);
  waiters.shift()?.();
}

export class VllmClient implements StageClient {
  name = 'vllm';

  /**
   * @param requestPriority приоритет запросов в очереди vLLM. Сервер запущен
   * с --scheduling-policy priority, семантика из его protocol.py: «lower means
   * earlier handling». Перевод — фоновая работа: ходит с приоритетом >0
   * (позже), чтобы интерактивные потребители модели обгоняли его. 0 — поле
   * не отправляется (совместимо с серверами без priority-scheduling).
   */
  constructor(
    private endpoint: string,
    private model: string,
    private timeoutMs = 600_000,
    private requestPriority = 0,
  ) {}

  /** Быстрая проверка доступности модели до начала любых изменений файлов. */
  async preflight(): Promise<string> {
    let raw: string;
    try {
      const resp = await fetch(`${this.endpoint}/models`, {
        signal: AbortSignal.timeout(10_000),
      });
      raw = await resp.text();
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    } catch (e: any) {
      throw new Error(
        `Модель недоступна на ${this.endpoint} (${e?.message ?? e}).\n` +
          `Поднимите туннель к vLLM и повторите:\n` +
          `  ssh -f -N -L 18000:127.0.0.1:8000 coolswood@192.168.31.18\n` +
          `  (ключ: "$HOME/Library/Application Support/NVIDIA/Sync/config/nvsync.key")`,
      );
    }
    let list: any;
    try {
      list = JSON.parse(raw);
    } catch {
      throw new Error(`Некорректный ответ /models от ${this.endpoint}: ${raw.slice(0, 200)}`);
    }
    const ids: string[] = (list?.data ?? []).map((m: any) => m?.id).filter(Boolean);
    if (ids.length > 0 && !ids.includes(this.model)) {
      throw new Error(
        `Модель «${this.model}» не найдена на ${this.endpoint}. Доступны: ${ids.join(', ')}. ` +
          `Поправьте endpoint/model в scripts/translate.config.json.`,
      );
    }
    return this.model;
  }

  async complete(req: StageRequest): Promise<string> {
    const body: Record<string, unknown> = {
      model: this.model,
      messages: [
        { role: 'system', content: req.system },
        { role: 'user', content: req.user },
      ],
      temperature: req.temperature ?? 0.3,
      max_tokens: req.thinking ? (req.maxTokens ?? 16_384) + 8_192 : (req.maxTokens ?? 16_384),
    };
    if (req.jsonMode) body.response_format = { type: 'json_object' };
    if (req.thinking) body.chat_template_kwargs = { enable_thinking: true };
    const priority = req.priority ?? this.requestPriority;
    if (priority !== 0) body.priority = priority;

    // Транспортные ретраи (5xx/сеть) — с паузой; слот шлюза на время паузы
    // не держится (освобождается между попытками).
    let lastError: unknown = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await acquireModelSlot();
        try {
          const resp = await fetch(`${this.endpoint}/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(this.timeoutMs),
          });
          const text = await resp.text();
          if (!resp.ok) {
            throw new Error(`HTTP ${resp.status}: ${text.slice(0, 300)}`);
          }
          const parsed = JSON.parse(text);
          const content = parsed?.choices?.[0]?.message?.content;
          if (typeof content !== 'string') {
            throw new Error(`Пустой ответ модели: ${text.slice(0, 300)}`);
          }
          return content;
        } finally {
          releaseModelSlot();
        }
      } catch (e: any) {
        lastError = e;
        if (attempt < 3) {
          const pause = 5_000 * attempt;
          console.warn(`⚠️ Сбой запроса к модели (попытка ${attempt}/3): ${e?.message ?? e}. Пауза ${pause / 1000}с.`);
          await new Promise((r) => setTimeout(r, pause));
        }
      }
    }
    throw lastError;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Legacy-адаптер: браузерные провайдеры (ChatGPT/Claude/Gemini/Mistral по CDP)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * LEGACY: оборачивает старый puppeteer-провайдер в интерфейс StageClient.
 * Провайдеры сохранены как есть (заводятся ленивым импортом только при
 * явном --provider chatgpt|claude|gemini|mistral); основной путь — vLLM.
 */
export async function createLegacyClient(type: ProviderType): Promise<StageClient> {
  const { createProvider } = await import('./cli.js');
  const provider: AIProvider = createProvider(type);
  await provider.init();
  return {
    name: `legacy:${type}`,
    async complete(req: StageRequest): Promise<string> {
      return provider.interact(`${req.system}\n\n${req.user}`, {
        shouldStartNewChat: true,
      });
    },
    async close(): Promise<void> {
      await provider.close();
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Сборка промптов — источник истины scripts/prompts/**, ничего не дублируем
// ─────────────────────────────────────────────────────────────────────────────

export type PromptKind = 'text' | 'keys';

/** Хинт формата ответа для стадии MAIN (порт MAIN_EXTRA из lingo_proxy.py). */
const MAIN_EXTRA_TEXT =
  '\n\nФормат ответа для этой стадии:\n' +
  '- Верни ПОЛНЫЙ переведённый JSON: та же структура и те же ключи, что в исходном JSON, ' +
  'все значения переведены. Без комментариев до и после.';

/** Формат глоссария как в lingo_proxy.py (проверенная версия). */
export function formatGlossaryDetailed(items: GlossaryItem[]): string {
  if (items.length === 0) return '';
  return items.map((e) => `- «${e.ru}» → «${e.lang}» (${e.context})`).join('\n');
}

export interface StagePrompts {
  main: string;
  editor: string;
  /** Однозапросная смысловая сверка с правкой (keys/ui; legacy-путь text). */
  tech?: string;
  /** 4-стадийный путь text: ревью (список замечаний) + правка по замечаниям. */
  review?: string;
  fix?: string;
}

/**
 * Рендерит промпты стадий для одного языка: loadPrompt резолвит {{INCLUDE}},
 * {{LANG_STYLE}}, {{TARGET_*}}; сюда добавляется глоссарий ({{GLOSSARY}} — там,
 * где шаблон его использует) и хинт формата для main.
 *
 * text → {main, editor, review, fix} (4-стадийный путь);
 * keys → {main, editor, tech} (однозапросная смысловая сверка).
 */
export async function buildStagePrompts(
  kind: PromptKind,
  lang: string,
  opts: { promptsDir?: string; glossaryPath?: string } = {},
): Promise<StagePrompts> {
  let glossaryText = '';
  if (opts.glossaryPath) {
    const items = await loadGlossary(opts.glossaryPath);
    glossaryText = formatGlossaryDetailed(items);
  }
  const inject = (p: string) => p.split('{{GLOSSARY}}').join(glossaryText);
  if (kind === 'text') {
    const [main, editor, review, fix] = await Promise.all([
      loadPrompt(kind, 'main', lang),
      loadPrompt(kind, 'editor', lang),
      loadPrompt(kind, 'review', lang),
      loadPrompt(kind, 'fix', lang),
    ]);
    return {
      main: inject(main) + MAIN_EXTRA_TEXT,
      editor: inject(editor),
      review: inject(review),
      fix: inject(fix),
    };
  }
  const [main, editor, tech] = await Promise.all([
    loadPrompt(kind, 'main', lang),
    loadPrompt(kind, 'editor', lang),
    loadPrompt(kind, 'tech', lang),
  ]);
  return {
    main: inject(main),
    editor: inject(editor),
    tech: inject(tech),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Конвейер: main → editor → tech (порт translate() из lingo_proxy.py)
// ─────────────────────────────────────────────────────────────────────────────

/** Маркеры «правок нет» — только короткий ответ целиком, не substring (порт gemini-workflow). */
const NO_CHANGES_MARKERS = ['все хорошо', 'всё хорошо', 'all set'];
function isNoChangesMarker(raw: string): boolean {
  const trimmed = raw.trim();
  if (trimmed.length > 60) return false;
  const lower = trimmed.toLowerCase();
  return NO_CHANGES_MARKERS.some((m) => lower === m || lower === `${m}.`);
}

/** Плоская карта «путь → скаляр» (все листья, не только строки) — как flatten() прокси. */
function flattenAll(o: any, p = ''): Record<string, any> {
  const out: Record<string, any> = {};
  if (Array.isArray(o)) {
    o.forEach((v, i) => Object.assign(out, flattenAll(v, `${p}/${i}`)));
  } else if (o && typeof o === 'object') {
    for (const k of Object.keys(o)) Object.assign(out, flattenAll(o[k], `${p}/${k}`));
  } else if (p) {
    out[p] = o;
  }
  return out;
}

/** Вписывает скаляр по пути, создавая промежуточные объекты/массивы. */
function setScalar(root: any, p: string, value: any): void {
  const parts = p.split('/').filter(Boolean);
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const next = parts[i + 1];
    const wantIndex = /^\d+$/.test(next);
    const existing = Array.isArray(cur) ? cur[Number(part)] : cur[part];
    if (existing == null || typeof existing !== 'object') {
      const fresh: any = wantIndex ? [] : {};
      if (Array.isArray(cur)) cur[Number(part)] = fresh;
      else cur[part] = fresh;
    }
    cur = Array.isArray(cur) ? cur[Number(part)] : cur[part];
  }
  const last = parts[parts.length - 1];
  if (Array.isArray(cur)) cur[Number(last)] = value;
  else cur[last] = value;
}

/**
 * EDITOR/FIX/TECH по контракту возвращают ПОЛНЫЙ документ (свободное
/** Сходство 0..1 по Левенштейну (копия judge.ts; локально — чтобы не творить цикл импортов). */
function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a.length || !b.length) return 0;
  let prev = new Array<number>(b.length + 1).fill(0).map((_, i) => i);
  let cur = new Array<number>(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    cur[0] = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    [prev, cur] = [cur, prev];
  }
  return 1 - prev[b.length] / Math.max(a.length, b.length);
}

/** Пул тегов листа: имя тега → количество. */
function tagMultiset(s: string): Map<string, number> {
  const m = new Map<string, number>();
  for (const tag of s.match(/<\/?([a-z][a-z0-9_]*)[^>]*>/g) ?? []) {
    const name = (tag.match(/^<\/?([a-z][a-z0-9_]*)/) ?? [])[1] ?? tag;
    m.set(name, (m.get(name) ?? 0) + 1);
  }
  return m;
}

/** Пул плейсхолдеров {…} листа: подстановка → количество. */
function placeholderMultiset(s: string): Map<string, number> {
  const m = new Map<string, number>();
  for (const ph of s.match(/\{[^{}]+\}/g) ?? []) {
    m.set(ph, (m.get(ph) ?? 0) + 1);
  }
  return m;
}

/** Соседний повтор слова («als als») или двух иероглифов CJK («覆い覆い»).
 *  CJK-повторы в японском бывают легитимны (しばしば、ますます) — правило
 *  сознательно консервативно: теряется правка, вводящая повтор, а не текст. */
function hasAdjacentDoubling(s: string): boolean {
  if (/([\u3040-\u30ff\u4e00-\u9fff]{2})\1/u.test(s)) return true;
  return /\b(\p{L}+)\s+\1\b/iu.test(s);
}

/** Порог схлопывания правки: короче 35% базы при базе ≥60 символов. */
const COLLAPSE_RATIO = 0.35;
/** Порог тотальной подмены: сходство с базой ниже 30% — не полировка, а замена. */
const SUBSTITUTION_SIMILARITY = 0.3;

/**
 * Пер-листовая проверка правки стадии: причина отбраковки или null, если
 * правка допустима. Ломкая правка бракуется по одной — остальной патч
 * применяется как есть (тот же принцип, что у judge-apply).
 */
export function stageEditRejections(draft: string, patch: string): string[] {
  const reasons: string[] = [];
  const dt = tagMultiset(draft);
  const pt = tagMultiset(patch);
  for (const [tag, n] of dt) {
    if ((pt.get(tag) ?? 0) < n) reasons.push(`потерян тег <${tag}>`);
  }
  const dp = placeholderMultiset(draft);
  const pp = placeholderMultiset(patch);
  for (const [ph, n] of dp) {
    if ((pp.get(ph) ?? 0) < n) reasons.push(`потерян плейсхолдер ${ph}`);
  }
  if (draft.length >= 60) {
    if (patch.length < draft.length * COLLAPSE_RATIO) {
      reasons.push(`текст схлопнулся (${patch.length}/${draft.length} симв.)`);
    }
    if (similarity(draft, patch) < SUBSTITUTION_SIMILARITY) {
      reasons.push(`тотальная подмена (сходство ${Math.round(similarity(draft, patch) * 100)}%)`);
    }
  }
  if (!hasAdjacentDoubling(draft) && hasAdjacentDoubling(patch)) {
    reasons.push('задвоение слова/слогов');
  }
  return reasons;
}

/**
 * Аддендум формата ответа main для path-map режима (эксперимент
 * --main-path-map): вместо дерева документа модель возвращает плоскую карту
 * «путь → перевод» по явному списку. Сдвиг содержимого между соседними
 * листьями становится невозможен структурно, полнота проверяется по путям.
 */
const MAIN_PATHS_ADDENDUM = `

ФОРМАТ ОТВЕТА (обязателен): верни ровно один JSON-объект вида {"paths": {"<путь>": "<перевод>", ...}}.
Ключи — ТОЧНО все пути из списка "paths" во входе: ни один не пропускай и не придумывай новых.
Значение каждого пути — готовый перевод соответствующей русской строки.
Не рисуй дерево документа и не группируй по секциям — только плоская карта «путь → перевод».`;

/** Плоская карта «/a/b/0 → значение» → дерево (объекты с числовыми ключами → массивы). */
function buildTreeFromPaths(map: Record<string, string>): any {
  const root: any = {};
  for (const [p, v] of Object.entries(map)) {
    const parts = p.split('/').filter(Boolean);
    let cur = root;
    for (let i = 0; i < parts.length - 1; i++) {
      const k = parts[i];
      if (!(k in cur) || typeof cur[k] !== 'object' || cur[k] === null) cur[k] = {};
      cur = cur[k];
    }
    cur[parts[parts.length - 1]] = v;
  }
  const arrify = (n: any): any => {
    if (Array.isArray(n)) return n.map(arrify);
    if (n && typeof n === 'object') {
      const keys = Object.keys(n);
      if (keys.length > 0 && keys.every((k) => /^\d+$/.test(k))) {
        const arr: any[] = [];
        for (const k of keys) arr[Number(k)] = arrify(n[k]);
        return arr;
      }
      const out: any = {};
      for (const k of keys) out[k] = arrify(n[k]);
      return out;
    }
    return n;
  };
  return arrify(root);
}

/**
 * Мердж ответа стадии поверх базы. Ответ может быть как полным документом
 * («полировка»), так и дифф-патчем («только изменённые ключи»), но мердж умеет
 * и дифф-патч. Ответ применяется поверх base только по СУЩЕСТВУЮЩИМ путям
 * и только строковыми непустыми значениями: структура и длины массивов
 * фиксируются базой — элементы не могут добавиться или переставиться.
 * Содержательные подмены текста внутри позиций (дефект «крючков») ловит
 * валидация дублей в раннере с ретраем языка; финальный контроль — QA-судья.
 * Опциональный reject — пер-листовой guard правок: непустая строка причин —
 * правка листа отбрасывается (остаётся значение базы), остальные применяются.
 */
export function mergeSubset<T>(
  base: T,
  subset: unknown,
  stage = 'patch',
  reject?: (draft: string, patch: string) => string[] | null,
): T {
  if (!subset || typeof subset !== 'object' || Array.isArray(subset)) {
    console.warn(`⚠️ [${stage}] ответ не является JSON-объектом — применено 0 правок`);
    return base;
  }
  const flatBase = flattenAll(base);
  let patch = flattenAll(subset);
  // Эхо-обёртка {data: …} (как у MAIN): пути /data/** в базе не существуют.
  if ('data' in subset && !('/data' in flatBase)) {
    patch = flattenAll((subset as { data: unknown }).data);
  }

  const total = Object.keys(flatBase).length;
  const patchSet = new Set(Object.keys(patch));
  let changed = 0;
  let rejectedCount = 0;
  for (const k of Object.keys(patch)) {
    const v = patch[k];
    if (!(k in flatBase) || typeof v !== 'string' || !v.trim()) continue;
    const draftValue = flatBase[k];
    if (draftValue !== v) {
      if (reject && typeof draftValue === 'string') {
        const reasons = reject(draftValue, v);
        if (reasons && reasons.length > 0) {
          rejectedCount++;
          console.warn(`⚠️ [${stage}] правка отброшена: ${k} (${reasons.join('; ')})`);
          continue;
        }
      }
      changed++;
      setScalar(base, k, v);
    }
  }
  if (rejectedCount > 0) {
    console.warn(`⚠️ [${stage}] guard: отброшено правок ${rejectedCount}/${changed + rejectedCount}`);
  }
  if (changed === 0) {
    console.warn(`⚠️ [${stage}] применено 0 правок (ответ не пересёкся с документом или правок нет)`);
  } else {
    const full = Object.keys(flatBase).every((k) => patchSet.has(k))
      ? ' (ответ — полный документ)'
      : '';
    console.log(`📝 [${stage}] изменено листьев: ${changed}/${total}${full}`);
  }
  return base;
}

/** Число попыток текстовой стадии по умолчанию: запрос + один ретрай. */
const DEFAULT_STAGE_ATTEMPTS = 2;

/**
 * Ретраящая обёртка текстовой стадии: запрос + разбор/валидация ответа —
 * единое целое. Стадии не пропускаются: после исчерпания попыток бросается
 * исключение, попытка языка падает целиком (раннер ретраит язык, запись
 * файла — только после полного успеха конвейера). На ретрае включается
 * jsonMode: битый JSON — самая частая причина сбоя стадии.
 */
async function runStage<T>(
  client: StageClient,
  stage: string,
  attempts: number,
  buildReq: (attempt: number) => StageRequest,
  processOut: (text: string) => Promise<T> | T,
): Promise<T> {
  let lastError: unknown = null;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await processOut(await client.complete(buildReq(attempt)));
    } catch (e: any) {
      lastError = e;
      if (attempt < attempts) {
        console.warn(`⚠️ [${stage}] попытка ${attempt}/${attempts} не удалась: ${e?.message ?? e} — повторяю.`);
      }
    }
  }
  throw new Error(
    `[${stage}] стадия не выполнена за ${attempts} попыток: ${(lastError as any)?.message ?? lastError}`,
  );
}

/** Ответ текстовой стадии: маркер «правок нет» → null, иначе строго объект. */
async function parseStageObject(stage: string, raw: string): Promise<any> {
  if (isNoChangesMarker(raw)) return null;
  const parsed = await parseWithRepair<any>(raw);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`неожиданный формат ответа: ${raw.slice(0, 120)}`);
  }
  return parsed;
}

export interface PipelineResult {
  /** Переведённый объект (структура как у источника). */
  data: any;
  timings: {
    main: number;
    editor: number;
    /** 4-стадийный путь text; fix = undefined, если ревью не нашло замечаний. */
    review?: number;
    fix?: number;
    /** Legacy-путь keys (однозапросная смысловая сверка). */
    tech?: number;
  };
}

/**
 * Прогоняет payload через стадии. Каждая стадия ретраится (opts.stageAttempts,
 * по умолчанию 2 попытки; на ретрае включается jsonMode — битый JSON — самая
 * частая причина сбоя). Стадии НЕ пропускаются: после исчерпания попыток
 * бросается исключение, попытка языка падает целиком и ретраится раннером
 * (файл пишется атомарно и только после полного успеха).
 *
 * text: main → editor → review (список замечаний) → fix (правка по замечаниям);
 * keys: main → editor → tech (однозапросная сверка с правкой).
 *
 * @param payload       исходный объект для перевода (структура сохраняется)
 * @param targetLocale  канонический код языка (напр. pt_BR)
 */
export type CaptureStage = 'main' | 'editor' | 'review' | 'fix';

/** Листьев в одном чанке перевода: модели стабильно срезают хвосты длинных
 *  документов («потеряны ключи: /x/screen_3/texts/11»), на ≤40 листьях ответ
 *  устойчив. Чанки режутся по контейнерам; предыдущие чанки уходят в context
 *  как история и референс стиля (как uiContextWindow в ui-режиме). */
const TRANSLATE_CHUNK_LEAVES = 40;

function countLeaves(node: any): number {
  return Object.keys(flattenAll(node)).length;
}

interface PayloadChunk {
  /** Путь от корня payload (сегменты); [] — весь payload. */
  prefix: string[];
  subtree: any;
}

/** Режет payload на поддеревья ≤ max листьев. Переполненный ребёнок режется
 *  рекурсивно со своим префиксом; массив бинируется подряд идущими
 *  элементами, чанк — разреженный клон массива (позиции оригинала
 *  сохраняются, как в инкрементальном payload). */
function chunkPayload(node: any, max: number, prefix: string[] = []): PayloadChunk[] {
  if (countLeaves(node) <= max) return [{ prefix, subtree: node }];
  const isArray = Array.isArray(node);
  const entries: [string, any][] = isArray
    ? node.map((v, i) => [String(i), v] as [string, any])
    : Object.entries(node);
  if (entries.length <= 1) return [{ prefix, subtree: node }];
  const chunks: PayloadChunk[] = [];
  let bin: Record<string, any> = {};
  let binLeaves = 0;
  const flush = () => {
    if (binLeaves === 0) return;
    if (isArray) {
      const sparse: any[] = [];
      const top = Math.max(...Object.keys(bin).map(Number));
      for (let i = 0; i <= top; i++) sparse.push(i in bin ? bin[i] : null);
      chunks.push({ prefix, subtree: sparse });
    } else {
      chunks.push({ prefix, subtree: bin });
    }
    bin = {};
    binLeaves = 0;
  };
  for (const [k, v] of entries) {
    const lv = countLeaves(v);
    if (lv > max) {
      flush();
      chunks.push(...chunkPayload(v, max, [...prefix, k]));
      continue;
    }
    if (binLeaves > 0 && binLeaves + lv > max) flush();
    bin[k] = v;
    binLeaves += lv;
  }
  flush();
  return chunks;
}

/** Клон payload со строковыми листьями → '' (@-мета сохраняется как есть):
 *  все пути чанков существуют в скелете, сборка — мердж по абсолютным путям. */
function makeSkeleton(node: any): any {
  const walk = (n: any, key: string): any => {
    if (Array.isArray(n)) return n.map((v) => walk(v, key));
    if (n && typeof n === 'object') {
      const out: any = {};
      for (const [k, v] of Object.entries(n)) out[k] = k.startsWith('@') ? v : walk(v, k);
      return out;
    }
    return typeof n === 'string' ? '' : n;
  };
  return walk(node, '');
}

/**
 * Один прогон стадий (main → editor → review → fix / tech) по одному
 * payload. Из runPipeline вынесен для чанкового режима: каждый чанк проходит
 * полный конвейер, результат собирается в скелет документа.
 */
async function runStagesOnce(
  client: StageClient,
  prompts: StagePrompts,
  payload: any,
  targetLocale: string,
  o: {
    sourceLocale: string;
    jsonModeMain?: boolean;
    stageAttempts: number;
    /** MAIN отвечает плоской картой «путь → перевод» вместо дерева документа. */
    mainPathMap?: boolean;
    capture?: (stage: CaptureStage, snapshot: any) => void;
    context?: Record<string, string>;
  },
): Promise<{ draft: any; timings: PipelineResult['timings'] }> {
  const wrapped: Record<string, unknown> = { sourceLocale: o.sourceLocale, targetLocale, data: payload };
  if (o.context && Object.keys(o.context).length > 0) wrapped.context = o.context;
  const payloadText = JSON.stringify(wrapped);
  const timings: PipelineResult['timings'] = { main: 0, editor: 0 };

  // Стадия 1: MAIN — трансекреация (полный JSON в ответе).
  let t = Date.now();
  const draftText = await client.complete(
    o.mainPathMap
      ? {
          system: prompts.main + MAIN_PATHS_ADDENDUM,
          user: JSON.stringify({
            sourceLocale: o.sourceLocale,
            targetLocale,
            paths: flattenAll(payload),
            ...(o.context && Object.keys(o.context).length > 0 ? { context: o.context } : {}),
          }),
          temperature: 0.3,
          maxTokens: 16_384,
          jsonMode: true,
        }
      : {
          system: prompts.main,
          user: payloadText,
          temperature: 0.3,
          maxTokens: 16_384,
          jsonMode: o.jsonModeMain ?? false,
        },
  );
  timings.main = Date.now() - t;

  let draft: any;
  if (o.mainPathMap) {
    const parsed = await parseWithRepair<any>(draftText);
    const map =
      parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? ((parsed.paths && typeof parsed.paths === 'object' ? parsed.paths : parsed.data?.paths) ??
          (typeof Object.values(parsed)[0] === 'string' ? parsed : null))
        : null;
    if (!map || typeof map !== 'object') {
      throw new Error(`MAIN(paths): не удалось распарсить карту путей: ${draftText.slice(0, 200)}`);
    }
    const expected = flattenAll(payload);
    const clean: Record<string, string> = {};
    const missing: string[] = [];
    for (const [p, ru] of Object.entries(expected)) {
      const v = (map as Record<string, unknown>)[p];
      if (typeof v === 'string' && v.trim()) clean[p] = v;
      else missing.push(p);
    }
    if (missing.length > 0) {
      console.warn(
        `⚠️ [main:paths] без перевода ${missing.length}/${Object.keys(expected).length} путей: ${missing.slice(0, 5).join(', ')}`,
      );
    }
    draft = buildTreeFromPaths(clean);
  } else {
    draft = await parseWithRepair<any>(draftText);
    if (draft && typeof draft === 'object' && !Array.isArray(draft) && 'data' in draft) {
      draft = draft.data; // модель эхом возвращает обёртку {sourceLocale, targetLocale, data}
    }
    if (!draft || typeof draft !== 'object') {
      throw new Error(`MAIN: не удалось распарсить JSON: ${draftText.slice(0, 200)}`);
    }
  }
  o.capture?.('main', structuredClone(draft));

  // Стадия 2: EDITOR — полировка носителем без оригинала. Ответ — полный
  // отредактированный документ (или дифф-патч): мердж применяет значения
  // только по существующим путям, структура фиксируется базой.
  t = Date.now();
  const editorPatch = await runStage(
    client,
    'editor',
    o.stageAttempts,
    (attempt) => ({
      system: prompts.editor,
      user: JSON.stringify(draft),
      temperature: 0.2,
      maxTokens: 16_384,
      jsonMode: attempt > 1,
    }),
    (text) => parseStageObject('editor', text),
  );
  timings.editor = Date.now() - t;
  if (editorPatch) draft = mergeSubset(draft, editorPatch, 'editor', stageEditRejections);
  o.capture?.('editor', structuredClone(draft));

  // Стадии 3–4 (text): REVIEW — смысловая сверка с оригиналом; FIX — правка
  // по замечаниям («критикуй отдельно, правь отдельно»).
  if (prompts.review && prompts.fix) {
    t = Date.now();
    const review = await runStage(
      client,
      'review',
      o.stageAttempts,
      () => ({
        system: prompts.review!,
        user: `ОРИГИНАЛ (ru):\n${payloadText}\n\nПЕРЕВОД:\n${JSON.stringify(draft)}`,
        temperature: 0.2,
        maxTokens: 8_192,
        jsonMode: true,
      }),
      async (text) => {
        const parsed = await parseWithRepair<any>(text);
        if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.issues)) {
          throw new Error(`неожиданный формат ответа: ${text.slice(0, 120)}`);
        }
        return { raw: text, issues: parsed.issues as unknown[] };
      },
    );
    timings.review = Date.now() - t;
    o.capture?.('review', { issues: review.issues, raw: review.raw });

    if (review.issues.length > 0) {
      t = Date.now();
      const fixPatch = await runStage(
        client,
        'fix',
        o.stageAttempts,
        (attempt) => ({
          system: prompts.fix!,
          user:
            `ОРИГИНАЛ (ru):\n${payloadText}\n\nПЕРЕВОД:\n${JSON.stringify(draft)}\n\n` +
            `ЗАМЕЧАНИЯ РЕВЬЮЕРА (исправь каждое):\n${review.raw}`,
          temperature: 0.2,
          maxTokens: 16_384,
          jsonMode: attempt > 1,
        }),
        (text) => parseStageObject('fix', text),
      );
      timings.fix = Date.now() - t;
      if (fixPatch) draft = mergeSubset(draft, fixPatch, 'fix', stageEditRejections);
      o.capture?.('fix', structuredClone(draft));
    }
  } else if (prompts.tech) {
    // Legacy-путь (keys/ui): однозапросная смысловая сверка с правкой.
    t = Date.now();
    const techPatch = await runStage(
      client,
      'tech',
      o.stageAttempts,
      (attempt) => ({
        system: prompts.tech!,
        user: `ОРИГИНАЛ (ru):\n${payloadText}\n\nПЕРЕВОД:\n${JSON.stringify(draft)}`,
        temperature: 0.2,
        maxTokens: 8_192,
        jsonMode: attempt > 1,
      }),
      (text) => parseStageObject('tech', text),
    );
    timings.tech = Date.now() - t;
    if (techPatch) draft = mergeSubset(draft, techPatch, 'tech', stageEditRejections);
  }

  return { draft, timings };
}


export async function runPipeline(
  client: StageClient,
  prompts: StagePrompts,
  payload: any,
  targetLocale: string,
  opts: {
    sourceLocale?: string;
    jsonModeMain?: boolean;
    stageAttempts?: number;
    /** Размер чанка в листьях (по умолчанию TRANSLATE_CHUNK_LEAVES). */
    chunkLeaves?: number;
    /** MAIN отвечает плоской картой «путь → перевод» (эксперимент --main-path-map). */
    mainPathMap?: boolean;
    /** Наблюдатель стадий: draft после main/editor/fix, {issues, raw} после review. Не влияет на конвейер. */
    capture?: (stage: CaptureStage, snapshot: any) => void;
    /** Принятые переводы соседних ключей (keys/ui): образец стиля и запрет дублей. */
    context?: Record<string, string>;
  } = {},
): Promise<PipelineResult> {
  const sourceLocale = opts.sourceLocale ?? 'ru';
  const stageAttempts = opts.stageAttempts ?? DEFAULT_STAGE_ATTEMPTS;
  const ruFlat = flattenAll(payload);
  const chunks = chunkPayload(payload, opts.chunkLeaves ?? TRANSLATE_CHUNK_LEAVES);
  if (chunks.length > 1) {
    console.log(`📦 [chunks] payload → ${chunks.length} чанков ≤${TRANSLATE_CHUNK_LEAVES} листьев`);
  }
  // Скелет: все пути payload со строками-заглушками; чанки собираются
  // мерджем по абсолютным путям. История для context: ru-оригинал → принятый
  // перевод, последние 50 пар — референс стиля и запрет повторов-«крючков».
  const skeleton = makeSkeleton(payload);
  const flatSkeleton = flattenAll(skeleton);
  const flatSkeletonTotal = Object.keys(flatSkeleton).length;
  const accepted: Record<string, string> = {};
  const timings: PipelineResult['timings'] = { main: 0, editor: 0 };

  for (let ci = 0; ci < chunks.length; ci++) {
    const chunk = chunks[ci]!;
    const pairs = Object.entries(accepted);
    const history = pairs.length > 0 ? Object.fromEntries(pairs.slice(-50)) : undefined;
    // context вызывающего (ui: окно принятых ключей) + история чанков —
    // вместе; история позже, её записи приоритетнее при коллизии ключей.
    const context =
      opts.context || history
        ? { ...(opts.context ?? {}), ...(history ?? {}) }
        : undefined;
    const t0 = Date.now();
    const { draft: chunkDraft, timings: tChunk } = await runStagesOnce(
      client,
      prompts,
      chunk.subtree,
      targetLocale,
      {
        sourceLocale,
        jsonModeMain: opts.jsonModeMain,
        stageAttempts,
        mainPathMap: opts.mainPathMap,
        capture: opts.capture,
        context,
      },
    );
    timings.main += tChunk.main;
    timings.editor += tChunk.editor;
    if (tChunk.review) timings.review = (timings.review ?? 0) + tChunk.review;
    if (tChunk.fix) timings.fix = (timings.fix ?? 0) + tChunk.fix;
    if (tChunk.tech) timings.tech = (timings.tech ?? 0) + tChunk.tech;
    // re-root под префикс чанка: пути draft'а относительны чанка, скелет —
    // полный документ. mergeSubset применяет только существующие пути скелета
    // и непустые строки — эхо context («перевод справочных пар») отсеивается
    // само, не раздувая документ.
    let rooted: any = chunkDraft;
    for (const seg of [...chunk.prefix].reverse()) rooted = { [seg]: rooted };
    mergeSubset(skeleton, rooted, `chunk${ci + 1}`);

    // История: переводы листьев скелета (эхо context в историю не попадает).
    const flatDraft = flattenAll(rooted);
    for (const [ap, rv] of Object.entries(flatDraft)) {
      if (typeof rv !== 'string' || !rv.trim() || !(ap in flatSkeleton)) continue;
      const ru = ruFlat[ap];
      if (typeof ru === 'string' && ru.trim()) accepted[ru] = rv;
    }
    if (chunks.length > 1) {
      const done = Object.keys(flattenAll(skeleton)).filter(
        (k) => typeof flatSkeleton[k] === 'string' && String(flattenAll(skeleton)[k]).trim() !== '',
      ).length;
      console.log(
        `   📦 [chunks] чанк ${ci + 1}/${chunks.length}: переведено ${done}/${flatSkeletonTotal} (${Math.round((Date.now() - t0) / 1000)}с)`,
      );
    }
  }
  let draft: any = skeleton;

  // Контроль тегов: пул тегов перевода не должен превышать пул оригинала.
  // Смещение тега в другой элемент — норма транскреации (не трогается);
  // выдуманные моделью теги срезаются механически с сохранением текста.
  const tagCheck = reconcileTags(payload, draft);
  if (tagCheck.stripped.length > 0) {
    const summary = tagCheck.stripped.map((s) => `${s.tag}×${s.count} @ ${s.path}`).join(', ');
    console.warn(`⚠️ [tags] срезаны лишние теги: ${summary}`);
  }
  draft = tagCheck.data;

  // Конвенция <instagram>: вне ru/en тег обязан быть пустым (без ids=…);
  // атрибуты, скопированные моделью из оригинала, срезаются механически.
  const strippedAttrs = stripInstagramAttributes(draft, targetLocale);
  if (strippedAttrs > 0) {
    console.warn(
      `⚠️ [tags] срезаны атрибуты <instagram> в ${strippedAttrs} листах (локаль ${targetLocale} рендерит только пустой тег)`,
    );
  }

  // Кавычки атрибутов — к двойным (модель mixing author='…' / author="…").
  const normalizedQuotes = normalizeTagQuotes(draft);
  if (normalizedQuotes > 0) {
    console.warn(`⚠️ [tags] кавычки атрибутов нормализованы в ${normalizedQuotes} листах`);
  }

  // Финальный скан задвоений: последняя сетка независимо от того, через какую
  // стадию просочился дефект («als als», 覆い覆い). Только warning — решение
  // о блокировке принимает валидация/коллегия, а не эвристика.
  {
    const doubledPaths: string[] = [];
    for (const [p, v] of Object.entries(flattenAll(draft))) {
      if (typeof v === 'string' && hasAdjacentDoubling(v)) doubledPaths.push(p);
    }
    if (doubledPaths.length > 0) {
      console.warn(`⚠️ [qa] возможные задвоения в ${doubledPaths.length} листах: ${doubledPaths.slice(0, 5).join(', ')}`);
    }
  }

  // Контроль полноты: все ключи источника на месте.
  // keys-режим: модель возвращает {lang: {key: val}} — сверяем против снятой
  // обёртки локали (иначе сверка всегда фейлит). Написание локали в обёртке
  // нормализуем (модель может вернуть pt-BR/pt_br вместо pt_BR). В text-режиме
  // обёртка {data} уже снята, а top-level ключ с именем локали не встречается.
  let checkTarget: any = draft;
  if (draft && typeof draft === 'object' && !Array.isArray(draft)) {
    const envelopeKey = Object.keys(draft).find(
      (k) =>
        normalizeLangCode(k) === normalizeLangCode(targetLocale) &&
        draft[k] &&
        typeof draft[k] === 'object' &&
        !Array.isArray(draft[k]),
    );
    if (envelopeKey !== undefined && !('data' in draft)) checkTarget = draft[envelopeKey];
  }
  // @-мета — контекст для модели, по промпту в ответ она не возвращается:
  // из сверки полноты такие пути исключаются.
  const isMetaPath = (p: string) => p.split('/').some((seg) => seg.startsWith('@'));
  const srcKeys = Object.keys(flattenAll(payload)).filter((k) => !isMetaPath(k));
  // Пустая строка — тоже потеря: модель вернула заглушку, валидация раннера
  // такое отклоняет, значит лист надо допереводить (recovery ниже).
  const isLostIn = (flat: Record<string, any>) => (k: string) => {
    const v = flat[k];
    return v == null || (typeof v === 'string' && !v.trim());
  };
  const lost = srcKeys.filter(isLostIn(flattenAll(checkTarget)));
  if (lost.length > 0) {
    // Recovery: точечный доперевод потерянных листьев одним запросом.
    // Модель периодически срезает хвост длинного массива (классический
    // детерминированный промах: «потеряны ключи: /x/screen_3/texts/11»),
    // и полный ретрай конвейера из-за 1–2 листьев — это 4 запроса по всему
    // документу с тем же исходом. Допереводим только потерянное и доклеиваем.
    const ratio = lost.length / Math.max(srcKeys.length, 1);
    if (ratio > 0.3) {
      throw new Error(
        `потеряны ключи: ${lost.slice(0, 5).join(', ')} (${lost.length}/${srcKeys.length} — слишком много для recovery)`,
      );
    }
    console.warn(
      `⚠️ [recovery] потеряны ключи (${lost.length}/${srcKeys.length}): ${lost.slice(0, 3).join(', ')} — доперевод точечно`,
    );
    const lostSubtree = buildSubtree(payload, lost);
    const recText = await client.complete({
      system: prompts.main,
      user: JSON.stringify({ sourceLocale, targetLocale, data: lostSubtree }),
      temperature: 0.2,
      maxTokens: 8_192,
      jsonMode: true,
    });
    let recovered = await parseWithRepair<any>(recText);
    if (recovered && typeof recovered === 'object' && !Array.isArray(recovered) && 'data' in recovered) {
      recovered = recovered.data;
    }
    if (!recovered || typeof recovered !== 'object') {
      throw new Error(`потеряны ключи: ${lost.slice(0, 5).join(', ')} (recovery не распарсился)`);
    }
    // Контейнер в draft КОРОЧЕ потерянного индекса (модель срезала хвост
    // массива), а mergeSubset по дизайну не растит массивы («длины массивов
    // фиксируются базой») — дорастаем контейнеры до путей восстановления.
    for (const [rp, rv] of Object.entries(flattenAll(recovered))) {
      if (typeof rv !== 'string' || !rv.trim()) continue;
      const parts = rp.split('/').filter(Boolean);
      let cur: any = checkTarget;
      for (let i = 0; i < parts.length; i++) {
        const seg = parts[i]!;
        const isIndex = /^\d+$/.test(seg);
        if (i < parts.length - 1) {
          const nextIsIndex = /^\d+$/.test(parts[i + 1]!);
          if (Array.isArray(cur)) {
            const idx = Number(seg);
            while (cur.length <= idx) cur.push(null);
            if (cur[idx] == null) cur[idx] = nextIsIndex ? [] : {};
            cur = cur[idx];
          } else {
            if (cur[seg] == null || typeof cur[seg] !== 'object') cur[seg] = nextIsIndex ? [] : {};
            cur = cur[seg];
          }
        } else if (Array.isArray(cur)) {
          const idx = Number(seg);
          while (cur.length <= idx) cur.push(null);
        }
      }
    }
    mergeSubset(checkTarget, recovered, 'recovery');
    // Восстановленные листья могли прийти с атрибутами <instagram> из
    // оригинала — конвенция та же, что и для основного draft.
    stripInstagramAttributes(draft, targetLocale);
    const stillLost = srcKeys.filter(isLostIn(flattenAll(checkTarget)));
    if (stillLost.length > 0) {
      throw new Error(`потеряны ключи после recovery: ${stillLost.slice(0, 5).join(', ')}`);
    }
    console.warn(`⚠️ [recovery] вписано ${lost.length} листьев`);
  }

  return { data: draft, timings };
}
