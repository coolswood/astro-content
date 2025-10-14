// src/pages/api/[lang]/history.json.ts
// Миграция файла history по аналогии с Вашим start.json.ts.
// Минимально: ручные <p>/<h2>, хелперы instagram/q; instagram fallback как у start.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { instagramStep, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/history.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/history.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'HISTORY',
      color: '#DBE3FF',
      url: 'history-of-cbt',
      title: story.title,
      description: story.description,
      time: 6,
      type: 'theory',
      img: 'history',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_1.texts[4]}</p>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            `<p>${story.screen_1.texts[8]}</p>`,
            `<p>${story.screen_1.texts[9]}</p>`,
            `<p>${story.screen_1.texts[10]}</p>`,
            `<p>${story.screen_1.texts[11]}</p>`,
            `<p>${story.screen_1.texts[12]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
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
          correctAnswer: 1,
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
            q(story.screen_2.quote.text, story.screen_2.quote.author),
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
            `<p>${story.screen_2.texts[18]}</p>`,
            `<p>${story.screen_2.texts[19]}</p>`,
            `<p>${story.screen_2.texts[20]}</p>`,
            `<p>${story.screen_2.texts[21]}</p>`,
            `<p>${story.screen_2.texts[22]}</p>`,
          ],
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
            `<p>${story.screen_3.texts[7]}</p>`,
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
            `<p>${story.screen_3.texts[10]}</p>`,
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
    console.error(`Error generating history.json:`, err);
    throw new Error(
      `Failed to generate history.json: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
