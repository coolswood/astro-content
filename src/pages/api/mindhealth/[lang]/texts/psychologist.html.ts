import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

const wrap = (tag: string, text?: string) =>
  text ? `<${tag}>${text}</${tag}>` : '';

const renderPsychologist = (strings: string[]) => {
  const blocks = [
    ...strings.slice(0, 4).map((text) => wrap('p', text)),
    ...strings.slice(4, 7).map((text) => wrap('li', text)),
    ...strings.slice(7).map((text) => wrap('p', text)),
  ];

  return blocks.join('');
};

const loadPsychologistTexts = async (lang: string) => {
  const fallback = JSON.parse(
    await fs.readFile(
      path.resolve('src/i18n/en/texts/psychologist.json'),
      'utf-8',
    ),
  ) as string[];

  if (lang === 'en') {
    return fallback;
  }

  try {
    const localized = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/texts/psychologist.json`),
        'utf-8',
      ),
    ) as string[];

    return localized;
  } catch {
    return fallback;
  }
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const strings = await loadPsychologistTexts(lang);
    const html = renderPsychologist(strings);

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/psychologist.html.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/psychologist.html.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
