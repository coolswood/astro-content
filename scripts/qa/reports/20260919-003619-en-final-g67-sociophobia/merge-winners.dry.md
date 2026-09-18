# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:54.656Z
- **Отчёт eval**: scripts/qa/reports/20260919-003619-en-final-g67-sociophobia/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/sociophobia.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 6, skip 0, no-op 12; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/sociophobia.json` | `/variants/15/0` | ⚪ no-op | значение уже идентично OLD |
| `tests/sociophobia.json` | `/variants/15/1` | ⚪ no-op | значение уже идентично OLD |
| `tests/sociophobia.json` | `/variants/15/2` | ⚪ no-op | значение уже идентично OLD |
| `tests/sociophobia.json` | `/variants/15/3` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/sociophobia.json` | `/steps_description/9/fact` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/sociophobia.json` | `/steps_description/4/fact` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/sociophobia.json` | `/variants/35/0` | ⚪ no-op | значение уже идентично OLD |
| `tests/sociophobia.json` | `/variants/35/1` | ⚪ no-op | значение уже идентично OLD |
| `tests/sociophobia.json` | `/variants/35/2` | ⚪ no-op | значение уже идентично OLD |
| `tests/sociophobia.json` | `/variants/35/3` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/sociophobia.json` | `/variants/38/0` | ⚪ no-op | значение уже идентично OLD |
| `tests/sociophobia.json` | `/variants/38/1` | ⚪ no-op | значение уже идентично OLD |
| `tests/sociophobia.json` | `/variants/38/2` | ⚪ no-op | значение уже идентично OLD |
| `tests/sociophobia.json` | `/variants/38/3` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/sociophobia.json` | `/variants/13/0` | ⚪ no-op | значение уже идентично OLD |
| `tests/sociophobia.json` | `/variants/13/1` | ⚪ no-op | значение уже идентично OLD |
| `tests/sociophobia.json` | `/variants/13/2` | ⚪ no-op | значение уже идентично OLD |
| `tests/sociophobia.json` | `/variants/13/3` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `tests/sociophobia.json` → `/variants/15/3`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 95/85
- **Судья**: In the context of frequency scales (like mood or symptom tracking), 'All the time' is much more natural and idiomatic for a user interface than 'Constantly', which can sound slightly clinical or overly intense.
- **Было (NEW)**: "Constantly"
- **Стало (OLD)**: "All the time"

### `tests/sociophobia.json` → `/steps_description/9/fact`

- **Оценки судьи OLD/NEW (2 прохода)**: 92/78 · 94/82
- **Судья**: Translation A uses 'social anxiety' and 'intense anxiety symptoms', which sounds much more natural and modern in a mental health context than the clinical/dated 'social phobia' and 'panic symptoms' in B. Additionally, 'the underground' is the correct term for a British singer/context, whereas 'subway' is US-centric.
- **Было (NEW)**: "Adele, the famous British singer, suffers from social phobia and panic attacks. She avoids crowded places, like the subway, to reduce the risk of experiencing panic symptoms."
- **Стало (OLD)**: "Adele, the well-known British singer, has spoken about her social anxiety and panic attacks. She avoids crowded places such as the underground to reduce the risk of intense anxiety symptoms."

### `tests/sociophobia.json` → `/steps_description/4/fact`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/82 · 92/78
- **Судья**: Translation B uses more natural, empathetic language ('live with' instead of 'suffer from') and follows modern clinical terminology ('social anxiety' instead of the outdated 'social phobia').
- **Было (NEW)**: "Research shows that about 15 million Americans (approximately 7% of the US population) suffer from social phobia, and a significant number of them prefer to avoid social situations outside of their required roles."
- **Стало (OLD)**: "Studies suggest that around 15 million Americans (about 7% of the population) live with social anxiety, and many of them prefer to stay away from social situations beyond their required roles."

### `tests/sociophobia.json` → `/variants/35/3`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 95/85
- **Судья**: In the context of frequency scales (like mood or symptom tracking), 'All the time' is much more natural and idiomatic for a native speaker than 'Constantly', which can sound slightly more clinical or intense.
- **Было (NEW)**: "Constantly"
- **Стало (OLD)**: "All the time"

### `tests/sociophobia.json` → `/variants/38/3`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 95/85
- **Судья**: In the context of mood tracking or frequency scales, 'All the time' sounds much more natural and conversational for a user interface than 'Constantly', which can feel slightly clinical or intense.
- **Было (NEW)**: "Constantly"
- **Стало (OLD)**: "All the time"

### `tests/sociophobia.json` → `/variants/13/3`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 95/85
- **Судья**: In the context of frequency scales (like mood or symptom tracking), 'All the time' is much more natural and idiomatic for a native speaker than 'Constantly', which can sound slightly clinical or overly intense.
- **Было (NEW)**: "Constantly"
- **Стало (OLD)**: "All the time"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

