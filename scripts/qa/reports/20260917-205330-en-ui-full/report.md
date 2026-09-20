# QA: слепое парное сравнение переводов — en-ui-full

- **Дата**: 2026-09-17T17:53:30.969Z
- **Метка**: en-ui-full
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/ui-en-canary-20260917
- **Файлы**: ui/cognitive_psy
- **Локали**: en
- **Сэмпл/файл**: 30
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: d3250dbd7dfc9ac0b19cbe2169803e2a048e143a

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## ui/cognitive_psy

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 30 | 🟢 13 | 🔴 9 | ⚪ 0 | 🟡 8 | 0 / 1 | 59% |
| **итого** | 30 | 🟢 13 | 🔴 9 | ⚪ 0 | 🟡 8 | 0 / 1 | 59% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×6, omission/minor×2, terminology/minor×1, style/major×1; OLD — style/minor×13, style/major×3, omission/major×2, mistranslation/major×2, terminology/major×2, terminology/minor×2, mistranslation/critical×1, addition/minor×1

### Детали пар (для спот-чека)

#### 🔴 en `/sleep_stability_stable` — OLD лучше (2:0)

- **RU**: На этой неделе качество сна было стабильным.
- **OLD**: Your sleep quality was stable this week.
- **NEW**: Your sleep was stable this week.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A accurately reflects the original 'качество сна' (sleep quality), whereas B omits 'quality', making it slightly less precise, though still natural.
  - [new/omission/minor] The word 'quality' is missing, which changes the focus from the quality of sleep to the sleep itself.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B is more accurate as it preserves the specific term 'quality' (качество) from the original, whereas A simplifies it, losing a nuance of the measurement.
  - [new/omission/minor] omitted 'quality' (качество)

#### 🟡 en `/mood_freq_worsened`— вердикт неустойчив

- **RU**: В {percent} дней настроение ухудшалось к вечеру
- **OLD**: On {percent} of days, your mood worsened by the evening
- **NEW**: On {percent} of days, your mood declined by evening
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more natural and follows standard English usage. Translation B lacks the necessary article before 'evening' and uses 'declined', which sounds slightly more formal/clinical than the original 'ухудшалось'.
  - [new/style/minor] Missing the article 'the' before 'evening' (should be 'by the evening').
  - [new/style/minor] 'declined' is a bit stiff compared to 'worsened' for a mood description.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 92)
  - Translation A uses 'declined', which sounds more natural and professional in a mental health context than the slightly more blunt 'worsened'.
  - [old/style/minor] The use of 'the evening' is grammatically correct but 'by evening' (as in A) is more idiomatic for describing a general pattern of time.

#### 🟢 en `/daybook_placeholder` — NEW лучше (2:0)

- **RU**: Я внимательно слушаю... Поделитесь тем, что накипело или, наоборот, порадовало. Любые детали важны
- **OLD**: What happened today? Describe a situation that triggered positive or negative emotions...
- **NEW**: I'm listening... Share what's been on your mind, whether it's something heavy or something that made you happy. Every detail matters.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 50 / NEW 98)
  - Translation B perfectly captures the warm, supportive 'expert friend' tone and accurately reflects the original meaning. Translation A is a complete hallucination that changes the intent from an empathetic listening prompt to a generic situational question.
  - [old/mistranslation/critical] The translation completely changes the meaning: instead of 'I am listening', it asks 'What happened today?', and replaces the emotional nuance with a clinical 'describe a situation'.
  - [old/omission/major] The phrase 'Any details are important' is missing.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 40 / NEW 95)
  - Translation A is a perfect transcreation that captures the warm, supportive tone of the original. Translation B is a complete mistranslation that changes the meaning and intent entirely.
  - [old/mistranslation/critical] The translator replaced the original sentiment with a completely different prompt ('What happened today? Describe a situation...')
  - [old/omission/major] The core message of 'I am listening' and 'share what's on your mind' is lost.

#### 🔴 en `/sharepsy_title` — OLD лучше (2:0)

- **RU**: Поделиться с психологом
- **OLD**: Share with your psychologist
- **NEW**: Share with a psychologist
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - In a mental health app context, 'your psychologist' is more natural and personal, following the 'understanding friend' tone. Translation A is grammatically correct but sounds slightly more detached/generic.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - In the context of a mental health app, the user is interacting with their specific assigned professional, making the possessive 'your' much more natural and user-centric than the indefinite 'a'.
  - [new/style/minor] Using 'a psychologist' sounds slightly impersonal and detached in a UX context where the relationship is established.

