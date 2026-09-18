# QA: слепое парное сравнение переводов — en-final-g67-diary

- **Дата**: 2026-09-18T21:40:37.111Z
- **Метка**: en-final-g67-diary
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: texts/diary.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## texts/diary.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 13 | 🔴 2 | ⚪ 1 | 🟡 4 | 0 / 2 | 87% |
| **итого** | 20 | 🟢 13 | 🔴 2 | ⚪ 1 | 🟡 4 | 0 / 2 | 87% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×5, omission/major×1; OLD — style/minor×7, style/major×4, omission/minor×3, mistranslation/major×2, addition/minor×2, omission/major×2, mistranslation/minor×1, omission/critical×1, terminology/major×1, mistranslation/critical×1

### Детали пар (для спот-чека)

#### ⚪ en `/automaticAnalysis/4/right`— ничья (2:0)

- **RU**: Я не уверена, что справлюсь
- **OLD**: I’m not sure I can handle it
- **NEW**: I’m not sure I can handle this
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both translations are perfect, natural, and idiomatic. The choice between 'it' and 'this' is purely stylistic and depends on the specific context of what is being handled, but neither is incorrect.
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both translations are perfect, natural, and idiomatic. The choice between 'this' and 'it' is purely stylistic and depends on whether the speaker is referring to a specific situation (this) or a general burden (it).

#### 🟢 en `/automaticAnalysis/5/description` — NEW лучше (2:0)

- **RU**: Иногда мы записываем только более мягкие мысли, избегая самых болезненных. Но именно признание ключевых мыслей помогает лучше разобраться в себе.
- **OLD**: Sometimes people only record thoughts that seem more acceptable, ignoring key or painful automatic thoughts.
- **NEW**: Sometimes we only record milder thoughts to avoid the most painful ones. However, acknowledging key thoughts is what truly helps you understand yourself.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 95)
  - Translation B is much closer to the original's tone and structure, maintaining the 'we' perspective and the supportive nuance. Translation A introduces 'people' (changing the subject) and adds 'automatic', which is an assumption not present in the source text.
  - [old/mistranslation/major] Changed 'we' to 'people', losing the personal connection of the original.
  - [old/addition/minor] Added 'automatic' to thoughts, which is not in the source.
  - [old/omission/major] The second sentence about the importance of acknowledging key thoughts is completely missing/merged incorrectly.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 92)
  - Translation A is a faithful and natural rendition of the original, maintaining the flow and the 'understanding friend' tone. Translation B is an oversimplification that omits the second sentence entirely and introduces unrequested terminology.
  - [old/omission/major] The entire second sentence regarding the importance of acknowledging key thoughts is missing.
  - [old/addition/minor] Added 'automatic' which, while contextually relevant to CBT, is an addition not present in the source text.

#### 🟢 en `/smer/h2` — NEW лучше (2:0)

- **RU**: Установите связь с автоматическими мыслями
- **OLD**: Establish a Connection with Automatic Thoughts
- **NEW**: Identify the link to your automatic thoughts
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation A uses a more natural, action-oriented verb ('Identify') and follows the sentence case rule for UI. Translation B is overly formal ('Establish a Connection'), uses Title Case incorrectly for a UI instruction, and lacks the necessary article/possessive before 'automatic thoughts'.
  - [old/style/major] Uses Title Case instead of sentence case
  - [old/style/minor] Sounds overly formal/stilted ('Establish a Connection')
  - [old/omission/minor] Missing article or possessive before 'automatic thoughts'
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation A is a literal, heavy calque of the Russian 'установите связь', which sounds unnatural in a mental health context. Translation B uses 'identify the link', which is much more idiomatic and aligns with the goal of cognitive behavioral therapy.
  - [old/style/major] Sounds like a technical manual for hardware rather than a psychological exercise; 'Establish a connection' is too formal and stiff.

#### 🟡 en `/automaticAnalysis/1/right`— вердикт неустойчив

- **RU**: Я думаю, что мои коллеги считают меня некомпетентной
- **OLD**: I think my colleagues consider me incompetent
- **NEW**: I think my colleagues view me as incompetent
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Translation A is more direct and natural for a personal thought. Translation B, while grammatically correct, is slightly more formal/detached due to the 'view me as' construction.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 95)
  - Both translations are grammatically correct, but 'view me as' sounds more natural and idiomatic in a psychological/reflective context than 'consider me'.

#### 🟢 en `/automaticAnalysis/2/description` — NEW лучше (2:0)

