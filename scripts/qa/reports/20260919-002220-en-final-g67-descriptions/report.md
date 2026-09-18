# QA: слепое парное сравнение переводов — en-final-g67-descriptions

- **Дата**: 2026-09-18T21:22:20.141Z
- **Метка**: en-final-g67-descriptions
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: tests/das/descriptions.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/das/descriptions.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 7 | 🟢 1 | 🔴 0 | ⚪ 0 | 🟡 6 | 0 / 0 | 100% |
| **итого** | 7 | 🟢 1 | 🔴 0 | ⚪ 0 | 🟡 6 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/major×6, style/minor×2, addition/minor×2, mistranslation/minor×2, mistranslation/major×1, terminology/minor×1, omission/minor×1; OLD — style/minor×2, style/major×1

### Детали пар (для спот-чека)

#### 🟡 en `/impeccability`— вердикт неустойчив

- **RU**: Пункт "Перфекционизм" измеряет стремление человека к совершенству во всём. При отрицательном результате человек настаивает на абсолютной безупречности от себя: ошибки неприемлемы, неудача воспринимается как катастрофа, даже негативные эмоции воспринимаются как…
- **OLD**: The “Perfectionism” scale measures a person’s drive to be flawless in every area. A negative score suggests that the person demands absolute perfection from themselves: mistakes are unacceptable, any failure feels catastrophic, and even difficult emotions can …
- **NEW**: The “Impeccability” score measures the drive for flawlessness in everything. A negative score indicates that you demand absolute perfection from yourself: mistakes feel unacceptable, failure is perceived as a catastrophe, and even negative emotions can feel ov…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A is much more accurate to the original text and maintains a consistent third-person perspective. Translation B makes an unauthorized shift to 'you' (second person), which changes the tone from a descriptive psychological profile to a direct address, and incorrectly translates 'Перфекционизм' as 'Impeccability'.
  - [new/mistranslation/major] The term 'Перфекционизм' (Perfectionism) is translated as 'Impeccability', which is a different concept and not the standard term.
  - [new/style/major] The text shifts from describing 'a person' to addressing 'you', which is inconsistent with the original's descriptive narrative style.
  - [new/style/minor] The translation of 'конец света' as 'overwhelming' loses the dramatic impact and specific metaphor used in the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Translation A is much more natural and follows the 'understanding friend' tone of voice. It uses 'you' to engage the reader, whereas B uses the detached third person ('the person', 'they'), which feels like a dry textbook. A also handles the metaphors and flow more idiomatically.
  - [old/style/major] Uses impersonal third-person 'the person/they' instead of the preferred 'you' for a supportive tone.
  - [old/terminology/minor] Used 'Perfectionism scale' instead of 'score' or 'item' (though 'scale' is acceptable, 'score' is more consistent with the context of a test result).
  - [new/terminology/minor] Used 'Impeccability' for the item name, while the original was 'Perfectionism'. However, it reads more like a natural heading.

#### 🟡 en `/achievements`— вердикт неустойчив

- **RU**: Отрицательный результат свидетельствует о зависимости от работы, когда человек рассматривает себя как товар на рынке труда. Чем ниже баллы, тем больше его радость и способность к счастью зависят от профессиональных достижений. Если такой человек отправляется в…
- **OLD**: A negative score indicates a dependence on work, where a person views themselves as a product on the job market. The lower the score, the more their joy and capacity for happiness depend on professional achievements. If such a person goes on holiday with unfin…
- **NEW**: A negative score indicates a dependency on work, where you might view yourself primarily through the lens of professional utility. The lower the score, the more your joy and capacity for happiness depend on professional achievements. If you take a vacation whi…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is a faithful and professional rendering of the original text, maintaining the third-person perspective and precise meaning. Translation B introduces an unrequested shift to the second person ('you'), which changes the tone from an objective psychological description to direct advice, and it also adds interpretive filler ('through the lens of professional utility') not present in the source.
  - [new/style/major] Unnecessary shift from third person ('a person') to second person ('you'), which alters the original's objective tone.
  - [new/addition/minor] Added 'primarily through the lens of professional utility', which is an interpretation rather than a translation of 'views themselves as a product'.
  - [new/mistranslation/minor] Used 'self-esteem' instead of 'self-respect' (though close, 'self-respect' is the more direct translation of 'самоуважение' in this context).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A uses the 'you' address, which is the standard for the app's tone of voice, making it feel like a supportive expert. Translation B uses the third person ('a person'), which sounds like a dry academic textbook, and contains a slight mistranslation of 'economic setbacks' as 'financial setbacks' (which is acceptable, but 'economic' in the original refers to the broader context of the person's professional standing/market value).
  - [old/style/major] Uses impersonal 'a person/they' instead of the required 'you' address for the target market.
  - [old/style/minor] The phrasing 'experienced as equally devastating' is slightly more dramatic than the original 'воспринимаются им одинаково тяжело'.

