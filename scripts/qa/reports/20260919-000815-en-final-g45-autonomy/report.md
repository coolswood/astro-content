# QA: слепое парное сравнение переводов — en-final-g45-autonomy

- **Дата**: 2026-09-18T21:08:15.663Z
- **Метка**: en-final-g45-autonomy
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/distortions/autonomy.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/autonomy.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 10 | 🟢 6 | 🔴 1 | ⚪ 0 | 🟡 3 | 0 / 0 | 86% |
| **итого** | 10 | 🟢 6 | 🔴 1 | ⚪ 0 | 🟡 3 | 0 / 0 | 86% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×6, omission/minor×1; OLD — style/minor×13, terminology/minor×4

### Детали пар (для спот-чека)

#### 🟡 en `/screen_1/texts`— вердикт неустойчив

- **RU**: Кажется, что вопрос абсурдный. Как можно выбрать несчастье? Ведь все мы хотим быть счастливыми, но иногда перекладываем ответственность за своё счастье на обстоятельства, других людей, судьбу или проблемы. Если вы замечали у себя следующие мысли: <li>Мне сужде…
- **OLD**: At first glance, the question sounds absurd. How could anyone consciously choose unhappiness? We all want to be happy, yet at times we shift responsibility for our happiness onto circumstances, other people, fate, or problems. If you have ever caught yourself …
- **NEW**: It might seem like an absurd question. How can you choose to be unhappy? After all, we all want to be happy, but sometimes we shift the responsibility for our well-being onto circumstances, other people, fate, or our problems. If you’ve noticed yourself having…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more idiomatic and flows better as a cohesive piece of psychological educational content. It avoids the slightly clunky 'human beings' phrasing in B and uses more natural phrasing like 'making the best of everything you have' and 'life satisfaction depends on... by only 10-15%'.
  - [old/style/minor] The phrase 'one of the most important tasks for us as human beings' is a bit wordy and heavy compared to the original.
  - [old/style/minor] The quote translation 'Happy is not the one...' is grammatically awkward; 'Happiness is not...' or 'The happy person is not...' would be more natural.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more idiomatic and flows like a high-quality English article. It handles the nuance of the text (e.g., 'caught yourself thinking', 'remains resilient') much better than B, which feels slightly more fragmented. A also captures the rhythm of the Confucius quote more elegantly.
  - [new/style/minor] The phrasing 'Happiness is not having everything' is a bit blunt compared to the more polished 'Happy is not the one...' or 'True happiness is not...'
  - [new/style/minor] The sentence structure in the final paragraph is slightly clunky compared to the smoother flow in A.

#### 🟢 en `/exercise/description` — NEW лучше (2:0)

- **RU**: Статья призывает отказаться от роли жертвы обстоятельств и взять ответственность за свою жизнь, контролируя свои мысли и действия. Автор предлагает практику ведения дневника, чтобы осознать ограничивающие убеждения, и развивать проактивное мышление с помощью п…
- **OLD**: The article encourages abandoning the role of a victim of circumstances and taking responsibility for your life by controlling your thoughts and actions. The author suggests practicing journaling to identify limiting beliefs and develop proactive thinking thro…
- **NEW**: This article encourages you to let go of a victim mindset and take charge of your life by managing your thoughts and actions. It suggests using journaling to identify unhelpful beliefs and developing a proactive mindset through targeted questioning. Moving tow…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B uses much more natural, idiomatic English ('let go of a victim mindset', 'take charge of your life') and adheres to the project's terminology ('unhelpful beliefs' instead of 'limiting beliefs').
  - [old/terminology/minor] used 'limiting beliefs' instead of the preferred 'unhelpful beliefs'
  - [old/style/minor] sounds slightly more like a literal translation ('abandoning the role of a victim of circumstances') rather than a natural English narrative
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A sounds like a natural, professional English article summary, whereas Translation B is a heavy, literal translation of the Russian sentence structure (calque).
  - [old/style/major] Phrases like 'abandoning the role of a victim of circumstances' and 'transitioning to an active position' are clunky and sound like a direct translation from Russian.
  - [old/terminology/minor] Used 'limiting beliefs' instead of the project-standard 'unhelpful beliefs'.
  - [old/style/minor] Missing the article 'the' before 'gradual achievement'.

#### 🟡 en `/title`— вердикт неустойчив

