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
    const moodModules = import.meta.glob<{
      default: { start: MoodStart };
    }>('@/i18n/*/texts/mood.json', { eager: true });
    const modulePath = `/src/i18n/${lang}/texts/mood.json`;
    const module = moodModules[modulePath];

    if (!module) {
      return new Response(JSON.stringify({ error: 'Language not found' }), {
        status: 404,
      });
    }

    const content = module.default.start;

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
