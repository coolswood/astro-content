# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T10:50:56.235Z
- **Отчёт eval**: scripts/qa/reports/20260918-134037-en-b3-way/report.json
- **Базлайн OLD**: git HEAD (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/distortions/way.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 1, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/distortions/way.json` | `/title` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/distortions/way.json` → `/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 100/90 · 95/85
- **Судья**: The original is a title. In English, titles follow Title Case conventions, making A the correct choice for a heading. B uses sentence case, which is less standard for a standalone title of this nature.
- **Было (NEW)**: "The path to healthy self-esteem"
- **Стало (OLD)**: "The Path to Healthy Self-Esteem"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

