# QA: слепое парное сравнение переводов — sm-flash-trap_unemployment_vitamins

- **Дата**: 2026-09-20T13:41:06.076Z
- **Метка**: sm-flash-trap_unemployment_vitamins
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/de-variants-20260920/baseline
- **Файлы**: story/depression/trap_unemployment_vitamins.json
- **Локали**: de
- **Сэмпл/файл**: 12
- **Seed**: 20260920
- **Min-chars**: 0
- **Модель**: gemini-3.1-pro-high
- **Endpoint**: http://127.0.0.1:8107/v1
- **git HEAD**: 608aa373d2f1e528a04e697db7c459b2fac022f6

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/trap_unemployment_vitamins.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 12 | 🟢 9 | 🔴 2 | ⚪ 0 | 🟡 1 | 0 / 0 | 82% |
| **итого** | 12 | 🟢 9 | 🔴 2 | ⚪ 0 | 🟡 1 | 0 / 0 | 82% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — omission/minor×5, style/minor×5, mistranslation/major×2, mistranslation/minor×2, style/major×1, addition/minor×1, terminology/major×1; OLD — style/minor×10, style/major×7, mistranslation/major×4, addition/minor×3, mistranslation/minor×2, omission/major×2, omission/minor×1, other/minor×1

### Детали пар (для спот-чека)

#### 🔴 de `/unemployment/screen_1/texts` — OLD лучше (2:0)

- **RU**: Внезапная потеря работы – сильный стресс для большинства людей. Когда за несколько дней или недель объявляют об увольнении или сокращении, многие испытывают ощущение, что жизнь «рухнула». И это объяснимо, ведь у вас кардинально меняются: <li>финансовое положен…
- **OLD**: Ein plötzlicher Jobverlust ist für die meisten Menschen ein enormer Stressfaktor. Wenn man innerhalb weniger Tage oder Wochen erfährt, dass man gekündigt wird oder Stellen abgebaut werden, haben viele das Gefühl, dass ihr Leben „zusammenbricht“. Das ist absolu…
- **NEW**: Ein plötzlicher Jobverlust ist für die meisten Menschen ein enormer Stressfaktor. Wenn man innerhalb weniger Tage oder Wochen die Kündigung oder Entlassung erhält, fühlen sich viele, als würde ihr Leben „zusammenbrechen“. Das ist absolut nachvollziehbar, denn …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 86 / NEW 75)
  - Перевод A точнее работает со смыслом (сохранен перевод «банкротства») и лучше отражает обращение на Вы (использование Ihre), хотя оба варианта нарушают правило о запрете безличного «man».
  - [old/style/major] Использование безличного местоимения «man» (Wenn man..., Man ist...) нарушает строгое правило об обращении (допустимо только Sie/Ihre).
  - [old/omission/minor] Пропущено местоимение в фразе «вашу депрессию» (переведено просто как eine Depression).
  - [old/style/minor] Добавлены кавычки внутрь HTML-тега <q>, что может привести к дублированию кавычек при отображении.
  - [new/mistranslation/major] Слово «банкротством» переведено как «sozialen Abstieg» (социальный упадок), что искажает исходный смысл (речь о финансах).
  - [new/style/major] Нарушено правило обращения: используется безличное «man», а в списке вместо перевода «у вас» (Ihre) стоят обезличенные определенные артикли.
  - [new/addition/minor] Необоснованно добавлено слово «oft» (liegt oft in der Überzeugung), которого нет в оригинале.
  - [new/omission/minor] Пропущено местоимение «вашу» перед депрессией (eine Depression).
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 89 / NEW 78)
  - Перевод B точнее лексически (Ruin для банкротства, Ratlosigkeit для растерянности) и использует более естественные конструкции. Оба перевода не до конца справились с правилом единого обращения, но текст B грамматически и стилистически качественнее.
  - [new/mistranslation/major] Слово «банкротством» переведено как «sozialen Abstieg» (социальный спад), что искажает исходный смысл.
  - [new/style/minor] Фраза «die Entlassung erhält» звучит тяжело и неестественно (значительно лучше вариант B: «dass man gekündigt wird»).
  - [new/addition/minor] Добавлено слово «oft» (liegt oft in der Überzeugung), которого не было в оригинале.
  - [new/omission/minor] Пропущено обращение «у вас» перед списком, из-за чего возникла грамматическая шероховатость (es verändert sich + множественное число).
  - [old/style/major] Смешение обращений: в тексте присутствуют Ihre, uns и безличное man. Хотя это калька с меняющегося фокуса оригинала, строгая инструкция требует приводить всё к Sie/Ihre.
  - [old/style/minor] Избыточные кавычки „“ добавлены прямо внутрь HTML-тега <q>, который и так автоматически рендерит их в браузере.
  - [old/omission/minor] В последнем предложении третьего абзаца с конца пропущено местоимение «вашу» (eine Depression вместо Ihre Depression).

