// src/pages/api/[lang]/plan.json.ts
// Миграция файла depression_plan (plan) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>; instagram fallback на en, как в start.
// Путь к локализации: src/i18n/${lang}/story/depression/plan.json.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { important, instagramStep, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depression/plan.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/depression/plan.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_PLAN',
      color: '#BABFF3',
      url: 'depression-plan',
      title: story.title,
      description: story.description,
      time: 4,
      type: 'exercise',
      img: 'exercise',
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
            important(story.screen_1.texts[4]),
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            `<li>${story.screen_2.texts[4]}</li>`,
            `<li>${story.screen_2.texts[5]}</li>`,
            `<li>${story.screen_2.texts[6]}</li>`,
            `<li>${story.screen_2.texts[7]}</li>`,
            `<li>${story.screen_2.texts[8]}</li>`,
            `<p>${story.screen_2.texts[9]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<li>${story.screen_3.texts[1]}</li>`,
            `<li>${story.screen_3.texts[2]}</li>`,
            `<li>${story.screen_3.texts[3]}</li>`,
            `<li>${story.screen_3.texts[4]}</li>`,
            `<li>${story.screen_3.texts[5]}</li>`,
            `<li>${story.screen_3.texts[6]}</li>`,
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
    return new Response(
      JSON.stringify({ error: 'Not found or broken plan file' }),
      { status: 404 },
    );
  }
};