- **RU**: На этом шаге важно отразить вашу интерпретацию произошедшего, а не сам факт. Событие мы уже зафиксировали ранее.
- **OLD**: It is important to note your attitude toward the event. The fact of the event was recorded in the previous step.
- **NEW**: At this step, it’s important to reflect your interpretation of what happened, rather than the fact itself. We’ve already recorded the event earlier.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B is much more natural and follows the 'understanding friend' tone, using contractions and active voice. Translation A feels stiff, uses 'attitude' which is a slight mistranslation of 'interpretation', and sounds like a manual rather than a supportive app.
  - [old/style/major] Stiff, formal construction ('It is important to...') and unnatural phrasing ('The fact of the event was recorded').
  - [old/mistranslation/minor] 'Attitude' is not a precise equivalent for 'интерпретация' in a CBT context; 'interpretation' is the standard term.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation A is much more natural and follows the 'understanding friend' tone, whereas B is stiff and uses 'attitude' which is a mistranslation of 'интерпретация' in a CBT context.
  - [old/terminology/major] Using 'attitude' instead of 'interpretation' changes the CBT meaning; 'attitude' refers to a long-term disposition, while 'interpretation' refers to the specific cognitive process of evaluating an event.
  - [old/style/minor] The phrasing 'The fact of the event was recorded' is heavy and sounds like a technical log rather than a supportive guide.

#### 🔴 en `/automaticAnalysis/3/wrong` — OLD лучше (2:0)

- **RU**: Я имею склонность полагать, что моё мнение не имеет значения
- **OLD**: I tend to believe that my opinion doesn’t matter
- **NEW**: I have a tendency to believe that my opinion does not matter
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B is more natural and idiomatic for a mental health context, using the common 'I tend to' construction and a contraction. Translation A is grammatically correct but feels slightly heavy and formal due to 'I have a tendency to' and the lack of a contraction.
  - [new/style/minor] Slightly wordy and formal ('I have a tendency to' vs 'I tend to') and lacks the conversational tone of a contraction ('does not' vs 'doesn't').
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A is more natural and idiomatic for a mental health context, using a smooth verb phrase instead of the heavy noun-based construction in B. It also correctly uses the contraction 'doesn't', which aligns with the app's tone of voice.
  - [new/style/minor] The phrase 'I have a tendency to' is slightly wordy and formal (clunky) compared to the more natural 'I tend to'.
  - [new/style/minor] Avoids contractions ('does not'), making the tone feel more stiff and less like a 'supportive friend'.

#### 🟢 en `/automaticAnalysis/1/description` — NEW лучше (2:0)

- **RU**: Иногда мысль записывается очень обобщённо, и тогда сложно понять, что именно вызывает переживание. Лучше конкретизировать.
- **OLD**: An automatic thought may be recorded too generally.
- **NEW**: Sometimes a thought is recorded too broadly, making it hard to understand what exactly is causing the distress. It’s better to be specific.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 40 / NEW 95)
  - Translation A is a complete and accurate rendering of the original text, maintaining the tone and meaning. Translation B is a severe omission, losing more than half of the original message.
  - [old/omission/critical] The entire second sentence and the core explanation of why specificity is needed are missing.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 40 / NEW 95)
  - Translation B is a complete and accurate translation that preserves the full meaning, tone, and structure of the original. Translation A is a severe omission, losing more than half of the original text.
  - [old/omission/critical] The entire second sentence and the causal clause of the first sentence are missing.

#### 🟡 en `/info/comparison`— вердикт неустойчив

- **RU**: Запишите аргументы, которые поддерживают автоматическую мысль, и те, которые ей противоречат. Это поможет объективно оценить ее и увидеть ситуацию шире.
- **OLD**: Write down the arguments that support the automatic thought and those that contradict it. This will help you evaluate it more objectively and see the situation from a broader perspective.
- **NEW**: Write down the arguments that support the automatic thought and those that contradict it. This will help you evaluate it objectively and see the situation from a broader perspective.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 98)
  - Both translations are excellent and follow all CBT terminology and stylistic guidelines. Translation A is slightly better as it avoids the unnecessary addition of 'more' (addition), which isn't present in the original and can subtly imply that the previous evaluation was subjective.
  - [old/addition/minor] added 'more' before 'objectively', which is not in the original
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 94)
  - Translation A is slightly better because 'evaluate it more objectively' more accurately captures the nuance of the Russian 'объективно оценить ее' in the context of a process of improvement, whereas B is also correct but slightly more abrupt.

