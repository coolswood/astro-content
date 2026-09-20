# QA: слепое парное сравнение переводов — en-ui-plateau-seed123

- **Дата**: 2026-09-17T19:13:57.429Z
- **Метка**: en-ui-plateau-seed123
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/ui-en-canary-20260917
- **Файлы**: ui/cognitive_psy
- **Локали**: en
- **Сэмпл/файл**: 30
- **Seed**: 123
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 31f3b61b8ac692a1f2d70200931d7e6363c07a33

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## ui/cognitive_psy

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 30 | 🟢 15 | 🔴 6 | ⚪ 1 | 🟡 8 | 0 / 1 | 71% |
| **итого** | 30 | 🟢 15 | 🔴 6 | ⚪ 1 | 🟡 8 | 0 / 1 | 71% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×11, style/major×2; OLD — style/minor×12, terminology/major×4, style/major×3, addition/minor×1, terminology/minor×1, style/critical×1

### Детали пар (для спот-чека)

#### 🟢 en `/activities_popup_subtitle` — NEW лучше (2:0)

- **RU**: Оцените, насколько эффективна была практика, чтобы помочь другим людям.
- **OLD**: Rate its effectiveness to help others.
- **NEW**: Rate how effective this practice was to help others.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A is more natural and follows the 'expert friend' tone, whereas B sounds overly formal and slightly clunky due to the noun-heavy construction.
  - [old/style/minor] Uses a heavy noun phrase 'Rate its effectiveness' instead of a more fluid 'Rate how effective... was', which sounds more like a translation than native UX writing.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation B is more natural and follows the original sentence structure. Translation A is overly concise and sounds slightly robotic/unnatural due to the 'Rate its effectiveness to help' construction.
  - [old/style/minor] The phrasing 'Rate its effectiveness to help' is a bit clunky and lacks the smooth flow of a native speaker's instruction.

#### 🟡 en `/intro_new_problems_subtitle`— вердикт неустойчив

- **RU**: Выберите всё, что откликается — одно или несколько
- **OLD**: Choose anything that resonates — one or more
- **NEW**: Select everything that resonates — one or more
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more precise and natural for a selection interface. 'Select everything' accurately reflects 'Выберите всё', whereas 'Choose anything' slightly shifts the meaning toward a more indefinite choice.
  - [old/style/minor] The use of 'anything' instead of 'everything' makes the instruction feel less like a comprehensive selection task and more like a random choice.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A uses 'Choose anything', which sounds more natural and inviting in a UX context for selecting options. Translation B's 'Select everything' is a literal translation of 'Выберите всё' that creates a slight logical tension with 'one or more'.
  - [new/style/minor] The phrase 'Select everything' sounds slightly heavy and creates a minor cognitive dissonance when followed by 'one or more' (if you select everything, you aren't just selecting one).

#### ⚪ en `/auth_title`— ничья (2:0)

- **RU**: Авторизация
- **OLD**: Sign in
- **NEW**: Log in
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both 'Log in' and 'Sign in' are perfect, standard UX terms for 'Авторизация' in English. The choice between them is a matter of brand preference rather than correctness.
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both 'Sign in' and 'Log in' are perfect, industry-standard UX terms for 'Авторизация' in English-speaking markets. There is no functional or stylistic difference between them in this context.

#### 🟢 en `/profile_premium_canceled_plaque` — NEW лучше (2:0)

- **RU**: Подписка отменена, действует до {date}
- **OLD**: Subscription canceled, active until {date}
- **NEW**: Subscription canceled, valid until {date}
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - In the context of subscriptions and documents, 'valid until' is the standard idiomatic expression, whereas 'active until' sounds slightly less natural for a status description.
  - [old/style/minor] 'active until' is understandable but 'valid until' is the more natural collocation for subscription terms.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - In the context of subscriptions and documents, 'valid until' is the standard idiomatic expression used by native speakers. 'Active until' is grammatically correct but sounds slightly more like a status description rather than a term of validity.

#### 🟢 en `/homeBotStatsDaysInRow3` — NEW лучше (2:0)

- **RU**: Впечатляющая серия! Ты заботишься о себе уже <b>{days}</b> д. подряд.
- **OLD**: Impressive streak! That’s <b>{days}</b> in a row of taking care of yourself.
- **NEW**: Impressive streak! You’ve been taking care of yourself for <b>{days}</b> days in a row.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 98)
  - Translation B is idiomatic, natural, and follows the correct tense for a continuous action. Translation A is clunky, uses a heavy prepositional structure ('in a row of taking care'), and sounds like a direct translation from Russian.
  - [old/style/major] The phrase 'in a row of taking care of yourself' is unidiomatic and awkward; 'in a row' should follow the time period, not the action.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 98)
  - Translation A is idiomatic, natural, and follows the 'warm expert friend' tone perfectly. Translation B is grammatically awkward and sounds like a literal, clunky translation of the Russian structure.
  - [old/style/major] The construction 'That’s X in a row of taking care of yourself' is highly unnatural and non-idiomatic in English.

