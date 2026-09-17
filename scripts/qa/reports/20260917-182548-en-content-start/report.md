# QA: слепое парное сравнение переводов — en-content-start

- **Дата**: 2026-09-17T15:25:48.475Z
- **Метка**: en-content-start
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/start.json
- **Локали**: en
- **Сэмпл/файл**: 10
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 3907b3511f2db1a1d0814f4ca645e5f04015007c

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/start.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 5 | 🟢 3 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |
| **итого** | 5 | 🟢 3 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×2, terminology/minor×1; OLD — style/minor×5, omission/minor×1, omission/major×1, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟢 en `/title` — NEW лучше (2:0)

- **RU**: Понимание себя через когнитивно-поведенческую терапию
- **OLD**: Understanding Yourself Through Cognitive Behavioral Therapy
- **NEW**: Understanding yourself through cognitive behavioral therapy (CBT)
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B correctly follows the project's rule to introduce the abbreviation (CBT) upon first mention, whereas A misses this requirement. B also uses sentence case, which is more appropriate for a title/heading in this context.
  - [old/omission/minor] Missing the (CBT) abbreviation required by the style guide for the first mention of the term.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A correctly follows the project's requirement for sentence case in titles and includes the mandatory introduction of the 'CBT' abbreviation upon first mention. Translation B uses title case, which violates the style guide, and omits the abbreviation.
  - [old/style/minor] Uses Title Case instead of Sentence case for a title.
  - [old/omission/minor] Missing the '(CBT)' abbreviation required for the first mention of the term.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: В современном мире, полном стрессов и неопределённости, психологическое благополучие как никогда важно. Миллионы людей ежедневно сталкиваются с трудностями — от лёгкого дискомфорта и тревоги до серьёзных состояний, таких как депрессия, невроз, посттравматическ…
- **OLD**: In today’s world, full of stress and uncertainty, psychological well-being is more important than ever. Every day, millions of people face challenges — from mild discomfort and anxiety to serious conditions such as depression, anxiety disorders, post-traumatic…
- **NEW**: In today’s world of stress and uncertainty, mental well-being is more important than ever. Millions of people face difficulties every day — from mild anxiety to more serious conditions like depression, neurosis, or PTSD. These challenges can significantly impa…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more natural and follows the 'supportive friend' tone guidelines, using contractions (you're, it's) and better flow. Translation A feels slightly more formal/stiff and contains an omission of the quote.
  - [old/omission/major] The quote by Rebecca Walker was completely omitted.
  - [old/style/minor] Uses 'psychological well-being' instead of the preferred 'mental well-being' and avoids contractions, making it feel less like a modern app and more like a textbook.
  - [old/terminology/minor] Translated 'невроз' as 'anxiety disorders', which is a different clinical term than 'neurosis'.
  - [new/terminology/minor] Used 'neurosis' which is a direct translation; while less common in modern US clinical settings than 'anxiety disorders', it is faithful to the original text.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more natural and follows the 'warm, supportive friend' tone required for the target market. It uses appropriate contractions (you're, it's) and avoids the stiff, academic feel of Translation B. Translation A also correctly uses 'mental well-being' instead of the heavier 'psychological well-being'.
  - [old/style/major] Too formal and academic; lacks contractions (you are, it is), which makes it feel like a textbook rather than a supportive guide.
  - [old/terminology/minor] Used 'psychological well-being' instead of the preferred 'mental well-being'.
  - [old/style/minor] The word 'defective' for 'неполноценным' is quite harsh and clinical; 'broken' in A is much more empathetic and natural in a mental health context.

#### 🟡 en `/description`— вердикт неустойчив

