# QA: слепое парное сравнение переводов — en-final-g67-daybook

- **Дата**: 2026-09-18T21:38:26.370Z
- **Метка**: en-final-g67-daybook
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: texts/daybook.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## texts/daybook.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 18 | 🟢 4 | 🔴 2 | ⚪ 0 | 🟡 12 | 0 / 0 | 67% |
| **итого** | 18 | 🟢 4 | 🔴 2 | ⚪ 0 | 🟡 12 | 0 / 0 | 67% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×12, style/major×1, omission/minor×1; OLD — style/minor×10, addition/minor×2, terminology/minor×2, style/major×1, mistranslation/minor×1, terminology/major×1

### Детали пар (для спот-чека)

#### 🟡 en `/mockGptDream/symbols`— вердикт неустойчив

- **RU**: 🏰 Замок: Символ безопасности, автономии и границ. Может отражать ваше стремление к защите и внутреннему пространству. 🌊 Бурное море: Образ сильных чувств, внутренних волнений и перемен. 🔮 Массивное зеркало: Символ самопознания, контакта с подлинным «я» и вн…
- **OLD**: 🏰 Castle: A symbol of safety, autonomy and boundaries. It may reflect your need for protection and your own inner space. 🌊 Stormy sea: An image of strong emotions, inner turbulence and change. 🔮 Massive mirror: A symbol of self-knowledge, contact with your …
- **NEW**: 🏰 Castle: A symbol of safety, autonomy, and boundaries. It may reflect your desire for protection and personal space. 🌊 Stormy sea: An image of intense emotions, internal turmoil, and change. 🔮 Large mirror: A symbol of self-discovery, connecting with your …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A sounds much more natural and idiomatic for a mental health context. Translation B uses heavy, literal translations like 'contact with your true self' and 'massive mirror', which feel clunky in English.
  - [old/style/major] 'Massive mirror' sounds too literal/physical; 'Large mirror' or just 'Mirror' is better for symbolism. 'Contact with your true self' is a weak, non-idiomatic way to express connection.
  - [old/style/minor] 'Inner turbulence' is okay, but 'internal turmoil' (in A) is a more standard psychological collocation.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 86)
  - Translation A is more idiomatic and captures the poetic nuance of the original better. 'Inner turbulence' and 'true self' sound more natural in this context than B's 'internal turmoil' or 'connecting with'.
  - [new/style/minor] The use of 'Large mirror' is a bit plain compared to the original 'Массивное' (Massive) and the psychological weight of the symbol.
  - [new/style/minor] The phrasing 'connecting with your true self' is slightly more wordy/clunky than the directness of A.

#### 🟡 en `/daybookStart/texts`— вердикт неустойчив

- **RU**: Наша команда создала уникальный алгоритм анализа дневниковых записей, который помогает глубже понимать свои мысли и реакции. Модель обучена на открытых данных и материалах по когнитивно-поведенческой терапии. Вы можете описать ситуацию, которая вызывает у вас …
- **OLD**: Our team has developed a unique journal-analysis algorithm that helps you better understand your thoughts and reactions. The model is trained on open data and materials based on cognitive behavioral therapy (CBT). You can describe a situation that is bothering…
- **NEW**: Our team has created a unique algorithm to analyze your journal entries, helping you understand your thoughts and reactions more deeply. The model is trained on open data and cognitive behavioral therapy (CBT) materials. You can describe a situation that is ca…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and natural for a modern app interface. It avoids the slightly wordy constructions found in B (e.g., 'in a free-form way' vs 'in free form') and uses a more direct, user-friendly imperative for the button instruction.
  - [new/style/minor] The phrasing 'in a free-form way' is slightly more clunky than 'in free form'. 'You can view an example analysis by tapping...' is more passive/wordy than the direct 'Tap the button below...' used in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more natural and follows the UX guidelines perfectly, especially with the use of 'tapping' for mobile interaction and a smoother flow in the narrative. Translation B feels slightly more clunky due to the compound 'journal-analysis algorithm' and a less idiomatic 'highlight insights'.
  - [old/style/minor] The phrase 'journal-analysis algorithm' is a bit heavy/clunky compared to A's more natural phrasing.
  - [old/style/minor] The phrasing 'highlight insights' is slightly less idiomatic than 'provide insights' in this context.

