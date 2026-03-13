import fs from 'fs/promises';
import type { GlossaryItem } from './types.js';

/**
 * Loads a glossary JSON file and returns its items.
 * Returns an empty array if the file is not found or is invalid.
 */
export async function loadGlossary(
  glossaryPath: string,
): Promise<GlossaryItem[]> {
  try {
    const data = JSON.parse(await fs.readFile(glossaryPath, 'utf-8'));
    if (Array.isArray(data) && data.length > 0) {
      console.log(`📚 Загружен глоссарий: ${data.length} терминов из ${glossaryPath}`);
      return data.map((item: any) => {
        const langValue = item.lang || item.pt_br || '';
        if (!langValue) {
          console.warn(`⚠️ Проблема с термином "${item.ru}": перевод не найден (ни в lang, ни в pt_br)`);
        }
        return {
          ru: item.ru,
          lang: langValue,
          context: item.context || ''
        };
      });
    }
  } catch {
    console.log(`⚠️ Глоссарий не найден или пуст: ${glossaryPath}`);
  }
  return [];
}

/**
 * Formats an array of glossary items into a printable string.
 */
export function formatGlossary(glossary: GlossaryItem[]): string {
  return glossary.length > 0
    ? glossary.map((g) => `- ${g.ru}: ${g.lang}`).join('\n')
    : 'Пусто.';
}

/**
 * Merges new glossary items into the global glossary, avoiding duplicates.
 */
export function mergeGlossary(
  global: GlossaryItem[],
  incoming: GlossaryItem[] | undefined | null,
): GlossaryItem[] {
  if (!incoming || !Array.isArray(incoming)) return global;
  const merged = [...global];
  for (const item of incoming) {
    if (!merged.some((g) => g.ru.toLowerCase() === item.ru.toLowerCase())) {
      merged.push(item);
    }
  }
  return merged;
}