#### 🔴 en `/intro_app_learning_description` — OLD лучше (2:0)

- **RU**: Вы изучаете приложение, а оно изучает вас. С каждым выполненным заданием оно будет точнее давать рекомендации.
- **OLD**: You explore the app, and it gets to know you. With every exercise you complete, its suggestions become more accurate.
- **NEW**: You’re learning about the app, and it’s learning about you. With every completed task, it will provide more accurate recommendations.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is much more idiomatic and natural for a modern app; 'gets to know you' is a perfect way to express the concept of personalization. Translation B feels slightly clunky and literal ('learning about the app').
  - [new/style/major] The phrase 'learning about the app' sounds like a student studying a textbook rather than a user exploring an interface.
  - [new/style/minor] The phrasing 'it will provide more accurate recommendations' is a bit wordy and formal compared to the punchy tone of A.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation B sounds much more natural and idiomatic for a mental health app. 'Gets to know you' is warmer and more human than the literal 'learning about you', and 'suggestions' flows better than the slightly clinical 'recommendations'.
  - [new/style/minor] The phrasing 'learning about the app' sounds a bit like a manual or a tutorial rather than an engaging user experience; 'gets to know you' in B is a better way to express the reciprocal relationship.

#### 🟢 en `/premium_plus_description_text_1` — NEW лучше (2:0)

- **RU**: Мы усовершенствовали интеграцию AI в нашем приложении. Теперь вы можете получить индивидуальные рекомендации при заполнении дневника, а также полноценный анализ записей.
- **OLD**: We've improved how AI is integrated into the app. Now you can get personalized recommendations while filling out your diary, plus a detailed analysis of your entries.
- **NEW**: We’ve improved AI integration in our app. Now you can get personalized recommendations while journaling and receive a full analysis of your entries.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B follows the project's terminology and UX standards perfectly, using 'journaling' instead of the outdated 'diary' and providing a smoother, more professional flow.
  - [old/terminology/major] Uses 'diary' instead of the required 'journal'
  - [old/style/minor] The phrase 'how AI is integrated into the app' is slightly wordy compared to the more direct 'AI integration'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A follows the project's terminology and UX standards perfectly, using 'journaling' and 'entries' instead of the outdated 'diary'.
  - [old/terminology/major] Uses 'diary' instead of the required 'journal'
  - [old/style/minor] The phrase 'how AI is integrated into the app' is wordier and less natural than 'AI integration'
  - [old/style/minor] Uses 'filling out' which is slightly more clunky than the streamlined 'journaling'

#### 🟢 en `/sadness` — NEW лучше (2:0)

- **RU**: Грусть
- **OLD**: Sorrow
- **NEW**: Sadness
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 60 / NEW 100)
  - In the context of mood tracking, 'Sadness' is the standard, natural term for a common emotion, whereas 'Sorrow' implies a much deeper, heavy sense of grief or mourning.
  - [old/terminology/major] Sorrow is too heavy and dramatic for a standard mood label; it sounds like profound grief rather than a general emotion.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 70 / NEW 100)
  - In the context of mood tracking, 'Sadness' is the standard, neutral term for this emotion. 'Sorrow' is too heavy, poetic, and implies deep grief or loss, which is inappropriate for a general mood label.
  - [old/style/major] The word 'sorrow' is too intense and carries a connotation of deep mourning/grief, whereas 'sadness' is the correct UX term for a mood state.

