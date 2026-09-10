import { describe, test, expect } from 'bun:test';
import { mergeSubset } from '../scripts/lib/pipeline.js';

/**
 * Guard «полного документа»: editor/fix/fix обязаны возвращать только
 * изменённые ключи. Патч, покрывающий ВСЕ листья контейнера (≥4), —
 * переписанный контейнер целиком; его правки отбрасываются, иначе вместе
 * с «полировкой» въезжают незаявленные перестановки элементов и
 * эпиграфы-дубли (дефект «крючков» в первых элементах экранов).
 */
describe('mergeSubset — guard полного документа', () => {
  test('точечный патч применяется', () => {
    const base = { title: 'T', texts: ['eins', 'zwei', 'drei', 'vier', 'fünf'] };
    const out = mergeSubset(base, { texts: { 2: 'DREI' } } as any, 'test');
    expect(out.texts[2]).toBe('DREI');
    expect(out.texts[0]).toBe('eins');
    expect(out.title).toBe('T');
  });

  test('полный массив (≥4 листьев) отбрасывается, остальное применяется', () => {
    const base = { title: 'T', texts: ['eins', 'zwei', 'drei', 'vier', 'fünf'] };
    const out = mergeSubset(base, { title: 'Neu', texts: ['a', 'b', 'c', 'd', 'e'] }, 'test');
    expect(out.texts).toEqual(['eins', 'zwei', 'drei', 'vier', 'fünf']);
    expect(out.title).toBe('Neu');
  });

  test('полный документ (все листья корня) отбрасывается целиком', () => {
    const base = { a: '1', b: '2', c: '3', d: '4' };
    const out = mergeSubset(base, { a: 'x', b: 'y', c: 'z', d: 'w' }, 'test');
    expect(out).toEqual({ a: '1', b: '2', c: '3', d: '4' });
  });

  test('малый контейнер (≤3 листьев) даже с полным покрытием применяется', () => {
    const base = { arr: ['eins', 'zwei', 'drei'] };
    const out = mergeSubset(base, { arr: ['a', 'b', 'c'] }, 'test');
    expect(out.arr).toEqual(['a', 'b', 'c']);
  });

  test('почти полный массив (4 из 5) применяется — guard не мешает ревью-правкам', () => {
    const base = { texts: ['eins', 'zwei', 'drei', 'vier', 'fünf'] };
    const out = mergeSubset(base, { texts: { 0: 'a', 1: 'b', 2: 'c', 3: 'd' } } as any, 'test');
    expect(out.texts).toEqual(['a', 'b', 'c', 'd', 'fünf']);
  });

  test('несуществующие пути и пустые значения игнорируются', () => {
    const base = { a: '1', b: '2' };
    const out = mergeSubset(base, { a: '   ', ghost: 'x' } as any, 'test');
    expect(out).toEqual({ a: '1', b: '2' });
  });

  test('не-объект (маркер/мусор) не трогает базу', () => {
    const base = { a: '1' };
    expect(mergeSubset(base, 'Все хорошо', 'test')).toEqual({ a: '1' });
    expect(mergeSubset(base, null, 'test')).toEqual({ a: '1' });
    expect(mergeSubset(base, ['x'], 'test')).toEqual({ a: '1' });
  });

  test('вложенные контейнеры: полный подмассив отбрасывается, соседний применяется', () => {
    const base = {
      screen_1: { texts: ['a1', 'a2', 'a3', 'a4'] },
      screen_2: { texts: ['b1', 'b2', 'b3', 'b4'] },
    };
    const out = mergeSubset(
      base,
      {
        screen_1: { texts: ['x1', 'x2', 'x3', 'x4'] },
        screen_2: { texts: { 3: 'B4-fix' } },
      } as any,
      'test',
    );
    expect(out.screen_1.texts).toEqual(['a1', 'a2', 'a3', 'a4']);
    expect(out.screen_2.texts[3]).toBe('B4-fix');
  });
});
