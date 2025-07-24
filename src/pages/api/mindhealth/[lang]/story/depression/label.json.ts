// src/pages/api/[lang]/label.json.ts
// Миграция файла depression_label (label) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/depression/label.json.
// instagram fallback на en, как в start.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { instagram, important, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depression/label.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/depression/label.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_LABEL',
      color: '#BADEF3',
      url: 'depression-label',
      title: story.title,
      description: story.description,
      time: 7,
      type: 'theory',
      img: 'depression_label',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
            `<p>${story.screen_1.texts[1]}</p>`,
            `<li>${story.screen_1.texts[2]}</li>`,
            `<li>${story.screen_1.texts[3]}</li>`,
            `<li>${story.screen_1.texts[4]}</li>`,
            `<li>${story.screen_1.texts[5]}</li>`,
            `<li>${story.screen_1.texts[6]}</li>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            `<p>${story.screen_1.texts[8]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            important(story.screen_2.texts[1]),
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            instagram(story.instagram || storyEn.instagram),
            `<p>${story.screen_2.texts[5]}</p>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            `<p>${story.screen_2.texts[7]}</p>`,
            `<p>${story.screen_2.texts[8]}</p>`,
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
            `<p>${story.screen_3.texts[0]}</p>`,
            `<h2>${story.screen_3.texts[1]}</h2>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<h2>${story.screen_3.texts[3]}</h2>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<h2>${story.screen_3.texts[7]}</h2>`,
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
            `<p>${story.screen_3.texts[10]}</p>`,
            `<p>${story.screen_3.texts[11]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken label file' }),
      { status: 404 },
    );
  }
};