#### 🟡 en `/gptCbt/texts`— вердикт неустойчив

- **RU**: Наша команда разработала уникальный алгоритм для анализа записей. ИИ изучит вашу ситуацию, поможет взглянуть на неё с другой стороны и даст полезные рекомендации в рамках КПТ. Опишите не только события, но и подробно раскройте свои эмоции и мысли. Помните, что…
- **OLD**: Our team has created a unique algorithm that analyzes your entries. The AI looks at your situation from different angles and offers helpful CBT-based recommendations. Describe not only what happened, but also your emotions and thoughts in detail. Remember: the…
- **NEW**: Our team has developed a unique algorithm for analyzing entries. The AI will examine your situation, help you see it from a different perspective, and provide helpful CBT-based recommendations. Describe not only the events but also go into detail about your em…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more faithful to the original structure and tone without adding unnecessary fluff. Translation B introduces subjective interpretations ('important things', 'clearer your entry') that weren't in the source.
  - [old/addition/minor] Added 'important' to 'things', which changes the original meaning (not all events are necessarily important).
  - [old/style/minor] The phrase 'the clearer your entry is, the more accurate and useful the analysis will be' is a bit wordy and deviates from the directness of the original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A sounds much more natural and flows like a native English text. It avoids the slightly clunky, literal phrasing of B (e.g., 'the quality of the analysis depends on the detail in your entry') and uses more idiomatic expressions like 'from different angles' and 'at a time'.
  - [new/style/minor] The phrasing 'the quality of the analysis depends on the detail in your entry' is a bit heavy and sounds like a direct translation of the Russian structure.
  - [new/style/minor] The transition between 'describe one specific situation' and the next sentence feels slightly more abrupt than in A.

#### 🟡 en `/mockGpt/adaptiveResponse`— вердикт неустойчив

- **RU**: Одна ошибка не определяет меня ни как профессионала, ни как человека. Я могу учиться на таких ситуациях, опираясь на свои навыки и прошлые успехи.
- **OLD**: One mistake does not define me as a professional or as a person. I can learn from this situation and rely on my skills and past successes.
- **NEW**: One mistake does not define me as a professional or as a person. I can learn from these situations by relying on my skills and past successes.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original plural 'таких ситуациях' and maintains the logical structure of 'learning by relying on' (опираясь на).
  - [old/mistranslation/minor] Changed plural 'situations' to singular 'this situation', which slightly alters the original meaning.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more faithful to the original's structure and meaning. Translation B changes 'such situations' (plural) to 'these situations' (implying specific ones already mentioned) and uses 'by relying', which slightly alters the nuance of 'relying on' as a foundation for learning.
  - [new/style/minor] The use of 'by relying' makes the sentence feel more like a method rather than a supportive foundation, and 'these' is a more restrictive demonstrative than the original 'таких' (such).

#### 🟢 en `/daybookRecommends/texts` — NEW лучше (2:0)

