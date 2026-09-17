# QA: слепое парное сравнение переводов — en-ui-iter-seed99

- **Дата**: 2026-09-17T19:11:05.208Z
- **Метка**: en-ui-iter-seed99
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/ui-en-canary-20260917
- **Файлы**: ui/cognitive_psy
- **Локали**: en
- **Сэмпл/файл**: 30
- **Seed**: 99
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 31f3b61b8ac692a1f2d70200931d7e6363c07a33

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## ui/cognitive_psy

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 30 | 🟢 11 | 🔴 5 | ⚪ 0 | 🟡 14 | 0 / 0 | 69% |
| **итого** | 30 | 🟢 11 | 🔴 5 | ⚪ 0 | 🟡 14 | 0 / 0 | 69% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×11, style/major×3, addition/minor×1; OLD — style/minor×9, terminology/major×5, style/major×4, terminology/minor×1, mistranslation/major×1

### Детали пар (для спот-чека)

#### 🟡 en `/intro_step_day_closed`— вердикт неустойчив

- **RU**: День закрыт! ✨
- **OLD**: Day complete! ✨
- **NEW**: Day done! ✨
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In a mental health or habit-tracking app context, 'Day complete!' sounds more polished and rewarding, whereas 'Day done!' feels slightly too abrupt and informal.
  - [new/style/minor] The phrasing is a bit too blunt for a supportive app tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In a mobile app context, 'Day done!' sounds more natural, conversational, and punchy, fitting the 'understanding friend' tone. 'Day complete!' feels slightly more formal and robotic, like a system status message.
  - [old/style/minor] Sounds a bit too formal/mechanical for a warm, supportive app interface

#### 🟢 en `/move_to_am` — NEW лучше (2:0)

- **RU**: Перенести в дневник
- **OLD**: Move to diary
- **NEW**: Move to journal
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - Translation A follows the project glossary which specifies 'journal' as the standard term for the app section, whereas B uses 'diary', which is explicitly marked as legacy/outdated.
  - [old/terminology/major] Used 'diary' instead of the required 'journal'
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 60 / NEW 100)
  - The translation follows the project's glossary where 'дневник' must be 'journal'. 'Diary' is outdated for this context and contradicts the established UI terminology.
  - [old/terminology/major] Used 'diary' instead of the required 'journal'

#### 🟢 en `/rage` — NEW лучше (2:0)

- **RU**: Гнев
- **OLD**: Rage
- **NEW**: Anger
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 70 / NEW 100)
  - In a mental health context, 'Anger' is the standard, neutral term for the emotion. 'Rage' implies an extreme, uncontrolled state of fury, which is too intense for a general emotion label.
  - [old/style/major] Rage is too strong and specific; it describes an intense outburst rather than the general emotion of anger.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - The original 'Гнев' is a standard emotion name. 'Anger' is the direct and correct translation for a mood/emotion label, whereas 'Rage' implies an extreme, intense level of fury that goes beyond the neutral term used in the source.
  - [old/mistranslation/major] Rage is too intense and specific; it changes the emotional scale from a general emotion to an extreme state.

#### 🔴 en `/comparison_against` — OLD лучше (2:0)

- **RU**: Аргумент против
- **OLD**: Con
- **NEW**: Against
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - In the context of pros and cons (arguments for and against), 'Con' is the standard, idiomatic way to label the negative side. 'Against' sounds like a preposition or a direction rather than a noun label.
  - [new/style/minor] Sounds unnatural as a standalone label for an argument; 'Against' is typically a preposition.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - In the context of a debate or a structured argument (pro/con), 'Con' is the standard, idiomatic way to express the negative side. 'Against' sounds like a preposition and is incomplete as a standalone heading.
  - [new/style/major] Sounds unnatural as a standalone heading; 'Against' is typically used in phrases like 'Arguments against...' rather than as a label for the opposing side.

#### 🟢 en `/profile_premium_trial_plaque` — NEW лучше (2:0)

