# QA: слепое парное сравнение переводов — en-final-g67-bdi

- **Дата**: 2026-09-18T21:15:47.022Z
- **Метка**: en-final-g67-bdi
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: tests/bdi.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/bdi.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 10 | 🔴 5 | ⚪ 0 | 🟡 5 | 0 / 2 | 67% |
| **итого** | 20 | 🟢 10 | 🔴 5 | ⚪ 0 | 🟡 5 | 0 / 2 | 67% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×5, style/major×1; OLD — style/minor×11, mistranslation/critical×2, style/major×2, mistranslation/major×2, terminology/minor×1, mistranslation/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/steps_description/4/text`— вердикт неустойчив

- **RU**: Чувство вины — это естественная эмоция, которая помогает нам регулировать поведение и поддерживать социальные связи. Однако постоянное или чрезмерное чувство вины может быть симптомом депрессии.
- **OLD**: Guilt is a natural emotion that helps us regulate our behavior and maintain social ties. However, constant or excessive guilt can be a symptom of depression.
- **NEW**: Guilt is a natural emotion that helps us regulate behavior and maintain social connections. However, constant or excessive guilt can be a symptom of depression.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Both translations are excellent, but A is slightly more idiomatic for a mental health context. 'Social connections' is a more standard and natural collocation in modern English than 'social ties' for this specific topic.
  - [old/style/minor] 'Social ties' is slightly more formal/sociological, whereas 'social connections' sounds more natural in a supportive, expert-friend tone.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A is more idiomatic and natural for a native speaker due to the use of the possessive 'our behavior', which creates a warmer, more personal tone consistent with the 'understanding friend' persona. Translation B is grammatically correct but feels slightly more clinical/dry.
  - [new/style/minor] Missing possessive 'our' before 'behavior' makes the sentence feel slightly more detached/academic compared to the target tone.

#### 🟢 en `/instagram` — NEW лучше (2:0)

- **RU**: 17879592612216085 18040126178253209 18004846742704029 18478233460028362 18213594730288189 17996126909739388 18310324171200503 18015134789663690 18045768971222812
- **OLD**: 18037555940373910 18347335609181302 18302684512227308
- **NEW**: 17879592612216085 18040126178253209 18004846742704029 18478233460028362 18213594730288189 17996126909739388 18310324171200503 18015134789663690 18045768971222812
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 0 / NEW 100)
  - The original text consists of a series of numeric identifiers. Translation A is an exact match, while Translation B contains entirely different numbers, which constitutes a critical mistranslation/data corruption.
  - [old/mistranslation/critical] The numbers do not match the original identifiers at all.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 0 / NEW 100)
  - Перевод A содержит критическую потерю данных (omission), в то время как перевод B является точной копией оригинала.
  - [old/omission/critical] Most of the original IDs are missing

#### 🟢 en `/description/text` — NEW лучше (2:0)

- **RU**: BDI — валидный инструмент для оценки депрессивных состояний, широко используемый специалистами. Он помогает определить уровень эмоционального состояния и отслеживать изменения со временем. Мы рекомендуем проходить тест периодически, чтобы наблюдать динамику и …
- **OLD**: The BDI (Beck Depression Inventory) is a valid tool for assessing depressive states and is widely used by professionals. It helps determine the level of emotional distress and track changes over time. We recommend taking the test periodically to observe your d…
- **NEW**: The Beck Depression Inventory (BDI) is a valid tool for assessing depressive states, widely used by professionals. It helps determine emotional state levels and track changes over time. We recommend taking the test periodically to observe trends and notice cha…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 94)
  - Translation B sounds more natural and idiomatic. Translation A uses 'observe your dynamics', which is a heavy calque from Russian, whereas 'observe trends' is the standard English way to describe such data. Translation B also handles the final sentence more smoothly.
  - [old/style/major] the phrase 'observe your dynamics' is a direct calque from Russian and sounds unnatural in English; 'observe trends' or 'monitor progress' is preferred
  - [old/style/minor] the phrase 'if you feel that life is hard right now' is slightly more dramatic/heavy than the original 'если вы чувствуете, что вам тяжело'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is more natural and avoids the 'translationese' present in B. Specifically, 'observe trends' is much better than the literal and awkward 'observe your dynamics', and 'things are getting difficult' sounds more idiomatic than 'life is hard right now'.
  - [old/style/major] The phrase 'observe your dynamics' is a direct calque from Russian 'наблюдать динамику' and is not used this way in English; 'observe trends' or 'track progress' is the correct way.
  - [old/style/minor] The phrase 'If you feel that life is hard right now' is a bit heavy-handed compared to the more subtle 'If you feel like things are getting difficult'.

#### 🟢 en `/steps_description/11/text` — NEW лучше (2:0)

- **RU**: Участие в группах поддержки или терапевтических группах может помочь вернуть интерес к общению. Эти группы предоставляют безопасное пространство для выражения своих чувств и получения поддержки от других, кто сталкивается с аналогичными проблемами.
- **OLD**: Taking part in support groups or therapy groups can help restore interest in social contact. Such groups provide a safe space to share feelings and receive support from others who face similar difficulties.
- **NEW**: Participating in support groups or therapeutic groups can help restore interest in socializing. These groups provide a safe space to express feelings and receive support from others facing similar challenges.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A uses 'socializing' and 'facing similar challenges', which sound much more natural and idiomatic for a mental health context than the slightly more clinical or stiff 'social contact' and 'difficulties' in B.
  - [old/style/minor] 'social contact' sounds a bit formal/clinical compared to the more natural 'socializing'.
  - [old/style/minor] 'difficulties' is fine, but 'challenges' (as in A) is the preferred modern term in mental health support contexts.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses more natural, idiomatic English ('socializing' instead of 'social contact' and 'challenges' instead of 'difficulties') and flows better as a piece of psychoeducation.
  - [old/style/minor] 'social contact' sounds a bit clinical/stilted compared to 'socializing'; 'therapy groups' is acceptable but 'therapeutic groups' is more precise for the context.

#### 🟢 en `/steps/17` — NEW лучше (2:0)

- **RU**: Мой аппетит таков, как и был Мой аппетит стал хуже, чем раньше Мой аппетит значительно снизился У меня совсем нет аппетита
- **OLD**: My appetite is as good as it used to be My appetite is not as good as before My appetite has become much weaker Nothing stimulates my appetite
- **NEW**: My appetite is the same as it was My appetite has become worse than before My appetite has decreased significantly I have no appetite at all
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 95)
  - Translation A is a precise, natural, and faithful rendering of the original scale. Translation B introduces significant mistranslations and semantic shifts, particularly in the last line.
  - [old/mistranslation/critical] The last line 'Nothing stimulates my appetite' is a complete departure from the original 'У меня совсем нет аппетита' (I have no appetite at all).
  - [old/mistranslation/major] The second line 'is not as good as before' changes the meaning of 'стал хуже' (has become worse) to a state of being, and the third line 'become much weaker' is an unnatural way to describe appetite loss in English.
  - [old/style/minor] The first line 'as good as it used to be' adds a positive connotation ('good') that isn't in the neutral Russian original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B is a precise, natural, and accurate reflection of the original text. Translation A introduces a significant mistranslation in the fourth line, changing the meaning from 'having no appetite' to 'lack of stimulation'.
  - [old/mistranslation/critical] The fourth line 'Nothing stimulates my appetite' is a complete departure from the original 'У меня совсем нет аппетита' (I have no appetite at all).
  - [old/style/minor] The third line 'much weaker' is slightly unnatural for appetite; 'decreased' or 'worse' is more idiomatic.

#### 🟡 en `/steps_description/17/text`— вердикт неустойчив

- **RU**: По данным Всемирной организации здравоохранения (ВОЗ), депрессия является ведущей причиной изменения пищевых привычек и нарушений пищевого поведения у взрослых.
- **OLD**: According to the World Health Organization, depression is a leading cause of changes in eating habits and disordered eating in adults.
- **NEW**: According to the World Health Organization (WHO), depression is a leading cause of changes in eating habits and eating disorders in adults.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses 'disordered eating', which is the more natural and clinically appropriate term in English for the concept of 'нарушения пищевого поведения' compared to the more diagnostic 'eating disorders' used in A.
  - [new/style/minor] While 'eating disorders' is correct, 'disordered eating' is a more fluid and common way to describe the spectrum of behaviors mentioned in the context of lifestyle changes.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B correctly follows the rule of introducing an abbreviation (WHO) upon first mention, whereas Translation A omits it. Translation B also uses the standard clinical term 'eating disorders' instead of the slightly less precise 'disordered eating'.
  - [old/omission/minor] Missing the abbreviation (WHO) which is present in the original and standard for first mentions.
  - [old/terminology/minor] Used 'disordered eating' instead of the more standard 'eating disorders' (нарушений пищевого поведения).

#### 🟢 en `/steps_description/17/fact` — NEW лучше (2:0)

- **RU**: Здоровое питание и регулярные приемы пищи могут помочь стабилизировать аппетит и улучшить общее психическое состояние. Исследования показывают, что диеты, богатые омега-3 жирными кислотами, витаминами и минералами, могут помочь снизить симптомы депрессии и тре…
- **OLD**: Healthy eating and regular meals can help stabilize appetite and improve overall mental state. Research shows that diets rich in omega-3 fatty acids, vitamins and minerals can help reduce symptoms of depression and anxiety.
- **NEW**: Healthy eating and regular meals can help stabilize appetite and improve overall mental well-being. Research shows that diets rich in omega-3 fatty acids, vitamins, and minerals can help reduce symptoms of depression and anxiety.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation B uses the project-approved term 'mental well-being' instead of the more generic 'mental state', which sounds more natural and professional in a mental health context. It also correctly uses the Oxford comma, which is standard for high-quality US English prose.
  - [old/terminology/minor] used 'mental state' instead of the preferred 'mental well-being'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A uses the project-approved term 'mental well-being', whereas Translation B uses 'mental state', which sounds more clinical and less aligned with the warm, supportive tone of the app.
  - [old/terminology/minor] used 'mental state' instead of the preferred 'mental well-being'

#### 🔴 en `/steps_description/18/text` — OLD лучше (2:0)

- **RU**: Изменения в весе могут быть результатом изменений в аппетите и пищевых привычках, связанных с депрессией и тревожными расстройствами. Непреднамеренное значительное изменение веса часто служит индикатором серьезных эмоциональных проблем.
- **OLD**: Changes in weight can result from shifts in appetite and eating patterns related to depression and anxiety disorders. Unintentional, significant weight change often indicates serious emotional difficulties.
- **NEW**: Changes in weight can result from changes in appetite and eating habits associated with depression and anxiety disorders. Significant unintentional weight change often serves as an indicator of serious emotional issues.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A is more concise and uses more natural, professional phrasing ('shifts in appetite', 'eating patterns'). Translation B is slightly more repetitive and wordy ('changes in... changes in', 'serves as an indicator of').
  - [new/style/minor] Repetitive use of 'changes' and 'indicator' makes the text feel slightly more like a translation than native prose.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more natural and professional for a mental health context. 'Shifts in appetite' and 'eating patterns' are more idiomatic than the repetitive 'changes' used in A, and 'emotional difficulties' is a more standard term in psychological literature than 'emotional issues'.
  - [new/style/minor] Repetitive use of 'changes' makes the sentence feel slightly clunky; 'emotional issues' is a bit more colloquial than 'difficulties'.

#### 🟡 en `/steps_description/16/fact`— вердикт неустойчив

- **RU**: Уинстон Черчилль, бывший премьер-министр Великобритании, страдал от депрессии, которую он называл своим "черным псом". Черчилль часто упоминал о своей постоянной усталости и отсутствии энергии, несмотря на свою активную и продуктивную жизнь.
- **OLD**: Winston Churchill, former Prime Minister of the United Kingdom, suffered from depression, which he called his ‘black dog’. He often mentioned feeling constantly tired and lacking energy, despite his active and productive life.
- **NEW**: Winston Churchill, the former UK Prime Minister, suffered from depression, which he called his “black dog.” Churchill often mentioned his constant fatigue and lack of energy, despite his active and productive life.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more polished and follows standard English punctuation for quotes. Translation B uses single quotes and lacks the definite article before 'former Prime Minister', making it feel slightly less natural in this biographical context.
  - [old/style/minor] Missing 'the' before 'former Prime Minister' makes the apposition feel slightly clipped/telegraphic.
  - [old/style/minor] Uses single quotes instead of standard double curly quotes for the idiom.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and fluid, using 'feeling constantly tired and lacking energy' which avoids the heavy, noun-heavy 'constant fatigue and lack of energy' found in B. Translation A also correctly uses single curly quotes for the nickname, whereas B uses a mix of styles.
  - [new/style/minor] The phrasing 'constant fatigue and lack of energy' is slightly more clinical/heavy (noun-heavy) compared to the more natural verb-based approach in A.
  - [new/style/minor] Uses 'the former UK Prime Minister' which is fine, but 'former Prime Minister of the United Kingdom' in A feels slightly more formal and appropriate for a biographical snippet.

#### 🟢 en `/steps/19` — NEW лучше (2:0)

- **RU**: Мое здоровье беспокоит меня не больше обычного Меня беспокоят боли, проблемы с зубами или запоры Меня беспокоят боли, проблемы с зубами, запоры и я долго думаю о них потом Меня так беспокоит мое здоровье, что я не могу думать о чем-либо другом
- **OLD**: I am no more concerned about my health than before I am bothered by aches, dental problems and constipation I am bothered by aches, dental problems and constipation, and I dwell on them for a long time I am so worried about my health that I can’t think about a…
- **NEW**: My health doesn’t worry me more than usual I’m worried about pain, dental issues, or constipation I’m worried about pain, dental issues, and constipation, and I dwell on them for a long time I’m so worried about my health that I can’t think about anything else
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses natural, conversational English ('worry', 'I'm worried') which fits the 'understanding friend' tone, whereas B is overly formal and uses 'concerned' and 'bothered', which sounds more like a clinical questionnaire.
  - [old/style/major] The phrasing 'I am no more concerned... than before' is clunky and unnatural for a personal statement; 'I am bothered by' is too stiff for this context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation B is more natural and idiomatic for a mental health context. Translation A uses 'I am bothered by', which sounds slightly more clinical/passive, and 'no more... than before' is a clunky way to translate 'не больше обычного'.
  - [old/style/minor] The phrasing 'I am no more concerned... than before' is wordy and less natural than 'more than usual'.
  - [old/style/minor] Using 'aches' for 'боли' is acceptable, but 'pain' (in B) is a more direct and common way to express physical discomfort in these types of assessments.

#### 🟢 en `/steps/1` — NEW лучше (2:0)

- **RU**: Я не чувствую страха перед будущим Я чувствую страх перед будущим Я не предвижу ничего хорошего в будущем Будущее кажется мне страшным и безнадежным
- **OLD**: I don’t feel afraid of the future I feel afraid of the future I don’t expect anything good from the future I believe the future is frightening and nothing can be changed
- **NEW**: I don’t feel afraid of the future I feel afraid of the future I don’t see anything good in the future The future feels scary and hopeless
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation B is much more natural and stays closer to the original's emotional tone and structure. Translation A introduces unnecessary complexity and changes the meaning of the last sentence.
  - [old/mistranslation/major] The last sentence 'nothing can be changed' is an addition that isn't in the original 'безнадежным' (hopeless).
  - [old/style/minor] The third sentence 'expect anything good from the future' is slightly more wordy/clunky than the more direct 'see anything good in the future'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is a perfect, natural, and accurate reflection of the original text. Translation B introduces significant mistranslations and additions in the last sentence, changing the meaning from 'feeling hopeless' to 'nothing can be changed'.
  - [old/mistranslation/major] The last sentence 'nothing can be changed' is an addition/interpretation not present in the original 'безнадежным' (hopeless).
  - [old/style/minor] 'I don't expect anything good from the future' is slightly more formal/heavy than the original 'не предвижу'.

#### 🟢 en `/steps/5` — NEW лучше (2:0)

- **RU**: Мне не кажется, что меня осуждают Я чувствую, что люди могут осуждать меня Я ожидаю осуждения Я чувствую, что все вокруг меня осуждают
- **OLD**: I don’t feel that people are judging me I feel that people may judge me I expect to be judged I feel that everyone around me is judging me
- **NEW**: I don’t feel like people are judging me I feel like people might judge me I expect to be judged I feel like everyone around me is judging me
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A uses 'feel like', which is much more natural and idiomatic for expressing subjective feelings in spoken and informal written English. Translation B uses 'feel that', which sounds slightly more formal and stiff, closer to a literal translation of the Russian structure.
  - [old/style/minor] The use of 'feel that' is grammatically correct but sounds more like a formal report than a personal, supportive mental health context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses 'feel like', which is much more natural and idiomatic for expressing subjective feelings in conversational English. Translation A is grammatically correct but sounds slightly more formal and stiff, like a literal translation of 'мне кажется/я чувствую'.
  - [old/style/minor] Uses 'feel that', which is slightly more formal/academic than the natural 'feel like' used in mental health contexts.

#### 🟢 en `/steps_description/1/text` — NEW лучше (2:0)

- **RU**: Страх — это естественная реакция на угрозу. Он помогает нам избегать опасности и защищать себя. Однако, когда страх становится постоянным и не соответствует реальной угрозе, это может быть признаком депрессии.
- **OLD**: Fear is a natural response to threat. It helps us avoid danger and protect ourselves. However, when fear becomes constant and no longer matches real threats, it may be a sign of depression.
- **NEW**: Fear is a natural response to a threat. It helps us avoid danger and protect ourselves. However, when fear becomes constant and doesn’t match a real threat, it may be a sign of depression.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A correctly uses articles ('a threat', 'a real threat'), making it sound natural and grammatically complete. Translation B's omission of the article in the first sentence makes it sound slightly clipped or non-native.
  - [old/style/minor] Missing indefinite article 'a' before 'threat' in the first sentence; 'matches real threats' is slightly less precise than the singular 'a real threat' used in the original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B follows the rules for articles much better, using 'a threat' instead of the bare noun 'threat', which sounds more natural in this context. It also uses the contraction 'doesn't', which aligns with the requested warm, conversational tone.
  - [old/style/minor] Missing article before 'threat' in the first sentence makes it sound slightly clipped/unnatural; lacks the friendly contraction 'doesn't' used in B.

#### 🔴 en `/steps_description/12/text` — OLD лучше (2:0)

- **RU**: Нейропсихологические исследования показывают, что депрессия может изменять активность в префронтальной коре головного мозга, области, ответственной за принятие решений и планирование.
- **OLD**: Neuropsychological research shows that depression can alter activity in the prefrontal cortex, the brain area responsible for decision-making and planning.
- **NEW**: Neuropsychological research shows that depression can change activity in the prefrontal cortex, the area of the brain responsible for decision-making and planning.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 90)
  - Both translations are excellent and accurate, but B uses 'alter' instead of 'change', which sounds more professional and precise in a scientific/medical context, and 'the brain area' is slightly more idiomatic than 'the area of the brain'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Both translations are excellent and accurate, but A is slightly more idiomatic and concise. 'The brain area' is a more natural, streamlined way to phrase the appositive than 'the area of the brain'.

#### 🟢 en `/steps_description/9/fact` — NEW лучше (2:0)

- **RU**: Адель, известная британская певица, открыто говорила о своих проблемах с тревожностью и паническими атаками. Несмотря на свой огромный успех, она часто испытывала сильное беспокойство перед выступлениями и в повседневной жизни. Адель использовала различные мет…
- **OLD**: Adele, the famous British singer, has spoken openly about her problems with anxiety and panic attacks. Despite her huge success, she often experienced intense worry before performances and in everyday life. Adele has used various methods, including therapy and…
- **NEW**: Adele, the famous British singer, has spoken openly about her struggles with anxiety and panic attacks. Despite her immense success, she often experienced intense anxiety before performances and in her daily life. Adele has used various methods, including ther…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A uses more natural and sophisticated vocabulary ('struggles', 'immense', 'daily life') that fits a biographical narrative, whereas B feels slightly more repetitive and uses 'problems' and 'worry', which are less idiomatic in this context.
  - [old/style/minor] 'problems with anxiety' is less idiomatic than 'struggles with anxiety'; 'intense worry' is a bit weak compared to the original 'сильное беспокойство' in a clinical/biographical context; 'everyday life' is fine but 'daily life' flows better here.
  - [old/mistranslation/minor] The final sentence in B changes 'переживаниями' (experiences/feelings) to 'anxiety', which is a slight shift in meaning from the original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses much more natural and idiomatic collocations for a biographical text, such as 'struggles with' instead of 'problems with' and 'immense success' instead of 'huge success'.
  - [old/style/minor] 'problems with' and 'huge success' are slightly more basic/cliché; 'worry' is a bit weak compared to the context of anxiety.
  - [old/terminology/minor] Using 'anxiety' twice in the last sentence is repetitive; B's use of 'experiences' is a better way to capture 'переживания' in this context.

#### 🔴 en `/steps_description/3/fact` — OLD лучше (2:0)

- **RU**: Важно понимать, что анедония может быть вызвана различными факторами, включая биологические (например, изменения в уровнях нейротрансмиттеров) и психологические (например, хронический стресс или травма).
- **OLD**: Anhedonia can be caused by a variety of factors, including biological ones (for example, changes in neurotransmitter levels) and psychological ones (such as chronic stress or trauma).
- **NEW**: It is important to understand that anhedonia can be caused by various factors, including biological ones (such as changes in neurotransmitter levels) and psychological ones (such as chronic stress or trauma).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A is more concise and natural for an English-speaking reader. Translation B starts with 'It is important to understand that', which is a common Russian-to-English filler/calque that adds unnecessary wordiness (clutter) to the sentence.
  - [new/style/minor] unnecessary wordiness/filler phrase 'It is important to understand that' makes the sentence feel more like a translation than original English prose
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B is more natural and concise for an English-speaking reader. Translation A uses a heavy, wordy opening ('It is important to understand that...') which is a common Russian-to-English translation artifact (calque).
  - [new/style/minor] The introductory phrase 'It is important to understand that' is unnecessarily wordy and creates a formal, slightly heavy tone compared to the directness of B.

#### 🔴 en `/steps_description/16/text` — OLD лучше (2:0)

- **RU**: Постоянная усталость — один из наиболее распространенных симптомов депрессии и хронического стресса. Усталость может проявляться как физическая, так и умственная, снижая способность выполнять повседневные задачи и участвовать в социальных взаимодействиях.
- **OLD**: Persistent fatigue is one of the most common symptoms of depression and chronic stress. Fatigue can be both physical and mental, reducing the ability to handle daily tasks and take part in social activities.
- **NEW**: Constant fatigue is one of the most common symptoms of depression and chronic stress. Fatigue can be both physical and mental, reducing the ability to perform daily tasks and participate in social interactions.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses more natural, idiomatic collocations for a mental health context ('persistent fatigue', 'handle daily tasks', 'social activities') compared to the slightly more literal and clinical phrasing in A.
  - [new/style/minor] 'Constant fatigue' is acceptable, but 'persistent' is more professional in a clinical/psychological context; 'perform daily tasks' sounds slightly more formal/robotic than 'handle'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'persistent fatigue', which is more clinically accurate and natural in a mental health context than 'constant fatigue'. It also uses 'handle daily tasks', which sounds more idiomatic and less formal than 'perform'.
  - [new/style/minor] 'Constant fatigue' sounds slightly more colloquial/repetitive; 'perform daily tasks' is a bit stiff/formal for a supportive tone.

#### 🔴 en `/result/exacerbated/title` — OLD лучше (2:0)

- **RU**: Обострённое депрессивное состояние
- **OLD**: Severe depressive state
- **NEW**: Exacerbated depressive state
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - In a mental health context, 'exacerbated' sounds like a clinical description of a process (something getting worse), whereas 'severe' is the standard way to describe the intensity of a state. 'Exacerbated depressive state' sounds like a literal translation (calque) from Russian.
  - [new/style/major] unnatural phrasing; 'exacerbated' is typically used for symptoms or conditions that have worsened, not as a standalone descriptor for a state in this way
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 70)
  - In a mental health context, 'severe' is the standard clinical and natural way to describe an intensified or worsening state, whereas 'exacerbated' sounds overly medical and clunky for a user-facing interface.
  - [new/style/major] The term 'exacerbated' is a heavy, clinical calque from the Russian 'обострённое' and sounds unnatural in a supportive app context.

#### 🟡 en `/steps_description/12/fact`— вердикт неустойчив

- **RU**: Психотерапия, особенно когнитивно-поведенческая терапия (КПТ), может помочь улучшить навыки принятия решений. КПТ помогает людям развивать более адаптивные стратегии мышления и снижать влияние негативных эмоций на когнитивные процессы.
- **OLD**: Psychotherapy, especially cognitive behavioral therapy (CBT), can help improve decision-making skills. CBT helps people develop more adaptive thinking strategies and reduce the influence of negative emotions on cognitive processes.
- **NEW**: Psychotherapy, especially cognitive behavioral therapy (CBT), can help improve decision-making skills. CBT helps people develop more adaptive thinking strategies and reduce the impact of negative emotions on cognitive processes.
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Both translations are virtually identical and perfectly follow all stylistic, grammatical, and terminological guidelines. The choice between 'influence' and 'impact' is a matter of stylistic preference and does not affect the quality.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 98)
  - Both translations are excellent and follow all CBT terminology guidelines. Translation A is slightly better because 'impact' is more idiomatic and natural than 'influence' when discussing the effect of emotions on cognitive processes in a psychological context.

#### 🟡 en `/steps_description/5/fact`— вердикт неустойчив

- **RU**: По данным Национального института психического здоровья США, около 12% людей испытывают социальную тревожность в течение своей жизни.
- **OLD**: According to the U.S. National Institute of Mental Health, about 12% of people experience social anxiety at some point in their lives.
- **NEW**: According to the U.S. National Institute of Mental Health, about 12% of people experience social anxiety during their lifetime.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A uses the more natural and idiomatic phrase 'at some point in their lives' to convey the meaning of 'в течение своей жизни' in this context. Translation B is grammatically correct but sounds slightly more formal/clinical due to 'during their lifetime'.
  - [new/style/minor] 'during their lifetime' is a bit heavy/formal for a supportive, friendly tone compared to the more fluid 'at some point in their lives'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A uses the idiomatic and standard phrase 'during their lifetime', which is the most natural way to express this statistical concept in English. Translation B is grammatically correct but slightly more wordy.

