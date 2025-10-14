// src/pages/api/[lang]/control.json.ts

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import {
  activitylink,
  important,
  instagramStep,
  q,
  dialog,
} from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depression/control.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/depression/control.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_CONTROL',
      color: '#BABFF3',
      url: 'depression-control',
      title: story.title,
      description: story.description,
      time: 4,
      type: 'exercise',
      img: 'exercise',
      isPremium: true,
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            activitylink('lsafnanS3sf'),
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            important(story.screen_1.texts[6]),
            `<p>${story.screen_1.texts[7]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            `<li>${story.screen_2.texts[5]}</li>`,
            `<li>${story.screen_2.texts[6]}</li>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            dialog({ isMan: true, text: story.screen_3.texts[2] }),
            dialog({ isMan: true, text: story.screen_3.texts[3] }),
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
      `Error generating src/pages/api/mindhealth/[lang]/story/depression/depression_control.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/depression/depression_control.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
