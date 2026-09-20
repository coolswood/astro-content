# QA: слепое парное сравнение переводов — sm-low-achievements

- **Дата**: 2026-09-20T12:47:27.436Z
- **Метка**: sm-low-achievements
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/de-variants-20260920/baseline
- **Файлы**: story/distortions/achievements.json
- **Локали**: de
- **Сэмпл/файл**: 12
- **Seed**: 20260920
- **Min-chars**: 0
- **Модель**: gemini-3.1-pro-high
- **Endpoint**: http://127.0.0.1:8107/v1
- **git HEAD**: 608aa373d2f1e528a04e697db7c459b2fac022f6

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/achievements.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 9 | 🟢 7 | 🔴 2 | ⚪ 0 | 🟡 0 | 0 / 1 | 78% |
| **итого** | 9 | 🟢 7 | 🔴 2 | ⚪ 0 | 🟡 0 | 0 / 1 | 78% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×10, omission/major×2, style/major×2, mistranslation/major×1; OLD — style/major×6, addition/minor×5, style/minor×5, omission/major×3, omission/minor×3, mistranslation/major×2, mistranslation/critical×1

### Детали пар (для спот-чека)

#### 🟢 de `/screen_3/texts` — NEW лучше (2:0)

- **RU**: <h2>Ухудшение отношений</h2> Люди, зацикленные на достижениях, часто чувствуют одиночество — и это закономерно. На поддержание близких связей не остается ни времени, ни эмоциональных ресурсов. И отношения постепенно уходят на второй план. Партнер может начать …
- **OLD**: <h2>Verschlechterung der Beziehungen</h2> Menschen, die sich ausschließlich über ihre Leistungen definieren, fühlen sich oft einsam – und das ist folgerichtig. Es bleibt weder Zeit noch emotionale Energie, um enge Bindungen zu pflegen. So rücken Beziehungen na…
- **NEW**: <h2>Verschlechterung von Beziehungen</h2> Menschen, die sich nur über Leistungen definieren, fühlen sich oft einsam – und das ist folgerichtig. Es fehlt dann sowohl die Zeit als auch die emotionale Energie, um enge Bindungen zu pflegen. So rücken Beziehungen a…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Перевод B строго соблюдает правило единообразного обращения на «Sie», успешно избегая запрещенного безличного местоимения «man» и делая текст более личным и поддерживающим. Перевод A грубо нарушает это правило, постоянно смешивая «Sie» и «man» в соседних предложениях.
  - [old/style/major] Грубое нарушение правила единообразия обращений: в тексте постоянно смешиваются обращения на «Sie» («weil Sie diese», «Wenn Sie») и безличное «man» («man keine Fehler machen darf», «braucht man», «muss man», «will man»).
  - [old/addition/minor] Внутри тега <q> добавлены типографские кавычки, что является избыточным, так как тег в UI уже подразумевает визуальное выделение цитаты.
  - [old/style/minor] Глагол «durchmachen» (переживать эмоции) звучит чуть более разговорно и менее естественно в данном контексте, чем «durchleben» из перевода B.
  - [new/style/minor] Фраза «weil Sie diese an Ihrer Seite schlichtweg nicht mehr bieten können» — калька с русского «рядом с вами». По-немецки естественнее прозвучало бы: «weil er diese bei Ihnen schlichtweg nicht mehr findet».
  - [new/style/minor] Троекратное повторение «immer mehr Erfolg, immer mehr Anerkennung und immer mehr Leistungen» перегружает предложение и делает его тяжеловесным (в оригинале такого риторического усиления нет).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 93)
  - Перевод A строго выдерживает вежливое обращение на «Sie/Ihre» и предлагает гладкий, естественный текст. Перевод B грубо нарушает правило о единообразии, постоянно смешивая «Sie» и безличное «man».
  - [new/style/minor] Конструкция «weil Sie diese an Ihrer Seite schlichtweg nicht mehr bieten können» звучит немного шероховато из-за калькирования «рядом с вами». Более естественный вариант: «weil sie bei Ihnen einfach fehlen».
  - [old/style/major] Нарушение правила о единообразии обращений. В тексте хаотично смешиваются формы «Sie/Ihre» («weil Sie», «Wenn Sie», «Ihre Erfolge») и «man» («man keine Fehler machen darf», «dass man nicht mehr so leistungsfähig ist», «braucht man», «jagt man»).
  - [old/addition/minor] Внутри тега <q> добавлены немецкие кавычки („ “), что является избыточным, так как HTML-тег <q> семантически сам по себе обозначает цитату.

