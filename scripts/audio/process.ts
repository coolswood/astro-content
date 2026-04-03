import fs from 'fs';
import path from 'path';
import { generateSegments, calculateSync } from './utils';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * CLI утилита для обработки JSON-файлов ElevenLabs и генерации сегментов по предложениям.
 * 
 * Использование:
 *  bun scripts/audio/process.ts [путь_к_файлу.json]
 */
function main() {
  const inputPath = process.argv[2] || 'text.json';
  const absoluteInputPath = path.resolve(process.cwd(), inputPath);

  if (!fs.existsSync(absoluteInputPath)) {
    console.error(`❌ Ошибка: Файл ${absoluteInputPath} не найден.`);
    process.exit(1);
  }

  try {
    const data = JSON.parse(fs.readFileSync(absoluteInputPath, 'utf8'));
    const segments = generateSegments(data);
    
    // Пытаемся найти файл истории для пре-калькуляции синхронизации
    const dir = path.dirname(absoluteInputPath);
    const parts = absoluteInputPath.split(path.sep);
    
    // Ищем папку 'ru'/'en' и т.д. или папку 'story'
    let lang = '';
    let storyId = '';
    
    // Если путь содержит /scripts/audio/ru/start/text.json или /public/audio/story/ru/start/text.json
    const audioIdx = parts.indexOf('audio');
    if (audioIdx !== -1 && parts.length > audioIdx + 2) {
      // Проверяем, не является ли следующий элемент папкой 'story'
      if (parts[audioIdx + 1] === 'story') {
        lang = parts[audioIdx + 2];
        storyId = parts[audioIdx + 3];
      } else {
        lang = parts[audioIdx + 1];
        storyId = parts[audioIdx + 2];
      }
    }

    if (lang && storyId) {
      const storyPath = path.resolve(__dirname, '..', '..', 'src', 'i18n', lang, 'story', `${storyId}.json`);

      if (fs.existsSync(storyPath)) {
        const storyData = JSON.parse(fs.readFileSync(storyPath, 'utf8'));
        const syncData = calculateSync(storyData, segments);
        
        const syncPath = path.join(dir, 'text.sync.json');
        fs.writeFileSync(syncPath, JSON.stringify(syncData, null, 2));
        console.log(`✅ Создан: ${syncPath}`);

        // Копируем в public для доступа
        try {
          const publicPath = path.resolve(
            process.cwd(),
            'public',
            'audio',
            'story',
            lang,
            storyId,
            'text.sync.json'
          );
          const publicDir = path.dirname(publicPath);
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
          }
          fs.copyFileSync(syncPath, publicPath);
          console.log(`📡 Доступно для скачивания: ${publicPath}`);
        } catch (copyError) {
          console.warn(
            `⚠️ Не удалось копировать в public:`,
            copyError instanceof Error ? copyError.message : copyError,
          );
        }
      } else {
        console.log(`ℹ️ Файл истории не найден по пути: ${storyPath}`);
      }
    }
  } catch (error) {
    console.error(
      '❌ Ошибка при обработке файла:',
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

main();
