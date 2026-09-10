/**
 * Обход JSON-дерева контента: объекты И массивы строк (в контенте есть массивы,
 * напр. texts/psychologist.json, story/start.json).
 *
 * Путь листа — «a/b/0/c» (индексы массивов участвуют в пути как числа).
 * Переводимыми считаются только строковые листья; числа/булевы/null/вложенные
 * структуры остаются в target как есть (мердж идёт точечно по путям).
 */

export type Leaves = Record<string, string>;

/** Рекурсивно сортирует ключи объектов для детерминированной сериализации (массивы не трогаем). */
export function stableStringify(value: any): string {
  if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
  if (value && typeof value === 'object') {
    const keys = Object.keys(value).sort();
    return (
      '{' +
      keys.map((k) => JSON.stringify(k) + ':' + stableStringify(value[k])).join(',') +
      '}'
    );
  }
  return JSON.stringify(value);
}

/** Плоская карта «путь → строковое значение» для всех строковых листьев. */
export function flattenLeaves(value: any, prefix = ''): Leaves {
  const out: Leaves = {};
  if (typeof value === 'string') {
    if (prefix) out[prefix] = value;
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => Object.assign(out, flattenLeaves(item, `${prefix}/${i}`)));
    return out;
  }
  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) {
      Object.assign(out, flattenLeaves(value[key], `${prefix}/${key}`));
    }
  }
  return out;
}

/**
 * Строит поддерево источника, содержащее только перечисленные пути листьев.
 * Промежуточные объекты/массивы создаются по мере необходимости; разреженные
 * массивы не допускаются — индексы идут подряд, иначе путь некорректен.
 */
export function buildSubtree(source: any, paths: Iterable<string>): any {
  const root: any = {};
  for (const p of paths) {
    const parts = p.split('/').filter(Boolean);
    const leaf = getPath(source, parts);
    if (leaf === undefined) continue;
    setPath(root, parts, leaf);
  }
  return root;
}

function getPath(root: any, parts: string[]): any {
  let cur = root;
  for (const part of parts) {
    if (cur == null) return undefined;
    cur = Array.isArray(cur) ? cur[Number(part)] : cur[part];
  }
  return cur;
}

function setPath(root: any, parts: string[], value: any): void {
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    const nextIsIndex = /^\d+$/.test(nextPart);
    const existing = Array.isArray(cur) ? cur[Number(part)] : cur[part];
    if (existing == null || typeof existing !== 'object') {
      const fresh = nextIsIndex ? [] : {};
      if (Array.isArray(cur)) cur[Number(part)] = fresh;
      else cur[part] = fresh;
    }
    cur = Array.isArray(cur) ? cur[Number(part)] : cur[part];
  }
  const last = parts[parts.length - 1];
  if (Array.isArray(cur)) {
    const idx = Number(last);
    // Пропущенные индексы — явные null: сериализация детерминирована, а мердж
    // идёт только по отправленным путям (flattenLeaves пропускает null).
    for (let i = cur.length; i < idx; i++) cur[i] = null;
    cur[idx] = value;
  } else {
    cur[last] = value;
  }
}

/**
 * Вписывает переведённые строки в target по путям (мутирует и возвращает target).
 * Существующее содержимое target по остальным путям не трогается.
 */
export function applyLeaves(target: any, leaves: Leaves): any {
  for (const p of Object.keys(leaves)) {
    setPath(target, p.split('/').filter(Boolean), leaves[p]);
  }
  return target;
}

/**
 * Удаляет из target листья по путям (мёртвые ключи). Контейнеры, опустевшие
 * после удаления (напр. «quote: {}»), сворачиваются вверх до непустого предка.
 * Числовые индексы одного массива удаляются с конца — иначе после первого
 * splice сдвигаются индексы и лишний элемент остаётся.
 */
export function removeLeaves(target: any, paths: string[]): void {
  // Группировка: родительский путь → список последних сегментов в порядке прихода.
  const byParent = new Map<string, { parentPath: string[]; last: string; chain: { parent: any; key: string }[] }[]>();
  for (const p of paths) {
    const parts = p.split('/').filter(Boolean);
    const parentPath = parts.slice(0, -1);
    const last = parts[parts.length - 1];
    // Промежуточные контейнеры ищем заново на момент удаления (структура могла
    // измениться после сворачивания предыдущих пустых контейнеров).
    const key = parentPath.join('/');
    const list = byParent.get(key) ?? [];
    list.push({ parentPath, last, chain: [] });
    byParent.set(key, list);
  }

  const resolve = (parentPath: string[]): any => {
    let cur = target;
    for (const part of parentPath) {
      if (cur == null || typeof cur !== 'object') return undefined;
      cur = Array.isArray(cur) ? cur[Number(part)] : cur[part];
    }
    return cur;
  };

  // Родители обходим от самых глубоких к корню: сворачивание пустого контейнера
  // может убрать путь более короткого родителя из дерева.
  const sortedKeys = [...byParent.keys()].sort((a, b) => b.split('/').length - a.split('/').length);
  for (const key of sortedKeys) {
    const entries = byParent.get(key)!;
    const parent = resolve(entries[0].parentPath);
    if (parent == null || typeof parent !== 'object') continue;

    // Сначала удаляем обычные ключи (не-индексы) — они не влияют на индексы.
    const numeric: number[] = [];
    for (const e of entries) {
      if (/^\d+$/.test(e.last)) numeric.push(Number(e.last));
      else delete parent[e.last];
    }
    if (Array.isArray(parent)) {
      for (const idx of [...new Set(numeric)].sort((a, b) => b - a)) {
        if (idx >= 0 && idx < parent.length) parent.splice(idx, 1);
      }
    } else if (numeric.length > 0) {
      // Числовые сегменты в объекте — обычные ключи.
      for (const idx of numeric) delete parent[String(idx)];
    }

    // Сворачивание опустевших контейнеров вверх по цепочке.
    let chain = entries[0].parentPath;
    for (let i = chain.length - 1; i >= 0; i--) {
      const parentNode = resolve(chain.slice(0, i));
      if (parentNode == null || typeof parentNode !== 'object') break;
      const nodeKey = chain[i];
      const node = Array.isArray(parentNode) ? parentNode[Number(nodeKey)] : parentNode[nodeKey];
      if (node != null && typeof node === 'object' && Object.keys(node).length === 0) {
        if (Array.isArray(parentNode)) parentNode.splice(Number(nodeKey), 1);
        else delete parentNode[nodeKey];
      } else {
        break; // контейнер не пуст — выше тоже трогать нечего
      }
    }
  }
}
