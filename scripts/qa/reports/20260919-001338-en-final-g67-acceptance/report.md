# QA: слепое парное сравнение переводов — en-final-g67-acceptance

- **Дата**: 2026-09-18T21:13:38.606Z
- **Метка**: en-final-g67-acceptance
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: tests/acceptance.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/acceptance.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 13 | 🔴 6 | ⚪ 0 | 🟡 1 | 0 / 1 | 68% |
| **итого** | 20 | 🟢 13 | 🔴 6 | ⚪ 0 | 🟡 1 | 0 / 1 | 68% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×7, addition/minor×1, mistranslation/major×1, terminology/minor×1; OLD — style/minor×14, style/major×3, addition/minor×2, mistranslation/critical×1, omission/minor×1, mistranslation/minor×1, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟢 en `/steps_description/13/text` — NEW лучше (2:0)

- **RU**: Люди, склонные к перфекционизму, часто связывают свою ценность с успехом в определённых областях. Исследования показывают, что перфекционисты испытывают сильное чувство неадекватности и снижения самооценки, если они не достигают своих высоких стандартов. Около…
- **OLD**: People with perfectionistic tendencies often link their value to success in particular areas. Research shows that perfectionists experience strong feelings of inadequacy and a drop in self-esteem if they fail to meet their high standards. Around 30% of people …
- **NEW**: People prone to perfectionism often link their worth to success in specific areas. Research shows that perfectionists experience strong feelings of inadequacy and lowered self-esteem if they fail to meet their high standards. About 30% of people with pronounce…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and professional, using 'lowered self-esteem' which flows better than the slightly clunky 'a drop in self-esteem' in B. A also uses 'due to an inability', which sounds more like a polished psychological text than B's 'because they cannot'.
  - [old/style/minor] The phrasing 'a drop in self-esteem' and 'because they cannot' is slightly more conversational/wordy, making it feel less like a professional psychological insight compared to A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses more natural, idiomatic collocations ('prone to perfectionism', 'link their worth', 'lowered self-esteem') that sound more like professional psychological writing, whereas A is slightly more wordy and literal.
  - [old/style/minor] 'People with perfectionistic tendencies' is grammatically correct but 'People prone to perfectionism' is more concise and natural; 'a drop in self-esteem' is slightly less idiomatic than 'lowered self-esteem'.

#### 🟢 en `/steps_description/14/fact` — NEW лучше (2:0)

- **RU**: В разных культурах ценность человека может определяться различными факторами, но в западных обществах успех в профессиональной деятельности часто является ключевым критерием оценки ценности личности. Исследования показывают, что в странах с индивидуалистическо…
- **OLD**: Different cultures use different criteria to assess a person’s value, but in many Western societies professional success is a key marker of worth. Studies show that in individualistic cultures such as the USA and the UK, a person’s value is closely tied to car…
- **NEW**: Human value can be defined by different factors across cultures, but in Western societies, professional success is often a key criterion for assessing personal worth. Research shows that in individualistic cultures, such as the US and the UK, a person’s value …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more sophisticated and flows better as an educational/article text. It uses more precise academic phrasing ('defined by different factors', 'In contrast') that matches the source's tone, whereas A feels slightly simplified.
  - [old/style/minor] The opening 'Different cultures use different criteria' is a bit repetitive and less elegant than 'Human value can be defined by different factors'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more elegant and flows better as a cohesive piece of writing. Translation B feels slightly repetitive ('Different cultures use different criteria') and uses a passive construction in the final sentence that is less impactful than the active voice in A.
  - [old/style/minor] The opening phrase 'Different cultures use different criteria' is a bit clunky and repetitive compared to the more sophisticated 'Human value can be defined by different factors across cultures'.
  - [old/style/minor] The final sentence uses a passive voice ('greater importance is placed on'), which is slightly less engaging for a narrative text than the active 'place greater importance on' used in A.

#### 🔴 en `/steps_description/16/fact` — OLD лучше (2:0)

