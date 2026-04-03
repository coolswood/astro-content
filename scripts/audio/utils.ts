/**
 * Разбивает данные выравнивания ElevenLabs на сегменты по предложениям.
 */
export function generateSegments(alignment: {
  characters: string[];
  characterStartTimesSeconds: number[];
  characterEndTimesSeconds: number[];
}) {
  const { characters, characterStartTimesSeconds, characterEndTimesSeconds } = alignment;

  let fullText = '';
  const indices: number[] = [];
  let inTag = false;

  // Очистка текста от тегов [tag] и сбор индексов
  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    if (char === '[') {
      inTag = true;
      continue;
    }
    if (char === ']') {
      inTag = false;
      continue;
    }
    if (inTag) continue;

    fullText += char;
    indices.push(i);
  }

  const segments: Array<{ text: string; start: number; end: number }> = [];
  // Регулярное выражение для поиска границ предложений и значимых пауз (переносов строк)
  const sentenceRegex = /[^.!?…\n]+[.!?…]*(?:\s+|$)|(?:\n\s*)+/g;
  let match;

  while ((match = sentenceRegex.exec(fullText)) !== null) {
    const textGroup = match[0].trim();
    if (!textGroup) continue;

    const startInFull = match.index;
    const endInFull = match.index + match[0].length - 1;

    // Находим реальные границы текста внутри совпадения (без лишних пробелов)
    let firstCharIdx = startInFull;
    while (firstCharIdx <= endInFull && /\s/.test(fullText[firstCharIdx])) {
      firstCharIdx++;
    }

    let lastCharIdx = endInFull;
    while (lastCharIdx >= firstCharIdx && /\s/.test(fullText[lastCharIdx])) {
      lastCharIdx--;
    }

    if (firstCharIdx <= lastCharIdx) {
      const jsonStartIdx = indices[firstCharIdx];
      const jsonEndIdx = indices[lastCharIdx];

      segments.push({
        text: fullText
          .substring(firstCharIdx, lastCharIdx + 1)
          .trim()
          .replace(/\s+/g, ' '),
        start: characterStartTimesSeconds[jsonStartIdx],
        end: characterEndTimesSeconds[jsonEndIdx],
      });
    }
  }

  return segments;
}

/**
 * Очищает HTML-теги и лишние пробелы.
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>|&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Нормализует текст для сопоставления (нижний регистр, только буквы и цифры).
 */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface TextSegment {
  text: string;
  start: number;
  end: number;
}

/**
 * Сопоставляет "шаги" (блоки текста из истории) с временными сегментами аудио.
 * Репликация логики из Flutter-приложения (helper.dart).
 */
export function associateStepsWithTimes(
  steps: string[],
  segments: TextSegment[],
): (number | null)[] {
  const normSegments = segments.map((s) => ({
    original: s,
    normalized: normalize(s.text.replace(/\[.*?\]/g, '').trim()),
  }));

  const startTimes: (number | null)[] = new Array(steps.length).fill(null);
  let currentSegment = 0;

  for (let i = 0; i < steps.length; i++) {
    const cleanStep = stripHtml(steps[i]);
    const normStep = normalize(cleanStep);

    if (!normStep) continue;

    const prefix = normStep.length > 8 ? normStep.substring(0, 8) : normStep;

    for (let j = currentSegment; j < normSegments.length; j++) {
      const normSegment = normSegments[j].normalized;
      if (!normSegment) continue;

      if (
        normStep.includes(normSegment) ||
        normSegment.includes(normStep) ||
        (normStep.length > 8 && normSegment.startsWith(prefix)) ||
        (normSegment.length > 8 &&
          prefix.startsWith(normSegment.substring(0, 8)))
      ) {
        startTimes[i] = normSegments[j].original.start;
        currentSegment = j;
        break;
      }
    }
  }

  // Заполнение пропусков (как в Flutter)
  for (let i = steps.length - 2; i >= 0; i--) {
    if (startTimes[i] === null && startTimes[i + 1] !== null) {
      startTimes[i] = startTimes[i + 1];
    }
  }

  for (let i = 1; i < startTimes.length; i++) {
    if (startTimes[i] === null && startTimes[i - 1] !== null) {
      startTimes[i] = startTimes[i - 1];
    }
  }

  return startTimes;
}

/**
 * Рассчитывает тайминги для всех экранов и шагов истории.
 */
export function calculateSync(story: any, segments: TextSegment[]) {
  const screens: any[] = [];
  const screenStartTimes: (number | null)[] = [];

  // Собираем все текстовые экраны
  const screenKeys = Object.keys(story)
    .filter((k) => k.startsWith('screen_'))
    .sort((a, b) => {
      const numA = parseInt(a.replace('screen_', ''));
      const numB = parseInt(b.replace('screen_', ''));
      return numA - numB;
    });

  for (const key of screenKeys) {
    const screen = story[key];
    if (screen.texts) {
      const stepStarts = associateStepsWithTimes(screen.texts, segments);
      // Находим первое не-null время как начало экрана
      const firstStart = stepStarts.find((t) => t !== null) ?? null;

      screens.push({
        steps: stepStarts,
      });
      screenStartTimes.push(firstStart);
    } else {
      screens.push({ steps: [] });
      screenStartTimes.push(null);
    }
  }

  // Заполняем пропуски в экранах (как во Flutter)
  if (screenStartTimes.length > 0 && screenStartTimes[0] === null) {
    screenStartTimes[0] = 0;
  }
  for (let i = 1; i < screenStartTimes.length; i++) {
    if (screenStartTimes[i] === null) {
      screenStartTimes[i] = screenStartTimes[i - 1];
    }
  }

  return {
    screens: screenStartTimes.map((start, i) => ({
      start,
      steps: screens[i].steps,
    })),
  };
}