#### 🟢 de `/vitamins/screen_3/texts` — NEW лучше (2:0)

- **RU**: Примеры дефицита витаминов и их симптомы: <li>Витамин D: подавленность, тревога, усталость, перепады настроения.</li> <li>Железо: слабость, утомляемость, одышка, головокружение, онемение.</li> <li>Витамин B12: повышенная утомляемость, анемия, бессонница, сниже…
- **OLD**: Beispiele für Vitaminmangel und deren Symptome: <li>Vitamin D: Niedergeschlagenheit, Angst, Müdigkeit, Stimmungsschwankungen.</li> <li>Eisen: Schwäche, Erschöpfbarkeit, Atemnot, Schwindel, Taubheitsgefühle.</li> <li>Vitamin B12: erhöhte Erschöpfbarkeit, Anämie…
- **NEW**: Beispiele für Vitaminmangel und die damit verbundenen Symptome: <li>Vitamin D: Niedergeschlagenheit, Angst, Müdigkeit, Stimmungsschwankungen.</li> <li>Eisen: Schwäche, Erschöpfung, Atemnot, Schwindel, Taubheitsgefühle.</li> <li>Vitamin B12: erhöhte Erschöpfbar…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Перевод A звучит намного естественнее благодаря использованию устоявшихся терминов (Vitaminhaushalt) и гладких формулировок. Перевод B содержит неестественное слововообразование ('vitaminelle') и тяжеловесные номинальные конструкции.
  - [old/style/major] Использование несуществующего/крайне неестественного прилагательного 'vitaminelle' (калька с 'витаминного'). В немецком принято использовать сложные существительные, например 'Vitaminhaushalt' (как в версии А).
  - [old/style/minor] Тяжеловесная номинальная конструкция 'einer Verschlechterung der Stimmung' (ухудшение настроения) вместо естественного 'schlechter Stimmung' (версия А).
  - [old/addition/minor] Добавлено слово 'tiefen' (глубокой) перед 'Antriebslosigkeit', которого нет в оригинале.
  - [old/style/minor] Местоимение 'deren' в начале звучит грамматически спорно (отсылает к множественному числу 'Beispiele', но по смыслу симптомы относятся к 'Vitaminmangel', который здесь в единственном числе). В А это решено гораздо изящнее: 'die damit verbundenen Symptome'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Перевод B звучит гораздо естественнее благодаря использованию общепринятого термина «Hormon- und Vitaminhaushalt». В переводе A используется несуществующее/неестественное прилагательное «vitaminelle».
  - [old/style/major] Использование прилагательного «vitaminelle» в словосочетании «vitaminelle Gleichgewicht» является калькой и звучит совершенно неестественно для носителя; в немецком используется существительное «Vitaminhaushalt».
  - [old/style/minor] Конструкция «Verschlechterung der Stimmung» звучит более канцелярно и тяжело, чем «schlechter Stimmung» в B.
  - [new/addition/minor] Добавлено слово «ursprünglich» (изначально), которого нет в оригинале, хотя это стилистически оправданно и улучшает плавность текста.

#### 🟢 de `/unemployment/description` — NEW лучше (2:0)

- **RU**: Эта статья исследует психологические и социальные последствия внезапной потери работы, рассматривая эмоциональный роллеркостер, который сопровождает такие события. Через личный опыт Александра, долгое время работавшего в успешной компании, рассказывается о бор…
- **OLD**: Dieser Artikel untersucht die psychologischen und sozialen Folgen eines plötzlichen Jobverlusts und beschreibt das emotionale Auf und Ab, das mit solchen Ereignissen einhergeht. Anhand der persönlichen Erfahrung von Alexander, der lange Zeit in einem erfolgrei…
- **NEW**: Dieser Artikel untersucht die psychologischen und sozialen Folgen eines plötzlichen Jobverlusts und beleuchtet das emotionale Auf und Ab, das mit solchen Ereignissen einhergeht. Am Beispiel von Alexander, der lange Zeit in einem erfolgreichen Unternehmen tätig…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Перевод B звучит более гладко и естественно для носителя благодаря правильному и последовательному отсутствию артиклей в перечислении, а также стилистически более удачному глаголу «beleuchtet».
  - [old/style/major] Непоследовательное использование артиклей в перечислении («die Depression, das sinkende Selbstwertgefühl und berufliche Rückschläge»), что ломает синтаксический параллелизм и ритм фразы.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Перевод А звучит более гладко и естественно для носителя языка, особенно за счет стилистически выдержанного перечисления без артиклей во втором предложении. Перевод B использует громоздкую конструкцию с разными артиклями в одном ряду, что сбивает ритм чтения.
  - [old/style/minor] Смешение определенных и нулевых артиклей в перечислении («die Depression, das sinkende Selbstwertgefühl und berufliche Rückschläge») нарушает грамматический параллелизм и делает фразу неестественно тяжелой.

