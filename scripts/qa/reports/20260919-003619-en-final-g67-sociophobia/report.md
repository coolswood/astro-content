# QA: слепое парное сравнение переводов — en-final-g67-sociophobia

- **Дата**: 2026-09-18T21:36:19.124Z
- **Метка**: en-final-g67-sociophobia
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: tests/sociophobia.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/sociophobia.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 7 | 🔴 6 | ⚪ 0 | 🟡 7 | 0 / 0 | 54% |
| **итого** | 20 | 🟢 7 | 🔴 6 | ⚪ 0 | 🟡 7 | 0 / 0 | 54% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×8, terminology/minor×2, addition/minor×1; OLD — style/minor×18, addition/minor×2, mistranslation/major×1, mistranslation/minor×1, style/major×1, omission/minor×1

### Детали пар (для спот-чека)

#### 🔴 en `/variants/15` — OLD лучше (2:0)

- **RU**: Никогда Иногда Часто Постоянно
- **OLD**: Never Sometimes Often All the time
- **NEW**: Never Sometimes Often Constantly
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In the context of frequency scales (like mood or symptom tracking), 'All the time' is much more natural and idiomatic for a user interface than 'Constantly', which can sound slightly clinical or overly intense.
  - [new/style/minor] 'Constantly' sounds a bit heavy/clinical for a friendly UX; 'All the time' is the standard way to express continuous frequency in conversational English.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In the context of frequency scales (like mood or symptom tracking), 'All the time' sounds much more natural and conversational for a user than 'Constantly', which can feel overly clinical or intense.
  - [new/style/minor] 'Constantly' sounds slightly more formal/clinical; 'All the time' is the standard UX pattern for frequency scales in mental health apps.

#### 🟡 en `/variants/14`— вердикт неустойчив

- **RU**: Нет Легкая тревога Умеренная тревога Интенсивная тревога
- **OLD**: No Mild anxiety Moderate anxiety Intense anxiety
- **NEW**: Not at all Mild anxiety Moderate anxiety Intense anxiety
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - Translation A perfectly matches the original's brevity and structure, which is essential for UI scales. Translation B adds 'at all', which is an unnecessary addition that deviates from the source.
  - [new/addition/minor] The phrase 'Not at all' adds words not present in the original 'Нет', making it less concise for a UI scale.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - In the context of a mood or anxiety scale, 'Not at all' is the idiomatic standard for a zero-level response, whereas 'No' sounds unnatural and overly blunt.
  - [old/style/minor] Using 'No' for a scale level is non-idiomatic; 'Not at all' or 'None' is preferred in UX for intensity scales.

#### 🟡 en `/steps_description/21/text`— вердикт неустойчив

- **RU**: Страх писать или делать записи в присутствии других людей иногда называют "скриптофобией". Это частный случай социальной тревожности, связанный с боязнью оценки со стороны окружающих.
- **OLD**: Fear of writing or taking notes in front of others is sometimes referred to as “scriptophobia”. It is a specific form of social anxiety linked to fear of being watched and judged.
- **NEW**: The fear of writing or taking notes in the presence of others is sometimes called “scriptophobia.” This is a specific form of social anxiety related to the fear of being judged by those around you.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and follows the rules for articles and tone. Translation B lacks necessary articles ('Fear of...' instead of 'The fear of...') and uses a slightly more clunky structure.
  - [old/style/minor] Missing definite article at the beginning of the sentence; sounds slightly clipped/telegraphic.
  - [old/style/minor] The phrase 'fear of being watched and judged' adds 'watched', which isn't explicitly in the original, though it's close in meaning.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more concise and natural for a mental health context. Translation B is slightly wordy and uses a more formal, heavy structure ('in the presence of', 'by those around you') which feels less like a 'supportive expert friend'.
  - [new/style/minor] Wordy phrasing ('in the presence of' vs 'in front of') and slightly clunky ending ('by those around you').

#### 🔴 en `/steps_description/9/fact` — OLD лучше (2:0)

