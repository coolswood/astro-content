# QA: слепое парное сравнение переводов — en-final-g67-bipolar

- **Дата**: 2026-09-18T21:18:26.839Z
- **Метка**: en-final-g67-bipolar
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: tests/bipolar.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/bipolar.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 14 | 🔴 2 | ⚪ 1 | 🟡 3 | 0 / 2 | 88% |
| **итого** | 20 | 🟢 14 | 🔴 2 | ⚪ 1 | 🟡 3 | 0 / 2 | 88% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×4; OLD — style/minor×15, style/major×7, terminology/minor×1, mistranslation/critical×1, addition/major×1, addition/critical×1, mistranslation/major×1, terminology/major×1, addition/minor×1, mistranslation/minor×1

### Детали пар (для спот-чека)

#### ⚪ en `/steps_description/12/text`— ничья (2:0)

- **RU**: Исследования показывают, что примерно 20% людей с биполярным расстройством испытывают серьёзные финансовые проблемы в результате своего поведения во время маниакальных фаз.
- **OLD**: Research shows that about 20% of people with bipolar disorder experience serious financial problems as a result of their behavior during manic phases.
- **NEW**: Studies show that approximately 20% of people with bipolar disorder experience serious financial problems as a result of their behavior during manic phases.
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 95 / NEW 95)
  - Both translations are excellent, grammatically perfect, and follow the professional tone required for psychoeducation. The difference between 'Research shows' and 'Studies show' is purely stylistic and carries no significant weight in this context.
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Both translations are excellent, idiomatic, and perfectly capture the original meaning without any errors. The difference between 'Studies show' and 'Research shows' is purely stylistic and both are equally natural for a professional yet accessible tone.

#### 🔴 en `/steps_description/3/text` — OLD лучше (2:0)

- **RU**: Во время маниакальных или гипоманиакальных эпизодов биполярного расстройства часто наблюдается уменьшенная потребность в сне. Люди могут чувствовать себя полными энергии даже после всего нескольких часов сна.
- **OLD**: During manic or hypomanic episodes of bipolar disorder, there is often a reduced need for sleep. Individuals can feel fully energized even after just a few hours of sleep.
- **NEW**: During manic or hypomanic episodes of bipolar disorder, a decreased need for sleep is often observed. People may feel full of energy even after only a few hours of sleep.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds more natural and professional for a mental health context. 'Reduced need for sleep' is a more idiomatic medical collocation than 'decreased need', and 'fully energized' flows better than 'full of energy'.
  - [new/style/minor] The passive construction 'is often observed' is grammatically correct but slightly more clinical/stiff than the more direct 'there is often' in B.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and less academic. Translation B uses 'is often observed', which is a passive, heavy construction (translationese) compared to the smoother 'there is often' in A.
  - [new/style/minor] The passive voice 'is often observed' makes the text feel like a dry medical textbook rather than a supportive expert tone.

#### 🟢 en `/steps_description/10/fact` — NEW лучше (2:0)

- **RU**: Мэрилин Монро, чья жизнь и карьера были полны скандалов, связанных с её личной жизнью, предположительно страдала от биполярного расстройства. Её поведение, в том числе в сексуальной сфере, часто становилось объектом общественного осуждения и спекуляций.
- **OLD**: Marilyn Monroe, whose life and career were full of scandals related to her personal life, is believed to have suffered from bipolar disorder. Her behavior, including in the sexual realm, often became the subject of public condemnation and speculation.
- **NEW**: Marilyn Monroe, whose life and career were marked by personal scandals, is believed to have suffered from bipolar disorder. Her behavior, including her sex life, often became a subject of public scrutiny and speculation.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is much more idiomatic and flows naturally. Translation B contains clunky, literal translations like 'full of scandals related to her personal life' and 'in the sexual realm', which sound like a translation rather than native English prose.
  - [old/style/major] 'full of scandals related to her personal life' is wordy and repetitive; 'marked by personal scandals' in A is much more elegant.
  - [old/style/major] 'in the sexual realm' is an unnatural, overly formal way to describe sex life in this context.
  - [old/style/minor] 'public condemnation' is a bit heavier than the original 'осуждение' (scrutiny/criticism) in a biographical context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is much more idiomatic and natural for a native speaker. Translation A uses heavy, slightly clunky phrasing like 'full of scandals related to her personal life' and 'sexual realm', which sounds like a literal translation from Russian.
  - [old/style/minor] 'full of scandals related to her personal life' is wordy; 'sexual realm' is an unnatural, overly formal way to describe sexuality in this context.

