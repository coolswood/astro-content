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
import { createProvider, normalizeProviderType } from './lib/cli.js';
import { writeJsonAtomic, readJsonOr } from './lib/atomic-fs.js';
import { sleep } from './lib/puppeteer-core.js';
import type { AIProvider } from './lib/types.js';

/** Число попыток повтора провалившегося чанка (вместо прежнего skip+sleep(30s)). */
const CHUNK_RETRIES = 2;
/** Пауза между успешными чанками (мс). */
const INTER_CHUNK_DELAY_MS = 5000;

async function run() {
  const { fileName, targetLang, chunkSize, provider: providerType, excludeStages, intelligenceLevels } = parseBotArgs();
  const paths = await resolveBotPaths(fileName, targetLang);

  if (paths.isDirectory) {
    console.error(`\n❌ Ошибка: "${fileName}" является директорией.`);
    console.error(
      `📝 Пожалуйста, укажите конкретный файл, например: "homeBot/content.json"`,
    );
    return; // НЕ process.exit — даём finally- cleanup шанс (хотя провайдера ещё нет).
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

  const provider: AIProvider = createProvider(normalizeProviderType(providerType));
  console.log(`🔗 Инициализация провайдера ${provider.type}...`);
  await provider.init();

  try {
    let globalGlossary = await loadGlossary(paths.partialGlossaryPath);
    if (globalGlossary.length > 0) {
      console.log(
        `📚 Загружен существующий глоссарий: ${globalGlossary.length} терминов.`,
      );
    }

    let finalLocalizedJson: Record<string, any> = {};

    // Возобновление перевода: отличаем «файл отсутствует» от «повреждён».
    finalLocalizedJson = readJsonOr(paths.targetPath, {} as Record<string, any>, (err) => {
      console.warn(`⚠️ Существующий перевод повреждён (${err.message}). Начинаем заново.`);
    });
    if (Object.keys(finalLocalizedJson).length > 0) {
      const { '@@locale': _targetLocale, ...existingWithoutLocale } = finalLocalizedJson as any;
      finalLocalizedJson = existingWithoutLocale;
      console.log(
        `♻️ Возобновление перевода. В ${paths.targetPath} найдено ${Object.keys(finalLocalizedJson).length} ключей.`,
      );
    } else {
      console.log(`🆕 Начало нового перевода (${paths.targetPath} не найден).`);
    }

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

      // Retry проваленного чанка вместо прежнего skip + sleep(30s).
      let chunkOk = false;
      let lastError: unknown = null;
      for (let attempt = 1; attempt <= CHUNK_RETRIES + 1 && !chunkOk; attempt++) {
        if (attempt > 1) {
          console.log(`🔁 Повторная попытка чанка (попытка ${attempt}/${CHUNK_RETRIES + 1})...`);
          await sleep(3000);
        }
        try {
          const result = await runGeminiWorkflow(
            provider,
            JSON.stringify(chunkData),
            { main, editor, tech },
            {
              glossaryText,
              isUI: true,
              isPersistent: true,
              firstRun: true,
              excludeStages,
              intelligenceLevels,
              models: {
                stage1: 'Pro',
                stage2: 'Думающая',
                stage3: 'Pro',
              },
            },
          );

          if (result.status === 'success' && result.localizedJson) {
            globalGlossary = mergeGlossary(globalGlossary, result.glossary || []);
            Object.assign(finalLocalizedJson, result.localizedJson);

            // Атомарная запись: temp+rename (прежде был bare fs.writeFile).
            await fs.mkdir(paths.targetDir, { recursive: true });
            const currentOutput = {
              '@@locale': targetLang,
              ...finalLocalizedJson,
            };
            await writeJsonAtomic(paths.targetPath, currentOutput);
            await writeJsonAtomic(paths.partialGlossaryPath, globalGlossary);
            console.log(
              `✅ Чанк ${Math.floor(i / chunkSize) + 1} сохранён в ${paths.targetPath}. Глоссарий: ${globalGlossary.length} терминов.`,
            );
            chunkOk = true;
          }
        } catch (e) {
          lastError = e;
          console.error(`⚠️ Ошибка в чанке ${Math.floor(i / chunkSize) + 1} (попытка ${attempt}):`, e);
        }
      }

      if (!chunkOk) {
        console.error(
          `🛑 Чанк ${Math.floor(i / chunkSize) + 1} провален после ${CHUNK_RETRIES + 1} попыток ` +
            `(последняя ошибка: ${(lastError as Error)?.message ?? lastError}). Переходим к следующему.`,
        );
        // Продолжаем — остальные чанки не должны страдать из-за одного.
      }

      await sleep(INTER_CHUNK_DELAY_MS);
    }

    await writeJsonAtomic(paths.glossaryPath, globalGlossary);
    console.log(`✨ Успешно!`);
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
  } finally {
    await provider.close();
    console.log('👋 Сессия завершена.');
  }
}

run().catch(console.error);
