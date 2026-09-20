/**
 * Целостность массивов со стабильными id записей (questions.json:
 * [{id, translation}, …]). Инцидент 2026-03 (ja, ветка agent/ja-full):
 * переперевод потерял одну запись массива и сместил хвост — 6 id
 * задублировались, 6 вопросов пропали, клиент получал 500 на
 * /questions/random. Сдвиг содержимого между соседними индексами НЕВИДИМ
 * для сверки путей (все пути на месте, значения непустые) — выравнивание
 * идёт JOIN'ом по значению id: перевод записи встаёт на каноническое
 * место своего id, потерянные id остаются пустыми заглушками и уходят
 * в recovery конвейера, дубли и чужие id в ответе отбрасываются.
 */

/** Статистика выравнивания одного id-массива (для лога и тестов). */
export interface IdArrayReport {
  /** Путь массива в документе (без ведущего слэша, сегменты через /). */
  arrayPath: string;
  /** Записей встали на каноническое место (включая прибывшие с другого индекса). */
  realigned: number;
  /** id источника, не найденные в ответе (листья остаются пустыми → recovery). */
  missingIds: string[];
  /** id, встреченные в ответе больше одного раза (взят первый, дубли отброшены). */
  duplicateIds: string[];
  /** id ответа, которых нет в источнике (отброшены как чужие). */
  unknownIds: string[];
}

/** Элементы массива: настоящий массив или объект с числовыми ключами 0..n.
 *  Дырки (holes) нормализуются в явные null: buildSubtree строит разреженные
 *  массивы индексным присваиванием, и без нормализации map/push по дыркам
 *  просаживаются undefined. */
function itemsOf(node: any): any[] | null {
  if (Array.isArray(node)) return Array.from(node, (v) => (v === undefined ? null : v));
  if (node && typeof node === 'object') {
    const keys = Object.keys(node);
    if (keys.length > 0 && keys.every((k) => /^\d+$/.test(k))) {
      return keys.map(Number).sort((a, b) => a - b).map((i) => node[i]);
    }
  }
  return null;
}

/** Строковый id записи или null (не объект / нет строкового поля id). */
function idOf(item: any): string | null {
  if (item == null || typeof item !== 'object' || Array.isArray(item)) return null;
  return typeof item.id === 'string' && item.id.trim() !== '' ? item.id : null;
}

/**
 * Массив ли это записей со стабильными id: непустые элементы — объекты со
 * строковыми уникальными id (≥1). Разреженные массивы (null на местах
 * невысланных записей — инкрементальные payload/recovery) допускаются:
 * суждение выносится по непустым элементам. Даже одна запись в разреженном
 * массиве требует позиционного выравнивания: коллапс разреженности в ответе
 * модели сдвигает её на индекс 0.
 */
function isIdArray(items: any[]): boolean {
  const valid = items.filter((it) => it != null);
  if (valid.length < 1) return false;
  const ids = new Set<string>();
  for (const it of valid) {
    const id = idOf(it);
    if (id == null || ids.has(id)) return false;
    ids.add(id);
  }
  return true;
}

/** Заглушка записи: строки → '', вложенность сохраняется (как makeSkeleton). */
function stubOf(node: any): any {
  if (Array.isArray(node)) return node.map(stubOf);
  if (node && typeof node === 'object') {
    const out: any = {};
    for (const [k, v] of Object.entries(node)) out[k] = k.startsWith('@') ? v : stubOf(v);
    return out;
  }
  return typeof node === 'string' ? '' : node;
}

/**
 * Выравнивает все id-массивы draft по источнику (мутирует draft, возвращает
 * отчёты по каждому найденному id-массиву). Записи draft джойнятся по id к
 * позициям источника; записи без id, дубли и чужие id не присоединяются.
 * Непокрытая запись источника становится пустой заглушкой — вниз по
 * конвейеру её увидит recovery (потерянный лист).
 */
export function realignIdArrays(source: any, draft: any): IdArrayReport[] {
  const reports: IdArrayReport[] = [];
  const walk = (src: any, drf: any, prefix: string): void => {
    if (src == null || drf == null) return;
    const srcItems = itemsOf(src);
    if (srcItems !== null && isIdArray(srcItems)) {
      reports.push(realignOne(srcItems, drf, prefix));
      return; // вложенные id-массивы внутри записей не поддерживаем (в проекте нет)
    }
    if (src && typeof src === 'object' && drf && typeof drf === 'object') {
      // Итерация через forEach: buildSubtree строит разреженные массивы
      // ИНДЕКСНЫМ присваиванием (cur[139] = …) — позиции 0..138 остаются
      // дырками (holes), а не null; map/for-of по дыркам отдают undefined, и
      // деструктуризация падает. forEach дырки пропускает.
      const entries: [string, any][] = [];
      if (Array.isArray(src)) src.forEach((v, i) => entries.push([String(i), v]));
      else for (const e of Object.entries(src)) entries.push(e);
      for (const [k, v] of entries) {
        const next = Array.isArray(drf) ? drf[Number(k)] : drf[k];
        if (next !== undefined) walk(v, next, prefix ? `${prefix}/${k}` : k);
      }
    }
  };
  walk(source, draft, '');
  return reports;
}

function realignOne(srcItems: any[], draftNode: any, arrayPath: string): IdArrayReport {
  const report: IdArrayReport = {
    arrayPath,
    realigned: 0,
    missingIds: [],
    duplicateIds: [],
    unknownIds: [],
  };
  const draftItems = itemsOf(draftNode) ?? [];
  const draftIsArray = Array.isArray(draftNode);

  // id → { item, index }: первый выигрышный дубль отмечается, копии игнорируются.
  const byId = new Map<string, { item: any; index: number }>();
  draftItems.forEach((it, i) => {
    const id = idOf(it);
    if (id == null) return;
    if (byId.has(id)) {
      if (!report.duplicateIds.includes(id)) report.duplicateIds.push(id);
      return;
    }
    byId.set(id, { item: it, index: i });
  });

  const srcIds = new Set<string>();
  for (const it of srcItems) {
    const id = idOf(it);
    if (id != null) srcIds.add(id);
  }
  for (const id of byId.keys()) if (!srcIds.has(id)) report.unknownIds.push(id);

  const rebuilt: any[] = srcItems.map((src, canonicalIndex) => {
    if (src == null) return null; // разреженный источник: позиции без записи
    const id = idOf(src);
    const hit = id != null ? byId.get(id) : undefined;
    if (hit) {
      if (hit.index !== canonicalIndex) report.realigned++;
      return hit.item; // id уже равен ключу джойна — каноничен по построению
    }
    // Потерянная запись → пустая заглушка, но с КАНОНИЧЕСКИМ id из источника:
    // id — механические данные (как медиа-пути), восстановить их безопасно,
    // а непустой id сужает recovery до одного листа translation.
    const stub = stubOf(src);
    if (id != null) stub.id = id;
    if (id != null) report.missingIds.push(id);
    return stub;
  });

  // Ответ пишется на место: массив — заменой содержимого, числовой объект — ключами.
  if (draftIsArray) {
    draftNode.length = 0;
    draftNode.push(...rebuilt);
  } else if (draftNode && typeof draftNode === 'object') {
    for (const k of Object.keys(draftNode)) delete draftNode[k];
    rebuilt.forEach((v, i) => {
      draftNode[i] = v;
    });
  }
  return report;
}
