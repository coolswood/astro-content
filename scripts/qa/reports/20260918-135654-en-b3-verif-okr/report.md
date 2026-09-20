# QA: слепое парное сравнение переводов — en-b3-verif-okr

- **Дата**: 2026-09-18T10:56:54.744Z
- **Метка**: en-b3-verif-okr
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD~1
- **Файлы**: tests/okr.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 7
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: a4b1791ebbc7f608e45e9add25437bef463f001c

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/okr.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 7 | 🔴 2 | ⚪ 0 | 🟡 11 | 0 / 0 | 78% |
| **итого** | 20 | 🟢 7 | 🔴 2 | ⚪ 0 | 🟡 11 | 0 / 0 | 78% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×10, terminology/minor×1, omission/minor×1; OLD — style/minor×9, style/major×3, addition/minor×1, terminology/minor×1, mistranslation/minor×1

### Детали пар (для спот-чека)

#### 🔴 en `/result/extreme/title` — OLD лучше (2:0)

- **RU**: Выраженные признаки ОКР
- **OLD**: Pronounced OCD symptoms
- **NEW**: Significant OCD signs
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - In a clinical or psychological context, 'symptoms' is the standard term for manifestations of a disorder, whereas 'signs' is less idiomatic here. 'Pronounced' is also a more natural colocation for symptoms than 'significant' in this specific context.
  - [new/terminology/minor] Using 'signs' instead of 'symptoms' sounds slightly less professional in a mental health context.
  - [new/style/minor] While 'significant' is grammatically correct, 'pronounced' better captures the nuance of 'выраженные'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 82)
  - In a clinical or psychological context, 'symptoms' is the standard term for manifestations of a disorder, whereas 'signs' often refers to observable physical indicators. 'Pronounced' is a more natural and professional collocation for symptoms than 'significant' in this specific context.
  - [new/terminology/minor] Using 'signs' instead of 'symptoms' is less common in mental health descriptions; 'significant' is acceptable but 'pronounced' sounds more idiomatic for describing the intensity of symptoms.

#### 🟢 en `/variants/3` — NEW лучше (2:0)

- **RU**: Почти всегда удается Часто справляюсь Иногда получается Я редко могу от них отмахнуться Вообще не могу сопротивляться
- **OLD**: I can resist them almost all the time I manage to resist them quite often Sometimes I can I can rarely push them away I can’t resist them at all
- **NEW**: I almost always succeed I often manage I succeed sometimes I can rarely brush them off I can't resist them at all
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation B is much more natural and avoids the repetitive 'I can' structure used in A. B also uses more idiomatic expressions like 'brush them off' which fits the context of intrusive thoughts better than 'push them away'.
  - [old/style/major] Repetitive sentence structure ('I can...') makes it sound like a translation rather than natural English; 'push them away' is less idiomatic than 'brush them off' in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 88)
  - Translation A follows the structure and rhythm of the original much more closely, whereas Translation B introduces unnecessary repetition of the verb 'resist' and changes the meaning of the first line (making it about resistance rather than success).
  - [old/mistranslation/major] The first line 'I can resist them almost all the time' is the opposite of the original meaning 'Почти всегда удается' (which implies succeeding in managing/coping, not resisting).
  - [old/style/minor] Repetitive use of 'resist' makes the text feel heavy and unnatural compared to the concise Russian original.
  - [old/style/minor] The third line 'Sometimes I can' is too vague and loses the sense of 'it works out/I succeed' present in the original.

#### 🟢 en `/steps_description/1/text` — NEW лучше (2:0)

- **RU**: Около 50% людей с ОКР сообщают, что их навязчивые мысли и компульсии значительно мешают повседневной жизни, включая работу, учебу и социальные взаимодействия.
- **OLD**: Around 50% of people with OCD report that their intrusive thoughts and compulsions significantly interfere with everyday life, including work, study and social interactions.
- **NEW**: About 50% of people with OCD report that their intrusive thoughts and compulsions significantly interfere with daily life, including work, school, and social interactions.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Both translations are excellent and follow CBT terminology perfectly. Translation A is slightly better because 'daily life' is a more natural, idiomatic collocation in this context than 'everyday life', and 'school' is a more standard way to refer to educational settings in general US English compared to 'study'.
  - [old/style/minor] 'Everyday life' is acceptable but 'daily life' sounds more natural here; 'study' as a noun for the educational process is slightly less idiomatic than 'school' in this context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses more natural, idiomatic English for the context ('daily life' instead of 'everyday life' and 'school' instead of 'study').
  - [old/style/minor] 'everyday life' is acceptable but 'daily life' is more common in this context; 'study' as a noun for the activity of being a student is less natural than 'school' or 'studies'.

