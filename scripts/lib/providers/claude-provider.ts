import type { Page } from 'puppeteer-core';
import type { ProviderType } from '../types.js';
import { BasePuppeteerProvider } from './base-puppeteer-provider.js';

/**
 * Claude Provider — https://claude.ai/new?incognito
 *
 * Переписан на базовый класс. Селекторы сохранены 1:1, логика завершения
 * генерации (Stop/Copy/Send кнопки) перенесена в waitForGenerationComplete.
 *
 * Чинит по сравнению с прежней версией:
 *   - отсутствовавшее safeGoto-рекавери (теперь через navigate());
 *   - дублированную JSON-репеяровку (теперь общий parseJson);
 *   - drift интерфейса (теперь полноценно принимает InteractOptions).
 */
export class ClaudeProvider extends BasePuppeteerProvider {
  type: ProviderType = 'claude';
  protected startUrl = 'https://claude.ai/new?incognito';
  protected inputSelector = 'div[aria-label="Write your prompt to Claude"]';
  protected sendButtonSelector = 'button[aria-label="Send message"]';
  protected responseSelector = '.standard-markdown';
  protected minResponseLength = 5;
  protected settleMs = 2000;

  protected async resetForNewChat(page: Page): Promise<void> {
    // Claude использует навигацию для нового чата (как дефолт), но через
    // прямой page.goto для networkidle2 — сохраняем прежнее поведение.
    await page.goto(this.startUrl, { waitUntil: 'networkidle2' });
  }

  protected async waitForGenerationStart(page: Page): Promise<void> {
    // Старт генерации: появляется Stop-кнопка или .standard-markdown.
    try {
      await page.waitForFunction(
        () => {
          const stopBtn = document.querySelector('button[aria-label="Stop response"]');
          if (stopBtn && (stopBtn as HTMLElement).offsetWidth > 0) return true;
          return document.querySelectorAll('.standard-markdown').length > 0;
        },
        { timeout: 20000 },
      );
    } catch {
      console.log('⚠️ Could not confirm Claude generation start within 20s.');
    }
  }

  protected async waitForGenerationComplete(page: Page): Promise<void> {
    // Завершение: Stop-кнопка исчезла ИЛИ появилась Copy/Send.
    try {
      await page.waitForFunction(
        () => {
          const stopBtn = document.querySelector('button[aria-label="Stop response"]');
          if (stopBtn && (stopBtn as HTMLElement).offsetWidth > 0) return false;

          const copyBtn = document.querySelector('button[aria-label="Copy"]');
          if (copyBtn && (copyBtn as HTMLElement).offsetWidth > 0) return true;

          const sendBtn = document.querySelector('button[aria-label="Send message"]');
          if (sendBtn && (sendBtn as HTMLElement).offsetWidth > 0) return true;

          return false;
        },
        { timeout: 300000, polling: 1000 },
      );
    } catch {
      console.warn('⚠️ Timed out waiting for Claude completion. Reading current state.');
    }
  }
}
