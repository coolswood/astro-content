# QA: слепое парное сравнение переводов — en-b3-way

- **Дата**: 2026-09-18T10:40:37.267Z
- **Метка**: en-b3-way
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/way.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 8b5b94950329db2cb35cf00c251ee0fc00dc888f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/way.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 5 | 🟢 3 | 🔴 1 | ⚪ 0 | 🟡 1 | 0 / 0 | 75% |
| **итого** | 5 | 🟢 3 | 🔴 1 | ⚪ 0 | 🟡 1 | 0 / 0 | 75% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×4; OLD — style/minor×4, terminology/minor×2, terminology/major×1

### Детали пар (для спот-чека)

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Подумайте, почему бояться неодобрения нерационально. Составьте свой личный список причин, почему неодобрение — это неприятно, но не смертельно. Аргументы должны быть жизненными, понятными, чтобы вы в них совсем не сомневались. Не вводите себя в заблуждение! На…
- **OLD**: Think about why it is irrational to be afraid of disapproval. Create your own list of reasons why disapproval is unpleasant, but not disastrous. Your arguments should be grounded and convincing so that you don’t doubt them. Don’t mislead yourself. For example,…
- **NEW**: Think about why fearing disapproval is irrational. Create your own list of reasons why disapproval is unpleasant but not fatal. Your arguments should be grounded in real life and easy to understand so that you truly believe them. Don't mislead yourself! For ex…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and aligns better with the requested 'understanding expert' tone. It correctly uses the term 'cognitive distortion' and handles the nuances of the list items with better flow and natural phrasing.
  - [old/style/minor] The phrase 'writing someone off as a bad person' is a bit wordy compared to the more punchy 'blacklisting' in B, which captures the original 'заносите в черный список' better.
  - [old/terminology/minor] Used 'distortion' instead of 'cognitive distortion', which is the standard CBT term.
  - [new/style/minor] The phrase 'not fatal' is a bit literal for 'не смертельно', though acceptable in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is much more idiomatic and follows the UX/tone guidelines perfectly. It uses natural phrasing (e.g., 'not fatal', 'on the contrary', 'don't dwell on it') whereas B feels slightly more translated and clunky (e.g., 'not disastrous', 'sink into despair'). A also correctly uses the term 'cognitive distortion' which is more professional for CBT content than B's 'contains a distortion'.
  - [old/style/minor] Phrasing like 'not disastrous' and 'sink into despair' is a bit heavy/dramatic compared to the natural flow of A.
  - [old/terminology/minor] Used 'contains a distortion' instead of the more standard 'is a cognitive distortion'.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Первый и очень важный шаг на пути к изменению деструктивных убеждений — это анализ их преимуществ и недостатков. Подумайте о своих убеждениях относительно зависимости от одобрения и запишите их. Они могут быть сформулированы по-разному, но отражают ваше стремл…
- **OLD**: The first and very important step toward changing destructive beliefs is to look at their advantages and disadvantages. Think about your beliefs around needing other people’s approval and write them down. They may be worded in different ways, but they all refl…
- **NEW**: The first and most important step in changing unhelpful beliefs is to analyze their pros and cons. Think about your beliefs regarding the need for approval and write them down. They may be phrased differently, but they reflect your desire for approval from oth…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation B follows the project's specific CBT terminology (using 'unhelpful beliefs' instead of 'destructive' and 'well-being' instead of 'state') and uses more natural, idiomatic English ('pros and cons', 'accommodating', 'reframe'). Translation A feels slightly more like a literal translation from Russian.
  - [old/terminology/minor] Used 'destructive beliefs' instead of the preferred 'unhelpful beliefs'.
  - [old/style/minor] The phrase 'affects your state' is a bit clunky; 'well-being' is more natural for this context.
  - [old/style/minor] The phrase 'good and convenient for others' is a literal translation of 'хорошим и удобным'; 'good and accommodating' (as in B) is the idiomatic way to express this in English.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A follows the CBT terminology guidelines perfectly (using 'unhelpful beliefs' instead of 'destructive') and uses much more natural, idiomatic English. Translation B contains several 'translationese' markers and awkward phrasing.
  - [old/terminology/major] Used 'destructive beliefs' instead of the project-standard 'unhelpful beliefs'.
  - [old/style/major] Phrases like 'be good and convenient for others' and 'affects your state' are literal calques from Russian and sound unnatural in English.
  - [old/style/minor] The comparison 'blond hair to dark hair' is less idiomatic than 'blondes over brunettes'.
  - [old/style/minor] Used 'rewrite' instead of the more professional psychological term 'reframe'.

#### 🔴 en `/title` — OLD лучше (2:0)

- **RU**: Путь к здоровой самооценке
- **OLD**: The Path to Healthy Self-Esteem
- **NEW**: The path to healthy self-esteem
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - The original is a title. In English, titles follow Title Case conventions, making A the correct choice for a heading. B uses sentence case, which is less standard for a standalone title of this nature.
  - [new/style/minor] Uses sentence case for a title, which is less conventional for a main heading than Title Case.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Since this is a title/heading, Title Case (B) is more appropriate and standard for the English market, whereas sentence case (A) is typically reserved for UI labels or body text.
  - [new/style/minor] Uses sentence case for a title, which is less common for article or section headings in this context.

#### 🟡 en `/description`— вердикт неустойчив

- **RU**: Этот текст рассматривает пути освобождения от зависимости от одобрения окружающих. Основные шаги включают анализ преимуществ и недостатков текущих убеждений, переписывание негативных установок на более реалистичные и полезные, а также развитие привычки к самоо…
- **OLD**: This text explores how to free yourself from relying on other people’s approval. The main steps include weighing the pros and cons of your current beliefs, rewriting unhelpful assumptions into more realistic and supportive ones, and building the habit of self-…
- **NEW**: This text explores ways to break free from the need for external approval. Key steps include analyzing the pros and cons of your current beliefs, reframing unhelpful attitudes into more realistic and helpful ones, and developing a habit of self-approval. By fo…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A sounds more natural and flows better for a reader, using 'relying on other people's approval' instead of the slightly more clinical 'need for external approval'. It also uses 'supportive' which fits the warm, expert tone better than the repetitive 'helpful' in B.
  - [new/style/minor] The phrasing 'need for external approval' is a bit more formal/clinical than the warm tone requested; 'reframing... into more realistic and helpful ones' is slightly repetitive due to the use of 'helpful' twice in one sentence.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and professional, using 'break free from the need for external approval' and 'reframing', which sounds much more natural in a mental health context than B's 'relying on other people's approval' or 'rewriting'.
  - [old/style/minor] 'Rewriting unhelpful assumptions' is a bit clunky compared to the standard psychological term 'reframing'.
  - [old/style/minor] 'Relying on other people's approval' is grammatically correct but less sophisticated than 'the need for external approval'.

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Учитесь зависеть только от собственного одобрения. Ключ к эмоциональному выздоровлению — знание, что на ваше настроение могут повлиять только ваши собственные мысли. Отказавшись от зависимости от чужой похвалы, попробуйте оказывать себе поддержку сами. Для это…
- **OLD**: Learn to rely first of all on your own approval. The key to emotional recovery is knowing that only your own thoughts can shape your mood. When you stop depending on other people’s praise, you can start offering support to yourself. To do this, keep a list of …
- **NEW**: Learn to rely only on your own approval. The key to mental well-being is knowing that the way we interpret situations can strongly influence how we feel. Instead of relying on praise from others, try to support yourself. To do this, keep a list of your achieve…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B follows the CBT-specific guidelines much better, using 'mental well-being' and the recommended phrasing for causality. It also uses 'journal' instead of 'notebook', which aligns with the project glossary.
  - [old/terminology/major] Used 'emotional recovery' instead of 'mental well-being' and 'notebook' instead of 'journal'.
  - [old/style/minor] The phrasing 'only your own thoughts can shape your mood' is a bit too direct/deterministic, violating the CBT causality rule.
  - [new/style/minor] The sentence 'Or maybe you simply didn't cross on a red light just because everyone else did' is slightly wordy compared to the original, but remains natural.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A follows the CBT-specific instructions regarding causality and tone much better. It uses the recommended 'the way we interpret situations can strongly influence how we feel' instead of the more direct and potentially inaccurate 'only your own thoughts can shape your mood' found in B. A also uses 'mental well-being' which is the preferred term over B's 'emotional recovery'.
  - [old/terminology/minor] Used 'emotional recovery' instead of the preferred 'mental well-being' or similar.
  - [old/mistranslation/major] Violates the CBT causality rule by stating thoughts 'shape' mood directly, whereas A correctly uses the 'influence' nuance.
  - [old/style/minor] The phrase 'rely first of all' is a bit clunky compared to A's cleaner opening.

