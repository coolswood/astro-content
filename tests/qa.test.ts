import { describe, test, expect } from 'bun:test';
import {
  aggregateLang,
  buildComparisonUnits,
  hashSeed,
  mulberry32,
  nodeAtPath,
  parseJudgeVerdict,
  passOrderFor,
  shuffleSeeded,
  stableWinRate,
  sumStats,
  unitText,
  verdictToSides,
  issueStatKey,
  type PairOutcome,
  type PassResult,
} from '../scripts/lib/qa.js';

describe('единицы сравнения (блоки-абзацы)', () => {
  const doc = {
    title: 'Заголовок',
    meta: { n: 5, ok: true, empty: null },
    screen_1: {
      texts: ['Первый абзац.', 'Второй, с <b>тегом</b>.', ''],
      note: 'Подпись',
    },
    chapters: [
      { texts: ['Вложенный массив.'], x: 1 },
      'просто строка',
    ],
  };

  test('buildComparisonUnits: скаляры по одному, массивы строк — одним блоком', () => {
    const units = buildComparisonUnits(doc);
    const byPath = new Map(units.map((u) => [u.path, u.parts]));
    expect([...byPath.keys()].sort()).toEqual([
      '/chapters/0/texts',
      '/chapters/1',
      '/screen_1/note',
      '/screen_1/texts',
      '/title',
    ]);
    // массив строк — цельный блок, пустые элементы отфильтрованы
    expect(byPath.get('/screen_1/texts')).toEqual(['Первый абзац.', 'Второй, с <b>тегом</b>.']);
    expect(byPath.get('/title')).toEqual(['Заголовок']);
  });

  test('числа/булевы/null не становятся блоками', () => {
    const units = buildComparisonUnits(doc);
    expect(units.some((u) => u.path.includes('meta'))).toBe(false);
  });

  test('unitText собирает строки target в порядке документа, узел может отсутствовать', () => {
    const target = {
      title: 'Title',
      screen_1: { texts: ['First.', 'Second.', 'Third extra.'] }, // элементов больше — это ок
    };
    expect(unitText(target, '/title')).toBe('Title');
    expect(unitText(target, '/screen_1/texts')).toBe('First.\n\nSecond.\n\nThird extra.');
    expect(unitText(target, '/missing/path')).toBe('');
    expect(nodeAtPath(target, '/screen_1/texts')).toEqual(target.screen_1.texts);
    expect(nodeAtPath(target, '/screen_1/texts/99')).toBeUndefined();
  });
});

describe('детерминированный рандом', () => {
  test('hashSeed — стабильный и различающий', () => {
    expect(hashSeed('abc')).toBe(hashSeed('abc'));
    expect(hashSeed('abc')).not.toBe(hashSeed('abd'));
  });

  test('mulberry32 — одна и та же последовательность для одного сида', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    const seqA = [a(), a(), a(), a()];
    const seqB = [b(), b(), b(), b()];
    expect(seqA).toEqual(seqB);
    expect(seqA.every((x) => x >= 0 && x < 1)).toBe(true);
  });

  test('shuffleSeeded — перестановка, детерминизм, все элементы на месте', () => {
    const src = Array.from({ length: 50 }, (_, i) => `k${i}`);
    const s1 = shuffleSeeded(src, mulberry32(7));
    const s2 = shuffleSeeded(src, mulberry32(7));
    expect(s1).toEqual(s2);
    expect([...s1].sort()).toEqual([...src].sort());
    expect(shuffleSeeded(src, mulberry32(8))).not.toEqual(s1); // другой сид — другой порядок
  });

  test('passOrderFor — проходы зеркальны, порядок детерминирован скоупом', () => {
    for (const scope of ['a', 'b', 'seed|file|ja|/x/0']) {
      expect(passOrderFor(scope, 2)).not.toBe(passOrderFor(scope, 1));
      expect(passOrderFor(scope, 1)).toBe(passOrderFor(scope, 1));
    }
  });
});

describe('parseJudgeVerdict', () => {
  test('строгий JSON разбирается', async () => {
    const raw = JSON.stringify({
      winner: 'A',
      confidence: 'high',
      scores: { A: 93, B: 88 },
      reason: 'A естественнее',
      issues: [{ side: 'B', type: 'style', severity: 'minor', note: 'канцелярит' }],
    });
    const v = await parseJudgeVerdict(raw);
    expect(v.winner).toBe('A');
    expect(v.scores).toEqual({ A: 93, B: 88 });
    expect(v.issues).toHaveLength(1);
    expect(v.issues[0].type).toBe('style');
  });

  test('fenced-JSON и lowercase winner', async () => {
    const v = await parseJudgeVerdict('```json\n{"winner":"b","scores":{"A":90,"B":91},"issues":[]}\n```');
    expect(v.winner).toBe('B');
    expect(v.issues).toEqual([]);
  });

  test('tie и некорректный winner', async () => {
    expect((await parseJudgeVerdict('{"winner":"tie"}')).winner).toBe('tie');
    await expect(parseJudgeVerdict('{"winner":"C"}')).rejects.toThrow();
    await expect(parseJudgeVerdict('ничего не понял')).rejects.toThrow();
  });

  test('мусор в issues отфильтровывается, type/severity приводятся к словарю, scores зажимаются', async () => {
    const v = await parseJudgeVerdict(
      JSON.stringify({
        winner: 'A',
        scores: { A: 150, B: -3 },
        issues: [
          { side: 'A', type: 'terminology', severity: 'critical', note: 'не по глоссарию' },
          { side: 'X', type: 'style', severity: 'minor', note: 'без стороны' },
          { side: 'B', type: 'что-то новое', severity: 'жесть', note: '' },
          'мусор',
        ],
      }),
    );
    expect(v.scores).toEqual({ A: 100, B: 0 });
    expect(v.issues).toHaveLength(2);
    expect(v.issues[0]).toMatchObject({ side: 'A', type: 'terminology', severity: 'critical' });
    expect(v.issues[1]).toMatchObject({ side: 'B', type: 'other', severity: 'minor' });
  });
});

