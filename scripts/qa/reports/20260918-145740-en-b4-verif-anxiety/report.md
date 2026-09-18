# QA: слепое парное сравнение переводов — en-b4-verif-anxiety

- **Дата**: 2026-09-18T11:57:40.775Z
- **Метка**: en-b4-verif-anxiety
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD~1
- **Файлы**: tests/anxiety.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 13
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 1f549a57d6a9ae578136320a65ad713e897102e8

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/anxiety.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 14 | 🔴 1 | ⚪ 0 | 🟡 5 | 0 / 0 | 93% |
| **итого** | 20 | 🟢 14 | 🔴 1 | ⚪ 0 | 🟡 5 | 0 / 0 | 93% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/major×1, style/minor×1; OLD — style/minor×20, omission/minor×3, mistranslation/minor×3, mistranslation/major×3, addition/minor×1, style/major×1

### Детали пар (для спот-чека)

#### 🟡 en `/steps_description/2/fact`— вердикт неустойчив

- **RU**: Исследования показывают, что около 2-3% взрослого населения мира страдают от панического расстройства каждый год. Женщины в два раза чаще мужчин подвержены этому состоянию.
- **OLD**: Studies show that about 2–3% of the adult population worldwide experience panic disorder each year. Women are about twice as likely as men to develop this condition.
- **NEW**: Studies show that about 2–3% of the adult population worldwide suffers from panic disorder each year. Women are twice as likely as men to experience this condition.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation A is more precise and idiomatic. In English, a population 'suffers from' a disorder, whereas 'experience' is slightly less formal for a statistical statement. Additionally, B adds 'about', which is not in the original text.
  - [old/addition/minor] added 'about' before 'twice as likely' which wasn't in the original
  - [old/style/minor] use of 'experience' for a population statistic is slightly weaker than 'suffers from'
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'experience' and 'develop', which sound more natural and clinically appropriate in modern English than the slightly heavier 'suffers from' and 'experience' used in B. The phrasing 'twice as likely as men to develop' is a very idiomatic way to express prevalence in medical/psychological contexts.
  - [new/style/minor] The repetition of 'experience' (used for the population and then for women) is less elegant than the varied vocabulary in A.

#### 🟢 en `/steps_description/6/text` — NEW лучше (2:0)

- **RU**: Головные боли, а также боли в шее и спине, могут быть вызваны рядом факторов, включая напряжение мышц, стресс, плохую осанку, длительное сидение или неправильное положение тела при работе за компьютером. Эти боли также могут быть симптомами тревожности, котора…
- **OLD**: Headaches and pain in the neck and back can be caused by many factors, including muscle tension, stress, poor posture, prolonged sitting or an uncomfortable position when working at a computer. These pains can also be symptoms of anxiety, which increases muscl…
- **NEW**: Headaches, as well as neck and back pain, can be caused by several factors, including muscle tension, stress, poor posture, prolonged sitting, or improper positioning while working at a computer. This pain can also be a symptom of anxiety, which increases musc…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more idiomatic and follows standard English medical/wellness writing. Translation B uses 'pains' as a plural noun, which sounds unnatural in this context, and 'heightens the perception of pain' is slightly more wordy than the cleaner 'worsens pain perception'.
  - [old/style/major] Using 'pains' as a plural noun for general discomfort is non-idiomatic; 'pain' is typically uncountable in this context.
  - [old/style/minor] The phrasing 'an uncomfortable position' is a bit weaker than 'improper positioning' or 'poor posture' for describing ergonomic issues.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and follows natural English patterns for medical/wellness descriptions. Specifically, 'neck and back pain' is much more natural than 'pain in the neck and back', and 'worsens pain perception' is more concise and professional than 'heightens the perception of pain'.
  - [old/style/minor] The phrase 'pain in the neck and back' is slightly wordy and less idiomatic than 'neck and back pain'.
  - [old/style/minor] 'Heightens the perception of pain' is grammatically correct but sounds slightly more academic/stiff compared to the smoother 'worsens pain perception'.

#### 🟡 en `/steps_description/13/fact`— вердикт неустойчив

