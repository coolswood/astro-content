# QA: слепое парное сравнение переводов — en-b4-anxiety

- **Дата**: 2026-09-18T11:48:50.649Z
- **Метка**: en-b4-anxiety
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: tests/anxiety.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 59773e25fd9cb826f3e71e3a543930f97721ad28

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/anxiety.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 12 | 🔴 4 | ⚪ 0 | 🟡 4 | 0 / 1 | 75% |
| **итого** | 20 | 🟢 12 | 🔴 4 | ⚪ 0 | 🟡 4 | 0 / 1 | 75% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×7, mistranslation/minor×1; OLD — style/minor×11, omission/minor×3, mistranslation/major×2, mistranslation/minor×1, addition/minor×1, mistranslation/critical×1, terminology/minor×1, omission/major×1, style/major×1

### Детали пар (для спот-чека)

#### 🔴 en `/steps_description/14/fact` — OLD лучше (2:0)

- **RU**: Стресс и тревога могут привести к спазмам в желудке, усиленной секреции желудочной кислоты или даже к синдрому раздраженного кишечника (СРК). Эти симптомы являются психосоматическими, то есть физическими проявлениями психологического недомогания.
- **OLD**: Stress and anxiety can lead to stomach cramps, increased stomach acid secretion or even irritable bowel syndrome (IBS). These symptoms are psychosomatic — physical manifestations of psychological distress.
- **NEW**: Stress and anxiety can lead to stomach spasms, increased gastric acid secretion, or even irritable bowel syndrome (IBS). These symptoms are psychosomatic, meaning they are physical manifestations of psychological distress.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and natural for a mental health context. Translation B uses 'gastric acid secretion' and 'stomach spasms', which sound slightly more clinical/medical than the smoother 'stomach acid secretion' and 'stomach cramps' preferred in psychoeducation.
  - [new/style/minor] The phrase 'meaning they are' is slightly wordy compared to the elegant em dash used in A; 'gastric' and 'spasms' feel a bit too formal/medical for a supportive tone.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B is more natural and follows the stylistic guidelines better. The use of an em dash instead of 'meaning they are' makes the text punchier and more idiomatic for a mental health context, and 'stomach cramps' is more common in patient-facing language than the clinical 'stomach spasms'.
  - [new/style/minor] The phrasing 'meaning they are' is slightly more wordy and academic than the more direct em dash used in B.
  - [new/style/minor] 'Stomach spasms' is grammatically correct but 'stomach cramps' (in B) sounds more natural for a supportive 'expert friend' tone.

#### 🟢 en `/steps` — NEW лучше (2:0)

- **RU**: Я чувствую больше тревоги и нервозности, чем обычно Я чувствую страх без понятной причины Меня легко выбить из равновесия или довести до паники Мне трудно собраться и взять себя в руки У меня есть чувство безопасности и спокойствия за свое будущее Я замечаю др…
- **OLD**: I feel more nervous and anxious than usual I feel afraid for no apparent reason I get upset or panic easily I feel like I can’t pull myself together or get a grip I have a sense of well-being, I feel that nothing bad will happen to me My hands and feet tremble…
- **NEW**: I feel more anxious and nervous than usual I feel fear for no apparent reason I feel easily unsettled or driven to panic I find it hard to pull myself together I feel safe and secure about my future I notice trembling in my hands and legs I experience headache…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is much more accurate to the original text and follows the required tone. Translation A introduces significant mistranslations and omissions, such as changing 'safety and calm about the future' into a generic 'well-being' and misinterpreting 'feeling like I might pass out' as 'I faint'.
  - [old/mistranslation/major] The phrase 'I have a sense of well-being, I feel that nothing bad will happen to me' is a massive departure from the original 'feeling of safety and calm about the future'.
  - [old/mistranslation/major] 'I faint or feel as if I might pass out' changes the meaning from 'feeling like I might' to 'I actually faint'.
  - [old/mistranslation/minor] 'I feel calm and unhurried' is a poor translation of 'спокойствие и внутренняя собранность' (calm and composed).
  - [old/omission/minor] Missed 'legs' in the trembling sentence (only mentioned hands and feet).
  - [new/style/minor] The phrase 'I suffer from nightmares' is slightly heavy, but acceptable for a clinical/symptom context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more precise, maintains the original's tone, and uses more natural, idiomatic English for a clinical/self-help context. Translation B contains several mistranslations and stylistic issues.
  - [old/mistranslation/major] The line 'У меня есть чувство безопасности...' is translated as 'I have a sense of well-being, I feel that nothing bad will happen to me', which is a massive addition/interpretation not present in the original.
  - [old/mistranslation/major] The line 'Меня легко выбить из равновесия...' is translated as 'I get upset or panic easily', which loses the nuance of being 'unsettled' or 'thrown off balance'.
  - [old/mistranslation/major] The line 'У меня бывает чувство, будто я могу потерять сознание' is translated as 'I faint or feel as if I might pass out'. The original says 'as if I might', but B adds 'I faint' (actual loss of consciousness), which changes the meaning.
  - [old/style/minor] 'I feel calm and unhurried' is a poor translation for 'спокойствие и внутреннюю собранность' (composed/collected).
  - [old/style/minor] 'My hands and feet tremble and shake' is redundant and less natural than 'trembling in my hands and legs'.

