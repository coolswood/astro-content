import fs from 'fs/promises';
import path from 'path';
import {
  connectToBrowser,
  interactWithGemini,
  parseGeminiJson,
} from './lib/gemini-client.js';
import {
  loadGlossary,
  formatGlossary,
  mergeGlossary,
} from './lib/glossary-utils.js';
import type { GeminiResponse } from './lib/types.js';
import { loadPrompt } from './lib/prompt-loader.js';
import { anonymizeKeys, restoreKeys } from './lib/key-anonymizer.js';

async function run() {
  const fileName = process.argv[2] || 'app_interface.json';
  const targetLang = (process.argv[3] || 'pt_br').toLowerCase().replace('-', '_');
  const chunkSize = parseInt(process.argv[4] || '80');

  // Исходный файл: сначала ищем в scripts/, потом в src/i18n/ru/
  const scriptsFilePath = path.join(process.cwd(), 'scripts', fileName);
  const i18nFilePath = path.join(process.cwd(), 'src/i18n/ru', fileName);
  let ruPath: string;
  try {
    await fs.access(scriptsFilePath);
    ruPath = scriptsFilePath;
    console.log(`📂 Исходный файл: ${ruPath}`);
  } catch {
    ruPath = i18nFilePath;
    console.log(`📂 Исходный файл: ${ruPath}`);
  }

  // Выходной файл всегда в папке языка
  const targetDir = path.join(process.cwd(), 'src/i18n', targetLang);
  const targetPath = path.join(targetDir, fileName);

  // Глоссарий и partial файлы — в папке языка внутри prompts/
  const langPromptsDir = path.join(
    process.cwd(),
    'scripts/prompts',
    targetLang,
  );
  const glossaryPath = path.join(langPromptsDir, 'glossary.json');
  const partialGlossaryPath = path.join(
    langPromptsDir,
    'partial_glossary.json',
  );
  const partialPath = path.join(langPromptsDir, `partial_${fileName}`);

  const [uxPromptBase, editorPromptBase, techPrompt] = await Promise.all([
    loadPrompt('ui', 'main', targetLang),
    loadPrompt('ui', 'editor', targetLang),
    loadPrompt('ui', 'tech', targetLang),
  ]);

  const sourceJson = JSON.parse(await fs.readFile(ruPath, 'utf-8'));
  // @@locale не переводим — удаляем из обработки, добавим в конце с нужным языком
  const { '@@locale': _locale, ...sourceWithoutLocale } = sourceJson;
  const keys = Object.keys(sourceWithoutLocale);

  console.log(
    `📦 Всего ключей: ${keys.length}. Чанков: ${Math.ceil(keys.length / chunkSize)}`,
  );

  const browser = await connectToBrowser();

  let finalLocalizedJson: Record<string, any> = {};
  let globalGlossary = await loadGlossary(partialGlossaryPath);
  if (globalGlossary.length > 0) {
    console.log(
      `📚 Загружен существующий глоссарий: ${globalGlossary.length} терминов.`,
    );
  }

  // Попытка возобновления перевода
  try {
    const existingData = await fs.readFile(partialPath, 'utf-8');
    finalLocalizedJson = JSON.parse(existingData);
    console.log(
      `♻️ Возобновление перевода. Загружено ${Object.keys(finalLocalizedJson).length} ключей.`,
    );
  } catch {
    console.log('🆕 Начало нового перевода (partial JSON не найден).');
  }

  try {
    for (let i = 0; i < keys.length; i += chunkSize) {
      const chunkKeys = keys.slice(i, i + chunkSize);
      const missingKeys = chunkKeys.filter((k) => !finalLocalizedJson[k]);

      if (missingKeys.length === 0) {
        console.log(`⏭️ Чанк ${Math.floor(i / chunkSize) + 1} уже есть.`);
        continue;
      }

      console.log(`\n🧩 Обработка чанка ${Math.floor(i / chunkSize) + 1}...`);
      const chunkData: Record<string, any> = {};
      chunkKeys.forEach((k) => (chunkData[k] = sourceJson[k]));

      // Обезличиваем ключи — AI видит только item_1, item_2...
      const { anonymized, keyMap } = anonymizeKeys(chunkData);

      const glossaryText = formatGlossary(globalGlossary);
      const currentUxPrompt = uxPromptBase.replace(
        '{{GLOSSARY}}',
        glossaryText,
      );
      const currentEditorPrompt = editorPromptBase.replace(
        '{{GLOSSARY}}',
        glossaryText,
      );

      try {
        const page = await browser.newPage();
        await page.goto('https://gemini.google.com/app', {
          waitUntil: 'networkidle2',
        });

        // Stage 1 — перевод + глоссарий
        const res1Raw = await interactWithGemini(
          page,
          `${currentUxPrompt}\n\nJSON:\n${JSON.stringify(anonymized)}`,
          'Думающая',
          false,
        );
        if (res1Raw.trim().toLowerCase().includes('все хорошо')) {
          console.log(`✨ Stage 1: Всё хорошо, чанк уже переведён.`);
          await page.close();
          continue;
        }

        // Извлекаем глоссарий сразу после Stage 1
        const stage1Chunk = parseGeminiJson<GeminiResponse>(res1Raw);
        globalGlossary = mergeGlossary(globalGlossary, stage1Chunk.glossary);
        console.log(
          `📚 Глоссарий после Stage 1: ${globalGlossary.length} терминов.`,
        );

        // Дальше передаём только локализованный текст (без glossary)
        let localizedText = JSON.stringify(stage1Chunk.localized_json);

        // Stage 2 — редактура стиля
        const res2Raw = await interactWithGemini(
          page,
          `${currentEditorPrompt}\n\nJSON:\n${localizedText}`,
          'Думающая',
          true,
        );
        if (!res2Raw.trim().toLowerCase().includes('все хорошо')) {
          const partialUpdates = parseGeminiJson<Record<string, any>>(res2Raw);
          const currentData = JSON.parse(localizedText);
          const mergedData = { ...currentData, ...partialUpdates };
          localizedText = JSON.stringify(mergedData);
          console.log(
            `✨ Stage 2: Применены правки для ${Object.keys(partialUpdates).length} ключей.`,
          );
        } else {
          console.log('✨ Stage 2: Без изменений.');
        }

        // Stage 3 — технический аудит
        const res3Raw = await interactWithGemini(
          page,
          `${techPrompt}\n\nJSON:\n${localizedText}`,
          'Думающая',
          true,
        );
        if (!res3Raw.trim().toLowerCase().includes('все хорошо')) {
          const partialUpdates = parseGeminiJson<Record<string, any>>(res3Raw);
          const currentData = JSON.parse(localizedText);
          const mergedData = { ...currentData, ...partialUpdates };
          localizedText = JSON.stringify(mergedData);
          console.log(
            `✨ Stage 3: Применены правки для ${Object.keys(partialUpdates).length} ключей.`,
          );
        } else {
          console.log('✨ Stage 3: Без изменений.');
        }

        await page.close();

        // Парсим финальный локализованный JSON и восстанавливаем оригинальные ключи
        const finalLocalizedChunk =
          parseGeminiJson<Record<string, any>>(localizedText);
        const restoredLocalized = restoreKeys(finalLocalizedChunk, keyMap);
        Object.assign(finalLocalizedJson, restoredLocalized);

        await fs.mkdir(langPromptsDir, { recursive: true });
        await fs.writeFile(
          partialPath,
          JSON.stringify(finalLocalizedJson, null, 2),
        );
        await fs.writeFile(
          partialGlossaryPath,
          JSON.stringify(globalGlossary, null, 2),
        );
        console.log(
          `✅ Чанк ${Math.floor(i / chunkSize) + 1} сохранен. Глоссарий: ${globalGlossary.length} терминов.`,
        );

        await new Promise((r) => setTimeout(r, 5000));
      } catch (e) {
        console.error(`🛑 Ошибка в чанке ${Math.floor(i / chunkSize) + 1}:`, e);
        console.log('Ждем 30 секунд и пробуем следующий чанк...');
        await new Promise((r) => setTimeout(r, 30000));
      }
    }

    console.log(`\n💾 Сохранение итогов...`);
    await fs.mkdir(targetDir, { recursive: true });
    await fs.mkdir(langPromptsDir, { recursive: true });
    // @@locale в начале файла с кодом целевого языка
    const outputJson = { '@@locale': targetLang, ...finalLocalizedJson };
    await fs.writeFile(targetPath, JSON.stringify(outputJson, null, 2));
    await fs.writeFile(glossaryPath, JSON.stringify(globalGlossary, null, 2));
    console.log(`✨ Успешно!`);
    console.log(`   Перевод: ${targetPath}`);
    console.log(`   Глоссарий: ${glossaryPath}`);
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
  } finally {
    await browser.disconnect();
  }
}

run().catch(console.error);
