# QA: слепое парное сравнение переводов — en-final-g67-irritation

- **Дата**: 2026-09-18T21:31:24.936Z
- **Метка**: en-final-g67-irritation
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: tests/irritation.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/irritation.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 8 | 🔴 4 | ⚪ 0 | 🟡 8 | 0 / 0 | 67% |
| **итого** | 20 | 🟢 8 | 🔴 4 | ⚪ 0 | 🟡 8 | 0 / 0 | 67% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×7, style/major×1, omission/minor×1; OLD — style/minor×13, addition/minor×3, omission/minor×1, mistranslation/major×1, other/minor×1, omission/major×1, terminology/major×1

### Детали пар (для спот-чека)

#### 🟢 en `/steps_description/11/fact` — NEW лучше (2:0)

- **RU**: "Фундаментальная ошибка атрибуции" заставляет нас объяснять поведение других их личностными качествами, а свое - внешними обстоятельствами. Это может усиливать негативное восприятие агрессивных водителей.
- **OLD**: The “fundamental attribution error” leads us to explain other people’s behaviour by their personality traits, while we explain our own behaviour by circumstances. This can intensify negative perceptions of aggressive drivers.
- **NEW**: The “fundamental attribution error” causes us to explain others’ behavior through their personality traits, while attributing our own to external circumstances. This can intensify the negative perception of aggressive drivers.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is more idiomatic and concise, using 'attributing our own to...' to avoid the repetitive and clunky 'we explain our own behaviour by...' found in A. It also correctly captures 'внешними обстоятельствами' as 'external circumstances', whereas A simply says 'circumstances'.
  - [old/style/minor] Repetitive structure ('explain... explain...') makes it feel like a translation rather than natural English.
  - [old/omission/minor] Missed the nuance of 'external' (внешними) in the second clause.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is idiomatic, uses sophisticated parallel structure ('while attributing our own...'), and follows natural English flow. Translation B is repetitive and clunky due to the redundant use of 'explain our own behaviour by'.
  - [old/style/major] Repetitive and heavy structure ('explain... while we explain...') sounds like a translation rather than natural English.
  - [old/omission/minor] Missed 'external' (внешними) before circumstances, which is a key part of the definition.

#### 🟢 en `/result/light/text` — NEW лучше (2:0)

