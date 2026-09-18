# QA: слепое парное сравнение переводов — en-final-g67-eat

- **Дата**: 2026-09-18T21:24:46.966Z
- **Метка**: en-final-g67-eat
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: tests/eat.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/eat.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 9 | 🔴 6 | ⚪ 0 | 🟡 5 | 0 / 0 | 60% |
| **итого** | 20 | 🟢 9 | 🔴 6 | ⚪ 0 | 🟡 5 | 0 / 0 | 60% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×14; OLD — style/minor×13, mistranslation/minor×3, style/major×1

### Детали пар (для спот-чека)

#### 🔴 en `/steps_description/15/text` — OLD лучше (2:0)

- **RU**: Избегание сахара может привести к усилению контроля над питанием и к развитию нездоровых пищевых привычек. Это может также привести к дефициту энергии и важнейших питательных веществ, необходимых для нормального функционирования организма.
- **OLD**: Avoiding sugar can increase rigid control over food and contribute to the development of unhealthy eating habits. It can also lead to low energy and a lack of key nutrients the body needs to function properly.
- **NEW**: Avoiding sugar can lead to increased control over diet and the development of unhealthy eating habits. It can also lead to a deficiency in energy and essential nutrients needed for the body to function normally.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and idiomatic for a mental health/wellness context. Translation B uses heavy, clinical phrasing ('deficiency in energy', 'function normally') which feels like a direct translation from Russian.
  - [new/style/minor] The phrasing 'deficiency in energy' is clunky; 'low energy' (as in A) is much more natural for a wellness app.
  - [new/style/minor] The phrase 'function normally' is a bit of a cliché/calque; 'function properly' is more idiomatic in this context.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 85)
  - Translation B sounds much more natural and idiomatic for a mental health/wellness context. It avoids the heavy, noun-based 'deficiency in energy' in favor of the smoother 'low energy' and uses more precise verbs like 'contribute to'.
  - [new/style/minor] The phrasing 'increased control over diet' is a bit clunky and literal; 'rigid control over food' in B better captures the psychological nuance of the original context.

#### 🟢 en `/steps_description/4/fact` — NEW лучше (2:0)

- **RU**: Такое поведение часто является попыткой сохранить контроль над приемом пищи. Люди, страдающие расстройствами пищевого поведения, могут использовать эти ритуалы, чтобы уменьшить тревогу, связанную с едой и весом.
- **OLD**: These rituals are often attempts to maintain control over eating. People with eating disorders may rely on such behaviours to reduce anxiety related to food and weight.
- **NEW**: This behavior is often an attempt to maintain control over eating. People struggling with eating disorders may use these rituals to reduce anxiety related to food and weight.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more natural and follows the 'empathetic expert' tone. 'People struggling with' is a much better, more compassionate choice than the clinical 'People with' or the slightly awkward 'People suffering from' (implied).
  - [old/style/minor] The shift from 'Such behavior' (singular) to 'These rituals' (plural) in the first sentence is a slight deviation from the original structure, though not a semantic error.
  - [old/style/minor] The phrase 'rely on such behaviours' sounds slightly more formal/clinical than the warmer 'use these rituals' in B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more faithful to the original structure and flow. Translation B introduces a logical error by starting with 'These rituals', which refers to something mentioned previously, whereas the original starts with 'This behavior' (Такое поведение).
  - [old/mistranslation/major] The subject of the first sentence was changed from 'behavior' to 'rituals', which shifts the focus and creates a circular logic since the rituals are the method mentioned in the second sentence.

#### 🟢 en `/steps` — NEW лучше (2:0)

