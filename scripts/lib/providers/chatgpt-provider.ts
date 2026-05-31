import type { Page, Browser } from 'puppeteer-core';
import type { AIProvider, ProviderType } from '../types.js';
import { connectToBrowser, safeGoto } from '../gemini-client.js';
import { safeParseAIJson } from '../bot-utils.js';


export class ChatGPTProvider implements AIProvider {
  type: ProviderType = 'chatgpt';
  private browser!: Browser;
  private page!: Page;

  async init() {
    this.browser = await connectToBrowser();
    this.page = await this.browser.newPage();
    // Use temporary chat as requested by the user
    await safeGoto(this.page, 'https://chatgpt.com/?temporary-chat=true');
  }

  private lock: Promise<any> = Promise.resolve();

  async interact(
    prompt: string,
    options?: { model?: string; intelligenceLevel?: 1 | 2 | 3; shouldStartNewChat?: boolean },
  ): Promise<string> {
    const previousLock = this.lock;

    const currentLock = previousLock.then(async () => {
      if (options?.shouldStartNewChat) {
        console.log('🔄 Starting new chat on ChatGPT (recreating page)...');
        try {
          await this.page.close();
        } catch (e) {
          // Ignore if page is already closed or invalid
        }
        this.page = await this.browser.newPage();
        await safeGoto(this.page, 'https://chatgpt.com/?temporary-chat=true');
      }


      // Ensure the tab is active
      await this.page.bringToFront();

      const inputSelector = '#prompt-textarea';
      await this.page.waitForSelector(inputSelector);

      // Focus first
      await this.page.focus(inputSelector);

      // Type prompt
      console.log(`⌨️ Inserting prompt to ChatGPT (${prompt.length} chars)...`);
      
      // Using execCommand for better compatibility with rich-text editors
      await this.page.evaluate(
        (sel, text) => {
          const el = document.querySelector(sel) as HTMLElement;
          if (el) {
            el.focus();
            // Clear prefix if any
            el.innerText = '';
            document.execCommand('insertText', false, text);
            el.dispatchEvent(new Event('input', { bubbles: true }));
          }
        },
        inputSelector,
        prompt,
      );

      // ChatGPT often needs some input events to enable the send button
      await this.page.focus(inputSelector);
      await this.page.keyboard.press('Space');
      await this.page.keyboard.press('Backspace');
      
      // Wait a bit for UI to enable the button
      await new Promise(r => setTimeout(r, 500));

      const sendBtnSelector = 'button[data-testid="send-button"], button[data-testid="fruitjuice-send-button"], #composer-submit-button';
      await this.page.waitForSelector(sendBtnSelector);
      
      const initialTurnCount = await this.page.evaluate(() => document.querySelectorAll('.markdown').length);
      console.log(`📊 Initial turn count (markdowns): ${initialTurnCount}`);

      console.log('🚀 Clicking send button...');
      
      // More robust click: wait for enabled and use evaluate as fallback
      await this.page.evaluate((selector) => {
        const btn = document.querySelector(selector) as HTMLButtonElement;
        if (btn) {
          // If it's disabled, try to force-enable it or just wait
          if (btn.disabled) {
            console.log('Button is disabled, trying to wait or force click...');
          }
          btn.click();
        }
      }, sendBtnSelector);

      console.log('⌛ Waiting for ChatGPT response...');

      try {
        console.log('⏳ Stage 1: Waiting for generation to START (.markdown count increased)...');
        await this.page
          .waitForFunction(
            (initialCount) => {
              const markdowns = document.querySelectorAll('.markdown');
              return markdowns.length > initialCount;
            },
            { timeout: 30000 },
            initialTurnCount,
          )
          .catch(() =>
            console.log(
              '⚠️ Could not confirm start within 30s, proceeding to check response...',
            ),
          );

        console.log('✅ Stage 2: Generation confirmed started. Waiting for text stability...');

        let previousLength = 0;
        let stableSeconds = 0;
        const maxSeconds = 300; // 5 minutes max per chunk

        for (let sec = 0; sec < maxSeconds; sec++) {
          await new Promise((r) => setTimeout(r, 1000));

          const state = await this.page.evaluate((initialCount) => {
            const markdowns = document.querySelectorAll('.markdown');
            const latest =
              markdowns.length > initialCount
                ? (markdowns[markdowns.length - 1] as HTMLElement)
                : null;
            const length = latest ? latest.innerText.length : 0;

            const buttons = Array.from(document.querySelectorAll('button'));

            // 1. Check and click "Continue generating"
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

            // 2. Check for stop-button or fruitjuice-stop-button
            const stopBtn = buttons.find((b) => {
              const testid = b.getAttribute('data-testid');
              const label = (b.getAttribute('aria-label') || '').toLowerCase();
              return (
                testid === 'stop-button' ||
                testid?.includes('stop') ||
                label.includes('остановить') ||
                label.includes('stop')
              );
            });
            const isGenerating = !!(stopBtn && (stopBtn as HTMLElement).offsetWidth > 0);

            // 3. Check for copy-turn-action-button in the last turn
            let hasCopyButton = false;
            if (latest) {
              const lastTurn =
                latest.closest('[data-testid^="conversation-turn-"]') ||
                latest.parentElement;
              if (lastTurn && lastTurn.querySelector('[data-testid="copy-turn-action-button"]')) {
                hasCopyButton = true;
              }
            }

            return { length, isGenerating, clickedContinue: false, hasCopyButton };
          }, initialTurnCount);

          if (state.clickedContinue) {
            console.log('🔄 Detected and clicked "Continue generating" button.');
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
              break;
            }
            if (!state.isGenerating && stableSeconds >= 4) {
              console.log(`🏁 ChatGPT text stable for ${stableSeconds}s and no Stop button. Generation finished.`);
              break;
            }
          }

          if (sec % 10 === 0) {
            console.log(
              `⏳ ChatGPT generating... text length: ${state.length} chars (stable for ${stableSeconds}s, active generation: ${state.isGenerating})`,
            );
          }
        }

        await new Promise((r) => setTimeout(r, 2000));
      } catch (e: any) {
        console.warn(`⚠️ Error waiting for ChatGPT response: ${e.message}. Attempting to read current state.`);
      }

      const responseText = await this.page.evaluate(() => {
        const responses = document.querySelectorAll('.markdown');
        if (responses.length === 0) return '';
        // Get the last one
        return (responses[responses.length - 1] as HTMLElement).innerText;
      });

      if (!responseText || responseText.length < 5) {
        throw new Error('Empty or too short response from ChatGPT');
      }

      return responseText;
    });

    this.lock = currentLock.catch(() => {});
    return currentLock;
  }

  async parseJson<T>(text: string): Promise<T> {
    return safeParseAIJson<T>(text);
  }

  async close() {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.disconnect();
  }
}
