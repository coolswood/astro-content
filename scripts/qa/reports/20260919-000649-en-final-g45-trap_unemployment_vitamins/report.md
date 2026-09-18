# QA: слепое парное сравнение переводов — en-final-g45-trap_unemployment_vitamins

- **Дата**: 2026-09-18T21:06:49.982Z
- **Метка**: en-final-g45-trap_unemployment_vitamins
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/depression/trap_unemployment_vitamins.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/trap_unemployment_vitamins.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 17 | 🟢 3 | 🔴 3 | ⚪ 0 | 🟡 11 | 0 / 2 | 50% |
| **итого** | 17 | 🟢 3 | 🔴 3 | ⚪ 0 | 🟡 11 | 0 / 2 | 50% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×13, style/major×6, omission/minor×2; OLD — style/minor×7, terminology/minor×5, omission/major×3, mistranslation/minor×2, omission/critical×2, mistranslation/major×1

### Детали пар (для спот-чека)

#### 🟡 en `/trap/screen_3/texts`— вердикт неустойчив

- **RU**: <li>Людьми, склонными к чрезмерному чувству вины, могут манипулировать окружающие ради достижения своих целей. Подумайте: сколько раз вы соглашались пойти на встречу без особого желания из стремления угодить или чтобы никто не обиделся? Важно отстаивать личные…
- **OLD**: People prone to excessive guilt can be vulnerable to manipulation. How often have you agreed to something you didn’t want—just to please others or avoid upsetting them? It’s important to set boundaries and be able to say “no.” Example: A young woman lives with…
- **NEW**: <li>People prone to excessive guilt can be easily manipulated by others to achieve their own goals. Think about it: how many times have you agreed to something you didn’t really want to do just to please someone or to avoid hurting their feelings? It’s importa…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is much more idiomatic and follows the 'expert friend' tone perfectly. It avoids the clunky, literal phrasing found in B (e.g., 'addiction to material things' vs 'pattern of compulsive buying'). A also correctly uses 'automatic thought journal' and 'adaptive response' (though B used 'adaptive response' correctly, A's overall flow is superior).
  - [new/style/major] Phrasing like 'addiction to material things' and 'how their family is' sounds like a translation rather than natural English.
  - [new/style/minor] The sentence structure in the second to last paragraph is a bit heavy and 'wordy' compared to the punchy, modern UX style of A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is superior because it strictly adheres to the project's glossary and terminology (e.g., 'automatic thought journal', 'adaptive response'), whereas B uses 'automatic thoughts diary' and 'rational response'. A also preserves the HTML tags and the exact structure of the original, which is critical for implementation.
  - [old/terminology/major] Used 'automatic thoughts diary' instead of the required 'automatic thought journal'; used 'rational response' instead of the required 'adaptive response'.
  - [old/omission/minor] Missing the <li> tags present in the original.
  - [old/style/minor] The tone is slightly more informal/clipped than the original, which is fine for UX but loses some of the instructional nuance of the source.

#### 🟢 en `/vitamins/title` — NEW лучше (2:0)

- **RU**: Ложная депрессия: Как гормоны и витамины влияют на наше эмоциональное здоровье
- **OLD**: “False” Depression: How Hormones and Vitamins Shape Emotional Health
- **NEW**: False Depression: How Hormones and Vitamins Affect Our Emotional Health
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B follows the standard sentence case for titles and uses a more natural, direct verb ('affect'). Translation A uses unnecessary quotation marks and a slightly more poetic but less standard verb ('shape') for a scientific/educational context.
  - [old/style/minor] Unnecessary quotation marks around 'False' make it look like a colloquialism rather than a term; 'Shape' is a bit too metaphorical for this context compared to 'Affect'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is a clean, professional title that follows standard English capitalization and avoids unnecessary punctuation. Translation B uses unnecessary quotation marks around 'False', which can imply sarcasm or doubt in a way that undermines the scientific/educational tone of the article.
  - [old/style/minor] The use of quotation marks around 'False' is non-standard for a title and creates an uncertain tone.
  - [old/omission/minor] Omission of 'our' (наше), though 'Shape Emotional Health' is grammatically correct, 'Affect Our Emotional Health' is a closer and more natural match for the original intent.

#### 🟡 en `/vitamins/description`— вердикт неустойчив

- **RU**: В статье обсуждается, как физическое здоровье, включая гормональный баланс и уровень витаминов, может влиять на эмоциональное состояние человека. Она подчеркивает, что симптомы, часто ассоциируемые с депрессией, могут быть вызваны физическими проблемами, таким…
- **OLD**: This article looks at how physical health—especially hormonal balance and micronutrient levels—can shape our emotional state. It highlights that symptoms often associated with depression may actually be driven by medical issues such as vitamin deficiencies or …
- **NEW**: This article discusses how physical health, including hormonal balance and vitamin levels, can influence a person’s emotional state. It highlights that symptoms often associated with depression can be caused by physical issues, such as specific vitamin deficie…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 86)
  - Translation A sounds much more natural and professional, using sophisticated verbs like 'shape' and 'driven by' instead of repetitive 'can be caused by'. It avoids the clunky 'a person's emotional state' in favor of the more idiomatic 'our emotional state'.
  - [new/style/minor] The phrasing 'influence a person's emotional state' and 'can be caused by' feels slightly more like a direct translation from Russian than a native English article.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is a precise, professional, and faithful rendering of the original text, maintaining the exact tone and structure. Translation B introduces unnecessary stylistic liberties (e.g., 'micronutrient levels' instead of 'vitamin levels', 'endocrine disorders' instead of 'hormonal imbalances') and changes the subject from 'the authors' to 'the article', which slightly shifts the focus.
  - [old/style/minor] Uses 'micronutrient levels' which is a more specific scientific term than the original 'уровень витаминов'.
  - [old/style/minor] Changes 'hormonal imbalances' to 'endocrine disorders', which is a slightly different medical nuance.
  - [old/omission/minor] Omits the mention of 'the authors', replacing it with 'the article'.