- **RU**: Меня пугает мысль о том, что я могу набрать вес Я отказываюсь от еды, даже когда голоден Я замечаю, что часто думаю о еде У меня случались приступы переедания, во время которых я чувствовал, что не могу себя контролировать. Я делю еду на тарелке на очень мален…
- **OLD**: The thought of gaining weight scares me I refrain from eating even when I feel hungry I often catch myself thinking about food I have had episodes of overeating when I felt completely out of control I cut the food on my plate into very small pieces I know how …
- **NEW**: The thought of gaining weight scares me I refuse to eat, even when I’m hungry I notice that I think about food often I’ve had binge eating episodes where I felt like I couldn’t control myself I cut my food into very small pieces I know exactly how many calorie…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is much more natural and idiomatic for a mental health context. It uses precise terms like 'binge eating' and 'purge' which are standard in CBT/eating disorder contexts, whereas B is wordy and uses clunky phrasing like 'make myself vomit'.
  - [old/style/major] The phrase 'make myself vomit' is medically/clinically awkward; 'purge' is the standard term used in English-speaking mental health contexts.
  - [old/style/minor] Phrasing like 'I spend too much time and mental energy thinking about food' is an addition/interpretation that deviates from the simple 'Thoughts about food take up too much space in my life'.
  - [old/style/minor] The use of 'etc.' in the carbs sentence is unnecessary and feels like a textbook rather than a personal journal entry.
  - [old/style/minor] The sentence 'It takes me longer to finish a meal than it takes other people' is overly wordy and lacks the natural flow of a native speaker.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation B sounds much more natural and idiomatic for a mental health context. It uses appropriate clinical/common terms like 'binge eating' and 'purge' instead of the wordier or more literal 'episodes of overeating' and 'make myself vomit'.
  - [old/style/minor] Phrasing like 'I refrain from eating' and 'I have self-control when it comes to food' sounds slightly formal/stilted compared to the more natural 'I refuse to eat' or 'I have good control over my eating habits'.
  - [old/style/minor] The translation of 'меня накрывает чувство вины' as 'I feel strong guilt' is a bit flat; B's 'I feel guilty' is more natural, though both are acceptable.
  - [old/addition/minor] Added '(such as bread, potatoes, rice, etc.)' which wasn't in the original.
  - [old/style/minor] The translation of 'мысли о еде занимают слишком много места' as 'I spend too much time and mental energy...' is a bit of an over-explanation/interpretation compared to the more poetic/direct 'take up too much space' in B.

#### 🔴 en `/steps_description/15/fact` — OLD лучше (2:0)

- **RU**: Исследования показывают, что сбалансированное потребление сахара в рамках здоровой диеты важно для поддержания энергетического баланса и хорошего настроения. Полное исключение сахара без медицинских показаний может привести к дефициту важных питательных вещест…
- **OLD**: Research shows that balanced sugar intake as part of a healthy diet is important for maintaining energy levels and stable mood. Completely cutting out sugar without medical reasons can lead to nutrient deficiencies and a lower overall quality of life.
- **NEW**: Research shows that balanced sugar consumption within a healthy diet is important for maintaining energy levels and mood. Completely eliminating sugar without medical necessity can lead to nutrient deficiencies and a lower quality of life.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 86)
  - Translation A sounds more natural and idiomatic for a mental well-being context. Translation B uses slightly more formal/stiff phrasing ('consumption within', 'medical necessity') which feels more like a medical textbook than a supportive expert friend.
  - [new/style/minor] The phrasing 'consumption within a healthy diet' is slightly clunky compared to 'intake as part of a healthy diet'.
  - [new/style/minor] 'Medical necessity' is a bit more formal/bureaucratic than the more natural 'medical reasons'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more natural and idiomatic for a mental well-being context. 'Sugar intake' and 'cutting out sugar' are more common collocations than 'sugar consumption' and 'eliminating sugar' in this register.
  - [new/style/minor] The phrasing 'sugar consumption' and 'eliminating sugar' is slightly more formal/academic than the warm, expert tone preferred for the target market.

#### 🟢 en `/result/low/text` — NEW лучше (2:0)

