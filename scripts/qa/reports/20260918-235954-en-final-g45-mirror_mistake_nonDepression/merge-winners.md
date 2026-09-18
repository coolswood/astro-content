# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:22.890Z
- **Отчёт eval**: scripts/qa/reports/20260918-235954-en-final-g45-mirror_mistake_nonDepression/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/depression/mirror_mistake_nonDepression.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 2, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/depression/mirror_mistake_nonDepression.json` | `/nonDepression/title` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/mirror_mistake_nonDepression.json` | `/nonDepression/description` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/depression/mirror_mistake_nonDepression.json` → `/nonDepression/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 96/85
- **Судья**: Translation A is more idiomatic and punchy, using the adjective 'depressed' which sounds more natural for a title. Translation B is grammatically correct but feels slightly more clinical and heavy due to the noun 'depression'.
- **Было (NEW)**: "Being sad doesn’t mean you have depression"
- **Стало (OLD)**: "Feeling Sad Doesn’t Mean You’re Depressed"

### `story/depression/mirror_mistake_nonDepression.json` → `/nonDepression/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 96/88
- **Судья**: Translation A sounds much more natural and idiomatic for an English-speaking reader, using 'feeling pain is a human response' and 'crosses the line' instead of the clunkier, more literal constructions in B. It also correctly uses 'distorted thinking' which flows better in this context, whereas B's 'cognitive distortions' feels slightly more academic for an introductory paragraph.
- **Было (NEW)**: "In this article, we discuss the important distinction between natural sadness and clinical depression. Loss, breakups, hardships, and changes are part of life, and it is perfectly human to experience pain. We explain how to distinguish natural emotions from depression, where cognitive distortions play a major role and professional help may be needed. This material will help you better understand your feelings and notice when sadness goes beyond the norm."
- **Стало (OLD)**: "This article highlights the crucial difference between natural sadness and clinical depression. Loss, separation, hardship, and change are part of life—and feeling pain is a human response. We explain how to distinguish everyday emotions from depression, where distorted thinking plays a major role and professional help may be needed. The piece will help you understand your feelings and notice when sadness crosses the line."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