#### 🟡 en `/vitamins/screen_2/texts`— вердикт неустойчив

- **RU**: В середине 20 века возникла целая научная дисциплина - психоэндокринология, изучающая взаимосвязь между эндокринной системой человека и его психикой. Есть даже такой термин, психоэндокринный синдром – это нарушение психики, возникающие на фоне эндокринных забо…
- **OLD**: In the mid-20th century, an entire discipline—psychoneuroendocrinology—emerged to study the links between the endocrine system and the mind. There is even the term “psychoendocrine syndrome” to describe psychiatric disturbances that arise in the context of end…
- **NEW**: In the mid-20th century, a whole scientific discipline emerged—psychoendocrinology—which studies the relationship between the human endocrine system and the psyche. There is even a term, psychoendocrine syndrome, which refers to mental disturbances arising fro…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A is much more idiomatic and professional, reading like a high-quality science article. Translation B suffers from several 'translationese' markers and awkward phrasing.
  - [new/style/major] The use of 'the psyche' and 'the human endocrine system' sounds overly academic and heavy compared to the natural 'the mind' and 'the endocrine system' in A.
  - [new/style/major] Phrases like 'decreased mental activity' and 'changes in drives and instincts' are literal translations of Russian terms that sound unnatural in English; A uses 'slowed thinking' and 'motivation and basic drives', which is much better.
  - [new/style/minor] The sentence 'Vitamin deficiency is a condition where the body lacks or completely lacks a certain vitamin' is redundant and clunky.
  - [old/terminology/minor] A adds 'psychoneuroendocrinology' which is a more accurate scientific term than the literal 'psychoendocrinology', though it's a slight addition.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more faithful to the original text's structure and terminology without adding unrequested information. Translation B introduces 'minerals', 'micronutrients', and 'psychoneuroendocrinology', which are additions not present in the source.
  - [old/addition/minor] Added 'minerals' and 'micronutrients' which were not in the Russian text.
  - [old/mistranslation/minor] Changed 'psychoendocrinology' to 'psychoneuroendocrinology'; while more common in English, it is an alteration of the specific term used in the source.
  - [old/style/minor] The phrasing 'deficiency states arise' is slightly clunky/academic compared to the natural flow of A.

