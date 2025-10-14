// src/pages/api/[lang]/suicide.json.ts
// Мигрировано по точной аналогии с Вашим файлом start.json.ts — без дополнительной логики fallback.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { important, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/suicide.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'SUICIDE',
      color: '#161614',
      url: 'suicide',
      title: story.title,
      description: story.description,
      time: 5,
      type: 'theory',
      img: 'suicide',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            important(story.screen_1.texts[4]),
            `<p>${story.screen_1.texts[5]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            `<p>${story.screen_2.texts[5]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            important(story.screen_3.texts[5]),
            `<p>${story.screen_3.texts[6]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_4.texts[0]}</p>`,
            `<p>${story.screen_4.texts[1]}</p>`,
            `<p>${story.screen_4.texts[2]}</p>`,
            q(story.screen_4.quote.text, story.screen_4.quote.author),
            `<p>${story.screen_4.texts[3]}</p>`,
            `<p>${story.screen_4.texts[4]}</p>`,
            `<p>${story.screen_4.texts[5]}</p>`,
            `<p>${story.screen_4.texts[6]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(`Error generating suicide.json:`, err);
    throw new Error(
      `Failed to generate suicide.json: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
