/**
 * Точечная разведка пар (аналог recovery для потерянных листьев): дубли-«крючки»
 * редко чинятся полным ретраем файла — модель детерминированно унифицирует
 * близкие оригиналы (шкальные легенды «Крайне выраженные…/Выраженные…»,
 * парафразы-близнецы). Маленький запрос с обоими оригиналами рядом и явным
 * требованием различия правит только затронутые листья; правки проходят через
 * тот же пер-листовой guard, что и стадии. Группы даёт findDuplicateGroups —
 * единный детект с правилом №7 валидатора.
 */
import { applyLeaves, flattenLeaves, type Leaves } from './tree.js';
import { MAIN_PATHS_ADDENDUM, stageEditRejections, type StageClient } from './pipeline.js';
import { parseWithRepair } from './json-repair.js';
import type { DuplicateGroup } from './validation.js';

/** Групп дублей, при которых выгодна точечная разведка (больше — обычный ретрай). */
export const MAX_REPAIR_GROUPS = 8;

/** Аддендум Repair-запроса поверх формата path-map. */
const DIFFERENTIATION_ADDENDUM = `

ЗАДАЧА (устранение дублей): в поле "paths" — пути, чьи переводы СОВПАЛИ, хотя русские оригиналы РАЗЛИЧАЮТСЯ.
Поле "context" — текущий (одинаковый) перевод каждого пути. Переведи каждый путь ЗАНОВО так, чтобы:
- смысловое различие оригиналов (усилители, градации интенсивности, оттенки формулировок) СОХРАНИЛОСЬ в переводе:
  два разных русских текста не могут получить одинаковый перевод;
- стиль, терминология и длина остались в одном ряду с текущим переводом;
- в ответе не осталось ни одной пары путей с одинаковым значением.`;

/** Плоская карта «путь → текущий перевод» для запроса; null, если собирать нечего. */
export function buildRepairPayload(
  ruLeaves: Leaves,
  result: any,
  groups: DuplicateGroup[],
): { paths: Record<string, string>; context: Record<string, string> } | null {
  const flat = flattenLeaves(result);
  const paths: Record<string, string> = {};
  const context: Record<string, string> = {};
  for (const g of groups) {
    for (const normPath of g.paths) {
      const p = `/${normPath.replace(/^\//, '')}`;
      const ru = ruLeaves[p];
      const cur = flat[p];
      if (typeof ru !== 'string' || typeof cur !== 'string' || !cur.trim()) continue;
      paths[p] = ru;
      context[p] = cur;
    }
  }
  return Object.keys(paths).length >= 2 ? { paths, context } : null;
}

/**
 * Запрос разведки + пер-листовое применение ответа. Мутирует result.
 * Возвращает число применённых правок.
 */
export async function repairDuplicateGroups(
  client: StageClient,
  mainPrompt: string,
  lang: string,
  sourceLocale: string,
  ruLeaves: Leaves,
  result: any,
  groups: DuplicateGroup[],
): Promise<number> {
  const payload = buildRepairPayload(ruLeaves, result, groups);
  if (!payload) return 0;

  const raw = await client.complete({
    system: mainPrompt + MAIN_PATHS_ADDENDUM + DIFFERENTIATION_ADDENDUM,
    user: JSON.stringify({ sourceLocale, targetLocale: lang, ...payload }),
    temperature: 0.3,
    maxTokens: 8_192,
    jsonMode: true,
  });
  const parsed = await parseWithRepair<any>(raw);
  const map =
    parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed.paths && typeof parsed.paths === 'object'
        ? parsed.paths
        : null
      : null;
  if (!map) {
    console.warn('   🩹 ответ разведки не распарсился — правок 0');
    return 0;
  }

  const flat = flattenLeaves(result);
  let fixed = 0;
  for (const [p, v] of Object.entries(map)) {
    if (typeof v !== 'string' || !v.trim()) continue;
    const draft = flat[p.startsWith('/') ? p : `/${p}`];
    if (typeof draft !== 'string' || draft === v) continue;
    const reasons = stageEditRejections(draft, v);
    if (reasons && reasons.length > 0) {
      console.warn(`   🩹 правка отброшена: ${p} (${reasons.join('; ')})`);
      continue;
    }
    applyLeaves(result, { [p.replace(/^\//, '')]: v });
    fixed++;
    console.log(`   🩹 ${p}: разведено`);
  }
  return fixed;
}
