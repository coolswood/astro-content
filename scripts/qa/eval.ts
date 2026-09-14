#!/usr/bin/env bun
/**
 * QA-сравнение переводов: слепой парный судья (MQM-диагностика + вердикт 2:0).
 *
 *   bun scripts/qa/eval.ts story/start.json --old-dir backups/.../old-pipeline --langs de,ja
 *   bun scripts/qa/eval.ts story --git-ref 2695c5f --sample 15 --label prompt-v3
 *   bun scripts/qa/eval.ts story/start.json --old-dir ... --dry-run
 *   bun scripts/qa/eval.ts --ui --old-dir backups/ui-canary-.../ --langs de --sample 30
 *
 * Берёт ru-оригинал, «старый» перевод (базлайн) и «новый» (рабочее дерево),
 * нарезает детерминированный сэмпл БЛОКОВ (лист-строка или массив строк
 * целиком — индексы массивов между локалями могут не совпадать, поэтому
 * судья сравнивает абзацы, а не отдельные элементы) и для каждого блока
 * дважды спрашивает судью (порядок A/B случайный и зеркальный). Вердикт
 * учитывается только если оба прохода сошлись (2:0) — защита от
 * позиционного смещения судьи. Судья слепой: не знает, какая сторона
 * новая. Промпт судьи: scripts/prompts/base/qa/judge.txt (языковые правила
 * — {{LANG_STYLE}}, терминология — глоссарий локали).
 *
 * Режим --ui: сравнение ARB-локалей cognitive_psy. ru = app_ru.arb,
 * NEW = app_<lang>.arb рабочего дерева, OLD = снапшот <old-dir>/<lang>.json
 * (плоская форма). @-мета из сравнения исключается. Базлайн — только
 * --old-dir: --git-ref читает репозиторий контента, а не cognitive_psy.
 *
 * Базлайн (--old-dir XOR --git-ref):
 *   --old-dir  каталог снапшотов, ищется по очереди:
 *                <dir>/<lang>/<relpath>            (зеркало src/i18n)
 *                <dir>/<relpath-без-имени>/<lang>.json   (story/start.json → story/de.json)
 *                <dir>/<lang>.json                 (плоский снапшот одного файла)
 *   --git-ref  git show <ref>:src/i18n/<lang>/<relpath>
 *
 * Отчёт: scripts/qa/reports/<метка времени>-<label>/report.{json,md}.
 * Судья ходит только через vLLM (строго 1 запрос единовременно — лок внутри
 * VllmClient); legacy CDP-провайдеры для судьи не поддерживаются.
 */
import fs from 'fs/promises';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { parseCli } from '../lib/cli.js';
import { ALL_TARGET_LANGS, LANG_NAMES, normalizeLangCode } from '../lib/lang-codes.js';
import { VllmClient, type StageClient } from '../lib/pipeline.js';
import { loadPrompt } from '../lib/prompt-loader.js';
import { loadGlossary } from '../lib/glossary-utils.js';
import type { GlossaryItem } from '../lib/types.js';
import { readJsonOr, writeJsonAtomic, writeFileAtomic } from '../lib/atomic-fs.js';
import {
  aggregateLang,
  buildComparisonUnits,
  mulberry32,
  hashSeed,
  passOrderFor,
  parseJudgeVerdict,
  shuffleSeeded,
  stableWinRate,
  sumStats,
  unitText,
  verdictToSides,
  type ComparisonUnit,
  type LangStats,
  type PairOutcome,
  type PassOrder,
  type PassResult,
} from '../lib/qa.js';

const execFileP = promisify(execFile);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
if (process.cwd() !== ROOT && !process.cwd().startsWith(ROOT + path.sep)) {
  process.chdir(ROOT); // prompt-loader считает PROMPTS_DIR от process.cwd()
}

// ─────────────────────────────────────────────────────────────────────────────
// Конфиг и аргументы
// ─────────────────────────────────────────────────────────────────────────────

interface Config {
  endpoint: string;
  model: string;
  requestTimeoutMs: number;
}