- **RU**: Наша команда создала уникальный алгоритм анализа записей дневника, который помогает вам глубже понять свои мысли и эмоции. Модель обучена на открытых данных и материалах по когнитивно-поведенческой терапии (КПТ). Ниже вы найдёте несколько рекомендаций, которые…
- **OLD**: Our team has created a unique diary-analysis algorithm that helps you better understand your thoughts and emotions. It is trained on open data and materials based on cognitive behavioral therapy (CBT). Below are a few tips to help improve the quality of the an…
- **NEW**: Our team has created a unique algorithm to analyze your journal entries, helping you understand your thoughts and emotions more deeply. The model is trained on open data and cognitive behavioral therapy (CBT) materials. Here are a few tips to help you get the …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B sounds more natural and professional. It avoids the clunky 'diary-analysis algorithm' of A, uses 'journal entries' (consistent with the glossary), and flows better rhythmically.
  - [old/style/minor] The phrase 'diary-analysis algorithm' is a bit heavy/clunky compared to 'algorithm to analyze your journal entries'.
  - [old/terminology/minor] Uses 'diary' instead of the preferred 'journal'.
  - [old/style/minor] The phrase 'the quality of the analysis of your entries' is wordy (too many 'of' constructions).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A is much more natural and follows the UX guidelines perfectly, using 'journal entries' instead of the outdated 'diary-analysis' and avoiding heavy, clunky phrasing. It flows like a native text, whereas B feels like a direct translation of the Russian sentence structures.
  - [old/style/major] The phrase 'diary-analysis algorithm' is clunky and non-idiomatic; 'journal entries' is the correct term per glossary.
  - [old/style/minor] The sentence 'Below are a few tips to help improve the quality of the analysis of your entries' is wordy and heavy (too many 'of' constructions).
  - [old/terminology/minor] Used 'important things' instead of 'significant events', which is slightly less professional for this context.

#### 🟡 en `/mockGptDream/common`— вердикт неустойчив

- **RU**: Сон может отражать внутреннее путешествие через страхи, сильные чувства и скрытые желания. Атмосфера замка, бурного моря и разрушения может символизировать ощущение нестабильности и глубокие эмоциональные процессы. Такой сюжет нередко связан с попытками психик…
- **OLD**: A dream like this can reflect an inner journey through fears, intense feelings and unspoken wishes. The castle, the stormy sea and the destruction may symbolise a sense of instability and deep emotional changes. Such a storyline is often linked to the psyche’s…
- **NEW**: A dream can reflect an internal journey through fears, intense feelings, and hidden desires. The atmosphere of a castle, a stormy sea, and destruction may symbolize feelings of instability and deep emotional processes. Such themes are often linked to the mind’…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A sounds more natural and idiomatic for a psychological narrative, using 'unspoken wishes' and 'storyline' effectively. Translation B feels slightly more literal and heavy, particularly with 'internal journey' and 'emotional processes'.
  - [new/style/minor] The phrasing 'atmosphere of a castle, a stormy sea, and destruction' is a bit clunky compared to A's more direct approach.
  - [new/style/minor] 'Internal journey' is a bit more clinical/literal than the more evocative 'inner journey'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A sounds more natural and professional for a mental well-being context. Translation B uses 'psyche' and 'unspoken wishes', which feel slightly more academic or literary, whereas A's 'the mind' and 'hidden desires' are more idiomatic for modern English psychoeducation.
  - [old/style/minor] The use of 'psyche' is a bit heavy/academic compared to 'the mind'; 'unspoken wishes' is a slightly less common collocation than 'hidden desires' in this context.
  - [old/style/minor] Missing Oxford comma, which is fine but A's flow is slightly smoother for the target market.

#### 🔴 en `/mockGptDream/desires` — OLD лучше (2:0)

- **RU**: Желание лучше понимать свои глубокие эмоции, обрести внутреннюю ясность и устойчивость.
- **OLD**: A wish to better understand your deeper emotions and to find inner clarity and stability.
- **NEW**: A desire to better understand deep emotions, find inner clarity, and gain stability.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 85)
  - Translation B is more natural and follows the UX guidelines by using the possessive 'your' instead of a generic article, which makes the text feel more personal and supportive. Translation A feels slightly more like a list of abstract nouns rather than a personal goal.
  - [new/style/minor] Lacks the personal touch ('your') which is preferred for a supportive tone; sounds a bit more like a formal definition than a personal aspiration.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more natural and follows the 'understanding friend' tone by using the possessive 'your', which creates a personal connection. Translation B feels slightly more clinical and detached due to the omission of 'your' and the repetitive structure.
  - [new/style/minor] Missing the possessive 'your' makes the phrase feel less personal and more like a dictionary definition rather than a supportive goal.
  - [new/style/minor] The rhythm is slightly clunky compared to the more fluid 'and to find... and stability' in A.