- **RU**: Адель, известная британская певица, страдает от социофобии и панических атак. Она избегает многолюдных мест, таких как метро, чтобы уменьшить риск появления панических симптомов.
- **OLD**: Adele, the well-known British singer, has spoken about her social anxiety and panic attacks. She avoids crowded places such as the underground to reduce the risk of intense anxiety symptoms.
- **NEW**: Adele, the famous British singer, suffers from social phobia and panic attacks. She avoids crowded places, like the subway, to reduce the risk of experiencing panic symptoms.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Translation A uses 'social anxiety' and 'intense anxiety symptoms', which sounds much more natural and modern in a mental health context than the clinical/dated 'social phobia' and 'panic symptoms' in B. Additionally, 'the underground' is the correct term for a British singer/context, whereas 'subway' is US-centric.
  - [new/terminology/minor] social phobia is dated; social anxiety is the preferred modern term
  - [new/style/minor] subway is US English; for a British singer, 'the underground' or 'the Tube' is more appropriate
  - [new/style/minor] suffers from is a bit heavy/clinical; 'has spoken about' (A) or 'struggles with' is often preferred in empathetic narratives
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation B is much more idiomatic and culturally accurate for a British context. It uses 'underground' instead of 'subway' and 'social anxiety' instead of the more clinical/dated 'social phobia'.
  - [new/terminology/minor] social phobia is more clinical/dated than social anxiety; subway is US English, whereas Adele is British
  - [new/style/minor] suffers from is a bit heavy/direct; 'has spoken about' in B captures the journalistic nuance better even if slightly more free

#### 🟢 en `/steps_description/31/text` — NEW лучше (2:0)

- **RU**: Исследования показывают, что около 60% людей с социальной тревожностью испытывают дискомфорт при зрительном контакте. Это может быть одним из наиболее тревожных аспектов социальных взаимодействий.
- **OLD**: Research shows that about 60% of people with social anxiety feel uncomfortable making eye contact. This can be one of the most stressful aspects of social interaction for them.
- **NEW**: Studies show that about 60% of people with social anxiety experience discomfort with eye contact. This can be one of the most anxiety-inducing aspects of social interaction.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and precise. 'Anxiety-inducing' is a much better fit for the context of social anxiety than 'stressful', and 'experience discomfort with eye contact' sounds more natural in a psychological context than 'feel uncomfortable making'.
  - [old/style/minor] The addition of 'for them' at the end is slightly redundant and makes the sentence feel less professional/academic than the original.
  - [old/style/minor] Using 'stressful' instead of 'anxiety-inducing' loses the specific nuance of 'тревожный' in a clinical/CBT context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and uses the precise term 'anxiety-inducing', which perfectly captures the nuance of 'тревожных аспектов' in a clinical/educational context. Translation B is slightly wordier and uses 'stressful', which is a broader term than the specific 'anxiety' mentioned in the original.
  - [old/style/minor] The addition of 'for them' at the end is slightly redundant in English as the subject is already established.
  - [old/style/minor] Using 'feel uncomfortable making eye contact' is correct but slightly less sophisticated than 'experience discomfort with eye contact' for a psychoeducational text.

#### 🟡 en `/variants/2`— вердикт неустойчив

- **RU**: Приветливо и открыто С осторожностью и недоверием Пытаюсь избежать разговора Буквально бегу прочь
- **OLD**: Friendly and open Cautious and wary I try to avoid the conversation I quickly walk away
- **NEW**: Friendly and open With caution and distrust I try to avoid the conversation I literally run away
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A accurately captures the intensity and literal meaning of the original phrases, whereas B softens the tone and loses the specific meaning of the last line.
  - [old/mistranslation/major] The original 'Буквально бегу прочь' (literally running away) is significantly weakened to 'quickly walk away', losing the hyperbolic/intense tone.
  - [old/style/minor] The shift from prepositional phrases ('With caution...') to adjectives ('Cautious and wary') changes the grammatical structure of the list, though it is acceptable in English.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Translation A captures the natural, idiomatic tone of a mood/state selection, whereas B is too literal and clunky. Specifically, 'literally run away' in B is a common linguistic trap, and 'With caution and distrust' sounds like a formal description rather than a felt state.
  - [new/style/major] The use of 'With caution and distrust' is heavy and unnatural for a user selecting a state; 'Cautious and wary' (A) is much more idiomatic.
  - [new/style/minor] The phrase 'literally run away' is often a hyperbole in English; 'quickly walk away' (A) better captures the intended meaning of the Russian 'бегу прочь' in a psychological context without sounding like a literal physical sprint.

#### 🟢 en `/steps_description/20/fact` — NEW лучше (2:0)

