# QA: слепое парное сравнение переводов — en-b3-okr

- **Дата**: 2026-09-18T10:42:57.453Z
- **Метка**: en-b3-okr
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: tests/okr.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 8b5b94950329db2cb35cf00c251ee0fc00dc888f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/okr.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 10 | 🔴 3 | ⚪ 0 | 🟡 7 | 0 / 0 | 77% |
| **итого** | 20 | 🟢 10 | 🔴 3 | ⚪ 0 | 🟡 7 | 0 / 0 | 77% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×7, style/major×2, omission/major×1; OLD — style/minor×11, terminology/minor×4, addition/major×2, style/major×1, mistranslation/major×1, addition/minor×1, mistranslation/minor×1

### Детали пар (для спот-чека)

#### 🔴 en `/variants/2` — OLD лучше (2:0)

- **RU**: Совсем не беспокоят Немного неприятно Достаточно сильно, но терпимо Очень сильно, это влияет на мое настроение Постоянно чувствую сильный дискомфорт
- **OLD**: They don’t bother me at all Slightly uncomfortable Quite a lot, but still bearable Very much, it affects my mood I constantly feel strong discomfort
- **NEW**: Not bothersome at all A little unpleasant Quite strong, but tolerable They are very strong, and they affect my mood I constantly feel intense discomfort
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A is much more natural and follows the UX pattern of using personal pronouns or direct adjectives. Translation B suffers from awkward phrasing ('Not bothersome at all') and inconsistent subject usage.
  - [new/style/major] 'Not bothersome at all' is unnatural; 'Not bothersome' is rarely used in this context. A native speaker would say 'Not at all' or 'Doesn't bother me'.
  - [new/style/minor] The shift from adjectives to 'They are very strong' is clunky and lacks the flow of a scale.
  - [new/style/minor] 'Quite strong' is a bit vague for a scale of intensity compared to 'Quite a lot' or 'Quite intense'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Translation B is much more natural and idiomatic for a mood/symptom scale. Translation A suffers from awkward phrasing ('Not bothersome at all') and a sudden, grammatically clunky shift to 'They are very strong' in the fourth line.
  - [new/style/major] The phrase 'Not bothersome at all' is unnatural for a scale; 'They are very strong' is a clunky way to describe intensity in this context.
  - [new/style/minor] Inconsistent tone between the short phrases and the longer sentence.

#### 🟡 en `/variants/4`— вердикт неустойчив

- **RU**: Да, полностью контролирую В основном да Иногда удается Едва могу Совсем не могу контролировать
- **OLD**: Yes, I can fully control them Mostly yes Sometimes I can Barely I can’t control them at all
- **NEW**: Yes, I have full control Mostly, yes I manage sometimes I can barely do it I can't control them at all
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A is more consistent and natural for a scale of control. Translation B suffers from inconsistent object usage (switching between implied control and 'them') and a fragment ('Barely') that feels too abrupt for this context.
  - [old/style/major] The transition from 'I can fully control them' to 'Barely' is grammatically inconsistent; 'Barely' lacks a verb/subject to match the previous lines.
  - [old/style/minor] Missing comma in 'Mostly yes' (though minor in UX, A is more polished).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is more concise and natural for a scale of intensity, whereas B feels slightly wordy and inconsistent in its phrasing.
  - [new/style/minor] The phrase 'I manage sometimes' is a bit clunky compared to the more natural 'Sometimes I can' or 'I manage to'
  - [new/style/minor] 'I can barely do it' is unnecessarily wordy for a quick rating scale; 'Barely' is more idiomatic for this context

#### 🟢 en `/steps_description/1/text` — NEW лучше (2:0)

- **RU**: Около 50% людей с ОКР сообщают, что их навязчивые мысли и компульсии значительно мешают повседневной жизни, включая работу, учебу и социальные взаимодействия.
- **OLD**: Around 50% of people with OCD report that their intrusive thoughts and compulsions significantly interfere with everyday life, including work, study and social interactions.
- **NEW**: About 50% of people with OCD report that their intrusive thoughts and compulsions significantly interfere with daily life, including work, school, and social interactions.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses more natural, idiomatic English for the context ('daily life' instead of 'everyday life' and 'school' instead of 'study'). It also correctly applies the Oxford comma, which is standard for professional US English.
  - [old/style/minor] 'study' sounds slightly unnatural as a noun in this list; 'school' or 'education' is more common. 'Everyday life' is acceptable but 'daily life' is more idiomatic here.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Translation A uses 'daily life' and 'school', which are more natural and idiomatic in US English for this context. Translation B's use of 'study' as a noun for the activity of being a student sounds slightly more formal/academic and less like a natural part of a daily routine.
  - [old/style/minor] 'everyday life' is acceptable but 'daily life' is more common in clinical/statistical contexts; 'study' is less idiomatic than 'school' when listing life domains like work and social interactions.

