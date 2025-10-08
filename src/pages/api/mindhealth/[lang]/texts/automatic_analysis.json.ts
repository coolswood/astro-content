import { loadI18nJson } from '@/lib/loadI18nJson';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

type AutomaticAnalysisItem = {
  title: string;
  description: string;
  wrong: string;
  right: string;
};

const IDS = ['emo', 'fuzzy', 'fact', 'diff', 'skip', 'ignore'];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const items = await loadI18nJson<AutomaticAnalysisItem[]>(
      lang,
      'texts/automatic_analysis.json',
    );

    const payload = items.map((item, index) => ({
      id: IDS[index] ?? `item-${index}`,
      ...item,
    }));

    return new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Not found or broken text file' }),
      { status: 404 },
    );
  }
};
