/**
 * Защита медиа-путей от перевода: файлы картинок и видео существуют только
 * для en и ru (stories.json: поля img/video, формат «<секция>/<lang>/<файл>»),
 * поэтому во всех языках, кроме ru, языковой сегмент пути обязан быть «en».
 *
 * Три уровня обороны:
 *   1. Промпт (prompts/base/fragments/common.txt) — просим модель не трогать пути.
 *   2. restoreMediaPaths() в раннере — детерминированная починка ответа модели.
 *   3. validateTranslation() — лист с изменённым путём не проходит валидацию
 *      (в т.ч. правки коллегии в judge.ts).
 */

import { normalizeLangCode } from './lang-codes.js';
import { applyLeaves, flattenLeaves, type Leaves } from './tree.js';

/**
 * Языковой сегмент пути, на который должны ссылаться переводы.
 * ru продолжает ссылаться на ru-медиа; все остальные языки — на en
 * (локализованных медиа для них не существует).
 */
export function mediaLocaleFor(lang: string): string {
  return normalizeLangCode(lang) === 'ru' ? 'ru' : 'en';
}

/** Известные коды языков для распознавания языкового сегмента в пути. */
const LANG_SEGMENTS = new Set([
  'ar', 'cs', 'de', 'en', 'es', 'fr', 'he', 'id', 'it', 'ja',
  'ko', 'nl', 'pl', 'pt', 'pt_br', 'pt-br', 'ru', 'sv', 'tr', 'uk',
]);

/** Расширения медиафайлов, на которые ссылаются пути в контенте. */
const MEDIA_EXT = 'png|jpe?g|webp|gif|mp4|mov|m4v|svg|m4a|mp3|wav|ogg|aac';

/**
 * Похожа ли строка на медиа-путь («activity/ru/s1.png», «audio/story/ru/intro.mp3»):
 * сегменты без пробелов и с медиа-расширением в конце.
 */
export function isMediaPath(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const s = value.trim();
  if (!s || /\s/.test(s)) return false;
  return new RegExp(`^[A-Za-z0-9_\\-]+(?:/[A-Za-z0-9_\\-]+)+\\.(${MEDIA_EXT})$`, 'i').test(s);
}

/**
 * Канонический путь для целевого языка: языковой сегмент (если есть) заменяется
 * на mediaLocaleFor(lang), остальное не меняется. Незнакомые пути (без языкового
 * сегмента) возвращаются как есть.
 */
export function expectedMediaPath(value: string, lang: string): string {
  const mediaLocale = mediaLocaleFor(lang);
  return value
    .split('/')
    .map((seg) => (LANG_SEGMENTS.has(seg.toLowerCase()) ? mediaLocale : seg))
    .join('/');
}

/**
 * Восстанавливает медиа-пути в результате конвейера: любой лист, чей ru-оригинал —
 * медиа-путь, принудительно получает каноническое значение (модель могла
 * «перевести» имя файла, заменить ru на свой язык или испортить расширение).
 * Работает и с деревом, и с плоской картой (mutирует translated).
 * Возвращает список исправленных путей листьев (для лога).
 */
export function restoreMediaPaths(
  lang: string,
  ruLeaves: Record<string, unknown>,
  translated: unknown,
): string[] {
  // Ключи flattenLeaves — с ведущим слэшем; сверяемся по «голым» путям
  // (sentLeaves/ключи UI-режима приходят без него).
  const flatRaw: Leaves = flattenLeaves(translated);
  const flat: Leaves = {};
  for (const k of Object.keys(flatRaw)) flat[k.replace(/^\//, '')] = flatRaw[k]!;
  const fixed: Leaves = {};
  for (const [p, ruValue] of Object.entries(ruLeaves)) {
    if (!isMediaPath(ruValue)) continue;
    const expected = expectedMediaPath(ruValue, lang);
    const bare = p.replace(/^\//, '');
    if (flat[bare] !== expected) {
      fixed[bare] = expected;
    }
  }
  const fixedPaths = Object.keys(fixed);
  if (fixedPaths.length > 0) {
    const obj = translated as Record<string, unknown>;
    for (const bare of fixedPaths) {
      const slashed = '/' + bare;
      if (slashed in obj) obj[slashed] = fixed[bare]!;
      else if (bare in obj) obj[bare] = fixed[bare]!;
      // Плоская карта «путь → значение»: ключи-строки с путями мутируем
      // напрямую; иначе (дерево ответа модели) — по путям.
      else applyLeaves(translated, { [bare]: fixed[bare]! });
    }
  }
  return fixedPaths;
}
