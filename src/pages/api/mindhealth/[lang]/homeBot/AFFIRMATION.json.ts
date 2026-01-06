import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { createTranslationEndpoint } from '@/lib/createTranslationEndpoint';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

const affirmationsModules = import.meta.glob<{
  default: string[];
}>('@/i18n/*/homeBot/affirmation.json', { eager: true });

export const GET = createTranslationEndpoint(
  'AFFIRMATION.json',
  affirmationsModules,
  'homeBot/affirmation.json',
);
