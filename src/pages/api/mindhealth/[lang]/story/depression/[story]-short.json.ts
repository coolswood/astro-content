import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import { getLangStaticPaths } from '@/lib/getLangStaticPaths';

export const prerender = true;

// Mapping from old story names to new merged files and their keys inside the files
const STORY_FILE_MAPPING: Record<string, { file: string; key: string }> = {
  depression_control: { file: 'control_death_diagnostic', key: 'control' },
  depression_death: { file: 'control_death_diagnostic', key: 'death' },
  depression_diagnostic: {
    file: 'control_death_diagnostic',
    key: 'diagnostic',
  },

  depression_disability: {
    file: 'disability_disease_distortions',
    key: 'disability',
  },
  depression_disease: {
    file: 'disability_disease_distortions',
    key: 'disease',
  },
  depression_distortions: {
    file: 'disability_disease_distortions',
    key: 'distortions',
  },

  depression_duty: { file: 'duty_guilt_incrimination', key: 'duty' },
  depression_guilt: { file: 'duty_guilt_incrimination', key: 'guilt' },
  depression_incrimination: {
    file: 'duty_guilt_incrimination',
    key: 'incrimination',
  },

  depression_label: { file: 'label_lawyer_lazy', key: 'label' },
  depression_lawyer: { file: 'label_lawyer_lazy', key: 'lawyer' },
  depression_lazy: { file: 'label_lawyer_lazy', key: 'lazy' },

  depression_mirror: { file: 'mirror_mistake_nonDepression', key: 'mirror' },
  depression_mistake: { file: 'mirror_mistake_nonDepression', key: 'mistake' },
  depression_non_depression: {
    file: 'mirror_mistake_nonDepression',
    key: 'nonDepression',
  },

  depression_perfectionism: {
    file: 'perfectionism_plan_read',
    key: 'perfectionism',
  },
  depression_plan: { file: 'perfectionism_plan_read', key: 'plan' },
  depression_read: { file: 'perfectionism_plan_read', key: 'read' },

  depression_real: { file: 'real_rebuff_self_help', key: 'real' },
  depression_rebuff: { file: 'real_rebuff_self_help', key: 'rebuff' },
  depression_self_help: { file: 'real_rebuff_self_help', key: 'self_help' },

  depression_trap: { file: 'trap_unemployment_vitamins', key: 'trap' },
  depression_unemployment: {
    file: 'trap_unemployment_vitamins',
    key: 'unemployment',
  },
  depression_vitamins: { file: 'trap_unemployment_vitamins', key: 'vitamins' },
};

export async function getStaticPaths() {
  const langPaths = await getLangStaticPaths();

  const nestedPaths = await Promise.all(
    langPaths.map(async ({ params: { lang } }) => {
      try {
        // Check if depression directory exists
        await fs.access(`src/i18n/${lang}/story/depression`);

        const items = await fs.readdir(`src/i18n/${lang}/story/depression`, {
          withFileTypes: true,
        });
        // Filter to make sure we have JSON files (for validation)
        items.filter((item) => item.isFile() && item.name.endsWith('.json'));

        // Generate paths for all stories from the mapping
        const paths = [];
        for (const [storySlug] of Object.entries(STORY_FILE_MAPPING)) {
          paths.push({
            params: { lang, story: storySlug },
          });
        }

        return paths;
      } catch (err) {
        // Directory doesn't exist for this language
        return [];
      }
    }),
  );

  return nestedPaths.flat();
}

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang!;
  const story = params.story!;

  try {
    // Get the file mapping for this story
    const mapping = STORY_FILE_MAPPING[story];
    if (!mapping) {
      throw new Error(`Story "${story}" not found in mapping`);
    }

    const filePath = path.resolve(
      process.cwd(),
      `src/i18n/${lang}/story/depression/${mapping.file}.json`,
    );

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      throw new Error(`File not found: ${filePath}`);
    }

    const fileContent = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    // Get the specific story from the merged file
    const storyData = fileContent[mapping.key];
    if (!storyData) {
      throw new Error(
        `Story key "${mapping.key}" not found in file ${mapping.file}.json`,
      );
    }

    const output = {
      title: storyData.title,
      img: story, // Keep original story name for backward compatibility
      isPremium: storyData.isPremium,
    };

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      `Error generating src/pages/api/mindhealth/[lang]/story/depression/[story]-short.json.ts:`,
      err,
    );
    throw new Error(
      `Failed to generate src/pages/api/mindhealth/[lang]/story/depression/[story]-short.json.ts: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};
