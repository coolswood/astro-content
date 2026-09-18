# QA: слепое парное сравнение переводов — en-final-g1-sitemap

- **Дата**: 2026-09-18T20:35:52.134Z
- **Метка**: en-final-g1-sitemap
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: sitemap.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## sitemap.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 11 | 🔴 4 | ⚪ 0 | 🟡 5 | 0 / 0 | 73% |
| **итого** | 20 | 🟢 11 | 🔴 4 | ⚪ 0 | 🟡 5 | 0 / 0 | 73% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×7; OLD — style/minor×8, style/major×3, omission/minor×3, addition/minor×3, terminology/minor×2, terminology/major×1

### Детали пар (для спот-чека)

#### 🟢 en `/sdvdpsvGscfvw/description` — NEW лучше (2:0)

- **RU**: Возможность заполнять дневники голосом.
- **OLD**: Fill out journals by voice.
- **NEW**: The ability to record journal entries using your voice.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Translation B is much more natural and follows the UX standard for describing features. Translation A sounds like a direct, slightly clunky command rather than a description of a capability.
  - [old/style/major] Sounds like a direct imperative command ('Fill out journals...') rather than a feature description ('The ability to...').
  - [old/terminology/minor] Uses 'Fill out' which is more for forms; 'record entries' is more idiomatic for voice functionality.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a polished, natural-sounding phrase that follows UX best practices for describing features. Translation B is a bit too literal and sounds like a clunky instruction rather than a feature description.
  - [old/style/major] Sounds like a direct command/instruction rather than a feature description; 'by voice' is less idiomatic than 'using your voice' or 'via voice' in this context.

#### 🟡 en `/iF6sKCdvfds/title`— вердикт неустойчив

- **RU**: Промежуточные убеждения
- **OLD**: Intermediate Beliefs
- **NEW**: Intermediate beliefs
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - The original is a title/heading. According to the style guide, titles should follow Title Case or Sentence case, but for a standalone section heading like 'Intermediate Beliefs', Title Case is the standard professional convention for English-speaking markets.
  - [new/style/minor] Uses sentence case for a standalone heading, which is less common for major section titles in this context compared to Title Case.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 100)
  - According to the project guidelines, UI elements and section titles should use sentence case (only the first word capitalized), making A the correct choice.
  - [old/style/minor] Uses Title Case instead of the required sentence case for UI/section titles.

#### 🟢 en `/iF6sKverhdfd/description` — NEW лучше (2:0)

- **RU**: Добавить ежедневную оценку состояния и график динамики, связанный с изменениями установок.
- **OLD**: Add a daily state rating and a trend chart linked to shifts in beliefs.
- **NEW**: Add a daily check-in and a progress graph linked to changes in beliefs.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses 'daily check-in', which is the established UI term for 'ежедневная оценка состояния' in this project, making it much more natural for a user. Translation B uses 'state rating', which sounds like a literal translation (calque) and is not standard UX English.
  - [old/style/major] 'daily state rating' is unnatural; 'daily check-in' is the correct term for this feature.
  - [old/style/minor] 'trend chart' is acceptable, but 'progress graph' (in A) is more common for tracking personal improvement in mental health apps.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B uses 'daily check-in', which is the established UI term for mood/state tracking, and 'progress graph', which sounds more natural for a user-facing app than 'trend chart'.
  - [old/terminology/minor] uses 'state rating' instead of the standard 'check-in'
  - [old/style/minor] 'trend chart' is slightly more clinical/analytical than the more user-friendly 'progress graph'

#### 🟢 en `/iF6sKvevscdf1/description` — NEW лучше (2:0)

- **RU**: Оценивать не только состояние до и после, но также эмоции и выполненные практики.
- **OLD**: Rate not only your state before/after, but also emotions and completed practices.
- **NEW**: Rate not just your state before and after, but also your emotions and completed practices.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is grammatically complete and follows the natural flow of English. Translation B uses a slash ('before/after') and omits the possessive pronoun 'your', which makes it feel like a fragmented, low-quality UI string rather than a polished instruction.
  - [old/style/minor] The use of 'before/after' is too clipped for a supportive tone, and the omission of 'your' before 'emotions' makes the sentence feel unnatural.
  - [old/omission/minor] Missing the possessive 'your' which is necessary for a natural 'expert friend' tone.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more natural and follows English rhythm better. Translation A uses a slash (before/after) which feels like a technical note rather than a smooth sentence, and it lacks the necessary possessive pronoun 'your' for 'emotions', making it sound slightly clipped.
  - [old/style/minor] The use of 'before/after' is too telegraphic/technical for a supportive tone; 'not only... but also' is fine, but the lack of 'your' before 'emotions' makes it feel slightly ungrammatical/incomplete.
  - [old/omission/minor] Missing the possessive 'your' before 'emotions', which is preferred in UX to make it personal.

