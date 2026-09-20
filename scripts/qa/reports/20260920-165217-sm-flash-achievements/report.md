# QA: слепое парное сравнение переводов — sm-flash-achievements

- **Дата**: 2026-09-20T13:52:17.429Z
- **Метка**: sm-flash-achievements
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
| de | 9 | 🟢 5 | 🔴 3 | ⚪ 0 | 🟡 1 | 0 / 0 | 63% |
| **итого** | 9 | 🟢 5 | 🔴 3 | ⚪ 0 | 🟡 1 | 0 / 0 | 63% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/major×7, style/minor×5, mistranslation/minor×3, addition/major×1, omission/major×1, mistranslation/major×1, terminology/minor×1, addition/minor×1, omission/minor×1; OLD — style/major×8, mistranslation/minor×6, style/minor×5, omission/minor×3, addition/major×2, mistranslation/major×2, addition/minor×1, omission/major×1

### Детали пар (для спот-чека)

#### 🔴 de `/screen_3/texts` — OLD лучше (2:0)

- **RU**: <h2>Ухудшение отношений</h2> Люди, зацикленные на достижениях, часто чувствуют одиночество — и это закономерно. На поддержание близких связей не остается ни времени, ни эмоциональных ресурсов. И отношения постепенно уходят на второй план. Партнер может начать …
- **OLD**: <h2>Verschlechterung der Beziehungen</h2> Menschen, die sich ausschließlich über ihre Leistungen definieren, fühlen sich oft einsam – und das ist folgerichtig. Es bleibt weder Zeit noch emotionale Energie, um enge Bindungen zu pflegen. So rücken Beziehungen na…
- **NEW**: <h2>Verschlechterung der Beziehungen</h2> Menschen, die sich nur über ihre Leistungen definieren, fühlen sich oft einsam – und das ist folgerichtig. Es fehlt dann sowohl die Zeit als auch die emotionale Energie, um nahe Beziehungen zu pflegen. So rücken zwisch…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 87 / NEW 77)
  - Перевод A точнее, избегает отсебятины и соблюдает запрет на использование гендерных пар (правило №5). Оба варианта нарушают правило о единообразии обращения (смешивают man и Sie), но B дополнительно добавляет лишние слова и использует менее точную лексику.
  - [old/style/major] Смешение безличного «man» и вежливого «Sie» нарушает жесткое правило о единообразии обращений.
  - [old/style/minor] Фраза «weil Sie diese an Ihrer Seite nicht mehr bieten können» звучит неестественно, лучше перефразировать (например, «weil er sie bei Ihnen nicht findet»).
  - [old/addition/minor] Добавлены типографские кавычки внутри тега <q>, что может привести к их дублированию при рендере.
  - [new/style/major] Смешение безличного «man» и вежливого «Sie» (нарушение правила о единообразии).
  - [new/style/major] Конструкция «Ihr Partner oder Ihre Partnerin» прямо нарушает правило №5 (отказ от гендерных пар в прозе).
  - [new/addition/major] Необоснованное добавление слов: «oft» (дважды) и «am Ende» («als am Ende zu versagen»).
  - [new/mistranslation/minor] Неточный подбор слов: «Кажется» переведено как «Es fühlt sich oft besser an», а «социальные связи» как «soziales Gefüge» (хуже, чем soziale Kontakte).
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 91 / NEW 85)
  - Перевод B звучит более естественно, использует активные конструкции и точнее подбирает лексику (Stimmung для «настроение»). Вариант A утяжелен пассивом, громоздкой гендерной парой и необоснованными добавлениями.
  - [new/style/minor] Использование громоздкой гендерной пары «Ihr Partner oder Ihre Partnerin» в связном тексте (нарушение правила об избегании пар).
  - [new/style/major] Пассивная конструкция «Ihr Befinden wird nicht durch Ihre Leistungen geformt» звучит тяжело и канцелярски. Кроме того, «настроение» точнее переводить как Stimmung.
  - [new/addition/minor] Необоснованное добавление слова «oft» в двух местах («führt deren Verlust oft in eine tiefe Depression», «fühlt sich oft besser an»).
  - [old/style/minor] Фраза «weil Sie diese an Ihrer Seite nicht mehr bieten können» стилистически шероховата: смешана локация (an Ihrer Seite) и активное действие (bieten), а также добавлено «nicht mehr».
  - [old/addition/minor] Внутри тега <q> вручную добавлены типографские кавычки („ “), что приведет к их дублированию при рендеринге.

