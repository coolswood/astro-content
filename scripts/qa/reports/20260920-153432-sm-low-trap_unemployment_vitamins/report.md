# QA: слепое парное сравнение переводов — sm-low-trap_unemployment_vitamins

- **Дата**: 2026-09-20T12:34:32.182Z
- **Метка**: sm-low-trap_unemployment_vitamins
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
| de | 12 | 🟢 8 | 🔴 2 | ⚪ 0 | 🟡 2 | 0 / 1 | 80% |
| **итого** | 12 | 🟢 8 | 🔴 2 | ⚪ 0 | 🟡 2 | 0 / 1 | 80% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×4, style/major×3, mistranslation/minor×3, addition/minor×2, mistranslation/major×1; OLD — style/minor×8, style/major×6, mistranslation/minor×5, addition/minor×2, terminology/minor×2, omission/major×1, terminology/major×1, mistranslation/critical×1, omission/minor×1

### Детали пар (для спот-чека)

#### 🔴 de `/unemployment/screen_1/texts` — OLD лучше (2:0)

- **RU**: Внезапная потеря работы – сильный стресс для большинства людей. Когда за несколько дней или недель объявляют об увольнении или сокращении, многие испытывают ощущение, что жизнь «рухнула». И это объяснимо, ведь у вас кардинально меняются: <li>финансовое положен…
- **OLD**: Ein plötzlicher Jobverlust ist für die meisten Menschen ein enormer Stressfaktor. Wenn man innerhalb weniger Tage oder Wochen erfährt, dass man gekündigt wird oder Stellen abgebaut werden, haben viele das Gefühl, dass ihr Leben „zusammenbricht“. Das ist absolu…
- **NEW**: Ein plötzlicher Jobverlust bedeutet für die meisten Menschen massiven Stress. Wenn man innerhalb weniger Tage oder Wochen die Kündigung oder Entlassung erhält, fühlen sich viele, als würde ihr Leben „zusammenbrechen“. Das ist absolut nachvollziehbar, denn sich…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 91 / NEW 75)
  - Перевод A грамматически корректен и звучит естественно, тогда как в переводе B допущена грубая синтаксическая ошибка перед списком. Перевод A имеет мелкие недочеты (обращение на «ты» в цитате), но в целом значительно качественнее.
  - [old/style/minor] В цитате Боба Марли использовано неформальное обращение «du» (weißt du doch), что нарушает жесткое правило повсеместного использования «Sie».
  - [old/mistranslation/minor] Фраза «Возможен и торг» переведена как «Es folgt oft die Phase...» (часто следует фаза), что теряет изначальный смысл вероятности (возможности).
  - [new/style/major] Грубая синтаксическая ошибка: конструкция «denn sich verändern grundlegend:» грамматически неверна (пропущено безличное местоимение «es» или нарушен порядок слов).
  - [new/addition/minor] Отсебятина и добавление лишних слов, меняющих тон: «oft» (folgt oft Wut), «heftige» (heftige emotionale Reaktion).
  - [new/mistranslation/minor] Вводное слово «Возможен» в предложении про торг проигнорировано: переведено утвердительно «Es folgt die Phase des Verhandelns».
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 88 / NEW 75)
  - Перевод B звучит естественнее и грамматически корректнее, тогда как перевод A содержит грубую синтаксическую ошибку перед списком. При этом B допускает нарушение гайдлайна (использование «du» в цитате), но в целом текст качественнее.
  - [old/style/major] Нарушение правила Tone of Voice: в цитате использовано обращение на «du» («weißt du doch»), хотя инструкция строго требует везде использовать «Sie/Ihre», а в русском оригинале стоит «вы».
  - [old/addition/minor] Внутри HTML-тега <q> добавлены немецкие кавычки „ “, что избыточно, так как сам тег уже подразумевает цитирование (при рендеринге кавычки могут задвоиться).
  - [new/style/major] Грубая синтаксическая ошибка: конструкция «denn sich verändern grundlegend:» невозможна. Пропущено формальное подлежащее (должно быть «denn es verändern sich grundlegend:» или «denn Folgendes verändert sich...»).
  - [new/omission/minor] Упущено усилительное слово «совершенно» в фразе «совершенно пустыми днями» (переведено просто как «mit leeren Tagen», тогда как в B — «mit völlig leeren Tagen»).

