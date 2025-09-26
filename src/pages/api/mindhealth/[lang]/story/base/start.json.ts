// src/pages/api/[lang]/[test].json.ts
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { important, instagramStep, q } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/start.json`),
        'utf-8',
      ),
    );

    const storyEn = JSON.parse(
      await fs.readFile(path.resolve(`src/i18n/en/story/start.json`), 'utf-8'),
    );

    const output = {
      id: 'START',
      color: '#FFDBDB',
      url: 'beginning-to-learn-cbt',
      title: story.title,
      description: story.description,
      time: 5,
      type: 'theory',
      img: 'start',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            '<storysettings></storysettings>',
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<p>${story.screen_1.texts[5]}</p>`,
            ...instagramStep(story.instagram, storyEn.instagram),
            `<p>${story.screen_1.texts[6]}</p>`,
            `<p>${story.screen_1.texts[7]}</p>`,
            `<p>${story.screen_1.texts[8]}</p>`,
            `<p>${story.screen_1.texts[9]}</p>`,
            q(story.screen_1.quote.text, story.screen_1.quote.author),
            `<p>${story.screen_1.texts[10]}</p>`,
            `<p>${story.screen_1.texts[11]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            important(story.screen_2.texts[2]),
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            `<p>${story.screen_2.texts[6]}</p>`,
            `<p>${story.screen_2.texts[7]}</p>`,
            `<p>${story.screen_2.texts[8]}</p>`,
            `<p>${story.screen_2.texts[9]}</p>`,
            `<p>${story.screen_2.texts[10]}</p>`,
            `<p>${story.screen_2.texts[11]}</p>`,
            `<p>${story.screen_2.texts[12]}</p>`,
            `<p>${story.screen_2.texts[13]}</p>`,
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
            `<p>${story.screen_3.texts[7]}</p>`,
            important(story.screen_3.texts[8]),
            `<p>${story.screen_3.texts[9]}</p>`,
            `<p>${story.screen_3.texts[10]}</p>`,
            `<p>${story.screen_3.texts[11]}</p>`,
            `<p>${story.screen_3.texts[12]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Not found or broken test file' }),
      { status: 404 },
    );
  }
};
