import { describe, test, expect } from 'bun:test';
import { runPipeline, type StageClient, type StageRequest } from '../scripts/lib/pipeline.js';

/**
 * Стадии не пропускаются: сбой стадии (битый JSON, неожиданный формат,
 * ошибка транспорта) ретраится; после исчерпания попыток попытка языка
 * падает целиком (раннер ретраит язык, файл пишется только при успехе).
 */

const PROMPTS = {
  main: 'PROMPT:MAIN',
  editor: 'PROMPT:EDITOR',
  review: 'PROMPT:REVIEW',
  fix: 'PROMPT:FIX',
};

const PAYLOAD = { title: 'Привет', items: ['а', 'б'] };
const MAIN_DRAFT = JSON.stringify({ title: 'Hi', items: ['a', 'b'] });

function fakeClient(
  handlers: Record<string, (req: StageRequest, call: number) => Promise<string> | string>,
): StageClient & { calls: string[] } {
  const counts: Record<string, number> = {};
  return {
    name: 'fake',
    calls: [],
    async complete(req: StageRequest) {
      const key = Object.keys(handlers).find((k) => req.system.includes(k));
      if (!key) throw new Error(`неизвестная стадия: ${req.system.slice(0, 40)}`);
      counts[key] = (counts[key] ?? 0) + 1;
      return handlers[key](req, counts[key]);
    },
  };
}

function baseHandlers() {
  return {
    'PROMPT:MAIN': () => MAIN_DRAFT,
    'PROMPT:EDITOR': () => 'Все хорошо',
    'PROMPT:REVIEW': () => '{"issues":[]}',
    'PROMPT:FIX': () => 'Все хорошо',
  };
}

describe('runPipeline — ретраи стадий без пропусков', () => {
  test('editor ретраится после битого JSON, правка применяется', async () => {
    const client = fakeClient({
      ...baseHandlers(),
      'PROMPT:EDITOR': (_req, call) =>
        call === 1 ? 'не-JSON мусор {{{' : JSON.stringify({ title: 'Hi (polished)', items: ['a', 'b'] }),
    });
    const { data } = await runPipeline(client, PROMPTS, PAYLOAD, 'de');
    expect(data.title).toBe('Hi (polished)');
    expect(data.items).toEqual(['a', 'b']);
  });

  test('editor получает jsonMode на ретрае', async () => {
    let sawJsonMode = false;
    const client = fakeClient({
      ...baseHandlers(),
      'PROMPT:EDITOR': (req, call) => {
        if (call > 1) sawJsonMode = req.jsonMode === true;
        return call === 1 ? 'не-JSON мусор' : 'Все хорошо';
      },
    });
    await runPipeline(client, PROMPTS, PAYLOAD, 'de');
    expect(sawJsonMode).toBe(true);
  });

  test('исчерпание попыток editor роняет весь прогон', async () => {
    const client = fakeClient({
      ...baseHandlers(),
      'PROMPT:EDITOR': () => 'мусор',
    });
    await expect(runPipeline(client, PROMPTS, PAYLOAD, 'de', { stageAttempts: 2 })).rejects.toThrow(
      /\[editor\].*2 попыток/,
    );
  });

  test('review ретраится при неожиданном формате', async () => {
    const client = fakeClient({
      ...baseHandlers(),
      'PROMPT:REVIEW': (_req, call) => (call === 1 ? 'опять мусор' : '{"issues":[]}'),
    });
    const { data } = await runPipeline(client, PROMPTS, PAYLOAD, 'de');
    expect(data.title).toBe('Hi');
  });

  test('fix ретраится и применяет правку по замечаниям', async () => {
    const client = fakeClient({
      ...baseHandlers(),
      'PROMPT:REVIEW': () => '{"issues":[{"fragment":"Hi","problem":"сухо","suggestion":"живее"}]}',
      'PROMPT:FIX': (_req, call) =>
        call === 1 ? '###' : JSON.stringify({ title: 'Hi there', items: ['a', 'b'] }),
    });
    const { data } = await runPipeline(client, PROMPTS, PAYLOAD, 'de');
    expect(data.title).toBe('Hi there');
  });

  test('маркер «Все хорошо» не считается сбоем и не ретраится', async () => {
    let editorCalls = 0;
    const client = fakeClient({
      ...baseHandlers(),
      'PROMPT:EDITOR': (_req, call) => {
        editorCalls = call;
        return 'Все хорошо';
      },
    });
    const { data } = await runPipeline(client, PROMPTS, PAYLOAD, 'de');
    expect(editorCalls).toBe(1);
    expect(data.title).toBe('Hi');
  });
});

describe('runPipeline — capture: снимки стадий независимы от дальнейших мутаций', () => {
  test('draft в capture(main) не меняется после editor/fix', async () => {
    const seen: Record<string, any> = {};
    const client = fakeClient({
      ...baseHandlers(),
      'PROMPT:EDITOR': () => JSON.stringify({ title: 'Hi (polished)', items: ['a', 'b'] }),
      'PROMPT:REVIEW': () => '{"issues":[{"fragment":"Hi","problem":"сухо","suggestion":"живее"}]}',
      'PROMPT:FIX': () => JSON.stringify({ title: 'Hi there!', items: ['a', 'b'] }),
    });
    await runPipeline(client, PROMPTS, PAYLOAD, 'de', {
      capture: (stage, snap) => {
        seen[stage] = snap;
      },
    });
    expect(seen.main.title).toBe('Hi'); // не «Hi there!» — snapshot сделан до мутаций
    expect(seen.editor.title).toBe('Hi (polished)');
    expect(seen.fix.title).toBe('Hi there!');
    expect(seen.review.issues).toHaveLength(1);
  });
});

