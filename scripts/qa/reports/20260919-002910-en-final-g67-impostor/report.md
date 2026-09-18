# QA: слепое парное сравнение переводов — en-final-g67-impostor

- **Дата**: 2026-09-18T21:29:10.072Z
- **Метка**: en-final-g67-impostor
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: tests/impostor.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/impostor.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 16 | 🔴 2 | ⚪ 0 | 🟡 2 | 0 / 0 | 89% |
| **итого** | 20 | 🟢 16 | 🔴 2 | ⚪ 0 | 🟡 2 | 0 / 0 | 89% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×3, style/major×1; OLD — style/minor×18, mistranslation/minor×3, addition/minor×3, terminology/minor×3, style/major×2, omission/major×2, addition/major×1, terminology/major×1

### Детали пар (для спот-чека)

#### 🟢 en `/steps_description/4/fact` — NEW лучше (2:0)

- **RU**: Тина Фей, известная комедиантка и писательница, неоднократно упоминала о своих чувствах самозванства. Она часто думала, что её успехи в комедии и телевидении были случайными. В своей книге "Bossypants" она делится своими сомнениями и страхами, показывая, что д…
- **OLD**: Tina Fey, a well-known comedian and writer, has repeatedly mentioned her impostor feelings. She often thought her success in comedy and television was just luck. In her book “Bossypants”, she shares her doubts and fears, showing that even highly successful peo…
- **NEW**: Tina Fey, the renowned comedian and writer, has frequently mentioned her feelings of being an imposter. She often felt her success in comedy and television was accidental. In her book “Bossypants,” she shares her doubts and fears, showing that even the most su…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B sounds much more natural and idiomatic for a narrative text. Translation A uses the awkward phrase 'impostor feelings' (a calque of 'чувства самозванства') and 'just luck', whereas B uses the standard 'feelings of being an imposter' and the more evocative 'feel like they don’t belong'.
  - [old/style/major] 'impostor feelings' is an unnatural construction; 'feelings of imposter syndrome' or 'feeling like an imposter' would be better.
  - [old/style/minor] 'was just luck' is a bit too colloquial/simple compared to the original tone.
  - [new/style/minor] 'accidental' is slightly formal for success, but 'felt her success... was accidental' is grammatically sound.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and flows better for a narrative text. 'Feel like they don’t belong' is a much more natural and common way to express 'чувствовать себя не на своем месте' in this context than 'feel out of place'.
  - [old/style/minor] 'impostor feelings' sounds slightly clunky compared to 'feelings of being an imposter' or 'impostor syndrome'.
  - [old/style/minor] 'just luck' is a bit too informal/reductive for the original 'были случайными' (were accidental/coincidental).

#### 🟢 en `/steps_description/18/text` — NEW лучше (2:0)

- **RU**: Опросы среди профессионалов показывают, что около 55% респондентов откладывают рассказ о своих успехах, ожидая, что они могут не произойти или быть воспринятыми негативно.
- **OLD**: Surveys of professionals show that about 55% of respondents delay sharing news about their successes, worrying that things might not work out or that others might react negatively.
- **NEW**: Surveys among professionals show that about 55% of respondents delay talking about their successes, fearing they might not happen or might be perceived negatively.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B is more precise and closer to the original meaning. Translation A introduces unnecessary semantic shifts ('sharing news', 'things might not work out') that deviate from the source text.
  - [old/mistranslation/minor] 'sharing news about their successes' and 'things might not work out' are loose interpretations that change the specific focus of the original sentence.
  - [old/style/minor] The phrasing is slightly more wordy and less direct than the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more concise and professional, staying closer to the original structure without unnecessary wordiness. Translation B introduces 'sharing news about', which is an addition not present in the original, and uses a more colloquial 'things might not work out' instead of the more precise 'they might not happen'.
  - [old/addition/minor] added 'sharing news about'
  - [old/style/minor] the phrase 'things might not work out' is slightly more informal/vague than the original

#### 🟢 en `/steps_description/1/text` — NEW лучше (2:0)

