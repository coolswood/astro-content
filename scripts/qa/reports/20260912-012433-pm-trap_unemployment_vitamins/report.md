# QA: слепое парное сравнение переводов — pm-trap_unemployment_vitamins

- **Дата**: 2026-09-11T22:24:33.858Z
- **Метка**: pm-trap_unemployment_vitamins
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/depression/trap_unemployment_vitamins.json
- **Локали**: de
- **Сэмпл/файл**: 12
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 0ffe2e361a8bb99466cf1318df00cc792140a092

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/trap_unemployment_vitamins.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 12 | 🟢 5 | 🔴 0 | ⚪ 0 | 🟡 7 | 1 / 0 | 100% |
| **итого** | 12 | 🟢 5 | 🔴 0 | ⚪ 0 | 🟡 7 | 1 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×6, style/critical×1, terminology/major×1; OLD — style/minor×15, style/major×2, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟢 de `/trap/screen_3/texts` — NEW лучше (2:0)

- **RU**: <li>Людьми, склонными к чрезмерному чувству вины, могут манипулировать окружающие ради достижения своих целей. Подумайте: сколько раз вы соглашались пойти на встречу без особого желания из стремления угодить или чтобы никто не обиделся? Важно отстаивать личные…
- **OLD**: <li>Menschen, die zu starken Schuldgefühlen neigen, können von ihrem Umfeld manipuliert werden, um deren Ziele zu erreichen. Überlegen Sie: Wie oft haben Sie zugestimmt, etwas ohne wirkliche Lust zu tun, nur um es anderen recht zu machen oder niemanden zu verl…
- **NEW**: <li>Menschen, die zu übermäßigen Schuldgefühlen neigen, lassen sich oft von ihrem Umfeld manipulieren, um deren Ziele zu erreichen. Überlegen Sie einmal: Wie oft haben Sie zugestimmt, etwas gegen Ihren eigentlichen Willen zu tun, nur um es anderen recht zu mac…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A звучит более естественно и профессионально. В нем лучше переданы нюансы (например, 'Bindung an Dinge' вместо более резкого 'Sucht nach materiellen Dingen'), а также соблюдены требования по терминологии (использование 'Denkfehler' в контексте упражнения и 'Alternative Antwort' для колонки 3, что соответствует духу КПТ-инструкций).
  - [old/style/minor] Использование 'Sucht nach materiellen Dingen' звучит слишком клинически и тяжело для примера, в то время как 'Bindung an Dinge' в A лучше передает контекст зависимости от вещей в бытовом плане.
  - [old/terminology/minor] В колонке 2 использован термин 'kognitive Verzerrungen', что верно, но в контексте интерфейса/упражнения 'Denkfehler' (как в A) часто предпочтительнее для легкости чтения, хотя это не критично. Однако в колонке 3 'rationale Antwort' менее точно соответствует принятому в глоссарии 'Alternative Antwort'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B значительно лучше следует предоставленному глоссарию и звучит более естественно для немецкого пользователя. В частности, B использует правильные термины 'Denkfehler' и 'Alternative Antwort', в то время как A использует более буквальные или менее подходящие в данном контексте варианты. Также B лучше передает нюансы оригинала в части описания границ.
  - [old/terminology/major] Использовал 'kognitive Verzerrungen' и 'rationale Antwort', что грамматически верно, но в контексте интерфейса и согласно глоссарию предпочтительнее 'Denkfehler' и 'Alternative Antwort'.
  - [old/style/minor] Перевод 'belastende und wertende Gedanken' допустим, но 'selbstverurteilende' (как в B) точнее передает эмоциональный окрас 'осуждающих' в контексте самокритики.

#### 🟡 de `/vitamins/title`— вердикт неустойчив

