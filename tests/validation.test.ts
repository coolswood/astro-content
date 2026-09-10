import { describe, test, expect } from 'bun:test';
import {
  validateTranslation,
  extractPlaceholderNames,
  extractTagSignatures,
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
});

describe('извлечения', () => {
  test('extractPlaceholderNames: простые и ICU', () => {
    expect(extractPlaceholderNames('Через {days} дней, {count}')).toEqual(['days', 'count']);
    expect(extractPlaceholderNames('{count, plural, other {#}}')).toEqual(['count']);
    expect(extractPlaceholderNames('без плейсхолдеров')).toEqual([]);
  });

  test('extractTagSignatures: имя+открыв/закрыв, регистр нормализован', () => {
    expect(extractTagSignatures('<b>x</b>')).toEqual(['b', '/b']);
    expect(extractTagSignatures("<Q author='X'>y</q>")).toEqual(['q', '/q']);
    expect(extractTagSignatures('нет тегов')).toEqual([]);
  });
});