#### 🟢 en `/steps_description/4/fact` — NEW лучше (2:0)

- **RU**: Исследования показывают, что оптимизм может даже повлиять на физическое здоровье. Оптимисты часто имеют меньший риск развития хронических заболеваний и дольше живут по сравнению с пессимистами.
- **OLD**: Research shows that optimism can even influence physical health. Optimistic people often have a lower risk of chronic diseases and tend to live longer than pessimists.
- **NEW**: Research shows that optimism can even impact physical health. Optimists often have a lower risk of developing chronic diseases and tend to live longer than pessimists.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Both translations are excellent, but B is slightly more precise and idiomatic. The use of 'developing' in B accurately reflects the Russian 'развития' and follows standard medical/psychological English collocations better than the slightly more abrupt A.
  - [old/style/minor] Missing 'developing' makes the phrase 'lower risk of chronic diseases' grammatically correct but slightly less precise than 'lower risk of developing chronic diseases'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A is more concise and uses 'impact', which sounds more natural in this context. Translation B is slightly more wordy ('Optimistic people' vs 'Optimists') and omits 'developing' before 'chronic diseases', making it slightly less precise.
  - [old/style/minor] 'Optimistic people' is slightly more wordy than the idiomatic 'Optimists'.
  - [old/omission/minor] Omitted 'developing' (развития), though the meaning remains clear.

#### 🟢 en `/steps_description/15/text` — NEW лучше (2:0)

- **RU**: Частые позывы к мочеиспусканию могут быть одним из физиологических симптомов тревожности. Активация симпатической нервной системы в ответ на стресс может усиливать работу мочевого пузыря и уринарного тракта, что приводит к учащенному мочеиспусканию.
- **OLD**: Frequent urges to urinate can be one of the physical symptoms of anxiety. Activation of the sympathetic nervous system in response to stress can increase activity of the bladder and urinary tract, which leads to more frequent urination.
- **NEW**: Frequent urges to urinate can be one of the physiological symptoms of anxiety. The activation of the sympathetic nervous system in response to stress can increase bladder and urinary tract activity, leading to frequent urination.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and flows better as a professional medical/educational text. Translation A uses 'more frequent urination', which is slightly clunky compared to the more natural 'leading to frequent urination' in B.
  - [old/style/minor] The phrasing 'increase activity of the bladder' is slightly less natural than 'increase bladder activity'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and flows better. It uses 'physiological symptoms' which is more precise for this context, and the phrasing 'increase bladder and urinary tract activity' is much more natural than the clunky 'increase activity of the bladder...' in B.
  - [old/style/minor] The construction 'increase activity of the bladder and urinary tract' is wordy and less natural than the compound noun structure used in A.
  - [old/style/minor] 'physical symptoms' is acceptable, but 'physiological' (as in A) is more accurate for the biological mechanism described.

