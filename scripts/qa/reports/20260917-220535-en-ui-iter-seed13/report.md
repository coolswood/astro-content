# QA: слепое парное сравнение переводов — en-ui-iter-seed13

- **Дата**: 2026-09-17T19:05:35.657Z
- **Метка**: en-ui-iter-seed13
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/ui-en-canary-20260917
- **Файлы**: ui/cognitive_psy
- **Локали**: en
- **Сэмпл/файл**: 30
- **Seed**: 13
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 31f3b61b8ac692a1f2d70200931d7e6363c07a33

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## ui/cognitive_psy

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 30 | 🟢 12 | 🔴 7 | ⚪ 1 | 🟡 10 | 1 / 0 | 63% |
| **итого** | 30 | 🟢 12 | 🔴 7 | ⚪ 1 | 🟡 10 | 1 / 0 | 63% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×8, omission/minor×1, addition/minor×1, mistranslation/major×1, mistranslation/critical×1; OLD — style/minor×12, style/major×2, terminology/minor×2, terminology/major×2, addition/minor×2, omission/minor×1, omission/major×1

### Детали пар (для спот-чека)

#### 🔴 en `/share_no` — OLD лучше (2:0)

- **RU**: Ваша запись больше не видна!
- **OLD**: Your entry is no longer visible!
- **NEW**: Your entry is no longer visible
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Перевод B точнее передает пунктуацию оригинала. В интерфейсах важно сохранять эмоциональный окрас или акцент, заданный восклицательным знаком, если он есть в исходном тексте.
  - [new/omission/minor] отсутствует восклицательный знак, который есть в оригинале
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - Translation A correctly preserves the punctuation (exclamation mark) from the original text, whereas Translation B omits it.
  - [new/omission/minor] missing exclamation mark

#### 🟡 en `/homeBotTestExpired2`— вердикт неустойчив

- **RU**: Похоже, результаты теста <b>{testName}</b> устарели. Давай проверим, как ты чувствуешь себя сейчас!
- **OLD**: Looks like your <b>{testName}</b> results are out of date. Let’s check how you’re feeling now!
- **NEW**: It looks like your <b>{testName}</b> test results are outdated. Let’s check in on how you’re feeling today!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and natural for a mobile app interface. Translation B adds unnecessary words ('test', 'today') that weren't in the original and feels slightly more wordy.
  - [new/addition/minor] Added 'test' (redundant since testName is used) and 'today' (not in original).
  - [new/style/minor] The phrase 'check in on how you're feeling' is slightly more heavy than the punchy 'check how you're feeling'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A sounds more natural and warm, using the idiomatic 'check in on' which fits the 'understanding friend' tone perfectly. Translation B is grammatically correct but feels slightly more abrupt.
  - [old/style/minor] The phrase 'check how you're feeling' is slightly less idiomatic in a mental health context than 'check in on how you're feeling'.

#### 🟡 en `/comparison_balance_title`— вердикт неустойчив

- **RU**: Баланс аргументов
- **OLD**: Argument balance
- **NEW**: Balance of arguments
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A is a more natural and standard way to express this concept in a psychological or logical context. Translation B sounds slightly more like a technical or financial term (e.g., 'account balance').
  - [old/style/minor] Sounds a bit clipped and more like a technical metric than a cognitive process.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation A follows the standard English UX pattern for titles, using a concise noun adjunct construction. Translation B is grammatically correct but sounds unnecessarily heavy and formal for an app interface.
  - [new/style/minor] Uses a wordy 'of' construction instead of a more natural noun adjunct for a heading

#### 🟢 en `/home_bot_first_visit_header` — NEW лучше (2:0)

