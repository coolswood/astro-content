/**
 * Дифф ru-источника с target-переводом: missing / changed / dead по плоским
 * путям листьев (объекты и массивы — см. tree.ts).
 */
import { hashLeaf } from './state.js';
import type { ScopeState } from './state.js';
import type { Leaves } from './tree.js';

export interface Analysis {
  /** Ключи ru, отсутствующие в target (перевести и дописать) — в порядке ru. */
  missing: string[];
  /** Ключи, чьё ru-значение изменилось с момента перевода (перевести заново). */
  changed: string[];
  /** Ключи target, которых нет в ru («мёртвые» — удалить) — в порядке target. */
  dead: string[];
}

/**
 * @param ruLeaves      плоские строковые листья ru-источника
 * @param targetLeaves  плоские строковые листья target ({} если файла нет)
 * @param scope         state по этому файлу (уже инициализированный ensureScope)
 */
export function analyzeTree(
  ruLeaves: Leaves,
  targetLeaves: Leaves,
  scope: ScopeState,
  opts: { retranslateChanged?: boolean } = {},
): Analysis {
  const retranslateChanged = opts.retranslateChanged ?? true;
  const ruPaths = Object.keys(ruLeaves);
  const targetPaths = Object.keys(targetLeaves);
  const ruSet = new Set(ruPaths);

  const missing = ruPaths.filter((p) => !(p in targetLeaves));
  const dead = targetPaths.filter((p) => !ruSet.has(p));
  const changed = retranslateChanged
    ? // Записи нет вообще (ключ добавлен в ru после инициализации, а в target
      // уже кто-то вписал перевод вручную) — перестраховываемся: переводим заново.
      ruPaths.filter((p) => p in targetLeaves && scope[p] !== hashLeaf(ruLeaves[p]))
    : [];

  return { missing, changed, dead };
}

/** Объединение missing ∪ changed в каноническом (ru) порядке. */
export function keysToTranslate(a: Analysis, full: boolean, ruPaths: string[]): string[] {
  if (full) return ruPaths;
  const union = new Set([...a.missing, ...a.changed]);
  return ruPaths.filter((p) => union.has(p));
}
