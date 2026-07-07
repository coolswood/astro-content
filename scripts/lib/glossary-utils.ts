import { readJsonOr } from './atomic-fs.js';
import type { GlossaryItem } from './types.js';

/**
 * Загружает глоссарий из JSON-файла.
 *
 * Возвращает пустой массив, если файл отсутствует (штатно). Если файл
 * повреждён — логирует предупреждение и тоже возвращает пустой массив
 * (прежде silent-catch маскировал corruption под «файл отсутствует»).
 *
 * Формат файла: массив объектов { ru, lang, context }. Обязательное поле
 * перевода — `lang` (название историческое; это перевод термина). Раньше был
 * хардкод-фолбек на `item.pt_br`, привязывавший «общую» утилиту к одному языку
 * — удалён; теперь только `lang`.
 */
export async function loadGlossary(
  glossaryPath: string,
): Promise<GlossaryItem[]> {
  const data = await readJsonOr<any[]>(glossaryPath, [], (err) => {
    console.warn(`⚠️ Глоссарий ${glossaryPath} повреждён (${err.message}).`);
  });

  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  console.log(`📚 Загружен глоссарий: ${data.length} терминов из ${glossaryPath}`);
  return data
    .filter((item: any) => item && typeof item === 'object')
    .map((item: any) => {
      const langValue = item.lang || '';
      if (!langValue) {
        console.warn(
          `⚠️ Термин "${item.ru}" без перевода (поле "lang" пустое) — будет без целевого значения.`,
        );
      }
      return {
        ru: item.ru ?? '',
        lang: langValue,
        context: item.context || '',
      };
    });
}

/**
 * Форматирует массив терминов глоссария в строку для вставки в промпт.
 */
export function formatGlossary(glossary: GlossaryItem[]): string {
  return glossary.length > 0
    ? glossary.map((g) => `- ${g.ru}: ${g.lang}`).join('\n')
    : 'Пусто.';
}

/**
 * Объединяет новые термины в глобальный глоссарий без дубликатов.
 *
 * Дедупликация по composite-ключу `ru` + `lang`: прежде дедуп был только по
 * `ru`, из-за чего термины с одинаковым русским оригиналом, но разными
 * переводами (контекстно-зависимые) терялись молча.
 */
export function mergeGlossary(
  global: GlossaryItem[],
  incoming: GlossaryItem[] | undefined | null,
): GlossaryItem[] {
  if (!incoming || !Array.isArray(incoming)) return global;
  const merged = [...global];
  for (const item of incoming) {
    const isDup = merged.some(
      (g) =>
        g.ru.toLowerCase() === item.ru.toLowerCase() &&
        g.lang.toLowerCase() === item.lang.toLowerCase(),
    );
    if (!isDup) {
      merged.push(item);
    }
  }
  return merged;
}
