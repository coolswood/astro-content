# QA: слепое парное сравнение переводов — chunk20-pathmap

- **Дата**: 2026-09-12T06:39:51.523Z
- **Метка**: chunk20-pathmap
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir /tmp/pm40-snapshot
- **Файлы**: story/depression/duty_guilt_incrimination.json
- **Локали**: de
- **Сэмпл/файл**: 12
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 1b132071577fba3bdfc0ada4e5f427e8eb98a14b

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/duty_guilt_incrimination.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 12 | 🟢 2 | 🔴 5 | ⚪ 0 | 🟡 5 | 0 / 0 | 29% |
| **итого** | 12 | 🟢 2 | 🔴 5 | ⚪ 0 | 🟡 5 | 0 / 0 | 29% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×9, style/major×2, addition/major×1, terminology/minor×1, terminology/major×1; OLD — style/minor×8, terminology/minor×3, style/major×1, omission/minor×1

### Детали пар (для спот-чека)

#### 🔴 de `/incrimination/screen_1/texts` — OLD лучше (2:0)

- **RU**: Один из типичных симптомов депрессии – склонность к самообвинению, чувство собственной неполноценности, отсутствие собственной ценности и значимости. Человек часто присваивает себе ярлыки "неудачника", "ничтожества", считая себя плохим. Чем тяжелее степень деп…
- **OLD**: Ein typisches Symptom der Depression ist die Neigung zu Selbstvorwürfen sowie das Gefühl der Unzulänglichkeit und der eigenen Bedeutungslosigkeit. Betroffene stigmatisieren sich oft selbst als „Versager“ oder „Nichts“ und sind überzeugt, ein schlechter Mensch …
- **NEW**: Ein typisches Symptom der Depression ist die Neigung zur Selbstbeschuldigung sowie Gefühle der Unzulänglichkeit und ein Mangel an Selbstwert und Bedeutung. Betroffene neigen oft dazu, sich selbst als „Versager“ oder „Nutzloser“ zu stigmatisieren und sich als s…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Перевод B звучит более естественно и профессионально. В первом абзаце перевод B лучше передает смысл 'отсутствия ценности и значимости' через 'Bedeutungslosigkeit', в то время как в A конструкция 'Mangel an Selbstwert und Bedeutung' звучит тяжеловесно. Также в B более удачно передана фраза 'это непросто' (alles andere als leicht) и финальная цитата.
  - [new/style/minor] Конструкция 'Mangel an Selbstwert und Bedeutung' звучит как калька и слишком официально/сухо.
  - [new/style/minor] Использование 'Nutzloser' в контексте ярлыков звучит чуть менее естественно, чем 'Nichts' в B.
  - [old/style/minor] В последней цитате использованы кавычки „“, что соответствует правилам, но в оригинале была структура с атрибутом author, здесь всё корректно.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Перевод A звучит более естественно и литературно. В переводе B допущены стилистические шероховатости (например, 'Mangel an Selbstwert' звучит тяжеловесно) и есть небольшая ошибка в цитате (отсутствие кавычек, хотя в оригинале они есть). Перевод A лучше передает нюансы самоощущения.
  - [new/style/minor] Конструкция 'Mangel an Selbstwert und Bedeutung' звучит избыточно и менее естественно, чем 'Gefühl der Bedeutungslosigkeit' в A.
  - [new/omission/minor] В цитате отсутствуют немецкие типографские кавычки „ “, которые были в оригинале и должны быть в качественном переводе.

#### 🟢 de `/guilt/description` — NEW лучше (2:0)

