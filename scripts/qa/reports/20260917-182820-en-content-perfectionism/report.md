# QA: слепое парное сравнение переводов — en-content-perfectionism

- **Дата**: 2026-09-17T15:28:20.761Z
- **Метка**: en-content-perfectionism
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/perfectionism.json
- **Локали**: en
- **Сэмпл/файл**: 10
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 3907b3511f2db1a1d0814f4ca645e5f04015007c

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/perfectionism.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 10 | 🟢 7 | 🔴 0 | ⚪ 0 | 🟡 3 | 0 / 1 | 100% |
| **итого** | 10 | 🟢 7 | 🔴 0 | ⚪ 0 | 🟡 3 | 0 / 1 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×7, terminology/minor×1; OLD — style/minor×10, style/major×9, terminology/minor×4, terminology/major×2, omission/critical×1

### Детали пар (для спот-чека)

#### 🟢 en `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Помочь тестированию реальности (когнитивной реструктуризации) могут следующие вопросы:</h2> <li>Какие у меня есть доказательства, подтверждающие эту мысль или убеждение?</li> <li>Полезна ли эта мысль?</li> <li>Есть ли другие способы, которыми я могу думать…
- **OLD**: <h2>The following questions can help with reality testing (cognitive restructuring):</h2> <li>What evidence do I have that supports this thought or belief?</li> <li>Is this thought helpful?</li> <li>Are there other ways I can think about this situation or abou…
- **NEW**: <h2>The following questions can help with reality testing (cognitive restructuring):</h2> <li>What evidence do I have that supports this thought or belief?</li> <li>Is this thought helpful?</li> <li>Are there other ways I could think about this situation or my…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more natural and follows the professional CBT terminology guidelines. It uses 'adaptive belief' instead of a literal translation, uses correct em dashes, and avoids the clunky, repetitive phrasing found in A.
  - [old/terminology/minor] Used 'alternative belief' instead of the preferred 'adaptive belief'.
  - [old/style/major] The flow is heavy and feels like a translation; e.g., 'Is there a thirst for recognition behind perfectionism?' is much less natural than B's version.
  - [old/style/minor] Uses Russian-style quotes « » instead of English quotation marks.
  - [old/style/minor] Missing the hyphen in 'black-and-white thinking'.
  - [new/style/minor] Slightly more concise than the original, but fits the UX requirements perfectly.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 98)
  - Translation A is much more natural and follows the professional tone of a mental health app. It uses better phrasing ('holding myself to standards' vs 'adhering to standards') and avoids the clunky, literal translations found in B (e.g., 'your answer is negative' or 'back into this race again'). A also correctly uses em dashes and proper English quotation marks, whereas B uses Russian-style guillemets.
  - [old/style/major] Uses Russian guillemets (« ») instead of English quotation marks.
  - [old/style/major] Phrasing like 'your answer is negative' and 'back into this race again' sounds like a direct translation from Russian rather than natural English.
  - [old/style/minor] The sentence 'what if I do it perfectly, then what?' is redundant/clunky.
  - [old/terminology/minor] Used 'unfounded' instead of 'unreasonable' for standards, which is less common in this CBT context.

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: Исследователи считают, что невротический перфекционизм формируется под воздействием детского опыта с родителями, которые проявляли любовь условно (за оценки, результаты и т. п.) или вообще не проявляли никакого одобрения. В том и другом случае у ребенка появля…
- **OLD**: Researchers believe that neurotic perfectionism develops under the influence of childhood experiences with parents who either showed love only under certain conditions (for grades, results, achievements, etc.) or did not show approval at all. In both cases, th…
- **NEW**: Researchers believe that neurotic perfectionism is shaped by childhood experiences with parents who showed love conditionally (based on grades, achievements, etc.) or provided no approval at all. In both cases, a child develops a desire to be perfect to prove …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more natural and captures the nuances of the text better. Specifically, 'straight-A student' is a much more idiomatic way to translate 'синдром отличника' in this context than 'overachiever syndrome', and the final sentence in A flows much more smoothly for a native reader.
  - [new/style/minor] The phrasing 'worthy—both to themselves and to their parents' is slightly clunky compared to A's 'prove to their parents — and to themselves — that they can be good and worthy'.
  - [new/style/minor] 'Overachiever syndrome' is a bit more clinical/stiff than the idiomatic 'straight-A student' pattern used in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more natural and follows the 'expert friend' tone. It avoids the clunky, literal structures found in B (e.g., 'under the influence of', 'translate their success into grades'). A also uses more idiomatic psychological phrasing like 'overachiever syndrome' and 'all-or-nothing thinking' without unnecessary quotes or awkward phrasing.
  - [old/style/major] Uses 'under the influence of' which sounds like a literal translation of 'под воздействием' and is often associated with drugs; 'develops due to' or 'is shaped by' is better.
  - [old/style/minor] The phrase 'translate their success into grades' is a bit of a calque; 'formalize achievements through grades' (A) is more natural.
  - [old/style/minor] The sentence 'If it is impossible... as if thinking...' is overly wordy and heavy compared to the punchy, natural flow of A.

