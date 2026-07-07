import type { APIRoute } from 'astro';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';

export const prerender = true;

export const getStaticPaths = getLangStaticPaths;

interface TranslationPractice {
  name: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  final_text?: string;
  phaseNames?: {
    inhale?: string;
    exhale?: string;
    hold?: string;
    /** Подпись для довдоха (вторая фаза вдоха в паттернах вроде «2-1-6»). */
    inhale_extra?: string;
  };
}

interface Translations {
  [key: string]: TranslationPractice | undefined;
}

const breathingModules = import.meta.glob<{
  default: Translations;
}>('@/i18n/*/breathing.json', { eager: true });

const PRACTICES_TEMPLATE = [
  {
    id: 'calm',
    phases: [
      { type: 'inhale', duration: 4, breathingWay: 'nose' },
      { type: 'exhale', duration: 6, breathingWay: 'mouth' }
    ]
  },
  {
    id: 'square',
    phases: [
      { type: 'inhale', duration: 4, breathingWay: 'nose' },
      { type: 'holdIn', duration: 4 },
      { type: 'exhale', duration: 4, breathingWay: 'nose' },
      { type: 'holdOut', duration: 4 }
    ]
  },
  {
    id: 'deep_relax',
    phases: [
      { type: 'inhale', duration: 4, breathingWay: 'nose' },
      { type: 'holdIn', duration: 2 },
      { type: 'exhale', duration: 6, breathingWay: 'mouth' }
    ]
  },
  {
    // Перезагрузка: физиологический вздох «2-1-6» — два вдоха (2с + 1с довдох),
    // затем длинный выдох 6с. Обе фазы вдоха имеют type 'inhale' (без нового
    // типа фазы); подпись довдоха берётся из phaseNames.inhale_extra, если задана.
    id: 'reset',
    phases: [
      { type: 'inhale', duration: 2, breathingWay: 'nose' },
      { type: 'inhale', duration: 1, breathingWay: 'nose' },
      { type: 'exhale', duration: 6, breathingWay: 'mouth' }
    ]
  }
];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;
  
  const modulePath = `/src/i18n/${lang}/breathing.json`;
  const ruModulePath = `/src/i18n/ru/breathing.json`;
  
  const translations = breathingModules[modulePath]?.default || breathingModules[ruModulePath]?.default;
  
  if (!translations) {
    return new Response(
      JSON.stringify({ error: `Translation not found for lang: ${lang}` }),
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  const responseData = PRACTICES_TEMPLATE.map((practice) => {
    const translation = translations[practice.id] || {} as TranslationPractice;
    const phaseNames = translation.phaseNames || {};

    // Счётчик inhale-фаз, чтобы отличать основной вдох (1-й) от довдоха (2-й)
    // в паттернах вроде «2-1-6». Для 2-го вдоха берём phaseNames.inhale_extra,
    // если оно задано; иначе — обычное phaseNames.inhale.
    let inhaleIndex = 0;

    return {
      id: practice.id,
      name: translation.name || '',
      subtitle: translation.subtitle || '',
      description: translation.description || '',
      fullDescription: translation.fullDescription || '',
      final_text: translation.final_text || '',
      phases: practice.phases.map((phase) => {
        let name = '';
        if (phase.type === 'inhale') {
          inhaleIndex++;
          if (inhaleIndex === 2 && phaseNames.inhale_extra) {
            name = phaseNames.inhale_extra;
          } else {
            name = phaseNames.inhale || '';
          }
        } else if (phase.type === 'exhale') {
          name = phaseNames.exhale || '';
        } else if (phase.type === 'holdIn' || phase.type === 'holdOut') {
          name = phaseNames.hold || '';
        }

        return {
          type: phase.type,
          duration: phase.duration,
          name: name,
          ...(phase.breathingWay ? { breathingWay: phase.breathingWay } : {})
        };
      })
    };
  });

  return new Response(JSON.stringify(responseData), {
    headers: { 'Content-Type': 'application/json' }
  });
};
