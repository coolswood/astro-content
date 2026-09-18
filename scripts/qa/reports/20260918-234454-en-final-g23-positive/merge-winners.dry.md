# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:52.412Z
- **Отчёт eval**: scripts/qa/reports/20260918-234454-en-final-g23-positive/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/positive.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 1, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/positive.json` | `/test/question` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/positive.json` → `/test/question`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/90 · 98/92
- **Судья**: While both are grammatically correct, 'best describes' is the idiomatic standard for multiple-choice questions or comparative assessments in English. 'Most accurately describes' sounds slightly more formal and heavy.
- **Было (NEW)**: "Which statement most accurately describes the difference between positive thinking and CBT?"
- **Стало (OLD)**: "Which statement best describes the difference between positive thinking and CBT?"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

