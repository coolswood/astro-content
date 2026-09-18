# QA: слепое парное сравнение переводов — en-final-g23-proof

- **Дата**: 2026-09-18T20:45:34.669Z
- **Метка**: en-final-g23-proof
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/proof.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/proof.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 6 | 🟢 3 | 🔴 1 | ⚪ 0 | 🟡 2 | 0 / 1 | 75% |
| **итого** | 6 | 🟢 3 | 🔴 1 | ⚪ 0 | 🟡 2 | 0 / 1 | 75% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×3; OLD — style/minor×4, style/major×1, omission/critical×1, omission/major×1, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟢 en `/test/question` — NEW лучше (2:0)

- **RU**: Выберите неверное утверждение — КПТ …
- **OLD**: Choose the incorrect statement — CBT …
- **NEW**: Which of the following statements about CBT is incorrect?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B is a natural, idiomatic way to phrase a multiple-choice question in English, whereas Translation A is a clunky, literal calque of the Russian imperative.
  - [old/style/major] The imperative 'Choose the incorrect statement' sounds like a direct command from a manual rather than a natural test question; it lacks the flow expected in English-language assessments.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is a natural, idiomatic way to phrase a multiple-choice question in English. Translation B is a literal, clunky calque of the Russian structure that sounds unnatural in an educational or testing context.
  - [old/style/major] The use of the em dash to connect the instruction to the subject is a Russian syntactic pattern; in English, 'Which of the following...' is the standard way to frame such questions.

#### 🔴 en `/description` — OLD лучше (2:0)

- **RU**: В этой статье мы говорим о научных доказательствах эффективности когнитивно-поведенческой терапии (КПТ) в лечении депрессии, тревожных расстройств, ПТСР и панических атак. Также подчёркиваем важность работы с профессионалами и рассматриваем ситуации, когда одн…
- **OLD**: This article looks at the scientific evidence for the effectiveness of cognitive-behavioral therapy (CBT) in treating depression, anxiety disorders, PTSD, and panic attacks. It also emphasizes the importance of working with professionals and explains when CBT …
- **NEW**: In this article, we discuss the scientific evidence supporting the effectiveness of cognitive behavioral therapy (CBT) in treating depression, anxiety disorders, PTSD, and panic attacks. We also emphasize the importance of working with professionals and explor…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds more natural for an English-language article by using 'This article looks at' instead of the slightly more formal/academic 'In this article, we discuss'. B also flows better by avoiding the repetitive 'We' structure.
  - [new/style/minor] The 'In this article, we discuss' construction is grammatically correct but feels slightly more like a translation from Russian than a native English editorial style.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural for an English-language article by using 'This article looks at' instead of the slightly more repetitive 'In this article, we discuss'. It follows the principle of avoiding unnecessary 'we' and uses a more professional, streamlined flow.
  - [new/style/minor] The phrasing 'In this article, we discuss...' is a bit more wordy and follows the Russian sentence structure more closely than necessary for a native-sounding English text.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Путь КПТ к признанию был далеко не простым и уж точно не стремительным. На ранних этапах теорию Бека критиковали фрейдисты и другие коллеги — её называли «поверхностной» и сомневались в эффективности из-за отсутствия достаточной научной базы. Против выступали …
- **OLD**: CBT’s path to recognition was anything but simple or fast. In the early days, Beck’s theory was criticized by Freudians and many other colleagues — it was called “superficial”, and people doubted its effectiveness because there wasn’t enough scientific data ye…
- **NEW**: CBT’s journey to recognition was far from easy, and certainly not rapid. In its early stages, Beck’s theory was criticized by Freudians and other colleagues—it was labeled “superficial,” and its effectiveness was questioned due to a lack of sufficient scientif…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more sophisticated and flows like a professional article, using precise vocabulary ('scientific grounding', 'establish its evidence-based foundation') that fits the historical/scientific context. Translation B is slightly more repetitive and uses more basic, 'translated-sounding' structures.
  - [old/style/minor] The phrase 'anything but simple or fast' is a bit colloquial for this historical narrative compared to A's more elegant structure.
  - [old/style/minor] The phrasing 'people doubted its effectiveness because there wasn't enough scientific data yet' is wordy and less professional than 'its effectiveness was questioned due to a lack of sufficient scientific grounding'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more sophisticated and better suited for an article/narrative. It uses more precise academic and professional vocabulary (e.g., 'scientific grounding', 'establish its evidence-based foundation') while maintaining a smooth, natural flow.
  - [old/style/minor] The phrasing 'anything but simple or fast' is a bit colloquial for this context, and 'people doubted' is slightly weaker than 'its effectiveness was questioned'.
  - [old/omission/minor] The Instagram placeholder was omitted in the text block.

#### 🟡 en `/test/answers`— вердикт неустойчив

