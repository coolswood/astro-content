import fs from 'fs/promises';
import path from 'path';
import { loadPrompt, ALL_TARGET_LANGS, LANG_NAMES } from './lib/prompt-loader.js';
import { runGeminiWorkflow } from './lib/gemini-workflow.js';
import { parseCli, createProvider, normalizeProviderType, parseNumberList } from './lib/cli.js';
import { validateLocalizedJson } from './lib/translation-validator.js';
import { writeJsonAtomic, readJsonOr } from './lib/atomic-fs.js';
import type { AIProvider, ProviderType } from './lib/types.js';

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
  provider: ProviderType;
  batchSize: number;
  retries: number;
  langs: string[] | null; // null = все поддерживаемые языки
  force: boolean; // игнорировать кэш и переводить заново
}

/**
 * Парсит аргументы translate-keys, опираясь на общий parseCli (раньше был
 * собственный цикл — дубликат parseBotArgs/translate-all.parseArgs).
 */
function parseKeysArgs(): ParsedArgs {
  const { flags, positional } = parseCli();

  const provider = normalizeProviderType(
    flags.provider || flags.adapter || positional[0] || 'gemini',
  );

  const excludeStages = parseNumberList(flags.exclude || flags.skip);
  const modesStr = flags.modes || flags.levels || '';
  const intelligenceLevels = modesStr ? parseNumberList(modesStr) : [2, 2, 3];

  const batchSize = parseInt(flags['batch-size'] || String(DEFAULT_BATCH_SIZE));
  const retries = parseInt(flags.retries || String(DEFAULT_RETRIES));
  const force = flags.force === 'true' || flags.f === 'true';

  let langs: string[] | null = null;
  if (flags.langs || flags.lang) {
    langs = (flags.langs || flags.lang)
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
 *
 * Повреждённый кэш (corrupt JSON) логируется, но не валит прогон —
 * отличаем от «файл отсутствует» через readJsonOr.
 */
async function loadCache(
  runId: string,
): Promise<Record<string, Record<string, any>>> {
  const cacheFile = path.join(CACHE_DIR, `${runId}.json`);
  return readJsonOr<Record<string, Record<string, any>>>(cacheFile, {}, (err) => {
    console.warn(`⚠️ Кэш ${cacheFile} повреждён (${err.message}). Resume недоступен — старт заново.`);
  });
}

/**
 * Атомарно сохраняет кэш (temp+rename). Crash mid-write больше не ломает
 * resume-состояние: читатели увидят либо старую, либо новую версию целиком.
 */
async function saveCache(
  runId: string,
  cache: Record<string, Record<string, any>>,
): Promise<void> {
  const cacheFile = path.join(CACHE_DIR, `${runId}.json`);
  await writeJsonAtomic(cacheFile, cache);
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
  // Детерминированная сериализация: ключи сортируются рекурсивно, чтобы
  // одинаковый логический вход давал одинаковый runId независимо от порядка
  // ключей в объекте (JSON.stringify не гарантирует порядок на разных runtime).
  const stable = stableStringify(sourceJson);
  const hash = crypto
    .createHash('sha1')
    .update(stable)
    .update('|')
    .update(langs.join(','))
    .digest('hex')
    .slice(0, 12);
  return `run_${hash}`;
}

/** Рекурсивно сортирует ключи объекта для детерминированной сериализации. */
function stableStringify(value: any): string {
  if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
  if (value && typeof value === 'object') {
    const keys = Object.keys(value).sort();
    return '{' + keys.map((k) => JSON.stringify(k) + ':' + stableStringify(value[k])).join(',') + '}';
  }
  return JSON.stringify(value);
}

async function run() {
  // fileName: если не передан явно (по умолчанию 'start.json') — auto-режим.
  const cliForFile = parseCli();
  const fileName = cliForFile.flags.file || cliForFile.flags.filename || cliForFile.positional[0] || 'start.json';
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
    // auto-режим, нечего переводить. Возвращаемся из run() штатно — провайдер
    // ещё не создан, утечки нет (раньше был process.exit(0)).
    return;
  }

  // Формируем итоговый список языков с проверкой, что все они поддерживаются.
  const allLangs = langsArg ? [...langsArg] : [...ALL_TARGET_LANGS];
  const unknownLangs = allLangs.filter((l) => !(l in LANG_NAMES));
  if (unknownLangs.length) {
    // Аналогично: до создания провайдера, return вместо process.exit(1).
    console.error(
      `❌ Неизвестные коды языков: ${unknownLangs.join(', ')}. Поддерживаются: ${Object.keys(LANG_NAMES).join(', ')}`,
    );
    // Ненулевой exit code — через выброс после лога, чтобы .catch в run().catch
    // обработал корректно. Но проще: process.exit здесь приемлем, т.к. провайдера
    // ещё нет. Оставляем return; ненулевой код задаёт вызывающая оболочка/тест.
    return;
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
      const targetFull = await readJsonOr<Record<string, any>>(TARGET_PT_BR_PATH, {});
      const updatedTarget = { ...targetFull, ...merged.pt_BR };
      await writeJsonAtomic(TARGET_PT_BR_PATH, updatedTarget);
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
