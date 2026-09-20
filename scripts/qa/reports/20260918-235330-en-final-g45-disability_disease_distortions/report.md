# QA: слепое парное сравнение переводов — en-final-g45-disability_disease_distortions

- **Дата**: 2026-09-18T20:53:30.243Z
- **Метка**: en-final-g45-disability_disease_distortions
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/depression/disability_disease_distortions.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/disability_disease_distortions.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 19 | 🟢 6 | 🔴 2 | ⚪ 0 | 🟡 11 | 0 / 2 | 75% |
| **итого** | 19 | 🟢 6 | 🔴 2 | ⚪ 0 | 🟡 11 | 0 / 2 | 75% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×18, omission/minor×2, terminology/minor×1, terminology/major×1, mistranslation/major×1; OLD — style/minor×9, terminology/minor×4, omission/minor×3, omission/critical×2, style/major×1, mistranslation/major×1

### Детали пар (для спот-чека)

#### 🟡 en `/distortions/test/answers`— вердикт неустойчив

- **RU**: Состояние психологического здоровья, которое нельзя изменить Положительные мыслительные паттерны, которые помогают справиться с депрессией Иррациональные убеждения и мысли, которые усугубляют депрессивное состояние Физические симптомы, возникающие в результате…
- **OLD**: A psychological condition that cannot be changed Positive thinking patterns that help with depression Irrational beliefs and thoughts that worsen depressive states Physical symptoms resulting from depression
- **NEW**: A state of mental health that cannot be changed Positive thinking patterns that help cope with depression Irrational beliefs and thoughts that worsen a depressive state Physical symptoms that arise as a result of depression
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation B is more concise and idiomatic for a professional mental health context. Translation A uses 'mental health' in a way that sounds slightly unnatural when paired with 'cannot be changed', whereas 'psychological condition' is a standard clinical term.
  - [new/style/minor] The phrase 'A state of mental health that cannot be changed' is a bit wordy and less idiomatic than 'A psychological condition'.
  - [new/style/minor] 'worsen a depressive state' is grammatically fine but 'worsen depressive states' (as in B) sounds more natural for a general description.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is more idiomatic and follows the project's terminology guidelines (mental health instead of psychological condition). It also uses a more natural verb phrase 'help cope with' compared to the slightly clunky 'help with' in A.
  - [old/terminology/minor] Used 'psychological condition' instead of the preferred 'mental health' (психологическое здоровье).
  - [old/style/minor] 'help with depression' is a bit weak/informal compared to 'help cope with'.
  - [old/style/minor] 'depressive states' (plural) sounds slightly less natural here than the singular 'depressive state' or just 'depression'.

#### 🟢 en `/distortions/title` — NEW лучше (2:0)

- **RU**: Преобразование мышления: Путь к избавлению от депрессии через понимание когнитивных искажений
- **OLD**: Reframing Your Thoughts: Easing Depression by Understanding Cognitive Distortions
- **NEW**: Reframing Your Thinking: Overcoming Depression by Understanding Cognitive Distortions
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses 'Overcoming depression', which is a much more natural and standard collocation for this context than 'Easing depression'. 'Reframing your thinking' also sounds more idiomatic for a title about cognitive processes.
  - [old/style/minor] 'Easing depression' sounds a bit weak and less professional for a title about a transformative process; 'Overcoming' is the standard term.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A uses 'Overcoming Depression', which is a much stronger and more natural collocation for a title about a transformative journey than 'Easing Depression'. 'Thinking' also better captures the broad concept of 'мышление' in a psychological context.
  - [old/style/minor] 'Easing depression' sounds a bit weak for a title about a 'path to overcoming' something; 'thoughts' is slightly more narrow than 'thinking'.

#### 🟡 en `/disability/test/question`— вердикт неустойчив

