import type { AIProvider, GeminiResponse, GlossaryItem } from './types.js';

export interface StagePrompts {
  main: string;
  editor: string;
  tech: string;
}

export interface WorkflowOptions {
  model?: string; // Default for all stages if specific ones not provided
  models?: {
    stage1?: string;
    stage2?: string;
    stage3?: string;
  };
  glossaryText?: string;
  isUI?: boolean;
  stage3Provider?: AIProvider;
  isPersistent?: boolean;
  firstRun?: boolean;
}

/**
 * Safely applies updates to a JSON structure, preserving arrays.
 */
function applyUpdates(base: any, updates: any): any {
  // 1. Если оба - массивы, это полная замена
  if (Array.isArray(base) && Array.isArray(updates)) {
    console.log('🔄 Stage Update: FULL ARRAY REPLACEMENT');
    return updates;
  }

  // 2. Если base - массив, а updates - объект (частичное обновление массива)
  if (Array.isArray(base)) {
    console.log('🧩 Stage Update: PARTIAL ARRAY UPDATE');
    const newArray = [...base];
    for (const key in updates) {
      const idx = parseInt(key);
      if (!isNaN(idx) && idx >= 0 && idx < newArray.length) {
        newArray[idx] = applyUpdates(newArray[idx], updates[key]);
      }
    }
    return newArray;
  }

  // 3. Если оба - объекты (не массивы)
  if (
    typeof base === 'object' && base !== null &&
    typeof updates === 'object' && updates !== null
  ) {
    const result = { ...base };
    for (const key in updates) {
      if (key in result) {
        result[key] = applyUpdates(result[key], updates[key]);
      } else {
        result[key] = updates[key];
      }
    }
    return result;
  }

  // 4. Для примитивов или если типы не совпадают
  return updates;
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
  const { model, models = {}, glossaryText = '', isUI = false, isPersistent = false, firstRun = true } = options;
  
  const s1Model = models.stage1 || model || 'Pro';
  const s2Model = models.stage2 || model || 'Pro';
  const s3Model = models.stage3 || model || 'Pro';

  // ШАГ 1: Перевод (Transcreation / UX Writing)
  console.log('\n🚀 ШАГ 1: Перевод...');
  const currentMainPrompt = prompts.main.replace('{{GLOSSARY}}', glossaryText);
  const s1FullPrompt = firstRun ? `${currentMainPrompt}\n\nВот текст для обработки:\n${sourceContent}` : sourceContent;

  const res1Raw = await provider.interact(
    s1FullPrompt,
    { 
      model: s1Model, 
      shouldStartNewChat: firstRun, 
      sessionId: isPersistent ? 'stage1' : undefined 
    },
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
  const s2FullPrompt = firstRun ? `${currentEditorPrompt}\n\nВот текст для редактуры:\n${currentHandledJson}` : currentHandledJson;

  const res2Raw = await provider.interact(
    s2FullPrompt,
    { 
      model: s2Model, 
      shouldStartNewChat: firstRun, 
      sessionId: isPersistent ? 'stage2' : undefined 
    },
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
  const s3FullPrompt = firstRun ? `${currentTechPrompt}\n\nВот исходный текст (для сверки смысла):\n${sourceContent}\n\nВот текст для тех-аудита:\n${currentHandledJson}` : `Исходный текст для сверки:\n${sourceContent}\n\nТекст для тех-аудита:\n${currentHandledJson}`;

  const res3Raw = await s3Provider.interact(
    s3FullPrompt,
    { 
      model: s3Model, 
      shouldStartNewChat: firstRun, 
      sessionId: isPersistent ? 'stage3' : undefined 
    },
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