#### 🟢 de `/vitamins/screen_3/texts` — NEW лучше (2:0)

- **RU**: Примеры дефицита витаминов и их симптомы: <li>Витамин D: подавленность, тревога, усталость, перепады настроения.</li> <li>Железо: слабость, утомляемость, одышка, головокружение, онемение.</li> <li>Витамин B12: повышенная утомляемость, анемия, бессонница, сниже…
- **OLD**: Beispiele für Vitaminmangel und deren Symptome: <li>Vitamin D: Niedergeschlagenheit, Angst, Müdigkeit, Stimmungsschwankungen.</li> <li>Eisen: Schwäche, Erschöpfbarkeit, Atemnot, Schwindel, Taubheitsgefühle.</li> <li>Vitamin B12: erhöhte Erschöpfbarkeit, Anämie…
- **NEW**: Beispiele für Vitaminmangel und seine Symptome: <li>Vitamin D: Niedergeschlagenheit, Angst, Müdigkeit, Stimmungsschwankungen.</li> <li>Eisen: Schwäche, Erschöpfung, Atemnot, Schwindel, Taubheitsgefühl.</li> <li>Vitamin B12: erhöhte Erschöpfbarkeit, Anämie, Sch…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Перевод A звучит максимально естественно и использует правильную терминологию (Vitaminhaushalt). Перевод B содержит грамматическую ошибку, кальки и несуществующие или крайне редкие прилагательные (vitaminell).
  - [old/style/major] Использование неестественного прилагательного «vitaminelle» (калька с русского). В немецком принято говорить «Vitaminhaushalt» (как в варианте А).
  - [old/style/minor] Канцелярская номинализация «einer Verschlechterung der Stimmung» (нарушение правила против номинализаций), естественнее звучит «schlechter Stimmung».
  - [old/style/major] Грамматическая ошибка в заголовке: «deren Symptome». Слово «Vitaminmangel» — мужского рода в единственном числе, поэтому местоимение должно быть «seine».
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Перевод B звучит гораздо естественнее, в первую очередь благодаря использованию устоявшегося выражения «Hormon- und Vitaminhaushalt» (вместо искусственного и калечного «vitaminelle Gleichgewicht» в A). Также в B правильнее согласовано местоимение в заголовке («seine Symptome» вместо ошибочного «deren»).
  - [old/style/major] Слово «vitaminelle» звучит крайне неестественно; в немецком принято говорить «Vitaminhaushalt» (как в B).
  - [old/style/minor] Грамматическое несогласование в заголовке: «Vitaminmangel» (ед.ч.), но «deren» (отсылает к мн.ч.).
  - [new/style/minor] Стилистический повтор предлога в одном предложении: «leide unter Burnout, da er unter ... litt».
  - [new/terminology/minor] Слово «Beschwerden» (жалобы, недуги) менее точно переводит медицинский термин «расстройств» (Störungen), хотя в поддерживающем контексте это звучит мягче и допустимо.

#### 🟡 de `/unemployment/description`— вердикт неустойчив

