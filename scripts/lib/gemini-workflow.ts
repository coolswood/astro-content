import type { AIProvider, GeminiResponse, GlossaryItem } from './types.js';

export interface StagePrompts {
  main: string;
  editor: string;
  tech: string;
}

export interface WorkflowOptions {
  model?: string;
  glossaryText?: string;
  isUI?: boolean;
  stage3Provider?: AIProvider;
}

/**
 * Safely applies updates to a JSON structure, preserving arrays.
 */
function applyUpdates(base: any, updates: any): any {
  if (Array.isArray(base)) {
    // If AI returned an array, assume it's a full replacement
    if (Array.isArray(updates)) {
      console.log('🔄 Stage Update: FULL ARRAY REPLACEMENT');
      return updates;
    }
    // If it's an object with numeric keys, it's a partial update
    console.log('🧩 Stage Update: PARTIAL ARRAY UPDATE');
    const newArray = [...base];
    for (const key in updates) {
      const idx = parseInt(key);
      if (!isNaN(idx) && idx >= 0 && idx < newArray.length) {
        if (typeof newArray[idx] === 'object' && newArray[idx] !== null && typeof updates[key] === 'object' && updates[key] !== null) {
          newArray[idx] = { ...newArray[idx], ...updates[key] };
        } else {
          newArray[idx] = updates[key];
        }
      }
    }
    return newArray;
  }
  return { ...base, ...updates };
}

/**
 * Executes the 3-stage workflow: Translation -> Editing -> Tech Review.
 */
export async function runGeminiWorkflow(
  provider: AIProvider,
  sourceContent: string,
  prompts: StagePrompts,
  options: WorkflowOptions = {},
) {
  const { model, glossaryText = '', isUI = false } = options;

  // ШАГ 1: Перевод (Transcreation / UX Writing)
  console.log('\n🚀 ШАГ 1: Перевод...');
  const currentMainPrompt = prompts.main.replace('{{GLOSSARY}}', glossaryText);

  const res1Raw = await provider.interact(
    `${currentMainPrompt}\n\nВот текст для обработки:\n${sourceContent}`,
    { model, shouldStartNewChat: false },
  );

  if (res1Raw.trim().toLowerCase().includes('все хорошо')) {
    console.log('✨ Stage 1: Все хорошо, изменения не требуются.');
    return { status: 'skipped' };
  }

  let finalJson: any = {};
  let currentGlossary: GlossaryItem[] = [];

  if (isUI) {
    const stage1Chunk = await provider.parseJson<GeminiResponse>(res1Raw);
    finalJson = stage1Chunk.localized_json;
    console.log(`📦 Stage 1: Received ${Array.isArray(finalJson) ? 'Array' : 'Object'} structure.`);
    currentGlossary = stage1Chunk.glossary || [];
  } else {
    finalJson = await provider.parseJson<any>(res1Raw);
    console.log(`📦 Stage 1: Received ${Array.isArray(finalJson) ? 'Array' : 'Object'} structure.`);
  }

  let currentHandledJson = JSON.stringify(finalJson, null, 2);

  // ШАГ 2: Редактура (Editing)
  console.log('\n🚀 ШАГ 2: Редактура...');
  const currentEditorPrompt = prompts.editor.replace(
    '{{GLOSSARY}}',
    glossaryText,
  );
  const res2Raw = await provider.interact(
    `${currentEditorPrompt}\n\nВот текст для редактуры:\n${currentHandledJson}`,
    { model, shouldStartNewChat: true },
  );

  if (
    !res2Raw.trim().toLowerCase().includes('all set') &&
    !res2Raw.trim().toLowerCase().includes('все хорошо')
  ) {
    const partialUpdates =
      await provider.parseJson<any>(res2Raw);
    console.log(`📦 Stage 2: Received ${Array.isArray(partialUpdates) ? 'Array' : 'Object'} updates.`);
    finalJson = applyUpdates(finalJson, partialUpdates);
    currentHandledJson = JSON.stringify(finalJson, null, 2);
    console.log(
      `✨ Stage 2: Применены правки для ${Array.isArray(partialUpdates) ? partialUpdates.length : Object.keys(partialUpdates).length} ключей/индексов.`,
    );
  } else {
    console.log('✨ Stage 2: Без изменений (Все хорошо)');
  }

  // ШАГ 3: Технический аудит (Tech Review)
  console.log('\n🚀 ШАГ 3: Технический аудит...');
  const s3Provider = options.stage3Provider || provider;
  const currentTechPrompt = prompts.tech.replace('{{GLOSSARY}}', glossaryText);
  const res3Raw = await s3Provider.interact(
    `${currentTechPrompt}\n\nВот исходный текст (для сверки смысла):\n${sourceContent}\n\nВот текст для тех-аудита:\n${currentHandledJson}`,
    { model, shouldStartNewChat: true },
  );

  if (
    !res3Raw.trim().toLowerCase().includes('all set') &&
    !res3Raw.trim().toLowerCase().includes('все хорошо')
  ) {
    const partialUpdates =
      await s3Provider.parseJson<any>(res3Raw);
    console.log(`📦 Stage 3: Received ${Array.isArray(partialUpdates) ? 'Array' : 'Object'} updates.`);
    finalJson = applyUpdates(finalJson, partialUpdates);
    console.log(
      `✨ Stage 3: Применены правки для ${Array.isArray(partialUpdates) ? partialUpdates.length : Object.keys(partialUpdates).length} ключей/индексов.`,
    );
  } else {
    console.log('✨ Stage 3: Без изменений (Все хорошо)');
  }

  return {
    status: 'success',
    localizedJson: finalJson,
    glossary: currentGlossary,
  };
}