#### 🟡 en `/trap/title`— вердикт неустойчив

- **RU**: Техника: Путь из ловушки завышенных ожиданий
- **OLD**: Technique: A Path Out of the Trap of Unrealistic Expectations
- **NEW**: Technique: Escaping the Trap of Unrealistic Expectations
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more punchy and idiomatic for a title, using a dynamic gerund ('Escaping') instead of the wordier noun phrase in A. Both are grammatically correct, but B feels more like a modern app feature or article heading.
  - [old/style/minor] A bit wordy and heavy due to the 'A Path Out of the...' construction, which sounds slightly more like a book title than a technique name.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more faithful to the original metaphor ('Путь' — 'A Path') and sounds more natural as a title for a psychological exercise. Translation A changes the noun 'Path' into a gerund 'Escaping', which slightly alters the tone.
  - [new/style/minor] Changed the noun 'Path' to the gerund 'Escaping', losing the specific imagery of the original title.

#### 🔴 en `/unemployment/screen_4/texts` — OLD лучше (2:0)

- **RU**: Таким образом, хоть и внешние признаки успеха за это время оставались практически неизменными, он смог сохранить свою самооценку и избежать депрессии. Несмотря на то, что его финансовое положение оставалось тяжелым, когда он пришел к решению «признать поражени…
- **OLD**: Even though the usual markers of success barely changed, he preserved his self-respect and avoided a depressive relapse. When he decided to call it quits on the bookstore, his self-esteem remained intact despite the financial strain. By the final therapy sessi…
- **NEW**: In this way, even though the external signs of success remained almost unchanged during this time, he was able to maintain his self-esteem and avoid depression. Despite his difficult financial situation, when he decided to “accept defeat” in his bookstore busi…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 86)
  - Translation B is much more idiomatic and flows like a natural English narrative. It avoids the clunky, literal structures of Translation A (e.g., 'In this way', 'the fact that I am alive') and uses more sophisticated, natural phrasing ('call it quits', 'job hunting', 'welcome bonus').
  - [new/style/major] Heavy use of 'translationese' and wordy constructions like 'In this way', 'the fact that I am alive', and 'the external signs of success remained almost unchanged' which feel unnatural in a narrative context.
  - [new/omission/minor] Missed the nuance of 'пришел к решению' by using a simpler 'decided'.
  - [old/mistranslation/minor] Added 'depressive relapse' which isn't explicitly in the Russian 'избежать депрессии', though it fits the clinical context well.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Translation A is much more idiomatic and reads like a professionally edited English narrative. It avoids the heavy, clunky sentence structures of the Russian original (e.g., 'In this way, even though...') and uses natural phrasing like 'call it quits' and 'job hunting'. Translation B is a bit too literal and 'translationese', especially in the opening and the closing.
  - [new/style/major] The opening 'In this way, even though...' is a heavy calque of 'Таким образом, хоть...'; a native speaker would simply start with 'Even though...' or 'Although...'
  - [new/style/minor] The phrase 'the fact that I am alive' is slightly wordier than the more natural 'my being alive' used in A.
  - [new/style/minor] The closing 'valuable just as you are' is fine, but 'valuable in and of yourself' (in A) better captures the philosophical weight of 'ценны сами по себе'.

#### 🟡 en `/unemployment/screen_1/texts`— вердикт неустойчив