#### 🔴 en `/iF6sKCdvfds/description` — OLD лучше (2:0)

- **RU**: Добавить возможность связывать автоматические мысли с убеждениями и строить карту убеждений.
- **OLD**: Link automatic thoughts to beliefs and build a belief map.
- **NEW**: Add the ability to link automatic thoughts to beliefs and build a belief map.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B is more concise and follows UX best practices for actions/buttons by using a direct imperative. Translation A includes 'Add the ability to', which is a wordy, heavy construction (calque of 'Добавить возможность') that sounds unnatural in a functional context.
  - [new/style/minor] Wordy and indirect; 'Add the ability to' is unnecessary filler for a functional requirement or action.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A follows UX best practices by using a direct imperative, which is more concise and natural for a task or feature description. Translation B is a literal translation of the Russian 'Добавить возможность', which creates unnecessary wordiness (clutter) in English.
  - [new/style/minor] Wordy 'Add the ability to' construction is a common translationese/calque from Russian; in English UX, it is better to use the direct action.

#### 🟢 en `/QWjMvNfKLw/description` — NEW лучше (2:0)

- **RU**: Дать возможность добавлять несколько автоматических мыслей в одну запись, каждая с отдельной оценкой и альтернативным ответом.
- **OLD**: Allow several automatic thoughts in a single entry, each with its own rating and adaptive response.
- **NEW**: Allow adding multiple automatic thoughts to a single entry, each with its own belief rating and adaptive response.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more precise and follows the CBT terminology guidelines perfectly, specifically using 'belief rating' instead of the vague 'rating'.
  - [old/omission/minor] Missing the verb 'adding' makes the sentence slightly less clear as a functional description, though it is understandable.
  - [old/terminology/minor] Used 'rating' instead of the required 'belief rating'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more precise and follows the project's terminology guidelines. It correctly uses 'belief rating' instead of the generic 'rating' and maintains the verb 'adding' from the original.
  - [old/terminology/minor] Used 'rating' instead of the canonical 'belief rating'.
  - [old/omission/minor] Omitted the verb 'adding' (добавлять), making the sentence slightly less direct.

#### 🟢 en `/lkmvdsvdsfds/title` — NEW лучше (2:0)

- **RU**: Изображения в ежедневнике
- **OLD**: Images in the Daily Journal
- **NEW**: Images in the Journal
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B follows the project's glossary and UX standards, using the concise 'Journal' as established in the documentation. Translation A adds 'Daily', which is redundant and deviates from the standard naming convention.
  - [old/style/minor] Redundant use of 'Daily' when 'Journal' is the established term for the section.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Translation A follows the project glossary perfectly, using 'Journal' for 'Ежедневник'. Translation B adds 'Daily', which is redundant and not present in the original.
  - [old/addition/minor] Added 'Daily' which is not in the source and makes the title wordier than necessary

#### 🟢 en `/sdvdpsvGscfvw/title` — NEW лучше (2:0)

- **RU**: Голосовой ввод
- **OLD**: Voice Input
- **NEW**: Voice input
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - According to the project guidelines, UI strings should use sentence case (only the first word capitalized). Translation B follows this rule, whereas Translation A uses Title Case.
  - [old/style/minor] Uses Title Case instead of sentence case for a UI label
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 100)
  - According to the project guidelines, UI strings must use sentence case (only the first word capitalized). Translation A follows this rule, while Translation B uses Title Case.
  - [old/style/minor] Uses Title Case instead of the required sentence case for UI elements

#### 🟢 en `/W9mMGTmapW/title` — NEW лучше (2:0)

- **RU**: Веб-версия
- **OLD**: Web Version
- **NEW**: Web version
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - According to the project's style guide, UI elements and labels should use sentence case (only the first word capitalized). Translation B follows this rule, whereas Translation A uses Title Case.
  - [old/style/minor] Uses Title Case instead of the required sentence case for UI labels.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 100)
  - According to the project guidelines, UI strings should use sentence case (only the first word capitalized). Translation A follows this rule, while Translation B uses Title Case.
  - [old/style/minor] Uses Title Case instead of sentence case for a UI label

#### 🟡 en `/W9mMGTmapW/description`— вердикт неустойчив

- **RU**: Создать веб-версию приложения. Было бы удобно вести дневник и с компьютера?
- **OLD**: Create a web version of the app. Would keeping a journal on your computer be convenient?
- **NEW**: Create a web version of the app. Would it be convenient to keep a journal on your computer?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses a more natural, idiomatic gerund construction ('Would keeping... be convenient?') which sounds more like a native speaker's suggestion, whereas B uses a slightly more formal and 'translated' sounding dummy subject structure ('Would it be...').
  - [new/style/minor] The 'Would it be convenient to...' construction is grammatically correct but feels slightly more stiff and textbook-like compared to the more fluid gerund form in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and follows the conversational, user-centric tone of the original. Translation B is grammatically correct but feels slightly more formal and heavy due to the gerund subject.
  - [old/style/minor] The structure 'Would keeping... be convenient?' is a bit more stiff/academic compared to the more natural 'Would it be convenient to...' used in A.

