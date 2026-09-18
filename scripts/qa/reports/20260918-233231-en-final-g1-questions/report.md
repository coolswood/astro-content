# QA: слепое парное сравнение переводов — en-final-g1-questions

- **Дата**: 2026-09-18T20:32:31.735Z
- **Метка**: en-final-g1-questions
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: questions.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## questions.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 5 | 🔴 8 | ⚪ 0 | 🟡 7 | 0 / 0 | 38% |
| **итого** | 20 | 🟢 5 | 🔴 8 | ⚪ 0 | 🟡 7 | 0 / 0 | 38% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×8, style/major×1, omission/minor×1; OLD — style/minor×7, style/major×2, omission/minor×1, mistranslation/major×1

### Детали пар (для спот-чека)

#### 🔴 en `/85/translation` — OLD лучше (2:0)

- **RU**: Какие действия вы предпринимаете для поддержания своего психического здоровья?
- **OLD**: What do you do to support your mental health?
- **NEW**: What actions do you take to maintain your mental well-being?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more natural and idiomatic for a supportive mental health app. Translation A uses 'actions do you take,' which sounds slightly formal and heavy (closer to the Russian structure), whereas 'What do you do' is the standard, conversational way a native speaker would ask this.
  - [new/style/minor] The phrasing 'What actions do you take' is a bit formal/stiff for a 'supportive friend' tone.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A is more natural, concise, and follows the 'understanding friend' tone. Translation B is slightly more formal and heavy due to 'What actions do you take'.
  - [new/style/minor] The phrasing 'What actions do you take' sounds a bit more like a formal survey or clinical questionnaire rather than a supportive app interface.

#### 🔴 en `/118/translation` — OLD лучше (2:0)

- **RU**: Какое ваше главное жизненное правило или девиз?
- **OLD**: What’s your main life rule or personal motto?
- **NEW**: What is your main life rule or motto?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation A sounds more natural and idiomatic for a conversational prompt. The addition of 'personal' before 'motto' creates a better rhythmic balance and fits the 'understanding friend' tone better than the slightly clipped version B.
  - [new/style/minor] Slightly less idiomatic/natural flow compared to A; lacks the rhythmic balance provided by 'personal motto'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Translation B is more natural and idiomatic for a supportive app context. The use of the contraction 'What’s' aligns better with the 'understanding friend' tone, and adding 'personal' to 'motto' makes the phrase sound more complete and less like a literal translation.
  - [new/style/minor] Slightly more formal/stiff due to the lack of contraction and the slightly abrupt ending.

#### 🔴 en `/77/translation` — OLD лучше (2:0)

- **RU**: Какие принципы важны для поддержания межличностных отношений?
- **OLD**: What principles matter for maintaining healthy relationships?
- **NEW**: Which principles are important for maintaining interpersonal relationships?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A is much more natural and idiomatic for a mental health context. Translation B uses 'interpersonal relationships', which is a heavy, academic term that sounds like a textbook rather than a supportive app.
  - [new/style/major] The term 'interpersonal relationships' is overly formal and academic (clunky) for a user-facing app; 'healthy relationships' is the standard, natural way to express this in English.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B sounds more natural and idiomatic for a mental health context. 'What principles matter' is more engaging than the slightly formal 'Which principles are important', and 'healthy relationships' is a much more common and natural collocation in English than the academic 'interpersonal relationships'.
  - [new/style/minor] Sounds a bit academic/formal ('interpersonal relationships') and slightly stiff ('Which principles are important').

#### 🟢 en `/106/translation` — NEW лучше (2:0)

- **RU**: Какой совет вы бы дали своему молодому «я»?
- **OLD**: What advice would you give your younger «self»?
- **NEW**: What advice would you give to your younger self?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - Translation A is idiomatic and follows standard English punctuation. Translation B incorrectly uses quotation marks around 'self', which is not present in the original meaning and looks unnatural in English.
  - [old/style/major] unnecessary quotation marks around 'self' create an unnatural tone and change the nuance
  - [old/style/minor] uses guillemets/angle quotes instead of standard English quotation marks
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation B follows standard English punctuation and grammar, whereas Translation A uses incorrect quotation marks and unnecessary quotes around 'self'.
  - [old/style/major] Uses French-style guillemets (« ») instead of English quotation marks, and the quotes around 'self' are unnecessary and look unnatural in this context.
  - [old/style/minor] Missing the preposition 'to' which, while sometimes omitted in casual speech, is more grammatically standard for this structure.

#### 🟢 en `/95/translation` — NEW лучше (2:0)