#### 🟢 de `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Подумайте, будете ли вы относиться к своему близкому человеку хуже только потому, что у него нет достижений?</h2> Представьте, вы встретились со своим другом, которого очень сильно цените. Но вдруг узнаете, что он обычный продавец в магазине, в то время ка…
- **OLD**: <h2>Überlegen Sie einmal: Würden Sie einen nahestehenden Menschen schlechter behandeln, nur weil er keine besonderen Erfolge vorweisen kann?</h2> Stellen Sie sich vor, Sie treffen einen Freund, den Sie sehr schätzen. Doch plötzlich erfahren Sie, dass er nur ei…
- **NEW**: <h2>Überlegen Sie einmal: Würden Sie einen geliebten Menschen schlechter behandeln, nur weil er keine besonderen Erfolge vorweisen kann?</h2> Stellen Sie sich vor, Sie treffen einen Freund, den Sie sehr schätzen. Doch plötzlich erfahren Sie, dass er nur ein ei…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 73 / NEW 82)
  - Перевод A точнее передает риторическую структуру и логику текста. Перевод B допускает критическую ошибку в заголовке («Aber nein...»), которая ломает смысл всего абзаца. При этом оба варианта удалили важный атрибут в теге.
  - [new/omission/major] Удален атрибут ids="18062987551913114" в теге <instagram>, что сломает отображение компонента в приложении.
  - [new/mistranslation/major] Буквальная калька: «на вашем фоне» переведено как «angesichts Ihres Hintergrunds» (учитывая ваше происхождение/бэкграунд), что искажает смысл. Правильно было бы использовать «im Vergleich zu Ihnen».
  - [new/style/minor] Использование безличного местоимения «man» (die man zählen kann, wenn man unglücklich ist) нарушает правило Tone of Voice.
  - [new/style/minor] Слово «ausgerottet» в применении к людям («истребить») звучит в немецком языке чересчур мрачно и имеет тяжелый исторический подтекст. Уместнее было бы использовать «beseitigen» или «abschaffen».
  - [old/omission/major] Удален атрибут ids="18062987551913114" в теге <instagram>.
  - [old/mistranslation/critical] Саркастичное согласие «Ну а что, они уже старые...» переведено как отрицание «Aber nein, sie sind eben alt...». Это полностью ломает логику текста, так как дальше идет фраза «Doch so denken wir nicht» (Но мы так не думаем).
  - [old/addition/minor] Добавлено слово «vermeintliche» (мнимая ничтожность), которого не было в оригинале.
  - [old/style/minor] Нарушение правила об избегании безличного «man» (wenn man unglücklich ist).
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 88)
  - Перевод B гораздо точнее передает риторическую структуру и тон оригинала (удачная адаптация сарказма в «Ну а что?»). Перевод A разрушает логику повествования неуместными фразами вроде «Aber nein». При этом обе версии упустили важный технический атрибут.
  - [old/omission/major] Удален атрибут ids="18062987551913114" в теге <instagram>.
  - [old/mistranslation/major] Конструкция «Ну а что?» переведена как «Aber was soll das?» и «Aber nein», что в контексте ломает риторический прием «адвоката дьявола» и создает логическое противоречие с последующим текстом.
  - [old/omission/minor] Пропущено слово «посчитать» в связке «измерить, посчитать».
  - [old/mistranslation/minor] Во фразе «Вам приятно быть таким человеком?» фокус смещен на чувство лести («Würde Ihnen dieses Gefühl schmeicheln?»), теряется смысловой аспект о том, каково «быть таким человеком».
  - [new/omission/major] Удален атрибут ids="18062987551913114" в теге <instagram>.
  - [new/style/major] Калька с русского: «на вашем фоне» переведено как «angesichts Ihres Hintergrunds». Слово Hintergrund здесь означает скорее происхождение/биографию, естественнее было бы сказать «im Vergleich zu Ihnen» (как B сам перевел аналогичную фразу ниже).
  - [new/mistranslation/minor] При переводе «Вам приятно быть таким человеком?» акцент смещен на эмоции («Würde Ihnen das ein gutes Gefühl geben?»), из-за чего несколько теряется моральный вес оригинальной фразы.

