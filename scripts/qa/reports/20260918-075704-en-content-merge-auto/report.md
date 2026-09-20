# QA: слепое парное сравнение переводов — en-content-merge-auto

- **Дата**: 2026-09-18T04:57:04.093Z
- **Метка**: en-content-merge-auto
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 7897e0c~1
- **Файлы**: story/automatic.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 5
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 0307be282788e1af23069326cb8b79fe5b339e0f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/automatic.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 7 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 2 | 100% |
| **итого** | 7 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 2 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — —; OLD — style/minor×4, style/major×3, omission/major×3, addition/major×3, omission/critical×2, mistranslation/minor×2

### Детали пар (для спот-чека)

#### 🟢 en `/test/answers` — NEW лучше (2:0)

- **RU**: Устойчивые и фундаментальные убеждения Установки, предопределенные нам от рождения Мысли, которые невозможно изменить Отрывочные, многочисленные мысли, возникающие непроизвольно
- **OLD**: Stable and fundamental Predetermined from birth Impossible to change Fragmentary and numerous; they arise involuntarily
- **NEW**: Core and fundamental beliefs Attitudes predetermined from birth Thoughts that are impossible to change Fleeting, numerous thoughts that arise involuntarily
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 95)
  - Translation A is a high-quality, professional translation that preserves the structure and meaning of the original. Translation B suffers from severe omissions, losing the subject of almost every line, and fails to follow the grammatical structure of the source.
  - [old/omission/critical] Missing the main nouns (beliefs, attitudes, thoughts) in almost every line, turning them into fragments that lose the original meaning.
  - [old/style/major] The use of a semicolon in the last line is unnatural for a list of definitions/titles.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 95)
  - Translation B correctly identifies the subject (beliefs, attitudes, thoughts) which is essential for clarity, whereas Translation A omits the nouns entirely, leaving only adjectives. Translation B also uses 'Fleeting' instead of 'Fragmentary', which is much more idiomatic for describing thoughts in a CBT context.
  - [old/omission/critical] The nouns (beliefs, attitudes, thoughts) are missing, making the text a list of adjectives without subjects.
  - [old/style/major] The use of a semicolon in the last line is unnatural for a list of headings/bullet points.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: Эта статья погружает вас в мир «автоматических мыслей» — невидимых спутников наших эмоций в когнитивно-поведенческой терапии (КПТ). Возвращаясь к метафоре яблоневого дерева, мы исследуем, как рождаются наши мгновенные реакции. На ярком примере из жизни мы пока…
