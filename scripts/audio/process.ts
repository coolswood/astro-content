import fs from 'fs';
import { generateSegments } from './utils';

/**
 * CLI утилита для обработки JSON-файлов ElevenLabs и генерации сегментов по предложениям.
 * 
 * Использование:
 *  bun scripts/audio/process.ts [путь_к_файлу.json]
 */
function main() {
  const inputPath = process.argv[2] || 'text.json';

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Ошибка: Файл ${inputPath} не найден.`);
    process.exit(1);
  }

  try {
    const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    const segments = generateSegments(data);
    
    console.log(JSON.stringify(segments, null, 2));
  } catch (error) {
    console.error(
      '❌ Ошибка при обработке файла:',
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

main();
