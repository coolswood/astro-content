import fs from 'fs/promises';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import {
  connectToBrowser,
  getGeminiPage,
  interactWithGemini,
  parseGeminiJson,
} from './lib/gemini-client.js';
import { loadGlossary, formatGlossary } from './lib/glossary-utils.js';
import { loadPrompt } from './lib/prompt-loader.js';
import { flatten, unflatten, deepMerge } from './lib/json-utils.js';
import type { Page } from 'puppeteer-core';

async function run() {
  const fileName = process.argv[2] || 'start.json';
  const targetLang = (process.argv[3] || 'pt_br')
    .toLowerCase()
    .replace('-', '_');

  const result: any = Array.isArray(source) ? [] : {};
  let hasChanges = false;

  for (const key in update) {
    if (!Object.prototype.hasOwnProperty.call(update, key)) continue;
    if (!Object.prototype.hasOwnProperty.call(source, key)) {
      console.warn(`⚠️ Пропуск "лишнего" ключа: ${key}`);
      continue;
    }

    const sourceValue = source[key];
    const updateValue = update[key];

    if (
      typeof updateValue === 'object' &&
      updateValue !== null &&
      typeof sourceValue === 'object' &&
      sourceValue !== null
    ) {
      const nested = filterByStructure(sourceValue, updateValue);
      if (nested !== undefined) {
        result[key] = nested;
        hasChanges = true;
      }
    } else if (typeof updateValue === typeof sourceValue) {
      result[key] = updateValue;
      hasChanges = true;
    }
  }

  return hasChanges ? result : undefined;
}

async function isGitDirty(filePath: string): Promise<boolean> {
  try {
    const result = spawnSync('git', ['status', '--porcelain', filePath], {
      encoding: 'utf-8',
    });
    return !!result.stdout.trim();
  } catch (e) {
    return false;
  }
}

async function getJsonFilesFlat(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => path.join(dir, entry.name));
}

