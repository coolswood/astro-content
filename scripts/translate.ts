#!/usr/bin/env bun
/**
 * Единый раннер локализации (замена translate-arb / translate-file* / translate-ui).
 *
 * Режимы:
 *   Контент:   bun scripts/translate.ts <файл|каталог> [флаги]
 *              src/i18n/ru/<путь> → src/i18n/<lang>/<путь>. Поддерживает объекты
 *              и массивы строк; языки: один (--langs de) или все.
 *   UI (ARB):  bun scripts/translate.ts --ui [флаги]
 *              Канон ключей — cognitive_psy/lib/l10n/app_ru.arb → app_<lang>.arb;
 *              доперевод недостающих/изменившихся ключей, purge мёртвых.
 *
 * Общие флаги:
 *   --dry-run                 только анализ (missing/changed/dead), без модели и записи
 *   --langs a,b,c             подмножество локалей (по умолчанию все)
 *   --full (--force)          перевести всё заново, игнорируя инкрементальность
 *   --retries N               ретраев на язык (по умолчанию 2; со 2-й попытки json_mode)
 *   --retranslate-changed=X   перезаписывать переводы изменившихся ru-строк (по умолчанию true)
 *   --provider vllm|chatgpt|claude|gemini|mistral   (по умолчанию vllm; остальные — legacy CDP)
 *   --concurrency N           одновременных запросов к модели (по умолчанию 3)
 *   --priority N              приоритет в очереди vLLM: больше = позже (по умолчанию 10)
 *   --no-judge                отключить коллегию после перевода (по умолчанию включена:
 *                             audit --apply циклом до раунда без правок, не более --judge-rounds)
 *   --judge-rounds N          максимум раундов коллегии (по умолчанию 3)
 *   --chunk-leaves N          размер чанка перевода в листьях (по умолчанию 40)
 *   --no-main-path-map        вернуть документный формат ответа MAIN
 *                             (по умолчанию — плоская карта «путь → перевод»)
 *   --ui-batch removed        ui-режим чанкуется общим механизмом (--chunk-leaves)
 *   --limit-keys N            канарейка: перевести N ключей, равномерно по канону
 *                             (ui-режим; сэмпл покрывает весь файл, не одну зону)
 *   --endpoint URL, --model NAME, --state PATH, --psy-dir PATH
 *   --stage-model stage=NAME[,stage=NAME]
 *                             пер-стадийная модель (main/editor/review/fix):
 *                             запросы стадии уходят с этим именем модели.
 *                             Требует мульти-модельный endpoint, роутящий по
 *                             имени в теле (agy-шим scripts/agy_proxy.py:8107 —
 *                             старший Gemini из подписки для «критических»
 *                             стадий, bulk остаётся на локальной gemma)
 *
 * Требует поднятого туннеля к vLLM (для провайдера vllm):
 *   ssh -f -N -L 18000:127.0.0.1:8000 coolswood@192.168.31.18
 *
 * State (scripts/translation-state.json) коммитится: per-key sha1 ru-значений,
 * первый прогон инициализирует его существующими переводами.
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseCli } from './lib/cli.js';
import { ALL_TARGET_LANGS, LANG_NAMES, normalizeLangCode } from './lib/lang-codes.js';
import {
  VllmClient,
  createLegacyClient,
  buildStagePrompts,
  runPipeline,
  setModelConcurrency,
  mergeSubset,
  buildTreeFromPaths,
  type StageClient,
  type StageModelMap,
} from './lib/pipeline.js';
import { MAX_REPAIR_GROUPS, repairDuplicateGroups } from './lib/duplicate-repair.js';
import { TranslationState, type ScopeState } from './lib/state.js';
import { analyzeTree, keysToTranslate, type Analysis } from './lib/analyze.js';
import {
  validateTranslation,
  findDuplicateGroups,
  extractTagSignatures,
  type ValidationIssue,
} from './lib/validation.js';
import { judgeFile } from './lib/judge.js';
import { restoreMediaPaths, sourceLeavesForLang } from './lib/media-paths.js';
import { reconcileInstagramTags } from './lib/tag-reconcile.js';
import {
  flattenLeaves,
  buildSubtree,
  applyLeaves,
  removeLeaves,
  type Leaves,
} from './lib/tree.js';
import { writeJsonAtomic, readJsonOr } from './lib/atomic-fs.js';

// ─────────────────────────────────────────────────────────────────────────────
// Корень репо и конфиг
// ─────────────────────────────────────────────────────────────────────────────

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (process.cwd() !== ROOT && !process.cwd().startsWith(ROOT + path.sep)) {
  process.chdir(ROOT); // prompt-loader и пути i18n считают, что мы в корне репо
}

interface Config {
  sourceLocale: string;
  targetLocales: string[] | null;
  psyDir: string;
  endpoint: string;
  model: string;
  /**
   * Пер-стадийные override'ы модели (мульти-модельный endpoint — agy-шим
   * scripts/agy_proxy.py роутит по имени модели в теле запроса). Пример:
   * {"review": "gemini-3.1-pro-high"} — стадия review на старшей модели,
   * остальной bulk на модели `model`. CLI --stage-model перекрывает по ключам.
   */
  stageModels: StageModelMap;
  statePath: string;
  retries: number;
  requestTimeoutMs: number;
  /** Одновременных запросов к модели (общий семафор VllmClient). */
  concurrency: number;
  /** Приоритет запросов в очереди vLLM: больше = позже (перевод — фон). */
  requestPriority: number;
}

async function loadConfig(): Promise<Config> {
  const file = await readJsonOr<Partial<Config>>(path.join(ROOT, 'scripts', 'translate.config.json'), {});
  const cfg: Config = {
    sourceLocale: file.sourceLocale ?? 'ru',
    targetLocales: file.targetLocales ?? null,
    psyDir: file.psyDir ?? '',
    endpoint: file.endpoint ?? 'http://127.0.0.1:18000/v1',
    model: file.model ?? 'google/gemma-4-26B-A4B-it',
    stageModels: sanitizeStageModels(file.stageModels, 'translate.config.json'),
    statePath: file.statePath ?? 'scripts/translation-state.json',
    retries: file.retries ?? 2,
    requestTimeoutMs: file.requestTimeoutMs ?? 600_000,
    concurrency: file.concurrency ?? 3,
    requestPriority: file.requestPriority ?? 10,
  };
  if (process.env.TRANSLATE_ENDPOINT) cfg.endpoint = process.env.TRANSLATE_ENDPOINT;
  if (process.env.TRANSLATE_MODEL) cfg.model = process.env.TRANSLATE_MODEL;
  if (process.env.TRANSLATE_STATE_PATH) cfg.statePath = process.env.TRANSLATE_STATE_PATH;
  return cfg;
}

// ─────────────────────────────────────────────────────────────────────────────
// CLI
// ─────────────────────────────────────────────────────────────────────────────

