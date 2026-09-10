/**
 * Чистая логика QA-сравнения переводов (слепой парный судья).
 *
 * Здесь нет обращений к модели — только детерминированные функции, покрытые
 * тестами: seeding/сэмплирование, парсинг вердикта судьи, нормализация A/B
 * к сторонам old/new, устойчивость «2:0» (защита от позиционного смещения
 * судьи) и агрегация статистики. Модель дёргает scripts/qa/eval.ts.
 */
import { parseWithRepair } from './json-repair.js';

// ─────────────────────────────────────────────────────────────────────────────
// Типы
// ─────────────────────────────────────────────────────────────────────────────

/** Сторона сравнения: базлайн и кандидат. */
export type Side = 'old' | 'new';
/** Порядок предъявления пары судье (против позиционного смещения). */
export type PassOrder = 'old_first' | 'new_first';
export type WinnerFor = Side | 'tie';
export type IssueType = 'mistranslation' | 'omission' | 'addition' | 'terminology' | 'style' | 'other';
export type IssueSeverity = 'critical' | 'major' | 'minor';

const ISSUE_TYPES: readonly IssueType[] = ['mistranslation', 'omission', 'addition', 'terminology', 'style', 'other'];
const ISSUE_SEVERITIES: readonly IssueSeverity[] = ['critical', 'major', 'minor'];

export interface JudgeIssueAB {
  side: 'A' | 'B';
  type: IssueType;
  severity: IssueSeverity;
  note: string;
}

/** Вердикт судьи в пространстве меток A/B (как в промпте). */
export interface JudgeVerdictAB {
  winner: 'A' | 'B' | 'tie';
  confidence: string;
  scores: { A: number | null; B: number | null };
  reason: string;
  issues: JudgeIssueAB[];
}

export interface JudgeIssue extends Omit<JudgeIssueAB, 'side'> {
  side: Side;
}

/** Вердикт, нормализованный к сторонам old/new для конкретного порядка. */
export interface SidedVerdict {
  winnerFor: WinnerFor;
  confidence: string;
  scores: { old: number | null; new: number | null };
  reason: string;
  issues: JudgeIssue[];
}

/** Один проход судьи над парой (модель может упасть — ok=false). */
export interface PassResult extends SidedVerdict {
  order: PassOrder;
  ok: boolean;
  error?: string;
}

/** Итог сравнения одной пары (два прохода в разных порядках). */
export interface PairOutcome {
  file: string;
  lang: string;
  key: string;
  ru: string;
  oldText: string;
  newText: string;
  status: 'judged' | 'failed';
  /** Оба прохода сошлись (в т.ч. оба tie) — по правилу методики учитываем только стабильные. */
  stable: boolean;
  /** Победитель по стабильным 2:0; null — вердикт неустойчив. */
  stableWinner: WinnerFor | null;
  passes: PassResult[];
}

export interface LangStats {
  /** Пар, дошедших до судьи. */
  compared: number;
  /** Пары, где судью не удалось получить в обоих проходах. */
  failed: number;
  newWins: number;
  oldWins: number;
  ties: number;
  unstable: number;
  /** Критические замечания NEW/OLD (из первого прохода). */
  criticalNew: number;
  criticalOld: number;
  /** Тип/severity → счётчик по сторонам (из первого прохода). */
  issuesNew: Record<string, number>;
  issuesOld: Record<string, number>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Единицы сравнения: блоки-абзацы
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Единица сравнения. Индексы массивов между локалями могут не совпадать
 * (число элементов допустимо разное), поэтому судье отдаём не листья,
 * а блоки: отдельная строка (заголовок и т.п.) или массив строк ЦЕЛИКОМ.
 * Судья сравнивает абзацы — сдвиг/расхождение длины внутри блока видит
 * как omission/addition, а не как «перевод не того предложения».
 */
export interface ComparisonUnit {
  /** Путь блока: путь листа-строки или путь массива строк. */
  path: string;
  /** Строки блока в порядке следования (из ru). */
  parts: string[];
}

/**
 * Строит единицы сравнения из ru-дерева: лист-строка → блок из одной строки,
 * массив строк → один блок; прочие массивы/объекты обходятся вглубь.
 * Числа/булевы/null не сравниваются.
 */
export function buildComparisonUnits(node: any, prefix = ''): ComparisonUnit[] {
  if (typeof node === 'string') {
    return prefix ? [{ path: prefix, parts: [node] }] : [];
  }
  if (Array.isArray(node)) {
    if (node.every((x) => typeof x === 'string')) {
      const parts = (node as string[]).filter((s) => s.trim() !== '');
      return parts.length > 0 ? [{ path: prefix, parts }] : [];
    }
    return node.flatMap((item, i) => buildComparisonUnits(item, `${prefix}/${i}`));
  }
  if (node && typeof node === 'object') {
    return Object.keys(node).flatMap((k) => buildComparisonUnits(node[k], `${prefix}/${k}`));
  }
  return [];
}

/** Узел target-дерева по пути блока; undefined, если его там нет. */
export function nodeAtPath(root: any, nodePath: string): any {
  let cur = root;
  for (const part of nodePath.split('/').filter(Boolean)) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = Array.isArray(cur) ? cur[Number(part)] : cur[part];
  }
  return cur;
}