#### 🔴 de `/description` — OLD лучше (2:0)

- **RU**: Любовь может вдохновлять, придавать сил и наполнять жизнь смыслом. Но если она превращается в потребность, без которой невозможно чувствовать себя полноценным, она начинает разрушать личность и мешать строить здоровые отношения. То же происходит и с зависимост…
- **OLD**: Liebe kann inspirieren, Kraft geben und dem Leben Sinn verleihen. Doch wenn sie zu einer Bedingung wird, ohne die man sich nicht mehr wertvoll fühlt, beginnt sie, die Persönlichkeit zu belasten und gesunde Beziehungen zu erschweren. Das Gleiche gilt für die Le…
- **NEW**: Liebe kann inspirieren, Kraft geben und dem Leben Sinn verleihen. Doch wenn sie zu einer Bedingung wird, ohne die man sich nicht mehr wertvoll fühlt, beginnt sie, die Persönlichkeit zu belasten und gesunde Beziehungen zu erschweren. Das Gleiche gilt für die Ab…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 82 / NEW 78)
  - Оба перевода нарушают правило о недопустимости смешивания обращений «man» и «Sie», что сильно снижает их оценки. Вариант A побеждает за счет более точной и естественной лексики: «unabhängig von Ergebnissen» (вместо пространственного «abseits von» в B) и емкого композита «Leistungsabhängigkeit».
  - [old/style/major] Нарушено правило единообразия обращений: в тексте смешаны безличное «man» («ohne die man sich...») и вежливое «Sie» («wenn Sie lernen...»).
  - [new/style/major] Нарушено правило единообразия обращений: смешивание «man» и «Sie» недопустимо по гайдлайнам.
  - [new/style/minor] Фраза «abseits von Ergebnissen» звучит неестественно для перевода «вне результатов»; лексема abseits чаще используется в пространственном смысле.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 87 / NEW 82)
  - Übersetzung B klingt durch „unabhängig von Ergebnissen“ und das Kompositum „Leistungsabhängigkeit“ natürlicher. Beide Versionen leiden jedoch unter einer unzulässigen Mischung der Anredeformen („man“ vs. „Sie“) und einer leichten Ungenauigkeit bei einem Begriff.
  - [new/style/minor] Die Formulierung „abseits von Ergebnissen“ wirkt hier unnatürlich; „unabhängig von“ ist die passendere Wahl.
  - [new/mistranslation/minor] „потребность“ (Bedürfnis/Verlangen) wurde als „Bedingung“ (Voraussetzung) übersetzt, was die psychologische Nuance leicht verändert.
  - [new/style/major] Regelverletzung bei der Anrede: In Satz 2 wird das unpersönliche „man“ verwendet, in Satz 4 jedoch „Sie/Ihre“. Die Anrede muss laut Vorgabe konsequent im „Sie“-Format bleiben.
  - [old/mistranslation/minor] „потребность“ (Bedürfnis/Verlangen) wurde als „Bedingung“ (Voraussetzung) übersetzt, was die psychologische Nuance leicht verändert.
  - [old/style/major] Regelverletzung bei der Anrede: In Satz 2 wird das unpersönliche „man“ verwendet, in Satz 4 jedoch „Sie/Ihre“. Die Anrede muss laut Vorgabe konsequent im „Sie“-Format bleiben.