#### 🟢 en `/alone` — NEW лучше (2:0)

- **RU**: Пункт "Автономия" измеряет способность человека находить радость в самом себе. Положительный результат указывает на то, что настроения человека формируются его собственными мыслями и взглядами. Такой человек осознаёт ответственность за свои чувства, понимая, ч…
- **OLD**: The “Autonomy” scale assesses a person’s ability to find joy within themselves. A positive score shows that their moods are shaped mainly by their own thoughts and attitudes. Such a person recognizes responsibility for their feelings, understanding that these …
- **NEW**: The “Autonomy” score measures the ability to find joy within yourself. A positive score indicates that your moods are shaped by your own thoughts and perspectives. You take responsibility for your feelings, understanding that they arise from your own inner wor…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A follows the UX guidelines by using the 'you' address, which makes the text feel like a supportive expert friend. Translation B uses the third person ('a person', 'they'), which sounds like a dry, academic textbook and creates distance from the user.
  - [old/style/major] Uses third-person perspective ('a person', 'they') instead of the required 'you' address for a supportive tone.
  - [old/style/minor] The phrase 'feel not truly alone' is awkward and unidiomatic compared to 'not feel lonely'.
  - [old/style/minor] The phrase 'generated in their own mind' sounds slightly clinical/robotic compared to 'comes from within'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B uses the direct 'you' address, which is the standard for mental health apps and much more engaging for the user. Translation A uses a detached, academic third-person 'a person/they' approach that feels like a textbook rather than a supportive tool.
  - [old/style/major] Uses impersonal third-person ('a person', 'they'), which creates a clinical distance unsuitable for the target 'understanding friend' tone.
  - [old/style/minor] The phrase 'feel not truly alone' is slightly clunky compared to 'not feel lonely'.
  - [new/style/minor] Added 'often' in 'often beyond your control', which is a good softening of the causal claim (CBT principle), though not strictly in the original.

#### 🟡 en `/power`— вердикт неустойчив

- **RU**: Пункт "Всемогущество" оценивает склонность человека считать себя центром Вселенной и присваивать себе ответственность за все происходящее. Отрицательный результат указывает на когнитивное искажение, при котором человек неразумно берёт на себя ответственность з…
- **OLD**: The “All-Powerfulness” scale reflects a person’s tendency to see themselves as the centre of the universe and to assume responsibility for everything that happens. A negative score points to a cognitive distortion in which a person unreasonably takes on respon…
- **NEW**: The “Omnipotence” score assesses the tendency to see oneself as the center of the universe and to take responsibility for everything that happens. A negative score indicates a cognitive distortion where you irrationally take responsibility for events beyond yo…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is more consistent in its use of the third person ('they'), which maintains a professional, descriptive tone for a psychological profile. Translation B switches to 'you', which feels inconsistent with the opening sentence and creates a jarring shift in register.
  - [new/style/major] Inconsistent person: starts with 'one/oneself' and then abruptly switches to 'you', which breaks the narrative flow of a profile description.
  - [new/terminology/minor] While 'Omnipotence' is a valid translation for 'Всемогущество', in a psychological context regarding cognitive distortions, 'All-Powerfulness' (used in A) or 'Omnipotence' are both okay, but A's flow is more natural for the text provided.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A uses the 'you' perspective, which is the standard for the app's tone of voice and creates a much more engaging, supportive experience. Translation B uses the third person ('a person', 'they'), which sounds like a dry academic textbook rather than a helpful expert friend.
  - [old/style/major] Uses impersonal third-person 'they/a person' instead of the required 'you' address, making it feel detached and academic.
  - [old/terminology/minor] 'All-Powerfulness' is a clunky literal translation; 'Omnipotence' is the standard term for this concept.
  - [old/style/minor] 'feel guilty and self-condemning' is grammatically awkward; 'self-condemning' is an adjective that doesn't fit the parallel structure well here.

#### 🟡 en `/label`— вердикт неустойчив

