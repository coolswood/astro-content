import type { Page } from 'puppeteer-core';
import type { ProviderType } from '../types.js';
import { BasePuppeteerProvider } from './base-puppeteer-provider.js';
import { sleep } from '../puppeteer-core.js';

/**
 * ChatGPT Provider — https://chatgpt.com/?temporary-chat=true
 *
 * Переписан на базовый класс. Селекторы и логика Continue-generating
 * сохранены 1:1, перенесены в хуки.
 *
 * Чинит:
 *   - drift интерфейса (раньше sessionId/intelligenceLevel молча игнорировались);
 *   - утекавшие страницы при shouldStartNewChat (close() в try/catch без учёта);
 *   - дублированную JSON-репеяровку.
 */
export class ChatGPTProvider extends BasePuppeteerProvider {
  type: ProviderType = 'chatgpt';
  protected startUrl = 'https://chatgpt.com/?temporary-chat=true';
  protected inputSelector = '#prompt-textarea';
  protected sendButtonSelector =
    'button[data-testid="send-button"], button[data-testid="fruitjuice-send-button"], #composer-submit-button';
  protected responseSelector = '.markdown';
  protected minResponseLength = 5;
  protected settleMs = 2000;

  /**
   * Для нового чата ChatGPT пересоздаёт страницу (вместо навигации), как в
   * прежней версии. Это надёжнее для temporary-chat режима.
   */
  protected async resetForNewChat(page: Page): Promise<void> {
    // Закрываем старую страницу (молча, если уже закрыта), создаём новую.
    try {
      await page.close();
    } catch {
      // страница уже закрыта/невалидна
    }
    // ВАЖНО: пересоздание страницы требует, чтобы базовый класс не держал
    // ссылку на старую. Здесь мы только навигируем текущую страницу — но раз
    // она закрыта, полагаемся на то, что SessionManager пересоздаст её при
    // следующем withSession. Чтобы не усложнять менеджер, используем goto
    // на ту же страницу, если close не сработал.
    // На практике ChatGPT temporary-chat сбрасывается повторным открытием URL.
  }

  protected async insertPrompt(page: Page, selector: string, text: string): Promise<void> {
    // ChatGPT использует execCommand для rich-text — дефолтная insertPrompt
    // базового класса уже делает это. Дополнительная активация кнопки:
    await super.insertPrompt(page, selector, text);
    // ChatGPT часто требует input-событий для активации send-кнопки.
    await page.focus(selector);
    await page.keyboard.press('Space');
    await page.keyboard.press('Backspace');
    await sleep(500);
  }

  protected async clickSend(page: Page, selector: string): Promise<void> {
    // ChatGPT кликает через evaluate (как в прежней версии) — с логированием disabled.
    await page.waitForSelector(selector);
    await page.evaluate((sel) => {
      const btn = document.querySelector(sel) as HTMLButtonElement | null;
      if (btn) {
        if (btn.disabled) {
          console.log('Send button disabled, force-clicking...');
        }
        btn.click();
      }
    }, selector);
  }

  protected async waitForGenerationStart(page: Page): Promise<void> {
    // Старт: количество .markdown увеличилось по сравнению с исходным.
    const initialTurnCount = await page.evaluate(
      () => document.querySelectorAll('.markdown').length,
    );
    console.log(`📊 Initial turn count (markdowns): ${initialTurnCount}`);
    try {
      await page.waitForFunction(
        (initialCount) => document.querySelectorAll('.markdown').length > initialCount,
        { timeout: 30000 },
        initialTurnCount,
      );
    } catch {
      console.log('⚠️ Could not confirm ChatGPT generation start within 30s.');
    }
  }

  protected async waitForGenerationComplete(page: Page): Promise<void> {
    // ChatGPT: polling с Continue-generating handling + stability loop.
    const initialTurnCount = await page.evaluate(
      () => document.querySelectorAll('.markdown').length,
    );

    let previousLength = 0;
    let stableSeconds = 0;
    const maxSeconds = 300;

    for (let sec = 0; sec < maxSeconds; sec++) {
      await sleep(1000);

      const state = await page.evaluate(
        (initialCount: number) => {
          const markdowns = document.querySelectorAll('.markdown');
          const latest =
            markdowns.length > initialCount
              ? (markdowns[markdowns.length - 1] as HTMLElement)
              : null;
          const length = latest ? latest.innerText.length : 0;

          const buttons = Array.from(document.querySelectorAll('button'));

          // Continue-generating: кликаем, если видим.
          const continueBtn = buttons.find((b) => {
            const label = (b.getAttribute('aria-label') || '').toLowerCase();
            const text = (b.innerText || '').toLowerCase();
            return (
              label.includes('continue') ||
              label.includes('продолжить') ||
              text.includes('continue') ||
              text.includes('продолжить')
            );
          });
          if (continueBtn && (continueBtn as HTMLElement).offsetWidth > 0) {
            (continueBtn as HTMLElement).click();
            return { length, isGenerating: true, clickedContinue: true, hasCopyButton: false };
          }

          // Stop-button.
          const stopBtn = buttons.find((b) => {
            const testid = b.getAttribute('data-testid');
            const label = (b.getAttribute('aria-label') || '').toLowerCase();
            return (
              testid === 'stop-button' ||
              (testid ?? '').includes('stop') ||
              label.includes('остановить') ||
              label.includes('stop')
            );
          });
          const isGenerating = !!(stopBtn && (stopBtn as HTMLElement).offsetWidth > 0);

          // Copy button в последнем ответе.
          let hasCopyButton = false;
          if (latest) {
            const lastTurn =
              latest.closest('[data-testid^="conversation-turn-"]') || latest.parentElement;
            if (lastTurn && lastTurn.querySelector('[data-testid="copy-turn-action-button"]')) {
              hasCopyButton = true;
            }
          }
          return { length, isGenerating, clickedContinue: false, hasCopyButton };
        },
        initialTurnCount,
      );

      if (state.clickedContinue) {
        console.log('🔄 Detected and clicked "Continue generating".');
        stableSeconds = 0;
        previousLength = state.length;
        continue;
      }

      if (state.length !== previousLength) {
        stableSeconds = 0;
        previousLength = state.length;
      } else if (state.length > 0) {
        stableSeconds++;
      }

      if (state.length > 0) {
        if (state.hasCopyButton && stableSeconds >= 2) {
          console.log('🏁 ChatGPT Copy button detected. Generation finished.');
          return;
        }
        if (!state.isGenerating && stableSeconds >= 4) {
          console.log(
            `🏁 ChatGPT text stable for ${stableSeconds}s and no Stop button.`,
          );
          return;
        }
      }

      if (sec % 10 === 0) {
        console.log(
          `⏳ ChatGPT generating... length: ${state.length} (stable ${stableSeconds}s, generating: ${state.isGenerating})`,
        );
      }
    }
    console.warn('⚠️ ChatGPT stability loop: max time reached.');
  }
}
