import type { Page } from 'puppeteer-core';
import type { ProviderType } from '../types.js';
import { BasePuppeteerProvider } from './base-puppeteer-provider.js';
import { sleep } from '../puppeteer-core.js';

/**
 * Mistral Provider — https://chat.mistral.ai/chat
 *
 * Переписан на базовый класс. Селекторы сохранены 1:1.
 *
 * Чинит по сравнению с прежней версией:
 *   - инвалидный Playwright-селектор `button:has(span:has-text("Think"))` в
 *     Puppeteer (никогда не матчился → молчаливый фолбек). Теперь режим
 *     определяется через JS-скан кнопок по innerText;
 *   - дублированную JSON-репеяровку;
 *   - drift интерфейса;
 *   - missing safeGoto-рекавери.
 */
export class MistralProvider extends BasePuppeteerProvider {
  type: ProviderType = 'mistral';
  protected startUrl = 'https://chat.mistral.ai/chat';
  protected inputSelector = 'div.ProseMirror';
  protected sendButtonSelector = 'button[aria-label="Send"], button[aria-label="Send question"]';
  protected responseSelector = '.markdown-container-style, .markdown, [class*="prose"]';
  protected minResponseLength = 5;
  protected settleMs = 3000;

  protected async resetForNewChat(page: Page): Promise<void> {
    await page.goto(this.startUrl, { waitUntil: 'networkidle2' });
  }

  /** Mistral требует Think-режим — активируем перед каждой отправкой. */
  protected async onBeforeSend(page: Page): Promise<void> {
    await this.ensureThinkingMode(page);
  }

  protected async waitForGenerationStart(page: Page): Promise<void> {
    const stopBtnSelector = 'button[aria-label="Stop generation"]';
    try {
      await page.waitForSelector(stopBtnSelector, { timeout: 20000 });
    } catch {
      console.log('⚠️ Could not confirm Mistral generation start within 20s.');
    }
  }

  protected async waitForGenerationComplete(page: Page): Promise<void> {
    const stopBtnSelector = 'button[aria-label="Stop generation"]';
    try {
      await page.waitForFunction(
        (sel) => !document.querySelector(sel),
        { timeout: 300000, polling: 2000 },
        stopBtnSelector,
      );
    } catch {
      console.warn('⚠️ Timed out waiting for Mistral completion. Reading current state.');
    }
  }

  /**
   * Гарантирует, что выбран режим "Think". Раньше использовался инвалидный
   * Playwright-селектор `:has-text` в Puppeteer — он никогда не матчится.
   * Теперь поиск кнопки режима идёт через JS-скан по innerText (Fast/Think/
   * Research), что работает на локализованном UI.
   */
  private async ensureThinkingMode(page: Page): Promise<void> {
    try {
      const modeText = await page.evaluate(() => {
        const modeBtn = Array.from(document.querySelectorAll('button')).find(
          (b) =>
            (b.innerText || '').includes('Fast') ||
            (b.innerText || '').includes('Think') ||
            (b.innerText || '').includes('Research'),
        );
        return modeBtn ? (modeBtn as HTMLElement).innerText : null;
      });

      if (modeText && modeText.includes('Think')) {
        console.log('✅ Mistral is already in Think mode.');
        return;
      }

      console.log(`🔄 Switching Mistral mode (current: ${modeText || 'unknown'})...`);
      await page.evaluate(() => {
        const modeBtn = Array.from(document.querySelectorAll('button')).find(
          (b) =>
            (b.innerText || '').includes('Fast') ||
            (b.innerText || '').includes('Think') ||
            (b.innerText || '').includes('Research'),
        );
        if (modeBtn) (modeBtn as HTMLElement).click();
      });

      const thinkOptionSelector = 'div[role="menuitem"], [role="menuitem"]';
      await page.waitForSelector(thinkOptionSelector, { visible: true });

      const success = await page.evaluate(() => {
        const thinkItem = Array.from(
          document.querySelectorAll('[role="menuitem"]'),
        ).find((item) => (item.textContent || '').includes('Think')) as
          | HTMLElement
          | undefined;
        if (thinkItem) {
          thinkItem.click();
          return true;
        }
        return false;
      });

      if (success) {
        console.log('✅ Successfully switched to Think mode.');
        await sleep(1000);
      } else {
        console.warn('⚠️ Could not find "Think" option in the menu.');
      }
    } catch (e: any) {
      console.error('❌ Error ensuring Thinking mode:', e?.message ?? e);
    }
  }
}
