# QA: слепое парное сравнение переводов — en-final-g45-owed

- **Дата**: 2026-09-18T21:11:16.841Z
- **Метка**: en-final-g45-owed
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/distortions/owed.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/owed.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 10 | 🟢 9 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | 100% |
| **итого** | 10 | 🟢 9 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — —; OLD — style/minor×16, terminology/major×5, style/major×4, mistranslation/major×1, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: Родители не считались с мнением ребенка, игнорировали его интересы и желания. Ребенок злится на родителей, но не может выразить свою злость открыто. Поэтому он переносит ее на окружающих, считая, что они должны его пожалеть и компенсировать то, чего ему не хва…
- **OLD**: Sometimes parents ignore the child’s opinion and pay no attention to their interests and wishes. The child feels angry with their parents but cannot express this anger openly. As a result, it gets redirected onto other people, along with the belief that others…
- **NEW**: Parents didn’t consider the child’s opinion, ignoring their interests and desires. The child feels angry with their parents but can’t express it openly. As a result, they project this anger onto those around them, believing that others should pity them and com…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more faithful to the original text's structure and tone. Translation B introduces unnecessary qualifiers like 'Sometimes' at the beginning of paragraphs, which changes the assertive nature of the psychological description, and uses awkward phrasing like 'it gets redirected' instead of the more precise 'they project'.
  - [old/style/minor] Added 'Sometimes' to the start of paragraphs, which softens the original's definitive tone.
  - [old/style/minor] Used 'it gets redirected' which is slightly more passive and less idiomatic than 'project' in a psychological context.
  - [old/style/minor] The use of quotation marks around 'owe' and 'earned' is unnecessary and adds a tone of sarcasm not present in the original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is much more idiomatic and flows like a professional psychological article. It avoids the clunky, literal phrasing found in B (e.g., 'realize her dream' or 'social support') and uses more natural psychological terms like 'projected this resentment' and 'sense of self-worth'.
  - [new/style/minor] The phrasing 'realize her dream' is a common Russian-to-English calque; 'pursue her dream' (as in A) is much more natural.
  - [new/style/minor] The translation of 'социальной поддержки' as 'social support' is grammatically correct but sounds a bit clinical/sociological compared to the warmer 'community support' used in A.
  - [new/style/minor] The sentence 'believing that he was owed what he deserved' is slightly awkward compared to A's more nuanced approach.

#### 🟢 en `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Убеждения «долженствования» — это тихий враг, который крадет у нас радость жизни, подрывает спокойствие и мешает строить конструктивные, близкие отношения с окружающими. Центральной идеей установки служит идея долга. Само слово «должен» является в большинстве …
- **OLD**: The beliefs of obligations are a silent enemy that steals our joy of life, undermines our peace, and hinders the building of constructive, close relationships with others. The central idea of this mindset is the concept of duty. The word “must” is in most case…
- **NEW**: “Should” statements are a silent enemy that steals our joy, undermines our peace of mind, and makes it harder to build healthy, close relationships with those around us. At the core of this mindset is the idea of obligation. In most cases, the word “should” it…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A uses the canonical CBT term '"should" statements' and flows naturally like a professional English article. Translation B suffers from heavy calques ('beliefs of obligations', 'joy of life', 'authoritative citizens') and awkward phrasing that sounds like a direct translation from Russian.
  - [old/terminology/major] Used 'beliefs of obligations' instead of the standard '"should" statements'.
  - [old/style/major] Many Russian-style constructions: 'joy of life' (joy), 'authoritative citizens' (powerful leaders), 'whole bouquet of negative emotions' (wide range of negative emotions).
  - [old/style/minor] The phrase 'the presence of beliefs in obligations' is very clunky and unidiomatic.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 94)
  - Translation B correctly uses the canonical CBT term 'should statements' and follows the stylistic guidelines for a natural, supportive tone. Translation A fails by using 'beliefs of obligations' (a literal calque) and 'authoritative citizens' (which is nonsensical in English context).
  - [old/terminology/critical] Used 'beliefs of obligations' instead of the canonical 'should statements'.
  - [old/style/major] The phrase 'authoritative citizens' is a mistranslation of 'авторитетных граждан'; in English, this sounds like people with legal authority, whereas the context implies influential/powerful people.
  - [old/style/minor] The phrase 'psycho-emotional arousal level' is overly academic and heavy for a supportive text.
  - [old/style/minor] The phrase 'joy of life' is a bit clunky compared to the more natural 'joy'.
  - [new/style/minor] The translation of 'целый букет негативных эмоций' as 'a wide range of negative emotions' is a good, natural adaptation, though slightly less colorful than the original.

