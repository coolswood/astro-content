# QA: слепое парное сравнение переводов — en-ui-iter-seed21

- **Дата**: 2026-09-17T19:08:07.202Z
- **Метка**: en-ui-iter-seed21
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/ui-en-canary-20260917
- **Файлы**: ui/cognitive_psy
- **Локали**: en
- **Сэмпл/файл**: 30
- **Seed**: 21
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 31f3b61b8ac692a1f2d70200931d7e6363c07a33

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## ui/cognitive_psy

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 30 | 🟢 11 | 🔴 7 | ⚪ 1 | 🟡 11 | 1 / 0 | 61% |
| **итого** | 30 | 🟢 11 | 🔴 7 | ⚪ 1 | 🟡 11 | 1 / 0 | 61% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×9, style/major×2, omission/critical×1, omission/minor×1; OLD — style/minor×11, addition/minor×2, style/major×1, terminology/major×1, mistranslation/minor×1, mistranslation/major×1

### Детали пар (для спот-чека)

#### 🟡 en `/comparison_balance_title`— вердикт неустойчив

- **RU**: Баланс аргументов
- **OLD**: Argument balance
- **NEW**: Balance of arguments
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation A uses a natural noun adjunct construction common for titles and UI elements, whereas Translation B sounds overly formal and heavy due to the 'of' construction.
  - [new/style/minor] unnatural 'of' construction for a concise title/header
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - Translation A is a direct and natural heading for a cognitive exercise, whereas Translation B sounds like a technical or financial term (e.g., 'account balance').
  - [old/style/minor] Sounds more like a business/financial metric than a psychological exercise title.

#### 🔴 en `/notification_every_day_5_body` — OLD лучше (2:0)

- **RU**: Проверьте свои автоматические мысли на реалистичность!
- **OLD**: Challenge your automatic thoughts for realism!
- **NEW**: Check how realistic your automatic thoughts are!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A uses a much more natural, punchy, and engaging imperative ('Challenge...') which fits the 'expert friend' tone, whereas Translation B is a bit wordy and sounds like a literal translation of the Russian structure.
  - [new/style/minor] The construction 'Check how... are' is grammatically correct but feels heavy and less idiomatic for a call-to-action compared to 'Challenge... for realism'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation B uses the idiomatic and professional CBT term 'challenge', which is the standard way to describe testing thoughts. Translation A is grammatically correct but sounds slightly clunky and more like a literal translation of the Russian structure.
  - [new/style/minor] The construction 'Check how realistic... are' is a bit wordy and less impactful for a call to action compared to 'Challenge... for realism'.

#### 🟡 en `/comparison_argument_weight`— вердикт неустойчив

- **RU**: Вес аргумента
- **OLD**: Argument weight
- **NEW**: Weight
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 40)
  - Перевод A точно передает смысл оригинала, в то время как перевод B является критическим сокращением (omission), теряя ключевое существительное.
  - [new/omission/critical] Пропущено слово 'argument', что полностью меняет смысл фразы
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - In a UI context, 'Weight' is more concise and natural for a label. 'Argument weight' sounds slightly redundant and heavy for a single-line heading.
  - [old/style/minor] unnecessarily wordy for a UI label

#### 🟡 en `/notification_every_day_3_head`— вердикт неустойчив

- **RU**: 🤔 Интересно, какие глубинные убеждения кроются в вашем сне?
- **OLD**: 🤔 Curious what core beliefs are hidden in your dream?
- **NEW**: 🤔 I wonder what core beliefs are hidden in your dream?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B is more idiomatic and natural for a conversational, supportive app interface. Starting with 'Curious...' instead of 'I wonder...' feels less formal and more like a friendly prompt.
  - [new/style/minor] Slightly more formal/stiff than the original tone; 'I wonder' is grammatically correct but less punchy for a mobile app notification or prompt.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is a complete, natural sentence that perfectly captures the reflective tone of the original. Translation A is a fragment that sounds slightly clipped/telegraphic, which is less suitable for a warm, 'understanding friend' tone.
  - [old/style/minor] Missing the subject 'I', making it sound a bit like a casual note rather than a supportive question/thought.

#### 🟡 en `/notification_activities_body`— вердикт неустойчив

