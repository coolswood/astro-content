#!/usr/bin/env bun
/**
 * Анализ снимков стадий из scripts/qa/stage-run.ts: сколько текста меняет
 * каждая стадия, сколько замечаний даёт review, сколько времени ест.
 *
 *   bun scripts/qa/stage-report.ts /tmp/stage-run
 */
import fs from 'fs/promises';
import path from 'path';

const outDir = process.argv[2] ?? '/tmp/stage-run';

interface LangMeta {
  lang: string;
  timings: Record<string, number>;
  reviewIssues: number;
  fixRan: boolean;
  attempts: number;
}

function flattenAll(o: any, p = ''): Record<string, string> {
  const out: Record<string, string> = {};
  if (Array.isArray(o)) {
    o.forEach((v, i) => Object.assign(out, flattenAll(v, `${p}/${i}`)));
  } else if (o && typeof o === 'object') {
    for (const k of Object.keys(o)) Object.assign(out, flattenAll(o[k], `${p}/${k}`));
  } else if (p) out[p] = String(o ?? '');
  return out;
}

/** Суммарная длина изменённых фрагментов (новое + старое) /2 — «объём правки». */
function diffChars(a: Record<string, string>, b: Record<string, string>): { keys: number; chars: number } {
  let keys = 0;
  let chars = 0;
  for (const k of Object.keys(b)) {
    if (a[k] !== b[k]) {
      keys++;
      chars += (Math.abs((a[k]?.length ?? 0) - (b[k]?.length ?? 0)) + Math.min(a[k]?.length ?? 0, b[k]?.length ?? 0)) / 2;
    }
  }
  return { keys, chars };
}

async function readJson(p: string): Promise<any> {
  try {
    return JSON.parse(await fs.readFile(p, 'utf8'));
  } catch {
    return null;
  }
}

const meta: { langs: LangMeta[] } = JSON.parse(await fs.readFile(path.join(outDir, 'meta.json'), 'utf8'));

const rows: string[] = [];
let tMain = 0, tEditor = 0, tReview = 0, tFix = 0;
let sumEditorKeys = 0, sumEditorChars = 0, sumFixKeys = 0, sumFixChars = 0, sumIssues = 0;
let editorNoop = 0, fixSkipped = 0, reviewClean = 0;

for (const m of meta.langs) {
  const main = await readJson(path.join(outDir, 'main', `${m.lang}.json`));
  const editor = await readJson(path.join(outDir, 'editor', `${m.lang}.json`));
  const final = await readJson(path.join(outDir, 'final', `${m.lang}.json`));
  if (!main || !final) continue;
  const fMain = flattenAll(main);
  const fEditor = flattenAll(editor ?? main);
  const fFinal = flattenAll(final);
  const dEditor = diffChars(fMain, fEditor);
  const dFix = diffChars(fEditor, fFinal);
  tMain += m.timings.main ?? 0;
  tEditor += m.timings.editor ?? 0;
  tReview += m.timings.review ?? 0;
  tFix += m.timings.fix ?? 0;
  sumEditorKeys += dEditor.keys;
  sumEditorChars += dEditor.chars;
  sumFixKeys += dFix.keys;
  sumFixChars += dFix.chars;
  sumIssues += m.reviewIssues;
  if (dEditor.keys === 0) editorNoop++;
  if (!m.fixRan) fixSkipped++;
  if (m.reviewIssues === 0) reviewClean++;
  rows.push(
    `${m.lang.padEnd(6)} main=${((m.timings.main ?? 0) / 1000).toFixed(0).padStart(3)}s ` +
      `editor=${((m.timings.editor ?? 0) / 1000).toFixed(0).padStart(3)}s ` +
      `review=${((m.timings.review ?? 0) / 1000).toFixed(0).padStart(3)}s ` +
      `fix=${m.fixRan ? ((m.timings.fix ?? 0) / 1000).toFixed(0).padStart(3) + 's' : '  --'} | ` +
      `правок editor: ${String(dEditor.keys).padStart(2)} лис./${String(Math.round(dEditor.chars)).padStart(4)} зн. ` +
      `| замечаний: ${String(m.reviewIssues).padStart(2)} | правок fix: ${String(dFix.keys).padStart(2)} лис./${String(Math.round(dFix.chars)).padStart(4)} зн.`,
  );
}

console.log(rows.join('\n'));
const n = meta.langs.length;
console.log(`\n📊 ИТОГО (${n} локалей):`);
console.log(`   Время: main=${(tMain / 1000).toFixed(0)}s editor=${(tEditor / 1000).toFixed(0)}s review=${(tReview / 1000).toFixed(0)}s fix=${(tFix / 1000).toFixed(0)}s`);
console.log(`   EDITOR: изменил листьев ${sumEditorKeys} (${Math.round(sumEditorChars)} зн.), no-op в ${editorNoop}/${n} локалях`);
console.log(`   REVIEW: замечаний ${sumIssues}, чисто в ${reviewClean}/${n} локалях`);
console.log(`   FIX: изменил листьев ${sumFixKeys} (${Math.round(sumFixChars)} зн.), пропущен в ${fixSkipped}/${n} локалях`);
