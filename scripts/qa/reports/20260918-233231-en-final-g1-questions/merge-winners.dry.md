# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:51.374Z
- **Отчёт eval**: scripts/qa/reports/20260918-233231-en-final-g1-questions/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — questions.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 8, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `questions.json` | `/85/translation` | ✅ apply | перенесён текст OLD (2:0) |
| `questions.json` | `/118/translation` | ✅ apply | перенесён текст OLD (2:0) |
| `questions.json` | `/77/translation` | ✅ apply | перенесён текст OLD (2:0) |
| `questions.json` | `/144/translation` | ✅ apply | перенесён текст OLD (2:0) |
| `questions.json` | `/9/translation` | ✅ apply | перенесён текст OLD (2:0) |
| `questions.json` | `/140/translation` | ✅ apply | перенесён текст OLD (2:0) |
| `questions.json` | `/153/translation` | ✅ apply | перенесён текст OLD (2:0) |
| `questions.json` | `/107/translation` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `questions.json` → `/85/translation`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 98/85
- **Судья**: Translation B is more natural and idiomatic for a supportive mental health app. Translation A uses 'actions do you take,' which sounds slightly formal and heavy (closer to the Russian structure), whereas 'What do you do' is the standard, conversational way a native speaker would ask this.
- **Было (NEW)**: "What actions do you take to maintain your mental well-being?"
- **Стало (OLD)**: "What do you do to support your mental health?"

### `questions.json` → `/118/translation`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/90 · 95/90
- **Судья**: Translation A sounds more natural and idiomatic for a conversational prompt. The addition of 'personal' before 'motto' creates a better rhythmic balance and fits the 'understanding friend' tone better than the slightly clipped version B.
- **Было (NEW)**: "What is your main life rule or motto?"
- **Стало (OLD)**: "What’s your main life rule or personal motto?"

### `questions.json` → `/77/translation`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/75 · 95/85
- **Судья**: Translation A is much more natural and idiomatic for a mental health context. Translation B uses 'interpersonal relationships', which is a heavy, academic term that sounds like a textbook rather than a supportive app.
- **Было (NEW)**: "Which principles are important for maintaining interpersonal relationships?"
- **Стало (OLD)**: "What principles matter for maintaining healthy relationships?"

### `questions.json` → `/144/translation`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/85 · 98/82
- **Судья**: Translation B is much more idiomatic and natural for a conversational or reflective context. 'Repel' in Translation A sounds overly clinical or physical, whereas 'put you off' captures the nuance of psychological aversion perfectly.
- **Было (NEW)**: "Which aspects of modern culture attract or repel you?"
- **Стало (OLD)**: "Which aspects of modern culture attract you—or put you off?"

### `questions.json` → `/9/translation`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation B uses 'make you', which sounds more natural and conversational for a supportive app, whereas 'cause you' in A sounds slightly more clinical or formal.
- **Было (NEW)**: "What events cause you to rethink your life priorities?"
- **Стало (OLD)**: "What events make you rethink your life priorities?"

### `questions.json` → `/140/translation`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 98/85
- **Судья**: Translation A uses the idiomatic 'play a role', which sounds much more natural and fluid to a native speaker than the slightly heavy and formal 'have significance' in Translation B.
- **Было (NEW)**: "What significance do friends have in your life?"
- **Стало (OLD)**: "What role do friends play in your life?"

### `questions.json` → `/153/translation`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 98/92
- **Судья**: Translation B uses 'pivotal', which is a more sophisticated and natural collocation for 'key moments' in a reflective context, whereas 'key' in A is slightly more generic.
- **Было (NEW)**: "Which moments in history do you believe were key for humanity?"
- **Стало (OLD)**: "Which moments in history do you think were pivotal for humanity?"

### `questions.json` → `/107/translation`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/88 · 96/88
- **Судья**: Translation A is more concise and natural for a user interface or a reflective question. Translation B is grammatically correct but feels slightly wordy and heavy due to the 'from your past' and 'to be' constructions.
- **Было (NEW)**: "Which mistakes from your past do you consider to be the most instructive?"
- **Стало (OLD)**: "Which past mistakes do you consider the most instructive?"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

