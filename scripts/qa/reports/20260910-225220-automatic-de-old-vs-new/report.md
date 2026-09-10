# QA: слепое парное сравнение переводов — automatic-de-old-vs-new

- **Дата**: 2026-09-10T19:52:20.330Z
- **Метка**: automatic-de-old-vs-new
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/pre-retranslate-20260910-automatic
- **Файлы**: story/automatic.json
- **Локали**: de
- **Сэмпл/файл**: 10
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:18000/v1
- **git HEAD**: dfc3438ef3704cb281f71defd66df4e4cefbc132

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/automatic.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 7 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | 100% |
| **итого** | 7 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — terminology/minor×1, style/minor×1; OLD — style/minor×4, omission/major×3, mistranslation/major×2, style/major×2, addition/minor×1, omission/minor×1, addition/major×1

### Детали пар (для спот-чека)

#### 🟢 de `/test/question` — NEW лучше (2:0)

- **RU**: Автоматические мысли — это...
- **OLD**: Was charakterisiert automatische Gedanken am genauesten?
- **NEW**: Automatische Gedanken sind...
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 60 / NEW 100)
  - Перевод A является точным и прямым эквивалентом оригинала, сохраняя структуру определения. Перевод B полностью меняет форму высказывания с утвердительной на вопросительную, что является грубой ошибкой (addition/mistranslation) в контексте сохранения структуры текста.
  - [old/mistranslation/major] Вместо определения (что это такое) введен вопрос о характеристиках, что меняет смысл и функционал фразы.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 60 / NEW 100)
  - Перевод B является точным и прямым эквивалентом оригинала, сохраняя структуру определения. Перевод A полностью меняет форму высказывания с утверждения на вопрос, что является грубой ошибкой (addition/mistranslation) в контексте обучающего материала.
  - [old/mistranslation/major] Вместо определения (утверждения) представлен вопрос, что меняет функционал фразы.

#### 🟢 de `/test/answers` — NEW лучше (2:0)

- **RU**: Устойчивые и фундаментальные убеждения Установки, предопределенные нам от рождения Мысли, которые невозможно изменить Отрывочные, многочисленные мысли, возникающие непроизвольно
- **OLD**: Sie sind stabil und fundamental Sie sind von Geburt an fest vorgegeben Sie sind unmöglich zu verändern Sie sind bruchstückhaft, zahlreich und entstehen unwillkürlich
- **NEW**: Beständige und fundamentale Überzeugungen Einstellungen, die uns von Geburt an vorgegeben sind Gedanken, die man nicht verändern kann Einzelne, vielfältige Gedanken, die unwillkürlich entstehen
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 95)
  - Перевод A превращает заголовки и описательные фразы в законченные предложения с местоимением 'Sie', что полностью меняет структуру и тон оригинала, делая его похожим на учебник, а не на интерфейс или список определений. Перевод B точно передает смысл, сохраняет номинативный стиль (существительные вместо предложений) и использует правильную терминологию.
  - [old/style/major] Добавление местоимения 'Sie' (Они) превращает краткие тезисы в громоздкие предложения, что не соответствует оригиналу и нарушает лаконичность UI.
  - [old/style/minor] Фраза 'Sie sind unmöglich zu verändern' звучит тяжеловесно по сравнению с естественным 'die man nicht verändern kann'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 95)
  - Перевод A точно передает структуру оригинала (заголовки/тезисы), в то время как перевод B неоправданно добавляет местоимение 'Sie' (Они), превращая лаконичные определения в полные предложения, что нарушает стиль и ритм текста. Также в B допущена стилистическая ошибка в третьей строке.
  - [old/addition/major] Добавлено местоимение 'Sie' в начале каждой строки, что превращает тезисы в повествовательные предложения, нарушая формат оригинала.
  - [old/style/major] 'Sie sind unmöglich zu verändern' звучит неестественно и тяжеловесно; в немецком лучше использовать 'unveränderlich' или конструкцию из варианта A.
  - [old/style/minor] Потеряна структура заголовков, текст превратился в монотонный список.

