# QA: слепое парное сравнение переводов — pm-love-fixed

- **Дата**: 2026-09-12T05:42:34.489Z
- **Метка**: pm-love-fixed
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/love.json
- **Локали**: de
- **Сэмпл/файл**: 12
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: fa37b767b927826188242ca19138d726a05af992

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/love.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 10 | 🟢 5 | 🔴 1 | ⚪ 0 | 🟡 4 | 0 / 1 | 83% |
| **итого** | 10 | 🟢 5 | 🔴 1 | ⚪ 0 | 🟡 4 | 0 / 1 | 83% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×9, style/major×3, terminology/minor×1, other/minor×1; OLD — style/major×6, style/minor×5, other/major×2, mistranslation/critical×1

### Детали пар (для спот-чека)

#### 🔴 de `/title` — OLD лучше (2:0)

- **RU**: Зависимость от любви
- **OLD**: Liebesabhängigkeit
- **NEW**: Abhängigkeit von der Liebe
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Перевод A представляет собой естественное, емкое и стилистически верное немецкое существительное, идеально подходящее для заголовка. Перевод B звучит более тяжеловесно и описательно, что менее характерно для лаконичных названий тем или разделов.
  - [new/style/minor] Излишне длинная конструкция для заголовка, звучит менее естественно, чем компактное составное существительное.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Перевод B представляет собой естественное немецкое сложное существительное, которое идеально подходит для заголовка. Перевод A грамматически верен, но звучит более громоздко и описательно, как калька с русского.
  - [new/style/minor] звучит менее естественно для заголовка, чем компактное составное слово

#### 🟢 de `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Отношения и любовь могут принести немало радости и счастья в жизнь, но они не являются единственным путем. Счастье — это сложный и многогранный процесс, и каждый имеет право выбирать свои собственные методы и пути для его достижения. Поэтому, если в данный мом…
- **OLD**: Beziehungen und Liebe können viel Freude und Glück in unser Leben bringen, aber sie sind nicht der einzige Weg. Glück ist ein komplexer und facettenreicher Prozess, und jeder hat das Recht, seine eigenen Methoden und Wege zu wählen, um es zu erreichen. Wenn Ih…
- **NEW**: Beziehungen und Liebe können viel Freude und Glück in das Leben bringen, aber sie sind nicht der einzige Weg. Glück ist ein komplexer und vielschichtiger Prozess, und jeder hat das Recht, seine eigenen Wege zu finden, um es zu erleben. Wenn Ihr Leben im Moment…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Перевод B звучит гораздо естественнее и профессиональнее. Он избегает тяжеловесных конструкций (например, 'erfordert es viel Anstrengung' в A — это калька) и использует более живой, подходящий для психотерапевтического контекста язык. Также в B соблюдены правила типографики для цитаты.
  - [old/style/major] Использование 'du' в цитате при использовании 'Sie' в основном тексте создает стилистический диссонанс; конструкция 'erfordert es viel Anstrengung' — типичная калька.
  - [old/other/major] Использованы прямые кавычки вместо немецких типографских „ “.
  - [new/style/minor] В предложении про котиков немного упрощена структура оригинала, но это идет на пользу гладкости текста.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Translation A is much more natural and follows the professional 'Sie' tone consistently. Translation B suffers from several issues: it switches to 'du' in the quote (breaking the established register), uses clunky phrasing like 'erfordert es viel Anstrengung' (nominalization/syntax error), and has a weak translation for the final idiom.
  - [old/style/major] Switch from 'Sie' to 'du' in the quote is inconsistent and unprofessional for this context.
  - [old/style/major] The phrase 'sozialer Status ist nicht immer das, was er zu sein scheint' is a weak, literal translation of the idea, whereas A's 'ist kein Garant für Glück' is much more idiomatic.
  - [old/style/minor] The translation of 'котик и кошечка' as 'Kätzchen und Kater' is okay, but A's approach to the flow is smoother.
  - [old/style/minor] The sentence 'Um Ihre Überzeugungen zu verändern, erfordert es viel Anstrengung' is a heavy, slightly unidiomatic construction compared to A.