- **RU**: Ваш результат указывает на низкую вероятность расстройств пищевого поведения. Это говорит о том, что ваше пищевое поведение в целом находится в пределах нормы. В то же время важно помнить, что этот тест не заменяет диагностику специалиста. Если у вас есть вопр…
- **OLD**: Your result suggests a low likelihood of an eating disorder. This indicates that your eating behaviour is generally within a typical range. At the same time, it is important to remember that this test does not replace a professional diagnosis. If you have any …
- **NEW**: Your result indicates a low probability of an eating disorder. This suggests that your eating behavior is generally within a healthy range. At the same time, it’s important to remember that this test is not a substitute for a professional diagnosis. If you hav…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A sounds more natural and uses better collocations for a mental health context ('within a healthy range', 'provide extra reassurance'). Translation B feels slightly more clinical and stiff ('typical range', 'does not replace').
  - [old/style/minor] The use of 'typical range' is less idiomatic in a psychological context than 'healthy range'.
  - [old/style/minor] The phrasing 'does not replace' is slightly more formal/stiff than the smoother 'is not a substitute for'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B sounds more natural and uses better word choices for a mental health context ('healthy range' instead of 'typical range', 'reassurance' instead of 'clarity'). It also correctly uses the contraction 'it’s' as per the style guide.
  - [old/style/minor] The phrase 'within a typical range' sounds slightly clinical/stilted compared to 'within a healthy range'; 'clarity' is a bit of a weak substitute for 'уверенность' (reassurance) in this context; lacks contractions (it is) preferred by the style guide.

#### 🟡 en `/steps_description/8/text`— вердикт неустойчив

- **RU**: Стресс и тревожность, связанные с приемом пищи, могут вызывать психосоматические реакции, такие как тошнота и рвота. Эти симптомы усиливаются чувством вины или стыда после еды.
- **OLD**: Stress and anxiety around eating can trigger psychosomatic reactions such as nausea and vomiting. These symptoms often intensify when a person feels guilty or ashamed after eating.
- **NEW**: Stress and anxiety related to eating can cause psychosomatic reactions, such as nausea and vomiting. These symptoms are often intensified by feelings of guilt or shame after eating.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and less academic; 'anxiety around eating' is a more idiomatic way to express the concept than 'related to eating', and the active voice in the second sentence flows better for a reader.
  - [new/style/minor] The use of passive voice ('are often intensified by') makes the sentence feel heavier and more clinical compared to the more direct version in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and maintains a professional, clinical yet supportive tone suitable for psychoeducation. Translation B introduces unnecessary wordiness ('when a person feels') which makes the sentence feel slightly more detached and less fluid.
  - [old/style/minor] The phrase 'when a person feels guilty or ashamed' is a bit wordy compared to the more natural 'feelings of guilt or shame' used in A.

#### 🟢 en `/steps_description/23/text` — NEW лучше (2:0)

- **RU**: Для некоторых людей чувство пустого желудка может ассоциироваться с успехом и самоконтролем. Это состояние может временно снижать тревожность и давать ощущение достижения цели, особенно если цель связана с потерей веса.
- **OLD**: For some people, the feeling of an empty stomach is associated with success and self-control. This state can temporarily reduce anxiety and create a sense of achievement, especially when the goal is weight loss.
- **NEW**: For some people, the feeling of an empty stomach can be associated with success and self-control. This state can temporarily reduce anxiety and provide a sense of achievement, especially if the goal is related to weight loss.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more accurate to the original nuance by using 'can be associated' and 'can... provide', whereas B changes the modality to a definitive 'is associated'.
  - [old/mistranslation/minor] The original uses 'может' (can/may), but B uses 'is', which makes the statement too definitive and loses the nuance of possibility.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more accurate to the original nuance by including 'can' in the first sentence and using 'provide a sense of achievement', which sounds more natural in this context than 'create'.
  - [old/mistranslation/minor] The omission of 'can' (может) in the first sentence changes a possibility into a general fact, slightly altering the original meaning.

#### 🔴 en `/steps_description/5/text` — OLD лучше (2:0)

