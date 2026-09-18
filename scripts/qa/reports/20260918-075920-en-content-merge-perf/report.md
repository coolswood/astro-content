# QA: слепое парное сравнение переводов — en-content-merge-perf

- **Дата**: 2026-09-18T04:59:20.388Z
- **Метка**: en-content-merge-perf
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 7897e0c~1
- **Файлы**: story/distortions/perfectionism.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 5
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 0307be282788e1af23069326cb8b79fe5b339e0f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/perfectionism.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 12 | 🟢 8 | 🔴 0 | ⚪ 0 | 🟡 4 | 0 / 0 | 100% |
| **итого** | 12 | 🟢 8 | 🔴 0 | ⚪ 0 | 🟡 4 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×8, terminology/minor×1; OLD — style/minor×13, style/major×8, terminology/minor×3, terminology/major×3

### Детали пар (для спот-чека)

#### 🟢 en `/exercise/screen_4/texts` — NEW лучше (2:0)

- **RU**: <h2>Используйте «технику жадности»</h2> Она основана на том простом факте, что большинство из нас стремится быть совершенным, чтобы преуспеть в жизни. Возможно, вам не приходило в голову, что вы можете оказаться намного успешнее, если понизите стандарты. К при…
- **OLD**: <h2>Use the «greed technique»</h2> It's based on the simple fact that most of us strive to be perfect in order to succeed in life. It might not have occurred to you that you could be much more successful if you lower your standards. For example, once a famous …
- **NEW**: <h2>Try the "greed technique"</h2> It’s based on a simple fact: most of us strive for perfection to succeed. It might not have occurred to you that you could be much more successful if you lowered your standards. For example, a well-known psychotherapist once …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is much more idiomatic and follows all the stylistic guidelines for the target market. It uses natural phrasing (e.g., 'at the cost of high stress', 'life sentence', 'with a psychologist') and correct punctuation (em dashes, curly quotes). Translation B contains several 'translationese' markers, awkward phrasing ('better more', 'not a sentence'), and uses incorrect quotation marks (« »).
  - [old/style/major] Uses Russian-style guillemets (« ») instead of English curly quotes.
  - [old/style/major] Phrasing like 'better more' and 'not a sentence' is unidiomatic.
  - [old/style/minor] Uses 'specialist' instead of 'psychologist', which is less specific to the context.
  - [old/terminology/minor] Uses 'unhealthy beliefs' instead of the preferred 'unhelpful beliefs'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more idiomatic and follows the project's specific tone and terminology guidelines. It uses 'unhelpful beliefs' instead of 'unhealthy', 'psychologist' instead of 'specialist', and avoids the clunky, literal phrasing found in A.
  - [old/terminology/major] Used 'unhealthy beliefs' instead of the required 'unhelpful beliefs'.
  - [old/style/major] Uses 'specialist' (too vague/literal) instead of 'psychologist'; uses 'scientific article' (less natural than 'paper' in this context); uses 'better more' which is ungrammatical.
  - [old/style/minor] Uses « » instead of proper English quotation marks “ ”.
  - [new/style/minor] Slightly more concise than the original, but fits the UX/natural flow perfectly.

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: <h2>Модель перфекционизма на примере</h2> Напомним, что согласно когнитивно-поведенческой психотерапии, наш жизненный опыт формирует убеждения о себе, других людях и мире. Эти убеждения, в свою очередь, определяют наши жизненные стратегии и правила. В качестве…
- **OLD**: <h2>A model of perfectionism in practice</h2> According to cognitive behavioral therapy, our life experience shapes our core beliefs about ourselves, other people, and the world. These beliefs, in turn, drive the rules and strategies we follow in everyday life…
- **NEW**: <h2>A model of perfectionism in practice</h2> As a reminder, according to cognitive behavioral therapy (CBT), our life experiences shape our beliefs about ourselves, others, and the world. These beliefs, in turn, determine our life strategies and rules. Let’s …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and flows better as a narrative article. It avoids the slightly clunky 'As a reminder' (which is a literal translation of 'Напомним') and uses more natural phrasing like 'gifted in music' and 'give 100%'. Translation B has a few minor issues with flow and terminology (using 'burnout' instead of 'exhaustion' for 'переутомление', which is a specific clinical term, though close).
  - [new/style/minor] The opening 'As a reminder' is a bit heavy/literal for a smooth English article.
  - [new/terminology/minor] Used 'burnout' for 'переутомление', whereas 'exhaustion' is a more direct and appropriate fit for the context of working too hard.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is superior because it strictly adheres to the project's terminology (using 'core belief' and introducing the 'CBT' acronym correctly) and maintains a more natural, professional flow. Translation B uses 'deep belief' instead of the canonical 'core belief' and has slightly clunkier phrasing in the list items.
  - [old/terminology/major] Used 'deep belief' instead of the required 'core belief'.
  - [old/style/minor] The list items in B feel slightly more translated/stiff compared to the idiomatic flow of A.

