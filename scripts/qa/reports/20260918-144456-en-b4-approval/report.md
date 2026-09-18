# QA: слепое парное сравнение переводов — en-b4-approval

- **Дата**: 2026-09-18T11:44:56.684Z
- **Метка**: en-b4-approval
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/approval.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 59773e25fd9cb826f3e71e3a543930f97721ad28

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/approval.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 7 | 🟢 2 | 🔴 0 | ⚪ 0 | 🟡 5 | 0 / 0 | 100% |
| **итого** | 7 | 🟢 2 | 🔴 0 | ⚪ 0 | 🟡 5 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×5, mistranslation/major×1, style/major×1; OLD — style/minor×6, mistranslation/major×1

### Детали пар (для спот-чека)

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Всем приятно получать одобрение. Мы нередко ищем подтверждение своей значимости во взглядах и оценках других — это естественно для социальных существ. Проблема начинается тогда, когда потребность в одобрении превращается в зависимость и начинает стеснять жизнь…
- **OLD**: Everyone likes to be appreciated. It’s natural for social beings to look for confirmation of their worth in other people’s reactions and opinions. The problem begins when the wish for approval turns into a dependency and starts to limit your life. You may have…
- **NEW**: Everyone enjoys being appreciated. It’s natural for social beings to seek validation through the views and evaluations of others. The problem begins when the need for approval turns into a dependency that starts to restrict your life. You might have caught you…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and better captures the psychological nuances. 'Rollercoaster' is a much more natural English metaphor for emotional swings than 'swing', and 'logically flawed' is more standard than 'logically fragile'. B also uses 'validation' which fits the context of seeking approval better than 'confirmation of worth'.
  - [old/style/minor] The metaphor 'emotions into a swing' is a bit literal/clunky; 'rollercoaster' in B is the standard English idiom for this.
  - [old/style/minor] 'Logically fragile' is understandable but 'logically flawed' is the more natural collocation for arguments/beliefs.
  - [new/style/minor] 'Did you actually feel good' is slightly less precise than 'feel pleasure', but it sounds more natural in a conversational tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is much more idiomatic and flows like a professional English article. It uses natural metaphors like 'rollercoaster' for 'качели' and 'on a high/mood crashes', whereas B's 'emotions into a swing' sounds like a literal translation. A also handles the CBT-adjacent nuances and the tone of a 'supportive expert' much better.
  - [old/style/major] The metaphor 'emotions into a swing' is a literal translation of 'качели' and sounds unnatural in English; 'rollercoaster' is the correct idiomatic equivalent.
  - [old/style/minor] The phrase 'Did you actually feel pleasure' is a bit heavy/clunky compared to 'Did you actually feel good'.
  - [old/style/minor] The translation of 'уязвимы' as 'fragile' is acceptable, but 'flawed' (in A) fits the logical context of beliefs better.

#### 🟡 en `/title`— вердикт неустойчив

- **RU**: «Я – молодец»? Почему я постоянно жду похвалы?
- **OLD**: “I Did Great!” Why Am I Always Waiting for Praise?
- **NEW**: “Am I doing a good job?” Why do I constantly crave praise?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A perfectly captures the internal monologue style and the tone of the original. Translation B changes the meaning from a self-affirmation to a question, which alters the psychological context.
  - [new/mistranslation/major] The original is a self-affirmation ('I am great'), whereas B turns it into a question ('Am I doing a good job?'), changing the core sentiment of the thought being examined.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A captures the internal monologue and psychological nuance perfectly. Translation B uses Title Case for a sentence that should be a quote, and 'Waiting for praise' is a weaker, more literal translation of the psychological state than 'crave praise'.
  - [old/style/major] Uses Title Case for the second sentence, which is inappropriate for a standard question in this context.
  - [old/style/minor] The phrase 'Waiting for praise' is a bit flat compared to the more idiomatic 'crave praise' or 'seeking praise' which better reflects the underlying psychological drive.

#### 🟡 en `/test/answers`— вердикт неустойчив

