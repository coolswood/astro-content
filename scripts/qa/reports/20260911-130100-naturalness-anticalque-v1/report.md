# QA: слепое парное сравнение переводов — naturalness-anticalque-v1

- **Дата**: 2026-09-11T10:01:00.156Z
- **Метка**: naturalness-anticalque-v1
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/depression/label_lawyer_lazy.json
- **Локали**: de
- **Сэмпл/файл**: 14
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: c2656dccdf73379d39b6ee810bfd700cb02dd4f8

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/label_lawyer_lazy.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 14 | 🟢 6 | 🔴 1 | ⚪ 0 | 🟡 7 | 0 / 0 | 86% |
| **итого** | 14 | 🟢 6 | 🔴 1 | ⚪ 0 | 🟡 7 | 0 / 0 | 86% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×4, addition/minor×2, style/major×1; OLD — style/minor×11, style/major×5

### Детали пар (для спот-чека)

#### 🟡 de `/lawyer/screen_1/texts`— вердикт неустойчив

- **RU**: Следующая техника помогает работать с самокритикой, предлагая вам стать собственным адвокатом. Может показаться необычным, но она удивительно эффективна. Чтобы ослабить влияние критических мыслей, важно не только замечать их, но и уметь уверенно им противостоя…
- **OLD**: Die folgende Technik hilft Ihnen dabei, mit Selbstkritik umzugehen, indem sie Ihnen vorschlägt, Ihr eigener Anwalt zu werden. Es mag ungewöhnlich erscheinen, ist aber erstaunlich effektiv. Um den Einfluss kritischer Gedanken zu mildern, ist es wichtig, sie nic…
- **NEW**: Die folgende Technik hilft Ihnen dabei, mit Selbstkritik umzugehen, indem sie Ihnen vorschlägt, Ihr eigener Anwalt zu werden. Es mag ungewöhnlich klingen, ist aber erstaunlich effektiv. Um den Einfluss kritischer Gedanken zu mildern, ist es wichtig, sie nicht …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A звучит более уверенно и естественно для терапевтического контекста. Перевод B перегружен сослагательным наклонением (Konjunktiv II) в предположении о роли адвоката, что делает текст излишне гипотетическим и тяжеловесным, в то время как в A используется более прямой и вовлекающий стиль.
  - [new/style/minor] Использование 'Stellen Sie sich vor, Sie wären...' вместо 'Stellen Sie sich als... vor' создает избыточную дистанцию и звучит менее естественно для инструкции.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A звучит более естественно и элегантно за счет использования Konjunktiv II в абзаце про адвоката, что лучше передает гипотетическую ситуацию 'Представьте, что вы...'. Перевод B в этом месте переходит на Indikativ, что звучит более сухо и менее литературно.
  - [old/style/minor] Использование Indikativ ('Sie werden sich nicht...') вместо Konjunktiv II ('Sie würden sich nicht...') делает гипотетическое описание менее плавным и менее естественным для данного контекста.

#### 🟡 de `/lawyer/screen_2/texts`— вердикт неустойчив

- **RU**: <dialog psy="true">Представьте, что вы часто критикуете себя, называете слабым и неудачником. Теперь попробуйте выступить в роли адвоката — даже если сначала это даётся с трудом.</dialog> <dialog psy="true">Задача — защищать себя честно, аргументированно и ува…
- **OLD**: <dialog psy='true'>Stellen Sie sich vor, Sie kritisieren sich oft selbst und bezeichnen sich als schwach oder als Versager. Versuchen Sie nun, die Rolle des Anwalts einzunehmen – auch wenn es anfangs schwerfällt.</dialog> <dialog psy='true'>Die Aufgabe besteht…
- **NEW**: <dialog psy='true'>Stellen Sie sich vor, Sie kritisieren sich oft selbst und bezeichnen sich als schwach oder als Versager. Versuchen Sie nun, die Rolle des Anwalts einzunehmen – auch wenn es Ihnen anfangs schwerfällt.</dialog> <dialog psy='true'>Die Aufgabe b…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Перевод A чуть более естественен в первом предложении за счет использования 'es Ihnen schwerfällt' вместо безличного 'es schwerfällt', что звучит более эмпатично и менее сухо. Также 'Hochschulbildung abgeschlossen' звучит солиднее, чем разговорное 'Hochschulabschluss gemacht'.
  - [old/style/minor] Использование 'es schwerfällt' без указания субъекта (ihnen) допустимо, но вариант в A звучит более лично и тепло, что лучше соответствует Tone of Voice.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 92)
  - Both translations are excellent and follow the professional tone required. Translation A is slightly better due to a more natural phrasing in the first paragraph ('auch wenn es anfangs schwerfällt' vs 'auch wenn es Ihnen anfangs schwerfällt') and a more idiomatic rendering of 'высшее образование' ('einen Hochschulabschluss gemacht' is more common in spoken/natural German than 'eine Hochschulbildung abgeschlossen').
  - [new/style/minor] 'eine Hochschulbildung abgeschlossen' sounds slightly more formal/stilted than the more natural 'einen Hochschulabschluss gemacht'.

