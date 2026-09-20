# QA: слепое парное сравнение переводов — en-final-g23-three_options

- **Дата**: 2026-09-18T20:47:23.250Z
- **Метка**: en-final-g23-three_options
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/three_options.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/three_options.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 7 | 🟢 1 | 🔴 4 | ⚪ 0 | 🟡 2 | 0 / 0 | 20% |
| **итого** | 7 | 🟢 1 | 🔴 4 | ⚪ 0 | 🟡 2 | 0 / 0 | 20% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×6, style/major×1; OLD — style/minor×4, mistranslation/minor×1, omission/minor×1

### Детали пар (для спот-чека)

#### 🔴 en `/title` — OLD лучше (2:0)

- **RU**: Техника «Три варианта развития событий»
- **OLD**: The “Three Possible Outcomes” Technique
- **NEW**: The “Three Options” technique
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation B is more precise and idiomatic for a CBT context. 'Three Options' in A is too vague and sounds like choosing between three choices, whereas 'Three Possible Outcomes' accurately reflects the concept of exploring different scenarios/developments.
  - [new/style/major] The phrase is overly simplified and loses the nuance of 'развития событий' (outcomes/scenarios), making it sound like a simple choice of options rather than a cognitive exercise.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation A is more precise and professional, accurately capturing the nuance of 'развития событий' (outcomes/scenarios), whereas B is too vague and sounds like a simple choice between three items.
  - [new/style/minor] The word 'Options' is too generic for a psychological technique; 'Outcomes' or 'Scenarios' is more idiomatic for 'развития событий'.
  - [new/style/minor] Lowercase 'technique' in the title violates the sentence case/title case consistency expected in headings.

#### 🟡 en `/test/answers`— вердикт неустойчив

- **RU**: Помочь быстро принять решение в сложной ситуации Убрать все негативные мысли и заменить их на позитивные Расширить взгляд на ситуацию и увидеть альтернативные варианты развития событий Ускорить процесс решения проблем без размышления о последствиях
- **OLD**: To help you quickly make a decision in a difficult situation To eliminate all negative thoughts and replace them with positive ones To broaden your view of the situation and see alternative possible outcomes To speed up problem-solving without thinking about t…
- **NEW**: To help make quick decisions in difficult situations To eliminate all negative thoughts and replace them with positive ones To broaden your perspective on a situation and see alternative outcomes To speed up the problem-solving process without thinking about c…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 94)
  - Translation B sounds more natural and professional for a list of benefits or features. It avoids the repetitive 'To help you...' and uses more idiomatic expressions like 'broaden your perspective' instead of the slightly clunky 'broaden your view'.
  - [old/style/minor] Repetitive use of 'To help you' and 'To [verb]' makes it feel more like a direct translation of the Russian structure rather than native English copywriting.
  - [old/style/minor] 'Broaden your view' is less idiomatic in a psychological context than 'broaden your perspective'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation B feels more natural and follows the 'understanding friend' tone by using 'help you' and more idiomatic phrasing. Translation A is slightly more robotic and uses 'broaden your perspective' which is fine, but B's flow is smoother for a list of benefits.
  - [new/style/minor] The phrasing 'To help make quick decisions' is grammatically correct but slightly more impersonal/stiff than 'To help you quickly make a decision'.

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: Теории достаточно — перейдём к примеру. Предположим, завтра у вас важный экзамен в учёбе или на работе, и приходит мысль: «Я провалю экзамен». Гарантий исхода нет, но мысль уже тревожит. Значит, дадим мозгу альтернативы. Самый худший: я плохо подготовлюсь, на …
- **OLD**: That’s enough theory — let’s move on to an example. Imagine you have an important exam tomorrow — at university or at work — and the thought comes: “I’m going to fail the exam.” There are no guarantees about the outcome yet, but the thought is already making y…
- **NEW**: Enough theory — let’s look at an example. Suppose you have an important exam at school or work tomorrow, and the thought pops up: “I’m going to fail.” There’s no guarantee of the outcome, but the thought is already causing anxiety. So, let’s give your brain so…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more idiomatic and flows better as a piece of psychoeducation. It uses natural phrasing like 'ace it' and 'the thought pops up'. Translation B feels slightly more clunky and makes a slight mistranslation regarding the lecturer's intent.
  - [old/mistranslation/minor] The phrase 'has no reason to “fail” me on purpose' adds an implication of intent/malice ('on purpose') that is not present in the original Russian 'причин заваливать нет'.
  - [old/style/minor] The use of dashes in the second paragraph ('— at university or at work —') is slightly heavy for this context compared to A's smoother flow.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A is more idiomatic and maintains a better flow for a psychological article. Translation B makes a significant error by translating 'учёба' as 'school', which doesn't fit the context of 'lecturers' and 'university' implied by the original, and it misses the Frankl quote entirely.
  - [new/omission/critical] The entire Viktor Frankl quote was omitted.
  - [new/mistranslation/major] 'учёба' translated as 'school' is too narrow; 'university' or 'studies' is better given the context of lecturers and groups.
  - [new/style/minor] 'the thought pops up' is slightly more informal/colloquial than the original 'приходит мысль'.
  - [old/style/minor] The use of em dashes is slightly heavy, but it follows the requested style guide.