#### 🔴 en `/intro_psy_button` — OLD лучше (2:0)

- **RU**: Личный кабинет психолога
- **OLD**: Psychologist dashboard
- **NEW**: Psychologist account
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - In a professional software context, 'dashboard' is the standard term for a user's personal area where they manage data and view statistics, whereas 'account' sounds more like billing or profile settings.
  - [new/style/minor] 'Account' is a bit generic and sounds more like a login/subscription area rather than a workspace for a professional.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - In a professional software context, 'dashboard' is the standard term for a user's personal area or control panel, whereas 'account' sounds like a login credential or a billing profile.
  - [new/style/minor] Sounds more like a login/profile setting rather than a functional workspace for a professional.

#### 🟢 en `/mood_sleep_slider_title` — NEW лучше (2:0)

- **RU**: Оцените свой сон
- **OLD**: How did you sleep today?
- **NEW**: Rate your sleep
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - Translation B is a direct and accurate translation of the imperative 'Оцените', which is standard for UI/UX. Translation A changes the meaning from a request to rate something to a question about the quality of sleep, which is a different user intent.
  - [old/mistranslation/major] The original is an instruction to rate (imperative), while A is a question about how the user slept.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - Translation A is a direct, accurate, and professional UI instruction that matches the imperative mood of the original. Translation B changes the meaning from a request to rate a metric to a conversational question about quality, which is less suitable for a tracking interface.
  - [old/mistranslation/major] The original is an instruction to rate (a metric/scale), whereas B is a conversational question about how the sleep was.

#### 🟡 en `/share_yes`— вердикт неустойчив

- **RU**: Вы успешно поделились записью!
- **OLD**: You shared the entry successfully!
- **NEW**: Entry shared successfully!
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A follows UX best practices for success messages by being concise and omitting unnecessary pronouns. Translation B is grammatically correct but sounds slightly more heavy and less like a standard app notification.
  - [old/style/minor] Too wordy for a success toast/notification; 'You shared...' is less idiomatic for system feedback than the passive/result-oriented 'Entry shared'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation A follows the original sentence structure and uses a natural, warm tone. Translation B sounds like a robotic system notification, which lacks the 'understanding friend' tone required by the style guide.
  - [new/style/minor] Too clipped and telegraphic; lacks the personal 'you' present in the original and the desired supportive tone.

#### 🟢 en `/intro_new_problem_grief` — NEW лучше (2:0)

- **RU**: Утрата близкого
- **OLD**: Loss of someone close
- **NEW**: Loss of a loved one
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A uses the idiomatic and standard English expression 'loss of a loved one', which is the most natural way to convey this concept in a mental health context. Translation B is grammatically correct but sounds slightly more literal and less polished.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B uses the idiomatic and standard English expression 'loss of a loved one', which is the natural way to refer to this topic in mental health contexts. Translation A is grammatically correct but sounds slightly clinical or literal.
  - [old/style/minor] sounds a bit more like a literal translation than a natural English idiom

#### 🟢 en `/coping_info_hint_1` — NEW лучше (2:0)

- **RU**: Влево, если вера в деструктивную мысль уменьшилась.
- **OLD**: Left if your belief in the dysfunctional thought decreased.
- **NEW**: Swipe left if belief in the unhelpful thought has decreased.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation B uses the correct project terminology ('unhelpful thought') and provides a clearer UX instruction ('Swipe left'). Translation A uses 'dysfunctional', which contradicts the glossary, and sounds slightly unnatural.
  - [old/terminology/major] Used 'dysfunctional' instead of the required 'unhelpful' for 'деструктивная мысль'.
  - [old/style/minor] Lacks a verb like 'Swipe', making the instruction feel slightly abrupt for a mobile UI.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A follows the project glossary by using 'unhelpful' instead of 'dysfunctional' and maintains a natural, professional UX tone. Translation B is too clipped and uses non-standard terminology.
  - [old/terminology/major] used 'dysfunctional' instead of the required 'unhelpful'
  - [old/style/minor] missing the imperative 'Swipe' makes it sound like a fragmented label rather than a clear instruction

#### 🟢 en `/coping_info_hint_3` — NEW лучше (2:0)

