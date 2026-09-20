# QA: слепое парное сравнение переводов — en-final-g67-sdvg

- **Дата**: 2026-09-18T21:33:46.508Z
- **Метка**: en-final-g67-sdvg
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: tests/sdvg.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/sdvg.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 13 | 🔴 2 | ⚪ 0 | 🟡 5 | 0 / 0 | 87% |
| **итого** | 20 | 🟢 13 | 🔴 2 | ⚪ 0 | 🟡 5 | 0 / 0 | 87% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×6; OLD — style/minor×14, addition/minor×5, mistranslation/major×3, omission/major×3, style/major×1

### Детали пар (для спот-чека)

#### 🟢 en `/steps_description/1/fact` — NEW лучше (2:0)

- **RU**: Чем больше вещей или задач нужно держать в уме, тем труднее человеку поддерживать порядок. Это особенно актуально для людей с СДВГ, так как у них чаще возникает чувство перегруженности.
- **OLD**: The more tasks and items someone has to keep in mind, the harder it becomes to maintain order. For people with ADHD, this sense of overload tends to arise more often.
- **NEW**: The more tasks you have to keep in mind, the harder it is to stay organized. This is especially relevant for people with ADHD, who are more prone to feeling overwhelmed.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is much more natural and idiomatic for a mental health context. It uses 'stay organized' instead of the clunky 'maintain order' and 'feeling overwhelmed' instead of the literal 'sense of overload'.
  - [old/style/minor] The phrasing 'this sense of overload tends to arise more often' is slightly heavy and sounds like a direct translation from Russian.
  - [old/style/minor] 'Maintain order' sounds more like tidying a room than managing cognitive load; 'stay organized' is the better UX/lifestyle term.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more idiomatic and natural for a mental health context. It uses 'stay organized' instead of the literal 'maintain order' and 'feeling overwhelmed' instead of the clunky 'sense of overload'.
  - [old/style/minor] The phrase 'maintain order' sounds a bit like maintaining physical order in a room rather than mental organization; 'sense of overload' is slightly unnatural compared to 'feeling overwhelmed'.
  - [old/style/minor] The use of 'someone' is grammatically correct but feels slightly more detached/academic than the direct 'you' used in B, which fits the 'understanding friend' tone better.

#### 🟡 en `/steps_description/12/text`— вердикт неустойчив

- **RU**: Чувство тревоги и беспокойства имеет эволюционные корни. Эти эмоции помогали нашим предкам выживать в опасных ситуациях, обеспечивая готовность к действию.
- **OLD**: Feelings of anxiety and inner restlessness have deep evolutionary roots. These emotions once helped our ancestors stay alert in dangerous situations, preparing the body to act quickly.
- **NEW**: Feelings of anxiety and restlessness have evolutionary roots. These emotions helped our ancestors survive in dangerous situations by ensuring they were ready for action.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A sounds more natural and professional for a psychoeducation article, using 'stay alert' and 'preparing the body to act' which flows better than the literal 'ready for action'.
  - [new/style/minor] The phrasing 'ensuring they were ready for action' is a bit clunky and sounds more like a direct translation than native English prose.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is a more faithful and concise rendering of the original text. Translation B introduces unnecessary additions ('inner', 'deep', 'the body') that deviate from the source.
  - [old/addition/minor] Added 'inner' to restlessness, 'deep' to roots, and 'the body' to the action part, which makes the text more wordy than the original.
  - [old/style/minor] The phrasing 'once helped' is slightly more narrative/storytelling than the factual tone of the original.

#### 🟢 en `/steps_description/0/text` — NEW лучше (2:0)

