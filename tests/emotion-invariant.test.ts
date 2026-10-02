import { describe, test, expect } from 'bun:test';
import {
  parseEmotionConstants,
  findEmotionCollisions,
  buildEmotionRepairPayload,
  mergeEmotionRepairs,
  parseEmotionPathMap,
  type EmotionCatalog,
} from '../scripts/lib/emotion-invariant.js';
import type { StageClient, StageRequest } from '../scripts/lib/pipeline.js';

/**
 * Инвариант экрана эмоций (инцидент es-2026: коллегия, судящая ключи
 * изолированно, свела joy/delight к «Alegría», а excitement перевела
 * «Agitación» — негатив в позитивном списке). Детект обязан ловить
 * совпадения без регистра; ремонт — применять только правки, после
 * которых набор остаётся попарно различным.
 */

const DART_SAMPLE = `
List<String> emotionsNegative = <String>[
  'sad',
  'sorrow',
  'excitement_typo_unused',
];

List<String> emotionsPositive = <String>[
  'joy',
  'delight',
];
`;

const CATALOG: EmotionCatalog = parseEmotionConstants(DART_SAMPLE);

function catalogOf(negative: string[], positive: string[]): EmotionCatalog {
  return { negative, positive };
}

describe('parseEmotionConstants — каталог из constants.dart', () => {
  test('оба списка извлекаются в порядке объявления', () => {
    expect(CATALOG.negative).toEqual(['sad', 'sorrow', 'excitement_typo_unused']);
    expect(CATALOG.positive).toEqual(['joy', 'delight']);
  });

  test('нет списков — пустой каталог (не падает)', () => {
    expect(parseEmotionConstants("void main() {}")).toEqual({ negative: [], positive: [] });
  });
});

describe('findEmotionCollisions — механический детект', () => {
  test('два ключа с одним значением — группа (порядок каталога)', () => {
    const groups = findEmotionCollisions(CATALOG, {
      sad: 'Pesadumbre',
      sorrow: 'Pesadumbre',
      joy: 'Alegría',
      delight: 'Deleite',
    });
    expect(groups).toHaveLength(1);
    expect(groups[0]!.keys).toEqual(['sad', 'sorrow']);
  });

  test('регистр и пробелы неразличимы: Terror vs terror — коллизия', () => {
    const cat = catalogOf(['horror'], ['hope']);
    const groups = findEmotionCollisions(cat, { horror: 'Terror', hope: '  terror ' });
    expect(groups).toHaveLength(1);
    expect(groups[0]!.keys).toEqual(['horror', 'hope']);
  });

  test('чистый набор и пустые/чужие ключи — без групп', () => {
    expect(
      findEmotionCollisions(CATALOG, {
        sad: 'Tristeza',
        sorrow: 'Pesar',
        joy: 'Alegría',
        delight: 'Deleite',
        other_key: 'Alegría', // вне каталога — не считается
      }),
    ).toEqual([]);
    expect(findEmotionCollisions(CATALOG, {})).toEqual([]);
  });
});

describe('buildEmotionRepairPayload — полный набор в запросе', () => {
  test('ru, полярность и текущие значения рядом; коллизии перечислены', () => {
    const values = { sad: 'X', sorrow: 'X', joy: 'Alegría', delight: 'Alegría' };
    const payload = buildEmotionRepairPayload('es', CATALOG, { sad: 'Печаль', sorrow: 'Сожаление', joy: 'Радость', delight: 'Восторг' }, values);
    expect(payload.targetLocale).toBe('es');
    expect(payload.emotions.map((e) => e.key)).toEqual(['sad', 'sorrow', 'joy', 'delight']);
    expect(payload.emotions.find((e) => e.key === 'joy')!.polarity).toBe('positive');
    expect(payload.emotions.find((e) => e.key === 'sad')!.polarity).toBe('negative');
    expect(payload.emotions.find((e) => e.key === 'joy')!.ru).toBe('Радость');
    expect(payload.collisions).toHaveLength(2);
  });

  test('непереведённые ключи в набор не идут', () => {
    const payload = buildEmotionRepairPayload('es', CATALOG, {}, { joy: 'Alegría' });
    expect(payload.emotions.map((e) => e.key)).toEqual(['joy']);
    expect(payload.collisions).toEqual([]);
  });

  test('отклонения оператора попадают в payload (петля обратной связи)', () => {
    const payload = buildEmotionRepairPayload(
      'es',
      CATALOG,
      { joy: 'Радость', excitement: 'Волнение' },
      { joy: 'Alegría', excitement: 'Agitación' },
      [{ key: 'excitement', value: 'Agitación', reasons: ['негатив в позитивном списке'] }],
    );
    expect(payload.rejected).toEqual([
      { key: 'excitement', value: 'Agitación', reasons: ['негатив в позитивном списке'] },
    ]);
  });
});

