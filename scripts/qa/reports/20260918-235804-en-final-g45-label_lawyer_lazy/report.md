# QA: слепое парное сравнение переводов — en-final-g45-label_lawyer_lazy

- **Дата**: 2026-09-18T20:58:04.828Z
- **Метка**: en-final-g45-label_lawyer_lazy
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/depression/label_lawyer_lazy.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/label_lawyer_lazy.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 17 | 🟢 5 | 🔴 2 | ⚪ 0 | 🟡 10 | 0 / 1 | 71% |
| **итого** | 17 | 🟢 5 | 🔴 2 | ⚪ 0 | 🟡 10 | 0 / 1 | 71% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×15, omission/minor×1, style/major×1; OLD — style/minor×12, omission/major×2, mistranslation/major×1, omission/critical×1, style/major×1, omission/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/lawyer/screen_1/texts`— вердикт неустойчив

- **RU**: Следующая техника помогает работать с самокритикой, предлагая вам стать собственным адвокатом. Может показаться необычным, но она удивительно эффективна. Чтобы ослабить влияние критических мыслей, важно не только замечать их, но и уметь уверенно им противостоя…
- **OLD**: The following technique helps you work with self-criticism by inviting you to become your own advocate. It may sound unusual, but it’s surprisingly effective. To weaken the impact of critical thoughts, it’s important not only to notice them but also to counter…
- **NEW**: The following technique helps you work through self-criticism by encouraging you to become your own advocate. It might sound unusual, but it’s surprisingly effective. To weaken the influence of critical thoughts, it’s important not only to notice them but also…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Translation A is more idiomatic and flows better as a cohesive narrative. Translation B contains a significant mistranslation in the third paragraph where 'guilty' is replaced by 'to blame for everything', which breaks the grammatical structure of the list of labels.
  - [old/mistranslation/major] The phrase 'assigning labels like... "to blame for everything"' is grammatically incorrect as a label; it should be an adjective like 'guilty' to match 'failure' and 'weak'.
  - [old/style/minor] The transition 'Now you take on the role of the defense' is slightly less smooth than A's structure.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more cohesive and maintains a better narrative flow. Translation B suffers from a significant omission (the quote by Elizabeth Gilbert) and uses slightly clunkier phrasing in the courtroom metaphor.
  - [new/omission/critical] The quote by Elizabeth Gilbert is completely missing from the text.
  - [new/style/minor] The transition to the prosecutor role is a bit abrupt compared to the smoother 'Imagine you're in a courtroom' in A.
  - [new/style/minor] 'managing your inner dialogue' is a bit more clinical/heavy than the more natural 'This is an inner dialogue grounded in...' in A.

#### 🟡 en `/lawyer/screen_2/texts`— вердикт неустойчив

- **RU**: <dialog psy="true">Представьте, что вы часто критикуете себя, называете слабым и неудачником. Теперь попробуйте выступить в роли адвоката — даже если сначала это даётся с трудом.</dialog> <dialog psy="true">Задача — защищать себя честно, аргументированно и ува…
- **OLD**: Imagine you often criticize yourself, calling yourself weak and a failure. Now try stepping into the role of the defense—even if it feels difficult at first. The goal is to defend yourself honestly, thoughtfully, and respectfully, as if you were defending some…
- **NEW**: <dialog psy="true">Imagine you often criticize yourself, calling yourself weak or a failure. Now, try to act as your own advocate—even if it feels difficult at first.</dialog> <dialog psy="true">Your goal is to defend yourself honestly, logically, and respectf…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and flows better as a natural dialogue. Translation B contains several clunky constructions and slight mistranslations of nuance (e.g., 'He could be trying harder' instead of 'He could try harder').
  - [new/style/minor] The phrase 'He could be trying harder' changes the meaning from a criticism of potential ('could try harder') to a continuous state.
  - [new/style/minor] 'Making mistakes is part of being human' is a bit cliché/wordy compared to the more natural 'Mistakes are part of every human life' or 'part of life'.
  - [new/style/minor] 'doesn't always cope' sounds slightly incomplete in this context compared to 'doesn't always handle things well'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and maintains a better flow for a role-play scenario. It correctly uses 'defense attorney' and 'defense' in a way that feels natural to a native speaker, whereas B's 'stepping into the role of the defense' is slightly clunky. A also captures the nuance of 'аргументированно' as 'logically' better than B's 'thoughtfully' in this specific context.
  - [old/style/minor] The phrase 'stepping into the role of the defense' is slightly less natural than 'act as your own advocate'.
  - [old/style/minor] 'thoughtfully' for 'аргументированно' is a bit weak; 'logically' or 'with sound arguments' fits the legal metaphor better.

#### 🟡 en `/lawyer/description`— вердикт неустойчив

- **RU**: Эта техника предлагает новый взгляд на преодоление самокритики — через роль внутреннего адвоката. Используя аналогию с судебным процессом, вы научитесь замечать обвиняющие мысли, оспаривать их и защищать себя аргументами, основанными на фактах и доброжелательн…
- **OLD**: This technique offers a fresh way to overcome self-criticism by stepping into the role of your inner advocate. Using a courtroom analogy, you’ll learn to notice accusatory thoughts, challenge them, and defend yourself with arguments grounded in facts and good …
- **NEW**: This technique offers a new way to overcome self-criticism by stepping into the role of an internal advocate. Using a courtroom analogy, you’ll learn to notice accusing thoughts, challenge them, and defend yourself with arguments based on facts and kindness. T…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A uses much more natural, idiomatic English ('inner advocate' vs 'internal advocate', 'grounded in' vs 'based on') and maintains a better flow. Translation B's 'accusing thoughts' is a slight lexical mismatch compared to the standard 'accusatory thoughts'.
  - [new/style/minor] 'internal advocate' sounds more clinical/mechanical than the idiomatic 'inner advocate'.
  - [new/style/minor] 'accusing thoughts' is less natural than 'accusatory thoughts'.
  - [new/style/minor] 'relationship with yourself' is a slight departure from 'attitude toward yourself', though acceptable, A is closer to the original intent.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and aligns better with the 'understanding friend' tone. Translation B uses 'good faith', which is a legal term and sounds too formal/stiff in a mental health context, whereas 'kindness' perfectly captures the intended warmth.
  - [old/style/minor] 'good faith' is a legalistic term that breaks the warm, supportive tone of the text; 'kindness' is better for CBT context.
  - [old/style/minor] 'cultivate an attitude' is slightly more formal/academic than 'develop a relationship', which fits the 'expert friend' persona better.

#### 🟡 en `/label/screen_3/texts`— вердикт неустойчив

- **RU**: Попробуйте несколько простых упражнений: <h2>«Срывание ярлыков»</h2> Представьте, что люди вокруг ходят с ярлыками на лбу («неудачник», «ленивый», «некрасивая» и т. д.). Каждый раз, когда замечаете такой ярлык у себя в голове, мысленно снимайте его. <h2>«Короб…
- **OLD**: Try a few simple exercises: “Peeling Off Labels” Imagine people walking around with labels on their foreheads (“loser,” “lazy,” “unattractive,” etc.). Each time you notice such a label in your mind, take it off mentally. “Label Box” Take a box and some sticky …
- **NEW**: Try these simple exercises: <h2>“Unlabeling”</h2> Imagine that people around you are walking around with labels on their foreheads (“failure,” “lazy,” “unattractive,” etc.). Every time you notice such a label popping up in your head, mentally strip it away. <h…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more idiomatic and flows much better as a piece of psychoeducation. It uses natural phrasing like 'popping up in your head' and 'move away from', whereas B feels slightly more fragmented and literal.
  - [old/style/minor] The title 'Peeling Off Labels' is a bit literal; 'Unlabeling' in A is a more natural concept name.
  - [old/style/minor] Phrasing like 'the fewer labels we live by' is slightly less smooth than A's 'the less we live through labels'.
  - [old/style/minor] The translation of 'некрасивая' as 'unattractive' in A is better than the implied tone in B's context, though both are acceptable.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A is much more natural and idiomatic. Translation B suffers from several 'translationese' markers and awkward phrasing (e.g., 'the less we live through labels' is a literal calque of the Russian structure). A's use of 'Peeling Off Labels' and 'The fewer labels we live by' sounds like authentic English psychological advice.
  - [new/style/major] The phrase 'the less we live through labels' is a direct calque from Russian and sounds unnatural in English; 'the fewer labels we live by' (in A) is the correct idiomatic way to express this.
  - [new/style/minor] The title 'Unlabeling' is a bit too clinical/abstract compared to the more evocative 'Peeling Off Labels'.
  - [new/style/minor] The phrase 'the true complexity of ourselves' is slightly clunky compared to 'the true complexity in ourselves'.

#### 🔴 en `/lazy/screen_3/texts` — OLD лучше (2:0)

- **RU**: Почему мотивация так и не появляется? Часто нам кажется, что без желания мы ничего не сможем сделать. Но действительно ли в жизни всё происходит только из-за мотивации? Всегда ли вы идёте на работу с энтузиазмом? Или иногда — потому что нужно? Когда мы говорим…
- **OLD**: Why doesn’t motivation show up? We often assume that without desire, we can’t do anything. But does everything in life really happen only because of motivation? Do you always go to work with enthusiasm—or sometimes simply because it’s needed? When we say “I ha…
- **NEW**: Why doesn’t motivation appear? We often feel that we can’t do anything without the desire to do it. But does everything in life really depend on motivation? Do you always go to work with enthusiasm? Or sometimes, do you go simply because you have to? When we s…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation B sounds more natural and idiomatic for a mental health article. It avoids the slightly clunky 'the desire to do it' and 'required to want' found in A, opting for smoother phrasing like 'without desire' and 'don't have to want'.
  - [new/style/minor] The phrasing 'without the desire to do it' is a bit wordy/heavy for a supportive tone; 'required to want' sounds slightly too formal/legalistic compared to the original 'не обязаны'.
  - [new/style/minor] The use of 'During depression' is grammatically okay but 'In depression' (as in B) is more idiomatic for this context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A is much more natural and flows like a well-written English article. Translation B feels slightly more formal and 'translated' due to word choices like 'beneficial' and 'intensify'.
  - [new/style/minor] 'everything that is beneficial for us' sounds too academic/formal for a supportive tone.
  - [new/style/minor] 'intensify the suffering' is a bit heavy; 'deepen the suffering' (as in A) is more idiomatic in this context.

#### 🟢 en `/label/test/answers` — NEW лучше (2:0)

- **RU**: Навешивание ярлыков помогает лучше понять мотивы человека Ярлыки могут ограничивать наше восприятие человека Ярлыки часто основаны на сверхобобщениях и предвзятости Навешивание ярлыков может привести к недопониманию и конфликтам
- **OLD**: Labeling helps us better understand a person’s motives Labels can limit how we perceive a person Labels are often based on overgeneralization and bias Labeling can lead to misunderstanding and conflict
- **NEW**: Labeling helps us better understand people’s motives Labels can limit our perception of others Labels are often based on overgeneralizations and bias Labeling can lead to misunderstanding and conflict
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B sounds more natural and idiomatic for a psychological article. Using 'people's motives' and 'perception of others' is much smoother than the repetitive 'a person' used in Translation A.
  - [old/style/minor] Repetitive use of 'a person' makes the text feel slightly clunky and less like a professional article.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A sounds more natural and idiomatic for a general psychological insight. Using 'people's motives' and 'perception of others' flows better than the repetitive and slightly clunky 'a person' used in B.
  - [old/style/minor] Repetitive use of 'a person' makes the text feel less like a professional article and more like a literal translation.

#### 🟡 en `/lazy/description`— вердикт неустойчив

- **RU**: Эта статья помогает понять, как депрессия влияет на мотивацию и способность действовать. Мы разбираем, почему возникает апатия, как бездействие усиливает симптомы, и почему важно возвращаться к активности шаг за шагом — даже когда нет сил и желания. Вы узнаете…
- **OLD**: This article explains how depression affects motivation and the ability to act. We examine why apathy arises, how inaction intensifies symptoms, and why it’s crucial to return to activity step by step—even when you lack energy or desire. You’ll find practical …
- **NEW**: This article helps you understand how depression affects motivation and the ability to take action. We explore why apathy occurs, how inactivity reinforces symptoms, and why it is vital to return to activity step by step—even when you lack the energy or desire…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A sounds more natural and idiomatic for a mental health article, using 'vitality' and 'a new perspective' which flows better than the more literal B. Translation B is slightly too formal/stiff with 'You will learn' and 'shifting your perspective on your own actions'.
  - [new/style/minor] Uses 'You will learn' instead of the more engaging 'You'll find' or 'You'll learn'; 'shifting your perspective on your own actions' is a bit wordy and heavy compared to the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and maintains the professional yet supportive tone of the original. Translation B introduces 'vitality' and 'what you do', which slightly drift from the original meaning and feel less idiomatic in this context.
  - [old/mistranslation/minor] Using 'vitality' for 'энергию' is a bit too poetic/strong; 'energy' is more standard for CBT contexts.
  - [old/style/minor] 'a new perspective on what you do' is a bit wordy compared to the more direct 'shifting your perspective on your own actions'.

#### 🟢 en `/label/screen_1/texts` — NEW лучше (2:0)

- **RU**: Навешивание ярлыков — это когда мы даём себе или другому человеку категоричную, негативную оценку на основании одного события или поступка, без глубокого анализа и учёта контекста. <q author="Уильям Сомерсет Моэм">Люди больше всего на свете любят наклеить на д…
- **OLD**: Labeling is when we assign a categorical, negative judgment to ourselves or someone else based on a single event or action, without deeper analysis or context. For example: Late to a meeting — irresponsible Put themselves first — selfish Lying on the couch on …
- **NEW**: Labeling is when we give ourselves or others a categorical, negative assessment based on a single event or action, without deep analysis or considering the context. <q author="W. Somerset Maugham">People love nothing more than to label another person, freeing …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is superior because it includes the Maugham quote present in the original and uses much more natural, idiomatic English. Translation B is an omission (missing the quote) and contains several clunky or slightly off-target phrases.
  - [old/omission/critical] The entire quote by W. Somerset Maugham is missing.
  - [old/style/minor] The list items lack the HTML tags present in the original, though this might be a formatting choice, it deviates from the source structure.
  - [old/style/minor] 'Put themselves first' is a bit of a stretch for 'Сделал что-то для себя' in this context, though acceptable; 'drawing conclusions from a single moment' is slightly less idiomatic than 'jumping to conclusions based on a single episode'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is much more complete, including the essential quote that was completely omitted in A. It also uses more idiomatic expressions like 'seeing the bigger picture' and 'jumping to conclusions'.
  - [old/omission/critical] The entire quote by W. Somerset Maugham is missing.
  - [old/style/minor] The list items lack the grammatical consistency/structure found in B (e.g., 'Put themselves first' vs 'Doing something for yourself').
  - [new/style/minor] The translation of 'наклеить ярлык' as 'to label' is correct, though 'to slap a label on' would be even more idiomatic, 'to label' is perfectly acceptable.

#### 🟡 en `/label/description`— вердикт неустойчив

- **RU**: Статья посвящена привычке навешивать ярлыки и объясняет, как упрощённое восприятие людей и себя мешает видеть реальную многогранность личности. Мы разберём, почему ярлыки ограничивают мышление, усиливают негативные эмоции и портят отношения, а также предложим …
- **OLD**: This article examines the habit of labeling and explains how oversimplifying people—including ourselves—keeps us from seeing a person’s real complexity. We explore why labels constrain thinking, intensify negative emotions, and damage relationships, and we off…
- **NEW**: This article explores the habit of labeling and explains how oversimplified perceptions of ourselves and others prevent us from seeing true complexity. We’ll examine why labels restrict our thinking, fuel negative emotions, and damage relationships, and offer …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 89)
  - Translation A is more sophisticated and idiomatic, using 'nuanced view' and 'complexity' in a way that flows naturally for a high-quality article. Translation B is grammatically correct but feels slightly more repetitive and less polished.
  - [new/style/minor] The phrasing 'oversimplified perceptions of ourselves and others' is a bit heavy/clunky compared to the more elegant 'oversimplifying people—including ourselves' in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is smoother, more professional, and follows the natural rhythm of an English-language article introduction. Translation B feels slightly fragmented due to the em dash construction and repetitive use of 'we'.
  - [old/style/minor] The phrase 'oversimplifying people—including ourselves' is a bit clunky compared to the more elegant 'oversimplified perceptions of ourselves and others' in A.
  - [old/style/minor] The repetition of 'we' in the second sentence ('We explore... and we offer') is slightly less sophisticated than the single subject structure in A.

#### 🟡 en `/lazy/screen_1/texts`— вердикт неустойчив

- **RU**: Во время депрессии начать что-то делать бывает особенно сложно. Кажется, что мотивация должна появиться первой, но она не приходит. Вы будто впадаете в «зимнюю спячку» и ждёте, что наступит день, когда всё станет легче само собой. Мысли вроде «ничего не принес…
- **OLD**: In depression, getting started can feel especially hard. It seems motivation should come first, but it rarely does. You slip into a kind of “winter hibernation,” waiting for a day when everything gets easier on its own. Thoughts like “Nothing will bring me ple…
- **NEW**: During depression, starting even simple tasks can feel incredibly difficult. It often feels like motivation should come first, but it just doesn’t arrive. You might feel as if you’ve entered a “winter hibernation,” waiting for a day when everything will simply…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is much more idiomatic and flows like a natural English article. It avoids the 'translationese' and wordiness present in B (e.g., 'it is important to understand' vs 'understand'). A also handles the emotional weight better with stronger, more concise verbs.
  - [new/style/minor] Too many filler phrases ('It often feels like', 'it is important to') which make the text feel heavy and academic rather than supportive.
  - [new/omission/minor] The quote from Fumio Sasaki was omitted entirely in version A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more polished and follows the 'expert friend' tone perfectly, using more natural phrasing like 'paralyze your ability to act' and 'overwhelming'. Translation B is good but feels slightly more clipped and loses some of the emotional nuance of the original.
  - [old/style/minor] The phrase 'the depression deepens' is a bit heavy-handed compared to the original 'состояние ухудшается' (condition worsens).
  - [old/style/minor] The sentence 'First, understand...' is a bit too imperative/dry compared to the supportive tone of the original.

#### 🟢 en `/label/title` — NEW лучше (2:0)

- **RU**: За рамками ярлыков: Искусство целостного восприятия мира
- **OLD**: Beyond Labels: The Art of Holistic Perception
- **NEW**: Beyond Labels: The Art of Seeing the Whole Picture
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B sounds much more natural and idiomatic for a title in a mental well-being context. Translation A uses 'Holistic Perception', which sounds overly academic and clinical (heavy 'translationese'), whereas 'Seeing the Whole Picture' captures the essence of the Russian 'целостного восприятия' in a way a native speaker would actually write.
  - [old/style/minor] Too academic/clinical; 'Holistic Perception' feels like a direct translation of a heavy Russian noun phrase rather than a natural English title.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is much more idiomatic and natural for a title; 'Seeing the Whole Picture' captures the essence of 'целостного восприятия' without sounding like an academic textbook. Translation B uses 'Holistic Perception', which is a heavy, clinical term that feels like a direct translation (calque) and lacks the poetic/artistic tone of the original.
  - [old/style/major] overly academic and clinical 'Holistic Perception' instead of a natural English expression

#### 🟢 en `/lazy/screen_4/texts` — NEW лучше (2:0)

- **RU**: Вот пример диалога с психологом о мотивации: <dialog psy="true">Раньше вы регулярно ходили в спортзал, а теперь тяги к этому нет?</dialog> <dialog>Да, я просто не хочу.</dialog> <dialog psy="true">А если представить, что вы пошли в зал без мотивации — просто п…
- **OLD**: Here’s an example of a conversation with a psychologist about motivation: You used to go to the gym regularly, and now you don’t feel drawn to it? Yes, I just don’t want to. What if you imagined going to the gym without motivation—simply because you decided to…
- **NEW**: Here is an example of a conversation with a psychologist about motivation: <dialog psy="true">You used to go to the gym regularly, but now you feel no drive to do so?</dialog> <dialog>Yes, I just don’t want to.</dialog> <dialog psy="true">What if you imagined …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is superior because it preserves the original XML-like tags (<dialog>), which are crucial for the technical structure of the content. It also maintains a more consistent and professional tone suitable for a mental health app.
  - [old/omission/major] The <dialog> tags were completely removed, which breaks the formatting/structure of the source.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation B is more idiomatic and better captures the professional yet warm tone of a CBT context. 'Action breeds motivation' is a much more natural English expression than 'Action generates motivation', and 'break out of the cycle' is more standard than 'exit the vicious circle'.
  - [old/style/minor] The dialogue tags (psy=true) were omitted, which might be important for technical implementation/parsing.
  - [old/style/minor] The phrasing 'exit the vicious circle' is slightly clunky compared to 'break out of the cycle'.
  - [new/omission/minor] The dialogue tags (psy=true) were preserved in the text but the user prompt implies they are part of the structure; however, B is superior in linguistic flow.

#### 🟡 en `/label/screen_2/texts`— вердикт неустойчив

- **RU**: Каждый человек — это сложная, изменчивая и живая система. Наше поведение зависит от возраста, настроения, обстоятельств, фазы жизни и сотен других факторов. <important>Попытка описать человека одним ярлыком — как попытка пересказать целый фильм одним кадром: п…
- **OLD**: Every person is a complex, dynamic, living system. Our behavior depends on age, mood, circumstances, life stage, and hundreds of other factors. Trying to describe a person with a single label is like retelling an entire film from a single frame: almost everyth…
- **NEW**: Every person is a complex, changing, and living system. Our behavior depends on age, mood, circumstances, life stages, and hundreds of other factors. <important>Trying to describe a person with a single label is like trying to retell an entire movie with just …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A is much more idiomatic and flows naturally, whereas B feels like a literal translation of the Russian structure. A's use of 'vivid' instead of 'human' and 'sours instantly' instead of 'automatically drops' makes it sound like it was written by a native speaker.
  - [new/style/major] The phrase 'Your mood automatically drops' is a clunky calque of 'Настроение портится автоматически'; a native would say 'sours' or 'worsens'.
  - [new/style/minor] The question 'What helps instead?' followed by a gerund phrase ('Noticing facts...') is grammatically weaker than A's imperative ('Notice facts...').
  - [new/style/minor] The translation of 'живым' as 'human' loses the nuance of 'vivid/alive' present in the original metaphor.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more natural and maintains a consistent 'we' perspective, which aligns better with the supportive tone of the original. Translation B suffers from inconsistent person shifts (switching from 'we' to 'you') and uses slightly less idiomatic phrasing in the key metaphors.
  - [old/style/minor] Inconsistent use of person: starts with 'we' but switches to 'you' (Labeling yourself, robs you), whereas the original uses 'we' throughout.
  - [old/style/minor] The phrase 'stays off-screen' is a bit literal for the movie metaphor; 'left out' in A is more idiomatic for the sense of missing information.
  - [old/style/minor] The transition 'What a jerk' is a bit more aggressive/slangy than the original 'какой хам' (how rude), though acceptable in context.

#### 🔴 en `/lazy/title` — OLD лучше (2:0)

- **RU**: Пробуждение воли: почему депрессия порождает апатию
- **OLD**: Awakening Your Will: Why Depression Breeds Apathy
- **NEW**: Awakening the Will: Why Depression Leads to Apathy
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more idiomatic and engaging for an article title. 'Breeds apathy' is a much stronger and more natural collocation than 'leads to apathy', and adding 'Your' makes the title more personal and compelling for the reader.
  - [new/style/minor] A bit dry and generic; 'leads to' is a weak verb for a headline.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses a more engaging, journalistic title style ('Awakening Your Will') which fits the 'expert friend' tone, whereas B is slightly more clinical and dry. 'Breeds' is also a more evocative and stylistically strong choice for a headline than 'leads to'.
  - [new/style/minor] The phrasing 'Awakening the Will' is a bit more abstract and less personal than 'Awakening Your Will', making it feel slightly more like a textbook than an engaging article.

#### 🟢 en `/lazy/screen_2/texts` — NEW лучше (2:0)

- **RU**: Бездействие — удивительный парадокс человеческой природы. <important>Вы наверняка замечали: одни люди стремятся жить активно, пробовать новое, двигаться вперёд. Другие — будто держат дистанцию от жизни, будто наблюдают со стороны.</important> Интересный факт: …
- **OLD**: Inaction is a curious paradox of human nature. You’ve likely noticed that some people strive to live actively, try new things, and move forward, while others keep their distance from life, as if watching from the sidelines. Here’s an interesting fact: if a per…
- **NEW**: Inactivity is a striking paradox of human nature. <important>You’ve likely noticed: some people strive to live actively, try new things, and move forward. Others seem to keep their distance from life, as if they are merely observing from the sidelines.</import…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation B is more idiomatic and better preserves the structure of the original, including the technical tags. It uses 'procrastination' instead of the literal 'postponing', which is much more natural in a psychological context.
  - [old/omission/major] The translation stripped all XML-style tags (<important>, <step>, etc.), which are crucial for the application's structure.
  - [old/style/minor] 'Postponing' is a bit weak compared to the psychological term 'procrastination'.
  - [new/style/minor] 'Inactivity' is slightly more formal than 'inaction', but fits the context well.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is much more idiomatic and follows the source structure perfectly, including the XML tags. Translation B loses the tags, uses 'inaction' which is slightly less natural than 'inactivity' in this context, and has several clunky phrasing issues.
  - [old/omission/major] Lost all <important> and <step> tags, which are critical for the UI/structure.
  - [old/style/minor] 'Inaction' is a bit more formal/stiff than 'inactivity' for this context; 'postponing' is a weak translation for 'откладывание' (procrastination is the standard term).
  - [old/style/minor] 'The thinking pattern' is less idiomatic than 'The thought pattern'.

#### 🟡 en `/label/test/question`— вердикт неустойчив

- **RU**: Какое из следующих утверждений наименее соответствует основной идее главы?
- **OLD**: Which of the following statements least aligns with the main idea of the chapter?
- **NEW**: Which of the following statements is least consistent with the main idea of this chapter?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A is more idiomatic and precise for a formal assessment context. 'Consistent with' is the standard academic collocation for testing comprehension of ideas.
  - [old/style/minor] While 'aligns with' is acceptable, it sounds slightly more like business jargon than a standard educational/psychological test question.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation A uses the more natural and idiomatic verb 'aligns with', which is standard for academic or testing contexts. Translation B is grammatically correct but feels slightly more heavy and formal due to the 'is consistent with' construction.

#### 🟡 en `/lawyer/screen_3/texts`— вердикт неустойчив

- **RU**: Эта техника помогает потому, что многим проще защищать другого, чем себя. Но в данном случае вы учитесь становиться союзником самому себе. <important>В роли адвоката вы проверяете факты, требуете доказательств и не позволяете необоснованной критике звучать как…
- **OLD**: This technique works because many people find it easier to defend someone else than themselves. Here, you learn to become your own ally. As the defense, you check facts, demand evidence, and don’t let baseless criticism pass as truth. When negative thoughts ar…
- **NEW**: This technique works because many people find it easier to defend others than themselves. In this case, you are learning to become an ally to yourself. <important>As an advocate, you examine the facts, demand evidence, and refuse to let unfounded criticism sou…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is more natural, maintains the correct tone, and follows the original structure perfectly. Translation B makes several stylistic and terminological errors, such as using 'As the defense' (which sounds like a legal entity rather than a person/role) and losing the list tags.
  - [old/style/major] Using 'As the defense' is unnatural; it should be 'As an advocate' or 'In the role of a defense attorney' to refer to the person's role.
  - [old/omission/minor] The <li> tags were removed, which breaks the intended structure/format.
  - [old/style/minor] 'Is this emotion talking?' is a bit too idiomatic/informal compared to the original 'is this emotion?'
  - [old/style/minor] 'What is the charge?' is slightly more legalistic/heavy than 'What is the accusation?' in a psychological context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A sounds much more natural and idiomatic for a native speaker. It avoids the clunky 'ally to yourself' and 'sound like the truth' constructions found in B, opting for smoother phrasing like 'your own ally' and 'pass as truth'.
  - [new/style/minor] The phrase 'ally to yourself' is a bit heavy compared to 'your own ally'.
  - [new/style/minor] 'Sound like the truth' is a bit literal; 'pass as truth' (in A) is more idiomatic for this context.
  - [new/style/minor] The passive construction 'What am I being “accused” of by my thoughts?' is much weaker and less natural than A's active approach.

