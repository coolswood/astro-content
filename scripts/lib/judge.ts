/**
 * Судейский пайплайн (коллегия): issues → deliberate → recommend (+ apply).
 *
 * Часть конвейера переводов: после записи перевода раннер гонит переведённые
 * листья через коллегию; подтверждённые рекомендации вписываются механически,
 * затем локаль судится заново — до раунда без правок (максимум maxRounds).
 * Стадии (каждая — отдельный json-запрос, промпты base/qa/audit_*.txt):
 *   1. issues     — построчный scan + все замечания (тип/severity/цитата/почему);
 *   2. deliberate — сверка замечаний между собой и с оригиналом:
 *                   confirmed/merged/rejected + ранжирование;
 *   3. recommend  — сравнение вариантов решений, лучший + общий вердикт.
 *
 * Пути листьев — от корня ФАЙЛА (со ведущим слэшем, как у flattenLeaves).
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { LANG_NAMES } from './lang-codes.js';
import { formatGlossaryDetailed, mergeSubset, type StageClient } from './pipeline.js';
import { loadPrompt } from './prompt-loader.js';
import { loadGlossary } from './glossary-utils.js';
import { parseWithRepair } from './json-repair.js';
import { flattenLeaves, type Leaves } from './tree.js';
import { validateTranslation, type ValidationIssue } from './validation.js';
import { stripInstagramAttributes } from './tag-reconcile.js';
import { writeJsonAtomic, writeTextAtomic, readJsonOr } from './atomic-fs.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export interface JudgeItem {
  path: string;
  ru: string;
  tr: string;
  /** Контекст (@-мета ARB для ui-режима): описание ключа, placeholders. */
  meta?: string;
}

/** Выравненный список листьев для судейства. Отсутствующий перевод = '' (collegia увидит omission). */
export function buildAlignedItems(ruLeaves: Leaves, trLeaves: Leaves, paths: string[]): JudgeItem[] {
  return paths.map((p) => ({ path: p, ru: ruLeaves[p] ?? '', tr: trLeaves[p] ?? '' }));
}

async function stage(
  client: StageClient,
  system: string,
  user: string,
  maxTokens: number,
  validate: (data: any) => void,
): Promise<{ data: any; ms: number }> {
  let lastError: unknown = null;
  for (let attempt = 1; attempt <= 2; attempt++) {
    const t = Date.now();
    try {
      const text = await client.complete({
        system,
        user,
        temperature: 0.2,
        maxTokens,
        jsonMode: true,
      });
      const data = await parseWithRepair<any>(text);
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error(`ответ не JSON-объект: ${text.slice(0, 120)}`);
      }
      validate(data);
      return { data, ms: Date.now() - t };
    } catch (e: any) {
      lastError = e;
      console.warn(`   ⚠️ попытка ${attempt}/2: ${e?.message ?? e}`);
    }
  }
  throw new Error(`стадия не выполнена: ${(lastError as any)?.message ?? lastError}`);
}

const asArray = (v: any): any[] => (Array.isArray(v) ? v : []);

export interface JudgeVerdict {
  scan: any[];
  issues: any[];
  reviewed: any[];
  notes: string;
  recommendations: any[];
  overall: any;
  timings: { issues: number; deliberate: number; recommend: number };
}