#### 🟢 de `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Конечно, не стоит бросать все свои начинания или отказываться от важных целей, чтобы справиться с зависимостью от успеха. Ведь нет ничего плохого в том, чтобы иметь достижения. Прекрасно иметь деньги, работу, машину, квартиру и т.д. Проблемы начинаются тогда, …
- **OLD**: Natürlich sollten Sie nicht all Ihre Vorhaben oder wichtigen Ziele aufgeben, nur um die Abhängigkeit von Erfolg zu bewältigen. Denn es ist nichts Schlechtes, Erfolge zu haben. Es ist wunderbar, finanzielle Sicherheit, eine erfüllende Arbeit, ein schönes Zuhaus…
- **NEW**: Natürlich sollten Sie nicht all Ihre Vorhaben oder wichtigen Ziele aufgeben, nur um die Abhängigkeit von Erfolg zu bewältigen. Es ist schließlich nichts Schlechtes, Erfolge zu haben. Es ist wunderbar, materiellen Wohlstand, eine gute Arbeit, ein Auto, eine Woh…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 88)
  - Перевод B строго соблюдает правило единого обращения на «Sie», тогда как A регулярно сбивается на запрещенное безличное «man». B также точнее следует оригиналу и звучит более естественно, хотя оба текста содержат небольшую кальку в конце.
  - [old/style/major] Прямое нарушение правила обращения: использование безличного «man» вместо «Sie» («Betrachtet man es rational...», «...dass man sich auf...», «...dass man nicht nach mehr streben... darf»). Смешение форм в одном тексте запрещено гайдлайном.
  - [old/style/minor] Крайне неестественная конструкция: «einfach das Leben enttäuscht vorfinden können» (лучше «vom Leben enttäuscht sein», как в B).
  - [old/omission/minor] Специфические понятия оригинала (деньги, машина, квартира) неоправданно заменены абстрактными категориями (finanzielle Sicherheit, ein schönes Zuhause).
  - [old/style/minor] Калька с русского: «liegen Sie tief im Irrtum» (глубоко ошибаетесь). По-немецки так не говорят, естественно было бы: «liegen Sie völlig falsch» или «irren Sie sich gewaltig».
  - [new/style/minor] Калька с русского в последнем предложении: «liegen Sie tief im Irrtum» (глубоко ошибаетесь). Естественно было бы: «liegen Sie völlig falsch».
  - [new/style/minor] Перевод «суицид генеральных директоров» как «Suizid von Vorstandsvorsitzenden» звучит слегка громоздко; в немецкой публицистике для этого феномена чаще используется понятие «CEO-Suizid».
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 93)
  - Перевод A строго соблюдает правило обращения на «Sie» и звучит более естественно. Перевод B нарушает критическое правило о запрете безличного «man» и содержит неудачные кальки и неестественные конструкции.
  - [old/style/major] Прямое нарушение правила (Единообразие): использование безличного местоимения 'man' вместо 'Sie' ('Betrachtet man es rational', 'dass man sich einlässt', 'dass man nicht nach mehr streben... darf').
  - [old/style/major] Крайне неестественная конструкция: 'das Leben enttäuscht vorfinden können' (в качестве перевода для 'разочароваться в жизни').
  - [old/omission/minor] Излишняя транскреация: конкретный список 'деньги, работу, машину, квартиру' заменён на абстрактные 'finanzielle Sicherheit... schönes Zuhause', из-за чего потеряны машина и сами деньги.
  - [new/style/minor] Калька с русского в последнем предложении: 'liegen Sie tief im Irrtum' звучит неестественно, лучше 'irren Sie sich gewaltig' или 'unterliegen Sie einem Irrtum'.
  - [new/addition/minor] В списке перечислений ('деньги, работу, машину, квартиру') добавлено избыточное 'materiellen Wohlstand', которое стоит рядом с конкретными предметами.

