# QA: слепое парное сравнение переводов — en-final-g45-real_rebuff_self_help

- **Дата**: 2026-09-18T21:04:21.052Z
- **Метка**: en-final-g45-real_rebuff_self_help
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/depression/real_rebuff_self_help.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/real_rebuff_self_help.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 16 | 🟢 5 | 🔴 3 | ⚪ 0 | 🟡 8 | 1 / 1 | 63% |
| **итого** | 16 | 🟢 5 | 🔴 3 | ⚪ 0 | 🟡 8 | 1 / 1 | 63% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×5, style/major×2, omission/minor×2, omission/critical×1, terminology/minor×1; OLD — style/minor×11, omission/major×5, terminology/minor×3, terminology/major×3, omission/critical×1, style/major×1

### Детали пар (для спот-чека)

#### 🟢 en `/real/title` — NEW лучше (2:0)

- **RU**: А что если мои проблемы реальны?
- **OLD**: What If My Problems Are Real?
- **NEW**: What if my problems are real?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Translation A correctly follows the sentence case rule for a question/sentence, whereas Translation B uses Title Case, which is inappropriate for a standard question unless it were a specific UI header (and even then, sentence case is preferred for general text).
  - [old/style/minor] Uses Title Case instead of sentence case for a question.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Translation B correctly follows the sentence case rule for titles/questions in the UI, whereas Translation A uses Title Case, which is inappropriate for a conversational question.
  - [old/style/minor] Uses Title Case instead of sentence case, which is not the standard for this UI context.

#### 🔴 en `/rebuff/title` — OLD лучше (2:0)

- **RU**: Техника: Дай отпор внутреннему критику
- **OLD**: Technique: Stand Up to Your Inner Critic
- **NEW**: Technique: Standing up to your inner critic
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B follows the UX standard of using the imperative mood for titles and actions, whereas Translation A uses a gerund which sounds more like a description of a process than a title of an exercise.
  - [new/style/minor] Uses gerund 'Standing up' instead of the imperative 'Stand up', which is less punchy for a technique title.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A uses the imperative mood, which is the standard for titles of exercises and techniques in English. Translation B uses a gerund, which sounds more like a description of a process rather than a direct instruction/title.
  - [new/style/minor] Gerund 'Standing up' is less punchy and less standard for a technique title than the imperative 'Stand Up'.

#### 🟡 en `/rebuff/description`— вердикт неустойчив

- **RU**: В этой статье представлены эффективные методы для повышения самооценки, которые можно применять самостоятельно. Основная техника - это научиться противостоять внутреннему критику, для чего предлагается вести специальную таблицу с самокритичными мыслями, их ког…
- **OLD**: This article presents effective, self-guided methods for strengthening self-esteem. The core technique is learning to counter your inner critic by keeping a structured table of self-critical thoughts, their cognitive distortions, and rational responses. The ar…
- **NEW**: This article presents effective self-help methods for boosting self-esteem. The core technique involves learning to challenge your inner critic by keeping a specialized record of self-critical thoughts, their cognitive distortions, and adaptive responses. The …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A uses the correct CBT terminology ('adaptive responses') and flows more naturally for a professional article. Translation B uses 'rational responses', which is less standard in this context, and 'structured table', which sounds slightly more clunky than 'specialized record'.
  - [old/terminology/minor] Used 'rational responses' instead of the preferred 'adaptive responses' for CBT context.
  - [old/style/minor] 'Structured table' is a bit literal/clunky compared to 'record' or 'journal' in a psychological context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and flows better, sounding like a professional article. Translation B is slightly more repetitive and uses 'specialized record' which is less natural than 'structured table' in this context.
  - [new/style/minor] The phrasing 'achieve significant changes' is a bit heavy/clunky compared to 'create meaningful shifts'.
  - [new/terminology/minor] While 'adaptive responses' is technically correct in CBT, 'rational responses' (used in A) is also a standard way to describe the outcome of the technique in general psychoeducation.

#### 🟡 en `/real/screen_2/texts`— вердикт неустойчив

