# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T10:49:50.714Z
- **Отчёт eval**: scripts/qa/reports/20260918-134257-en-b3-okr/report.json
- **Базлайн OLD**: git HEAD (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/okr.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 7, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/okr.json` | `/variants/2/0` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/okr.json` | `/variants/2/1` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/okr.json` | `/variants/2/2` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/okr.json` | `/variants/2/3` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/okr.json` | `/variants/2/4` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/okr.json` | `/steps_description/3/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/okr.json` | `/steps_description/9/text` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `tests/okr.json` → `/variants/2/0`

- **Оценки судьи OLD/NEW (2 прохода)**: 92/75 · 92/78
- **Судья**: Translation A is much more natural and follows the UX pattern of using personal pronouns or direct adjectives. Translation B suffers from awkward phrasing ('Not bothersome at all') and inconsistent subject usage.
- **Было (NEW)**: "Not bothersome at all"
- **Стало (OLD)**: "They don’t bother me at all"

### `tests/okr.json` → `/variants/2/1`

- **Оценки судьи OLD/NEW (2 прохода)**: 92/75 · 92/78
- **Судья**: Translation A is much more natural and follows the UX pattern of using personal pronouns or direct adjectives. Translation B suffers from awkward phrasing ('Not bothersome at all') and inconsistent subject usage.
- **Было (NEW)**: "A little unpleasant"
- **Стало (OLD)**: "Slightly uncomfortable"

### `tests/okr.json` → `/variants/2/2`

- **Оценки судьи OLD/NEW (2 прохода)**: 92/75 · 92/78
- **Судья**: Translation A is much more natural and follows the UX pattern of using personal pronouns or direct adjectives. Translation B suffers from awkward phrasing ('Not bothersome at all') and inconsistent subject usage.
- **Было (NEW)**: "Quite strong, but tolerable"
- **Стало (OLD)**: "Quite a lot, but still bearable"

### `tests/okr.json` → `/variants/2/3`

- **Оценки судьи OLD/NEW (2 прохода)**: 92/75 · 92/78
- **Судья**: Translation A is much more natural and follows the UX pattern of using personal pronouns or direct adjectives. Translation B suffers from awkward phrasing ('Not bothersome at all') and inconsistent subject usage.
- **Было (NEW)**: "They are very strong, and they affect my mood"
- **Стало (OLD)**: "Very much, it affects my mood"

### `tests/okr.json` → `/variants/2/4`

- **Оценки судьи OLD/NEW (2 прохода)**: 92/75 · 92/78
- **Судья**: Translation A is much more natural and follows the UX pattern of using personal pronouns or direct adjectives. Translation B suffers from awkward phrasing ('Not bothersome at all') and inconsistent subject usage.
- **Было (NEW)**: "I constantly feel intense discomfort"
- **Стало (OLD)**: "I constantly feel strong discomfort"

### `tests/okr.json` → `/steps_description/3/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/90
- **Судья**: Translation B uses more natural, idiomatic collocations for a mental health context ('cope with' instead of 'manage' and 'ongoing difficulty' instead of 'constant difficulty').
- **Было (NEW)**: "The intensity and frequency of intrusive thoughts can vary significantly from person to person. Some may manage them most of the time, while others experience constant difficulty."
- **Стало (OLD)**: "The intensity and frequency of intrusive thoughts can vary greatly from person to person. Some are able to cope with them most of the time, while others experience ongoing difficulty."

### `tests/okr.json` → `/steps_description/9/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/85
- **Судья**: Translation B sounds much more natural and idiomatic for a native speaker. 'Report' is a better fit than 'note' for statistical data, and 'most of the time' is a more fluid way to express frequency than the slightly clunky 'in most cases'.
- **Было (NEW)**: "Approximately 30–35% of people note that they can control their rituals in most cases."
- **Стало (OLD)**: "Roughly 30–35% of people report that they can control their rituals most of the time."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

