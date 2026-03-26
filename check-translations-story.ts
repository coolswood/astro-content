#!/usr/bin/env bun
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join, extname } from 'path';
import { validateValue } from './scripts/lib/translation-validator.js';

/**
 * Script to check i18n JSON files for foreign characters.
 * Usage: bun check-translations.ts <lang_code>
 */

const langCode = process.argv[2];

if (!langCode) {
  console.error(
    '❌ Please provide a language code. Example: bun check-translations.ts ko',
  );
  process.exit(1);
}

const targetDir = join('src', 'i18n', langCode);

if (!existsSync(targetDir)) {
  console.error(`❌ Directory not found: ${targetDir}`);
  process.exit(1);
}

// Use shared validator logic

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
      }
      else if (extname(item) === '.json') files.push(fullPath);
    }
  }
  traverse(dir);
  return files;
}

function checkValue(value: any, filePath: string): string[] {
  return validateValue(value, langCode);
}

const files = getAllJsonFiles(targetDir);

console.log(`🔍 Checking language: ${langCode} (${targetDir})`);
console.log(`-------------------------------------------`);

for (const file of files) {
  try {
    const data = JSON.parse(readFileSync(file, 'utf-8'));
    const errors = checkValue(data, file);

    if (errors.length > 0) {
      problematicFiles.push(file);
      console.log(`❌ ${file}`);
      const uniqueErrors = [...new Set(errors)];
      uniqueErrors.forEach((err) => {
        console.log(`   found: "${err}"`);
        totalErrors++;
      });
    }
  } catch (e) {
    console.error(`⚠️ Could not parse JSON: ${file}`);
  }
}

console.log(`-------------------------------------------`);
if (problematicFiles.length === 0) {
  console.log(`✅ No foreign characters found in ${langCode} translations.`);
} else {
  console.log(`Summary:`);
  console.log(`- Files with errors: ${problematicFiles.length}`);
  console.log(`- Total problematic words: ${totalErrors}`);
  process.exit(1);
}
