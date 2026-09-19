import { describe, test, expect } from 'bun:test';
import {
  validateTranslation,
  extractPlaceholderNames,
  extractTagSignatures,
  stripIcuConstructs,
  invalidPlaceholderTokens,
} from '../scripts/lib/validation.js';
import { flattenLeaves } from '../scripts/lib/tree.js';

const ok = {
  title: 'Заголовок',
  tag: 'Жирный <b>текст</b> и <important>важно</important>',
  quote: "<q author='Rebecca'>Мысль</q>",
  instagram: 'Смотри <instagram> тут',
  days: 'Через {days} дней',
};

const okJa = { s: 'こんにちは世界' };

describe('validateTranslation — позитивные сценарии', () => {
  test('корректный перевод без замечаний', () => {
    const translated = {
      title: 'Title',
      tag: 'Bold <b>text</b> and <important>important</important>',
      quote: "<q author='Rebecca'>Thought</q>",
      instagram: 'See <instagram> here',
      days: 'In {days} days',
    };
    const issues = validateTranslation('en', flattenLeaves(ok), translated);
    expect(issues).toEqual([]);
  });

  test('японский текст против японской локали — норма', () => {
    expect(validateTranslation('ja', flattenLeaves(okJa), { s: '世界こんにちは' })).toEqual([]);
  });

  test('instagram теряет атрибуты по конвенции — это норма', () => {
    const ru = { s: 'Раз <instagram ids="1,2,3"> два' };
    const tr = { s: 'One <instagram> two' };
    expect(validateTranslation('en', flattenLeaves(ru), tr)).toEqual([]);
  });

  test('q локализует имя автора в атрибуте — это норма', () => {
    const ru = { s: '<q author="Ребекка Уокер">Цитата</q>' };
    const tr = { s: "<q author='Rebecca Walker'>Quote</q>" };
    expect(validateTranslation('en', flattenLeaves(ru), tr)).toEqual([]);
  });

  test('ICU plural: язык может сократить категории (ja — только other)', () => {
    const ru = { s: '{count, plural, =1{1 день} few{{count} дня} other{{count} дней}}' };
    const ja = { s: '{count, plural, other{{count}日}}' };
    expect(validateTranslation('ja', flattenLeaves(ru), ja)).toEqual([]);
  });

  test('легитимный повтор оригинала в переводе — не дубликат', () => {
    const phrase = 'Одна и та же длинная фраза повторяется в оригинале.';
    const trPhrase = 'Derselbe lange Satz wiederholt sich in der Übersetzung.';
    const ru = flattenLeaves({ texts: [phrase, phrase] });
    expect(validateTranslation('de', ru, { texts: [trPhrase, trPhrase] })).toEqual([]);
  });
});

