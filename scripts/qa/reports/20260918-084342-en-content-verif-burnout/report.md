# QA: слепое парное сравнение переводов — en-content-verif-burnout

- **Дата**: 2026-09-18T05:43:42.482Z
- **Метка**: en-content-verif-burnout
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: tests/burnout.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 22
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 431bd08c6c487840271a919950ac699dadad71e1

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/burnout.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 11 | 🔴 2 | ⚪ 0 | 🟡 7 | 0 / 0 | 85% |
| **итого** | 20 | 🟢 11 | 🔴 2 | ⚪ 0 | 🟡 7 | 0 / 0 | 85% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×3; OLD — style/minor×17, addition/minor×3, style/major×2, mistranslation/major×1, mistranslation/minor×1

### Детали пар (для спот-чека)

#### 🟢 en `/steps_description/22/text` — NEW лучше (2:0)

- **RU**: Термин "эмоциональный вампиризм" в психологии описывает людей, которые истощают энергию окружающих, часто перекладывая на них свои проблемы.
- **OLD**: The term “emotional vampirism” in psychology describes people who drain the energy of those around them, often shifting their problems and emotional burden onto others.
- **NEW**: In psychology, the term "emotional vampirism" describes people who drain the energy of those around them, often by offloading their own problems onto others.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation A is more concise and stays closer to the original structure without adding unnecessary words. Translation B introduces 'emotional burden', which is an addition not present in the source.
  - [old/addition/minor] added 'and emotional burden' which is not in the original text
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more concise and idiomatic, avoiding the redundant 'and emotional burden' found in A, which makes the sentence flow better for a native reader.
  - [old/addition/minor] Added 'and emotional burden', which isn't in the original and makes the sentence slightly wordy.

#### 🟡 en `/steps_description/21/text`— вердикт неустойчив

- **RU**: Компания Google предлагает своим сотрудникам курс "Search Inside Yourself", который обучает навыкам осознанности и эмоционального интеллекта для лучшего управления стрессом и эмоциями на работе.
- **OLD**: Google offers its employees the “Search Inside Yourself” course, which teaches mindfulness and emotional intelligence skills to better manage stress and emotions at work.
- **NEW**: Google offers its employees a course called "Search Inside Yourself," which teaches mindfulness and emotional intelligence skills to better manage stress and emotions at work.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A uses a more natural and fluid structure for introducing a title ('a course called...'). Translation B is grammatically correct but feels slightly more heavy/clunky due to the noun-stacking.
  - [old/style/minor] The construction 'the [Name] course' is slightly less idiomatic in this context than 'a course called [Name]'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A is more concise and professional, avoiding the unnecessary filler 'called'. Both are grammatically correct, but A flows better for a high-quality editorial standard.
  - [new/style/minor] The phrase 'a course called' is slightly wordy and less elegant than the direct apposition used in A.

#### 🟢 en `/steps_description/2/fact` — NEW лучше (2:0)

