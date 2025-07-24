// src/pages/api/[lang]/[test].json.ts
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = true;

export async function getStaticPaths() {
  const langs = await fs.readdir('src/i18n');

  const nestedPaths = await Promise.all(
    langs.map(async (lang) => {
      const stories = await fs.readdir(`src/i18n/${lang}/story`);
      return stories.map((story) => ({
        params: { lang, story: story.replace('.json', '') },
      }));
    }),
  );

  return nestedPaths.flat();
}

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;
  const story = params.story!;

  try {
    const s = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/${story}.json`),
        'utf-8',
      ),
    );

    const output = {
      title: s.title,
      img: story,
      isPremium: s.isPremium,
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