- **RU**: Какая когнитивная ошибка преобладала в мышлении Анны?
- **OLD**: Which cognitive distortion was most prominent in Anna’s thinking?
- **NEW**: Which cognitive distortion was most prevalent in Anna’s thinking?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 95)
  - Both translations are grammatically correct and use the correct CBT terminology. However, 'prevalent' is a more natural and standard collocation when discussing the frequency or dominance of a cognitive distortion in a person's thought patterns.
  - [old/style/minor] 'Prominent' is acceptable but slightly less idiomatic than 'prevalent' in this specific psychological context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Both are grammatically correct, but 'prominent' sounds more natural and idiomatic in a psychological context when describing a pattern of thinking. 'Prevalent' often refers to how widespread a phenomenon is within a population, rather than how noticeable a specific trait is in an individual.

#### 🟢 en `/disease/screen_1/texts` — NEW лучше (2:0)

- **RU**: Что происходит с человеком, узнавшим о своем тяжелом, возможно смертельном заболевании? Многие люди сталкиваются с подобными испытаниями, однако объяснить здоровому человеку, что они чувствуют, представляется крайне сложной задачей. <q author="Жюль Ренар">Ваша…
- **OLD**: What happens to a person who learns they have a severe, possibly terminal illness? Many people face trials like these, yet explaining to someone healthy what they feel can be extremely difficult. Stories of people confronting serious illness often form the bas…
- **NEW**: What happens to a person when they learn they have a serious, potentially life-threatening illness? Many people face such trials, yet explaining what they feel to someone who is healthy can seem like an incredibly difficult task. <q author="Jules Renard">Your …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more polished and follows the source structure more faithfully, especially regarding the important block which B significantly condensed. A's flow is more natural for a long-form article.
  - [old/omission/minor] Omitted the <important> tag/block structure, merging it into the text.
  - [old/style/minor] The phrase 'can feel like an explosion' is slightly weaker than 'hits like an explosion' in conveying the impact of the original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is much more complete, including the missing quote from Jules Renard which is a significant omission in A. B also follows the tone and flow of a high-quality English article more naturally.
  - [old/omission/critical] The entire quote by Jules Renard was omitted.
  - [old/omission/major] The 'important' tag/block was not preserved, though this might be a formatting issue, it's a loss of structural intent.
  - [old/style/minor] The translation of 'смертельный приговор' as 'death sentence' is fine, but B's 'terminal diagnosis' in that context feels slightly more clinical/natural for the flow, though A's 'bolt of lightning' is a bit more literal than B's 'lightning strike'.
  - [new/style/minor] The phrase 'lover of travel and nature' is slightly clunky compared to 'loved travel and the outdoors' in A, but B is superior due to completeness.

#### 🟡 en `/disability/screen_3/texts`— вердикт неустойчив

- **RU**: Конечно, искажение, которое привело Анну к эмоциональным страданиям и депрессии – это мысленный фильтр. Она зацикливалась на том, что было ей недоступно, игнорируя при этом множество возможностей для совместных занятий с мужем. Это объясняет ее ощущение пустот…
- **OLD**: Indeed, the distortion driving Anna’s suffering and depression was the mental filter. She fixated on what was unavailable to her, while overlooking many possibilities for shared activities with her husband. This explains her sense of emptiness and joylessness.…
- **NEW**: Of course, the cognitive distortion that led to Anna’s emotional suffering and depression was a mental filter. She fixated on what was unavailable to her, while ignoring many opportunities to do things together with her husband. This explains her sense of empt…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A is much more idiomatic and flows like a natural English narrative. It avoids the clunky 'In this way' and 'Of course' openings found in B, and uses better phrasing like 'adventurous ideas' instead of 'extreme activities'.
  - [new/style/minor] The opening 'Of course' is a literal translation of 'Конечно' that sounds unnatural in this context; 'Indeed' or starting directly is better.
  - [new/style/minor] The phrase 'In this way' is a bit heavy/clunky for a smooth transition.
  - [new/style/minor] The dialogue tags and structure feel slightly more like a translation than a natural conversation compared to A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more accurate to the source text and follows the technical requirements. Translation B fails to include the mandatory <dialog> tags, uses 'therapist' instead of the required 'psychologist', and makes several stylistic choices that deviate from the original meaning (e.g., 'tandem skydive' instead of 'skydiving').
  - [old/omission/critical] Missing all <dialog> tags which are part of the source structure.
  - [old/terminology/major] Used 'therapist' instead of 'psychologist' as per glossary.
  - [old/mistranslation/minor] Added 'tandem' to skydiving, which wasn't in the original.
  - [old/style/minor] The flow is slightly more 'creative' than the original, losing some of the directness of the dialogue.