async function loadConfig(): Promise<Config> {
  const file = await readJsonOr<Partial<Config>>(
    path.join(ROOT, 'scripts', 'translate.config.json'),
    {},
  );
  const cfg: Config = {
    endpoint: file.endpoint ?? 'http://127.0.0.1:18000/v1',
    model: file.model ?? 'google/gemma-4-26B-A4B-it',
    requestTimeoutMs: file.requestTimeoutMs ?? 600_000,
  };
  if (process.env.TRANSLATE_ENDPOINT) cfg.endpoint = process.env.TRANSLATE_ENDPOINT;
  if (process.env.TRANSLATE_MODEL) cfg.model = process.env.TRANSLATE_MODEL;
  return cfg;
}

interface Args {
  ui: boolean;
  fileArg: string;
  langs: string[];
  oldDir: string | null;
  gitRef: string | null;
  sample: number;
  seed: number;
  minChars: number;
  retries: number;
  label: string;
  outDir: string;
  dryRun: boolean;
  endpoint?: string;
  model?: string;
  psyDir?: string;
}

function parseArgs(cfg: Config): Args {
  const { flags, positional } = parseCli();
  const ui = (flags.ui ?? 'false') === 'true';
  const fileArg = positional[0] ?? flags.file ?? '';
  if (!fileArg && !ui) {
    console.error(
      '❌ Укажите файл/каталог внутри src/i18n/ru и базлайн (или флаг --ui).\n' +
        '   Примеры:\n' +
        '     bun scripts/qa/eval.ts story/start.json --old-dir backups/start-translations-20260910/old-pipeline --langs de,ja\n' +
        '     bun scripts/qa/eval.ts story --git-ref 2695c5f --sample 15 --dry-run\n' +
        '     bun scripts/qa/eval.ts --ui --old-dir backups/ui-canary-20260913 --langs de --sample 30',
    );
    process.exit(2);
  }
  if (flags.provider) {
    console.error('❌ Судья ходит только через vLLM; --provider не поддерживается.');
    process.exit(2);
  }
  const oldDir = flags['old-dir'] ?? null;
  const gitRef = flags['git-ref'] ?? null;
  if (ui && gitRef) {
    console.error('❌ В режиме --ui базлайн — только --old-dir: --git-ref читает репозиторий контента, а не cognitive_psy.');
    process.exit(2);
  }
  if (Boolean(oldDir) === Boolean(gitRef)) {
    console.error('❌ Нужен ровно один базлайн: --old-dir PATH или --git-ref REF.');
    process.exit(2);
  }
  const langsRaw = (flags.langs ?? flags.lang ?? '').split(',').map((l) => normalizeLangCode(l)).filter(Boolean);
  const langs = langsRaw.length > 0 ? langsRaw : [...ALL_TARGET_LANGS];
  return {
    ui,
    fileArg,
    langs,
    oldDir,
    gitRef,
    sample: Math.max(1, parseInt(flags.sample ?? '10', 10) || 10),
    seed: parseInt(flags.seed ?? '42', 10) || 42,
    minChars: Math.max(0, parseInt(flags['min-chars'] ?? '0', 10) || 0),
    retries: Math.max(0, parseInt(flags.retries ?? '1', 10) || 0),
    label: (flags.label ?? '').replace(/[^\w.-]+/g, '-'),
    outDir: flags.out ?? path.join(ROOT, 'scripts', 'qa', 'reports'),
    dryRun: flags['dry-run'] === 'true',
    endpoint: flags.endpoint,
    model: flags.model,
    psyDir: flags['psy-dir'],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Файлы: ru-источник, новый перевод (рабочее дерево), базлайн
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

async function fileExists(p: string): Promise<boolean> {
  return (await fs.stat(p).catch(() => null))?.isFile() ?? false;
}

/** Корень cognitive_psy: --psy-dir → env COGNITIVE_PSY_DIR → сиблинг репозитория. */
function resolvePsyDir(args: Args): string {
  const raw = args.psyDir || process.env.COGNITIVE_PSY_DIR || '';
  return raw ? path.resolve(ROOT, raw) : path.resolve(ROOT, '..', 'cognitive_psy');
}

/** ARB без @@locale и @-меты: плоская карта «ключ → строка». null = не читается. */
async function readArbFlat(p: string): Promise<Record<string, string> | null> {
  const raw = await readJsonOr<Record<string, any> | null>(p, null);
  if (raw == null) return null;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (k === '@@locale' || k.startsWith('@')) continue;
    out[k] = String(v ?? '');
  }
  return out;
}

async function parseJsonText(raw: string): Promise<any> {
  return JSON.parse(raw.replace(/^\uFEFF/, ''));
}

/** Читает JSON-файл из git-рефа (git show <ref>:<repo-rel>), null при ошибке. */
async function readGitJson(ref: string, repoRel: string): Promise<any | null> {
  try {
    const { stdout } = await execFileP('git', ['show', `${ref}:${repoRel}`], {
      cwd: ROOT,
      maxBuffer: 64 * 1024 * 1024,
    });
    return parseJsonText(stdout);
  } catch {
    return null;
  }
}

/**
 * Базлайн для (lang, relPath): <dir>/<lang>/<rel> → <dir>/<reldir>/<lang>.json → <dir>/<lang>.json.
 * Третья форма — плоские снапшоты одного файла (например backups/.../old-pipeline/de.json).
 */
async function readOldJson(oldDir: string, lang: string, relPath: string): Promise<any | null> {
  const absDir = path.resolve(ROOT, oldDir);
  const langLc = lang.toLowerCase();
  const candidates = [
    path.join(absDir, langLc, relPath),
    path.join(absDir, path.dirname(relPath), `${langLc}.json`),
    path.join(absDir, `${langLc}.json`),
  ];
  for (const cand of candidates) {
    if (await fileExists(cand)) return readJsonOr<any>(cand, null);
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Судья
// ─────────────────────────────────────────────────────────────────────────────

/** Глоссарий в формате конвейера: - «ru» → «lang» (context). */
function formatGlossaryDetailed(items: GlossaryItem[]): string {
  if (items.length === 0) return 'Пусто.';
  return items.map((e) => `- «${e.ru}» → «${e.lang}» (${e.context})`).join('\n');
}

async function buildJudgeSystem(lang: string): Promise<string> {
  const template = await loadPrompt('qa', 'judge', lang.toLowerCase());
  const items = await loadGlossary(path.join(ROOT, 'scripts', 'prompts', lang.toLowerCase(), 'glossary.json'));
  return template.split('{{GLOSSARY}}').join(formatGlossaryDetailed(items));
}

function pairUserPrompt(ru: string, a: string, b: string): string {
  return `ОРИГИНАЛ (ru):\n${ru}\n\nПЕРЕВОД A:\n${a}\n\nПЕРЕВОД B:\n${b}`;
}

/** Один проход судьи над парой с ретраями. Возвращает нормализованный вердикт или ok=false. */
async function judgePass(
  client: StageClient,
  judgeSystem: string,
  ru: string,
  oldText: string,
  newText: string,
  order: PassOrder,
  retries: number,
): Promise<PassResult> {
  const a = order === 'old_first' ? oldText : newText;
  const b = order === 'old_first' ? newText : oldText;
  const user = pairUserPrompt(ru, a, b);
  let lastError: unknown = null;
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const raw = await client.complete({
        system: judgeSystem,
        user,
        temperature: 0.2,
        maxTokens: 4096,
        jsonMode: true,
      });
      return { order, ok: true, ...verdictToSides(await parseJudgeVerdict(raw), order) };
    } catch (e: any) {
      lastError = e;
      if (attempt <= retries) {
        console.warn(`   ⚠️ Судья не ответил валидным JSON (попытка ${attempt}): ${String(e?.message ?? e).slice(0, 120)}`);
      }
    }
  }
  return { order, ok: false, error: String((lastError as any)?.message ?? lastError).slice(0, 300), winnerFor: 'tie', confidence: '', scores: { old: null, new: null }, reason: '', issues: [] };
}

// ─────────────────────────────────────────────────────────────────────────────
// Отчёт
// ─────────────────────────────────────────────────────────────────────────────

function fmtPct(x: number | null): string {
  return x == null ? '—' : `${Math.round(x * 100)}%`;
}

function outcomeMark(o: PairOutcome): string {
  if (o.status === 'failed') return '✖';
  if (!o.stable) return '🟡';
  if (o.stableWinner === 'new') return '🟢';
  if (o.stableWinner === 'old') return '🔴';
  return '⚪';
}

function excerpt(text: string, max = 260): string {
  const oneLine = text.replace(/\s+/g, ' ').trim();
  return oneLine.length > max ? `${oneLine.slice(0, max)}…` : oneLine;
}

function statsRow(lang: string, files: LangStats[]): string {
  const s = sumStats(files);
  const wr = stableWinRate(s);
  return (
    `| ${lang} | ${s.compared} | 🟢 ${s.newWins} | 🔴 ${s.oldWins} | ⚪ ${s.ties} | 🟡 ${s.unstable} | ` +
    `${s.criticalNew} / ${s.criticalOld} | ${fmtPct(wr)} |`
  );
}

function renderMarkdown(
  args: Args,
  meta: Record<string, unknown>,
  perFile: Record<string, Record<string, PairOutcome[]>>,
): string {
  const lines: string[] = [];
  lines.push(`# QA: слепое парное сравнение переводов${args.label ? ` — ${args.label}` : ''}`);
  lines.push('');
  for (const [k, v] of Object.entries(meta)) lines.push(`- **${k}**: ${v}`);
  lines.push('');
  lines.push('> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).');
  lines.push('> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.');
  lines.push('');
  for (const [relFile, perLang] of Object.entries(perFile)) {
    lines.push(`## ${relFile}`);
    lines.push('');
    lines.push('| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |');
    lines.push('|---|---|---|---|---|---|---|---|');
    for (const lang of args.langs) {
      const outcomes = perLang[lang] ?? [];
      if (outcomes.length === 0) continue;
      lines.push(statsRow(lang, [aggregateLang(outcomes)]));
    }
    lines.push(statsRow('**итого**', Object.values(perLang).map((o) => aggregateLang(o))));
    lines.push('');
    // Замечания по типам из первых проходов.
    lines.push('### Замечания судьи (тип/severity, из первых проходов)');
    lines.push('');
    for (const lang of args.langs) {
      const outcomes = perLang[lang] ?? [];
      if (outcomes.length === 0) continue;
      const s = aggregateLang(outcomes);
      const fmt = (m: Record<string, number>) =>
        Object.entries(m).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}×${v}`).join(', ') || '—';
      lines.push(`- **${lang}**: NEW — ${fmt(s.issuesNew)}; OLD — ${fmt(s.issuesOld)}`);
    }
    lines.push('');
    lines.push('### Детали пар (для спот-чека)');
    lines.push('');
    for (const lang of args.langs) {
      for (const o of perLang[lang] ?? []) {
        lines.push(`#### ${outcomeMark(o)} ${lang} \`${o.key}\`${o.stable && o.stableWinner !== 'tie' ? ` — ${o.stableWinner === 'new' ? 'NEW лучше' : 'OLD лучше'} (2:0)` : o.stable ? '— ничья (2:0)' : o.status === 'failed' ? '— судья недоступен' : '— вердикт неустойчив'}`);
        lines.push('');
        lines.push(`- **RU**: ${excerpt(o.ru)}`);
        lines.push(`- **OLD**: ${excerpt(o.oldText)}`);
        lines.push(`- **NEW**: ${excerpt(o.newText)}`);
        for (const p of o.passes) {
          const label = p.order === 'old_first' ? 'A=OLD, B=NEW' : 'A=NEW, B=OLD';
          const scores = p.ok ? ` (оценки OLD ${p.scores.old ?? '?'} / NEW ${p.scores.new ?? '?'})` : '';
          lines.push(`- Проход [${label}]: ${p.ok ? `победитель ${p.winnerFor}, уверенность ${p.confidence || '—'}${scores}` : `ошибка: ${p.error}`}`);
          if (p.ok && p.reason) lines.push(`  - ${p.reason}`);
          for (const i of p.issues) {
            lines.push(`  - [${i.side}/${i.type}/${i.severity}] ${i.note}`);
          }
        }
        lines.push('');
      }
    }
  }
  return lines.join('\n') + '\n';
}

