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

const render = ({ texts = [] }: DaybookTexts) =>
  texts.map((text) => wrap('p', text)).join('');

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const daybookModules = import.meta.glob<{
      default: { gptCbtDream: DaybookTexts };
    }>('@/i18n/*/texts/daybook.json', { eager: true });
    const modulePath = `/src/i18n/${lang}/texts/daybook.json`;
    const module = daybookModules[modulePath];

    if (!module) {
      return new Response(JSON.stringify({ error: 'Language not found' }), {
        status: 404,
      });
    }

    const content = module.default.gptCbtDream;

    return new Response(render(content), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/daybook/gptCbtDream.html.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/daybook/gptCbtDream.html.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