#### 🟢 en `/variants/6` — NEW лучше (2:0)

- **RU**: Никак, все как обычно Еле заметно Немного усложняют, но не критично Сильно мешают, меняю из-за них свои планы Жизнь изменилась до неузнаваемости
- **OLD**: Not at all, everything is as usual Barely noticeable They make things a bit harder, but not too much They interfere a lot, I change my plans because of them My life has changed beyond recognition
- **NEW**: Not at all, everything is as usual Barely noticeable They make things a bit harder, but it's not critical They interfere a lot, I change my plans because of them My life has changed beyond recognition
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more accurate to the original text. Translation A uses 'not too much' which is a stylistic softening that deviates from the original 'не критично' (not critical).
  - [old/style/minor] The phrase 'but not too much' is a bit too colloquial and loses the specific nuance of 'not critical' present in the source.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 92)
  - Translation A is more faithful to the original text. Translation B introduces an unnecessary addition ('too much') in the third line that changes the nuance of the original 'не критично'.
  - [old/addition/minor] Added 'too much' to the third line, which deviates from the original 'not critical'.

#### 🟢 en `/steps_description/3/fact` — NEW лучше (2:0)

- **RU**: КПТ, особенно метод экспозиции и предотвращения ритуалов (ERP), является наиболее эффективным методом лечения ОКР, помогая людям научиться сопротивляться навязчивым мыслям.
- **OLD**: CBT, especially exposure and response prevention (ERP), is one of the most effective treatments for OCD and helps people learn to resist intrusive thoughts.
- **NEW**: CBT, especially Exposure and Response Prevention (ERP), is the most effective treatment for OCD, helping people learn to resist intrusive thoughts.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is more accurate to the original meaning and follows professional CBT terminology standards. Translation B introduces an inaccuracy by changing 'the most effective' to 'one of the most effective' and slightly alters the sentence structure.
  - [old/mistranslation/major] The original states it is 'the most effective' (наиболее эффективным), but B changes it to 'one of the most effective', which is a significant semantic shift in a clinical context.
  - [old/style/minor] In English clinical writing, the specific technique 'Exposure and Response Prevention' is typically capitalized as a proper noun/formal name of a protocol.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more accurate to the original's superlative 'наиболее эффективным' (the most effective) and uses a more natural participial construction ('helping...') instead of the clunky 'and helps'.
  - [old/mistranslation/minor] Changed 'the most effective' to 'one of the most effective', which weakens the original claim.
  - [old/style/minor] The 'and helps' construction is slightly less fluid than the participial phrase in B.

#### 🟢 en `/steps_description/8/fact` — NEW лучше (2:0)

- **RU**: Футболист Дэвид Бекхэм признавался, что ему иногда удается сопротивляться выполнению ритуалов, особенно с поддержкой семьи и терапевтов.
- **OLD**: Footballer David Beckham has spoken about his OCD and says that sometimes he manages to resist performing rituals, especially with support from his family and therapists.
- **NEW**: Footballer David Beckham has admitted that he sometimes manages to resist performing rituals, especially with the support of his family and therapists.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is a faithful and natural translation of the original. Translation A introduces an addition (OCD) that is not present in the source text, which violates the rule against adding information.
  - [old/addition/major] Added 'his OCD', which is not in the original text
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is a faithful and accurate rendering of the original text. Translation B introduces an addition (mentioning 'OCD') that is not present in the source text, which violates the rule against adding information.
  - [old/addition/major] The phrase 'his OCD' is not in the original Russian text; the translator inferred it, which is an error in translation accuracy.

#### 🟡 en `/variants/8`— вердикт неустойчив

