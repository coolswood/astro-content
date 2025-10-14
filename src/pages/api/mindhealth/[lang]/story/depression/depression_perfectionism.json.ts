// src/pages/api/[lang]/perfectionism.json.ts
// Миграция файла depression_perfectionism (perfectionism) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>; instagram fallback на en, как в start.
// Путь к локализации: src/i18n/${lang}/story/depression/perfectionism.json.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { instagramStep, important, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depression/perfectionism.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/depression/perfectionism.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_PERFECTIONISM',
      color: '#F3CBBA',
      url: 'depression-perfectionism',
      title: story.title,
      description: story.description,
      time: 5,
      type: 'theory',
      img: 'depression_perfectionism',
      isPremium: true,
      screens: [
        {
          // @ts-ignore
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
          ],
        },
        {
          // @ts-ignore
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            important(story.screen_2.texts[3]),
            `<p>${story.screen_2.texts[4]}</p>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_2.texts[7]}</p>`,
            `<p>${story.screen_2.texts[8]}</p>`,
            `<p>${story.screen_2.texts[9]}</p>`,
            `<p>${story.screen_2.texts[10]}</p>`,
            `<p>${story.screen_2.texts[11]}</p>`,
          ],
        },
        {
          // @ts-ignore
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
          // @ts-ignore
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<h2>${story.screen_3.texts[1]}</h2>`,
            `<li>${story.screen_3.texts[2]}</li>`,
            `<li>${story.screen_3.texts[3]}</li>`,
            `<li>${story.screen_3.texts[4]}</li>`,
            `<h2>${story.screen_3.texts[5]}</h2>`,
            `<li>${story.screen_3.texts[6]}</li>`,
            `<li>${story.screen_3.texts[7]}</li>`,
            `<li>${story.screen_3.texts[8]}</li>`,
            `<li>${story.screen_3.texts[9]}</li>`,
            `<p>${story.screen_3.texts[10]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/depression/depression_perfectionism.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/depression/depression_perfectionism.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
