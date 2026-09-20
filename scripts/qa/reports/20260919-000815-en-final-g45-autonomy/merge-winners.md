# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:23.141Z
- **Отчёт eval**: scripts/qa/reports/20260919-000815-en-final-g45-autonomy/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/distortions/autonomy.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 1, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/distortions/autonomy.json` | `/description` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/distortions/autonomy.json` → `/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 95/88
- **Судья**: Translation A flows much more naturally for a native reader, using better collocations like 'stable, lasting happiness' and 'fuller, more satisfying life'. Translation B feels slightly more academic and contains a minor omission regarding the responsibility for happiness.
- **Было (NEW)**: "This article explores the idea that true happiness depends less on external circumstances and more on internal perception and personal choices. It highlights how clinging to high expectations makes us vulnerable to dissatisfaction, whereas accepting reality and practicing gratitude foster more resilient happiness. The core idea is that recognizing your responsibility for your own internal state is the key to a more fulfilling and satisfied life."
- **Стало (OLD)**: "This article explores the idea that genuine happiness depends less on external circumstances and more on our inner perspective and personal choices. It emphasizes that clinging to high expectations and external factors makes us vulnerable to dissatisfaction, whereas accepting reality and practicing gratitude support more stable, lasting happiness. The core message is that recognizing your own responsibility for your happiness and emotional state is a key step toward a fuller, more satisfying life."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