#### 🔴 de `/exercise/screen_2/texts` — OLD лучше (2:0)

- **RU**: <h2>Подумайте, будете ли вы относиться к своему близкому человеку хуже только потому, что у него нет достижений?</h2> Представьте, вы встретились со своим другом, которого очень сильно цените. Но вдруг узнаете, что он обычный продавец в магазине, в то время ка…
- **OLD**: <h2>Überlegen Sie einmal: Würden Sie einen nahestehenden Menschen schlechter behandeln, nur weil er keine besonderen Erfolge vorweisen kann?</h2> Stellen Sie sich vor, Sie treffen einen Freund, den Sie sehr schätzen. Doch plötzlich erfahren Sie, dass er nur ei…
- **NEW**: <h2>Überlegen Sie einmal: Würden Sie einen geliebten Menschen schlechter behandeln, nur weil er keine besonderen Leistungen erbracht hat?</h2> Stellen Sie sich vor, Sie treffen einen Freund, den Sie sehr schätzen. Doch plötzlich erfahren Sie, dass er nur ein e…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 86 / NEW 78)
  - Оба перевода упустили атрибут в теге <instagram> и не совсем верно интерпретировали риторическое «Ну а что» в последнем заголовке. Однако вариант B написан более живым и естественным языком, избегает тяжелых калек (как во втором заголовке) и точнее передает контекст сравнения («angesichts Ihres Erfolgs» вместо ошибочного буквального «Hintergrunds»).
  - [new/omission/major] Потерян атрибут ids в теге <instagram>.
  - [new/mistranslation/major] «на вашем фоне» переведено буквально как «angesichts Ihres Hintergrunds» (в немецком Hintergrund в данном контексте означает жизненный опыт или происхождение, а не фон для сравнения).
  - [new/style/major] «zustimmen, ... zu verkehren, unter der Bedingung» — тяжелая калька с русского, звучит неестественно и канцелярски. Глагол «verkehren» в этом контексте кажется устаревшим.
  - [new/mistranslation/minor] «Ну а что» в заголовке переведено как «Aber nein» — это разрушает риторический прием оригинала, где абсурдная мысль сначала допускается, а затем уже опровергается.
  - [old/omission/major] Потерян атрибут ids в теге <instagram>.
  - [old/mistranslation/minor] «Ну а что?» переведено как возмущенное «Aber was soll das?» (Что за бред?), тогда как в оригинале это спокойное риторическое допущение (здесь лучше подошло бы «Aber mal ehrlich», как в варианте А).
  - [old/mistranslation/minor] Как и в варианте А, «Ну а что» в заголовке ошибочно переведено как «Aber nein».
  - [old/mistranslation/minor] «истребить» переведено как «abschreiben» (списать со счетов) — слишком мягко, теряется резкая гипербола оригинала.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 88 / NEW 75)
  - Перевод А звучит гораздо естественнее, избегает канцелярита и лучше передает оттенки смысла, используя живой немецкий язык. Оба перевода допустили техническую ошибку, потеряв атрибут в теге <instagram>, но перевод В дополнительно страдает от буквальных калек и тяжеловесных конструкций.
  - [old/omission/major] В теге <instagram> упущен атрибут ids (должно быть <instagram ids="...">), что сломает отображение контента в приложении.
  - [old/mistranslation/minor] Фраза «Вам приятно быть таким человеком?» переведена как «Würde Ihnen dieses Gefühl schmeicheln?» (Вам льстит это чувство?) — потерян смысловой акцент на том, каким человеком становится пользователь.
  - [new/omission/major] В теге <instagram> упущен атрибут ids (должно быть <instagram ids="...">).
  - [new/style/major] Канцелярская и неестественная конструкция в заголовке: «Würden Sie zustimmen, mit einem erfolgreichen Menschen zu verkehren, unter der Bedingung, dass...».
  - [new/mistranslation/minor] Калька: «на вашем фоне» переведено буквально как «angesichts Ihres Hintergrunds» (на фоне вашего происхождения/бэкграунда), что искажает изначальный смысл.
  - [new/mistranslation/minor] «Близкий человек» переведено как «geliebter Mensch» (возлюбленный), что сужает смысл. Вариант А (nahestehender Mensch) точнее.

