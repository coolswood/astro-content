/**
 * DEPRECATED: содержимое переехало в `./lang-codes.ts`.
 *
 * Этот файл сохранён как тонкий реэкспорт, чтобы не ломать существующие импорты.
 * Новый код должен импортировать напрямую из lang-codes.
 *
 * @example новый код
 *   import { validateLocalizedJson, SCRIPT_MAP } from './lang-codes.js';
 *
 * @example legacy
 *   import { validateLocalizedJson } from './translation-validator.js'; // всё ещё работает
 */
export {
  BASE_ALLOWED,
  SCRIPT_MAP,
  validateValue,
  validateLocalizedJson,
} from './lang-codes.js';