- **RU**: Хотя эти симптомы обычно временны, они могут вызывать беспокойство или страх у человека, испытывающего их, особенно если причина их возникновения неизвестна. Это может усилить тревожность, создавая замкнутый круг.
- **OLD**: Although these symptoms are usually temporary, they can be worrying or frightening, especially when the cause is unknown. This can intensify anxiety, creating a vicious circle.
- **NEW**: While these symptoms are usually temporary, they can cause worry or fear for the person experiencing them, especially if the cause is unknown. This can increase anxiety, creating a vicious cycle.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and follows the original structure more closely without losing the natural flow. Translation B simplifies the sentence by removing 'the person experiencing them', which slightly weakens the connection to the subject, and 'vicious circle' is less idiomatic in a psychological context than 'vicious cycle'.
  - [old/omission/minor] omitted 'the person experiencing them' (у человека, испытывающего их)
  - [old/style/minor] vicious circle is less common in modern psychological English than vicious cycle
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and idiomatic for a mental health context. Translation B is slightly wordy and uses 'vicious cycle', which is fine, but 'vicious circle' is a more natural collocation in this context.
  - [new/style/minor] The phrase 'cause worry or fear for the person experiencing them' is a bit heavy and wordy compared to the more direct 'can be worrying or frightening'.

#### 🟢 en `/steps_description/17/fact` — NEW лучше (2:0)

- **RU**: В моменты тревоги или стресса сосуды в лице могут расширяться, вызывая красноту, известную как флюшинг. Это естественная реакция организма на эмоциональное напряжение и может сопровождаться ощущением жара или горения.
- **OLD**: In moments of anxiety or stress, the facial blood vessels can expand, causing redness known as flushing. This is a natural bodily response to emotional tension and may be accompanied by a feeling of heat or burning.
- **NEW**: During moments of anxiety or stress, blood vessels in the face may dilate, causing redness known as flushing. This is a natural bodily response to emotional tension and may be accompanied by a sensation of heat or burning.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation A uses 'dilate', which is the precise medical/biological term for blood vessels, whereas 'expand' in B sounds slightly more generic. 'During moments' is also more idiomatic than 'In moments' for this context.
  - [old/style/minor] use of 'expand' instead of the more professional 'dilate' for blood vessels; 'the facial blood vessels' is slightly clunkier than 'blood vessels in the face'
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses more precise and professional medical/psychological terminology ('dilate' instead of 'expand', 'sensation' instead of 'feeling'), which sounds more natural for an educational text.
  - [old/style/minor] The word 'expand' is a bit too generic; 'dilate' is the standard term for blood vessels. 'Feeling' is acceptable but 'sensation' is more idiomatic in this context.

#### 🟢 en `/steps_description/3/fact` — NEW лучше (2:0)

- **RU**: Чарли Ханнем, известный актер, открыто говорил о своих борьбах с тревожностью и о том, как это иногда мешает ему сосредоточиться на работе и личной жизни. Он подчеркивает, как важно обращение за профессиональной помощью и использование техник релаксации.
- **OLD**: Charlie Hunnam, a well-known actor, has spoken publicly about his struggles with anxiety and how it sometimes makes it harder to focus on work and personal life. He emphasizes the importance of seeking professional help and using relaxation techniques.
- **NEW**: Actor Charlie Hunnam has spoken openly about his struggles with anxiety and how it sometimes makes it difficult for him to focus on his work and personal life. He emphasizes the importance of seeking professional help and using relaxation techniques.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more polished and flows naturally for a native reader. Translation B feels slightly more fragmented due to the appositive phrase and the omission of possessive pronouns ('his'), which makes the sentence feel less personal and slightly more clipped.
  - [old/style/minor] Omission of 'his' before 'work and personal life' makes the sentence sound slightly less natural in this narrative context.
  - [old/style/minor] The phrase 'a well-known actor' is grammatically correct but 'Actor Charlie Hunnam' (as in A) is a more common and smoother journalistic way to introduce a celebrity in English.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and flows better as a journalistic snippet. Translation A's use of 'a well-known actor' as an appositive is grammatically correct but feels slightly more like a literal translation of the Russian structure, whereas B's 'Actor Charlie Hunnam' is a standard English news style.
  - [old/style/minor] The phrasing 'a well-known actor' is a bit clunky compared to the more natural 'Actor Charlie Hunnam' in this context.

#### 🟢 en `/steps_description/0/text` — NEW лучше (2:0)

