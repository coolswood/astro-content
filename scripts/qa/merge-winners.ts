#!/usr/bin/env bun
/**
 * QA merge-back: перенос текстов-победителей OLD в рабочее дерево для
 * стабильных поражений NEW (судья eval.ts предпочёл OLD со счётом 2:0).
 *
 * Два режима (автоопределение по флагам):
 *
 * UI (arb cognitive_psy):
 *   bun scripts/qa/merge-winners.ts --report scripts/qa/reports/<dir> \
 *     --old-dir backups/ui-en-canary-20260917 --arb ../cognitive_psy/lib/l10n/app_en.arb \
 *     [--dry-run] [--apply] [--lang en]
 *
 * Контент (src/i18n, базлайн из git — это состояние ДО переперевода):
 *   bun scripts/qa/merge-winners.ts --report scripts/qa/reports/<dir> \
 *     --git-ref 7897e0c~1 [--dry-run] [--apply] [--lang en]
 *
 * Источник кандидатов — report.json из каталога --report (пишет eval.ts):
 * пары со status='judged', stable=true, stableWinner='old'. По умолчанию
 * dry-run (только план и протокол); файлы пишет только --apply.
 *
 * Ограждения по порядку (первое сработавшее даёт skip с причиной):
 *   (a) ключ/путь существует в цели, в источнике OLD и в ru-каноне;
 *   (b) validateTranslation OLD-текста против ru-листа проходит (плейсхолдеры,
 *       ICU, медиа-пути, чужие алфавиты, несущие пробелы — те же проверки,
 *       что у основного конвейера scripts/lib/validation.ts);
 *   (c) терминологический guard: OLD написан легаси-терминологией
 *       (LEGACY_TERMS) — нужен перегон, перенос запрещён;
 *   (d) плейсхолдеры ru-канона сохранены в OLD-тексте (имена + ICU-конструкции).
 *       Дублирует (b) сознательно: у повода skip должна быть своя причина.
 *   (content) OLD-текст в git сверен с pair.oldText из отчёта.
 * Наконец, после виртуального мерджа всех кандидатов — полная файловая
 * валидация цели против ru (валидация листа не видит файловый уровень: пул
 * тегов и «крючки»-дубли). Провал → apply отменяется целиком.
 *
 * ⚠️ Контент: не запускать merge-back на файлах с РУЧНОЙ редактурой без
 * сверки — отличие OLD там может быть намеренным решением (например,
 * смягчённые каузальные формулировки в en story/start.json), а не
 * «легаси случайно лучше».
 *
 * Протокол: merge-winners.md внутри каталога отчёта (пишется и в dry-run).
 */
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { parseCli } from '../lib/cli.js';
import { readJsonOr, writeJsonAtomic, writeFileAtomic } from '../lib/atomic-fs.js';
import { applyLeaves, flattenLeaves, type Leaves } from '../lib/tree.js';
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
 * Пилот консервативен: любое вхождение (в любом регистре) = skip. Список
 * составлен для en-UI; для контента применяется тот же (консервативно).
 */
const LEGACY_TERMS = ['dysfunctional', 'Diary', 'diary', 'psychological well-being', 'Therapist'];
const LEGACY_TERMS_LOWER = [...new Set(LEGACY_TERMS.map((t) => t.toLowerCase()))];

interface Args {
  reportDir: string;
  /** UI-режим: каталог снапшота <old-dir>/<lang>.json. */
  oldDir: string | null;
  /** UI-режим: целевой arb. */
  arbPath: string | null;
  /** Контент-режим: git-ref базлайна (состояние ДО переперевода). */
  gitRef: string | null;
  lang: string | null;
  apply: boolean;
}

type Mode = 'ui' | 'content';

