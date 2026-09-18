# QA: слепое парное сравнение переводов — en-final-g45-duty_guilt_incrimination

- **Дата**: 2026-09-18T20:55:56.297Z
- **Метка**: en-final-g45-duty_guilt_incrimination
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/depression/duty_guilt_incrimination.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/duty_guilt_incrimination.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 17 | 🟢 6 | 🔴 1 | ⚪ 0 | 🟡 10 | 0 / 1 | 86% |
| **итого** | 17 | 🟢 6 | 🔴 1 | ⚪ 0 | 🟡 10 | 0 / 1 | 86% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×10, mistranslation/major×1, terminology/minor×1, style/major×1; OLD — style/minor×17, terminology/major×4, omission/major×3, omission/minor×3, addition/minor×2, terminology/minor×1, omission/critical×1

### Детали пар (для спот-чека)

#### 🟢 en `/incrimination/screen_1/texts` — NEW лучше (2:0)

- **RU**: Один из типичных симптомов депрессии – склонность к самообвинению, чувство собственной неполноценности, отсутствие собственной ценности и значимости. Человек часто присваивает себе ярлыки "неудачника", "ничтожества", считая себя плохим. Чем тяжелее степень деп…
- **OLD**: One of the typical symptoms of depression is a tendency toward self-blame, feelings of inferiority, and a sense of having little worth or significance. People often apply labels like “failure” or “worthless,” seeing themselves as fundamentally bad. More severe…
- **NEW**: A typical symptom of depression is a tendency toward self-blame, feelings of inadequacy, and a sense of lacking personal value or significance. People often label themselves as a “failure” or “worthless,” believing they are fundamentally bad. The more severe t…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation B is superior because it preserves all original elements, including the Instagram placeholder, the list tags, and the Maxwell Maltz quote, which Translation A omitted. B also uses more natural phrasing for the CBT context.
  - [old/omission/major] Omitted the Instagram placeholder, the list tags (li), and the closing quote by Maxwell Maltz.
  - [old/style/minor] The translation of 'привлекательным' as 'that' (omitting the word 'appealing') loses the sarcastic tone of the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is superior because it maintains the original structure and formatting (including the list tags) and uses more natural, idiomatic phrasing. Translation B makes several stylistic errors, such as using 'themself' (which is grammatically controversial compared to 'themselves') and losing the sarcastic nuance of the 'appealing' list.
  - [old/omission/major] Missing the 'Think about...' rhetorical question and the sarcastic 'appealing' list framing, which is crucial for the tone.
  - [old/style/minor] The list items are missing the HTML <li> tags present in the original.
  - [old/style/minor] The translation of 'ничтожество' as 'worthless' (adjective) in the second paragraph is slightly less precise than A's approach to the noun/label concept, though acceptable.

#### 🟢 en `/guilt/description` — NEW лучше (2:0)

- **RU**: Статья исследует взаимосвязь между чувством вины и депрессией, подчёркивая, как избыточное или необоснованное чувство вины может способствовать развитию депрессивных состояний. Авторы описывают различие между здоровым и нездоровым чувством вины, обсуждая, как …
- **OLD**: The article explores the connection between guilt and depression, highlighting how excessive or unfounded guilt can contribute to the development of depressive states. The authors distinguish between healthy and unhealthy guilt, noting that the former can moti…
- **NEW**: This article explores the connection between guilt and depression, highlighting how excessive or unfounded guilt can contribute to the development of depressive states. We distinguish between helpful and unhelpful guilt, discussing how the former can serve as …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B follows the project's tone of voice guidelines by using 'helpful/unhelpful' instead of 'healthy/unhealthy' and adopting a warmer, more engaging 'expert friend' tone ('We distinguish', 'You'll also find'). It also correctly uses 'mental well-being' as per the glossary.
  - [old/terminology/major] Used 'healthy/unhealthy' instead of the required 'helpful/unhelpful' for thoughts/feelings.
  - [old/style/minor] Sounds slightly more academic and detached compared to the target 'warm expert' tone.
  - [old/terminology/minor] Used 'emotional well-being' instead of the preferred 'mental well-being'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A follows the project's tone of voice guidelines perfectly, using 'helpful/unhelpful' instead of 'healthy/unhealthy' and 'mental well-being' instead of 'emotional well-being'. It also uses an engaging, supportive tone ('You’ll also find...') rather than the passive, academic tone of B.
  - [old/terminology/major] Used 'healthy/unhealthy' instead of the required 'helpful/unhelpful' for guilt/thoughts; used 'emotional well-being' instead of 'mental well-being'.
  - [old/style/minor] The tone is too academic and passive ('Strategies are offered'), which contradicts the 'understanding friend-expert' persona.