- **RU**: Постоянное чувство тревожности может серьезно повлиять на качество жизни, мешая работе, социальной активности и общему самочувствию. Люди могут начать избегать определенных ситуаций или мест, которые провоцируют или усиливают их тревожность.
- **OLD**: A constant sense of anxiety can seriously affect quality of life, getting in the way of work, social activity and overall well-being. People may start avoiding certain situations or places that trigger or intensify their anxiety.
- **NEW**: Constant anxiety can seriously impact your quality of life, interfering with work, social activities, and overall well-being. You might find yourself avoiding certain situations or places that trigger or intensify your anxiety.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A uses a much more natural, engaging, and supportive tone ('you' instead of the detached 'people'), which aligns perfectly with the 'understanding friend' persona. It also uses more idiomatic phrasing ('find yourself avoiding') compared to the slightly clunky B.
  - [old/style/minor] The use of 'People' makes the text feel like a dry textbook rather than a supportive app; 'getting in the way of' is slightly more colloquial/informal in a way that feels less polished than 'interfering with'.
  - [old/omission/minor] Missing the possessive 'your' before quality of life, which makes it sound slightly impersonal/academic.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses a more natural, engaging, and supportive tone ('your quality of life', 'You might find yourself') which aligns perfectly with the 'understanding friend' persona. Translation A is grammatically correct but feels slightly more detached and clinical.
  - [old/style/minor] Uses 'A constant sense of anxiety' and 'People may', which sounds more like a textbook than a supportive app interface.

#### 🟢 en `/result/normal/text` — NEW лучше (2:0)

- **RU**: Ваш результат указывает на нормальный уровень тревожности. Иногда вы можете испытывать лёгкое волнение или беспокойство, но это естественная часть жизни. Такое состояние не требует обращения к специалисту, однако забота о себе и психологическая гигиена остаютс…
- **OLD**: Your result indicates a normal level of anxiety. At times you may experience mild worry or nervousness, but this is a natural part of life. This state does not require professional help; however, self-care and basic psychological hygiene are still important.
- **NEW**: Your results indicate a normal level of anxiety. You may occasionally feel slight nervousness or worry, but this is a natural part of life. This state doesn’t require professional intervention, though self-care and mental hygiene remain important.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Translation A sounds more natural and follows the UX guidelines for contractions ('doesn't'). Translation B uses 'psychological hygiene', which is a bit heavy, and 'does not' which feels too formal for a supportive tone.
  - [old/style/minor] Use of 'does not' instead of 'doesn't' makes the tone too formal/stiff for a supportive app.
  - [old/style/minor] The phrase 'basic psychological hygiene' is slightly clunky compared to the smoother 'mental hygiene' or just 'hygiene'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B sounds more natural and follows the brand's tone of voice better, using contractions ('doesn't') and more idiomatic phrasing. Translation A feels slightly more formal and stiff ('professional help', 'at times').
  - [old/style/minor] Uses 'At times' and 'professional help', which sounds a bit more clinical/formal than the desired 'understanding friend' tone.
  - [old/terminology/minor] Used 'psychological hygiene' instead of the more common 'mental hygiene' in this context, though both are acceptable.

#### 🟢 en `/steps_description/4/fact` — NEW лучше (2:0)

- **RU**: Исследования показывают, что оптимизм может даже повлиять на физическое здоровье. Оптимисты часто имеют меньший риск развития хронических заболеваний и дольше живут по сравнению с пессимистами.
- **OLD**: Research shows that optimism can even influence physical health. Optimistic people often have a lower risk of chronic diseases and tend to live longer than pessimists.
- **NEW**: Research shows that optimism can even impact physical health. Optimists often have a lower risk of developing chronic diseases and tend to live longer than pessimists.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Both translations are excellent, but B is slightly more idiomatic and precise. 'Optimists' is a more natural and concise way to refer to 'optimistic people', and 'developing chronic diseases' is a more accurate translation of 'развития заболеваний' than the slightly more elliptical version in A.
  - [old/style/minor] 'Optimistic people' is slightly wordier than the more natural 'Optimists'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A is more concise and idiomatic. Using 'Optimists' instead of 'Optimistic people' is more natural in this context, and 'impact' is a strong, modern choice for this type of scientific claim.
  - [old/style/minor] 'Optimistic people' is slightly wordier than the more direct 'Optimists'.

#### 🔴 en `/result/severe/title` — OLD лучше (2:0)