- **RU**: Иногда вы можете испытывать лёгкое раздражение, но это не нарушает ваш обычный ритм жизни. В целом вам удаётся сохранять спокойствие и конструктивно справляться со стрессовыми ситуациями.
- **OLD**: At times you may feel mildly irritated, but it does not really disrupt your usual rhythm of life. Overall, you are able to keep your composure and deal with stressful situations in a constructive way.
- **NEW**: You may experience mild irritation sometimes, but it doesn’t disrupt your usual rhythm of life. Overall, you manage to stay calm and handle stressful situations constructively.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B sounds much more natural and follows the 'warm expert friend' tone. It uses appropriate contractions ('doesn't') and avoids the slightly stiff, formal phrasing found in A ('it does not really', 'you are able to').
  - [old/style/minor] The phrasing 'it does not really disrupt' and 'you are able to' feels a bit heavy and formal for a supportive app context; lacks the natural flow of a native speaker.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more concise and natural for a mental health app, using active verbs like 'manage to stay calm'. Translation B is slightly wordy and uses 'does not' instead of the preferred contraction 'doesn't'.
  - [old/style/minor] Avoids contractions ('does not'), which makes the tone feel slightly more formal/stiff than the 'understanding friend' persona.
  - [old/style/minor] Uses 'in a constructive way' instead of the more direct 'constructively'.

#### 🟡 en `/steps_description/9/fact`— вердикт неустойчив

- **RU**: Исследования показывают, что с развитием технологий и социальных сетей люди стали чаще отменять планы в последний момент, так как это стало технически проще сделать.
- **OLD**: Studies show that with the development of technology and social media, people have started cancelling plans at the last minute more often, simply because it has become technically easier to do so.
- **NEW**: Research shows that with the development of technology and social media, people have become more likely to cancel plans at the last minute because it has become technically easier to do so.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and concise. 'People have become more likely to' is a more natural way to express a change in behavior than the slightly wordier 'people have started... more often' in Translation A.
  - [old/style/minor] The phrasing 'started cancelling... more often' is slightly clunky compared to the more fluid 'become more likely to cancel'.
  - [old/addition/minor] The word 'simply' is added, which isn't in the original, though it doesn't hurt the tone.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B is more idiomatic and flows better for a native reader. The use of 'started cancelling... more often' is a more natural way to express the change in behavior than the slightly more clinical 'become more likely to cancel'.
  - [new/style/minor] The phrasing 'become more likely to cancel' is grammatically correct but sounds slightly more formal/academic than the more natural 'started cancelling... more often'.

#### 🟡 en `/result/severe/text`— вердикт неустойчив

- **RU**: Время от времени вы сталкиваетесь с повышенной раздражительностью, и некоторые ситуации могут вызывать эмоциональный дискомфорт. Однако это достаточно распространённое состояние, особенно при высокой нагрузке или напряжённом ритме жизни. Небольшие практики рас…
- **OLD**: From time to time you experience increased irritability, and certain situations can cause emotional discomfort. This is a fairly common state, especially when you are under high pressure or living at a fast pace. Small practices of rest and relaxation can help…
- **NEW**: From time to time, you face increased irritability, and certain situations may cause emotional discomfort. However, this is a common state, especially during high workloads or a hectic lifestyle. Small relaxation and recovery practices can help you maintain em…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 85)
  - Translation B sounds much more natural and empathetic, avoiding the clunky 'high workloads' and 'hectic lifestyle' in favor of more idiomatic 'under high pressure' and 'living at a fast pace'.
  - [new/style/minor] The phrasing 'face increased irritability' and 'during high workloads' sounds slightly more like a direct translation from Russian than natural English.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation B uses much more natural, idiomatic English ('hectic lifestyle', 'high workloads') compared to the slightly clunky 'living at a fast pace' and 'practices of rest' in A. B also correctly includes 'However' to maintain the logical flow of the original.
  - [old/style/minor] 'Small practices of rest and relaxation' sounds like a literal translation from Russian; 'relaxation and recovery practices' is more natural.
  - [old/omission/minor] Missing 'However' which provides the necessary transition between the problem and the reassurance.

#### 🔴 en `/steps_description/14/fact` — OLD лучше (2:0)

- **RU**: Альберт Эйнштейн часто работал в шумных кафе, утверждая, что фоновый шум помогал ему сосредоточиться. Это показывает, как по-разному люди реагируют на внешние раздражители.
- **OLD**: Albert Einstein often worked in noisy cafés, saying that background noise helped him concentrate. This shows how differently people can react to the same external stimuli.
- **NEW**: Albert Einstein often worked in noisy cafes, claiming that background noise helped him focus. This shows how differently people react to external stimuli.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Translation B is more idiomatic and captures the implied meaning of the original more effectively. The addition of 'the same' in B makes the comparison logically complete in English, and 'cafés' with the accent is a nice stylistic touch for a narrative text.
  - [new/style/minor] The sentence 'This shows how differently people react...' is grammatically correct but feels slightly abrupt compared to the more natural flow of B.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Translation A is slightly more idiomatic and natural for a narrative text. The addition of 'the same' in the second sentence provides a better logical flow and nuance that is implied in the Russian original.
  - [new/style/minor] The phrasing 'how differently people react' is grammatically correct but slightly less fluid than 'how differently people can react' in this context.

#### 🟢 en `/steps_description/1/fact` — NEW лучше (2:0)