- **RU**: Ложная депрессия: Как гормоны и витамины влияют на наше эмоциональное здоровье
- **OLD**: Pseudo-Depression: Wie Hormone und Vitamine unsere emotionale Gesundheit beeinflussen
- **NEW**: „Pseudo-Depression“: Wie Hormone und Vitamine unser emotionales Befinden beeinflussen
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Перевод A использует правильные немецкие типографские кавычки („“) и более естественный для медицинского/терапевтического контекста термин 'Befinden' вместо буквального 'Gesundheit'.
  - [old/style/minor] Использованы прямые кавычки вместо немецких типографских „“; 'emotionale Gesundheit' звучит чуть более сухо и менее эмпатично, чем 'emotionales Befinden'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Перевод A — это идеальный, естественный заголовок. Перевод B избыточно использует кавычки и заменяет 'Gesundheit' на 'Befinden', что в контексте заголовка о влиянии факторов на здоровье звучит менее масштабно и менее естественно.
  - [new/style/minor] Использование кавычек в заголовке не требуется и выглядит излишне; 'emotionales Befinden' звучит чуть более узко, чем 'emotionale Gesundheit'.

#### 🟢 de `/vitamins/description` — NEW лучше (2:0)

- **RU**: В статье обсуждается, как физическое здоровье, включая гормональный баланс и уровень витаминов, может влиять на эмоциональное состояние человека. Она подчеркивает, что симптомы, часто ассоциируемые с депрессией, могут быть вызваны физическими проблемами, таким…
- **OLD**: Dieser Artikel erörtert, wie die körperliche Gesundheit, einschließlich des Hormonhaushalts und des Vitaminspiegels, den emotionalen Zustand beeinflussen kann. Er hebt hervor, dass Symptome, die oft mit Depressionen assoziiert werden, durch körperliche Problem…
- **NEW**: Dieser Artikel beleuchtet, wie die körperliche Gesundheit – einschließlich des Hormonhaushalts und des Vitaminspiegels – das emotionale Befinden beeinflussen kann. Er verdeutlicht, dass Symptome, die häufig mit einer Depression assoziiert werden, auch durch kö…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B звучит более естественно и профессионально для немецкого читателя. Использование 'beleuchtet' вместо 'erörtert' и 'Befinden' вместо 'Zustand' делает текст менее сухим, а использование пассивной конструкции 'Es wird betont' в последнем предложении избавляет от тяжеловесного перевода 'Авторы делают акцент'.
  - [old/style/minor] Слишком академичный и слегка тяжеловесный тон ('erörtert', 'Zustand'), характерный для прямого перевода с русского.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A звучит гораздо более естественно и профессионально для немецкого читателя. Использование 'das emotionale Befinden' и 'psychische Beschwerden' вместо калькированных 'emotionalen Zustand' и 'psychische Störungen' делает текст менее сухим и более эмпатичным. В переводе B допущена грамматическая ошибка (повтор 'als als').
  - [old/style/major] Дублирование союза 'als als' в последнем предложении.
  - [old/style/minor] Использование 'emotionalen Zustand' звучит как калька с русского, 'Befinden' в данном контексте предпочтительнее.

#### 🟡 de `/vitamins/screen_2/texts`— вердикт неустойчив

- **RU**: В середине 20 века возникла целая научная дисциплина - психоэндокринология, изучающая взаимосвязь между эндокринной системой человека и его психикой. Есть даже такой термин, психоэндокринный синдром – это нарушение психики, возникающие на фоне эндокринных забо…
- **OLD**: Mitte des 20. Jahrhunderts entstand mit der Psychoneuroendokrinologie eine eigene wissenschaftliche Disziplin, die den Zusammenhang zwischen dem endokrinen System des Menschen und seiner Psyche untersucht. Es gibt sogar den Begriff des psychoneuroendokrinen Sy…
- **NEW**: Mitte des 20. Jahrhunderts etablierte sich die Psychoneuroendokrinologie als wissenschaftliche Disziplin, die die Wechselwirkung zwischen dem endokrinen System und der Psyche untersucht. Ein Fachbegriff hierfür ist das psychoneuroendokrine Syndrom – eine psych…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A звучит более профессионально и естественно для немецкого научно-популярного стиля. Он лучше справляется с передачей нюансов (например, 'Stimmungsschwankungen' вместо 'Stimmungsstörungen' в контексте симптомов и более изящные синтаксические конструкции). Перевод B содержит небольшую стилистическую шероховатость в предложении 'Sie werden sicher zustimmen', что звучит как калька с русского 'Вы наверняка согласитесь'.
  - [old/style/minor] Конструкция 'Sie werden sicher zustimmen' звучит несколько тяжеловесно и напоминает прямой перевод; вариант 'Sicherlich wissen Sie' в A более естественен для немецкого текста.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 89)
  - Перевод A более точен в плане терминологии (Psychoneuroendokrinologie) и лучше передает структуру предложений оригинала, не допуская грамматических ошибок. Перевод B содержит грубую ошибку в согласовании рода (jede einzelne вместо jede einzelne Vitamin/Vitamine).
  - [new/style/major] «jede einzelne» относится к Vitamine (plural), что грамматически неверно; должно быть «jeder einzelne» (для Vitamine в значении 'jedes einzelne Vitamin') или «alle sind unverzichtbar».
  - [new/style/minor] Использование «man vermuten könnte» вместо «wir vermuten könnten» немного отдаляет текст от эмпатичного тона «разговора с другом», заявленного в инструкциях.

