import fs from 'fs/promises';
import path from 'path';
import { spawnSync } from 'child_process';

/**
 * Parses common CLI arguments for Gemini bots.
 */
export function parseBotArgs() {
  const fileName = process.argv[2] || 'start.json';
  const targetLang = (process.argv[3] || 'pt_br')
    .toLowerCase()
    .replace('-', '_');
  const chunkSize = parseInt(process.argv[4] || '80');
  const provider = (process.argv[5] || 'gemini').toLowerCase() as 'gemini' | 'chatgpt';

  return { fileName, targetLang, chunkSize, provider };
}

/**
 * Resolves all necessary paths for the bot.
 */
export async function resolveBotPaths(fileName: string, targetLang: string) {
  const cwd = process.cwd();
  
  // Source path with fallback (primarily for gemini-ui-bot)
  const scriptsFilePath = path.join(cwd, 'scripts', fileName);
  const i18nFilePath = path.join(cwd, 'src/i18n/ru', fileName);
  
  let ruPath = i18nFilePath;
  try {
    await fs.access(scriptsFilePath);
    ruPath = scriptsFilePath;
  } catch {
    // Keep i18nFilePath as default
  }

  const targetDir = path.join(cwd, 'src/i18n', targetLang);
  const targetPath = path.join(targetDir, fileName);
  
  const langPromptsDir = path.join(cwd, 'scripts/prompts', targetLang);
  const glossaryPath = path.join(langPromptsDir, 'glossary.json');
  const partialGlossaryPath = path.join(langPromptsDir, 'partial_glossary.json');
  const partialPath = path.join(langPromptsDir, `partial_${fileName}`);

  return {
    ruPath,
    targetDir,
    targetPath,
    langPromptsDir,
    glossaryPath,
    partialGlossaryPath,
    partialPath,
  };
}

/**
 * Runs validation scripts and logs results.
 */
export function runBotValidation(targetLang: string) {
  console.log('\n🔍 Запуск финальной валидации...');

  console.log('--- Проверка символов (check-translations.ts) ---');
  const checkResult = spawnSync('bun', ['check-translations.ts', targetLang], {
    encoding: 'utf-8',
  });
  console.log(checkResult.stdout || checkResult.stderr);
  if (checkResult.status !== 0) {
    console.warn('⚠️ Валидация символов не прошла!');
  }

  console.log('--- Проверка структуры (list-problematic-files.ts) ---');
  const structResult = spawnSync('bun', ['list-problematic-files.ts', targetLang], {
    encoding: 'utf-8',
  });
  console.log(structResult.stdout || structResult.stderr);
  if (structResult.status !== 0) {
    console.warn('⚠️ Валидация структуры JSON не прошла!');
  }

  console.log('\n🚀 Процесс валидации завершен.');
}