- **RU**: Существует феномен "ценового якоря", когда люди формируют ожидания о стоимости услуги на основе предыдущего опыта или неполной информации. Это часто приводит к разочарованию при столкновении с реальными ценами.
- **OLD**: There is a phenomenon known as the “price anchor”, when people form expectations about the cost of a service based on previous experience or incomplete information. This often leads to disappointment when they are faced with the actual price.
- **NEW**: There is a phenomenon known as “price anchoring,” where people form expectations about the cost of a service based on previous experience or incomplete information. This often leads to frustration when faced with actual prices.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses the more natural term 'price anchoring' and the idiomatic 'where' for describing a phenomenon. It also avoids the clunky 'when they are faced with' in favor of a smoother construction.
  - [old/style/minor] Uses 'price anchor' (noun) instead of the more standard 'price anchoring' (process); 'when they are faced with' is slightly wordy/heavy.
  - [old/style/minor] Uses 'the actual price' (singular) whereas 'actual prices' (plural) is more natural for a general phenomenon.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses the correct psychological term 'price anchoring' and flows much more naturally. Translation B uses a literal translation of the term and a slightly clunky structure in the second sentence.
  - [old/terminology/major] The phenomenon is 'price anchoring', not 'price anchor'.
  - [old/style/minor] The use of 'when' instead of 'where' for describing a phenomenon is less idiomatic in this context.
  - [old/style/minor] The phrasing 'when they are faced with the actual price' is wordier and less impactful than 'when faced with actual prices'.

#### 🟢 en `/steps_description/23/fact` — NEW лучше (2:0)

