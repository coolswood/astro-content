#!/usr/bin/env bun
/**
 * Канонизация медиа-путей в src/i18n/<lang>/stories.json:
 *   - картинки (img): языковой сегмент — ru → ru, все остальные языки → en;
 *   - видео (video): существуют ТОЛЬКО для ru — в остальных локалях
 *     видео-поля выпиливаются (файлов en-видео не существует).
 * Без флага --apply — только отчёт. Правило: см. scripts/lib/media-paths.ts.
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_TARGET_LANGS, normalizeLangCode } from './lib/lang-codes.js';
import {
  expectedMediaPath,
  isMediaPath,
  isVideoPath,
} from './lib/media-paths.js';
import { flattenLeaves, removeLeaves } from './lib/tree.js';
import { writeJsonAtomic } from './lib/atomic-fs.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apply = process.argv.includes('--apply');

let touched = 0;
// ru проверяем тоже: сегменты пути должны быть ru (картинки и видео).
for (const lang of ['ru', ...ALL_TARGET_LANGS]) {
  const isRu = lang === 'ru';
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
  // Имя каталога соотносится с кодом языка как en→en, pt_br→pt_BR.
  const langCode = dir === 'pt_br' ? 'pt_BR' : dir;
  const leaves = flattenLeaves(data);
  const fixes: Record<string, string> = {};
  const stripVideos: string[] = [];
  for (const [p, value] of Object.entries(leaves)) {
    if (!isMediaPath(value)) continue;
    if (isVideoPath(value)) {
      // Видео легитимны только в ru; там же канонизируем сегмент (ru → ru).
      const expected = expectedMediaPath(value, langCode);
      if (isRu) {
        if (value !== expected) fixes[p.replace(/^\//, '')] = expected;
      } else {
        stripVideos.push(p.replace(/^\//, ''));
      }
    } else {
      const expected = expectedMediaPath(value, langCode);
      if (value !== expected) fixes[p.replace(/^\//, '')] = expected;
    }
  }
  if (Object.keys(fixes).length === 0 && stripVideos.length === 0) {
    console.log(`✅ ${rel}: медиа-пути в норме`);
    continue;
  }
  touched++;
  for (const [p, expected] of Object.entries(fixes)) {
    console.log(`   ${p}: ${leaves['/' + p]} → ${expected}`);
  }
  for (const p of stripVideos) console.log(`   ${p}: видео-поле выпилить (видео только для ru)`);
  if (apply) {
    const target = structuredClone(data);
    if (stripVideos.length > 0) removeLeaves(target, stripVideos);
    const set = (obj: any, parts: string[], value: string): void => {
      let cur = obj;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]!] ?? (cur[parts[i]!] = {});
      cur[parts[parts.length - 1]!] = value;
    };
    for (const [p, expected] of Object.entries(fixes)) set(target, p.split('/'), expected);
    await writeJsonAtomic(abs, target);
    console.log(
      `🛠  ${rel}: исправлено путей ${Object.keys(fixes).length}, выпилено видео-полей ${stripVideos.length}`,
    );
  } else {
    console.log(
      `ℹ️  ${rel}: требуется правок ${Object.keys(fixes).length} + видео-полей к выпилению ${stripVideos.length} (запуск с --apply)`,
    );
  }
}
if (!apply && touched > 0) process.exit(1);