- **RU**: Пробный период, списание через {days} {days, plural, one{день} few{дня} many{дней} other{дня}}
- **OLD**: Trial period, billing in {days} {days, plural, one{day} few{days} many{days} other{days}}
- **NEW**: Trial period, charge in {days} {days, plural, one{day} other{days}}
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A correctly follows the ICU pluralization rules for English (one/other), whereas Translation B uses a Russian-style pluralization structure which is grammatically incorrect for English.
  - [old/style/major] Incorrect ICU pluralization logic for English; English only requires 'one' and 'other' categories, not 'few' and 'many'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - Translation B correctly follows the ICU pluralization rules for English (one/other), whereas Translation A uses a Russian-style pluralization structure which will cause errors in the app. Translation B also uses a more natural UX term 'charge'.
  - [old/style/major] Incorrect ICU pluralization for English (uses Russian 'few/many' logic instead of 'one/other')
  - [old/style/minor] 'billing in' is slightly less natural for a countdown than 'charge in' or 'will be charged in'

#### 🟢 en `/coping_info_hint_3` — NEW лучше (2:0)

- **RU**: Вверх, если вера в деструктивную мысль не изменилась.
- **OLD**: Up if your belief in the dysfunctional thought didn't change.
- **NEW**: Swipe up if belief in the unhelpful thought hasn't changed.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation A follows the project's terminology ('unhelpful') and uses a more natural UX instruction ('Swipe up'). Translation B uses an outdated term ('dysfunctional') and sounds slightly clunky.
  - [old/terminology/major] used 'dysfunctional' instead of the required 'unhelpful'
  - [old/style/minor] the instruction 'Up if...' is too abrupt and lacks a clear action verb compared to 'Swipe up'
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B follows the project's terminology ('unhelpful') and uses a more natural UX pattern ('Swipe up'). Translation A uses 'dysfunctional', which is explicitly marked as legacy/incorrect in the glossary, and 'didn't change' sounds slightly less natural than the present perfect in this context.
  - [old/terminology/major] Used 'dysfunctional' instead of the required 'unhelpful'
  - [old/style/minor] Missing the action verb 'Swipe' makes the instruction less clear for a mobile UI

#### 🟡 en `/tutorial_daybook_description`— вердикт неустойчив

- **RU**: Выгружайте сюда всё, что накопилось за день. Это поможет освободить голову и заметить, что на самом деле влияет на ваше состояние
- **OLD**: Offload everything that has built up during the day here. This will help clear your mind and identify what truly affects your mood
- **NEW**: Unload everything that’s built up during the day. This will help clear your head and help you notice what’s actually affecting your mental well-being.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more concise and uses 'offload', which is a more natural and modern way to describe mental unloading than 'unload'. It also avoids the repetitive 'help' found in B.
  - [new/style/minor] Repetitive use of 'help' in the second sentence ('help clear... and help you notice').
  - [new/style/minor] 'Clear your head' is acceptable, but 'clear your mind' in A is more idiomatic for mental health contexts.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Translation A sounds more natural and follows the 'understanding friend' tone. Translation B's word order ('...during the day here') is clunky and feels like a direct translation from Russian.
  - [old/style/major] The placement of 'here' at the end of the first sentence is unnatural in English; it should be at the beginning or integrated earlier.
  - [old/style/minor] The repetition of 'help' in A is a minor stylistic choice, but B's 'identify' is slightly more formal/clinical than the warm tone requested.

#### 🟢 en `/stepper_check_in_evening_description` — NEW лучше (2:0)