- **RU**: Эффект "Сломанного Стекла": Этот эффект описывает, как мелкие неприятности могут накапливаться и усиливать негативное восприятие. Если вы уже торопитесь и находитесь в состоянии стресса, порванные брюки могут стать "последней каплей", усиливающей ваше раздраже…
- **OLD**: The so-called “Broken Glass effect” describes how minor annoyances can build up and amplify our negative perception. If you are already in a rush and stressed, torn trousers can feel like “the last straw” that greatly intensifies your irritation.
- **NEW**: The "Broken Windows" Effect: This effect describes how small setbacks can accumulate and intensify negative perceptions. If you’re already in a rush and feeling stressed, something as simple as torn pants can become the "last straw," amplifying your irritation…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation B correctly identifies the psychological concept being referenced ('Broken Windows' theory), whereas Translation A uses a literal translation of the Russian phrase which sounds unnatural in English. Translation B also follows the UX guidelines for contractions ('you’re') and tone better.
  - [old/mistranslation/major] The term 'Broken Glass effect' is a literal translation of the Russian; the actual psychological concept is the 'Broken Windows' theory/effect.
  - [old/style/minor] Uses 'trousers' (more British/formal) instead of the more neutral 'pants' or 'clothing', and lacks the natural flow of 'feeling stressed'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A uses the correct idiomatic term 'Broken Windows effect' (which is the actual psychological concept) and follows all UX/style guidelines, including contractions and natural flow. Translation B uses a literal and incorrect translation of the term ('Broken Glass') and sounds more like a translation than native English.
  - [old/terminology/major] The concept is 'Broken Windows theory/effect', not 'Broken Glass'.
  - [old/style/minor] Uses 'trousers' (more British/formal) instead of 'pants' (US standard) and lacks contractions ('you are' instead of 'you're'), making it feel less like a 'supportive friend' and more like a textbook.
  - [old/style/minor] The phrase 'The so-called...' adds unnecessary filler not present in the original.

#### 🔴 en `/steps_description/7/text` — OLD лучше (2:0)

- **RU**: Психологи отмечают, что наша реакция на подобные ситуации часто связана с "территориальным поведением" - инстинктивным желанием защищать свое имущество и пространство.
- **OLD**: Psychologists note that our reaction to situations like this is often linked to “territorial behaviour” — an instinctive desire to protect our belongings and personal space.
- **NEW**: Psychologists note that our reaction to these situations is often linked to “territorial behavior” — an instinctive desire to protect our property and space.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and empathetic for a mental health context by using 'personal space' and 'belongings' instead of the more clinical/legalistic 'property and space'.
  - [new/style/minor] The phrase 'protect our property and space' sounds slightly stiff and formal compared to the warmer tone of 'personal space'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds more natural and idiomatic for a mental health context. 'Situations like this' is a smoother way to translate 'подобные ситуации' than the slightly more clinical 'these situations', and 'belongings and personal space' is a much more common and natural pairing in English than 'property and space'.
  - [new/style/minor] The phrasing 'property and space' feels a bit stiff and literal compared to the more idiomatic 'belongings and personal space'.

#### 🟢 en `/steps_description/20/text` — NEW лучше (2:0)

- **RU**: Когда мы торопимся, у нас часто возникает чувство срочности, которое может усилить раздражение. Это состояние связано с выбросом адреналина, что ускоряет сердцебиение и повышает уровень стресса.
- **OLD**: When we are in a hurry, we often experience a sense of urgency that increases irritation. This state is associated with an adrenaline surge, which speeds up the heartbeat and raises stress levels.
- **NEW**: When we are in a hurry, we often experience a sense of urgency that can heighten irritation. This state is linked to an adrenaline rush, which increases heart rate and raises stress levels.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and flows better for a mental health context. 'Heighten irritation' is a more natural collocation than 'increases irritation', and 'adrenaline rush' is the standard term compared to 'adrenaline surge'.
  - [old/style/minor] The phrase 'increases irritation' is slightly less sophisticated than 'heighten irritation' in this context, and 'adrenaline surge' is less common than 'adrenaline rush'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and accurate. 'Adrenaline rush' and 'heart rate' are the natural collocations used by native speakers in this context, whereas 'adrenaline surge' and 'heartbeat' (as a rate) sound slightly more clinical or less fluid.
  - [old/style/minor] 'Adrenaline surge' is acceptable but 'adrenaline rush' is more common; 'speeds up the heartbeat' is slightly less natural than 'increases heart rate'.
  - [old/omission/minor] Missed the nuance of 'может' (can) in the first sentence.

#### 🟡 en `/steps_description/4/text`— вердикт неустойчив

- **RU**: Психологи называют игнорирование "социальной смертью". Исследования показывают, что мозг реагирует на социальное исключение так же, как на физическую боль.
- **OLD**: Psychologists sometimes refer to being ignored as a kind of “social death”. Research shows that the brain reacts to social exclusion in much the same way as to physical pain.
- **NEW**: Psychologists refer to being ignored as “social death.” Research shows that the brain reacts to social exclusion in the same way it reacts to physical pain.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more direct, punchy, and faithful to the original's assertive tone. Translation B adds unnecessary hedging ('sometimes', 'a kind of') and wordiness ('in much the same way as to') which weakens the impact of the statement.
  - [old/addition/minor] Added 'sometimes' and 'a kind of', which changes the definitive tone of the original to a hesitant one.
  - [old/style/minor] The phrasing 'in much the same way as to' is slightly more clunky than the streamlined version in A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and idiomatic for a psychological article, using 'refer to... as a kind of' which softens the claim appropriately. Translation B is slightly more repetitive in the second sentence.
  - [new/style/minor] The repetition of 'it reacts' in the second sentence is grammatically correct but less elegant than the comparative structure in A.

#### 🟡 en `/steps_description/3/text`— вердикт неустойчив

- **RU**: Психологи отмечают, что чувство беспомощности в таких ситуациях может быстро вызвать раздражение. Однако, активные действия по решению проблемы способствуют выработке эндорфинов, которые улучшают настроение.
- **OLD**: Psychologists point out that feeling helpless in situations like this can quickly turn into irritation. Taking active steps to solve the problem, however, can trigger the release of endorphins, which improves your mood.
- **NEW**: Psychologists note that feeling helpless in these situations can quickly lead to irritation. However, taking active steps to solve a problem helps release endorphins, which improve your mood.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and flows better for a mental health context. Translation B is slightly wordy ('can trigger the release of') and has a minor subject-verb agreement issue ('endorphins, which improves' should be 'improve').
  - [old/style/minor] Wordy phrasing 'can trigger the release of' instead of the more direct 'helps release'.
  - [old/other/minor] Subject-verb agreement error: 'endorphins, which improves' (should be 'improve').
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A sounds more natural and idiomatic for a mental health context. The phrase 'turn into irritation' and the structure 'can trigger the release of endorphins' flow better than the slightly more clinical/stiff phrasing in B.
  - [new/style/minor] The sentence structure starting with 'However' followed by a long subject is slightly less fluid than the parenthetical 'however' used in A.

#### 🟡 en `/steps_description/8/fact`— вердикт неустойчив

- **RU**: Согласно исследованию, проведенному в США, около 68% покупателей покидают магазин из-за навязчивого поведения продавцов.
- **OLD**: According to a study carried out in the US, about 68% of customers leave a shop because of pushy or intrusive sales staff.
- **NEW**: According to a study conducted in the US, about 68% of shoppers leave a store due to pushy sales behavior.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more concise and uses more natural business English ('shoppers' and 'sales behavior'). Translation B is slightly wordy and uses 'shop', which feels less professional in this context than 'store'.
  - [old/style/minor] The phrase 'pushy or intrusive sales staff' is a bit heavy compared to the more streamlined 'pushy sales behavior'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is more natural and idiomatic; 'pushy or intrusive sales staff' captures the nuance of 'навязчивое поведение продавцов' much better than the clunky 'pushy sales behavior' in B. Translation B also uses 'shoppers' and 'store', which is fine, but 'sales behavior' sounds like a corporate report rather than a natural sentence.
  - [new/style/minor] The phrase 'pushy sales behavior' is slightly unnatural/clunky compared to describing the people (staff) or their actions.

#### 🟢 en `/steps_description/7/fact` — NEW лучше (2:0)

- **RU**: Эксперты по управлению гневом рекомендуют использовать технику "STOP" (Stop, Take a breath, Observe, Proceed) в таких ситуациях для контроля эмоций.
- **OLD**: Anger-management experts often recommend the “STOP” technique in such situations: Stop, Take a breath, Observe what is happening, and only then Proceed.
- **NEW**: Anger management experts recommend using the “STOP” technique (Stop, Take a breath, Observe, Proceed) in these situations to help control your emotions.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is more faithful to the original structure and includes the purpose of the technique (controlling emotions), whereas A adds unnecessary words ('what is happening', 'and only then') and changes the tone.
  - [old/addition/minor] Added 'what is happening' and 'and only then', which deviates from the concise acronym definition.
  - [old/omission/major] Omitted the purpose of the technique ('for controlling emotions').
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A is a faithful and natural rendering of the original, maintaining the exact structure and the specific acronym definition. Translation B introduces unnecessary additions ('what is happening', 'and only then') and changes the acronym's definition, which is a mistranslation of the source text.
  - [old/mistranslation/major] The acronym definition is altered: 'Observe' becomes 'Observe what is happening' and 'Proceed' is preceded by 'and only then', which deviates from the source's specific 'STOP' definition.
  - [old/style/minor] The use of a colon to introduce the acronym makes the sentence structure feel slightly different from the original's parenthetical approach.

#### 🔴 en `/steps_description/18/text` — OLD лучше (2:0)

- **RU**: Умение проявлять эмпатию может помочь снизить раздражение в споре. Понимание того, что человек может не осознавать свою некомпетентность или иметь ограниченные знания по теме, может изменить ваше отношение и реакцию.
- **OLD**: The ability to show empathy can help reduce irritation during a disagreement. Realising that the other person may not be aware of their lack of competence or may simply have limited knowledge can change the way you see them and how you react.
- **NEW**: Practicing empathy can help reduce irritation during an argument. Understanding that a person might not realize their own incompetence or may have limited knowledge on a topic can change your attitude and reaction.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A sounds much more natural and empathetic, using 'disagreement' instead of the more aggressive 'argument' and providing a smoother flow with 'the way you see them'.
  - [new/style/minor] The word 'argument' carries a more confrontational tone than the original 'спор' in this context; 'disagreement' is a better fit for a supportive tone.
  - [new/style/minor] The phrase 'change your attitude and reaction' is a bit literal/clunky compared to the more idiomatic 'change the way you see them and how you react'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 86)
  - Translation B sounds much more natural and empathetic, avoiding the harshness of 'incompetence' by using 'lack of competence' and providing a smoother flow. It also uses 'disagreement' instead of 'argument', which fits the supportive tone better.
  - [new/style/minor] The phrasing 'realize their own incompetence' sounds slightly blunt and clinical compared to the more nuanced B.
  - [new/style/minor] The word 'argument' can imply a heated conflict, whereas 'disagreement' is a more neutral and professional term for a psychological context.