- **RU**: Тим Кук, генеральный директор Apple, известен своим ранним подъемом (около 4:30 утра). Тем не менее, он подчеркивает важность хорошего ночного сна и регулярного физического упражнения для поддержания энергии и мотивации.
- **OLD**: Tim Cook, the CEO of Apple, is known for waking up very early (around 4:30 a.m.). At the same time, he emphasizes the importance of good night sleep and regular physical activity for maintaining energy and motivation.
- **NEW**: Apple CEO Tim Cook is known for his early rising (around 4:30 a.m.). However, he emphasizes the importance of good nighttime sleep and regular physical exercise for maintaining energy and motivation.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A is more concise and idiomatic, using the standard 'Apple CEO' appositive. Translation B is slightly wordier and contains a minor grammatical error ('good night sleep' instead of 'good night's sleep' or 'good nighttime sleep').
  - [old/style/minor] The phrase 'good night sleep' is grammatically awkward; it should be 'good night's sleep' or 'good nighttime sleep'.
  - [old/style/minor] 'At the same time' is a slightly weaker transition here than 'However' when contrasting early rising with the need for sleep.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is more idiomatic and flows better. Translation A contains a grammatical error ('good night sleep' instead of 'good night's sleep' or 'good nighttime sleep') and uses 'At the same time' which is a weak, slightly literal translation of 'Тем не менее' in this context.
  - [old/other/major] missing possessive in 'good night sleep'
  - [old/style/minor] 'At the same time' is a clunky way to translate the contrastive 'Тем не тем' (However/Nevertheless)

#### 🟢 en `/steps_description/3/text` — NEW лучше (2:0)

- **RU**: Тренировки по развитию эмоционального интеллекта могут помочь руководителям и сотрудникам лучше понимать друг друга и работать более эффективно. Это может включать курсы по активному слушанию, управлению конфликтами и развитию эмпатии.
- **OLD**: Training in emotional intelligence can help managers and employees understand each other better and work more effectively together. This may include courses on active listening, conflict management and developing empathy.
- **NEW**: Emotional intelligence training can help leaders and employees understand each other better and work more effectively. This can include courses on active listening, conflict management, and empathy development.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B uses more natural, professional phrasing ('Emotional intelligence training' vs 'Training in...') and follows the Oxford comma rule, which is standard for high-quality US English. It also avoids the redundant 'together' found in A.
  - [old/style/minor] The phrasing 'Training in emotional intelligence' is slightly more wordy/clunky than the more idiomatic 'Emotional intelligence training'. Also, 'work more effectively together' adds a redundant 'together' not present in the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and follows the natural flow of professional English. Translation B adds 'together' which is redundant, and 'developing empathy' is slightly less balanced in the list than 'empathy development'.
  - [old/style/minor] Redundant addition of 'together'
  - [old/style/minor] Less parallel structure in the list ('developing empathy' vs 'active listening/conflict management')

#### 🟡 en `/steps_description/5/text`— вердикт неустойчив

- **RU**: Психологические практики, такие как медитация, йога и техники майндфулнес, могут помочь поддерживать эмоциональное равновесие и повышать уровень энергии.
- **OLD**: Psychological practices such as meditation, yoga and mindfulness techniques can help maintain emotional balance and increase energy levels.
- **NEW**: Psychological practices such as meditation, yoga, and mindfulness techniques can help maintain emotional balance and increase energy levels.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 95)
  - Both translations are excellent and accurate. Translation A is slightly preferred as it follows a cleaner style by omitting the Oxford comma, which is common in many modern digital/UX contexts, though B is also perfectly acceptable.
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both translations are identical in wording, terminology, and accuracy. The only difference is the use of the Oxford comma in translation A, which is a matter of style preference and does not affect the quality or correctness.

#### 🟢 en `/steps_description/10/text` — NEW лучше (2:0)

- **RU**: Исследования показывают, что поддержание баланса между работой и личной жизнью может существенно снизить уровень стресса и предотвратить ожесточение. Компании, такие как Basecamp, активно пропагандируют краткосрочные рабочие недели и минимизацию овертаймов для…
- **OLD**: Studies indicate that maintaining a balance between work and personal life can greatly reduce stress and help prevent hardening and cynicism. Companies like Basecamp actively promote shorter working weeks and minimal overtime to improve employee well-being.
- **NEW**: Research shows that maintaining a work-life balance can significantly reduce stress levels and prevent cynicism. Companies like Basecamp actively promote shorter workweeks and minimizing overtime to improve employee well-being.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B uses the idiomatic 'work-life balance' and 'workweeks', whereas Translation A uses clunky, literal phrases like 'balance between work and personal life' and 'working weeks'.
  - [old/style/minor] The phrase 'balance between work and personal life' is a literal translation of the Russian structure; 'work-life balance' is the standard English term.
  - [old/style/minor] The term 'hardening' is an unnatural translation for 'ожесточение' in this context; 'cynicism' or 'burnout' is more appropriate, though B correctly identifies cynicism.
  - [old/addition/minor] Added 'and cynicism' to compensate for the weak 'hardening', which deviates from the original's single term.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is much more idiomatic and professional. 'Work-life balance' is the standard term, whereas B's 'balance between work and personal life' is wordy. Also, 'prevent cynicism' is a much better way to handle 'предотвратить ожесточение' in a professional context than B's literal and awkward 'prevent hardening'.
  - [old/style/major] The phrase 'prevent hardening and cynicism' is an unnatural translation of 'предотвратить ожесточение'; 'hardening' sounds like physical material or an incorrect attempt to translate a psychological state.
  - [old/style/minor] Uses 'balance between work and personal life' instead of the standard 'work-life balance'.

#### 🟡 en `/description/text`— вердикт неустойчив

- **RU**: Часто чувствуете усталость, потерю интереса к работе или сложности с восстановлением энергии? Этот тест поможет определить, не появились ли признаки эмоционального истощения и насколько сбалансированы ваша нагрузка и отдых. Ответы покажут, как чувствуют себя в…
- **OLD**: Do you often feel tired, lose interest in work or struggle to restore your energy? This test can help you see whether signs of emotional exhaustion have appeared and how well your workload and rest are balanced. Your answers will show how your inner resources …
- **NEW**: Do you often feel tired, lose interest in your work, or struggle to recharge your energy? This test will help determine if you’re showing signs of emotional exhaustion and how balanced your workload and rest are. Your answers will show how your resources are d…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A is more idiomatic and maintains a supportive, professional tone. Translation B feels slightly more blunt and uses 'how your resources are doing', which sounds a bit unnatural in English.
  - [new/style/minor] The phrase 'how your resources are doing' is a bit clunky/personified compared to the more natural 'how your resources feel' or 'the state of your resources'.
  - [new/style/minor] The phrase 'whether you should make changes' is slightly more directive/pressuring than the original 'стоит ли' (whether it might be worth), which slightly violates the 'supportive friend' tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A sounds much more natural and idiomatic for a mental health app. Translation B uses clunky phrasing like 'restore your energy' and 'whether signs... have appeared', which feels like a direct translation from Russian.
  - [old/style/major] 'restore your energy' is a literal translation of 'восстановление энергии'; 'recharge' is the natural English equivalent.
  - [old/style/minor] 'whether signs... have appeared' is wordy and passive; 'if you're showing signs' (in A) is much more direct and user-friendly.
  - [old/style/minor] 'inner resources feel' is a bit of a personification error; resources don't 'feel', they 'are' or 'are doing'.

#### 🟢 en `/result/high/text` — NEW лучше (2:0)

- **RU**: Ваши ресурсы могут быть значительно истощены. Возможно, вы долгое время испытываете высокую нагрузку или занимаетесь задачами, которые не приносят удовлетворения. Такое состояние может отражаться на мотивации, настроении и ощущении смысла в работе. Сейчас особ…
- **OLD**: Your internal resources may be significantly depleted. You may have been under high pressure for a long time or doing tasks that give you little sense of meaning or satisfaction. This state can affect your motivation, mood and sense of purpose at work. It is e…
- **NEW**: Your resources may be significantly depleted. You might have been under high pressure for a long time or working on tasks that don’t bring you satisfaction. This can affect your motivation, mood, and sense of purpose at work. Now is a particularly important ti…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A sounds like a natural, empathetic expert written by a native speaker, whereas B contains several 'translationese' markers and awkward phrasing.
  - [old/style/major] 'Internal resources' is a bit redundant/heavy; 'doing tasks' is weaker than 'working on tasks'; 'restore your strength' is a literal calque of 'восстановить силы' (better: 'recover' or 'recharge'); 'stability' is a less natural fit for psychological resilience than 'resilience' in this context.
  - [old/style/minor] Missing Oxford comma in a list, which is fine but A is more consistent with professional US English style.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 84 / NEW 95)
  - Translation B sounds much more natural and idiomatic for a mental health context. It uses better verb choices ('reassessing' instead of 'revising', 'resilience' instead of 'stability') and follows the 'warm expert' tone more effectively.
  - [old/style/minor] The phrase 'doing tasks that give you little sense of meaning' is a bit wordy and clunky compared to the original.
  - [old/terminology/minor] Used 'stability' instead of 'resilience', which is the more appropriate term for psychological recovery in CBT contexts.
  - [old/style/minor] 'Restore your strength' sounds slightly literal/translated; 'recover' or 'recharge' is more natural.

