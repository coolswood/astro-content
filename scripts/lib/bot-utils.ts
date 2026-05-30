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
  const provider = (args.provider || args.adapter || positional[3] || 'gemini').toLowerCase() as 'gemini' | 'chatgpt' | 'claude' | 'mistral';
  
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

export function fixUnescapedQuotes(json: string): string {
  let result = '';
  const len = json.length;
  
  for (let i = 0; i < len; i++) {
    const char = json[i];
    
    if (char === '"') {
      // Проверяем, не экранирована ли она уже
      if (i > 0 && json[i - 1] === '\\') {
        result += char;
        continue;
      }
      
      // Ищем предыдущий значимый символ (пропуская пробелы)
      let prevNonWhitespace = '';
      for (let j = i - 1; j >= 0; j--) {
        if (!/\s/.test(json[j])) {
          prevNonWhitespace = json[j];
          break;
        }
      }
      
      // Ищем следующий значимый символ (пропуская пробелы)
      let nextNonWhitespace = '';
      for (let j = i + 1; j < len; j++) {
        if (!/\s/.test(json[j])) {
          nextNonWhitespace = json[j];
          break;
        }
      }
      
      const isSyntactic = 
        ['{', '[', ',', ':'].includes(prevNonWhitespace) ||
        [':', ',', '}', ']', ''].includes(nextNonWhitespace); // '' если конец строки
        
      if (isSyntactic) {
        result += char;
      } else {
        result += '\\"';
      }
    } else {
      result += char;
    }
  }
  
  return result;
}

/**
 * Пытается максимально корректно распарсить JSON, полученный от ИИ.
 * Включает экранирование кавычек в HTML-атрибутах и закрытие незакрытых скобок.
 */
export function safeParseAIJson<T>(text: string): T {
  // 1. Извлекаем основной блок JSON (между первой { или [ и последней } или ])
  const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  let cleanedText = match ? match[0] : text;

  // 2. Базовая очистка от лишнего markdown
  const markdownMatches = cleanedText.match(/^```json\s*[\s\S]*?\s*```$/i);
  if (markdownMatches) {
    cleanedText = cleanedText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '');
  } else {
    cleanedText = cleanedText.replace(/^```json/i, '').replace(/```$/i, '');
  }
  
  cleanedText = cleanedText.trim();

  // 3. Экранирование кавычек внутри HTML-атрибутов (например, author="Name" -> author=\"Name\")
  // Это частая ошибка моделей, которая ломает JSON
  cleanedText = cleanedText.replace(
    /(\s[a-z-]+)="([^"]+)"/gi,
    '$1=\\"$2\\"',
  );

  // 3.5. Исправление неэкранированных кавычек в строках JSON
  cleanedText = fixUnescapedQuotes(cleanedText);

  // 4. Попытка основного парсинга
  try {
    return JSON.parse(cleanedText);
  } catch (e) {
    // 5. Попытка лечения структуры (repairJson)
    try {
      const repaired = repairJson(cleanedText);
      return JSON.parse(repaired);
    } catch (e2) {
      console.error('❌ ОШИБКА ПАРСИНГА AI JSON. Текст после очистки:');
      console.error(cleanedText);
      throw new Error(`Failed to parse AI JSON: ${(e as Error).message}`);
    }
  }
}

/**
 * Пытается закрыть открытые фигурные и квадратные скобки (и строки) в обрезанном JSON.
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
  // Если мы остались внутри строки, закрываем её
  if (inString) {
    result += '"';
  }

  // Убираем возможную запятую в конце перед закрытием структур
  result = result.replace(/,\s*$/, '');

  // Закрываем скобки в обратном порядке
  return result + stack.reverse().join('');
}
