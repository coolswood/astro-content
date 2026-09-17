# QA: слепое парное сравнение переводов — en-ui-canary

- **Дата**: 2026-09-17T15:30:52.922Z
- **Метка**: en-ui-canary
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/ui-en-canary-20260917
- **Файлы**: ui/cognitive_psy
- **Локали**: en
- **Сэмпл/файл**: 30
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 3907b3511f2db1a1d0814f4ca645e5f04015007c

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## ui/cognitive_psy

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 30 | 🟢 16 | 🔴 8 | ⚪ 0 | 🟡 6 | 0 / 0 | 67% |
| **итого** | 30 | 🟢 16 | 🔴 8 | ⚪ 0 | 🟡 6 | 0 / 0 | 67% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×7, style/major×2, mistranslation/major×1, omission/minor×1, mistranslation/minor×1; OLD — style/minor×8, mistranslation/major×4, terminology/major×2, mistranslation/minor×2, omission/minor×2, terminology/minor×1, omission/major×1, style/major×1

### Детали пар (для спот-чека)

#### 🔴 en `/email_feedback_error` — OLD лучше (2:0)

- **RU**: Не удалось открыть почтовый клиент
- **OLD**: Could not open email client
- **NEW**: Could not open mail client
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - In the context of software and operating systems, 'email client' is the standard, natural term used by native speakers. 'Mail client' is understandable but sounds slightly more dated or less precise.
  - [new/style/minor] use of 'mail client' instead of the more standard 'email client'
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - In modern English, 'email client' is the standard, natural term for software used to manage electronic mail. 'Mail client' sounds slightly dated or overly formal, though not incorrect.
  - [new/style/minor] Use 'email client' instead of 'mail client' for a more natural, modern UX feel.

#### 🟢 en `/intro_new_problem_grief` — NEW лучше (2:0)

- **RU**: Утрата близкого
- **OLD**: Loss of someone close
- **NEW**: Loss of a loved one
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Translation A uses the standard, idiomatic English expression for this concept. Translation B is grammatically correct but sounds slightly more literal and less natural for a title or a psychological topic.
  - [old/style/minor] Sounds a bit more like a literal translation of 'someone close' rather than the established idiom 'loved one'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - In the context of mental health and grief, 'loss of a loved one' is the standard, natural idiomatic expression. Translation A is grammatically correct but sounds slightly clinical or literal.
  - [old/style/minor] Sounds a bit more like a literal translation than a natural English idiom for this context.

#### 🟢 en `/coping_info_hint_1` — NEW лучше (2:0)

- **RU**: Влево, если вера в деструктивную мысль уменьшилась.
- **OLD**: Left if your belief in the dysfunctional thought decreased.
- **NEW**: Swipe left if your belief in the unhelpful thought has decreased.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B follows the project's glossary ('unhelpful belief/thought') and uses a more natural, user-friendly verb ('Swipe left') which is standard for mobile UI. Translation A uses 'dysfunctional', which is explicitly marked as legacy/avoided, and lacks the action verb.
  - [old/terminology/major] Used 'dysfunctional' instead of the required 'unhelpful'
  - [old/style/minor] Lacks an action verb like 'Swipe', making it feel slightly clipped/unnatural for a UI instruction
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A follows the project's glossary ('unhelpful belief/thought') and uses a natural, user-friendly instruction ('Swipe left'). Translation B uses an outdated term ('dysfunctional') and lacks the verb, making it sound like a fragmented, non-native instruction.
  - [old/terminology/major] Used 'dysfunctional' instead of the project-mandated 'unhelpful'.
  - [old/style/major] Omission of the action verb (Swipe); sounds like a broken translation rather than a UI instruction.

#### 🟢 en `/notification_every_day_5_head` — NEW лучше (2:0)