- **RU**: Подведите итоги дня и вашего самочувствия
- **OLD**: Look back on your day and how you felt.
- **NEW**: Summarize your day and how you’re feeling
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A perfectly captures the present-moment focus of the original ('how you're feeling') and uses a natural, inviting imperative. Translation B shifts the tense to the past ('how you felt'), which sounds more like a completed reflection rather than a current check-in.
  - [old/style/minor] The use of past tense 'felt' makes it sound slightly less immediate/engaging for a daily check-in compared to the present continuous.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is more direct and aligns better with the UX goal of 'summarizing' (подвести итоги), whereas A sounds more like a reflective prompt. B also uses the present continuous 'how you're feeling', which is more natural for a daily check-in.
  - [old/style/minor] The phrase 'Look back on' is a bit more poetic/reflective than the functional 'Summarize' implied by 'Подведите итоги'.

#### 🟡 en `/subscription_info_cancel_trial_body`— вердикт неустойчив

- **RU**: При отмене подписки во время пробного периода вы сразу потеряете доступ к премиум-функциям.
- **OLD**: If you cancel during the trial period, you'll lose access to premium features immediately.
- **NEW**: If you cancel during your trial period, you will lose access to Premium features immediately.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A correctly follows the brand guidelines regarding the capitalization of 'Premium' as a specific tier name and uses the more natural possessive 'your trial period'.
  - [old/terminology/minor] premium should be capitalized as 'Premium' when referring to the specific tier/product name per guidelines.
  - [old/style/minor] using 'the trial period' instead of 'your trial period' is slightly less personal/warm for a supportive app tone.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more natural for a mobile app interface due to the use of the contraction 'you'll', which fits the 'understanding friend' tone. Translation B is slightly too formal ('you will') and uses 'Premium' with a capital letter, which deviates from the sentence case rule for features.
  - [new/style/minor] Use of 'you will' instead of 'you'll' makes the tone too formal/stiff for the app's voice.
  - [new/style/minor] Capitalization of 'Premium' in the middle of a sentence is unnecessary unless it's a specific product name, whereas 'premium features' is a descriptor.

#### 🟢 en `/coping_description` — NEW лучше (2:0)

- **RU**: Заменяйте деструктивные убеждения на конструктивные с помощью карточек
- **OLD**: Use these cards to replace dysfunctional beliefs with more adaptive alternatives
- **NEW**: Replace unhelpful beliefs with adaptive ones using coping cards
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A perfectly follows the glossary (unhelpful beliefs, adaptive, coping cards) and maintains the concise, imperative tone of a UI instruction. Translation B uses 'dysfunctional', which is explicitly marked as legacy/avoidable, and adds 'more adaptive alternatives' and 'these', which makes the sentence wordy and deviates from the original's directness.
  - [old/terminology/major] Used 'dysfunctional' instead of the required 'unhelpful'
  - [old/style/minor] Added 'these' and 'more... alternatives', making it wordier than the original
  - [old/terminology/major] Missed the specific term 'coping cards' in favor of just 'cards'
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B follows the project's specific terminology (unhelpful beliefs, adaptive) and correctly identifies 'карточки' as 'coping cards'. Translation A uses 'dysfunctional', which is explicitly marked as legacy/incorrect in the glossary, and adds 'more adaptive alternatives', which is an unnecessary addition.
  - [old/terminology/major] Used 'dysfunctional' instead of the required 'unhelpful'
  - [old/addition/minor] Added 'more adaptive alternatives' which wasn't in the original
  - [old/omission/minor] Missed the specific term 'coping cards' (карточки)

#### 🔴 en `/gpt_recommendation_intermediate_title` — OLD лучше (2:0)

- **RU**: Анализ промежуточных убеждений от AI
- **OLD**: AI analysis of intermediate beliefs
- **NEW**: AI intermediate belief analysis
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A follows a natural English noun phrase structure for a title/header. Translation B is a heavy noun pile (noun adjunct stack) which, while grammatically possible, sounds more like a technical database label than a user-friendly app header.
  - [new/style/minor] The string of three nouns ('AI intermediate belief analysis') is slightly clunky and less readable for a UI header than the prepositional structure in A.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation B follows natural English syntax for a title/header, whereas A sounds like a compressed technical label or a string of nouns, which is less pleasant for a user interface.
  - [new/style/minor] Noun stacking makes the phrase feel heavy and less idiomatic for a feature title.

#### 🟡 en `/alert_sent_error`— вердикт неустойчив

- **RU**: Ошибка отправки
- **OLD**: Couldn't send message
- **NEW**: Failed to send message
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B is more natural and fits the 'understanding friend' tone of the app, whereas A sounds like a dry, technical system error.
  - [new/style/minor] Sounds slightly more formal/robotic (system error style) compared to the preferred warm tone.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B uses the standard, professional UX pattern for error messages. Translation A sounds slightly more informal/conversational, which is less common for a system error notification.
  - [old/style/minor] A bit too informal for a system error; 'Failed to send' is the industry standard.

#### 🟢 en `/tutorial_tests_description` — NEW лучше (2:0)

- **RU**: Здесь собраны техники, которые помогут быстро справиться с тревогой или навязчивыми мыслями
- **OLD**: Here you will find techniques to help you quickly overcome anxiety or intrusive thoughts
- **NEW**: Here is a collection of techniques to help you quickly manage anxiety or intrusive thoughts.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A is more natural and follows the UX standard for app descriptions. Translation B uses a slightly more heavy-handed 'you will find' construction and 'overcome', which is less idiomatic in a mental health context than 'manage'.
  - [old/style/minor] The phrase 'Here you will find' is a bit more formal/clunky than the smoother 'Here is a collection' or 'Find techniques' in a modern app context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more natural and idiomatic for an app introduction. Translation A uses a slightly clunky 'Here you will find' structure, whereas B uses the more standard 'Here is a collection of'.
  - [old/style/minor] The phrasing 'Here you will find' sounds a bit like a textbook or a manual rather than a warm, supportive app interface.

#### 🟡 en `/comparison_edit`— вердикт неустойчив

- **RU**: Редактировать аргумент
- **OLD**: Edit an argument
- **NEW**: Edit argument
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - In UI/UX design, buttons and actions use the imperative form without articles. Translation A follows the standard 'Sentence case' and 'Button' rules, whereas Translation B adds an unnecessary article, making it sound like a sentence rather than a command.
  - [old/style/minor] Unnecessary article 'an' for a UI action/button
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation A follows the rule of using an article for a singular countable noun, making it sound natural. Translation B sounds like a clipped, robotic command or a technical label, which lacks the polished UX feel.
  - [new/style/minor] Missing article 'an' makes it sound unnatural/telegraphic for a standard UI action.

#### 🟢 en `/daybook_ai_loading_phrase_6` — NEW лучше (2:0)

- **RU**: Формирую рекомендации...
- **OLD**: Forming recommendations...
- **NEW**: Generating recommendations...
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - In a software/AI context, 'generating' is the standard, idiomatic term for creating outputs like recommendations, whereas 'forming' sounds unnatural and like a literal translation of the Russian 'формирую'.
  - [old/style/major] unnatural collocation for software/AI context
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - In a software/UX context, 'Generating' is the standard, idiomatic term for a system creating content or suggestions. 'Forming' sounds unnatural and like a literal translation of the Russian 'формирую'.
  - [old/style/major] unnatural collocation for software processes; sounds like a direct translation (calque)

#### 🔴 en `/tests_left_days` — OLD лучше (2:0)

- **RU**: Обновите результат через {days} д.
- **OLD**: Retake in {days} days
- **NEW**: Update your results within {days} days
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation B is much more natural for a UX context (using 'Retake' for a test/result), whereas Translation A sounds like a literal translation of 'обновите' and uses 'within', which changes the meaning from 'in X days' to 'at some point during the next X days'.
  - [new/style/major] The use of 'within' implies a deadline (anytime before X days pass), while the Russian 'через' implies a specific interval (after X days have passed). Also, 'Update your results' is a clunky way to say 'Retake the test'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - In the context of psychological tests, 'Retake' is the natural, idiomatic way to suggest repeating a test, whereas 'Update your results' sounds like a technical data synchronization process. Translation A is concise and follows UX best practices for buttons or prompts.
  - [new/style/major] The phrase 'Update your results' sounds like a software update or data refresh rather than a suggestion to retake a test; 'within' is also slightly more formal/restrictive than the original 'через'.

#### 🔴 en `/alert_delete_psy_subtitle` — OLD лучше (2:0)

- **RU**: Ваши записи больше не будут доступны психологу
- **OLD**: Your entries will no longer be visible to your psychologist
- **NEW**: Your entries will no longer be available to your psychologist
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In the context of data privacy and visibility, 'visible to' is more natural and precise for a user interface than 'available to', which can imply accessibility or availability of a service.
  - [new/style/minor] The word 'available' sounds slightly more like a resource or a feature rather than the visibility of private content.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - In a digital interface context, 'visible' is more natural and precise for describing access to data than 'available'.
  - [new/style/minor] While grammatically correct, 'available' sounds slightly more formal/clunky in a UX context compared to 'visible'.

#### 🟡 en `/article_rate_body_2`— вердикт неустойчив

- **RU**: Для нас крайне важно ваше мнение! Напишите, что вам понравилось, а что стоит улучшить
- **OLD**: Your feedback means a lot to us! Tell us what you liked and what we could improve.
- **NEW**: Your opinion matters to us! Let us know what you liked and what we can improve.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A uses 'feedback', which is the standard UX term for this context, and 'means a lot', which sounds more natural and warm than the slightly more formal 'matters to us'.
  - [new/style/minor] 'Your opinion' is slightly more formal/stiff than 'Your feedback' in a modern app context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 96)
  - Translation A is more direct, punchy, and follows the UX standard for calls to action. Translation B is slightly more wordy and uses 'could improve', which sounds a bit more hesitant than the decisive 'can improve' in A.
  - [old/style/minor] The use of 'could' instead of 'can' makes the sentence slightly less direct for a UI prompt.

