# QA: слепое парное сравнение переводов — en-final-g45-perfectionism_plan_read

- **Дата**: 2026-09-18T21:02:11.195Z
- **Метка**: en-final-g45-perfectionism_plan_read
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/depression/perfectionism_plan_read.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/perfectionism_plan_read.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 17 | 🟢 3 | 🔴 1 | ⚪ 0 | 🟡 13 | 0 / 0 | 75% |
| **итого** | 17 | 🟢 3 | 🔴 1 | ⚪ 0 | 🟡 13 | 0 / 0 | 75% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×11, omission/minor×3, terminology/minor×2, style/major×1; OLD — style/minor×12, omission/major×4, terminology/major×2, mistranslation/minor×1, omission/minor×1, style/major×1

### Детали пар (для спот-чека)

#### 🟡 en `/plan/screen_3/texts`— вердикт неустойчив

- **RU**: Затем оценивайте каждую задачу по степени сложности и предполагаемому удовольствию. Пример может выглядеть так: <li>Дата: 31.01.2024</li> <li>Задача: Составить резюме</li> <li>Предполагаемая сложность: 80%</li> <li>Предполагаемое удовольствие: 15%</li> <li>Реа…
- **OLD**: Then rate each step by expected difficulty and anticipated enjoyment. An example might look like this: Date: 31.01.2024 Task: Write a résumé Expected difficulty: 80% Expected enjoyment: 15% Actual difficulty: 30% Actual enjoyment: 70% As you can see, writing t…
- **NEW**: Then, rate each task by difficulty and predicted enjoyment. An example might look like this: <li>Date: 31.01.2024</li> <li>Task: Write a resume</li> <li>Predicted difficulty: 80%</li> <li>Predicted enjoyment: 15%</li> <li>Actual difficulty: 30%</li> <li>Actual…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more faithful to the original structure (keeping the HTML tags) and uses more natural, idiomatic phrasing for the narrative part. Translation B makes several omissions and uses slightly less precise vocabulary.
  - [old/omission/major] Removed the HTML <li> tags present in the original.
  - [old/mistranslation/minor] 'each step' instead of 'each task' (задача).
  - [old/omission/minor] Omitted 'of this technique' in the second paragraph, making the sentence feel slightly disconnected.
  - [old/style/minor] 'more pleasant' is a bit weaker than 'more enjoyable' in this context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is more idiomatic and flows naturally, avoiding the repetitive 'significantly' and clunky 'results achieved' found in B. It also correctly removes the HTML tags which are likely artifacts of the source rather than intended content for the UI/article.
  - [new/style/minor] Repetitive use of 'significantly' in the final sentence.
  - [new/style/minor] The phrase 'results achieved' is a bit heavy/passive compared to 'visible results'.
  - [new/other/minor] Kept HTML tags which makes the text look unpolished for a final reader.

#### 🟡 en `/read/description`— вердикт неустойчив

- **RU**: В статье рассматривается концепция когнитивного искажения, известного как "чтение мыслей", которое описывает склонность людей предполагать, что они знают, что думают другие. Автор объясняет, как это искажение может приводить к ошибочным представлениям о воспри…
- **OLD**: This article examines the cognitive distortion known as “mind reading,” our tendency to assume we know what others are thinking. It explains how this bias leads to mistaken beliefs about how people see us and how it affects our emotions and relationships. The …
- **NEW**: This article explores the cognitive distortion known as “mind reading,” where we tend to assume we know what others are thinking. We’ll look at how this distortion can lead to mistaken perceptions of how others view us, affecting our emotional state and interp…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more concise, professional, and flows better as a high-quality editorial piece. Translation B uses 'We'll look at', which shifts the tone from an objective article summary to a more conversational/instructional tone that doesn't quite match the original's formal structure.
  - [new/style/minor] The shift to 'We'll look at' is slightly less professional for an article summary than the direct 'It explains' in A.
  - [new/style/minor] The phrasing 'mistaken perceptions of how others view us' is slightly wordier and less punchy than A's 'mistaken beliefs about how people see us'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more polished and flows naturally like a high-quality editorial piece. It uses a more engaging narrative voice ('We’ll look at...') and correctly uses the project-standard term 'mental well-being' instead of the more generic 'emotional well-being' used in B.
  - [old/terminology/minor] Uses 'emotional well-being' instead of the preferred 'mental well-being' for the context of overall health.
  - [old/style/minor] The phrasing 'our tendency to assume' is a bit heavy/clunky compared to the smoother flow in A.

