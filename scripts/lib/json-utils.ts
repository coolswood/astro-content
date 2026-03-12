/**
 * Flattens a nested JSON object into a single-level object with a safe separator (\u001f).
 * Keeps original value types (string, number, boolean).
 */
export function flatten(obj: any, prefix = ''): Record<string, any> {
  const result: Record<string, any> = {};
  const separator = '\u001f';

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    const newKey = prefix ? `${prefix}${separator}${key}` : key;

    if (typeof value === 'object' && value !== null) {
      Object.assign(result, flatten(value, newKey));
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

/**
 * Reconstructs a nested JSON object from a flattened object with a safe separator (\u001f).
 */
export function unflatten(flat: Record<string, any>): any {
  const keysList = Object.keys(flat);
  if (keysList.length === 0) return {};

  const separator = '\u001f';

  // Check if root should be an array
  const firstKeyParts = keysList[0].split(separator);
  const isRootArray = !isNaN(Number(firstKeyParts[0]));
  const result: any = isRootArray ? [] : {};

  for (const key in flat) {
    if (!Object.prototype.hasOwnProperty.call(flat, key)) continue;

    const keys = key.split(separator);
    let current = result;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        current[k] = flat[key];
      } else {
        // Check if next key looks like an array index
        const nextKey = keys[i + 1];
        const isNextArray = !isNaN(Number(nextKey));

        if (current[k] === undefined) {
          current[k] = isNextArray ? [] : {};
        }
        current = current[k];
      }
    }
  }

  return result;
}

/**
 * Recursively merges two objects. If a key in the source is an object,
 * it will be merged with the corresponding key in the target.
 */
export function deepMerge(target: any, source: any): any {
  if (typeof source !== 'object' || source === null) return source;
  if (typeof target !== 'object' || target === null) return source;

  const result = Array.isArray(target) ? [...target] : { ...target };

  for (const key in source) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

    const sourceValue = source[key];
    const targetValue = target[key];

    if (
      typeof sourceValue === 'object' &&
      sourceValue !== null &&
      typeof targetValue === 'object' &&
      targetValue !== null
    ) {
      result[key] = deepMerge(targetValue, sourceValue);
    } else {
      result[key] = sourceValue;
    }
  }

  return result;
}
