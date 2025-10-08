astro-content/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Placeholder landing page
│   │   └── api/
│   │       └── mindhealth/
│   │           ├── [lang]/          # Language-specific API routes
│   │           │   ├── distortions/ # Cognitive distortion content
│   │           │   ├── story/       # Interactive story content
│   │           │   └── tests/       # Psychological assessments
│   │           └── story/           # Story-related endpoints
│   ├── i18n/                        # Localization data
│   │   ├── en/                      # English (primary language)
│   │   ├── ru/                      # Russian
│   │   ├── de/                      # German
│   │   └── [18 more languages...]
│   ├── lib/
│   │   ├── getLangStaticPaths.ts    # Helper for language routing
│   │   └── storyHelper.ts           # Story content builders
│   ├── components/                  # Astro components
│   ├── layouts/                     # Page layouts
│   └── assets/                      # Static assets
├── docs/
│   └── codex-overview.md           # Technical documentation
├── astro.config.mjs                # Astro configuration
├── package.json                    # Dependencies and scripts
├── vercel.json                     # Deployment configuration
└── pnpm-lock.yaml                  # Dependency lock file
```

## API Endpoints Structure

### Base Pattern
All API endpoints follow the pattern: `/api/mindhealth/[lang]/[category]/[resource]`

### Main Categories

#### 1. Cognitive Distortions (`/distortions/`)
- **Purpose**: CBT educational content about common thinking patterns
- **Content**: HTML explanations, dialog examples, summaries
- **Example**: `/api/mindhealth/en/distortions/BLACK_AND_WHITE`
- **Data Structure**:
  ```json
  {
    "textHTML": "Educational content",
    "dialogSummary": "Summary of example dialog",
    "dialog": [
      {"type": "MINE", "text": "Example thought"},
      {"type": "YOURS", "text": "Alternative response"}
    ]
  }
  ```

#### 2. Psychological Tests (`/tests/`)
- **Purpose**: Self-assessment tools for various mental health aspects
- **Current Tests**:
  - **DAS (Dysfunctional Attitude Scale)**: Core belief assessment
  - **Anxiety**: Anxiety level evaluation
- **Data Structure**: Test questions, scoring logic, result descriptions

#### 3. Interactive Stories (`/story/`)
- **Purpose**: Guided therapeutic narratives and activities
- **Types**: Activity guides, coping strategies, diary prompts
- **Content**: Multi-step interactive content with images and text

#### 4. Relaxation Content
- **Categories**: Nature sounds, transport, appliances, animals, environment, musical instruments
- **Usage**: Background audio for meditation and relaxation

## Localization System

### Supported Languages (20+)
- English (en) - Primary/Reference language
- Russian (ru), German (de), Spanish (es), French (fr)
- Italian (it), Portuguese (pt), Dutch (nl), Polish (pl)
- Ukrainian (uk), Czech (cs), Swedish (sv), Turkish (tr)
- Arabic (ar), Hebrew (he), Japanese (ja), Korean (ko)
- Indonesian (id), Chinese variants, and more

### Content Organization
Each language folder mirrors the API structure:
```
src/i18n/[lang]/
├── common.json           # Shared translations
├── distortions/          # Cognitive distortion content
├── tests/               # Psychological test data
├── stories/             # Story content
├── relax/               # Relaxation content
└── activities/          # Therapeutic activities
```

### Fallback Strategy
- English serves as the primary reference language
- Missing translations fall back to English content
- API handlers implement fallback logic for optional assets

## Key Implementation Patterns

### API Handler Pattern
```typescript
// Standard API route structure
export const prerender = true;

export async function getStaticPaths() {
  const langs = await fs.readdir('src/i18n');
  // Generate paths for each language
}