- **RU**: Эта статья исследует психологические и социальные последствия внезапной потери работы, рассматривая эмоциональный роллеркостер, который сопровождает такие события. Через личный опыт Александра, долгое время работавшего в успешной компании, рассказывается о бор…
- **OLD**: Dieser Artikel untersucht die psychologischen und sozialen Folgen eines plötzlichen Jobverlusts und beschreibt das emotionale Auf und Ab, das mit solchen Ereignissen einhergeht. Anhand der persönlichen Erfahrung von Alexander, der lange Zeit in einem erfolgrei…
- **NEW**: Dieser Artikel untersucht die psychologischen und sozialen Folgen eines plötzlichen Jobverlusts und beleuchtet das emotionale Auf und Ab, das solche Ereignisse begleiten. Anhand der persönlichen Erfahrung von Alexander, der lange Zeit in einem erfolgreichen Un…
- Проход [A=OLD, B=NEW]: ошибка: HTTP 502: {"error":{"message":"agy exit 3: error: FAILED_PRECONDITION (code 400): User location is not supported for the API use.\nAGY_ERROR: {\"short_error\":\"FAILED_PRECONDITION (code 400): User location is not supported for the API use.\",\"status\":\"INVALID_ARGUMENT\",\"error_code\":400,\"code
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Перевод B звучит естественно и грамматически точен благодаря конструкции «mit etwas einhergehen». В переводе A в первом предложении допущена ошибка согласования глагола, из-за которой искажается смысл.
  - [new/mistranslation/major] В придаточном предложении «das solche Ereignisse begleiten» глагол стоит во множественном числе. Это делает подлежащим «события» (события сопровождают эмоции, а не наоборот, как в оригинале). Для сохранения смысла требовалось единственное число: «das solche Ereignisse begleitet».

#### 🟢 de `/unemployment/title` — NEW лучше (2:0)

- **RU**: Потерять работу и уйти в депрессию?
- **OLD**: Jobverlust und Depression?
- **NEW**: Den Job verlieren und in eine Depression rutschen?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 98)
  - Перевод A отлично передает смысл и сохраняет глагольную структуру оригинала, используя живую и естественную фразу. Перевод B необоснованно прибегает к номинализации, из-за чего текст звучит слишком сухо и канцелярски.
  - [old/style/major] Использование существительных вместо глаголов (номинализация). Это нарушает правило естественного звучания и делает фразу похожей на сухой газетный заголовок, лишая её эмпатичного разговорного тона.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Вариант B сохраняет глагольную структуру оригинала и использует живое, естественное выражение «in eine Depression rutschen», в то время как A звучит слишком сухо и академично из-за неоправданной номинализации.
  - [old/style/major] Замена инфинитивов на существительные (номинализация) лишает фразу динамики и делает её слишком сухой, нарушая требуемый эмпатичный тон.

#### 🟡 de `/unemployment/screen_3/texts`— вердикт неустойчив

- **RU**: Руководство Александра очень хорошо относилось к нему, считали его способным продажником, но он сам относился к себе неоправданно строго. В процессе следующих встреч и работы с мыслями, Александр согласился, что он очень самокритичен к себе, и это никак не пом…
- **OLD**: Die Geschäftsführung schätzte Alexander sehr und hielt ihn für einen fähigen Verkäufer, doch er selbst ging viel zu streng mit sich ins Gericht. Im Laufe der weiteren Sitzungen und der Arbeit mit seinen Gedanken erkannte Alexander, dass er extrem selbstkritisc…
- **NEW**: Die Geschäftsführung schätzte Alexander sehr und hielt ihn für einen fähigen Verkäufer, doch er selbst war unerbittlich streng mit sich. Im Laufe der folgenden Sitzungen und der Arbeit mit seinen Gedanken erkannte Alexander, dass er extrem selbstkritisch war. …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 87 / NEW 93)
  - Перевод А отличается более естественным флоу и изящным синтаксисом (отказ от существительного в пользу глагола 'gescheitert'). В переводе В допущена орфографическая ошибка (заглавная буква в прилагательном) и встречаются стилистические повторы.
  - [new/mistranslation/minor] Фраза «большой проблемой» переведена в превосходной степени («sein größtes Problem»), а «неоправданно строго» — как «unerbittlich streng» (неумолимо/безжалостно), что слегка смещает смысловые акценты.
  - [new/style/minor] Стилистическая шероховатость из-за повтора глагола: «unrealistisch waren und zum Scheitern verurteilt waren» (лучше звучит «unrealistisch und zum Scheitern verurteilt waren»).
  - [old/style/minor] Орфографическая ошибка: прилагательное в словосочетании «eine Alternative Sichtweise» в середине предложения должно писаться со строчной буквы (alternative).
  - [old/style/minor] Стилистический повтор глагола 'war' в третьем абзаце: «Während er ... war, war er ...».
  - [old/style/minor] Сохранение структуры русского существительного («попытка не увенчалась успехом» -> «wäre dieser Versuch gescheitert») звучит тяжелее, чем глагольное решение в варианте А («wäre gescheitert»).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 89)
  - Beide Übersetzungen lesen sich flüssig und natürlich. Übersetzung A gewinnt, da sie psychologische Terminologie passender integriert („Alternative Sichtweise“, „Wertlosigkeit“) und Sinnnuancen exakter beibehält, während B zu leichten inhaltlichen Übertreibungen neigt.
  - [old/style/minor] Leichte Wortwiederholung bei „versucht ... Versuch“; zudem ist „Probejahr“ idiomatischer als das gewählte „Testjahr“.
  - [old/style/minor] Redundantes Hilfsverb „waren“ im Satz „unrealistisch waren und zum Scheitern verurteilt waren“ (dieser stilistische Fehler findet sich auch in B).
  - [new/mistranslation/minor] „größtes Problem“ ist eine unbegründete inhaltliche Steigerung des Originals („большой“ = groß).
  - [new/terminology/minor] Der Begriff „Alternative“ allein ist im KVT-Kontext zu vage; A fängt dies mit dem Begriff „Alternative Sichtweise“ wesentlich professioneller ab.
  - [new/style/minor] Redundantes Hilfsverb „waren“ („unrealistisch waren und ... verurteilt waren“).

