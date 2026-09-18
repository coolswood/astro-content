# QA: слепое парное сравнение переводов — en-final-g1-activities

- **Дата**: 2026-09-18T20:24:39.785Z
- **Метка**: en-final-g1-activities
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: activities.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## activities.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 4 | 🔴 6 | ⚪ 0 | 🟡 10 | 1 / 0 | 40% |
| **итого** | 20 | 🟢 4 | 🔴 6 | ⚪ 0 | 🟡 10 | 1 / 0 | 40% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×13, addition/minor×1, style/major×1, mistranslation/critical×1; OLD — style/minor×10, omission/minor×2, terminology/minor×1, addition/minor×1, mistranslation/major×1

### Детали пар (для спот-чека)

#### 🟡 en `/naslSLnadfl/description`— вердикт неустойчив

- **RU**: Высокие стандарты могут мотивировать, но когда ожидания становятся нереалистичными, они превращаются в ловушку: усиливается самокритика, возникает чувство недостаточности и эмоциональное истощение. В мире нет абсолютного совершенства, и стремление к нему неизб…
- **OLD**: High standards can be motivating, but when expectations become unrealistic, they can turn into a trap: self-criticism intensifies, feelings of inadequacy grow, and emotional burnout follows. There’s no such thing as absolute perfection, and striving for it ine…
- **NEW**: High standards can be motivating, but when expectations become unrealistic, they turn into a trap: self-criticism intensifies, feelings of inadequacy arise, and emotional exhaustion sets in. Absolute perfection doesn’t exist, and striving for it inevitably lea…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more precise and maintains the original's tone and structure. Translation B introduces unnecessary hedging ('can turn into') and uses 'burnout' instead of the more accurate 'exhaustion' for the context of emotional depletion.
  - [old/style/minor] The use of 'can turn into' adds unnecessary hedging not present in the original.
  - [old/terminology/minor] 'Emotional burnout' is a specific clinical/occupational term, whereas 'emotional exhaustion' (in A) is the direct and more appropriate translation for 'эмоциональное истощение' in a general CBT context.
  - [old/style/minor] 'Notice how it feels' is slightly more detached than the direct 'Notice how you feel' (Заметьте, что вы почувствуете).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and flows better as a piece of psychoeducation. It uses 'emotional burnout' and 'flawless outcome' which sound more natural in this context than B's slightly clunky phrasing.
  - [new/style/minor] The phrase 'enjoyment comes from the process, not just the perfection of the result' is a bit wordy and loses the directness of the original.
  - [new/style/minor] The use of 'frustration' for 'разочарование' is acceptable, but 'disappointment' in A is a more precise match for the emotional tone.

#### 🟢 en `/asgNldsc/title` — NEW лучше (2:0)

- **RU**: Обращайте внимание на внутреннее состояние
- **OLD**: Pay Attention to Your Inner State
- **NEW**: Pay attention to your inner state
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - The original is a general instruction/prompt, which in UI/UX context should follow sentence case. Translation A uses Title Case, which is inappropriate for this type of string.
  - [old/style/minor] Uses Title Case instead of sentence case, which is against the project's UI guidelines.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - Translation A correctly follows the sentence case rule for UI/instructional text, whereas Translation B uses Title Case, which is inappropriate for this type of string.
  - [old/style/minor] Uses Title Case instead of sentence case as required by the style guide for instructions/UI strings.

#### 🔴 en `/DzseWuFv2t/table/example/1` — OLD лучше (2:0)

- **RU**: Я никому не нужен Черно-белое мышление У меня есть люди, которые меня ценят и любят. Я важен для тех, кто рядом.
- **OLD**: No one needs me Black-and-white thinking There are people who value and love me. I matter to those who are close to me.
- **NEW**: Nobody needs me Black-and-white thinking There are people who value and love me. I am important to those close to me.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more idiomatic and emotionally resonant. 'I matter' is a much more natural and powerful way to express importance in a mental health context than the literal 'I am important'.
  - [new/style/minor] 'I am important' sounds slightly more formal/stiff compared to the more natural 'I matter'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Both translations are excellent, but A is slightly more idiomatic and natural for a mental health context. 'I matter' is a more powerful and common way to express self-worth in English than 'I am important'.
  - [new/style/minor] 'I am important' sounds slightly more formal/stiff compared to the more emotive and natural 'I matter'.

