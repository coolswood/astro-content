#!/usr/bin/env bun
/**
 * Структурный аудит локалей: сверка ВСЕХ файлов ВСЕХ локалей с ru-каноном.
 * Чисто механический (без модели) — годится для CI и послеинцидентных проверок.
 *
 *   bun scripts/qa/check-locales.ts                 # все локали
 *   bun scripts/qa/check-locales.ts ja de           # только эти локали
 *
 * Категории:
 *   CRITICAL  lost-text     — листы ru (кроме instagram/видео) отсутствуют
 *                              в локали: клиент получает undefined/неполный
 *                              контент (инцидент ja/questions 2026-03);
 *   CRITICAL  id-shift      — стабильный id записи («N/id») отличается от ru:
 *                              смещение массива, дубли/потерянные записи;
 *   CRITICAL  no-file       — файл локали отсутствует/не парсится;
 *   warning   dead          — листы локали, которых нет в ru (мёртвые ключи;
 *                              штатно выпиливаются раннером при следующем прогоне);
 *   warning   instagram     — расхождения массивов instagram (легаси-доброкачественно:
 *                              не-ru/en рендерит en-fallback, en ведёт свои посты);
 *   warning   quality       — прочие замечания validateTranslation (плейсхолдеры,
 *                              чужие алфавиты, теги, дубли, медиа-пути).
 *
 * Код выхода: 1 при любых CRITICAL (для CI), 0 — только warnings.
 */
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { parseCli } from '../lib/cli.js';
import { flattenLeaves } from '../lib/tree.js';
import { sourceLeavesForLang } from '../lib/media-paths.js';
import { validateTranslation, isStableIdPath } from '../lib/validation.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const RU_DIR = path.join(ROOT, 'src', 'i18n', 'ru');

function walkJson(dir: string, base = ''): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.endsWith('.json')) out.push(base ? `${base}/${e.name}` : e.name);
    else if (e.isDirectory()) out.push(...walkJson(path.join(dir, e.name), base ? `${base}/${e.name}` : e.name));
  }
  return out.sort();
}

const isInstagramPath = (p: string) => p.split('/').includes('instagram');

interface FileAudit {
  locale: string;
  file: string;
  noFile: boolean;
  lostText: string[];
  dead: string[];
  instagram: string[];
  idShift: string[];
  quality: string[];
}

function auditFile(locale: string, relFile: string, ruLeaves: Record<string, string>): FileAudit {
  const res: FileAudit = {
    locale, file: relFile, noFile: false, lostText: [], dead: [], instagram: [], idShift: [], quality: [],
  };
  const targetPath = path.join(ROOT, 'src', 'i18n', locale, relFile);
  let target: any = null;
  try {
    target = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  } catch {
    res.noFile = true;
    return res;
  }
  const bare = (m: Record<string, string>) =>
    Object.fromEntries(Object.entries(m).map(([k, v]) => [k.replace(/^\//, ''), v]));
  const src = bare(sourceLeavesForLang(ruLeaves, locale));
  const tgt = bare(flattenLeaves(target));

  for (const p of Object.keys(src)) {
    if (!(p in tgt)) (isInstagramPath(p) ? res.instagram : res.lostText).push(p);
  }
  for (const p of Object.keys(tgt)) {
    if (!(p in src) && !isInstagramPath(p)) res.dead.push(p);
  }

  // Полная валидация конвейера: правило 3.8 (id) — critical, остальное — quality.
  const issues = validateTranslation(locale, src, target);
  for (const iss of issues) {
    if (iss.message.startsWith('потеряны ключи') || iss.message.startsWith('лишние ключи')) continue; // посчитано выше
    if (isStableIdPath(iss.path)) res.idShift.push(`${iss.path}: ${iss.message}`);
    else res.quality.push(`${iss.path || '(файл)'}: ${iss.message}`);
  }
  return res;
}

async function main(): Promise<number> {
  const { positional } = parseCli();
  const files = walkJson(RU_DIR);
  const locales = fs
    .readdirSync(path.join(ROOT, 'src', 'i18n'))
    .filter((d) => d !== 'ru' && (positional.length === 0 || positional.includes(d)))
    .sort();
  if (locales.length === 0) {
    console.error(`Нет локалей (фильтр: ${positional.join(', ') || '—'}).`);
    return 2;
  }

  const totals = { lostText: 0, idShift: 0, noFile: 0, dead: 0, instagram: 0, quality: 0 };
  const perLocale = new Map<string, { files: number; bad: number }>();
  let critical = 0;

  for (const relFile of files) {
    const ruLeaves = flattenLeaves(JSON.parse(fs.readFileSync(path.join(RU_DIR, relFile), 'utf8')));
    for (const locale of locales) {
      const r = auditFile(locale, relFile, ruLeaves);
      const stat = perLocale.get(locale) ?? { files: 0, bad: 0 };
      stat.files++;
      const hasCritical = r.noFile || r.lostText.length > 0 || r.idShift.length > 0;
      const hasAny = hasCritical || r.dead.length > 0 || r.quality.length > 0 || r.instagram.length > 0;
      if (hasAny) stat.bad++;
      perLocale.set(locale, stat);

      if (r.noFile) {
        totals.noFile++;
        critical++;
        console.log(`❌ ${locale} ${relFile}: файл отсутствует или не парсится`);
        continue;
      }
      if (r.idShift.length > 0) {
        totals.idShift += r.idShift.length;
        critical += r.idShift.length;
        console.log(`❌ ${locale} ${relFile}: смещение id (${r.idShift.length})`);
        for (const line of r.idShift.slice(0, 6)) console.log(`     ${line}`);
        if (r.idShift.length > 6) console.log(`     … и ещё ${r.idShift.length - 6}`);
      }
      if (r.lostText.length > 0) {
        totals.lostText += r.lostText.length;
        critical += r.lostText.length;
        const head = r.lostText.slice(0, 6).join(', ');
        console.log(`❌ ${locale} ${relFile}: потеряно листьев ${r.lostText.length} (${head}${r.lostText.length > 6 ? ', …' : ''})`);
      }
      totals.dead += r.dead.length;
      totals.instagram += r.instagram.length;
      totals.quality += r.quality.length;
    }
  }

  console.log('\n📊 Сводка по локалям (файлов с замечаниями / всего):');
  for (const [locale, stat] of [...perLocale.entries()].sort()) {
    console.log(`   ${locale.padEnd(6)} ${String(stat.bad).padStart(3)}/${stat.files}`);
  }
  console.log(
    `\nИТОГО: потерянных текстовых листьев ${totals.lostText}, смещений id ${totals.idShift},` +
      ` отсутствующих файлов ${totals.noFile} — CRITICAL.` +
      `\n       warnings: мёртвых ключей ${totals.dead}, instagram-расхождений ${totals.instagram}, quality-замечаний ${totals.quality}.`,
  );
  if (critical > 0) {
    console.log(`\n❌ CRITICAL: ${critical} — локали требуют доперевода (bun scripts/translate.ts …).`);
    return 1;
  }
  console.log('\n✅ CRITICAL-расхождений нет.');
  return 0;
}

main().then((code) => process.exit(code));
