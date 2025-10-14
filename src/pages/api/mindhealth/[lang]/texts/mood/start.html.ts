import { loadI18nJson } from '@/lib/loadI18nJson';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

type MoodStart = {
  h2?: string;
  texts?: string[];
};

const wrap = (tag: string, text?: string) =>
  text ? `<${tag}>${text}</${tag}>` : '';

const render = ({ h2, texts = [] }: MoodStart) => {
  const [first, second, third, fourth, fifth] = texts;

  return [
    wrap('h2', h2),
    wrap('p', first),
    wrap('p', second),
    wrap('li', third),
    wrap('li', fourth),
    wrap('p', fifth),
  ]
    .filter(Boolean)
    .join('');
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const content = await loadI18nJson<MoodStart>(
      lang,
      'texts/mood/start.json',
    );

    return new Response(render(content), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/mood/start.html.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/mood/start.html.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
