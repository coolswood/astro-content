import fs from 'fs/promises';
import path from 'path';
import { loadGlossary, formatGlossary } from './lib/glossary-utils.js';
import { loadPrompt } from './lib/prompt-loader.js';
import { runGeminiWorkflow } from './lib/gemini-workflow.js';
import { GeminiProvider } from './lib/providers/gemini-provider.js';
import { validateLocalizedJson } from './lib/translation-validator.js';

async function run() {
  let inputArg = process.argv[2];
  const langArg = process.argv[3] || 'all';

  let sourceJson: any;
  let isAutoMode = false;

  const SOURCE_PATH = 'scripts/app_interface.json';
  const TARGET_PT_BR_PATH = 'src/i18n/pt_br/app_interface.json';

  if (!inputArg) {
    console.log(
      `🔍 Режим автоматического сравнения: ${SOURCE_PATH} vs ${TARGET_PT_BR_PATH}`,
    );
    try {
      const sourceContent = await fs.readFile(SOURCE_PATH, 'utf-8');
      const targetContent = await fs.readFile(TARGET_PT_BR_PATH, 'utf-8');
      const sourceFull = JSON.parse(sourceContent);
      const targetFull = JSON.parse(targetContent);

      const missingKeys: Record<string, string> = {};
      for (const key in sourceFull) {
        if (key.startsWith('@@')) continue; // Пропускаем мета-ключи
        if (!(key in targetFull)) {
          missingKeys[key] = sourceFull[key];
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
      sourceJson = JSON.parse(inputArg);
    } catch {
      try {
        // Попытка прочитать как файл
        const fileContent = await fs.readFile(inputArg, 'utf-8');
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

  const provider = new GeminiProvider();
  await provider.init();

  try {
    const [main, editor, tech] = await Promise.all([
      loadPrompt('keys', 'main', 'all'),
      loadPrompt('keys', 'editor', 'all'),
      loadPrompt('keys', 'tech', 'all'),
    ]);

    const result = await runGeminiWorkflow(
      provider,
      JSON.stringify(sourceJson),
      { main, editor, tech },
      {
        isUI: false,
        isPersistent: false,
        models: {
          stage1: 'Думающая',
          stage2: 'Думающая',
          stage3: 'Pro',
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
