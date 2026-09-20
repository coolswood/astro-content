# QA: слепое парное сравнение переводов — en-final-g67-das

- **Дата**: 2026-09-18T21:21:03.102Z
- **Метка**: en-final-g67-das
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: tests/das/das.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/das/das.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 7 | 🔴 7 | ⚪ 0 | 🟡 6 | 0 / 0 | 50% |
| **итого** | 20 | 🟢 7 | 🔴 7 | ⚪ 0 | 🟡 6 | 0 / 0 | 50% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×8, omission/minor×1; OLD — style/minor×13, terminology/major×1, mistranslation/major×1

### Детали пар (для спот-чека)

#### 🟢 en `/steps_description/13/fact` — NEW лучше (2:0)

- **RU**: Согласно исследованию, проведенному Университетом Торонто, 70% людей, склонных к частому сравнению себя с другими, испытывают высокие уровни стресса и депрессии.
- **OLD**: According to a study conducted at the University of Toronto, 70% of people who frequently compare themselves to others experience high levels of stress and depression.
- **NEW**: According to a study by the University of Toronto, 70% of people prone to frequent social comparison experience high levels of stress and depression.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more concise and professional, using the idiomatic 'prone to frequent social comparison' which flows better in a scientific/educational context. Translation B is grammatically correct but uses a wordier, more 'translated' structure ('people who frequently compare themselves to others').
  - [old/style/minor] Wordy construction that lacks the punchy, academic flow of a native speaker's summary.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses the more professional and idiomatic psychological term 'prone to frequent social comparison' instead of the wordier 'who frequently compare themselves to others'.
  - [old/style/minor] The phrasing 'people who frequently compare themselves to others' is grammatically correct but sounds slightly more like a literal translation of the Russian structure than a polished academic/journalistic English sentence.

#### 🟡 en `/steps_description/5/text`— вердикт неустойчив

- **RU**: Созависимость — это состояние, при котором человек слишком сильно полагается на другого в вопросах одобрения и эмоциональной поддержки. Это может привести к потере собственной идентичности и снижению самооценки.
- **OLD**: Codependency is a state in which a person relies too heavily on another for approval and emotional support. This can lead to a loss of personal identity and reduced self-esteem.
- **NEW**: Codependency is a state in which a person relies too heavily on another for approval and emotional support. This can lead to a loss of identity and lower self-esteem.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Both translations are excellent and accurate, but B is slightly more natural and concise. The addition of 'personal' in A is redundant because 'identity' in this context inherently implies the self.
  - [old/style/minor] The phrase 'personal identity' is slightly wordy compared to the more idiomatic 'loss of identity'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 90)
  - Both translations are excellent and natural, but B is slightly better because 'personal identity' and 'reduced self-esteem' are more idiomatic and precise in a psychological context than the slightly more clipped versions in A.
  - [new/style/minor] 'loss of identity' is fine, but 'loss of personal identity' (as in B) sounds more complete in clinical/educational writing; 'lower self-esteem' is slightly less formal/natural than 'reduced self-esteem'.

#### 🟢 en `/steps_description/10/fact` — NEW лучше (2:0)

- **RU**: Согласно теории Абрахама Маслоу, самореализация (достижение собственного потенциала) является высшим уровнем в иерархии потребностей человека. Однако это не обязательно означает, что нужно быть выдающимся в чем-то; важно развивать свои способности и стремиться…
- **OLD**: According to Abraham Maslow’s theory, self-actualisation (realising one’s potential) is the highest level in the hierarchy of human needs. However, this does not necessarily mean being outstanding in something; what matters is developing your abilities and str…
- **NEW**: According to Abraham Maslow’s theory, self-actualization (reaching one’s full potential) is the highest level in the hierarchy of human needs. However, this doesn’t necessarily mean being exceptional at something; it’s about developing your abilities and striv…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A sounds more natural and follows the project's tone guidelines by using contractions ('doesn’t', 'it’s') and more idiomatic phrasing ('reaching one’s full potential').
  - [old/style/minor] Uses 'does not' instead of contractions, making it feel slightly more formal/stiff than the desired 'understanding friend' tone; 'outstanding in something' is slightly less idiomatic than 'exceptional at something'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and aligns better with the requested 'warm, expert friend' tone through the use of contractions and more natural phrasing ('it’s about' vs 'what matters is').
  - [old/style/minor] The phrasing 'what matters is' is slightly more formal/stiff than the more natural 'it's about' used in B, and the lack of contractions makes it feel less like a modern mental health resource.

