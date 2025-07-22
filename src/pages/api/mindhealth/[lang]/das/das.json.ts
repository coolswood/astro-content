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
        path.resolve(`src/i18n/${lang}/tests/das/das.json`),
        'utf-8',
      ),
    );

    const en = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/tests/das/das.json`),
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
      data.options[0],
      data.options[1],
      data.options[2],
      data.options[3],
      data.options[4],
    ];

    const output = {
      steps: data.steps.map((key: string, i: number) => ({
        g: key,
        v: options.map((text: any, id: number) => ({
          t: text,
          s: id - 2,
        })),
      })),
      steps_description: Object.values(data.steps_description ?? {}),
      description: {
        text: `
      <p>${data.description.text[0]}</p>
      <p>${data.description.text[1]}</p>
      <p>${data.description.text[2]}</p>
      <li>${data.description.text[3]}</li>
      <li>${data.description.text[4]}</li>
      <li>${data.description.text[5]}</li>
      <li>${data.description.text[6]}</li>
      <li>${data.description.text[7]}</li>
      <li>${data.description.text[8]}</li>
      <li>${data.description.text[9]}</li>
      <p>${data.description.text[10]}</p>
    `,
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
