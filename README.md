# astro-content

Бэкенд контента для Flutter-приложения cognitive_psy (сиблинг
`../cognitive_psy`): статьи, истории, упражнения и тесты на 19 языках,
раздаются по HTTP (Vercel).

## Локализация

- **Контент**: `src/i18n/ru` — источник истины, переводы в `src/i18n/<lang>`
  (ar cs de en es fr he id it ja ko nl pl pt pt_br ru sv tr uk).
- **UI приложения**: `cognitive_psy/lib/l10n/app_ru.arb` → `app_<lang>.arb`
  (переводится из этого репозитория, режим `--ui`).
- **Раннер**: `bun scripts/translate.ts` — трёхстадийный конвейер
  (перевод → редактура → тех-аудит) на локальной модели vLLM.
  Подробности и команды — [scripts/AI_INSTRUCTIONS.md](scripts/AI_INSTRUCTIONS.md).

Требования к качеству текста — в [TRANSLATION_GUIDELINES.md](TRANSLATION_GUIDELINES.md)
и языковых файлах `TRANSLATION_GUIDELINES_*.md`; терминология КПТ фиксируют
глоссарии `scripts/prompts/<lang>/glossary.json`.

### Контроль качества: слепой парный судья

После смены промптов/модели — сравнить «новый» перевод (рабочее дерево) со
«старым» (снапшот или git-реф): судья слепо выбирает лучший из пары, каждый
пара судится дважды в зеркальных порядках A/B, вердикт учитывается только
при устойчивых 2:0. Критерии судьи: главный — приятность чтения носителю,
второй — близость к оригиналу; языковые правила и глоссарий локали
подставляются из `scripts/prompts/<lang>/`. Отчёт (JSON+MD с деталями пар
для спот-чека) пишется в `scripts/qa/reports/`.

```bash
bun scripts/qa/eval.ts story/start.json \
  --old-dir backups/<снапшот> --langs de,ja,ar --sample 10 --label prompt-v3
bun scripts/qa/eval.ts story --git-ref 2695c5f --dry-run   # план без модели
```

Базлайн: `--old-dir` (зеркало `<dir>/<lang>/<rel>`, `<reldir>/<lang>.json`
или плоский `<lang>.json`) либо `--git-ref`. Правило «не хуже»: стабильный
win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.


## Разработка

```bash
bun install
bun run dev      # Astro dev
bun run build    # сборка
bun test         # тесты подсистемы локализации
```