#### 🟢 en `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Современные ученые различают два типа перфекционизма: негативный и позитивный, или, иначе говоря, здоровый и патологический. Чтобы превратить минус в плюс, важно сочетать свои лидерские качества и стремление к совершенству со здравым смыслом и рациональностью.…
- **OLD**: Modern scientists distinguish two types of perfectionism: negative and positive, or in other words, healthy and pathological. To turn a minus into a plus, it's important to combine your leadership qualities and striving for perfection with common sense and rat…
- **NEW**: Modern researchers distinguish between two types of perfectionism: negative and positive—or, in other words, pathological and healthy. To turn a disadvantage into an advantage, it’s important to balance your leadership qualities and drive for excellence with c…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation B is significantly more natural and follows the project's tone of voice. It uses professional CBT terminology (automatic thought journal, work through) and avoids the clunky, literal phrasing found in A (e.g., 'diary of automatic thoughts' vs 'automatic thought journal').
  - [old/terminology/major] Used 'diary of automatic thoughts' instead of the canonical 'automatic thought journal'.
  - [old/style/major] Phrasing like 'turn a minus into a plus' and 'why you need it' (referring to overcoming perfectionism) sounds like a direct translation from Russian and is awkward in English.
  - [old/style/minor] The sentence 'everything should be done 100%' is grammatically weak; 'everything must be done perfectly' or similar would be better.
  - [new/style/minor] The transition 'It is crucial' is slightly more formal than the 'warm friend' tone, but it fits the gravity of the advice.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is much more natural and follows the professional tone of a mental health app. It uses correct CBT terminology ('automatic thought journal', 'rational response') and avoids the clunky, literal translations found in B (e.g., 'turn a minus into a plus', 'diary of automatic thoughts').
  - [old/style/major] Literal translations like 'turn a minus into a plus' and 'striving for perfection' sound like Russian-to-English calques.
  - [old/terminology/major] Used 'diary of automatic thoughts' instead of the standard 'automatic thought journal'.
  - [old/style/minor] Word order in 'prepared effective recommendations for working with perfectionism for you' is awkward and heavy.

#### 🟢 en `/exercise/title` — NEW лучше (2:0)

- **RU**: Как быть, если перфекционизм есть, идеала нет, а вы хотите нормально жить?
- **OLD**: What to do if you have perfectionism, no ideal, but want to live normally?
- **NEW**: What to do when perfectionism feels overwhelming, perfection seems impossible, and you just want to live a normal life?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 95)
  - Translation B captures the emotional essence and the 'expert friend' tone of the original, whereas Translation A is a clunky, literal word-for-word translation that sounds unnatural in English.
  - [old/style/major] The structure 'if you have perfectionism, no ideal' is a heavy calque from Russian and sounds very unnatural to a native speaker.
  - [old/style/minor] The phrase 'live normally' is grammatically correct but lacks the idiomatic flow of 'live a normal life'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 95)
  - Translation A is a beautiful transcreation that captures the emotional essence and rhythm of the original, sounding like natural English. Translation B is a literal, clunky calque that sounds like broken English.
  - [old/style/major] The structure 'if you have perfectionism, no ideal, but want...' is ungrammatical and sounds like a direct word-for-word translation from Russian.
  - [old/style/minor] The phrase 'no ideal' is unnatural in this context; 'perfection seems impossible' or 'there is no ideal' would be better.

