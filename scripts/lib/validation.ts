/**
 * Валидация переведённого JSON против ru-источника:
 *   1. Полное совпадение ключей (плоские пути, объекты и массивы).
 *   2. Пустые значения запрещены (правило common.txt).
 *   3. Плейсхолдеры {…} — мультимножество имён на каждый лист
 *      ({days}, ICU {count, plural, ...}).
 *   4. Теги <b>/<q>/<important>/<instagram> — мультимножество имён
 *      открывающих/закрывающих НА УРОВНЕ ФАЙЛА (пул всех листьев).
 *      Транскреация может перестраивать фразы и смещать тег в соседний
 *      элемент — это не ошибка; ошибка — потерять, задублировать или
 *      выдумать тег. Атрибуты НЕ сверяются: по конвенции проекта
 *      <instagram ids="..."> нормализуется до <instagram>, а
 *      <q author="..."> локализует имя автора.
 *   5. «Чужие» алфавиты — SCRIPT_MAP из lang-codes.ts.
 *   6. Дубли текста: пара разных ru-оригиналов не должна схлопываться
 *      в переводе в одинаковую строку (детект «крючков» — подмены
 *      элемента дублем фразы из другого места файла).
 */
import { flattenLeaves, type Leaves } from './tree.js';
import { validateValue } from './lang-codes.js';

export interface ValidationIssue {
  path: string;
  message: string;
}

/** Имена плейсхолдеров: {days}, {count, plural, ...} → ["days"], ["count"]. */
export function extractPlaceholderNames(value: string): string[] {
  const names: string[] = [];
  const re = /\{([a-zA-Z_][a-zA-Z0-9_]*)(?:\s*,)?/g;
  let m;
  while ((m = re.exec(value)) !== null) names.push(m[1]);
  return names;
}

/**
 * ICU-конструкции «{name, plural|select|selectordinal, …}» → ["count:plural"].
 * Категории множественного числа легитимно различаются между языками (CLDR:
 * у ja/ko только other, у ar шесть категорий), поэтому сверяется наличие
 * конструкции, а не её категорий.
 */
export function extractIcuConstructs(value: string): string[] {
  const out: string[] = [];
  const re = /\{([a-zA-Z_][a-zA-Z0-9_]*)\s*,\s*(plural|select|selectordinal)\s*,/g;
  let m;
  while ((m = re.exec(value)) !== null) out.push(`${m[1]}:${m[2]}`);
  return out;
}

const TAG_RE = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^<>]*)?)>/g;

/** Теги листа: массив вида ["<b", "</b", "<q", ...] (открывающие/закрывающие отдельно). */
export function extractTagSignatures(value: string): string[] {
  const sigs: string[] = [];
  let m: RegExpExecArray | null;
  TAG_RE.lastIndex = 0;
  while ((m = TAG_RE.exec(value)) !== null) {
    sigs.push(`${m[1] ? '/' : ''}${m[2].toLowerCase()}`);
  }
  return sigs;
}

function multisetEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const counts = new Map<string, number>();
  for (const x of a) counts.set(x, (counts.get(x) ?? 0) + 1);
  for (const x of b) {
    const c = counts.get(x) ?? 0;
    if (c === 0) return false;
    counts.set(x, c - 1);
  }
  return true;
}

function diffMultiset(a: string[], b: string[]): string[] {
  // Что есть в a и отсутствует в b (для сообщений).
  const counts = new Map<string, number>();
  for (const x of b) counts.set(x, (counts.get(x) ?? 0) + 1);
  const lost: string[] = [];
  for (const x of a) {
    const c = counts.get(x) ?? 0;
    if (c === 0) lost.push(x);
    else counts.set(x, c - 1);
  }
  return lost;
}

/**
 * Валидирует переведённый объект против ru-листьев. Возвращает список проблем
 * (пустой = всё хорошо). Ожидается, что вызывающий уже снял обёртку
 * ({lang: {...}} для keys-режима) и @-мета.
 */
