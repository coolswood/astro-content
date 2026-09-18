# QA: слепое парное сравнение переводов — en-final-g67-hopeless

- **Дата**: 2026-09-18T21:26:52.117Z
- **Метка**: en-final-g67-hopeless
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: tests/hopeless.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/hopeless.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 9 | 🔴 5 | ⚪ 0 | 🟡 6 | 0 / 1 | 64% |
| **итого** | 20 | 🟢 9 | 🔴 5 | ⚪ 0 | 🟡 6 | 0 / 1 | 64% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×7, style/major×2; OLD — style/minor×9, addition/minor×3, omission/minor×2, terminology/minor×2, omission/major×1, mistranslation/critical×1

### Детали пар (для спот-чека)

#### 🟡 en `/steps_description/10/fact`— вердикт неустойчив

- **RU**: Люди с высокой психологической резильентностью (способностью восстанавливаться после трудностей) менее склонны к негативному предвосхищению. Они могут видеть как неприятные, так и приятные аспекты будущего, и лучше справляются с вызовами.
- **OLD**: People with high psychological resilience are less prone to expecting the worst. They are better able to see both the difficulties and the opportunities ahead and cope more effectively with challenges.
- **NEW**: People with high psychological resilience (the ability to bounce back from hardship) are less prone to negative anticipation. They can see both the unpleasant and pleasant aspects of the future and handle challenges more effectively.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original structure, including the parenthetical definition which is important for psychoeducation. Translation B is smoother but omits the definition and slightly alters the meaning of 'pleasant aspects' to 'opportunities'.
  - [old/omission/minor] The parenthetical explanation of resilience is missing.
  - [old/style/minor] The phrase 'expecting the worst' is a good idiomatic choice for 'negative anticipation', but 'pleasant aspects' vs 'opportunities' changes the nuance slightly.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 78)
  - Translation A is much more natural and idiomatic for an English reader. It avoids the clunky, literal translation of 'negative anticipation' and the heavy parenthetical explanation, opting instead for a smooth, professional flow that captures the essence of the original without sounding like a translation.
  - [new/style/major] The parenthetical explanation is heavy and feels like a dictionary entry rather than natural prose.
  - [new/style/major] 'Negative anticipation' is a literal translation of the Russian term and sounds unnatural in English; 'expecting the worst' (as in A) is the idiomatic equivalent.
  - [new/style/minor] 'Unpleasant and pleasant aspects' is grammatically correct but sounds slightly stiff compared to more dynamic phrasing.

#### 🟡 en `/steps_description/13/fact`— вердикт неустойчив

- **RU**: Великий изобретатель Томас Эдисон пережил множество неудач на пути к созданию электрической лампочки. Он говорил: "Я не терпел неудачу. Я просто нашел 10 000 способов, которые не работают." Его упорство и вера в успех помогли ему преодолеть трудности и добитьс…
- **OLD**: Inventor Thomas Edison went through countless failed attempts before creating a practical light bulb. He famously said, “I have not failed. I’ve just found 10,000 ways that won’t work.” His perseverance and belief in eventual success helped him achieve groundb…
- **NEW**: Great inventor Thomas Edison faced many failures on his path to creating the light bulb. He once said, “I have not failed. I’ve just found 10,000 ways that won’t work.” His persistence and belief in success helped him overcome obstacles and achieve greatness.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is a more faithful and natural rendering of the original text. Translation B introduces unnecessary additions ('practical', 'eventual', 'groundbreaking') that, while making sense, deviate from the source's structure.
  - [old/addition/minor] Added 'practical' to light bulb, 'eventual' to success, and 'groundbreaking' to results, which were not in the original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and sophisticated, using idiomatic expressions like 'groundbreaking results' and 'went through countless failed attempts' instead of the clunky, literal phrasing in B. It captures the inspirational tone of the original without sounding like a direct translation.
  - [new/style/major] The phrasing 'Great inventor... faced many failures on his path to...' is a heavy calque from Russian and sounds unnatural in English.
  - [new/style/minor] The ending 'achieve greatness' is a bit cliché and less precise than the more professional 'achieve groundbreaking results' or 'great achievements'.

