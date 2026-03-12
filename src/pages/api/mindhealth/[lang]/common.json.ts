import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { createTranslationEndpoint } from '@/lib/createTranslationEndpoint';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

const commonModules = import.meta.glob<{
  default: any;
}>('@/i18n/*/common.json', { eager: true });

export const GET = createTranslationEndpoint(
  'common.json',
  commonModules,
  'common.json',
);
