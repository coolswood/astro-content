#!/usr/bin/env bun
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join, extname } from 'path';
import { validateValue } from './scripts/lib/lang-codes.js';

/**
 * Проверка переводов src/i18n/<lang> на «чужие» алфавиты.
 * Общая логика письменностей — scripts/lib/lang-codes.ts (SCRIPT_MAP).
 *
 * Usage: bun check-translations.ts <lang_code>
 */

const langCode = process.argv[2];

if (!langCode) {
  console.error(
    '❌ Укажите код языка. Пример: bun check-translations.ts ko',
  );
  process.exit(1);
}

const targetDir = join('src', 'i18n', langCode);

if (!existsSync(targetDir)) {
  console.error(`❌ Каталог не найден: ${targetDir}`);
  process.exit(1);
}

const problematicFiles: string[] = [];
let totalErrors = 0;

function getAllJsonFiles(dir: string): string[] {
  const files: string[] = [];
  function traverse(currentDir: string) {
    const items = readdirSync(currentDir);
    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (extname(item) === '.json') files.push(fullPath);
    }
  }
  traverse(dir);
  return files;
}

function checkValue(value: any): string[] {
  const errors: string[] = [];
  if (typeof value === 'string') {
    errors.push(...validateValue(value, langCode));
  } else if (Array.isArray(value)) {
    for (const item of value) {
      errors.push(...checkValue(item));
    }
  } else if (typeof value === 'object' && value !== null) {
    for (const key of Object.keys(value)) {
      errors.push(...checkValue(value[key]));
    }
  }
  return errors;
}

const files = getAllJsonFiles(targetDir);

console.log(`🔍 Проверка языка: ${langCode} (${targetDir})`);
console.log(`-------------------------------------------`);

for (const file of files) {
  try {
    const data = JSON.parse(readFileSync(file, 'utf-8'));
    const errors = checkValue(data);

    if (errors.length > 0) {
      problematicFiles.push(file);
      console.log(`❌ ${file}`);
      const uniqueErrors = [...new Set(errors)];
      uniqueErrors.forEach((err) => {
        console.log(`   найдено: "${err}"`);
        totalErrors++;
      });
    }
  } catch (e) {
    console.error(`⚠️ Не удалось распарсить JSON: ${file}`);
  }
}

console.log(`-------------------------------------------`);
if (problematicFiles.length === 0) {
  console.log(`✅ Чужих символов в переводах ${langCode} не найдено.`);
} else {
  console.log(`Итог:`);
  console.log(`- Файлов с ошибками: ${problematicFiles.length}`);
  console.log(`- Проблемных слов: ${totalErrors}`);
  process.exit(1);
}
