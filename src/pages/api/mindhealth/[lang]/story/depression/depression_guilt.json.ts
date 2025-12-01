// src/pages/api/[lang]/guilt.json.ts
// Миграция файла depression_guilt (guilt) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/depression/guilt.json.
// В этой истории instagram не используется, поэтому fallback на en не требуется.

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
    let story;

    const fullStory = JSON.parse(
      await fs.readFile(
        path.resolve(
          `src/i18n/${lang}/story/depression/duty_guilt_incrimination.json`,
        ),
        'utf-8',
      ),
    );
    story = fullStory.guilt;

    const output = {
      id: 'DEPRESSION_GUILT',
      color: '#D7DBFF',
      url: 'depression-guilt',
      title: story.title,
      description: story.description,
      time: 10,
      type: 'theory',
      img: 'depression_guilt',
      isPremium: true,
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            important(story.screen_1.texts[2]),
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            `<p>${story.screen_1.texts[8]}</p>`,
            `<p>${story.screen_1.texts[9]}</p>`,
            `<p>${story.screen_1.texts[10]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<li>${story.screen_2.texts[1]}</li>`,
            `<li>${story.screen_2.texts[2]}</li>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            important(story.screen_2.texts[7]),
            `<p>${story.screen_2.texts[8]}</p>`,
            `<p>${story.screen_2.texts[9]}</p>`,
            `<p>${story.screen_2.texts[10]}</p>`,
            `<p>${story.screen_2.texts[11]}</p>`,
            q(story.screen_2.quote.text, story.screen_2.quote.author),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<h2>${story.screen_3.texts[4]}</h2>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<p>${story.screen_3.texts[7]}</p>`,
            important(story.screen_3.texts[8]),
            `<p>${story.screen_3.texts[9]}</p>`,
            `<p>${story.screen_3.texts[10]}</p>`,
            `<p>${story.screen_3.texts[11]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.screen_4.texts[0]}</h2>`,
            `<p>${story.screen_4.texts[1]}</p>`,
            important(story.screen_4.texts[2]),
            `<p>${story.screen_4.texts[3]}</p>`,
            `<p>${story.screen_4.texts[4]}</p>`,
            `<p>${story.screen_4.texts[5]}</p>`,
            `<p>${story.screen_4.texts[6]}</p>`,
            `<p>${story.screen_4.texts[7]}</p>`,
            `<p>${story.screen_4.texts[8]}</p>`,
            `<li>${story.screen_4.texts[9]}</li>`,
            `<li>${story.screen_4.texts[10]}</li>`,
            `<li>${story.screen_4.texts[11]}</li>`,
            `<li>${story.screen_4.texts[12]}</li>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(`Error generating depression_guilt.json:`, err);
    throw new Error(
      `Failed to generate depression_guilt.json: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
