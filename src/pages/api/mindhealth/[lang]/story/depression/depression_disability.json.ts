// src/pages/api/[lang]/disability.json.ts
// Миграция файла depression_disability (disability) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; instagram fallback на en, как в start.
// Путь к локализации: src/i18n/${lang}/story/depression/disability.json.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { instagramStep, dialog, important, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depression/disability.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/depression/disability.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_DISABILITY',
      color: '#BABFF3',
      url: 'depression-disability',
      title: story.title,
      description: story.description,
      time: 8,
      type: 'theory',
      img: 'depression_disability',
      isPremium: true,
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
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            important(story.screen_1.texts[8]),
            `<p>${story.screen_1.texts[9]}</p>`,
            `<p>${story.screen_1.texts[10]}</p>`,
            `<p>${story.screen_1.texts[11]}</p>`,
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
            q(story.screen_2.quote.text, story.screen_2.quote.author),
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
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            dialog({ psy: true, text: story.screen_3.texts[4] }),
            dialog({ text: story.screen_3.texts[5] }),
            dialog({ psy: true, text: story.screen_3.texts[6] }),
            dialog({ text: story.screen_3.texts[7] }),
            dialog({ psy: true, text: story.screen_3.texts[8] }),
            dialog({ text: story.screen_3.texts[9] }),
            dialog({ psy: true, text: story.screen_3.texts[10] }),
            dialog({ psy: true, text: story.screen_3.texts[11] }),
            dialog({ psy: true, text: story.screen_3.texts[12] }),
            dialog({ text: story.screen_3.texts[13] }),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_4.texts[0]}</p>`,
            `<p>${story.screen_4.texts[1]}</p>`,
            `<p>${story.screen_4.texts[2]}</p>`,
            important(story.screen_4.texts[3]),
            `<p>${story.screen_4.texts[4]}</p>`,
            `<p>${story.screen_4.texts[5]}</p>`,
            `<p>${story.screen_4.texts[6]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken disability file' }),
      { status: 404 },
    );
  }
};