// ─────────────────────────────────────────────────────────────────────────────
// main
// ─────────────────────────────────────────────────────────────────────────────

async function main(): Promise<number> {
  const cfg = await loadConfig();
  const args = parseArgs(cfg);

  const unknown = args.langs.filter((l) => !(l in LANG_NAMES));
  if (unknown.length > 0) {
    console.error(`❌ Неизвестные локали: ${unknown.join(', ')}. Поддерживаются: ${ALL_TARGET_LANGS.join(', ')}`);
    return 2;
  }

  const relFiles = args.ui
    ? ['ui/cognitive_psy'] // плоская метка файла; базлайн ищется как <old-dir>/<lang>.json
    : await resolveContentFiles(args.fileArg);
  const psyDir = args.ui ? resolvePsyDir(args) : '';
  const baselineDesc = args.oldDir ? `--old-dir ${args.oldDir}` : `--git-ref ${args.gitRef}`;
  console.log(`⚖️  QA-сравнение: ${args.ui ? `UI cognitive_psy (${psyDir})` : `src/i18n/ru/${args.fileArg}`}`);
  console.log(`   NEW = рабочее дерево, OLD = ${baselineDesc}`);
  console.log(`   Локали (${args.langs.length}): ${args.langs.join(', ')}; сэмпл ${args.sample}/файл, seed ${args.seed}, min-chars ${args.minChars}`);
  if (args.dryRun) console.log('🔍 DRY-RUN: только план — модель не вызывается.');

  const client = new VllmClient(args.endpoint ?? cfg.endpoint, args.model ?? cfg.model, cfg.requestTimeoutMs);
  if (!args.dryRun) {
    await client.preflight();
    console.log('✅ Модель доступна.');
  }

  let head = '';
  try {
    head = (await execFileP('git', ['rev-parse', 'HEAD'], { cwd: ROOT })).stdout.trim();
  } catch { /* не критично для отчёта */ }

  const perFile: Record<string, Record<string, PairOutcome[]>> = {};
  let totalCalls = 0;

  for (const relFile of relFiles) {
    const ruJson = args.ui
      ? await readArbFlat(path.join(psyDir, 'lib', 'l10n', 'app_ru.arb'))
      : await readJsonOr<any>(path.join(ROOT, 'src', 'i18n', 'ru', relFile), null);
    if (ruJson == null) {
      console.error(`❌ Не удалось прочитать ru-источник (${args.ui ? 'app_ru.arb' : `src/i18n/ru/${relFile}`})`);
      return 2;
    }
    const ruUnits = buildComparisonUnits(ruJson);
    const candidates = shuffleSeeded(ruUnits, mulberry32(hashSeed(`${args.seed}|${relFile}`)));
    console.log(`\n📄 ${relFile} (блоков ru: ${ruUnits.length})`);
    perFile[relFile] = {};

    for (const lang of args.langs) {
      const langLc = lang.toLowerCase();
      const newRoot = args.ui
        ? await readArbFlat(path.join(psyDir, 'lib', 'l10n', `app_${lang}.arb`))
        : await readJsonOr<any>(path.join(ROOT, 'src', 'i18n', langLc, relFile), null);
      const oldRoot = args.oldDir
        ? await readOldJson(args.oldDir, lang, relFile)
        : await readGitJson(args.gitRef!, `src/i18n/${langLc}/${relFile}`);
      if (oldRoot == null) {
        console.log(`   ⏭  ${lang}: базлайн не найден (${baselineDesc}) — пропуск.`);
        continue;
      }
      if (newRoot == null) {
        console.log(`   ⏭  ${lang}: в рабочем дереве нет перевода — пропуск.`);
        continue;
      }

      // Сэмплинг: идём по перемешанным блокам; равные/отсутствующие не съедают лимит.
      const pairs: { key: string; ru: string; old: string; new: string }[] = [];
      let equal = 0;
      let missing = 0;
      for (const unit of candidates as ComparisonUnit[]) {
        if (pairs.length >= args.sample) break;
        const ruText = unit.parts.join('\n\n');
        const newText = unitText(newRoot, unit.path);
        const oldText = unitText(oldRoot, unit.path);
        if (!newText.trim() || !oldText.trim()) {
          missing++;
          continue;
        }
        if (oldText.trim() === newText.trim()) {
          equal++;
          continue;
        }
        if (ruText.length < args.minChars) continue;
        pairs.push({ key: unit.path, ru: ruText, old: oldText, new: newText });
      }

      if (pairs.length === 0) {
        console.log(`   ⏭  ${lang}: нечего сравнивать (равных переводов ${equal}, без базлайна/перевода ${missing}).`);
        continue;
      }
      console.log(`   🔀 ${lang}: пар к сравнению ${pairs.length} (совпали: ${equal}, нет пары: ${missing}) → запросов ${pairs.length * 2}`);
      totalCalls += pairs.length * 2;

      if (args.dryRun) {
        for (const p of pairs.slice(0, 5)) console.log(`      • ${p.key}: ${excerpt(p.ru, 90)}`);
        if (pairs.length > 5) console.log(`      … и ещё ${pairs.length - 5}`);
        continue;
      }

      const judgeSystem = await buildJudgeSystem(langLc);
      const outcomes: PairOutcome[] = [];
      for (let i = 0; i < pairs.length; i++) {
        const p = pairs[i];
        const scope = `${args.seed}|${relFile}|${lang}|${p.key}`;
        const order1 = passOrderFor(scope, 1);
        const order2 = passOrderFor(scope, 2);
        const pass1 = await judgePass(client, judgeSystem, p.ru, p.old, p.new, order1, args.retries);
        const pass2 = await judgePass(client, judgeSystem, p.ru, p.old, p.new, order2, args.retries);

        const judged = pass1.ok || pass2.ok;
        const stable = pass1.ok && pass2.ok && pass1.winnerFor === pass2.winnerFor;
        const outcome: PairOutcome = {
          file: relFile,
          lang,
          key: p.key,
          ru: p.ru,
          oldText: p.old,
          newText: p.new,
          status: judged ? 'judged' : 'failed',
          stable,
          stableWinner: stable ? pass1.winnerFor : null,
          passes: [pass1, pass2],
        };
        outcomes.push(outcome);

        const detail = pass1.ok
          ? `оценки OLD ${pass1.scores.old ?? '?'}/${pass1.scores.new ?? '?'}`
          : `ошибка: ${pass1.error}`;
        console.log(`   ${outcomeMark(outcome)} ${lang} ${i + 1}/${pairs.length} \`${p.key}\` ${stable ? `→ ${pass1.winnerFor} (2:0)` : ''} · ${detail}`);
      }
      perFile[relFile][lang] = outcomes;
    }
  }

  if (args.dryRun) {
    console.log(`\n📊 ИТОГО (план): файлов ${relFiles.length}, запросов к судье ${totalCalls}.`);
    return 0;
  }

  // Отчёт JSON + MD.
  const meta: Record<string, unknown> = {
    'Дата': new Date().toISOString(),
    'Метка': args.label || '—',
    'Сравнение': `NEW = рабочее дерево; OLD = ${baselineDesc}`,
    'Файлы': relFiles.join(', '),
    'Локали': args.langs.join(', '),
    'Сэмпл/файл': args.sample,
    'Seed': args.seed,
    'Min-chars': args.minChars,
    'Модель': args.model ?? cfg.model,
    'Endpoint': args.endpoint ?? cfg.endpoint,
    'git HEAD': head || '—',
  };
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const runId = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}${args.label ? `-${args.label}` : ''}`;
  const reportDir = path.join(args.outDir, runId);
  await writeJsonAtomic(path.join(reportDir, 'report.json'), { meta, results: perFile });
  await writeFileAtomic(path.join(reportDir, 'report.md'), renderMarkdown(args, meta, perFile));

  // Итог в консоль.
  console.log('\n📊 ИТОГ по локалям (стабильные 2:0):');
  console.log('   Язык | Пар | NEW | OLD | Ничья | Нестаб | Win-rate NEW');
  const langsJudged = new Set<string>();
  for (const perLang of Object.values(perFile)) for (const l of Object.keys(perLang)) langsJudged.add(l);
  for (const lang of args.langs) {
    if (!langsJudged.has(lang)) continue;
    const s = sumStats(Object.values(perFile).map((perLang) => aggregateLang(perLang[lang] ?? [])));
    const wr = stableWinRate(s);
    const flag = wr != null && s.oldWins > s.newWins ? ' ⚠️' : '';
    console.log(
      `   ${lang.padEnd(5)} | ${String(s.compared).padStart(3)} | 🟢 ${String(s.newWins).padStart(2)} | 🔴 ${String(s.oldWins).padStart(2)} | ⚪ ${String(s.ties).padStart(2)} | 🟡 ${String(s.unstable).padStart(2)} | ${fmtPct(wr)}${flag}`,
    );
  }
  console.log(`\n💾 Отчёт: ${path.relative(ROOT, path.join(reportDir, 'report.md'))} (+ report.json)`);
  return 0;
}

process.exitCode = await main();