#### 🟢 de `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Любовь — это великолепное чувство, воспетое поэтами, художниками и музыкантами. Она окрыляет, вдохновляет и дарит ощущение полноты жизни. Естественно, каждый из нас стремится к тому, чтобы любить и быть любимым. Однако, если ваше представление о любви сводится…
- **OLD**: Liebe ist ein großartiges Gefühl, das von Poeten, Künstler und Musiker gefeiert wird. Sie beflügelt, inspiriert und vermittelt das Gefühl von Lebensfülle. Natürlich strebt jeder Mensch danach, zu lieben und geliebt zu werden. Wenn sich Ihr Liebesverständnis je…
- **NEW**: Liebe ist ein wundervolles Gefühl, das schon seit jeher von Dichtern, Künstlern und Musikern besungen wird. Sie verleiht Flügel, inspiriert und schenkt das Gefühl, das Leben in seiner Fülle zu erleben. Es ist nur natürlich, dass jeder von uns danach strebt, zu…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Translation A is much more natural, flows well, and maintains a consistent, empathetic tone. Translation B suffers from grammatical errors, awkward phrasing, and a messy ending.
  - [old/style/major] The text ends with a repetitive, broken sentence structure that looks like a failed merge of two versions.
  - [old/other/major] In the first paragraph, 'Künstler und Musiker' should be plural 'Künstler und Musiker' (declension error after 'von').
  - [old/style/major] The sentence 'Wenn Liebe zur pathologischen Notwendigkeit wird...' is a fragment (subordinate clause without a main clause).
  - [old/style/minor] The use of gender-star 'Partner*in' is modern but breaks the flow of the emotional narrative compared to A's smoother approach.
  - [new/style/minor] The phrase 'das Leben in seiner Fülle zu erleben' is slightly wordy but very natural for the genre.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 96)
  - Перевод B звучит гораздо более естественно и профессионально. Перевод A содержит грубые грамматические ошибки в окончаниях существительных и дублирует последний абзац, что является критическим браком. Перевод B идеально выдерживает тон 'понимающего эксперта' и использует правильную терминологию (Glaubenssatz).
  - [old/other/critical] Грубые ошибки в склонении: 'von Poeten, Künstler und Musiker' вместо 'Künstlern und Musikern'.
  - [old/addition/major] В конце текста дважды повторен и перефразирован один и тот же абзац про Викторию.
  - [old/style/minor] Использование гендерно-нейтрального 'Partner*in' в данном художественно-терапевтическом контексте выглядит излишне технически и выбивается из плавного ритма текста.
  - [new/style/minor] В предложении про Викторию можно было бы чуть более элегантно связать два предложения, но это не влияет на качество.

#### 🟡 de `/screen_2/texts`— вердикт неустойчив