- **RU**: Выраженное тревожное состояние
- **OLD**: Marked anxiety
- **NEW**: Pronounced anxiety state
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 75)
  - Translation A is concise, idiomatic, and follows the UX principle of avoiding unnecessary words. Translation B is a literal calque of the Russian structure ('state'), which sounds heavy and unnatural in English.
  - [new/style/major] The word 'state' is redundant here; in English, 'pronounced anxiety' already implies a state/condition. Adding 'state' makes it sound like a clunky translation rather than natural English.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation B is much more idiomatic for a clinical or psychological context. Translation A sounds like a literal translation (calque) of the Russian structure.
  - [new/style/minor] The phrase 'anxiety state' is heavy and sounds like a non-native construction; 'anxiety' alone or 'state of anxiety' is more natural.

#### 🟢 en `/steps_description/18/text` — NEW лучше (2:0)

- **RU**: Полноценный ночной отдых помогает регулировать эмоции, улучшает когнитивные функции и поддерживает общее эмоциональное благополучие. Люди, регулярно получающие качественный сон, часто лучше справляются с дневным стрессом и менее подвержены тревожным расстройст…
- **OLD**: A full night’s rest helps regulate emotions, improves cognitive functions and supports overall emotional well-being. People who regularly get quality sleep usually cope better with daily stress and are less prone to anxiety disorders.
- **NEW**: A full night’s rest helps regulate emotions, improves cognitive function, and supports overall emotional well-being. People who regularly get quality sleep often cope better with daily stress and are less prone to anxiety disorders.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A is more precise and follows the original meaning perfectly. Translation B uses 'usually' instead of 'often', which slightly shifts the frequency nuance, and lacks the Oxford comma used in A, which is preferred for clarity in such lists.
  - [old/mistranslation/minor] used 'usually' instead of 'often' (часто)
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more accurate to the original text and follows standard English usage. Translation A changes 'often' to 'usually' and uses the plural 'functions', which is less idiomatic in this context than the singular 'function'.
  - [old/mistranslation/minor] Changed 'often' (часто) to 'usually' (обычно).
  - [old/style/minor] Used 'cognitive functions' (plural) instead of the more natural 'cognitive function' (singular) in this context.

#### 🟢 en `/steps` — NEW лучше (2:0)

- **RU**: Я чувствую больше тревоги и нервозности, чем обычно Я чувствую страх без понятной причины Меня легко выбить из равновесия или довести до паники Мне трудно собраться и взять себя в руки У меня есть чувство безопасности и спокойствия за свое будущее Я замечаю др…
- **OLD**: I feel more nervous and anxious than usual I feel afraid for no apparent reason I get upset or panic easily I feel like I can’t pull myself together or get a grip I have a sense of well-being, I feel that nothing bad will happen to me My hands and feet tremble…
- **NEW**: I feel more anxious and nervous than usual I feel fear for no apparent reason I feel easily unsettled or driven to panic I find it hard to pull myself together I feel safe and secure about my future I notice trembling in my hands and legs I experience headache…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is much more accurate to the original meaning and uses more appropriate psychological/medical terminology. Translation A contains several mistranslations and significant deviations from the source text.
  - [old/mistranslation/major] The phrase 'I feel that nothing bad will happen to me' is a huge addition/interpretation not present in the original 'чувство безопасности и спокойствия за свое будущее'.
  - [old/mistranslation/major] 'I get upset' is a weak and inaccurate translation for 'выбить из равновесия' (unsettled/unbalanced).
  - [old/mistranslation/major] 'I feel calm and unhurried' is a mistranslation of 'внутренней собранности' (composed/collected).
  - [old/omission/minor] Missed 'legs' in the trembling sentence (only hands and feet).
  - [old/mistranslation/minor] 'I faint or feel as if I might pass out' changes the meaning from 'feeling like I might' to 'actually fainting'.
  - [new/style/minor] 'I suffer from nightmares' is slightly heavy, but acceptable for a clinical/symptom context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is much more accurate to the original text and uses more appropriate clinical/descriptive language for a mental health assessment. Translation B introduces significant meaning shifts and inaccuracies.
  - [old/mistranslation/major] The line 'У меня есть чувство безопасности и спокойствия за свое будущее' is completely misinterpreted as 'I have a sense of well-being, I feel that nothing bad will happen to me', which changes the focus from the future to general well-being.
  - [old/mistranslation/major] The line 'Меня легко выбить из равновесия или довести до панику' is weakened to 'I get upset or panic easily', losing the 'unsettled/out of balance' nuance.
  - [old/mistranslation/major] The line 'У меня бывает чувство, будто я могу потерять сознание' is translated as 'I faint or feel as if I might pass out', adding 'I faint' which is a definitive event, whereas the original is a sensation/fear of fainting.
  - [old/style/minor] The translation of 'спокойствие и внутреннюю собранность' as 'calm and unhurried' is a mistranslation; 'unhurried' refers to pace, not mental composure.
  - [old/style/minor] The line 'Я замечаю дрожь в руках и ногах' is translated as 'My hands and feet tremble and shake', which is slightly more redundant and less precise than A's version.

