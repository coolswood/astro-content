# QA: слепое парное сравнение переводов — stage-model-de-sociophobia

- **Дата**: 2026-09-20T10:47:37.360Z
- **Метка**: stage-model-de-sociophobia
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/de-stage-model-baseline
- **Файлы**: tests/sociophobia.json
- **Локали**: de
- **Сэмпл/файл**: 15
- **Seed**: 20260920
- **Min-chars**: 0
- **Модель**: gemini-3.1-pro-high
- **Endpoint**: http://127.0.0.1:8107/v1
- **git HEAD**: 418c535898ff6dbd7e9ac63ae32e3a50018d13c4

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/sociophobia.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 15 | 🟢 5 | 🔴 6 | ⚪ 2 | 🟡 2 | 0 / 0 | 45% |
| **итого** | 15 | 🟢 5 | 🔴 6 | ⚪ 2 | 🟡 2 | 0 / 0 | 45% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×7, mistranslation/minor×1; OLD — style/minor×4, style/major×2, omission/major×1, terminology/minor×1, omission/minor×1

### Детали пар (для спот-чека)

#### ⚪ de `/result/mild/title`— ничья (2:0)

- **RU**: Умеренная социальная тревожность
- **OLD**: Moderate soziale Angst
- **NEW**: Mäßige soziale Angst
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 95 / NEW 95)
  - Оба варианта грамматически и стилистически корректно передают степень выраженности симптома. В интерфейсах и результатах тестов слова «moderat» и «mäßig» используются одинаково часто и естественно (наряду с более клиническим «mittelgradig»).
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 96 / NEW 96)
  - Оба перевода абсолютно корректны и звучат естественно. Слово «mäßig» традиционно используется в немецких психологических и медицинских шкалах для обозначения умеренной степени, а «moderat» выступает отличным и однозначным синонимом в данном контексте.

#### 🟢 de `/steps_description/2/text` — NEW лучше (2:0)

- **RU**: Одним из ключевых аспектов социофобии является страх социальных взаимодействий с незнакомыми людьми. Это может проявляться в избегании контактов, стремлении быть незаметным и в чувстве неловкости или тревоги.
- **OLD**: Ein zentraler Aspekt der sozialen Phobie ist die Angst vor Interaktionen mit fremden Menschen. Dies kann sich durch das Vermeiden von Kontakten, das Bestreben, unauffällig zu bleiben, oder durch Gefühle von Unbehagen äußern.
- **NEW**: Ein zentraler Aspekt der sozialen Phobie ist die Angst vor Interaktionen mit fremden Menschen. Dies kann sich durch das Vermeiden von Kontakten, das Bestreben, unauffällig zu bleiben, oder durch Gefühle von Unbehagen oder Angst äußern.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Перевод A точен и полностью передает смысл оригинала. В переводе B пропущен перевод слов «или тревоги» (oder Angst), что является грубой потерей смысла (omission).
  - [old/omission/major] В конце предложения пропущен перевод фрагмента «или тревоги» (oder Angst).
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 96)
  - Перевод B полностью и точно передаёт смысл оригинала, тогда как вариант A содержит критическое упущение — в конце предложения потерян перевод слов «или тревоги».
  - [old/omission/major] Пропущен перевод фрагмента «или тревоги» (oder Angst) в конце предложения.

#### 🔴 de `/steps_description/25/text` — OLD лучше (2:0)

