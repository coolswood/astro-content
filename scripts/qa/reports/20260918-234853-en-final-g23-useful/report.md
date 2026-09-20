# QA: слепое парное сравнение переводов — en-final-g23-useful

- **Дата**: 2026-09-18T20:48:53.926Z
- **Метка**: en-final-g23-useful
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/useful.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/useful.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 5 | 🟢 3 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |
| **итого** | 5 | 🟢 3 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/major×1; OLD — style/minor×7, terminology/minor×3, terminology/major×1

### Детали пар (для спот-чека)

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: Говоря о «пользе» иррациональных убеждений, всё сложнее, чем кажется на первый взгляд — давайте разберёмся. Иногда может показаться, что такие убеждения подталкивают к достижениям; однако это скорее распространённое заблуждение, чем реальность. Для ясности всп…
- **OLD**: When we talk about the “benefit” of irrational beliefs, things are more complicated than they seem at first glance — let’s unpack this. Sometimes it looks as if these beliefs push us toward achievements; however, this is more of a common illusion than reality.…
- **NEW**: When it comes to the “usefulness” of unhelpful beliefs, things are more complex than they appear at first glance — let’s dive in. It might sometimes seem like these beliefs drive achievement, but this is more of a common misconception than a reality. To clarif…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is much more idiomatic and follows the project's terminology guidelines perfectly. It uses 'unhelpful beliefs' instead of the literal 'irrational beliefs' (which is less aligned with the project's soft tone) and correctly uses 'unhelpful' to describe the belief's effect. Translation B uses 'destructive', which is a bit heavy, and 'illusion', which is less natural than 'misconception'.
  - [old/terminology/minor] Uses 'irrational beliefs' instead of the preferred 'unhelpful beliefs' context; uses 'destructive' instead of 'unhelpful'.
  - [old/style/minor] The phrase 'push us toward achievements' is slightly clunky compared to 'drive achievement'.
  - [old/style/minor] The quote translation is a bit more literal and less fluid than A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A is more faithful to the original text's structure and terminology. Translation B makes a significant terminology error by replacing 'irrational beliefs' with 'unhelpful beliefs' in the very first sentence, which changes the clinical nuance of the opening. A also handles the quote more naturally.
  - [new/terminology/major] Used 'unhelpful beliefs' instead of 'irrational beliefs' in the opening; while 'unhelpful' is used for 'деструктивные' later, the opening specifically refers to the concept of irrationality.
  - [new/style/minor] The phrase 'increase purpose' is a bit clunky compared to 'leads to determination'.
  - [old/omission/minor] The Tolstoy quote was omitted entirely, though it was present in the source.

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Коротко: копинг-стратегия — это способ реагировать на стресс через мысли, чувства или поведение. <important>Проще говоря, Джон стремится быть успешным (промежуточное убеждение), чтобы не чувствовать себя «неспособным» (глубинное убеждение). Фокус на работе ста…
- **OLD**: In short, a coping strategy is a way of responding to stress through thoughts, feelings, or behavior. In simple terms, John strives to be successful (an intermediate belief) so that he doesn’t have to feel “incapable” (his core belief). Focusing on work become…
- **NEW**: In short: a coping strategy is a way of responding to stress through your thoughts, feelings, or behavior. <important>To put it simply, John strives to be successful (an intermediate belief) so that he doesn’t have to feel “incapable” (a core belief). Focusing…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more natural and follows all the stylistic guidelines, especially regarding the 'warm expert' tone and the use of contractions. Translation B feels slightly more formal and clunky in places (e.g., 'being fired' vs 'job loss', 'inner apocalypse' vs 'internal apocalypse').
  - [old/style/minor] The tone is a bit too stiff for a supportive app; lacks the natural use of contractions (It is vs It's).
  - [old/terminology/minor] Used 'destructive' instead of the preferred 'unhelpful' for beliefs/strategies, though 'destructive' is acceptable in a general sense.
  - [old/style/minor] 'being fired' is a bit blunt/harsh compared to the more professional 'job loss'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation B follows the project's specific terminology and tone guidelines much more closely, particularly regarding 'unhelpful' instead of 'destructive' and 'mental well-being' instead of 'decline in mood'. It also correctly introduces the CBT acronym.
  - [old/terminology/minor] Used 'destructive' instead of the preferred 'unhelpful' for beliefs/strategies; used 'decline in mood' instead of 'mental well-being'.
  - [old/omission/minor] Did not introduce the 'CBT' acronym upon first mention of cognitive-behavioral therapy.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: В предыдущих главах мы уделяли много внимания деструктивным мыслям и убеждениям. Это закономерно: именно они заметно ухудшают эмоции, поведение и общее самочувствие. Отсюда возникает вопрос: действительно ли все убеждения вредны, могут ли какие-то из них прино…
- **OLD**: In previous chapters we talked a lot about destructive thoughts and beliefs. And for good reason: they significantly worsen our emotions, behavior, and overall well-being. This raises a question: are all beliefs really harmful, or can some of them actually be …
- **NEW**: In previous chapters, we’ve focused heavily on unhelpful thoughts and beliefs. This makes sense: they are the ones that significantly impact your emotions, behavior, and overall well-being. This raises a question: are all beliefs harmful, or can some of them a…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A follows the project's terminology guidelines perfectly (using 'unhelpful' instead of 'destructive' or 'negative') and maintains a much more natural, professional flow. Translation B uses 'destructive' and 'negative', which are less aligned with the preferred 'unhelpful' tone, and its phrasing is slightly more clunky.
  - [old/terminology/minor] Uses 'destructive' and 'negative' instead of the preferred 'unhelpful' for beliefs.
  - [old/style/minor] Phrasing like 'during low mood' is slightly unidiomatic compared to 'low moods' or 'feeling low'.
  - [old/style/minor] The phrase 'when we have more inner resources' is a bit of a calque from the Russian 'в более ресурсном состоянии'; 'feeling more resilient' in A is much more natural for a native speaker.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B follows the project's terminology guidelines perfectly, using 'unhelpful' instead of 'destructive'. It also sounds more natural and professional for a mental health context, using 'resilient' and 'helpful' effectively.
  - [old/terminology/minor] Used 'destructive' instead of the preferred 'unhelpful' for beliefs.
  - [old/style/minor] The phrasing 'during low mood' is slightly less idiomatic than 'low moods' or 'feeling low' in this context.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: Статья рассматривает влияние иррациональных убеждений на психоэмоциональное состояние. На примере Джона, который стремится к успеху из-за глубинной уверенности в собственной несостоятельности, показано, как такие убеждения превращаются в деструктивные копинг-с…
- **OLD**: This article looks at how irrational beliefs affect our emotional state. Using the example of John, who strives for success because of a deep conviction of his own inadequacy, it shows how such beliefs turn into destructive coping strategies. The author emphas…
- **NEW**: This article explores how unhelpful beliefs affect your mental well-being. Using the example of John, who strives for success due to a core belief of inadequacy, we see how such beliefs can turn into unhelpful coping strategies. The author emphasizes the impor…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B follows the project's specific terminology (unhelpful beliefs, mental well-being) and uses a more natural, engaging tone. Translation A uses 'irrational beliefs' and 'emotional state', which are more academic/literal and less aligned with the 'understanding friend' tone and the provided glossary.
  - [old/terminology/major] Used 'irrational beliefs' instead of 'unhelpful beliefs' and 'emotional state' instead of 'mental well-being'.
  - [old/style/minor] The phrasing 'it shows how' is a bit clunky compared to the more active 'we see how' in B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A follows all CBT terminology guidelines (unhelpful beliefs, core belief, mental well-being) and uses a natural, engaging tone. Translation B uses outdated/non-standard terms like 'irrational beliefs' and 'destructive coping strategies', and its phrasing is clunky and academic.
  - [old/terminology/major] Used 'irrational beliefs' instead of 'unhelpful beliefs' and 'destructive' instead of 'unhelpful' as per project guidelines.
  - [old/terminology/major] Used 'emotional state' instead of 'mental well-being'.
  - [old/style/minor] The construction 'it shows how' is a bit weak/clunky compared to the active 'we see how' or direct phrasing.

#### 🟡 en `/title`— вердикт неустойчив

- **RU**: Могут ли иррациональные убеждения быть полезны?
- **OLD**: Can Irrational Beliefs Ever Be Helpful?
- **NEW**: Can unhelpful beliefs actually be useful?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A correctly captures the tone and structure of the original question. Translation B uses 'unhelpful beliefs' which, while part of our glossary for 'unhelpful/adaptive', creates a logical redundancy/clash with 'useful' in this specific sentence structure, making it sound awkward.
  - [new/style/major] The phrasing 'unhelpful beliefs actually be useful' is semantically clunky and repetitive; it lacks the punch of the original question.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A follows the project's specific terminology guidelines by using 'unhelpful beliefs' instead of the outdated/non-standard 'irrational beliefs'. It also correctly uses sentence case for a question.
  - [old/terminology/major] Uses 'Irrational Beliefs' instead of the required 'unhelpful beliefs'
  - [old/style/minor] Uses Title Case for a question, which is less common for article headers in this UX style compared to sentence case

