// src/pages/api/[lang]/achievements.json.ts
// Миграция файла distortions/achievements по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>; instagram fallback на en, как в start.
// Путь к локализации: src/i18n/${lang}/story/distortions/achievements.json.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { important, instagramStep, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/distortions/achievements.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/distortions/achievements.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DISTORTIONS_ACHIEVEMENTS',
      color: '#BADEF3',
      url: 'distortions-achievements',
      title: story.title,
      description: story.description,
      time: 8,
      type: 'theory',
      img: 'distortions_achievements',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            `<li>${story.screen_1.texts[8]}</li>`,
            `<li>${story.screen_1.texts[9]}</li>`,
            `<li>${story.screen_1.texts[10]}</li>`,
            `<li>${story.screen_1.texts[11]}</li>`,
            `<p>${story.screen_1.texts[12]}</p>`,
            `<p>${story.screen_1.texts[13]}</p>`,
            `<p>${story.screen_1.texts[14]}</p>`,
            important(story.screen_1.texts[15]),
            `<p>${story.screen_1.texts[16]}</p>`,
            `<p>${story.screen_1.texts[17]}</p>`,
            `<p>${story.screen_1.texts[18]}</p>`,
            `<p>${story.screen_1.texts[19]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            important(story.screen_2.texts[4]),
            `<p>${story.screen_2.texts[5]}</p>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            `<p>${story.screen_2.texts[7]}</p>`,
            `<p>${story.screen_2.texts[8]}</p>`,
            `<p>${story.screen_2.texts[9]}</p>`,
            `<p>${story.screen_2.texts[10]}</p>`,
            `<h2>${story.screen_2.texts[11]}</h2>`,
            `<p>${story.screen_2.texts[12]}</p>`,
            `<p>${story.screen_2.texts[13]}</p>`,
            `<p>${story.screen_2.texts[14]}</p>`,
            q(story.screen_2.quote.text, story.screen_2.quote.author),
            `<p>${story.screen_2.texts[15]}</p>`,
            `<p>${story.screen_2.texts[16]}</p>`,
            `<p>${story.screen_2.texts[17]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.screen_3.texts[0]}</h2>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<h2>${story.screen_3.texts[6]}</h2>`,
            `<p>${story.screen_3.texts[7]}</p>`,
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
            `<h2>${story.screen_3.texts[10]}</h2>`,
            `<p>${story.screen_3.texts[11]}</p>`,
            `<p>${story.screen_3.texts[12]}</p>`,
            q(story.screen_3.quote.text, story.screen_3.quote.author),
            `<p>${story.screen_3.texts[13]}</p>`,
            `<p>${story.screen_3.texts[14]}</p>`,
            important(story.screen_3.texts[15]),
            `<p>${story.screen_3.texts[16]}</p>`,
            `<p>${story.screen_3.texts[17]}</p>`,
            `<p>${story.screen_3.texts[18]}</p>`,
            `<p>${story.screen_3.texts[19]}</p>`,
            `<p>${story.screen_3.texts[20]}</p>`,
            `<p>${story.screen_3.texts[21]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken achievements file' }),
      { status: 404 },
    );
  }
};