- **RU**: Привет! Рад нашему знакомству
- **OLD**: Hi! So glad we’ve met
- **NEW**: Hi! It’s lovely to meet you
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A uses a natural, idiomatic expression for a first meeting. Translation B sounds awkward and uses the Present Perfect incorrectly in this context, making it sound like the meeting happened a long time ago.
  - [old/style/major] The phrase 'So glad we've met' sounds unnatural for a greeting; 'It's lovely to meet you' or 'Nice to meet you' is the standard idiomatic way to express this.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation B uses a natural, idiomatic greeting common for a warm, supportive tone. Translation A sounds slightly awkward and overly literal, as if describing a past event rather than a greeting.
  - [old/style/major] The phrase 'So glad we've met' sounds unnatural for an initial greeting; it implies a reflection on a meeting that has already concluded.

#### 🔴 en `/gentle` — OLD лучше (2:0)

- **RU**: Нежность
- **OLD**: Tenderness
- **NEW**: Gentleness
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - In the context of emotions and mental well-being, 'Tenderness' is the standard and most natural way to express 'Нежность'. 'Gentleness' refers more to a person's manner or a soft touch, rather than the feeling itself.
  - [new/style/minor] Gentleness sounds more like a character trait (being mild/not rough) rather than an emotional state.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In the context of emotions and mental well-being, 'Tenderness' is the direct and most accurate translation for 'Нежность'. 'Gentleness' refers more to a manner of behavior or a soft touch rather than the feeling itself.
  - [new/style/minor] Gentleness describes a quality of character or action (softness/mildness) rather than the specific emotion of tenderness.

#### 🟡 en `/quality_disgusting`— вердикт неустойчив

- **RU**: Отвратительно
- **OLD**: Awful
- **NEW**: Disgusting
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - In the context of a mood tracker or emotional state, 'Awful' is the natural way to describe a feeling, whereas 'Disgusting' refers to something that causes physical or moral revulsion.
  - [new/mistranslation/major] Translates the literal meaning of 'отвратительно' as a physical sensation/quality rather than an emotional state (mood).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - In the context of emotions/moods, 'Disgusting' is the direct and standard translation for 'Отвратительно' (the feeling of disgust), whereas 'Awful' is more generic and often refers to a situation or quality rather than a specific visceral emotion.
  - [old/style/minor] Awful is a bit too vague for a specific emotion; it sounds more like 'terrible' than the specific feeling of disgust.

#### 🔴 en `/das_item_impeccability` — OLD лучше (2:0)

- **RU**: Перфекционизм
- **OLD**: Perfectionism
- **NEW**: Impeccability
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 100 / NEW 40)
  - The original term 'Перфекционизм' refers to the psychological trait/concept of perfectionism. Translation A 'Impeccability' means the state of being faultless or flawless, which is a positive quality and a different concept entirely.
  - [new/mistranslation/critical] Impeccability is a positive attribute (faultlessness), whereas perfectionism is the psychological phenomenon/trait described in CBT.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 30)
  - The original term 'Перфекционизм' refers to the psychological trait/concept of perfectionism. Translation A is the direct and correct term, while Translation B ('Impeccability') refers to the state of being faultless, which is a different concept and not a psychological term.
  - [new/mistranslation/critical] Impeccability is a state of being flawless, not the psychological phenomenon of perfectionism.

#### 🟡 en `/homeBotQuoteIntro5`— вердикт неустойчив

- **RU**: Делюсь глубокой мыслью — пусть она вдохновит тебя сегодня
- **OLD**: Sharing a deep thought — may it inspire you today
- **NEW**: Sharing a deep thought — let it inspire you today
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses 'may it inspire you', which is a more natural and idiomatic way to express a wish or a blessing in English. Translation A's 'let it inspire you' sounds slightly more like a command or a direct instruction, which slightly misses the warm, poetic tone of the original.
  - [new/style/minor] The imperative 'let it' is a bit more forceful/directive than the gentle wish intended in the Russian original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B uses the natural imperative 'let it', which fits the warm, supportive tone of the app. Translation A uses 'may it', which sounds overly formal, poetic, or archaic for a modern mobile interface.
  - [old/style/minor] The use of 'may it' is too formal/literary for a friendly AI assistant/app context.