#### 🔴 en `/variants/seldom` — OLD лучше (2:0)

- **RU**: Редко
- **OLD**: Rarely
- **NEW**: Seldom
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - In the context of a mobile app (likely a frequency scale for mood or symptoms), 'Rarely' is the standard, modern UX term. 'Seldom' sounds overly formal and literary.
  - [new/style/minor] Too formal/literary for a modern app interface
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 75)
  - In the context of frequency (like mood or activity tracking), 'Rarely' is the standard, natural choice for English speakers. 'Seldom' sounds overly formal, literary, or archaic for a modern app interface.
  - [new/style/minor] Too formal/literary for a modern UX context

#### 🟢 en `/steps_description/14/text` — NEW лучше (2:0)

- **RU**: Боли в желудке и расстройства пищеварения часто встречаются у людей с тревожными расстройствами. Это связано с тем, что тревожность может усиливать работу симпатической нервной системы, что приводит к изменениям в пищеварении, включая ускорение или замедление …
- **OLD**: Stomach pain and digestive problems are common in people with anxiety disorders. Anxiety can increase the activity of the sympathetic nervous system, which changes digestive processes, speeding them up or slowing them down.
- **NEW**: Stomach aches and digestive issues are common among people with anxiety disorders. This is because anxiety can heighten the activity of the sympathetic nervous system, leading to digestive changes, such as speeding up or slowing down gastric motility.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A is more precise and professional, using the correct medical term 'gastric motility' which matches the original 'желудочной моторики'. Translation B is a bit too simplified and loses the specific nuance of the physiological process.
  - [old/style/minor] The phrasing 'which changes digestive processes' is a bit clunky compared to the more natural 'leading to digestive changes' in A.
  - [old/omission/minor] Omitted the specific term 'gastric motility', replacing it with a generic description.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses more precise and professional terminology ('gastric motility', 'heighten') while maintaining a natural flow. Translation A is grammatically correct but sounds slightly more simplistic and less like a high-quality psychoeducational text.
  - [old/style/minor] The phrasing 'changes digestive processes' is a bit generic compared to the more professional 'leading to digestive changes' or 'affecting digestion'.

#### 🟢 en `/result/light/text` — NEW лучше (2:0)

- **RU**: Ваш результат говорит о лёгком уровне тревожности. Это может быть связано со стрессовыми или неприятными событиями, такими как сложности в отношениях, финансовые переживания, изменения в жизни. Настроение может быть снижено, но эти состояния обычно проходят. П…
- **OLD**: Your result suggests a mild level of anxiety. This may be related to stressful or unpleasant events such as relationship difficulties, financial concerns or life changes. Your mood may be lowered, but these states usually pass. Support from loved ones, rest an…
- **NEW**: Your results suggest a mild level of anxiety. This may be linked to stressful or unpleasant events, such as relationship difficulties, financial concerns, or life changes. Your mood might be slightly lower, but these states usually pass. Support from loved one…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and idiomatic. Using 'results' (plural) is standard for test outcomes, and 'might be slightly lower' sounds much more like a supportive expert than the clunky 'may be lowered' in B.
  - [old/style/minor] The phrase 'Your mood may be lowered' sounds unnatural and passive; 'slightly lower' or 'lowered mood' is better.
  - [old/style/minor] Missing Oxford comma in a list, which is fine, but A's flow is smoother for a professional medical/wellness context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and uses better punctuation (Oxford comma) and natural phrasing ('might be slightly lower' vs 'may be lowered').
  - [old/style/minor] The phrase 'Your mood may be lowered' sounds slightly unnatural/clunky compared to 'might be slightly lower'.

#### 🟢 en `/steps_description/10/text` — NEW лучше (2:0)

