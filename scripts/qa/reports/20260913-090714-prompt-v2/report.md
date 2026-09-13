# QA: слепое парное сравнение переводов — prompt-v2

- **Дата**: 2026-09-13T06:07:14.940Z
- **Метка**: prompt-v2
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/depression/duty_guilt_incrimination.json
- **Локали**: de
- **Сэмпл/файл**: 3
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
| de | 3 | 🟢 0 | 🔴 2 | ⚪ 0 | 🟡 1 | 0 / 0 | 0% |
| **итого** | 3 | 🟢 0 | 🔴 2 | ⚪ 0 | 🟡 1 | 0 / 0 | 0% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×2, style/major×1; OLD — style/minor×3

### Детали пар (для спот-чека)

#### 🔴 de `/incrimination/screen_1/texts` — OLD лучше (2:0)

- **RU**: Один из типичных симптомов депрессии – склонность к самообвинению, чувство собственной неполноценности, отсутствие собственной ценности и значимости. Человек часто присваивает себе ярлыки "неудачника", "ничтожества", считая себя плохим. Чем тяжелее степень деп…
- **OLD**: Ein typisches Symptom der Depression ist die Neigung zur Selbstbeschuldigung, das Gefühl der Unzulänglichkeit sowie das Empfinden, keinen eigenen Wert oder keine Bedeutung zu haben. Betroffene neigen oft dazu, sich selbst als „Versager“ oder „Niemand“ zu bezei…
- **NEW**: Ein typisches Symptom der Depression ist die Neigung zu Selbstvorwürfen sowie das Gefühl von Unzulänglichkeit und das Fehlen eines Gefühls für den eigenen Wert und die eigene Bedeutung. Betroffene neigen oft dazu, sich selbst die Etiketten „Versager“ oder „Nie…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод B звучит более естественно и профессионально. В нем лучше выдержан баланс между эмпатией и экспертностью. Перевод A содержит тяжеловесную конструкцию в первом предложении и менее удачную метафору в цитате.
  - [new/style/minor] Первое предложение перегружено номинативными конструкциями ('das Fehlen eines Gefühls für...'), что звучит суховато.
  - [new/style/minor] Фраза 'das Leben mit angezogener Handbremse verbringen' звучит чуть менее динамично, чем вариант в B.
  - [old/style/minor] В списке 'unzulänglich' повторяется дважды (в первом абзаце и в описании образа себя), но это допустимо для точности передачи смысла.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 86)
  - Перевод A звучит гораздо естественнее и чище. В переводе B допущены стилистические ошибки, такие как тяжеловесная конструкция 'das Fehlen eines Gefühls für...' (отсутствие чувства чего-либо) и не совсем удачное 'Verhältnis zu sich selbst' вместо более точного 'Einstellung'. Также в A лучше передана цитата в конце.
  - [new/style/major] Конструкция 'das Fehlen eines Gefühls für den eigenen Wert' — это типичная тяжелая номинализация, которая звучит неестественно для поддерживающего текста.
  - [new/style/minor] Использование 'Verhältnis zu sich selbst' (отношение как связь/связь между людьми) вместо 'Einstellung' (внутренняя установка/отношение) менее точно в данном контексте.
  - [new/style/minor] Фраза 'sich Etiketten aufzubürden' (возлагать на себя ярлыки) звучит менее естественно, чем 'sich als ... bezeichnen' в A.

#### 🔴 de `/guilt/description` — OLD лучше (2:0)

- **RU**: Статья исследует взаимосвязь между чувством вины и депрессией, подчёркивая, как избыточное или необоснованное чувство вины может способствовать развитию депрессивных состояний. Авторы описывают различие между здоровым и нездоровым чувством вины, обсуждая, как …
- **OLD**: Dieser Artikel untersucht die Verbindung zwischen Schuldgefühlen und Depressionen und zeigt auf, wie übermäßige oder unbegründete Schuldgefühle zur Entwicklung depressiver Zustände beitragen können. Es wird zwischen gesundem und ungesundem Schuldgefühl untersc…
- **NEW**: Dieser Artikel untersucht die Verbindung zwischen Schuldgefühlen und Depressionen und zeigt auf, wie übermäßige oder unbegründete Schuldgefühle zur Entwicklung depressiver Zustände beitragen können. Es wird zwischen gesundem und ungesundem Schuldgefühl untersc…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Перевод A грамматически безупречен. В переводе B допущена ошибка в согласовании рода: 'ersteres/letzteres' (средний род) должно относиться к 'Schuldgefühl' (средний род), но в тексте B использован мужской род 'erstere/letztere', что является грамматической ошибкой.
  - [new/style/major] Grammatikfehler: 'erstere/letztere' (maskulin/feminin) statt 'ersteres/letzteres' (neutrum), так как относится к 'Schuldgefühl'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 92)
  - Оба перевода выполнены на высоком уровне, но перевод B грамматически точнее в использовании относительных местоимений (ersteres/letzteres) и использует более естественное сочетание 'Wohlbefinden steigern' вместо 'verbessern'.
  - [new/other/minor] Использование 'erstere/letztere' вместо 'ersteres/letzteres' при отсылке к абстрактным понятиям (Schuldgefühl) менее типично для научного стиля, чем нейтральное 'ersteres'.
  - [new/style/minor] 'Wohlbefinden verbessern' допустимо, но 'steigern' звучит более профессионально и естественно в данном контексте.

#### 🟡 de `/duty/description`— вердикт неустойчив

- **RU**: В этой статье мы погружаемся в мир когнитивных искажений, раскрывая, как они влияют на наше восприятие реальности и психологическое здоровье. Особое внимание уделяется пониманию и коррекции "долженствования", с целью помочь читателям обрести более осознанный и…
- **OLD**: In diesem Artikel beschäftigen wir uns mit kognitiven Verzerrungen und zeigen auf, wie sie unsere Wahrnehmung der Realität und unsere psychische Gesundheit beeinflussen. Ein besonderer Schwerpunkt liegt auf dem Verständnis und der Korrektur von „Muss-Regeln“, …
- **NEW**: In diesem Artikel beschäftigen wir uns mit kognitiven Verzerrungen und zeigen auf, wie sie unsere Wahrnehmung der Realität und unser psychisches Wohlbefinden beeinflussen. Ein besonderer Schwerpunkt liegt darauf, „Muss“-Aussagen zu verstehen und zu korrigieren…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод A звучит более естественно и эмпатично. Использование 'psychisches Wohlbefinden' вместо 'psychische Gesundheit' лучше соответствует поддерживающему тону, а 'Muss-Aussagen' звучит менее академично и более плавно, чем 'Muss-Regeln'.
  - [old/style/minor] Использование 'psychische Gesundheit' звучит несколько сухо/клинически в данном контексте, 'Wohlbefinden' (A) мягче.
  - [old/style/minor] Конструкция 'auf dem Verständnis und der Korrektur' является номинализацией, что делает предложение тяжеловесным по сравнению с глагольной формой в A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Перевод A использует более точный и естественный термин 'Muss-Regeln' для передачи концепции 'долженствования' в контексте КПТ. Перевод B звучит менее профессионально из-за конструкции 'Muss-Aussagen'.
  - [new/style/minor] 'Muss-Aussagen' звучит как 'высказывания, содержащие долженствование', в то время как в психологии речь идет о правилах/установках (Regeln/Annahmen).

