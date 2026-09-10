import { describe, test, expect } from 'bun:test';
import { mkdtemp } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { TranslationState, hashLeaf } from '../scripts/lib/state.js';
import { analyzeTree, keysToTranslate } from '../scripts/lib/analyze.js';

const ru = {
  title: 'Заголовок',
  body: 'Текст',
  screen: { texts: ['один', 'два'] },
};
const ruLeaves = {
  '/title': 'Заголовок',
  '/body': 'Текст',
  '/screen/texts/0': 'один',
  '/screen/texts/1': 'два',
};

describe('TranslationState', () => {
  test('первый прогон инициализирует scope текущим ru (лечим мёртвые зоны)', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'tstate-'));
    const file = join(dir, 'state.json');
    const s1 = await TranslationState.load(file);
    const scope = s1.ensureScope('content:x.json', ruLeaves);
    expect(Object.keys(scope)).toHaveLength(4);
    await s1.save();

    // Второй запуск читает с диска — базлайн тот же, изменений нет.
    const s2 = await TranslationState.load(file);
    const scope2 = s2.ensureScope('content:x.json', ruLeaves);
    expect(scope2).toEqual(scope);
    expect(analyzeTree(ruLeaves, ruLeaves, scope2).changed).toEqual([]);
  });

  test('изменение ru-значения детектится; откат — снова актуально', async () => {
    const s = await TranslationState.load('/nonexistent/state.json');
    const scope = s.ensureScope('x', ruLeaves);
    const edited = { ...ruLeaves, '/body': 'Текст (правка)' };

    const a = analyzeTree(ruLeaves, ruLeaves, scope);
    expect(a.changed).toEqual([]);
    const a2 = analyzeTree(edited, ruLeaves, scope);
    expect(a2.changed).toEqual(['/body']);

    // После перевода и фиксации (state хранит хэш переведённого ru-значения,
    // как в раннере: markTranslated(scope, sentLeaves)) — снова актуально.
    s.markTranslated(scope, { '/body': 'Текст (правка)' });
    const a3 = analyzeTree(edited, ruLeaves, scope);
    expect(a3.changed).toEqual([]);
  });

  test('ключ в target без записи в state считается изменённым', async () => {
    const s = await TranslationState.load('/nonexistent/state.json');
    const scope = s.ensureScope('x', ruLeaves);
    // Ручная правка: в target появился новый ключ, которого нет в state.
    const target = { ...ruLeaves, '/new/manual': 'ручной перевод' };
    // /new/manual нет в ru — это dead, а не changed; добавим его и в ru:
    const ru2 = { ...ruLeaves, '/new/manual': 'новый ру' };
    const a = analyzeTree(ru2, target, scope);
    expect(a.changed).toContain('/new/manual');
  });

  test('pruneScope удаляет мёртвые записи и не трогает живые', async () => {
    const s = await TranslationState.load('/nonexistent/state.json');
    const scope = s.ensureScope('x', ruLeaves);
    scope['/dead/key'] = '0'.repeat(40);
    const removed = s.pruneScope(scope, new Set(Object.keys(ruLeaves)));
    expect(removed).toBe(1);
    expect(scope['/dead/key']).toBeUndefined();
    expect(scope['/title']).toBe(hashLeaf('Заголовок'));
  });

  test('save пишет атомарный валидный JSON', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'tstate-'));
    const file = join(dir, 'nested', 'state.json');
    const s = await TranslationState.load(file);
    s.ensureScope('ui', ruLeaves);
    await s.save();
    const s2 = await TranslationState.load(file);
    expect(Object.keys(s2.ensureScope('ui', ruLeaves))).toHaveLength(4);
  });
});

describe('analyzeTree', () => {
  const scope: Record<string, string> = {};
  for (const [p, v] of Object.entries(ruLeaves)) scope[p] = hashLeaf(v);

  test('missing/dead по плоским путям (объекты и массивы)', () => {
    const target = {
      '/title': 'Title',
      '/screen/texts/0': 'one',
      '/gone': 'old',
    };
    const a = analyzeTree(ruLeaves, target, scope);
    expect(a.missing.sort()).toEqual(['/body', '/screen/texts/1'].sort());
    expect(a.dead).toEqual(['/gone']);
    expect(a.changed).toEqual([]);
  });

  test('retranslateChanged=false отключает детект изменений', () => {
    const edited = { ...ruLeaves, '/title': 'Новый заголовок' };
    const a = analyzeTree(edited, ruLeaves, scope, { retranslateChanged: false });
    expect(a.changed).toEqual([]);
    const b = analyzeTree(edited, ruLeaves, scope);
    expect(b.changed).toEqual(['/title']);
  });

  test('keysToTranslate: объединение missing+changed в порядке ru; full — все', () => {
    const target = { '/body': 'Body', '/screen/texts/1': 'two' };
    const a = analyzeTree(ruLeaves, target, scope);
    const todo = keysToTranslate(a, false, Object.keys(ruLeaves));
    expect(todo).toEqual(['/title', '/screen/texts/0']);
    expect(keysToTranslate(a, true, Object.keys(ruLeaves))).toEqual(Object.keys(ruLeaves));
  });
});
