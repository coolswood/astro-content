#!/usr/bin/env bun
/**
 * QA merge-back: перенос текстов легаси-снапшота в рабочее дерево для
 * стабильных поражений NEW (судья eval.ts предпочёл OLD со счётом 2:0).
 *
 *   bun scripts/qa/merge-winners.ts --report scripts/qa/reports/<dir> \
 *     --old-dir backups/ui-en-canary-20260917 --arb ../cognitive_psy/lib/l10n/app_en.arb [--dry-run] [--apply]
 *
 * Источник кандидатов — report.json из каталога --report (пишет eval.ts):
 * пары со status='judged', stable=true, stableWinner='old'. По умолчанию
 * dry-run (только план и протокол); arb пишет только --apply.
 *
 * Ограждения по порядку (первое сработавшее даёт skip с причиной):
 *   (a) ключ существует в arb, в снапшоте и в ru-каноне (app_ru.arb рядом с arb);
 *   (b) validateTranslation OLD-текста против ru-листа проходит (плейсхолдеры,
 *       ICU, медиа-пути, чужие алфавиты, несущие пробелы — те же проверки,
 *       что у основного конвейера scripts/lib/validation.ts);
 *   (c) терминологический guard: OLD написан легаси-терминологией
 *       (LEGACY_TERMS) — нужен перегон, перенос запрещён;
 *   (d) плейсхолдеры ru-канона сохранены в OLD-тексте (имена + ICU-конструкции).
 *       Дублирует (b) сознательно: у повода skip должна быть своя причина.
 * Наконец, после виртуального мерджа всех кандидатов — полная файловая
 * валидация arb против ru (валидация листа не видит файловый уровень: пул
 * тегов и «крючки»-дубли). Провал → apply отменяется целиком.
 *
 * Протокол: merge-winners.md внутри каталога отчёта (пишется и в dry-run).
 */
import path from 'path';
import { fileURLToPath } from 'url';
import { parseCli } from '../lib/cli.js';
import { readJsonOr, writeJsonAtomic, writeFileAtomic } from '../lib/atomic-fs.js';
import type { Leaves } from '../lib/tree.js';
import {
  extractIcuConstructs,
  extractPlaceholderNames,
  validateTranslation,
  type ValidationIssue,
} from '../lib/validation.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
if (process.cwd() !== ROOT && !process.cwd().startsWith(ROOT + path.sep)) {
  process.chdir(ROOT); // относительные пути аргументов считаем от корня репо
}

// ─────────────────────────────────────────────────────────────────────────────
// Конфиг
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Легаси-термины: строки-победители OLD с этими вхождениями НЕ переносим —
 * легаси-текст написан старой терминологией, нужен перегон новым конвейером.
 * Пилот консервативен: любое вхождение (в любом регистре) = skip. Поэтому
 * сверяем подстрочно в нижнем регистре, список храним как в ТЗ (для протокола).
 */
const LEGACY_TERMS = ['dysfunctional', 'Diary', 'diary', 'psychological well-being', 'Therapist'];
const LEGACY_TERMS_LOWER = [...new Set(LEGACY_TERMS.map((t) => t.toLowerCase()))];

interface Args {
  reportDir: string;
  oldDir: string;
  arbPath: string;
  lang: string | null;
  apply: boolean;
}

