// src/pages/api/[lang]/proof.json.ts
// Миграция файла proof по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые теги <li>...</li>; instagram fallback на en, как в start.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { instagram, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/proof.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(path.resolve(`src/i18n/en/story/proof.json`), 'utf-8'),
    );

    const output = {
      id: 'PROOF',
      color: '#FADBFF',
      url: 'is-cbt-effective',
      title: story.title,
      description: story.description,
      time: 4,
      type: 'theory',
      img: 'proof',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            instagram(story.instagram || storyEn.instagram),
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<li>${story.screen_2.texts[1]}</li>`,
            `<li>${story.screen_2.texts[2]}</li>`,
            `<li>${story.screen_2.texts[3]}</li>`,
            `<li>${story.screen_2.texts[4]}</li>`,
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
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken proof file' }),
      { status: 404 },
    );
  }
};
