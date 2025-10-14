// src/pages/api/[lang]/love.json.ts
// Миграция файла distortions/love по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/distortions/love.json.
// Английский fallback используется только для instagram.

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
        path.resolve(`src/i18n/${lang}/story/distortions/love.json`),
        'utf-8',
      ),
    );

    // fallback только для instagram
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/distortions/love.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DISTORTIONS_LOVE',
      color: '#FFBFBF',
      url: 'distortions-love',
      title: story.title,
      description: story.description,
      time: 6,
      type: 'theory',
      img: 'distortions_love',
      screens: [
        // Screen 1
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            important(story.screen_1.texts[5]),
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            `<p>${story.screen_1.texts[8]}</p>`,
            `<p>${story.screen_1.texts[9]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_1.texts[10]}</p>`,
            `<p>${story.screen_1.texts[11]}</p>`,
            `<p>${story.screen_1.texts[12]}</p>`,
          ],
        },
        // Screen 2
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<li>${story.screen_2.texts[2]}</li>`,
            `<li>${story.screen_2.texts[3]}</li>`,
            `<li>${story.screen_2.texts[4]}</li>`,
            `<li>${story.screen_2.texts[5]}</li>`,
            `<li>${story.screen_2.texts[6]}</li>`,
            `<p>${story.screen_2.texts[7]}</p>`,
            `<li>${story.screen_2.texts[8]}</li>`,
            `<li>${story.screen_2.texts[9]}</li>`,
            `<p>${story.screen_2.texts[10]}</p>`,
            `<p>${story.screen_2.texts[11]}</p>`,
            q(story.screen_2.quote.text, story.screen_2.quote.author),
            `<p>${story.screen_2.texts[12]}</p>`,
            `<p>${story.screen_2.texts[13]}</p>`,
            `<p>${story.screen_2.texts[14]}</p>`,
            important(story.screen_2.texts[15]),
            `<p>${story.screen_2.texts[16]}</p>`,
            `<p>${story.screen_2.texts[17]}</p>`,
            `<p>${story.screen_2.texts[18]}</p>`,
          ],
        },
        // Screen 3
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            q(story.screen_3.quote.text, story.screen_3.quote.author),
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<p>${story.screen_3.texts[7]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/distortions/distortions_love.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/distortions/distortions_love.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
