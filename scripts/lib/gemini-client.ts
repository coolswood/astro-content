import puppeteer, { Page, Browser } from 'puppeteer-core';

export class TerminalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TerminalError';
  }
}

async function retryAction<T>(
  action: () => Promise<T>,
  retries = 3,
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await action();
    } catch (e: any) {
      const msg = e.message.toLowerCase();
      if (
        msg.includes('detached frame') ||
        msg.includes('disposed') ||
        msg.includes('target closed') ||
        msg.includes('timed out') ||
        msg.includes('context destroyed') ||
        e.name === 'ProtocolError'
      ) {
        if (i === retries - 1) throw e;
        // Silent retry for UI stability
        console.log(
          `⚠️ Puppeteer error ignored, retrying (${i + 1}/${retries}): ${e.message}`,
        );
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
      throw e;
    }
  }
  throw new Error('Retry action failed after all attempts');
}

/**
 * Connects to a running Chrome/Chromium browser via the DevTools protocol.
 * The browser must be started with --remote-debugging-port=9222.
 */
export async function connectToBrowser(): Promise<Browser> {
  const versionResponse = await fetch('http://127.0.0.1:9222/json/version');
  const versionData = await versionResponse.json();
  return puppeteer.connect({
    browserWSEndpoint: versionData.webSocketDebuggerUrl,
    defaultViewport: null,
    protocolTimeout: 300000, // 5 minutes (default is 30s)
  });
}

/**
 * Opens a Gemini page in the browser or returns an existing one.
 */
export async function getGeminiPage(browser: Browser): Promise<Page> {
  return retryAction(async () => {
    const pages = await browser.pages();
    const existing = pages.find((p) => p.url().includes('gemini.google.com'));
    if (existing) {
      await existing.bringToFront();
      return existing;
    }
    const page = await browser.newPage();
    page.setDefaultTimeout(300000);
    page.setDefaultNavigationTimeout(300000);
    await page.goto('https://gemini.google.com/app', {
      waitUntil: 'networkidle2',
    });
    return page;
  });
}

/*

 * Sends a prompt to Gemini and returns the model's text response.
 *
 * @param page - Puppeteer page connected to gemini.google.com
 * @param prompt - The full text prompt to submit
 * @param modelKeyword - Substring to match the model in the selector menu (e.g. 'Быстрая', 'Думающая')
 * @param shouldStartNewChat - Whether to start a new chat before sending
 * @param retries - Number of retry attempts on failure
 */