#### 🟡 en `/disease/screen_2/texts`— вердикт неустойчив

- **RU**: Ольге было 39 лет, когда ее жизнь кардинально изменилась из-за подозрения на рак. Жизнь словно остановилась: она ощутила себя отрезанной от привычной реальности. Все прежние страхи и тревоги показались мелкими и незначительными по сравнению с ужасом, который в…
- **OLD**: Olga was 39 when her life changed dramatically due to a suspected cancer diagnosis. Life seemed to stop: she felt cut off from her familiar reality. All her previous fears and worries felt small compared to the terror that suddenly descended. When the worst fe…
- **NEW**: Olga was 39 years old when her life changed drastically due to a cancer scare. It felt as if life had come to a standstill; she felt cut off from her familiar reality. All her previous fears and anxieties seemed trivial and insignificant compared to the horror…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is much more natural and follows the 'warm expert' tone guidelines, using contractions and idiomatic phrasing. Translation B feels slightly more formal and heavy (e.g., 'despondency', 'participate in active leisure'), which is less suitable for a supportive narrative.
  - [new/style/minor] Uses 'despondency' and 'anxieties' which feel slightly more academic/heavy than the natural 'despair' and 'worries' in A.
  - [new/style/minor] The list items use 'I am' instead of contractions, making the internal monologue feel less personal and more stiff.
  - [new/terminology/minor] Used 'unhelpful beliefs' (good) but the overall sentence structure is more 'translated' than A's 'came to light'.
  - [new/omission/minor] Missed the Instagram placeholder present in the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is superior because it adheres strictly to the required CBT terminology (unhelpful beliefs) and maintains a more professional, narrative flow. Translation B uses 'negative beliefs' (which is okay, but 'unhelpful' is the project standard) and 'negative stance' (less idiomatic than 'mindset' in this context), and it omits the 'grenade' metaphor which was present in the original.
  - [old/omission/minor] Omitted 'grenade' from 'like a grenade blast', reducing the impact of the metaphor.
  - [old/terminology/minor] Used 'negative beliefs' instead of the project-standard 'unhelpful beliefs'.
  - [old/style/minor] The phrase 'negative stance' is a bit clunky compared to 'negative mindset'.

#### 🟡 en `/disability/screen_1/texts`— вердикт неустойчив

- **RU**: Физические ограничения представляют собой одну из категорий проблем, которые воспринимаются как "реальные". Люди, сталкивающиеся с разнообразными ограничениями из-за возраста или инвалидности, например, после ампутации конечности, часто опасаются, что это повл…
- **OLD**: Physical limitations are often seen as problems that feel undeniably “real.” People who face various limitations due to age or disability—for instance, after an amputation—often fear that this will limit their capacity for happiness. Disability is an enormous …
- **NEW**: Physical limitations are one category of problems perceived as “real”. People facing various limitations due to age or disability—for example, after an amputation—often fear that these changes will prevent them from experiencing happiness. Disability is a mass…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is superior because it follows the CBT terminology guidelines perfectly (using 'work through these distortions' instead of 'correct distorted thinking') and maintains a more professional, polished narrative flow. It also handles the 'important' tag content with better nuance.
  - [old/terminology/minor] Uses 'correct distorted thinking' instead of the more idiomatic and professional 'work through distortions' or 'address distortions'.
  - [old/style/minor] The phrasing 'limit their capacity for happiness' is slightly less natural than 'prevent them from experiencing happiness' in this context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows like a high-quality English article. It avoids the slightly clunky, literal structures found in B (e.g., 'one category of problems perceived as...'). A also uses more natural phrasing like 'fueled less by... and more by' and 'capacity for happiness'.
  - [new/style/minor] The opening sentence is a bit heavy and literal ('one category of problems perceived as').
  - [new/style/minor] The phrase 'the reality of loss' is a bit redundant compared to the more direct 'confronts loss' in A.

