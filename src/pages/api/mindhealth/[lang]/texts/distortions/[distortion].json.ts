import { loadI18nJson } from '@/lib/loadI18nJson';
import type { APIRoute } from 'astro';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';

export const prerender = true;

export const getStaticPaths = async () => {
  const langPaths = await getLangStaticPaths();
  return langPaths.flatMap(({ params }) =>
    Array.from(ALLOWED).map((distortion) => ({
      params: { lang: params.lang, distortion },
    })),
  );
};

const ALLOWED = new Set([
  'BLACK_AND_WHITE',
  'CATASTROPHIZATION',
  'COMMON',
  'DISCVAL',
  'DUE',
  'EMO',
  'FILTER',
  'LABEL',
  'MAYBE',
  'MORE_MINE',
  'READ',
  'RESPONSE',
]);

type DistortionJson = {
  textHTML: string;
  dialogSummary: string;
  dialog: Array<
    | string
    | {
        type: string;
        text: string;
      }
  >;
};

const MINE = 'MINE';
const YOURS = 'YOURS';

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;
  const distortionParam = (params.distortion ?? '').toUpperCase();

  if (!ALLOWED.has(distortionParam)) {
    return new Response(
      JSON.stringify({ error: 'Unknown distortion identifier' }),
      { status: 404 },
    );
  }

  try {
    const distortionsModules = import.meta.glob<{
      default: Record<string, any>;
    }>('@/i18n/*/distortions.json', { eager: true });
    const modulePath = `/src/i18n/${lang}/distortions.json`;
    const module = distortionsModules[modulePath];

    if (!module) {
      return new Response(JSON.stringify({ error: 'Language not found' }), {
        status: 404,
      });
    }

    const distortion = module.default[distortionParam];

    if (!distortion) {
      return new Response(JSON.stringify({ error: 'Distortion not found' }), {
        status: 404,
      });
    }

    const dialog = distortion.dialog.map((entry: any, index: number) => {
      if (typeof entry === 'string') {
        return {
          type: index % 2 === 0 ? MINE : YOURS,
          text: entry,
        };
      }
      return entry;
    });

    const payload = {
      textHTML: distortion.textHTML,
      dialogSummary: distortion.dialogSummary,
      dialog,
    };

    return new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/distortions/[distortion].json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/distortions/[distortion].json.ts: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
