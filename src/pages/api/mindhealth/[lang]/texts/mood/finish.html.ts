import { loadI18nJson } from '@/lib/loadI18nJson';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

type MoodFinish = {
  h2?: string;
  texts?: string[];
};

const wrap = (tag: string, text?: string) =>
  text ? `<${tag}>${text}</${tag}>` : '';

const render = ({ h2, texts = [] }: MoodFinish) =>
  [wrap('h2', h2), ...texts.map((text) => wrap('p', text))]
    .filter(Boolean)
    .join('');

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const moodModules = import.meta.glob<{
      default: { finish: MoodFinish };
    }>('@/i18n/*/texts/mood.json', { eager: true });
    const modulePath = `/src/i18n/${lang}/texts/mood.json`;
    const module = moodModules[modulePath];

    if (!module) {
      return new Response(JSON.stringify({ error: 'Language not found' }), {
        status: 404,
      });
    }

    const content = module.default.finish;

    return new Response(render(content), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/mood/finish.html.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/mood/finish.html.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