#### 🟡 en `/homeBotAppUpdated3`— вердикт неустойчив

- **RU**: Мы подготовили несколько приятных улучшений. Давай посмотрим на них вместе!
- **OLD**: We’ve prepared some lovely improvements. Let’s take a look at them together!
- **NEW**: We’ve prepared some lovely improvements. Let’s check them out together!
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 95 / NEW 95)
  - Both translations are excellent, idiomatic, and perfectly capture the warm, supportive tone of the original. 'Check them out' and 'take a look at them' are both natural ways for a native speaker to express this.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses the more natural, idiomatic phrasal verb 'check them out', which perfectly fits the warm, friendly tone of the app. Translation A's 'take a look at them' is grammatically correct but feels slightly more formal and less engaging for a user-facing feature announcement.

#### 🟡 en `/month`— вердикт неустойчив

- **RU**: месяц
- **OLD**: month
- **NEW**: Month
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In the context of an app interface (likely a header or a label), sentence case or title case is standard. Translation B follows the UI convention for labels/headers, whereas A is just a lowercase word which looks like a typo in a UI context.
  - [old/style/minor] lowercase 'month' is unusual for a standalone UI element or header
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - The original is lowercase, and in UI contexts for labels or general nouns, sentence case or lowercase is standard. Translation B follows the original's casing, whereas A introduces an unnecessary capital letter.
  - [new/style/minor] Unnecessary capitalization if this is a simple label or part of a list, though acceptable in some Title Case contexts.