#### 🟡 en `/release_feedback_description`— вердикт неустойчив

- **RU**: Напишите, это важно. Мы читаем каждое сообщение!
- **OLD**: Send us a message—it matters. We read every single one!
- **NEW**: Write to us — it matters. We read every message!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Translation A sounds much more natural and idiomatic for a supportive app. The use of 'Send us a message' is more common in UX than 'Write to us', and 'every single one' adds the warm, empathetic emphasis present in the Russian 'каждое сообщение!'.
  - [new/style/minor] The phrasing 'Write to us' is a bit literal/stiff, and 'every message' lacks the emotional weight of the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and punchy, perfectly capturing the urgent yet supportive tone of the original. Translation B adds unnecessary words ('a message', 'single one') that slightly dilute the impact.
  - [old/style/minor] The addition of 'a message' and 'single one' makes the sentence wordier than the original, losing the directness of the imperative.

#### 🟡 en `/gpt_limit_description`— вердикт неустойчив

- **RU**: Мы рады представить вам функцию, основанную на искусственном интеллекте, которая помогает бороться с деструктивными мыслями. Ваши обезличенные данные будут переданы на обработку нейросети и немедленно удалены после генерации ответа.
- **OLD**: We're pleased to offer this AI-powered feature to help you challenge unhelpful thoughts. Your data is anonymized before processing and deleted immediately after a reply is generated.
- **NEW**: We’ve introduced an AI-powered feature to help you work through unhelpful thoughts. Your anonymized data will be processed by the neural network and immediately deleted after the response is generated.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and follows UX best practices by avoiding unnecessary technical jargon like 'neural network'.
  - [new/style/minor] The phrase 'processed by the neural network' sounds slightly more technical and heavy than the smoother 'anonymized before processing' in A.
  - [new/style/minor] The use of 'will be' makes the tone slightly more formal/distant compared to the directness of A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more precise and follows the technical logic of the original. Translation B changes the meaning of how data is handled (implying it's anonymized *before* processing, whereas the original says it *will be* processed and then deleted).
  - [old/mistranslation/minor] The original says data 'will be transferred for processing' (implying the process includes the transfer), while B suggests a sequence of 'anonymized then processed', which slightly shifts the technical nuance.
  - [old/style/minor] The use of 'a reply' is slightly less natural in this UX context than 'the response'.

#### 🟡 en `/sleep_quality_subtitle`— вердикт неустойчив

- **RU**: Показатели сна в динамике
- **OLD**: Sleep quality trends over time
- **NEW**: Sleep trends
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is concise, idiomatic, and perfectly fits a UI/dashboard context. Translation B is unnecessarily wordy and adds 'quality', which isn't explicitly in the original.
  - [old/addition/minor] Added 'quality' which is not in the source text
  - [old/style/minor] Too wordy for a dashboard header; 'over time' is redundant when using 'trends'
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A accurately captures the full meaning of the original, including the concept of 'dynamics' (trends over time), whereas B is overly brief and loses the nuance of the data being tracked.
  - [new/omission/major] Missing the 'dynamics/over time' aspect, which is crucial for a tracking feature.

#### 🔴 en `/daybook_analysis_reconnecting` — OLD лучше (2:0)

- **RU**: Упс, похоже соединение оборвалось, начну заново!
- **OLD**: Oops, looks like the connection dropped. I’ll start over!
- **NEW**: Oops, looks like the connection was lost. I'll try again!
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more idiomatic and closer to the original's tone. 'Start over' perfectly captures 'начну заново', whereas 'try again' shifts the meaning slightly to 'attempting the action again'.
  - [new/style/minor] 'Try again' is a bit generic compared to the more natural 'start over' for a process being restarted.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'dropped', which is more idiomatic for network connections, and 'start over', which perfectly captures the nuance of 'начну заново' in a conversational tone. Translation B is grammatically correct but sounds slightly more formal/stiff.
  - [new/style/minor] 'connection was lost' and 'try again' are a bit more generic and less punchy than the original's energetic tone.

#### 🟡 en `/gpt_limit_reached`— вердикт неустойчив

- **RU**: Лимит использования на сегодня исчерпан
- **OLD**: Daily limit reached
- **NEW**: You’ve reached your limit for today
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A is a perfect, concise UX string for a limit notification. Translation B is grammatically correct but too wordy for a system message/alert.
  - [new/style/minor] Too conversational and long for a standard UI limit notification; lacks the punchiness of a system alert.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A uses a warm, conversational tone ('You’ve reached...') which fits the 'understanding friend' persona, whereas B is a bit dry and robotic. A also follows the UX principle of using contractions.
  - [old/style/minor] Sounds slightly more like a system error message than a supportive app interface.

#### 🔴 en `/intro_new_cbt_opt_self` — OLD лучше (2:0)

- **RU**: Изучаю самостоятельно или был опыт с психологом
- **OLD**: I’m learning on my own or I’ve worked with a psychologist before
- **NEW**: Self-studying or have had experience with a psychologist
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A is a natural, complete sentence that sounds like a native speaker describing their experience. Translation B is a clunky, fragmented construction that feels like a literal translation of the Russian noun-heavy structure.
  - [new/style/major] The phrase 'Self-studying or have had experience' is grammatically inconsistent and sounds like a machine translation; it lacks a proper subject and smooth flow.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation B uses natural, conversational English with proper subjects and correct verb tenses, whereas Translation A is a fragmented, ungrammatical construction that sounds like a literal machine translation.
  - [new/style/major] Lacks subjects and uses an awkward, non-idiomatic structure ('Self-studying or have had...') that doesn't sound like a native speaker.

#### 🟢 en `/errors_read_shortdesc` — NEW лучше (2:0)

- **RU**: Уверенность, что вы точно знаете мысли окружающих и мотивы их поступков
- **OLD**: Assuming you know what others think or what motivates them
- **NEW**: Assuming you know exactly what others are thinking and why they act the way they do
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B captures the nuance of 'точно' (exactly) and the descriptive nature of the original more naturally. Translation A is a bit too clipped and loses the emphasis on the certainty of the thought.
  - [old/style/minor] Lacks the emphasis of 'точно' (exactly) and feels slightly less idiomatic for a definition of a cognitive distortion.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation A is much more idiomatic and captures the nuance of 'мотивы их поступков' through a natural English phrasing, whereas B is a bit dry and literal.
  - [old/style/minor] The phrasing 'what motivates them' is grammatically correct but feels slightly more clinical/stiff compared to the more natural 'why they act the way they do' in A.
  - [old/omission/minor] Lost the emphasis of 'точно' (exactly) present in the original.

#### 🟢 en `/story_distortions_description_1` — NEW лучше (2:0)

- **RU**: Исследования Аарона Бека показывают, что большинство из нас хранит неадаптивные схемы мышления, которые остаются неактивными, пока не столкнутся со стрессовыми жизненными событиями.
- **OLD**: Research by Aaron Beck showed that many of us hold maladaptive thinking patterns that stay dormant until triggered by stressful events.
- **NEW**: Aaron Beck's research shows that most of us hold unhelpful thinking patterns that often remain outside of awareness until we face stressful life events.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B follows the project's specific terminology guidelines (unhelpful instead of maladaptive) and uses the approved phrasing for 'outside of awareness'. It also correctly uses the present tense for scientific facts.
  - [old/terminology/minor] Used 'maladaptive' instead of the preferred 'unhelpful' for unhelpful beliefs/patterns.
  - [old/style/minor] Used past tense 'showed', whereas present tense 'shows' is more appropriate for established scientific research.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A perfectly aligns with the project's specific terminology guidelines (unhelpful, outside of awareness) and maintains a warm, expert tone. Translation B uses 'maladaptive' and 'dormant', which, while grammatically correct, are more academic and deviate from the established glossary.
  - [old/terminology/minor] Used 'maladaptive' instead of 'unhelpful' and 'dormant' instead of 'outside of awareness' as per the project's specific CBT terminology requirements.
  - [old/style/minor] The tone is slightly more academic/clinical than the 'understanding friend-expert' tone requested.

#### 🔴 en `/mood_stats_unlock_body_1` — OLD лучше (2:0)

- **RU**: Пока данных мало, но с каждым днём будет появляться больше статистики и инсайтов!
- **OLD**: There isn't much data yet, but every day you'll get more stats and insights!
- **NEW**: There’s not much data yet, but more statistics and insights will appear every day!
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B is much more natural and user-centric, using 'you'll get' instead of the passive/impersonal 'will appear'. It also uses the more conversational 'stats' which fits the app's tone.
  - [new/style/minor] Sounds a bit stiff and impersonal ('will appear') compared to a natural UX copy.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and engaging for a user, using a personal 'you' which fits the 'understanding friend' tone. Translation B is grammatically correct but feels passive and slightly robotic due to the 'will appear' construction.
  - [new/style/minor] The passive structure 'will appear' is less engaging for a mobile app than the direct 'you'll get'.

#### 🟢 en `/notifications_diary_body` — NEW лучше (2:0)

- **RU**: Сегодня вы ещё не работали с автоматическими мыслями. Важно сформировать привычку!
- **OLD**: You haven't worked with automatic thoughts yet today. Building a habit matters!
- **NEW**: You haven’t worked with your automatic thoughts yet today. Building a habit is key!
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and natural for a supportive app context. 'Building a habit is key!' sounds much more like a native English speaker than the slightly clunky 'Building a habit matters!'. Additionally, adding 'your' in B makes the sentence feel more personal and less clinical.
  - [old/style/minor] The phrase 'Building a habit matters!' is grammatically correct but sounds slightly unnatural/stilted compared to 'is key' or 'is important'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A sounds more natural and idiomatic for a supportive app context. The phrase 'is key' is a much more common and motivating way to express importance than 'matters' in this UX setting.
  - [old/style/minor] The phrase 'Building a habit matters' sounds slightly flat and less idiomatic for a motivational nudge compared to 'is key'.
  - [old/style/minor] Missing the possessive 'your' before 'automatic thoughts' makes the sentence feel slightly more detached/clinical, whereas 'your' adds the intended personal touch.

#### 🟡 en `/relax_subtitle`— вердикт неустойчив

- **RU**: Отвлекитесь от ежедневной суеты и расслабьтесь!
- **OLD**: Take a break and unwind with soothing sounds!
- **NEW**: Unwind from the daily grind and relax!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is much more natural and engaging for a mental health app, using 'soothing sounds' to provide context for the action. Translation B is a bit cliché and lacks the inviting, warm tone expected in this UX context.
  - [new/style/minor] The phrase 'daily grind' is a bit heavy/cliché and the sentence feels slightly abrupt compared to the inviting tone of A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 98)
  - Translation A is a perfect idiomatic equivalent of the original. Translation B introduces an addition ('with soothing sounds') that is not present in the source text.
  - [old/addition/major] Added 'with soothing sounds', which changes the meaning and scope of the original instruction

