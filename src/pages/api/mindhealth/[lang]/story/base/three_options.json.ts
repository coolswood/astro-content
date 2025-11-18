// src/pages/api/[lang]/three_options.json.ts

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { important, q, activitylink, instagramStep } from '@/lib/storyHelper';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const story = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/story/three_options.json`),
        'utf-8',
      ),
    );

    const output = {
      id: 'THREE_OPTIONS',
      color: '#BABFF3',
      url: 'cbt-technique-three-eventualities',
      title: story.title,
      description: story.description,
      time: 6,
      type: 'exercise',
      img: 'exercise',
      screens: [
        {
          __typename: 'ScreenText',
          steps: [
            `<h2>${story.title}</h2>`,
            activitylink('kdzYJ4njVJ'),
            `<p>${story.screen_1.texts[0]}</p>`,
            `<p>${story.screen_1.texts[1]}</p>`,
            `<p>${story.screen_1.texts[2]}</p>`,
            ...instagramStep(story.instagram),
            `<p>${story.screen_1.texts[3]}</p>`,
            `<p>${story.screen_1.texts[4]}</p>`,
            `<li>${story.screen_1.texts[5]}</li>`,
            `<li>${story.screen_1.texts[6]}</li>`,
            `<li>${story.screen_1.texts[7]}</li>`,
            `<p>${story.screen_1.texts[8]}</p>`,
          ],
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_2.texts[0]}</p>`,
            `<p>${story.screen_2.texts[1]}</p>`,
            `<p>${story.screen_2.texts[2]}</p>`,
            `<p>${story.screen_2.texts[3]}</p>`,
            `<p>${story.screen_2.texts[4]}</p>`,
            `<p>${story.screen_2.texts[5]}</p>`,
            q(story.screen_2.quote.text, story.screen_2.quote.author),
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
          correctAnswer: 2,
        },
        {
          __typename: 'ScreenText',
          steps: [
            `<p>${story.screen_3.texts[0]}</p>`,
            `<p>${story.screen_3.texts[1]}</p>`,
            `<p>${story.screen_3.texts[2]}</p>`,
            `<p>${story.screen_3.texts[3]}</p>`,
            important(story.screen_3.texts[4]),
            `<p>${story.screen_3.texts[5]}</p>`,
            `<p>${story.screen_3.texts[6]}</p>`,
            `<p>${story.screen_3.texts[7]}</p>`,
          ],
        },
      ],
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(`Error generating three_options.json:`, err);
    throw new Error(
      `Failed to generate three_options.json: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
