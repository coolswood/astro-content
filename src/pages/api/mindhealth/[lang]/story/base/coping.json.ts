// src/pages/api/[lang]/coping.json.ts
// Миграция файла coping по аналогии с Вашим start.json.ts (минимально; без лишней логики кроме instagram fallback, как у start).

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { important, instagramStep, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/coping.json`),
        'utf-8',
      ),
    );

    // Как в start: используем английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(path.resolve(`src/i18n/en/story/coping.json`), 'utf-8'),
    );

    const output = {
      id: 'COPING',
      color: '#76B4FF',
      url: 'coping',
      title: story.title,
      description: story.description,
      time: 5,
      type: 'theory',
      img: 'coping',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<h2>${story.screen_1.texts[1]}</h2>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<h2>${story.screen_1.texts[3]}</h2>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            `<p>${story.screen_1.texts[8]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
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
            `<p>${story.screen_2.texts[5]}</p>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            important(story.screen_2.texts[7]),
            `<p>${story.screen_2.texts[8]}</p>`,
            `<p>${story.screen_2.texts[9]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<h2>${story.screen_3.texts[1]}</h2>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<h2>${story.screen_3.texts[4]}</h2>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<h2>${story.screen_3.texts[7]}</h2>`,
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
            `<h2>${story.screen_3.texts[10]}</h2>`,
            `<p>${story.screen_3.texts[11]}</p>`,
            `<p>${story.screen_3.texts[12]}</p>`,
            `<p>${story.screen_3.texts[13]}</p>`,
            `<p>${story.screen_3.texts[14]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/base/coping.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/base/coping.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