#### 🟡 de `/lawyer/description`— вердикт неустойчив

- **RU**: Эта техника предлагает новый взгляд на преодоление самокритики — через роль внутреннего адвоката. Используя аналогию с судебным процессом, вы научитесь замечать обвиняющие мысли, оспаривать их и защищать себя аргументами, основанными на фактах и доброжелательн…
- **OLD**: Diese Technik bietet eine neue Perspektive auf die Überwindung von Selbstkritik – durch die Rolle eines inneren Anwalts. Mithilfe der Analogie eines Gerichtsverfahrens lernen Sie, anklagende Gedanken zu erkennen, sie anzufechten und sich selbst mit Argumenten …
- **NEW**: Diese Technik bietet eine neue Perspektive auf die Überwindung von Selbstkritik – durch die Rolle eines inneren Anwalts. Mithilfe der Analogie eines Gerichtsverfahrens lernen Sie, anklagende Gedanken zu erkennen, sie anzufechten und sich mit Argumenten zu vert…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Перевод A лучше передает нюанс оригинала в последнем предложении, используя сравнительную степень (unterstützendere, rationalere...), что подчеркивает процесс развития и улучшения текущего состояния. Перевод B использует положительную степень, что звучит более статично.
  - [old/style/minor] Использование положительной степени прилагательных (unterstützende вместо unterstützendere) делает текст менее динамичным и менее точным по отношению к смыслу 'развивать (более...) отношение'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Перевод A точнее передает смысл оригинала. В переводе B при попытке использовать сравнительную степень (unterstützender/rationaler/respektvoller) теряется логика: в оригинале речь идет о развитии *нового* (более поддерживающего) отношения, а не о сравнении текущего отношения с каким-то другим в рамках одного предложения.
  - [new/style/minor] Использование сравнительной степени (Komparativ) делает фразу избыточной и менее естественной в данном контексте, так как оригинал описывает качественное изменение отношения, а не просто сравнение.

#### 🟡 de `/label/screen_3/texts`— вердикт неустойчив

- **RU**: Попробуйте несколько простых упражнений: <h2>«Срывание ярлыков»</h2> Представьте, что люди вокруг ходят с ярлыками на лбу («неудачник», «ленивый», «некрасивая» и т. д.). Каждый раз, когда замечаете такой ярлык у себя в голове, мысленно снимайте его. <h2>«Короб…
- **OLD**: Probieren Sie einige einfache Übungen aus: <h2>„Etiketten ablegen“</h2> Stellen Sie sich vor, die Menschen um Sie herum tragen Etiketten auf der Stirn („Versager“, „faul“, „hässlich“ usw.). Jedes Mal, wenn Sie ein solches Etikett in Ihrem Kopf bemerken, nehmen…
- **NEW**: Probieren Sie diese einfachen Übungen aus: <h2>„Etiketten ablegen“</h2> Stellen Sie sich vor, die Menschen um Sie herum trügen Etiketten auf der Stirn („Versager“, „faul“, „hässlich“ usw.). Jedes Mal, wenn Sie ein solches Etikett in Ihren eigenen Gedanken beme…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Перевод A более точен и не содержит лишних уточнений. Перевод B добавляет в скобках '(oder sich selbst)', чего нет в оригинале, и использует слишком поэтичный Konjunktiv II ('trügen'), который звучит менее естественно в контексте упражнения.
  - [new/addition/minor] Добавлено '(oder sich selbst)', что является интерпретацией, а не точным переводом.
  - [new/style/minor] Использование 'trügen' (Konjunktiv II) звучит излишне литературно/книжно для терапевтического приложения; 'tragen' в A звучит естественнее.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Перевод A звучит более литературно и профессионально за счет использования более изысканной лексики (например, 'trügen' вместо 'tragen' и 'streifen ... ab' вместо 'nehmen ... ab'), что лучше соответствует тону 'понимающего эксперта'.
  - [old/style/minor] Использование 'tragen' и 'nehmen ab' — грамматически верно, но звучит более обыденно и менее элегантно, чем в варианте A.
  - [old/mistranslation/minor] Перевод 'доброжелательности' как 'Empathie' (эмпатия) — это смысловое смещение; в оригинале речь о доброжелательном отношении к себе (Wohlwollen).