function parseArgs(): Args {
  const { flags } = parseCli();
  const reportDir = flags.report ?? '';
  const oldDir = flags['old-dir'] ?? '';
  const arbPath = flags.arb ?? '';
  if (!reportDir || !oldDir || !arbPath) {
    console.error(
      '❌ Usage: bun scripts/qa/merge-winners.ts --report scripts/qa/reports/<dir> \\\n' +
        '         --old-dir backups/<снапшот> --arb ../cognitive_psy/lib/l10n/app_en.arb [--dry-run] [--apply] [--lang en]',
    );
    process.exit(2);
  }
  if (flags.apply === 'true' && flags['dry-run'] === 'true') {
    console.error('❌ --apply и --dry-run взаимоисключающи.');
    process.exit(2);
  }
  return {
    reportDir: path.resolve(ROOT, reportDir),
    oldDir: path.resolve(ROOT, oldDir),
    arbPath: path.resolve(ROOT, arbPath),
    lang: flags.lang ?? null,
    apply: flags.apply === 'true',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Ввод: отчёт, снапшот, arb, ru-канон
// ─────────────────────────────────────────────────────────────────────────────

/** Пара из отчёта (структура PairOutcome из scripts/lib/qa.ts). */
interface ReportPair {
  key: string;
  ru: string;
  oldText: string;
  newText: string;
  status: string;
  stable: boolean;
  stableWinner: string | null;
  passes: Array<{
    order: string;
    ok: boolean;
    winnerFor: string;
    confidence: string;
    scores: { old: number | null; new: number | null };
    reason?: string;
  }>;
}

interface ReportFile {
  results: Record<string, Record<string, ReportPair[]>>;
}

/** Ключ пары отчёта («/points») → ключ arb («points»). */
function arbKeyOf(reportKey: string): string {
  return reportKey.replace(/^\//, '');
}

/** Снимает @@locale и @-мету: для валидации и сравнения листьев. */
function stripArbMeta(arb: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(arb)) {
    if (k === '@@locale' || k.startsWith('@')) continue;
    out[k] = v;
  }
  return out;
}

/** Терминологический guard: найденные легаси-термины (в любом регистре). */
function legacyTermsHit(text: string): string[] {
  const lower = text.toLowerCase();
  return LEGACY_TERMS_LOWER.filter((t) => lower.includes(t));
}

/** Guard (d): плейсхолдеры ru-канона должны быть в OLD-тексте. Текст проблемы или null. */
function placeholderParity(ruText: string, oldText: string): string | null {
  const ruPh = new Set(extractPlaceholderNames(ruText));
  const gotPh = new Set(extractPlaceholderNames(oldText));
  const lost = [...ruPh].filter((n) => !gotPh.has(n));
  const extra = [...gotPh].filter((n) => !ruPh.has(n));
  const ruIcu = extractIcuConstructs(ruText);
  const gotIcu = new Set(extractIcuConstructs(oldText));
  const lostIcu = ruIcu.filter((c) => !gotIcu.has(c));
  const parts: string[] = [];
  if (lost.length) parts.push(`потеряны: {${lost.join(', {')}}`);
  if (extra.length) parts.push(`лишние: {${extra.join(', {')}}`);
  if (lostIcu.length) parts.push(`потеряны ICU-конструкции: ${lostIcu.join(', ')}`);
  return parts.length ? parts.join('; ') : null;
}

/** Одна строка решения — для консоли и протокола. */
interface Decision {
  key: string; // ключ arb (без слэша)
  verdict: 'apply' | 'skip' | 'noop';
  reason: string; // причина skip / пометка
  arbValueBefore: string;
  mergeTo: string; // OLD-текст из снапшота
  scores: string; // «98/85 · 98/85» — оценки OLD/NEW из двух проходов
  judgeReason: string;
}

function scoresOf(p: ReportPair): string {
  return p.passes
    .map((pass) => `${pass.scores.old ?? '?'}/${pass.scores.new ?? '?'}`)
    .join(' · ');
}

async function main(): Promise<number> {
  const args = parseArgs();
  const mode = args.apply ? 'APPLY' : 'DRY-RUN';

  // Отчёт eval.ts.
  const report = await readJsonOr<ReportFile | null>(path.join(args.reportDir, 'report.json'), null);
  if (report == null) {
    console.error(`❌ Не найден или повреждён report.json в ${args.reportDir}`);
    return 2;
  }

  // Язык: из отчёта; если в отчёте несколько — обязателен --lang.
  const reportLangs = [...new Set(Object.values(report.results).flatMap((perFile) => Object.keys(perFile)))].sort();
  const langs = args.lang ? reportLangs.filter((l) => l === args.lang) : reportLangs;
  if (langs.length === 0) {
    console.error(`❌ В отчёте нет языка ${args.lang ?? '(не указан)'}; есть: ${reportLangs.join(', ')}`);
    return 2;
  }
  if (langs.length > 1) {
    console.error(`❌ В отчёте несколько языков (${langs.join(', ')}) — укажите --lang. Пилот: один arb = один язык.`);
    return 2;
  }
  const lang = langs[0]!;

  // Снапшот (плоская форма, как её читает eval: <old-dir>/<lang>.json).
  const snapshotPath = path.join(args.oldDir, `${lang.toLowerCase()}.json`);
  const snapshot = await readJsonOr<Record<string, unknown> | null>(snapshotPath, null);
  if (snapshot == null) {
    console.error(`❌ Снапшот не найден: ${snapshotPath}`);
    return 2;
  }

  // Целевой arb и ru-канон рядом с ним.
  const arb = await readJsonOr<Record<string, unknown> | null>(args.arbPath, null);
  if (arb == null) {
    console.error(`❌ Не найден или повреждён arb: ${args.arbPath}`);
    return 2;
  }
  const arbLocale = typeof arb['@@locale'] === 'string' ? arb['@@locale'] : '';
  if (arbLocale && arbLocale.toLowerCase() !== lang.toLowerCase()) {
    console.error(`❌ @@locale arb («${arbLocale}») не совпадает с языком отчёта («${lang}»).`);
    return 2;
  }
  const ruPath = path.join(path.dirname(args.arbPath), 'app_ru.arb');
  const ruArb = await readJsonOr<Record<string, unknown> | null>(ruPath, null);
  if (ruArb == null) {
    console.error(`❌ Не найден ru-канон: ${ruPath}`);
    return 2;
  }

  // ru-канон как плоская карта «ключ arb → строка» (как arbLeaves в translate.ts):
  // ключи без ведущего слэша — arb плоский; validateTranslation нормализует
  // пути с обеих сторон (norm() снимает «/»).
  const ruLeaves: Leaves = {};
  for (const [k, v] of Object.entries(stripArbMeta(ruArb))) ruLeaves[k] = String(v ?? '');
  console.log(`🔀 merge-back: отчёт ${path.relative(ROOT, args.reportDir)}, язык ${lang}`);
  console.log(`   снапшот: ${path.relative(ROOT, snapshotPath)} (${Object.keys(snapshot).length} ключей)`);
  console.log(`   arb: ${path.relative(ROOT, args.arbPath)}; ru-канон: ${path.relative(ROOT, ruPath)} (${Object.keys(ruLeaves).length} ключей)`);
  console.log(`   режим: ${mode}`);

  // Кандидаты: стабильные поражения NEW (2:0 в пользу OLD), по всем файлам отчёта.
  const candidates: Array<{ file: string; pair: ReportPair }> = [];
  for (const [file, perLang] of Object.entries(report.results)) {
    for (const p of perLang[lang] ?? []) {
      if (p.status === 'judged' && p.stable && p.stableWinner === 'old') candidates.push({ file, pair: p });
    }
  }
  candidates.sort((a, b) => arbKeyOf(a.pair.key).localeCompare(arbKeyOf(b.pair.key)));
  console.log(`\n📋 Кандидатов (стабильные 2:0 в пользу OLD): ${candidates.length}`);

  // Ограждения по каждому кандидату; применённые вносятся в рабочую копию arb.
  const decisions: Decision[] = [];
  const mergedArb: Record<string, unknown> = { ...arb };
  for (const { pair } of candidates) {
    const key = arbKeyOf(pair.key);
    const before = mergedArb[key];
    const oldText = snapshot[key];
    const ruText = ruLeaves[key];

    const base = { key, mergeTo: String(oldText ?? ''), scores: scoresOf(pair), judgeReason: pair.passes.find((p) => p.ok)?.reason ?? '' };
    const beforeStr = String(before ?? '');

    // (a) существование: arb, снапшот, ru-канон (ru нужен валидации).
    if (before === undefined) {
      decisions.push({ ...base, key, verdict: 'skip', reason: 'ключа нет в arb', arbValueBefore: beforeStr });
      continue;
    }
    if (oldText === undefined) {
      decisions.push({ ...base, key, verdict: 'skip', reason: 'ключа нет в снапшоте', arbValueBefore: beforeStr });
      continue;
    }
    if (typeof oldText !== 'string' || oldText.trim() === '') {
      decisions.push({ ...base, key, verdict: 'skip', reason: 'в снапшоте пустое/нестроковое значение', arbValueBefore: beforeStr });
      continue;
    }
    if (ruText === undefined) {
      decisions.push({ ...base, key, verdict: 'skip', reason: 'ключа нет в ru-каноне (app_ru.arb) — валидация невозможна', arbValueBefore: beforeStr });
      continue;
    }
    // No-op: рабочее дерево уже совпадает со снапшотом — переносить нечего.
    if (beforeStr === oldText) {
      decisions.push({ ...base, key, verdict: 'noop', reason: 'значение уже идентично снапшоту', arbValueBefore: beforeStr });
      continue;
    }

    // (b) валидация OLD-текста против ru-листа (как у основного конвейера).
    const leafIssues: ValidationIssue[] = validateTranslation(lang, { [key]: ruText }, { [key]: oldText });
    if (leafIssues.length > 0) {
      const msg = leafIssues.map((i) => `${i.path}: ${i.message}`).join('; ');
      decisions.push({ ...base, key, verdict: 'skip', reason: `валидация не пройдена — ${msg}`, arbValueBefore: beforeStr });
      continue;
    }

    // (c) терминологический guard: легаси-термины в OLD-тексте.
    const hits = legacyTermsHit(oldText);
    if (hits.length > 0) {
      decisions.push({
        ...base,
        key,
        verdict: 'skip',
        reason: `skip: legacy terminology, нужен перегон (${[...new Set(hits)].join(', ')})`,
        arbValueBefore: beforeStr,
      });
      continue;
    }

    // (d) плейсхолдеры ru-канона сохранены (дублирует (b) — своя причина skip).
    const phProblem = placeholderParity(ruText, oldText);
    if (phProblem) {
      decisions.push({ ...base, key, verdict: 'skip', reason: `плейсхолдеры ru-канона не сохранены — ${phProblem}`, arbValueBefore: beforeStr });
      continue;
    }

    // Все ограждения пройдены — вносим в рабочую копию (порядок ключей сохранён).
    mergedArb[key] = oldText;
    decisions.push({ ...base, key, verdict: 'apply', reason: 'перенесён текст OLD (2:0)', arbValueBefore: beforeStr });
  }

  // Файловая валидация после виртуального мерджа: листовая проверка не видит
  // файловый уровень (пул тегов, «крючки»-дубли). Провал → apply отменяется.
  const fileIssues = validateTranslation(lang, ruLeaves, stripArbMeta(mergedArb));
  if (fileIssues.length > 0) {
    console.error(`\n❌ Файловая валидация после мерджа не пройдена (${fileIssues.length}) — записи НЕТ:`);
    for (const i of fileIssues) console.error(`   - [${i.path}] ${i.message}`);
    return 1;
  }

  // Лог решений.
  const applied = decisions.filter((d) => d.verdict === 'apply');
  const skipped = decisions.filter((d) => d.verdict === 'skip');
  const noop = decisions.filter((d) => d.verdict === 'noop');
  console.log('');
  for (const d of decisions) {
    const mark = d.verdict === 'apply' ? '✅' : d.verdict === 'noop' ? '⚪' : '⏭ ';
    console.log(`   ${mark} \`${d.key}\` ${d.verdict}${d.verdict === 'apply' ? '' : ` — ${d.reason}`}`);
    if (d.verdict === 'apply') {
      console.log(`      было  (NEW): ${JSON.stringify(d.arbValueBefore)}`);
      console.log(`      стало (OLD): ${JSON.stringify(d.mergeTo)}`);
      console.log(`      оценки OLD/NEW: ${d.scores}${d.judgeReason ? `\n      судья: ${d.judgeReason.slice(0, 220)}` : ''}`);
    }
  }
  console.log(`\n📊 Итог: применить ${applied.length}, skip ${skipped.length}, no-op ${noop.length} (режим ${mode}).`);

  // Протокол — всегда (в dry-run фиксирует план, в apply — результат).
  const protocol = renderProtocol(args, lang, mode, snapshotPath, decisions, applied.length, skipped.length, noop.length, fileIssues.length);
  const protocolPath = path.join(args.reportDir, 'merge-winners.md');
  await writeFileAtomic(protocolPath, protocol);
  console.log(`💾 Протокол: ${path.relative(ROOT, protocolPath)}`);

  // Запись arb — только по --apply (atomic-fs: temp + rename).
  if (args.apply) {
    await writeJsonAtomic(args.arbPath, mergedArb);
    console.log(`✍️  Записано: ${path.relative(ROOT, args.arbPath)} (изменено ключей: ${applied.length}).`);
  } else {
    console.log('🔍 DRY-RUN: arb не изменялся. Для записи перезапустите с --apply.');
  }
  return 0;
}

/** Markdown-протокол merge-back: сводка, таблица решений, детали переносов. */
function renderProtocol(
  args: Args,
  lang: string,
  mode: string,
  snapshotPath: string,
  decisions: Decision[],
  appliedCount: number,
  skippedCount: number,
  noopCount: number,
  fileIssueCount: number,
): string {
  const lines: string[] = [];
  lines.push(`# Merge-back победителей OLD — ${mode}`);
  lines.push('');
  lines.push(`- **Дата**: ${new Date().toISOString()}`);
  lines.push(`- **Отчёт eval**: ${path.relative(ROOT, path.join(args.reportDir, 'report.json'))}`);
  lines.push(`- **Снапшот (источник OLD)**: ${snapshotPath}`);
  lines.push(`- **Целевой arb**: ${args.arbPath}`);
  lines.push(`- **Язык**: ${lang}`);
  lines.push(`- **Режим**: ${mode} (запись arb только по --apply)`);
  lines.push(`- **Итог**: применить ${appliedCount}, skip ${skippedCount}, no-op ${noopCount}; файловая валидация после мерджа: ${fileIssueCount === 0 ? 'пройдена' : `ПРОВАЛ (${fileIssueCount})`}`);
  lines.push('');
  lines.push('Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа в arb/снапшоте/ru-каноне; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона.');
  lines.push('');
  lines.push('## Решения');
  lines.push('');
  lines.push('| Ключ | Решение | Причина |');
  lines.push('|---|---|---|');
  for (const d of decisions) {
    const verdict = d.verdict === 'apply' ? '✅ apply' : d.verdict === 'noop' ? '⚪ no-op' : '⏭ skip';
    lines.push(`| \`${d.key}\` | ${verdict} | ${d.reason.replace(/\|/g, '\\|')} |`);
  }
  lines.push('');
  lines.push('## Переносы (было → стало)');
  lines.push('');
  if (appliedCount === 0) {
    lines.push('_Нет применённых переносов._');
    lines.push('');
  }
  for (const d of decisions.filter((x) => x.verdict === 'apply')) {
    lines.push(`### \`${d.key}\``);
    lines.push('');
    lines.push(`- **Оценки судьи OLD/NEW (2 прохода)**: ${d.scores}`);
    if (d.judgeReason) lines.push(`- **Судья**: ${d.judgeReason}`);
    lines.push(`- **Было (NEW)**: ${JSON.stringify(d.arbValueBefore)}`);
    lines.push(`- **Стало (OLD, из снапшота)**: ${JSON.stringify(d.mergeTo)}`);
    lines.push('');
  }
  lines.push('## Легаси-терминология (guard c)');
  lines.push('');
  lines.push(`Список: ${JSON.stringify(LEGACY_TERMS)}; сверка подстрочная, без учёта регистра (консервативный пилот: любое вхождение = skip «нужен перегон»).`);
  lines.push('');
  return lines.join('\n') + '\n';
}

process.exitCode = await main();
