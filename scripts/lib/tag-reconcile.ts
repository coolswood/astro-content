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

/** Похожа ли строка на тег <instagram …> (ids допускают список через запятую). */
export function isInstagramTag(v: unknown): boolean {
  return typeof v === 'string' && /<instagram[\s>]/.test(v.trim());
}

/**
 * Локали с СОБСТВЕННЫМ набором instagram-тегов, независимым от ru-канона:
 * en заводит англоязычные посты, которых в ru может не быть (и наоборот).
 */
export function instagramIndependent(lang: string): boolean {
  const lc = (lang || '').toLowerCase();
  return lc !== 'ru' && INSTAGRAM_ATTR_LOCALES.has(lc);
}

function pathSegs(p: string): (string | number)[] {
  return p
    .split('/')
    .slice(1)
    .map((s) => (/^\d+$/.test(s) ? Number(s) : s));
}

function parentArrayOf(root: any, p: string): any[] | null {
  const c = containerOf(root, p);
  return Array.isArray(c) ? c : null;
}

/** Контейнер (массив или объект), в котором лежит лист по пути p. */
function containerOf(root: any, p: string): any {
  const segs = pathSegs(p);
  let node = root;
  for (const s of segs.slice(0, -1)) {
    node = node?.[s as any];
    if (node == null) return null;
  }
  return node;
}

function lastIndex(p: string): number {
  const last = p.split('/').pop() ?? '';
  return /^\d+$/.test(last) ? Number(last) : -1;
}

function setByPath(root: any, p: string, value: string): boolean {
  const segs = pathSegs(p);
  let node = root;
  for (const s of segs.slice(0, -1)) {
    node = node?.[s as any];
    if (node == null) return false;
  }
  const last = segs[segs.length - 1];
  if (node == null || (node as any)[last as any] === undefined) return false;
  (node as any)[last as any] = value;
  return true;
}

/**
 * Восстанавливает per-locale набор тегов <instagram> целевой локали из
 * прежнего перевода: посты Instagram заводятся ПОД ЛОКАЛЬ (легаси en
 * ссылается на англоязычные посты), а модель копирует теги из ru-канона
 * дословно. Согласование по ПУТЯМ (структуры обоих файлов выровнены по
 * одному ru-канону):
 *   1) тег есть в обоих — значение берётся из легаси целиком (ids — свои);
 *   2) тег в translated, которого нет в легаси на этом пути — удаляется;
 *   3) легаси-тег, отсутствующий в translated — вставляется в массив-родитель.
 * Вставки/удаления внутри одного массива применяются по убыванию индекса,
 * чтобы сдвиги не портили ещё не применённые адреса. Мутирует translated,
 * возвращает число изменённых листьев.
 */
export function reconcileInstagramTags(lang: string, translated: any, legacyLeaves: Leaves): number {
  if (!instagramIndependent(lang)) return 0;
  const legacyTags = new Map<string, string>();
  for (const [p, v] of Object.entries(legacyLeaves)) {
    if (isInstagramTag(v)) legacyTags.set(p, v);
  }
  const cur = flattenLeaves(translated);
  const curTags = new Set(Object.keys(cur).filter((p) => isInstagramTag(cur[p])));

  let changed = 0;
  // 1) Замена: путь есть с обеих сторон — значение берём из легаси целиком.
  //    (путь остаётся в curTags: цикл вставок ниже не должен «воткнуть» дубликат)
  for (const [p, v] of legacyTags) {
    if (curTags.has(p)) {
      if (cur[p] !== v && setByPath(translated, p, v)) changed++;
    }
  }

  // 2) Удаления (теги translated, которых нет в легаси): сначала они —
  //    в легаси-координатах вставок, чтобы индексы не поехали. Убывание
  //    индекса внутри одного контейнера.
  for (const p of curTags) {
    if (legacyTags.has(p)) continue;
    const segs = pathSegs(p);
    const last = segs[segs.length - 1];
    const container = containerOf(translated, p);
    if (container == null) continue;
    if (Array.isArray(container) && typeof last === 'number') container.splice(last, 1);
    else delete (container as any)[last as any];
    changed++;
  }

  // 3) Вставки легаси-тегов (массивы-родители), по убыванию индекса.
  type ArrayOp = { index: number; value: string };
  const perArray = new Map<any[], ArrayOp[]>();
  for (const [p, v] of legacyTags) {
    if (curTags.has(p)) continue; // уже на месте (заменён или не тронут)
    const arr = parentArrayOf(translated, p);
    const idx = lastIndex(p);
    if (!arr || idx < 0 || idx > arr.length) continue;
    const ops = perArray.get(arr) ?? [];
    ops.push({ index: idx, value: v });
    perArray.set(arr, ops);
  }
  for (const [arr, ops] of perArray) {
    ops.sort((a, b) => b.index - a.index); // по убыванию: сдвиги не портят адреса
    for (const op of ops) {
      arr.splice(op.index, 0, op.value);
      changed++;
    }
  }
  return changed;
}

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
 * Типографские кавычки в тексте en-локали (правило style.txt): “ ” для
 * цитат, ’ для апострофов. Модель регулярно даёт прямые " и ' несмотря
 * на промпт, поэтому нормализуем механически. Кавычки внутри тегов
 * (<q author="...">) не трогаются; листья с нечётным числом " вне тегов
 * пропускаются (риск неверной парности). Мутирует data, возвращает число
 * исправленных листьев.
 */
export function normalizeTypographicQuotesEn(data: any): number {
  let changed = 0;
  const convert = (text: string): string => {
    const parts = text.split(/(<[^>]*>)/);
    const outside = parts.filter((_, i) => i % 2 === 0).join('');
    if ((outside.match(/"/g) || []).length % 2 !== 0) return text;
    let open = true;
    const next = parts
      .map((part, i) => {
        if (i % 2 === 1) return part; // тег — как есть
        let s = part.replace(/"/g, () => (open = !open) ? '”' : '“');
        s = s.replace(/(?<![A-Za-z])'([^']+)'(?![A-Za-z])/g, '‘$1’'); // цитаты в ‘ ’
        return s.replace(/'/g, '’'); // остальные ' — апострофы
      })
      .join('');
    return next;
  };
  const walk = (node: any): any => {
    if (typeof node === 'string') {
      const next = convert(node);
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
