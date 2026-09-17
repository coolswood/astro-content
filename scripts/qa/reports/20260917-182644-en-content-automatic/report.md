# QA: слепое парное сравнение переводов — en-content-automatic

- **Дата**: 2026-09-17T15:26:44.093Z
- **Метка**: en-content-automatic
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/automatic.json
- **Локали**: en
- **Сэмпл/файл**: 10
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 3907b3511f2db1a1d0814f4ca645e5f04015007c

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/automatic.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 7 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 2 | 100% |
| **итого** | 7 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 2 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×1; OLD — style/minor×5, omission/major×3, omission/critical×2, mistranslation/major×2, style/major×1, addition/major×1, addition/minor×1, mistranslation/minor×1

### Детали пар (для спот-чека)

#### 🟢 en `/test/question` — NEW лучше (2:0)

- **RU**: Автоматические мысли — это...
- **OLD**: Automatic thoughts are:
- **NEW**: Automatic thoughts are...
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A correctly preserves the open-ended, conversational tone of the original ellipsis, which is common in introductory text. Translation B uses a colon, which changes the stylistic function from a lead-in to a formal list header.
  - [old/style/minor] The colon is more formal and abrupt than the ellipsis used in the original, changing the rhythmic flow.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Translation B perfectly preserves the punctuation and the trailing ellipsis from the original, which is crucial for maintaining the tone of an introductory phrase. Translation A replaces the ellipsis with a colon, which changes the stylistic intent.
  - [old/style/minor] Replaced ellipsis with a colon, losing the original's rhythmic pause and tone.

#### 🟢 en `/test/answers` — NEW лучше (2:0)

- **RU**: Устойчивые и фундаментальные убеждения Установки, предопределенные нам от рождения Мысли, которые невозможно изменить Отрывочные, многочисленные мысли, возникающие непроизвольно
- **OLD**: Stable and fundamental Predetermined from birth Impossible to change Fragmentary and numerous; they arise involuntarily
- **NEW**: Core and fundamental beliefs Attitudes predetermined from birth Thoughts that are impossible to change Fleeting, numerous thoughts that arise involuntarily
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 55 / NEW 98)
  - Translation A is a perfect match for the source, maintaining the structure, meaning, and professional tone. Translation B is a catastrophic failure: it omits key nouns (beliefs, thoughts, attitudes), turning a list of definitions into a fragmented, nonsensical set of adjectives.
  - [old/omission/critical] Missing core nouns: 'beliefs', 'attitudes', and 'thoughts' are completely absent.
  - [old/style/major] The structure is broken; it reads like a list of disconnected adjectives rather than a coherent set of definitions.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 95)
  - Translation B correctly identifies the subject of each phrase (beliefs, attitudes, thoughts) and uses appropriate terminology, whereas Translation A suffers from severe omissions, leaving the phrases as disconnected adjectives.
  - [old/omission/critical] The nouns (beliefs, attitudes, thoughts) are missing in almost every line, making the text grammatically incomplete and losing the original meaning.
  - [old/style/major] The use of a semicolon in the last line is unnecessary and creates an unnatural rhythm for a list of headings/descriptions.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Из предыдущей главы мы выяснили главное: наши мысли — это невидимые дирижеры наших эмоций и телесных реакций. Теперь, опираясь на этот фундамент, давайте познакомимся с тем явлением, с которым нам предстоит работать на практике каждый день. Чтобы наглядно пока…
