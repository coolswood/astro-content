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

const revItems = new Set([0, 2, 4, 5, 7, 9, 12, 14, 18]);

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const data = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/hopelessness.json`),
        'utf-8',
      ),
    );

    const en = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/tests/hopelessness.json`),
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
      data.variants.wrong,
      data.variants.maybe,
      data.variants.maybeYes,
      data.variants.yes,
    ];

    const output = {
      title: constants.hopelessness,
      steps: data.steps.map((key: string, index: number) => ({
        g: key,
        v: options.map((text: any, id: number) => ({
          t: text,
          s: revItems.has(index) ? 4 - (id + 1) : id,
        })),
      })),
      result: [
        {
          text: data.result.positive.text,
          title: data.result.positive.title,
          rangeBefore: 9,
        },
        {
          text: data.result.neutrally.text,
          title: data.result.neutrally.title,
          rangeBefore: 24,
        },
        {
          text: data.result.negative.text,
          title: data.result.negative.title,
          rangeBefore: 42,
        },
        {
          text: data.result.hopeless.text,
          title: data.result.hopeless.title,
          rangeBefore: 60,
        },
      ],
      steps_description: Object.values(data.steps_description ?? {}),
      description: {
        text: data.description.text,
        sourceLink: 'https://en.wikipedia.org/wiki/Beck_Hopelessness_Scale',
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