#### 🟢 de `/unemployment/screen_4/texts` — NEW лучше (2:0)

- **RU**: Таким образом, хоть и внешние признаки успеха за это время оставались практически неизменными, он смог сохранить свою самооценку и избежать депрессии. Несмотря на то, что его финансовое положение оставалось тяжелым, когда он пришел к решению «признать поражени…
- **OLD**: So blieben zwar die äußeren Anzeichen des Erfolgs über diese Zeit hinweg nahezu unverändert, aber er konnte sein Selbstwertgefühl bewahren und eine Depression vermeiden. Obwohl seine finanzielle Lage schwierig blieb, als er die Entscheidung traf, sein Buchlade…
- **NEW**: Es gelang ihm, sein Selbstwertgefühl zu bewahren und eine Depression zu vermeiden – auch wenn die äußeren Anzeichen für Erfolg über diese Zeit hinweg nahezu unverändert blieben. Obwohl seine finanzielle Lage schwierig blieb, blieb sein Selbstrespekt unberührt,…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Перевод A гораздо лучше передает эмоциональный и экзистенциальный подтекст оригинала. В контексте самооценки и депрессии слово 'wertlos' (бесценный/ничтожный) звучит гораздо естественнее и сильнее, чем 'nutzlos' (бесполезный как инструмент), которое в немецком имеет более утилитарный, почти технический оттенок. Также перевод A лучше справился с пунктуацией и типографикой.
  - [old/style/major] Использование 'nutzlos' вместо 'wertlos' делает текст слишком приземленным и лишает его психологической глубины; 'nutzlos' звучит как 'нефункционирующий предмет', а не как человек, потерявший смысл жизни.
  - [old/style/minor] В заголовке 'Warum ich nicht nutzlos bin' пропущен вопросительный знак, что нарушает форму оригинала.
  - [old/style/minor] Фраза 'Buchladengeschäft' — это плеоназм (магазин книжного магазина), лучше просто 'Buchgeschäft' или 'Buchladen'.
  - [new/style/minor] В первом предложении порядок слов немного инвертирован относительно оригинала, но это сделано грамотно для немецкого синтаксиса.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод B звучит гораздо естественнее и эмоционально точнее. Использование слова 'wertlos' вместо 'nutzlos' в контексте самооценки — это правильный стилистический выбор, так как 'nutzlos' звучит слишком утилитарно (как бесполезный инструмент), в то время как 'wertlos' передает экзистенциальную пустоту, о которой пишет герой. Также в B лучше выстроена структура первого предложения.
  - [old/style/minor] Использование 'nutzlos' вместо 'wertlos' делает текст сухим и менее глубоким; 'nutzlos' больше подходит для предметов, чем для личности в контексте депрессии.
  - [old/style/minor] Конструкция 'So blieben zwar...' в начале текста звучит немного тяжеловесно и напоминает калька с русского синтаксиса.
  - [new/style/minor] В заголовке использован вопрос 'Warum bin ich nicht wertlos?', в то время как в оригинале утверждение. Однако для немецкого заголовка это звучит более естественно и вовлекающе.

#### 🟡 de `/unemployment/screen_1/texts`— вердикт неустойчив

