# QA: слепое парное сравнение переводов — en-b3-achievements

- **Дата**: 2026-09-18T10:39:50.664Z
- **Метка**: en-b3-achievements
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/achievements.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 8b5b94950329db2cb35cf00c251ee0fc00dc888f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/achievements.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 9 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 3 | 0 / 0 | 100% |
| **итого** | 9 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 3 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×6; OLD — style/minor×10, style/major×5, terminology/minor×2

### Детали пар (для спот-чека)

#### 🟢 en `/exercise/description` — NEW лучше (2:0)

- **RU**: Статья обсуждает опасности зависимости от успеха, указывая на то, что достижения не гарантируют счастья и благополучия. Примеры знаменитостей, таких как Леди Гага и Джим Керри, иллюстрируют, что даже самые успешные люди могут страдать от депрессии и других про…
- **OLD**: The article discusses the dangers of being addicted to success, pointing out that achievements do not guarantee happiness and well-being. Examples of celebrities like Lady Gaga and Jim Carrey illustrate that even the most successful people can suffer from depr…
- **NEW**: This article discusses the dangers of being dependent on success, pointing out that achievements do not guarantee happiness or well-being. Examples of celebrities like Lady Gaga and Jim Carrey illustrate that even the most successful people can suffer from dep…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B sounds more natural and idiomatic for an English-speaking reader. It uses 'inherent worth' and 'challenges' which fit the tone better, and the sentence structure in the final part is more fluid than the heavy 'The importance of... are the key takeaways' in A.
  - [old/style/minor] The final sentence is grammatically heavy and slightly clunky due to the long subject-verb distance.
  - [old/style/minor] The phrase 'addicted to success' is okay, but 'dependent on success' (in B) or 'success addiction' is often smoother in this context; however, B's main advantage is the flow of the conclusion.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more idiomatic and flows better for a reader. Translation B uses 'addicted to success', which sounds slightly more clinical/extreme than the original 'зависимость' in this context, and its final sentence is grammatically heavy and clunky.
  - [old/style/major] The final sentence is a 'subject-verb distance' issue; the long subject makes the sentence feel heavy and unnatural for a summary.
  - [old/style/minor] The use of 'addicted to' is a bit more aggressive than the nuanced 'dependent on' or 'reliance on' implied by the Russian text.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: Любовь может вдохновлять, придавать сил и наполнять жизнь смыслом. Но если она превращается в потребность, без которой невозможно чувствовать себя полноценным, она начинает разрушать личность и мешать строить здоровые отношения. То же происходит и с зависимост…
- **OLD**: Love can inspire, give strength, and fill life with meaning. But when it turns into a need you can’t feel whole without, it starts to erode you and gets in the way of healthy relationships. The same thing happens with achievement addiction. Lasting happiness b…
- **NEW**: Love can inspire, empower, and give life meaning. But if it becomes a necessity—something you need just to feel whole—it can begin to erode your sense of self and hinder healthy relationships. The same applies to achievement addiction. True happiness is possib…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more sophisticated and idiomatic, using 'empower' and 'erode your sense of self' which fits the psychological context perfectly. Translation A is grammatically correct but feels slightly more literal and less polished.
  - [old/style/minor] The phrase 'give strength' is a bit plain compared to 'empower'; 'gets in the way' is slightly more colloquial than the more professional 'hinder'.
  - [old/style/minor] The structure 'a need you can't feel whole without' is a bit clunky compared to B's use of an em dash for emphasis.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A is much more idiomatic and polished, using sophisticated verbs like 'empower' and 'erode your sense of self' which fit the 'expert friend' tone perfectly. Translation B feels slightly more literal and clunky (e.g., 'it starts to erode you' is awkward and imprecise).
  - [old/style/major] The phrase 'it starts to erode you' is unnatural; 'erode your sense of self' or 'erode your personality' is the correct way to express this concept.
  - [old/style/minor] The phrasing 'a need you can’t feel whole without' is a bit heavy compared to the smoother 'something you need just to feel whole' in A.

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Еще один частый сценарий — отсутствующий родитель. Дети объясняют всё через себя. Если папа ушел, значит, я был недостаточно хорошим, а не потому, что взрослые не смогли договориться. Значит, если я стану успешным, умным, лучшим — он вернется или хотя бы пойме…
- **OLD**: Another common scenario is an absent parent. Children explain everything through themselves. If Dad left, it must mean I wasn’t good enough, not that the adults couldn’t work things out. So if I become successful, smart, the best, he’ll come back—or at least r…
- **NEW**: Another common scenario involves an absent parent. Children tend to internalize everything. Instead of seeing that the adults simply couldn't work things out, a child might think: "If Dad left, it must mean I wasn't good enough." They may believe that if they …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation B is much more idiomatic and psychologically accurate. Specifically, 'internalize everything' is the correct way to translate 'объясняют всё через себя' in a CBT context, whereas A's 'explain everything through themselves' is a literal calque. B also handles the flow and rhythm of the narrative much better.
  - [old/style/major] 'explain everything through themselves' is a non-idiomatic calque of the Russian phrase; 'internalize' is the natural English equivalent.
  - [old/style/minor] 'achievement addiction' is understandable but slightly clunky compared to B's flow.
  - [new/style/minor] The sentence structure in the second paragraph is slightly more complex than the original, but it improves readability for a native speaker.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is much more idiomatic and flows like a professional English article. Translation B contains several 'translationese' markers (e.g., 'explain everything through themselves') and awkward phrasing that sounds like a direct mirror of the Russian syntax.
  - [old/style/major] 'Children explain everything through themselves' is a literal calque of 'объясняют всё через себя' and is not idiomatic in English; 'internalize everything' in A is the correct psychological equivalent.
  - [old/style/major] 'childhood conclusions' is a weak choice for 'детские убеждения' (childhood beliefs).
  - [old/style/minor] 'achievement chasing' is less natural than 'achievement race' or 'rat race'.
  - [old/style/minor] 'an addiction of its own, keeping the obsession... going' is wordy and less impactful than A's 'fuels an obsession'.

