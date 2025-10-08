import { loadI18nJson } from '@/lib/loadI18nJson';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

const wrap = (tag: string, text?: string) =>
  text ? `<${tag}>${text}</${tag}>` : '';

const render = (items: string[]) => {
  if (!items.length) {
    return '';
  }

  const [first, ...rest] = items;
  return [
    wrap('p', first),
    ...rest.map((text) => wrap('li', text)),
  ]
    .filter(Boolean)
    .join('');
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const items = await loadI18nJson<string[]>(
      lang,
      'texts/diary/analysis/hint.json',
    );

    return new Response(render(items), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch {
    return new Response('Not found or broken text file', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
};
