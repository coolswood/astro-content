import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/distortions/owed.json`),
        'utf-8',
      ),
    );

    // Проверяем что есть секция exercise
    if (!story.exercise) {
      throw new Error(
        `exercise section not found in owed.json for language ${lang}`,
      );
    }

    // Используем данные из секции exercise
    const exercise = story.exercise;

    const screen1Steps: string[] = [`<h2>${exercise.title}</h2>`];

    exercise.screen_1.texts.forEach((text: string, index: number) => {
      if (index === 8 || index === 9) {
        screen1Steps.push(`<h2>${text}</h2>`);
        return;
      }

      screen1Steps.push(`<p>${text}</p>`);
    });

    screen1Steps.push(
      q(exercise.screen_1.quote.text, exercise.screen_1.quote.author),
    );

    const screen2Steps: string[] = [];

    exercise.screen_2.texts.forEach((text: string, index: number) => {
      if (index === 0 || index === 4 || index === 8) {
        screen2Steps.push(`<h2>${text}</h2>`);
        return;
      }

      if (index >= 10 && index <= 13) {
        screen2Steps.push(`<li>${text}</li>`);
        return;
      }

      screen2Steps.push(`<p>${text}</p>`);
    });

    const screen3Steps: string[] = [];

    exercise.screen_3.texts.forEach((text: string, index: number) => {
      if (index === 0 || index === 2 || index === 5 || index === 9) {
        screen3Steps.push(`<h2>${text}</h2>`);
        return;
      }

      screen3Steps.push(`<p>${text}</p>`);
    });

    const output = {
      id: 'DISTORTIONS_OWED_EXERCISE',
      color: '#BABFF3',
      url: 'distortions-owed_exercise',
      title: exercise.title,
      description: exercise.description,
      time: 8,
      type: 'exercise',
      img: 'exercise',
      screens: [
        {
          __typename: 'ScreenText' as const,
          steps: screen1Steps,
        },
        {
          __typename: 'ScreenText' as const,
          steps: screen2Steps,
        },
        {
          __typename: 'ScreenText' as const,
          steps: screen3Steps,
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/distortions/distortions_owed.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/distortions/distortions_owed.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