#### 🔴 en `/steps_description/17/text` — OLD лучше (2:0)

- **RU**: Концепция "потока", описанная психологом Михаем Чиксентмихайи, объясняет состояние полного погружения в деятельность, сопровождающееся чувством энергии и удовольствия.
- **OLD**: The concept of “flow”, described by psychologist Mihaly Csikszentmihalyi, explains a state of complete immersion in an activity, accompanied by a sense of energy and enjoyment.
- **NEW**: The concept of "flow," described by psychologist Mihaly Csikszentmihalyi, explains a state of complete immersion in an activity, accompanied by feelings of energy and enjoyment.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A uses the more natural and idiomatic 'a sense of' to describe an abstract feeling, whereas 'feelings of' in B sounds slightly more clinical or heavy. Translation A also correctly uses curly quotes which align with the provided typography rules.
  - [new/style/minor] Use of 'feelings of' is slightly less idiomatic than 'a sense of' in this context; uses straight quotes instead of curly quotes.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses more idiomatic phrasing ('a sense of' vs 'feelings of') and follows correct English punctuation rules regarding quotation marks and commas.
  - [new/style/minor] Punctuation error: in US English, the comma should be inside the quotation marks ('flow,' instead of 'flow',). Also, 'feelings of' is slightly less natural here than 'a sense of'.
  - [old/style/minor] While 'flow' is technically inside the quotes, US style usually places the comma inside, but the overall flow and word choice ('a sense of') make it superior.

