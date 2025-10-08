import fs from 'fs/promises';
import path from 'path';

export async function loadI18nJson<T>(lang: string, relativePath: string) {
  const read = async (targetLang: string) => {
    const filePath = path.resolve(`src/i18n/${targetLang}/${relativePath}`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  };

  try {
    return await read(lang);
  } catch (err) {
    if (lang === 'en') {
      throw err;
    }
    return await read('en');
  }
}
