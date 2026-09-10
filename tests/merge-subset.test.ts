import { describe, test, expect } from 'bun:test';
import { mergeSubset } from '../scripts/lib/pipeline.js';

/**
 * Контракт editor/fix — ПОЛНЫЙ документ в ответе (свободное переписывание).
 * mergeSubset применяет ответ поверх base только по существующим путям и
 * только строковыми непустыми значениями: структура и длины массивов
 * фиксируются базой, элементы не могут добавиться или переставиться.
 */
describe('mergeSubset — полный документ/дифф поверх фиксированной структуры', () => {
  test('точечный патч применяется', () => {
    const base = { title: 'T', texts: ['eins', 'zwei', 'drei', 'vier', 'fünf'] };
    const out = mergeSubset(base, { texts: { 2: 'DREI' } } as any, 'test');
    expect(out.texts[2]).toBe('DREI');
    expect(out.texts[0]).toBe('eins');
    expect(out.title).toBe('T');
  });

  test('полный документ переписывает значения по существующим путям', () => {
    const base = { title: 'T', texts: ['eins', 'zwei', 'drei', 'vier', 'fünf'] };
    const out = mergeSubset(base, { title: 'Neu', texts: ['a', 'b', 'c', 'd', 'e'] }, 'test');
    expect(out).toEqual({ title: 'Neu', texts: ['a', 'b', 'c', 'd', 'e'] });
  });

  test('структура фиксируется базой: короткий массив не обрезает базу', () => {
    const base = { texts: ['eins', 'zwei', 'drei', 'vier', 'fünf'] };
    const out = mergeSubset(base, { texts: ['a', 'b', 'c'] }, 'test');
    expect(out.texts).toEqual(['a', 'b', 'c', 'vier', 'fünf']);
  });

  test('несуществующие пути, пустые и не-строковые значения игнорируются', () => {
    const base = { a: '1', b: '2' };
    const out = mergeSubset(base, { a: '   ', ghost: 'x', b: 42, deep: { no: ['pe'] } } as any, 'test');
    expect(out).toEqual({ a: '1', b: '2' });
  });

  test('эхо-обёртка {data} снимается, если пути /data в базе нет', () => {
    const base = { a: '1', b: '2' };
    const out = mergeSubset(base, { data: { a: 'x', b: 'y' } } as any, 'test');
    expect(out).toEqual({ a: 'x', b: 'y' });
  });

  test('легитимный корневой ключ data не путается с обёрткой', () => {
    const base = { data: 'alt', other: 'keep' };
    const out = mergeSubset(base, { data: { inner: 'nope' }, other: 'moved' } as any, 'test');
    expect(out.data).toBe('alt');
    expect(out.other).toBe('moved');
  });

  test('вложенные контейнеры: значения по путям применяются', () => {
    const base = {
      screen_1: { texts: ['a1', 'a2', 'a3', 'a4'] },
      screen_2: { texts: ['b1', 'b2', 'b3', 'b4'] },
    };
    const out = mergeSubset(
      base,
      {
        screen_1: { texts: ['x1', 'x2', 'a3', 'a4'] },
        screen_2: { texts: { 3: 'B4-fix' } },
      } as any,
      'test',
    );
    expect(out.screen_1.texts).toEqual(['x1', 'x2', 'a3', 'a4']);
    expect(out.screen_2.texts[3]).toBe('B4-fix');
  });

  test('не-объект (маркер/мусор) не трогает базу', () => {
    const base = { a: '1' };
    expect(mergeSubset(base, 'Все хорошо', 'test')).toEqual({ a: '1' });
    expect(mergeSubset(base, null, 'test')).toEqual({ a: '1' });
    expect(mergeSubset(base, ['x'], 'test')).toEqual({ a: '1' });
  });
});