#### 🔴 en `/sdvdNdbxdwQfb/description` — OLD лучше (2:0)

- **RU**: Возможность свободного общения с ИИ: делиться переживаниями, получать поддержку и советы.
- **OLD**: Free-form conversations with AI: share what you’re going through and receive support and guidance.
- **NEW**: Chat freely with an AI assistant to share your feelings, get support, and receive advice.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more elegant and professional, using the idiomatic 'share what you’re going through' which fits the supportive tone perfectly. Translation B feels slightly more repetitive ('share... get... and receive') and uses 'feelings', which is less nuanced than the original 'переживаниями' in this context.
  - [new/style/minor] The phrasing 'share your feelings, get support, and receive advice' is a bit clunky and repetitive compared to the smoother rhythm of A.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation B is much more idiomatic and natural for a mental health app, using 'share what you’re going through' instead of the slightly clinical 'share your feelings'. It also correctly captures the essence of 'свободное общение' as 'free-form conversations'.
  - [new/style/minor] The structure 'Chat freely... to share' is a bit more instructional/imperative than the original noun phrase, and 'share your feelings' sounds slightly more generic/clinical than the nuanced 'переживания'.

#### 🟢 en `/rsoklcescfvwz/description` — NEW лучше (2:0)

- **RU**: В конце дня AI сможет подводить итоги, делать выводы и давать рекомендации.
- **OLD**: At day’s end, AI can summarize, draw conclusions, and offer recommendations.
- **NEW**: At the end of the day, the AI can summarize your day, provide insights, and offer recommendations.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A sounds natural and follows the UX tone of a 'helpful expert,' whereas B is overly clipped and sounds like a technical manual or a telegram.
  - [old/style/major] The phrase 'At day's end' is too poetic/literary for a modern app; 'At the end of the day' is the standard UX pattern.
  - [old/style/minor] Missing the article 'the' before AI, which makes it sound unnatural in this context.
  - [old/omission/minor] The addition of 'your day' in A is a good transcreation that improves flow, while B's 'draw conclusions' is a bit heavy/academic compared to the more natural 'provide insights'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is more natural and idiomatic for a mental health app, using 'provide insights' instead of the literal 'draw conclusions'. It also adds 'your day' which improves flow and clarity for the user.
  - [old/style/minor] The phrase 'At day's end' sounds slightly poetic or literary rather than modern UX/app style; 'At the end of the day' is more standard.
  - [old/style/minor] 'Draw conclusions' sounds a bit formal/academic compared to the warm tone of the app.

#### 🟢 en `/sdvdNdbxdwQfb/title` — NEW лучше (2:0)

- **RU**: Виртуальный психолог
- **OLD**: Virtual Therapist
- **NEW**: Virtual psychologist
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - The translation must strictly follow the glossary where 'психолог' is translated as 'psychologist'. Translation A uses 'therapist', which violates the project's specific terminology requirements.
  - [old/terminology/major] Used 'therapist' instead of the required 'psychologist'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A strictly follows the glossary requirement to use 'psychologist' instead of 'therapist'.
  - [old/terminology/minor] Uses 'Therapist' instead of the required 'psychologist'

#### 🟡 en `/ykRKsDopcp/description`— вердикт неустойчив

- **RU**: Добавить шаг, в котором можно приводить аргументы «за» и «против» автоматической мысли.
- **OLD**: Add a step to list arguments “for” and “against” the automatic thought.
- **NEW**: Add a step to list arguments “for” and “against” an automatic thought.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A correctly uses the definite article 'the', referring to the specific automatic thought being processed in the context of the step. Translation B uses 'an', which sounds more generic and less natural for a UI instruction describing a specific process.
  - [new/style/minor] Use of indefinite article 'an' makes the instruction sound slightly detached from the specific thought the user is currently working with.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A uses the indefinite article 'an', which is more appropriate here as it refers to any arbitrary automatic thought in a general instruction. Translation B uses 'the', which implies a specific thought already mentioned, making it sound slightly less natural for a general UI instruction.
  - [old/style/minor] Use of the definite article 'the' makes the instruction sound like it refers to one specific thought rather than the concept of an automatic thought in general.

#### 🟡 en `/eur8RglkH0/description`— вердикт неустойчив

