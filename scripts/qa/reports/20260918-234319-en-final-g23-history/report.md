# QA: слепое парное сравнение переводов — en-final-g23-history

- **Дата**: 2026-09-18T20:43:19.497Z
- **Метка**: en-final-g23-history
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/history.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/history.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 7 | 🟢 4 | 🔴 1 | ⚪ 0 | 🟡 2 | 0 / 1 | 80% |
| **итого** | 7 | 🟢 4 | 🔴 1 | ⚪ 0 | 🟡 2 | 0 / 1 | 80% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×2; OLD — style/minor×10, terminology/minor×2, omission/critical×1

### Детали пар (для спот-чека)

#### 🟢 en `/test/answers` — NEW лучше (2:0)

- **RU**: Призывает принять свой недуг как данность Предлагает опровергать свои негативные убеждения и заменять их на более адекватные Фокусируется преимущественно на травмах детства Декларирует, что чувство "злость" не существует
- **OLD**: It urges people to accept their condition as fate It encourages people to challenge their negative beliefs and replace them with more accurate ones It focuses mainly on childhood trauma It claims that the feeling of “anger” does not exist
- **NEW**: It encourages accepting one’s condition as unchangeable It suggests challenging negative beliefs and replacing them with more adaptive ones It focuses primarily on childhood trauma It claims that the feeling of anger does not exist
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more concise and professional, avoiding the repetitive 'people' used in B. It also uses the correct CBT term 'adaptive' instead of 'accurate'.
  - [old/style/minor] Repetitive use of 'people' makes the text feel less like a professional summary and more like a simple description.
  - [old/terminology/minor] Used 'accurate' instead of the preferred CBT term 'adaptive'.
  - [old/style/minor] 'Accept as fate' is a bit too dramatic/poetic compared to the neutral 'as unchangeable' or 'as a given'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B uses the correct CBT terminology ('adaptive' instead of 'accurate') and sounds more natural. Translation A's use of 'as fate' is a heavy, non-idiomatic calque of 'как данность'.
  - [old/terminology/major] Used 'accurate' instead of the canonical 'adaptive' for beliefs.
  - [old/style/major] 'as fate' is an unnatural way to express 'as a given/unchangeable reality' in this context.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Давайте аккуратно заглянем в прошлое и разберёмся, кто стоял у истоков когнитивно-поведенческой терапии и при чём здесь Зигмунд Фрейд — имя, без которого история психологии немыслима. Мы не будем уходить в подробные даты и факты. Если после этого обзора захоче…
- **OLD**: Let’s take a gentle look back in time and see who stood at the origins of cognitive behavioral therapy and what Sigmund Freud has to do with it – a name without which the history of psychology is hard to imagine. We won’t dive into exact dates or long lists of…
- **NEW**: Let’s take a gentle look back at the past to understand who stood at the origins of cognitive behavioral therapy and how Sigmund Freud—a name indispensable to the history of psychology—fits into the story. We won’t get bogged down in detailed dates and facts. …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and flows much better as a narrative piece. It uses superior phrasing like 'fits into the story' and 'get bogged down', whereas B feels slightly more literal and clunky in several places.
  - [old/style/minor] The phrase 'what Sigmund Freud has to do with it' is a bit informal/colloquial compared to the more elegant 'fits into the story' in A.
  - [old/style/minor] The parenthetical '(which is quite ironic)' is weaker than A's '(ironic, wouldn’t you agree?)' which better captures the conversational tone of the original.
  - [old/style/minor] The streetlight metaphor in B is slightly wordier and less punchy than A's version.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 96)
  - Translation B is much more idiomatic and captures the conversational, engaging tone of the original. It handles the parenthetical 'ironic, wouldn't you agree?' and the 'streetlight' metaphor with much better rhythm and flow than A.
  - [old/style/minor] The parenthetical '(which is quite ironic)' is a bit flat compared to the original's engaging tone.
  - [old/style/minor] The streetlight metaphor is slightly wordy and less punchy than B.
  - [old/omission/minor] Missed the Instagram placeholder and the Orben quote, though this might be a formatting issue in the snippet.

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Свободный формат беседы: клиент рассказывает о мыслях и чувствах, а терапевт помогает интерпретировать возможные бессознательные мотивы. Процесс может быть длительным — иногда на годы. Предполагается, что значительная часть наших действий обусловлена бессознат…
- **OLD**: The format is an open-ended conversation: the client talks about their thoughts and feelings, and the therapist helps interpret possible unconscious motives. The process can be very long — sometimes lasting for years. It is assumed that a significant part of o…
- **NEW**: Free-form conversation: the client shares their thoughts and feelings, while the therapist helps interpret potential unconscious motives. The process can be long — sometimes lasting for years. It is assumed that a significant part of our actions is driven by u…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is much more polished and follows the project's specific terminology (e.g., 'unhelpful thoughts', 'mental well-being'). It also handles the quote from Stephen Hollem, which was completely omitted in Translation B. Translation A's flow is more natural for a narrative article.
  - [old/omission/critical] The entire quote by Stephen Hollem was omitted.
  - [old/terminology/minor] Used 'destructive thoughts' instead of the preferred 'unhelpful thoughts'.
  - [old/style/minor] Phrasing like 'the format is an open-ended conversation' is slightly more wordy/clunky than A's direct approach.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is much closer to the professional standards of the project. It correctly uses 'unhelpful thoughts' (per glossary), 'mental well-being', and 'journal'. It also correctly includes the missing quote from Stephen Hollem, which Translation A completely omitted. Translation B's flow is more idiomatic for a narrative article.
  - [old/omission/major] The entire quote by Stephen Hollem was omitted.
  - [old/terminology/minor] Used 'destructive thoughts' instead of 'unhelpful thoughts'; 'diaries' instead of 'journal'.
  - [new/style/minor] The transition in the interview section is slightly abrupt due to the removal of 'In one interview, Beck admitted', but it remains more accurate to the overall quality requirements.