describe('runPipeline — mainPathMap: плоская карта «путь → перевод»', () => {
  test('main отвечает картой путей, дерево собирается с массивами; сдвиг невозможен', async () => {
    let sawPaths = false;
    let sawAddendum = false;
    const client = fakeClient({
      'PROMPT:MAIN': (req) => {
        sawPaths = req.user.includes('"paths"');
        sawAddendum = req.system.includes('ФОРМАТ ОТВЕТА');
        return JSON.stringify({ paths: { '/title': 'Hi', '/items/0': 'a', '/items/1': 'b' } });
      },
      'PROMPT:EDITOR': () => 'Все хорошо',
      'PROMPT:REVIEW': () => '{"issues":[]}',
      'PROMPT:FIX': () => 'Все хорошо',
    });
    const { data } = await runPipeline(client, PROMPTS, PAYLOAD, 'de', { mainPathMap: true });
    expect(sawPaths).toBe(true);
    expect(sawAddendum).toBe(true);
    expect(data.title).toBe('Hi');
    expect(Array.isArray(data.items)).toBe(true); // числовые ключи стали массивом
    expect(data.items).toEqual(['a', 'b']);
  });

  test('массовая потеря путей роняет прогон (контроль полноты), выдуманные пути не проходят', async () => {
    const client = fakeClient({
      'PROMPT:MAIN': () => JSON.stringify({ paths: { '/title': 'Hi', '/ghost': 'boo' } }),
      'PROMPT:EDITOR': () => 'Все хорошо',
      'PROMPT:REVIEW': () => '{"issues":[]}',
      'PROMPT:FIX': () => 'Все хорошо',
    });
    // 2 из 3 листьев без перевода — ratio > 0.3: recovery не спасает, падение целиком.
    await expect(runPipeline(client, PROMPTS, PAYLOAD, 'de', { mainPathMap: true })).rejects.toThrow(
      /потеряны ключи/,
    );
  });
});

describe('runPipeline — фолбэк: клин path-map не теряет файл', () => {
  test('path-map main падает → чанк проходит документным форматом', async () => {
    let documentMainCalled = false;
    const client = fakeClient({
      'PROMPT:MAIN': (req) => {
        // path-map запрос отличается аддендумом формата
        if (req.system.includes('ФОРМАТ ОТВЕТА')) throw new Error('The operation timed out');
        documentMainCalled = true;
        return MAIN_DRAFT;
      },
      'PROMPT:EDITOR': () => 'Все хорошо',
      'PROMPT:REVIEW': () => '{"issues":[]}',
      'PROMPT:FIX': () => 'Все хорошо',
    });
    const { data } = await runPipeline(client, PROMPTS, PAYLOAD, 'de', { mainPathMap: true });
    expect(documentMainCalled).toBe(true); // фолбэк реально ушёл в документный формат
    expect(data.title).toBe('Hi');
    expect(data.items).toEqual(['a', 'b']);
  });

  test('без mainPathMap фолбэка нет — падение прогона как раньше', async () => {
    const client = fakeClient({
      'PROMPT:MAIN': () => 'мусор {{{',
      'PROMPT:EDITOR': () => 'Все хорошо',
      'PROMPT:REVIEW': () => '{"issues":[]}',
      'PROMPT:FIX': () => 'Все хорошо',
    });
    await expect(runPipeline(client, PROMPTS, PAYLOAD, 'de', { stageAttempts: 2 })).rejects.toThrow(
      /Failed to parse AI JSON|потеряны ключи/,
    );
  });
});

describe('runPipeline — editor с контекстом соседних чанков', () => {
  test('контекст передаётся в editor образцом стиля, без контекста — чистый документ', async () => {
    const seen: string[] = [];
    const client = fakeClient({
      'PROMPT:MAIN': () => MAIN_DRAFT,
      'PROMPT:EDITOR': (req) => {
        seen.push(req.user);
        return 'Все хорошо';
      },
      'PROMPT:REVIEW': () => '{"issues":[]}',
      'PROMPT:FIX': () => 'Все хорошо',
    });
    await runPipeline(client, PROMPTS, PAYLOAD, 'de', { context: { 'Привет': 'Hi aus Kontext' } });
    await runPipeline(client, PROMPTS, PAYLOAD, 'de');
    expect(seen).toHaveLength(2);
    expect(seen[0]).toContain('КОНТЕКСТ');
    expect(seen[0]).toContain('Hi aus Kontext');
    expect(seen[0]).toContain('"title":"Hi"'); // документ по-прежнему первый в payload
    expect(seen[1]).not.toContain('КОНТЕКСТ'); // без контекста — чистый документ
    expect(seen[1]).toBe(JSON.stringify({ title: 'Hi', items: ['a', 'b'] }));
  });
});
