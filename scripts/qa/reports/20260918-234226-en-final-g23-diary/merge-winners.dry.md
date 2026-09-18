# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:52.177Z
- **Отчёт eval**: scripts/qa/reports/20260918-234226-en-final-g23-diary/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/diary.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 1, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/diary.json` | `/test/question` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/diary.json` → `/test/question`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 98/85
- **Судья**: Translation B is more concise and idiomatic for a UX/UI context, avoiding the wordy 'most accurately describes an entry in the... section'.
- **Было (NEW)**: "Which of the following examples most accurately describes an entry in the “Situation” section?"
- **Стало (OLD)**: "Which of the following best illustrates a “Situation” entry?"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