#### 🟡 de `/description`— вердикт неустойчив

- **RU**: Любовь может вдохновлять, придавать сил и наполнять жизнь смыслом. Но если она превращается в потребность, без которой невозможно чувствовать себя полноценным, она начинает разрушать личность и мешать строить здоровые отношения. То же происходит и с зависимост…
- **OLD**: Liebe kann inspirieren, Kraft geben und dem Leben Sinn verleihen. Doch wenn sie zu einer Bedingung wird, ohne die man sich nicht mehr wertvoll fühlt, beginnt sie, die Persönlichkeit zu belasten und gesunde Beziehungen zu erschweren. Das Gleiche gilt für die Le…
- **NEW**: Liebe kann inspirieren, Kraft geben und dem Leben Sinn verleihen. Doch wenn sie zu einer Bedingung wird, ohne die man sich nicht mehr wertvoll fühlt, beginnt sie, die Persönlichkeit zu belasten und gesunde Beziehungen zu erschweren. Ähnlich verhält es sich mit…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 83)
  - Оба перевода нарушают строгое правило о недопустимости смешивания обращений («man» и «Sie»), однако текст B звучит более гладко и по-немецки идиоматично («Ähnlich verhält es sich...», «abseits von Ergebnissen»).
  - [old/style/major] Смешивание обращений в одном абзаце: безличное «man» (man sich nicht mehr wertvoll fühlt) используется рядом с прямым «Sie» (wenn Sie lernen), что прямо нарушает гайдлайн.
  - [old/style/minor] Слово «Leistungsabhängigkeit» звучит суховато и канцелярски, а фраза «sich auf die Fähigkeit zu verlassen» слегка тяжеловесна.
  - [new/style/major] Смешивание обращений: безличное «man» (man sich nicht mehr wertvoll fühlt) используется рядом с прямым «Sie» (wenn Sie lernen).
  - [new/style/minor] Транскреация «Selbstwert an Gefühle knüpfen» (привязывать самооценку к чувствам) психологически не совсем точна — обычно на чувства просто опираются.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 82 / NEW 75)
  - Перевод B точнее передает метафору опоры, тогда как вариант A искажает смысл неудачной конструкцией о привязке самооценки к чувствам. При этом оба перевода нарушают строгое правило гайдлайна, смешивая формы обращения «man» и «Sie» в соседних строках.
  - [new/style/major] Нарушено правило единообразия обращения: в смежных предложениях используются и безличное «man» (man sich nicht mehr wertvoll fühlt), и прямое «Sie» (wenn Sie lernen).
  - [new/mistranslation/major] Фраза «Selbstwert an Gefühle knüpfen» (привязывать самооценку к чувствам) звучит психологически абсурдно и искажает смысл оригинала «опираться на чувства» (искать в них опору).
  - [old/style/major] Нарушено правило единообразия обращения: в смежных предложениях используются и безличное «man» (man sich nicht mehr wertvoll fühlt), и прямое «Sie» (wenn Sie lernen).

