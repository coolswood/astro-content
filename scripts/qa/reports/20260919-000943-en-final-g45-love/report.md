# QA: слепое парное сравнение переводов — en-final-g45-love

- **Дата**: 2026-09-18T21:09:43.710Z
- **Метка**: en-final-g45-love
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/distortions/love.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/love.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 9 | 🟢 7 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |
| **итого** | 9 | 🟢 7 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×2; OLD — style/minor×16, style/major×4, terminology/minor×2, terminology/major×1, omission/minor×1

### Детали пар (для спот-чека)

#### 🟢 en `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Отношения и любовь могут принести немало радости и счастья в жизнь, но они не являются единственным путем. Счастье — это сложный и многогранный процесс, и каждый имеет право выбирать свои собственные методы и пути для его достижения. Поэтому, если в данный мом…
- **OLD**: Relationships and love can bring a lot of joy and happiness into life, but they are not the only way. Happiness is a complex and multifaceted process, and everyone has the right to choose their own methods and ways to achieve it. Therefore, if your life does n…
- **NEW**: Relationships and love can bring immense joy and happiness to your life, but they aren’t the only way. Happiness is a complex and multifaceted process, and everyone has the right to choose their own path to achieve it. So, if your life doesn’t include a romant…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is much more natural and follows the 'understanding expert friend' tone. It uses appropriate contractions (aren't, doesn't, you're) and avoids the clunky, literal phrasing found in A (e.g., 'does not make it incomplete' vs 'doesn't make it any less meaningful'). B also handles the 'pigeons/cats' imagery and the Thoreau quote with much better rhythm and idiomatic flow.
  - [old/style/major] Too formal and literal; lacks the warm, supportive tone required (uses 'does not' instead of 'doesn't').
  - [old/style/minor] Phrasing like 'social status does not always justify itself' is a heavy calque from Russian.
  - [old/style/minor] The transition 'And it seems like...' is a bit weak for a narrative flow.
  - [new/style/minor] The phrase 'social status doesn't always deliver' is slightly idiomatic/informal, but fits the target tone better than A's version.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A sounds like a natural, high-quality English article written by a native speaker. It uses appropriate contractions (aren't, don't, you're) and idiomatic phrasing ('doesn't make it any less meaningful', 'social status doesn't always deliver'). Translation B is too literal, uses heavy/clunky phrasing ('not the only way', 'does not make it incomplete', 'justify itself'), and lacks the warm, supportive tone required.
  - [old/style/major] Too literal and formal; lacks the 'understanding friend' tone. Uses 'incomplete' for 'неполноценной', which sounds overly harsh/clinical in English compared to 'less meaningful'.
  - [old/style/minor] Phrasing like 'social status does not always justify itself' is a clunky calque of 'оправдывает себя'.
  - [old/style/minor] Avoids contractions, making the text feel stiff and academic rather than engaging.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Любовь — это великолепное чувство, воспетое поэтами, художниками и музыкантами. Она окрыляет, вдохновляет и дарит ощущение полноты жизни. Естественно, каждый из нас стремится к тому, чтобы любить и быть любимым. Однако, если ваше представление о любви сводится…
- **OLD**: Love is a powerful feeling celebrated by poets, artists, and musicians. It lifts us up, inspires us, and gives life a sense of fullness. Naturally, each of us wants to love and be loved. However, if your idea of love boils down to the belief, “I cannot be trul…
- **NEW**: Love is a magnificent feeling, celebrated by poets, artists, and musicians. It inspires us, lifts our spirits, and gives us a sense of fulfillment. It is only natural for each of us to want to love and be loved. However, if your idea of love is based on the be…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is much more professional and adheres to the CBT-oriented tone. It correctly uses 'dependency' instead of 'addiction' (which is too strong/clinical for this context) and uses 'unhelpful state' which aligns with the project's guidelines for soft, non-judgmental language. Translation B uses 'addiction' and 'destructive', which feels more aggressive and less like a 'supportive expert'.
  - [old/terminology/major] Used 'addiction' for 'зависимость' in a psychological context where 'dependency' is more appropriate and less stigmatizing; 'love addiction' is a specific term, but the text describes dependency.
  - [old/style/minor] The phrase 'sense of being fundamentally flawed' is a bit heavy compared to the more natural 'sense of inadequacy'.
  - [old/omission/minor] The Instagram IDs were changed, which is a technical error (omission/addition of different IDs).
  - [old/style/minor] The translation of 'такая требовательность' as 'this level of demand and emotional intensity' is a bit wordy compared to the concise 'this level of neediness'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation B is more idiomatic and adheres better to the project's specific CBT terminology (using 'unhelpful' instead of 'destructive' and 'inadequacy' for 'неполноценность'). It also captures the tone of a 'supportive expert' more naturally.
  - [old/terminology/minor] Used 'addiction' instead of 'dependency' for the concept of 'зависимость', which is acceptable but 'dependency' is more precise in this psychological context. Also used 'destructive' where 'unhelpful' is the project standard.
  - [old/style/minor] The phrase 'You suffer because you are not in a relationship' is a bit clunky compared to B's 'perceived lack of love'.
  - [new/style/minor] The translation of 'такая требовательность' as 'this level of neediness' is a slight shift in nuance, but it sounds much more natural in English than A's 'level of demand'.

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: В процессе анализа своих убеждений Виктория выписала недостатки и преимущества своего мышления. Недостатки звучали так: <li>Убеждение вгоняет меня в уныние, потому что я одна.</li> <li>Я теряю желание что-либо делать, изучать мир или заниматься хобби.</li> <li…
- **OLD**: While examining her beliefs, Victoria wrote down the drawbacks and perceived benefits of her way of thinking. The drawbacks sounded like this: <li>This belief plunges me into despair because I am alone.</li> <li>I lose the desire to do anything, to explore the…
- **NEW**: While analyzing her beliefs, Victoria wrote down the downsides and benefits of her way of thinking. The downsides were: <li>This belief makes me feel despondent because I am alone.</li> <li>I lose the desire to do anything, explore the world, or pursue hobbies…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more idiomatic and flows better as a narrative. Translation B uses slightly more clunky phrasing ('drawbacks sounded like this', 'plunges me into despair') and makes a terminology error by using 'Love addiction' instead of the more accurate 'Love dependency' (or 'codependency') in this context, though 'dependency' is the safer, more neutral choice for CBT.
  - [old/style/minor] The phrase 'The drawbacks sounded like this' is a bit literal/clunky compared to 'The downsides were'.
  - [old/terminology/minor] Used 'Love addiction' which is a specific clinical term, whereas 'Love dependency' (A) or 'codependency' is more aligned with the text's focus on attachment/beliefs.
  - [old/style/minor] The sentence 'You are ready to do anything for this' feels slightly disconnected compared to A's smoother integration.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and flows better as a narrative piece. It uses more natural phrasing (e.g., 'plunges me into despair', 'longs for', 'handing responsibility') compared to the slightly more clinical or clunky constructions in B.
  - [new/style/minor] The phrase 'Love dependency' is less common in this context than 'Love addiction' (used in A).
  - [new/style/minor] The sentence 'By expressing a need for another person to achieve your own happiness' is a bit heavy/wordy compared to A's smoother version.

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Очень важно научиться регулировать собственное настроение и находить счастье в самом себе. Это даст вам возможность почувствовать себя в равной степени живым и когда вы один, и когда вы вместе с любимым человеком. Но вы можете подумать: «Звучит конечно хорошо,…
- **OLD**: It is crucial to learn how to regulate your own mood and to find happiness within yourself. This allows you to feel equally alive both when you are on your own and when you are with someone you love. You may think, “This all sounds nice, but it is not realisti…
- **NEW**: It’s incredibly important to learn how to regulate your mood and find happiness within yourself. This will allow you to feel just as alive when you’re alone as when you’re with a loved one. But you might think, “That sounds great, but it doesn’t feel realistic…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is much more natural and aligns perfectly with the 'understanding friend' tone. It uses appropriate contractions (It's, don't) and idiomatic phrasing. Translation B feels slightly more formal/stiff and contains a few minor stylistic clunkiness issues.
  - [old/style/minor] Avoids contractions (It is, You may, You do not), making it sound more like a textbook than a supportive friend.
  - [old/style/minor] The phrase 'treat yourself with kindness and care' is an addition not present in the original 'чем вы можете порадовать себя'.
  - [old/style/minor] The translation of the Wilde quote is grammatically correct but 'Self-love is...' is more idiomatic for a modern reader than the infinitive version.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B sounds much more natural and follows the 'warm, expert friend' tone guidelines. It uses appropriate contractions (It's, don't, you're) and avoids the slightly stiff, formal phrasing found in A (e.g., 'It is crucial', 'This allows you'). B also handles the rhythm of the sentences better for a modern reader.
  - [old/style/minor] Too formal/stiff for a mental health app (e.g., 'It is crucial', 'You do not need').
  - [old/style/minor] The translation of the Oscar Wilde quote is a bit more literal/wordy than the idiomatic 'Self-love' version in B.
  - [new/style/minor] The phrase 'What can you do to treat yourself?' is slightly less poetic than the Russian 'Чем вы можете порадовать себя?', but it fits the UX tone better.

#### 🟢 en `/exercise/screen_3/texts` — NEW лучше (2:0)

- **RU**: <h2>Корректировка убеждений</h2> Любовь, отношения и брак не являются необходимым условием счастья и повышения самооценки, иногда их попросту недостаточно. Доказательство тому — миллионы мужчин и женщин, которые состоят в браке и при этом несчастны. Если бы лю…
- **OLD**: <h2>Adjusting Beliefs</h2> Love, relationships, and marriage are not necessary conditions for happiness and self-esteem; sometimes they are simply not enough. Evidence of this is millions of men and women who are married and yet unhappy. If love were a cure fo…
- **NEW**: <h2>Reframing Beliefs</h2> Love, relationships, and marriage aren’t prerequisites for happiness or self-esteem; sometimes, they simply aren’t enough. The proof is in the millions of people who are married yet remain unhappy. If love were a cure for loneliness,…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more idiomatic and follows the 'expert friend' tone perfectly. It uses natural phrasing (e.g., 'Reframing Beliefs' instead of the clunky 'Adjusting Beliefs', 'out of a job' instead of 'out of work') and handles the transition between personal and general perspectives more smoothly. Translation B feels like a direct translation from Russian, especially in its sentence structures and word choices.
  - [old/style/major] The title 'Adjusting Beliefs' is a weak translation of 'Корректировка'; in a CBT context, 'Reframing' is the standard and much more natural term.
  - [old/style/minor] Phrases like 'Evidence of this is millions of men and women' and 'Love is not a need for an adult' sound unnatural and 'translated'.
  - [old/style/minor] Uses 'unsuitable partner' which is a bit formal/stiff compared to the more natural 'wrong partner'.
  - [old/style/minor] The flow of the list items is slightly more interrupted by heavy punctuation and clunky phrasing compared to A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B is much more idiomatic and follows the project's tone guidelines. It uses natural contractions (aren't, isn't, don't) and avoids the stiff, slightly 'translated' feel of A. Crucially, B uses the approved term 'unhelpful thinking patterns' instead of A's 'negative thinking patterns'.
  - [old/style/minor] Too formal/stiff; lacks contractions which are preferred for the 'understanding friend' tone.
  - [old/terminology/major] Used 'negative thinking patterns' instead of the required 'unhelpful thinking patterns'.
  - [old/style/minor] The phrasing 'And this must be realized and accepted' is a bit passive and heavy compared to B's more natural flow.

#### 🟢 en `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Лист предполагаемого удовольствия</h2> Счастье можно находить каждый день в малых радостях, в собственном развитии, в дружбе и множестве других аспектов жизни. Но скорее всего, вы так не думаете и уверены, что не можете быть счастливым без другого человека…
- **OLD**: <h2>List of Expected Pleasure</h2> Happiness can be found every day in small joys, personal development, friendships, and many other aspects of life. But most likely, you don’t think so and are convinced that you cannot be happy without another person. To test…
- **NEW**: <h2>The Anticipated Pleasure Sheet</h2> Happiness can be found every day in small joys, in personal growth, in friendship, and in many other aspects of life. But you likely don’t think this way, and you might be convinced that you can’t be happy without anothe…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A is much more idiomatic and follows the UX guidelines perfectly. Translation B contains several 'translationese' errors, such as using 'I' instead of 'Me' for a label, and awkward phrasing like 'test this belief for reality'.
  - [old/style/major] In the third column instruction, 'write: "I"' is grammatically incorrect for a label; it should be 'Me'.
  - [old/style/major] 'test this belief for reality' is a calque; 'test this belief against reality' is the correct English idiom.
  - [old/style/minor] The title 'List of Expected Pleasure' is less natural than 'Anticipated Pleasure Sheet' in a psychological context.
  - [old/style/minor] Uses 'degree of pleasure' which is slightly more formal/stiff than 'level of pleasure'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 84 / NEW 94)
  - Translation B is much more natural and idiomatic. Translation A uses 'List of Expected Pleasure', which sounds like a literal translation of a title, whereas 'Anticipated Pleasure Sheet' sounds like a real psychological tool. B also correctly translates the instruction 'напишите: «Я»' as 'write: “Me”' (which is how one would actually fill out a form), whereas A's 'write: “I”' is grammatically awkward in that context. B's use of contractions (you'll, you've) and smoother phrasing makes it feel like it was written by a native speaker.
  - [old/style/major] The title 'List of Expected Pleasure' is clunky; 'Sheet' is better for a worksheet. 'Write: I' is unidiomatic for a form entry.
  - [old/style/minor] Lacks contractions (you will, you have), making the tone slightly more formal/stiff than the target 'understanding friend' tone.
  - [new/style/minor] The phrase 'test this belief against reality' is slightly more idiomatic than A's 'test this belief for reality'.

#### 🟡 en `/description`— вердикт неустойчив

- **RU**: Любовь, воспетая поэтами и художниками, окрыляет и дарит ощущение полноты жизни. Однако превращение любви в патологическую потребность разрушает личность и мешает строить здоровые отношения, особенно у людей с низкой самооценкой. Настоящее счастье и полноценно…
- **OLD**: Love, celebrated by poets and artists, can lift us up and give life a sense of fullness. But when love turns into a compulsive need, it erodes our sense of self and makes it hard to build healthy relationships, especially for people with low self-esteem. Lasti…
- **NEW**: Love, celebrated by poets and artists, inspires us and gives us a sense of fulfillment. However, when love turns into a pathological need, it can erode your sense of self and make it difficult to build healthy relationships—especially if you struggle with low …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more cohesive and maintains a consistent 'we' perspective, which feels warmer and more inclusive. Translation B suffers from a sudden shift from 'us' to 'your', which is jarring for a reader.
  - [new/style/minor] Inconsistent person: starts with 'us' and shifts to 'your', creating a lack of narrative flow.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more idiomatic and flows better for a modern English reader. It uses 'fulfillment' and 'sense of self' naturally, whereas B feels slightly more literal and heavy in its phrasing.
  - [old/style/minor] The phrase 'give life a sense of fullness' is a bit clunky compared to 'sense of fulfillment'.
  - [old/style/minor] The transition 'But when...' is slightly less sophisticated than 'However, when...' in this narrative context.

#### 🟢 en `/exercise/description` — NEW лучше (2:0)

- **RU**: Статья посвящена исследованию счастья и убеждений, связанных с любовью и отношениями. В ней объясняется, что счастье можно достигать разными способами, и предлагаются техники для изменения негативных убеждений, связанных с одиночеством. Статья учит видеть радо…
- **OLD**: This article explores happiness and beliefs related to love and relationships. It explains that happiness can be achieved in various ways and offers techniques to change negative beliefs associated with loneliness. The article teaches how to find joy in everyd…
- **NEW**: This article explores happiness and the beliefs associated with love and relationships. It explains that happiness can be achieved in many ways and offers techniques to change unhelpful beliefs related to loneliness. The article teaches you how to find joy in …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is much more idiomatic and aligns perfectly with the project's tone and CBT terminology. It uses 'unhelpful beliefs' instead of 'negative beliefs' and 'grow as an individual' instead of the clunky 'develop independently', which sounds much more natural in English.
  - [old/terminology/minor] used 'negative beliefs' instead of the preferred 'unhelpful beliefs'
  - [old/style/minor] the phrase 'develop independently of romantic relationships' is a bit stiff/unnatural compared to B
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more natural and follows the 'understanding friend' tone, using 'unhelpful beliefs' as per the glossary and 'grow as an individual' which sounds idiomatic. Translation B uses 'negative beliefs' (not the preferred term) and sounds slightly robotic/academic due to the lack of a subject in the final sentence.
  - [old/terminology/minor] used 'negative beliefs' instead of the project-standard 'unhelpful beliefs'
  - [old/style/major] the phrase 'teaches how to' is missing a subject (you), making it sound like a dry manual rather than a supportive article

#### 🟢 en `/exercise/title` — NEW лучше (2:0)

- **RU**: Как избавиться от любовной зависимости?
- **OLD**: How to Overcome Love Addiction?
- **NEW**: How to overcome love addiction?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - According to the project guidelines, UI strings and headings (unless they are article titles) should follow sentence case. Translation B correctly uses sentence case, whereas Translation A uses Title Case, which is less appropriate for a standard question/heading in this context.
  - [old/style/minor] Uses Title Case instead of sentence case
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A follows the sentence case rule for UI/titles as specified in the instructions, whereas Translation B uses Title Case, which is less appropriate for a standard question/header in this context.
  - [old/style/minor] Uses Title Case instead of sentence case for a question/header.

