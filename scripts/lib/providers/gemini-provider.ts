import type { Page } from 'puppeteer-core';
import type {
  AIProvider,
  IntelligenceLevel,
  InteractOptions,
  ParseJsonOptions,
  ProviderType,
} from '../types.js';
import { connectToBrowser, safeGoto, sleep } from '../puppeteer-core.js';
import { SessionManager } from '../async-lock.js';
import { parseWithRepair } from '../json-repair.js';
import {
  interactWithGemini,
  parseGeminiJson,
} from '../gemini-client.js';

/**
 * Gemini Provider — https://gemini.google.com/app
 *
 * Сохраняет delegation к interactWithGemini/parseGeminiJson (сложная логика
 * выбора модели, thinking-panel), но оборачивает ВСЕ обращения к странице
 * в единый SessionManager.
 *
 * Чинит CRITICAL-гонку: прежде parseJson вызывал interactWithGemini напрямую,
 * обходя лок — параллельный interact и self-heal ломали друг друга на одной
 * странице. Теперь interact и parseJson идут через withSession(sessionId),
 * который сериализует их одним локом на сессию.
 *
 * Также реализует настоящую мульти-сессию (stage1/stage2/...), в отличие от
 * остальных провайдеров (те используют 'default').
 */
export class GeminiProvider implements AIProvider {
  type: ProviderType = 'gemini';
  private browser!: import('puppeteer-core').Browser;
  private sessions!: SessionManager;

  async init(): Promise<void> {
    this.browser = await connectToBrowser();
    this.sessions = new SessionManager(() => this.createPage());
    // Предсоздаём default-страницу для единообразия.
    await this.sessions.withSession('default', async () => {});
  }

  private async createPage(): Promise<Page> {
    const page = await this.browser.newPage();
    await safeGoto(page, 'https://gemini.google.com/app');
    return page;
  }

  /** Преобразует уровень интеллекта в ключевое слово модели для interactWithGemini. */
  private modelKeywordFromLevel(level?: IntelligenceLevel): string {
    switch (level) {
      case 1:
        return 'Быстрая';
      case 2:
        return 'Думающая';
      case 3:
        return 'Pro';
      default:
        return 'Pro';
    }
  }

  async interact(
    prompt: string,
    options: InteractOptions = {},
  ): Promise<string> {
    const sessionId = options.sessionId ?? 'default';
    const modelName =
      options.model ||
      this.modelKeywordFromLevel(options.intelligenceLevel);

    return this.sessions.withSession(sessionId, async ({ page }) => {
      // interactWithGemini сама управляет shouldStartNewChat и ретраями.
      return interactWithGemini(
        page,
        prompt,
        modelName,
        options.shouldStartNewChat ?? false,
      );
    });
  }

  async parseJson<T>(text: string, options?: ParseJsonOptions): Promise<T> {
    const sessionId = options?.sessionId ?? 'default';
    // Берём страницу сессии (если есть) под локом — для self-heal'а Gemini.
    return this.sessions.withSession(sessionId, async ({ page }) => {
      // Сначала обычный парсинг с восстановлением (без обращения к модели).
      try {
        return await parseWithRepair<T>(text);
      } catch {
        // Падаем в self-heal: просим модель в той же сессии исправить JSON.
        // Это идёт ВНУТРИ лока сессии — гонки с interact больше нет.
        console.log('⚠️ JSON не распарсился. Просим Gemini исправить в той же сессии...');
        return parseGeminiJson<T>(text, page, 'Pro');
      }
    });
  }

  async close(): Promise<void> {
    for (const page of this.sessions.pages()) {
      try {
        await page.close();
      } catch {
        // страница уже закрыта
      }
    }
    if (this.browser) await this.browser.disconnect();
    // sleep нужен для аккуратного освобождения; сохраняем прежнее поведение.
    await sleep(0);
  }
}

// Экспортируем AIProvider для обратной совместимости импортов.
export type { AIProvider };