#### 🟢 de `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Конечно, не стоит бросать все свои начинания или отказываться от важных целей, чтобы справиться с зависимостью от успеха. Ведь нет ничего плохого в том, чтобы иметь достижения. Прекрасно иметь деньги, работу, машину, квартиру и т.д. Проблемы начинаются тогда, …
- **OLD**: Natürlich sollten Sie nicht all Ihre Vorhaben oder wichtigen Ziele aufgeben, nur um die Abhängigkeit von Erfolg zu bewältigen. Denn es ist nichts Schlechtes, Erfolge zu haben. Es ist wunderbar, finanzielle Sicherheit, eine erfüllende Arbeit, ein schönes Zuhaus…
- **NEW**: Natürlich sollten Sie nicht all Ihre Vorhaben aufgeben oder wichtige Ziele vernachlässigen, nur um die Abhängigkeit von Erfolg zu bewältigen. Es ist schließlich nichts Schlechtes, Erfolge zu haben. Es ist schön, Geld, eine Arbeit, ein Auto, eine Wohnung usw. z…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 84)
  - Перевод B точнее передает смысл оригинала, не искажая перечисления (не заменяя «машину и квартиру» на абстрактную «финансовую безопасность»), и звучит естественнее. Однако оба перевода нарушают строгое правило об избегании безличного «man» и содержат дословную кальку в последнем предложении.
  - [old/addition/major] Конкретные вещи из оригинала («деньги, работу, машину, квартиру») заменены на вольный абстрактный пересказ («finanzielle Sicherheit, eine erfüllende Arbeit, ein schönes Zuhause»).
  - [old/style/major] Нарушение правила об обращении: использование безличного «man» (Betrachtet man es rational..., dass man sich...) вместо обязательного «Sie/Ihnen».
  - [old/style/major] Очень неестественная, «деревянная» формулировка: «das Leben enttäuscht vorfinden».
  - [old/style/major] Калька в конце текста: фраза «liegen Sie tief im Irrtum» звучит неестественно (носитель сказал бы «irren Sie sich gewaltig» или «sind Sie auf dem Holzweg»).
  - [old/mistranslation/minor] Фраза «Ihre Stimmung wird dadurch extrem anfällig» семантически неточна (уязвимым становится человек, а не само настроение).
  - [new/style/major] Нарушение правила об обращении: использование безличного «man» (Betrachtet man es rational..., dass man sich..., dass man nicht nach mehr streben darf) вместо обращения на «Sie».
  - [new/style/major] Калька в конце текста: «liegen Sie tief im Irrtum» (лучше использовать «irren Sie sich gewaltig»).
  - [new/terminology/minor] Для «настроения» в контексте сиюминутных перепадов лучше использовать «Stimmung», а не «Befinden» (общее самочувствие), согласно вашему глоссарию.
  - [new/style/minor] Слово «Erfolgreichkeit» грамматически допустимо, но звучит тяжеловесно и канцелярски; естественнее было бы просто «Erfolg».
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 93)
  - Перевод A точнее и звучит значительно естественнее. Перевод B содержит серьезную смысловую ошибку, неестественные лексические конструкции и неоправданную транскреацию, искажающую конкретику оригинала.
  - [old/mistranslation/major] Слово «Erfolgsquote» означает «вероятность успеха / процент успешных исходов», оно совершенно не подходит для перевода «успешность человека» (в значении уровня успешности в жизни).
  - [old/style/major] Фраза «das Leben enttäuscht vorfinden» звучит крайне неестественно и коряво для носителя (ожидается «vom Leben enttäuscht sein»).
  - [old/other/minor] Перевод конкретных благ («деньги, работу, машину») вольным перечислением с эпитетами («finanzielle Sicherheit, eine erfüllende Arbeit, ein schönes Zuhause») — неоправданный отход от текста.
  - [new/style/minor] Существительное «Erfolgreichkeit» (успешность) существует, но звучит довольно громоздко и академично; естественнее было бы просто «Erfolg».
  - [new/style/minor] Фраза «tief im Irrtum liegen» (присутствует в обоих переводах) понятна, но звучит как легкая калька с «глубоко ошибаетесь». Куда естественнее было бы «sich gewaltig/sehr irren».

