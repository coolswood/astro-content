/**
 * Конвейер перевода на промптах из scripts/prompts/ и клиенты провайдеров.
 *
 * Контент (text): main → editor → review → fix — смысловой ревью списком
 * замечаний и точечная правка по ним (паттерн «критикуй отдельно, правь
 * отдельно», как в translation-agent/Aphra).
 * UI/keys:        main → editor → tech — однозапросная смысловая сверка.
 *
 * Порт логики scripts/lingo_proxy.py (качество которого подтверждено слепым
 * MQM-сравнением) + legacy-адаптер для старых браузерных провайдеров.
 *
 * ⚠️ ЖЁСТКОЕ ПРАВИЛО: к модели — строго один одновременный запрос.
 *    VllmClient держит глобальный мьютекс; раннер дополнительно обрабатывает
 *    языки строго последовательно.
 */
import { loadPrompt } from './prompt-loader.js';
import { loadGlossary } from './glossary-utils.js';
import { normalizeLangCode } from './lang-codes.js';
import type { GlossaryItem } from './types.js';
import { parseWithRepair } from './json-repair.js';
import { reconcileTags, stripInstagramAttributes } from './tag-reconcile.js';
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
}

export interface StageClient {
  name: string;
  complete(req: StageRequest): Promise<string>;
  close?(): Promise<void>;
}

// ─────────────────────────────────────────────────────────────────────────────
// vLLM (основной провайдер)
// ─────────────────────────────────────────────────────────────────────────────

/** Глобальный мьютекс: один запрос к модели единовременно, остальные ждут. */
let modelChain: Promise<unknown> = Promise.resolve();
function enqueueModelCall<T>(fn: () => Promise<T>): Promise<T> {
  const run = modelChain.then(fn, fn);
  modelChain = run.catch(() => {});
  return run;
}

export class VllmClient implements StageClient {
  name = 'vllm';

  constructor(
    private endpoint: string,
    private model: string,
    private timeoutMs = 600_000,
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
      max_tokens: req.maxTokens ?? 16_384,
    };
    if (req.jsonMode) body.response_format = { type: 'json_object' };

