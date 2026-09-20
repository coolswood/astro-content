# QA: слепое парное сравнение переводов — en-final-g45-control_death_diagnostic

- **Дата**: 2026-09-18T20:50:57.221Z
- **Метка**: en-final-g45-control_death_diagnostic
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/depression/control_death_diagnostic.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression/control_death_diagnostic.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 15 | 🟢 4 | 🔴 3 | ⚪ 0 | 🟡 8 | 0 / 2 | 57% |
| **итого** | 15 | 🟢 4 | 🔴 3 | ⚪ 0 | 🟡 8 | 0 / 2 | 57% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×12, style/major×4, mistranslation/major×2, terminology/minor×2, omission/minor×2; OLD — style/minor×7, omission/minor×3, omission/critical×2, omission/major×1

### Детали пар (для спот-чека)

#### 🔴 en `/control/screen_2/texts` — OLD лучше (2:0)

- **RU**: Может быть так, что при депрессии почистить зубы или принять душ будет для вас достижением, в этом нет ничего ужасного или стыдного, поверьте. И тогда рядом с этими занятиями вы будете писать букву «Д». Также отмечайте степень трудности. Например, заправить по…
- **OLD**: With depression, brushing your teeth or taking a shower can be an achievement—there’s nothing wrong or shameful about that. In such cases, add an “A.” Also note the difficulty level. For example, making the bed was fairly easy—so that might be “A-2.” Cooking l…
- **NEW**: When dealing with depression, things like brushing your teeth or taking a shower might feel like a real achievement; believe me, there is nothing wrong or shameful about that. In those cases, you would write the letter “A” next to the task. You should also not…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 92 / NEW 72)
  - Translation B is much more natural and follows the UX/tone guidelines. Translation A makes a critical error by changing the letter 'Д' to 'A' (likely trying to adapt it to English, but failing to maintain the logic of the example 'D-2' later in the text) and adds a hallucinated meaning for 'У' ('Unforgettable pleasure'). Translation B handles the adaptation of letters more cleanly and uses much better flow.
  - [new/mistranslation/major] The translator changed 'Д' to 'A' in the first paragraph, but then used 'D-2' in the second paragraph, creating a logical contradiction. Also, 'У-удовольствие' was translated as 'Unforgettable pleasure', which is a massive addition/hallucination not present in the original.
  - [new/style/minor] The phrasing 'you would write the letter' is a bit wordy for a supportive guide.
  - [old/omission/minor] The list items are slightly more condensed than the original, but this is acceptable for better English flow.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 65)
  - Translation A is much more natural and follows the 'understanding expert' tone. Translation B makes a critical error by hallucinating a meaning for the letter 'U' ('Unforgettable pleasure') and fails to handle the letter 'Д' (D) correctly, whereas A correctly adapts the letter to the English context (A for Achievement).
  - [new/mistranslation/critical] Hallucinated 'Unforgettable pleasure' for 'У-удовольствие'; the original just uses the letter as a marker.
  - [new/mistranslation/major] Inconsistent lettering: uses 'A' in the first paragraph but 'D' in the second, whereas A consistently uses 'A' (Achievement).
  - [new/style/minor] The phrasing 'You should also note' is slightly more directive/heavy than the original's supportive tone.
  - [old/omission/minor] The Instagram tag was omitted, though this might be a formatting artifact.

#### 🟡 en `/diagnostic/description`— вердикт неустойчив

- **RU**: Статья рассказывает о способах диагностики депрессии: от общего распознавания симптомов до самостоятельной оценки состояния с помощью «Шкалы депрессии Бека». Она подчёркивает важность обращения к специалистам для точного диагноза и поддержки, особенно при выра…
- **OLD**: This article explores ways to assess depression—from recognizing common symptoms to self-evaluation using the Beck Depression Inventory (BDI). It emphasizes the importance of consulting professionals for an accurate diagnosis and support, especially when sympt…
- **NEW**: The article covers various ways to diagnose depression, from recognizing general symptoms to self-assessment using the Beck Depression Inventory (BDI). It emphasizes the importance of seeking professional help for an accurate diagnosis and support, especially …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and uses better collocations for a mental health context ('diagnose depression' and 'severe symptoms'). Translation B uses 'assess depression' and 'pronounced symptoms', which sound slightly more clinical or stiff in this context.
  - [old/style/minor] 'Assess depression' is acceptable but 'diagnose' or 'identify' is more standard for an article overview; 'pronounced symptoms' is a bit formal/stiff compared to 'severe'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A uses more sophisticated and natural vocabulary ('explores ways to assess' vs 'covers various ways to diagnose'), which fits the 'expert friend' tone better. Translation B uses 'diagnose' in the first sentence, which is slightly too clinical/heavy for a general article description, and 'severe' is a bit more medical than the original 'выраженных'.
  - [new/style/minor] The use of 'diagnose' in the opening sentence sounds slightly more clinical/stiff than 'assess' or 'identify' for a general reader.