function parseArgs(): Args {
  const { flags } = parseCli();
  const reportDir = flags.report ?? '';
  const oldDir = flags['old-dir'] ?? null;
  const arbPath = flags.arb ?? null;
  const gitRef = flags['git-ref'] ?? null;
  const apply = flags.apply === 'true';
  if (!reportDir || (apply && flags['dry-run'] === 'true')) {
    usage();
  }
  let mode: Mode;
  if (gitRef && !oldDir && !arbPath) mode = 'content';
  else if (oldDir && arbPath && !gitRef) mode = 'ui';
  else usage();
  return {
    reportDir: path.resolve(ROOT, reportDir),
    oldDir: oldDir ? path.resolve(ROOT, oldDir) : null,
    arbPath: arbPath ? path.resolve(ROOT, arbPath) : null,
    gitRef,
    lang: flags.lang ?? null,
    apply,
  };

  function usage(): never {
    console.error(
      '❌ Usage:\n' +
        '  UI:      bun scripts/qa/merge-winners.ts --report <dir> --old-dir backups/<снапшот> \\\n' +
        '             --arb ../cognitive_psy/lib/l10n/app_en.arb [--dry-run] [--apply] [--lang en]\n' +
        '  Контент: bun scripts/qa/merge-winners.ts --report <dir> --git-ref <ref> \\\n' +
        '             [--dry-run] [--apply] [--lang en]',
    );
    process.exit(2);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Ввод: отчёт и общие помощники
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
  meta: Record<string, unknown>;
  results: Record<string, Record<string, ReportPair[]>>;
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
  file: string; // файл цели (в ui — arb, в контенте — путь внутри src/i18n)
  key: string; // ключ/путь листа (без ведущего слэша — как в Leaves)
  verdict: 'apply' | 'skip' | 'noop';
  reason: string; // причина skip / пометка
  arbValueBefore: string;
  mergeTo: string; // OLD-текст
  scores: string; // «98/85 · 98/85» — оценки OLD/NEW из двух проходов
  judgeReason: string;
}

function scoresOf(p: ReportPair): string {
  return p.passes
    .map((pass) => `${pass.scores.old ?? '?'}/${pass.scores.new ?? '?'}`)
    .join(' · ');
}

/**
 * Цепочка ограждений (общая для режимов). Вход — собранные из конкретного
 * хранилища значения (могут отсутствовать); возвращает решение apply/skip/noop.
 */
function guardChain(
  file: string,
  key: string,
  before: unknown,
  oldText: unknown,
  ruText: unknown,
  lang: string,
  pair: ReportPair,
): Decision {
  const base = {
    file,
    key,
    mergeTo: String(oldText ?? ''),
    scores: scoresOf(pair),
    judgeReason: pair.passes.find((p) => p.ok)?.reason ?? '',
    arbValueBefore: String(before ?? ''),
  };

  // (a) существование значений со всех трёх сторон.
  if (before === undefined) return { ...base, verdict: 'skip', reason: 'ключа нет в цели' };
  if (oldText === undefined) return { ...base, verdict: 'skip', reason: 'ключа нет в источнике OLD' };
  if (typeof oldText !== 'string' || oldText.trim() === '')
    return { ...base, verdict: 'skip', reason: 'в источнике OLD пустое/нестроковое значение' };
  if (ruText === undefined || typeof ruText !== 'string')
    return { ...base, verdict: 'skip', reason: 'ключа нет в ru-каноне — валидация невозможна' };
  // No-op: рабочее дерево уже совпадает с OLD — переносить нечего.
  if (base.arbValueBefore === oldText) return { ...base, verdict: 'noop', reason: 'значение уже идентично OLD' };

  // (b) валидация OLD-текста против ru-листа (как у основного конвейера).
  // Ключ без ведущего слэша: norm() в валидаторе нормализует только ru-сторону,
  // слэш в ключе перевода даёт фантомные «потеряны/лишние ключи».
  const bareKey = key.replace(/^\//, '');
  const leafIssues: ValidationIssue[] = validateTranslation(lang, { [bareKey]: ruText }, { [bareKey]: oldText });
  if (leafIssues.length > 0) {
    const msg = leafIssues.map((i) => `${i.path}: ${i.message}`).join('; ');
    return { ...base, verdict: 'skip', reason: `валидация не пройдена — ${msg}` };
  }

  // (c) терминологический guard: легаси-термины в OLD-тексте.
  const hits = legacyTermsHit(oldText);
  if (hits.length > 0) {
    return {
      ...base,
      verdict: 'skip',
      reason: `skip: legacy terminology, нужен перегон (${[...new Set(hits)].join(', ')})`,
    };
  }

  // (d) плейсхолдеры ru-канона сохранены (дублирует (b) — своя причина skip).
  const phProblem = placeholderParity(ruText, oldText);
  if (phProblem) {
    return { ...base, verdict: 'skip', reason: `плейсхолдеры ru-канона не сохранены — ${phProblem}` };
  }

  return { ...base, verdict: 'apply', reason: 'перенесён текст OLD (2:0)' };
}

function gitShow(ref: string, gitPath: string): string {
  return execFileSync('git', ['show', `${ref}:${gitPath}`], {
    encoding: 'utf-8',
    maxBuffer: 64 * 1024 * 1024,
    cwd: ROOT,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// UI-режим: плоский arb + снапшот <old-dir>/<lang>.json
// ─────────────────────────────────────────────────────────────────────────────

async function runUiMode(args: Args, report: ReportFile, lang: string): Promise<Decision[]> {
  // Снапшот (плоская форма, как её читает eval: <old-dir>/<lang>.json).
  const snapshotPath = path.join(args.oldDir!, `${lang.toLowerCase()}.json`);
  const snapshot = await readJsonOr<Record<string, unknown> | null>(snapshotPath, null);
  if (snapshot == null) {
    console.error(`❌ Снапшот не найден: ${snapshotPath}`);
    process.exitCode = 2;
    return [];
  }

  // Целевой arb и ru-канон рядом с ним.
  const arb = await readJsonOr<Record<string, unknown> | null>(args.arbPath!, null);
  if (arb == null) {
    console.error(`❌ Не найден или повреждён arb: ${args.arbPath}`);
    process.exitCode = 2;
    return [];
  }
  const arbLocale = typeof arb['@@locale'] === 'string' ? arb['@@locale'] : '';
  if (arbLocale && arbLocale.toLowerCase() !== lang.toLowerCase()) {
    console.error(`❌ @@locale arb («${arbLocale}») не совпадает с языком отчёта («${lang}»).`);
    process.exitCode = 2;
    return [];
  }
  const ruPath = path.join(path.dirname(args.arbPath!), 'app_ru.arb');
  const ruArb = await readJsonOr<Record<string, unknown> | null>(ruPath, null);
  if (ruArb == null) {
    console.error(`❌ Не найден ru-канон: ${ruPath}`);
    process.exitCode = 2;
    return [];
  }

  // ru-канон как плоская карта «ключ arb → строка»: arb плоский, ключи без
  // ведущего слэша; validateTranslation нормализует пути с обеих сторон.
  const ruLeaves: Leaves = {};
  for (const [k, v] of Object.entries(stripArbMeta(ruArb))) ruLeaves[k] = String(v ?? '');
  console.log(`   снапшот: ${path.relative(ROOT, snapshotPath)} (${Object.keys(snapshot).length} ключей)`);
  console.log(`   arb: ${path.relative(ROOT, args.arbPath!)}; ru-канон: ${path.relative(ROOT, ruPath)} (${Object.keys(ruLeaves).length} ключей)`);

  // Кандидаты: стабильные поражения NEW (2:0 в пользу OLD).
  const arbFileLabel = path.basename(args.arbPath!);
  const decisions: Decision[] = [];
  const mergedArb: Record<string, unknown> = { ...arb };
  let candidates = 0;
  for (const perLang of Object.values(report.results)) {
    for (const p of perLang[lang] ?? []) {
      if (!(p.status === 'judged' && p.stable && p.stableWinner === 'old')) continue;
      candidates++;
      const key = p.key.replace(/^\//, '');
      const d = guardChain(arbFileLabel, key, mergedArb[key], snapshot[key], ruLeaves[key], lang, p);
      if (d.verdict === 'apply') mergedArb[key] = d.mergeTo;
      decisions.push(d);
    }
  }
  console.log(`\n📋 Кандидатов (стабильные 2:0 в пользу OLD): ${candidates}`);

  // Файловая валидация после виртуального мерджа: листовая проверка не видит
  // файловый уровень (пул тегов, «крючки»-дубли). Провал → apply отменяется.
  const fileIssues = validateTranslation(lang, ruLeaves, stripArbMeta(mergedArb));
  if (fileIssues.length > 0) {
    console.error(`\n❌ Файловая валидация после мерджа не пройдена (${fileIssues.length}) — записи НЕТ:`);
    for (const i of fileIssues) console.error(`   - [${i.path}] ${i.message}`);
    process.exitCode = 1;
    return decisions.map((d) => ({ ...d, verdict: d.verdict === 'apply' ? 'skip' as const : d.verdict, reason: d.verdict === 'apply' ? 'файловая валидация после мерджа провалена — перенос отменён' : d.reason }));
  }

  if (args.apply) {
    await writeJsonAtomic(args.arbPath!, mergedArb);
    console.log(`✍️  Записано: ${path.relative(ROOT, args.arbPath!)} (изменено ключей: ${decisions.filter((d) => d.verdict === 'apply').length}).`);
  } else {
    console.log('🔍 DRY-RUN: arb не изменялся. Для записи перезапустите с --apply.');
  }
  return decisions;
}

// ─────────────────────────────────────────────────────────────────────────────
// Контент-режим: src/i18n/<lang>/<file>, базлайн из git
// ─────────────────────────────────────────────────────────────────────────────

async function runContentMode(args: Args, report: ReportFile, lang: string): Promise<Decision[]> {
  const langDir = lang.toLowerCase();
  const allDecisions: Decision[] = [];
  const files = Object.keys(report.results).sort();
  for (const file of files) {
    const targetPath = path.join(ROOT, 'src', 'i18n', langDir, file);
    const ruPath = path.join(ROOT, 'src', 'i18n', 'ru', file);
    const oldGitPath = `src/i18n/${langDir}/${file}`;

    const target = await readJsonOr<Record<string, unknown> | null>(targetPath, null);
    const ru = await readJsonOr<Record<string, unknown> | null>(ruPath, null);
    if (target == null || ru == null) {
      console.error(`❌ Файл не найден: ${target == null ? targetPath : ruPath} — файл пропущен.`);
      continue;
    }
    let oldFile: unknown;
    try {
      oldFile = JSON.parse(gitShow(args.gitRef!, oldGitPath));
    } catch (e) {
      console.error(`❌ git show ${args.gitRef}:${oldGitPath} не удался (${(e as Error).message.split('\n')[0]}) — файл пропущен.`);
      continue;
    }

    // flattenLeaves даёт пути ровно в нотации ключей отчёта («/title»,
    // «/screen_1/texts/0»), поэтому ключ пары используется как есть.
    const ruLeaves = flattenLeaves(ru);
    const oldLeaves = flattenLeaves(oldFile);
    const targetLeaves = flattenLeaves(target);
    console.log(`   файл: ${file} — цель ${path.relative(ROOT, targetPath)} (листьев ${Object.keys(targetLeaves).length}), ru ${Object.keys(ruLeaves).length}, OLD ${Object.keys(oldLeaves).length}`);

    const pairs = report.results[file][lang] ?? [];
    const decisions: Decision[] = [];
    const mergedLeaves: Leaves = {};
    // Юниты сравнения бывают и ЛИСТЬЯМИ, и ГРУППАМИ (например «/testExpired» —
    // массив сообщений, «/screen_1/texts»). flattenLeaves содержит только
    // строковые листья, поэтому пару разворачиваем во все листья под её путём;
    // группа переносится только ЦЕЛИКОМ: вердикт судьи дан юниту, частичный
    // мердж смешал бы два варианта внутри оцениваемого фрагмента.
    const collectUnder = (leaves: Leaves, prefix: string): Leaves => {
      const out: Leaves = {};
      for (const [p, v] of Object.entries(leaves)) {
        if (p === prefix || p.startsWith(prefix + '/')) out[p] = v;
      }
      return out;
    };
    for (const p of pairs) {
      if (!(p.status === 'judged' && p.stable && p.stableWinner === 'old')) continue;
      const key = p.key; // уже в нотации flattenLeaves (со слэшем)

      const oldUnder = collectUnder(oldLeaves, key);
      const ruUnder = collectUnder(ruLeaves, key);
      const targetUnder = collectUnder(targetLeaves, key);
      const base = { file, scores: scoresOf(p), judgeReason: p.passes.find((x) => x.ok)?.reason ?? '' };
      if (Object.keys(oldUnder).length === 0) {
        decisions.push({ ...base, key, verdict: 'skip', reason: 'пути нет в источнике OLD', arbValueBefore: '', mergeTo: '' });
        continue;
      }
      if (Object.keys(ruUnder).length === 0) {
        decisions.push({ ...base, key, verdict: 'skip', reason: 'пути нет в ru-каноне', arbValueBefore: '', mergeTo: '' });
        continue;
      }
      if (Object.keys(targetUnder).length === 0) {
        decisions.push({ ...base, key, verdict: 'skip', reason: 'пути нет в цели', arbValueBefore: '', mergeTo: '' });
        continue;
      }

      // (content) OLD-текст группы сверяется с тем, что судил eval.
      // Текст группы в отчёте — значения листьев, склеенные '\n\n' (см. qa.ts);
// порядок — документный (порядок вставки flattenLeaves).
      const oldJoined = Object.keys(oldUnder)
        .map((k) => oldUnder[k])
        .join('\n\n');
      if (oldJoined !== p.oldText) {
        decisions.push({
          ...base,
          key,
          verdict: 'skip',
          reason: 'текст OLD в git не совпадает с pair.oldText из отчёта (базлайн изменился?)',
          arbValueBefore: '',
          mergeTo: oldJoined,
        });
        continue;
      }

      // Листовые решения (одиночный ключ — вырожденный случай группы из одного).
      const leafKeys = Object.keys(oldUnder).sort();
      const leafDecisions = leafKeys.map((k) =>
        guardChain(file, k, targetUnder[k], oldUnder[k], ruUnder[k], lang, p),
      );
      const blocking = leafDecisions.find((d) => d.verdict === 'skip');
      if (blocking) {
        // Группа целиком не проходит — applies конвертируем в skip с причиной.
        for (const d of leafDecisions) {
          if (d.verdict === 'apply') {
            d.verdict = 'skip';
            d.reason = `группа \`${key}\` переносится только целиком — лист не прошёл: ${blocking.key}: ${blocking.reason}`;
          }
        }
      } else {
        for (const d of leafDecisions) {
          if (d.verdict === 'apply') mergedLeaves[d.key] = d.mergeTo;
        }
      }
      decisions.push(...leafDecisions);
    }
    allDecisions.push(...decisions);
    const appliedHere = decisions.filter((d) => d.verdict === 'apply').length;

    // Файловая валидация после виртуального мерджа; провал — файл целиком не пишем.
    const mergedTarget = structuredClone(target);
    applyLeaves(mergedTarget, mergedLeaves);
    const fileIssues = validateTranslation(lang, ruLeaves, mergedTarget);
    if (fileIssues.length > 0) {
      console.error(`❌ [${file}] файловая валидация после мерджа провалена (${fileIssues.length}) — файл НЕ записан:`);
      for (const i of fileIssues) console.error(`   - [${i.path}] ${i.message}`);
      for (const d of decisions) {
        if (d.verdict === 'apply') d.reason = 'файловая валидация после мерджа провалена — перенос отменён';
        if (d.verdict === 'apply') d.verdict = 'skip';
      }
      continue;
    }

    if (args.apply && appliedHere > 0) {
      await writeJsonAtomic(targetPath, mergedTarget);
      console.log(`✍️  [${file}] записано переносов: ${appliedHere}.`);
    }
  }
  if (!args.apply) console.log('🔍 DRY-RUN: файлы не изменялись. Для записи перезапустите с --apply.');
  return allDecisions;
}

// ─────────────────────────────────────────────────────────────────────────────
// Протокол и main
// ─────────────────────────────────────────────────────────────────────────────

function renderProtocol(
  args: Args,
  mode: Mode,
  lang: string,
  decisions: Decision[],
  fileIssueNote: string,
): string {
  const applied = decisions.filter((d) => d.verdict === 'apply');
  const skipped = decisions.filter((d) => d.verdict === 'skip');
  const noop = decisions.filter((d) => d.verdict === 'noop');
  const lines: string[] = [];
  lines.push(`# Merge-back победителей OLD — ${mode.toUpperCase()}${args.apply ? '' : ' (dry-run план)'}`);
  lines.push('');
  lines.push(`- **Дата**: ${new Date().toISOString()}`);
  lines.push(`- **Отчёт eval**: ${path.relative(ROOT, path.join(args.reportDir, 'report.json'))}`);
  if (mode === 'ui') {
    lines.push(`- **Снапшот (источник OLD)**: ${args.oldDir}`);
    lines.push(`- **Целевой arb**: ${args.arbPath}`);
  } else {
    lines.push(`- **Базлайн OLD**: git ${args.gitRef} (src/i18n/<lang>/<file>)`);
    lines.push(`- **Цели**: src/i18n/<lang>/<file> — ${[...new Set(decisions.map((d) => d.file))].join(', ') || '(нет пар)'}`);
  }
  lines.push(`- **Язык**: ${lang}`);
  lines.push(`- **Режим**: ${args.apply ? 'APPLY' : 'DRY-RUN'} (запись только по --apply)`);
  lines.push(`- **Итог**: применить ${applied.length}, skip ${skipped.length}, no-op ${noop.length}; ${fileIssueNote}`);
  lines.push('');
  lines.push('Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона' + (mode === 'content' ? '; (content) OLD в git сверён с pair.oldText.' : '.'));
  lines.push('');
  lines.push('⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».');
  lines.push('');
  lines.push('## Решения');
  lines.push('');
  lines.push('| Файл | Ключ | Решение | Причина |');
  lines.push('|---|---|---|---|');
  for (const d of decisions) {
    const verdict = d.verdict === 'apply' ? '✅ apply' : d.verdict === 'noop' ? '⚪ no-op' : '⏭ skip';
    lines.push(`| \`${d.file}\` | \`${d.key}\` | ${verdict} | ${d.reason.replace(/\|/g, '\\|')} |`);
  }
  lines.push('');
  lines.push('## Переносы (было → стало)');
  lines.push('');
  if (applied.length === 0) {
    lines.push('_Нет применённых переносов._');
    lines.push('');
  }
  for (const d of applied) {
    lines.push(`### \`${d.file}\` → \`${d.key}\``);
    lines.push('');
    lines.push(`- **Оценки судьи OLD/NEW (2 прохода)**: ${d.scores}`);
    if (d.judgeReason) lines.push(`- **Судья**: ${d.judgeReason}`);
    lines.push(`- **Было (NEW)**: ${JSON.stringify(d.arbValueBefore)}`);
    lines.push(`- **Стало (OLD)**: ${JSON.stringify(d.mergeTo)}`);
    lines.push('');
  }
  lines.push('## Легаси-терминология (guard c)');
  lines.push('');
  lines.push(`Список: ${JSON.stringify(LEGACY_TERMS)}; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).`);
  lines.push('');
  return lines.join('\n') + '\n';
}

async function main(): Promise<number> {
  const args = parseArgs();
  const mode: Mode = args.gitRef ? 'content' : 'ui';

  const report = await readJsonOr<ReportFile | null>(path.join(args.reportDir, 'report.json'), null);
  if (report == null) {
    console.error(`❌ Не найден или повреждён report.json в ${args.reportDir}`);
    return 2;
  }

  // Язык: из отчёта; если в отчёте несколько — обязателен --lang.
  const reportLangs = [...new Set(Object.values(report.results).flatMap((perFile) => Object.keys(perFile)))]
    .sort();
  const langs = args.lang ? reportLangs.filter((l) => l === args.lang) : reportLangs;
  if (langs.length === 0) {
    console.error(`❌ В отчёте нет языка ${args.lang ?? '(не указан)'}; есть: ${reportLangs.join(', ')}`);
    return 2;
  }
  if (langs.length > 1) {
    console.error(`❌ В отчёте несколько языков (${langs.join(', ')}) — укажите --lang. Пилот: один прогон = один язык.`);
    return 2;
  }
  const lang = langs[0]!;

  console.log(`🔀 merge-back (${mode}): отчёт ${path.relative(ROOT, args.reportDir)}, язык ${lang}, режим ${args.apply ? 'APPLY' : 'DRY-RUN'}`);

  const decisions =
    mode === 'ui'
      ? await runUiMode(args, report, lang)
      : await runContentMode(args, report, lang);
  if (process.exitCode != null && process.exitCode !== 0) return process.exitCode;

  const appliedCount = decisions.filter((d) => d.verdict === 'apply').length;
  const skippedCount = decisions.filter((d) => d.verdict === 'skip').length;
  const noopCount = decisions.filter((d) => d.verdict === 'noop').length;

  // Лог решений.
  console.log('');
  for (const d of decisions) {
    const mark = d.verdict === 'apply' ? '✅' : d.verdict === 'noop' ? '⚪' : '⏭ ';
    console.log(`   ${mark} \`${d.file}\` → \`${d.key}\` ${d.verdict}${d.verdict === 'apply' ? '' : ` — ${d.reason}`}`);
    if (d.verdict === 'apply') {
      console.log(`      было  (NEW): ${JSON.stringify(d.arbValueBefore)}`);
      console.log(`      стало (OLD): ${JSON.stringify(d.mergeTo)}`);
      console.log(`      оценки OLD/NEW: ${d.scores}${d.judgeReason ? `\n      судья: ${d.judgeReason.slice(0, 220)}` : ''}`);
    }
  }
  console.log(`\n📊 Итог: применить ${appliedCount}, skip ${skippedCount}, no-op ${noopCount} (режим ${args.apply ? 'APPLY' : 'DRY-RUN'}).`);

  const protocol = renderProtocol(args, mode, lang, decisions, 'файловая валидация после мерджа: пройдена');
  // Dry-run пишет план в соседний файл, чтобы не затирать протокол уже
  // применённого мерджа (исторический apply-протокол — доказательство).
  const protocolPath = path.join(args.reportDir, args.apply ? 'merge-winners.md' : 'merge-winners.dry.md');
  await writeFileAtomic(protocolPath, protocol);
  console.log(`💾 Протокол: ${path.relative(ROOT, protocolPath)}`);

  if (!args.apply) console.log('🔍 DRY-RUN. Для записи перезапустите с --apply.');
  return 0;
}

process.exitCode = await main();