#### 🟢 en `/variants/0` — NEW лучше (2:0)

- **RU**: Их нет вообще Меньше часа От 1 до 3 часов От 3 до 8 часов Больше 8 часов
- **OLD**: They don’t occur at all Less than an hour 1–3 hours 3–8 hours More than 8 hours
- **NEW**: None Less than an hour 1 to 3 hours 3 to 8 hours More than 8 hours
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is concise and follows UX best practices for selection lists, whereas B is overly wordy and uses a heavy grammatical structure ('They don’t occur at all') that feels unnatural for a simple option.
  - [old/style/major] The first line is too long and conversational for a UI list; 'None' is the standard UX pattern.
  - [old/style/minor] Uses en dashes for ranges, which is fine, but the verbosity of the first line makes the whole set feel inconsistent.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation B is concise and follows UX best practices for selection options. Translation A is overly wordy and sounds like a full sentence, which is unnatural for a list of options.
  - [old/style/major] The phrase 'They don’t occur at all' is too heavy and formal for a UI selection; 'None' is the standard way to express this in English UX.

#### 🟢 en `/steps_description/5/fact` — NEW лучше (2:0)

- **RU**: Менее 5% людей с ОКР совершают навязчивые действия более 8 часов в день, что серьезно мешает их повседневной жизни.
- **OLD**: Fewer than 5% of people with OCD perform compulsive actions for more than 8 hours a day, but when this happens it severely disrupts daily life.
- **NEW**: Fewer than 5% of people with OCD perform compulsive actions for more than 8 hours a day, which seriously interferes with their daily life.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is a direct and accurate reflection of the original sentence structure and meaning. Translation A introduces an unnecessary conditional clause ('but when this happens') that changes the logic of the statement.
  - [old/addition/minor] Added 'but when this happens', which makes the sentence more wordy and slightly alters the causal flow of the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is a precise, faithful, and natural rendering of the original sentence. Translation B introduces an unnecessary conditional structure ('but when this happens') that changes the meaning from a factual statement about a specific group to a general observation about a condition.
  - [old/mistranslation/major] The phrase 'but when this happens' implies that the 8-hour threshold is an occasional event, whereas the original describes a persistent state for that 5% of people.
  - [old/style/minor] The addition of 'it' makes the sentence wordier and less direct than the original.

#### 🟡 en `/steps_description/4/fact`— вердикт неустойчив

- **RU**: Антидепрессанты, такие как СИОЗС, часто помогают людям с ОКР уменьшить интенсивность навязчивых мыслей и улучшить контроль над ними.
- **OLD**: Antidepressants such as SSRIs often help people with OCD reduce the intensity of intrusive thoughts and improve their ability to manage them.
- **NEW**: Antidepressants, such as SSRIs, often help people with OCD reduce the intensity of intrusive thoughts and improve their ability to manage them.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 95)
  - Both translations are excellent and accurate, but Translation A is slightly better for a digital interface/article as it avoids unnecessary commas around 'such as', which improves reading flow.
  - [new/style/minor] The commas around 'such as SSRIs' create a parenthetical interruption that is grammatically correct but slightly slows down the rhythm compared to the smoother version A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 98)
  - Both translations are excellent and follow all CBT terminology guidelines. Translation A is slightly better due to the use of commas to set off the non-restrictive appositive 'such as SSRIs', which is more grammatically standard in formal/educational English.

#### 🟡 en `/steps_description/5/text`— вердикт неустойчив

