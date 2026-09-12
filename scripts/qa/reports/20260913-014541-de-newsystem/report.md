# QA: слепое парное сравнение переводов — de-newsystem

- **Дата**: 2026-09-12T22:45:41.349Z
- **Метка**: de-newsystem
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/depression/duty_guilt_incrimination.json
- **Локали**: de
- **Сэмпл/файл**: 3
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 30b56bc18b00a3d1f474cb07c30edcd508b703d1

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/duty_guilt_incrimination.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 3 | 🟢 0 | 🔴 1 | ⚪ 0 | 🟡 2 | 0 / 0 | 0% |
| **итого** | 3 | 🟢 0 | 🔴 1 | ⚪ 0 | 🟡 2 | 0 / 0 | 0% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×1; OLD — style/minor×3, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟡 de `/incrimination/screen_1/texts`— вердикт неустойчив

- **RU**: Один из типичных симптомов депрессии – склонность к самообвинению, чувство собственной неполноценности, отсутствие собственной ценности и значимости. Человек часто присваивает себе ярлыки "неудачника", "ничтожества", считая себя плохим. Чем тяжелее степень деп…
- **OLD**: Ein typisches Symptom der Depression ist die Neigung zu Selbstvorwürfen sowie das Gefühl der Unzulänglichkeit und der eigenen Bedeutungslosigkeit. Betroffene stigmatisieren sich oft selbst als „Versager“ oder „Nichts“ und sind überzeugt, ein schlechter Mensch …
- **NEW**: Ein typisches Symptom der Depression ist die Neigung zur Selbstbeschuldigung, das Gefühl der Unzulänglichkeit sowie das Empfinden, keinen eigenen Wert oder keine Bedeutung zu haben. Betroffene neigen oft dazu, sich selbst als „Versager“ oder „Niemand“ zu bezei…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A звучит более естественно и литературно. Перевод B содержит стилистическую шероховатость в финальной цитате и использует 'Emotionen' там, где в контексте настроения лучше подходит 'Gefühle'. Также в A лучше передана структура первого предложения.
  - [old/style/minor] Использование 'Emotionen' в связке со 'Stimmung' допустимо, но 'Gefühle' звучит более эмпатично и естественно для данного контекста.
  - [old/style/minor] Финальная метафора 'das Leben mit angezogener Handbremse verbringen' звучит менее динамично и менее точно по сравнению с 'durch das Leben fahren' в A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 90)
  - Перевод A звучит более естественно и литературно. В частности, перевод цитаты в конце (A: 'mit angezogener Handbremse verbringen' vs B: 'durch das Leben fahren, während...') выполнен более элегантно, что важно для финала текста. Также в A лучше передана фраза про ярлыки ('als „Versager“ oder „Nichts“' звучит более по-немецки, чем 'als „Niemand

#### 🔴 de `/guilt/description` — OLD лучше (2:0)

- **RU**: Статья исследует взаимосвязь между чувством вины и депрессией, подчёркивая, как избыточное или необоснованное чувство вины может способствовать развитию депрессивных состояний. Авторы описывают различие между здоровым и нездоровым чувством вины, обсуждая, как …
- **OLD**: Dieser Artikel untersucht die Verbindung zwischen Schuldgefühlen und Depressionen und zeigt auf, wie übermäßige oder unbegründete Schuldgefühle zur Entwicklung depressiver Zustände beitragen können. Es wird zwischen gesundem und ungesundem Schuldgefühl untersc…
- **NEW**: Dieser Artikel untersucht die Verbindung zwischen Schuldgefühlen und Depressionen und zeigt auf, wie übermäßige oder unbegründete Schuldgefühle zur Entwicklung depressiver Zustände beitragen können. Es wird zwischen gesundem und ungesundem Schuldgefühl untersc…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Перевод A лучше структурирован синтаксически. Использование двоеточия во втором предложении делает текст более академичным и легким для восприятия, в то время как перевод B перегружен союзами в одном длинном предложении.
  - [new/style/minor] Слишком длинное и тяжеловесное второе предложение из-за нагромождения придаточных конструкций (und erläutert, wie..., während...).
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 97 / NEW 92)
  - Both translations are excellent and professional, but B uses superior punctuation and sentence structure to handle the contrast between 'healthy' and 'unhealthy' guilt, making it more readable and elegant.
  - [new/style/minor] The use of 'während' (while) in a long sentence makes the structure slightly more heavy/clunky compared to the colon and direct contrast in B.

#### 🟡 de `/duty/description`— вердикт неустойчив

- **RU**: В этой статье мы погружаемся в мир когнитивных искажений, раскрывая, как они влияют на наше восприятие реальности и психологическое здоровье. Особое внимание уделяется пониманию и коррекции "долженствования", с целью помочь читателям обрести более осознанный и…
- **OLD**: In diesem Artikel tauchen wir in die Welt der kognitiven Verzerrungen ein und zeigen auf, wie sie unsere Wahrnehmung der Realität und unsere psychische Gesundheit beeinflussen. Ein besonderer Schwerpunkt liegt auf dem Verständnis und der Korrektur von „Muss-De…
- **NEW**: In diesem Artikel beschäftigen wir uns mit kognitiven Verzerrungen und zeigen auf, wie sie unsere Wahrnehmung der Realität und unsere psychische Gesundheit beeinflussen. Ein besonderer Schwerpunkt liegt auf dem Verständnis und der Korrektur von „Muss-Regeln“, …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод A использует более точный психологический термин 'Muss-Regeln' для передачи концепции 'долженствования' (Must-rules), в то время как 'Muss-Denken' в переводе B звучит более разговорно и менее профессионально. Также вариант A точнее передает 'радостный взгляд' через 'lebensfroh'.
  - [old/terminology/minor] «Muss-Denken» менее точно передает термин «долженствование» в контексте КПТ, чем «Muss-Regeln».
  - [old/style/minor] «erfülltere Sicht auf das Leben» — это хорошая адаптация, но «lebensfrohere Sicht» в варианте A ближе к эмоциональному окрасу оригинала «радостный взгляд».
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A лучше передает эмоциональный тон оригинала («erfülltere Sicht» вместо «lebensfrohere Sicht auf die Welt») и использует более точный психологический эквивалент для «долженствования» (Muss-Denken).
  - [new/style/minor] «Muss-Regeln» звучит более технически/сухо, чем «Muss-Denken», которое лучше передает когнитивный процесс.