#### 🟢 de `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Из предыдущей главы мы выяснили главное: наши мысли — это невидимые дирижеры наших эмоций и телесных реакций. Теперь, опираясь на этот фундамент, давайте познакомимся с тем явлением, с которым нам предстоит работать на практике каждый день. Чтобы наглядно пока…
- **OLD**: Aus dem vorherigen Kapitel wissen wir bereits, dass unsere Gedanken unsere Emotionen und körperlichen Reaktionen maßgeblich beeinflussen. Aufbauend auf diesen Basiskonzepten betrachten wir nun die Phänomene, mit denen wir in der praktischen Arbeit umgehen werd…
- **NEW**: Im vorangegangenen Kapitel haben wir das Wesentliche festgestellt: Unsere Gedanken sind die unsichtbaren Dirigenten unserer Emotionen und körperlichen Reaktionen. Aufbauend auf diesem Fundament möchten wir Sie nun mit jenem Phänomen vertraut machen, mit dem wi…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Перевод A максимально точно следует оригиналу, сохраняет его метафоричный стиль и ритм, а также использует правильную терминологию (KVT). Перевод B слишком сильно отклоняется от текста (transcreation), теряя важные детали образа (про яблоки) и меняя структуру предложений, что делает его менее точным.
  - [old/mistranslation/major] Вместо описания яблок (плодов) автор B вводит совершенно новую тему про 'иерархию убеждений', которой нет в оригинале.
  - [old/omission/major] Потеряно описание конкретных яблок (надкусанные/подгнившие), что критично для визуального образа дерева.
  - [old/style/minor] Текст звучит более сухо и академично, теряя эмпатичный и повествовательный тон оригинала.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 96)
  - Translation B is a faithful and high-quality transcreation that preserves the metaphors and tone of the original. Translation A significantly deviates from the source text, adding information not present in the original (e.g., about the 'hierarchy of beliefs') and losing the core metaphor of the 'invisible conductors'.
  - [old/addition/major] Added information about 'hierarchy of beliefs' which is not in the original.
  - [old/omission/major] Lost the key metaphor 'unsichtbare Dirigenten' (invisible conductors).
  - [old/style/minor] The flow is more academic/dry compared to the original's warm, engaging tone.
  - [new/style/minor] The quote translation is slightly more literal than the standard German philosophical rendering, but fits the context perfectly.

#### 🟢 de `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Давайте проведем небольшой мысленный эксперимент. Вообразите: вы сидите в уютном кресле кинотеатра, свет гаснет, вы ждете начала фильма. Внезапно женщина в ряду перед вами резко вскакивает и звонко бьет по лицу сидящего рядом мужчину. Ситуация шокирующая и нап…
- **OLD**: Ich lade Sie zu einem kleinen Gedankenexperiment ein. Stellen Sie sich vor, Sie sitzen im Kino und warten auf den Beginn des Films. Plötzlich springt eine Frau in der Reihe vor Ihnen auf und gibt dem Mann neben ihr eine Ohrfeige. Die Situation ist abrupt und e…
- **NEW**: Lassen Sie uns ein kleines Gedankenexperiment wagen. Stellen Sie sich vor: Sie sitzen in einem gemütlichen Kinosessel, das Licht wird gedimmt und Sie warten auf den Beginn des Films. Plötzlich springt eine Frau in der Reihe vor Ihnen abrupt auf und verpasst de…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much closer to the original's tone and imagery, maintaining the descriptive richness (cozy chair, dimming lights, etc.) and the specific metaphors (glasses of experience, lightning-fast thoughts). Translation A takes too many liberties by adding names (Sabine, Thomas) and simplifying the text, which changes the instructional nature of the experiment into a storytelling one.
  - [old/addition/minor] Added names 'Sabine' and 'Thomas' which were not in the original.
  - [old/omission/minor] Omitted descriptive details like 'cozy chair' and 'lights dimming', making the intro feel a bit dry.
  - [old/style/minor] The translation of the stepper content is a bit too simplified compared to the emotional depth of the Russian original.
  - [new/terminology/minor] Used single quotes for the stepper content; while acceptable in some code contexts, the prompt requested German typographic quotes „ “ if quotes are used, though B used ' ' which is a common fallback.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is a high-quality literary translation that preserves the atmosphere, rhythm, and nuances of the original. Translation B takes too many liberties, such as adding names (Sabine, Thomas) not present in the source, and simplifies the text to the point of losing its emotional impact.
  - [old/addition/major] Added names 'Sabine' and 'Thomas' which were not in the original text.
  - [old/omission/minor] Significant loss of descriptive detail (e.g., 'уютное кресло', 'звонко бьет', 'словно выстрел').
  - [old/style/minor] The tone is a bit too simplified/dry compared to the evocative original.