- **RU**: Внезапная потеря работы – сильный стресс для большинства людей. Когда за несколько дней или недель объявляют об увольнении или сокращении, многие испытывают ощущение, что жизнь «рухнула». И это объяснимо, ведь у вас кардинально меняются: <li>финансовое положен…
- **OLD**: Ein plötzlicher Jobverlust ist für die meisten Menschen ein massiver Stressfaktor. Wenn man innerhalb weniger Tage oder Wochen gekündigt wird oder Stellen abgebaut werden, haben viele das Gefühl, dass ihr Leben „zusammengebrochen“ ist. Das ist verständlich, de…
- **NEW**: Ein plötzlicher Jobverlust ist für die meisten Menschen ein massiver Stressfaktor. Wenn man innerhalb weniger Tage oder Wochen die Kündigung erhält, haben viele das Gefühl, dass das Leben „zusammenbricht“. Das ist absolut nachvollziehbar, denn sich ändern sich…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Перевод A гораздо чище с точки зрения грамматики и стилистики. Перевод B содержит грубую грамматическую ошибку в первом абзаце ('sich ändern sich') и звучит менее естественно в некоторых конструкциях.
  - [new/style/critical] Грамматическая ошибка: 'sich ändern sich' — это дублирование возвратного местоимения, недопустимо.
  - [new/style/minor] Фраза 'emotionaler Kummer' (эмоциональная печаль) слабее передает смысл 'эмоционального угнетения/подавленности' (emotionale Niedergeschlagenheit) в контексте депрессии.
  - [new/style/minor] В предложении про счета 'steigenden Rechnungen' (растущие счета) — это добавление смысла, которого нет в оригинале (там просто счета, которые нечем платить).
  - [old/style/minor] В списке 'die finanzielle Situation' и т.д. использование артиклей допустимо, но делает список чуть более тяжеловесным, чем в оригинале, хотя это не ошибка.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Перевод A звучит более естественно и литературно. В нем лучше выдержан ритм и эмоциональный тон, характерный для качественного психологического текста. Перевод B содержит небольшие стилистические шероховатости (например, 'das Unverständnis darüber, was zu tun ist' звучит тяжеловесно) и менее удачно передает метафору в конце.
  - [old/style/minor] Конструкция 'das Unverständnis darüber, was zu tun ist' слишком громоздкая и напоминает канцелярит; вариант A 'das Gefühl, nicht zu wissen, wie es weitergehen soll' звучит гораздо человечнее.
  - [old/style/minor] Фраза 'mit völlig leeren Tagen, Rechnungen...' грамматически допустима, но в немецком лучше использовать глагольные конструкции или более плавные связки, как в A.
  - [old/style/minor] Использование 'Bankrott' в контексте эмоционального состояния звучит слишком буквально и тяжело, в то время как 'sozialer Abstieg' в A лучше передает смысл 'банкротства' как жизненного краха.

#### 🟡 de `/trap/screen_2/texts`— вердикт неустойчив

- **RU**: Так что же нужно делать уже сейчас, чтобы избавиться от чувства вины, вызванного завышенными требованиями? <li>Простой, но эффективный способ спастись от завышенных требований к себе подразумевает замену слова «должен» на другие: «Было бы хорошо, если…» или «Е…
- **OLD**: Was also können Sie bereits jetzt tun, um die durch überhöhte Erwartungen ausgelösten Schuldgefühle zu lindern? <li>Ein einfacher, aber effektiver Weg, sich von überhöhten Ansprüchen zu befreien, besteht darin, das Wort „müssen“ durch andere Formulierungen zu …
- **NEW**: Was also können Sie bereits jetzt tun, um sich von Schuldgefühlen zu befreien, die durch überhöhte Ansprüche ausgelöst wurden? <li>Ein einfacher, aber effektiver Weg, sich von überhöhten Ansprüchen zu befreien, besteht darin, das Wort „müssen“ durch andere For…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more natural and stylistically superior. It avoids clunky phrasing (like 'auf eine andere Weise' in B) and handles the nuances of the subjunctive examples more elegantly. A's flow feels like it was written by a native speaker, whereas B occasionally feels like a translation.
  - [old/style/minor] 'auf eine andere Weise' sounds slightly more formal/stiff than the more natural 'es anders machen' in A.
  - [old/style/minor] 'Streng genommen: kein Konjunktiv mehr' is a bit of a loose interpretation of the original's categorical tone.
  - [old/style/minor] 'Realitätsmethode' is understandable but 'Realitätsprüfung' (used in A) is the more standard psychological term for reality testing.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 91)
  - Перевод A звучит более естественно и профессионально. В нем лучше переданы нюансы разговорной речи (например, 'nicht das Ende der Welt' против 'kein Weltuntergang' в данном контексте) и соблюдена более точная структура предложений. Перевод B содержит небольшую стилистическую шероховатость в финале, где переводчик добавил 'diese Gewohnheiten', чего не было в оригинале.
  - [new/addition/minor] Добавлено 'diese Gewohnheiten' в последнем предложении, что немного меняет фокус с 'избавиться от запретов' на 'избавиться от привычек'.
  - [new/style/minor] Конструкция 'Verzichten Sie konsequent auf den Konjunktiv' звучит чуть более сухо/назидательно, чем 'Streng genommen: kein Konjunktiv mehr' в варианте A, который лучше попадает в тон дружеского эксперта.

