import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import { createTranslationEndpoint } from '@/lib/createTranslationEndpoint';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

interface Quote {
  text: string;
  author: string;
}

const quotesModules = import.meta.glob<{
  default: Quote[];
}>('@/i18n/*/homeBot/quotes.json', { eager: true });

export const GET = createTranslationEndpoint(
  'QUOTE.json',
  quotesModules,
  'homeBot/quotes.json',
);
