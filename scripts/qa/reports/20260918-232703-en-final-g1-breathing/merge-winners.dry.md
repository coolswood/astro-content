# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:51.136Z
- **Отчёт eval**: scripts/qa/reports/20260918-232703-en-final-g1-breathing/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — breathing.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 5, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `breathing.json` | `/deep_relax/final_text` | ✅ apply | перенесён текст OLD (2:0) |
| `breathing.json` | `/calm/subtitle` | ✅ apply | перенесён текст OLD (2:0) |
| `breathing.json` | `/calm/name` | ✅ apply | перенесён текст OLD (2:0) |
| `breathing.json` | `/deep_relax/description` | ✅ apply | перенесён текст OLD (2:0) |
| `breathing.json` | `/balance/description` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `breathing.json` → `/deep_relax/final_text`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 95/88
- **Судья**: Translation B sounds more natural and idiomatic for a mindfulness context. 'Stay with this feeling' is much more common in English meditation/wellness guidance than the literal 'Stay in this state'.
- **Было (NEW)**: "The tension has faded, leaving room for softness and peace. Stay in this state for a little longer and allow yourself some well-deserved rest."
- **Стало (OLD)**: "The tension has eased, making room for softness and calm. Stay with this feeling a little longer, and allow yourself the rest you deserve."

### `breathing.json` → `/calm/subtitle`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/85 · 98/80
- **Судья**: Translation B is superior because it provides necessary context ('breathing') that makes the phrase meaningful to a native speaker, whereas Translation A is a literal, underspecified calque. B also correctly uses an en dash for the range.
- **Было (NEW)**: "The classic “4-6” pattern"
- **Стало (OLD)**: "Classic 4–6 breathing pattern"

### `breathing.json` → `/calm/name`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/75 · 98/70
- **Судья**: In English, 'Stress Relief' is the natural, idiomatic way to label a section or feature intended to reduce stress. 'Anti-stress' sounds like a literal translation from Russian or a technical term for a substance, making it less pleasant for a native speaker.
- **Было (NEW)**: "Anti-stress"
- **Стало (OLD)**: "Stress Relief"

### `breathing.json` → `/deep_relax/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 96/84
- **Судья**: Translation B sounds more natural and idiomatic for a mental well-being context. 'Winding down' and 'come back to yourself' are much more evocative and appropriate for this genre than the slightly more literal 'calm down' or 'recover'.
- **Было (NEW)**: "When the day has been long and tension has built up in your body, this practice helps you gently “settle” and recover. A short pause after the inhale allows your thoughts to still, while the long exhale brings a sense of deep release. It’s the perfect choice to relieve muscle fatigue and calm down in the evening."
- **Стало (OLD)**: "When the day has been long and tension has built up in the body, this practice helps you gently settle and come back to yourself. A brief pause after the inhale gives the mind a moment to quiet down, while the longer exhale brings a deeper sense of release. It’s an ideal choice for easing muscle fatigue and winding down in the evening."

### `breathing.json` → `/balance/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/82 · 95/82
- **Судья**: Translation B captures the supportive 'expert friend' tone much better by avoiding the clunky 'urgent calming' and using a more natural phrasing ('force relaxation'). Translation A feels slightly more like a literal translation of the Russian structure.
- **Было (NEW)**: "Sometimes we don’t need urgent calming or deep relaxation — we just need to steady our internal rhythm. This practice helps you gently slow down, regain a sense of stability, and reconnect with yourself. Equal inhales and exhales create a calm, predictable pace that is easy to follow."
- **Стало (OLD)**: "Sometimes, you don’t need to force relaxation or strive for deep calm—you just need to steady your internal rhythm. This practice helps you gently slow down, regain stability, and reconnect with yourself. Equal inhales and exhales create a calm, predictable pace that is easy to follow."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

