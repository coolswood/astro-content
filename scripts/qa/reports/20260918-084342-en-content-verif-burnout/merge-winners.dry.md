# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T06:02:40.902Z
- **Отчёт eval**: scripts/qa/reports/20260918-084342-en-content-verif-burnout/report.json
- **Базлайн OLD**: git HEAD (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/burnout.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 2, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/burnout.json` | `/steps_description/17/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/burnout.json` | `/result/middle/title` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `tests/burnout.json` → `/steps_description/17/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/92 · 96/88
- **Судья**: Translation A uses the more natural and idiomatic 'a sense of' to describe an abstract feeling, whereas 'feelings of' in B sounds slightly more clinical or heavy. Translation A also correctly uses curly quotes which align with the provided typography rules.
- **Было (NEW)**: "The concept of \"flow,\" described by psychologist Mihaly Csikszentmihalyi, explains a state of complete immersion in an activity, accompanied by feelings of energy and enjoyment."
- **Стало (OLD)**: "The concept of “flow”, described by psychologist Mihaly Csikszentmihalyi, explains a state of complete immersion in an activity, accompanied by a sense of energy and enjoyment."

### `tests/burnout.json` → `/result/middle/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/92 · 95/85
- **Судья**: Both are grammatically correct, but 'Reduced productivity' is more idiomatic and natural for a heading or a symptom description in a mental health context.
- **Было (NEW)**: "Decreased productivity"
- **Стало (OLD)**: "Reduced productivity"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

