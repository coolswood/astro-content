// src/pages/api/[lang]/omnipotence_exercise.json.ts
// Миграция файла distortions/omnipotence_exercise по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/distortions/omnipotence_exercise.json.
// instagram в исходнике отсутствует — fallback не нужен.

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
        path.resolve(
          `src/i18n/${lang}/story/distortions/omnipotence_exercise.json`,
        ),
        'utf-8',
      ),
    );

    const output = {
      id: 'DISTORTIONS_OMNIPOTENCE_EXERCISE',
      color: '#BABFF3',
      url: 'distortions-omnipotence_exercise',
      title: story.title,
      description: story.description,
      time: 4,
      type: 'exercise',
      img: 'exercise',
      screens: [
        // Screen 1
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<li>${story.screen_1.texts[5]}</li>`,
            `<li>${story.screen_1.texts[6]}</li>`,
            `<li>${story.screen_1.texts[7]}</li>`,
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
            `<p>${story.screen_2.texts[6]}</p>`,
            q(story.screen_2.quote.text, story.screen_2.quote.author),
            `<p>${story.screen_2.texts[7]}</p>`,
            `<li>${story.screen_2.texts[8]}</li>`,
            `<li>${story.screen_2.texts[9]}</li>`,
            `<li>${story.screen_2.texts[10]}</li>`,
            `<li>${story.screen_2.texts[11]}</li>`,
            `<p>${story.screen_2.texts[12]}</p>`,
          ],
        },
        // Screen 3
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<h2>${story.screen_3.texts[1]}</h2>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<h2>${story.screen_3.texts[3]}</h2>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            important(story.screen_3.texts[6]),
            `<p>${story.screen_3.texts[7]}</p>`,
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: 'Not found or broken omnipotence_exercise file',
      }),
      { status: 404 },
    );
  }
};