#### 🟡 en `/steps_description/10/fact`— вердикт неустойчив

- **RU**: Эксперты по управлению конфликтами рекомендуют использовать технику "обезоруживающих фраз" - спокойных ответов, которые снижают напряжение и лишают насмешника желаемой реакции.
- **OLD**: Conflict-management experts recommend using “disarming phrases” — calm responses that reduce tension and deprive the joker of the reaction they are looking for.
- **NEW**: Conflict management experts recommend using “disarming phrases” — calm responses that lower tension and deny the teaser the reaction they are looking for.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'joker', which in this context better captures the essence of a person making mocking remarks, whereas 'teaser' in B sounds too playful or affectionate. A also uses 'reduce tension', which is more idiomatic in professional/psychological contexts than 'lower tension'.
  - [new/style/minor] The word 'teaser' is too lighthearted for a conflict management context; 'joker' or 'mocker' is better. 'Lower tension' is acceptable but 'reduce tension' is more standard.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses much more natural and idiomatic vocabulary ('lower tension' and 'teaser'). Translation B uses 'deprive' and 'joker', which sound unnatural and slightly off-target in this psychological context.
  - [old/style/major] 'deprive of the reaction' is a heavy, non-idiomatic construction; 'deny the reaction' or 'prevent the reaction' would be better, but A's 'deny the teaser the reaction' is very smooth.
  - [old/style/minor] 'joker' implies someone telling jokes, whereas 'teaser' or 'provocateur' better captures the intent of someone mocking or testing boundaries (насмешник).
  - [old/style/minor] 'reduce tension' is fine, but 'lower tension' is slightly more common in this specific UX/educational context.