- **RU**: Доказала свою эффективность во множестве научных экспериментов Подходит для людей с депрессией, тревогой, паническими атаками Лечит тяжёлые психические расстройства лучше медикаментов Сталкивалась с недоверием в начале своего существования
- **OLD**: has proven its effectiveness in many scientific studies is suitable for people with depression, anxiety, and panic attacks treats severe mental disorders better than medication faced skepticism in the early days of its existence
- **NEW**: It has proven its effectiveness in numerous scientific experiments It is suitable for people with depression, anxiety, and panic attacks It treats severe mental disorders better than medication It faced skepticism in its early stages
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is more natural for a list of features/benefits, avoiding the repetitive and heavy use of 'It' at the start of every line. It also uses 'studies' which is more idiomatic in this context than 'experiments'.
  - [new/style/minor] Repetitive use of 'It' at the beginning of each line makes it feel like a list of disconnected sentences rather than a cohesive feature list.
  - [new/style/minor] The phrasing 'in its early stages' is slightly more clinical/abstract than the more natural 'in the early days of its existence' or simply 'early on'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A provides complete, grammatically sound sentences which are necessary for a professional tone. Translation B suffers from missing subjects (omission), making it feel like a fragmented list of notes rather than polished copy.
  - [old/omission/major] Missing subjects at the beginning of every sentence makes the text feel incomplete and unpolished for a professional context.

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: Мы поговорили о том, где КПТ действительно эффективна. Теперь важно честно отметить, где её возможностей может быть недостаточно. При тяжёлых психических расстройствах, таких как шизофрения или биполярное расстройство, одной КПТ, как правило, недостаточно — тр…
- **OLD**: We’ve talked about where CBT is truly effective. Now it’s important to be honest about where its possibilities may not be enough. For severe mental disorders such as schizophrenia or bipolar disorder, CBT alone is usually not enough — medication and medical su…
- **NEW**: We have discussed where CBT is truly effective. Now, it is important to note where its capabilities may fall short. For severe mental disorders, such as schizophrenia or bipolar disorder, CBT alone is usually not enough—medication and medical supervision are t…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A sounds more professional and polished, using better collocations like 'capabilities may fall short' and 'attentive and caring treatment'. Translation B feels slightly more repetitive and uses less idiomatic phrasing ('possibilities may not be enough').
  - [old/style/minor] The phrase 'possibilities may not be enough' is a bit clunky compared to 'capabilities may fall short'.
  - [old/style/minor] The phrasing 'Don't diagnose yourself' is grammatically fine but 'Avoid self-diagnosing' in A sounds more like a professional recommendation.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A sounds more natural and follows the 'understanding friend' tone with appropriate contractions. Translation B feels slightly more formal/academic and uses 'treatment' in a way that sounds a bit clinical for this context.
  - [new/style/minor] Use of 'We have discussed' and 'it is' instead of contractions makes the tone too formal for a supportive app.
  - [new/style/minor] The word 'treatment' in the final sentence sounds a bit more like medical procedure than the warm 'attention' intended in the original.
  - [new/terminology/minor] Used 'mental well-being' which is good, but 'mental health' in A is also perfectly acceptable and fits the flow here.

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Вот лишь несколько примеров, показывающих, что КПТ работает при различных психологических трудностях: <li>Депрессия: исследование Тада Джуда и коллег (2012) показало, что после 14–16 сеансов КПТ улучшение наблюдалось у 40–60% пациентов. Более того, терапия сни…
- **OLD**: Here are just a few examples showing that CBT works for different psychological difficulties: Depression: a study by Thad Judd and colleagues (2012) found that after 14–16 CBT sessions, 40–60% of patients showed improvement. Moreover, therapy reduced the risk …
- **NEW**: Here are just a few examples showing that CBT works for various psychological challenges: <li>Depression: A study by Tad Jude and colleagues (2012) showed that after 14–16 sessions, improvement was observed in 40–60% of patients. Furthermore, the therapy reduc…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is superior because it preserves the original HTML structure (li tags) and correctly follows the instruction to introduce the PTSD acronym upon first mention. Translation B loses the list structure and fails to include the Goethe quote entirely.
  - [old/omission/critical] The entire quote by Goethe was omitted.
  - [old/omission/major] The HTML list tags (<li>) were removed, changing the document structure.
  - [old/terminology/minor] Used 'difficulties' instead of 'challenges', though both are acceptable, 'challenges' in A sounds slightly more natural in this context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation B is superior because it preserves the original HTML structure (li tags) and includes the Goethe quote, which Translation A completely omitted. Translation B also follows the instruction to introduce the PTSD acronym upon first mention.
  - [old/omission/major] The entire Goethe quote and the HTML list tags were omitted.
  - [old/terminology/minor] Used 'psychological difficulties' instead of 'challenges', though both are acceptable, 'challenges' sounds slightly more natural in this context.