- **RU**: Ощущение, что вы производите впечатление более компетентного человека, чем вы сами себя считаете, является характерным признаком синдрома самозванца. Люди с этим синдромом часто ощущают, что их успехи не заслужены, и боятся быть разоблаченными.
- **OLD**: Feeling that you come across as more competent than you believe yourself to be is a hallmark of impostor syndrome. People with this pattern often feel that their success is undeserved and fear being “found out”.
- **NEW**: Feeling like you come across as more competent than you believe yourself to be is a hallmark of imposter syndrome. People with this syndrome often feel their success is undeserved and fear being “found out.”
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more natural and follows standard English punctuation rules. Translation B uses 'impostor' (which is acceptable but 'imposter' is more common in US English) and incorrectly places the period outside the quotation marks, which violates US English standards.
  - [old/style/minor] Punctuation error: in US English, the period should be inside the closing quotation mark ('found out.')
  - [old/style/minor] The phrase 'People with this pattern' is slightly less direct than 'People with this syndrome' when referring back to the specific clinical term used in the previous sentence.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more natural and follows US English punctuation standards (period inside the quotation marks). Translation A uses 'pattern' instead of 'syndrome', which slightly deviates from the original's focus on the specific condition.
  - [old/terminology/minor] Used 'pattern' instead of 'syndrome' to refer to the condition.
  - [old/style/minor] Punctuation: in US English, the period should be inside the closing quotation mark.

#### 🟢 en `/steps_description/5/fact` — NEW лучше (2:0)

- **RU**: Том Хэнкс, знаменитый актер и обладатель двух премий "Оскар", откровенно говорил о своем страхе разоблачения. Он признавался, что часто чувствует себя не на своем месте и боится, что люди поймут, что он не настолько талантлив, как они думают.
- **OLD**: Tom Hanks, a famous actor and two-time Oscar winner, has spoken frankly about his fear of being exposed. He has admitted that he often feels out of place and worries that people will realise he is not as talented as they think.
- **NEW**: Tom Hanks, the famous actor and two-time Oscar winner, has spoken candidly about his fear of being exposed. He admitted that he often feels like an imposter and fears people will realize he isn’t as talented as they think.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A uses the idiomatic term 'imposter' (referring to imposter syndrome), which perfectly captures the psychological essence of the original Russian phrase 'не на своем месте' in this context. Translation B is a bit more literal and clunky.
  - [old/style/minor] The phrase 'feels out of place' is a literal translation of 'чувствует себя не на своем месте', whereas 'feels like an imposter' is much more natural for a native speaker describing this specific psychological phenomenon.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses more idiomatic and natural phrasing ('candidly', 'feels like an imposter') that perfectly captures the psychological nuance of the original text. Translation A is grammatically correct but sounds slightly more literal and less sophisticated.
  - [old/style/minor] The phrase 'worries that people will realise' is a bit wordy compared to the more punchy 'fears people will realize' in B.

#### 🟡 en `/steps_description/3/fact`— вердикт неустойчив

- **RU**: В опросе, проведенном среди студентов престижных университетов, около 60% признались, что чувствуют себя менее уверенно в своих способностях после получения положительной оценки или похвалы.
- **OLD**: In surveys of students at highly selective universities, about 60% reported feeling less confident in their abilities after receiving positive grades or praise.
- **NEW**: In a survey of students at prestigious universities, about 60% admitted to feeling less confident in their abilities after receiving positive feedback or praise.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more accurate to the original text. Translation B changes 'prestigious' to 'highly selective' and 'positive grade' to 'positive grades', which slightly shifts the nuance and number.
  - [old/mistranslation/minor] Changed 'prestigious' to 'highly selective' and 'positive grade' (singular) to 'positive grades' (plural).
  - [old/style/minor] The use of 'surveys' (plural) instead of 'a survey' (singular) deviates from the source.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'highly selective universities', which is a much more natural and idiomatic way to describe such institutions in English than the literal 'prestigious universities'.
  - [new/style/minor] The phrase 'prestigious universities' is a bit of a cliché and sounds slightly less academic/natural than 'highly selective' in this context. Also, 'positive feedback or praise' is slightly redundant as praise is a form of feedback.

#### 🟢 en `/steps_description/9/text` — NEW лучше (2:0)