- **RU**: Постоянный подсчет калорий может быть связан с расстройствами пищевого поведения, такими как анорексия и булимия. Это может стать навязчивой практикой, которая влияет на выбор пищи и прием пищи, способствуя ограничению калорий и излишнему контролю над диетой.
- **OLD**: Constantly counting calories can be linked to eating disorders such as anorexia and bulimia. It can become an obsessive habit that shapes food choices and mealtimes, promoting calorie restriction and excessive control over diet.
- **NEW**: Constant calorie counting can be linked to eating disorders like anorexia and bulimia. It can become an intrusive practice that influences food choices and eating habits, contributing to calorie restriction and excessive dietary control.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses more natural and precise collocations for this context ('obsessive habit' vs 'intrusive practice', 'shapes food choices' vs 'influences food choices'). 'Mealtimes' is a much more idiomatic way to translate 'прием пищи' in this context than 'eating habits'.
  - [new/style/minor] 'intrusive practice' sounds slightly clinical/mechanical compared to the more natural 'obsessive habit' for describing behavioral patterns; 'eating habits' is a bit generic for 'прием пищи' in this specific sentence structure.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and idiomatic for a mental health context. Translation B uses 'intrusive practice', which is a slightly awkward collocation in English compared to 'obsessive habit', and 'eating habits' is a bit of a deviation from the original 'прием пищи' (mealtimes).
  - [new/style/minor] 'intrusive practice' is less idiomatic than 'obsessive habit' in this context; 'eating habits' is a broader term than 'mealtimes' (прием пищи).
  - [new/style/minor] 'excessive dietary control' is slightly more formal/stiff than 'excessive control over diet'.

#### 🔴 en `/steps_description/19/text` — OLD лучше (2:0)

- **RU**: Окружающие часто оказывают давление на людей с расстройствами пищевого поведения, чтобы они ели больше или питались определённым образом. Это давление может исходить от семьи, друзей или коллег и может вызывать дополнительный стресс и тревогу.
- **OLD**: People with eating disorders often experience pressure from others to eat more or to eat in a particular way. This pressure can come from family, friends or colleagues and can increase stress and anxiety.
- **NEW**: People around those with eating disorders often exert pressure to eat more or to eat in a certain way. This pressure can come from family, friends, or colleagues and can cause additional stress and anxiety.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B is more idiomatic and natural for a mental health context; it focuses on the experience of the person with the disorder rather than the action of the surroundings. Translation A is a bit wordy and follows the Russian syntactic structure too closely.
  - [new/style/minor] The construction 'People around those with... often exert pressure' is grammatically correct but feels slightly heavy and less natural than 'People with... often experience pressure'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more natural and avoids the awkward phrasing of 'people around those with...'. It correctly captures the sense of the original without unnecessary wordiness.
  - [new/style/major] The phrase 'People around those with eating disorders often exert pressure to eat more' is grammatically clunky and creates a distance that makes the sentence feel unnatural; it's a literal translation of 'окружающие' that doesn't work well in this context.
  - [new/style/minor] The use of 'cause additional stress' is fine, but 'increase stress' (as in A) or 'lead to extra stress' is often more idiomatic in mental health contexts.

#### 🟡 en `/steps_description/2/fact`— вердикт неустойчив