- **RU**: Почти всегда могу удержаться Довольно часто справляюсь Иногда могу отказаться от них Редко удается избежать Вообще не могу сопротивляться
- **OLD**: I can almost always hold back I manage to resist quite often Sometimes I can choose not to do them I rarely manage to avoid them I can’t resist them at all
- **NEW**: I can almost always resist I can manage quite often I can sometimes resist them I rarely manage to avoid them I can't resist them at all
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A is much more natural and avoids the grammatical ambiguity found in B. In B, 'I can manage quite often' is an incomplete thought in English (manage what?), whereas A provides a clear, idiomatic flow.
  - [new/style/major] The second line 'I can manage quite often' is unidiomatic and lacks an object, making it sound like a broken translation.
  - [new/style/minor] The third line 'I can sometimes resist them' is grammatically fine but feels slightly repetitive compared to the more natural 'choose not to do them' in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more consistent and uses more natural verb-object pairings for this context. Translation B introduces an awkward and wordy phrase in the third line ('choose not to do them') which breaks the rhythm and feels like a clunky translation of 'отказаться'.
  - [old/style/major] The phrase 'choose not to do them' is unnatural and wordy compared to the concise Russian original; 'resist them' or 'refuse them' would be better.
  - [old/style/minor] 'Hold back' in the first line is slightly less precise than 'resist' when referring to urges or impulses.

#### 🟡 en `/steps_description/4/fact`— вердикт неустойчив

- **RU**: Антидепрессанты, такие как СИОЗС, часто помогают людям с ОКР уменьшить интенсивность навязчивых мыслей и улучшить контроль над ними.
- **OLD**: Antidepressants such as SSRIs often help people with OCD reduce the intensity of intrusive thoughts and improve their ability to manage them.
- **NEW**: Antidepressants, such as SSRIs, often help people with OCD reduce the intensity of intrusive thoughts and improve their ability to manage them.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 95)
  - Both translations are excellent and accurate. Translation A is slightly better for a modern digital interface as it avoids unnecessary commas, creating a smoother reading flow for a scientific/educational statement.
  - [new/style/minor] The commas around 'such as SSRIs' are grammatically correct but create a slightly more formal, interrupted rhythm that is less common in modern UX/educational microcopy.
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Both translations are excellent, idiomatic, and use the correct CBT terminology ('intrusive thoughts'). The only difference is a stylistic choice regarding the comma before 'such as', which is a matter of preference in English punctuation and does not affect the quality or meaning.

#### 🟡 en `/steps_description/1/fact`— вердикт неустойчив

- **RU**: Частые и продолжительные навязчивые мысли могут вызывать физическое истощение и проблемы со здоровьем, такие как головные боли, проблемы с пищеварением и хроническую усталость.
- **OLD**: Frequent and prolonged intrusive thoughts can lead to physical exhaustion and health problems such as headaches, digestive issues and chronic fatigue.
- **NEW**: Frequent and prolonged intrusive thoughts can lead to exhaustion and health issues, such as headaches, digestive problems, and chronic fatigue.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more precise and follows the original structure perfectly. Translation B omits the adjective 'physical' before exhaustion, which is a significant loss of meaning in a medical/CBT context.
  - [new/omission/major] Missing 'physical' (физическое) before exhaustion, which changes the nuance of the sentence.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 95)
  - Translation A is more concise and natural for a mental health context. Translation B is slightly repetitive ('physical exhaustion' vs 'health problems') and lacks the Oxford comma used in A, which improves readability in a list.
  - [old/style/minor] The phrasing 'physical exhaustion and health problems' is slightly clunky compared to the more streamlined 'exhaustion and health issues' in A.

#### 🟡 en `/result/extreme/text`— вердикт неустойчив

- **RU**: Ваши ответы могут говорить о том, что навязчивые мысли и ритуалы заметно влияют на повседневную жизнь и эмоциональное состояние. Вы можете чувствовать сильную тревогу, если не удаётся выполнить привычные действия, и это может вызывать значительный стресс. В та…
- **OLD**: Your answers suggest that intrusive thoughts and rituals may significantly affect your daily life and emotional state. You might feel strong anxiety if you cannot carry out familiar actions, and this can be a major source of stress. In such cases, reaching out…
- **NEW**: Your answers may suggest that intrusive thoughts and rituals significantly affect your daily life and emotional state. You may feel intense anxiety if you're unable to perform certain actions, which can cause significant stress. In such cases, seeking professi…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more accurate to the original text's nuance and structure. Translation B introduces an addition ('you do not have to go through this alone') that, while supportive, is not in the source, and slightly shifts the modality of the first sentence.
  - [old/addition/minor] The phrase 'you do not have to go through this alone' is a creative addition not present in the original.
  - [old/style/minor] The placement of 'may' in the first sentence is slightly less natural than in A; 'may suggest' is a standard collocation.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and empathetic, especially in the final sentence where it uses a natural English expression ('you do not have to go through this alone') instead of a literal translation. Translation B is grammatically correct but feels slightly more clinical and repetitive.
  - [new/style/minor] The final sentence 'you can reach out for it' is a bit clunky and literal compared to the more supportive tone of A.
  - [new/style/minor] The use of 'may suggest' and 'may feel' in close proximity feels slightly repetitive compared to the smoother flow of A.