interface Args {
  ui: boolean;
  fileArg: string | null;
  langs: string[] | null;
  dryRun: boolean;
  full: boolean;
  retries: number;
  retranslateChanged: boolean;
  provider: string;
  endpoint?: string;
  model?: string;
  statePath?: string;
  psyDir?: string;
  concurrency?: number;
  priority?: number;
  judge: boolean;
  judgeRounds: number;
  /** Размер чанка перевода в листьях (по умолчанию из pipeline). */
  chunkLeaves?: number;
  /** MAIN отвечает плоской картой «путь → перевод» (экспериментальный формат). */
  mainPathMap: boolean;
  /** Канарейка: ограничить перевод N ключами, равномерно по каноническому порядку (ui). */
  limitKeys?: number;
  /** Пер-стадийные модели (CLI --stage-model поверх конфига). */
  stageModels: StageModelMap;
}

function parseBoolFlag(raw: string | undefined, defaultValue: boolean): boolean {
  if (raw === undefined) return defaultValue;
  const v = raw.replace(/^=/, '').trim().toLowerCase();
  if (v === '' || v === 'true' || v === '1') return true;
  if (v === 'false' || v === '0') return false;
  console.warn(`⚠️ Некорректное значение флага «${raw}» — использую ${defaultValue}.`);
  return defaultValue;
}

/** Число ретраев; NaN = флаг не задан → берётся из конфига. */
function parseRetries(raw: string | undefined): number {
  if (raw === undefined) return Number.NaN;
  const n = parseInt(raw, 10);
  return Number.isNaN(n) ? Number.NaN : n;
}

const STAGE_NAMES = ['main', 'editor', 'review', 'fix'] as const;

/** Карта «стадия → модель» из объекта конфига: неизвестные стадии — warning. */
function sanitizeStageModels(raw: unknown, where: string): StageModelMap {
  const out: StageModelMap = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const [stage, model] of Object.entries(raw as Record<string, unknown>)) {
    if (!(STAGE_NAMES as readonly string[]).includes(stage)) {
      console.warn(`⚠️ ${where}: неизвестная стадия «${stage}» (нужна одна из ${STAGE_NAMES.join('/')}) — игнорирую.`);
      continue;
    }
    if (typeof model === 'string' && model.trim()) out[stage as keyof StageModelMap] = model.trim();
  }
  return out;
}

