import { describe, test, expect } from 'bun:test';
import { runPipeline, type StageClient, type StageRequest } from '../scripts/lib/pipeline.js';

/**
 * Контекст принятых переводов (opts.context): попадает в обёртку запроса
 * main как поле "context" (образец стиля + запрет дублей эмоций) и не
 * добавляется, когда не передан.
 */

const PROMPTS = {
  main: 'PROMPT:MAIN',
  editor: 'PROMPT:EDITOR',
  review: 'PROMPT:REVIEW',
  fix: 'PROMPT:FIX',
};

function fakeClient(onMain: (user: string) => void): StageClient {
  return {
    name: 'fake',
    async complete(req: StageRequest) {
      if (req.system.includes('PROMPT:MAIN')) {
        onMain(req.user);
        return JSON.stringify({ title: 'Hi' });
      }
      if (req.system.includes('PROMPT:REVIEW')) return '{"issues":[]}';
      return 'Все хорошо';
    },
  };
}

describe('runPipeline — контекст принятых переводов', () => {
  test('context попадает в обёртку запроса, data не искажается', async () => {
    let mainUser = '';
    await runPipeline(fakeClient((u) => (mainUser = u)), PROMPTS, { title: 'Привет' }, 'de', {
      context: { hope: 'Hoffnung', helplessness: 'Hilflosigkeit' },
    });
    const wrapped = JSON.parse(mainUser);
    expect(wrapped.context).toEqual({ hope: 'Hoffnung', helplessness: 'Hilflosigkeit' });
    expect(wrapped.data).toEqual({ title: 'Привет' });
    expect(wrapped.targetLocale).toBe('de');
  });

  test('без context поле в запросе отсутствует', async () => {
    let mainUser = '';
    await runPipeline(fakeClient((u) => (mainUser = u)), PROMPTS, { title: 'Привет' }, 'de');
    const wrapped = JSON.parse(mainUser);
    expect('context' in wrapped).toBe(false);
  });
});
