# QA: слепое парное сравнение переводов — en-content-verif-distortions-key

- **Дата**: 2026-09-18T05:35:02.248Z
- **Метка**: en-content-verif-distortions-key
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/key.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 11
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 431bd08c6c487840271a919950ac699dadad71e1

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/key.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 5 | 🟢 4 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | 100% |
| **итого** | 5 | 🟢 4 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — —; OLD — terminology/major×6, style/minor×5, omission/major×1, omission/minor×1, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟢 en `/title` — NEW лучше (2:0)

- **RU**: Ключ к счастью: преодоление деструктивных убеждений
- **OLD**: The Key to Happiness: Overcoming Destructive Beliefs
- **NEW**: The Key to Happiness: Overcoming Unhelpful Beliefs
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 100)
  - Translation B uses the project-specific term 'unhelpful beliefs' as required by the glossary, whereas Translation A uses 'destructive,' which is not the approved terminology.
  - [old/terminology/major] Used 'destructive beliefs' instead of the mandatory 'unhelpful beliefs'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Translation A follows the project's specific terminology guidelines, using 'unhelpful beliefs' instead of the literal 'destructive beliefs'.
  - [old/terminology/minor] Uses 'destructive beliefs' instead of the approved 'unhelpful beliefs' for a softer, non-judgmental tone.

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Настоящие изменения включают несколько важных компонентов: <li>Осознание причин эмоциональных трудностей и своей роли в формировании реакции на события.</li> <li>Понимание и работа с деструктивными убеждениями и автоматическими мыслями.</li> <li>Развитие увере…
- **OLD**: Real change involves several important components: <li>Recognizing the reasons behind emotional difficulties and your own role in shaping your reactions to events.</li> <li>Understanding and working with destructive beliefs and automatic thoughts.</li> <li>Dev…
- **NEW**: Real change involves several important components: <li>Recognizing the causes of emotional difficulties and your role in how you respond to events.</li> <li>Understanding and working through unhelpful beliefs and automatic thoughts.</li> <li>Developing self-co…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B follows the project's specific CBT terminology (unhelpful beliefs, core beliefs) and uses more natural, sophisticated English for the examples (accommodating, incompetent, unlovable).
  - [old/terminology/major] Used 'destructive beliefs' instead of the required 'unhelpful beliefs'.
  - [old/terminology/major] Used 'deep-rooted issues' instead of 'core beliefs' (глубинные причины/убеждения).
  - [old/style/minor] 'easy to deal with' is a bit colloquial/clunky for the 'удобным' concept in this context; 'accommodating' in B is better.
  - [old/style/minor] 'it means I am incapable' is slightly less idiomatic than 'I am incompetent' or 'I am unlovable' in a psychological context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A follows the project's terminology guidelines perfectly, specifically using 'unhelpful beliefs' instead of the non-standard 'destructive beliefs'. It also captures the nuance of the quote more naturally and handles the examples with better idiomatic flow.
  - [old/terminology/major] Used 'destructive beliefs' instead of the required 'unhelpful beliefs'.
  - [old/style/minor] 'Easy to deal with' is a bit too colloquial/informal for the 'accommodating' nuance in the original.
  - [old/style/minor] 'Deep-rooted issues' is a slight departure from the original focus on 'core reasons' (core beliefs context).
  - [old/omission/minor] Missed the 'huge contribution' nuance in the final paragraph, simplifying it too much.

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: Наша цель — помочь вам разобраться в своих глубинных убеждениях, понять, в какие моменты вы особенно уязвимы, и научиться работать с этими установками, чтобы поддерживать эмоциональную устойчивость. Осознание убеждений позволяет увидеть, почему определённые си…
- **OLD**: Our goal is to help you explore your core beliefs, understand when you are especially vulnerable, and learn how to work with these patterns so you can maintain emotional resilience. Becoming aware of your beliefs makes it easier to see why certain situations t…
- **NEW**: Our goal is to help you understand your core beliefs, identify when you are particularly vulnerable, and learn to work with these patterns to maintain emotional resilience. Recognizing your beliefs allows you to see why certain situations trigger painful emoti…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is superior because it adheres to the project's specific terminology (using 'Unhelpful Beliefs Scale' instead of the outdated 'Dysfunctional Attitude Scale') and maintains better consistency with the glossary. It also correctly preserves the Instagram ID from the original, whereas B changed it.
  - [old/terminology/major] Used 'Dysfunctional Attitude Scale' instead of the project-mandated 'Unhelpful Beliefs Scale' (and 'dysfunctional' is explicitly discouraged in the glossary).
  - [old/omission/major] The Instagram ID was changed/incorrectly copied.
  - [old/style/minor] Used 'emotional well-being' instead of the preferred 'mental well-being' for the final conclusion.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A is more professional and follows the established CBT terminology for the specific scale mentioned. Translation B uses 'Unhelpful Beliefs Scale', which is a literal translation of the Russian text but is not the correct name of the clinical instrument (Dysfunctional Attitude Scale).
  - [new/terminology/major] The scale name is incorrectly translated; 'Dysfunctional Attitude Scale' is the standard clinical term for Weissman's tool.
  - [new/omission/minor] The Instagram tag IDs were partially lost/changed compared to the original.
  - [new/style/minor] The phrasing 'influence a person' is slightly more detached/clinical than the smoother 'continue to exert an influence' or 'continue to affect us'.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Когнитивно-поведенческая терапия показывает, что на пути к счастливой жизни часто стоят деструктивные убеждения — мысли и правила, в которые мы верим, иногда даже не осознавая этого. С ними сталкивается каждый человек в разные периоды жизни. Они могут усиливат…