- **RU**: По данным исследований, около 1% женщин и 0.5% мужчин страдают от анорексии, и до 4% женщин и 2% мужчин могут испытывать булимию в какой-то момент своей жизни. Навязчивые мысли о еде — один из основных симптомов этих состояний.
- **OLD**: Studies suggest that about 1% of women and 0.5% of men experience anorexia, and up to 4% of women and 2% of men may experience bulimia at some point in their lives. Intrusive thoughts about food are one of the core symptoms of these conditions.
- **NEW**: According to research, approximately 1% of women and 0.5% of men suffer from anorexia, and up to 4% of women and 2% of men may experience bulimia at some point in their lives. Intrusive thoughts about food are one of the primary symptoms of these conditions.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'experience' for anorexia, which is more clinically appropriate and aligns with the 'warm, supportive expert' tone, whereas 'suffer from' in B can feel slightly more stigmatizing. A also uses 'core symptoms', which sounds more natural in this context than 'primary symptoms'.
  - [new/style/minor] The phrase 'suffer from' is slightly more heavy-handed/stigmatizing than 'experience' in modern mental health contexts.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A is more precise and follows the original structure perfectly. Translation B uses 'experience anorexia', which is slightly less clinically accurate than 'suffer from' in this context, and 'core symptoms' is a bit more interpretive than the original 'основных симптомов'.
  - [old/style/minor] The use of 'experience' for a clinical diagnosis like anorexia is slightly weaker than 'suffer from' in this context.

#### 🔴 en `/steps_description/4/text` — OLD лучше (2:0)

- **RU**: Разделение еды на мелкие кусочки может быть связано с расстройствами пищевого поведения, такими как анорексия нервоза. Это поведение может служить способом замедления процесса еды и создания иллюзии большего объема пищи, что помогает человеку чувствовать себя …
- **OLD**: Cutting food into small pieces can be associated with eating disorders such as anorexia nervosa. This behaviour can slow down eating and create the illusion of a larger portion, helping a person feel less hungry.
- **NEW**: Cutting food into very small pieces can be associated with eating disorders, such as anorexia nervosa. This behavior may serve as a way to slow down the eating process and create the illusion of a larger volume of food, helping a person feel less hungry.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more concise and natural for a mental health context, avoiding the wordy 'volume of food' and 'eating process' which sound like direct translations from Russian. Translation B is grammatically correct but suffers from 'translationese' (heavy, literal phrasing).
  - [new/style/minor] The phrase 'volume of food' is less idiomatic than 'larger portion' in this context.
  - [new/style/minor] The phrase 'slow down the eating process' is unnecessarily wordy compared to 'slow down eating'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B is more concise and natural for a mental health context, avoiding the wordy 'serve as a way to' and 'volume of food'.
  - [new/style/minor] The phrasing 'serve as a way to slow down' is slightly wordy/clunky compared to the more direct 'can slow down'.
  - [new/style/minor] The phrase 'larger volume of food' is grammatically correct but 'larger portion' in B is more idiomatic in a nutritional/eating context.

#### 🟢 en `/steps_description/8/fact` — NEW лучше (2:0)

- **RU**: Частая тошнота и рвота могут привести к серьезным медицинским осложнениям, включая обезвоживание, дефицит питательных веществ, электролитные нарушения и повреждение пищевода. Эти состояния требуют медицинского вмешательства.
- **OLD**: Frequent nausea and vomiting can lead to serious medical complications, including dehydration, nutrient deficiencies, electrolyte imbalances and damage to the oesophagus. These conditions require medical attention.
- **NEW**: Frequent nausea and vomiting can lead to serious medical complications, including dehydration, nutrient deficiencies, electrolyte imbalances, and esophageal damage. These conditions require medical intervention.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Translation A is more concise and uses 'esophageal damage', which is more natural in a medical/UX context than the slightly more wordy 'damage to the oesophagus' in B. Both are excellent, but A feels more professional.
  - [old/style/minor] Uses British spelling 'oesophagus' and a slightly more wordy construction 'damage to the...' instead of the more direct 'esophageal damage'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and professional for a medical context. 'Esophageal damage' is a more natural noun phrase than 'damage to the oesophagus', and 'medical intervention' is a more precise term for the original 'медицинского вмешательства' in this context.
  - [old/style/minor] Uses British spelling 'oesophagus' and a slightly wordier construction 'damage to the...'; B uses the more standard US English 'esophageal' which fits the target market better.
  - [old/style/minor] Missing Oxford comma, which is preferred in professional/medical US English for clarity.

#### 🟢 en `/steps_description/6/text` — NEW лучше (2:0)