- **RU**: Люди с СДВГ часто испытывают трудности с поддержанием внимания на одной задаче в течение длительного времени. Это может привести к трудностям в завершении проекта, даже если основная часть уже выполнена.
- **OLD**: People with ADHD often find it hard to keep their attention on one task for a long time, so they may struggle to finish a project even when the hardest part is already done.
- **NEW**: People with ADHD often struggle to maintain focus on a single task for an extended period. This can make it difficult to finish a project, even when the bulk of the work is already done.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A is more idiomatic and professional, using 'maintain focus' and 'the bulk of the work' which sounds natural for a mental health context. Translation B introduces a mistranslation by changing 'the main part' to 'the hardest part' and uses a slightly clunky 'so they may struggle' structure.
  - [old/mistranslation/major] The original says 'основная часть' (main/bulk part), but the translation says 'the hardest part', which changes the meaning.
  - [old/style/minor] The phrasing 'find it hard to keep their attention' is slightly more wordy/less professional than 'struggle to maintain focus'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 96)
  - Translation B uses more professional and idiomatic phrasing ('maintain focus', 'extended period', 'bulk of the work') suitable for psychoeducation, whereas A is slightly more colloquial and uses a less precise 'hardest part' instead of 'main part'.
  - [old/style/minor] The phrasing 'find it hard to keep their attention' is a bit wordy compared to 'struggle to maintain focus', and 'hardest part' is a slight deviation from 'основная часть' (main part).

#### 🔴 en `/steps_description/14/text` — OLD лучше (2:0)

- **RU**: Быстрая скорость мыслей, характерная для людей с СДВГ, может приводить к быстрому и непрерывному говорению. Это особенно проявляется в обществе, где много стимулов для общения.
- **OLD**: Fast, racing thoughts, which are common in ADHD, can lead to rapid and continuous talking. This is especially noticeable in social situations that are rich in stimulation.
- **NEW**: The racing thoughts characteristic of people with ADHD can lead to fast and continuous talking. This is especially evident in social settings with many communication stimuli.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 85)
  - Translation B sounds more natural and idiomatic for a mental health context. 'Rich in stimulation' is a much better way to describe an environment than the clunky 'many communication stimuli' used in A.
  - [new/style/minor] The phrase 'many communication stimuli' sounds like a literal translation (calque) and is unnatural in English; 'social settings with many stimuli' or 'highly stimulating environments' would be better.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Translation A sounds much more natural and idiomatic for a mental health context. Translation B suffers from heavy 'translationese' and awkward phrasing like 'communication stimuli'.
  - [new/style/major] The phrase 'communication stimuli' is unnatural; 'social situations that are rich in stimulation' or 'stimulating social environments' is how a native speaker would express this.
  - [new/style/minor] The structure 'The racing thoughts characteristic of...' is slightly heavy and academic compared to the smoother flow of A.

#### 🟢 en `/result/high/text` — NEW лучше (2:0)

- **RU**: Ваши ответы могут указывать на выраженные трудности, связанные с концентрацией внимания, саморегуляцией и устойчивостью к отвлечениям. Такие проявления могут влиять на работу, обучение и повседневную жизнь. Этот тест не ставит диагноз, но может служить поводом…
- **OLD**: Your answers may point to marked difficulties with attention, self-regulation and resistance to distractions. These patterns can affect work, study and everyday life. This test does not provide a diagnosis, but it can be a reason to seek a full assessment from…
- **NEW**: Your answers may indicate significant challenges with attention, self-regulation, and resisting distractions. These symptoms can impact your work, studies, and daily life. While this test does not provide a diagnosis, it can serve as a reason to consult a spec…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B sounds more natural and professional for a mental health context. It uses better collocations ('significant challenges' vs 'marked difficulties') and flows more smoothly as a cohesive paragraph.
  - [old/style/minor] The phrasing 'resistance to distractions' is a bit clunky compared to 'resisting distractions'; 'marked difficulties' sounds slightly more clinical/dated than 'significant challenges'.
  - [old/style/minor] The translation of 'снизить нагрузку' as 'reduce daily stress' is a slight shift in meaning from the original 'burden/load'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Translation A sounds more natural and professional for a mental health context. Translation B uses slightly clunky phrasing like 'resistance to distractions' and 'getting supportive guidance', whereas A uses more idiomatic 'resisting distractions' and 'seeking professional guidance'.
  - [old/style/minor] 'resistance to distractions' is a bit heavy/unnatural compared to 'resisting distractions'
  - [old/style/minor] 'Getting supportive guidance' sounds slightly informal/clunky for this context
  - [old/style/minor] 'reduce daily stress' is a slight shift from 'снизить нагрузку' (reduce the burden/load)

#### 🔴 en `/steps_description/9/text` — OLD лучше (2:0)