#### 🔴 en `/steps_description/17/text` — OLD лучше (2:0)

- **RU**: Постоянное стремление к максимальной эффективности может привести к выгоранию. Когда вы пытаетесь быть максимально эффективным во всех аспектах жизни, это создает постоянное давление и стресс, что в конечном итоге может истощить вас как физически, так и эмоцио…
- **OLD**: Constantly striving for maximum efficiency can lead to burnout. When you aim to be as efficient as possible in every area of life, it creates ongoing pressure and stress that can eventually exhaust you both physically and emotionally.
- **NEW**: A constant drive for maximum efficiency can lead to burnout. When you try to be as efficient as possible in every aspect of life, it creates constant pressure and stress, which can ultimately exhaust you both physically and emotionally.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds more natural and idiomatic for a mental health context. The use of 'striving' and 'aim to be' is more sophisticated than the repetitive 'drive' and 'try' in A, and 'ongoing pressure' flows better than 'constant pressure' when 'constant' was already used in the previous sentence.
  - [new/style/minor] Repetitive use of 'constant' in two consecutive sentences makes the rhythm heavy.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A flows more naturally for a native speaker, using 'Constantly striving' as a strong opening and avoiding the repetitive use of 'constant' found in B. Translation A also uses 'ongoing pressure', which sounds more idiomatic in this context than B's 'constant pressure and stress'.
  - [new/style/minor] Repetitive use of 'constant' (constant drive... constant pressure) makes the rhythm clunky.

#### 🟢 en `/steps_description/18/text` — NEW лучше (2:0)

