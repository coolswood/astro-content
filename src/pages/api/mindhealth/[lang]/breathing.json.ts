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
          name = phaseNames.inhale || '';
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