export function validateTranslation(
  lang: string,
  ruLeaves: Leaves,
  translated: any,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  // Пути сравниваются без ведущего слэша: UI-режим кладёт в ruLeaves «сырые»
  // ключи ARB (без слэша), flattenLeaves выдаёт пути со слэшем.
  const norm = (m: Leaves): Leaves => {
    const out: Leaves = {};
    for (const k of Object.keys(m)) out[k.replace(/^\//, '')] = m[k];
    return out;
  };
  const ru = norm(ruLeaves);
  const outLeaves = norm(flattenLeaves(translated));

  // 1. Совпадение ключей.
  const ruPaths = Object.keys(ru);
  const outPaths = Object.keys(outLeaves);
  const outSet = new Set(outPaths);
  const lostKeys = ruPaths.filter((p) => !outSet.has(p));
  if (lostKeys.length > 0) {
    issues.push({ path: '(файл)', message: `потеряны ключи: ${lostKeys.slice(0, 8).join(', ')}` });
  }
  const extraKeys = outPaths.filter((p) => !(p in ru));
  if (extraKeys.length > 0) {
    issues.push({ path: '(файл)', message: `лишние ключи: ${extraKeys.slice(0, 8).join(', ')}` });
  }

  for (const p of ruPaths) {
    const translatedValue = outLeaves[p];
    if (translatedValue === undefined) continue; // уже отрапортовано выше

    // 2. Пустые значения.
    if (typeof translatedValue !== 'string' || translatedValue.trim() === '') {
      issues.push({ path: p, message: 'пустое или нестроковое значение' });
      continue;
    }

    // 3. Плейсхолдеры: сравниваются МНОЖЕСТВА имён (ICU-категории различаются
    // по языкам, поэтому количество вхождений одного имени не фиксировано).
    const expectedPh = new Set(extractPlaceholderNames(ru[p]));
    const gotPh = new Set(extractPlaceholderNames(translatedValue));
    const lostPh = [...expectedPh].filter((n) => !gotPh.has(n));
    const extraPh = [...gotPh].filter((n) => !expectedPh.has(n));
    const expectedIcu = extractIcuConstructs(ru[p]);
    const gotIcu = new Set(extractIcuConstructs(translatedValue));
    const lostIcu = expectedIcu.filter((c) => !gotIcu.has(c));
    if (lostPh.length > 0 || extraPh.length > 0 || lostIcu.length > 0) {
      const parts: string[] = [];
      if (lostPh.length) parts.push(`потеряны: {${lostPh.join(', {')}}`);
      if (extraPh.length) parts.push(`лишние: {${extraPh.join(', {')}}`);
      if (lostIcu.length)
        parts.push(`потеряны ICU-конструкции: ${lostIcu.map((c) => c.replace(':', ', ')).join('; ')}`);
      issues.push({ path: p, message: `плейсхолдеры — ${parts.join('; ')}` });
    }

    // 4. Теги сверяются на уровне файла (см. п.6) — по-листово только алфавит.
    const scriptErrors = validateValue(translatedValue, lang);
    if (scriptErrors.length > 0) {
      issues.push({
        path: p,
        message: `чужие символы/слова: ${[...new Set(scriptErrors)].slice(0, 5).join(', ')}`,
      });
    }
  }

  // 6. Теги — файловый уровень: пул тегов всех листьев перевода должен
  // совпасть с оригиналом. Смещение тега в соседний элемент при
  // переструктурировании текста — норма транскреации; потеря, дубль
  // или выдуманный тег — ошибка.
  const expectedTags: string[] = [];
  const gotTags: string[] = [];
  for (const p of ruPaths) {
    expectedTags.push(...extractTagSignatures(ru[p]));
    const v = outLeaves[p];
    if (typeof v === 'string' && v.trim() !== '') gotTags.push(...extractTagSignatures(v));
  }
  if (!multisetEqual(expectedTags, gotTags)) {
    const lost = diffMultiset(expectedTags, gotTags);
    const extra = diffMultiset(gotTags, expectedTags);
    const parts: string[] = [];
    // Подсказка, в каких листьях избыток/нехватка — упрощает разбор прогона.
    const suspect = (want: string[], mode: 'lost' | 'extra'): string[] => {
      const out: string[] = [];
      for (const p of ruPaths) {
        const lv = outLeaves[p];
        if (typeof lv !== 'string' || lv.trim() === '') continue;
        const ruTags = extractTagSignatures(ru[p]);
        const outTagList = extractTagSignatures(lv);
        const leafDiff =
          mode === 'lost' ? diffMultiset(ruTags, outTagList) : diffMultiset(outTagList, ruTags);
        if (leafDiff.some((t) => want.includes(t))) out.push(p);
      }
      return out.slice(0, 3);
    };
    if (lost.length) {
      const where = suspect(lost, 'lost');
      parts.push(`потеряны: ${lost.map((t) => `<${t}>`).join(' ')}${where.length ? ` (нет в: ${where.join(', ')})` : ''}`);
    }
    if (extra.length) {
      const where = suspect(extra, 'extra');
      parts.push(`лишние: ${extra.map((t) => `<${t}>`).join(' ')}${where.length ? ` (напр. в: ${where.join(', ')})` : ''}`);
    }
    issues.push({ path: '(файл)', message: `теги — ${parts.join('; ')}` });
  }

  // 7. Дубли текста: два РАЗНЫХ оригинала не должны схлопываться в переводе
  // в одинаковый текст. Ловит «крючки» — подмену элемента (обычно первого в
  // массиве) дублем фразы из другого места того же файла. Легитимные повторы
  // (оригинал и так повторяет одну фразу) не флагуются: сравниваются пары
  // путей, а не тексты разных языков между собой.
  const normText = (s: string): string =>
    s
      .replace(TAG_RE, '')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]/gu, '');
  const byNormText = new Map<string, string[]>();
  for (const p of ruPaths) {
    const v = outLeaves[p];
    if (typeof v !== 'string' || v.trim() === '') continue;
    const n = normText(v);
    if (n.length < 20) continue; // короткие строки (лейблы) — шум
    const list = byNormText.get(n) ?? [];
    list.push(p);
    byNormText.set(n, list);
  }
  for (const [n, paths] of byNormText) {
    if (paths.length < 2) continue;
    const ruNorms = new Set(paths.map((p) => normText(ru[p] ?? '')));
    if (ruNorms.size > 1) {
      issues.push({
        path: '(файл)',
        message: `дубль перевода при разных оригиналах (${paths.slice(0, 3).join(', ')}): «${n.slice(0, 40)}…»`,
      });
    }
  }

  return issues;
}
