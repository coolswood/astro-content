// src/pages/api/[lang]/mistake.json.ts
// Миграция файла depression_mistake (mistake) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/depression/mistake.json.
// В этой истории instagram не используется — fallback не нужен.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { activitylink, q, dialog } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depression/mistake.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_MISTAKE',
      color: '#BABFF3',
      url: 'depression-mistake',
      title: story.title,
      description: story.description,
      time: 5,
      type: 'exercise',
      img: 'exercise',
      isPremium: true,
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<h2>${story.screen_1.texts[1]}</h2>`,
            activitylink('naslSLnadfl'),
            `<p>${story.screen_1.texts[2]}</p>`,
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<li>${story.screen_1.texts[7]}</li>`,
            `<li>${story.screen_1.texts[8]}</li>`,
            `<li>${story.screen_1.texts[9]}</li>`,
            `<p>${story.screen_1.texts[10]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.screen_2.texts[0]}</h2>`,
            activitylink('lsvnnDSnsdl'),
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            dialog({ text: story.screen_2.texts[6] }),
            dialog({ text: story.screen_2.texts[7] }),
            dialog({ text: story.screen_2.texts[8] }),
            dialog({ text: story.screen_2.texts[9] }),
            dialog({ text: story.screen_2.texts[10] }),
            `<p>${story.screen_2.texts[11]}</p>`,
            `<p>${story.screen_2.texts[12]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken mistake file' }),
      { status: 404 },
    );
  }
};
