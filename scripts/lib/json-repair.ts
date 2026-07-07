/**
 * Единый модуль восстановления JSON, полученного от LLM.
 *
 * Раньше существовало 4 расходящиеся реализации:
 *   - bot-utils.ts:    safeParseAIJson + repairJson + fixUnescapedQuotes
 *   - gemini-client:   parseGeminiJson (обёртка над safeParseAIJson + self-heal)
 *   - claude-provider: собственный parseJson с lookbehind-regex
 *   - mistral-provider: byte-for-byte копия claude-версии
 *
 * Теперь все используют общую точку `parseWithRepair`. Провайдеры лишь могут
 * дополнительно попросить саму модель исправить JSON (self-heal) — эта
 * способность делегируется через опцию `onSelfHeal`.
 */

/**
 * Извлекает список «кандидатов» JSON из произвольного текста LLM:
 *   1. Все блоки ```json ... ``` / ``` ... ```
 *   2. Шаблон `json\n{...}` (когда модель забыла обратные кавычки)
 *   3. Самый крупный блок `{ ... }`
 *   4. Самый крупный блок `[ ... ]`
 *   5. Исходный текст как last resort
 *
 * Порядок важен: от наиболее вероятного к наименее вероятному.
 */
export function extractJsonCandidates(text: string): string[] {
  const candidates: string[] = [];

  // 1. Все markdown code-blocks (```json ... ``` или ``` ... ```)
  const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)```/gi;
  let match;
  while ((match = codeBlockRegex.exec(text)) !== null) {
    candidates.push(match[1].trim());
  }

  // 2. Шаблон `json\n{...}` — модель без обратных кавычек
  const rawJsonMatch = text.match(/json\s*[\r\n]+(\{[\s\S]*\}|\[[\s\S]*\])/i);
  if (rawJsonMatch) candidates.push(rawJsonMatch[1].trim());

  // 3/4. Самый крупный объект / массив
  const braceMatch = text.match(/\{[\s\S]*\}/);
  if (braceMatch) candidates.push(braceMatch[0].trim());

  const bracketMatch = text.match(/\[[\s\S]*\]/);
  if (bracketMatch) candidates.push(bracketMatch[0].trim());

  // 5. Сырой текст
  candidates.push(text.trim());

  // Дедупликация с сохранением порядка
  return [...new Set(candidates)].filter(Boolean);
}

/**
 * Экранирует неэкранированные двойные кавычки внутри строковых значений JSON.
 * Эвристика: кавычка считается синтаксической, если рядом стоят структурные
 * символы ({ [ , : } ]), иначе она — содержимое строки и требует экранирования.
 *
 * Перенесено из bot-utils.fixUnescapedQuotes без изменений логики.
 */
export function fixUnescapedQuotes(json: string): string {
  let result = '';
  const len = json.length;

  for (let i = 0; i < len; i++) {
    const char = json[i];

    if (char === '"') {
      // Уже экранирована?
      if (i > 0 && json[i - 1] === '\\') {
        result += char;
        continue;
      }

      // Предыдущий значимый символ (пропускаем пробелы)
      let prevNonWhitespace = '';
      for (let j = i - 1; j >= 0; j--) {
        if (!/\s/.test(json[j])) {
          prevNonWhitespace = json[j];
          break;
        }
      }

      // Следующий значимый символ
      let nextNonWhitespace = '';
      for (let j = i + 1; j < len; j++) {
        if (!/\s/.test(json[j])) {
          nextNonWhitespace = json[j];
          break;
        }
      }

      const isSyntactic =
        ['{', '[', ',', ':'].includes(prevNonWhitespace) ||
        [':', ',', '}', ']', ''].includes(nextNonWhitespace);

      result += isSyntactic ? char : '\\"';
    } else {
      result += char;
    }
  }

  return result;
}

/**
 * Пытается закрыть открытые фигурные/квадратные скобки (и строки) в обрезанном JSON.
 * Перенесено из bot-utils.repairJson.
 */
export function repairJson(json: string): string {
  let text = json.trim();
  const stack: string[] = [];
  let inString = false;
  let escaped = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === '\\') {
      escaped = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (char === '{') stack.push('}');
      else if (char === '[') stack.push(']');
      else if (char === '}') {
        if (stack[stack.length - 1] === '}') stack.pop();
      } else if (char === ']') {
        if (stack[stack.length - 1] === ']') stack.pop();
      }
    }
  }

  let result = text;
  if (inString) {
    result += '"';
  }
  result = result.replace(/,\s*$/, '');

  return result + stack.reverse().join('');
}

/**
 * Опция self-heal: если ни один кандидат не распарсился, можно попросить
 * саму модель переизлучить валидный JSON. Провайдеры передают сюда функцию,
 * вызывающую модель в той же сессии.
 */
export interface SelfHealOptions {
  /** Максимум попыток self-heal (по умолчанию 0 — выключено). */
  maxAttempts?: number;
  /** Функция, которой передаётся сырой текст и которая возвращает исправленный. */
  heal?: (rawText: string, attempt: number) => Promise<string>;
}

/**
 * Применяет к кандидату весь арсенал восстановления и пытается распарсить.
 * Возвращает распарсенный объект или бросает ошибку.
 */
function tryParseCandidate<T>(candidate: string): T {
  let cleaned = candidate;

  // A. Прямой парсинг
  try {
    return JSON.parse(cleaned);
  } catch { /* дальше */ }

  // B. Экранирование кавычек внутри HTML-атрибутов (author="Name" -> author=\"Name\")
  cleaned = cleaned.replace(/(\s[a-z-]+)="([^"]+)"/gi, '$1=\\"$2\\"');

  // C. Восстановление неэкранированных кавычек в строках
  cleaned = fixUnescapedQuotes(cleaned);

  // D. Прямой парсинг после C
  try {
    return JSON.parse(cleaned);
  } catch { /* дальше */ }

  // E. Закрытие незакрытых скобок + парсинг
  const repaired = repairJson(cleaned);
  try {
    return JSON.parse(repaired);
  } catch { /* дальше */ }

  throw new Error('candidate parse failed');
}

/**
 * Единая точка парсинга JSON от LLM с восстановлением.
 *
 * Стратегия: извлечь всех кандидатов → для каждого применить арсенал
 * восстановления → если всё провалилось и задан `onSelfHeal`, попросить
 * модель исправить и повторить.
 *
 * @example базовое использование
 *   const data = parseWithRepair<MyType>(rawText);
 *
 * @example с self-heal через модель
 *   const data = parseWithRepair(rawText, {
 *     maxAttempts: 2,
 *     heal: (raw) => provider.askInSession(`Исправь JSON: ${raw}`),
 *   });
 */
export async function parseWithRepair<T>(
  text: string,
  options: SelfHealOptions = {},
): Promise<T> {
  const { maxAttempts = 0, heal } = options;

  // Фаза 1: попытка распарсить кандидатов из исходного текста.
  try {
    return parseCandidates<T>(extractJsonCandidates(text));
  } catch {
    // Падаем в self-heal, если он включён.
  }

  // Фаза 2: self-heal через модель (если провайдер его предоставляет).
  if (heal && maxAttempts > 0) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      let healedRaw: string;
      try {
        healedRaw = await heal(text, attempt);
      } catch (e) {
        // Сбой запроса к модели — продолжаем, но без новых кандидатов.
        continue;
      }
      try {
        return parseCandidates<T>(extractJsonCandidates(healedRaw));
      } catch {
        // Продолжаем retry.
      }
    }
  }

  // Финальный провал: диагностика.
  console.error('❌ ОШИБКА ПАРСИНГА AI JSON. Сырой текст (первые 500 символов):');
  console.error(text.substring(0, 500) + (text.length > 500 ? '...' : ''));
  throw new Error('Failed to parse AI JSON after all repair strategies.');
}

/** Пытается распарсить первого подходящего кандидата. */
function parseCandidates<T>(candidates: string[]): T {
  let lastError: unknown = null;
  for (const candidate of candidates) {
    try {
      return tryParseCandidate<T>(candidate);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError ?? new Error('No JSON candidates to parse.');
}
