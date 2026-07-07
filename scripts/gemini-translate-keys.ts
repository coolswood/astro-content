import fs from 'fs/promises';
import path from 'path';
import { loadPrompt, ALL_TARGET_LANGS, LANG_NAMES } from './lib/prompt-loader.js';
import { runGeminiWorkflow } from './lib/gemini-workflow.js';
import { parseBotArgs } from './lib/bot-utils.js';
import { GeminiProvider } from './lib/providers/gemini-provider.js';
import { ChatGPTProvider } from './lib/providers/chatgpt-provider.js';
import { ClaudeProvider } from './lib/providers/claude-provider.js';
import { MistralProvider } from './lib/providers/mistral-provider.js';
import { validateLocalizedJson } from './lib/translation-validator.js';
import type { AIProvider } from './lib/types.js';

const SOURCE_PATH = 'scripts/app_interface.json';
const TARGET_PT_BR_PATH = 'src/i18n/pt_br/app_interface.json';
const CACHE_DIR = path.join('scripts', '.translate-cache');

// Языки обрабатываются батчами не больше этого размера: так модель не теряет
// языки, не смешивает письменности (корейский в японском и т.п.) и стабильнее
// отдаёт валидный JSON на всех трёх этапах.
const DEFAULT_BATCH_SIZE = 3;
const DEFAULT_RETRIES = 2;

interface ParsedArgs {
  excludeStages: number[];
  intelligenceLevels: number[];
  provider: string;
  batchSize: number;
  retries: number;
  langs: string[] | null; // null = все поддерживаемые языки
  force: boolean; // игнорировать кэш и переводить заново
}

function parseKeysArgs(): ParsedArgs {
  const args: Record<string, string> = {};
  const positional: string[] = [];

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--')) {
      const nextArg = process.argv[i + 1];
      if (nextArg && !nextArg.startsWith('--')) {
        args[arg.slice(2)] = nextArg;
        i++;
      } else {
        args[arg.slice(2)] = 'true';
      }
    } else {
      positional.push(arg);
    }
  }

  const provider = (
    args.provider ||
    args.adapter ||
    positional[0] ||
    'gemini'
  ).toLowerCase() as 'gemini' | 'chatgpt' | 'claude' | 'mistral';

  const excludeStr = args.exclude || args.skip || '';
  const excludeStages = excludeStr ? excludeStr.split(',').map(Number) : [];

  const modesStr = args.modes || args.levels || '';
  const intelligenceLevels = modesStr
    ? modesStr.split(',').map(Number)
    : [2, 2, 3];

  const batchSize = parseInt(args['batch-size'] || String(DEFAULT_BATCH_SIZE));
  const retries = parseInt(args.retries || String(DEFAULT_RETRIES));
  const force = args.force === 'true' || args.f === 'true';

  let langs: string[] | null = null;
  if (args.langs || args.lang) {
    langs = (args.langs || args.lang)
      .split(',')
      .map((l) => l.trim().toLowerCase().replace('-', '_'))
      .filter(Boolean);
  }

  return {
    excludeStages,
    intelligenceLevels,
    provider,
    batchSize,
    retries,
    langs,
    force,
  };
}

function createProvider(providerType: string): AIProvider {
  switch (providerType) {
    case 'chatgpt':
      return new ChatGPTProvider();
    case 'claude':
      return new ClaudeProvider();
    case 'mistral':
      return new MistralProvider();
    case 'gemini':
    default:
      return new GeminiProvider();
  }
}

/**
 * Разбивает массив языков на батчи фиксированного размера с сохранением порядка.
 */