#### 🟢 en `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Конечно, не стоит бросать все свои начинания или отказываться от важных целей, чтобы справиться с зависимостью от успеха. Ведь нет ничего плохого в том, чтобы иметь достижения. Прекрасно иметь деньги, работу, машину, квартиру и т.д. Проблемы начинаются тогда, …
- **OLD**: Of course, you shouldn't give up all your endeavors or abandon important goals to cope with addiction to success. After all, there is nothing wrong with having achievements. It’s wonderful to have money, a job, a car, an apartment, etc. Problems begin when you…
- **NEW**: Of course, you shouldn't abandon all your endeavors or give up on important goals to deal with achievement addiction. There is nothing wrong with having achievements. It's wonderful to have money, a job, a car, an apartment, and so on. Problems begin when, wit…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is significantly more idiomatic and flows like a professional English article. It avoids the 'translationese' and clunky structures present in B (e.g., 'receive positive emotions', 'know about difficulties firsthand'). A also correctly uses em dashes and follows the tone of a 'knowledgeable friend'.
  - [old/style/major] Phrasing like 'receive positive emotions from his work' and 'know about difficulties firsthand' sounds unnatural and translated.
  - [old/style/minor] Uses 'mental disorders' which is slightly more clinical/stiff than the preferred 'mental health struggles' in this context.
  - [old/style/minor] Punctuation: uses single quotes for the foundation name and lacks proper em dash spacing in some places.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation B is much more idiomatic and flows like a professional English article. It avoids the 'translationese' and clunky phrasing found in A (e.g., 'ride the roller coaster of self-esteem all your life' vs the more natural 'for the rest of your life', or 'work yourself to death' vs the more nuanced 'push yourself to the limit'). B also correctly uses 'mental health struggles' instead of the slightly more clinical 'mental disorders' used in A.
  - [old/style/minor] Phrasing like 'ride the roller coaster... all your life' and 'work yourself to death' sounds a bit more like a direct translation than a native text.
  - [old/terminology/minor] Used 'mental disorders' which is slightly more clinical/heavy than the preferred 'mental health struggles' in this context.
  - [new/style/minor] The phrase 'live through the lens of achievement' is a slight creative addition (transcreation), but it fits the high-quality narrative tone perfectly.

#### 🟡 en `/title`— вердикт неустойчив

- **RU**: Зависимость от достижений
- **OLD**: Achievement Addiction
- **NEW**: Achievement addiction
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A follows the sentence case rule for titles/headers as specified in the instructions, whereas Translation B uses Title Case which is less appropriate for a general header unless it's a specific product name.
  - [old/style/minor] Uses Title Case instead of sentence case for a header
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - In the context of a title or a section header, Title Case (A) is the standard for English-speaking markets, whereas sentence case (B) is less common for standalone headings.
  - [new/style/minor] Uses sentence case for a title, which is less conventional for a main heading in this context.