- **RU**: Наиболее распространенные навязчивые действия включают частое мытье рук, многократную проверку замков и бытовых приборов, а также повторяющиеся действия, такие как касание определенных объектов или повторение определенных слов и фраз.
- **OLD**: The most common compulsive actions include frequent handwashing, repeatedly checking locks and household appliances, and repeated behaviours such as touching certain objects or repeating specific words or phrases.
- **NEW**: Common compulsive actions include frequent hand washing, repeatedly checking locks and appliances, and repetitive behaviors like touching certain objects or repeating specific words and phrases.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 86)
  - Translation A is more precise and maintains the formal yet accessible tone of the original. Translation B omits 'The most' (the superlative), which changes the nuance of the statement.
  - [new/omission/minor] Omitted 'The most' (Наиболее распространенные), which weakens the definitive nature of the original sentence.
  - [new/style/minor] Hand washing is typically written as one word (handwashing) in modern English UX/medical contexts.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and natural for a mental health context. Translation B is slightly wordy ('household appliances', 'repeated behaviours') and uses British spelling ('behaviours'), whereas the target market is US English.
  - [old/style/minor] Uses British spelling 'behaviours' instead of US 'behaviors'; 'household appliances' is slightly more redundant than 'appliances' in this context.

#### 🟡 en `/steps_description/4/text`— вердикт неустойчив

- **RU**: Только около 10-20% людей с ОКР сообщают, что могут в основном контролировать свои навязчивые мысли.
- **OLD**: Only about 10–20% of people with OCD report that they are mostly able to control their intrusive thoughts.
- **NEW**: Only about 10–20% of people with OCD report that they can mostly control their intrusive thoughts.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A uses 'are mostly able to control', which sounds more natural and professional in a clinical/educational context than the slightly clunky 'can mostly control' in Translation B.
  - [new/style/minor] The placement of 'mostly' between 'can' and 'control' is grammatically acceptable but feels less idiomatic for a formal psychological statement than the construction in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A is more concise and natural for a professional psychological context. Translation B is grammatically correct but slightly wordier due to the 'are able to' construction, which is less direct than the simple modal 'can'.
  - [old/style/minor] slightly wordy construction 'are mostly able to' instead of the more direct 'can mostly'

#### 🟢 en `/variants/1` — NEW лучше (2:0)

- **RU**: Никак, живу как обычно Едва заметно Немного усложняют жизнь, но я справляюсь Значительно мешают, приходится менять привычки Полностью перевернули мою жизнь
- **OLD**: Not at all, I live as usual Barely noticeable They make life a bit harder, but I manage They interfere a lot, I have to change my habits They have completely turned my life upside down
- **NEW**: Not at all, I live as usual Hardly noticeable They make life a bit harder, but I'm managing They interfere significantly, forcing me to change my habits They've completely turned my life upside down
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more idiomatic and flows better, especially with the use of the present continuous 'I'm managing' to reflect the ongoing process of coping. Translation B feels slightly more fragmented and uses 'interfere a lot', which is less sophisticated than 'interfere significantly'.
  - [old/style/minor] The phrasing 'interfere a lot, I have to change my habits' is a bit clunky compared to the more cohesive structure in A.
  - [old/style/minor] 'I manage' sounds a bit more static and less natural in this context than 'I'm managing'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B sounds more natural and idiomatic for a mental health app. The use of 'Hardly noticeable' is more common than 'Barely noticeable' in this context, and 'I'm managing' conveys the ongoing process of coping better than the static 'I manage'.
  - [old/style/minor] 'Barely noticeable' is grammatically fine but slightly less idiomatic here than 'Hardly noticeable'; 'I manage' sounds a bit stiff compared to the continuous 'I'm managing'.
  - [old/style/minor] The phrasing 'They interfere a lot, I have to...' is a bit clunky (comma splice) compared to the more sophisticated 'forcing me to...' in B.

#### 🟡 en `/steps_description/1/fact`— вердикт неустойчив

- **RU**: Частые и продолжительные навязчивые мысли могут вызывать физическое истощение и проблемы со здоровьем, такие как головные боли, проблемы с пищеварением и хроническую усталость.
- **OLD**: Frequent and prolonged intrusive thoughts can lead to physical exhaustion and health problems such as headaches, digestive issues and chronic fatigue.
- **NEW**: Frequent and prolonged intrusive thoughts can lead to exhaustion and health issues, such as headaches, digestive problems, and chronic fatigue.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more polished and follows standard English punctuation rules (using the Oxford comma for clarity in a list). Translation B lacks a necessary comma before 'such as' and omits the Oxford comma, making the list feel slightly less professional.
  - [old/style/minor] Missing comma before 'such as' and missing Oxford comma in the list.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Translation A is more precise and follows the original structure perfectly. Translation B omits the adjective 'physical' before 'exhaustion', which changes the nuance of the original text.
  - [new/omission/minor] omitted 'physical' (физическое) before exhaustion