#### 🟡 en `/steps_description/0/text`— вердикт неустойчив

- **RU**: Во время маниакальной фазы биполярного расстройства люди могут испытывать необычно высокий уровень энергии, эйфорию или раздражительность. Это состояние сильно отличается от их обычного поведения, что может вызывать непонимание и даже конфликты с окружающими.
- **OLD**: During the manic phase of bipolar disorder, individuals may experience unusually high levels of energy, euphoria, or irritability. This state significantly differs from their usual behavior, potentially causing misunderstandings and even conflicts with others.
- **NEW**: During a manic phase of bipolar disorder, people may experience unusually high energy levels, euphoria, or irritability. This state differs significantly from their typical behavior, which can lead to misunderstandings or even conflicts with others.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more professional and natural for a psychoeducational text. The use of 'individuals' and the participial phrase 'potentially causing' creates a smoother, more sophisticated flow than the slightly clunky 'which can lead to' in A.
  - [new/style/minor] The construction 'which can lead to' is grammatically correct but feels a bit more basic/repetitive compared to the more elegant 'potentially causing' in B.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B sounds more natural and fluid for a psychoeducational text. The use of 'people' instead of the more clinical 'individuals' fits the 'understanding friend' tone better, and 'typical behavior' is a more idiomatic pairing than 'usual behavior'.
  - [old/style/minor] The use of 'individuals' sounds slightly more clinical/academic than the target warm tone, and 'usual behavior' is less idiomatic than 'typical behavior' in this context.

#### 🟡 en `/steps_description/1/text`— вердикт неустойчив

- **RU**: Раздражительность часто встречается в маниакальной и гипоманиакальной фазах биполярного расстройства. Она может быть настолько выраженной, что приводит к импульсивным действиям и конфликтам, которые нормально не характерны для человека.
- **OLD**: Irritability is common during the manic and hypomanic phases of bipolar disorder. It can be so pronounced that it leads to impulsive actions and conflicts that are normally uncharacteristic of the individual.
- **NEW**: Irritability is common during the manic and hypomanic phases of bipolar disorder. It can be so pronounced that it leads to impulsive actions and conflicts that are not typical for the person.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Translation A is more natural and avoids the clunky, overly formal phrasing of Translation B. 'Not typical for the person' is smoother in this context than 'normally uncharacteristic of the individual'.
  - [old/style/minor] The phrase 'normally uncharacteristic of the individual' is wordy and sounds like a clinical report rather than a supportive, readable text.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'uncharacteristic of the individual', which sounds more professional and idiomatic for a psychological context. Translation B's 'not typical for the person' is grammatically correct but feels slightly more colloquial and less precise.
  - [new/style/minor] The phrasing 'not typical for the person' is a bit clunky compared to the more natural 'uncharacteristic' in a clinical/educational context.

#### 🟢 en `/steps_description/8/text` — NEW лучше (2:0)

- **RU**: Исследования показывают, что до 90% людей с биполярным расстройством испытывают маниакальные эпизоды, которые повышают их продуктивность и работоспособность, но также могут вести к последующим депрессивным периодам из-за переутомления.
- **OLD**: Research shows that up to 90% of people with bipolar disorder experience manic episodes that enhance their productivity and work capacity, but can also lead to subsequent depressive periods due to overexertion.
- **NEW**: Research shows that up to 90% of people with bipolar disorder experience manic episodes that boost their productivity and work capacity, but these can also lead to subsequent depressive periods due to exhaustion.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A uses 'exhaustion', which is the most natural and idiomatic way to describe the state resulting from overworking in a mental health context. Translation B uses 'overexertion', which sounds slightly more clinical or physical (like overexerting muscles).
  - [old/style/minor] overexertion is less idiomatic than exhaustion for describing mental/emotional burnout in this context
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B uses more natural, idiomatic verbs ('boost' instead of 'enhance') and a more appropriate term for the context ('exhaustion' instead of 'overexertion').
  - [old/style/minor] 'enhance' is slightly more formal/academic, and 'overexertion' sounds a bit more like a physical strain in a medical context rather than the mental/physical state of exhaustion.

