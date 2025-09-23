import type { APIRoute } from 'astro';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { storySlugs as baseStorySlugs } from './base/list.json.ts';
import { storySlugs as depressionStorySlugs } from './depression/list.json.ts';
import { storySlugs as distortionsStorySlugs } from './distortions/list.json.ts';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

type StoryModule = {
  GET: APIRoute;
};

const baseModules = import.meta.glob<StoryModule>('./base/*.json.ts');
const depressionModules = import.meta.glob<StoryModule>(
  './depression/*.json.ts',
);
const distortionsModules = import.meta.glob<StoryModule>(
  './distortions/*.json.ts',
);

type CategoryConfig = {
  category: 'base' | 'depression' | 'distortions';
  prefix: `./${string}`;
  slugs: readonly string[];
  modules: Record<string, () => Promise<StoryModule>>;
};

const categories: CategoryConfig[] = [
  {
    category: 'base',
    prefix: './base/',
    slugs: baseStorySlugs,
    modules: baseModules,
  },
  {
    category: 'depression',
    prefix: './depression/',
    slugs: depressionStorySlugs,
    modules: depressionModules,
  },
  {
    category: 'distortions',
    prefix: './distortions/',
    slugs: distortionsStorySlugs,
    modules: distortionsModules,
  },
];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const items: Array<{
      category: string;
      article: string;
    }> = [];

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

        items.push({
          category,
          article: slug,
        });
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
