import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { createTranslationEndpoint } from '@/lib/createTranslationEndpoint';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

const activitiesModules = import.meta.glob<{
  default: any;
}>('@/i18n/*/activities.json', { eager: true });

export const GET = createTranslationEndpoint(
  'activities.json',
  activitiesModules,
  'activities.json',
);