- **OLD**: Cognitive Behavioral Therapy shows that, on the path to a happier life, we are often blocked by destructive beliefs—thoughts and rules we buy into, sometimes without even realizing it. Everyone encounters them at different points in life. They can intensify an…
- **NEW**: Cognitive behavioral therapy (CBT) shows that unhelpful beliefs—thoughts and rules we hold to be true, often without even realizing it—can stand in the way of a fulfilling life. Everyone encounters them at different stages of life. They can intensify anxiety a…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation B follows the project's terminology guidelines perfectly (using 'unhelpful beliefs' instead of 'destructive') and introduces the 'CBT' acronym upon first mention. It also feels more natural and idiomatic for a mental health context.
  - [old/terminology/major] Used 'destructive beliefs' instead of the required 'unhelpful beliefs'.
  - [old/omission/minor] Failed to introduce the 'CBT' acronym on first mention.
  - [old/style/minor] The phrase 'thoughts and rules we buy into' is a bit too informal/slangy for this context compared to 'hold to be true'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A follows all CBT terminology guidelines (using 'unhelpful beliefs' instead of 'destructive') and maintains a much more natural, professional, and empathetic tone. Translation B uses 'destructive beliefs' (against guidelines) and contains awkward phrasing like 'thoughts we buy into' and 'various anxiety disorders' which feels repetitive and unidiomatic.
  - [old/terminology/major] Used 'destructive beliefs' instead of the required 'unhelpful beliefs'.
  - [old/style/minor] 'thoughts we buy into' is too colloquial for this context; 'on the path to a happier life' is a bit cliché compared to 'fulfilling life'.
  - [old/style/minor] 'various anxiety disorders' is redundant after mentioning anxiety earlier in the sentence.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: Статья объясняет, как деструктивные убеждения влияют на наше восприятие себя и мира и мешают жить полноценно. Опираясь на принципы когнитивно-поведенческой терапии, мы рассматриваем разницу между временным облегчением и настоящими изменениями, которые происход…
- **OLD**: This article explains how destructive beliefs shape the way we see ourselves and the world, and how they get in the way of a fulfilling life. Drawing on the principles of Cognitive Behavioral Therapy (CBT), it explores the difference between temporary relief a…
- **NEW**: This article explains how unhelpful beliefs affect how we perceive ourselves and the world, preventing us from living fully. Based on the principles of cognitive behavioral therapy (CBT), we explore the difference between temporary relief and the real changes …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B follows the project's specific terminology guidelines (unhelpful beliefs, mental well-being) and uses more natural CBT-appropriate verbs like 'reframe'. Translation A uses 'destructive' and 'dysfunctional', which are less aligned with the requested 'unhelpful' tone and specific glossary terms.
  - [old/terminology/major] Used 'destructive beliefs' instead of 'unhelpful beliefs' and 'Dysfunctional Attitude Scale' instead of the project's preferred 'unhelpful' terminology.
  - [old/terminology/minor] Used 'emotional well-being' instead of 'mental well-being'.
  - [old/style/minor] Used 'rethink' instead of the more professional 'reframe'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A follows all glossary requirements, specifically using 'unhelpful beliefs' instead of the outdated/incorrect 'destructive' or 'dysfunctional' and 'mental well-being' instead of 'emotional well-being'. It also correctly handles the CBT terminology and tone.
  - [old/terminology/major] Used 'destructive beliefs' instead of 'unhelpful beliefs' and 'Dysfunctional Attitude Scale' instead of the project-specific 'Unhelpful Beliefs Scale' (or at least failed to align with the 'unhelpful' preference).
  - [old/terminology/minor] Used 'emotional well-being' instead of 'mental well-being'.
  - [old/style/minor] The phrasing 'how they get in the way of a fulfilling life' is slightly more wordy/clunky compared to A's 'preventing us from living fully'.