#### 🟢 en `/lsvnnDSnsdl/title` — NEW лучше (2:0)

- **RU**: Принятие возможности ошибиться
- **OLD**: Allowing for Mistakes
- **NEW**: Embracing the possibility of mistakes
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B captures the psychological nuance of 'принятие' as an active, mindful process (embracing), whereas A sounds more like a technical allowance or permission. B is much more idiomatic for mental health content.
  - [old/style/minor] Sounds slightly more like 'permitting' or 'accounting for' rather than the psychological concept of acceptance.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A captures the nuanced, psychological tone of 'принятие' (embracing) much better than the more functional 'allowing for'.
  - [old/style/minor] Sounds a bit more like a practical instruction or permission rather than a psychological concept/mindset.

#### 🔴 en `/lsvnnDSnsdl/statement` — OLD лучше (2:0)

- **RU**: Страх ошибки — частый спутник перфекционизма. Эта техника поможет вам учиться принимать свои ошибки спокойнее.
- **OLD**: Fear of mistakes often goes hand in hand with perfectionism. This exercise helps you respond to mistakes more calmly.
- **NEW**: The fear of making mistakes is a common companion to perfectionism. This technique will help you learn to accept mistakes more calmly.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more idiomatic and follows the 'expert friend' tone perfectly. Translation B is slightly wordy and uses a literal translation of 'спутник' (companion), which sounds unnatural in this context.
  - [new/style/minor] The phrase 'common companion to perfectionism' is a bit of a calque; 'goes hand in hand with' in A is much more natural.
  - [new/style/minor] The use of 'will help' is slightly more formal/predictive than the direct 'helps' used in A, which fits the UX tone better.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more natural and idiomatic ('goes hand in hand with'). It also uses 'exercise' and 'respond to', which align better with the supportive, expert tone of the app than the slightly more literal 'technique' and 'accept' in A.
  - [new/style/minor] The phrasing 'common companion to perfectionism' is grammatically correct but feels slightly more formal/stiff than the idiomatic 'goes hand in hand' used in B.

#### 🟢 en `/kdzYJ4njVJ/title` — NEW лучше (2:0)

- **RU**: Три варианта развития событий
- **OLD**: Three Possible Outcomes
- **NEW**: Three Scenarios
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In the context of mental health and CBT, 'scenarios' is the more natural and idiomatic way to describe potential developments or paths. 'Outcomes' sounds slightly more clinical or like a final result of an experiment.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more concise and idiomatic for a heading or a title, whereas B is slightly wordy. In UX/UI contexts, 'Scenarios' is the standard way to present different paths or developments.
  - [old/style/minor] A bit too wordy for a heading; 'Possible Outcomes' sounds more like a result of an experiment than a development of events.

#### 🟡 en `/alkjnaNNasz/title`— вердикт неустойчив

- **RU**: Зеркало самокритики
- **OLD**: The Self-Criticism Mirror
- **NEW**: The Mirror of Self-Criticism
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A uses a more poetic and idiomatic structure ('The Mirror of...') which fits the metaphorical nature of the title, whereas B sounds like a literal compound noun common in technical descriptions.
  - [old/style/minor] Sounds slightly more like a functional object description rather than a literary or psychological metaphor.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A follows the standard English UX pattern for titles and headings, using a concise noun adjunct construction. Translation B sounds overly poetic or dramatic, which is less suitable for a mental health app interface.
  - [new/style/minor] The 'of' construction is unnecessarily heavy and formal for a UI heading.

#### 🟡 en `/naslSLnadfl/task`— вердикт неустойчив

