# QA: слепое парное сравнение переводов — prompt-v2-big

- **Дата**: 2026-09-13T06:21:44.803Z
- **Метка**: prompt-v2-big
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/perfectionism.json
- **Локали**: de
- **Сэмпл/файл**: 6
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: e5f619e3caa4d09e8c2e79d0b392e4f3042b4e2d

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/perfectionism.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 6 | 🟢 2 | 🔴 3 | ⚪ 0 | 🟡 1 | 0 / 0 | 40% |
| **итого** | 6 | 🟢 2 | 🔴 3 | ⚪ 0 | 🟡 1 | 0 / 0 | 40% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×5, mistranslation/minor×1, style/major×1; OLD — style/minor×2, terminology/minor×1, addition/major×1

### Детали пар (для спот-чека)

#### 🟢 de `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Помочь тестированию реальности (когнитивной реструктуризации) могут следующие вопросы:</h2> <li>Какие у меня есть доказательства, подтверждающие эту мысль или убеждение?</li> <li>Полезна ли эта мысль?</li> <li>Есть ли другие способы, которыми я могу думать…
- **OLD**: <h2>Die folgenden Fragen können Ihnen helfen, Ihre Gedanken auf ihren Realitätsgehalt zu prüfen (kognitive Umstrukturierung):</h2> <li>Welche Beweise sprechen für diesen Gedanken oder diese Überzeugung?</li> <li>Ist dieser Gedanke hilfreich für mich?</li> <li>…
- **NEW**: <h2>Die folgenden Fragen können Ihnen helfen, Ihre Gedanken auf die Realität zu prüfen (kognitive Umstrukturierung):</h2> <li>Welche Beweise habe ich, die diesen Gedanken oder diese Überzeugung stützen?</li> <li>Ist dieser Gedanke hilfreich für mich?</li> <li>…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B точнее следует глоссарию (использует 'alternative Überzeugung' вместо 'Sichtweise') и звучит более естественно в психологическом контексте. Перевод A допустим, но содержит небольшую терминологическую неточность относительно заданных правил.
  - [old/terminology/minor] Использовано 'alternative Sichtweise', в то время как глоссарий требует 'alternative Überzeugung' для упражнений по реструктуризации.
  - [old/style/minor] Фраза 'Helfen Ihnen diese Verhaltensweisen' (помогают ли эти формы поведения) звучит чуть менее точно, чем 'Mechanismen' в контексте психологических процессов.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод A более точен в плане терминологии (использует 'alternative Überzeugung' согласно глоссарию, в то время как B использует 'alternative Sichtweise', что в данном контексте является ошибкой) и звучит более естественно в части передачи эмоционального подтекста.
  - [old/terminology/major] Использовано 'alternative Sichtweise' вместо требуемого 'alternative Überzeugung' для процесса реструктуризации убеждений.
  - [old/style/minor] Фраза 'Wünsche zu stillen' (утолять желания) звучит чуть менее естественно в контексте психологической поддержки, чем 'Bedürfnisse zu bewältigen' или 'abdecken'.
  - [new/style/minor] В заголовке 'Gedanken auf die Realität zu prüfen' грамматически допустимо, но 'auf ihren Realitätsgehalt zu prüfen' из варианта B звучит чуть более профессионально.

#### 🟡 de `/screen_3/texts`— вердикт неустойчив