#### 🟡 en `/info/event`— вердикт неустойчив

- **RU**: Начнем с определения триггера, который вызвал неприятные эмоции или мысли. Триггером может стать как значимое, так и очень маленькое событие или даже одна всплывшая мысль.
- **OLD**: Start by identifying the trigger that brought up difficult emotions or thoughts. A trigger can be anything — from a major event to something very small, or even just a fleeting thought.
- **NEW**: Let’s start by identifying the trigger that caused these unpleasant emotions or thoughts. A trigger can be a significant event, a tiny occurrence, or even a single passing thought.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A sounds much more natural and idiomatic for a mental health app. The use of 'anything — from... to...' is a perfect way to convey the range described in the original, whereas B feels a bit more like a literal translation.
  - [new/style/minor] The phrasing 'a tiny occurrence' is slightly clunky compared to the more natural 'something very small' or 'a minor event'.
  - [new/style/minor] The structure is a bit repetitive and lacks the smooth flow of a native speaker's narrative.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and follows the original structure more closely while remaining idiomatic. Translation B introduces an unnecessary em dash and slightly changes the phrasing of the second sentence.
  - [old/style/minor] The use of 'anything — from...' is a bit more conversational/loose than the original, which is a direct definition.

#### 🟢 en `/automaticAnalysis/3/title` — NEW лучше (2:0)

- **RU**: Сложная и запутанная формулировка
- **OLD**: Too complex and confusing formulation
- **NEW**: Complex or confusing phrasing
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B is much more natural and idiomatic for a UI/UX context. Translation A sounds like a literal translation from Russian and uses 'formulation', which is heavy and unnatural in this context.
  - [old/style/major] The use of 'formulation' is a calque; 'phrasing' or 'wording' is much more natural for describing a sentence or thought.
  - [old/style/minor] Starting with 'Too' adds an unnecessary judgmental tone not present in the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is concise and natural for a UI/label context. Translation B is wordy, uses 'formulation' which sounds like a translation from Russian, and adds 'Too' which isn't in the original.
  - [old/addition/minor] Added 'Too' which changes the nuance from a description to a judgment
  - [old/style/major] 'Formulation' is a common calque from Russian; 'phrasing' is much more natural in English

#### 🟢 en `/automaticAnalysis/4/title` — NEW лучше (2:0)

- **RU**: Пропуск автоматической мысли
- **OLD**: Skipping the automatic thought
- **NEW**: Skipping an automatic thought
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In the context of a UI action or a heading, the indefinite article (or no article) is more natural when referring to the general concept of skipping a thought. Translation B's use of 'the' implies a specific, previously mentioned thought, which is less likely for a generic header.
  - [old/style/minor] Use of the definite article 'the' makes it sound like a specific thought is being skipped, rather than the general action/category.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In English, when referring to a single instance of a concept in a UI context, the indefinite article 'an' is more natural and less heavy than the gerund-led construction with 'the'.
  - [old/style/minor] Using 'the' implies a specific, previously mentioned thought, whereas 'an' is the standard way to describe the action of skipping any single thought.

#### 🟢 en `/automaticAnalysis/2/right` — NEW лучше (2:0)

- **RU**: Теперь начальник может подумать, что я безответственная
- **OLD**: Now my boss will think I’m irresponsible
- **NEW**: Now my boss might think I’m irresponsible
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B accurately captures the nuance of 'может' (might/may), whereas Translation A uses 'will', which implies certainty and changes the meaning from possibility to a prediction of fact.
  - [old/mistranslation/major] The word 'will' removes the uncertainty expressed by 'может' in the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A accurately captures the nuance of 'может' (might/may), expressing possibility, whereas Translation B changes the meaning to a certain future event (will).
  - [old/mistranslation/major] The original expresses possibility (might), but the translation expresses certainty (will).

#### 🟢 en `/smer/texts` — NEW лучше (2:0)