- **RU**: 1️⃣ В течение нескольких дней записывайте любые задачи, которые выполняете: «почистить зубы», «приготовить ужин», «сделать отчёт», «уборка дома» — любые. 2️⃣ Во второй колонке укажите, насколько эффективно, по вашему мнению, вы справились (в процентах). 3️⃣ В …
- **OLD**: 1️⃣ Over several days, write down any tasks you complete: “brush teeth,” “cook dinner,” “write a report,” “clean the house”—anything. 2️⃣ In the second column, note how effective you think you were (as a percentage). 3️⃣ In the third column, record how much yo…
- **NEW**: 1️⃣ For a few days, write down any tasks you perform: “brushing teeth,” “cooking dinner,” “writing a report,” “cleaning the house”—anything at all. 2️⃣ In the second column, indicate how effectively you think you handled the task (as a percentage). 3️⃣ In the …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A sounds more natural and follows the rhythm of the original better. Translation B uses inconsistent verb forms in the list (switching from imperative to infinitive-like structures) and feels slightly more clipped/staccato.
  - [old/style/minor] The list of tasks 'brush teeth, cook dinner...' lacks the gerund form ('brushing, cooking...') which makes it feel less like a natural list of activities in this context.
  - [old/omission/minor] In step 3, 'In the third' is shortened to 'In the third column' (which is fine), but the flow is less smooth than A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more natural and follows the UX principle of using simple, direct verbs. Translation B suffers from awkward gerund usage in the list and a slightly heavy, formal tone in the second and third steps.
  - [new/style/minor] Using gerunds ('brushing', 'cooking') in the list makes it feel less like a direct instruction/example and more like a description of activities.
  - [new/style/minor] The phrase 'note your level of enjoyment while doing the task' is wordy and sounds more like an academic instruction than a friendly app guide.

#### 🟡 en `/asgNldsc/description`— вердикт неустойчив

- **RU**: Это простое упражнение, которое помогает подготовиться к более глубоким практикам осознанности. Его цель — выйти из потока мыслей и мягко перенести внимание на собственные эмоции. Такие упражнения развивают способность к фокусировке. Чаще всего наши переживани…
- **OLD**: This is a simple exercise that helps you prepare for deeper mindfulness practice. The aim is to step out of the stream of thoughts and gently shift your attention to your own emotions. Exercises like this build your ability to focus. Our minds often dwell on t…
- **NEW**: This is a simple exercise to help you prepare for deeper mindfulness practices. Its goal is to step out of the stream of thoughts and gently shift your attention to your emotions. These exercises develop your ability to focus. Most of our experiences are tied …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A sounds much more natural and idiomatic for a mental health context. It avoids the clunky 'experiences are tied to' and 'reduce the impact' in favor of more fluid, native-sounding expressions like 'minds often dwell on' and 'lessen the pull'.
  - [new/style/minor] The phrasing 'Most of our experiences are tied to' is a bit heavy and sounds like a direct translation of 'наши переживания связаны с'.
  - [new/style/minor] The sentence structure in the third paragraph is slightly more academic/dry compared to the warm, supportive tone of A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and maintains a better flow. Translation B introduces slight inaccuracies, such as changing 'experiences' to 'minds' and 'emotions' to 'feelings', which weakens the psychological tone.
  - [old/mistranslation/minor] The original says 'our experiences' (переживания), but B says 'our minds often dwell', which changes the subject of the sentence.
  - [old/style/minor] The phrase 'lessen the pull' is a bit more poetic/metaphorical than the original 'снижаем воздействие' (reduce the impact), which is better served by A.

#### 🟡 en `/alkjnaNNasz/example`— вердикт неустойчив