- **RU**: Исследователи считают, что невротический перфекционизм формируется под воздействием детского опыта с родителями, которые проявляли любовь условно (за оценки, результаты и т. п.) или вообще не проявляли никакого одобрения. В том и другом случае у ребенка появля…
- **OLD**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe nur an Bedingungen knüpften (wie etwa an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwi…
- **NEW**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe nur an Bedingungen knüpften (wie etwa an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwi…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Перевод A более точен в передаче нюансов оригинала. В частности, термин 'Musterknaben-Syndrom' (синдром отличника) в контексте перфекционизма звучит более естественно и точно, чем 'Überflieger-Syndrom' (синдром 'выскочки' или сверхчеловека). Также в A лучше передана логика последнего предложения.
  - [new/mistranslation/minor] «Überflieger-Syndrom» имеет скорее позитивный или амбициозный оттенок, тогда как «синдром отличника» в контексте патологии — это именно стремление соответствовать стандартам (Musterknabe).
  - [new/style/minor] Фраза «als den ersten Platz nicht erreichen zu können» в конце звучит немного тяжеловесно по сравнению с лаконичным вариантом в A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is more natural and uses better idiomatic expressions. Translation B suffers from a mistranslation of 'синдром отличника' (Musterknaben-Syndrom is too niche/old-fashioned compared to the more common Überflieger-Syndrom or simply 'Musterkind') and has slightly clunkier sentence structures in the final paragraph.
  - [old/style/minor] The phrasing 'da man es nicht schafft, der Erste zu sein' is slightly more heavy/clunky than A's version.
  - [old/style/minor] The addition of 'Beziehungsarbeit' (relationship work) is a slight deviation from the original 'помощи в отношениях' (help in relationships), though it fits the context, it's a bit of a leap.

#### 🔴 de `/exercise/screen_1/texts` — OLD лучше (2:0)

- **RU**: Современные ученые различают два типа перфекционизма: негативный и позитивный, или, иначе говоря, здоровый и патологический. Чтобы превратить минус в плюс, важно сочетать свои лидерские качества и стремление к совершенству со здравым смыслом и рациональностью.…
- **OLD**: Die moderne Wissenschaft unterscheidet zwei Arten von Perfektionismus: den negativen und den positiven – oder anders ausgedrückt: den ungesunden und den gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach Exzellenz mit …
- **NEW**: Die moderne Wissenschaft unterscheidet zwei Arten von Perfektionismus: den negativen und den positiven – oder anders ausgedrückt: den ungesunden und den gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach Exzellenz mit …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 90)
  - Перевод A безупречен с точки зрения терминологии и стилистики. Он идеально следует глоссарию (Alternative Sichtweise) и использует правильные немецкие кавычки „ “. Перевод B также хорош, но содержит небольшую стилистическую шероховатость в конце (использование 'geben' вместо 'formulieren' в контексте ответа на мысль) и использует менее естественную конструкцию в одном из предложений.
  - [new/style/minor] В предложении 'ihnen eine alternative Sichtweise geben' глагол 'geben' звучит чуть менее профессионально, чем 'formulieren' в контексте КПТ.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод B более точен в плане терминологии и стилистики. В частности, использование 'eine alternative Sichtweise formulieren' (сформулировать) звучит более профессионально и естественно для КПТ-контекста, чем 'geben' (давать). Также в B лучше передана структура предложения с перечислением убеждений.
  - [new/style/minor] В предложении про убеждения 'Sie halten an...' звучит немного оторвано от предыдущей части, в то время как в B это единая плавная конструкция.
  - [new/style/minor] Использование 'ihnen eine alternative Sichtweise geben' — допустимо, но 'formulieren' (как в B) — стандарт для терапевтических упражнений.

#### 🔴 de `/exercise/title` — OLD лучше (2:0)

- **RU**: Как быть, если перфекционизм есть, идеала нет, а вы хотите нормально жить?
- **OLD**: Wie geht man mit Perfektionismus um, wenn das Ideal unerreichbar scheint und man einfach nur normal leben möchte?
- **NEW**: Was tun, wenn der Perfektionismus da ist, das Ideal fehlt, Sie aber normal leben wollen?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 75)
  - Перевод B звучит гораздо естественнее и лучше передает эмоциональный подтекст оригинала. Перевод A страдает от кальки с русского («der Perfektionismus da ist») и звучит суховато, в то время как B использует живой, поддерживающий язык.
  - [new/style/major] Конструкция 'der Perfektionismus da ist' является калькой и звучит неестественно для носителя; также порядок слов в конце предложения слишком тяжеловесен.
  - [new/style/minor] Слишком буквальный перевод 'идеала нет' (das Ideal fehlt) вместо передачи смысла недостижимости.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 78)
  - Перевод A звучит как естественный, качественный заголовок статьи или раздела, написанный носителем. Перевод B слишком калькирует русскую структуру («Perfektionismus da ist»), что делает его тяжеловесным и менее профессиональным.
  - [new/style/major] Конструкция 'wenn der Perfektionismus da ist' является калькой с русского и звучит неестественно для немецкого языка; использование 'Sie' в середине предложения после 'man' создает стилистический диссонанс.

#### 🟢 de `/exercise/description` — NEW лучше (2:0)

