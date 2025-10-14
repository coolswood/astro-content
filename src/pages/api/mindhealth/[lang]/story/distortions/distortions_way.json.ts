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
        path.resolve(`src/i18n/${lang}/story/distortions/way.json`),
        'utf-8',
      ),
    );

    const screen1Steps = [
      `<h2>${story.title}</h2>`,
      ...story.screen_1.texts.map((text: string) => `<p>${text}</p>`),
      q(story.screen_1.quote.text, story.screen_1.quote.author),
    ];

    const screen2Steps: string[] = [];

    story.screen_2.texts.forEach((text: string, index: number) => {
      if (index === 4) {
        screen2Steps.push(`<h2>${text}</h2>`);
        return;
      }

      if (index >= 5 && index <= 11) {
        screen2Steps.push(`<li>${text}</li>`);
        if (index === 11) {
          screen2Steps.push(
            q(story.screen_2.quote.text, story.screen_2.quote.author),
          );
        }
        return;
      }

      screen2Steps.push(`<p>${text}</p>`);
    });

    const screen3Steps = story.screen_3.texts.map(
      (text: string) => `<p>${text}</p>`,
    );

    const output = {
      id: 'DISTORTIONS_WAY',
      color: '#BABFF3',
      url: 'distortions-way',
      title: story.title,
      description: story.description,
      time: 6,
      type: 'exercise',
      img: 'distortions_way',
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
      `Error generating src/pages/api/mindhealth/[lang]/story/distortions/distortions_way.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/distortions/distortions_way.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
