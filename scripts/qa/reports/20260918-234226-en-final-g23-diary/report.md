# QA: слепое парное сравнение переводов — en-final-g23-diary

- **Дата**: 2026-09-18T20:42:26.981Z
- **Метка**: en-final-g23-diary
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/diary.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/diary.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 7 | 🟢 5 | 🔴 1 | ⚪ 0 | 🟡 1 | 0 / 0 | 83% |
| **итого** | 7 | 🟢 5 | 🔴 1 | ⚪ 0 | 🟡 1 | 0 / 0 | 83% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×4, terminology/major×1, terminology/minor×1; OLD — style/minor×6, terminology/major×4, omission/minor×1, style/major×1, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: <h2>Автоматическая мысль</h2> Этот блок посвящён тому, как мы интерпретируем ситуацию. Чтобы заметить свои мысли, спросите себя: «О чём я сейчас думаю?» Выделите самую значимую и эмоционально заряженную мысль. Если формулировка слишком общая, уточните её и сде…
- **OLD**: Automatic thought This section is about how you interpret the situation. To catch your thoughts, ask yourself: “What am I thinking right now?” Identify the most salient, emotionally charged thought. If the wording is too broad, tighten it and make it specific.…
- **NEW**: <h2>Automatic thought</h2> This section is about how you interpret a situation. To notice your thoughts, ask yourself: “What am I thinking right now?” Identify the most significant and emotionally charged thought. If the wording is too general, refine it to be…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and follows the UX guidelines better, specifically using 'journal' instead of 'diary' and 'cognitive distortions' instead of 'cognitive errors'. It also handles the tone more naturally.
  - [new/terminology/major] Used 'diary' instead of the project-standard 'journal'.
  - [new/terminology/minor] Used 'Event' for 'Событие', whereas 'Situation' is more standard in CBT contexts and used in A.
  - [new/style/minor] The translation of 'уныние' as 'low mood' is a bit weak compared to 'dejection' or 'despondency' in a list of intense emotions.
  - [old/omission/minor] Lost the HTML tags in the output, though this is likely a formatting artifact of the prompt.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more polished, follows the required UX/UI tone, and preserves the HTML structure. Translation B loses the HTML tags, uses less natural phrasing (e.g., 'tighten it' instead of 'refine it'), and makes several stylistic errors.
  - [old/omission/critical] Lost all HTML tags (h2, li, important), which is critical for the layout.
  - [old/style/minor] Used 'diary' instead of the project-standard 'journal'.
  - [old/style/minor] 'tighten it' is an unnatural way to describe refining a thought.
  - [old/style/minor] 'make reality look skewed' is less professional than 'perceive reality in a distorted way'.
  - [old/terminology/minor] Used 'representations' for 'представления', which is too academic; 'ideas' or 'images' is better for this tone.

#### 🟢 en `/title` — NEW лучше (2:0)