- **RU**: 🤔 "Это катастрофа!" — точно?
- **OLD**: 🤔 "This is a disaster!" — are you sure?
- **NEW**: 🤔 “This is a catastrophe!” — are you sure?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B uses the canonical CBT term 'catastrophe' which matches the Russian 'катастрофа' and the specific cognitive distortion 'catastrophizing'. Translation A uses 'disaster', which is a natural synonym but loses the precise psychological terminology required by the project.
  - [old/terminology/minor] Used 'disaster' instead of the technical term 'catastrophe' (related to catastrophizing).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Translation A uses 'catastrophe', which is the exact canonical term for 'катастрофа' in the context of CBT (catastrophizing). Translation B uses 'disaster', which is a common synonym but less precise for a psychological tool.
  - [old/terminology/minor] Used 'disaster' instead of the standard CBT term 'catastrophe' related to catastrophizing.

#### 🟢 en `/errors_label_shortdesc` — NEW лучше (2:0)

- **RU**: Подмена реальности упрощённым ложным представлением
- **OLD**: Replacing reality with an oversimplified, inaccurate label
- **NEW**: Replacing reality with a simplified, false representation
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a precise and natural rendering of the original meaning. Translation B introduces 'label', which is a specific cognitive distortion (labeling) and changes the meaning of the general concept of 'representation'.
  - [old/mistranslation/major] The word 'label' is used instead of 'representation', which changes the meaning from a general cognitive process to a specific distortion (labeling).
  - [old/style/minor] The use of 'oversimplified' is a slight addition/intensification compared to the neutral 'упрощённым'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation B is a much more accurate and professional rendering of the original concept. Translation A introduces the word 'label', which is not present in the source and changes the meaning from a 'representation' to a 'name/tag'.
  - [old/addition/minor] Added 'label' which isn't in the original
  - [old/style/minor] The use of 'oversimplified, inaccurate label' sounds more like a description of a cognitive error rather than a direct translation of the noun phrase.

#### 🟢 en `/response_button` — NEW лучше (2:0)

- **RU**: Ответы пользователей
- **OLD**: User replies
- **NEW**: User responses
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - In a technical or data-driven context (like a dashboard or report), 'responses' is the standard term for user input. 'Replies' implies a conversational exchange or comments, which is less likely for this context.
  - [old/style/minor] 'Replies' sounds more like social media comments or chat messages rather than data/answers provided by users.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - In the context of surveys, tests, or psychological assessments, 'responses' is the standard term for answers provided by users. 'Replies' sounds more like social media comments or email replies.
  - [old/style/major] The word 'replies' is unnatural for data/test results; 'responses' is the correct term for user input in this context.

#### 🟡 en `/daybook_ai_loading_phrase_4`— вердикт неустойчив

- **RU**: Ищу когнитивные искажения...
- **OLD**: Identifying cognitive distortions...
- **NEW**: Searching for cognitive distortions...
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 75)
  - In a software context, 'Identifying' sounds much more natural for a system process than 'Searching for', which implies a manual or literal search. 'Identifying' fits the 'expert friend' tone and the technical nature of an AI/system scan.
  - [new/style/minor] Searching for sounds like a file search or a manual hunt, whereas Identifying is the standard UX term for a system detecting patterns.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is a more natural and direct way to represent a system status/loading message. Translation B sounds more like a formal process or a clinical task rather than a real-time action.
  - [old/style/minor] Identifying sounds slightly too formal/clinical for a loading state; 'Searching for' is the standard UX pattern for this context.

#### 🟢 en `/drawer_changelang` — NEW лучше (2:0)

- **RU**: Изменить язык
- **OLD**: Change Language
- **NEW**: Change language
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - According to the project's style guide, sentence case should be used for UI elements (only the first word capitalized). Translation A follows this rule, while Translation B uses Title Case.
  - [old/style/minor] Uses Title Case instead of the required Sentence case
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - According to the project's style guide, sentence case must be used for UI elements (only the first word capitalized). Translation B follows this rule, whereas Translation A incorrectly uses Title Case.
  - [old/style/minor] Uses Title Case instead of Sentence case as required by the style guide.

