// src/pages/api/[lang]/[test].json.ts
import type { APIRoute, GetStaticPaths } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { text } from 'stream/consumers';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const langs = await fs.readdir('src/i18n');
  const paths: { params: { lang: string } }[] = [];

  for (const lang of langs) {
    paths.push({ params: { lang } });
  }

  return paths;
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const data = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/bdi.json`),
        'utf-8',
      ),
    );
    const constants = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/constants.json`),
        'utf-8',
      ),
    );

    const output = {
      title: constants.bdi,
      steps: Object.keys(data.steps).map((key: string) => ({
        g: null,
        v: data.steps[key].map((text: string, i: number) => ({
          t: text,
          s: i,
        })),
      })),
      result: [
        {
          text: data.result.normal.text,
          title: data.result.normal.title,
          rangeBefore: 13,
        },
        {
          text: data.result.mild.text,
          title: data.result.mild.title,
          rangeBefore: 24,
        },
        {
          text: data.result.moderate.text,
          title: data.result.moderate.title,
          rangeBefore: 40,
        },
        {
          text: data.result.exacerbated.text,
          title: data.result.exacerbated.title,
          rangeBefore: 63,
        },
      ],
      steps_description: Object.values(data.steps_description ?? {}),
      description: {
        text: data.description.text,
        sourceLink: 'https://en.wikipedia.org/wiki/Beck_Depression_Inventory',
      },
      recommends: {
        activities: [
          'dfdzsWz4nJ',
          'DzseWuFv2t',
          'kdzYJ4njVJ',
          'lsafnanS3sf',
          'lsvnnDSnsdl',
          'naslSLnadfl',
        ],
      },
      instagram: data.instagram,
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
