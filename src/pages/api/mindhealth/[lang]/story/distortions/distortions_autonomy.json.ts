// src/pages/api/[lang]/autonomy.json.ts
// Миграция файла distortions/autonomy по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/distortions/autonomy.json.
// instagram не используется — fallback не нужен.

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
        path.resolve(`src/i18n/${lang}/story/distortions/autonomy.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DISTORTIONS_AUTONOMY',
      color: '#B1C7FF',
      url: 'distortions-autonomy',
      title: story.title,
      description: story.description,
      time: 6,
      type: 'theory',
      img: 'distortions_autonomy',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<li>${story.screen_1.texts[2]}</li>`,
            `<li>${story.screen_1.texts[3]}</li>`,
            `<li>${story.screen_1.texts[4]}</li>`,
            `<li>${story.screen_1.texts[5]}</li>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
            `<p>${story.screen_1.texts[8]}</p>`,
            `<p>${story.screen_1.texts[9]}</p>`,
            `<p>${story.screen_1.texts[10]}</p>`,
            important(story.screen_1.texts[11]),
            `<p>${story.screen_1.texts[12]}</p>`,
            `<p>${story.screen_1.texts[13]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            q(story.screen_2.quote.text, story.screen_2.quote.author),
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            `<li>${story.screen_2.texts[5]}</li>`,
            `<li>${story.screen_2.texts[6]}</li>`,
            `<li>${story.screen_2.texts[7]}</li>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<li>${story.screen_3.texts[2]}</li>`,
            `<li>${story.screen_3.texts[3]}</li>`,
            `<li>${story.screen_3.texts[4]}</li>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<p>${story.screen_3.texts[7]}</p>`,
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
            important(story.screen_3.texts[10]),
            `<p>${story.screen_3.texts[11]}</p>`,
            `<p>${story.screen_3.texts[12]}</p>`,
            `<p>${story.screen_3.texts[13]}</p>`,
            `<p>${story.screen_3.texts[14]}</p>`,
            `<p>${story.screen_3.texts[15]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken autonomy file' }),
      { status: 404 },
    );
  }
};
