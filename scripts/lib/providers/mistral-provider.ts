import type { Page, Browser } from 'puppeteer-core';
import type { AIProvider, ProviderType } from '../types.js';
import { connectToBrowser } from '../gemini-client.js';

/**
 * Mistral Provider
 * URL: https://chat.mistral.ai/chat
 */
export class MistralProvider implements AIProvider {
  type: ProviderType = 'mistral';
  private browser!: Browser;
  private page!: Page;

  async init() {
    this.browser = await connectToBrowser();
    this.page = await this.browser.newPage();
    
    console.log('🌐 Navigating to Mistral.ai...');
    await this.page.goto('https://chat.mistral.ai/chat', {
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
        console.log('🔄 Starting new chat on Mistral...');
        await this.page.goto('https://chat.mistral.ai/chat', {
          waitUntil: 'networkidle2',
        });
      }

      await this.page.bringToFront();

      // Ensure Thinking mode is selected (DeepSeek-R1 / Reasoning)
      await this.ensureThinkingMode();

      // Mistral uses ProseMirror for contenteditable input
      const inputSelector = 'div.ProseMirror';
      await this.page.waitForSelector(inputSelector);

      await this.page.focus(inputSelector);

      console.log(`⌨️ Inserting prompt to Mistral (${prompt.length} chars)...`);
      
      const insertionSuccess = await this.page.evaluate(
        (sel, text) => {
          const el = document.querySelector(sel) as HTMLTextAreaElement | HTMLElement;
          if (!el) return false;

          el.focus();
          
          const success = document.execCommand('insertText', false, text);
          
          if (!success) {
            if ('value' in el) {
               (el as HTMLTextAreaElement).value = text;
            } else {
               el.innerText = text;
            }
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

      // After typing, wait for the send button to appear and become clickable
      const sendButtonSelector = 'button[aria-label="Send"], button[aria-label="Send question"]';
      await this.page.waitForSelector(sendButtonSelector, { visible: true });
      
      console.log('🚀 Sending message to Mistral...');
      // Ensure the button is clickable and sometimes Mistral needs a real click after typing
      await this.page.click(inputSelector);
      await this.page.keyboard.press('Space');
      await this.page.keyboard.press('Backspace');
      await new Promise(r => setTimeout(r, 500));
      
      await this.page.click(sendButtonSelector);

      console.log('⌛ Waiting for Mistral response...');

      const initialResponsesCount = await this.page.evaluate(() => {
        return document.querySelectorAll('div.prose, .markdown').length;
      });

      try {
        console.log('⏳ Stage 1: Waiting for generation to START...');
        // Mistral response starts when "Stop generation" button appears
        const stopBtnSelector = 'button[aria-label="Stop generation"]';
        
        await this.page.waitForSelector(stopBtnSelector, { timeout: 20000 })
          .catch(() => console.log('⚠️ Could not confirm start within 20s (Stop button not found).'));

        console.log('✅ Stage 2: Waiting for completion...');
        // Generation finishes when "Stop generation" button disappears
        await this.page.waitForFunction(
          (sel) => !document.querySelector(sel),
          { timeout: 300000, polling: 2000 },
          stopBtnSelector
        );

        console.log('🏁 Stage 3: Mistral finished generation.');
        await new Promise((r) => setTimeout(r, 3000));
      } catch (e) {
        console.warn('⚠️ Timed out or error waiting for Mistral response. Reading current state.');
      }

      const responseText = await this.page.evaluate(() => {
        // Responses have a "Like" button in the same container
        const responses = Array.from(document.querySelectorAll('.markdown-container-style, .markdown, [class*="prose"]'));
        if (responses.length === 0) return '';
        return (responses[responses.length - 1] as HTMLElement).innerText;
      });

      if (!responseText || responseText.length < 5) {
        throw new Error('Empty or too short response from Mistral');
      }

      return responseText;
    });

    this.lock = currentLock.catch(() => {});
    return currentLock;
  }

  async parseJson<T>(text: string): Promise<T> {
    const candidates: string[] = [];

    const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)```/gi;
    let match;
    while ((match = codeBlockRegex.exec(text)) !== null) {
      candidates.push(match[1].trim());
    }

    const rawJsonMatch = text.match(/json\s*[\r\n]+(\{[\s\S]*\})/i);
    if (rawJsonMatch) candidates.push(rawJsonMatch[1].trim());

    const braceMatch = text.match(/\{[\s\S]*\}/);
    if (braceMatch) candidates.push(braceMatch[0].trim());

    const bracketMatch = text.match(/\[[\s\S]*\]/);
    if (bracketMatch) candidates.push(bracketMatch[0].trim());

    candidates.push(text.trim());

    for (const candidate of candidates) {
      try {
        if (candidate.startsWith('[') && !candidate.includes('"')) continue;
        return JSON.parse(candidate);
      } catch (e) { /* ignore */ }

      try {
        const repaired = candidate
          .replace(/([^:\[\{,])\s*"(?!\s*[:,\}\]])/g, '$1\\"')
          .replace(/(?<![:\[\{,])\s*"(?!\s*[:,\}\]])/g, '\\"');
        
        if (repaired !== candidate) {
          return JSON.parse(repaired);
        }
      } catch (e) { /* ignore */ }
    }

    console.error('All JSON parsing attempts failed for Mistral response.');
    console.error('Raw response snippet:', text.substring(0, 500) + '...');
    throw new Error('Mistral JSON parsing failed.');
  }

  private async ensureThinkingMode() {
    try {
      // Selector for the model/mode button (Fast, Think, Research)
      // Usually it's a button inside the chat input area
      const modeButtonSelector = 'button[aria-haspopup="menu"] span, button:has(span:has-text("Fast")), button:has(span:has-text("Think")), button:has(span:has-text("Research"))';
      
      console.log('🔍 Checking Mistral mode...');
      
      // Wait for the button that indicates current mode
      // We look for common labels
      const modeText = await this.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const modeBtn = buttons.find(b => 
          b.innerText.includes('Fast') || 
          b.innerText.includes('Think') || 
          b.innerText.includes('Research')
        );
        return modeBtn ? modeBtn.innerText : null;
      });

      if (modeText && modeText.includes('Think')) {
        console.log('✅ Mistral is already in Think mode.');
        return;
      }

      console.log(`🔄 Switching Mistral mode (current: ${modeText || 'unknown'})...`);
      
      // Click the mode button
      await this.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const modeBtn = buttons.find(b => 
          b.innerText.includes('Fast') || 
          b.innerText.includes('Think') || 
          b.innerText.includes('Research')
        );
        if (modeBtn) modeBtn.click();
      });

      // Wait for menu and click "Think"
      const thinkOptionSelector = 'div[role="menuitem"], [role="menuitem"]';
      await this.page.waitForSelector(thinkOptionSelector, { visible: true });
      
      const success = await this.page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('[role="menuitem"]'));
        const thinkItem = items.find(item => item.textContent?.includes('Think')) as HTMLElement;
        if (thinkItem) {
          thinkItem.click();
          return true;
        }
        return false;
      });

      if (success) {
        console.log('✅ Successfully switched to Think mode.');
        // Give it a moment to apply
        await new Promise(r => setTimeout(r, 1000));
      } else {
        console.warn('⚠️ Could not find "Think" option in the menu.');
      }
    } catch (e) {
      console.error('❌ Error ensuring Thinking mode:', e);
    }
  }

  async close() {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.disconnect();
  }
}