#### 🟢 en `/steps_description/1/text` — NEW лучше (2:0)

- **RU**: Чувство страха без очевидной причины может быть симптомом генерализованного тревожного расстройства или других форм тревожности, таких как паническое расстройство.
- **OLD**: A sense of fear without an obvious reason can be a symptom of generalized anxiety disorder or other forms of anxiety, such as panic disorder.
- **NEW**: Feeling fear for no apparent reason can be a symptom of generalized anxiety disorder or other forms of anxiety, such as panic disorder.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses 'Feeling fear', which is more natural and direct for a mental health context than the slightly more clinical and heavy 'A sense of fear' in A. Both are grammatically correct and follow terminology, but B flows better for a reader.
  - [old/style/minor] 'A sense of fear' sounds slightly more formal/detached than the more common 'Feeling fear' in psychoeducation.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more direct and natural for psychoeducation. Translation B's 'A sense of fear' is slightly more wordy and formal, whereas 'Feeling fear' flows better in a supportive, expert-friend tone.
  - [old/style/minor] The phrase 'A sense of fear' is slightly more heavy/academic than the more natural 'Feeling fear'.

#### 🟡 en `/steps_description/5/fact`— вердикт неустойчив

- **RU**: Тревожные расстройства являются одними из самых распространенных психических заболеваний, поражающих миллионы людей по всему миру. Около 31% взрослого населения в какой-то момент своей жизни испытывают тревожное расстройство.
- **OLD**: Anxiety disorders are among the most common mental health conditions, affecting millions of people worldwide. Around 31% of adults experience an anxiety disorder at some point in their lives.
- **NEW**: Anxiety disorders are among the most common mental health conditions, affecting millions of people worldwide. About 31% of the adult population will experience an anxiety disorder at some point in their lives.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A uses 'will experience', which perfectly captures the sense of a lifetime occurrence (future/probabilistic aspect) implied by 'в какой-то момент своей жизни'. Translation B is slightly more static.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation A is more natural and concise. Translation B uses 'the adult population will experience', which sounds slightly more like a prediction or a formal statistical projection rather than a statement of fact about life experiences.
  - [new/style/minor] The use of 'the adult population will experience' is slightly wordier and less idiomatic than 'adults experience' for describing general life statistics.

#### 🟢 en `/result/extreme/text` — NEW лучше (2:0)

- **RU**: Ваш результат говорит о сильной тревоге, которая может сопровождаться выраженным эмоциональным дискомфортом и сложностями в повседневной жизни. Если вы чувствуете себя подавленно, переживаете тяжёлые мысли или вам трудно справляться самостоятельно, обратитесь …
- **OLD**: Your result indicates severe anxiety, which may be accompanied by intense emotional discomfort and difficulties in daily life. If you feel down, experience distressing thoughts or find it hard to cope on your own, please reach out for professional support. You…
- **NEW**: Your results suggest severe anxiety, which may be accompanied by significant emotional discomfort and difficulties in daily life. If you feel overwhelmed, experience distressing thoughts, or find it hard to cope on your own, please seek professional support. Y…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B sounds more natural and empathetic, using 'overwhelmed' and 'help is available', which fits the 'understanding friend' tone better than the slightly more clinical 'feel down' or 'help exists' in A.
  - [old/style/minor] The phrase 'help exists' sounds a bit literal/stilted compared to the more idiomatic 'help is available'.
  - [old/style/minor] The use of 'Your result' (singular) is grammatically fine but 'Your results' (plural) is more standard for test outcomes.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more idiomatic and follows the 'warm expert' tone perfectly, using 'overwhelmed' for 'подавленно' and 'reaching out' for a smoother flow. Translation B feels slightly more literal and clunky, particularly with 'help exists' and 'Your result indicates'.
  - [old/style/minor] 'Your result indicates' is a bit more clinical/stiff than 'suggests'.
  - [old/style/minor] 'help exists' sounds slightly unnatural in this context compared to 'help is available'.
  - [old/style/minor] 'feel down' is a bit too casual for the gravity of 'severe anxiety' compared to 'overwhelmed'.

