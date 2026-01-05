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
    const diaryModules = import.meta.glob<{
      default: { automaticAnalysis: AutomaticAnalysisItem[] };
    }>('@/i18n/*/texts/diary.json', { eager: true });
    const modulePath = `/src/i18n/${lang}/texts/diary.json`;
    const module = diaryModules[modulePath];

    if (!module) {
      throw new Error(
        `Automatic analysis translation for language "${lang}" not found at /src/i18n/${lang}/texts/diary.json`,
      );
    }

    const items = module.default.automaticAnalysis;

    const payload = items.map((item, index) => ({
      id: IDS[index] ?? `item-${index}`,
      ...item,
    }));

    return new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(`Error generating automatic_analysis.json:`, err);
    throw new Error(
      `Failed to generate automatic_analysis.json: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
