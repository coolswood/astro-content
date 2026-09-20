# QA: слепое парное сравнение переводов — en-final-g1-distortions

- **Дата**: 2026-09-18T20:30:38.259Z
- **Метка**: en-final-g1-distortions
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: distortions.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## distortions.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 20 | 🟢 2 | 🔴 9 | ⚪ 0 | 🟡 9 | 0 / 0 | 18% |
| **итого** | 20 | 🟢 2 | 🔴 9 | ⚪ 0 | 🟡 9 | 0 / 0 | 18% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×24, style/major×2; OLD — style/minor×6, omission/minor×2, addition/minor×1, mistranslation/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/READ/dialogSummary`— вердикт неустойчив

- **RU**: В диалоге персонаж 1 делает вывод о настроении коллеги, основываясь на собственных предположениях. Персонаж 2 мягко напоминает, что без прямого разговора нельзя быть уверенным в мыслях и чувствах другого человека.
- **OLD**: In this dialogue, Character 1 infers a colleague’s feelings from assumptions. Character 2 gently reminds them that without a direct conversation, we can’t know what another person thinks or feels.
- **NEW**: In this dialogue, Character 1 draws a conclusion about a colleague’s mood based on their own assumptions. Character 2 gently reminds them that without a direct conversation, one cannot be certain of another person’s thoughts and feelings.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more precise and maintains the formal yet supportive tone of the original, accurately capturing 'mood' and 'assumptions'. Translation B is slightly too reductive and loses the nuance of 'making a conclusion' and 'being certain'.
  - [old/omission/minor] Missed 'mood' (translated as feelings) and 'conclusions' (translated as infers), which slightly changes the descriptive nature of the text.
  - [old/style/minor] The phrasing 'we can't know what another person thinks or feels' is a bit more colloquial/informal than the original's more structured observation.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is more natural and follows the 'understanding friend' tone, using 'we can't know' instead of the stiff, academic 'one cannot be certain'.
  - [new/style/minor] The use of 'one cannot' is too formal/academic for the target tone; 'draws a conclusion about a colleague's mood' is slightly wordy compared to 'infers a colleague's feelings'.
  - [new/style/minor] The phrasing 'be certain of another person's thoughts' is a bit heavy/clunky for a smooth narrative.

#### 🔴 en `/FILTER/textHTML` — OLD лучше (2:0)

- **RU**: <p>Мысленный фильтр — это когнитивное искажение, при котором мы замечаем в первую очередь негативные моменты и почти не обращаем внимания на положительные. Например, после неудачного интервью человек может сосредоточиться только на отказе, забывая о ценном опы…
- **OLD**: <p>Mental filtering is a cognitive distortion where we zero in on negatives and overlook positives. After an unsuccessful interview, for example, someone might focus only on the rejection, missing the useful experience and new insights that could help next tim…
- **NEW**: <p>Mental filtering is a cognitive distortion where we focus primarily on negative moments and pay almost no attention to the positive ones. For example, after an unsuccessful interview, a person might focus solely on the rejection, forgetting the valuable exp…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is much more idiomatic and flows like a professional English article. It avoids the clunky, repetitive structures of Translation A (e.g., 'negative moments and... positive ones') in favor of more natural phrasing ('zero in on negatives and overlook positives').
  - [new/style/minor] The phrase 'lead to feelings of dissatisfaction and lower your mood' is grammatically inconsistent, switching from 'feelings' (noun) to 'lower your mood' (verb phrase) in a way that feels slightly unpolished.
  - [new/style/minor] The text is a bit wordy and follows the Russian sentence structure too closely, making it feel like a translation rather than an original text.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 84)
  - Translation A is much more idiomatic and flows like a professional English article. It avoids the clunky, literal structures of Translation B (e.g., 'pay almost no attention to the positive ones' or 'it is helpful to practice') and uses more natural, concise phrasing ('zero in on', 'breed dissatisfaction').
  - [new/style/minor] Phrasing is slightly wordy and feels like a direct translation from Russian (e.g., 'pay almost no attention to', 'it is helpful to').
  - [new/style/minor] The shift from 'a person' to 'your mood' in the second paragraph is a slight inconsistency in perspective.

#### 🟡 en `/DUE/dialogSummary`— вердикт неустойчив

- **RU**: Персонаж 1 демонстрирует должествование, считая, что обязан работать без выходных, чтобы добиться успеха, ориентируясь на историю других людей. Персонаж 2 помогает ему взглянуть шире, напоминая, что у каждого свой путь, и баланс между трудом и отдыхом может бы…
- **OLD**: In this dialogue, Character 1 relies on “should” statements, believing they must work every day without breaks to succeed, inspired by others’ stories. Character 2 broadens the view, reminding them that everyone has a unique path and that balancing work and re…
- **NEW**: Character 1 demonstrates “should” statements, believing they must work without weekends to achieve success, based on other people’s stories. Character 2 helps them see the bigger picture, reminding them that everyone has their own path and that a balance betwe…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original structure and avoids unnecessary additions. Translation B adds 'In this dialogue,' which is an addition not present in the source.
  - [old/addition/minor] Added 'In this dialogue,' which is not in the original text.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is more idiomatic and flows better for a native reader. Translation B contains a clunky phrase 'work without weekends' and a literal translation of 'demonstrates' which sounds slightly unnatural in this context.
  - [new/style/minor] 'work without weekends' is a bit awkward; 'work without breaks' or 'work every day' is more natural.
  - [new/style/minor] 'demonstrates "should" statements' is grammatically correct but 'relies on' or 'uses' is more common in psychological descriptions.

#### 🔴 en `/LABEL/dialogSummary` — OLD лучше (2:0)

- **RU**: Персонаж 1 делает вывод о том, что человек — «плохой отец», увидев один эпизод, где тот кричит на детей. Персонаж 2 предлагает более взвешенный взгляд, напоминая, что одного наблюдения недостаточно, и что у людей могут быть разные проявления в разных ситуациях…
- **OLD**: Character 1 labels someone a “bad father” after witnessing one moment of him yelling at his children. Character 2 offers a more measured view, noting that a single observation isn’t enough and that people can show different sides in different situations.
- **NEW**: Character 1 concludes that a man is a “bad father” after seeing a single episode of him shouting at his children. Character 2 offers a more balanced perspective, reminding them that one observation isn’t enough and that people can behave differently in differe…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows better for a native speaker. 'Labels someone' is a much more natural way to describe the cognitive distortion of labeling than 'concludes that a man is'.
  - [new/style/minor] The phrase 'concludes that a man is' sounds slightly clunky and formal compared to the more natural 'labels someone'.
  - [new/style/minor] The use of 'reminding them' is slightly ambiguous in this context compared to the smoother flow of A.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B uses more idiomatic and precise vocabulary ('labels someone', 'measured view', 'show different sides') that fits the psychological context better than the more literal 'concludes' or 'balanced perspective' in A.
  - [new/style/minor] The phrasing 'concludes that a man is' is slightly clunky compared to the more natural 'labels someone' in B; 'balanced perspective' is fine but 'measured view' feels more sophisticated in this narrative context.

#### 🟡 en `/RESPONSE/dialog`— вердикт неустойчив

- **RU**: Я не прошёл собеседование. Наверное, я просто не способен справляться с важными задачами. Это не обязательно так. Возможно, у компании были свои специфические требования или кандидаты, которые лучше подходили именно под эту роль. Но каждый раз, когда что-то ва…
- **OLD**: I didn’t get the job. I’m probably not capable of handling important tasks. That’s not necessarily true. The company may have had very specific requirements or chose someone who was a better fit for that role. But whenever something important comes up, I mess …
- **NEW**: I didn’t pass the interview. I guess I’m just not capable of handling important tasks. That doesn’t have to be the case. Perhaps the company had specific requirements or candidates who were a better fit for that particular role. But every time something import…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 86)
  - Translation A sounds much more natural and idiomatic for a mental health context. It uses 'I didn’t get the job' and 'I mess it up', which perfectly capture the emotional tone of the original, whereas B feels slightly more formal and stiff.
  - [new/style/minor] 'I didn't pass the interview' is grammatically correct but 'I didn't get the job' is more common in natural speech; 'every time something important happens' is a bit clunky compared to 'whenever something important comes up'.
  - [new/style/minor] 'not link every situation' is a bit literal/stiff; 'not tie every outcome' (as in A) is more idiomatic.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 94)
  - Translation A is more faithful to the original structure and tone, maintaining the nuance of 'I fail' (я ошибаюсь) and 'not necessarily so' (это не обязательно так). Translation B is slightly more colloquial, which is fine, but 'I mess it up' is a bit more self-deprecating than the original, and it omits 'It is important to' in the final sentence.
  - [old/omission/minor] Omitted 'It is important to' (Важно) in the last sentence, turning it into a direct imperative.
  - [old/style/minor] 'I mess it up' is a slightly stronger/more informal shift from 'я ошибаюсь' than 'I fail'.

#### 🔴 en `/COMMON/dialog` — OLD лучше (2:0)

- **RU**: Не верится, я снова опоздал. Похоже, я всегда опаздываю и совсем не умею управлять временем. Постой, не спешите с выводом. Вспомните, сколько раз вы приходили вовремя. Одно опоздание не делает вас хронически непунктуальным. Но в последнее время это случается ч…
- **OLD**: I can’t believe it—I was late again. Looks like I’m always late and can’t manage my time at all. Hold on—don’t rush to that conclusion. Think of how many times you’ve arrived on time. One late arrival doesn’t make you chronically late. But lately it’s been hap…
- **NEW**: I can’t believe it, I’m late again. It seems like I’m always late and have no time management skills at all. Wait, don’t jump to conclusions. Remember how many times you’ve been on time. One instance of being late doesn’t make you chronically unpunctual. But i…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Translation A sounds much more natural and idiomatic for a supportive mental health context. Translation B uses clunky, textbook-like phrasing such as 'no time management skills' and 'chronically unpunctual', which feels stiff and non-native.
  - [new/style/major] The phrase 'have no time management skills at all' is too formal/clinical for a personal thought; 'can't manage my time' in A is much more natural.
  - [new/style/minor] 'Chronically unpunctual' is a heavy, awkward construction compared to 'chronically late'.
  - [new/style/minor] 'Isn't a personality trait' is a bit literal; 'doesn't define you' in A is a much better way to convey the sentiment in English.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more natural and idiomatic for a supportive mental health context. It avoids the slightly clunky 'personality trait' and 'instance of being late' used in A, opting for more fluid phrasing like 'doesn't define you'.
  - [new/style/minor] Phrasing like 'One instance of being late' and 'isn't a personality trait' feels a bit clinical and heavy compared to the warm tone required.
  - [new/other/minor] The first sentence 'I'm late again' implies the person is currently late, whereas the Russian 'опоздал' (past tense) and the context of reflection suggest it just happened.

#### 🔴 en `/MAYBE/textHTML` — OLD лучше (2:0)

- **RU**: <p>Искажение «Можно было бы» возникает, когда мы мысленно возвращаемся к прошлым событиям и представляем идеальные альтернативы, которые в реальности были недоступны. Мы начинаем размышлять в духе «что если бы» и создаём фантазии о том, как всё могло сложиться…
- **OLD**: <p>“If only” thinking is a cognitive distortion where we mentally revisit the past and imagine ideal alternatives that weren’t actually available. We slip into “what if” mode and spin fantasies about how things could have turned out differently.</p><p>It can a…
- **NEW**: <p>The “should have” distortion occurs when we mentally revisit past events and imagine ideal alternatives that were actually unavailable in reality. We start thinking in terms of “what if” and create fantasies about how things could have turned out differentl…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 86)
  - Translation A sounds much more natural and idiomatic, using engaging phrases like 'slip into... mode' and 'spin fantasies'. Translation B is grammatically correct but feels more like a literal translation with slightly clunky phrasing (e.g., 'unavailable in reality').
  - [new/style/minor] The phrasing 'unavailable in reality' is redundant and slightly heavy compared to 'weren't actually available'.
  - [new/style/minor] The sentence 'It is helpful to remember...' is a bit more formal/stiff than the warm, supportive tone required.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds much more natural and idiomatic for a mental health article. It uses engaging phrasing like 'slip into... mode' and 'spin fantasies' instead of the more literal and slightly repetitive 'start thinking' and 'create fantasies' found in A.
  - [new/style/minor] The phrasing 'actually unavailable in reality' is redundant (tautology); 'actually unavailable' or 'unavailable in reality' would suffice.

#### 🟡 en `/MAYBE/dialogSummary`— вердикт неустойчив

- **RU**: В диалоге персонаж 1 смотрит на экзамен через призму «можно было бы», обвиняя себя и обстоятельства. Персонаж 2 помогает мягко вернуть фокус в настоящее и будущее, напоминая, что важнее то, какие шаги можно сделать сейчас.
- **OLD**: In this dialogue, Character 1 views the exam through an “if only” lens, blaming themselves and the circumstances. Character 2 gently shifts the focus to the present and future, reminding them that what matters now is which steps to take next.
- **NEW**: In this dialogue, Character 1 views an exam through the lens of “what should have been,” blaming themselves and the circumstances. Character 2 helps gently shift the focus back to the present and the future, reminding them that the most important thing is the …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A captures the nuance of 'можно было бы' more accurately through the idiomatic 'what should have been', whereas B's 'if only' is slightly more dramatic/regretful. A also maintains the original structure more faithfully without losing the supportive tone.
  - [old/style/minor] The phrase 'which steps to take next' is a bit more abrupt than the original's emphasis on the importance of the steps themselves.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A uses the idiomatic 'if only' lens, which perfectly captures the essence of 'можно было бы' in a psychological context. Translation B is slightly more wordy and less natural.
  - [new/style/minor] The phrase 'the lens of what should have been' is a bit heavy compared to the more idiomatic 'if only lens'.
  - [new/style/minor] The phrasing 'the most important thing is the steps' is slightly clunkier than A's 'what matters now is which steps'.

#### 🔴 en `/COMMON/dialogSummary` — OLD лучше (2:0)

- **RU**: Персонаж 1 делает сверхобобщение из одного опоздания, приписывая себе хроническую несобранность. Персонаж 2 мягко возвращает фокус к фактам, напоминая о случаях пунктуальности и предлагая смотреть на ситуацию конкретнее.
- **OLD**: Character 1 overgeneralizes from being late once, labeling themselves as chronically disorganized. Character 2 gently brings the focus back to facts, reminding them of times they arrived on time and encouraging a more specific view of the situation.
- **NEW**: Character 1 overgeneralizes from a single instance of being late, attributing chronic disorganization to themselves. Character 2 gently brings the focus back to the facts, reminding them of times they were punctual and suggesting they look at the situation mor…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B is more idiomatic and concise, using 'labeling themselves' which sounds more natural in a psychological context than the wordier 'attributing... to themselves'. It also avoids the slightly clunky 'single instance of being late' in favor of a smoother flow.
  - [new/style/minor] The phrasing 'attributing chronic disorganization to themselves' is grammatically correct but feels slightly heavy and academic compared to the more natural 'labeling themselves' in B.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows better for a native speaker. Translation B is slightly more wordy and uses a more formal, clunky structure ('attributing... to themselves').
  - [new/style/minor] The phrase 'attributing chronic disorganization to themselves' is grammatically correct but feels heavy and less natural than 'labeling themselves' in this context.

#### 🟡 en `/READ/textHTML`— вердикт неустойчив

- **RU**: <p>Когнитивное искажение «чтение мыслей» возникает, когда мы предполагаем, что знаем, что думают или чувствуют другие люди, не имея реальных подтверждений. Мы опираемся не на факты, а на свои догадки, и нередко оказываемся в ловушке ошибочных выводов.</p><p>На…
- **OLD**: <p>Mind reading is a cognitive distortion where we assume we know what other people think or feel without real evidence. Instead of relying on facts, we default to guesses—and often draw the wrong conclusions.</p><p>For example, you might decide someone dislik…
- **NEW**: <p>The cognitive distortion known as “mind reading” occurs when we assume we know what others are thinking or feeling without any real evidence. We rely on guesswork rather than facts, and often find ourselves trapped by mistaken conclusions.</p><p>For example…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original structure and tone while maintaining a high level of naturalness. Translation B introduces unnecessary interpretations (e.g., 'based on a single cue') and uses slightly more academic/stiff vocabulary ('conjecture') that deviates from the 'understanding friend' tone.
  - [old/mistranslation/minor] Added 'based on a single cue' which is not in the original text.
  - [old/style/minor] The word 'conjecture' is a bit too formal/academic for the target tone compared to 'guesswork'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is much more idiomatic and flows like a professional English article. It avoids the repetitive 'we/we/we' structure and uses more sophisticated, natural vocabulary (e.g., 'default to guesses', 'grounded in facts', 'conjecture') compared to the slightly clunky and repetitive Translation B.
  - [new/style/minor] Repetitive use of 'we' and 'their' makes the rhythm heavy; 'incorrect assumptions' and 'guesswork' are a bit basic for a high-quality article.

#### 🔴 en `/MORE_MINE/textHTML` — OLD лучше (2:0)

- **RU**: <p>Искажение «преувеличение и преуменьшение» возникает, когда мы смотрим на события чрезмерно однобоко, упуская оттенки и детали. При преувеличении негативные моменты кажутся огромными и значимыми, словно под увеличительным стеклом. При преуменьшении же мы ума…
- **OLD**: <p>Magnification and minimization is a cognitive distortion where we view events in an overly one-sided way and lose nuance. With magnification, negative moments seem huge and significant, as if under a magnifying glass. With minimization, we downplay our stre…
- **NEW**: <p>The “magnification and minimization” distortion occurs when we look at events in an overly one-sided way, missing the nuances and details. With magnification, negative moments seem huge and significant, as if seen through a magnifying glass. With minimizati…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 84)
  - Translation A is much more idiomatic and flows like a professional English article. Translation B feels like a direct translation from Russian, using heavy, clunky structures like 'The “magnification and minimization” distortion occurs when...' and 'It is helpful to learn to...'.
  - [new/style/major] Heavy, wordy constructions (e.g., 'The distortion occurs when', 'It is helpful to learn to') that sound like a translation rather than natural English prose.
  - [new/style/minor] Repetitive use of 'mistakes' and 'strengths' in a way that lacks the rhythmic variety of A.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds much more natural and idiomatic for a mental health article. It avoids the slightly clunky 'The... distortion occurs' structure of A and uses more sophisticated, flowing vocabulary (e.g., 'overlooking', 'mindset', 'missteps').
  - [new/style/minor] The opening sentence is a bit heavy and follows the Russian syntax too closely ('The... distortion occurs when').
  - [new/style/minor] The phrase 'valuing the contributions you are already making' is a bit wordy compared to the more punchy B.

#### 🔴 en `/LABEL/dialog` — OLD лучше (2:0)

- **RU**: Я видел, как тот мужчина кричал на детей в парке. Он точно плохой отец. Сложно судить по одному моменту. Возможно, у него был тяжелый день или случилось что-то, что его выбило из равновесия. Я бы никогда так не стал вести себя со своими детьми. Кажется, он про…
- **OLD**: I saw that man yelling at his kids in the park. He’s definitely a bad father. It’s hard to judge based on one moment. Maybe he had a tough day or something happened that threw him off balance. I would never behave like that with my children. It seems like he j…
- **NEW**: I saw that man shouting at his kids in the park. He’s definitely a bad father. It’s hard to judge based on just one moment. Maybe he was having a hard day or something happened that threw him off balance. I would never act like that with my own children. It se…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B uses much more natural, idiomatic English for this context. 'Sweeping judgments' is a far superior collocation than 'categorical conclusions', and 'under stress' sounds more native than 'in stressful situations'.
  - [new/style/minor] 'Categorical conclusions' sounds slightly academic/stilted for a personal reflection; 'shouting' is fine but 'yelling' (in B) often fits the intensity of the scene better.
  - [new/style/minor] 'In stressful situations' is a bit wordy compared to the more concise 'under stress'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and idiomatic for a native speaker. Translation B uses 'Categorical conclusions', which is a heavy, literal translation of the Russian 'Категоричные выводы', whereas 'Sweeping judgments' is the standard English equivalent in this context.
  - [new/style/minor] 'Categorical conclusions' sounds slightly academic/clunky compared to 'Sweeping judgments'.
  - [new/style/minor] 'In stressful situations' is fine, but 'under stress' (as in A) is more idiomatic for this narrative tone.

#### 🟡 en `/READ/dialog`— вердикт неустойчив

- **RU**: Мария вчера не поздоровалась со мной в офисе. Наверное, она злится на меня за опоздание на совещание. А вы уверены? Возможно, она была занята или просто не заметила вас. Вы пробовали спросить? Нет, я не спрашивал. Но что-то подсказывает, что дело именно в этом…
- **OLD**: Maria didn’t say hello to me at the office yesterday. She’s probably angry because I was late to the meeting. Are you sure? Maybe she was busy or simply didn’t see you. Have you tried asking? No, I haven’t. I just have a feeling that’s it. We can’t know what s…
- **NEW**: Maria didn’t say hello to me in the office yesterday. She’s probably angry with me because I was late for the meeting. Are you sure? Maybe she was just busy or didn’t notice you. Have you tried asking her? No, I didn’t ask. But something tells me that’s exactl…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows naturally. Translation B contains slight clunkiness ('angry with me because I was late for the meeting') and a tense inconsistency in the final sentence ('might have had... that have nothing to do with you').
  - [new/style/minor] The phrase 'angry with me because I was late for the meeting' is slightly wordy compared to the more natural 'angry because I was late to the meeting'.
  - [new/style/minor] Tense mismatch in the last sentence: 'might have had (past) ... that have (present) nothing to do with you' is less smooth than A's consistent structure.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more natural and flows better as a dialogue. Translation B feels slightly fragmented and uses less idiomatic phrasing in the key emotional beats.
  - [old/style/minor] The phrase 'I just have a feeling that's it' is a bit weak compared to the more idiomatic 'something tells me' in A.
  - [old/style/minor] The transition 'No, I haven't' is grammatically okay but sounds slightly more formal/stiff in this conversational context than 'No, I didn't ask'.

#### 🟡 en `/MAYBE/dialog`— вердикт неустойчив

- **RU**: Я провалил экзамен. Надо было больше учиться. Но ты ведь работал каждый день и старался изо всех сил. Ты действовал в тех условиях, которые были. Да, но учился бы больше, если бы не работа. Прошлое уже не поменять. Сейчас важнее подумать, как поддержать себя и…
- **OLD**: I failed the exam. I should have studied more. But you were working every day and doing your best. You acted within your circumstances. Yes, but I would have studied more if it weren’t for work. We can’t change the past. What matters now is how to support your…
- **NEW**: I failed the exam. I should have studied more. But you worked every day and did your absolute best. You acted within the circumstances you had. Yes, but I would have studied more if I didn’t have to work. You can’t change the past. Right now, it’s more importa…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and empathetic, using 'What matters now' which flows better than the slightly clunky 'it's more important to think about' in B. A also correctly captures the nuance of 'if it weren't for work' as a smoother way to express the condition.
  - [new/style/minor] The phrasing 'it's more important to think about' is a bit wordy and less impactful than 'What matters now'.
  - [new/style/minor] The transition 'Right now' is slightly more heavy-handed than the seamless 'What matters now' in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and follows the original's perspective more accurately. Translation B makes an unnecessary shift from 'You' to 'We' in the final paragraph and uses a slightly more clunky structure in the second paragraph.
  - [old/mistranslation/major] The original says 'Прошлое уже не поменять' (The past can't be changed), which is a general statement. B changes this to 'We can't change the past', which shifts the focus to a collective 'we' not present in the source.
  - [old/style/minor] The use of Past Continuous ('were working and doing') is grammatically fine but feels slightly less direct and punchy than the simple past used in A for this context.

#### 🟡 en `/DISCVAL/dialogSummary`— вердикт неустойчив

- **RU**: Персонаж 1 получает повышение, но обесценивает этот успех, фокусируясь на предстоящих трудностях. Персонаж 2 мягко напоминает о важности достижения и поддерживает его, подчеркивая значимость этого шага в карьере.
- **OLD**: Character 1 gets a promotion but discounts the achievement by focusing on the challenges ahead. Character 2 gently highlights the accomplishment and offers support, emphasizing how meaningful this step is for their career.
- **NEW**: Character 1 receives a promotion but discounts this success by focusing on the upcoming challenges. Character 2 gently reminds them of the importance of the achievement and supports them, emphasizing the significance of this step in their career.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more faithful to the original structure and terminology, specifically using 'importance of the achievement' which mirrors the source more accurately than B's 'highlights the accomplishment'.
  - [old/style/minor] 
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A is more idiomatic and flows better, using 'highlights the accomplishment' which sounds more natural in a narrative context than the repetitive 'reminds them of the importance' in B. Translation A also avoids the slightly clunky 'upcoming challenges' in favor of the smoother 'challenges ahead'.
  - [new/style/minor] The phrasing 'reminds them of the importance of the achievement' is a bit wordy and heavy compared to the more elegant 'highlights the accomplishment'.
  - [new/style/minor] The repetition of 'achievement' and 'significance' makes the rhythm feel slightly more mechanical than A.

#### 🟢 en `/EMO/dialogSummary` — NEW лучше (2:0)

- **RU**: В этом диалоге персонаж 1 принимает решение, основываясь исключительно на грусти и неуверенности, отказываясь от свидания. Персонаж 2 мягко помогает взглянуть шире и допускает возможность, что реальный опыт может быть гораздо приятнее, чем подсказывает текущее…
- **OLD**: In this dialogue, Character 1 bases a decision solely on sadness and insecurity, turning down a date. Character 2 broadens the perspective, noting that the actual experience could be much more pleasant than their current mood suggests.
- **NEW**: In this dialogue, Character 1 makes a decision based entirely on sadness and insecurity, declining a date. Character 2 gently helps them see the bigger picture and suggests that the actual experience might be much more pleasant than their current mood suggests…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is much more natural and captures the 'gentle' tone of the original. It uses the idiomatic 'see the bigger picture' instead of the clunky 'broadens the perspective'.
  - [old/style/minor] The phrase 'broadens the perspective' sounds a bit academic/stilted compared to the original's warm tone.
  - [old/omission/minor] Missing the word 'softly/gently' (мягко) which is important for the tone of the interaction.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more idiomatic and captures the 'supportive friend' tone of the original perfectly. Translation B is slightly more clinical and loses the nuance of 'helping' the character.
  - [old/style/minor] The phrase 'broadens the perspective' is a bit stiff/academic compared to the warmer 'gently helps them see the bigger picture'.
  - [old/omission/minor] The nuance of 'softly/gently helping' (мягко помогает) is lost, making the interaction sound more like a lecture than support.

#### 🔴 en `/CATASTROPHIZATION/dialog` — OLD лучше (2:0)

- **RU**: Мне отказали на собеседовании. Все, теперь я никогда не найду работу и останусь без дела. Но ведь ты отправила резюме еще на несколько вакансий, верно? Да, но какой смысл? Если не взяли сюда, значит, я никому не нужна. Все попытки просто бессмысленны. Такой же…
- **OLD**: I didn’t get the job. That’s it—I’ll never find work and I’ll end up with nothing. But you applied to several other openings too, right? Yes, but what’s the point? If I wasn’t chosen here, it means no one needs me. Any effort is pointless. That harsh conclusio…
- **NEW**: I was rejected at the interview. That’s it—now I’ll never find a job and I'll be without work forever. But you sent your resume to several other vacancies, right? Yes, but what’s the point? If they didn’t take me here, it means nobody wants me. All my efforts …
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation B sounds much more natural and idiomatic for a dialogue. Translation A uses slightly clunky phrasing like 'rejected at the interview' and 'without work forever', whereas B uses common conversational expressions like 'I didn't get the job' and 'end up with nothing'.
  - [new/style/minor] Phrasing like 'rejected at the interview' and 'without work forever' feels a bit heavy and less like natural spoken English compared to B.
  - [new/style/minor] The phrase 'increase your distress' is grammatically correct but 'intensify' (used in B) is more idiomatic in a psychological context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A sounds much more natural and idiomatic for a dialogue. Translation B uses heavy, clunky phrasing like 'rejected at the interview' and 'sent your resume to several other vacancies', which feels like a direct translation from Russian rather than natural English.
  - [new/style/major] Phrasing like 'rejected at the interview' and 'sent your resume to several other vacancies' is overly formal and unnatural for a personal conversation.
  - [new/style/minor] The phrase 'how can I not think about the failure' is grammatically awkward; 'how do I stop thinking about failure' (as in A) is much better.

#### 🟢 en `/MORE_MINE/dialogSummary` — NEW лучше (2:0)

- **RU**: В диалоге персонаж 1 преувеличивает свою неловкость перед интервью, а персонаж 2 мягко помогает вернуть фокус на сильные стороны и способности, поддерживая более сбалансированный взгляд.
- **OLD**: In this dialogue, Character 1 magnifies their awkwardness before an interview, while Character 2 gently redirects attention to their strengths and abilities, supporting a more balanced view.
- **NEW**: In this dialogue, Character 1 exaggerates their awkwardness during an interview, while Character 2 gently helps them refocus on their strengths and abilities, supporting a more balanced view.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more natural and idiomatic; 'exaggerates' is the standard way to describe overstating a feeling, whereas 'magnifies' sounds slightly more clinical or literal. 'Refocus' is also a smoother, more common UX/narrative choice than 'redirects attention'.
  - [old/style/minor] 'Magnifies' is a bit heavy/unnatural for describing social awkwardness; 'redirects attention' is slightly wordier than 'refocus'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B uses 'refocus', which is more idiomatic and natural in a psychological context than 'redirects attention'. It also correctly captures the nuance of 'перед интервью' as 'during an interview' (the context of the awkwardness) or 'before an interview', but 'refocus' makes the flow much smoother.
  - [old/style/minor] 'magnifies' is slightly more formal/literary than 'exaggerates' in this context, and 'redirects attention' is a bit wordy compared to 'refocus'.

#### 🟡 en `/EMO/dialog`— вердикт неустойчив

- **RU**: Я не хочу идти на свидание. У меня плохое настроение. Но ведь тебе нравился этот человек. Может, дашь себе шанс и посмотришь, как всё пройдет? Чувствую себя неуверенно и неловко. Уверена, что только всё испорчу. Ты не можешь знать заранее. Встреча может оказат…
- **OLD**: I don’t want to go on the date. I’m in a bad mood. But you like this person. Maybe give yourself a chance and see how it goes? I feel insecure and awkward. I’m sure I’ll just mess everything up. You can’t know that in advance. The date could be enjoyable and s…
- **NEW**: I don’t want to go on a date. I’m in a bad mood. But you liked this person. Maybe give yourself a chance and see how it goes? I feel insecure and awkward. I’m sure I’ll just ruin everything. You can’t know in advance. The meeting could turn out to be pleasant …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A is more natural and consistent with the context of a date. Translation B uses 'the meeting', which sounds too formal/business-like for a romantic context, and 'ruin everything' is slightly heavier than the conversational 'mess everything up'.
  - [new/style/minor] 'The meeting' sounds like a business appointment rather than a date.
  - [new/style/minor] 'Ruin everything' is a bit more dramatic/heavy than the original 'испорчу' in this casual context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more accurate to the original tense and context. Translation B incorrectly changes 'liked' (past) to 'like' (present) and uses 'the date' instead of 'a date', which changes the nuance of a specific upcoming event.
  - [old/mistranslation/major] Changed 'liked' (past) to 'like' (present), which alters the logic of the argument.
  - [old/style/minor] Using 'the date' implies a specific date already discussed, whereas 'a date' is more natural for a general reluctance.

#### 🔴 en `/DISCVAL/dialog` — OLD лучше (2:0)

- **RU**: Меня повысили, теперь буду вести новые проекты. Это замечательная новость, поздравляю! Какие проекты тебе предстоит вести? Проекты сложные, работы будет много. Чувствую, будто на меня просто навесили дополнительные обязанности. Это правда может быть вызовом, н…
- **OLD**: I got promoted—I’ll be leading new projects. That’s wonderful news—congratulations! What projects will you be taking on? They’re challenging, and there’ll be a lot of work. It feels like they just piled extra responsibilities on me. It may be a real challenge,…
- **NEW**: I got promoted; now I’ll be leading new projects. That’s wonderful news, congratulations! What kind of projects will you be leading? The projects are difficult, and there will be a lot of work. I feel like they’ve just piled more responsibilities on me. It cer…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A sounds much more natural and idiomatic for a supportive conversation. The use of em dashes and the phrase 'taking on' instead of the repetitive 'leading' makes the dialogue flow better.
  - [new/style/minor] The use of a semicolon in the first sentence is a bit formal for a casual chat; 'The projects are difficult' sounds slightly clunky compared to 'They're challenging'.
  - [new/style/minor] Repetition of 'leading' in the second turn makes the dialogue feel less dynamic.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B sounds more natural and idiomatic for a supportive conversation. The use of em dashes and contractions creates a better flow, and 'taking on' is a more natural way to discuss projects than the repetitive 'leading' used in A.
  - [new/style/minor] Repetitive use of 'leading' in the second line makes it feel slightly less organic.
  - [new/style/minor] The semicolon in the first sentence is grammatically correct but feels a bit formal for a casual chat.