#### 🟢 de `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Еще один частый сценарий — отсутствующий родитель. Дети объясняют всё через себя. Если папа ушел, значит, я был недостаточно хорошим, а не потому, что взрослые не смогли договориться. Значит, если я стану успешным, умным, лучшим — он вернется или хотя бы пойме…
- **OLD**: Ein weiteres häufiges Szenario ist die Abwesenheit eines Elternteils. Kinder versuchen oft, alles auf sich selbst zu beziehen. „Wenn der Vater geht, bedeutet das, dass ich nicht gut genug war“ – so denken Kinder oft, anstatt zu verstehen, dass die Erwachsenen …
- **NEW**: Ein weiteres häufiges Szenario ist die Abwesenheit eines Elternteils. Kinder versuchen dann oft, alles auf sich selbst zu beziehen. „Wenn Papa geht, dann muss das daran liegen, dass ich nicht gut genug war, und nicht daran, dass die Erwachsenen nicht miteinand…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Перевод A строго придерживается tone of voice и правила обращений, используя исключительно «Sie/Ihre», и звучит как естественный, эмпатичный немецкий текст. Перевод B грубо нарушает правило единообразия, перескакивая с безличного «man» на «Sie», а также вносит неоправданные дополнения в структуру второго абзаца.
  - [old/style/major] Смешение форм обращения: использование безличного «man» (Man lernt, man möchte) вперемешку с «Sie» (Sie haben es geschafft), что прямо нарушает правило интерфейса.
  - [old/addition/minor] Во втором абзаце добавлена поясняющая вставка («so denken Kinder oft, anstatt zu verstehen»), которая разбивает цельную мысль-цитату ребенка из оригинала.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - Перевод B строго соблюдает правило обращения на «Sie», тогда как A смешивает безличное «man» и вежливое «Sie». Кроме того, B точнее и естественнее передает внутренний монолог ребенка без лишних поясняющих вставок.
  - [old/style/major] Нарушено правило единообразия обращений: в тексте смешиваются безличное «man» (Man lernt, Man möchte) и вежливое «Sie» (Sie haben es geschafft).
  - [old/addition/minor] Во втором абзаце добавлены лишние поясняющие фразы («– so denken Kinder oft, anstatt zu verstehen... Es entsteht der Glaube:»), которые разрывают цельный монолог оригинального текста.

#### 🟢 de `/exercise/description` — NEW лучше (2:0)

- **RU**: Статья обсуждает опасности зависимости от успеха, указывая на то, что достижения не гарантируют счастья и благополучия. Примеры знаменитостей, таких как Леди Гага и Джим Керри, иллюстрируют, что даже самые успешные люди могут страдать от депрессии и других про…
- **OLD**: Dieser Artikel beleuchtet die Gefahren einer Abhängigkeit von Erfolg und zeigt auf, dass Leistungen keine Garantie für Glück und Wohlbefinden sind. Beispiele von Persönlichkeiten wie Lady Gaga und Jim Carrey verdeutlichen, dass selbst die erfolgreichsten Mensc…
- **NEW**: Dieser Artikel befasst sich mit den Gefahren der Erfolgsabhängigkeit und zeigt auf, dass Leistungen keine Garantie für Glück und Wohlbefinden sind. Beispiele von Prominenten wie Lady Gaga und Jim Carrey verdeutlichen, dass selbst die erfolgreichsten Menschen u…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 90)
  - Перевод B точнее передает лексику оригинала (Prominenten вместо Persönlichkeiten, сохранено указание на «каждого человека»). Оба перевода сохраняют громоздкие именные конструкции в последнем предложении, но B ближе к исходному тексту без вольных добавлений и потерь.
  - [old/omission/minor] Слово «Persönlichkeiten» без прилагательного (например, berühmte) теряет смысл «знаменитости».
  - [old/omission/minor] Утеряно указание на «каждого человека», смысл сужен до «собственной ценности» (der eigene Wert).
  - [old/addition/minor] Необоснованно добавлено слово «внешних» (äußeren Erfolgen).
  - [new/style/minor] Фраза «Zentrale Erkenntnisse sind die Bedeutung...» стилистически тяжеловата и семантически не совсем гладкая (сами выводы не являются 'важностью'), в идеале её стоило бы развернуть в глагольную конструкцию (например, 'Zentrale Erkenntnisse sind, wie wichtig es ist...').
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 92)
  - Перевод A точнее передает смысл оригинала (включая фразу «каждого человека») и грамматически корректен в последнем предложении, где B использует единственное число для двух подлежащих.
  - [old/style/minor] Грамматическая шероховатость в последнем предложении: сказуемое 'ist' (ед.ч.) используется с двумя однородными подлежащими, соединенными 'sowie' (здесь предпочтительнее множественное число, как в А).
  - [old/omission/minor] Фраза «внутренней ценности каждого человека» переведена как «der eigene Wert» (собственная ценность), из-за чего теряется акцент на других людях.
  - [old/style/minor] Слово «Persönlichkeiten» (личности/деятели) звучит менее точно в контексте поп-звезд, чем «Prominente» (знаменитости).