#### 🟡 en `/steps_description/21/text`— вердикт неустойчив

- **RU**: Наступить на жвачку часто вызывает чувство брезгливости, которое является одной из базовых эмоций человека. Это естественная реакция на потенциально вредные или неприятные вещества, встроенная в нас эволюционно для защиты здоровья.
- **OLD**: Stepping on chewing gum often triggers disgust, which is one of the basic human emotions. It is a natural reaction to potentially harmful or unpleasant substances that evolved as a way of protecting our health.
- **NEW**: Stepping on gum often triggers a feeling of disgust, which is one of the fundamental human emotions. It is a natural reaction to potentially harmful or unpleasant substances, evolved to protect our health.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and flows better, using 'evolved to protect' which is more idiomatic than B's wordy 'evolved as a way of protecting'.
  - [old/style/minor] The phrase 'as a way of protecting' is unnecessarily wordy (clunky) for a natural English flow.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more fluid and avoids the slightly clunky 'a feeling of disgust' used in B. It also uses a more natural relative clause structure at the end.
  - [new/style/minor] The phrase 'a feeling of disgust' is slightly wordier than necessary; 'disgust' alone is more idiomatic in this context. The comma splice/appositive structure 'substances, evolved to...' is slightly less smooth than A's relative clause.

#### 🟢 en `/steps_description/12/text` — NEW лучше (2:0)

- **RU**: Исследования показывают, что люди часто ведут себя более агрессивно в анонимных ситуациях, таких как вождение, где они чувствуют себя защищенными своим автомобилем.
- **OLD**: Research shows that people often behave more aggressively in anonymous situations such as driving, where they feel protected by their car.
- **NEW**: Research shows that people often behave more aggressively in anonymous situations, such as driving, where they feel protected by their vehicle.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A is slightly more sophisticated and fits the 'expert friend' tone better by using 'vehicle' instead of the more casual 'car', and it correctly uses a comma before 'such as' to set off the non-restrictive clause.
  - [old/style/minor] Missing comma before 'such as' makes the sentence feel slightly rushed; 'car' is a bit more colloquial than 'vehicle' in a research context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Translation B is slightly more professional and polished. The use of 'vehicle' instead of 'car' sounds more natural in a research/scientific context, and the comma before 'such as' correctly sets off the non-restrictive clause, improving readability.
  - [old/style/minor] Missing comma before 'such as' makes the sentence feel slightly rushed; 'car' is a bit more colloquial than 'vehicle' for a research-based statement.

