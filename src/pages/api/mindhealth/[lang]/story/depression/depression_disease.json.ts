// src/pages/api/[lang]/disease.json.ts
// Миграция файла depression_disease (disease) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>; instagram fallback на en, как в start.
// Путь к локализации: src/i18n/${lang}/story/depression/disease.json.

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
    story = fullStory.disease;

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
      id: 'DEPRESSION_DISEASE',
      color: '#FFEED1',
      url: 'depression-disease',
      title: story.title,
      description: story.description,
      time: 6,
      type: 'theory',
      img: 'depression_disease',
      isPremium: true,
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            important(story.screen_1.texts[5]),
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            important(story.screen_2.texts[6]),
            `<p>${story.screen_2.texts[7]}</p>`,
            `<li>${story.screen_2.texts[8]}</li>`,
            `<li>${story.screen_2.texts[9]}</li>`,
            `<li>${story.screen_2.texts[10]}</li>`,
            `<li>${story.screen_2.texts[11]}</li>`,
            `<p>${story.screen_2.texts[12]}</p>`,
            `<p>${story.screen_2.texts[13]}</p>`,
            `<p>${story.screen_2.texts[14]}</p>`,
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
            important(story.screen_3.texts[6]),
            `<p>${story.screen_3.texts[7]}</p>`,
            q(story.screen_3.quote.text, story.screen_3.quote.author),
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/depression/depression_disease.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/depression/depression_disease.json.ts: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