- **RU**: Люди с СДВГ часто испытывают проблемы с забывчивостью и организацией, что может приводить к частой потере вещей. Это связано с трудностями в управлении рабочей памятью и планировании.
- **OLD**: People with ADHD often struggle with forgetfulness and organization, which can lead to frequently losing or misplacing things. This is linked to difficulties with working memory and planning.
- **NEW**: People with ADHD often face challenges with forgetfulness and organization, which can lead to frequently losing things. This is linked to difficulties in managing working memory and planning.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more idiomatic and natural for a mental health context. The addition of 'misplacing' in A is a smart transcreation that captures the nuance of 'потеря вещей' in English, whereas B is a bit more literal and dry.
  - [new/style/minor] The phrase 'difficulties in managing' is slightly more clunky than 'difficulties with' in this context.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more natural and idiomatic for a mental health context. The use of 'struggle with' is more empathetic and common than 'face challenges with', and 'losing or misplacing' better captures the nuance of the original intent in English.
  - [new/style/minor] 'face challenges with' is slightly more formal/stiff than the more natural 'struggle with' in this context.

#### 🟡 en `/steps_description/11/text`— вердикт неустойчив

- **RU**: Гиперактивность является одним из ключевых симптомов СДВГ. Люди с СДВГ часто испытывают трудности с длительным сидением на одном месте и могут чувствовать необходимость в движении.
- **OLD**: Hyperactivity, a core ADHD symptom, can make it hard to remain seated for long periods. People may feel a strong need to get up, move around or change position.
- **NEW**: Hyperactivity is one of the key symptoms of ADHD. People with ADHD often find it difficult to sit still for long periods and may feel a constant need to move.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows better for a mental health article, using a natural appositive structure. Translation B is grammatically correct but feels slightly more like a literal translation of the Russian sentence structure.
  - [new/style/minor] The structure 'is one of the key symptoms' is a bit wordy/clunky compared to the more elegant 'a core ADHD symptom'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is a faithful and natural rendering of the original text, maintaining the exact structure and meaning. Translation B introduces significant additions (getting up, changing position) and changes the sentence structure, which deviates from the source.
  - [old/addition/minor] Added 'get up' and 'change position' which are not in the original text.
  - [old/style/minor] The first sentence is restructured into an appositive phrase, which changes the original's direct tone.

#### 🟡 en `/steps_description/7/fact`— вердикт неустойчив

- **RU**: Ричард Бренсон, основатель Virgin Group признавал, что ему трудно удерживать внимание на скучных задачах. Он делегировал однообразные и рутинные задачи своим сотрудникам, чтобы сосредоточиться на более интересных и творческих аспектах бизнеса.
- **OLD**: Richard Branson, founder of the Virgin Group, has admitted that he finds it difficult to stay focused on boring tasks. He delegates routine work to his team so he can concentrate on more creative and engaging areas of the business.
- **NEW**: Richard Branson, founder of the Virgin Group, has admitted that he finds it hard to stay focused on boring tasks. He delegates repetitive and routine work to his employees so he can focus on the more interesting and creative aspects of the business.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A sounds more natural and professional for a narrative text. Using 'engaging' instead of 'interesting' and 'team' instead of 'employees' makes the tone more modern and less clinical.
  - [new/style/minor] The phrase 'repetitive and routine' is slightly redundant, and 'employees' sounds a bit more formal/stiff than 'team' in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original text, preserving the nuance of 'repetitive and routine' (однообразные и рутинные) and 'interesting' (интересных), whereas B simplifies and slightly alters the meaning.
  - [old/omission/minor] omitted 'repetitive' (однообразные) and 'interesting' (интересных), replacing them with 'routine' and 'engaging'
  - [old/style/minor] replaced 'employees' with 'team', which is a slight shift in tone from the original

#### 🟢 en `/steps_description/14/fact` — NEW лучше (2:0)