#### 🔴 en `/steps_description/14/fact` — OLD лучше (2:0)

- **RU**: Исследование, проведенное в Гарвардском университете, показало, что оптимисты живут в среднем на 11-15% дольше, чем пессимисты. Это связано с тем, что оптимисты лучше справляются со стрессом и ведут более здоровый образ жизни.
- **OLD**: A Harvard study found that optimists live on average 11–15% longer than pessimists. This is partly because optimists cope better with stress and are more likely to maintain healthy habits.
- **NEW**: A study conducted at Harvard University showed that optimists live, on average, 11–15% longer than pessimists. This is because optimists tend to manage stress better and maintain healthier lifestyles.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more idiomatic and concise, using 'A Harvard study' instead of the wordier 'A study conducted at Harvard University'. It also uses 'maintain healthy habits', which sounds more natural in a mental health context than 'maintain healthier lifestyles'.
  - [new/style/minor] The phrasing 'A study conducted at Harvard University showed that...' is slightly more academic and heavy (clunky) than the more direct 'A Harvard study found that...'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds more natural and idiomatic for a science-based article. 'A Harvard study found' is a much more common and smoother way to start than 'A study conducted at Harvard University showed'.
  - [new/style/minor] The phrasing 'A study conducted at... showed' is slightly wordy and academic compared to the more direct 'A Harvard study found'.

#### 🟢 en `/steps_description/6/text` — NEW лучше (2:0)

- **RU**: Психологи отмечают, что негативное мышление может быть как причиной, так и следствием депрессии. Люди с хроническим пессимизмом часто видят будущее в мрачных тонах, что может усугублять их психическое состояние.
- **OLD**: Psychologists note that negative thinking can be both a cause and a consequence of depression. People with chronic pessimism tend to see the future in dark colours, which can further worsen their mental state.
- **NEW**: Psychologists note that negative thinking can be both a cause and a consequence of depression. People with chronic pessimism often view the future through a dark lens, which can worsen their mental state.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B uses the idiomatic 'through a dark lens', which sounds much more natural for a native speaker than the literal 'in dark colours' used in A. B also flows better rhythmically.
  - [old/style/minor] The phrase 'in dark colours' is a bit of a literal translation (calque) from Russian; 'through a dark lens' or 'in a dark light' is more idiomatic in English.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses the idiomatic 'view the future through a dark lens', which sounds natural and sophisticated for a mental health article. Translation B uses 'in dark colours', which is a literal calque from Russian and sounds unnatural in English.
  - [old/style/major] The phrase 'see the future in dark colours' is a literal translation of the Russian metaphor and is not an idiomatic expression in English; 'through a dark lens' or 'in a dark light' would be preferred.

#### 🟢 en `/steps_description/11/fact` — NEW лучше (2:0)

- **RU**: Великий баскетболист Майкл Джордан в начале своей карьеры не прошел отбор в школьную баскетбольную команду. Однако он не потерял веры в себя и продолжил тренироваться, что в итоге привело его к статусу одного из величайших спортсменов всех времен. Его настойчи…
- **OLD**: Basketball legend Michael Jordan did not make his high-school basketball team on his first attempt. Instead of giving up, he kept training and improving his skills. His persistence and belief in himself eventually made him one of the greatest athletes of all t…
- **NEW**: Legendary basketball player Michael Jordan was famously cut from his high school basketball team. However, he never lost faith in himself and kept practicing, which eventually led him to become one of the greatest athletes of all time. His persistence and conf…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more idiomatic and captures the narrative flow of a story. Translation A feels slightly fragmented and loses the final sentence of the original.
  - [old/omission/major] The entire final sentence of the original ('His persistence and confidence...') is missing.
  - [old/style/minor] The phrasing 'did not make his... team on his first attempt' is a bit wordy compared to the more natural 'was cut from' in B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more fluid, idiomatic, and stays closer to the original structure without losing the narrative flow. Translation B omits the final sentence of the original entirely.
  - [old/omission/major] The entire final sentence about his persistence and confidence helping him achieve his goals is missing.