#### 🔴 en `/steps_description/0/fact` — OLD лучше (2:0)

- **RU**: По данным Всемирной организации здравоохранения, биполярное расстройство затрагивает около 45 миллионов человек в мире. Маниакальные эпизоды могут варьироваться по продолжительности и тяжести, но обычно они длительные и значительно влияют на поведение и социал…
- **OLD**: According to the World Health Organization, bipolar disorder affects about 45 million people worldwide. Manic episodes can vary in duration and severity but are usually prolonged and significantly impact behavior and social interactions.
- **NEW**: According to the World Health Organization, bipolar disorder affects approximately 45 million people worldwide. Manic episodes can vary in duration and severity, but they typically impact behavior and social interactions significantly.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more idiomatic and flows better for a professional article. The use of 'prolonged' is a more natural fit for describing episodes than 'they are typically long' (implied by 'typically impact'), and the sentence structure in B is more cohesive.
  - [new/style/minor] The structure 'but they typically impact... significantly' is grammatically correct but feels slightly more fragmented and less sophisticated than the streamlined version in B.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A is more precise and complete, preserving the original nuance regarding the length of episodes ('prolonged'). Translation B omits the fact that episodes are long, which is a key descriptive element of the original text.
  - [new/omission/major] The phrase 'но обычно они длительные' (but they are usually prolonged/long) is completely missing, which changes the clinical description.

#### 🟢 en `/steps_description/6/fact` — NEW лучше (2:0)

- **RU**: Чувствительность к стимулам может привести к избеганию определённых мест или ситуаций, что иногда ошибочно воспринимается как антисоциальное поведение. На самом деле это защитная реакция человека на перегрузку сенсорных входов.
- **OLD**: Sensitivity to stimuli can lead to avoiding certain places or situations, which is sometimes mistakenly perceived as antisocial behavior. In reality, it’s a protective reaction of the person to sensory overload.
- **NEW**: Sensitivity to stimuli can lead to avoiding certain places or situations, which is sometimes misinterpreted as antisocial behavior. In reality, it is often a protective response to sensory overload.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more idiomatic and professional. Translation B contains a clunky, literal translation of 'защитная реакция человека' (protective reaction of the person), which sounds unnatural in English; 'protective response' is the standard psychological term.
  - [old/style/major] The phrase 'protective reaction of the person' is a heavy calque from Russian; in English, 'a protective response' or 'a person's protective response' is much more natural.
  - [old/style/minor] While 'mistakenly perceived' is correct, 'misinterpreted' in A is more concise and flows better in this context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and professional. 'Misinterpreted' is a better fit than 'mistakenly perceived', and 'protective response' sounds more natural in a psychological context than 'protective reaction of the person'.
  - [old/style/minor] The phrase 'protective reaction of the person' is slightly wordy and sounds like a translation from Russian; 'protective response' is more concise and natural.
  - [old/style/minor] 'Mistakenly perceived' is grammatically correct but 'misinterpreted' is more precise and common in this context.

#### 🟢 en `/steps_description/5/fact` — NEW лучше (2:0)

