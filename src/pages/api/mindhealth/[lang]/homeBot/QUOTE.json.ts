import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

interface Quote {
  text: string;
  author: string;
}

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const quotesModules = import.meta.glob<{
      default: Quote[];
    }>('@/i18n/*/homeBot/quotes.json', { eager: true });

    const modulePath = `/src/i18n/${lang}/homeBot/quotes.json`;
    const module = quotesModules[modulePath];

    if (!module) {
      throw new Error(
        `Quotes translation for language "${lang}" not found at /src/i18n/${lang}/homeBot/quotes.json`,
      );
    }

    return new Response(JSON.stringify(module.default), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(`Error generating QUOTE.json for ${lang}:`, err);
    throw new Error(
      `Failed to generate QUOTE.json for ${lang}: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