- **RU**: Головокружение может быть прямым симптомом тревожного расстройства. В состояниях повышенной тревожности, организм может реагировать активацией автономной нервной системы, что ведет к изменениям в кровообращении и, как следствие, к ощущению головокружения.
- **OLD**: Dizziness can be a direct symptom of an anxiety disorder. During heightened anxiety the autonomic nervous system is activated, which leads to changes in blood circulation and, as a result, to feelings of light-headedness or dizziness.
- **NEW**: Dizziness can be a direct symptom of an anxiety disorder. During periods of high anxiety, the body may respond by activating the autonomic nervous system, leading to changes in blood circulation and, consequently, a sensation of dizziness.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B is more accurate to the original text and follows the 'expert friend' tone. Translation A adds 'light-headedness', which is an addition not present in the source, and omits the mention of 'the body' (организм).
  - [old/addition/minor] Added 'light-headedness' which wasn't in the original.
  - [old/omission/minor] Omitted 'the body' (организм), making the sentence slightly less precise compared to the source.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more precise and follows the original structure without adding unnecessary interpretations. Translation B introduces 'light-headedness' which is not in the source, and its phrasing is slightly more clunky.
  - [old/addition/minor] Added 'light-headedness' which wasn't in the original text.
  - [old/style/minor] The phrasing 'the autonomic nervous system is activated' is slightly more passive and less fluid than 'the body may respond by activating...'.

#### 🟢 en `/result/extreme/text` — NEW лучше (2:0)

- **RU**: Ваш результат говорит о сильной тревоге, которая может сопровождаться выраженным эмоциональным дискомфортом и сложностями в повседневной жизни. Если вы чувствуете себя подавленно, переживаете тяжёлые мысли или вам трудно справляться самостоятельно, обратитесь …
- **OLD**: Your result indicates severe anxiety, which may be accompanied by intense emotional discomfort and difficulties in daily life. If you feel down, experience distressing thoughts or find it hard to cope on your own, please reach out for professional support. You…
- **NEW**: Your results suggest severe anxiety, which may be accompanied by significant emotional discomfort and difficulties in daily life. If you feel overwhelmed, experience distressing thoughts, or find it hard to cope on your own, please seek professional support. Y…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and aligns better with the 'understanding friend' tone. It uses 'overwhelmed' (more natural for 'подавленно' in this context) and 'help is available' (standard English collocation), whereas A feels slightly more formal and stiff.
  - [old/style/minor] The phrasing 'help exists' is a bit literal/clunky compared to 'help is available'.
  - [old/style/minor] Uses 'You are not alone' instead of the more natural contraction 'You're not alone' used in the app's tone guidelines.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more idiomatic and flows better for a mental health context. 'Feeling overwhelmed' is a much more natural and accurate way to translate 'чувствуете себя подавленно' in this context than 'feel down', and 'reaching out' is a smoother way to conclude the sentence than the clunky 'help exists and can become'.
  - [old/style/minor] 'Feel down' is a bit too casual/colloquial for this level of clinical concern; 'overwhelmed' is better.
  - [old/style/minor] 'Help exists' sounds slightly unnatural/translated; 'help is available' is the standard English idiom.
  - [old/style/minor] The phrasing 'help exists and can become an important step' is logically disconnected; the help itself isn't the step, the act of seeking it is.

#### 🟡 en `/description/text`— вердикт неустойчив