#### 🟢 de `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Еще один частый сценарий — отсутствующий родитель. Дети объясняют всё через себя. Если папа ушел, значит, я был недостаточно хорошим, а не потому, что взрослые не смогли договориться. Значит, если я стану успешным, умным, лучшим — он вернется или хотя бы пойме…
- **OLD**: Ein weiteres häufiges Szenario ist die Abwesenheit eines Elternteils. Kinder versuchen oft, alles auf sich selbst zu beziehen. „Wenn der Vater geht, bedeutet das, dass ich nicht gut genug war“ – so denken Kinder oft, anstatt zu verstehen, dass die Erwachsenen …
- **NEW**: Ein weiteres häufiges Szenario ist die Abwesenheit eines Elternteils. Kinder versuchen dann, alles auf sich selbst zurückzuführen. „Wenn Papa gegangen ist, dann liegt es daran, dass ich nicht gut genug war, und nicht daran, dass die Erwachsenen keine gemeinsam…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 93)
  - Вариант А намного точнее передает структуру оригинала (сохраняя цельную цитату внутреннего монолога ребенка) и использует корректную лексику. Вариант В добавляет отсебятину и совершает лексическую ошибку при переводе «лишаете себя».
  - [new/style/minor] Нарушено правило единообразного обращения на «Sie»: фразы «Человек усваивает...» и «Хочется быть лучше...» переведены через безличное «man» (Man lernt... Man möchte...), что не соответствует правилу об исключении «man».
  - [new/addition/minor] Во фразе «Дети объясняют всё через себя» добавлен избыточный глагол «versuchen» (Kinder versuchen dann, alles auf sich selbst zurückzuführen), что слегка утяжеляет конструкцию.
  - [old/addition/major] Разбита и изменена форма прямой речи ребенка: добавлено много авторского пояснения («– so denken Kinder oft, anstatt zu verstehen, dass... Es entsteht der Glaube:»), которого совершенно нет в оригинале.
  - [old/style/major] Ошибка в управлении и лексике: фраза «sich (Dat.) andere Quellen der Freude entziehen» звучит неестественно в значении «лишать себя». Правильный оборот — «sich etwas vorenthalten» (как в А).
  - [old/style/minor] Как и в варианте А, использовано безличное «man» вместо «Sie» (Man lernt... Man möchte...), что нарушает гайдлайн по tone of voice.
  - [old/omission/minor] Потеряно слово «собственной» во фразе «ощущение собственной никчемности» (переведено просто как Gefühl der Wertlosigkeit, в то время как в А корректно der eigenen Wertlosigkeit).
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 90)
  - Перевод B точнее следует структуре оригинала, не добавляя лишнего текста, и использует более корректную лексику. Вариант A допускает неоправданную отсебятину и ошибку в сочетаемости («sich entziehen» вместо «sich vorenthalten»).
  - [old/addition/major] Добавлены поясняющие фразы («so denken Kinder oft, anstatt zu verstehen... Es entsteht der Glaube:»), которых нет в оригинале. В варианте B внутренний монолог передан более естественно и близко к тексту.
  - [old/style/major] Лексическая ошибка / корявость: «dass Sie sich andere Quellen der Freude entziehen». В значении «лишать себя» лучше подходит «sich etwas vorenthalten» (как в B) или «sich einer Sache berauben».
  - [old/style/minor] Калька с русского: «beim Wachsen helfen» (для личностного роста естественнее сказать «sich weiterzuentwickeln» или «persönliches Wachstum fördern»).
  - [new/style/minor] Калька с русского: «beim Wachsen helfen» (как и в A, звучит неестественно в контексте психологии/карьеры; лучше «sich weiterzuentwickeln»).
  - [new/style/minor] Буквальный перевод «в режиме постоянной занятости» как «in einem Modus ständiger Beschäftigung» (более по-немецки было бы «Sie sind ununterbrochen beschäftigt» или «Sie stehen unter Dauerstrom»).

