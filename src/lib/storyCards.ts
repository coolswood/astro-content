/**
 * Медиа-пути в выдаче stories-эндпоинта:
 *   - img восстанавливается по паттерну «<story>/<lang>/sN.png» (ru — свои
 *     картинки, остальные языки — английские);
 *   - видео существуют только в русской версии: не-ru локалям поле video
 *     не выдаётся, даже если оно затесалось в исходник.
 *
 * VIDEO_FALLBACK_STORIES управляет ТОЛЬКО инъекцией фолбэк-пути для четырёх
 * исторических историй (у intermediate видео нет). Явный video из исходника
 * для новой ru-истории проходит как есть — добавлять её в этот список не
 * нужно, иначе её видео молча потеряется.
 */

export interface StoryCard {
  subtitle: string;
  img: string;
  video?: string;
}

const VIDEO_FALLBACK_STORIES = new Set(['activity', 'coping', 'daybook', 'diary']);

/** Восстанавливает img и приводит video-поле в соответствие правилу локали. */
export function withMediaFallback(cards: StoryCard[], lang: string, story: string): StoryCard[] {
  return cards.map((card, index) => {
    const targetLang = lang === 'ru' ? 'ru' : 'en';
    const updatedCard: StoryCard = {
      ...card,
      img: `${story}/${targetLang}/s${index + 1}.png`,
    };

    if (lang === 'ru') {
      if (VIDEO_FALLBACK_STORIES.has(story)) {
        updatedCard.video = card.video || `${story}/ru/v${index + 1}.mp4`;
      }
    } else {
      delete updatedCard.video;
    }

    return updatedCard;
  });
}