/** Текст блока из target-дерева: все строки под узлом в порядке документа. */
export function unitText(root: any, nodePath: string): string {
  const node = nodeAtPath(root, nodePath);
  const out: string[] = [];
  const walk = (x: any): void => {
    if (typeof x === 'string') out.push(x);
    else if (Array.isArray(x)) x.forEach(walk);
    else if (x && typeof x === 'object') for (const k of Object.keys(x)) walk(x[k]);
  };
  walk(node);
  return out.join('\n\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// Детерминированный рандом ( seeding / сэмплирование / порядок A/B )
// ─────────────────────────────────────────────────────────────────────────────

/** FNV-1a: строка → uint32 сид. */
export function hashSeed(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 — компактный детерминированный PRNG. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Тасует копию массива (Fisher–Yates) под данным rng. */
export function shuffleSeeded<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Детерминированный порядок предъявления для конкретной пары и прогона. */
export function passOrderFor(scope: string, run: 1 | 2): PassOrder {
  return mulberry32(hashSeed(scope))() < 0.5
    ? run === 1
      ? 'old_first'
      : 'new_first'
    : run === 1
      ? 'new_first'
      : 'old_first';
}

// ─────────────────────────────────────────────────────────────────────────────
// Парсинг и нормализация вердикта судьи
// ─────────────────────────────────────────────────────────────────────────────

function clampScore(raw: unknown): number | null {
  const n = typeof raw === 'number' ? raw : Number(raw);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function coerceType(raw: unknown): IssueType {
  return ISSUE_TYPES.includes(raw as IssueType) ? (raw as IssueType) : 'other';
}

function coerceSeverity(raw: unknown): IssueSeverity {
  return ISSUE_SEVERITIES.includes(raw as IssueSeverity) ? (raw as IssueSeverity) : 'minor';
}

/**
 * Парсит ответ судьи (строгий JSON, но с арсеналом восстановления).
 * Бросает, если winner не A/B/tie — такой ответ нельзя интерпретировать.
 */
export async function parseJudgeVerdict(raw: string): Promise<JudgeVerdictAB> {
  const parsed = await parseWithRepair<any>(raw);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('вердикт судьи — не JSON-объект');
  }
  const winnerRaw = String(parsed.winner ?? '').trim().toUpperCase();
  if (winnerRaw !== 'A' && winnerRaw !== 'B' && winnerRaw !== 'TIE') {
    throw new Error(`некорректный winner: ${String(parsed.winner).slice(0, 40)}`);
  }
  const scoresRaw = parsed.scores && typeof parsed.scores === 'object' ? parsed.scores : {};
  const issuesRaw = Array.isArray(parsed.issues) ? parsed.issues : [];
  const issues: JudgeIssueAB[] = [];
  for (const item of issuesRaw) {
    if (!item || typeof item !== 'object') continue;
    const side = String(item.side ?? '').trim().toUpperCase();
    if (side !== 'A' && side !== 'B') continue; // замечание без стороны бесполезно
    issues.push({
      side,
      type: coerceType(item.type),
      severity: coerceSeverity(item.severity),
      note: String(item.note ?? '').trim(),
    });
  }
  return {
    winner: winnerRaw === 'TIE' ? 'tie' : (winnerRaw as 'A' | 'B'),
    confidence: String(parsed.confidence ?? '').trim().toLowerCase(),
    scores: { A: clampScore(scoresRaw.A), B: clampScore(scoresRaw.B) },
    reason: String(parsed.reason ?? '').trim(),
    issues,
  };
}

/** Переводит вердикт из пространства A/B в стороны old/new для данного порядка. */
export function verdictToSides(v: JudgeVerdictAB, order: PassOrder): SidedVerdict {
  const aIsOld = order === 'old_first';
  const map = (s: 'A' | 'B'): Side => (s === 'A' ? (aIsOld ? 'old' : 'new') : aIsOld ? 'new' : 'old');
  return {
    winnerFor: v.winner === 'tie' ? 'tie' : map(v.winner),
    confidence: v.confidence,
    scores: { old: aIsOld ? v.scores.A : v.scores.B, new: aIsOld ? v.scores.B : v.scores.A },
    reason: v.reason,
    issues: v.issues.map((i) => ({ ...i, side: map(i.side) })),
  };
}

/** Ключ «тип/severity» для статистики замечаний. */
export function issueStatKey(issue: JudgeIssue): string {
  return `${issue.type}/${issue.severity}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Агрегация
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Считает статистику по парам одного (файл, язык).
 * Победы/поражения — только по стабильным вердиктам 2:0; замечания —
 * из первого прохода (второй нужен только для проверки устойчивости,
 * иначе те же проблемы задвоятся).
 */
export function aggregateLang(outcomes: readonly PairOutcome[]): LangStats {
  const stats: LangStats = {
    compared: 0,
    failed: 0,
    newWins: 0,
    oldWins: 0,
    ties: 0,
    unstable: 0,
    criticalNew: 0,
    criticalOld: 0,
    issuesNew: {},
    issuesOld: {},
  };
  for (const o of outcomes) {
    if (o.status === 'failed') {
      stats.failed++;
      continue;
    }
    stats.compared++;
    if (o.stable) {
      if (o.stableWinner === 'new') stats.newWins++;
      else if (o.stableWinner === 'old') stats.oldWins++;
      else stats.ties++;
    } else {
      stats.unstable++;
    }
    const first = o.passes.find((p) => p.ok);
    if (!first) continue;
    for (const issue of first.issues) {
      const bucket = issue.side === 'new' ? stats.issuesNew : stats.issuesOld;
      const key = issueStatKey(issue);
      bucket[key] = (bucket[key] ?? 0) + 1;
      if (issue.severity === 'critical') {
        if (issue.side === 'new') stats.criticalNew++;
        else stats.criticalOld++;
      }
    }
  }
  return stats;
}

/** Стабильный win-rate NEW: доля побед среди решённых (new+old) пар; null, если решённых нет. */
export function stableWinRate(s: LangStats): number | null {
  const decided = s.newWins + s.oldWins;
  return decided > 0 ? s.newWins / decided : null;
}

/** Складывает статистики (по языкам/файлам) для итоговой таблицы. */
export function sumStats(parts: readonly LangStats[]): LangStats {
  const total: LangStats = {
    compared: 0,
    failed: 0,
    newWins: 0,
    oldWins: 0,
    ties: 0,
    unstable: 0,
    criticalNew: 0,
    criticalOld: 0,
    issuesNew: {},
    issuesOld: {},
  };
  for (const p of parts) {
    total.compared += p.compared;
    total.failed += p.failed;
    total.newWins += p.newWins;
    total.oldWins += p.oldWins;
    total.ties += p.ties;
    total.unstable += p.unstable;
    total.criticalNew += p.criticalNew;
    total.criticalOld += p.criticalOld;
    for (const [k, v] of Object.entries(p.issuesNew)) total.issuesNew[k] = (total.issuesNew[k] ?? 0) + v;
    for (const [k, v] of Object.entries(p.issuesOld)) total.issuesOld[k] = (total.issuesOld[k] ?? 0) + v;
  }
  return total;
}