- **RU**: Основной вопрос заключается в определении границы между нормальной грустью и депрессией. В чем различие между "здоровой грустью" и настоящей депрессией? <important>Грусть — это естественная эмоция, возникающая в ответ на реалистичное осознание негативного собы…
- **OLD**: The key question is where to draw the line between normal sadness and depression. What’s the difference between “healthy sadness” and true depression? Sadness is a natural emotion that arises in response to a realistic awareness of loss or disappointment. For …
- **NEW**: The core question lies in defining the boundary between normal sadness and depression. What is the difference between “helpful sadness” and true depression? <important>Sadness is a natural emotion that arises in response to a realistic awareness of a negative …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is much more idiomatic and follows the 'expert friend' tone. It avoids the clunky, literal phrasing of B (e.g., 'the core question lies in defining the boundary' vs 'the key question is where to draw the line'). Translation A also correctly applies the project's terminology regarding 'helpful/unhelpful' logic by interpreting the metaphor of 'healthy sadness' more naturally, whereas B's 'meaningful' and 'deeper' phrasing feels slightly more like a translation than a native text.
  - [new/style/major] The opening sentence is very heavy and sounds like a textbook translation rather than a natural English sentence.
  - [new/style/minor] Phrases like 'the result of a natural emotional flow' and 'driven by cognitive distortions' are grammatically correct but feel slightly more academic/stiff than A's smoother flow.
  - [new/omission/minor] In the final sentence, 'reactive depression' is a bit redundant compared to the original 'reactive', though not a critical error.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is much more faithful to the original text's structure and nuances, especially regarding the specific CBT terminology and the emotional weight of the sentences. Translation B takes too many liberties with the meaning (e.g., changing 'desirable' to 'valuable' and 'loss of dignity' to 'loss of self-worth'), which alters the author's intent.
  - [old/mistranslation/major] The original says 'желательны' (desirable/meaningful), B changes this to 'valuable', which loses the philosophical nuance of the text.
  - [old/mistranslation/major] The original mentions 'потерей чувства собственного достоинства' (loss of dignity/self-respect), B translates this as 'loss of self-worth', which is a different psychological concept.
  - [old/omission/minor] B omits the <important> tags present in the original.
  - [old/style/minor] B uses 'healthy sadness', whereas the project guidelines and the context of the 'fruit' metaphor suggest 'helpful' is the preferred term for non-distorted states.

#### 🟢 en `/rebuff/screen_1/texts` — NEW лучше (2:0)

- **RU**: Мы разработали ряд простых, но эффективных техник для повышения самооценки. Эти методы, доступные для самостоятельного использования, помогут вам в этом непростом процессе. Прежде всего, важно понимать: одного лишь знания теории недостаточно для повышения само…
- **OLD**: We’ve developed a set of simple yet effective techniques to boost self-esteem. These methods are practical and self-guided. First, it’s crucial to understand that theory alone won’t raise self-esteem. Lasting change comes from regular practice. Set aside a lit…
- **NEW**: We’ve developed a series of simple yet effective techniques to help boost your self-esteem. These methods are designed for self-help and will support you through this challenging process. First and foremost, it’s important to understand: simply knowing the the…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A is superior because it strictly adheres to the project's glossary (using 'adaptive responses' instead of 'rational responses' and 'Automatic Thought Journal' instead of 'Diary') and maintains a warmer, more supportive tone. It also correctly preserves the HTML tags/structure which B omitted.
  - [old/omission/major] Omitted the <li> tags in the list, which breaks the technical structure of the source.
  - [old/terminology/minor] Used 'rational responses' instead of the required 'adaptive responses'; used 'Diary' instead of 'Journal'.
  - [old/style/minor] The tone is slightly more clipped/dry compared to the 'understanding friend' tone of A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B follows the CBT terminology guidelines perfectly (using 'adaptive responses' and 'Automatic Thought Journal'), whereas A uses 'rational responses' and 'Automatic Thoughts Diary', which are less aligned with the project's glossary. B also preserves the original structure and the quote, which A omitted.
  - [old/omission/major] Omitted the activity link, the list tags (li), and the Eleanor Roosevelt quote.
  - [old/terminology/minor] Used 'Diary' instead of 'Journal' and 'rational responses' instead of 'adaptive responses'.
  - [old/style/minor] The flow is a bit too clipped compared to the supportive tone of the original.

