import { describe, test, expect } from 'bun:test';
import {
  reconcileTags,
  stripSurplusTags,
  stripInstagramAttributes,
  normalizeTagQuotes,
  tagSignatures,
  diffTagMultiset,
} from '../scripts/lib/tag-reconcile.js';

describe('tagSignatures / diffTagMultiset', () => {
  test('сигнатуры: пары, атрибуты, регистр', () => {
    expect(tagSignatures("<Q author='X'>y</q> <instagram>")).toEqual(['q', '/q', 'instagram']);
  });

  test('diff: избыток и нехватка', () => {
    const d = diffTagMultiset(['b', '/b', 'b', '/b'], ['b', '/b', 'q', '/q']);
    expect(d.get('b')).toBe(1);
    expect(d.get('/b')).toBe(1);
    expect(d.get('q')).toBeUndefined(); // q есть только в b → не избыток a
    expect(diffTagMultiset(['b'], []).get('b')).toBe(1);
  });
});

describe('stripSurplusTags', () => {
  test('обёртка раскрывается с сохранением содержимого', () => {
    const surplus = new Map([['q', 1], ['/q', 1]]);
    const out = stripSurplusTags('Ответ: <q>жизнь хороша</q>, и это так.', surplus);
    expect(out).toBe('Ответ: жизнь хороша, и это так.');
    expect(surplus.size).toBe(0);
  });

  test('одиночный тег (instagram без закрывающего)', () => {
    const surplus = new Map([['instagram', 1]]);
    expect(stripSurplusTags('Смотри <instagram> тут', surplus)).toBe('Смотри  тут');
  });

  test('срезает не больше лимита', () => {
    const surplus = new Map([['b', 1], ['/b', 1]]);
    const out = stripSurplusTags('<b>раз</b> и <b>два</b>', surplus);
    expect(out).toBe('раз и <b>два</b>');
  });

  test('атрибуты обёртки тоже срезаются', () => {
    const surplus = new Map([['q', 1], ['/q', 1]]);
    expect(stripSurplusTags("<q author='X'>Цитата</q>", surplus)).toBe('Цитата');
  });
});

describe('reconcileTags', () => {
  const ru = {
    title: 'Заголовок <b>жирный</b>',
    texts: ['Первый.', 'Цитата: <q>мысль</q>', 'Важно <important>это</important>'],
  };

  test('чистый перевод и легитимное перемещение не трогаются', () => {
    const moved = {
      title: 'Title',
      texts: ['First <q>thought</q>', 'Quote', 'Important <important>this</important>'],
    };
    const r = reconcileTags(ru, moved);
    expect(r.stripped).toEqual([]);
    expect(r.data).toBe(moved); // объект не заменялся
  });

  test('выдуманный тег срезается, содержимое остаётся', () => {
    const invented = {
      title: '<b>Fett</b> Titel',
      texts: ['Erster.', 'Zitat: <q>Gedanke</q>', 'Wichtig <important>das</important>', 'Start <q>inkl</q>'],
    };
    const r = reconcileTags(ru, invented);
    expect(r.data.texts[3]).toBe('Start inkl');
    expect(r.stripped).toEqual([{ path: '/texts/3', tag: '<q>', count: 1 }, { path: '/texts/3', tag: '</q>', count: 1 }]);
    expect(reconcileTags(ru, r.data).stripped).toEqual([]); // идемпотентно
  });

  test('перемещение + выдуманный тег одного типа: срезается ровно избыток', () => {
    // q переехал из texts/1 в texts/0 (пул не меняется) + один q выдуман в title.
    // Какой из двух пар срезать механически неразличимо — гарантируется пул.
    const mixed = {
      title: 'Titel <b>fett</b> <q>лишний</q>',
      texts: ['Erster <q>Gedanke</q>', 'Zitat', 'Wichtig <important>das</important>'],
    };
    const r = reconcileTags(ru, mixed);
    const pool = (o: any): string[] =>
      Object.values(o).flatMap((v: any) =>
        typeof v === 'string' ? tagSignatures(v) : pool(v),
      ) as string[];
    expect(pool(r.data).sort()).toEqual(pool(ru).sort()); // инвариант пула
    expect(r.stripped).toHaveLength(2); // срезана одна пара <q></q>
    expect(reconcileTags(ru, r.data).stripped).toEqual([]); // идемпотентно
  });

  test('потеря тега не восстанавливается механически (ловит валидация)', () => {
    const lost = { title: 'Titel', texts: ['Erster.', 'Zitat', 'Wichtig <important>das</important>'] };
    const r = reconcileTags(ru, lost);
    expect(r.stripped).toEqual([]);
    expect(r.data).toEqual(lost);
  });

  test('вход не мутируется', () => {
    const invented = {
      title: '<b>Fett</b>',
      texts: ['A <q>x</q>', 'B', 'C'],
    };
    const snapshot = JSON.stringify(invented);
    reconcileTags(ru, invented);
    expect(JSON.stringify(invented)).toBe(snapshot);
  });
});

describe('stripInstagramAttributes — пустой тег вне ru/en', () => {
  test('атрибуты срезаются в обычной локали, вложенность любая', () => {
    const data = {
      texts: ['Смотри <instagram ids="1,2,3"> тут', ['вложенный <instagram ids="9">']],
      meta: { deep: '<instagram ids="5">' },
    };
    expect(stripInstagramAttributes(data, 'de')).toBe(3);
    expect(data.texts[0]).toBe('Смотри <instagram> тут');
    expect(data.texts[1][0]).toBe('вложенный <instagram>');
    expect(data.meta.deep).toBe('<instagram>');
  });

  test('ru и en — исключения: атрибуты сохраняются', () => {
    const data = { s: '<instagram ids="1,2">' };
    expect(stripInstagramAttributes(data, 'ru')).toBe(0);
    expect(stripInstagramAttributes(data, 'en')).toBe(0);
    expect(stripInstagramAttributes(data, 'EN')).toBe(0); // регистр не важен
    expect(data.s).toBe('<instagram ids="1,2">');
  });

  test('уже пустой тег не считается изменением', () => {
    const data = { s: 'текст <instagram> конец' };
    expect(stripInstagramAttributes(data, 'fr')).toBe(0);
  });
});

describe('normalizeTagQuotes — кавычки атрибутов к двойным', () => {
  test('одинарные кавычки заменяются, двойные и текст не трогаются', () => {
    const data: any = {
      a: "<q author='Элизабет Гилберт'>текст</q>",
      b: '<q author="Карл Роджерс">текст</q>',
      c: "Он сказал: 'привет' — и ушёл.",
      d: ['<activitylink id=\'DzseWuFv2t\'>'],
    };
    const changed = normalizeTagQuotes(data);
    expect(changed).toBe(2);
    expect(data.a).toBe('<q author="Элизабет Гилберт">текст</q>');
    expect(data.b).toBe('<q author="Карл Роджерс">текст</q>');
    expect(data.c).toBe("Он сказал: 'привет' — и ушёл.");
    expect(data.d[0]).toBe('<activitylink id="DzseWuFv2t">');
  });
});
