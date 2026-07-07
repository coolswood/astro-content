import type { AIProvider, GeminiResponse, GlossaryItem } from './types.js';

export interface StagePrompts {
  main: string;
  editor?: string;
  tech?: string;
}

export interface WorkflowOptions {
  /** @deprecated используется models.stage1/2/3; оставлен для обратной совместимости. */
  model?: string;
  models?: {
    stage1?: string;
    stage2?: string;
    stage3?: string;
  };
  glossaryText?: string;
  isUI?: boolean;
  /** @deprecated не используется вызывающим кодом; оставлен для обратной совместимости. */
  stage3Provider?: AIProvider;
  isPersistent?: boolean;
  firstRun?: boolean;
  excludeStages?: number[];
  intelligenceLevels?: number[];
}

/**
 * Фразы-маркеры «правок не требуется». Раньше они проверялись через substring
 * `includes()` по всему ответу — из-за чего перевод, случайно содержащий фразу
 * «все хорошо» в значении, молча терял данные. Теперь проверка точная:
 * skip срабатывает только если ответ КРАТКИЙ и совпадает с маркером (см.
 * isNoChangesMarker), а основной путь — попытка распарсить JSON.
 */
const NO_CHANGES_MARKERS = ['все хорошо', 'all set', 'всё хорошо'];

/**
 * Точно ли ответ означает «правок не требуется».
 * Защита от ложных срабатываний: только если ответ короткий (≤ 60 символов)
 * и после trim совпадает с одним из маркеров целиком или содержит его как
 * единственную смысловую часть. Длинный JSON со случайным вхождением фразы
 * НЕ считается skip-сигналом.
 */
function isNoChangesMarker(raw: string): boolean {
  const trimmed = raw.trim();
  if (trimmed.length > 60) return false;
  const lower = trimmed.toLowerCase();
  return NO_CHANGES_MARKERS.some((m) => lower === m || lower === `${m}.`);
}

/** Безопасная замена плейсхолдера во всех промптах (глобально, forward-safe). */
function injectGlossary(prompt: string, glossaryText: string): string {
  // replaceAll эквивалентен /{{GLOSSARY}}/g, но читаемее и не требует экранирования.
  return prompt.split('{{GLOSSARY}}').join(glossaryText);
}