- **RU**: Воспринимать его как отражение вашей личной ценности Игнорировать все мнения других людей Понимать, что это не отражает вашу ценность как личности Всегда соглашаться с чужим мнением
- **OLD**: Treat it as a direct reflection of your personal worth Ignore all other people’s opinions Understand that it does not define your worth as a person Always agree with what others think
- **NEW**: See it as a reflection of your personal worth Ignore everyone else’s opinion Understand that it does not reflect your worth as a person Always agree with the opinions of others
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Translation A is more concise and natural for a mental health app, avoiding the unnecessary word 'direct' in the first line and the slightly clunky 'what others think' in the last. Translation B's use of 'define' is a good stylistic choice, but A's overall flow is more consistent with the source's imperative tone.
  - [old/style/minor] The addition of 'direct' in the first line adds unnecessary weight; 'what others think' is less idiomatic than 'others' opinions' in this context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A feels more natural and idiomatic for a mental health context. 'Define your worth' is a much stronger and more common collocation than 'reflect your worth' in English when discussing identity.
  - [new/style/minor] The phrase 'reflect your worth' is a bit repetitive/clunky compared to 'define your worth' in the third line.
  - [new/style/minor] The last line 'agree with the opinions of others' is grammatically correct but sounds slightly more formal/stiff than the more natural 'agree with what others think'.

#### 🟡 en `/test/question`— вердикт неустойчив

- **RU**: Как правильно относиться к чужому неодобрению, согласно статье?
- **OLD**: According to the article, how should you relate to other people’s disapproval?
- **NEW**: According to the article, what is the right way to view disapproval from others?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B sounds much more natural and idiomatic for an English-speaking reader. Translation A uses 'relate to', which in this context sounds like a literal translation of 'относиться к' and is slightly awkward; 'view' or 'approach' is better for mental attitudes.
  - [old/style/minor] The phrase 'relate to other people's disapproval' is a bit clunky and feels like a calque from Russian.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B is more idiomatic and natural for a mental health context. 'Relate to' captures the psychological nuance of 'относиться к' better than the more literal 'view'.
  - [new/style/minor] 'the right way to view' sounds slightly clunky and more like a search engine query than a natural question in an article.

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Например, добрый отзыв от руководителя вы воспринимаете как весомую похвалу и чувствуете подъём. А слова поддержки от мамы, далёкой от вашей сферы, могут не дать такого же эффекта. <important>Так происходит, потому что вы сомневаетесь в истинности этих слов. О…
- **OLD**: For example, a positive review from your manager may feel like meaningful praise and give you a boost. But words of support from your mother, who is far from your field of work, may not have the same effect. <important>This happens because you doubt how true t…
- **NEW**: For instance, you might view positive feedback from a manager as significant praise and feel a boost. But words of support from a parent who is unfamiliar with your field might not have the same effect. <important>This happens because you doubt the truth of th…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 94)
  - Translation B is more idiomatic and professional. It uses better vocabulary ('hypersensitivity', 'takeaway', 'devoid of') and avoids the slightly clunky 'someone who is dependent and suddenly left without a dose' found in A. B also correctly preserves the Instagram ID from the original.
  - [old/mistranslation/major] The Instagram ID was changed from 17983946507826796 to 18090968653580040, which is a critical error for technical/content integrity.
  - [old/style/minor] The analogy of the addict is phrased somewhat awkwardly ('someone who is dependent and suddenly left without a dose').
  - [new/style/minor] The phrase 'struggling with addiction' is a slight softening of the original 'подобно зависимому', but it fits the 'understanding expert' tone better.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A is much more idiomatic and flows like a professional English article. Translation B contains several 'translationese' markers and awkward phrasing (e.g., 'a positive review from your manager' instead of 'feedback', 'someone who is dependent and suddenly left without a dose', and 'to be approved of').
  - [old/style/major] The addiction metaphor is clunky and literal ('someone who is dependent and suddenly left without a dose') compared to A's natural 'someone struggling with addiction'.
  - [old/style/minor] The phrase 'to be approved of' is grammatically correct but sounds unnatural in this context; 'receiving approval' is much better.
  - [old/terminology/minor] Using 'review' for 'отзыв' in a professional context is less common than 'feedback'.
  - [old/omission/minor] The Instagram ID was changed/incorrectly transcribed compared to the original.

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: Вы сами критикуете других? Позволяете себе не согласиться с мнением? Вероятно, да. И при этом вы не делаете категоричного вывода о человеке — вы просто видите иначе. Часто нас огорчают поступки или слова, а не «вся личность» целиком — это важное различие. <imp…
- **OLD**: Do you ever criticize others yourself? Do you allow yourself to disagree with someone’s opinion? Most likely, yes. And even then, you don’t usually make a sweeping judgment about the whole person—you just see things differently. Most often, it’s specific actio…
- **NEW**: Do you criticize others yourself? Do you allow yourself to disagree with someone’s opinion? Most likely, yes. And yet, you don’t make a sweeping judgment about the person—you simply see things differently. Often, it’s someone’s actions or words that upset us, …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A sounds more natural and idiomatic for a supportive mental health article. Translation B suffers from several 'translationese' issues, such as 'its absence means I'm guilty' (which is a clunky way to translate the Russian concept of guilt/fault) and 'internal foundation' (which is a literal calque of 'внутренняя опора').
  - [new/style/major] The phrase 'its absence means I'm guilty' is very unnatural; A's 'if there is no praise, I've done something wrong' captures the psychological nuance much better.
  - [new/style/minor] 'Internal foundation' is a literal translation of 'внутренняя опора'; 'inner sense of worth' in A is much more idiomatic in English psychology.
  - [new/style/minor] The phrasing 'overvalue their judgment' is slightly more formal/stiff than A's 'overestimating their wisdom'.
  - [old/style/minor] The use of 'as if' in the 5th paragraph is slightly awkward, though the overall flow is still superior to B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more idiomatic and flows better as a cohesive piece of psychological writing. Translation B contains several 'translationese' markers and awkward phrasing (e.g., 'as if, giving up', 'standing in for an inner sense of worth', 'test how realistic').
  - [old/style/major] The phrase 'and, as if, giving up' is very clunky and doesn't sound like a native speaker; it's a literal rendering of 'как будто'.
  - [old/style/minor] The phrase 'standing in for an inner sense of worth' is a bit wordy compared to the more natural 'replacing your internal foundation' in A.
  - [old/style/minor] The phrasing 'if there is no praise, I've done something wrong' is slightly less punchy than the more direct version in A.