#### 🟢 en `/story_base_description_3` — NEW лучше (2:0)

- **RU**: Узнайте, как изменить негативные мысли и поведенческие паттерны, чтобы вести более счастливую и здоровую жизнь.
- **OLD**: Learn how to change negative thinking patterns into a healthier outlook on life.
- **NEW**: Learn how to change negative thoughts and behavioral patterns to live a happier, healthier life.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is a precise and natural rendering of the original, preserving all key elements including 'behavioral patterns' and the goal of a 'happier life'. Translation B is an oversimplification that omits 'behavioral patterns' and changes the meaning of the outcome.
  - [old/omission/major] Omitted 'behavioral patterns' (поведенческие паттерны) and 'happier' (более счастливую).
  - [old/mistranslation/minor] Changed the goal from 'living a life' to 'having an outlook', which shifts the focus from action/lifestyle to perception.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation B is a precise and natural rendering of the original. Translation A is an oversimplification that omits 'behavioral patterns' and changes the core meaning from 'changing patterns' to 'changing thoughts into an outlook'.
  - [old/omission/major] The phrase 'behavioral patterns' (поведенческие паттерны) is completely missing.
  - [old/mistranslation/major] The original says to change thoughts/patterns *to live* a better life, whereas A says to change thoughts *into* an outlook, which changes the logic of the sentence.

#### 🟢 en `/errors_maybe_shortdesc` — NEW лучше (2:0)

- **RU**: Попытка переиграть прошлое снова и снова
- **OLD**: Replaying scenarios over and over
- **NEW**: Trying to replay the past over and over again
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is more faithful to the original meaning, capturing the sense of 'trying' (попытка) and 'the past' (прошлое). Translation A changes the meaning to 'replaying scenarios', which is a specific interpretation not present in the source.
  - [old/mistranslation/major] The word 'scenarios' is an addition/interpretation; the original refers to 'the past' generally, not just scenarios.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a faithful and natural rendering of the original meaning. Translation B introduces a new concept ('scenarios') that is not present in the source text, which changes the nuance from re-living the past to re-playing mental scripts.
  - [old/mistranslation/major] The word 'scenarios' is an addition that changes the meaning; the original refers to the past itself, not just mental scenarios.

#### 🟢 en `/mood_chart_subtitle` — NEW лучше (2:0)

- **RU**: Ваше самочувствие утром и вечером
- **OLD**: How you felt in the morning and in the evening
- **NEW**: Your well-being in the morning and evening
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is a concise, natural title that perfectly matches the original's noun-based structure. Translation B is overly wordy, changes the grammatical form to a clause, and uses the past tense ('felt'), which is inappropriate for a recurring check-in.
  - [old/style/major] Changed noun phrase to a past tense clause, making it sound like a report of a past event rather than a title/label.
  - [old/style/minor] Wordy and lacks the punchiness required for a UI header.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 98)
  - Translation B is concise, uses the correct terminology ('well-being'), and follows the sentence case/style guidelines for a header. Translation A is a clunky, past-tense clause that sounds like a fragment of a sentence rather than a title.
  - [old/style/major] Uses past tense ('felt') which is inappropriate for a general heading; sounds unnatural and wordy.
  - [old/terminology/minor] Does not use the project-standard 'well-being'.

#### 🟢 en `/portrait` — NEW лучше (2:0)

- **RU**: Портрет
- **OLD**: Portrait
- **NEW**: Psychological profile
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 40 / NEW 100)
  - According to the project glossary, 'Психологический портрет' must be translated as 'psychological profile'. Translation B is a literal mistranslation that fails to convey the intended meaning in a mental health context.
  - [old/mistranslation/major] Uses 'Portrait' which refers to a picture/painting, whereas the context requires 'psychological profile'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 60 / NEW 100)
  - According to the project glossary, 'Психологический портрет' must be translated as 'psychological profile'. Translation A is a literal translation of 'Portrait' which, in a mental health app context, is ambiguous and does not follow the established terminology.
  - [old/terminology/major] Does not follow the glossary requirement for 'Психологический портрет' -> 'psychological profile'

