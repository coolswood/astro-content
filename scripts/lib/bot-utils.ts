import fs from 'fs/promises';
import path from 'path';
import { spawnSync } from 'child_process';

export async function listJsonFiles(dirPath: string): Promise<string[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => entry.name);
}

/**
 * Checks if a file is uncommitted in git.
 */
export function isUncommitted(filePath: string): boolean {
  try {
    const result = spawnSync('git', ['status', '--porcelain', filePath], {
      encoding: 'utf-8',
    });
    
    // Процесс не запустился (например, команды git нет в системе)
    if (result.error) {
      return true;
    }
    
    // Команда завершилась с ошибкой (например, репозиторий не инициализирован)
    if (result.status !== 0) {
      return true;
    }
    
    // If output is not empty, it means the file is either modified, untracked, or staged.
    return !!result.stdout?.trim();
  } catch {
    // Страховка на случай непредвиденных исключений
    return true;
  }
}

/**
 * Parses common CLI arguments for Gemini bots.
 * Supports both positional and named arguments (--file, --lang, --chunk, --provider, --exclude).
 */
export function parseBotArgs() {
  const args: Record<string, string> = {};
  const positional: string[] = [];

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--')) {
      const nextArg = process.argv[i + 1];
      if (nextArg && !nextArg.startsWith('--')) {
        args[arg.slice(2)] = nextArg;
        i++;
      } else {
        args[arg.slice(2)] = 'true';
      }
    } else {
      positional.push(arg);
    }
  }

  const fileName = args.file || args.filename || positional[0] || 'start.json';
  const targetLang = (args.lang || args.language || positional[1] || 'pt_br')
    .toLowerCase()
    .replace('-', '_');
  const chunkSize = parseInt(args.chunk || args.chunkSize || positional[2] || '80');
  const provider = (args.provider || args.adapter || positional[3] || 'chatgpt').toLowerCase() as 'gemini' | 'chatgpt' | 'claude' | 'mistral';
  
  const excludeStr = args.exclude || args.skip || positional[4] || '';
  const excludeStages = excludeStr ? excludeStr.split(',').map(Number) : [];

  const modesStr = args.modes || args.levels || '';
  const intelligenceLevels = modesStr ? modesStr.split(',').map(Number) : [2, 2, 3];

  return { fileName, targetLang, chunkSize, provider, excludeStages, intelligenceLevels };
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
    await fs.access(i18nFilePath);
  } catch {
    try {
      await fs.access(scriptsFilePath);
      ruPath = scriptsFilePath;
    } catch {
      // Keep i18nFilePath as default
    }
  }

  let isDirectory = false;
  try {
    const stats = await fs.stat(ruPath);
    isDirectory = stats.isDirectory();
  } catch {
    // File or directory does not exist
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
    isDirectory,
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

// ─────────────────────────────────────────────────────────────────────────────
// JSON-repair (fixUnescapedQuotes / repairJson) переехал в ./json-repair.ts.
// Реэкспорт сохранён для обратной совместимости со старыми импортами.
// Новый код должен импортировать напрямую из json-repair (parseWithRepair).
// safeParseAIJson удалён — он был синхронным legacy-API; используйте async
// parseWithRepair из json-repair.
// ─────────────────────────────────────────────────────────────────────────────
export { fixUnescapedQuotes, repairJson } from './json-repair.js';