- **RU**: Элеонора Рузвельт, первая леди США, была критически воспринята многими за свою активную общественную деятельность и участие в политике. Несмотря на это, она оставалась верной своим принципам и продолжала бороться за права человека, заявляя: "Никто не может зас…
- **OLD**: Eleanor Roosevelt, First Lady of the United States, faced harsh criticism for her active public role and political involvement. Despite this, she remained true to her principles and continued to fight for human rights, stating: “No one can make you feel inferi…
- **NEW**: Eleanor Roosevelt, the former First Lady of the United States, was often criticized for her active social work and political involvement. Despite this, she remained true to her principles and continued to fight for human rights, stating: “No one can make you f…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A is more precise and stylistically superior. It correctly captures the nuance of 'критически воспринята' with 'faced harsh criticism' and avoids the unnecessary addition of 'former' which is not in the original. Translation B uses 'social work', which in English often implies professional social services rather than 'общественная деятельность' (public role/activity).
  - [new/addition/minor] Added 'the former', which is not present in the original text.
  - [new/style/minor] 'social work' is a narrower term than 'общественная деятельность' (public role/activity).
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more idiomatic and captures the weight of 'критически воспринята' through 'faced harsh criticism'. Translation A's 'social work' sounds more like charity/volunteering, whereas 'public role' better reflects her political stature.
  - [new/style/minor] 'social work' is a bit weak and carries a connotation of social services/charity rather than public/civic activity.
  - [new/addition/minor] Added 'former', which isn't in the original, though historically accurate.

#### 🔴 en `/steps_description/1/fact` — OLD лучше (2:0)

- **RU**: В философии стоицизма одной из центральных идей является способность сохранять внутреннее спокойствие и чувство собственного достоинства, несмотря на внешние обстоятельства. Стоики, такие как Сенека и Марк Аврелий, учили, что истинная ценность человека определ…
- **OLD**: In Stoic philosophy, one of the central ideas is the ability to maintain inner calm and a sense of dignity despite external circumstances. Stoics such as Seneca and Marcus Aurelius taught that a person’s true value is determined not by successes and failures, …
- **NEW**: In Stoic philosophy, one of the central ideas is the ability to maintain inner calm and dignity regardless of external circumstances. Stoics like Seneca and Marcus Aurelius taught that a person’s true value is determined not by successes or failures, but by th…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 97 / NEW 92)
  - Translation B is more precise and idiomatic. It correctly captures 'чувство собственного достоинства' as 'a sense of dignity' and uses 'such as' for examples, which is more appropriate for this formal/educational tone than 'like'.
  - [new/style/minor] Missing 'a sense of' for 'чувство собственного достоинства'; 'like' is slightly more informal than 'such as' in this context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 92)
  - Both translations are excellent and idiomatic. Translation A is slightly better due to the more formal and precise use of 'such as' instead of 'like' in a philosophical context, and 'despite' which flows more naturally here than 'regardless of'.
  - [new/style/minor] The use of 'like' is slightly more colloquial than 'such as' for an academic/philosophical tone, and 'regardless of' is a bit heavier than 'despite'.

#### 🟢 en `/steps_description/14/text` — NEW лучше (2:0)

