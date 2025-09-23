import type { APIRoute } from 'astro';
import { storySlugs as baseStorySlugs } from '../[lang]/story/base/list.json.ts';
import { storySlugs as depressionStorySlugs } from '../[lang]/story/depression/list.json.ts';
import { storySlugs as distortionsStorySlugs } from '../[lang]/story/distortions/list.json.ts';

export const prerender = true;

const DEFAULT_LANG = 'ru';

type StoryModule = {
  GET: APIRoute;
};

const baseModules = import.meta.glob<StoryModule>(
  '../[lang]/story/base/*.json.ts',
);
const depressionModules = import.meta.glob<StoryModule>(
  '../[lang]/story/depression/*.json.ts',
);
const distortionsModules = import.meta.glob<StoryModule>(
  '../[lang]/story/distortions/*.json.ts',
);

type CategoryConfig = {
  category: 'base' | 'depression' | 'distortions';
  prefix: `../[lang]/story/${string}`;
  slugs: readonly string[];
  modules: Record<string, () => Promise<StoryModule>>;
};

const categories: CategoryConfig[] = [
  {
    category: 'base',
    prefix: '../[lang]/story/base/',
    slugs: baseStorySlugs,
    modules: baseModules,
  },
  {
    category: 'depression',
    prefix: '../[lang]/story/depression/',
    slugs: depressionStorySlugs,
    modules: depressionModules,
  },
  {
    category: 'distortions',
    prefix: '../[lang]/story/distortions/',
    slugs: distortionsStorySlugs,
    modules: distortionsModules,
  },
];

export const GET: APIRoute = async () => {
  const lang = DEFAULT_LANG;

  try {
    const items: Array<{ category: string; article: string }> = [];

    for (const { category, prefix, slugs, modules } of categories) {
      for (const slug of slugs) {
        const loader = modules[`${prefix}${slug}.json.ts`];

        if (!loader) {
          throw new Error(
            `Story module for slug "${slug}" in category "${category}" is missing`,
          );
        }

        const module = await loader();

        if (typeof module.GET !== 'function') {
          throw new Error(
            `Story module for slug "${slug}" in category "${category}" has no GET handler`,
          );
        }

        const response = await module.GET({ params: { lang } } as any);

        if (!response.ok) {
          throw new Error(
            `Story module for slug "${slug}" in category "${category}" responded with ${response.status}`,
          );
        }

        const story = await response.json();

        if (typeof story.id !== 'string') {
          throw new Error(
            `Story module for slug "${slug}" in category "${category}" returned invalid id`,
          );
        }

        items.push({ category, article: story.id });
      }
    }

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
