// src/pages/api/[lang]/diagnostic.json.ts
// Миграция файла depression_diagnostic (diagnostic) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; вызовы li() заменены на строковые <li>...</li>; instagram fallback на en, как в start.
// Путь к локализации: src/i18n/${lang}/story/depression/diagnostic.json.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { instagramStep, q, important } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depression/diagnostic.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/depression/diagnostic.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_DIAGNOSTIC',
      color: '#D29DDB',
      url: 'depression-diagnostic',
      title: story.title,
      description: story.description,
      time: 7,
      type: 'theory',
      img: 'depression_diagnostic',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<h2>${story.screen_1.texts[3]}</h2>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<li>${story.screen_1.texts[5]}</li>`,
            `<li>${story.screen_1.texts[6]}</li>`,
            `<li>${story.screen_1.texts[7]}</li>`,
            `<li>${story.screen_1.texts[8]}</li>`,
            `<li>${story.screen_1.texts[9]}</li>`,
            `<li>${story.screen_1.texts[10]}</li>`,
            `<li>${story.screen_1.texts[11]}</li>`,
            `<li>${story.screen_1.texts[12]}</li>`,
            `<li>${story.screen_1.texts[13]}</li>`,
            `<p>${story.screen_1.texts[14]}</p>`,
            `<p>${story.screen_1.texts[15]}</p>`,
            `<p>${story.screen_1.texts[16]}</p>`,
            `<p>${story.screen_1.texts[17]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            q(story.screen_2.quote.text, story.screen_2.quote.author),
          ],
        },
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
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/depression/depression_diagnostic.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/depression/depression_diagnostic.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