- **RU**: Люди с социофобией часто избегают телефонных разговоров в присутствии других людей из-за страха быть услышанными и оцененными. Они могут беспокоиться о том, как звучит их голос, о возможных ошибках в речи или о том, что их разговор вызовет негативную реакцию у…
- **OLD**: Menschen mit sozialer Phobie vermeiden oft Telefonate in Anwesenheit anderer, weil sie fürchten, gehört und bewertet zu werden. Sie machen sich vielleicht Sorgen darüber, wie ihre Stimme klingt, über mögliche Versprecher oder darüber, dass ihr Gespräch eine ne…
- **NEW**: Menschen mit sozialer Phobie vermeiden oft Telefonate in Anwesenheit anderer, aus Angst, gehört und bewertet zu werden. Sie machen sich vielleicht Sorgen darüber, wie ihre Stimme klingt, über mögliche Fehler beim Sprechen oder darüber, dass ihr Gespräch eine n…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 93)
  - Оба перевода высокого качества, однако вариант B выигрывает благодаря использованию очень естественного и емкого слова «Versprecher» для передачи «ошибок в речи», что звучит более по-немецки.
  - [new/style/minor] Фраза «Fehler beim Sprechen» верна, но немного громоздка; слово «Versprecher» точнее и естественнее отражает речевые ошибки (оговорки).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 97 / NEW 92)
  - Перевод A написан более идиоматично (использует меткое слово «Versprecher») и безупречен пунктуационно, тогда как в B допущена лишняя запятая перед предложным оборотом.
  - [new/style/minor] Лишняя запятая перед 'aus Angst' (предложное дополнение не должно обособляться). Также 'Fehler beim Sprechen' грамматически верно, но звучит чуть тяжеловеснее, чем естественное 'Versprecher'.

#### 🟢 de `/steps_description/38/text` — NEW лучше (2:0)

- **RU**: Люди с социофобией часто предпочитают гулять в часы, когда на улице мало людей или их совсем нет. Это помогает им избежать социальных взаимодействий, которые могут вызывать тревогу и стресс.
- **OLD**: Menschen mit sozialer Phobie ziehen es oft vor, zu Zeiten spazieren zu gehen, wenn wenig oder gar keine Menschen auf der Straße sind. Dies hilft ihnen, soziale Interaktionen zu vermeiden, die Angst und Stress auslösen könnten.
- **NEW**: Menschen mit sozialer Phobie gehen oft lieber spazieren, wenn wenig oder gar keine Menschen auf der Straße sind. Dies hilft ihnen, soziale Interaktionen zu vermeiden, die Angst und Stress auslösen könnten.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Перевод B звучит гораздо естественнее и легче благодаря использованию разговорной конструкции «lieber etwas tun» вместо тяжеловесного и громоздкого оборота «es vorziehen, zu tun».
  - [old/style/minor] Конструкция «ziehen es oft vor, zu Zeiten spazieren zu gehen» — это структурная калька с русского; она звучит сухо и академично. Вариант B решает эту проблему.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 93)
  - Вариант А звучит гораздо естественнее благодаря использованию «lieber spazieren gehen». Вариант Б использует более формальную и тяжеловесную конструкцию «ziehen es vor, zu Zeiten spazieren zu gehen», которая копирует структуру русского оригинала.
  - [old/style/minor] Конструкция «ziehen es vor, zu Zeiten spazieren zu gehen» перегружена и звучит как калька с русского «предпочитают гулять в часы».

#### 🟡 de `/result/mild/text`— вердикт неустойчив

- **RU**: Ваши ответы указывают на то, что в некоторых социальных ситуациях вы можете испытывать напряжение или неуверенность. Общение с незнакомыми людьми, выступления или внимание со стороны могут быть для вас стрессовыми. Это довольно распространённое состояние, и пр…
- **OLD**: Ihre Antworten deuten darauf hin, dass Sie in bestimmten sozialen Situationen Anspannung oder Unsicherheit verspüren können. Der Umgang mit fremden Menschen, Auftritte oder das Gefühl, im Mittelpunkt zu stehen, können für Sie stressig sein. Dies ist ein recht …
- **NEW**: Ihre Antworten deuten darauf hin, dass Sie in bestimmten sozialen Situationen Anspannung oder Unsicherheit verspüren können. Der Umgang mit fremden Menschen, Auftritte oder das Gefühl, im Mittelpunkt zu stehen, können für Sie stressig sein. Dies ist ein recht …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 95)
  - Оба перевода отличные, но вариант А читается чуть более естественно и тепло благодаря элегантному уходу от повтора союзов без использования канцелярских слов.
  - [old/style/minor] Использование союза «sowie» для ухода от повторения «und» делает фразу чуть более официальной и сухой, что слегка выбивается из поддерживающего тона.
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 92 / NEW 92)
  - Оба перевода практически идентичны, грамотны и хорошо передают оригинальный смысл. Разница заключается лишь в пунктуации и выборе союзов в последнем предложении, что не делает ни один из вариантов явно лучше другого.
  - [old/style/minor] Союз «sowie» может звучать слегка официально (канцелярски) для поддерживающего и эмпатичного текста.
  - [new/style/minor] Точка с запятой делает ритм предложения чуть более сухим и книжным, что немного отходит от разговорно-поддерживающего тона.