#### 🟢 en `/exercise/title` — NEW лучше (2:0)

- **RU**: Как быть, если перфекционизм есть, идеала нет, а вы хотите нормально жить?
- **OLD**: What to do if you have perfectionism, no ideal, but want to live normally?
- **NEW**: What to do when perfectionism feels overwhelming, perfection seems impossible, and you just want to live a normal life?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 92)
  - Translation A is a literal, clunky calque of the Russian structure that sounds unnatural in English. Translation B uses transcreation to capture the emotional essence and flow of the original, making it sound like a professional article headline.
  - [old/style/major] The structure 'if you have perfectionism, no ideal, but want...' is grammatically weak and sounds like a direct translation from Russian; 'no ideal' is an unnatural phrasing in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 95)
  - Translation A is a natural, idiomatic English sentence that captures the emotional essence of the original. Translation B is a literal, clunky word-for-word translation that sounds like 'broken English' and fails to convey the nuance of the question.
  - [old/style/major] The structure 'if you have perfectionism, no ideal, but want...' is ungrammatical and lacks proper flow/parallelism.
  - [old/style/minor] The phrase 'no ideal' is a weak, literal translation of 'идеала нет' and sounds unnatural in this context.

#### 🟢 en `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Современные ученые различают два типа перфекционизма: негативный и позитивный, или, иначе говоря, здоровый и патологический. Чтобы превратить минус в плюс, важно сочетать свои лидерские качества и стремление к совершенству со здравым смыслом и рациональностью.…
- **OLD**: Modern scientists distinguish two types of perfectionism: negative and positive, or in other words, healthy and pathological. To turn a minus into a plus, it's important to combine your leadership qualities and striving for perfection with common sense and rat…
- **NEW**: Modern researchers distinguish between two types of perfectionism: negative and positive—or, in other words, pathological and healthy. To turn a disadvantage into an advantage, it’s important to balance your leadership qualities and drive for excellence with c…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation B is significantly more idiomatic and aligns perfectly with the requested CBT terminology and tone. Translation A contains several 'translationese' markers and errors in terminology.
  - [old/terminology/major] Used 'diary of automatic thoughts' instead of the canonical 'automatic thought journal'.
  - [old/style/major] Used 'give them a rational response' instead of 'formulate a rational response' or 'provide an adaptive response'.
  - [old/style/minor] The phrase 'why you need it' (referring to overcoming perfectionism) is awkward; 'why you want to change' is much clearer.
  - [old/style/minor] Literal translation 'turn a minus into a plus' is less professional than 'turn a disadvantage into an advantage'.
  - [old/style/minor] The sentence structure 'We have prepared... for you' is slightly clunky compared to the more natural 'We've prepared... to help you'.
  - [new/style/minor] The order of 'pathological and healthy' is swapped from the original, but it flows better in English rhythm.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is much more idiomatic and follows the professional CBT terminology and UX tone guidelines. Translation B contains several 'Russianisms' (calques) and awkward phrasing.
  - [old/style/major] Calques like 'turn a minus into a plus', 'striving for perfection', and 'diary of automatic thoughts' sound unnatural in English.
  - [old/terminology/major] Used 'diary of automatic thoughts' instead of the canonical 'automatic thought journal'.
  - [old/style/minor] The sentence 'It's very important for you to...' is wordy and lacks the 'expert friend' tone.
  - [old/style/minor] The phrase 'why you need it' is a mistranslation of the intent; it should be 'why you want to change'.
  - [new/style/minor] The use of em dash in the first sentence is excellent for flow.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Желание достичь высоких стандартов, успешно выполнить задачи и быть продуктивным является довольно положительным качеством. Также, как желание быть принятым, одобренным, любимым или иметь значимые достижения в жизни. Когда это остается на уровне желаний, стрем…