- **RU**: Техника "импровизационного мышления" может быть полезной. Вместо того чтобы паниковать из-за отсутствия подготовки, попробуйте воспринять ситуацию как возможность для спонтанного и искреннего общения с аудиторией.
- **OLD**: Practising an improvisational mindset can be helpful. Instead of panicking because you haven’t prepared, you can try to treat the situation as an opportunity for honest, spontaneous conversation with the audience.
- **NEW**: “Improvisational thinking” can be a helpful technique. Instead of panicking about a lack of preparation, try to view the situation as an opportunity for spontaneous and sincere communication with your audience.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more faithful to the original structure and terminology while remaining perfectly natural. Translation B introduces 'mindset' and changes the verb to 'practising', which slightly shifts the meaning from a specific technique to a general habit.
  - [old/style/minor] The shift from 'technique' to 'mindset' and 'thinking' to 'practising' makes it a bit more wordy and less direct than the original.
  - [old/style/minor] The phrase 'because you haven't prepared' is slightly more informal/clunky than 'lack of preparation' in this context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B follows the source structure more accurately and uses more natural, idiomatic phrasing ('lack of preparation' vs 'because you haven't prepared'). Translation A changes the subject of the first sentence from the technique to the act of practicing, which slightly shifts the meaning.
  - [old/style/minor] The opening 'Practising an improvisational mindset' is a bit wordy and deviates from the original focus on the technique itself.
  - [old/style/minor] The phrase 'honest, spontaneous conversation' is slightly less idiomatic in this context than 'spontaneous and sincere communication'.

#### 🔴 en `/steps_description/4/fact` — OLD лучше (2:0)

- **RU**: Исследования показывают, что около 15 миллионов американцев (примерно 7% населения США) страдают от социофобии, и значительная часть из них предпочитает избегать социальных ситуаций вне своих обязательных ролей.
- **OLD**: Studies suggest that around 15 million Americans (about 7% of the population) live with social anxiety, and many of them prefer to stay away from social situations beyond their required roles.
- **NEW**: Research shows that about 15 million Americans (approximately 7% of the US population) suffer from social phobia, and a significant number of them prefer to avoid social situations outside of their required roles.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation B uses more natural, empathetic language ('live with' instead of 'suffer from') and follows modern clinical terminology ('social anxiety' instead of the outdated 'social phobia').
  - [new/terminology/minor] social phobia is less common in modern mental health contexts than social anxiety
  - [new/style/minor] suffer from sounds more clinical and heavy than the more supportive 'live with'
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Translation A uses 'live with social anxiety', which is much more natural and modern in a mental health context than the clinical/outdated 'suffer from social phobia' in B. Translation A also avoids the heavy 'significant number of them' in favor of a smoother 'many of them'.
  - [new/terminology/major] Used 'social phobia' instead of the modern 'social anxiety'; 'suffer from' is also more stigmatizing than 'live with'.
  - [new/style/minor] The phrasing 'a significant number of them' is slightly more wordy/clunky than 'many of them'.

#### 🔴 en `/variants/35` — OLD лучше (2:0)

- **RU**: Никогда Иногда Часто Постоянно
- **OLD**: Never Sometimes Often All the time
- **NEW**: Never Sometimes Often Constantly
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In the context of frequency scales (like mood or symptom tracking), 'All the time' is much more natural and idiomatic for a native speaker than 'Constantly', which can sound slightly more clinical or intense.
  - [new/style/minor] 'Constantly' sounds a bit heavy/clinical for a user-friendly scale compared to 'All the time'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In the context of frequency scales (like mood or symptom tracking), 'All the time' is much more natural and idiomatic for a native speaker than 'Constantly', which can sound overly clinical or intense.
  - [new/style/minor] 'Constantly' sounds slightly more formal/clinical, whereas 'All the time' fits the warm, supportive tone of the app better.

#### 🟢 en `/result/normal/text` — NEW лучше (2:0)