#### 🔴 en `/sorrow` — OLD лучше (2:0)

- **RU**: Сожаление
- **OLD**: Regret
- **NEW**: Sorrow
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 75)
  - In the context of mental health and emotions, 'Regret' is the direct and accurate translation for 'Сожаление'. 'Sorrow' implies a much deeper, heavier sense of grief or sadness, which changes the emotional nuance.
  - [new/mistranslation/major] Sorrow is too intense and refers to grief/sadness rather than the specific emotion of regret.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 100 / NEW 40)
  - In a psychological context (CBT/mental health), 'Сожаление' refers to the cognitive emotion of 'Regret'. 'Sorrow' is a much heavier, poetic term for deep sadness or grief, which doesn't fit the clinical/journaling tone.
  - [new/terminology/major] Sorrow is a synonym for grief/sadness, whereas 'Regret' is the correct psychological term for the emotion of regret.

#### 🔴 en `/gooseCompanionWelcome` — OLD лучше (2:0)

- **RU**: Всегда приятно видеть тебя здесь.
- **OLD**: It’s always lovely to see you here.
- **NEW**: It’s always good to see you.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A perfectly captures the warm, welcoming tone of the original ('приятно') and includes the adverb 'here', which is present in the source. Translation B is a bit too generic and omits the 'here' part.
  - [new/omission/minor] Missing 'here' (здесь)
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B is more accurate to the original because it includes the word 'here' (здесь), which is present in the Russian text. It also captures the warm, welcoming tone of 'приятно' using 'lovely'.
  - [new/omission/minor] Missing the word 'here' (здесь).

#### 🟡 en `/notifications_countdown_hint`— вердикт неустойчив

- **RU**: Включите уведомления! Мы напомним, чтобы вы не забыли дать повторную оценку до конца дня.
- **OLD**: Enable notifications! We'll remind you to do a second check-in before the day ends.
- **NEW**: Turn on notifications! We’ll remind you to log your mood before the day ends.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A is more accurate to the original meaning of 'дать повторную оценку' (re-rate/check-in again), whereas Translation B assumes the user is logging their mood, which is a specific action not explicitly stated in the source. Translation A also uses a more natural flow for a notification prompt.
  - [new/mistranslation/minor] The original says 'give a re-evaluation/re-rate', while B specifies 'log your mood', which is an assumption/addition of specific context not present in the source.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - Translation A is much more natural and aligns perfectly with the project's terminology ('log your mood'). Translation B uses 'do a second check-in', which sounds clunky and is a literal/awkward translation of 'дать повторную оценку'.
  - [old/style/major] The phrase 'do a second check-in' is unnatural; in English, one would typically 'complete a second check-in' or simply 'check in again', but 'log your mood' is the preferred UX pattern here.

#### 🔴 en `/smerAiChatTitle` — OLD лучше (2:0)

- **RU**: Заполнение с AI
- **OLD**: Fill with AI
- **NEW**: AI-assisted filling
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation B is a concise, action-oriented label suitable for a UI/UX context. Translation A is a heavy, noun-based construction (nominalization) that sounds like a technical description rather than a functional button or header.
  - [new/style/major] Uses a heavy noun phrase 'AI-assisted filling' which is unnatural for a UI action; sounds like a process description rather than a feature or command.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A is concise and follows UX best practices for buttons or labels. Translation B is overly wordy and sounds like a technical description rather than a functional UI element.
  - [new/style/major] Too long and heavy for a UI label; sounds like a noun phrase describing a process rather than an action or a feature name.

#### 🟢 en `/tutorial_tests_description` — NEW лучше (2:0)