- **OLD**: Wanting to reach high standards, do things well, and be productive can be a very positive quality. The same goes for wishing to be accepted, appreciated, loved, or to have meaningful achievements in life. When these stay at the level of wishes, aspirations, an…
- **NEW**: The desire to reach high standards, succeed in tasks, and be productive is actually a fairly positive quality. It is similar to the desire to be accepted, approved, loved, or to achieve significant milestones in life. When these remain at the level of desires,…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is superior because it correctly uses the mandatory CBT term 'adaptive beliefs' instead of the literal 'constructive beliefs' used in A. It also handles the quote by Elizabeth Gilbert much more idiomatically and follows the project's tone and terminology guidelines more strictly.
  - [old/terminology/major] Used 'constructive beliefs' instead of the required 'adaptive beliefs'.
  - [old/style/minor] The translation of the quote is a bit literal and lacks the punch of the original English source it was likely based on.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is superior because it adheres to the project's specific CBT terminology (using 'adaptive beliefs' instead of 'constructive beliefs') and maintains a much more natural, professional flow. It also correctly includes the Elizabeth Gilbert quote, which was omitted in Translation B.
  - [old/omission/critical] The entire quote by Elizabeth Gilbert was omitted.
  - [old/terminology/major] Used 'constructive beliefs' instead of the required 'adaptive beliefs'.
  - [old/style/minor] The phrasing 'The same goes for wishing...' is slightly less polished than A's approach.