- **RU**: Дневник автоматических мыслей
- **OLD**: Automatic Thoughts Diary
- **NEW**: Automatic thought journal
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation B uses the project-standard term 'journal' and follows the correct capitalization rules for a section title (sentence case). Translation A uses 'Diary', which is explicitly marked as legacy/outdated in the glossary, and uses Title Case.
  - [old/terminology/major] Uses 'Diary' instead of the required 'journal'
  - [old/style/minor] Uses Title Case instead of sentence case for a UI section
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 100)
  - Translation A follows the project glossary and UI standards perfectly, using 'journal' instead of 'diary' and the correct singular form for the technique name. Translation B uses 'diary', which is explicitly marked as legacy/outdated in the instructions.
  - [old/terminology/major] Uses 'Diary' instead of the required 'Journal' per glossary; uses plural 'Thoughts' which deviates from the standard 'automatic thought journal' term.

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: <h2>Зачем вести дневник автоматических мыслей?</h2> Ведение дневника — ключ к глубокому самопознанию: он помогает лучше понимать свои эмоции, мысли и поведение. Регулярные записи позволяют видеть повторяющиеся паттерны, влияющие на настроение и поступки. Проце…
- **OLD**: Why keep an Automatic Thoughts Diary? Keeping a diary is key to deep self-understanding: it helps you see the links between emotions, thoughts, and behavior. Regular entries reveal recurring patterns that shape your mood and actions. The act of writing builds …
- **NEW**: <h2>Why keep an automatic thought journal?</h2> Journaling is key to deep self-awareness: it helps you better understand your emotions, thoughts, and behavior. Regular entries allow you to see recurring patterns that influence your mood and actions. The act of…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A follows the project's glossary perfectly (automatic thought journal, psychologist, journaling) and sounds like a professional, warm, and natural English article. Translation B uses outdated or incorrect terminology (diary instead of journal, therapist instead of psychologist) and contains several clunky, non-idiomatic phrases.
  - [old/terminology/major] Uses 'diary' instead of the required 'journal'; uses 'therapist' instead of 'psychologist' as per glossary.
  - [old/style/major] Phrases like 'outside our head' and 'in the folds of memory' are awkward and sound like direct translations from Russian.
  - [old/style/minor] Missing HTML tags present in the original (h2, important, li).
  - [new/style/minor] The translation of 'выносим их на внешний носитель' as 'put them into words' is a slight creative departure, but it is much more natural in English than a literal translation.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation B follows the project's terminology guidelines perfectly (using 'automatic thought journal' and 'psychologist'), whereas A uses 'diary' and 'therapist'. B also feels more natural and professional for a mental health app.
  - [old/terminology/major] Used 'Automatic Thoughts Diary' instead of the required 'automatic thought journal'; used 'therapist' instead of 'psychologist'.
  - [old/style/minor] The phrase 'outside our head' is a bit clunky/informal compared to B's more polished 'put them into words'.
  - [new/style/minor] The translation of 'выносите их на внешний носитель' as 'put them into words' is a slight departure from the literal 'external medium', but it is a much better transcreation for the target audience.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: В статье разбирается практика ведения «Дневника автоматических мыслей» как одного из ключевых инструментов когнитивно-поведенческой терапии (КПТ). Мы объясняем, как корректно фиксировать и анализировать автоматические мысли, чтобы снижать уровень психологическ…
- **OLD**: This article explains the practice of keeping an Automatic Thoughts Diary—one of the key tools in cognitive behavioral therapy (CBT). We show how to record and analyze automatic thoughts to reduce psychological distress and lay the groundwork for deeper work o…
- **NEW**: This article explores the practice of keeping an automatic thought journal, one of the key tools in cognitive behavioral therapy (CBT). We’ll explain how to correctly record and analyze automatic thoughts to reduce emotional discomfort and prepare the ground f…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B follows the project's glossary and CBT terminology perfectly, using 'automatic thought journal' and 'core beliefs'. Translation A uses 'Automatic Thoughts Diary' and 'deeper work on beliefs', which are less precise and deviate from the established terminology.
  - [old/terminology/major] Used 'Automatic Thoughts Diary' instead of the required 'automatic thought journal' and 'deeper work on beliefs' instead of 'core beliefs'.
  - [old/style/minor] Used 'psychological distress' which is acceptable, but 'emotional discomfort' in B is a closer and smoother fit for the context of reducing discomfort.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A follows the project glossary perfectly, using 'automatic thought journal' and 'core beliefs'. Translation B uses 'Automatic Thoughts Diary' and 'beliefs', which deviates from the established CBT terminology and the specific glossary requirements.
  - [old/terminology/major] Used 'Automatic Thoughts Diary' instead of 'automatic thought journal' and 'beliefs' instead of 'core beliefs'.
  - [old/style/minor] The use of an em dash in the first sentence is acceptable, but the terminology errors are more significant.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Одна из ключевых задач КПТ — работа с мыслями. Автоматические мысли — это «компактные» версии ваших убеждений; они отражают содержание более глубоких слоёв мышления. Прежде чем работать с мыслью, её важно заметить и зафиксировать. В этой главе вы познакомитесь…