#### 🔴 en `/diary_subtitle` — OLD лучше (2:0)

- **RU**: Глубокая проработка ситуации
- **OLD**: Deep dive into your situation
- **NEW**: Deep situation analysis
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A uses an idiomatic, engaging expression ('Deep dive') that fits the 'understanding friend' tone, whereas Translation B sounds like a dry, academic report.
  - [new/style/major] Sounds too formal and clinical (academic/business style) for a mental health app; lacks the supportive tone of the original.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation B uses the idiomatic 'deep dive', which sounds natural and engaging for a mental health app, whereas Translation A sounds like a dry, academic report.
  - [new/style/major] Sounds like a formal report or clinical analysis rather than a supportive user experience; lacks the 'expert friend' tone.

#### 🟡 en `/benefit_fixed_price`— вердикт неустойчив

- **RU**: Фикс. цена
- **OLD**: Price Lock
- **NEW**: Fixed price
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a direct and accurate translation of the Russian 'Фикс. цена'. Translation B ('Price Lock') is a marketing term that implies a guarantee against future price changes, which changes the original meaning.
  - [old/mistranslation/major] The term 'Price Lock' implies a feature where a price is frozen to prevent future increases, whereas the original simply indicates a fixed/set price.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In a commercial or subscription context, 'Price Lock' is a much more natural, marketing-friendly term used by native speakers to indicate that a price will not change. 'Fixed price' sounds more like a literal description of a static price rather than a feature or benefit.
  - [new/style/minor] Sounds a bit dry and literal; lacks the 'benefit' feel of a product feature.