- **RU**: Время выполнения активности подходит к концу.
- **OLD**: Your activity time is almost up.
- **NEW**: Your activity is almost over.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A accurately captures the nuance of 'time is running out' (time is almost up), whereas Translation B focuses on the activity itself being over, which slightly shifts the meaning from the duration to the event.
  - [new/style/minor] Focuses on the activity ending rather than the time limit approaching, which is a slight deviation from the original emphasis on 'time'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A is more natural and concise for a UX context. Translation B is grammatically correct but slightly wordy and sounds more like a literal translation of 'time is ending'.
  - [old/style/minor] The phrase 'activity time' is slightly redundant and less idiomatic than simply 'activity' in this context.

#### 🟡 en `/das_disclaimer_active`— вердикт неустойчив

- **RU**: Результаты актуальны ещё {days} д.
- **OLD**: Results are valid for {days} more days.
- **NEW**: Results are valid for {days} more days
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both translations are identical in wording and perfectly capture the meaning, following the ICU pluralization rules and the required tone. The only difference is a trailing period, which is a matter of stylistic preference for UI elements (sentence case vs. no period).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 100)
  - The original text is a short UI status line without a period, and Translation A correctly follows this. Translation B adds a period, which is unnecessary for such a brief fragment.
  - [old/style/minor] unnecessary period at the end of a short UI string

#### 🔴 en `/article_feedback_title` — OLD лучше (2:0)

- **RU**: Как бы вы оценили материал этой главы?
- **OLD**: How would you rate this chapter?
- **NEW**: How would you rate the material in this chapter?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B is more natural and concise for a UX context. Translation A is a literal translation of 'материал этой главы', which sounds slightly heavy and redundant in English.
  - [new/style/minor] wordy/unnatural phrasing: 'the material in this chapter' is a bit clunky compared to the direct 'this chapter'
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A is more concise and natural for a UI/UX context. Translation B is grammatically correct but slightly wordy due to the literal translation of 'материал'.
  - [new/style/minor] unnecessary wordiness: 'the material in this chapter' sounds slightly more formal/heavy than the idiomatic 'this chapter'

#### 🟢 en `/diary_alert_back_content` — NEW лучше (2:0)

- **RU**: Все введённые данные будут сохранены
- **OLD**: Your data will be saved automatically
- **NEW**: All your data will be saved
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is a direct and natural way to convey the original meaning without adding unverified information. Translation B adds 'automatically', which is an addition not present in the source text.
  - [old/addition/minor] The word 'automatically' is not in the original Russian text.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B is a direct and natural way to convey the original meaning. Translation A adds the word 'automatically', which is an addition not present in the source text.
  - [old/addition/minor] The word 'automatically' is not in the original text

#### ⚪ en `/believe_final_success`— ничья (2:0)

- **RU**: Поздравляем! Ваше состояние улучшилось!
- **OLD**: Congratulations! You're feeling better!
- **NEW**: Congratulations! You’re feeling better!
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both translations are perfect. They use the correct contraction, follow the warm tone, and avoid the literal/clunky 'Your state has improved'. The only difference is the type of apostrophe, which is a matter of technical implementation rather than linguistic quality.
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both translations are identical in meaning, tone, and grammar, and perfectly follow the UX guidelines for a warm, supportive tone using contractions.

#### 🔴 en `/homeBotAppUpdated5` — OLD лучше (2:0)

- **RU**: Разработчики продолжают делать приложение удобнее с каждым днём. Посмотри, что новенького:
- **OLD**: The developers keep making the app better every day. Check out what’s new:
- **NEW**: The developers are making the app even better every day. See what’s new:
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds more natural and idiomatic for a product update. 'Keep making' better captures the continuous aspect of 'продолжают делать', and 'Check out' is a much more common and engaging UX phrase than the slightly plain 'See'.
  - [new/style/minor] The phrasing 'are making the app even better' is grammatically correct but feels slightly more passive/descriptive than the active 'keep making' used in B.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Translation A perfectly captures the continuous aspect of 'продолжают делать' using 'keep making', which sounds more natural and idiomatic for a product update. Translation B is grammatically correct but slightly loses the nuance of ongoing effort implied by the original.