- **RU**: Воздержание от продуктов, богатых углеводами, может быть связано с расстройствами пищевого поведения, такими как анорексия и орторексия. Люди могут избегать этих продуктов из-за страха набрать вес или из-за желания строго контролировать свой рацион.
- **OLD**: Avoiding foods rich in carbohydrates can be related to eating disorders such as anorexia and orthorexia. People may stay away from these foods because they fear gaining weight or want to keep strict control over their diet.
- **NEW**: Avoiding carbohydrate-rich foods can be associated with eating disorders such as anorexia and orthorexia. People may avoid these foods due to a fear of gaining weight or a desire to strictly control their diet.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and professional, using the idiomatic 'carbohydrate-rich foods' and 'due to', which fits the educational/CBT tone perfectly. Translation B is slightly more wordy and uses 'stay away from', which sounds a bit more casual/colloquial than the context requires.
  - [old/style/minor] The phrasing 'stay away from' and 'because they fear' is slightly less polished/academic than 'avoid' and 'due to a fear' for this type of psychoeducational text.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more professional and idiomatic for a mental health context, using 'associated with' and 'due to a fear of', whereas A sounds slightly more colloquial and repetitive.
  - [old/style/minor] 'stay away from' is a bit too informal for this topic compared to 'avoid', and 'because they fear' is less elegant than 'due to a fear of'.

#### 🟢 en `/steps_description/21/text` — NEW лучше (2:0)

- **RU**: Сладости могут вызвать быстрый подъем уровня сахара в крови, за которым следует резкий спад. Это может способствовать возникновению чувства усталости, раздражительности и депрессии, что в свою очередь усиливает тревожность.
- **OLD**: Sweets can cause a rapid rise in blood sugar followed by a sharp drop. This can contribute to feelings of fatigue, irritability and low mood, which in turn can intensify anxiety.
- **NEW**: Sweets can cause a rapid spike in blood sugar levels, followed by a sharp crash. This can contribute to feelings of fatigue, irritability, and depression, which in turn can increase anxiety.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A uses much more natural, idiomatic English for this context ('spike' and 'crash' are the standard ways to describe blood sugar fluctuations), whereas B is slightly more literal and clinical.
  - [old/style/minor] Using 'rise' and 'drop' is grammatically correct but less idiomatic than 'spike' and 'crash' in a health/wellness context.
  - [old/mistranslation/minor] Translated 'депрессия' as 'low mood'; while 'low mood' is a common CBT term, it is a softening of the original 'depression' which might be intentional, but 'depression' is more accurate to the source text.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses much more natural, idiomatic English for describing blood sugar fluctuations ('spike' and 'crash'). While A is grammatically correct, B sounds like it was written by a native speaker.
  - [old/style/minor] Uses 'rise' and 'drop' which are correct but less idiomatic in this context than 'spike' and 'crash'.
  - [old/terminology/minor] Uses 'low mood' instead of 'depression', which is a softer term; while safer in CBT, the original specifically used 'депрессия'.

#### 🟢 en `/steps_description/3/text` — NEW лучше (2:0)

- **RU**: Приступы неконтролируемого переедания являются основным симптомом компульсивного переедания и булимии. Во время таких эпизодов человек может поглощать большие количества пищи в короткий промежуток времени, испытывая при этом чувство потери контроля.
- **OLD**: Episodes of uncontrolled overeating are a key symptom of binge eating disorder and bulimia. During such episodes, a person may consume large amounts of food in a short period of time while feeling unable to stop.
- **NEW**: Episodes of uncontrolled overeating are a core symptom of binge eating disorder and bulimia. During these episodes, a person may consume large amounts of food in a short period, experiencing a sense of loss of control.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more accurate to the original meaning and uses more professional, idiomatic phrasing. Translation B changes the meaning of the final phrase from 'loss of control' to 'unable to stop', which is a subtle but important distinction in clinical descriptions.
  - [old/mistranslation/minor] The phrase 'feeling unable to stop' is a slight deviation from the original 'чувство потери контроля' (sense of loss of control).
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more accurate to the original meaning and uses more professional, idiomatic phrasing. Translation A changes 'feeling a loss of control' to 'feeling unable to stop', which is a slight semantic shift.
  - [old/mistranslation/minor] The phrase 'feeling unable to stop' is a simplification of 'feeling a loss of control' (чувство потери контроля).

