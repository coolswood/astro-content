import { loadI18nJson } from '@/lib/loadI18nJson';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

const CATEGORIES = [
  {
    header: 'instruments',
    sounds: ['bowl', 'harp', 'bell', 'hang', 'hang_small'],
  },
  {
    header: 'nature',
    sounds: [
      'fire',
      'rain',
      'wave',
      'snow_steps',
      'blizzard',
      'rain_roof',
      'thunderstorm',
      'stream',
      'waterfall',
      'drops',
      'lava',
    ],
  },
  {
    header: 'environment',
    sounds: ['street', 'underwater', 'keyboard', 'hran', 'crowd'],
  },
  {
    header: 'transport',
    sounds: ['train', 'plane', 'metro'],
  },
  {
    header: 'appliances',
    sounds: [
      'conditioner',
      'fridge',
      'dishwasher',
      'vacuum_cleaner',
      'dryer',
      'clock',
    ],
  },
  {
    header: 'animals',
    sounds: [
      'crickets',
      'whales',
      'wolves',
      'cuckoo',
      'horses',
      'cat',
      'seagulls',
      'frogs',
      'bee',
      'dolphin',
      'seal',
    ],
  },
];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const [headers, sounds] = await Promise.all([
      loadI18nJson<Record<string, string>>(lang, 'relax/headers.json'),
      loadI18nJson<Record<string, string>>(lang, 'relax/sounds.json'),
    ]);

    const payload = CATEGORIES.map(({ header, sounds: ids }) => ({
      title: headers[header] ?? '',
      items: ids
        .filter((id) => sounds[id])
        .map((id) => ({
          id,
          name: sounds[id],
        })),
    }));

    return new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Not found or broken text file' }),
      { status: 404 },
    );
  }
};