- **RU**: Негативные мысли и внутренний критик могут подрывать способность принимать положительные отзывы. Люди с синдромом самозванца часто интерпретируют комплименты как преувеличенные или незаслуженные, что препятствует признанию собственных успехов.
- **OLD**: A harsh inner critic can make it difficult to accept positive feedback. People with impostor syndrome often interpret compliments as exaggerated, insincere or undeserved, which prevents them from integrating positive information about themselves.
- **NEW**: Negative thoughts and an inner critic can undermine the ability to accept positive feedback. People with imposter syndrome often interpret compliments as exaggerated or undeserved, which prevents them from owning their successes.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and punchy, using the natural expression 'owning their successes' instead of the wordy 'integrating positive information about themselves'.
  - [old/style/minor] The phrase 'integrating positive information about themselves' is overly clinical and wordy compared to the original.
  - [old/addition/minor] Added 'insincere', which is not in the original text.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is a precise and idiomatic rendering of the original. Translation B introduces unnecessary adjectives ('harsh', 'insincere') and uses a heavy, academic phrase ('integrating positive information about themselves') instead of the more natural 'owning their successes'.
  - [old/addition/minor] Added 'harsh' and 'insincere' which were not in the original.
  - [old/style/minor] The phrase 'integrating positive information about themselves' is overly clinical and wordy compared to the original.

#### 🔴 en `/steps_description/12/fact` — OLD лучше (2:0)

- **RU**: Практика позитивного самоговорения и самопринятия может помочь уменьшить страх разоблачения. Психотерапевты рекомендуют фиксировать свои успехи и признания, чтобы напомнить себе о своей компетентности.
- **OLD**: Practices such as compassionate self-talk and keeping a record of achievements can help reduce the fear of being “found out”. Therapists often encourage clients to regularly note specific examples of their competence.
- **NEW**: Practicing positive self-talk and self-acceptance can help reduce the fear of being exposed. Psychotherapists recommend keeping track of your successes and recognition to remind yourself of your competence.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Translation A sounds much more natural and idiomatic for a mental health context. 'Fear of being found out' is a perfect way to convey the nuance of 'страх разоблачения' in a psychological sense, whereas 'exposed' in B sounds slightly more clinical or even dramatic. A also avoids the clunky 'psychotherapists recommend' by using a more natural flow.
  - [new/style/major] The phrase 'successes and recognition' is a bit of a literal translation of 'успехи и признания'; in English, 'recognition' usually refers to being recognized by others, whereas the original context implies personal acknowledgments or admissions of growth.
  - [new/style/minor] The sentence structure is a bit heavy and follows the Russian syntax too closely (calque).
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Translation B is much more idiomatic and natural for a mental health context. 'Fear of being found out' is a more authentic way to express the fear of exposure than the literal 'fear of being exposed', and B avoids the clunky 'successes and recognition' in favor of a smoother flow.
  - [new/style/major] The phrase 'fear of being exposed' sounds slightly more like a legal or physical exposure rather than the psychological fear of being 'found out' as an impostor.
  - [new/style/minor] The phrasing 'successes and recognition' is a bit heavy and literal (calque-like).
  - [new/terminology/minor] While 'psychotherapists' is correct, 'therapists' is more common in modern supportive English text.

#### 🟢 en `/steps_description/7/fact` — NEW лучше (2:0)

- **RU**: Стремление к перфекционизму может усиливать чувство самозванства. Люди, которые постоянно стремятся к идеалу, часто испытывают тревогу и страх неудачи, что препятствует признанию своих достижений.
- **OLD**: Perfectionism can strongly reinforce impostor feelings. People who always strive for the ideal often experience high anxiety and a strong fear of failure, which prevents them from appreciating what they have already accomplished.
- **NEW**: The drive for perfectionism can intensify feelings of being an imposter. People who constantly strive for perfection often experience anxiety and a fear of failure, which hinders them from acknowledging their achievements.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and uses more natural phrasing ('feelings of being an imposter' vs 'impostor feelings'). It also avoids the slightly clunky 'what they have already accomplished' in favor of the concise 'acknowledging their achievements'.
  - [old/style/minor] The phrase 'impostor feelings' is understandable but sounds slightly less natural than 'feelings of being an imposter' or 'impostor syndrome'.
  - [old/style/minor] The ending 'appreciating what they have already accomplished' is a bit wordy compared to the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is more natural and follows the source structure accurately without adding unnecessary intensifiers. Translation B introduces 'strong' and 'high' which aren't in the original, and 'appreciating what they have already accomplished' is a wordy deviation from 'recognizing achievements'.
  - [old/addition/minor] Added 'strongly', 'high', and 'strong' which are not in the original text.
  - [old/style/minor] The phrase 'appreciating what they have already accomplished' is more verbose and less precise than 'acknowledging achievements'.

#### 🟢 en `/description/text` — NEW лучше (2:0)