#### 🟢 en `/self_help/screen_1/texts` — NEW лучше (2:0)

- **RU**: Депрессия – словно темная завеса, окутывающая душу и мысли многих из нас. С каждым годом это психическое расстройство укрепляет свои позиции, невидимо проникая в жизни людей, оставляя после себя потерю сил, угасание интересов, пессимистические мысли, чувство о…
- **OLD**: Depression can feel like a dark veil over your mind and life. It drains energy and interest, fuels pessimistic thoughts, and brings a sense of disconnection—sadness about the past and worry about the future. The world can seem dim. If these lines resonate, you…
- **NEW**: Depression is like a dark veil covering the souls and minds of many of us. Each year, this mental health disorder becomes more prevalent, invisibly weaving itself into people’s lives and leaving behind exhaustion, a loss of interest, pessimistic thoughts, feel…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Translation A is a faithful, high-quality rendering of the original text, preserving its narrative rhythm and all key details. Translation B is an over-abbreviated version that omits significant portions of the text (the Aaron Beck quote and several descriptive sentences), making it an unacceptable omission for a long-form article.
  - [old/omission/critical] The entire Aaron Beck quote is missing, which is a major part of the source text.
  - [old/omission/major] Significant descriptive passages regarding the 'epidemic' and the 'dark veil' have been heavily condensed, losing the original's emotional weight.
  - [old/style/minor] The tone is too clipped and 'summary-like' compared to the original's supportive, narrative style.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Translation B is a much more faithful and complete rendering of the original text. Translation A suffers from significant omissions, skipping an entire paragraph (the Aaron Beck quote) and several descriptive sentences, which changes the depth and tone of the introduction. Translation B maintains the professional yet empathetic tone required for mental health content.
  - [old/omission/major] The entire Aaron Beck quote is missing.
  - [old/omission/major] The first paragraph is heavily condensed, losing the 'soul' metaphor and the specific list of symptoms (alienation, etc.).
  - [old/style/minor] The transition to the 'good news' is abrupt because the preceding context was deleted.

#### 🟢 en `/rebuff/screen_2/texts` — NEW лучше (2:0)

- **RU**: Создайте таблицу из трёх колонок в удобном для вас формате - это может быть блокнот, документ на компьютере или заметка в телефоне. Названия колонок: <li>Мысли критика</li> <li>Когнитивная ошибка</li> <li>Рациональный ответ</li> В первую колонку записывайте вс…
- **OLD**: Create a three-column table in any format you like—a notebook, a document on your computer, or a note on your phone. Label the columns: Critic’s Thought Cognitive Distortion Rational Response In the first column, write down every self-critical thought that com…
- **NEW**: Create a three-column table in whatever format works best for you—a notebook, a computer document, or a note on your phone. Label the columns: <li>Critic’s thoughts</li> <li>Cognitive distortion</li> <li>Adaptive response</li> In the first column, write down e…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is superior because it correctly uses the project's mandatory terminology ('Adaptive response') and includes the missing quote by Carl Rogers. Translation A also fails to include the quote and uses 'Rational Response' instead of the required term.
  - [old/omission/major] The entire Carl Rogers quote is missing.
  - [old/terminology/major] Used 'Rational Response' instead of the required 'Adaptive response'.
  - [old/style/minor] The list items in the original had HTML tags; A removed them, which might affect rendering, though B kept them.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is superior because it strictly adheres to the project's CBT terminology (using 'Adaptive response' instead of 'Rational response') and maintains the correct HTML structure for the list items. Translation B fails to include the <li> tags and uses 'Rational response', which is less aligned with the established 'adaptive' terminology.
  - [old/omission/major] Missing <li> tags in the column labels section.
  - [old/terminology/minor] Used 'Rational response' instead of the preferred 'Adaptive response'.
  - [old/style/minor] The phrasing 'there's nothing to dispute' is slightly less natural in this context than 'it will be hard to challenge'.