- **RU**: Страх совершить ошибку может привести к прокрастинации. Люди откладывают задачи, боясь, что не смогут выполнить их идеально.
- **OLD**: Fear of making a mistake can lead to procrastination. People put tasks off because they are afraid they will not be able to complete them perfectly.
- **NEW**: The fear of making a mistake can lead to procrastination. People put off tasks because they fear they won’t be able to complete them perfectly.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B sounds more natural and idiomatic for a mental health context, using appropriate contractions ('won't') and a smoother rhythm. Translation A is grammatically correct but feels slightly more formal and stiff due to the lack of contractions and the word order in the second sentence.
  - [old/style/minor] Slightly formal/stiff tone; 'they are afraid they will not' is less fluid than 'they fear they won't' in a supportive context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation A sounds more natural and fluid for a mental health article. Translation B uses a slightly clunky phrasal verb placement ('put tasks off') and overly formal 'will not' instead of the preferred contractions.
  - [old/style/minor] The phrasal verb 'put off' is split awkwardly, and the lack of contractions makes the tone feel less like a 'supportive friend' and more like a textbook.
  - [old/style/minor] Missing the definite article 'The' at the beginning, though acceptable in some contexts, 'The fear' is more standard for this sentence structure.

#### 🟡 en `/steps_description/8/text`— вердикт неустойчив

- **RU**: Отвержение может вызвать сильную эмоциональную реакцию, так как мы эволюционно запрограммированы искать социальное принятие. Однако важно понимать, что одиночные случаи отвержения не определяют нашу ценность как личности.
- **OLD**: Rejection can trigger a strong emotional reaction because we are evolutionarily wired to seek social acceptance. However, it is important to understand that single episodes of rejection do not define our worth as a person.
- **NEW**: Rejection can trigger a strong emotional reaction because we are evolutionarily programmed to seek social acceptance. However, it is important to understand that isolated instances of rejection do not define our worth as individuals.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A uses 'isolated instances', which is more idiomatic and precise in a psychological context than 'single episodes'. It also uses 'worth as individuals', which flows better and sounds more natural for a professional yet supportive text.
  - [old/style/minor] 'single episodes' sounds slightly more clinical/medical than the original, and 'worth as a person' is a bit more basic/cliché compared to 'worth as individuals'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A uses the much more idiomatic and natural 'evolutionarily wired' instead of the literal 'programmed'. It also uses 'single episodes', which flows better in this psychological context than 'isolated instances'.
  - [new/style/minor] 'evolutionarily programmed' is a bit of a cliché/calque; 'wired' is more native-like. 'isolated instances' is slightly more formal/stiff than necessary for this tone.

#### 🔴 en `/steps_description/28/text` — OLD лучше (2:0)

- **RU**: Поведение ребенка определяется многими факторами, включая генетику, окружение, личностные особенности и социальные влияния. Родители не могут контролировать все эти факторы, и не всегда могут предотвратить поведение, которое не соответствует общественным норма…
- **OLD**: A child’s behaviour is shaped by many factors, including genetics, environment, personality traits and social influences. Parents cannot control all of these factors and cannot always prevent behaviour that does not align with social norms.
- **NEW**: A child’s behavior is determined by many factors, including genetics, environment, personality traits, and social influences. Parents cannot control all these factors and cannot always prevent behavior that does not meet social norms.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses more natural, idiomatic collocations ('shaped by' instead of 'determined by' and 'align with' instead of 'meet') which sounds more like high-quality English prose rather than a direct translation.
  - [new/style/minor] The phrasing 'determined by' and 'meet social norms' is grammatically correct but feels slightly more clinical and less fluid than B.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Both translations are excellent, but A is slightly more idiomatic for a psychological/educational context. 'Align with social norms' is a more natural and sophisticated collocation than 'meet social norms'.
  - [new/style/minor] The phrase 'meet social norms' is grammatically correct but sounds slightly more mechanical/clunky compared to 'align with' in this context.

#### 🟡 en `/steps_description/22/text`— вердикт неустойчив

- **RU**: Самопожертвование ради других может приносить удовлетворение, но только если это делается добровольно и без ожиданий. Исследования показывают, что люди, которые жертвуют своими интересами ради других с ожиданием вознаграждения, часто испытывают разочарование и…
- **OLD**: Self-sacrifice for others can be rewarding, but only when it is truly voluntary and without expectations. Studies show that people who give up their own interests for others while expecting something in return often end up feeling disappointed and resentful.
- **NEW**: Self-sacrifice for others can be fulfilling, but only if it is done voluntarily and without expectations. Research shows that people who sacrifice their own interests for others while expecting a reward often experience frustration and resentment.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and uses more precise, professional terminology ('reward', 'frustration') that fits the psychological context perfectly. Translation B is slightly more wordy and uses 'disappointed', which is a bit weaker than the original 'разочарование' in this specific context.
  - [old/style/minor] The phrase 'expecting something in return' is slightly more colloquial than 'expecting a reward', and 'end up feeling disappointed' is a bit wordy compared to the direct 'experience frustration'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and idiomatic for a mental health article. 'End up feeling' is a much more native way to describe the outcome of a behavior than the slightly more clinical 'often experience'.
  - [new/style/minor] The phrasing 'experience frustration and resentment' is grammatically correct but feels a bit more like a textbook translation than a warm, expert-friend tone.

#### 🟢 en `/description/text` — NEW лучше (2:0)

- **RU**: Прохождение теста на гармоничность личности может стать значимым шагом на пути к самопознанию и улучшению качества вашей жизни. Этот уникальный индекс помогает выявить скрытые дисфункциональные убеждения и мыслительные паттерны По результатам теста вы получите…
- **OLD**: Taking this personality harmony test can be an important step toward self-understanding and improving your quality of life. This unique index helps to identify hidden dysfunctional beliefs and thinking patterns. Based on the results, you will receive an analys…
- **NEW**: Taking this personality harmony test can be a significant step toward self-discovery and improving your quality of life. This unique index helps identify hidden unhelpful beliefs and thought patterns. Based on your results, you will receive an analysis of your…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A adheres to the project's specific terminology (using 'unhelpful beliefs' instead of 'dysfunctional') and maintains a more natural, supportive tone. Translation B uses 'dysfunctional' which is explicitly flagged as a legacy/avoided term in the glossary, and its translation of 'Потребность в достижениях' is a creative leap that distorts the original meaning.
  - [old/terminology/major] Used 'dysfunctional beliefs' instead of the required 'unhelpful beliefs'.
  - [old/mistranslation/major] 'Achievement-driven self-worth' is a significant departure from the original 'Потребность в достижениях' (Need for achievement).
  - [old/style/minor] 'Demands toward others' is less idiomatic than 'Demands placed on others'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B follows the project's specific terminology guidelines by using 'unhelpful beliefs' instead of 'dysfunctional beliefs'. It also sounds more natural and idiomatic in its phrasing.
  - [old/terminology/major] Used 'dysfunctional beliefs' instead of the required 'unhelpful beliefs'
  - [old/mistranslation/minor] 'Achievement-driven self-worth' is a significant departure from the original 'Потребность в достижениях' (Need for achievement)
  - [old/style/minor] 'Demands toward others' is slightly less idiomatic than 'Demands placed on others'

#### 🔴 en `/steps_description/14/fact` — OLD лучше (2:0)

- **RU**: Люди, которые могут учиться на своих ошибках и воспринимать их как возможность для развития, обычно успешнее в долгосрочной перспективе.
- **OLD**: People who are able to learn from their mistakes and see them as opportunities for development tend to be more successful in the long run.
- **NEW**: People who can learn from their mistakes and view them as opportunities for development are usually more successful in the long run.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 90)
  - Translation B sounds more natural and idiomatic for a psychological/self-help context. The use of 'tend to be' is a better stylistic match for the nuanced Russian 'обычно' than the more blunt 'are usually'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Both translations are excellent, but A sounds slightly more natural and sophisticated due to the use of 'tend to be', which better captures the nuance of 'обычно' in a psychological/observational context than the more blunt 'are usually'.