#### 🟡 en `/steps_description/1/fact`— вердикт неустойчив

- **RU**: Воздержание от еды может вызывать чувство контроля, которое временно снижает тревожность, связанную с весом и телом. Однако это также может привести к усилению тревожности и депрессии из-за физического недомогания и психологического дискомфорта.
- **OLD**: Restricting food intake can create a sense of control that temporarily reduces anxiety about weight and body image. However, over time it can increase anxiety and depression due to physical strain and psychological distress.
- **NEW**: Restricting food can create a sense of control that temporarily reduces anxiety related to weight and body image. However, it can also lead to increased anxiety and depression due to physical malaise and psychological discomfort.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and idiomatic for a mental health context. 'Physical strain' and 'psychological distress' are standard, professional terms, whereas 'physical malaise' and 'psychological discomfort' in B feel slightly clunky and literal.
  - [new/style/minor] The phrasing 'physical malaise' is a bit heavy/medical and 'psychological discomfort' is a weak, literal translation of 'психологический дискомфорт'.
  - [new/style/minor] The flow is slightly interrupted by the placement of 'also' compared to the more elegant 'over time it can increase' in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original structure and vocabulary, specifically using 'malaise' and 'discomfort' which accurately reflect the Russian 'недомогание' and 'дискомфорт'.
  - [old/mistranslation/minor] The phrase 'over time' is an addition not present in the original text.
  - [old/style/minor] The choice of 'strain' and 'distress' is slightly more dramatic than the original 'недомогание' and 'дискомфорт'.

#### 🟡 en `/steps_description/5/fact`— вердикт неустойчив

- **RU**: Подсчет калорий может стать доминирующей мыслью и мешать нормальному питанию и социальным взаимодействиям. Это может привести к социальной изоляции, избеганию мероприятий, связанных с едой, и усугублению психического состояния.
- **OLD**: Calorie counting can come to dominate a person’s thinking and disrupt normal eating and social life. It can contribute to social withdrawal, avoidance of food-related events and worsening mental health.
- **NEW**: Calorie counting can become a dominant thought, interfering with normal eating and social interactions. This can lead to social isolation, avoiding food-related events, and worsening one’s mental well-being.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Translation A is more concise and flows better as a single cohesive thought. Translation B suffers from a slight grammatical mismatch in the final list (parallelism issue) and uses 'social life' which is slightly less precise than 'social interactions' in this clinical context.
  - [old/style/minor] The list 'social withdrawal, avoidance... and worsening' lacks parallel structure; 'worsening' is a gerund while the others are nouns.
  - [old/style/minor] 'Social life' is a bit more casual than the original 'социальным взаимодействиям' (social interactions).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A sounds more natural and idiomatic for a mental health context. Translation B uses 'dominant thought', which sounds slightly more clinical/literal, and 'social interactions' is a bit more formal/stiff than 'social life' in this context.
  - [new/style/minor] The phrasing 'become a dominant thought' is a bit clunky compared to 'come to dominate thinking'.
  - [new/style/minor] The list 'social isolation, avoiding..., and worsening...' lacks perfect parallel structure (noun, gerund, gerund).

#### 🟡 en `/steps_description/11/text`— вердикт неустойчив

