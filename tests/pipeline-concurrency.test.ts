import { describe, test, expect, afterEach } from 'bun:test';
import { VllmClient, setModelConcurrency } from '../scripts/lib/pipeline.js';

/**
 * Шлюз одновременности VllmClient: не более N одновременных запросов к модели
 * (общий семафор процесса) и приоритет в очереди vLLM в теле запроса.
 */

const originalFetch = globalThis.fetch;
let inFlight = 0;
let maxInFlight = 0;
const bodies: any[] = [];

function stubFetch(delayMs = 25): void {
  inFlight = 0;
  maxInFlight = 0;
  bodies.length = 0;
  globalThis.fetch = (async (_url: any, init?: any) => {
    inFlight++;
    maxInFlight = Math.max(maxInFlight, inFlight);
    bodies.push(JSON.parse(init?.body ?? '{}'));
    await new Promise((r) => setTimeout(r, delayMs));
    inFlight--;
    return new Response(JSON.stringify({ choices: [{ message: { content: 'ok' } }] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }) as any;
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  setModelConcurrency(1); // дефолт процесса — не протекает между тестами
});

describe('VllmClient — шлюз одновременности и приоритет', () => {
  test('лимит 3: из 6 запросов одновременно в полёте не больше 3', async () => {
    stubFetch();
    setModelConcurrency(3);
    const client = new VllmClient('http://test/v1', 'm');
    await Promise.all(Array.from({ length: 6 }, () => client.complete({ system: 's', user: 'u' })));
    expect(maxInFlight).toBe(3);
  });

  test('дефолт (1): строго по одному', async () => {
    stubFetch();
    const client = new VllmClient('http://test/v1', 'm');
    await Promise.all(Array.from({ length: 4 }, () => client.complete({ system: 's', user: 'u' })));
    expect(maxInFlight).toBe(1);
  });

  test('клиентский priority >0 попадает в тело, 0 — поле не отправляется', async () => {
    stubFetch();
    const low = new VllmClient('http://test/v1', 'm', 600_000, 10);
    await low.complete({ system: 's', user: 'u' });
    expect(bodies[0].priority).toBe(10);

    const normal = new VllmClient('http://test/v1', 'm', 600_000, 0);
    await normal.complete({ system: 's', user: 'u' });
    expect('priority' in bodies[1]).toBe(false);
  });

  test('per-request priority перекрывает клиентский (0 — не слать)', async () => {
    stubFetch();
    const client = new VllmClient('http://test/v1', 'm', 600_000, 10);
    await client.complete({ system: 's', user: 'u', priority: 0 });
    expect('priority' in bodies[0]).toBe(false);
    await client.complete({ system: 's', user: 'u', priority: 5 });
    expect(bodies[1].priority).toBe(5);
  });
});
