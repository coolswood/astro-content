import { describe, test, expect } from 'bun:test';
import { buildStagePrompts } from '../scripts/lib/pipeline.js';
import { loadPrompt } from '../scripts/lib/prompt-loader.js';

/**
 * UI-конвейер: 4 стадии по base/ui/* (review/fix вместо однозапросного tech),
 * глоссарий и языковой стиль подставляются, мобильная специфика на месте.
 * loadPrompt читает scripts/prompts относительно cwd — тесты гоняются из корня.
 */
describe('buildStagePrompts — ui', () => {
  test('4 стадии: main, editor, review, fix; tech больше нет', async () => {
    const prompts = await buildStagePrompts('ui', 'de');
    expect(prompts.main).toBeTruthy();
    expect(prompts.editor).toBeTruthy();
    expect(prompts.review).toBeTruthy();
    expect(prompts.fix).toBeTruthy();
    expect(prompts.tech).toBeUndefined();
  });

  test('мобильная специфика в промптах: лаконичность, плейсхолдеры/ICU, мета', async () => {
    const prompts = await buildStagePrompts('ui', 'de');
    expect(prompts.main).toContain('интерфейс');
    expect(prompts.main).toContain('meta');
    expect(prompts.main).toContain('Плейсхолдеры {name}');
    expect(prompts.main).toContain('ICU');
    expect(prompts.review).toContain('плейсхолдеры');
    expect(prompts.fix).toContain('плоский JSON');
  });

  test('глоссарий инжектируется в ui-промпты', async () => {
    const prompts = await buildStagePrompts('ui', 'de', {
      glossaryPath: 'scripts/prompts/de/glossary.json',
    });
    expect(prompts.main).toMatch(/→/); // формат глоссария «ru → lang (context)»
  });

  test('языковой стиль de попадает в ui-main', async () => {
    const main = await loadPrompt('ui', 'main', 'de');
    expect(main).toContain('TARGET_LANG'); // строка заголовка стиля
  });
});