#### 🟢 de `/vitamins/screen_1/texts` — NEW лучше (2:0)

- **RU**: Мы стремимся, чтобы данный раздел максимально помог вам улучшить и облегчить ваше эмоциональное состояние. Поэтому важно обсудить все возможные причины его изменений. Когда речь заходит о депрессии, мы имеем в виду набор определённых симптомов, которые были уп…
- **OLD**: Unser Ziel ist es, Sie bestmöglich dabei zu unterstützen, Ihren emotionalen Zustand zu verbessern und zu stabilisieren. Daher ist es wichtig, alle möglichen Ursachen für Veränderungen in Ihrem Befinden zu betrachten. Wenn wir von einer Depression sprechen, mei…
- **NEW**: Unser Ziel ist es, diesen Bereich so zu gestalten, dass er Ihnen hilft, Ihren emotionalen Zustand zu verbessern und zu stabilisieren. Daher ist es wichtig, alle möglichen Ursachen für Veränderungen in Ihrem Befinden zu betrachten. Wenn wir von einer Depression…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 88)
  - Перевод A точнее следует оригиналу и не теряет смысловых блоков, тогда как B пропускает фрагмент предложения и допускает вольности. Оба перевода совершают ошибку, используя запрещенное безличное «man», но A в целом требует меньше правок.
  - [new/style/major] Использование «Man sollte bedenken» нарушает правило о недопустимости безличного «man» (рекомендуется «Bedenken Sie, dass...»).
  - [new/mistranslation/minor] Термин «психических расстройств» в последнем абзаце переведен как «psychische Belastungen» (нагрузки/отягощения), хотя точнее использовать «psychische Störungen».
  - [old/omission/major] Во втором абзаце полностью пропущена часть предложения «которые были упомянуты ранее».
  - [old/style/major] Использование «Man sollte bedenken» нарушает правило о недопустимости безличного «man».
  - [old/addition/minor] В четвертом абзаце добавлено слово «klassisches» (Beispiel), которого нет в оригинале.
  - [old/terminology/minor] Слово «психоэндокринологии» переведено как «Psychoneuroendokrinologie» (с добавлением 'neuro'), хотя есть прямой и точный термин «Psychoendokrinologie».
  - [old/addition/minor] Внутри тега <q> вручную добавлены кавычки, что является избыточным, так как тег сам по себе предназначен для оформления цитат (может вызвать дублирование кавычек при рендеринге).
  - [old/terminology/minor] В последнем абзаце для слова «тревога» использовано «Angstzustände» вместо предписанного глоссарием базового термина «Angst».
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 93)
  - Перевод B значительно точнее передает содержание оригинала, сохраняя все смысловые блоки и соблюдая глоссарий. Перевод A допускает пропуск целого придаточного предложения, вольно обращается со структурой и нарушает терминологию.
  - [old/omission/major] Полностью пропущена часть предложения «которые были упомянуты ранее» (die zuvor erwähnt wurden).
  - [old/omission/minor] Опущено упоминание «данный раздел» в первом предложении (текст неоправданно обобщен).
  - [old/terminology/minor] Нарушение глоссария: термин «тревога» переведен как «Angstzustände» вместо требуемого «Angst».
  - [old/terminology/minor] Неточный термин: вместо «Psychoendokrinologie» (психоэндокринология) использовано «Psychoneuroendokrinologie».
  - [old/addition/minor] Внутрь тега <q> добавлены типографские кавычки „ “, что является ошибкой разметки, так как тег <q> сам по себе семантически выполняет роль кавычек.
  - [new/terminology/minor] Медицинский термин «психических расстройств» переведен чуть мягче как «psychische Belastungen» (вероятно, чтобы избежать тавтологии с endokrinen Störungen, однако точнее было бы использовать Erkrankungen или Störungen).

