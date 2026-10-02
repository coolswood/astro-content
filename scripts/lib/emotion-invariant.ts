/**
 * Инвариант домена эмоций (UI cognitive_psy). 68 ключей из
 * lib/components/screens/constants.dart (emotionsNegative/emotionsPositive) —
 * закрытый набор, который рендерится на ОДНОМ экране рядом. Для него
 * поштучная коллегия недостаточна: судья видит ключ изолированно и сам
 * создаёт коллизии (инцидент es-2026-10: delight→Alegría при joy=Alegría,
 * excitement→Agitación — негативное слово в позитивном списке).
 *
 * Здесь два уровня:
 *  1. Детектор (механика, без модели): значения всех ключей набора обязаны
 *     быть попарно различными (сравнение без регистра/лишних пробелов —
 *     «Terror» и «terror» на одном экране неразличимы).
 *  2. Ремонт (LLM): один запрос со ВСЕМ набором (ru-оригинал, текущий
 *     перевод, полярность) + список коллизий; ответ — path-map, правки
 *     проходят пер-ключевую валидацию и проверку уникальности после слияния.
 *     Полярность (позитивный список — позитивные слова целевого языка)
 *     механически не проверяется — её судит та же модель в этом же запросе.
 *
 * Отдельно от разведки пар контента (duplicate-repair): там чинятся крючки
 * произвольных листьев, здесь — фиксированный домен, известный заранее.
 */
import fs from 'fs/promises';
import path from 'path';
import { writeJsonAtomic } from './atomic-fs.js';
import { parseWithRepair } from './json-repair.js';
import { MAIN_PATHS_ADDENDUM, stageEditRejections, type StageClient } from './pipeline.js';
import { loadPrompt } from './prompt-loader.js';

/** Путь до каталога эмоций внутри репозитория cognitive_psy. */
export const EMOTIONS_DART_RELPATH = 'lib/components/screens/constants.dart';

export interface EmotionCatalog {
  negative: string[];
  positive: string[];
}

/** Максимальная длина значения эмоции: лейбл чипа, не предложение. */
const MAX_EMOTION_LEN = 48;

/** Раундов ремонта до сдачи (каждый раунд = запрос + пер-ключевое слияние). */
export const DEFAULT_REPAIR_ROUNDS = 3;

export function parseEmotionConstants(dartSource: string): EmotionCatalog {
  const grab = (name: string): string[] => {
    const re = new RegExp(`List<String>\\s+${name}\\s*=\\s*<String>\\[([\\s\\S]*?)\\]`, 'm');
    const body = re.exec(dartSource)?.[1] ?? '';
    return [...body.matchAll(/'([^']+)'/g)].map((m) => m[1]!);
  };
  const negative = grab('emotionsNegative');
  const positive = grab('emotionsPositive');
  return { negative, positive };
}

/** Читает каталог из репозитория приложения; падает с понятной ошибкой, если файл ушёл. */
export async function emotionCatalogFromPsyDir(psyDir: string): Promise<EmotionCatalog> {
  const p = path.join(psyDir, EMOTIONS_DART_RELPATH);
  let src: string;
  try {
    src = await fs.readFile(p, 'utf-8');
  } catch {
    throw new Error(`Не найден каталог эмоций ${p} — проверьте --psy-dir.`);
  }
  const catalog = parseEmotionConstants(src);
  if (catalog.negative.length === 0 || catalog.positive.length === 0) {
    throw new Error(
      `Каталог эмоций пуст/не распарсился (${p}): negative=${catalog.negative.length}, positive=${catalog.positive.length}.`,
    );
  }
  return catalog;
}

/** Нормализация для сравнения: регистр и пробельные вариации неразличимы на экране. */
export function normalizeEmotionValue(s: string): string {
  return s.trim().replace(/\s+/g, ' ').toLowerCase();
}

export interface EmotionCollisionGroup {
  /** Нормализованное значение, под которым столкнулись ключи. */
  value: string;
  /** Пример фактического написания из arb. */
  example: string;
  /** Ключи в порядке каталога (negative, затем positive). */
  keys: string[];
}

/** Канонический порядок ключей каталога: сначала негативные, потом позитивные. */
export function emotionKeys(catalog: EmotionCatalog): string[] {
  return [...catalog.negative, ...catalog.positive];
}

export function polarityOf(catalog: EmotionCatalog, key: string): 'negative' | 'positive' | null {
  if (catalog.negative.includes(key)) return 'negative';
  if (catalog.positive.includes(key)) return 'positive';
  return null;
}

/**
 * Механический детект: группы ключей с совпавшими (нормализованно)
 * непустыми значениями. Отсутствующие/пустые ключи — не коллизия
 * (недостающее чинит обычный перевод, а не ремонт).
 */