#### 🟡 en `/duty/description`— вердикт неустойчив

- **RU**: В этой статье мы погружаемся в мир когнитивных искажений, раскрывая, как они влияют на наше восприятие реальности и психологическое здоровье. Особое внимание уделяется пониманию и коррекции "долженствования", с целью помочь читателям обрести более осознанный и…
- **OLD**: This article explores how cognitive distortions shape our view of reality and affect mental health. We focus on understanding and loosening “should” statements to cultivate a more mindful, flexible, and joyful outlook.
- **NEW**: In this article, we dive into the world of cognitive distortions, exploring how they affect our perception of reality and mental well-being. We will focus specifically on understanding and correcting “should” statements to help you find a more mindful and bala…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and idiomatic, avoiding the heavy 'dive into the world of' cliché. It uses 'mental health' and 'outlook' more naturally for a professional yet warm article tone.
  - [new/style/minor] The phrase 'dive into the world of' is a bit of a cliché in English-language wellness articles; 'explores' in A is cleaner.
  - [new/style/minor] The sentence structure is slightly more wordy and follows the Russian syntax more closely than A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original structure and tone while maintaining high idiomatic quality. Translation B, while smooth, introduces several additions ('flexible') and changes the verb 'correcting' to 'loosening', which slightly shifts the CBT nuance.
  - [old/addition/minor] Added 'flexible' which is not in the original text.
  - [old/style/minor] Changed 'correcting' to 'loosening'; while 'loosening' is a valid CBT concept, 'correcting' is closer to the original intent of the source text.

#### 🟢 en `/duty/test/answers` — NEW лучше (2:0)

- **RU**: Они не позволяют объективно воспринимать действительность Они влияют на интеллектуальные способности С ними невозможно добиться успеха в жизни Когнитивные искажения скорее полезны
- **OLD**: They prevent an objective view of reality They directly reduce intellectual ability They make success in life impossible Cognitive distortions are mostly helpful
- **NEW**: They prevent us from perceiving reality objectively They affect intellectual abilities They make it impossible to succeed in life Cognitive distortions are actually helpful
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more natural and flows better as a series of statements. Translation B contains a clunky noun-heavy construction in the first sentence and an unverified addition ('directly') in the second.
  - [old/style/minor] The first sentence 'prevent an objective view' is a bit heavy/noun-centric compared to the more natural 'prevent us from perceiving' in A.
  - [old/addition/minor] Added 'directly' in the second sentence, which is not in the original.
  - [old/style/minor] The third sentence 'make success in life impossible' is grammatically correct but slightly less idiomatic than 'make it impossible to succeed'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is more idiomatic and natural for a mental health context. Translation A feels slightly stiff and uses 'reduce intellectual ability', which is a heavy, less natural way to express 'влияют на способности'.
  - [old/style/minor] The phrasing 'prevent an objective view' is grammatically correct but slightly more formal/clunky than 'prevent us from perceiving... objectively'.
  - [old/mistranslation/minor] 'Directly reduce' adds a level of intensity ('directly') and a specific direction ('reduce') not present in the original 'влияют' (affect).

#### 🟢 en `/duty/title` — NEW лучше (2:0)