describe('validateTranslation — негативные сценарии', () => {
  const ru = flattenLeaves({
    a: 'Один {days} <b>жирный</b>',
    b: '<important>важно</important> конец',
  });

  test('потеря ключей и лишние ключи', () => {
    const issues = validateTranslation('en', ru, { a: 'One {days} <b>bold</b>' });
    expect(issues.some((i) => i.message.includes('потеряны ключи'))).toBe(true);
    const issues2 = validateTranslation('en', ru, {
      a: 'One {days} <b>bold</b>',
      b: 'End <important>important</important>',
      extra: 'лишний',
    });
    expect(issues2.some((i) => i.message.includes('лишние ключи'))).toBe(true);
  });

  test('потерянный плейсхолдер', () => {
    const issues = validateTranslation('en', ru, {
      a: 'One days <b>bold</b>',
      b: 'End <important>important</important>',
    });
    expect(issues.some((i) => i.path === 'a' && i.message.includes('плейсхолдеры'))).toBe(true);
  });

  test('лишний плейсхолдер тоже ошибка', () => {
    const issues = validateTranslation('en', ru, {
      a: 'One {days} {count} <b>bold</b>',
      b: 'End <important>important</important>',
    });
    expect(issues.some((i) => i.path === 'a' && i.message.includes('лишние'))).toBe(true);
  });

  test('тег может сместиться в соседний элемент (файловый уровень)', () => {
    const src = flattenLeaves({ a: 'Начало <b>жирного</b> текста', b: 'Конец' });
    const moved = validateTranslation('en', src, { a: 'Start of the text', b: '<b>Bold</b> end' });
    expect(moved).toEqual([]);
  });

  test('потерянный и незакрытый тег (файловый уровень)', () => {
    const lost = validateTranslation('en', ru, {
      a: 'One {days} bold',
      b: 'End <important>important</important>',
    });
    expect(lost.some((i) => i.path === '(файл)' && i.message.includes('теги'))).toBe(true);

    const unbalanced = validateTranslation('en', ru, {
      a: 'One {days} <b>bold',
      b: 'End <important>important</important>',
    });
    expect(unbalanced.some((i) => i.path === '(файл)' && i.message.includes('</b'))).toBe(true);

    const invented = validateTranslation('en', ru, {
      a: 'One {days} <b>bold</b> <q>цитата</q>',
      b: 'End <important>important</important>',
    });
    expect(invented.some((i) => i.path === '(файл)' && i.message.includes('<q>'))).toBe(true);
  });

  test('пустое значение', () => {
    const issues = validateTranslation('en', ru, {
      a: 'One {days} <b>bold</b>',
      b: '   ',
    });
    expect(issues.some((i) => i.path === 'b' && i.message.includes('пустое'))).toBe(true);
  });

  test('чужой алфавит: кириллица в английском и в японском', () => {
    const src = flattenLeaves({ s: 'Текст' });
    const cyrillic = validateTranslation('en', src, { s: 'Текст' });
    expect(cyrillic.some((i) => i.message.includes('чужие символы'))).toBe(true);

    const jaSrc = flattenLeaves({ s: '日本語のテキスト' });
    const cyrInJa = validateTranslation('ja', jaSrc, { s: 'Японский текст' });
    expect(cyrInJa.some((i) => i.message.includes('чужие символы'))).toBe(true);
  });

  test('крючок: разные оригиналы схлопнулись в одинаковый перевод', () => {
    const ru = flattenLeaves({
      texts: [
        'Первый абзац о психологическом благополучии в мире стресса.',
        'Второй абзац о практических упражнениях на каждый день.',
      ],
    });
    const tr = {
      texts: [
        'Zweiter Absatz über praktische Übungen für jeden Tag.',
        'Zweiter Absatz über praktische Übungen für jeden Tag.', // texts/0 := texts/1
      ],
    };
    const issues = validateTranslation('de', ru, tr);
    expect(issues.some((i) => i.path === '(файл)' && i.message.includes('дубль'))).toBe(true);
  });

  test('крючок с тегом: дубль цитаты без <q> ловится после срезания тегов', () => {
    const ru = flattenLeaves({
      texts: [
        'Длинное первое предложение о психотерапии и самопомощи.',
        '<q author="Ребекка Уокер">Длинная цитата о мыслях и восприятии мира.</q>',
      ],
    });
    const tr = {
      texts: [
        'Lange Zitat über Gedanken und die Wahrnehmung der Welt.', // цитата без тега
        "<q author='Rebecca Walker'>Lange Zitat über Gedanken und die Wahrnehmung der Welt.</q>",
      ],
    };
    const issues = validateTranslation('de', ru, tr);
    expect(issues.some((i) => i.message.includes('дубль'))).toBe(true);
  });

  test('короткие одинаковые строки (лейблы) не флагуются', () => {
    const ru = flattenLeaves({ a: 'Дальше', b: 'Другое место' });
    expect(validateTranslation('en', ru, { a: 'Next', b: 'Next' })).toEqual([]);
  });

  test('ё/е — одна буква: орфографические варианты оригинала дают легитимный дубль', () => {
    const ru = flattenLeaves({
      a: 'Обостренное депрессивное состояние', // bdi range/exacerbated
      b: 'Обострённое депрессивное состояние', // bdi result/exacerbated/title
    });
    const same = 'Verschlimmerte depressive Symptomatik mit erheblicher Beeinträchtigung des Alltags.';
    expect(validateTranslation('de', ru, { a: same, b: same })).toEqual([]);
  });
});

