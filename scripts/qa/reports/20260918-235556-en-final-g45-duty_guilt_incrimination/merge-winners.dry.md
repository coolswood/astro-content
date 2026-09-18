# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:53.056Z
- **Отчёт eval**: scripts/qa/reports/20260918-235556-en-final-g45-duty_guilt_incrimination/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/depression/duty_guilt_incrimination.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 1, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/depression/duty_guilt_incrimination.json` | `/incrimination/title` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/depression/duty_guilt_incrimination.json` → `/incrimination/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 98/92
- **Судья**: The original text is a title. Translation B correctly uses Title Case, which is the standard for article headings in English, whereas Translation A uses sentence case, which is less appropriate for a formal title.
- **Было (NEW)**: "Self-esteem in the Depths of Depression: A Path to Self-Acceptance and Inner Balance"
- **Стало (OLD)**: "Self-Esteem in the Depths of Depression: A Path to Self-Acceptance and Inner Balance"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