#### 🔴 en `/self_help/title` — OLD лучше (2:0)

- **RU**: Преодолевая темные дни: самопомощь как метод борьбы с депрессией
- **OLD**: Through the Dark Days: Self-Help as a Path out of Depression
- **NEW**: Overcoming Dark Days: Self-Help as a Way to Manage Depression
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and poetic for a title, using 'Through the Dark Days' which captures the journey-like essence of the original. Translation B is a bit more clinical and literal.
  - [new/style/minor] The phrase 'Way to Manage' is slightly more functional/clinical than the more evocative 'Path out of' or the original 'method of fighting' (борьбы).
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B is more idiomatic and captures the metaphorical nuance of 'преодолевая' through the prepositional phrase 'Through the Dark Days'. Translation A sounds slightly more like a clinical manual due to 'Way to Manage'.
  - [new/style/minor] The phrasing 'Way to Manage' is a bit clunky and less evocative than 'Path out of' for a title about overcoming a struggle.

#### 🟡 en `/self_help/screen_2/texts`— вердикт неустойчив

- **RU**: Многочисленные исследования подтверждают эффективность КПТ. Но мы также хотим подчеркнуть важность самопомощи, которая играет ключевую роль в процессе выздоровления, независимо от того, проходите ли вы лечение со специалистом или нет. <important>Например, иссл…
- **OLD**: Many studies support CBT’s effectiveness. Self-help also plays a crucial role—whether or not you’re seeing a clinician. For example, research by Dr. Forrest Scogin and colleagues found that bibliotherapy—working with a high-quality self-help book—can rival sta…
- **NEW**: Numerous studies confirm the effectiveness of CBT. However, we also want to emphasize the importance of self-help, which plays a key role in the recovery process, whether or not you are receiving professional treatment. <important>For example, research by Dr. …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is a faithful, high-quality translation that respects the original structure and tone. Translation B, while more 'punchy' and modern, takes too many liberties by omitting significant portions of the text (omissions) and changing the narrative flow, which makes it feel more like a summary than a translation.
  - [old/omission/major] Significant loss of detail: the specific mention of the University of Alabama, the full names of the researchers in several places, the detailed description of the tests, and the specific phrasing of the results are all condensed or removed.
  - [old/style/minor] The tone shifts from a narrative article to a summary/bullet-point style, which may not be the intended register for a long-form piece.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 78)
  - Translation A is a professional transcreation that reads like a high-quality English science article. It uses idiomatic clinical terms (e.g., 'clinician-rated', 'self-report', 'standard care') and avoids the heavy, repetitive sentence structures of the Russian original. Translation B is a literal, word-for-word translation that suffers from 'translationese', excessive wordiness, and awkward phrasing (e.g., 'brought new insight to the treatment', 'completed alongside trained depression researchers').
  - [new/style/major] Heavy 'translationese' and wordiness; sounds like a direct translation rather than native English prose.
  - [new/terminology/minor] The translation of the book title 'Feeling Good (Mood Therapy)' is redundant; in English, the book is simply 'Feeling Good'.
  - [new/style/minor] Phrasing like 'the results for both groups were reassessed' and 'the data showed not only...' is clunky and overly formal/academic in a non-native way.

#### 🟡 en `/real/screen_1/texts`— вердикт неустойчив

- **RU**: Читая наш раздел о депрессии или изучая когнитивный подход к этому расстройству, у вас может возникнуть вопрос: "КПТ считает, что депрессия всегда связана с искаженным мышлением, а что, если мои проблемы реальны?". Может быть, вы думаете, что ваши "реалистичны…
- **OLD**: As you read our section on depression or explore the cognitive approach to this condition, you may wonder: “CBT says depression is always tied to distorted thinking—but what if my problems are real?” You might feel that very real hardships—like the death of a …
- **NEW**: While reading our section on depression or studying the cognitive approach to this disorder, you might wonder: “CBT suggests that depression is linked to cognitive distortions, but what if my problems are real?”. You might feel that your “realistic” problems—s…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is much more natural and follows the 'expert friend' tone perfectly. It avoids the clunky 'While reading...' construction and uses better phrasing like 'tied to distorted thinking' and 'low mood'. Translation B fails significantly by omitting the entire quote at the end.
  - [new/omission/critical] The entire quote by Dan Reynolds is missing from the translation.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A is much more complete and faithful to the original text, including the quote which is entirely missing in B. Translation A also maintains the correct tone and structure throughout.
  - [old/omission/critical] The entire quote from Dan Reynolds was omitted.
  - [old/mistranslation/major] The translation of 'тоска' as 'yearning' is incorrect in this context; 'yearning' is a positive/poetic longing, whereas the original refers to a heavy, painful state (melancholy/sorrow).
  - [old/omission/major] The final sentence regarding the distinction between emotions and the disorder is significantly shortened and loses the nuance of the original.