#### 🟡 en `/sync_date_last`— вердикт неустойчив

- **RU**: Последняя синхронизация
- **OLD**: Last synced
- **NEW**: Last sync
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - In a UI context, 'Last synced' (adjective/past participle) is the standard way to indicate the status of the last successful action. 'Last sync' is more of a noun phrase that sounds slightly more abrupt or like a label for a process rather than a status update.
  - [new/style/minor] Sounds slightly less natural as a status indicator compared to the past participle 'synced'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - In a UI context, 'Last sync' is the standard noun phrase used to indicate the status of the last synchronization. 'Last synced' is an adjective/participle phrase that sounds slightly less natural as a standalone label.
  - [old/style/minor] Uses a past participle instead of the standard noun phrase for a status label

#### 🟢 en `/benefit_sounds_timer` — NEW лучше (2:0)

- **RU**: Таймер звуков
- **OLD**: Sound Timer
- **NEW**: Sound timer
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - According to the project guidelines for UI strings, sentence case must be used (only the first word capitalized). Translation B follows this rule, whereas Translation A uses Title Case.
  - [old/style/minor] Uses Title Case instead of the required sentence case for UI elements
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 100)
  - According to the project's UI guidelines, sentence case should be used for labels and buttons (only the first word capitalized), making 'Sound timer' the correct choice over Title Case.
  - [old/style/minor] Uses Title Case instead of sentence case for a UI label

#### 🔴 en `/subscription_info_cancel_title` — OLD лучше (2:0)

- **RU**: Вы хотите отменить подписку?
- **OLD**: Do you want to cancel your subscription?
- **NEW**: Are you sure you want to cancel?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B is a precise and natural translation of the original. Translation A is a common UX pattern, but it omits the object 'subscription', making it slightly less accurate to the source text.
  - [new/omission/minor] The word 'subscription' is omitted, though the meaning remains clear in a UX context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - Translation A is a direct and accurate reflection of the original text. Translation B adds a layer of confirmation ('Are you sure') that is not present in the source, which constitutes an addition.
  - [new/addition/minor] Added 'Are you sure' which changes the tone from a simple question to a confirmation prompt.

#### 🟢 en `/ab_popup_subtitle` — NEW лучше (2:0)

- **RU**: Вы можете повлиять на вид приложения. Выберите вариант, который вам больше нравится.
- **OLD**: You can influence how the app looks. Choose the option you prefer.
- **NEW**: Help shape the look of the app by choosing your favorite option.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is much more natural and idiomatic for a modern app interface, using a proactive 'Help shape...' construction instead of the clunky 'You can influence...' of Translation B.
  - [old/style/minor] Sounds a bit robotic and literal ('You can influence how the app looks') rather than engaging.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B is much more natural and engaging for a modern app interface, using a proactive 'Help shape...' construction instead of the dry, literal 'You can influence...' found in A.
  - [old/style/minor] Sounds a bit robotic and overly literal (calque of 'Вы можете повлиять').

#### 🟡 en `/homeBotAppUpdated3`— вердикт неустойчив

- **RU**: Мы подготовили несколько приятных улучшений. Давай посмотрим на них вместе!
- **OLD**: We’ve prepared some lovely improvements. Let’s take a look at them together!
- **NEW**: We’ve prepared some lovely improvements. Let’s check them out together!
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses the more natural, idiomatic phrasal verb 'check them out' for a friendly, engaging tone, whereas 'take a look at them' in A sounds slightly more formal and wordy.
  - [old/style/minor] slightly more formal/stiff than the target 'understanding friend' tone
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 95 / NEW 95)
  - Both translations are excellent, natural, and perfectly capture the warm, supportive tone of the original. 'Check them out' and 'take a look at them' are both idiomatic and appropriate for this context.

#### 🔴 en `/homeBotAppUpdated0` — OLD лучше (2:0)