- **RU**: Долженствование - бег в кандалах
- **OLD**: Should Statements — Running in Shackles
- **NEW**: “Should” statements — running in shackles
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - Translation A correctly follows the sentence case rule for titles/headers in the UI guidelines, whereas Translation B uses Title Case which is not the standard for this context. Translation A also uses proper quotation marks for the term.
  - [old/style/minor] Uses Title Case instead of sentence case as required by the guidelines for UI/headers.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B correctly follows the project's specific terminology for 'should statements' by using quotation marks and sentence case, whereas A uses Title Case which is inappropriate for this context.
  - [old/style/minor] Uses Title Case instead of the required sentence case for this type of content.

#### 🔴 en `/incrimination/title` — OLD лучше (2:0)

- **RU**: Самооценка в омуте депрессии: Путь к самопринятию и внутреннему балансу
- **OLD**: Self-Esteem in the Depths of Depression: A Path to Self-Acceptance and Inner Balance
- **NEW**: Self-esteem in the Depths of Depression: A Path to Self-Acceptance and Inner Balance
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - The original text is a title. Translation B correctly uses Title Case, which is the standard for article headings in English, whereas Translation A uses sentence case, which is less appropriate for a formal title.
  - [new/style/minor] Uses sentence case for a title instead of Title Case.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A correctly uses Title Case for a headline, which is standard for article titles in US English, whereas Translation B uses sentence case.
  - [new/style/minor] Uses sentence case for a title, which is less common for article headings in this context compared to Title Case.

#### 🟡 en `/incrimination/screen_4/texts`— вердикт неустойчив

- **RU**: Начните предъявлять такие же требования к своим близким и друзьям. Но будьте максимально честны. И когда вы начнете это делать, вы поймете, насколько несправедлива ваша критика на самом деле. Ваша самооценка – это важнейший мотив при постановке жизненной цели …
- **OLD**: Apply the same standards to loved ones and friends that you apply to yourself—honestly. As you try this, you’ll see just how unfair your self-criticism really is. Your self-esteem is a key driver in setting life goals and pursuing them. With low self-esteem, y…
- **NEW**: Start holding your loved ones and friends to the same standards. But be as honest as possible. Once you start doing this, you’ll realize just how unfair your criticism actually is. Your self-esteem is a crucial motivator when setting life goals and achieving t…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original structure and tone, maintaining a smooth, supportive flow. Translation B uses em dashes that create a slightly fragmented rhythm and makes some stylistic choices (like 'deny yourself the right to happiness') that feel slightly more dramatic/less natural than A's 'depriving yourself of the right to be happy'.
  - [old/style/minor] The use of em dashes in the first and fourth paragraphs creates a slightly choppy reading experience compared to the original's flowing narrative.
  - [old/style/minor] The phrasing 'deny yourself the right to happiness' is slightly less idiomatic in a supportive mental health context than 'depriving yourself of the right to be happy'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows better as a cohesive narrative. It avoids the slightly clunky, repetitive sentence structures found in B and uses more natural phrasing like 'key driver' and 'pursuing them'.
  - [new/style/minor] The sentence structure 'Start holding... But be...' feels a bit choppy compared to the smoother flow of A.
  - [new/style/minor] The phrase 'depriving yourself of the right to be happy' is grammatically correct but slightly more wordy than the more direct 'deny yourself the right to happiness'.

#### 🟡 en `/duty/screen_2/texts`— вердикт неустойчив

