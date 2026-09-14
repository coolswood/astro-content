import { describe, test, expect } from 'bun:test';
import { withMediaFallback } from '../src/lib/storyCards.js';

describe('withMediaFallback — выдача stories-эндпоинта', () => {
  test('ru: video из исходника сохраняется, отсутствующий достраивается', () => {
    const cards = [
      { subtitle: 'а', img: 'старый', video: 'activity/ru/v1.mp4' },
      { subtitle: 'б', img: 'старый' },
    ];
    const out = withMediaFallback(cards, 'ru', 'activity');
    expect(out[0].video).toBe('activity/ru/v1.mp4');
    expect(out[1].video).toBe('activity/ru/v2.mp4');
    expect(out[0].img).toBe('activity/ru/s1.png');
  });

  test('не-ru: видео нет ни при каком исходнике, img — английский', () => {
    const cards = [
      { subtitle: 'a', img: 'x', video: 'activity/ru/v1.mp4' },
      { subtitle: 'b', img: 'y' },
    ];
    const out = withMediaFallback(cards, 'de', 'activity');
    expect('video' in out[0]).toBe(false);
    expect('video' in out[1]).toBe(false);
    expect(out[0].img).toBe('activity/en/s1.png');
  });

  test('регресс из ревью: ru-история вне фолбэк-списка не теряет явное видео', () => {
    // Новая история не в VIDEO_FALLBACK_STORIES: фолбэк не инъектируется,
    // но явный video из исходника проходит как есть (а не вырезается).
    const cards = [{ subtitle: 'а', img: 'x', video: 'breathing/ru/v1.mp4' }];
    const out = withMediaFallback(cards, 'ru', 'breathing');
    expect(out[0].video).toBe('breathing/ru/v1.mp4');
  });

  test('не-ru история вне фолбэк-списка — видео срезается по правилу локали', () => {
    const cards = [{ subtitle: 'a', img: 'x', video: 'breathing/ru/v1.mp4' }];
    expect('video' in withMediaFallback(cards, 'ja', 'breathing')[0]).toBe(false);
  });

  test('intermediate: у ru без явного видео фолбэк не инъектируется', () => {
    const out = withMediaFallback([{ subtitle: 'а', img: 'x' }], 'ru', 'intermediate');
    expect('video' in out[0]).toBe(false);
  });
});
