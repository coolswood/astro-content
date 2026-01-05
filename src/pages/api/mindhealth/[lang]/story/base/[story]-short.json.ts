import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = true;

export async function getStaticPaths() {
  const langPaths = await getLangStaticPaths();

  const nestedPaths = await Promise.all(
    langPaths.map(async ({ params: { lang } }) => {
      const items = await fs.readdir(`src/i18n/${lang}/story`, {
        withFileTypes: true,
      });
      const stories = items
        .filter((item) => item.isFile() && item.name.endsWith('.json'))
        .map((item) => item.name);
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
        path.resolve(process.cwd(), `src/i18n/${lang}/story/${story}.json`),
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
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/base/[story]-short.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/base/[story]-short.json.ts: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