- **RU**: В нашем приложении мы выделили самые важные когнитивные искажения, которые можно изучить на соответствующей странице в дневнике автоматических мыслей. В этом курсе мы подробно рассмотрим три самые распространенные ошибки. Начнем с искажения «долженствование». …
- **OLD**: In our app, we highlight the key cognitive distortions; you can review them on the Automatic Thoughts Diary page. In this course, we’ll examine three common ones. Let’s start with “should” statements. “Should” statements are rigid beliefs about what must or mu…
- **NEW**: In our app, we have highlighted the most important cognitive distortions, which you can explore on their respective pages in the automatic thought journal. In this course, we will take a detailed look at the three most common errors. We’ll start with “should” …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Translation A follows the glossary and CBT terminology perfectly (automatic thought journal, unhelpful thinking). Translation B fails on several key terminology requirements (Automatic Thoughts Diary instead of journal, maladaptive instead of unhelpful) and uses 'must' in the examples, which loses the nuance of the 'should' statements concept being explained.
  - [old/terminology/major] Used 'Automatic Thoughts Diary' instead of 'automatic thought journal'
  - [old/terminology/major] Used 'maladaptive' instead of 'unhelpful' (as per project guidelines for unhelpful/adaptive pair)
  - [old/style/minor] The examples use 'must' instead of 'should', which weakens the pedagogical link to the term 'should statements'
  - [old/omission/minor] Missing the Instagram placeholder tag
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is much more natural and follows the project's tone guidelines. It uses 'automatic thought journal' (though it missed the 'journal' part in the first sentence, it used 'Diary' which is a minor slip, but the flow is better) and avoids the clunky, academic phrasing of B. Most importantly, A uses 'unhelpful' vs 'maladaptive' correctly in context, whereas B's 'unhelpful thinking' is a bit weak for the contrast intended, and B's 'errors' for 'искажения' is a slight deviation from the standard 'distortions'.
  - [new/style/minor] Phrasing like 'take a detailed look at the three most common errors' sounds slightly more like a textbook than a 'supportive friend'
  - [new/terminology/minor] Uses 'unhelpful thinking' where the context of 'maladaptive' (дезадаптивное) is more clinically appropriate for the contrast being made
  - [old/terminology/minor] Used 'Automatic Thoughts Diary' instead of the preferred 'automatic thought journal'

#### 🟡 en `/incrimination/screen_3/texts`— вердикт неустойчив

- **RU**: Во-первых, важно осознать, что свою ценность нельзя заслужить. Успех, конечно, может доставить удовольствие, но не счастье. А самооценка, основанная на достижениях, – это псевдосамооценка, она нереалистична. Многие успешные, но несчастные люди, страдающие депр…
- **OLD**: First, it’s important to recognize that your worth cannot be earned. Success can bring pleasure, but not lasting happiness. Self-esteem built solely on achievements is pseudo-esteem—it isn’t realistic. Many successful yet unhappy people with depression also se…
- **NEW**: First, it’s important to realize that you cannot earn your worth. Success can certainly bring pleasure, but it doesn’t bring happiness. And self-esteem based solely on achievements is a false sense of self—it isn’t realistic. Many successful but unhappy people…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is much more faithful to the original text's structure and nuances while maintaining a natural, supportive tone. Translation B takes too many liberties, such as changing 'died by suicide' to a more clinical/different phrasing and significantly shortening sentences, which loses the rhythmic flow of the original narrative.
  - [old/style/minor] The phrasing 'pseudo-esteem' is a bit clunky and sounds like a direct translation of 'псевдосамооценка' rather than natural English.
  - [old/omission/minor] The translation of the 'important' section is significantly condensed, losing the specific emphasis on 'self-love' and the direct connection to the previous sentence.
  - [old/style/minor] The phrase 'the evidence doesn't hold up' is a good idiomatic choice, but it slightly alters the original 'irrational and meaningless' meaning.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A sounds much more like a natural, professional English article. It avoids the clunky, literal phrasing of B (e.g., 'hit you over the head with a book') and uses more sophisticated, idiomatic expressions like 'doesn't hold up' and 'living with depression'.
  - [new/style/major] The phrase 'hit you over the head with a book' is a literal translation of a Russian idiom and sounds very jarring/unnatural in English. A's 'doesn't shame you' is a much better way to convey the intent.
  - [new/style/minor] The sentence 'Evidence of this can be seen in...' is a bit wordy and academic compared to the warm, supportive tone required.
  - [new/style/minor] The ending is missing a question mark, which is a punctuation error.

