# QA: слепое парное сравнение переводов — en-ui-full-postmerge-seed7

- **Дата**: 2026-09-17T18:48:06.972Z
- **Метка**: en-ui-full-postmerge-seed7
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/ui-en-canary-20260917
- **Файлы**: ui/cognitive_psy
- **Локали**: en
- **Сэмпл/файл**: 30
- **Seed**: 7
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 083fe55691caf6f53d5dca4426a032821a8a1724

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## ui/cognitive_psy

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 30 | 🟢 9 | 🔴 10 | ⚪ 0 | 🟡 11 | 0 / 0 | 47% |
| **итого** | 30 | 🟢 9 | 🔴 10 | ⚪ 0 | 🟡 11 | 0 / 0 | 47% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×14, style/major×4, mistranslation/major×1, addition/minor×1, terminology/major×1, omission/major×1; OLD — style/minor×10

### Детали пар (для спот-чека)

#### 🟢 en `/use_discount` — NEW лучше (2:0)

- **RU**: Используйте скидку!
- **OLD**: Use the discount!
- **NEW**: Use your discount!
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - In English UX writing, using the possessive 'your' makes the call to action feel more personal and engaging, whereas 'the discount' sounds slightly detached and robotic.
  - [old/style/minor] sounds a bit impersonal/generic compared to the standard 'your' in marketing
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A uses the possessive 'your', which is much more natural and engaging for a user-centric app interface, whereas B sounds slightly detached and robotic.
  - [old/style/minor] Use of the definite article 'the' instead of a possessive pronoun makes the tone less personal and more like a generic instruction.

#### 🔴 en `/daybook_ai_response_feedback_title` — OLD лучше (2:0)

- **RU**: Оценка сделает ИИ точнее
- **OLD**: Feedback improves AI accuracy
- **NEW**: Feedback helps the AI improve
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation B is a concise, professional UX string that accurately reflects the meaning. Translation A introduces 'helps' and changes the subject/object relationship, making it sound more like a general statement than a functional description.
  - [new/mistranslation/major] The original says the rating/assessment makes the AI more accurate, whereas A says feedback helps the AI improve (which is a broader, different concept).
  - [new/style/minor] Wordy for a UI element compared to the directness of the original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A correctly captures the causal relationship and the technical meaning (improving accuracy), whereas Translation B is vague and grammatically awkward. Translation A follows the UX principle of being concise and professional.
  - [new/style/major] The phrase 'helps the AI improve' is too vague and sounds like the AI is undergoing personal growth rather than increasing its precision/accuracy.
  - [new/mistranslation/major] The original specifies 'accuracy' (точность), which is lost in B.

#### 🔴 en `/errors_catastrophization_shortdesc` — OLD лучше (2:0)

- **RU**: Преувеличение последствий негативных событий
- **OLD**: Overestimating the consequences of negative events
- **NEW**: Exaggerating the consequences of negative events
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - In the context of cognitive distortions (CBT), 'overestimating' is the standard, more precise term for describing the cognitive process, whereas 'exaggerating' sounds more like a behavioral action or a stylistic choice.
  - [new/style/minor] Exaggerating is less idiomatic for describing a cognitive distortion than overestimating.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - In the context of cognitive distortions (CBT), 'overestimating' is the standard, more precise term for the cognitive error of misjudging the likelihood or impact of an event, whereas 'exaggerating' sounds more like a conscious or stylistic action.
  - [new/style/minor] Exaggerating is less idiomatic for describing a cognitive distortion than overestimating.

#### 🟡 en `/coping_finish_text`— вердикт неустойчив

