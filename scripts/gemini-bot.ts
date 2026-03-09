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
import { flatten, unflatten } from './lib/json-utils.js';
import type { Page } from 'puppeteer-core';

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

async function getAllJsonFiles(dir: string): Promise<string[]> {
  let results: string[] = [];
  const list = await fs.readdir(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(await getAllJsonFiles(filePath));
    } else if (filePath.endsWith('.json')) {
      results.push(filePath);
    }
  }
  return results;
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
    'src/i18n',
    targetLang.replace('-', '_').toLowerCase(),
    relativePath,
  );
  const targetDir = path.dirname(targetPath);

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
  let finalFlatLocalized: Record<string, string> = {};

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

    const chunkDataFlat: Record<string, string> = {};
    chunkKeys.forEach((k) => (chunkDataFlat[k] = flattened[k]));
    const chunkData = unflatten(chunkDataFlat);

    // ШАГ 1: Перевод
    console.log('🚀 ШАГ 1: Перевод (Transcreation)...');
    const currentTransPrompt = prompts.trans.replace(
      '{{GLOSSARY}}',
      glossaryText,
    );
    const res1Raw = await interactWithGemini(
      page,
      `${currentTransPrompt}\n\nВот текст для перевода:\n${JSON.stringify(chunkData)}`,
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

    const translatedChunk = parseGeminiJson<Record<string, any>>(res1Raw);
    let currentLocalizedJson = translatedChunk;
    let localizedText = JSON.stringify(currentLocalizedJson);

    // ШАГ 2: Редактура
    console.log('🚀 ШАГ 2: Редактура (Editing)...');
    const res2Raw = await interactWithGemini(
      page,
      `${prompts.editor}\n\nВот текст для редактуры:\n${localizedText}`,
      'Pro',
      true,
    );

    if (
      !res2Raw.trim().toLowerCase().includes('all set') &&
      !res2Raw.trim().toLowerCase().includes('все хорошо')
    ) {
      const partialUpdates = parseGeminiJson<Record<string, any>>(res2Raw);
      currentLocalizedJson = { ...currentLocalizedJson, ...partialUpdates };
      localizedText = JSON.stringify(currentLocalizedJson);
      console.log(
        `✨ Stage 2: Применены правки для ${Object.keys(partialUpdates).length} ключей.`,
      );
    } else {
      console.log('✨ Stage 2: Без изменений (Все хорошо)');
    }

    // ШАГ 3: Технический аудит
    console.log('🚀 ШАГ 3: Технический аудит (Tech Review)...');
    const res3Raw = await interactWithGemini(
      page,
      `${prompts.tech}\n\nВот текст для тех-аудита:\n${localizedText}`,
      'Pro',
      true,
    );

    let chunkFinalJson: Record<string, any>;
    if (
      !res3Raw.trim().toLowerCase().includes('all set') &&
      !res3Raw.trim().toLowerCase().includes('все хорошо')
    ) {
      const partialUpdates = parseGeminiJson<Record<string, any>>(res3Raw);
      chunkFinalJson = { ...currentLocalizedJson, ...partialUpdates };
      console.log(
        `✨ Stage 3: Применены правки для ${Object.keys(partialUpdates).length} ключей.`,
      );
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

  const finalLocalizedJson = unflatten(finalFlatLocalized);

  // Очистка временного файла после успешного завершения всех чанков
  try {
    await fs.unlink(partialPath);
  } catch (e) {}

  // Если исходный файл был массивом, конвертируем обратно в массив
  // Если исходный файл был массивом, unflatten уже вернет массив, если ключи начинаются с чисел.
  // Но для уверенности проверим тип исходного JSON.
  const resultJson =
    Array.isArray(sourceJson) && !Array.isArray(finalLocalizedJson)
      ? Object.values(finalLocalizedJson)
      : finalLocalizedJson;

  console.log(`💾 Сохранение: ${targetPath}`);
  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(targetPath, JSON.stringify(resultJson, null, 2), 'utf-8');
}

async function run() {
  const inputPath = process.argv[2] || 'homeBot';
  const rawLang = process.argv[3] || 'pt-BR'; // Например, pt-BR

  // pt-BR -> Prompts folder (pt-BR), pt_br -> i18n folder (pt_br)
  const targetLang = rawLang;
  const targetFolder = rawLang.replace('-', '_').toLowerCase();

  const fullInputPath = path.resolve(process.cwd(), 'src/i18n/ru', inputPath);
  let files: string[] = [];

  const stats = await fs.stat(fullInputPath);
  if (stats.isDirectory()) {
    files = await getAllJsonFiles(fullInputPath);
  } else {
    files = [fullInputPath];
  }

  console.log(`📂 Найдено файлов для обработки: ${files.length}`);

  console.log(`📜 Чтение промптов и глоссария...`);
  const glossaryPath = path.join(
    process.cwd(),
    'scripts/prompts',
    targetLang,
    'glossary.json',
  );
  const glossary = await loadGlossary(glossaryPath);
  const glossaryText = formatGlossary(glossary);

  const [transPrompt, editorPrompt, techPrompt] = await Promise.all([
    loadPrompt('text', 'main', targetLang),
    loadPrompt('text', 'editor', targetLang),
    loadPrompt('text', 'tech', targetLang),
  ]);

  console.log('🔗 Подключение к браузеру...');
  const browser = await connectToBrowser();
  const page = await getGeminiPage(browser);

  try {
    let iteration = 0;
    const maxIterations = 3;

    while (iteration < maxIterations) {
      iteration++;
      console.log(`\n🚀 --- ПРОХОД ${iteration} из ${maxIterations} ---`);

      for (const file of files) {
        await translateFile(file, page, targetFolder, glossaryText, {
          trans: transPrompt,
          editor: editorPrompt,
          tech: techPrompt,
        });

        console.log(`\n🔍 Валидация для файла: ${file}`);
        try {
          execSync(`bun check-translations.ts ${targetFolder}`, {
            stdio: 'inherit',
          });
          execSync(`bun list-problematic-files.ts ${targetFolder}`, {
            stdio: 'inherit',
          });
        } catch (e: any) {
          console.warn(
            `⚠️ Валидация выявила проблемы в ${file}. Скрипт продолжит работу.`,
          );
        }
      }

      console.log('\n🔍 Запуск финальной проверки всех файлов...');
      let problematicFiles: string[] = [];
      try {
        // Мы запускаем их через execSync, чтобы видеть вывод в консоли
        execSync(`bun check-translations.ts ${targetFolder}`, {
          stdio: 'inherit',
        });
        execSync(`bun list-problematic-files.ts ${targetFolder}`, {
          stdio: 'inherit',
        });
        // Если дошли сюда, значит list-problematic-files завершился с кодом 0
        console.log('\n✅ Весь процесс автоматизации завершен успешно!');
        return; // Выходим из run() после успеха
      } catch (e: any) {
        // Если ошибка — значит есть проблемные файлы. Попробуем их спарсить.
        // list-problematic-files.ts выводит имена файлов построчно.
        const output = execSync(
          `bun list-problematic-files.ts ${targetFolder}`,
        ).toString();
        problematicFiles = output
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.endsWith('.json'));

        if (problematicFiles.length === 0) {
          console.error('❌ Валидация упала, но список файлов пуст.');
          break;
        }

        console.log(
          `❌ Найдено проблемных файлов: ${problematicFiles.length}.`,
        );

        if (iteration < maxIterations) {
          console.log(
            `⚠️ Есть проблемные файлы (${problematicFiles.length}). Попробуем еще раз...`,
          );
          // Мы не откатываем файлы автоматически, чтобы не терять прогресс.
          // Если файл уже переведен, но в нем есть ошибки, Gemini попробует исправить его на следующей итерации.
        } else {
          console.log(
            '⚠️ Достигнут лимит попыток (3). Оставшиеся файлы требуют ручного вмешательства.',
          );
        }
      }
    }
  } catch (error) {
    console.error('❌ Скрипт завершился с критической ошибкой:', error);
  } finally {
    await browser.disconnect();
    console.log('👋 Отключено от браузера.');
  }
}

run().catch(console.error);
