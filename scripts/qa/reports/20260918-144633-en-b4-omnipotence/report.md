# QA: слепое парное сравнение переводов — en-b4-omnipotence

- **Дата**: 2026-09-18T11:46:33.357Z
- **Метка**: en-b4-omnipotence
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/omnipotence.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 59773e25fd9cb826f3e71e3a543930f97721ad28

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/omnipotence.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 10 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 4 | 0 / 3 | 100% |
| **итого** | 10 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 4 | 0 / 3 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×5; OLD — style/minor×6, addition/critical×2, style/major×2, addition/major×2, mistranslation/major×1, mistranslation/critical×1, omission/major×1, terminology/minor×1, mistranslation/minor×1

### Детали пар (для спот-чека)

#### 🟢 en `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Иногда люди называют персонализацию «манией величия», но это не про ощущение силы или значимости. Персонализация — это когда кажется, что происходящее вокруг связано с вами, даже если доказательств этому нет. Внутри это часто ощущается не как власть, а как тре…
- **OLD**: Sometimes people mistakenly refer to the belief in personalization as “megalomania”. However, this does not necessarily indicate illusions of grandeur, but rather reflects a worldview in which a person prone to personalization places themselves at the center o…
- **NEW**: Sometimes people call personalization “grandiosity,” but it’s not about feeling powerful or important. Personalization is when it feels like everything happening around you is connected to you, even when there is no evidence for it. Internally, this often feel…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 98)
  - Translation A is a near-perfect, idiomatic rendering of the original that respects the tone, structure, and CBT terminology. Translation B is a massive hallucination/re-write: it adds significant amounts of text not present in the original, changes the meaning of several sentences, and fails to follow the source structure.
  - [old/addition/critical] Added entire paragraphs and sentences that do not exist in the original (e.g., 'places themselves at the center of the universe', 'feeling guilty towards the entire world').
  - [old/mistranslation/major] Translated 'мания величия' as 'megalomania' (too clinical/heavy) and 'персонализация' as 'belief in personalization', whereas A correctly uses 'grandiosity' and 'personalization'.
  - [old/style/major] The tone is much more academic and wordy, losing the 'understanding friend' vibe of the original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 98)
  - Translation B is a near-perfect adaptation that maintains the warm, supportive tone and the exact structure of the original. Translation A is a heavy, academic rewrite that adds significant amounts of information not present in the source, making it feel like a different article entirely.
  - [old/addition/major] Added entire sentences and complex explanations (e.g., 'places themselves at the center of the universe', 'hidden hostility') that are not in the original.
  - [old/style/major] The tone is overly formal and clinical ('mistakenly refer to', 'consequently'), violating the 'understanding friend' persona.
  - [old/mistranslation/minor] Used 'megalomania' instead of a more natural way to express the comparison, and changed the core meaning of the examples in the list.

#### 🟢 en `/exercise/screen_3/texts` — NEW лучше (2:0)

- **RU**: Несколько упражнений, которые могут помочь: <h2>Взгляд со стороны</h2> Представьте, что подруга рассказывает вам такую же ситуацию. Что бы вы ей сказали? Как бы вы поддержали её? Точно так же можно поддержать и себя. <h2>Фраза «если бы…»</h2> Дополняйте мысль:…
- **OLD**: You can also use the following exercises to work on your belief: <h2>Applying an External Perspective</h2> Imagine a friend tells you that his colleague didn’t greet him in the morning. How would you react? What would you say to him? What advice would you give…
- **NEW**: A few exercises that may help: <h2>A New Perspective</h2> Imagine a friend is telling you about the same situation. What would you say to them? How would you support them? You can offer that same support to yourself. <h2>The “What if...” Phrase</h2> Complete t…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 45 / NEW 96)
  - Translation A is a faithful, high-quality translation that respects the original text's structure, tone, and meaning. Translation B is a complete hallucination/rewrite: it introduces entirely new examples (colleagues, projects) that were never in the source, changes the core message, and fails as a translation.
  - [old/mistranslation/critical] The translator completely replaced the original content with new, unrelated examples (colleagues, project failure) instead of translating the source.
  - [old/addition/major] Added significant amounts of text and advice not present in the original.
  - [old/style/major] The tone shifts from a supportive guide to a more didactic/preachy tone ('you are not the center of the universe').
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 55 / NEW 98)
  - Translation B is a faithful, professional, and idiomatic translation that adheres to all CBT terminology and tone guidelines. Translation A is a complete hallucination; it replaces the original text with entirely different examples (colleagues, project failure) and adds significant amounts of unsolicited advice and content not present in the source.
  - [old/addition/critical] The translator added entirely new scenarios (colleagues, project failure) and advice that were not in the original text.
  - [old/mistranslation/major] The core examples and the structure of the exercises were completely changed, losing the original meaning.
  - [old/style/major] The tone becomes overly preachy ('you are not the center of the universe') which violates the 'understanding friend' tone guide.

