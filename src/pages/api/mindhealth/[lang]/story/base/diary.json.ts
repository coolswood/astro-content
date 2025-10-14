// src/pages/api/[lang]/diary.json.ts
// Миграция файла diary по аналогии с Вашим start.json.ts.
// Обновлено: вместо вызова li() теперь используем обычные HTML-строки <li>...</li>.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { instagramStep, important } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/diary.json`),
        'utf-8',
      ),
    );

    // Как в start: английский fallback только для instagram.
    const storyEn = JSON.parse(
      await fs.readFile(path.resolve(`src/i18n/en/story/diary.json`), 'utf-8'),
    );

    const output = {
      id: 'DIARY',
      color: '#BABFF3',
      url: 'diary-of-automatic-thoughts',
      title: story.title,
      description: story.description,
      time: 8,
      type: 'theory',
      img: 'exercise',
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
            `<li>${story.screen_1.texts[7]}</li>`,
            `<li>${story.screen_1.texts[8]}</li>`,
            `<li>${story.screen_1.texts[9]}</li>`,
            `<li>${story.screen_1.texts[10]}</li>`,
            `<li>${story.screen_1.texts[11]}</li>`,
            `<p>${story.screen_1.texts[12]}</p>`,
            `<h2>${story.screen_1.texts[13]}</h2>`,
            `<p>${story.screen_1.texts[14]}</p>`,
            `<p>${story.screen_1.texts[15]}</p>`,
            `<p>${story.screen_1.texts[16]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_1.texts[17]}</p>`,
            `<p>${story.screen_1.texts[18]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.screen_2.texts[0]}</h2>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            `<p>${story.screen_2.texts[7]}</p>`,
            `<h2>${story.screen_2.texts[8]}</h2>`,
            `<p>${story.screen_2.texts[9]}</p>`,
            `<li>${story.screen_2.texts[10]}</li>`,
            `<li>${story.screen_2.texts[11]}</li>`,
            `<p>${story.screen_2.texts[12]}</p>`,
            `<h2>${story.screen_2.texts[13]}</h2>`,
            `<p>${story.screen_2.texts[14]}</p>`,
            `<p>${story.screen_2.texts[15]}</p>`,
            `<h2>${story.screen_2.texts[16]}</h2>`,
            `<p>${story.screen_2.texts[17]}</p>`,
            `<p>${story.screen_2.texts[18]}</p>`,
            `<p>${story.screen_2.texts[19]}</p>`,
            `<h2>${story.screen_2.texts[20]}</h2>`,
            `<p>${story.screen_2.texts[21]}</p>`,
            `<p>${story.screen_2.texts[22]}</p>`,
            `<li>${story.screen_2.texts[23]}</li>`,
            `<li>${story.screen_2.texts[24]}</li>`,
            `<li>${story.screen_2.texts[25]}</li>`,
            `<li>${story.screen_2.texts[26]}</li>`,
            `<p>${story.screen_2.texts[27]}</p>`,
            `<p>${story.screen_2.texts[28]}</p>`,
            `<p>${story.screen_2.texts[29]}</p>`,
            important(story.screen_2.texts[30]),
            `<p>${story.screen_2.texts[31]}</p>`,
            `<p>${story.screen_2.texts[32]}</p>`,
            `<p>${story.screen_2.texts[33]}</p>`,
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
          correctAnswer: 1,
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.screen_3.texts[0]}</h2>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            `<p>${story.screen_3.texts[4]}</p>`,
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<p>${story.screen_3.texts[7]}</p>`,
            `<p>${story.screen_3.texts[8]}</p>`,
            `<p>${story.screen_3.texts[9]}</p>`,
            important(story.screen_3.texts[10]),
            `<p>${story.screen_3.texts[11]}</p>`,
            `<p>${story.screen_3.texts[12]}</p>`,
            `<li>${story.screen_3.texts[13]}</li>`,
            `<li>${story.screen_3.texts[14]}</li>`,
            `<li>${story.screen_3.texts[15]}</li>`,
            `<p>${story.screen_3.texts[16]}</p>`,
            `<p>${story.screen_3.texts[17]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/base/diary.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/base/diary.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
