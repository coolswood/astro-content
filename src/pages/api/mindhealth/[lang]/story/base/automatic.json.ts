// src/pages/api/[lang]/automatic.json.ts
// Миграция файла automatic по аналогии с Вашим start.json.ts (минимально; без лишней логики).

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { step, instagramStep, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/automatic.json`),
        'utf-8',
      ),
    );

    const common = JSON.parse(
      await fs.readFile(path.resolve(`src/i18n/${lang}/common.json`), 'utf-8'),
    );

    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/automatic.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'AUTOMATIC',
      color: '#FFAED3',
      url: 'cbt-automatic-thoughts',
      title: story.title,
      description: story.description,
      time: 5,
      type: 'theory',
      img: 'automatic',
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
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
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
            `<p>${story.screen_2.texts[6]}</p>`,
            // stepper #1
            step(common.automatic, story.screen_2.stepper_1[0]),
            step(common.emotions, story.screen_2.stepper_1[1]),
            step(common.behavior, story.screen_2.stepper_1[2]),
            `<p>${story.screen_2.texts[7]}</p>`,
            // stepper #2
            step(common.automatic, story.screen_2.stepper_2[0]),
            step(common.emotions, story.screen_2.stepper_2[1]),
            step(common.behavior, story.screen_2.stepper_2[2]),
            `<p>${story.screen_2.texts[8]}</p>`,
            `<p>${story.screen_2.texts[9]}</p>`,
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
          correctAnswer: 3,
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/base/automatic.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/base/automatic.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