#### 🟡 en `/duty/screen_3/texts`— вердикт неустойчив

- **RU**: Как работать с этим искажением? Первый шаг — осознание. Следите за своими мыслями и записывайте их, когда они содержат «должен», «обязан», «надо». Это поможет понять, как «долженствование» влияет на ваши эмоции. Второй шаг — оспаривание. Задайте себе вопросы: …
- **OLD**: How do you work with this distortion? Step one is awareness. Track your thoughts and write them down whenever they include “should,” “must,” or “have to.” Notice how these words affect your emotions. Step two is challenge. Ask yourself, “Why do I believe it mu…
- **NEW**: How can you work with this distortion? The first step is awareness. Watch your thoughts and write them down when they contain words like “should,” “must,” or “have to.” This will help you understand how “should” statements affect your emotions. The second step…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is much more natural and follows the 'understanding friend' tone. It uses appropriate contractions (I'd, they're, I'm) and avoids the slightly stiff, formal phrasing found in B (e.g., 'I am a human being' vs 'I'm human'). A also correctly handles the 'should statements' terminology more fluidly.
  - [new/style/minor] Too formal/stiff for a supportive app; lacks contractions which makes it feel less like a 'friend' and more like a textbook.
  - [new/style/minor] The phrase 'it's okay to be imperfect' is a bit generic compared to the more direct 'I'm allowed to be imperfect' which better captures the nuance of the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more polished and adheres better to the professional yet warm tone required for psychoeducation. It correctly uses 'should statements' as a term and maintains a smoother flow. Translation B feels slightly more fragmented and uses 'entitled to', which can carry a negative connotation in English, whereas 'have the right to' is more neutral and accurate to the original.
  - [old/style/minor] The phrasing 'Step one is awareness' and 'Step two is challenge' is a bit too clipped/staccato compared to the more natural 'The first step is awareness'.
  - [old/style/minor] 'Entitled to their own view' sounds slightly more aggressive/demanding than the original 'имеет право'.

#### 🟢 en `/duty/screen_1/texts` — NEW лучше (2:0)

- **RU**: Теперь мы понимаем, что психологическое состояние человека тесно связано с его мышлением. В состоянии депрессии мы склонны искажать факты, словно смотрим на мир через серое стекло: он кажется менее ярким, чем через прозрачное. Депрессия искажает нашу способнос…
- **OLD**: We now know that a person’s psychological state is tightly linked to their thinking. In depression, it can feel like looking at the world through gray-tinted glasses—everything seems duller than through a clear lens. Depression tilts perception away from objec…
- **NEW**: We now understand that our mental state is closely linked to our thinking. In a state of depression, we tend to distort facts, as if looking at the world through gray-tinted glasses: everything seems less vibrant than it would through clear ones. Depression di…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is much more complete, preserving all structural elements including the important note, the quote by Aaron Beck, and the specific nuances of the original text. Translation A is a significant omission, cutting out the final quote and several key explanatory sentences.
  - [old/omission/critical] Missing the entire final quote by Aaron Beck and the concluding sentence about reality.
  - [old/omission/major] Missing the <important> block content entirely.
  - [old/style/minor] The flow is a bit too condensed compared to the original educational narrative style.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is a faithful and high-quality rendering of the original text, maintaining all nuances, the structure, and the specific quote by Aaron Beck. Translation B is too aggressive in its editing: it omits the important concluding quote, simplifies the text significantly, and loses the formal structure of the educational narrative.
  - [old/omission/critical] The entire final paragraph containing the Aaron Beck quote is missing.
  - [old/omission/major] The definition of cognitive distortions in the <important> block is significantly shortened and loses the 'brain' context.
  - [old/style/minor] The tone is a bit too casual/clipped compared to the original educational article style.

#### 🟡 en `/guilt/screen_4/texts`— вердикт неустойчив