#### 🟡 en `/homeBotReadArticle2`— вердикт неустойчив

- **RU**: Выбрал для тебя полезный материал на сегодня — загляни, когда будет свободная минутка.
- **OLD**: I’ve chosen a helpful read for today — check it out when you have a free minute.
- **NEW**: I’ve selected some helpful material for you today — take a look when you have a free moment.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and idiomatic for a supportive AI assistant, using 'helpful read' instead of the clunky 'helpful material'.
  - [new/style/minor] 'helpful material' sounds slightly formal and academic compared to the warm, friendly tone of the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and follows the 'understanding friend' tone perfectly. Translation B uses 'a helpful read', which is a bit more restrictive than the original 'material' (материал), and 'free minute' is a slightly less idiomatic way to express availability than 'free moment'.
  - [old/style/minor] 'a helpful read' is a bit more specific than the original 'material', and 'free minute' sounds slightly less natural than 'free moment' in this context.

#### 🟢 en `/homeBotStatsDaysInRow0` — NEW лучше (2:0)

- **RU**: Занятий подряд уже <b>{days}</b> д. — отличный темп!
- **OLD**: Day <b>{days}</b> of practicing in a row — great pace!
- **NEW**: <b>{days}</b> days in a row — great momentum!
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation B is much more natural and idiomatic for a gamified UX context. Translation A is clunky and uses a literal structure ('Day X of practicing') that doesn't match the original meaning of 'X consecutive days'.
  - [old/style/major] The phrasing 'Day X of practicing' sounds like a manual instruction rather than a celebratory achievement; it also changes the meaning from 'X days in a row' to 'The X-th day'.
  - [old/terminology/minor] Using 'pace' is okay, but 'momentum' in B is a much better fit for gamification/streaks.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is punchy, idiomatic, and perfectly fits the gamification/UX tone. Translation B is wordy, awkward, and sounds like a literal translation of the Russian structure.
  - [old/style/major] The phrase 'Day {days} of practicing in a row' is unidiomatic and heavy for a UI notification.
  - [old/style/minor] The word 'pace' is a bit more literal/mechanical than the more natural 'momentum' used in A.

#### 🟢 en `/daybook_ai_loading_phrase_3` — NEW лучше (2:0)

- **RU**: Формирую психологический портрет...
- **OLD**: Creating a psychological profile...
- **NEW**: Building your psychological profile...
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A uses the possessive 'your', which is much more natural for a personalized UX experience, whereas B sounds like a generic system process.
  - [old/style/minor] Lacks the personal touch ('your') expected in a user-centric app interface.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B is more engaging and follows the 'understanding friend' tone by using the possessive 'your', making it feel personalized rather than a generic system process.
  - [old/style/minor] Sounds slightly more like a robotic system status than a personalized app experience.

#### 🟢 en `/breathing_sec_left` — NEW лучше (2:0)

- **RU**: сек. осталось
- **OLD**: sec left
- **NEW**: sec. left
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B correctly uses a period for the abbreviation 'sec.', which is standard for UI elements and follows the original's punctuation. Translation A omits the period, making it look like a typo or an incomplete word.
  - [old/style/minor] missing period in abbreviation 'sec'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 95)
  - Both are acceptable for a UI timer, but Translation A follows standard English punctuation conventions for abbreviations. In English, abbreviations like 'sec.' typically require a period to distinguish them from full words, making it look more polished and professional.
  - [old/style/minor] Missing period after the abbreviation 'sec'

#### 🟢 en `/mood_trend_improved` — NEW лучше (2:0)

