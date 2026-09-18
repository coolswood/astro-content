# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:22.173Z
- **Отчёт eval**: scripts/qa/reports/20260918-234319-en-final-g23-history/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/history.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 1, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/history.json` | `/test/question` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/history.json` → `/test/question`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/90 · 98/85
- **Судья**: Translation A is more concise and idiomatic for a heading or a question. In English, 'CBT' already implies the approach, making 'the CBT approach' in B feel slightly redundant and wordy.
- **Было (NEW)**: "How does the CBT approach differ from psychoanalysis?"
- **Стало (OLD)**: "How does CBT differ from psychoanalysis?"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

