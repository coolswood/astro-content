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

const storySlugs = [
  'key',
  'approval',
  'love',
  'love_exercise',
  'achievements',
  'achievements_exercise',
  'omnipotence',
  'omnipotence_exercise',
  'autonomy',
  'autonomy_exercise',
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
          throw new Error(`Story module for slug "${slug}" responded with ${response.status}`);
        }

        const story = await response.json();

        const meta: StoryMeta = {
          id: story.id,
          color: story.color,
          url: story.url,
          time: story.time,
          type: story.type,
          img: story.img,
          ...(typeof story.isPremium === 'boolean' ? { isPremium: story.isPremium } : {}),
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
    return new Response(
      JSON.stringify({ error: 'Not found or broken story file' }),
      { status: 404 },
    );
  }
};
