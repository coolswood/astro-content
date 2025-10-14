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
        path.resolve(
          `src/i18n/${lang}/story/distortions/perfectionism_exercise.json`,
        ),
        'utf-8',
      ),
    );

    const screen1Steps: string[] = [`<h2>${story.title}</h2>`];

    story.screen_1.texts.forEach((text: string) => {
      screen1Steps.push(`<p>${text}</p>`);
    });

    screen1Steps.push(
      q(story.screen_1.quote.text, story.screen_1.quote.author),
    );

    const screen2Steps: string[] = [];

    story.screen_2.texts.forEach((text: string, index: number) => {
      if (index === 0 || index === 14) {
        screen2Steps.push(`<h2>${text}</h2>`);
        return;
      }

      if (index >= 1 && index <= 8) {
        screen2Steps.push(`<li>${text}</li>`);
        return;
      }

      screen2Steps.push(`<p>${text}</p>`);
    });

    const screen3Steps: string[] = [];

    story.screen_3.texts.forEach((text: string, index: number) => {
      if (index === 4 || index === 9 || index === 11) {
        screen3Steps.push(`<h2>${text}</h2>`);
        return;
      }

      if (index >= 16 && index <= 20) {
        screen3Steps.push(`<li>${text}</li>`);
        return;
      }

      screen3Steps.push(`<p>${text}</p>`);
    });

    const screen4Steps: string[] = [];

    story.screen_4.texts.forEach((text: string, index: number) => {
      if ([0, 7, 10, 14, 15, 19, 22].includes(index)) {
        screen4Steps.push(`<h2>${text}</h2>`);
        return;
      }

      if (
        (index >= 11 && index <= 13) ||
        (index >= 16 && index <= 18) ||
        (index >= 20 && index <= 21) ||
        (index >= 23 && index <= 25)
      ) {
        screen4Steps.push(`<li>${text}</li>`);
        return;
      }

      screen4Steps.push(`<p>${text}</p>`);
    });

    const output = {
      id: 'DISTORTIONS_PERFECTIONISM_EXERCISE',
      color: '#BABFF3',
      url: 'distortions-perfectionism_exercise',
      title: story.title,
      description: story.description,
      time: 10,
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
        {
          __typename: 'ScreenText' as const,
          steps: screen4Steps,
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/distortions/distortions_perfectionism_exercise.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/distortions/distortions_perfectionism_exercise.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