- **RU**: Состояние заметно улучшилось за {period} на
- **OLD**: Overall, things improved noticeably over {period} by
- **NEW**: Your mood improved significantly over {period} by
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation B is more natural and aligns with the app's focus on mood tracking, whereas Translation A is too vague ('things improved').
  - [old/style/minor] The phrase 'Overall, things improved' sounds a bit colloquial and vague for a mental health context compared to 'Your mood improved'.
  - [old/omission/minor] The original 'Состояние' in a mental health app context specifically refers to the user's state/mood, which 'things' fails to capture accurately.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation A is more direct and aligns with the app's focus on mood tracking, whereas B is too vague and uses 'things', which sounds unnatural in this context. Both translations suffer from a dangling 'by' at the end, likely due to the original Russian sentence being cut off.
  - [old/style/major] The phrase 'things improved' is too colloquial and vague for a mental health app; 'Your mood improved' is more precise and professional.
  - [old/addition/minor] Added 'Overall', which is not in the original.

#### 🟡 en `/homeBotDayFirst`— вердикт неустойчив

- **RU**: <p>Привет! Я твой проводник в этом приложении. Моя задача — быть рядом и бережно поддерживать тебя, когда тревожно, тяжело или просто нужно разложить мысли по полочкам.</p><p>Для начала я подобрал несколько простых шагов, чтобы ты мог познакомиться с практикам…
- **OLD**: <p>Hi! I’m your guide in this app. My job is to be by your side and gently support you when you feel anxious, when things are hard, or when you simply need to sort your thoughts out.</p><p>To start, I’ve picked out a few simple steps so you can get to know the…
- **NEW**: <p>Hi! I’m your guide in this app. My job is to be right here, supporting you gently whenever you feel anxious, overwhelmed, or just need to organize your thoughts.</p><p>To start, I’ve picked out a few simple steps so you can get to know the practices without…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and follows the UX guidelines perfectly, especially with the use of 'overwhelmed' for 'тяжело' and 'right here' for 'быть рядом'.
  - [old/style/minor] The repetition of 'when you feel... when things are... when you...' is slightly clunky compared to the smoother flow of A.
  - [old/style/minor] 'Sense how you're doing' is a bit literal for 'чувствовать состояние'; 'understand how you're feeling' is more natural in this context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A captures the warm, supportive 'expert friend' tone more effectively with idiomatic phrasing like 'sort your thoughts out' and 'at your own pace'. Translation B feels slightly more formal and less fluid.
  - [new/style/minor] The phrasing 'organize your thoughts' is a bit more clinical/stiff than the idiomatic 'sort your thoughts out' in A. 'Stop by' is slightly less inviting than 'Drop by' in this context.

#### 🔴 en `/intro_new_name_category` — OLD лучше (2:0)

- **RU**: ЗНАКОМСТВО
- **OLD**: GETTING TO KNOW YOU
- **NEW**: INTRODUCTION
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - In the context of a mental health app or a user onboarding experience, 'Getting to know you' sounds much warmer and more personal, whereas 'Introduction' is overly formal and academic.
  - [new/style/minor] Too formal/dry for a supportive 'expert friend' tone
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - Translation A uses a warm, engaging, and person-centered tone ('Getting to know you') which fits the 'understanding friend' persona, whereas Translation B is overly formal and dry ('Introduction').
  - [new/style/minor] Too academic/formal for a supportive mental health app context

#### 🟢 en `/use_discount` — NEW лучше (2:0)

- **RU**: Используйте скидку!
- **OLD**: Use the discount!
- **NEW**: Use your discount!
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A uses the possessive 'your', which is more natural and engaging for a user-centric interface, whereas Translation B sounds slightly detached and robotic.
  - [old/style/minor] Use of the definite article 'the' instead of a possessive pronoun makes the tone less personal and more like a generic instruction.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - In English UX writing, using the possessive 'your' makes the call to action feel more personal and engaging, whereas 'the discount' sounds slightly detached and robotic.
  - [old/style/minor] Sounds a bit impersonal/mechanical compared to the standard 'your' in marketing/UX.

#### 🟢 en `/errors_due_shortdesc` — NEW лучше (2:0)