- **RU**: Ваши обычные мысли о себе: Я полный неудачник. Конечно, меня не повысили — я же ничего не умею. Наверное, я никогда не добьюсь успеха в карьере. Я недостаточно умен и талантлив для этой работы. Теперь представьте, что ваша лучшая подруга Анна не получила повыш…
- **OLD**: Your usual self-talk: I’m a complete failure. Of course I didn’t get promoted—I’m not good at anything. I’ll probably never succeed in my career. I’m not smart or talented enough for this job. Now imagine your best friend Anna didn’t get a promotion and told y…
- **NEW**: Your usual thoughts about yourself: I’m a total failure. Of course I didn’t get the promotion — I’m incompetent. I’ll probably never succeed in my career. I’m not smart or talented enough for this job. Now imagine your best friend, Anna, didn’t get the promoti…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A uses much more natural, idiomatic English for a mental health context. 'Self-talk' is a perfect term for 'мысли о себе' in CBT, and the flow of the supportive dialogue feels warmer and more authentic to a native speaker.
  - [new/style/minor] The phrase 'I'm incompetent' is a bit heavy/clinical compared to the more natural 'I'm not good at anything' used in A.
  - [new/style/minor] 'A loved one' is a bit formal/generic for 'близкий человек' in this warm context; 'someone you care about' (A) is better.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and flows better for a native speaker. Translation B uses slightly clunky phrasing like 'not good at anything' (which is a bit childish/literal for 'ничего не умею') and 'versus someone you care about' (which feels a bit clinical/comparative rather than warm). A's ending is also more idiomatic.
  - [old/style/minor] 'not good at anything' is a weaker translation of 'ничего не умею' than 'incompetent' or 'don't know how to do anything' in this context.
  - [old/style/minor] 'versus someone you care about' sounds slightly more like a mathematical comparison than the warm tone of the original.

#### 🟡 en `/lsafnanS3sf/statement`— вердикт неустойчив

- **RU**: Эта техника полезна для людей, страдающих депрессией или прокрастинацией. Она может помочь вам улучшить самоорганизацию и управлять своим временем.
- **OLD**: This technique is helpful if you’re dealing with depression or procrastination. It can improve your self-organization and time management.
- **NEW**: This technique is helpful for people dealing with depression or procrastination. It can help you improve your organization and manage your time more effectively.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and follows the UX principle of avoiding unnecessary words. Translation B adds 'more effectively', which is an addition not present in the original, and 'organization' is slightly less precise than 'self-organization' in this context.
  - [new/addition/minor] added 'more effectively' at the end
  - [new/style/minor] slightly wordier than necessary for a mobile app context
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A sounds more natural and professional for an educational context. Translation B uses 'self-organization', which is a clunky calque from Russian, and 'time management' as a noun phrase feels slightly more abrupt here than the verb-driven structure in A.
  - [old/style/minor] 'self-organization' is a heavy, non-idiomatic term in this context; 'organization' or 'organizational skills' is preferred.
  - [old/style/minor] The structure 'improve your self-organization and time management' is a bit dry compared to the more fluid 'improve your organization and manage your time'.

#### 🔴 en `/lsafnanS3sf/table/example/1` — OLD лучше (2:0)

- **RU**: Позавтракать Позавтракал
- **OLD**: Have breakfast Had breakfast
- **NEW**: Eat breakfast Ate breakfast
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - In the context of habit tracking or journaling, 'Have breakfast' is much more natural and idiomatic than 'Eat breakfast'. 'Eat' sounds a bit more mechanical and focuses strictly on the act of mastication, whereas 'Have' covers the entire meal experience.
  - [new/style/minor] 'Eat breakfast' is grammatically correct but sounds less natural for a lifestyle/wellness app than 'Have breakfast'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - In English, 'have breakfast' is the most natural, idiomatic way to describe the act of eating a meal, whereas 'eat breakfast' sounds slightly more functional and less conversational.

#### 🔴 en `/alkjnaNNasz/task` — OLD лучше (2:0)

