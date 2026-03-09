import fs from 'fs/promises';
import path from 'path';

const PROMPTS_DIR = path.join(process.cwd(), 'scripts/prompts');

/**
 * Loads a base prompt template and injects the language style block.
 *
 * Base templates live in:   prompts/base/<type>/<name>.txt
 * Language style lives in:  prompts/<lang>/style.txt
 *
 * Placeholders replaced:
 *   {{LANG_STYLE}}     — content of the language style file
 *   {{TARGET_LANG}}    — language name extracted from style file (TARGET_LANG line)
 *   {{TARGET_MARKET}}  — market name extracted from style file (TARGET_MARKET line)
 *   {{GLOSSARY}}       — injected by the caller script
 *
 * @param type      - 'text' or 'ui'
 * @param name      - 'main', 'editor', or 'tech'
 * @param lang      - language code, e.g. 'pt-BR'
 */
export async function loadPrompt(
  type: 'text' | 'ui',
  name: string,
  lang: string,
): Promise<string> {
  const basePath = path.join(PROMPTS_DIR, 'base', type, `${name}.txt`);
  const stylePath = path.join(PROMPTS_DIR, lang, 'style.txt');

  const [baseTemplate, styleContent] = await Promise.all([
    fs.readFile(basePath, 'utf-8'),
    fs.readFile(stylePath, 'utf-8'),
  ]);

  // Extract TARGET_LANG and TARGET_MARKET from style file header
  const targetLangMatch = styleContent.match(/^TARGET_LANG:\s*(.+)$/m);
  const targetMarketMatch = styleContent.match(/^TARGET_MARKET:\s*(.+)$/m);
  const targetLang = targetLangMatch?.[1]?.trim() ?? lang;
  const targetMarket = targetMarketMatch?.[1]?.trim() ?? lang;

  return baseTemplate
    .replace('{{LANG_STYLE}}', styleContent)
    .replace(/\{\{TARGET_LANG\}\}/g, targetLang)
    .replace(/\{\{TARGET_MARKET\}\}/g, targetMarket);
}
