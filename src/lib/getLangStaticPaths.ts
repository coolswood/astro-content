import fs from 'fs/promises';

export async function getLangStaticPaths() {
  const langs = await fs.readdir('src/i18n');
  return langs.map((lang) => ({ params: { lang } }));
}
