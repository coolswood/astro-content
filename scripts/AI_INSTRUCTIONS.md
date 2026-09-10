# Локализация: инструкция для AI-агента

Актуальное описание системы локализации. Скрипты-предшественники
(`translate-arb.ts`, `translate-file*.ts`, `translate-ui.ts`, `lingo_proxy.py`,
lingo.dev) удалены — их заменил единый раннер.

## Как устроено

- **Контент**: `src/i18n/ru` → `src/i18n/<lang>` — 19 локалей, раздаётся по HTTP.
- **UI Flutter**: канон `cognitive_psy/lib/l10n/app_ru.arb` → `app_<lang>.arb`
  (merge-валидатор cognitive_psy жёстко требует отсутствия лишних ключей —
  purge мёртвых ключей обязателен).
- **Раннер**: `scripts/translate.ts` (bun). Два режима: контент и `--ui`.
- **Конвейер**: контент — 4 стадии main → editor → review → fix («критикуй
  отдельно, правь отдельно»); keys/ui — 3 стадии main → editor → tech. Промпты
  в `scripts/prompts/` (эти файлы — выверенный актив качества, НЕ менять без
  явной задачи). Патчи editor/fix/tech применяются с guard'ом: контейнер
  (массив/объект, ≥4 листьев), покрытый патчем на 100%, отбрасывается —
  модель вернула переписанный контейнер целиком вместо «только изменённых
  ключей», и вместе с «полировкой» так въезжают перестановки элементов и
  эпиграфы-дубли (дефект «крючков» в первых элементах экранов).
- **Конвенция `<instagram>`**: встраиваемый пост рендерится только для ru и en
  (там допустимы атрибуты `ids="…"`); во всех остальных локалях тег обязан быть
  ПУСТЫМ. Промптовое правило модель нарушает, копируя тег дословно, поэтому
  `runPipeline` срезает атрибуты механически
  (`stripInstagramAttributes` в `scripts/lib/tag-reconcile.ts`).
- **Провайдер по умолчанию**: vLLM `google/gemma-4-26B-A4B-it` через SSH-туннель.
  Старые браузерные провайдеры (ChatGPT/Claude/Gemini/Mistral по CDP :9222)
  сохранены в `scripts/lib/providers/` с пометкой LEGACY, доступны через
  `--provider chatgpt|claude|gemini|mistral`, не развиваются.

## ⚠️ Жёсткое правило

**К модели — строго 1 одновременный запрос.** gx10 перегружается от параллельных.
Раннер соблюдает это сам (мьютекс в `VllmClient` + последовательная обработка).

## Туннель к модели

```bash
ssh -f -N -L 18000:127.0.0.1:8000 \
  -i "$HOME/Library/Application Support/NVIDIA/Sync/config/nvsync.key" \
  coolswood@192.168.31.18
# проверка: curl -s -m 5 http://127.0.0.1:18000/v1/models
```

Endpoint/модель настраиваются в `scripts/translate.config.json`
(env: `TRANSLATE_ENDPOINT`, `TRANSLATE_MODEL`, `COGNITIVE_PSY_DIR`).

## Команды

```bash
# Посмотреть, что переводится (missing/changed/dead по всем локалям), ничего не меняя
bun scripts/translate.ts story/start.json --dry-run
bun scripts/translate.ts --ui --dry-run

# Перевести контент-файл (или каталог) на все языки / на один
bun scripts/translate.ts story/start.json
bun scripts/translate.ts story/automatic.json --langs ja,ko

# Доперевести/обновить интерфейс cognitive_psy
bun scripts/translate.ts --ui
bun scripts/translate.ts --ui --langs en,de

# Полный переперевод, игнорируя инкрементальность
bun scripts/translate.ts story/start.json --full
```

Раннер сам: детектит недостающие/изменившиеся/мёртвые ключи, валидирует
(ключи, плейсхолдеры `{…}`, теги `<b>/<q>/<important>/<instagram>`, алфавиты,
дубли — два разных ru-оригинала не должны схлопываться в одинаковый перевод;
ловит «крючки»-подмены первых элементов), ретраит с
`response_format: json_object`, пишет файлы атомарно и только после
успеха (частичной записи нет), ведёт закоммиченный state
(`scripts/translation-state.json`, per-key sha1 ru-значений; первый прогон
инициализирует его существующими переводами — изменение ru-ключа после этого
всегда ловится).

## Глоссарии

`scripts/prompts/<lang>/glossary.json` — ручной актив (НЕ генерировать моделью):
термины КПТ извлечены из проверенных переводов проекта. Для de, ja, pl, pt_br —
исторические; для ar cs en es fr he id it ko nl pt sv tr — составлены в сессии
редактуры 2026-09-10 по образцу ja. Без глоссария модель калькирует термины
(«глубинные убеждения» вместо принятых core belief / creencias nucleares /
핵심 신념 и т.д.).

## Валидация отдельно

```bash
bun check-translations.ts <lang>   # чужие алфавиты по всему каталогу локали
bun test                           # тесты state/диффа/валидации/дерева
```

## Файлы

```
scripts/translate.ts            единый раннер (контент + --ui)
scripts/translate.config.json   конфиг (локали, endpoint, модель, psy-dir)
scripts/translation-state.json  закоммиченный state (per-key sha1 ru)
scripts/prompts/                промпты + глоссарии (актив качества)
scripts/lib/pipeline.ts         vLLM-клиент + 3 стадии + legacy-адаптер
scripts/lib/{tree,state,analyze,validation}.ts  инкрементальность и валидация
backups/                        архивные снимки переводов (не раздаётся)
```