async function translateFile(
  filePath: string,
  page: Page,
  targetLang: string,
  glossaryText: string,
  prompts: { trans: string; editor: string; tech: string },
) {
  const relativePath = path.relative(
    path.join(process.cwd(), 'src/i18n/ru'),
    filePath,
  );
  const targetPath = path.join(
    process.cwd(),
    'scripts/prompts',
    targetLang,
    'partial_glossary.json',
  );
  let glossary = await loadGlossary(glossaryPath);
  if (glossary.length === 0) {
    const backupGlossaryPath = path.join(
      process.cwd(),
      'scripts/prompts',
      targetLang,
      'glossary.json',
    );
    console.log(`⚠️ Глоссарий не найден в ${glossaryPath}, пробуем ${backupGlossaryPath}`);
    glossary = await loadGlossary(backupGlossaryPath);
  }
  const glossaryText = formatGlossary(glossary);

  const langPromptsDir = path.join(
    process.cwd(),
    'scripts/prompts',
    targetLang.replace('_', '-'), // Use actual casing (e.g. pt-BR)
  );
  // Match the casing from prompts folder (pt-BR)
  const statsPrompts = await fs.readdir(
    path.join(process.cwd(), 'scripts/prompts'),
  );
  const actualLangDir = statsPrompts.find(
    (d) => d.toLowerCase() === targetLang.replace('_', '-').toLowerCase(),
  );
  const finalPromptsDir = actualLangDir
    ? path.join(process.cwd(), 'scripts/prompts', actualLangDir)
    : langPromptsDir;

  const partialPath = path.join(finalPromptsDir, `partial_${relativePath}`);

  console.log(`\n📄 Обработка: ${relativePath}`);
  const ruContent = await fs.readFile(filePath, 'utf-8');
  let sourceJson: any;

  try {
    sourceJson = JSON.parse(ruContent);
  } catch (e) {
    console.error(
      `⚠️ Файл ${relativePath} не является валидным JSON. Пропуск.`,
    );
    return;
  }

  const flattened = flatten(sourceJson);
  const flatKeys = Object.keys(flattened);
  const chunkSize = parseInt(process.argv[4] || '80');
  const totalChunks = Math.ceil(flatKeys.length / chunkSize);
  let finalFlatLocalized: Record<string, any> = {};

  // Попытка возобновления
  try {
    const existingData = await fs.readFile(partialPath, 'utf-8');
    finalFlatLocalized = flatten(JSON.parse(existingData));
    console.log(
      `♻️ Возобновление перевода. Загружено ${Object.keys(finalFlatLocalized).length} из ${flatKeys.length} ключей.`,
    );
  } catch {
    console.log('🆕 Начало нового перевода (partial JSON не найден).');
  }

  for (let i = 0; i < flatKeys.length; i += chunkSize) {
    const chunkKeys = flatKeys.slice(i, i + chunkSize);
    const missingKeys = chunkKeys.filter((k) => !finalFlatLocalized[k]);

    if (missingKeys.length === 0) {
      continue;
    }

    const currentChunkIndex = Math.floor(i / chunkSize) + 1;

    if (totalChunks > 1) {
      console.log(
        `\n🧩 Чанк ${currentChunkIndex} из ${totalChunks}... (${chunkKeys.length} ключей)`,
      );
    }

    const chunkDataFlat: Record<string, any> = {};
    chunkKeys.forEach((k) => (chunkDataFlat[k] = flattened[k]));
    const chunkData = unflatten(chunkDataFlat);
    const isStory =
      relativePath.startsWith('story' + path.sep) ||
      relativePath.startsWith('story/');

    const cleanPrompt = (p: string) => {
      if (!isStory) return p;
      return p.replace(
        /- СТРОГО СОХРАНЯЙ СТРУКТУРУ: Запрещено изменять количество элементов в массивах.*/g,
        '',
      );
    };

    // ШАГ 1: Перевод
    console.log('🚀 ШАГ 1: Перевод (Transcreation)...');
    const currentTransPrompt = cleanPrompt(prompts.trans).replace(
      '{{GLOSSARY}}',
      glossaryText,
    );
    const res1Raw = await interactWithGemini(
      page,
      `${currentTransPrompt}\n\nВот текст для перевода:\n${ruContent}`,
      'Pro',
      false,
    );

    if (res1Raw.trim().toLowerCase().includes('все хорошо')) {
      console.log(
        `✨ Stage 1: Чанк ${currentChunkIndex} — перевод не требуется.`,
      );
      Object.assign(finalFlatLocalized, chunkDataFlat);
      continue;
    }

    const translatedChunk = await parseGeminiJson<Record<string, any>>(
      res1Raw,
      page,
      'Pro',
    );
    let currentLocalizedJson = translatedChunk;
    let localizedText = JSON.stringify(currentLocalizedJson);

    // ШАГ 2: Редактура
    console.log('🚀 ШАГ 2: Редактура (Editing)...');
    const res2Raw = await interactWithGemini(
      page,
      `${editorPromptBase}\n\nВот текст для редактуры:\n${translatedJson}`,
      'Pro',
      true,
    );

    if (
      !res2Raw.trim().toLowerCase().includes('all set') &&
      !res2Raw.trim().toLowerCase().includes('все хорошо')
    ) {
      const partialUpdates = await parseGeminiJson<Record<string, any>>(
        res2Raw,
        page,
        'Pro',
      );
      const filteredUpdates = filterByStructure(
        currentLocalizedJson,
        partialUpdates,
      );
      if (filteredUpdates) {
        currentLocalizedJson = deepMerge(currentLocalizedJson, filteredUpdates);
        localizedText = JSON.stringify(currentLocalizedJson);
        console.log(
          `✨ Stage 2: Применены правки для ${Object.keys(flatten(filteredUpdates)).length} ключей.`,
        );
      } else {
        console.log('✨ Stage 2: Без изменений (структура не совпала)');
      }
    } else {
      console.log('✨ Stage 2: Без изменений (Все хорошо)');
    }

    // ШАГ 3: Технический аудит
    console.log('🚀 ШАГ 3: Технический аудит (Tech Review)...');
    const res3Raw = await interactWithGemini(
      page,
      `${techPromptBase}\n\nВот текст для тех-аудита:\n${res2Handled}`,
      'Pro',
      true,
    );

    let chunkFinalJson: Record<string, any>;
    if (
      !res3Raw.trim().toLowerCase().includes('all set') &&
      !res3Raw.trim().toLowerCase().includes('все хорошо')
    ) {
      const partialUpdates = await parseGeminiJson<Record<string, any>>(
        res3Raw,
        page,
        'Pro',
      );
      const filteredUpdates = filterByStructure(
        currentLocalizedJson,
        partialUpdates,
      );
      if (filteredUpdates) {
        chunkFinalJson = deepMerge(currentLocalizedJson, filteredUpdates);
        console.log(
          `✨ Stage 3: Применены правки для ${Object.keys(flatten(filteredUpdates)).length} ключей.`,
        );
      } else {
        chunkFinalJson = currentLocalizedJson;
        console.log('✨ Stage 3: Без изменений (структура не совпала)');
      }
    } else {
      chunkFinalJson = currentLocalizedJson;
      console.log('✨ Stage 3: Без изменений (Все хорошо)');
    }

    Object.assign(finalFlatLocalized, flatten(chunkFinalJson));

    // Промежуточное сохранение
    const intermediateJson = unflatten(finalFlatLocalized);
    await fs.mkdir(path.dirname(partialPath), { recursive: true });
    await fs.writeFile(
      partialPath,
      JSON.stringify(intermediateJson, null, 2),
      'utf-8',
    );
    console.log(`✅ Чанк ${currentChunkIndex} сохранен во временный файл.`);
  }

    console.log('--- Проверка символов (check-translations.ts) ---');
    const checkResult = spawnSync(
      'bun',
      ['check-translations.ts', targetLang],
      {
        encoding: 'utf-8',
      },
    );
    console.log(checkResult.stdout || checkResult.stderr);
    if (checkResult.status !== 0) {
      console.warn('⚠️ Валидация символов не прошла!');
    }

    console.log('--- Проверка структуры (list-problematic-files.ts) ---');
    const structResult = spawnSync(
      'bun',
      ['list-problematic-files.ts', targetLang],
      {
        encoding: 'utf-8',
      },
    );
    console.log(structResult.stdout || structResult.stderr);
    if (structResult.status !== 0) {
      console.warn('⚠️ Валидация структуры JSON не прошла!');
    }

    console.log('\n🚀 Весь процесс автоматизации завершен успешно!');
  } catch (error) {
    console.error('❌ Скрипт завершился с критической ошибкой:', error);
  } finally {
    await browser.disconnect();
    console.log('👋 Отключено от браузера.');
  }
}

run().catch(console.error);