#### 🟡 en `/steps_description/10/fact`— вердикт неустойчив

- **RU**: Приступы головокружения, связанные с тревожностью, могут затруднять выполнение обычных дел, участие в социальных событиях и работу. Это создает замкнутый круг, когда тревога о симптомах усиливает саму тревогу, поддерживая или усугубляя состояние.
- **OLD**: Dizzy spells linked to anxiety can make it difficult to carry out everyday tasks, take part in social events or work. This can create a vicious cycle where anxiety about symptoms intensifies the anxiety itself, maintaining or worsening the condition.
- **NEW**: Dizziness related to anxiety can make it difficult to perform daily tasks, participate in social events, and work. This creates a vicious cycle where anxiety about the symptoms intensifies the anxiety itself, sustaining or worsening the condition.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and flows better for a professional mental health context. Translation B uses 'Dizzy spells' and 'carry out', which are slightly more colloquial/wordy, and the addition of 'This can create' softens the causal link present in the original.
  - [old/style/minor] The addition of 'can' (This can create) slightly weakens the directness of the original statement.
  - [old/style/minor] The phrasing 'take part in social events or work' is slightly less rhythmic than the parallel structure in A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and idiomatic for a mental health context. 'Dizzy spells' is a more common way to describe these episodes than the more clinical 'Dizziness', and 'carry out everyday tasks' flows better than 'perform daily tasks'.
  - [new/style/minor] The phrasing 'perform daily tasks' is slightly more formal/stiff than the more natural 'carry out everyday tasks' or 'do everyday tasks'.

#### 🟢 en `/steps_description/7/text` — NEW лучше (2:0)

- **RU**: Согласно статистике, около 10% людей в мире страдают от хронической усталости, которая значительно влияет на их способность выполнять повседневные задачи.
- **OLD**: According to statistics, about 10% of people worldwide suffer from chronic fatigue, which significantly affects their ability to perform everyday tasks.
- **NEW**: Statistics show that about 10% of people worldwide suffer from chronic fatigue, which significantly impacts their ability to perform daily tasks.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A sounds more natural and professional for an English-speaking audience by using 'Statistics show' instead of the clunkier 'According to statistics'.
  - [old/style/minor] The phrase 'According to statistics' is a bit of a translationese/cliché; 'Statistics show' is more idiomatic for high-quality non-fiction/articles.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B sounds more natural and professional for an article; 'Statistics show that' is a more idiomatic way to start than the slightly more formal/clunky 'According to statistics'. 'Impacts' is also a more modern and concise choice than 'affects' in this context.
  - [old/style/minor] The phrase 'According to statistics' is grammatically correct but slightly more textbook-like/stiff compared to the smoother 'Statistics show that'.

#### 🟢 en `/steps_description/8/fact` — NEW лучше (2:0)

- **RU**: Постоянное спокойствие и отсутствие суеты могут снизить уровень кортизола, гормона стресса, что благоприятно сказывается на сердечно-сосудистой системе, уровне артериального давления и общем состоянии здоровья.
- **OLD**: Staying generally calm and unhurried can lower levels of cortisol, the stress hormone, which has a positive effect on the cardiovascular system, blood pressure and overall health.
- **NEW**: Maintaining a sense of calm and avoiding rushing can lower levels of cortisol, the stress hormone, which benefits the cardiovascular system, blood pressure, and overall health.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and concise, using 'benefits' as a strong verb, whereas B uses a wordier 'has a positive effect on'.
  - [old/style/minor] The phrase 'Staying generally calm and unhurried' is slightly clunky compared to the more natural 'Maintaining a sense of calm' in A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses more sophisticated and natural phrasing ('Maintaining a sense of calm', 'benefits') that fits the expert-friend tone, whereas A is slightly more literal and clunky ('Staying generally calm and unhurried').
  - [old/style/minor] The phrase 'Staying generally calm and unhurried' sounds a bit like a direct translation from Russian; 'unhurried' is slightly awkward in this context compared to 'avoiding rushing' or 'a sense of calm'.

#### 🟢 en `/steps_description/15/text` — NEW лучше (2:0)

