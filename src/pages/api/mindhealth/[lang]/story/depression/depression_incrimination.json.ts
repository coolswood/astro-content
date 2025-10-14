// src/pages/api/[lang]/incrimination.json.ts
// Миграция файла depression_incrimination (incrimination) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/depression/incrimination.json.
// instagram fallback на en, как в start.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { instagramStep, dialog, important, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depression/incrimination.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/depression/incrimination.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_INCRIMINATION',
      color: '#C1C1C1',
      url: 'depression-incrimination',
      title: story.title,
      description: story.description,
      time: 8,
      type: 'theory',
      img: 'depression_incrimination',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<li>${story.screen_1.texts[5]}</li>`,
            `<li>${story.screen_1.texts[6]}</li>`,
            `<li>${story.screen_1.texts[7]}</li>`,
            `<li>${story.screen_1.texts[8]}</li>`,
            `<p>${story.screen_1.texts[9]}</p>`,
            `<p>${story.screen_1.texts[10]}</p>`,
            `<p>${story.screen_1.texts[11]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            dialog({ psy: true, text: story.screen_2.texts[2] }),
            dialog({ text: story.screen_2.texts[3] }),
            dialog({ psy: true, text: story.screen_2.texts[4] }),
            dialog({ text: story.screen_2.texts[5] }),
            dialog({ psy: true, text: story.screen_2.texts[6] }),
            dialog({ text: story.screen_2.texts[7] }),
            dialog({ psy: true, text: story.screen_2.texts[8] }),
            dialog({ text: story.screen_2.texts[9] }),
            `<p>${story.screen_2.texts[10]}</p>`,
            `<p>${story.screen_2.texts[11]}</p>`,
            `<p>${story.screen_2.texts[12]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            important(story.screen_3.texts[3]),
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<p>${story.screen_3.texts[7]}</p>`,
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
            important(story.screen_3.texts[10]),
            `<p>${story.screen_3.texts[11]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_4.texts[0]}</p>`,
            `<p>${story.screen_4.texts[1]}</p>`,
            `<p>${story.screen_4.texts[2]}</p>`,
            `<p>${story.screen_4.texts[3]}</p>`,
            `<p>${story.screen_4.texts[4]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/depression/depression_incrimination.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/depression/depression_incrimination.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