#### 🟢 en `/exercise/description` — NEW лучше (2:0)

- **RU**: Статья рассматривает два типа перфекционизма негативный и позитивный, предлагая эффективные рекомендации по работе с перфекционистскими тенденциями. Автор представляет восемь ключевых стратегий, включая мотивацию к изменениям, когнитивную реструктуризацию, ори…
- **OLD**: The article examines two types of perfectionism - negative and positive, offering effective recommendations for dealing with perfectionist tendencies. The author presents eight key strategies, including motivation for change, cognitive restructuring, process o…
- **NEW**: This article explores two types of perfectionism—negative and positive—and offers effective strategies for managing perfectionistic tendencies. We’ll cover eight key approaches, including finding motivation for change, cognitive restructuring, focusing on the …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation B is much more natural and aligns with the 'understanding friend-expert' tone. It uses active, engaging language ('We’ll cover', 'you can overcome') and avoids the heavy, academic, and repetitive phrasing found in A.
  - [old/style/major] The phrasing 'process orientation instead of result orientation' is extremely clunky and sounds like a direct translation (calque) from Russian; 'focusing on the process rather than the result' in B is much better.
  - [old/style/minor] The use of 'one's self' (love oneself) is too formal/academic for the target tone.
  - [old/style/minor] The punctuation with a single hyphen instead of an em dash is a minor typographic error.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 72 / NEW 96)
  - Translation A sounds like a natural, engaging article written by a native speaker, whereas Translation B is a heavy, literal translation with clunky noun-heavy structures (e.g., 'process orientation instead of result orientation').
  - [old/style/major] Heavy use of nominalization ('formation of', 'orientation instead of') makes the text sound like a dry academic translation rather than a supportive article.
  - [old/style/minor] Uses a hyphen instead of an em dash for the parenthetical phrase.
  - [old/style/minor] The phrase 'love oneself unconditionally' is grammatically correct but feels more clinical/stiff than the warmer 'unconditional self-compassion' used in A.

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: <h2>Модель перфекционизма на примере</h2> Напомним, что согласно когнитивно-поведенческой психотерапии, наш жизненный опыт формирует убеждения о себе, других людях и мире. Эти убеждения, в свою очередь, определяют наши жизненные стратегии и правила. В качестве…
- **OLD**: <h2>A model of perfectionism in practice</h2> According to cognitive behavioral therapy, our life experience shapes our core beliefs about ourselves, other people, and the world. These beliefs, in turn, drive the rules and strategies we follow in everyday life…
- **NEW**: <h2>A model of perfectionism in practice</h2> As a reminder, according to cognitive behavioral therapy (CBT), our life experiences shape our beliefs about ourselves, others, and the world. These beliefs, in turn, determine our life strategies and rules. Let’s …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more natural and flows better for a native speaker. It avoids the slightly clunky 'As a reminder' and 'formed a core belief in Eugene' constructions found in B. A's list of beliefs also sounds more like natural internal monologue.
  - [new/style/minor] 'As a reminder' is a bit heavy for an intro; 'According to...' is smoother. 'Formed a core belief in Eugene' is slightly unidiomatic compared to 'led Eugene to develop'.
  - [new/style/minor] The list items in B are a bit more literal/stiff (e.g., 'I must succeed at everything' vs the more natural 'Everything I do has to work out').
  - [new/terminology/minor] Used 'burnout' for 'переутомление', which is a specific clinical state, whereas 'exhaustion' (used in A) is a closer match to the general feeling of overworking.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is superior because it strictly adheres to the project's glossary (using 'core belief' and 'CBT' correctly) and maintains a more natural, professional flow. Translation B makes several stylistic errors, such as using 'deep belief' instead of the canonical 'core belief' and failing to introduce the 'CBT' acronym upon first mention.
  - [old/terminology/major] Used 'deep belief' instead of the required 'core belief'.
  - [old/terminology/minor] Failed to introduce the 'CBT' acronym on first mention as per instructions.
  - [old/style/minor] The phrasing 'Everything I do has to work out' is a bit weak for the Russian 'У меня должно все получаться' compared to A's 'I must succeed at everything'.
  - [old/style/minor] Punctuation: used straight quotes and inconsistent period usage in list items.

