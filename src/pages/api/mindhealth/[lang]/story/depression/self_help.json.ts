// src/pages/api/[lang]/self_help.json.ts
// Миграция файла depression_self_help (self_help) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; instagram fallback на en, как в start.
// Путь к локализации: src/i18n/${lang}/story/depression/self_help.json.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { important, instagram, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depression/self_help.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/depression/self_help.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_SELF_HELP',
      color: '#BABFF3',
      url: 'depression-self-help',
      title: story.title,
      description: story.description,
      time: 7,
      type: 'theory',
      img: 'depression_self_help',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
            `<p>${story.screen_1.texts[4]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            important(story.screen_2.texts[1]),
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            `<p>${story.screen_2.texts[7]}</p>`,
            instagram(story.instagram || storyEn.instagram),
            `<p>${story.screen_2.texts[8]}</p>`,
            `<p>${story.screen_2.texts[9]}</p>`,
            `<p>${story.screen_2.texts[10]}</p>`,
            `<p>${story.screen_2.texts[11]}</p>`,
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
            `<p>${story.screen_3.texts[5]}</p>`,
            important(story.screen_3.texts[6]),
            `<p>${story.screen_3.texts[7]}</p>`,
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
            `<p>${story.screen_3.texts[10]}</p>`,
            `<p>${story.screen_3.texts[11]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken self_help file' }),
      { status: 404 },
    );
  }
};
