# QA: слепое парное сравнение переводов — en-final-g23-quotes

- **Дата**: 2026-09-18T20:39:20.243Z
- **Метка**: en-final-g23-quotes
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: homeBot/quotes.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## homeBot/quotes.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 6 | 🔴 6 | ⚪ 0 | 🟡 8 | 0 / 0 | 50% |
| **итого** | 20 | 🟢 6 | 🔴 6 | ⚪ 0 | 🟡 8 | 0 / 0 | 50% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×8, addition/minor×1; OLD — style/minor×7, style/major×1, addition/minor×1

### Детали пар (для спот-чека)

#### 🔴 en `/35/text` — OLD лучше (2:0)

- **RU**: Иногда самое здоровое, что ты можешь сделать, это позволить себе чувствовать.
- **OLD**: Sometimes the healthiest thing you can do is simply allow yourself to feel.
- **NEW**: Sometimes the healthiest thing you can do is allow yourself to feel.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation B captures the subtle nuance of 'самое здоровое, что ты можешь сделать' by adding 'simply', which makes the sentence sound more natural, empathetic, and idiomatic in English for this context.
  - [new/style/minor] A bit too literal; lacks the gentle, supportive flow that 'simply' provides in this specific sentiment.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Both translations are grammatically correct and accurate, but Translation A is slightly better because the addition of 'simply' captures the gentle, supportive nuance of the original Russian 'это позволить себе', making it sound more idiomatic and natural for a mental health context.

#### 🟢 en `/56/text` — NEW лучше (2:0)

- **RU**: Самое трудное — это решение действовать, остальное лишь настойчивость.
- **OLD**: The most difficult thing is the decision to act, the rest is merely tenacity.
- **NEW**: The hardest part is the decision to act; everything else is just persistence.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B sounds more natural and idiomatic for a motivational context. 'The hardest part' is a more common way to express 'самое трудное' than 'the most difficult thing', and 'persistence' fits the context of continuing an action better than 'tenacity', which can sound slightly more aggressive or stubborn.
  - [old/style/minor] 'The most difficult thing' is grammatically correct but slightly more heavy/clunky than 'The hardest part'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and flows better for a motivational context. 'The hardest part' is a more natural way to express 'самое трудное' than the slightly more formal 'The most difficult thing'.
  - [old/style/minor] The use of 'merely tenacity' feels a bit stiff and overly formal compared to the punchy, natural 'just persistence' in A.

#### 🔴 en `/33/text` — OLD лучше (2:0)

- **RU**: Не бойтесь показать свою уязвимость. Быть честным по отношению к своему состоянию может принести вам необходимую поддержку.
- **OLD**: Don’t be afraid to show your vulnerability. Being honest about how you’re really doing can bring you the support you need.
- **NEW**: Don’t be afraid to show your vulnerability. Being honest about your state can bring you the support you need.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 85)
  - Translation B sounds much more natural and empathetic to a native speaker. Translation A uses 'your state', which sounds like a medical or clinical condition (a common Russian-to-English calque), whereas 'how you're really doing' captures the emotional essence of the original in a warm, supportive way.
  - [new/style/minor] 'your state' is a bit stiff and sounds like a direct translation of 'своё состояние'; in a mental health context, 'how you feel' or 'how you're doing' is more idiomatic.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 82)
  - Translation A uses a natural, idiomatic expression 'how you’re really doing' to convey the sense of one's state, whereas Translation B uses 'your state', which sounds like a clinical or medical translation (a common Russian-to-English pitfall).
  - [new/style/minor] 'your state' is a literal translation of 'свое состояние' and sounds unnatural/stilted in a supportive mental health context.

#### 🟡 en `/40/text`— вердикт неустойчив