#### 🟢 de `/unemployment/title` — NEW лучше (2:0)

- **RU**: Потерять работу и уйти в депрессию?
- **OLD**: Jobverlust und Depression?
- **NEW**: Arbeitslos werden und in eine Depression rutschen?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 96)
  - Перевод A сохраняет глагольную динамику оригинала и использует живую, естественную метафору («in eine Depression rutschen»), тогда как B использует сухую номинализацию, делая фразу канцелярской.
  - [old/style/major] Неоправданная номинализация (Jobverlust вместо глаголов) нарушает эмпатичный тон. Использование голого термина «Depression» звучит слишком клинически по сравнению с оригиналом.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Перевод B точно передает смысл, сохраняя глагольную структуру оригинала (инфинитивы), и использует естественную, эмпатичную идиому «in eine Depression rutschen». Перевод A прибегает к необоснованной номинализации, делая фразу сухой и клинической.
  - [old/style/major] Глагольная форма оригинала заменена на цепочку существительных (номинализация), из-за чего текст теряет поддерживающий тон и звучит как заголовок медицинского справочника. Также использовано «голое» название болезни без артикля, что нежелательно.

#### 🟢 de `/unemployment/screen_3/texts` — NEW лучше (2:0)

- **RU**: Руководство Александра очень хорошо относилось к нему, считали его способным продажником, но он сам относился к себе неоправданно строго. В процессе следующих встреч и работы с мыслями, Александр согласился, что он очень самокритичен к себе, и это никак не пом…
- **OLD**: Die Geschäftsführung schätzte Alexander sehr und hielt ihn für einen fähigen Verkäufer, doch er selbst ging viel zu streng mit sich ins Gericht. Im Laufe der weiteren Sitzungen und der Arbeit mit seinen Gedanken erkannte Alexander, dass er extrem selbstkritisc…
- **NEW**: Die Geschäftsführung schätzte Alexander sehr und hielt ihn für einen fähigen Verkäufer, doch er selbst ging viel zu streng mit sich ins Gericht. Im Laufe der weiteren Sitzungen und der Arbeit an seinen Gedanken stimmte Alexander zu, dass er extrem selbstkritis…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 93)
  - Перевод A звучит естественнее и точнее лексически. Он избегает калькирования существительного «попытка» (Versuch) в 5-м абзаце, предпочитая живую глагольную форму, и верно использует «unnötig» для слова «напрасно», в то время как B применяет семантически неточное в данном контексте «vergeblich».
  - [old/style/major] Калька в 5-м абзаце: «wäre dieser Versuch gescheitert». Это утяжеляет фразу номинализацией; гораздо естественнее использовать только глагол, как в переводе A (wäre gescheitert).
  - [old/style/minor] «sich vergeblich... gequält» (напрасно мучил) — не самое удачное словоупотребление: vergeblich означает «тщетно/впустую» (с целью, которая не достигнута), здесь по смыслу нужно «unnötig» (без необходимости), как в варианте A.
  - [old/mistranslation/minor] Вместо «согласился» (stimmte zu) использовано «erkannte» (осознал/понял), что слегка смещает акцент во 2-м абзаце.
  - [old/style/minor] В 5-м абзаце стилистический повтор глагола-связки: «unrealistisch waren und zum Scheitern verurteilt waren» (лучше опустить первое waren).
  - [new/style/minor] В 5-м абзаце такой же стилистический повтор глагола-связки: «unrealistisch waren und zum Scheitern verurteilt waren».
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 93)
  - Перевод B звучит естественнее благодаря замене номинализации на глагол (versucht ... und gescheitert вместо повтора versucht ... Versuch) и более точному переводу глаголов (stimmte zu вместо erkannte для «согласился»). Оба перевода имеют мелкие стилистические недочеты, но B демонстрирует более высокий уровень владения языком.
  - [old/mistranslation/minor] Слово «согласился» переведено как «erkannte» (осознал), что сглаживает смысл (B перевел точнее: «stimmte zu»).
  - [old/style/minor] Канцелярская конструкция «Hätte er versucht... und wäre dieser Versuch gescheitert» звучит тяжело из-за номинализации и лексического повтора. Перевод B обошел это изящнее глаголом («wäre gescheitert»).
  - [old/omission/minor] В 8 абзаце опущено второе слово «осознал» («und dass finanzielle Schwierigkeiten...»), тогда как оригинал акцентирует на этом внимание.
  - [new/omission/minor] Упущено притяжательное местоимение «его» («была его большой проблемой» -> «war ein großes Problem» вместо «sein großes Problem»).
  - [old/style/minor] Стилистический повтор глагола «waren» в одном предложении (5 абзац): «unrealistisch waren und zum Scheitern verurteilt waren» (достаточно одного «waren» в конце).
  - [new/style/minor] Стилистический повтор глагола «waren» в 5 абзаце: «unrealistisch waren und zum Scheitern verurteilt waren» (глагол можно не дублировать).
  - [old/style/minor] Прилагательное «Alternative» внутри предложения не должно писаться с заглавной буквы («eine Alternative Sichtweise»), несмотря на словарную фиксацию термина.
  - [new/style/minor] Прилагательное «Alternative» внутри предложения написано с заглавной буквы («eine Alternative Sichtweise»), что противоречит правилам орфографии, если только это не имя собственное.