#### 🟢 en `/daybook_title` — NEW лучше (2:0)

- **RU**: Умный ежедневник
- **OLD**: Smart Diary
- **NEW**: Smart Journal
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 70 / NEW 100)
  - According to the project glossary, 'Smart Journal' is the official brand name for the product, whereas 'Diary' is the legacy term that has been replaced.
  - [old/terminology/major] Uses 'Diary' instead of the required 'Journal' for the product name.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - According to the project glossary, 'Smart Journal' is the official product name, whereas 'Diary' is the legacy term that should not be used.
  - [old/terminology/major] Used 'Diary' instead of the required 'Journal' for the product name.

#### 🔴 en `/coping_title` — OLD лучше (2:0)

- **RU**: Копинг-карточки
- **OLD**: Coping Cards
- **NEW**: Coping cards
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - The original text is a title/header. According to the style guide, titles and section names should follow Sentence case or Title Case, but in the context of a standalone header for a feature, 'Coping Cards' (Title Case) is the standard professional way to present it in a UI.
  - [new/style/minor] Lowercase 'cards' in a standalone header looks like a fragment rather than a proper title/section name.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - The original text is a section title/heading. According to the style guide, titles and section names should use Title Case or Sentence case, but for a standalone heading like this, Title Case (B) is more standard for a professional UI/app structure.
  - [new/style/minor] Uses sentence case for a standalone heading, which is less common for section titles in this context compared to Title Case.

