// src/pages/api/[lang]/key.json.ts
// Миграция файла distortions/key по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/distortions/key.json.
// Как и в других файлах: английский fallback только для instagram-блока.
// В исходном коде instagram указывал на approval.instagram.0; здесь берём instagram из key.json (fallback en), чтобы не плодить межфайловые зависимости.

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
        path.resolve(`src/i18n/${lang}/story/distortions/key.json`),
        'utf-8',
      ),
    );

    // fallback только для instagram
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/distortions/key.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DISTORTIONS_KEY',
      color: '#C9DFFF',
      url: 'distortions-key',
      title: story.title,
      description: story.description,
      time: 4,
      type: 'theory',
      img: 'distortions_key',
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
            q(story.screen_1.quote.text, story.screen_1.quote.author),
            `<p>${story.screen_1.texts[5]}</p>`,
          ],
        },
        // Screen 2
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<li>${story.screen_2.texts[1]}</li>`,
            `<li>${story.screen_2.texts[2]}</li>`,
            `<li>${story.screen_2.texts[3]}</li>`,
            `<li>${story.screen_2.texts[4]}</li>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            `<li>${story.screen_2.texts[6]}</li>`,
            `<li>${story.screen_2.texts[7]}</li>`,
            `<li>${story.screen_2.texts[8]}</li>`,
            `<li>${story.screen_2.texts[9]}</li>`,
            `<p>${story.screen_2.texts[10]}</p>`,
            `<p>${story.screen_2.texts[11]}</p>`,
            q(story.screen_2.quote.text, story.screen_2.quote.author),
          ],
        },
        // Screen 3
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            important(story.screen_3.texts[2]),
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<p>${story.screen_3.texts[7]}</p>`,
            instagram(story.instagram || storyEn.instagram),
            `<p>${story.screen_3.texts[8]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken key file' }),
      { status: 404 },
    );
  }
};