#### 🔴 en `/screen_3/texts` — OLD лучше (2:0)

- **RU**: Такой подход даёт минимум три исхода — а на деле их бывает больше. Полезно заранее продумать «запасной план» на случай худшего сценария. Это заметно снижает накал эмоций: даже если сбудется худшее, вы будете понимать, как действовать. Например: если завтра я в…
- **OLD**: This approach gives you at least three possible outcomes — and in reality there are usually even more. It’s helpful to think through a “backup plan” in advance for the worst-case scenario. This significantly lowers the emotional intensity: even if the worst do…
- **NEW**: This approach provides at least three outcomes — though in reality, there may be more. It is helpful to think of a “backup plan” in advance in case the worst-case scenario happens. This significantly lowers the emotional intensity: even if the worst happens, y…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A sounds much more natural and idiomatic, using appropriate contractions and flow. Translation B feels slightly more formal and stiff (e.g., 'It is helpful', 'it only shows'), which deviates from the 'understanding friend' tone.
  - [new/style/minor] Overuse of full forms (It is, I will) instead of contractions makes the tone too formal for a supportive app context.
  - [new/style/minor] 'take a retake' is slightly clunky compared to 'have a chance to retake it'.
  - [new/style/minor] 'too long and tedious' is a bit heavy for 'долго и хлопотно' in this context.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more natural and idiomatic for a supportive 'expert friend' tone. It uses appropriate contractions (It's, you'll, we're) and better phrasing (put things right, looking at things this way) compared to the slightly more formal and stiff Translation A.
  - [new/style/minor] Uses 'It is' instead of contractions, making the tone feel slightly more academic/distant than the target 'warm friend' tone.
  - [new/style/minor] The phrase 'the thought no longer feels like the only option' is a bit clunky compared to B's flow.

#### 🔴 en `/description` — OLD лучше (2:0)

- **RU**: В тексте описана техника когнитивно-поведенческой терапии (КПТ) для работы с негативными автоматическими мыслями — «Три варианта развития событий». Она помогает расширить взгляд на ситуацию и снизить тревогу: мы намеренно рассматриваем худший, лучший и наиболе…
- **OLD**: This text describes a cognitive behavioral therapy (CBT) technique for working with negative automatic thoughts — the “Three Possible Outcomes” method. It helps broaden your view of a situation and reduce anxiety by deliberately considering the worst, best, an…
- **NEW**: This text describes a cognitive behavioral therapy (CBT) technique for working with negative automatic thoughts called “Three Options.” It helps broaden your perspective on a situation and reduce anxiety by intentionally considering the worst, best, and most r…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B is more idiomatic and flows better. The use of 'scenarios' and 'gradually reduces' feels more natural for a mental health context than the slightly more clinical or repetitive phrasing in A.
  - [new/style/minor] The phrase 'called “Three Options”' is a bit clunky compared to the em dash construction in B; 'broaden your perspective on a situation' is fine but 'broaden your view of a situation' in B is slightly more concise.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows better as a professional description. Translation B's name for the technique ('Three Options') feels a bit thin and less descriptive than 'Three Possible Outcomes', and 'can help' in B slightly weakens the original's directness.
  - [new/style/minor] The name 'Three Options' is a bit weak compared to the descriptive nature of the original technique.
  - [new/style/minor] The addition of 'can help' adds unnecessary hedging not present in the original.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: <activitylink id="kdzYJ4njVJ"> В КПТ есть много простых и полезных приёмов для работы с негативными автоматическими мыслями. Одни техники помогают замечать такие мысли, другие — проверять их на здравый смысл и снижать доверие к ним. Большинство упражнений можн…
- **OLD**: CBT offers many simple and useful tools for working with negative automatic thoughts. Some techniques help you notice these thoughts, others test them against common sense so you gradually trust them less. Most exercises can be done on your own to support your…
- **NEW**: <activitylink id="kdzYJ4njVJ"> CBT offers many simple and useful tools for working with negative automatic thoughts. Some techniques help you notice these thoughts, while others help you check them for logic and reduce how much you believe them. Most exercises…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and aligns better with the professional CBT tone. It uses 'breaking the cycle of rumination' (excellent for 'зацикливанием') and 'mental well-being' (per glossary), whereas A uses 'support your emotional state' and 'look at the situation more soberly', which sound slightly translated/unnatural.
  - [old/style/minor] 'support your emotional state' is a bit clunky; 'look at the situation more soberly' is a literal translation of 'трезвее' and sounds slightly off in this context.
  - [old/omission/minor] Missing the HTML tags present in the original (activitylink, instagram, li).
  - [new/style/minor] The term 'Three Options' is a bit shorter than the original 'Three Possible Outcomes', but it's acceptable for UX/readability.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is much more idiomatic and follows the UX/CBT guidelines perfectly. It uses 'breaking the cycle of rumination' (natural) instead of 'stuck on a single thought' (clunky), and 'look at the situation more objectively' (natural) instead of 'look at the situation more soberly' (a Russianism/calque).
  - [old/style/major] The phrase 'look at the situation more soberly' is a direct calque of 'взглянуть трезвее' and sounds unnatural in English; 'objectively' or 'clearly' is the correct way to express this.
  - [old/style/minor] The translation of the technique name 'Three Possible Outcomes' is okay, but 'Three Options' or 'Three Scenarios' is more concise for a tool name.
  - [old/style/minor] The list items 'Worst case', 'Best case', 'Realistic' lack the articles/structure that make the flow smoother compared to A.

#### 🔴 en `/test/question` — OLD лучше (2:0)

- **RU**: Какова основная задача техники «Три варианта развития событий» в когнитивно-поведенческой терапии?
- **OLD**: What is the main goal of the “Three Possible Outcomes” technique in cognitive-behavioral therapy?
- **NEW**: What is the main goal of the “Three Options” technique in CBT?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation B is more accurate and professional. Translation A uses a vague name for the technique ('Three Options'), whereas B correctly captures the essence of 'развития событий' (outcomes).
  - [new/style/minor] The name of the technique is too abbreviated and loses the meaning of 'outcomes/developments'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more precise and professional. It uses the full term 'cognitive-behavioral therapy' which is required for the first mention, and 'Three Possible Outcomes' is a much more accurate and idiomatic rendering of 'Три варианта развития событий' than the overly simplistic 'Three Options'.
  - [new/terminology/minor] Uses 'CBT' without prior introduction/expansion, which violates the rule for first mentions.
  - [new/style/minor] 'Three Options' is a weak translation of 'развития событий' (outcomes/scenarios).