- **RU**: Статья исследует взаимосвязь между чувством вины и депрессией, подчёркивая, как избыточное или необоснованное чувство вины может способствовать развитию депрессивных состояний. Авторы описывают различие между здоровым и нездоровым чувством вины, обсуждая, как …
- **OLD**: Dieser Artikel untersucht die Verbindung zwischen Schuldgefühlen und Depressionen und zeigt auf, wie übermäßige oder unbegründete Schuldgefühle zur Entwicklung depressiver Zustände beitragen können. Es wird zwischen gesundem und ungesundem Schuldgefühl untersc…
- **NEW**: Dieser Artikel untersucht die Wechselwirkung zwischen Schuldgefühlen und Depressionen und zeigt auf, wie übermäßige oder unbegründete Schuldgefühle zur Entwicklung depressiver Zustände beitragen können. Dabei wird zwischen gesundem und ungesundem Schuldgefühl …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 97)
  - Перевод B более точен терминологически и стилистически. Использование 'Wechselwirkung' вместо 'Verbindung' лучше передает научный контекст 'взаимосвязи', а 'verbessern' в конце звучит естественнее для контекста благополучия, чем 'steigern'.
  - [old/terminology/minor] Verbindung — слишком общее слово, 'Wechselwirkung' (B) лучше подходит для описания взаимосвязи явлений в научной статье.
  - [old/style/minor] Letzteres должно писаться со строчной буквы, если это не начало предложения (хотя в некоторых стилях допустимо, в B соблюден стандарт).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Перевод A стилистически более совершенен благодаря использованию связки 'Dabei', которая делает текст плавным и академически грамотным. Перевод B содержит орфографическую ошибку в слове 'Letzteres' (в данном контексте это не существительное, а местоименное прилагательное, поэтому пишется со строчной буквы).
  - [old/style/minor] Letzteres should be lowercase (letzteres) as it functions as a pronoun/adjective here, not a noun.

#### 🟡 de `/duty/description`— вердикт неустойчив

- **RU**: В этой статье мы погружаемся в мир когнитивных искажений, раскрывая, как они влияют на наше восприятие реальности и психологическое здоровье. Особое внимание уделяется пониманию и коррекции "долженствования", с целью помочь читателям обрести более осознанный и…
- **OLD**: In diesem Artikel tauchen wir in die Welt der kognitiven Verzerrungen ein und zeigen auf, wie sie unsere Wahrnehmung der Realität und unsere psychische Gesundheit beeinflussen. Ein besonderer Schwerpunkt liegt auf dem Verständnis und der Korrektur von „Muss-De…
- **NEW**: In diesem Artikel beschäftigen wir uns mit kognitiven Verzerrungen und zeigen auf, wie sie unsere Wahrnehmung der Realität sowie unser psychisches Befinden beeinflussen. Ein besonderer Schwerpunkt liegt auf dem Verständnis und der Korrektur von „Muss“-Sätzen, …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A более точен в передаче психологического термина «долженствование» через «Muss-Sätze» (или «Muss-Verhalten»), что является стандартным описанием когнитивного искажения. Перевод B использует «Muss-Denken», что звучит менее профессионально, и заменяет «радостный взгляд» на «erfülltere Sicht», что является смысловым отступлением.
  - [old/terminology/minor] «Muss-Denken» — менее точный эквивалент для психологического термина «долженствование» (Must-thinking/Should-statements), чем «Muss-Sätze».
  - [old/style/minor] «erfülltere Sicht auf das Leben» (более наполсный взгляд) — это вольная интерпретация «радостного взгляда» (lebensfreudigere Sicht).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 85)
  - Перевод A звучит более естественно и профессионально. Термин „Muss-Denken“ гораздо лучше передает суть психологического феномена «долженствования», чем технически сухое „Muss“-Sätze в варианте B. Также вариант A лучше передает эмоциональный окрас оригинала (erfülltere Sicht vs lebensfreudigere Sicht auf die Welt).
  - [new/style/minor] „Muss“-Sätze звучит слишком узко и технично, как лингвистический термин, а не психологический паттерн.
  - [new/style/minor] „Sicht auf die Welt“ (взгляд на мир) — допустимо, но „Sicht auf das Leben“ (взгляд на жизнь) из оригинала звучит более органично в данном контексте.

#### 🔴 de `/duty/test/answers` — OLD лучше (2:0)