#### 🟡 en `/perfectionism/test/answers`— вердикт неустойчив

- **RU**: Деструктивный перфекционизм Адаптивный перфекционизм Личностно-ориентированный перфекционизм Внешне-ориентированный перфекционизм
- **OLD**: Maladaptive perfectionism Adaptive perfectionism Self-oriented perfectionism Other-oriented perfectionism
- **NEW**: Unhelpful perfectionism Adaptive perfectionism Self-oriented perfectionism Other-oriented perfectionism
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - In the context of psychology and perfectionism, 'maladaptive' is the standard academic and clinical term used to contrast with 'adaptive'. While 'unhelpful' is our project's preferred term for 'unhelpful beliefs', 'maladaptive perfectionism' is the established terminology in CBT and psychological literature.
  - [new/terminology/minor] Using 'unhelpful' for perfectionism sounds slightly non-standard compared to the clinical term 'maladaptive'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A strictly follows the project's glossary by using 'unhelpful' for 'деструктивный' (as per the rule for unhelpful/adaptive beliefs), whereas Translation B uses 'maladaptive', which is a valid clinical term but deviates from the established project tone and terminology.
  - [old/terminology/minor] Used 'maladaptive' instead of the project-mandated 'unhelpful' for the unhelpful/adaptive pair.

#### 🟢 en `/read/title` — NEW лучше (2:0)

- **RU**: Мысли наизнанку: Освобождение от заблуждений чтения мыслей
- **OLD**: Inside-Out Thoughts: Letting Go of Mind Reading
- **NEW**: Inside Out: Breaking Free from Mind Reading
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B is more idiomatic and punchy for a title. 'Breaking free' is a much more natural and powerful collocation for overcoming cognitive distortions than the literal 'Letting go'.
  - [old/style/minor] The phrase 'Inside-Out Thoughts' feels slightly clunky compared to the more natural 'Inside Out' used as a thematic hook.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is punchy, idiomatic, and follows the standard English titling convention for articles or chapters. Translation B is a literal calque of the Russian structure, which sounds clunky and unnatural in English.
  - [old/style/major] The phrase 'Inside-Out Thoughts' is an unnatural construction; 'Inside Out' works better as a standalone evocative title.
  - [old/style/minor] 'Letting Go of Mind Reading' is grammatically fine but lacks the strength and impact of 'Breaking Free' in this context.

#### 🟢 en `/plan/title` — NEW лучше (2:0)

- **RU**: Техника: План действий против прокрастинации
- **OLD**: Technique: An Action Plan Against Procrastination
- **NEW**: Technique: Action Plan Against Procrastination
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - In titles and headings, omitting the indefinite article is more natural and follows standard English UX/editorial patterns. Translation A is concise and professional.
  - [old/style/minor] The use of 'An' makes the title feel more like a sentence fragment or a book title rather than a clean UI heading/technique label.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In UI/UX and titles, omitting the indefinite article 'An' makes the heading punchier and more professional. Translation B follows the standard 'Sentence case' or 'Title case' convention for headers without unnecessary filler.
  - [old/style/minor] The use of 'An' makes the title feel more like a sentence fragment from a textbook rather than a clean, modern app header.

#### 🟢 en `/perfectionism/title` — NEW лучше (2:0)

- **RU**: Перфекционизм: Когда стремление к идеалу становится ловушкой
- **OLD**: Perfectionism: When the Pursuit of the Ideal Becomes a Trap
- **NEW**: Perfectionism: When the pursuit of perfection becomes a trap
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is idiomatic, follows sentence case rules for titles, and uses the natural collocation 'pursuit of perfection'. Translation B uses awkward Title Case and a clunky, literal translation of 'стремление к идеалу'.
  - [old/style/major] Incorrect use of Title Case for a subtitle; should be sentence case.
  - [old/style/minor] 'Pursuit of the Ideal' sounds overly poetic/philosophical rather than psychological; 'pursuit of perfection' is the standard term.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B is more natural and idiomatic. Translation A uses 'the pursuit of the ideal', which sounds slightly overly formal and poetic, whereas 'pursuit of perfection' is the standard, natural way to express this concept in English.
  - [old/style/minor] The use of Title Case for the subtitle is acceptable for an article, but 'the pursuit of the ideal' is a bit clunky compared to the more common 'pursuit of perfection'.