- **RU**: Определите свою жизнь не тем, что вам не удалось, а тем, что еще можете достичь.
- **OLD**: Define your life not by what you failed to do, but by what you can still achieve.
- **NEW**: Define your life not by what you haven’t achieved, but by what you can still accomplish.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more punchy and idiomatic for an inspirational quote. The contrast between 'failed to do' and 'achieve' creates a stronger rhetorical rhythm than the repetitive 'achieved/accomplish' in B.
  - [new/style/minor] The use of 'achieved' and 'accomplish' in the same sentence is slightly redundant and lacks the sharp emotional contrast found in the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more elegant and uses a more sophisticated parallel structure ('achieved' vs 'accomplish'), which sounds more natural for an inspirational quote. Translation B's 'failed to do' sounds slightly clunky and overly blunt in English.
  - [old/style/minor] The phrase 'failed to do' is a bit heavy and less idiomatic for this type of motivational sentiment compared to 'haven't achieved'.

#### 🟢 en `/32/text` — NEW лучше (2:0)

- **RU**: В каждой ночи есть ярче звезда.
- **OLD**: In every night there is a star that shines more brightly.
- **NEW**: In every night, there is a brighter star.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 70 / NEW 85)
  - Translation A is much more concise and poetic, capturing the essence of the original metaphor. Translation B is overly wordy and sounds like a clunky literal explanation rather than a literary phrase.
  - [old/style/major] The phrase 'a star that shines more brightly' is heavy and lacks the rhythmic elegance of the original; it feels like a translation rather than a natural English expression.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is more poetic, concise, and natural, capturing the essence of the metaphor. Translation A is wordy and sounds like a literal translation of a clunky Russian sentence structure.
  - [old/style/minor] Overly wordy and follows the Russian syntax too closely ('there is a star that shines...'), which lacks the lyrical quality of the original.

#### 🟡 en `/54/text`— вердикт неустойчив

- **RU**: Настоящий оптимизм — это не радость, а сила. И эта сила помогает взглянуть на лицо реальности с открытыми глазами.
- **OLD**: Real optimism is not cheerfulness but strength – the power to face reality with your eyes wide open.
- **NEW**: True optimism is not joy, but strength. And that strength helps you face reality with your eyes wide open.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is a more faithful and natural rendering of the original structure. Translation B introduces an unnecessary dash and changes the rhythm, making it feel slightly more like a summary than a direct quote.
  - [old/style/minor] The use of a dash to combine the two sentences changes the original's punchy, rhythmic structure and creates a slightly different emphasis.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is much more idiomatic and sophisticated, using a dash to connect the ideas into a single, powerful thought, whereas B is repetitive and sounds like a literal translation of the Russian sentence structure.
  - [new/style/major] Repetitive use of 'strength' and 'And that strength' creates a clunky, 'translated' rhythm instead of a natural English flow.
  - [new/terminology/minor] Using 'joy' for 'радость' in this philosophical context is acceptable, but 'cheerfulness' in A captures the nuance of a fleeting emotion better vs. the state of optimism.

#### 🟡 en `/19/text`— вердикт неустойчив

- **RU**: Депрессия — это такое состояние, когда ты не контролируешь свою жизнь. Найдите что-то, что вернет вас к жизни. Независимо от того, как мало это может показаться.
- **OLD**: Depression is a state in which you no longer feel in charge of your own life. Find something that brings you back to living, no matter how small it may seem.
- **NEW**: Depression is a state where you feel you’re not in control of your life. Find something that brings you back to life, no matter how small it may seem.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A uses a more sophisticated and natural phrasing ('feel in charge of your own life') that avoids the clunky 'state where' construction. It also correctly interprets 'вернет вас к жизни' as 'brings you back to living' (a process), whereas B's 'back to life' sounds slightly more like a cliché or a literal resurrection.
  - [new/style/minor] The use of 'state where' is common in speech but less elegant than 'state in which' for a narrative text; 'back to life' is a bit more literal/cliché than the intended meaning.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more natural and idiomatic. 'Brings you back to life' is a standard English expression, whereas 'brings you back to living' sounds awkward and non-native.
  - [old/style/major] The phrase 'brings you back to living' is an unnatural collocation; 'brings you back to life' is the correct idiom.