#### 🟡 en `/steps_description/8/text`— вердикт неустойчив

- **RU**: Уровень стресса и тревожности играет значительную роль в способности сопротивляться ритуалам. В периоды повышенного стресса сопротивление ритуалам становится более трудным.
- **OLD**: Levels of stress and anxiety play a major role in the ability to resist rituals. In periods of heightened stress it becomes much harder to resist compulsive behaviours.
- **NEW**: Stress and anxiety levels play a significant role in the ability to resist rituals. During periods of increased stress, resisting rituals can become more difficult.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A is a precise, natural, and faithful rendering of the original. Translation B introduces an addition ('compulsive behaviours') that is not in the source text and uses a slightly more clunky structure.
  - [old/addition/major] Added 'compulsive behaviours' which is not present in the original text; while contextually related, it changes the scope of the sentence.
  - [old/style/minor] Missing a comma after the introductory phrase 'In periods of heightened stress'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A is more idiomatic and uses 'compulsive behaviours' to provide necessary context for 'rituals' in a CBT setting, making it sound like natural English. Translation B is a bit more literal and repetitive.
  - [new/style/minor] The phrasing 'resisting rituals can become more difficult' is slightly clunky and repetitive compared to the more fluid 'it becomes much harder' in A.

#### 🟢 en `/steps_description/9/fact` — NEW лучше (2:0)

- **RU**: Практики осознанности и медитации могут помочь улучшить контроль над ритуалами, способствуя снижению тревожности и улучшению общего психического состояния.
- **OLD**: Mindfulness and meditation practices can help improve control over rituals by reducing anxiety and supporting overall mental health.
- **NEW**: Mindfulness and meditation practices can help improve control over rituals by reducing anxiety and supporting overall mental well-being.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Translation B uses the project-specific term 'mental well-being' as required by the glossary, whereas Translation A uses 'mental health', which is less aligned with the preferred tone.
  - [old/terminology/minor] Used 'mental health' instead of the prescribed 'mental well-being'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Both translations are excellent, but 'mental well-being' is a more precise and idiomatic match for 'психическое состояние' in a supportive, wellness-oriented context than the slightly more clinical 'mental health'.
  - [old/style/minor] Using 'mental health' is grammatically correct but sounds slightly more medical/clinical compared to the warmer 'mental well-being' preferred for this tone.

#### 🟡 en `/steps_description/4/text`— вердикт неустойчив

- **RU**: Только около 10-20% людей с ОКР сообщают, что могут в основном контролировать свои навязчивые мысли.
- **OLD**: Only about 10–20% of people with OCD report that they are mostly able to control their intrusive thoughts.
- **NEW**: Only about 10–20% of people with OCD report that they can mostly control their intrusive thoughts.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A is more idiomatic and flows better for a native speaker. The construction 'are mostly able to' is more natural in a clinical/educational context than the slightly clunky 'can mostly'.
  - [new/style/minor] The placement of 'mostly' between 'can' and 'control' feels slightly less smooth than the phrasing in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Both translations are grammatically correct and accurate, but Translation A is more concise and natural for a professional English text. Translation B uses 'are mostly able to', which is slightly wordier and less direct than 'can mostly'.
  - [old/style/minor] slightly wordy construction 'are mostly able to' instead of the more direct 'can mostly'

#### 🟢 en `/steps_description/2/fact` — NEW лучше (2:0)

