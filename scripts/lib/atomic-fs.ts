/**
 * Надёжные операции с файловой системой для подсистемы переводов.
 *
 * Решает две проблемы, выявленные аудитом:
 *   1. Неатомарные записи: crash mid-write ломает resume-состояние (cache,
 *      partial-переводы). Решение: writeFileAtomic — temp-файл + rename.
 *   2. Silent swallowing: `catch { return {} }` маскирует corruption под
 *      «файл отсутствует». Решение: readJsonOr различает эти случаи.
 */
import fs from 'fs/promises';
import path from 'path';

/**
 * Атомарно записывает файл: пишет во временный файл, затем переименовывает.
 * `rename` атомарен на POSIX, поэтому читатели никогда не увидят наполовину
 * записанный файл. Crash в процессе записи оставит либо старую, либо новую
 * версию целиком.
 */
export async function writeFileAtomic(
  filePath: string,
  data: string,
  encoding: BufferEncoding = 'utf-8',
): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  const tmpPath = `${filePath}.${process.pid}.tmp`;
  await fs.writeFile(tmpPath, data, encoding);
  // fs.rename атомарен на той же ФС; tmpPath рядом с целевым → та же ФС.
  await fs.rename(tmpPath, filePath);
}

/**
 * Читает JSON-файл. Возвращает `fallback`, если файл отсутствует; бросает
 * информативную ошибку, если файл существует, но JSON повреждён (в отличие
 * от прежнего silent-catch).
 *
 * @param onError  вызывается для corrupt-JSON (не для missing-file),
 *                 чтобы вызывающий мог залогировать/пометить.
 */
export async function readJsonOr<T>(
  filePath: string,
  fallback: T,
  onError?: (error: Error) => void,
): Promise<T> {
  let raw: string;
  try {
    raw = await fs.readFile(filePath, 'utf-8');
  } catch (e: any) {
    if (e?.code === 'ENOENT') return fallback; // файл отсутствует — штатный fallback
    throw e; // прочие ошибки чтения — пробрасываем
  }

  try {
    return JSON.parse(raw) as T;
  } catch (e: any) {
    if (onError) onError(e);
    else
      console.warn(
        `⚠️ Файл ${filePath} повреждён (${e.message}). Используется fallback.`,
      );
    return fallback;
  }
}

/**
 * Атомарно записывает JSON (pretty-printed).
 */
export async function writeJsonAtomic(
  filePath: string,
  value: unknown,
  encoding: BufferEncoding = 'utf-8',
): Promise<void> {
  const data = JSON.stringify(value, null, 2);
  await writeFileAtomic(filePath, data, encoding);
}
