# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:24.021Z
- **Отчёт eval**: scripts/qa/reports/20260919-003826-en-final-g67-daybook/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — texts/daybook.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 2, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `texts/daybook.json` | `/mockGptDream/desires` | ✅ apply | перенесён текст OLD (2:0) |
| `texts/daybook.json` | `/mockGptDream/middle` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `texts/daybook.json` → `/mockGptDream/desires`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/85 · 95/82
- **Судья**: Translation B is more natural and follows the UX guidelines by using the possessive 'your' instead of a generic article, which makes the text feel more personal and supportive. Translation A feels slightly more like a list of abstract nouns rather than a personal goal.
- **Было (NEW)**: "A desire to better understand deep emotions, find inner clarity, and gain stability."
- **Стало (OLD)**: "A wish to better understand your deeper emotions and to find inner clarity and stability."

### `texts/daybook.json` → `/mockGptDream/middle`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 95/75
- **Судья**: Translation B sounds much more natural and idiomatic for a personal affirmation or goal statement. Translation A uses heavy nouns ('stability and safety') which creates a slightly formal, clunky tone, whereas B uses adjectives ('stable and safe') which is the standard way a native speaker would express this feeling.
- **Было (NEW)**: "I strive to feel stability and safety in my life."
- **Стало (OLD)**: "I want to feel stable and safe in my life."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