- **RU**: Что для вас значит быть счастливым? Какие моменты в вашей жизни вы бы назвали истинно счастливыми?
- **OLD**: What does it mean to you to be happy? Which moments would you call truly happy?
- **NEW**: What does being happy mean to you? Which moments in your life would you call truly happy?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more natural and flows better for a reflective question. Translation B is grammatically correct but feels slightly more clunky due to the 'it... to be' construction and an omission of 'in your life' which makes the second sentence feel less personal.
  - [old/omission/minor] Missing 'in your life', which is present in the original and adds necessary depth to the question.
  - [old/style/minor] 'What does it mean to you to be happy?' is slightly more wordy/clunky than the more direct 'What does being happy mean to you?'
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation B is more idiomatic and flows more naturally for a native speaker. Translation A is grammatically correct but uses a slightly clunky 'What does it mean to you to be...' construction, whereas B uses the more direct and common 'What does being happy mean to you?'.
  - [old/style/minor] The phrasing 'What does it mean to you to be happy' is a bit wordy and less natural than the gerund form used in B.

#### 🔴 en `/144/translation` — OLD лучше (2:0)

- **RU**: Какие аспекты современной культуры вас привлекают или отталкивают?
- **OLD**: Which aspects of modern culture attract you—or put you off?
- **NEW**: Which aspects of modern culture attract or repel you?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 85)
  - Translation B is much more idiomatic and natural for a conversational or reflective context. 'Repel' in Translation A sounds overly clinical or physical, whereas 'put you off' captures the nuance of psychological aversion perfectly.
  - [new/style/minor] The verb 'repel' sounds a bit stiff and formal in this context, making it feel slightly like a direct translation from Russian.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 82)
  - Translation A uses the idiomatic phrasal verb 'put you off', which sounds much more natural and conversational for a mental health/lifestyle context. Translation B uses 'repel', which sounds overly clinical or biological, like a chemical repellent.
  - [new/style/minor] The word 'repel' is too formal/stiff for a friendly, engaging question; 'put you off' is the idiomatic choice for personal preferences.

#### 🟡 en `/75/translation`— вердикт неустойчив

- **RU**: Как вы относитесь к идее о потере личной приватности в современном мире?
- **OLD**: How do you feel about the idea of losing personal privacy in the modern world?
- **NEW**: How do you feel about the loss of personal privacy in the modern world?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more accurate as it preserves the 'idea of' (идея о) from the original, whereas A omits it. B also sounds more natural and idiomatic for a reflective question.
  - [new/omission/minor] omitted 'the idea of' (идею о)
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more concise and natural. Translation A uses a clunky 'idea of losing' construction which is a literal carryover from the Russian 'идее о потере', whereas B flows better in English.
  - [old/style/minor] wordy construction 'the idea of losing' instead of the more direct 'the loss of'

#### 🟡 en `/1/translation`— вердикт неустойчив

- **RU**: Как вы сохраняете позитивное отношение в сложные времена?
- **OLD**: How do you keep a positive mindset when the going gets tough?
- **NEW**: How do you maintain a positive outlook during difficult times?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is a perfect, natural, and direct equivalent of the original. Translation B uses an idiom ('when the going gets tough') which, while natural, adds a level of informal flair not present in the original Russian text.
  - [old/style/minor] The idiom 'when the going gets tough' is slightly more colloquial/dramatic than the neutral original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation A uses a much more idiomatic and natural expression ('when the going gets tough') which fits the 'understanding friend' tone perfectly. Translation B is grammatically correct but sounds slightly more formal and textbook-like.
  - [new/style/minor] Slightly more formal/stiff than the target 'warm, supportive' tone.

#### 🔴 en `/9/translation` — OLD лучше (2:0)

- **RU**: Какие события заставляют вас переосмысливать свои жизненные приоритеты?
- **OLD**: What events make you rethink your life priorities?
- **NEW**: What events cause you to rethink your life priorities?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses 'make you', which sounds more natural and conversational for a supportive app, whereas 'cause you' in A sounds slightly more clinical or formal.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more direct and natural for a conversational/journaling context. Translation B uses 'cause you to', which sounds slightly more formal and heavy, bordering on clinical/causal rather than reflective.
  - [new/style/minor] The construction 'cause you to' is slightly more wordy and formal than the more natural 'make you'.

#### 🟡 en `/55/translation`— вердикт неустойчив

