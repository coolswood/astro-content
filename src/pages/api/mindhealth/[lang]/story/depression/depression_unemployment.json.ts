// src/pages/api/[lang]/unemployment.json.ts
// Миграция файла depression_unemployment (unemployment) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/depression/unemployment.json.
// instagram в этой истории не используется — fallback не нужен.

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
        path.resolve(`src/i18n/${lang}/story/depression/unemployment.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_UNEMPLOYMENT',
      color: '#C5DFFF',
      url: 'depression-unemployment',
      title: story.title,
      description: story.description,
      time: 7,
      type: 'theory',
      img: 'depression_unemployment',
      isPremium: true,
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<li>${story.screen_1.texts[1]}</li>`,
            `<li>${story.screen_1.texts[2]}</li>`,
            `<li>${story.screen_1.texts[3]}</li>`,
            `<li>${story.screen_1.texts[4]}</li>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
            `<p>${story.screen_1.texts[8]}</p>`,
            `<p>${story.screen_1.texts[9]}</p>`,
            `<p>${story.screen_1.texts[10]}</p>`,
            `<p>${story.screen_1.texts[11]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            important(story.screen_2.texts[3]),
            `<p>${story.screen_2.texts[4]}</p>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            `<p>${story.screen_2.texts[7]}</p>`,
            `<p>${story.screen_2.texts[8]}</p>`,
            `<p>${story.screen_2.texts[9]}</p>`,
            `<p>${story.screen_2.texts[10]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            important(story.screen_3.texts[4]),
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<p>${story.screen_3.texts[7]}</p>`,
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_4.texts[0]}</p>`,
            `<p>${story.screen_4.texts[1]}</p>`,
            `<h2>${story.screen_4.texts[2]}</h2>`,
            `<li>${story.screen_4.texts[3]}</li>`,
            `<li>${story.screen_4.texts[4]}</li>`,
            `<li>${story.screen_4.texts[5]}</li>`,
            `<li>${story.screen_4.texts[6]}</li>`,
            `<li>${story.screen_4.texts[7]}</li>`,
            `<li>${story.screen_4.texts[8]}</li>`,
            `<li>${story.screen_4.texts[9]}</li>`,
            `<li>${story.screen_4.texts[10]}</li>`,
            `<p>${story.screen_4.texts[11]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/depression/depression_unemployment.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/depression/depression_unemployment.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
