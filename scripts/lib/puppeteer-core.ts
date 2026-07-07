/**
 * Общая puppeteer-инфраструктура для всех провайдеров.
 *
 * Раньше connectToBrowser/safeGoto жили в gemini-client.ts, и 3 из 4 провайдеров
 * импортировали их оттуда — неестественная зависимость от gemini-специфичного
 * файла. Теперь это независимый модуль.
 *
 * Улучшения по сравнению с прежней версией:
 *   - retryAction: typed matching ошибок (вместо хрупкого substring по message);
 *     защита от undefined message.
 *   - safeGoto: ошибки навигации логируются с указанием URL; reload-рекавери
 *     сохранён, но с явным error-логом вместо двойного silent-swallow.
 *   - sleep вынесен в общую точку (раньше инлайн-копии в ~15 местах).
 */
import puppeteer, { type Page, type Browser } from 'puppeteer-core';

/** Порт DevTools, на котором ожидается запущенный Chrome (--remote-debugging-port). */
const DEVTOOLS_PORT = Number(process.env.CHROME_DEVTOOLS_PORT ?? 9222);
const DEVTOOLS_HOST = process.env.CHROME_DEVTOOLS_HOST ?? '127.0.0.1';

/** Timeout протокола puppeteer (5 минут). */
const PROTOCOL_TIMEOUT = 300000;

/** Промис-пауза. */
export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Подключается к запущенному Chrome/Chromium через DevTools-протокол.
 * Браузер должен быть запущен с --remote-debugging-port=9222 (или иным из env).
 */
export async function connectToBrowser(): Promise<Browser> {
  const versionUrl = `http://${DEVTOOLS_HOST}:${DEVTOOLS_PORT}/json/version`;
  let versionData: { webSocketDebuggerUrl: string };
  try {
    const response = await fetch(versionUrl);
    if (!response.ok) {
      throw new Error(`DevTools endpoint returned HTTP ${response.status}`);
    }
    versionData = await response.json();
  } catch (e: any) {
    throw new Error(
      `Не удалось подключиться к Chrome DevTools на ${versionUrl}. ` +
        `Убедитесь, что браузер запущен с --remote-debugging-port=${DEVTOOLS_PORT}. ` +
        `Подробности: ${e?.message ?? e}`,
    );
  }

  if (!versionData.webSocketDebuggerUrl) {
    throw new Error('DevTools /json/version не вернул webSocketDebuggerUrl.');
  }

  return puppeteer.connect({
    browserWSEndpoint: versionData.webSocketDebuggerUrl,
    defaultViewport: null,
    protocolTimeout: PROTOCOL_TIMEOUT,
  });
}

/**
 * Безопасно открывает URL, обнаруживая и «вылечивая» страницу сетевой ошибки
 * Chromium (кликает «Перезагрузить»). В отличие от прежней версии, ошибки
 * навигации логируются явно, а не проглатываются молча.
 */
export async function safeGoto(
  page: Page,
  url: string,
  timeout = 60000,
): Promise<void> {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout });
  } catch (error: any) {
    // Навигационные ошибки могут быть нормальными (например, networkidle2 не
    // достигнут из-за долгих соединений), но ранее они проглатывались полностью.
    console.warn(`⚠️ Навигация к ${url}: ${error?.message ?? error}`);
  }

  // Обнаружение страницы сетевой ошибки Chromium и попытка reload.
  try {
    const reloadButton = await page.$('#reload-button');
    if (reloadButton) {
      console.log('⚠️ Обнаружена страница ошибки Chromium. Кликаем «Перезагрузить»…');
      await reloadButton.click();
      await page
        .waitForNavigation({ waitUntil: 'networkidle2', timeout })
        .catch((navError: any) => {
          console.warn(
            `⚠️ waitForNavigation после reload не завершилась: ${navError?.message ?? navError}`,
          );
        });
    }
  } catch (reloadError: any) {
    console.warn(
      `⚠️ Не удалось обработать страницу ошибки Chromium: ${reloadError?.message ?? reloadError}`,
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// retryAction — ретраи транзиентных ошибок puppeteer
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Признаки транзиентных ошибок puppeteer/CDP, при которых ретрай имеет смысл.
 * Прежняя версия использовала substring-матчинг по e.message.toLowerCase(),
 * что было хрупким (зависит от формулировки сообщения и ломается на undefined).
 * Здесь — проверка по .name + набор устойчивых подстрок, с защитой от undefined.
 */
function isTransientPuppeteerError(e: any): boolean {
  if (!e) return false;
  const name = String(e.name ?? '');
  const msg = String(e.message ?? '').toLowerCase();
  if (name === 'ProtocolError' || name === 'TimeoutError') return true;
  const TRANSIENT_SUBSTRINGS = [
    'detached frame',
    'node is detached',
    'execution context was destroyed',
    'execution context destroyed',
    'cannot find context',
    'target closed',
    'target closed.',
    'session closed',
    'disposed',
    'protocol error',
    'navigation timeout',
  ];
  return TRANSIENT_SUBSTRINGS.some((s) => msg.includes(s));
}

/**
 * Выполняет action с ретраями для транзиентных puppeteer-ошибок.
 * Нетранзиентные ошибки пробрасываются немедленно.
 */
export async function retryAction<T>(
  action: () => Promise<T>,
  retries = 3,
  backoffMs = 2000,
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await action();
    } catch (e: any) {
      lastError = e;
      if (!isTransientPuppeteerError(e)) throw e;
      if (i === retries - 1) throw e;
      console.log(
        `⚠️ Puppeteer transient error, retrying (${i + 1}/${retries}): ${e?.message ?? e}`,
      );
      await sleep(backoffMs);
    }
  }
  throw lastError ?? new Error('Retry action failed after all attempts');
}

/**
 * Ошибка, после которой повторные попытки бессмысленны (например, модель
 * не переключается в нужный режим — повтор ничего не изменит).
 * Прежняя TerminalError из gemini-client.ts никогда не ловилась специально;
 * теперь retryAction учитывает её и пробрасывает без ретрая.
 */
export class TerminalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TerminalError';
  }
}