#### 🟢 en `/range/positive` — NEW лучше (2:0)

- **RU**: Позитивный взгляд в будущее
- **OLD**: Positive view of the future
- **NEW**: A positive outlook on the future
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B uses the idiomatic collocation 'positive outlook on the future', which sounds much more natural to a native speaker than the literal 'view of the future'.
  - [old/style/minor] Sounds slightly literal/translated; 'outlook' is the preferred term for this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A uses the idiomatic 'outlook on the future', which is the standard way a native speaker would express this concept. Translation B is grammatically correct but sounds slightly more literal and less natural for a title or heading.
  - [old/style/minor] 'View of the future' is less idiomatic than 'outlook on the future' in this context.

#### 🟡 en `/steps_description/15/text`— вердикт неустойчив

- **RU**: Психологи выделяют два типа локуса контроля – внутренний и внешний. Люди с внутренним локусом контроля верят, что они могут влиять на свою жизнь и достижения, тогда как те, у кого внешний локус контроля, считают, что их успехи и неудачи зависят от внешних обст…
- **OLD**: Psychologists distinguish between an internal and an external locus of control. People with an internal locus of control believe they can influence their life and achievements, whereas those with an external locus of control attribute success and failure mainl…
- **NEW**: Psychologists distinguish between two types of locus of control: internal and external. People with an internal locus of control believe they can influence their lives and achievements, while those with an external locus believe their successes and failures de…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original structure and meaning, whereas Translation B introduces an unrequested nuance ('mainly') and simplifies the ending, losing the specific mention of 'abilities and opportunities'.
  - [old/addition/minor] added 'mainly' which wasn't in the original
  - [old/omission/minor] omitted 'abilities and opportunities' (силах и возможностях), replacing it with a generic 'capable'
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows better as a professional psychological text. Translation B contains a slight grammatical awkwardness in the first sentence and a less natural phrasing in the final sentence.
  - [new/style/minor] The phrase 'two types of locus of control: internal and external' is grammatically acceptable but slightly clunky compared to the more elegant 'distinguish between an internal and an external locus of control'.
  - [new/style/minor] 'feel more confident in their own abilities' is a bit wordy compared to the punchy and natural 'feel more confident and capable'.

#### 🟢 en `/steps_description/5/text` — NEW лучше (2:0)

- **RU**: Ожидание успеха и вера в свои способности являются важными компонентами психологической устойчивости и достижения целей. Психологи называют это "самоэффективностью". Люди с высокой самоэффективностью склонны верить в то, что они могут контролировать свои успех…
- **OLD**: Expecting success and believing in your abilities are important parts of psychological resilience and goal attainment. Psychologists call this self-efficacy. People with high self-efficacy believe they can influence outcomes, and they are more likely to reach …
- **NEW**: Expecting success and believing in your abilities are vital components of psychological resilience and goal achievement. Psychologists call this “self-efficacy.” People with high self-efficacy tend to believe they can influence their success, which often leads…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and closer to the original's tone and structure. Translation A's use of 'ambitious goals' is a slight deviation from the original 'больших высот' (great heights), and 'important parts' is a bit weaker than 'vital components'.
  - [old/style/minor] The phrase 'important parts' is slightly less sophisticated than 'vital components' for a psychological text, and 'ambitious goals' is a semantic shift from the original metaphor of 'great heights'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more idiomatic and flows better as a cohesive narrative. It uses 'vital components' and 'reach great heights', which sound more natural in a psychological context than the slightly clunkier 'important parts' or 'reach ambitious goals' in B.
  - [old/style/minor] 'Important parts' is a bit simplistic/weak compared to 'vital components'; 'goal attainment' is slightly more academic/stiff than 'goal achievement'.

#### 🟡 en `/steps_description/16/fact`— вердикт неустойчив