- **RU**: Здесь собраны техники, которые помогут быстро справиться с тревогой или навязчивыми мыслями
- **OLD**: Here you will find techniques to help you quickly overcome anxiety or intrusive thoughts
- **NEW**: Here you’ll find techniques to help you quickly cope with anxiety or intrusive thoughts
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A uses the natural contraction 'you’ll', which aligns perfectly with the app's warm, supportive tone. Translation B is slightly too formal ('you will') and uses 'overcome', which is less idiomatic in a mental health context than 'cope with'.
  - [old/style/minor] Use of 'you will' instead of the more natural 'you’ll' makes the tone feel slightly stiff/formal.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B uses the correct term 'cope with' as per the context of managing mental states, whereas 'overcome' in A sounds slightly more like defeating a permanent enemy rather than managing symptoms. B also correctly uses the contraction 'you’ll' which fits the warm, supportive tone of the app.
  - [old/style/minor] Use of 'overcome' is less natural for managing anxiety symptoms than 'cope with', and the lack of contraction 'you'll' makes it slightly more formal/stiff.

#### 🔴 en `/comparison_for` — OLD лучше (2:0)

- **RU**: Аргумент за
- **OLD**: Pro
- **NEW**: Argument for
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 75)
  - In the context of 'pros and cons' or presenting arguments, 'Pro' is the natural, idiomatic way to label the positive side in English. 'Argument for' sounds like a literal translation and is too wordy for a UI label.
  - [new/style/minor] Too literal and clunky for a UI element; lacks the punchy, idiomatic feel of 'Pro'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 75)
  - In a UI context, 'Pro' is the standard, concise way to label an argument in favor of something, whereas 'Argument for' sounds overly formal and wordy.
  - [new/style/minor] Too literal and heavy for a UI label; lacks the punchiness expected in modern apps.

#### 🟡 en `/time_h`— вердикт неустойчив

- **RU**: ч.
- **OLD**: h.
- **NEW**: h
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both translations are identical and represent a literal transliteration of a single character fragment. Since the source is just a single letter 'ч.', any attempt to translate it meaningfully is impossible, and both versions treat it as a character/placeholder.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 100 / NEW 50)
  - The original text is a single character 'ч.' (likely an abbreviation or a typo). Translation B preserves the punctuation, whereas Translation A omits the period.
  - [new/omission/minor] missing the period

#### 🟡 en `/das_description`— вердикт неустойчив

- **RU**: Пройдите тест на гармоничность личности и узнайте больше о своих сильных и слабых сторонах. Этот тест поможет вам лучше понять себя, выявить ключевые аспекты вашей личности и найти пути для дальнейшего личностного роста.
- **OLD**: Take the personal harmony test to learn more about your strengths and weaknesses. It can help you understand yourself better, identify key traits, and find room for growth.
- **NEW**: Take the personality harmony test to learn more about your strengths and weaknesses. This test will help you understand yourself better, identify key aspects of your personality, and find paths for further personal growth.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is a faithful and high-quality rendering of the original text, maintaining the full scope of meaning and professional tone. Translation B is too concise, losing specific nuances like 'key aspects of your personality' and 'personal growth', which makes it feel slightly reductive.
  - [old/omission/minor] Omitted 'personality' in 'personality harmony' (used 'personal harmony' instead) and simplified 'paths for further personal growth' to 'room for growth', losing the original's intent.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is much more natural and concise, following the 'expert friend' tone. Translation B is overly wordy and sounds like a literal translation (calque) of the Russian structure.
  - [new/style/minor] The phrase 'identify key aspects of your personality' is a bit heavy/wordy for a mobile app interface.
  - [new/style/minor] The phrase 'find paths for further personal growth' is a direct calque from Russian and sounds unnatural in English; 'find room for growth' or 'ways to grow' is much better.

#### 🟢 en `/recommend_password` — NEW лучше (2:0)

