/**
 * Утилиты для инкрементального перевода JSON: сравнение структур источника и
 * целевого файла, извлечение «недостающего» поддерева и глубокий merge.
 *
 * «Ключ» здесь = листовый путь (dot-notation). Массивы считаются листом
 * (переводятся целиком как одно значение), как и примитивы.
 */

/**
 * Собирает множество листовых путей объекта (dot-notation).
 * Массивы и примитивы — это листья; во вложенные объекты спускаемся.
 *
 * @example collectLeaves({a:{b:1,c:[1,2]},d:"x"})
 *          → Set {"a.b", "a.c", "d"}
 */
export function collectLeaves(obj: any, prefix = ''): Set<string> {
  const leaves = new Set<string>();
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    // Лист (примитив или массив) — добавляем сам путь.
    if (prefix) leaves.add(prefix);
    return leaves;
  }
  for (const key of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const inner = collectLeaves(obj[key], path);
    if (inner.size === 0) {
      // Пустой объект/массив без листьев — считаем сам путь листом.
      leaves.add(path);
    } else {
      for (const l of inner) leaves.add(l);
    }
  }
  return leaves;
}

/**
 * Извлекает из источника поддерево, содержащее только те листовые пути,
 * которых нет в target. Структура сохраняется (вложенные объекты
 * реконструируются). Массивы и примитивы копируются целиком.
 *
 * Если ничего не недостает — возвращает null.
 *
 * @example extractMissing({a:{b:1,c:2},d:3}, {a:{b:99}})
 *          → {a:{c:2}, d:3}
 */
export function extractMissing(source: any, target: any): any | null {
  const sourceLeaves = collectLeaves(source);
  const targetLeaves = collectLeaves(target);
  const missing = [...sourceLeaves].filter((p) => !targetLeaves.has(p));
  if (missing.length === 0) return null;

  const result: any = {};
  for (const path of missing) {
    const value = getByPath(source, path);
    if (value !== undefined) {
      setByPath(result, path, value);
    }
  }
  return result;
}

/**
 * Глубокий merge: рекурсивно объединяет updates в base.
 * - Объекты сливаются рекурсивно.
 * - Массивы и примитивы из updates полностью заменяют base.
 * - base мутируется и возвращается.
 *
 * @example deepMerge({a:{b:1,c:2}}, {a:{c:99,d:3}})
 *          → {a:{b:1,c:99,d:3}}
 */
export function deepMerge<T extends Record<string, any>>(base: T, updates: any): T {
  if (updates === null || updates === undefined) return base;
  if (typeof updates !== 'object' || Array.isArray(updates)) {
    return updates as T;
  }
  for (const key of Object.keys(updates)) {
    const baseVal = (base as any)[key];
    const updVal = updates[key];
    if (
      baseVal &&
      typeof baseVal === 'object' &&
      !Array.isArray(baseVal) &&
      updVal &&
      typeof updVal === 'object' &&
      !Array.isArray(updVal)
    ) {
      (base as any)[key] = deepMerge(baseVal, updVal);
    } else {
      (base as any)[key] = updVal;
    }
  }
  return base;
}

/** Получает значение по dot-пути. */
function getByPath(obj: any, path: string): any {
  const parts = path.split('.');
  let cur: any = obj;
  for (const p of parts) {
    if (cur === null || typeof cur !== 'object') return undefined;
    cur = cur[p];
  }
  return cur;
}

/** Устанавливает значение по dot-пути, создавая промежуточные объекты. */
function setByPath(obj: any, path: string, value: any): void {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (cur[p] === null || cur[p] === undefined || typeof cur[p] !== 'object') {
      cur[p] = {};
    }
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
}
