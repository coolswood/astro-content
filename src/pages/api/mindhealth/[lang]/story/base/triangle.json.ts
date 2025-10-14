// src/pages/api/[lang]/triangle.json.ts

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { instagramStep, dialog, important } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/triangle.json`),
        'utf-8',
      ),
    );

    // Как и в start: english fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/triangle.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'TRIANGLE',
      color: '#FFE8AE',
      url: 'thought-feeling-behavior-triad',
      title: story.title,
      description: story.description,
      time: 8,
      type: 'theory',
      img: 'triangle',
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
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_1.texts[8]}</p>`,
            `<p>${story.screen_1.texts[9]}</p>`,
            `<p>${story.screen_1.texts[10]}</p>`,
            `<p>${story.screen_1.texts[11]}</p>`,
            `<p>${story.screen_1.texts[12]}</p>`,
            `<p>${story.screen_1.texts[13]}</p>`,
            `<p>${story.screen_1.texts[14]}</p>`,
            `<p>${story.screen_1.texts[15]}</p>`,
            `<p>${story.screen_1.texts[16]}</p>`,
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
            `<p>${story.screen_2.texts[6]}</p>`,
            `<p>${story.screen_2.texts[7]}</p>`,
            `<p>${story.screen_2.texts[8]}</p>`,
            `<p>${story.screen_2.texts[9]}</p>`,
            `<p>${story.screen_2.texts[10]}</p>`,
            `<p>${story.screen_2.texts[11]}</p>`,
            `<p>${story.screen_2.texts[12]}</p>`,
            `<p>${story.screen_2.texts[13]}</p>`,
            `<p>${story.screen_2.texts[14]}</p>`,
            `<p>${story.screen_2.texts[15]}</p>`,
            `<p>${story.screen_2.texts[16]}</p>`,
            `<p>${story.screen_2.texts[17]}</p>`,
            important(story.screen_2.texts[18]),
            `<p>${story.screen_2.texts[19]}</p>`,
          ],
        },
        {
          __typename: 'ScreenTest',
          question: story.test.question,
          answers: [
            story.test.answers[0],
            story.test.answers[1],
            story.test.answers[2],
            story.test.answers[3],
          ],
          correctAnswer: 2,
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            dialog({ isMan: false, text: story.screen_3.dialog[0] }),
            dialog({ psy: true, text: story.screen_3.dialog[1] }),
            dialog({ isMan: false, text: story.screen_3.dialog[2] }),
            dialog({ psy: true, text: story.screen_3.dialog[3] }),
            dialog({ isMan: false, text: story.screen_3.dialog[4] }),
            dialog({ psy: true, text: story.screen_3.dialog[5] }),
            dialog({ psy: true, text: story.screen_3.dialog[6] }),
            dialog({ psy: true, text: story.screen_3.dialog[7] }),
            dialog({ isMan: false, text: story.screen_3.dialog[8] }),
            dialog({ psy: true, text: story.screen_3.dialog[9] }),
            dialog({ psy: true, text: story.screen_3.dialog[10] }),
            dialog({ psy: true, text: story.screen_3.dialog[11] }),
            dialog({ isMan: false, text: story.screen_3.dialog[12] }),
            dialog({ psy: true, text: story.screen_3.dialog[13] }),
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
            `<p>${story.screen_4.texts[5]}</p>`,
            `<p>${story.screen_4.texts[6]}</p>`,
            `<p>${story.screen_4.texts[7]}</p>`,
            `<p>${story.screen_4.texts[8]}</p>`,
            `<p>${story.screen_4.texts[9]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/base/triangle.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/base/triangle.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
