import type { APIRoute } from 'astro';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

type StoryMeta = {
  id: string;
  color: string;
  url: string;
  time: number;
  type: string;
  img: string;
  isPremium?: boolean;
};

type StoryModule = {
  GET: APIRoute;
};

export const storySlugs = [
  'start',
  'triangle',
  'automatic',
  'intermediate',
  'depths',
  'diary',
  'depression_story',
  'useful',
  'coping',
  'positive',
  'three_options',
  'suicide',
  'history',
  'proof',
] as const;

const storyModules = import.meta.glob<StoryModule>('./*.json.ts');

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const items = await Promise.all(
      storySlugs.map(async (slug) => {
        const loader = storyModules[`./${slug}.json.ts`];

        if (!loader) {
          throw new Error(`Story module for slug "${slug}" is missing`);
        }

        const module = await loader();

        if (typeof module.GET !== 'function') {
          throw new Error(`Story module for slug "${slug}" has no GET handler`);
        }

        const response = await module.GET({ params: { lang } } as any);

        if (!response.ok) {
          throw new Error(
            `Story module for slug "${slug}" responded with ${response.status}`,
          );
        }

        const story = await response.json();

        const meta: StoryMeta = {
          id: story.id,
          color: story.color,
          url: story.url,
          time: story.time,
          type: story.type,
          img: story.img,
          ...(typeof story.isPremium === 'boolean'
            ? { isPremium: story.isPremium }
            : {}),
        };

        return {
          ...meta,
          title: story.title,
          description: story.description,
        };
      }),
    );

    return new Response(JSON.stringify(items), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(`Error generating ${lang}/story/base/list.json:`, err);
    throw new Error(
      `Failed to generate ${lang}/story/base/list.json: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