- **RU**: Промежуточные убеждения — это правила и установки, через которые мы воспринимаем окружающий мир. Когда такие убеждения искажаются, они могут порождать автоматические мысли, часто резкие и критичные по отношению к себе. В этом разделе вы можете связать свои убе…
- **OLD**: Intermediate beliefs are rules based on which we perceive reality. Distorted beliefs lead to destructive thoughts, which we call automatic thoughts. In this section, you can establish a connection between these concepts for further exploration.
- **NEW**: Intermediate beliefs are the rules and assumptions through which we perceive the world around us. When these beliefs become distorted, they can trigger automatic thoughts—often harsh and self-critical. In this section, you can connect your beliefs and automati…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 98)
  - Translation A is a perfect, idiomatic, and professional translation that follows all CBT terminology guidelines and maintains the supportive tone. Translation B is overly reductive, loses significant meaning (omission), and uses non-standard terminology.
  - [old/omission/major] Lost the description of automatic thoughts being 'harsh and self-critical'.
  - [old/terminology/major] Used 'destructive thoughts' instead of the canonical 'automatic thoughts' as the primary term, and failed to use the required 'rules and assumptions' pair.
  - [old/style/major] The phrasing 'rules based on which we perceive reality' is clunky and less natural than A.
  - [old/omission/minor] The final sentence is too vague and loses the actionable intent of 'working toward change'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 96)
  - Translation B is a perfect professional rendering that follows all CBT terminology guidelines and maintains the warm, supportive tone. Translation A is too reductive, omits significant parts of the original meaning, and uses non-standard terminology.
  - [old/omission/major] Missing 'assumptions' (установки), 'harsh and self-critical' (резкие и критичные), and the goal of 'working toward change' (работа над изменениями).
  - [old/terminology/major] Uses 'destructive thoughts' instead of the required 'automatic thoughts' as the primary term, and misses the nuance of the connection.
  - [old/style/minor] The phrasing 'rules based on which we perceive reality' is slightly clunky compared to the idiomatic B.

#### 🟡 en `/info/body`— вердикт неустойчив

- **RU**: Вспомните момент возникновения триггера и обратите внимание на ощущения в теле. Какие именно неприятные реакции вы ощущали?
- **OLD**: Recall the moment the trigger appeared and pay attention to your body. What exactly did you feel physically? Which unpleasant sensations did you notice?
- **NEW**: Recall the moment the trigger occurred and pay attention to your bodily sensations. What specific physical reactions did you feel?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Translation A is more natural and follows the original structure more closely. Translation B suffers from an omission (the second sentence is missing) and uses the heavy, slightly clinical 'bodily sensations'.
  - [new/omission/major] The second sentence of the original ('Какие именно неприятные реакции вы ощущали?') is completely missing.
  - [new/style/minor] 'bodily sensations' sounds overly clinical/academic compared to the warm, supportive tone required.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A is concise, professional, and follows the natural flow of a CBT exercise. Translation B is wordy, repetitive, and adds an extra sentence not present in the original.
  - [old/addition/major] Added an extra sentence 'Which unpleasant sensations did you notice?' which is redundant and not in the source.
  - [old/style/minor] The phrasing 'What exactly did you feel physically?' is slightly clunky compared to the more natural 'What specific physical reactions did you feel?' in A.

#### 🟢 en `/info/response` — NEW лучше (2:0)