#### 🔴 de `/steps_description/35/text` — OLD лучше (2:0)

- **RU**: Исследования показывают, что когнитивно-поведенческая терапия (КПТ) может быть очень эффективной в лечении социальной тревожности. КПТ помогает людям изменить негативные мысли и развить более позитивное отношение к социальным взаимодействиям.
- **OLD**: Studien zeigen, dass die Kognitive Verhaltenstherapie (KVT) bei der Behandlung von sozialer Angst sehr wirksam sein kann. Die KVT hilft Menschen dabei, negative Gedanken zu verändern und eine positivere Einstellung zu sozialen Interaktionen zu entwickeln.
- **NEW**: Studien zeigen, dass die Kognitive Verhaltenstherapie (KVT) bei der Behandlung von sozialer Angst sehr effektiv sein kann. Die KVT hilft Menschen dabei, negative Gedanken zu verändern und eine positivere Einstellung zu sozialen Interaktionen zu entwickeln.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 95)
  - Оба перевода очень хороши и точны. Вариант A немного выигрывает за счет использования слова «wirksam», которое в терапевтическом контексте (оценка методов лечения) звучит более естественно и профессионально, чем «effektiv».
  - [new/style/minor] Использование «effektiv» допустимо, но для описания действенности терапии и лекарств традиционно предпочтительнее «wirksam» (Wirksamkeit).
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 96)
  - Оба перевода почти идентичны и превосходны, но вариант B использует слово «wirksam», которое в медицинском и терапевтическом контексте звучит чуть более естественно и профессионально для описания действия терапии, чем «effektiv».
  - [new/style/minor] Слово «effektiv» допустимо, но для описания успешного результата лечения носители чаще предпочитают «wirksam» (соответственно, Wirksamkeit).

#### 🟡 de `/steps_description/16/text`— вердикт неустойчив

- **RU**: Психологи называют страх перед неизвестностью "интолерантностью к неопределенности". Это состояние может влиять не только на социальные ситуации, но и на принятие решений в целом.
- **OLD**: Psychologen bezeichnen die Angst vor dem Unbekannten als „Intoleranz gegenüber Unsicherheit“. Dieser Zustand kann sich nicht nur auf soziale Situationen auswirken, sondern auch auf die allgemeine Entscheidungsfindung.
- **NEW**: Psychologen nennen die Angst vor dem Unbekannten „Intoleranz gegenüber Ungewissheit“. Dieser Zustand kann sich nicht nur auf soziale Situationen auswirken, sondern auch auf die allgemeine Entscheidungsfindung.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Оба перевода звучат естественно, но вариант B использует более точный и устоявшийся в психологии термин «Intoleranz gegenüber Ungewissheit» (Intolerance of Uncertainty).
  - [old/terminology/minor] Слово «Unsicherheit» менее точно, так как часто означает «неуверенность» или «небезопасность». Стандартный перевод термина — «Intoleranz gegenüber Ungewissheit» или «Ungewissheitsintoleranz».
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 93)
  - Die Formulierung „bezeichnen ... als“ ist für die Einführung von Fachbegriffen im Deutschen stilistisch eleganter als „nennen“. Zudem knüpft „Unsicherheit“ direkt an den in der Fachliteratur etablierten Begriff der „Unsicherheitsintoleranz“ an.
  - [new/style/minor] „nennen“ (als direkte Übersetzung von „называют“) wirkt bei einer fachlichen Definition leicht umgangssprachlich im Vergleich zu „bezeichnen als“.

#### 🟢 de `/steps_description/7/fact` — NEW лучше (2:0)