#### 🟢 de `/vitamins/screen_1/texts` — NEW лучше (2:0)

- **RU**: Мы стремимся, чтобы данный раздел максимально помог вам улучшить и облегчить ваше эмоциональное состояние. Поэтому важно обсудить все возможные причины его изменений. Когда речь заходит о депрессии, мы имеем в виду набор определённых симптомов, которые были уп…
- **OLD**: Unser Ziel ist es, Sie bestmöglich dabei zu unterstützen, Ihren emotionalen Zustand zu verbessern und zu stabilisieren. Daher ist es wichtig, alle möglichen Ursachen für Veränderungen in Ihrem Befinden zu betrachten. Wenn wir von einer Depression sprechen, mei…
- **NEW**: Unser Ziel ist es, Ihnen mit diesem Abschnitt bestmöglich dabei zu helfen, Ihr emotionales Befinden zu verbessern und zu stabilisieren. Deshalb ist es wichtig, alle möglichen Ursachen für Veränderungen Ihrer Stimmung zu betrachten. Wenn wir von einer Depressio…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Перевод A точнее передает оригинал и сохраняет все смысловые части, тогда как в переводе B допущены существенные пропуски (отсутствуют фразы «данный раздел» и «которые были упомянуты ранее»).
  - [new/omission/minor] В самом конце текста пропущено «и другие» (список завершается через союз «oder», что сужает смысл).
  - [new/style/minor] Конструкция «Man sollte bedenken» использует безличное «man», что противоречит рекомендациям избегать его вне словарных определений (лучше было бы «Bedenken Sie, dass...»).
  - [old/omission/major] Пропущено упоминание «данный раздел» в первом абзаце.
  - [old/omission/major] Полностью пропущено придаточное предложение «которые были упомянуты ранее» во втором абзаце.
  - [old/addition/minor] Внутрь HTML-тега <q> добавлены типографские кавычки, хотя в оригинале их нет, а тег сам по себе подразумевает визуальное выделение цитаты.
  - [old/style/minor] Как и в варианте А, использована нежелательная безличная конструкция «Man sollte bedenken».
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 74 / NEW 84)
  - Перевод B значительно точнее и не теряет важные части текста, тогда как перевод A пропустил фразы «данный раздел» и «которые были упомянуты ранее». При этом оба перевода нарушили строгое правило об избегании безличного местоимения «man» вне словарей.
  - [old/omission/major] Полностью пропущены фразы «данный раздел» (в первом предложении) и «которые были упомянуты ранее» (во втором абзаце).
  - [old/style/major] Использование «Man sollte bedenken» нарушает правило об обязательном использовании «Sie» во всем интерфейсе (следовало использовать «Bedenken Sie, dass...» или «Es ist wichtig zu bedenken, dass...»).
  - [old/addition/minor] Добавлены типографские кавычки („ “) внутрь тега <q>, что при рендеринге HTML приведет к их дублированию (в оригинале внутри тега их нет).
  - [new/style/major] Использование безличного «Man sollte bedenken» нарушает правило об избегании формы «man» в пользу вежливого обращения «Sie» или нейтральных конструкций.
  - [new/omission/minor] В самом конце списка расстройств упущено «и другие» (написано просто «oder Verwirrtheitszustände» вместо «und andere»).

