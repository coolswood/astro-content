/**
 * Единый источник истины для языковых кодов в подсистеме переводов.
 *
 * Исторически язык был размазан по трём модулям с тремя формами:
 *   - prompt-loader / bot-utils:  `pt_br`   (как имена директорий)
 *   - SCRIPT_MAP в валидаторе:     `pt`, `pt-BR`, `pt_br` (три ключа!)
 *
 * ВАЖНО о двойственности бразильского португальского:
 *   - Код языка в переводе (что промпт просит у модели и что она возвращает,
 *     а также маркер @@locale в app_interface.json) — `pt_BR`.
 *   - Имя директории i18n — `pt_br` (как все остальные директории — lowercase).
 * Поэтому в ALL_TARGET_LANGS хранится `pt_BR`, а директория — `pt_br`.
 * `normalizeLangCode` приводит любой вход к форме из ALL_TARGET_LANGS.
 */

/** Канонический список целевых языков (порядок детерминирован). */
export const ALL_TARGET_LANGS: readonly string[] = [
  'ar', 'cs', 'de', 'en', 'es', 'fr', 'he', 'id', 'it', 'ja',
  'ko', 'nl', 'pl', 'pt_BR', 'pt', 'sv', 'tr', 'uk',
];

/** Человекочитаемое (русское) название языка по коду. */
export const LANG_NAMES: Record<string, string> = {
  ar: 'Арабский',
  cs: 'Чешский',
  de: 'Немецкий',
  en: 'Английский',
  es: 'Испанский',
  fr: 'Французский',
  he: 'Иврит',
  id: 'Индонезийский',
  it: 'Итальянский',
  ja: 'Японский',
  ko: 'Корейский',
  nl: 'Нидерландский',
  pl: 'Польский',
  pt_BR: 'Бразильский португальский',
  pt: 'Португальский',
  sv: 'Шведский',
  tr: 'Турецкий',
  uk: 'Украинский',
};

/**
 * Карта алиасов → канонический код (форма из ALL_TARGET_LANGS).
 * Покрывает исторические расхождения pt-BR / pt_BR / pt_br.
 */
const LANG_ALIASES: Record<string, string> = {
  'pt-br': 'pt_BR',
  'ptbr': 'pt_BR',
  'pt_br': 'pt_BR',
};

/** Приводит произвольный языковой код к канонической форме из ALL_TARGET_LANGS. */
export function normalizeLangCode(raw: string): string {
  const lower = String(raw ?? '').trim().toLowerCase();
  if (LANG_ALIASES[lower]) return LANG_ALIASES[lower];
  return lower.replace('-', '_');
}

/** Является ли код поддерживаемым целевым языком. */
export function isSupportedLang(code: string): boolean {
  return normalizeLangCode(code) in LANG_NAMES;
}

// ─────────────────────────────────────────────────────────────────────────────
// Валидация письменностей (консолидирована из translation-validator.ts)
// ─────────────────────────────────────────────────────────────────────────────

/** Базовый набор разрешённых символов (латиница, цифры, пунктуация, символы). */
export const BASE_ALLOWED = [
  'a-zA-Z', // Latin
  '0-9', // Digits
  '\\s', // Whitespace
  '\\p{P}', // Punctuation
  '\\p{S}', // Symbols
  '\\u00A0', // Non-breaking space
  '\\u00AD', // Soft hyphen
  '«»„“""\'\'', // Common quotes
  '{}', // Template braces
  '<>', // HTML tags
].join('');

/**
 * Карта язык → допустимые символы письменности.
 * Ключи — канонические коды (pt_BR, а не pt-BR/pt_br).
 * Дубликаты и мусор (₂ в de, повтор üÜ) убраны по сравнению с прежней версией.
 */