#### 🟡 en `/description`— вердикт неустойчив

- **RU**: Эта статья рассказывает об исторических корнях когнитивно-поведенческой терапии (КПТ), начиная с 1960-х годов и работы психолога Аарона Бека. Мы кратко освещаем ключевые аспекты КПТ в контексте времени, когда доминировал психоанализ, и приводим аргументы в пол…
- **OLD**: This article looks at the historical roots of cognitive behavioral therapy (CBT), starting in the 1960s with the work of psychologist Aaron Beck. We briefly outline the key features of CBT in the context of a time when psychoanalysis dominated, and highlight t…
- **NEW**: This article explores the historical roots of cognitive behavioral therapy (CBT), starting from the 1960s and the work of psychologist Aaron Beck. We’ll highlight the key aspects of CBT in the context of an era dominated by psychoanalysis and present the argum…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A flows much more naturally for an English-speaking reader, using a more engaging tone ('explores', 'highlight', 'why this approach is so effective') that fits the 'expert friend' persona. Translation B feels slightly more academic and stilted ('looks at', 'briefly outline').
  - [old/style/minor] The phrasing 'a time when psychoanalysis dominated' is grammatically correct but less idiomatic than 'an era dominated by psychoanalysis'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Translation A is more professional, concise, and follows the 'expert friend' tone perfectly. Translation B is slightly wordy and uses 'so effective', which sounds a bit too informal and promotional for a psychoeducational article.
  - [new/style/minor] The phrase 'arguments for why this approach is so effective' is a bit clunky and overly conversational compared to the original.
  - [new/style/minor] The use of 'We'll' (future tense) is less standard for an introductory paragraph than the present tense used in A.

#### 🔴 en `/test/question` — OLD лучше (2:0)

- **RU**: Чем подход КПТ отличается от психоанализа?
- **OLD**: How does CBT differ from psychoanalysis?
- **NEW**: How does the CBT approach differ from psychoanalysis?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation A is more concise and idiomatic for a heading or a question. In English, 'CBT' already implies the approach, making 'the CBT approach' in B feel slightly redundant and wordy.
  - [new/style/minor] Redundant use of 'the ... approach' makes the sentence heavier than necessary for a natural English question.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B is more concise and natural for a heading or a question. In English, 'CBT' is used as a proper noun/acronym that doesn't require the redundant 'approach' unless specifically contrasting methodologies in a formal academic paper.
  - [new/style/minor] The phrase 'the CBT approach' is slightly wordy and sounds more like a translation of the Russian structure than a natural English question.

#### 🟡 en `/title`— вердикт неустойчив

- **RU**: Как КПТ переосмыслила наше понимание психологии
- **OLD**: How CBT Transformed Our Understanding of Psychology
- **NEW**: How CBT reshaped our understanding of psychology
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A follows the sentence case rule for titles/headings as specified in the instructions, whereas Translation B uses Title Case. A also uses 'reshaped', which is a very natural and precise fit for the context of changing a paradigm.
  - [old/style/minor] Uses Title Case instead of the required sentence case for headings.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A uses Title Case, which is appropriate for an article headline, and 'transformed' is a stronger, more idiomatic choice for a significant paradigm shift in science. Translation B uses sentence case and 'reshaped', which is acceptable but slightly less impactful for a title.
  - [new/style/minor] Uses sentence case instead of Title Case for a headline, and 'reshaped' is slightly weaker than 'transformed' in this context.

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Когнитивная терапия, помогавшая людям быстрее преодолевать депрессию и находить практичные решения, сделала Бека достаточно известным, чтобы о материальном он мог беспокоиться меньше. Метод стремительно распространялся, и к началу 1990-х визит к когнитивному п…
- **OLD**: Cognitive therapy, which helped people overcome depression faster and find practical solutions, made Beck well-known enough that he could worry less about money. The method spread quickly, and by the early 1990s, seeing a cognitive therapist had become almost …
- **NEW**: Cognitive therapy helped people overcome depression faster and find practical solutions, making Beck so successful that he no longer had to worry about his finances. The method spread rapidly, and by the early 1990s, seeing a cognitive psychologist had become …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 94)
  - Translation B is more idiomatic and flows better as a narrative text. It uses more natural phrasing (e.g., 'worry about his finances' vs 'worry about money', 'navigate internal conflicts' vs 'deal with inner conflicts') and handles the transition to the reader more gracefully.
  - [old/style/minor] The phrase 'and that is not just a slogan' is a bit clunky compared to the more natural 'and we don't just say that'.
  - [old/style/minor] The sentence 'if you are interested, you can continue exploring it on your own' is slightly wordy and less punchy than B's version.
  - [new/style/minor] The translation of 'психолог' as 'psychologist' in the second paragraph is technically more accurate to the Russian 'психолог' than A's 'therapist', though both are acceptable in context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is much more idiomatic and follows the 'warm expert friend' tone perfectly. It uses natural contractions and avoids the clunky, slightly formal phrasing found in B. Translation A also correctly uses 'helpful' instead of 'healthier' for ways of interacting, aligning with CBT terminology guidelines.
  - [old/style/minor] Uses 'did not' and 'that is' instead of contractions, making it feel too formal/stiff for a supportive app context.
  - [old/terminology/minor] Uses 'healthier ways' instead of 'helpful ways', which slightly deviates from the CBT-specific instruction to avoid good/bad/healthy/unhealthy binaries.
  - [old/style/minor] 'You have been warned!' sounds slightly more ominous/threatening than the playful 'We warned you!' in the original.