- **RU**: Этот тест для самооценки тревожности, разработанный в Университете Дьюка под руководством Вильяма Занга, помогает оценить уровень тревожных проявлений, включая беспокойство, панические реакции и напряжение. Шкала ZARS (Zung Anxiety Rating Scale) позволяет лучш…
- **OLD**: This self-rating anxiety test, developed at Duke University under the guidance of William Zang, helps assess the level of anxiety symptoms, including worry, panic reactions and tension. The ZARS (Zung Anxiety Rating Scale) allows you to better understand how m…
- **NEW**: This self-assessment test for anxiety, developed at Duke University under the direction of William Zung, helps evaluate levels of anxiety, including worry, panic reactions, and tension. The ZARS (Zung Anxiety Rating Scale) allows for a better understanding of …
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B is more idiomatic and follows the 'understanding friend-expert' tone better. It uses 'anxiety symptoms' (more natural than 'anxiety manifestations/levels') and 'allows you to' (more engaging) instead of the more formal 'allows for'.
  - [new/style/minor] The phrasing 'evaluate levels of anxiety' is slightly more clinical/stiff than 'assess the level of anxiety symptoms'.
  - [new/mistranslation/minor] The original name is William Zung, but the Russian text says 'Вильяма Занга' (Zang). Translation A corrected this to 'Zung', which is factually correct for the scale, but Translation B followed the Russian spelling error. However, B's overall flow is superior.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B correctly identifies the author as William Zung (the creator of the scale), whereas Translation A incorrectly names him William Zang. Translation B also uses more natural phrasing ('self-assessment test' and 'allows for a better understanding').
  - [old/mistranslation/critical] The name of the developer is incorrectly transcribed as 'William Zang' instead of 'William Zung'.
  - [old/style/minor] 'Self-rating anxiety test' is slightly clunky compared to 'self-assessment test for anxiety'.

#### 🟡 en `/instagram`— вердикт неустойчив

- **RU**: 17925464928138340
- **OLD**: 18009974963641831
- **NEW**: 17925464928138340
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 0 / NEW 100)
  - The original text is a numeric identifier. Translation A changed the number, which is a critical error, while Translation B preserved it exactly.
  - [old/mistranslation/critical] The numeric value was altered
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 0 / NEW 100)
  - The input consists of numeric identifiers. Both translations are treated as literal copies of the source, though B is a mistranslation/corruption of the number.
  - [old/mistranslation/critical] The number does not match the original

#### 🟢 en `/steps_description/7/text` — NEW лучше (2:0)

- **RU**: Согласно статистике, около 10% людей в мире страдают от хронической усталости, которая значительно влияет на их способность выполнять повседневные задачи.
- **OLD**: According to statistics, about 10% of people worldwide suffer from chronic fatigue, which significantly affects their ability to perform everyday tasks.
- **NEW**: Statistics show that about 10% of people worldwide suffer from chronic fatigue, which significantly impacts their ability to perform daily tasks.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B sounds more natural and professional for an article. 'Statistics show' is a more idiomatic way to introduce data than the slightly more formal/clunky 'According to statistics', and 'impacts' is a stronger, more modern choice than 'affects' in this context.
  - [old/style/minor] The phrasing 'According to statistics' is grammatically correct but slightly more textbook-like/stiff compared to 'Statistics show'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A sounds more natural and professional for an English-speaking audience by using 'Statistics show' instead of the more literal and slightly clunky 'According to statistics'.
  - [old/style/minor] The phrase 'According to statistics' is a bit of a translationese/cliché; 'Statistics show' is more idiomatic for high-quality non-fiction/articles.

#### 🟢 en `/range/normal` — NEW лучше (2:0)

- **RU**: Нормальное состояние
- **OLD**: Normal state
- **NEW**: Normal
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 70 / NEW 95)
  - In a UX/UI context, 'Normal' is the standard, concise way to label a state or status. 'Normal state' sounds like a clinical or scientific description rather than a natural interface label.
  - [old/style/minor] Too wordy and sounds like a literal translation of 'состояние' instead of a natural UI label.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - In a mental health app context, 'Normal' is the standard, concise way to describe a baseline state. 'Normal state' sounds overly clinical and heavy for a UI label.
  - [old/style/minor] Unnecessarily wordy and clinical for a UI element; 'state' is redundant here.

#### 🔴 en `/result/extreme/title` — OLD лучше (2:0)

