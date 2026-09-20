# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:53.475Z
- **Отчёт eval**: scripts/qa/reports/20260919-000649-en-final-g45-trap_unemployment_vitamins/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/depression/trap_unemployment_vitamins.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 2, skip 12, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/screen_4/texts/0` | ⏭ skip | группа `/unemployment/screen_4/texts` переносится только целиком — лист не прошёл: /unemployment/screen_4/texts/10: валидация не пройдена — (файл): теги — потеряны: <li> </li> (нет в: unemployment/screen_4/texts/10) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/screen_4/texts/1` | ⏭ skip | группа `/unemployment/screen_4/texts` переносится только целиком — лист не прошёл: /unemployment/screen_4/texts/10: валидация не пройдена — (файл): теги — потеряны: <li> </li> (нет в: unemployment/screen_4/texts/10) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/screen_4/texts/10` | ⏭ skip | валидация не пройдена — (файл): теги — потеряны: <li> </li> (нет в: unemployment/screen_4/texts/10) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/screen_4/texts/11` | ⏭ skip | группа `/unemployment/screen_4/texts` переносится только целиком — лист не прошёл: /unemployment/screen_4/texts/10: валидация не пройдена — (файл): теги — потеряны: <li> </li> (нет в: unemployment/screen_4/texts/10) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/screen_4/texts/2` | ⏭ skip | валидация не пройдена — (файл): теги — потеряны: <h2> </h2> (нет в: unemployment/screen_4/texts/2) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/screen_4/texts/3` | ⏭ skip | валидация не пройдена — (файл): теги — потеряны: <li> </li> (нет в: unemployment/screen_4/texts/3) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/screen_4/texts/4` | ⏭ skip | валидация не пройдена — (файл): теги — потеряны: <li> </li> (нет в: unemployment/screen_4/texts/4) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/screen_4/texts/5` | ⏭ skip | валидация не пройдена — (файл): теги — потеряны: <li> </li> (нет в: unemployment/screen_4/texts/5) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/screen_4/texts/6` | ⏭ skip | валидация не пройдена — (файл): теги — потеряны: <li> </li> (нет в: unemployment/screen_4/texts/6) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/screen_4/texts/7` | ⏭ skip | валидация не пройдена — (файл): теги — потеряны: <li> </li> (нет в: unemployment/screen_4/texts/7) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/screen_4/texts/8` | ⏭ skip | валидация не пройдена — (файл): теги — потеряны: <li> </li> (нет в: unemployment/screen_4/texts/8) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/screen_4/texts/9` | ⏭ skip | валидация не пройдена — (файл): теги — потеряны: <li> </li> (нет в: unemployment/screen_4/texts/9) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/description` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/trap_unemployment_vitamins.json` | `/unemployment/title` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/depression/trap_unemployment_vitamins.json` → `/unemployment/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 92/82
- **Судья**: Translation B is more idiomatic and professional. It uses better collocations ('impact' instead of 'consequences', 'career setbacks' instead of 'professional setbacks') and avoids the clunky 'we look at' construction in favor of a more natural narrative flow.
- **Было (NEW)**: "This article explores the psychological and social consequences of sudden job loss, examining the emotional rollercoaster that accompanies such events. Through the personal experience of Alexander, who worked for a successful company for a long time, we look at the struggle with depression, declining self-esteem, and professional setbacks. The article also offers ways to overcome emotional difficulties, emphasizing the importance of support and self-compassion during hard times."
- **Стало (OLD)**: "This article explores the psychological and social impact of sudden job loss, tracing the emotional roller coaster that often follows. Through the story of Alexander, who spent years working at a successful company, it examines the struggle with depression, diminished self-esteem, and career setbacks. It also offers ways to move through these challenges, emphasizing the importance of support and self-respect during difficult times."

### `story/depression/trap_unemployment_vitamins.json` → `/unemployment/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 95/88
- **Судья**: Translation B uses an em dash and Title Case, which is more appropriate for a headline/article title, and 'slipping into' is a more idiomatic way to describe the onset of depression than 'falling into'.
- **Было (NEW)**: "Losing your job and falling into depression?"
- **Стало (OLD)**: "Losing Your Job—and Slipping into Depression?"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

