# QA: слепое парное сравнение переводов — stage-model-de-perfectionism

- **Дата**: 2026-09-20T10:38:57.157Z
- **Метка**: stage-model-de-perfectionism
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/de-stage-model-baseline
- **Файлы**: story/distortions/perfectionism.json
- **Локали**: de
- **Сэмпл/файл**: 15
- **Seed**: 20260920
- **Min-chars**: 0
- **Модель**: gemini-3.1-pro-high
- **Endpoint**: http://127.0.0.1:8107/v1
- **git HEAD**: 418c535898ff6dbd7e9ac63ae32e3a50018d13c4

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/perfectionism.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 11 | 🟢 9 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |
| **итого** | 11 | 🟢 9 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×8, addition/minor×3, other/minor×1, mistranslation/major×1, omission/major×1, mistranslation/minor×1, omission/minor×1; OLD — style/minor×10, style/major×3, omission/major×3, omission/minor×3, mistranslation/minor×2, terminology/minor×1, terminology/major×1, mistranslation/major×1

### Детали пар (для спот-чека)

#### 🟢 de `/exercise/screen_4/texts` — NEW лучше (2:0)

- **RU**: <h2>Используйте «технику жадности»</h2> Она основана на том простом факте, что большинство из нас стремится быть совершенным, чтобы преуспеть в жизни. Возможно, вам не приходило в голову, что вы можете оказаться намного успешнее, если понизите стандарты. К при…
- **OLD**: <h2>Nutzen Sie die „Gier-Technik“</h2> Sie basiert auf der einfachen Tatsache, dass die meisten von uns nach Perfektion streben, um im Leben erfolgreich zu sein. Vielleicht ist Ihnen noch nicht bewusst, dass Sie viel erfolgreicher sein könnten, wenn Sie Ihre A…
- **NEW**: <h2>Nutzen Sie die „Gier-Technik“</h2> Sie basiert auf der einfachen Tatsache, dass die meisten von uns nach Perfektion streben, um im Leben erfolgreich zu sein. Vielleicht ist Ihnen noch nicht bewusst, dass Sie viel erfolgreicher sein könnten, wenn Sie Ihre S…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 93)
  - Перевод A звучит более естественно, использует удачные обороты (Alltag вместо Leben) и лучше выдерживает эмпатичный тон. Перевод B допускает грубую лексическую ошибку в сочетаемости («mich billigen»).
  - [old/style/major] Неверная сочетаемость: глагол «billigen» (одобрять/санкционировать) применяется к поступкам, решениям или законам, но не к человеку («mich billigen» звучит как канцелярская ошибка).
  - [old/style/minor] В фразе «werden sie sich von mir abwenden» местоимение «sie» (они) повисает в воздухе, так как в предыдущем предложении нет подходящего существительного во множественном числе. Вариант A с добавлением «andere» намного удачнее.
  - [old/style/minor] Конструкция «Die Arbeit an Überzeugungen besteht darin» звучит чуть более тяжеловесно и формально, чем живое «Bei der Arbeit ... geht es darum» из варианта A.
  - [new/style/minor] Выражение «mich gutheißen» понятно, но слегка шероховато (обычно одобряют поведение — «mein Verhalten gutheißen»). Глагол «akzeptieren» или фраза «mir zustimmen» подошли бы лучше.
  - [new/other/minor] Оригинальное «любить себя» (sich zu lieben) заменено на «sich anzunehmen» (принимать себя). В контексте терапии это хорошая транскреация, но это всё же небольшое смещение смыслового акцента.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 92)
  - Перевод B звучит естественнее благодаря удачным лексическим выборам («Alltag», «unabänderliches Schicksal», добавление «andere» вместо повисшего в воздухе «sie»). Оба перевода споткнулись о фразу «одобрять меня», выбрав глаголы, которые обычно применяются к действиям, а не людям, но в целом B немного превосходит А по ритму и живости языка.
  - [old/style/minor] Местоимение «sie» в «werden sie sich von mir abwenden» не имеет четкого предшествующего существительного. Вариант B («andere») решает эту проблему.
  - [old/style/major] Глагол «billigen» (одобрять/потворствовать) в немецком языке применяется к поступкам или ситуациям, применять его к человеку («mich billigen») грамматически и стилистически некорректно.
  - [new/style/minor] Слово «einst» (когда-то) звучит слегка архаично или сказочно для современного текста, разговорное «einmal» было бы уместнее.
  - [new/style/minor] Глагол «gutheißen» также чаще применяется к действиям и решениям, чем к человеку напрямую («mich gutheißen» звучит шероховато, лучше было бы «mich akzeptieren» или «mir zustimmen»).