- **RU**: Восприятие ценности через призму успеха может создавать давление на людей, стремящихся соответствовать высоким стандартам. Исследования показывают, что стремление к успеху, продиктованное желанием быть ценным в глазах общества, может привести к выгоранию и сни…
- **OLD**: Viewing a person’s value mainly through the lens of success can create enormous pressure on those who try to meet very high standards. Research shows that striving for success purely to feel valuable in society’s eyes can lead to burnout and lower overall life…
- **NEW**: Viewing worth through the lens of success can create pressure for those striving to meet high standards. Research shows that the drive for success, fueled by a desire to be valued by society, can lead to burnout and decreased overall life satisfaction. Further…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more concise, professional, and flows naturally as a piece of psychoeducation. Translation B adds unnecessary intensifiers ('enormous', 'purely', 'very') that were not in the original and makes the sentences slightly clunkier.
  - [old/addition/minor] Added 'enormous' and 'very', which changes the tone from neutral/scientific to slightly more dramatic than the original.
  - [old/style/minor] The phrasing 'striving for success purely to feel valuable' is a bit wordy compared to the more elegant 'the drive for success, fueled by...' in A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more sophisticated and idiomatic, using precise verbs like 'fueled' and 'valued' which fit the professional yet supportive tone of a mental health article. Translation A feels slightly repetitive and uses unnecessary intensifiers ('enormous', 'very') that weren't in the original.
  - [old/style/minor] Added unnecessary intensifiers 'enormous' and 'very' which change the original's neutral tone.
  - [old/style/minor] The phrasing 'Viewing a person's value' is slightly more clunky than the more elegant 'Viewing worth' in B.

#### 🟢 en `/instagram` — NEW лучше (2:0)

- **RU**: 18062726269903085
- **OLD**: 18071770460059064 18119180623472807 17939108378908549
- **NEW**: 18062726269903085
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 0 / NEW 100)
  - Перевод A содержит совершенно другие числовые значения, что является критической ошибкой (mistranslation/data corruption), в то время как перевод B полностью идентичен оригиналу.
  - [old/mistranslation/critical] The numbers do not match the original source at all.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 0 / NEW 100)
  - Translation A is an exact match to the original ID, whereas Translation B contains entirely different numbers (additions/mistranslations).
  - [old/mistranslation/critical] The numbers do not match the original source at all.

#### 🟢 en `/steps_description/2/fact` — NEW лучше (2:0)

- **RU**: Билл Гейтс, основатель Microsoft, не раз подчеркивал, что одна из причин его успеха — это способность принимать негативные отзывы и критически оценивать свои действия. Он считает, что конструктивная критика помогает выявить слабые стороны и улучшить продуктивн…
- **OLD**: Bill Gates, the founder of Microsoft, has repeatedly emphasized that one of the reasons for his success is his ability to accept negative feedback and critically assess his actions. He believes that constructive criticism helps reveal weaknesses and improve pr…
- **NEW**: Bill Gates, the founder of Microsoft, has often emphasized that part of his success stems from his ability to accept negative feedback and critically evaluate his own actions. He believes that constructive criticism helps identify weaknesses and improve produc…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B sounds more natural and sophisticated, using 'stems from' and 'identify' which are better idiomatic fits for this context than the more literal 'is' and 'reveal' in A.
  - [old/style/minor] The phrasing 'one of the reasons for his success is his ability' is grammatically correct but slightly clunky/wordy compared to the more elegant 'part of his success stems from'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and flows better for a native reader. The phrase 'part of his success stems from' is more natural and sophisticated than the slightly clunky 'one of the reasons for his success' used in B.
  - [old/style/minor] The phrasing 'one of the reasons for his success is...' is a bit wordy and feels more like a direct translation from Russian than natural English prose.

#### 🟢 en `/result/high/text` — NEW лучше (2:0)