- **OLD**: One of CBT’s core tasks is working with your thoughts. Automatic thoughts are brief, quick versions of your beliefs; they reflect the content of deeper layers of thinking. Before you can work with a thought, you need to notice it and write it down. In this cha…
- **NEW**: One of the key goals of CBT is working with your thoughts. Automatic thoughts are like “compact” versions of your beliefs; they reflect the deeper layers of your thinking. Before you can work with a thought, it’s important to notice and record it. In this chap…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B follows the glossary and CBT terminology much more accurately, specifically using 'adaptive response' and 'helpful' instead of 'constructive' and 'constructive'. It also correctly uses 'automatic thought journal' as per the project's standard.
  - [old/terminology/major] Used 'Automatic Thoughts Diary' instead of the required 'automatic thought journal'; used 'constructive' instead of 'adaptive' for the response.
  - [old/terminology/minor] Used 'Situation' for the first list item, whereas the original and B use 'Event' (Событие).
  - [old/style/minor] The phrasing 'brief, quick versions' is slightly redundant compared to the more natural 'compact versions' or 'like compact versions'.
  - [new/style/minor] The translation of 'меня обидела мама' as 'my mom hurt my feelings' is a slight addition/interpretation, though it sounds more natural in English than a literal translation.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A follows all the project's specific terminology requirements (e.g., 'automatic thought journal', 'adaptive response', 'helpful') and maintains a much more natural, professional tone. Translation B fails on several key terminology points and uses less idiomatic phrasing.
  - [old/terminology/major] Used 'Automatic Thoughts Diary' instead of the required 'automatic thought journal'.
  - [old/terminology/major] Used 'Alternative response' instead of the required 'Adaptive response'.
  - [old/terminology/minor] Used 'constructive' instead of 'helpful' for thoughts, which contradicts the project's CBT guidelines.
  - [old/style/minor] Phrasing like 'I worked badly' is clunky and sounds like a translation rather than natural English.
  - [old/omission/minor] Missing the <important> tags present in the original.

#### 🔴 en `/test/question` — OLD лучше (2:0)

- **RU**: Какой из следующих примеров наиболее точно описывает запись в разделе "Ситуация"?
- **OLD**: Which of the following best illustrates a “Situation” entry?
- **NEW**: Which of the following examples most accurately describes an entry in the “Situation” section?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more concise and idiomatic for a UX/UI context, avoiding the wordy 'most accurately describes an entry in the... section'.
  - [new/style/minor] Too wordy and formal for a modern app interface; sounds slightly like a textbook question rather than a smooth UI prompt.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A is much more concise and natural for a UI/UX context, using 'illustrates' which fits perfectly for examples. Translation B is grammatically correct but overly wordy and sounds like a literal translation from Russian.
  - [new/style/minor] Too wordy and heavy for a question; 'most accurately describes an entry in the... section' is a direct calque of the Russian structure.

#### 🟢 en `/test/answers` — NEW лучше (2:0)

- **RU**: Я чувствую себя ужасно Начальник повысил голос во время совещания, раскритиковав мой отчет Я неудачник У меня всё валится из рук
- **OLD**: I feel terrible The manager raised their voice during the meeting and criticized my report I’m a failure Everything in my life is falling apart
- **NEW**: I feel terrible My boss raised their voice during the meeting while criticizing my report I am a failure I can’t get anything right
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 94)
  - Translation B captures the idiomatic nuance of 'у меня всё валится из рук' much better; 'everything is falling apart' (A) implies a life crisis, whereas 'I can't get anything right' (B) better reflects the loss of competence/dexterity implied by the Russian idiom. B also uses 'boss', which is more natural in this context than 'manager'.
  - [old/style/minor] The translation of 'у меня всё валится из рук' as 'everything in my life is falling apart' is a bit too dramatic/heavy compared to the original idiom.
  - [old/style/minor] Using 'The manager' sounds slightly more formal/stiff than the more natural 'My boss'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more idiomatic and captures the emotional nuance of the original better. Translation B uses 'The manager' which sounds slightly more formal/detached than 'My boss', and 'Everything in my life is falling apart' is an over-translation of the idiom 'у меня всё валится из рук'.
  - [old/style/minor] The phrase 'Everything in my life is falling apart' is too heavy/dramatic for the Russian idiom 'у меня всё валится из рук', which usually implies clumsiness or lack of control in tasks.
  - [old/style/minor] Using 'The manager' instead of 'My boss' feels slightly less natural in a personal journal context.