- **RU**: Бывали ли у вас моменты, когда успех казался случайным, а собственные достижения — недостаточно заслуженными? Синдром самозванца — это эмоциональное состояние, при котором человеку трудно признать свою компетентность и заслуги, даже если они очевидны со сторон…
- **OLD**: Have you ever felt that your success was just a matter of luck and that your achievements were not really deserved? Impostor syndrome is an emotional state in which it is difficult for a person to recognise their own competence and merits, even when they are o…
- **NEW**: Have you ever had moments where success felt like a fluke and your own achievements felt undeserved? Imposter syndrome is an emotional state where it is difficult for a person to acknowledge their competence and merits, even when they are obvious to others. Th…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B sounds much more natural and idiomatic for a mental health context. The use of 'fluke' and 'undeserved' in the first paragraph is more engaging and less wordy than A's 'matter of luck' and 'not really deserved'.
  - [old/style/minor] The phrasing 'just a matter of luck' and 'not really deserved' is slightly clunky and feels more like a translation than native prose.
  - [old/terminology/minor] Uses 'pattern' instead of 'state' (состояние), which is a slight shift in meaning, though acceptable in context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 92)
  - Translation A uses more idiomatic and natural phrasing ('felt like a fluke') which fits the 'understanding friend' tone better. Translation B is slightly more wordy and uses 'pattern' instead of 'state', which slightly shifts the meaning from the original.
  - [old/style/minor] The phrasing 'just a matter of luck' is a bit clunky compared to 'felt like a fluke'.
  - [old/mistranslation/minor] Using 'pattern' instead of 'state' (состояние) changes the psychological nuance slightly.

#### 🟢 en `/steps_description/8/fact` — NEW лучше (2:0)

- **RU**: Альберт Эйнштейн, один из величайших ученых всех времен, часто говорил о своих чувствах самозванства. Несмотря на свои выдающиеся достижения в науке, он считал, что его успехи случайны и результат везения. Эйнштейн говорил: "Я испытываю чувство несправедливост…
- **OLD**: Albert Einstein, one of the most influential scientists in history, spoke at times about feeling like an impostor. Despite his outstanding contributions, he considered many of his successes to be due to luck and believed people overestimated his abilities.
- **NEW**: Albert Einstein, one of the greatest scientists of all time, often spoke about his feelings of being an imposter. Despite his extraordinary scientific achievements, he believed his success was accidental and a result of luck. Einstein once said, “I feel a sens…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a complete and accurate rendering of the original text, including the direct quote. Translation B is an omission, as it completely fails to include the specific quote provided in the source.
  - [old/omission/major] The entire direct quote from Einstein is missing, which changes the nature of the text from a narrative with a quote to a summary.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation B is a complete and faithful translation that preserves the original structure, including the direct quote, whereas Translation A omits the entire final sentence.
  - [old/omission/major] The entire quote and the final sentence are missing.

#### 🟢 en `/result/normal/text` — NEW лучше (2:0)

- **RU**: Ваш результат указывает на устойчивое чувство компетентности и уверенности в себе. Вы не склонны чрезмерно сомневаться в своих достижениях или сравнивать себя с другими, и способны открыто признавать свои успехи. Даже сталкиваясь с ошибками, вы сохраняете увер…
- **OLD**: Your result points to a stable sense of competence and self-confidence. You are not overly inclined to doubt your achievements or constantly compare yourself to others, and you are able to acknowledge your successes openly. Even when you make mistakes, you kee…
- **NEW**: Your results indicate a steady sense of competence and self-confidence. You don’t tend to excessively doubt your achievements or compare yourself to others, and you’re able to openly acknowledge your successes. Even when facing mistakes, you maintain confidenc…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A sounds more natural and idiomatic for a mental health app, using smooth phrasing like 'facing mistakes' and 'inner stability'. Translation B feels slightly more formal and heavy due to 'overly inclined' and 'solid inner foundation', which borders on a literal translation of the Russian structure.
  - [old/style/minor] The phrasing 'overly inclined to doubt' is a bit wordy compared to the more natural 'tend to excessively doubt'.
  - [old/style/minor] 'Solid inner foundation' is a bit of a heavy metaphor; 'inner stability' (in A) is more common in modern English psychological contexts.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B sounds more natural and follows the 'understanding friend' tone better by using contractions (don't, you're) and more idiomatic phrasing. Translation A is slightly more formal and heavy, using 'overly inclined' and 'keep faith', which feels a bit stiff for this context.
  - [old/style/minor] The phrasing 'overly inclined to doubt' and 'keep faith in your abilities' is a bit more formal/academic than the desired warm, supportive tone.

