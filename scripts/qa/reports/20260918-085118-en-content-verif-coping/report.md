# QA: слепое парное сравнение переводов — en-content-verif-coping

- **Дата**: 2026-09-18T05:51:18.618Z
- **Метка**: en-content-verif-coping
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/coping.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 44
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 431bd08c6c487840271a919950ac699dadad71e1

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/coping.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 5 | 🟢 3 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |
| **итого** | 5 | 🟢 3 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×4; OLD — terminology/minor×3, addition/minor×2, omission/major×2, style/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/description`— вердикт неустойчив

- **RU**: Копинг-карточки — простой, но очень действенный инструмент когнитивно-поведенческой терапии. Они помогают справляться со стрессом, по-новому смотреть на трудные ситуации и поддерживать себя в моменты сомнений. Эти небольшие «напоминания» возвращают чувство уве…
- **OLD**: Coping cards are a simple yet highly effective tool in Cognitive Behavioral Therapy (CBT). They help you manage stress, see difficult situations from a new angle, and support yourself in moments of doubt. These small reminders restore confidence and keep you m…
- **NEW**: Coping cards are a simple yet highly effective tool in cognitive behavioral therapy (CBT). They help you manage stress, see difficult situations in a new light, and support yourself during moments of doubt. These small reminders restore your confidence and hel…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 90)
  - Translation A is more idiomatic and flows better as a piece of psychoeducation. 'Find your grounding' is a much more natural and professional way to express 'находить опору' in a mental health context than the literal 'find your inner strength'.
  - [new/style/minor] The phrasing 'help you move toward' is slightly weaker and more wordy than 'keep you moving toward' in A, which better captures the continuous nature of the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A follows the project's capitalization rules (sentence case for CBT) and uses more natural, idiomatic phrasing. Translation B fails on capitalization and uses 'find your grounding', which is a slightly awkward way to translate 'находить опору внутри себя' in this context.
  - [old/style/minor] Capitalized 'Cognitive Behavioral Therapy' in the middle of a sentence, violating sentence case rules.
  - [old/style/minor] 'find your grounding' sounds slightly unnatural compared to 'find your inner strength' or 'find your footing'.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Копинг-карточки — ещё один тихий, но очень мощный инструмент когнитивно-поведенческой терапии. <h2>Что такое копинг-карточки?</h2> Копинг-карточки — это метод КПТ, который помогает справляться с негативными мыслями и стрессовыми моментами, поддерживая более зд…
- **OLD**: Coping cards are another quiet yet powerful CBT tool. What are coping cards? Coping cards are a CBT method that helps you work with unhelpful thoughts and stressful moments by supporting a healthier interpretation of what’s happening. They’re like prompts that…
- **NEW**: Coping cards are another quiet but incredibly powerful tool in cognitive behavioral therapy (CBT). <h2>What are coping cards?</h2> Coping cards are a CBT method that helps you manage unhelpful thoughts and stressful moments by supporting a more balanced perspe…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B follows the glossary and CBT terminology much more accurately (using 'adaptive' instead of 'supportive' for beliefs, and 'balanced perspective' instead of 'interpretation'). It also correctly handles the full term introduction for CBT and maintains a better professional yet warm tone.
  - [old/terminology/minor] Used 'supportive ones' for beliefs; 'adaptive' is the required term per glossary.
  - [old/addition/minor] Added an extra sentence 'Simple and accessible...' which seems to be a duplicate/fragment of the previous line.
  - [old/style/minor] The translation of the Beck quote 'you need not suffer' is slightly more archaic/formal than the original's 'you can' (you may not).
  - [new/style/minor] The use of 'memo' is a bit literal for 'памятка', but acceptable in context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is much more polished and follows all UX/CBT guidelines. Translation B has a major structural error (repetition of the last point) and uses less natural phrasing.
  - [old/addition/major] The last section is repeated twice with slightly different wording.
  - [old/style/minor] Using gerunds (Reducing, Developing) for list headers is less punchy for UX than the imperative/noun form used in A.
  - [old/terminology/minor] Used 'supportive ones' instead of the preferred 'adaptive ones' for beliefs.

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Давайте посмотрим на несколько примеров, чтобы лучше понять принцип замены деструктивных мыслей. <h2>Пример 1</h2> Деструктивная мысль: «Я не справлюсь с этим проектом, я недостаточно хорош». Конструктивная замена: «Я уже справлялся с трудными задачами раньше.…
- **OLD**: Let’s look at a few examples to see how to replace unhelpful thoughts. Example 1 Unhelpful thought: “I won’t manage this project; I’m not good enough.” Constructive replacement: “I’ve handled tough tasks before. I have the knowledge and resources to complete t…
- **NEW**: Let’s look at a few examples to better understand how to replace unhelpful thoughts. <h2>Example 1</h2> Unhelpful thought: "I won’t be able to handle this project; I’m not good enough." Adaptive replacement: "I’ve handled difficult tasks before. I have the kno…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is superior because it uses the correct terminology ('Adaptive replacement') as per the project glossary and maintains the original HTML structure and tags. Translation A also has a repetitive error at the end, duplicating the final sentence.
  - [old/omission/major] Lost all HTML tags (h2, instagram) which are part of the source structure.
  - [old/addition/minor] The final sentence is duplicated at the end of the text.
  - [new/style/minor] The translation of 'общение' as 'social interaction' is slightly more formal than the original, but fits the context well.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A follows the project's terminology perfectly (using 'Adaptive replacement' which aligns with 'adaptive belief' and 'adaptive response') and maintains the HTML structure. Translation B fails to include the HTML tags, uses 'Constructive replacement' (not in the glossary), and has a repetitive error at the end.
  - [old/omission/major] Missing HTML tags (h2) present in the original.
  - [old/terminology/minor] 'Constructive replacement' should be 'Adaptive replacement' to match the 'adaptive' terminology used elsewhere in the project.
  - [old/style/minor] The last sentence is duplicated at the end of the text.
  - [old/style/minor] 'Takeaway' is a bit informal for a header compared to 'Conclusion', though acceptable; however, the loss of tags is the main issue.

#### 🟡 en `/title`— вердикт неустойчив

- **RU**: Копинг-карточка: маленький помощник для больших перемен
- **OLD**: Coping Cards: A Small Helper for Big Changes
- **NEW**: Coping cards: small tools for big changes
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A follows the sentence case rule for titles and maintains the warm, supportive 'helper' metaphor from the original. Translation B uses 'tools', which is a slight shift in tone, and fails to use sentence case correctly for a title.
  - [new/style/minor] Uses lowercase 'cards' in a title and replaces the personified 'helper' with the more clinical 'tools'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more idiomatic and natural for a title/subtitle structure. Translation B uses 'A Small Helper', which sounds slightly childish and literal (calque from 'маленький помощник'), whereas 'small tools' in A sounds professional and fits the CBT context better.
  - [old/style/minor] The phrase 'A Small Helper' feels a bit too literal and lacks the punchy, professional tone of a mental health app.
  - [old/style/minor] Uses Title Case for the whole phrase, whereas A follows a more standard subtitle rhythm.

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Как это работает?</h2> Когда вы замечаете деструктивную мысль, копинг-карточка помогает заменить её на более реалистичную и поддерживающую. Поначалу это может требовать немного практики, но со временем вы научитесь замечать негативные мысли быстрее и менят…
- **OLD**: How does it work? When you notice an unhelpful thought, a coping card helps you replace it with something more realistic and supportive. At first this may take some practice, but over time you’ll spot negative thoughts faster and shift them to more constructiv…
- **NEW**: <h2>How does it work?</h2> When you notice an unhelpful thought, a coping card helps you replace it with one that is more realistic and supportive. It might take a little practice at first, but over time you’ll learn to notice unhelpful thoughts faster and shi…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is superior because it adheres strictly to the project's CBT terminology (using 'adaptive' instead of 'constructive' and 'unhelpful' instead of 'negative') and maintains the required HTML tags. It also sounds more natural and idiomatic for a mental health app.
  - [old/omission/major] Missing HTML tags <h2> and <important> present in the original.
  - [old/terminology/minor] Uses 'constructive' instead of the preferred 'adaptive' for beliefs/responses.
  - [old/terminology/minor] Uses 'negative thoughts' where 'unhelpful' is the preferred project term for a non-judgmental tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A is superior because it strictly adheres to the project's CBT terminology (using 'adaptive' instead of 'constructive' or 'supportive' for beliefs) and maintains the correct HTML structure. Translation B fails to include the <important> tags and uses less precise terminology.
  - [old/omission/major] Missing <important> tags around the key instruction.
  - [old/terminology/minor] Uses 'constructive' and 'supportive belief' instead of the required 'adaptive belief'.
  - [old/style/minor] The phrasing 'if the thought appears' is slightly less natural than 'if you think' or 'if a thought arises'.