#### 🟡 en `/result/extreme/text`— вердикт неустойчив

- **RU**: Ваши ответы могут говорить о том, что навязчивые мысли и ритуалы заметно влияют на повседневную жизнь и эмоциональное состояние. Вы можете чувствовать сильную тревогу, если не удаётся выполнить привычные действия, и это может вызывать значительный стресс. В та…
- **OLD**: Your answers suggest that intrusive thoughts and rituals may significantly affect your daily life and emotional state. You might feel strong anxiety if you cannot carry out familiar actions, and this can be a major source of stress. In such cases, reaching out…
- **NEW**: Your answers may suggest that intrusive thoughts and rituals significantly affect your daily life and emotional state. You may feel intense anxiety if you're unable to perform certain actions, which can cause significant stress. In such cases, seeking professi…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and emotionally resonant, especially in the final sentence where it uses a natural English expression ('you do not have to go through this alone') instead of a literal translation. Translation B is grammatically correct but feels slightly more clinical and repetitive.
  - [new/style/minor] The final sentence 'you can reach out for it' is a bit clunky and literal compared to the more supportive tone of A.
  - [new/style/minor] The use of 'certain actions' is a slight deviation from 'привычные действия' (familiar actions).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and maintains the cautious, professional tone of the original ('may suggest' vs 'suggest'). Translation B adds a phrase ('you do not have to go through this alone') that is not in the source text.
  - [old/addition/minor] The phrase 'you do not have to go through this alone' is a creative addition not present in the original text.
  - [old/style/minor] The placement of 'may' in the first sentence is slightly less natural than in A; 'suggest that... may' is a better way to express possibility in English.

#### 🟡 en `/steps_description/7/text`— вердикт неустойчив

- **RU**: Навязчивые действия часто сопровождаются сильными негативными эмоциями, такими как тревога, вина, стыд и разочарование. Эти эмоции могут значительно усиливать общий дискомфорт и чувство подавленности.
- **OLD**: Compulsive actions are often accompanied by strong negative emotions such as anxiety, guilt, shame and frustration. These feelings can significantly increase overall distress and a sense of being overwhelmed.
- **NEW**: Compulsive actions are often accompanied by strong negative emotions, such as anxiety, guilt, shame, and frustration. These emotions can significantly increase overall discomfort and feelings of being overwhelmed.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'distress', which is much more idiomatic and natural in a mental health context than 'discomfort'. It also avoids the repetitive use of 'emotions' by using 'feelings' in the second sentence, creating a better flow.
  - [new/style/minor] The use of 'discomfort' sounds slightly clinical or physical rather than psychological, and the repetition of 'emotions' makes the text feel less polished.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more polished and follows standard English punctuation rules (Oxford comma), whereas B feels slightly less natural due to the word choice 'distress' in this specific context and the lack of a comma before 'such as'.
  - [old/style/minor] Missing comma before 'such as' makes the sentence slightly harder to read; 'distress' is acceptable but 'discomfort' is a more direct and natural fit for the original 'дискомфорт'.

#### 🟢 en `/steps_description/9/fact` — NEW лучше (2:0)

- **RU**: Практики осознанности и медитации могут помочь улучшить контроль над ритуалами, способствуя снижению тревожности и улучшению общего психического состояния.
- **OLD**: Mindfulness and meditation practices can help improve control over rituals by reducing anxiety and supporting overall mental health.
- **NEW**: Mindfulness and meditation practices can help improve control over rituals by reducing anxiety and supporting overall mental well-being.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation B uses the project-mandated term 'mental well-being' instead of the more generic 'mental health', which aligns perfectly with the provided glossary and tone.
  - [old/terminology/minor] Used 'mental health' instead of the preferred 'mental well-being'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Both translations are excellent and follow the guidelines, but 'mental well-being' is the preferred term in the project glossary for 'психическое состояние' to avoid the more clinical/medical tone of 'mental health'.
  - [old/terminology/minor] Uses 'mental health' instead of the preferred 'mental well-being' for describing a state of being.

#### 🟡 en `/variants/9`— вердикт неустойчив

