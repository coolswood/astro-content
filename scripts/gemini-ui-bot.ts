import fs from 'fs/promises';
import {
  loadGlossary,
  formatGlossary,
  mergeGlossary,
} from './lib/glossary-utils.js';
import { loadPrompt } from './lib/prompt-loader.js';

import { parseBotArgs, resolveBotPaths } from './lib/bot-utils.js';
import { runGeminiWorkflow } from './lib/gemini-workflow.js';
import { GeminiProvider } from './lib/providers/gemini-provider.js';
import { ChatGPTProvider } from './lib/providers/chatgpt-provider.js';
import { ClaudeProvider } from './lib/providers/claude-provider.js';
import type { AIProvider } from './lib/types.js';

async function run() {
  const { fileName, targetLang, chunkSize, provider: providerType } = parseBotArgs();
  const paths = await resolveBotPaths(fileName, targetLang);

  if (paths.isDirectory) {
    console.error(`\n❌ Ошибка: "${fileName}" является директорией.`);
    console.error(`📝 Пожалуйста, укажите конкретный файл, например: "homeBot/content.json"`);
    process.exit(1);
  }

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

  let provider: AIProvider;
  if (providerType === 'chatgpt') {
    provider = new ChatGPTProvider();
  } else if (providerType === 'claude') {
    provider = new ClaudeProvider();
  } else {
    provider = new GeminiProvider();
  }

  let stage3Provider: AIProvider | undefined;
  
  // Если провайдер НЕ указан явно в аргументах (argv[5]), 
  // то используем "умный дефолт": Gemini для шагов 1-2 и Claude для шага 3.
  // Если провайдер указан (например, 'gemini' или 'chatgpt'), используем его для всех этапов.
  const explicitProvider = process.argv[5];
  
  if (!explicitProvider) {
    console.log('🔗 Инициализация дополнительного провайдера для этапа 3 (дефолт): claude...');
    stage3Provider = new ClaudeProvider();
    await stage3Provider.init();
  }

  console.log(`🔗 Инициализация основного провайдера: ${providerType}...`);
  await provider.init();

  let finalLocalizedJson: Record<string, any> = {};
  let globalGlossary = await loadGlossary(paths.partialGlossaryPath);
  if (globalGlossary.length > 0) {
    console.log(
      `📚 Загружен существующий глоссарий: ${globalGlossary.length} терминов.`,
    );
  }

  // Попытка возобновления перевода из результирующего файла
  try {
    const existingData = await fs.readFile(paths.targetPath, 'utf-8');
    const existingJson = JSON.parse(existingData);
    const { '@@locale': _targetLocale, ...existingWithoutLocale } = existingJson;
    finalLocalizedJson = existingWithoutLocale;
    console.log(
      `♻️ Возобновление перевода. В ${paths.targetPath} найдено ${Object.keys(finalLocalizedJson).length} ключей.`,
    );
  } catch {
    console.log(`🆕 Начало нового перевода (${paths.targetPath} не найден).`);
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
      missingKeys.forEach((k) => (chunkData[k] = sourceJson[k]));


      const glossaryText = formatGlossary(globalGlossary);

      try {
        const result = await runGeminiWorkflow(
          provider,
          JSON.stringify(chunkData),
          { main, editor, tech },
          { glossaryText, isUI: true, stage3Provider }
        );

        if (result.status === 'success' && result.localizedJson) {
           globalGlossary = mergeGlossary(globalGlossary, result.glossary || []);
           console.log(`📚 Глоссарий после Stage 1: ${globalGlossary.length} терминов.`);

           Object.assign(finalLocalizedJson, result.localizedJson);

           await fs.mkdir(paths.targetDir, { recursive: true });
           const currentOutput = { '@@locale': targetLang, ...finalLocalizedJson };
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

    await fs.writeFile(paths.glossaryPath, JSON.stringify(globalGlossary, null, 2));
    console.log(`✨ Успешно!`);
    console.log(`   Перевод: ${paths.targetPath}`);
    console.log(`   Глоссарий: ${paths.glossaryPath}`);
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
  } finally {
    await provider.close();
    if (stage3Provider) {
      await stage3Provider.close();
    }
  }
}

run().catch(console.error);