#### 🟡 de `/lazy/screen_3/texts`— вердикт неустойчив

- **RU**: Почему мотивация так и не появляется? Часто нам кажется, что без желания мы ничего не сможем сделать. Но действительно ли в жизни всё происходит только из-за мотивации? Всегда ли вы идёте на работу с энтузиазмом? Или иногда — потому что нужно? Когда мы говорим…
- **OLD**: Warum erscheint die Motivation einfach nicht? Oft glauben wir, dass wir ohne Verlangen nichts tun können. Aber geschieht im Leben wirklich alles nur aufgrund von Motivation? Gehen Sie immer mit Begeisterung zur Arbeit? Oder manchmal nur, weil es sein muss? Wen…
- **NEW**: Warum erscheint die Motivation einfach nicht? Oft glauben wir, dass wir ohne Lust nichts tun können. Aber geschieht im Leben wirklich alles nur aufgrund von Motivation? Gehen Sie immer mit Begeisterung zur Arbeit? Oder manchmal nur, weil es notwendig ist? Wenn…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Перевод A звучит более естественно. В контексте мотивации и желания использование 'Lust' (A) гораздо уместнее, чем 'Verlangen' (B), которое имеет более сильный, часто физиологический или страстный оттенок (longing/desire).
  - [old/style/minor] Использование 'Verlangen' вместо 'Lust' звучит слишком поэтично или интенсивно для контекста повседневной мотивации.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 94)
  - Both translations are excellent and follow all stylistic guidelines, including the correct use of 'es fällt schwer' and 'bei einer Depression'. Translation A is slightly better due to the more natural nuance 'verstärken das Leiden nur noch' (only further intensifies), which captures the progressive nature of the original better than B.

#### 🟢 de `/label/test/answers` — NEW лучше (2:0)

- **RU**: Навешивание ярлыков помогает лучше понять мотивы человека Ярлыки могут ограничивать наше восприятие человека Ярлыки часто основаны на сверхобобщениях и предвзятости Навешивание ярлыков может привести к недопониманию и конфликтам
- **OLD**: Etikettierung hilft dabei, die Motive eines Menschen besser zu verstehen Etiketten können unsere Wahrnehmung eines Menschen einschränken Etiketten basieren oft auf Übergeneralisierungen und Vorurteilen Etikettierung kann zu Missverständnissen und Konflikten fü…
- **NEW**: Etikettieren hilft dabei, die Motive eines Menschen besser zu verstehen Etiketten können unsere Wahrnehmung eines Menschen einschränken Etiketten basieren oft auf Übergeneralisierungen und Vorurteilen Etikettieren kann zu Missverständnissen und Konflikten führ…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Перевод A использует более естественное для немецкого языка существительное 'Etikettieren' (герундий/процесс), в то время как 'Etikettierung' в переводе B звучит как тяжеловесный канцелярский термин, характерный для технической маркировки товаров.
  - [old/style/major] Использование 'Etikettierung' вместо 'Etikettieren' создает неестественный, сухой и технический тон, не подходящий для психологического контекста.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Перевод B использует герундий (Etikettieren), что звучит гораздо естественнее для описания процесса в немецком языке. Перевод A использует существительное 'Etikettierung', которое звучит слишком официально и тяжеловесно (канцелярит) в данном контексте.
  - [old/style/minor] Использование номинальной конструкции 'Etikettierung' вместо глагольного существительного делает текст сухим и менее живым.

#### 🟡 de `/lazy/description`— вердикт неустойчив