#### 🟡 en `/control/screen_3/texts`— вердикт неустойчив

- **RU**: Если вы будете регулярно составлять расписание дня, то вскоре заметите, что ваша мотивация растет, потому что начиная делать хоть что-то, вы опровергнете свои убеждения о том, что не способны делать что-либо. Один человек, который долгое время был в депрессии …
- **OLD**: If you keep making a daily schedule, you’ll likely notice your motivation grow: doing even a little challenges the belief that you can’t do anything. Someone who lived with depression for a long time and struggled with procrastination shared their experience w…
- **NEW**: If you keep a daily schedule regularly, you will soon notice your motivation growing. By starting to do even small things, you will begin to challenge the belief that you are incapable of doing anything. One person who struggled with long-term depression and p…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A is much more idiomatic and flows naturally, avoiding the clunky 'If you keep... regularly' construction in B. It also uses a more sophisticated structure to link the motivation to the challenging of beliefs, whereas B feels like a series of disconnected sentences.
  - [new/style/major] Redundant phrasing: 'keep a daily schedule regularly' is tautological.
  - [new/style/minor] The sentence structure is heavy and feels like a direct translation from Russian (translationese).
  - [new/terminology/minor] Used 'feedback' instead of 'experience/review', which sounds slightly more clinical/corporate than the warm tone required.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more faithful to the original structure and tone, maintaining the formal yet supportive narrative flow. Translation B introduces unnecessary stylistic changes (like the colon in the first paragraph) and loses the specific quote formatting/tags present in the source.
  - [old/omission/major] Lost the specific XML-style tags (<dialog>, <q>) which are crucial for the technical structure of the input.
  - [old/style/minor] The first sentence is slightly too condensed compared to the original's explanatory rhythm.
  - [old/style/minor] Changed 'shared their feedback' to 'shared their experience', which is a slight shift in meaning.

#### 🟡 en `/control/description`— вердикт неустойчив

- **RU**: В статье представлена уникальная техника планирования "Две Колонки", направленная на улучшение самоорганизации и повышение личной эффективности. Читатели узнают, как простое разделение задач на "планы" и "факты" может помочь не только в достижении поставленных…
- **OLD**: This article presents a practical planning approach—the Two-Column method—designed to improve personal organization and boost effectiveness. You’ll see how a simple split between “Plan” and “What Actually Happened” can help you not only reach goals but also re…
- **NEW**: This article introduces the unique “Two-Column” planning technique, designed to improve self-organization and boost personal effectiveness. You’ll learn how simply splitting tasks into “plans” and “facts” can help you not only achieve your goals but also refle…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A sounds much more natural and professional for an English-speaking reader, using idiomatic phrasing like 'What Actually Happened' instead of the literal and awkward 'facts'. Translation B suffers from 'translationese' and heavy use of literal calques from the Russian source.
  - [new/style/major] The term 'facts' for 'факты' in this context is a literal calque; in English planning contexts, we describe the outcome or reality, not just 'facts'.
  - [new/style/minor] The phrase 'simply splitting tasks' is slightly clunky compared to 'a simple split'.
  - [new/style/minor] The transition 'We'll focus on...' introduces a 'we' that wasn't explicitly in the original, making it feel more like a lecture than an article description.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is much more natural and follows the 'understanding friend' tone, whereas B feels slightly more academic and uses clunky phrasing like 'Special attention goes to'. A also preserves the specific terms 'plans' and 'facts' from the original more accurately.
  - [old/style/minor] The phrasing 'Special attention goes to' is a bit passive and stiff for this context.
  - [old/mistranslation/minor] The term 'What Actually Happened' is a significant departure from the original 'facts' (факты), making it wordy and less punchy.

#### 🟡 en `/diagnostic/screen_3/texts`— вердикт неустойчив