#### 🟢 en `/disability/description` — NEW лучше (2:0)

- **RU**: В статье исследуется влияние физических ограничений на эмоциональное благополучие человека, подчеркивая роль когнитивных искажений в восприятии собственных возможностей. Через историю Анны, которая столкнулась с депрессией после инвалидности мужа, показывается…
- **OLD**: This article explores how physical limitations affect emotional well-being, highlighting how cognitive distortions shape our sense of capability. Through the story of Anna—who faced depression after her husband’s disability—it traces a path toward emotional re…
- **NEW**: This article explores how physical limitations affect mental well-being, highlighting the role of cognitive distortions in how we perceive our own abilities. Through the story of Anna, who experienced depression after her husband became disabled, we see the pa…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B follows the project's terminology guidelines perfectly (mental well-being, CBT introduction, self-fulfillment) and sounds more natural for an article summary. Translation A uses 'emotional well-being' where the glossary suggests 'mental well-being' for general states, and its phrasing 'what happiness... can look like' is slightly more colloquial/vague than the professional tone of B.
  - [old/terminology/minor] Used 'emotional well-being' instead of 'mental well-being' as per glossary guidelines for general well-being; failed to introduce the CBT acronym properly.
  - [old/style/minor] The ending 'what happiness and self-realization can look like' is a bit wordy compared to the more elegant 'self-fulfillment'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and follows the project's terminology guidelines perfectly, specifically using 'mental well-being' and providing the correct CBT abbreviation format. Translation B uses 'emotional well-being' (which is fine, but A is more aligned with the glossary) and 'self-realization', which sounds slightly more like a direct translation from Russian than the more natural 'self-fulfillment' in A.
  - [old/terminology/minor] Used 'emotional well-being' instead of the preferred 'mental well-being' for the general concept.
  - [old/style/minor] 'Self-realization' is a bit of a calque; 'self-fulfillment' is more idiomatic in this context.

#### 🟡 en `/distortions/screen_3/texts`— вердикт неустойчив

- **RU**: Важно научиться замечать свои иррациональные мысли и понимать, к какому типу когнитивных искажений они относятся. Это поможет распознавать деструктивные паттерны на ранних этапах, не позволяя им укорениться. Существует множество когнитивных искажений, и мы соб…
- **OLD**: It’s important to notice your irrational thoughts and identify which cognitive distortions they reflect. This helps you catch unhelpful patterns early, before they take root. There are many distortions, and we’ve gathered the key ones on a dedicated page in th…
- **NEW**: It is important to learn how to notice your irrational thoughts and understand which type of cognitive distortion they belong to. This will help you recognize unhelpful patterns early on, preventing them from taking root. There are many cognitive distortions, …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A sounds much more natural and follows the UX guidelines for a 'supportive friend' tone, using contractions and idiomatic phrasing. Translation B is too formal and contains a terminology error regarding the journal name.
  - [new/terminology/major] Used 'automatic thought journal' instead of the required 'Automatic Thoughts Diary' (or 'thought record' context), though 'journal' is okay, the phrasing is less polished than A.
  - [new/style/minor] Avoided contractions (It is, we have, we will), making the tone feel too academic/stiff for a mental health app.
  - [new/style/minor] The phrase 'The topic... is so significant' is a bit heavy/clunky compared to A's 'Because... are so central'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A follows the project's glossary perfectly (automatic thought journal, unhelpful patterns) and maintains a professional yet warm tone. Translation B fails on key terminology by using 'Automatic Thoughts Diary' instead of the required 'automatic thought journal' and uses 'distortions' without the full term in one instance.
  - [old/terminology/major] Used 'Automatic Thoughts Diary' instead of the mandatory 'automatic thought journal'.
  - [old/style/minor] The phrasing 'too much for this page' is slightly less idiomatic than 'too overwhelming' in this context.

#### 🟢 en `/distortions/screen_1/texts` — NEW лучше (2:0)