- **RU**: Как вы поддерживаете свою мотивацию в долгосрочной перспективе?
- **OLD**: How do you keep your motivation up in the long run?
- **NEW**: How do you maintain your motivation in the long term?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and conversational, fitting the 'understanding friend' tone, whereas Translation B is slightly more formal/academic.
  - [new/style/minor] The phrase 'maintain your motivation in the long term' is grammatically correct but feels a bit more like a textbook or a formal survey than a friendly conversation.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more direct and professional, fitting the 'expert friend' tone perfectly. Translation B uses 'keep up', which is slightly more colloquial and can sometimes imply struggling to maintain a certain level, whereas 'maintain' is the standard, clean way to express this in a mental health context.
  - [old/style/minor] The phrasal verb 'keep up' is slightly more informal and less precise than 'maintain' for this specific question.

#### 🟡 en `/32/translation`— вердикт неустойчив

- **RU**: Как вы относитесь к своим неудачам?
- **OLD**: How do you relate to your failures?
- **NEW**: How do you view your failures?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B is more natural and idiomatic for a psychological context. 'Relate to' in English often implies a personal connection or empathy, whereas 'view' or 'perceive' correctly captures the sense of attitude and perspective requested by the Russian 'относитесь'.
  - [old/style/minor] 'Relate to' sounds slightly more like 'how do you connect with' rather than 'what is your attitude toward'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 85)
  - Translation B is more idiomatic and psychologically nuanced. 'Relate to' captures the emotional and cognitive attitude toward failures, whereas 'view' is slightly more detached and literal.
  - [new/style/minor] Sounds a bit more like a formal inquiry rather than a supportive, reflective question.

#### 🟢 en `/70/translation` — NEW лучше (2:0)

- **RU**: Что делает вас настоящим человеком в глазах окружающих?
- **OLD**: What makes you a truly good human in other people’s eyes?
- **NEW**: What makes you feel authentic in the eyes of others?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation A captures the philosophical essence of the original without adding moral judgment. Translation B introduces 'good', which changes the meaning from 'being a human' to 'being a good person'.
  - [old/mistranslation/major] The original asks what makes you a 'real/true human', not a 'good human'; adding 'good' changes the intent from identity to morality.
  - [old/style/minor] The phrasing 'truly good human' sounds slightly clunky compared to the more natural 'authentic' or 'real' in English.
- Проход [A=OLD, B=NEW]: победитель new, уверенность medium (оценки OLD 75 / NEW 88)
  - Translation A introduces a value judgment ('good') that is not present in the original, changing the meaning from 'being a human' to 'being a good person'. Translation B captures the essence of the existential question more naturally for an English speaker, though it leans slightly towards 'authenticity' rather than 'humanity'.
  - [old/mistranslation/major] Added 'good', which changes the meaning from 'being a human' to 'being a good person'.
  - [old/style/minor] The phrase 'a truly good human' sounds slightly clunky/unnatural in this context.

#### 🟡 en `/37/translation`— вердикт неустойчив

- **RU**: Какой фильм или книга оказали на вас наибольшее влияние и почему?
- **OLD**: What film or book influenced you the most, and why?
- **NEW**: Which movie or book has had the greatest influence on you, and why?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation A is more concise, natural, and fits the 'understanding friend' tone perfectly. Translation B is grammatically correct but feels slightly more formal and heavy due to the 'has had the greatest influence' construction.
  - [new/style/minor] slightly wordy and formal for a conversational prompt
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A uses the present perfect 'has had', which is more natural for discussing life experiences that continue to shape a person. Translation B is grammatically correct but feels slightly more abrupt/staccato.

#### 🔴 en `/140/translation` — OLD лучше (2:0)

- **RU**: Какое значение имеют друзья в вашей жизни?
- **OLD**: What role do friends play in your life?
- **NEW**: What significance do friends have in your life?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A uses the idiomatic 'play a role', which sounds much more natural and fluid to a native speaker than the slightly heavy and formal 'have significance' in Translation B.
  - [new/style/minor] Sounds a bit formal/academic for a warm, supportive app context; 'play a role' is the standard idiomatic way to express this.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B uses the idiomatic collocation 'play a role', which sounds much more natural to a native speaker than the slightly formal and heavy 'have significance'.
  - [new/style/minor] Sounds a bit formal/academic; 'have significance' is less idiomatic than 'play a role' in this context.

#### 🟡 en `/12/translation`— вердикт неустойчив

- **RU**: Что вас мотивирует продолжать двигаться вперед, даже когда все кажется бессмысленным?
- **OLD**: What keeps you moving forward even when everything feels pointless?
- **NEW**: What motivates you to keep moving forward, even when everything feels meaningless?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 88)
  - Translation A is more idiomatic and natural for a mental health app; 'keeps you moving' is a smoother, more common way to express motivation in this context than the literal 'motivates you to keep'.
  - [new/style/minor] The phrasing 'motivates you to keep moving' is slightly wordy and feels more like a direct translation of the Russian structure.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A is a perfect, idiomatic rendering of the original. Translation B is also good, but 'pointless' is slightly more informal/blunt than the original 'бессмысленным', and it lacks the rhythmic flow of A.