#### 🟢 en `/steps_description/6/text` — NEW лучше (2:0)

- **RU**: Обучение управлению конфликтами может включать развитие навыков активного слушания, эмпатии и умения находить компромиссы. Курсы и тренинги по этим темам могут быть очень полезны для всех уровней сотрудников.
- **OLD**: Training in conflict management usually includes developing skills in active listening, empathy and the ability to find compromise. Courses and workshops on these skills can be very useful at all levels of an organisation.
- **NEW**: Conflict management training can include developing skills in active listening, empathy, and the ability to find compromises. Courses and workshops on these topics can be highly beneficial for employees at all levels.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more accurate to the original text and follows professional English standards. Translation B introduces an unnecessary 'usually' and changes the meaning of the second sentence by replacing 'topics' with 'skills'.
  - [old/mistranslation/major] The word 'usually' is not in the original and changes the tone from possibility to frequency.
  - [old/mistranslation/minor] Changed 'topics' to 'skills' in the second sentence.
  - [old/style/minor] The phrase 'at all levels of an organisation' is slightly wordier than the original 'для всех уровней сотрудников'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B is more idiomatic and flows better for a professional yet supportive tone. It uses 'highly beneficial' instead of 'very useful' and correctly handles the plural 'compromises' and the phrase 'employees at all levels'.
  - [old/style/minor] The phrase 'at all levels of an organisation' is slightly wordy compared to the more natural 'employees at all levels'.
  - [old/style/minor] The use of 'usually' adds a nuance of frequency not present in the original 'может' (can/may).

#### 🟢 en `/steps_description/19/text` — NEW лучше (2:0)