#### 🟡 en `/plan/description`— вердикт неустойчив

- **RU**: В этой статье мы раскрываем секреты эффективной борьбы с прокрастинацией через проверенный метод листа антипрокрастинации. Откройте для себя, как простые шаги по разбиению задач и реалистичное оценивание их сложности и потенциального удовольствия от выполнения…
- **OLD**: In this article, we reveal the secrets of combating procrastination using a proven anti-procrastination worksheet. Discover how simple steps—breaking tasks down and realistically rating their difficulty and the potential enjoyment—can transform the way you app…
- **NEW**: In this article, we’ll reveal the secrets to effectively tackling procrastination using the proven anti-procrastination sheet method. Discover how simple steps—like breaking down tasks and realistically assessing their difficulty and potential enjoyment—can tr…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A is more concise and punchy, which is better for an article intro. Translation B is slightly wordy and uses 'mental well-being' where the original simply says 'self-feeling/well-being', making it feel a bit more heavy.
  - [new/style/minor] The phrase 'the proven anti-procrastination sheet method' is a bit clunky compared to 'a proven anti-procrastination worksheet'.
  - [new/style/minor] Added 'mental' to well-being, which slightly changes the scope from general well-being to specifically mental health.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and flows better as a professional article introduction. It uses 'tackling procrastination' and 'mental well-being', which align perfectly with the project's tone and glossary.
  - [old/style/minor] The phrase 'the potential enjoyment' feels slightly clunky due to the extra article; 'potential enjoyment' is more natural.
  - [old/style/minor] The transition 'transform the way you approach' is slightly wordier than the more direct 'transform your approach' in A.

#### 🟡 en `/plan/screen_1/texts`— вердикт неустойчив

- **RU**: Эта техника может особенно заинтересовать вас, если вы склонны откладывать дела, считая их слишком сложными или не приносящими удовольствия. На первом этапе в одну колонку запишите одну или две задачи, выполнение которых вы откладываете. Если задача требует зн…
- **OLD**: This technique is especially helpful if you tend to put things off because they feel too hard or not enjoyable. First, in one column, write down one or two tasks you’ve been postponing. If a task requires significant time and effort, break it into several smal…
- **NEW**: This technique may be particularly helpful if you tend to put things off because they feel too difficult or unrewarding. In the first stage, write one or two tasks you’ve been procrastinating on in one column. If a task requires significant time and effort, it…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more concise, flows better, and avoids the slightly clunky phrasing found in B. It feels more like a natural guide written by a native speaker.
  - [new/style/minor] The phrase 'tasks you’ve been procrastinating on' is a bit heavy compared to the smoother 'tasks you've been postponing' or 'putting off'.
  - [new/omission/minor] The Jack London quote in B is a bit literal; A's version (though A omitted the quote entirely in the provided text, I must judge based on the provided segments) is actually missing the quote in the snippet, but B's translation of it is slightly less idiomatic.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A is much more idiomatic and follows the professional tone of a mental health app. It uses 'unrewarding' instead of the clunky 'not enjoyable' and handles the quote with much better flow.
  - [old/style/minor] 'not enjoyable' is a bit weak/clunky compared to 'unrewarding' or 'not pleasurable'.
  - [old/omission/minor] The Jack London quote is missing entirely.

#### 🟡 en `/read/screen_1/texts`— вердикт неустойчив

