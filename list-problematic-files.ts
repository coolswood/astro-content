#!/usr/bin/env bun
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join, relative, extname } from 'path';

function getAllJsonFiles(dir: string): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) {
    return files;
  }

  function traverse(currentDir: string) {
    const items = readdirSync(currentDir);

    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (extname(item) === '.json') {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files.sort();
}

function parseJsonFile(filePath: string): any | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

function shouldIgnorePath(path: string): boolean {
  // Игнорируем поле instagram на любом уровне вложенности
  return path === 'instagram' || path.endsWith('.instagram');
}

function shouldCheckArrayLength(path: string, isStory: boolean): boolean {
  if (!isStory) {
    return true;
  }
  // В историях разрешаем разную длину только для текстовых блоков повествования
  return !path.endsWith('.texts');
}

function compareStructure(
  value1: any,
  value2: any,
  path: string = '',
  isStory: boolean = false,
): string[] {
  const errors: string[] = [];

  if (shouldIgnorePath(path)) {
    return errors;
  }

  if (value1 === null && value2 === null) {
    return errors;
  }

  if (value1 === null || value2 === null) {
    errors.push(`[${path}] One of values is null`);
    return errors;
  }

  const type1 = typeof value1;
  const type2 = typeof value2;

  if (type1 !== type2) {
    errors.push(`[${path}] Type mismatch: ${type1} vs ${type2}`);
    return errors;
  }

  if (type1 === 'object' && !Array.isArray(value1) && !Array.isArray(value2)) {
    const keys1 = Object.keys(value1).sort();
    const keys2 = Object.keys(value2).sort();

    // Фильтруем ключи, исключая instagram
    const filteredKeys1 = keys1.filter(
      (key) => !shouldIgnorePath(path ? `${path}.${key}` : key),
    );
    const filteredKeys2 = keys2.filter(
      (key) => !shouldIgnorePath(path ? `${path}.${key}` : key),
    );

    // Проверяем наличие всех ключей
    for (const key of filteredKeys1) {
      if (!filteredKeys2.includes(key)) {
        errors.push(
          `[${path ? path + '.' : ''}${key}] Missing key in target file`,
        );
      }
    }

    for (const key of filteredKeys2) {
      if (!filteredKeys1.includes(key)) {
        errors.push(
          `[${path ? path + '.' : ''}${key}] Extra key in target file`,
        );
      }
    }

    // Рекурсивно проверяем общие ключи
    const commonKeys = filteredKeys1.filter((key) =>
      filteredKeys2.includes(key),
    );
    for (const key of commonKeys) {
      const newPath = path ? `${path}.${key}` : key;
      errors.push(...compareStructure(value1[key], value2[key], newPath, isStory));
    }
  } else if (Array.isArray(value1) && Array.isArray(value2)) {
    if (shouldCheckArrayLength(path, isStory) && value1.length !== value2.length) {
      errors.push(
        `[${path}] Array length mismatch: ${value1.length} vs ${value2.length}`,
      );
    }

    const minLength = Math.min(value1.length, value2.length);
    for (let i = 0; i < minLength; i++) {
      errors.push(
        ...compareStructure(value1[i], value2[i], `${path}[${i}]`, isStory),
      );
    }
  }

  return errors;
}

function getProblematicFiles(
  sourceLang: string,
  targetLang: string,
): Map<string, string[]> {
  const sourceDir = `src/i18n/${sourceLang}`;
  const targetDir = `src/i18n/${targetLang}`;

  if (!existsSync(sourceDir)) {
    console.error(`❌ Исходная директория не найдена: ${sourceDir}`);
    process.exit(1);
  }

  if (!existsSync(targetDir)) {
    console.error(`❌ Целевая директория не найдена: ${targetDir}`);
    process.exit(1);
  }

  const sourceFiles = getAllJsonFiles(sourceDir);
  const targetFiles = getAllJsonFiles(targetDir);
  const problematicFiles = new Map<string, string[]>();

  for (const sourceFile of sourceFiles) {
    const relativePath = relative(sourceDir, sourceFile);
    const targetFile = join(targetDir, relativePath);

    if (!existsSync(targetFile)) {
      problematicFiles.set(relativePath, ['File missing in target language']);
      continue;
    }

    const sourceJson = parseJsonFile(sourceFile);
    const targetJson = parseJsonFile(targetFile);

    if (sourceJson === null) {
      problematicFiles.set(relativePath, ['Failed to parse source JSON']);
      continue;
    }
    if (targetJson === null) {
      problematicFiles.set(relativePath, ['Failed to parse target JSON']);
      continue;
    }

    const isStory = relativePath.startsWith('story/') || relativePath.includes('/story/');
    const errors = compareStructure(sourceJson, targetJson, '', isStory);
    if (errors.length > 0) {
      problematicFiles.set(relativePath, errors);
    }
  }

  for (const targetFile of targetFiles) {
    const relativePath = relative(targetDir, targetFile);
    const sourceFile = join(sourceDir, relativePath);

    if (!existsSync(sourceFile)) {
      problematicFiles.set(relativePath, ['Extra file in target language']);
    }
  }

  return problematicFiles;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.log('Использование: bun list-problematic-files.ts <язык>');
    console.log('Пример: bun list-problematic-files.ts de');
    process.exit(1);
  }

  const targetLang = args[0];
  const sourceLang = 'ru';

  console.log(`🔍 Поиск структурных проблем: ${sourceLang} → ${targetLang}`);
  console.log('');

  const problematicFiles = getProblematicFiles(sourceLang, targetLang);

  if (problematicFiles.size === 0) {
    console.log(`✅ Все файлы имеют корректную структуру`);
  } else {
    console.log(
      `❌ Найдено ${problematicFiles.size} файлов с проблемами в структуре:`,
    );
    console.log('');

    const sortedPaths = Array.from(problematicFiles.keys()).sort();

    for (const file of sortedPaths) {
      const errors = problematicFiles.get(file)!;
      console.log(`📄 ${file}`);
      for (const err of errors) {
        console.log(`   ⚠️ ${err}`);
      }
      console.log('');
    }

    console.log(`📁 Всего проблемных файлов: ${problematicFiles.size}`);
    process.exit(1);
  }
}

if (import.meta.main) {
  main();
}