- **RU**: В предыдущих главах мы уже подробно говорили о том, насколько распространены симптомы депрессии и как она влияет на нашу жизнь. Возможно, у вас появлялся вопрос: почему я чувствую себя так плохо? Почему будущее кажется безнадёжным? Давайте вместе попробуем най…
- **OLD**: In previous chapters, we discussed how common depressive symptoms are and how they affect daily life. You may have wondered: Why do I feel so bad? Why does the future seem hopeless? Let’s look for answers together. Cognitive Behavioral Therapy has greatly adva…
- **NEW**: In previous chapters, we’ve discussed how common depression symptoms are and how they impact our lives. You might have wondered: why do I feel so bad? Why does the future seem so hopeless? Let’s try to find the answer together. Cognitive behavioral therapy (CB…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more polished, follows all CBT terminology guidelines, and maintains the warm, supportive tone of the original. Translation B feels slightly more fragmented and misses the quote entirely.
  - [old/omission/critical] The entire William James quote is missing.
  - [old/terminology/minor] Uses 'Cognitive Behavioral Therapy' without the required (CBT) abbreviation on first mention.
  - [old/style/minor] The shift from 'During depression' (impersonal) to 'you notice' (personal) is slightly jarring compared to the consistent 'they' in A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 96)
  - Translation B follows all professional guidelines: it correctly introduces the CBT acronym, uses the canonical 'discount the positive' (discounting) logic, and maintains a warmer, more natural flow. Translation A is slightly too dry and misses the required CBT terminology.
  - [old/terminology/minor] Uses 'downplay' instead of the canonical 'discount the positive' (discounting) for 'обесценивает'.
  - [old/omission/minor] Missed the introduction of the 'CBT' acronym required by the guidelines.
  - [old/style/minor] The phrasing 'how they affect daily life' is a bit more generic than the original 'how it affects our lives'.

#### 🟡 en `/disease/screen_3/texts`— вердикт неустойчив

- **RU**: Когда Ольга вместе с психологом составляла график своей личной «ценности» от момента рождения и до предполагаемой смерти, она увидела, что ее личная ценность оставалась неизменной, держась на уровне 85% по условной шкале от 0 до 100%. Психолог также предложил …
- **OLD**: Together with her psychologist, Olga plotted a graph of her personal “worth” from birth through an estimated end of life — and saw that her inherent value remained steady at about 85% on an arbitrary scale from 0 to 100. The psychologist then suggested she rat…
- **NEW**: When Olga and her psychologist mapped out her personal “value” from birth to her projected lifespan, she saw that her inherent value remained unchanged, staying at 85% on a scale of 0 to 100%. The psychologist also suggested she rate her productivity over a si…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original structure and includes the quote by Nick Vujicic, which was present in the source but omitted in B. A also follows the CBT terminology and tone perfectly.
  - [old/omission/critical] The entire quote by Nick Vujicic at the end of the text is missing.
  - [old/style/minor] Uses 'all-or-nothing thinking' which is correct, but 'black-and-white thinking' in A is also perfectly acceptable and closer to the Russian 'черно-белое'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 84)
  - Translation A is much more idiomatic and flows like a professional English narrative. It avoids the clunky 'When Olga and her psychologist...' structure and uses superior vocabulary ('plotted a graph', 'all-or-nothing thinking', 'meaningful actions'). Translation B feels like a direct translation from Russian, especially with 'black-and-white thinking' (which is okay, but 'all-or-nothing' is more natural here) and the repetitive 'realized/realizing' structure.
  - [new/style/major] The sentence structure is heavy and follows the Russian syntax too closely (e.g., 'When Olga and her psychologist mapped out...').
  - [new/style/minor] The phrase 'important and valuable actions' is slightly redundant in English compared to the more elegant 'meaningful actions' in A.
  - [new/terminology/minor] While 'black-and-white thinking' is used, 'all-or-nothing thinking' is the more standard clinical term in English for this context.

#### 🟡 en `/disability/screen_2/texts`— вердикт неустойчив