- **RU**: Вы проработали все деструктивные мысли
- **OLD**: You've worked through all unhelpful thoughts
- **NEW**: You’ve worked through all the unhelpful thoughts
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A is more natural and idiomatic for a celebratory or summary statement. In English, when referring to a completed set of tasks or thoughts in a general sense, the zero article is often preferred over the definite article 'the', which can make the sentence feel slightly more heavy or specific to a previously mentioned list.
  - [new/style/minor] The use of 'the' makes the sentence sound slightly more formal and less like a natural UX achievement message.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A correctly uses the definite article 'the' to refer to the specific set of unhelpful thoughts the user has just processed, whereas B sounds overly general and unnatural in this context.
  - [old/style/minor] Missing the definite article 'the' before 'unhelpful thoughts', making it sound like a general statement rather than a specific achievement.

#### 🔴 en `/homeBotAppUpdated0` — OLD лучше (2:0)

- **RU**: Я обновился, пока тебя не было. Давай посмотрим, что нового добавили разработчики!
- **OLD**: I got an update while you were away. Let’s take a look at what the developers have added!
- **NEW**: I’ve updated while you were away. Let’s see what the developers have added!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A uses the idiomatic 'got an update' which sounds natural for a character/app context. Translation B uses 'I've updated', which sounds like the character performed a software update on themselves, creating a slightly awkward personification.
  - [new/style/minor] The phrasing 'I've updated' is a bit clunky and sounds more like a technical status than a natural conversational opening.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation B sounds much more natural for a character/companion speaking to a user. Translation A uses 'I've updated', which sounds like the speaker performed a software update on themselves, whereas 'I got an update' correctly implies receiving new content.
  - [new/style/major] The phrase 'I've updated' is a bit clunky and sounds like a system process rather than a character's natural speech; it lacks the idiomatic 'got an update' or 'was updated'.

#### 🟡 en `/intro_new_cbt_subtitle`— вердикт неустойчив

- **RU**: Мы подберём подходящий темп
- **OLD**: We’ll tailor the pace to you
- **NEW**: We’ll find the right pace for you
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'tailor', which sounds more professional and personalized, perfectly capturing the nuance of 'подберём подходящий' in a supportive, expert tone. Translation B is grammatically correct but sounds slightly more generic.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more natural and follows the 'understanding friend' tone, whereas B sounds slightly more formal/mechanical. A also avoids the awkward prepositional structure of B.
  - [old/style/minor] The phrasing 'tailor the pace to you' is slightly clunky compared to the more idiomatic 'find the right pace for you'.

#### 🟡 en `/homeBotHeader1`— вердикт неустойчив

- **RU**: Надеюсь, у тебя сегодня спокойный и хороший день
- **OLD**: Hope you’re having a calm and good day today
- **NEW**: I hope you’re having a calm and good day.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation A is more natural for a friendly, supportive app interface as it omits the subject 'I', which is common in casual, warm English. Translation B is grammatically perfect but feels slightly more formal/stiff.
  - [new/style/minor] The inclusion of 'I' makes the tone slightly more formal than the original's casual warmth.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is a complete, grammatically perfect sentence that follows the warm, supportive tone. Translation B is slightly more informal due to the dropped subject, which is acceptable in speech but less polished for a high-quality app interface.
  - [old/style/minor] Dropped subject 'I' makes it feel slightly more like a casual text message than a professional app greeting; 'today' at the end is slightly redundant given the context.

#### 🟡 en `/homeBotTestExpired5`— вердикт неустойчив

- **RU**: Прошло уже немало времени с момента прохождения <b>{testName}</b>. Давай посмотрим, что изменилось!
- **OLD**: Quite a while has passed since you took <b>{testName}</b>. Let’s see what’s changed!
- **NEW**: It’s been quite a while since you took the <b>{testName}</b> test. Let’s see what has changed!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A sounds more natural and conversational, fitting the 'understanding friend' tone. Translation B is slightly more formal and repetitive due to the addition of 'test' and the lack of contraction in 'what has changed'.
  - [new/addition/minor] Added 'test' which wasn't in the original (though acceptable in English, it's redundant here).
  - [new/style/minor] Used 'what has changed' instead of the more natural contraction 'what's changed'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A sounds much more natural and conversational, using the standard 'It’s been...' construction. Translation B is grammatically correct but feels slightly formal and stiff for a supportive app context.
  - [old/style/minor] The construction 'Quite a while has passed' is a bit heavy/formal compared to the idiomatic 'It's been quite a while'.

