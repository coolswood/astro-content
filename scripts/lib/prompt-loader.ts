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

  let content = baseTemplate.replace('{{LANG_STYLE}}', styleContent);

  // Resolve {{INCLUDE:fileName}}
  const fragmentsDir = path.join(PROMPTS_DIR, 'base', 'fragments');
  
  async function resolveIncludes(text: string): Promise<string> {
    const includeRegex = /\{\{INCLUDE:\s*(.+?)\s*\}\}/g;
    let match;
    let result = text;
    
    // We use a while loop to support nested includes if needed
    while ((match = includeRegex.exec(result)) !== null) {
      const fileName = match[1];
      const filePath = path.join(fragmentsDir, fileName);
      try {
        const fragmentContent = await fs.readFile(filePath, 'utf-8');
        result = result.replace(match[0], fragmentContent);
        // Reset regex state to catch new includes in the inserted content
        includeRegex.lastIndex = 0;
      } catch (e) {
        console.warn(`⚠️ Fragment not found: ${fileName} at ${filePath}`);
        result = result.replace(match[0], `(MISSING INCLUDE: ${fileName})`);
      }
    }
    return result;
  }

  content = await resolveIncludes(content);

  return content
    .replace(/\{\{TARGET_LANG\}\}/g, targetLang)
    .replace(/\{\{TARGET_MARKET\}\}/g, targetMarket);
}
