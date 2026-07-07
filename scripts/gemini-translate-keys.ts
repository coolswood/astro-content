import fs from 'fs/promises';
import path from 'path';
import { loadPrompt, ALL_TARGET_LANGS, LANG_NAMES } from './lib/prompt-loader.js';
import { runGeminiWorkflow } from './lib/gemini-workflow.js';
import { parseCli, createProvider, normalizeProviderType, parseNumberList } from './lib/cli.js';
import { validateLocalizedJson } from './lib/translation-validator.js';
import { writeJsonAtomic, readJsonOr } from './lib/atomic-fs.js';
import type { AIProvider, ProviderType } from './lib/types.js';

// ─────────────────────────────────────────────────────────────────────────────
// Пути к проектам.
// Канон ключей — cognitive_psy (Flutter ARB-локализация). astro-content хранит
// вспомогательный app_interface.json, который синхронизируется с app_ru.arb.
// ─────────────────────────────────────────────────────────────────────────────

/** Путь к проекту cognitive_psy (можно переопределить через --psy-dir или env). */
function resolvePsyDir(cliPsyDir?: string): string {
  if (cliPsyDir) return path.resolve(cliPsyDir);
  if (process.env.COGNITIVE_PSY_DIR) return path.resolve(process.env.COGNITIVE_PSY_DIR);
  // По умолчанию — sibling-проект: ../cognitive_psy от текущего astro-content.
  return path.resolve(process.cwd(), '..', 'cognitive_psy');
}

const APP_INTERFACE_PATH = path.join('scripts', 'app_interface.json');
const CACHE_DIR = path.join('scripts', '.translate-cache');
const ARB_FILE_PREFIX = 'app_'; // app_en.arb, app_pt_BR.arb, ...
const ARB_FILE_EXT = '.arb';

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
    flags.provider || flags.adapter || positional[0] || 'chatgpt',
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
 * Также сверяет сохранность ICU-placeholder-маркеров ({count}, {count, plural,...})
 * для ключей, где они есть в источнике. Возвращает массив описаний проблем.
 */
function validateBatch(
  localized: Record<string, any>,
  expectedLangs: string[],
  sourceJson: Record<string, any>,
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

  // Сверка placeholder-маркеров: для каждого ключа источника, содержащего {name}
  // или ICU-конструкции, перевод должен сохранить те же маркеры.
  const placeholderErrors = validatePlaceholders(localized, sourceJson);
  problems.push(...placeholderErrors);

  return problems;
}

/**
 * Извлекает ICU-placeholder-маркеры из строки: {name}, {count, plural,...} и т.д.
 * Возвращает множество канонических имён (например {"count"}, {"from","to"}).
 */
