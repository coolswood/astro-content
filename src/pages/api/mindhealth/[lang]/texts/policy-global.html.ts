import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

// Содержимое вшивается на сборке: не зависит от наличия src/ в рантайме
// (выжило бы при переводе маршрута в SSR) и не строит путь из params.lang
// (path traversal невозможен — доступ только по ключам этой карты).
const policyModules = import.meta.glob<string>(
  './textHTML/policy/global/*.txt',
  { eager: true, query: '?raw', import: 'default' },
);

const readPolicy = (lang: string) =>
  policyModules[`./textHTML/policy/global/${lang}.txt`] ??
  policyModules['./textHTML/policy/global/en.txt'];

export const GET: APIRoute = ({ params }) => {
  const lang = params.lang!;

  const html = readPolicy(lang);

  if (html === undefined) {
    return new Response('Policy text not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