#### 🔴 en `/47/text` — OLD лучше (2:0)

- **RU**: Истинная смелость — это знать, что ты завтра проснешься, когда весь мир рухнул сегодня.
- **OLD**: True courage is knowing you will wake up tomorrow even when it feels like your whole world collapsed today.
- **NEW**: True courage is knowing that you will wake up tomorrow, even when the whole world fell apart today.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more idiomatic and emotionally resonant for a mental health context. The addition of 'it feels like' captures the subjective experience of the original better than the literal 'the whole world fell apart' in A.
  - [new/style/minor] The phrase 'the whole world fell apart' is a bit heavy and literal; 'it feels like your whole world collapsed' in B sounds more natural and empathetic for this genre.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and emotionally resonant for a mental health context. The addition of 'it feels like' captures the subjective psychological experience intended by the original, whereas B is a bit too literal and heavy.
  - [new/style/minor] The phrase 'the whole world fell apart' is grammatically correct but sounds slightly more like a literal event than a personal feeling compared to A's 'it feels like your whole world collapsed'.

#### 🔴 en `/50/text` — OLD лучше (2:0)

- **RU**: Успех — это способность переходить от одного неудачного опыта к другому без потери энтузиазма.
- **OLD**: Success is the ability to go from one failure to another without losing enthusiasm.
- **NEW**: Success is the ability to go from one failure to another without loss of enthusiasm.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses the more natural, dynamic gerund 'losing', which fits the 'warm, expert friend' tone better than the heavier, more formal noun 'loss of' used in B.
  - [new/style/minor] The phrase 'without loss of enthusiasm' sounds slightly more academic/stiff compared to the more idiomatic 'without losing enthusiasm'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 88)
  - Translation B uses a more natural gerund construction ('without losing'), whereas Translation A uses a slightly more formal and heavy noun phrase ('without loss of'), which sounds more like a literal translation of the Russian structure.
  - [new/style/minor] The noun phrase 'without loss of enthusiasm' is grammatically correct but feels slightly more stiff and less idiomatic than the gerund form in this context.

#### 🟡 en `/6/text`— вердикт неустойчив

- **RU**: Один маленький позитивный разум утром может изменить весь твой день.
- **OLD**: Just one small positive thought in the morning can change your whole day.
- **NEW**: One small positive thought in the morning can change your entire day.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Both translations are excellent, but B is slightly more elegant and avoids the unnecessary 'Just' added in A. 'Entire day' sounds more natural and polished than 'whole day' in this inspirational context.
  - [old/addition/minor] Added 'Just' which wasn't in the original, though it fits the tone.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation B captures the nuance of 'Один...' as 'Just one...', which adds the intended emphasis and warmth. It sounds more natural and idiomatic for a motivational context.
  - [new/style/minor] Lacks the emphatic 'just' which is implied by the Russian structure in this motivational context.

#### 🟢 en `/46/text` — NEW лучше (2:0)

- **RU**: Не бойтесь идти медленно, бойтесь стоять на месте.
- **OLD**: Do not be afraid of going slowly; be afraid only of standing still.
- **NEW**: Don’t be afraid to go slowly; be afraid only of standing still.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A uses the contraction 'Don’t', which aligns perfectly with the app's warm, supportive, and conversational tone. Translation B is overly formal ('Do not'), making it sound stiff and academic.
  - [old/style/minor] Too formal for a supportive 'expert friend' tone; lacks the natural flow of spoken English.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B uses the more natural 'afraid to [verb]' construction and the contraction 'Don't', which aligns with the warm, supportive tone of the app. Translation A is grammatically correct but sounds overly formal and stiff due to 'Do not' and 'afraid of [gerund]'.
  - [old/style/minor] Too formal/stiff for a supportive app context; 'Do not' and 'afraid of going' are less idiomatic here than 'Don't be afraid to go'.