- **RU**: Эта статья помогает понять, как депрессия влияет на мотивацию и способность действовать. Мы разбираем, почему возникает апатия, как бездействие усиливает симптомы, и почему важно возвращаться к активности шаг за шагом — даже когда нет сил и желания. Вы узнаете…
- **OLD**: Dieser Artikel hilft zu verstehen, wie Depressionen die Motivation und die Handlungsfähigkeit beeinflussen. Wir untersuchen, warum Apathie entsteht, wie Untätigkeit die Symptome verstärkt und warum es wichtig ist, Schritt für Schritt zur Aktivität zurückzukehr…
- **NEW**: Dieser Artikel hilft zu verstehen, wie Depressionen die Motivation und die Handlungsfähigkeit beeinflussen. Wir untersuchen, warum Apathie entsteht, wie Untätigkeit die Symptome verstärkt und warum es wichtig ist, Schritt für Schritt zur Aktivität zurückzukehr…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 97)
  - Перевод B лучше передает эмоциональный нюанс оригинала. Использование 'Lust' вместо 'Antrieb' точнее отражает 'желание', а 'Lebensfreude' звучит более естественно и вдохновляюще в контексте психологии, чем суховатое 'Lebensinteresse'.
  - [old/style/minor] Antrieb — это скорее 'драйв/импульс', в то время как в оригинале 'желание' (Lust). Lebensinteresse звучит слишком академично/отстраненно.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Перевод B точнее передает нюансы оригинала. Использование 'Antrieb' вместо 'Lust' в контексте депрессии звучит более профессионально и клинически уместно, а 'Lebensinteresse' точнее соответствует 'интересу к жизни', чем более эмоциональное 'Lebensfreude'.
  - [new/terminology/minor] Lebensfreude (радость жизни) — слишком сильное и эмоциональное слово по сравнению с оригинальным 'интересом к жизни'; Antrieb (импульс/драйв) в контексте депрессии лучше, чем Lust (желание/хотение).

#### 🟡 de `/label/screen_1/texts`— вердикт неустойчив

- **RU**: Навешивание ярлыков — это когда мы даём себе или другому человеку категоричную, негативную оценку на основании одного события или поступка, без глубокого анализа и учёта контекста. <q author="Уильям Сомерсет Моэм">Люди больше всего на свете любят наклеить на д…
- **OLD**: Etikettierung bedeutet, dass wir uns selbst oder anderen Menschen eine kategorische, negative Bewertung aufgrund eines einzelnen Ereignisses oder einer Handlung geben, ohne den Kontext oder die Tiefe der Situation zu berücksichtigen. <q author="William Somerse…
- **NEW**: Etikettieren bedeutet, sich selbst oder anderen eine kategorische, negative Bewertung auf Basis eines einzelnen Ereignisses oder einer Handlung zu geben, ohne den Kontext tiefgehend zu analysieren. <q author="William Somerset Maugham">„Die Menschen lieben es m…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 85)
  - Перевод A более точен в передаче структуры первого предложения и сохраняет нейтральный, но профессиональный тон. Перевод B допускает стилистическую несогласованность в списках (смешение временных форм) и меняет субъект во втором абзаце (с 'взрослого человека' на 'мы'), что является лишним добавлением.
  - [new/addition/minor] В последнем предложении добавлено 'wir' (мы), хотя в оригинале речь идет об абстрактном 'взрослом человеке'.
  - [new/style/minor] В списке примеров нарушена единообразность: 'Liegt...' (настоящее время) и 'gelegen' (перфект). В варианте A везде используется форма, близкая к инфинитиву/причастию, что звучит как типичные краткие записи.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Перевод A звучит более естественно и профессионально. Перевод B содержит стилистическую ошибку в первом предложении (использование существительного 'Etikettierung' вместо глагольной конструкции) и нарушает грамматическое единообразие в списке примеров.
  - [old/style/minor] «Etikettierung» звучит слишком официально/канцелярски; лучше использовать глагол или конструкцию как в A.
  - [old/style/major] В списке примеров нарушена параллельность: первые два пункта — причастия (Partizip II), а третий — настоящее время (Liegt), что создает плохой ритм.
  - [old/style/minor] «Arbeitsplatz verloren» звучит менее естественно, чем «Den Job verloren».

#### 🟢 de `/label/description` — NEW лучше (2:0)

