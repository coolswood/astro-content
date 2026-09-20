# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:23.799Z
- **Отчёт eval**: scripts/qa/reports/20260919-002910-en-final-g67-impostor/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/impostor.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 0, skip 2, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/impostor.json` | `/steps_description/12/fact` | ⏭ skip | skip: legacy terminology, нужен перегон (therapist) |
| `tests/impostor.json` | `/result/normal/title` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |

## Переносы (было → стало)

_Нет применённых переносов._

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

