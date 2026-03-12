import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { createTranslationEndpoint } from '@/lib/createTranslationEndpoint';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

const sitemapModules = import.meta.glob<{
  default: any;
}>('@/i18n/*/sitemap.json', { eager: true });

export const GET = createTranslationEndpoint(
  'sitemap.json',
  sitemapModules,
  'sitemap.json',
);
