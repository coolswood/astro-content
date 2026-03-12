import puppeteer, { Page, Browser } from 'puppeteer-core';

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

      // Если текущая модель - "Быстрая" или она не совпадает с запрошенной, пробуем переключить
      if (currentModel.includes('быстрая') || !currentModel.includes(modelKeyword.toLowerCase())) {
        console.log(`🔄 Переключение на ${modelKeyword}...`);
        await page.click(modelSelectorBtn);
        await page.waitForSelector('.mat-mdc-menu-item, [role="menuitem"]', {
          timeout: 10000,
        });

        const selectedResult = await page.evaluate((keyword) => {
          const items = Array.from(
            document.querySelectorAll('.mat-mdc-menu-item, [role="menuitem"]'),
          );

          const findEnabledItem = (k: string) =>
            items.find((item) => {
              const el = item as HTMLElement;
              const text = el.innerText.toLowerCase();
              // Игнорируем "Быстрая" (Flash) всегда
              if (text.includes('быстрая')) return false;

              const isDisabled =
                el.hasAttribute('disabled') ||
                el.getAttribute('aria-disabled') === 'true' ||
                el.classList.contains('mat-mdc-menu-item-disabled');
              return text.includes(k.toLowerCase()) && !isDisabled;
            }) as HTMLElement;

          let target = findEnabledItem(keyword);

          // Если запрошенная модель недоступна, пробуем разрешенный фолбек
          if (!target) {
            // Если была запрошена Pro, пробуем Думающую
            if (keyword.toLowerCase() === 'pro') {
              target = findEnabledItem('Думающая');
            }
            // Если была запрошена Думающая, пробуем Pro
            else if (keyword.toLowerCase().includes('думающ')) {
              target = findEnabledItem('Pro');
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
          throw new Error(
            `❌ КРИТИЧЕСКАЯ ОШИБКА: Ни Pro, ни Думающая модели не доступны. Использование "Быстрой" модели запрещено.`,
          );
        }
      } else {
        console.log(`✅ Модель ${modelKeyword} уже выбрана.`);
      }

      // Финальная проверка перед отправкой
      currentModel = await page.evaluate((sel) => {
        return (document.querySelector(sel) as HTMLElement)?.innerText.toLowerCase() || '';
      }, modelSelectorBtn);

      if (currentModel.includes('быстрая')) {
        throw new Error(
          `❌ КРИТИЧЕСКАЯ ОШИБКА: Обнаружена модель "Быстрая" непосредственно перед отправкой. Обрыв.`,
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
      // Ждем, пока исчезнет кнопка "Остановить генерацию" (если она есть) и появится текст
      await page.waitForFunction(
        () => {
          const stopBtns = Array.from(
            document.querySelectorAll('button'),
          ).filter(
            (b) =>
              b
                .getAttribute('aria-label')
                ?.toLowerCase()
                .includes('остановить') ||
              b.getAttribute('aria-label')?.toLowerCase().includes('stop'),
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
      while (stableCount < 5) {
        await new Promise((r) => setTimeout(r, 1000));

        const { currentLength, hasCopyButton } = await page.evaluate(() => {
          const responses = document.querySelectorAll('.model-response-text');
          const latestResponse =
            responses.length > 0
              ? (responses[responses.length - 1] as HTMLElement)
              : null;

          // Gemini UI injects .copy-button or a button with Copy/Копировать label when done
          const copyBtns = Array.from(
            document.querySelectorAll('button'),
          ).filter((b) => {
            const label = (b.getAttribute('aria-label') || '').toLowerCase();
            return label.includes('копировать') || label.includes('copy');
          });

          return {
            currentLength: latestResponse ? latestResponse.innerText.length : 0,
            hasCopyButton: copyBtns.length >= responses.length, // Rough check if the latest one has buttons
          };
        });

        if (currentLength > 0 && currentLength === previousLength) {
          stableCount++;
          // Если мы уверены, что появились финальные кнопки интерфейса — можно не ждать все 5 секунд
          if (hasCopyButton && stableCount >= 2) break;
        } else {
          stableCount = 0;
          previousLength = currentLength;
        }
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
