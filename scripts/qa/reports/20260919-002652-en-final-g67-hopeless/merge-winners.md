# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:23.744Z
- **Отчёт eval**: scripts/qa/reports/20260919-002652-en-final-g67-hopeless/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/hopeless.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 5, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/hopeless.json` | `/steps_description/14/fact` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/hopeless.json` | `/steps_description/4/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/hopeless.json` | `/steps_description/17/fact` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/hopeless.json` | `/steps_description/0/fact` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/hopeless.json` | `/result/positive/text` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `tests/hopeless.json` → `/steps_description/14/fact`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 96/88
- **Судья**: Translation A is more idiomatic and concise, using 'A Harvard study' instead of the wordier 'A study conducted at Harvard University'. It also uses 'maintain healthy habits', which sounds more natural in a mental health context than 'maintain healthier lifestyles'.
- **Было (NEW)**: "A study conducted at Harvard University showed that optimists live, on average, 11–15% longer than pessimists. This is because optimists tend to manage stress better and maintain healthier lifestyles."
- **Стало (OLD)**: "A Harvard study found that optimists live on average 11–15% longer than pessimists. This is partly because optimists cope better with stress and are more likely to maintain healthy habits."

### `tests/hopeless.json` → `/steps_description/4/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 96/88
- **Судья**: Translation A is more idiomatic and flows better for a native reader. Translation B is grammatically correct but slightly more wordy and literal (e.g., 'the ability to manage time effectively' vs the more natural 'effective time management').
- **Было (NEW)**: "One of the key factors in achieving goals is the ability to manage time effectively. Research shows that people who plan their day and set priorities achieve greater success in various areas of life."
- **Стало (OLD)**: "One of the key factors in achieving goals is effective time management. Research shows that people who plan their day and set priorities tend to be more successful in different areas of life."

### `tests/hopeless.json` → `/steps_description/17/fact`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 96/88
- **Судья**: Translation B sounds more natural and professional for an article. 'Report high stress levels' is more idiomatic in a scientific/statistical context than 'experience', and 'life circumstances' is a much better collocation than 'life conditions'.
- **Было (NEW)**: "According to the American Psychological Association (APA), about 60% of people experience high levels of stress due to uncertainty about the future and changing life conditions."
- **Стало (OLD)**: "According to the American Psychological Association (APA), around 60% of people report high stress levels related to an uncertain future and changing life circumstances."

### `tests/hopeless.json` → `/steps_description/0/fact`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 94/86
- **Судья**: Translation B sounds more natural and professional, avoiding the repetitive 'In optimists...' structure of A. It uses more idiomatic phrasing like 'brain areas involved in' and 'optimistic mindset'.
- **Было (NEW)**: "Scientists have found that optimists activate different areas of the brain compared to pessimists. In optimists, the brain regions responsible for reward and positive expectations are activated more frequently."
- **Стало (OLD)**: "Scientists have found that optimists activate different brain regions than pessimists. Brain areas involved in reward and positive expectations are more active in people with an optimistic mindset."

### `tests/hopeless.json` → `/result/positive/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 95/88
- **Судья**: Translation A sounds more natural and idiomatic for a supportive mental health context. Translation B uses 'interest' (which is a bit flat for 'интерес' in this emotional context) and 'maintain a sense of inner stability', which feels slightly more clinical/stiff compared to the warmer 'draw strength from within'.
- **Было (NEW)**: "Your outlook on the future is filled with hope, interest, and healthy optimism. Even when facing difficulties, you maintain faith in good things and find ways to stay motivated. This approach helps you move forward with confidence and maintain a sense of inner stability."
- **Стало (OLD)**: "Your outlook on the future is filled with hope, curiosity and healthy optimism. Even when you face difficulties, you tend to hold on to the belief that good things are possible and find ways to stay motivated. This attitude helps you move forward with more confidence and draw strength from within."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