#### 🟢 en `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Определите корни убеждения</h2> Подумайте, откуда это убеждение произошло. Возможно, вас в детстве баловали и не ставили перед вами реалистичных границ или вы унаследовали такое мышление от родителей. Осознание причины не поможет избавиться от убеждения, н…
- **OLD**: <h2>Identify the roots of your belief</h2> Think about where this belief came from. Maybe you were spoiled in childhood and not given realistic boundaries, or you inherited this mindset from your parents. Recognizing the cause will not help you get rid of the …
- **NEW**: <h2>Identify the roots of the belief</h2> Think about where this belief came from. Perhaps you weren’t given realistic boundaries as a child, or you inherited this way of thinking from your parents. Understanding the cause won’t make the belief disappear, but …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A follows the CBT terminology guidelines perfectly, specifically using the canonical '"should" statements' for 'долженствование'. It also sounds much more natural and idiomatic for a native speaker. Translation B uses 'obligations' (incorrect terminology) and contains several clunky, non-idiomatic constructions like 'the attitude to the situation' and 'the responsibility for which lies with yourself'.
  - [old/terminology/major] Used 'obligations' instead of the canonical '"should" statements'
  - [old/style/major] Phrasing like 'the responsibility for which lies with yourself' and 'the attitude to the situation' is heavy and sounds like a translation rather than natural English
  - [old/style/minor] The example sentence structure 'is replaced with' is passive and less engaging than the imperative used in A
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B follows the CBT terminology guidelines perfectly, specifically using 'should statements' instead of the literal 'obligations'. It also sounds much more natural and idiomatic (e.g., 'sense of freedom' vs 'degree of freedom', 'working through it' vs 'working with it').
  - [old/terminology/major] Used 'obligations' instead of the canonical CBT term 'should statements'.
  - [old/style/minor] Phrasing like 'degree of freedom' and 'attitude to the situation' sounds slightly translated/unnatural compared to 'sense of freedom' and 'how you relate to a situation'.
  - [old/style/minor] The example sentence construction 'is replaced with' is a bit passive and clunky for a guide.

#### 🟢 en `/exercise/description` — NEW лучше (2:0)

- **RU**: Статья обсуждает убеждения «долженствования» как источник стресса и неудовлетворенности, подчеркивая, что эти установки заставляют нас чувствовать себя заложниками обстоятельств. Автор предлагает осознать нереалистичность таких убеждений, заменить их на более …
- **OLD**: The article discusses the beliefs of obligations as a source of stress and dissatisfaction, emphasizing that these attitudes make us feel like prisoners of circumstances. The author suggests recognizing the unrealistic nature of such beliefs, replacing them wi…
- **NEW**: This article explores “should” statements as a source of stress and dissatisfaction, highlighting how these beliefs can make us feel like hostages to our circumstances. The author suggests recognizing the unrealistic nature of such beliefs, replacing them with…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 96)
  - Translation B uses the canonical CBT term 'should statements' and follows the 'understanding friend' tone, whereas Translation A uses a literal, clunky translation of the term and feels more like a textbook.
  - [old/terminology/major] Used 'beliefs of obligations' instead of the canonical 'should statements'.
  - [old/style/minor] The phrase 'prisoners of circumstances' is slightly less idiomatic than 'hostages to circumstances' in this context.
  - [old/style/minor] Uses 'our' instead of the more direct and engaging 'your' for the reader.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 96)
  - Translation A uses the canonical CBT term 'should statements' and flows naturally like a professional English article. Translation B contains several 'translationese' errors, such as 'beliefs of obligations' and 'prisoners of circumstances', which sound unnatural to a native speaker.
  - [old/terminology/major] Used 'beliefs of obligations' instead of the canonical 'should statements'.
  - [old/style/major] Used 'prisoners of circumstances' (calque) instead of the more idiomatic 'hostages to circumstances' or similar.
  - [old/style/minor] Used 'flexible formulations' which is slightly heavy/academic compared to 'flexible language'.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: Статья рассматривает проблему установки "мне должны", которая формируется у людей, ожидающих, что мир будет вращаться вокруг них и удовлетворять все их потребности. Автор объясняет, как эта установка возникает в детстве, приводит примеры ее проявления во взрос…
