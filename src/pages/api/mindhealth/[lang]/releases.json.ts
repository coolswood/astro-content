import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { createTranslationEndpoint } from '@/lib/createTranslationEndpoint';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

const releasesModules = import.meta.glob<{
  default: any;
}>('@/i18n/*/releases.json', { eager: true });

export const GET = createTranslationEndpoint(
  'releases.json',
  releasesModules,
  'releases.json',
);