#### 🟢 de `/vitamins/screen_4/texts` — NEW лучше (2:0)

- **RU**: Другой член команды, девушка, испытывавшая симптомы, похожие на депрессию, выявила железо-дефицитную анемию, лечение которой привело к значительному улучшению её состояния. Она описывала своё состояние следующим образом: «Я постоянно хотела спать, мне ничего н…
- **OLD**: Ein anderes Teammitglied, eine junge Frau, die Symptome ähnlich einer Depression erlebte, wurde auf eine Eisenmangelanämie untersucht, deren Behandlung zu einer deutlichen Besserung ihres Zustands führte. Sie beschrieb ihren Zustand so: „Ich wollte ständig sch…
- **NEW**: Ein weiteres Teammitglied, eine junge Frau, die Symptome einer Depression verspürte, stellte fest, dass sie an Eisenmangelanämie litt. Die Behandlung führte zu einer deutlichen Besserung ihres Zustands. Sie beschrieb ihren Zustand so: „Ich wollte ständig schla…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Перевод A звучит гораздо естественнее и профессиональнее. Перевод B содержит стилистические ошибки (например, 'schreckliche Apathie' вместо 'schwere Apathie' и 'meinen alten Zustand zurückgewonnen', что звучит как калька) и менее удачные синтаксические конструкции.
  - [old/style/major] 'schreckliche Apathie' — слишком эмоционально/бытово, в медицинском контексте лучше 'schwere Apathie'. 'meinen alten Zustand zurückgewonnen' — звучит неестественно, как калька с русского.
  - [old/style/minor] 'wurde auf eine Eisenmangelanämie untersucht' — грамматически не совсем верно в данном контексте (она не была обследована 'на' анемию, она её выявила).
  - [old/style/minor] 'gedrückte Stimmung' — допустимо, но 'Niedergeschlagenheit' в переводе A звучит более литературно и глубоко для описания состояния.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Перевод B звучит гораздо естественнее и эмоционально точнее. В переводе A допущена смысловая ошибка: 'wurde auf eine Eisenmangelanämie untersucht' означает, что её исследовали на предмет анемии (врачи), а не она сама её выявила. Также фраза 'meinen alten Zustand zurückgewonnen' в A звучит крайне неестественно, в то время как в B 'mein altes Ich wiedergefunden' передает нужный терапевтический тон.
  - [old/mistranslation/major] Фраза 'wurde auf eine Eisenmangelanämie untersucht' меняет смысл: получается, что анемию обнаружили в ходе исследования, а не она сама её выявила (как в оригинале).
  - [old/style/major] 'meinen alten Zustand zurückgewonnen' — это калька, так не говорят о самочувствии; звучит как 'вернуть состояние (как объект)'.
  - [old/style/minor] 'schrecklicher Apathie' — звучит немного по-детски/бытово, 'schwerer Apathie' в B лучше подходит для медицинского контекста.
  - [new/style/minor] В предложении 'Ich wollte ständig schlafen, hatte zu nichts Lust...' пропущено подлежащее 'ich', что допустимо в разговорной речи, но делает ритм чуть менее формальным (хотя для цитаты это плюс).

#### 🟡 de `/unemployment/description`— вердикт неустойчив

