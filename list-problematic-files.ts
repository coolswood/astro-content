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

function compareStructure(value1: any, value2: any, path: string = ''): boolean {
  if (shouldIgnorePath(path)) {
    return true;
  }

  if (value1 === null && value2 === null) {
    return true;
  }

  if (value1 === null || value2 === null) {
    return false;
  }

  const type1 = typeof value1;
  const type2 = typeof value2;

  if (type1 !== type2) {
    return false;
  }

  if (type1 === 'object' && !Array.isArray(value1) && !Array.isArray(value2)) {
    const keys1 = Object.keys(value1).sort();
    const keys2 = Object.keys(value2).sort();

    // Фильтруем ключи, исключая instagram
    const filteredKeys1 = keys1.filter(key => !shouldIgnorePath(path ? `${path}.${key}` : key));
    const filteredKeys2 = keys2.filter(key => !shouldIgnorePath(path ? `${path}.${key}` : key));

    // Проверяем наличие всех ключей
    for (const key of filteredKeys1) {
      if (!filteredKeys2.includes(key)) {
        return false;
      }
    }

    for (const key of filteredKeys2) {
      if (!filteredKeys1.includes(key)) {
        return false;
      }
    }

    // Рекурсивно проверяем общие ключи
    const commonKeys = filteredKeys1.filter(key => filteredKeys2.includes(key));
    for (const key of commonKeys) {
      const newPath = path ? `${path}.${key}` : key;
      if (!compareStructure(value1[key], value2[key], newPath)) {
        return false;
      }
    }
  } else if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false;
    }

    const minLength = Math.min(value1.length, value2.length);
    for (let i = 0; i < minLength; i++) {
      if (!compareStructure(value1[i], value2[i], `${path}[${i}]`)) {
        return false;
      }
    }
  }

  return true;
}

function getProblematicFiles(sourceLang: string, targetLang: string): string[] {
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
  const problematicFiles: string[] = [];

  for (const sourceFile of sourceFiles) {
    const relativePath = relative(sourceDir, sourceFile);
    const targetFile = join(targetDir, relativePath);

    if (!existsSync(targetFile)) {
      problematicFiles.push(relativePath);
      continue;
    }

    const sourceJson = parseJsonFile(sourceFile);
    const targetJson = parseJsonFile(targetFile);

    if (sourceJson === null || targetJson === null) {
      problematicFiles.push(relativePath);
      continue;
    }

    if (!compareStructure(sourceJson, targetJson)) {
      problematicFiles.push(relativePath);
    }
  }

  for (const targetFile of targetFiles) {
    const relativePath = relative(targetDir, targetFile);
    const sourceFile = join(sourceDir, relativePath);

    if (!existsSync(sourceFile)) {
      problematicFiles.push(relativePath);
    }
  }

  return problematicFiles.sort();
}

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.log('Использование: bun list-problematic-files.ts <язык>');
    console.log('Пример: bun list-problematic-files.ts de');
    console.log('');
    console.log('Примечание: Этот скрипт выводит только список файлов с проблемами в структуре');
    console.log('(игнорируя различия в поле "instagram")');
    process.exit(1);
  }

  const targetLang = args[0];
  const sourceLang = 'ru';

  console.log(`🔍 Поиск проблемных файлов: ${sourceLang} → ${targetLang}`);
  console.log('');

  const problematicFiles = getProblematicFiles(sourceLang, targetLang);

  if (problematicFiles.length === 0) {
    console.log(`✅ Все файлы имеют корректную структуру`);
  } else {
    console.log(`❌ Найдено ${problematicFiles.length} файлов с проблемами в структуре:`);
    console.log('');

    for (const file of problematicFiles) {
      console.log(file);
    }

    console.log('');
    console.log(`📁 Всего проблемных файлов: ${problematicFiles.length}`);
  }
}

if (import.meta.main) {
  main();
}