# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:23.688Z
- **Отчёт eval**: scripts/qa/reports/20260919-002446-en-final-g67-eat/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/eat.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 6, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/eat.json` | `/steps_description/15/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/eat.json` | `/steps_description/15/fact` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/eat.json` | `/steps_description/5/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/eat.json` | `/steps_description/19/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/eat.json` | `/steps_description/4/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/eat.json` | `/steps_description/18/text` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `tests/eat.json` → `/steps_description/15/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 96/85
- **Судья**: Translation A sounds much more natural and idiomatic for a mental health/wellness context. Translation B uses heavy, clinical phrasing ('deficiency in energy', 'function normally') which feels like a direct translation from Russian.
- **Было (NEW)**: "Avoiding sugar can lead to increased control over diet and the development of unhealthy eating habits. It can also lead to a deficiency in energy and essential nutrients needed for the body to function normally."
- **Стало (OLD)**: "Avoiding sugar can increase rigid control over food and contribute to the development of unhealthy eating habits. It can also lead to low energy and a lack of key nutrients the body needs to function properly."

### `tests/eat.json` → `/steps_description/15/fact`

- **Оценки судьи OLD/NEW (2 прохода)**: 92/86 · 95/88
- **Судья**: Translation A sounds more natural and idiomatic for a mental well-being context. Translation B uses slightly more formal/stiff phrasing ('consumption within', 'medical necessity') which feels more like a medical textbook than a supportive expert friend.
- **Было (NEW)**: "Research shows that balanced sugar consumption within a healthy diet is important for maintaining energy levels and mood. Completely eliminating sugar without medical necessity can lead to nutrient deficiencies and a lower quality of life."
- **Стало (OLD)**: "Research shows that balanced sugar intake as part of a healthy diet is important for maintaining energy levels and stable mood. Completely cutting out sugar without medical reasons can lead to nutrient deficiencies and a lower overall quality of life."

### `tests/eat.json` → `/steps_description/5/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation B uses more natural and precise collocations for this context ('obsessive habit' vs 'intrusive practice', 'shapes food choices' vs 'influences food choices'). 'Mealtimes' is a much more idiomatic way to translate 'прием пищи' in this context than 'eating habits'.
- **Было (NEW)**: "Constant calorie counting can be linked to eating disorders like anorexia and bulimia. It can become an intrusive practice that influences food choices and eating habits, contributing to calorie restriction and excessive dietary control."
- **Стало (OLD)**: "Constantly counting calories can be linked to eating disorders such as anorexia and bulimia. It can become an obsessive habit that shapes food choices and mealtimes, promoting calorie restriction and excessive control over diet."

### `tests/eat.json` → `/steps_description/19/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 95/82
- **Судья**: Translation B is more idiomatic and natural for a mental health context; it focuses on the experience of the person with the disorder rather than the action of the surroundings. Translation A is a bit wordy and follows the Russian syntactic structure too closely.
- **Было (NEW)**: "People around those with eating disorders often exert pressure to eat more or to eat in a certain way. This pressure can come from family, friends, or colleagues and can cause additional stress and anxiety."
- **Стало (OLD)**: "People with eating disorders often experience pressure from others to eat more or to eat in a particular way. This pressure can come from family, friends or colleagues and can increase stress and anxiety."

### `tests/eat.json` → `/steps_description/4/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 95/88
- **Судья**: Translation A is more concise and natural for a mental health context, avoiding the wordy 'volume of food' and 'eating process' which sound like direct translations from Russian. Translation B is grammatically correct but suffers from 'translationese' (heavy, literal phrasing).
- **Было (NEW)**: "Cutting food into very small pieces can be associated with eating disorders, such as anorexia nervosa. This behavior may serve as a way to slow down the eating process and create the illusion of a larger volume of food, helping a person feel less hungry."
- **Стало (OLD)**: "Cutting food into small pieces can be associated with eating disorders such as anorexia nervosa. This behaviour can slow down eating and create the illusion of a larger portion, helping a person feel less hungry."

### `tests/eat.json` → `/steps_description/18/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation B uses more natural, idiomatic English ('helpful and harmful' instead of the clunky 'positive and negative factor') and better word choices ('eating patterns' vs 'eating habits').
- **Было (NEW)**: "Self-control regarding food can be both a positive and a negative factor. In the context of eating disorders like anorexia or orthorexia, excessive self-control can lead to strict dietary restrictions and unhealthy eating habits."
- **Стало (OLD)**: "Self-control around food can be both helpful and harmful. In the context of eating disorders such as anorexia or orthorexia, excessive self-control can lead to strict food restrictions and unhealthy eating patterns."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