- **RU**: Эта статья исследует психологические и социальные последствия внезапной потери работы, рассматривая эмоциональный роллеркостер, который сопровождает такие события. Через личный опыт Александра, долгое время работавшего в успешной компании, рассказывается о бор…
- **OLD**: Dieser Artikel untersucht die psychologischen und sozialen Folgen eines plötzlichen Jobverlusts und beschreibt die emotionale Achterbahnfahrt, die solche Ereignisse begleiten. Anhand der persönlichen Erfahrung von Alexander, der lange Zeit in einem erfolgreich…
- **NEW**: Dieser Artikel beleuchtet die psychologischen und sozialen Folgen eines plötzlichen Jobverlusts und das emotionale Auf und Ab, das damit einhergeht. Am Beispiel von Alexander, der lange Zeit in einem erfolgreichen Unternehmen tätig war, wird der Kampf gegen De…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A звучит более цельно и профессионально, сохраняя структуру оригинала без лишних усложнений. Перевод B немного перегружен пассивными конструкциями во втором предложении и менее точно передает финальный акцент статьи.
  - [new/style/minor] Конструкция 'wobei ... im Fokus steht' делает финал предложения тяжеловесным по сравнению с оригиналом.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A звучит более естественно и профессионально для немецкого читателя. Использование 'das emotionale Auf und Ab' вместо кальки 'Achterbahnfahrt' делает текст менее клишированным и более литературным, а структура предложений в A более плавная.
  - [old/style/minor] Использование 'Achterbahnfahrt' является прямой калькой с 'rollercoaster', что в данном контексте звучит немного избито по сравнению с более элегантным 'Auf und Ab'.
  - [old/style/minor] Фраза 'begleiten' в единственном числе при подлежащем 'Ereignisse' (мн. ч.) грамматически не совсем корректна, если подразумевается, что события сопровождают роллеркостер, а не наоборот.

#### 🟢 de `/unemployment/screen_3/texts` — NEW лучше (2:0)

- **RU**: Руководство Александра очень хорошо относилось к нему, считали его способным продажником, но он сам относился к себе неоправданно строго. В процессе следующих встреч и работы с мыслями, Александр согласился, что он очень самокритичен к себе, и это никак не пом…
- **OLD**: Alexanders Vorgesetzte schätzten ihn sehr und hielten ihn für einen fähigen Verkäufer, aber er selbst ging viel zu streng mit sich um. Im Laufe der folgenden Sitzungen und der Arbeit mit seinen Gedanken stimmte Alexander zu, dass er extrem selbstkritisch war. …
- **NEW**: Alexanders Vorgesetzte schätzten ihn sehr und hielten ihn für einen fähigen Verkäufer, doch er selbst ging viel zu streng mit sich ins Gericht. Im Laufe der weiteren Sitzungen und der Arbeit mit seinen Gedanken erkannte Alexander, wie extrem selbstkritisch er …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A демонстрирует гораздо более высокий уровень владения языком и литературной обработки. Он избегает калек и использует идиоматичные выражения (например, 'mit sich ins Gericht gehen' вместо простого 'mit sich umgehen'), что делает текст живым и профессиональным. Перевод B местами звучит тяжеловесно и слишком буквально.
  - [old/style/minor] Использование 'Doppelmoral' вместо 'Doppelstandards' в данном контексте звучит скорее как 'лицемерие', чем как психологический термин.
  - [old/style/minor] Конструкция 'seinen negativen Gedanken zu antworten' является калькой с русского; в немецком лучше использовать 'begegnen' (как в варианте A).
  - [old/style/minor] Фраза 'die vielen Fakten, in denen er Erfolge erzielte' звучит неестественно (немец не говорит 'факты, в которых он добился успеха').
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B звучит гораздо более естественно и профессионально для немецкого читателя. Он использует более точные идиомы (например, 'mit sich ins Gericht gehen' вместо простого 'streng umgehen') и корректно применяет психологическую терминологию ('kognitive Verzerrungen'), в то время как перевод A звучит более сухо и местами как калька.
  - [old/style/minor] Использование 'Doppelmoral' в данном контексте звучит скорее как 'лицемерие', тогда как 'Doppelstandards' (в B) точнее передает психологический смысл двойных стандартов.
  - [old/terminology/minor] Пропустил термин 'kognitive Verzerrungen', заменив его на просто 'Verzerrungen', что снижает экспертный уровень текста.
  - [new/style/minor] Фраза 'wahren Kern' (вместо 'wahres Wesen') — отличная адаптация, звучащая более по-немецки.

