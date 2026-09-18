# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:23.386Z
- **Отчёт eval**: scripts/qa/reports/20260919-001547-en-final-g67-bdi/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/bdi.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 5, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/bdi.json` | `/steps_description/18/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/bdi.json` | `/steps_description/12/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/bdi.json` | `/steps_description/3/fact` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/bdi.json` | `/steps_description/16/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/bdi.json` | `/result/exacerbated/title` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `tests/bdi.json` → `/steps_description/18/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/88 · 95/88
- **Судья**: Translation A is more concise and uses more natural, professional phrasing ('shifts in appetite', 'eating patterns'). Translation B is slightly more repetitive and wordy ('changes in... changes in', 'serves as an indicator of').
- **Было (NEW)**: "Changes in weight can result from changes in appetite and eating habits associated with depression and anxiety disorders. Significant unintentional weight change often serves as an indicator of serious emotional issues."
- **Стало (OLD)**: "Changes in weight can result from shifts in appetite and eating patterns related to depression and anxiety disorders. Unintentional, significant weight change often indicates serious emotional difficulties."

### `tests/bdi.json` → `/steps_description/12/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/90 · 98/92
- **Судья**: Both translations are excellent and accurate, but B uses 'alter' instead of 'change', which sounds more professional and precise in a scientific/medical context, and 'the brain area' is slightly more idiomatic than 'the area of the brain'.
- **Было (NEW)**: "Neuropsychological research shows that depression can change activity in the prefrontal cortex, the area of the brain responsible for decision-making and planning."
- **Стало (OLD)**: "Neuropsychological research shows that depression can alter activity in the prefrontal cortex, the brain area responsible for decision-making and planning."

### `tests/bdi.json` → `/steps_description/3/fact`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 95/88
- **Судья**: Translation A is more concise and natural for an English-speaking reader. Translation B starts with 'It is important to understand that', which is a common Russian-to-English filler/calque that adds unnecessary wordiness (clutter) to the sentence.
- **Было (NEW)**: "It is important to understand that anhedonia can be caused by various factors, including biological ones (such as changes in neurotransmitter levels) and psychological ones (such as chronic stress or trauma)."
- **Стало (OLD)**: "Anhedonia can be caused by a variety of factors, including biological ones (for example, changes in neurotransmitter levels) and psychological ones (such as chronic stress or trauma)."

### `tests/bdi.json` → `/steps_description/16/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation B uses more natural, idiomatic collocations for a mental health context ('persistent fatigue', 'handle daily tasks', 'social activities') compared to the slightly more literal and clinical phrasing in A.
- **Было (NEW)**: "Constant fatigue is one of the most common symptoms of depression and chronic stress. Fatigue can be both physical and mental, reducing the ability to perform daily tasks and participate in social interactions."
- **Стало (OLD)**: "Persistent fatigue is one of the most common symptoms of depression and chronic stress. Fatigue can be both physical and mental, reducing the ability to handle daily tasks and take part in social activities."

### `tests/bdi.json` → `/result/exacerbated/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 92/75 · 95/70
- **Судья**: In a mental health context, 'exacerbated' sounds like a clinical description of a process (something getting worse), whereas 'severe' is the standard way to describe the intensity of a state. 'Exacerbated depressive state' sounds like a literal translation (calque) from Russian.
- **Было (NEW)**: "Exacerbated depressive state"
- **Стало (OLD)**: "Severe depressive state"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