- **RU**: 1️⃣ Выберите ситуацию, в которой вы часто становитесь самокритичны. 2️⃣ Представьте, что ваш близкий друг или дорогой вам человек оказался в такой же ситуации. 3️⃣ Проведите ролевую сцену: вы остаётесь собой, а воображаемый собеседник — это ваш друг. 4️⃣ Произ…
- **OLD**: 1️⃣ Choose a situation where you often become self-critical. 2️⃣ Imagine that a close friend or someone you care about is in the very same situation. 3️⃣ Run a short role-play: you speak as yourself, and the imagined partner is your friend. 4️⃣ Say out loud th…
- **NEW**: 1️⃣ Choose a situation where you often become self-critical. 2️⃣ Imagine that a close friend or someone dear to you was in that exact same situation. 3️⃣ Role-play the scene: stay as yourself, while your imaginary interlocutor is your friend. 4️⃣ Say out loud …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Translation A is much more natural and idiomatic for a mental health app. It avoids heavy, clunky words like 'interlocutor' and uses smooth, modern phrasing like 'Run a short role-play' and 'Notice the gap'.
  - [new/style/major] The word 'interlocutor' is overly academic and unnatural in this warm, supportive context.
  - [new/style/minor] The phrasing 'stay as yourself' is a bit awkward compared to 'speak as yourself'.
  - [new/style/minor] The sentence structure in step 4 is slightly more heavy/clunky than in A.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation B sounds more natural and idiomatic for a mental health app. It uses better phrasing like 'the gap between' and 'offering yourself', whereas A feels slightly more literal and stiff (e.g., 'interlocutor').
  - [new/style/minor] The word 'interlocutor' is too formal/academic for a warm, supportive tone.
  - [new/style/minor] 'Stay as yourself' is a bit clunky compared to 'speak as yourself'.

#### 🔴 en `/DzseWuFv2t/description` — OLD лучше (2:0)

- **RU**: Мысли вроде «Я ничего не стою», «Я хуже других», «У меня ничего не получится», «Я во всём виноват», «Я неудачник» снижают самооценку и могут привести к депрессивным переживаниям. Важно не поддаваться вспышкам внутреннего критика и учиться спокойно ему возражат…
- **OLD**: Thoughts like “I’m worthless,” “I’m worse than others,” “Nothing will work out for me,” “Everything is my fault,” and “I’m a failure” erode self-esteem and can lead to depressive symptoms. It’s important not to give in to flare-ups of the inner critic and to l…
- **NEW**: Thoughts like “I’m worthless,” “I’m worse than others,” “I’ll never succeed,” “It’s all my fault,” or “I’m a failure” can lower your self-esteem and lead to depressive experiences. It’s important not to give in to your inner critic and to learn how to calmly t…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B uses more natural, idiomatic vocabulary ('erode self-esteem', 'push back') and more accurate clinical terminology ('depressive symptoms' vs 'experiences').
  - [new/style/minor] 'depressive experiences' sounds slightly unnatural compared to 'symptoms' or 'episodes'; 'talk back to it' is a bit literal/childish for this context.
  - [new/style/minor] 'I'll never succeed' is a bit more dramatic than the original 'У меня ничего не получится' (Nothing will work out for me).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 86)
  - Translation A sounds more natural and professional. 'Erode self-esteem' and 'depressive symptoms' are much better idiomatic choices for mental health content than 'lower self-esteem' and 'depressive experiences'.
  - [new/style/minor] 'Depressive experiences' is a bit clunky; 'symptoms' or 'episodes' is more standard.
  - [new/style/minor] 'Talk back to it' sounds slightly more childish/confrontational than the more therapeutic 'push back' or 'challenge' used in A.

#### 🟡 en `/sdfcgNldslm/task`— вердикт неустойчив