- **RU**: Последнее когнитивное искажение, которое мы подробно рассмотрим, называется "Чтение мыслей". Это одна из ошибок мышления, когда мы убеждены, что знаем, что думает о нас другой человек, и часто предполагаем, что он думает что-то плохое. Если мы слишком полагаем…
- **OLD**: The last cognitive distortion we’ll look at in detail is called “mind reading.” This thinking error shows up when we’re convinced we know what someone else thinks of us—and we often assume it’s something negative. When we rely on mind reading, we’re often wron…
- **NEW**: The last cognitive distortion we’ll look at in detail is called “mind reading”. This is a thinking error where we’re convinced we know what another person is thinking about us, often assuming they’re thinking something negative. If we rely too heavily on mind …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A is much more idiomatic and flows like a natural English article. It avoids the clunky 'thinking error where' and 'make mistakes without realizing' structures found in B, opting for more active and engaging phrasing.
  - [new/style/major] The translation of the H2 header is very literal and heavy ('make mistakes without even realizing'), whereas A captures the essence more naturally.
  - [new/style/minor] The phrase 'misinterpret how others see us' is a bit wordy compared to the punchier 'wrong about what others think'.
  - [new/omission/minor] The Viktor Frankl quote was omitted entirely in version A, but A's prose is so much stronger that it remains the winner for the provided text block.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is more faithful to the original structure and tone, maintaining the flow of the narrative without unnecessary restructuring. Translation B omits the H2 tag and changes the sentence structure in a way that feels slightly disjointed.
  - [old/omission/major] The H2 tag was completely removed, which is a critical structural error for content rendering.
  - [old/style/minor] The sentence 'We’re mistaken because...' is a stylistic departure from the original 'We often make mistakes...' and loses the nuance of the H2 header.

#### 🟡 en `/read/screen_2/texts`— вердикт неустойчив

- **RU**: Примеры: <li>Не буду рассказывать ей о своих переживаниях, потому что она подумает, что я слабак</li> <li>Ему точно не понравится моя работа, потому что я сам недоволен ею</li> <li>Она так странно смотрит на меня, наверняка думает, что я толстая</li> Конечно, …
- **OLD**: Examples: I won’t tell her how I feel because she’ll think I’m weak. He definitely won’t like my work, because I’m not happy with it myself. She’s looking at me strangely—she must think I’m fat. Of course, in all these cases there’s some chance people will thi…
- **NEW**: Examples: <li>I won’t tell her about my struggles because she’ll think I’m weak</li> <li>He definitely won’t like my work because I’m not happy with it myself</li> <li>She’s looking at me so strangely; she must think I’m fat</li> Of course, in all these exampl…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is superior because it preserves the original HTML structure (li, h2, q tags), which is critical for technical implementation. It also provides a more accurate and natural translation of the final quote and maintains the flow of the instructional text without losing nuances.
  - [old/omission/major] Lost all HTML tags (li, h2, q), which would break the layout if used as a direct replacement.
  - [old/style/minor] The translation of the quote 'We see them as we are' is slightly less idiomatic than the standard English version used in A.
  - [old/style/minor] The phrase 'what people believe about you' is a bit heavy compared to 'what people are thinking about you' in this context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is much more natural and idiomatic for a mental health context. It avoids the clunky, literal phrasing found in B (e.g., 'actual likelihood of other possibilities' or 'mistake our own thoughts for the truth'). A also correctly handles the tone by being concise and smooth.
  - [new/style/major] The phrasing 'rather than on the actual likelihood of other possibilities' is very heavy and sounds like a translation rather than natural English.
  - [new/style/minor] The sentence 'that doesn’t mean someone giving us a sideways glance is necessarily thinking something bad about us' is wordy and lacks the punch of the original.
  - [new/omission/minor] Translation A removed the HTML tags in the examples, which might be an issue if this is for a CMS, but B's inclusion of them is fine; however, A's text flow is superior.

#### 🟡 en `/perfectionism/screen_1/texts`— вердикт неустойчив