- **RU**: Мозг человека обладает способностью к изменению и адаптации на протяжении всей жизни – это явление называется нейропластичностью. Даже если человек привык думать негативно, целенаправленные усилия и тренировки могут изменить эти паттерны мышления и развить бол…
- **OLD**: The human brain is capable of change and adaptation throughout life — a phenomenon known as neuroplasticity. Even if someone is used to thinking negatively, deliberate practice and new habits can gradually shift thinking patterns toward a more positive and fle…
- **NEW**: The human brain has the ability to change and adapt throughout life—a phenomenon called neuroplasticity. Even if someone is used to negative thinking, purposeful effort and practice can change these patterns and develop a more positive perception of opportunit…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and idiomatic for a mental health article, using 'deliberate practice' and 'shift thinking patterns' instead of the clunky, literal phrasing in B. Translation B suffers from heavy 'translationese' and repetitive word choices.
  - [new/style/major] The phrasing 'purposeful effort and practice can change these patterns and develop a more positive perception' is a heavy, literal translation of the Russian structure, making it sound academic and stiff rather than engaging.
  - [new/style/minor] The repetition of 'and' in the second sentence creates a poor rhythm.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is a more faithful and precise rendering of the original text. Translation B introduces significant additions ('new habits', 'flexible view', 'the future') that, while pleasant, deviate from the source's meaning.
  - [old/addition/minor] Added 'new habits', 'flexible view', and 'the future' which are not in the original text.
  - [old/style/minor] The phrase 'deliberate practice' is a specific psychological term (intentionality), whereas the original 'целенаправленные усилия и тренировки' is broader.

#### 🔴 en `/steps_description/4/text` — OLD лучше (2:0)

- **RU**: Одним из ключевых факторов, влияющих на достижение целей, является умение эффективно управлять своим временем. Исследования показывают, что люди, которые планируют свой день и расставляют приоритеты, достигают большего успеха в различных сферах жизни.
- **OLD**: One of the key factors in achieving goals is effective time management. Research shows that people who plan their day and set priorities tend to be more successful in different areas of life.
- **NEW**: One of the key factors in achieving goals is the ability to manage time effectively. Research shows that people who plan their day and set priorities achieve greater success in various areas of life.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows better for a native reader. Translation B is grammatically correct but slightly more wordy and literal (e.g., 'the ability to manage time effectively' vs the more natural 'effective time management').
  - [new/style/minor] The phrasing 'the ability to manage time effectively' is a bit heavy/clunky compared to the more concise 'effective time management'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more idiomatic and natural for an English-speaking reader. Using 'effective time management' instead of the wordy 'the ability to manage time effectively' follows the principle of conciseness, and 'tend to be more successful' is a more nuanced and natural way to express research findings than the direct 'achieve greater success'.
  - [new/style/minor] The phrase 'the ability to manage time effectively' is slightly wordy and sounds more like a direct translation of the Russian structure than natural English prose.

#### 🟢 en `/instagram` — NEW лучше (2:0)

- **RU**: 18060891175932564
- **OLD**: 18006551183516120 18012522848565675
- **NEW**: 18060891175932564
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 0 / NEW 100)
  - Translation A contains random numeric strings that do not match the original, whereas Translation B is an exact match.
  - [old/mistranslation/critical] The translation consists of incorrect numeric values that do not correspond to the source.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 0 / NEW 100)
  - Translation A is an exact match to the original ID, whereas Translation B contains completely different numbers and extra lines, which constitutes a critical error.
  - [old/mistranslation/critical] The numeric ID does not match the original and contains extra data.

#### 🔴 en `/steps_description/17/fact` — OLD лучше (2:0)

- **RU**: Согласно данным Американской психологической ассоциации (APA), около 60% людей испытывают высокий уровень стресса из-за неопределенности будущего и изменения условий жизни.
- **OLD**: According to the American Psychological Association (APA), around 60% of people report high stress levels related to an uncertain future and changing life circumstances.
- **NEW**: According to the American Psychological Association (APA), about 60% of people experience high levels of stress due to uncertainty about the future and changing life conditions.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds more natural and professional for an article. 'Report high stress levels' is more idiomatic in a scientific/statistical context than 'experience', and 'life circumstances' is a much better collocation than 'life conditions'.
  - [new/style/minor] 'life conditions' sounds slightly unnatural/clunky compared to 'life circumstances'; 'uncertainty about the future' is correct but 'an uncertain future' is more concise and idiomatic.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A sounds more natural and professional for an English-speaking audience, using the idiomatic 'report high stress levels' and the more fluid 'uncertain future'. Translation B is slightly more literal and heavy due to 'uncertainty about the future' and 'life conditions'.
  - [new/style/minor] The phrasing 'uncertainty about the future' and 'life conditions' is grammatically correct but feels slightly more like a direct translation from Russian than the more idiomatic 'uncertain future' and 'life circumstances' in A.

