# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:23.909Z
- **Отчёт eval**: scripts/qa/reports/20260919-003346-en-final-g67-sdvg/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/sdvg.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 2, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/sdvg.json` | `/steps_description/14/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/sdvg.json` | `/steps_description/9/text` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `tests/sdvg.json` → `/steps_description/14/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/85 · 92/78
- **Судья**: Translation B sounds more natural and idiomatic for a mental health context. 'Rich in stimulation' is a much better way to describe an environment than the clunky 'many communication stimuli' used in A.
- **Было (NEW)**: "The racing thoughts characteristic of people with ADHD can lead to fast and continuous talking. This is especially evident in social settings with many communication stimuli."
- **Стало (OLD)**: "Fast, racing thoughts, which are common in ADHD, can lead to rapid and continuous talking. This is especially noticeable in social situations that are rich in stimulation."

### `tests/sdvg.json` → `/steps_description/9/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation A is more idiomatic and natural for a mental health context. The addition of 'misplacing' in A is a smart transcreation that captures the nuance of 'потеря вещей' in English, whereas B is a bit more literal and dry.
- **Было (NEW)**: "People with ADHD often face challenges with forgetfulness and organization, which can lead to frequently losing things. This is linked to difficulties in managing working memory and planning."
- **Стало (OLD)**: "People with ADHD often struggle with forgetfulness and organization, which can lead to frequently losing or misplacing things. This is linked to difficulties with working memory and planning."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

