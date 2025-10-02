import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { instagramStep, q } from '@/lib/storyHelper';

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

    const storyEn = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/en/story/distortions/owed.json`),
        'utf-8',
      ),
    );

    const screen1Steps: string[] = [`<h2>${story.title}</h2>`];

    story.screen_1.texts.forEach((text: string, index: number) => {
      if (index === 3) {
        screen1Steps.push(`<h2>${text}</h2>`);
        return;
      }

      if (index >= 4 && index <= 9) {
        screen1Steps.push(`<li>${text}</li>`);
        return;
      }

      screen1Steps.push(`<p>${text}</p>`);
    });

    screen1Steps.push(...instagramStep(story.instagram, storyEn.instagram));
    screen1Steps.push(q(story.screen_1.quote.text, story.screen_1.quote.author));

    const screen2Steps: string[] = [];

    story.screen_2.texts.forEach((text: string, index: number) => {
      if (index === 7) {
        screen2Steps.push(`<h2>${text}</h2>`);
        return;
      }

      if (index === 8 || index === 11) {
        screen2Steps.push(`<li>${text}</li>`);
        return;
      }

      screen2Steps.push(`<p>${text}</p>`);
    });

    screen2Steps.push(q(story.screen_2.quote.text, story.screen_2.quote.author));

    const screen3Steps: string[] = [];

    story.screen_3.texts.forEach((text: string, index: number) => {
      if (index === 6) {
        screen3Steps.push(`<h2>${text}</h2>`);
        return;
      }

      if (index >= 7 && index <= 11) {
        screen3Steps.push(`<li>${text}</li>`);
        return;
      }

      screen3Steps.push(`<p>${text}</p>`);
    });

    screen3Steps.push(q(story.screen_3.quote.text, story.screen_3.quote.author));

    const output = {
      id: 'DISTORTIONS_OWED',
      color: '#BADEF3',
      url: 'distortions-owed',
      title: story.title,
      description: story.description,
      time: 7,
      type: 'theory',
      img: 'distortions_owed',
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
    return new Response(
      JSON.stringify({ error: 'Not found or broken owed file' }),
      { status: 404 },
    );
  }
};