#### 🟡 en `/auth_v2_continue_email`— вердикт неустойчив

- **RU**: Продолжить через Email
- **OLD**: Continue with Email
- **NEW**: Continue with email
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 100)
  - Translation A follows the 'sentence case' rule for UI elements, whereas Translation B uses unnecessary capitalization for 'Email'.
  - [old/style/minor] Incorrect capitalization: 'Email' should be lowercase in sentence case.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 95)
  - In UI design, 'Email' is often treated as a proper noun or a specific method/service, and capitalizing it follows standard UX patterns for buttons. However, the main reason A wins is that B's lowercase 'email' is slightly less common for a primary action button in this context.
  - [new/style/minor] Lowercase 'email' is acceptable but less standard for a prominent action button compared to Title Case or Sentence Case where the method is emphasized.

#### 🟡 en `/mood_extremes_best_part`— вердикт неустойчив

- **RU**: За 7 дней лучший показатель — {date}
- **OLD**: Over the past 7 days, your best score was {date}
- **NEW**: Best score over the last 7 days — {date}
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and follows the UX pattern for dashboard metrics, whereas B is too wordy and conversational for a simple data label.
  - [old/style/minor] Unnecessarily long and uses a full sentence structure where a concise label is preferred in UI.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A sounds more natural and conversational, following the 'understanding friend' tone, whereas B is a bit clipped and reads like a raw data label.
  - [new/style/minor] The dash and the structure feel slightly more like a technical report than a warm, supportive app interface.

#### 🟢 en `/homeBotStatsDaysMissed3` — NEW лучше (2:0)

- **RU**: Заметил, что ты не заходил <b>{days}</b> д. Если тебе нужна была пауза — это абсолютно нормально. Здорово, что ты здесь.
- **OLD**: I noticed you haven’t visited for <b>{days}</b> days. If you needed a pause, that’s completely fine. It’s great to have you here.
- **NEW**: I noticed you haven’t visited for <b>{days}</b> days. If you needed a break, that’s completely okay. It’s great to see you here.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation A uses 'break', which is the natural idiomatic way to describe a hiatus in English, whereas 'pause' in B sounds slightly mechanical/translated. 'Great to see you here' is also a more common, warm greeting than 'great to have you here' in this context.
  - [old/style/minor] use of 'pause' instead of 'break' sounds slightly unnatural for a user hiatus
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses 'break', which is more idiomatic for a pause in activity, and 'great to see you here', which sounds more natural and welcoming for a returning user than the slightly more formal 'great to have you here'.
  - [old/style/minor] 'pause' is a bit literal; 'break' is more common in this context. 'Great to have you here' is acceptable but slightly less warm than 'great to see you here'.

#### 🟢 en `/release_feedback_title` — NEW лучше (2:0)

- **RU**: Понравились изменения? А может, что-то сломалось?
- **OLD**: Do you like the changes—or did something break?
- **NEW**: Like the changes? Or is something broken?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is punchy, natural, and fits the casual UX tone perfectly. Translation B is grammatically correct but feels too heavy and formal for a quick feedback prompt due to the em dash and the auxiliary 'Do you'.
  - [old/style/minor] The use of an em dash and full auxiliary verbs makes the sentence feel too long and formal for a microcopy feedback loop.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B is more natural for a modern app interface, using a conversational, punchy tone. Translation A is grammatically correct but feels slightly more formal and heavy due to the full sentence structure and the em dash.
  - [old/style/minor] A bit too formal/heavy for a quick feedback prompt; the em dash is grammatically fine but less 'snappy' than the original's two short questions.