#### 🔴 en `/steps_description/19/text` — OLD лучше (2:0)

- **RU**: Перфекционисты часто страдают от тревожности, депрессии и выгорания. Исследования показывают, что перфекционизм связан с высоким уровнем стресса и низким уровнем удовлетворенности жизнью.
- **OLD**: Perfectionists often struggle with anxiety, depression and burnout. Research shows that perfectionism is associated with high stress and low life satisfaction.
- **NEW**: Perfectionists often suffer from anxiety, depression, and burnout. Research shows that perfectionism is linked to high stress levels and low life satisfaction.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Translation A is more concise and uses 'struggle with', which sounds more natural and empathetic in a mental health context than the heavier 'suffer from'.
  - [new/style/minor] The addition of 'levels' (high stress levels) is grammatically correct but slightly more wordy than necessary for a smooth, modern reading experience.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 90)
  - Translation B sounds more natural and idiomatic for a mental health context. 'Struggle with' is a warmer, more supportive way to describe mental health challenges than the more clinical 'suffer from'.
  - [new/style/minor] The phrase 'suffer from' is grammatically correct but can sound slightly more clinical/heavy compared to the more empathetic 'struggle with'.

#### 🟡 en `/steps_description/27/fact`— вердикт неустойчив

- **RU**: Если вы пытаетесь помочь слишком многим людям одновременно, это может снизить качество вашей помощи, так как ваши ресурсы и внимание будут распределены слишком тонко.
- **OLD**: If you try to help too many people at once, the quality of your support may decrease because your resources and attention are spread too thin.
- **NEW**: If you try to help too many people at once, the quality of your help may decrease, as your resources and attention become spread too thin.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and natural for a supportive expert tone. Translation B uses 'become spread too thin', which is slightly wordier and less idiomatic than the direct 'are spread too thin'.
  - [new/style/minor] The use of 'become spread' is slightly more heavy-handed than the more natural 'are spread' in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 95)
  - Translation A is more natural and idiomatic; the use of 'become spread too thin' captures the process and nuance of the original better than the static 'are spread too thin' in B. Additionally, 'help' is a more direct and accurate translation of 'помощь' in this context than 'support'.
  - [old/terminology/minor] used 'support' instead of 'help', which slightly shifts the tone from general assistance to professional/emotional support

#### 🔴 en `/options` — OLD лучше (2:0)

- **RU**: Полностью согласен Скорее согласен Не знаю Скорее не согласен Полностью не согласен
- **OLD**: Strongly agree Somewhat agree Not sure Somewhat disagree Strongly disagree
- **NEW**: Strongly agree Agree I don’t know Disagree Strongly disagree
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - Translation A perfectly captures the nuances of the Likert scale (the degree of agreement) present in the original. Translation B simplifies the scale, losing the 'somewhat' (скорее) distinction.
  - [new/omission/minor] Lost the 'somewhat' (скорее) nuance in the second and fourth options, turning a 5-point scale into a 3-point scale.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B accurately captures the nuances of the Russian scale (the 'somewhat' aspect of 'скорее'), whereas Translation A collapses the scale into a standard 5-point Likert scale that loses the specific intensity of the original.
  - [new/style/minor] The scale is too blunt; 'Agree' and 'Disagree' do not reflect the 'скорее' (somewhat/rather) nuance of the original.

#### 🟡 en `/steps_description/5/fact`— вердикт неустойчив

