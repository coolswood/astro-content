# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:52.487Z
- **Отчёт eval**: scripts/qa/reports/20260918-234534-en-final-g23-proof/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/proof.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 1, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/proof.json` | `/description` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/proof.json` → `/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation B sounds more natural for an English-language article by using 'This article looks at' instead of the slightly more formal/academic 'In this article, we discuss'. B also flows better by avoiding the repetitive 'We' structure.
- **Было (NEW)**: "In this article, we discuss the scientific evidence supporting the effectiveness of cognitive behavioral therapy (CBT) in treating depression, anxiety disorders, PTSD, and panic attacks. We also emphasize the importance of working with professionals and explore situations where CBT alone may not be enough."
- **Стало (OLD)**: "This article looks at the scientific evidence for the effectiveness of cognitive-behavioral therapy (CBT) in treating depression, anxiety disorders, PTSD, and panic attacks. It also emphasizes the importance of working with professionals and explains when CBT alone may not be enough."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

