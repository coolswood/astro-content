# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:23.000Z
- **Отчёт eval**: scripts/qa/reports/20260919-000421-en-final-g45-real_rebuff_self_help/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/depression/real_rebuff_self_help.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 3, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/depression/real_rebuff_self_help.json` | `/rebuff/title` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/real_rebuff_self_help.json` | `/self_help/title` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/real_rebuff_self_help.json` | `/self_help/description` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/depression/real_rebuff_self_help.json` → `/rebuff/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 98/85
- **Судья**: Translation B follows the UX standard of using the imperative mood for titles and actions, whereas Translation A uses a gerund which sounds more like a description of a process than a title of an exercise.
- **Было (NEW)**: "Technique: Standing up to your inner critic"
- **Стало (OLD)**: "Technique: Stand Up to Your Inner Critic"

### `story/depression/real_rebuff_self_help.json` → `/self_help/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 95/85
- **Судья**: Translation A is more idiomatic and poetic for a title, using 'Through the Dark Days' which captures the journey-like essence of the original. Translation B is a bit more clinical and literal.
- **Было (NEW)**: "Overcoming Dark Days: Self-Help as a Way to Manage Depression"
- **Стало (OLD)**: "Through the Dark Days: Self-Help as a Path out of Depression"

### `story/depression/real_rebuff_self_help.json` → `/self_help/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/82
- **Судья**: Translation B is much more idiomatic and professional, avoiding the heavy, slightly poetic 'translationese' of A. It uses strong, concise verbs like 'equip' and 'grounded hope' which fit the 'expert friend' tone much better than the literal phrasing in A.
- **Было (NEW)**: "This article explores the profound aspects of depression, revealing it as a multifaceted mental health disorder that can cloud the soul and the mind. It offers a deep look into various treatment methods, including cognitive behavioral therapy (CBT) and bibliotherapy, supported by research findings. The article aims to provide readers with information and self-help tools, offering hope for recovery even in the most difficult cases of depression."
- **Стало (OLD)**: "This article explores the many facets of depression and offers a clear look at evidence-based treatments—including cognitive behavioral therapy (CBT) and bibliotherapy—supported by research findings. It aims to equip readers with practical self-help tools and grounded hope for recovery, even in severe cases."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

