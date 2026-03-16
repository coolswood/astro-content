import { renderTaggedTexts } from '@/lib/storyTaggedTextsHelper';

type TaggedScreensContext = {
  instagramFallback?: string[];
  common?: Record<string, string>;
};

type TestConfig = {
  correctAnswer: number;
  insertAfter?: number;
};

const getScreenKeys = (story: Record<string, unknown>): string[] => {
  return Object.keys(story)
    .filter((key) => /^screen_\d+$/.test(key))
    .sort((a, b) => Number(a.slice(7)) - Number(b.slice(7)));
};

export const buildTaggedStoryScreens = (
  story: Record<string, unknown>,
  ctx: TaggedScreensContext,
  testConfig?: TestConfig,
) => {
  const textScreens = getScreenKeys(story).map((key, index) => {
    const screen = story[key] as { texts?: string[] };
    const steps = Array.isArray(screen?.texts)
      ? renderTaggedTexts(screen.texts, ctx)
      : [];

    return {
      __typename: 'ScreenText',
      steps: index === 0 ? [`<h2>${story.title}</h2>`, ...steps] : steps,
    };
  });

  const test = story.test as
    | { question?: string; answers?: [string, string, string, string] }
    | undefined;

  if (
    testConfig &&
    typeof test?.question === 'string' &&
    Array.isArray(test?.answers)
  ) {
    const insertAfter = testConfig.insertAfter ?? 2;
    const index = Math.min(Math.max(insertAfter, 0), textScreens.length);

    textScreens.splice(index, 0, {
      __typename: 'ScreenTest',
      question: test.question,
      answers: [test.answers[0], test.answers[1], test.answers[2], test.answers[3]],
      correctAnswer: testConfig.correctAnswer,
    });
  }

  return textScreens;
};
