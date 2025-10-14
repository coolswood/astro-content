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
        path.resolve(`src/i18n/${lang}/tests/okr.json`),
        'utf-8',
      ),
    );

    const en = JSON.parse(
      await fs.readFile(path.resolve(`src/i18n/en/tests/okr.json`), 'utf-8'),
    );

    const constants = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/constants.json`),
        'utf-8',
      ),
    );

    const output = {
      title: constants.okr,
      steps: data.steps.map((key: string, index: number) => ({
        g: key,
        v: data.variants[index].map((text: any, id: number) => ({
          t: text,
          s: id,
        })),
      })),
      result: [
        {
          text: data.result.normal.text,
          title: data.result.normal.title,
          rangeBefore: 7,
        },
        {
          text: data.result.light.text,
          title: data.result.light.title,
          rangeBefore: 15,
        },
        {
          text: data.result.severe.text,
          title: data.result.severe.title,
          rangeBefore: 31,
        },
        {
          text: data.result.extreme.text,
          title: data.result.extreme.title,
          rangeBefore: 40,
        },
      ],
      steps_description: Object.values(data.steps_description ?? {}),
      description: {
        text: data.description.text,
        sourceLink:
          'https://en.wikipedia.org/wiki/Yale%E2%80%93Brown_Obsessive%E2%80%93Compulsive_Scale',
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
      `Error generating src/pages/api/mindhealth/[lang]/tests/okr.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/tests/okr.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