- **RU**: Вверх, если вера в деструктивную мысль не изменилась.
- **OLD**: Up if your belief in the dysfunctional thought didn't change.
- **NEW**: Swipe up if belief in the unhelpful thought hasn't changed.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A follows the project's terminology ('unhelpful belief/thought') and uses a natural UX pattern ('Swipe up'). Translation B uses an outdated term ('dysfunctional') and a clunky, non-idiomatic structure.
  - [old/terminology/major] Used 'dysfunctional' instead of the required 'unhelpful'
  - [old/style/major] Starting with 'Up' is too abrupt and unnatural for a UI instruction; 'Swipe up' is the standard UX pattern
  - [old/style/minor] Used Past Simple 'didn't change' instead of Present Perfect 'hasn't changed', which is more appropriate for a state that persists to the present
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 95)
  - Translation B follows the project's terminology ('unhelpful') and uses the correct present perfect tense for a state that continues to the present. Translation A uses 'dysfunctional', which is explicitly marked as legacy/incorrect in the glossary, and 'didn't change' (past simple), which sounds unnatural for this context.
  - [old/terminology/major] Used 'dysfunctional' instead of the required 'unhelpful'
  - [old/style/major] Used Past Simple 'didn't change' instead of Present Perfect; also lacks the intuitive 'Swipe' action common in UX
  - [old/omission/minor] Missing the implied action 'Swipe' which makes the instruction clear

#### 🟢 en `/notification_every_day_5_head` — NEW лучше (2:0)

- **RU**: 🤔 "Это катастрофа!" — точно?
- **OLD**: 🤔 "This is a disaster!" — are you sure?
- **NEW**: 🤔 “It’s a catastrophe!” — are you sure?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B uses 'catastrophe', which is the canonical CBT term for 'катастрофизация' (catastrophizing), whereas 'disaster' is more generic. B also uses proper typographic curly quotes as required by the style guide.
  - [old/terminology/minor] uses 'disaster' instead of the more precise CBT term 'catastrophe'
  - [old/style/minor] uses straight quotes instead of typographic curly quotes
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A uses 'catastrophe', which is the canonical CBT term for 'катастрофизация' (catastrophizing), whereas 'disaster' is more colloquial and less precise in a psychological context. Translation A also uses proper curly quotes as per the style guide.
  - [old/terminology/minor] Used 'disaster' instead of the more clinically accurate 'catastrophe' for CBT context.
  - [old/style/minor] Used straight quotes instead of typographic curly quotes.

#### 🟢 en `/question_resp_message` — NEW лучше (2:0)

- **RU**: Если вы видите оскорбительные, недопустимные или рекламные сообщения, нажмите
- **OLD**: If you see abusive, inappropriate, or promotional messages, tap
- **NEW**: If you see offensive, inappropriate, or promotional messages, tap
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - In the context of user reports and content moderation, 'offensive' is the standard, natural term used by English-speaking platforms, whereas 'abusive' often implies direct harassment or verbal attacks rather than just the nature of the content.
  - [old/style/minor] 'abusive' is slightly more specific to behavior/harassment, while 'offensive' better covers the broad category of 'оскорбительные' messages in a UI context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A uses 'offensive', which is a more neutral and standard term for user-generated content moderation in a general app context. 'Abusive' in Translation B can sometimes imply a more severe level of harassment or personal attacks, which might be too strong for a general 'offensive' category.
  - [old/style/minor] 'Abusive' is slightly more aggressive/heavy than the neutral 'оскорбительные' in a general UI context.

#### 🟢 en `/test_clarification` — NEW лучше (2:0)

- **RU**: Пояснение от AI
- **OLD**: AI clarification
- **NEW**: AI explanation
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - In a UX context, 'explanation' is the standard, natural term for providing information or context. 'Clarification' implies that something was previously misunderstood or unclear, which adds an unnecessary nuance not present in the original.
  - [old/style/minor] clarification sounds slightly more formal and implies correcting a misunderstanding rather than just providing information
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - In a mental health/AI context, 'explanation' is the standard, natural term for providing information or clarifying a concept. 'Clarification' sounds more like a formal correction of a misunderstanding rather than a helpful AI insight.
  - [old/style/minor] Clarification sounds slightly too formal and implies correcting a mistake, whereas 'explanation' is more neutral and helpful for an AI assistant.

#### 🟡 en `/mood_trend_stable`— вердикт неустойчив

