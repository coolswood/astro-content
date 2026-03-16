
import type { Page, Browser } from 'puppeteer-core';
import type { AIProvider, ProviderType } from '../types.js';
import { connectToBrowser, interactWithGemini, parseGeminiJson } from '../gemini-client.js';

export class GeminiProvider implements AIProvider {
  type: ProviderType = 'gemini';
  private browser!: Browser;
  private pages: Map<string, Page> = new Map();
  private locks: Map<string, Promise<any>> = new Map();

  async init() {
    this.browser = await connectToBrowser();
    const page = await this.browser.newPage();
    await page.goto('https://gemini.google.com/app', {
      waitUntil: 'networkidle2',
    });
    this.pages.set('default', page);
  }

  async interact(prompt: string, options?: { model?: string; shouldStartNewChat?: boolean; sessionId?: string }): Promise<string> {
    const sessionId = options?.sessionId || 'default';
    const previousLock = this.locks.get(sessionId) || Promise.resolve();

    const currentLock = previousLock.then(async () => {
      let page = this.pages.get(sessionId);
      
      if (!page) {
        console.log(`🆕 Creating new session page for: ${sessionId}`);
        page = await this.browser.newPage();
        await page.goto('https://gemini.google.com/app', {
          waitUntil: 'networkidle2',
        });
        this.pages.set(sessionId, page);
      }

      return interactWithGemini(
        page,
        prompt,
        options?.model || 'Pro',
        options?.shouldStartNewChat || false
      );
    });

    this.locks.set(sessionId, currentLock.catch(() => {}));
    return currentLock;
  }

  async parseJson<T>(text: string): Promise<T> {
    // Не передаем Page, чтобы избежать нарушения изоляции сессий при авто-исправлении JSON
    return parseGeminiJson<T>(text, undefined, 'Pro');
  }

  async close() {
    for (const page of this.pages.values()) {
      await page.close();
    }
    if (this.browser) await this.browser.disconnect();
  }
}