#### 🟢 en `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: Поможет серия вопросов: <li>Должна ли я действительно винить себя?</li> <li>Было ли это под моим контролем?</li> <li>За что именно я могу отвечать? И где проходит граница моей ответственности?</li> <li>Какие другие причины могли повлиять на ситуацию?</li> Прим…
- **OLD**: Use the following questions for analysis: <li>Do I need to blame myself for what happened?</li> <li>Was I in a position to control this?</li> <li>Am I really responsible for everything? Or just part of the problem? Which part exactly?</li> <li>What other reaso…
- **NEW**: A series of questions can help: <li>Should I really be blaming myself?</li> <li>Was this within my control?</li> <li>What exactly am I responsible for? Where is the boundary of my responsibility?</li> <li>What other reasons could have influenced the situation?…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 96)
  - Translation B is a faithful, concise, and natural translation that adheres to the original structure and tone. Translation A suffers from massive 'additions' (hallucinating extra sentences in the example and analysis sections) which significantly deviates from the source and ruins the UX flow.
  - [old/addition/critical] Added a large amount of text in the 'Example' and 'Analyze' sections that was not in the original (e.g., 'It seems she doesn’t like me...', 'I can only prove otherwise if I ask her directly').
  - [old/style/minor] The tone becomes overly wordy and loses the punchy, supportive 'expert friend' feel of the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 96)
  - Translation A is a faithful, professional, and idiomatic translation that respects the original text's structure and tone. Translation B is a massive hallucination/re-write: it adds significant amounts of new content (the 'she doesn't like me' part), changes the meaning of the questions, and completely alters the structure of the analysis section, which is a critical error.
  - [old/addition/critical] Added a large amount of text in the example and analysis sections that was not in the original.
  - [old/mistranslation/major] The questions and analysis points were heavily rephrased, losing the original's concise and direct nature.
  - [old/style/major] The tone becomes wordy and repetitive, deviating from the 'expert friend' UX standard.

#### 🟢 en `/exercise/title` — NEW лучше (2:0)

- **RU**: Выход из ловушки «Все из-за меня»
- **OLD**: The Escape from the Trap of “It’s All My Fault”
- **NEW**: Breaking the “It’s all my fault” trap
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A is punchy, idiomatic, and follows the standard English style for article titles or headers. Translation B is overly wordy and sounds like a literal translation of the Russian noun-heavy structure.
  - [old/style/minor] Too many prepositions ('from the trap of') makes it heavy and less engaging for a reader.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B is more idiomatic and punchy for a title, using a dynamic gerund ('Breaking') instead of the heavy noun phrase ('The Escape from') used in A. B also follows sentence case more naturally for a modern article title.
  - [old/style/minor] Sounds a bit too formal and heavy ('The Escape from the Trap of...') compared to natural English editorial style.

#### 🟡 en `/title`— вердикт неустойчив

- **RU**: Виноват всегда я? Иллюзия всемогущества
- **OLD**: Is It Always My Fault? The Illusion of Omnipotence
- **NEW**: Is it always my fault? The illusion of omnipotence
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - Translation A correctly uses Title Case for the headline, which is the standard for article titles in English. Translation B uses sentence case, which is less common for a standalone title/headline of this nature.
  - [new/style/minor] Uses sentence case for a title, which makes it look more like a sentence than a headline.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A follows the sentence case rule for titles/headings as specified in the instructions, whereas Translation B uses Title Case, which is less appropriate for this context.
  - [old/style/minor] Uses Title Case instead of sentence case for the heading

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: <h2>Откуда появляется персонализация?</h2> Этот тип убеждений формируется ещё в детстве. Известно, что мышление детей эгоцентрично, а значит, ребёнок искренне считает себя причиной всего происходящего вокруг. Например, для детей трёх-четырёх лет совершенно нор…
- **OLD**: <h2>Where does personalization come from?</h2> This type of belief begins to form in childhood. It is well known that children’s thinking is egocentric — a child sincerely believes they are the cause of everything that happens around them. For a three- or four…
- **NEW**: <h2>Where does personalization come from?</h2> This type of belief often forms during childhood. It is well known that children’s thinking is egocentric, meaning a child sincerely believes they are the cause of everything happening around them. For example, fo…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A is more idiomatic and flows better as a narrative text. It handles the Bulgakov quote with much more natural English phrasing, whereas B's version is a bit stiff and literal. A also uses better sentence structures for the psychological explanations.
  - [new/style/minor] The quote translation 'if you do not consider yourself omnipotent' is grammatically correct but sounds like a textbook; A's 'unless you secretly believe you are all-powerful' captures the literary essence much better.
  - [new/style/minor] The phrase 'attributing all negative events to their own guilt' is slightly less natural than A's 'blaming themselves for every negative event'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more polished and follows the source text's structure and tone more accurately. Translation B makes several stylistic choices that feel slightly less natural or deviate from the original meaning (e.g., 'unless you secretly believe' in the quote is a significant departure from the original 'if you do not consider yourself').
  - [old/mistranslation/major] The Bulgakov quote 'unless you secretly believe' adds a layer of 'secrecy' not present in the original 'if you do not consider yourself'.
  - [old/style/minor] The phrasing 'thinking is especially vulnerable to distortions' is a bit more academic/heavy than the original Russian.
  - [old/style/minor] The transition 'For a three- or four-year-old' is slightly less smooth than A's 'For three- or four-year-olds'.