#### 🟢 de `/exercise/description` — NEW лучше (2:0)

- **RU**: Статья обсуждает опасности зависимости от успеха, указывая на то, что достижения не гарантируют счастья и благополучия. Примеры знаменитостей, таких как Леди Гага и Джим Керри, иллюстрируют, что даже самые успешные люди могут страдать от депрессии и других про…
- **OLD**: Dieser Artikel beleuchtet die Gefahren einer Abhängigkeit von Erfolg und zeigt auf, dass Leistungen keine Garantie für Glück und Wohlbefinden sind. Beispiele von Persönlichkeiten wie Lady Gaga und Jim Carrey verdeutlichen, dass selbst die erfolgreichsten Mensc…
- **NEW**: Dieser Artikel befasst sich mit den Gefahren der Erfolgsabhängigkeit und zeigt auf, dass Leistungen keine Garantie für Glück und Wohlbefinden sind. Beispiele von Prominenten wie Lady Gaga und Jim Carrey verdeutlichen, dass selbst die erfolgreichsten Menschen u…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 92)
  - Übersetzung B ist lexikalisch präziser („Prominenten“ statt „Persönlichkeiten“) und gibt die Struktur des letzten Satzes originalgetreuer wieder (Plural „Zentrale Erkenntnisse“ sowie „Anerkennung“ für „признание“), während A im letzten Satz den Sinn leicht abwandelt.
  - [old/mistranslation/minor] „Persönlichkeiten“ ist zu ungenau für „знаменитостей“ (besser: Prominente).
  - [old/mistranslation/major] „Erkenntnis, dass der eigene Wert... besteht“ verschiebt den Fokus von der „Anerkennung der Wertigkeit eines jeden Menschen“ (Original: признание внутренней ценности каждого человека) hin zu einer bloßen Selbsterkenntnis.
  - [new/style/minor] „die Anerkennung des inneren Wertes eines jeden Menschen“ ist grammatikalisch korrekt, wirkt als Substantivkette aber etwas schwerfällig.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 94)
  - Перевод A точнее передает оригинальную структуру и термины (множественное число «Zentrale Erkenntnisse», «Prominenten» для «знаменитостей») и звучит элегантнее («Bedeutung» вместо «Wichtigkeit»). Перевод B допускает мелкие вольности, добавляя слово «äußeren» и меняя число.
  - [old/omission/minor] Слово «знаменитостей» переведено как более широкое «Persönlichkeiten» (личности), точнее было бы «Prominenten».
  - [old/mistranslation/minor] «Ключевыми выводами» (мн.ч.) переведено в единственном числе «Ein zentrales Ergebnis».
  - [old/addition/minor] Добавлено слово «äußeren» (внешних) к успехам, которого не было в оригинале.
  - [old/style/minor] Слово «Wichtigkeit» звучит чуть менее естественно и литературно в данном контексте, чем «Bedeutung» (вариант А).