- **RU**: В процессе анализа своих убеждений Виктория выписала недостатки и преимущества своего мышления. Недостатки звучали так: <li>Убеждение вгоняет меня в уныние, потому что я одна.</li> <li>Я теряю желание что-либо делать, изучать мир или заниматься хобби.</li> <li…
- **OLD**: Bei der Analyse ihrer Überzeugungen notierte Viktoria Nachteile und vermeintliche Vorteile ihres Denkens. Die Nachteile lauteten so: <li>Die Überzeugung stürzt mich in Niedergeschlagenheit, weil ich allein bin.</li> <li>Ich verliere die Lust, etwas zu tun, die…
- **NEW**: Im Zuge einer Analyse ihrer Überzeugungen hat Victoria die Vor- und Nachteile ihrer Denkweise aufgelistet. Die Nachteile lauteten wie folgt: <li>Dieser Glaube zieht mich runter, weil ich allein bin.</li> <li>Ich verliere die Lust, etwas zu unternehmen, die Wel…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Translation A is much more natural and stylistically sophisticated. It avoids the clunky, literal structures found in B and uses better psychological terminology (e.g., 'Bedürftigkeit' instead of a literal translation of 'need'). A also correctly handles the quote's typography.
  - [new/style/major] The text sounds like a translation. Phrases like 'Dieser Glaube zieht mich runter' are too colloquial/weak for this context, and 'Wahre Glückseligkeit liegt darin...' is a bit heavy.
  - [new/terminology/minor] Uses 'Glaube' where 'Überzeugung' or 'Glaubenssatz' would be more professional in a CBT context.
  - [new/other/minor] Used straight quotes in the Seneca quote instead of German low-high quotes.
  - [new/style/minor] The sentence 'was jedoch nicht dazu geführt hat, dass sie die gewünschten Partner anzieht' is grammatically awkward/clunky.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Перевод A гораздо точнее следует оригиналу и соблюдает правила работы с цитатами. Перевод B допускает серьезную ошибку, используя гендерно-нейтральные конструкции (Partner*in) там, где в оригинале речь идет о конкретном примере Виктории, а также слишком сильно сокращает предложения, теряя эмоциональную глубину и связность текста.
  - [old/style/major] Использование Gendersternchen (Partner*in) в контексте личного примера персонажа выглядит неестественно и избыточно.
  - [old/omission/minor] Сильное сокращение предложений в последнем абзаце делает текст рваным и менее эмпатичным.
  - [old/style/minor] Фраза 'Wer seine Bedürftigkeit nach außen trägt' — это вольная интерпретация, которая немного уходит от смысла оригинала.

#### 🟡 de `/screen_3/texts`— вердикт неустойчив

