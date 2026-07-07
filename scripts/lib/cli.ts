/**
 * Единая точка для CLI-парсинга и фабрики провайдеров.
 *
 * Раньше:
 *   - парсер --flag value дублировался 3 раза (bot-utils.parseBotArgs,
 *     translate-file-all.parseArgs, translate-arb.parseKeysArgs);
 *   - switch фабрики провайдеров дублировался 3 раза
 *     (translate-file, translate-ui, translate-arb).
 *
 * Теперь: один parseCli + один createProvider.
 */
import type { AIProvider, ProviderType } from './types.js';
import { GeminiProvider } from './providers/gemini-provider.js';
import { ChatGPTProvider } from './providers/chatgpt-provider.js';
import { ClaudeProvider } from './providers/claude-provider.js';
import { MistralProvider } from './providers/mistral-provider.js';

/** Распарсенный вид CLI: именованные флаги + позиционные аргументы. */
export interface ParsedCli {
  /** Именованные флаги: ключ без '--', значение (или 'true' для флагов без значения). */
  flags: Record<string, string>;
  /** Позиционные аргументы (не начинающиеся с '--'). */
  positional: string[];
}

/**
 * Парсит process.argv в именованные флагы и позиционные аргументы.
 *
 * Поддерживает формы:
 *   --flag value        → flags.flag = 'value'
 *   --flag (без значения или за ним другой флаг) → flags.flag = 'true'
 *   positional          → positional[]
 *
 * @param argv  по умолчанию process.argv (пропускает node/bun + script).
 */
export function parseCli(argv: string[] = process.argv.slice(2)): ParsedCli {
  const flags: Record<string, string> = {};
  const positional: string[] = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const nextArg = argv[i + 1];
      if (nextArg && !nextArg.startsWith('--')) {
        flags[arg.slice(2)] = nextArg;
        i++;
      } else {
        flags[arg.slice(2)] = 'true';
      }
    } else {
      positional.push(arg);
    }
  }

  return { flags, positional };
}

/** Дефолтный провайдер для всех entry-point ботов. */
export const DEFAULT_PROVIDER: ProviderType = 'chatgpt';

/**
 * Нормализует код провайдера из произвольного входа.
 * Возвращает канонический ProviderType; некорректный/пустой → DEFAULT_PROVIDER.
 */
export function normalizeProviderType(raw: string): ProviderType {
  const lower = String(raw ?? '').toLowerCase();
  if (lower === 'chatgpt' || lower === 'claude' || lower === 'mistral' || lower === 'gemini') {
    return lower;
  }
  return DEFAULT_PROVIDER;
}

/**
 * Единая фабрика провайдеров (замена 3 копий switch).
 *
 * @param type  'gemini' | 'chatgpt' | 'claude' | 'mistral'
 */
export function createProvider(type: ProviderType): AIProvider {
  switch (type) {
    case 'chatgpt':
      return new ChatGPTProvider();
    case 'claude':
      return new ClaudeProvider();
    case 'mistral':
      return new MistralProvider();
    case 'gemini':
    default:
      return new GeminiProvider();
  }
}

/** Парсит список чисел из строки вида '2,3' (для --exclude/--modes). */
export function parseNumberList(value: string | undefined): number[] {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => !Number.isNaN(n));
}