#### 🟢 de `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Мы живем в эпоху «гонки за достижениями», где успех часто становится мерилом нашей ценности. Кажется, будто каждый может добиться всего, если достаточно постарается. Границ для амбиций нет, и это превращает жизнь в бесконечную гонку, где мы начинаем верить, чт…
- **OLD**: Wir leben in einer Ära des „Wettlaufs um den Erfolg“, in der Leistung oft zum Maßstab für unseren Selbstwert wird. Es scheint, als könne jeder alles erreichen, wenn er sich nur genug anstrengt. Ambitionen scheinen grenzenlos zu sein, was das Leben in ein endlo…
- **NEW**: Wir leben in einer Ära des „Wettlaufs um den Erfolg“, in der Leistung oft zum Maßstab für unseren Selbstwert wird. Es scheint, als könne jeder alles erreichen, wenn er sich nur genug anstrengt. Ambitionen scheinen grenzenlos zu sein, was das Leben in ein endlo…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 93)
  - Перевод А звучит гораздо естественнее, удачно оформляет мысли ребенка в виде прямой речи (что делает текст более читаемым) и сохраняет логические связи оригинала. Перевод В упускает важный контекст про мужчин и женщин, делая связность текста хуже, и использует неудачные стилистические решения (например, «brav» вместо «молодец»).
  - [new/omission/minor] В теге <instagram> утерян атрибут ids, остался только пустой тег.
  - [new/mistranslation/minor] Фраза «где мы начинаем верить» переведена безличной конструкцией «Dabei gerät immer mehr in den Fokus» (в фокус смещается то, что...), что немного меняет акцент и теряет личное «мы».
  - [old/omission/minor] В теге <instagram> утерян атрибут ids.
  - [old/mistranslation/major] Фраза «Одержимость достижениями встречается и у мужчин, и у женщин» обобщена до «Das Streben nach Leistung betrifft alle Menschen». Из-за потери упоминания полов следующее предложение («Сегодня женщины тоже...» — «Auch Frauen...») теряет логическую связность. Слово «Одержимость» неоправданно смягчено до «Streben».
  - [old/style/major] Фраза «Wer eine Eins schreibt, ist brav» звучит как сухая пословица. Слово «brav» означает «послушный/смирный», а не похвалу за оценку (здесь уместнее «toll», «super» или «gut gemacht», как адаптировано в версии А).
  - [old/style/minor] Конструкция «fühlen sich viele Männer besonders anfällig für das Gefühl des Scheiterns» тяжеловесна и неестественна для передачи смысла «уязвимы к неудачам».
  - [old/style/minor] Мысли ребенка от первого лица («Wenn der kleine Lukas...») никак не выделены кавычками, из-за чего переход от третьего лица к первому происходит слишком резко.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 88)
  - Перевод B точнее следует оригиналу в логике абзацев (сохранено противопоставление мужчин и женщин) и использует удачный стилистический прием с прямой речью для мыслей ребенка. Перевод A совершил серьезную логическую ошибку, обобщив фразу про пол, из-за чего последующие предложения теряют контекст. При этом оба перевода потеряли важный технический атрибут.
  - [old/omission/major] Удален атрибут ids="18074617231661593" в теге <instagram>, что приведет к поломке отображения компонента в приложении.
  - [new/omission/major] Удален атрибут ids="18074617231661593" в теге <instagram>, что приведет к поломке отображения компонента в приложении.
  - [old/mistranslation/major] Фраза «встречается и у мужчин, и у женщин» переведена как «betrifft alle Menschen». Из-за потери конкретного упоминания полов следующие два предложения (про женщин и про мужчин) кажутся вырванными из контекста.
  - [new/style/minor] Конструкция «где мы начинаем верить» переведена тяжелым канцелярским оборотом «Dabei gerät immer mehr in den Fokus, dass...», что звучит менее естественно и эмпатично, чем в оригинале.
  - [old/style/minor] Живые примеры с прямым обращением («Принес пятерку — молодец») переведены в отстраненном 3-м лице («Wer eine Eins schreibt...»), из-за чего текст теряет эмоциональную вовлеченность.

#### 🔴 de `/exercise/screen_3/texts` — OLD лучше (2:0)

