# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:52.003Z
- **Отчёт eval**: scripts/qa/reports/20260918-234024-en-final-g23-depression_story/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/depression_story.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 1, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/depression_story.json` | `/title` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/depression_story.json` → `/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 100/85
- **Судья**: Translation B is more faithful to the original structure and rhythm, capturing the metaphorical 'path' (путь) which adds a narrative quality suitable for a story title. Translation A is a bit too blunt and loses the nuance of the journey.
- **Было (NEW)**: "Alice’s Story: Overcoming Depression"
- **Стало (OLD)**: "Alice’s Story: A Path to Overcoming Depression"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

