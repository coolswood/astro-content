// src/pages/api/[lang]/[test].json.ts
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;

  try {
    const bdi = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/bdi.json`),
        'utf-8',
      ),
    );

    const anxiety = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/anxiety.json`),
        'utf-8',
      ),
    );

    const eat = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/eat.json`),
        'utf-8',
      ),
    );

    const sdvg = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/sdvg.json`),
        'utf-8',
      ),
    );

    const irritation = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/irritation.json`),
        'utf-8',
      ),
    );

    const hopelessness = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/hopeless.json`),
        'utf-8',
      ),
    );

    const burnout = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/burnout.json`),
        'utf-8',
      ),
    );

    const okr = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/okr.json`),
        'utf-8',
      ),
    );

    const impostor = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/impostor.json`),
        'utf-8',
      ),
    );

    const bipolar = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/bipolar.json`),
        'utf-8',
      ),
    );

    const sociophobia = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/sociophobia.json`),
        'utf-8',
      ),
    );

    const acceptance = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/acceptance.json`),
        'utf-8',
      ),
    );

    const constants = JSON.parse(
      await fs.readFile(
        path.resolve(`src/i18n/${lang}/tests/constants.json`),
        'utf-8',
      ),
    );

    return new Response(
      JSON.stringify([
        {
          id: 'bdi',
          title: constants.bdi,
          color: '#9181FF',
          levels: {
            13: {
              title: bdi.result.normal.title,
              color: '#73F2BD',
            },
            24: {
              title: bdi.result.mild.title,
              color: '#11D88E',
            },
            40: {
              title: bdi.result.moderate.title,
              color: '#F2A873',
            },
            63: {
              title: bdi.result.exacerbated.title,
              color: '#F27373',
            },
          },
        },
        {
          id: 'anxiety',
          title: constants.anxiety,
          color: '#FFBC97',
          premiumId: 'test',
          levels: {
            44: {
              title: anxiety.result.normal.title,
              color: '#73F2BD',
            },
            59: {
              title: anxiety.result.light.title,
              color: '#11D88E',
            },
            74: {
              title: anxiety.result.severe.title,
              color: '#F2A873',
            },
            80: {
              title: anxiety.result.extreme.title,
              color: '#F27373',
            },
          },
        },
        {
          id: 'eat',
          title: constants.eat,
          color: '#FDDB66',
          premiumId: 'test',
          levels: {
            30: {
              title: eat.result.low.title,
              color: '#73F2BD',
            },
            45: {
              title: eat.result.middle.title,
              color: '#F2A873',
            },
            78: {
              title: eat.result.hight.title,
              color: '#F27373',
            },
          },
        },
        {
          id: 'sdvg',
          title: constants.sdvg,
          color: '#00BEFB',
          levels: {
            30: {
              title: sdvg.result.low.title,
              color: '#73F2BD',
            },
            45: {
              title: sdvg.result.middle.title,
              color: '#F2A873',
            },
            72: {
              title: sdvg.result.hight.title,
              color: '#F27373',
            },
          },
        },
        {
          id: 'irritation',
          title: constants.irritation,
          color: '#A7F9DC',
          levels: {
            45: {
              title: irritation.result.normal.title,
              color: '#73F2BD',
            },
            55: {
              title: irritation.result.light.title,
              color: '#11D88E',
            },
            75: {
              title: irritation.result.severe.title,
              color: '#F2A873',
            },
            85: {
              title: irritation.result.hard.title,
              color: '#F28E74',
            },
            100: {
              title: irritation.result.extreme.title,
              color: '#F27373',
            },
          },
        },
        {
          id: 'hopeless',
          title: constants.hopelessness,
          color: '#9B9B9B',
          premiumId: 'test',
          levels: {
            9: {
              title: hopelessness.result.positive.title,
              color: '#73F2BD',
            },
            24: {
              title: hopelessness.result.neutrally.title,
              color: '#11D88E',
            },
            42: {
              title: hopelessness.result.negative.title,
              color: '#F2A873',
            },
            60: {
              title: hopelessness.result.hopeless.title,
              color: '#F27373',
            },
          },
        },
        {
          id: 'burnout',
          title: constants.burnout,
          color: '#F46181',
          levels: {
            32: {
              title: burnout.result.low.title,
              color: '#73F2BD',
            },
            63: {
              title: burnout.result.middle.title,
              color: '#F2A873',
            },
            88: {
              title: burnout.result.hight.title,
              color: '#F27373',
            },
          },
        },
        {
          id: 'okr',
          title: constants.okr,
          color: '#C7E990',
          levels: {
            7: {
              title: okr.result.normal.title,
              color: '#73F2BD',
            },
            15: {
              title: okr.result.light.title,
              color: '#11D88E',
            },
            31: {
              title: okr.result.severe.title,
              color: '#F2A873',
            },
            40: {
              title: okr.result.extreme.title,
              color: '#F27373',
            },
          },
        },
        {
          id: 'impostor',
          title: constants.impostor,
          color: '#F6851F',
          premiumId: 'test',
          levels: {
            40: {
              title: impostor.result.normal.title,
              color: '#73F2BD',
            },
            60: {
              title: impostor.result.light.title,
              color: '#11D88E',
            },
            80: {
              title: impostor.result.severe.title,
              color: '#F2A873',
            },
            100: {
              title: impostor.result.extreme.title,
              color: '#F27373',
            },
          },
        },
        {
          id: 'bipolar',
          title: constants.bipolar,
          color: '#90AEE9',
          levels: {
            5: {
              title: bipolar.result.normal.title,
              color: '#73F2BD',
            },
            9: {
              title: bipolar.result.light.title,
              color: '#F2A873',
            },
            13: {
              title: bipolar.result.extreme.title,
              color: '#F27373',
            },
          },
        },
        {
          id: 'sociophobia',
          title: constants.sociophobia,
          color: '#FF725E',
          premiumId: 'test',
          levels: {
            40: {
              title: sociophobia.result.normal.title,
              color: '#73F2BD',
            },
            90: {
              title: sociophobia.result.mild.title,
              color: '#F2A873',
            },
            120: {
              title: sociophobia.result.moderate.title,
              color: '#F27373',
            },
          },
        },
        {
          id: 'acceptance',
          title: constants.acceptance,
          color: '#A8D29F',
          levels: {
            20: {
              title: acceptance.result.low.title,
              color: '#F27373',
            },
            40: {
              title: acceptance.result.middle.title,
              color: '#F2A873',
            },
            60: {
              title: acceptance.result.hight.title,
              color: '#73F2BD',
            },
          },
        },
      ]),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/tests/test-list.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/tests/test-list.json.ts: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
};