export const SCRIPT_MAP: Record<string, string> = {
  ko: '가-힣\\u1100-\\u11FF\\u3130-\\u318F\\uA960-\\uA97F\\uD7B0-\\uD7FF',
  // Украинский: кириллица без сугубо русских букв (ы, э, ъ, ё)
  uk: "а-щьюяА-ЩЬЮЯіІїЇєЄґҐ'",
  ru: 'а-яА-ЯёЁ',
  tr: 'çÇğĞıİöÖşŞüÜâÂîÎûÛïÏéÉ',
  cs: 'áÁčČďĎéÉěĚíÍňŇóÓřŘšŠťŤúÚůŮýÝžŽïÏ',
  ar: '\\p{Script=Arabic}\\u064B-\\u0652\\u0640',
  he: '\\p{Script=Hebrew}\\u200E',
  ja: '\\p{Script=Hiragana}\\p{Script=Katakana}\\p{Script=Han}\\u3000-\\u303F\\uFF01-\\uFFEF々\\u30fb\\u30fc\\u2460-\\u24FF\\u2700-\\u27BF\\uD83C-\\uDBFF\\uDC00-\\uDFFF\\u0030-\\u0039\\uFE0F\\u20E3',
  id: 'éÉ',
  nl: 'éÉëËïÏèÈêÊàÀâÂóÓöÖûÛçÇîÎüÜáÁ',
  pt_BR: 'áÁàÀâÂãÃçÇéÉêÊíÍóÓôÔõÕúÚªºüÜïÏ',
  pt: 'áÁàÀâÂãÃçÇéÉêÊíÍóÓôÔõÕúÚªºüÜïÏ',
  fr: 'éÉàÀèÈùÙâÂêÊîÎôÔûÛëËïÏüÜçÇœŒíÍáÁ',
  de: 'äÄöÖüÜßéÉïÏ\u00AD', // убран мусорный ₂ и дубликат üÜ
  it: 'àÀèÈéÉìÌòÒùÙîÎïÏªº',
  pl: 'ąĄćĆęĘłŁńŃóÓśŚźŹżŻíÍéÉïÏáÁ',
  sv: 'åÅäÄöÖéÉïÏ',
  es: 'áÁéÉíÍóÓúÚñÑüÜ¡¿ïÏªº',
  en: 'éÉáÁíÍïÏüÜ',
};

/**
 * Кеш скомпилированных regex по языку (раньше компилировался на каждое значение,
 * что на больших JSON приводило к тысячам пересборок).
 */
const regexCache = new Map<string, RegExp>();

function getScriptRegex(langCode: string): RegExp {
  const canonical = normalizeLangCode(langCode);
  const script = SCRIPT_MAP[canonical] ?? SCRIPT_MAP[langCode] ?? '';
  const cacheKey = canonical;
  const cached = regexCache.get(cacheKey);
  if (cached) return cached;
  const re = new RegExp(`^[${BASE_ALLOWED}${script}]+$`, 'u');
  regexCache.set(cacheKey, re);
  return re;
}

/**
 * Валидирует значение (строка/массив/объект) против письменности языка.
 * Возвращает массив «проблемных» слов.
 */
export function validateValue(value: any, langCode: string): string[] {
  const canonical = normalizeLangCode(langCode);
  const regex = getScriptRegex(canonical);
  const errors: string[] = [];

  if (typeof value === 'string') {
    // Японский не использует пробелы — проверяем строку целиком.
    const words = canonical === 'ja' ? [value] : value.split(/\s+/);
    for (const word of words) {
      const cleanWord = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
      if (cleanWord && !regex.test(cleanWord)) {
        errors.push(word);
      }
    }
  } else if (Array.isArray(value)) {
    for (const item of value) {
      errors.push(...validateValue(item, canonical));
    }
  } else if (typeof value === 'object' && value !== null) {
    for (const key of Object.keys(value)) {
      errors.push(...validateValue(value[key], canonical));
    }
  }
  return errors;
}

/**
 * Валидирует локализованный JSON (ключи — коды языков, значения — переводы).
 * Возвращает ошибки по каждому языку.
 */
export function validateLocalizedJson(
  localizedJson: Record<string, any>,
): Record<string, string[]> {
  const allErrors: Record<string, string[]> = {};
  for (const langCode in localizedJson) {
    const canonical = normalizeLangCode(langCode);
    if (!(canonical in SCRIPT_MAP)) {
      // Неизвестный язык — пропускаем без ложных срабатываний.
      continue;
    }
    const errors = validateValue(localizedJson[langCode], canonical);
    if (errors.length > 0) {
      allErrors[langCode] = errors;
    }
  }
  return allErrors;
}