- **RU**: Внезапная потеря работы – сильный стресс для большинства людей. Когда за несколько дней или недель объявляют об увольнении или сокращении, многие испытывают ощущение, что жизнь «рухнула». И это объяснимо, ведь у вас кардинально меняются: <li>финансовое положен…
- **OLD**: Sudden job loss is intensely stressful for most people. When layoffs or terminations are announced with only a few days or weeks’ notice, many feel as if life has collapsed. That’s understandable, because so much changes at once: financial situation social sta…
- **NEW**: Sudden job loss is a major stressor for most people. When a layoff or redundancy is announced, many feel as though their life has “collapsed.” This is understandable, as your life changes fundamentally in several ways: <li>your financial situation</li> <li>you…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A is much more idiomatic and flows like a well-written English article. It uses natural metaphors (hitting an air pocket) and avoids the clunky, literal phrasing found in B. Translation A also correctly handles the list and the Bob Marley quote by integrating it into the flow, whereas B feels like a word-for-word translation of the Russian structure.
  - [new/style/major] The text feels like a translation rather than an original English article. Phrases like 'You are left alone with yourself' and 'The reason for such an emotional reaction lies in...' are heavy and non-idiomatic.
  - [new/omission/minor] The Bob Marley quote was included in the original text but B's formatting/integration is less seamless than A's.
  - [new/style/minor] The list items 'your financial situation', etc., are repetitive and less clean than the concise version in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is more faithful to the original structure and tone, maintaining the list format and the specific nuances of the text. Translation B makes several omissions (the Bob Marley quote, the specific timeframe of 'days or weeks') and uses slightly more aggressive phrasing that deviates from the source.
  - [old/omission/major] The Bob Marley quote is completely missing.
  - [old/omission/minor] The specific mention of 'days or weeks' in the first paragraph is lost.
  - [old/style/minor] The list items lost their HTML tags and the 'your' possessive, making it feel less like a direct translation of the provided source.
  - [old/mistranslation/minor] The translation of 'воздушная яма' as 'air pocket mid-flight' is a bit too literal/clunky compared to the more idiomatic 'freefall' in A.

#### 🟡 en `/trap/screen_2/texts`— вердикт неустойчив

- **RU**: Так что же нужно делать уже сейчас, чтобы избавиться от чувства вины, вызванного завышенными требованиями? <li>Простой, но эффективный способ спастись от завышенных требований к себе подразумевает замену слова «должен» на другие: «Было бы хорошо, если…» или «Е…
- **OLD**: So what can you do right now to ease guilt driven by unrealistic demands? A simple, effective approach is to swap “should” for phrases like “It would be good if…” or “If I can, I’ll…”. These are usually more realistic and less upsetting. For example, instead o…
- **NEW**: So, what can you do right now to ease the guilt caused by these high expectations? <li>A simple but effective way to escape unrealistic self-demands is to replace “should” with phrases like “It would be nice if...” or “If I could, I would...” These are often m…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Translation A is a superior piece of professional writing. It avoids the 'translationese' and clunky phrasing of B, using natural English idioms (e.g., 'waging war against yourself' vs 'fighting against yourself') and correct psychological terminology. A also handles the gender-neutrality of the example much more smoothly for a modern audience.
  - [new/style/major] The translation feels like a literal translation from Russian (e.g., 'The Reality Method' sounds unnatural compared to 'a reality check'; 'it will only leave you feeling...' is wordy).
  - [new/style/minor] Uses 'wife' in the example, whereas A uses 'spouse' which is more inclusive and follows modern UX/content standards for a global market, though B is closer to the literal Russian 'жену'.
  - [new/style/minor] The phrasing 'you should try to avoid this' is slightly more didactic/preachy than the supportive tone requested.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is much more faithful to the original text's structure and specific examples. Translation B takes too many liberties, changing 'wife' to 'spouse' (which changes the tone/context) and adding interpretations (like 'freeing over time') that aren't in the source. A also correctly handles the 'subjunctive mood' section without using overly academic terms like 'counterfactuals' which might alienate a general reader.
  - [old/mistranslation/minor] Changed 'wife' to 'spouse', which alters the specific example provided in the original.
  - [old/addition/minor] Added 'and freeing over time', which is an interpretation not present in the source.
  - [old/style/minor] Used 'counterfactuals' to translate 'сослагательное наклонение'; while technically correct, it is much more academic and less 'warm/supportive' than A's approach for a general audience.

#### 🟡 en `/vitamins/screen_4/texts`— вердикт неустойчив