#### 🟢 en `/alert_sync_success` — NEW лучше (2:0)

- **RU**: Синхронизация завершена
- **OLD**: Sync completed
- **NEW**: Sync complete
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - In UX writing, 'Sync complete' is the standard, more natural way to indicate a finished state. 'Sync completed' sounds slightly more like a formal log entry rather than a smooth interface message.
  - [old/style/minor] Sounds a bit more like a technical status report than a user-friendly notification.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - In UI/UX design, 'Sync complete' is the standard, punchy way to indicate a finished process. 'Completed' sounds slightly more formal and heavy for a status message.
  - [old/style/minor] slightly more formal/wordy than standard UX patterns

#### 🔴 en `/discount_hint` — OLD лучше (2:0)

- **RU**: Скидка будет действовать до конца дня
- **OLD**: Valid until the end of today
- **NEW**: Discount is valid until the end of the day
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A is more concise and follows UX best practices for short notifications/labels. Translation B is grammatically correct but feels slightly heavy and wordy for a UI context.
  - [new/style/minor] Unnecessarily wordy for a UI string; 'Discount is' is implied and adds cognitive load.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B is more concise and natural for a UI/marketing context. Translation A uses a slightly heavy 'is valid' construction which is grammatically correct but less punchy than the standard 'Valid until' pattern.
  - [new/style/minor] A bit wordy for a notification or label; 'is valid' is less common in UX than the direct 'Valid until'.

#### 🟡 en `/forever`— вердикт неустойчив

- **RU**: Навсегда
- **OLD**: Lifetime
- **NEW**: Forever
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - In the context of subscriptions or digital services, 'Lifetime' is the standard industry term for a one-time purchase, whereas 'Forever' sounds overly dramatic and non-professional.
  - [new/style/major] Sounds too poetic/emotional for a UI/subscription context; lacks professional UX tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - Translation A is a direct and natural equivalent for 'Навсегда'. Translation B ('Lifetime') changes the meaning to a noun/adjective referring to a duration of life, which is not what the original implies.
  - [old/mistranslation/major] The word 'Lifetime' refers to the duration of a person's life or a period of time, whereas 'Навсегда' is an adverb meaning 'forever'.

#### 🟢 en `/homeBotQuoteIntro6` — NEW лучше (2:0)

- **RU**: Предлагаю ненадолго остановиться и прислушаться к этой мысли
- **OLD**: I suggest pausing for a moment and listening to this thought
- **NEW**: I suggest pausing for a moment to listen to this thought
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A uses the infinitive 'to listen', which correctly expresses the purpose of pausing, creating a smoother and more natural flow. Translation B uses 'and listening', which sounds slightly clunky and creates a repetitive structure.
  - [old/style/minor] The parallel structure 'pausing and listening' is grammatically correct but less idiomatic than 'pausing to listen' in this context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses a more natural infinitive construction ('to listen') to express purpose, whereas Translation A uses a gerund ('and listening') which sounds slightly more like a list of two separate actions rather than a single cohesive suggestion.
  - [old/style/minor] The 'and + -ing' structure is grammatically correct but feels slightly less fluid/purpose-driven than the infinitive 'to listen' in this context.

#### 🔴 en `/mood_period_last_week` — OLD лучше (2:0)

- **RU**: прошлой неделей
- **OLD**: last week
- **NEW**: The last week
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 100 / NEW 60)
  - In English, when referring to the week that has just passed, the definite article 'the' is not used unless it's part of a specific prepositional phrase or context. 'Last week' is the natural, idiomatic way to express this.
  - [new/style/major] Unnecessary use of the definite article 'the' makes it sound like a non-native translation or a fragment of a different sentence structure.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - In the context of a UI label or a heading (implied by the fragment), 'last week' is the standard, natural way to denote the previous week. Adding the definite article 'The' makes it sound more like a specific duration within a sentence rather than a concise label.
  - [new/style/minor] The use of 'The' makes the phrase feel more like a noun phrase in a sentence rather than a clean, concise UI heading or label.

