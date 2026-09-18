# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T11:54:57.121Z
- **Отчёт eval**: scripts/qa/reports/20260918-144850-en-b4-anxiety/report.json
- **Базлайн OLD**: git HEAD (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/anxiety.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 4, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/anxiety.json` | `/steps_description/14/fact` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/anxiety.json` | `/variants/seldom` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/anxiety.json` | `/result/extreme/title` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/anxiety.json` | `/steps_description/19/text` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `tests/anxiety.json` → `/steps_description/14/fact`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 95/88
- **Судья**: Translation A is more concise and natural for a mental health context. Translation B uses 'gastric acid secretion' and 'stomach spasms', which sound slightly more clinical/medical than the smoother 'stomach acid secretion' and 'stomach cramps' preferred in psychoeducation.
- **Было (NEW)**: "Stress and anxiety can lead to stomach spasms, increased gastric acid secretion, or even irritable bowel syndrome (IBS). These symptoms are psychosomatic, meaning they are physical manifestations of psychological distress."
- **Стало (OLD)**: "Stress and anxiety can lead to stomach cramps, increased stomach acid secretion or even irritable bowel syndrome (IBS). These symptoms are psychosomatic — physical manifestations of psychological distress."

### `tests/anxiety.json` → `/variants/seldom`

- **Оценки судьи OLD/NEW (2 прохода)**: 100/85 · 98/75
- **Судья**: In the context of a mobile app (likely a frequency scale for mood or symptoms), 'Rarely' is the standard, modern UX term. 'Seldom' sounds overly formal and literary.
- **Было (NEW)**: "Seldom"
- **Стало (OLD)**: "Rarely"

### `tests/anxiety.json` → `/result/extreme/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/90 · 98/85
- **Судья**: In a clinical or mental health context, 'severe' is the standard term used to describe the intensity of symptoms (e.g., severe anxiety, severe depression). 'Extreme' sounds more colloquial and less professional.
- **Было (NEW)**: "Extreme anxiety"
- **Стало (OLD)**: "Severe anxiety"

### `tests/anxiety.json` → `/steps_description/19/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/90 · 95/88
- **Судья**: Translation A uses 'Frequent', which is more idiomatic than 'Regular' when describing the occurrence of nightmares in a clinical/psychological context. Both are grammatically correct, but A sounds more natural to a native speaker.
- **Было (NEW)**: "Regular nightmares can seriously disrupt sleep structure, leading to sleep deprivation, which in turn increases daytime fatigue and lowers overall quality of life. This can also contribute to the development of depression and other psychological disorders."
- **Стало (OLD)**: "Frequent nightmares can seriously disrupt sleep structure, leading to sleep deprivation, which in turn increases daytime fatigue and reduces overall quality of life. This can also contribute to the development of depression and other psychological disorders."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