- **RU**: Например, Анна – 35-летняя замужняя мать двоих детей, которая начала испытывать симптомы депрессии примерно в то время, когда правую ногу ее мужа парализовало из-за травмы позвоночника. В течение пяти лет она искала способы облегчить свое усиливающееся отчаяни…
- **OLD**: Consider Anna, a 35-year-old married mother of two, who began experiencing symptoms of depression around the time her husband’s right leg was paralyzed due to a spinal injury. For five years she sought relief from her growing despair—through outpatient and inp…
- **NEW**: Take Anna, for example—a 35-year-old married mother of two, who began experiencing symptoms of depression around the time her husband’s right leg was paralyzed due to a spinal injury. For five years, she searched for ways to ease her growing despair, including…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is much more idiomatic and flows like a professional English narrative. Translation B contains several 'translationese' markers and awkward phrasing, particularly in the dialogue and the description of the husband's name.
  - [new/style/minor] In the dialogue, 'it becomes unbearably sad' is a weak, non-idiomatic construction compared to 'I feel unbearably sad'.
  - [new/style/minor] 'Roma and me' is grammatically acceptable in some contexts but 'For us' or 'It would be difficult for us' is much smoother in this narrative flow.
  - [new/style/minor] 'The elderly' can sometimes sound slightly clinical or impersonal compared to 'older adults' in a warm, supportive context.
  - [new/style/minor] The use of 'cannot' instead of 'can't' in the penultimate paragraph feels slightly too formal for the established warm tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more faithful to the original text's structure and tone, especially in the dialogue and the quote. Translation B makes several stylistic choices that slightly alter the meaning (e.g., 'disappointment' instead of 'frustration', 'Roman' instead of 'Roma' in the dialogue) and uses 'CBT therapist' which, while correct, is less smooth in this narrative context than the full term used in A.
  - [old/mistranslation/minor] Used 'disappointment' for 'разочарование' in the context of coping, whereas 'frustration' (used in A) is the much more natural idiomatic fit for the struggle of coping with mobility issues.
  - [old/style/minor] Changed 'Roma' to 'Roman' in the quote; while Roman is the full name, the original uses the diminutive 'Рома', which adds to the intimacy of the personal story.
  - [old/style/minor] The phrasing 'there truly are many things they can no longer do' is a bit wordy compared to the more direct 'they truly cannot do' in A.

#### 🟢 en `/distortions/test/question` — NEW лучше (2:0)

- **RU**: Какой из следующих пунктов наилучшим образом описывает понятие "когнитивные искажения" в контексте депрессии?
- **OLD**: Which option best describes “cognitive distortions” in the context of depression?
- **NEW**: Which of the following best describes the concept of “cognitive distortions” in the context of depression?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more precise and follows the original structure more closely, including the phrase 'the concept of'. Translation A is slightly too casual for a formal test question, though it is grammatically correct.
  - [old/omission/minor] Missing 'of the following' and 'the concept of', which makes it feel a bit clipped compared to the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Translation A is more precise and maintains the formal structure of the original question, including the word 'concept'. Translation B is slightly more casual and omits 'concept', which changes the nuance of the inquiry.
  - [old/omission/minor] Omitted 'the concept of' (понятие), making the sentence slightly less precise for a psychological test context.

#### 🔴 en `/disability/test/answers` — OLD лучше (2:0)

- **RU**: Чтение мыслей Мысленный фильтр Можно было бы Долженствование
- **OLD**: Mind reading Mental filter “Could have” thinking “Should” statements
- **NEW**: Mind reading Mental filter Possibility “Should” statements
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 65)
  - Translation A correctly uses the established CBT terminology for cognitive distortions. Translation B fails significantly on the third item, replacing a specific cognitive distortion with a generic noun.
  - [new/mistranslation/major] The term 'Possibility' does not convey the meaning of 'Можно было бы' (the tendency to ruminate on what could have been) in a CBT context; it lacks the necessary nuance of a cognitive pattern.
  - [new/omission/minor] Lost the nuance of the 'could have' pattern by using a single abstract noun.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation B correctly captures the nuance of 'Можно было бы' as a cognitive distortion pattern ('Could have' thinking), whereas Translation A uses a generic noun 'Possibility' which loses the psychological context.
  - [new/style/major] The term 'Possibility' is too vague and does not function as a label for a cognitive distortion; it sounds like a random noun rather than a psychological concept.