- **OLD**: This article explores the mindset of “the world owes me”, which often develops in people who expect life to revolve around them and meet all their needs. The author explains how this belief starts in childhood, shows how it manifests in adult life, and describ…
- **NEW**: This article explores the “they owe me” mindset—a pattern where people expect the world to revolve around them and cater to all their needs. The author explains how this mindset develops in childhood, provides examples of how it manifests in adult life, and de…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and flows better as a professional article summary. It uses a more natural phrasing for the core concept ('the “they owe me” mindset') and avoids the slightly clunky 'the world owes me' construction in B.
  - [old/style/minor] The phrase 'the mindset of “the world owes me”' is a bit wordy compared to the more punchy 'the “they owe me” mindset' in A.
  - [old/style/minor] The transition 'In conclusion, the article highlights...' is slightly more formal/academic than the smoother 'Finally, it suggests...' used in A, which fits the 'understanding friend' tone better.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and flows better, using more natural phrasing like 'cater to all their needs' and 'relationship tension'. Translation A's use of 'the world owes me' as a mindset is slightly clunky compared to B's more sophisticated structure.
  - [old/style/minor] The phrase 'the mindset of “the world owes me”' is a bit heavy; B's use of the em dash is more elegant for an article summary.

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: И, в первую очередь, это разочарование: если вам отказали, не поняли, что должны решать ваши проблемы, не пошли навстречу ожиданиям, то вас безусловно ждет разочарование, обиды, гнев, непонимание, как так вообще можно со мной поступать – таким прекрасным челов…
- **OLD**: The first of these difficulties is disappointment: if someone says no, does not understand that they are “supposed” to solve your problems, or does not meet your expectations, disappointment, hurt, anger, and confusion are almost inevitable — “How can anyone t…
- **NEW**: First and foremost, there is frustration: if you are refused, if people don’t understand that they should solve your problems, or if they don’t meet your expectations, you will inevitably face disappointment, resentment, anger, and a sense of being misundersto…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and flows better as a narrative article. It uses more natural phrasing (e.g., 'mindset' instead of 'belief' for 'установка', 'cater to whims' instead of 'go along with whims') and maintains a better rhythm. Translation A feels slightly more like a literal translation in several places.
  - [old/style/minor] The phrase 'disappointment, hurt, anger, and confusion are almost inevitable' is a bit clunky compared to B's more direct approach.
  - [old/style/minor] Using 'belief' for 'установка' in the context of a mindset is acceptable, but 'mindset' (used in B) is more natural for this psychological context.
  - [old/style/minor] The translation of 'не считаются с ее мнением' as 'did not always take her opinion into account' is correct but slightly wordy compared to B's 'didn't defer to her opinion'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more idiomatic and flows better as a cohesive narrative. It handles the emotional nuances (like 'resentment' vs 'hurt') and the complex sentence structures of the original more naturally. Translation B feels slightly more fragmented and uses some clunky phrasing (e.g., 'the first of these difficulties is disappointment' is a weak opening compared to the original's directness).
  - [old/style/minor] The opening sentence 'The first of these difficulties is...' is a bit wordy and loses the punch of the Russian 'И, в первую очередь, это разочарование'.
  - [old/style/minor] Phrasing like 'hurt reaction' for 'обида' is slightly unnatural; 'resentment' or 'feeling hurt' is better.
  - [old/style/minor] The use of 'the world owes me' in the second bullet point is a slight deviation from the specific 'мне все должны' (everyone owes me) used earlier, though it works contextually.

#### 🟢 en `/title` — NEW лучше (2:0)

- **RU**: Мне должны. Что не так с этим убеждением?
- **OLD**: The World Owes Me: What’s Wrong with This Belief?
- **NEW**: “They owe me.” What’s wrong with this belief?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B accurately reflects the original's short, personal, and idiomatic nature. Translation A turns a specific thought into a generalized concept ('The World Owes Me'), which changes the tone and meaning.
  - [old/mistranslation/major] The original is a specific thought/belief ('I am owed'), whereas A generalizes it to a philosophical concept ('The World Owes Me').
  - [old/style/minor] The use of Title Case for the first sentence makes it look like a book title rather than a specific thought being examined.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is a precise, idiomatic reflection of the original text, maintaining the first-person perspective and the direct question. Translation B introduces a significant addition ('The World') and changes the structure to a title format, which distorts the original meaning.
  - [old/addition/major] Added 'The World', which is not in the original text
  - [old/style/minor] Changed the tone from a personal thought to a formal title

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: "Мне должны" — это ловушка, в которую попадают многие, полагая, что мир вращается вокруг них. Люди, находящиеся в такой позиции, часто ожидают, что другие будут соглашаться с ними и выполнять их просьбы. Они не принимают во внимание мнения и потребности других…
- **OLD**: “The world owes me” is a trap many people fall into when they start to believe that everything should revolve around them. People in this position often expect others to agree with them and go along with their requests. They do not take other people’s opinions…
- **NEW**: “They owe me” is a trap that many fall into, believing the world revolves around them. People with this mindset often expect others to agree with them and fulfill their every request. They fail to consider the opinions and needs of others, believing their own …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 84 / NEW 94)
  - Translation B is much more idiomatic and aligns better with the 'expert friend' tone. It uses natural phrasing like 'by right of birth' and 'feel entitled', whereas A feels slightly more literal and clunky. B also correctly uses the canonical CBT term 'should statements'.
  - [old/terminology/major] Used '“Should” beliefs' instead of the canonical '“should” statements'.
  - [old/style/minor] Phrasing like 'simply by being born' is less idiomatic than 'by right of birth'.
  - [old/style/minor] The translation of the Dolly Parton quote is a bit literal; B's version flows better.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more idiomatic and follows the project's tone guidelines perfectly. It uses the canonical CBT term '"should" statements' and handles the list items with a natural flow. Translation B feels slightly more 'translated' and uses less precise phrasing (e.g., 'Should beliefs in this area' instead of the standard term, and 'People should not say no to me' which is a clunky way to translate 'Мне не должны отказывать').
  - [old/terminology/major] Used 'Should beliefs' instead of the canonical 'should statements'.
  - [old/style/minor] The list items include periods, which is inconsistent with the UI/list style of the original and A.
  - [old/style/minor] 'People should not say no to me' is a literal translation of the Russian structure and sounds unnatural in English compared to 'I shouldn't be refused'.
  - [old/style/minor] Uses 'sadness and a sense of inferiority' where 'gloom and inadequacy' (A) or the original's nuance is better captured for this context.

