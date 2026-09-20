# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:22.696Z
- **Отчёт eval**: scripts/qa/reports/20260918-235330-en-final-g45-disability_disease_distortions/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/depression/disability_disease_distortions.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 2, skip 0, no-op 3; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/depression/disability_disease_distortions.json` | `/disability/test/answers/0` | ⚪ no-op | значение уже идентично OLD |
| `story/depression/disability_disease_distortions.json` | `/disability/test/answers/1` | ⚪ no-op | значение уже идентично OLD |
| `story/depression/disability_disease_distortions.json` | `/disability/test/answers/2` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/disability_disease_distortions.json` | `/disability/test/answers/3` | ⚪ no-op | значение уже идентично OLD |
| `story/depression/disability_disease_distortions.json` | `/distortions/description` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/depression/disability_disease_distortions.json` → `/disability/test/answers/2`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/65 · 95/80
- **Судья**: Translation A correctly uses the established CBT terminology for cognitive distortions. Translation B fails significantly on the third item, replacing a specific cognitive distortion with a generic noun.
- **Было (NEW)**: "Possibility"
- **Стало (OLD)**: "“Could have” thinking"

### `story/depression/disability_disease_distortions.json` → `/distortions/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 96/86
- **Судья**: Translation B sounds much more natural and idiomatic for an English-speaking reader, using better verbs like 'spot and shift' instead of the more clinical 'recognize and change'. It also avoids the repetitive use of 'mental well-being' found in A.
- **Было (NEW)**: "In this article, we explore how cognitive distortions contribute to the development and maintenance of depression, and why understanding these mechanisms is so vital. We offer practical ways to recognize and change negative thinking patterns to help improve your mental well-being. By diving deeper into the topic of cognitive distortions, you are taking an important step toward recovery and strengthening your mental well-being."
- **Стало (OLD)**: "This article explains how cognitive distortions contribute to the onset and maintenance of depression—and why understanding these mechanisms matters. We offer practical ways to spot and shift negative thinking patterns that can improve how you feel. By looking more closely at cognitive distortions, you take an important step toward healing and strengthening your mental health."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

