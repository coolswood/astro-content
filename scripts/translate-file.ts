import fs from 'fs/promises';
import { loadGlossary, formatGlossary } from './lib/glossary-utils.js';
import { loadPrompt } from './lib/prompt-loader.js';
import { resolveBotPaths, runBotValidation, listJsonFiles, isUncommitted } from './lib/bot-utils.js';
import { parseBotArgs } from './lib/bot-utils.js';
import { runGeminiWorkflow, type WorkflowOptions } from './lib/gemini-workflow.js';
import { createProvider, normalizeProviderType } from './lib/cli.js';
import { writeJsonAtomic, readJsonOr } from './lib/atomic-fs.js';
import { extractMissing, deepMerge } from './lib/json-diff.js';
import type { AIProvider } from './lib/types.js';
import path from 'path';

export interface ProcessFileOptions extends Partial<WorkflowOptions> {
  /** Полный перевод всего файла (перезапись target). По умолчанию false — только недостающие ключи. */
  full?: boolean;
}

/**
 * Обрабатывает один файл: переводит ru-источник на targetLang.
 *
 * Режимы:
 *   - incremental (по умолчанию): сравнивает ru-источник с существующим target,
 *     переводит ТОЛЬКО недостающие ключи и дополняет target (существующие не трогает).
 *   - full (--full): переводит файл целиком и перезаписывает target.
 *
 * Экспортируется для translate-file-all.ts (in-process вызов вместо subprocess).
 */
export async function processFile(
  fileName: string,
  targetLang: string,
  provider: AIProvider,
  workflowOptions: ProcessFileOptions = {},
): Promise<boolean> {
  const paths = await resolveBotPaths(fileName, targetLang);
  const full = workflowOptions.full === true;

  if (full) {
    // Полный режим: прежняя skip-логика — не перезаписывать незакоммиченное.
    try {
      await fs.access(paths.targetPath);
      if (isUncommitted(paths.targetPath)) {
        console.log(`⏩ Пропуск файла: ${paths.targetPath} (есть незакоммиченные изменения)`);
        return false;
      }
      console.log(`♻️ Файл ${paths.targetPath} закоммичен, переводим заново (полный режим)...`);
    } catch {
      // Файл не существует — переводим с нуля.
    }
  }

  console.log(`\n📄 Обработка файла: ${paths.ruPath}`);
  const ruContent = await fs.readFile(paths.ruPath, 'utf-8');
  const ruJson = JSON.parse(ruContent);

  // Инкрементальный режим: извлечь недостающее поддерево.
  let existingTarget: Record<string, any> = {};
  let toTranslate: any = ruJson;
  if (!full) {
    existingTarget = await readJsonOr<Record<string, any>>(paths.targetPath, {});
    const missing = extractMissing(ruJson, existingTarget);
    if (missing === null) {
      console.log(`✅ Все ключи уже переведены для ${targetLang} (${paths.targetPath}). Пропуск.`);
      return false;
    }
    const missingLeaves = collectLeavesCount(missing);
    const totalLeaves = collectLeavesCount(ruJson);
    console.log(
      `🔍 Инкрементальный режим: недостает ${missingLeaves}/${totalLeaves} ключей. ` +
        `Переводим только их и дополним ${paths.targetPath}.`,
    );
    toTranslate = missing;
  } else {
    console.log(`🔍 Полный режим: переводим весь файл (${collectLeavesCount(ruJson)} ключей).`);
  }

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
    JSON.stringify(toTranslate),
    { main, editor, tech },
    {
      glossaryText,
      isUI: false,
      models: {
        stage1: 'Думающая',
        stage2: 'Думающая',
        stage3: 'Pro',
      },
      ...workflowOptions,
    },
  );

  if (result.status === 'success' && result.localizedJson) {
    let finalJson: Record<string, any>;
    if (full) {
      // Полный режим: результат целиком.
      finalJson = result.localizedJson;
    } else {
      // Инкрементальный режим: мерджим переведённое в существующий target.
      finalJson = deepMerge({ ...existingTarget }, result.localizedJson);
    }
    console.log(`💾 Сохранение итогового результата: ${paths.targetPath}`);
    await writeJsonAtomic(paths.targetPath, finalJson);
    return true;
  }
  return false;
}

/** Считает число листовых путей (для логирования прогресса). */
function collectLeavesCount(obj: any): number {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return 1;
  let n = 0;
  for (const k of Object.keys(obj)) n += collectLeavesCount(obj[k]);
  return n || 1;
}

async function getTargetLangs(): Promise<string[]> {
  const i18nDir = path.join(process.cwd(), 'src/i18n');
  const items = await fs.readdir(i18nDir, { withFileTypes: true });
  return items
    .filter((item) => item.isDirectory() && item.name !== 'ru')
    .map((item) => item.name);
}

async function run() {
  const { fileName, targetLang: rawTargetLang, provider: providerType, excludeStages, intelligenceLevels } = parseBotArgs();

  const hasFullFlag = process.argv.includes('--full') || process.argv.includes('--f');
  const isAll = !rawTargetLang || rawTargetLang === 'all';
  const full = rawTargetLang === 'all' || hasFullFlag;

  const targetLangs = isAll ? await getTargetLangs() : [rawTargetLang!];

  console.log(`🌍 Перевод файла "${fileName}":`);
  console.log(`Режим: ${full ? 'ПОЛНЫЙ (перезапись target)' : 'ИНКРЕМЕНТАЛЬНЫЙ (только недостающие ключи)'}`);
  console.log(`Языки (${targetLangs.length} шт.): ${targetLangs.join(', ')}`);
  console.log(`Провайдер: ${providerType}\n`);

  const provider: AIProvider = createProvider(normalizeProviderType(providerType));
  console.log(`🔗 Инициализация провайдера ${provider.type}...`);
  await provider.init();

  const failed: string[] = [];
  try {
    for (let i = 0; i < targetLangs.length; i++) {
      const targetLang = targetLangs[i];
      console.log(`\n⏳ [${i + 1}/${targetLangs.length}] Перевод на язык "${targetLang}"...`);
      try {
        const paths = await resolveBotPaths(fileName, targetLang);
        if (paths.isDirectory) {
          console.log(`📂 Обнаружена директория: ${fileName}. Поиск JSON файлов...`);
          const files = await listJsonFiles(paths.ruPath);
          console.log(`🔎 Найдено файлов: ${files.length}`);

          for (const file of files) {
            const relativeFile = path.join(fileName, file);
            await processFile(relativeFile, targetLang, provider, {
              isPersistent: true,
              firstRun: true,
              excludeStages,
              intelligenceLevels,
              full,
            });
          }
        } else {
          await processFile(fileName, targetLang, provider, { excludeStages, intelligenceLevels, full });
        }
        runBotValidation(targetLang);
      } catch (err) {
        console.error(`❌ Ошибка перевода на "${targetLang}":`, err);
        failed.push(targetLang);
      }
    }
  } catch (error) {
    console.error('❌ Скрипт завершился с ошибкой:', error);
  } finally {
    await provider.close();
    console.log('👋 Сессия провайдера завершена.');
  }

  if (failed.length > 0) {
    console.log(`\n⚠️ Провалено языков: ${failed.length}/${targetLangs.length}: ${failed.join(', ')}`);
  }
}

run().catch(console.error);
