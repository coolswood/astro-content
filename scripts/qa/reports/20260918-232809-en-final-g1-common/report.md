# QA: слепое парное сравнение переводов — en-final-g1-common

- **Дата**: 2026-09-18T20:28:09.726Z
- **Метка**: en-final-g1-common
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: common.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## common.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 13 | 🟢 7 | 🔴 1 | ⚪ 0 | 🟡 5 | 0 / 0 | 88% |
| **итого** | 13 | 🟢 7 | 🔴 1 | ⚪ 0 | 🟡 5 | 0 / 0 | 88% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×2, addition/minor×1, style/major×1; OLD — style/minor×7, terminology/major×1, addition/minor×1, omission/minor×1, omission/major×1

### Детали пар (для спот-чека)

#### 🟢 en `/response` — NEW лучше (2:0)

- **RU**: Альтернативный ответ
- **OLD**: Alternative Response
- **NEW**: Adaptive response
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 70 / NEW 100)
  - The translation must follow the project's specific CBT terminology glossary, where 'Альтернативный ответ' is strictly mapped to 'Adaptive response'.
  - [old/terminology/major] Used 'Alternative Response' instead of the required term 'Adaptive response'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - Translation A uses the mandatory CBT term 'adaptive response' as specified in the glossary, whereas Translation B uses a literal, non-clinical translation.
  - [old/terminology/major] Used 'Alternative' instead of the required 'Adaptive' for CBT terminology

#### 🟢 en `/emails.call-back.app.subtitle` — NEW лучше (2:0)

- **RU**: Доступно в App Store и Google Play
- **OLD**: Download the app from the AppStore or Google Play
- **NEW**: Available on the App Store and Google Play
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 100)
  - Translation B is a direct, natural, and standard way to express availability in English. Translation A adds an unnecessary imperative ('Download the app from') which wasn't in the original and changes the tone from a statement of fact to a call to action.
  - [old/addition/minor] Added 'Download the app from', which changes the original's informative tone to a command.
  - [old/style/minor] App Store should be two words per brand guidelines.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Translation A is a direct, standard, and concise way to express availability in app marketing. Translation B adds unnecessary words ('Download the app from') and changes the meaning from a statement of availability to a call to action.
  - [old/addition/minor] Added 'Download the app from' which wasn't in the original
  - [old/style/minor] Used 'or' instead of 'and', and 'AppStore' as one word (standard is 'App Store')

#### 🟡 en `/automatic`— вердикт неустойчив

- **RU**: Автоматическая мысль
- **OLD**: Automatic Thought
- **NEW**: Automatic thought
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - According to the project's UI guidelines, sentence case should be used for labels and items (only the first word capitalized), making 'Automatic thought' the correct choice. Translation B uses Title Case, which is typically reserved for article titles, not UI elements.
  - [old/style/minor] Uses Title Case instead of the required sentence case for UI strings
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - In the context of a UI element or a section title, Title Case (A) is the standard for English-speaking markets, whereas sentence case (B) is less common for standalone headings.
  - [new/style/minor] Uses sentence case for a heading/title, which is less conventional for a standalone UI label in this context.

#### 🟢 en `/emails.call-back.title` — NEW лучше (2:0)

- **RU**: Новая версия MindHealth уже здесь!
- **OLD**: The new MindHealth is here!
- **NEW**: A new version of MindHealth is here!
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - Translation B is more accurate to the original text. Translation A omits the word 'version' and sounds slightly unnatural, as if the product itself has changed rather than receiving an update.
  - [old/omission/minor] Missing 'version' (версия)
  - [old/style/minor] Sounds a bit like a person or a concept is arriving, rather than a software update
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - Translation A accurately reflects the original meaning ('a new version'), whereas Translation B changes the meaning to imply the entire product is new ('the new MindHealth').
  - [old/mistranslation/major] The translation omits 'version' and implies the product itself is new, rather than just a new version of it.

#### 🟡 en `/emails.call-back.subtitle`— вердикт неустойчив

- **RU**: Обновленное приложение по КПТ: новый дизайн, AI-поддержка, улучшенные упражнения и много полезного для заботы о себе. Скачайте бесплатно и уделите время своему психическому благополучию.
- **OLD**: Our updated CBT app brings a new design, personal AI support, enhanced exercises, and more to help you take care of yourself. Download for free and make time for your mental well-being.
- **NEW**: The updated CBT app is here: new design, AI support, improved exercises, and more tools for self-care. Download it for free and make time for your mental well-being.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A flows much more naturally as a marketing blurb, using a strong verb ('brings') instead of a static 'is here' structure. It also captures the 'self-care' nuance more elegantly.
  - [new/style/minor] The colon structure feels slightly more like a list of features than a cohesive, inviting sentence.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and punchy, which is ideal for an app announcement. Translation B is slightly wordy and uses 'brings a new design', which sounds a bit unnatural compared to the direct list in A.
  - [old/style/minor] The phrasing 'brings a new design' is slightly clunky for a marketing headline; a direct list is more standard for app updates.

#### 🟡 en `/body`— вердикт неустойчив

- **RU**: Ощущения в теле
- **OLD**: Body sensations
- **NEW**: Physical sensations
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - In the context of mental health and mindfulness, 'Body sensations' is the more natural and standard way to refer to internal physical feelings. 'Physical sensations' is grammatically correct but sounds slightly more clinical or detached.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - In a mental health and wellness context, 'Physical sensations' is the standard, professional term used to describe bodily awareness. 'Body sensations' is grammatically correct but sounds slightly more colloquial and less polished for an app interface.