- **RU**: Статья посвящена привычке навешивать ярлыки и объясняет, как упрощённое восприятие людей и себя мешает видеть реальную многогранность личности. Мы разберём, почему ярлыки ограничивают мышление, усиливают негативные эмоции и портят отношения, а также предложим …
- **OLD**: Dieser Artikel befasst sich mit der Gewohnheit, Menschen (und sich selbst) mit Etiketten zu versehen, und erklärt, wie diese vereinfachte Wahrnehmung uns daran hindert, die wahre Vielschichtigkeit einer Persönlichkeit zu erkennen. Wir untersuchen, warum Etiket…
- **NEW**: Dieser Artikel befasst sich mit der Gewohnheit, Menschen und sich selbst mit Etiketten zu versehen, und erklärt, wie diese vereinfachte Wahrnehmung die wahre Vielschichtigkeit der Persönlichkeit verdeckt. Wir untersuchen, warum Etiketten das Denken einschränke…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Перевод A звучит более естественно и профессионально. Перевод B использует скобки для передачи смысла, что является стилистической ошибкой в качественном тексте (вместо того чтобы органично встроить дополнение в предложение), и использует менее удачную конструкцию 'hindert... zu erkennen'.
  - [old/style/minor] Использование скобок (und sich selbst) выглядит как техническая заметка, а не как часть плавного повествования.
  - [old/style/minor] Конструкция 'hindert uns daran, ... zu erkennen' чуть более громоздкая по сравнению с лаконичным 'verdeckt' в варианте A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Перевод B звучит более естественно и лаконично. Использование скобок в переводе A («(und sich selbst)») — это стилистическая ошибка, которая разрывает поток чтения и выглядит как техническая заметка, а не качественный текст. Перевод B интегрирует это в предложение грамматически правильно.
  - [old/style/minor] Использование скобок для включения 'sich selbst' выглядит неестественно для литературного текста и мешает ритму.

#### 🟢 de `/lazy/screen_1/texts` — NEW лучше (2:0)

- **RU**: Во время депрессии начать что-то делать бывает особенно сложно. Кажется, что мотивация должна появиться первой, но она не приходит. Вы будто впадаете в «зимнюю спячку» и ждёте, что наступит день, когда всё станет легче само собой. Мысли вроде «ничего не принес…
- **OLD**: Während einer Depression kann es besonders schwierig sein, überhaupt etwas zu beginnen. Es fühlt sich an, als müsste die Motivation zuerst da sein, aber sie kommt einfach nicht. Man fühlt sich wie in einem „Winterschlaf“ und wartet darauf, dass der Tag kommt, …
- **NEW**: Während einer Depression kann es besonders schwer fallen, etwas zu beginnen. Es scheint, als müsste die Motivation zuerst da sein, aber sie kommt einfach nicht. Man fühlt sich wie in einem „Winterschlaf“ und wartet darauf, dass ein Tag kommt, an dem alles von …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Перевод B гораздо естественнее с точки зрения немецкой стилистики. Он избегает типичных ошибок перевода, таких как 'es kann schwierig sein' (вместо правильного 'es fällt schwer') и не перегружает текст номинативными конструкциями. Также B лучше соблюдает баланс между эмпатией и профессионализмом.
  - [old/style/minor] Использование 'Es kann besonders schwierig sein' — это калька с английского/русского; носитель скажет 'Es fällt besonders schwer'.
  - [old/style/minor] Фраза 'der Wunsch entsteht' звучит слишком книжно и тяжеловесно для этого контекста.
  - [old/style/minor] В цитате использованы одинарные кавычки внутри тега <q>, что не соответствует правилам типографики, хотя внутри текста стоят правильные лапки.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A лучше справляется с задачей создания эмпатичного, но профессионального текста. Он избегает лишних местоимений и использует более естественные для немецкого языка конструкции (например, 'Es fällt schwer' вместо 'Es ist schwierig'). Перевод B переходит на прямое обращение 'Sie' слишком резко в середине текста, что создает стилистический диссонанс с общим повествованием через 'man'.
  - [old/style/major] Непоследовательное обращение: текст начинается с безличного 'man', но в блоке <important> резко переходит на 'Sie', что звучит неестественно для плавного повествования.
  - [old/style/minor] Использование 'der Wunsch entsteht' является калькой (см. правила анти-кальки №3), в то время как в A использовано более живое 'man hat nur noch den Wunsch'.
  - [old/other/minor] Использование одинарных кавычек в теге <q> вместо типографских немецких „“.

