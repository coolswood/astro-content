# QA: слепое парное сравнение переводов — en-final-g1-breathing

- **Дата**: 2026-09-18T20:27:03.718Z
- **Метка**: en-final-g1-breathing
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: breathing.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## breathing.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 3 | 🔴 5 | ⚪ 0 | 🟡 12 | 0 / 0 | 38% |
| **итого** | 20 | 🟢 3 | 🔴 5 | ⚪ 0 | 🟡 12 | 0 / 0 | 38% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×8, style/major×2; OLD — style/minor×13, mistranslation/minor×1, addition/minor×1, terminology/minor×1, omission/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/reset/subtitle`— вердикт неустойчив

- **RU**: Паттерн дыхания «2-1-6»
- **OLD**: 2-1-6 breathing pattern
- **NEW**: The “2-1-6” breathing pattern
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A is more complete and follows standard English title/label conventions by including the definite article 'The', making it sound like a formal name of a technique. Translation B is a bit too clipped, though acceptable for a UI label.
  - [old/style/minor] Missing the definite article 'The' which makes it feel slightly less like a formal title/name of a pattern.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation A follows the UI standard of using sentence case and avoiding unnecessary articles in short labels/titles. Translation B adds 'The', which makes it feel more like a sentence fragment than a clean UI header.
  - [new/style/minor] Unnecessary definite article for a title/label

#### 🟢 en `/balance/final_text` — NEW лучше (2:0)

- **RU**: Вы выровняли дыхание и подарили себе несколько минут устойчивости. Пусть это спокойное чувство баланса останется с вами и поможет мягко продолжить день.
- **OLD**: You have steadied your breathing and found a moment of stability. May this sense of balance stay with you as you move through the rest of your day.
- **NEW**: You’ve steadied your breathing and given yourself a few minutes of stability. May this calm sense of balance stay with you as you continue your day.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original's warmth and specific phrasing ('given yourself a few minutes'), whereas B changes 'gave yourself' to 'found' and slightly alters the rhythm. A also uses the contraction 'You’ve', which aligns better with the requested supportive, conversational tone.
  - [old/mistranslation/minor] Changed 'gave yourself a few minutes' to 'found a moment', which loses the nuance of self-care/gift-giving present in the original.
  - [old/style/minor] Uses 'You have' instead of the more natural and friendly contraction 'You’ve'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more faithful to the original's warmth and specific imagery ('given yourself a few minutes'), whereas A simplifies the meaning. B also uses the preferred contraction 'You’ve', making it sound more natural for a supportive app.
  - [old/omission/minor] Lost the specific mention of 'a few minutes' (несколько минут), replacing it with 'a moment'.

#### 🟡 en `/calm/description`— вердикт неустойчив

- **RU**: Иногда напряжение берет верх, и нам нужна пауза, чтобы просто перевести дух. Эта практика создана как ваша личная «кнопка сброса». Она бережно успокаивает нервную систему, помогая отпустить тревогу и вернуть ясное состояние ума.
- **OLD**: Sometimes tension takes over, and we need a pause just to catch our breath. Think of this practice as your personal reset button. It gently calms the nervous system, helps release anxiety, and brings the mind back to a clearer, steadier place.
- **NEW**: Sometimes tension takes over, and we just need a pause to catch our breath. This practice is designed as your personal “reset button.” It gently soothes the nervous system, helping you let go of anxiety and regain a clear mind.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more faithful to the original structure and tone, maintaining the 'designed as' phrasing which feels supportive and professional. Translation B introduces 'Think of this...', which is a slight addition, and the ending is a bit more wordy than the original.
  - [old/addition/minor] Added 'Think of this' which wasn't in the original.
  - [old/style/minor] The ending 'brings the mind back to a clearer, steadier place' is a bit more flowery/wordy than the concise 'regain a clear mind'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A flows much more naturally for a native speaker, using a more idiomatic and evocative ending ('brings the mind back to a clearer, steadier place') compared to the slightly more clinical and literal 'regain a clear mind' in B. A also avoids the unnecessary 'just' in the first sentence, which improves the rhythm.
  - [new/style/minor] The phrasing 'regain a clear mind' is grammatically correct but feels a bit stiff and less 'warm/supportive' than A's version.
  - [new/style/minor] The use of 'just' in the first sentence is slightly redundant and disrupts the flow compared to A.

#### 🟡 en `/square/subtitle`— вердикт неустойчив

- **RU**: Квадратное дыхание «4-4-4-4»
- **OLD**: Box breathing: 4–4–4–4
- **NEW**: “4-4-4-4” Box Breathing
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A follows standard English UX patterns for titles and uses the correct term 'Box breathing'. Translation B uses unnecessary quotation marks and an awkward word order for a title.
  - [new/style/minor] Unnecessary use of quotation marks and non-standard title structure for English UX.
  - [new/style/minor] Capitalization of 'Breathing' is acceptable in Title Case, but the overall flow is less natural than A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A follows the natural English naming convention for techniques, where the name comes first, followed by the specific pattern. Translation B uses a colon which feels more like a technical label than a title.
  - [old/style/minor] The use of a colon makes it look like a list item or a technical specification rather than a natural title for an exercise.

#### 🟡 en `/square/fullDescription`— вердикт неустойчив

- **RU**: Симметричный паттерн «4-4-4-4» стабилизирует нервную систему и повышает концентрацию. Цикл состоит из равных 4-секундных фаз: вдоха, задержки, выдоха и паузы. Задержки дыхания регулируют уровень углекислого газа, снижая пульс, а равномерный ритм помогает удерж…
- **OLD**: The symmetrical 4–4–4–4 pattern helps stabilize the nervous system and improve concentration. Each cycle is made up of four equal 4-second phases: inhale, hold, exhale, and pause. The breath holds help regulate carbon dioxide levels and slow the heart rate, wh…
- **NEW**: The symmetrical “4-4-4-4” pattern stabilizes the nervous system and improves concentration. Each cycle consists of equal 4-second phases: inhale, hold, exhale, and pause. Breath holds help regulate carbon dioxide levels and lower your heart rate, while the ste…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and flows better for a wellness app context. Translation B is slightly wordy ('is made up of', 'helps restore') and uses an en dash in the pattern which, while typographically correct, feels slightly more formal than the standard quotation marks used in A.
  - [old/style/minor] Slightly wordy constructions ('is made up of') compared to the more direct 'consists of' in A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more polished and flows better as a professional health/wellness text. Translation B feels slightly more repetitive due to the frequent use of 'helps' and 'help' in a way that mimics the Russian structure too closely.
  - [new/style/minor] The phrasing 'helps you maintain focus and restore balance' is grammatically fine but slightly wordier and less elegant than A's 'supports focus and helps restore balance'.
  - [new/style/minor] The use of quotation marks around 4-4-4-4 is unnecessary in English for this context, whereas A uses the em dash/en dash style which is cleaner.

#### 🟡 en `/reset/description`— вердикт неустойчив

- **RU**: Иногда тело словно застревает в напряжении: дыхание становится поверхностным, мысли ускоряются, а внутри появляется ощущение перегруза. Эта практика помогает сделать мягкий сброс. Двойной вдох наполняет легкие чуть глубже, а длинный выдох помогает отпустить ли…
- **OLD**: Sometimes your body can feel stuck in tension: your breath turns shallow, your thoughts race, and a sense of overload builds inside. This practice offers a gentle reset. The double inhale helps fill your lungs a little more deeply, while the long exhale suppor…
- **NEW**: Sometimes the body feels stuck in tension: breathing becomes shallow, thoughts race, and you feel overwhelmed. This practice helps you perform a gentle reset. A double inhale fills your lungs slightly deeper, while the long exhale helps release excess tension …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows better, using personal pronouns ('your body', 'your breath') which creates the 'understanding friend' tone required. Translation B feels slightly more clinical and detached.
  - [new/style/minor] The phrasing 'helps you perform a gentle reset' is a bit clunky/mechanical compared to 'offers a gentle reset'.
  - [new/style/minor] The shift from 'the body' to 'you feel' is slightly less smooth than the consistent use of 'your' in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and flows better for a mental health app. It uses 'you feel overwhelmed' instead of the clunky 'a sense of overload builds inside', and 'brings you back to yourself' is more natural than the gerund-heavy structure in B.
  - [old/style/minor] The phrase 'a sense of overload builds inside' is a bit heavy and literal compared to the more natural 'feeling overwhelmed'.
  - [old/style/minor] The ending 'supports letting go... and coming back' is grammatically correct but feels less punchy and rhythmic than A's direct verbs.

#### 🟡 en `/calm/fullDescription`— вердикт неустойчив

- **RU**: Паттерн дыхания «4-6» использует десятисекундные циклы для быстрого снятия стресса. 4-секундный вдох плавно, без задержек, сменяется 6-секундным выдохом с глубокой пульсацией. Этот удлиненный выдох стимулирует блуждающий нерв, замедляя пульс и блокируя кортизо…
- **OLD**: The 4–6 breathing pattern uses ten-second cycles to help relieve stress quickly. A smooth 4-second inhale flows straight into a 6-second exhale with a deep, steady rhythm. This longer exhale helps stimulate the vagus nerve, slow the heart rate, and reduce cort…
- **NEW**: The “4-6” breathing pattern uses 10-second cycles for quick stress relief. A 4-second inhale flows smoothly, without pauses, into a 6-second exhale with a deep release. This extended exhale stimulates the vagus nerve, slowing your heart rate and helping to low…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more idiomatic and captures the sensory nuance of 'пульсация' through 'release' (or rhythm), and more importantly, it follows the CBT/wellness tone of 'helping to lower' rather than the scientifically questionable 'blocking' (which A handles better by softening the causal link).
  - [old/style/minor] The phrasing 'helps stimulate... slow... and reduce' is slightly repetitive and less fluid than A's structure.
  - [old/terminology/minor] The translation of 'пульсация' as 'steady rhythm' is acceptable, but loses the specific sensation implied in the original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows better for a wellness context. Translation B's use of 'deep release' for 'глубокой пульсацией' is a mistranslation of the rhythmic/pulsating sensation, and its structure is slightly more fragmented.
  - [new/mistranslation/major] The term 'deep release' fails to capture 'пульсация' (pulsation/rhythm); it changes the physiological description to a feeling of relief.
  - [new/style/minor] The phrasing 'for quick stress relief' is slightly more clinical/staccato compared to the smoother 'to help relieve stress quickly' in A.

#### 🔴 en `/deep_relax/final_text` — OLD лучше (2:0)

- **RU**: Напряжение ушло, оставляя место для мягкости и покоя. Побудьте в этом состоянии еще немного и позвольте себе заслуженный отдых.
- **OLD**: The tension has eased, making room for softness and calm. Stay with this feeling a little longer, and allow yourself the rest you deserve.
- **NEW**: The tension has faded, leaving room for softness and peace. Stay in this state for a little longer and allow yourself some well-deserved rest.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more natural and idiomatic for a mindfulness context. 'Stay with this feeling' is much more common in English meditation/wellness guidance than the literal 'Stay in this state'.
  - [new/style/minor] The phrase 'Stay in this state' sounds slightly clinical/robotic compared to the more fluid 'Stay with this feeling'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and empathetic, using 'Stay with this feeling' which is much more idiomatic for mental health contexts than the literal 'Stay in this state'.
  - [new/style/minor] 'Stay in this state' sounds slightly clinical/robotic compared to the warm tone of the original.
  - [new/style/minor] 'faded' is acceptable, but 'eased' (in A) better captures the release of physical/mental tension.

#### 🟡 en `/balance/subtitle`— вердикт неустойчив

- **RU**: Ровное дыхание «5-5»
- **OLD**: Even “5-5” Breathing
- **NEW**: Steady “5-5” breathing
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In the context of breathing exercises, 'Even breathing' is the standard, idiomatic way to describe a rhythmic, balanced pattern. 'Steady' is grammatically correct but sounds slightly more like a description of a continuous process rather than a specific technique name.
  - [new/style/minor] 'Steady' is less idiomatic for a breathing technique title than 'Even'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A follows the sentence case rule for UI elements and uses 'Steady', which is a more natural and common way to describe rhythmic breathing in a wellness context. Translation B uses Title Case, which violates the project's UI guidelines.
  - [old/style/minor] Uses Title Case instead of sentence case for a UI label

#### 🔴 en `/calm/subtitle` — OLD лучше (2:0)

- **RU**: Классический паттерн «4-6»
- **OLD**: Classic 4–6 breathing pattern
- **NEW**: The classic “4-6” pattern
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B is superior because it provides necessary context ('breathing') that makes the phrase meaningful to a native speaker, whereas Translation A is a literal, underspecified calque. B also correctly uses an en dash for the range.
  - [new/style/minor] Too literal; without the word 'breathing', the pattern is ambiguous to an English reader.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 80)
  - Translation A is superior because it correctly identifies the context (breathing) and follows UX best practices by avoiding unnecessary articles. Translation B is too vague and uses incorrect quotation marks.
  - [new/omission/major] Missing the word 'breathing', which is essential for clarity in this context.
  - [new/style/minor] Uses straight quotes instead of typographic ones, and includes an unnecessary definite article for a heading.

#### 🟡 en `/deep_relax/subtitle`— вердикт неустойчив

- **RU**: Паттерн дыхания «4-2-6»
- **OLD**: 4–2–6 breathing pattern
- **NEW**: The “4-2-6” breathing pattern
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Translation A is more natural for a title/header, using the definite article 'The' which is standard for naming specific techniques. Translation B is a bit too clipped, though acceptable for a UI label.
  - [old/style/minor] Lacks the definite article, making it feel slightly more like a technical label than a proper title for a breathing exercise.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation A is more concise and follows UX standards for titles/labels by omitting the unnecessary definite article. Translation B is grammatically correct but feels slightly more heavy for a UI element.
  - [new/style/minor] unnecessary definite article 'The' for a title/label

#### 🟢 en `/square/final_text` — NEW лучше (2:0)

- **RU**: Вы вернули себе баланс и фокус. Глубокий вдох, легкая улыбка — и вы снова готовы управлять своим днем.
- **OLD**: You’ve returned to balance and focus. Take a deep breath, let a small smile appear, and step back into your day with steadiness.
- **NEW**: You’ve regained your balance and focus. Take a deep breath, a light smile — and you’re ready to take on your day.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more idiomatic and captures the rhythmic, uplifting tone of the original. Translation A feels slightly heavy and wordy, especially the phrase 'let a small smile appear'.
  - [old/style/minor] The phrasing 'let a small smile appear' is unnatural and clunky; 'step back into your day with steadiness' is an unnecessary expansion of the original meaning.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is idiomatic, punchy, and perfectly captures the supportive, rhythmic tone of the original. Translation B is overly wordy and feels like a literal translation (calque) of the Russian structure.
  - [old/style/major] The phrase 'let a small smile appear' is unnatural and clunky; 'step back into your day with steadiness' is an unnecessary expansion that loses the original's lightness.
  - [old/style/minor] The phrasing 'returned to balance' is less idiomatic than 'regained your balance' in this context.

#### 🟡 en `/reset/fullDescription`— вердикт неустойчив

- **RU**: Паттерн «2-1-6» основан на мягком физиологическом вздохе. Сначала вы делаете 2-секундный спокойный вдох, затем небольшой 1-секундный дополнительный вдох, а после - длинный 6-секундный медленный выдох. Такой ритм помогает углубить дыхание, снять ощущение зажато…
- **OLD**: The 2-1-6 pattern is based on a gentle physiological sigh. First, take a calm 2-second inhale, then a small 1-second extra inhale, followed by a long, slow 6-second exhale. This rhythm helps deepen your breathing, ease tightness in the chest, and gradually shi…
- **NEW**: The “2-1-6” pattern is based on a gentle physiological sigh. First, you take a calm 2-second inhale, followed by a small 1-second additional inhale, and then a long, slow 6-second exhale. This rhythm helps deepen your breathing, relieves the feeling of tightne…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more polished and follows the 'understanding friend' tone by using personal pronouns ('you', 'your'), which makes the instructions feel more supportive and natural. Translation B feels slightly more clipped and impersonal.
  - [old/style/minor] The omission of 'you' and 'your' makes the text feel a bit more like a dry manual rather than a supportive guide.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more concise and flows better, using imperative 'take' which is standard for instructions, whereas B is slightly wordy and repetitive. A also avoids the unnecessary quotation marks around the pattern name.
  - [new/style/minor] Use of 'you take' instead of imperative 'take' makes the instruction feel slightly more heavy/wordy.
  - [new/style/minor] The phrase 'relieves the feeling of tightness' is a bit more clunky than the more natural 'ease tightness'.

#### 🟡 en `/reset/final_text`— вердикт неустойчив

- **RU**: Вы сделали паузу и помогли телу сбросить лишнее напряжение. Позвольте себе еще несколько секунд просто побыть в этом новом, более легком состоянии.
- **OLD**: You paused and helped your body release some of that extra tension. Give yourself a few more seconds to simply rest in this new, lighter state.
- **NEW**: You’ve taken a pause and helped your body release excess tension. Allow yourself a few more seconds to simply exist in this new, lighter state.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more elegant and uses a more natural verb ('exist') to convey the meditative quality of 'просто побыть'. Translation B is slightly more colloquial and 'rest' changes the nuance of the original state.
  - [old/style/minor] The use of 'some of that extra tension' is a bit wordy and less precise than 'excess tension'.
  - [old/style/minor] 'rest in this state' is a slight shift in meaning from 'be in this state'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and warm, using 'rest in' which fits the meditative context perfectly, whereas 'exist in' in B sounds overly clinical or existential. A also correctly uses 'extra tension' which feels more conversational than 'excess tension'.
  - [new/style/major] The phrase 'simply exist in' is an unnatural/heavy way to translate 'просто побыть' in a mindfulness context; 'rest in' or 'be in' is much better.
  - [new/style/minor] The use of 'Allow yourself' is slightly more formal/stiff than the warmer 'Give yourself'.

#### 🔴 en `/calm/name` — OLD лучше (2:0)

- **RU**: Антистресс
- **OLD**: Stress Relief
- **NEW**: Anti-stress
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 75)
  - In English, 'Stress Relief' is the natural, idiomatic way to label a section or feature intended to reduce stress. 'Anti-stress' sounds like a literal translation from Russian or a technical term for a substance, making it less pleasant for a native speaker.
  - [new/style/major] Sounds like a calque; 'Stress Relief' is the standard UX term for this category.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 70)
  - In English, 'Stress Relief' is the natural, idiomatic way to label a section or product designed to reduce stress. 'Anti-stress' sounds like a literal translation from Russian and is rarely used as a standalone heading in mental health contexts.
  - [new/style/major] Sounds like a calque; 'Anti-stress' is typically used for products (like anti-stress toys) rather than a wellness category or heading.

#### 🔴 en `/deep_relax/description` — OLD лучше (2:0)

- **RU**: Когда день был долгим, а в теле накопилось напряжение, эта практика поможет мягко «осесть» и прийти в себя. Короткая пауза после вдоха дает мыслям замереть, а длинный выдох приносит чувство глубокого отпускания. Идеальный выбор, чтобы снять мышечную усталость …
- **OLD**: When the day has been long and tension has built up in the body, this practice helps you gently settle and come back to yourself. A brief pause after the inhale gives the mind a moment to quiet down, while the longer exhale brings a deeper sense of release. It…
- **NEW**: When the day has been long and tension has built up in your body, this practice helps you gently “settle” and recover. A short pause after the inhale allows your thoughts to still, while the long exhale brings a sense of deep release. It’s the perfect choice t…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more natural and idiomatic for a mental well-being context. 'Winding down' and 'come back to yourself' are much more evocative and appropriate for this genre than the slightly more literal 'calm down' or 'recover'.
  - [new/style/minor] The use of quotation marks around 'settle' is unnecessary in English and feels like a translation artifact; 'calm down' is a bit basic/clinical compared to 'winding down'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 84)
  - Translation A sounds much more natural and idiomatic for a mental well-being context. It uses smooth, flowing phrases like 'gives the mind a moment to quiet down' and 'winding down', whereas B feels slightly more literal and stilted.
  - [new/style/minor] The use of quotation marks around 'settle' is unnecessary in English and looks like a translation artifact.
  - [new/style/minor] The phrase 'allows your thoughts to still' is grammatically possible but sounds awkward/poetic compared to the more natural 'quiet down' or 'settle' in A.

#### 🟡 en `/deep_relax/fullDescription`— вердикт неустойчив

- **RU**: Паттерн «4-2-6» использует 12-секундные циклы для глубокого расслабления. Плавный 4-секундный вдох переходит в короткую 2-секундную паузу на пике. Завершает цикл длинный 6-секундный мягкий спуск на выдохе. Такая структура физиологически снимает мышечное напряж…
- **OLD**: The 4–2–6 pattern uses 12-second cycles for deep relaxation. A smooth 4-second inhale leads into a brief 2-second pause at the top of the breath. The cycle ends with a long, gentle 6-second descent on the exhale. This structure can help release muscle tension …
- **NEW**: The “4-2-6” pattern uses 12-second cycles for deep relaxation. A smooth 4-second inhale leads into a short 2-second pause at the peak. The cycle concludes with a long, gentle 6-second exhale. This structure helps physiologically relieve muscle tension and shif…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and uses more natural terminology for breathing exercises ('exhale' vs 'descent on the exhale'). Translation B's 'descent' is a bit literal and clunky in this context.
  - [old/style/minor] The phrase 'descent on the exhale' is less idiomatic than simply 'exhale' or 'gentle exhale' in a breathing guide.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A follows the CBT/mental health tone guidelines by softening the causal claim ('can help') and uses more natural, idiomatic phrasing ('at the top of the breath'). Translation B is too literal and aggressive in its claims, and 'concludes with a long, gentle 6-second exhale' loses the nuance of the 'descent' (the transition/flow) mentioned in the original.
  - [new/style/major] Violates the rule of softening causality: 'helps physiologically relieve' is too direct/promissory for psychoeducation; 'can help' is preferred.
  - [new/style/minor] The phrase 'at the peak' is slightly more abrupt than the more natural 'at the top of the breath'.
  - [new/omission/minor] Lost the nuance of 'мягкий спуск' (gentle descent) by simply saying 'exhale'.

#### 🔴 en `/balance/description` — OLD лучше (2:0)

- **RU**: Иногда нам не нужно срочно успокаиваться или глубоко расслабляться — достаточно просто выровнять внутренний ритм. Эта практика помогает мягко замедлиться, вернуть ощущение устойчивости и снова почувствовать связь с собой. Равные вдохи и выдохи создают спокойны…
- **OLD**: Sometimes, you don’t need to force relaxation or strive for deep calm—you just need to steady your internal rhythm. This practice helps you gently slow down, regain stability, and reconnect with yourself. Equal inhales and exhales create a calm, predictable pa…
- **NEW**: Sometimes we don’t need urgent calming or deep relaxation — we just need to steady our internal rhythm. This practice helps you gently slow down, regain a sense of stability, and reconnect with yourself. Equal inhales and exhales create a calm, predictable pac…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation B captures the supportive 'expert friend' tone much better by avoiding the clunky 'urgent calming' and using a more natural phrasing ('force relaxation'). Translation A feels slightly more like a literal translation of the Russian structure.
  - [new/style/major] the phrase 'urgent calming' is unnatural and sounds like a direct translation of 'срочно успокоиться'; it lacks the flow of native English.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and idiomatic for a mental health app. Translation B suffers from a clunky, literal translation of 'срочно успокаиваться' (urgent calming) and an inconsistent shift from 'we' to 'you'.
  - [new/style/major] 'urgent calming' is an unnatural, heavy noun phrase; 'don't need to calm down urgently' or 'don't need to rush into relaxation' would be better.
  - [new/style/minor] Inconsistent person: starts with 'we' and switches to 'you' in the second sentence, whereas A uses 'you' consistently as a supportive expert.

#### 🟢 en `/deep_relax/phaseNames/inhale` — NEW лучше (2:0)

- **RU**: Плавный вдох
- **OLD**: Smooth inhale
- **NEW**: Gentle inhale
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 98)
  - In the context of breathing exercises, 'gentle' is the idiomatic and standard way to describe a soft, controlled breath, whereas 'smooth' sounds more like a description of a texture or a physical motion.
  - [old/style/minor] 'Smooth' is less natural for breathing instructions; 'gentle' or 'slow' are preferred in mindfulness/CBT contexts.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - In the context of breathing exercises, 'gentle' is the idiomatic and natural way to describe a soft, controlled breath, whereas 'smooth' sounds slightly more mechanical or physical.
  - [old/style/minor] 'Smooth' is less common for breathing instructions in mental health apps; 'gentle' is the standard UX term for such guidance.

#### 🟡 en `/balance/fullDescription`— вердикт неустойчив

- **RU**: Паттерн дыхания «5-5» использует десятисекундные циклы без задержек. 5-секундный вдох плавно сменяется таким же 5-секундным выдохом. Равный ритм помогает стабилизировать дыхание, снизить внутреннюю суету и вернуть ощущение спокойного контроля без лишнего напря…
- **OLD**: The “5-5” breathing pattern uses ten-second cycles without any breath holds. A 5-second inhale is smoothly followed by a 5-second exhale. This steady rhythm helps stabilize your breathing, reduce restlessness, and restore a sense of calm control without unnece…
- **NEW**: The “5-5” breathing pattern uses 10-second cycles without pauses. A 5-second inhale flows smoothly into an equal 5-second exhale. This steady rhythm helps stabilize your breathing, reduce internal restlessness, and restore a sense of calm control without unnec…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and flows better, especially with the phrase 'flows smoothly into', which captures the essence of 'плавно сменяется' better than the passive construction in B. Translation A also preserves the nuance of 'internal restlessness' (внутреннюю суету) more accurately.
  - [old/style/minor] The passive 'is smoothly followed by' is slightly more clinical and less fluid than 'flows smoothly into'.
  - [old/omission/minor] Omitted 'internal' (внутреннюю) before restlessness, which slightly changes the poetic/descriptive tone of the original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and professional. 'Breath holds' is a much more natural term in a breathing exercise context than 'pauses', and 'smoothly followed by' flows better than the slightly clunky 'flows smoothly into an equal'.
  - [new/style/minor] 'without pauses' is a bit generic; 'breath holds' is the standard term in breathing techniques. 'Internal restlessness' is a slightly literal translation of 'внутреннюю суету' compared to the more natural 'restlessness'.

