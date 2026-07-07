/**
 * Асинхронные локи и менеджер сессий для провайдеров.
 *
 * Решает CRITICAL-баг: прежде Gemini-провайдер имел per-session лок для `interact`,
 * но `parseJson` вызывал модель напрямую через interactWithGemini, обходя лок —
 * из-за чего параллельный interact и self-heal-запрос ломали друг друга на одной
 * странице. SessionManager оборачивает И interact, И parseJson в один лок на сессию.
 *
 * Конструкция «chain-of-promises»: каждый вызов ждёт предыдущий в той же сессии,
 * что сериализует доступ к странице. Ошибка одного вызова не ломает цепочку
 * (ловим .catch и подменяем на resolved-промис).
 */

/**
 * Лок на цепочке промисов. Гарантирует, что вложенные fn выполняются строго
 * последовательно. Ошибка одной задачи не блокирует следующие.
 */
export class AsyncLock {
  private tail: Promise<void> = Promise.resolve();

  /** Запускает fn, дождавшись завершения всех предыдущих задач этого лока. */
  async withLock<T>(fn: () => Promise<T>): Promise<T> {
    // Сначала «занимаем очередь»: следующий вызов будет ждать наш currentLock.
    const previous = this.tail;
    let resolveTail!: () => void;
    this.tail = new Promise<void>((resolve) => {
      resolveTail = resolve;
    });

    try {
      await previous;
      return await fn();
    } finally {
      // Независимо от успеха/провала fn — разблокируем очередь.
      resolveTail();
    }
  }
}

/**
 * Менеджер сессий: отображение sessionId → { page, lock }.
 * Используется провайдерами для:
 *   - Gemini: настоящая мульти-сессия (stage1/stage2/stage3/...);
 *   - остальные: единая сессия 'default'.
 *
 * Все операции interact/parseJson для одной сессии идут через один лок,
 * что устраняет race condition между ними.
 */
export interface SessionEntry {
  /** Зарезервированная страница (создаётся лениво через createPage). */
  page: any;
  /** Лок, сериализующий операции в пределах этой сессии. */
  lock: AsyncLock;
}

export class SessionManager {
  private sessions = new Map<string, SessionEntry>();
  private createPage: () => Promise<any>;

  constructor(createPage: () => Promise<any>) {
    this.createPage = createPage;
  }

  /**
   * Возвращает (или создаёт) сессию по id и выполняет fn под её локом.
   * Это единственный санкционированный способ трогать страницу сессии —
   * гарантирует, что interact и parseJson не столкнутся.
   */
  async withSession<T>(sessionId: string, fn: (entry: SessionEntry) => Promise<T>): Promise<T> {
    const entry = await this.getOrCreate(sessionId);
    return entry.lock.withLock(() => fn(entry));
  }

  /** Возвращает сессию, создавая страницу при первом обращении. */
  private async getOrCreate(sessionId: string): Promise<SessionEntry> {
    let entry = this.sessions.get(sessionId);
    if (!entry) {
      const page = await this.createPage();
      entry = { page, lock: new AsyncLock() };
      this.sessions.set(sessionId, entry);
    }
    return entry;
  }

  /** Все созданные страницы (для корректного close()). */
  pages(): any[] {
    return [...this.sessions.values()].map((e) => e.page);
  }

  /** Доступ к странице сессии без создания — для parseJson/self-heal. */
  getPage(sessionId: string): any | undefined {
    return this.sessions.get(sessionId)?.page;
  }
}