- **RU**: Пароль
- **OLD**: PIN
- **NEW**: Password
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 40 / NEW 100)
  - The original term 'Пароль' translates directly to 'Password'. 'PIN' is a specific type of code (Personal Identification Number) and is not a synonym for a general password.
  - [old/mistranslation/major] PIN is a specific technical term and is not an equivalent for 'Password' in a general sense.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 40 / NEW 100)
  - The original term 'Пароль' refers to a password, whereas 'PIN' is a specific type of code (Personal Identification Number) which is a mistranslation in this context.
  - [old/mistranslation/major] PIN is not a synonym for Password; it implies a numeric code, which changes the meaning.

#### 🟡 en `/gooseCompanionQuoteCardTitle`— вердикт неустойчив

- **RU**: Мудрое слово ✨
- **OLD**: A word of wisdom ✨
- **NEW**: Words of wisdom ✨
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - The Russian original uses the singular 'слово', which is idiomatically rendered in English as the fixed expression 'A word of wisdom'. Translation A changes the number to plural, which slightly alters the nuance.
  - [new/style/minor] Plural 'Words of wisdom' is a common phrase, but it deviates from the singular form of the original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - While 'A word of wisdom' is grammatically correct, 'Words of wisdom' is the standard, idiomatic fixed expression used in English for this context.
  - [old/style/minor] Sounds slightly less natural than the idiomatic plural form 'Words of wisdom'

#### 🟡 en `/notifications_tests_body`— вердикт неустойчив

- **RU**: Результаты вашего психологического теста устарели!
- **OLD**: Your test results may be outdated!
- **NEW**: Your psychological test results might be outdated!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A is more concise and natural for a UI notification. Translation B is grammatically correct but feels slightly heavy due to the literal inclusion of 'psychological', which is already implied by the context of the app.
  - [new/style/minor] The word 'psychological' is redundant in a mental health app context and makes the sentence feel more like a formal report than a friendly app notification.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A is more precise and follows the source more closely by including 'psychological', which is a key descriptor in the original. Translation B is a bit too generic, though it sounds natural.
  - [old/omission/minor] Missing the word 'psychological' present in the original.

#### 🟢 en `/mood_emotions_title` — NEW лучше (2:0)

- **RU**: Какие эмоции вы испытываете?
- **OLD**: Which emotions are you experiencing?
- **NEW**: What emotions are you feeling?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B is more natural and conversational for a mental health app. 'Feeling' is the standard, warmer way to ask about emotions, whereas 'experiencing' sounds slightly more clinical/formal.
  - [old/style/minor] The use of 'experiencing' is grammatically correct but feels a bit more formal/clinical than the desired 'understanding friend' tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more natural and conversational for a mobile app interface, whereas B sounds slightly more formal/clinical. 'Feeling' is the standard, warm way to ask about emotions in a mental health context.
  - [old/style/minor] The verb 'experiencing' is a bit heavy and formal for a friendly, supportive UI compared to 'feeling'.

#### 🟢 en `/about_us_rate_title` — NEW лучше (2:0)

- **RU**: Скажите пару добрых слов
- **OLD**: Say a kind word
- **NEW**: Say a few kind words
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 98)
  - Translation B accurately reflects the plural 'пару слов' (a few words) and sounds natural. Translation A uses the singular 'a kind word', which changes the meaning and feels slightly less idiomatic in this context.
  - [old/mistranslation/minor] The original uses the plural 'пару слов' (a few words), while A uses the singular 'a kind word'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Translation A is a direct and natural idiomatic equivalent of the Russian phrase. Translation B changes the number from plural to singular, which slightly alters the meaning and feels less natural in this context.
  - [old/style/minor] Changes 'a few words' (plural) to 'a word' (singular), making it sound slightly less idiomatic for this specific prompt.

#### 🟢 en `/benefit_psychologist` — NEW лучше (2:0)