#### 🟢 de `/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Модель перфекционизма на примере</h2> Напомним, что согласно когнитивно-поведенческой психотерапии, наш жизненный опыт формирует убеждения о себе, других людях и мире. Эти убеждения, в свою очередь, определяют наши жизненные стратегии и правила. В качестве…
- **OLD**: <h2>Ein Modell des Perfektionismus am Beispiel</h2> Zur Erinnerung: Gemäß der kognitiven Verhaltenstherapie (KVT) prägen unsere Lebenserfahrungen die Überzeugungen über uns selbst, andere Menschen und die Welt. Diese Überzeugungen bestimmen wiederum unsere Leb…
- **NEW**: <h2>Ein Modell des Perfektionismus am Beispiel</h2> Zur Erinnerung: Gemäß der Kognitiven Verhaltenstherapie (KVT) prägen unsere Lebenserfahrungen die Überzeugungen über uns selbst, andere Menschen und die Welt. Diese Überzeugungen bestimmen wiederum unsere Leb…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 88)
  - Перевод A точнее передает смысл оригинала, сохраняя важный контекст возрастных периодов, тогда как B допускает смысловое опущение. При этом оба перевода нарушили правило обязательной адаптации имен.
  - [new/style/minor] Нарушено строгое правило типографики: в одном месте использована прямая программная кавычка («Ich muss alles perfekt machen").
  - [new/style/minor] Имя «Евгений» транслитерировано как «Evgeniy», а не адаптировано под немецкое (например, Jens или Thomas), что нарушает правило культурной адаптации.
  - [old/omission/major] Фраза «в младшем школьном или дошкольном возрасте» переведена слишком обобщенно («im Kindesalter»), из-за чего потеряна важная психологическая точность.
  - [old/style/minor] Имя «Евгений» транслитерировано как «Evgeniy», а не адаптировано под немецкое.
  - [old/terminology/minor] Термин «kognitiven Verhaltenstherapie» написан со строчной буквы, что расходится с глоссарием, где он указан с заглавной (Kognitive Verhaltenstherapie).
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 82)
  - Перевод B точнее передает детали оригинала (сохранен возраст) и звучит гораздо естественнее в формулировках убеждений (например, 'ist keine Option' вместо 'ist nicht erlaubt'). Оба перевода нарушили правило адаптации имен, а B допустил техническую ошибку с кавычкой, но по совокупности стиля и точности B лучше.
  - [new/other/critical] Нарушение правила о кавычках: использована прямая программная кавычка (") вместо закрывающей типографской (“) в конце фразы „Ich muss alles perfekt machen".
  - [new/style/major] Имя Евгений не адаптировано под немецкое (оставлено Evgeniy), что нарушает правило локализации.
  - [old/omission/major] Опущены конкретные возрастные периоды ('в младшем школьном или дошкольном возрасте'), заменено на слишком общее 'im Kindesalter'.
  - [old/style/major] Имя Евгений не адаптировано под немецкое (оставлено Evgeniy), что нарушает правило локализации.
  - [old/style/minor] Фраза 'Etwas schlecht zu machen, ist nicht erlaubt' звучит неестественно и канцелярно для живой речи.

#### 🟡 de `/exercise/description`— вердикт неустойчив

- **RU**: Статья рассматривает два типа перфекционизма негативный и позитивный, предлагая эффективные рекомендации по работе с перфекционистскими тенденциями. Автор представляет восемь ключевых стратегий, включая мотивацию к изменениям, когнитивную реструктуризацию, ори…
- **OLD**: Dieser Artikel befasst sich mit zwei Arten von Perfektionismus – dem negativen und dem positiven – und bietet effektive Empfehlungen im Umgang mit perfektionistischen Tendenzen. Der Autor stellt acht zentrale Strategien vor, darunter die Motivation zur Verände…
- **NEW**: Dieser Artikel befasst sich mit zwei Arten von Perfektionismus – dem negativen und dem positiven – und bietet effektive Empfehlungen im Umgang mit perfektionistischen Tendenzen. Wir stellen acht zentrale Strategien vor, darunter die Motivation zur Veränderung,…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Перевод A точнее и полнее передает смысл оригинала. Перевод B необоснованно заменяет «автора» на «мы» и слишком вольно перефразирует концовку, теряя важные детали («безусловно», «ежедневно»).
  - [new/mistranslation/major] Фраза «Автор представляет» переведена как «Wir stellen ... vor» (Мы представляем), что искажает субъект действия.
  - [new/omission/major] Слишком вольный перевод последней фразы: потеряны смыслы «безусловно» (переведено как «mit Mitgefühl») и «ежедневно» (переведено как «achtsam»).
  - [old/style/minor] Существительное «Formung» в связке с убеждениями звучит несколько тяжеловесно и похоже на кальку. Естественнее было бы использовать «Entwicklung» или «Aufbau».
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 72 / NEW 92)
  - Перевод A строго соблюдает обязательное правило обращения на «Sie» и звучит более естественно, используя удачные психологические формулировки (например, hilfreiche Überzeugungen). Перевод B грубо нарушает правило, используя безличное «man», и содержит кальки (Formung).
  - [new/other/minor] Смещение фокуса: «Автор представляет» заменено на «Wir stellen vor» (мы представляем), что слегка меняет перспективу, хотя и звучит естественно.
  - [new/omission/minor] Концовка переведена довольно вольно (опущено «ежедневно» и «безусловно»), но это компенсируется отличным попаданием в терапевтический тон.
  - [old/style/major] Грубое нарушение Tone of Voice: использование безличного местоимения «man» («dass man... kann, indem man lernt») вместо предписанного правилами вежливого обращения на «Sie».
  - [old/style/minor] Словосочетание «Formung neuer... Überzeugungen» — это калька с русского «формирование». В немецком убеждения не формуют (лучше Entwicklung, Aufbau).
  - [old/style/minor] Фраза «sich täglich um sich selbst zu kümmern» грамматически верна, но звучит тяжеловато из-за повторения «sich».