- **RU**: Статья знакомит с основами когнитивно-поведенческой терапии (КПТ) и показывает, как глубинные и промежуточные убеждения формируют автоматические мысли и эмоции. Через образ яблоневого дерева поясняется, каким образом внутренние установки влияют на восприятие с…
- **OLD**: This article introduces the basics of cognitive behavioral therapy (CBT) and shows how core and intermediate beliefs shape automatic thoughts and emotions. Using the image of an apple tree, it explains how inner beliefs influence the way we interpret events an…
- **NEW**: This article introduces the basics of CBT and shows how core beliefs and intermediate beliefs shape your automatic thoughts and emotions. Using the metaphor of an apple tree, it explains how your internal beliefs influence how you perceive events and react to …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A is more concise and flows naturally, avoiding the repetitive 'beliefs' used in B. It also correctly uses 'image' or 'metaphor' (though A uses 'image' which is fine) without overusing the second-person 'your', which makes the text feel more like a professional article summary.
  - [new/style/minor] Repetitive use of 'core beliefs and intermediate beliefs' instead of grouping them; excessive use of 'your' makes the tone slightly more instructional than the original descriptive summary.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation A is more natural and follows the project's tone guidelines by using 'your' to engage the reader. Translation B is slightly more formal/academic and uses 'image' instead of the more appropriate 'metaphor' for an apple tree.
  - [old/style/minor] Using 'image' for an apple tree metaphor is less idiomatic than 'metaphor' or 'imagery'; 'the way we interpret' is slightly more wordy than 'how you perceive'.
  - [old/style/minor] The tone is slightly more detached/academic compared to the 'understanding friend' tone requested.

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Рассмотрим пример. Двум коллегам сделали одинаковое замечание по работе: Мария: с детства у неё сформировалось глубинное убеждение «Я недостаточно хороша». Её промежуточное убеждение: «Чтобы меня ценили, я должна быть безупречна». Получив критику, она думает: …
- **OLD**: Let’s look at an example. Two colleagues receive the same comment about their work: Maria: from childhood she developed a core belief, “I’m not good enough.” Her intermediate belief is: “To be valued, I have to be flawless.” When she hears criticism, she think…
- **NEW**: Let’s look at an example. Two colleagues receive the same feedback at work: Maria: since childhood, she has held the core belief, “I am not good enough.” Her intermediate belief is: “To be valued, I must be perfect.” When she receives criticism, she thinks: “I…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 96)
  - Translation B is much more natural and follows the 'warm expert' tone guidelines. It uses appropriate contractions (don't, I've) and better vocabulary (exhaustion vs loss of energy, feedback vs comment). Translation A feels slightly more literal and stiff in several places.
  - [old/style/minor] Uses 'loss of energy' which is a bit clunky compared to 'exhaustion'; 'comment' is a weaker choice than 'feedback' for a work context; lacks contractions like 'don't' which are preferred in the style guide.
  - [old/style/minor] The phrase 'do not worry' is more formal/stiff than the recommended 'don't worry'.
  - [new/style/minor] The phrase 'automatic thoughts are born' is a slight calque from Russian, but acceptable in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A is much more natural and professional. It uses 'feedback' instead of the clunky 'comment about their work' or 'remark', and correctly uses 'exhaustion' for 'упадок сил'. Translation B contains several stylistic weaknesses and a mistranslation of 'упадок сил' as 'loss of energy', which sounds unnatural in this context.
  - [old/style/minor] 'comment about their work' is a bit wordy compared to 'feedback'.
  - [old/style/minor] 'loss of energy' is a literal translation of 'упадок сил'; 'exhaustion' or 'fatigue' is better.
  - [old/style/minor] 'the result is calm' is grammatically awkward; 'the result is calmness' (A) is better.
  - [old/style/minor] Uses 'do not worry' instead of the more natural contraction 'don't worry' preferred in the tone guidelines.

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: В когнитивно-поведенческой терапии сознание условно описывается тремя уровнями: глубинные убеждения, промежуточные убеждения (правила) и автоматические мысли. Ключевая идея КПТ заключается в том, что самочувствие и чувства зависят от того, как мы думаем. <impo…
- **OLD**: In cognitive behavioral therapy, the mind is often described as having three levels: core beliefs, intermediate beliefs (rules), and automatic thoughts. The key idea of CBT is that our emotional state and well-being depend on how we think. This leads to the ma…
- **NEW**: In CBT, the mind is conceptually described through three levels: core beliefs, intermediate beliefs (rules), and automatic thoughts. The key idea of CBT is that your well-being and feelings depend on how you think. <important>This leads to the main principle: …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more polished and follows the target tone of a 'knowledgeable friend' more naturally. It uses better flow and more idiomatic phrasing (e.g., 'view every event through its lens' vs 'passes through its lens'). It also correctly handles the CBT terminology and maintains a consistent 'you' perspective which is more engaging for the user.
  - [old/style/minor] The phrasing 'remains outside of awareness' is slightly more clinical/academic than the warm tone requested, whereas 'often unconscious' is more direct.
  - [old/style/minor] The sentence 'This is how a wide range of emotional responses appears' is a bit clunky compared to A's more natural construction.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more natural and flows better as a piece of educational content. It avoids the slightly clunky passive constructions found in B (e.g., 'meaning is assigned') and uses more idiomatic phrasing ('outside of awareness' vs 'unconscious', 'fulfillng' vs 'productive').
  - [new/style/minor] The phrase 'meaning is assigned through your own beliefs' is a bit heavy and passive; A's 'we assign meaning' is much more natural for a 'supportive friend' tone.
  - [new/style/minor] The translation of the example 'I'm late — so I should leave earlier next time' is a slight deviation from the original 'I'll leave earlier' (future intent vs obligation), though acceptable.

