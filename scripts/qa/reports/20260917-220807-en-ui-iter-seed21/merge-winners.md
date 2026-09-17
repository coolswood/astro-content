# Merge-back победителей OLD — APPLY

- **Дата**: 2026-09-17T19:08:07.318Z
- **Отчёт eval**: scripts/qa/reports/20260917-220807-en-ui-iter-seed21/report.json
- **Снапшот (источник OLD)**: /home/coolswood/projects/astro-content/backups/ui-en-canary-20260917/en.json
- **Целевой arb**: /home/coolswood/projects/cognitive_psy/lib/l10n/app_en.arb
- **Язык**: en
- **Режим**: APPLY (запись arb только по --apply)
- **Итог**: применить 7, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа в arb/снапшоте/ru-каноне; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона.

## Решения

| Ключ | Решение | Причина |
|---|---|---|
| `article_feedback_title` | ✅ apply | перенесён текст OLD (2:0) |
| `comparison_add` | ✅ apply | перенесён текст OLD (2:0) |
| `comparison_title` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBotAppUpdated0` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBotAppUpdated5` | ✅ apply | перенесён текст OLD (2:0) |
| `notification_every_day_5_body` | ✅ apply | перенесён текст OLD (2:0) |
| `subscription_info_cancel_title` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `article_feedback_title`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 98/85
- **Судья**: Translation B is more natural and concise for a UX context. Translation A is a literal translation of 'материал этой главы', which sounds slightly heavy and redundant in English.
- **Было (NEW)**: "How would you rate the material in this chapter?"
- **Стало (OLD, из снапшота)**: "How would you rate this chapter?"

### `comparison_add`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 100/70
- **Судья**: In English, a singular countable noun like 'argument' requires an article. Translation B follows the rule of using 'an' for a singular noun, whereas A sounds like a clipped, unnatural command or a technical programming term.
- **Было (NEW)**: "Add argument"
- **Стало (OLD, из снапшота)**: "Add an argument"

### `comparison_title`

- **Оценки судьи OLD/NEW (2 прохода)**: 100/85 · 98/85
- **Судья**: Translation A is the most natural, idiomatic, and concise way to express this concept in English, especially for a UI or heading. Translation B is grammatically correct but sounds slightly more formal and wordy.
- **Было (NEW)**: "Arguments for and against"
- **Стало (OLD, из снапшота)**: "Pros and cons"

### `homeBotAppUpdated0`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 95/82
- **Судья**: Translation A uses the idiomatic 'got an update' which sounds natural for a character/app context, whereas B's 'I've updated' sounds like the character performed the update on themselves (a literal translation of the Russian reflexive verb).
- **Было (NEW)**: "I’ve updated while you were away. Let’s see what the developers have added!"
- **Стало (OLD, из снапшота)**: "I got an update while you were away. Let’s take a look at what the developers have added!"

### `homeBotAppUpdated5`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/90
- **Судья**: Translation B sounds more natural and idiomatic for a product update. 'Keep making' better captures the continuous aspect of 'продолжают делать', and 'Check out' is a much more common and engaging UX phrase than the slightly plain 'See'.
- **Было (NEW)**: "The developers are making the app even better every day. See what’s new:"
- **Стало (OLD, из снапшота)**: "The developers keep making the app better every day. Check out what’s new:"

### `notification_every_day_5_body`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 95/82
- **Судья**: Translation A uses a much more natural, punchy, and engaging imperative ('Challenge...') which fits the 'expert friend' tone, whereas Translation B is a bit wordy and sounds like a literal translation of the Russian structure.
- **Было (NEW)**: "Check how realistic your automatic thoughts are!"
- **Стало (OLD, из снапшота)**: "Challenge your automatic thoughts for realism!"

### `subscription_info_cancel_title`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 100/85
- **Судья**: Translation B is a precise and natural translation of the original. Translation A is a common UX pattern, but it omits the object 'subscription', making it slightly less accurate to the source text.
- **Было (NEW)**: "Are you sure you want to cancel?"
- **Стало (OLD, из снапшота)**: "Do you want to cancel your subscription?"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативный пилот: любое вхождение = skip «нужен перегон»).