- **RU**: Роберт Дауни младший, актер, который страдает от СДВГ, известен своей энергичной и быстрой речью. Он использует свой актерский талант, чтобы направить свою энергию и импульсивность в творческое русло.
- **OLD**: Actor Robert Downey Jr. has spoken about his high energy and quick speech, and how creativity and acting help him channel these traits in a constructive way.
- **NEW**: Robert Downey Jr., an actor who has ADHD, is known for his energetic and fast-paced speech. He uses his acting talent to channel his energy and impulsivity into his creative work.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a faithful and natural rendering of the original text, maintaining the structure and meaning perfectly. Translation B is a significant paraphrase that omits the specific mention of ADHD and changes the causal relationship described in the original.
  - [old/omission/major] The mention of ADHD is completely missing.
  - [old/mistranslation/major] The original states he uses talent to channel energy; B suggests creativity and acting help him channel traits, which shifts the focus.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B is a faithful and accurate rendering of the original text, maintaining all key details (ADHD, impulsivity, specific phrasing). Translation A is a significant paraphrase that omits several key elements of the source.
  - [old/omission/major] Omitted 'ADHD' and 'impulsivity', which are central to the context.
  - [old/style/minor] Changed the factual tone of the original into a summary of what he 'has spoken about'.

#### 🟢 en `/steps_description/4/fact` — NEW лучше (2:0)

- **RU**: Певец и актер Джастин Тимберлейк также признался, что у него СДВГ и обсессивно-компульсивное расстройство. Он часто ерзал и двигался, что помогало ему справляться с напряжением и тревожностью.
- **OLD**: Singer and actor Justin Timberlake has spoken about living with both ADHD and obsessive–compulsive disorder. He has said that moving and fidgeting sometimes helps him cope with tension and anxiety.
- **NEW**: Singer and actor Justin Timberlake has also shared that he has ADHD and OCD. He often fidgeted and moved around, which helped him manage tension and anxiety.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is more accurate to the original tense and structure. Translation A changes the meaning of the second sentence by using the present tense ('helps'), whereas the original describes a past habit ('помогал').
  - [old/mistranslation/major] The original describes a past habit ('помогал'), but the translation uses the present tense ('helps'), implying he still does it this way, which changes the narrative context.
  - [old/style/minor] The phrase 'spoken about living with' is a bit wordy compared to the direct 'признался' (shared/disclosed).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more faithful to the original tense and structure, providing a direct and natural narrative. Translation B introduces unnecessary complexity and shifts the tense to the present, which changes the meaning from a historical description to a general habit.
  - [old/mistranslation/major] The original describes past behavior ('помогало'), but B uses the present tense ('helps'), implying he still does this, which alters the factual context of the sentence.
  - [old/style/minor] The phrase 'has spoken about living with both' is slightly wordy compared to the directness of the original.

#### 🟡 en `/steps_description/4/text`— вердикт неустойчив

- **RU**: Одним из ключевых симптомов СДВГ является гиперактивность. Она может проявляться в постоянном ерзании, постукивании ногами или движениях руками, особенно когда нужно долгое время сидеть на одном месте.
- **OLD**: Hyperactivity is one of the core symptoms of ADHD. It can show up as constant fidgeting, tapping feet or moving hands, especially when a person is expected to sit still for a long period of time.
- **NEW**: One of the key symptoms of ADHD is hyperactivity. This can manifest as constant fidgeting, tapping feet, or hand movements, especially when required to sit still for long periods.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and professional, using 'manifest as' which is more appropriate for a clinical/educational context than 'show up as'. It also avoids the wordy 'a person is expected to' in favor of a more natural passive construction.
  - [old/style/minor] The phrase 'show up as' is slightly too informal for describing medical symptoms, and 'a person is expected to' is unnecessarily wordy compared to the original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and empathetic, using 'show up' and 'a person is expected to', which fits the 'understanding friend' tone. Translation B is slightly more formal/clinical and has a minor grammatical awkwardness in the final clause.
  - [new/style/minor] The phrase 'especially when required to sit still' is a bit clipped/passive; adding a subject like 'you' or 'a person' would make it smoother for a mental health app.

#### 🟢 en `/steps_description/5/fact` — NEW лучше (2:0)