- **RU**: Интересно, что некоторые исследования показали, что ускоренное мышление может способствовать креативности. Например, многие известные художники и писатели, которые страдали биполярным расстройством, отмечали периоды повышенной творческой продуктивности во врем…
- **OLD**: Interestingly, some studies have shown that accelerated thinking can contribute to creativity. For example, many famous artists and writers who suffered from bipolar disorder reported periods of increased creative productivity during manic phases.
- **NEW**: Interestingly, some research suggests that racing thoughts can contribute to creativity. For example, many famous artists and writers who lived with bipolar disorder noted periods of heightened creative productivity during manic phases.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B uses much more natural, idiomatic English for a mental health context. 'Racing thoughts' is the standard way to describe accelerated thinking in psychiatry, and 'lived with' is more empathetic and modern than 'suffered from'.
  - [old/terminology/minor] 'accelerated thinking' is a literal translation; 'racing thoughts' is the idiomatic term for this sensation.
  - [old/style/minor] 'suffered from' is slightly outdated/stigmatizing compared to the person-first 'lived with'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A uses much more natural, idiomatic English ('racing thoughts', 'lived with') and avoids the clinical/heavy feel of Translation B. Translation B uses 'suffered from', which is outdated and carries a negative stigma, whereas 'lived with' is the modern, supportive standard.
  - [old/style/major] The phrase 'suffered from' is stigmatizing; 'lived with' (used in A) is the preferred modern way to describe living with a condition.
  - [old/style/minor] 'Accelerated thinking' sounds like a literal translation of 'ускоренное мышление' and is less idiomatic in a psychological context than 'racing thoughts'.

#### 🟢 en `/result/extreme/text` — NEW лучше (2:0)

- **RU**: Ваш результат может указывать на выраженные перепады настроения, которые заметно влияют на повседневную жизнь. Периоды повышенной активности, энергии и импульсивности могут сменяться эпизодами подавленности, усталости и утраты интереса к привычным занятиям. Та…
- **OLD**: Your responses indicate a high likelihood of having bipolar disorder. You likely experience intense and frequent mood swings that significantly affect your everyday life. These episodes may alternate with periods of deep depression, when you may feel severe de…
- **NEW**: Your results may indicate significant mood swings that noticeably affect your daily life. Periods of increased activity, energy, and impulsivity may be followed by episodes of depression, fatigue, and a loss of interest in usual activities. These states can im…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 40 / NEW 95)
  - Translation A is a faithful, professional, and accurate rendering of the original text. Translation B is a massive hallucination that adds a specific medical diagnosis (bipolar disorder) and numerous symptoms not present in the source, which is a critical error in a mental health context.
  - [old/mistranslation/critical] Added a specific diagnosis 'bipolar disorder' which is not in the original text.
  - [old/addition/major] Added many details not present in the source: hopelessness, sleep/appetite/concentration problems, and specific social/work difficulties.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 55 / NEW 98)
  - Translation B is a faithful and professional rendering of the original text. Translation A is a massive overreach that adds a medical diagnosis (bipolar disorder) and several symptoms not present in the source, which violates the core principle of accuracy and the CBT principle of avoiding direct diagnostic labeling.
  - [old/mistranslation/critical] The original says 'results may indicate mood swings', but A explicitly diagnoses 'bipolar disorder', which is a dangerous medical overstep.
  - [old/addition/major] Added information about sleep, appetite, concentration, and specific relationship difficulties that are not in the source text.
  - [old/style/minor] The tone becomes overly clinical and heavy compared to the original's supportive tone.

#### 🟢 en `/steps_description/7/text` — NEW лучше (2:0)

