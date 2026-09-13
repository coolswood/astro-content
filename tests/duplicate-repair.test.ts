import { describe, test, expect } from 'bun:test';
import { findDuplicateGroups, type DuplicateGroup } from '../scripts/lib/validation.js';
import { buildRepairPayload, repairDuplicateGroups, MAX_REPAIR_GROUPS } from '../scripts/lib/duplicate-repair.js';
import { flattenLeaves, type Leaves } from '../scripts/lib/tree.js';
import type { StageClient, StageRequest } from '../scripts/lib/pipeline.js';

/**
 * Дубли-«крючки»: разные ru-оригиналы → одинаковый перевод. Детект (правило 7
 * валидатора) и точечная разведка пар (repair) должны смотреть на мир одними
 * глазами: группы из findDuplicateGroups идут в Repair-запрос вместо полной
 * потери попытки файла.
 */

const IMPOSTOR_PAIR = {
  range: { extreme: 'Крайне выраженные признаки синдрома самозванца' },
  result: { extreme: { title: 'Выраженные признаки синдрома самозванца' } },
};

describe('findDuplicateGroups — детект групп для разведки', () => {
  test('пара с разницей-усилителем находится, пути нормализованы', () => {
    const ru = flattenLeaves(IMPOSTOR_PAIR);
    const tr = {
      range: { extreme: 'Sehr stark ausgeprägte Anzeichen des Impostor-Syndroms.' },
      result: { extreme: { title: 'Sehr stark ausgeprägte Anzeichen des Impostor-Syndroms.' } },
    };
    const groups = findDuplicateGroups('de', ru, tr);
    expect(groups).toHaveLength(1);
    expect([...groups[0]!.paths].sort()).toEqual(['range/extreme', 'result/extreme/title']);
  });

  test('ё/е — один текст: пара «Обостренное/Обострённое» не флагуется', () => {
    const ru = flattenLeaves({
      a: 'Обостренное депрессивное состояние',
      b: 'Обострённое депрессивное состояние',
    });
    const tr = { a: 'Verschlimmerte depressive Symptomatik mit Beeinträchtigung des Alltags.', b: 'Verschlimmerte depressive Symptomatik mit Beeinträchtigung des Alltags.' };
    expect(findDuplicateGroups('de', ru, tr)).toEqual([]);
  });

  test('разведённый перевод и короткие лейблы — групп нет', () => {
    const ru = flattenLeaves(IMPOSTOR_PAIR);
    const tr = {
      range: { extreme: 'Sehr stark ausgeprägte Anzeichen des Impostor-Syndroms.' },
      result: { extreme: { title: 'Deutliche Hinweise auf ein Impostor-Syndrom.' } },
    };
    expect(findDuplicateGroups('de', ru, tr)).toEqual([]);
    const labels = flattenLeaves({ a: 'Дальше', b: 'Другое' });
    expect(findDuplicateGroups('en', labels, { a: 'Next', b: 'Next' })).toEqual([]);
  });
});

describe('buildRepairPayload — сборка запроса разведки', () => {
  test('пути со слэшем, ru и текущие переводы рядом', () => {
    const ru: Leaves = { '/range/extreme': 'Крайне выраженные…', '/result/extreme/title': 'Выраженные…' };
    const tr = {
      range: { extreme: 'Sehr stark ausgeprägte Anzeichen.' },
      result: { extreme: { title: 'Sehr stark ausgeprägte Anzeichen.' } },
    };
    const payload = buildRepairPayload(ru, tr, [
      { paths: ['range/extreme', 'result/extreme/title'], normText: 'x' },
    ])!;
    expect(Object.keys(payload.paths).sort()).toEqual(['/range/extreme', '/result/extreme/title']);
    expect(payload.paths['/range/extreme']).toBe('Крайне выраженные…');
    expect(payload.context['/result/extreme/title']).toBe('Sehr stark ausgeprägte Anzeichen.');
  });

  test('меньше двух валидных листьев — null (разведка не нужна/невозможна)', () => {
    const ru: Leaves = { '/a': 'Первый длинный текст про психологию', '/b': 'Второй' };
    const tr = { a: 'Ein recht langer Text über Psychologie und Emotionen.', b: '' };
    expect(buildRepairPayload(ru, tr, [{ paths: ['a', 'b'], normText: 'x' }])).toBeNull();
  });
});

describe('repairDuplicateGroups — применение ответа с guard', () => {
  const ru = flattenLeaves({
    range: { extreme: 'Крайне выраженные признаки синдрома самозванца' },
    result: { extreme: { title: 'Выраженные признаки синдрома самозванца' } },
  });
  const same = 'Sehr stark ausgeprägte Anzeichen des Impostor-Syndroms.';
  const groups: DuplicateGroup[] = [{ paths: ['range/extreme', 'result/extreme/title'], normText: 'x' }];

  test('оба пути разведены, result мутирует, ответ в формате paths', async () => {
    const client: StageClient = {
      name: 'fake',
      async complete(req: StageRequest) {
        const wrapped = JSON.parse(req.user);
        expect(wrapped.paths['/range/extreme']).toContain('Крайне');
        expect(wrapped.context['/result/extreme/title']).toBe(same);
        return JSON.stringify({
          paths: {
            '/range/extreme': 'Sehr stark ausgeprägte Anzeichen eines Impostor-Syndroms.',
            '/result/extreme/title': 'Deutliche Hinweise auf ein Impostor-Syndrom.',
          },
        });
      },
    };
    const tr = { range: { extreme: same }, result: { extreme: { title: same } } };
    const fixed = await repairDuplicateGroups(client, 'PROMPT:MAIN', 'de', 'ru', ru, tr, groups);
    expect(fixed).toBe(2);
    expect(tr.range.extreme).not.toBe(tr.result.extreme.title);
  });

  test('ломкая правка (потеря) отбрасывается по одной, соседняя применяется', async () => {
    const longSame =
      'Sehr stark ausgeprägte Anzeichen eines Impostor-Syndroms mit erheblicher Beeinträchtigung des Alltags und des Selbstwertgefühls.';
    const client: StageClient = {
      name: 'fake',
      async complete() {
        return JSON.stringify({
          paths: {
            '/range/extreme': 'Совершенно другой текст, не имеющий отношения к оригиналу и подменяющий его целиком.',
            '/result/extreme/title': 'Deutliche Hinweise auf ein Impostor-Syndrom mit spürbaren Einschränkungen im Alltag.',
          },
        });
      },
    };
    const tr = { range: { extreme: longSame }, result: { extreme: { title: longSame } } };
    const fixed = await repairDuplicateGroups(client, 'PROMPT:MAIN', 'de', 'ru', ru, tr, groups);
    expect(fixed).toBe(1);
    expect(tr.range.extreme).toBe(longSame); // guard: тотальная подмена не прошла
    expect(tr.result.extreme.title).toBe('Deutliche Hinweise auf ein Impostor-Syndrom mit spürbaren Einschränkungen im Alltag.');
  });

  test('мусорный ответ (не paths-объект) — 0 правок', async () => {
    const client: StageClient = { name: 'fake', async complete() { return '["мусор"]'; } };
    const tr = { range: { extreme: same }, result: { extreme: { title: same } } };
    expect(await repairDuplicateGroups(client, 'PROMPT:MAIN', 'de', 'ru', ru, tr, groups)).toBe(0);
  });
});
