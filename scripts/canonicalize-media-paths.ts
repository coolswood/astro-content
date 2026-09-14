#!/usr/bin/env bun
/**
 * Канонизация медиа-путей в src/i18n/<lang>/stories.json: сегмент языка
 * в путях img/video приводится к канону (ru → ru, все остальные → en).
 * Без флага --apply — только отчёт. Правило: см. scripts/lib/media-paths.ts.
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_TARGET_LANGS, normalizeLangCode } from './lib/lang-codes.js';
import { expectedMediaPath, isMediaPath } from './lib/media-paths.js';
import { flattenLeaves } from './lib/tree.js';
import { writeJsonAtomic } from './lib/atomic-fs.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apply = process.argv.includes('--apply');

let touched = 0;
for (const lang of ALL_TARGET_LANGS) {
  const dir = normalizeLangCode(lang).toLowerCase(); // pt_BR → pt_br (имя каталога)
  const rel = path.join('src', 'i18n', dir, 'stories.json');
  const abs = path.join(ROOT, rel);
  const data = await fs.readFile(abs, 'utf-8').then(
    (t) => JSON.parse(t),
    () => null,
  );
  if (data == null) {
    console.log(`⚠️  ${rel}: нет файла — пропуск`);
    continue;
  }
  const leaves = flattenLeaves(data);
  const fixes: Record<string, string> = {};
  for (const [p, value] of Object.entries(leaves)) {
    if (!isMediaPath(value)) continue;
    // Имя каталога соотносится с кодом языка как en→en, pt_br→pt_BR.
    const langCode = dir === 'pt_br' ? 'pt_BR' : dir;
    const expected = expectedMediaPath(value, langCode);
    if (value !== expected) fixes[p.replace(/^\//, '')] = expected;
  }
  if (Object.keys(fixes).length === 0) {
    console.log(`✅ ${rel}: пути в норме`);
    continue;
  }
  touched++;
  for (const [p, expected] of Object.entries(fixes)) {
    console.log(`   ${p}: ${leaves['/' + p]} → ${expected}`);
  }
  if (apply) {
    const target = structuredClone(data);
    const set = (obj: any, parts: string[], value: string): void => {
      let cur = obj;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]!] ?? (cur[parts[i]!] = {});
      cur[parts[parts.length - 1]!] = value;
    };
    for (const [p, expected] of Object.entries(fixes)) set(target, p.split('/'), expected);
    await writeJsonAtomic(abs, target);
    console.log(`🛠  ${rel}: исправлено ${Object.keys(fixes).length} путей`);
  } else {
    console.log(`ℹ️  ${rel}: требуется ${Object.keys(fixes).length} правок (запуск с --apply)`);
  }
}
if (!apply && touched > 0) process.exit(1);
