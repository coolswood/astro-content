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

const langs = readdirSync(i18nDir).filter(
  (lang) => existsSync(join(i18nDir, lang, 'releases.json')),
);

describe('releases registry (src/i18n/<lang>/releases.json)', () => {
  test('файл реестра существует для каждого языка', () => {
    expect(langs.length).toBeGreaterThanOrEqual(19);
  });

  for (const lang of langs) {
    describe(lang, () => {
      const raw = readFileSync(join(i18nDir, lang, 'releases.json'), 'utf8');
      const data: unknown = JSON.parse(raw);

      test('корень — массив записей', () => {
        expect(Array.isArray(data)).toBe(true);
      });

      const entries = (data as Array<Record<string, unknown>>).filter(
        (entry) => typeof entry === 'object' && entry !== null,
      );

      test('у каждой записи есть version (semver) и builds (массив)', () => {
        for (const entry of entries) {
          expect(typeof entry['version']).toBe('string');
          expect(String(entry['version'])).toMatch(/^\d+\.\d+\.\d+$/);
          expect(Array.isArray(entry['builds'])).toBe(true);
        }
      });

      test('версии уникальны — дубль роняет парсер сервера', () => {
        const versions = entries.map((entry) => String(entry['version']));
        const dupes = versions.filter(
          (version, index) => versions.indexOf(version) !== index,
        );
        expect(dupes).toEqual([]);
      });
    });
  }
});
