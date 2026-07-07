import type { Browser, Page } from 'puppeteer-core';
import type {
  AIProvider,
  InteractOptions,
  ParseJsonOptions,
  ProviderType,
} from '../types.js';
import { connectToBrowser, safeGoto, retryAction, sleep } from '../puppeteer-core.js';
import { SessionManager } from '../async-lock.js';
import { parseWithRepair } from '../json-repair.js';

/**
 * Базовый класс для puppeteer-провайдеров чат-ботов (ChatGPT/Claude/Mistral).
 *
 * Инкапсулирует общий skeleton interact():
 *   acquire-lock → optional reset → bringToFront → waitForSelector(input) →
 *   insertPrompt → Space+Backspace trigger → clickSend →
 *   waitForGenerationStart → waitForGenerationComplete → settle →
 *   readResponse → min-length guard.
 *
 * Подкласс описывает только специфику: URL, селекторы, технику вставки текста,
 * сигналы старта/завершения генерации. Раньше всё это дублировалось 4 раза.
 *
 * Многократно исправляет:
 *   - гонку interact/parseJson (через SessionManager — один лок на сессию);
 *   - drift интерфейса (теперь все опции в InteractOptions, ничто не молча
 *     игнорируется);
 *   - 4 копии JSON-репеяровки (дефолтный parseJson через parseWithRepair);
 *   - missing safeGoto-рекавери у Claude/Mistral (теперь все через navigate()).
 */
export abstract class BasePuppeteerProvider implements AIProvider {
  abstract type: ProviderType;

  /** URL начальной страницы провайдера. */
  protected abstract startUrl: string;
  /** Селектор поля ввода промпта. */
  protected abstract inputSelector: string;
  /** Селектор кнопки отправки. */
  protected abstract sendButtonSelector: string;
  /** Селектор контейнера с ответом (можно несколько через запятую). */
  protected abstract responseSelector: string;

  /** Минимальная длина ответа; иначе бросаем ошибку. */
  protected minResponseLength = 5;
  /** Пауза после завершения генерации перед чтением (мс). */
  protected settleMs = 2000;
  /** Пауза после resetForNewChat перед использованием страницы (мс). Дать SPA
   *  время полностью отрендерить composer. */
  protected postResetSettleMs = 3000;

  protected browser!: Browser;
  /** Менеджер сессий: сериализует interact и parseJson на одной странице. */
  protected sessions!: SessionManager;

  async init(): Promise<void> {
    this.browser = await connectToBrowser();
    // По умолчанию одна страница 'default'. Подклассы (Gemini) могут
    // расширить до мульти-сессии, переопределив init/createPage.
    this.sessions = new SessionManager(() => this.createPage());
    // Предсоздаём default-страницу, чтобы init гарантированно открыл вкладку.
    await this.sessions.withSession('default', async () => {});
  }

  /** Создаёт новую страницу и открывает startUrl. */
  protected async createPage(): Promise<Page> {
    const page = await this.browser.newPage();
    await this.navigate(page, this.startUrl);
    return page;
  }

