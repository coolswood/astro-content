# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:51.605Z
- **Отчёт eval**: scripts/qa/reports/20260918-233552-en-final-g1-sitemap/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — sitemap.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 4, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `sitemap.json` | `/iF6sKCdvfds/description` | ✅ apply | перенесён текст OLD (2:0) |
| `sitemap.json` | `/sdvdNdbxdwQfb/description` | ✅ apply | перенесён текст OLD (2:0) |
| `sitemap.json` | `/EauYpGQzAL/title` | ✅ apply | перенесён текст OLD (2:0) |
| `sitemap.json` | `/iFlct67Ldvkwq/title` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `sitemap.json` → `/iF6sKCdvfds/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 98/85
- **Судья**: Translation B is more concise and follows UX best practices for actions/buttons by using a direct imperative. Translation A includes 'Add the ability to', which is a wordy, heavy construction (calque of 'Добавить возможность') that sounds unnatural in a functional context.
- **Было (NEW)**: "Add the ability to link automatic thoughts to beliefs and build a belief map."
- **Стало (OLD)**: "Link automatic thoughts to beliefs and build a belief map."

### `sitemap.json` → `/sdvdNdbxdwQfb/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/82 · 95/82
- **Судья**: Translation A is more elegant and professional, using the idiomatic 'share what you’re going through' which fits the supportive tone perfectly. Translation B feels slightly more repetitive ('share... get... and receive') and uses 'feelings', which is less nuanced than the original 'переживаниями' in this context.
- **Было (NEW)**: "Chat freely with an AI assistant to share your feelings, get support, and receive advice."
- **Стало (OLD)**: "Free-form conversations with AI: share what you’re going through and receive support and guidance."

### `sitemap.json` → `/EauYpGQzAL/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 100/90 · 95/85
- **Судья**: The original text is a title/heading. According to the style guide, headings should follow sentence case or title case, but in the context of a section name or feature, 'Coping Cards' (Title Case) is more appropriate for a UI element than 'Coping cards'.
- **Было (NEW)**: "Coping cards"
- **Стало (OLD)**: "Coping Cards"

### `sitemap.json` → `/iFlct67Ldvkwq/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 100/95 · 100/85
- **Судья**: In the context of a section title or a product feature, Title Case (A) is more appropriate for a header, whereas sentence case (B) is typically used for UI labels or list items. Since 'Дневник благодарности' functions as a standalone title, A is the standard choice.
- **Было (NEW)**: "Gratitude journal"
- **Стало (OLD)**: "Gratitude Journal"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