#### 🔴 en `/diary_subtitle` — OLD лучше (2:0)

- **RU**: Глубокая проработка ситуации
- **OLD**: Deep dive into your situation
- **NEW**: Deep situation analysis
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A uses an idiomatic, engaging expression ('Deep dive') that fits the 'understanding friend' tone, whereas B sounds like a dry, academic report title.
  - [new/style/major] Too formal and clinical (academic/bureaucratic style) for a mental health app; lacks the supportive tone of the original.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation B uses the idiomatic 'deep dive', which sounds much more natural and engaging for a mental health app, whereas A sounds like a dry academic report.
  - [new/style/minor] Sounds overly formal and clinical (analysis) compared to the supportive tone of the app.

#### 🟡 en `/sync_date_last`— вердикт неустойчив

- **RU**: Последняя синхронизация
- **OLD**: Last synced
- **NEW**: Last sync
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - In a UI context, 'Last synced' is the standard idiomatic way to indicate the status of the most recent synchronization. 'Last sync' is acceptable but sounds more like a label for a process rather than a status update.
  - [new/style/minor] Sounds slightly more like a noun phrase/label than a status indicator; 'Last synced' is more natural for a timestamp description.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - In UI design, 'Last sync' is the standard noun-based label for this status. 'Last synced' is a past participle that sounds slightly more like a sentence fragment than a clean interface label.
  - [old/style/minor] Uses a past participle instead of the standard noun phrase 'Last sync' for a status label.

#### 🟡 en `/daybook_gratitude_title`— вердикт неустойчив

- **RU**: Практика благодарности
- **OLD**: Gratitude practice
- **NEW**: Gratitude Practice
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - According to the style guide, UI strings and list items should use sentence case (only the first word capitalized), making 'Gratitude practice' the correct choice.
  - [new/style/minor] Uses Title Case instead of sentence case for a UI/list item
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - In the context of a section title or a feature name, Title Case (A) is more appropriate for a professional app interface. Translation B uses sentence case, which is fine for lists, but for a standalone heading, A is the standard.
  - [old/style/minor] Sentence case in a standalone heading feels less like a formal section title than Title Case.

#### 🔴 en `/comparison_add` — OLD лучше (2:0)

- **RU**: Добавить аргумент
- **OLD**: Add an argument
- **NEW**: Add argument
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 75)
  - Translation A correctly uses the indefinite article 'an' for a singular countable noun, following English grammar rules. Translation B sounds like broken English or a direct translation from Russian without articles.
  - [new/style/major] Missing indefinite article 'an' before the singular countable noun 'argument'
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - In English, a singular countable noun like 'argument' requires an article or a possessive. Translation B follows the rule for singular nouns, whereas A sounds like a clipped, unnatural command.
  - [new/style/minor] Missing article 'an' before the singular countable noun 'argument'

#### 🟢 en `/discount_activate_ai` — NEW лучше (2:0)

- **RU**: Активируйте AI-помощника
- **OLD**: Activate the AI assistant
- **NEW**: Activate your AI assistant
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Translation B follows the UX principle of using possessive pronouns ('your') to create a warmer, more personal connection with the user, which aligns with the 'understanding friend' tone of voice. Translation A is grammatically correct but sounds slightly more robotic/mechanical.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A follows the UX best practice of using possessive pronouns ('your') to create a personal, engaging connection with the user, which aligns with the 'understanding friend' tone. Translation B is grammatically correct but feels more detached and robotic.
  - [old/style/minor] Uses a definite article instead of a possessive pronoun, making the tone more impersonal/mechanical.

#### 🟢 en `/intro_title` — NEW лучше (2:0)