- **RU**: Эмоциональная зависимость от любви окружающих может привести к хронической тревожности и страху быть отвергнутым. Это состояние может помешать человеку развивать здоровые и сбалансированные отношения.
- **OLD**: Emotional dependence on other people’s love can lead to chronic anxiety and fear of rejection. This can prevent a person from building healthy, balanced relationships.
- **NEW**: Emotional dependency on the love of others can lead to chronic anxiety and a fear of rejection. This state can make it difficult to develop healthy, balanced relationships.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and idiomatic for a mental health context. Translation B uses 'This state can make it difficult', which is a bit wordy and slightly more formal/clunky than the direct 'This can prevent' in A.
  - [new/style/minor] The phrase 'This state can make it difficult to develop' is slightly more heavy-handed and less natural than the more direct approach in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and flows better for a native reader. 'The love of others' is a more natural collocation than 'other people's love', and 'make it difficult to develop' is a smoother, less heavy way to express the impact than 'prevent a person from building'.
  - [old/style/minor] The phrasing 'other people's love' is slightly clunky compared to 'the love of others'. 'Prevent a person from building' is a bit more heavy-handed/clinical than the original's nuance of 'impeding' development.

#### 🟡 en `/steps_description/2/text`— вердикт неустойчив

- **RU**: Люди — социальные существа, и стремление к одобрению других заложено в нас эволюционно. Это помогает нам чувствовать себя частью группы, что было жизненно важно для выживания наших предков.
- **OLD**: Humans are social beings, and the drive for approval from others is rooted in our evolution. It helps us feel part of a group, which was vital for our ancestors’ survival.
- **NEW**: Humans are social beings, and the drive for approval is evolutionarily ingrained in us. This helps us feel part of a group, which was essential for the survival of our ancestors.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and flows better; 'evolutionarily ingrained' is a much more natural and sophisticated collocation than 'rooted in our evolution'.
  - [old/style/minor] The phrase 'rooted in our evolution' sounds slightly clunky/translated compared to the more seamless 'evolutionarily ingrained'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more idiomatic and flows better for a native reader. Translation B uses a heavy adverbial construction ('evolutionarily ingrained') which feels slightly more academic and clunky compared to the natural 'rooted in our evolution'.
  - [new/style/minor] The phrase 'evolutionarily ingrained in us' is grammatically correct but sounds less natural and more like a direct translation of the Russian structure than A's more fluid approach.

#### 🟢 en `/steps_description/25/text` — NEW лучше (2:0)

- **RU**: Чувство ответственности за других может привести к нарушению личных границ и созависимости, что негативно влияет на качество жизни и взаимоотношений.
- **OLD**: Feeling responsible for other people can lead to blurred boundaries and codependency, which negatively affects quality of life and relationships.
- **NEW**: Feeling responsible for others can lead to blurred personal boundaries and codependency, which negatively impacts your quality of life and relationships.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more natural and follows the UX guidelines by using 'your' to address the reader directly, making the text more engaging and personal. Translation A is grammatically correct but feels slightly more detached and clinical.
  - [old/style/minor] Missing the personal 'your' which makes the tone less supportive and more like a textbook definition.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and follows the UX guidelines by using 'your' to address the reader directly, making the text feel supportive rather than clinical. Translation B is slightly too impersonal and lacks the possessive pronoun required for a smooth flow in this context.
  - [old/style/minor] Missing possessive 'your' before 'quality of life', making it sound a bit like a textbook rather than a supportive guide.

#### 🟢 en `/steps_description/1/fact` — NEW лучше (2:0)

- **RU**: Установление личных границ является важным аспектом здоровых отношений. Умение говорить "нет" и выражать свои потребности помогает поддерживать здоровые и взаимоуважительные отношения.
- **OLD**: Setting personal boundaries is a key aspect of healthy relationships. The ability to say “no” and to express your needs helps sustain relationships that are healthy and based on mutual respect.
- **NEW**: Setting personal boundaries is a vital aspect of healthy relationships. Learning to say “no” and expressing your needs helps maintain healthy, mutually respectful connections.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and concise, avoiding the repetitive 'healthy relationships' and the clunky 'relationships that are healthy and based on...' structure found in A. B uses 'connections' to avoid repetition and 'Learning to' which sounds more natural for a self-help context.
  - [old/style/minor] Repetitive use of 'healthy relationships' and wordy relative clause 'relationships that are healthy and based on...'
  - [old/style/minor] The phrasing 'to say... and to express' is slightly more formal/stiff than the more natural 'saying... and expressing' or 'learning to say... and expressing'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise, idiomatic, and flows better for a reader. Translation B is grammatically correct but feels slightly wordy and repetitive due to the structure 'relationships that are healthy and based on...'.
  - [old/style/minor] The phrasing 'helps sustain relationships that are healthy and based on mutual respect' is unnecessarily heavy and wordy compared to the more natural 'helps maintain healthy, mutually respectful connections'.

