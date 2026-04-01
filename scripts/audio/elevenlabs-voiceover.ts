import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { parseArgs } from 'util';
import { join, parse, relative } from 'path';
import { generateSegments } from './utils';

/**
 * Скрипт для автоматизации озвучки статей через ElevenLabs API с использованием официального SDK.
 * Генерирует аудио (.mp3) и JSON с временными метками для каждого символа.
 *
 * Использование:
 *  bun scripts/audio/elevenlabs-voiceover.ts --text "Ваш текст" --speed 0.9
 *  bun scripts/audio/elevenlabs-voiceover.ts --file "article.txt" --voiceId "hpp4J3VqNfWAUOO0d1Us"
 */

async function main() {
  const { values } = parseArgs({
    options: {
      text: { type: 'string' },
      file: { type: 'string' },
      voiceId: { type: 'string', default: '7G0NvIkWRnU0Dqjgz13p' }, // Екатерина
      out: { type: 'string' },
      speed: { type: 'string', default: '0.75' },
      stability: { type: 'string', default: '0.6' },
      similarityBoost: { type: 'string', default: '0.7' },
      style: { type: 'string', default: '0.1' },
    },
  });

  // EDpEYNf6XIeKYRzYcx4I
  // C3FusDjPequ6qFchqpzu
  // sNQyZH8Wfcnv7zh3rHxR
  // WfExDXCt2GBg6MI5KjQk

  // N8lIVPsFkvOoqev5Csxo
  // foZmP0ldhGob3fHgegm1
  // dVRDrbP5ULGXB94se4KZ

  // 7G0NvIkWRnU0Dqjgz13p
  // TPIitICAZ8CqlGZ81AKm

  const apiKey = 'sk_19e233fe72fe3bd0afb1d2de2b28e490799980bb4f5116e1_111'; // Fallback to provided key if env is not set
  if (!apiKey) {
    console.error(
      '❌ Ошибка: Переменная окружения ELEVEN_LABS_API_KEY не задана.',
    );
    process.exit(1);
  }

  const client = new ElevenLabsClient({ apiKey });

  let text = values.text;
  const filePath = values.file;
  if (filePath) {
    if (existsSync(filePath)) {
      text = readFileSync(filePath, 'utf-8');
    } else {
      console.error(`❌ Ошибка: Файл ${filePath} не найден.`);
      process.exit(1);
    }
  }

  if (!text) {
    console.error(
      '❌ Ошибка: Необходимо указать текст через --text или --file.',
    );
    process.exit(1);
  }

  const voiceId = values.voiceId as string;
  const speed = parseFloat(values.speed);
  const stability = parseFloat(values.stability);
  const similarityBoost = parseFloat(values.similarityBoost);
  const style = parseFloat(values.style);

  let outputBase = values.out as string;
  if (!outputBase) {
    if (filePath) {
      const { dir, name } = parse(filePath);
      outputBase = join(dir, name);
    } else {
      outputBase = 'voiceover_output';
    }
  }

  const outputName = outputBase;

  console.log(`🎙️ Подготовка озвучки...`);
  console.log(`   Длина текста: ${text.length} символов`);
  console.log(`   Голос: ${voiceId}`);
  console.log(`   Модель: eleven_v3`);
  console.log(`   Скорость: ${speed}`);
  console.log(
    `   Параметры: stability=${stability}, similarity_boost=${similarityBoost}`,
  );

  try {
    const response = await client.textToSpeech.convertWithTimestamps(voiceId, {
      text,
      modelId: 'eleven_v3',
      outputFormat: 'mp3_44100_128',
      voiceSettings: {
        stability,
        similarityBoost,
        speed,
        style,
      },
    });

    const audioBuffer = Buffer.from(response.audioBase64, 'base64');
    const audioPath = `${outputName}.mp3`;
    const jsonPath = `${outputName}.json`;

    writeFileSync(audioPath, audioBuffer);
    writeFileSync(jsonPath, JSON.stringify(response.alignment, null, 2));

    console.log(`✅ Успешно сохранено:`);
    console.log(`   - Аудио: ${audioPath}`);
    console.log(`   - Метаданные (timestamps): ${jsonPath}`);

    if (response.alignment) {
      const segments = generateSegments(response.alignment);
      const segmentsPath = `${outputName}.segments.json`;
      writeFileSync(segmentsPath, JSON.stringify(segments, null, 2));
      console.log(`   - Сегменты по предложениям: ${segmentsPath}`);

      // Копирование в public/audio/story для доступа по GET-запросу
      try {
        const publicDir = join(process.cwd(), 'public', 'audio', 'story');
        // Получаем путь относительно scripts/audio (или текущей папки, если вне scripts)
        let relativePath = relative(
          join(process.cwd(), 'scripts', 'audio'),
          outputBase,
        );
        if (relativePath.startsWith('..')) {
          // Если файл не в scripts/audio, берем только имя
          relativePath = parse(outputBase).name;
        }

        const targetDir = join(publicDir, parse(relativePath).dir);
        mkdirSync(targetDir, { recursive: true });

        const publicAudioPath = join(publicDir, `${relativePath}.mp3`);
        const publicSegmentsPath = join(
          publicDir,
          `${relativePath}.segments.json`,
        );

        writeFileSync(publicAudioPath, audioBuffer);
        writeFileSync(publicSegmentsPath, JSON.stringify(segments, null, 2));

        console.log(`📡 Доступно по GET-запросу:`);
        console.log(
          `   - http://localhost:4321/audio/story/${relativePath}.mp3`,
        );
        console.log(
          `   - http://localhost:4321/audio/story/${relativePath}.segments.json`,
        );
      } catch (e) {
        console.log(
          `⚠️ Не удалось скопировать в public (это нормально, если вы вне корня проекта)`,
        );
      }
    }
  } catch (error) {
    console.error(
      '❌ Произошла ошибка во время запроса к API:',
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  }
}

main();