#### 🔴 de `/vitamins/title` — OLD лучше (2:0)

- **RU**: Ложная депрессия: Как гормоны и витамины влияют на наше эмоциональное здоровье
- **OLD**: Pseudo-Depression: Wie Hormone und Vitamine unsere emotionale Gesundheit beeinflussen
- **NEW**: Scheinbare Depression: Wie Hormone und Vitamine unsere emotionale Gesundheit beeinflussen
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Термин «Pseudo-Depression» является устоявшимся в немецком языке для обозначения соматогенных депрессивноподобных состояний, и в заголовках звучит ярче и профессиональнее, чем описательное «Scheinbare Depression».
  - [new/style/minor] «Scheinbare Depression» звучит слишком описательно и менее удачно для цепляющего заголовка статьи, чем «Pseudo-Depression».
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Термин «Pseudo-Depression» звучит профессиональнее, естественнее и хлестче для заголовка статьи о здоровье, тогда как «Scheinbare Depression» кажется слишком описательным и менее идиоматичным.
  - [new/style/minor] Описательная конструкция «Scheinbare Depression» проигрывает в емкости составному существительному (Pseudodepression / Pseudo-Depression), которое ожидается в немецком заголовке на эту тему.

#### 🟢 de `/vitamins/screen_4/texts` — NEW лучше (2:0)

- **RU**: Другой член команды, девушка, испытывавшая симптомы, похожие на депрессию, выявила железо-дефицитную анемию, лечение которой привело к значительному улучшению её состояния. Она описывала своё состояние следующим образом: «Я постоянно хотела спать, мне ничего н…
- **OLD**: Ein weiteres Teammitglied, eine junge Frau, die Symptome ähnlich einer Depression verspürte, stellte eine Eisenmangelanämie fest. Die Behandlung führte zu einer erheblichen Verbesserung ihres Zustands. Sie beschrieb ihren Zustand so: „Ich war ständig schläfrig…
- **NEW**: Ein weiteres Teammitglied, eine junge Frau, die Symptome einer Depression verspürte, stellte fest, dass sie an Eisenmangelanämie litt. Die Behandlung führte zu einer deutlichen Besserung ihres Zustands. Sie beschrieb ihren Zustand so: „Ich war ständig müde, ha…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Перевод B звучит гораздо естественнее, эмпатичнее и использует живые разговорные обороты («mein altes Ich wiedergefunden»), в то время как A звучит сухо и содержит кальки. Кроме того, B логичнее передает смысл обнаружения болезни, тогда как в A героиня будто сама ставит диагноз как врач.
  - [old/style/major] Фраза «in meinen ursprünglichen Zustand zurückgekehrt» — калька, звучит механистично и неестественно для личного рассказа (у B отличный вариант «mein altes Ich wiedergefunden»).
  - [old/mistranslation/major] Конструкция «stellte eine Eisenmangelanämie fest» означает, что девушка сама констатировала диагноз (выступила в роли врача). В B это переведено корректно: «stellte fest, dass sie an... litt».
  - [old/addition/minor] Некорректное оформление многоабзацной цитаты: прямая речь необоснованно закрыта кавычками в конце второго абзаца и открыта заново в третьем, разбивая единую реплику.
  - [new/omission/minor] Пропущено уточнение «похожие на» — «симптомы, похожие на депрессию» переведено просто как «Symptome einer Depression» (лучше было бы использовать «depressionsähnliche Symptome»).
  - [new/style/minor] В третьем абзаце (продолжение цитаты) пропущена открывающая кавычка („), которая по правилам немецкой типографики должна стоять в начале каждого нового абзаца продолжающейся прямой речи.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Перевод A звучит гораздо естественнее, эмпатичнее и больше похож на текст, написанный носителем языка. Перевод B страдает от канцелярских калек и необоснованного разрыва цитаты.
  - [new/omission/minor] Упущено словосочетание «похожие на» в первой фразе («Symptome einer Depression» вместо «Symptome ähnlich einer Depression»).
  - [old/style/major] Фраза «bin ich wieder in meinen ursprünglichen Zustand zurückgekehrt» — механистичная калька с русского; текст теряет поддерживающий эмоциональный тон.
  - [old/addition/minor] Вставлены лишние кавычки при переходе на новый абзац внутри одной непрерывной цитаты.
  - [old/style/minor] Слово «Erschöpfbarkeit» звучит слишком академично и клинически для данного контекста.

