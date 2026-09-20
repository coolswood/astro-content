# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:51.204Z
- **Отчёт eval**: scripts/qa/reports/20260918-232809-en-final-g1-common/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — common.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 1, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `common.json` | `/emails.call-back.unsubscribe.1` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `common.json` → `/emails.call-back.unsubscribe.1`

- **Оценки судьи OLD/NEW (2 прохода)**: 100/75 · 95/80
- **Судья**: Translation A is a perfect, natural match for the original. Translation B adds unnecessary words ('these', 'to') that create a grammatical error and a clunky flow.
- **Было (NEW)**: "If you no longer wish to receive these emails, click to"
- **Стало (OLD)**: "If you no longer want to receive emails, click"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

