#!/usr/bin/env bun
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join, extname } from 'path';

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

// Basic allowed characters: Latin, Numbers, Spaces, Punctuation, Symbols
const BASE_ALLOWED = [
  'a-zA-Z', // Latin
  '0-9', // Digits
  '\\s', // Whitespace
  '\\p{P}', // Punctuation (includes hyphens, dots, brackets, etc.)
  '\\p{S}', // Symbols (includes math, currency, etc.)
  '\\u00A0', // Non-breaking space
  '\\u00AD', // Soft hyphen
  '«»„“""\'\'', // Common quotes
  '{}', // Template braces
  '<>', // HTML tags
  '\\x80-\\x9F', // C1 Control characters (ignored per user request)
].join('');

/**
 * Define language-specific allowed character ranges.
 */
const SCRIPT_MAP: Record<string, string> = {
  // Korean
  ko: '가-힣\\u1100-\\u11FF\\u3130-\\u318F\\uA960-\\uA97F\\uD7B0-\\uD7FF',
  // Ukrainian: Cyrilics excluding Russian-only chars (ы, э, ъ, ё)
  uk: "а-щьюяА-ЩЬЮЯіІїЇєЄґҐ'",
  // Russian
  ru: 'а-яА-ЯёЁ',
  // Turkish
  tr: 'çÇğĞıİöÖşŞüÜâÂîÎûÛïÏéÉïÏ',
  // Czech
  cs: 'áÁčČďĎéÉěĚíÍňŇóÓřŘšŠťŤúÚůŮýÝžŽïÏ',
  // Arabic
  ar: '\\p{Script=Arabic}\\u064B-\\u0652\\u0640', // Added Tanwin, Shadda, and Tatweel (ـ)
  // Hebrew
  he: '\\p{Script=Hebrew}\\u200E',
  // Japanese
  ja: '\\p{Script=Hiragana}\\p{Script=Katakana}\\p{Script=Han}\\u3000-\\u303F\\uFF01-\\uFFEF々\\u30fb\\u30fc\\u2460-\\u24FF\\u2700-\\u27BF\\uD83C-\\uDBFF\\uDC00-\\uDFFF\\u0030-\\u0039\\uFE0F\\u20E3', // Added Emojis/Symbols, Numbers and Keycap symbols
  // Indonesian
  id: 'éÉ',
  // Dutch
  nl: 'éÉëËïÏèÈêÊàÀâÂóÓöÖûÛçÇîÎüÜáÁ',
  // Portuguese
  pt: 'áÁàÀâÂãÃçÇéÉêÊíÍóÓôÔõÕúÚªºüÜïÏ',
  'pt-BR': 'áÁàÀâÂãÃçÇéÉêÊíÍóÓôÔõÕúÚªºüÜïÏ',
  pt_br: 'áÁàÀâÂãÃçÇéÉêÊíÍóÓôÔõÕúÚªºüÜïÏ',
  // French
  fr: 'éÉàÀèÈùÙâÂêÊîÎôÔûÛëËïÏüÜçÇœŒíÍáÁ',
  // German
  de: 'äÄöÖüÜßéÉïÏ₂\u00ADüÜ',
  // Italian
  it: 'àÀèÈéÉìÌòÒùÙîÎïÏªº',
  // Polish
  pl: 'ąĄćĆęĘłŁńŃóÓśŚźŹżŻíÍéÉïÏáÁ',
  // Swedish
  sv: 'åÅäÄöÖéÉïÏ',
  // Spanish
  es: 'áÁéÉíÍóÓúÚñÑüÜ¡¿ïÏªº', // Added ordinal
  // English (to account for names/loans)
  en: 'éÉáÁíÍïÏüÜ',
};

// Create the final regex
const languageScript = SCRIPT_MAP[langCode] ?? '';
const regex = new RegExp(`^[${BASE_ALLOWED}${languageScript}]+$`, 'u');

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

function checkValue(value: any, filePath: string): string[] {
  const errors: string[] = [];
  if (typeof value === 'string') {
    // Japanese doesn't use spaces, so we check the whole string at once
    const words = langCode === 'ja' ? [value] : value.split(/\s+/);
    for (const word of words) {
      // Clean word from trailing/leading punctuation for cleaner output, but check the whole word
      const cleanWord = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
      if (cleanWord && !regex.test(cleanWord)) {
        errors.push(word);
      }
    }
  } else if (Array.isArray(value)) {
    for (const item of value) {
      errors.push(...checkValue(item, filePath));
    }
  } else if (typeof value === 'object' && value !== null) {
    for (const key of Object.keys(value)) {
      errors.push(...checkValue(value[key], filePath));
    }
  }
  return errors;
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