#### 🟢 en `/exercise/screen_3/texts` — NEW лучше (2:0)

- **RU**: В жизни редко что дается без ошибок и неудач. Никто не рождается мастером – мы учимся, пробуем, ошибаемся и постепенно совершенствуемся. Так разрешите себе быть неидеальным, делать что-то не до конца, допускать промахи. Ошибки – не враги, а помощники на пути к…
- **OLD**: In life, rarely anything is achieved without mistakes and failures. No one is born a master - we learn, try, make mistakes, and gradually improve. So allow yourself to be imperfect, to do something incompletely, to make mistakes. Mistakes are not enemies, but …
- **NEW**: Life rarely comes without mistakes and setbacks. No one is born a master—we learn, try, make mistakes, and gradually improve. So, allow yourself to be imperfect, to do things incompletely, and to make mistakes. Errors aren't enemies; they are helpers on your p…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation B sounds natural, flows well, and adheres to the project's tone and terminology (using 'journal' instead of 'diary'). Translation A contains several awkward, literal constructions and uses incorrect quotation marks.
  - [old/style/major] Uses Russian-style guillemets (« ») instead of English quotation marks.
  - [old/style/major] Phrasing like 'In life, rarely anything is achieved' and 'the least significant ideal' is clunky and sounds like a translation.
  - [old/terminology/minor] Uses 'diary' instead of the preferred 'journal'.
  - [old/style/minor] The list items use imperative verbs, while B uses the more natural gerund form for this context.
  - [new/style/minor] The translation of the proverb is slightly more liberal than the original, but it works much better for a native reader.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is a high-quality, natural English text that follows all stylistic guidelines. Translation B contains several 'Russianisms' (calques), awkward phrasing, and incorrect punctuation (using French/Russian guillemets instead of English quotes).
  - [old/style/major] Uses « » instead of English “ ” quotes.
  - [old/style/major] Phrasing like 'In life, rarely anything is achieved' and 'Consistency is needed' sounds like a direct translation from Russian rather than natural English.
  - [old/terminology/minor] Used 'diary' instead of the project-standard 'journal'.
  - [old/style/minor] The proverb translation 'He who makes no mistakes makes nothing' is clunky compared to A's version.

#### 🟢 en `/exercise/screen_4/texts` — NEW лучше (2:0)

- **RU**: <h2>Используйте «технику жадности»</h2> Она основана на том простом факте, что большинство из нас стремится быть совершенным, чтобы преуспеть в жизни. Возможно, вам не приходило в голову, что вы можете оказаться намного успешнее, если понизите стандарты. К при…
- **OLD**: <h2>Use the «greed technique»</h2> It's based on the simple fact that most of us strive to be perfect in order to succeed in life. It might not have occurred to you that you could be much more successful if you lower your standards. For example, once a famous …
- **NEW**: <h2>Try the "greed technique"</h2> It’s based on a simple fact: most of us strive for perfection to succeed. It might not have occurred to you that you could be much more successful if you lowered your standards. For example, a well-known psychotherapist once …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is a high-quality localization that sounds natural to a native speaker. It correctly uses 'unhelpful beliefs' per the glossary, uses proper English punctuation (em dashes, curly quotes), and avoids the heavy, literal phrasing found in B.
  - [old/style/major] Uses Russian-style guillemets (« ») instead of English quotation marks (“ ”).
  - [old/style/major] Contains many 'translationese' constructions (e.g., 'at least once, better more', 'is not a sentence', 'under the guidance of a specialist') that sound unnatural.
  - [old/terminology/minor] Uses 'unhealthy beliefs' instead of the project-standard 'unhelpful beliefs'.
  - [old/style/minor] The phrasing 'one's own imperfection and the imperfection of other people' is very heavy and academic compared to the warm tone required.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is significantly more natural and follows the project's tone of voice guidelines. It uses 'unhelpful beliefs' instead of 'unhealthy', uses proper em dashes, and avoids the clunky, literal phrasing found in A (e.g., 'at the cost of high stress' vs 'with a lot of stress').
  - [old/style/major] Uses Russian-style quotation marks (« ») instead of English ones (“ ”).
  - [old/style/minor] Phrasing like 'with a lot of stress' and 'better more' is unidiomatic.
  - [old/terminology/minor] Uses 'unhealthy beliefs' instead of the preferred 'unhelpful beliefs'.
  - [old/style/minor] Uses 'specialist' instead of 'psychologist', which is less specific to the context.
  - [new/style/minor] The phrase 'bring perfectionism down to a healthy level' is slightly idiomatic but works well in context.