- **RU**: <h2>Консультация со специалистом</h2> Если результаты самодиагностики указывают на возможное депрессивное состояние, важно обратиться к психологу, психиатру или психотерапевту. Специалист поможет уточнить диагноз и подобрать подходящий план поддержки и лечения…
- **OLD**: Consulting a professional If self-assessment suggests a possible depressive state, it’s important to reach out to a psychologist, psychiatrist, or psychotherapist. A specialist will help clarify the diagnosis and propose an appropriate plan for support and tre…
- **NEW**: <h2>Consultation with a specialist</h2> If your self-assessment results suggest possible depression, it’s important to reach out to a psychologist, psychiatrist, or psychotherapist. A specialist can help clarify a diagnosis and find the right support and treat…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more natural, flows better, and adheres strictly to the 'supportive expert' tone. It avoids the slightly clunky phrasing found in B (e.g., 'We’re here alongside you' or 'propose an appropriate plan'). Translation A also correctly handles the HTML tags which were present in the original.
  - [old/omission/major] Missing the <h2> and <important> HTML tags present in the original.
  - [old/style/minor] Phrasing like 'We’re here alongside you' is slightly unnatural compared to 'We’re here to support you'.
  - [old/style/minor] 'Consulting a professional' as a header is a bit dry compared to the original structure.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A is more idiomatic and flows better as a cohesive piece of psychoeducation. Translation B contains several 'translationese' markers and slightly clunky phrasing (e.g., 'medical support' instead of 'medication', 'steps toward self-care' instead of a more natural flow).
  - [new/style/minor] 'medical support' is a bit vague/clinical compared to the more natural 'medication' or 'medication support' in this context.
  - [new/style/minor] 'steps toward self-care' is a slight deviation from the original 'шагам навстречу себе' (steps toward yourself/forward), though acceptable, it feels a bit more like a cliché.
  - [new/style/minor] The phrasing 'provide a better understanding of what you’re going through' is fine, but A's 'deepen understanding of your condition' feels more professional for this specific context.

#### 🔴 en `/control/title` — OLD лучше (2:0)

- **RU**: Техника: День под контролем
- **OLD**: Technique: A Day in Control
- **NEW**: Technique: Day Under Control
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A uses the idiomatic expression 'in control', which sounds natural for a title. Translation B is a literal calque from Russian ('under control') that sounds awkward in this context.
  - [new/style/major] The phrase 'Day Under Control' is unidiomatic; a native speaker would say 'Day in Control' or 'Staying in Control'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation B uses the idiomatic 'in control', which sounds natural for a title, whereas Translation A is a literal calque of the Russian structure.
  - [new/style/minor] The phrase 'Day Under Control' sounds slightly unnatural/clunky; 'in control' is the standard English idiom for this meaning.

#### 🔴 en `/death/description` — OLD лучше (2:0)

- **RU**: Статья рассказывает историю Анастасии, пережившей глубокую депрессию и тяжёлое чувство вины после трагической смерти брата. Благодаря психотерапии она смогла постепенно освободиться от самообвинений, изменить отношение к себе и своим переживаниям. Постепенно А…
- **OLD**: This article tells the story of Anastasia, who experienced profound depression and a heavy sense of guilt after her brother’s tragic death. Through psychotherapy, she gradually let go of self-blame and changed the way she related to herself and her experiences…
- **NEW**: This article tells the story of Anastasia, who experienced deep depression and intense guilt following the tragic death of her brother. Through psychotherapy, she was able to gradually let go of self-blame, change how she viewed herself and her experiences, an…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A follows the original sentence structure and rhythm perfectly, making it easier to read. Translation B attempts to combine the last two sentences into one long, cumbersome sentence, which feels less natural for a narrative summary.
  - [new/style/minor] The sentence structure is overly complex and loses the punchy, progressive rhythm of the original by merging the final thoughts into a single long clause.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more idiomatic and has a better narrative rhythm. It avoids the long, slightly breathless sentence structure of A by breaking the text into two clear parts, which is more natural for an article summary.
  - [new/style/minor] The second sentence is overly long and becomes a run-on, making it harder to read than the segmented approach in B.

#### 🟢 en `/diagnostic/screen_1/texts` — NEW лучше (2:0)

