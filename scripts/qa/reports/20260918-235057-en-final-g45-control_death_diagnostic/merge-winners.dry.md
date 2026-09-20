# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:52.898Z
- **Отчёт eval**: scripts/qa/reports/20260918-235057-en-final-g45-control_death_diagnostic/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — story/depression/control_death_diagnostic.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 2, skip 7, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `story/depression/control_death_diagnostic.json` | `/control/screen_2/texts/0` | ⏭ skip | группа `/control/screen_2/texts` переносится только целиком — лист не прошёл: /control/screen_2/texts/3: валидация не пройдена — (файл): теги — потеряны: <instagram> (нет в: control/screen_2/texts/3) |
| `story/depression/control_death_diagnostic.json` | `/control/screen_2/texts/1` | ⏭ skip | группа `/control/screen_2/texts` переносится только целиком — лист не прошёл: /control/screen_2/texts/3: валидация не пройдена — (файл): теги — потеряны: <instagram> (нет в: control/screen_2/texts/3) |
| `story/depression/control_death_diagnostic.json` | `/control/screen_2/texts/2` | ⏭ skip | группа `/control/screen_2/texts` переносится только целиком — лист не прошёл: /control/screen_2/texts/3: валидация не пройдена — (файл): теги — потеряны: <instagram> (нет в: control/screen_2/texts/3) |
| `story/depression/control_death_diagnostic.json` | `/control/screen_2/texts/3` | ⏭ skip | валидация не пройдена — (файл): теги — потеряны: <instagram> (нет в: control/screen_2/texts/3) |
| `story/depression/control_death_diagnostic.json` | `/control/screen_2/texts/4` | ⏭ skip | группа `/control/screen_2/texts` переносится только целиком — лист не прошёл: /control/screen_2/texts/3: валидация не пройдена — (файл): теги — потеряны: <instagram> (нет в: control/screen_2/texts/3) |
| `story/depression/control_death_diagnostic.json` | `/control/screen_2/texts/5` | ⏭ skip | группа `/control/screen_2/texts` переносится только целиком — лист не прошёл: /control/screen_2/texts/3: валидация не пройдена — (файл): теги — потеряны: <instagram> (нет в: control/screen_2/texts/3) |
| `story/depression/control_death_diagnostic.json` | `/control/screen_2/texts/6` | ⏭ skip | валидация не пройдена — (файл): теги — потеряны: <li> </li> (нет в: control/screen_2/texts/6) |
| `story/depression/control_death_diagnostic.json` | `/control/title` | ✅ apply | перенесён текст OLD (2:0) |
| `story/depression/control_death_diagnostic.json` | `/death/description` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `story/depression/control_death_diagnostic.json` → `/control/title`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/75 · 95/80
- **Судья**: Translation A uses the idiomatic expression 'in control', which sounds natural for a title. Translation B is a literal calque from Russian ('under control') that sounds awkward in this context.
- **Было (NEW)**: "Technique: Day Under Control"
- **Стало (OLD)**: "Technique: A Day in Control"

### `story/depression/control_death_diagnostic.json` → `/death/description`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 96/88
- **Судья**: Translation A follows the original sentence structure and rhythm perfectly, making it easier to read. Translation B attempts to combine the last two sentences into one long, cumbersome sentence, which feels less natural for a narrative summary.
- **Было (NEW)**: "This article tells the story of Anastasia, who experienced deep depression and intense guilt following the tragic death of her brother. Through psychotherapy, she was able to gradually let go of self-blame, change how she viewed herself and her experiences, and eventually emerge from depression, accepting that she was not to blame and beginning to live a full life again."
- **Стало (OLD)**: "This article tells the story of Anastasia, who experienced profound depression and a heavy sense of guilt after her brother’s tragic death. Through psychotherapy, she gradually let go of self-blame and changed the way she related to herself and her experiences. Over time, Anastasia emerged from depression, accepted that she was not at fault, and began to live a full life again."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