- **RU**: Периоды необычайного прилива сил и повышенной продуктивности являются характерными признаками гипоманиакальных и маниакальных фаз биполярного расстройства. В эти периоды люди могут чувствовать себя необычайно энергичными, способными на многие достижения, что ч…
- **OLD**: Periods of unusual energy surge and increased productivity are characteristic signs of the hypomanic and manic phases of bipolar disorder. During these periods, people may feel extraordinarily energetic, capable of many achievements, which often leads to the i…
- **NEW**: Periods of extraordinary energy surges and increased productivity are characteristic of the hypomanic and manic phases of bipolar disorder. During these times, people may feel unusually energetic and capable of achieving a great deal, often leading them to sta…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B sounds much more natural and idiomatic for a mental health article. Translation A suffers from heavy noun-stacking ('unusual energy surge') and a clunky, overly formal ending ('the initiation of many new projects') which reads like a literal translation.
  - [old/style/major] The phrase 'unusual energy surge' is awkward; 'extraordinary energy surges' or 'surges of energy' is better. 'The initiation of many new projects' is overly bureaucratic/formal (канцелярит).
  - [old/style/minor] The structure 'capable of many achievements' is grammatically correct but less fluid than 'capable of achieving a great deal'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A sounds natural and flows like high-quality English psychoeducation, whereas Translation B is heavy with noun-based constructions ('initiation of many new projects') and awkward phrasing ('capable of many achievements').
  - [old/style/major] The phrase 'capable of many achievements' is a clunky calque; 'capable of achieving a great deal' is much more idiomatic.
  - [old/style/minor] The use of 'initiation of many new projects' is overly formal and bureaucratic (nominalization), making the text feel like a dry medical report rather than supportive content.

#### 🟢 en `/steps_description/11/text` — NEW лучше (2:0)

- **RU**: Во время маниакальной фазы человек с биполярным расстройством может испытывать заметное снижение способности адекватно оценивать риски. Это объясняется изменениями в функционировании лобных долей мозга, отвечающих за планирование, решение проблем и контроль им…
- **OLD**: During the manic phase, a person with bipolar disorder may experience a noticeable decrease in the ability to adequately assess risks. This is explained by changes in the functioning of the frontal lobes of the brain, responsible for planning, problem-solving,…
- **NEW**: During a manic phase, a person with bipolar disorder may experience a noticeable decline in their ability to assess risks accurately. This is due to changes in the functioning of the frontal lobes, which are responsible for planning, problem-solving, and impul…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and flows better for a native speaker. The use of 'decline in their ability' and 'This is due to' sounds more natural in a psychoeducational context than the slightly more clinical/clunky 'decrease in the ability' and 'This is explained by' used in A.
  - [old/style/minor] The phrasing 'decrease in the ability' and 'This is explained by' is grammatically correct but feels slightly more like a direct translation from Russian than natural English prose.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation A sounds more natural and idiomatic for a mental health article. Translation B uses slightly clunky, literal phrasing ('This is explained by' instead of 'This is due to') and lacks the smooth flow of a native writer.
  - [old/style/minor] The phrase 'This is explained by' is a bit heavy/academic compared to the more natural 'This is due to'.
  - [old/style/minor] The structure 'frontal lobes of the brain, responsible for...' is grammatically correct but slightly more wordy/clunky than the version in A.

#### 🟢 en `/steps` — NEW лучше (2:0)

- **RU**: Бывали ли у вас периоды очень хорошего настроения, когда вы вели себя не так, как обычно, и это удивляло других? Случалось ли вам испытывать настолько сильное раздражение, что это приводило к ссорам или конфликтам с близкими? Бывали ли у вас периоды, когда вы …
- **OLD**: Have you ever experienced unusually elevated moods that noticeably changed your behavior and caused misunderstandings with others? Have you ever felt such strong irritability that you ended up in conflicts or arguments with close people? Have you noticed perio…
- **NEW**: Have you had periods of very high mood where you acted differently than usual, surprising those around you? Have you ever felt so irritable that it led to arguments or conflicts with loved ones? Have you had periods when you felt much more confident than usual…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation B sounds natural, warm, and conversational, perfectly matching the 'understanding friend' tone. Translation A is overly clinical and uses heavy, unnatural phrasing (e.g., 'unreasonably high self-confidence in yourself', 'increased sensitivity to surrounding stimuli').
  - [old/style/major] The tone is too academic/clinical for a supportive app; it feels like a medical textbook rather than a conversation.
  - [old/style/minor] Redundant phrasing: 'self-confidence in yourself'.
  - [old/style/minor] Phrasing like 'unusual surge in energy' is missing an article ('an unusual surge').
  - [old/style/minor] The translation of 'всё вокруг слишком отвлекало' as 'increased sensitivity to surrounding stimuli' is a heavy clinical paraphrase.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A is much more natural and follows the 'understanding friend' tone. Translation B suffers from heavy 'translationese', redundant phrasing (e.g., 'self-confidence in yourself'), and clinical/stiff wording that feels unnatural for a supportive app.
  - [old/style/major] Redundant phrasing like 'self-confidence in yourself' and 'libido in yourself' is non-idiomatic.
  - [old/style/major] Uses overly formal/stiff constructions like 'committed actions' instead of 'done things' or 'engaged in behavior'.
  - [old/style/minor] The phrase 'increased sensitivity to surrounding stimuli' is too clinical/academic compared to the original's simple 'everything around you was too distracting'.
  - [old/mistranslation/minor] The first sentence adds 'caused misunderstandings', which is an addition not present in the original 'surprised others'.