- **RU**: Сильная тревога
- **OLD**: Severe anxiety
- **NEW**: Extreme anxiety
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - In a clinical or mental health context, 'severe' is the standard term used to describe the intensity of symptoms (e.g., severe anxiety, severe depression). 'Extreme' sounds more colloquial and less professional.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - In a clinical or psychological context, 'severe' is the standard term to describe the intensity of anxiety, whereas 'extreme' sounds slightly more colloquial and less professional.
  - [new/style/minor] 'Extreme' is less idiomatic for describing clinical symptoms than 'severe'.

#### 🔴 en `/steps_description/19/text` — OLD лучше (2:0)

- **RU**: Регулярные кошмары могут серьезно нарушить структуру сна, приводя к недосыпу, что, в свою очередь, увеличивает уровень дневной усталости и снижает общее качество жизни. Это также может способствовать развитию депрессии и других психологических расстройств.
- **OLD**: Frequent nightmares can seriously disrupt sleep structure, leading to sleep deprivation, which in turn increases daytime fatigue and reduces overall quality of life. This can also contribute to the development of depression and other psychological disorders.
- **NEW**: Regular nightmares can seriously disrupt sleep structure, leading to sleep deprivation, which in turn increases daytime fatigue and lowers overall quality of life. This can also contribute to the development of depression and other psychological disorders.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Translation A uses 'Frequent', which is more idiomatic than 'Regular' when describing the occurrence of nightmares in a clinical/psychological context. Both are grammatically correct, but A sounds more natural to a native speaker.
  - [new/style/minor] 'Regular' sounds slightly more like a scheduled routine rather than frequency of occurrence; 'Frequent' is the standard colocation for nightmares.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Both translations are grammatically correct and accurate, but B is slightly better due to the choice of 'Frequent' for 'Регулярные' (which sounds more natural in a clinical/descriptive context than 'Regular') and 'reduces' instead of 'lowers' for quality of life.
  - [new/style/minor] 'Regular' is a bit literal; 'Frequent' is more idiomatic for describing recurring symptoms. 'Lowers' is acceptable, but 'reduces' is more standard for 'quality of life'.

#### 🟢 en `/steps_description/5/text` — NEW лучше (2:0)

- **RU**: Дрожание рук и ног может быть вызвано множеством причин, включая стресс, усталость, переутомление или кофеин. Это также может быть симптомом медицинских состояний, таких как тревожное расстройство, гипертиреоз или даже начало неврологических заболеваний, таких…
- **OLD**: Trembling of the hands and feet can have many causes, including stress, fatigue, overexertion or caffeine. It can also be a symptom of medical conditions such as an anxiety disorder, hyperthyroidism or even early stages of neurological conditions like Parkinso…
- **NEW**: Trembling in your hands and legs can be caused by many things, including stress, fatigue, exhaustion, or caffeine. It can also be a symptom of medical conditions such as anxiety disorders, hyperthyroidism, or even the onset of neurological conditions like Park…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 94)
  - Translation B sounds much more natural to a native speaker. 'Trembling in your hands and legs' is more idiomatic than the heavy 'Trembling of the hands and feet', and 'exhaustion' is a better fit for 'переутомление' in this context than 'overexertion'.
  - [old/style/minor] The phrasing 'Trembling of the hands and feet' is slightly clunky/formal; 'in your hands and legs' is more natural for health content.
  - [old/terminology/minor] Used 'overexertion' for 'переутомление', which is acceptable but 'exhaustion' (in B) is more common in this list of symptoms.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Translation A sounds more natural and empathetic ('Trembling in your hands and legs'), whereas B feels slightly more clinical and detached. A also correctly uses the plural 'anxiety disorders' to match the context of multiple medical conditions.
  - [old/style/minor] The use of 'hands and feet' is a bit more formal/clinical than the original 'рук и ног' (hands and legs).
  - [old/terminology/minor] Used 'an anxiety disorder' (singular) where 'anxiety disorders' (plural) is more appropriate for a general list of conditions.

#### 🟢 en `/steps_description/18/fact` — NEW лучше (2:0)