#### 🟢 de `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Мы живем в эпоху «гонки за достижениями», где успех часто становится мерилом нашей ценности. Кажется, будто каждый может добиться всего, если достаточно постарается. Границ для амбиций нет, и это превращает жизнь в бесконечную гонку, где мы начинаем верить, чт…
- **OLD**: Wir leben in einer Ära des „Wettlaufs um den Erfolg“, in der Leistung oft zum Maßstab für unseren Selbstwert wird. Es scheint, als könne jeder alles erreichen, wenn er sich nur genug anstrengt. Ambitionen scheinen grenzenlos zu sein, was das Leben in ein endlo…
- **NEW**: Wir leben in einer Ära des „Wettlaufs um den Erfolg“, in der Leistung oft zum Maßstab für unseren Selbstwert wird. Es scheint, als könne jeder alles erreichen, wenn er sich nur genug anstrengt. Ambitionen scheinen grenzenlos zu sein, was das Leben in ein endlo…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Перевод A точнее передает смысл оригинала и звучит гораздо естественнее, удачно используя прямую речь для внутренних размышлений. Перевод B содержит несколько смысловых неточностей, нарушающих логику текста, и стилистические шероховатости. При этом оба перевода потеряли важный атрибут в теге.
  - [new/omission/major] Потерян атрибут ids="18074617231661593" в теге <instagram>.
  - [old/omission/major] Потерян атрибут ids="18074617231661593" в теге <instagram>.
  - [old/mistranslation/major] Фраза «встречается и у мужчин, и у женщин» переведена как «betrifft alle Menschen», что размывает акцент и ломает логику последующего противопоставления полов.
  - [old/style/major] Конструкция «fühlen sich viele Männer besonders anfällig» звучит неестественно (нельзя «чувствовать себя предрасположенным/уязвимым», корректнее «sind anfällig»).
  - [old/mistranslation/major] Слово «молодец» переведено прилагательным «brav» (послушный, прилежный), что в данном контексте не передает похвалу за достижение (как это делает «bravo» в переводе А).
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 88)
  - Перевод B точнее передаёт смысл оригинала и логическую структуру (сохранено упоминание мужчин и женщин, необходимое для следующих предложений). Оба варианта допустили техническую ошибку с тегом.
  - [old/omission/major] Удален атрибут ids="18074617231661593" в теге <instagram>.
  - [old/omission/major] Опущено упоминание мужчин и женщин («betrifft alle Menschen»), из-за чего теряется связность с последующими предложениями, где они обсуждаются отдельно.
  - [new/omission/major] Удален атрибут ids="18074617231661593" в теге <instagram>.

#### 🔴 de `/exercise/screen_3/texts` — OLD лучше (2:0)