  /** Навигация. По умолчанию safeGoto (с рекавери страницы ошибки Chromium). */
  protected async navigate(page: Page, url: string): Promise<void> {
    await safeGoto(page, url);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // interact() — общий skeleton
  // ─────────────────────────────────────────────────────────────────────────
  async interact(prompt: string, options: InteractOptions = {}): Promise<string> {
    const sessionId = options.sessionId ?? 'default';
    return this.sessions.withSession(sessionId, async ({ page }) => {
      return this.runInteraction(page, prompt, options);
    });
  }

  /** Полный цикл взаимодействия на конкретной странице. */
  protected async runInteraction(
    page: Page,
    prompt: string,
    options: InteractOptions,
  ): Promise<string> {
    if (options.shouldStartNewChat) {
      console.log(`🔄 Starting new chat on ${this.type}...`);
      await this.resetForNewChat(page);
      // Дать SPA время полностью отрисовать composer после навигации/сброса.
      // Без этого waitForSelector(input) срабатывает до того, как редактор
      // станет интерактивным, и ввод «теряется» (особенно актуально для ChatGPT).
      await sleep(this.postResetSettleMs);
    }

    await page.bringToFront();

    // Хук перед отправкой (например, выбор режима модели у Mistral).
    await this.onBeforeSend(page, options);

    // Ввод промпта.
    console.log(`⌨️ Inserting prompt to ${this.type} (${prompt.length} chars)...`);
    await retryAction(() => page.waitForSelector(this.inputSelector));
    await this.insertPrompt(page, this.inputSelector, prompt);
    await this.triggerSendButton(page);

    // Отправка.
    console.log(`🚀 Sending message to ${this.type}...`);
    await this.clickSend(page, this.sendButtonSelector);

    // Ожидание генерации.
    console.log(`⌛ Waiting for ${this.type} response...`);
    await this.waitForGenerationStart(page);
    await this.waitForGenerationComplete(page);
    console.log(`🏁 ${this.type} finished generation.`);

    await sleep(this.settleMs);

    // Чтение ответа.
    const responseText = await this.readLastResponse(page);
    if (!responseText || responseText.length < this.minResponseLength) {
      throw new Error(`Empty or too short response from ${this.type}`);
    }
    return responseText;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // parseJson() — общий, через parseWithRepair. Подклассы могут расширить
  // self-heal'ом через модель (например, Gemini).
  // ─────────────────────────────────────────────────────────────────────────
  async parseJson<T>(text: string, _options?: ParseJsonOptions): Promise<T> {
    return parseWithRepair<T>(text);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Хуки: дефолтные реализации, переопределяемые подклассами
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Вставка промпта. Дефолтная техника — execCommand('insertText') с фолбеком
   * на innerText/value (ChatGPT/Claude/Mistral). Gemini переопределяет.
   */
  protected async insertPrompt(
    page: Page,
    selector: string,
    text: string,
  ): Promise<void> {
    await page.focus(selector);
    await page.evaluate(
      (sel, promptText) => {
        const el = document.querySelector(sel) as
          | (HTMLElement & { value?: string })
          | null;
        if (!el) return;
        el.focus();
        el.innerText = '';
        const success = document.execCommand('insertText', false, promptText);
        if (!success) {
          if ('value' in el && typeof el.value === 'string') {
            el.value = promptText;
          } else {
            el.innerText = promptText;
          }
        }
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      },
      selector,
      text,
    );
  }

  /**
   * Универсальный трюк активации кнопки отправки: Space+Backspace после ввода.
   * ChatGPT/Claude/Mistral — все используют это.
   */
  protected async triggerSendButton(page: Page): Promise<void> {
    await page.keyboard.press('Space');
    await page.keyboard.press('Backspace');
  }

  /**
   * Клик по кнопке отправки. Дефолт — waitForSelector + page.click с фолбеком
   * на evaluate-click (на случай disabled/aria-disabled).
   */
  protected async clickSend(page: Page, selector: string): Promise<void> {
    await retryAction(() => page.waitForSelector(selector));
    try {
      const isDisabled = await page.evaluate((sel) => {
        const btn = document.querySelector(sel);
        return (
          !!btn && (btn.hasAttribute('disabled') || btn.getAttribute('aria-disabled') === 'true')
        );
      }, selector);
      if (isDisabled) {
        console.log('⚠️ Send button disabled, force-clicking via evaluate...');
        await page.evaluate((sel) => {
          (document.querySelector(sel) as HTMLElement | null)?.click();
        }, selector);
      } else {
        await page.click(selector);
      }
    } catch {
      console.warn('⚠️ Standard click failed, using evaluate click');
      await page.evaluate((sel) => {
        (document.querySelector(sel) as HTMLElement | null)?.click();
      }, selector);
    }
  }

  /** Сброс состояния для нового чата. Дефолт — повторная навигация на startUrl. */
  protected async resetForNewChat(page: Page): Promise<void> {
    await this.navigate(page, this.startUrl);
  }

  /** Хук перед отправкой (выбор модели/режима). По умолчанию no-op. */
  protected async onBeforeSend(_page: Page, _options: InteractOptions): Promise<void> {
    /* no-op */
  }

  /** Ожидание старта генерации. По умолчанию — короткое ожидание ответа. */
  protected async waitForGenerationStart(page: Page): Promise<void> {
    try {
      await page.waitForSelector(this.responseSelector, { timeout: 20000 });
    } catch {
      console.log('⚠️ Could not confirm generation start within 20s.');
    }
  }

  /**
   * Ожидание завершения генерации. Дефолт — stabilityLoop (параметризованный):
   * ждём, пока длина последнего ответа не перестанет меняться N секунд.
   * Подклассы с явным сигналом (stop-button) переопределяют.
   */
  protected async waitForGenerationComplete(page: Page): Promise<void> {
    await this.stabilityLoop(page, {
      stableSeconds: 4,
      maxSeconds: 300,
      pollMs: 1000,
    });
  }

  /** Параметризованный цикл стабилизации длины ответа. */
  protected async stabilityLoop(
    page: Page,
    opts: { stableSeconds: number; maxSeconds: number; pollMs: number; earlyBreakOnCopy?: boolean },
  ): Promise<void> {
    let previousLength = 0;
    let stableSeconds = 0;

    for (let sec = 0; sec < opts.maxSeconds; sec++) {
      await sleep(opts.pollMs);

      const state = await page.evaluate(
        (sel, earlyCopy) => {
          const responses = document.querySelectorAll(sel);
          const latest =
            responses.length > 0
              ? (responses[responses.length - 1] as HTMLElement)
              : null;
          const length = latest ? latest.innerText.length : 0;

          let hasCopy = false;
          if (earlyCopy && latest) {
            let parent: HTMLElement | null = latest.parentElement;
            for (let i = 0; i < 3 && parent; i++) {
              const found = Array.from(parent.querySelectorAll('button')).some(
                (b) => {
                  const label = (b.getAttribute('aria-label') || '').toLowerCase();
                  const title = (b.getAttribute('title') || '').toLowerCase();
                  return (
                    label.includes('копировать') ||
                    label.includes('copy') ||
                    title.includes('копировать') ||
                    title.includes('copy')
                  );
                },
              );
              if (found) {
                hasCopy = true;
                break;
              }
              parent = parent.parentElement;
            }
          }
          return { length, hasCopy };
        },
        this.responseSelector,
        opts.earlyBreakOnCopy ?? false,
      );

      if (state.length !== previousLength) {
        stableSeconds = 0;
        previousLength = state.length;
      } else if (state.length > 0) {
        stableSeconds++;
        if (opts.earlyBreakOnCopy && state.hasCopy && stableSeconds >= 2) {
          console.log('✅ Copy button detected, generation finished early.');
          return;
        }
        if (stableSeconds >= opts.stableSeconds) {
          return;
        }
      }

      if (sec % 10 === 0 && sec > 0) {
        console.log(
          `⏳ ${this.type} generating... length: ${state.length} (stable ${stableSeconds}s)`,
        );
      }
    }
    console.warn('⚠️ Stability loop: max time reached, proceeding anyway.');
  }

  /** Чтение последнего ответа. */
  protected async readLastResponse(page: Page): Promise<string> {
    return page.evaluate((sel) => {
      const responses = document.querySelectorAll(sel);
      if (responses.length === 0) return '';
      return (responses[responses.length - 1] as HTMLElement).innerText;
    }, this.responseSelector);
  }

  async close(): Promise<void> {
    for (const page of this.sessions.pages()) {
      try {
        await page.close();
      } catch {
        // страница уже закрыта
      }
    }
    if (this.browser) await this.browser.disconnect();
  }
}
