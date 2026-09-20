# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:54.491Z
- **Отчёт eval**: scripts/qa/reports/20260919-003124-en-final-g67-irritation/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/irritation.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 4, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/irritation.json` | `/steps_description/14/fact` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/irritation.json` | `/steps_description/7/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/irritation.json` | `/steps_description/18/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/irritation.json` | `/steps_description/17/text` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `tests/irritation.json` → `/steps_description/14/fact`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/90 · 95/90
- **Судья**: Translation B is more idiomatic and captures the implied meaning of the original more effectively. The addition of 'the same' in B makes the comparison logically complete in English, and 'cafés' with the accent is a nice stylistic touch for a narrative text.
- **Было (NEW)**: "Albert Einstein often worked in noisy cafes, claiming that background noise helped him focus. This shows how differently people react to external stimuli."
- **Стало (OLD)**: "Albert Einstein often worked in noisy cafés, saying that background noise helped him concentrate. This shows how differently people can react to the same external stimuli."

### `tests/irritation.json` → `/steps_description/7/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 96/88
- **Судья**: Translation A sounds more natural and empathetic for a mental health context by using 'personal space' and 'belongings' instead of the more clinical/legalistic 'property and space'.
- **Было (NEW)**: "Psychologists note that our reaction to these situations is often linked to “territorial behavior” — an instinctive desire to protect our property and space."
- **Стало (OLD)**: "Psychologists note that our reaction to situations like this is often linked to “territorial behaviour” — an instinctive desire to protect our belongings and personal space."

### `tests/irritation.json` → `/steps_description/18/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/82 · 95/86
- **Судья**: Translation A sounds much more natural and empathetic, using 'disagreement' instead of the more aggressive 'argument' and providing a smoother flow with 'the way you see them'.
- **Было (NEW)**: "Practicing empathy can help reduce irritation during an argument. Understanding that a person might not realize their own incompetence or may have limited knowledge on a topic can change your attitude and reaction."
- **Стало (OLD)**: "The ability to show empathy can help reduce irritation during a disagreement. Realising that the other person may not be aware of their lack of competence or may simply have limited knowledge can change the way you see them and how you react."

### `tests/irritation.json` → `/steps_description/17/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 92/84 · 95/88
- **Судья**: Translation A sounds much more natural and idiomatic for a mental health/educational context. 'Feel especially irritating' and 'experienced as' flow better than the slightly clunky 'cause more irritation' and 'perceived as' used in B.
- **Было (NEW)**: "The context of a conversation plays a major role in how jokes are perceived. If the topic is serious and emotionally significant, jokes can cause more irritation because they are perceived as a lack of respect for the issue."
- **Стало (OLD)**: "The context of a conversation plays a major role in how jokes are perceived. If the topic is serious and emotionally important, jokes can feel especially irritating because they are experienced as a lack of respect for the issue."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

