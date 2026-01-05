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

const MAPPING: Record<string, Category> = {
  DAYS: 'days',
  AFFIRMATIONS: 'affirmations',
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
  const categoryKey = MAPPING[type];

  if (!categoryKey) {
    throw new Error(`Unknown category: ${type}`);
  }

  try {
    const contentModules = import.meta.glob<{
      default: Record<Category, any>;
    }>('@/i18n/*/homeBot/content.json', { eager: true });

    const modulePath = `/src/i18n/${lang}/homeBot/content.json`;
    const module = contentModules[modulePath];

    if (!module) {
      throw new Error(
        `Content translation for language "${lang}" not found at /src/i18n/${lang}/homeBot/content.json`,
      );
    }

    const data = module.default[categoryKey];

    if (!data) {
      throw new Error(
        `Category "${categoryKey}" not found in content.json for language "${lang}"`,
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
