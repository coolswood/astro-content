import type { APIRoute } from 'astro';

/**
 * Creates a reusable Astro APIRoute for serving translation JSON files.
 *
 * @param resourceName - Name of the resource for error reporting (e.g., 'AFFIRMATION.json')
 * @param modules - The result of import.meta.glob with { eager: true }
 * @param relativePathPattern - The path pattern relative to /src/i18n/ (e.g., 'homeBot/affirmations.json')
 */
export function createTranslationEndpoint<T>(
  resourceName: string,
  modules: Record<string, { default: T }>,
  relativePathPattern: string,
): APIRoute {
  return async ({ params }) => {
    const lang = params.lang!;

    try {
      // Precise path matching based on convention
      const modulePath = `/src/i18n/${lang}/${relativePathPattern}`;
      const module = modules[modulePath];

      if (!module) {
        throw new Error(
          `${resourceName} translation for language "${lang}" not found at ${modulePath}`,
        );
      }

      return new Response(JSON.stringify(module.default), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error(`Error generating ${resourceName} for ${lang}:`, err);
      throw new Error(
        `Failed to generate ${resourceName} for ${lang}: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
    }
  };
}
