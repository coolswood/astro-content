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
        path.resolve(`src/i18n/${lang}/tests/irritation.json`),
        'utf-8',
      ),
    );

    const en = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/tests/irritation.json`),
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
      data.variants.none,
      data.variants.light,
      data.variants.norm,
      data.variants.hard,
      data.variants.super,
    ];

    const output = {
      title: constants.irritation,
      steps: data.steps.map((key: string) => ({
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
          rangeBefore: 45,
        },
        {
          text: data.result.light.text,
          title: data.result.light.title,
          rangeBefore: 55,
        },
        {
          text: data.result.severe.text,
          title: data.result.severe.title,
          rangeBefore: 75,
        },
        {
          text: data.result.hard.text,
          title: data.result.hard.title,
          rangeBefore: 85,
        },
        {
          text: data.result.extreme.text,
          title: data.result.extreme.title,
          rangeBefore: 100,
        },
      ],
      steps_description: Object.values(data.steps_description ?? {}),
      description: {
        text: data.description.text,
        sourceLink:
          'https://criminal-justice.iresearchnet.com/forensic-psychology/violence-risk-assessment/novaco-anger-scale-nas/',
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
