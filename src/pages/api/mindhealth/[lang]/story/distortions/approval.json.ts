// src/pages/api/[lang]/approval.json.ts
// Миграция файла distortions/approval по той же схеме, что и start.json.ts.
// Минимально: без лишней логики; instagram fallback на en; порядок шагов сохранён.
// Путь к локализации: src/i18n/${lang}/story/distortions/approval.json.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { important, instagram, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/distortions/approval.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/distortions/approval.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DISTORTIONS_APPROVAL',
      color: '#EDFFE9',
      url: 'distortions-approval',
      title: story.title,
      description: story.description,
      time: 8,
      type: 'theory',
      img: 'distortions_approval',
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
            q(story.screen_1.quote.text, story.screen_1.quote.author),
            `<p>${story.screen_1.texts[5]}</p>`,
            important(story.screen_1.texts[6]),
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
            `<p>${story.screen_2.texts[5]}</p>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            instagram(story.instagram || storyEn.instagram),
            `<p>${story.screen_2.texts[7]}</p>`,
            `<p>${story.screen_2.texts[8]}</p>`,
            `<p>${story.screen_2.texts[9]}</p>`,
            `<p>${story.screen_2.texts[10]}</p>`,
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
            important(story.screen_3.texts[2]),
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<p>${story.screen_3.texts[7]}</p>`,
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
      JSON.stringify({ error: 'Not found or broken approval file' }),
      { status: 404 },
    );
  }
};