- **RU**: <h2>Учитесь находить баланс</h2> Нередко люди, зависимые от успеха, чувствуют вину за то, что позволяют себе отдыхать, проводить время с близкими, заниматься тем, что не связано напрямую с их целями. Безусловно, достижения имеют определённое значение в жизни, …
- **OLD**: <h2>Finden Sie Ihr Gleichgewicht</h2> Menschen, die von Erfolg abhängig sind, fühlen sich oft schuldig, wenn sie sich Ruhe gönnen, Zeit mit ihren Liebsten verbringen oder sich Dingen widmen, die nicht direkt mit ihren Zielen zu tun haben. Natürlich haben Leist…
- **NEW**: <h2>Lernen Sie, die Balance zu finden</h2> Menschen, die von Erfolg abhängig sind, fühlen sich oft schuldig, wenn sie sich Ruhe gönnen, Zeit mit ihren Liebsten verbringen oder sich Dingen widmen, die nicht direkt mit ihren Zielen zu tun haben. Natürlich haben …
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Перевод B звучит гораздо естественнее, эмпатичнее и точнее передает поддерживающий тон оригинала. Перевод A местами буквален и содержит кальки («morgiges Leben»), что делает текст тяжеловесным.
  - [new/style/major] Фраза «von denen unser morgiges Leben abhängt» — неестественная калька с русского «от которых зависит наш завтрашний день». Правильно было бы использовать «unsere Zukunft».
  - [new/style/minor] Тяжеловесные и канцелярские формулировки: «kritischen Einstellung sich selbst gegenüber» (в B удачно заменено на «Selbstkritik»), «Erreichen beruflicher Spitzen».
  - [old/omission/minor] В первом заголовке упущено слово «Учитесь» (осталось только «Finden Sie...»). Хотя для немецкого заголовка это звучит хорошо, технически это опущение.
  - [old/mistranslation/minor] «Завтрашний день» переведено как «unser Alltag» (повседневная жизнь), хотя в оригинале речь идет скорее о будущем (Zukunft).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 93 / NEW 83)
  - Перевод A звучит гораздо естественнее, эмпатичнее и использует более удачные разговорные формулировки (например, «nicht gut genug zu sein» вместо академичного «unzulänglich»). Перевод B содержит стилистические кальки и небольшие неточности в лексике.
  - [old/style/minor] Выражение «завтрашний день» переведено как «Alltag» (будни), хотя по смыслу здесь точнее подошло бы «Zukunft» (будущее).
  - [old/addition/minor] Внутрь тега <q> добавлены кавычки, которых не было в оригинале (сам тег семантически уже подразумевает цитирование).
  - [new/style/major] Фраза «unser morgiges Leben» — это неестественная калька с русского «наш завтрашний день». Носителю привычнее сказать «unsere Zukunft».
  - [new/mistranslation/minor] «Liebenswürdige Menschen» означает «милые/любезные люди», что не совсем точно передаёт смысл оригинала «любящие люди» (как в переводе А — liebende Menschen).
  - [new/style/minor] Слово «unzulänglich» (неполноценный, недостаточный) звучит чересчур сухо и академично для поддерживающего текста. Вариант А («nicht gut genug») гораздо лучше попадает в нужный tone of voice.

#### 🟢 de `/exercise/title` — NEW лучше (2:0)

- **RU**: Как перестать жить достижениями?
- **OLD**: Wie man aufhört, nur für Erfolge zu leben?
- **NEW**: Wie können Sie aufhören, nur für Erfolge zu leben?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Перевод A использует обязательное вежливое обращение «Sie» и звучит как естественный вопрос. Перевод B грубо нарушает правило, используя запрещённое безличное местоимение «man».
  - [old/style/major] Использование безличного местоимения «man» запрещено правилами для заголовков и вопросов; необходимо использовать обращение «Sie».
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 60 / NEW 95)
  - Перевод B корректно использует обязательное вежливое обращение «Sie» и строит естественный прямой вопрос. Перевод A нарушает жесткое правило, используя безличное местоимение «man».
  - [old/style/major] Использование безличного «man» запрещено правилами (допустимо только в определениях), требуется обращение «Sie».
  - [old/style/minor] Конструкция вопроса скалькирована с русского: использован синтаксис придаточного предложения (Wie man aufhört...) вместо полноценного вопросительного.