#### 🟢 en `/steps_description/9/fact` — NEW лучше (2:0)

- **RU**: Робин Уильямс, который страдал биполярным расстройством, известен своим экстравертированным поведением и любовью к общению. Однако его близкие часто отмечали, что в периоды маниакальной активности его желание общаться могло достигать экстремальных форм.
- **OLD**: Robin Williams, who suffered from bipolar disorder, was known for his extroverted behavior and love of communication. However, his close ones often noted that during periods of manic activity, his desire to communicate could reach extreme levels.
- **NEW**: Robin Williams, who lived with bipolar disorder, was known for his extroverted personality and love of connection. However, those close to him often noted that during manic periods, his desire to socialize could reach extreme levels.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A uses much more natural, idiomatic English ('lived with', 'love of connection', 'socialize'). Translation B contains several 'translationese' markers and awkward phrasing ('suffered from' is less modern/supportive than 'lived with', 'close ones' is non-idiomatic, and 'love of communication' sounds like a business term).
  - [old/style/major] 'close ones' is an unnatural way to refer to family/friends; 'those close to him' is the standard idiom.
  - [old/style/minor] 'love of communication' and 'desire to communicate' sound clinical or robotic compared to 'love of connection' and 'desire to socialize'.
  - [old/style/minor] 'suffered from' is slightly more stigmatizing than the preferred 'lived with' in modern mental health contexts.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B uses much more natural, idiomatic English ('lived with', 'those close to him', 'socialize') compared to the slightly clunky and literal 'suffered from', 'close ones', and 'communication' in Translation A.
  - [old/style/minor] 'close ones' is unnatural; 'those close to him' is the standard idiom. 'Love of communication' sounds like a business skill rather than a social trait. 'Suffered from' is acceptable but 'lived with' is more modern and empathetic in a mental health context.
  - [old/style/minor] 'extroverted behavior' is a bit clinical/stiff; 'extroverted personality' (as in B) flows better.

#### 🟢 en `/result/light/text` — NEW лучше (2:0)

- **RU**: Ваши ответы могут указывать на выраженные колебания настроения, выходящие за рамки обычных эмоциональных реакций. В периоды подъёма вы можете ощущать повышенную энергию, уверенность, активность и быстрый поток мыслей. В другие периоды возможно снижение настрое…
- **OLD**: Your responses indicate a moderate likelihood of having bipolar disorder. You may notice significant mood swings that extend beyond usual emotional responses to life events. In high periods, you may feel unusually confident, sociable, and full of ideas. You mi…
- **NEW**: Your answers may indicate significant mood swings that go beyond typical emotional reactions. During high periods, you may feel increased energy, confidence, activity, and racing thoughts. In other periods, you may experience a drop in mood, energy, and motiva…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 95)
  - Translation A contains a major mistranslation by adding a medical diagnosis ('bipolar disorder') that is not present in the original text, which is a critical error in psychological content. Translation B is a faithful, natural, and professionally written version that adheres to all tone and terminology guidelines.
  - [old/addition/critical] Added 'moderate likelihood of having bipolar disorder', which is not in the original and is medically irresponsible to add without authorization.
  - [old/mistranslation/major] Added specific symptoms like 'sociable', 'speak faster', and 'impulsive decisions' which are not in the source text.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 50 / NEW 98)
  - Translation A is a faithful, professional, and accurate rendering of the original text. Translation B is a massive hallucination/addition that introduces a medical diagnosis (bipolar disorder) and specific symptoms not present in the source.
  - [old/addition/critical] Added 'moderate likelihood of having bipolar disorder' which is not in the original.
  - [old/mistranslation/critical] Completely changed the meaning by turning a general observation into a clinical diagnosis.
  - [old/addition/major] Added specific symptoms like 'sociable', 'speak faster', 'easily distracted', and 'impulsive decisions' that are absent from the source.

