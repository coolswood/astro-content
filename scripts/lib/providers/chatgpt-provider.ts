import type { Page } from 'puppeteer-core';
import type { ProviderType } from '../types.js';
import { BasePuppeteerProvider } from './base-puppeteer-provider.js';
import { sleep, retryAction } from '../puppeteer-core.js';

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
   * Новый чат ChatGPT: повторная навигация на temporary-chat URL.
   *
   * Ранее прежняя версия закрывала и пересоздавала страницу (page.close() +
   * browser.newPage()). На базовом классе это сломалось: SessionManager владеет
   * страницей, и после close() последующий bringToFront падал с TargetCloseError.
   * Повторное открытие ?temporary-chat=true сбрасывает чат-сессию等效но
   * пересозданию, но безопасно для SessionManager.
   */
  protected async resetForNewChat(page: Page): Promise<void> {
    await this.navigate(page, this.startUrl);
  }

  protected async insertPrompt(page: Page, selector: string, text: string): Promise<void> {
    // ChatGPT composer — это ProseMirror-contenteditable (#prompt-textarea, не
    // настоящий <textarea>). Дефолтная insertPrompt базового класса делает
    // execCommand('insertText') с фолбеком — это рабочий путь. Дополнительная
    // активация send-кнопки (Space+Backspace) выполняется в triggerSendButton
    // базового runInteraction, поэтому здесь не дублируем.
    await super.insertPrompt(page, selector, text);
  }

  protected async clickSend(page: Page, selector: string): Promise<void> {
    // ChatGPT: send-кнопка появляется в DOM только ПОСЛЕ ввода текста, поэтому
    // ждём её с разумным таймаутом. Клик через evaluate (как в прежней версии).
    await retryAction(() => page.waitForSelector(selector, { timeout: 15000 }));
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
    // Старт генерации = появилась stop-кнопка (явный сигнал, что модель работает).
    // Ранее использовалось «markdown count увеличился», но это ненадёжно:
    // welcome-ассистент уже даёт .markdown, и счётчик захватывается неверно.
    console.log('⏳ Waiting for ChatGPT stop-button (generation start)...');
    try {
      await page.waitForFunction(
        () => {
          // Stop-button: data-testid содержит 'stop' или aria-label 'stop/остановить'.
          const stop = Array.from(document.querySelectorAll('button')).find((b) => {
            const t = b.getAttribute('data-testid') || '';
            const a = (b.getAttribute('aria-label') || '').toLowerCase();
            return t.includes('stop') || a.includes('stop') || a.includes('остановить');
          });
          return !!(stop && (stop as HTMLElement).offsetWidth > 0);
        },
        { timeout: 30000, polling: 500 },
      );
      console.log('✅ Generation started (stop-button visible).');
    } catch {
      // Возможно, ответ очень короткий и stop-button не успел появиться —
      // это ОК, продолжаем к waitForGenerationComplete.
      console.log('ℹ️ Stop-button не появился за 30с — возможно, очень быстрый ответ.');
    }
  }

  protected async waitForGenerationComplete(page: Page): Promise<void> {
    // Завершение = stop-кнопка ИСЧЕЗЛА (или появилась copy-кнопка/новый turn).
    // polling с Continue-generating handling.
    let previousLength = 0;
    let stableSeconds = 0;
    const maxSeconds = 300;

    for (let sec = 0; sec < maxSeconds; sec++) {
      await sleep(1000);

      const state = await page.evaluate(() => {
        const markdowns = document.querySelectorAll('.markdown');
        // Берём последний markdown (текущий ответ).
        const latest =
          markdowns.length > 0
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

        // Stop-button — главный признак «ещё генерирует».
        const stopBtn = buttons.find((b) => {
          const testid = b.getAttribute('data-testid') || '';
          const label = (b.getAttribute('aria-label') || '').toLowerCase();
          return (
            testid.includes('stop') ||
            label.includes('stop') ||
            label.includes('остановить')
          );
        });
        const isGenerating = !!(stopBtn && (stopBtn as HTMLElement).offsetWidth > 0);

        // Copy button в последнем ответе — признак завершённого turn'а.
        let hasCopyButton = false;
        if (latest) {
          const lastTurn =
            latest.closest('[data-testid^="conversation-turn-"]') || latest.parentElement;
          if (lastTurn && lastTurn.querySelector('[data-testid^="copy-turn"]')) {
            hasCopyButton = true;
          }
        }
        return { length, isGenerating, clickedContinue: false, hasCopyButton };
      });

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

      // Завершение: stop-кнопка исчезла И есть содержимое.
      // Раньше требовалось ещё length>0 + стабильность — но если stop исчез,
      // генерация точно завершена, читаем что есть.
      if (state.length > 0 && !state.isGenerating) {
        console.log(
          `🏁 ChatGPT finished (length ${state.length}, no stop-button).`,
        );
        return;
      }
      // Доп. быстрый выход через copy-button при стабильности.
      if (state.hasCopyButton && stableSeconds >= 2 && state.length > 0) {
        console.log('🏁 ChatGPT Copy button detected. Generation finished.');
        return;
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
