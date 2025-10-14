// src/pages/api/[lang]/mirror.json.ts
// Миграция файла depression_mirror (mirror) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; используем activitylink, dialog, q.
// Путь к локализации: src/i18n/${lang}/story/depression/mirror.json.
// В этой истории instagram не используется — fallback не нужен.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { activitylink, dialog, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/depression/mirror.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'DEPRESSION_MIRROR',
      color: '#BABFF3',
      url: 'depression-mirror',
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
            activitylink('alkjnaNNasz'),
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            dialog({ psy: true, text: story.screen_1.texts[3] }),
            dialog({ psy: true, text: story.screen_1.texts[4] }),
            dialog({ psy: true, text: story.screen_1.texts[5] }),
            dialog({ isMan: true, text: story.screen_1.texts[6] }),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            dialog({ psy: true, text: story.screen_2.texts[0] }),
            dialog({ isMan: true, text: story.screen_2.texts[1] }),
            dialog({ psy: true, text: story.screen_2.texts[2] }),
            dialog({ isMan: true, text: story.screen_2.texts[3] }),
            dialog({ psy: true, text: story.screen_2.texts[4] }),
            dialog({ isMan: true, text: story.screen_2.texts[5] }),
            dialog({ psy: true, text: story.screen_2.texts[6] }),
            dialog({ isMan: true, text: story.screen_2.texts[7] }),
            `<p>${story.screen_2.texts[8]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            q(story.screen_3.quote.text, story.screen_3.quote.author),
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/depression/depression_mirror.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/depression/depression_mirror.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
