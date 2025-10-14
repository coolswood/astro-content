import { loadI18nJson } from '@/lib/loadI18nJson';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

type MockGpt = {
  consolation?: string;
  solutions?: string[];
  distortion?: string;
  negativeThought?: string;
  adaptiveResponse?: string;
};

const DISTORTION_TYPE = 9;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const content = await loadI18nJson<MockGpt>(
      lang,
      'texts/daybook/mockGpt.json',
    );

    const payload = {
      consolation: content.consolation ?? '',
      solutions: content.solutions ?? [],
      distortion: {
        type: DISTORTION_TYPE,
        description: content.distortion ?? '',
      },
      negativeThought: content.negativeThought ?? '',
      adaptiveResponse: content.adaptiveResponse ?? '',
    };

    return new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/daybook/mockGpt.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/daybook/mockGpt.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
