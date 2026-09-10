import { describe, test, expect } from 'bun:test';
import {
  flattenLeaves,
  buildSubtree,
  applyLeaves,
  removeLeaves,
  stableStringify,
} from '../scripts/lib/tree.js';

describe('flattenLeaves', () => {
  test('объекты, вложенность и массивы строк', () => {
    const src = {
      title: 'T',
      screen_1: { texts: ['a', 'b', 'c'] },
      nested: { deep: { value: 'V' } },
    };
    expect(flattenLeaves(src)).toEqual({
      '/title': 'T',
      '/screen_1/texts/0': 'a',
      '/screen_1/texts/1': 'b',
      '/screen_1/texts/2': 'c',
      '/nested/deep/value': 'V',
    });
  });

  test('пустая структура и корневая строка', () => {
    expect(flattenLeaves({})).toEqual({});
    expect(flattenLeaves([])).toEqual({});
    expect(flattenLeaves('solo')).toEqual({}); // корень-строка без пути не адресуем
  });

  test('нестроковые листья пропускаются', () => {
    expect(flattenLeaves({ n: 5, ok: true, nil: null, s: 'x' })).toEqual({ '/s': 'x' });
  });
});

describe('buildSubtree + applyLeaves (roundtrip)', () => {
  const src = {
    title: 'T',
    screen: { texts: ['a', 'b'], meta: 'm' },
  };

  test('поддерево содержит только выбранные пути и восстанавливает структуру', () => {
    const sub = buildSubtree(src, ['/screen/texts/1', '/title']);
    expect(sub).toEqual({ title: 'T', screen: { texts: [null, 'b'] } });
  });

  test('мердж поддерева в target не трогает остальное', () => {
    const target = { title: 'T-old', screen: { texts: ['a-old', 'b-old'], meta: 'm-old' }, extra: 'keep' };
    const sub = buildSubtree(src, ['/screen/texts/1']);
    applyLeaves(target, flattenLeaves(sub));
    expect(target).toEqual({
      title: 'T-old',
      screen: { texts: ['a-old', 'b'], meta: 'm-old' },
      extra: 'keep',
    });
  });

  test('мердж создаёт отсутствующие ветки и массивы', () => {
    const target: any = {};
    applyLeaves(target, { '/a/b/0': 'x', '/a/b/1': 'y' });
    expect(target).toEqual({ a: { b: ['x', 'y'] } });
  });
});

describe('removeLeaves', () => {
  test('удаляет лист из объекта', () => {
    const t: any = { a: { b: 'x', c: 'y' } };
    removeLeaves(t, ['/a/b']);
    expect(t).toEqual({ a: { c: 'y' } });
  });

  test('удаляет элемент массива со сдвигом индексов', () => {
    const t: any = { arr: ['a', 'b', 'c'] };
    removeLeaves(t, ['/arr/1']);
    expect(t).toEqual({ arr: ['a', 'c'] });
  });

  test('несуществующий путь — no-op', () => {
    const t: any = { a: 1 };
    removeLeaves(t, ['/x/y/z']);
    expect(t).toEqual({ a: 1 });
  });

  test('опустевший контейнер сворачивается вверх до непустого предка', () => {
    const t: any = { screen: { quote: { text: 'x', author: 'y' }, texts: ['a'] } };
    removeLeaves(t, ['/screen/quote/text', '/screen/quote/author']);
    expect(t).toEqual({ screen: { texts: ['a'] } });
  });

  test('непустой контейнер не сворачивается', () => {
    const t: any = { screen: { quote: { text: 'x', keep: 'y' } } };
    removeLeaves(t, ['/screen/quote/text']);
    expect(t).toEqual({ screen: { quote: { keep: 'y' } } });
  });
});

describe('stableStringify', () => {
  test('порядок ключей не влияет', () => {
    expect(stableStringify({ b: 1, a: { d: 2, c: 3 } })).toBe(
      stableStringify({ a: { c: 3, d: 2 }, b: 1 }),
    );
  });

  test('массивы сохраняют порядок', () => {
    expect(stableStringify([1, [2, 3]])).toBe(stableStringify([1, [2, 3]]));
    expect(stableStringify(['x'])).not.toBe(stableStringify(['y']));
  });
});

describe('removeLeaves — множественные индексы массива', () => {
  test('удаляет несколько элементов массива без сдвига индексов', () => {
    const t: any = { instagram: ['a', 'b', 'c'] };
    removeLeaves(t, ['/instagram/0', '/instagram/1', '/instagram/2']);
    expect(t).toEqual({});
  });

  test('два из трёх элементов + непустой остаток', () => {
    const t: any = { arr: ['a', 'b', 'c'] };
    removeLeaves(t, ['/arr/0', '/arr/2']);
    expect(t).toEqual({ arr: ['b'] });
  });

  test('индексы >9 (двузначные) удаляются корректно', () => {
    const t: any = { arr: Array.from({ length: 12 }, (_, i) => i) };
    removeLeaves(t, ['/arr/10', '/arr/11', '/arr/0']);
    expect(t.arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
