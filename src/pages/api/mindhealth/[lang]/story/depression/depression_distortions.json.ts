// src/pages/api/[lang]/distortions.json.ts
// Миграция файла depression_distortions (distortions) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; instagram fallback на en (как в start).
// Путь к локализации: src/i18n/${lang}/story/depression/distortions.json.

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
    let story;

    const fullStory = JSON.parse(
      await fs.readFile(
        path.resolve(
          `src/i18n/${lang}/story/depression/disability_disease_distortions.json`,
        ),
        'utf-8',
      ),
    );
    story = fullStory.distortions;

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(
          `src/i18n/en/story/depression/disability_disease_distortions.json`,
        ),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_DISTORTIONS',
      color: '#C1C1C1',
      url: 'depression-distortions',
      title: story.title,
      description: story.description,
      time: 6,
      type: 'theory',
      img: 'depression_distortions',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            important(story.screen_2.texts[6]),
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
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/depression/depression_distortions.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/depression/depression_distortions.json.ts: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