#### 🟢 en `/diary_title` — NEW лучше (2:0)

- **RU**: Дневник автоматических мыслей
- **OLD**: Automatic Thoughts Diary
- **NEW**: Automatic thought journal
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation B follows the project's glossary and industry standards for CBT, using 'journal' instead of 'diary' and applying correct sentence case for a UI section.
  - [old/terminology/major] Uses 'Diary' instead of the required 'journal'
  - [old/style/minor] Uses Title Case instead of sentence case for a UI element
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 100)
  - Translation A follows the project's glossary and UX standards perfectly, using 'journal' instead of 'diary'. Translation B uses 'Diary', which is explicitly marked as legacy/outdated in the instructions.
  - [old/terminology/major] Uses 'Diary' instead of the required 'journal' for this section.

#### 🟡 en `/homeBotNeverUsed0`— вердикт неустойчив

- **RU**: Ты ещё не сделал ни одной записи в <b>{dairy}</b>. Возможно, сегодня отличный момент попробовать! Чтобы найти то, что подходит именно тебе, здорово тестировать разные форматы.
- **OLD**: You haven’t made a single entry in <b>{dairy}</b> yet. Maybe today is a great moment to give it a try! To find what suits you best, it really helps to test different formats.
- **NEW**: You haven’t made any entries in your <b>{dairy}</b> yet. Maybe today is the perfect time to try! It’s a great idea to test different formats to find what works best for you.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A flows more naturally for a native speaker and uses a more idiomatic structure ('what works best for you'). Translation B is slightly more wordy and feels a bit more like a direct translation of the Russian sentence structure.
  - [old/style/minor] The phrasing 'To find what suits you best, it really helps to...' is a bit clunky compared to the more direct English flow in A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and follows the 'supportive friend' tone perfectly, especially with the phrase 'give it a try'. Translation B is slightly more generic and wordy.
  - [new/style/minor] The phrasing 'It’s a great idea to...' is a bit more formal/instructional than the warm, natural tone of the original.

