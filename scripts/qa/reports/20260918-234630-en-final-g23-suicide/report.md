# QA: слепое парное сравнение переводов — en-final-g23-suicide

- **Дата**: 2026-09-18T20:46:30.375Z
- **Метка**: en-final-g23-suicide
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/suicide.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/suicide.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 5 | 🟢 5 | 🔴 0 | ⚪ 0 | 🟡 0 | 0 / 1 | 100% |
| **итого** | 5 | 🟢 5 | 🔴 0 | ⚪ 0 | 🟡 0 | 0 / 1 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×1; OLD — style/minor×6, style/major×3, omission/major×2, omission/minor×2, mistranslation/major×2, mistranslation/minor×1, terminology/minor×1, mistranslation/critical×1

### Детали пар (для спот-чека)

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Мысли о нежелании жить — это не признак слабости, «бракованности» или проигрыша. В них нечего стыдиться. Люди оказываются у этой черты по разным причинам, но их часто объединяет одно: невыносимая, удушающая душевная боль. Когда она становится бесконечной, смер…
- **OLD**: Suicidal thoughts are not a sign of weakness or “defectiveness”. You do not need to be ashamed of them. People arrive at such thoughts in different ways, but they are often united by one thing — unbearable emotional pain that makes death seem like the only rel…
- **NEW**: Thoughts of not wanting to live are not a sign of weakness, being “broken,” or losing. There is no shame in them. People reach this edge for many different reasons, but they are often united by one thing: unbearable, suffocating emotional pain. When it feels e…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Translation B captures the emotional depth, rhythm, and specific metaphors of the original text (suffocating pain, black dot, shut tight) much more effectively. Translation A is too clinical and loses the 'empathetic friend' tone, while also omitting several key descriptive elements.
  - [old/omission/major] Missed the 'suffocating' (удушающая) and 'black dot' (черная точка) metaphors, which are crucial for the emotional impact.
  - [old/style/major] The tone is too dry and clinical ('Suicidal thoughts', 'Research shows') compared to the warm, supportive original.
  - [old/mistranslation/minor] The final sentence 'things will definitely stay the same' is a weak paraphrase of the original's existential question about the darkness being permanent.
  - [new/style/minor] The phrase 'your condition' is a good way to handle 'вашей болезни' in a non-stigmatizing way, though 'illness' or 'depression' would also work.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A is much closer to the original's structure and emotional nuance, maintaining the 'expert friend' tone. Translation B takes too many liberties, simplifying the text to the point of losing its poetic and empathetic impact, and makes several stylistic errors.
  - [old/mistranslation/major] The original says 'thoughts of not wanting to live', while B uses 'Suicidal thoughts', which is a much heavier, more clinical term that changes the tone.
  - [old/omission/major] B omits the vivid metaphor 'suffocating' (удушающая) and the 'black dot' (черная точка) imagery, which are crucial for the text's impact.
  - [old/style/minor] The phrase 'The decision to end one's life' is overly formal/clinical compared to the original's more personal 'Решение сдаться'.
  - [old/style/minor] The ending 'things will definitely stay the same' is a weak, non-idiomatic way to translate the original's existential question about the darkness being permanent.

#### 🟢 en `/screen_4/texts` — NEW лучше (2:0)