- **RU**: Полностью под моим контролем Большей частью контролирую Иногда могу управлять ими Почти не контролирую Совсем не могу контролировать
- **OLD**: Completely under my control Mostly under my control Sometimes I can manage them I barely control them I can’t control them at all
- **NEW**: Under my full control Mostly under control I can manage them sometimes I have almost no control I have no control at all
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and follows the natural rhythm of a Likert scale used in psychological assessments. Translation B feels slightly more wordy and repetitive due to the frequent use of 'I'.
  - [old/style/minor] The repetition of 'under my control' and 'I' makes the scale feel less like a professional assessment and more like a list of sentences.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more natural and consistent for a scale of control. Translation B suffers from awkward phrasing ('Under my full control') and inconsistent grammatical structures.
  - [new/style/minor] The first line 'Under my full control' sounds slightly unnatural compared to the standard 'Completely under my control'.
  - [new/style/minor] The second line 'Mostly under control' lacks the possessive 'my', creating an inconsistency with the rest of the scale.

#### 🟡 en `/variants/8`— вердикт неустойчив

- **RU**: Почти всегда могу удержаться Довольно часто справляюсь Иногда могу отказаться от них Редко удается избежать Вообще не могу сопротивляться
- **OLD**: I can almost always hold back I manage to resist quite often Sometimes I can choose not to do them I rarely manage to avoid them I can’t resist them at all
- **NEW**: I can almost always resist I can manage quite often I can sometimes resist them I rarely manage to avoid them I can't resist them at all
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more consistent and uses more natural, concise phrasing for a scale of frequency. Translation B introduces 'choose not to do them', which is a clunky and unnecessary addition that deviates from the original's concise structure.
  - [old/style/minor] The third line 'Sometimes I can choose not to do them' is wordy and less natural than a direct translation of 'отказаться от них'.
  - [old/style/minor] 'Hold back' in the first line is slightly less precise than 'resist' in this context of resisting urges/behaviors.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A is much more natural and idiomatic; Translation B contains a major grammatical error ('I can manage quite often') and lacks necessary objects for the verbs.
  - [new/style/major] 'I can manage quite often' is an incomplete thought in English; 'manage' requires an object or a following infinitive.
  - [new/omission/major] In the third line, 'resist them' is needed to maintain clarity, whereas B just says 'resist' without an object.

#### 🟡 en `/variants/6`— вердикт неустойчив

- **RU**: Никак, все как обычно Еле заметно Немного усложняют, но не критично Сильно мешают, меняю из-за них свои планы Жизнь изменилась до неузнаваемости
- **OLD**: Not at all, everything is as usual Barely noticeable They make things a bit harder, but not too much They interfere a lot, I change my plans because of them My life has changed beyond recognition
- **NEW**: Not at all, everything is as usual Barely noticeable They make things a bit harder, but it's not critical They interfere a lot, I change my plans because of them My life has changed beyond recognition
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more accurate to the original text. Translation B introduces an addition/slight mistranslation in the third line by replacing 'not critical' with 'not too much', which changes the nuance of the scale.
  - [old/mistranslation/minor] The phrase 'not too much' is a deviation from the original 'не критично' (not critical/not a critical issue).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 85)
  - Translation A sounds more natural and idiomatic for a user interface. Translation B uses 'not critical', which is a direct calque from the Russian 'не критично' and sounds slightly too formal/clinical for this context.
  - [new/style/minor] 'it's not critical' is a bit heavy/formal compared to the more natural 'not too much' or 'not a big deal' in English UX.

#### 🔴 en `/variants/7` — OLD лучше (2:0)

- **RU**: Вообще не беспокоюсь Чуть-чуть некомфортно Заметно неприятно, но жить можно Сильный дискомфорт, это меня подавляет Постоянное ощущение сильного дискомфорта
- **OLD**: I’m not bothered at all A little uncomfortable Clearly unpleasant, but still manageable Strong discomfort, it feels overwhelming A constant feeling of intense discomfort
- **NEW**: Not worried at all A little uncomfortable Noticeably unpleasant, but manageable Strong discomfort, it's overwhelming A constant feeling of intense discomfort
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds more natural and idiomatic for a mental health app. The use of 'I’m not bothered' and 'it feels overwhelming' provides a more human, supportive tone compared to the slightly more clinical or abrupt phrasing in A.
  - [new/style/minor] The first line 'Not worried at all' is a bit abrupt; 'I'm not bothered at all' or 'I don't feel worried at all' flows better in a self-report context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A captures the nuance of emotional state ('bothered') much better than B, which uses 'worried' (anxiety-specific). A also maintains a more natural flow for a mood-tracking interface.
  - [new/mistranslation/major] Using 'Not worried' for 'Вообще не беспокоюсь' is too narrow; 'bothered' or 'unsettled' is better for general discomfort/annoyance levels.
  - [new/style/minor] The omission of 'it's' in 'it's overwhelming' makes it slightly more clipped/staccato than the more natural A.

