
import type { Page, Browser } from 'puppeteer-core';
import type { AIProvider, ProviderType } from '../types.js';
import { connectToBrowser, interactWithGemini, parseGeminiJson } from '../gemini-client.js';

export class GeminiProvider implements AIProvider {
  type: ProviderType = 'gemini';
  private browser!: Browser;
  private page!: Page;

  async init() {
    this.browser = await connectToBrowser();
    this.page = await this.browser.newPage();
    await this.page.goto('https://gemini.google.com/app', {
      waitUntil: 'networkidle2',
    });
  }

  async interact(prompt: string, options?: { model?: string; shouldStartNewChat?: boolean }): Promise<string> {
    return interactWithGemini(
      this.page,
      prompt,
      options?.model || 'Pro',
      options?.shouldStartNewChat || false
    );
  }

  async parseJson<T>(text: string): Promise<T> {
    return parseGeminiJson<T>(text, this.page, 'Pro');
  }

  async close() {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.disconnect();
  }
}
