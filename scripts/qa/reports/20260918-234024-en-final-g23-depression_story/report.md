# QA: слепое парное сравнение переводов — en-final-g23-depression_story

- **Дата**: 2026-09-18T20:40:24.037Z
- **Метка**: en-final-g23-depression_story
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/depression_story.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depression_story.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 5 | 🟢 0 | 🔴 1 | ⚪ 0 | 🟡 4 | 0 / 1 | 0% |
| **итого** | 5 | 🟢 0 | 🔴 1 | ⚪ 0 | 🟡 4 | 0 / 1 | 0% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×4, omission/minor×1, terminology/minor×1; OLD — omission/critical×1

### Детали пар (для спот-чека)

#### 🔴 en `/title` — OLD лучше (2:0)

- **RU**: История Алисы: путь к преодолению депрессии
- **OLD**: Alice’s Story: A Path to Overcoming Depression
- **NEW**: Alice’s Story: Overcoming Depression
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B is more faithful to the original structure and rhythm, capturing the metaphorical 'path' (путь) which adds a narrative quality suitable for a story title. Translation A is a bit too blunt and loses the nuance of the journey.
  - [new/omission/minor] omitted 'path to' (путь к)
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 85)
  - Translation A is a faithful and stylistically appropriate rendering of the original title, preserving the nuance of 'path to' (путь к). Translation B is a bit too abrupt and loses the narrative flow of the original.
  - [new/omission/minor] omitted 'путь к' (a path to), making the title feel more like a clinical topic than a personal story

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: Теперь мы видим, как связаны три уровня мышления Алисы и как они формируют её эмоциональное состояние. Важно помнить: Алиса не родилась с такими убеждениями. Они появились и закрепились в течение жизни под влиянием событий и окружения. А значит — их можно изме…
- **OLD**: We can now see how Alice’s three levels of thinking connect—and how they shape her emotions. It’s important to remember: Alice wasn’t born with these beliefs. They formed and solidified over time under the influence of events and her environment. That means th…
- **NEW**: We can now see how Alice’s three levels of thinking are connected and how they shape her emotional state. It’s important to remember: Alice wasn’t born with these beliefs. They developed and became ingrained throughout her life, shaped by her experiences and e…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A flows more naturally and uses more sophisticated, idiomatic phrasing ('opening the way to change', 'these shifts'). Translation B is slightly more repetitive and uses 'adaptive', which is a correct term, but A's 'supportive' better captures the warm, empathetic tone of the original.
  - [new/style/minor] The phrasing 'move on to the next level — her intermediate beliefs' is a bit clunky compared to A's smoother transition.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more polished, follows the project's terminology perfectly (using 'adaptive' instead of 'supportive' for beliefs), and maintains a smoother, more natural flow for a narrative text.
  - [old/terminology/minor] Uses 'supportive' for beliefs, whereas the glossary/standard specifies 'adaptive' as the counterpart to 'unhelpful'.
  - [old/style/minor] The phrasing 'opening the way to change' is slightly more dramatic/clunky than the smoother 'move on to the next level' in A.

#### 🟡 en `/description`— вердикт неустойчив

