import { loadI18nJson } from '@/lib/loadI18nJson';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

type DiaryInfo = {
  event: string;
  thought: string;
  body: string;
  behavior: string;
  response: string;
  conclusion: string;
  comparison: string;
};

type DiaryStepper = {
  event: string;
  thought: string;
  body: string;
  behavior: string;
  response: string;
  conclusion: string;
};

const STEPPER_KEYS: Array<keyof DiaryStepper> = [
  'event',
  'thought',
  'body',
  'behavior',
  'response',
  'conclusion',
];

const COMMON_KEY_MAP: Record<keyof DiaryStepper, string> = {
  event: 'event',
  thought: 'automatic',
  body: 'body',
  behavior: 'behavior',
  response: 'response',
  conclusion: 'conclusion',
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const diaryModules = import.meta.glob<{
      default: { info: DiaryInfo; stepper: DiaryStepper };
    }>('@/i18n/*/texts/diary.json', { eager: true });
    const modulePath = `/src/i18n/${lang}/texts/diary.json`;
    const module = diaryModules[modulePath];

    if (!module) {
      return new Response(JSON.stringify({ error: 'Language not found' }), {
        status: 404,
      });
    }

    const info = module.default.info;
    const stepper = module.default.stepper;
    const common = await loadI18nJson<Record<string, string>>(lang, 'common.json');

    const stepperPayload = STEPPER_KEYS.reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          title: common[COMMON_KEY_MAP[key]] ?? '',
          text: stepper[key],
        },
      }),
      {} as Record<
        keyof DiaryStepper,
        {
          title: string;
          text: string;
        }
      >,
    );

    const payload = {
      ...info,
      stepper: stepperPayload,
    };

    return new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/texts/diaryInfo.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/texts/diaryInfo.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
