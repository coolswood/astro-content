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

  test('маркер/мусор не трогает базу; массив с чужими путями — тоже (для документа-массива массив легитимен, см. pipeline-array-root)', () => {
    const base = { a: '1' };
    expect(mergeSubset(base, 'Все хорошо', 'test')).toEqual({ a: '1' });
    expect(mergeSubset(base, null, 'test')).toEqual({ a: '1' });
    expect(mergeSubset(base, ['x'], 'test')).toEqual({ a: '1' });
  });
});

/**
 * Пер-листовой guard правок стадий (editor/fix/tech): ломкая правка одного
 * листа отбрасывается по одной — остальной патч применяется как есть.
 */
import { stageEditRejections } from '../scripts/lib/pipeline.js';

describe('stageEditRejections — причины отбраковки правки листа', () => {
  test('потеря тега — отбраковка', () => {
    const r = stageEditRejections('<important>Будьте внимательны к себе.</important>', 'Будьте внимательны к себе.');
    expect(r.some((x) => x.includes('тег'))).toBe(true);
  });

  test('потеря плейсхолдера — отбраковка', () => {
    const r = stageEditRejections('Привет, {name}! Как дела?', 'Привет! Как дела?');
    expect(r.some((x) => x.includes('плейсхолдер'))).toBe(true);
  });

  test('схлопывание текста — отбраковка', () => {
    const draft = 'Длинное предложение о том, как важно заботиться о себе каждый день и не забывать отдыхать.';
    const r = stageEditRejections(draft, 'Заботьтесь.');
    expect(r.some((x) => x.includes('схлопнулся'))).toBe(true);
  });

  test('тотальная подмена — отбраковка', () => {
    const draft = 'Perfektionismus ist die Angst in eleganten Schuhen, die vorgibt, stilvoll zu sein.';
    const r = stageEditRejections(draft, '完全に異なる内容がここに入ってしまいました。');
    expect(r.some((x) => x.includes('подмена'))).toBe(true);
  });

  test('задвоение слова/слогов — отбраковка', () => {
    expect(stageEditRejections('Das gilt weiterhin.', 'Das gilt gilt weiterhin.').some((x) => x.includes('задвоение'))).toBe(true);
    expect(stageEditRejections('思考や心を覆い尽くすような', '思考や心を覆い覆い尽くすような').some((x) => x.includes('задвоение'))).toBe(true);
  });

  test('легитимная полировка проходит', () => {
    expect(stageEditRejections('Betrachten wir als Beispiel Eugen.', 'Nehmen wir Eugen als Beispiel.')).toEqual([]);
  });

  test('ударное удвоение без запятой («ganz ganz») отвергается — осознанный компромисс: guard консервативен, теряется правка, а не портится текст', () => {
    expect(stageEditRejections('ganz, ganz wichtig', 'ganz ganz wichtig').some((x) => x.includes('задвоение'))).toBe(true);
  });

  test('правка без изменений и короткие листы без признаков — null', () => {
    expect(stageEditRejections('gleich', 'gleich')).toEqual([]);
    expect(stageEditRejections('ok', 'Gut')).toEqual([]);
  });
});

describe('mergeSubset с reject — сломанная правка не отменяет остальные', () => {
  const rejectTagLoss = (draft: string, patch: string) =>
    (draft.match(/<li>/g) ?? []).length > (patch.match(/<li>/g) ?? []).length ? ['потерян тег <li>'] : null;

  test('ломкий лист остаётся на значении базы, соседние применяются', () => {
    const base = { texts: ['<li>eins</li>', '<li>zwei</li>', '<li>drei</li>'] };
    const out = mergeSubset(
      base,
      { texts: ['<li>EINS</li>', 'zwei ohne tag', '<li>DREI</li>'] } as any,
      'test',
      rejectTagLoss,
    );
    expect(out.texts[0]).toBe('<li>EINS</li>');
    expect(out.texts[1]).toBe('<li>zwei</li>');
    expect(out.texts[2]).toBe('<li>DREI</li>');
  });
});
