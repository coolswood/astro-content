# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:23.443Z
- **Отчёт eval**: scripts/qa/reports/20260919-001826-en-final-g67-bipolar/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/bipolar.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 2, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/bipolar.json` | `/steps_description/3/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/bipolar.json` | `/steps_description/0/fact` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `tests/bipolar.json` → `/steps_description/3/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation B sounds more natural and professional for a mental health context. 'Reduced need for sleep' is a more idiomatic medical collocation than 'decreased need', and 'fully energized' flows better than 'full of energy'.
- **Было (NEW)**: "During manic or hypomanic episodes of bipolar disorder, a decreased need for sleep is often observed. People may feel full of energy even after only a few hours of sleep."
- **Стало (OLD)**: "During manic or hypomanic episodes of bipolar disorder, there is often a reduced need for sleep. Individuals can feel fully energized even after just a few hours of sleep."

### `tests/bipolar.json` → `/steps_description/0/fact`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 98/85
- **Судья**: Translation B is more idiomatic and flows better for a professional article. The use of 'prolonged' is a more natural fit for describing episodes than 'they are typically long' (implied by 'typically impact'), and the sentence structure in B is more cohesive.
- **Было (NEW)**: "According to the World Health Organization, bipolar disorder affects approximately 45 million people worldwide. Manic episodes can vary in duration and severity, but they typically impact behavior and social interactions significantly."
- **Стало (OLD)**: "According to the World Health Organization, bipolar disorder affects about 45 million people worldwide. Manic episodes can vary in duration and severity but are usually prolonged and significantly impact behavior and social interactions."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