#### 🔴 en `/steps_description/23/fact` — OLD лучше (2:0)

- **RU**: Брак Принца Чарльза и Принцессы Дианы является примером того, как ожидания и обязательства могут привести к несчастливым отношениям. Несмотря на общественные и личные ожидания, их отношения не были успешными, что привело к разочарованию и расставанию.
- **OLD**: The marriage of Prince Charles and Princess Diana illustrates how expectations and obligations can lead to an unhappy relationship. Despite personal and public expectations, their marriage was not successful, which resulted in disappointment and separation.
- **NEW**: The marriage of Prince Charles and Princess Diana is an example of how expectations and obligations can lead to unhappy relationships. Despite public and personal expectations, their relationship was not successful, leading to frustration and separation.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B uses more sophisticated and natural vocabulary ('illustrates' instead of 'is an example of', 'disappointment' instead of 'frustration') and maintains better singular/plural consistency with the original context.
  - [new/style/minor] Using 'unhappy relationships' (plural) when referring to a specific case is slightly less natural than the singular 'unhappy relationship'; 'frustration' is a slightly different emotional nuance than 'разочарование' (disappointment).
  - [old/style/minor] The word order 'personal and public' is a slight departure from the original 'общественные и личные', but it flows better in English.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 86)
  - Translation A is more cohesive and uses 'disappointment', which accurately reflects the Russian 'разочарование'. Translation B uses 'frustration', which changes the emotional nuance, and its phrasing 'leading to...' is slightly less formal/polished in this context than A's 'which resulted in'.
  - [new/style/minor] frustration is a different emotion than disappointment (разочарование)
  - [new/style/minor] slightly less formal than 'resulted in' for this narrative style

#### 🔴 en `/steps_description/31/fact` — OLD лучше (2:0)

- **RU**: Без работы над управлением стрессом и расстройствами качество вашей жизни может значительно снизиться, включая ухудшение социальных связей и снижение продуктивности.
- **OLD**: Without working on how you manage stress and distress, your quality of life can significantly decline, including poorer social connections and reduced productivity.
- **NEW**: Without working on stress management and managing your distress, your quality of life can significantly decline, including worsening social connections and decreased productivity.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation B is more idiomatic and avoids the repetitive 'management/managing' structure found in A. It also uses more natural adjective-noun pairings ('poorer social connections') rather than the clunky gerund phrases in A.
  - [new/style/minor] Repetitive use of 'management/managing' makes the sentence heavy and less natural.
  - [new/style/minor] The phrase 'worsening social connections' is grammatically acceptable but feels slightly less fluid than 'poorer social connections' in this context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is more concise and avoids the repetitive 'managing/management' structure found in B. It uses 'poorer social connections,' which sounds more natural in this context than 'worsening social connections.'
  - [new/style/minor] Repetitive use of 'manage/management' makes the sentence clunky.
  - [new/style/minor] 'Worsening social connections' is slightly less idiomatic here than 'poorer social connections'.

#### 🟢 en `/steps_description/4/fact` — NEW лучше (2:0)

- **RU**: Теория социального сравнения утверждает, что люди склонны оценивать свои способности и успехи, сравнивая себя с другими. Это может быть полезно для мотивации, но чрезмерное сравнение может привести к снижению самооценки и недовольству собой.
- **OLD**: Social comparison theory states that people tend to evaluate their abilities and achievements by comparing themselves to others. This can be useful for motivation, but excessive comparison may lower self-esteem and increase dissatisfaction with oneself.
- **NEW**: Social comparison theory suggests that people tend to evaluate their own abilities and successes by comparing themselves to others. While this can be motivating, excessive comparison can lead to lower self-esteem and self-dissatisfaction.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A flows much more naturally for a native reader, using the idiomatic 'can be motivating' and the concise 'self-dissatisfaction'. Translation B is grammatically correct but feels slightly more clunky and academic due to the phrasing 'increase dissatisfaction with oneself'.
  - [old/style/minor] The phrase 'dissatisfaction with oneself' is a bit wordy compared to the more natural 'self-dissatisfaction' or simply 'dissatisfaction'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and flows better, especially with the use of 'While this can be motivating' and the concise 'self-dissatisfaction'. Translation A is grammatically correct but feels slightly more repetitive and heavy.
  - [old/style/minor] The phrase 'increase dissatisfaction with oneself' is a bit wordy compared to the more natural 'self-dissatisfaction' or 'dissatisfaction with oneself' used in B.

