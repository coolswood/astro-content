# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T06:03:11.102Z
- **Отчёт eval**: scripts/qa/reports/20260918-084908-en-content-verif-homebot/report.json
- **Базлайн OLD**: git HEAD (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — homeBot/content.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 6, skip 3, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `homeBot/content.json` | `/testExpired/0` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBot/content.json` | `/testExpired/1` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBot/content.json` | `/testExpired/2` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBot/content.json` | `/testExpired/3` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBot/content.json` | `/testExpired/4` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBot/content.json` | `/testExpired/5` | ✅ apply | перенесён текст OLD (2:0) |
| `homeBot/content.json` | `/neverUsed/0` | ⏭ skip | валидация не пройдена — neverUsed/0: плейсхолдеры — потеряны: {dairy}; лишние: {diary} |
| `homeBot/content.json` | `/neverUsed/1` | ⏭ skip | валидация не пройдена — neverUsed/1: плейсхолдеры — потеряны: {dairy}; лишние: {diary} |
| `homeBot/content.json` | `/neverUsed/2` | ⏭ skip | валидация не пройдена — neverUsed/2: плейсхолдеры — потеряны: {dairy}; лишние: {diary} |

## Переносы (было → стало)

### `homeBot/content.json` → `/testExpired/0`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 94/88
- **Судья**: Translation A sounds much more natural and follows the 'understanding friend' tone. Translation B uses several unnatural or 'translated' constructions like 'reflects your state' and 'results have expired'.
- **Было (NEW)**: "Your <b>{test_name}</b> results are out of date. Let’s update them to see how you’re doing now!"
- **Стало (OLD)**: "Your <b>{test_name}</b> results are out of date. Let’s update them and see how you’re doing now!"

### `homeBot/content.json` → `/testExpired/1`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 94/88
- **Судья**: Translation A sounds much more natural and follows the 'understanding friend' tone. Translation B uses several unnatural or 'translated' constructions like 'reflects your state' and 'results have expired'.
- **Было (NEW)**: "Your <b>{test_name}</b> results are no longer current. I suggest updating them so we can better understand your progress."
- **Стало (OLD)**: "Your <b>{test_name}</b> results are no longer current. I suggest updating them so we can better track your progress."

### `homeBot/content.json` → `/testExpired/2`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 94/88
- **Судья**: Translation A sounds much more natural and follows the 'understanding friend' tone. Translation B uses several unnatural or 'translated' constructions like 'reflects your state' and 'results have expired'.
- **Было (NEW)**: "It looks like your <b>{test_name}</b> results have expired. Let’s see how you’re feeling today!"
- **Стало (OLD)**: "It looks like your <b>{test_name}</b> results are a bit outdated. Let’s see how you’re feeling now!"

### `homeBot/content.json` → `/testExpired/3`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 94/88
- **Судья**: Translation A sounds much more natural and follows the 'understanding friend' tone. Translation B uses several unnatural or 'translated' constructions like 'reflects your state' and 'results have expired'.
- **Было (NEW)**: "Your current <b>{test_name}</b> data no longer reflects your state. It’s time to take it again."
- **Стало (OLD)**: "The current <b>{test_name}</b> results no longer reflect how you’re doing. It’s time to retake the test."

### `homeBot/content.json` → `/testExpired/4`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 94/88
- **Судья**: Translation A sounds much more natural and follows the 'understanding friend' tone. Translation B uses several unnatural or 'translated' constructions like 'reflects your state' and 'results have expired'.
- **Было (NEW)**: "Your <b>{test_name}</b> results are no longer up to date. Would you like to refresh them and see your current status?"
- **Стало (OLD)**: "<b>{test_name}</b> results aren’t up to date. Would you like to update them and see your current results?"

### `homeBot/content.json` → `/testExpired/5`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 94/88
- **Судья**: Translation A sounds much more natural and follows the 'understanding friend' tone. Translation B uses several unnatural or 'translated' constructions like 'reflects your state' and 'results have expired'.
- **Было (NEW)**: "It’s been a while since you took the <b>{test_name}</b> test. Let’s see what has changed since then!"
- **Стало (OLD)**: "It’s been a while since you last took <b>{test_name}</b>. Let’s see what’s changed since then!"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