- **RU**: Состояние почти не изменилось за {period}
- **OLD**: Overall, things changed very little over {period}
- **NEW**: Your mood has remained stable over {period}
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 90)
  - Translation A is more professional and aligns with the mental health context by using 'mood' and 'stable', whereas B is too colloquial ('things changed') and vague.
  - [old/style/major] The phrase 'things changed very little' is too informal and lacks the precision expected in a mental health tracking app; it sounds like a casual conversation rather than a summary of a state/condition.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A accurately reflects the nuance of 'almost no change' without adding unverified interpretations. Translation B introduces a specific interpretation ('remained stable') which might be inaccurate if the user's state actually worsened or fluctuated, and it changes the subject from 'state' to 'mood'.
  - [new/mistranslation/major] The original 'almost no change' is neutral, whereas 'remained stable' implies a positive or controlled state, which is a subjective interpretation.
  - [new/style/minor] Changes the subject from the general 'state' to 'mood', which might not always be the case in the context of the app.

#### 🟡 en `/ab_premium_active_subtitle`— вердикт неустойчив

- **RU**: Вся информация о подписке внутри
- **OLD**: All subscription details inside
- **NEW**: All subscription details are available here
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a complete, natural English sentence suitable for a UI or informational text. Translation B is a literal, fragmented calque of the Russian structure that sounds unnatural and incomplete in English.
  - [old/style/major] The phrase 'All subscription details inside' sounds like a broken translation; in English, you need a verb or a more idiomatic way to express this (e.g., 'See details inside' or 'Details are inside').
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A is more concise and follows UX writing best practices for mobile interfaces, whereas B is unnecessarily wordy. A captures the punchy, direct tone of the original.
  - [new/style/minor] Too wordy for a UI element; 'are available here' adds unnecessary filler compared to the original.

#### 🟢 en `/errors_label_shortdesc` — NEW лучше (2:0)

- **RU**: Подмена реальности упрощённым ложным представлением
- **OLD**: Replacing reality with an oversimplified, inaccurate label
- **NEW**: Replacing reality with a simplified, inaccurate representation
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a precise and natural rendering of the original concept. Translation B introduces 'label', which is a specific cognitive distortion (labeling) and changes the meaning of the original phrase from a general concept to a specific technical term.
  - [old/mistranslation/major] The word 'label' changes the meaning from 'representation' (представление) to 'labeling' (навешивание ярлыков), which is a different cognitive distortion.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is a precise and professional rendering of the original. Translation A introduces the word 'label', which is not present in the source and changes the meaning from a 'representation' to a 'tag/label'.
  - [old/addition/minor] Added 'label' which narrows the meaning of 'представление' unnecessarily.

#### 🟡 en `/about_us_use_text`— вердикт неустойчив

- **RU**: Просто оставайтесь с нами и будьте здоровы!
- **OLD**: Just keep using the app and take care of yourself!
- **NEW**: Just stay with us and stay healthy!
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation A is a faithful and natural rendering of the original sentiment. Translation B introduces an unnecessary addition ('using the app') and changes the tone from a warm wish to a functional instruction.
  - [old/addition/minor] Added 'using the app' which is not in the original
  - [old/style/minor] The phrase 'keep using the app' sounds more like a business retention tactic than a warm closing
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A uses a natural, idiomatic English expression ('take care of yourself') that fits the supportive tone of a mental health app, whereas Translation B is a literal, clunky calque of the Russian structure.
  - [new/style/major] The phrase 'stay with us and stay healthy' sounds unnatural and robotic in English; it's a direct word-for-word translation of the Russian structure.

#### 🟢 en `/response_button` — NEW лучше (2:0)

- **RU**: Ответы пользователей
- **OLD**: User replies
- **NEW**: User responses
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In a psychological or data-driven context, 'responses' is the standard term for user input or answers to prompts, whereas 'replies' implies a conversational exchange or social media comments.
  - [old/style/minor] 'Replies' sounds more like social media comments or chat messages rather than formal user data/answers.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - In a psychological or survey context, 'responses' is the standard term for answers provided by users, whereas 'replies' sounds like social media comments or email replies.
  - [old/style/minor] 'Replies' is more suited for messaging/comments rather than data or survey answers.

#### 🔴 en `/points` — OLD лучше (2:0)

