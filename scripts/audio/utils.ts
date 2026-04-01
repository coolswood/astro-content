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