- **RU**: Концепция "икигай" в японской культуре описывает пересечение того, что вы любите, в чем вы хороши, что нужно миру и за что вам могут платить. Это считается ключом к удовлетворению от работы.
- **OLD**: The Japanese concept of “ikigai” describes the intersection of what you love, what you are good at, what the world needs and what you can be paid for. It is considered a key to finding satisfaction in work.
- **NEW**: The Japanese concept of "ikigai" describes the intersection of what you love, what you are good at, what the world needs, and what you can be paid for. It is considered a key to job satisfaction.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and concise. 'Job satisfaction' is a much more natural and standard collocation in English than 'finding satisfaction in work'.
  - [old/style/minor] The phrase 'finding satisfaction in work' is slightly wordy and less idiomatic than the standard 'job satisfaction'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 96)
  - Translation A is more concise and uses the idiomatic 'job satisfaction', which is a standard term. Translation B is slightly wordier ('finding satisfaction in work') and uses straight quotes instead of the required typographic curly quotes.
  - [old/style/minor] The phrase 'finding satisfaction in work' is slightly more heavy-handed than the idiomatic 'job satisfaction'.
  - [old/other/minor] Uses straight quotes instead of typographic curly quotes for 'ikigai'.

#### 🟢 en `/steps_description/9/text` — NEW лучше (2:0)

- **RU**: Исследование нейронауки показало, что когда люди проявляют эмпатию, их мозг активирует те же области, что и при физической боли. Это означает, что эмоциональная связь действительно может быть глубокой и значимой.
- **OLD**: Neuroscience research shows that when people feel empathy, the same brain areas can be activated as during physical pain. This means emotional connection can be deep and very significant.
- **NEW**: Neuroscience research has shown that when people show empathy, their brains activate the same areas as they do for physical pain. This means that emotional connections can truly be deep and meaningful.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B sounds much more natural and idiomatic for a science-based article. It uses the correct present perfect for research findings and follows the natural flow of English sentence structures.
  - [old/style/minor] The phrasing 'the same brain areas can be activated as during physical pain' is slightly clunky and passive compared to the more direct B.
  - [old/style/minor] The use of 'very significant' is a bit weak and less idiomatic in this context than 'meaningful'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more idiomatic and flows naturally, using the correct 'as they do for' construction. Translation B feels slightly clunky and uses 'very significant', which is a weaker, more generic choice than 'meaningful'.
  - [old/style/minor] The phrasing 'the same brain areas can be activated as during physical pain' is a bit heavy and passive compared to the more natural A.
  - [old/style/minor] The use of 'very significant' is less idiomatic in this context than 'meaningful'.

#### 🟡 en `/steps_description/8/fact`— вердикт неустойчив

- **RU**: Удовлетворенность от работы связана с улучшением производительности. Согласно данным Harvard Business Review, сотрудники, которые видят ценность своей работы, на 21% продуктивнее и на 22% более прибыльны для компании.
- **OLD**: Job satisfaction is linked to improved performance. According to Harvard Business Review, employees who see the value of their work are 21% more productive and 22% more profitable for the company.
- **NEW**: Job satisfaction is linked to improved performance. According to Harvard Business Review, employees who see the value in their work are 21% more productive and 22% more profitable for the company.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation B uses the more idiomatic 'see the value in their work', whereas Translation A's 'see the value of their work' is slightly more literal and less natural in this context.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation B uses the correct preposition 'value of their work', whereas Translation A uses 'value in their work', which is slightly less idiomatic in this specific context of inherent worth.
  - [new/style/minor] 'value in their work' is acceptable but 'value of their work' is the standard way to express the worth of the tasks themselves.

#### 🔴 en `/result/middle/title` — OLD лучше (2:0)

- **RU**: Снижение продуктивности
- **OLD**: Reduced productivity
- **NEW**: Decreased productivity
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Both are grammatically correct, but 'Reduced productivity' is more idiomatic and natural for a heading or a symptom description in a mental health context.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - While both are grammatically correct, 'Reduced productivity' is more idiomatic for a heading or a symptom description in a mental health context. 'Decreased' sounds slightly more clinical or mathematical.
  - [new/style/minor] Sounds a bit more like a statistical report than a natural UX heading.

#### 🟡 en `/steps_description/1/text`— вердикт неустойчив

