/**
 * Flattens a nested JSON object into a single-level object with dotted keys.
 * Only string values are kept in the flattened object.
 */
export function flatten(obj: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      Object.assign(result, flatten(value, newKey));
    } else {
      result[newKey] = String(value);
    }
  }

  return result;
}

/**
 * Reconstructs a nested JSON object from a flattened object with dotted keys.
 */
export function unflatten(flat: Record<string, any>): any {
  const keysList = Object.keys(flat);
  if (keysList.length === 0) return {};

  // Check if root should be an array
  const firstKeyParts = keysList[0].split('.');
  const isRootArray = !isNaN(Number(firstKeyParts[0]));
  const result: any = isRootArray ? [] : {};

  for (const key in flat) {
    if (!Object.prototype.hasOwnProperty.call(flat, key)) continue;

    const keys = key.split('.');
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
