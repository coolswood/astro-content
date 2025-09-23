// src/pages/api/[lang]/omnipotence.json.ts
// Миграция файла distortions/omnipotence по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/distortions/omnipotence.json.
// instagram в исходнике нет — fallback не нужен.

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
        path.resolve(`src/i18n/${lang}/story/distortions/omnipotence.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DISTORTIONS_OMNIPOTENCE',
      color: '#BADEF3',
      url: 'distortions-omnipotence',
      title: story.title,
      description: story.description,
      time: 5,
      type: 'theory',
      img: 'distortions_omnipotence',
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
            `<li>${story.screen_1.texts[10]}</li>`,
            `<li>${story.screen_1.texts[11]}</li>`,
            `<li>${story.screen_1.texts[12]}</li>`,
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
            important(story.screen_2.texts[5]),
            `<p>${story.screen_2.texts[6]}</p>`,
            `<li>${story.screen_2.texts[7]}</li>`,
            `<li>${story.screen_2.texts[8]}</li>`,
            `<li>${story.screen_2.texts[9]}</li>`,
            `<li>${story.screen_2.texts[10]}</li>`,
            `<li>${story.screen_2.texts[11]}</li>`,
            `<li>${story.screen_2.texts[12]}</li>`,
            q(story.screen_2.quote.text, story.screen_2.quote.author),
          ],
        },
        // Screen 3
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.screen_3.texts[0]}</h2>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            important(story.screen_3.texts[7]),
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
            `<p>${story.screen_3.texts[10]}</p>`,
            `<p>${story.screen_3.texts[11]}</p>`,
            `<p>${story.screen_3.texts[12]}</p>`,
            q(story.screen_3.quote.text, story.screen_3.quote.author),
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken omnipotence file' }),
      { status: 404 },
    );
  }
};