- **RU**: Крепкий сон улучшает иммунную функцию и снижает риск развития хронических заболеваний. Джефф Безос, основатель Amazon, также подчеркивает, что полноценный сон является ключевым для поддержания его производительности и благополучия.
- **OLD**: Sound sleep improves immune function and reduces the risk of chronic illnesses. Jeff Bezos, the founder of Amazon, has also emphasized that proper sleep is key to maintaining his productivity and well-being.
- **NEW**: Deep sleep improves immune function and reduces the risk of chronic diseases. Amazon founder Jeff Bezos also emphasizes that adequate sleep is key to maintaining his productivity and well-being.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and follows modern journalistic/UX standards for flow. Translation B is slightly more wordy and uses 'has also emphasized', which adds unnecessary weight to the sentence.
  - [old/style/minor] The use of present perfect 'has also emphasized' makes the sentence feel slightly more heavy/formal than the direct present tense in A, which is better for readability.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and follows professional journalistic style. 'Deep sleep' is a more natural collocation than 'Sound sleep' in this context, and the removal of 'the' before 'founder' makes the sentence flow better.
  - [old/style/minor] 'Sound sleep' is slightly more poetic/old-fashioned; 'Deep sleep' is the standard term in health contexts. 'The founder of Amazon' is grammatically correct but slightly wordier than the more natural 'Amazon founder'.

#### 🟡 en `/range/extreme`— вердикт неустойчив

- **RU**: Крайняя степень тревожного расстройства
- **OLD**: Extreme anxiety
- **NEW**: Extreme anxiety disorder
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A accurately reflects the original medical/psychological term 'тревожное расстройство' (anxiety disorder), whereas B omits the 'disorder' part, changing the meaning from a clinical condition to a mere state of feeling.
  - [old/omission/major] Missing 'disorder' (расстройство), which is a key part of the original term.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 80)
  - In English, 'extreme anxiety' is a natural, idiomatic way to describe a high level of anxiety. Adding 'disorder' makes it sound overly clinical and heavy, which deviates from the 'understanding friend' tone.
  - [new/style/minor] The addition of 'disorder' makes the phrase sound like a formal medical diagnosis rather than a descriptive state, which is less natural for a supportive app context.

#### 🟢 en `/result/normal/title` — NEW лучше (2:0)

- **RU**: Нормальное состояние
- **OLD**: Normal state
- **NEW**: Normal
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 95)
  - In a mental health app context, 'Normal state' sounds like a clinical or technical status (like a machine's state), whereas 'Normal' is the natural, concise way to label a baseline or standard condition in UI.
  - [old/style/major] Sounds like a literal translation (calque) and is too clinical/robotic for a supportive app interface.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - In a mental health app context, 'Normal' is the standard, concise way to describe a baseline state. 'Normal state' sounds overly clinical and heavy for a UI label.
  - [old/style/minor] Unnecessarily wordy and clinical for a UI element; 'state' is redundant here.

#### 🟡 en `/steps_description/5/fact`— вердикт неустойчив

- **RU**: Тревожные расстройства являются одними из самых распространенных психических заболеваний, поражающих миллионы людей по всему миру. Около 31% взрослого населения в какой-то момент своей жизни испытывают тревожное расстройство.
- **OLD**: Anxiety disorders are among the most common mental health conditions, affecting millions of people worldwide. Around 31% of adults experience an anxiety disorder at some point in their lives.
- **NEW**: Anxiety disorders are among the most common mental health conditions, affecting millions of people worldwide. About 31% of the adult population will experience an anxiety disorder at some point in their lives.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation A is more precise and natural. Translation B introduces an unnecessary 'will', which changes the factual statement into a prediction of the future, and 'the adult population' is slightly more clunky than the concise 'adults'.
  - [new/style/minor] The use of 'will experience' sounds like a prediction rather than a statistical fact.
  - [new/style/minor] 'the adult population' is slightly more wordy/formal than the more natural 'adults'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A uses 'will experience', which perfectly captures the sense of a life-course probability implied by 'в какой-то момент своей жизни'. Translation B is grammatically correct but sounds slightly more like a static fact rather than a life event.

