// src/pages/api/[lang]/depression_story.json.ts
// Миграция файла depression_story по аналогии с Вашим start.json.ts (минимально; instagram fallback как у start).

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { instagramStep, dialog } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depression_story.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/depression_story.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_STORY',
      color: '#F3BABA',
      url: 'the-story-of-overcoming-depression',
      title: story.title,
      description: story.description,
      time: 5,
      type: 'theory',
      img: 'depression_story',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            dialog({ psy: true, text: story.screen_2.dialog[0] }),
            dialog({ text: story.screen_2.dialog[1] }),
            dialog({ psy: true, text: story.screen_2.dialog[2] }),
            dialog({ text: story.screen_2.dialog[3] }),
            dialog({ psy: true, text: story.screen_2.dialog[4] }),
            dialog({ text: story.screen_2.dialog[5] }),
            dialog({ psy: true, text: story.screen_2.dialog[6] }),
            dialog({ text: story.screen_2.dialog[7] }),
            dialog({ psy: true, text: story.screen_2.dialog[8] }),
            dialog({ text: story.screen_2.dialog[9] }),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/base/depression_story.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/base/depression_story.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