#### 🟡 en `/steps_description/3/fact`— вердикт неустойчив

- **RU**: Томас Эдисон часто утверждал, что спит всего четыре часа в сутки и чувствует себя отдохнувшим и энергичным. Хотя Эдисон не был диагностирован с биполярным расстройством, его привычки и интенсивные периоды работы могут напоминать гипоманиакальные эпизоды.
- **OLD**: Thomas Edison often claimed to sleep only four hours a day and felt rested and energetic. Although Edison was not diagnosed with bipolar disorder, his sleep habits and intense work periods may resemble hypomanic episodes.
- **NEW**: Thomas Edison often claimed to sleep only four hours a day while feeling rested and energetic. While Edison was not diagnosed with bipolar disorder, his habits and intense periods of work may resemble hypomanic episodes.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more precise and maintains the original sentence structure. Translation B introduces a slight logical shift by using 'while', which implies he felt energetic *at the same time* as sleeping, whereas the original describes the result of his sleep habits.
  - [new/style/minor] The use of 'while' creates a slightly different logical connection than the original 'and' (result/state), and 'periods of work' is slightly less idiomatic than 'work periods'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and flows better by using 'while feeling' to connect the two states. Translation B's use of 'and felt' creates a slightly clunky, repetitive structure.
  - [old/style/minor] The structure 'claimed to sleep... and felt' is grammatically acceptable but less fluid than the participial phrase in A.

#### 🟢 en `/steps_description/5/text` — NEW лучше (2:0)

- **RU**: Одним из симптомов маниакальной фазы биполярного расстройства является ускоренное мышление, известное как "мыслительный шквал" или "идейный поток". Это состояние, когда мысли сменяют друг друга с высокой скоростью, и человеку трудно сосредоточиться на одной за…
- **OLD**: One of the symptoms of the manic phase of bipolar disorder is accelerated thinking, known as “thought racing” or “idea flow.” This is a state where thoughts replace each other at high speed, making it difficult for the person to focus on a single task.
- **NEW**: One symptom of a manic phase in bipolar disorder is racing thoughts, often described as a “flight of ideas.” This is a state where thoughts follow one another at high speed, making it difficult to focus on a single task.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 72 / NEW 96)
  - Translation A uses the correct, idiomatic clinical term 'flight of ideas' and the natural expression 'racing thoughts'. Translation B uses literal, clunky translations ('accelerated thinking', 'thought racing', 'idea flow') that sound like non-native calques.
  - [old/terminology/major] Used 'accelerated thinking', 'thought racing', and 'idea flow' instead of the standard clinical terms 'racing thoughts' and 'flight of ideas'.
  - [old/style/minor] The phrase 'thoughts replace each other' is a literal translation of 'мысли сменяют друг друга' and sounds unnatural in English; 'follow one another' or 'race' is preferred.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation B uses the correct clinical terminology ('flight of ideas' and 'racing thoughts') which is standard in English-speaking psychiatry, whereas Translation A uses literal, non-idiomatic translations ('thought racing' and 'idea flow').
  - [old/terminology/major] “thought racing” and “idea flow” are non-standard; the clinical terms are “racing thoughts” and “flight of ideas”.
  - [old/style/minor] “thoughts replace each other” is a bit clunky compared to the more natural “thoughts follow one another” or “thoughts race”.

#### 🟢 en `/result/extreme/title` — NEW лучше (2:0)