- **RU**: Они не позволяют объективно воспринимать действительность Они влияют на интеллектуальные способности С ними невозможно добиться успеха в жизни Когнитивные искажения скорее полезны
- **OLD**: Sie verhindern eine objektive Wahrnehmung der Realität Sie beeinträchtigen die intellektuellen Fähigkeiten Mit ihnen ist es unmöglich, im Leben erfolgreich zu sein Kognitive Verzerrungen sind eher nützlich
- **NEW**: Weil sie verhindern, die Realität objektiv wahrzunehmen Weil sie die intellektuellen Fähigkeiten beeinflussen Weil man mit ihnen im Leben keinen Erfolg haben kann Kognitive Verzerrungen sind eher nützlich
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Перевод B звучит гораздо естественнее и профессиональнее. Перевод A страдает от избыточного использования союза 'Weil' (потому что), которого нет в оригинале, что превращает утвердительные предложения в придаточные и создает эффект незаконченности.
  - [new/addition/major] Добавлено 'Weil' в начале первых трех предложений, что искажает структуру оригинала и делает текст грамматически зависимым.
  - [new/style/minor] Конструкция 'verhindern, die Realität... wahrzunehmen' допустима, но менее элегантна, чем существительное в B.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 70)
  - Перевод A точно передает структуру и смысл оригинальных утверждений. Перевод B ошибочно добавляет союз 'Weil' (Потому что) в начале каждой фразы, что превращает утверждения в незаконченные придаточные предложения и искажает смысл оригинала.
  - [new/addition/major] Добавлено 'Weil' в начале строк, чего нет в оригинале, что меняет грамматическую роль предложений

#### 🔴 de `/duty/title` — OLD лучше (2:0)

- **RU**: Долженствование - бег в кандалах
- **OLD**: „Muss-Denken“ – Ein Lauf in Ketten
- **NEW**: „Muss“-Sätze – Ein Gefängnis aus starren Regeln
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Перевод B гораздо точнее передает метафору оригинала, сохраняя образ бега и цепей, в то время как перевод A уходит в интерпретацию про 'жесткие правила', теряя поэтичность и динамику.
  - [new/style/major] Слишком сильная интерпретация: 'starre Regeln' (жесткие правила) — это смысловое расширение, которое убивает метафору 'бега в кандалах'.
  - [new/terminology/minor] Термин 'Muss-Sätze' (предложения с 'должен') звучит скорее лингвистически, чем психологически.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 65)
  - Перевод A сохраняет метафору оригинала (бег в кандалах), в то время как перевод B полностью меняет смысл, заменяя метафору на описание правил. Перевод A также использует более точный термин для психологического контекста.
  - [new/mistranslation/major] Метафора 'бег в кандалах' заменена на 'тюрьму из жестких правил', что является потерей оригинального образа.
  - [new/style/minor] Термин 'Muss-Sätze' звучит скорее как описание грамматических конструкций, чем как психологическое состояние.

#### 🔴 de `/incrimination/title` — OLD лучше (2:0)

- **RU**: Самооценка в омуте депрессии: Путь к самопринятию и внутреннему балансу
- **OLD**: Selbstwertgefühl im Sog der Depression: Der Weg zu Selbstakzeptanz und innerer Balance
- **NEW**: Selbstwertgefühl in der Tiefe der Depression: Der Weg zu Selbstakzeptanz und innerer Balance
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Перевод A использует метафору 'Sog' (затягивание, водоворот), что идеально передает экспрессивное русское 'в омуте' и звучит литературно. Перевод B слишком буквален ('in der Tiefe'), что делает заголовок сухим.
  - [new/style/minor] Слишком простая, описательная конструкция, теряется поэтичность и эмоциональный окрас оригинала 'в омуте'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Перевод B гораздо точнее передает метафору 'омута' через слово 'Sog' (затягивающее течение, водоворот), что звучит естественно и эмоционально глубоко. Перевод A использует 'Tiefe' (глубина), что является слишком буквальным и плоским переводом, теряющим образность оригинала.
  - [new/style/minor] Слишком буквальный перевод метафоры 'омут' (Tiefe вместо Sog/Strudel), что делает заголовок менее выразительным.