- **OLD**: From the previous chapter, we already know that our thoughts affect our emotions and physical reactions. Now, building on the basics, let’s turn to what we’ll work with in practice. We thought about how best to illustrate the hierarchy of beliefs in CBT and co…
- **NEW**: From the previous chapter, we’ve learned the most important thing: our thoughts are the invisible conductors of our emotions and physical reactions. Now, building on this foundation, let’s get acquainted with the phenomenon we’ll be working with in practice ev…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 98)
  - Translation A is a faithful, high-quality rendering that preserves the tone, imagery, and specific metaphors of the original. Translation B introduces significant hallucinations (adding information about 'hierarchy of beliefs' that isn't in the source) and omits key parts of the text.
  - [old/addition/major] Added 'We thought about how best to illustrate the hierarchy of beliefs...' which is not in the original.
  - [old/omission/major] Omitted the Epictetus quote entirely.
  - [old/mistranslation/major] Changed the metaphor of 'invisible conductors' to a simple 'affect', losing the core imagery.
  - [old/style/minor] The flow is disjointed due to the added/removed content.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 96)
  - Translation B is a faithful and high-quality rendering that preserves the tone, metaphors, and specific nuances of the original. Translation A significantly alters the meaning, introduces unrequested information (hierarchy of beliefs), and omits key metaphors (invisible conductors, background noise).
  - [old/mistranslation/major] The metaphor 'invisible conductors' is replaced with a generic 'affect', losing the poetic and structural essence of the original.
  - [old/addition/major] Added 'the hierarchy of beliefs', which is not in the original and changes the context of the tree metaphor.
  - [old/omission/major] Omitted the 'background noise' metaphor and the part about thoughts dictating mood.
  - [old/style/minor] The flow is much more clinical and less engaging than the original 'warm expert' tone.

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Давайте проведем небольшой мысленный эксперимент. Вообразите: вы сидите в уютном кресле кинотеатра, свет гаснет, вы ждете начала фильма. Внезапно женщина в ряду перед вами резко вскакивает и звонко бьет по лицу сидящего рядом мужчину. Ситуация шокирующая и нап…
- **OLD**: Let’s try a thought experiment. Imagine you’re sitting in a movie theater, waiting for the film to start. Suddenly, a woman in the row ahead jumps up and slaps the man next to her. It’s a sharp, emotionally charged situation. Imagine what automatic thoughts mi…
- **NEW**: Let’s try a little thought experiment. Imagine this: you’re sitting in a cozy cinema seat, the lights go down, and you’re waiting for the movie to start. Suddenly, a woman in the row in front of you stands up abruptly and sharply slaps the man sitting next to …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 65 / NEW 96)
  - Translation A is a massive omission; it completely skips the 'stepper' content (the core examples of the thought experiment), which makes the text nonsensical in context. Translation B is excellent, follows all stylistic guidelines, and captures the tone perfectly.
  - [old/omission/critical] The entire stepper section containing the specific automatic thoughts, emotions, and behaviors was deleted, losing the core meaning of the exercise.
  - [old/addition/minor] Added 'in her forties' which was not in the original.
  - [old/style/minor] The flow is too summarized and loses the immersive 'storytelling' quality of the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 96)
  - Translation A is a faithful, high-quality rendering that preserves all nuances, the specific imagery, and the structure of the original text. Translation B makes significant omissions and additions that change the narrative flow and content.
  - [old/omission/major] Removed the specific sensory details (cozy seat, lights going down, the sound of the slap) which are crucial for the 'thought experiment' immersion.
  - [old/addition/minor] Added 'in her forties' to the woman's description, which is not in the original.
  - [old/omission/major] Completely omitted the 'stepper' blocks (the actual examples of automatic thoughts, emotions, and behaviors), which are the core functional elements of this text.
  - [old/style/minor] The tone becomes too summarized and loses the 'expert friend' storytelling rhythm of the original.

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Возникает закономерный вопрос: почему же в одной и той же ситуации мы выдаем такие разные автоматические реакции? И значит ли это, что при каждом неприятном событии мы обречены на падение в воронку негатива и депрессии? Абсолютно нет. Автоматические мысли фоня…
- **OLD**: Why, then, do different people think differently in the very same situation? Does that mean that whenever something unpleasant happens, we’re doomed to a vicious cycle of thoughts and emotions that leads to depression? Not at all. Although everyone has automat…
- **NEW**: A logical question arises: why do we have such different automatic reactions in the exact same situation? And does this mean that with every unpleasant event, we are doomed to fall into a spiral of negativity and depression? Absolutely not. Automatic thoughts …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 72 / NEW 96)
  - Translation A is a masterful transcreation that preserves the rhythm, metaphors, and specific CBT terminology of the original. Translation B is too reductive, loses the poetic imagery (apples/fruits), and fails to use the required technical terms (intermediate/core beliefs) correctly in context.
  - [old/mistranslation/major] The first sentence changes the meaning from 'why do we have different reactions' to 'why do people think differently', losing the focus on the individual's reaction to a situation.
  - [old/omission/major] The metaphor of the apple and the roots is significantly weakened and stripped of its descriptive power.
  - [old/style/minor] The phrasing 'vicious cycle of thoughts and emotions' is a generic filler that replaces the specific 'spiral of negativity' from the original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation B is much closer to the original's structure, tone, and specific metaphors, whereas Translation A significantly simplifies and alters the meaning (e.g., changing 'automatic reactions' to 'people think differently' and omitting the 'not born in a vacuum' metaphor).
  - [old/mistranslation/major] The first sentence changes the subject from 'why we have different reactions' to 'why people think differently', losing the nuance of the original.
  - [old/omission/major] The metaphor 'born in a vacuum' is completely omitted.
  - [old/style/minor] The transition 'The thoughts that arise' is a bit weak compared to the original's flow.
  - [old/terminology/minor] Uses 'psychological difficulties' instead of the more standard 'psychological problem' or 'issue' used in the context of CBT.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: Эта статья погружает вас в мир «автоматических мыслей» — невидимых спутников наших эмоций в когнитивно-поведенческой терапии (КПТ). Возвращаясь к метафоре яблоневого дерева, мы исследуем, как рождаются наши мгновенные реакции. На ярком примере из жизни мы пока…
