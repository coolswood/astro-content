// src/pages/api/[lang]/depths.json.ts
// Миграция файла depths по аналогии с Вашим start.json.ts (без лишней логики; instagram fallback как у start).

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { step, important, instagramStep } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depths.json`),
        'utf-8',
      ),
    );

    const common = JSON.parse(
      await fs.readFile(path.resolve(`src/i18n/${lang}/common.json`), 'utf-8'),
    );

    const storyEn = JSON.parse(
      await fs.readFile(path.resolve(`src/i18n/en/story/depths.json`), 'utf-8'),
    );

    const output = {
      id: 'DEPTHS',
      color: '#BADBF3',
      url: 'cbt-core-beliefs',
      title: story.title,
      description: story.description,
      time: 6,
      type: 'theory',
      img: 'depths',
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
            step(common.depth, story.screen_1.stepper[0]),
            step(common.intermediate, story.screen_1.stepper[1]),
            step(common.automatic, story.screen_1.stepper[2]),
            `<p>${story.screen_1.texts[7]}</p>`,
            `<p>${story.screen_1.texts[8]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.screen_2.texts[0]}</h2>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_2.texts[4]}</p>`,
            `<h2>${story.screen_2.texts[5]}</h2>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            `<p>${story.screen_2.texts[7]}</p>`,
            `<p>${story.screen_2.texts[8]}</p>`,
            `<p>${story.screen_2.texts[9]}</p>`,
            `<h2>${story.screen_2.texts[10]}</h2>`,
            `<p>${story.screen_2.texts[11]}</p>`,
            `<p>${story.screen_2.texts[12]}</p>`,
            `<p>${story.screen_2.texts[13]}</p>`,
            `<p>${story.screen_2.texts[14]}</p>`,
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
          correctAnswer: 0,
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
            important(story.screen_3.texts[6]),
            `<p>${story.screen_3.texts[7]}</p>`,
            `<p>${story.screen_3.texts[8]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/base/depths.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/base/depths.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