- **RU**: Я обновился, пока тебя не было. Давай посмотрим, что нового добавили разработчики!
- **OLD**: I got an update while you were away. Let’s take a look at what the developers have added!
- **NEW**: I’ve updated while you were away. Let’s see what the developers have added!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A uses the idiomatic 'got an update' which sounds natural for a character/app context, whereas B's 'I've updated' sounds like the character performed the update on themselves (a literal translation of the Russian reflexive verb).
  - [new/style/major] The phrase 'I've updated' is a bit clunky and sounds like the subject performed the action of updating, rather than receiving an update.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation B sounds much more natural for a character/companion speaking to a user. Translation A uses 'I've updated', which sounds like the software itself updated, whereas 'I got an update' implies the character received new content/features, which fits the persona better.
  - [new/style/minor] The phrasing 'I've updated' is slightly ambiguous and sounds more like a system status than a character's dialogue.

#### 🟡 en `/about_us_use_text`— вердикт неустойчив

- **RU**: Просто оставайтесь с нами и будьте здоровы!
- **OLD**: Just keep using the app and take care of yourself!
- **NEW**: Just stay with us and stay healthy!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A sounds natural and idiomatic for a mobile app context, whereas Translation B is a literal calque of the Russian structure that sounds awkward and slightly unnatural in English.
  - [new/style/major] Literal translation of 'оставайтесь с нами' (stay with us) and 'будьте здоровы' (stay healthy) sounds like a direct translation from Russian rather than native English; 'take care of yourself' is the idiomatic way to convey this sentiment.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation A is a faithful and natural rendering of the original sentiment. Translation B introduces an unnecessary addition ('using the app') and changes the tone from a warm wish to a functional instruction.
  - [old/addition/major] Added 'using the app', which is not in the original text
  - [old/style/minor] The phrasing 'keep using the app' feels more like a business directive than a warm closing

#### 🟢 en `/connected_thoughts` — NEW лучше (2:0)

- **RU**: {thoughts} связанных мыслей
- **OLD**: {thoughts} linked thoughts
- **NEW**: {thoughts} related thoughts
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 98)
  - In a psychological context, 'related thoughts' is the standard, natural way to describe thoughts that are connected or belong to the same theme. 'Linked thoughts' sounds slightly mechanical and less idiomatic for mental well-being content.
  - [old/style/minor] use of 'linked' sounds a bit more like a technical connection (e.g., data links) rather than cognitive associations
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In the context of cognitive behavioral therapy and mental health, 'related thoughts' is the standard, natural way to describe thoughts that are connected to a specific topic or event. 'Linked thoughts' sounds slightly more mechanical or technical, as if they are physically or logically chained together.
  - [old/style/minor] 'linked' is less idiomatic than 'related' for describing the connection between thoughts in a psychological context.

#### 🟡 en `/intro_new_goal_track`— вердикт неустойчив

- **RU**: Отслеживать своё состояние
- **OLD**: Track how I’m feeling
- **NEW**: Track your state
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a concise, professional UI label that follows the imperative mood. Translation B is grammatically awkward for a button/header because it switches to the first person ('I'), which is non-standard for UX instructions.
  - [old/style/major] Switching to first person ('how I'm feeling') in a command/header is unnatural for English UX; it should be 'how you feel' or a noun phrase like 'your mood/state'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A uses a natural, person-centered phrasing ('how I'm feeling') which fits the supportive tone of a mental health app, whereas Translation B is a literal, clunky calque of the Russian 'состояние'.
  - [new/style/major] The word 'state' used this way sounds clinical and unnatural in English UX; 'how you feel' or 'how I'm feeling' is the standard.

#### 🔴 en `/comparison_title` — OLD лучше (2:0)

- **RU**: Аргументы за и против
- **OLD**: Pros and cons
- **NEW**: Arguments for and against
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - Translation A is the most natural, idiomatic, and concise way to express this concept in English, especially for a UI or heading. Translation B is grammatically correct but sounds slightly more formal and wordy.
  - [new/style/minor] A bit too formal/wordy for a standard heading; 'Pros and cons' is the preferred idiomatic equivalent.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - While both are grammatically correct, 'Pros and cons' is the idiomatic standard for headings in English, whereas 'Arguments for and against' sounds slightly more formal and academic.

#### 🔴 en `/comparison_add` — OLD лучше (2:0)

