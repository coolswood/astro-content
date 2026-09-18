# QA: слепое парное сравнение переводов — en-final-g1-stories

- **Дата**: 2026-09-18T20:37:02.984Z
- **Метка**: en-final-g1-stories
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: stories.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## stories.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 12 | 🟢 6 | 🔴 2 | ⚪ 0 | 🟡 4 | 0 / 0 | 75% |
| **итого** | 12 | 🟢 6 | 🔴 2 | ⚪ 0 | 🟡 4 | 0 / 0 | 75% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×4, addition/minor×1, terminology/minor×1, omission/major×1; OLD — terminology/major×4, style/minor×3, omission/minor×1, mistranslation/minor×1, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/daybook/1/subtitle`— вердикт неустойчив

- **RU**: ИИ проанализирует Ваши записи и поможет взглянуть на ситуацию под другим углом.
- **OLD**: AI will analyze your entries and help you see the situation from a new perspective.
- **NEW**: The AI assistant will analyze your entries and help you see situations from a different perspective.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and natural for a UI context. Translation B adds 'assistant' which wasn't in the original, and uses the plural 'situations', making it sound slightly more generic and less personal.
  - [new/addition/minor] Added 'assistant' which is not in the source text
  - [new/style/minor] Plural 'situations' sounds less direct than the singular 'the situation' used in the original
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A follows the UX guidelines perfectly, using the correct term 'AI assistant' and the appropriate article. Translation B lacks the necessary article before 'AI' and uses 'the situation' (singular), which is slightly less natural than the plural 'situations' in this context.
  - [old/style/minor] Missing article before 'AI'; 'the situation' sounds a bit more restrictive than the general sense of the original.
  - [old/terminology/minor] Used 'AI' instead of the preferred 'AI assistant'.

#### 🟢 en `/daybook/0/subtitle` — NEW лучше (2:0)

- **RU**: Ведите ежедневные записи в удобном формате и выражайте свои мысли свободно.
- **OLD**: Keep daily entries in a convenient format and write freely.
- **NEW**: Keep daily entries in a convenient format and express your thoughts freely.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A is more faithful to the original meaning, capturing the nuance of 'expressing thoughts' rather than just the physical act of writing. Translation B is a bit too reductive.
  - [old/omission/minor] The phrase 'express your thoughts' is simplified to 'write', losing the emotional/expressive nuance of the original 'выражайте свои мысли'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B is more accurate to the original text, preserving the specific verb 'express' (выражайте) and the object 'thoughts' (мысли), whereas A simplifies it to 'write freely', losing the nuance of the original.
  - [old/omission/minor] The phrase 'express your thoughts' is simplified to 'write freely', which loses the specific meaning of the original Russian verb and object.

#### 🟢 en `/activity/0/subtitle` — NEW лучше (2:0)

- **RU**: Мы собрали множество психологических техник в одном месте, чтобы Вы могли найти те, что подходят именно Вам.
- **OLD**: We’ve brought many psychological techniques together in one place, so you can find what works best for you.
- **NEW**: We’ve gathered a variety of psychological techniques in one place so you can find the ones that work best for you.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and precise. 'A variety of' better captures the sense of 'множество' in this context than 'many', and 'the ones that work best' is a more natural way to refer back to the techniques than the slightly vague 'what works best'.
  - [old/style/minor] The phrasing 'find what works best' is grammatically fine but slightly less precise than 'find the ones that work best' when referring to specific techniques.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A sounds more natural and idiomatic for a mental health app. 'A variety of' is a better stylistic choice than 'many' in this context, and 'the ones that work best for you' flows better than the slightly clunky 'what works best for you' in B.
  - [old/style/minor] 'brought many... together' is slightly wordy and less idiomatic than 'gathered a variety of'.

#### 🟢 en `/diary/2/subtitle` — NEW лучше (2:0)

- **RU**: На каждом шаге Вы найдете понятные объяснения, как эффективно работать с дневником.
- **OLD**: You’ll find clear guidance at every step on how to use the diary effectively.
- **NEW**: At every step, you’ll find clear explanations on how to use the journal effectively.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B follows the project glossary by using 'journal' instead of 'diary' and maintains the original 'explanations'. Translation A changes the meaning by using 'guidance' and uses the outdated 'diary'.
  - [old/terminology/major] Used 'diary' instead of the required 'journal'
  - [old/mistranslation/minor] Changed 'explanations' to 'guidance', which slightly alters the tone and meaning
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A uses the correct project terminology ('journal' instead of 'diary') and follows the natural flow of English UX writing. Translation B uses 'diary', which is explicitly marked as legacy/incorrect in the glossary.
  - [old/terminology/major] Used 'diary' instead of the required 'journal'

#### 🔴 en `/coping/0/subtitle` — OLD лучше (2:0)

- **RU**: Учитесь мягко переформулировать негативные установки.
- **OLD**: Learn to gently reframe unhelpful beliefs.
- **NEW**: Learn to gently reframe unhelpful attitudes.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A uses the project-specific term 'unhelpful beliefs' for 'негативные установки', which aligns with the CBT terminology guidelines. Translation B uses 'attitudes', which is part of 'intermediate beliefs' but is less accurate for a general term like 'установки' in this context.
  - [new/terminology/minor] Using 'attitudes' is less precise than 'beliefs' for 'установки' in this context, though it is a valid CBT component.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - In CBT terminology, 'beliefs' is the standard term for 'установки' (intermediate or core beliefs), whereas 'attitudes' is less precise in this context.
  - [new/terminology/minor] Using 'attitudes' instead of the canonical 'beliefs' for cognitive structures.

#### 🔴 en `/intermediate/0/subtitle` — OLD лучше (2:0)

- **RU**: Постепенно погружайтесь глубже и исследуйте истоки своих переживаний на уровне промежуточных убеждений.
- **OLD**: Gradually go deeper to explore the roots of your experiences at the level of intermediate beliefs.
- **NEW**: Go deeper and explore the roots of your experiences through intermediate beliefs.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A accurately preserves the nuance of 'постепенно' (gradually) and correctly uses the preposition 'at the level of' to match the original's structure. Translation B omits 'gradually' and uses 'through', which changes the meaning from exploring a specific cognitive layer to using beliefs as a tool.
  - [new/omission/major] Missing 'gradually' (постепенно)
  - [new/style/minor] The use of 'through' is less precise than 'at the level of' when referring to cognitive layers
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation B is more accurate to the original's nuance and structure. Translation A omits the word 'gradually' (Постепенно) and uses 'through', which slightly changes the meaning of exploring 'at the level of' (на уровне).
  - [new/omission/major] Missing 'gradually' (Постепенно)
  - [new/style/minor] Using 'through' instead of 'at the level of' is less precise for CBT terminology

#### 🟢 en `/diary/0/subtitle` — NEW лучше (2:0)

- **RU**: Инструменты для анализа автоматических мыслей и замены их на более здоровые и адаптивные.
- **OLD**: Tools for analyzing automatic thoughts and replacing them with healthier, more adaptive ones.
- **NEW**: Tools to analyze automatic thoughts and replace them with more helpful and adaptive ones.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B follows the CBT terminology guidelines perfectly by using 'helpful' instead of 'healthier'. It also uses a more natural 'Tools to [verb]' construction for a functional description.
  - [old/terminology/major] Used 'healthier' instead of the required 'helpful' for thoughts (per CBT guidelines).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A perfectly follows the CBT terminology guidelines (using 'helpful' instead of 'healthy') and maintains a smooth, professional rhythm. Translation B uses 'healthier', which violates the specific instruction to avoid 'good/bad' or 'healthy/unhealthy' metaphors for thoughts.
  - [old/terminology/major] Used 'healthier' instead of the required 'helpful' for thoughts.

#### 🟡 en `/intermediate/1/subtitle`— вердикт неустойчив

- **RU**: Сохраняйте деструктивные убеждения в копинг-карточках и заменяйте их на более рациональные и поддерживающие.
- **OLD**: Save unhelpful beliefs on coping cards and replace them with more realistic, supportive ones.
- **NEW**: Save unhelpful beliefs in coping cards and replace them with more rational and supportive ones.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and follows the original structure. Translation B changes 'rational' to 'realistic' and omits the conjunction 'and', which slightly alters the flow and nuance.
  - [old/terminology/minor] Used 'realistic' instead of 'rational', which is a slight shift from the original 'рациональные'.
  - [old/style/minor] The omission of 'and' before 'supportive' makes the list feel slightly rushed compared to the balanced original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'realistic' instead of 'rational', which sounds more natural and less academic in a mental health context, and correctly uses the preposition 'on' for cards. Translation B uses 'rational', which is a bit more clinical/stiff, and 'in', which is less idiomatic for writing on a card.
  - [new/style/minor] The word 'rational' is slightly more academic/stiff than 'realistic' in this context; 'in coping cards' is less idiomatic than 'on'.

#### 🟢 en `/coping/1/subtitle` — NEW лучше (2:0)

- **RU**: Постепенно заменяйте деструктивные убеждения на более реалистичные и поддерживающие с помощью карточек.
- **OLD**: Use cards to gradually replace unhelpful beliefs with more realistic, supportive ones.
- **NEW**: Gradually replace unhelpful beliefs with more realistic and supportive ones using coping cards.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is superior because it uses the specific CBT term 'coping cards' as required by the glossary, whereas A uses the vague 'cards'. B also follows a more natural English flow for instructional text.
  - [old/terminology/major] Used 'cards' instead of the canonical 'coping cards'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A follows the original sentence structure perfectly and uses the correct CBT term 'coping cards'. Translation B is slightly more 'instructional' but loses the specific term 'coping cards' by using the generic 'cards', which is a loss of technical precision.
  - [old/terminology/major] Used 'cards' instead of the specific CBT term 'coping cards'
  - [old/style/minor] Changed the sentence structure from a direct instruction to a 'Use X to do Y' construction, which is less faithful to the original flow

#### 🟡 en `/activity/1/subtitle`— вердикт неустойчив

- **RU**: У каждой техники есть рейтинг — выбирайте те, что помогают Вам больше всего.
- **OLD**: Each technique has a rating—choose the ones that help you most.
- **NEW**: Each technique has a rating — choose the ones that help you the most.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A is more concise and follows the UX principle of brevity. Translation B is grammatically correct but slightly more wordy due to the extra 'the'.
  - [new/style/minor] The addition of 'the' before 'most' is grammatically fine but less punchy for a UI/instructional context compared to 'help you most'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 98)
  - Both translations are excellent and follow all guidelines. Translation A is slightly better due to the use of a spaced em dash, which aligns with the project's typography rules.
  - [old/style/minor] Uses a non-spaced em dash instead of the required spaced em dash ( — ).

#### 🟡 en `/intermediate/2/subtitle`— вердикт неустойчив

- **RU**: Промежуточные убеждения формируют автоматические мысли. Связывайте их, чтобы лучше понимать свои реакции и анализировать их со временем.
- **OLD**: Intermediate beliefs shape automatic thoughts. Link them to better understand your reactions and track patterns over time.
- **NEW**: Intermediate beliefs shape your automatic thoughts. Connect them to better understand your reactions and analyze them over time.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'track patterns', which is a much more natural and idiomatic way to express 'анализировать их со временем' in a mental health context than the literal 'analyze them'.
  - [new/style/minor] The phrase 'analyze them over time' is a bit clunky and literal compared to the more professional 'track patterns'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more accurate to the original text. Translation B introduces 'track patterns', which is a slight addition/interpretation not present in the source, whereas A stays true to 'analyze them'.
  - [old/addition/minor] The phrase 'track patterns' is a creative interpretation of 'анализировать их', which slightly deviates from the literal meaning of 'analyze them'.

#### 🟢 en `/diary/1/subtitle` — NEW лучше (2:0)

- **RU**: Дневник глубоко интегрирован с ИИ, который помогает формулировать и анализировать мысли.
- **OLD**: The diary is tightly integrated with AI to help you formulate and analyze thoughts.
- **NEW**: The journal is deeply integrated with AI to help you formulate and analyze your thoughts.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation B follows the project glossary by using 'journal' instead of 'diary' and correctly uses the possessive 'your thoughts' for a natural UX feel. Translation A uses 'diary', which is outdated for this context, and 'tightly', which is less idiomatic here than 'deeply'.
  - [old/terminology/major] Used 'diary' instead of the required 'journal'
  - [old/style/minor] Used 'tightly integrated' instead of the more natural 'deeply integrated'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A follows the project glossary by using 'journal' instead of 'diary' and correctly uses possessive pronouns ('your thoughts') which is essential for a natural English UX. Translation B uses 'diary' (outdated for this context) and lacks the possessive 'your', making it sound robotic and unnatural.
  - [old/terminology/major] Used 'diary' instead of the required 'journal'
  - [old/style/major] Missing possessive 'your' before 'thoughts', making the sentence sound like a dry manual rather than a supportive app

