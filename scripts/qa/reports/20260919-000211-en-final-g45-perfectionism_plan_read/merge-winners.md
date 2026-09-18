# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:22.946Z
- **Отчёт eval**: scripts/qa/reports/20260919-000211-en-final-g45-perfectionism_plan_read/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/depression/perfectionism_plan_read.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 1, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/depression/perfectionism_plan_read.json` | `/perfectionism/test/question` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/depression/perfectionism_plan_read.json` → `/perfectionism/test/question`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 95/85
- **Судья**: Translation A is more concise and natural for an English speaker. Translation B is a literal translation of the Russian 'Как называется...', which sounds slightly wordy and redundant in English.
- **Было (NEW)**: "What is the name of the type of perfectionism that does not lead to self-criticism and fear of mistakes?"
- **Стало (OLD)**: "What is the type of perfectionism that does not lead to self-criticism and fear of mistakes?"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