- **RU**: Высокая вероятность наличия биполярного расстройства
- **OLD**: High likelihood of having bipolar disorder
- **NEW**: High probability of bipolar disorder
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and follows standard medical/UX English for headings. Translation B is grammatically correct but slightly wordy due to the unnecessary 'having'.
  - [old/style/minor] The phrase 'likelihood of having' is slightly more heavy/verbose than the direct 'probability of' for a heading.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B is more concise and follows standard medical/psychological English conventions for reporting probabilities. Translation A is grammatically correct but sounds slightly wordy and 'translated' due to the 'likelihood of having' construction.
  - [old/style/minor] Unnecessarily wordy; 'likelihood of having' is less direct than 'probability of' in a clinical/diagnostic context.

#### 🟢 en `/result/normal/text` — NEW лучше (2:0)

- **RU**: Ваш результат указывает на отсутствие признаков биполярного расстройства. Вы способны переживать широкий спектр эмоций и реагируете на события в жизни достаточно устойчиво. Колебания настроения, которые вы испытываете, кажутся естественными и связаны с обстоят…
- **OLD**: Your emotional state is within normal limits, and there are no signs of bipolar disorder. You are capable of experiencing a wide range of emotions, responding adequately to various life situations. Your mood may change depending on the circumstances, but these…
- **NEW**: Your results indicate no signs of bipolar disorder. You’re able to experience a wide range of emotions and respond to life events with stability. The mood fluctuations you experience seem natural and are related to your circumstances. Remember that emotional h…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation B is much closer to the original text, follows the 'warm expert friend' tone, and uses appropriate contractions. Translation A adds unnecessary interpretations and filler phrases that weren't in the source.
  - [old/addition/minor] Added 'Your emotional state is within normal limits' which is not in the original.
  - [old/style/major] The phrasing 'the absence of bipolar disorder does not mean the absence of emotional ups and downs' is wordy, clinical, and deviates from the original's supportive tone.
  - [old/mistranslation/minor] Translated 'не вызывают значимого дискомфорта' as 'do not cause serious concerns', which changes the nuance of 'discomfort'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 72 / NEW 98)
  - Translation A is a faithful, professional, and natural rendering of the original text. Translation B introduces significant additions and interpretations (hallucinations) that were not in the source, such as 'within normal limits' and 'changes are usually moderate', which changes the tone and meaning.
  - [old/addition/major] Added 'Your emotional state is within normal limits' and 'changes are usually moderate', which are not in the original.
  - [old/style/major] The phrasing 'the absence of bipolar disorder does not mean the absence of emotional ups and downs' is wordy and deviates from the original's supportive tone.
  - [old/mistranslation/minor] The phrase 'responding adequately' is a bit clinical/judgmental compared to the original 'достаточно устойчиво'.

#### 🟢 en `/steps_description/4/fact` — NEW лучше (2:0)

- **RU**: Исследования показывают, что ускорение речи во время маниакальных эпизодов может быть связано с повышенной активностью в определенных областях мозга, таких как лобные доли. Эти области мозга важны для планирования и продукции речи, а также регуляции эмоций.
- **OLD**: Studies show that accelerated speech during manic episodes can be linked to increased activity in certain areas of the brain, such as the frontal lobes. These brain areas are important for planning and producing speech, as well as regulating emotions.
- **NEW**: Studies show that rapid speech during manic episodes may be linked to increased activity in certain brain areas, such as the frontal lobes. These areas are crucial for planning, speech production, and emotion regulation.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and professional, using concise noun phrases ('speech production', 'emotion regulation') typical of high-quality English scientific/educational writing, whereas A is slightly more wordy and repetitive.
  - [old/style/minor] The phrasing 'producing speech' and 'regulating emotions' is grammatically correct but less sophisticated than the nominalized forms used in B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more concise and uses professional, idiomatic medical/psychological phrasing ('speech production', 'emotion regulation'). Translation B is slightly more wordy and uses 'producing speech', which sounds less natural in a scientific context.
  - [old/style/minor] The phrasing 'planning and producing speech, as well as regulating emotions' is grammatically correct but more cumbersome than the noun-based approach in A.