- **RU**: В отдельном разделе мы подробно разберем, как именно работать с депрессией с опорой на КПТ, в том числе — как обезоруживать суицидальные мысли. Мы стараемся разжечь в вас искру желания жить, но стать настоящим проводником из темноты сможет только специалист. Е…
- **OLD**: We will devote a separate section to working with depression through CBT, including ways of coping with suicidal thoughts. We are doing our best to support your will to live, but real, personal help can only be provided by a professional. If you are on the edg…
- **NEW**: In a separate section, we will go into detail on how to work through depression using CBT, including how to manage suicidal thoughts. We aim to spark a desire to live within you, but only a professional can truly guide you out of the darkness. If you feel like…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Translation A is much more idiomatic and captures the emotional, supportive tone of the original. Translation B feels disjointed, uses clunky phrasing ('support your will to live'), and misses the poetic nuance of the closing sentences.
  - [old/style/major] The phrase 'support your will to live' sounds clinical and slightly unnatural compared to the original's metaphor.
  - [old/style/major] The translation of the quote and the final sentence ('worth staying for') are weaker and less impactful than A's versions.
  - [old/omission/minor] Missed the 'anonymous' aspect of the help centers mentioned in the original.
  - [old/style/minor] The sentence 'The first step is already a movement toward life' is a very awkward way to translate 'Сделать первый шаг — значит выбрать жизнь'.
  - [old/terminology/minor] Used 'psychologist' instead of 'psychotherapist', which changes the nuance of the medical advice provided.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Translation B captures the emotional depth, the poetic tone, and the specific metaphors of the original much more effectively. Translation A feels somewhat clinical and loses several key nuances (the quote, the specific imagery of 'sparking a desire', and the 'kindness' in the relationship with oneself).
  - [old/omission/major] The quote by Thomas Fuller is completely missing.
  - [old/style/minor] The phrasing 'The first step is already a movement toward life' is a bit clunky and loses the punch of the original.
  - [old/style/minor] The translation of 'бережное отношение' as 'resilient attitude' misses the 'gentle/kind' aspect of the original.
  - [old/terminology/minor] Used 'psychologist' instead of 'psychotherapist' which was in the original, though both are professionals.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Раз уж мы исследуем лабиринты негативного мышления и депрессии, нам предстоит остановиться у самой трудной, но жизненно важной темы — мыслей о суициде. Искренне надеемся, что эта бездна вам незнакома. Но если смерть когда-либо казалась единственным выходом из …