- **RU**: Жёсткие «должен/должна» к себе и другим
- **OLD**: Rigid "must" rules for yourself and others
- **NEW**: Rigid "should" statements toward yourself and others
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation B uses the canonical CBT term 'should statements' as required by the glossary, whereas Translation A uses a non-standard 'must rules'.
  - [old/terminology/major] Used 'must rules' instead of the required 'should statements' for 'долженствование'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A uses the canonical CBT term 'should statements' as specified in the glossary, whereas Translation B uses 'must rules', which is non-standard and sounds unnatural.
  - [old/terminology/major] Does not use the required term 'should statements' for 'долженствование'.
  - [old/style/minor] The phrasing 'must rules' is awkward and not idiomatic in a psychological context.

#### 🟢 en `/daybook_title` — NEW лучше (2:0)

- **RU**: Умный ежедневник
- **OLD**: Smart Diary
- **NEW**: Smart Journal
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - Translation A follows the project's specific glossary and brand guidelines, using 'Smart Journal' as the product name. Translation B uses 'Diary', which is explicitly marked as legacy and should not be used.
  - [old/terminology/major] Uses 'Diary' instead of the required 'Journal' for the product name.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 70 / NEW 100)
  - According to the project glossary, 'Smart Journal' is the specific brand name for the product, whereas 'Diary' is the legacy term that has been replaced by 'Journal'.
  - [old/terminology/major] Uses 'Diary' instead of the required brand name 'Smart Journal'

#### 🟡 en `/sleep_quality_subtitle`— вердикт неустойчив

- **RU**: Показатели сна в динамике
- **OLD**: Sleep quality trends over time
- **NEW**: Sleep trends
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is concise and perfectly fits the UX standard for a dashboard or chart title. Translation B is unnecessarily wordy and adds 'quality', which is not present in the original.
  - [old/addition/minor] Added 'quality', which changes the scope from general sleep metrics to just quality
  - [old/style/minor] Too long for a UI header; 'over time' is redundant when 'trends' is used
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A accurately captures the full meaning of the original, including the concept of 'dynamics' (trends over time), whereas B is too brief and loses the specific nuance of 'sleep metrics/indicators'.
  - [new/omission/major] Missing the 'sleep metrics/indicators' aspect and the sense of progression/dynamics implied in the original.

#### 🟢 en `/notification_every_day_2_body` — NEW лучше (2:0)

- **RU**: Откройте приложение и уделите себе 5 минут!
- **OLD**: Open the app and take a 5-minute break!
- **NEW**: Open the app and take 5 minutes for yourself!
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B is a faithful and natural rendering of the original intent. Translation A adds the word 'break', which changes the meaning from 'spending time on yourself' to 'taking a break', which is a slight semantic shift.
  - [old/addition/minor] Added 'break', which wasn't in the original and slightly alters the focus from self-care to rest.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is a faithful and natural rendering of the original intent. Translation B introduces an addition ('break') that changes the meaning from 'spending time on oneself' to 'taking a break from something'.
  - [old/addition/minor] The word 'break' is not in the original and shifts the focus from self-care to a pause in activity.

#### 🟡 en `/homeBotStatsDaysCommon0`— вердикт неустойчив

- **RU**: Здорово! Визитов уже <b>{days}</b> — приятно, что ты заглядываешь.
- **OLD**: Wonderful! You’ve dropped by <b>{days}</b> times already.
- **NEW**: Great job! You’ve visited <b>{days}</b> times — it’s lovely to see you checking in.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A perfectly captures the warm, supportive 'expert friend' tone and includes the second part of the original sentence, whereas B omits it. A's use of 'checking in' is also more idiomatic for a mental health app than B's 'dropped by'.
  - [old/omission/major] The second clause 'приятно, что ты заглядываешь' is completely missing.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is punchy, natural, and perfectly matches the warm, concise UX tone. Translation B is slightly too wordy and 'checking in' feels a bit heavy for this context.
  - [new/style/minor] The phrase 'it’s lovely to see you checking in' is a bit long for a celebratory microcopy and feels slightly more formal/stilted than the original 'приятно, что ты заглядываешь'.

