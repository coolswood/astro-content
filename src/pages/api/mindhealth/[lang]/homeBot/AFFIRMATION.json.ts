import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const affirmationsModules = import.meta.glob<{
      default: string[];
    }>('@/i18n/*/homeBot/affirmations.json', { eager: true });

    const modulePath = `/src/i18n/${lang}/homeBot/affirmations.json`;
    const module = affirmationsModules[modulePath];

    if (!module) {
      throw new Error(
        `Affirmations translation for language "${lang}" not found at /src/i18n/${lang}/homeBot/affirmations.json`,
      );
    }

    return new Response(JSON.stringify(module.default), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(`Error generating AFFIRMATION.json for ${lang}:`, err);
    throw new Error(
      `Failed to generate AFFIRMATION.json for ${lang}: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