- **RU**: Очень важно научиться регулировать собственное настроение и находить счастье в самом себе. Это даст вам возможность почувствовать себя в равной степени живым и когда вы один, и когда вы вместе с любимым человеком. Но вы можете подумать: «Звучит конечно хорошо,…
- **OLD**: Es ist entscheidend, die eigene Stimmung regulieren zu lernen und das Glück in sich selbst zu finden. Dann fühlen Sie sich sowohl allein als auch mit Partner*in gleichermaßen lebendig. Vielleicht denken Sie: „Klingt gut, ist aber unrealistisch. Alleinsein heiß…
- **NEW**: Es ist sehr wichtig zu lernen, die eigene Stimmung selbst zu regulieren und das Glück in sich selbst zu finden. Das ermöglicht es Ihnen, sich lebendig zu fühlen – egal, ob Sie allein sind oder Zeit mit einem geliebten Menschen verbringen. Aber vielleicht denke…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is much more natural and sophisticated. It avoids the heavy, clunky sentence structures and 'translationese' present in B. A uses elegant phrasing (e.g., 'Die Zahl der Genüsse' vs B's 'Die Möglichkeiten, in der Einsamkeit Freude zu finden') and correctly handles the quote's typography.
  - [new/style/major] Contains several 'translationese' constructions (e.g., 'Allein zu sein bedeutet, ein emotionaler Versager zu sein' is very heavy; 'in der Einsamkeit' carries a negative connotation of loneliness, whereas the original is about being alone/solitude).
  - [new/style/minor] The quote uses standard quotes instead of the required German typographic quotes „ “.
  - [new/style/minor] The phrasing 'wie sieht Ihre persönliche Liste an Freuden aus' is slightly clunky compared to A's 'Wie sähe Ihre persönliche Genussliste aus'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Перевод A звучит гораздо более естественно и эмпатично, соблюдая баланс между экспертностью и дружелюбием. Перевод B страдает от излишней лаконичности, которая превращает текст в сухой список, и содержит стилистические ошибки (например, 'emotional zu versagen' вместо 'emotionaler Versager').
  - [old/style/major] Конструкция 'Alleinsein heißt emotional zu versagen' звучит крайне неестественно; в немецком это звучит как 'одиночество означает потерпеть эмоционавое фиаско', а не как описание человека (emotionaler Versager).
  - [old/style/major] Использование 'beim + Gerundium' (beim Hören, beim Tanzen...) делает текст тяжелым и похожим на инструкцию или перечисление в медицинском протоколе, теряя живой ритм оригинала.
  - [old/style/minor] Использование гендерно-нейтрального 'Partner*in' в данном контексте выглядит избыточным и немного выбивается из общего тона, хотя и допустимо в современной Германии.
  - [new/style/minor] В цитате Уайльда использованы двойные кавычки внутри тега <q>, что технически может быть лишним, если система сама управляет кавычками, но с точки зрения языка это верно.

#### 🟢 de `/exercise/screen_3/texts` — NEW лучше (2:0)

- **RU**: <h2>Корректировка убеждений</h2> Любовь, отношения и брак не являются необходимым условием счастья и повышения самооценки, иногда их попросту недостаточно. Доказательство тому — миллионы мужчин и женщин, которые состоят в браке и при этом несчастны. Если бы лю…
- **OLD**: <h2>Korrektur von Überzeugungen</h2> Liebe, Beziehungen und Ehe sind keine Voraussetzung für Glück und Selbstwertsteigerung, manchmal sind sie einfach nicht genug. Der Beweis dafür sind Millionen von Männern und Frauen, die verheiratet sind und dennoch unglück…
- **NEW**: <h2>Überzeugungen hinterfragen</h2> Liebe, Beziehungen und die Ehe sind keine Voraussetzung für Glück oder ein gesundes Selbstwertgefühl; manchmal reichen sie schlichtweg nicht aus. Ein Beweis dafür sind Millionen von Menschen, die verheiratet, aber dennoch un…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B звучит гораздо более естественно и профессионально. Он избегает калькирования структуры русского языка и использует более богатый, характерный для немецкой психотерапевтической литературы лексикон (например, 'minderwertig' вместо 'unvollständig' в контексте самооценки, и 'Verbundenheit' вместо простого 'Beziehungen').
  - [old/style/minor] Текст местами звучит суховато и слишком близко к структуре оригинала (например, 'Korrektur von Überzeugungen' — звучит как технический процесс, а не терапевтическая работа).
  - [old/style/minor] Фраза 'macht mich nicht schwach oder abhängig' грамматически верна, но в B вариант 'macht mich schwach oder abhängig' звучит более гладко в контексте противопоставления.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A звучит гораздо более естественно и профессионально. Он избегает калькирования структуры русского предложения и использует более богатый, подходящий для терапевтического контекста лексикон. Перевод B местами звучит тяжеловесно и содержит грамматические шероховатости (например, пропуск глагола в одном из предложений и не совсем удачные конструкции).
  - [old/style/major] В предложении 'Der Beweis dafür sind Millionen von Männern und Frauen, die verheiratet sind und dennoch unglücklich' пропущен глагол (должно быть 'unglücklich sind').
  - [old/style/minor] Конструкция 'Korrektur von Überzeugungen' звучит слишком технически/сухо по сравнению с более естественным 'Überzeugungen hinterfragen'.
  - [old/style/minor] Фраза 'warum wir hier sind' (почему мы здесь) — это калька с английского/русского, в немецком в таком контексте лучше звучит 'was unser Sinn im Leben ist'.
  - [old/style/minor] Использование 'unvollständig' для 'неполноценный' допустимо, но 'minderwertig' (как в A) в контексте КПТ и самооценки является более точным термином.

#### 🟢 de `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Лист предполагаемого удовольствия</h2> Счастье можно находить каждый день в малых радостях, в собственном развитии, в дружбе и множестве других аспектов жизни. Но скорее всего, вы так не думаете и уверены, что не можете быть счастливым без другого человека…
- **OLD**: <h2>Liste der vermuteten Freude</h2> Glück lässt sich jeden Tag in kleinen Freuden finden, in persönlicher Entwicklung, in Freundschaften und vielen anderen Lebensbereichen. Aber wahrscheinlich denken Sie nicht so und sind überzeugt, dass Sie ohne eine andere …
- **NEW**: <h2>Liste der erwarteten Freude</h2> Glück kann man jeden Tag in kleinen Momenten finden: in der eigenen Entwicklung, in Freundschaften und in vielen anderen Aspekten des Lebens. Wahrscheinlich denken Sie jedoch nicht so und sind davon überzeugt, dass Sie ohne…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 96)
  - Translation A is a high-quality, professional text that sounds natural to a native speaker and adheres to all stylistic guidelines. Translation B contains a critical grammatical error in the quote and uses awkward, non-native phrasing throughout.
  - [old/mistranslation/critical] The quote 'Niemand kann dich ohne dein Einverständnis fühlen lassen, dass du unvollständig bist' is grammatically incorrect and sounds like a machine translation. It should be 'Niemand kann Ihnen das Gefühl geben...'
  - [old/style/major] The text switches from 'Sie' (implied) to 'dich' in the quote, breaking the consistency of the formal address required for the target market.
  - [old/style/major] Phrases like 'auf ihre Realität zu überprüfen' are heavy calques from Russian/English; 'auf den Prüfstand stellen' (used in A) is much more idiomatic.
  - [old/style/minor] The sentence structure in the fourth column instruction is clunky and lacks the flow of a professional guide.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 94)
  - Перевод B звучит гораздо естественнее и профессиональнее. Перевод A содержит грубую стилистическую ошибку в цитате Рузвельт (неправильное использование глагола 'fühlen lassen') и звучит как калька. Перевод B использует правильную терминологию ('auf den Prüfstand stellen') и соблюдает вежливую форму 'Sie' во всем тексте, в то время как A срывается на 'dich' в цитате, что нарушает единообразие.
  - [old/style/critical] Конструкция 'Niemand kann dich... fühlen lassen' — это грамматически неверная калька. В немецком нельзя сказать 'jemanden fühlen lassen, dass...'. Правильно: 'jemandem das Gefühl geben, dass...'.
  - [old/style/major] Переход с вежливого 'Sie' на 'dich' в цитате нарушает общую тональность и правила обращения.
  - [old/style/minor] Фраза 'Um diese Überzeugung auf ihre Realität zu überprüfen' звучит тяжеловесно и неестественно.
  - [new/style/minor] В списке <li> в некоторых пунктах отсутствуют точки в конце, что допустимо, но требует единообразия (хотя в оригинале их тоже нет).

