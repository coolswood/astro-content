# Merge-back победителей OLD — APPLY

- **Дата**: 2026-09-17T19:05:35.752Z
- **Отчёт eval**: scripts/qa/reports/20260917-220535-en-ui-iter-seed13/report.json
- **Снапшот (источник OLD)**: /home/coolswood/projects/astro-content/backups/ui-en-canary-20260917/en.json
- **Целевой arb**: /home/coolswood/projects/cognitive_psy/lib/l10n/app_en.arb
- **Язык**: en
- **Режим**: APPLY (запись arb только по --apply)
- **Итог**: применить 7, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа в arb/снапшоте/ru-каноне; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона.

## Решения

| Ключ | Решение | Причина |
|---|---|---|
| `article_activity_title` | ✅ apply | перенесён текст OLD (2:0) |
| `believe_final_fail` | ✅ apply | перенесён текст OLD (2:0) |
| `das_item_impeccability` | ✅ apply | перенесён текст OLD (2:0) |
| `gentle` | ✅ apply | перенесён текст OLD (2:0) |
| `intro_new_name_category` | ✅ apply | перенесён текст OLD (2:0) |
| `share_no` | ✅ apply | перенесён текст OLD (2:0) |
| `smerAiChatHint` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `article_activity_title`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/85 · 95/78
- **Судья**: Translation B is much more natural and follows the UX guidelines for a 'supportive friend' tone. Translation A is a bit heavy and literal ('start working on it' sounds like a chore).
- **Было (NEW)**: "This technique is available in the Activities section. You can start working on it!"
- **Стало (OLD, из снапшота)**: "This technique is in the Activities section. Try it out!"

### `believe_final_fail`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 98/75
- **Судья**: Translation B follows the 'understanding friend-expert' tone guidelines by using a warm, supportive opening, whereas A is a bit too blunt and direct for a mental health app.
- **Было (NEW)**: "Unfortunately, you’re feeling worse"
- **Стало (OLD, из снапшота)**: "We're sorry to hear you're feeling worse"

### `das_item_impeccability`

- **Оценки судьи OLD/NEW (2 прохода)**: 100/40 · 100/30
- **Судья**: The original term 'Перфекционизм' refers to the psychological trait/concept of perfectionism. Translation A 'Impeccability' means the state of being faultless or flawless, which is a positive quality and a different concept entirely.
- **Было (NEW)**: "Impeccability"
- **Стало (OLD, из снапшота)**: "Perfectionism"

### `gentle`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/75 · 95/85
- **Судья**: In the context of emotions and mental well-being, 'Tenderness' is the standard and most natural way to express 'Нежность'. 'Gentleness' refers more to a person's manner or a soft touch, rather than the feeling itself.
- **Было (NEW)**: "Gentleness"
- **Стало (OLD, из снапшота)**: "Tenderness"

### `intro_new_name_category`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/75 · 95/80
- **Судья**: In the context of a mental health app or a user onboarding experience, 'Getting to know you' sounds much warmer and more personal, whereas 'Introduction' is overly formal and academic.
- **Было (NEW)**: "INTRODUCTION"
- **Стало (OLD, из снапшота)**: "GETTING TO KNOW YOU"

### `share_no`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/90 · 100/90
- **Судья**: Перевод B точнее передает пунктуацию оригинала. В интерфейсах важно сохранять эмоциональный окрас или акцент, заданный восклицательным знаком, если он есть в исходном тексте.
- **Было (NEW)**: "Your entry is no longer visible"
- **Стало (OLD, из снапшота)**: "Your entry is no longer visible!"

### `smerAiChatHint`

- **Оценки судьи OLD/NEW (2 прохода)**: 100/85 · 100/90
- **Судья**: Translation B correctly uses the typographic ellipsis (…), whereas Translation A uses three periods (...), which violates the typography rules specified in the instructions.
- **Было (NEW)**: "Your answer..."
- **Стало (OLD, из снапшота)**: "Your answer…"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативный пилот: любое вхождение = skip «нужен перегон»).