#### 🔴 de `/incrimination/screen_4/texts` — OLD лучше (2:0)

- **RU**: Начните предъявлять такие же требования к своим близким и друзьям. Но будьте максимально честны. И когда вы начнете это делать, вы поймете, насколько несправедлива ваша критика на самом деле. Ваша самооценка – это важнейший мотив при постановке жизненной цели …
- **OLD**: Versuchen Sie einmal, dieselben Maßstäbe auch an Ihre Freunde und Menschen in Ihrem engen Umfeld anzulegen. Seien Sie dabei absolut ehrlich zu sich selbst. Sie werden erkennen, wie ungerecht Ihre eigene Selbstkritik in Wirklichkeit ist. Ihr Selbstwertgefühl is…
- **NEW**: Beginnen Sie damit, Ihre Angehörigen und Freunde mit denselben Maßstäben zu messen. Aber seien Sie dabei maximal ehrlich. Sobald Sie das tun, werden Sie erkennen, wie ungerecht Ihre Kritik in Wirklichkeit ist. Ihr Selbstwertgefühl spielt eine entscheidende Rol…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод B звучит гораздо более естественно и эмпатично, избегая тяжеловесных конструкций. Использование 'Denkmuster' вместо 'Denkgewohnheiten' и 'vorstellen' вместо 'analysieren' делает текст живым, а не академическим.
  - [new/style/minor] Конструкция 'Beginnen Sie damit...' звучит немного формально и тяжеловесно для терапевтического контекста. 'Analysieren' в конце звучит слишком сухо/научно по сравнению с 'vorstellen'.
  - [new/style/minor] Использование 'Angehörigen' в данном контексте может звучать слишком официально (как 'родственники' в юридическом смысле), в то время как 'Menschen im engen Umfeld' в B передает теплоту оригинала лучше.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Перевод A звучит гораздо естественнее и профессиональнее. Он избегает калек с русского синтаксиса и использует живые немецкие обороты (например, 'Menschen in Ihrem engen Umfeld' вместо тяжеловесного 'Angehörigen').
  - [new/style/major] Конструкция 'Angehörige mit Maßstäben messen' звучит неестественно и напоминает кальку с русского; в немецком лучше использовать 'Maßstäbe an jemanden anlegen'.
  - [new/style/minor] Фраза 'maximal ehrlich' звучит несколько разговорно/поверхностно по сравнению с более глубоким 'absolut ehrlich zu sich selbst'.
  - [new/style/minor] Использование 'Denkgewohnheiten' допустимо, но 'Denkmuster' (в варианте A) — более устоявшийся термин в контексте КПТ.

#### 🟡 de `/duty/screen_2/texts`— вердикт неустойчив