- **RU**: План на сегодня
- **OLD**: Plan for today
- **NEW**: Today's plan
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A uses the more natural, idiomatic possessive form common in mobile app UI, whereas B sounds slightly more formal or literal.
  - [old/style/minor] slightly more wordy/formal than the standard UX pattern
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - While both are grammatically correct, 'Today's plan' is more idiomatic and natural for a UI header or a daily planner context. 'Plan for today' sounds slightly more formal and wordy.
  - [old/style/minor] slightly less idiomatic for a mobile app header than the possessive form

#### 🟡 en `/homeBotDayFirst`— вердикт неустойчив

- **RU**: <p>Привет! Я твой проводник в этом приложении. Моя задача — быть рядом и бережно поддерживать тебя, когда тревожно, тяжело или просто нужно разложить мысли по полочкам.</p><p>Для начала я подобрал несколько простых шагов, чтобы ты мог познакомиться с практикам…
- **OLD**: <p>Hi! I’m your guide in this app. My job is to be by your side and gently support you when you feel anxious, when things are hard, or when you simply need to sort your thoughts out.</p><p>To start, I’ve picked out a few simple steps so you can get to know the…
- **NEW**: <p>Hi! I’m your guide in this app. My job is to be right here, supporting you gently whenever you feel anxious, overwhelmed, or just need to organize your thoughts.</p><p>To start, I’ve picked out a few simple steps so you can get to know the practices without…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A captures the warm, supportive 'expert friend' tone more effectively with idiomatic expressions like 'sort your thoughts out' and 'at your own pace'. Translation B is grammatically correct but feels slightly more formal and less rhythmic.
  - [new/style/minor] The phrase 'organize your thoughts' is a bit more clinical/stiff compared to the idiomatic 'sort your thoughts out'.
  - [new/style/minor] 'Provide exactly what you need' is slightly more generic than the more empathetic 'offer exactly what will help you'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and flows naturally, using 'overwhelmed' for 'тяжело' and 'stop by' which fits the warm, supportive tone perfectly. Translation B is slightly more repetitive and uses 'sense how you're doing', which sounds a bit unnatural in this context.
  - [old/style/minor] The repetition of 'when you feel... when things are... when you simply...' makes the rhythm heavy compared to the original.
  - [old/style/minor] 'Sense how you're doing' is a bit clunky; 'understand how you're feeling' (A) is much more natural for a guide.

#### 🟢 en `/sleep_trend_worsened` — NEW лучше (2:0)

- **RU**: Качество сна заметно ухудшилось за {period} на
- **OLD**: Your sleep quality worsened noticeably over {period} by
- **NEW**: Sleep quality has noticeably worsened over {period} by
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B uses the Present Perfect tense, which is grammatically correct for a trend that started in the past and continues to the present, whereas A uses Past Simple. B also sounds more natural for a data-driven insight.
  - [old/style/minor] Uses Past Simple instead of Present Perfect, making it sound like a completed event in the past rather than a current trend.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more natural and follows the standard English pattern for describing trends. Translation B's word order ('worsened noticeably') is slightly clunky compared to the adverb-verb placement in A.
  - [old/style/minor] The placement of 'noticeably' after the verb sounds less idiomatic than 'noticeably worsened'.

#### 🔴 en `/story_distortions_description_2` — OLD лучше (2:0)

- **RU**: Наш курс поможет вам не только узнать о таких убеждениях, но и активно работать над их изменением. Проходя курс, вы сможете преобразить свою жизнь, найти внутреннюю гармонию и счастье!
- **OLD**: Our course gives you a chance not only to learn about these beliefs, but also to actively work on changing them. By the end, you can transform your life and find inner balance!
- **NEW**: Our course will help you not only identify these patterns but also actively work on changing them to transform your life and find inner harmony.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Translation B is much closer to the original meaning and tone. Translation A uses 'patterns' instead of 'beliefs' (a terminology error) and omits the second sentence's emotional impact, merging it into a single, flatter sentence.
  - [new/terminology/major] Used 'patterns' instead of 'beliefs' (убеждения).
  - [new/omission/major] The second sentence is merged and loses the enthusiastic, encouraging tone of the original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Translation A captures the encouraging, warm tone of the original and maintains the structure of the two sentences. Translation B is too condensed, loses the emotional impact of the second sentence, and uses 'patterns' instead of 'beliefs'.
  - [new/terminology/major] Used 'patterns' instead of 'beliefs' (убеждения).
  - [new/omission/minor] Lost the emotional emphasis and the specific mention of 'happiness' (счастье).
  - [new/style/minor] The sentence is overly long and loses the 'inspiring' rhythm of the original.

