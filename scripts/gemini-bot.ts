import fs from 'fs/promises';
import { loadGlossary, formatGlossary } from './lib/glossary-utils.js';
import { loadPrompt } from './lib/prompt-loader.js';
import { parseBotArgs, resolveBotPaths, runBotValidation, listJsonFiles, isUncommitted } from './lib/bot-utils.js';
import { runGeminiWorkflow } from './lib/gemini-workflow.ts';
import { GeminiProvider } from './lib/providers/gemini-provider.js';
import { ChatGPTProvider } from './lib/providers/chatgpt-provider.js';
import { ClaudeProvider } from './lib/providers/claude-provider.js';
import type { AIProvider } from './lib/types.js';
import path from 'path';

async function processFile(
  fileName: string, 
  targetLang: string, 
  provider: AIProvider, 
  stage3Provider: AIProvider | undefined
) {
  const paths = await resolveBotPaths(fileName, targetLang);

  // Skip logic: if the target file exists and is NOT uncommitted, skip it.
  try {
    await fs.access(paths.targetPath);
    const uncommitted = isUncommitted(paths.targetPath);
    if (uncommitted) {
      console.log(`⏩ Пропуск файла: ${paths.targetPath} (есть незакоммиченные изменения)`);
      return;
    }
    console.log(`♻️ Файл ${paths.targetPath} закоммичен, переводим заново...`);
  } catch {
    // File doesn't exist, proceed with translation
  }

  console.log(`\n📄 Обработка файла: ${paths.ruPath}`);
  const ruContent = await fs.readFile(paths.ruPath, 'utf-8');

  console.log(`📜 Чтение промптов...`);
  let glossary = await loadGlossary(paths.partialGlossaryPath);
  if (glossary.length === 0) {
    console.log(`⚠️ Глоссарий не найден в ${paths.partialGlossaryPath}, пробуем ${paths.glossaryPath}`);
    glossary = await loadGlossary(paths.glossaryPath);
  }
  const glossaryText = formatGlossary(glossary);

  const [main, editor, tech] = await Promise.all([
    loadPrompt('text', 'main', targetLang),
    loadPrompt('text', 'editor', targetLang),
    loadPrompt('text', 'tech', targetLang),
  ]);

  const result = await runGeminiWorkflow(
    provider,
    ruContent,
    { main, editor, tech },
    { glossaryText, isUI: false, stage3Provider }
  );

  if (result.status === 'success') {
    const finalJson = JSON.stringify(result.localizedJson, null, 2);
    console.log(`💾 Сохранение итогового результата: ${paths.targetPath}`);
    await fs.mkdir(paths.targetDir, { recursive: true });
    await fs.writeFile(paths.targetPath, finalJson, 'utf-8');
  }
}

async function run() {
  const { fileName, targetLang, provider: providerType } = parseBotArgs();
  const paths = await resolveBotPaths(fileName, targetLang);

  let provider: AIProvider;
  if (providerType === 'chatgpt') {
    provider = new ChatGPTProvider();
  } else if (providerType === 'claude') {
    provider = new ClaudeProvider();
  } else {
    provider = new GeminiProvider();
  }

  let stage3Provider: AIProvider | undefined;
  const explicitProvider = process.argv[5];
  
  if (!explicitProvider) {
    console.log('🔗 Инициализация дополнительного провайдера для этапа 3 (дефолт): claude...');
    stage3Provider = new ClaudeProvider();
    await stage3Provider.init();
  }

  console.log(`🔗 Инициализация провайдера: ${providerType}...`);
  await provider.init();

  try {
    if (paths.isDirectory) {
      console.log(`📂 Обнаружена директория: ${fileName}. Поиск JSON файлов...`);
      const files = await listJsonFiles(paths.ruPath);
      console.log(`🔎 Найдено файлов: ${files.length}`);
      
      for (const file of files) {
        const relativeFile = path.join(fileName, file);
        try {
          await processFile(relativeFile, targetLang, provider, stage3Provider);
        } catch (err) {
          console.error(`❌ Ошибка при обработке ${file}:`, err);
        }
      }
    } else {
      await processFile(fileName, targetLang, provider, stage3Provider);
    }

    runBotValidation(targetLang);
  } catch (error) {
    console.error('❌ Скрипт завершился с ошибкой:', error);
  } finally {
    await provider.close();
    if (stage3Provider) {
      await stage3Provider.close();
    }
    console.log('👋 Сессия провайдера завершена.');
  }
}

run().catch(console.error);