#### 🔴 en `/steps_description/17/text` — OLD лучше (2:0)

- **RU**: Контекст разговора играет большую роль в восприятии шуток. Если тема серьезная и эмоционально значимая, шутки могут вызывать большее раздражение, так как они воспринимаются как неуважение к проблеме.
- **OLD**: The context of a conversation plays a major role in how jokes are perceived. If the topic is serious and emotionally important, jokes can feel especially irritating because they are experienced as a lack of respect for the issue.
- **NEW**: The context of a conversation plays a major role in how jokes are perceived. If the topic is serious and emotionally significant, jokes can cause more irritation because they are perceived as a lack of respect for the issue.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A sounds much more natural and idiomatic for a mental health/educational context. 'Feel especially irritating' and 'experienced as' flow better than the slightly clunky 'cause more irritation' and 'perceived as' used in B.
  - [new/style/minor] The phrasing 'cause more irritation' and 'perceived as' is a bit heavy and sounds more like a literal translation (calque) than natural English prose.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more natural and empathetic, using 'feel especially irritating' and 'experienced as' instead of the more clinical and repetitive 'cause more irritation' and 'perceived as' used in A.
  - [new/style/minor] The phrasing 'cause more irritation' and 'perceived as' is slightly repetitive and feels more like a literal translation than a natural English sentence.

#### 🟡 en `/steps_description/10/text`— вердикт неустойчив

- **RU**: Психологи отмечают, что насмешки могут восприниматься мозгом как форма социальной угрозы, активируя те же области, что и при физической опасности.
- **OLD**: Psychologists note that teasing and mockery can be perceived by the brain as a form of social threat, activating similar areas to those involved in physical danger.
- **NEW**: Psychologists note that ridicule can be perceived by the brain as a form of social threat, activating the same areas as physical danger.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more precise and idiomatic. Translation B contains a logical error (semantic mismatch) by saying ridicule activates the same areas 'as physical danger' instead of the areas 'involved in' or 'associated with' it.
  - [new/style/major] The phrase 'activating the same areas as physical danger' is a logical error; it implies the areas are the danger itself, rather than being activated by it. It should be 'areas associated with physical danger'.
  - [new/omission/minor] The original 'насмешки' (plural) is better captured by 'teasing and mockery' or just 'mockery', whereas 'ridicule' is a more singular/abstract concept.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more concise and follows the original structure perfectly without unnecessary additions. Translation B introduces extra words ('teasing and mockery') and a wordy construction ('similar areas to those involved in') that makes it feel less like a professional scientific observation and more like a loose paraphrase.
  - [old/addition/minor] Added 'teasing and' which wasn't in the original.
  - [old/style/minor] The phrase 'similar areas to those involved in' is unnecessarily wordy compared to the punchy 'the same areas as'.

#### 🟢 en `/steps_description/16/text` — NEW лучше (2:0)

- **RU**: "Эффект негативности" показывает, что негативные события имеют более сильное влияние на наше психологическое состояние, чем позитивные. Это объясняет, почему плохой день может казаться особенно тяжелым.
- **OLD**: The “negativity effect” shows that negative events have a stronger impact on our psychological state than positive ones. This helps explain why a bad day can feel particularly heavy.
- **NEW**: The “negativity bias” shows that negative events have a stronger impact on our mental well-being than positive ones. This explains why a bad day can feel particularly heavy.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A uses the correct psychological term 'negativity bias' and the project-standard 'mental well-being', whereas B uses a literal translation 'negativity effect' and the overly academic 'psychological state'.
  - [old/terminology/major] The standard term is 'negativity bias', not 'negativity effect'.
  - [old/style/minor] 'psychological state' is more academic/heavy than the preferred 'mental well-being'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B uses the correct psychological term 'negativity bias' and the project-standard 'mental well-being' instead of the more academic 'psychological state'.
  - [old/terminology/major] Used 'negativity effect' instead of the standard 'negativity bias'; used 'psychological state' instead of the preferred 'mental well-being'.