- **RU**: Сэр Энтони Хопкинс - известный актер признался, что у него СДВГ, и описал, как чувство "заведенного мотора" помогло ему в карьере актера, позволяя ему вкладывать энергию в исполнение ролей.
- **OLD**: Actor Sir Anthony Hopkins has described how ADHD contributed to a sense of inner drive, and how he learned to channel this energy into his work and creative projects.
- **NEW**: Sir Anthony Hopkins, the renowned actor, has shared his ADHD diagnosis and described how that “driven by a motor” feeling helped his acting career, allowing him to pour energy into his roles.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation B is much closer to the original meaning and preserves the specific metaphor used. Translation A is a complete rewrite that loses the 'motor' imagery and the specific mention of his acting career in favor of generic 'creative projects'.
  - [old/omission/major] Lost the specific 'motor' metaphor and the direct mention of his acting career, replacing them with vague 'inner drive' and 'creative projects'.
  - [old/style/minor] The phrasing 'has described how ADHD contributed to...' is a bit clinical and loses the personal 'confessed' (признался) tone of the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a faithful and idiomatic rendering of the original, preserving the specific 'driven by a motor' metaphor which is central to the text. Translation B is an over-interpretation that omits the specific metaphor and changes the structure significantly, turning a descriptive sentence into a summary of his coping mechanisms.
  - [old/omission/major] The specific 'driven by a motor' feeling is lost, replaced by a generic 'sense of inner drive'.
  - [old/mistranslation/minor] The original says he 'admitted' (признался) to having ADHD, whereas B implies he just 'described how ADHD contributed', losing the personal disclosure aspect.

#### 🟢 en `/steps_description/5/text` — NEW лучше (2:0)

- **RU**: Чувство "заведенного мотора" является классическим симптомом гиперактивности, особенно у людей с СДВГ. Это состояние характеризуется постоянной физической активностью и невозможностью расслабиться.
- **OLD**: Feeling as if there is a “motor running inside” is a classic description of hyperactivity, especially in people with ADHD. This state is marked by constant physical activity and an inner inability to relax.
- **NEW**: The feeling of being “driven by a motor” is a classic symptom of hyperactivity, especially in people with ADHD. This state is characterized by constant physical activity and an inability to relax.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses the idiomatic and clinically recognized phrasing 'driven by a motor' which perfectly captures the original sense. Translation B is wordy and adds an unnecessary 'inner' to the inability to relax.
  - [old/style/minor] The phrase 'Feeling as if there is a “motor running inside”' is clunky compared to the idiomatic 'driven by a motor'.
  - [old/addition/minor] Added 'inner' to 'inability to relax', which is not in the original and sounds redundant.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B uses the idiomatic and clinically recognized phrase 'driven by a motor' and follows the professional tone of the original without unnecessary additions. Translation A is slightly wordy and adds 'inner', which is redundant and sounds like a translation artifact.
  - [old/addition/minor] Added 'inner' to 'inability to relax', which is not in the original and sounds unnatural in English.

#### 🟢 en `/steps_description/10/text` — NEW лучше (2:0)

- **RU**: Люди с СДВГ часто имеют повышенную сенсорную чувствительность, что делает их более восприимчивыми к внешним раздражителям, таким как шум или движение. Это может приводить к частым отвлечениям.
- **OLD**: Many people with ADHD have increased sensory sensitivity, which makes them more reactive to external stimuli such as noise or movement. This can result in frequent distractions.
- **NEW**: People with ADHD often have increased sensory sensitivity, making them more susceptible to external stimuli like noise or movement. This can lead to frequent distractions.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and flows better. Using 'making them' instead of 'which makes them' creates a more natural connection, and 'susceptible' is a more precise fit for sensory sensitivity than 'reactive'.
  - [old/style/minor] The construction 'which makes them' is slightly more clunky/textbook-like compared to the participle phrase in B; 'reactive' is acceptable but 'susceptible' is more natural in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and flows better. Translation B introduces an unnecessary 'Many' (addition) and uses 'reactive', which is slightly less accurate in this context than 'susceptible'.
  - [old/addition/minor] Added 'Many' which is not in the original 'Люди с СДВГ' (People with ADHD).
  - [old/style/minor] Used 'reactive' instead of 'susceptible'; while not wrong, 'susceptible' better captures the vulnerability to stimuli described in the original.

#### 🟡 en `/steps_description/13/text`— вердикт неустойчив