function extractPlaceholders(value: any): Set<string> {
  const set = new Set<string>();
  if (typeof value !== 'string') return set;
  // {name} или {name, type, ...} — берём первый токен внутри скобок.
  const re = /\{([a-zA-Z_][a-zA-Z0-9_]*)(?:\s*,)?/g;
  let m;
  while ((m = re.exec(value)) !== null) {
    set.add(m[1]);
  }
  return set;
}

/**
 * Для каждого языка и ключа с placeholders в источнике проверяет, что перевод
 * сохранил те же имена placeholders. Ломается ICU-структура → ретрай батча.
 */
function validatePlaceholders(
  localized: Record<string, any>,
  sourceJson: Record<string, any>,
): string[] {
  const problems: string[] = [];
  // Предрасчёт ожидаемых placeholders по ключам источника.
  const expectedByKey: Record<string, Set<string>> = {};
  for (const key of Object.keys(sourceJson)) {
    if (key.startsWith('@')) continue;
    const ph = extractPlaceholders(sourceJson[key]);
    if (ph.size > 0) expectedByKey[key] = ph;
  }
  if (Object.keys(expectedByKey).length === 0) return problems; // нет placeholders

  for (const lang in localized) {
    const langObj = localized[lang];
    if (!langObj || typeof langObj !== 'object') continue;
    for (const key in expectedByKey) {
      const translated = langObj[key];
      if (typeof translated !== 'string') continue; // отсутствие — не ошибка placeholders
      const got = extractPlaceholders(translated);
      const expected = expectedByKey[key];
      // Все ожидаемые должны быть в переводе.
      const missing = [...expected].filter((p) => !got.has(p));
      if (missing.length > 0) {
        problems.push(
          `[${lang}][${key}] потеряны placeholders: ${missing.join(', ')} (ожидались ${[...expected].join(', ')})`,
        );
      }
    }
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
    sourceJson: Record<string, any>;
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

      const problems = validateBatch(result.localizedJson, batchLangs, opts.sourceJson);
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

/** Имя ARB-файла для языка: 'en' → 'app_en.arb', 'pt_BR' → 'app_pt_BR.arb'. */
function arbFileName(langCode: string): string {
  return `${ARB_FILE_PREFIX}${langCode}${ARB_FILE_EXT}`;
}

/** Полный путь к ARB-файлу языка в cognitive_psy. */
function arbFilePath(psyDir: string, langCode: string): string {
  return path.join(psyDir, 'lib', 'l10n', arbFileName(langCode));
}

/**
 * Читает ARB как JSON. ARB — это JSON (Bun-парсер tolerant к trailing commas
 * и @@locale). Через readJsonOr: corrupt-файл логируется, отсутствующий
 * возвращает fallback.
 */
async function readArb<T = Record<string, any>>(
  arbPath: string,
  fallback: T,
): Promise<T> {
  return readJsonOr<T>(arbPath, fallback, (err) => {
    console.warn(`⚠️ ARB-файл ${arbPath} повреждён (${err.message}).`);
  });
}

/**
 * Канонический набор ключей из app_ru.arb:
 *   - realKeys: список реальных ключей в порядке ARB (без @ и @@locale)
 *   - values: { key: русское значение }
 *   - meta: { '@key': описание/placeholders } — контекст для промпта и для
 *           вписывания placeholders в target.
 */
interface ArbCanonical {
  realKeys: string[];
  values: Record<string, string>;
  meta: Record<string, any>;
  locale: string;
}

/** Загружает канон ключей из app_ru.arb. */
async function loadArbCanonical(psyDir: string): Promise<ArbCanonical> {
  const ruPath = arbFilePath(psyDir, 'ru');
  const ru = await readArb<Record<string, any>>(ruPath, {});
  const realKeys: string[] = [];
  const values: Record<string, string> = {};
  const meta: Record<string, any> = {};
  let locale = 'ru';
  for (const key of Object.keys(ru)) {
    if (key === '@@locale') {
      locale = ru[key];
    } else if (key.startsWith('@')) {
      meta[key] = ru[key]; // @key -> описание/placeholders
    } else {
      realKeys.push(key);
      values[key] = ru[key];
    }
  }
  console.log(`📚 Канон app_ru.arb: ${realKeys.length} ключей, ${Object.keys(meta).length} @-мета.`);
  return { realKeys, values, meta, locale };
}

/**
 * Синхронизирует app_interface.json с каноном: добавляет ключи из ARB, которых
 * ещё нет в app_interface.json (с русским значением + @-мета). Существующие
 * ключи не трогаются. Возвращает число добавленных.
 */
async function syncAppInterface(canonical: ArbCanonical): Promise<number> {
  const existing = await readJsonOr<Record<string, any>>(APP_INTERFACE_PATH, {});
  const updated = { ...existing };
  let added = 0;
  for (const key of canonical.realKeys) {
    if (!(key in updated)) {
      updated[key] = canonical.values[key];
      added++;
      if (`@${key}` in canonical.meta) {
        updated[`@${key}`] = canonical.meta[`@${key}`];
      }
    }
  }
  if (added > 0) {
    await writeJsonAtomic(APP_INTERFACE_PATH, updated);
    console.log(`📝 app_interface.json: добавлено ${added} новых ключей из app_ru.arb.`);
  } else {
    console.log(`✅ app_interface.json уже актуален (все ключи канона присутствуют).`);
  }
  return added;
}

/**
 * Для каждого языка находит ключи канона, отсутствующие в target app_<lang>.arb.
 * Возвращает map langCode → список недостающих ключей (в порядке канона).
 */
async function findMissingPerLang(
  psyDir: string,
  langs: string[],
  canonical: ArbCanonical,
): Promise<Record<string, string[]>> {
  const result: Record<string, string[]> = {};
  for (const lang of langs) {
    const target = await readArb<Record<string, any>>(arbFilePath(psyDir, lang), {});
    const presentKeys = new Set(
      Object.keys(target).filter((k) => !k.startsWith('@') && k !== '@@locale'),
    );
    result[lang] = canonical.realKeys.filter((k) => !presentKeys.has(k));
  }
  return result;
}

/**
 * Формирует sourceJson для перевода: объединение недостающих ключей по всем
 * языкам (переводятся сразу для всех языков батчами). Для каждого ключа —
 * русское значение + @-мета как контекст (как в прежней версии для промпта).
 */
function buildSourceJson(
  missingPerLang: Record<string, string[]>,
  canonical: ArbCanonical,
): Record<string, any> {
  const union = new Set<string>();
  for (const lang in missingPerLang) {
    for (const k of missingPerLang[lang]) union.add(k);
  }
  const sourceJson: Record<string, any> = {};
  for (const key of union) {
    sourceJson[key] = canonical.values[key];
    if (`@${key}` in canonical.meta) {
      sourceJson[`@${key}`] = canonical.meta[`@${key}`];
    }
  }
  return sourceJson;
}

/**
 * Вписывает переводы в target app_<lang>.arb: добавляет только недостающие
 * ключи (существующие НЕ перезаписываются), переносит @<key> с placeholders
 * из канона (по конвенции cognitive_psy), сохраняет @@locale.
 *
 * @param onlyKeys  ограничение: вписать только эти ключи (недостающие для языка),
 *                  отсортированные в порядке канона.
 */
async function writeArbTarget(
  psyDir: string,
  langCode: string,
  translations: Record<string, string>,
  canonical: ArbCanonical,
  onlyKeys: string[],
): Promise<number> {
  const targetPath = arbFilePath(psyDir, langCode);
  const target = await readArb<Record<string, any>>(targetPath, {});

  // Если target пуст (нет даже @@locale) — создаём с правильным locale.
  if (!('@@locale' in target)) {
    target['@@locale'] = langCode;
  }

  const wantSet = new Set(onlyKeys);
  let written = 0;
  // Идём по каноническому порядку ключей и дописываем недостающие переводы.
  for (const key of canonical.realKeys) {
    if (!wantSet.has(key)) continue;
    if (key in translations) {
      target[key] = translations[key];
      written++;
      // Перенос @<key> только если в каноне есть placeholders (конвенция
      // cognitive_psy: в target хранятся только placeholders-мета, без описаний).
      const meta = canonical.meta[`@${key}`];
      if (meta && meta.placeholders) {
        target[`@${key}`] = { placeholders: meta.placeholders };
      }
    }
  }
  await writeJsonAtomic(targetPath, target);
  return written;
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
  const cli = parseCli();
  const {
    excludeStages,
    intelligenceLevels,
    provider: providerType,
    batchSize,
    retries,
    langs: langsArg,
    force,
  } = parseKeysArgs();

  const psyDir = resolvePsyDir(cli.flags['psy-dir']);
  console.log(`🌍 Перевод интерфейса → cognitive_psy (батчами по ${batchSize} языков).`);
  console.log(`📂 cognitive_psy: ${psyDir}`);

  // 1. Загрузить канон ключей из app_ru.arb.
  const canonical = await loadArbCanonical(psyDir);
  if (canonical.realKeys.length === 0) {
    console.error(`❌ Не удалось прочитать ключи из ${arbFilePath(psyDir, 'ru')}.`);
    return;
  }

  // 2. Синхронизировать app_interface.json с каноном (добавить недостающие).
  await syncAppInterface(canonical);

  // 3. Определить набор языков с проверкой поддержки.
  const allLangs = langsArg ? [...langsArg] : [...ALL_TARGET_LANGS];
  const unknownLangs = allLangs.filter((l) => !(l in LANG_NAMES));
  if (unknownLangs.length) {
    console.error(
      `❌ Неизвестные коды языков: ${unknownLangs.join(', ')}. Поддерживаются: ${Object.keys(LANG_NAMES).join(', ')}`,
    );
    return;
  }

  // 4. Найти недостающие переводы по каждому языку.
  const missingPerLang = await findMissingPerLang(psyDir, allLangs, canonical);
  const langsToTranslate = allLangs.filter((l) => (missingPerLang[l]?.length ?? 0) > 0);
  const totalMissing = langsToTranslate.reduce((s, l) => s + missingPerLang[l].length, 0);
  if (langsToTranslate.length === 0) {
    console.log(`✅ Все ключи уже переведены для всех ${allLangs.length} языков. Нечего делать.`);
    return;
  }
  console.log(
    `📦 Недостающих переводов: ${totalMissing} по ${langsToTranslate.length}/${allLangs.length} языкам.`,
  );
  for (const l of langsToTranslate) {
    console.log(`   ${l}: ${missingPerLang[l].length} ключей`);
  }

  // 5. Сформировать источник перевода (объединение недостающих ключей).
  const sourceJson = buildSourceJson(missingPerLang, canonical);
  const sourceKeyCount = Object.keys(sourceJson).filter((k) => !k.startsWith('@')).length;
  console.log(`🗂  Уникальных ключей к переводу: ${sourceKeyCount}`);
  if (excludeStages.length > 0) {
    console.log(`⏭  Пропускаемые этапы: ${excludeStages.join(', ')}`);
  } else {
    console.log(`🎯 Прогон через все 3 этапа (перевод → редактура → тех-аудит).`);
  }

  // 6. Перевести батчами (кэш/resume/ретраи — без изменений).
  const provider = createProvider(providerType);
  console.log(`🔗 Инициализация провайдера ${provider.type}...`);
  await provider.init();

  const batches = chunkLangs(langsToTranslate, batchSize);
  const runId = await buildRunId(sourceJson, langsToTranslate);
  const cache = force ? {} : await loadCache(runId);
  if (Object.keys(cache).length > 0) {
    const cachedLangs = Object.values(cache).flatMap((o) => Object.keys(o));
    console.log(
      `♻  Кэш запуска ${runId}: уже готовы ${cachedLangs.length}/${langsToTranslate.length} языков (${cachedLangs.join(', ')}).`,
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
        console.log(`\n✅ [${i + 1}/${batches.length}] Батч ${batchKey} взят из кэша.`);
        continue;
      }

      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`📦 [${i + 1}/${batches.length}] Батч: ${batchKey}`);

      try {
        const localized = await processBatch(provider, batch, sourceJsonStr, {
          excludeStages,
          intelligenceLevels,
          retries,
          sourceJson,
        });
        cache[batchKey] = localized;
        await saveCache(runId, cache);
      } catch (e: any) {
        console.error(`🛑 [${i + 1}/${batches.length}] Батч ${batchKey} провален: ${e?.message ?? e}`);
        failed.push(batch);
        // Не падаем целиком — продолжаем остальные батчи.
      }
    }

    if (failed.length > 0) {
      console.log(
        `\n⚠️ Провалено батчей: ${failed.length}/${batches.length} (языки: ${failed.flat().join(', ')}).`,
      );
      console.log(`   Кэш ${runId} сохранён — можно перезапустить для resume.`);
    }

    // 7. Склейка успешных результатов.
    const merged: Record<string, any> = {};
    for (const batchKey in cache) {
      for (const lang in cache[batchKey]) {
        merged[lang] = { ...merged[lang], ...cache[batchKey][lang] };
      }
    }

    const succeededLangs = Object.keys(merged);
    console.log(`\n📊 --- ИТОГОВЫЙ РЕЗУЛЬТАТ ---`);
    console.log(`✅ Переведено языков: ${succeededLangs.length}/${langsToTranslate.length}`);
    if (succeededLangs.length < langsToTranslate.length) {
      const missed = langsToTranslate.filter((l) => !(l in merged));
      console.log(`❌ Не переведены: ${missed.join(', ')}`);
    }

    // Финальная валидация письменностей.
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

    // 8. Вписать переводы в target ARB (только недостающие ключи каждого языка).
    console.log(`\n💾 Запись переводов в cognitive_psy ARB-файлы...`);
    let totalWritten = 0;
    for (const lang of succeededLangs) {
      const translations = merged[lang];
      // Вписываем только те ключи, что были недостающими для этого языка.
      const onlyKeys = missingPerLang[lang] ?? [];
      const written = await writeArbTarget(psyDir, lang, translations, canonical, onlyKeys);
      if (written > 0) {
        console.log(`   ${lang}: добавлено ${written} ключей в ${arbFileName(lang)}`);
      }
      totalWritten += written;
    }
    console.log(`✅ Всего вписано ${totalWritten} переводов в ARB-файлы cognitive_psy.`);
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
  } finally {
    await provider.close();
    console.log('\n👋 Сессия завершена.');
  }
}

run().catch(console.error);
