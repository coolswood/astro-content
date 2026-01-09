import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const articlesModules = import.meta.glob<{
      default: string[];
    }>('@/i18n/*/articles.json', { eager: true });
    const modulePath = `/src/i18n/${lang}/articles.json`;
    const module = articlesModules[modulePath];

    if (!module) {
      return new Response(JSON.stringify({ error: 'Language not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const articles = module.default;

    return new Response(JSON.stringify(articles), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/articles.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/articles.json.ts: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
