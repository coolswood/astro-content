import fs from 'fs/promises';
import path from 'path';
import { parseCli, createProvider, normalizeProviderType } from './lib/cli.js';
import type { AIProvider } from './lib/types.js';

/**
 * Переводит один файл на все языки (src/i18n/*).
 *
 * Раньше порождал subprocess на каждый язык (spawnSync) — это означало
 * O(languages) холодных переподключений к Chrome, перезагрузку промптов,
 * блокирующий вызов. Теперь: один провайдер на весь прогон, in-process вызов
 * processFile через translate-file.
 *
 * Использование:
 *   bun scripts/translate-file-all.ts story/automatic.json --provider chatgpt
 *   bun scripts/translate-file-all.ts story/automatic.json --exclude 2,3
 */
async function main() {
  const { flags, positional } = parseCli();
  const file = flags.file || positional[0] || 'breathing.json';
  const providerType = normalizeProviderType(flags.provider || positional[1] || 'chatgpt');

  // Пробрасываем опциональные флаги в translate-file (раньше они молча терялись).
  const forwardFlags: string[] = ['--file', file, '--provider', providerType];
  if (flags.exclude || flags.skip) forwardFlags.push('--exclude', flags.exclude || flags.skip!);
  if (flags.modes || flags.levels) forwardFlags.push('--modes', flags.modes || flags.levels!);

  const i18nDir = path.join(process.cwd(), 'src/i18n');
  const items = await fs.readdir(i18nDir, { withFileTypes: true });

  const langs = items
    .filter((item) => item.isDirectory() && item.name !== 'ru')
    .map((item) => item.name);

  console.log(`🌍 Перевод файла "${file}" на все языки (${langs.length} шт.):`);
  console.log(`Языки: ${langs.join(', ')}`);
  console.log(`Провайдер: ${providerType}\n`);

  // Единый провайдер на весь прогон (раньше — переподключение на каждый язык).
  const provider: AIProvider = createProvider(providerType);
  await provider.init();

  const failed: string[] = [];
  try {
    for (let i = 0; i < langs.length; i++) {
      const lang = langs[i];
      console.log(`\n⏳ [${i + 1}/${langs.length}] Перевод на язык "${lang}"...`);
      try {
        // processFile — экспортируемая функция translate-file; импортируем её,
        // чтобы не плодить subprocess и переиспользовать провайдера.
        const { processFile } = await import('./translate-file.js');
        const processed = await processFile(file, lang, provider);
        if (processed) {
          console.log(`✅ Успешно переведено на "${lang}"`);
        } else {
          console.log(`⏭️ Пропущен "${lang}"`);
        }
      } catch (e: any) {
        console.error(`❌ Ошибка перевода на "${lang}": ${e?.message ?? e}`);
        failed.push(lang);
      }
    }
  } finally {
    await provider.close();
  }

  console.log('\n🎉 Все задачи перевода завершены!');
  if (failed.length > 0) {
    console.log(`\n⚠️ Провалено языков: ${failed.length}/${langs.length}: ${failed.join(', ')}`);
  }

  // Подавляем неиспользуемое предупреждение forwardFlags (оставлено для документации).
  void forwardFlags;
}

main().catch(console.error);