- **RU**: Ваши ответы указывают на высокий уровень самопринятия и внутренней уверенности. Вы способны сохранять чувство собственной ценности независимо от внешних оценок и ситуаций. Ошибки и трудности вы воспринимаете спокойно, с пониманием и уважением к себе. Внешняя к…
- **OLD**: Your answers indicate a high level of self-acceptance and inner confidence. You are able to maintain a sense of self-worth regardless of external evaluations and circumstances. You treat mistakes and difficulties calmly, with understanding and respect for your…
- **NEW**: Your answers indicate a high level of self-acceptance and inner confidence. You are able to maintain a sense of self-worth regardless of external evaluations or situations. You tend to view mistakes and challenges with calm, understanding, and self-respect. Ex…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A sounds much more natural and idiomatic for a mental health context. It uses superior collocations like 'inner resilience' and 'well-being' instead of the literal and clunky 'state' or 'internally stable' found in B.
  - [old/style/major] The phrase 'impact on your state' is a Russianism (калька); in English, we say 'impact on your well-being' or 'impact on how you feel'.
  - [old/style/minor] 'Feel internally stable' is grammatically awkward; 'feel inner resilience' (as in A) is the standard way to express this concept.
  - [old/style/minor] 'Inner resources' is acceptable, but 'internal strengths' or 'internal support' flows better in this specific narrative context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses much more natural, idiomatic English for a mental health context, specifically using 'well-being' instead of 'state' and 'resilience' instead of 'internally stable'.
  - [old/style/minor] 'impact on your state' sounds like a literal translation of 'влияют на состояние'; 'impact on your well-being' is the standard UX/mental health phrasing. 'Feel internally stable' is grammatically okay but less idiomatic than 'feel inner resilience'.

#### 🟡 en `/steps_description/8/fact`— вердикт неустойчив

- **RU**: Люди являются сложными и многогранными существами, и успех или добродетель в одной области не обязательно означает добродетель во всех аспектах жизни. Исследования указывают на то, что личностные качества и моральные характеристики могут сильно различаться в з…
- **OLD**: People are complex and multifaceted, and success or virtue in one area does not necessarily mean virtue in every aspect of life. Studies indicate that personality traits and moral characteristics can vary greatly depending on context and situation.
- **NEW**: Humans are complex and multifaceted beings, and success or virtue in one area does not necessarily mean virtue in all aspects of life. Research indicates that personality traits and moral characteristics can vary greatly depending on the context and situation.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more precise and idiomatic. It correctly translates 'существами' as 'beings' (A omits this, creating a slightly incomplete structure) and uses the correct definite articles for 'the context and situation'.
  - [old/omission/minor] Missing 'beings' to translate 'существами'
  - [old/style/minor] Missing definite articles 'the' before 'context and situation', which sounds slightly unnatural in this academic/narrative context
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more natural and idiomatic for a high-quality English article. Using 'People' instead of 'Humans' is more appropriate for this tone, and the removal of the redundant 'beings' makes the sentence flow better.
  - [new/style/minor] The use of 'Humans' and 'beings' sounds slightly more clinical/biological than the warm, expert tone required for this context.

#### 🟢 en `/steps_description/9/fact` — NEW лучше (2:0)

- **RU**: Социальные сети усиливают тенденцию к социальному сравнению, создавая иллюзию «идеальной жизни» у других людей. Исследования показывают, что частое использование социальных сетей связано с пониженной самооценкой, особенно среди подростков и молодых людей. Это …
- **OLD**: Social media amplifies the tendency for social comparison by creating the illusion of “perfect lives” in other people. Research shows that frequent use of social networks is associated with lower self-esteem, especially among adolescents and young adults. This…
- **NEW**: Social media amplifies the tendency toward social comparison by creating an illusion of the “perfect life” others are living. Research shows that frequent social media use is linked to lower self-esteem, especially among adolescents and young adults. This happ…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more idiomatic and flows naturally. Translation B contains several unnatural constructions, such as 'illusion... in other people' and 'use of social networks' (which sounds more formal/clunky than 'social media use').
  - [old/style/major] the illusion of 'perfect lives' in other people — unnatural preposition and phrasing
  - [old/style/minor] use of social networks — 'social media use' is the standard modern term
  - [old/style/minor] compare... with — while grammatically possible, 'compare... to' is more common when highlighting similarities/differences in this context
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation B sounds much more natural and idiomatic. Translation A uses clunky phrasing like 'tendency for' (instead of 'toward') and 'in other people' (instead of 'of others'), which feels like a direct translation from Russian.
  - [old/style/minor] 'tendency for social comparison' is less idiomatic than 'tendency toward' or 'tendency to engage in'.
  - [old/style/minor] 'illusion of “perfect lives” in other people' is a heavy, non-native construction; 'of others' or 'others are living' is much smoother.