#### 🔴 en `/steps_description/0/fact` — OLD лучше (2:0)

- **RU**: Ученые обнаружили, что оптимисты активируют разные области мозга по сравнению с пессимистами. Области мозга, отвечающие за вознаграждение и позитивные ожидания, у оптимистов активируются чаще.
- **OLD**: Scientists have found that optimists activate different brain regions than pessimists. Brain areas involved in reward and positive expectations are more active in people with an optimistic mindset.
- **NEW**: Scientists have found that optimists activate different areas of the brain compared to pessimists. In optimists, the brain regions responsible for reward and positive expectations are activated more frequently.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more natural and professional, avoiding the repetitive 'In optimists...' structure of A. It uses more idiomatic phrasing like 'brain areas involved in' and 'optimistic mindset'.
  - [new/style/minor] Repetitive sentence structure and slightly clunky phrasing ('In optimists, the brain regions... are activated').
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and flows better for a native reader. Translation B is grammatically correct but feels slightly repetitive and heavy due to the passive voice and the clunky 'compared to' construction.
  - [new/style/minor] The phrase 'areas of the brain' is slightly more wordy than 'brain regions/areas', and the passive 'are activated more frequently' is less engaging than the active 'are more active'.
  - [new/style/minor] The structure 'In optimists, the brain regions...' is a bit heavy for a scientific/educational snippet compared to the smoother flow of A.

#### 🟢 en `/steps_description/2/fact` — NEW лучше (2:0)

- **RU**: Психологи называют способность человека восстанавливаться после трудностей резильентностью. Это качество помогает людям справляться с жизненными вызовами и стрессами, сохраняя психическое здоровье и позитивное восприятие будущего.
- **OLD**: Psychologists refer to the ability to bounce back after difficulties as resilience. This capacity helps people cope with life’s challenges and stress while maintaining mental health and a more positive view of the future.
- **NEW**: Psychologists call the ability to bounce back from difficulties resilience. This quality helps people cope with life’s challenges and stress while maintaining mental well-being and a positive outlook on the future.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation A is more idiomatic and flows better as a professional piece of psychoeducation. Translation B uses a slightly clunkier 'refer to... as' construction and misses the project-specific term 'mental well-being'.
  - [old/terminology/minor] used 'mental health' instead of the preferred 'mental well-being'
  - [old/style/minor] the phrase 'refer to the ability... as resilience' is slightly more wordy/heavy than the direct 'call... resilience'
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses the project-standard term 'mental well-being' and the more idiomatic 'positive outlook on the future'. Translation A is grammatically correct but feels slightly more academic/stiff.
  - [old/terminology/minor] Used 'mental health' instead of the preferred 'mental well-being' for this context.
  - [old/style/minor] The phrase 'a more positive view' adds a comparative 'more' which isn't in the original and slightly changes the tone.

#### 🟡 en `/steps_description/12/text`— вердикт неустойчив