#### 🔴 en `/gooseCompanionSpeechStreak` — OLD лучше (2:0)

- **RU**: Хорошо, что ты здесь!
- **OLD**: Glad you're here!
- **NEW**: It’s good to see you!
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B is a more natural, warm, and idiomatic way to welcome a user in a mental health app, perfectly capturing the supportive tone. Translation A is grammatically correct but sounds slightly more formal and literal, as if meeting someone in person rather than arriving in an app.
  - [new/style/minor] Sounds a bit more like a standard greeting ('Good to see you') rather than a warm welcome to a space ('Glad you're here').
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A is a perfect, idiomatic match for the warm, casual tone of the original. Translation B, while natural, changes the meaning from 'being here' to 'seeing you', which might not apply if the interaction is text-based.
  - [new/mistranslation/minor] Changes 'being here' to 'seeing you', which is a slight shift in meaning.

#### 🔴 en `/intro_new_cbt_opt_current` — OLD лучше (2:0)

- **RU**: Сейчас работаю с психологом
- **OLD**: I’m currently working with a psychologist
- **NEW**: Currently working with a psychologist
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B is more natural and complete for a user-facing interface. While A is acceptable as a status or label, B follows the 'warm, supportive friend' tone and uses the appropriate contraction ('I’m') as per the style guide.
  - [new/style/minor] Sounds slightly clipped or like a status label rather than a natural sentence; lacks the personal touch of 'I'm'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - Translation A is a complete, grammatically correct sentence that sounds natural for a user describing their status. Translation B is a fragment, which might work in a UI label, but as a statement of fact, it feels clipped and less like a natural thought.
  - [new/style/minor] Omission of the subject 'I', making it sound like a status label rather than a natural sentence.

#### 🟢 en `/believe_description` — NEW лучше (2:0)

- **RU**: Оцените, насколько вы уверены, что данная мысль правдива.
- **OLD**: Rate how strongly you believe this thought is true.
- **NEW**: Rate how certain you are that this thought is true.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation B is more direct and natural for a UI instruction, perfectly capturing the nuance of 'насколько вы уверены'. Translation A is grammatically correct but slightly more wordy and less idiomatic for a rating prompt.
  - [old/style/minor] slightly more verbose than necessary for a rating scale instruction
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is a perfect, idiomatic match for the CBT concept of 'belief rating' and the original Russian phrasing. Translation B, while grammatically correct, is slightly wordier and less precise in a clinical/UX context.
  - [old/style/minor] The phrasing 'how strongly you believe this thought is true' is slightly more heavy/clunky than the standard 'how certain you are'.

#### 🟡 en `/alert_sent_error`— вердикт неустойчив

- **RU**: Ошибка отправки
- **OLD**: Couldn't send message
- **NEW**: Failed to send message
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B sounds more natural and conversational for a mobile app interface, whereas A is slightly more formal/system-like. However, both are acceptable, but B fits the 'understanding friend' tone better.
  - [new/style/minor] Sounds a bit more like a dry system error than a friendly app notification.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B uses the standard, professional UX pattern for error messages. Translation A sounds slightly more informal/conversational, which is less common for a system error notification.
  - [old/style/minor] Sounds a bit more like a spoken sentence than a standard system error status.

