# QA: слепое парное сравнение переводов — en-ui-full-postmerge

- **Дата**: 2026-09-17T18:45:19.108Z
- **Метка**: en-ui-full-postmerge
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/ui-en-canary-20260917
- **Файлы**: ui/cognitive_psy
- **Локали**: en
- **Сэмпл/файл**: 30
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 083fe55691caf6f53d5dca4426a032821a8a1724

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## ui/cognitive_psy

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 30 | 🟢 18 | 🔴 3 | ⚪ 0 | 🟡 9 | 0 / 1 | 86% |
| **итого** | 30 | 🟢 18 | 🔴 3 | ⚪ 0 | 🟡 9 | 0 / 1 | 86% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×4, style/major×1; OLD — style/minor×13, omission/major×3, terminology/major×3, mistranslation/major×2, terminology/minor×2, style/major×2, omission/minor×2, mistranslation/critical×1, addition/minor×1, mistranslation/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/mood_freq_worsened`— вердикт неустойчив

- **RU**: В {percent} дней настроение ухудшалось к вечеру
- **OLD**: On {percent} of days, your mood worsened by the evening
- **NEW**: On {percent} of days, your mood declined by evening
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A is more natural and follows standard English usage. Translation B lacks the necessary article before 'evening' and 'declined' sounds slightly more formal/clinical than the more common 'worsened' in this context.
  - [new/style/minor] Missing the article 'the' before 'evening' (should be 'by the evening')
  - [new/style/minor] 'declined' is slightly less idiomatic for mood than 'worsened' in a supportive app context
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 92)
  - Translation A uses 'declined', which sounds more natural and professional in a mental health context, whereas 'worsened' in B is slightly more blunt. A also avoids the unnecessary definite article before 'evening'.
  - [old/style/minor] The use of 'the evening' is grammatically correct but 'by evening' is more idiomatic for describing a daily pattern.

#### 🟢 en `/daybook_placeholder` — NEW лучше (2:0)

- **RU**: Я внимательно слушаю... Поделитесь тем, что накипело или, наоборот, порадовало. Любые детали важны
- **OLD**: What happened today? Describe a situation that triggered positive or negative emotions...
- **NEW**: I'm listening... Share what's been on your mind, whether it's something heavy or something that made you happy. Every detail matters.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 50 / NEW 98)
  - Translation B perfectly captures the warm, supportive 'understanding friend' tone and follows all stylistic guidelines. Translation A is a complete hallucination that changes the meaning entirely, adding a question and a prompt about triggers that weren't in the original.
  - [old/mistranslation/critical] The text is completely rewritten; it introduces a question 'What happened today?' and a prompt about 'triggered emotions' which are not in the source.
  - [old/omission/major] The core sentiment of 'listening' and 'sharing what's on your mind' is lost.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 40 / NEW 95)
  - Translation A is a perfect transcreation that captures the warm, supportive tone and the exact meaning of the original. Translation B is a complete hallucination/omission, replacing the original text with entirely different instructions.
  - [old/mistranslation/critical] The translation does not follow the source text at all; it introduces new questions and instructions not present in the original.
  - [old/omission/critical] The entire sentiment of 'listening' and 'sharing what's on your mind' is lost.

#### 🟢 en `/mood_sleep_slider_title` — NEW лучше (2:0)

- **RU**: Оцените свой сон
- **OLD**: How did you sleep today?
- **NEW**: Rate your sleep
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - Translation B is a direct and accurate translation of the imperative 'Оцените', which is standard for UI labels. Translation A changes the meaning from a request to rate something to a conversational question about how the sleep was.
  - [old/mistranslation/major] The original is an instruction/label to rate sleep, while A is a conversational question 'How did you sleep today?'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - Translation A is a direct, accurate, and professional UI command that follows the 'Rate your...' pattern. Translation B changes the imperative instruction into a conversational question, which is an unnecessary addition of meaning and deviates from the original intent.
  - [old/style/minor] Changes the instruction to a question and adds 'today', which is not in the original.

#### 🟡 en `/share_yes`— вердикт неустойчив

- **RU**: Вы успешно поделились записью!
- **OLD**: You shared the entry successfully!
- **NEW**: Entry shared successfully!
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A follows UX best practices for success messages by being concise and omitting unnecessary pronouns. Translation B is grammatically correct but sounds slightly more formal and wordy for a quick UI notification.
  - [old/style/minor] Unnecessarily wordy for a success toast/notification; 'You shared...' is less common in modern UX than the direct 'Entry shared...' or 'Shared successfully!'
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation A is a complete, natural sentence that matches the original's tone and structure. Translation B is a clipped, telegraphic phrase more suitable for a log or a system notification than a warm, supportive user interface.
  - [new/style/minor] Lacks the subject 'You' and feels overly robotic/telegraphic compared to the warm tone of the original.

#### 🟢 en `/intro_new_problem_grief` — NEW лучше (2:0)

- **RU**: Утрата близкого
- **OLD**: Loss of someone close
- **NEW**: Loss of a loved one
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A uses the idiomatic and standard English expression 'loss of a loved one', which is the most natural way to convey this concept in a mental health context. Translation B is grammatically correct but sounds slightly more literal and less polished.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B uses the idiomatic and standard English expression 'loss of a loved one', which is the natural way to refer to this topic in mental health contexts. Translation A is grammatically correct but sounds slightly clinical or literal.
  - [old/style/minor] Sounds a bit more like a literal translation than a natural English idiom.

#### 🟢 en `/coping_info_hint_1` — NEW лучше (2:0)

- **RU**: Влево, если вера в деструктивную мысль уменьшилась.
- **OLD**: Left if your belief in the dysfunctional thought decreased.
- **NEW**: Swipe left if belief in the unhelpful thought has decreased.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation B uses the correct project terminology ('unhelpful thought') and provides a much clearer UX instruction by adding 'Swipe'.
  - [old/terminology/major] Used 'dysfunctional thought' instead of the required 'unhelpful thought'.
  - [old/style/minor] Lacks a verb like 'Swipe', making the instruction feel slightly abrupt for a UI element.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A follows the project glossary by using 'unhelpful' instead of 'dysfunctional' and maintains a natural, professional UX tone. Translation B is too clipped and uses an outdated term.
  - [old/terminology/major] Used 'dysfunctional' instead of the required 'unhelpful'
  - [old/style/minor] The omission of 'Swipe' makes it sound slightly unnatural for a UI instruction, though acceptable in very tight spaces

#### 🟢 en `/coping_info_hint_3` — NEW лучше (2:0)

- **RU**: Вверх, если вера в деструктивную мысль не изменилась.
- **OLD**: Up if your belief in the dysfunctional thought didn't change.
- **NEW**: Swipe up if belief in the unhelpful thought hasn't changed.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation A follows the project's terminology guidelines by using 'unhelpful' instead of 'dysfunctional' and maintains a natural UX flow. Translation B uses 'dysfunctional', which is explicitly flagged as legacy/incorrect in the glossary, and 'didn't change' is less precise than the present perfect 'hasn't changed' for this context.
  - [old/terminology/major] Used 'dysfunctional' instead of the required 'unhelpful'
  - [old/style/minor] The phrasing 'Up if...' is a bit too clipped/informal even for UX, and 'didn't change' lacks the perfect aspect nuance of the original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 95)
  - Translation B follows the project's terminology ('unhelpful' instead of 'dysfunctional') and uses a more natural UX instruction ('Swipe up'). Translation A uses 'dysfunctional', which is explicitly marked as legacy/avoidable, and 'didn't change', which sounds less natural than the present perfect in this context.
  - [old/terminology/major] Used 'dysfunctional' instead of the required 'unhelpful'
  - [old/style/minor] Missing the action verb (e.g., 'Swipe') making it feel slightly abrupt/unclear for UX

#### 🟢 en `/notification_every_day_5_head` — NEW лучше (2:0)

- **RU**: 🤔 "Это катастрофа!" — точно?
- **OLD**: 🤔 "This is a disaster!" — are you sure?
- **NEW**: 🤔 “It’s a catastrophe!” — are you sure?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B uses the canonical CBT term 'catastrophe' which directly maps to the Russian 'катастрофа' in the context of catastrophizing, whereas 'disaster' is more general. B also correctly uses typographic curly quotes.
  - [old/terminology/minor] Used 'disaster' instead of the more clinically relevant 'catastrophe' for a cognitive distortion context.
  - [old/style/minor] Used straight quotes instead of typographic curly quotes.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A uses 'catastrophe', which is the canonical CBT term for 'катастрофизация' (catastrophizing), whereas 'disaster' is a more general, less clinical term. Translation A also uses a more natural, conversational structure for the quote.
  - [old/terminology/minor] Used 'disaster' instead of the standard CBT term 'catastrophe'

#### 🟢 en `/question_resp_message` — NEW лучше (2:0)

- **RU**: Если вы видите оскорбительные, недопустимные или рекламные сообщения, нажмите
- **OLD**: If you see abusive, inappropriate, or promotional messages, tap
- **NEW**: If you see offensive, inappropriate, or promotional messages, tap
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In the context of user reporting or content moderation, 'offensive' is a more natural and standard term for messages than 'abusive', which often implies direct harassment or verbal attacks.
  - [old/style/minor] 'abusive' is slightly more intense and specific than the broader 'оскорбительные' (offensive).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A uses 'offensive', which is a more neutral and standard term for content moderation in UX. 'Abusive' in Translation B can imply a more severe, targeted harassment or personal attack, which might be too strong for general 'offensive' content.
  - [old/style/minor] 'Abusive' is slightly more aggressive/heavy than the neutral 'оскорбительные' in a general content moderation context.

#### 🟢 en `/test_clarification` — NEW лучше (2:0)

- **RU**: Пояснение от AI
- **OLD**: AI clarification
- **NEW**: AI explanation
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - In a UX context, 'explanation' is the standard, natural term for providing information or context. 'Clarification' implies that something was previously misunderstood or unclear, which adds an unnecessary nuance not present in the original.
  - [old/style/minor] clarification sounds slightly more formal and implies correcting a misunderstanding rather than just providing information
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - In a mental health/AI context, 'explanation' is the standard, natural term for providing information or context. 'Clarification' sounds like a correction of a misunderstanding or a formal legal/business term, which feels unnatural here.
  - [old/style/minor] Clarification sounds too formal and implies correcting a mistake rather than providing information.

#### 🟡 en `/mood_trend_stable`— вердикт неустойчив

- **RU**: Состояние почти не изменилось за {period}
- **OLD**: Overall, things changed very little over {period}
- **NEW**: Your mood has remained stable over {period}
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 90)
  - Translation A is more professional and fits the mental health app context by using 'mood' instead of the vague 'things'. Translation B is too colloquial and loses the specific focus on the user's state.
  - [old/style/major] The phrase 'things changed very little' is too vague and informal for a psychological tracking context; it lacks the precision of 'state/mood'.
  - [old/addition/minor] Added 'Overall', which is not in the original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A is a more accurate and natural way to convey 'almost no change' without adding unverified clinical assumptions. Translation B introduces 'stable', which is a specific psychological interpretation not present in the original, and changes the focus to 'mood' specifically, whereas the original uses the broader 'state'.
  - [new/mistranslation/major] The original says the state 'almost didn't change', while 'remained stable' implies a positive or controlled state, which is a different meaning.
  - [new/addition/minor] Added 'Your mood', which is not in the original text.

#### 🟡 en `/ab_premium_active_subtitle`— вердикт неустойчив

- **RU**: Вся информация о подписке внутри
- **OLD**: All subscription details inside
- **NEW**: All subscription details are available here
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a complete, natural English sentence suitable for a UI or informational text. Translation B is a literal, fragmented calque of the Russian structure that sounds unnatural in English.
  - [old/style/major] The phrase 'All subscription details inside' sounds like a label on a physical box or a broken translation; it lacks a verb and proper flow for a digital interface.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A is concise and follows UX best practices for short UI strings, whereas Translation B is unnecessarily wordy and sounds more like a formal sentence than a label.
  - [new/style/minor] Too wordy for a UI element; 'are available here' adds unnecessary verbosity compared to the punchy original.

#### 🟢 en `/errors_label_shortdesc` — NEW лучше (2:0)

- **RU**: Подмена реальности упрощённым ложным представлением
- **OLD**: Replacing reality with an oversimplified, inaccurate label
- **NEW**: Replacing reality with a simplified, inaccurate representation
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A accurately conveys the meaning of 'представление' as 'representation'. Translation B uses 'label', which is a specific cognitive distortion (labeling) and changes the meaning of the original phrase.
  - [old/mistranslation/major] The word 'label' refers to a specific cognitive distortion (labeling), whereas the original 'представление' refers to a mental representation or concept.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is a precise and professional rendering of the original. Translation A introduces the word 'label', which is not present in the source and changes the meaning from a 'representation' to a 'name/tag'.
  - [old/addition/minor] The word 'label' is added, which shifts the nuance from a mental representation to a categorization/labeling.

#### 🔴 en `/about_us_use_text` — OLD лучше (2:0)

- **RU**: Просто оставайтесь с нами и будьте здоровы!
- **OLD**: Just keep using the app and take care of yourself!
- **NEW**: Just stay with us and stay healthy!
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A is a literal calque of the Russian structure, which sounds unnatural and slightly ominous in English. Translation B uses idiomatic, warm, and supportive language ('take care of yourself') that fits the 'understanding friend' tone of the app.
  - [new/style/major] The repetition of 'stay' and the literal translation of 'оставайтесь с нами' sounds like a cult or a hostage situation rather than a friendly sign-off; it lacks the natural warmth of English UX writing.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A uses a natural, idiomatic expression ('take care of yourself') that fits the 'understanding friend' tone, whereas Translation B is a literal, clunky calque of the Russian structure.
  - [new/style/major] The phrase 'stay with us and stay healthy' sounds unnatural and robotic in English; it's a direct word-for-word translation of the Russian structure.

#### 🟢 en `/response_button` — NEW лучше (2:0)

- **RU**: Ответы пользователей
- **OLD**: User replies
- **NEW**: User responses
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In a psychological or data-driven context, 'responses' is the standard term for user input or answers to prompts, whereas 'replies' implies a conversational back-and-forth (like comments or chat).
  - [old/style/minor] 'Replies' sounds more like social media comments or chat messages rather than formal user data/answers.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - In a psychological or survey context, 'responses' is the standard term for answers provided by users, whereas 'replies' sounds like social media comments or email replies.
  - [old/style/minor] 'Replies' is more suited for messaging/comments rather than data or survey answers.

#### 🟢 en `/intro_new_age_subtitle` — NEW лучше (2:0)

- **RU**: Мы используем эту информацию, чтобы адаптировать примеры в упражнениях под ваш жизненный опыт
- **OLD**: We use this information to adapt examples in the exercises to your life experience
- **NEW**: We use this information to adapt the examples in your exercises to your life experience
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more natural and precise for a UX context. Adding 'the' before 'examples' and 'your' before 'exercises' makes the sentence flow better and clarifies that the exercises belong to the user's journey.
  - [old/style/minor] Missing articles/possessives ('the examples', 'your exercises') makes it sound slightly clipped or like a direct translation rather than natural English.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A correctly uses possessive adjectives ('your exercises'), which sounds more natural and personal in a supportive UX context, whereas B's use of 'the' feels slightly more detached and clinical.
  - [old/style/minor] The use of 'the examples in the exercises' is grammatically correct but lacks the warm, personalized tone ('your') expected in this app's UX.

#### 🟢 en `/drawer_changelang` — NEW лучше (2:0)

- **RU**: Изменить язык
- **OLD**: Change Language
- **NEW**: Change language
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 100)
  - According to the project's style guide, UI strings must use sentence case (only the first word capitalized). Translation A follows this rule, while Translation B uses Title Case.
  - [old/style/minor] Uses Title Case instead of sentence case for a UI label
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - According to the project's style guide, UI strings must use sentence case (only the first word capitalized).
  - [old/style/minor] Uses Title Case instead of sentence case

#### 🟡 en `/benefit_password`— вердикт неустойчив

- **RU**: Пароль
- **OLD**: Passcode
- **NEW**: Password
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - In a digital context, 'Password' is the standard term for a character-based security string, whereas 'Passcode' typically refers to a numeric PIN used for device unlocking.
  - [old/style/minor] Passcode implies a numeric code, which might be too specific if the system allows alphanumeric passwords.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In modern mobile UX, 'Passcode' is the standard term for a numeric or alphanumeric security code used to unlock an app or device, whereas 'Password' often implies a longer, more complex string used for account authentication.
  - [new/style/minor] Password is slightly more formal/traditional and less common for quick app entry/unlocking compared to passcode.

#### 🟢 en `/story_base_description_2` — NEW лучше (2:0)

- **RU**: Этот курс предназначен для всех, кто стремится понять себя и преодолеть психологические проблемы, такие как стресс, тревога и депрессия, с помощью проверенных временем техник и стратегий.
- **OLD**: This course is for anyone who wants to understand themselves and overcome challenges like stress, anxiety, or depression using proven strategies.
- **NEW**: This course is designed for anyone striving to understand themselves and overcome challenges like stress, anxiety, and depression using time-tested techniques.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more sophisticated and better captures the 'expert friend' tone with 'striving to' and 'time-tested techniques'. Translation B is slightly more repetitive and loses the 'strategies' part of the original.
  - [old/omission/minor] Missing 'strategies' which was in the original.
  - [old/style/minor] The phrasing 'anyone who wants to' is a bit more basic/clunky compared to 'anyone striving to'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is more accurate to the original's nuance and tone. It correctly includes 'time-tested techniques' and 'striving', whereas A simplifies the text too much and omits 'techniques'.
  - [old/omission/minor] Omitted 'techniques' (техник) and 'time-tested' (проверенных временем), simplifying the phrase to just 'proven strategies'.
  - [old/style/minor] The use of 'or' instead of 'and' slightly changes the meaning of the list of challenges.

#### 🟡 en `/banner_update_text`— вердикт неустойчив

- **RU**: Ваша версия устарела на {version} релизов. Нажмите, чтобы обновиться!
- **OLD**: You're {version} versions behind. Tap to update!
- **NEW**: Your version is {version} release(s) behind. Tap to update!
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and follows the original's structure by including the word 'releases', whereas B replaces it with 'versions', which is slightly less accurate in a software context.
  - [old/terminology/minor] Used 'versions' instead of 'releases' as per the original text.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A is much more natural and idiomatic for a mobile app interface. Translation B is clunky and uses a redundant 'release(s)' construction which is rarely seen in high-quality UX writing.
  - [new/style/minor] The use of 'release(s)' is awkward and creates a heavy, non-native feel compared to the smooth 'versions behind' in A.

#### 🟡 en `/intro_new_cbt_subtitle`— вердикт неустойчив

- **RU**: Мы подберём подходящий темп
- **OLD**: We’ll tailor the pace to you
- **NEW**: We’ll find the right pace for you
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A sounds more natural and supportive, following the 'understanding friend' tone. Translation B is slightly more formal and uses 'tailor to you', which is grammatically acceptable but feels a bit more like a business service than a personal journey.
  - [old/style/minor] The phrasing 'tailor the pace to you' is a bit stiff for a warm, supportive app interface compared to the more idiomatic 'find the right pace'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'tailor', which sounds more professional and personalized, perfectly capturing the nuance of 'подберём подходящий' in a supportive, expert tone. Translation B is grammatically correct but sounds slightly more generic.

#### 🔴 en `/tutorial_interrupted` — OLD лучше (2:0)

- **RU**: Обучение прервано
- **OLD**: Tutorial interrupted
- **NEW**: Learning interrupted
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - In the context of an app or software, 'Tutorial' is the standard term for a guided learning process, whereas 'Learning' is too abstract and sounds like a general state of being.
  - [new/style/minor] Sounds unnatural for a UI message; 'Learning interrupted' is too vague for a system notification.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - In the context of an app or game, 'обучение' refers to a tutorial, whereas 'learning' sounds like a general process of acquiring knowledge. 'Tutorial interrupted' is the standard UX term for this situation.
  - [new/style/major] Using 'learning' sounds unnatural for a software feature; it should be 'tutorial'.

#### 🟢 en `/story_distortions_description_3` — NEW лучше (2:0)

- **RU**: Перед началом курса настоятельно рекомендуем пройти наш специализированный тест на дисфункциональные убеждения — это даст чёткое представление о ваших личных неадаптивных схемах.
- **OLD**: Before starting, we strongly recommend taking our specialized dysfunctional beliefs test. It will give you a clearer picture of your personal patterns.
- **NEW**: Before starting, we highly recommend taking our specialized test for unhelpful beliefs — it will give you a clear picture of your personal patterns.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Translation B correctly uses the project-approved term 'unhelpful beliefs' instead of the outdated/incorrect 'dysfunctional beliefs'. It also maintains the flow and structure of the original more effectively.
  - [old/terminology/major] Used 'dysfunctional beliefs' instead of the required 'unhelpful beliefs'.
  - [old/omission/minor] Omitted the 'clear picture' nuance by using 'clearer' (comparative) and slightly simplified the second sentence structure.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A follows the project's terminology guidelines by using 'unhelpful beliefs' instead of the outdated/incorrect 'dysfunctional beliefs'. It also maintains a smoother flow with the em dash.
  - [old/terminology/major] Used 'dysfunctional beliefs' instead of the required 'unhelpful beliefs'.
  - [old/style/minor] The use of 'clearer' (comparative) instead of 'clear' (original) adds an unrequested comparison.

#### 🔴 en `/comparison_title` — OLD лучше (2:0)

- **RU**: Аргументы за и против
- **OLD**: Pros and cons
- **NEW**: Arguments for and against
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - While both are grammatically correct, 'Pros and cons' is the idiomatic standard for headings in English, whereas 'Arguments for and against' sounds slightly more formal and academic.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - Translation A is the most natural, idiomatic, and concise way to express this concept in English, especially for a UI or heading. Translation B is grammatically correct but sounds slightly more formal and wordy than necessary for a modern app.
  - [new/style/minor] A bit too formal/wordy for a standard heading; 'Pros and cons' is the more common idiomatic equivalent.

#### 🟢 en `/story_base_description_3` — NEW лучше (2:0)

- **RU**: Узнайте, как изменить негативные мысли и поведенческие паттерны, чтобы вести более счастливую и здоровую жизнь.
- **OLD**: Learn how to change negative thinking patterns into a healthier outlook on life.
- **NEW**: Learn how to change unhelpful thoughts and behavioral patterns to lead a happier, healthier life.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is a precise, idiomatic, and professional translation that adheres to all CBT terminology guidelines. Translation B is an oversimplification that omits a significant part of the original meaning (behavioral patterns) and changes the core message.
  - [old/omission/major] The phrase 'behavioral patterns' (поведенческие паттерны) is completely missing.
  - [old/mistranslation/minor] The original focuses on changing thoughts and behaviors to live a better life, whereas B shifts the focus to changing 'thinking patterns' into an 'outlook', which is a different semantic structure.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B is a precise and idiomatic translation that follows the CBT terminology guidelines. Translation A is an oversimplification that omits the 'behavioral patterns' part of the original and changes the meaning of the goal.
  - [old/omission/major] The phrase 'behavioral patterns' (поведенческие паттерны) is completely missing.
  - [old/mistranslation/minor] The original goal is to 'lead a life', whereas A changes it to 'change into an outlook', which shifts the meaning from action/lifestyle to perception.

#### 🟢 en `/use_discount` — NEW лучше (2:0)

- **RU**: Используйте скидку!
- **OLD**: Use the discount!
- **NEW**: Use your discount!
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - In English UX, using the possessive 'your' is much more natural and engaging for a call to action than the impersonal 'the'.
  - [old/style/minor] Sounds slightly impersonal and detached compared to the standard 'your discount'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 80 / NEW 98)
  - In English UX writing, using the possessive 'your' makes the call to action feel more personal and engaging, whereas 'the discount' sounds slightly detached and robotic.
  - [old/style/minor] Sounds a bit impersonal/stilted compared to the standard 'your discount'

#### 🟡 en `/intro_setup_complete`— вердикт неустойчив

- **RU**: Настройка завершена! Теперь приложение предложит вам наилучший опыт использования!
- **OLD**: All set! The app can now offer the best experience for you.
- **NEW**: Setup complete! Now the app will provide you with the best possible experience.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and follows the 'warm, expert friend' tone, using a friendly 'All set!' instead of the robotic 'Setup complete!'.
  - [new/style/minor] The phrasing 'provide you with the best possible experience' is a bit heavy and sounds like a formal corporate disclaimer rather than a friendly app notification.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 92)
  - Translation A is more professional and flows better as a standard onboarding message. Translation B feels slightly clunky with 'offer the best experience for you'.
  - [old/style/minor] The phrasing 'offer the best experience for you' is a bit wordy and less idiomatic than 'provide you with the best experience'.

#### 🟢 en `/errors_maybe_shortdesc` — NEW лучше (2:0)

- **RU**: Попытка переиграть прошлое снова и снова
- **OLD**: Replaying scenarios over and over
- **NEW**: Ruminating on the past and replaying events over and over
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation B captures the psychological essence of 'переиграть прошлое' (ruminating on the past) and maintains the depth of the original, whereas A is a bit too generic and loses the 'past' aspect.
  - [old/omission/major] The concept of 'the past' (прошлое) is missing, making the phrase feel incomplete compared to the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation A captures the full meaning of the original, including the psychological nuance of 'ruminating', whereas B is an oversimplification that loses the core concept of 'trying to change/re-play the past'.
  - [old/omission/major] Missing the concept of 'the past' and the repetitive attempt to process/change it, reducing it to just 'scenarios'.

#### 🟢 en `/correct_answer` — NEW лучше (2:0)

- **RU**: Верная формулировка:
- **OLD**: Correct wording:
- **NEW**: Correct phrasing:
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - While both are grammatically correct, 'phrasing' sounds more natural and idiomatic in a psychological or linguistic context when referring to how something is expressed. 'Wording' is slightly more clinical or mechanical.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 95)
  - Both are grammatically correct, but 'phrasing' is more natural in a UX context when referring to how something is expressed, whereas 'wording' is slightly more formal/stiff.

#### 🟡 en `/auth_v2_slider_phrase_4`— вердикт неустойчив

- **RU**: Ясный разум
- **OLD**: Clear mind
- **NEW**: A clear mind
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - For a title or a heading, the zero-article version 'Clear mind' is more punchy, modern, and standard for UX/UI. Translation B is grammatically correct but feels slightly more like a descriptive phrase than a clean header.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A follows standard English grammar for a title or a standalone phrase by including the indefinite article, making it sound natural and complete. Translation B sounds like a clipped, telegraphic heading, which is less polished for a mental well-being context.
  - [old/style/minor] Missing article makes it sound slightly unnatural/clipped compared to the standard 'A clear mind'

