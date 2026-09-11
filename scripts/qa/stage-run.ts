#!/usr/bin/env bun
/**
 * Прогон одной статьи через 4-стадийный конвейер со снимком каждой стадии.
 *
 * Одноразовый инструмент анализа «что даёт каждая стадия»: сохраняет draft
 * после main/editor/fix и список замечаний review, затем по команде apply
 * вписывает снимок выбранной стадии в src/i18n/<lang>/ — чтобы можно было
 * зафиксировать вклад стадий отдельными коммитами.
 *
 *   bun scripts/qa/stage-run.ts story --key balance --out /tmp/stage-run          # прогон
 *   bun scripts/qa/stage-run.ts breathing.json --key balance --out /tmp/stage-run \
 *       --apply main            # вписать снимок стадии в файлы локалей
 *   bun scripts/qa/stage-run.ts breathing.json --key balance --out /tmp/stage-run \
 *       --langs de,ja           # подмножество локалей
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseCli } from '../lib/cli.js';
import { LANG_NAMES, normalizeLangCode } from '../lib/lang-codes.js';
import {
  VllmClient,
  buildStagePrompts,
  runPipeline,
  mergeSubset,
  type CaptureStage,
} from '../lib/pipeline.js';
import { flattenLeaves } from '../lib/tree.js';
import { validateTranslation, type ValidationIssue } from '../lib/validation.js';
import { writeJsonAtomic, readJsonOr } from '../lib/atomic-fs.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

interface Args {
  relFile: string;
  key: string;
  outDir: string;
  langs: string[] | null;
  apply: string | null;
  endpoint: string;
  model: string;
}

function parseArgs(): Args {
  const { flags, positional } = parseCli();
  const relFile = (positional[0] ?? flags.file ?? '') as string;
  if (!relFile) {
    console.error('❌ Укажите файл внутри src/i18n/ru и ключ: --key balance --out <dir>');
    process.exit(2);
  }
  const key = (flags.key ?? '') as string;
  if (!key) {
    console.error('❌ Укажите ключ статьи: --key <имя> (переводится только этот поддерев).');
    process.exit(2);
  }
  return {
    relFile,
    key,
    outDir: (flags.out as string) ?? path.join('/tmp', 'stage-run'),
    langs: flags.langs
      ? (flags.langs as string).split(',').map((l) => normalizeLangCode(l)).filter(Boolean)
      : null,
    apply: (flags.apply as string) ?? null,
    endpoint: (flags.endpoint as string) ?? 'http://127.0.0.1:8000/v1',
    model: (flags.model as string) ?? 'google/gemma-4-26B-A4B-it',
  };
}

interface LangMeta {
  lang: string;
  timings: Record<string, number>;
  reviewIssues: number;
  fixRan: boolean;
  attempts: number;
}

/** Канонические 18 локалей из конфига раннера (targetLocales: null). */
const ALL_LANGS = [
  'ar', 'cs', 'de', 'en', 'es', 'fr', 'he', 'id', 'it',
  'ja', 'ko', 'nl', 'pl', 'pt_BR', 'pt', 'sv', 'tr', 'uk',
];

function stageFile(outDir: string, stage: CaptureStage | 'final', lang: string): string {
  return path.join(outDir, stage, `${lang}.json`);
}

async function loadPayload(relFile: string, key: string): Promise<any> {
  const ru = await readJsonOr<any>(path.join(ROOT, 'src', 'i18n', 'ru', relFile), null);
  if (ru == null || typeof ru !== 'object') {
    console.error(`❌ Не удалось прочитать src/i18n/ru/${relFile}`);
    process.exit(2);
  }
  const payload = key === '.' ? ru : ru[key];
  if (payload == null || typeof payload !== 'object') {
    console.error(`❌ В src/i18n/ru/${relFile} нет ключа «${key}».`);
    process.exit(2);
  }
  return payload;
}

