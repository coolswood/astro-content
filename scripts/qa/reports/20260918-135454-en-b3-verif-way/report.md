# QA: слепое парное сравнение переводов — en-b3-verif-way

- **Дата**: 2026-09-18T10:54:54.733Z
- **Метка**: en-b3-verif-way
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD~1
- **Файлы**: story/distortions/way.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 7
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: a4b1791ebbc7f608e45e9add25437bef463f001c

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/way.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 4 | 🟢 2 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |
| **итого** | 4 | 🟢 2 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×4; OLD — style/minor×3, terminology/major×1, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Учитесь зависеть только от собственного одобрения. Ключ к эмоциональному выздоровлению — знание, что на ваше настроение могут повлиять только ваши собственные мысли. Отказавшись от зависимости от чужой похвалы, попробуйте оказывать себе поддержку сами. Для это…
- **OLD**: Learn to rely first of all on your own approval. The key to emotional recovery is knowing that only your own thoughts can shape your mood. When you stop depending on other people’s praise, you can start offering support to yourself. To do this, keep a list of …
- **NEW**: Learn to rely only on your own approval. The key to mental well-being is knowing that the way we interpret situations can strongly influence how we feel. Instead of relying on praise from others, try to support yourself. To do this, keep a list of your achieve…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B follows the CBT-specific guidelines much better, using 'mental well-being' and the recommended phrasing for causality. It also uses 'journal' instead of 'notebook', which is the project standard.
  - [old/terminology/major] Used 'emotional recovery' instead of 'mental well-being' and 'notebook' instead of 'journal'.
  - [old/style/minor] The phrasing 'only your own thoughts can shape your mood' is a bit too direct/deterministic, violating the CBT causality guideline.
  - [new/style/minor] The sentence about the red light is slightly wordy compared to the original, but remains natural.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A follows the CBT-specific guidelines perfectly, especially regarding the softening of causality ('the way we interpret situations can strongly influence how we feel') and the use of 'mental well-being'. Translation B uses 'emotional recovery', which sounds slightly more clinical/dramatic than the original, and fails to apply the recommended softening of the relationship between thoughts and mood.
  - [old/terminology/minor] Used 'emotional recovery' instead of the more natural 'mental well-being' or a softer phrasing.
  - [old/style/major] Violates the CBT causality rule: 'only your own thoughts can shape your mood' is too deterministic/absolute; A's version is much more professional and accurate to the CBT model.
  - [old/addition/minor] Added 'first of all' in the first sentence, which isn't in the original.

#### 🟡 en `/description`— вердикт неустойчив

- **RU**: Этот текст рассматривает пути освобождения от зависимости от одобрения окружающих. Основные шаги включают анализ преимуществ и недостатков текущих убеждений, переписывание негативных установок на более реалистичные и полезные, а также развитие привычки к самоо…
- **OLD**: This text explores how to free yourself from relying on other people’s approval. The main steps include weighing the pros and cons of your current beliefs, rewriting unhelpful assumptions into more realistic and supportive ones, and building the habit of self-…
- **NEW**: This text explores ways to break free from the need for external approval. Key steps include analyzing the pros and cons of your current beliefs, reframing unhelpful attitudes into more realistic and helpful ones, and developing a habit of self-approval. By fo…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A sounds more natural and flows better for a reader, using 'relying on other people’s approval' and 'supportive ones' which feel warmer and less clinical. Translation B is grammatically correct but slightly more formal and repetitive ('helpful... helpful').
  - [new/style/minor] Repetitive use of 'helpful' in the second sentence and a slightly more rigid, academic tone ('ways to break free from the need for external approval').
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and professional, using 'break free from the need for external approval' and 'reframing', which sounds much more natural in a mental health context than B's 'relying on other people's approval' or 'rewriting'.
  - [old/style/minor] 'rewriting unhelpful assumptions' is slightly less professional than 'reframing' in CBT contexts; 'relying on other people's approval' is a bit wordy compared to 'external approval'.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Первый и очень важный шаг на пути к изменению деструктивных убеждений — это анализ их преимуществ и недостатков. Подумайте о своих убеждениях относительно зависимости от одобрения и запишите их. Они могут быть сформулированы по-разному, но отражают ваше стремл…