- **RU**: Этот феномен называется "эффектом красивого будущего", когда люди ожидают, что будущее принесет им больше радости и удовольствия, чем настоящее. Это помогает им сохранять мотивацию и стремление к улучшению своей жизни.
- **OLD**: This is sometimes called the “rosy future effect”, when people expect the future to bring more joy and satisfaction than the present. This expectation helps them stay motivated and strive to improve their lives.
- **NEW**: This phenomenon is known as the “beautiful future effect,” where people expect the future to bring them more joy and pleasure than the present. This helps them maintain motivation and the drive to improve their lives.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A uses the much more idiomatic 'rosy future effect' (reminiscent of 'rosy retrospection'), whereas B's 'beautiful future effect' sounds like a literal translation from Russian. A also flows more naturally for a native reader.
  - [new/style/major] 'beautiful future effect' is a literal translation and not a standard English idiom; 'where' is slightly less precise than 'when' for describing a phenomenon/time-based concept.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and follows the original structure perfectly. Translation B introduces 'rosy future effect', which is a creative interpretation but deviates from the literal 'beautiful future effect' provided in the source, and 'satisfaction' is a slight shift from 'pleasure'.
  - [old/style/minor] The term 'rosy future effect' is a deviation from the source 'эффект красивого будущего'.
  - [old/terminology/minor] Used 'satisfaction' instead of 'pleasure' (удовольствие).

#### 🟢 en `/result/negative/text` — NEW лучше (2:0)

- **RU**: Сейчас ваш взгляд на будущее может быть окрашен тревогой или пессимизмом. Вы чаще замечаете возможные трудности, чем перспективы, что может снижать мотивацию и даваться отражением на настроении. Осознание этой тенденции уже является важным шагом — оно открывае…
- **OLD**: Right now, your view of the future may be coloured by worry or pessimism. You may notice potential problems more easily than possible opportunities, which can lower motivation and affect your mood. Recognizing this tendency is already an important step — it op…
- **NEW**: Right now, your view of the future may be colored by anxiety or pessimism. You might notice potential difficulties more often than opportunities, which can lower your motivation and affect your mood. Recognizing this tendency is already an important step — it …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses the correct clinical term 'anxiety' instead of the more generic 'worry' used in A. It also flows more naturally with 'outlook on the future' and better captures the nuance of 'чаще замечаете' with 'more often'.
  - [old/terminology/minor] Used 'worry' instead of the standard 'anxiety' for 'тревогой'.
  - [old/style/minor] The phrase 'view of what lies ahead' is slightly more wordy than the cleaner 'outlook on the future'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more precise and follows the project's terminology perfectly, specifically using 'anxiety' instead of the more generic 'worry'. It also maintains a better flow and avoids the slight redundancy found in B.
  - [old/terminology/minor] Used 'worry' instead of the canonical 'anxiety'
  - [old/style/minor] The phrase 'possible opportunities' is slightly redundant compared to the more natural 'opportunities' in A

#### 🟢 en `/steps_description/1/fact` — NEW лучше (2:0)

- **RU**: Бывший премьер-министр Великобритании, Уинстон Черчилль, пережил множество неудач в своей политической карьере, включая поражения на выборах и критику. Однако его стойкость и вера в свои способности помогли ему преодолеть трудности и стать одним из величайших …
- **OLD**: Former UK Prime Minister Winston Churchill went through many setbacks in his political career, including election defeats and heavy criticism. His persistence and belief in his abilities, however, helped him overcome adversity and eventually become one of the …
- **NEW**: Former British Prime Minister Winston Churchill faced many setbacks in his political career, including election defeats and criticism. However, his resilience and belief in his abilities helped him overcome these difficulties and become one of history’s greate…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is a more precise and faithful rendering of the original text, maintaining the exact structure and vocabulary without unnecessary additions. Translation B introduces 'heavy' and 'eventually', which are not in the source, and changes 'greatest' to 'most influential', slightly shifting the tone.
  - [old/addition/minor] Added 'heavy' before criticism and 'eventually' before become.
  - [old/style/minor] Changed 'greatest' to 'most influential', which is a slight semantic shift from the original 'величайших'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and closer to the original tone. 'Resilience' is a much better fit for 'стойкость' in this context than 'persistence', and 'history's greatest leaders' flows more naturally than 'most influential leaders'.
  - [old/style/minor] Used 'persistence' instead of 'resilience' (стойкость), and 'influential' instead of 'greatest' (величайших), which slightly shifts the meaning.
  - [old/style/minor] The placement of 'however' in the middle of the sentence is grammatically correct but slightly less impactful for this narrative style than starting the sentence with it.

