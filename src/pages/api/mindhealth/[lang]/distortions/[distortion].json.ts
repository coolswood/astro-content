import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export async function getStaticPaths() {
  const langPaths = await getLangStaticPaths();
  const distortionsModules = import.meta.glob<{
    default: Record<string, any>;
  }>('@/i18n/*/distortions.json', { eager: true });

  return langPaths.flatMap(({ params: { lang } }) => {
    const modulePath = `/src/i18n/${lang}/distortions.json`;
    const module = distortionsModules[modulePath];
    if (!module) return [];

    return Object.keys(module.default).map((distortion) => ({
      params: { lang, distortion },
    }));
  });
}

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;
  const distortion = params.distortion!;

  try {
    const distortionsModules = import.meta.glob<{
      default: Record<string, any>;
    }>('@/i18n/*/distortions.json', { eager: true });
    const modulePath = `/src/i18n/${lang}/distortions.json`;
    const module = distortionsModules[modulePath];

    if (!module) {
      throw new Error(
        `Distortions translation for language "${lang}" not found at /src/i18n/${lang}/distortions.json`,
      );
    }

    const data = module.default[distortion];

    if (!data) {
      throw new Error(
        `Distortion "${distortion}" not found in distortions.json for language "${lang}"`,
      );
    }

    const output = {
      textHTML: data.textHTML,
      dialogSummary: data.dialogSummary,
      dialog: data.dialog.map((el: string, index: number) => ({
        type: index % 2 === 0 ? 'MINE' : 'YOURS',
        text: el,
      })),
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating distortions/${distortion}.json for ${lang}:`,
      err,
    );
    throw new Error(
      `Failed to generate distortions/${distortion}.json: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
