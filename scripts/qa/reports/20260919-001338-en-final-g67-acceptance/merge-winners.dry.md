# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:53.806Z
- **Отчёт eval**: scripts/qa/reports/20260919-001338-en-final-g67-acceptance/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/acceptance.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 6, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/acceptance.json` | `/steps_description/16/fact` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/acceptance.json` | `/steps_description/1/fact` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/acceptance.json` | `/steps_description/6/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/acceptance.json` | `/steps_description/11/text` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/acceptance.json` | `/result/low/title` | ✅ apply | перенесён текст OLD (2:0) |
| `tests/acceptance.json` | `/steps_description/0/text` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `tests/acceptance.json` → `/steps_description/16/fact`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 96/88
- **Судья**: Translation A is more precise and stylistically superior. It correctly captures the nuance of 'критически воспринята' with 'faced harsh criticism' and avoids the unnecessary addition of 'former' which is not in the original. Translation B uses 'social work', which in English often implies professional social services rather than 'общественная деятельность' (public role/activity).
- **Было (NEW)**: "Eleanor Roosevelt, the former First Lady of the United States, was often criticized for her active social work and political involvement. Despite this, she remained true to her principles and continued to fight for human rights, stating: “No one can make you feel inferior without your consent.”"
- **Стало (OLD)**: "Eleanor Roosevelt, First Lady of the United States, faced harsh criticism for her active public role and political involvement. Despite this, she remained true to her principles and continued to fight for human rights, stating: “No one can make you feel inferior without your consent.”"

### `tests/acceptance.json` → `/steps_description/1/fact`

- **Оценки судьи OLD/NEW (2 прохода)**: 97/92 · 96/92
- **Судья**: Translation B is more precise and idiomatic. It correctly captures 'чувство собственного достоинства' as 'a sense of dignity' and uses 'such as' for examples, which is more appropriate for this formal/educational tone than 'like'.
- **Было (NEW)**: "In Stoic philosophy, one of the central ideas is the ability to maintain inner calm and dignity regardless of external circumstances. Stoics like Seneca and Marcus Aurelius taught that a person’s true value is determined not by successes or failures, but by their inner qualities and moral principles."
- **Стало (OLD)**: "In Stoic philosophy, one of the central ideas is the ability to maintain inner calm and a sense of dignity despite external circumstances. Stoics such as Seneca and Marcus Aurelius taught that a person’s true value is determined not by successes and failures, but by their inner qualities and moral principles."

### `tests/acceptance.json` → `/steps_description/6/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 96/88
- **Судья**: Translation A uses the idiomatic and natural 'sense of self-worth', whereas Translation B uses 'sense of dignity', which is a mistranslation in this context (dignity refers to honor/status, while self-worth refers to self-esteem). A also flows more naturally for a reader.
- **Было (NEW)**: "Psychologists suggest that for many people, self-esteem is closely tied to how they are perceived by others, especially significant others (family, friends, partners). According to a study by the University of Houston, about 70% of people admit that their sense of dignity increases when they feel loved and supported by those important to them."
- **Стало (OLD)**: "Psychologists note that for many people self-esteem is closely tied to how they are seen by others, especially by significant others (family, friends, partners). A study from the University of Houston found that around 70% of people admit that their sense of self-worth increases when they feel loved and supported by important people in their lives."

### `tests/acceptance.json` → `/steps_description/11/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 92/84 · 95/88
- **Судья**: Translation A uses more natural phrasing ('use psychological defense mechanisms' vs 'experience psychological defenses') and correctly translates 'чувство собственного достоинства' as 'sense of self-worth', which is more appropriate for the context of self-esteem than 'dignity'.
- **Было (NEW)**: "People often experience psychological defenses when receiving negative feedback, as it can threaten their self-esteem. A common reaction to criticism is “defensive behavior,” where a person tries to justify themselves or reject the criticism to protect their sense of dignity. Research shows this reaction is common among 60–70% of people."
- **Стало (OLD)**: "People often use psychological defense mechanisms when receiving negative feedback because it can threaten their self-esteem. One common reaction to criticism is “defensive behavior”, when a person tries to justify themselves or reject the criticism in order to preserve their sense of self-worth. Studies show that this reaction is found in about 60–70% of people."

### `tests/acceptance.json` → `/result/low/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/80 · 98/80
- **Судья**: Translation A uses the standard psychological term 'self-acceptance' with a proper noun-based construction. Translation B, while grammatically correct, sounds more like a sudden action or a harsh personality trait rather than a psychological state or concept.
- **Было (NEW)**: "Self-rejection"
- **Стало (OLD)**: "Lack of self-acceptance"

### `tests/acceptance.json` → `/steps_description/0/text`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 96/88
- **Судья**: Translation A is more idiomatic and flows better for a native reader. 'Supports a more positive self-view' is much more natural than the clunky 'helps people perceive themselves more positively' in Translation B.
- **Было (NEW)**: "According to the American Psychological Association, praise—especially when it focuses on effort rather than results—helps develop a stable sense of self-worth. This helps people perceive themselves more positively and reduces the fear of failure."
- **Стало (OLD)**: "According to the American Psychological Association, praise — especially when it focuses on effort rather than outcome — helps develop a stable sense of self-worth. It supports a more positive self-view and reduces the fear of failure."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

