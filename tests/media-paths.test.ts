import { describe, test, expect } from 'bun:test';
import {
  expectedMediaPath,
  isMediaPath,
  mediaLocaleFor,
  restoreMediaPaths,
} from '../scripts/lib/media-paths.js';
import { validateTranslation } from '../scripts/lib/validation.js';
import { flattenLeaves } from '../scripts/lib/tree.js';

describe('mediaLocaleFor', () => {
  test('ru остаётся на ru-медиа, остальные — на en', () => {
    expect(mediaLocaleFor('ru')).toBe('ru');
    expect(mediaLocaleFor('en')).toBe('en');
    expect(mediaLocaleFor('de')).toBe('en');
    expect(mediaLocaleFor('pt_BR')).toBe('en');
    expect(mediaLocaleFor('pt_br')).toBe('en');
  });
});

describe('isMediaPath', () => {
  test('распознаёт пути к картинкам и видео', () => {
    expect(isMediaPath('activity/ru/s1.png')).toBe(true);
    expect(isMediaPath('diary/en/v2.mp4')).toBe(true);
    expect(isMediaPath('audio/story/ru/start.m4a')).toBe(true);
    expect(isMediaPath('intermediate/en/s10.webp')).toBe(true);
  });

  test('не путает текст и не-медиа строки', () => {
    expect(isMediaPath('Смотрите изображение activity/ru/s1.png в приложении')).toBe(false);
    expect(isMediaPath('images/banner')).toBe(false);
    expect(isMediaPath('')).toBe(false);
    expect(isMediaPath(42)).toBe(false);
    // путь без языкового сегмента — всё равно медиа-путь: не переводится
    expect(isMediaPath('images/diary/banner.png')).toBe(true);
  });
});

describe('expectedMediaPath', () => {
  test('ru → en для всех, кроме ru', () => {
    expect(expectedMediaPath('activity/ru/s1.png', 'de')).toBe('activity/en/s1.png');
    expect(expectedMediaPath('activity/ru/s1.png', 'en')).toBe('activity/en/s1.png');
    expect(expectedMediaPath('activity/ru/s1.png', 'ru')).toBe('activity/ru/s1.png');
    expect(expectedMediaPath('diary/ru/v3.mp4', 'pt_BR')).toBe('diary/en/v3.mp4');
  });

  test('уже корректный en-путь не меняется', () => {
    expect(expectedMediaPath('coping/en/s2.png', 'ja')).toBe('coping/en/s2.png');
  });

  test('путь без языкового сегмента возвращается как есть', () => {
    expect(expectedMediaPath('images/diary/banner.png', 'de')).toBe('images/diary/banner.png');
  });
});

describe('restoreMediaPaths', () => {
  const ruLeaves = flattenLeaves({
    activity: [{ subtitle: 'Текст', img: 'activity/ru/s1.png', video: 'activity/ru/v1.mp4' }],
  });

  test('чинит «переведённые» имена файлов в дереве ответа модели', () => {
    const result = {
      activity: [{ subtitle: 'Text', img: 'activity/de/bild1.png', video: 'activity/en/v1.mp4' }],
    };
    const fixed = restoreMediaPaths('de', ruLeaves, result);
    expect(fixed).toEqual(['activity/0/img']);
    expect(result.activity[0].img).toBe('activity/en/s1.png');
    expect(result.activity[0].video).toBe('activity/en/v1.mp4'); // уже верный — не тронут
  });

  test('для ru восстанавливает исходный путь', () => {
    const result = { activity: [{ img: 'activity/en/s1.png' }] };
    restoreMediaPaths('ru', flattenLeaves({ activity: [{ img: 'activity/ru/s1.png' }] }), result);
    expect(result.activity[0].img).toBe('activity/ru/s1.png');
  });

  test('работает с плоской картой (path-map формат main)', () => {
    const result = { 'activity/0/img': 'activity/ru/s1.png', 'activity/0/video': 'activity/en/v1.mp4' };
    const fixed = restoreMediaPaths('de', ruLeaves, result);
    expect(fixed).toEqual(['activity/0/img']);
    expect(result['activity/0/img']).toBe('activity/en/s1.png');
    expect(result['activity/0/video']).toBe('activity/en/v1.mp4');
  });
});

describe('validateTranslation — медиа-пути', () => {
  test('верный en-путь в переводе — нормы', () => {
    const ru = { img: 'activity/ru/s1.png', subtitle: 'Текст' };
    const tr = { img: 'activity/en/s1.png', subtitle: 'Text' };
    expect(validateTranslation('de', flattenLeaves(ru), tr)).toEqual([]);
  });

  test('ru-путь в не-русском переводе — ошибка (случай de из prod)', () => {
    const ru = { img: 'activity/ru/s1.png' };
    const tr = { img: 'activity/ru/s1.png' };
    const issues = validateTranslation('de', flattenLeaves(ru), tr);
    expect(issues.length).toBe(1);
    expect(issues[0].message).toContain('activity/en/s1.png');
  });

  test('переведённое имя файла — ошибка', () => {
    const ru = { img: 'activity/ru/s1.png' };
    const tr = { img: 'activity/en/bild1.png' };
    expect(validateTranslation('ja', flattenLeaves(ru), tr).length).toBe(1);
  });

  test('для ru верен только ru-путь', () => {
    const ru = { img: 'activity/ru/s1.png' };
    expect(validateTranslation('ru', flattenLeaves(ru), { img: 'activity/ru/s1.png' })).toEqual([]);
    expect(validateTranslation('ru', flattenLeaves(ru), { img: 'activity/en/s1.png' }).length).toBe(1);
  });
});
