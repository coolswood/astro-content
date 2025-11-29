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
  return [wrap('p', first), ...rest.map((text) => wrap('li', text))]
    .filter(Boolean)
    .join('');
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const diaryModules = import.meta.glob<{
      default: { analysis: { hint: string[] } };
    }>('@/i18n/*/texts/diary.json', { eager: true });
    const modulePath = `/src/i18n/${lang}/texts/diary.json`;
    const module = diaryModules[modulePath];

    if (!module) {
      return new Response(JSON.stringify({ error: 'Language not found' }), {
        status: 404,
      });
    }

    const items = module.default.analysis.hint;

    return new Response(render(items), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/diary/analysis/hint.html.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/diary/analysis/hint.html.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