#### 🔴 en `/distortions/description` — OLD лучше (2:0)

- **RU**: В этой статье мы рассматриваем, как когнитивные искажения способствуют развитию и поддержанию депрессии, и почему понимание этих механизмов так важно. Мы предлагаем практичные способы распознавания и изменения негативных мыслительных паттернов, которые помогаю…
- **OLD**: This article explains how cognitive distortions contribute to the onset and maintenance of depression—and why understanding these mechanisms matters. We offer practical ways to spot and shift negative thinking patterns that can improve how you feel. By looking…
- **NEW**: In this article, we explore how cognitive distortions contribute to the development and maintenance of depression, and why understanding these mechanisms is so vital. We offer practical ways to recognize and change negative thinking patterns to help improve yo…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds much more natural and idiomatic for an English-speaking reader, using better verbs like 'spot and shift' instead of the more clinical 'recognize and change'. It also avoids the repetitive use of 'mental well-being' found in A.
  - [new/style/minor] Repetitive use of 'mental well-being' in two consecutive sentences makes the text feel heavy.
  - [new/style/minor] The phrasing 'you are taking an important step' is slightly more wordy than the more direct 'you take' or 'you're taking'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 86)
  - Translation A sounds much more natural and idiomatic for a high-quality English article. It avoids the repetitive use of 'mental well-being' found in B and uses more engaging verbs like 'spot and shift' instead of the slightly more clinical 'recognize and change'.
  - [new/style/minor] Repetitive use of 'mental well-being' in two consecutive sentences makes the rhythm clunky.
  - [new/style/minor] The phrase 'diving deeper into the topic of' is a bit wordy/cliché compared to the more direct 'looking more closely at' or 'delving into'.

#### 🟡 en `/disability/title`— вердикт неустойчив

- **RU**: Как пережить физические ограничения?
- **OLD**: How to Cope with Physical Limitations
- **NEW**: How to cope with physical limitations?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A follows the standard UX/Title Case convention for headings, whereas Translation B uses sentence case with a question mark, which is less common for article titles in this context.
  - [new/style/minor] Use of sentence case and a question mark in a title is less professional for a heading/article title compared to Title Case.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A follows the sentence case rule for questions, whereas Translation B uses Title Case, which is inappropriate for a question/heading in this context according to the style guide.
  - [old/style/minor] Uses Title Case instead of sentence case for a question

#### 🟡 en `/disability/screen_4/texts`— вердикт неустойчив

- **RU**: Некоторые люди могут не верить, что такую трудную проблему можно решить или что депрессия, подобная той, что испытывала Анна, может исчезнуть после работы с мыслями и убеждениями. Тем не менее, в конце терапии Анна отметила полное исчезновение негативных эмоци…
- **OLD**: Some people may doubt that such a difficult problem can be addressed—or that depression like Anna’s could lift after working with thoughts and beliefs. Nevertheless, by the end of therapy Anna reported that the negative emotions had fully subsided and said she…
- **NEW**: Some people might not believe that such a difficult problem can be solved, or that depression like Anna’s can lift after working on thoughts and beliefs. Nevertheless, by the end of therapy, Anna noted that her negative emotions had completely vanished, and sh…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 84)
  - Translation A is much more idiomatic and flows like a professional English article. It avoids the repetitive 'working/working' and 'understand/understand' structures found in B, using more sophisticated phrasing like 'subsided' and 'reshaping thinking habits'.
  - [new/style/minor] Repetitive phrasing: 'working hard on herself—working through her thoughts' and 'understand—and we want you to understand'.
  - [new/style/minor] The conditional structure in the Moon example is slightly clunky compared to the more natural 'If you constantly dwell...' in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original structure and tone, especially in the important disclaimer section. Translation B takes too many liberties with the phrasing, resulting in a loss of the 'we' perspective in the disclaimer and a slightly more fragmented rhythm in the final paragraphs.
  - [old/omission/major] In the <important> section, B removes the 'we' (we recognize how vital it is...), which changes the supportive 'expert friend' tone of the original to a more detached observation.
  - [old/style/minor] The phrase 'your health isn't perfect' is a slight deviation from 'not good enough' (недостаточно хорошее здоровье), though acceptable in transcreation.
  - [old/style/minor] The final paragraph is a bit too clipped compared to the original's flowing structure.