- **RU**: Другой член команды, девушка, испытывавшая симптомы, похожие на депрессию, выявила железо-дефицитную анемию, лечение которой привело к значительному улучшению её состояния. Она описывала своё состояние следующим образом: «Я постоянно хотела спать, мне ничего н…
- **OLD**: Another teammate—a woman with depression-like symptoms—was found to have iron-deficiency anemia; treatment led to significant improvement. She described it this way: “I was constantly sleepy, didn’t want to do anything or talk to anyone. I felt awful—apathetic…
- **NEW**: Another team member, a young woman experiencing symptoms similar to depression, was diagnosed with iron-deficiency anemia, the treatment of which led to a significant improvement in her condition. She described her experience like this: "I constantly wanted to…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is much more faithful to the original structure and tone, maintaining the narrative flow without unnecessary fragmentation. Translation B introduces significant omissions and stylistic shifts that change the 'voice' of the text.
  - [old/omission/major] The second paragraph of the quote is heavily condensed, losing the emotional weight and the specific sequence of events (the additional tests and the realization).
  - [old/mistranslation/minor] The original says 'предостеречь от неправильных диагнозов' (misdiagnosis), while B says 'caution against premature self-diagnosis', which is a different concept.
  - [old/style/minor] The use of em dashes and fragmented sentences in the first paragraph makes it feel a bit too clipped/journalistic for a supportive 'expert friend' tone.
  - [old/terminology/minor] Uses 'basic labs' which is a bit informal/vague compared to the more precise 'routine blood test' or 'complete blood count' used in A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is much more idiomatic and reads like a professional English article. It avoids the heavy, clunky sentence structures of Translation B (e.g., 'the treatment of which led to...') and uses natural phrasing like 'felt like myself again' and 'get basic labs'.
  - [new/style/major] Heavy, 'translated' feel with excessive use of relative clauses ('the treatment of which', 'that revealed').
  - [new/style/minor] Repetitive sentence structures in the quote ('I constantly wanted... I didn't want... I didn't want...').
  - [new/terminology/minor] Uses 'mental health' which is fine, but A's 'psychological factors' or 'psychological health' context fits the comparison with 'physical health' slightly more elegantly in this specific narrative flow.

#### 🔴 en `/unemployment/description` — OLD лучше (2:0)

- **RU**: Эта статья исследует психологические и социальные последствия внезапной потери работы, рассматривая эмоциональный роллеркостер, который сопровождает такие события. Через личный опыт Александра, долгое время работавшего в успешной компании, рассказывается о бор…
- **OLD**: This article explores the psychological and social impact of sudden job loss, tracing the emotional roller coaster that often follows. Through the story of Alexander, who spent years working at a successful company, it examines the struggle with depression, di…
- **NEW**: This article explores the psychological and social consequences of sudden job loss, examining the emotional rollercoaster that accompanies such events. Through the personal experience of Alexander, who worked for a successful company for a long time, we look a…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B is more idiomatic and professional. It uses better collocations ('impact' instead of 'consequences', 'career setbacks' instead of 'professional setbacks') and avoids the clunky 'we look at' construction in favor of a more natural narrative flow.
  - [new/style/minor] The phrase 'we look at' is a bit informal and shifts the perspective unnecessarily; 'declining self-esteem' is grammatically fine but 'diminished' or 'lowered' sounds more natural in this context.
  - [old/terminology/minor] The translation of 'самопризнание' as 'self-respect' is a slight departure from the likely intended 'self-validation' or 'self-acceptance', but it fits the tone better than a literal translation.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A sounds more natural and professional for an article introduction, using better flow and idiomatic phrasing like 'tracing the emotional roller coaster' and 'move through these challenges'. Translation B is slightly more literal and heavy, with a clunky 'we look at' construction that breaks the formal tone.
  - [new/style/minor] The phrase 'we look at' is a bit too informal/conversational for this narrative style compared to 'it examines'.
  - [new/style/minor] The phrasing 'worked for a successful company for a long time' is a bit wordy and less elegant than A's version.

#### 🟡 en `/unemployment/screen_3/texts`— вердикт неустойчив

