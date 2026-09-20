# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:22.066Z
- **Отчёт eval**: scripts/qa/reports/20260918-234124-en-final-g23-depths/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/depths.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 4, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/depths.json` | `/test/answers/0` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depths.json` | `/test/answers/1` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depths.json` | `/test/answers/2` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depths.json` | `/test/answers/3` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/depths.json` → `/test/answers/0`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 95/88
- **Судья**: Translation A sounds more natural and idiomatic for internal monologue/core beliefs by using contractions. Translation B is slightly too formal and heavy for these types of thoughts.
- **Было (NEW)**: "“I am weak and unable to cope with difficulties,” “The world is too complex for me”"
- **Стало (OLD)**: "“I’m weak and can’t handle difficulties,” “The world is too complex for me”"

### `story/depths.json` → `/test/answers/1`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 95/88
- **Судья**: Translation A sounds more natural and idiomatic for internal monologue/core beliefs by using contractions. Translation B is slightly too formal and heavy for these types of thoughts.
- **Было (NEW)**: "“No one needs me,” “I am worthless,” “I am unworthy of love”"
- **Стало (OLD)**: "“No one needs me,” “I’m worthless,” “I don’t deserve love”"

### `story/depths.json` → `/test/answers/2`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 95/88
- **Судья**: Translation A sounds more natural and idiomatic for internal monologue/core beliefs by using contractions. Translation B is slightly too formal and heavy for these types of thoughts.
- **Было (NEW)**: "“People judge me,” “People are mean and will reject me”"
- **Стало (OLD)**: "“People judge me,” “People are cruel and will reject me”"

### `story/depths.json` → `/test/answers/3`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 95/88
- **Судья**: Translation A sounds more natural and idiomatic for internal monologue/core beliefs by using contractions. Translation B is slightly too formal and heavy for these types of thoughts.
- **Было (NEW)**: "“I am sinful,” “Others are better than me,” “The world is punishing me”"
- **Стало (OLD)**: "“I am sinful,” “Others are better than me,” “The world punishes me”"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

