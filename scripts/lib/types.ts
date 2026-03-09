export interface GlossaryItem {
  ru: string;
  pt_br: string;
  context: string;
}

export interface GeminiResponse {
  localized_json: Record<string, any>;
  glossary: GlossaryItem[];
}