- **RU**: Руководство Александра очень хорошо относилось к нему, считали его способным продажником, но он сам относился к себе неоправданно строго. В процессе следующих встреч и работы с мыслями, Александр согласился, что он очень самокритичен к себе, и это никак не пом…
- **OLD**: Alexander’s managers thought highly of him and saw real sales potential—but he judged himself far more harshly. In the sessions that followed, he agreed that his self-criticism was extreme—and that it wasn’t helping in a tough season of life. It was making thi…
- **NEW**: Alexander’s management team thought highly of him and saw him as a capable salesperson, but he was unfairly harsh on himself. Through subsequent sessions and working through his thoughts, Alexander agreed that he was overly self-critical. He realized this wasn…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is much more idiomatic and reads like a professional narrative written by a native speaker. Translation B, while accurate, suffers from several 'translationese' markers and slightly clunky phrasing (e.g., 'provide adaptive responses to his negative thoughts' is a heavy, clinical way to describe the process).
  - [new/style/minor] The phrasing 'provide adaptive responses' is overly clinical and lacks the natural flow of a story.
  - [new/style/minor] Phrases like 'his harsh self-attitude' and 'diminish his human dignity' feel slightly translated from Russian; 'human worth' or 'humanity' is more natural in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is a superior professional text that adheres strictly to the CBT terminology requirements (mental filter, discounting the positive, adaptive responses) and maintains a more accurate, faithful narrative flow. Translation B, while more 'punchy', takes too many liberties with the structure and loses the specific clinical nuances required for this type of content.
  - [old/terminology/major] Failed to use the specific required term 'adaptive response' (used 'respond to' instead) and missed the explicit link between the negative filter and the feeling of uselessness as structured in the original.
  - [old/style/minor] The prose is a bit too fragmented/staccato compared to the original's cohesive narrative style.
  - [old/mistranslation/minor] Translating 'человеческое достоинство' as 'human worth' is acceptable, but 'human dignity' in A is a more precise match for the weight of the original phrase.

#### 🟡 en `/vitamins/screen_3/texts`— вердикт неустойчив

- **RU**: Примеры дефицита витаминов и их симптомы: <li>Витамин D: подавленность, тревога, усталость, перепады настроения.</li> <li>Железо: слабость, утомляемость, одышка, головокружение, онемение.</li> <li>Витамин B12: повышенная утомляемость, анемия, бессонница, сниже…
- **OLD**: Examples of deficiencies and possible symptoms: Vitamin D: low mood, anxiety, fatigue, mood swings. Iron: weakness, tiredness, shortness of breath, dizziness, tingling or numbness. Vitamin B12: pronounced fatigue, anemia, insomnia, reduced appetite, stomach up…
- **NEW**: Examples of vitamin deficiencies and their symptoms: <li>Vitamin D: low mood, anxiety, fatigue, mood swings.</li> <li>Iron: weakness, fatigue, shortness of breath, dizziness, numbness.</li> <li>Vitamin B12: increased fatigue, anemia, insomnia, loss of appetite…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more faithful to the original structure and terminology. Translation B makes several omissions (missing the list of vitamins in the header) and uses slightly less precise phrasing for a medical/educational context.
  - [old/omission/major] The header 'Examples of vitamin deficiencies...' was shortened to 'Examples of deficiencies...', losing the specific mention of vitamins.
  - [old/style/minor] The list items lost their HTML tags, which were present in the original.
  - [old/style/minor] 'emotional ups and downs' is a bit too colloquial for a symptom list compared to 'emotional instability'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and idiomatic for a native speaker. It avoids the clunky, literal phrasing of B (e.g., 'depressive state', 'mental health disorders') and uses better medical/lifestyle vocabulary like 'low mood', 'loss of drive', and 'checking hormone and vitamin status'.
  - [new/style/major] Phrasing like 'depressive state' and 'diagnosing mental health disorders' sounds like a direct translation from Russian and is less natural in English than A's 'mistaken for depression' or 'assessing mental health'.
  - [new/style/minor] The list items in B are slightly more repetitive and clinical, lacking the smooth flow of A.
  - [new/omission/minor] A correctly interpreted the HTML tags as structural elements to be cleaned up for a smooth read, whereas B kept them, which might be a technical requirement but makes the text look unedited.

#### 🟢 en `/trap/description` — NEW лучше (2:0)

