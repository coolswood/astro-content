/**
 * Детерминированная согласованность тегов перевода с оригиналом.
 *
 * Политика гибкости: тег может СМЕСТИТЬСЯ в другой элемент (пул тегов файла
 * при этом не меняется) — это норма транскреации и она не корректируется.
 * Корректируется только ИЗБЫТОК: если модель выдумала теги (пул перевода
 * больше пула оригинала), лишние вхождения срезаются с сохранением
 * содержимого (обёртка `<q>…</q>` раскрывается в текст), причём не больше
 * глобального избытка — перемещённые теги гарантированно не затрагиваются.
 * Нехватка тегов механически не восстанавливается — её ловит валидация
 * с ретраями.
 */
import { flattenLeaves, type Leaves } from './tree.js';

export interface StripRecord {
  path: string;
  tag: string;
  count: number;
}

const TAG_RE = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^<>]*)?)>/g;

/** Сигнатуры тегов строки: "<b", "</b", "<q", ... (регистр имени нормализован). */
export function tagSignatures(value: string): string[] {
  return [...value.matchAll(TAG_RE)].map((m) => `${m[1] ? '/' : ''}${m[2].toLowerCase()}`);
}

/** Мультимножество a минус b: что есть в a и отсутствует/в недостатке в b. */
export function diffTagMultiset(a: string[], b: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const x of a) counts.set(x, (counts.get(x) ?? 0) + 1);
  for (const x of b) {
    const c = counts.get(x) ?? 0;
    if (c > 0) counts.set(x, c - 1);
  }
  for (const [k, v] of counts) if (v <= 0) counts.delete(k);
  return counts;
}

function decrement(map: Map<string, number>, key: string): void {
  const v = (map.get(key) ?? 0) - 1;
  if (v > 0) map.set(key, v);
  else map.delete(key);
}

/**
 * Срезает из value лишние вхождения тегов по счётчику surplus (мутируется).
 * Возвращает новую строку. Порядок: полные обёртки `<tag …>…</tag>`
 * (содержимое сохраняется), затем одиночные `<tag …>` / `</tag>`.
 */
export function stripSurplusTags(value: string, surplus: Map<string, number>): string {
  let out = value;
  // Открывающие раньше закрывающих: пары срезаются обёрткой с сохранением текста.
  const tags = [...surplus.keys()].sort((a, b) => Number(a.startsWith('/')) - Number(b.startsWith('/')));
  for (const rawTag of tags) {
    let need = surplus.get(rawTag) ?? 0;
    if (need <= 0) continue;
    const closing = rawTag.startsWith('/');
    const name = closing ? rawTag.slice(1) : rawTag;

    if (!closing) {
      const wrapper = new RegExp(`<${name}(?:\\s[^<>]*)?>([\\s\\S]*?)</${name}>`, 'i');
      while (need > 0) {
        const m = wrapper.exec(out);
        if (!m) break;
        out = out.slice(0, m.index) + m[1] + out.slice(m.index + m[0].length);
        need--;
        decrement(surplus, rawTag);
        decrement(surplus, `/${name}`);
      }
    }
    while (need > 0) {
      const lone = closing
        ? new RegExp(`</${name}\\s*>`, 'i')
        : new RegExp(`<${name}(?:\\s[^<>]*)?>`, 'i');
      const m = lone.exec(out);
      if (!m) break;
      out = out.slice(0, m.index) + out.slice(m.index + m[0].length);
      need--;
      decrement(surplus, rawTag);
    }
  }
  return out;
}

export interface ReconcileResult {
  /** Новый объект с внесёнными срезаниями (вход не мутируется). */
  data: any;
  /** Что именно срезано (пусто = перевод не тронут). */
  stripped: StripRecord[];
}

/**
 * Сравнивает пул тегов перевода с оригиналом и срезает избыток —
 * не больше глобального избытка на каждый тег, поэтому легитимные
 * перемещения между элементами не затрагиваются.
 */