- **OLD**: This article introduces the idea of “automatic thoughts” in Cognitive Behavioral Therapy (CBT). We use the image of an apple tree to explain the hierarchy of beliefs behind our quick emotional reactions, and show how life experience shapes our first thoughts a…
- **NEW**: This article dives into the world of automatic thoughts—the invisible companions of our emotions in cognitive behavioral therapy (CBT). Returning to the metaphor of an apple tree, we’ll explore how our instant reactions are born. Using a vivid real-life exampl…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 96)
  - Translation A is a faithful, high-quality transcreation that preserves all original nuances, metaphors, and the encouraging tone. Translation B is a significant omission, stripping away the apple tree metaphor's context, the specific example mentioned, and the empowering conclusion.
  - [old/omission/major] Missing the 'vivid real-life example' part and the concluding promise that the user can manage the process.
  - [old/mistranslation/minor] Introduces 'hierarchy of beliefs', which is not in the original text, replacing the actual metaphor with a technical concept.
  - [old/style/minor] The tone is much drier and more academic than the warm, engaging original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation B is a faithful and high-quality transcreation that preserves the tone, metaphors, and all key information of the original. Translation A is a significant omission, stripping away the 'invisible companions' metaphor, the 'vivid example' promise, and the empowering conclusion.
  - [old/omission/major] Missing the 'invisible companions' metaphor, the 'vivid real-life example' part, and the final empowering statement about managing the process.
  - [old/style/minor] The tone is much drier and more academic than the original, losing the 'engaging expert friend' feel.

#### 🟡 en `/title`— вердикт неустойчив

- **RU**: Автоматические мысли: какие плоды зреют в саду вашего сознания?
- **OLD**: Automatic Thoughts: What’s Growing in the Garden of Your Mind?
- **NEW**: Automatic thoughts: what’s ripening in the garden of your mind?
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A follows the required sentence case for titles and uses a more natural, idiomatic English metaphor ('What's growing') instead of a literal translation of 'ripening'.
  - [new/style/minor] Uses lowercase for the title (should be sentence case or title case, but A is more consistent with professional UI/UX standards), and 'ripening' sounds slightly clunky in this metaphorical context compared to 'growing'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A correctly follows the sentence case rule for titles/headers, whereas Translation B uses Title Case, which violates the project's style guide. Translation A also uses a more evocative verb ('ripening') that stays closer to the metaphorical 'плоды зреют' in the original.
  - [old/style/minor] Uses Title Case instead of Sentence case for the header.