describe('parseEmotionPathMap — ответ модели', () => {
  test('голый ключ и /ключ равнозначны', () => {
    const map = parseEmotionPathMap({ paths: { joy: 'A', '/delight': 'B' } });
    expect(map).toEqual({ joy: 'A', delight: 'B' });
  });

  test('не-объект, отсутствие paths, массивы — null', () => {
    expect(parseEmotionPathMap(null)).toBeNull();
    expect(parseEmotionPathMap({ nope: 1 })).toBeNull();
    expect(parseEmotionPathMap({ paths: ['a'] })).toBeNull();
  });
});

describe('mergeEmotionRepairs — пер-ключевое слияние с инвариантом', () => {
  const cat = catalogOf(['sad', 'sorrow', 'shame'], ['joy', 'delight']);

  test('разведение пары применяется, no-op пропускается', () => {
    const current = { sad: 'Pesar', sorrow: 'Pesar', joy: 'Alegría', delight: 'Regocijo' };
    const { applied, rejected } = mergeEmotionRepairs(cat, current, {
      sorrow: 'Arrepentimiento',
      joy: 'Alegría', // модель вернула текущее — не правка
    });
    expect(applied).toEqual([{ key: 'sorrow', from: 'Pesar', to: 'Arrepentimiento' }]);
    expect(rejected).toEqual([]);
  });

  test('кандидат в занятое слово (без регистра) отбраковывается', () => {
    const current = { sad: 'Tristeza', sorrow: 'Pesar', joy: 'Alegría', delight: 'Deleite' };
    const { applied, rejected } = mergeEmotionRepairs(cat, current, {
      sorrow: 'alegría', // столкнётся с joy
    });
    expect(applied).toEqual([]);
    expect(rejected).toHaveLength(1);
    expect(rejected[0]!.reasons[0]).toContain('joy');
  });

  test('пустое/многострочное/длинное значение отбраковывается', () => {
    const current = { sad: 'A', sorrow: 'A', joy: 'B', delight: 'C' };
    const { rejected } = mergeEmotionRepairs(cat, current, {
      sad: '  ',
      sorrow: 'две\nстроки',
      joy: 'очень длинное значение эмоции явно длиннее лейбла чипа приложения',
    });
    expect(rejected.map((r) => r.key).sort()).toEqual(['joy', 'sad', 'sorrow']);
  });

  test('ключ вне каталога игнорируется', () => {
    const { applied, rejected } = mergeEmotionRepairs(cat, {}, { unknown_key: 'X' });
    expect(applied).toEqual([]);
    expect(rejected).toEqual([]);
  });

  test('две кандидатуры в одно слово: применяется первая по каталогу, вторая — отбраковка', () => {
    const current = { sad: 'Tristeza', sorrow: 'Pesar', joy: 'Alegría', delight: 'Regocijo' };
    const { applied, rejected } = mergeEmotionRepairs(cat, current, {
      sorrow: 'Nuevo',
      delight: 'nuevo',
    });
    expect(applied.map((e) => e.key)).toEqual(['sorrow']);
    expect(rejected.map((r) => r.key)).toEqual(['delight']);
  });
});

describe('интеграция детекта и слияния — сценарий es-инцидента', () => {
  test('разведение joy/delight + правка полярности excitement-класса', () => {
    const cat = catalogOf(['nervousness', 'agitation_like'], ['joy', 'delight', 'excitement']);
    // Эмуляция живого arb: Alegría x2, а excitement получил негативное слово
    const current = {
      nervousness: 'Nerviosismo',
      agitation_like: 'Agitación',
      joy: 'Alegría',
      delight: 'Alegría',
      excitement: 'Inquietud',
    };
    const candidates = { delight: 'Deleite', excitement: 'Emoción' };
    const { applied } = mergeEmotionRepairs(cat, current, candidates);
    expect(applied.map((e) => e.key).sort()).toEqual(['delight', 'excitement']);
    const merged = { ...current };
    for (const e of applied) merged[e.key] = e.to;
    expect(findEmotionCollisions(cat, merged)).toEqual([]);
  });
});

describe('StageClient-контракт модуля (типы)', () => {
  test('модуль не требует от клиента ничего сверх complete', () => {
    const client: StageClient = {
      name: 'fake',
      async complete(_req: StageRequest) {
        return '{"paths":{}}';
      },
    };
    expect(typeof client.complete).toBe('function');
  });
});
