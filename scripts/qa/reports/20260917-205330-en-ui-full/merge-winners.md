# Merge-back победителей OLD — APPLY

- **Дата**: 2026-09-17T18:41:43.720Z
- **Отчёт eval**: scripts/qa/reports/20260917-205330-en-ui-full/report.json
- **Снапшот (источник OLD)**: /home/coolswood/projects/astro-content/backups/ui-en-canary-20260917/en.json
- **Целевой arb**: /home/coolswood/projects/cognitive_psy/lib/l10n/app_en.arb
- **Язык**: en
- **Режим**: APPLY (запись arb только по --apply)
- **Итог**: применить 9, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа в arb/снапшоте/ru-каноне; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона.

## Решения

| Ключ | Решение | Причина |
|---|---|---|
| `auth_email_title` | ✅ apply | перенесён текст OLD (2:0) |
| `comparison_add_argument_against` | ✅ apply | перенесён текст OLD (2:0) |
| `intro_new_gender_subtitle` | ✅ apply | перенесён текст OLD (2:0) |
| `intro_psy_button` | ✅ apply | перенесён текст OLD (2:0) |
| `lv` | ✅ apply | перенесён текст OLD (2:0) |
| `partner_test_title` | ✅ apply | перенесён текст OLD (2:0) |
| `points` | ✅ apply | перенесён текст OLD (2:0) |
| `sharepsy_title` | ✅ apply | перенесён текст OLD (2:0) |
| `sleep_stability_stable` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `auth_email_title`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/90 · 100/95
- **Судья**: In modern UX writing, 'email' is the standard, concise way to refer to an email address. 'Email address' (A) is grammatically correct but feels slightly more formal and wordy for a digital interface.
- **Было (NEW)**: "Enter your email address"
- **Стало (OLD, из снапшота)**: "Enter your email"

### `comparison_add_argument_against`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 100/75
- **Судья**: Translation B correctly uses the indefinite article 'an' before the singular countable noun 'argument', making it grammatically natural for a UI action. Translation A sounds slightly clipped and non-native due to the missing article.
- **Было (NEW)**: "Add argument\nagainst the thought"
- **Стало (OLD, из снапшота)**: "Add an argument\nagainst the thought"

### `intro_new_gender_subtitle`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/82 · 94/78
- **Судья**: Translation B sounds much more natural and empathetic, using 'tailor' and 'what you’re going through' instead of the clunky and literal 'context of problems'.
- **Было (NEW)**: "Stress responses and the context of problems often differ. This helps us choose the most accurate psychological practices and materials for you"
- **Стало (OLD, из снапшота)**: "Stress responses and the context behind what you’re going through can vary. This helps us tailor psychological exercises and content more closely to you"

### `intro_psy_button`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 95/75
- **Судья**: In a professional software context, 'dashboard' is the standard term for a user's personal area where they manage data and view statistics, whereas 'account' sounds more like billing or profile settings.
- **Было (NEW)**: "Psychologist account"
- **Стало (OLD, из снапшота)**: "Psychologist dashboard"

### `lv`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 95/85
- **Судья**: Both are acceptable abbreviations for 'Level', but 'Lv.' is the more standard and widely recognized abbreviation in English UI/UX design.
- **Было (NEW)**: "Lvl {level}"
- **Стало (OLD, из снапшота)**: "Lv. {level}"

### `partner_test_title`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/75 · 100/75
- **Судья**: Translation B is a natural noun phrase used for services or titles, whereas Translation A sounds like a status report about a specific person's current connectivity.
- **Было (NEW)**: "Your psychologist is online"
- **Стало (OLD, из снапшота)**: "Your online psychologist"

### `points`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 100/90
- **Судья**: The original text includes a period (full stop), which is preserved in translation B. Translation A omits it, which is an error in terms of fidelity to the source punctuation.
- **Было (NEW)**: "pts"
- **Стало (OLD, из снапшота)**: "pts."

### `sharepsy_title`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 98/90
- **Судья**: In a mental health app context, 'your psychologist' is more natural and personal, following the 'understanding friend' tone. Translation A is grammatically correct but sounds slightly more detached/generic.
- **Было (NEW)**: "Share with a psychologist"
- **Стало (OLD, из снапшота)**: "Share with your psychologist"

### `sleep_stability_stable`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 98/85
- **Судья**: Translation A accurately reflects the original 'качество сна' (sleep quality), whereas B omits 'quality', making it slightly less precise, though still natural.
- **Было (NEW)**: "Your sleep was stable this week."
- **Стало (OLD, из снапшота)**: "Your sleep quality was stable this week."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативный пилот: любое вхождение = skip «нужен перегон»).

