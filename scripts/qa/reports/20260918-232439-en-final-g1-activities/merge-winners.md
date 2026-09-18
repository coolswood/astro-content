# Merge-back победителей OLD — CONTENT

- **Дата**: 2026-09-18T21:43:21.193Z
- **Отчёт eval**: scripts/qa/reports/20260918-232439-en-final-g1-activities/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — activities.json
- **Язык**: en
- **Режим**: APPLY (запись только по --apply)
- **Итог**: применить 0, skip 16, no-op 4; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `activities.json` | `/DzseWuFv2t/table/example/1/0` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/DzseWuFv2t/table/example/1/1` | ⚪ no-op | значение уже идентично OLD |
| `activities.json` | `/DzseWuFv2t/table/example/1/2` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/lsvnnDSnsdl/statement` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/lsafnanS3sf/table/example/1/0` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/lsafnanS3sf/table/example/1/1` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/alkjnaNNasz/task/0` | ⚪ no-op | значение уже идентично OLD |
| `activities.json` | `/alkjnaNNasz/task/1` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/alkjnaNNasz/task/2` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/alkjnaNNasz/task/3` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/alkjnaNNasz/task/4` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/alkjnaNNasz/task/5` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/alkjnaNNasz/task/6` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/alkjnaNNasz/task/7` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/DzseWuFv2t/description/0` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/DzseWuFv2t/description/1` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/lsafnanS3sf/table/header/0` | ⚪ no-op | значение уже идентично OLD |
| `activities.json` | `/lsafnanS3sf/table/header/1` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |
| `activities.json` | `/lsafnanS3sf/table/header/2` | ⚪ no-op | значение уже идентично OLD |
| `activities.json` | `/lsafnanS3sf/table/header/3` | ⏭ skip | файловая валидация после мерджа провалена — перенос отменён |

## Переносы (было → стало)

_Нет применённых переносов._

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

