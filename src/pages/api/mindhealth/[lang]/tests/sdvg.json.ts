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
        path.resolve(`src/i18n/${lang}/tests/sdvg.json`),
        'utf-8',
      ),
    );

    const en = JSON.parse(
      await fs.readFile(path.resolve(`src/i18n/en/tests/sdvg.json`), 'utf-8'),
    );

    const constants = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/constants.json`),
        'utf-8',
      ),
    );

    const options = [
      data.variants.never,
      data.variants.rarely,
      data.variants.sometimes,
      data.variants.often,
      data.variants.always,
    ];

    const output = {
      title: constants.sdvg,
      steps: data.steps.map((key: string) => ({
        g: key,
        v: options.map((text: any, id: number) => ({
          t: text,
          s: id,
        })),
      })),
      result: [
        {
          text: data.result.low.text,
          title: data.result.low.title,
          rangeBefore: 30,
        },
        {
          text: data.result.middle.text,
          title: data.result.middle.title,
          rangeBefore: 45,
        },
        {
          text: data.result.high.text,
          title: data.result.high.title,
          rangeBefore: 72,
        },
      ],
      steps_description: Object.values(data.steps_description ?? {}),
      description: {
        text: data.description.text,
        sourceLink:
          'https://en.wikipedia.org/wiki/Adult_ADHD_Self-Report_Scale',
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
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/tests/sdvg.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/tests/sdvg.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
