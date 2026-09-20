# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:23.561Z
- **Отчёт eval**: scripts/qa/reports/20260919-002103-en-final-g67-das/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — tests/das/das.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 0, skip 9, no-op 2; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `tests/das/das.json` | `/steps_description/17/text` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `tests/das/das.json` | `/steps_description/28/text` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `tests/das/das.json` | `/steps_description/14/fact` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `tests/das/das.json` | `/steps_description/19/text` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `tests/das/das.json` | `/options/0` | ⚪ no-op | значение уже идентично OLD |
| `tests/das/das.json` | `/options/1` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `tests/das/das.json` | `/options/2` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `tests/das/das.json` | `/options/3` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `tests/das/das.json` | `/options/4` | ⚪ no-op | значение уже идентично OLD |
| `tests/das/das.json` | `/steps_description/23/fact` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `tests/das/das.json` | `/steps_description/31/fact` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |

## Переносы (было → стало)

_Нет применённых переносов._

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