- **RU**: Быть несчастным: выбор или обстоятельства?
- **OLD**: Being Unhappy: A Matter of Choice or Circumstance?
- **NEW**: Unhappiness: choice or circumstance?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is punchy, concise, and follows the standard English style for article titles or thought-provoking headings. Translation B is slightly wordy and uses Title Case in a way that feels more like a formal essay title than a modern, engaging headline.
  - [old/style/minor] The addition of 'A Matter of' makes the title feel a bit heavy and cliché compared to the directness of the original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A sounds more like a professional article title or a thoughtful essay heading, whereas B is a bit too abrupt. A uses a more idiomatic structure ('A Matter of...') that fits the reflective tone of the original.
  - [new/style/minor] Lacks the rhythmic flow and sophistication of a proper title; feels slightly clipped.

#### 🟢 en `/exercise/title` — NEW лучше (2:0)

- **RU**: Как перестать быть жертвой и взять ответственность за свое счастье?
- **OLD**: How to Stop Being a Victim and Take Responsibility for Your Happiness?
- **NEW**: How to stop being a victim and take responsibility for your happiness?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Translation A follows the sentence case rule for titles/questions as specified in the instructions, whereas Translation B uses Title Case, which is less common for general questions in this UX context.
  - [old/style/minor] Uses Title Case instead of sentence case
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Translation B follows the sentence case rule for titles/headings as specified in the instructions, whereas Translation A uses Title Case, which is less common for article-style questions in this UX context.
  - [old/style/minor] Uses Title Case instead of sentence case for a question/heading.

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Важно честно ответить себе на вопрос: воспринимаете ли вы себя как хозяина своей жизни или как жертву обстоятельств? Управляете ли вы событиями своей жизни, или они происходят без вашего участия? Подумайте о следующих различиях: <li>Вы думаете или за вас думаю…
- **OLD**: It’s important to answer honestly: do you see yourself as the author of your own life or as a victim of circumstances? Do you steer what happens in your life, or do events unfold without much involvement from you? Reflect on the following contrasts: <li>Do you…
- **NEW**: It’s important to be honest with yourself: do you see yourself as the author of your own life or as a victim of circumstances? Do you feel in control of your life, or do things just happen to you? Consider these differences: <li>Do you think for yourself, or d…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and aligns better with the project's specific CBT terminology and UX tone. Specifically, B uses 'unhelpful belief' (as per glossary) instead of 'irrational belief', and 'mental well-being' instead of 'well-being'. It also uses more natural English phrasing like 'living life to the fullest' and 'feel in control'.
  - [old/terminology/minor] Used 'irrational belief' instead of the preferred 'unhelpful belief'; used 'well-being' instead of 'mental well-being'.
  - [old/style/minor] Phrasing like 'Do you steer what happens in your life' is slightly clunky compared to 'Do you feel in control'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is superior due to its natural flow, better use of CBT terminology ('unhelpful belief' instead of 'irrational belief'), and more idiomatic phrasing. It sounds like a professional English article rather than a translation.
  - [old/terminology/minor] Used 'irrational belief' instead of the preferred 'unhelpful belief' for a softer, non-judgmental tone.
  - [old/style/minor] 'it's their fault' is a slight deviation from 'это из-за них' (it's because of them), though acceptable.
  - [old/style/minor] 'The victim position is the exact opposite' is slightly clunkier than A's 'A victim is the complete opposite'.

