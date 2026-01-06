import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

const CATEGORIES = [
  'days',
  'affirmations',
  'appUpdated',
  'neverUsed',
  'premiumThanks',
  'quote',
  'readArticle',
  'testExpired',
  'header',
] as const;
type Category = (typeof CATEGORIES)[number];

const MAPPING: Record<string, string> = {
  FIRST: 'days.fist',
  THIRD: 'days.third',
  FOURTH: 'days.fourth',
  FIFTH: 'days.fifth',
  EIGHTH: 'days.eighth',
  TENTH: 'days.tenth',
  AFFIRMATION: 'affirmation',
  APP_UPDATED: 'appUpdated',
  NEVER_USED: 'neverUsed',
  PREMIUM_THANKS: 'premiumThanks',
  QUOTE: 'quote',
  READ_ARTICLE: 'readArticle',
  TEST_EXPIRED: 'testExpired',
  HEADER: 'header',
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
  const categoryPath = MAPPING[type];

  if (!categoryPath) {
    throw new Error(`Unknown category: ${type}`);
  }

  try {
    const contentModules = import.meta.glob<{
      default: Record<string, any>;
    }>('@/i18n/*/homeBot/content.json', { eager: true });

    const modulePath = `/src/i18n/${lang}/homeBot/content.json`;
    const module = contentModules[modulePath];

    if (!module) {
      throw new Error(
        `Content translation for language "${lang}" not found at /src/i18n/${lang}/homeBot/content.json`,
      );
    }

    // Resolve dot-notated path
    const data = categoryPath
      .split('.')
      .reduce((obj, key) => obj?.[key], module.default);

    if (data === undefined) {
      throw new Error(
        `Path "${categoryPath}" not found in content.json for language "${lang}"`,
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(`Error generating content/${type}.json for ${lang}:`, err);
    throw new Error(
      `Failed to generate content/${type}.json: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