#### 🔴 de `/vitamins/title` — OLD лучше (2:0)

- **RU**: Ложная депрессия: Как гормоны и витамины влияют на наше эмоциональное здоровье
- **OLD**: Pseudo-Depression: Wie Hormone und Vitamine unsere emotionale Gesundheit beeinflussen
- **NEW**: Scheinbare Depression: Wie Hormone und Vitamine unsere emotionale Gesundheit beeinflussen
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 90)
  - Термин «Pseudo-Depression» звучит профессиональнее и более органично встраивается в формат медицинского или психологического заголовка, чем описательное словосочетание.
  - [new/style/minor] «Scheinbare Depression» грамматически корректно, но звучит громоздко и менее естественно для броского заголовка статьи.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Вариант B использует термин «Pseudo-Depression», который гораздо точнее и профессиональнее отражает медицинский контекст (соматические причины симптомов), чем описательное «Scheinbare Depression».
  - [new/terminology/minor] «Scheinbare Depression» звучит описательно, в то время как в медицинском и околомедицинском контексте (гормоны, витамины) принято использовать приставку «Pseudo-».

#### 🟢 de `/vitamins/screen_4/texts` — NEW лучше (2:0)

- **RU**: Другой член команды, девушка, испытывавшая симптомы, похожие на депрессию, выявила железо-дефицитную анемию, лечение которой привело к значительному улучшению её состояния. Она описывала своё состояние следующим образом: «Я постоянно хотела спать, мне ничего н…
- **OLD**: Ein weiteres Teammitglied, eine junge Frau, die Symptome ähnlich einer Depression verspürte, stellte eine Eisenmangelanämie fest. Die Behandlung führte zu einer erheblichen Verbesserung ihres Zustands. Sie beschrieb ihren Zustand so: „Ich war ständig schläfrig…
- **NEW**: Ein anderes Teammitglied, eine junge Frau, die Symptome ähnlich einer Depression verspürte, wurde mit Eisenmangelanämie diagnostiziert. Die Behandlung führte zu einer erheblichen Besserung ihres Zustands. Sie beschrieb ihren Zustand so: „Ich war ständig schläf…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 89)
  - Перевод B звучит эмпатичнее, использует живые разговорные формулировки («Sprechen Sie mit einem Arzt») и соблюдает лексику для поддерживающего тона («Befinden», «Erschöpfung»). Перевод A слишком сухой, канцелярский и повторяющийся.
  - [old/style/major] Нарушение Tone of Voice (канцелярит и сухость): использование «Konsultieren Sie einen Arzt» и клинического «Erschöpfbarkeit» звучит слишком официально и тяжело.
  - [old/style/minor] Стилевой повтор и неестественность: «in meinen ursprünglichen Zustand zurückgekehrt. Mein Zustand hat sich massiv verbessert.»
  - [new/style/major] Грамматическая калька с английского: «wurde mit Eisenmangelanämie diagnostiziert» (to be diagnosed with). В стандартном немецком верно «bei ihr wurde eine Eisenmangelanämie diagnostiziert/festgestellt».
  - [new/style/minor] Ошибка пунктуации в многоабзацной цитате: второй абзац («Danach ließ ich...») должен начинаться с открывающей кавычки, так как прямая речь не прерывалась.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 93)
  - Перевод A звучит гораздо естественнее, использует живую лексику («zu meiner alten Form zurückgefunden», «Befinden») и правильно оформляет многоабзацную цитату. Перевод B содержит пунктуационные ошибки (разрыв цитаты) и местами звучит как механистичная калька.
  - [new/style/minor] Конструкция «wurde mit ... diagnostiziert» — это калька с английского (diagnosed with). Естественнее звучит: «bei ihr wurde ... diagnostiziert» или «festgestellt».
  - [old/addition/major] Ошибочное закрытие и повторное открытие кавычек между абзацами. В оригинале это единая цитата, кавычки не должны закрываться в конце первого абзаца.
  - [old/style/major] Фраза «in meinen ursprünglichen Zustand zurückgekehrt» звучит канцелярски и неестественно для живой речи. Также присутствует неудачный повтор слова «Zustand» (лучше было использовать «Befinden» согласно правилам терминологии).
  - [old/style/minor] Слово «Erschöpfbarkeit» звучит слишком клинически по сравнению с более естественным «Erschöpfung» из перевода А.

