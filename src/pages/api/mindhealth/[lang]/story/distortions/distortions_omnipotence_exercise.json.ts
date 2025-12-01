// src/pages/api/[lang]/omnipotence_exercise.json.ts
// Миграция файла distortions/omnipotence_exercise по аналогии с Вашим start.json.ts.
// Минимально: без лишней логики; li() заменены на строковые <li>...</li>.
// Путь к локализации: src/i18n/${lang}/story/distortions/omnipotence.json (теперь содержит секцию exercise).
// instagram в исходнике отсутствует — fallback не нужен.

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { important, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(
          `src/i18n/${lang}/story/distortions/omnipotence.json`,
        ),
        'utf-8',
      ),
    );

    // Проверяем что есть секция exercise
    if (!story.exercise) {
      throw new Error(`exercise section not found in omnipotence.json for language ${lang}`);
    }

    // Используем данные из секции exercise
    const exercise = story.exercise;

    const output = {
      id: 'DISTORTIONS_OMNIPOTENCE_EXERCISE',
      color: '#BABFF3',
      url: 'distortions-omnipotence_exercise',
      title: exercise.title,
      description: exercise.description,
      time: 4,
      type: 'exercise',
      img: 'exercise',
      screens: [
        // Screen 1
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${exercise.title}</h2>`,
            `<p>${exercise.screen_1.texts[0]}</p>`,
            `<p>${exercise.screen_1.texts[1]}</p>`,
            `<p>${exercise.screen_1.texts[2]}</p>`,
            q(exercise.screen_1.quote.text, exercise.screen_1.quote.author),
            `<p>${exercise.screen_1.texts[3]}</p>`,
            `<p>${exercise.screen_1.texts[4]}</p>`,
            `<li>${exercise.screen_1.texts[5]}</li>`,
            `<li>${exercise.screen_1.texts[6]}</li>`,
            `<li>${exercise.screen_1.texts[7]}</li>`,
          ],
        },
        // Screen 2
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${exercise.screen_2.texts[0]}</p>`,
            `<li>${exercise.screen_2.texts[1]}</li>`,
            `<li>${exercise.screen_2.texts[2]}</li>`,
            `<li>${exercise.screen_2.texts[3]}</li>`,
            `<li>${exercise.screen_2.texts[4]}</li>`,
            `<p>${exercise.screen_2.texts[5]}</p>`,
            `<p>${exercise.screen_2.texts[6]}</p>`,
            q(exercise.screen_2.quote.text, exercise.screen_2.quote.author),
            `<p>${exercise.screen_2.texts[7]}</p>`,
            `<li>${exercise.screen_2.texts[8]}</li>`,
            `<li>${exercise.screen_2.texts[9]}</li>`,
            `<li>${exercise.screen_2.texts[10]}</li>`,
            `<li>${exercise.screen_2.texts[11]}</li>`,
            `<p>${exercise.screen_2.texts[12]}</p>`,
          ],
        },
        // Screen 3
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${exercise.screen_3.texts[0]}</p>`,
            `<h2>${exercise.screen_3.texts[1]}</h2>`,
            `<p>${exercise.screen_3.texts[2]}</p>`,
            `<h2>${exercise.screen_3.texts[3]}</h2>`,
            `<p>${exercise.screen_3.texts[4]}</p>`,
            `<p>${exercise.screen_3.texts[5]}</p>`,
            important(exercise.screen_3.texts[6]),
            `<p>${exercise.screen_3.texts[7]}</p>`,
            `<p>${exercise.screen_3.texts[8]}</p>`,
            `<p>${exercise.screen_3.texts[9]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/distortions/distortions_omnipotence_exercise.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/distortions/distortions_omnipotence_exercise.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