#### 🟡 de `/description`— вердикт неустойчив

- **RU**: Любовь, воспетая поэтами и художниками, окрыляет и дарит ощущение полноты жизни. Однако превращение любви в патологическую потребность разрушает личность и мешает строить здоровые отношения, особенно у людей с низкой самооценкой. Настоящее счастье и полноценно…
- **OLD**: Liebe, von Dichter und Künstler besungen, beflügelt und lässt das Leben erfüllter erscheinen. Wird sie jedoch zur pathologischen Bedürftigkeit, zerstört sie die Persönlichkeit und verhindert gesunde Beziehungen – besonders bei Menschen mit geringem Selbstwert.…
- **NEW**: Liebe, wie sie von Dichtern und Künstlern besungen wird, verleiht Flügel und schenkt das Gefühl, das Leben in seiner Fülle zu genießen. Wenn Liebe jedoch zu einem zwanghaften Bedürfnis wird, kann dies die Persönlichkeit schwächen und es erschweren, gesunde Bez…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Перевод A звучит гораздо более литературно, лаконично и естественно для немецкого языка. Перевод B перегружен тяжеловесными конструкциями и кальками (например, 'verleiht Flügel' вместо 'beflügelt' или 'unabhängig von einem Partner existieren'), что делает его менее приятным для чтения.
  - [new/style/major] Избыточность и тяжеловесность синтаксиса (Nominalstil/Schachtelsätze), что делает текст менее эмпатичным и более сухим.
  - [new/style/minor] Фраза 'unabhängig von einem Partner existieren' звучит неестественно в контексте удовольствий; лучше использовать 'unabhängig von einer Partnerschaft'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Перевод A звучит гораздо более естественно и литературно, соблюдая баланс между эмпатией и качественной прозой. Перевод B содержит грамматические ошибки и стилистические огрехи, которые делают его менее профессиональным.
  - [old/style/major] Грамматическая ошибка в начале: 'von Dichter und Künstler' вместо 'von Dichtern und Künstlern' (нужен дательный падеж множественного числа).
  - [old/style/minor] Фраза 'lässt das Leben erfüllter erscheinen' (заставляет жизнь казаться более наполненной) — это смысловое ослабление оригинала 'дарит ощущение полноты жизни'.
  - [old/style/minor] Использование 'Selbstwert' вместо 'Selbstwertgefühl' допустимо, но в данном контексте звучит суховато.

