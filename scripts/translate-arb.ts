import fs from 'fs/promises';
import path from 'path';
import { loadPrompt, ALL_TARGET_LANGS, LANG_NAMES } from './lib/prompt-loader.js';
import { normalizeLangCode } from './lib/lang-codes.js';
import { runGeminiWorkflow } from './lib/gemini-workflow.js';
import { parseCli, createProvider, normalizeProviderType, parseNumberList } from './lib/cli.js';
import { validateLocalizedJson } from './lib/translation-validator.js';
import { writeJsonAtomic, readJsonOr } from './lib/atomic-fs.js';
import type { AIProvider, ProviderType } from './lib/types.js';

// ─────────────────────────────────────────────────────────────────────────────
// Пути к проектам.
// Канон ключей — cognitive_psy (Flutter ARB-локализация): lib/l10n/app_ru.arb
// (генерируется tool/l10n_merge.dart из фрагментов lib/l10n/src/ru/*.arb;
// merge-скрипт жёстко валидирует, что в переводах нет ключей вне канона —
// поэтому мёртвые ключи здесь удаляются из target-файлов).
// astro-content хранит вспомогательный app_interface.json (legacy add-only
// зеркало канона, читается только translate-ui) и кэш в .translate-cache,
// включая снимок значений ru (ru_snapshot.json) — по нему детектятся
// изменившиеся русские строки, которые нужно перевести заново.
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
/**
 * Снимок значений ru на момент последней успешной записи перевода в target:
 * { lang: { key: значение ru } }. Ключ с изменившимся значением против снимка
 * переводится заново (старый перевод перезаписывается).
 */
const RU_SNAPSHOT_PATH = path.join(CACHE_DIR, 'ru_snapshot.json');
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
  dryRun: boolean; // полный анализ без вызова провайдеров и записи файлов
  retranslateChanged: boolean; // перезаписывать переводы изменившихся ru-строк
}

/**
 * Парсит булев флаг. Понимает формы `--flag` (parseCli отдаёт 'true'),
 * `--flag true|false` и `--flag=true|false` (parseCli отдаёт '=true' —
 * ведущий '=' срезается). Некорректное значение → defaultValue.
 */
function parseBoolFlag(raw: string | undefined, defaultValue: boolean): boolean {
  if (raw === undefined) return defaultValue;
  const v = raw.replace(/^=/, '').trim().toLowerCase();
  if (v === '' || v === 'true' || v === '1') return true;
  if (v === 'false' || v === '0') return false;
  console.warn(`⚠️ Некорректное значение флага «${raw}» — использую ${defaultValue}.`);
  return defaultValue;
}

/**
 * Парсит аргументы translate-arb, опираясь на общий parseCli (раньше был
 * собственный цикл — дубликат parseBotArgs/translate-file-all.parseArgs).
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
  const force = parseBoolFlag(flags.force ?? flags.f, false);
  const dryRun = parseBoolFlag(flags['dry-run'], false);
  const retranslateChanged = parseBoolFlag(flags['retranslate-changed'], true);

  let langs: string[] | null = null;
  if (flags.langs || flags.lang) {
    // Нормализация через единый источник истины: pt-BR / pt_br / ptbr → pt_BR
    // (иначе --langs pt-BR падал «неизвестный язык» из-за lowercase-формы).
    langs = (flags.langs || flags.lang)
      .split(',')
      .map((l) => normalizeLangCode(l))
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
    dryRun,
    retranslateChanged,
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

/** Снимок значений ru: lang → { key: значение ru на момент последней записи перевода }. */
type RuSnapshot = Record<string, Record<string, string>>;

/**
 * Читает снимок значений ru. По нему детектятся изменившиеся русские строки:
 * если текущее значение ключа в app_ru.arb отличается от снятого — перевод
 * устарел и ключ уходит на перевод заново. Ключей без записи в снимке
 * (переведены до появления этой фичи) не трогаем — иначе первый запуск
 * пере-перевёл бы весь каталог.
 */