- **RU**: <h2>Нездоровое чувство вины</h2> Человек также понимает, что поступил неправильно. Но в отличие от первого случая, он верит, что в момент совершения дурного поступка мог бы поступить иначе. <important>Он мог бы преодолеть свои тогдашние понимание, незнание, оп…
- **OLD**: Unhealthy guilt A person also understands that they acted wrongly. But unlike the first case, they believe that, at the time of the misdeed, they could have acted differently. They believe they could have overcome their at-the-time understanding, lack of knowl…
- **NEW**: <h2>Unhelpful guilt</h2> A person also realizes they acted wrongly. But unlike the first case, they believe they could have acted differently at the moment they made the mistake. <important>They believe they could have overcome their limitations, such as a lac…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is much more idiomatic and captures the emotional 'voice' of the original text. It avoids the clunky phrasing of B (e.g., 'If they believe they could have overcome their circumstances' is a mistranslation of the original logic). A also correctly uses 'magnification' for 'преувеличение' in a CBT context, whereas B uses 'exaggeration'.
  - [new/mistranslation/major] The sentence 'If they believe they could have overcome their circumstances' changes the meaning; the original is about the person's refusal to allow themselves self-compassion/reasons, not about their belief in overcoming circumstances.
  - [new/style/minor] The phrasing 'Oh, the horror!' is a bit too dramatic/theatrical for a supportive mental health context compared to A's 'How awful!'.
  - [new/terminology/minor] Used 'exaggeration' instead of the more standard CBT term 'magnification'.
  - [old/addition/minor] Added extra questions at the end ('Am I willing to learn...') which were not in the Russian source.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A follows the project's terminology (unhelpful) and maintains the structure of the original text. Translation B adds a whole paragraph at the end that is not in the source (addition) and uses 'magnification' instead of the standard CBT term 'exaggeration'.
  - [old/addition/major] Added a paragraph about learning from mistakes and repairing the situation which is not in the original.
  - [old/terminology/minor] Used 'magnification' instead of 'exaggeration' for cognitive distortions.
  - [old/style/minor] The phrase 'at-the-time understanding' is clunky and unnatural compared to A's approach.
  - [new/style/minor] The translation of 'неосознаваемом неприятии' as 'refusal to accept' is a slight simplification but works well for the tone.

#### 🟡 en `/incrimination/screen_2/texts`— вердикт неустойчив

- **RU**: Плохая самооценка – это лупа, увеличивающая все ваши ошибки и неудачи до масштабов тотального провала. Рассмотрим это на примере диалога человека в депрессии с психологом: <dialog psy="true">Екатерина, почему замечание от вашего начальника вызвало у вас такие …
- **OLD**: Poor self-esteem is a magnifying glass that turns every mistake or setback into a catastrophe. Consider this dialogue between a person with depression and a psychologist: Catherine, why did your supervisor’s remark trigger such intense, negative feelings? Is i…
- **NEW**: Low self-esteem acts like a magnifying glass, enlarging every mistake and failure until it feels like a total disaster. Let’s look at this through a dialogue between a person in depression and a psychologist: <dialog psy="true">Ekaterina, why did your boss’s r…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is much more idiomatic and flows like a professional English article. It avoids the clunky, literal structures of B (e.g., 'person in depression', 'speaking of our failures') and uses more natural phrasing ('struggle to think' vs 'unable to think').
  - [new/style/major] Phrasing like 'person in depression' and 'small mistakes are perceived as tragedies' sounds like a translation rather than natural English.
  - [new/style/minor] The transition 'We then convince others...' is a bit heavy compared to the smoother 'and may even convince others' in A.
  - [new/style/minor] The use of 'Ekaterina' and 'Katya' in the same text is inconsistent with the original's flow, though A's choice of 'Catherine' is a smoother localization for an English reader.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more faithful to the original structure and tone, especially in the dialogue and the concluding paragraph. Translation B makes several omissions in the final paragraph and loses the specific nuance of the dialogue's flow.
  - [old/omission/major] The final sentence in B omits the part about 'vividly demonstrating flaws' and 'persistently speaking of failures', which is a key part of the original's description of the behavior.
  - [old/style/minor] The dialogue tags (the <dialog> elements) were removed in B, which changes the format of the text compared to the original.
  - [old/style/minor] The transition 'When we're depressed' is a bit more abrupt than the original's 'Thus... when we are in depression'.