#### 🟢 en `/steps_description/3/text` — NEW лучше (2:0)

- **RU**: В психологии существует понятие "эффект ореола", когда один положительный аспект человека, например, его успех или привлекательность, приводит к восприятию его как более ценного во всех остальных аспектах. Этот когнитивный искажение часто приводит к несправедл…
- **OLD**: In psychology there is a concept called the “halo effect”, where one positive trait of a person, such as success or attractiveness, leads us to perceive them as more valuable in many other areas. This cognitive distortion often results in unfair evaluations of…
- **NEW**: In psychology, the “halo effect” occurs when one positive aspect of a person—such as their success or attractiveness—leads to them being perceived as more valuable in all other areas. This cognitive distortion often leads to unfair judgments.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and uses a more sophisticated structure (em dashes) that flows better for an article. Translation A is grammatically correct but slightly more repetitive and 'wordy' (e.g., 'leads us to perceive them' vs 'leads to them being perceived').
  - [old/style/minor] Slightly clunky phrasing 'leads us to perceive them' compared to the more natural B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more concise, professional, and follows the natural flow of English psychological writing. Translation B is slightly wordy ('there is a concept called') and uses 'many other areas' which is less precise than 'all other areas' in the context of the original definition.
  - [old/style/minor] Wordy construction 'there is a concept called' instead of a direct definition.
  - [old/mistranslation/minor] Changed 'all other aspects' to 'many other areas', which slightly weakens the definition of the halo effect.

#### 🔴 en `/steps_description/6/text` — OLD лучше (2:0)

- **RU**: Психологи утверждают, что для многих людей самооценка тесно связана с тем, как их воспринимают окружающие, особенно значимые другие (семья, друзья, партнеры). По данным исследования, проведенного Университетом Хьюстона, около 70% людей признают, что их чувство…
- **OLD**: Psychologists note that for many people self-esteem is closely tied to how they are seen by others, especially by significant others (family, friends, partners). A study from the University of Houston found that around 70% of people admit that their sense of s…
- **NEW**: Psychologists suggest that for many people, self-esteem is closely tied to how they are perceived by others, especially significant others (family, friends, partners). According to a study by the University of Houston, about 70% of people admit that their sens…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A uses the idiomatic and natural 'sense of self-worth', whereas Translation B uses 'sense of dignity', which is a mistranslation in this context (dignity refers to honor/status, while self-worth refers to self-esteem). A also flows more naturally for a reader.
  - [new/mistranslation/major] Using 'sense of dignity' for 'чувство собственного достоинства' in a psychological context is incorrect; 'self-worth' is the standard term.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses 'sense of self-worth', which is the idiomatic and accurate way to translate 'чувство собственного достоинства' in a psychological context, whereas 'sense of dignity' in A sounds slightly more formal/moralistic. B also flows more naturally for a native reader.
  - [new/terminology/minor] ‘sense of dignity’ is less common in CBT/psychology contexts than ‘self-worth’ when discussing self-esteem.

#### 🔴 en `/steps_description/11/text` — OLD лучше (2:0)

- **RU**: Люди часто испытывают психологическую защиту при получении негативных отзывов, так как это может угрожать их самооценке. Одной из распространённых реакций на критику является «защитное поведение», когда человек стремится оправдать себя или отвергнуть критику, …
- **OLD**: People often use psychological defense mechanisms when receiving negative feedback because it can threaten their self-esteem. One common reaction to criticism is “defensive behavior”, when a person tries to justify themselves or reject the criticism in order t…
- **NEW**: People often experience psychological defenses when receiving negative feedback, as it can threaten their self-esteem. A common reaction to criticism is “defensive behavior,” where a person tries to justify themselves or reject the criticism to protect their s…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A uses more natural phrasing ('use psychological defense mechanisms' vs 'experience psychological defenses') and correctly translates 'чувство собственного достоинства' as 'sense of self-worth', which is more appropriate for the context of self-esteem than 'dignity'.
  - [new/style/minor] The phrase 'experience psychological defenses' is slightly awkward; people use or employ mechanisms.
  - [new/terminology/minor] 'sense of dignity' is a bit too formal/heavy for this context compared to 'self-worth'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B uses more natural psychological terminology ('defense mechanisms' instead of just 'defenses') and better phrasing ('sense of self-worth' vs 'sense of dignity').
  - [new/style/minor] The phrase 'sense of dignity' is slightly less idiomatic in this psychological context than 'self-worth'.
  - [new/terminology/minor] In English, 'defense mechanisms' is the standard term for 'психологическая защита' in this context.

