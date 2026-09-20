# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:52.640Z
- **Отчёт eval**: scripts/qa/reports/20260918-234723-en-final-g23-three_options/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/three_options.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 3, skip 8, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/three_options.json` | `/title` | ✅ apply | перенесён текст OLD (2:0) |
| `story/three_options.json` | `/screen_3/texts/0` | ⏭ skip | группа `/screen_3/texts` переносится только целиком — лист не прошёл: /screen_3/texts/4: валидация не пройдена — (файл): теги — потеряны: <important> </important> (нет в: screen_3/texts/4) |
| `story/three_options.json` | `/screen_3/texts/1` | ⏭ skip | группа `/screen_3/texts` переносится только целиком — лист не прошёл: /screen_3/texts/4: валидация не пройдена — (файл): теги — потеряны: <important> </important> (нет в: screen_3/texts/4) |
| `story/three_options.json` | `/screen_3/texts/2` | ⏭ skip | группа `/screen_3/texts` переносится только целиком — лист не прошёл: /screen_3/texts/4: валидация не пройдена — (файл): теги — потеряны: <important> </important> (нет в: screen_3/texts/4) |
| `story/three_options.json` | `/screen_3/texts/3` | ⏭ skip | группа `/screen_3/texts` переносится только целиком — лист не прошёл: /screen_3/texts/4: валидация не пройдена — (файл): теги — потеряны: <important> </important> (нет в: screen_3/texts/4) |
| `story/three_options.json` | `/screen_3/texts/4` | ⏭ skip | валидация не пройдена — (файл): теги — потеряны: <important> </important> (нет в: screen_3/texts/4) |
| `story/three_options.json` | `/screen_3/texts/5` | ⏭ skip | группа `/screen_3/texts` переносится только целиком — лист не прошёл: /screen_3/texts/4: валидация не пройдена — (файл): теги — потеряны: <important> </important> (нет в: screen_3/texts/4) |
| `story/three_options.json` | `/screen_3/texts/6` | ⏭ skip | группа `/screen_3/texts` переносится только целиком — лист не прошёл: /screen_3/texts/4: валидация не пройдена — (файл): теги — потеряны: <important> </important> (нет в: screen_3/texts/4) |
| `story/three_options.json` | `/screen_3/texts/7` | ⏭ skip | группа `/screen_3/texts` переносится только целиком — лист не прошёл: /screen_3/texts/4: валидация не пройдена — (файл): теги — потеряны: <important> </important> (нет в: screen_3/texts/4) |
| `story/three_options.json` | `/description` | ✅ apply | перенесён текст OLD (2:0) |
| `story/three_options.json` | `/test/question` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/three_options.json` → `/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/75 · 95/80
- **Судья**: Translation B is more precise and idiomatic for a CBT context. 'Three Options' in A is too vague and sounds like choosing between three choices, whereas 'Three Possible Outcomes' accurately reflects the concept of exploring different scenarios/developments.
- **Было (NEW)**: "The “Three Options” technique"
- **Стало (OLD)**: "The “Three Possible Outcomes” Technique"

### `story/three_options.json` → `/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 95/88
- **Судья**: Translation B is more idiomatic and flows better. The use of 'scenarios' and 'gradually reduces' feels more natural for a mental health context than the slightly more clinical or repetitive phrasing in A.
- **Было (NEW)**: "This text describes a cognitive behavioral therapy (CBT) technique for working with negative automatic thoughts called “Three Options.” It helps broaden your perspective on a situation and reduce anxiety by intentionally considering the worst, best, and most realistic outcomes. Regular practice can help reduce the intensity of negative emotions."
- **Стало (OLD)**: "This text describes a cognitive behavioral therapy (CBT) technique for working with negative automatic thoughts — the “Three Possible Outcomes” method. It helps broaden your view of a situation and reduce anxiety by deliberately considering the worst, best, and most realistic scenarios. Regular practice gradually reduces the intensity of negative emotions."

### `story/three_options.json` → `/test/question`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/80 · 95/82
- **Судья**: Translation B is more accurate and professional. Translation A uses a vague name for the technique ('Three Options'), whereas B correctly captures the essence of 'развития событий' (outcomes).
- **Было (NEW)**: "What is the main goal of the “Three Options” technique in CBT?"
- **Стало (OLD)**: "What is the main goal of the “Three Possible Outcomes” technique in cognitive-behavioral therapy?"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