export const GET: APIRoute = async ({ params }) => {
  const { lang, resource } = params;
  // Read localized JSON data
  // Transform and format response
  // Return JSON with proper headers
};
```

### Content Transformation
- Raw JSON files from `src/i18n/` are transformed into API responses
- HTML content is sanitized and formatted
- Dialog content is structured with speaker types
- Test data includes scoring logic and result interpretation

## Development Workflow

### Available Scripts
```bash
pnpm dev          # Development server (localhost:4321)
pnpm build        # Production build to ./dist/
pnpm preview      # Preview production build
pnpm astro        # Astro CLI commands
```

### Quality Assurance
1. **Build Validation**: Run `pnpm build` to catch JSON/TS errors
2. **API Testing**: Inspect generated `dist/api/mindhealth/[lang]/` structure
3. **Translation Completeness**: Verify matching JSON keys across languages
4. **CORS Configuration**: Headers configured in `vercel.json`

## Content Types and Use Cases

### 1. Cognitive Behavioral Therapy (CBT)
- **Cognitive Distortions**: Educational content about thinking patterns
- **Alternative Responses**: Healthy thought replacement strategies
- **Behavioral Techniques**: Practical coping mechanisms

### 2. Psychological Assessment
- **Dysfunctional Attitude Scale**: Core belief evaluation
- **Anxiety Tests**: Symptom assessment tools
- **Result Interpretation**: Personalized feedback and recommendations

### 3. Mindfulness & Relaxation
- **Guided Activities**: Step-by-step therapeutic exercises
- **Sound Libraries**: Categorized audio for relaxation
- **Meditation Content**: Structured mindfulness practices

### 4. Interactive Storytelling
- **Therapeutic Narratives**: Guided self-reflection stories
- **Activity Guides**: Practical exercises with visual support
- **Progress Tracking**: Multi-step content with completion states

## AI Agent Guidelines

### When Working with This Project

#### 1. Adding New Content
- Follow existing folder structure in `src/i18n/[lang]/`
- Maintain consistent JSON schemas across languages
- Create corresponding API handlers in `src/pages/api/mindhealth/[lang]/`
- Test with `pnpm build` to validate structure

#### 2. Localization Tasks
- Always update English (en) content first as reference
- Ensure JSON keys match exactly across all language files
- Implement fallback logic for missing translations
- Validate with build process

#### 3. API Development
- Use existing handlers as templates (e.g., `distortions/[distortion].ts`)
- Implement proper error handling and fallbacks
- Follow the prerender pattern for static generation
- Include appropriate TypeScript types

#### 4. Content Updates
- Primary source of truth is `src/i18n/` directory
- API endpoints are automatically generated from content
- Changes require rebuild to update `dist/` output
- Verify generated JSON structure matches expectations

#### 5. Common Patterns to Follow
- **For Tests**: Follow the scoring pattern in `tests/anxiety.json.ts`
- **For Stories**: Use HTML helpers from `src/lib/storyHelper.ts`
- **For Distortions**: Mirror the structure in `distortions/[distortion].ts`
- **For New Languages**: Copy English structure and translate content

### Important Considerations

#### Mental Health Context
- Content should be clinically appropriate and evidence-based
- Maintain professional, supportive tone
- Include proper disclaimers and safety information
- Ensure content is accessible and inclusive

#### Technical Constraints
- Static generation limits dynamic functionality
- File size considerations for mobile app consumption
- CORS requirements for cross-origin requests
- Build performance with large content sets

#### Content Quality
- All content should be professional and medically reviewed
- Maintain consistency in terminology and formatting
- Ensure proper HTML sanitization for user safety
- Test content flow and user experience

## Future Enhancement Opportunities

### Automation Potential
- Generate new API handlers from content specifications
- Validate translation completeness across languages
- Scaffold content templates for new therapeutic modules
- Automated testing of API response structures

### Content Expansion
- Additional psychological assessments (depression, stress, etc.)
- More cognitive distortion categories
- Expanded relaxation content library
- Progressive web app features

### Technical Improvements
- Content management system integration
- Real-time content updates without rebuilds
- Enhanced caching strategies
- Analytics and usage tracking

This project serves as a critical content delivery system for mental health applications, requiring careful attention to content accuracy, technical reliability, and user safety.