#### 🟡 en `/screen_1/texts`— вердикт неустойчив

- **RU**: В любой ситуации, каким бы ни был результат — причина этому я. Не успел на поезд — долго собирался. Люди напротив в метро смеются — наверняка надо мной. У партнёра нет настроения — значит, я сделал что-то не так. Знакомо? Если да, то мы имеем дело с убеждением…
- **OLD**: In any situation, whatever the outcome, it must somehow be my doing. Missed the train — I must have taken too long getting ready. People sitting across from me on the subway are laughing — they must be laughing at me. My partner is in a bad mood — I must have …
- **NEW**: In any situation, no matter the outcome — I am the cause. I missed my train — it’s because I took too long to get ready. People on the subway are laughing — they must be laughing at me. My partner is in a bad mood — I must have done something wrong. Sound fami…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A is more idiomatic and captures the 'voice' of the original much better. Its rendering of the examples (e.g., 'it must somehow be my doing') feels like natural English storytelling, whereas B is slightly more literal and stiff. A also handles the list items with better flow.
  - [new/style/minor] The phrase 'I am the cause' in the opening is a bit clunky/stiff compared to A's more natural 'it must somehow be my doing'.
  - [new/style/minor] The transition 'As a result, you suffer' is a bit heavy-handed compared to the more seamless 'Yet you keep tormenting yourself' in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more idiomatic and flows better as a cohesive narrative. It uses natural phrasing like 'Sound familiar?' and 'It's all about me', whereas B feels slightly more fragmented and uses clunky constructions like 'omnipotence and limitless power' (redundant) and 'how does personalization show up' (less professional than 'manifest').
  - [old/style/minor] Redundancy in 'omnipotence and limitless power' which sounds unnatural in English.
  - [old/style/minor] The phrase 'How does personalization show up?' is a bit too informal/colloquial for this context compared to 'manifest'.
  - [old/style/minor] The sentence 'Every one of us encounters...' is slightly more heavy-handed than the smoother 'We have all experienced...' in A.

#### 🟢 en `/exercise/description` — NEW лучше (2:0)