#### 🟢 de `/lazy/screen_4/texts` — NEW лучше (2:0)

- **RU**: Вот пример диалога с психологом о мотивации: <dialog psy="true">Раньше вы регулярно ходили в спортзал, а теперь тяги к этому нет?</dialog> <dialog>Да, я просто не хочу.</dialog> <dialog psy="true">А если представить, что вы пошли в зал без мотивации — просто п…
- **OLD**: Hier ist ein Beispiel für ein Gespräch mit einem Psychologen über Motivation: <dialog psy='true'>Früher sind Sie regelmäßig ins Fitnessstudio gegangen, und jetzt fehlt Ihnen der Antrieb dazu?</dialog> <dialog>Ja, ich habe einfach keine Lust.</dialog> <dialog p…
- **NEW**: Hier ist ein Beispiel für ein Gespräch mit einem Psychologen über Motivation: <dialog psy='true'>Früher sind Sie regelmäßig ins Fitnessstudio gegangen, und jetzt fehlt Ihnen der Antrieb dazu?</dialog> <dialog>Ja, ich habe einfach keine Lust.</dialog> <dialog p…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A гораздо естественнее. В немецком языке для описания отсутствия желания использовать 'Lust' — это стандарт, в то время как 'Verlangen' (в переводе B) звучит слишком интенсивно, почти как страстное вожделение, что неуместно в контексте мотивации к спорту. Также в A лучше передана структура предложения в диалоге.
  - [old/style/major] Использование 'Verlangen' вместо 'Lust' создает неестественный и слишком сильный эмоциональный окрас, не соответствующий контексту (Lust — желание что-то сделать, Verlangen — сильное влечение/жажда).
  - [old/style/minor] Конструкция 'wenn Sie sich vorstellen würden, Sie gingen' избыточна по сравнению с более гладким вариантом в A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Перевод B гораздо лучше справляется с передачей эмоционального контекста. В немецком языке слово 'Verlangen' (используемое в A) звучит слишком интенсивно, почти эротично или как сильное физическое вожделение, что неуместно в контексте мотивации. Перевод B использует 'Lust', что идеально передает русское 'желание/тяга' в разговорном и терапевтическом смысле. Также B звучит более естественно в диалоге.
  - [old/style/major] Использование 'Verlangen' вместо 'Lust' создает неестественный и слишком сильный эмоциональный окрас, не соответствующий оригиналу.

#### 🟢 de `/label/screen_2/texts` — NEW лучше (2:0)

- **RU**: Каждый человек — это сложная, изменчивая и живая система. Наше поведение зависит от возраста, настроения, обстоятельств, фазы жизни и сотен других факторов. <important>Попытка описать человека одним ярлыком — как попытка пересказать целый фильм одним кадром: п…
- **OLD**: Jeder Mensch ist ein komplexes, sich ständig veränderndes und lebendiges System. Unser Verhalten hängt vom Alter, der Stimmung, den Umständen, der Lebensphase und hunderten anderen Faktoren ab. <important>Den Versuch, einen Menschen mit einem einzigen Etikett …
- **NEW**: Jeder Mensch ist ein komplexes, sich veränderndes und lebendiges System. Unser Verhalten hängt vom Alter, der Stimmung, den Umständen, der Lebensphase und Hunderten anderen Faktoren ab. <important>Einen Menschen mit nur einem Etikett zu beschreiben, ist wie de…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Перевод B значительно лучше справляется с грамматическими и стилистическими требованиями. Перевод A содержит грубую ошибку в использовании идиомы (zu den Fakten stehen вместо Fakten wahrnehmen) и нарушает правило номинализации в важном блоке. Перевод B более естественен и правильно использует вежливое обращение 'Sie' в вопросительной части, что соответствует Tone of Voice.
  - [old/style/major] Использование 'zu den Fakten stehen' — это ошибка перевода идиомы (означает 'признавать содеянное', а не 'замечать факты').
  - [old/style/major] Нарушение правила анти-кальки: 'Den Versuch... kann man vergleichen' — тяжеловесная номинализация.
  - [old/style/minor] В предложении 'Was für ein unhöflicher Mensch!' кавычки не соответствуют немецкому стандарту „ “.
  - [new/style/minor] В фразе 'Was für ein Unhöflicher!' слово 'Unhöflicher' написано с большой буквы, что допустимо как существительное, но звучит чуть менее естественно, чем в A, хотя это не ошибка.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Перевод A звучит гораздо естественнее и лучше соответствует заданному Tone of Voice. Перевод B содержит грубую стилистическую ошибку (кальку 'zu den Fakten stehen') и нарушает структуру предложений, превращая призыв к действию в инфинитивную конструкцию.
  - [old/style/major] Использование 'Zu den Fakten zu stehen' — это ошибка. В немецком это означает 'признавать содеянное/стоять на своем', а не 'опираться на факты'. Это прямая калька, нарушающая смысл.
  - [old/style/major] В вопросе 'Was hilft stattdessen?' перевод B использует инфинитив вместо повелительного наклонения или обращения на 'Sie', что звучит обрывисто и неестественно для терапевтического текста.
  - [old/style/minor] В блоке <important> использована тяжеловесная конструкция 'Den Versuch... kann man mit dem Versuch vergleichen', что является классической номинализацией, которую просили избегать.
  - [new/style/minor] В примере с очередью 'Was für ein Unhöflicher!' грамматически допустимо, но 'unhöflicher Mensch' (как в B) звучало бы чуть полнее; однако A выигрывает за счет общего ритма.

