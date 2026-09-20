import { describe, test, expect } from 'bun:test';
import { runPipeline, type StageClient, type StageRequest } from '../scripts/lib/pipeline.js';

/**
 * Клин path-map (trap/love): модель молча возвращает ЧАСТЬ карты путей.
 * Потеря >30% путей чанка — исключение → пер-чанковый документный фолбэк;
 * малая потеря — warning, хвост добивает recovery.
 */

const PROMPTS = {
  main: 'PROMPT:MAIN',
  editor: 'PROMPT:EDITOR',
  review: 'PROMPT:REVIEW',
  fix: 'PROMPT:FIX',
};

function stubClient(onMain: (user: string) => string): StageClient {
  return {
    name: 'fake',
    async complete(req: StageRequest) {
      if (req.system.includes('PROMPT:MAIN')) return onMain(req.user);
      if (req.system.includes('PROMPT:REVIEW')) return '{"issues":[]}';
      return 'Все хорошо';
    },
  };
}

describe('runPipeline — неполная карта path-map', () => {
  test('>30% отсутствующих путей: чанк перегоняется документным форматом', async () => {
    const seenUsers: string[] = [];
    const client = stubClient((user) => {
      seenUsers.push(user);
      const wrapped = JSON.parse(user);
      if (wrapped.paths) {
        // Клин: из 4 путей модель вернула только 1.
        return JSON.stringify({ paths: { '/a': 'Alpha' } });
      }
      return JSON.stringify({ data: { a: 'Alpha', b: 'Beta' } });
    });
    const { data } = await runPipeline(client, PROMPTS, { a: 'А', b: 'Б' }, 'de', { mainPathMap: true });
    expect(data).toEqual({ a: 'Alpha', b: 'Beta' });
    expect(seenUsers).toHaveLength(2);
    expect('paths' in JSON.parse(seenUsers[0]!)).toBe(true);
    expect('data' in JSON.parse(seenUsers[1]!)).toBe(true);
  });

  test('малая потеря (≤30%): recovery допереводит хвост без фолбэка', async () => {
    const seenUsers: string[] = [];
    const client = stubClient((user) => {
      seenUsers.push(user);
      const wrapped = JSON.parse(user);
      if (wrapped.paths) {
        const keys = Object.keys(wrapped.paths);
        if (keys.length > 1) {
          // MAIN: 1 из 4 путей отсутствует — 25%.
          return JSON.stringify({ paths: { '/a': 'Alpha', '/b': 'Beta', '/c': 'Gamma' } });
        }
        // Recovery: запрос — плоская карта только потерянных путей (раньше
        // шло разреженное дерево data с null-паддингом).
        expect(keys).toEqual(['/d']);
        return JSON.stringify({ paths: { '/d': 'Delta' } });
      }
      return JSON.stringify({ data: { d: 'Delta' } });
    });
    const { data } = await runPipeline(client, PROMPTS, { a: 'А', b: 'Б', c: 'В', d: 'Д' }, 'de', {
      mainPathMap: true,
    });
    expect(data).toEqual({ a: 'Alpha', b: 'Beta', c: 'Gamma', d: 'Delta' });
    expect(seenUsers).toHaveLength(2);
  });
});
