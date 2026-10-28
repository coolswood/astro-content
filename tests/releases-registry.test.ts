import { describe, test, expect } from 'bun:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Реестр релизов (src/i18n/<lang>/releases.json) парсит mindhealth-server
 * (routes/base/releases.go): дубль версии = репорт «releases registry:
 * duplicate version …» в оба контура на каждый процесс сервера. Дубли сюда
 * заносили релиз-заметочные PR (ar/fr/id/ko/pl, GlitchTip #4179–#4181,
 * 28.10.2026). Тест ломает сборку до того, как дубли уедут в прод.
 */

const i18nDir = join(import.meta.dir, '..', 'src', 'i18n');

// Все каталоги языков, а не только те, где реестр уже есть: отсутствие
// releases.json у нового языка — провал теста, а не молчаливый пропуск.
const langs = readdirSync(i18nDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

/** Ошибки одной записи реестра: пустой список = запись корректна. */
function entryProblems(entry: unknown): string[] {
  if (typeof entry !== 'object' || entry === null) {
    return ['запись не объект'];
  }
  const problems: string[] = [];
  const { version, builds } = entry as Record<string, unknown>;
  if (typeof version !== 'string' || !/^\d+\.\d+\.\d+$/.test(version)) {
    problems.push('version не semver');
  }
  if (!Array.isArray(builds)) {
    problems.push('builds не массив');
  }
  return problems;
}

describe('releases registry (src/i18n/<lang>/releases.json)', () => {
  test('файл реестра существует для каждого языка', () => {
    const missing = langs.filter(
      (lang) => !existsSync(join(i18nDir, lang, 'releases.json')),
    );
    expect(missing).toEqual([]);
    expect(langs.length).toBeGreaterThanOrEqual(19);
  });

  for (const lang of langs) {
    describe(lang, () => {
      const registryPath = join(i18nDir, lang, 'releases.json');
      // Отсутствие файла роняет тест выше; null здесь — чтобы сборка
      // набора не падала исключением до запуска тестов.
      const data: unknown = existsSync(registryPath)
        ? JSON.parse(readFileSync(registryPath, 'utf8'))
        : null;

      test('корень — массив записей', () => {
        expect(Array.isArray(data)).toBe(true);
      });

      // Проверяем каждый элемент исходного массива: null и примитивы
      // отклоняются, а не молча вырезаются фильтром.
      const entries = Array.isArray(data) ? (data as unknown[]) : [];

      test('каждая запись — объект с version (semver) и builds (массив)', () => {
        entries.forEach((entry, index) => {
          const problems = entryProblems(entry);
          expect(problems, `запись #${index}: ${problems.join(', ')}`).toEqual(
            [],
          );
        });
      });

      test('версии уникальны — дубль роняет парсер сервера', () => {
        const versions = entries
          .filter((entry) => entryProblems(entry).length === 0)
          .map((entry) => (entry as Record<string, unknown>)['version']);
        const dupes = versions.filter(
          (version, index) => versions.indexOf(version) !== index,
        );
        expect(dupes).toEqual([]);
      });
    });
  }

  describe('валидация записей (фикстуры)', () => {
    test('null и примитивы отклоняются, корректная запись — проходит', () => {
      for (const invalid of [null, 'invalid', 42, {}]) {
        expect(entryProblems(invalid).length).toBeGreaterThan(0);
      }
      expect(entryProblems({ version: '1.2.3', builds: ['1590'] })).toEqual(
        [],
      );
    });
  });
});
