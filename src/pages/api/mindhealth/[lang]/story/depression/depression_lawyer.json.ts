// src/pages/api/[lang]/lawyer.json.ts
// Миграция файла depression_lawyer (lawyer) по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/depression/lawyer.json.
// В этой истории instagram НЕ используется, поэтому fallback на en не требуется.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { important, q, dialog } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    let story;

    const fullStory = JSON.parse(
      await fs.readFile(
        path.resolve(
          `src/i18n/${lang}/story/depression/label_lawyer_lazy.json`,
        ),
        'utf-8',
      ),
    );
    story = fullStory.lawyer;

    const output = {
      id: 'DEPRESSION_LAWYER',
      color: '#BABFF3',
      url: 'depression-lawyer',
      title: story.title,
      description: story.description,
      time: 6,
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
            q(story.screen_1.quote.text, story.screen_1.quote.author),
            `<p>${story.screen_1.texts[4]}</p>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            `<p>${story.screen_1.texts[6]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            dialog({ psy: true, text: story.screen_2.texts[0] }),
            dialog({ psy: true, text: story.screen_2.texts[1] }),
            dialog({ isMan: true, text: story.screen_2.texts[2] }),
            dialog({ psy: true, text: story.screen_2.texts[3] }),
            dialog({ isMan: true, text: story.screen_2.texts[4] }),
            dialog({ psy: true, text: story.screen_2.texts[5] }),
            dialog({ isMan: true, text: story.screen_2.texts[6] }),
            dialog({ psy: true, text: story.screen_2.texts[7] }),
            dialog({ isMan: true, text: story.screen_2.texts[8] }),
            dialog({ psy: true, text: story.screen_2.texts[9] }),
            dialog({ isMan: true, text: story.screen_2.texts[10] }),
            dialog({ psy: true, text: story.screen_2.texts[11] }),
            dialog({ isMan: true, text: story.screen_2.texts[12] }),
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            important(story.screen_3.texts[1]),
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<li>${story.screen_3.texts[5]}</li>`,
            `<li>${story.screen_3.texts[6]}</li>`,
            `<li>${story.screen_3.texts[7]}</li>`,
            `<li>${story.screen_3.texts[8]}</li>`,
            `<li>${story.screen_3.texts[9]}</li>`,
            `<li>${story.screen_3.texts[10]}</li>`,
            `<li>${story.screen_3.texts[11]}</li>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/depression/depression_lawyer.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/depression/depression_lawyer.json.ts: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
