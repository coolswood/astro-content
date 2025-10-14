import { loadI18nJson } from '@/lib/loadI18nJson';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

const wrap = (tag: string, text?: string) =>
  text ? `<${tag}>${text}</${tag}>` : '';

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const items = await loadI18nJson<string[]>(
      lang,
      'texts/diary/analysis/description.json',
    );

    const html = items.map((text) => wrap('p', text)).join('');

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/diary/analysis/description.html.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/diary/analysis/description.html.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
