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
        path.resolve(`src/i18n/${lang}/tests/eat.json`),
        'utf-8',
      ),
    );

    const en = JSON.parse(
      await fs.readFile(path.resolve(`src/i18n/en/tests/eat.json`), 'utf-8'),
    );

    const constants = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/constants.json`),
        'utf-8',
      ),
    );

    const options = [
      data.variants.always,
      data.variants.often,
      data.variants.seldom,
      data.variants.never,
    ];

    const output = {
      title: constants.eat,
      steps: data.steps.map((key: string, i: number) => ({
        g: key,
        v: options.map((text: any, id: number) => ({
          t: text,
          s: data.steps.length - 1 === i ? id : 3 - id,
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
          text: data.result.hight.text,
          title: data.result.hight.title,
          rangeBefore: 78,
        },
      ],
      steps_description: Object.values(data.steps_description ?? {}),
      description: {
        text: data.description.text,
        sourceLink: 'https://en.wikipedia.org/wiki/Eating_Attitudes_Test',
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
