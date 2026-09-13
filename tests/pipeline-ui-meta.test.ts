import { describe, test, expect } from 'bun:test';
import { runPipeline, type StageClient, type StageRequest } from '../scripts/lib/pipeline.js';

/**
 * Мета ключей (ui: @-мета ARB) — контекст запроса, а не переводимое
 * содержимое: уходит полем "meta", фильтруется по ключам чанка и не попадает
 * в paths (path-map) и в ответ модели.
 */

const PROMPTS = {
  main: 'PROMPT:MAIN',
  editor: 'PROMPT:EDITOR',
  review: 'PROMPT:REVIEW',
  fix: 'PROMPT:FIX',
};

const META = {
  get_button: { description: 'Кнопка получить подписку', placeholders: { days: {} } },
  hope: { description: 'Эмоция из списка' },
};

function fakeClient(mainUser: (user: string) => void): StageClient {
  return {
    name: 'fake',
    async complete(req: StageRequest) {
      if (req.system.includes('PROMPT:MAIN')) {
        mainUser(req.user);
        const parsed = JSON.parse(req.user);
        // path-map: отвечаем переводом ровно тех путей, что пришли в запросе
        const paths: Record<string, string> = {};
        for (const p of Object.keys(parsed.paths ?? {})) paths[p] = `TR ${p}`;
        return JSON.stringify({ paths });
      }
      if (req.system.includes('PROMPT:REVIEW')) return '{"issues":[]}';
      return 'Все хорошо';
    },
  };
}

describe('runPipeline — мета ключей (ui)', () => {
  test('path-map: meta в запросе, в paths её нет, ответ собирается по ключам', async () => {
    const users: string[] = [];
    const result = await runPipeline(
      fakeClient((u) => users.push(u)),
      PROMPTS,
      { get_button: 'Получить', hope: 'Надежда' },
      'de',
      { mainPathMap: true, meta: META },
    );
    const req = JSON.parse(users[0]!);
    expect(req.meta).toEqual(META);
    expect(Object.keys(req.paths).sort()).toEqual(['/get_button', '/hope']);
    expect(JSON.stringify(req.paths)).not.toContain('"@');
    expect(result.data).toEqual({ get_button: 'TR /get_button', hope: 'TR /hope' });
  });

  test('meta фильтруется по ключам чанка: чанк 1 не видит мету чанка 2', async () => {
    const users: string[] = [];
    const payload: Record<string, string> = {
      k1: 'оригинал 1',
      k2: 'оригинал 2',
      k3: 'оригинал 3',
    };
    const metaAll: Record<string, any> = {
      k1: { description: 'мета 1' },
      k2: { description: 'мета 2' },
      k3: { description: 'мета 3' },
    };
    await runPipeline(fakeClient((u) => users.push(u)), PROMPTS, payload, 'de', {
      mainPathMap: true,
      meta: metaAll,
      chunkLeaves: 2,
    });
    expect(users.length).toBe(2);
    const first = JSON.parse(users[0]!);
    const second = JSON.parse(users[1]!);
    expect(Object.keys(first.meta).sort()).toEqual(['k1', 'k2']);
    expect(first.meta.k3).toBeUndefined();
    expect(Object.keys(second.meta)).toEqual(['k3']);
  });

  test('без meta поле в запросе отсутствует', async () => {
    let mainUser = '';
    await runPipeline(fakeClient((u) => (mainUser = u)), PROMPTS, { a: 'А' }, 'de', {
      mainPathMap: true,
    });
    const req = JSON.parse(mainUser);
    expect('meta' in req).toBe(false);
  });

  test('регрессия: плоская карта строк чанкуется (раньше countLeaves(строка)=0 давал 0 чанков)', async () => {
    const users: string[] = [];
    const payload: Record<string, string> = {};
    for (let i = 1; i <= 5; i++) payload[`key${i}`] = `оригинал ${i}`;
    const result = await runPipeline(fakeClient((u) => users.push(u)), PROMPTS, payload, 'de', {
      mainPathMap: true,
      chunkLeaves: 2,
    });
    // 5 плоских ключей / ≤2 на чанк → 3 MAIN-запроса, все листья переведены
    expect(users.length).toBe(3);
    expect(result.data).toEqual({
      key1: 'TR /key1',
      key2: 'TR /key2',
      key3: 'TR /key3',
      key4: 'TR /key4',
      key5: 'TR /key5',
    });
  });
});