- **RU**: Психолог
- **OLD**: Therapist
- **NEW**: Psychologist
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 60 / NEW 100)
  - The translation must strictly follow the glossary where 'Психолог' is mapped to 'psychologist'. 'Therapist' is a different professional role and violates the project's terminology requirements.
  - [old/terminology/major] Used 'Therapist' instead of the required 'psychologist'
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 60 / NEW 100)
  - The translation must strictly follow the project's glossary, which mandates 'psychologist' for 'психолог'.
  - [old/terminology/major] Used 'Therapist' instead of the required 'Psychologist'

#### 🔴 en `/points_descr` — OLD лучше (2:0)

- **RU**: Набирайте очки психологического здоровья и развивайте своего персонажа!
- **OLD**: Earn mental health points and level up your character!
- **NEW**: Earn mental health points and develop your character!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A uses 'level up', which is the natural, idiomatic way to describe character progression in a gamified context, whereas 'develop' sounds slightly more academic or literal.
  - [new/style/minor] 'Develop your character' is grammatically correct but lacks the engaging, gamified tone expected for this feature.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - While both are grammatically correct, 'level up' is a much more natural and idiomatic way to describe character progression in a gamified context than the literal 'develop'.
  - [new/style/minor] The word 'develop' sounds a bit formal and generic for a game-like mechanic; 'level up' or 'grow' would be more engaging.

#### 🟢 en `/story_depression_description_2` — NEW лучше (2:0)

- **RU**: В рамках курса вы изучите, что такое депрессия с научной точки зрения, узнаете о причинах ее возникновения, симптомах и влиянии на вашу жизнь.
- **OLD**: Learn what depression is from a scientific perspective: its causes, symptoms, and how it affects daily life.
- **NEW**: As part of this course, you will learn about depression from a scientific perspective, including its causes, symptoms, and how it affects your life.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B is more faithful to the original structure and tone, maintaining the 'As part of this course' context and the direct address to the user. Translation A is a bit too clipped and loses the introductory phrase.
  - [old/omission/minor] Missing 'As part of the course' (В рамках курса)
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A is a perfect, natural rendering of the original sentence, maintaining the structure and the 'you will learn' intent. Translation B changes the sentence into an imperative instruction, which shifts the tone and loses the 'you will learn' nuance.
  - [old/style/minor] Changes the declarative 'you will learn' into an imperative 'Learn...', which slightly alters the tone of the course introduction.

#### 🔴 en `/homeBotHeader5` — OLD лучше (2:0)

- **RU**: Привет! Я рядом и готов поддержать
- **OLD**: Hi! I’m right here, ready to support you
- **NEW**: Hi! I’m here and ready to support you
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A captures the warm, supportive nuance of 'Я рядом' much better through the phrase 'I’m right here', whereas B is a bit more literal and flat.
  - [new/style/minor] Lacks the emotional warmth of the original; 'I'm here' is a bit generic compared to 'I'm right here'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B captures the warmth and nuance of 'Я рядом' much more effectively through the use of 'right here', which sounds more natural and supportive in English. Translation A is grammatically correct but feels slightly more literal and less emotive.
  - [new/style/minor] Lacks the empathetic nuance of 'рядом' (right here) and feels a bit more generic.

#### 🔴 en `/intro_new_goal_explore` — OLD лучше (2:0)

- **RU**: Просто попробовать
- **OLD**: Just give it a try
- **NEW**: Just to try
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 75)
  - Translation B uses a natural, idiomatic expression ('give it a try') that fits the supportive tone of the app, whereas Translation A sounds like a literal, clunky fragment.
  - [new/style/major] Sounds like a direct translation (calque) and is not a natural way for a native speaker to phrase a suggestion or action.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 60)
  - Translation A uses a natural, idiomatic phrase ('give it a try') that fits the supportive tone of the app, whereas Translation B is a literal, clunky calque of the Russian infinitive.
  - [new/style/major] Sounds like a direct translation from Russian; unnatural for a button or a call to action in English.

