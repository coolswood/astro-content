// src/pages/api/[lang]/[test].json.ts
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = true;

export async function getStaticPaths() {
  const langs = await fs.readdir('src/i18n');

  const nestedPaths = await Promise.all(
    langs.map(async (lang) => {
      const distortions = await fs.readdir(`src/i18n/${lang}/distortions`);
      return distortions.map((distortion) => ({
        params: { lang, distortion },
      }));
    }),
  );

  return nestedPaths.flat();
}

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;
  const distortion = params.distortion!;

  try {
    const data = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/distortions/${distortion}`),
        'utf-8',
      ),
    );

    const output = {
      textHTML: data.textHTML,
      dialogSummary: data.dialogSummary,
      dialog: data.dialog.map((el: string, index: number) => ({
        type: index % 2 === 0 ? 'MINE' : 'YOURS',
        text: el,
      })),
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken test file' }),
      { status: 404 },
    );
  }
};
