/**
 * Закоммиченный state перевода: per-key хэши ru-значений.
 *
 * Формат: { version: 1, scopes: { "<scope>": { "<path>": "<sha1>" } } }.
 * Scope — «content:<относительный путь файла>» для контента и «ui» для ARB.
 *
 * Ключевое отличие от прежнего ru_snapshot.json: первый прогон ИНИЦИАЛИЗИРУЕТ
 * scope всеми текущими ru-ключами (у снапшота были мёртвые зоны — ключи до его
 * создания туда не попали, и их изменения никогда не детектились).
 */
import path from 'path';
import crypto from 'crypto';
import fs from 'fs/promises';
import { writeJsonAtomic, readJsonOr } from './atomic-fs.js';
import { stableStringify, type Leaves } from './tree.js';

export type ScopeState = Record<string, string>;

interface StateFile {
  version: 1;
  scopes: Record<string, ScopeState>;
}

/** sha1 детерминированной сериализации значения. */
export function hashLeaf(value: string): string {
  return crypto.createHash('sha1').update(stableStringify(value)).digest('hex');
}

export class TranslationState {
  /** Цепочка последовательных записей: save() из параллельных воркеров не перемежается. */
  private saveChain: Promise<void> = Promise.resolve();

  private constructor(
    private filePath: string,
    private data: StateFile,
    private dirty = false,
  ) {}

  /** Читает state; отсутствующий/повреждённый файл = пустой state (scope'ы создадутся). */
  static async load(filePath: string): Promise<TranslationState> {
    const data = await readJsonOr<StateFile>(
      filePath,
      { version: 1, scopes: {} },
      (err) => {
        console.warn(
          `⚠️ State ${filePath} повреждён (${err.message}). ` +
            `Начинаю с пустого state: первый прогон переинициализирует его из ru.`,
        );
      },
    );
    if (!data.scopes) data.scopes = {};
    return new TranslationState(filePath, data);
  }

  /** Возвращает scope; если его ещё нет — инициализирует хэшами текущих ru-листьев. */
  ensureScope(name: string, ruLeaves: Leaves): ScopeState {
    let scope = this.data.scopes[name];
    if (!scope) {
      scope = {};
      for (const p of Object.keys(ruLeaves)) scope[p] = hashLeaf(ruLeaves[p]);
      this.data.scopes[name] = scope;
      this.dirty = true;
      console.log(
        `🆕 State ${name}: инициализирован из текущих переводов (${Object.keys(scope).length} ключей) — детект изменений активируется со следующих правок ru.`,
      );
    }
    return scope;
  }

  /**
   * Изменился ли ru-ключ: записи нет вообще (ключ добавлен в ru после
   * инициализации, а в target уже кто-то вписал перевод вручную) или хэш
   * отличается от текущего значения.
   */
  isChanged(scope: ScopeState, leafPath: string, ruValue: string): boolean {
    const stored = scope[leafPath];
    return stored === undefined || stored !== hashLeaf(ruValue);
  }

  /** Фиксирует актуальность переведённых ключей (вызывается только после записи target). */
  markTranslated(scope: ScopeState, leaves: Leaves): void {
    for (const p of Object.keys(leaves)) {
      scope[p] = hashLeaf(leaves[p]);
    }
    this.dirty = true;
  }

  /** Выкидывает из scope пути, которых больше нет в ru (мёртвые). Возвращает число удалённых. */
  pruneScope(scope: ScopeState, validPaths: Set<string>): number {
    let removed = 0;
    for (const p of Object.keys(scope)) {
      if (!validPaths.has(p)) {
        delete scope[p];
        removed++;
      }
    }
    if (removed > 0) this.dirty = true;
    return removed;
  }

  /** Атомарно пишет state на диск (только если были изменения); вызовы выстраиваются в очередь. */
  async save(): Promise<void> {
    const run = this.saveChain.then(async () => {
      if (!this.dirty) return;
      await fs.mkdir(path.dirname(path.resolve(this.filePath)), { recursive: true });
      await writeJsonAtomic(this.filePath, this.data);
      this.dirty = false;
    });
    this.saveChain = run.catch(() => {}); // цепочка не рвётся на ошибке одной записи
    return run;
  }
}
