// src/pages/api/[lang]/[test].json.ts
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = true;

export async function getStaticPaths() {
  const langs = await fs.readdir('src/i18n');
  const distortionsModules = import.meta.glob<{
    default: Record<string, any>;
  }>('@/i18n/*/distortions.json', { eager: true });

  const nestedPaths = langs.map((lang) => {
    const modulePath = `/src/i18n/${lang}/distortions.json`;
    const module = distortionsModules[modulePath];
    if (!module) return [];

    return Object.keys(module.default).map((distortion) => ({
      params: { lang, distortion },
    }));
  });

  return nestedPaths.flat();
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
      return new Response(JSON.stringify({ error: 'Language not found' }), {
        status: 404,
      });
    }

    const data = module.default[distortion];

    if (!data) {
      return new Response(JSON.stringify({ error: 'Distortion not found' }), {
        status: 404,
      });
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
    return new Response(
      JSON.stringify({ error: 'Not found or broken test file' }),
      { status: 404 },
    );
  }
};