- **RU**: Физическая активность и правильное питание играют ключевую роль в поддержании уровня энергии и предотвращении чувства усталости.
- **OLD**: Physical activity and a balanced diet play a key role in maintaining energy levels and preventing persistent fatigue.
- **NEW**: Physical activity and proper nutrition play a key role in maintaining energy levels and preventing feelings of fatigue.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A is a precise and natural rendering of the original. Translation B introduces an unrequested meaning ('persistent') and changes 'proper nutrition' to 'balanced diet', which, while common, is a slight deviation from the source.
  - [old/addition/minor] Added 'persistent' to fatigue, which is not in the original.
  - [old/style/minor] Changed 'proper nutrition' to 'balanced diet'; while idiomatic, it's a slight shift in meaning.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and natural for a mental well-being context. 'Balanced diet' is a much more common and natural collocation than 'proper nutrition' in this context, and 'persistent fatigue' sounds more professional and polished than 'feelings of fatigue'.
  - [new/style/minor] 'Proper nutrition' sounds slightly more clinical/academic, and 'feelings of fatigue' is a bit wordy compared to the more natural 'fatigue' or 'persistent fatigue'.

#### 🟢 en `/steps_description/20/fact` — NEW лучше (2:0)

- **RU**: Опра Уинфри в 2008 году призналась, что испытывала выгорание и потерю интереса к своему шоу, что привело к решению завершить его через несколько лет.
- **OLD**: Oprah Winfrey admitted in 2008 that she experienced burnout and a loss of interest in her show, which influenced her decision to end it a few years later.
- **NEW**: In 2008, Oprah Winfrey admitted that she was experiencing burnout and a loss of interest in her show, which led to her decision to end it a few years later.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses the continuous aspect ('was experiencing'), which more accurately reflects the ongoing process described in the Russian original, and uses the more natural 'led to' instead of the slightly more formal 'influenced'.
  - [old/style/minor] The use of 'influenced' is slightly less direct than 'led to' in this context, and 'experienced' (simple past) feels a bit more static than the ongoing state implied by the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation A is more natural and uses the continuous aspect ('was experiencing') to correctly convey the ongoing state described in the original. Translation B uses 'influenced', which is a slight deviation from the causal 'led to' (привело к).
  - [old/style/minor] The use of 'influenced' is a weaker, less direct translation of 'привело к' than 'led to'.

#### 🟡 en `/steps_description/1/fact`— вердикт неустойчив

- **RU**: Джефф Безос, основатель Amazon, неоднократно говорил о важности полноценного отдыха и сна для поддержания продуктивности и предотвращения чувства усталости. Он утверждает, что минимум восемь часов сна в день помогают ему оставаться энергичным и эффективным.
- **OLD**: Jeff Bezos, the founder of Amazon, has repeatedly spoken about the importance of proper rest and sleep for maintaining productivity and preventing fatigue. He says that getting at least eight hours of sleep helps him stay energetic and effective.
- **NEW**: Amazon founder Jeff Bezos has spoken many times about the importance of adequate rest and sleep for maintaining productivity and preventing exhaustion. He maintains that getting at least eight hours of sleep a day helps him stay energetic and effective.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A uses more sophisticated and natural vocabulary ('maintains' instead of 'says', 'exhaustion' instead of 'fatigue') which fits the narrative style of an article better. Translation B is grammatically correct but feels slightly more repetitive and basic.
  - [old/style/minor] The use of 'fatigue' is okay, but 'exhaustion' in A better captures the weight of 'чувства усталости' in this context. 'He says' is a bit weak for a formal attribution compared to 'He maintains'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more natural and flows better for a general reader. Translation B uses 'exhaustion' for 'усталость', which is a bit too heavy/extreme, and 'maintains' sounds slightly more formal/stiff than the original context.
  - [new/style/minor] The word 'exhaustion' is a stronger term than 'fatigue' or 'tiredness', potentially overshooting the original 'усталость'.
  - [new/style/minor] 'He maintains' is slightly more formal/academic than the neutral 'Он утверждает'.

#### 🟢 en `/steps_description/18/text` — NEW лучше (2:0)

