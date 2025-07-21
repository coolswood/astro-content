// src/pages/api/[lang]/[test].json.ts
import type { APIRoute, GetStaticPaths } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const langs = await fs.readdir('src/i18n');
  const paths: { params: { lang: string } }[] = [];

  for (const lang of langs) {
    paths.push({ params: { lang } });
  }

  return paths;
};

const revItems = new Set([4, 8, 12, 16, 18]);

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const data = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/acceptance.json`),
        'utf-8',
      ),
    );

    const en = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/tests/acceptance.json`),
        'utf-8',
      ),
    );

    const constants = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/constants.json`),
        'utf-8',
      ),
    );

    const options = [
      data.variants.never,
      data.variants.seldom,
      data.variants.often,
      data.variants.always,
    ];

    const revItems = new Set([0, 1, 2, 4, 10, 15, 16, 17, 19]);

    const output = {
      title: constants.acceptance,
      steps: data.steps.map((key: string, index: number) => ({
        g: key,
        v: options.map((text: any, id: number) => ({
          t: text,
          s: revItems.has(index) ? id : 3 - id,
        })),
      })),
      result: [
        {
          text: data.result.low.text,
          title: data.result.low.title,
          rangeBefore: 20,
        },
        {
          text: data.result.middle.text,
          title: data.result.middle.title,
          rangeBefore: 40,
        },
        {
          text: data.result.hight.text,
          title: data.result.hight.title,
          rangeBefore: 60,
        },
      ],
      steps_description: Object.values(data.steps_description ?? {}),
      description: {
        text: data.description.text,
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
      instagram: data.instagram || en.instagram,
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