async function loadRuSnapshot(): Promise<RuSnapshot> {
  return readJsonOr<RuSnapshot>(RU_SNAPSHOT_PATH, {}, (err) => {
    console.warn(
      `⚠️ Снимок ${RU_SNAPSHOT_PATH} повреждён (${err.message}). Изменения ru не будут обнаружены до первой записи переводов.`,
    );
  });
}

/** Атомарно сохраняет снимок значений ru. */
async function saveRuSnapshot(snapshot: RuSnapshot): Promise<void> {
  await writeJsonAtomic(RU_SNAPSHOT_PATH, snapshot);
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

/** Результат анализа target app_<lang>.arb против канона ru. */
interface LangAnalysis {
  /** Ключи канона, отсутствующие в target (нужно перевести и дописать). */
  missing: string[];
  /** Ключи, чьё русское значение изменилось с момента последнего перевода
   *  (перевод устарел — перевести заново и перезаписать). */
  changed: string[];
  /** Ключи target, отсутствующие в каноне ru («мёртвые» — удалить). */
  dead: string[];
}

/**
 * Анализирует каждый target app_<lang>.arb против канона:
 *   - missing — ключей канона нет в target;
 *   - changed — значение ru в снимке отличается от текущего (только для ключей,
 *     которые есть в target: отсутствующие и так попадают в missing);
 *   - dead — ключи target вне канона (лишние с точки зрения валидации
 *     tool/l10n_merge.dart в cognitive_psy).
 * Ключи в списках missing/changed — в порядке канона, dead — в порядке target.
 */
async function analyzePerLang(
  psyDir: string,
  langs: string[],
  canonical: ArbCanonical,
  snapshot: RuSnapshot,
  opts: { retranslateChanged: boolean },
): Promise<Record<string, LangAnalysis>> {
  const canonicalSet = new Set(canonical.realKeys);
  const result: Record<string, LangAnalysis> = {};
  for (const lang of langs) {
    const target = await readArb<Record<string, any>>(arbFilePath(psyDir, lang), {});
    const presentKeys = Object.keys(target).filter(
      (k) => !k.startsWith('@') && k !== '@@locale',
    );
    const presentSet = new Set(presentKeys);

    const missing = canonical.realKeys.filter((k) => !presentSet.has(k));
    const dead = presentKeys.filter((k) => !canonicalSet.has(k));
    const langSnapshot = snapshot[lang] ?? {};
    const changed = opts.retranslateChanged
      ? canonical.realKeys.filter(
          (k) => presentSet.has(k) && k in langSnapshot && langSnapshot[k] !== canonical.values[k],
        )
      : [];

    result[lang] = { missing, changed, dead };
  }
  return result;
}

/**
 * Удаляет мёртвые ключи (вместе с их @-мета) из target app_<lang>.arb. Это
 * синхронизирует переводы с валидацией tool/l10n_merge.dart в cognitive_psy:
 * ключ в переводе, отсутствующий в ru-шаблоне, — жёсткая ошибка сборки там.
 * Возвращает список реально удалённых ключей.
 */
async function removeDeadKeys(
  psyDir: string,
  langCode: string,
  deadKeys: string[],
): Promise<string[]> {
  if (deadKeys.length === 0) return [];
  const targetPath = arbFilePath(psyDir, langCode);
  const target = await readArb<Record<string, any>>(targetPath, {});
  const removed: string[] = [];
  for (const key of deadKeys) {
    if (!(key in target)) continue;
    delete target[key];
    delete target[`@${key}`];
    removed.push(key);
  }
  if (removed.length > 0) {
    await writeJsonAtomic(targetPath, target);
  }
  return removed;
}

/** Первые max ключей через запятую; если больше — хвост «… (+N)». */
function formatKeyExamples(keys: string[], max = 5): string {
  const shown = keys.slice(0, max).join(', ');
  return keys.length > max ? `${shown} … (+${keys.length - max})` : shown;
}

/**
 * Печатает отчёт dry-run по каждому языку: недостающие ключи (переведутся и
 * допишутся), изменившиеся ru-строки (переведутся заново и перезапишутся,
 * если включён --retranslate-changed) и мёртвые ключи (удалятся из target).
 */
function printDryRunReport(
  analysis: Record<string, LangAnalysis>,
  langs: string[],
  retranslateChanged: boolean,
): void {
  console.log(`\n📋 --- ОТЧЁТ DRY-RUN (по языкам) ---`);
  let totalMissing = 0;
  let totalChanged = 0;
  let totalDead = 0;
  for (const lang of langs) {
    const a = analysis[lang];
    totalMissing += a.missing.length;
    totalChanged += a.changed.length;
    totalDead += a.dead.length;
    const langName = LANG_NAMES[lang] ?? lang;
    if (a.missing.length === 0 && a.changed.length === 0 && a.dead.length === 0) {
      console.log(`✅ ${lang} (${langName}): всё актуально — нет недостающих, изменившихся и мёртвых ключей.`);
      continue;
    }
    console.log(`📦 ${lang} (${langName}):`);
    if (a.missing.length > 0) {
      console.log(`   ✏️  отсутствуют (${a.missing.length}): ${formatKeyExamples(a.missing)}`);
    }
    if (a.changed.length > 0) {
      console.log(`   🔄 изменились в ru (${a.changed.length}): ${formatKeyExamples(a.changed)}`);
    }
    if (a.dead.length > 0) {
      console.log(`   🧹 мёртвые к удалению (${a.dead.length}): ${formatKeyExamples(a.dead)}`);
    }
  }
  console.log(
    `\nИТОГО по ${langs.length} ${langs.length === 1 ? 'языку' : 'языкам'}:` +
      ` отсутствуют ${totalMissing}, изменились ${totalChanged}, мёртвые ${totalDead}.`,
  );
  if (totalChanged === 0) {
    console.log(
      retranslateChanged
        ? `ℹ️  Изменившиеся не найдены: в снимке ru_snapshot.json ещё нет записей для этих ключей (переведены до появления детекта изменений) — они считаются актуальными.`
        : `ℹ️  Детект изменившихся отключён (--retranslate-changed=false) — устаревшие переводы не перезаписываются.`,
    );
  }
}

/**
 * Формирует sourceJson для перевода: объединение ключей к переводу по всем
 * языкам — недостающие ∪ изменившиеся (переводятся сразу для всех языков
 * батчами). Для каждого ключа — русское значение + @-мета как контекст.
 */
function buildSourceJson(
  keysPerLang: Record<string, string[]>,
  canonical: ArbCanonical,
): Record<string, any> {
  const union = new Set<string>();
  for (const lang in keysPerLang) {
    for (const k of keysPerLang[lang]) union.add(k);
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
 * Вписывает переводы в target app_<lang>.arb: добавляет недостающие ключи и
 * перезаписывает изменившиеся (onlyKeys = missing ∪ changed для языка),
 * переносит @<key> с placeholders из канона (по конвенции cognitive_psy),
 * сохраняет @@locale. Возвращает список вписанных ключей — по нему обновляется
 * снимок значений ru.
 *
 * @param onlyKeys  какие ключи вписать (недостающие + изменившиеся для языка),
 *                  отсортированные в порядке канона.
 */
async function writeArbTarget(
  psyDir: string,
  langCode: string,
  translations: Record<string, string>,
  canonical: ArbCanonical,
  onlyKeys: string[],
): Promise<string[]> {
  const targetPath = arbFilePath(psyDir, langCode);
  const target = await readArb<Record<string, any>>(targetPath, {});

  // Если target пуст (нет даже @@locale) — создаём с правильным locale.
  if (!('@@locale' in target)) {
    target['@@locale'] = langCode;
  }

  const wantSet = new Set(onlyKeys);
  const written: string[] = [];
  // Идём по каноническому порядку ключей: дописываем недостающие и
  // перезаписываем изменившиеся (для них в wantSet лежит свежий перевод).
  for (const key of canonical.realKeys) {
    if (!wantSet.has(key)) continue;
    if (key in translations) {
      target[key] = translations[key];
      written.push(key);
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
    dryRun,
    retranslateChanged,
  } = parseKeysArgs();

  const psyDir = resolvePsyDir(cli.flags['psy-dir']);
  console.log(`🌍 Перевод интерфейса → cognitive_psy (батчами по ${batchSize} языков).`);
  console.log(`📂 cognitive_psy: ${psyDir}`);
  if (dryRun) {
    console.log(`🔍 DRY-RUN: только анализ — провайдеры не вызываются, файлы не меняются.`);
  }
  if (!retranslateChanged) {
    console.log(`⏭  --retranslate-changed=false: изменившиеся ru-строки НЕ перезаписываются.`);
  }

  // 1. Загрузить канон ключей из app_ru.arb.
  const canonical = await loadArbCanonical(psyDir);
  if (canonical.realKeys.length === 0) {
    console.error(`❌ Не удалось прочитать ключи из ${arbFilePath(psyDir, 'ru')}.`);
    return;
  }

  // 2. Определить набор языков с проверкой поддержки.
  const allLangs = langsArg ? [...langsArg] : [...ALL_TARGET_LANGS];
  const unknownLangs = allLangs.filter((l) => !(l in LANG_NAMES));
  if (unknownLangs.length) {
    console.error(
      `❌ Неизвестные коды языков: ${unknownLangs.join(', ')}. Поддерживаются: ${Object.keys(LANG_NAMES).join(', ')}`,
    );
    return;
  }

  // 3. Загрузить снимок значений ru (детект изменений русских строк).
  const snapshot = await loadRuSnapshot();

  // 4. Проанализировать target каждого языка: missing / changed / dead.
  const analysis = await analyzePerLang(psyDir, allLangs, canonical, snapshot, {
    retranslateChanged,
  });

  // 5. DRY-RUN: полный отчёт по анализу и выход — без провайдеров и записи.
  if (dryRun) {
    printDryRunReport(analysis, allLangs, retranslateChanged);
    return;
  }

  // 6. Синхронизировать app_interface.json с каноном (legacy add-only зеркало
  //    для translate-ui — не разрастаем, только добавление недостающих ключей).
  await syncAppInterface(canonical);

  // 7. Удалить мёртвые ключи из target-файлов: валидация tool/l10n_merge.dart
  //    в cognitive_psy считает ключ вне ru-шаблона жёсткой ошибкой сборки.
  //    Делается до перевода — cleanup срабатывает даже если перевод не нужен.
  for (const lang of allLangs) {
    const removed = await removeDeadKeys(psyDir, lang, analysis[lang].dead);
    if (removed.length > 0) {
      console.log(
        `🧹 ${lang}: удалено ${removed.length} мёртвых ключей из ${arbFileName(lang)}: ${formatKeyExamples(removed)}`,
      );
    }
  }

  // Мёртвые ключи убираем и из снимка ru, чтобы он не разрастался.
  const canonicalKeySet = new Set(canonical.realKeys);
  let snapshotDirty = false;
  for (const lang of allLangs) {
    const langSnapshot = snapshot[lang];
    if (!langSnapshot) continue;
    for (const key of Object.keys(langSnapshot)) {
      if (!canonicalKeySet.has(key)) {
        delete langSnapshot[key];
        snapshotDirty = true;
      }
    }
  }

  // 8. Набор на перевод: missing ∪ changed по каждому языку.
  const missingPerLang: Record<string, string[]> = {};
  const toTranslatePerLang: Record<string, string[]> = {};
  for (const lang of allLangs) {
    const a = analysis[lang];
    missingPerLang[lang] = a.missing;
    const union = new Set([...a.missing, ...a.changed]);
    toTranslatePerLang[lang] = canonical.realKeys.filter((k) => union.has(k));
  }
  const langsToTranslate = allLangs.filter((l) => toTranslatePerLang[l].length > 0);
  const langsMissing = allLangs.filter((l) => missingPerLang[l].length > 0);
  const langsChanged = allLangs.filter((l) => analysis[l].changed.length > 0);
  const totalMissing = langsMissing.reduce((s, l) => s + missingPerLang[l].length, 0);
  const totalChanged = langsChanged.reduce((s, l) => s + analysis[l].changed.length, 0);
  if (langsToTranslate.length === 0) {
    console.log(`✅ Все ключи уже переведены и актуальны для всех ${allLangs.length} языков. Нечего делать.`);
    if (snapshotDirty) await saveRuSnapshot(snapshot);
    return;
  }
  console.log(
    `📦 Недостающих: ${totalMissing} по ${langsMissing.length}/${allLangs.length} языкам;` +
      ` изменившихся (ru): ${totalChanged} по ${langsChanged.length}/${allLangs.length}.`,
  );
  for (const l of langsToTranslate) {
    const parts: string[] = [];
    if (missingPerLang[l].length > 0) parts.push(`${missingPerLang[l].length} недостающих`);
    if (analysis[l].changed.length > 0) {
      parts.push(`${analysis[l].changed.length} изменившихся: ${formatKeyExamples(analysis[l].changed)}`);
    }
    console.log(`   ${l}: ${parts.join(', ')}`);
  }

  // 9. Сформировать источник перевода (объединение ключей к переводу).
  const sourceJson = buildSourceJson(toTranslatePerLang, canonical);
  const sourceKeyCount = Object.keys(sourceJson).filter((k) => !k.startsWith('@')).length;
  console.log(`🗂  Уникальных ключей к переводу: ${sourceKeyCount}`);
  if (excludeStages.length > 0) {
    console.log(`⏭  Пропускаемые этапы: ${excludeStages.join(', ')}`);
  } else {
    console.log(`🎯 Прогон через все 3 этапа (перевод → редактура → тех-аудит).`);
  }

  // 10. Перевести батчами (кэш/resume/ретраи — без изменений).
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

    // 11. Склейка успешных результатов.
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

    // 12. Вписать переводы в target ARB (недостающие + изменившиеся ключи языка).
    console.log(`\n💾 Запись переводов в cognitive_psy ARB-файлы...`);
    let totalWritten = 0;
    for (const lang of succeededLangs) {
      const translations = merged[lang];
      // Вписываем недостающие и изменившиеся ключи: свежий перевод и допишется,
      // и перезапишет устаревший.
      const onlyKeys = toTranslatePerLang[lang] ?? [];
      const writtenKeys = await writeArbTarget(psyDir, lang, translations, canonical, onlyKeys);
      if (writtenKeys.length > 0) {
        console.log(`   ${lang}: вписано ${writtenKeys.length} ключей в ${arbFileName(lang)}`);
      }
      totalWritten += writtenKeys.length;

      // Снимок значений ru продвигаем ТОЛЬКО после успешной записи в target:
      // иначе упавший язык навсегда потерял бы сигнал об изменении строки.
      if (writtenKeys.length > 0) {
        snapshot[lang] = snapshot[lang] ?? {};
        for (const key of writtenKeys) {
          snapshot[lang][key] = canonical.values[key];
        }
        await saveRuSnapshot(snapshot);
        snapshotDirty = true;
      }
    }
    console.log(`✅ Всего вписано ${totalWritten} переводов в ARB-файлы cognitive_psy.`);
    if (snapshotDirty && totalWritten === 0) {
      // Снимок менялся только вычисткой мёртвых ключей — фиксируем и это.
      await saveRuSnapshot(snapshot);
    }
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
  } finally {
    await provider.close();
    console.log('\n👋 Сессия завершена.');
  }
}

run().catch(console.error);