- **RU**: В статье рассматривается проблема чувства вины, возникающего из-за нереалистичных требований к себе и постоянной самокритики. Описываются методы переосмысления внутренних установок и замены «долженствования» на более здоровое восприятие личных возможностей и ж…
- **OLD**: This article addresses guilt that stems from unrealistic self-demands and constant self-criticism. It offers ways to rethink inner rules and replace “should statements” with a healthier view of your abilities and preferences. You’ll find practical tips to let …
- **NEW**: This article explores the guilt that arises from setting unrealistic demands on yourself and constant self-criticism. It describes methods for reframing internal attitudes and replacing “should” statements with a more helpful understanding of your actual capab…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and follows the project's specific CBT terminology perfectly, especially regarding 'helpful' vs 'healthier' and the phrasing of 'should statements'.
  - [old/terminology/minor] Uses 'inner rules' instead of the more standard 'internal attitudes' or 'intermediate beliefs' context, and 'should statements' is missing the closing quotation marks used in A.
  - [old/style/minor] The phrasing 'unrealistic self-demands' is slightly less natural than 'setting unrealistic demands on yourself'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and aligns perfectly with the required CBT terminology and tone. It uses 'helpful' instead of 'healthier' (per the 'helpful/unhelpful' rule) and 'reframing' which is more natural for psychological contexts than 'rethink'.
  - [old/terminology/minor] Used 'healthier' instead of the preferred 'helpful' for cognitive reframing context; 'inner rules' is less precise than 'internal attitudes/assumptions'.
  - [old/style/minor] The phrasing 'guilt that stems from' is slightly less fluid than 'guilt that arises from' in this narrative context.

#### 🟢 en `/trap/screen_1/texts` — NEW лучше (2:0)

- **RU**: Чувство вины зачастую возникает из-за завышенных требований к себе и может проявляться в таких мыслях, как: <li>«Я должен сделать это».</li> <li>«Я должна поступить так».</li> <li>«Я должна быть такой».</li> <li>«Я не должен был делать этого».</li> <li>«Я долж…
- **OLD**: Guilt often grows out of excessive demands on yourself and may sound like: “I should do this.” “I should act this way.” “I should be like this.” “I shouldn’t have done that.” “I should have anticipated/known that.” These rigid “should” demands can breed guilt …
- **NEW**: Guilt often stems from the unrealistic demands you place on yourself, manifesting in thoughts such as: <li>“I should do this.”</li> <li>“I should act this way.”</li> <li>“I should be like this.”</li> <li>“I shouldn’t have done that.”</li> <li>“I should have se…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is superior because it preserves the original structure (including HTML tags), uses the canonical CBT term '"should" statements', and maintains the professional yet supportive tone. Translation B omits the Bertrand Russell quote entirely and loses the specific formatting required for the UI/content.
  - [old/omission/critical] The entire Bertrand Russell quote is missing.
  - [old/omission/major] HTML tags (li, important, q) are stripped out, which breaks the content structure.
  - [old/terminology/minor] Uses 'changing thinking patterns' instead of the more natural 'shifting your mindset' or 'changing your thinking'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Translation B is much more complete, preserving all original elements including HTML tags, the important block, and the Bertrand Russell quote. Translation A is a significant omission, cutting out a large portion of the text.
  - [old/omission/critical] Missing the entire <important> block, the final paragraph about regular work, and the Bertrand Russell quote.

#### 🟡 en `/unemployment/screen_2/texts`— вердикт неустойчив

