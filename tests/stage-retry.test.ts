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