- **RU**: бал.
- **OLD**: pts.
- **NEW**: pts
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - The original text includes a period (full stop), which is preserved in translation B. Translation A omits it, which is an error in terms of fidelity to the source punctuation.
  - [new/omission/minor] missing the period present in the original
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - In English, abbreviations like 'pts.' (points) require a period to indicate they are shortened, whereas 'pts' without a period is less formal and can look like a typo in a UI context.
  - [new/style/minor] Missing period for the abbreviation 'pts.'

#### 🟢 en `/intro_new_age_subtitle` — NEW лучше (2:0)

- **RU**: Мы используем эту информацию, чтобы адаптировать примеры в упражнениях под ваш жизненный опыт
- **OLD**: We use this information to adapt examples in the exercises to your life experience
- **NEW**: We use this information to adapt the examples in your exercises to your life experience
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more natural and user-centric. Using 'the examples in your exercises' creates a better connection with the user than the slightly more detached 'examples in the exercises' in A.
  - [old/style/minor] The phrasing 'examples in the exercises' sounds a bit generic/clinical compared to the more personal 'your exercises'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A correctly uses possessive adjectives ('your exercises'), which sounds more natural and personal in a supportive UX context, whereas B feels slightly more detached and generic.
  - [old/style/minor] Missing 'your' before 'examples' and 'exercises' makes the sentence feel less personal and slightly more robotic compared to the warm tone required.

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
  - In a general software context, 'Password' is the standard term for authentication. 'Passcode' usually refers specifically to a numeric PIN used for device unlocking or quick access.
  - [old/style/minor] Passcode is more specific to numeric codes (like a phone PIN) and might feel slightly off if the field allows alphanumeric characters.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In modern mobile app UX, 'Passcode' is the standard term for a numeric or alphanumeric code used to unlock an app or device, whereas 'Password' often implies a longer, more complex string used for account authentication. Given the context of a mental health app, 'Passcode' feels more natural for local app security.
  - [new/style/minor] Password is slightly more formal/heavy for a quick app entry lock compared to Passcode.

#### 🔴 en `/auth_email_title` — OLD лучше (2:0)

- **RU**: Введите вашу электронную почту
- **OLD**: Enter your email
- **NEW**: Enter your email address
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - In modern UX writing, 'email' is the standard, concise way to refer to an email address. 'Email address' (A) is grammatically correct but feels slightly more formal and wordy for a digital interface.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 95)
  - In modern UX writing, 'email' is the standard, concise way to refer to an email address. Translation A is more direct and follows the principle of brevity for UI elements.
  - [new/style/minor] slightly more wordy than necessary for a modern interface

#### 🔴 en `/intro_new_gender_subtitle` — OLD лучше (2:0)

- **RU**: Реакции на стресс и контекст проблем часто отличаются. Это поможет нам точнее подбирать психологические практики и материалы
- **OLD**: Stress responses and the context behind what you’re going through can vary. This helps us tailor psychological exercises and content more closely to you
- **NEW**: Stress responses and the context of problems often differ. This helps us choose the most accurate psychological practices and materials for you
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Translation B sounds much more natural and empathetic, using 'tailor' and 'what you’re going through' instead of the clunky and literal 'context of problems'.
  - [new/style/minor] The phrase 'context of problems' is a bit heavy and literal (calque), and 'choose the most accurate' sounds slightly unnatural in this context.
  - [new/terminology/minor] Uses 'practices' instead of the more common 'exercises' for this context, though 'practices' is acceptable.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 78)
  - Translation A uses much more natural, empathetic, and idiomatic English ('the context behind what you’re going through', 'tailor... to you') which fits the 'understanding friend' tone. Translation B is a literal, clunky translation of the Russian structure ('context of problems', 'choose the most accurate').
  - [new/style/major] The phrase 'context of problems' sounds unnatural and robotic; 'choose the most accurate... practices' is a heavy calque from the Russian 'точнее подбирать'.

#### 🟢 en `/story_base_description_2` — NEW лучше (2:0)

