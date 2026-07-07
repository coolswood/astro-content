import fs from 'fs/promises';
import path from 'path';

const PROMPTS_DIR = path.join(process.cwd(), 'scripts/prompts');

/**
 * Canonical list of target languages for multi-lang (keys) workflows.
 * Order matters: it is the single source of truth for the {{TARGET_LANGS}}
 * placeholder and for batching in gemini-translate-keys.ts.
 */
export const ALL_TARGET_LANGS: readonly string[] = [
  'ar', 'cs', 'de', 'en', 'es', 'fr', 'he', 'id', 'it', 'ja',
  'ko', 'nl', 'pl', 'pt_BR', 'pt', 'sv', 'tr', 'uk',
];

/**
 * Human-readable (Russian) names for each target language code.
 * Used to render the {{TARGET_LANGS}} bullet list.
 */
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
 * Loads a base prompt template and injects the language style block.
 *
 * Base templates live in:   prompts/base/<type>/<name>.txt
 * Language style lives in:  prompts/<lang>/style.txt
 *
 * Placeholders replaced:
 *   {{LANG_STYLE}}     — content of the language style file(s)
 *   {{TARGET_LANGS}}   — bullet list of target languages (codes + Russian names)
 *   {{TARGET_LANG}}    — language name extracted from style file (TARGET_LANG line)
 *   {{TARGET_MARKET}}  — market name extracted from style file (TARGET_MARKET line)
 *   {{GLOSSARY}}       — injected by the caller script
 *
 * @param type      - 'text', 'ui', or 'keys'
 * @param name      - 'main', 'editor', or 'tech'
 * @param lang      - language code (e.g. 'pt_br'), 'all', or an array of codes
 *                    for an aggregated multi-language block (used by keys batching).
 */
export async function loadPrompt(
  type: 'text' | 'ui' | 'keys',
  name: string,
  lang: string | string[],
): Promise<string> {
  const basePath = path.join(PROMPTS_DIR, 'base', type, `${name}.txt`);
  const baseTemplate = await fs.readFile(basePath, 'utf-8');

  // Resolve the concrete list of language codes to build styles for.
  // - 'all'        → every catalog dir with a style.txt (legacy readdir order)
  // - string       → single language (raw style, no per-lang header wrapper)
  // - string[]     → explicit subset (aggregated block with per-lang headers)
  const isAggregated = lang === 'all' || Array.isArray(lang);
  const isSingle = !isAggregated;

  let langCodes: string[];
  if (lang === 'all') {
    const dirs = await fs.readdir(PROMPTS_DIR, { withFileTypes: true });
    langCodes = dirs
      .filter((d) => d.isDirectory() && d.name !== 'base' && d.name !== 'all')
      .map((d) => d.name);
  } else if (Array.isArray(lang)) {
    langCodes = [...lang];
  } else {
    langCodes = [lang];
  }

  // Read style.txt for each language (missing files are silently skipped).
  const styleEntries: { code: string; content: string }[] = [];
  for (const code of langCodes) {
    const sPath = path.join(PROMPTS_DIR, code, 'style.txt');
    try {
      const sContent = await fs.readFile(sPath, 'utf-8');
      styleEntries.push({ code, content: sContent });
    } catch {
      // Skip if no style file
    }
  }

  let styleContent = '';
  if (isAggregated) {
    // Multi-language block with explicit per-language headers so the model
    // knows which rules apply to which target language.
    const blocks = styleEntries.map(
      ({ code, content }) => `### ПРАВИЛА ДЛЯ ЯЗЫКА [${code}]:\n${content}\n---\n`,
    );
    if (blocks.length > 0) {
      styleContent =
        'СПЕЦИФИЧЕСКИЕ ПРАВИЛА ДЛЯ ЦЕЛЕВЫХ ЯЗЫКОВ (ОБЯЗАТЕЛЬНО К ВЫПОЛНЕНИЮ ДЛЯ КАЖДОГО СООТВЕТСТВУЮЩЕГО ЯЗЫКА):\n\n' +
        blocks.join('\n');
    }
  } else {
    // Single language: raw style content, no wrapper.
    styleContent = styleEntries[0]?.content ?? '';
  }

  // Render {{TARGET_LANGS}} bullet list:
  // - 'all' → all canonical langs (deterministic ALL_TARGET_LANGS order)
  // - array → only the requested langs, in the given order
  // - single → just that one lang
  const targetLangsList = (lang === 'all' ? [...ALL_TARGET_LANGS] : langCodes)
    .map((code) => `- ${code} (${LANG_NAMES[code] ?? code})`)
    .join('\n');

  // Extract TARGET_LANG and TARGET_MARKET from style file header.
  // (Meaningful for single-lang prompts; for aggregated blocks the regex
  //  simply matches the first style's header, which is harmless.)
  const targetLangMatch = styleContent.match(/^TARGET_LANG:\s*(.+)$/m);
  const targetMarketMatch = styleContent.match(/^TARGET_MARKET:\s*(.+)$/m);
  const langForFallback = Array.isArray(lang) ? lang[0] : lang;
  const targetLang = targetLangMatch?.[1]?.trim() ?? langForFallback;
  const targetMarket = targetMarketMatch?.[1]?.trim() ?? langForFallback;

  let content = baseTemplate
    .replace('{{LANG_STYLE}}', styleContent)
    .replace('{{TARGET_LANGS}}', targetLangsList);

  // Resolve {{INCLUDE:fileName}}
  const fragmentsDir = path.join(PROMPTS_DIR, 'base', 'fragments');
  const visited = new Set<string>();
  visited.add(path.resolve(basePath));

  async function resolveIncludes(text: string, currentVisited: Set<string>): Promise<string> {
    const includeRegex = /\{\{INCLUDE:\s*(.+?)\s*\}\}/g;
    let match;
    let result = text;
    
    while ((match = includeRegex.exec(result)) !== null) {
      const fileName = match[1];
      const filePath = path.resolve(fragmentsDir, fileName);

      // 1. Проверка Path Traversal
      if (!filePath.startsWith(fragmentsDir)) {
        throw new Error(`Insecure include path: ${fileName} in prompt template`);
      }

      // 2. Проверка зацикливания
      if (currentVisited.has(filePath)) {
        throw new Error(`Circular include detected: ${fileName}`);
      }

      // 3. Чтение файла (ошибка чтения выбросит исключение)
      const fragmentContent = await fs.readFile(filePath, 'utf-8');

      const nextVisited = new Set(currentVisited);
      nextVisited.add(filePath);

      // Рекурсивный вызов для вложенных инклюдов
      const resolvedFragment = await resolveIncludes(fragmentContent, nextVisited);

      result = result.replace(match[0], resolvedFragment);
      includeRegex.lastIndex = 0;
    }
    return result;
  }

  content = await resolveIncludes(content, visited);

  return content
    .replace(/\{\{TARGET_LANG\}\}/g, targetLang)
    .replace(/\{\{TARGET_MARKET\}\}/g, targetMarket);
}
