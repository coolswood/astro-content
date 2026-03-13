import fs from 'fs/promises';
import { loadGlossary, formatGlossary } from './lib/glossary-utils.js';
import { loadPrompt } from './lib/prompt-loader.js';
import { parseBotArgs, resolveBotPaths, runBotValidation } from './lib/bot-utils.js';
import { runGeminiWorkflow } from './lib/gemini-workflow.ts';
import { GeminiProvider } from './lib/providers/gemini-provider.js';
import { ChatGPTProvider } from './lib/providers/chatgpt-provider.js';
import type { AIProvider } from './lib/types.js';

async function run() {
  const { fileName, targetLang, provider: providerType } = parseBotArgs();
  const paths = await resolveBotPaths(fileName, targetLang);

  console.log(`📖 Чтение исходного файла: ${paths.ruPath}`);
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

  let provider: AIProvider;
  if (providerType === 'chatgpt') {
    provider = new ChatGPTProvider();
  } else {
    provider = new GeminiProvider();
  }

  console.log(`🔗 Инициализация провайдера: ${providerType}...`);
  await provider.init();

  try {
    const result = await runGeminiWorkflow(
      provider,
      ruContent,
      { main, editor, tech },
      { glossaryText, isUI: false }
    );

    if (result.status === 'success') {
      const finalJson = JSON.stringify(result.localizedJson, null, 2);
      console.log(`💾 Сохранение итогового результата: ${paths.targetPath}`);
      await fs.mkdir(paths.targetDir, { recursive: true });
      await fs.writeFile(paths.targetPath, finalJson, 'utf-8');
      console.log('✨ Цикл перевода завершен.');
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