#### 🟢 en `/steps_description/8/text` — NEW лучше (2:0)

- **RU**: Это когнитивное искажение называется "иллюзия случайности" и связано с низкой самооценкой и высоким уровнем самокритики. Люди с этим искажением часто недооценивают свои способности и считают, что их успехи незаслуженны.
- **OLD**: This cognitive distortion is sometimes called the “illusion of randomness”: success is seen as a fluke rather than the result of competence and effort. It is closely linked to low self-esteem and harsh self-criticism.
- **NEW**: This cognitive distortion is often called the “illusion of randomness” and is linked to low self-esteem and high levels of self-criticism. People with this distortion often underestimate their abilities and believe their success is unearned.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a faithful and accurate rendering of the original text, maintaining the exact meaning and structure. Translation B introduces significant additions and changes the meaning (omitting the part about underestimating abilities) and uses a colon to link ideas that were separate in the original.
  - [old/omission/major] The entire second sentence of the original regarding underestimating abilities is missing.
  - [old/addition/major] Added 'success is seen as a fluke rather than the result of competence and effort', which is not in the source.
  - [old/style/minor] The use of a colon to connect the definition to the link with self-esteem is a stylistic departure from the original's flow.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation B is a faithful and accurate rendering of the original text, maintaining all key points and the intended structure. Translation A introduces significant additions and changes the meaning by adding an explanation ('success is seen as a fluke...') that is not present in the source.
  - [old/addition/major] Added a whole clause about success being a fluke which is not in the original text.
  - [old/style/minor] The structure is more interpretive/editorial than a direct translation of the provided source.

#### 🟢 en `/steps_description/7/text` — NEW лучше (2:0)

- **RU**: Чувство неудовлетворенности результатами своей работы и стремление к совершенству — частые симптомы синдрома самозванца. Люди с этим синдромом часто устанавливают для себя нереалистично высокие стандарты, что приводит к постоянному ощущению, что их работа недо…
- **OLD**: Feeling dissatisfied with your work and constantly striving for something better is common among people with impostor syndrome. They often set unrealistically high standards for themselves, which makes it difficult to feel that a project is “good enough”.
- **NEW**: Feeling dissatisfied with work results and striving for perfection are common symptoms of imposter syndrome. People with this syndrome often set unrealistically high standards for themselves, leading to a constant sense that their work is never good enough.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much closer to the original structure and meaning, maintaining the specific 'symptoms' and 'constant sense' nuances. Translation A introduces unnecessary changes, such as 'striving for something better' instead of 'perfection' and changing the subject to 'a project', which weakens the personal connection of the original text.
  - [old/mistranslation/minor] striving for something better instead of perfection
  - [old/style/minor] changing 'their work' to 'a project' deviates from the original focus on the individual's self-perception
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is a precise, professional, and idiomatic rendering of the original text. Translation B introduces unnecessary wordiness and shifts the focus from the symptoms to the difficulty of feeling satisfied, slightly altering the original meaning.
  - [old/style/minor] The phrase 'striving for something better' is a weak substitute for 'striving for perfection' (striving for excellence/perfection is the standard idiom).
  - [old/mistranslation/minor] The original refers to 'work' in general, but B suddenly introduces 'a project', which is an unnecessary narrowing of scope.

#### 🟢 en `/steps_description/10/text` — NEW лучше (2:0)

- **RU**: Люди с синдромом самозванца часто чувствуют, что их успехи связаны с удачей или случайностью, а не с их собственными способностями. Это может привести к постоянному ощущению тревоги и страха быть разоблаченным.
- **OLD**: People with impostor syndrome often feel that their success is due to luck or chance rather than their own competence. This can maintain a chronic sense of anxiety and fear of being exposed.
- **NEW**: People with imposter syndrome often feel that their success is due to luck or chance rather than their own abilities. This can lead to constant anxiety and the fear of being exposed.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more natural and flows better. Translation B uses 'maintain a chronic sense', which is a heavy, slightly unnatural construction compared to the simple and effective 'lead to'.
  - [old/style/minor] The phrase 'maintain a chronic sense' is clunky and sounds like a translation from Russian; 'lead to' is much more idiomatic for describing consequences.
  - [old/terminology/minor] While 'competence' is acceptable, 'abilities' (from A) is a more direct and common pairing with 'luck or chance' in this context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more natural and follows the original structure more accurately. Translation A uses 'maintain', which is a mistranslation of 'привести к' (lead to), and 'competence' is slightly more clinical than the original 'способности' (abilities).
  - [old/mistranslation/major] The verb 'maintain' (поддерживать) is used instead of 'lead to' (привести к), which changes the causal relationship described in the original.
  - [old/style/minor] Using 'competence' instead of 'abilities' is acceptable but slightly shifts the tone towards a more formal/clinical register.