#### 🟢 en `/intro_step_progress` — NEW лучше (2:0)

- **RU**: Ваш {day} шаг к психологическому благополучию!
- **OLD**: Your step {day} toward mental well-being.
- **NEW**: Your {day} step toward mental well-being!
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 60 / NEW 98)
  - Translation A correctly places the placeholder as an adjective modifying 'step', which is the natural English syntax for this phrase. Translation B places the placeholder after the noun, creating an ungrammatical and nonsensical structure.
  - [old/style/critical] Incorrect word order; '{day}' cannot follow 'step' in this context without making the sentence ungrammatical.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 98)
  - Translation A contains a critical word order error that makes it sound unnatural and broken, whereas B correctly places the placeholder and maintains the original tone and punctuation.
  - [old/style/major] The word order 'step {day}' is ungrammatical in English; the ordinal/number should precede the noun ('{day} step').
  - [old/omission/minor] The exclamation mark from the original is missing.

#### 🔴 en `/believe_final_increase` — OLD лучше (2:0)

- **RU**: Рост на {count} {count, plural, one{пункт} few{пункта} many{пунктов} other{пункта}}
- **OLD**: Up by {count} {count, plural, one{point} other{points}}
- **NEW**: Increased by {count} {count, plural, one{point} other{points}}
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A is more concise and follows UX best practices for short status updates or labels. Translation B uses a heavy past participle ('Increased'), which sounds more like a formal report than a dynamic app interface.
  - [new/style/minor] Too formal/heavy for a quick UI update; 'Up by' is more natural for gamification or progress tracking.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation B uses the idiomatic 'Up by', which is standard for growth/score indicators in UX. Translation A uses 'Increased by', which sounds more like a formal report or a passive verb phrase rather than a concise UI label.
  - [new/style/minor] Too formal/heavy for a quick UI notification; 'Increased by' sounds like a sentence fragment from a report.

#### 🟡 en `/found_mistakes`— вердикт неустойчив