- **RU**: Техники активного слушания могут помочь людям чувствовать себя увереннее на совещаниях. Например, сосредоточение на слушании и подготовка вопросов или комментариев заранее могут помочь снизить тревогу и улучшить участие в обсуждениях.
- **OLD**: Techniken des aktiven Zuhörens können Ihnen helfen, sich in Meetings sicherer zu fühlen. Wenn Sie sich beispielsweise darauf konzentrieren zuzuhören und Fragen oder Kommentare im Voraus vorbereiten, kann dies helfen, die Angst zu senken und die Teilnahme an Di…
- **NEW**: Techniken des aktiven Zuhörens können Ihnen helfen, sich in Meetings sicherer zu fühlen. Wenn Sie sich beispielsweise auf das Zuhören konzentrieren und Fragen oder Kommentare vorab vorbereiten, kann dies helfen, die Angst zu senken und die Teilnahme an Diskuss…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 82)
  - Вариант B читается намного легче благодаря стройному синтаксису: использование «auf das Zuhören konzentrieren» позволяет четко связать глаголы «konzentrieren» и «vorbereiten». Вариант A путает читателя из-за отсутствия запятых вокруг инфинитивного оборота «zuzuhören». При этом оба варианта содержат стилистические кальки в конце предложения.
  - [old/style/major] Неудачная структура «darauf konzentrieren zuzuhören und... vorbereiten» без обособления запятыми ломает ритм и запутывает чтение.
  - [old/style/minor] «Angst senken» — неестественная лексическая сочетаемость (страх лучше «Angst abbauen» или «Angst reduzieren»).
  - [old/style/minor] «Teilnahme an Diskussionen zu verbessern» — калька. Естественнее звучит «sich aktiver an Diskussionen zu beteiligen».
  - [new/style/minor] «Angst senken» — неестественная лексическая сочетаемость (лучше «Angst abbauen» или «Angst reduzieren»).
  - [new/style/minor] «Teilnahme an Diskussionen zu verbessern» — калька. Естественнее звучит «sich aktiver an Diskussionen zu beteiligen».
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 90)
  - Вариант А звучит более гладко благодаря естественной конструкции «auf das Zuhören konzentrieren», тогда как в В инфинитивный оборот без запятых («darauf konzentrieren zuzuhören») слегка сбивает ритм чтения. В обоих вариантах есть стилистическая тавтология (vorab/im Voraus vorbereiten), но в А синтаксис ровнее.
  - [new/style/minor] Плеоназм «vorab vorbereiten» (глагол уже содержит значение «заранее»), лучше просто «vorbereiten».
  - [old/style/minor] Инфинитивная конструкция «darauf konzentrieren zuzuhören» без выделения запятыми ухудшает читаемость.
  - [old/style/minor] Плеоназм «im Voraus vorbereiten».

#### 🔴 de `/steps_description/18/text` — OLD лучше (2:0)

- **RU**: Страх перед телефонными звонками получил название "телефонофобия". Это явление становится все более распространенным в эпоху цифровых коммуникаций, когда люди привыкают к текстовому общению.
- **OLD**: Die Angst vor Telefonaten wird als „Telefonophobie“ bezeichnet. Dieses Phänomen tritt im Zeitalter der digitalen Kommunikation immer häufiger auf, da sich viele Menschen an die textbasierte Kommunikation gewöhnen.
- **NEW**: Die Angst vor Telefonaten wird als „Telephonophobie“ bezeichnet. Dieses Phänomen wird im Zeitalter der digitalen Kommunikation immer häufiger, da sich viele Menschen an die textbasierte Kommunikation gewöhnen.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Перевод B использует современное написание «Telefonophobie» и более естественную для немецкого языка лексическую сочетаемость («ein Phänomen tritt auf» вместо менее удачного «wird häufiger»).
  - [new/style/minor] Устаревшее написание слова телефон («Telephonophobie» вместо «Telefonophobie») и слегка неестественная конструкция «Phänomen wird häufiger» (лучше использовать глагол auftreten).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 89)
  - Variante A wählt mit „Telefonophobie“ die modernere, korrekte Schreibweise und nutzt mit „tritt auf“ eine für das Wort „Phänomen“ deutlich natürlichere Kollokation als Variante B.
  - [new/style/minor] Die veraltete Schreibweise „Telephonophobie“ (mit ph am Anfang) und die etwas direkter übersetzte, weniger elegante Formulierung „wird häufiger“ in Verbindung mit Phänomen.