/** Один проход коллегии по одному языку (3 запроса). kind выбирает семейство промптов. */
export async function judgeOnce(
  client: StageClient,
  lang: string,
  items: JudgeItem[],
  glossaryPath?: string,
  kind: 'text' | 'ui' = 'text',
  context?: Record<string, string>,
): Promise<JudgeVerdict> {
  const lc = lang.toLowerCase();
  const glossaryText = glossaryPath
    ? formatGlossaryDetailed(await loadGlossary(glossaryPath))
    : '';
  const names =
    kind === 'ui'
      ? ['audit_ui_issues', 'audit_ui_deliberate', 'audit_ui_recommend']
      : ['audit_issues', 'audit_deliberate', 'audit_recommend'];

  const sysIssues = (await loadPrompt('qa', names[0], lc)).replace('{{GLOSSARY}}', glossaryText);
  const payload = JSON.stringify({
    sourceLocale: 'ru',
    targetLocale: lang,
    items,
    ...(context && Object.keys(context).length > 0 ? { context } : {}),
  });
  const s1 = await stage(client, sysIssues, payload, 8192, (data) => {
    if (!Array.isArray(data.issues)) throw new Error('нет массива issues');
    if (!Array.isArray(data.scan)) throw new Error('нет массива scan (построчный разбор)');
  });
  const issues = asArray(s1.data.issues);
  console.log(`   🔍 issues: ${issues.length} замечаний (${(s1.ms / 1000).toFixed(0)}с)`);

  const sysDelib = (await loadPrompt('qa', names[1], lc)).replace('{{GLOSSARY}}', glossaryText);
  const s2 = await stage(
    client,
    sysDelib,
    JSON.stringify({ targetLocale: lang, items, issues }),
    8192,
    (data) => {
      if (!Array.isArray(data.reviewed)) throw new Error('нет массива reviewed');
    },
  );
  const reviewed = asArray(s2.data.reviewed);
  console.log(
    `   ⚖️ deliberate: подтверждено ${reviewed.filter((r) => r.verdict === 'confirmed').length}` +
      `, склеено ${reviewed.filter((r) => r.verdict === 'merged').length}` +
      `, отклонено ${reviewed.filter((r) => r.verdict === 'rejected').length} (${(s2.ms / 1000).toFixed(0)}с)`,
  );

  const sysReco = (await loadPrompt('qa', names[2], lc)).replace('{{GLOSSARY}}', glossaryText);
  const s3 = await stage(
    client,
    sysReco,
    JSON.stringify({ targetLocale: lang, items, issues, reviewed }),
    16_384,
    (data) => {
      if (!Array.isArray(data.recommendations)) throw new Error('нет массива recommendations');
      if (!data.overall || typeof data.overall !== 'object') throw new Error('нет overall');
    },
  );
  console.log(
    `   📋 recommend: ${asArray(s3.data.recommendations).length} рекомендаций` +
      `, verdict=${s3.data.overall?.verdict}, score=${s3.data.overall?.score} (${(s3.ms / 1000).toFixed(0)}с)`,
  );

  return {
    scan: asArray(s1.data.scan),
    issues,
    reviewed,
    notes: String(s2.data.notes ?? ''),
    recommendations: asArray(s3.data.recommendations),
    overall: s3.data.overall,
    timings: { issues: s1.ms, deliberate: s2.ms, recommend: s3.ms },
  };
}

export interface AppliedEdit {
  id: string;
  path: string;
  from: string;
  to: string;
}

export interface SkippedEdit {
  id: string;
  path: string;
  reason: string;
}

/**
 * Шаг корректировки: вписывает вердикт судьи в файл механически, без модели.
 * Защиты: отклонённые коллегией не применяются; путь обязан существовать;
 * текст в файле обязан совпадать с current; после применения — валидация.
 */