#### 🟢 en `/mockGptDream/deep` — NEW лучше (2:0)

- **RU**: Иногда я боюсь, что сильные эмоции могут выйти из-под контроля, поэтому мне хочется быть готовым к переменам и укреплять внутреннюю опору.
- **OLD**: Sometimes I’m afraid that strong emotions might get out of control, so I want to be prepared for changes and strengthen my inner foundation.
- **NEW**: Sometimes I fear that intense emotions might get out of control, so I want to be prepared for change and strengthen my inner resilience.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B uses much more natural and idiomatic terminology for mental health contexts. 'Intense emotions' is more common than 'strong emotions', and 'inner resilience' is the standard way to express 'внутренняя опора' in English, whereas 'inner foundation' sounds like a literal translation (calque).
  - [old/terminology/minor] 'inner foundation' is a literal translation of 'внутренняя опора'; 'resilience' is the idiomatic equivalent.
  - [old/style/minor] 'strong emotions' is acceptable but 'intense emotions' is more professional/natural in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses 'resilience', which is the idiomatic and natural way to express 'внутренняя опора' in a mental health context, whereas 'inner foundation' in B sounds like a literal translation (calque).
  - [old/style/minor] 'inner foundation' is a bit clunky/literal; 'changes' (plural) is acceptable but 'change' (uncountable) in A sounds more natural for general life shifts.
  - [old/terminology/minor] 'inner foundation' is not a standard psychological term in English; 'resilience' is the preferred term for this concept.

#### 🟡 en `/mockGpt/distortion`— вердикт неустойчив

- **RU**: Выбрано из-за обобщения одного случая (ошибка на работе) на общую самооценку и восприятие себя («все считают меня неудачником»)
- **OLD**: Chosen because it turns a single incident (a mistake at work) into a sweeping judgment about yourself (“everyone thinks I’m a failure”).
- **NEW**: Selected due to overgeneralization: applying a single instance (a mistake at work) to your overall self-perception (“everyone thinks I’m a failure”).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is much more natural and flows like high-quality English prose, whereas Translation B feels like a clunky, literal translation of a technical definition.
  - [new/style/major] The structure 'Selected due to overgeneralization: applying...' is heavy and reads like a textbook definition rather than a supportive, conversational explanation.
  - [new/style/minor] The use of 'Selected' instead of 'Chosen' or a more active phrasing feels slightly more formal/robotic in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses the correct CBT terminology ('overgeneralization') and maintains a professional yet accessible tone. Translation B is more descriptive but loses the specific technical term required for this context.
  - [old/omission/major] The key term 'overgeneralization' (обобщение) is replaced by a descriptive phrase, which is a loss of technical precision in a CBT context.

#### 🟡 en `/mockGpt/solutions`— вердикт неустойчив

- **RU**: Старайтесь отличать конструктивный комментарий о работе от оценки личности. Возможно, начальник просто обратил внимание на задачу, и это естественная часть рабочего процесса. Вспомните свои прошлые успехи и моменты, когда вы хорошо справлялись с задачами. Это …
- **OLD**: Try to separate a constructive comment about your work from a judgment of you as a person. It may be that your manager simply pointed out something that needed to be corrected in the task — and that is a natural part of the work process. Remind yourself of you…
- **NEW**: Try to distinguish constructive feedback about your work from a judgment of your personality. It’s possible your boss was simply focusing on the task, which is a natural part of the work process. Recall your past successes and moments when you handled tasks we…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A sounds more natural and professional, using better idiomatic expressions like 'see the situation in perspective' and 'receive work-related feedback'. Translation B has slight awkwardness in 'judgment of your personality' and 'feeling like it is a personal criticism'.
  - [new/style/minor] 'judgment of your personality' is slightly less idiomatic than 'judgment of you as a person' or 'personal judgment' in this context.
  - [new/style/minor] 'feeling like it is a personal criticism' is a bit wordy and clunky compared to 'experiencing it as personal criticism'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is more idiomatic and flows naturally, using 'constructive feedback' and 'see the situation more broadly', which sound like native English. Translation B is slightly wordy and uses clunky phrasing like 'judgment of you as a person' and 'pointed out something that needed to be corrected', which adds meaning not present in the original.
  - [old/addition/minor] added 'something that needed to be corrected' which isn't in the original
  - [old/style/minor] clunky phrasing: 'judgment of you as a person' vs 'judgment of your personality'
  - [old/style/minor] less natural: 'remind yourself of' vs 'recall'