- **RU**: Этот курс предназначен для всех, кто стремится понять себя и преодолеть психологические проблемы, такие как стресс, тревога и депрессия, с помощью проверенных временем техник и стратегий.
- **OLD**: This course is for anyone who wants to understand themselves and overcome challenges like stress, anxiety, or depression using proven strategies.
- **NEW**: This course is designed for anyone striving to understand themselves and overcome challenges like stress, anxiety, and depression using time-tested techniques.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more sophisticated and better captures the tone of a professional course. Translation B is slightly too simplistic and suffers from an omission of 'techniques' and 'strategies', which were both present in the original.
  - [old/omission/major] Missing 'techniques' (техник) and 'strategies' (стратегий) from the original text.
  - [old/style/minor] The phrasing 'is for anyone who wants' is a bit more colloquial/basic compared to the more professional 'is designed for anyone striving'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B is more faithful to the original's nuance and vocabulary, specifically capturing 'designed for' and 'time-tested techniques'.
  - [old/omission/minor] Missed 'designed for' (intended for) and 'time-tested techniques', simplifying the text too much.
  - [old/style/minor] Used 'or' instead of 'and', slightly changing the grouping of symptoms.

#### 🔴 en `/partner_test_title` — OLD лучше (2:0)

- **RU**: Ваш психолог онлайн
- **OLD**: Your online psychologist
- **NEW**: Your psychologist is online
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 75)
  - Translation B is a natural noun phrase used for services or titles, whereas Translation A sounds like a status report about a specific person's current connectivity.
  - [new/style/major] Sounds like a literal translation of 'is online'; in English, 'online psychologist' is the standard way to describe the service/type of professional.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 75)
  - Translation A is a concise, natural noun phrase suitable for a header or service title. Translation B is a full sentence that changes the meaning from 'an online service/professional' to a statement about a specific person's current status.
  - [new/style/major] Sounds like a status notification ('Your psychologist is currently online') rather than a service description.

#### 🟡 en `/banner_update_text`— вердикт неустойчив

- **RU**: Ваша версия устарела на {version} релизов. Нажмите, чтобы обновиться!
- **OLD**: You're {version} versions behind. Tap to update!
- **NEW**: Your version is {version} release(s) behind. Tap to update!
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and follows the original structure by including 'releases', whereas B uses 'versions' which is slightly less accurate in this context. Both are natural, but A is a better match for the source.
  - [old/terminology/minor] Uses 'versions' instead of 'releases' as specified in the original text.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A is much more natural and idiomatic for a mobile app UI. Translation B is clunky and uses a forced singular/plural construction that feels like a direct translation from Russian.
  - [new/style/minor] The use of 'release(s)' is awkward in a user-facing interface; 'versions behind' is the standard way to express this in English.

#### 🔴 en `/lv` — OLD лучше (2:0)

- **RU**: Ур. {level}
- **OLD**: Lv. {level}
- **NEW**: Lvl {level}
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Both are acceptable abbreviations for 'Level', but 'Lv.' is the more standard and widely recognized abbreviation in English UI/UX design.
  - [new/style/minor] 'Lvl' is less common than 'Lv.' in formal or standard gaming/app interfaces.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A uses the standard, widely accepted abbreviation for 'Level' in gaming and UI contexts. Translation B uses 'Lvl', which is less common and lacks the period typically used in formal or semi-formal abbreviations.
  - [new/style/minor] Non-standard abbreviation; 'Lv.' or 'Level' is preferred for better UX readability.

#### 🔴 en `/comparison_add_argument_against` — OLD лучше (2:0)

- **RU**: Добавить аргумент против мысли
- **OLD**: Add an argument against the thought
- **NEW**: Add argument against the thought
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B correctly uses the indefinite article 'an' before the singular countable noun 'argument', making it grammatically natural for a UI action. Translation A sounds slightly clipped and non-native due to the missing article.
  - [new/style/minor] Missing indefinite article 'an' before 'argument' makes it sound like a translation rather than natural English.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 75)
  - Translation A correctly uses the indefinite article 'an' before the singular countable noun 'argument', following English grammar rules. Translation B omits the article, which sounds unnatural and ungrammatical in this context.
  - [new/style/major] Missing indefinite article 'an' before 'argument'

#### 🟡 en `/intro_new_cbt_subtitle`— вердикт неустойчив

- **RU**: Мы подберём подходящий темп
- **OLD**: We’ll tailor the pace to you
- **NEW**: We’ll find the right pace for you
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more natural and follows the 'understanding friend' tone, whereas B sounds slightly more formal/mechanical. A also avoids the slightly awkward prepositional structure of B.
  - [old/style/minor] The phrasing 'tailor the pace to you' is grammatically correct but feels a bit more like marketing jargon than a warm, supportive tone.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'tailor', which sounds more professional and personalized, perfectly capturing the nuance of 'подберём подходящий' in a supportive, expert tone. Translation B is grammatically correct but sounds slightly more generic.