#### 🟢 de `/vitamins/screen_2/texts` — NEW лучше (2:0)

- **RU**: В середине 20 века возникла целая научная дисциплина - психоэндокринология, изучающая взаимосвязь между эндокринной системой человека и его психикой. Есть даже такой термин, психоэндокринный синдром – это нарушение психики, возникающие на фоне эндокринных забо…
- **OLD**: Mitte des 20. Jahrhunderts entstand mit der Psychoneuroendokrinologie eine eigene wissenschaftliche Disziplin, die den Zusammenhang zwischen dem endokrinen System des Menschen und seiner Psyche untersucht. Es gibt sogar den Begriff des psychoneuroendokrinen Sy…
- **NEW**: Mitte des 20. Jahrhunderts entstand mit der Psychoendokrinologie eine eigene wissenschaftliche Disziplin, die den Zusammenhang zwischen dem endokrinen System des Menschen und seiner Psyche untersucht. Es gibt sogar den Begriff des psychoendokrinen Syndroms – d…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Перевод B точнее передает медицинскую терминологию оригинала и бережнее обращается с нюансами смысла, сохраняя при этом естественность и плавность звучания на немецком языке.
  - [old/terminology/major] Неоправданно добавлено 'neuro' в терминах 'Psychoneuroendokrinologie' и 'psychoneuroendokrinen', тогда как в оригинале речь идет строго о психоэндокринологии.
  - [old/mistranslation/minor] Фраза 'Думаем, вы согласитесь' переведена как 'Sicherlich wissen Sie' (Наверняка вы знаете), что искажает исходный смысл совместного размышления.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 88)
  - Перевод A точнее передает смысл и терминологию оригинала, в то время как B искажает ключевые термины, добавляя корень «neuro-». Однако в обоих текстах присутствует заметная грамматическая ошибка с определением рода слова Vitamin.
  - [new/style/major] Грамматическая ошибка: слово Vitamin в немецком языке среднего рода (das Vitamin), поэтому вместо мужского рода «jeder einzelne» должно использоваться «jedes einzelne».
  - [old/mistranslation/major] Искажение термина: в оригинале «психоэндокринология» (Psychoendokrinologie), а переводчик безосновательно добавил приставку нейро- (Psychoneuroendokrinologie и psychoneuroendokrinen Syndroms).
  - [old/style/major] Грамматическая ошибка: слово Vitamin среднего рода, поэтому вместо «jeder einzelne» необходимо использовать «jedes einzelne».
  - [old/mistranslation/minor] Глагол «согласитесь» переведен как «wissen Sie» (знаете/в курсе), что меняет изначальный посыл фразы на констатацию факта.
  - [old/addition/minor] В последнем абзаце добавлено слово «ansonsten» (ansonsten gesund sind — в остальном здоровы), которого не было в оригинале.

