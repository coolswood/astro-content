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

export interface AIProvider {
  type: ProviderType;
  init(): Promise<void>;
  interact(prompt: string, options?: { model?: string; intelligenceLevel?: 1 | 2 | 3; shouldStartNewChat?: boolean; sessionId?: string }): Promise<string>;
  parseJson<T>(text: string, options?: { sessionId?: string }): Promise<T>;
  close(): Promise<void>;
}
