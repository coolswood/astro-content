import fs from 'fs/promises';
import { loadPrompt } from './lib/prompt-loader.js';
import { runGeminiWorkflow } from './lib/gemini-workflow.js';
import { parseBotArgs } from './lib/bot-utils.js';
import { GeminiProvider } from './lib/providers/gemini-provider.js';
import { ChatGPTProvider } from './lib/providers/chatgpt-provider.js';
import { ClaudeProvider } from './lib/providers/claude-provider.js';
import { MistralProvider } from './lib/providers/mistral-provider.js';
import { validateLocalizedJson } from './lib/translation-validator.js';
import type { AIProvider } from './lib/types.js';

async function run() {
  const { 
    fileName, 
    targetLang: cliLang, 
    excludeStages: cliExclude, 
    provider: providerType,
    intelligenceLevels
  } = parseBotArgs();
  const promptLang = 'all';
  
  let sourceJson: any;
  let isAutoMode = false;

  const SOURCE_PATH = 'scripts/app_interface.json';
  const TARGET_PT_BR_PATH = 'src/i18n/pt_br/app_interface.json';

  // Если имя файла 'start.json' (значение по умолчанию в parseBotArgs), 
  // значит конкретный вход не был передан — запускаем автоматическое сравнение.
  if (fileName === 'start.json') {
    console.log(
      `🔍 Режим автоматического сравнения: ${SOURCE_PATH} vs ${TARGET_PT_BR_PATH}`,
    );
    try {
      const sourceContent = await fs.readFile(SOURCE_PATH, 'utf-8');
      const targetContent = await fs.readFile(TARGET_PT_BR_PATH, 'utf-8');
      const sourceFull = JSON.parse(sourceContent);
      const targetFull = JSON.parse(targetContent);

      const missingKeys: Record<string, any> = {};
      for (const key in sourceFull) {
        if (key.startsWith('@')) continue; // Пропускаем мета-ключи при поиске отличий
        if (!(key in targetFull)) {
          missingKeys[key] = sourceFull[key];
          // Если есть мета-данные для этого ключа (ARB-формат), добавляем их как контекст для AI
          if (`@${key}` in sourceFull) {
            missingKeys[`@${key}`] = sourceFull[`@${key}`];
          }
        }
      }

      if (Object.keys(missingKeys).length === 0) {
        console.log('✅ Все ключи уже переведены для pt_br.');
        process.exit(0);
      }

      console.log(
        `📦 Найдено новых ключей для перевода: ${Object.keys(missingKeys).length}`,
      );
      sourceJson = missingKeys;
      isAutoMode = true;
    } catch (e) {
      console.error('❌ Ошибка при чтении файлов для сравнения:', e);
      process.exit(1);
    }
  } else {
    try {
      // Попытка распарсить как JSON
      sourceJson = JSON.parse(fileName);
    } catch {
      try {
        // Попытка прочитать как файл
        const fileContent = await fs.readFile(fileName, 'utf-8');
        sourceJson = JSON.parse(fileContent);
      } catch (e) {
        console.error(
          '❌ Ошибка: Не удалось распарсить аргумент как JSON или прочитать файл.',
        );
        process.exit(1);
      }
    }
  }

  console.log(`🌍 Запуск мультиязычного перевода...`);
  if (cliLang !== 'all') {
    console.log(
      `ℹ️ Параметр --lang=${cliLang} проигнорирован: для этого скрипта всегда используется мультиязычный режим (all).`,
    );
  }

  let provider: AIProvider;
  switch (providerType) {
    case 'chatgpt':
      provider = new ChatGPTProvider();
      break;
    case 'claude':
      provider = new ClaudeProvider();
      break;
    case 'mistral':
      provider = new MistralProvider();
      break;
    case 'gemini':
    default:
      provider = new GeminiProvider();
      break;
  }

  console.log(`🔗 Инициализация провайдера ${provider.type}...`);
  await provider.init();

  try {
    const [main, editor, tech] = await Promise.all([
      loadPrompt('keys', 'main', promptLang),
      loadPrompt('keys', 'editor', promptLang),
      loadPrompt('keys', 'tech', promptLang),
    ]);

    const result = await runGeminiWorkflow(
      provider,
      JSON.stringify(sourceJson),
      { main, editor, tech },
      {
        isUI: false,
        isPersistent: false,
        excludeStages: cliExclude.length > 0 ? cliExclude : [2, 3],
        intelligenceLevels,
        models: {
          stage1: 'Думающая',
        },
      },
    );

    if (result.status === 'success' && result.localizedJson) {
      console.log('\n📊 --- ИТОГОВЫЙ РЕЗУЛЬТАТ ---');
      console.log(JSON.stringify(result.localizedJson, null, 2));

      // Валидация перевода на наличие некорректных символов
      const validationErrors = validateLocalizedJson(result.localizedJson);
      if (Object.keys(validationErrors).length > 0) {
        console.warn('\n⚠️ ОБНАРУЖЕНЫ ОШИБКИ ВАЛИДАЦИИ ПЕРЕВОДА:');
        for (const lang in validationErrors) {
          console.warn(
            `❌ [${lang}]: ${[...new Set(validationErrors[lang])].join(', ')}`,
          );
        }
      } else {
        console.log(
          '\n✅ Валидация пройдена: некорректных символов не обнаружено.',
        );
      }

      if (isAutoMode && result.localizedJson.pt_BR) {
        console.log(`\n💾 Обновление ${TARGET_PT_BR_PATH}...`);
        const targetContent = await fs.readFile(TARGET_PT_BR_PATH, 'utf-8');
        const targetFull = JSON.parse(targetContent);

        // Добавляем новые переводы в конец объекта (перед закрывающей скобкой)
        // Но проще просто объединить объекты
        const updatedTarget = { ...targetFull, ...result.localizedJson.pt_BR };

        await fs.writeFile(
          TARGET_PT_BR_PATH,
          JSON.stringify(updatedTarget, null, 2) + '\n',
          'utf-8',
        );
        console.log('✅ Файл успешно обновлен.');
      }
    } else {
      console.error('🛑 Ошибка перевода.');
    }
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
  } finally {
    await provider.close();
    console.log('\n👋 Сессия завершена.');
  }
  return;
}

run().catch(console.error);
