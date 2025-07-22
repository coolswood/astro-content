// src/pages/api/[lang]/[test].json.ts
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const data = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/bipolar.json`),
        'utf-8',
      ),
    );

    const en = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/tests/bipolar.json`),
        'utf-8',
      ),
    );

    const constants = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/constants.json`),
        'utf-8',
      ),
    );

    const options = [data.variants.no, data.variants.yes];

    const output = {
      title: constants.bipolar,
      steps: data.steps.map((key: string, i: number) => ({
        g: key,
        v: options.map((text: any, id: number) => ({
          t: text,
          s: id,
        })),
      })),
      result: [
        {
          text: data.result.normal.text,
          title: data.result.normal.title,
          rangeBefore: 5,
        },
        {
          text: data.result.light.text,
          title: data.result.light.title,
          rangeBefore: 9,
        },
        {
          text: data.result.extreme.text,
          title: data.result.extreme.title,
          rangeBefore: 13,
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
