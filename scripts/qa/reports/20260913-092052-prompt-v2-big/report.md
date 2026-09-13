# QA: слепое парное сравнение переводов — prompt-v2-big

- **Дата**: 2026-09-13T06:20:52.755Z
- **Метка**: prompt-v2-big
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/depression/duty_guilt_incrimination.json
- **Локали**: de
- **Сэмпл/файл**: 6
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: e5f619e3caa4d09e8c2e79d0b392e4f3042b4e2d

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/duty_guilt_incrimination.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 6 | 🟢 1 | 🔴 1 | ⚪ 1 | 🟡 3 | 0 / 0 | 50% |
| **итого** | 6 | 🟢 1 | 🔴 1 | ⚪ 1 | 🟡 3 | 0 / 0 | 50% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×3; OLD — style/minor×4

### Детали пар (для спот-чека)

#### 🔴 de `/incrimination/screen_1/texts` — OLD лучше (2:0)

- **RU**: Один из типичных симптомов депрессии – склонность к самообвинению, чувство собственной неполноценности, отсутствие собственной ценности и значимости. Человек часто присваивает себе ярлыки "неудачника", "ничтожества", считая себя плохим. Чем тяжелее степень деп…
- **OLD**: Ein typisches Symptom der Depression ist die Neigung zur Selbstbeschuldigung, das Gefühl der Unzulänglichkeit sowie das Empfinden, keinen eigenen Wert oder keine Bedeutung zu haben. Betroffene neigen oft dazu, sich selbst als „Versager“ oder „Niemand“ zu bezei…
- **NEW**: Ein typisches Symptom der Depression ist die Neigung zu Selbstvorwürfen sowie das Gefühl von Unzulänglichkeit und das Fehlen eines Gefühls für den eigenen Wert und die eigene Bedeutung. Betroffene neigen oft dazu, sich selbst die Etiketten „Versager“ oder „Nie…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод B звучит более естественно и профессионально. В переводе A есть тяжеловесная конструкция 'das Fehlen eines Gefühls für den eigenen Wert', которая является типичной калькой, в то время как в B она изящно перефразирована. Также в B лучше передана идиома с ручным тормозом.
  - [new/style/minor] Конструкция 'das Fehlen eines Gefühls für den eigenen Wert' звучит избыточно и тяжеловесно (канцелярит).
  - [new/style/minor] Фраза 'mit angezogener Handbremse verbringen' грамматически возможна, но звучит менее гладко, чем вариант в B.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A звучит более естественно и профессионально. В нем лучше выдержан баланс между эмпатией и экспертностью. Перевод B содержит стилистические шероховатости (например, 'das Fehlen eines Gefühls für den eigenen Wert' — слишком громоздко и неестественно) и менее удачную адаптацию цитаты в конце.
  - [new/style/major] Конструкция 'das Fehlen eines Gefühls für den eigenen Wert' — это типичная калька, которая звучит очень тяжело и неестественно для немецкого языка.
  - [new/style/minor] Фраза 'das Verhältnis zu sich selbst' (отношение к себе) в данном контексте звучит менее точно, чем 'Einstellung zu sich selbst'.
  - [new/style/minor] Цитата в конце 'das Leben mit angezogener Handbremse verbringen' грамматически верна, но менее выразительна, чем метафора движения в варианте A.

#### ⚪ de `/guilt/description`— ничья (2:0)