#### 🟢 de `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Исследователи считают, что невротический перфекционизм формируется под воздействием детского опыта с родителями, которые проявляли любовь условно (за оценки, результаты и т. п.) или вообще не проявляли никакого одобрения. В том и другом случае у ребенка появля…
- **OLD**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Kindheitserfahrungen geprägt wird – etwa durch Eltern, die Liebe nur an Bedingungen knüpften (wie an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwickelt das Ki…
- **NEW**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe nur an Bedingungen knüpften (wie etwa an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwi…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 87 / NEW 92)
  - Перевод B звучит более естественно, особенно в последнем абзаце, и точно переводит слово «наказания» (Bestrafungen), тогда как А искажает его (Ablehnung).
  - [old/mistranslation/minor] Слово «наказаний» переведено как «Ablehnung» (отвержение/отказ), а не как «Bestrafungen».
  - [old/style/minor] Последнее предложение звучит немного тяжело из-за пассивной конструкции («wird die Strategie gewählt») и концовки («als nicht Erster werden zu können»).
  - [new/addition/minor] В фразе «Muster des Überflieger-Syndroms» добавлено слово «Muster» (паттерн), которого нет в оригинале («синдром отличника»).
  - [new/style/minor] В первом предложении присутствует тавтология: «etwa durch Eltern... wie etwa an Noten».
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Перевод A точнее передает смысл (верно переведено слово «наказаний») и звучит более естественно благодаря использованию активного залога и живых разговорных конструкций. Перевод B содержит смысловую ошибку и местами страдает от тяжеловесного пассивного залога, копирующего русскую структуру.
  - [new/addition/minor] К термину «Überflieger-Syndrom» («синдром отличника») добавлено словосочетание «Muster des», которого нет в оригинале.
  - [old/mistranslation/major] Слово «наказаний» переведено как «Ablehnung» (отвержение), хотя должно быть «Bestrafungen».
  - [old/style/minor] Использование пассивного залога «wird die Strategie gewählt» (калька с русского «выбирается стратегия») звучит канцелярски, здесь лучше использовать активный залог.
  - [old/style/minor] Фраза «als nicht Erster werden zu können» грамматически допустима, но стилистически тяжеловесна; вариант «wenn man schon nicht Erster werden kann» звучал бы естественнее.

#### 🟢 de `/description` — NEW лучше (2:0)

- **RU**: Статья исследует перфекционизм, подчеркивая, что стремление к высоким стандартам может быть полезным, но когда оно превращается в жесткие требования, это приводит к негативным последствиям, таким как тревожность и неудовлетворенность жизнью. Примеры из жизни п…
- **OLD**: Dieser Artikel setzt sich mit dem Thema Perfektionismus auseinander und zeigt auf, dass das Streben nach hohen Standards durchaus hilfreich sein kann. Wenn daraus jedoch starre Anforderungen werden, führt dies zu negativen Folgen wie Angstzuständen und Unzufri…
- **NEW**: Dieser Artikel setzt sich mit dem Thema Perfektionismus auseinander und zeigt auf, dass das Streben nach hohen Standards durchaus hilfreich sein kann. Wenn dieses Streben jedoch in starre Anforderungen umschlägt, führt es zu negativen Folgen wie Angstzuständen…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 95)
  - Перевод А точнее передает структуру оригинала, сохраняя активный залог и упоминание автора в последнем предложении. Вариант B необоснованно использует безличную пассивную конструкцию, теряя субъект действия.
  - [old/omission/minor] В последнем предложении пропущено упоминание автора («автор призывает»), вместо этого использована пассивная конструкция («wird ... empfohlen»).
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 89 / NEW 95)
  - Перевод B точнее передает оригинал в последнем предложении, сохраняя активный залог и упоминание автора («plädiert der Autor»), в то время как А использует безличную пассивную конструкцию («wird ... empfohlen»).
  - [old/omission/minor] Утеряно упоминание автора и активное действие («автор призывает» превратилось в безличное «wird empfohlen»).

