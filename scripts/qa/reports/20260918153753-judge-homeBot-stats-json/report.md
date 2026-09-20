# Коллегия: homeBot/stats.json

## en — раундов 2, правок 2 · сошлось

**Вердикт: minor_edits · score 85** — Основная проблема — техническая ошибка в использовании порядкового суффикса 'th' внутри плейсхолдера, что приведет к грамматическим ошибкам (1th, 2th). Текст в остальном звучит очень естественно, тепло и соответствует Tone of Voice. Необходимо либо внедрить логику порядковых числительных на стороне разработки, либо изменить фразу на конструкцию, не требующую суффиксов.

- [раунд 1] `/daysInRow/0`: This is your <b>{days}</b> day in a row — great momentum! → **This is your <b>{days}</b>th day in a row — great momentum!**
- [раунд 1] `/daysMissed/1`: It’s been <b>{days}</b> days since your last visit. It’s good to have  → **It’s been <b>{days}</b> days since your last visit. It’s good to have you back. I hope you**
