// src/pages/api/[lang]/lazy.json.ts
// Миграция файла depression_lazy (lazy) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; используем хелперы important/q/step/dialog.
// Путь к локализации: src/i18n/${lang}/story/depression/lazy.json.
// В этой истории instagram не используется — fallback не нужен.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { important, q, step, dialog } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depression/lazy.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_LAZY',
      color: '#D29DDB',
      url: 'depression-lazy',
      title: story.title,
      description: story.description,
      time: 8,
      type: 'theory',
      img: 'depression_lazy',
      isPremium: true,
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            important(story.screen_1.texts[2]),
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            `<p>${story.screen_1.texts[8]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
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
            step('common.event', story.screen_2.texts[5]),
            step('common.automatic', story.screen_2.texts[6]),
            step('common.emotions', story.screen_2.texts[7]),
            step('common.behavior', story.screen_2.texts[8]),
            `<p>${story.screen_2.texts[9]}</p>`,
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
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_4.texts[0]}</p>`,
            dialog({ psy: true, text: story.screen_4.texts[1] }),
            dialog({ text: story.screen_4.texts[2] }),
            dialog({ psy: true, text: story.screen_4.texts[3] }),
            dialog({ text: story.screen_4.texts[4] }),
            dialog({ psy: true, text: story.screen_4.texts[5] }),
            dialog({ text: story.screen_4.texts[6] }),
            `<p>${story.screen_4.texts[7]}</p>`,
            `<p>${story.screen_4.texts[8]}</p>`,
            `<p>${story.screen_4.texts[9]}</p>`,
            `<p>${story.screen_4.texts[10]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken lazy file' }),
      { status: 404 },
    );
  }
};