#### 🟡 en `/screen_4/texts`— вердикт неустойчив

- **RU**: Помимо влияния семьи, перфекционизм поощряется современным обществом. В школе и университетах преподаватели любят послушных учеников-отличников, а работодатели ценят сотрудников-перфекционистов. Рыночная экономика подталкивает людей к конкуренции, стремлению п…
- **OLD**: Beyond family influences, perfectionism is also encouraged by modern society. At school and university, teachers often favor compliant high achievers, and employers tend to value perfectionistic employees. A market-driven culture pushes people toward competiti…
- **NEW**: Beyond family influence, perfectionism is encouraged by modern society. In schools and universities, teachers favor compliant, high-achieving students, and employers value perfectionist employees. The market economy pushes people toward competition and a const…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A is much more natural and flows like a professional English text. Translation B suffers from several 'translationese' issues, such as 'achievement dependence' (instead of the standard 'addiction') and slightly clunky phrasing in the final paragraph.
  - [old/terminology/minor] used 'achievement dependence' instead of the more natural 'achievement addiction'
  - [old/style/major] the final sentence 'feel satisfaction with what you have done' is wordy and heavy compared to the elegant 'enjoy your work' in A
  - [old/style/minor] the phrase 'being satisfied with a good, workable result' is a bit of a departure from the original's 'приемлемым, хорошим результатом' (acceptable, good result)
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more sophisticated and flows naturally like a professional English publication. It avoids the slightly clunky phrasing of B (e.g., 'achievement addiction' vs 'achievement dependence') and handles the nuances of the text with better vocabulary choices ('social circle' vs 'attractive friends', 'workable result' vs 'achieving... results').
  - [new/style/minor] The phrase 'achievement addiction' is a bit heavy; 'dependence' or 'dependency' is more common in psychological contexts. 'Downtime' for 'отдых' is okay but 'rest' or 'leisure' is more direct. 'Nonsense' for 'ерунда' is a bit informal/strong compared to the original's tone.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Желание достичь высоких стандартов, успешно выполнить задачи и быть продуктивным является довольно положительным качеством. Также, как желание быть принятым, одобренным, любимым или иметь значимые достижения в жизни. Когда это остается на уровне желаний, стрем…
- **OLD**: Wanting to reach high standards, do things well, and be productive can be a very positive quality. The same goes for wishing to be accepted, appreciated, loved, or to have meaningful achievements in life. When these stay at the level of wishes, aspirations, an…
- **NEW**: The desire to reach high standards, succeed in tasks, and be productive is actually a fairly positive quality. It is similar to the desire to be accepted, approved, loved, or to achieve significant milestones in life. When these remain at the level of desires,…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is superior because it strictly adheres to the project's glossary (using 'adaptive beliefs' instead of 'constructive beliefs') and maintains a more professional, natural flow. Translation B fails to include the final quote from Elizabeth Gilbert (omission) and uses less precise terminology.
  - [old/omission/critical] The entire quote by Elizabeth Gilbert is missing.
  - [old/terminology/major] Used 'constructive beliefs' instead of the required 'adaptive beliefs'.
  - [old/style/minor] The phrasing 'the price of meeting them' is a bit more literal/clunky than 'the cost of meeting them'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is superior because it correctly uses the project-specific term 'adaptive beliefs' instead of the literal 'constructive beliefs'. It also handles the quote and the list structure with better flow and more natural English phrasing.
  - [old/terminology/major] Used 'constructive beliefs' instead of the required 'adaptive beliefs'.
  - [old/omission/minor] The Elizabeth Gilbert quote was completely omitted.
  - [old/style/minor] The list items end with commas, which is non-standard for this type of UX list.