- **RU**: В прошлом разделе мы уже говорили о том, что такое депрессия. Теперь давайте разберёмся, как можно определить её у себя. Условно диагностику депрессии можно разделить на три этапа: <instagram ids="18067256407767438,18071830373069533"> <h2>Общий скрининг</h2> К…
- **OLD**: In the previous section, we discussed what depression is. Now let’s look at how you can recognize it in yourself. For clarity, we can think of depression assessment in three stages: General screening Like any other emotional state, depression shows up through …
- **NEW**: In the previous section, we discussed what depression is. Now, let’s look at how you can identify it in yourself. Identifying depression generally involves three stages: <instagram ids="18067256407767438,18071830373069533"> <h2>General screening</h2> Like any …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is superior because it preserves all HTML tags (h2, li, instagram, q), which is critical for technical implementation. It also uses more natural, idiomatic English for a mental health context (e.g., 'identify it in yourself' vs 'recognize it', and 'profound apathy' vs 'marked apathy').
  - [old/omission/critical] All HTML tags (h2, li, instagram, q) were stripped out, which would break the layout/rendering.
  - [old/style/minor] The phrasing 'For clarity, we can think of...' is a bit wordy compared to the original's directness.
  - [old/style/minor] The list items lack the structure/formatting of the original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 84 / NEW 95)
  - Translation B is much more natural and follows the source structure perfectly, including the HTML tags which A omitted. B also uses better idiomatic phrasing (e.g., 'activities you used to enjoy' vs 'usual activities').
  - [old/omission/major] Omitted all HTML tags (instagram, h2, li, q), which is critical for technical/content integrity.
  - [old/style/minor] The phrasing 'For clarity, we can think of...' is a bit wordy compared to the directness of B.

#### 🟡 en `/death/screen_2/texts`— вердикт неустойчив

- **RU**: Самообвинения Анастасии появились ещё до трагедии. Она часто думала, что её жизнь сложилась удачнее, чем у брата, и пыталась помогать ему эмоционально и финансово во время его длительной борьбы с депрессией. Она поддерживала его в решении обратиться к психолог…
- **OLD**: Anastasia’s self-blame began even before the tragedy. She often thought her life had turned out better than her brother’s and tried to help him—emotionally and financially—through his long struggle with depression. She supported his decision to see a psycholog…
- **NEW**: Anastasia’s self-blame began even before the tragedy. She often felt her life had turned out better than her brother’s, and she tried to support him both emotionally and financially during his long struggle with depression. She encouraged him to see a psycholo…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and flows much better as a narrative piece. Translation B contains several 'translationese' markers and slightly clunky phrasing (e.g., 'it can be clear', 'carry the punishment', 'influence things beyond her control'). A's use of em dashes and more natural verb choices makes it feel like it was originally written in English.
  - [new/style/minor] 'it can be clear' is a weak, non-idiomatic construction compared to 'it's clear'.
  - [new/style/minor] 'carry the punishment' is less natural than 'bear punishment'.
  - [new/style/minor] 'influence things beyond her control' is a bit wordy/clunky compared to 'control what was beyond her power'.
  - [new/omission/minor] Lost the <li> tags present in the original for the list items.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more polished and follows the source structure more accurately, especially regarding the list items. Translation B loses the HTML tags and has slightly more awkward phrasing in the conclusion.
  - [old/omission/major] The <li> tags were removed, which breaks the intended structure of the text.
  - [old/style/minor] The phrasing 'bear punishment' is slightly less idiomatic than 'carry the punishment' or 'bear the punishment' in this context, though acceptable.

#### 🟢 en `/death/title` — NEW лучше (2:0)

- **RU**: Поиски себя после потери близкого человека
- **OLD**: Finding Yourself After Losing a Loved One
- **NEW**: Finding Yourself After the Loss of a Loved One
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Both are grammatically correct and natural, but Translation A is more elegant and fits the tone of a professional article title better. Translation B is slightly more colloquial/informal.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Both are grammatically correct, but B uses the more idiomatic and natural noun phrase 'the loss of a loved one' for a title, whereas A sounds slightly more like a casual description of an ongoing process.
  - [old/style/minor] Using the gerund 'losing' is slightly less formal/polished for a title than the noun 'the loss'.

#### 🟢 en `/diagnostic/title` — NEW лучше (2:0)

- **RU**: Диагностика депрессии: Путешествие к пониманию себя
- **OLD**: Depression Assessment: A Journey Toward Understanding Yourself
- **NEW**: Understanding Depression: A Journey to Self-Discovery
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B is much more idiomatic and natural for a title. 'Understanding Depression' is a smoother way to convey the essence of the topic than the clinical-sounding 'Depression Assessment', and 'Self-Discovery' is a more evocative and common term for this context than 'Understanding Yourself'.
  - [old/style/minor] The phrase 'Depression Assessment' sounds overly clinical and dry compared to the poetic 'Journey' part of the title; 'Understanding Yourself' is a bit wordy for a title.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more idiomatic and evocative for a title, using 'Self-Discovery' which fits the 'Journey' metaphor perfectly. Translation B is slightly more literal and clunky.
  - [old/style/minor] The phrasing 'A Journey Toward Understanding Yourself' is a bit wordy and less punchy for a title compared to 'A Journey to Self-Discovery'.

