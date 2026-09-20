# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:23.507Z
- **Отчёт eval**: scripts/qa/reports/20260919-001849-en-final-g67-constants/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/constants.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 2, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/constants.json` | `/sdvg` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/constants.json` | `/okr` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `tests/constants.json` → `/sdvg`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/75 · 100/75
- **Судья**: The original text is the full name of the disorder, not its abbreviation. Translation B follows the rule of introducing the full term before the acronym, which is standard for educational/psychological content.
- **Было (NEW)**: "ADHD"
- **Стало (OLD)**: "Attention deficit hyperactivity disorder (ADHD)"

### `tests/constants.json` → `/okr`

- **Оценки судьи OLD/NEW (2 прохода)**: 100/70 · 100/70
- **Судья**: According to the project guidelines, terms must be introduced with their full name followed by the abbreviation in parentheses upon first mention. Translation A is an abbreviation only, which violates the rule for first mentions.
- **Было (NEW)**: "OCD"
- **Стало (OLD)**: "Obsessive-compulsive disorder (OCD)"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