/** Карта «стадия → модель» из CLI: список stage=имя через запятую. */
function parseStageModelPairs(raw: string, where: string): StageModelMap {
  const joined: Record<string, string> = {};
  for (const part of raw.split(',')) {
    if (!part.trim()) continue;
    const eq = part.indexOf('=');
    if (eq === -1) {
      console.warn(`⚠️ ${where}: «${part}» без '=' (формат stage=имя) — игнорирую.`);
      continue;
    }
    joined[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
  }
  return sanitizeStageModels(joined, where);
}

function parseIntFlag(raw: string | undefined): number | undefined {
  if (raw === undefined) return undefined;
  const n = parseInt(raw, 10);
  return Number.isNaN(n) ? undefined : n;
}

function parseArgs(): Args {
  const { flags, positional } = parseCli();
  const ui = parseBoolFlag(flags.ui, false);
  const fileArg = positional[0] ?? flags.file ?? null;
  if (!ui && !fileArg) {
    console.error(
      '❌ Укажите файл/каталог внутри src/i18n/ru (напр. story/start.json) или флаг --ui.\n' +
        '   Примеры:\n' +
        '     bun scripts/translate.ts story/start.json\n' +
        '     bun scripts/translate.ts story/start.json --langs ja,ko\n' +
        '     bun scripts/translate.ts --ui --dry-run',
    );
    process.exit(2);
  }
  let langs: string[] | null = null;
  if (flags.langs || flags.lang) {
    langs = (flags.langs || flags.lang)
      .split(',')
      .map((l) => normalizeLangCode(l))
      .filter(Boolean);
  }
  return {
    ui,
    fileArg,
    langs,
    dryRun: parseBoolFlag(flags['dry-run'], false),
    full: parseBoolFlag(flags.full, false) || parseBoolFlag(flags.force ?? flags.f, false),
    retries: parseRetries(flags.retries),
    retranslateChanged: parseBoolFlag(flags['retranslate-changed'], true),
    provider: (flags.provider || 'vllm').toLowerCase(),
    endpoint: flags.endpoint,
    model: flags.model,
    statePath: flags.state,
    psyDir: flags['psy-dir'],
    concurrency: parseIntFlag(flags.concurrency),
    priority: parseIntFlag(flags.priority),
    judge: !parseBoolFlag(flags['no-judge'], false),
    judgeRounds: parseIntFlag(flags['judge-rounds']) ?? 3,
    chunkLeaves: parseIntFlag(flags['chunk-leaves']),
    // Path-map — формат main по умолчанию (de-батч: 14:2 стабильных побед
    // слепого судьи, ноль потерь листьев). --no-main-path-map возвращает
    // документный формат; see AI_INSTRUCTIONS — известное ограничение:
    // монотонно-повторяющиеся секции могут зациклить генерацию.
    mainPathMap: parseBoolFlag(flags['main-path-map'], !parseBoolFlag(flags['no-main-path-map'], false)),
    limitKeys: parseIntFlag(flags['limit-keys']),
    stageModels: flags['stage-model']
      ? parseStageModelPairs(flags['stage-model'], '--stage-model')
      : {},
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Отчёт dry-run
// ─────────────────────────────────────────────────────────────────────────────

function short(paths: string[], max = 5): string {
  const shown = paths.slice(0, max).join(', ');
  return paths.length > max ? `${shown} … (+${paths.length - max})` : shown;
}

function printAnalysis(
  title: string,
  lang: string,
  a: Analysis,
  toTranslate: string[],
): void {
  if (a.missing.length === 0 && a.changed.length === 0 && a.dead.length === 0) {
    console.log(`   ✅ ${lang}: актуально`);
    return;
  }
  const parts: string[] = [];
  if (a.missing.length > 0) parts.push(`отсутствуют ${a.missing.length}`);
  if (a.changed.length > 0) parts.push(`изменились ${a.changed.length}`);
  if (a.dead.length > 0) parts.push(`мёртвые ${a.dead.length}`);
  console.log(`   📦 ${lang}: ${parts.join(', ')} → к переводу ${toTranslate.length}`);
  if (a.changed.length > 0) console.log(`      🔄 изменились: ${short(a.changed)}`);
  if (a.dead.length > 0) console.log(`      🧹 мёртвые: ${short(a.dead)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Общие детали прогона
// ─────────────────────────────────────────────────────────────────────────────

interface RunCtx {
  client: StageClient;
  state: TranslationState;
  cfg: Config;
  args: Args;
  retries: number;
  langs: string[];
  /** Воркеров пула (и одновременных запросов к модели). */
  concurrency: number;
}

/** Проблемы валидации в читаемый лог. */
function logIssues(lang: string, issues: ValidationIssue[]): void {
  for (const { path: p, message } of issues.slice(0, 20)) {
    console.warn(`   ⚠️ [${lang}][${p}] ${message}`);
  }
  if (issues.length > 20) console.warn(`   … и ещё ${issues.length - 20}`);
}

/**
 * Проблемные листья для точечной добивки: потерянные/пустые, листья с
 * по-листовыми замечаниями валидации (плейсхолдеры, чужие алфавиты), листья
 * групп дублей и локально разбалансированные по тегам (если валидация
 * ругалась на теги на уровне файла). Пути — без ведущего слэша.
 */
function collectProblemPaths(
  lang: string,
  sentLeaves: Leaves,
  result: any,
  issues: ValidationIssue[],
): string[] {
  const paths = new Set<string>();
  // Единое пространство ключей — БЕЗ ведущего слэша: sentLeaves контент-режима
  // несёт «/0/translation», а плоская карта результата и пути замечаний —
  // «0/translation». Раньше сверка slashed↔bare браковала ВСЕ листья
  // («потеряны»), кап добивки превышался и любая ошибка валидации вела
  // к полному ретраю файла вместо точечного ремонта.
  const sent: Record<string, string> = {};
  for (const k of Object.keys(sentLeaves)) sent[k.replace(/^\//, '')] = sentLeaves[k]!;
  const flatRaw = flattenLeaves(result);
  const flat: Record<string, unknown> = {};
  for (const k of Object.keys(flatRaw)) flat[k.replace(/^\//, '')] = flatRaw[k];
  const hasTagIssue = issues.some((i) => i.path === '(файл)' && i.message.includes('теги'));
  for (const [p, ru] of Object.entries(sent)) {
    const tr = flat[p];
    if (typeof tr !== 'string' || !tr.trim()) {
      paths.add(p); // потерянные или пустые
      continue;
    }
    if (hasTagIssue && extractTagSignatures(ru).length !== extractTagSignatures(tr).length) {
      paths.add(p);
    }
  }
  for (const iss of issues) {
    if (iss.path !== '(файл)') paths.add(iss.path);
  }
  for (const group of findDuplicateGroups(lang, sentLeaves, result)) {
    for (const p of group.paths) paths.add(p);
  }
  return [...paths].filter((p) => p in sent);
}

/** Один прогон конвейера с ретраями и валидацией. Возвращает листья перевода или null. */
async function translateWithRetries(
  ctx: RunCtx,
  lang: string,
  kind: 'text' | 'ui',
  payload: any,
  sentLeaves: Leaves,
  context?: Record<string, string>,
  meta?: Record<string, any>,
  /** Текущие переводы целевого файла (те же ключи): источник спасения листьев. */
  fallbackLeaves?: Leaves,
): Promise<Leaves | null> {
  const prompts = await buildStagePrompts(kind, lang.toLowerCase(), {
    glossaryPath: path.join(ROOT, 'scripts', 'prompts', lang.toLowerCase(), 'glossary.json'),
  });

  let lastError: unknown = null;
  let lastResult: any = null;
  for (let attempt = 1; attempt <= ctx.retries + 1; attempt++) {
    if (attempt > 1) {
      console.log(`   🔁 Попытка ${attempt}/${ctx.retries + 1} для ${lang}...`);
      await new Promise((r) => setTimeout(r, 3000));
    }
    try {
      const { data, timings } = await runPipeline(ctx.client, prompts, payload, lang, {
        sourceLocale: ctx.cfg.sourceLocale,
        jsonModeMain: attempt > 1, // битый JSON → пробуем json_object
        context,
        chunkLeaves: ctx.args.chunkLeaves,
        mainPathMap: ctx.args.mainPathMap,
        meta,
        stageModels: ctx.args.stageModels,
      });

      // ui-режим: модель может эхом вернуть обёртку {lang: {key: val}} —
      // снимаем её; написание локали нормализуем (pt-BR/pt_br → pt_BR).
      let result: any = data;
      if (kind === 'ui') {
        const envelopeKey =
          result && typeof result === 'object' && !Array.isArray(result)
            ? Object.keys(result).find(
                (k) => normalizeLangCode(k) === normalizeLangCode(lang) && result[k] && typeof result[k] === 'object',
              )
            : undefined;
        result = envelopeKey ? result[envelopeKey] : result;
        if (result && typeof result === 'object' && !Array.isArray(result)) {
          // @-мета не переводится и в ответе не нужна.
          for (const k of Object.keys(result)) if (k.startsWith('@')) delete result[k];
        }
      }

      // Медиа-пути (stories.json: img/video) не переводятся: у моделей рука
      // дёргается «локализовать» сегмент пути или имя файла. Чинится
      // детерминированно до валидации, без расхода ретраев; повторяется после
      // каждой добивки (ответ добивки мержится в result без этого guard'а).
      const guardMediaPaths = (): void => {
        const fixes = restoreMediaPaths(lang, sentLeaves, result);
        if (fixes.length > 0) {
          console.warn(`   🛠 [${lang}] восстановлены медиа-пути: ${short(fixes)}`);
        }
      };
      guardMediaPaths();

      // Instagram-теги — per-locale (легаси en ведёт англоязычные посты):
      // набор тегов en согласуется с состоянием файла до прогона — замена
      // ids, удаление ru-тегов, которых в en не было, вставка en-тегов.
      {
        const igFixes = reconcileInstagramTags(lang, result, fallbackLeaves ?? {});
        if (igFixes > 0) {
          console.warn(`   🛠 [${lang}] instagram-теги согласованы с легаси: ${igFixes} листьев`);
        }
      }

      const issues = validateTranslation(lang, sentLeaves, result);
      if (issues.length > 0) {
        console.warn(`   ❌ Валидация ${lang} не пройдена (попытка ${attempt}):`);
        logIssues(lang, issues);
        lastError = new Error(`validation: ${issues.length} проблем`);

        // Дубли («крючки»): полным ретраем чинятся плохо — модель стабильно
        // унифицирует близкие оригиналы. Точечная разведка пар (как recovery
        // для потерянных листьев): маленький запрос правит только затронутые
        // листья, попытка спасается целиком.
        let repairedClean = false;
        if (kind === 'text') {
          const groups = findDuplicateGroups(lang, sentLeaves, result);
          if (groups.length > MAX_REPAIR_GROUPS) {
            console.warn(`   ⚠️ Групп дублей ${groups.length} > ${MAX_REPAIR_GROUPS} — обычный ретрай.`);
          } else if (groups.length > 0) {
            console.log(`   🩹 Дубли: ${groups.length} групп — точечная разведка пар.`);
            const fixed = await repairDuplicateGroups(
              ctx.client,
              prompts.main,
              lang,
              ctx.cfg.sourceLocale,
              sentLeaves,
              result,
              groups,
            );
            guardMediaPaths();
            const again = validateTranslation(lang, sentLeaves, result);
            if (fixed > 0 && again.length === 0) {
              console.log(`   🩹 Пары разведены (${fixed} правок) — валидация пройдена, файл спасён без ретрая.`);
              repairedClean = true;
            } else {
              console.warn(`   ⚠️ Разведка не спасла (правок ${fixed}, проблем после: ${again.length}) — обычный ретрай.`);
              if (again.length > 0 && again.length < issues.length) logIssues(lang, again);
            }
          }
        }

        // Точечная добивка: один битый лист не должен перегонять весь файл.
        // Проблемные листья проходят полный конвейер на мини-payload, ответ
        // вписывается по путям, валидация повторяется (до 2 проходов).
        // Полный ретрай — только если добивка не спасла или проблем много
        // (системный сбой: >25% листьев или больше 6).
        if (!repairedClean) {
          const total = Object.keys(sentLeaves).length;
          const cap = Math.max(6, Math.ceil(total * 0.25));
          let targets = collectProblemPaths(lang, sentLeaves, result, issues);
          if (targets.length === 0 || targets.length > cap) {
            console.warn(
              `   ⚠️ Точечная добивка нецелесообразна (${targets.length}/${total} листьев, кап ${cap}) — полный ретрай.`,
            );
          } else {
            const targetSet = new Set(targets);
            const subMeta = meta
              ? Object.fromEntries(Object.entries(meta).filter(([k]) => targetSet.has(k)))
              : undefined;
            for (let pass = 1; pass <= 2 && !repairedClean && targets.length > 0; pass++) {
              console.log(`   🩹 Точечная добивка (проход ${pass}): листьев ${targets.length} — ${short(targets)}`);
              try {
                // ru-значения — по bare-ключу (targets без слэша, sentLeaves
                // контент-режима — со слэшом).
                const sentBare: Record<string, string> = {};
                for (const k of Object.keys(sentLeaves)) sentBare[k.replace(/^\//, '')] = sentLeaves[k]!;
                const subPayload = buildTreeFromPaths(
                  Object.fromEntries(targets.map((p) => [p, sentBare[p] ?? ''])),
                );
                const { data: subData } = await runPipeline(ctx.client, prompts, subPayload, lang, {
                  sourceLocale: ctx.cfg.sourceLocale,
                  jsonModeMain: true,
                  context,
                  mainPathMap: ctx.args.mainPathMap,
                  meta: subMeta,
                  stageModels: ctx.args.stageModels,
                });
                mergeSubset(result, subData, `repair${pass > 1 ? `-${pass}` : ''}`);
              } catch (e) {
                console.warn(`   ⚠️ Добивка не удалась: ${(e as Error)?.message ?? e}`);
                break;
              }
              guardMediaPaths();
              const again = validateTranslation(lang, sentLeaves, result);
              if (again.length === 0) {
                console.log(`   🩹 Добивка спасла попытку (${targets.length} листьев перегнано) — без полного ретрая.`);
                repairedClean = true;
                break;
              }
              const next = collectProblemPaths(lang, sentLeaves, result, again);
              const progress = next.length < targets.length;
              logIssues(lang, again);
              targets = next;
              if (!progress) break;
            }
          }
        }
        // Анонимный прогон: модель якорится на осмысленном английском ключе
        // («breathing_sec_left» → выдуманный {count}) и не слушает правила.
        // Застрявшим после добивки листьям ключ в ЗАПРОСЕ нейтрализуется
        // (item_1, item_2, …), перевод идёт по ru-тексту и мете, ответ маппится
        // обратно. Дешёвый шаг перед дорогим полным ретраем — только для
        // листьев, которые не спасла добивка.
        if (!repairedClean) {
          const again = validateTranslation(lang, sentLeaves, result);
          const stuck = collectProblemPaths(lang, sentLeaves, result, again);
          const total = Object.keys(sentLeaves).length;
          const cap = Math.max(6, Math.ceil(total * 0.25));
          if (stuck.length > 0 && stuck.length <= cap) {
            const anonMap = new Map(stuck.map((p, i) => [p, `item_${i + 1}`]));
            const anonMeta = meta
              ? Object.fromEntries(
                  Object.entries(meta)
                    .filter(([k]) => anonMap.has(k))
                    .map(([k, v]) => [anonMap.get(k)!, v]),
                )
              : undefined;
            try {
              // ru-значения — по bare-ключу (stuck без слэша, sentLeaves
              // контент-режима — со слэшом; UI-режим и так bare).
              const sentBare: Record<string, string> = {};
              for (const k of Object.keys(sentLeaves)) sentBare[k.replace(/^\//, '')] = sentLeaves[k]!;
              const anonPayload = Object.fromEntries(
                stuck.map((p) => [anonMap.get(p)!, sentBare[p] ?? '']),
              );
              console.log(
                `   🫥 Анонимный прогон: ${stuck.length} застрявших ключей нейтрализованы — ${short(stuck)}`,
              );
              const { data: anonData } = await runPipeline(ctx.client, prompts, anonPayload, lang, {
                sourceLocale: ctx.cfg.sourceLocale,
                jsonModeMain: true,
                // Контекст соседей СОЗНАТЕЛЬНО не передаётся: у подписей рядом
                // с ICU-ключами он сам становится якорем (модель копирует
                // {count}-паттерн и inventит плейсхолдер). Анонимный прогон —
                // максимально чистый: нейтральный ключ + ru-текст + мета.
                mainPathMap: ctx.args.mainPathMap,
                meta: anonMeta,
                stageModels: ctx.args.stageModels,
              });
              // Маппинг назад: item_N → оригинальный путь/ключ.
              const flatAnon = flattenLeaves(anonData);
              const back: Record<string, string> = {};
              for (const [p, anon] of anonMap) {
                const v = flatAnon[anon] ?? flatAnon[`/${anon}`];
                if (typeof v === 'string' && v.trim()) back[p] = v;
              }
              mergeSubset(result, buildTreeFromPaths(back), 'anon');
              guardMediaPaths();
              const finalIssues = validateTranslation(lang, sentLeaves, result);
              if (finalIssues.length === 0) {
                console.log(`   🫥 Анонимный прогон спас попытку (${stuck.length} листьев) — без полного ретрая.`);
                repairedClean = true;
              } else {
                logIssues(lang, finalIssues);
              }
            } catch (e) {
              console.warn(`   ⚠️ Анонимный прогон не удался: ${(e as Error)?.message ?? e}`);
            }
          }
        }
        if (!repairedClean) {
          lastResult = result;
          continue;
        }
      }
      const stageTimes = [
        `main=${(timings.main / 1000).toFixed(0)}s`,
        `editor=${(timings.editor / 1000).toFixed(0)}s`,
      ];
      if (prompts.review && prompts.fix) {
        stageTimes.push(`review=${((timings.review ?? 0) / 1000).toFixed(0)}s`);
        if (timings.fix != null) stageTimes.push(`fix=${(timings.fix / 1000).toFixed(0)}s`);
      } else if (timings.tech != null) {
        stageTimes.push(`tech=${(timings.tech / 1000).toFixed(0)}s`);
      }
      console.log(`   ⏱ ${lang}: ${stageTimes.join(' ')}`);
      // Пути без ведущего слэша: UI-режим ищет по «сырым» ключам ARB.
      const leaves = flattenLeaves(result);
      const normalized: Leaves = {};
      for (const k of Object.keys(leaves)) normalized[k.replace(/^\//, '')] = leaves[k];
      return normalized;
    } catch (e: any) {
      lastError = e;
      console.warn(`   ⚠️ Ошибка конвейера ${lang} (попытка ${attempt}): ${e?.message ?? e}`);
      if (e?.stack) console.warn(`   ${e.stack.split('\n').slice(0, 6).join('\n   ')}`);
    }
  }

  // Спасение листа: упрямый ключ (модель стабильно ломает один лист — например,
  // выдумывает плейсхолдер, подсказанный английским именем ключа) не должен
  // топить весь файл. Лист берётся из результата последней попытки, если он
  // валиден по-листу; иначе остаётся СТАРЫЙ перевод из целевого файла, если
  // он есть и валиден. Всё громко логируется; некрытый лист — провал как раньше.
  if (lastResult != null && fallbackLeaves) {
    const flatRaw = flattenLeaves(lastResult);
    const bare: Record<string, unknown> = {};
    for (const k of Object.keys(flatRaw)) bare[k.replace(/^\//, '')] = flatRaw[k];
    const leafValid = (k: string, v: unknown): boolean =>
      typeof v === 'string' &&
      v.trim() !== '' &&
      validateTranslation(lang, { [k]: sentLeaves[k] ?? '' }, { [k]: v }).length === 0;
    const salvaged: Leaves = {};
    const keptOld: string[] = [];
    let impossible = false;
    for (const rawKey of Object.keys(sentLeaves)) {
      const k = rawKey.replace(/^\//, '');
      if (leafValid(k, bare[k])) {
        salvaged[rawKey] = bare[k] as string;
        continue;
      }
      const fb = fallbackLeaves[k] ?? fallbackLeaves[rawKey];
      if (leafValid(k, fb)) {
        salvaged[rawKey] = fb;
        keptOld.push(k);
        continue;
      }
      impossible = true;
      break;
    }
    if (!impossible) {
      // Медиа-пути в спасённых листьях канонизируем: старый перевод мог
      // остаться с доисторическим сегментом пути.
      restoreMediaPaths(lang, sentLeaves, salvaged);
      console.warn(
        `   🪢 Спасение: за ${ctx.retries + 1} попыток конвейер не дал полностью валидный перевод — ` +
          (keptOld.length > 0
            ? `${keptOld.length} листьев (из ${Object.keys(sentLeaves).length}) остались со СТАРЫМ переводом: ${short(keptOld)}`
            : 'все листья валидны'),
      );
      return salvaged;
    }
  }
  console.error(`   🛑 ${lang}: провалено после ${ctx.retries + 1} попыток (${(lastError as any)?.message ?? lastError}).`);
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Режим КОНТЕНТ
// ─────────────────────────────────────────────────────────────────────────────

/** Раскрывает аргумент (файл или каталог внутри src/i18n/ru) в список относительных путей .json. */
async function resolveContentFiles(fileArg: string): Promise<string[]> {
  const ruRoot = path.join(ROOT, 'src', 'i18n', 'ru');
  const abs = path.resolve(ruRoot, fileArg);
  if (!abs.startsWith(ruRoot + path.sep) && abs !== ruRoot) {
    console.error(`❌ Путь ${fileArg} должен быть внутри src/i18n/ru.`);
    process.exit(2);
  }
  const st = await fs.stat(abs).catch(() => null);
  if (!st) {
    console.error(`❌ Не найдено: src/i18n/ru/${fileArg}`);
    process.exit(2);
  }
  const rel = path.relative(ruRoot, abs);
  if (st.isFile()) return [rel.split(path.sep).join('/')];
  const out: string[] = [];
  async function walk(dir: string): Promise<void> {
    for (const item of await fs.readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) await walk(full);
      else if (item.name.endsWith('.json')) {
        out.push(path.relative(ruRoot, full).split(path.sep).join('/'));
      }
    }
  }
  await walk(abs);
  out.sort();
  return out;
}

interface ContentItem {
  relPath: string;
  ruJson: any;
  ruLeaves: Leaves;
  scopeId: string;
  scope: ScopeState;
  perLang: Record<string, Analysis>;
}

async function runContent(ctx: RunCtx): Promise<number> {
  const { args, cfg } = ctx;
  const relFiles = await resolveContentFiles(args.fileArg!);
  console.log(`📄 Файлов: ${relFiles.length} (${relFiles.slice(0, 5).join(', ')}${relFiles.length > 5 ? ' …' : ''})`);

  // 1. Загрузка ru + анализ по всем файлам и языкам.
  const items: ContentItem[] = [];
  for (const relPath of relFiles) {
    const ruJson = await readJsonOr<any>(path.join(ROOT, 'src', 'i18n', 'ru', relPath), null);
    if (ruJson == null) {
      console.error(`❌ Не удалось прочитать src/i18n/ru/${relPath}`);
      return 2;
    }
    const ruLeaves = flattenLeaves(ruJson);
    const scopeId = `content:${relPath}`;
    const scope = ctx.state.ensureScope(scopeId, ruLeaves);
    const perLang: Record<string, Analysis> = {};
    for (const lang of ctx.langs) {
      const targetPath = path.join(ROOT, 'src', 'i18n', lang.toLowerCase(), relPath);
      const target = await readJsonOr<any>(targetPath, {});
      // Видео-медиа существуют только для ru: в остальных локалях видео-листья
      // не переводятся и выпиливаются из целевых файлов как «мёртвые».
      perLang[lang] = analyzeTree(sourceLeavesForLang(ruLeaves, lang), flattenLeaves(target), scope, {
        retranslateChanged: args.retranslateChanged,
      });
    }
    items.push({ relPath, ruJson, ruLeaves, scopeId, scope, perLang });
  }

  // 2. Dry-run: отчёт, фиксация инициализированного state и выход.
  if (args.dryRun) {
    let tMissing = 0,
      tChanged = 0,
      tDead = 0,
      tTodo = 0;
    for (const item of items) {
      console.log(`\n📋 ${item.relPath} (листьев ru: ${Object.keys(item.ruLeaves).length})`);
      for (const lang of ctx.langs) {
        const a = item.perLang[lang];
        const todo = keysToTranslate(a, args.full, Object.keys(item.ruLeaves));
        tMissing += a.missing.length;
        tChanged += a.changed.length;
        tDead += a.dead.length;
        tTodo += todo.length;
        printAnalysis(item.relPath, lang, a, todo);
      }
    }
    console.log(
      `\n📊 ИТОГО по ${ctx.langs.length} локалям: отсутствуют ${tMissing}, изменились ${tChanged}, мёртвые ${tDead}, к переводу ${tTodo}.`,
    );
    if (args.full) console.log('ℹ️  Режим --full: к переводу пойдут ВСЕ ключи.');
    // Инициализация state — легитимный эффект dry-run: без сохранения базлайн
    // якорился бы заново при каждом запуске и изменения ru не детектились бы.
    await ctx.state.save();
    return 0;
  }

  // 3. Purge мёртвых ключей (до перевода — срабатывает даже если переводить нечего).
  for (const item of items) {
    for (const lang of ctx.langs) {
      const dead = item.perLang[lang].dead;
      if (dead.length === 0) continue;
      const targetPath = path.join(ROOT, 'src', 'i18n', lang.toLowerCase(), item.relPath);
      const target = await readJsonOr<any>(targetPath, null);
      if (target == null) continue;
      removeLeaves(target, dead);
      await writeJsonAtomic(targetPath, target);
      const removed = ctx.state.pruneScope(item.scope, new Set(Object.keys(item.ruLeaves)));
      console.log(`🧹 ${lang} ${item.relPath}: удалено мёртвых ключей: ${dead.length}${removed ? `, из state: ${removed}` : ''}`);
    }
  }
  await ctx.state.save();

  // 4. Перевод: пул воркеров по задачам файл×язык; лимит одновременных
  // запросов к модели держит семафор VllmClient, воркеров — не больше concurrency.
  const tasks: Array<{ item: ContentItem; lang: string; todo: string[] }> = [];
  for (const item of items) {
    for (const lang of ctx.langs) {
      const todo = keysToTranslate(
        item.perLang[lang],
        args.full,
        Object.keys(sourceLeavesForLang(item.ruLeaves, lang)),
      );
      if (todo.length === 0) {
        console.log(`⏭  ${lang} ${item.relPath}: актуально`);
        continue;
      }
      tasks.push({ item, lang, todo });
    }
  }

  let failures = 0;
  let cursor = 0;
  /** Переведённые листья по файлам и локалям — для коллегии после перевода. */
  const judgeTargets: Record<string, Record<string, string[]>> = {};
  const worker = async (): Promise<void> => {
    while (cursor < tasks.length) {
      const { item, lang, todo } = tasks[cursor++]!;
      console.log(
        `\n🌐 ${lang} (${LANG_NAMES[lang] ?? lang}) ${item.relPath}: ключей к переводу ${todo.length}`,
      );

      const payload = buildSubtree(item.ruJson, todo);
      const sentLeaves: Leaves = {};
      for (const p of todo) sentLeaves[p] = item.ruLeaves[p];

      // Fallback для спасения листьев — текущие переводы целевого файла
      // (только для ключей, которые уже есть; новые остаются требованиями).
      const targetPath = path.join(ROOT, 'src', 'i18n', lang.toLowerCase(), item.relPath);
      const currentTarget = await readJsonOr<any>(targetPath, {});
      const translated = await translateWithRetries(
        ctx, lang, 'text', payload, sentLeaves, undefined, undefined, flattenLeaves(currentTarget ?? {}),
      );
      if (!translated) {
        failures++;
        continue;
      }

      // Запись: только после полного успеха; target читаем свежим (не залипшим).
      const target = await readJsonOr<any>(targetPath, {});
      applyLeaves(target, translated);
      await writeJsonAtomic(targetPath, target);
      ctx.state.markTranslated(item.scope, sentLeaves);
      await ctx.state.save();
      console.log(`   💾 Записано ${Object.keys(translated).length} ключей → ${path.relative(ROOT, targetPath)}`);
      (judgeTargets[item.relPath] ??= {})[lang] = todo;
    }
  };
  await Promise.all(Array.from({ length: Math.min(ctx.concurrency, tasks.length) }, worker));

  // Коллегия: судим только что переведённые листья, правки вписываются циклом
  // до раунда без правок («критикуй отдельно, правь отдельно» поверх конвейера).
  if (ctx.args.judge) {
    for (const [relPath, perLang] of Object.entries(judgeTargets)) {
      const ruJson = items.find((i) => i.relPath === relPath)?.ruJson;
      if (!ruJson) continue;
      const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
      const results = await judgeFile({
        client: ctx.client,
        relFile: relPath,
        ruJson,
        perLang,
        apply: true,
        maxRounds: ctx.args.judgeRounds,
        reportDir: path.join('scripts', 'qa', 'reports', `${stamp}-judge-${relPath.replace(/[/.]/g, '-').replace(/^-|-$/g, '')}`),
      });
      const fixed = results.reduce((n, r) => n + r.totalApplied, 0);
      const notConverged = results.filter((r) => !r.converged).map((r) => r.lang);
      console.log(
        `\n⚖️ Коллегия по ${relPath}: правок ${fixed}` +
          (notConverged.length > 0 ? `; НЕ сошлись локали: ${notConverged.join(', ')}` : '; сошлось'),
      );
    }
  }
  return failures;
}

// ─────────────────────────────────────────────────────────────────────────────
// Режим UI (ARB cognitive_psy)
// ─────────────────────────────────────────────────────────────────────────────

function resolvePsyDir(ctx: RunCtx): string {
  const raw = ctx.args.psyDir || process.env.COGNITIVE_PSY_DIR || ctx.cfg.psyDir;
  if (raw) return path.resolve(ROOT, raw);
  return path.resolve(ROOT, '..', 'cognitive_psy');
}

function arbFilePath(psyDir: string, lang: string): string {
  return path.join(psyDir, 'lib', 'l10n', `app_${lang}.arb`);
}

/**
 * Окно принятых переводов для контекста: до limit ключей, ближайших к партии
 * в каноническом порядке (соседние эмоции/категории попадают в окно).
 */
function uiContextWindow(
  realKeys: string[],
  batch: string[],
  target: Record<string, any>,
  limit = 50,
): Record<string, string> {
  const context: Record<string, string> = {};
  const batchSet = new Set(batch);
  const idxs = batch.map((k) => realKeys.indexOf(k)).filter((i) => i >= 0);
  if (idxs.length === 0) return context;
  const lo = Math.min(...idxs);
  const hi = Math.max(...idxs);
  for (let d = 0; Object.keys(context).length < limit && (lo - d >= 0 || hi + d < realKeys.length); d++) {
    for (const i of [lo - d, hi + d]) {
      if (i < 0 || i >= realKeys.length) continue;
      const k = realKeys[i];
      if (batchSet.has(k) || k in context) continue;
      const v = target[k];
      if (typeof v === 'string' && v.trim()) context[k] = v;
    }
  }
  return context;
}

/**
 * Предупреждения мобильного UI: разбухание и мусорные пробелы. Не блокируют
 * запись — но строка вдвое длиннее оригинала почти наверняка не влезет в
 * вёрстку; окончательное решение за коллегией (у неё длина теперь в чек-листе).
 */
function warnUiBloat(lang: string, sentLeaves: Leaves, translated: Leaves): void {
  const suspects: string[] = [];
  for (const k of Object.keys(sentLeaves)) {
    const tr = translated[k];
    const ru = sentLeaves[k]!;
    if (typeof tr !== 'string') continue;
    if (ru.length >= 8 && tr.length > ru.length * 2 + 10) {
      suspects.push(`${k}: ${ru.length} → ${tr.length} симв.`);
    }
  }
  if (suspects.length > 0) {
    console.warn(
      `   ⚠️ [ui] ${lang}: подозрение на разбухание (${suspects.length}): ` +
        `${suspects.slice(0, 5).join('; ')}${suspects.length > 5 ? ' …' : ''}`,
    );
  }
}

interface ArbCanon {
  realKeys: string[];
  values: Record<string, string>;
  meta: Record<string, any>;
}

async function loadArbCanon(psyDir: string): Promise<ArbCanon> {
  const ru = await readJsonOr<Record<string, any> | null>(arbFilePath(psyDir, 'ru'), null);
  if (ru == null) {
    console.error(`❌ Не удалось прочитать ${arbFilePath(psyDir, 'ru')}.`);
    process.exit(2);
  }
  const canon: ArbCanon = { realKeys: [], values: {}, meta: {} };
  for (const key of Object.keys(ru)) {
    if (key === '@@locale') continue;
    if (key.startsWith('@')) canon.meta[key] = ru[key];
    else {
      canon.realKeys.push(key);
      canon.values[key] = String(ru[key] ?? '');
    }
  }
  // Роли спорных ключей (ручной актив): для ключей без описания в @-мете
  // подставляем note из base/ui/notes.json — модель должна знать, ГДЕ строка
  // живёт в интерфейсе (таб профиля vs фото, кнопка vs поле, короткий title).
  const notes = await readJsonOr<Record<string, unknown>>(
    path.join(ROOT, 'scripts', 'prompts', 'base', 'ui', 'notes.json'),
    {},
  );
  let noted = 0;
  for (const [key, note] of Object.entries(notes)) {
    if (key.startsWith('$') || typeof note !== 'string' || !note.trim()) continue;
    const metaKey = `@${key}`;
    const existing = canon.meta[metaKey];
    if (existing && existing.description) continue; // авторская @-мета приоритетнее
    canon.meta[metaKey] = { ...(existing ?? {}), description: note };
    noted++;
  }
  if (noted > 0) console.log(`📝 notes.json: подставлено ролей для ${noted} ключей без @-меты.`);
  // ICU-конструкции: Gemma стабильно разворачивает {count, plural, one{…}…}
  // в псевдо-плейсхолдеры ({Punkt}/{Punkte}) — полный прогон de 2026-09-13
  // трижды падал на 6 таких ключах. Каждому ICU-ключу уходит явное правило.
  const ICU_NOTE =
    'ICU-множественное число: сохрани конструкцию {имя, plural, …} ЦЕЛИКОМ; ' +
    'переведи только слова ВНУТРИ категорий; категории приведи к системе целевого языка ' +
    '(например one/other); НЕ превращай слова из категорий в плейсхолдеры и не теряй {имя}.';
  let icu = 0;
  for (const key of canon.realKeys) {
    if (!/\{[a-zA-Z_][a-zA-Z0-9_]*\s*,\s*(plural|select|selectordinal)\s*,/.test(canon.values[key])) continue;
    const metaKey = `@${key}`;
    const existing = canon.meta[metaKey];
    const desc = existing?.description ?? '';
    if (desc.includes('ICU')) continue;
    canon.meta[metaKey] = { ...(existing ?? {}), description: desc ? `${desc} ${ICU_NOTE}` : ICU_NOTE };
    icu++;
  }
  if (icu > 0) console.log(`📝 ICU: правило множественного числа подставлено в ${icu} ключей.`);
  return canon;
}

async function readArbTarget(psyDir: string, lang: string): Promise<Record<string, any>> {
  return readJsonOr<Record<string, any>>(arbFilePath(psyDir, lang), {});
}

function arbLeaves(target: Record<string, any>): Leaves {
  const out: Leaves = {};
  for (const key of Object.keys(target)) {
    if (key === '@@locale' || key.startsWith('@')) continue;
    out[key] = String(target[key] ?? '');
  }
  return out;
}

async function runUi(ctx: RunCtx): Promise<number> {
  const { args } = ctx;
  const psyDir = resolvePsyDir(ctx);
  console.log(`📱 cognitive_psy: ${psyDir}`);
  const canon = await loadArbCanon(psyDir);
  console.log(`📚 Канон app_ru.arb: ${canon.realKeys.length} ключей, ${Object.keys(canon.meta).length} @-мета.`);

  const ruLeaves: Leaves = {};
  for (const k of canon.realKeys) ruLeaves[k] = canon.values[k];
  const scope = ctx.state.ensureScope('ui', ruLeaves);

  const perLang: Record<string, Analysis> = {};
  for (const lang of ctx.langs) {
    const target = await readArbTarget(psyDir, lang);
    perLang[lang] = analyzeTree(ruLeaves, arbLeaves(target), scope, {
      retranslateChanged: args.retranslateChanged,
    });
  }

  if (args.dryRun) {
    let tMissing = 0,
      tChanged = 0,
      tDead = 0,
      tTodo = 0;
    console.log(`\n📋 app_ru.arb → app_<lang>.arb (ключей: ${canon.realKeys.length})`);
    for (const lang of ctx.langs) {
      const a = perLang[lang];
      const todo = keysToTranslate(a, args.full, canon.realKeys);
      tMissing += a.missing.length;
      tChanged += a.changed.length;
      tDead += a.dead.length;
      tTodo += todo.length;
      printAnalysis('ui', lang, a, todo);
    }
    console.log(
      `\n📊 ИТОГО по ${ctx.langs.length} локалям: отсутствуют ${tMissing}, изменились ${tChanged}, мёртвые ${tDead}, к переводу ${tTodo}.`,
    );
    await ctx.state.save(); // та же логика фиксации базлайна, что и в контенте
    return 0;
  }

  // Purge мёртвых ключей (+ их @-мета) — требование merge-валидатора cognitive_psy.
  for (const lang of ctx.langs) {
    const dead = perLang[lang].dead;
    if (dead.length === 0) continue;
    const target = await readArbTarget(psyDir, lang);
    for (const key of dead) {
      delete target[key];
      delete target[`@${key}`];
    }
    await writeJsonAtomic(arbFilePath(psyDir, lang), target);
    ctx.state.pruneScope(scope, new Set(canon.realKeys));
    console.log(`🧹 ${lang}: удалено мёртвых ключей ${dead.length}: ${short(dead)}`);
  }
  await ctx.state.save();

  let failures = 0;
  const uiTasks: Array<{ lang: string; todo: string[] }> = [];
  for (const lang of ctx.langs) {
    let todo = keysToTranslate(perLang[lang], args.full, canon.realKeys);
    if (todo.length === 0) {
      console.log(`⏭  ${lang}: актуально`);
      continue;
    }
    // Канарейка: прореживаем todo равномерно по каноническому порядку —
    // прогон покрывает весь файл, а не одну алфавитную зону ключей.
    if (args.limitKeys && todo.length > args.limitKeys) {
      const sampled: string[] = [];
      for (let i = 0; i < args.limitKeys; i++) {
        sampled.push(todo[Math.floor((i * todo.length) / args.limitKeys)]!);
      }
      console.log(`   🎯 ${lang}: канарейка — ${sampled.length} из ${todo.length} ключей (равномерно)`);
      todo = sampled;
    }
    uiTasks.push({ lang, todo });
  }

  /** Переведённые ключи по локалям (для коллегии; пути со слэшем). */
  const judgeTargets: Record<string, string[]> = {};
  let cursor = 0;
  const worker = async (): Promise<void> => {
    while (cursor < uiTasks.length) {
      const { lang, todo } = uiTasks[cursor++]!;
      console.log(`\n🌐 ${lang} (${LANG_NAMES[lang] ?? lang}): ключей к переводу ${todo.length}`);

      // Целевой ARB читается один раз на язык: по нему строится контекст
      // принятых переводов и в него вписывается результат.
      const targetPath = arbFilePath(psyDir, lang);
      const target = await readArbTarget(psyDir, lang);
      if (!('@@locale' in target)) target['@@locale'] = lang;

      // Источник: плоская карта «ключ → ru» без @-меты. Мета (описания ролей,
      // placeholders) уходит отдельным полем запроса — контекстом, а не
      // переводимым содержимым.
      const payload: Record<string, string> = {};
      const meta: Record<string, any> = {};
      const sentLeaves: Leaves = {};
      for (const key of todo) {
        payload[key] = canon.values[key];
        sentLeaves[key] = canon.values[key];
        const m = canon.meta[`@${key}`];
        if (m !== undefined) meta[key] = m;
      }
      // Контекст принятых переводов: до 50 ключей, ближайших к переводу в
      // каноническом порядке (соседние эмоции/категории попадают в окно).
      const context = uiContextWindow(canon.realKeys, todo, target);

      // Тот же конвейер, что у контента: чанки ≤40 листьев, path-map,
      // editor → review → fix с пер-листовым guard'ом, recovery хвостов.
      // Fallback для спасения листьев — текущие переводы целевого файла.
      const translated = await translateWithRetries(
        ctx, lang, 'ui', payload, sentLeaves, context, meta, arbLeaves(target),
      );
      if (!translated) {
        failures++;
        continue;
      }
      warnUiBloat(lang, sentLeaves, translated);

      // Запись в ARB: @-мета переносится только с placeholders (конвенция cognitive_psy).
      let written = 0;
      for (const key of todo) {
        const value = translated[key];
        if (typeof value !== 'string') continue;
        target[key] = value;
        written++;
        const m = canon.meta[`@${key}`];
        if (m && m.placeholders) {
          target[`@${key}`] = { placeholders: m.placeholders };
        }
      }
      await writeJsonAtomic(targetPath, target);
      ctx.state.markTranslated(scope, sentLeaves);
      await ctx.state.save();
      console.log(`   💾 Вписано ${written} ключей → ${path.relative(ROOT, targetPath)}`);
      judgeTargets[lang] = todo.map((k) => `/${k}`);
    }
  };
  await Promise.all(Array.from({ length: Math.min(ctx.concurrency, uiTasks.length) }, worker));

  // Коллегия для ключей: судит переведённые ключи (партии не нужны — строки
  // короткие), правки вписываются по-ключу, цикл до раунда без правок.
  // Контекст принятых переводов — судья проверяет уникальность и стиль.
  if (ctx.args.judge && Object.keys(judgeTargets).length > 0) {
    const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
    const contextByLang: Record<string, Record<string, string>> = {};
    for (const [lang, keys] of Object.entries(judgeTargets)) {
      const target = await readArbTarget(psyDir, lang);
      contextByLang[lang] = uiContextWindow(
        canon.realKeys,
        keys.map((k) => k.replace(/^\//, '')),
        target,
      );
    }
    const results = await judgeFile({
      client: ctx.client,
      relFile: 'ui/cognitive_psy app_*.arb',
      ruJson: canon.values,
      perLang: judgeTargets,
      apply: true,
      maxRounds: ctx.args.judgeRounds,
      kind: 'ui',
      ruMeta: canon.meta,
      getFileForLang: (l) => arbFilePath(psyDir, l),
      contextByLang,
      reportDir: path.join('scripts', 'qa', 'reports', `${stamp}-judge-ui`),
    });
    const fixed = results.reduce((n, r) => n + r.totalApplied, 0);
    const notConverged = results.filter((r) => !r.converged).map((r) => r.lang);
    console.log(
      `\n⚖️ Коллегия по UI: правок ${fixed}` +
        (notConverged.length > 0 ? `; НЕ сошлись локали: ${notConverged.join(', ')}` : '; сошлось'),
    );
  }
  return failures;
}

// ─────────────────────────────────────────────────────────────────────────────
// main
// ─────────────────────────────────────────────────────────────────────────────

async function main(): Promise<number> {
  const cfg = await loadConfig();
  const args = parseArgs();
  // Пер-стадийные модели: CLI --stage-model перекрывает конфиг по ключам.
  args.stageModels = { ...cfg.stageModels, ...args.stageModels };
  const retries = Number.isNaN(args.retries) ? cfg.retries : args.retries;
  const concurrency = Math.max(1, args.concurrency ?? cfg.concurrency);
  const requestPriority = args.priority ?? cfg.requestPriority;

  // Локали: канонический список, порядок детерминирован.
  const requested = args.langs ?? cfg.targetLocales ?? [...ALL_TARGET_LANGS];
  const unknown = requested.filter((l) => !(l in LANG_NAMES));
  if (unknown.length > 0) {
    console.error(`❌ Неизвестные локали: ${unknown.join(', ')}. Поддерживаются: ${ALL_TARGET_LANGS.join(', ')}`);
    return 2;
  }
  const langs = [...requested];

  console.log(`🌍 Режим: ${args.ui ? 'UI (cognitive_psy ARB)' : `контент src/i18n/ru/${args.fileArg}`}`);
  console.log(
    `🔧 Провайдер: ${args.provider}${args.provider === 'vllm' ? ` (${args.endpoint ?? cfg.endpoint}, модель ${args.model ?? cfg.model}, потоков ${concurrency}, приоритет ${requestPriority})` : ' (LEGACY CDP)'}`,
  );
  console.log(`🗣 Локали (${langs.length}): ${langs.join(', ')}`);
  const stageModelEntries = Object.entries(args.stageModels);
  if (stageModelEntries.length > 0) {
    console.log(`🧠 Пер-стадийные модели: ${stageModelEntries.map(([s, m]) => `${s}=${m}`).join(', ')}`);
  }
  if (args.dryRun) console.log('🔍 DRY-RUN: только анализ — модель не вызывается, файлы не меняются.');
  if (args.full) console.log('♻️ Режим --full: переводим всё заново, игнорируя инкрементальность.');

  const state = await TranslationState.load(path.resolve(ROOT, args.statePath ?? cfg.statePath));

  let client: StageClient;
  if (args.provider === 'vllm') {
    setModelConcurrency(concurrency);
    const vllm = new VllmClient(args.endpoint ?? cfg.endpoint, args.model ?? cfg.model, cfg.requestTimeoutMs, requestPriority);
    if (!args.dryRun) {
      await vllm.preflight(); // fail-fast до любых изменений файлов
      console.log('✅ Модель доступна.');
    }
    client = vllm;
  } else if (['chatgpt', 'claude', 'gemini', 'mistral'].includes(args.provider)) {
    console.warn('⚠️ LEGACY-провайдер (puppeteer/CDP :9222). Основной путь — vllm.');
    if (args.dryRun) {
      console.error('❌ --dry-run не требует провайдера — legacy не подключается.');
      return 2;
    }
    client = await createLegacyClient(args.provider as any);
  } else {
    console.error(`❌ Неизвестный провайдер «${args.provider}» (vllm|chatgpt|claude|gemini|mistral).`);
    return 2;
  }

  const ctx: RunCtx = { client, state, cfg, args, retries, langs, concurrency };
  const failures = args.ui ? await runUi(ctx) : await runContent(ctx);

  await client.close?.();
  if (failures > 0) {
    console.error(`\n❌ Готово с провалами: ${failures} (язык×файл). Остальное записано; повторный запуск продолжит с места сбоя.`);
    return 1;
  }
  console.log('\n✅ Готово: все запрошенные локали актуальны.');
  return 0;
}

process.exitCode = await main();