#### 🟡 de `/vitamins/screen_3/texts`— вердикт неустойчив

- **RU**: Примеры дефицита витаминов и их симптомы: <li>Витамин D: подавленность, тревога, усталость, перепады настроения.</li> <li>Железо: слабость, утомляемость, одышка, головокружение, онемение.</li> <li>Витамин B12: повышенная утомляемость, анемия, бессонница, сниже…
- **OLD**: Beispiele für Vitaminmangel und deren Symptome: <li>Vitamin D: Niedergeschlagenheit, Angst, Müdigkeit, Stimmungsschwankungen.</li> <li>Eisen: Schwäche, Erschöpfbarkeit, Atemnot, Schwindel, Taubheitsgefühl.</li> <li>Vitamin B12: Erhöhte Erschöpfbarkeit, Anämie,…
- **NEW**: Beispiele für Vitaminmangel und deren Symptome: <li>Vitamin D: Niedergeschlagenheit, Angstzustände, Müdigkeit, Stimmungsschwankungen.</li> <li>Eisen: Schwäche, Erschöpfbarkeit, Atemnot, Schwindel, Taubheitsgefühle.</li> <li>Vitamin B12: erhöhte Erschöpfbarkeit…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Перевод A более грамотен с точки зрения капитализации в списках. В немецком языке элементы списка, являющиеся существительными, должны начинаться с заглавной буквы. Перевод B допускает ошибку, используя строчные буквы (erhöhte, chronische), что выглядит небрежно.
  - [new/style/minor] Нарушение правил капитализации в списках (erhöhte, chronische), что недопустимо для немецкого языка.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A звучит более профессионально и литературно. В нем лучше выстроены синтаксические связи в последних предложениях, в то время как перевод B местами грешит излишней простотой и легкой тяжеловесностью (например, 'Und das ist nur ein Teil...').
  - [old/style/minor] Начинать предложение с 'Und' в данном контексте допустимо, но звучит менее элегантно, чем в варианте A.
  - [old/style/minor] Конструкция 'dass es an Hormonen oder Vitaminen liegen könnte' звучит чуть более разговорно/бытово, чем 'dass auch Hormone und Vitamine die Ursache sein könnten' в A.

#### 🟡 de `/trap/description`— вердикт неустойчив

- **RU**: В статье рассматривается проблема чувства вины, возникающего из-за нереалистичных требований к себе и постоянной самокритики. Описываются методы переосмысления внутренних установок и замены «долженствования» на более здоровое восприятие личных возможностей и ж…
- **OLD**: Dieser Artikel befasst sich mit Schuldgefühlen, die durch unrealistische Selbstansprüche und ständige Selbstkritik entstehen. Er beschreibt Methoden, um innere Überzeugungen umzugestalten und das „Muss“ durch eine gesündere Wahrnehmung der eigenen Möglichkeite…
- **NEW**: In diesem Artikel geht es um Schuldgefühle, die durch unrealistische Ansprüche an sich selbst und ständige Selbstkritik entstehen. Wir beschreiben Methoden, wie Sie Ihre Grundüberzeugungen umbewerten und das starre „Müssen“ durch eine gesündere Wahrnehmung Ihr…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Перевод A звучит более профессионально и стилистически выверено для статьи. Перевод B допускает терминологическую ошибку, подменяя общие 'внутренние установки' на 'Grundüberzeugungen' (глубинные убеждения), что в контексте КПТ является слишком сильным и специфическим термином для общего описания статьи.
  - [new/terminology/major] Использование 'Grundüberzeugungen' вместо 'innere Überzeugungen' или 'Einstellungen' неуместно, так как это специфический термин для глубинных убеждений, а в оригинале речь об общих установках.
  - [new/style/minor] Переход на 'Wir beschreiben' (Мы описываем) вводит лишнее лицо, которого нет в оригинале, в то время как в A сохранена нейтральная форма 'Er beschreibt' (Статья описывает).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Перевод A звучит более естественно и эмпатично, используя активную форму 'Wir beschreiben', что соответствует Tone of Voice (разговор с экспертом). Перевод B слишком сух и академичен.
  - [old/style/minor] Использование безличных конструкций делает текст похожим на сухую статью из энциклопедии, а не на поддерживающий материал.