async function runMode(args: Args): Promise<number> {
  const payload = await loadPayload(args.relFile, args.key);
  const sentLeaves = flattenLeaves(payload);
  console.log(
    `📄 src/i18n/ru/${args.relFile} #${args.key}: листьев ${Object.keys(sentLeaves).length}`,
  );
  console.log(`🔧 ${args.endpoint} (${args.model})`);

  const client = new VllmClient(args.endpoint, args.model, 600_000);
  await client.preflight();
  console.log('✅ Модель доступна.');

  const langs = args.langs ?? ALL_LANGS;
  const meta: LangMeta[] = [];
  let failures = 0;

  for (const lang of langs) {
    const lc = lang.toLowerCase();
    console.log(`\n🌐 ${lang} (${LANG_NAMES[lang] ?? lang})`);
    const prompts = await buildStagePrompts('text', lc, {
      glossaryPath: path.join(ROOT, 'scripts', 'prompts', lc, 'glossary.json'),
    });

    let ok = false;
    for (let attempt = 1; attempt <= 2 && !ok; attempt++) {
      if (attempt > 1) console.log('   🔁 Попытка 2/2 (jsonMode для main)...');
      try {
        const snapshots: Partial<Record<CaptureStage, any>> = {};
        const { data, timings } = await runPipeline(client, prompts, payload, lang, {
          sourceLocale: 'ru',
          jsonModeMain: attempt > 1,
          capture: (stage, snap) => {
            snapshots[stage] = snap;
          },
        });

        const issues: ValidationIssue[] = validateTranslation(lang, sentLeaves, data);
        if (issues.length > 0) {
          console.warn(`   ❌ Валидация не пройдена (попытка ${attempt}):`);
          for (const { path: p, message } of issues.slice(0, 10)) console.warn(`      [${p}] ${message}`);
          throw new Error(`validation: ${issues.length} проблем`);
        }

        await writeJsonAtomic(stageFile(args.outDir, 'main', lang), snapshots.main);
        await writeJsonAtomic(stageFile(args.outDir, 'editor', lang), snapshots.editor);
        await writeJsonAtomic(stageFile(args.outDir, 'review', lang), snapshots.review ?? { issues: [] });
        await writeJsonAtomic(stageFile(args.outDir, 'final', lang), data);
        const reviewIssues = (snapshots.review?.issues as unknown[] | undefined)?.length ?? 0;
        meta.push({
          lang,
          timings: timings as unknown as Record<string, number>,
          reviewIssues,
          fixRan: timings.fix != null,
          attempts: attempt,
        });
        const t = timings as unknown as Record<string, number>;
        console.log(
          `   ⏱ main=${(t.main / 1000).toFixed(0)}s editor=${(t.editor / 1000).toFixed(0)}s` +
            ` review=${((t.review ?? 0) / 1000).toFixed(0)}s` +
            (t.fix != null ? ` fix=${(t.fix / 1000).toFixed(0)}s` : ' (fix пропущен)') +
            ` | замечаний ревью: ${reviewIssues}`,
        );
        ok = true;
      } catch (e: any) {
        console.warn(`   ⚠️ ${lang} попытка ${attempt}: ${e?.message ?? e}`);
        if (attempt === 2) {
          console.error(`   🛑 ${lang}: провалено.`);
          failures++;
        }
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
  }

  await fs.mkdir(args.outDir, { recursive: true });
  await writeJsonAtomic(path.join(args.outDir, 'meta.json'), {
    file: args.relFile,
    key: args.key,
    endpoint: args.endpoint,
    model: args.model,
    langs: meta,
  });
  await client.close?.();
  console.log(`\n📊 Готово: ${meta.length}/${langs.length} локалей, провалов ${failures}. Снимки: ${args.outDir}`);
  return failures > 0 ? 1 : 0;
}

/** Вписывает снимок стадии в src/i18n/<lang>/<file> с валидацией перед записью. */
async function applyMode(args: Args, stage: string): Promise<number> {
  if (!['main', 'editor', 'final'].includes(stage)) {
    console.error('❌ --apply принимает main | editor | final.');
    return 2;
  }
  const payload = await loadPayload(args.relFile, args.key);
  const sentLeaves = flattenLeaves(payload);
  const langs = args.langs ?? ALL_LANGS;
  let failures = 0;

  for (const lang of langs) {
    const snapshot = await readJsonOr<any>(stageFile(args.outDir, stage as any, lang), null);
    if (snapshot == null) {
      console.error(`❌ Нет снимка ${stage} для ${lang} в ${args.outDir}`);
      failures++;
      continue;
    }
    const targetPath = path.join(ROOT, 'src', 'i18n', lang.toLowerCase(), args.relFile);
    const target = await readJsonOr<any>(targetPath, null);
    if (target == null) {
      console.error(`❌ Нет файла ${targetPath}`);
      failures++;
      continue;
    }
    const merged = mergeSubset(target[args.key], snapshot, `apply:${stage}`);
    const issues = validateTranslation(lang, sentLeaves, merged);
    if (issues.length > 0) {
      console.error(`❌ ${lang}: валидация снимка ${stage} не пройдена — файл не тронут.`);
      for (const { path: p, message } of issues.slice(0, 10)) console.error(`   [${p}] ${message}`);
      failures++;
      continue;
    }
    target[args.key] = merged;
    await writeJsonAtomic(targetPath, target);
    console.log(`   💾 ${lang}: ${stage} → ${path.relative(ROOT, targetPath)}`);
  }
  return failures > 0 ? 1 : 0;
}

async function main(): Promise<number> {
  const args = parseArgs();
  if (args.apply) return applyMode(args, args.apply);
  return runMode(args);
}

process.exitCode = await main();
