import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { createTranslationEndpoint } from '@/lib/createTranslationEndpoint';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

const questionsModules = import.meta.glob<{
  default: any;
}>('@/i18n/*/questions.json', { eager: true });

export const GET = createTranslationEndpoint(
  'questions.json',
  questionsModules,
  'questions.json',
);