- **RU**: Возьмите небольшой кусочек еды 🍇, например, изюм или орех. Подержите его в руке, почувствуйте вес. Закройте глаза и попробуйте определить, насколько он лёгкий или тяжёлый. Рассмотрите внимательно 👀: откройте глаза и посмотрите на еду так, словно видите её вп…
- **OLD**: Take a small piece of food 🍇—for example, a raisin or a nut. Hold it in your hand and feel its weight. Close your eyes and notice whether it feels light or heavy. Look closely 👀: open your eyes and observe the food as if seeing it for the first time. What do…
- **NEW**: Take a small piece of food 🍇, like a raisin or a nut. Hold it in your hand and feel its weight. Close your eyes and try to sense how light or heavy it is. Observe closely 👀: open your eyes and look at the food as if you’re seeing it for the first time. What …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and flows naturally, especially in the 'Taste' and 'Swallow' sections. Translation B contains a slight mistranslation in the 'Look' section by adding 'texture', which was already covered in the next step.
  - [old/addition/minor] Added 'texture' to the 'Look' section, which is redundant as it is the focus of the 'Touch' section.
  - [old/style/minor] The phrase 'the path of the food' sounds slightly clinical/unnatural compared to A's more fluid approach.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more idiomatic and flows better as a mindfulness exercise. It uses more natural phrasing like 'the way it reflects light' and 'from moment to moment' compared to the slightly clunkier constructions in B.
  - [new/style/minor] The phrase 'resist the urge to chew immediately' is a bit wordy and clinical for a warm, supportive tone; 'don't rush to chew' in A is much more natural.
  - [new/style/minor] The phrasing 'how the light hits it' is okay, but 'the way it reflects light' in A feels more polished for this context.

#### 🔴 en `/lsafnanS3sf/table/header` — OLD лучше (2:0)

- **RU**: Время До После Удовольствие
- **OLD**: Time Before After Pleasure
- **NEW**: Time To Do After Enjoyment
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 65)
  - Translation A makes a critical error by translating 'До' as 'To Do' (a task list), whereas the context clearly implies a temporal sequence (Before/After). Translation B correctly captures the temporal meaning and uses 'Pleasure', which is a more natural fit for a scale or metric than 'Enjoyment' in this context.
  - [new/mistranslation/critical] 'To Do' changes the meaning from a temporal marker to a task list
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 40)
  - Translation A is a perfect, direct match for the UI labels. Translation B introduces a major mistranslation ('To Do' instead of 'Before') and uses 'Enjoyment', which is less natural for a simple metric label than 'Pleasure'.
  - [new/mistranslation/critical] The word 'До' (Before) was incorrectly translated as 'To Do'
  - [new/style/minor] 'Enjoyment' is too heavy/formal for a simple metric compared to 'Pleasure'

#### 🟡 en `/lsafnanS3sf/expectations`— вердикт неустойчив

- **RU**: Остановит вашу склонность к постоянному обдумыванию важности и ценности тех или иных действий и поможет справиться с внутренними противоречиями: стоит ли что-то делать или нет Поможет вам распланировать свое время сбалансированно, потому что там будут дела, ко…
- **OLD**: It helps you stop second-guessing whether something is worth doing and resolve inner conflicts about taking action. It helps you plan your time more evenly, balancing obligations with activities that bring you pleasure. If you stick to a daily schedule, you’ll…
- **NEW**: It can reduce the tendency to constantly overthink the importance or value of certain actions and help you resolve internal conflicts about whether or not something is worth doing. It will help you plan your time in a more balanced way, as it will include both…
- Проход [A=NEW, B=OLD]: победитель new, уверенность medium (оценки OLD 84 / NEW 92)
  - Translation A is more faithful to the original's structure and nuance, particularly in the first and third paragraphs. Translation B is punchier but sacrifices some of the specific causal links and the 'overthinking' nuance present in the source.
  - [old/style/minor] The phrase 'stop second-guessing' is a bit of a leap from 'остановит вашу склонность к постоянному обдумыванию' (reduce the tendency to overthink).
  - [old/omission/minor] The first paragraph in B omits the specific mention of 'importance and value' of actions, which is a key part of the original's meaning.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is much more idiomatic and follows the 'expert friend' tone, using natural phrasing like 'second-guessing' and 'stick to a schedule'. Translation B is wordy and suffers from heavy Russian-to-English structural mirroring (calques).
  - [new/style/major] Overly wordy and literal; 'reduce the tendency to constantly overthink' is a heavy translation of the Russian structure.
  - [new/style/minor] Phrasing like 'as it will include both necessary tasks' feels slightly clinical/clunky compared to the more natural 'balancing obligations' in A.
  - [new/style/minor] The use of 'it will help' and 'it will include' creates a repetitive, slightly robotic rhythm.