#### 🟡 en `/real/test/answers`— вердикт неустойчив

- **RU**: Краткосрочное чувство печали после неприятного события Временное уменьшение интереса к любимым занятиям Продолжительное состояние апатии, отчаяния Повышенное чувство энергии и активности
- **OLD**: A short-term feeling of sadness after an unpleasant event A temporary dip in interest in favorite activities A prolonged state of apathy and despair Increased energy and activity
- **NEW**: Short-term feelings of sadness following an unpleasant event A temporary loss of interest in favorite activities A prolonged state of apathy and despair Increased feelings of energy and activity
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 92)
  - Translation A is more consistent in its use of plural 'feelings' for subjective states and maintains a professional yet accessible tone. Translation B's use of 'dip' is slightly too informal for this context, and the lack of articles/plurality in the last line makes it feel slightly clipped.
  - [old/style/minor] The word 'dip' is a bit too colloquial for a list of symptoms/states; 'loss' or 'decrease' is more standard.
  - [old/style/minor] The last line 'Increased energy and activity' lacks the 'feelings of' nuance present in the original 'чувство', making it sound more like a physiological measurement than a subjective state.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and natural for a list of symptoms or observations. Translation B uses slightly more wordy constructions ('feelings of energy and activity') which feels less like a professional clinical/UX list.
  - [new/style/minor] The use of 'feelings of energy and activity' is slightly more redundant and less punchy than the direct 'energy and activity' in A.
  - [new/style/minor] The first item uses plural 'feelings' while the others are singular, creating a slight lack of parallelism.

#### 🟡 en `/self_help/screen_3/texts`— вердикт неустойчив

- **RU**: Это было одним из первых исследований, подтвердивших эффективность самопомощи в лечении депрессии, но далеко не единственным. Также стоит отметить исследования шотландских ученых, которые открыли новую страницу в понимании лечения депрессии. Они выяснили, что …
- **OLD**: This was one of the early studies validating self-help—but far from the only one. Research from Scotland reached similar conclusions: well-designed self-help can be surprisingly effective. In a carefully controlled trial with over 200 people with mild to moder…
- **NEW**: This was one of the first studies to confirm the effectiveness of self-help in treating depression, but it was far from the only one. It is also worth noting research by Scottish scientists, which opened a new chapter in understanding depression treatment. The…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A is a faithful, high-quality translation that preserves the narrative flow, emotional depth, and specific details of the original text. Translation B, while attempting to be 'punchy', suffers from significant omissions and loss of the original's supportive, warm tone, turning a meaningful story into a series of fragmented bullet-point-like sentences.
  - [old/omission/major] Significant loss of detail regarding the Scottish scientists, the specific nature of the experiment, and the poetic imagery in the penultimate paragraph.
  - [old/style/major] The rhythm is broken; it feels like a summary rather than a cohesive article/narrative.
  - [old/style/minor] The phrase 'change is... likely' is a weak and unnatural way to translate 'изменения неизбежны' (inevitable).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Translation A is a professional transcreation that follows the 'expert friend' tone and UX guidelines, whereas Translation B is a heavy, literal translation that suffers from 'translationese' and wordiness. A uses natural English flow and avoids the clunky, repetitive structures of B.
  - [new/style/major] Heavy use of 'wordy' constructions (e.g., 'It is also worth noting', 'As it turned out', 'In those moments, feelings of... emerge') which sound like a direct translation from Russian rather than natural English.
  - [new/style/major] The rhythm is poor; the sentences are overly long and academic, violating the 'warm, supportive' tone requirement.
  - [new/style/minor] Uses 'deadlock' for 'тупик', which is less idiomatic in this emotional context than 'cul-de-sac' or 'rut'.
  - [old/omission/minor] A significantly condenses the text to improve readability, which is appropriate for the target market but technically omits some descriptive fluff from the original.