#### 🔴 de `/steps_description/4/fact` — OLD лучше (2:0)

- **RU**: Исследования показывают, что около 15 миллионов американцев (примерно 7% населения США) страдают от социофобии, и значительная часть из них предпочитает избегать социальных ситуаций вне своих обязательных ролей.
- **OLD**: Studien zeigen, dass etwa 15 Millionen Amerikaner (ca. 7 % der US-Bevölkerung) an sozialer Phobie leiden, wobei ein erheblicher Teil es vorzieht, soziale Situationen außerhalb ihrer festen Rollen zu vermeiden.
- **NEW**: Studien zeigen, dass etwa 15 Millionen Amerikaner (ca. 7 % der US-Bevölkerung) an sozialer Phobie leiden, wobei ein erheblicher Teil versucht, soziale Situationen außerhalb ihrer festen Rollen zu vermeiden.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Вариант B точно переводит глагол «предпочитает» (es vorzieht), в то время как вариант A заменяет его на «versucht» (пытается), что немного искажает изначальный смысл.
  - [new/mistranslation/minor] Глагол «предпочитает» неточно переведен как «versucht» (пытается) вместо «vorzieht».
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Перевод A точнее передает смысл оригинала благодаря глаголу «vorzieht» (предпочитает), в то время как вариант B использует «versucht» (пытается), что искажает исходный смысл.
  - [new/mistranslation/major] Глагол «предпочитает» переведен как «versucht» (пытается), а не «vorzieht», что меняет заложенный в оригинале смысл.

#### 🟢 de `/variants/4` — NEW лучше (2:0)

- **RU**: Почти никогда Время от времени Довольно часто Почти всегда
- **OLD**: Fast nie Von Zeit zu Zeit Häufig Fast immer
- **NEW**: Fast nie Von Zeit zu Zeit Ziemlich oft Fast immer
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 95)
  - Перевод A точнее передает степень «довольно» с помощью слова «ziemlich», тогда как вариант B упрощает выражение до обычного «часто» (häufig), немного теряя оттенок оригинала.
  - [old/omission/minor] Упущено слово «довольно», переведено просто как «часто» (häufig) вместо «ziemlich oft» или «ziemlich häufig».
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Вариант B точнее передает степень частоты благодаря слову «ziemlich» (довольно), тогда как вариант A использует более общее «Häufig» (часто), теряя оттенок оригинала.
  - [old/omission/minor] Упущено слово «довольно», переведено просто как «часто» (Häufig).

#### 🔴 de `/steps_description/17/text` — OLD лучше (2:0)

- **RU**: Страх перед перед незнакомой аудиторией называется "социальной оценочной тревожностью". Это сочетание страха негативной оценки и боязни новых ситуаций.
- **OLD**: Die Angst vor einem unbekannten Publikum wird als „soziale Bewertungsangst“ bezeichnet. Dies ist eine Kombination aus der Angst vor negativer Bewertung und der Furcht vor neuen Situationen.
- **NEW**: Die Angst vor einem unbekannten Publikum wird als „soziale Bewertungsangst“ bezeichnet. Es ist eine Kombination aus der Angst vor negativer Bewertung und der Furcht vor neuen Situationen.
- Проход [A=NEW, B=OLD]: победитель old, уверенность medium (оценки OLD 96 / NEW 94)
  - Вариант B звучит чуть более связно: указательное местоимение «Dies» лучше отсылает к концепту из предыдущего предложения и стилистически элегантнее обходит конфликт с женским родом существительного (die Angst), чем безличное «Es».
  - [new/style/minor] Использование «Es» для отсылки к понятию («die Angst» / «soziale Bewertungsangst») стилистически чуть слабее, чем «Dies» или «Das», так как может восприниматься как калька с английского «It is».
- Проход [A=OLD, B=NEW]: победитель old, уверенность medium (оценки OLD 96 / NEW 94)
  - Оба перевода точны и звучат естественно. Вариант А немного лучше стилистически: указательное местоимение «Dies» плотнее связывает второе предложение с первым, точнее отсылая к только что введенному понятию.
  - [new/style/minor] Использование нейтрального «Es» делает связь с предыдущим предложением чуть менее выразительной, чем при использовании «Dies» или «Das».

