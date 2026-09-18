# QA: слепое парное сравнение переводов — en-final-g23-stats

- **Дата**: 2026-09-18T20:39:47.239Z
- **Метка**: en-final-g23-stats
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: homeBot/stats.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## homeBot/stats.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 3 | 🟢 0 | 🔴 0 | ⚪ 0 | 🟡 3 | 0 / 0 | — |
| **итого** | 3 | 🟢 0 | 🔴 0 | ⚪ 0 | 🟡 3 | 0 / 0 | — |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×2, mistranslation/minor×1, style/major×1; OLD — style/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/daysMissed`— вердикт неустойчив

- **RU**: Не видел Вас уже <b>{days}</b> д. 😢 Надеюсь, у Вас всё в порядке. Рада, что Вы снова здесь. Прошло <b>{days}</b> д. с нашего последнего визита. Хорошо, что Вы вернулись. Надеюсь, эти дни были для Вас бережными. Уже <b>{days}</b> д. прошло без Ваших визитов. Р…
- **OLD**: I haven’t seen you for <b>{days}</b> days 😊 I hope you’re doing okay. I’m glad you’re back. It’s been <b>{days}</b> days since your last visit. I’m glad you’re back. I hope those days were kind to you. It’s been <b>{days}</b> days since you last checked in. I…
- **NEW**: I haven’t seen you for <b>{days}</b> days 😢 I hope you’re doing okay. I’m glad you’re back. It’s been <b>{days}</b> days since your last visit. It’s good to have you back. I hope you’ve been kind to yourself during this time. It’s been <b>{days}</b> days sinc…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more idiomatic and follows the 'supportive friend' tone perfectly, especially with the phrase 'hope those days were kind to you'. Translation B contains a slight mistranslation of the second block (changing 'hope the days were kind' to 'hope you were kind to yourself') and feels slightly more repetitive/clunky in the third block.
  - [new/mistranslation/minor] In the second block, 'hope these days were kind to you' (referring to the period of absence) is changed to 'hope you've been kind to yourself', which shifts the focus from the circumstances to the user's self-treatment.
  - [new/style/minor] The third block 'I hope today can be a comfortable step for you' is a bit wordy and less natural than A's 'may today feel like a gentle step'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more consistent with the required tone and provides more natural, idiomatic phrasing for a mental health app. Specifically, 'I hope you’ve been kind to yourself' is a much better transcreation of the Russian 'бережными' than B's literal 'kind to you'.
  - [old/style/minor] The emoji in the first sentence was changed from 😢 to 😊, which alters the original sentiment.
  - [old/style/minor] The phrase 'I hope those days were kind to you' sounds slightly unnatural/clunky compared to the idiomatic 'be kind to yourself'.

#### 🟡 en `/daysCommon`— вердикт неустойчив

- **RU**: Здорово! Вы уже посетили нас <b>{days}</b> раз. Это Ваш <b>{days}</b> визит в приложение — приятно видеть Вашу активность! Прекрасно! Количество Ваших посещений достигло <b>{days}</b>. Мы рады видеть Вас уже <b>{days}</b> раз!
- **OLD**: Great! You’ve visited us <b>{days}</b> times. This is visit number <b>{days}</b> — great to see you staying engaged! Wonderful! You’ve reached <b>{days}</b> total visits. We’re happy to see you here <b>{days}</b> times already!
- **NEW**: Great! You’ve visited us <b>{days}</b> times. This is your <b>{days}</b> visit — it’s great to see you staying active! Wonderful! You’ve reached <b>{days}</b> visits. We’re happy to see you here <b>{days}</b> times!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A sounds more natural and idiomatic for a gamified app experience. Translation B contains a grammatical awkwardness in the second sentence ('your {days} visit') and feels slightly repetitive/dry.
  - [new/style/major] The phrase 'This is your {days} visit' is grammatically weak; a native speaker would say 'your {days}th visit' or 'visit number {days}'.
  - [new/style/minor] The third and fourth sentences are a bit too literal and lack the celebratory 'punch' found in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and follows the 'warm, supportive friend' tone perfectly. Translation B uses slightly more clinical/mechanical phrasing ('visit number', 'total visits') which feels less like a friendly app and more like a report.
  - [old/style/minor] 'visit number {days}' sounds a bit robotic/technical for a warm app tone.
  - [old/style/minor] 'staying engaged' is slightly more formal/business-like than 'staying active'.

#### 🟡 en `/daysInRow`— вердикт неустойчив

- **RU**: Это Ваш <b>{days}</b> день занятий подряд — отличная динамика! Вы на верном пути. Уже <b>{days}</b> день подряд Вы уделяете время себе. Отличный результат! Без пропусков уже <b>{days}</b> д. подряд. Впечатляющая серия! Вы работаете над собой уже <b>{days}</b> …
- **OLD**: You’re on a <b>{days}</b>-day practice streak — great momentum! You’re on the right track — you’ve made time for yourself for <b>{days}</b> days in a row. Great job — <b>{days}</b> days in a row without a break. Impressive streak! You’ve been working on yourse…
- **NEW**: This is your <b>{days}</b>th day in a row — great momentum! You’re on the right track. You’ve been making time for yourself for <b>{days}</b> days in a row. Great result! <b>{days}</b> days in a row without missing a beat. Impressive streak! You’ve been workin…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more idiomatic and captures the encouraging, natural tone of a mental health app. It uses 'without missing a beat' and 'days in a row' effectively, whereas B feels slightly more repetitive and literal.
  - [old/style/minor] The phrasing 'without a break' is a bit dry/literal compared to the more natural 'without missing a beat' or 'straight' used in A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A sounds more natural and idiomatic for a gamified app, especially with the use of 'streak'. Translation B makes a grammatical error in the first sentence by using an ordinal suffix ('th') with a placeholder that likely provides a cardinal number.
  - [new/style/major] The use of '{days}th' is risky; if the placeholder is '5', it becomes '5th', but if it's '1', it becomes '1th' (incorrect). Translation A's 'X-day streak' is much safer and more idiomatic for UX.
  - [new/style/minor] 'Great result!' sounds slightly stiff/translated compared to 'Great job!' or 'Great work!' in this context.