export function reconcileTags(source: any, translated: any): ReconcileResult {
  const srcLeaves: Leaves = flattenLeaves(source);
  const outLeaves: Leaves = flattenLeaves(translated);

  const expected: string[] = [];
  for (const v of Object.values(srcLeaves)) expected.push(...tagSignatures(v));
  const got: string[] = [];
  for (const v of Object.values(outLeaves)) got.push(...tagSignatures(v));

  const surplus = diffTagMultiset(got, expected);
  if (surplus.size === 0) return { data: translated, stripped: [] };

  const data = structuredClone(translated);
  const stripped: StripRecord[] = [];

  for (const p of Object.keys(outLeaves).sort()) {
    if (surplus.size === 0) break;
    // Избыток конкретного листа относительно его пары в оригинале,
    // ограниченный глобальным остатком: перемещённые теги не трогаем.
    const leafSurplus = diffTagMultiset(tagSignatures(outLeaves[p]), tagSignatures(srcLeaves[p] ?? ''));
    const capped = new Map<string, number>();
    for (const [tag, n] of leafSurplus) {
      const g = surplus.get(tag) ?? 0;
      if (g > 0) capped.set(tag, Math.min(n, g));
    }
    if (capped.size === 0) continue;

    const before = outLeaves[p];
    const after = stripSurplusTags(before, capped);
    if (after === before) continue;

    for (const [tag, n] of diffTagMultiset(tagSignatures(before), tagSignatures(after))) {
      stripped.push({ path: p, tag: `<${tag}>`, count: n });
      decrement2(surplus, tag, n);
    }
    // Вписываем новое значение по пути.
    const parts = p.split('/').filter(Boolean);
    let cur = data;
    for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
    cur[parts[parts.length - 1]] = after;
  }

  return { data, stripped };
}

/** Вычитает n единиц (в отличие от decrement — сразу несколько). */
function decrement2(map: Map<string, number>, key: string, n: number): void {
  const v = (map.get(key) ?? 0) - n;
  if (v > 0) map.set(key, v);
  else map.delete(key);
}

/** Локали, которым разрешены атрибуты у <instagram ids="…">. Остальным — пустой тег. */
const INSTAGRAM_ATTR_LOCALES = new Set(['ru', 'en']);

/**
 * Нормализует кавычки значений атрибутов тегов: модель даёт вперемешку
 * author='…' и author="…" (конвенция проекта — двойные). Мутирует data,
 * возвращает число исправленных листьев.
 */
export function normalizeTagQuotes(data: any): number {
  let changed = 0;
  const walk = (node: any): any => {
    if (typeof node === 'string') {
      const next = node.replace(/(<[a-zA-Z][^\s<>]*\s+[\w-]+=)'([^']*)'/g, '$1"$2"');
      if (next !== node) changed++;
      return next;
    }
    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) node[i] = walk(node[i]);
      return node;
    }
    if (node && typeof node === 'object') {
      for (const k of Object.keys(node)) node[k] = walk(node[k]);
      return node;
    }
    return node;
  };
  walk(data);
  return changed;
}

/**
 * Конвенция платформы: встраиваемый пост Instagram рендерится только для
 * ru и en; в остальных локалях <instagram> обязан быть ПУСТЫМ тегом.
 * Промптовое правило модель регулярно нарушает, копируя тег из оригинала
 * дословно, поэтому атрибуты срезаются механически (мутирует data,
 * возвращает число исправленных листьев).
 */
export function stripInstagramAttributes(data: any, lang: string): number {
  if (INSTAGRAM_ATTR_LOCALES.has(lang.toLowerCase())) return 0;
  let changed = 0;
  const walk = (node: any): any => {
    if (typeof node === 'string') {
      const next = node.replace(/(<instagram)\s[^<>]*(>)/gi, '$1$2');
      if (next !== node) changed++;
      return next;
    }
    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) node[i] = walk(node[i]);
      return node;
    }
    if (node && typeof node === 'object') {
      for (const k of Object.keys(node)) node[k] = walk(node[k]);
      return node;
    }
    return node;
  };
  walk(data);
  return changed;
}