#### 🔴 de `/variants/6` — OLD лучше (2:0)

- **RU**: Спокойно, это лишь чужое мнение Немного расстраиваюсь, но быстро забываю Сильно переживаю, это может испортить мой день Это может вызвать у меня сильную тревогу
- **OLD**: Ruhig, es ist ja nur die Meinung anderer Ich bin etwas enttäuscht, aber ich vergesse es schnell wieder Es belastet mich sehr und kann meinen ganzen Tag ruinieren Das kann bei mir starke Angst auslösen
- **NEW**: Ruhig, es ist nur die Meinung anderer Ich bin etwas enttäuscht, aber ich vergesse es schnell wieder Es belastet mich sehr und kann meinen ganzen Tag ruinieren Das kann bei mir starke Angst auslösen
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 95)
  - Перевод B звучит чуть более естественно за счет добавления модальной частицы 'ja', которая характерна для живой немецкой речи (внутреннего монолога).
  - [new/style/minor] Фраза 'es ist nur' грамматически верна, но 'es ist ja nur' звучит более непринужденно и естественно для данного формата (ответы в тесте/опросе).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 92)
  - Вариант А звучит естественнее в разговорно-психологическом контексте благодаря использованию модальной частицы «ja», которая отлично передает успокаивающий тон оригинала («это ведь всего лишь...»).
  - [new/style/minor] Первая фраза звучит грамматически верно, но чуть более сухо и менее естественно из-за отсутствия смягчающих модальных частиц.

#### ⚪ de `/variants/32`— ничья (2:0)

- **RU**: Почти никогда Иногда Довольно часто Почти всегда
- **OLD**: Fast nie Manchmal Ziemlich häufig Fast immer
- **NEW**: Fast nie Manchmal Ziemlich oft Fast immer
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 98 / NEW 99)
  - Оба варианта отлично подходят для вариантов ответа в опроснике. Разница между «ziemlich häufig» и «ziemlich oft» минимальна, хотя «oft» звучит чуть лаконичнее и естественнее для UI.
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Оба перевода абсолютно корректны и естественно звучат для элементов интерфейса (опросов или шкал частоты). Разница между «oft» и «häufig» в данном контексте ничтожна.

#### 🟢 de `/steps_description/36/text` — NEW лучше (2:0)

- **RU**: Тревога перед сдачей экзамена на практические умения и навыки является распространенной проблемой, особенно среди людей с социофобией. Страх быть оцененным и возможность неудачи могут усиливать стресс и нервозность.
- **OLD**: Die Angst vor Prüfungen praktischer Fähigkeiten ist ein weit verbreitetes Problem, besonders bei Menschen mit sozialer Phobie. Die Furcht, bewertet zu werden, und die Angst vor dem Scheitern können Stress und Nervosität verstärken.
- **NEW**: Die Angst vor praktischen Prüfungen ist ein weit verbreitetes Problem, insbesondere bei Menschen mit sozialer Phobie. Die Furcht, bewertet zu werden, und die Angst vor dem Scheitern können Stress und Nervosität verstärken.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Вариант А звучит гораздо естественнее благодаря использованию лаконичного и привычного для носителей «praktischen Prüfungen». Вариант В использует тяжеловесную кальку «Prüfungen praktischer Fähigkeiten», которая перегружает предложение и выдает перевод.
  - [old/style/major] Фраза «Prüfungen praktischer Fähigkeiten» — тяжеловесная калька с русского; в немецком языке принято более компактное «praktische Prüfungen».
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 90 / NEW 95)
  - Перевод B звучит естественнее благодаря использованию привычного немецкого словосочетания «praktischen Prüfungen», в то время как вариант А предлагает тяжеловесную кальку «Prüfungen praktischer Fähigkeiten».
  - [old/style/minor] Фраза «Prüfungen praktischer Fähigkeiten» грамматически верна, но звучит канцелярски и неестественно; носители языка говорят «praktische Prüfungen».