#### 🔴 de `/lazy/title` — OLD лучше (2:0)

- **RU**: Пробуждение воли: почему депрессия порождает апатию
- **OLD**: Das Erwachen des Willens: Warum Depressionen Apathie erzeugen
- **NEW**: Die Willenskraft wecken: Warum Depressionen Apathie erzeugen
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 75)
  - Перевод B звучит как естественный заголовок книги или статьи. Перевод A использует глагол 'wecken', что превращает заголовок в инструкцию ('Пробудите волю'), тогда как оригинал — это философское/психологическое название процесса.
  - [new/style/major] Использование инфинитива 'wecken' меняет смысл с существительного (процесс пробуждения) на императив/инструкцию (пробуждение как действие), что не соответствует стилистике заголовка.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Перевод A точно передает метафоричный и философский подтекст заголовка («Пробуждение воли»), сохраняя структуру оригинала. Перевод B меняет существительное на глагол («пробуждать волю»), что превращает заголовок из названия темы в призыв к действию, искажая смысл.
  - [new/style/minor] Смена регистра с описательного заголовка на императив/инфинитив (Die Willenskraft wecken) не соответствует оригиналу.

#### 🟢 de `/lazy/screen_2/texts` — NEW лучше (2:0)

- **RU**: Бездействие — удивительный парадокс человеческой природы. <important>Вы наверняка замечали: одни люди стремятся жить активно, пробовать новое, двигаться вперёд. Другие — будто держат дистанцию от жизни, будто наблюдают со стороны.</important> Интересный факт: …
- **OLD**: Untätigkeit ist ein erstaunliches Paradoxon der menschlichen Natur. <important>Sie haben sicher schon bemerkt: Manche Menschen streben danach, aktiv zu leben, Neues auszuprobieren und voranzukommen. Andere halten scheinbar Distanz zum Leben, als würden sie nur…
- **NEW**: Untätigkeit ist ein erstaunliches Paradoxon der menschlichen Natur. <important>Sicherlich haben Sie schon bemerkt: Manche Menschen streben danach, aktiv zu leben, Neues auszuprobieren und voranzukommen. Andere halten scheinbar Distanz zum Leben, als würden sie…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 96)
  - Перевод A более грамматически совершенен. В переводе B во втором абзаце после точки следует придаточное предложение 'Als würden Sie...', которое является синтаксической ошибкой (fragment) в немецком языке; перевод A правильно связывает это через 'Es ist, als würde man...'. Также в A лучше соблюден баланс между личным и обобщенным обращением.
  - [old/style/major] Синтаксическая ошибка: 'Als würden Sie...' не может стоять как отдельное предложение после точки, это требует связи с главной частью (как в варианте A).
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 97)
  - Перевод B звучит более естественно и литературно. В частности, использование безличного 'man' во фразе 'als würde man sich selbst...' лучше передает философский тон оригинала, чем прямое обращение 'Sie' в переводе A, которое звучит излишне резко в данном контексте.
  - [old/style/minor] Использование 'Als würden Sie sich selbst...' создает слишком резкий акцент на пользователе там, где в оригинале идет описание процесса (метафора).

