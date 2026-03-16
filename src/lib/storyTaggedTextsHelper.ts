import { activitylink, dialog, instagramStep, q, step } from '@/lib/storyHelper';
import { parse, type HTMLElement } from 'node-html-parser';

type TaggedTextsContext = {
  instagramFallback?: string[];
  common?: Record<string, string>;
};

const parseTag = (value: string): HTMLElement | undefined => {
  const root = parse(value);
  const first = root.firstChild;

  if (!first || first.nodeType !== 1 || !('tagName' in first)) {
    return undefined;
  }

  return first as HTMLElement;
};

export const isTaggedTexts = (texts: string[]): boolean => {
  return texts.some((item) => item.trim().startsWith('<'));
};

export const hasTaggedStory = (story: Record<string, unknown>): boolean => {
  for (const [key, value] of Object.entries(story)) {
    if (!key.startsWith('screen_')) continue;
    if (!value || typeof value !== 'object') continue;

    const texts = (value as { texts?: unknown }).texts;
    if (!Array.isArray(texts)) continue;

    const stringTexts = texts.filter((item): item is string => typeof item === 'string');
    if (stringTexts.length && isTaggedTexts(stringTexts)) {
      return true;
    }
  }

  return false;
};

export const renderTaggedTexts = (
  texts: string[],
  ctx: TaggedTextsContext,
): string[] => {
  const result: string[] = [];

  for (const item of texts) {
    const trimmed = item.trim();
    const tag = trimmed.startsWith('<') ? parseTag(trimmed) : undefined;

    if (tag?.tagName === 'INSTAGRAM') {
      const ids = tag
        .getAttribute('ids')
        ?.split(',')
        .map((s) => s.trim());
      result.push(...instagramStep(ids, ctx.instagramFallback));
      continue;
    }

    if (tag?.tagName === 'STORYSETTINGS') {
      result.push('<storysettings></storysettings>');
      continue;
    }

    if (tag?.tagName === 'STEPPER') {
      const automatic = tag.getAttribute('automatic');
      const emotions = tag.getAttribute('emotions');
      const behavior = tag.getAttribute('behavior');
      const depth = tag.getAttribute('depth');
      const intermediate = tag.getAttribute('intermediate');

      if (
        automatic !== undefined &&
        emotions !== undefined &&
        behavior !== undefined &&
        ctx.common
      ) {
        result.push(
          step(ctx.common.automatic, automatic),
          step(ctx.common.emotions, emotions),
          step(ctx.common.behavior, behavior),
        );
      }

      if (
        depth !== undefined &&
        intermediate !== undefined &&
        automatic !== undefined &&
        ctx.common
      ) {
        result.push(
          step(ctx.common.depth, depth),
          step(ctx.common.intermediate, intermediate),
          step(ctx.common.automatic, automatic),
        );
      }
      continue;
    }

    if (tag?.tagName === 'Q') {
      const author = tag.getAttribute('author');
      if (author !== undefined) {
        result.push(q(tag.innerHTML, author));
      }
      continue;
    }

    if (tag?.tagName === 'DIALOG') {
      const psy = tag.getAttribute('psy');
      const man = tag.getAttribute('man');
      result.push(
        dialog({
          text: tag.innerHTML,
          psy: psy != null && psy !== 'false',
          isMan: man != null && man !== 'false',
        }),
      );
      continue;
    }

    if (tag?.tagName === 'IMPORTANT') {
      result.push(`<important>${tag.innerHTML}</important>`);
      continue;
    }

    if (tag?.tagName === 'H2') {
      result.push(`<h2>${tag.innerHTML}</h2>`);
      continue;
    }

    if (tag?.tagName === 'LI') {
      result.push(`<li>${tag.innerHTML}</li>`);
      continue;
    }

    if (tag?.tagName === 'ACTIVITYLINK') {
      const id = tag.getAttribute('id');
      if (id) {
        result.push(activitylink(id));
      }
      continue;
    }

    if (tag?.tagName === 'STEP') {
      const title = tag.getAttribute('title');
      if (title !== undefined) {
        result.push(step(title, tag.innerHTML));
      }
      continue;
    }

    result.push(`<p>${item}</p>`);
  }

  return result;
};