#### 🟢 de `/unemployment/screen_2/texts` — NEW лучше (2:0)

- **RU**: Если и вы так считаете, то вам будет интересен случай Александра — 47-летнего отца троих детей, который проработал 17 лет с отцом своей жены в одной успешной компании. За пару лет до его депрессии между ним и его тестем возникли разногласия по поводу управлени…
- **OLD**: Wenn Sie so denken, könnte der Fall von Alexander für Sie interessant sein – ein 47-jähriger Vater von drei Kindern, der 17 Jahre lang in demselben erfolgreichen Unternehmen arbeitete wie der Schwiegervater seiner Frau. Einige Jahre vor seiner Depression kam e…
- **NEW**: Wenn Sie so denken, könnte der Fall von Alexander für Sie interessant sein – ein 47-jähriger Vater von drei Kindern, der 17 Jahre lang gemeinsam mit dem Schwiegervater in einem erfolgreichen Unternehmen gearbeitet hat. Einige Jahre vor seiner Depression kam es…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 93)
  - Перевод A звучит естественно и точно передает смысл. Перевод B содержит критическую ошибку: «отец жены» переведен как «Schwiegervater seiner Frau» (свёкор жены, то есть отец самого героя), что полностью ломает логику текста.
  - [old/mistranslation/critical] Фраза «с отцом своей жены» переведена как «wie der Schwiegervater seiner Frau», что значит «как свёкор его жены» (то есть отец Александра), полностью искажая смысл.
  - [old/style/minor] Фраза «wechselte er eine Stelle nach der anderen» звучит несколько коряво, лучше было бы сказать «wechselte ständig den Job» или «nahm eine Stelle nach der anderen an».
  - [old/mistranslation/minor] Местоимение «он» (друг) в последнем абзаце переведено как «der Kunde», что меняет смысл и стирает личный контекст.
  - [new/style/minor] Аппозиция «ein 47-jähriger Vater» стоит в именительном падеже после тире, грамматически точнее было бы согласовать падеж (einem 47-jährigen Vater), хотя в разговорной речи это допустимо.
  - [new/addition/minor] Во фразе «wodurch er auch auf seinen Anteil...» добавлено слово «auch», которого нет в оригинале.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Перевод B значительно превосходит A благодаря естественности языка и отсутствию грубых смысловых ошибок. В варианте A допущена комичная ошибка: «Schwiegervater seiner Frau» означает свёкра жены (то есть отца самого героя), а не тестя.
  - [old/mistranslation/critical] Фраза «Schwiegervater seiner Frau» полностью искажает смысл: это отец Александра, а не отец его жены. В оригинале — «с отцом своей жены» (seinem Schwiegervater / dem Vater seiner Frau).
  - [old/style/minor] Конструкция «wechselte er eine Stelle nach der anderen» звучит калькированно и менее естественно, чем вариант B.
  - [old/addition/minor] Слово «он» (имеется в виду друг) переведено как «der Kunde» (клиент), что неоправданно смещает фокус.

#### 🟢 de `/unemployment/screen_4/texts` — NEW лучше (2:0)

