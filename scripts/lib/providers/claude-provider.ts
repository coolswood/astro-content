import type { Page, Browser } from 'puppeteer-core';
import type { AIProvider, ProviderType } from '../types.js';
import { connectToBrowser } from '../gemini-client.js';

/**
 * Claude Provider
 * URL: https://claude.ai/new?incognito
 */
export class ClaudeProvider implements AIProvider {
  type: ProviderType = 'claude';
  private browser!: Browser;
  private page!: Page;

  async init() {
    this.browser = await connectToBrowser();
    this.page = await this.browser.newPage();
    
    console.log('🌐 Navigating to Claude.ai (Incognito mode)...');
    await this.page.goto('https://claude.ai/new?incognito', {
      waitUntil: 'networkidle2',
    });
  }

  private lock: Promise<any> = Promise.resolve();

  async interact(
    prompt: string,
    options?: { model?: string; shouldStartNewChat?: boolean },
  ): Promise<string> {
    const previousLock = this.lock;

    const currentLock = previousLock.then(async () => {
      if (options?.shouldStartNewChat) {
        console.log('🔄 Starting new chat on Claude...');
        await this.page.goto('https://claude.ai/new?incognito', {
          waitUntil: 'networkidle2',
        });
      }

      // Ensure the tab is active
      await this.page.bringToFront();

      const inputSelector = 'div[aria-label="Write your prompt to Claude"]';
      await this.page.waitForSelector(inputSelector);

      // Click to ensure focus and cursor presence
      await this.page.click(inputSelector);
      await new Promise(r => setTimeout(r, 200));
      await this.page.focus(inputSelector);

      // Type prompt
      console.log(`⌨️ Inserting prompt to Claude (${prompt.length} chars)...`);
      
      const insertionSuccess = await this.page.evaluate(
        (sel, text) => {
          const el = document.querySelector(sel) as HTMLElement;
          if (!el) return false;

          el.focus();
          el.innerText = ''; 
          
          const success = document.execCommand('insertText', false, text);
          
          if (!success) {
            el.innerText = text;
            el.dispatchEvent(new Event('input', { bubbles: true }));
          }
          
          el.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        },
        inputSelector,
        prompt,
      );

      if (!insertionSuccess) {
        console.warn('⚠️ Could not find input element via evaluate');
      }

      await new Promise(r => setTimeout(r, 800));

      await this.page.keyboard.press('End');
      await this.page.keyboard.press('Space');
      await this.page.keyboard.press('Backspace');

      const sendBtnSelector = 'button[aria-label="Send message"]';
      await this.page.waitForSelector(sendBtnSelector);
      
      console.log('🚀 Clicking send button on Claude...');
      
      try {
        const isDisabled = await this.page.evaluate((sel) => {
          const btn = document.querySelector(sel);
          return btn?.hasAttribute('disabled') || btn?.getAttribute('aria-disabled') === 'true';
        }, sendBtnSelector);

        if (isDisabled) {
          console.log('⚠️ Send button disabled, trying to force it...');
          await this.page.evaluate((sel) => {
            (document.querySelector(sel) as HTMLElement)?.click();
          }, sendBtnSelector);
        } else {
          await this.page.click(sendBtnSelector);
        }
      } catch (e) {
        console.warn('⚠️ Standard click failed, using evaluate click');
        await this.page.evaluate((sel) => {
          (document.querySelector(sel) as HTMLElement)?.click();
        }, sendBtnSelector);
      }

      console.log('⌛ Waiting for Claude response...');

      try {
        console.log('⏳ Stage 1: Waiting for generation to START (Stop button or markdown appeared)...');
        await this.page.waitForFunction(
          () => {
            const stopBtn = document.querySelector('button[aria-label="Stop response"]');
            if (stopBtn && (stopBtn as HTMLElement).offsetWidth > 0) return true;
            
            const markdowns = document.querySelectorAll('.standard-markdown');
            return markdowns.length > 0;
          },
          { timeout: 20000 },
        ).catch(() => console.log('⚠️ Could not confirm start within 20s.'));

        console.log('✅ Stage 2: Waiting for completion...');

        await this.page.waitForFunction(
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

        console.log('🏁 Stage 3: Claude finished generation.');
        await new Promise((r) => setTimeout(r, 2000));
      } catch (e) {
        console.warn('⚠️ Timed out waiting for Claude response. Reading current state.');
      }

      const responseText = await this.page.evaluate(() => {
        const responses = document.querySelectorAll('.standard-markdown');
        if (responses.length === 0) return '';
        return (responses[responses.length - 1] as HTMLElement).innerText;
      });

      if (!responseText || responseText.length < 5) {
        throw new Error('Empty or too short response from Claude');
      }

      return responseText;
    });

    this.lock = currentLock.catch(() => {});
    return currentLock;
  }

  async parseJson<T>(text: string): Promise<T> {
    const candidates: string[] = [];

    // 1. Try to extract from all ```json ... ``` or ``` ... ``` blocks
    const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)```/gi;
    let match;
    while ((match = codeBlockRegex.exec(text)) !== null) {
      candidates.push(match[1].trim());
    }

    // 2. Look for "json\n{" or similar patterns if Claude missed backticks
    const rawJsonMatch = text.match(/json\s*[\r\n]+(\{[\s\S]*\})/i);
    if (rawJsonMatch) candidates.push(rawJsonMatch[1].trim());

    // 3. Try to find largest { ... } and [ ... ] blocks
    const braceMatch = text.match(/\{[\s\S]*\}/);
    if (braceMatch) candidates.push(braceMatch[0].trim());

    const bracketMatch = text.match(/\[[\s\S]*\]/);
    if (bracketMatch) candidates.push(bracketMatch[0].trim());

    // 4. Add the raw text as a last resort
    candidates.push(text.trim());

    // Try each candidate with and without a simple "unescaped quote" fix
    for (const candidate of candidates) {
      // Strategy A: Direct parse
      try {
        if (candidate.startsWith('[') && !candidate.includes('"')) continue;
        return JSON.parse(candidate);
      } catch (e) { /* ignore */ }

      // Strategy B: Simple repair for nested quotes like "He said "Hello""
      // This regex tries to find quotes that are NOT preceded by : or , and NOT followed by : or , or } or ]
      // It's a heuristic, but often helps with LLM output.
      try {
        const repaired = candidate
          .replace(/([^:\[\{,])\s*"(?!\s*[:,\}\]])/g, '$1\\"')
          .replace(/(?<![:\[\{,])\s*"(?!\s*[:,\}\]])/g, '\\"');
        
        if (repaired !== candidate) {
          return JSON.parse(repaired);
        }
      } catch (e) { /* ignore */ }
    }

    // If we are here, everything failed.
    console.error('All JSON parsing attempts failed for Claude response.');
    console.error('Raw response snippet:', text.substring(0, 500) + '...');
    throw new Error('Claude JSON parsing failed after multiple attempts (including repair strategies).');
  }

  async close() {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.disconnect();
  }
}