#### 🟢 en `/range/neutrally` — NEW лучше (2:0)

- **RU**: Нейтральный взгляд в будущее
- **OLD**: Neutral view of the future
- **NEW**: A neutral outlook on the future
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - Translation B uses the idiomatic collocation 'outlook on the future', which sounds much more natural to a native speaker than 'view of the future'.
  - [old/style/minor] Sounds slightly literal/translated; 'outlook' is the preferred term for a perspective on future events.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A uses 'outlook', which is the idiomatic and natural way to describe a perspective or attitude toward the future in English. Translation B is grammatically correct but sounds slightly more literal and less polished for a title.
  - [old/style/minor] 'view of the future' is acceptable but lacks the nuanced, professional tone of 'outlook on the future' in this context.

#### 🔴 en `/result/positive/text` — OLD лучше (2:0)

- **RU**: Ваш взгляд в будущее наполнен надеждой, интересом и здоровым оптимизмом. Даже сталкиваясь с трудностями, вы сохраняете веру в хорошее и находите способы поддерживать мотивацию. Такой подход помогает вам уверенно двигаться вперед и чувствовать опору внутри себя…
- **OLD**: Your outlook on the future is filled with hope, curiosity and healthy optimism. Even when you face difficulties, you tend to hold on to the belief that good things are possible and find ways to stay motivated. This attitude helps you move forward with more con…
- **NEW**: Your outlook on the future is filled with hope, interest, and healthy optimism. Even when facing difficulties, you maintain faith in good things and find ways to stay motivated. This approach helps you move forward with confidence and maintain a sense of inner…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and idiomatic for a supportive mental health context. Translation B uses 'interest' (which is a bit flat for 'интерес' in this emotional context) and 'maintain a sense of inner stability', which feels slightly more clinical/stiff compared to the warmer 'draw strength from within'.
  - [new/style/minor] 'interest' is a bit weak here; 'curiosity' in A captures the spirit of an active, engaged outlook better. 'Maintain a sense of inner stability' is a bit wordy/formal compared to the original.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B is more idiomatic and captures the supportive, warm tone of the original much better. 'Curiosity' is a more natural fit for 'интерес' in this context than 'interest', and 'draw strength from within' is a beautiful, native-sounding way to translate 'чувствовать опору внутри себя' compared to the slightly clinical 'maintain a sense of inner stability' in A.
  - [new/style/minor] The phrasing 'maintain a sense of inner stability' sounds a bit formal/clinical for a supportive text.
  - [new/style/minor] 'interest' is a bit flat here; 'curiosity' in B conveys the active engagement implied by the Russian original.

#### 🟡 en `/steps_description/2/text`— вердикт неустойчив

- **RU**: Жизнь полна взлетов и падений, и понимание этой цикличности может помочь людям легче переносить трудные времена. Исторически, многие культуры и философские учения подчеркивают временный характер трудностей и важность надежды на лучшее будущее.
- **OLD**: Life naturally includes ups and downs, and recognizing this cycle can make it easier to endure difficult times. Across history, many cultures and philosophical traditions have emphasized that hard times are temporary and that hope for a better future is essent…
- **NEW**: Life is full of ups and downs, and understanding this cycle can help people navigate difficult times more easily. Historically, many cultures and philosophical teachings have emphasized the temporary nature of hardships and the importance of hoping for a bette…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A sounds more natural and sophisticated for an article/narrative context. It avoids the slightly clunky 'help people navigate... more easily' of B and uses more idiomatic phrasing like 'Across history' and 'essential'.
  - [new/style/minor] The phrase 'help people navigate difficult times more easily' is a bit wordy and feels slightly translated compared to the smoother 'make it easier to endure' in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original structure and tone while remaining perfectly idiomatic. Translation B introduces unnecessary words ('naturally', 'essential') and slightly alters the flow of the second sentence.
  - [old/addition/minor] Added 'naturally' and 'essential', which changes the nuance of the original text.
  - [old/style/minor] The phrasing 'Across history' is slightly less natural here than 'Historically' for this context.