describe('извлечения', () => {
  test('extractPlaceholderNames: простые и ICU', () => {
    expect(extractPlaceholderNames('Через {days} дней, {count}')).toEqual(['days', 'count']);
    // ICU-конструкция ушла из плейсхолдеров: её имя сверяет extractIcuConstructs
    expect(extractPlaceholderNames('{count, plural, other {#}}')).toEqual([]);
    expect(extractPlaceholderNames('без плейсхолдеров')).toEqual([]);
  });

  test('extractTagSignatures: имя+открыв/закрыв, регистр нормализован', () => {
    expect(extractTagSignatures('<b>x</b>')).toEqual(['b', '/b']);
    expect(extractTagSignatures("<Q author='X'>y</q>")).toEqual(['q', '/q']);
    expect(extractTagSignatures('нет тегов')).toEqual([]);
  });
});

describe('extractPlaceholderNames — ICU-конструкции (латиница)', () => {
  const deIcu = 'Rückgang um {count} {count, plural, one{Punkt} other{Punkte}}';
  const ruIcu = 'Снижение на {count} {count, plural, one{пункт} few{пункта} many{пунктов} other{пункта}}';

  test('слова внутри категорий не считаются плейсхолдерами (регресс полного прогона de)', () => {
    expect(extractPlaceholderNames(deIcu)).toEqual(['count']);
    expect(extractPlaceholderNames(ruIcu)).toEqual(['count']);
  });

  test('обычные плейсхолдеры рядом с ICU сохраняются', () => {
    expect(extractPlaceholderNames('{days} {days, plural, one{Tag} other{Tage}}')).toEqual(['days']);
    expect(extractPlaceholderNames('Von {name} und {count, plural, one{{count} Tag} other{{count} Tagen}}')).toEqual(['name']);
  });

  test('stripIcuConstructs убирает конструкцию целиком, текст вне — остаётся', () => {
    expect(stripIcuConstructs('A {count, plural, one{X{y}} other{Z}} B')).toBe('A  B');
    expect(stripIcuConstructs('нет ICU')).toBe('нет ICU');
  });
});

describe('невалидные токены и несущие пробелы', () => {
  test('invalidPlaceholderTokens: {:.0f} и мусор — ловится, ICU и {name} — нет', () => {
    expect(invalidPlaceholderTokens('um {count} {count, plural, one{Punkt} other{Punkte}}')).toEqual([]);
    expect(invalidPlaceholderTokens('um {:.0f} % verbessert')).toEqual(['{:.0f}']);
    expect(invalidPlaceholderTokens('a {1} b {count } c')).toEqual(['{1}', '{count }']);
  });

  test('валидация: краевые пробелы обязаны совпадать с оригиналом (RichText-склейка)', () => {
    const ru = { k: 'улучшилось на ' };
    expect(validateTranslation('de', ru, { k: 'verbessert um ' })).toEqual([]);
    const issues = validateTranslation('de', ru, { k: 'verbessert um' });
    expect(issues.length).toBe(1);
    expect(issues[0]!.message).toContain('несущие пробелы');
  });

  test('валидация: {:.0f} ловится как невалидный токен', () => {
    const issues = validateTranslation('de', { k: 'улучшилось' }, { k: 'um {:.0f} % verbessert' });
    expect(issues.some((i) => i.message.includes('невалидные плейсхолдер-токены'))).toBe(true);
  });
});

describe('validateTranslation — instagram у независимых локалей', () => {
  test('en: тег удалён из середины массива — хвост не даёт фантомных потерь', () => {
    const ru = { '/texts/0': 'Один', '/texts/1': '<instagram ids="111">', '/texts/2': 'Два' };
    const en = { texts: ['One', 'Two'] };
    expect(validateTranslation('en', ru, en)).toEqual([]);
  });

  test('en: свой тег, которого нет в ru — не «лишний ключ»', () => {
    const ru = { '/texts/0': 'Один' };
    const en = { texts: ['One', '<instagram ids="999">'] };
    expect(validateTranslation('en', ru, en)).toEqual([]);
  });

  test('не-ru локаль по-прежнему требует паритета тегов', () => {
    const ru = { '/texts/0': 'Один', '/texts/1': '<instagram ids="111">' };
    const de = { texts: ['Eins'] };
    const issues = validateTranslation('de', ru, de);
    expect(issues.length).toBeGreaterThan(0);
  });
});
