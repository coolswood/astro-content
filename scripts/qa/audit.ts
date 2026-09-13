#!/usr/bin/env bun
/**
 * Аудит перевода: коллегия с циклом сходимости (CLI над scripts/lib/judge.ts).
 *
 *   bun scripts/qa/audit.ts breathing.json --key balance --langs de,ar
 *   bun scripts/qa/audit.ts breathing.json --key balance --langs de,ar --apply
 *   bun scripts/qa/audit.ts story/start.json --langs de --label после-правок
 *
 * Стадии (каждая — отдельный json-запрос, промпты base/qa/audit_*.txt):
 *   1. issues     — построчный scan + все замечания к переводу;
 *   2. deliberate — перекрёстная сверка замечаний между собой и с оригиналом:
 *                   confirmed / merged (дубли) / rejected (ложные) + ранжирование;
 *   3. recommend  — сравнение вариантов решений и выбор лучшего + вердикт.
 *
 * С --apply подтверждённые рекомендации вписываются в файлы локалей, и
 * локаль судится заново — до раунда без правок (не более --rounds, по
 * умолчанию 3). Без --apply — один раунд, только отчёт.
 *
 * Отчёт: scripts/qa/reports/<ts>-audit-<label>/{report.json,report.md}.
 */
import path from 'path';
import { fileURLToPath } from 'url';
import { parseCli } from '../lib/cli.js';
import { normalizeLangCode } from '../lib/lang-codes.js';
import { VllmClient } from '../lib/pipeline.js';
import { flattenLeaves } from '../lib/tree.js';
import { judgeFile } from '../lib/judge.js';
import { readJsonOr } from '../lib/atomic-fs.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

interface Args {
  relFile: string;
  key: string | null;
  langs: string[];
  label: string;
  endpoint: string;
  model: string;
  apply: boolean;
  rounds: number;
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
    rounds: parseInt((flags.rounds as string) ?? '3', 10) || 3,
  };
}

async function main(): Promise<number> {
  const args = await loadArgs();
  console.log(
    `🕵️ Аудит: src/i18n/ru/${args.relFile}${args.key ? `#${args.key}` : ''} · локали: ${args.langs.join(', ')}` +
      `${args.apply ? ` · С КОРРЕКТИРОВКОЙ (--apply, до ${args.rounds} раундов)` : ''}`,
  );
  console.log(`🔧 ${args.endpoint} (${args.model})`);

  const client = new VllmClient(args.endpoint, args.model, 600_000, 10);
  await client.preflight();
  console.log('✅ Модель доступна.');

  const ru = await readJsonOr<any>(path.join(ROOT, 'src', 'i18n', 'ru', args.relFile), null);
  if (ru == null) {
    console.error(`❌ Не читается src/i18n/ru/${args.relFile}`);
    return 2;
  }
  const allPaths = Object.keys(flattenLeaves(ru));
  const paths = args.key ? allPaths.filter((p) => p === `/${args.key}` || p.startsWith(`/${args.key}/`)) : allPaths;
  if (paths.length === 0) {
    console.error(`❌ Пустой набор листьев (ключ «${args.key}»?)`);
    return 2;
  }

  const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const results = await judgeFile({
    client,
    relFile: args.relFile,
    ruJson: ru,
    perLang: Object.fromEntries(args.langs.map((l) => [l, paths])),
    apply: args.apply,
    maxRounds: args.apply ? args.rounds : 1,
    reportDir: path.join('scripts', 'qa', 'reports', `${stamp}-audit-${args.label}`),
  });

  await client.close?.();
  const failed = results.filter((r) => r.rounds.length === 0).length;
  return failed > 0 ? 1 : 0;
}

process.exitCode = await main();