#### 🟢 en `/steps_description/7/fact` — NEW лучше (2:0)

- **RU**: Джим Керри, известный актер и комик, однажды поделился своими мыслями о том, что несмотря на то, что он достиг всех своих карьерных целей, это не сделало его по-настоящему счастливым. Он отметил, что счастье зависит не только от внешних достижений, но и от вну…
- **OLD**: Jim Carrey, the well-known actor and comedian, has shared that even though he achieved all his career goals, it did not make him truly happy. He noted that happiness depends not only on external accomplishments, but also on one’s inner state and the ability to…
- **NEW**: Jim Carrey, the famous actor and comedian, once shared his thoughts on how, despite achieving all his career goals, he didn’t feel truly happy. He noted that happiness depends not just on external achievements, but on one’s internal state and the ability to en…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and flows better as a narrative piece. Translation B uses 'has shared' (Present Perfect), which is slightly less natural for a specific past anecdote, and 'accomplishments' is a bit heavier than 'achievements' in this context.
  - [old/style/minor] The use of Present Perfect 'has shared' for a specific past event feels slightly less natural than the Simple Past 'once shared' in a storytelling context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and flows better as a narrative piece. It correctly captures the nuance of 'once shared' and uses more natural phrasing ('not just... but on') compared to the slightly more formal and repetitive structure of A.
  - [old/style/minor] The phrasing 'has shared that even though' is a bit clunky for a narrative about a past event; 'once shared' in B is more natural.

#### 🟢 en `/description/text` — NEW лучше (2:0)

- **RU**: В мире, где так много внешних ожиданий и сравнений, бывает непросто сохранить уверенность в своей ценности и уникальности. Внутреннее принятие себя становится важной опорой и основой гармоничной жизни. Этот тест поможет вам понять, как вы относитесь к себе, ка…
- **OLD**: In a world full of external expectations and constant comparisons, it can be difficult to maintain confidence in your own worth and uniqueness. Inner self-acceptance becomes an important support and foundation for a harmonious life. This questionnaire will hel…
- **NEW**: In a world filled with external expectations and comparisons, it can be difficult to stay confident in your own worth and uniqueness. Inner self-acceptance becomes a vital foundation for a harmonious life. This test will help you understand how you view yourse…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and flows better, using natural phrasing like 'stay confident' and 'built upon'. Translation A is slightly more wordy and uses 'questionnaire', which feels more formal/academic than the original 'тест'.
  - [old/style/minor] The use of 'questionnaire' instead of 'test' adds unnecessary formality; 'important support and foundation' is a bit heavy/clunky compared to B's 'vital foundation'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 95)
  - Translation A is more idiomatic and flows naturally for a mental health context. Translation B uses slightly clunky phrasing ('important support and foundation') and 'questionnaire', which feels more academic/formal than the warm, supportive tone required.
  - [old/style/minor] The phrase 'important support and foundation' is a bit heavy and literal compared to the more elegant 'vital foundation' in A.
  - [old/style/minor] 'Questionnaire' sounds more clinical/formal than the warmer 'test' used in the original and in A.
  - [old/style/minor] 'how strongly you support' is a bit wordy compared to the smoother 'support' in A.

#### 🟢 en `/steps` — NEW лучше (2:0)