#### 🟡 en `/intro_new_problem_selfesteem`— вердикт неустойчив

- **RU**: Недовольство собой
- **OLD**: Feeling unhappy with myself
- **NEW**: Dissatisfaction with myself
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B is a concise, noun-based heading that accurately reflects the original Russian noun phrase. Translation A uses a gerund phrase ('Feeling unhappy...'), which sounds more like a description of a state rather than a formal title or category name.
  - [old/style/minor] Too wordy for a heading; 'Feeling unhappy with myself' sounds like a sentence fragment rather than a label.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation B sounds much more natural and empathetic for a mental health app, whereas A is a heavy, noun-based construction that feels like a clinical diagnosis or a textbook heading.
  - [new/style/minor] Too formal and noun-heavy ('Dissatisfaction with...'); sounds like a clinical label rather than a relatable feeling.

#### 🔴 en `/article_activity_title` — OLD лучше (2:0)

- **RU**: Эта техника есть в разделе активности. Вы можете взять ее в работу!
- **OLD**: This technique is in the Activities section. Try it out!
- **NEW**: This technique is available in the Activities section. You can start working on it!
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 85)
  - Translation B is much more natural and follows the UX guidelines for a 'supportive friend' tone. Translation A is a bit heavy and literal ('start working on it' sounds like a chore).
  - [new/style/minor] The phrase 'start working on it' is a bit clunky and formal for a friendly app; 'Try it out' is more idiomatic for an invitation to action.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 78)
  - Translation A is much more natural and follows the UX guidelines for a warm, supportive tone. Translation B is too literal and heavy, sounding like a direct translation of the Russian 'взять в работу'.
  - [new/style/major] The phrase 'start working on it' is a clunky calque of 'взять в работу' and sounds overly formal/laborious for a mental health app; 'Try it out!' is the idiomatic way to express this in English UX.
  - [new/style/minor] The use of 'is available' adds unnecessary wordiness compared to the direct 'is in'.

#### 🟢 en `/homeBotQuoteIntro6` — NEW лучше (2:0)

- **RU**: Предлагаю ненадолго остановиться и прислушаться к этой мысли
- **OLD**: I suggest pausing for a moment and listening to this thought
- **NEW**: I suggest pausing for a moment to listen to this thought
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses a more natural infinitive structure ('to listen') to express purpose, whereas Translation A uses a gerund ('and listening') which sounds slightly more like a list of two separate actions rather than a single cohesive suggestion.
  - [old/style/minor] The 'and + -ing' construction is grammatically correct but feels slightly less fluid and purposeful than the infinitive 'to listen' in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and flows better as a natural suggestion. Translation B creates a slight grammatical imbalance by using 'and listening', which makes the two actions feel like separate, heavy steps rather than a single fluid process.
  - [old/style/minor] The use of 'and listening' is grammatically correct but less smooth than the infinitive construction 'to listen' in this context.

#### 🟢 en `/story_distortions_description_1` — NEW лучше (2:0)

- **RU**: Исследования Аарона Бека показывают, что большинство из нас хранит неадаптивные схемы мышления, которые остаются неактивными, пока не столкнутся со стрессовыми жизненными событиями.
- **OLD**: Research by Aaron Beck showed that many of us hold maladaptive thinking patterns that stay dormant until triggered by stressful events.
- **NEW**: Aaron Beck's research shows that most of us hold unhelpful thinking patterns that often remain outside of awareness until we face stressful life events.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B follows the project's specific CBT terminology guidelines (using 'unhelpful' instead of 'maladaptive' and 'remain outside of awareness' for the concept of latent patterns) and sounds more natural for a mental well-being context.
  - [old/terminology/minor] Uses 'maladaptive' instead of the preferred 'unhelpful'; uses 'showed' (past) instead of 'shows' (present) for established research.
  - [old/style/minor] The phrase 'triggered by stressful events' is a bit more clinical/abrupt than the smoother flow in B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A perfectly aligns with the project's specific terminology guidelines (unhelpful, outside of awareness) and maintains a warm, expert tone. Translation B uses 'maladaptive' and 'dormant', which, while correct in a general sense, deviate from the established glossary and sound more academic/clinical.
  - [old/terminology/minor] Used 'maladaptive' instead of 'unhelpful' and 'dormant' instead of 'outside of awareness' as per the project's specific CBT terminology guidelines.
  - [old/style/minor] The tone is slightly more clinical/academic than the 'understanding friend-expert' tone required.

