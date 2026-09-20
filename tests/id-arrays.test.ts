import { describe, test, expect } from 'bun:test';
import { realignIdArrays } from '../scripts/lib/id-arrays.js';
import { validateTranslation, isStableIdPath } from '../scripts/lib/validation.js';
import { flattenLeaves } from '../scripts/lib/tree.js';

/**
 * Инцидент ja-2026 (questions.json, ветка agent/ja-full): переперевод потерял
 * одну запись массива и сместил хвост — id следующей записи встал на место
 * предыдущей, хвост залит дублями. Сверка путей это не видит: все пути на
 * месте, значения непустые. Защита двусторонняя: realignIdArrays (join по id
 * в конвейере, чинит механически) + правило 3.8 валидации (id байт-в-байт,
 * ловит остаточную порчу на любом пути записи файла).
 */

const ruQuestions = [
  { id: 'a1', translation: 'Вопрос один' },
  { id: 'b2', translation: 'Вопрос два' },
  { id: 'c3', translation: 'Вопрос три' },
  { id: 'd4', translation: 'Вопрос четыре' },
  { id: 'e5', translation: 'Вопрос пять' },
];

/** Форма ответа модели из инцидента: запись b2 потеряна, хвост смещён,
 *  последняя запись продублирована для сохранения длины. */
const shiftedDraft = [
  { id: 'a1', translation: 'вопрос いち' },
  { id: 'c3', translation: 'вопрос さん' },
  { id: 'd4', translation: 'вопрос し' },
  { id: 'e5', translation: 'вопрос ご' },
  { id: 'e5', translation: 'вопрос ご' }, // дубль хвоста
];

describe('realignIdArrays — join перевода по значению id', () => {
  test('смещённый ответ выравнивается: каждый id на каноническом месте', () => {
    const draft = structuredClone(shiftedDraft);
    const reports = realignIdArrays(ruQuestions, draft);
    expect(reports).toHaveLength(1);
    const r = reports[0]!;
    expect(r.arrayPath).toBe('');
    expect(r.missingIds).toEqual(['b2']);
    expect(r.duplicateIds).toEqual(['e5']);
    // id по позициям канона:
    expect(draft[0].id).toBe('a1');
    expect(draft[1].id).toBe('b2'); // заглушка потерянной записи
    expect(draft[2].id).toBe('c3');
    expect(draft[3].id).toBe('d4');
    expect(draft[4].id).toBe('e5');
    // потерянная запись — пустая заглушка (лист «потерян» → recovery):
    expect(draft[1].translation).toBe('');
    // переводы встали под своими id:
    expect(draft[2].translation).toBe('вопрос さん');
  });

  test('чистый ответ не трогается', () => {
    const draft = ruQuestions.map((q) => ({ id: q.id, translation: 'перевод ' + q.id }));
    const before = structuredClone(draft);
    const reports = realignIdArrays(ruQuestions, draft);
    expect(reports[0]!.realigned).toBe(0);
    expect(reports[0]!.missingIds).toEqual([]);
    expect(draft).toEqual(before);
  });

  test('чужой id отбрасывается, запись остаётся заглушкой', () => {
    const draft = [
      { id: 'ZZZ', translation: 'выдумка' },
      { id: 'b2', translation: 'x2' },
      { id: 'c3', translation: 'x3' },
      { id: 'd4', translation: 'x4' },
      { id: 'e5', translation: 'x5' },
    ];
    const reports = realignIdArrays(ruQuestions, draft);
    expect(reports[0]!.unknownIds).toEqual(['ZZZ']);
    expect(draft[0].id).toBe('a1');
    expect(draft[0].translation).toBe('');
  });

  test('массив в обёртке content (документ-массив в корне конвейера)', () => {
    const doc = { content: structuredClone(shiftedDraft) };
    const source = { content: ruQuestions };
    const reports = realignIdArrays(source, doc);
    expect(reports[0]!.arrayPath).toBe('content');
    expect(doc.content[1].id).toBe('b2');
    expect(doc.content[1].translation).toBe('');
    expect(doc.content[2].translation).toBe('вопрос さん');
  });

  test('числовой объект (инкрементальная форма) выравнивается тем же join', () => {
    const draft: any = {};
    shiftedDraft.forEach((it, i) => {
      draft[i] = { ...it };
    });
    const reports = realignIdArrays(ruQuestions, draft);
    expect(reports[0]!.missingIds).toEqual(['b2']);
    expect(draft[1].id).toBe('b2');
    expect(draft[1].translation).toBe('');
    expect(draft[2].id).toBe('c3');
  });

  test('разреженный источник (recovery): null-позиции сохраняются', () => {
    const source = [null, { id: 'b2', translation: 'Вопрос два' }, null];
    const draft = [{ id: 'b2', translation: 'x' }];
    const reports = realignIdArrays(source, draft);
    expect(reports).toHaveLength(1);
    expect(draft[0]).toBeNull();
    expect(draft[1].id).toBe('b2');
    expect(draft[1].translation).toBe('x');
    expect(draft[2]).toBeNull();
  });

  test('массивы без стабильных id не трогаются (обычные тексты)', () => {
    const source = { texts: ['a', 'b', 'c'] };
    const draft = { texts: ['x', 'y', 'z'] };
    expect(realignIdArrays(source, draft)).toEqual([]);
    expect(draft.texts).toEqual(['x', 'y', 'z']);
  });
});

