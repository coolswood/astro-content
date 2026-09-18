# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:53.144Z
- **Отчёт eval**: scripts/qa/reports/20260918-235804-en-final-g45-label_lawyer_lazy/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/depression/label_lawyer_lazy.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 8, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/depression/label_lawyer_lazy.json` | `/lazy/screen_3/texts/0` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/label_lawyer_lazy.json` | `/lazy/screen_3/texts/1` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/label_lawyer_lazy.json` | `/lazy/screen_3/texts/2` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/label_lawyer_lazy.json` | `/lazy/screen_3/texts/3` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/label_lawyer_lazy.json` | `/lazy/screen_3/texts/4` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/label_lawyer_lazy.json` | `/lazy/screen_3/texts/5` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/label_lawyer_lazy.json` | `/lazy/screen_3/texts/6` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/label_lawyer_lazy.json` | `/lazy/title` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/depression/label_lawyer_lazy.json` → `/lazy/screen_3/texts/0`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 94/82
- **Судья**: Translation B sounds more natural and idiomatic for a mental health article. It avoids the slightly clunky 'the desire to do it' and 'required to want' found in A, opting for smoother phrasing like 'without desire' and 'don't have to want'.
- **Было (NEW)**: "Why doesn’t motivation appear?"
- **Стало (OLD)**: "Why doesn’t motivation show up?"

### `story/depression/label_lawyer_lazy.json` → `/lazy/screen_3/texts/1`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 94/82
- **Судья**: Translation B sounds more natural and idiomatic for a mental health article. It avoids the slightly clunky 'the desire to do it' and 'required to want' found in A, opting for smoother phrasing like 'without desire' and 'don't have to want'.
- **Было (NEW)**: "We often feel that we can’t do anything without the desire to do it."
- **Стало (OLD)**: "We often assume that without desire, we can’t do anything."

### `story/depression/label_lawyer_lazy.json` → `/lazy/screen_3/texts/2`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 94/82
- **Судья**: Translation B sounds more natural and idiomatic for a mental health article. It avoids the slightly clunky 'the desire to do it' and 'required to want' found in A, opting for smoother phrasing like 'without desire' and 'don't have to want'.
- **Было (NEW)**: "But does everything in life really depend on motivation? Do you always go to work with enthusiasm? Or sometimes, do you go simply because you have to?"
- **Стало (OLD)**: "But does everything in life really happen only because of motivation? Do you always go to work with enthusiasm—or sometimes simply because it’s needed?"

### `story/depression/label_lawyer_lazy.json` → `/lazy/screen_3/texts/3`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 94/82
- **Судья**: Translation B sounds more natural and idiomatic for a mental health article. It avoids the slightly clunky 'the desire to do it' and 'required to want' found in A, opting for smoother phrasing like 'without desire' and 'don't have to want'.
- **Было (NEW)**: "When we say “I have no motivation,” we often actually mean “I don’t want to” or “it’s hard for me to start.”"
- **Стало (OLD)**: "When we say “I have no motivation,” it often means “I don’t want to” or “it’s hard to start.”"

### `story/depression/label_lawyer_lazy.json` → `/lazy/screen_3/texts/4`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 94/82
- **Судья**: Translation B sounds more natural and idiomatic for a mental health article. It avoids the slightly clunky 'the desire to do it' and 'required to want' found in A, opting for smoother phrasing like 'without desire' and 'don't have to want'.
- **Было (NEW)**: "That’s okay. We aren’t required to want everything that is beneficial for us."
- **Стало (OLD)**: "That’s normal. We don’t have to want everything that’s good for us."

### `story/depression/label_lawyer_lazy.json` → `/lazy/screen_3/texts/5`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 94/82
- **Судья**: Translation B sounds more natural and idiomatic for a mental health article. It avoids the slightly clunky 'the desire to do it' and 'required to want' found in A, opting for smoother phrasing like 'without desire' and 'don't have to want'.
- **Было (NEW)**: "During depression, you may feel like doing almost nothing. You might want to lie down, disappear, or hide. However, long periods of inactivity only intensify the suffering."
- **Стало (OLD)**: "In depression, almost nothing feels appealing. You want to lie down, disappear, hide. But long stretches of inaction only deepen the suffering."

### `story/depression/label_lawyer_lazy.json` → `/lazy/screen_3/texts/6`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 94/82
- **Судья**: Translation B sounds more natural and idiomatic for a mental health article. It avoids the slightly clunky 'the desire to do it' and 'required to want' found in A, opting for smoother phrasing like 'without desire' and 'don't have to want'.
- **Было (NEW)**: "The paradox is that motivation often appears *after* action, rather than before it."
- **Стало (OLD)**: "The paradox is that motivation often appears after action, not before it."

### `story/depression/label_lawyer_lazy.json` → `/lazy/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation B is more idiomatic and engaging for an article title. 'Breeds apathy' is a much stronger and more natural collocation than 'leads to apathy', and adding 'Your' makes the title more personal and compelling for the reader.
- **Было (NEW)**: "Awakening the Will: Why Depression Leads to Apathy"
- **Стало (OLD)**: "Awakening Your Will: Why Depression Breeds Apathy"

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