export async function applyJudgeRecommendations(
  targetPath: string,
  lang: string,
  sentLeaves: Leaves,
  recommendations: any[],
  reviewed: any[],
  /** Значения листа, которые уже были (текущее + все применённые): защита от осцилляций. */
  seenValuesByPath?: Map<string, Set<string>>,
): Promise<{ applied: AppliedEdit[]; skipped: SkippedEdit[] }> {
  const applied: AppliedEdit[] = [];
  const skipped: SkippedEdit[] = [];
  if (recommendations.length === 0) return { applied, skipped };

  const rejectedIds = new Set(reviewed.filter((r) => r.verdict === 'rejected').map((r) => r.id));
  const target = await readJsonOr<any>(targetPath, null);
  if (target == null) throw new Error(`не читается ${targetPath}`);

  const flat = flattenLeaves(target);
  const patch: Record<string, string> = {};
  const from: Record<string, string> = {};
  const idsByPath: Record<string, string> = {};
  const donePaths = new Set<string>();

  const sorted = [...recommendations].sort(
    (a, b) => (Number(a.priority) || 99) - (Number(b.priority) || 99),
  );
  for (const rec of sorted) {
    const p = String(rec.path ?? '');
    const id = String(rec.id ?? '?');
    if (!p || donePaths.has(p)) continue;
    if (rejectedIds.has(id)) {
      skipped.push({ id, path: p, reason: 'замечание отклонено коллегией' });
      continue;
    }
    const proposed = typeof rec.proposed === 'string' ? rec.proposed.trim() : '';
    if (!proposed) {
      skipped.push({ id, path: p, reason: 'пустая рекомендация' });
      continue;
    }
    if (!(p in flat) || typeof flat[p] !== 'string') {
      skipped.push({ id, path: p, reason: 'путь отсутствует в файле' });
      continue;
    }
    if (rec.current != null && rec.current !== flat[p]) {
      skipped.push({ id, path: p, reason: 'текст в файле не совпал с current из отчёта' });
      continue;
    }
    if (flat[p] === proposed) {
      skipped.push({ id, path: p, reason: 'правка уже применена' });
      continue;
    }
    if (seenValuesByPath?.get(p)?.has(proposed)) {
      skipped.push({ id, path: p, reason: 'осцилляция: это значение у листа уже было' });
      continue;
    }
    patch[p] = proposed;
    from[p] = flat[p];
    idsByPath[p] = id;
    donePaths.add(p);
  }

  if (Object.keys(patch).length === 0) return { applied, skipped };

  // Пути у flattenLeaves с ведущим слэшем; mergeSubset принимает пути модели
  // (без него) — снимаем, иначе получится '//path' и патч промахнётся.
  const barePatch: Record<string, string> = {};
  for (const p of Object.keys(patch)) barePatch[p.replace(/^\//, '')] = patch[p]!;
  mergeSubset(target, barePatch, 'judge-apply');

  // Конвенция <instagram>: вне ru/en тег обязан быть пустым — судья копирует
  // атрибуты из оригинала так же, как переводная модель, срезаем механически.
  const stripped = stripInstagramAttributes(target, lang);
  if (stripped > 0) {
    console.warn(`   ⚠️ [judge-apply] срезаны атрибуты <instagram> в ${stripped} листах (${lang})`);
  }

  // Валидируем ТОЛЬКО исправляемые листья: файл в целом содержит и старые
  // переводы, которых нет в sentLeaves (частичный доперевод), — сверка целого
  // файла с подмножеством давала бы ложные «лишние ключи» и отменяла правки.
  // Ключи без ведущего слэша: flattenLeaves добавит свой, norm() снимет.
  const issues: ValidationIssue[] = [];
  for (const p of Object.keys(patch)) {
    const bare = p.replace(/^\//, '');
    issues.push(
      ...validateTranslation(lang, { [bare]: sentLeaves[p] }, { [bare]: patch[p]! }),
    );
  }
  if (issues.length > 0) {
    for (const issue of issues) {
      skipped.push({ id: '-', path: issue.path, reason: `валидация: ${issue.message}` });
    }
    console.warn(`   ❌ Корректировка отменена: валидация не прошла (${issues.length})`);
    return { applied, skipped };
  }

  await writeJsonAtomic(targetPath, target);
  for (const p of Object.keys(patch)) {
    applied.push({ id: idsByPath[p] ?? '', path: p, from: from[p]!, to: patch[p]! });
  }
  return { applied, skipped };
}

export interface JudgeRound {
  round: number;
  verdict: JudgeVerdict;
  applied: AppliedEdit[];
  skipped: SkippedEdit[];
}

export interface JudgeLangResult {
  lang: string;
  rounds: JudgeRound[];
  converged: boolean;
  totalApplied: number;
}

export interface JudgeFileOptions {
  client: StageClient;
  /** Путь внутри src/i18n/ru, напр. story/coping.json */
  relFile: string;
  /** Целый ru-файл (для выравнивания). */
  ruJson: any;
  /** Листья к судейству по локалям (пути от корня файла, со слэшем). */
  perLang: Record<string, string[]>;
  /** Вписывать подтверждённые рекомендации (шаг корректировки). */
  apply: boolean;
  /** Раундов не более (по умолчанию 3; 1 = судить без цикла). */
  maxRounds?: number;
  /** Куда положить отчёт (относительно ROOT); пусто — не писать. */
  reportDir?: string;
  glossaryDir?: string;
  /** Корень репо (для тестов; по умолчанию — реальный репозиторий). */
  rootOverride?: string;
  /** Семейство промптов коллегии: text (статьи) | ui (ключи ARB). */
  kind?: 'text' | 'ui';
  /** @-мета ARB (ui): контекст ключей для судьи, по «сырым» ключам без слэша. */
  ruMeta?: Record<string, any>;
  /** Где лежит перевод локали (по умолчанию src/i18n/<lc>/<relFile>). */
  getFileForLang?: (lang: string) => string;
  /** Принятые переводы соседних ключей по локалям: судья проверяет уникальность и стиль. */
  contextByLang?: Record<string, Record<string, string>>;
}

/**
 * Коллегия по одному файлу с циклом сходимости: раунд судит активные локали,
 * вписывает правки; локаль остаётся активной, только если в раунде были
 * применённые правки. Останов — раунд без правок или исчерпание maxRounds.
 */
export async function judgeFile(opts: JudgeFileOptions): Promise<JudgeLangResult[]> {
  const root = opts.rootOverride ?? ROOT;
  const ruLeaves = flattenLeaves(opts.ruJson);
  const maxRounds = opts.maxRounds ?? 3;
  const results: JudgeLangResult[] = [];

  let current = Object.keys(opts.perLang).filter((l) => opts.perLang[l].length > 0);
  const pending: Record<string, JudgeRound[]> = {};
  const seenByLang: Record<string, Map<string, Set<string>>> = {};
  for (const lang of current) pending[lang] = [];

  let round = 1;
  while (current.length > 0 && round <= maxRounds) {
    console.log(
      `\n🧑‍⚖️ Коллегия, раунд ${round}: ${opts.relFile} · локали ${current.join(', ')}`,
    );
    const stillActive: string[] = [];
    for (const lang of current) {
      const lc = lang.toLowerCase();
      const targetPath = opts.getFileForLang
        ? opts.getFileForLang(lang)
        : path.join(root, 'src', 'i18n', lc, opts.relFile);
      const target = await readJsonOr<any>(targetPath, {});
      const trLeaves = flattenLeaves(target ?? {});
      const items = buildAlignedItems(ruLeaves, trLeaves, opts.perLang[lang]);
      if (opts.ruMeta) {
        for (const item of items) {
          const meta = opts.ruMeta[item.path.replace(/^\//, '')];
          if (meta !== undefined) item.meta = JSON.stringify(meta);
        }
      }
      console.log(`\n🌐 ${lang} (${LANG_NAMES[lang] ?? lang}): листьев ${items.length}`);
      // Память значений листа (текущее + все применённые): судья, предлагающий
      // вернуть лист к уже бывшему у него значению, крутит осцилляцию — не даём.
      const seenValuesByPath = (seenByLang[lang] ??= new Map());
      for (const p of opts.perLang[lang]) {
        const v = trLeaves[p];
        if (typeof v === 'string') {
          if (!seenValuesByPath.has(p)) seenValuesByPath.set(p, new Set());
          seenValuesByPath.get(p)!.add(v);
        }
      }
      try {
        const verdict = await judgeOnce(
          opts.client,
          lang,
          items,
          opts.glossaryDir
            ? path.join(opts.glossaryDir, lc, 'glossary.json')
            : path.join(ROOT, 'scripts', 'prompts', lc, 'glossary.json'),
          opts.kind ?? 'text',
          opts.contextByLang?.[lang],
        );
        let applied: AppliedEdit[] = [];
        let skipped: SkippedEdit[] = [];
        if (opts.apply) {
          const sentLeaves: Leaves = {};
          for (const p of opts.perLang[lang]) sentLeaves[p] = ruLeaves[p];
          ({ applied, skipped } = await applyJudgeRecommendations(
            targetPath,
            lang,
            sentLeaves,
            verdict.recommendations,
            verdict.reviewed,
            seenValuesByPath,
          ));
          console.log(`   🛠 apply: вписано ${applied.length}, пропущено ${skipped.length}`);
        }
        pending[lang].push({ round, verdict, applied, skipped });
        if (applied.length > 0) stillActive.push(lang);
      } catch (e: any) {
        console.error(`   🛑 ${lang}: коллегия не состоялась: ${e?.message ?? e}`);
      }
    }
    current = stillActive;
    round++;
  }

  for (const lang of Object.keys(pending)) {
    const rounds = pending[lang];
    results.push({
      lang,
      rounds,
      // Сошёлся = не в активных на выходе из цикла (его последний раунд без правок).
      converged: !current.includes(lang),
      totalApplied: rounds.reduce((n, r) => n + r.applied.length, 0),
    });
  }

  if (opts.reportDir && results.length > 0) {
    await fs.mkdir(path.join(ROOT, opts.reportDir), { recursive: true });
    const report = {
      file: opts.relFile,
      model: 'см. endpoint клиента',
      rounds: (opts.maxRounds ?? 3),
      results: results.map((r) => ({
        lang: r.lang,
        converged: r.converged,
        totalApplied: r.totalApplied,
        rounds: r.rounds,
      })),
    };
    await writeJsonAtomic(path.join(ROOT, opts.reportDir, 'report.json'), report);
    await writeTextAtomic(path.join(ROOT, opts.reportDir, 'report.md'), renderLoopMd(opts.relFile, results));
    console.log(`\n💾 Отчёт коллегии: ${opts.reportDir}/report.{json,md}`);
  }

  return results;
}

function renderLoopMd(relFile: string, results: JudgeLangResult[]): string {
  const lines: string[] = [`# Коллегия: ${relFile}`, ''];
  for (const r of results) {
    const last = r.rounds[r.rounds.length - 1];
    lines.push(
      `## ${r.lang} — раундов ${r.rounds.length}, правок ${r.totalApplied}` +
        `${r.converged ? ' · сошлось' : ' · НЕ сошлось (лимит раундов)'}`,
    );
    if (last) {
      lines.push(`\n**Вердикт: ${last.verdict.overall?.verdict ?? '?'} · score ${last.verdict.overall?.score ?? '?'}** — ${last.verdict.overall?.summary ?? ''}`);
    }
    const edits = r.rounds.flatMap((rd) => rd.applied.map((e) => ({ ...e, round: rd.round })));
    if (edits.length > 0) {
      lines.push('');
      for (const e of edits) {
        lines.push(`- [раунд ${e.round}] \`${e.path}\`: ${String(e.from).slice(0, 70)} → **${String(e.to).slice(0, 90)}**`);
      }
    }
    const rejected = r.rounds.flatMap((rd) =>
      rd.verdict.reviewed.filter((x) => x.verdict === 'rejected').map((x) => ({ ...x, round: rd.round })),
    );
    if (rejected.length > 0) {
      lines.push('');
      for (const rej of rejected) lines.push(`- ⏭ отклонено (раунд ${rej.round}): ${rej.note ?? ''}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}
