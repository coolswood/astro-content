Project Map

Project Type Astro 5 static site focused on JSON API generation; minimal UI beyond placeholder landing (package.json:1, src/pages/index.astro:1).
Build & Runtime Use pnpm dev/build/preview per standard Astro flow (already scaffolded in README.md:1); CORS headers for deployment configured in vercel.json:1.
Global Config Module alias @/_ → src/_ defined in astro.config.mjs:1 and mirrored in tsconfig.json:1 for both runtime and type resolution.
Source Layout

API Surface Main logic under src/pages/api/mindhealth/[lang] with three subdomains: tests, story, distortions. Each file exports prerender, getStaticPaths, and a GET handler assembling JSON from localized assets (pattern shown in src/pages/api/mindhealth/[lang]/tests/anxiety.json.ts:1 and src/pages/api/mindhealth/[lang]/story/base/start.json.ts:1).
Localization Data Language packs live in src/i18n/<lang> mirroring API substructure (tests/story/distortions/common); example content in src/i18n/ru/tests/anxiety.json:1. Many API handlers fall back to English files for optional assets (e.g., instagram links).
Helpers Shared HTML snippet builders for stories reside in src/lib/storyHelper.ts:1; language path enumeration handled by src/lib/getLangStaticPaths.ts:1.
DAS Descriptions Individual .astro partials under src/pages/api/mindhealth/[lang]/tests/das/descriptions render localized HTML fragments by reading descriptions.json (e.g., approval.astro:1).
Build Output

Astro prerender emits language-specific JSON under dist/api/mindhealth/<lang> replicating API tree (tests, distortions, story). Current builds show placeholder errors where source data is missing (e.g., dist/api/mindhealth/ru/story/base/list.json).
Working With LLM Codex

Common Patterns Reuse existing handlers as templates; new tests follow the array-to-object scoring pattern in anxiety.json.ts, while stories compose HTML via helpers—LLM prompts should call out which template to mimic.
Data Updates Emphasize that business content lives in /src/i18n; updating translations or adding locales requires ensuring matching JSON keys across languages and verifying fallbacks.
Path Planning For tasks like “add new story screen” or “localize test,” describe to the LLM the relevant pipeline: i18n JSON → API transformer → prerendered output. Reference specific files so it edits both data and transformer as needed.
Quality Checks Encourage running pnpm build to catch JSON/TS errors and inspecting generated dist/api/mindhealth/<lang>/... for expected structure.
Future Automations Potential LLM accelerators: generating new GET handlers from spec, validating translation completeness by diffing language folders, and scaffolding DAS description partials from base text.
