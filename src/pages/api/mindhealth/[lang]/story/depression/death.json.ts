// src/pages/api/[lang]/death.json.ts
// Миграция файла depression_death (death) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/depression/death.json.

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
        path.resolve(`src/i18n/${lang}/story/depression/death.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_DEATH',
      color: '#37474F',
      url: 'depression-death',
      title: story.title,
      description: story.description,
      time: 6,
      type: 'theory',
      img: 'depression_death',
      isPremium: true,
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            important(story.screen_1.texts[8]),
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
            `<p>${story.screen_2.texts[6]}</p>`,
            `<p>${story.screen_2.texts[7]}</p>`,
            `<li>${story.screen_2.texts[8]}</li>`,
            `<li>${story.screen_2.texts[9]}</li>`,
            `<li>${story.screen_2.texts[10]}</li>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<li>${story.screen_3.texts[0]}</li>`,
            `<li>${story.screen_3.texts[1]}</li>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken death file' }),
      { status: 404 },
    );
  }
};