#### 🟡 en `/description`— вердикт неустойчив

- **RU**: Статья показывает, как зависимость от чужого одобрения делает нас уязвимыми к мнениям окружающих и мешает формированию устойчивой самооценки. Мы разбираем, как внутренние убеждения определяют эмоции и чувство собственной значимости, и почему самоподтверждение …
- **OLD**: This article explores how dependence on other people’s approval makes us vulnerable to their opinions and gets in the way of stable self-esteem. We look at how underlying beliefs shape emotions and your sense of self-worth, and why self-validation matters more…
- **NEW**: This article explores how depending on external approval makes us vulnerable to others’ opinions and hinders the development of stable self-esteem. We examine how core beliefs shape our emotions and sense of self-worth, and why self-validation is more importan…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A sounds more natural and engaging for a reader, using smoother phrasing like 'gets in the way of' and 'you'll find', whereas B feels slightly more academic and stiff. A also correctly handles the shift to 'you' in the final sentence, making it more supportive.
  - [new/style/minor] The phrasing 'hinders the development of' and 'we offer steps' is a bit more formal/academic than the desired 'understanding friend' tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more professional and uses precise CBT terminology ('core beliefs'). Translation B is slightly more colloquial and uses 'underlying beliefs', which is less standard in this context.
  - [old/terminology/minor] used 'underlying beliefs' instead of the canonical 'core beliefs'
  - [old/style/minor] the phrase 'gets in the way of stable self-esteem' is slightly less polished than 'hinders the development of'