describe('правило 3.8 — стабильный id в валидации', () => {
  const ruLeaves = flattenLeaves(ruQuestions);

  test('смещённый id флагуется даже при полных путях', () => {
    const shifted = [
      { id: 'a1', translation: 'q1 ja' },
      { id: 'c3', translation: 'q2 ja' }, // id записи 2 на месте записи 1
      { id: 'c3', translation: 'q2 ja' },
      { id: 'd4', translation: 'q3 ja' },
      { id: 'e5', translation: 'q4 ja' },
    ];
    const issues = validateTranslation('ja', ruLeaves, shifted);
    const idIssues = issues.filter((i) => isStableIdPath(i.path));
    expect(idIssues.length).toBeGreaterThan(0);
    expect(idIssues[0]!.message).toContain('id-целостность');
  });

  test('канонический файл вопросов проходит валидацию без замечаний по id', () => {
    const good = ruQuestions.map((q) => ({ id: q.id, translation: '日本語訳 ' + q.id }));
    const issues = validateTranslation('ja', ruLeaves, good);
    expect(issues.filter((i) => isStableIdPath(i.path))).toEqual([]);
  });

  test('пер-листовая валидация (путь правок коллегии): id не переводится', () => {
    // Ровно так коллегия валидирует предложенную правку листа.
    const editOk = validateTranslation('ja', { '2/id': 'c3' }, { '2/id': 'c3' });
    expect(editOk).toEqual([]);
    const editBad = validateTranslation('ja', { '2/id': 'c3' }, { '2/id': 'с3-localized' });
    expect(editBad.length).toBe(1);
    expect(editBad[0]!.message).toContain('id-целостность');
  });

  test('isStableIdPath распознаёт только id под индексом массива', () => {
    expect(isStableIdPath('12/id')).toBe(true);
    expect(isStableIdPath('blocks/3/items/0/id')).toBe(true);
    expect(isStableIdPath('/12/id')).toBe(true); // ведущий слэш нормализуется
    expect(isStableIdPath('id')).toBe(false);
    expect(isStableIdPath('user/id')).toBe(false); // не под числовым индексом
    expect(isStableIdPath('12/title')).toBe(false);
  });
});

describe('инцидент ja-2026 — end-to-end мини-репро', () => {
  test('сдвиг реального масштаба: 6 дублированных id + 6 потерянных вопросов', () => {
    // 20 записей; модель потеряла записи 5..10 и залила хвост дублями —
    // форма фактического повреждения main (154 записи, 148 уникальных id).
    const source = Array.from({ length: 20 }, (_, i) => ({
      id: `id${String(i).padStart(2, '0')}`,
      translation: `Вопрос ${i}`,
    }));
    const draft: any[] = [];
    for (let i = 0; i < 5; i++) draft.push({ id: source[i]!.id, translation: `訳${i}` });
    for (let i = 11; i < 20; i++) draft.push({ id: source[i]!.id, translation: `訳${i}` }); // 5..10 потеряны
    while (draft.length < 20) draft.push({ ...draft[draft.length - 1]! }); // хвост дублями

    const before = draft.length;
    realignIdArrays(source, draft);
    expect(draft.length).toBe(before);
    expect(new Set(draft.map((x) => x.id)).size).toBe(20); // все id уникальны и каноничны
    for (let i = 0; i < 20; i++) {
      expect(draft[i]!.id).toBe(source[i]!.id);
      if (i >= 5 && i <= 10) expect(draft[i]!.translation).toBe(''); // потерянные — заглушки
      else expect(draft[i]!.translation).not.toBe('');
    }
  });
});