- **RU**: Если и вы так считаете, то вам будет интересен случай Александра — 47-летнего отца троих детей, который проработал 17 лет с отцом своей жены в одной успешной компании. За пару лет до его депрессии между ним и его тестем возникли разногласия по поводу управлени…
- **OLD**: If this resonates, consider Alexander’s story—a 47-year-old father of three who worked for 17 years at his father-in-law’s successful company. A couple of years before his depression, disagreements arose between them about how to run the business. In anger, Al…
- **NEW**: If you feel this way, Alexander’s story might resonate with you. Alexander is a 47-year-old father of three who worked for 17 years at the same successful company as his father-in-law. A couple of years before his depression set in, disagreements arose between…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is much more idiomatic and flows like a professional narrative. It avoids the clunky, repetitive sentence structures found in B and uses more natural phrasing (e.g., 'money grew tighter' vs 'financial situation worsened', 'jumping on the opportunity' vs 'seizing this opportunity').
  - [new/style/minor] The opening is slightly wordy and repetitive ('If you feel this way... might resonate with you').
  - [new/style/minor] Phrasing like 'the management of the company' and 'his salary depended on commissions' is a bit more formal/stiff than the natural tone of A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is superior because it maintains the narrative flow and emotional weight of the original more effectively. It uses more natural, idiomatic phrasing (e.g., 'depression set in', 'sense of inadequacy', 'not cut out for this business') that fits the 'understanding expert' tone. Translation B, while concise, feels slightly clipped and loses some of the nuance in the storytelling.
  - [old/style/minor] The phrasing 'money grew tighter' is a bit informal/cliché compared to the more professional 'financial situation worsened'.
  - [old/style/minor] The transition in the fourth paragraph lacks the '<important>' tag/emphasis structure present in the original, though this might be a formatting choice, it affects the structural fidelity.

#### 🔴 en `/unemployment/title` — OLD лучше (2:0)

- **RU**: Потерять работу и уйти в депрессию?
- **OLD**: Losing Your Job—and Slipping into Depression?
- **NEW**: Losing your job and falling into depression?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B uses an em dash and Title Case, which is more appropriate for a headline/article title, and 'slipping into' is a more idiomatic way to describe the onset of depression than 'falling into'.
  - [new/style/minor] Lacks the punchy headline feel; 'falling into' is acceptable but less idiomatic than 'slipping into' in this context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses an em dash, which creates a better rhetorical rhythm for a headline, effectively separating the cause from the consequence. Translation B is grammatically correct but feels more like a flat sentence than a compelling title.
  - [new/style/minor] Lacks the punchy, dramatic rhythm of a headline; 'falling into' is slightly more generic than 'slipping into' in this context.

#### 🟡 en `/vitamins/screen_1/texts`— вердикт неустойчив

- **RU**: Мы стремимся, чтобы данный раздел максимально помог вам улучшить и облегчить ваше эмоциональное состояние. Поэтому важно обсудить все возможные причины его изменений. Когда речь заходит о депрессии, мы имеем в виду набор определённых симптомов, которые были уп…
- **OLD**: Our goal is to help you feel as emotionally well as possible, so it’s important to consider all the different factors that can influence your mood. When we talk about depression here, we mean a specific set of symptoms described earlier. But those symptoms don…
- **NEW**: We aim to make this section as helpful as possible in improving and easing your emotional state. Therefore, it is important to discuss all possible causes of its changes. When we talk about depression, we are referring to a specific set of symptoms mentioned e…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more faithful to the original text's structure and tone, whereas Translation B takes too many liberties with the phrasing and omits the Socrates quote entirely. A also uses more accurate terminology for the medical descriptions provided.
  - [old/omission/critical] The Socrates quote was completely omitted.
  - [old/mistranslation/major] The original mentions 'psychosis' (психозы), but B uses 'psychotic features', which is a different clinical nuance.
  - [old/style/minor] The transition 'In short' is a bit too informal for the concluding summary of a medical/psychological text compared to 'Thus'.
  - [new/style/minor] The phrase 'causes of its changes' is slightly clunky, though grammatically correct.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 78)
  - Translation A sounds like it was written by a native English speaker, using natural phrasing and professional medical/psychological terminology (e.g., 'underactive thyroid', 'psychotic features', 'slowed thinking'). Translation B is much more literal and suffers from 'translationese', using heavy, clunky structures like 'biological component' and 'causes of its changes'.
  - [new/style/major] Heavy use of literal translations from Russian (e.g., 'biological component', 'causes of its changes', 'decreased mental activity') which sounds unnatural in English.
  - [new/terminology/minor] Used 'psychoendocrinology' instead of the standard 'psychoneuroendocrinology'.
  - [new/omission/minor] Missed the Socrates quote which was present in the original.

