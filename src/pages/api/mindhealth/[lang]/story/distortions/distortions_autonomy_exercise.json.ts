// src/pages/api/[lang]/autonomy_exercise.json.ts
// Миграция файла distortions/autonomy_exercise по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/distortions/autonomy_exercise.json.
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
        path.resolve(
          `src/i18n/${lang}/story/distortions/autonomy_exercise.json`,
        ),
        'utf-8',
      ),
    );

    const output = {
      id: 'DISTORTIONS_AUTONOMY_EXERCISE',
      color: '#BABFF3',
      url: 'distortions-autonomy_exercise',
      title: story.title,
      description: story.description,
      time: 6,
      type: 'exercise',
      img: 'exercise',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            important(story.screen_1.texts[2]),
            `<p>${story.screen_1.texts[3]}</p>`,
            `<h2>${story.screen_1.texts[4]}</h2>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            `<p>${story.screen_1.texts[8]}</p>`,
            `<li>${story.screen_1.texts[9]}</li>`,
            `<li>${story.screen_1.texts[10]}</li>`,
            `<li>${story.screen_1.texts[11]}</li>`,
            `<li>${story.screen_1.texts[12]}</li>`,
            `<li>${story.screen_1.texts[13]}</li>`,
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
            `<li>${story.screen_2.texts[5]}</li>`,
            `<li>${story.screen_2.texts[6]}</li>`,
            `<li>${story.screen_2.texts[7]}</li>`,
            `<li>${story.screen_2.texts[8]}</li>`,
            `<h2>${story.screen_2.texts[9]}</h2>`,
            `<p>${story.screen_2.texts[10]}</p>`,
            `<li>${story.screen_2.texts[11]}</li>`,
            `<li>${story.screen_2.texts[12]}</li>`,
            `<li>${story.screen_2.texts[13]}</li>`,
            `<h2>${story.screen_2.texts[14]}</h2>`,
            `<p>${story.screen_2.texts[15]}</p>`,
            `<li>${story.screen_2.texts[16]}</li>`,
            `<li>${story.screen_2.texts[17]}</li>`,
            `<p>${story.screen_2.texts[18]}</p>`,
            `<li>${story.screen_2.texts[19]}</li>`,
            `<li>${story.screen_2.texts[20]}</li>`,
            `<p>${story.screen_2.texts[21]}</p>`,
            `<li>${story.screen_2.texts[22]}</li>`,
            `<li>${story.screen_2.texts[23]}</li>`,
            `<p>${story.screen_2.texts[24]}</p>`,
            `<p>${story.screen_2.texts[25]}</p>`,
            `<h2>${story.screen_2.texts[26]}</h2>`,
            `<p>${story.screen_2.texts[27]}</p>`,
            `<p>${story.screen_2.texts[28]}</p>`,
            `<p>${story.screen_2.texts[29]}</p>`,
            `<p>${story.screen_2.texts[30]}</p>`,
            `<p>${story.screen_2.texts[31]}</p>`,
            `<p>${story.screen_2.texts[32]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.screen_3.texts[0]}</h2>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<h2>${story.screen_3.texts[3]}</h2>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<p>${story.screen_3.texts[7]}</p>`,
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
            q(story.screen_3.quote.text, story.screen_3.quote.author),
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/distortions/distortions_autonomy_exercise.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/distortions/distortions_autonomy_exercise.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