- **RU**: Добавить больше обучающих материалов: о работе с деструктивными мыслями, тревогой, РПП и другими состояниями.
- **OLD**: Add more educational content: working with unhelpful thoughts, anxiety, eating disorders (ED), and other conditions.
- **NEW**: Add more educational materials: working with unhelpful thoughts, anxiety, eating disorders, and other conditions.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is cleaner and follows the principle of not adding unnecessary information. Translation B introduces an abbreviation (ED) that was not present in the original, which violates the rule against additions.
  - [old/addition/minor] Added '(ED)' which is not in the source text
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A is superior because it uses 'educational content', which sounds more natural in a digital product context than 'educational materials', and correctly introduces the acronym (ED) for eating disorders, which is standard practice for clarity.
  - [new/style/minor] 'educational materials' sounds slightly more academic/heavy than 'educational content' in a modern app context; lacks the acronym (ED) for eating disorders.

#### 🟢 en `/sdvsdsdlwwQec/title` — NEW лучше (2:0)

- **RU**: AI в ежедневнике
- **OLD**: AI in the Daily Journal
- **NEW**: AI in the Journal
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - The original 'ежедневник' refers to the product/section 'Journal'. Translation A adds 'Daily', which is redundant and not present in the source, whereas B is concise and follows the project's naming convention.
  - [old/addition/minor] Added 'Daily' which is not in the original and makes the title wordier than necessary
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A follows the project glossary and UI standards perfectly. Translation B adds 'Daily', which is an unnecessary addition not present in the original and deviates from the established 'Journal' terminology.
  - [old/addition/minor] Added 'Daily' which is not in the source and makes the title wordier than necessary

#### 🔴 en `/EauYpGQzAL/title` — OLD лучше (2:0)

- **RU**: Копинг-карточки
- **OLD**: Coping Cards
- **NEW**: Coping cards
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - The original text is a title/heading. According to the style guide, headings should follow sentence case or title case, but in the context of a section name or feature, 'Coping Cards' (Title Case) is more appropriate for a UI element than 'Coping cards'.
  - [new/style/minor] Lower case for the second word in a heading/title feels less like a formal section name in a mobile app context.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Since 'Coping Cards' is a section title/feature name, Title Case is more appropriate for a header, whereas sentence case is typically reserved for UI labels and buttons.
  - [new/style/minor] Uses sentence case for a heading, which is less standard for section titles in this context.

#### 🟡 en `/sdvdcarlwwQff/description`— вердикт неустойчив

- **RU**: ИИ будет задавать вопросы, чтобы помочь вам выявить скрытую автоматическую мысль.
- **OLD**: AI will ask questions to help you uncover a hidden automatic thought.
- **NEW**: The AI will ask questions to help you uncover hidden automatic thoughts.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - Translation A correctly uses the definite article 'The AI' and uses the plural 'automatic thoughts', which sounds more natural in English for this context. Translation B lacks the necessary article and uses a singular form that feels slightly clunky.
  - [old/style/minor] Missing the definite article 'The' before AI.
  - [old/style/minor] Singular 'a hidden automatic thought' sounds less natural than the plural in this instructional context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more precise because it maintains the singular form of 'automatic thought' used in the original. Translation B changes the number to plural, which is a slight deviation from the source.
  - [new/mistranslation/minor] Changed singular 'automatic thought' to plural 'automatic thoughts'

#### 🔴 en `/iFlct67Ldvkwq/title` — OLD лучше (2:0)

- **RU**: Дневник благодарности
- **OLD**: Gratitude Journal
- **NEW**: Gratitude journal
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 95)
  - In the context of a section title or a product feature, Title Case (A) is more appropriate for a header, whereas sentence case (B) is typically used for UI labels or list items. Since 'Дневник благодарности' functions as a standalone title, A is the standard choice.
  - [new/style/minor] Uses sentence case for what is clearly a title/header
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - The original text is a section title/product name. According to the guidelines, product names and specific sections should use Title Case (e.g., 'Smart Journal'), making B the correct choice for a header.
  - [new/style/minor] Uses sentence case for a title that functions as a section/product name, which should be Title Case per guidelines.

#### 🟢 en `/rwdHy8lyCk/description` — NEW лучше (2:0)

- **RU**: Добавить поддержку нейросетей, чтобы AI мог помогать анализировать мысли и давать персональные рекомендации.
- **OLD**: Add AI support so the assistant can help analyze thoughts and provide personalized recommendations.
- **NEW**: Add AI support to help analyze thoughts and provide personalized recommendations.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B is more concise and natural for a feature description or task. Translation A introduces 'the assistant' which is an addition not present in the original text (omission of the direct relationship between AI and the action).
  - [old/addition/minor] Added 'the assistant' which wasn't in the source; the original implies the AI itself performs the action.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A is more concise and follows the UX principle of avoiding unnecessary words. Translation B introduces 'the assistant', which is an addition not present in the original text.
  - [old/addition/minor] Added 'the assistant' to clarify 'AI', which makes the sentence wordier than the original.