- **RU**: Хотя у Фредерика Делано Рузвельта не было официального диагноза ОКР, историки отмечают, что его навязчивые мысли вызывали у него значительное беспокойство, что влияло на его настроение и повседневную жизнь.
- **OLD**: Although Franklin Delano Roosevelt never received an official OCD diagnosis, historians note that his obsessive thoughts caused him considerable distress and influenced his mood and daily life.
- **NEW**: Although Franklin D. Roosevelt was not officially diagnosed with OCD, historians note that his intrusive thoughts caused him significant anxiety, which affected his mood and daily life.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation B uses the project-standard term 'intrusive thoughts' instead of 'obsessive thoughts' and correctly uses 'anxiety' for 'беспокойство' in a clinical context. It also follows the standard US abbreviation for the name.
  - [old/terminology/minor] used 'obsessive thoughts' instead of the preferred 'intrusive thoughts'
  - [old/style/minor] used 'considerable distress' which is acceptable but 'significant anxiety' is more precise for the context
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A uses the correct project terminology ('intrusive thoughts' and 'anxiety') and flows more naturally for a modern English reader. Translation B uses 'obsessive thoughts', which is less precise in a clinical context, and 'distress', which is slightly more dramatic than the original 'беспокойство'.
  - [old/terminology/minor] Used 'obsessive thoughts' instead of the preferred 'intrusive thoughts' for 'навязчивые мысли'.
  - [old/style/minor] The phrasing 'never received an official OCD diagnosis' is slightly wordier than the more direct 'was not officially diagnosed'.

#### 🔴 en `/steps_description/3/text` — OLD лучше (2:0)

- **RU**: Сила и частота навязчивых мыслей могут значительно варьироваться у разных людей. Некоторые могут справляться с ними большую часть времени, в то время как другие испытывают постоянные трудности.
- **OLD**: The intensity and frequency of intrusive thoughts can vary greatly from person to person. Some are able to cope with them most of the time, while others experience ongoing difficulty.
- **NEW**: The intensity and frequency of intrusive thoughts can vary significantly from person to person. Some may manage them most of the time, while others experience constant difficulty.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses more natural, idiomatic collocations for a mental health context ('cope with' instead of 'manage' and 'ongoing difficulty' instead of 'constant difficulty').
  - [new/style/minor] 'manage them' is grammatically correct but 'cope with them' is the standard idiomatic expression in CBT/mental health contexts; 'constant difficulty' sounds slightly more clinical/stiff than 'ongoing difficulty'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Translation A sounds more natural and idiomatic for a mental health context. 'Ongoing difficulty' is a smoother, more professional way to describe persistent struggles than 'constant difficulty'.
  - [new/style/minor] 'Constant difficulty' sounds slightly more repetitive/clunky compared to 'ongoing difficulty' in this context.

#### 🟢 en `/steps_description/7/fact` — NEW лучше (2:0)

- **RU**: Люди с ОКР часто страдают от коморбидных расстройств, таких как депрессия и тревожные расстройства, что усугубляет их состояние и усиливает чувство дискомфорта.
- **OLD**: People with OCD often live with additional conditions such as depression and anxiety disorders, which makes their experience heavier and intensifies feelings of discomfort.
- **NEW**: People with OCD often experience comorbid conditions, such as depression and anxiety disorders, which can exacerbate their symptoms and increase discomfort.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses precise, professional medical terminology ('comorbid conditions', 'exacerbate symptoms') that fits the educational context perfectly. Translation B is too colloquial ('live with', 'experience heavier') and lacks the clinical accuracy expected in psychoeducation.
  - [old/style/minor] The phrase 'makes their experience heavier' is non-idiomatic and sounds like a direct translation from Russian; 'exacerbate' or 'worsen' would be much more natural.
  - [old/terminology/minor] Used 'additional conditions' instead of the more accurate 'comorbid conditions' used in the original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B uses precise, professional terminology ('comorbid', 'exacerbate') that fits the psychoeducational context perfectly, whereas Translation A uses overly colloquial and vague phrasing ('live with additional conditions', 'makes their experience heavier').
  - [old/style/minor] The phrase 'makes their experience heavier' is a bit clunky and lacks the clinical precision expected in mental health content.
  - [old/terminology/minor] 'additional conditions' is a weak substitute for the specific term 'comorbid disorders'.

#### 🟢 en `/steps_description/6/text` — NEW лучше (2:0)

