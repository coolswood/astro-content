import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

const POLICY_DIR = path.resolve(
  'src/pages/api/mindhealth/[lang]/texts/textHTML/policy',
);

const readPolicy = async (lang: string) => {
  const byLang = path.join(POLICY_DIR, `${lang}.txt`);
  const fallback = path.join(POLICY_DIR, 'en.txt');

  try {
    return await fs.readFile(byLang, 'utf-8');
  } catch (err) {
    if (lang === 'en') {
      throw err;
    }
    return fs.readFile(fallback, 'utf-8');
  }
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const html = await readPolicy(lang);

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch {
    return new Response('Policy text not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
};