- **RU**: Обнаруженные ошибки
- **OLD**: Found issues
- **NEW**: Errors found
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A follows modern UX writing standards for error/issue reporting, sounding more natural and less heavy than the passive construction in B.
  - [new/style/minor] Passive voice 'Errors found' sounds slightly more formal/robotic compared to the more standard UX 'Found issues'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A is a standard, concise UI pattern for error messages. Translation B, while not incorrect, sounds slightly more informal and less direct for a system notification.
  - [old/style/minor] 'Issues' is a bit softer than 'Errors'; in a technical context, 'Errors found' is the more conventional UX pattern.

#### 🟢 en `/homeBotStatsDaysCommon3` — NEW лучше (2:0)

- **RU**: Рад быть рядом! Визитов вместе уже <b>{days}</b>.
- **OLD**: Happy to be by your side! We’ve now met <b>{days}</b> times.
- **NEW**: Glad to be here with you! We’ve had <b>{days}</b> visits together.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A captures the warm, supportive tone and the specific nuance of 'visits' (sessions/check-ins) much more naturally. Translation B sounds slightly more formal and uses 'met', which implies a physical meeting rather than app usage.
  - [old/style/minor] The phrase 'met <days> times' is a bit clunky for an app interface; 'had <days> visits' or 'checked in <days> times' is more idiomatic for mental health tracking.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is more natural and follows the 'understanding friend' tone, whereas A uses 'met', which sounds like a physical meeting rather than app sessions. B also preserves the 'visits' concept more accurately.
  - [old/style/minor] The verb 'met' is slightly unnatural for app usage; 'we've had... visits' or 'sessions' is more idiomatic for a digital companion.

#### 🟢 en `/homeBotStatsDaysInRow4` — NEW лучше (2:0)

- **RU**: Так держать! Уже <b>{days}</b> д. ты занимаешься каждый день.
- **OLD**: Keep it up! That’s <b>{days}</b> in a row of daily practice.
- **NEW**: Keep it up! You’ve been practicing every day for <b>{days}</b> days.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is natural, grammatically perfect, and follows the 'expert friend' tone. Translation B is awkward and uses a non-idiomatic construction ('That’s X in a row of daily practice').
  - [old/style/major] The phrasing 'That’s {days} in a row of daily practice' sounds unnatural and clunky to a native speaker; it's a literal attempt to combine 'in a row' and 'daily practice' that fails the flow test.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more natural and follows the 'expert friend' tone, whereas Translation A is clunky and uses an awkward phrasing ('in a row of daily practice').
  - [old/style/major] The phrase 'in a row of daily practice' is unidiomatic and sounds like a translation; a native speaker would say 'days in a row' or 'days of daily practice'.

#### 🟢 en `/mood_emotions_title` — NEW лучше (2:0)

- **RU**: Какие эмоции вы испытываете?
- **OLD**: Which emotions are you experiencing?
- **NEW**: How are you feeling?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is much more natural and follows the 'warm, supportive friend' tone of the app, whereas Translation B sounds overly clinical and formal. In a mental health UX context, 'How are you feeling?' is the standard way to ask this question.
  - [old/style/major] Sounds like a clinical survey or a medical questionnaire rather than a supportive app interface.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - While A is grammatically correct, it sounds slightly clinical and formal. B is the natural, idiomatic way a 'supportive friend' would ask this in a mental health app context.
  - [old/style/minor] Sounds a bit too formal/clinical for a warm, supportive tone; 'Which emotions' is a bit heavy compared to natural English usage.

#### 🟢 en `/restore_subscription` — NEW лучше (2:0)

- **RU**: Восстановить подписку
- **OLD**: Restore Subscription
- **NEW**: Restore subscription
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 100)
  - According to the style guide, UI strings must use sentence case (only the first word capitalized). Translation A follows this rule, while Translation B uses Title Case.
  - [old/style/minor] Uses Title Case instead of sentence case for a UI string
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - According to the project guidelines, UI strings must use sentence case (only the first word capitalized). Translation B follows this rule, whereas Translation A uses Title Case.
  - [old/style/minor] Uses Title Case instead of the required sentence case for UI elements.