#### 🟡 en `/emails.call-back.app.title`— вердикт неустойчив

- **RU**: Приложение MindHealth
- **OLD**: MindHealth App
- **NEW**: MindHealth app
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - According to the project guidelines for UI strings, sentence case should be used (only the first word capitalized), making 'MindHealth app' the correct choice. 'App' in B is unnecessarily capitalized.
  - [old/style/minor] Capitalization of 'App' violates sentence case rule for UI elements
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 95)
  - In the context of a title or a standalone brand name, Title Case is the standard for English. Translation A follows the convention for headings/titles, whereas B uses sentence case which is more typical for body text.
  - [new/style/minor] Lowercase 'app' in a title/heading is less conventional for a product name.

#### 🟢 en `/intermediate` — NEW лучше (2:0)

- **RU**: Промежуточное убеждение (правило)
- **OLD**: Intermediate Belief
- **NEW**: Intermediate belief (rules and assumptions)
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B correctly follows the project's specific terminology guidelines for intermediate beliefs, which are defined as 'rules and assumptions'. Translation A is a literal translation that misses the required explanatory context provided in the original.
  - [old/omission/major] Omitted the parenthetical clarification '(rule)' which is essential for the context of intermediate beliefs in this project.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A accurately follows the CBT canon by including the clarification 'rules and assumptions' provided in the original, whereas B omits the parenthetical explanation entirely.
  - [old/omission/major] The parenthetical part '(rule)' is missing, which is crucial for defining the term in this context.

#### 🟡 en `/depth`— вердикт неустойчив

- **RU**: Глубинное убеждение
- **OLD**: Core Belief
- **NEW**: Core belief
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - The original is a title/heading. According to the style guide, titles in English should follow Title Case or Sentence case, but for a standalone concept heading like this, Title Case (A) is the standard professional approach for UI/content headers.
  - [new/style/minor] Uses sentence case for a standalone heading, which is less common for primary titles in this context compared to Title Case.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 100)
  - Translation A correctly follows the 'sentence case' rule for UI elements and headers, whereas Translation B uses 'Title Case', which is not the project standard for this type of string.
  - [old/style/minor] Uses Title Case instead of sentence case

#### 🟢 en `/email.code.text` — NEW лучше (2:0)

- **RU**: Ваш проверочный код
- **OLD**: Your Verification Code
- **NEW**: Your verification code
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - According to the project guidelines, UI strings and labels should use sentence case (only the first word capitalized). Translation A uses Title Case, which is incorrect for this context.
  - [old/style/minor] Used Title Case instead of sentence case
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A correctly follows the 'sentence case' rule for UI strings, whereas Translation B uses 'Title Case', which is not the standard for this type of notification/label according to the instructions.
  - [old/style/minor] Uses Title Case instead of sentence case for a UI string

#### 🔴 en `/emails.call-back.unsubscribe.1` — OLD лучше (2:0)

- **RU**: Если вы больше не хотите получать письма, нажмите
- **OLD**: If you no longer want to receive emails, click
- **NEW**: If you no longer wish to receive these emails, click to
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 75)
  - Translation A is a perfect, natural match for the original. Translation B adds unnecessary words ('these', 'to') that create a grammatical error and a clunky flow.
  - [new/addition/minor] Added 'these' which is not in the original.
  - [new/style/major] Ending with 'click to' is grammatically incomplete and unnatural for a button/link instruction.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation B is more concise and natural for a UI instruction. Translation A adds an unnecessary 'these' and ends with a dangling 'to', which is grammatically awkward for a button/link instruction.
  - [new/style/minor] The addition of 'these' and the trailing 'to' makes the sentence feel incomplete and heavy compared to the original.
  - [new/addition/minor] Added 'these' which is not in the original.

#### 🟢 en `/emails.call-back.relax` — NEW лучше (2:0)

- **RU**: Звуки для расслабления
- **OLD**: Sounds for relaxation
- **NEW**: Relaxation sounds
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B is more concise and follows standard UX patterns for app headers/labels. Translation A sounds slightly more like a literal translation of the Russian structure.
  - [old/style/minor] A bit wordy for a UI header; 'Relaxation sounds' is more idiomatic for a category name.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A follows the standard UX pattern for titles and categories in English, using a concise noun phrase. Translation B is grammatically correct but sounds slightly more descriptive and less like a professional app section header.
  - [old/style/minor] Sounds slightly more wordy/descriptive than a typical UI header

#### 🟢 en `/email.code.title` — NEW лучше (2:0)

- **RU**: Код для входа в приложение MindHealth
- **OLD**: Login Code for MindHealth App
- **NEW**: Your MindHealth login code
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more concise and follows natural English UX patterns for email subjects or notifications. Translation B is slightly wordy and feels more like a formal title than a functional string.
  - [old/style/minor] Uses a more heavy, formal structure ('Code for...') instead of the more natural possessive or noun adjunct construction.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B sounds more natural and user-centric for a mobile app context, whereas A sounds like a technical heading or a file name. B follows the 'warm, expert friend' tone by using the possessive 'Your'.
  - [old/style/minor] Sounds slightly robotic/technical, more like a label than a user-facing message.

