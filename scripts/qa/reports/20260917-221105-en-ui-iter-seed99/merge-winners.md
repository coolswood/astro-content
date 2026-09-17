# Merge-back победителей OLD — APPLY

- **Дата**: 2026-09-17T19:11:05.288Z
- **Отчёт eval**: scripts/qa/reports/20260917-221105-en-ui-iter-seed99/report.json
- **Снапшот (источник OLD)**: /home/coolswood/projects/astro-content/backups/ui-en-canary-20260917/en.json
- **Целевой arb**: /home/coolswood/projects/cognitive_psy/lib/l10n/app_en.arb
- **Язык**: en
- **Режим**: APPLY (запись arb только по --apply)
- **Итог**: применить 5, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа в arb/снапшоте/ru-каноне; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона.

## Решения

| Ключ | Решение | Причина |
|---|---|---|
| `alert_delete_psy_subtitle` | ✅ apply | перенесён текст OLD (2:0) |
| `comparison_against` | ✅ apply | перенесён текст OLD (2:0) |
| `diary_subtitle` | ✅ apply | перенесён текст OLD (2:0) |
| `gpt_recommendation_intermediate_title` | ✅ apply | перенесён текст OLD (2:0) |
| `tests_left_days` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `alert_delete_psy_subtitle`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 96/88
- **Судья**: In the context of data privacy and visibility, 'visible to' is more natural and precise for a user interface than 'available to', which can imply accessibility or availability of a service.
- **Было (NEW)**: "Your entries will no longer be available to your psychologist"
- **Стало (OLD, из снапшота)**: "Your entries will no longer be visible to your psychologist"

### `comparison_against`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/75 · 95/75
- **Судья**: In the context of pros and cons (arguments for and against), 'Con' is the standard, idiomatic way to label the negative side. 'Against' sounds like a preposition or a direction rather than a noun label.
- **Было (NEW)**: "Against"
- **Стало (OLD, из снапшота)**: "Con"

### `diary_subtitle`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/75 · 95/75
- **Судья**: Translation A uses an idiomatic, engaging expression ('Deep dive') that fits the 'understanding friend' tone, whereas Translation B sounds like a dry, academic report.
- **Было (NEW)**: "Deep situation analysis"
- **Стало (OLD, из снапшота)**: "Deep dive into your situation"

### `gpt_recommendation_intermediate_title`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 95/80
- **Судья**: Translation A follows a natural English noun phrase structure for a title/header. Translation B is a heavy noun pile (noun adjunct stack) which, while grammatically possible, sounds more like a technical database label than a user-friendly app header.
- **Было (NEW)**: "AI intermediate belief analysis"
- **Стало (OLD, из снапшота)**: "AI analysis of intermediate beliefs"

### `tests_left_days`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/75 · 95/75
- **Судья**: Translation B is much more natural for a UX context (using 'Retake' for a test/result), whereas Translation A sounds like a literal translation of 'обновите' and uses 'within', which changes the meaning from 'in X days' to 'at some point during the next X days'.
- **Было (NEW)**: "Update your results within {days} days"
- **Стало (OLD, из снапшота)**: "Retake in {days} days"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативный пилот: любое вхождение = skip «нужен перегон»).

