/**
 * Replaces all keys in a flat JSON object with generic `item_1`, `item_2`, ...
 * Returns the anonymized object and a map to restore original keys.
 *
 * @example
 * const { anonymized, keyMap } = anonymizeKeys({ push_title: "Привет", push_body: "Текст" })
 * // anonymized = { item_1: "Привет", item_2: "Текст" }
 * // keyMap     = { item_1: "push_title", item_2: "push_body" }
 */
export function anonymizeKeys(data: Record<string, any>): {
  anonymized: Record<string, any>;
  keyMap: Record<string, string>;
} {
  const anonymized: Record<string, any> = {};
  const keyMap: Record<string, string> = {};

  Object.entries(data).forEach(([originalKey, value], index) => {
    const anonKey = `item_${index + 1}`;
    anonymized[anonKey] = value;
    keyMap[anonKey] = originalKey;
  });

  return { anonymized, keyMap };
}

/**
 * Restores original key names from an anonymized object using the keyMap.
 * Unknown keys (not in keyMap) are passed through as-is.
 */
export function restoreKeys(
  anonymized: Record<string, any>,
  keyMap: Record<string, string>,
): Record<string, any> {
  const restored: Record<string, any> = {};

  for (const [anonKey, value] of Object.entries(anonymized)) {
    const originalKey = keyMap[anonKey] ?? anonKey;
    restored[originalKey] = value;
  }

  return restored;
}