- **RU**: Перфекционизм может неожиданно выступать как симптом, так и причина депрессии. Для многих высокие стандарты и требования к себе и окружающим кажутся движущей силой. Однако, когда ожидания становятся нереалистичными, они могут превратиться в ловушку, ведущую к …
- **OLD**: Perfectionism can unexpectedly act as both a symptom and a cause of depression. For many, high standards and demands on oneself and others can feel like a driving force. However, when expectations become unrealistic, they can turn into a trap—leading to a cons…
- **NEW**: Perfectionism can unexpectedly act as both a symptom and a cause of depression. For many, high standards and strict demands on themselves and others feel like a driving force. However, when expectations become unrealistic, they can turn into a trap, leading to…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A is more idiomatic and follows the project's tone guidelines more closely. Specifically, it uses 'maladaptive perfectionism' (a more natural psychological term in this context) and 'not measuring up' which sounds more like a native speaker than 'sense of inadequacy'.
  - [new/style/minor] The phrase 'constant sense of inadequacy' is slightly more clinical/stiff than the more natural 'sense of not measuring up' in A.
  - [new/style/minor] The list of signs in B is a bit wordy ('an inability to accept criticism, and being overly harsh') compared to the smoother parallel structure in A ('intolerance of criticism, and excessive strictness').
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is superior because it strictly adheres to the project's terminology (using 'unhelpful' instead of 'maladaptive') and maintains a more natural, supportive tone. Translation B uses 'maladaptive', which is technically correct in psychology but deviates from the specific 'unhelpful' instruction provided in the glossary, and its phrasing in some places feels slightly more clinical/stiff.
  - [old/terminology/minor] Used 'maladaptive perfectionism' instead of the project-standard 'unhelpful perfectionism'.
  - [old/style/minor] Phrasing like 'intolerance of criticism' is slightly more formal/stiff than the smoother 'inability to accept criticism' in A.

#### 🟡 en `/plan/screen_2/texts`— вердикт неустойчив

- **RU**: По завершении, в последние две колонки запишите, насколько сложной оказалась задача на самом деле и какое удовольствие вы испытали от её выполнения или от полученного результата, используя процентную шкалу для оценки. <instagram ids="18042843029166400"> Пример…
- **OLD**: When you finish, use the last two columns to record how difficult the task actually was and how much enjoyment you felt during or after completing it—again using percentages. Example: A lawyer who had recently lost a job couldn’t start the search for a new one…
- **NEW**: Once finished, use the last two columns to record how difficult the task actually was and how much enjoyment you experienced from completing it or from the result, using a percentage scale. <instagram ids="18042843029166400"> Example: A lawyer who recently los…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more faithful to the original structure and tone, maintaining the list format and the specific nuance of the instructions. Translation B takes too many liberties with the phrasing and omits the list tags, which are crucial for the technical implementation.
  - [old/omission/major] The <li> tags were removed, which breaks the intended structure/format of the content.
  - [old/style/minor] The phrasing 'during or after completing it—again using percentages' is a bit too informal and deviates from the original's instructional clarity.
  - [old/style/minor] The translation of 'непреодолимыми задачами' as just 'overwhelming' loses the weight of the original 'insurmountable'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 86)
  - Translation A is much more natural and idiomatic for a native speaker. It avoids the clunky 'percentage scale' and 'insurmountable tasks' phrasing, opting for smoother UX-friendly language like 'using percentages' and 'overwhelming'.
  - [new/style/minor] The phrasing 'insurmountable tasks' and 'monitoring job search sites' sounds slightly more formal/stiff than necessary.
  - [new/style/minor] The phrase 'from the result' is a bit wordy compared to A's 'after completing it'.
  - [new/omission/minor] Lost the Instagram tag, though this might be a technical oversight.

#### 🟡 en `/perfectionism/screen_2/texts`— вердикт неустойчив

