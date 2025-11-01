// Глобальные утилиты для обработки story контента с тегами
// Поддерживают как новый формат (с тегами), так и старый (обратная совместимость)

import { step, q, important, dialog } from './storyHelper';

// Функция для генерации instagram HTML
const instagram = (ids: string[]) => {
  return `<instagram ids="${ids.join(',')}"></instagram>`;
};

// Интерфейсы для типизации
interface ContentItem {
  type: 'paragraph' | 'quote' | 'stepper' | 'emphasis' | 'heading' | 'instagram' | 'dialog' | 'list';
  text?: string;
  author?: string;
  steps?: StepItem[];
  ids?: string[];
  psy?: boolean;
  items?: string[];
}

interface StepItem {
  type: 'automatic' | 'emotions' | 'behavior' | string;
  text: string;
}

interface ScreenData {
  content?: ContentItem[];
  texts?: string[];
  quote?: {
    text: string;
    author: string;
  };
  stepper_1?: string[];
  stepper_2?: string[];
}

interface CommonData {
  automatic: string;
  emotions: string;
  behavior: string;
  [key: string]: string;
}

// Функция для обработки контента с тегами (новый формат)
export const processContent = (content: ContentItem[], common: CommonData): string[] => {
  const steps: string[] = [];

  for (const item of content) {
    switch (item.type) {
      case 'paragraph':
        if (item.text) {
          steps.push(`<p>${item.text}</p>`);
        }
        break;

      case 'quote':
        if (item.text && item.author) {
          steps.push(q(item.text, item.author));
        }
        break;

      case 'stepper':
        if (item.steps && Array.isArray(item.steps)) {
          for (const stepItem of item.steps) {
            switch (stepItem.type) {
              case 'automatic':
                steps.push(step(common.automatic, stepItem.text));
                break;
              case 'emotions':
                steps.push(step(common.emotions, stepItem.text));
                break;
              case 'behavior':
                steps.push(step(common.behavior, stepItem.text));
                break;
              default:
                // Для динамических типов stepper
                if (common[stepItem.type]) {
                  steps.push(step(common[stepItem.type], stepItem.text));
                } else {
                  steps.push(step(stepItem.type, stepItem.text));
                }
            }
          }
        }
        break;

      case 'emphasis':
        if (item.text) {
          steps.push(important(item.text));
        }
        break;

      case 'heading':
        if (item.text) {
          steps.push(`<h2>${item.text}</h2>`);
        }
        break;

      case 'instagram':
        if (item.ids && Array.isArray(item.ids)) {
          steps.push(instagram(item.ids));
        }
        break;

      case 'dialog':
        if (item.text) {
          steps.push(dialog({ psy: item.psy || false, text: item.text }));
        }
        break;

      case 'list':
        if (item.items && Array.isArray(item.items)) {
          for (const listItem of item.items) {
            steps.push(`<li>${listItem}</li>`);
          }
        }
        break;

      default:
        if (item.text) {
          steps.push(`<p>${item.text}</p>`);
        }
    }
  }

  return steps;
};

// Функция для обработки старого формата (обратная совместимость)
export const processLegacyScreen = (screen: ScreenData, common: CommonData): string[] => {
  const steps: string[] = [];

  // Обработка текстов
  if (screen.texts && Array.isArray(screen.texts)) {
    for (const text of screen.texts) {
      steps.push(`<p>${text}</p>`);
    }
  }

  // Обработка цитаты
  if (screen.quote) {
    steps.push(q(screen.quote.text, screen.quote.author));
  }

  // Обработка stepper_1
  if (screen.stepper_1 && Array.isArray(screen.stepper_1) && screen.stepper_1.length >= 3) {
    steps.push(step(common.automatic, screen.stepper_1[0]));
    steps.push(step(common.emotions, screen.stepper_1[1]));
    steps.push(step(common.behavior, screen.stepper_1[2]));
  }

  // Обработка stepper_2
  if (screen.stepper_2 && Array.isArray(screen.stepper_2) && screen.stepper_2.length >= 3) {
    steps.push(step(common.automatic, screen.stepper_2[0]));
    steps.push(step(common.emotions, screen.stepper_2[1]));
    steps.push(step(common.behavior, screen.stepper_2[2]));
  }

  return steps;
};

// Универсальная функция обработки экрана (поддерживает оба формата)
export const processScreen = (screen: ScreenData, common: CommonData): string[] => {
  // Проверяем, используется ли новый формат (с тегами)
  if (screen.content && Array.isArray(screen.content)) {
    return processContent(screen.content, common);
  }

  // Иначе используем старый формат
  return processLegacyScreen(screen, common);
};

// Вспомогательная функция для проверки формата
export const isNewFormat = (screen: ScreenData): boolean => {
  return !!(screen.content && Array.isArray(screen.content));
};

// Вспомогательная функция для проверки старого формата
export const isLegacyFormat = (screen: ScreenData): boolean => {
  return !!(screen.texts && Array.isArray(screen.texts));
};