- **RU**: Когда вы замечаете автоматическую мысль, важно внимательно ее рассмотреть. Часто такие мысли содержат когнитивные искажения и логические ошибки. Ваша задача найти рациональный, более реалистичный ответ и сформировать поддерживающую установку.
- **OLD**: When you notice an automatic thought, it’s important to look at it carefully. Such thoughts often contain cognitive distortions and logical errors. Your task is to find a rational, more realistic response and turn it into a supportive belief.
- **NEW**: When you notice an automatic thought, it’s important to examine it closely. Often, these thoughts contain cognitive distortions. Your goal is to find a rational, more realistic response and form a helpful belief.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 94)
  - Translation B uses more professional and idiomatic CBT terminology ('examine it closely' instead of 'look at it', and 'helpful belief' instead of 'supportive belief'). It also avoids the slightly clunky 'turn it into' in favor of the more natural 'form'.
  - [old/style/minor] 'look at it carefully' is a bit basic/colloquial for this context; 'supportive belief' is less standard than 'helpful belief' in CBT.
  - [old/omission/minor] omitted 'logical errors' (though in English CBT, 'cognitive distortions' often covers this, so it's a stylistic choice, but technically an omission).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more idiomatic and follows the project's terminology guidelines perfectly. Translation B uses 'logical errors' (redundant with distortions) and 'turn it into', which sounds clunky compared to the professional tone of A.
  - [old/style/minor] 'look at it carefully' is slightly more basic/colloquial than the professional 'examine it closely'.
  - [old/style/minor] 'turn it into a supportive belief' is a bit wordy and less precise than 'form a helpful belief'.
  - [old/style/minor] The addition of 'logical errors' is redundant in a CBT context when 'cognitive distortions' is already used, though it follows the Russian text literally.

#### 🟢 en `/automaticAnalysis/1/title` — NEW лучше (2:0)

- **RU**: Слишком общая формулировка
- **OLD**: Vague formulations
- **NEW**: Too vague
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B is more natural and concise for a UI context, whereas A sounds slightly more formal and academic.
  - [old/style/minor] The plural 'formulations' and the noun-heavy structure feel a bit more like a textbook than a quick UI feedback/label.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is concise and idiomatic for a UI error or feedback message. Translation B sounds like a formal heading or a fragment of a sentence, which is less natural for this context.
  - [old/style/minor] Uses a plural noun 'formulations' which makes it sound like a category title rather than a specific feedback on a single item.

#### 🟢 en `/stepper/body` — NEW лучше (2:0)

- **RU**: Я почувствовала учащённое сердцебиение и тяжесть в груди
- **OLD**: I felt my heart start racing and a heaviness in my chest
- **NEW**: I felt my heart racing and a heaviness in my chest
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation B is more direct and natural for describing a physical sensation. Translation A adds 'start', which introduces an unnecessary temporal element not present in the original.
  - [old/style/minor] The addition of 'start' makes the sentence slightly wordier and less immediate than the original sensation.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A is more direct and idiomatic for describing a physical sensation. Translation B adds 'start', which creates a slight unnecessary temporal delay that isn't present in the original Russian.
  - [old/style/minor] The addition of 'start' makes the sentence slightly wordier and less punchy than the original sensation description.

#### 🟢 en `/automaticAnalysis/4/description` — NEW лучше (2:0)

- **RU**: Иногда хочется сразу перейти к позитивным утверждениям. Но важно сначала заметить и записать автоматическую мысль, чтобы затем можно было её проработать.
- **OLD**: Some people immediately record alternative thoughts or responses to automatic thoughts.
- **NEW**: Sometimes it feels easier to jump straight to positive affirmations. But it’s important to first notice and record the automatic thought so you can work through it later.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 30 / NEW 98)
  - Translation B is a perfect, idiomatic, and accurate rendering of the original text, following all CBT terminology and tone guidelines. Translation A is a complete mistranslation (hallucination) that introduces entirely different meaning not present in the source.
  - [old/mistranslation/critical] The translation completely changes the meaning: instead of talking about the desire to jump to positive affirmations, it talks about people recording alternative thoughts, which is not in the original text.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 0 / NEW 98)
  - Translation A is a perfect, idiomatic, and accurate rendering of the original text, following all CBT terminology and tone guidelines. Translation B is a complete hallucination/omission that describes a completely different concept not present in the source.
  - [old/omission/critical] The entire meaning of the original text is lost; the translation describes a different process entirely.

#### 🔴 en `/automaticAnalysis/2/title` — OLD лучше (2:0)

- **RU**: Запись факта вместо интерпретации
- **OLD**: Recording facts instead of interpretations
- **NEW**: Recording a fact instead of an interpretation
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A uses the plural form, which is more natural for a general concept or a heading in English. Translation B sounds overly specific and slightly clunky due to the singular indefinite articles.
  - [new/style/minor] Singular 'a fact instead of an interpretation' sounds less like a general principle and more like a specific instruction for one instance, making it less idiomatic for a heading.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In English, when discussing concepts or general practices, the plural form sounds much more natural and idiomatic. Translation A sounds like a literal translation of the Russian singular structure, whereas B follows standard English patterns for describing a cognitive technique.
  - [new/style/minor] Singular 'a fact' and 'an interpretation' sounds slightly clunky and overly specific for a general heading/instruction.

#### 🟢 en `/automaticAnalysis/5/wrong` — NEW лучше (2:0)

- **RU**: Я немного тревожусь о будущем
- **OLD**: I’m a bit worried about the future
- **NEW**: I’m a little anxious about the future
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses 'anxious', which is the precise term for 'тревожусь' in a mental health context, whereas 'worried' is more colloquial and less specific to the clinical/emotional state of anxiety.
  - [old/style/minor] While natural, 'worried' is a slightly weaker match for the specific emotional state of 'тревога' (anxiety) compared to 'anxious'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Translation A uses 'anxious', which is the precise clinical and UX term for 'тревога' in a CBT context, whereas 'worried' is more colloquial and less aligned with the app's psychological focus.
  - [old/terminology/minor] uses 'worried' instead of the preferred 'anxious' for 'тревога'