- **RU**: В нашем приложении мы выделили самые важные когнитивные искажения, которые можно изучить на соответствующей странице в дневнике автоматических мыслей. В этом курсе мы подробно рассмотрим три самые распространенные ошибки. Начнем с искажения «долженствование». …
- **OLD**: In unserer App haben wir die wichtigsten kognitiven Verzerrungen hervorgehoben, die Sie auf der entsprechenden Seite in Ihrem Gedankentagebuch vertiefen können. In diesem Kurs werden wir uns drei der häufigsten Denkfehler im Detail ansehen. Wir beginnen mit de…
- **NEW**: In unserer App haben wir die wichtigsten kognitiven Verzerrungen zusammengestellt, die Sie auf der entsprechenden Seite im Gedankentagebuch vertiefen können. In diesem Kurs schauen wir uns drei der häufigsten Denkfehler genauer an. Wir beginnen mit den „Muss“-…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Перевод A звучит более естественно для немецкого пользователя. Использование термина „Muss“-Sätze (предложения с «должен») гораздо точнее передает суть психологического феномена в немецком языке, чем искусственно сконструированное „Muss-Denken“. Перевод A также лучше справляется с ритмикой текста.
  - [old/style/minor] „Muss-Denken“ звучит как калька и не является устоявшимся термином; в немецкой психологии чаще говорят о „Muss-Sätzen“ или „Modalverben“ (в контексте когнитивных искажений).
  - [old/style/minor] Фраза „man muss Schuldgefühle... ertragen“ звучит немного тяжеловесно по сравнению с более естественным „wir fühlen uns schuldig“ в переводе A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A значительно лучше передает психологический термин 'долженствование'. В немецкой психотерапии (КПТ) это явление описывается как 'Muss-Denken' или 'Muss-Sätze', но вариант A с 'Muss-Denken' звучит более профессионально и цельно как название когнитивного искажения. Перевод B использует кавычки вокруг 'Muss'-Sätze, что выглядит более фрагментарно. Также в A лучше выдержан ритм и естественность конструкций (например, 'prallen wir hart auf die Realität').
  - [new/style/minor] Использование 'Muss-Sätze' как названия искажения звучит чуть менее академично, чем 'Muss-Denken'.
  - [new/style/minor] Фраза 'oder wir fühlen uns schuldig' (или мы чувствуем себя виноватыми) — это хорошая адаптация, но вариант A 'Schuldgefühle ertragen' (терпеть чувство вины) чуть точнее передает тяжесть состояния, описанную в оригинале.

#### 🟡 de `/incrimination/screen_3/texts`— вердикт неустойчив

- **RU**: Во-первых, важно осознать, что свою ценность нельзя заслужить. Успех, конечно, может доставить удовольствие, но не счастье. А самооценка, основанная на достижениях, – это псевдосамооценка, она нереалистична. Многие успешные, но несчастные люди, страдающие депр…
- **OLD**: Erstens ist es wichtig zu verstehen, dass man sich seinen Wert nicht verdienen kann. Erfolg kann zwar Freude bereiten, aber kein dauerhaftes Glück. Ein Selbstwertgefühl, das nur auf Leistungen basiert, ist eine Schein-Selbstwertschätzung – sie ist unrealistisc…
- **NEW**: Erstens ist es wichtig zu verstehen, dass man sich seinen Wert nicht verdienen kann. Erfolg kann zwar Freude bereiten, aber er macht nicht glücklich. Ein Selbstwertgefühl, das nur auf Leistungen basiert, ist ein Scheinwert – er ist nicht realistisch. Viele erf…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Перевод A звучит более естественно и профессионально. В нем лучше передана нюансировка терминов (например, 'Schein-Selbstwertschätzung' вместо странного 'Scheinwert') и соблюден более плавный ритм предложений, характерный для качественной психологической литературы.
  - [new/style/minor] Конструкция 'er macht nicht glücklich' звучит чуть более просторечно по сравнению с элегантным 'aber kein dauerhaftes Glück' в A.
  - [new/terminology/major] Использование 'Scheinwert' (мнимый номинал/стоимость) вместо 'Schein-Selbstwertschätzung' (псевдосамооценка) искажает психологический контекст оригинала.
  - [new/style/minor] Фраза 'wollten oder könnten' в прошедшем времени (Konjunktiv II) в данном контексте звучит менее естественно, чем 'möchten oder könnten' в A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод A звучит более естественно и гладко. В переводе B есть стилистические шероховатости, такие как избыточное использование 'Selbst-' в одном слове (Schein-Selbstwertschätzung) и менее удачные синтаксические конструкции в блоке про осознанность.
  - [old/style/minor] „Schein-Selbstwertschätzung“ звучит тяжеловесно и неестественно; вариант A „Scheinwert“ гораздо лучше.
  - [old/style/minor] „Ein sehr wichtiger Schritt zur Erkenntnis ist die bewusste Aufmerksamkeit für das, was man...“ — слишком номинативный, тяжелый стиль (Nominalstil), в то время как вариант A более живой.