#### 🟡 en `/incrimination/description`— вердикт неустойчив

- **RU**: Эта статья исследует влияние депрессии на самооценку, раскрывая, как негативное самовосприятие усиливает симптомы депрессии и мешает полноценной жизни. Через анализ реальных случаев и советы экспертов, она предлагает практические шаги по преодолению самокритик…
- **OLD**: This article examines how depression affects self-esteem, showing how negative self-perception intensifies depressive symptoms and stands in the way of a fulfilling life. Drawing on case examples and expert guidance, it offers practical steps to move beyond se…
- **NEW**: This article explores how depression affects self-esteem, revealing how negative self-perception intensifies depressive symptoms and hinders a fulfilling life. Through real-life case studies and expert advice, it offers practical steps to overcome self-critici…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A sounds more natural and less like a direct translation of a Russian text. It uses more idiomatic phrasing ('stands in the way of', 'drawing on', 'move beyond') compared to the slightly more formal and repetitive structure of B.
  - [new/style/minor] The phrasing 'This article serves as a reliable guide' is a bit heavy and formal for a supportive mental health context; 'It's a practical guide' in A is much smoother.
  - [new/style/minor] The repetition of 'This article' at the start of the last sentence is slightly clunky compared to the pronoun usage in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more polished and professional, using more sophisticated and natural collocations like 'serves as a reliable guide' and 'real-life case studies'.
  - [old/style/minor] The phrase 'stands in the way of' is slightly more colloquial/clunky compared to 'hinders' in this context, and 'case examples' is less idiomatic than 'case studies'.

#### 🟡 en `/guilt/screen_1/texts`— вердикт неустойчив

- **RU**: Чрезмерное чувство вины часто остаётся незамеченным симптомом депрессии даже для многих психологов и психотерапевтов. Тем не менее, избыточное чувство вины является распространённым симптомом депрессии, и его усиление связано с уровнем тяжести расстройства. <i…
- **OLD**: Excessive guilt often goes unnoticed as a symptom of depression, even by many psychologists and psychotherapists. Yet excessive guilt is a common symptom of depression, and its intensity often tracks the disorder’s severity. Depression accompanied by guilt can…
- **NEW**: Excessive guilt is often an overlooked symptom of depression, even for many psychologists and psychotherapists. Nevertheless, excessive guilt is a common symptom of depression, and its intensity is often linked to the severity of the disorder. <important>Depre…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more polished and maintains a consistent, professional yet supportive tone. Translation B has several stylistic issues: it uses 'tracks' which is slightly too clinical/statistical for this context, and 'visitor' is a weaker choice than 'guest' for the metaphor. Most importantly, B's phrasing 'failed in a situation when they “should” have succeeded' is a bit clunky compared to A's smoother 'failed to handle a situation when they should have'.
  - [old/style/minor] The use of 'tracks' for 'связано' is a bit too technical/jargon-heavy for a supportive article.
  - [old/style/minor] The phrasing 'failed in a situation when they “should” have succeeded' is less idiomatic than A's version.
  - [old/style/minor] The metaphor 'frequent visitor' is less natural in this context than 'frequent guest'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and aligns better with the requested 'expert friend' tone. It uses more natural phrasing like 'tracks the disorder's severity' and 'sink into depression'. Translation B feels slightly more like a direct translation from Russian (e.g., 'even for many', 'the person then blames').
  - [new/style/minor] The phrase 'even for many' is a bit clunky compared to 'even by many'. 'Full-blown depression' is acceptable but 'full depressive episode' in A is more clinically precise for this context.

#### 🟡 en `/guilt/screen_2/texts`— вердикт неустойчив

