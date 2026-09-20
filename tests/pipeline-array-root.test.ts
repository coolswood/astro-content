import { describe, test, expect } from 'bun:test';
import { runPipeline, mergeSubset, type StageClient, type StageRequest } from '../scripts/lib/pipeline.js';

/**
 * Документ-массив в корне (articles/affirmation/quotes-стиль): без обёртки
 * черновик main — массив, mergeSubset его отбрасывал, и файл терял все листья
 * («потеряны ключи: /0, /1 … — слишком много для recovery»). Обёртка
 * {content: …} держит все стадии в объектной форме; числовой объект 0..n-1
 * (форма buildSubtree для полного перевода) заворачивается так же, разреженный
 * (частичный перевод) — нет.
 */

const PROMPTS = {
  main: 'PROMPT:MAIN',
  editor: 'PROMPT:EDITOR',
  review: 'PROMPT:REVIEW',
  fix: 'PROMPT:FIX',
};

/** Клиент: main отдаёт заготовленный ответ, review — без замечаний, editor/fix — маркер «правок нет». */
function stubMain(mainResponse: string | ((user: string) => string)): StageClient {
  return {
    name: 'fake',
    async complete(req: StageRequest) {
      if (req.system.includes('PROMPT:MAIN')) {
        return typeof mainResponse === 'function' ? mainResponse(req.user) : mainResponse;
      }
      if (req.system.includes('PROMPT:REVIEW')) return '{"issues":[]}';
      return 'Все хорошо';
    },
  };
}

describe('runPipeline — документ-массив в корне (обёртка content)', () => {
  test('path-map: массив-корень уходит по путям /content/N, ответ — массив', async () => {
    let mainUser = '';
    const client = stubMain((user) => {
      mainUser = user;
      return JSON.stringify({ paths: { '/content/0': 'Eins', '/content/1': 'Zwei' } });
    });
    const { data } = await runPipeline(client, PROMPTS, ['Первый', 'Второй'], 'de', { mainPathMap: true });
    expect(JSON.parse(mainUser).paths).toEqual({ '/content/0': 'Первый', '/content/1': 'Второй' });
    expect(data).toEqual(['Eins', 'Zwei']);
  });

  test('path-map: числовой объект 0..n-1 (форма buildSubtree) заворачивается так же', async () => {
    const client = stubMain(() => JSON.stringify({ paths: { '/content/0': 'Eins', '/content/1': 'Zwei' } }));
    const { data } = await runPipeline(client, PROMPTS, { 0: 'Первый', 1: 'Второй' } as any, 'de', {
      mainPathMap: true,
    });
    expect(data).toEqual(['Eins', 'Zwei']);
  });

  test('документный формат: эхо-обёртка content снимается', async () => {
    const client = stubMain(JSON.stringify({ content: ['Eins', 'Zwei'] }));
    const { data } = await runPipeline(client, PROMPTS, ['Первый', 'Второй'], 'de');
    expect(data).toEqual(['Eins', 'Zwei']);
  });

  test('разреженный числовой объект (частичный перевод) остаётся объектом', async () => {
    let mainUser = '';
    const client = stubMain((user) => {
      mainUser = user;
      return JSON.stringify({ paths: { '/2': 'Drei' } });
    });
    const { data } = await runPipeline(client, PROMPTS, { 2: 'Третий' } as any, 'de', { mainPathMap: true });
    expect(JSON.parse(mainUser).paths).toEqual({ '/2': 'Третий' });
    expect(data).toEqual({ 2: 'Drei' });
  });

  test('объектный документ не заворачивается (пути без префикса content)', async () => {
    let mainUser = '';
    const client = stubMain((user) => {
      mainUser = user;
      return JSON.stringify({ paths: { '/title': 'Hallo' } });
    });
    const { data } = await runPipeline(client, PROMPTS, { title: 'Привет' }, 'de', { mainPathMap: true });
    expect(JSON.parse(mainUser).paths).toEqual({ '/title': 'Привет' });
    expect(data).toEqual({ title: 'Hallo' });
  });
});

describe('mergeSubset — массив-ответ для документа-массива', () => {
  test('массив применяется к массиву-базе по путям', () => {
    const out = mergeSubset(['eins', 'zwei', 'drei'], ['EINS', 'zwei', 'DREI'] as any, 'test');
    expect(out).toEqual(['EINS', 'zwei', 'DREI']);
  });

  test('массив применяется к числовому объекту-базе (пути /0… совпадают)', () => {
    const out = mergeSubset({ 0: 'eins', 1: 'zwei' } as any, ['EINS', 'ZWEI'] as any, 'test');
    expect(out).toEqual({ 0: 'EINS', 1: 'ZWEI' });
  });

  test('короткий массив не обрезает массив-базу', () => {
    const out = mergeSubset(['eins', 'zwei', 'drei'], ['EINS'] as any, 'test');
    expect(out).toEqual(['EINS', 'zwei', 'drei']);
  });
});

/**
 * Регрессия чанкования документа-массива (инцидент ja-2026): bail на
 * «единственном child» в chunkPayload отдавал обёртку {content: […]} одним
 * чанком на сотни листьев — вопросы шли одним path-map запросом на 308 путей,
 * где модель теряла пути и смещала массив. Теперь единственный переполненный
 * child рекурсивно режется.
 */
describe('runPipeline — чанкование документа-массива в обёртке content', () => {
  test('массив 30 записей (60 листьев) при chunk-leaves 20 режется на чанки', async () => {
    const payload = Array.from({ length: 30 }, (_, i) => ({ id: `id${i}`, translation: `В.${i}` }));
    let mainCalls = 0;
    const answered = new Set<string>();
    const client = stubMain((user) => {
      mainCalls++;
      // Запрос path-map несёт объект «путь → ru-строка» (null — разреженные
      // позиции чанка, их не спрашиваем). Отвечаем ровно на запрошенные пути;
      // id — стабильные идентификаторы, модель обязана эхнуть их как есть.
      const asked = JSON.parse(user).paths ?? {};
      const paths: Record<string, string> = {};
      for (const [p, ru] of Object.entries(asked as Record<string, string>)) {
        if (typeof ru !== 'string') continue;
        const m = p.match(/^\/(\d+)\/id$/);
        paths[p] = m ? `id${m[1]}` : 'перевод ' + p;
        answered.add(p);
      }
      return JSON.stringify({ paths });
    });
    const { data } = await runPipeline(client, PROMPTS, payload, 'de', {
      mainPathMap: true,
      chunkLeaves: 20,
    });
    expect(mainCalls).toBeGreaterThan(1); // НЕ один чанк на весь документ
    expect(answered.size).toBe(60);
    expect(data).toHaveLength(30);
    expect(data[0]).toEqual({ id: 'id0', translation: 'перевод /0/translation' });
  });
});
