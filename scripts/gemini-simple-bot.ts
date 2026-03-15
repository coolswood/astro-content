import fs from 'fs/promises';
import { loadGlossary, formatGlossary } from './lib/glossary-utils.js';
import { loadPrompt } from './lib/prompt-loader.js';
import { parseBotArgs, resolveBotPaths, runBotValidation, listJsonFiles, isUncommitted } from './lib/bot-utils.js';
import { runGeminiWorkflow, type WorkflowOptions } from './lib/gemini-workflow.js';
import { GeminiProvider } from './lib/providers/gemini-provider.js';
import type { AIProvider } from './lib/types.js';
import path from 'path';

async function processFile(
  fileName: string, 
  targetLang: string, 
  provider: AIProvider,
  workflowOptions: Partial<WorkflowOptions> = {}
) {
  const paths = await resolveBotPaths(fileName, targetLang);

  // Skip logic: skip if there are uncommitted changes to avoid overwriting local work.
  try {
    await fs.access(paths.targetPath);
    if (isUncommitted(paths.targetPath)) {
      console.log(`⏩ Пропуск файла: ${paths.targetPath} (есть незакоммиченные изменения)`);
      return false; // Indicating file was skipped
    }
    console.log(`♻️ Файл ${paths.targetPath} закоммичен или изменен, переводим заново...`);
  } catch {
    // File doesn't exist, proceed with translation
  }

  console.log(`\n📄 Обработка файла: ${paths.ruPath}`);
  const ruContent = await fs.readFile(paths.ruPath, 'utf-8');

  console.log(`📜 Загрузка промптов для текста (${targetLang})...`);
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
    { 
      glossaryText, 
      isUI: false,
      models: {
        stage1: 'Думающая',
        stage2: 'Думающая',
        stage3: 'Pro'
      },
      ...workflowOptions
    }
  );

  if (result.status === 'success') {
    const finalJson = JSON.stringify(result.localizedJson, null, 2);
    console.log(`💾 Сохранение итогового результата: ${paths.targetPath}`);
    await fs.mkdir(paths.targetDir, { recursive: true });
    await fs.writeFile(paths.targetPath, finalJson, 'utf-8');
    return true; // Indicating file was processed
  }
  return false;
}

async function run() {
  const { fileName, targetLang } = parseBotArgs();
  const paths = await resolveBotPaths(fileName, targetLang);

  const provider = new GeminiProvider();
  console.log('🔗 Инициализация провайдера Gemini...');
  await provider.init();

  try {
    if (paths.isDirectory) {
      console.log(`📂 Обнаружена директория: ${fileName}. Поиск JSON файлов...`);
      const files = await listJsonFiles(paths.ruPath);
      console.log(`🔎 Найдено файлов: ${files.length}`);
      
      let isFirstPassed = false;
      for (const file of files) {
        const relativeFile = path.join(fileName, file);
        try {
          const wasProcessed = await processFile(relativeFile, targetLang, provider, {
            isPersistent: true,
            firstRun: !isFirstPassed
          });
          if (wasProcessed) {
            isFirstPassed = true;
          }
        } catch (err) {
          console.error(`❌ Ошибка при обработке ${file}:`, err);
        }
      }
    } else {
      await processFile(fileName, targetLang, provider);
    }

    runBotValidation(targetLang);
  } catch (error) {
    console.error('❌ Скрипт завершился с ошибкой:', error);
  } finally {
    await provider.close();
    console.log('👋 Сессия провайдера завершена.');
  }
}

run().catch(console.error);