- **RU**: Если вы узнали себя в этих описаниях, не отчаивайтесь. Существуют эффективные методы преодоления перфекционизма. Однако важно осознать, что в самой сути перфекционизма лежит парадокс: совершенство является иллюзией. В мире всё можно усовершенствовать, и стремл…
- **OLD**: If you recognize yourself in these descriptions, don’t lose heart. There are effective ways to move beyond perfectionism. It’s important to see the paradox at the core of perfectionism: perfection is an illusion. Everything in the world can be improved, and th…
- **NEW**: If you recognize yourself in these descriptions, don’t lose hope. There are effective ways to work through perfectionism. However, it is important to realize that at the very heart of perfectionism lies a paradox: perfection is an illusion. In this world, ever…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 86)
  - Translation A is much more idiomatic and flows like a professional English article. It avoids the heavy, slightly clunky structures of Translation B (e.g., 'at the very heart of... lies a paradox'). Translation A also correctly uses 'maladaptive' which is the standard psychological pairing for 'adaptive', whereas B uses 'unhelpful' which, while in the glossary for beliefs, is less common for describing types of perfectionism in a clinical/educational context.
  - [new/style/minor] The phrasing 'at the very heart of perfectionism lies a paradox' is a bit dramatic/clunky for a supportive expert tone.
  - [new/terminology/minor] Used 'unhelpful perfectionism' instead of the more standard 'maladaptive perfectionism' used in the context of adaptive/maladaptive dichotomy.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Translation A is superior because it strictly adheres to the project's terminology guidelines, specifically using 'unhelpful' instead of the clinical/outdated 'maladaptive'. It also maintains a more consistent tone and better preserves the structure of the original text.
  - [old/terminology/major] Used 'maladaptive' instead of the required 'unhelpful' for unhelpful/adaptive perfectionism paradigm.
  - [old/style/minor] The phrasing 'the world's and your own imperfections' is slightly clunky compared to A's smoother flow.
  - [old/omission/minor] Omitted the 'shackles' metaphor from the important block, which changes the emotional weight of the sentence.

#### 🔴 en `/perfectionism/test/question` — OLD лучше (2:0)

- **RU**: Как называется тип перфекционизма, который не приводит к самокритике и страху ошибок?
- **OLD**: What is the type of perfectionism that does not lead to self-criticism and fear of mistakes?
- **NEW**: What is the name of the type of perfectionism that does not lead to self-criticism and fear of mistakes?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A is more concise and natural for an English speaker. Translation B is a literal translation of the Russian 'Как называется...', which sounds slightly wordy and redundant in English.
  - [new/style/minor] unnecessary wordiness ('What is the name of the type' vs 'What is the type')
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B is more direct and natural for a question. Translation A uses a wordy 'What is the name of...' construction which sounds slightly more like a formal quiz or a textbook definition rather than a natural conversational question.
  - [new/style/minor] unnecessarily wordy 'What is the name of the type' instead of 'What is the type'

#### 🟡 en `/perfectionism/description`— вердикт неустойчив

- **RU**: Перфекционизм – это стремление к идеалу, которое может стать как вашим союзником, так и врагом. В этой статье мы рассмотрим деструктивный перфекционизм, который приводит к самокритике, страху ошибок и, как следствие, к депрессии.
- **OLD**: Perfectionism is the drive toward an ideal that can become either your ally or your enemy. In this article, we look at maladaptive perfectionism—the kind that fuels self-criticism, fear of mistakes, and, as a result, depression.
- **NEW**: Perfectionism is a drive for excellence that can be both an ally and an enemy. In this article, we’ll explore unhelpful perfectionism—the kind that leads to self-criticism, fear of making mistakes, and, ultimately, depression.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A uses the project-approved term 'unhelpful perfectionism' and flows much more naturally for a native reader. Translation B uses 'maladaptive', which is more clinical/academic, and 'the drive toward an ideal' sounds slightly more clunky than 'a drive for excellence'.
  - [old/terminology/major] Used 'maladaptive perfectionism' instead of the preferred 'unhelpful' terminology for the project's tone.
  - [old/style/minor] The phrasing 'the drive toward an ideal' is a bit heavy compared to the more idiomatic 'drive for excellence'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'maladaptive perfectionism', which is the standard clinical term in English for the concept described, whereas B uses 'unhelpful', which is a project-specific term for beliefs but sounds slightly weak for a formal article topic. A's flow is more sophisticated and professional.
  - [new/terminology/minor] While 'unhelpful' is used in the project for beliefs, 'maladaptive' is the more natural and precise term for perfectionism in a psychological article context.
  - [new/style/minor] The phrasing 'a drive for excellence' is slightly more cliché than 'the drive toward an ideal'.

#### 🟡 en `/read/screen_3/texts`— вердикт неустойчив