#### 🟢 en `/exercise/title` — NEW лучше (2:0)

- **RU**: Как справиться с должествованием?
- **OLD**: How to Cope with Obligations?
- **NEW**: How to deal with “should” statements?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 60 / NEW 100)
  - Translation A uses the canonical CBT term 'should statements' as required by the glossary, whereas Translation B uses a literal and non-standard translation 'obligations' which loses the specific psychological meaning.
  - [old/terminology/major] The term 'должествование' in CBT refers specifically to 'should statements', not general 'obligations'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 40 / NEW 100)
  - Translation B uses the canonical CBT term 'should statements' as required by the glossary, whereas Translation A incorrectly translates the term as 'obligations', which is a semantic error in a psychological context.
  - [old/terminology/critical] Used 'obligations' instead of the required CBT term 'should statements'

#### 🟢 en `/exercise/screen_3/texts` — NEW лучше (2:0)

- **RU**: <h2>Учитесь просить и выражать свои нужды</h2> Вместо того чтобы предполагать, что другие люди знают о ваших потребностях или желаниях, научитесь ясно и открыто выражать их и просить о помощи, когда это необходимо. <h2>Практикуйте сострадание</h2> Постарайтесь…
- **OLD**: <h2>Learn to ask and express your needs</h2> Instead of assuming that other people know about your needs or desires, learn to clearly and openly express them and ask for help when necessary. <h2>Practice compassion</h2> Try to understand the feelings of other …
- **NEW**: <h2>Learn to ask for and express your needs</h2> Instead of assuming others know what you need or want, learn to express yourself clearly and openly, and ask for help when you need it. <h2>Practice compassion</h2> Try to understand how others feel. Remember th…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A sounds like it was written by a native speaker, using natural phrasing and appropriate contractions. Translation B suffers from several 'translationese' issues, such as awkward noun usage ('his own busyness') and overly formal/stiff structures.
  - [old/style/major] The phrase 'considering his own busyness' is very unnatural; 'especially since they're so busy' in A is much better.
  - [old/style/major] The use of 'He/his' in the example is less inclusive and feels more like a direct translation of the Russian gendered example, whereas A uses 'they' which is the modern UX standard for gender neutrality.
  - [old/terminology/minor] Used 'irrational attitudes' instead of the preferred 'unhelpful beliefs' (though 'irrational' is acceptable, 'unhelpful' fits the project's tone better).
  - [old/style/minor] The sentence 'The world is not perfect, do not demand...' is a comma splice; A uses 'so' to connect them naturally.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more idiomatic and aligns perfectly with the requested 'warm, supportive expert' tone. It uses natural contractions (isn't, don't, you'll) and avoids the stiff, slightly robotic phrasing found in A. Crucially, B correctly uses the project's terminology ('unhelpful beliefs' instead of 'irrational attitudes') and handles gender neutrality much better by using 'they' instead of switching between 'he' and 'they'.
  - [old/style/major] Sounds like a translation; lacks contractions and uses stiff phrasing (e.g., 'considering his own busyness', 'nothing good will come of it').
  - [old/terminology/minor] Used 'irrational attitudes' instead of the preferred 'unhelpful beliefs'.
  - [old/style/minor] Gendered language ('He must help me') is less modern/inclusive than B's approach.

