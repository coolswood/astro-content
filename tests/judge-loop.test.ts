import { describe, test, expect, afterEach } from 'bun:test';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { judgeFile, buildAlignedItems } from '../scripts/lib/judge.js';
import type { StageClient, StageRequest } from '../scripts/lib/pipeline.js';
import { readJsonOr } from '../scripts/lib/atomic-fs.js';

/**
 * Коллегия с циклом сходимости: раунд 1 находит замечание и правит,
 * раунд 2 чистый — локаль сошлась. Фейковый клиент различает стадии по
 * уникальным фразам промптов (audit_issues / audit_deliberate / audit_recommend).
 */

const ISSUES_ROUND1 = JSON.stringify({
  scan: [{ path: '/title', verdict: 'issue', note: 'сухо' }],
  issues: [{ id: 'I1', path: '/title', fragment: 'Hello', type: 'style', severity: 'minor', problem: 'сухо', why: 'нужно живее' }],
});
const ISSUES_CLEAN = JSON.stringify({ scan: [{ path: '/title', verdict: 'ok', note: 'ок' }], issues: [] });
const REVIEW_CONFIRM = JSON.stringify({ reviewed: [{ id: 'I1', verdict: 'confirmed', rank: 1, note: 'верно' }], notes: 'ok' });
const REVIEW_EMPTY = JSON.stringify({ reviewed: [], notes: 'замечаний не поступало' });
const REC_FIX = JSON.stringify({
  recommendations: [{ id: 'I1', priority: 1, path: '/title', current: 'Hello', proposed: 'Hello, judge!', alternatives: [], rationale: 'живее' }],
  overall: { score: 90, verdict: 'minor_edits', summary: 'поправить title' },
});
const REC_NONE = JSON.stringify({ recommendations: [], overall: { score: 98, verdict: 'publish', summary: 'чисто' } });

function fakeJudgeClient(responses: string[]): StageClient & { prompts: string[] } {
  const queue = [...responses];
  return {
    prompts: [],
    async complete(req: StageRequest) {
      this.prompts.push(req.system);
      if (queue.length === 0) throw new Error('фейковый клиент исчерпан');
      return queue.shift()!;
    },
  };
}

let tmp: string | null = null;

afterEach(async () => {
  if (tmp) {
    await fs.rm(tmp, { recursive: true, force: true });
    tmp = null;
  }
});

describe('коллегия — цикл до раунда без правок', () => {
  test('два раунда: правка вписана, второй раунд чистый, локаль сошлась', async () => {
    tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'judge-test-'));
    const relFile = 't.json';
    const targetPath = path.join(tmp, 'src', 'i18n', 'de', relFile);
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, JSON.stringify({ title: 'Hello' }));

    const client = fakeJudgeClient([
      ISSUES_ROUND1, REVIEW_CONFIRM, REC_FIX, // раунд 1
      ISSUES_CLEAN, REVIEW_EMPTY, REC_NONE,   // раунд 2
    ]);
    const ruJson = { title: 'Привет' };

    const results = await judgeFile({
      client,
      relFile,
      ruJson,
      perLang: { de: ['/title'] },
      apply: true,
      maxRounds: 3,
      rootOverride: tmp,
    });

    expect(results).toHaveLength(1);
    expect(results[0].rounds).toHaveLength(2);
    expect(results[0].totalApplied).toBe(1);
    expect(results[0].converged).toBe(true);

    const written = await readJsonOr<any>(targetPath, {});
    expect(written.title).toBe('Hello, judge!');
  });

  test('buildAlignedItems выравнивает ru и перевод по путям', () => {
    const items = buildAlignedItems(
      { '/a': 'привет', '/b/c': 'мир' },
      { '/a': 'hallo' },
      ['/a', '/b/c'],
    );
    expect(items).toEqual([
      { path: '/a', ru: 'привет', tr: 'hallo' },
      { path: '/b/c', ru: 'мир', tr: '' }, // отсутствующий перевод виден коллегии
    ]);
  });
});

describe('коллегия — защита от осцилляций', () => {
  test('повторное предложение уже бывшего значения отклоняется, локаль сходится', async () => {
    tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'judge-osc-'));
    const relFile = 'o.json';
    const targetPath = path.join(tmp, 'src', 'i18n', 'de', relFile);
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, JSON.stringify({ title: 'A' }));

    const issue = JSON.stringify({
      scan: [{ path: '/title', verdict: 'issue', note: 'хм' }],
      issues: [{ id: 'I1', path: '/title', fragment: 'x', type: 'style', severity: 'minor', problem: 'стиль', why: 'w' }],
    });
    const confirm = JSON.stringify({ reviewed: [{ id: 'I1', verdict: 'confirmed', rank: 1, note: 'ok' }], notes: '' });
    const recTo = (current: string, v: string) =>
      JSON.stringify({
        recommendations: [{ id: 'I1', priority: 1, path: '/title', current, proposed: v, alternatives: [], rationale: 'r' }],
        overall: { score: 90, verdict: 'minor_edits', summary: 's' },
      });

    // Раунд 1: A → B. Раунд 2: судья хочет вернуть A (осцилляция) — отклоняется.
    const client = fakeJudgeClient([issue, confirm, recTo('A', 'B'), issue, confirm, recTo('B', 'A')]);
    const results = await judgeFile({
      client,
      relFile,
      ruJson: { title: 'Оригинал' },
      perLang: { de: ['/title'] },
      apply: true,
      maxRounds: 4,
      rootOverride: tmp,
    });

    expect(results[0].rounds).toHaveLength(2);
    expect(results[0].converged).toBe(true);
    const written = await readJsonOr<any>(targetPath, {});
    expect(written.title).toBe('B');
    expect(results[0].rounds[1].skipped[0].reason).toContain('осцилляция');
  });
});