#### 🟡 en `/tutorial_daybook_gpt_title`— вердикт неустойчив

- **RU**: Вы отлично справились!
- **OLD**: You did an excellent job!
- **NEW**: You did great!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Both are natural, but 'You did an excellent job!' better captures the enthusiastic and slightly more formal 'отлично справились' while maintaining a warm, supportive tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Translation A is more natural, punchy, and fits the warm, supportive 'expert friend' tone of the app. Translation B is grammatically correct but feels slightly more formal and heavy for a quick celebratory feedback message.
  - [old/style/minor] slightly too formal/wordy for a quick UI feedback message

#### 🔴 en `/smerAiChatHint` — OLD лучше (2:0)

- **RU**: Ваш ответ…
- **OLD**: Your answer…
- **NEW**: Your answer...
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - Translation B correctly uses the typographic ellipsis (…), whereas Translation A uses three periods (...), which violates the typography rules specified in the instructions.
  - [new/style/minor] Uses three periods instead of a typographic ellipsis
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - Translation A uses the correct typographic ellipsis (three dots), whereas Translation B uses three periods, which is a common stylistic error in professional English typesetting.
  - [new/style/minor] Uses three separate periods instead of a single ellipsis character or proper typographic ellipsis.

#### 🟢 en `/alert_auth_sent` — NEW лучше (2:0)

- **RU**: Проверочный код отправлен на Email
- **OLD**: We sent a verification code to your email
- **NEW**: Verification code sent to your email
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A follows UX best practices for system notifications by being concise and using a passive construction that focuses on the object. Translation B adds an unnecessary subject ('We'), which makes it feel more like a conversational message than a standard UI status update.
  - [old/style/minor] Unnecessary addition of 'We', making the tone slightly more wordy than typical for a status message.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B follows UX best practices for system notifications by being concise and omitting unnecessary pronouns/subjects. Translation A is grammatically correct but sounds more like a conversational message than a standard UI status update.
  - [old/style/minor] Unnecessary use of 'We sent' and 'your', making the string longer and more conversational than typical for a system notification.

#### 🔴 en `/believe_final_fail` — OLD лучше (2:0)

- **RU**: К сожалению, ваше состояние ухудшилось
- **OLD**: We're sorry to hear you're feeling worse
- **NEW**: Unfortunately, you’re feeling worse
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B follows the 'understanding friend-expert' tone guidelines by using a warm, supportive opening, whereas A is a bit too blunt and direct for a mental health app.
  - [new/style/minor] Sounds slightly more clinical/detached than the desired supportive tone.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 75)
  - Translation A uses a warm, empathetic 'understanding friend' tone ('We're sorry to hear'), whereas Translation B is a literal, cold, and somewhat blunt translation of 'К сожалению' that sounds unnatural in a mental health context.
  - [new/style/major] The use of 'Unfortunately' at the start of a sentence in a supportive app feels clinical and detached, violating the 'warm, supportive tone' requirement.

#### ⚪ en `/auth_title`— ничья (2:0)

- **RU**: Авторизация
- **OLD**: Sign in
- **NEW**: Log in
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both 'Sign in' and 'Log in' are standard, natural, and perfectly acceptable UX patterns for 'Авторизация' in English. There is no functional or stylistic preference between them in this context.
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both 'Log in' and 'Sign in' are standard, natural UX terms for 'Авторизация' in English. The choice between them is a matter of stylistic preference for the specific app, and neither is incorrect.