- **OLD**: This article introduces the idea of “automatic thoughts” in Cognitive Behavioral Therapy (CBT). We use the image of an apple tree to explain the hierarchy of beliefs behind our quick emotional reactions, and show how life experience shapes our first thoughts a…
- **NEW**: This article dives into the world of automatic thoughts—the invisible companions of our emotions in cognitive behavioral therapy (CBT). Returning to the metaphor of an apple tree, we’ll explore how our instant reactions are born. Using a vivid real-life exampl…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 72 / NEW 96)
  - Translation A is a faithful and high-quality transcreation that preserves the original's tone, structure, and all key metaphors. Translation B is a significant omission, cutting out the entire final sentence and the specific 'vivid example' promise, while also adding unrequested technical concepts like 'hierarchy of beliefs'.
  - [old/omission/major] The entire final sentence about the real-life example and the user's ability to manage the process is missing.
  - [old/addition/major] Introduces 'hierarchy of beliefs', which is not in the original text.
  - [old/style/minor] The tone is more clinical and dry compared to the warm, engaging original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 96)
  - Translation B is a high-quality transcreation that preserves the original's tone, imagery, and structure, whereas Translation A is a significant simplification that omits key metaphors and the empowering closing sentiment.
  - [old/omission/major] Omitted the 'invisible companions' metaphor, the 'vivid real-life example' mention, and the concluding promise of empowerment.
  - [old/style/minor] The tone is too dry and academic compared to the warm, engaging original.

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Давайте проведем небольшой мысленный эксперимент. Вообразите: вы сидите в уютном кресле кинотеатра, свет гаснет, вы ждете начала фильма. Внезапно женщина в ряду перед вами резко вскакивает и звонко бьет по лицу сидящего рядом мужчину. Ситуация шокирующая и нап…
- **OLD**: Let’s try a thought experiment. Imagine you’re sitting in a movie theater, waiting for the film to start. Suddenly, a woman in the row ahead jumps up and slaps the man next to her. It’s a sharp, emotionally charged situation. Imagine what automatic thoughts mi…
- **NEW**: Let’s try a little thought experiment. Imagine this: you’re sitting in a cozy cinema seat, the lights go down, and you’re waiting for the movie to start. Suddenly, a woman in the row in front of you stands up abruptly and sharply slaps the man sitting next to …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a faithful, high-quality rendering that preserves the narrative flow, the specific imagery, and the exact structure of the original text. Translation B introduces significant omissions and hallucinations (adding 'in her forties', removing the stepper components entirely) which makes it unsuitable for this content.
  - [old/omission/critical] The entire stepper component structure (automatic thoughts, emotions, behavior) is missing, which is the core of the exercise.
  - [old/addition/major] Added 'in her forties' which is not in the original.
  - [old/style/major] The text is overly condensed, losing the 'storytelling' tone of the original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 94)
  - Translation B is a faithful and high-quality rendering of the original text, preserving the narrative flow, the specific imagery, and the technical stepper content. Translation A is a heavy condensation that omits significant portions of the text (the actual thoughts and behaviors in the steppers), which is a critical failure for this type of content.
  - [old/omission/critical] The entire content of the <stepper> tags (the automatic thoughts, emotions, and behaviors) was completely omitted, which destroys the educational purpose of the example.
  - [old/style/minor] The tone is too summarized and loses the 'storytelling' feel of the original.

#### 🟢 en `/test/question` — NEW лучше (2:0)

- **RU**: Автоматические мысли — это...
- **OLD**: Automatic thoughts are:
- **NEW**: Automatic thoughts are...
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A correctly preserves the open-ended, conversational nature of the original ellipsis, whereas Translation B replaces it with a colon, which changes the tone from a narrative introduction to a formal list header.
  - [old/style/minor] Replacing the ellipsis with a colon changes the intended rhythm and tone of the sentence.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Translation B preserves the punctuation of the original, which is crucial for maintaining the tone of an introductory lead-in. Translation A replaces the ellipsis with a colon, which changes the stylistic intent.
  - [old/style/minor] Replaced ellipsis with a colon, losing the original's trailing/introductory tone

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Возникает закономерный вопрос: почему же в одной и той же ситуации мы выдаем такие разные автоматические реакции? И значит ли это, что при каждом неприятном событии мы обречены на падение в воронку негатива и депрессии? Абсолютно нет. Автоматические мысли фоня…
- **OLD**: Why, then, do different people think differently in the very same situation? Does that mean that whenever something unpleasant happens, we’re doomed to a vicious cycle of thoughts and emotions that leads to depression? Not at all. Although everyone has automat…
- **NEW**: A logical question arises: why do we have such different automatic reactions in the exact same situation? And does this mean that with every unpleasant event, we are doomed to fall into a spiral of negativity and depression? Absolutely not. Automatic thoughts …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation B is much closer to the original's structure, tone, and imagery. Translation A significantly simplifies the text, losing the specific metaphors (apples, vacuum, humming) and the nuance of the author's voice.
  - [old/omission/major] Lost the 'apples' metaphor, replacing it with generic 'fruits'; lost the 'born in a vacuum' phrase; lost the 'humming' nuance of thoughts.
  - [old/mistranslation/minor] The first sentence changes 'why do we have different reactions' to 'why do different people think differently', which shifts the focus from the mechanism to the people.
  - [old/style/minor] The flow is a bit too clipped and simplified compared to the reflective, narrative tone of the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Translation A is a high-quality transcreation that preserves the author's voice, rhythm, and specific metaphors (apples, humming thoughts) while using idiomatic English. Translation B is too reductive, loses the poetic imagery of the original, and makes several omissions.
  - [old/omission/major] Lost the specific 'apples' metaphor, replacing it with generic 'fruits'.
  - [old/omission/major] Lost the 'humming in the background' imagery (фонят), which is key to the tone.
  - [old/mistranslation/minor] The first sentence changes the meaning from 'why do we have different reactions' to 'why do people think differently'.
  - [old/style/minor] The flow is somewhat choppy and lacks the narrative 'hook' present in the original.