#### 🟢 en `/range/normal` — NEW лучше (2:0)

- **RU**: Нормальное состояние
- **OLD**: Normal state
- **NEW**: Normal
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 95)
  - In a UX/UI context, 'Normal state' sounds like a technical or medical status report (e.g., a system state or a physiological state), whereas 'Normal' is the natural, concise way to describe a baseline mood or condition.
  - [old/style/major] Sounds like a technical/system status rather than a natural description of a person's state.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - In a mental health app context, 'Normal' is the standard, concise way to describe a state or mood. 'Normal state' sounds overly clinical and redundant in English UX.
  - [old/style/minor] Unnecessarily wordy and sounds like a literal translation of 'состояние' (state).

#### 🟡 en `/result/light/text`— вердикт неустойчив

- **RU**: Иногда у вас могут появляться повторяющиеся мысли или желание перепроверить что-то, особенно в стрессовых ситуациях. Такие проявления не являются постоянными и обычно не нарушают привычный ритм жизни. Вам удаётся сохранять контроль над этими импульсами и адапт…
- **OLD**: From time to time you may notice recurring thoughts or an urge to double-check something, especially in stressful situations. These experiences are not constant and usually do not disrupt your usual rhythm of life. You are generally able to keep these impulses…
- **NEW**: You may occasionally experience repetitive thoughts or the urge to recheck something, especially in stressful situations. These occurrences aren't constant and usually don't disrupt your daily rhythm. You manage to maintain control over these impulses and adap…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise, uses natural contractions (aren't, don't), and flows better as a supportive expert text. Translation B feels slightly more wordy and formal ('rhythm of life', 'make you feel more anxious').
  - [old/style/minor] The phrasing 'rhythm of life' is a bit cliché/heavy compared to 'daily rhythm', and 'make you feel more anxious' is less elegant than 'cause anxiety'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A sounds more natural and empathetic, using 'notice' and 'manage' in a way that fits the 'understanding expert' tone. Translation B feels slightly more clinical and repetitive (e.g., 'daily rhythm' vs 'daily tasks').
  - [new/style/minor] The phrasing 'You manage to maintain control' is a bit heavy/clunky compared to the smoother 'You are generally able to keep... control' in A.
  - [new/style/minor] The transition between 'daily rhythm' and 'daily tasks' is slightly less fluid than in A.

#### 🟡 en `/steps`— вердикт неустойчив

- **RU**: Как долго в течение дня продолжаются навязчивые мысли? Как навязчивые мысли влияют на ваш повседневный ритм? Насколько сильно вас беспокоят эти мысли? Легко ли вам противостоять навязчивым мыслям? Можете ли вы контролировать свои навязчивые мысли? Как часто вы…
- **OLD**: How long do your intrusive thoughts last during the day? How do intrusive thoughts affect your daily routine? How much do these thoughts bother you? How easy is it for you to resist intrusive thoughts? How well can you control your intrusive thoughts? How ofte…
- **NEW**: How long do your intrusive thoughts last during the day? How do these intrusive thoughts affect your daily routine? How much distress do these thoughts cause you? How easy is it for you to resist intrusive thoughts? Are you able to control your intrusive thoug…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more consistent and follows the original structure more closely. Translation B introduces unnecessary word changes (e.g., 'distress' instead of 'bother') and slightly alters the nuance of the questions.
  - [new/style/minor] The use of 'distress' is a bit more clinical/heavy than the original 'беспокоят' (bother).
  - [new/style/minor] Changing 'Can you...' to 'Are you able to...' in several places makes the tone slightly more formal/stiff than the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more precise and follows the original structure more closely. Translation B introduces unnecessary additions (like 'repeatedly') and slightly alters the nuance of the questions.
  - [old/addition/minor] Added 'repeatedly' to hand washing, which wasn't in the original.
  - [old/style/minor] The phrasing 'How well can you control...' in the 5th question is a slight shift from the original 'Can you control...' (Можете ли вы...).