#### 🟡 en `/diagnostic/screen_2/texts`— вердикт неустойчив

- **RU**: Самодиагностика с помощью проверенных методик Существует множество инструментов, которые помогают оценить своё состояние. Одним из самых известных и надёжных считается «Шкала депрессии Бека» (BDI). Эта методика, созданная психотерапевтом Аароном Беком, включае…
- **OLD**: Self-assessment with validated tools There are many instruments that help you assess your state. One of the best known and most reliable is the Beck Depression Inventory (BDI). Developed by psychiatrist Aaron Beck, it includes 21 symptom categories, each refle…
- **NEW**: Self-assessment using proven methods There are many tools available to help you assess how you’re feeling. One of the most well-known and reliable is the “Beck Depression Inventory” (BDI). Developed by psychotherapist Aaron Beck, this method includes 21 items,…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A sounds more natural and professional, using 'depressive experience' and 'approximate indication' which fits the tone of a high-quality mental health app. Translation B contains a terminology error regarding Aaron Beck's profession and uses a slightly clunky phrasing in the quote.
  - [new/terminology/minor] While Beck was a psychotherapist, in English-speaking clinical contexts, he is most famously referred to as a psychiatrist (as in A).
  - [new/style/minor] The quote 'an important part of them' is grammatically correct but sounds slightly weak/clunky compared to the more idiomatic 'an important part of it' or 'an essential part of your responsibilities'.
  - [new/style/minor] The use of quotation marks around the name of the scale is unnecessary in English once the acronym is provided.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Translation A sounds much more natural and follows the 'understanding friend' tone. Translation B uses heavy, unnatural phrasing like 'assess your state' and 'approximate indication of severity', which sounds like a machine translation.
  - [old/style/major] 'assess your state' is a Russianism; 'assess how you're feeling' is much more natural.
  - [old/style/major] 'approximate indication of severity' is overly wordy and academic (clunky).
  - [old/terminology/minor] The original says 'психотерапевт', A uses 'psychotherapist', B uses 'psychiatrist'. While Beck was a psychiatrist, we should stick to the source text.
  - [old/omission/major] The quote by Lennard Davis is completely missing in translation B.

#### 🟡 en `/death/screen_3/texts`— вердикт неустойчив

- **RU**: <li>Если бы она знала о его намерениях, она сделала бы всё, чтобы помочь и предотвратить трагедию. Но она не знала — и изменить то, что было скрыто, было невозможно.</li> <li>Обвиняя себя, Настя словно предполагала, что обязана была предвидеть будущее и облада…
- **OLD**: Had she known his intentions, she would have done everything to help and prevent the tragedy. But she didn’t know—and you can’t change what you couldn’t see. By blaming herself, Anastasia was assuming she should have foreseen the future and possessed limitless…
- **NEW**: <li>If she had known his intentions, she would have done everything possible to help and prevent the tragedy. But she didn’t know—and it was impossible to change what was hidden.</li> <li>By blaming herself, Anastasia was acting as if she were required to fore…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A is more idiomatic and flows better as a narrative piece. It uses more natural phrasing (e.g., 'you can’t change what you couldn’t see' vs the clunky 'it was impossible to change what was hidden'). Translation B suffers from slight stiffness and minor tense inconsistencies.
  - [new/style/minor] The phrase 'it was impossible to change what was hidden' is a bit literal and heavy compared to the more natural A.
  - [new/style/minor] The shift to 'Her responsibility was only to...' feels slightly less impactful than the present tense 'is' used in A, which works well for a universal truth/lesson.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more consistent in its narrative voice and maintains the third-person perspective of the story. Translation B makes an abrupt and uncharacteristic shift to the second person ('you can't change what you couldn't see'), which breaks the storytelling flow.
  - [old/style/major] Inconsistent person: shifts from 'she' to 'you' in the first paragraph, which is jarring in a narrative context.
  - [old/style/minor] The shift from past tense ('was') to present tense ('is') in the fourth paragraph is slightly inconsistent with the narrative flow.
  - [old/style/minor] The phrase 'taking responsibility for his action' (singular) is slightly less natural than 'actions' (plural) in this context.