- **RU**: Ваши результаты показывают, что вы уверенно чувствуете себя в большинстве социальных ситуаций. Контакт с незнакомыми людьми, участие в обсуждениях или выступления перед аудиторией обычно не вызывают у вас выраженного дискомфорта. Это говорит о том, что вы може…
- **OLD**: Your results suggest that you generally feel confident in most social situations. Contact with unfamiliar people, taking part in discussions or speaking in front of an audience typically does not cause you strong discomfort. This means you can interact with ot…
- **NEW**: Your results show that you feel confident in most social situations. Interacting with strangers, participating in discussions, or speaking in front of an audience typically doesn’t cause you significant discomfort. This suggests that you can interact freely wi…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B is more idiomatic and uses better word choices for a mental health context (e.g., 'Interacting with strangers' instead of the clunky 'Contact with unfamiliar people'). It also follows the instruction to use contractions ('doesn't') for a warmer tone.
  - [old/style/minor] The phrase 'Contact with unfamiliar people' sounds slightly unnatural/clinical compared to 'Interacting with strangers'.
  - [old/style/minor] Avoids contractions, making the tone slightly more formal/stiff than the target 'understanding friend' persona.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A is more idiomatic and flows naturally, using 'Interacting with strangers' instead of the clunky 'Contact with unfamiliar people'. It also correctly uses contractions ('doesn't') which aligns with the brand's warm, supportive tone.
  - [old/style/minor] 'Contact with unfamiliar people' sounds slightly clinical/unnatural compared to 'Interacting with strangers'.
  - [old/style/minor] Avoids contractions ('does not'), making the tone slightly more formal/stiff than the desired 'understanding friend' persona.

#### 🟡 en `/steps_description/6/fact`— вердикт неустойчив

- **RU**: Дигитальная детоксикация становится все более популярной. Многие люди, включая знаменитостей, временно отключаются от социальных сетей, чтобы восстановить свое психическое здоровье и снизить воздействие негативной критики.
- **OLD**: Digital detox is becoming more popular: many people, including public figures, periodically step away from social media to protect their mental health and reduce exposure to negative feedback.
- **NEW**: Digital detoxing is becoming increasingly popular. Many people, including celebrities, temporarily disconnect from social media to restore their mental well-being and reduce the impact of negative criticism.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more faithful to the original structure and uses the most natural phrasing for the context. Translation B introduces an unnecessary colon and changes 'temporarily' to 'periodically', which alters the meaning.
  - [old/mistranslation/minor] changed 'temporarily' (временно) to 'periodically' (периодически)
  - [old/style/minor] the use of a colon creates a slightly different logical connection than the original two sentences
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A sounds more natural and idiomatic for a high-quality article. 'Step away from social media' is a much more common and less clinical expression than 'disconnect from social media', and 'negative feedback' is a better stylistic fit than the heavy 'negative criticism'.
  - [new/style/minor] 'Digital detoxing' is grammatically fine but 'Digital detox' is the more standard noun phrase; 'disconnect from' sounds slightly more technical/robotic than 'step away from'.
  - [new/style/minor] 'Negative criticism' is a bit redundant (criticism is inherently negative); 'negative feedback' or just 'criticism' is better.

#### 🟢 en `/variants/34` — NEW лучше (2:0)

- **RU**: С радостью принимаю предложение Смущаюсь, но соглашаюсь Предпочитаю не вступать Отказываюсь
- **OLD**: I’m glad to accept the invitation I feel shy, but agree I prefer not to join I refuse
- **NEW**: I happily accept the offer I’m a bit shy, but I agree I prefer not to engage I decline
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B uses more natural, idiomatic phrasing for a user interface (e.g., 'I decline' instead of the blunt 'I refuse') and better captures the nuance of 'Смущаюсь' with 'I'm a bit shy'.
  - [old/style/major] 'I refuse' sounds too aggressive and confrontational for a supportive app; 'I decline' is the standard polite UX term.
  - [old/style/minor] 'I feel shy' is grammatically correct but sounds slightly more clinical/heavy than the natural 'I'm a bit shy'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A sounds much more natural and idiomatic for a user interface. Translation B uses 'refuse', which sounds too harsh and aggressive for a supportive mental health app, and 'invitation' is a slight deviation from 'offer'.
  - [old/style/major] The word 'refuse' is too strong and confrontational; 'decline' in A is much more polite and appropriate for the tone.
  - [old/style/minor] The phrase 'I feel shy' is a bit clunky compared to the more natural 'I'm a bit shy'.
  - [old/mistranslation/minor] Changed 'предложение' (offer) to 'invitation'.

#### 🔴 en `/variants/38` — OLD лучше (2:0)

- **RU**: Никогда Иногда Часто Постоянно
- **OLD**: Never Sometimes Often All the time
- **NEW**: Never Sometimes Often Constantly
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In the context of mood tracking or frequency scales, 'All the time' sounds much more natural and conversational for a user interface than 'Constantly', which can feel slightly clinical or intense.
  - [new/style/minor] 'Constantly' sounds a bit heavy/clinical for a friendly app interface compared to 'All the time'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In the context of frequency scales (like mood or symptom tracking), 'All the time' is much more natural and idiomatic for a user interface than 'Constantly', which can sound overly dramatic or clinical.
  - [new/style/minor] 'Constantly' sounds slightly heavy/clinical for a friendly UX compared to 'All the time'.

#### 🟡 en `/steps_description/37/text`— вердикт неустойчив

- **RU**: Люди с социофобией часто испытывают сильную тревогу при разговорах с другими людьми. Страх негативной оценки, беспокойство о том, как будут восприняты их слова, и опасение сделать ошибку могут усиливать тревогу и нервозность.
- **OLD**: People with social anxiety often feel intense worry when talking to others. Fear of negative evaluation, concern about how their words will be perceived and worry about making mistakes can significantly increase anxiety.
- **NEW**: People with social phobia often experience intense anxiety during conversations with others. The fear of negative evaluation, worry about how their words will be perceived, and the fear of making a mistake can heighten anxiety and nervousness.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is more precise and follows the original structure and terminology better. Translation A uses 'social anxiety' instead of 'social phobia' (which is acceptable but B is closer to the source) and misses the final 'nervousness' (omission).
  - [old/omission/minor] Missed 'нервозность' (nervousness) at the end of the sentence.
  - [old/style/minor] Used 'worry' twice in one sentence, making it slightly repetitive compared to the original's variety.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation B uses 'social anxiety', which is the modern, clinically appropriate term, whereas 'social phobia' (A) sounds dated. B also flows more naturally by avoiding the repetitive 'fear of' structure found in A.
  - [new/terminology/minor] Used 'social phobia' instead of the more modern 'social anxiety'.
  - [new/style/minor] Repetitive structure: 'The fear of... and the fear of...' makes the sentence heavy.

#### 🟢 en `/steps_description/23/text` — NEW лучше (2:0)

- **RU**: Мартин Лютер Кинг младший, известный борец за гражданские права, в начале своей карьеры испытывал сильную тревогу при выражении своего мнения перед группами. Однако, преодолевая свои страхи, он стал одним из самых влиятельных ораторов и лидеров движения за пра…
- **OLD**: Martin Luther King Jr., the famous civil rights leader, also experienced strong anxiety about expressing his views in front of groups early in his career. By repeatedly facing his fears, he eventually became one of the most powerful speakers and human rights a…
- **NEW**: Martin Luther King Jr., the renowned civil rights leader, experienced intense anxiety when expressing his opinions before groups early in his career. However, by overcoming his fears, he became one of the most influential orators and leaders of the human right…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is a precise, elegant, and faithful rendering of the original text. Translation B introduces several inaccuracies: it adds 'also' and 'in history' (additions), and changes 'leaders of the human rights movement' to 'human rights advocates', which slightly shifts the nuance.
  - [old/addition/minor] Added 'also' and 'in history', which are not in the original.
  - [old/style/minor] The phrasing 'strong anxiety about expressing' is slightly less idiomatic than 'anxiety when expressing'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more faithful to the original structure and terminology, specifically capturing 'leaders of the human rights movement' and 'influential orators' more accurately. Translation A adds 'in history' and changes 'overcoming' to 'repeatedly facing', which are slight additions/interpretations not present in the source.
  - [old/addition/minor] Added 'in history' at the end and 'repeatedly' before facing fears, which shifts the nuance slightly from the original.
  - [old/style/minor] Used 'advocates' instead of 'leaders', which is a slight semantic shift from 'лидеров'.

#### 🟢 en `/steps_description/33/text` — NEW лучше (2:0)

- **RU**: Согласно исследованиям, около 20-30% людей испытывают значительный дискомфорт при фотографировании, особенно в группах. Эта тревога может быть связана с страхом негативной оценки и неприятием своего внешнего вида.
- **OLD**: Studies suggest that around 20–30% of people feel significant discomfort when being photographed, especially in groups. This anxiety is often linked to fear of negative evaluation and dissatisfaction with one’s appearance.
- **NEW**: Research indicates that about 20–30% of people experience significant discomfort when being photographed, especially in groups. This anxiety may be linked to a fear of negative evaluation and dissatisfaction with their appearance.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 95)
  - Both translations are excellent, but A is slightly better because 'their appearance' is more natural and inclusive in modern US English than the more formal/stilted 'one’s appearance' used in B.
  - [old/style/minor] The use of 'one's appearance' feels slightly too formal/academic for a supportive, friendly tone compared to the more natural 'their appearance'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Both translations are excellent, but B is slightly better due to the more natural use of 'their appearance' (gender-neutral plural) instead of the more formal/stiff 'one’s appearance'.
  - [old/style/minor] The use of 'one's appearance' sounds slightly more academic/formal than the warm, supportive tone preferred for the target market.

#### 🟡 en `/steps_description/7/text`— вердикт неустойчив

- **RU**: Молчание может быть способом избежать негативного внимания и потенциальной критики, но оно также может ограничивать их карьерный рост и профессиональные возможности.
- **OLD**: Staying silent in meetings can be a way to avoid negative attention and possible criticism, but it may also limit career growth and professional opportunities.
- **NEW**: Silence can be a way to avoid negative attention and potential criticism, but it can also limit career growth and professional opportunities.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is much more natural for a professional/psychological context; 'Staying silent in meetings' provides the necessary context that 'Silence' lacks, making it sound like a behavioral observation rather than a philosophical statement. Translation B is a bit too literal and heavy (calque).
  - [new/style/minor] The word 'Silence' is too abstract and sounds like a direct translation of 'Молчание'; in English, describing the behavior 'Staying silent' is more idiomatic for this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is a faithful and accurate rendering of the original text. Translation B introduces an addition ('in meetings') that is not present in the source, which changes the scope of the statement from a general psychological observation to a specific workplace scenario.
  - [old/addition/major] Added 'in meetings', which is not in the original text

#### 🔴 en `/variants/13` — OLD лучше (2:0)

- **RU**: Никогда Иногда Часто Постоянно
- **OLD**: Never Sometimes Often All the time
- **NEW**: Never Sometimes Often Constantly
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In the context of frequency scales (like mood or symptom tracking), 'All the time' is much more natural and idiomatic for a native speaker than 'Constantly', which can sound slightly clinical or overly intense.
  - [new/style/minor] 'Constantly' sounds a bit heavy/clinical for a user-friendly scale compared to 'All the time'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - In the context of frequency scales (like mood or symptom tracking), 'All the time' sounds much more natural and conversational for a user than the clinical-sounding 'Constantly'.
  - [new/style/minor] 'Constantly' feels slightly too formal or intense for a friendly, supportive UX; 'All the time' is the standard way a native speaker describes frequency in this context.

#### 🟢 en `/variants/33` — NEW лучше (2:0)

- **RU**: С удовольствием соглашаюсь Немного неуютно, но соглашаюсь Предпочитаю избегать Отказываюсь
- **OLD**: I’m happy to join in I feel a bit awkward, but agree I prefer to avoid it I say no
- **NEW**: I happily agree A bit uncomfortable, but I agree I prefer to avoid socializing I decline
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A is more precise and maintains the formal-yet-personal structure of the original options. Translation B introduces an addition ('socializing') and uses overly casual phrasing ('I say no') that doesn't match the tone of a structured choice.
  - [old/addition/minor] Added 'socializing' which is not in the original text.
  - [old/style/minor] 'I say no' is too colloquial for a selection menu; 'I decline' or 'I refuse' is more standard.
  - [old/style/minor] 'I'm happy to join in' is a bit wordy compared to the concise original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation B is more idiomatic and better captures the psychological nuance of the original. Translation A feels slightly clunky and literal in several places.
  - [old/style/minor] ‘I’m happy to join in’ is a bit wordy for a selection option; ‘I say no’ is too informal/childish compared to the original.
  - [old/style/minor] ‘I feel a bit awkward’ is grammatically fine but ‘uncomfortable’ in B is a more standard way to describe the feeling in a psychological context.

#### 🟡 en `/steps_description/27/text`— вердикт неустойчив

- **RU**: Согласно исследованиям, около 7-9% людей страдают от парарезиса, также известного как синдром застенчивого мочеиспускания, что заставляет их избегать использования общественных туалетов.
- **OLD**: Studies suggest that about 7–9% of people live with paruresis, also known as “shy bladder syndrome”, which can lead them to avoid using public toilets.
- **NEW**: Research shows that about 7–9% of people suffer from paruresis, also known as shy bladder syndrome, which causes them to avoid using public restrooms.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more direct and natural for a general informative text. Translation B uses unnecessary quotation marks around the term and 'public toilets' sounds slightly more clinical/British, whereas 'public restrooms' is the standard US English term for the target market.
  - [old/style/minor] Use of quotation marks around 'shy bladder syndrome' is unnecessary and makes the text look less professional.
  - [old/style/minor] 'Public toilets' is less common in US English than 'public restrooms'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'live with' instead of 'suffer from', which aligns much better with the supportive, non-judgmental tone of the project. It also uses 'toilets', which is more universal for an international market, whereas 'restrooms' is US-centric.
  - [new/style/minor] The phrase 'suffer from' is slightly more stigmatizing/medical than the preferred 'live with' in modern mental health contexts.