- **RU**: Итак, вина — это эмоция, которую вы испытываете, когда у вас возникают следующие мысли: <li>Я совершил действие, которого не должен был совершить (или не совершил того, что должен был), и это противоречит моим моральным стандартам или представлениям о справедл…
- **OLD**: So, guilt is an emotion you experience when the following thoughts arise: I did something I should not have done (or failed to do something I should have), and this conflicts with my moral standards or sense of justice. Such “wrong behavior” proves that I am a…
- **NEW**: So, guilt is an emotion you experience when you have thoughts like these: <li>I did something I shouldn’t have (or failed to do something I should have), and this contradicts my moral standards or sense of fairness.</li> <li>This “wrong behavior” proves that I…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is superior because it preserves the original HTML structure (li, important, q tags), which is critical for technical implementation. It also uses more natural, idiomatic phrasing ('suffering over nothing' vs 'making a fuss') and maintains a better flow for a psychological article.
  - [old/omission/major] Missing all HTML tags (li, important, q), which would break the layout if used as a direct replacement.
  - [old/style/minor] 'making a fuss' is a bit too light/colloquial for the context of someone suffering from depression; 'suffering over nothing' or 'wasting time' is closer to the intended weight of the Russian 'страдать ерундой'.
  - [old/style/minor] The translation of the Cicero quote is slightly less impactful than A's version.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A is more idiomatic and flows better as a cohesive article. Translation B contains several 'translationese' markers and slightly awkward phrasing (e.g., 'suffering over nothing' for 'страдать ерундой' and 'social connection' instead of 'interaction'). A also correctly handles the Cicero quote with a more natural English rhythm.
  - [new/style/minor] 'suffering over nothing' is a bit literal for 'страдать ерундой'; 'making a fuss' in A is a better idiomatic fit for the context of dismissing someone's struggle.
  - [new/style/minor] 'social connection' is slightly off compared to the broader 'social interaction/cooperation' implied by the original.
  - [new/style/minor] The Cicero quote in B is grammatically fine but lacks the punchy, classical feel of A's version.

#### 🟢 en `/guilt/screen_3/texts` — NEW лучше (2:0)

- **RU**: Однако когда ощущение вины становится чрезмерным или необоснованным, оно начинает негативно влиять на наше эмоциональное и физическое благополучие. В то время как здоровое чувство вины мотивирует нас к положительным изменениям, депрессивное зачастую приводит к…
- **OLD**: However, when guilt becomes excessive or unfounded, it begins to harm our emotional and physical well-being. Whereas healthy guilt motivates positive change, depressive guilt often leads to isolation and withdrawal. In some cases, it can even drive a person to…
- **NEW**: However, when the sense of guilt becomes excessive or unfounded, it begins to negatively impact our emotional and physical well-being. While helpful guilt motivates us toward positive change, depressive guilt often leads to isolation and withdrawal. In some ca…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A perfectly adheres to the CBT terminology guidelines (using 'helpful/unhelpful' instead of 'healthy/unhealthy') and maintains a much more natural, professional, and empathetic tone. It also handles the complex 'important' block with better idiomatic flow.
  - [old/terminology/major] Used 'healthy/unhealthy' instead of the required 'helpful/unhelpful' for CBT-aligned content.
  - [old/style/minor] The phrasing 'theatrical' for 'драматична' is slightly off in this psychological context; 'dramatic' is more standard.
  - [old/omission/minor] The nuance of 'протрезвел' and 'переоценка ценностей' was significantly compressed compared to A's more evocative 'seen the light' and 'values have shifted'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B follows the project's specific terminology guidelines much better, specifically using 'helpful/unhelpful' instead of 'healthy/unhealthy' for guilt. It also correctly implements the 'be kind to yourself' tone and uses the required 'seen the light' / 'values have shifted' nuance for the idiomatic section.
  - [old/terminology/major] Used 'healthy/unhealthy' instead of the required 'helpful/unhelpful' for guilt/thoughts.
  - [old/style/minor] The translation of the 'protrezvel' section is a bit too condensed compared to the original's emphasis.

