# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:52.335Z
- **Отчёт eval**: scripts/qa/reports/20260918-234411-en-final-g23-intermediate/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/intermediate.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 1, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/intermediate.json` | `/title` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/intermediate.json` → `/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/75 · 96/82
- **Судья**: Translation A uses 'the mind', which is the natural, idiomatic way to refer to mental processes in English. Translation B uses 'consciousness', which is a heavy, academic term that sounds like a literal translation of 'сознание' and is less appropriate for a mental well-being context.
- **Было (NEW)**: "Hidden filters of consciousness: how intermediate beliefs shape our world"
- **Стало (OLD)**: "Hidden Filters of the Mind: How Intermediate Beliefs Shape Our World"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