#### 🟡 de `/vitamins/screen_2/texts`— вердикт неустойчив

- **RU**: В середине 20 века возникла целая научная дисциплина - психоэндокринология, изучающая взаимосвязь между эндокринной системой человека и его психикой. Есть даже такой термин, психоэндокринный синдром – это нарушение психики, возникающие на фоне эндокринных забо…
- **OLD**: Mitte des 20. Jahrhunderts entstand mit der Psychoneuroendokrinologie eine eigene wissenschaftliche Disziplin, die den Zusammenhang zwischen dem endokrinen System des Menschen und seiner Psyche untersucht. Es gibt sogar den Begriff des psychoneuroendokrinen Sy…
- **NEW**: Mitte des 20. Jahrhunderts entstand mit der Psychoneuroendokrinologie eine eigene wissenschaftliche Disziplin, die den Zusammenhang zwischen dem endokrinen System und der Psyche untersucht. Es gibt sogar den Begriff des psychoneuroendokrinen Syndroms – eine ps…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 93 / NEW 86)
  - Перевод А точнее передает детали оригинала, сохраняет грамматическую связность во втором абзаце и строго следует глоссарию. Перевод В нарушает глоссарий и содержит мелкие смысловые неточности.
  - [new/terminology/major] Использовано слово «Angstzuständen» вместо утвержденного глоссарием базового термина «Angst».
  - [new/mistranslation/minor] Слово «некоторыми» (заболеваниями) переведено как «bestehenden» (существующими) вместо «bestimmten».
  - [new/omission/minor] В первом предложении опущено «человека и его» (des Menschen und seiner).
  - [old/style/minor] Использование неопределенных артиклей («Ein Vitaminmangel und eine Depression») звучит чуть менее естественно, чем без них, а «als wir vermuten könnten» — легкая калька с русского «чем мы могли предполагать» (вариант B с «man» и без артиклей здесь удачнее).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 93)
  - Перевод A звучит естественнее для носителя: он использует более гладкие синтаксические конструкции (например, опускает лишние неопределенные артикли перед абстрактными понятиями) и удачно разбивает сложное предложение на два. Перевод B чуть точнее лексически, но содержит стилистические кальки с русского и более тяжеловесен.
  - [new/terminology/minor] Слово «тревога» переведено как «Angstzustände», хотя глоссарий предписывает использовать базовый термин «Angst».
  - [new/mistranslation/minor] Слово «некоторыми» (заболеваниями) переведено как «bestehenden» (существующими), а не «bestimmten».
  - [new/mistranslation/minor] «Психическое здоровье» переведено как «psychische Wohlbefinden» (благополучие), точнее было бы «psychische Gesundheit» (как в B).
  - [old/style/minor] Лишние артикли «Ein Vitaminmangel und eine Depression» утяжеляют фразу, для абстрактных понятий в данном контексте естественнее нулевой артикль (как в А).
  - [old/style/minor] Калька с русского «als wir vermuten könnten» — в немецком в таких обобщениях органичнее звучит безличная конструкция с man (как в А).
  - [old/mistranslation/minor] «Пугающих симптомов» переведено как «belastenden» (обременяющих, тягостных). Теряется оттенок страха, лучше подошло бы «beängstigenden» (как в А).
  - [old/style/minor] Очень громоздкая конструкция в 8-м абзаце из-за попытки объединить всё в одно предложение с союзом «sowie».

#### 🟢 de `/unemployment/screen_2/texts` — NEW лучше (2:0)