#### 🟡 de `/exercise/title`— вердикт неустойчив

- **RU**: Как быть, если перфекционизм есть, идеала нет, а вы хотите нормально жить?
- **OLD**: Was tun, wenn der Perfektionismus da ist, das Ideal aber fehlt und Sie trotzdem normal leben wollen?
- **NEW**: Was tun, wenn der Perfektionismus da ist, das Ideal aber fehlt und Sie trotzdem ein erfülltes Leben führen wollen?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Перевод A точнее передает простое и приземленное «нормально жить» (normal leben), тогда как B неоправданно меняет смысл на «вести насыщенную жизнь» (ein erfülltes Leben führen).
  - [new/mistranslation/minor] Фраза «ein erfülltes Leben führen» (вести насыщенную/полноценную жизнь) искажает изначальный смысл простого «нормально жить», добавляя излишний пафос.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод A использует удачную транскреацию «ein erfülltes Leben führen» (жить полноценной жизнью), что идеально попадает в эмпатичный терапевтический тон. Вариант B звучит слишком дословно и суховато.
  - [old/style/minor] Буквальный перевод «normal leben» в контексте психологии звучит немного сухо и обыденно, не передавая поддерживающий тон оригинала.

#### 🟢 de `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Желание достичь высоких стандартов, успешно выполнить задачи и быть продуктивным является довольно положительным качеством. Также, как желание быть принятым, одобренным, любимым или иметь значимые достижения в жизни. Когда это остается на уровне желаний, стрем…
- **OLD**: Das Bestreben, hohe Standards zu setzen, Aufgaben erfolgreich zu bewältigen und produktiv zu sein, ist eine durchaus positive Eigenschaft. Genauso wie der Wunsch, akzeptiert, geschätzt und geliebt zu werden oder im Leben bedeutende Leistungen zu erbringen. Sol…
- **NEW**: Das Bestreben, hohe Standards zu erreichen, Aufgaben erfolgreich zu bewältigen und produktiv zu sein, ist eine durchaus positive Eigenschaft. Genauso wie der Wunsch, akzeptiert, geschätzt und geliebt zu werden oder im Leben bedeutende Erfolge zu erzielen. Sola…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Перевод A строго соблюдает глоссарий и правила сочетаемости, использует правильные термины (konstruktiver Glaubenssatz) и конструкции (Anerkennung bekommen). Перевод B содержит терминологические ошибки и использует запрещенное сочетание «Anerkennung empfinden».
  - [new/style/minor] В ряду «aussehen, fühlen, denken und sich verhalten» глаголу «fühlen» не хватает возвратного местоимения «sich» (sich fühlen).
  - [old/terminology/major] Использовано «konstruktiven Überzeugungen» вместо закрепленного термина «konstruktiven Glaubenssätzen».
  - [old/style/major] Нарушено правило сочетаемости (п. 8): применена запрещенная конструкция «Anerkennung empfinden».
  - [old/mistranslation/minor] Глагол «достичь (высоких стандартов)» переведен как «setzen» (устанавливать), что искажает смысл; точнее — «erreichen».
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Перевод B строго следует глоссарию (Glaubenssatz) и правилам сочетаемости (Anerkennung bekommen), тогда как А допускает грубые ошибки в этих аспектах. Текст B также выигрывает стилистически за счет более изящных конструкций.
  - [old/terminology/major] Нарушение глоссария: вместо «konstruktiver Glaubenssatz» использовано «konstruktiven Überzeugungen».
  - [old/style/major] Прямое нарушение правила 8 из инструкции: использована калька «Anerkennung empfinden».
  - [old/mistranslation/minor] Фраза «достичь высоких стандартов» переведена как «hohe Standards zu setzen» (установить), а не «erreichen» (достичь).
  - [old/style/minor] В ряду глаголов «aussehen, fühlen, denken und handeln» пропущено возвратное местоимение «sich» перед глаголом «fühlen».
  - [new/style/minor] В ряду глаголов «aussehen, fühlen, denken und sich verhalten» местоимение «sich» стоит только перед verhalten. Поскольку aussehen и denken не возвратные, глагол fühlen грамматически остался без обязательного возвратного местоимения (должно быть «sich makellos zu fühlen»).