- **RU**: В этой статье мы разберём историю человека, столкнувшегося с депрессией, чтобы показать, как связаны автоматические мысли, промежуточные и глубинные убеждения. Через историю Алисы и её работу с психологом мы увидим, как формируются убеждения и как их можно мен…
- **OLD**: This article follows one person’s experience with depression to show how automatic thoughts are connected to intermediate and core beliefs. Through Alice’s work with a therapist, we see how beliefs take shape—and how they can be changed—using principles of cog…
- **NEW**: In this article, we’ll explore Alice’s story to show how automatic thoughts, intermediate beliefs, and core beliefs are connected. Through her journey and her work with a psychologist, we’ll see how beliefs are formed and how they can be changed to manage depr…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is much more idiomatic and flows like a professional English article. Translation B is a bit repetitive and follows the Russian sentence structure too closely (calque), making it feel like a translation rather than original content.
  - [new/style/minor] Repetitive use of 'how' and 'her' makes the rhythm clunky.
  - [new/terminology/minor] Used 'psychologist' instead of 'therapist', which is acceptable but 'therapist' is often more natural in this narrative context; however, the main issue is the heavy, literal structure.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more faithful to the original structure and includes all key elements, such as the specific mention of Alice's story in the first sentence. Translation B makes several omissions and uses 'therapist' instead of the required 'psychologist'.
  - [old/omission/minor] Omitted the explicit mention of Alice's story in the first sentence, merging it into the second.
  - [old/terminology/major] Used 'therapist' instead of the mandatory 'psychologist'.

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: Теперь посмотрим, как проявляются три уровня мышления Алисы на примере её диалога с психологом: <dialog psy="true">Алиса, вспомните, пожалуйста, ситуацию, когда вы недавно испытывали сильные негативные эмоции.</dialog> <dialog>Это было вчера. Я смотрела ваканс…
- **OLD**: Now let’s see how Alice’s three levels of thinking show up in a dialogue with her therapist:
- **NEW**: Now, let’s see how Alice’s three levels of thinking manifest in a conversation with her psychologist: <dialog psy="true">Alice, please recall a situation where you recently experienced strong negative emotions.</dialog> <dialog>It was yesterday. I was looking …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 10 / NEW 98)
  - Translation A is a complete, high-quality translation that follows all CBT terminology and stylistic guidelines. Translation B is an incomplete fragment that cuts off after the first sentence.
  - [old/omission/critical] The entire dialogue and the core content of the text are missing.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses 'therapist', which is more natural in this conversational context, and avoids the slightly stiff 'manifest'. Translation B uses 'psychologist', which is technically correct per glossary but sounds more clinical/formal in a dialogue intro, and 'manifest' is a bit heavy for this tone.
  - [new/style/minor] The word 'manifest' is a bit too formal/academic for this warm, storytelling tone; 'show up' or 'appear' is better. 'Psychologist' is correct but 'therapist' is more common in US English for this type of dialogue context.

#### 🟡 en `/screen_1/texts`— вердикт неустойчив

- **RU**: Чтобы наглядно показать связь между автоматическими мыслями, промежуточными и глубинными убеждениями, рассмотрим историю Алисы — молодой девушки, столкнувшейся с депрессией и сомнениями в себе. Для начала немного познакомимся с её жизнью и окружением: Алиса вы…
- **OLD**: To clearly illustrate the link between automatic thoughts, intermediate beliefs, and core beliefs, let’s look at Alice—a young woman facing depression and self-doubt. First, a brief look at her life and background: Alice grew up in a single-parent home in a sm…
- **NEW**: To clearly illustrate the connection between automatic thoughts, intermediate beliefs, and core beliefs, let’s look at the story of Alice — a young woman struggling with depression and self-doubt. First, let’s get to know her life and surroundings a little bet…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is much more idiomatic and flows like a professional English narrative. It avoids the clunky, literal structures found in B (e.g., 'her social activity has decreased' or 'nature trips'). A also uses more natural phrasing for the clinical context, such as 'starts therapy' instead of the slightly more formal 'is seeing a psychologist'.
  - [new/style/minor] 'nature trips' is a bit unnatural; 'outings' or 'trips to the outdoors' is better. 'Social activity has decreased' sounds like a clinical report rather than a story.
  - [new/style/minor] 'left her for another woman' is a bit more dramatic/cliché than the original 'left to start another relationship'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more polished and follows the narrative flow of a professional article. Translation B has a few minor issues with rhythm and slightly awkward phrasing (e.g., 'starts therapy' instead of 'is seeing a psychologist' which changes the nuance of the original).
  - [old/style/minor] The phrasing 'starts therapy' is a bit abrupt compared to the original 'обращается к психологу'.
  - [old/style/minor] The list 'outings, sports, shared activities' is a bit too clipped/telegraphic for a narrative story.

