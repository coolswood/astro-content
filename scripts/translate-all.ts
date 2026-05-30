import fs from 'fs/promises';
import { spawnSync } from 'child_process';
import path from 'path';

function parseArgs() {
  const args: Record<string, string> = {};
  const positional: string[] = [];

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--')) {
      const nextArg = process.argv[i + 1];
      if (nextArg && !nextArg.startsWith('--')) {
        args[arg.slice(2)] = nextArg;
        i++;
      } else {
        args[arg.slice(2)] = 'true';
      }
    } else {
      positional.push(arg);
    }
  }

  const file = args.file || positional[0] || 'breathing.json';
  const provider = args.provider || positional[1] || 'gemini';

  return { file, provider };
}

const { file, provider } = parseArgs();

async function main() {
  const i18nDir = path.join(process.cwd(), 'src/i18n');
  const items = await fs.readdir(i18nDir, { withFileTypes: true });
  
  const langs = items
    .filter((item) => item.isDirectory() && item.name !== 'ru')
    .map((item) => item.name);

  console.log(`🌍 Начинаем перевод файла "${file}" на все языки (${langs.length} шт.):`);
  console.log(`Языки: ${langs.join(', ')}`);
  console.log(`Провайдер: ${provider}\n`);

  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    console.log(`\n⏳ [${i + 1}/${langs.length}] Перевод на язык "${lang}"...`);
    
    const result = spawnSync('bun', [
      'scripts/gemini-simple-bot.ts',
      '--file', file,
      '--lang', lang,
      '--provider', provider
    ], {
      stdio: 'inherit',
      encoding: 'utf-8'
    });

    if (result.status === 0) {
      console.log(`✅ Успешно переведено на "${lang}"`);
    } else {
      console.error(`❌ Ошибка перевода на "${lang}"`);
    }
  }

  console.log('\n🎉 Все задачи перевода завершены!');
}

main().catch(console.error);