- **RU**: Таким образом, хоть и внешние признаки успеха за это время оставались практически неизменными, он смог сохранить свою самооценку и избежать депрессии. Несмотря на то, что его финансовое положение оставалось тяжелым, когда он пришел к решению «признать поражени…
- **OLD**: So konnte er, obwohl sich seine äußeren Lebensumstände in dieser Zeit kaum veränderten, seinen Selbstwert bewahren und eine Depression verhindern. Obwohl seine finanzielle Lage schwierig blieb, als er die Entscheidung traf, sein Buchgeschäft „aufzugeben“, blie…
- **NEW**: So konnte er sein Selbstwertgefühl bewahren und eine Depression vermeiden, obwohl die äußeren Anzeichen des Erfolgs in dieser Zeit praktisch unverändert blieben. Selbst als er die Entscheidung traf, sein Buchgeschäft „aufzugeben“, und seine finanzielle Lage sc…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Перевод A демонстрирует отличную стилистику, точный подбор лексики и сохраняет структуру оригинала без калек. Перевод B звучит более тяжело из-за синтаксического копирования, теряет часть нюансов смысла и пропускает слова.
  - [old/style/major] Синтаксическая калька: придаточное «den er beschloss, jeden Morgen ... erneut zu lesen» зеркалит русскую структуру и звучит тяжело по-немецки (лучше как в А: «das er ... lesen wollte» или «und beschloss, ihn ... zu lesen»).
  - [old/omission/minor] Во втором пункте списка полностью пропущен глагол «дарить» (zu schenken), из-за чего фраза теряет заложенный смысл активного действия по отношению к другим.
  - [old/mistranslation/minor] Словосочетание «внешние признаки успеха» неоправданно упрощено до «äußeren Lebensumstände» (жизненные обстоятельства).
  - [old/mistranslation/minor] В 3-м и 5-м пунктах списка союз «Если» переведен как «Solange» (пока), что отдаляет текст от оригинала и нарушает единообразие списка.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Перевод B звучит гораздо естественнее, имеет более гладкий порядок слов и не упускает важные смысловые части оригинала, тогда как вариант A содержит пропуски и синтаксические кальки.
  - [old/omission/major] Во втором пункте списка полностью пропущен перевод глагола «дарить» (zu schenken), из-за чего фраза теряет свой изначальный смысл.
  - [old/mistranslation/minor] Фраза «внешние признаки успеха» переведена слишком обобщенно как «äußere Lebensumstände» (внешние жизненные обстоятельства).
  - [old/style/minor] Громоздкая и неестественная конструкция «den er beschloss, jeden Morgen ... erneut zu lesen».
  - [new/style/minor] Близкое повторение глагола «blieb» на стыке частей предложения: «... schwierig blieb, blieb seine Selbstachtung ...».

#### 🟢 de `/trap/description` — NEW лучше (2:0)

- **RU**: В статье рассматривается проблема чувства вины, возникающего из-за нереалистичных требований к себе и постоянной самокритики. Описываются методы переосмысления внутренних установок и замены «долженствования» на более здоровое восприятие личных возможностей и ж…
- **OLD**: In diesem Artikel geht es um das Schuldgefühl, das durch unrealistische Ansprüche an sich selbst und ständige Selbstkritik entsteht. Wir beschreiben Methoden, wie Sie Ihre inneren Überzeugungen neu bewerten und das starre „Müssen“ durch eine gesündere Sicht au…
- **NEW**: In diesem Artikel geht es um das Schuldgefühl, das durch unrealistische Ansprüche an sich selbst und ständige Selbstkritik entsteht. Sie erfahren, wie Sie Ihre inneren Überzeugungen überdenken und das starre „Muss“ durch eine gesündere Sichtweise auf Ihre Mögl…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 96)
  - Перевод A лучше адаптирует текст под эмпатичный Tone of Voice и точно следует правилу 9, избавляясь от абстрактного существительного «методы» в пользу глагольной конструкции («Sie erfahren, wie Sie...»). Перевод B звучит более сухо и академично.
  - [old/style/minor] Использование «Wir beschreiben Methoden» делает текст более канцелярским (нарушение правила 9). Кроме того, «Ratschläge» звучит несколько директивнее и менее поддерживающе, чем «Impulse» в варианте А.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Перевод B звучит более эмпатично и современно: формулировки «Sie erfahren» и «Impulse an die Hand geben» отлично подходят для поддерживающего текста, избегая академичной сухости и назидательности.
  - [old/style/minor] Фраза «Wir beschreiben Methoden» звучит суховато и академично для поддерживающего текста, а слово «Ratschläge» в психологии часто воспринимается как поучение («Ratschläge sind auch Schläge»), в отличие от более мягкого «Impulse».