#### 🟢 de `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Возникает закономерный вопрос: почему же в одной и той же ситуации мы выдаем такие разные автоматические реакции? И значит ли это, что при каждом неприятном событии мы обречены на падение в воронку негатива и депрессии? Абсолютно нет. Автоматические мысли фоня…
- **OLD**: Warum reagieren Menschen in derselben Situation also so unterschiedlich? Bedeutet das, dass wir bei jedem unangenehmen Ereignis zwangsläufig in einen Teufelskreis aus negativen Gedanken und Emotionen geraten, der in eine Depression führt? Ganz und gar nicht. O…
- **NEW**: Es stellt sich die berechtigte Frage: Warum reagieren wir in derselben Situation mit so unterschiedlichen automatischen Reaktionen? Und bedeutet das, dass wir bei jedem unangenehmen Ereignis dazu verdammt sind, in einen Abgrund aus Negativität und Depression z…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод B гораздо точнее передает метафоричный и эмоциональный тон оригинала, сохраняя все ключевые образы (воронка/бездна, яблоки, корни, пустота). Перевод A слишком сильно упрощает текст, превращая его в сухой научно-популярный текст, и теряет важные смысловые нюансы.
  - [old/omission/major] Потеряна метафора 'яблок' (заменено на абстрактные 'плоды'), потеряна метафора 'пустоты' (вместо 'nicht im luftleeren Raum' использовано 'eng verknüpft'), потеряна эмоциональная окраска 'воронки негатива'.
  - [old/style/minor] Текст звучит слишком сухо и академично для терапевтического контекста, теряется эффект 'разговора с другом-экспертом'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A идеально передает метафоричный и поддерживающий тон оригинала, сохраняя структуру предложений и точно используя терминологию (Zwischenüberzeugungen, Grundüberzeugungen). Перевод B слишком сильно упрощает текст, теряя эмоциональную глубину и поэтичность метафоры с яблоками.
  - [old/style/minor] Слишком сильное упрощение (omission/paraphrasing): потеряна структура 'закономерного вопроса' и метафора с яблоками заменена на абстрактные 'плоды на дереве', что снижает литературность.
  - [old/mistranslation/minor] Вместо 'воронки негатива' использован 'Teufelskreis' (порочный круг), что меняет образ, хотя и близко по смыслу.

#### 🟢 de `/description` — NEW лучше (2:0)

- **RU**: Эта статья погружает вас в мир «автоматических мыслей» — невидимых спутников наших эмоций в когнитивно-поведенческой терапии (КПТ). Возвращаясь к метафоре яблоневого дерева, мы исследуем, как рождаются наши мгновенные реакции. На ярком примере из жизни мы пока…
- **OLD**: Dieser Artikel führt in das Konzept der „automatischen Gedanken“ im Kontext der Kognitiven Verhaltenstherapie (KVT) ein. Wir nutzen das Bild eines Apfelbaums, um zu veranschaulichen, wie die Hierarchie der Überzeugungen unsere schnellen emotionalen Reaktionen …
- **NEW**: Dieser Artikel führt Sie in die Welt der „automatischen Gedanken“ ein – jener unsichtbaren Begleiter unserer Emotionen in der Kognitiven Verhaltenstherapie (KVT). Mithilfe der Metapher eines Apfelbaums untersuchen wir, wie unsere unmittelbaren Reaktionen entst…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 98)
  - Перевод A является практически идеальным: он точно передает смысл, сохраняет структуру оригинала и использует правильную терминологию. Перевод B является грубой ошибкой (omission/addition), так как он полностью перефразирует текст, добавляет концепцию 'иерархии убеждений', которой нет в оригинале, и теряет важную часть посыла о способности пользователя управлять процессом.
  - [old/omission/major] Пропущена часть текста о том, что пользователь способен управлять процессом.
  - [old/addition/major] Добавлена информация про 'иерархию убеждений' (Hierarchie der Überzeugungen), которой нет в оригинале.
  - [old/style/major] Текст потерял эмоциональный и вдохновляющий тон оригинала, превратившись в сухую констатацию фактов.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 98)
  - Перевод B практически идеально передает дух, тон и структуру оригинала, соблюдая все правила типографики и терминологии. Перевод A является грубой переработкой (omission/addition), где потеряна значительная часть смысла и эмоциональный посыл текста.
  - [old/omission/major] Пропущено описание автоматических мыслей как 'невидимых спутников', пропущена часть про управление процессом и про пример из жизни.
  - [old/addition/major] Добавлена концепция 'иерархии убеждений' (Hierarchie der Überzeugungen), которой нет в оригинале.
  - [old/style/minor] Текст звучит слишком сухо и академично по сравнению с оригиналом.

#### 🟡 de `/title`— вердикт неустойчив

- **RU**: Автоматические мысли: какие плоды зреют в саду вашего сознания?
- **OLD**: Automatische Gedanken: Was wächst im Garten Ihres Bewusstseins?
- **NEW**: Automatische Gedanken: Welche Früchte reifen in Ihrem Bewusstsein?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Перевод A звучит гораздо более естественно и поэтично для немецкого языка, используя уместную метафору. Перевод B слишком буквален и звучит тяжеловесно из-за кальки с 'плоды зреют'.
  - [new/style/minor] Фраза 'Welche Früchte reifen' является слишком дословным переводом русского метафорического оборота, что делает текст менее живым и избыточным для немецкого уха.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Перевод A сохраняет оригинальную метафору про плоды (Früchte) и процесс созревания (reifen), что делает его точным и поэтичным. Перевод B упрощает метафору до 'что растет', теряя образность оригинала.
  - [old/style/minor] Утеряна метафора 'плодов' и 'созревания', текст стал слишком обобщенным по сравнению с оригиналом.

