export interface GlossaryItem {
  ru: string;
  lang: string;
  context: string;
}

export interface GeminiResponse {
  localized_json: Record<string, any>;
  glossary: GlossaryItem[];
}

export type ProviderType = 'gemini' | 'chatgpt' | 'claude';

export interface AIProvider {
  type: ProviderType;
  init(): Promise<void>;
  interact(prompt: string, options?: { model?: string; shouldStartNewChat?: boolean }): Promise<string>;
  parseJson<T>(text: string): Promise<T>;
  close(): Promise<void>;
}
