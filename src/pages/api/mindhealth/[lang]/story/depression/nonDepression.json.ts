// src/pages/api/[lang]/nonDepression.json.ts
// Миграция файла depression_nonDepression (nonDepression) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; instagram fallback на en, как в start.
// Путь к локализации: src/i18n/${lang}/story/depression/nonDepression.json.

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
        path.resolve(`src/i18n/${lang}/story/depression/nonDepression.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/depression/nonDepression.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_NON_DEPRESSION',
      color: '#FFE3CC',
      url: 'depression-nonDepression',
      title: story.title,
      description: story.description,
      time: 4,
      type: 'theory',
      img: 'depression_nonDepression',
      isPremium: true,
      screens: [
        {
          // @ts-ignore
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            important(story.screen_1.texts[4]),
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            instagram(story.instagram || storyEn.instagram),
            `<p>${story.screen_1.texts[8]}</p>`,
            `<p>${story.screen_1.texts[9]}</p>`,
          ],
        },
        {
          // @ts-ignore
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            q(story.screen_2.quote.text, story.screen_2.quote.author),
            `<p>${story.screen_2.texts[3]}</p>`,
            important(story.screen_2.texts[4]),
            `<p>${story.screen_2.texts[5]}</p>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            `<p>${story.screen_2.texts[7]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken nonDepression file' }),
      { status: 404 },
    );
  }
};