#### 🟢 de `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Современные ученые различают два типа перфекционизма: негативный и позитивный, или, иначе говоря, здоровый и патологический. Чтобы превратить минус в плюс, важно сочетать свои лидерские качества и стремление к совершенству со здравым смыслом и рациональностью.…
- **OLD**: Die moderne Wissenschaft unterscheidet zwei Arten von Perfektionismus: den negativen und den positiven – oder anders ausgedrückt: den ungesunden und den gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach Exzellenz mit …
- **NEW**: Die moderne Wissenschaft unterscheidet zwei Arten von Perfektionismus: den negativen und den positiven – oder anders ausgedrückt: den ungesunden und den gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, Ihre Führungsqualitäten und das…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 94)
  - Перевод A передает смысл оригинала полностью и без потерь, в то время как перевод B допустил серьезное упущение во втором абзаце, потеряв часть про лидерские качества.
  - [old/omission/major] Во втором абзаце полностью пропущена фраза «свои лидерские качества» (Ihre Führungsqualitäten).
  - [old/style/minor] Использование безличного местоимения «man» («dass man alles zu 100 % machen muss») нарушает жесткое правило Tone of Voice, предписывающее везде использовать форму Sie/Ihre.
  - [new/style/minor] Слово «Alternative» во фразе «eine Alternative Sichtweise» в середине предложения должно писаться со строчной буквы по правилам немецкой грамматики, несмотря на словарную фиксацию термина с заглавной.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 93)
  - Перевод B сохранил все смысловые элементы оригинала и читается естественно. Перевод A допустил серьезную ошибку (omission), полностью пропустив важный фрагмент текста.
  - [old/omission/major] Во втором предложении полностью пропущен перевод фразы «свои лидерские качества».
  - [new/style/minor] Неверный регистр прилагательного в девятом предложении: написано «eine Alternative Sichtweise», по правилам немецкой грамматики должно быть со строчной буквы — «eine alternative Sichtweise», даже если термин в глоссарии указан с заглавной.

