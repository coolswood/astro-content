#!/usr/bin/env bun
/**
 * Аудит перевода: 3-стадийный судейский конвейер + шаг корректировки.
 *
 *   bun scripts/qa/audit.ts breathing.json --key balance --langs de,ar
 *   bun scripts/qa/audit.ts breathing.json --key balance --langs de,ar --apply
 *   bun scripts/qa/audit.ts story/start.json --langs de --label после-правок
 *
 * Стадии (каждая — отдельный запрос с json-ответом):
 *   1. issues     — найти все замечания к переводу (тип, severity, цитата, почему);
 *   2. deliberate — перекрёстная сверка замечаний между собой и с оригиналом:
 *                   confirmed / merged (дубли) / rejected (ложные) + ранжирование;
 *   3. recommend  — по каждому подтверждённому замечанию сравнить варианты
 *                   решений и выбрать лучший; общий вердикт по статье.
 *
 * Шаг 4 (--apply): механически вписать рекомендации судьи в файлы локалей —
 * БЕЗ модельного прохода (судья уже решил, каким должен быть текст). Защиты:
 * отклонённые коллегией замечания не применяются; путь должен существовать;
 * текст в файле должен совпадать с current из отчёта; после применения —
 * валидация (теги/плейсхолдеры/ключи), при провале файл не пишется.
 *
 * Отчёт: scripts/qa/reports/<ts>-audit-<label>/{report.json,report.md}.
 * Промпты: scripts/prompts/base/qa/audit_{issues,deliberate,recommend}.txt
 * ({{LANG_STYLE}} и глоссарий локали подставляются как в переводном конвейере).
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseCli } from '../lib/cli.js';
import { LANG_NAMES, normalizeLangCode } from '../lib/lang-codes.js';
import { VllmClient, formatGlossaryDetailed, mergeSubset } from '../lib/pipeline.js';
import { loadPrompt } from '../lib/prompt-loader.js';
import { loadGlossary } from '../lib/glossary-utils.js';
import { parseWithRepair } from '../lib/json-repair.js';
import { flattenLeaves, type Leaves } from '../lib/tree.js';
import { validateTranslation } from '../lib/validation.js';
import { writeJsonAtomic, writeTextAtomic, readJsonOr } from '../lib/atomic-fs.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

interface Args {
  relFile: string;
  key: string | null;
  langs: string[];
  label: string;
  endpoint: string;
  model: string;
  /** Вписать подтверждённые рекомендации судьи в файлы локалей. */
  apply: boolean;
}

async function loadArgs(): Promise<Args> {
  const cfg = await readJsonOr<Partial<Args> & { endpoint?: string; model?: string }>(
    path.join(ROOT, 'scripts', 'translate.config.json'),
    {},
  );
  const { flags, positional } = parseCli();
  const relFile = (positional[0] ?? '') as string;
  if (!relFile) {
    console.error('❌ Укажите файл внутри src/i18n/ru: bun scripts/qa/audit.ts breathing.json --key balance --langs de');
    process.exit(2);
  }
  const langs = flags.langs
    ? (flags.langs as string).split(',').map((l) => normalizeLangCode(l)).filter(Boolean)
    : ['de', 'ja', 'ar'];
  return {
    relFile,
    key: (flags.key as string) ?? null,
    langs,
    label: (flags.label as string) ?? 'manual',
    endpoint: (flags.endpoint as string) ?? process.env.TRANSLATE_ENDPOINT ?? cfg.endpoint ?? 'http://127.0.0.1:8000/v1',
    model: (flags.model as string) ?? process.env.TRANSLATE_MODEL ?? cfg.model ?? 'google/gemma-4-26B-A4B-it',
    apply: (flags.apply ?? 'false') === 'true',
  };
}

interface AlignedItem {
  path: string;
  ru: string;
  tr: string;
}

/** Выравнивает ru-листья и перевод по путям; отсутствующий перевод — пустая строка (будет omission). */
async function loadAligned(relFile: string, key: string | null, lang: string): Promise<AlignedItem[]> {
  const ru = await readJsonOr<any>(path.join(ROOT, 'src', 'i18n', 'ru', relFile), null);
  if (ru == null) throw new Error(`не читается src/i18n/ru/${relFile}`);
  const target = await readJsonOr<any>(path.join(ROOT, 'src', 'i18n', lang.toLowerCase(), relFile), {});
  const source = key ? ru[key] : ru;
  const targetSub = key ? target[key] : target;
  if (source == null || typeof source !== 'object') throw new Error(`нет ключа «${key}» в ru/${relFile}`);
  const ruLeaves = flattenLeaves(source);
  const trLeaves = flattenLeaves(targetSub ?? {});
  return Object.keys(ruLeaves)
    .sort()
    .map((p) => ({ path: p, ru: ruLeaves[p], tr: trLeaves[p] ?? '' }));
}

interface StageAttempt {
  parse: (data: any) => void; // бросает, если формат не тот
}