- **RU**: Обсессивные мысли о калориях и весе могут усиливать тревожность и стресс, связанные с физической активностью. Люди могут чувствовать вину или стыд, если не достигают определенного уровня физической активности или если не сжигают достаточное количество калорий.
- **OLD**: Obsessive thoughts about calories and weight can heighten anxiety and stress related to physical activity. People may feel guilty or ashamed if they do not reach their exercise targets or do not burn “enough” calories.
- **NEW**: Obsessive thoughts about calories and weight can increase anxiety and stress related to physical activity. People may feel guilt or shame if they don’t reach a certain level of activity or if they don’t burn enough calories.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A uses more sophisticated and natural vocabulary ('heighten' vs 'increase', 'guilty or ashamed' vs 'guilt or shame') which fits the professional yet supportive tone. Translation B's use of 'guilt or shame' as nouns is grammatically correct but feels slightly more clinical/stiff than the adjective form used in A.
  - [new/style/minor] The noun forms 'guilt or shame' are less idiomatic in this context than the adjectives 'guilty or ashamed'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more faithful to the original text and follows the UX guidelines regarding contractions. Translation B introduces unnecessary quotation marks around 'enough' and changes 'level of physical activity' to 'exercise targets', which is an addition not present in the source.
  - [old/addition/minor] added quotation marks around 'enough' which changes the tone and isn't in the original
  - [old/mistranslation/minor] changed 'level of physical activity' to 'exercise targets', which is a specific interpretation not found in the source

#### 🟢 en `/steps_description/25/fact` — NEW лучше (2:0)

- **RU**: Наслаждение едой может улучшить настроение и снизить уровень стресса. Когда мы получаем удовольствие от еды, в нашем организме высвобождаются эндорфины, которые способствуют ощущению счастья и удовлетворенности.
- **OLD**: Enjoying food can improve mood and reduce stress. When we take pleasure in what we eat, the body releases endorphins that promote feelings of happiness and satisfaction.
- **NEW**: Enjoying food can improve your mood and reduce stress levels. When we enjoy eating, our bodies release endorphins, which promote feelings of happiness and satisfaction.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B sounds more natural and follows the UX guidelines better by using 'your mood' and 'our bodies', creating a warmer, more personal connection. Translation A is grammatically correct but feels slightly more detached and clinical due to the use of 'the body'.
  - [old/style/minor] Use of 'the body' instead of 'our bodies' makes the tone slightly more academic/detached than the desired 'understanding friend' tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and follows the UX guidelines by using 'your mood' instead of the slightly more detached 'mood'. It also maintains a better rhythmic flow for a supportive, expert-friend tone.
  - [old/style/minor] The phrase 'take pleasure in what we eat' is slightly more wordy and formal than the more direct 'enjoy eating' or 'enjoy food'.
  - [old/style/minor] Missing the possessive 'your' before 'mood' makes it sound a bit more like a textbook than a supportive app.

#### 🔴 en `/steps_description/18/text` — OLD лучше (2:0)

- **RU**: Самоконтроль в вопросах питания может быть как положительным, так и отрицательным фактором. В контексте расстройств пищевого поведения, таких как анорексия или орторексия, чрезмерный самоконтроль может привести к строгим ограничениям в питании и нездоровым пищ…
- **OLD**: Self-control around food can be both helpful and harmful. In the context of eating disorders such as anorexia or orthorexia, excessive self-control can lead to strict food restrictions and unhealthy eating patterns.
- **NEW**: Self-control regarding food can be both a positive and a negative factor. In the context of eating disorders like anorexia or orthorexia, excessive self-control can lead to strict dietary restrictions and unhealthy eating habits.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses more natural, idiomatic English ('helpful and harmful' instead of the clunky 'positive and negative factor') and better word choices ('eating patterns' vs 'eating habits').
  - [new/style/minor] The phrase 'positive and negative factor' sounds slightly academic/translated; 'helpful and harmful' is more fluid for a mental health context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows better for a mental health context. 'Helpful and harmful' is a much more natural and less clinical way to express 'positive and negative factor' in English, whereas B feels like a direct translation of the Russian structure.
  - [new/style/minor] The phrase 'both a positive and a negative factor' is slightly wordy and sounds like a literal translation (calque) of the Russian 'как положительным, так и отрицательным фактором'.

