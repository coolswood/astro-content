import fs from 'fs/promises';
import {
  loadGlossary,
  formatGlossary,
  mergeGlossary,
} from './lib/glossary-utils.js';
import { loadPrompt } from './lib/prompt-loader.js';
import {
  parseBotArgs,
  resolveBotPaths,
  isUncommitted,
} from './lib/bot-utils.js';
import { runGeminiWorkflow } from './lib/gemini-workflow.js';
import { GeminiProvider } from './lib/providers/gemini-provider.js';

async function run() {
  const { fileName, targetLang, chunkSize } = parseBotArgs();
  const paths = await resolveBotPaths(fileName, targetLang);

  if (paths.isDirectory) {
    console.error(`\n❌ Ошибка: "${fileName}" является директорией.`);
    console.error(
      `📝 Пожалуйста, укажите конкретный файл, например: "homeBot/content.json"`,
    );
    process.exit(1);
  }

  // Skip logic: skip if there are uncommitted changes to avoid overwriting local work.
  try {
    await fs.access(paths.targetPath);
    if (isUncommitted(paths.targetPath)) {
      console.log(
        `⏩ Пропуск файла: ${paths.targetPath} (есть незакоммиченные изменения)`,
      );
      return;
    }
    console.log(
      `♻️ Файл ${paths.targetPath} закоммичен или изменен, переводим заново...`,
    );
  } catch {
    // File doesn't exist, proceed with translation
  }

  console.log(`📜 Загрузка промптов для UI (${targetLang})...`);
  const [main, editor, tech] = await Promise.all([
    loadPrompt('ui', 'main', targetLang),
    loadPrompt('ui', 'editor', targetLang),
    loadPrompt('ui', 'tech', targetLang),
  ]);

  const sourceJson = JSON.parse(await fs.readFile(paths.ruPath, 'utf-8'));
  // @@locale не переводим — удаляем из обработки, добавим в конце с нужным языком
  const { '@@locale': _locale, ...sourceWithoutLocale } = sourceJson;
  const keys = Object.keys(sourceWithoutLocale);

  console.log(
    `📦 Всего ключей: ${keys.length}. Чанков: ${Math.ceil(keys.length / chunkSize)}`,
  );

  const provider = new GeminiProvider();
  console.log('🔗 Инициализация провайдера Gemini...');
  await provider.init();

  let globalGlossary = await loadGlossary(paths.partialGlossaryPath);
  if (globalGlossary.length > 0) {
    console.log(
      `📚 Загружен существующий глоссарий: ${globalGlossary.length} терминов.`,
    );
  }

  let finalLocalizedJson: Record<string, any> = {};

  // Попытка возобновления перевода из результирующего файла
  try {
    const existingData = await fs.readFile(paths.targetPath, 'utf-8');
    const existingJson = JSON.parse(existingData);
    const { '@@locale': _targetLocale, ...existingWithoutLocale } =
      existingJson;
    finalLocalizedJson = existingWithoutLocale;
    console.log(
      `♻️ Возобновление перевода. В ${paths.targetPath} найдено ${Object.keys(finalLocalizedJson).length} ключей.`,
    );
  } catch {
    console.log(`🆕 Начало нового перевода (${paths.targetPath} не найден).`);
  }

  let isFirstChunkProcessed = false;

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
      missingKeys.forEach((k) => (chunkData[k] = sourceWithoutLocale[k]));

      const glossaryText = formatGlossary(globalGlossary);

      try {
        const result = await runGeminiWorkflow(
          provider,
          JSON.stringify(chunkData),
          { main, editor, tech },
          {
            glossaryText,
            isUI: true,
            isPersistent: true,
            firstRun: !isFirstChunkProcessed,
            models: {
              stage1: 'Pro',
              stage2: 'Думающая',
              stage3: 'Pro',
            },
          },
        );

        if (result.status === 'success' && result.localizedJson) {
          isFirstChunkProcessed = true;
          globalGlossary = mergeGlossary(globalGlossary, result.glossary || []);

          Object.assign(finalLocalizedJson, result.localizedJson);

          await fs.mkdir(paths.targetDir, { recursive: true });
          const currentOutput = {
            '@@locale': targetLang,
            ...finalLocalizedJson,
          };
          await fs.writeFile(
            paths.targetPath,
            JSON.stringify(currentOutput, null, 2),
          );
          await fs.writeFile(
            paths.partialGlossaryPath,
            JSON.stringify(globalGlossary, null, 2),
          );
          console.log(
            `✅ Чанк ${Math.floor(i / chunkSize) + 1} сохранен в ${paths.targetPath}. Глоссарий: ${globalGlossary.length} терминов.`,
          );
        }

        await new Promise((r) => setTimeout(r, 5000));
      } catch (e) {
        console.error(`🛑 Ошибка в чанке ${Math.floor(i / chunkSize) + 1}:`, e);
        console.log('Ждем 30 секунд и пробуем следующий чанк...');
        await new Promise((r) => setTimeout(r, 30000));
      }
    }

    await fs.writeFile(
      paths.glossaryPath,
      JSON.stringify(globalGlossary, null, 2),
    );
    console.log(`✨ Успешно!`);
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
  } finally {
    await provider.close();
    console.log('👋 Сессия завершена.');
  }
}

run().catch(console.error);
