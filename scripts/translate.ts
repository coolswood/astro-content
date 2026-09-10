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
 *   --endpoint URL, --model NAME, --state PATH, --psy-dir PATH
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
  type StageClient,
} from './lib/pipeline.js';
import { TranslationState, type ScopeState } from './lib/state.js';
import { analyzeTree, keysToTranslate, type Analysis } from './lib/analyze.js';
import { validateTranslation, type ValidationIssue } from './lib/validation.js';
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
  statePath: string;
  retries: number;
  requestTimeoutMs: number;
}

async function loadConfig(): Promise<Config> {
  const file = await readJsonOr<Partial<Config>>(path.join(ROOT, 'scripts', 'translate.config.json'), {});
  const cfg: Config = {
    sourceLocale: file.sourceLocale ?? 'ru',
    targetLocales: file.targetLocales ?? null,
    psyDir: file.psyDir ?? '',
    endpoint: file.endpoint ?? 'http://127.0.0.1:18000/v1',
    model: file.model ?? 'google/gemma-4-26B-A4B-it',
    statePath: file.statePath ?? 'scripts/translation-state.json',
    retries: file.retries ?? 2,
    requestTimeoutMs: file.requestTimeoutMs ?? 600_000,
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
}

/** Проблемы валидации в читаемый лог. */
function logIssues(lang: string, issues: ValidationIssue[]): void {
  for (const { path: p, message } of issues.slice(0, 20)) {
    console.warn(`   ⚠️ [${lang}][${p}] ${message}`);
  }
  if (issues.length > 20) console.warn(`   … и ещё ${issues.length - 20}`);
}

/** Один прогон конвейера с ретраями и валидацией. Возвращает листья перевода или null. */
async function translateWithRetries(
  ctx: RunCtx,
  lang: string,
  kind: 'text' | 'keys',
  payload: any,
  sentLeaves: Leaves,
): Promise<Leaves | null> {
  const prompts = await buildStagePrompts(kind, lang.toLowerCase(), {
    glossaryPath: path.join(ROOT, 'scripts', 'prompts', lang.toLowerCase(), 'glossary.json'),
  });

  let lastError: unknown = null;
  for (let attempt = 1; attempt <= ctx.retries + 1; attempt++) {
    if (attempt > 1) {
      console.log(`   🔁 Попытка ${attempt}/${ctx.retries + 1} для ${lang}...`);
      await new Promise((r) => setTimeout(r, 3000));
    }
    try {
      const { data, timings } = await runPipeline(ctx.client, prompts, payload, lang, {
        sourceLocale: ctx.cfg.sourceLocale,
        jsonModeMain: attempt > 1, // битый JSON → пробуем json_object
      });

      // keys-режим: ответ {lang: {key: val}} — снимаем обёртку.
      let result: any = data;
      if (kind === 'keys') {
        // Снимаем обёртку {lang: {…}}; модель может дать pt-BR/pt_br вместо pt_BR.
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

      const issues = validateTranslation(lang, sentLeaves, result);
      if (issues.length > 0) {
        console.warn(`   ❌ Валидация ${lang} не пройдена (попытка ${attempt}):`);
        logIssues(lang, issues);
        lastError = new Error(`validation: ${issues.length} проблем`);
        continue;
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
      perLang[lang] = analyzeTree(ruLeaves, flattenLeaves(target), scope, {
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

  // 4. Перевод: последовательно файл → язык (к модели — один запрос).
  let failures = 0;
  for (const item of items) {
    for (const lang of ctx.langs) {
      const todo = keysToTranslate(item.perLang[lang], args.full, Object.keys(item.ruLeaves));
      if (todo.length === 0) {
        console.log(`⏭  ${lang} ${item.relPath}: актуально`);
        continue;
      }
      console.log(`\n🌐 ${lang} (${LANG_NAMES[lang] ?? lang}) ${item.relPath}: ключей к переводу ${todo.length}`);

      const payload = buildSubtree(item.ruJson, todo);
      const sentLeaves: Leaves = {};
      for (const p of todo) sentLeaves[p] = item.ruLeaves[p];

      const translated = await translateWithRetries(ctx, lang, 'text', payload, sentLeaves);
      if (!translated) {
        failures++;
        continue;
      }

      // Запись: только после полного успеха; target читаем свежим (не залипшим).
      const targetPath = path.join(ROOT, 'src', 'i18n', lang.toLowerCase(), item.relPath);
      const target = await readJsonOr<any>(targetPath, {});
      applyLeaves(target, translated);
      await writeJsonAtomic(targetPath, target);
      ctx.state.markTranslated(item.scope, sentLeaves);
      await ctx.state.save();
      console.log(`   💾 Записано ${Object.keys(translated).length} ключей → ${path.relative(ROOT, targetPath)}`);
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
  for (const lang of ctx.langs) {
    const todo = keysToTranslate(perLang[lang], args.full, canon.realKeys);
    if (todo.length === 0) {
      console.log(`⏭  ${lang}: актуально`);
      continue;
    }
    console.log(`\n🌐 ${lang} (${LANG_NAMES[lang] ?? lang}): ключей к переводу ${todo.length}`);

    // Источник: ключи + @-мета как контекст (как в translate-arb).
    const todoSet = new Set(todo);
    const payload: Record<string, any> = {};
    for (const key of todo) {
      payload[key] = canon.values[key];
      const meta = canon.meta[`@${key}`];
      if (meta !== undefined) payload[`@${key}`] = meta;
    }
    const sentLeaves: Leaves = {};
    for (const key of todo) sentLeaves[key] = canon.values[key];

    const translated = await translateWithRetries(ctx, lang, 'keys', payload, sentLeaves);
    if (!translated) {
      failures++;
      continue;
    }

    // Запись в ARB: канонический порядок, @@locale сохраняем/создаём,
    // @-мета переносится только с placeholders (конвенция cognitive_psy).
    const targetPath = arbFilePath(psyDir, lang);
    const target = await readArbTarget(psyDir, lang);
    if (!('@@locale' in target)) target['@@locale'] = lang;
    let written = 0;
    for (const key of canon.realKeys) {
      if (!todoSet.has(key)) continue;
      const value = translated[key];
      if (typeof value !== 'string') continue;
      target[key] = value;
      written++;
      const meta = canon.meta[`@${key}`];
      if (meta && meta.placeholders) {
        target[`@${key}`] = { placeholders: meta.placeholders };
      }
    }
    await writeJsonAtomic(targetPath, target);
    ctx.state.markTranslated(scope, sentLeaves);
    await ctx.state.save();
    console.log(`   💾 Вписано ${written} ключей → ${path.relative(ROOT, targetPath)}`);
  }
  return failures;
}

// ─────────────────────────────────────────────────────────────────────────────
// main
// ─────────────────────────────────────────────────────────────────────────────

async function main(): Promise<number> {
  const cfg = await loadConfig();
  const args = parseArgs();
  const retries = Number.isNaN(args.retries) ? cfg.retries : args.retries;

  // Локали: канонический список, порядок детерминирован.
  const requested = args.langs ?? cfg.targetLocales ?? [...ALL_TARGET_LANGS];
  const unknown = requested.filter((l) => !(l in LANG_NAMES));
  if (unknown.length > 0) {
    console.error(`❌ Неизвестные локали: ${unknown.join(', ')}. Поддерживаются: ${ALL_TARGET_LANGS.join(', ')}`);
    return 2;
  }
  const langs = [...requested];

  console.log(`🌍 Режим: ${args.ui ? 'UI (cognitive_psy ARB)' : `контент src/i18n/ru/${args.fileArg}`}`);
  console.log(`🔧 Провайдер: ${args.provider}${args.provider === 'vllm' ? ` (${cfg.endpoint}, модель ${args.model ?? cfg.model})` : ' (LEGACY CDP)'}`);
  console.log(`🗣 Локали (${langs.length}): ${langs.join(', ')}`);
  if (args.dryRun) console.log('🔍 DRY-RUN: только анализ — модель не вызывается, файлы не меняются.');
  if (args.full) console.log('♻️ Режим --full: переводим всё заново, игнорируя инкрементальность.');

  const state = await TranslationState.load(path.resolve(ROOT, args.statePath ?? cfg.statePath));

  let client: StageClient;
  if (args.provider === 'vllm') {
    const vllm = new VllmClient(args.endpoint ?? cfg.endpoint, args.model ?? cfg.model, cfg.requestTimeoutMs);
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

  const ctx: RunCtx = { client, state, cfg, args, retries, langs };
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