export function findEmotionCollisions(
  catalog: EmotionCatalog,
  values: Record<string, unknown>,
): EmotionCollisionGroup[] {
  const byNorm = new Map<string, string[]>();
  for (const key of emotionKeys(catalog)) {
    const raw = values[key];
    if (typeof raw !== 'string' || !raw.trim()) continue;
    const norm = normalizeEmotionValue(raw);
    const list = byNorm.get(norm) ?? [];
    list.push(key);
    byNorm.set(norm, list);
  }
  const groups: EmotionCollisionGroup[] = [];
  for (const [norm, keys] of byNorm) {
    if (keys.length < 2) continue;
    groups.push({ value: norm, example: String(values[keys[0]!]), keys });
  }
  return groups;
}

/** Аддендум ремонта поверх ui main + MAIN_PATHS_ADDENDUM (path-map формат). */
const EMOTION_REPAIR_ADDENDUM = `

ЗАДАЧА (инвариант экрана эмоций): поле "emotions" — ПОЛНЫЙ каталог эмоций приложения
(68 ключей, выводятся на одном экране рядом): key, polarity (negative/positive),
ru (русский оригинал), current (текущий перевод). Поле "collisions" — группы ключей,
чьи текущие переводы СОВПАЛИ. Верни в "paths" НОВЫЕ значения:
- для КАЖДОГО ключа каждой группы коллизий — обязательно, различающиеся между собой
  и не совпадающие ни с одним current из полного каталога (сравнение без учёта регистра);
- дополнительно — ключи, где current нарушает полярность: слово из негативного
  спектра в positive-списке (пример: исп. Agitación для Волнения) или наоборот;
  неуверенные случаи не трогай;
- для остальных ключей "paths" не включай — их перевод уже принят.
Каждое значение — одно слово или короткое словосочетание, естественное для носителя,
в одном регистре и стиле с соседями (current каталога); различие между близкими
 ru-оригиналами (Радость/Восторг, Печаль/Сожаление) сохрани оттенком, а не длиной.`;

export interface EmotionRepairPayload {
  sourceLocale: string;
  targetLocale: string;
  emotions: Array<{ key: string; polarity: 'negative' | 'positive'; ru: string; current: string }>;
  collisions: Array<{ value: string; keys: string[] }>;
}

export function buildEmotionRepairPayload(
  lang: string,
  catalog: EmotionCatalog,
  ruValues: Record<string, unknown>,
  currentValues: Record<string, unknown>,
): EmotionRepairPayload {
  const emotions = emotionKeys(catalog)
    .filter((k) => typeof currentValues[k] === 'string' && String(currentValues[k]).trim())
    .map((k) => ({
      key: k,
      polarity: polarityOf(catalog, k)!,
      ru: String(ruValues[k] ?? ''),
      current: String(currentValues[k]),
    }));
  return {
    sourceLocale: 'ru',
    targetLocale: lang,
    emotions,
    collisions: findEmotionCollisions(catalog, currentValues).map((g) => ({
      value: g.example,
      keys: g.keys,
    })),
  };
}

export interface EmotionEdit {
  key: string;
  from: string;
  to: string;
}

export interface EmotionRejectedEdit {
  key: string;
  value: string;
  reasons: string[];
}

export interface EmotionRepairRound {
  round: number;
  applied: EmotionEdit[];
  rejected: EmotionRejectedEdit[];
}

export interface EmotionInvariantReport {
  lang: string;
  rounds: EmotionRepairRound[];
  /** Коллизии, оставшиеся после исчерпания раундов (пусто = инвариант держится). */
  remaining: EmotionCollisionGroup[];
}

