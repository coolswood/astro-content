// src/pages/api/[lang]/[test].json.ts
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

const revItems = new Set([4, 8, 12, 16, 18]);

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const data = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/anxiety.json`),
        'utf-8',
      ),
    );

    const en = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/tests/anxiety.json`),
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

    const output = {
      title: constants.anxiety,
      steps: data.steps.map((key: string, index: number) => ({
        g: key,
        v: options.map((text: any, i: number) => ({
          t: text,
          s: revItems.has(index) ? 4 - i : i + 1,
        })),
      })),
      result: [
        {
          text: data.result.normal.text,
          title: data.result.normal.title,
          rangeBefore: 44,
        },
        {
          text: data.result.light.text,
          title: data.result.light.title,
          rangeBefore: 59,
        },
        {
          text: data.result.severe.text,
          title: data.result.severe.title,
          rangeBefore: 74,
        },
        {
          text: data.result.extreme.text,
          title: data.result.extreme.title,
          rangeBefore: 80,
        },
      ],
      steps_description: Object.values(data.steps_description ?? {}),
      description: {
        text: data.description.text,
        sourceLink:
          'https://en.wikipedia.org/wiki/Zung_Self-Rating_Anxiety_Scale',
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
    console.error(`Error generating anxiety.json:`, err);
    throw new Error(
      `Failed to generate anxiety.json: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
