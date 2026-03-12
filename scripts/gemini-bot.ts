import fs from 'fs/promises';
import path from 'path';
import { spawnSync } from 'child_process';
import {
  connectToBrowser,
  getGeminiPage,
  interactWithGemini,
  parseGeminiJson,
} from './lib/gemini-client.js';
import { loadGlossary, formatGlossary } from './lib/glossary-utils.js';
import { loadPrompt } from './lib/prompt-loader.js';

async function run() {
  const fileName = process.argv[2] || 'start.json';
  const targetLang = (process.argv[3] || 'pt_br')
    .toLowerCase()
    .replace('-', '_');

  const ruPath = path.join(process.cwd(), 'src/i18n/ru', fileName);
  const targetDir = path.join(process.cwd(), 'src/i18n', targetLang, '');
  const targetPath = path.join(targetDir, fileName);

  console.log(`📖 Чтение исходного файла: ${ruPath}`);
  const ruContent = await fs.readFile(ruPath, 'utf-8');

  console.log(`📜 Чтение промптов...`);
  const glossaryPath = path.join(
    process.cwd(),
    'scripts/prompts',
    targetLang,
    'partial_glossary.json',
  );
  let glossary = await loadGlossary(glossaryPath);
  if (glossary.length === 0) {
    const backupGlossaryPath = path.join(
      process.cwd(),
      'scripts/prompts',
      targetLang,
      'glossary.json',
    );
    console.log(`⚠️ Глоссарий не найден в ${glossaryPath}, пробуем ${backupGlossaryPath}`);
    glossary = await loadGlossary(backupGlossaryPath);
  }
  const glossaryText = formatGlossary(glossary);

  const [transPromptBase, editorPromptBase, techPromptBase] = await Promise.all(
    [
      loadPrompt('text', 'main', targetLang),
      loadPrompt('text', 'editor', targetLang),
      loadPrompt('text', 'tech', targetLang),
    ],
  );

  console.log('🔗 Подключение к браузеру...');
  const browser = await connectToBrowser();

  try {
    // ШАГ 1: Перевод
    console.log('\n🚀 ШАГ 1: Перевод (Transcreation)...');
    const page = await getGeminiPage(browser);
    const currentTransPrompt = transPromptBase.replace(
      '{{GLOSSARY}}',
      glossaryText,
    );
    const res1Raw = await interactWithGemini(
      page,
      `${currentTransPrompt}\n\nВот текст для перевода:\n${ruContent}`,
      'Pro',
      false,
    );
    if (res1Raw.trim().toLowerCase().includes('все хорошо')) {
      console.log('✨ Stage 1: Все хорошо, перевод не требуется.');
      await browser.disconnect();
      return;
    }
    const translatedJson = JSON.stringify(parseGeminiJson(res1Raw), null, 2);
    let res2Handled = translatedJson;
    let finalJson = translatedJson;

    // ШАГ 2: Редактура
    console.log('\n🚀 ШАГ 2: Редактура (Editing)...');
    const res2Raw = await interactWithGemini(
      page,
      `${editorPromptBase}\n\nВот текст для редактуры:\n${translatedJson}`,
      'Pro',
      true,
    );
    if (
      !res2Raw.trim().toLowerCase().includes('all set') &&
      !res2Raw.trim().toLowerCase().includes('все хорошо')
    ) {
      const partialUpdates = parseGeminiJson<Record<string, any>>(res2Raw);
      const currentData = JSON.parse(translatedJson);
      const mergedData = { ...currentData, ...partialUpdates };
      res2Handled = JSON.stringify(mergedData, null, 2);
      console.log(
        `✨ Stage 2: Применены правки для ${Object.keys(partialUpdates).length} ключей.`,
      );
    } else {
      console.log('✨ Stage 2: Без изменений (Все хорошо)');
    }

    // ШАГ 3: Технический аудит
    console.log('\n🚀 ШАГ 3: Технический аудит (Tech Review)...');
    const res3Raw = await interactWithGemini(
      page,
      `${techPromptBase}\n\nВот текст для тех-аудита:\n${res2Handled}`,
      'Pro',
      true,
    );
    if (
      !res3Raw.trim().toLowerCase().includes('all set') &&
      !res3Raw.trim().toLowerCase().includes('все хорошо')
    ) {
      const partialUpdates = parseGeminiJson<Record<string, any>>(res3Raw);
      const currentData = JSON.parse(res2Handled);
      const mergedData = { ...currentData, ...partialUpdates };
      finalJson = JSON.stringify(mergedData, null, 2);
      console.log(
        `✨ Stage 3: Применены правки для ${Object.keys(partialUpdates).length} ключей.`,
      );
    } else {
      finalJson = res2Handled;
      console.log('✨ Stage 3: Без изменений (Все хорошо)');
    }

    console.log(`💾 Сохранение итогового результата: ${targetPath}`);
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, finalJson, 'utf-8');
    console.log('✨ Цикл Gemini завершен.');

    // ВАЛИДАЦИЯ
    console.log('\n🔍 Запуск финальной валидации...');

    console.log('--- Проверка символов (check-translations.ts) ---');
    const checkResult = spawnSync(
      'bun',
      ['check-translations.ts', targetLang],
      {
        encoding: 'utf-8',
      },
    );
    console.log(checkResult.stdout || checkResult.stderr);
    if (checkResult.status !== 0) {
      console.warn('⚠️ Валидация символов не прошла!');
    }

    console.log('--- Проверка структуры (list-problematic-files.ts) ---');
    const structResult = spawnSync(
      'bun',
      ['list-problematic-files.ts', targetLang],
      {
        encoding: 'utf-8',
      },
    );
    console.log(structResult.stdout || structResult.stderr);
    if (structResult.status !== 0) {
      console.warn('⚠️ Валидация структуры JSON не прошла!');
    }

    console.log('\n🚀 Весь процесс автоматизации завершен успешно!');
  } catch (error) {
    console.error('❌ Скрипт завершился с ошибкой:', error);
  } finally {
    await browser.disconnect();
    console.log('👋 Отключено от браузера.');
  }
}

run().catch(console.error);