- **RU**: Добавить аргумент
- **OLD**: Add an argument
- **NEW**: Add argument
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - In English, a singular countable noun like 'argument' requires an article. Translation B follows the rule of using 'an' for a singular noun, whereas A sounds like a clipped, unnatural command or a technical programming term.
  - [new/style/minor] Missing article 'an' before 'argument' makes it sound like technical jargon rather than natural UX text.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 70)
  - Перевод A correctly uses the indefinite article 'an' for a singular countable noun, following English grammar rules. Translation B sounds like broken English or a direct calque from Russian.
  - [new/style/major] Missing indefinite article 'an' before the singular countable noun 'argument'

#### 🟢 en `/gpt_response_dream_title` — NEW лучше (2:0)

- **RU**: Психоанализ сна от AI
- **OLD**: Dream analysis by AI
- **NEW**: AI dream analysis
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B is more concise and follows modern UX standards for titles/labels. Translation A, while grammatically correct, sounds slightly more formal and wordy, whereas 'AI dream analysis' is a natural, punchy noun phrase typical for app features.
  - [old/style/minor] Slightly wordy for a UI header; 'by AI' is a bit more formal than the standard 'AI [noun]' construction.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more concise and follows modern UX standards for titles/headers. Translation B is grammatically correct but sounds slightly more formal and wordy than necessary for an app interface.
  - [old/style/minor] Uses a prepositional phrase 'by AI' which is less punchy for a header than the noun adjunct 'AI dream analysis'.

#### 🟡 en `/homeBotQuoteIntro5`— вердикт неустойчив

- **RU**: Делюсь глубокой мыслью — пусть она вдохновит тебя сегодня
- **OLD**: Sharing a deep thought — may it inspire you today
- **NEW**: Sharing a deep thought — let it inspire you today
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B uses the natural imperative 'let it', which fits the warm, supportive tone of the app. Translation A uses 'may it', which sounds overly formal, poetic, or archaic for a modern mobile interface.
  - [old/style/minor] The use of 'may it' is too formal/literary for a friendly AI assistant/app context.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses 'may it inspire you', which is a more natural and idiomatic way to express a wish or a blessing in English. Translation A's 'let it inspire you' sounds slightly more like a command or a direct instruction, which slightly shifts the tone from a gentle wish to a directive.
  - [new/style/minor] The use of 'let it' is grammatically correct but feels slightly more imperative/command-like than the original's soft, inspirational tone.

#### 🟢 en `/destructive` — NEW лучше (2:0)

- **RU**: Деструктивное убеждение
- **OLD**: Dysfunctional belief
- **NEW**: Unhelpful belief
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - Translation B strictly follows the project's glossary and tone of voice guidelines, using the preferred term 'unhelpful belief' to maintain a non-judgmental tone. Translation A uses 'dysfunctional', which is explicitly marked as legacy/to be avoided in the instructions.
  - [old/terminology/major] Uses 'dysfunctional' instead of the required 'unhelpful' as per the glossary instructions.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Translation A follows the project's specific glossary requirement to use 'unhelpful' instead of 'dysfunctional' to maintain a supportive, non-judgmental tone.
  - [old/terminology/minor] Uses 'dysfunctional', which is explicitly noted as legacy/to be avoided in favor of 'unhelpful' in the glossary.

#### 🟢 en `/daybook_ai_printing_phrase` — NEW лучше (2:0)

- **RU**: Печатаю ответ...
- **OLD**: Writing a response...
- **NEW**: Generating response...
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - In a digital/AI context, 'Generating' is the standard UX term for an AI producing content, whereas 'Writing' sounds like a human is typing. Translation B is more idiomatic for modern software.
  - [old/style/minor] Sounds slightly more like a human action than a system process
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - In the context of an AI assistant, 'Generating response...' is the standard, idiomatic UX pattern. 'Writing a response...' sounds slightly more literal and less like a system process.
  - [old/style/minor] Sounds a bit more like a human action than a system status indicator

#### 🟢 en `/breathing_rate_text` — NEW лучше (2:0)