/** Парсит path-map ответ модели в «ключ → значение» (голый ключ или /ключ). */
export function parseEmotionPathMap(parsed: unknown): Record<string, string> | null {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
  const paths = (parsed as any).paths;
  if (!paths || typeof paths !== 'object' || Array.isArray(paths)) return null;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(paths as Record<string, unknown>)) {
    if (typeof v === 'string') out[k.replace(/^\//, '')] = v;
  }
  return out;
}

/**
 * Пер-ключевое слияние ответа ремонта в рабочий набор. Правка отбраковывается
 * по одной (не валит батч): чужой ключ, пустота/многострочность, guard стадий,
 * коллизия с НЕтронутым ключом после слияния. Порядок применения — каталог,
 * чтобы конфликт двух кандидатур решался детерминированно.
 */
export function mergeEmotionRepairs(
  catalog: EmotionCatalog,
  currentValues: Record<string, string>,
  candidates: Record<string, string>,
): { applied: EmotionEdit[]; rejected: EmotionRejectedEdit[] } {
  const applied: EmotionEdit[] = [];
  const rejected: EmotionRejectedEdit[] = [];
  const working: Record<string, string> = {};
  for (const key of emotionKeys(catalog)) {
    const v = currentValues[key];
    if (typeof v === 'string' && v.trim()) working[key] = v;
  }
  for (const key of emotionKeys(catalog)) {
    const raw = candidates[key];
    if (raw === undefined) continue;
    const value = String(raw).trim();
    const reasons: string[] = [];
    if (!value) reasons.push('пустое значение');
    else if (value.includes('\n')) reasons.push('многострочное значение');
    else if (value.length > MAX_EMOTION_LEN) reasons.push(`слишком длинно (${value.length} > ${MAX_EMOTION_LEN})`);
    const old = working[key];
    if (reasons.length === 0 && old !== undefined && old !== value) {
      reasons.push(...stageEditRejections(old, value));
    }
    if (reasons.length === 0 && old !== undefined && old === value) {
      continue; // модель вернула текущее значение — не правка и не ошибка
    }
    if (reasons.length === 0) {
      // Инвариант после слияния: новое значение не должно совпасть (без
      // регистра) со значением любого ДРУГОГО ключа набора.
      const norm = normalizeEmotionValue(value);
      const clash = emotionKeys(catalog).find(
        (k) => k !== key && working[k] !== undefined && normalizeEmotionValue(working[k]!) === norm,
      );
      if (clash) reasons.push(`столкнется с «${clash}» (${working[clash]})`);
    }
    if (reasons.length > 0) {
      rejected.push({ key, value, reasons });
      continue;
    }
    working[key] = value;
    applied.push({ key, from: old ?? '', to: value });
  }
  return { applied, rejected };
}

export interface EnforceEmotionOptions {
  client: StageClient;
  lang: string;
  catalog: EmotionCatalog;
  /** Значения ключей app_ru.arb (канон). */
  ruValues: Record<string, unknown>;
  /** Целевой arb целиком (мутируется применёнными правками). */
  target: Record<string, any>;
  /** Абсолютный путь целевого arb (для записи). */
  targetPath: string;
  maxRounds?: number;
  /** Только детект и отчёт: модель не вызывается, файл не меняется. */
  dryRun?: boolean;
}

/**
 * Цикл «детект → ремонт → слияние → запись»: выходит при чистом инварианте
 * или исчерпании раундов. Каждая правка логируется; итог — отчёт.
 */
export async function enforceEmotionInvariant(opts: EnforceEmotionOptions): Promise<EmotionInvariantReport> {
  const report: EmotionInvariantReport = { lang: opts.lang, rounds: [], remaining: [] };
  const maxRounds = opts.maxRounds ?? DEFAULT_REPAIR_ROUNDS;

  const currentValues = (): Record<string, string> => {
    const out: Record<string, string> = {};
    for (const key of emotionKeys(opts.catalog)) {
      const v = opts.target[key];
      if (typeof v === 'string' && v.trim()) out[key] = v;
    }
    return out;
  };

  let collisions = findEmotionCollisions(opts.catalog, currentValues());
  if (collisions.length === 0) return report;
  console.log(
    `   ⚠️ [emotions] ${opts.lang}: коллизии (${collisions.map((g) => `${g.example}×${g.keys.length}`).join(', ')})`,
  );
  if (opts.dryRun) {
    report.remaining = collisions;
    return report;
  }

  const mainPrompt = await loadPrompt('ui', 'main', opts.lang);
  const system = mainPrompt + MAIN_PATHS_ADDENDUM + EMOTION_REPAIR_ADDENDUM;

  for (let round = 1; round <= maxRounds && collisions.length > 0; round++) {
    const payload = buildEmotionRepairPayload(opts.lang, opts.catalog, opts.ruValues, currentValues());
    const raw = await opts.client.complete({
      system,
      user: JSON.stringify(payload),
      temperature: 0.3,
      maxTokens: 8_192,
      jsonMode: true,
    });
    const candidates = parseEmotionPathMap(await parseWithRepair<any>(raw));
    if (!candidates) {
      console.warn(`   🩹 [emotions] ${opts.lang}: раунд ${round} — ответ не распарсился`);
      report.rounds.push({ round, applied: [], rejected: [] });
      continue;
    }
    const { applied, rejected } = mergeEmotionRepairs(opts.catalog, currentValues(), candidates);
    for (const e of applied) opts.target[e.key] = e.to;
    if (applied.length > 0) await writeJsonAtomic(opts.targetPath, opts.target);
    for (const e of applied) console.log(`   🩹 [emotions] ${opts.lang}: ${e.key}: ${e.from} → ${e.to}`);
    for (const e of rejected) console.warn(`   🩹 [emotions] ${opts.lang}: правка отброшена: ${e.key} (${e.reasons.join('; ')})`);
    report.rounds.push({ round, applied, rejected });
    collisions = findEmotionCollisions(opts.catalog, currentValues());
  }

  report.remaining = collisions;
  if (collisions.length > 0) {
    console.warn(
      `   ⚠️ [emotions] ${opts.lang}: инвариант НЕ восстановлен за ${maxRounds} раундов — осталось ${collisions.length} групп`,
    );
  } else {
    console.log(`   ✅ [emotions] ${opts.lang}: инвариант восстановлен`);
  }
  return report;
}