- **RU**: Если и вы так считаете, то вам будет интересен случай Александра — 47-летнего отца троих детей, который проработал 17 лет с отцом своей жены в одной успешной компании. За пару лет до его депрессии между ним и его тестем возникли разногласия по поводу управлени…
- **OLD**: Wenn Sie so denken, könnte der Fall von Alexander für Sie interessant sein – ein 47-jähriger Vater von drei Kindern, der 17 Jahre lang in demselben erfolgreichen Unternehmen arbeitete wie der Schwiegervater seiner Frau. Einige Jahre vor seiner Depression kam e…
- **NEW**: Wenn Sie so denken, könnte der Fall von Alexander für Sie interessant sein. Der 47-jährige Vater von drei Kindern arbeitete 17 Jahre lang gemeinsam mit dem Schwiegervater seiner Frau in demselben erfolgreichen Unternehmen. Einige Jahre vor seiner Depression ka…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 74 / NEW 82)
  - Оба перевода допустили комичную логическую ошибку, переведя «отец жены» как «свёкор жены» (Schwiegervater seiner Frau). Однако перевод A точнее передал смысл, тогда как B ошибся в конструкции (arbeitete wie вместо mit) и допустил стилистические огрехи.
  - [new/mistranslation/major] «Schwiegervater seiner Frau» означает свёкра жены, то есть родного отца Александра. Следовало использовать «seinem Schwiegervater» или «dem Vater seiner Frau».
  - [new/style/minor] Множественное число «die depressiven Zustände» звучит чуть менее естественно для описания нарастающего состояния, чем единственное.
  - [old/mistranslation/major] Аналогичная логическая ошибка с «Schwiegervater seiner Frau».
  - [old/mistranslation/major] Фраза «arbeitete ... wie» означает «работал так же, как (его тесть)», что искажает оригинал «проработал с (тестем)».
  - [old/style/minor] Приложение после датива «von Alexander» стилистически лучше согласовывать в падеже («einem 47-jährigen Vater»), а не оставлять в именительном падеже через оторванное тире.
  - [old/other/minor] Замена местоимения «он» (обеспеченный друг) на «der Kunde» излишне формализует текст и стирает изначальный контекст личного знакомства.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 76 / NEW 88)
  - Оба перевода допустили одинаковую курьезную ошибку («Schwiegervater seiner Frau» — свекор жены, т.е. родной отец Александра). Однако вариант B значительно превосходит А стилистически: он удачно разбивает первое предложение, использует живые, естественные обороты («wechselte ständig den Job», «zögerte wochenlang») и читается гладко, как оригинальный текст.
  - [old/mistranslation/major] «Schwiegervater seiner Frau» означает «свёкор жены» (т.е. отец самого Александра). Оригинал «с отцом своей жены» (тесть) следовало перевести как «mit dem Vater seiner Frau» или «mit seinem Schwiegervater».
  - [old/style/major] Синтаксический сбой в первом предложении: после датива «von Alexander» идет несогласованное приложение в номинативе «ein 47-jähriger Vater...». Кроме того, оборот «arbeitete... wie der...» искажает смысл (получается «работал так же, как...» вместо «работал вместе с»).
  - [old/style/minor] Конструкция «wechselte er eine Stelle nach der anderen» звучит неестественно; глагол wechseln обычно не используется в такой связке.
  - [old/mistranslation/minor] В последнем абзаце «он» (друг) переведено как «der Kunde» (клиент), что немного меняет акцент.
  - [new/mistranslation/major] Аналогичная ошибка: «Schwiegervater seiner Frau» (свёкор жены) вместо «mit dem Vater seiner Frau» / «mit seinem Schwiegervater» (с тестем).
  - [new/style/minor] Множественное число «die depressiven Zustände» в данном контексте звучит несколько тяжеловесно и клинически; естественнее использовать единственное «sein depressiver Zustand».

#### 🟢 de `/unemployment/screen_4/texts` — NEW лучше (2:0)