#### 🟡 de `/exercise/description`— вердикт неустойчив

- **RU**: Статья посвящена исследованию счастья и убеждений, связанных с любовью и отношениями. В ней объясняется, что счастье можно достигать разными способами, и предлагаются техники для изменения негативных убеждений, связанных с одиночеством. Статья учит видеть радо…
- **OLD**: Der Beitrag untersucht das Thema Glück und die Überzeugungen rund um Liebe und Beziehungen. Es wird erklärt, dass Glück auf verschiedene Arten erreicht werden kann, und es werden Techniken vorgeschlagen, um negative Überzeugungen über Einsamkeit zu verändern. …
- **NEW**: Dieser Artikel befasst sich mit der Erforschung von Glück und den Überzeugungen, die mit Liebe und Beziehungen verbunden sind. Er erklärt, dass Glück auf vielfältige Weise erreicht werden kann, und bietet Techniken an, um negative Überzeugungen im Zusammenhang…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Перевод A звучит более естественно и профессионально. Перевод B страдает от тяжеловесных конструкций (Nominalstil), характерных для кальки с русского, например, 'befasst sich mit der Erforschung von', что звучит избыточно.
  - [new/style/minor] Конструкция 'befasst sich mit der Erforschung von' слишком тяжеловесна и академична для данного контекста; лучше использовать глагол 'untersucht'.
  - [new/style/minor] Использование 'Alleinsein' вместо 'Einsamkeit' меняет оттенок: 'Alleinsein' — это состояние одиночества (быть одному), а 'Einsamkeit' — это чувство одиночества (психологический аспект), что ближе к оригиналу.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Перевод A звучит более естественно и профессионально, избегая избыточного использования безличных конструкций (es wird...), которые характерны для тяжелого стиля. Перевод B страдает от повторения 'es wird' и менее удачного подбора слов (Einsamkeit вместо Alleinsein в данном контексте).
  - [old/style/minor] Избыточное использование пассивных безличных конструкций 'Es wird erklärt' и 'es werden vorgeschlagen' делает текст сухим и академичным.
  - [old/style/minor] Использование 'Einsamkeit' (одиночество как чувство/страдание) вместо 'Alleinsein' (состояние одиночества) немного меняет эмоциональный оттенок оригинала.

#### 🟢 de `/exercise/title` — NEW лучше (2:0)

- **RU**: Как избавиться от любовной зависимости?
- **OLD**: Wie befreie ich mich von Liebesabhängigkeit?
- **NEW**: Wie kann man eine Liebesabhängigkeit überwinden?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Перевод B звучит гораздо естественнее и профессиональнее. Перевод A содержит грамматическую неточность (отсутствие артикля перед Liebesabhängigkeit) и звучит как калька с русского.
  - [old/style/major] Отсутствует артикль перед существительным 'Liebesabhängigkeit', что делает фразу грамматически незавершенной. Также глагол 'befreien' в данном контексте звучит менее естественно, чем 'überwinden'.
  - [old/style/minor] Использование первого лица 'ich' в заголовке делает его слишком узким, в то время как оригинал задает общий вопрос.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Перевод A звучит более естественно и профессионально для заголовка статьи или раздела. Перевод B использует форму 'ich', что делает заголовок слишком личным и менее подходящим для общего вопроса, а также звучит немного тяжеловесно.
  - [old/style/minor] Использование первого лица (ich) в общем вопросе делает тон менее экспертным и более разговорным, чем того требует контекст темы.