#### 🟡 en `/rebuff/screen_3/texts`— вердикт неустойчив

- **RU**: Ну и конечно, самая главная колонка в нашей таблице - альтернативный, рациональный ответ. Это самый настоящий отпор критику внутри себя. Важно заменять самокритическую мысль на более реалистичную и логичную, избегая чересчур оптимистичных заявлений. Надо замен…
- **OLD**: And of course, the most important column in our table is the alternative, rational response. This is your real pushback against the inner critic. Replace the self-critical thought with something realistic and logical—avoid hollow optimism. Don’t swing to the o…
- **NEW**: And of course, the most important column in our table is the adaptive response. This is where you truly stand up to your inner critic. It’s important to replace self-critical thoughts with more realistic and logical ones, while avoiding overly optimistic state…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A follows the project's glossary perfectly (using 'adaptive response' and 'unhelpful beliefs') and maintains a warm, expert tone. Translation B uses non-standard terms like 'destructive beliefs' and 'alternative, rational response', and its phrasing is slightly more fragmented.
  - [old/terminology/major] Used 'destructive beliefs' instead of the required 'unhelpful beliefs'.
  - [old/terminology/major] Used 'alternative, rational response' instead of the glossary-mandated 'adaptive response'.
  - [old/style/minor] The phrasing 'Don’t swing to the opposite extreme' is a bit more aggressive/instructional than the warm 'understanding friend' tone requested.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A is much more natural and idiomatic, reading like a high-quality English article rather than a translation. It avoids the clunky 'dichotomous' and 'adaptive response' repetition found in B, opting for smoother flow and better vocabulary (e.g., 'hollow optimism', 'pushback').
  - [new/style/major] The phrase 'Avoid being dichotomous' is very heavy and sounds like a textbook translation rather than a supportive friend; A's 'Don’t swing to the opposite extreme' is much more natural.
  - [new/terminology/minor] While 'adaptive response' is a valid term, the original text specifically uses 'рациональный ответ' (rational response) throughout most of the passage; A's consistency with the source's specific phrasing is better here.
  - [new/style/minor] The sentence structure in B is somewhat repetitive and lacks the rhythmic flow of a native writer.

#### 🟡 en `/real/screen_3/texts`— вердикт неустойчив

- **RU**: Однако порой бывает трудно определить конкретное стрессовое событие, вызвавшее этот эпизод. Такие депрессии часто называют "эндогенными", поскольку кажется, что их симптомы возникают из ниоткуда. Но в обоих случаях причина депрессии одна и та же - искаженные н…
- **OLD**: At times it’s hard to identify a specific stressful event that triggered an episode. Such depressions are often called “endogenous,” because the symptoms seem to arise out of nowhere. In both reactive and endogenous cases, distorted negative thoughts are key i…
- **NEW**: However, it can sometimes be difficult to identify a specific stressful event that triggered the episode. Such depression is often called “endogenous,” as it seems like the symptoms arise from nowhere. But in both cases, the underlying cause of depression is t…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is much more idiomatic and flows like a professional English-language article. It avoids the clunky 'psyche' and 'however' of Translation B, opting for more natural phrasing like 'the mind was already vulnerable'.
  - [new/style/major] Use of 'the psyche' sounds overly academic/clinical; 'the mind' is more natural for this tone.
  - [new/style/minor] Starting with 'However' is a bit heavy for this context; 'At times' or 'Sometimes' is smoother.
  - [new/terminology/minor] Used 'unhelpful, negative thoughts' which is fine, but A's 'distorted negative thoughts' aligns better with the CBT context of the paragraph.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 72 / NEW 95)
  - Translation A is a faithful, professional, and accurate rendering of the original text. Translation B introduces significant additions (hallucinations) that were not in the source, such as the entire final paragraph and extra sentences about cognitive distortions.
  - [old/addition/major] Added an entire paragraph about cognitive distortions and healthy sadness that does not exist in the original text.
  - [old/mistranslation/minor] The phrase 'In both reactive and endogenous cases' adds technical context not explicitly present in the Russian sentence structure.
  - [old/style/minor] The transition 'The hopeful side' is slightly less natural than 'The only positive side' in this context.