- **RU**: Таким образом, хоть и внешние признаки успеха за это время оставались практически неизменными, он смог сохранить свою самооценку и избежать депрессии. Несмотря на то, что его финансовое положение оставалось тяжелым, когда он пришел к решению «признать поражени…
- **OLD**: So konnte er, obwohl sich seine äußeren Lebensumstände in dieser Zeit kaum veränderten, seinen Selbstwert bewahren und eine Depression verhindern. Obwohl seine finanzielle Lage schwierig blieb, als er die Entscheidung traf, sein Buchgeschäft „aufzugeben“, blie…
- **NEW**: Obwohl die äußeren Anzeichen von Erfolg in dieser Zeit praktisch unverändert blieben, gelang es ihm dennoch, sein Selbstwertgefühl zu bewahren und eine Depression zu vermeiden. Selbst als seine finanzielle Lage schwierig blieb und er die Entscheidung traf, sei…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Перевод A точнее передает детали оригинала, сохраняет гладкий синтаксис и звучит более естественно. Перевод B содержит грубую синтаксическую ошибку в построении придаточного предложения и необоснованные смысловые вольности.
  - [old/style/major] Фраза «diesen Essay, den er beschloss... erneut zu lesen» синтаксически неестественна для немецкого языка (встраивание инфинитивного оборота в относительное придаточное таким образом звучит как калька с английского).
  - [old/mistranslation/major] Оригинальное «внешние признаки успеха» заменено на «äußere Lebensumstände» (внешние жизненные обстоятельства), что смещает смысловой акцент.
  - [old/mistranslation/minor] «признать поражение» переведено просто как «aufzugeben» (сдаться/забросить), из-за чего теряется заложенная в кавычки метафора.
  - [old/style/minor] Непоследовательный перевод слова «Если»: в одних пунктах списка используется «Wenn», в других произвольно заменено на «Solange».
  - [new/mistranslation/minor] Фраза «sein Buchgeschäft als „Niederlage zu akzeptieren“» структурно звучит так, будто он признал сам книжный магазин поражением, а не принял поражение в своем бизнесе.
  - [new/omission/minor] Слова «решил перечитывать» упрощены до «lesen wollte» (хотел читать) — немного теряется нюанс твердо принятого решения.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 91)
  - Оба перевода хороши, но вариант B точнее передаёт лексику оригинала (сохранён «успех», удачно использовано «Selbstrespekt unerschüttert») и избегает синтаксической кальки в конструкции с «решил перечитывать». Однако у B есть шероховатость с порядком слов в последнем предложении.
  - [old/style/major] Синтаксическая калька: конструкция «den er beschloss, ... zu lesen» звучит неестественно в немецком (Verschränkung). Вариант B («das er ... lesen wollte») решает эту проблему гораздо изящнее, соблюдая правило 7 (перевод смысла, а не каркаса).
  - [old/mistranslation/major] Фраза «внешние признаки успеха» переведена как «äußere Lebensumstände» (жизненные обстоятельства). Полностью потерян акцент на успехе.
  - [old/style/minor] Непоследовательность: одинаковое начало пунктов с «Если» переводится вразнобой — то «Solange», то «Wenn».
  - [old/mistranslation/minor] Замена в цитате: «признать поражение» переведено как «aufzugeben» (сдаться), что немного меняет акцент оригинала.
  - [new/style/major] Эффект обманутого ожидания в последнем предложении: «oder Sie Alexanders automatische Gedanken ansprechen». Так как в первой части «Sie» было подлежащим, читатель и здесь воспринимает его как Nominativ («или вы обращаетесь к мыслям»). Лучше, как в А: «oder Alexanders automatische Gedanken Sie ansprechen».
  - [new/omission/minor] Слово «перечитывать» переведено просто как «lesen», потерян оттенок регулярного повторения (не хватает «erneut» или «immer wieder»).

#### 🟢 de `/trap/description` — NEW лучше (2:0)

- **RU**: В статье рассматривается проблема чувства вины, возникающего из-за нереалистичных требований к себе и постоянной самокритики. Описываются методы переосмысления внутренних установок и замены «долженствования» на более здоровое восприятие личных возможностей и ж…
- **OLD**: In diesem Artikel geht es um das Schuldgefühl, das durch unrealistische Ansprüche an sich selbst und ständige Selbstkritik entsteht. Wir beschreiben Methoden, wie Sie Ihre inneren Überzeugungen neu bewerten und das starre „Müssen“ durch eine gesündere Sicht au…
- **NEW**: Dieser Artikel beschäftigt sich mit Schuldgefühlen, die durch unrealistische Selbstansprüche und ständige Selbstkritik entstehen. Wir zeigen Ihnen, wie Sie Ihre inneren Überzeugungen überdenken und das starre „Muss“ durch eine gesündere Sichtweise auf Ihre Mög…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Перевод A лучше адаптирует канцелярский стиль оригинала под требуемый эмпатичный тон, избавляясь от абстрактных существительных. Перевод B звучит суше и сохраняет академичные конструкции.
  - [old/style/minor] Фраза «Wir beschreiben Methoden» (прямая калька с «описываются методы») звучит слишком сухо и академично для поддерживающего терапевтического текста. Вариант А («Wir zeigen Ihnen, wie Sie...») более удачно разворачивает это в личную формулировку согласно правилам.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод B звучит более естественно и лучше адаптирован к стилистике немецких текстов по самопомощи. Использование множественного числа «Schuldgefühlen» более идиоматично, а замена пассивной конструкции с «методами» на глагольную «Wir zeigen Ihnen, wie Sie...» (правило 9) делает текст теплее и ближе к читателю.
  - [old/style/minor] Единственное число «das Schuldgefühl» звучит менее естественно, чем множественное «Schuldgefühle» для общего описания эмоции; фраза «Wir beschreiben Methoden» сохраняет легкий оттенок канцелярита оригинала.