#### 🔴 en `/153/translation` — OLD лучше (2:0)

- **RU**: Какие моменты в истории, по вашему мнению, были ключевыми для человечества?
- **OLD**: Which moments in history do you think were pivotal for humanity?
- **NEW**: Which moments in history do you believe were key for humanity?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses 'pivotal', which is a more sophisticated and natural collocation for 'key moments' in a reflective context, whereas 'key' in A is slightly more generic.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Both translations are excellent, but 'pivotal' is a more sophisticated and idiomatic choice for a high-quality English text than the simpler 'key'.

#### 🟢 en `/124/translation` — NEW лучше (2:0)

- **RU**: Какое событие в вашей жизни оказало на вас наибольшее влияние и почему?
- **OLD**: What event in your life influenced you the most, and why?
- **NEW**: Which event in your life has had the greatest impact on you, and why?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Translation A uses the more natural and idiomatic 'has had the greatest impact on you', which sounds more sophisticated and flows better for a reflective question. Translation B is grammatically correct but feels slightly more functional and less 'expert-friend' in tone.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses the more natural and idiomatic 'has had the greatest impact on you' for discussing life experiences, whereas A is grammatically correct but slightly more functional/plain.
  - [old/style/minor] The phrasing 'influenced you the most' is a bit more direct and less idiomatic for a reflective question than 'had the greatest impact'.

#### 🟢 en `/2/translation` — NEW лучше (2:0)

- **RU**: Как вы относитесь к искусству и творчеству?
- **OLD**: How do you relate to art and creativity?
- **NEW**: What is your relationship with art and creativity?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses a much more natural and idiomatic English construction ('What is your relationship with...') to express the concept of how one feels or connects with something. Translation B is grammatically correct but sounds slightly more formal or literal, like a direct translation of the Russian structure.
  - [old/style/minor] Sounds a bit more like a direct translation of the Russian 'Как вы относитесь' rather than a natural English inquiry about one's connection to a subject.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B is a natural, idiomatic way to ask about one's connection to a subject. Translation A uses 'relate to', which in this context sounds like a literal translation of 'относитесь к' and can be ambiguous (it can mean 'to empathize with' or 'to connect with' rather than 'what is your attitude towards').
  - [old/style/minor] The phrasing 'How do you relate to...' sounds slightly unnatural/translated compared to the more standard 'What is your relationship with...' or 'How do you feel about...' when asking about an attitude or connection.

#### 🟡 en `/34/translation`— вердикт неустойчив

- **RU**: Какие вещи в жизни вы считаете неоправданными или не стоящими времени?
- **OLD**: What do you consider unjustified in life or simply not worth your time?
- **NEW**: What things in life do you consider pointless or not worth your time?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A is much more natural and idiomatic for a mental health context. Translation B uses 'unjustified', which is a clunky, literal translation of 'неоправданный' that sounds like legal or formal jargon rather than a conversational question about life values.
  - [old/style/major] The word 'unjustified' sounds unnatural in this context; 'pointless' or 'unproductive' would be better for a conversational tone.
  - [old/style/minor] The addition of 'simply' is not in the original text.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A is more elegant and captures the nuance of 'неоправданными' (unjustified) more accurately, whereas B uses 'pointless', which is a bit too blunt and changes the meaning slightly. A also flows better as a natural English question.
  - [new/mistranslation/minor] The word 'pointless' is a stronger, more dismissive term than 'неоправданный' (unjustified/unwarranted).
  - [new/style/minor] The phrase 'What things in life' is slightly clunkier than the more direct 'What do you consider... in life'.

#### 🔴 en `/107/translation` — OLD лучше (2:0)

- **RU**: Какие ошибки из прошлого вы считаете наиболее поучительными?
- **OLD**: Which past mistakes do you consider the most instructive?
- **NEW**: Which mistakes from your past do you consider to be the most instructive?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 88)
  - Translation A is more concise and natural for a user interface or a reflective question. Translation B is grammatically correct but feels slightly wordy and heavy due to the 'from your past' and 'to be' constructions.
  - [new/style/minor] The phrase 'from your past' is slightly redundant when 'past mistakes' is used, and 'consider to be' adds unnecessary wordiness compared to the direct 'consider'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more concise and idiomatic for a natural English speaker. Translation A is grammatically correct but slightly wordy due to the 'from your past' and 'to be' constructions.
  - [new/style/minor] The phrase 'from your past' and the inclusion of 'to be' make the sentence feel slightly more heavy and less fluid than the more direct 'past mistakes'.