- **OLD**: Since we’re talking about negative thinking, irrational beliefs and depression, we can’t ignore another difficult but important topic — suicide. We are sincerely glad if this has never affected you. And if at some point — now or in the past — death has seemed …
- **NEW**: Since we are exploring the labyrinths of negative thinking and depression, we must pause at the most difficult yet vital topic — suicidal thoughts. We sincerely hope you have never experienced this abyss. But if death has ever felt like the only way out of the…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation B captures the emotional weight, the specific metaphors (labyrinths, abyss, darkness), and the solemn tone of the original much more effectively. Translation A is too clinical and loses the 'empathetic friend' voice, while also making several mistranslations (e.g., 'sincerely glad' instead of 'sincerely hope').
  - [old/mistranslation/major] The phrase 'We are sincerely glad if this has never affected you' is a major tonal error; the original is 'We sincerely hope', and 'glad' sounds inappropriately cheerful for such a heavy topic.
  - [old/style/minor] The translation is too simplified and loses the poetic/narrative quality of the original (e.g., 'talking about negative thinking' vs 'exploring the labyrinths').
  - [old/omission/minor] Missed the nuance of 'carefully and honestly' (бережно и честно), replacing it with just 'calmly'.
  - [old/style/minor] The phrase 'a very large number of suicides are committed' is a bit clunky/passive compared to the more natural flow in B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 72 / NEW 94)
  - Translation A perfectly captures the emotional weight, the 'empathetic friend' tone, and the literary metaphors (labyrinths, abyss, darkness) of the original. Translation B is much flatter, loses the poetic nuance, and introduces inaccuracies (e.g., 'irrational beliefs' which wasn't in the text, and 'official figures' instead of 'cases we know about').
  - [old/addition/minor] Added 'irrational beliefs' which is not in the source.
  - [old/mistranslation/major] 'these are only the official figures' changes the meaning of 'cases we know about' (which implies underreporting, not just official vs unofficial).
  - [old/style/major] The tone is too clinical and loses the 'warm, supportive' requirement; it feels like a dry report rather than a compassionate guide.
  - [old/omission/minor] Missed the 'breaking the wall of silence' metaphor, replacing it with a generic 'remind you: you are not alone'.

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Когда внутри все болит, невозможно представить себе светлое завтра. В такие моменты советы вроде «просто думай о хорошем» звучат как обесценивание и лишь усугубляют чувство вины. Вы ни в чем не виноваты. Разум словно увяз в густой трясине. Эта боль абсолютно р…
- **OLD**: When the pain is intense, it is hard to imagine a different life. Phrases like “just think positive” feel dismissive and only add guilt. You are not to blame. It may feel as if your mind is stuck in a swamp. The pain is real, and you cannot simply flip a switc…
- **NEW**: When everything hurts inside, it is impossible to imagine a brighter tomorrow. In moments like these, advice like “just think positive” can feel invalidating and only worsens the sense of guilt. You are not to blame for anything. It can feel as if your mind is…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 72 / NEW 94)
  - Translation A is a high-quality, idiomatic, and emotionally resonant text that perfectly captures the 'understanding expert' tone. Translation B suffers from significant mistranslations (e.g., 'repeated attempts' instead of 'suicidal thoughts'), loss of key metaphors, and a much drier, less supportive tone.
  - [old/mistranslation/critical] The original mentions 'suicidal thoughts' (суицидальных мыслей), but B translates this as 'repeated attempts' (повторные попытки), which is a dangerous clinical distinction.
  - [old/mistranslation/major] The metaphor 'спасительный канат' (lifeline) is translated as 'thin thread', which completely reverses the supportive meaning of the original.
  - [old/omission/major] The core metaphor of 'dark, distorted glasses' (грязные, темные очки) is significantly weakened and loses its impact.
  - [old/style/minor] The phrasing 'the darkness can be thinned out' is unnatural in English; 'dissipate' in A is much better.
  - [old/style/minor] The text feels more like a clinical summary than a supportive narrative, losing the 'warm friend' tone required.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 72 / NEW 95)
  - Translation B is a high-quality transcreation that preserves the emotional depth, metaphors, and specific CBT terminology of the original. Translation A suffers from significant omissions (missing the core 'suicidal thoughts' mention in the important block), loss of key metaphors (swamp/mud, lifeline/thread), and a much flatter, less empathetic tone.
  - [old/omission/critical] The most critical part of the text—the mention of suicidal thoughts—is completely omitted and replaced with 'repeated attempts', which changes the clinical and emotional meaning.
  - [old/style/major] The metaphors are weakened: 'thin thread' instead of 'lifeline' (спасительный канат), and 'swamp' instead of 'thick mud' (густая трясина).
  - [old/terminology/minor] Uses 'dismissive' instead of the more clinically accurate 'invalidating' for 'обесценивание' in a mental health context.
  - [old/omission/major] The sentence about depression being the cause of the 'dark glasses' is heavily simplified, losing the 'depression' subject entirely.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: Статья поднимает тему депрессии и суицидальных мыслей, приводит понятные цифры и объясняет, как они связаны. Рассказывает о роли когнитивно-поведенческой терапии (КПТ) в преодолении таких кризисов, подчёркивает важность обращения к специалистам и доступность б…
- **OLD**: This article touches on depression and suicidal thoughts, offering clear numbers and explaining how they are connected. It describes the role of cognitive behavioral therapy (CBT) in getting through such crises, emphasizes the importance of seeking professiona…
- **NEW**: This article addresses depression and suicidal thoughts, providing statistics and explaining their connection. It discusses the role of cognitive behavioral therapy (CBT) in navigating such crises, emphasizes the importance of seeking professional help, and hi…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more professional and idiomatic, using 'addresses' and 'navigating' which fit the tone of a psychological article better than 'touches on' or 'getting through'. It also avoids the slightly repetitive 'reminds... reminds' structure found in A.
  - [old/style/minor] The phrase 'touches on' is a bit weak for such a serious topic; 'getting through' is slightly more colloquial than the desired expert-friend tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A is more professional and idiomatic, using precise verbs like 'addresses' and 'highlights'. Translation B is slightly weaker due to the vague 'touches on' and the unnecessary addition of 'often' which wasn't in the original.
  - [old/style/minor] 'touches on' is less authoritative than 'addresses' for a serious topic like depression.
  - [old/addition/minor] 'often available' adds a qualifier ('often') that is not present in the original Russian text.
  - [old/style/minor] 'offering clear numbers' sounds slightly less natural than 'providing statistics'.