#### 🟡 en `/DzseWuFv2t/task`— вердикт неустойчив

- **RU**: Создайте таблицу из трёх колонок. Названия колонок: Мысли критика Когнитивная ошибка Рациональный ответ 1️⃣ В первую колонку записывайте все самокритичные мысли, которые появляются, когда вы чувствуете вину, бесполезность или недовольство собой. Важно записыва…
- **OLD**: Create a table with three columns. Column names: Critic’s Thoughts Cognitive Distortion Rational Response 1️⃣ In the first column, write down every self-critical thought that shows up when you feel guilty, useless, or dissatisfied with yourself. Be sure to wri…
- **NEW**: Create a table with three columns. Name the columns: Critic’s thoughts Cognitive distortion Rational response 1️⃣ In the first column, write down the self-critical thoughts that arise when you feel guilty, useless, or dissatisfied with yourself. It’s important…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A follows the sentence case rule for UI/instructions and uses more natural, idiomatic phrasing. Translation B uses Title Case for column names, which violates the project's style guide for sentence case.
  - [old/style/minor] Column names should be in sentence case per instructions, not Title Case.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A follows the UI/UX guidelines for sentence case in lists and uses more natural, idiomatic phrasing ('isn’t disputable' vs 'cannot be refuted'). It also uses 'compassionate' which is a better fit for the supportive tone than 'kind'.
  - [new/style/minor] Uses lowercase for column names in a list, whereas A uses Title Case which is more standard for headers/labels.
  - [new/style/minor] 'cannot be refuted' sounds slightly more academic/stiff than 'isn't disputable'.

#### 🟡 en `/lsafnanS3sf/title`— вердикт неустойчив

- **RU**: День под контролем
- **OLD**: A Day in Control
- **NEW**: Day Under Control
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a natural, idiomatic way to express the concept of having one's day under control, often used as a status or heading. Translation B sounds like the day itself is exercising control over something, which is a semantic error.
  - [old/mistranslation/major] The phrase 'A Day in Control' implies the day is the agent of control, whereas the original means the user has control over the day.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A uses a natural, idiomatic English structure for a title or status. Translation B sounds like a literal, clunky translation from Russian (calque) and lacks the necessary article.
  - [new/style/major] Missing article 'A' and unnatural prepositional phrase; 'Day Under Control' sounds like broken English.

#### 🟢 en `/dfdzsWz4nJ/expectations` — NEW лучше (2:0)

- **RU**: Со временем вам будет проще удерживать внимание в настоящем моменте. Уровень тревоги постепенно снизится. Это упражнение подготовит вас к более сложным техникам осознанности.
- **OLD**: Over time, it will become easier to keep your attention in the present moment. Your anxiety will gradually decrease. This exercise will prepare you for more advanced mindfulness techniques.
- **NEW**: Over time, it will become easier for you to stay present. Your anxiety levels will gradually decrease. This exercise will prepare you for more advanced mindfulness techniques.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and natural for a mental health app. 'Stay present' is a standard, concise way to express 'удерживать внимание в настоящем моменте' in English, whereas B is slightly wordy and literal.
  - [old/style/minor] The phrase 'keep your attention in the present moment' is a bit heavy and sounds like a direct translation from Russian; 'stay present' is much more natural for a native speaker.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and natural for a mental health app. 'Stay present' is a much more common and fluid way to express mindfulness than the literal 'keep your attention in the present moment'.
  - [old/style/minor] The phrase 'keep your attention in the present moment' is grammatically correct but sounds slightly wordy and clinical compared to the idiomatic 'stay present'.