- **RU**: Частые позывы к мочеиспусканию могут быть одним из физиологических симптомов тревожности. Активация симпатической нервной системы в ответ на стресс может усиливать работу мочевого пузыря и уринарного тракта, что приводит к учащенному мочеиспусканию.
- **OLD**: Frequent urges to urinate can be one of the physical symptoms of anxiety. Activation of the sympathetic nervous system in response to stress can increase activity of the bladder and urinary tract, which leads to more frequent urination.
- **NEW**: Frequent urges to urinate can be one of the physiological symptoms of anxiety. The activation of the sympathetic nervous system in response to stress can increase bladder and urinary tract activity, leading to frequent urination.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and flows better. It avoids the clunky 'increase activity of the...' construction used in A, opting for the more natural 'increase bladder and urinary tract activity'.
  - [old/style/minor] The phrase 'increase activity of the bladder and urinary tract' is slightly wordy and less natural than the compound noun structure in B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and professional. It uses 'physiological symptoms' which fits the medical/educational tone better than 'physical symptoms', and the phrasing 'increase bladder and urinary tract activity' is much more natural for a native speaker than the clunky 'increase activity of the bladder...' in B.
  - [old/style/minor] The construction 'increase activity of the bladder and urinary tract' is wordy and less idiomatic than the possessive/adjectival form used in A.

#### 🟢 en `/steps_description/5/text` — NEW лучше (2:0)

- **RU**: Дрожание рук и ног может быть вызвано множеством причин, включая стресс, усталость, переутомление или кофеин. Это также может быть симптомом медицинских состояний, таких как тревожное расстройство, гипертиреоз или даже начало неврологических заболеваний, таких…
- **OLD**: Trembling of the hands and feet can have many causes, including stress, fatigue, overexertion or caffeine. It can also be a symptom of medical conditions such as an anxiety disorder, hyperthyroidism or even early stages of neurological conditions like Parkinso…
- **NEW**: Trembling in your hands and legs can be caused by many things, including stress, fatigue, exhaustion, or caffeine. It can also be a symptom of medical conditions such as anxiety disorders, hyperthyroidism, or even the onset of neurological conditions like Park…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Translation A sounds more natural and personal ('your hands and legs'), which fits the 'understanding friend' tone. Translation B uses 'feet' instead of 'legs' (a slight meaning shift) and 'overexertion', which is a bit more formal/stiff than 'exhaustion'.
  - [old/mistranslation/minor] translated 'ног' as 'feet' instead of 'legs'
  - [old/style/minor] use of 'overexertion' and 'trembling of the hands' is slightly more clinical/stiff than the preferred warm tone
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B sounds much more natural and idiomatic for a mental health context. It uses 'trembling in your hands and legs' instead of the heavy, noun-heavy 'Trembling of the hands and feet', and correctly uses 'exhaustion' for 'переутомление'.
  - [old/style/minor] The phrasing 'Trembling of the hands and feet' is slightly clunky/medicalized; 'legs' is more natural than 'feet' when referring to limb trembling.
  - [old/terminology/minor] Used 'overexertion' for 'переутомление', which is okay, but 'exhaustion' in B is a better fit for the context of fatigue.

#### 🟡 en `/steps_description/13/text`— вердикт неустойчив

- **RU**: Онемение и покалывание в конечностях могут быть связаны с тревожностью, особенно когда они возникают во время панических атак или периодов сильного стресса. Эти симптомы часто вызваны гипервентиляцией, которая приводит к изменениям в кровообращении и уровне уг…
- **OLD**: Numbness and tingling in the extremities can be related to anxiety, especially when they occur during panic attacks or periods of intense stress. These symptoms are often caused by hyperventilation, which leads to changes in blood flow and carbon dioxide level…
- **NEW**: Numbness and tingling in your limbs can be linked to anxiety, especially when they occur during panic attacks or periods of intense stress. These symptoms are often caused by hyperventilation, which leads to changes in blood circulation and carbon dioxide leve…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and concise for a mental health app. 'Limbs' is more common and less clinical than 'extremities', and it avoids the redundant 'in the blood' which is already implied by 'carbon dioxide levels'.
  - [old/style/minor] The use of 'extremities' sounds slightly more clinical/medical than the warm, supportive tone required; 'in the blood' is a bit redundant after mentioning CO2 levels.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more precise and professional. Translation B uses 'limbs' which is acceptable but 'extremities' is more clinically accurate for this context, and B's phrasing 'carbon dioxide levels in the blood' is more complete than the slightly clipped version in B.
  - [new/style/minor] The omission of 'in the blood' after carbon dioxide levels makes the sentence slightly less precise, though still understandable.

