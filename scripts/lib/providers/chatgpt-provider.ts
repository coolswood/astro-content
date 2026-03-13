import type { Page, Browser } from 'puppeteer-core';
import type { AIProvider, ProviderType } from '../types.js';
import { connectToBrowser } from '../gemini-client.js';

export class ChatGPTProvider implements AIProvider {
  type: ProviderType = 'chatgpt';
  private browser!: Browser;
  private page!: Page;

  async init() {
    this.browser = await connectToBrowser();
    this.page = await this.browser.newPage();
    // Use temporary chat as requested by the user
    await this.page.goto('https://chatgpt.com/?temporary-chat=true', {
      waitUntil: 'networkidle2',
    });
  }

  async interact(
    prompt: string,
    options?: { model?: string; shouldStartNewChat?: boolean },
  ): Promise<string> {
    if (options?.shouldStartNewChat) {
      await this.page.goto('https://chatgpt.com/?temporary-chat=true', {
        waitUntil: 'networkidle2',
      });
    }

    const inputSelector = '#prompt-textarea';
    await this.page.waitForSelector(inputSelector);

    // Type prompt
    console.log(`⌨️ Typing prompt (${prompt.length} chars)...`);
    await this.page.evaluate(
      (sel, text) => {
        const el = document.querySelector(sel);
        if (el) (el as HTMLElement).innerText = text;
      },
      inputSelector,
      prompt,
    );

    // ChatGPT often needs some input events to enable the send button
    await this.page.focus(inputSelector);
    await this.page.keyboard.press('Space');
    await this.page.keyboard.press('Backspace');

    const sendBtnSelector = 'button[data-testid="send-button"]';
    await this.page.waitForSelector(sendBtnSelector);
    
    console.log('🚀 Clicking send button...');
    await this.page.click(sendBtnSelector);

    console.log('⌛ Waiting for ChatGPT response...');

    // Wait for the response to finish.
    try {
      // First, we must ensure the generation has actually STARTED (Stop button appears)
      console.log('⏳ Stage 1: Waiting for generation to START (Stop button or text appeared)...');

      await this.page
        .waitForFunction(
          () => {
            const stopBtn = document.querySelector(
              '[data-testid="stop-button"]',
            );
            if (stopBtn && (stopBtn as HTMLElement).offsetWidth > 0)
              return true;

            // If we see the markdown area start populating, it's also a sign
            const markdowns = document.querySelectorAll('.markdown');
            return markdowns.length > 0;
          },
          { timeout: 15000 },
        )
        .catch(() =>
          console.log(
            '⚠️ Could not confirm start within 15s, waiting for done state anyway...',
          ),
        );

      console.log('✅ Stage 2: Generation confirmed started. Waiting for completion signals...');

      await this.page.waitForFunction(
        () => {
          const buttons = Array.from(document.querySelectorAll('button'));

          // 1. If the Stop button is visible, we are DEFINITELY generating.
          const stopBtn = buttons.find((b) => {
            const testid = b.getAttribute('data-testid');
            const label = (b.getAttribute('aria-label') || '').toLowerCase();
            return (
              testid === 'stop-button' ||
              label.includes('остановить') ||
              label.includes('stop')
            );
          });

          if (stopBtn && (stopBtn as HTMLElement).offsetWidth > 0) {
            return false;
          }

          // 2. Clear "Done" signals:

          // Signal A: Copy button appeared under the response (Stable testid)
          if (document.querySelector('[data-testid="copy-turn-action-button"]')) {
            return true;
          }

          // Signal B: Regenerate button appeared (labels for localization)
          const regenerateBtn = buttons.find((b) => {
            const label = (b.getAttribute('aria-label') || '').toLowerCase();
            return (
              label.includes('пересказать') ||
              label.includes('regenerate') ||
              label.includes('сменить модель')
            );
          });
          if (regenerateBtn && (regenerateBtn as HTMLElement).offsetWidth > 0) {
            return true;
          }

          // Signal C: Send button is back (either as send or voice if empty)
          const composerBtn = document.getElementById('composer-submit-button') ||
                             buttons.find(b => {
                               const tid = b.getAttribute('data-testid');
                               const label = (b.getAttribute('aria-label') || '').toLowerCase();
                               return tid === 'send-button' || 
                                      label.includes('отправить') || 
                                      label.includes('голосовой') ||
                                      label.includes('voice');
                             });
          
          if (composerBtn && (composerBtn as HTMLElement).offsetWidth > 0) {
             // If it's the composer button and it's NOT a stop button (checked above), 
             // and it's not disabled, we are likely done.
             if (!composerBtn.hasAttribute('disabled')) {
               return true;
             }
          }

          return false;
        },
        { timeout: 300000, polling: 1000 },
      );

      console.log('🏁 Stage 3: Completion signals detected. Generation finished.');
      await new Promise((r) => setTimeout(r, 2000));
    } catch (e) {
      console.warn(
        '⚠️ Timed out waiting for ChatGPT response. Reading current state.',
      );
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
  }

  async parseJson<T>(text: string): Promise<T> {
    // Basic JSON extraction from markdown
    const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    const jsonString = match ? match[0] : text;
    const cleanedText = jsonString
      .replace(/^```json/i, '')
      .replace(/```$/i, '')
      .trim();

    try {
      return JSON.parse(cleanedText);
    } catch (e) {
      console.error('Failed to parse JSON from ChatGPT response:', text);
      throw new Error('ChatGPT JSON parsing failed');
    }
  }

  async close() {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.disconnect();
  }
}