#### 🟢 en `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Подумайте, будете ли вы относиться к своему близкому человеку хуже только потому, что у него нет достижений?</h2> Представьте, вы встретились со своим другом, которого очень сильно цените. Но вдруг узнаете, что он обычный продавец в магазине, в то время ка…
- **OLD**: <h2>Think about whether you would treat your loved one worse just because they don't have achievements?</h2> Imagine you meet your friend, whom you value very much. But suddenly you find out that he is an ordinary shop assistant, while you own a business and a…
- **NEW**: <h2>Would you treat someone close to you poorly just because they haven't achieved much?</h2> Imagine you’re meeting a friend you deeply value. But suddenly, you find out they work as a simple shop assistant, while you own a business and are wealthy and succes…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B sounds much more natural and idiomatic, following the 'expert friend' tone. Translation A suffers from several 'translationese' markers and awkward phrasing.
  - [old/style/major] Phrases like 'placing him below yourself', 'the greatest nobodies', and 'the dependence on success' sound like direct translations from Russian and are not idiomatic English.
  - [old/style/minor] The question 'Think about whether...' is a bit heavy for a heading; B's 'Would you...' is more engaging.
  - [old/terminology/minor] Used 'frail' for 'немощных', which is okay, but 'aging' in B is more natural in this context.
  - [new/style/minor] The phrase 'But what about it?' is a slightly loose translation of 'Ну а что?', but it works in the flow.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is much more idiomatic and flows like a natural English article. Translation B suffers from heavy Russian-to-English calques (e.g., 'the greatest nobodies', 'the other way around', 'with or without millions') and awkward phrasing.
  - [old/style/major] Phrasing like 'the greatest nobodies' and 'the other way around' sounds unnatural/translated.
  - [old/style/minor] The question 'Will you look down on him...' should be 'Would you...' to match the conditional mood of the context.
  - [old/style/minor] The phrase 'with or without millions' is a clunky literal translation of 'с миллионом, что без'.
  - [old/style/minor] The use of 'exterminate' for 'истребить' is a bit too strong/violent for this context, though technically accurate; 'eliminate' or 'get rid of' is smoother.

#### 🟢 en `/exercise/screen_3/texts` — NEW лучше (2:0)

