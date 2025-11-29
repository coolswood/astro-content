import { loadI18nJson } from '@/lib/loadI18nJson';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

type MockGptDream = {
  common?: string;
  symbols?: string[];
  transfer?: string[];
  desires?: string;
  fears?: string;
  middle?: string;
  deep?: string;
  conclusion?: string;
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const daybookModules = import.meta.glob<{
      default: { mockGptDream: MockGptDream };
    }>('@/i18n/*/texts/daybook.json', { eager: true });
    const modulePath = `/src/i18n/${lang}/texts/daybook.json`;
    const module = daybookModules[modulePath];

    if (!module) {
      return new Response(JSON.stringify({ error: 'Language not found' }), {
        status: 404,
      });
    }

    const content = module.default.mockGptDream;

    const payload = {
      common: content.common ?? '',
      symbols: content.symbols ?? [],
      transfer: content.transfer ?? [],
      desires: content.desires ?? '',
      fears: content.fears ?? '',
      middle: content.middle ?? '',
      deep: content.deep ?? '',
      conclusion: content.conclusion ?? '',
    };

    return new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/daybook/mockGptDream.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/daybook/mockGptDream.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
