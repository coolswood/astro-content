// src/pages/api/[lang]/trap.json.ts
// Миграция файла depression_trap (trap) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/depression/trap.json.
// instagram не используется.

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
        path.resolve(`src/i18n/${lang}/story/depression/trap.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_TRAP',
      color: '#BABFF3',
      url: 'depression-trap',
      title: story.title,
      description: story.description,
      time: 9,
      type: 'exercise',
      img: 'exercise',
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
            `<li>${story.screen_1.texts[5]}</li>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            `<p>${story.screen_1.texts[8]}</p>`,
            important(story.screen_1.texts[9]),
            `<p>${story.screen_1.texts[10]}</p>`,
            `<p>${story.screen_1.texts[11]}</p>`,
            `<p>${story.screen_1.texts[12]}</p>`,
            `<p>${story.screen_1.texts[13]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<li>${story.screen_2.texts[1]}</li>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            `<li>${story.screen_2.texts[4]}</li>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            `<p>${story.screen_2.texts[7]}</p>`,
            `<li>${story.screen_2.texts[8]}</li>`,
            `<p>${story.screen_2.texts[9]}</p>`,
            `<p>${story.screen_2.texts[10]}</p>`,
            `<p>${story.screen_2.texts[11]}</p>`,
            `<p>${story.screen_2.texts[12]}</p>`,
            important(story.screen_2.texts[13]),
            `<p>${story.screen_2.texts[14]}</p>`,
            `<p>${story.screen_2.texts[15]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<li>${story.screen_3.texts[0]}</li>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<p>${story.screen_3.texts[7]}</p>`,
            `<li>${story.screen_3.texts[8]}</li>`,
            `<p>${story.screen_3.texts[9]}</p>`,
            `<p>${story.screen_3.texts[10]}</p>`,
            `<p>${story.screen_3.texts[11]}</p>`,
            `<p>${story.screen_3.texts[12]}</p>`,
            `<p>${story.screen_3.texts[13]}</p>`,
            `<p>${story.screen_3.texts[14]}</p>`,
            `<p>${story.screen_3.texts[15]}</p>`,
            `<p>${story.screen_3.texts[16]}</p>`,
            `<p>${story.screen_3.texts[17]}</p>`,
            important(story.screen_3.texts[18]),
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/depression/depression_trap.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/depression/depression_trap.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