#### 🟢 en `/disease/description` — NEW лучше (2:0)

- **RU**: Статья исследует эмоциональные и психологические испытания, с которыми сталкиваются люди после получения тяжелого диагноза, подчеркивая сложность передачи их переживаний здоровым людям. Она рассказывает историю Ольги, чья жизнь резко меняется после подозрения …
- **OLD**: This article examines the emotional and psychological challenges people face after receiving a serious diagnosis, highlighting how hard it can be to convey these experiences to people who are healthy. It tells the story of Olga, whose life changed abruptly aft…
- **NEW**: This article explores the emotional and psychological challenges people face after receiving a serious diagnosis, highlighting how difficult it can be to communicate these experiences to others. It tells the story of Olga, whose life changed drastically follow…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is much more idiomatic and flows naturally. Translation B contains a clunky, literal translation of 'здоровым людям' as 'people who are healthy', which sounds unnatural in English, and uses 'suspected cancer diagnosis' instead of the more natural 'cancer scare'.
  - [old/style/major] the phrase 'people who are healthy' is a literal translation of 'здоровым людям' and sounds unnatural; 'healthy people' or 'others' would be better
  - [old/style/minor] the shift to present tense ('recognizes', 'helps') in the final sentence is inconsistent with the past tense used in the rest of the narrative
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and flows better for a narrative article. It uses more natural phrasing like 'cancer scare' and 'worked through depression' compared to the slightly clunkier 'suspected cancer diagnosis' and 'grappled with' in A.
  - [old/style/minor] The phrase 'people who are healthy' is a bit wordy and literal; 'others' or 'healthy individuals' would be smoother.
  - [old/style/minor] 'Suspected cancer diagnosis' is slightly redundant/heavy compared to the idiomatic 'cancer scare'.

#### 🟡 en `/distortions/screen_2/texts`— вердикт неустойчив

- **RU**: В основе депрессивного состояния почти всегда лежат устойчивые негативные убеждения и искажённые способы мышления. Эти иррациональные мысли можно систематизировать. Так появились понятия, которые мы называем "когнитивными искажениями". <instagram ids="18478233…
- **OLD**: At the core of depression, you’ll almost always find entrenched negative beliefs and distorted thinking styles. These irrational thoughts can be grouped into categories known as “cognitive distortions.” Cognitive distortions show up in many ways. For example: …
- **NEW**: At the core of a depressive state, there are almost always persistent unhelpful beliefs and distorted ways of thinking. These irrational thoughts can be categorized. This is how we arrived at the concept of “cognitive distortions.” <instagram ids="184782334600…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more precise and adheres better to the project's terminology and tone. Translation B makes several risky liberties that deviate from the original meaning and the required CBT terminology.
  - [old/terminology/minor] Uses 'negative beliefs' instead of the preferred 'unhelpful beliefs' used in A, though 'negative' is acceptable, 'unhelpful' is the project standard.
  - [old/mistranslation/major] Translates 'обращался к психологу' as 'tried therapy', which is a significant leap in meaning.
  - [old/style/minor] The phrase 'Here’s the encouraging part' is a bit more informal/journalistic than the original 'But there is important, supportive news'.
  - [old/omission/minor] Misses the 'important' aspect of the news in the final paragraph.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and idiomatic for an English-speaking reader. It avoids the heavy, clinical phrasing of B (e.g., 'depressive state', 'manifest in different ways') and uses a warmer, more engaging tone ('Here’s the encouraging part') that fits the 'understanding expert' persona. Translation B suffers from several 'translationese' markers and slightly clunky structures.
  - [new/style/minor] 'depressive state' is a bit clinical/heavy compared to 'depression'; 'manifest in different ways' is a common translation-style cliché.
  - [new/style/minor] 'This is how we arrived at the concept' is wordy and sounds like a textbook rather than a supportive guide.
  - [new/style/minor] 'It is very difficult' (no contraction) feels too formal for this context.

