/**
 * Shared utility to validate translations for invalid characters.
 */

// Basic allowed characters: Latin, Numbers, Spaces, Punctuation, Symbols, and common delimiters
export const BASE_ALLOWED = [
  'a-zA-Z', // Latin
  '0-9', // Digits
  '\\s', // Whitespace
  '\\p{P}', // Punctuation (includes hyphens, dots, brackets, etc.)
  '\\p{S}', // Symbols (includes math, currency, etc.)
  '\\u00A0', // Non-breaking space
  '\\u00AD', // Soft hyphen
  '«»„“""\'\'', // Common quotes
  '{}', // Template braces
  '<>', // HTML tags
].join('');

/**
 * Define language-specific allowed character ranges.
 */
export const SCRIPT_MAP: Record<string, string> = {
  // Korean
  ko: '가-힣\\u1100-\\u11FF\\u3130-\\u318F\\uA960-\\uA97F\\uD7B0-\\uD7FF',
  // Ukrainian: Cyrilics excluding Russian-only chars (ы, э, ъ, ё)
  uk: "а-щьюяА-ЩЬЮЯіІїЇєЄґҐ'",
  // Russian
  ru: 'а-яА-ЯёЁ',
  // Turkish
  tr: 'çÇğĞıİöÖşŞüÜâÂîÎûÛïÏéÉïÏ',
  // Czech
  cs: 'áÁčČďĎéÉěĚíÍňŇóÓřŘšŠťŤúÚůŮýÝžŽïÏ',
  // Arabic
  ar: '\\p{Script=Arabic}\\u064B-\\u0652\\u0640', // Added Tanwin, Shadda, and Tatweel (ـ)
  // Hebrew
  he: '\\p{Script=Hebrew}\\u200E',
  // Japanese
  ja: '\\p{Script=Hiragana}\\p{Script=Katakana}\\p{Script=Han}\\u3000-\\u303F\\uFF01-\\uFFEF々\\u30fb\\u30fc\\u2460-\\u24FF\\u2700-\\u27BF\\uD83C-\\uDBFF\\uDC00-\\uDFFF\\u0030-\\u0039\\uFE0F\\u20E3', // Added Emojis/Symbols, Numbers and Keycap symbols
  // Indonesian
  id: 'éÉ',
  // Dutch
  nl: 'éÉëËïÏèÈêÊàÀâÂóÓöÖûÛçÇîÎüÜáÁ',
  // Portuguese
  pt: 'áÁàÀâÂãÃçÇéÉêÊíÍóÓôÔõÕúÚªºüÜïÏ',
  'pt-BR': 'áÁàÀâÂãÃçÇéÉêÊíÍóÓôÔõÕúÚªºüÜïÏ',
  pt_br: 'áÁàÀâÂãÃçÇéÉêÊíÍóÓôÔõÕúÚªºüÜïÏ',
  // French
  fr: 'éÉàÀèÈùÙâÂêÊîÎôÔûÛëËïÏüÜçÇœŒíÍáÁ',
  // German
  de: 'äÄöÖüÜßéÉïÏ₂\u00ADüÜ',
  // Italian
  it: 'àÀèÈéÉìÌòÒùÙîÎïÏªº',
  // Polish
  pl: 'ąĄćĆęĘłŁńŃóÓśŚźŹżŻíÍéÉïÏáÁ',
  // Swedish
  sv: 'åÅäÄöÖéÉïÏ',
  // Spanish
  es: 'áÁéÉíÍóÓúÚñÑüÜ¡¿ïÏªº', // Added ordinal
  // English (to account for names/loans)
  en: 'éÉáÁíÍïÏüÜ',
};

/**
 * Validates a value (string, array, or object) against a language's script.
 * Returns an array of problematic words.
 */
export function validateValue(value: any, langCode: string): string[] {
  const languageScript = SCRIPT_MAP[langCode] ?? '';
  const regex = new RegExp(`^[${BASE_ALLOWED}${languageScript}]+$`, 'u');
  const errors: string[] = [];

  if (typeof value === 'string') {
    // Japanese doesn't use spaces, so we check the whole string at once
    const words = langCode === 'ja' ? [value] : value.split(/\s+/);
    for (const word of words) {
      // Clean word from trailing/leading punctuation for cleaner output, but check the whole word
      const cleanWord = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
      if (cleanWord && !regex.test(cleanWord)) {
        errors.push(word);
      }
    }
  } else if (Array.isArray(value)) {
    for (const item of value) {
      errors.push(...validateValue(item, langCode));
    }
  } else if (typeof value === 'object' && value !== null) {
    for (const key of Object.keys(value)) {
      errors.push(...validateValue(value[key], langCode));
    }
  }
  return errors;
}

/**
 * Validates a localized JSON object (keys are lang codes, values are translation objects).
 * Returns an array of errors per language.
 */
export function validateLocalizedJson(localizedJson: Record<string, any>): Record<string, string[]> {
  const allErrors: Record<string, string[]> = {};
  for (const langCode in localizedJson) {
    // We normalize langCode if it's like pt_BR or pt_br to match SCRIPT_MAP
    const normalizedLangCode = langCode.toLowerCase().replace('_', '-');
    
    // Find the appropriate key in SCRIPT_MAP
    let scriptKey = langCode;
    if (!(langCode in SCRIPT_MAP)) {
      scriptKey = Object.keys(SCRIPT_MAP).find(k => k.toLowerCase().replace('_', '-') === normalizedLangCode) || langCode;
    }

    const errors = validateValue(localizedJson[langCode], scriptKey);
    if (errors.length > 0) {
      allErrors[langCode] = errors;
    }
  }
  return allErrors;
}
