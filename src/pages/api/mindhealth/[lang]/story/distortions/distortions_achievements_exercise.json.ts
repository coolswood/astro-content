// src/pages/api/[lang]/achievements_exercise.json.ts
// Миграция файла distortions/achievements_exercise по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; все p()/h2() рендерим строками; instagram fallback на en; порядок шагов сохранён.
// Путь к локализации: src/i18n/${lang}/story/distortions/achievements_exercise.json.

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
        path.resolve(
          `src/i18n/${lang}/story/distortions/achievements_exercise.json`,
        ),
        'utf-8',
      ),
    );

    // Как в start: fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(
          `src/i18n/en/story/distortions/achievements_exercise.json`,
        ),
        'utf-8',
      ),
    );

    const output = {
      id: 'DISTORTIONS_ACHIEVEMENTS_EXERCISE',
      color: '#BABFF3',
      url: 'distortions-achievements_exercise',
      title: story.title,
      description: story.description,
      time: 10,
      type: 'exercise',
      img: 'exercise',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            `<h2>${story.screen_1.texts[4]}</h2>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            `<p>${story.screen_1.texts[8]}</p>`,
            `<h2>${story.screen_1.texts[9]}</h2>`,
            `<p>${story.screen_1.texts[10]}</p>`,
            `<p>${story.screen_1.texts[11]}</p>`,
            `<p>${story.screen_1.texts[12]}</p>`,
            `<p>${story.screen_1.texts[13]}</p>`,
            `<p>${story.screen_1.texts[14]}</p>`,
            important(story.screen_1.texts[15]),
            `<p>${story.screen_1.texts[16]}</p>`,
            `<p>${story.screen_1.texts[17]}</p>`,
            `<p>${story.screen_1.texts[18]}</p>`,
            `<p>${story.screen_1.texts[19]}</p>`,
            `<p>${story.screen_1.texts[20]}</p>`,
            `<p>${story.screen_1.texts[21]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.screen_2.texts[0]}</h2>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<h2>${story.screen_2.texts[5]}</h2>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            `<p>${story.screen_2.texts[7]}</p>`,
            `<p>${story.screen_2.texts[8]}</p>`,
            `<p>${story.screen_2.texts[9]}</p>`,
            q(story.screen_2.quote.text, story.screen_2.quote.author),
            `<p>${story.screen_2.texts[10]}</p>`,
            `<p>${story.screen_2.texts[11]}</p>`,
            `<h2>${story.screen_2.texts[12]}</h2>`,
            `<p>${story.screen_2.texts[13]}</p>`,
            `<p>${story.screen_2.texts[14]}</p>`,
            `<h2>${story.screen_2.texts[15]}</h2>`,
            `<p>${story.screen_2.texts[16]}</p>`,
            `<p>${story.screen_2.texts[17]}</p>`,
            `<p>${story.screen_2.texts[18]}</p>`,
            important(story.screen_2.texts[19]),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.screen_3.texts[0]}</h2>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<h2>${story.screen_3.texts[4]}</h2>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<h2>${story.screen_3.texts[7]}</h2>`,
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
            `<p>${story.screen_3.texts[10]}</p>`,
            q(story.screen_3.quote.text, story.screen_3.quote.author),
            `<p>${story.screen_3.texts[11]}</p>`,
            `<p>${story.screen_3.texts[12]}</p>`,
            `<p>${story.screen_3.texts[13]}</p>`,
            important(story.screen_3.texts[14]),
            `<p>${story.screen_3.texts[15]}</p>`,
            `<p>${story.screen_3.texts[16]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/distortions/distortions_achievements_exercise.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/distortions/distortions_achievements_exercise.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
