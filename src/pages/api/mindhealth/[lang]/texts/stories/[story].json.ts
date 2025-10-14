import { loadI18nJson } from '@/lib/loadI18nJson';
import type { APIRoute } from 'astro';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';

export const prerender = true;

export const getStaticPaths = async () => {
  const langPaths = await getLangStaticPaths();
  return langPaths.flatMap(({ params }) =>
    Array.from(ALLOWED).map((story) => ({
      params: { lang: params.lang, story },
    })),
  );
};

const ALLOWED = new Set([
  'activity',
  'coping',
  'daybook',
  'diary',
  'intermediate',
]);

type StoryCard = {
  subtitle: string;
  img: string;
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;
  const story = (params.story ?? '').toLowerCase();

  if (!ALLOWED.has(story)) {
    return new Response(JSON.stringify({ error: 'Unknown story identifier' }), {
      status: 404,
    });
  }

  try {
    const cards = await loadI18nJson<StoryCard[]>(
      lang,
      `stories/${story}.json`,
    );

    return new Response(JSON.stringify(cards), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(`Error generating ${lang}/texts/stories/${story}.json:`, err);
    throw new Error(
      `Failed to generate ${lang}/texts/stories/${story}.json: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