- **RU**: Статья исследует взаимосвязь между чувством вины и депрессией, подчёркивая, как избыточное или необоснованное чувство вины может способствовать развитию депрессивных состояний. Авторы описывают различие между здоровым и нездоровым чувством вины, обсуждая, как …
- **OLD**: Dieser Artikel untersucht die Verbindung zwischen Schuldgefühlen und Depressionen und zeigt auf, wie übermäßige oder unbegründete Schuldgefühle zur Entwicklung depressiver Zustände beitragen können. Es wird zwischen gesundem und ungesundem Schuldgefühl untersc…
- **NEW**: Dieser Artikel untersucht die Verbindung zwischen Schuldgefühlen und Depressionen und zeigt auf, wie übermäßige oder unbegründete Schuldgefühle zur Entwicklung depressiver Zustände beitragen können. Es wird zwischen gesundem und ungesundem Schuldgefühl untersc…
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Оба перевода идентичны по структуре, терминологии и качеству. Разница заключается лишь в выборе одного глагола в самом конце (steigern vs. verbessern), что в данном контексте является вопросом стилистического предпочтения и не влияет на оценку качества.
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Оба перевода идентичны на 99%, за исключением одного глагола в самом конце: 'verbessern' (A) против 'steigern' (B). Оба варианта абсолютно естественны, грамматически верны и соответствуют научному/терапевтическому стилю.

#### 🟡 de `/duty/description`— вердикт неустойчив

- **RU**: В этой статье мы погружаемся в мир когнитивных искажений, раскрывая, как они влияют на наше восприятие реальности и психологическое здоровье. Особое внимание уделяется пониманию и коррекции "долженствования", с целью помочь читателям обрести более осознанный и…
- **OLD**: In diesem Artikel beschäftigen wir uns mit kognitiven Verzerrungen und zeigen auf, wie sie unsere Wahrnehmung der Realität und unsere psychische Gesundheit beeinflussen. Ein besonderer Schwerpunkt liegt auf dem Verständnis und der Korrektur von „Muss-Regeln“, …
- **NEW**: In diesem Artikel beschäftigen wir uns mit kognitiven Verzerrungen und zeigen auf, wie sie unsere Wahrnehmung der Realität und unser psychisches Wohlbefinden beeinflussen. Ein besonderer Schwerpunkt liegt darauf, „Muss“-Aussagen zu verstehen und zu korrigieren…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод A звучит более естественно и эмпатично, используя 'psychisches Wohlbefinden' вместо сухого 'psychische Gesundheit'. Также 'Muss-Aussagen' лучше передает суть психологического феномена 'долженствования' в данном контексте, чем 'Muss-Regeln'.
  - [old/style/minor] Использование 'psychische Gesundheit' звучит более клинически и сухо, чем 'psychisches Wohlbefinden', что менее соответствует поддерживающему тону.
  - [old/style/minor] 'Muss-Regeln' — допустимо, но 'Muss-Aussagen' в контексте когнитивных искажений звучит более профессионально и плавно.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Перевод A использует более точный и естественный для немецкой психотерапии термин «Muss-Regeln» для передачи концепции «долженствования». Перевод B звучит чуть более тяжеловесно из-за конструкции «‚Muss‘-Aussagen zu verstehen».
  - [new/style/minor] Конструкция «‚Muss‘-Aussagen zu verstehen und zu korrigieren» менее гладкая, чем использование существительного в A.

#### 🟡 de `/duty/test/answers`— вердикт неустойчив

- **RU**: Они не позволяют объективно воспринимать действительность Они влияют на интеллектуальные способности С ними невозможно добиться успеха в жизни Когнитивные искажения скорее полезны
- **OLD**: Weil sie verhindern, die Realität objektiv wahrzunehmen Weil sie die intellektuellen Fähigkeiten beeinträchtigen Weil man mit ihnen im Leben keinen Erfolg haben kann Kognitive Verzerrungen sind eher nützlich
- **NEW**: Weil sie eine objektive Wahrnehmung der Realität verhindern Weil sie die intellektuellen Fähigkeiten beeinträchtigen Weil man mit ihnen im Leben keinen Erfolg haben kann Kognitive Verzerrungen sind eher nützlich
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Перевод B звучит более естественно благодаря использованию инфинитивного оборота в первом предложении. Перевод A использует тяжеловесную существительную конструкцию (Nominalstil), которая характерна для канцелярита, в то время как B звучит более гладко и по-человечески.
  - [new/style/minor] Использование 'eine objektive Wahrnehmung der Realität verhindern' — это типичная номинализация, которая делает текст сухим и менее живым по сравнению с инфинитивным оборотом в B.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Перевод B звучит более естественно и профессионально. В первом предложении вариант A использует громоздкую инфинитивную конструкцию с запятой, в то время как вариант B использует элегантное существительное (objektive Wahrnehmung), что характерно для хорошего немецкого стиля.
  - [old/style/minor] Конструкция 'verhindern, die Realität objektiv wahrzunehmen' звучит чуть более тяжеловесно и менее по-немецки, чем существительное в варианте B.