- **RU**: По данным Pew Research Center, 30% американцев рассматривают свою работу как призвание, 44% - как карьеру, и 24% - просто как способ заработать на жизнь.
- **OLD**: According to Pew Research Center, 30% of Americans see their job as a calling, 44% as a career and 24% simply as a way to earn a living.
- **NEW**: According to the Pew Research Center, 30% of Americans view their work as a calling, 44% as a career, and 24% simply as a way to make a living.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation A is more idiomatic and grammatically precise, specifically regarding the use of the definite article with the organization name and the natural collocation 'make a living'.
  - [old/style/minor] Missing the definite article 'the' before 'Pew Research Center' is a common error; 'earn a living' is acceptable but 'make a living' is more idiomatic in this context.
  - [old/style/minor] The use of 'job' instead of 'work' slightly shifts the nuance from the broader concept of labor/vocation to a specific position, though it is not a critical error.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and follows standard English grammar for institutions. Using 'the' before Pew Research Center is more natural, and 'view their work' sounds more professional in this context than 'see their job'.
  - [old/style/minor] Missing the definite article 'the' before Pew Research Center; 'see their job' is slightly more colloquial/less precise than 'view their work'.

#### 🟢 en `/steps_description/13/text` — NEW лучше (2:0)

- **RU**: Джек Ма, основатель крупной интернет-компании, когда-то был сторонником модели работы "996" (с 9 утра до 9 вечера, 6 дней в неделю). Однако позже он признал, что такой режим работы может быть вредным для здоровья сотрудников и организации в целом.
- **OLD**: Jack Ma, the founder of a major internet company, was once a supporter of the “996” work model (9 a.m. to 9 p.m., six days a week). Later he acknowledged that such a regime can be harmful both for employees’ health and for the organisation as a whole.
- **NEW**: Jack Ma, the founder of a major internet company, was once a proponent of the "996" work model (9 a.m. to 9 p.m., 6 days a week). However, he later admitted that such a schedule can be harmful to the health of both employees and the organization as a whole.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and flows better. 'Proponent' is a more sophisticated choice than 'supporter' in this context, and 'harmful to' is the correct prepositional usage, whereas 'harmful for' in A sounds slightly less natural.
  - [old/style/minor] The preposition 'harmful for' is less idiomatic than 'harmful to' in this context; 'regime' sounds a bit heavy/political compared to 'schedule'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation A is more natural and follows modern US English standards. Translation B uses 'regime', which in English often carries a negative political connotation (e.g., a dictatorial regime), making it a poor choice for a work schedule.
  - [old/style/major] The word 'regime' is unnatural and potentially carries a negative political undertone; 'schedule' or 'work pattern' is much better.
  - [old/style/minor] Uses British spelling 'organisation', whereas the target market is US English.

#### 🟡 en `/steps_description/8/text`— вердикт неустойчив

- **RU**: Обратная связь и признание от коллег и руководства могут укрепить уверенность в значимости своей работы. Регулярное признание достижений сотрудников способствует повышению их мотивации и удовлетворенности.
- **OLD**: Feedback and recognition from colleagues and managers can strengthen the sense that one’s work matters. Regular acknowledgement of achievements supports higher motivation and job satisfaction.
- **NEW**: Feedback and recognition from colleagues and management can strengthen your confidence in the importance of your work. Regularly recognizing employee achievements helps increase motivation and job satisfaction.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A follows the 'understanding friend' tone by using 'your', making it personal and engaging for the reader, whereas B is overly formal and academic ('one's work').
  - [old/style/major] Use of 'one's' is too formal/academic for the target tone; 'managers' is slightly less natural here than 'management' when referring to the entity/group.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A sounds more natural and professional for an article/narrative context by using 'the sense that one’s work matters'. Translation B is slightly more repetitive and uses 'management', which can sound a bit more bureaucratic than 'managers' in this context.
  - [new/style/minor] The use of 'management' and the repetitive 'your... your...' structure makes it feel slightly more like a manual than a smooth narrative.