#### 🟡 de `/duty/screen_3/texts`— вердикт неустойчив

- **RU**: Как работать с этим искажением? Первый шаг — осознание. Следите за своими мыслями и записывайте их, когда они содержат «должен», «обязан», «надо». Это поможет понять, как «долженствование» влияет на ваши эмоции. Второй шаг — оспаривание. Задайте себе вопросы: …
- **OLD**: Wie geht man mit dieser Verzerrung um? Der erste Schritt ist die Achtsamkeit. Beobachten Sie Ihre Gedanken und notieren Sie diese, wenn sie Wörter wie „muss“, „sollte“ oder „muss unbedingt“ enthalten. Das hilft Ihnen zu verstehen, wie „Muss-Denken“ Ihre Emotio…
- **NEW**: Wie können Sie mit dieser Verzerrung umgehen? Der erste Schritt ist die Bewusstwerdung. Achten Sie auf Ihre Gedanken und notieren Sie diese, wenn sie Wörter wie „müssen“, „sollen“ oder „muss“ enthalten. Das hilft Ihnen zu verstehen, wie diese „Muss“-Sätze Ihre…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Перевод A лучше передает нюансы оригинала и звучит более естественно. Перевод B содержит ошибки в пунктуации (использование прямых кавычек вместо немецких „“) и менее удачно переводит примеры (например, 'fehlerfrei sein' звучит слишком технически/идеалистично по сравнению с 'keine Schwächen haben').
  - [old/style/major] Использование прямых кавычек вместо типографских „“, что нарушает правила немецкой типографики.
  - [old/style/minor] Фраза 'fehlerfrei sein' (быть без ошибок) звучит менее естественно в контексте человеческих недостатков, чем 'keine Schwächen haben'.
  - [old/terminology/minor] 'Achtsamkeit' — это Mindfulness, в то время как в оригинале 'осознание' (Bewusstwerdung) в контексте первого шага КПТ.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Перевод A гораздо лучше справляется с передачей психологического термина «долженствование» через естественное для немецкого языка «Muss-Denken». Перевод B использует кальку «Muss-Sätze», что звучит неестественно и не является устоявшимся термином. Также в A лучше переданы примеры (особенно про недостатки) и соблюдена типографика кавычек.
  - [new/terminology/major] Использование «Muss-Sätze» вместо «Muss-Denken» (Musturbation/Should-statements) звучит как плохой перевод, а не как психологический термин.
  - [new/style/minor] В примерах внутри <li> отсутствуют немецкие типографские кавычки „“, которые были в оригинале и необходимы для корректного отображения.
  - [new/style/minor] Фраза «Ich würde gerne keine Schwächen haben» звучит тяжеловесно по сравнению с элегантным «Ich würde gerne fehlerfrei sein» в варианте A.

#### 🟢 de `/duty/screen_1/texts` — NEW лучше (2:0)

