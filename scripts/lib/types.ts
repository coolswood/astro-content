import type { Page } from 'puppeteer-core';

export interface GlossaryItem {
  ru: string;
  lang: string;
  context: string;
}

export interface GeminiResponse {
  localized_json: Record<string, any>;
  glossary: GlossaryItem[];
}

export type ProviderType = 'gemini' | 'chatgpt' | 'claude' | 'mistral';

/** Уровень интеллекта/модели (только Gemini реально различает). */
export type IntelligenceLevel = 1 | 2 | 3;

/** Опции interact() — единый контракт для всех провайдеров. */
export interface InteractOptions {
  /** Имя/ключевое слово модели (например, 'Pro'). */
  model?: string;
  /** Уровень интеллекта: 1=Быстрая, 2=Думающая, 3=Pro. */
  intelligenceLevel?: IntelligenceLevel;
  /** Начать новый чат перед отправкой. */
  shouldStartNewChat?: boolean;
  /** Идентификатор сессии (страницы). По умолчанию 'default'. */
  sessionId?: string;
}

/** Опции parseJson(). */
export interface ParseJsonOptions {
  /** Сессия, в контексте которой можно попросить модель исправить JSON. */
  sessionId?: string;
}

export interface AIProvider {
  type: ProviderType;
  init(): Promise<void>;
  interact(prompt: string, options?: InteractOptions): Promise<string>;
  parseJson<T>(text: string, options?: ParseJsonOptions): Promise<T>;
  close(): Promise<void>;
}

/**
 * Минимальный тип страницы, чтобы абстрактный базовый провайдер не тащил
 * жёсткую зависимость от puppeteer-core в сигнатурах. Реальные провайдеры
 * работают с настоящим `Page` из puppeteer-core.
 */
export type AnyPage = Page;
