import fs from 'fs/promises';
import path from 'path';

export async function getLangStaticPaths() {
  const items = await fs.readdir('src/i18n', { withFileTypes: true });
  return items
    .filter((item) => item.isDirectory())
    .map((item) => ({ params: { lang: item.name } }));
}