- **RU**: Теперь мы понимаем, что психологическое состояние человека тесно связано с его мышлением. В состоянии депрессии мы склонны искажать факты, словно смотрим на мир через серое стекло: он кажется менее ярким, чем через прозрачное. Депрессия искажает нашу способнос…
- **OLD**: Wir wissen nun, dass die psychische Verfassung eng mit unserem Denken verknüpft ist. In einer depressiven Phase neigen wir dazu, die Welt durch eine graue Brille zu betrachten: Alles erscheint weniger lebendig, als es eigentlich ist. Eine Depression kann es er…
- **NEW**: Wir wissen nun, dass unser psychisches Befinden eng mit unseren Gedanken verknüpft ist. In einer depressiven Phase neigen wir dazu, Fakten zu verzerren – fast so, als würden wir die Welt durch eine graue Brille betrachten: Alles wirkt weniger lebendig als durc…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B звучит более естественно и литературно, лучше передавая метафору 'прозрачного стекла' через 'klare Linse'. Перевод A содержит небольшую стилистическую шероховатость в описании когниции и менее точно передает финальную часть предложения про реальность.
  - [old/style/minor] Фраза 'als es eigentlich ist' (чем есть на самом деле) немного уходит от оригинала 'чем через прозрачное' (сравнение с инструментом восприятия).
  - [old/style/minor] Конструкция 'Prozess des Erkennens, der Gedanken...' звучит тяжеловесно по сравнению с более гладким вариантом в B.
  - [old/omission/minor] В последнем предложении перед цитатой потеряно уточнение 'и самой реальности' (und der Wirklichkeit selbst), оставлено только 'факты'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A значительно лучше передает метафору оригинала (прозрачное стекло/линза) и звучит более естественно и профессионально. Перевод B допускает смысловую потерю в первом абзаце, пропуская часть сравнения, и содержит стилистически слабые конструкции.
  - [old/omission/major] В первом абзаце пропущено сравнение с 'прозрачным стеклом/линзой', что важно для полноты метафоры.
  - [old/style/minor] Конструкция 'kann es erschweren' является калькой (es-падеж), хотя и допустима, но менее изящна, чем вариант в A.
  - [old/style/minor] Фраза 'Prozess des Erkennens' звучит несколько тяжеловесно по сравнению с 'Prozess, der... umfasst'.

#### 🟡 de `/guilt/screen_4/texts`— вердикт неустойчив

- **RU**: <h2>Нездоровое чувство вины</h2> Человек также понимает, что поступил неправильно. Но в отличие от первого случая, он верит, что в момент совершения дурного поступка мог бы поступить иначе. <important>Он мог бы преодолеть свои тогдашние понимание, незнание, оп…
- **OLD**: <h2>Ungesundes Schuldgefühl</h2> Die Person erkennt zwar, dass sie sich falsch verhalten hat. Doch im Gegensatz zum ersten Fall glaubt sie, dass sie im Moment der Tat anders hätte handeln können. <important>Sie glaubt, sie hätte ihre damaligen Einschränkungen,…
- **NEW**: <h2>Ungesundes Schuldgefühl</h2> Die Person erkennt zwar, dass sie sich falsch verhalten hat. Doch im Gegensatz zum ersten Fall glaubt sie, dass sie im Moment der Tat hätte anders handeln können. <important>Sie glaubt, sie hätte ihre damaligen Einschränkungen,…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A звучит более естественно и профессионально. В переводе B есть стилистические избыточности (плеоназмы), такие как 'absichtlich und mit voller Absicht', что звучит как плохой перевод, а не живая речь. Также в A лучше передана логика фразы 'Мог, значит, мог и точка'.
  - [new/style/major] Плеоназм 'absichtlich und mit voller Absicht' (намеренно и с полной намеренностью) — это тавтология, которая звучит неестественно для носителя.
  - [new/style/minor] Фраза 'Man konnte also, also war es möglich' содержит лишнее 'also', что делает ритм предложения рваным.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A более точен и стилистически выверен. В переводе B допущены смысловые искажения в ключевых моментах: фраза 'Man konnte, also hätte man es auch tun müssen' (Мог, значит, должен был) слишком сильно уходит от оригинала 'Мог, значит, мог и точка', а 'nicht erlaubt' (не разрешено) звучит слишком официально/запретительно по сравнению с 'nicht möglich' (невозможно/не допускается) в контексте психологического процесса.
  - [old/mistranslation/major] Фраза 'Man konnte, also hätte man es auch tun müssen' искажает смысл оригинала 'Мог, значит, мог и точка', добавляя оттенок долженствования, которого нет в тексте.
  - [old/style/minor] Использование 'nicht erlaubt' (не разрешено) звучит слишком жестко и формально для описания внутреннего состояния, 'nicht möglich' в варианте A подходит лучше.
  - [old/omission/minor] В последнем пункте пропущено слово 'Schuldgefühl' в конце предложения, что делает конструкцию грамматически незавершенной (хотя в немецком это допустимо, вариант A звучит полнее).

