# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:54.828Z
- **Отчёт eval**: scripts/qa/reports/20260919-004037-en-final-g67-diary/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — texts/diary.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 2, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `texts/diary.json` | `/automaticAnalysis/3/wrong` | ✅ apply | перенесён текст OLD (2:0) |
| `texts/diary.json` | `/automaticAnalysis/2/title` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `texts/diary.json` → `/automaticAnalysis/3/wrong`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 98/85
- **Судья**: Translation B is more natural and idiomatic for a mental health context, using the common 'I tend to' construction and a contraction. Translation A is grammatically correct but feels slightly heavy and formal due to 'I have a tendency to' and the lack of a contraction.
- **Было (NEW)**: "I have a tendency to believe that my opinion does not matter"
- **Стало (OLD)**: "I tend to believe that my opinion doesn’t matter"

### `texts/diary.json` → `/automaticAnalysis/2/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 95/85
- **Судья**: Translation A uses the plural form, which is more natural for a general concept or a heading in English. Translation B sounds overly specific and slightly clunky due to the singular indefinite articles.
- **Было (NEW)**: "Recording a fact instead of an interpretation"
- **Стало (OLD)**: "Recording facts instead of interpretations"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