- **RU**: Навязчивые действия могут мешать профессиональной деятельности, снижая продуктивность и вызывая трудности в выполнении рабочих обязанностей. Некоторые люди вынуждены сокращать рабочие часы или даже менять работу из-за своего состояния.
- **OLD**: Compulsive actions can interfere with work or study by lowering productivity and making it hard to complete tasks. Some people have to cut back their working hours or even change jobs because of their symptoms.
- **NEW**: Compulsive actions can interfere with professional life, reducing productivity and making it difficult to perform work duties. Some people may need to reduce their working hours or even change jobs due to their condition.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more professional and closer to the original's tone, using 'professional life' and 'perform work duties' which better match the source than the slightly more casual 'work or study' in A. B also correctly uses 'condition' for 'состояние', whereas A uses 'symptoms', which is a slight shift in meaning.
  - [old/mistranslation/minor] Added 'or study' which is not in the original; changed 'состояние' to 'symptoms'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A is more faithful to the original text and maintains a professional, neutral tone. Translation B introduces 'study', which is an addition not present in the source, and uses 'symptoms' instead of 'condition', which slightly shifts the nuance.
  - [old/addition/minor] Added 'or study' which is not in the original text.
  - [old/style/minor] The shift from 'condition' to 'symptoms' is a slight change in nuance, though acceptable in some contexts.

#### 🟢 en `/range/normal` — NEW лучше (2:0)

- **RU**: Нормальное состояние
- **OLD**: Normal state
- **NEW**: Normal
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 70 / NEW 95)
  - In a mental health or UX context, 'Normal' is the standard, concise way to label a state or status. 'Normal state' sounds overly clinical and like a literal translation of the Russian noun phrase.
  - [old/style/minor] Sounds like a direct translation (calque) and is unnecessarily wordy for a UI label.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - In a mental health app context, 'Normal' is the most natural and concise way to describe a state or mood. 'Normal state' sounds overly clinical and heavy for a UI label.
  - [old/style/minor] Unnecessarily wordy and clinical for a status/mood label; 'Normal' is more idiomatic in UX.

#### 🟢 en `/description/text` — NEW лучше (2:0)

- **RU**: Обсессивно-компульсивное расстройство (ОКР) связано с навязчивыми мыслями и повторяющимися действиями, которые человек выполняет, чтобы снизить тревогу. Проявления ОКР могут быть разными: от периодических навязчивых мыслей до повторяющихся действий и мысленных…
- **OLD**: Obsessive-compulsive disorder (OCD) is linked to intrusive thoughts and repetitive actions that a person performs to reduce anxiety. OCD can show up in many ways: from occasional intrusive thoughts to repeated actions and mental rituals that take time and atte…
- **NEW**: Obsessive-compulsive disorder (OCD) is associated with intrusive thoughts and repetitive actions that a person performs to reduce anxiety. OCD symptoms can vary: from occasional intrusive thoughts to repetitive actions and mental rituals that require time and …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses more idiomatic and professional terminology ('symptoms can vary', 'be mindful of', 'mental well-being') that aligns perfectly with the project's tone and CBT standards. Translation A is grammatically correct but feels slightly more literal and less polished.
  - [old/style/minor] A bit colloquial for a psychoeducational text; 'symptoms can vary' is more standard.
  - [old/terminology/minor] While not wrong, 'mental well-being' is the preferred term in the glossary/instructions for this context.
  - [old/style/minor] A bit clunky; 'be mindful of' (from B) is a much more natural way to express 'внимательное отношение' in a mental health context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A follows the glossary perfectly, specifically using 'mental well-being' instead of 'emotional wellbeing'. It also sounds more professional and natural for a psychoeducational text.
  - [old/terminology/minor] Used 'emotional wellbeing' instead of the required 'mental well-being'.
  - [old/style/minor] 'OCD can show up in many ways' is slightly more colloquial/informal than the original 'Проявления ОКР могут быть разными'.

#### 🔴 en `/steps_description/9/text` — OLD лучше (2:0)

- **RU**: Примерно 30-35% людей отмечают, что в большинстве случаев могут контролировать свои ритуалы.
- **OLD**: Roughly 30–35% of people report that they can control their rituals most of the time.
- **NEW**: Approximately 30–35% of people note that they can control their rituals in most cases.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds much more natural and idiomatic for a native speaker. 'Report' is a better fit than 'note' for statistical data, and 'most of the time' is a more fluid way to express frequency than the slightly clunky 'in most cases'.
  - [new/style/minor] 'note' is acceptable but 'report' is more standard for statistics; 'in most cases' is a bit heavy/formal compared to 'most of the time'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A uses 'most of the time', which is a much more natural, idiomatic way for a native speaker to express frequency in this context than the literal 'in most cases'.
  - [new/style/minor] The phrase 'in most cases' sounds slightly more formal/clunky here compared to the smoother 'most of the time'.