- **RU**: Когда меня хвалят, я чувствую себя более ценным Даже если я не достигаю важных целей, я всё равно чувствую себя достойным человеком Негативные отзывы я воспринимаю как шанс что-то улучшить Мне кажется, что одни люди ценнее других Крупные ошибки огорчают меня, …
- **OLD**: When I’m praised, I feel like a more valuable person Even if I don’t manage to achieve my important goals, I still feel like a worthy person I see negative feedback as an opportunity to improve my behavior and performance I have a sense that some people are mo…
- **NEW**: When I receive praise, I feel more worthy Even if I don’t achieve important goals, I still feel like a worthy person I see negative feedback as a chance to improve I feel like some people are more valuable than others Major mistakes upset me, but they don’t ch…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 84 / NEW 95)
  - Translation B is much more idiomatic and natural for a mental health context. Translation A suffers from wordiness and 'translationese' (e.g., 'I have a sense that', 'I believe that I am worth something'), whereas B uses concise, impactful language typical of CBT assessments.
  - [old/style/major] Too wordy and repetitive; uses heavy constructions like 'I have a sense that' or 'I believe that I am worth something' instead of direct English phrasing.
  - [old/addition/minor] Added 'behavior and performance' to the feedback sentence, which wasn't in the original.
  - [old/mistranslation/minor] The sentence about negative feedback ('stay open to what the other person says') changes the meaning from 'accepting it calmly' to 'being open to it'.
  - [new/style/minor] The phrase 'take it without getting upset' is slightly less elegant than 'take it calmly', but it is much closer to the intended meaning than A's version.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more faithful to the original text, maintaining the exact meaning and structure of each sentence. Translation B introduces several additions and shifts in meaning (e.g., adding 'behavior and performance', changing the meaning of the sentence about self-definition to 'avoiding comparison', and adding 'stay open to what the other person says').
  - [old/addition/minor] Added 'my behavior and performance' to the feedback sentence.
  - [old/mistranslation/major] The sentence 'Свою ценность я определяю по себе, а не через сравнение с другими' (I define my worth based on myself...) was translated as 'I avoid comparing myself...', which changes the meaning from a method of definition to an avoidance behavior.
  - [old/mistranslation/major] The sentence 'Когда я слышу плохие отзывы о себе, мне трудно принимать их спокойно' (hard to take them calmly) was translated as 'hard to stay open to what the other person says', which is a significant semantic shift.
  - [old/addition/minor] Added 'for myself' in several places where it wasn't in the original.

#### 🔴 en `/result/low/title` — OLD лучше (2:0)

- **RU**: Непринятие себя
- **OLD**: Lack of self-acceptance
- **NEW**: Self-rejection
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation A uses the standard psychological term 'self-acceptance' with a proper noun-based construction. Translation B, while grammatically correct, sounds more like a sudden action or a harsh personality trait rather than a psychological state or concept.
  - [new/style/minor] Self-rejection sounds slightly more aggressive and less like a clinical/therapeutic concept than 'lack of self-acceptance'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 80)
  - In a mental health context, 'Lack of self-acceptance' is the standard, professional way to describe this state. 'Self-rejection' sounds more like a sudden, active action or a harsh personality trait rather than a psychological concept.
  - [new/style/minor] Sounds slightly more aggressive/active than the nuanced psychological concept of 'непринятие'.

#### 🔴 en `/steps_description/0/text` — OLD лучше (2:0)

