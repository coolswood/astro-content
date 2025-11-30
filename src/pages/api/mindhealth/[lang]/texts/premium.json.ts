import { loadI18nJson } from '@/lib/loadI18nJson';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

type PremiumJson = {
  list: Record<
    string,
    {
      title: string;
      description: string;
    }
  >;
  last: {
    title: string;
    advantages: string[];
  };
};

const ITEMS = [
  { id: 'aiSmer', key: '0', subscription: true },
  { id: 'aiDaybook', key: '1', subscription: true },
  { id: 'password', key: '2' },
  { id: 'voiceToText', key: '3', subscription: true },
  { id: 'sync', key: '4' },
  { id: 'imageInText', key: '7' },
  { id: 'tests', key: '5' },
  { id: 'articles', key: '6' },
];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const premiumModules = import.meta.glob<{
      default: PremiumJson;
    }>('@/i18n/*/texts/premium.json', { eager: true });
    const modulePath = `/src/i18n/${lang}/texts/premium.json`;
    const module = premiumModules[modulePath];

    if (!module) {
      return new Response(JSON.stringify({ error: 'Language not found' }), {
        status: 404,
      });
    }

    const premium = module.default;

    const list = ITEMS.map(({ id, key, subscription }) => ({
      id,
      title: premium.list?.[key]?.title ?? '',
      description: premium.list?.[key]?.description ?? '',
      ...(subscription ? { isSubscriptionOnly: true } : {}),
    }));

    const payload = {
      list,
      last: {
        title: premium.last?.title ?? '',
        advantages: premium.last?.advantages ?? [],
      },
    };

    return new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/premium.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/premium.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