#### 🟡 en `/16/text`— вердикт неустойчив

- **RU**: Надежда – это та вещь с перьями, которая оседает в душе и поет мелодию без слов, и никогда не перестает вовсе.
- **OLD**: Hope is the thing with feathers that settles in the soul and sings a wordless melody, and never stops at all.
- **NEW**: Hope is the thing with feathers that settles in the soul and sings a wordless melody, and never truly stops.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A is a near-perfect rendering of the poetic rhythm and the specific nuance of the original. Translation B introduces 'truly', which adds an unnecessary layer of emphasis not present in the source.
  - [new/addition/minor] The word 'truly' is an addition that changes the rhythm and slightly alters the tone from the original 'никогда не перестает вовсе'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A captures the poetic rhythm and the nuance of 'never stops altogether' much more gracefully. Translation B's use of 'at all' feels slightly more colloquial and less lyrical, which clashes with the Emily Dickinson-inspired imagery.
  - [old/style/minor] The phrase 'never stops at all' is grammatically correct but lacks the poetic weight and elegance of the original compared to 'never truly stops'.

#### 🔴 en `/22/text` — OLD лучше (2:0)

- **RU**: То, что ты сейчас чувствуешь, не определит тебя навсегда.
- **OLD**: What you’re feeling right now will not define you forever.
- **NEW**: What you are feeling right now will not define you forever.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - Translation B follows the project's Tone of Voice guidelines by using contractions ('you’re'), making the text sound more like a 'supportive friend' and less formal/stiff than Translation A.
  - [new/style/minor] Lack of contraction 'you're' makes the tone slightly more formal/academic than the desired warm, supportive tone.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 95)
  - Translation A follows the project's tone of voice guidelines by using contractions ('you’re'), which makes the text sound more like a 'supportive friend' and less formal. Translation B is grammatically correct but slightly more stiff for a mental health app context.

#### 🟡 en `/9/text`— вердикт неустойчив

- **RU**: Не суди каждый день по урожаю, который ты собрал, но по семенам, которые ты посадил.
- **OLD**: Don’t judge each day by the harvest you reap but by the seeds that you plant.
- **NEW**: Don’t judge each day by the harvest you reap, but by the seeds that you plant.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 98 / NEW 100)
  - Both translations are excellent and idiomatic, but Translation A correctly uses a comma to separate the contrasting clauses, which improves readability and rhythm in this proverbial structure.
  - [old/style/minor] Missing comma before 'but' to separate the contrasting parts of the sentence, making it slightly less rhythmic.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 95)
  - Both translations are excellent and idiomatic. Translation A is slightly better as it avoids the unnecessary comma before 'but', which is more common in modern, fluid English for this specific sentence structure.
  - [new/style/minor] The comma before 'but' creates a slight, unnecessary pause in such a short, rhythmic aphorism.

#### 🟡 en `/4/text`— вердикт неустойчив

- **RU**: Надежда — это та вещь с перьями, что сидит в душе и поет мелодию без слов, и никогда не перестает в это верить.
- **OLD**: Hope is the thing with feathers that perches in the soul and sings a tune without the words, and never stops at all.
- **NEW**: Hope is the thing with feathers that perches in the soul and sings the tune without words, and never stops at all.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is a near-perfect realization of Emily Dickinson's famous poem, which the Russian original is quoting. Translation B introduces unnecessary articles ('the words') that break the poetic rhythm and deviate from the canonical English source.
  - [old/style/minor] The use of 'the words' instead of 'words' sounds unnatural in this poetic context and deviates from the original poem's phrasing.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A is a near-perfect realization of Emily Dickinson's original poem, which the Russian text is quoting. Translation B introduces unnecessary articles ('the tune', 'the words') that break the rhythmic flow and deviate from the canonical English source.
  - [new/style/minor] The use of 'the tune' and 'the words' makes the phrasing less poetic and deviates from the iconic Dickinson meter/structure.