#### 🟢 en `/steps_description/9/fact` — NEW лучше (2:0)

- **RU**: По данным опросов, около 60% женщин и 40% мужчин сообщают, что им сложно принимать комплименты в профессиональной среде, так как они чувствуют себя недостойными.
- **OLD**: Surveys suggest that around 60% of women and 40% of men find it hard to accept compliments in professional settings because they feel they have not truly earned them.
- **NEW**: According to surveys, about 60% of women and 40% of men report that they find it difficult to accept compliments in professional settings because they feel unworthy.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is more faithful to the original meaning and uses a more natural, concise structure. Translation A introduces an addition ('not truly earned them') that changes the nuance of the original 'feeling unworthy'.
  - [old/addition/minor] The phrase 'they have not truly earned them' is an interpretation of 'feeling unworthy', which adds unnecessary complexity and shifts the focus from the feeling to the merit.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A is a precise and natural rendering of the original. Translation B introduces a significant mistranslation by changing 'feeling unworthy' to 'feeling they haven't earned them', which shifts the psychological meaning from self-worth to merit.
  - [old/mistranslation/major] The original 'чувствуют себя недостойными' refers to a sense of unworthiness (self-worth), whereas 'not truly earned them' implies a lack of achievement/merit, which is a different psychological concept.

#### 🟡 en `/steps_description/16/fact`— вердикт неустойчив

- **RU**: Люди, страдающие синдромом самозванца, часто забывают, что окружающие тоже могут испытывать подобные сомнения и неуверенность. Осознание этого факта может помочь уменьшить чувство одиночества и неадекватности.
- **OLD**: People with impostor syndrome often forget that many of those around them also experience self-doubt. Realising that you are not alone in these feelings can reduce the sense of isolation and inadequacy.
- **NEW**: People struggling with imposter syndrome often forget that others may also experience similar doubts and insecurities. Realizing this can help reduce feelings of loneliness and inadequacy.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is a precise, elegant, and faithful rendering of the original text. Translation B introduces an addition ('that you are not alone') which, while psychologically sound, deviates from the original structure and adds unnecessary wordiness.
  - [old/addition/minor] The phrase 'that you are not alone in these feelings' is an interpretation/addition not present in the original text.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A sounds more natural and empathetic, using the idiomatic 'not alone in these feelings' instead of a literal translation. Translation B is grammatically correct but feels slightly more clinical and repetitive.
  - [new/style/minor] The phrase 'reduce feelings of loneliness' is a bit clunky compared to 'reduce the sense of isolation' in a psychological context.
  - [new/style/minor] The transition 'Realizing this can help...' is a bit dry/academic for a supportive tone.

#### 🟢 en `/steps_description/3/text` — NEW лучше (2:0)

- **RU**: Принятие похвалы и признание своих достижений — важные шаги в преодолении синдрома самозванца. Психологи рекомендуют регулярно напоминать себе о своих успехах и заслугах, а также учиться принимать комплименты без внутреннего сопротивления.
- **OLD**: Being able to accept praise and acknowledge your achievements is an important step in overcoming impostor syndrome. Psychologists recommend regularly reminding yourself of your successes and learning to accept compliments without arguing with them internally.
- **NEW**: Accepting praise and acknowledging your achievements are important steps in overcoming imposter syndrome. Psychologists recommend regularly reminding yourself of your successes and merits, as well as learning to accept compliments without internal resistance.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A is idiomatic, flows naturally, and uses precise terminology. Translation B contains a clunky, non-native phrasing ('arguing with them internally') and a slight grammatical mismatch between the subject and verb.
  - [old/style/major] The phrase 'arguing with them internally' is an unnatural way to describe psychological resistance; it sounds like a literal translation of a Russian thought process.
  - [old/style/minor] The subject 'Being able to... and acknowledge...' is treated as a singular 'is', which is grammatically debatable here compared to the more direct plural structure in A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is more idiomatic and uses the correct psychological terminology ('internal resistance'). Translation A uses a clunky and unnatural phrase 'arguing with them internally' to translate 'внутреннее сопротивление'.
  - [old/style/major] The phrase 'arguing with them internally' is a literal and awkward translation of 'внутреннее сопротивление'; a native speaker would use 'internal resistance'.
  - [old/other/minor] Subject-verb agreement: 'Being able to accept... and acknowledge...' is a compound subject, so 'are' would be more appropriate than 'is', though 'is' can sometimes be used for a singular concept.