/**
 * Безопасно применяет обновления к JSON-структуре, сохраняя массивы.
 *
 * В отличие от прежней версии, логирует dropped-ключи (есть в base, нет в
 * updates — остаются как есть) и extra-ключи (есть в updates, нет в base —
 * добавляются с предупреждением).
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
    let droppedCount = 0;
    for (const key in updates) {
      const idx = parseInt(key);
      if (!isNaN(idx) && idx >= 0 && idx < newArray.length) {
        newArray[idx] = applyUpdates(newArray[idx], updates[key]);
      } else {
        // Индекс вне диапазона — модель ошиблась; логируем и пропускаем.
        droppedCount++;
      }
    }
    if (droppedCount > 0) {
      console.log(`⚠️ Stage Update: пропущено ${droppedCount} индексов вне диапазона массива.`);
    }
    return newArray;
  }

  // 3. Если оба - объекты (не массивы)
  if (
    typeof base === 'object' && base !== null &&
    typeof updates === 'object' && updates !== null
  ) {
    const result = { ...base };
    const extraKeys: string[] = [];
    for (const key in updates) {
      if (key in result) {
        result[key] = applyUpdates(result[key], updates[key]);
      } else {
        // Ключа нет в base — модель добавила новое. Логируем (раньше молчало).
        extraKeys.push(key);
        result[key] = updates[key];
      }
    }
    if (extraKeys.length > 0) {
      console.log(
        `ℹ️ Stage Update: добавлены новые ключи, отсутствовавшие в base: ${extraKeys.join(', ')}`,
      );
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
  const { 
    model, 
    models = {}, 
    intelligenceLevels = [],
    glossaryText = '', 
    isUI = false, 
    isPersistent = false, 
    firstRun = true 
  } = options;
  
  const s1Model = models.stage1 || model;
  const s2Model = models.stage2 || model;
  const s3Model = models.stage3 || model;

  const getLevel = (idx: number): 1 | 2 | 3 | undefined => {
    const val = intelligenceLevels[idx];
    if (val === 1 || val === 2 || val === 3) return val;
    return undefined;
  };

  // ШАГ 1: Перевод (Transcreation / UX Writing)
  console.log('\n🚀 ШАГ 1: Перевод...');
  const currentMainPrompt = injectGlossary(prompts.main, glossaryText);
  const s1FullPrompt = `${currentMainPrompt}\n\nВот текст для обработки:\n${sourceContent}`;

  const res1Raw = await provider.interact(
    s1FullPrompt,
    {
      model: s1Model,
      intelligenceLevel: getLevel(0),
      shouldStartNewChat: firstRun,
      sessionId: isPersistent ? 'stage1' : undefined
    },
  );

  // Skip только по точному маркеру (не substring!) — иначе пытаемся парсить JSON.
  if (isNoChangesMarker(res1Raw)) {
    console.log('✨ Stage 1: Все хорошо, изменения не требуются.');
    return { status: 'skipped' };
  }

  let finalJson: any = {};
  let currentGlossary: GlossaryItem[] = [];

  if (isUI) {
    const stage1Chunk = await provider.parseJson<GeminiResponse>(res1Raw, { sessionId: isPersistent ? 'stage1' : undefined });
    finalJson = stage1Chunk.localized_json;
    console.log(`📦 Stage 1: Received ${Array.isArray(finalJson) ? 'Array' : 'Object'} structure.`);
    currentGlossary = stage1Chunk.glossary || [];
  } else {
    finalJson = await provider.parseJson<any>(res1Raw, { sessionId: isPersistent ? 'stage1' : undefined });
    console.log(`📦 Stage 1: Received ${Array.isArray(finalJson) ? 'Array' : 'Object'} structure.`);
  }

  let currentHandledJson = JSON.stringify(finalJson, null, 2);

  // ШАГ 2: Редактура (Editing)
  if (!options.excludeStages?.includes(2)) {
    console.log('\n🚀 ШАГ 2: Редактура...');
    const currentEditorPrompt = injectGlossary(prompts.editor || '', glossaryText);
    const s2FullPrompt = `${currentEditorPrompt}\n\nВот исходный текст (для контекста):\n${sourceContent}\n\nВот текст для редактуры:\n${currentHandledJson}`;

    const res2Raw = await provider.interact(
      s2FullPrompt,
      {
        model: s2Model,
        intelligenceLevel: getLevel(1),
        shouldStartNewChat: firstRun,
        sessionId: isPersistent ? 'stage2' : undefined
      },
    );

    // Skip только по точному маркеру; иначе парсим JSON с правками.
    if (!isNoChangesMarker(res2Raw)) {
      const partialUpdates = await provider.parseJson<any>(res2Raw, { sessionId: isPersistent ? 'stage2' : undefined });
      console.log(`📦 Stage 2: Received ${Array.isArray(partialUpdates) ? 'Array' : 'Object'} updates.`);
      finalJson = applyUpdates(finalJson, partialUpdates);
      currentHandledJson = JSON.stringify(finalJson, null, 2);
      console.log(
        `✨ Stage 2: Применены правки для ${Array.isArray(partialUpdates) ? partialUpdates.length : Object.keys(partialUpdates).length} ключей/индексов.`,
      );
    } else {
      console.log('✨ Stage 2: Без изменений (Все хорошо)');
    }
  }

  // ШАГ 3: Технический аудит (Tech Review)
  if (!options.excludeStages?.includes(3)) {
    console.log('\n🚀 ШАГ 3: Технический аудит...');
    const s3Provider = options.stage3Provider || provider;
    const currentTechPrompt = injectGlossary(prompts.tech || '', glossaryText);
    const s3FullPrompt = `${currentTechPrompt}\n\nВот исходный текст (для сверки смысла):\n${sourceContent}\n\nВот текст для тех-аудита:\n${currentHandledJson}`;

    const res3Raw = await s3Provider.interact(
      s3FullPrompt,
      {
        model: s3Model,
        intelligenceLevel: getLevel(2),
        shouldStartNewChat: firstRun,
        sessionId: isPersistent ? 'stage3' : undefined
      },
    );

    if (!isNoChangesMarker(res3Raw)) {
      const partialUpdates = await s3Provider.parseJson<any>(res3Raw, { sessionId: isPersistent ? 'stage3' : undefined });
      console.log(`📦 Stage 3: Received ${Array.isArray(partialUpdates) ? 'Array' : 'Object'} updates.`);
      finalJson = applyUpdates(finalJson, partialUpdates);
      console.log(
        `✨ Stage 3: Применены правки для ${Array.isArray(partialUpdates) ? partialUpdates.length : Object.keys(partialUpdates).length} ключей/индексов.`,
      );
    } else {
      console.log('✨ Stage 3: Без изменений (Все хорошо)');
    }
  }

  return {
    status: 'success',
    localizedJson: finalJson,
    glossary: currentGlossary,
  };
}