#### 🟡 en `/title`— вердикт неустойчив

- **RU**: Автоматические мысли: какие плоды зреют в саду вашего сознания?
- **OLD**: Automatic Thoughts: What’s Growing in the Garden of Your Mind?
- **NEW**: Automatic thoughts: what’s ripening in the garden of your mind?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A follows the sentence case rule for titles/headers and uses a more evocative, idiomatic verb ('ripening') that preserves the original metaphor of 'fruits ripening'. Translation B uses Title Case, which is less appropriate for this context, and 'growing' is a weaker, more generic verb.
  - [old/style/minor] Uses Title Case instead of sentence case; 'growing' is less precise than 'ripening' for the 'fruits' metaphor.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A uses Title Case, which is appropriate for a headline/article title, and uses 'Growing', which is a more natural and idiomatic way to express the metaphor in English than the literal 'ripening'.
  - [new/style/minor] Uses sentence case for a title and 'ripening' sounds slightly clunky/literal in this metaphorical context compared to 'growing'.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Из предыдущей главы мы выяснили главное: наши мысли — это невидимые дирижеры наших эмоций и телесных реакций. Теперь, опираясь на этот фундамент, давайте познакомимся с тем явлением, с которым нам предстоит работать на практике каждый день. Чтобы наглядно пока…
- **OLD**: From the previous chapter, we already know that our thoughts affect our emotions and physical reactions. Now, building on the basics, let’s turn to what we’ll work with in practice. We thought about how best to illustrate the hierarchy of beliefs in CBT and co…
- **NEW**: From the previous chapter, we’ve learned the most important thing: our thoughts are the invisible conductors of our emotions and physical reactions. Now, building on this foundation, let’s get acquainted with the phenomenon we’ll be working with in practice ev…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 96)
  - Translation B is a faithful and idiomatic rendering that preserves the metaphor, tone, and structure of the original. Translation A significantly alters the text, adding information not present in the source (hierarchy of beliefs) and omitting key imagery (conductors, background noise, the Epictetus quote).
  - [old/omission/major] Missing the Epictetus quote and the 'background noise' metaphor.
  - [old/addition/major] Added 'hierarchy of beliefs' which is not in the original.
  - [old/style/major] Lost the 'invisible conductors' metaphor, which is central to the text's tone.
  - [old/mistranslation/minor] Simplified 'physical reactions' to 'physical reactions' (though 'bodily' is closer, 'physical' is acceptable, but the overall loss of nuance is the issue).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 72 / NEW 96)
  - Translation A is a faithful, high-quality rendering that preserves the original's metaphors, tone, and structure. Translation B introduces significant hallucinations (adding 'hierarchy of beliefs') and omissions (losing the Epictetus quote and the specific description of the apples).
  - [old/addition/major] Added 'We thought about how best to illustrate the hierarchy of beliefs', which is not in the original.
  - [old/omission/critical] The Epictetus quote is completely missing.
  - [old/omission/major] The description of how thoughts dictate mood is lost.
  - [old/style/minor] The flow is disjointed compared to the original's narrative rhythm.