- **RU**: По данным Американской психологической ассоциации, похвала, особенно направленная на усилия, а не на результат, способствует развитию устойчивого чувства собственной ценности. Это помогает людям воспринимать себя более позитивно и уменьшает страх перед неудача…
- **OLD**: According to the American Psychological Association, praise — especially when it focuses on effort rather than outcome — helps develop a stable sense of self-worth. It supports a more positive self-view and reduces the fear of failure.
- **NEW**: According to the American Psychological Association, praise—especially when it focuses on effort rather than results—helps develop a stable sense of self-worth. This helps people perceive themselves more positively and reduces the fear of failure.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more idiomatic and flows better for a native reader. 'Supports a more positive self-view' is much more natural than the clunky 'helps people perceive themselves more positively' in Translation B.
  - [new/style/minor] The phrase 'helps people perceive themselves more positively' is a bit wordy and sounds like a direct translation from Russian (calque).
  - [new/style/minor] Uses 'results' (plural) where 'outcome' (singular/uncountable concept) is more standard in this psychological context.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more idiomatic and professional. 'Outcome' is a better fit than 'results' in this psychological context, and 'supports a more positive self-view' is much more natural and sophisticated than the literal 'helps people perceive themselves more positively'.
  - [new/style/minor] The phrasing 'helps people perceive themselves more positively' is a bit clunky and sounds like a direct translation from Russian.

#### 🟢 en `/steps_description/19/fact` — NEW лучше (2:0)

- **RU**: Махатма Ганди часто говорил о том, что человеческая ценность не может быть оценена или принижена другими. Он утверждал, что каждый человек заслуживает уважения и достоинства, независимо от его положения или достижений, что стало основой его философии ненасилия…
- **OLD**: Mahatma Gandhi often said that a person’s worth cannot be measured or diminished by others. He believed that everyone deserves respect and dignity regardless of their status or achievements, and this belief became the foundation of his philosophy of nonviolenc…
- **NEW**: Mahatma Gandhi often spoke of how human worth cannot be measured or diminished by others. He maintained that every person deserves respect and dignity regardless of their status or achievements, which became the foundation of his philosophy of nonviolence and …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more sophisticated and flows better as a narrative text, using 'spoke of how' and 'maintained that', which fits the biographical tone. Translation B is slightly more repetitive and uses a clunky 'and this belief became' construction.
  - [old/style/minor] The phrase 'and this belief became' is a bit heavy and less elegant than the relative clause 'which became' used in A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 90 / NEW 96)
  - Translation B is more idiomatic and flows better as a narrative text. The use of 'spoke of how' and 'maintained' provides a more sophisticated and natural tone for a biographical/philosophical context compared to the simpler 'said' and 'believed' in A.
  - [old/style/minor] The phrasing 'this belief became' is slightly clunky and less elegant than the relative clause 'which became' used in B.

#### 🟢 en `/steps_description/18/fact` — NEW лучше (2:0)

- **RU**: Когнитивные искажения, такие как «черно-белое мышление» и «обобщение», могут усугублять негативные последствия критики. Например, человек может начать думать, что если у него не получилось в одном деле, он неудачник в целом. Это искажение может привести к резк…
- **OLD**: Cognitive distortions such as “all-or-nothing thinking” and “overgeneralisation” can intensify the negative impact of criticism. For example, a person may start to think that if they failed at one task, they are a failure in general. This distortion can sharpl…
- **NEW**: Cognitive distortions, such as “black-and-white thinking” and “overgeneralization,” can exacerbate the negative effects of criticism. For example, a person might start thinking that if they failed at one thing, they are a failure as a whole. This distortion ca…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A uses the project-mandated term 'black-and-white thinking' and follows US English spelling, whereas B uses 'all-or-nothing thinking' and British spelling ('overgeneralisation'), which deviates from the target market requirements.
  - [old/terminology/minor] Used 'all-or-nothing thinking' instead of the required 'black-and-white thinking'
  - [old/style/minor] Used British spelling 'overgeneralisation' instead of US English 'overgeneralization'
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses the project-mandated term 'black-and-white thinking' and follows US English spelling (overgeneralization), whereas A uses British spelling and an alternative term. B also flows more naturally for a native reader.
  - [old/terminology/minor] Used 'all-or-nothing thinking' instead of the required 'black-and-white thinking'
  - [old/style/minor] Used British spelling 'overgeneralisation' instead of US English 'overgeneralization'