#### 🟡 en `/control/screen_1/texts`— вердикт неустойчив

- **RU**: <activitylink id="lsafnanS3sf"> Первое упражнение, которым мы хотим поделиться с вами, простое, но эффективное, и поможет в вашей самоорганизации. Вечером, накануне следующего дня, сядьте и напишите свое расписание на день. Оно будет состоять из двух частей, с…
- **OLD**: The first exercise we’d like to share is simple yet effective and supports your personal organization. In the evening, plan the next day: write out a schedule with two parts—and two columns. The first column is “Before.” It’s an hourly plan of what you want to…
- **NEW**: <activitylink id="lsafnanS3sf"> The first exercise we want to share with you is simple yet effective, and it will help with your self-organization. In the evening, before the next day begins, sit down and write out your schedule. It will consist of two parts, …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Translation A is much more natural and follows the UX guidelines for a 'supportive expert' tone. Translation B is overly wordy, contains several 'translationese' structures (e.g., 'it will consist of', 'therefore'), and fails to handle the specific 'Д-дело' instruction correctly, whereas A provides a logical English equivalent.
  - [new/style/major] The text is too wordy and follows the Russian sentence structure too closely (e.g., 'It will consist of two parts, and therefore, two columns'), which sounds unnatural in English.
  - [new/mistranslation/major] The instruction for 'Д-дело' is poorly handled. 'D (for Deed)' is a literal attempt that doesn't flow well, whereas A's 'A — achievement' is a much better transcreation for an English-speaking user.
  - [new/omission/minor] Missing the <important> tags which were present in the original.
  - [old/omission/minor] Missing the <activitylink> and <important> tags, though the text itself is superior.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A is much more faithful to the original text, preserving all nuances and the specific 'D-deed' instruction. Translation B makes several critical errors: it changes the 'D' instruction to 'A' (which is a hallucination/mistranslation of the specific mnemonic), omits the <important> tag, and simplifies the text too much, losing the supportive tone.
  - [old/mistranslation/critical] The original asks to mark 'Д-дело' (D-deed), but B changes it to 'A — achievement', which changes the specific instruction/mnemonic.
  - [old/omission/major] The <important> tag is missing, which is a structural requirement.
  - [old/style/minor] The phrasing 'makes the day more concrete' is a weak translation of 'визуально понятным процессом'.
  - [new/style/minor] The last sentence 'mark any activity...' should ideally start with a capital letter for consistency, though it follows a paragraph break.

#### 🟢 en `/death/screen_1/texts` — NEW лучше (2:0)

- **RU**: Каждый из нас рано или поздно сталкивается с утратой близкого человека. Смерть — это тяжелое испытание, которое накрывает болью и тягостью, словно мощная волна. Слёзы, печаль и глубокие чувства — естественная реакция на потерю. Эти переживания помогают нам про…
- **OLD**: Sooner or later, each of us faces the loss of someone close. Death is a profound trial that can wash over us like a powerful wave of pain and heaviness. Tears, sadness, and deep feelings are a natural response to loss. These experiences help us move through gr…
- **NEW**: Sooner or later, each of us faces the loss of a loved one. Death is a profound trial that can overwhelm you with pain and heaviness, like a powerful wave. Tears, sadness, and deep emotions are natural reactions to loss. These experiences help us process grief …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more faithful to the original structure and tone. Translation B makes several significant omissions (the Confucius quote is missing entirely) and uses slightly less natural phrasing in the narrative sections.
  - [old/omission/critical] The entire quote by Confucius was omitted.
  - [old/style/minor] The phrase 'fell into a deep depression' is okay, but 'faced severe depression' in A is a more professional way to describe the clinical onset in this context.
  - [old/omission/minor] In the sentence 'Sometimes grief becomes prolonged and can stay for years', the object 'with a person' is missing, making it feel slightly clipped compared to the original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is much more complete and follows the source text more accurately, including the missing quote from Confucius. It also uses more natural, empathetic phrasing ('process grief', 'keep moving forward') and adheres better to the requested tone.
  - [old/omission/major] The entire quote from Confucius was omitted.
  - [old/style/minor] The phrasing 'a 29-year-old who fell into a deep depression' is slightly less elegant than 'faced severe depression'.
  - [new/style/minor] The phrase 'passed away by their own choice' is a bit wordy compared to 'died by suicide', though it captures the nuance of the original.