- **RU**: <h2>Учитесь находить баланс</h2> Нередко люди, зависимые от успеха, чувствуют вину за то, что позволяют себе отдыхать, проводить время с близкими, заниматься тем, что не связано напрямую с их целями. Безусловно, достижения имеют определённое значение в жизни, …
- **OLD**: <h2>Finden Sie Ihr Gleichgewicht</h2> Menschen, die von Erfolg abhängig sind, fühlen sich oft schuldig, wenn sie sich Ruhe gönnen, Zeit mit ihren Liebsten verbringen oder sich Dingen widmen, die nicht direkt mit ihren Zielen zu tun haben. Natürlich haben Leist…
- **NEW**: <h2>Lernen Sie, die Balance zu finden</h2> Menschen, die von Erfolg abhängig sind, fühlen sich oft schuldig, wenn sie sich Ruhe gönnen, Zeit mit Angehörigen verbringen oder sich Dingen widmen, die nicht direkt mit ihren Zielen zu tun haben. Natürlich haben Lei…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 91 / NEW 84)
  - Перевод B звучит гораздо естественнее, теплее и читается как оригинальный немецкий текст благодаря живым формулировкам («Liebsten», «das Leben einfach schön ist»). Перевод A местами страдает от канцелярита («Angehörigen») и тяжеловесного синтаксиса.
  - [new/style/major] Слово «Angehörigen» звучит слишком формально и сухо (канцелярит) для эмпатичного текста; гораздо уместнее использовать «Liebsten» или «nahen Menschen».
  - [new/style/minor] Синтаксис местами выдает перевод калькой: «nicht eine riesige Menge» (естественнее «keine», как в B) и тяжеловесное «mit denen es einfach schön ist zu leben».
  - [new/style/minor] Использование безличного «man» («denen man... neidisch hinterherblickt») нарушает строгое правило гайдлайна (лучше использовать пассивный залог).
  - [old/omission/major] В фразе «Wer alles auf Erfolg setzt, vergisst oft zu leben» утеряно прямое обращение к читателю («Вы делаете ставку...») и добавлено от себя слово «oft», что нарушает правило сохранения формы высказывания.
  - [old/addition/minor] Внутри HTML-тега <q> добавлены типографские кавычки („ “), что приведет к их визуальному дублированию в интерфейсе, так как тег уже их подразумевает.
  - [old/style/minor] Использование безличного «man» («auf die man... neidisch ist») нарушает правило избегать его вне словарных определений (лучше «die üblicherweise beneidet werden»).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 93 / NEW 85)
  - Перевод A звучит более естественно, тепло и лучше адаптирован для немецкого читателя. Перевод B содержит канцеляризмы и стилистические шероховатости, снижающие эмпатичность текста.
  - [new/style/major] Слово «Angehörigen» («родственники») звучит слишком формально и бюрократично для перевода «близких» в контексте отдыха. В поддерживающем тексте гораздо лучше подходит «Liebsten» (как в A) или «Nahestehenden».
  - [new/style/minor] Перевод «Sie setzen alles auf den Erfolg» звучит как жесткое прямое обвинение пользователя, что немного нарушает поддерживающий Tone of Voice. Транскреация в A («Wer alles auf Erfolg setzt») звучит мягче и уместнее.
  - [new/style/minor] Грамматически тяжеловесная и неестественная конструкция «nicht eine riesige Menge». Намного лучше звучит стандартное отрицание существительного: «keine riesige Menge» (как в A).
  - [new/style/minor] Используется безличное местоимение «man» («denen man... hinterherblickt»), что нежелательно по правилам интерфейса (лучше было использовать пассив).
  - [old/omission/minor] В первом заголовке опущено слово «Учитесь» («Finden Sie» вместо «Lernen Sie... zu finden»). Хотя для немецкого заголовка такая лаконичность идет на пользу, формально это отклонение от оригинала.
  - [old/addition/minor] Внутри тега <q> добавлены видимые типографские кавычки, которых не было в оригинале. Поскольку тег <q> сам по себе семантически оформляет цитату, лишние символы могут привести к двойным кавычкам при рендере.
  - [old/style/minor] Как и в B, используется безличное местоимение «man» («auf die man üblicherweise neidisch ist»). Строго по гайдлайну лучше избегать «man», заменив конструкцию, например, на пассивную («die üblicherweise beneidet werden»).

#### 🟢 de `/exercise/title` — NEW лучше (2:0)

- **RU**: Как перестать жить достижениями?
- **OLD**: Wie man aufhört, nur für Erfolge zu leben?
- **NEW**: Wie Sie aufhören, nur für den Erfolg zu leben
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 96)
  - Перевод А следует правилу об обязательном использовании обращения «Sie» и звучит как естественный немецкий заголовок. Перевод В нарушает запрет на использование «man» и некорректно ставит вопросительный знак после придаточного предложения.
  - [old/style/major] Использование безличного «man» вместо «Sie» недопустимо в заголовках по гайдлайну. Кроме того, конструкция «Wie man aufhört...» — это придаточное предложение, после которого в немецком языке не ставится вопросительный знак.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 96)
  - Перевод B строго следует гайдлайну, используя вежливое обращение «Sie» (что обязательно для заголовков), и звучит как естественное название статьи, в то время как A нарушает правило, применяя безличное «man».
  - [old/style/major] Использование безличного местоимения «man» в заголовке прямо нарушает инструкции. Кроме того, вопросительный знак в конце придаточного предложения (Wie man...) стилистически выглядит менее удачно, чем утвердительная форма заголовка в B.