- **RU**: <h2>Оспаривание мыслей</h2> Задайте себе вопросы: «Какие у меня есть доказательства, подтверждающие эти мысли? А какие есть аргументы против?». Эта техника позволит формализировать и взвесить ваши предположения. Обычно мы рассуждаем не слишком рационально, но …
- **OLD**: Challenging thoughts Ask yourself: “What evidence supports these thoughts? And what evidence contradicts them?” This technique helps you formalize and weigh your assumptions. We’re not always very rational, but when we compare the “for” and “against,” we’re fo…
- **NEW**: <h2>Challenging your thoughts</h2> Ask yourself: “What evidence do I have that supports these thoughts? And what evidence do I have against them?” This technique will help you formalize and weigh your assumptions. We don’t usually reason very rationally, but w…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more polished, follows the UX guidelines (sentence case in headers, proper terminology), and sounds like a professional English article. Translation B has several issues: it misses the HTML tags, uses non-standard terminology ('thinking errors' instead of 'cognitive distortions'), and contains awkward phrasing ('torturing yourself', 'compare the for and against').
  - [old/omission/major] Missing HTML tags (h2, important)
  - [old/terminology/major] Used 'thinking errors' instead of the canonical 'cognitive distortions'
  - [old/style/minor] Header 'Challenging thoughts' should be sentence case or follow the original's structure; 'Considering alternatives' is a departure from 'Finding alternatives'
  - [old/style/minor] 'torturing yourself' is too dramatic/heavy compared to the original 'мучиться' in this context
  - [old/style/minor] 'compare the for and against' is unidiomatic; 'weigh the pros and cons' (as in A) is the standard English expression
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A is more idiomatic and flows better as a piece of psychoeducation. It avoids the slightly clunky 'mental pathology' and 'reason very rationally' found in B, opting for more natural English phrasing. A also correctly uses 'emotional well-being' which fits the context of the text better than the slightly more clinical 'mental well-being' in this specific sentence.
  - [new/style/minor] 'Reason very rationally' is a bit heavy; 'reasoning' or 'thinking' is more natural.
  - [new/terminology/minor] 'Mental pathology' is a bit more clinical/heavy than the original 'психической патологии' in a supportive context; 'mental disorder' (used in A) is more standard for this tone.
  - [new/style/minor] The phrasing 'What we do about them' is fine, but A's 'what we do with them' feels slightly more natural in this specific flow.

#### 🟡 en `/perfectionism/screen_3/texts`— вердикт неустойчив

- **RU**: Попробуйте составить список преимуществ и недостатков вашего перфекционизма. Примерно таким образом: <h2>Преимущества:</h2> <li>я внимателен к мелочам</li> <li>у меня высокий уровень ответственности</li> <li>он помогает мне достигать хороших результатов на раб…
- **OLD**: Try listing the advantages and disadvantages of your perfectionism. For example: Advantages: I pay attention to details I have a high sense of responsibility It helps me achieve strong results at work Disadvantages: I’m very afraid of mistakes and always criti…
- **NEW**: Try making a list of the pros and cons of your perfectionism. It might look something like this: <h2>Pros:</h2> <li>I pay attention to detail</li> <li>I have a high level of responsibility</li> <li>It helps me achieve good results at work</li> <h2>Cons:</h2> <…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and idiomatic for a mental health app. It uses 'advantages and disadvantages' which fits the instructional tone better than the slightly more casual 'pros and cons' in B, and it correctly uses contractions ('I'm', 'can't') which is the required style.
  - [new/style/minor] Uses 'pros and cons' which is a bit too informal for this context; lacks contractions ('I am') which makes the tone feel stiff and less like a 'supportive friend'.
  - [new/omission/minor] Stripped the HTML tags present in the original, though this might be a formatting choice, it's technically an omission of the source structure.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much better because it preserves the HTML structure of the original, which is critical for technical implementation. It also uses more natural, idiomatic phrasing ('pros and cons', 'pay attention to detail') compared to the slightly more formal/clunky 'advantages and disadvantages' in B.
  - [old/omission/major] Lost all HTML tags (h2, li), which changes the formatting of the content.
  - [old/style/minor] Uses 'advantages and disadvantages' which is slightly more formal/heavy than the idiomatic 'pros and cons' used in A.

