# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:51.851Z
- **Отчёт eval**: scripts/qa/reports/20260918-233920-en-final-g23-quotes/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — homeBot/quotes.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 6, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `homeBot/quotes.json` | `/35/text` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBot/quotes.json` | `/33/text` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBot/quotes.json` | `/47/text` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBot/quotes.json` | `/50/text` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBot/quotes.json` | `/22/text` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBot/quotes.json` | `/10/text` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `homeBot/quotes.json` → `/35/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/92 · 98/92
- **Судья**: Translation B captures the subtle nuance of 'самое здоровое, что ты можешь сделать' by adding 'simply', which makes the sentence sound more natural, empathetic, and idiomatic in English for this context.
- **Было (NEW)**: "Sometimes the healthiest thing you can do is allow yourself to feel."
- **Стало (OLD)**: "Sometimes the healthiest thing you can do is simply allow yourself to feel."

### `homeBot/quotes.json` → `/33/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/85 · 98/82
- **Судья**: Translation B sounds much more natural and empathetic to a native speaker. Translation A uses 'your state', which sounds like a medical or clinical condition (a common Russian-to-English calque), whereas 'how you're really doing' captures the emotional essence of the original in a warm, supportive way.
- **Было (NEW)**: "Don’t be afraid to show your vulnerability. Being honest about your state can bring you the support you need."
- **Стало (OLD)**: "Don’t be afraid to show your vulnerability. Being honest about how you’re really doing can bring you the support you need."

### `homeBot/quotes.json` → `/47/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation B is more idiomatic and emotionally resonant for a mental health context. The addition of 'it feels like' captures the subjective experience of the original better than the literal 'the whole world fell apart' in A.
- **Было (NEW)**: "True courage is knowing that you will wake up tomorrow, even when the whole world fell apart today."
- **Стало (OLD)**: "True courage is knowing you will wake up tomorrow even when it feels like your whole world collapsed today."

### `homeBot/quotes.json` → `/50/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 98/88
- **Судья**: Translation A uses the more natural, dynamic gerund 'losing', which fits the 'warm, expert friend' tone better than the heavier, more formal noun 'loss of' used in B.
- **Было (NEW)**: "Success is the ability to go from one failure to another without loss of enthusiasm."
- **Стало (OLD)**: "Success is the ability to go from one failure to another without losing enthusiasm."

### `homeBot/quotes.json` → `/22/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 100/90 · 100/95
- **Судья**: Translation B follows the project's Tone of Voice guidelines by using contractions ('you’re'), making the text sound more like a 'supportive friend' and less formal/stiff than Translation A.
- **Было (NEW)**: "What you are feeling right now will not define you forever."
- **Стало (OLD)**: "What you’re feeling right now will not define you forever."

### `homeBot/quotes.json` → `/10/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 98/92
- **Судья**: Translation B follows the project's tone of voice guidelines by using the contraction 'It’s', making the text sound more like a 'supportive friend' and less formal/stiff than Translation A.
- **Было (NEW)**: "Remind yourself that this is not a sign of weakness. It is an illness that requires treatment, just like any other."
- **Стало (OLD)**: "Remind yourself that this is not a sign of weakness. It’s an illness that needs treatment, just like any other."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