#### 🟡 en `/intro_new_cbt_title`— вердикт неустойчив

- **RU**: Каков ваш опыт в терапии?
- **OLD**: What experience do you have with therapy?
- **NEW**: What is your experience with therapy?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Both are grammatically correct, but Translation A is more concise and natural for a user interface or a conversational question. Translation B is slightly more wordy, which is less ideal for UX.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation A uses a more natural, conversational structure ('What experience do you have...') which fits the 'understanding friend' tone, whereas B is slightly more formal and stiff.
  - [new/style/minor] Sounds a bit more like a clinical questionnaire than a supportive conversation.

#### 🟡 en `/homeBotDayFirst`— вердикт неустойчив

- **RU**: <p>Привет! Я твой проводник в этом приложении. Моя задача — быть рядом и бережно поддерживать тебя, когда тревожно, тяжело или просто нужно разложить мысли по полочкам.</p><p>Для начала я подобрал несколько простых шагов, чтобы ты мог познакомиться с практикам…
- **OLD**: <p>Hi! I’m your guide in this app. My job is to be by your side and gently support you when you feel anxious, when things are hard, or when you simply need to sort your thoughts out.</p><p>To start, I’ve picked out a few simple steps so you can get to know the…
- **NEW**: <p>Hi! I’m your guide in this app. My job is to be right here, supporting you gently whenever you feel anxious, overwhelmed, or just need to organize your thoughts.</p><p>To start, I’ve picked out a few simple steps so you can get to know the practices without…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A captures the warm, supportive 'expert friend' tone much more effectively through idiomatic phrasing like 'sort your thoughts out' and 'at your own pace'. Translation B feels slightly more formal and clinical.
  - [new/style/minor] The phrasing 'organize your thoughts' is a bit more formal/stiff than the idiomatic 'sort your thoughts out' in A.
  - [new/style/minor] The translation of 'разложить мысли по полочкам' as 'organize' loses the gentle, metaphorical nuance present in A's 'sort out'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and flows better, using 'overwhelmed' for 'тяжело' and 'organize your thoughts' for 'разложить мысли по полочкам', which sounds much more natural in English than B's literal 'sort your thoughts out'.
  - [old/style/minor] The repetition of 'when you feel... when things are... when you simply...' is slightly clunky compared to the smoother flow of A.
  - [old/style/minor] 'Sense how you're doing' is a bit of a literal translation of 'чувствовать состояние'; 'understand how you're feeling' is more natural for an AI/guide context.

#### 🟡 en `/homeBotHeader1`— вердикт неустойчив

- **RU**: Надеюсь, у тебя сегодня спокойный и хороший день
- **OLD**: Hope you’re having a calm and good day today
- **NEW**: I hope you’re having a calm and good day.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more natural for a supportive app interface, using the conversational omission of 'I' which fits the 'understanding friend' tone. Translation B is grammatically perfect but feels slightly more formal/stiff.
  - [new/style/minor] The inclusion of 'I' makes it sound slightly more like a formal sentence rather than a warm, casual greeting.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is a complete, grammatically perfect sentence that follows the warm, supportive tone. Translation B omits the subject 'I', which makes it feel slightly more casual/clipped, and the placement of 'today' at the end is slightly less fluid than the structure in A.
  - [old/style/minor] Omission of the subject 'I' makes it feel a bit too informal/clipped for a supportive expert tone; 'today' at the end is slightly less natural than the implied present continuous context.

#### 🟢 en `/intro_new_problem_other` — NEW лучше (2:0)

- **RU**: Другое
- **OLD**: Something else
- **NEW**: Other
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - In a UI context, 'Other' is the standard, concise label for an option in a list or menu. 'Something else' sounds too conversational and wordy for a selection element.
  - [old/style/minor] Too wordy for a UI label; lacks the standard brevity of 'Other'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 100)
  - In a UI context (like a selection menu or category list), 'Other' is the standard, concise label. 'Something else' sounds too conversational and wordy for a button or menu item.
  - [old/style/minor] Too wordy for a UI label; 'Something else' is more natural in speech than in a menu.

