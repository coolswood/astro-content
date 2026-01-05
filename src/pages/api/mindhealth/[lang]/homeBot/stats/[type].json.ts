import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

const CATEGORIES = ['daysCommon', 'daysInRow', 'daysMissed'] as const;
type Category = (typeof CATEGORIES)[number];

const MAPPING: Record<string, Category> = {
  DAYS_COMMON: 'daysCommon',
  DAYS_IN_ROW: 'daysInRow',
  DAYS_MISSED: 'daysMissed',
};

const URL_TYPES = Object.keys(MAPPING);

export const getStaticPaths = async () => {
  const langPaths = await getLangStaticPaths();
  return langPaths.flatMap(({ params }) =>
    URL_TYPES.map((type) => ({
      params: { lang: params.lang, type },
    })),
  );
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;
  const type = params.type!;
  const categoryKey = MAPPING[type];

  if (!categoryKey) {
    throw new Error(`Unknown category: ${type}`);
  }

  try {
    const statsModules = import.meta.glob<{
      default: Record<Category, string[]>;
    }>('@/i18n/*/homeBot/stats.json', { eager: true });

    const modulePath = `/src/i18n/${lang}/homeBot/stats.json`;
    const module = statsModules[modulePath];

    if (!module) {
      throw new Error(
        `Stats translation for language "${lang}" not found at /src/i18n/${lang}/homeBot/stats.json`,
      );
    }

    const data = module.default[categoryKey];

    if (!data) {
      throw new Error(
        `Category "${categoryKey}" not found in stats.json for language "${lang}"`,
      );
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