- **RU**: <h2>Учитесь находить баланс</h2> Нередко люди, зависимые от успеха, чувствуют вину за то, что позволяют себе отдыхать, проводить время с близкими, заниматься тем, что не связано напрямую с их целями. Безусловно, достижения имеют определённое значение в жизни, …
- **OLD**: <h2>Learn to find balance.</h2> People who are addicted to success often feel guilty for allowing themselves to rest, spend time with loved ones, or engage in activities that are not directly related to their goals. Undoubtedly, achievements have some signific…
- **NEW**: <h2>Learn to find balance</h2> People dependent on success often feel guilty for resting, spending time with loved ones, or engaging in activities that aren't directly related to their goals. Of course, achievements matter, but they aren't the most important t…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is a high-quality, idiomatic piece of writing that sounds like it was originally written in English. Translation B suffers from heavy 'translationese', literal calques (e.g., 'unpopular professions', 'scolding yourself', 'our tomorrow depends'), and awkward phrasing that violates the 'warm expert' tone.
  - [old/style/major] Many phrases are direct calques from Russian, such as 'unpopular professions' (instead of less glamorous), 'our tomorrow depends' (instead of our future), and 'scolding yourself' (instead of being hard on yourself).
  - [old/style/major] The tone is clunky and lacks the natural flow of a native speaker; for example, 'People who are addicted to success' is much heavier than 'People dependent on success'.
  - [old/terminology/minor] Used 'incomplete' for 'неполноценным', whereas 'inadequate' is the standard CBT-aligned term for this feeling.
  - [old/style/minor] Punctuation error: added periods to the H2 headers, which violates the sentence case/no-period rule for UI/headers.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more idiomatic and follows the 'understanding friend-expert' tone. It avoids the clunky, literal phrasing of A (e.g., 'scolding yourself', 'people of other unpopular professions') and uses natural English collocations ('less glamorous professions', 'being hard on yourself').
  - [old/style/major] Phrasing like 'people of other unpopular professions' and 'scolding yourself' sounds like a direct translation from Russian and is unnatural in English.
  - [old/style/minor] Uses 'incomplete' for 'неполноценным', whereas 'inadequate' (used in B) is the standard psychological term for this context.
  - [old/style/minor] The sentence 'You bet on success, but forget to live' is a bit abrupt/stilted compared to B's flow.

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: <h2>Ухудшение отношений</h2> Люди, зацикленные на достижениях, часто чувствуют одиночество — и это закономерно. На поддержание близких связей не остается ни времени, ни эмоциональных ресурсов. И отношения постепенно уходят на второй план. Партнер может начать …
- **OLD**: <h2>Relationships suffer</h2> People fixated on achievement often feel lonely—and that’s no coincidence. They have neither time nor emotional energy left to maintain close connections, so relationships gradually fade into the background. A partner may start lo…
- **NEW**: <h2>Strained relationships</h2> People obsessed with achievement often feel lonely—and that’s only natural. There is no time or emotional energy left to maintain close connections, so relationships gradually take a backseat. A partner might start seeking atten…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds much more natural and idiomatic for a mental health article. It uses better flow (e.g., 'fade into the background' vs 'take a backseat') and avoids the slightly clunky, textbook-like phrasing found in B (e.g., 'success does not equal happiness' or 'a person ends up chasing'). A also handles the Hemingway quote and the concluding emotional beats with much better rhythm.
  - [new/style/minor] Phrasing like 'success does not equal happiness' and 'a person ends up chasing' feels slightly more robotic/translated than A's 'success is not the same as happiness' and 'you find yourself chasing'.
  - [new/style/minor] The transition 'Additionally, a dependency on success...' is a bit heavy/formal for this warm, expert tone.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 94)
  - Translation A is more polished and uses more idiomatic, professional phrasing (e.g., 'take a backseat', 'takes a toll', 'fear of failure sets in'). Translation B is good but feels slightly more literal and less fluid in several places.
  - [old/style/minor] 'Relationships suffer' is a bit blunt for a heading compared to 'Strained relationships'.
  - [old/style/minor] 'desperate steps' is a bit of a calque; 'desperate measures' (as in A) is the standard idiom.

#### 🟡 en `/screen_1/texts`— вердикт неустойчив

- **RU**: Мы живем в эпоху «гонки за достижениями», где успех часто становится мерилом нашей ценности. Кажется, будто каждый может добиться всего, если достаточно постарается. Границ для амбиций нет, и это превращает жизнь в бесконечную гонку, где мы начинаем верить, чт…
- **OLD**: We live in an age of constant achievement chasing, where success often becomes the main measure of our worth. It can seem as if anyone can achieve anything, as long as they try hard enough. Ambition appears to have no limits, and life turns into an endless rac…
- **NEW**: We live in an era of the "achievement race," where success often becomes the yardstick for our self-worth. It feels as though anyone can achieve anything if they just try hard enough. Ambition can feel limitless, turning life into an endless race where we begi…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and captures the 'warm expert' tone much better. Its handling of the final paragraph ('Get an A—"Good job!"') is much more natural for an English reader than B's literal 'you're a star'. A also correctly uses the em dash with spaces as per instructions.
  - [new/style/minor] The translation of the final example ('you're a star') feels a bit cliché/dated compared to the more natural 'Good job!' in A.
  - [new/style/minor] The phrasing 'What does achievement addiction mean?' is slightly more clunky than A's 'What is achievement addiction?'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more idiomatic and maintains a better narrative flow. Translation B has several awkward phrasing issues (e.g., 'achievement chasing', 'shows up in people of all genders') and fails to capture the emotional nuance of the final example as effectively as A.
  - [old/style/minor] 'achievement chasing' is a bit clunky compared to 'achievement race' or 'obsession with achievement'.
  - [old/style/minor] 'shows up in people of all genders' sounds clinical/robotic; A's 'affects both men and women' is more natural for this tone.
  - [old/style/minor] The translation of the final example 'Get an A—"Good job!"' is a bit too literal/staccato compared to the smoother 'Get an A — you're a star' in A.
  - [old/omission/minor] In the 'kid next door' example, B uses 'they'd love me too', which is fine, but A's 'I would be loved too' stays closer to the passive/impersonal structure of the original without losing naturalness.

