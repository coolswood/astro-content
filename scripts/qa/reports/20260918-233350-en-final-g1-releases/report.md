# QA: слепое парное сравнение переводов — en-final-g1-releases

- **Дата**: 2026-09-18T20:33:50.299Z
- **Метка**: en-final-g1-releases
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: releases.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## releases.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 4 | 🟢 3 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | 100% |
| **итого** | 4 | 🟢 3 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×2, terminology/minor×1, style/major×1; OLD — style/minor×5, terminology/minor×2, style/major×1

### Детали пар (для спот-чека)

#### 🟡 en `/593`— вердикт неустойчив

- **RU**: Теперь заполнение дневника автоматических мыслей больше похоже на сессию с психологом. В «Бережном диалоге» просто расскажите своими словами всё, что произошло, — ассистент мягко направит вас и сам заполнит нужные шаги дневника. Вы сможете сосредоточиться на с…
- **OLD**: Filling out your automatic thought record now feels more like a session with a therapist. In “Gentle Dialogue,” simply describe what happened in your own words—the assistant will gently guide you through the process and fill in the relevant sections of the tho…
- **NEW**: Keeping your automatic thought journal now feels more like a session with a psychologist. With “Gentle Dialogue,” you can simply describe what happened in your own words — the assistant will softly guide you and fill in the necessary steps of the journal itsel…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A uses more natural, idiomatic English for a mental health app, whereas B contains several 'translationese' markers and awkward phrasing.
  - [new/terminology/minor] Used 'psychologist' instead of 'therapist' (though psychologist is in glossary, 'session with a therapist' is the more natural idiomatic collocation in English for this context).
  - [new/style/major] The phrase 'fill in the necessary steps of the journal itself' is clunky and sounds like a direct translation of 'заполнит нужные шаги дневника'.
  - [new/style/minor] Used 'softly guide' which sounds slightly unnatural compared to 'gently guide' in a psychological context.
  - [new/style/minor] The use of 'With “Gentle Dialogue”' is a bit stiff compared to 'In “Gentle Dialogue”'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A follows the project glossary perfectly (psychologist, automatic thought journal) and sounds more natural and concise. Translation B uses 'therapist' and 'thought record' which, while acceptable in general CBT, deviate from the specific project terminology and feel slightly wordier/clunkier.
  - [old/terminology/minor] Used 'therapist' instead of 'psychologist' and 'thought record' instead of 'automatic thought journal' as per glossary.
  - [old/style/minor] The phrasing 'what you remember, what was going through your mind, and how you felt' is a bit heavy compared to the more elegant 'memories, thoughts, and feelings'.

#### 🟢 en `/587` — NEW лучше (2:0)

- **RU**: Масштабное обновление ИИ-ассистента! Теперь Анализ — это только начало. Мы добавили полноценный интерактивный диалог: обсуждайте полученные инсайты и выполняйте психологические практики под чутким руководством искусственного интеллекта. И это лишь первый шаг к…
- **OLD**: Major update to the AI assistant! Now Analysis is just the beginning. We’ve added a full interactive dialogue: discuss the insights you receive and complete psychological practices under the thoughtful guidance of artificial intelligence. And this is only the …
- **NEW**: A massive update for your AI assistant! Now, Analysis is just the beginning. We’ve added full interactive dialogue: you can now discuss your insights and work through exercises under the gentle guidance of your AI assistant. And this is just the first step tow…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A sounds much more natural and follows the 'understanding friend' tone, using personal pronouns ('your AI assistant') and smoother phrasing. Translation B feels slightly more robotic and uses 'psychological practices', which is a heavy calque from Russian.
  - [old/style/minor] Missing article before 'Analysis' makes it feel slightly clipped.
  - [old/terminology/minor] 'psychological practices' is less idiomatic than 'exercises' or 'techniques' in this context.
  - [old/style/minor] 'thoughtful guidance' is a bit literal; 'gentle guidance' (in A) is a more common collocation for AI/supportive tools.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation B sounds much more natural and follows the 'understanding friend' tone. It uses 'work through exercises' and 'gentle guidance', which are more idiomatic in a mental health context than the literal 'complete psychological practices' and 'thoughtful guidance' in A.
  - [old/style/minor] The phrase 'complete psychological practices' sounds a bit clinical/robotic; 'work through exercises' is more natural.
  - [old/style/minor] 'Thoughtful guidance' is a bit of a literal translation of 'чутким руководством'; 'gentle guidance' is the standard idiomatic way to express this in English.

#### 🟢 en `/574` — NEW лучше (2:0)

- **RU**: Встречайте новый раздел в упражнениях — Дыхательные практики! 🧘‍♂️ Они помогут снять стресс, справиться с паникой или, наоборот, мобилизовать всю энергию! ⚡️
- **OLD**: Meet the new section in exercises — Breathing practices! 🧘‍♂️ They can help ease stress, manage panic, or, on the other hand, mobilize all your energy! ⚡️
- **NEW**: Introducing a new section in Exercises — Breathing Practices! 🧘‍♂️ They’ll help you relieve stress, manage panic, or even boost your energy! ⚡️
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A is much more natural and idiomatic for a mobile app. Translation B uses a clunky, literal translation of 'наоборот' (on the other hand) and fails to follow the sentence case rule for the section name.
  - [old/style/major] The phrase 'on the other hand' is too heavy and formal for this context; 'even boost' is a much better way to convey the contrast.
  - [old/style/minor] Breathing practices should be capitalized as it is a section name (Exercises/Breathing Practices).
  - [old/style/minor] The verb 'mobilize' is a bit too literal/academic; 'boost' is more natural for energy.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation B follows all UX and stylistic guidelines: it uses sentence case for the section name (as per instructions for UI/lists), uses a more natural 'Introducing' for announcements, and employs much more idiomatic English ('boost your energy' vs 'mobilize all your energy').
  - [old/style/major] The phrase 'on the other hand' is too heavy and clunky for a punchy app announcement; 'mobilize all your energy' sounds like a literal translation of the Russian 'мобилизовать'.
  - [old/terminology/minor] Used lowercase for 'exercises' and 'breathing practices' which is fine, but the overall flow is less natural than B.

#### 🟢 en `/570` — NEW лучше (2:0)

- **RU**: Отличные новости: мы решили сделать приложение еще доступнее! С этого дня мы будем открывать больше премиум-опций для бесплатного использования. Начнем с расслабляющих звуков: теперь таймер остановки стал бесплатным навсегда!
- **OLD**: Great news: we’ve decided to make the app even more accessible! Starting today, we’ll be making more premium features available for free. We’re beginning with relaxing sounds: the sleep timer is now free forever!
- **NEW**: Great news: we’re making the app even more accessible! Starting today, we’ll be unlocking more Premium features for everyone. We’re kicking things off with relaxing sounds: the sleep timer is now free forever!
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B sounds much more natural and engaging for a product announcement. It uses 'unlocking' and 'kicking things off', which fit the 'understanding friend' tone better than the more formal 'making available' and 'beginning' in A.
  - [old/style/minor] Slightly more formal and less idiomatic than B ('making available' vs 'unlocking', 'beginning' vs 'kicking things off').
  - [old/terminology/minor] Used 'premium features' instead of 'Premium features' (capitalization for the tier name).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A sounds much more natural and engaging for a product announcement, using idiomatic expressions like 'kicking things off' and 'unlocking features'. Translation B is grammatically correct but feels slightly wordy and formal ('making more premium features available for free').
  - [old/style/minor] The phrasing 'making more premium features available for free' is a bit heavy and lacks the punchy, modern UX tone of 'unlocking features'.