#### 🔴 en `/10/text` — OLD лучше (2:0)

- **RU**: Напоминай себе, что это не знак слабости. Болезнь, которая требует лечения, как и любая другая.
- **OLD**: Remind yourself that this is not a sign of weakness. It’s an illness that needs treatment, just like any other.
- **NEW**: Remind yourself that this is not a sign of weakness. It is an illness that requires treatment, just like any other.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B follows the project's tone of voice guidelines by using the contraction 'It’s', making the text sound more like a 'supportive friend' and less formal/stiff than Translation A.
  - [new/style/minor] Uses 'It is' instead of the more natural and conversational 'It’s' recommended for this tone of voice.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A uses the contraction 'It’s', which perfectly aligns with the 'warm, supportive friend' tone and the project's requirement to use contractions for a natural feel. Translation B is grammatically correct but feels slightly more formal/stiff due to 'It is' and 'requires'.

#### 🟢 en `/5/text` — NEW лучше (2:0)

- **RU**: Лучшее средство поднять настроение — попытаться поднять настроение кому-то другому.
- **OLD**: The best way to cheer yourself up is to try to cheer somebody else up.
- **NEW**: The best way to lift your mood is to try to lift someone else’s.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B is more elegant, concise, and uses a more natural idiomatic structure ('lift someone else's') compared to the repetitive 'cheer up' in A. Translation B also aligns better with the project's terminology ('mood').
  - [old/style/minor] Repetitive use of 'cheer up' makes the sentence feel slightly clunky compared to the more sophisticated elliptical construction in B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more elegant and avoids the repetitive 'cheer up' structure of B, sounding more like a natural English aphorism. It also adheres better to the 'mood' terminology used in the project.
  - [old/style/minor] The repetition of 'cheer up' makes the sentence feel slightly clunky compared to the more sophisticated 'lift your mood... lift someone else's'.

#### 🟢 en `/12/text` — NEW лучше (2:0)

- **RU**: То, что мы видим, зависит главным образом от того, что мы ищем.
- **OLD**: What we see depends mainly on what we are looking for.
- **NEW**: What we see depends largely on what we are looking for.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 98)
  - Both translations are grammatically perfect and accurate, but 'largely' sounds slightly more idiomatic and sophisticated in this philosophical/psychological context than 'mainly'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Both translations are grammatically correct and natural, but 'largely' is a more sophisticated and idiomatic choice for this philosophical/psychological context than 'mainly'.

#### 🟡 en `/28/author`— вердикт неустойчив

- **RU**: Мартин Лютер Кинг
- **OLD**: Martin Luther King Jr.
- **NEW**: Martin Luther King, Jr.
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both versions are correct representations of the name. The difference is purely a matter of stylistic preference regarding the comma before 'Jr.', which is acceptable in both US English styles.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 95)
  - In modern US English, the comma before 'Jr.' is considered outdated and is typically omitted in standard journalistic and formal styles.
  - [new/style/minor] unnecessary comma before Jr.

#### 🟢 en `/3/text` — NEW лучше (2:0)

- **RU**: Даже из ночи, которая кажется всему миру бесконечной, ведет путь к яркому утру.
- **OLD**: Even from a night that seems endless to the whole world, there is a path that leads into a bright morning.
- **NEW**: Even from a night that seems endless to the whole world, a path leads to a bright morning.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B is more concise and follows the natural rhythm of English poetic prose, whereas Translation A uses a heavy 'there is' construction which feels like a clunky translation of the Russian structure.
  - [old/style/minor] The 'there is a path that leads' construction is wordy and less impactful than the direct action in B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more concise and poetic, maintaining the rhythmic flow of the original metaphor. Translation B is grammatically correct but uses a heavy 'there is' construction, which makes it sound more like a literal explanation than a literary statement.
  - [old/style/minor] The 'there is a path that leads' construction is wordy and lacks the elegance of the original metaphor.