#### 🟢 en `/story_distortions_description_3` — NEW лучше (2:0)

- **RU**: Перед началом курса настоятельно рекомендуем пройти наш специализированный тест на дисфункциональные убеждения — это даст чёткое представление о ваших личных неадаптивных схемах.
- **OLD**: Before starting, we strongly recommend taking our specialized dysfunctional beliefs test. It will give you a clearer picture of your personal patterns.
- **NEW**: Before starting, we highly recommend taking our specialized test for unhelpful beliefs — it will give you a clear picture of your personal patterns.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A uses the correct project terminology ('unhelpful beliefs') and flows more naturally. Translation B uses 'dysfunctional beliefs', which contradicts the project's glossary, and the sentence structure is slightly more abrupt.
  - [old/terminology/major] Used 'dysfunctional beliefs' instead of the required 'unhelpful beliefs'
  - [old/style/minor] The use of 'clearer' (comparative) instead of 'clear' (positive) changes the nuance of the original
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation B correctly uses the project-approved term 'unhelpful beliefs' instead of the outdated/incorrect 'dysfunctional beliefs'. It also maintains the flow and tone more effectively.
  - [old/terminology/major] Used 'dysfunctional beliefs' instead of the required 'unhelpful beliefs'.
  - [old/omission/minor] Omitted 'unhelpful/maladaptive' nuance for the patterns (schemas), though 'patterns' is a good stylistic choice.

#### 🟡 en `/stepper_record_gratitude_continue`— вердикт неустойчив

- **RU**: Выразите благодарность за лучшее, что вы имеете
- **OLD**: Express gratitude for the best things you have
- **NEW**: Express gratitude for the best things in your life
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is a more precise and faithful rendering of the original text. Translation B introduces an addition ('in your life') that, while natural in English, deviates from the source.
  - [new/addition/minor] Added 'in your life' which is not present in the Russian original
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A sounds more natural and idiomatic for a mental well-being context. 'The best things in your life' is a standard, warm English expression, whereas 'the best things you have' sounds slightly more literal and clunky.
  - [old/style/minor] sounds a bit more like a direct translation from Russian rather than a natural English phrase

#### 🟢 en `/premium_discount` — NEW лучше (2:0)

- **RU**: скидка
- **OLD**: off
- **NEW**: discount
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 60 / NEW 100)
  - In a UI context, 'discount' is the standard noun for 'скидка'. 'Off' is typically used as a preposition or part of a phrase (e.g., '20% off') but cannot stand alone as a label for a discount.
  - [old/style/major] Using 'off' as a standalone noun for 'discount' is unidiomatic and sounds like an incomplete fragment.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 70 / NEW 100)
  - In a UI context, 'discount' is the standard noun for a price reduction. 'Off' is typically used as a suffix or part of a phrase (e.g., '20% off') rather than a standalone label.
  - [old/style/major] Using 'off' as a standalone noun for 'discount' sounds unnatural and incomplete in English UX.

#### 🟡 en `/premium_plus_description_text_2`— вердикт неустойчив

- **RU**: К сожалению, мы не можем предоставить AI-функционал бесплатно, так как его использование требует от нас значительных затрат.
- **OLD**: Unfortunately, we can't make AI features completely free because they're expensive to run.
- **NEW**: Unfortunately, we can’t provide AI features for free, as using them involves significant costs for us.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and conversational, fitting the 'understanding friend' tone, whereas B is heavy and sounds like a literal translation of a business report.
  - [new/style/major] The phrase 'involves significant costs for us' is a clunky, wordy calque of the Russian structure; 'expensive to run' in A is much more idiomatic for software/AI.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A is more professional and accurately reflects the original's tone, whereas B is slightly too colloquial ('expensive to run') for a formal explanation of costs.
  - [old/style/minor] The phrase 'expensive to run' is a bit too casual/colloquial for this context compared to the original.