- **RU**: Статья объясняет, что такое персонализация — привычка воспринимать события как связанные лично с собой. Вы узнаете, почему это мышление вызывает ненужное чувство вины и тревогу, и как шаг за шагом развить более здоровый взгляд на ситуации. Представленные техни…
- **OLD**: The article examines the phenomenon of personalization—the tendency to perceive events as personally related to oneself. It discusses methods to reduce the negative consequences of such thinking, including self-observation and situational analysis. The author …
- **NEW**: This article explains what personalization is — the habit of perceiving events as being personally connected to you. You’ll learn why this thinking pattern causes unnecessary guilt and anxiety, and how to step-by-step develop a more helpful perspective. The te…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 98)
  - Translation B is a faithful and idiomatic rendering of the original text, maintaining the warm, supportive tone and all key points. Translation A is a significant omission/re-write, adding information not present in the original (self-observation, situational analysis) and losing the specific emotional benefits mentioned.
  - [old/omission/major] Missing the specific mention of anxiety, the step-by-step process, and the goal of separating facts from thoughts.
  - [old/addition/major] Added specific methods (self-observation, situational analysis) that are not in the source text.
  - [old/style/minor] The tone is too academic/dry ('examines the phenomenon') compared to the original's supportive tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 96)
  - Translation A is a faithful, high-quality transcreation that follows all CBT terminology guidelines and maintains the warm, supportive tone of the original. Translation B is a significant hallucination/omission: it completely changes the content, adding information not present in the source (self-observation, situational analysis) and omitting the specific benefits mentioned (separating facts from thoughts, inner peace).
  - [old/omission/critical] Missed the entire second half of the original text regarding specific techniques and benefits.
  - [old/addition/major] Added specific methods (self-observation, situational analysis) that were not in the source.
  - [old/style/major] The tone shifted from a supportive 'you' to a dry, academic third-person description ('The article examines...', 'The author offers...').
  - [old/terminology/minor] Used 'personally related to oneself' which is more clunky than the idiomatic 'personally connected to you'.

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: Например: <li>Представьте, что вы зашли в магазин, и на кассе продавец грубо вам ответил. Вместо того чтобы подумать, что у продавца мог быть плохой день или он просто грубиян, вы начинаете корить себя: «Наверное, я сказал или сделал что-то не так».</li> <li>Н…
- **OLD**: For example: <li>Imagine you walk into a store and the cashier speaks to you rudely. Instead of thinking that they might be having a bad day or are simply rude, you start blaming yourself: “I must have said or done something wrong.”</li> <li>You meet up with f…
- **NEW**: For example: <li>Imagine you walk into a shop and the cashier is rude to you. Instead of thinking they might be having a bad day or are just an unkind person, you start blaming yourself: “I must have said or done something wrong.”</li> <li>An acquaintance you …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is much more idiomatic and follows the UX guidelines for a warm, supportive tone. It uses natural contractions (don't, isn't) and avoids the stiff, slightly academic phrasing found in B. Translation A also handles the CBT-related nuances and the quote more gracefully.
  - [old/style/minor] Avoids contractions (do not, it does not), making it feel more formal/stiff than the target 'understanding friend' tone.
  - [old/style/minor] The translation of the quote is a bit wordy and less impactful than A.
  - [old/terminology/minor] 'Victim position' is a literal translation of 'позиция жертвы'; 'Victim mentality' (used in A) is the standard English idiom.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A is more idiomatic and maintains a better flow for a psychological article. It uses more natural phrasing like 'not welcome' and 'seeing the bigger picture'. Translation B has a few clunky spots, such as 'An acquaintance... is invited' (passive/awkward) and 'Victim mentality' (which is common, but 'Victim position' or 'playing the victim' fits the context of a cognitive state better, though B's 'mentality' is acceptable). A's handling of the quote is also more elegant.
  - [new/style/minor] The second bullet point is phrased awkwardly compared to the original and A.
  - [new/style/minor] The translation of 'переглядываются' as 'whispering' is a slight shift in meaning from 'exchanging glances'.
  - [new/style/minor] The quote translation is a bit more literal/stiff than A.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: Эта статья исследует психологическое явление персонализации — убеждение, что вы являетесь причиной всего происходящего вокруг. В тексте раскрываются механизмы этого мышления, его негативные последствия, такие как стресс, тревожность, низкая самооценка и пробле…
- **OLD**: This article explores the psychological phenomenon of personalization—the belief that you are the cause of everything that happens around you. It explains how this thinking style works and how it leads to stress, anxiety, low self-esteem, and difficulties in r…
- **NEW**: This article explores the psychological phenomenon of personalization — the belief that you are the cause of everything happening around you. It examines the mechanisms of this thinking pattern and its negative consequences, such as stress, anxiety, low self-e…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more professional and follows the stylistic requirements for an article (better flow and rhythm). Translation B feels slightly more repetitive and uses 'unnecessary guilt' instead of the more accurate 'unfounded guilt'.
  - [old/style/minor] The sentence structure is a bit repetitive ('It explains... how it leads... The article also looks... and offers...') compared to the smoother flow of A.
  - [old/mistranslation/minor] Using 'unnecessary guilt' instead of 'unfounded guilt' (необоснованная вина) slightly shifts the nuance from 'lack of basis' to 'not needed'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and professional, using superior vocabulary like 'mechanisms', 'thinking pattern', and 'roots'. Translation A is slightly more repetitive and uses 'unnecessary guilt', which is a weaker choice than 'unfounded guilt' for a psychological context.
  - [old/style/minor] The phrasing 'how this thinking style works' is a bit more colloquial/simple compared to the more professional 'mechanisms of this thinking pattern' in B.
  - [old/terminology/minor] Used 'unnecessary guilt' instead of 'unfounded guilt', which is a more precise translation of 'необоснованной'.