- **RU**: Статья рассматривает два типа перфекционизма негативный и позитивный, предлагая эффективные рекомендации по работе с перфекционистскими тенденциями. Автор представляет восемь ключевых стратегий, включая мотивацию к изменениям, когнитивную реструктуризацию, ори…
- **OLD**: Dieser Artikel beleuchtet zwei Arten von Perfektionismus – den negativen und den positiven – und bietet hilfreiche Strategien für den Umgang mit perfektionistischen Tendenzen. Wir stellen acht zentrale Ansätze vor, darunter die Motivation zur Veränderung, kogn…
- **NEW**: Dieser Artikel befasst sich mit zwei Arten von Perfektionismus – dem negativen und dem positiven – und bietet effektive Empfehlungen im Umgang mit perfektionistischen Tendenzen. Der Autor stellt acht zentrale Strategien vor, darunter die Motivation zur Verände…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A максимально точно передает структуру оригинала и сохраняет нейтрально-экспертный тон. Перевод B допускает грубую ошибку (addition), меняя автора на 'мы' (Wir), и нарушает логику повествования, переходя на 'Вы' (Sie) там, где в оригинале описывается общая идея.
  - [old/addition/major] Вместо 'Автор представляет' (Der Autor stellt vor) написано 'Мы представляем' (Wir stellen vor).
  - [old/style/minor] Переход на 'Sie' (Вы) в последнем предложении делает текст менее академичным и более директивным, чем в оригинале.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Перевод B точнее передает структуру оригинала и сохраняет нейтрально-поддерживающий тон. Перевод A совершает ошибку добавления (addition), меняя 'Автор' на 'Wir' (Мы), что не соответствует исходному тексту.
  - [old/addition/major] Вместо 'Автор представляет' (Der Autor stellt vor) использовано 'Wir stellen vor' (Мы представляем), что искажает субъект действия.
  - [old/style/minor] Фраза 'sich selbst bedingungslos anzunehmen' (принимать себя) — хороший вариант, но 'lieben' из оригинала передано менее эмоционально.

#### 🔴 de `/screen_2/texts` — OLD лучше (2:0)

- **RU**: <h2>Модель перфекционизма на примере</h2> Напомним, что согласно когнитивно-поведенческой психотерапии, наш жизненный опыт формирует убеждения о себе, других людях и мире. Эти убеждения, в свою очередь, определяют наши жизненные стратегии и правила. В качестве…
- **OLD**: <h2>Ein Modell des Perfektionismus am Beispiel</h2> Zur Erinnerung: Gemäß der kognitiven Verhaltenstherapie prägen unsere Lebenserfahrungen die Überzeugungen über uns selbst, über andere Menschen und die Welt. Diese Überzeugungen bestimmen wiederum unsere Lebe…
- **NEW**: <h2>Ein Modell des Perfektionismus am Beispiel</h2> Zur Erinnerung: Gemäß der Kognitiven Verhaltenstherapie (KVT) prägen unsere Lebenserfahrungen die Überzeugungen über uns selbst, andere Menschen und die Welt. Diese Überzeugungen bestimmen wiederum unsere Leb…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 97 / NEW 92)
  - Translation B is more natural and precise. It uses 'Grundschulalter' (primary school age) instead of the slightly clunky 'frühen Schulalter' and handles the nuances of the list items more smoothly. It also correctly follows the lowercase convention for 'kognitive Verhaltenstherapie' in a sentence, whereas A uses uppercase which is less common in this context.
  - [new/style/minor] The phrase 'frühen Schulalter' is understandable but 'Grundschulalter' is the standard term for primary school age in Germany.
  - [new/style/minor] Capitalizing 'Kognitiven Verhaltenstherapie' in the middle of a sentence is grammatically acceptable but less fluid than the lowercase version used in B.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Перевод A более точен в передаче нюансов оригинала и лучше следует глоссарию. Перевод B допустил ошибку в интерпретации списка убеждений, заменив личное 'Если меня критикуют' на безличное 'Wenn man mich kritisiert', что ослабляет эффект погружения в мысли героя.
  - [new/style/minor] В списке убеждений использовано 'Wenn man mich kritisiert' (Если меня критикуют [люди вообще]), тогда как в оригинале и в варианте A используется более естественное для внутреннего монолога 'Wenn ich kritisiert werde'.
  - [new/style/minor] Фраза 'Alles muss bei mir reibungslos funktionieren' (Все должно у меня работать без сбоев) — это вольная интерпретация 'У меня должно все получаться', которая звучит чуть более механистично, чем в оригинале.