describe('verdictToSides', () => {
  const ab = {
    winner: 'A' as const,
    confidence: 'high',
    scores: { A: 95, B: 85 },
    reason: 'r',
    issues: [{ side: 'A' as const, type: 'omission' as const, severity: 'major' as const, note: 'n' }],
  };

  test('old_first: A → old', () => {
    const s = verdictToSides(ab, 'old_first');
    expect(s.winnerFor).toBe('old');
    expect(s.scores).toEqual({ old: 95, new: 85 });
    expect(s.issues[0].side).toBe('old');
  });

  test('new_first: A → new', () => {
    const s = verdictToSides(ab, 'new_first');
    expect(s.winnerFor).toBe('new');
    expect(s.scores).toEqual({ old: 85, new: 95 });
    expect(s.issues[0].side).toBe('new');
  });
});

// ─────────────────────────────────────────────────────────────────────────────

function pass(partial: Partial<PassResult>): PassResult {
  return {
    order: 'old_first',
    ok: true,
    winnerFor: 'tie',
    confidence: 'high',
    scores: { old: 90, new: 90 },
    reason: '',
    issues: [],
    ...partial,
  };
}

function outcome(partial: Partial<PairOutcome>): PairOutcome {
  return {
    file: 'f.json',
    lang: 'de',
    key: '/k',
    ru: 'ru',
    oldText: 'old',
    newText: 'new',
    status: 'judged',
    stable: true,
    stableWinner: 'tie',
    passes: [],
    ...partial,
  };
}

describe('aggregateLang', () => {
  test('победы/ничьи считаются только по стабильным 2:0, неустойчивые отдельно', () => {
    const outcomes = [
      outcome({ key: '1', stable: true, stableWinner: 'new' }), // NEW win
      outcome({ key: '2', stable: true, stableWinner: 'old' }), // OLD win
      outcome({ key: '3', stable: true, stableWinner: 'tie' }), // tie
      outcome({
        key: '4',
        stable: false,
        stableWinner: null,
        passes: [pass({ winnerFor: 'old' }), pass({ order: 'new_first', winnerFor: 'new' })],
      }), // unstable
      outcome({ key: '5', status: 'failed', stable: false, stableWinner: null }), // failed
    ];
    const s = aggregateLang(outcomes);
    expect(s.compared).toBe(4); // failed не в compared
    expect(s.failed).toBe(1);
    expect(s.newWins).toBe(1);
    expect(s.oldWins).toBe(1);
    expect(s.ties).toBe(1);
    expect(s.unstable).toBe(1);
  });

  test('замечания — только из первого успешного прохода, критические считаются по сторонам', () => {
    const outcomes = [
      outcome({
        key: '1',
        passes: [
          pass({
            issues: [
              { side: 'new', type: 'mistranslation', severity: 'critical', note: '' },
              { side: 'old', type: 'style', severity: 'minor', note: '' },
              { side: 'old', type: 'style', severity: 'minor', note: '' },
            ],
          }),
          pass({
            order: 'new_first',
            issues: [{ side: 'new', type: 'style', severity: 'minor', note: 'дубль со второго прохода — не считается' }],
          }),
        ],
      }),
    ];
    const s = aggregateLang(outcomes);
    expect(s.criticalNew).toBe(1);
    expect(s.criticalOld).toBe(0);
    expect(s.issuesOld).toEqual({ 'style/minor': 2 });
    expect(s.issuesNew).toEqual({ 'mistranslation/critical': 1 });
    expect(issueStatKey({ side: 'new', type: 'style', severity: 'major', note: '' })).toBe('style/major');
  });

  test('stableWinRate и sumStats', () => {
    const s = aggregateLang([
      outcome({ key: '1', stableWinner: 'new' }),
      outcome({ key: '2', stableWinner: 'new' }),
      outcome({ key: '3', stableWinner: 'old' }),
      outcome({ key: '4', stable: false, stableWinner: null }),
    ]);
    expect(stableWinRate(s)).toBeCloseTo(2 / 3);
    expect(stableWinRate(aggregateLang([outcome({ key: '1', stableWinner: 'tie' })]))).toBeNull();

    const total = sumStats([s, s]);
    expect(total.newWins).toBe(4);
    expect(total.oldWins).toBe(2);
    expect(total.unstable).toBe(2);
    expect(stableWinRate(total)).toBeCloseTo(2 / 3);
  });
});