export async function interactWithGemini(
  page: Page,
  prompt: string,
  modelKeyword: string = 'Pro',
  shouldStartNewChat: boolean = false,
  retries = 3,
): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🤖 Попытка ${attempt}/${retries}...`);
      
      // Обеспечиваем фокус на вкладке
      await page.bringToFront();

      if (shouldStartNewChat) {
        console.log('🆕 Запуск нового чата через переход по ссылке...');
        await page.goto('https://gemini.google.com/app', {
          waitUntil: 'networkidle2',
        });
        await new Promise((r) => setTimeout(r, 2000));
      }

      // Выбор модели
      console.log(`🎯 Выбор модели ${modelKeyword}...`);
      // Небольшая пауза перед первой попыткой выбора модели:
      // меню режимов иногда появляется раньше, чем список моделей полностью прогрузится.
      await new Promise((r) => setTimeout(r, 2000));
      const modelSelectorBtn =
        'button.input-area-switch, button[aria-label="Открыть меню выбора режима"]';
      await page.waitForSelector(modelSelectorBtn, { timeout: 10000 });

      // Проверяем текущую выбранную модель
      let currentModel = await page.evaluate((sel) => {
        return (document.querySelector(sel) as HTMLElement)?.innerText.toLowerCase() || '';
      }, modelSelectorBtn);

      console.log(`ℹ️ Текущая модель в интерфейсе: "${currentModel}"`);

      // Если текущая модель - "Быстрая", пробуем переключить ОБЯЗАТЕЛЬНО
      // Или если она не совпадает с запрошенной
      const requestedModelLower = modelKeyword.toLowerCase();
      const isRequestedFast = requestedModelLower.includes('быстрая') || requestedModelLower.includes('flash') || requestedModelLower === 'fast';
      const isCurrentFast = currentModel.includes('быстрая') || currentModel.includes('flash');

      // Переключаем если текущая модель не совпадает с запрошенной.
      // Если запрошена "быстрая", а текущая "быстрая" — НЕ переключаем.
      const needsSwitch = isRequestedFast ? !isCurrentFast : (isCurrentFast || !currentModel.includes(requestedModelLower));

      if (needsSwitch) {
        console.log(`🔄 Переключение на ${modelKeyword}...`);
        await page.click(modelSelectorBtn);
        await page.waitForSelector('.mat-mdc-menu-item, [role="menuitem"]', {
          timeout: 10000,
        });

        // Ждем 2 секунды, чтобы интерфейс успел обновить доступность моделей (disabled/enabled)
        await new Promise((r) => setTimeout(r, 2000));

        const selectedResult = await page.evaluate((keyword) => {
          const items = Array.from(
            document.querySelectorAll('.mat-mdc-menu-item, [role="menuitem"]'),
          );

          let target: HTMLElement | undefined;
          const kLower = keyword.toLowerCase();
          const isFastRequested = kLower.includes('быстрая') || kLower.includes('flash') || kLower === 'fast';

          // Поиск основной цели
          for (const item of items) {
            const el = item as HTMLElement;
            const text = el.innerText.toLowerCase();
            if (el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true' || el.classList.contains('mat-mdc-menu-item-disabled')) continue;

            if (isFastRequested) {
              if (text.includes('быстрая') || text.includes('flash')) {
                target = el;
                break;
              }
            } else {
              if (text.includes('быстрая') || text.includes('flash')) continue;
              if (text.includes(kLower)) {
                target = el;
                break;
              }
            }
          }

          // Попробовать фолбеки если не нашли
          if (!target && !isFastRequested) {
            const fallback = kLower === 'pro' ? 'думающая' : (kLower.includes('думающ') ? 'pro' : null);
            if (fallback) {
              for (const item of items) {
                const el = item as HTMLElement;
                const text = el.innerText.toLowerCase();
                if (el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true' || el.classList.contains('mat-mdc-menu-item-disabled')) continue;
                if (text.includes('быстрая') || text.includes('flash')) continue;
                if (text.includes(fallback)) {
                  target = el;
                  break;
                }
              }
            }
          }

          if (target) {
            target.click();
            return { success: true, name: target.innerText };
          }
          return { success: false };
        }, modelKeyword);

        if (selectedResult.success) {
          console.log(`✅ Выбрана модель: ${selectedResult.name}`);
          await new Promise((r) => setTimeout(r, 2000));
        } else {
          throw new TerminalError(
            `❌ КРИТИЧЕСКАЯ ОШИБКА: Ни Pro, ни Думающая модели не доступны. Использование "Быстрой" модели запрещено.`,
          );
        }
      } else {
        console.log(`✅ Модель ${modelKeyword} уже выбрана.`);
      }

      // Финальная проверка перед отправкой (только если НЕ запрашивали быструю)
      currentModel = await page.evaluate((sel) => {
        return (document.querySelector(sel) as HTMLElement)?.innerText.toLowerCase() || '';
      }, modelSelectorBtn);

      if (!isRequestedFast && (currentModel.includes('быстрая') || currentModel.includes('flash'))) {
        throw new TerminalError(
          `❌ КРИТИЧЕСКАЯ ОШИБКА: Обнаружена модель "Быстрая" непосредственно перед отправкой (запрашивалась ${modelKeyword}). Обрыв.`,
        );
      }

      // Ввод и отправка промпта
      console.log('⌨️ Отправка сообщения...');
      const inputSelector = '.ql-editor';
      await retryAction(() => page.waitForSelector(inputSelector));
      await retryAction(() => page.click(inputSelector));
      await page.evaluate(
        (sel, text) => {
          const el = document.querySelector(sel);
          if (el) (el as HTMLElement).innerText = text;
        },
        inputSelector,
        prompt,
      );
      await page.keyboard.press('Space');
      await page.keyboard.press('Backspace');

      const sendBtnSelector = 'button.send-button';
      await retryAction(() => page.waitForSelector(sendBtnSelector));
      await retryAction(() => page.click(sendBtnSelector));

      // Ожидание ответа
      console.log('⌛ Ожидание ответа...');
      const thoughtsBtnSelector = 'button.thoughts-header-button';
      try {
        await retryAction(() =>
          page.waitForSelector(thoughtsBtnSelector, { timeout: 20000 }),
        );
        console.log('🤔 Идёт процесс рассуждения/генерации...');
        await page.waitForFunction(
          (sel) => {
            const btn = document.querySelector(sel);
            const label =
              btn?.querySelector('.thoughts-header-button-label')
                ?.textContent || '';
            return (
              label.includes('процесс') ||
              label.includes('reasoning') ||
              label.includes('размышления')
            );
          },
          { timeout: 300000, polling: 2000 },
          thoughtsBtnSelector,
        );
      } catch {
        console.log('ℹ️ Блок рассуждений не появился или уже прошел.');
      }

      console.log('✍️ Чтение ответа...');
      // page.on('console', msg => console.log(`[Browser]: ${msg.text()}`));

      // Ждем, пока исчезнет кнопка "Остановить генерацию" (если она есть) и появится текст
      await page.waitForFunction(
        () => {
          const stopBtns = Array.from(
            document.querySelectorAll('button'),
          ).filter(
            (b) => {
              const label = b.getAttribute('aria-label')?.toLowerCase() || '';
              const title = b.getAttribute('title')?.toLowerCase() || '';
              const isStop = label.includes('остановить') || label.includes('stop') || title.includes('остановить') || title.includes('stop');
              if (isStop) {
                 console.log(`Найдена стоп-кнопка: Label="${label}", Title="${title}", Text="${(b as HTMLElement).innerText}"`);
              }
              return isStop;
            }
          );
          if (stopBtns.length > 0) return false; // Еще генерирует

          const responses = document.querySelectorAll('.model-response-text');
          return (
            responses.length > 0 &&
            (responses[responses.length - 1] as HTMLElement).innerText.length >
              0
          );
        },
        { timeout: 300000, polling: 2000 },
      );

      // Дополнительная стабилизация: ждем, пока длина текста перестанет меняться в течение 5 секунд
      let previousLength = 0;
      let stableCount = 0;
      let attempts = 0;
      const maxAttempts = 30; // 30 секунд максимум

      while (stableCount < 5 && attempts < maxAttempts) {
        attempts++;
        await new Promise((r) => setTimeout(r, 1000));

        const { currentLength, hasCopyButton } = await page.evaluate(() => {
          const responses = document.querySelectorAll('.model-response-text');
          const latestResponse =
            responses.length > 0
              ? (responses[responses.length - 1] as HTMLElement)
              : null;

          let localHasCopy = false;
          if (latestResponse) {
            let parent = latestResponse.parentElement;
            for (let i = 0; i < 3 && parent; i++) {
              const btns = Array.from(parent.querySelectorAll('button'));
              const found = btns.some(b => {
                const label = (b.getAttribute('aria-label') || '').toLowerCase();
                const title = (b.getAttribute('title') || '').toLowerCase();
                return label.includes('копировать') || label.includes('copy') || title.includes('копировать') || title.includes('copy');
              });
              if (found) {
                localHasCopy = true;
                break;
              }
              parent = parent.parentElement;
            }
          }

          return {
            currentLength: latestResponse ? latestResponse.innerText.length : 0,
            hasCopyButton: localHasCopy,
          };
        });

        // console.log(`⏳ Стабилизация (${attempts}/${maxAttempts}): Длина=${currentLength}, Пред=${previousLength}, Счетчик=${stableCount}, Кнопка=${hasCopyButton}`);

        if (currentLength === previousLength) {
          stableCount++;
          if (hasCopyButton && stableCount >= 2) {
            console.log('✅ Найдена кнопка "Копировать", генерация завершена досрочно.');
            break;
          }
        } else {
          stableCount = 0;
          previousLength = currentLength;
        }
      }

      if (attempts >= maxAttempts) {
        console.warn('⚠️ Превышено время стабилизации ответа. Будет совершен выход из цикла.');
      }

      console.log('✅ Генерация завершена.');

      const responseText = await page.evaluate(() => {
        const responses = document.querySelectorAll('.model-response-text');
        return (responses[responses.length - 1] as HTMLElement).innerText;
      });

      if (!responseText || responseText.length < 10) {
        throw new Error('Пустой или слишком короткий ответ от Gemini.');
      }

      return responseText;
    } catch (error) {
      console.error(`❌ Ошибка на попытке ${attempt}:`, error);
      if (attempt === retries) throw error;
      console.log('🔄 Перезагрузка страницы для повторной попытки...');
      try {
        await page.reload({ waitUntil: 'networkidle2' });
      } catch (reloadError: any) {
        console.error(
          '❌ Ошибка при перезагрузке страницы:',
          reloadError.message,
        );
        try {
          console.log('🌐 Попытка прямого перехода на главную Gemini...');
          await page.goto('https://gemini.google.com/app', {
            waitUntil: 'networkidle2',
          });
        } catch (gotoError: any) {
          console.error('❌ Критческая ошибка навигации:', gotoError.message);
          if (attempt === retries) throw reloadError;
        }
      }
    }
  }
  return '';
}

/**
 * Clean and parse a string that might contain JSON wrapped in markdown or other text.
 * If parsing fails, it tries to repair it or asks Gemini to fix it.
 */
export async function parseGeminiJson<T>(
  text: string,
  page?: Page,
  modelKeyword: string = 'Pro',
): Promise<T> {
  const tryParse = (rawText: string): T | null => {
    // Ищем первый подходящий JSON-блок (объект или массив)
    const match = rawText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    const jsonString = match ? match[0] : rawText;
    const cleanedText = jsonString
      .replace(/^JSON/i, '')
      .replace(/^```json/i, '')
      .replace(/```$/i, '')
      .trim();

    // Дополнительная очистка: экранируем кавычки внутри HTML-атрибутов
    const preprocessedText = cleanedText.replace(
      /(\s[a-z-]+)="([^"]+)"/gi,
      '$1=\\"$2\\"',
    );

    try {
      return JSON.parse(preprocessedText);
    } catch (e) {
      try {
        const repaired = repairJson(preprocessedText);
        return JSON.parse(repaired);
      } catch (e2) {
        return null;
      }
    }
  };

  const parsed = tryParse(text);
  if (parsed !== null) return parsed;

  // Если не распарсилось и у нас есть доступ к странице, просим Gemini исправить
  if (page) {
    console.log('⚠️ Ошибка парсинга JSON. Просим Gemini исправить...');
    for (let fixAttempt = 1; fixAttempt <= 2; fixAttempt++) {
      try {
        const fixPrompt = `В твоем предыдущем ответе была ошибка в структуре JSON. 
Пожалуйста, исправь ее и выведи СТРОГО только валидный JSON объект, без лишнего текста и пояснений. 
Вот твой предыдущий (ошибочный) ответ:
\n${text}`;

        const fixedRaw = await interactWithGemini(
          page,
          fixPrompt,
          modelKeyword,
          false, // Продолжаем в том же чате
        );

        const fixedParsed = tryParse(fixedRaw);
        if (fixedParsed !== null) {
          console.log('✅ Gemini исправил JSON ошибку.');
          return fixedParsed;
        }
      } catch (fixError) {
        console.error(`❌ Попытка исправления ${fixAttempt} не удалась:`, fixError);
      }
    }
  }

  console.error('❌ ОШИБКА ПАРСИНГА JSON. СЫРОЙ ОТВЕТ ОТ GEMINI:');
  console.error('-------------------------------------------');
  console.error(text);
  console.error('-------------------------------------------');
  throw new Error(
    `No valid JSON object found in response after repair attempts. Raw response logged above.`,
  );
}

/**
 * Пытается закрыть открытые фигурные и квадратные скобки (и строки) в обрезанном JSON.
 */
function repairJson(json: string): string {
  let text = json.trim();
  const stack: string[] = [];
  let inString = false;
  let escaped = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === '\\') {
      escaped = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (char === '{') stack.push('}');
      else if (char === '[') stack.push(']');
      else if (char === '}') {
        if (stack[stack.length - 1] === '}') stack.pop();
      } else if (char === ']') {
        if (stack[stack.length - 1] === ']') stack.pop();
      }
    }
  }

  let result = text;
  // Если мы остались внутри строки, закрываем её
  if (inString) {
    result += '"';
  }

  // Убираем возможную запятую в конце перед закрытием структур
  result = result.replace(/,\s*$/, '');

  // Закрываем скобки в обратном порядке
  return result + stack.reverse().join('');
}