- **RU**: Люди с СДВГ часто испытывают трудности с расслаблением даже в свободное время из-за постоянного чувства беспокойства и необходимости быть занятыми.
- **OLD**: Many people with ADHD find it hard to relax even in their free time because of a constant sense of inner tension and a drive to stay busy.
- **NEW**: People with ADHD often find it hard to relax, even during their free time, due to a constant sense of restlessness and a need to stay busy.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and captures the psychological nuance of 'беспокойство' in this context better with 'inner tension' and 'a drive to stay busy'. Translation B is grammatically correct but feels slightly more literal and clunky due to the commas and the phrasing 'a need to stay busy'.
  - [new/style/minor] The use of multiple commas makes the sentence feel fragmented; 'a need to stay busy' is a bit more clinical/dry than the more natural 'a drive to stay busy'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and natural. 'Restlessness' is a better fit for 'беспокойство' in the context of ADHD than 'inner tension', and 'a need to stay busy' is a more accurate rendering of the original than 'a drive to stay busy'.
  - [old/mistranslation/minor] 'inner tension' is a bit more specific/heavy than the general 'беспокойство', and 'a drive' implies an internal motivation/urge which is slightly different from the 'necessity' (необходимость) mentioned in the original.

#### 🟢 en `/steps_description/16/fact` — NEW лучше (2:0)

- **RU**: Исследования показывают, что импульсивность и неспособность ждать могут негативно влиять на личные и профессиональные отношения, снижать качество жизни и приводить к конфликтам.
- **OLD**: Studies show that impulsivity and difficulty waiting can negatively affect relationships, work performance and overall quality of life, and may lead to conflicts with others.
- **NEW**: Research shows that impulsivity and the inability to wait can negatively impact personal and professional relationships, reduce quality of life, and lead to conflict.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is more precise and follows the original structure more closely without adding unnecessary words. Translation A introduces 'work performance' and 'with others', which are additions not present in the source.
  - [old/addition/minor] Added 'work performance' instead of 'professional relationships' and 'with others' at the end.
  - [old/style/minor] The phrasing 'difficulty waiting' is slightly less precise than 'inability to wait' in a clinical/research context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is a precise, professional, and idiomatic rendering of the original. Translation B introduces significant additions ('work performance', 'with others') that were not in the source text, drifting away from the original meaning.
  - [old/addition/major] Added 'work performance' and 'with others', which changes the scope of the original sentence.
  - [old/style/minor] The phrasing 'difficulty waiting' is slightly less formal/precise than 'the inability to wait' in a research context.

#### 🟢 en `/steps_description/10/fact` — NEW лучше (2:0)

- **RU**: Отвлечение внимания на внешние стимулы — общая проблема, с которой сталкиваются многие люди, особенно в условиях повышенной нагрузки информации. Это явление называется "разделенное внимание".
- **OLD**: Being pulled away by background sounds or events is a common difficulty in modern life. Psychologists sometimes refer to this as the challenge of “divided attention” in a world full of stimuli.
- **NEW**: Being distracted by external stimuli is a common issue for many people, especially in high-information environments. This phenomenon is known as “divided attention.”
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation B is a precise and professional rendering of the original, maintaining the exact meaning and structure. Translation A introduces unnecessary interpretations (background sounds, modern life) and changes the tone from informative to slightly more conversational/essayistic.
  - [old/addition/minor] Added 'background sounds or events' and 'in modern life' which are not in the original.
  - [old/style/minor] The phrasing 'Psychologists sometimes refer to this as...' is an unnecessary addition that deviates from the directness of the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a precise, professional, and faithful rendering of the original text. Translation B introduces significant additions and changes the meaning (e.g., specifying 'background sounds' and 'modern life'), which violates the rule against adding information not present in the source.
  - [old/addition/major] Added 'background sounds or events', 'modern life', and 'in a world full of stimuli' which are not in the original.
  - [old/style/minor] The phrasing 'is a common difficulty' is slightly less natural than 'is a common issue' in this context.

#### 🟢 en `/steps_description/2/fact` — NEW лучше (2:0)