    // Транспортные ретраи (5xx/сеть) — с паузой; логика конвейера ретраит выше.
    let lastError: unknown = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        return await enqueueModelCall(async () => {
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
        });
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
function formatGlossaryDetailed(items: GlossaryItem[]): string {
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

/** Контейнер с ≥4 листьями, покрытый патчем на 100%, — «полный перезапис». */
const FULL_CONTAINER_MIN_LEAVES = 4;

/**
 * editor/fix/tech возвращают только изменённые ключи. Применяем патч поверх
 * base: только строковые непустые значения по существующим путям (порт
 * merge_subset).
 *
 * Guard от «полного документа»: если патч покрывает ВСЕ листья контейнера
 * (массива/объекта, включая корень) с ≥4 листьями, модель нарушила контракт
 * и вернула переписанный контейнер целиком. Правки такого контейнера
 * отбрасываются: полный перезапис тянет незаявленные «улучшения» —
 * перестановку элементов, эпиграфы-дубли в первых элементах массивов
 * (дефект «крючков»: реальный текст подменялся дублем цитаты из этого же
 * файла). Точечные правки остальных контейнеров применяются как обычно.
 */
export function mergeSubset<T>(base: T, subset: unknown, stage = 'patch'): T {
  if (!subset || typeof subset !== 'object' || Array.isArray(subset)) return base;
  const flatBase = flattenAll(base);
  const patch = flattenAll(subset);

  const baseByParent = new Map<string, string[]>();
  for (const k of Object.keys(flatBase)) {
    const parent = k.slice(0, k.lastIndexOf('/'));
    const list = baseByParent.get(parent) ?? [];
    list.push(k);
    baseByParent.set(parent, list);
  }
  const patchSet = new Set(Object.keys(patch));
  const droppedContainers: string[] = [];
  for (const [parent, keys] of baseByParent) {
    if (keys.length < FULL_CONTAINER_MIN_LEAVES) continue;
    if (keys.every((k) => patchSet.has(k))) droppedContainers.push(parent);
  }
  const dropped = new Set<string>();
  for (const parent of droppedContainers) {
    for (const k of baseByParent.get(parent)!) dropped.add(k);
  }
  if (dropped.size > 0) {
    console.warn(
      `⚠️ [${stage}] патч переписывает контейнеры целиком (нарушение контракта «только изменённые ключи»), ` +
        `правки по ним отброшены: ${droppedContainers.map((c) => c || '(корень)').join(', ')}`,
    );
  }

  for (const k of Object.keys(patch)) {
    if (dropped.has(k)) continue;
    const v = patch[k];
    if (k in flatBase && typeof v === 'string' && v.trim()) {
      setScalar(base, k, v);
    }
  }
  return base;
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
 * Прогоняет payload через стадии. Бросает исключение, если MAIN не дал
 * распарсиваемый JSON или потеряны ключи; остальные стадии некритичны
 * (сбой/пустой результат — логируем и идём дальше).
 *
 * text: main → editor → review (список замечаний) → fix (правка по замечаниям);
 * keys: main → editor → tech (однозапросная сверка с правкой).
 *
 * @param payload       исходный объект для перевода (структура сохраняется)
 * @param targetLocale  канонический код языка (напр. pt_BR)
 */
export async function runPipeline(
  client: StageClient,
  prompts: StagePrompts,
  payload: any,
  targetLocale: string,
  opts: { sourceLocale?: string; jsonModeMain?: boolean } = {},
): Promise<PipelineResult> {
  const sourceLocale = opts.sourceLocale ?? 'ru';
  const wrapped = { sourceLocale, targetLocale, data: payload };
  const payloadText = JSON.stringify(wrapped);
  const timings: PipelineResult['timings'] = { main: 0, editor: 0 };

  // Стадия 1: MAIN — трансекреация (полный JSON в ответе).
  let t = Date.now();
  const draftText = await client.complete({
    system: prompts.main,
    user: payloadText,
    temperature: 0.3,
    maxTokens: 16_384,
    jsonMode: opts.jsonModeMain ?? false,
  });
  timings.main = Date.now() - t;

  let draft = await parseWithRepair<any>(draftText);
  if (draft && typeof draft === 'object' && !Array.isArray(draft) && 'data' in draft) {
    draft = draft.data; // модель эхом возвращает обёртку {sourceLocale, targetLocale, data}
  }
  if (!draft || typeof draft !== 'object') {
    throw new Error(`MAIN: не удалось распарсить JSON: ${draftText.slice(0, 200)}`);
  }

  // Стадия 2: EDITOR — полировка носителем (без оригинала, только изменённые ключи).
  // Отправляем канонический draft (обёртка {data} снята, JSON нормализован):
  // пути патча тогда совпадают с базой мерджа; сырой draftText с обёрткой-эхом
  // от MAIN ломал пути патча (/data/...) и молча превращал стадию в no-op.
  t = Date.now();
  try {
    const editorOut = await client.complete({
      system: prompts.editor,
      user: JSON.stringify(draft),
      temperature: 0.2,
      maxTokens: 8_192,
    });
    if (!isNoChangesMarker(editorOut)) {
      const patch = await parseWithRepair<any>(editorOut);
      draft = mergeSubset(draft, patch, 'editor');
    }
  } catch (e: any) {
    console.warn(`⚠️ [editor] стадия пропущена: ${e?.message ?? e}`);
  }
  timings.editor = Date.now() - t;

  // Стадии 3–4 (text): REVIEW — смысловая сверка с оригиналом, ответ списком
  // замечаний {"issues":[...]} без правок; FIX — точечная правка строго по
  // замечаниям (дифф-патч). Паттерн «критикуй отдельно, правь отдельно»:
  // ревьюер не обременён формированием патча, правщик получает явный список.
  if (prompts.review && prompts.fix) {
    t = Date.now();
    let reviewOut: string | null = null;
    try {
      reviewOut = await client.complete({
        system: prompts.review,
        user: `ОРИГИНАЛ (ru):\n${payloadText}\n\nПЕРЕВОД:\n${JSON.stringify(draft)}`,
        temperature: 0.2,
        maxTokens: 8_192,
        jsonMode: true, // маленький структурированный ответ — json_object надёжнее
      });
    } catch (e: any) {
      console.warn(`⚠️ [review] стадия пропущена: ${e?.message ?? e}`);
    }
    timings.review = Date.now() - t;

    let issues: unknown[] = [];
    if (reviewOut != null) {
      try {
        const parsed = await parseWithRepair<any>(reviewOut);
        if (parsed && typeof parsed === 'object' && Array.isArray(parsed.issues)) {
          issues = parsed.issues;
        } else {
          console.warn(
            `⚠️ [review] неожиданный формат ответа — правка пропущена: ${reviewOut.slice(0, 120)}`,
          );
        }
      } catch {
        console.warn(
          `⚠️ [review] список замечаний не распарсился — правка пропущена: ${reviewOut.slice(0, 120)}`,
        );
      }
    }

    if (issues.length > 0) {
      t = Date.now();
      try {
        const fixOut = await client.complete({
          system: prompts.fix,
          user:
            `ОРИГИНАЛ (ru):\n${payloadText}\n\nПЕРЕВОД:\n${JSON.stringify(draft)}\n\n` +
            `ЗАМЕЧАНИЯ РЕВЬЮЕРА (исправь каждое):\n${reviewOut}`,
          temperature: 0.2,
          maxTokens: 8_192,
        });
        timings.fix = Date.now() - t;
        if (!isNoChangesMarker(fixOut)) {
          const patch = await parseWithRepair<any>(fixOut);
          draft = mergeSubset(draft, patch, 'fix');
        }
      } catch (e: any) {
        console.warn(`⚠️ [fix] стадия пропущена: ${e?.message ?? e}`);
      }
    }
  } else if (prompts.tech) {
    // Legacy-путь (keys/ui): однозапросная смысловая сверка с правкой.
    t = Date.now();
    try {
      const techOut = await client.complete({
        system: prompts.tech,
        user: `ОРИГИНАЛ (ru):\n${payloadText}\n\nПЕРЕВОД:\n${JSON.stringify(draft)}`,
        temperature: 0.2,
        maxTokens: 8_192,
      });
      if (!isNoChangesMarker(techOut)) {
        const patch = await parseWithRepair<any>(techOut);
        draft = mergeSubset(draft, patch, 'tech');
      }
    } catch (e: any) {
      console.warn(`⚠️ [tech] стадия пропущена: ${e?.message ?? e}`);
    }
    timings.tech = Date.now() - t;
  }

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
  const outKeys = new Set(Object.keys(flattenAll(checkTarget)));
  const lost = srcKeys.filter((k) => !outKeys.has(k));
  if (lost.length > 0) {
    throw new Error(`потеряны ключи: ${lost.slice(0, 5).join(', ')}`);
  }

  return { data: draft, timings };
}