#### 🟢 en `/real/description` — NEW лучше (2:0)

- **RU**: В статье обсуждается различие между депрессией и естественной грустью, подчеркивая, что депрессия всегда связана с искаженным мышлением, в то время как грусть является нормальной реакцией на реальные события. Автор разъясняет, что даже серьезные жизненные проб…
- **OLD**: This article discusses the difference between depression and natural sadness, emphasizing that depression is always linked to distorted thinking, while sadness is a normal response to real events. It clarifies that even serious life problems do not directly ca…
- **NEW**: This article explores the difference between depression and natural sadness, highlighting that depression is linked to cognitive distortions, whereas sadness is a normal response to life events. It explains that even serious challenges do not lead directly to …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses superior CBT terminology ('cognitive distortions', 'unhelpful thoughts') and more natural, professional phrasing ('explores', 'addressing', 'managing') compared to the more literal and slightly repetitive Translation A.
  - [old/terminology/minor] Uses 'distorted thinking' and 'distorted thoughts' instead of the canonical 'cognitive distortions' and 'unhelpful thoughts'.
  - [old/style/minor] The phrasing 'brought on by' is slightly less polished than 'caused by' in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A uses much more professional and idiomatic CBT terminology ('cognitive distortions', 'addressing unhelpful thoughts') and flows better as a piece of psychological educational content. Translation B relies on literal translations ('distorted thinking', 'correcting distorted thoughts') which sound slightly clunky and less like a native-written article.
  - [old/terminology/minor] Uses 'distorted thinking' and 'distorted thoughts' instead of the canonical 'cognitive distortions' or 'unhelpful thoughts'.
  - [old/style/minor] The phrasing 'separating it from' is a bit literal; 'distinguishing it from' (as in A) is more natural for an article summary.

#### 🔴 en `/self_help/description` — OLD лучше (2:0)

- **RU**: Эта статья исследует глубокие аспекты депрессии, раскрывая её как многоликое психическое расстройство, окутывающее душу и мысли. Она предлагает глубокий взгляд на различные методы лечения, включая когнитивно-поведенческую терапию и библиотерапию, подкрепленную…
- **OLD**: This article explores the many facets of depression and offers a clear look at evidence-based treatments—including cognitive behavioral therapy (CBT) and bibliotherapy—supported by research findings. It aims to equip readers with practical self-help tools and …
- **NEW**: This article explores the profound aspects of depression, revealing it as a multifaceted mental health disorder that can cloud the soul and the mind. It offers a deep look into various treatment methods, including cognitive behavioral therapy (CBT) and bibliot…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is much more idiomatic and professional, avoiding the heavy, slightly poetic 'translationese' of A. It uses strong, concise verbs like 'equip' and 'grounded hope' which fit the 'expert friend' tone much better than the literal phrasing in A.
  - [new/style/minor] Phrases like 'cloud the soul and the mind' and 'deep look' feel a bit clunky and overly literal compared to natural English prose.
  - [new/omission/minor] The nuance of 'inspiring hope' is slightly weakened by the phrasing 'offering hope'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is much more idiomatic and professional, following the 'expert friend' tone by avoiding the heavy, poetic metaphors of the Russian original that sound unnatural in English. Translation B is too literal, resulting in a clunky, 'translated' feel (e.g., 'cloud the soul').
  - [new/style/major] The phrase 'cloud the soul and the mind' is a literal translation of a Russian metaphor that sounds overly dramatic and non-idiomatic in English mental health writing.
  - [new/style/minor] Repetitive sentence structure ('This article explores...', 'It offers...', 'The article aims...') makes the rhythm heavy.