#### 🟢 en `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Помочь тестированию реальности (когнитивной реструктуризации) могут следующие вопросы:</h2> <li>Какие у меня есть доказательства, подтверждающие эту мысль или убеждение?</li> <li>Полезна ли эта мысль?</li> <li>Есть ли другие способы, которыми я могу думать…
- **OLD**: <h2>The following questions can help with reality testing (cognitive restructuring):</h2> <li>What evidence do I have that supports this thought or belief?</li> <li>Is this thought helpful?</li> <li>Are there other ways I can think about this situation or abou…
- **NEW**: <h2>The following questions can help with reality testing (cognitive restructuring):</h2> <li>What evidence do I have that supports this thought or belief?</li> <li>Is this thought helpful?</li> <li>Are there other ways I could think about this situation or my…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is a professional-grade localization that follows all CBT terminology guidelines (using 'adaptive belief') and maintains a natural, engaging tone. Translation B feels like a literal translation with several issues: it uses 'unfounded' instead of the more natural 'unreasonable', fails to use the project's preferred term 'adaptive belief', uses 'negative' in a way that sounds like a clinical report rather than a conversation, and includes non-standard punctuation (Russian-style guillemets « »).
  - [old/terminology/major] Used 'alternative belief' instead of the required 'adaptive belief'.
  - [old/style/major] Used Russian guillemets « » instead of English quotation marks.
  - [old/style/minor] The phrasing 'your answer is negative' is a bit stiff/clinical compared to 'the answer is no'.
  - [old/style/minor] The sentence 'back into this race again' is missing a verb (e.g., 'you're back').
  - [old/style/minor] Used 'unfounded' which is less idiomatic here than 'unreasonable'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is significantly more idiomatic and follows the CBT terminology guidelines perfectly. It uses 'adaptive belief' instead of a literal translation and handles the conversational tone much more naturally.
  - [old/terminology/major] Used 'alternative belief' instead of the preferred 'adaptive belief'.
  - [old/style/minor] The conversational section 'Well, you wrote...' feels a bit clunky and literal compared to B's smoother flow.
  - [old/style/minor] Used 'black and white thinking' without hyphens in the header, which is less standard for an adjective phrase.
  - [old/style/minor] Used French-style guillemets « » instead of English quotation marks.

#### 🟢 en `/title` — NEW лучше (2:0)

- **RU**: Зависимость от идеала, перфекционизм
- **OLD**: Addicted to the Ideal: Perfectionism
- **NEW**: Perfectionism and the pursuit of ideals
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B is much more natural and idiomatic for a psychological context. Translation A sounds like a literal, clunky translation of 'зависимость' (addiction), which is not how perfectionism is typically described in English.
  - [old/style/major] The phrase 'Addicted to the Ideal' is a heavy calque and sounds unnatural in a mental health context; 'pursuit of ideals' or 'perfectionism' is more standard.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a natural, idiomatic way to express these concepts in English. Translation B sounds like a book title or a dramatic headline, which is inappropriate for a psychological context, and 'Addicted to the Ideal' is a clunky, non-standard way to translate 'Зависимость от идеала'.
  - [old/style/major] The phrasing 'Addicted to the Ideal' is unnatural and sounds overly dramatic/literary rather than clinical or descriptive.
  - [old/style/minor] Uses a colon, which changes the structure from a simple list/phrase to a title-subtitle format.

#### 🟡 en `/screen_4/texts`— вердикт неустойчив

- **RU**: Помимо влияния семьи, перфекционизм поощряется современным обществом. В школе и университетах преподаватели любят послушных учеников-отличников, а работодатели ценят сотрудников-перфекционистов. Рыночная экономика подталкивает людей к конкуренции, стремлению п…
- **OLD**: Beyond family influences, perfectionism is also encouraged by modern society. At school and university, teachers often favor compliant high achievers, and employers tend to value perfectionistic employees. A market-driven culture pushes people toward competiti…
- **NEW**: Beyond family influence, perfectionism is encouraged by modern society. In schools and universities, teachers favor compliant, high-achieving students, and employers value perfectionist employees. The market economy pushes people toward competition and a const…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and flows much better for a native reader. It avoids the slightly clunky 'achievement addiction' (B) in favor of 'achievement dependence' and uses more natural phrasing like 'social circle' and 'workable result'.
  - [new/style/minor] The phrase 'achievement addiction' sounds a bit more like a clinical pathology than the psychological concept of 'dependence' intended here.
  - [new/style/minor] The phrasing 'dictates trends and our understanding' is slightly more literal/stiff than A's 'sets trends and standards'.
  - [new/style/minor] The ending 'achieving acceptable, good results' is slightly less fluid than A's 'being satisfied with a good, workable result'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more idiomatic and flows better as a cohesive article. It avoids the slightly clunky phrasing found in B (e.g., 'achievement dependence' vs 'achievement addiction' and 'being satisfied with a good, workable result' vs 'achieving acceptable, good results'). A also handles the nuances of the 'ideal' definition more elegantly.
  - [old/style/minor] 'achievement dependence' is less idiomatic than 'achievement addiction' in this context.
  - [old/style/minor] 'workable result' is a bit of a stretch for 'приемлемым, хорошим результатом'.
  - [old/style/minor] The phrasing 'are portrayed as conditions for' adds a layer of meaning (portrayal) not explicitly in the Russian text, though it fits the context.

#### 🟡 en `/description`— вердикт неустойчив

- **RU**: Статья исследует перфекционизм, подчеркивая, что стремление к высоким стандартам может быть полезным, но когда оно превращается в жесткие требования, это приводит к негативным последствиям, таким как тревожность и неудовлетворенность жизнью. Примеры из жизни п…
- **OLD**: This article explores perfectionism, emphasizing that striving for high standards can be helpful, but when it turns into rigid demands, it leads to negative consequences such as anxiety and chronic dissatisfaction. Real-life examples show how early experiences…
- **NEW**: This article explores perfectionism, highlighting that while striving for high standards can be beneficial, it becomes harmful when it turns into rigid demands, leading to negative consequences like anxiety and life dissatisfaction. Real-life examples show how…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and flows better as a professional summary. Translation B introduces unnecessary wordiness ('contribute to the development of') and uses 'disappointment' instead of the more contextually accurate 'frustration' for burnout-related states.
  - [old/style/minor] Wordy phrasing: 'contribute to the development of' instead of 'shape'.
  - [old/style/minor] The phrase 'invitation to find a balance' is slightly more passive/wordy than the direct 'calls for a balance'.
  - [old/terminology/minor] Used 'disappointment' where 'frustration' (from the original 'разочарование' in the context of burnout) is more idiomatic for the psychological state described.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A sounds more natural and idiomatic for an article summary, especially with the use of 'aiming for excellence' and the nuanced 'good enough' result, which perfectly captures the psychological concept of 'приемлемый результат' in this context. Translation B is slightly more literal and clunky (e.g., 'life dissatisfaction' is less idiomatic than 'dissatisfaction with life' or just 'dissatisfaction').
  - [new/style/minor] 'life dissatisfaction' is a bit of a clunky construction compared to 'dissatisfaction with life' or the more flowing 'dissatisfaction' used in A.
  - [new/style/minor] 'reasonable results' is a bit dry and literal for 'приемлемый результат' in a psychological context; 'good enough' is the standard term for this concept.

#### 🟢 en `/exercise/screen_3/texts` — NEW лучше (2:0)

- **RU**: В жизни редко что дается без ошибок и неудач. Никто не рождается мастером – мы учимся, пробуем, ошибаемся и постепенно совершенствуемся. Так разрешите себе быть неидеальным, делать что-то не до конца, допускать промахи. Ошибки – не враги, а помощники на пути к…
- **OLD**: In life, rarely anything is achieved without mistakes and failures. No one is born a master - we learn, try, make mistakes, and gradually improve. So allow yourself to be imperfect, to do something incompletely, to make mistakes. Mistakes are not enemies, but …
- **NEW**: Life rarely comes without mistakes and setbacks. No one is born a master—we learn, try, make mistakes, and gradually improve. So, allow yourself to be imperfect, to do things incompletely, and to make mistakes. Errors aren't enemies; they are helpers on your p…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation B is significantly more idiomatic and follows the project's tone guidelines. Translation A contains several 'translationese' markers (e.g., 'rarely anything is achieved', 'consistency is needed') and uses incorrect quotation marks. B uses natural phrasing like 'Take it one step at a time' and 'Perfectionism thrives on failure'.
  - [old/style/major] Awkward word order in the first sentence ('In life, rarely anything is achieved...') and heavy, non-idiomatic phrasing throughout.
  - [old/style/minor] Uses guillemets (« ») instead of English quotation marks.
  - [old/terminology/minor] Uses 'diary' instead of the preferred 'journal'.
  - [new/style/minor] The list items use gerunds (-ing), whereas the original uses imperatives; however, this is a common stylistic choice in English lists and sounds very natural.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is a high-quality, idiomatic piece of writing that sounds like it was originally written in English. It follows all UX and stylistic guidelines, including the use of proper em dashes, contractions, and natural phrasing. Translation B feels like a literal translation from Russian, containing several awkward constructions and punctuation errors (like using French/Russian-style guillemets « » instead of English quotation marks).
  - [old/style/major] Uses « » instead of English quotation marks.
  - [old/style/major] Phrasing like 'In life, rarely anything is achieved' and 'Consistency is needed' is clunky and sounds like a translation.
  - [old/terminology/minor] Used 'diary' instead of the project-standard 'journal'.
  - [old/style/minor] The list items use imperative mood, whereas A uses the more natural gerund form for process-oriented goals in this context.

#### 🟢 en `/exercise/description` — NEW лучше (2:0)

- **RU**: Статья рассматривает два типа перфекционизма негативный и позитивный, предлагая эффективные рекомендации по работе с перфекционистскими тенденциями. Автор представляет восемь ключевых стратегий, включая мотивацию к изменениям, когнитивную реструктуризацию, ори…
- **OLD**: The article examines two types of perfectionism - negative and positive, offering effective recommendations for dealing with perfectionist tendencies. The author presents eight key strategies, including motivation for change, cognitive restructuring, process o…
- **NEW**: This article explores two types of perfectionism—negative and positive—and offers effective strategies for managing perfectionistic tendencies. We’ll cover eight key approaches, including finding motivation for change, cognitive restructuring, focusing on the …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A sounds like a natural, engaging article written by a native speaker, using idiomatic phrasing like 'focusing on the process rather than the result'. Translation B is a heavy, literal translation with clunky, non-idiomatic constructions like 'process orientation instead of result orientation' and 'formation of new... beliefs'.
  - [old/style/major] Heavy use of nominalizations (formation, orientation) makes the text sound like a dry academic abstract rather than a supportive article.
  - [old/style/minor] Uses a hyphen instead of an em dash for the parenthetical phrase.
  - [old/style/minor] The shift to 'love oneself' and 'take care of oneself' is grammatically correct but feels impersonal and stiff compared to the warm tone required.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Translation B sounds like a professional, engaging article written by a native speaker, whereas Translation A feels like a literal, slightly clunky translation. B uses much more natural phrasing ('embrace imperfection', 'focusing on the process', 'self-compassion') and avoids the repetitive 'orientation' used in A.
  - [old/style/major] Repetitive and heavy phrasing: 'process orientation instead of result orientation' is very unnatural; 'formation of new... beliefs' is a bit stiff.
  - [old/style/minor] Uses 'The author presents' and 'The main idea is', which is grammatically correct but feels more like a dry academic abstract than a supportive article.

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: Исследователи считают, что невротический перфекционизм формируется под воздействием детского опыта с родителями, которые проявляли любовь условно (за оценки, результаты и т. п.) или вообще не проявляли никакого одобрения. В том и другом случае у ребенка появля…
- **OLD**: Researchers believe that neurotic perfectionism develops under the influence of childhood experiences with parents who either showed love only under certain conditions (for grades, results, achievements, etc.) or did not show approval at all. In both cases, th…
- **NEW**: Researchers believe that neurotic perfectionism is shaped by childhood experiences with parents who showed love conditionally (based on grades, achievements, etc.) or provided no approval at all. In both cases, a child develops a desire to be perfect to prove …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and captures the nuance of the original text better. Specifically, 'straight-A student' is a much more natural way to translate 'синдром отличника' in an English context than 'overachiever syndrome'. Translation A also handles the flow of the final paragraph more gracefully.
  - [new/style/minor] The translation of 'синдром отличника' as 'overachiever syndrome' is a bit clunky; 'straight-A student' or 'perfectionist student' is more natural.
  - [new/style/minor] The phrasing 'to prove to their parents that they are worthy—both to themselves and to their parents' is repetitive and slightly awkward compared to A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is much more natural and idiomatic. It avoids the clunky, literal phrasing found in B (e.g., 'develops under the influence of', 'translate their success into grades'). A also correctly uses 'all-or-nothing thinking' as a smooth flow, whereas B uses a more mechanical 'polarized “all-or-nothing” thinking is activated'.
  - [old/style/major] Phrasing like 'develops under the influence of' and 'translate their success into grades' sounds like a translation rather than native English.
  - [old/style/minor] The term 'straight-A student pattern' is okay, but 'overachiever syndrome' in A is a more natural way to handle the concept of 'синдром отличника' in this context.
  - [old/style/minor] The sentence 'If it is impossible... the child may choose...' is unnecessarily wordy and heavy compared to A.