- **RU**: Исследования показывают, что около 40-60% взрослых с СДВГ сталкиваются с проблемами забывчивости, особенно в отношении назначенных встреч и обязательств.
- **OLD**: Studies suggest that around 40–60% of adults with ADHD report significant forgetfulness, especially when it comes to scheduled meetings and promises they’ve made.
- **NEW**: Research shows that approximately 40–60% of adults with ADHD face forgetfulness, particularly regarding scheduled meetings and commitments.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more concise, professional, and uses the precise term 'commitments' which perfectly matches the original 'обязательств'. Translation A is slightly wordy and uses 'promises they've made', which sounds a bit more informal/childish than the source.
  - [old/style/minor] The phrase 'promises they've made' is a bit heavy and less professional than 'commitments' for a scientific/educational context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A is concise, professional, and uses the most natural academic/scientific phrasing ('Research shows', 'face forgetfulness'). Translation B is wordy and introduces unnecessary additions ('significant', 'promises they've made') that change the tone from a factual statement to a more conversational, slightly repetitive one.
  - [old/addition/minor] Added 'significant' and 'promises they've made', which are not in the original.
  - [old/style/minor] 'when it comes to' is slightly more colloquial than the more precise 'regarding' used in A.

#### 🟢 en `/steps_description/17/fact` — NEW лучше (2:0)

- **RU**: Джонни Депп, актер, страдающий от СДВГ, часто признавался, что ему трудно не прерывать других. Он использует методы осознанности и медитации, чтобы улучшить свои навыки общения и уменьшить импульсивность.
- **OLD**: Actor Johnny Depp has talked about how challenging it can be not to interrupt people. He notes that practices such as mindfulness and conscious listening help him communicate more calmly.
- **NEW**: Johnny Depp, an actor with ADHD, has admitted that he finds it hard not to interrupt others. He uses mindfulness and meditation techniques to improve his communication skills and reduce impulsivity.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is a precise, professional, and faithful rendering of the original text, maintaining all key details (ADHD, meditation, impulsivity). Translation B is an over-simplification that omits critical information (ADHD, meditation) and adds new concepts (conscious listening) not present in the source.
  - [old/omission/major] Missing 'ADHD' and 'meditation'
  - [old/addition/minor] Added 'conscious listening' which is not in the original
  - [old/style/minor] The tone is slightly too casual compared to the informative original
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation B is a faithful and accurate rendering of the original text, preserving all key details (ADHD, meditation, impulsivity). Translation A introduces significant omissions and changes the meaning (e.g., 'conscious listening' was not in the original, and 'meditation' is missing).
  - [old/omission/major] Missing 'ADHD' and 'meditation'
  - [old/addition/minor] Added 'conscious listening' which is not in the source
  - [old/style/minor] The phrasing 'talked about how challenging it can be' is slightly wordier than the original's directness

#### 🟢 en `/steps_description/3/text` — NEW лучше (2:0)

- **RU**: Паркинсоновский закон - этот принцип гласит, что работа заполняет все доступное для её выполнения время. Если срок выполнения задачи не определен, прокрастинация может затянуть начало работы на неопределенное время.
- **OLD**: Parkinson’s law says that work tends to expand to fill all the time available for it. When there is no clear deadline, it becomes much easier to delay starting a demanding task, and procrastination can stretch out for a long time.
- **NEW**: Parkinson’s Law: This principle states that work expands to fill the time available for its completion. If a deadline isn’t set, procrastination can delay the start of a task indefinitely.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is a perfect, idiomatic rendering of the concept that sounds like a professional English text. Translation B is wordy, contains unnecessary additions, and loses the punchy, authoritative tone of the original principle.
  - [old/addition/minor] Added 'demanding' and 'it becomes much easier', which changes the original meaning.
  - [old/style/major] The phrase 'procrastination can stretch out for a long time' is a weak, non-idiomatic way to translate 'затянуть на неопределенное время' compared to 'indefinitely'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is much more concise, professional, and idiomatic. Translation A is wordy and introduces unnecessary nuances ('demanding task') that aren't in the original.
  - [old/addition/minor] added 'demanding' which is not in the original
  - [old/style/minor] the phrasing 'it becomes much easier to delay... and procrastination can stretch out' is wordy and less impactful than the original