#### 🟢 de `/duty/title` — NEW лучше (2:0)

- **RU**: Долженствование - бег в кандалах
- **OLD**: „Muss“-Regeln – Ein Gefängnis aus Verpflichtungen
- **NEW**: „Muss“-Denken – Ein Gefängnis aus Verpflichtungen
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 92)
  - Перевод A лучше передает психологический контекст 'долженствования' как образа мышления (Denken), в то время как B звучит более технически и сухо. Оба варианта удачно адаптировали метафору 'бега в кандалах' в 'Gefängnis' (тюрьму), что звучит естественно для немецкого языка.
  - [old/style/minor] Regeln (правила) звучит слишком формально и менее эмоционально, чем концепция образа мышления в контексте КПТ.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Перевод B гораздо точнее передает психологический контекст. 'Muss-Denken' (установки типа 'должен') — это устоявшийся термин для описания когнитивных паттернов, в то время как 'Muss-Regeln' звучит как сухой свод правил.
  - [old/style/minor] Regeln звучит слишком формально и механистично, не передавая суть психологического процесса 'долженствования'.

#### 🟡 de `/incrimination/screen_4/texts`— вердикт неустойчив

- **RU**: Начните предъявлять такие же требования к своим близким и друзьям. Но будьте максимально честны. И когда вы начнете это делать, вы поймете, насколько несправедлива ваша критика на самом деле. Ваша самооценка – это важнейший мотив при постановке жизненной цели …
- **OLD**: Versuchen Sie, dieselben Maßstäbe auch an Ihre engen Freunde und Angehörigen anzulegen. Seien Sie dabei jedoch absolut ehrlich zu sich selbst. Wenn Sie das tun, werden Sie erkennen, wie unfair Ihre Selbstkritik in Wirklichkeit ist. Ihr Selbstwertgefühl ist ein…
- **NEW**: Versuchen Sie einmal, dieselben Maßstäbe auch an Ihre Freunde und nahestehenden Personen anzuwenden. Seien Sie dabei absolut ehrlich zu sich selbst. Sie werden erkennen, wie ungerecht Ihre Kritik in Wirklichkeit ist. Ihr Selbstwertgefühl ist ein entscheidender…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A звучит более естественно и профессионально. В переводе B допущены стилистические шероховатости (сочетание 'enge Freunde und Angehörige' звучит суховато, а 'unfair' менее уместно в данном контексте, чем 'ungerecht').
  - [old/style/minor] Использование 'unfair' вместо 'ungerecht' звучит слишком разговорно/англицизмом для терапевтического текста; 'enge Freunde und Angehörige' — более формальный и тяжеловесный вариант, чем 'Freunde und nahestehende Personen'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A звучит более цельно и профессионально. В первом абзаце перевод B теряет логическую связку 'И когда вы начнете это делать', превращая предложение в резкий и грамматически менее связанный переход. Также перевод A точнее передает нюанс 'близких' через 'Angehörigen'.
  - [new/style/minor] Пропуск логической связки 'И когда вы начнете это делать' (Wenn Sie das tun), что делает переход к выводу слишком резким.
  - [new/style/minor] Конструкция 'auf die Sie sich konzentrieren können' в конце текста звучит чуть более тяжеловесно и менее элегантно, чем лаконичное 'sich auf diese zu konzentrieren' в варианте A.