- **RU**: Отрицательный результат указывает на то, что человек считает такие вещи, как успех, любовь и счастье, необходимыми. Он ожидает, что окружающие и вся Вселенная будут встречать его с распростертыми объятиями за его личные качества или достижения. Часто эти ожида…
- **OLD**: A negative score indicates that a person treats things like success, love and happiness as absolute necessities. They expect other people — and even the universe — to welcome them with open arms because of their personal qualities or achievements. These expect…
- **NEW**: A negative score indicates a tendency to view success, love, and happiness as entitlements. You may expect the world to welcome you with open arms based on your personal qualities or achievements. Often, these expectations are not met, which can lead to depres…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 78)
  - Translation A is a faithful and high-quality rendering of the original text, maintaining the third-person perspective and the specific nuances of the source. Translation B makes an unauthorized shift to the second person ('you'), which changes the nature of the text from a descriptive psychological profile to direct advice, and introduces several interpretations (like 'entitlements') that, while contextually plausible, deviate from the original phrasing.
  - [new/style/major] Shift from third-person ('a person') to second-person ('you') changes the tone and intent of the text.
  - [new/mistranslation/minor] The phrase 'life does not owe you anything' is a strong idiom that, while good, is a departure from the original 'no reason for fate to obey his wishes'.
  - [new/style/minor] The use of 'entitlements' is a heavy psychological term that wasn't explicitly in the Russian text, though it captures the spirit.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is much more natural and idiomatic for a mental health context. It correctly identifies the psychological concept of 'entitlement' (which is the core meaning of the Russian text) and uses a more engaging 'you' perspective. Translation B is too literal and contains clunky phrasing like 'revolve around their wishes' and 'born for certain special privileges'.
  - [old/style/major] The phrasing 'born for certain special privileges' is an awkward way to translate the original and sounds unnatural in English.
  - [old/style/minor] The phrase 'fate to revolve around their wishes' is a bit dramatic/clunky compared to the more natural 'life does not owe you anything' in A.
  - [old/style/minor] Uses 'disasters' instead of 'tragedies', which slightly shifts the tone.

#### 🟡 en `/love`— вердикт неустойчив

- **RU**: Пункт "Любовь" оценивает способность человека не зависеть от любви окружающих. Положительный результат демонстрирует, что любовь для человека является желаемым, но не единственным интересом в жизни. Он не считает любовь необходимым условием для счастья и самоу…
- **OLD**: The “Love” scale measures how much a person depends on being loved by others. A positive score shows that love is important and desirable, but not their only source of interest and meaning in life. They do not see love as a prerequisite for happiness or self-r…
- **NEW**: The “Love” score assesses your ability to remain independent of the need for external validation through love. A positive score shows that love is a desirable part of your life, but not your sole source of meaning. You don’t view love as a prerequisite for hap…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is more faithful to the original's third-person perspective, whereas Translation B shifts to 'you', which is inappropriate for a descriptive psychological profile of a scale. Translation A also handles the nuances of the text more naturally without adding unnecessary terms like 'external validation'.
  - [new/style/major] The shift from third-person ('a person') to second-person ('you') changes the nature of the text from a description of a scale to a direct address, which is inconsistent with the source.
  - [new/addition/minor] Added 'external validation', which is a specific psychological term not present in the original.
  - [new/omission/minor] Omitted 'отвержении' (abandonment) in the final paragraph, focusing only on 'rejection'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A uses the 'you' perspective, which is the standard for UX and psychological profiling in English, making it feel personal and supportive. Translation B uses the third person ('they', 'a person'), which sounds like a detached academic textbook rather than an engaging app experience.
  - [old/style/major] Uses third-person 'they/a person' instead of the required 'you' for user-facing content.
  - [old/style/minor] The phrase 'experience such people as burdensome' is slightly clunky compared to 'perceive you as burdensome'.
  - [old/terminology/minor] Used 'psychological survival' which adds unnecessary academic weight compared to the original.

#### 🟡 en `/approval`— вердикт неустойчив

- **RU**: Пункт "Одобрение" оценивает тенденцию связывать самоуважение с мнением окружающих. Положительный результат в диапазоне от 0 до 10 указывает на то, что человек обладает независимостью, здоровым чувством собственного достоинства, адекватно реагирует на критику и…
- **OLD**: The “Approval” scale measures how strongly a person ties their self-respect to other people’s opinions. A positive score from 0 to 10 indicates that the person maintains independence, has a healthy sense of self-worth, and responds to criticism and disapproval…
- **NEW**: The “Approval” score assesses the tendency to link self-esteem to the opinions of others. A positive score (0 to 10) indicates independence and a healthy sense of self-worth, meaning you can respond to criticism or disapproval in a balanced way. A negative sco…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A maintains a consistent third-person perspective ('a person', 'they'), which matches the original's descriptive tone. Translation B inconsistently switches from 'a person' to 'you', which is a stylistic error in formal/educational descriptions.
  - [new/style/major] Inconsistent person: starts with 'a person' and then switches to 'you', creating a jarring shift in register.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A uses a more natural, engaging 'you' approach consistent with the app's tone of voice, whereas B is overly formal and repetitive. A also avoids the clunky 'a person' construction, making the text feel like a supportive expert rather than a dry textbook.
  - [old/style/minor] Uses repetitive 'a person/they' structure which feels academic and detached compared to the target 'supportive friend' tone.

