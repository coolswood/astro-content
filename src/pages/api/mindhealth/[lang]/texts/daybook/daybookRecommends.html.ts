import { loadI18nJson } from '@/lib/loadI18nJson';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

type DaybookTexts = {
  texts?: string[];
};

const wrap = (tag: string, text?: string) =>
  text ? `<${tag}>${text}</${tag}>` : '';

const render = ({ texts = [] }: DaybookTexts) => {
  const first = texts.slice(0, 3).map((text) => wrap('p', text));
  const rest = texts.slice(3).map((text) => wrap('li', text));
  return [...first, ...rest].join('');
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const content = await loadI18nJson<DaybookTexts>(
      lang,
      'texts/daybook/daybookRecommends.json',
    );

    return new Response(render(content), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/daybook/daybookRecommends.html.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/daybook/daybookRecommends.html.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
