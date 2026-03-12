import { Page } from 'puppeteer-core';
import { interactWithGemini, parseGeminiJson } from './gemini-client.js';
import type { GeminiResponse, GlossaryItem } from './types.js';

export interface StagePrompts {
  main: string;
  editor: string;
  tech: string;
}

export interface WorkflowOptions {
  model?: string;
  glossaryText?: string;
  isUI?: boolean;
}

/**
 * Executes the 3-stage Gemini workflow: Translation -> Editing -> Tech Review.
 */
export async function runGeminiWorkflow(
  page: Page,
  sourceContent: string,
  prompts: StagePrompts,
  options: WorkflowOptions = {}
) {
  const { model = 'Pro', glossaryText = '', isUI = false } = options;

  // ШАГ 1: Перевод (Transcreation / UX Writing)
  console.log('\n🚀 ШАГ 1: Перевод...');
  const currentMainPrompt = prompts.main.replace('{{GLOSSARY}}', glossaryText);
  
  const res1Raw = await interactWithGemini(
    page,
    `${currentMainPrompt}\n\nВот текст для обработки:\n${sourceContent}`,
    model,
    false
  );

  if (res1Raw.trim().toLowerCase().includes('все хорошо')) {
    console.log('✨ Stage 1: Все хорошо, изменения не требуются.');
    return { status: 'skipped' };
  }

  let finalJson: Record<string, any> = {};
  let currentGlossary: GlossaryItem[] = [];

  if (isUI) {
    const stage1Chunk = await parseGeminiJson<GeminiResponse>(res1Raw, page, model);
    finalJson = stage1Chunk.localized_json;
    currentGlossary = stage1Chunk.glossary || [];
  } else {
    finalJson = await parseGeminiJson<Record<string, any>>(res1Raw, page, model);
  }

  let currentHandledJson = JSON.stringify(finalJson, null, 2);

  // ШАГ 2: Редактура (Editing)
  console.log('\n🚀 ШАГ 2: Редактура...');
  const currentEditorPrompt = prompts.editor.replace('{{GLOSSARY}}', glossaryText);
  const res2Raw = await interactWithGemini(
    page,
    `${currentEditorPrompt}\n\nВот исходный текст (для сверки):\n${sourceContent}\n\nВот текст для редактуры:\n${currentHandledJson}`,
    model,
    true
  );

  if (!res2Raw.trim().toLowerCase().includes('all set') && !res2Raw.trim().toLowerCase().includes('все хорошо')) {
    const partialUpdates = await parseGeminiJson<Record<string, any>>(res2Raw, page, model);
    finalJson = { ...finalJson, ...partialUpdates };
    currentHandledJson = JSON.stringify(finalJson, null, 2);
    console.log(`✨ Stage 2: Применены правки для ${Object.keys(partialUpdates).length} ключей.`);
  } else {
    console.log('✨ Stage 2: Без изменений (Все хорошо)');
  }

  // ШАГ 3: Технический аудит (Tech Review)
  console.log('\n🚀 ШАГ 3: Технический аудит...');
  const res3Raw = await interactWithGemini(
    page,
    `${prompts.tech}\n\nВот исходный текст (для сверки):\n${sourceContent}\n\nВот текст для тех-аудита:\n${currentHandledJson}`,
    model,
    true
  );

  if (!res3Raw.trim().toLowerCase().includes('all set') && !res3Raw.trim().toLowerCase().includes('все хорошо')) {
    const partialUpdates = await parseGeminiJson<Record<string, any>>(res3Raw, page, model);
    finalJson = { ...finalJson, ...partialUpdates };
    console.log(`✨ Stage 3: Применены правки для ${Object.keys(partialUpdates).length} ключей.`);
  } else {
    console.log('✨ Stage 3: Без изменений (Все хорошо)');
  }

  return {
    status: 'success',
    localizedJson: finalJson,
    glossary: currentGlossary,
  };
}