#### 🟢 de `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Помочь тестированию реальности (когнитивной реструктуризации) могут следующие вопросы:</h2> <li>Какие у меня есть доказательства, подтверждающие эту мысль или убеждение?</li> <li>Полезна ли эта мысль?</li> <li>Есть ли другие способы, которыми я могу думать…
- **OLD**: <h2>Die folgenden Fragen können Ihnen helfen, Ihre Gedanken einem Realitätscheck (kognitive Umstrukturierung) zu unterziehen:</h2> <li>Welche Beweise habe ich, die diesen Gedanken oder diese Überzeugung stützen?</li> <li>Ist dieser Gedanke hilfreich für mich?<…
- **NEW**: <h2>Die folgenden Fragen können Ihnen helfen, die Realität zu prüfen (kognitive Umstrukturierung):</h2> <li>Welche Beweise habe ich, die diesen Gedanken oder diese Überzeugung stützen?</li> <li>Ist dieser Gedanke hilfreich?</li> <li>Gibt es andere Wege, wie ic…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Вариант B точен, звучит естественно и не имеет потерь смысла. В варианте A пропущено придаточное предложение, а также используется неестественная сочетаемость с существительным.
  - [old/omission/major] Пропущена целая фраза оригинала: «Когда вы поймете, что стоит за перфекционизмом, спросите себя».
  - [old/style/minor] Неудачная лексическая сочетаемость: «Standards auflegen» звучит неестественно (в отличие от «Standards anwenden» в варианте B).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Перевод A звучит естественно, точно передает смысл оригинала и соблюдает правила типографики. Перевод B содержит серьезную смысловую потерю (пропущена половина предложения) и небольшие стилистические недочеты.
  - [old/omission/major] Полностью пропущена вводная часть предложения «Когда вы поймете, что стоит за перфекционизмом, спросите себя» — переведен только сам вопрос.
  - [old/style/minor] Фраза «Standards auflegen» звучит неестественно; в немецком стандарты «anwenden» (как в A) или «Maßstäbe anlegen».
  - [new/omission/minor] При переводе «публичных насмешек» упущено слово «публичных» (переведено просто как «sich lächerlich zu machen»), хотя для немецкого языка это звучит достаточно органично.

#### 🟢 de `/screen_4/texts` — NEW лучше (2:0)

- **RU**: Помимо влияния семьи, перфекционизм поощряется современным обществом. В школе и университетах преподаватели любят послушных учеников-отличников, а работодатели ценят сотрудников-перфекционистов. Рыночная экономика подталкивает людей к конкуренции, стремлению п…
- **OLD**: Neben dem Einfluss der Familie wird Perfektionismus auch durch die moderne Gesellschaft gefördert. In Schulen und Universitäten schätzen Lehrende gehorsame Musterschüler, und Arbeitgeber suchen perfektionistische Mitarbeiter. Die Marktwirtschaft treibt Mensche…
- **NEW**: Neben dem Einfluss der Familie wird Perfektionismus auch durch die moderne Gesellschaft gefördert. In Schulen und Universitäten werden gehorsame Musterschüler geschätzt, und Arbeitgeber legen großen Wert auf perfektionistische Mitarbeiter. Die Marktwirtschaft …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 93)
  - Перевод B звучит естественнее благодаря удачным синтаксическим конструкциям (например, «Wer gut aussieht... hat höhere Chancen» вместо кальки с «Если человек...») и точнее передает полноту оригинала, избегая упущений, допущенных в варианте A.
  - [old/omission/minor] Упущено «и ресурсов» (переведено только как «Mengen an Kraft»).
  - [old/omission/minor] Пропущено «объекта или явления» в предложении про идеал («ein vermeintlich vollendeter Zustand»).
  - [old/style/minor] Конструкция «Dadurch entsteht oft der Glaube» звучит отстраненно-канцелярски по сравнению с оригиналом «человек часто убежден».
  - [new/addition/minor] Добавлено слово «sogar» (даже) перед «Ihre Erholung» (смысл не искажает, но в оригинале его нет).
  - [new/style/minor] Фраза «Ein perfektes Ideal» является легким плеоназмом («идеальный идеал»); в оригинале просто «Идеала не существует».
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 93)
  - Перевод A звучит гораздо естественнее для носителя благодаря использованию глагольных конструкций и идиоматичных оборотов («Wer gut aussieht...»). Перевод B содержит несколько необоснованных пропусков и использует нежелательные номинализации.
  - [old/omission/major] Пропущены слова «и ресурсов» (в тексте только Kraft) и «объекта или явления» (eines Objekts oder Phänomens).
  - [old/style/major] «Dadurch entsteht oft der Glaube» — нежелательная метафора «рождения» и номинализация, нарушающая правила естественного немецкого стиля.
  - [old/mistranslation/minor] Слово «ценят» переведено как «suchen» (ищут), а не «schätzen».
  - [new/style/minor] Фраза «Ein perfektes Ideal» является плеоназмом, в оригинале было просто «Идеала».
  - [new/addition/minor] Добавлены усилительные слова «sogar» (sogar Ihre Erholung) и «fest» (fest davon überzeugt), которых нет в оригинале, хотя они не искажают смысл.