- **OLD**: The first and very important step toward changing destructive beliefs is to look at their advantages and disadvantages. Think about your beliefs around needing other people’s approval and write them down. They may be worded in different ways, but they all refl…
- **NEW**: The first and most important step in changing unhelpful beliefs is to analyze their pros and cons. Think about your beliefs regarding the need for approval and write them down. They may be phrased differently, but they reflect your desire for approval from oth…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation B follows the project's specific CBT terminology (using 'unhelpful beliefs' instead of 'destructive' and 'well-being' instead of 'state') and uses more natural, idiomatic English ('pros and cons', 'accommodating', 'reframe'). Translation A feels slightly more like a literal translation from Russian.
  - [old/terminology/minor] Used 'destructive beliefs' instead of the preferred 'unhelpful beliefs'.
  - [old/style/minor] 'affects your state' is a bit clunky; 'well-being' is more natural for this context.
  - [old/style/minor] 'convenient for others' is a literal translation of 'удобный'; 'accommodating' is the correct idiomatic way to describe this personality trait in English.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A follows the CBT terminology guidelines perfectly (using 'unhelpful beliefs' instead of 'destructive') and uses much more natural, idiomatic English. Translation B contains several 'translationese' markers and awkward phrasing.
  - [old/terminology/major] Used 'destructive beliefs' instead of the project-standard 'unhelpful beliefs'.
  - [old/style/major] 'convenient for others' is a literal translation of 'удобным для других' and sounds very unnatural in English; 'accommodating' in A is the correct idiomatic choice.
  - [old/style/minor] 'blond hair to dark hair' is clunky compared to the natural 'blondes over brunettes'.
  - [old/style/minor] 'affects your state' is a bit vague/literal; 'affects your well-being' in A is much better for a mental health context.

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: Подумайте, почему бояться неодобрения нерационально. Составьте свой личный список причин, почему неодобрение — это неприятно, но не смертельно. Аргументы должны быть жизненными, понятными, чтобы вы в них совсем не сомневались. Не вводите себя в заблуждение! На…
- **OLD**: Think about why it is irrational to be afraid of disapproval. Create your own list of reasons why disapproval is unpleasant, but not disastrous. Your arguments should be grounded and convincing so that you don’t doubt them. Don’t mislead yourself. For example,…
- **NEW**: Think about why fearing disapproval is irrational. Create your own list of reasons why disapproval is unpleasant but not fatal. Your arguments should be grounded in real life and easy to understand so that you truly believe them. Don't mislead yourself! For ex…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and flows better as a cohesive piece of psychological guidance. It avoids the slightly clunky phrasing of B (e.g., 'blacklisting' in quotes feels a bit literal/forced compared to A's more natural 'writing someone off'). A also handles the 'not fatal/not disastrous' nuance more elegantly for a mental health context.
  - [new/style/minor] The phrase 'blacklisting the person' is a bit of a literal translation of the Russian metaphor; 'writing someone off' in A is much more natural English.
  - [new/style/minor] The sentence 'Don't dwell on it' for 'Хватит предаваться унынию' is a bit weak; it loses the emotional weight of the original despair/despondency.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is much more idiomatic and follows the UX/tone guidelines perfectly. It uses natural phrasing like 'won't work' and 'blacklisting', whereas B feels slightly more translated and clunky (e.g., 'writing someone off as a bad person' is a weak rendering of the original metaphor). A also correctly uses 'cognitive distortion', which is the canonical term.
  - [old/style/minor] The phrase 'writing someone off as a bad person' is a bit wordy and loses the punch of the original 'blacklisting' metaphor.
  - [old/style/minor] The phrasing 'contains a distortion' is slightly less natural than 'is a cognitive distortion'.
  - [old/style/minor] The translation of 'не стоит огорчаться' as 'I shouldn't be upset' is fine, but B's overall rhythm is slightly more formal/stiff than the 'understanding friend' tone required.

