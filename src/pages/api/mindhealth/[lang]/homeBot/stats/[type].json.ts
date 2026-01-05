import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

const CATEGORIES = ['daysCommon', 'daysInRow', 'daysMissed'] as const;
type Category = (typeof CATEGORIES)[number];

export const getStaticPaths = async () => {
  const langPaths = await getLangStaticPaths();
  return langPaths.flatMap(({ params }) =>
    CATEGORIES.map((type) => ({
      params: { lang: params.lang, type },
    })),
  );
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;
  const type = params.type as Category;

  if (!CATEGORIES.includes(type)) {
    return new Response(JSON.stringify({ error: 'Unknown category' }), {
      status: 404,
    });
  }

  try {
    const statsModules = import.meta.glob<{
      default: Record<Category, string[]>;
    }>('@/i18n/*/homeBot/stats.json', { eager: true });

    const modulePath = `/src/i18n/${lang}/homeBot/stats.json`;
    const module = statsModules[modulePath];

    if (!module) {
      return new Response(JSON.stringify({ error: 'Language not found' }), {
        status: 404,
      });
    }

    const data = module.default[type];

    if (!data) {
      return new Response(JSON.stringify({ error: 'Category not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(`Error generating stats/${type}.json for ${lang}:`, err);
    throw new Error(
      `Failed to generate stats/${type}.json: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