#### 🟢 de `/exercise/screen_3/texts` — NEW лучше (2:0)

- **RU**: В жизни редко что дается без ошибок и неудач. Никто не рождается мастером – мы учимся, пробуем, ошибаемся и постепенно совершенствуемся. Так разрешите себе быть неидеальным, делать что-то не до конца, допускать промахи. Ошибки – не враги, а помощники на пути к…
- **OLD**: Im Leben geht selten etwas ohne Fehler und Rückschläge einher. Niemand wird als Meister geboren – wir lernen, probieren Dinge aus, machen Fehler und verbessern uns Schritt für Schritt. Erlauben Sie sich daher, unperfekt zu sein, Dinge nicht immer sofort abzusc…
- **NEW**: Im Leben läuft selten alles fehlerfrei ab. Niemand wird als Meister geboren – wir lernen, probieren Dinge aus, machen Fehler und verbessern uns Schritt für Schritt. Erlauben Sie sich daher, unperfekt zu sein, Dinge auch mal unvollendet zu lassen oder auch einm…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 90)
  - Перевод A написан более живым и естественным языком, лучше адаптируя структуру фраз. В переводе B присутствуют лексико-грамматические ошибки (неверное управление глагола einhergehen) и искажение смысла.
  - [old/style/major] Конструкция 'geht ... ohne Fehler ... einher' некорректна: глагол einhergehen требует предлога mit.
  - [old/mistranslation/major] 'nicht immer sofort abzuschließen' означает 'не сразу заканчивать' (откладывать), что искажает смысл 'делать не до конца' (оставлять незавершенным).
  - [old/style/minor] 'Prozessorientierung' — номинализация (нарушение инструкции 'Анти-кальки'), лучше использовать глагольную форму, как в А.
  - [old/style/minor] Фраза 'auf Rot stehen' неестественна в данном контексте, носитель сказал бы 'an roten Ampeln stehen' или 'haben ständig Rot'.
  - [new/style/minor] Стилистический повтор глагола: 'Versuchen Sie, die Dinge neu zu betrachten, indem Sie nicht versuchen...'.
  - [new/omission/minor] В первом предложении потеряно 'и неудач' (Rückschläge), хотя 'fehlerfrei' частично покрывает смысл.
  - [new/addition/minor] В предложении 'Versuchen Sie... ein Ideal loszulassen' добавлено 'Versuchen Sie' (в оригинале просто императив 'отказывайтесь').
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 83 / NEW 91)
  - Перевод B звучит естественнее благодаря удачным лексическим решениям («Erfolgstagebuch», «grüne Wellen», глагольные конструкции вместо номинализаций) и точнее передает смысл. Перевод А допускает смысловые и идиоматические ошибки.
  - [old/mistranslation/major] Фраза «делать что-то не до конца» переведена как «nicht immer sofort abzuschließen» (не всегда сразу заканчивать), что меняет смысл с 'неидеальности/незавершенности' на 'откладывание/задержку'.
  - [old/style/major] «stehen Sie ständig auf Rot» — некорректное использование идиомы по отношению к человеку. На красный свет стоит светофор («die Ampel steht auf Rot»), а водитель — на красном сигнале («an einer roten Ampel»).
  - [old/style/minor] «Tagebuch Ihrer Erfolge» звучит более искусственно по сравнению с естественным сложением «Erfolgstagebuch» в варианте B.
  - [new/style/minor] В предложении «Versuchen Sie, ... indem Sie nicht versuchen...» допущен лексический повтор, утяжеляющий фразу (калька с «не пытаясь»).
  - [new/addition/minor] В предложении про ориентацию на процесс добавлен модальный глагол «sollten» (вам следует концентрироваться), хотя в оригинале констатация факта («вы концентрируетесь»).