/** Один запрос стадии: 2 попытки, ответ строго JSON, формат проверяет caller. */
async function stage(
  client: VllmClient,
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

interface AppliedEdit {
  id: string;
  path: string;
  from: string;
  to: string;
}

interface SkippedEdit {
  id: string;
  path: string;
  reason: string;
}

interface LangResult {
  lang: string;
  items: AlignedItem[];
  scan: any[];
  issues: any[];
  reviewed: any[];
  notes: string;
  recommendations: any[];
  overall: any;
  applied: AppliedEdit[];
  skipped: SkippedEdit[];
  timings: { issues: number; deliberate: number; recommend: number };
}

/**
 * Шаг корректировки: вписывает вердикт судьи в файл локали механически,
 * без модели. Приоритет судьи определяет порядок; при нескольких
 * рекомендациях на один путь применяется первая (важнейшая).
 */
async function applyRecommendations(
  args: Args,
  lang: string,
  items: AlignedItem[],
  recommendations: any[],
  reviewed: any[],
): Promise<{ applied: AppliedEdit[]; skipped: SkippedEdit[] }> {
  const applied: AppliedEdit[] = [];
  const skipped: SkippedEdit[] = [];
  if (recommendations.length === 0) return { applied, skipped };

  const rejectedIds = new Set(reviewed.filter((r) => r.verdict === 'rejected').map((r) => r.id));
  const targetPath = path.join(ROOT, 'src', 'i18n', lang.toLowerCase(), args.relFile);
  const target = await readJsonOr<any>(targetPath, null);
  if (target == null) throw new Error(`не читается ${targetPath}`);
  const subtree = args.key ? target[args.key] : target;
  if (subtree == null || typeof subtree !== 'object') throw new Error(`нет поддерева «${args.key}» в ${targetPath}`);

  const flat = flattenLeaves(subtree);
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
  mergeSubset(subtree, barePatch, 'judge-apply');
  const sentLeaves: Leaves = {};
  for (const item of items) sentLeaves[item.path] = item.ru;
  const issues = validateTranslation(lang, sentLeaves, subtree);
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

async function auditLang(args: Args, client: VllmClient, lang: string): Promise<LangResult> {
  const lc = lang.toLowerCase();
  const items = await loadAligned(args.relFile, args.key, lang);
  console.log(`\n🌐 ${lang} (${LANG_NAMES[lang] ?? lang}): листьев ${items.length}`);
  const glossaryPath = path.join(ROOT, 'scripts', 'prompts', lc, 'glossary.json');
  const glossary = formatGlossaryDetailed(await loadGlossary(glossaryPath));

  // Стадия 1: замечания.
  const sysIssues = await loadPrompt('qa', 'audit_issues', lang);
  const payload = JSON.stringify({ sourceLocale: 'ru', targetLocale: lang, items });
  const s1 = await stage(client, sysIssues, payload, 8192, (data) => {
    if (!Array.isArray(data.issues)) throw new Error('нет массива issues');
    if (!Array.isArray(data.scan)) throw new Error('нет массива scan (построчный разбор)');
  });
  const issues = asArray(s1.data.issues);
  console.log(`   🔍 issues: ${issues.length} замечаний (${(s1.ms / 1000).toFixed(0)}с)`);

  // Стадия 2: перекрёстная сверка замечаний.
  const sysDelib = await loadPrompt('qa', 'audit_deliberate', lang);
  const delibPayload = JSON.stringify({ targetLocale: lang, items, issues });
  const s2 = await stage(client, sysDelib, delibPayload, 8192, (data) => {
    if (!Array.isArray(data.reviewed)) throw new Error('нет массива reviewed');
  });
  const reviewed = asArray(s2.data.reviewed);
  const confirmed = reviewed.filter((r) => r.verdict === 'confirmed');
  const rejected = reviewed.filter((r) => r.verdict === 'rejected').length;
  const merged = reviewed.filter((r) => r.verdict === 'merged').length;
  console.log(`   ⚖️ deliberate: подтверждено ${confirmed.length}, склеено ${merged}, отклонено ${rejected} (${(s2.ms / 1000).toFixed(0)}с)`);

  // Стадия 3: рекомендации лучших решений.
  const sysReco = await loadPrompt('qa', 'audit_recommend', lang);
  const recoPayload = JSON.stringify({ targetLocale: lang, items, issues, reviewed });
  const s3 = await stage(client, sysReco, recoPayload, 16_384, (data) => {
    if (!Array.isArray(data.recommendations)) throw new Error('нет массива recommendations');
    if (!data.overall || typeof data.overall !== 'object') throw new Error('нет overall');
  });
  const recommendations = asArray(s3.data.recommendations);
  console.log(
    `   📋 recommend: ${recommendations.length} рекомендаций, verdict=${s3.data.overall?.verdict}, score=${s3.data.overall?.score} (${(s3.ms / 1000).toFixed(0)}с)`,
  );

  let applied: AppliedEdit[] = [];
  let skipped: SkippedEdit[] = [];
  if (args.apply) {
    ({ applied, skipped } = await applyRecommendations(args, lang, items, recommendations, reviewed));
    console.log(`   🛠 apply: вписано ${applied.length}, пропущено ${skipped.length}`);
  }

  return {
    lang,
    items,
    scan: asArray(s1.data.scan),
    issues,
    reviewed,
    notes: String(s2.data.notes ?? ''),
    recommendations,
    overall: s3.data.overall,
    applied,
    skipped,
    timings: { issues: s1.ms, deliberate: s2.ms, recommend: s3.ms },
  };
}

function renderMd(args: Args, results: LangResult[]): string {
  const lines: string[] = [
    `# Аудит перевода: ${args.relFile}${args.key ? `#${args.key}` : ''} — ${results.map((r) => r.lang).join(', ')}`,
    '',
    `Модель: ${args.model} · 3 стадии: issues → deliberate → recommend`,
    '',
  ];
  for (const r of results) {
    lines.push(`## ${r.lang} (${LANG_NAMES[r.lang] ?? r.lang})`);
    lines.push('');
    lines.push(
      `**Вердикт: ${r.overall?.verdict ?? '?'} · score ${r.overall?.score ?? '?'}** — ${r.overall?.summary ?? ''}`,
    );
    if (r.notes) lines.push(`\n_Коллегия:_ ${r.notes}`);
    lines.push('');
    const rejectedIds = new Set(
      r.reviewed.filter((x) => x.verdict === 'rejected').map((x) => x.id),
    );
    const recs = r.recommendations.filter((x) => !rejectedIds.has(x.id));
    if (recs.length > 0) {
      lines.push('| # | Путь | Сейчас | Рекомендация | Почему |');
      lines.push('|---|---|---|---|---|');
      for (const rec of recs) {
        lines.push(
          `| ${rec.priority ?? ''} | \`${rec.path}\` | ${String(rec.current ?? '').slice(0, 80)} | **${String(rec.proposed ?? '').slice(0, 120)}** | ${String(rec.rationale ?? '').replace(/\|/g, '/')} |`,
        );
      }
    } else {
      lines.push('Подтверждённых замечаний нет — рекомендаций не требуется.');
    }
    const rejected = r.reviewed.filter((x) => x.verdict === 'rejected');
    if (rejected.length > 0) {
      lines.push('');
      lines.push('**Отклонено коллегией (ложные срабатывания первого прохода):**');
      for (const rej of rejected) {
        const orig = r.issues.find((i) => i.id === rej.id);
        lines.push(`- ${rej.id}: ${String(orig?.problem ?? '').slice(0, 120)} — _${rej.note ?? ''}_`);
      }
    }
    const t = r.timings;
    lines.push('');
    if (r.applied.length > 0 || r.skipped.length > 0) {
      lines.push(`**Корректировка (--apply): вписано ${r.applied.length}, пропущено ${r.skipped.length}**`);
      for (const edit of r.applied) {
        lines.push(`- \`${edit.path}\`: ${String(edit.from).slice(0, 70)} → **${String(edit.to).slice(0, 90)}**`);
      }
      for (const skip of r.skipped) {
        lines.push(`- ⏭ \`${skip.path}\` (${skip.id}): ${skip.reason}`);
      }
      lines.push('');
    }
    lines.push(
      `_Время: issues ${(t.issues / 1000).toFixed(0)}с · deliberate ${(t.deliberate / 1000).toFixed(0)}с · recommend ${(t.recommend / 1000).toFixed(0)}с_`,
    );
    lines.push('');
  }
  return lines.join('\n');
}

async function main(): Promise<number> {
  const args = await loadArgs();
  console.log(
    `🕵️ Аудит: src/i18n/ru/${args.relFile}${args.key ? `#${args.key}` : ''} · локали: ${args.langs.join(', ')}${args.apply ? ' · С КОРРЕКТИРОВКОЙ (--apply)' : ''}`,
  );
  console.log(`🔧 ${args.endpoint} (${args.model})`);

  const client = new VllmClient(args.endpoint, args.model, 600_000, 10);
  await client.preflight();
  console.log('✅ Модель доступна.');

  const results: LangResult[] = [];
  let failures = 0;
  for (const lang of args.langs) {
    try {
      results.push(await auditLang(args, client, lang));
    } catch (e: any) {
      console.error(`   🛑 ${lang}: ${e?.message ?? e}`);
      failures++;
    }
  }

  if (results.length > 0) {
    const dir = path.join(ROOT, 'scripts', 'qa', 'reports', `${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}-audit-${args.label}`);
    await fs.mkdir(dir, { recursive: true });
    await writeJsonAtomic(
      path.join(dir, 'report.json'),
      { file: args.relFile, key: args.key, model: args.model, endpoint: args.endpoint, results },
    );
    await writeTextAtomic(path.join(dir, 'report.md'), renderMd(args, results));
    console.log(`\n💾 Отчёт: ${path.relative(ROOT, dir)}/report.{json,md}`);
  }

  await client.close?.();
  return failures > 0 ? 1 : 0;
}

process.exitCode = await main();