#### 🔴 en `/result/normal/title` — OLD лучше (2:0)

- **RU**: Уверенность в собственной ценности
- **OLD**: Confidence in your own worth
- **NEW**: Confidence in your own value
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - In the context of self-esteem and psychology, 'worth' is the idiomatic and standard term for 'ценность' (self-worth), whereas 'value' sounds more like market price or utility.
  - [new/style/minor] 'Value' is less natural than 'worth' when referring to a person's inherent psychological value.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In the context of self-esteem and psychology, 'worth' is the idiomatic and natural way to describe a person's inherent value, whereas 'value' sounds more like a market price or utility.
  - [new/style/minor] Using 'value' for a person sounds slightly clinical or transactional compared to the more natural 'worth'.

#### 🟢 en `/steps_description/6/text` — NEW лучше (2:0)

- **RU**: Люди с синдромом самозванца часто фокусируются на своих неудачах, игнорируя или преуменьшая свои успехи. Это явление связано с когнитивными искажениями, такими как негативный фильтр и дискаунтирование позитивного.
- **OLD**: People with impostor syndrome often focus on their failures and minimise or ignore their successes. This is linked to cognitive distortions such as a negative mental filter and “discounting the positives”.
- **NEW**: People with imposter syndrome often focus on their failures while ignoring or downplaying their successes. This phenomenon is linked to cognitive distortions, such as a mental filter and discounting the positive.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B is more idiomatic and follows the project's terminology guidelines perfectly. Translation A uses 'discounting the positives' (plural) and unnecessary quotation marks, whereas B uses the canonical singular form 'discounting the positive' as required.
  - [old/terminology/minor] Uses 'discounting the positives' instead of the standard 'discounting the positive'.
  - [old/style/minor] The use of quotation marks around the term is unnecessary and looks less professional in a psychological context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A follows the glossary perfectly (mental filter, discounting the positive) and flows naturally. Translation B uses 'minimise' which is less idiomatic here than 'downplaying', and adds unnecessary quotation marks and a plural 'positives' which deviates from the standard CBT term.
  - [old/terminology/major] Used 'discounting the positives' instead of the canonical 'discounting the positive'
  - [old/style/minor] Unnecessary quotation marks around the term
  - [old/style/minor] Added 'negative' to 'mental filter', which is redundant as the term itself implies the mechanism

#### 🟢 en `/steps_description/17/fact` — NEW лучше (2:0)

- **RU**: Исследования показывают, что позитивное подкрепление и поддержка со стороны окружающих могут значительно уменьшить уровень тревоги и повысить уверенность в своих силах. Развитие навыков самоподдержки и осознанности также помогает справляться с синдромом самозв…
- **OLD**: Research shows that supportive feedback and encouragement from others can significantly reduce anxiety and boost confidence. Developing skills of self-support and mindfulness also helps in coping with impostor feelings.
- **NEW**: Research shows that positive reinforcement and support from others can significantly reduce anxiety levels and increase confidence. Developing self-support and mindfulness skills also helps in managing imposter syndrome.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B uses the correct psychological term 'imposter syndrome' and follows the natural flow of English scientific/educational prose. Translation A uses 'impostor feelings', which is a weaker, less professional phrasing.
  - [old/terminology/major] Used 'impostor feelings' instead of the standard 'imposter syndrome'.
  - [old/style/minor] The phrase 'Developing skills of self-support' is slightly clunky compared to the more natural 'Developing self-support skills'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more idiomatic and uses precise terminology. Translation B uses 'impostor feelings', which is a weaker, less professional way to refer to 'imposter syndrome', and 'skills of self-support' is a clunky, non-native construction.
  - [old/terminology/major] Used 'impostor feelings' instead of the standard 'imposter syndrome'.
  - [old/style/minor] 'Developing skills of self-support' is a heavy, non-idiomatic construction compared to 'Developing self-support skills'.

