import { loadI18nJson } from '@/lib/loadI18nJson';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

type HeadingPage = {
  h2?: string;
  texts?: string[];
};

const wrap = (tag: string, text?: string) =>
  text ? `<${tag}>${text}</${tag}>` : '';

const render = ({ h2, texts = [] }: HeadingPage) =>
  [wrap('h2', h2), ...texts.map((text) => wrap('p', text))]
    .filter(Boolean)
    .join('');

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const content = await loadI18nJson<HeadingPage>(lang, 'texts/daybook.json');

    return new Response(render(content), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/daybook.html.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/daybook.html.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