#### 🟢 en `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Принятие ответственности</h2> После того как вы выявили свои модели поведения, примите решение взять на себя ответственность за свою жизнь. Признайте, что вы контролируете свои реакции и действия, независимо от обстоятельств. Осознайте, что вы не являетесь…
- **OLD**: <h2>Taking responsibility</h2> Once you have identified your behavior patterns, make the decision to take responsibility for your life. Acknowledge that you control your reactions and actions, regardless of circumstances. Understand that you are not a victim o…
- **NEW**: <h2>Taking responsibility</h2> Once you’ve identified your behavioral patterns, make the decision to take responsibility for your life. Acknowledge that you control your reactions and actions, regardless of the circumstances. Realize that you are not a victim …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and follows the 'supportive expert' tone much better. It uses natural contractions (you've, don't) and avoids the slightly clunky, literal phrasing found in A (e.g., 'reject the victim mentality' vs the more natural 'letting go of a victim mindset'). B also correctly uses English quotation marks instead of the Russian-style guillemets used in A.
  - [old/style/minor] Uses guillemets (« ») instead of English quotation marks (“ ”).
  - [old/style/minor] Phrasing like 'reject the victim mentality' sounds a bit stiff/translated compared to 'letting go of a victim mindset'.
  - [new/style/minor] In the list of goals, B switches to 'my' (e.g., 'Improve my diet'), which is a slight stylistic departure from the imperative/infinitive structure of the original, but it makes sense in the context of an essay/example list.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more natural and follows all UX/style guidelines, including the use of proper English quotation marks and contractions. Translation B uses Russian-style guillemets (« »), which is a critical typographic error for the target market, and contains several clunky, non-idiomatic phrases.
  - [old/style/major] Used Russian guillemets (« ») instead of English quotation marks (“ ”).
  - [old/style/minor] Phrasing like 'Example of a goal and desire list' and 'get rid of the victim mentality' is less idiomatic than A's 'Example list of goals and desires' and 'move away from a victim mindset'.
  - [old/style/minor] Lack of contractions (e.g., 'do not' instead of 'don't') makes the tone feel slightly too formal/stiff for a supportive app.

#### 🟢 en `/exercise/screen_3/texts` — NEW лучше (2:0)

- **RU**: <h2>Ограничьте использование риторических вопросов</h2> Риторические вопросы, на которые не ожидается ответа, могут укреплять менталитет жертвы. Старайтесь избегать их и сосредотачивайтесь на вопросах, которые побуждают искать решения и брать ответственность з…
- **OLD**: <h2>Limit the use of rhetorical questions</h2> Rhetorical questions, which don’t expect an answer, can reinforce the victim mentality. Try to avoid them and focus on questions that encourage seeking solutions and taking responsibility for your life. <h2>Be pat…
- **NEW**: <h2>Limit the use of rhetorical questions</h2> Rhetorical questions that don’t expect an answer can reinforce a victim mindset. Try to avoid them and focus on questions that encourage you to seek solutions and take responsibility for your life. <h2>Be patient<…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more idiomatic and follows the project's tone guidelines perfectly, using 'victim mindset' and 'adaptive patterns' which are standard in CBT. Translation B uses 'victim mentality' (less common in this context) and has slightly clunky phrasing.
  - [old/terminology/minor] Uses 'victim mentality' instead of the more natural 'victim mindset'.
  - [old/style/minor] The phrasing 'encourage seeking solutions' is slightly less fluid than 'encourage you to seek solutions'.
  - [old/style/minor] Uses 'constructive' instead of the preferred 'adaptive' for behavior patterns.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and aligns better with CBT terminology. It uses 'adaptive patterns' instead of 'constructive' and 'mindfully' instead of 'consciously', which sounds more natural in a mental health context. It also correctly uses 'victim mindset' and 'take charge of your life', which flows better than A.
  - [old/terminology/minor] Used 'constructive' instead of the more standard CBT 'adaptive' for behavior patterns.
  - [old/style/minor] The phrasing 'create the ability to respond... more consciously' is slightly heavy/clunky compared to B's 'create the opportunity to respond... more mindfully'.

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: Современные психологические исследования показывают, что источник счастья находится не столько во внешних факторах, сколько внутри нас. Высокие ожидания могут негативно влиять на наше счастье. Люди с высокими ожиданиями часто стремятся к совершенству и постоян…
- **OLD**: Contemporary psychological research suggests that the source of happiness lies less in external factors and more within us. High expectations can have a negative impact on our happiness. People with high expectations often strive for perfection and constantly …
- **NEW**: Modern psychological research shows that the source of happiness lies not so much in external factors as within ourselves. High expectations can negatively impact our well-being. People with high expectations often strive for perfection and constantly feel the…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 86)
  - Translation A is more idiomatic and flows better as a piece of long-form content. It uses more natural phrasing like 'postponing happiness' and 'chase perfection'. Translation B feels slightly more literal and 'stiff' in several places.
  - [new/style/minor] The phrase 'not so much in... as within ourselves' is a bit clunky compared to 'lies less in... and more within us'.
  - [new/style/minor] 'The happiness paradox' is grammatically fine, but 'The paradox of happiness' (as in A) sounds more natural for a heading.
  - [new/style/minor] 'Waiting for happiness' is a bit more literal than 'postponing happiness', which captures the psychological nuance better.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and flows better as a cohesive article. It uses more natural phrasing (e.g., 'gratitude practice', 'accepting reality') and avoids the slightly clunky constructions found in B.
  - [old/style/minor] The phrase 'it will always seem as if you would only be happy with much more' is wordy and less impactful than A's version.
  - [old/style/minor] 'postponing happiness for the future' is a bit of a stretch from the original 'ждать счастья в будущем'.
  - [old/style/minor] 'the less we chase perfection' is okay, but 'strive for perfection' in A is more standard for this context.