- **RU**: Оцените ваш опыт
- **OLD**: How helpful was this practice?
- **NEW**: Rate your experience
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - Translation B is a direct and accurate translation of the original text. Translation A adds specific context ('how helpful was this practice') that is not present in the source, which constitutes an addition/interpretation error.
  - [old/addition/minor] The translator assumed the context is about a 'practice' and changed the question, whereas the original is a general request to rate an experience.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 60 / NEW 100)
  - Translation A is a direct and accurate translation of the original text, following the UI imperative style. Translation B is an addition that changes the meaning from a general rating of experience to a specific question about helpfulness.
  - [old/addition/major] The translator added a specific question ('How helpful was this practice?') which is not present in the original text.

#### 🟢 en `/homeBotTestExpired4` — NEW лучше (2:0)

- **RU**: Результаты <b>{testName}</b> потеряли актуальность. Хочешь обновить их и сверить самочувствие?
- **OLD**: The <b>{testName}</b> results are no longer up to date. Want to refresh them and compare how you feel?
- **NEW**: Your <b>{testName}</b> results are no longer current. Would you like to update them and check in on your well-being?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses 'check in on your well-being', which perfectly aligns with the project's 'Daily check-in' terminology and the warm, supportive tone. Translation B is slightly more colloquial ('Want to...') and uses 'compare how you feel', which is a bit clunky compared to the idiomatic 'check in'.
  - [old/style/minor] The omission of the subject 'Do you' makes it very informal, which is okay, but 'compare how you feel' is less natural than 'check in' in a mental health context.
  - [old/style/minor] Using 'The' instead of the possessive 'Your' makes it feel slightly more detached/clinical.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses more natural, professional UX language ('check in on your well-being') and follows the 'understanding friend' tone better than the slightly more casual/clunky 'compare how you feel'.
  - [old/style/minor] 'compare how you feel' sounds a bit literal/clunky compared to standard mental health app phrasing.

#### 🟢 en `/stepper_test_first` — NEW лучше (2:0)

- **RU**: Пройдите тест и получите личный инсайт
- **OLD**: Take a test and get a personal insight
- **NEW**: Take a test and get personal insights
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In English, 'insight' is typically used in the plural when referring to general results of a test, or requires an article if singular. Translation B sounds much more natural for a call to action.
  - [old/style/minor] The singular 'a personal insight' sounds slightly awkward and unnatural in this context; 'insights' is the idiomatic choice for test results.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In English, 'insights' is more natural in the plural when referring to the general results of a psychological test. Translation B sounds slightly awkward due to the singular 'a personal insight' without a specific context.
  - [old/style/minor] Singular 'a personal insight' sounds unnatural for a test result; plural 'insights' is the standard way to express this in English.

#### 🟢 en `/coping_banner_text` — NEW лучше (2:0)

- **RU**: Похоже, что предыдущее убеждение уже не актуально. Хотите удалить его?
- **OLD**: It looks like this belief is no longer relevant. Do you want to remove it?
- **NEW**: It looks like your previous belief is no longer relevant. Would you like to delete it?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more precise and natural; it correctly uses 'your previous belief' to match the Russian 'предыдущее убеждение' and uses 'delete', which is the standard UX term for removing data/entries.
  - [old/mistranslation/minor] Changed 'previous' to 'this', losing the temporal context of the original.
  - [old/style/minor] 'Do you want to...' is slightly more blunt/less polished than the standard 'Would you like to...' for a supportive app tone.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B is more accurate to the original meaning ('previous' vs 'this') and uses a more natural, polite tone for a user prompt ('Would you like to' vs 'Do you want to').
  - [old/mistranslation/minor] The word 'previous' (предыдущее) is replaced with 'this', which slightly changes the context of the user's history.

#### 🟡 en `/forever`— вердикт неустойчив

- **RU**: Навсегда
- **OLD**: Lifetime
- **NEW**: Forever
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - Translation A is a direct and natural equivalent for 'Навсегда'. Translation B ('Lifetime') changes the meaning to a duration (a lifespan or a period of time), which is a semantic shift.
  - [old/mistranslation/major] The word 'Lifetime' refers to the duration of a life or a period, whereas 'Forever' captures the eternal sense of the original 'Навсегда'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - In the context of a subscription or a service (implied by the term), 'Lifetime' is the standard industry term for a one-time purchase that never expires. 'Forever' sounds too poetic or informal for a product feature.
  - [new/style/minor] Sounds more like a romantic sentiment than a functional product status or tier.

