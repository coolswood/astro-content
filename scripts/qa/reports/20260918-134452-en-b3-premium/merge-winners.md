# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T10:50:56.354Z
- **Отчёт eval**: scripts/qa/reports/20260918-134452-en-b3-premium/report.json
- **Базлайн OLD**: git HEAD (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — texts/premium.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 2, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `texts/premium.json` | `/list/2/description` | ✅ apply | перенесён текст OLD (2:0) |
| `texts/premium.json` | `/list/3/title` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `texts/premium.json` → `/list/2/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 96/88
- **Судья**: Translation A is more direct, natural, and follows the UX principle of simplicity. Translation B is slightly wordy and uses a heavy, passive construction ('protected by encryption') which feels less like a modern app interface.
- **Было (NEW)**: "You can set a passcode to enter the app, and your data is further protected by encryption. This ensures a high level of security, guaranteeing that your entries remain accessible only to you."
- **Стало (OLD)**: "You can set a password to enter the app, and your data is additionally encrypted. This provides a high level of protection and ensures that only you have access to your entries."

### `texts/premium.json` → `/list/3/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 98/85 · 98/85
- **Судья**: Translation A uses the more professional and standard industry term 'speech recognition', whereas B uses 'voice recognition', which is slightly more colloquial. A also correctly captures the nuance of 'AI-powered' for 'AI-распознавание'.
- **Было (NEW)**: "AI voice recognition"
- **Стало (OLD)**: "AI-powered speech recognition"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