function chunkLangs(langs: string[], size: number): string[][] {
  if (size < 1) size = 1;
  const chunks: string[][] = [];
  for (let i = 0; i < langs.length; i += size) {
    chunks.push(langs.slice(i, i + size));
  }
  return chunks;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Для каждого языка проверяет наличие style.txt (без него перевод идёт только
 * по общим правилам из common.txt). Возвращает map код -> есть/нет стиль.
 */
async function checkStylesAvailability(
  langs: string[],
): Promise<Record<string, boolean>> {
  const result: Record<string, boolean> = {};
  for (const lang of langs) {
    const stylePath = path.join('scripts', 'prompts', lang, 'style.txt');
    try {
      await fs.access(stylePath);
      result[lang] = true;
    } catch {
      result[lang] = false;
    }
  }
  return result;
}

/**
 * Читает кэш успешных батчей из CACHE_DIR (для resume при повторном запуске).
 * Возвращает map cacheKey -> локализованный объект по языкам.
 */
async function loadCache(
  runId: string,
): Promise<Record<string, Record<string, any>>> {
  const cacheFile = path.join(CACHE_DIR, `${runId}.json`);
  try {
    const content = await fs.readFile(cacheFile, 'utf-8');
    return JSON.parse(content);
  } catch {
    return {};
  }
}

async function saveCache(
  runId: string,
  cache: Record<string, Record<string, any>>,
): Promise<void> {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  const cacheFile = path.join(CACHE_DIR, `${runId}.json`);
  await fs.writeFile(cacheFile, JSON.stringify(cache, null, 2), 'utf-8');
}

/**
 * Проверяет, что результат батча содержит ровно ожидаемые языки и что ни в одном
 * из них нет посторонних письменностей (валидируются символы через SCRIPT_MAP).
 * Возвращает массив описаний проблем (пустой = всё хорошо).
 */
function validateBatch(
  localized: Record<string, any>,
  expectedLangs: string[],
): string[] {
  const problems: string[] = [];

  const got = Object.keys(localized).sort();
  const expected = [...expectedLangs].sort();
  if (got.join(',') !== expected.join(',')) {
    const missing = expected.filter((l) => !got.includes(l));
    const extra = got.filter((l) => !expected.includes(l));
    if (missing.length) problems.push(`отсутствуют языки: ${missing.join(', ')}`);
    if (extra.length)
      problems.push(`лишние языки: ${extra.join(', ')} (ожидались только ${expectedLangs.join(', ')})`);
  }

  const charErrors = validateLocalizedJson(localized);
  for (const lang in charErrors) {
    problems.push(
      `[${lang}] подозрительные символы/слова: ${[...new Set(charErrors[lang])].slice(0, 8).join(', ')}`,
    );
  }

  return problems;
}

/**
 * Прогоняет один батч языков через все включённые этапы с ретраями.
 * Каждый ретрай идёт в новом чате (shouldStartNewChat=true) на чистую.
 */
async function processBatch(
  provider: AIProvider,
  batchLangs: string[],
  sourceJsonStr: string,
  opts: {
    excludeStages: number[];
    intelligenceLevels: number[];
    retries: number;
  },
): Promise<Record<string, any>> {
  const langList = batchLangs
    .map((l) => `${l} (${LANG_NAMES[l] ?? l})`)
    .join(', ');
  console.log(`\n🌐 Батч языков: ${langList}`);

  const [main, editor, tech, stylesAvailability] = await Promise.all([
    loadPrompt('keys', 'main', batchLangs),
    loadPrompt('keys', 'editor', batchLangs),
    loadPrompt('keys', 'tech', batchLangs),
    checkStylesAvailability(batchLangs),
  ]);
  const withoutStyle = batchLangs.filter((l) => !stylesAvailability[l]);
  if (withoutStyle.length > 0) {
    console.log(
      `ℹ️  Без отдельного style.txt (перевод по общим правилам): ${withoutStyle.join(', ')}`,
    );
  }

  let lastError: unknown = null;
  for (let attempt = 1; attempt <= opts.retries + 1; attempt++) {
    if (attempt > 1) {
      console.log(`\n🔁 Повторная попытка ${attempt}/${opts.retries + 1} для батча...`);
      // Небольшая пауза перед ретраем снижает нагрузку на браузер/провайдера.
      await sleep(3000);
    }

    try {
      const result = await runGeminiWorkflow(
        provider,
        sourceJsonStr,
        { main, editor, tech },
        {
          isUI: false,
          // Каждый батч/попытка — новый чат, чтобы языки из разных батчей
          // не «протекали» друг в друга и ретраи шли на чистую.
          firstRun: true,
          isPersistent: false,
          excludeStages: opts.excludeStages,
          intelligenceLevels: opts.intelligenceLevels,
          models: {
            stage1: 'Думающая',
          },
        },
      );

      if (result.status !== 'success' || !result.localizedJson) {
        throw new Error(`workflow вернул статус: ${result.status}`);
      }

      const problems = validateBatch(result.localizedJson, batchLangs);
      if (problems.length > 0) {
        console.warn(
          `⚠️ Валидация батча не пройдена (попытка ${attempt}/${opts.retries + 1}):`,
        );
        for (const p of problems) console.warn(`   • ${p}`);
        // Сохраняем ошибку и идём на ретрай — модель часто исправляется со второй попытки.
        lastError = new Error(`Validation failed: ${problems.join('; ')}`);
        continue;
      }

      console.log(`✅ Батч принят: ${batchLangs.join(', ')}`);
      return result.localizedJson;
    } catch (e: any) {
      lastError = e;
      console.warn(
        `⚠️ Ошибка батча (попытка ${attempt}/${opts.retries + 1}): ${e?.message ?? e}`,
      );
    }
  }

  throw new Error(
    `Батч ${batchLangs.join(',')} провален после ${opts.retries + 1} попыток: ${
      (lastError as any)?.message ?? lastError
    }`,
  );
}

/**
 * Загружает источник перевода.
 * - Если файл не передан (start.json по умолчанию): автоматическое сравнение
 *   SOURCE_PATH с TARGET_PT_BR_PATH и возврат только недостающих ключей.
 * - Иначе: аргумент трактуется как JSON-строка или путь к файлу.
 */
async function loadSourceJson(fileName: string): Promise<{
  sourceJson: any;
  isAutoMode: boolean;
}> {
  if (fileName === 'start.json') {
    console.log(
      `🔍 Режим автоматического сравнения: ${SOURCE_PATH} vs ${TARGET_PT_BR_PATH}`,
    );
    const sourceContent = await fs.readFile(SOURCE_PATH, 'utf-8');
    const targetContent = await fs.readFile(TARGET_PT_BR_PATH, 'utf-8');
    const sourceFull = JSON.parse(sourceContent);
    const targetFull = JSON.parse(targetContent);

    const missingKeys: Record<string, any> = {};
    for (const key in sourceFull) {
      if (key.startsWith('@')) continue; // мета-ключи не считаем
      if (!(key in targetFull)) {
        missingKeys[key] = sourceFull[key];
        if (`@${key}` in sourceFull) {
          missingKeys[`@${key}`] = sourceFull[`@${key}`];
        }
      }
    }

    if (Object.keys(missingKeys).length === 0) {
      console.log('✅ Все ключи уже переведены для pt_br.');
      return { sourceJson: null, isAutoMode: true };
    }

    console.log(
      `📦 Найдено новых ключей для перевода: ${Object.keys(missingKeys).filter((k) => !k.startsWith('@')).length}`,
    );
    return { sourceJson: missingKeys, isAutoMode: true };
  }

  // Сначала пробуем как JSON-строку, затем как путь к файлу.
  try {
    return { sourceJson: JSON.parse(fileName), isAutoMode: false };
  } catch {
    const fileContent = await fs.readFile(fileName, 'utf-8');
    return { sourceJson: JSON.parse(fileContent), isAutoMode: false };
  }
}

/**
 * Детерминированный идентификатор запуска: зависит от набора исходных ключей.
 * Позволяет переиспользовать кэш успешных батчей при повторном запуске
 * с тем же источником (resume после сбоя).
 */
async function buildRunId(sourceJson: any, langs: string[]): Promise<string> {
  const crypto = await import('crypto');
  const hash = crypto
    .createHash('sha1')
    .update(JSON.stringify(sourceJson))
    .update('|')
    .update(langs.join(','))
    .digest('hex')
    .slice(0, 12);
  return `run_${hash}`;
}

async function run() {
  const { fileName } = parseBotArgs();
  const {
    excludeStages,
    intelligenceLevels,
    provider: providerType,
    batchSize,
    retries,
    langs: langsArg,
    force,
  } = parseKeysArgs();

  console.log(`🌍 Запуск мультиязычного перевода (батчами по ${batchSize} языков)...`);

  const { sourceJson, isAutoMode } = await loadSourceJson(fileName);
  if (sourceJson === null) {
    // auto-режим, нечего переводить
    process.exit(0);
  }

  // Формируем итоговый список языков с проверкой, что все они поддерживаются.
  const allLangs = langsArg ? [...langsArg] : [...ALL_TARGET_LANGS];
  const unknownLangs = allLangs.filter((l) => !(l in LANG_NAMES));
  if (unknownLangs.length) {
    console.error(
      `❌ Неизвестные коды языков: ${unknownLangs.join(', ')}. Поддерживаются: ${Object.keys(LANG_NAMES).join(', ')}`,
    );
    process.exit(1);
  }

  console.log(`🗂  Всего языков: ${allLangs.length} → ${allLangs.join(', ')}`);
  if (excludeStages.length > 0) {
    console.log(`⏭  Пропускаемые этапы: ${excludeStages.join(', ')}`);
  } else {
    console.log(`🎯 Прогон через все 3 этапа (перевод → редактура → тех-аудит).`);
  }

  const provider = createProvider(providerType);
  console.log(`🔗 Инициализация провайдера ${provider.type}...`);
  await provider.init();

  const batches = chunkLangs(allLangs, batchSize);
  const runId = await buildRunId(sourceJson, allLangs);
  const cache = force ? {} : await loadCache(runId);
  if (Object.keys(cache).length > 0) {
    const cachedLangs = Object.values(cache).flatMap((o) => Object.keys(o));
    console.log(
      `♻  Кэш запуска ${runId}: уже готовы ${cachedLangs.length}/${allLangs.length} языков (${cachedLangs.join(', ')}).`,
    );
  } else {
    console.log(`🆕 Свежий запуск ${runId}.`);
  }

  const sourceJsonStr = JSON.stringify(sourceJson);
  let failed: string[][] = [];

  try {
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      const batchKey = batch.join(',');
      const cachedBatch = cache[batchKey];

      // Resume: пропускаем батчи, уже целиком лежащие в кэше.
      if (cachedBatch && batch.every((l) => l in cachedBatch)) {
        console.log(
          `\n✅ [${i + 1}/${batches.length}] Батч ${batchKey} взят из кэша.`,
        );
        continue;
      }

      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`📦 [${i + 1}/${batches.length}] Батч: ${batchKey}`);

      try {
        const localized = await processBatch(provider, batch, sourceJsonStr, {
          excludeStages,
          intelligenceLevels,
          retries,
        });
        cache[batchKey] = localized;
        await saveCache(runId, cache);
      } catch (e: any) {
        console.error(`🛑 [${i + 1}/${batches.length}] Батч ${batchKey} провален: ${e?.message ?? e}`);
        failed.push(batch);
        // Не падаем целиком — продолжаем остальные батчи, провалившиеся разоберём в конце.
      }
    }

    if (failed.length > 0) {
      console.log(
        `\n⚠️ Провалено батчей: ${failed.length}/${batches.length} (языки: ${failed.flat().join(', ')}).`,
      );
      console.log(`   Кэш ${runId} сохранён — можно перезапустить для resume.`);
    }

    // Склейка всех успешных результатов в единый объект { lang: { key: val } }.
    const merged: Record<string, any> = {};
    for (const batchKey in cache) {
      for (const lang in cache[batchKey]) {
        merged[lang] = { ...merged[lang], ...cache[batchKey][lang] };
      }
    }

    const succeededLangs = Object.keys(merged);
    console.log(`\n📊 --- ИТОГОВЫЙ РЕЗУЛЬТАТ ---`);
    console.log(`✅ Переведено языков: ${succeededLangs.length}/${allLangs.length}`);
    if (succeededLangs.length < allLangs.length) {
      const missed = allLangs.filter((l) => !(l in merged));
      console.log(`❌ Не переведены: ${missed.join(', ')}`);
    }

    // Финальная валидация на склеенном объекте (дублирует по-батчевую, но даёт общую картину).
    const validationErrors = validateLocalizedJson(merged);
    if (Object.keys(validationErrors).length > 0) {
      console.warn('\n⚠️ ОБНАРУЖЕНЫ ОШИБКИ ВАЛИДАЦИИ ПЕРЕВОДА:');
      for (const lang in validationErrors) {
        console.warn(
          `❌ [${lang}]: ${[...new Set(validationErrors[lang])].slice(0, 8).join(', ')}`,
        );
      }
    } else {
      console.log('\n✅ Валидация пройдена: некорректных символов не обнаружено.');
    }

    console.log('\n📄 Склеенный результат:');
    console.log(JSON.stringify(merged, null, 2));

    // В auto-режиме обновляем pt_br-файл, если есть валидный перевод.
    if (isAutoMode && merged.pt_BR) {
      console.log(`\n💾 Обновление ${TARGET_PT_BR_PATH}...`);
      const targetContent = await fs.readFile(TARGET_PT_BR_PATH, 'utf-8');
      const targetFull = JSON.parse(targetContent);
      const updatedTarget = { ...targetFull, ...merged.pt_BR };
      await fs.writeFile(
        TARGET_PT_BR_PATH,
        JSON.stringify(updatedTarget, null, 2) + '\n',
        'utf-8',
      );
      console.log('✅ Файл успешно обновлён.');
    }
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
  } finally {
    await provider.close();
    console.log('\n👋 Сессия завершена.');
  }
}

run().catch(console.error);