#### 🟡 en `/mockGptDream/conclusion`— вердикт неустойчив

- **RU**: Этот сон может отражать внутренние процессы, связанные с поиском стабильности, понимания себя и адаптацией к изменениям. Психика старается осмыслить переживания и интегрировать новые внутренние инсайты.
- **OLD**: This dream may reflect inner processes linked to the search for stability, self-understanding and adaptation to change. Your psyche is trying to process what you’re going through and integrate new inner insights.
- **NEW**: This dream may reflect internal processes related to the search for stability, self-understanding, and adaptation to change. Your mind is attempting to process experiences and integrate new internal insights.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A sounds more natural and empathetic, using 'psyche' and 'what you’re going through' which fits the 'understanding friend' tone, whereas B feels slightly more academic and stiff.
  - [new/style/minor] The phrase 'attempting to process experiences' is a bit heavy and clinical compared to the more fluid 'trying to process what you’re going through'.
  - [new/style/minor] The repetition of 'internal' (internal processes... internal insights) is stylistically weaker than A's variation.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses 'mind', which is much more natural and less clinical in a mental health app context than 'psyche'. It also avoids the redundant 'inner insights' (insights are inherently internal) and the slightly clunky 'what you're going through'.
  - [old/style/minor] Use of 'psyche' sounds overly academic/clinical for a supportive app tone.
  - [old/style/minor] The phrase 'what you're going through' is a bit wordy compared to the concise 'experiences'.
  - [old/style/minor] Redundancy: 'inner insights' is tautological in English.

#### 🟢 en `/gptCbtDream/texts` — NEW лучше (2:0)