#### 🔴 en `/description` — OLD лучше (2:0)

- **RU**: Статья рассматривает идею, что истинное счастье не зависит от внешних обстоятельств, а скорее от внутреннего восприятия и личных решений. Она подчеркивает, что привязанность к высоким ожиданиям и внешним факторам делает нас уязвимыми к неудовлетворённости, тог…
- **OLD**: This article explores the idea that genuine happiness depends less on external circumstances and more on our inner perspective and personal choices. It emphasizes that clinging to high expectations and external factors makes us vulnerable to dissatisfaction, w…
- **NEW**: This article explores the idea that true happiness depends less on external circumstances and more on internal perception and personal choices. It highlights how clinging to high expectations makes us vulnerable to dissatisfaction, whereas accepting reality an…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A flows much more naturally for a native reader, using better collocations like 'stable, lasting happiness' and 'fuller, more satisfying life'. Translation B feels slightly more academic and contains a minor omission regarding the responsibility for happiness.
  - [new/omission/minor] Missed 'responsibility for your own happiness' (only mentioned responsibility for internal state).
  - [new/style/minor] The phrase 'internal perception' is a bit more clinical/stiff than 'inner perspective'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B is more idiomatic and closer to the original's nuance. It correctly includes 'external factors' which A omitted, and uses more natural phrasing like 'inner perspective' and 'emotional state' instead of the slightly more clinical 'internal perception/state'.
  - [new/omission/minor] Missed 'внешним факторам' (external factors) in the second sentence.
  - [new/style/minor] 'Internal perception' and 'internal state' sound slightly more academic/clinical than the warmer 'inner perspective' and 'emotional state' preferred for this tone.

#### 🟢 en `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Убеждение «я жертва обстоятельств» основывается на том, что вы считаете: внешние факторы, такие как жизненная ситуация, отношения, возраст, финансы, здоровье или другие обстоятельства, ограничивают ваши возможности и мешают вам быть полноценным и счастливым. Х…
- **OLD**: The belief that «I am a victim of circumstances» is based on the idea that external factors, such as life situation, relationships, age, finances, health, or other circumstances, limit your opportunities and prevent you from being fulfilled and happy. Although…
- **NEW**: The belief that “I am a victim of circumstances” is based on the idea that external factors—such as your life situation, relationships, age, finances, health, or other circumstances—limit your opportunities and prevent you from living a full and happy life. Wh…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more idiomatic and aligns perfectly with the project's tone and terminology. It uses 'mental well-being' instead of 'emotional states', 'unhelpful' instead of 'useless', and 'Start journaling' instead of the clunkier 'Start keeping a journal'.
  - [old/terminology/minor] Used 'emotional states' instead of the preferred 'mental well-being'.
  - [old/style/minor] Used 'useless' for thoughts, whereas 'unhelpful' is the standard CBT-aligned tone.
  - [old/style/minor] The phrase 'more freeform type of writing' is slightly wordy/clunky compared to 'free-form style'.
  - [old/style/minor] Used 'cliché' as a noun/adjective in a way that feels slightly less natural than 'sound cliché'.
  - [new/style/minor] The phrase 'breaking the cycle of self-victimization' is a slight addition/transcreation of 'перестать считать себя жертвой', but it fits the professional tone perfectly.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A follows all stylistic and technical guidelines: it uses correct English quotation marks, follows the 'mental well-being' terminology, and uses natural, idiomatic phrasing ('breaking the cycle of self-victimization', 'unhelpful'). Translation B uses Russian-style guillemets (« »), which is a violation of the typography rules, and uses less natural phrasing like 'emotional states' and 'useless'.
  - [old/style/major] Used Russian guillemets (« ») instead of English quotation marks (“ ”).
  - [old/terminology/minor] Used 'emotional states' instead of the preferred 'mental well-being'.
  - [old/style/minor] Used 'useless' for thoughts; 'unhelpful' is the standard CBT term and more supportive in tone.