- **RU**: Иногда стандартных инструментов КПТ может быть недостаточно, и в такие моменты полезно использовать идеи из других психологических подходов. Анализ сновидений может помочь мягко прикоснуться к глубинным переживаниям и убеждениям, которые не всегда легко осозна…
- **OLD**: Sometimes standard CBT tools are not enough, and in those moments it can be helpful to draw on ideas from other psychological approaches as well. Dream analysis can gently tap into deeper experiences and beliefs that are not always easy to notice in everyday l…
- **NEW**: Sometimes standard CBT tools may not be enough, and in those moments, it can be helpful to draw on ideas from other psychological approaches. Dream analysis can help gently touch upon deep experiences and core beliefs that aren’t always easy to notice in daily…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B uses the correct canonical term 'core beliefs' and follows the instruction to use contractions ('aren't'). Translation A uses 'deeper experiences' instead of the more accurate 'deep experiences' and adds 'and CBT-based' which is redundant and not in the original.
  - [old/terminology/major] Used 'deeper experiences and beliefs' instead of the required 'core beliefs' for 'глубинные убеждения'.
  - [old/addition/minor] Added 'and CBT-based' to the end, which is not in the source text.
  - [old/style/minor] Avoided contractions ('are not', 'can not') which makes the tone slightly less warm/conversational than B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more precise and adheres better to the source text without unnecessary additions. Translation B adds 'as well' and 'CBT-based', which, while not incorrect, slightly deviates from the original's structure.
  - [old/addition/minor] Added 'as well' in the first sentence and 'CBT-based' in the last, which weren't in the original.
  - [old/style/minor] Uses British spelling 'analyse', whereas the target market is US English.

#### 🔴 en `/mockGptDream/middle` — OLD лучше (2:0)

- **RU**: Я стремлюсь чувствовать устойчивость и безопасность в своей жизни.
- **OLD**: I want to feel stable and safe in my life.
- **NEW**: I strive to feel stability and safety in my life.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation B sounds much more natural and idiomatic for a personal affirmation or goal statement. Translation A uses heavy nouns ('stability and safety') which creates a slightly formal, clunky tone, whereas B uses adjectives ('stable and safe') which is the standard way a native speaker would express this feeling.
  - [new/style/minor] Noun-heavy construction ('feel stability') sounds slightly unnatural compared to the more fluid adjective-based 'feel stable'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A uses adjectives ('stable and safe'), which is the natural way for a native speaker to describe a state of being. Translation B uses nouns ('stability and safety'), which sounds heavy, academic, and like a direct translation from Russian.
  - [new/style/major] Noun-heavy construction ('feel stability') is a typical Russian-to-English calque; in English, you feel an adjective (feel stable) rather than a noun.

#### 🟡 en `/mockGpt/negativeThought`— вердикт неустойчив

- **RU**: Мне кажется, что все вокруг считают меня неудачником
- **OLD**: It feels like everyone around me thinks I’m a failure.
- **NEW**: I feel like everyone around me thinks I’m a failure.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - In the context of a thought record or journal entry, 'I feel like' is more direct and natural for expressing a personal subjective experience. 'It feels like' is grammatically correct but slightly more detached/impersonal.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A captures the nuance of 'Мне кажется' (it feels like/it seems to me) more naturally for a mental health context, whereas B is a more literal 'I feel like'.
  - [new/style/minor] Slightly more literal/clunky; 'It feels like' is a more idiomatic way to express a subjective perception or cognitive distortion in English.

#### 🟡 en `/mockGptDream/fears`— вердикт неустойчив

- **RU**: Страх перемен и неопределенности, беспокойство о потере контроля и стабильности.
- **OLD**: Fear of change and uncertainty, worries about losing control and stability.
- **NEW**: Fear of change and uncertainty, and anxiety about losing control and stability.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B is more concise and natural for a list of symptoms or feelings. Translation A uses 'and' twice, which creates a clunky, repetitive rhythm that feels like a direct translation of the Russian structure.
  - [new/style/minor] Repetitive use of 'and' makes the sentence feel heavy and less idiomatic for a list.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B correctly identifies 'беспокойство' as 'anxiety' in a mental health context, whereas A uses 'worries', which is more colloquial and less precise for this register. B also maintains better rhythmic flow with the conjunction.
  - [old/terminology/minor] Using 'worries' instead of 'anxiety' misses the clinical nuance of the original 'беспокойство' in a CBT context.

#### 🟢 en `/mockGptDream/transfer` — NEW лучше (2:0)

- **RU**: 🧑‍💼 Образ себя в зеркале, который меняется, может говорить о поиске подлинной идентичности и стремлении лучше понять свои внутренние качества. 🏰 Замок может символизировать защиту и личные границы, а его разрушение — страх их утраты или важные перемены, кот…
- **OLD**: 🧑‍💼 The changing image of yourself in the mirror may point to a search for an authentic identity and a desire to understand your inner qualities better. 🏰 The castle can symbolise protection and personal boundaries, while its destruction may represent fear …
- **NEW**: 🧑‍💼 A changing reflection in the mirror may suggest a search for authentic identity and a desire to better understand your inner qualities. 🏰 The castle may symbolize protection and personal boundaries, while its destruction could represent a fear of losing…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more concise and idiomatic, using 'suggest' and 'reflect' naturally. Translation B feels slightly more wordy and uses 'feel tense', which is a weak way to translate 'вызывают напряжение'.
  - [old/style/minor] The phrase 'changes that feel tense' is an unnatural way to describe changes causing tension.
  - [old/style/minor] The phrasing 'image of yourself in the mirror' is slightly more heavy/clunky than 'reflection in the mirror'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and concise, using 'reflection' instead of the clunky 'image of yourself', and 'distress' which fits the psychological context better than 'worries'.
  - [old/style/minor] The phrase 'image of yourself in the mirror' is a bit wordy compared to the more natural 'reflection'.
  - [old/style/minor] The phrase 'feel tense and unsettling' is a slight deviation from the original 'вызывают напряжение' (cause tension).

#### 🟡 en `/mockGpt/consolation`— вердикт неустойчив

- **RU**: Иногда мы придаем чужим словам и реакции больше значения, чем они заслуживают. Ошибки на работе случаются с каждым и не отражают нашу ценность ни как специалиста, ни как человека. У вас есть достижения, сильные стороны и опыт, которые говорят о вашей профессио…
- **OLD**: Sometimes we give other people’s words and reactions more weight than they really deserve. Mistakes at work happen to everyone and do not define our worth as professionals or as human beings. You have achievements, strengths and experience that speak for your …
- **NEW**: Sometimes we give more weight to other people’s words and reactions than they deserve. Mistakes at work happen to everyone and don’t reflect your value as a professional or as a person. You have achievements, strengths, and experiences that speak to your profe…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more natural and flows better, using idiomatic phrasing like 'speak to your... worth'. Translation B suffers from slightly clunky phrasing ('speak for your competence') and inconsistent person usage (switching from 'we' to 'our' to 'you' in a way that feels less cohesive than A).
  - [old/style/minor] The phrase 'speak for your competence' is less idiomatic than 'speak to your worth' or 'speak to your competence'.
  - [old/style/minor] The switch from 'we' to 'our' to 'you' is slightly more jarring than in A, though not a critical error.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A is more cohesive and maintains a consistent perspective (we/our/you), whereas Translation B shifts inconsistently from 'we' to 'your' in the second sentence. A's use of 'define our worth' is more idiomatic for this context than B's 'reflect your value'.
  - [new/style/major] Inconsistent person: starts with 'we/our' then abruptly switches to 'your' in the second sentence, creating a disjointed tone.
  - [new/style/minor] The phrase 'speak to your... worth' is acceptable, but 'speak for your competence' in A feels slightly more natural in this specific flow.

#### 🟡 en `/daybookShare/texts`— вердикт неустойчив

- **RU**: Обменивайтесь идеями и получайте тёплую поддержку от других пользователей. Расскажите свою историю, предложите тему для размышлений или поделитесь тем, что сейчас занимает ваше сердце и мысли. Ваш опыт может поддержать кого-то в сложный момент или просто подар…
- **OLD**: Exchange ideas and receive kind support from other users. Tell your story, suggest a topic for reflection, or share what’s on your heart and mind right now. Your experience may support someone in a difficult moment or simply give them a sense of connection. Al…
- **NEW**: Exchange ideas and receive warm support from other users. Tell your story, suggest a topic for reflection, or share what is currently on your mind. Your experience can support someone during a difficult time or simply provide a sense of connection. All entries…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more idiomatic and captures the emotional nuance of the original. 'What’s on your heart and mind' is a natural English expression, whereas B omits 'heart'. A also correctly uses 'posts' or 'entries' in a way that feels natural, while B's omission of 'heart' makes the text feel flatter.
  - [new/omission/minor] Omitted 'heart' (сердце), which is important for the warm, supportive tone of the original.
  - [new/style/minor] Used 'what is currently on your mind', which is slightly more formal/stiff than the more natural 'what's on your heart and mind'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more polished and follows the UX guidelines perfectly. Translation B uses 'posts' instead of the project-standard 'entries' and 'kind support' instead of the more natural 'warm support' requested by the tone of voice.
  - [old/terminology/major] Used 'posts' instead of 'entries' (standard for journal entries).
  - [old/style/minor] 'Kind support' is slightly less idiomatic in this context than 'warm support'.

