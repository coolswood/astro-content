# QA: слепое парное сравнение переводов — en-b3-verif-achievements

- **Дата**: 2026-09-18T10:54:19.361Z
- **Метка**: en-b3-verif-achievements
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD~1
- **Файлы**: story/distortions/achievements.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 7
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: a4b1791ebbc7f608e45e9add25437bef463f001c

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/achievements.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 9 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 3 | 0 / 0 | 100% |
| **итого** | 9 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 3 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×4, omission/major×1; OLD — style/minor×14, style/major×4, terminology/minor×2

### Детали пар (для спот-чека)

#### 🟢 en `/exercise/screen_3/texts` — NEW лучше (2:0)

- **RU**: <h2>Учитесь находить баланс</h2> Нередко люди, зависимые от успеха, чувствуют вину за то, что позволяют себе отдыхать, проводить время с близкими, заниматься тем, что не связано напрямую с их целями. Безусловно, достижения имеют определённое значение в жизни, …
- **OLD**: <h2>Learn to find balance.</h2> People who are addicted to success often feel guilty for allowing themselves to rest, spend time with loved ones, or engage in activities that are not directly related to their goals. Undoubtedly, achievements have some signific…
- **NEW**: <h2>Learn to find balance</h2> People dependent on success often feel guilty for resting, spending time with loved ones, or engaging in activities that aren't directly related to their goals. Of course, achievements matter, but they aren't the most important t…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is a high-quality, idiomatic piece of writing that sounds like it was originally written in English. Translation B suffers from heavy 'translationese,' using awkward calques like 'unpopular professions,' 'scolding yourself,' and 'on whom our tomorrow depends.'
  - [old/style/major] Many phrases are literal translations of Russian structures (e.g., 'unpopular professions' instead of 'less glamorous,' 'on whom our tomorrow depends' instead of 'upon whom our future depends').
  - [old/terminology/minor] Used 'incomplete' for 'неполноценным,' whereas 'inadequate' is the standard CBT term for this feeling.
  - [old/style/minor] The phrase 'with all your might' is too dramatic/physical for the context of self-care; 'as best as you can' is much more natural.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more idiomatic and follows the 'understanding friend-expert' tone. It avoids the clunky, literal phrasing of A (e.g., 'scolding yourself', 'people of other unpopular professions') and uses natural English collocations ('less glamorous professions', 'being hard on yourself').
  - [old/style/major] Phrasing is too literal and 'translation-ese' (e.g., 'people of other unpopular professions', 'scolding yourself', 'by far not the most important').
  - [old/terminology/minor] Used 'incomplete' for 'неполноценным', whereas 'inadequate' (used in B) is the standard CBT-adjacent term for feeling less than others.
  - [new/style/minor] The translation of 'просто хорошо жить' as 'make life better just by being there' is a slight creative departure, but it captures the spirit much better than the literal 'good to live with'.

#### 🟢 en `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Подумайте, будете ли вы относиться к своему близкому человеку хуже только потому, что у него нет достижений?</h2> Представьте, вы встретились со своим другом, которого очень сильно цените. Но вдруг узнаете, что он обычный продавец в магазине, в то время ка…
- **OLD**: <h2>Think about whether you would treat your loved one worse just because they don't have achievements?</h2> Imagine you meet your friend, whom you value very much. But suddenly you find out that he is an ordinary shop assistant, while you own a business and a…
- **NEW**: <h2>Would you treat someone close to you poorly just because they haven't achieved much?</h2> Imagine you’re meeting a friend you deeply value. But suddenly, you find out they work as a simple shop assistant, while you own a business and are wealthy and succes…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation B sounds much more natural and idiomatic, following the 'expert friend' tone. Translation A suffers from several 'translationese' markers and clunky phrasing (e.g., 'placing him below yourself', 'unit of value').
  - [old/style/major] Phrasing like 'placing him below yourself' and 'unit of value' is very literal and sounds unnatural in English.
  - [old/style/minor] The use of 'Will you...' in the first heading is grammatically okay but less idiomatic for a hypothetical question than 'Would you...'.
  - [old/terminology/minor] The translation of 'ничтожества' as 'nobodies' is okay, but the flow of the paragraph is heavy.
  - [new/style/minor] The phrase 'worthless beings' is slightly stronger than 'ничтожества', but fits the rhetorical weight of the text.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is much more idiomatic and flows like a professional English article. Translation B contains several 'Russianisms' (calques), such as 'treat your loved one worse' instead of 'treat someone close to you poorly', and 'the greatest nobodies', which sounds unnatural. A also correctly uses gender-neutral 'they' for the friend, whereas B switches between 'he' and 'they'.
  - [old/style/major] Heavy use of calques from Russian (e.g., 'treat your loved one worse', 'the greatest nobodies', 'the other way around' used as a sentence starter).
  - [old/style/minor] Grammar/Naturalness: 'Will you look down on him' should be 'Would you' to match the conditional mood of the context.
  - [old/omission/minor] The Instagram ID was changed/incorrect in B.

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: <h2>Ухудшение отношений</h2> Люди, зацикленные на достижениях, часто чувствуют одиночество — и это закономерно. На поддержание близких связей не остается ни времени, ни эмоциональных ресурсов. И отношения постепенно уходят на второй план. Партнер может начать …
- **OLD**: <h2>Relationships suffer</h2> People fixated on achievement often feel lonely—and that’s no coincidence. They have neither time nor emotional energy left to maintain close connections, so relationships gradually fade into the background. A partner may start lo…
- **NEW**: <h2>Strained relationships</h2> People obsessed with achievement often feel lonely—and that’s only natural. There is no time or emotional energy left to maintain close connections, so relationships gradually take a backseat. A partner might start seeking atten…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more polished and idiomatic, particularly in its use of 'take a backseat' and 'takes a toll', which sound much more natural for a high-quality article. Translation B has a few clunky spots like 'desperate steps' (instead of 'measures') and 'achievements dependence' (which is a heavy noun pile).
  - [old/style/minor] 'Achievement dependence' is a bit clunky; 'dependency on success' in A is smoother.
  - [old/style/minor] 'Desperate steps' is a literal translation of 'отчаянные шаги'; 'desperate measures' is the standard English idiom.
  - [old/style/minor] 'Losing your sense of self-worth' is slightly wordier than the punchy 'Loss of self-worth' in A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more like a polished, professional article written by a native speaker. It uses more natural idioms (e.g., 'fade into the background', 'fall short', 'the thrill of victory') and maintains a better flow. Translation B is grammatically correct but feels slightly more 'translated' and uses more repetitive or clunky structures (e.g., 'success does not equal happiness' is a bit too literal/mathematical compared to 'success is not the same as happiness').
  - [new/style/minor] The phrasing 'success does not equal happiness' is a bit stiff for a supportive article; 'is not the same as' is more natural.

#### 🟢 en `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Конечно, не стоит бросать все свои начинания или отказываться от важных целей, чтобы справиться с зависимостью от успеха. Ведь нет ничего плохого в том, чтобы иметь достижения. Прекрасно иметь деньги, работу, машину, квартиру и т.д. Проблемы начинаются тогда, …
- **OLD**: Of course, you shouldn't give up all your endeavors or abandon important goals to cope with addiction to success. After all, there is nothing wrong with having achievements. It’s wonderful to have money, a job, a car, an apartment, etc. Problems begin when you…
- **NEW**: Of course, you shouldn't abandon all your endeavors or give up on important goals to deal with achievement addiction. There is nothing wrong with having achievements. It's wonderful to have money, a job, a car, an apartment, and so on. Problems begin when, wit…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more idiomatic and flows like a professional English article. It avoids the 'translationese' and clunky structures found in B (e.g., 'receive positive emotions', 'know about difficulties firsthand'). A also correctly uses 'mental health struggles' instead of the slightly more clinical/dated 'mental disorders' used in B.
  - [old/style/major] Phrasing like 'receive positive emotions from his work' and 'know about difficulties firsthand' sounds unnatural/translated.
  - [old/style/minor] The use of 'mental disorders' is less warm and supportive than 'mental health struggles' in a wellness context.
  - [old/style/minor] Punctuation in headers: B includes a period in the H2 tag, which is non-standard for titles/headers.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 84 / NEW 95)
  - Translation B is much more idiomatic and flows like a professional English article. It avoids the clunky, literal phrasing found in A (e.g., 'work yourself to death' vs 'push yourself to the limit', 'mental disorders' vs 'mental health struggles') and uses better collocations for a mental health context.
  - [old/style/major] Phrasing like 'work yourself to death' is too literal/dramatic; 'mental disorders' sounds more clinical/stigmatizing than the preferred 'mental health struggles'.
  - [old/style/minor] The translation of the Lady Gaga quote is slightly less natural than B's version.
  - [old/style/minor] Uses 'etc.' which is a bit dry for a supportive article; 'and so on' or similar is often smoother, though B's approach is also fine.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: Любовь может вдохновлять, придавать сил и наполнять жизнь смыслом. Но если она превращается в потребность, без которой невозможно чувствовать себя полноценным, она начинает разрушать личность и мешать строить здоровые отношения. То же происходит и с зависимост…
- **OLD**: Love can inspire, give strength, and fill life with meaning. But when it turns into a need you can’t feel whole without, it starts to erode you and gets in the way of healthy relationships. The same thing happens with achievement addiction. Lasting happiness b…
- **NEW**: Love can inspire, empower, and give life meaning. But if it becomes a necessity—something you need just to feel whole—it can begin to erode your sense of self and hinder healthy relationships. The same applies to achievement addiction. True happiness is possib…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A is much more idiomatic and sophisticated, using 'empower' and 'erode your sense of self' which perfectly capture the psychological nuance. Translation B feels slightly more literal and clunky, especially with phrases like 'it starts to erode you' and 'the same thing happens'.
  - [old/style/minor] The phrase 'it starts to erode you' is a bit too blunt/vague compared to the more precise 'erode your sense of self'.
  - [old/style/minor] The flow of 'The same thing happens with...' is more conversational/informal than the polished 'The same applies to...' in A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more sophisticated and idiomatic, using 'empower' and 'erode your sense of self' which perfectly captures the psychological nuance of the original. Translation A is grammatically correct but feels slightly more repetitive and less polished.
  - [old/style/minor] The phrase 'it starts to erode you' is a bit blunt compared to the more professional 'erode your sense of self' in B.

#### 🟢 en `/exercise/description` — NEW лучше (2:0)

- **RU**: Статья обсуждает опасности зависимости от успеха, указывая на то, что достижения не гарантируют счастья и благополучия. Примеры знаменитостей, таких как Леди Гага и Джим Керри, иллюстрируют, что даже самые успешные люди могут страдать от депрессии и других про…
- **OLD**: The article discusses the dangers of being addicted to success, pointing out that achievements do not guarantee happiness and well-being. Examples of celebrities like Lady Gaga and Jim Carrey illustrate that even the most successful people can suffer from depr…
- **NEW**: This article discusses the dangers of being dependent on success, pointing out that achievements do not guarantee happiness or well-being. Examples of celebrities like Lady Gaga and Jim Carrey illustrate that even the most successful people can suffer from dep…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A flows much more naturally for a native reader, using 'inherent worth' and 'challenges' which fit the supportive tone better. Translation B feels slightly more literal and heavy, particularly with the phrasing 'the importance... are the key takeaways'.
  - [old/style/minor] The sentence structure 'The importance... are the key takeaways' is grammatically clunky and heavy.
  - [old/style/minor] Using 'addicted to success' is a bit more aggressive/clinical than the softer 'dependent on success' in this context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B sounds more natural and idiomatic for an English-speaking reader. It uses 'inherent worth' and 'challenges' which fit the tone better, and the sentence structure in the final part is much smoother than the heavy, passive construction in A.
  - [old/style/minor] The final sentence is grammatically heavy and feels like a direct translation of the Russian structure ('The importance... are the key takeaways').
  - [old/style/minor] The phrase 'addicted to success' is okay, but 'dependent on success' or 'success addiction' is often more nuanced in psychological contexts, though 'addicted' is acceptable.

#### 🟡 en `/screen_1/texts`— вердикт неустойчив

- **RU**: Мы живем в эпоху «гонки за достижениями», где успех часто становится мерилом нашей ценности. Кажется, будто каждый может добиться всего, если достаточно постарается. Границ для амбиций нет, и это превращает жизнь в бесконечную гонку, где мы начинаем верить, чт…
- **OLD**: We live in an age of constant achievement chasing, where success often becomes the main measure of our worth. It can seem as if anyone can achieve anything, as long as they try hard enough. Ambition appears to have no limits, and life turns into an endless rac…
- **NEW**: We live in an era of the "achievement race," where success often becomes the yardstick for our self-worth. It feels as though anyone can achieve anything if they just try hard enough. Ambition can feel limitless, turning life into an endless race where we begi…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and captures the 'expert friend' tone much better. It uses natural phrasing like 'achievement chasing' and 'make sense of this'. Translation B feels slightly more formal/stiff and has a minor error in the Instagram ID.
  - [new/omission/major] The Instagram ID was changed from 18074617231661593 to 17888010906192468 (though this was in A, B's ID is actually the correct one from the original, but A's flow is better overall. Wait, looking closer: A has a different ID, B has the correct ID. However, A's linguistic quality is superior).
  - [new/style/minor] Phrasing like 'What does achievement addiction mean?' is a bit clunky compared to 'What is achievement addiction?'
  - [new/style/minor] The ending 'you're a star' is a bit too colloquial/different from the original 'молодец' (good job) compared to A's more balanced approach.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation A is more idiomatic and maintains a consistent, professional yet warm tone. Translation B has several stylistic issues: it uses 'loser' (too informal/slangy for this context), 'shows up in people of all genders' (clunky/unnatural), and 'they'd love me too' (vague pronoun reference). A's handling of the 'Get an A' section is also more natural.
  - [old/style/minor] The phrase 'shows up in people of all genders' is unnatural; 'affects both men and women' is better.
  - [old/style/minor] 'loser' is a bit too colloquial/slangy compared to the psychological tone of the text.
  - [old/style/minor] The translation of the 'Get an A' part is slightly disjointed compared to A's smoother flow.

#### 🟡 en `/title`— вердикт неустойчив

- **RU**: Зависимость от достижений
- **OLD**: Achievement Addiction
- **NEW**: Achievement addiction
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - In the context of a title or a section heading, Title Case (A) is the standard professional convention for English, whereas sentence case (B) is typically reserved for UI labels or body text.
  - [new/style/minor] Uses sentence case for a title, which is less common for headings in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A follows the sentence case rule for titles/headers, whereas Translation B uses Title Case, which is not the standard for this project's UI/headers.
  - [old/style/minor] Uses Title Case instead of sentence case

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Еще один частый сценарий — отсутствующий родитель. Дети объясняют всё через себя. Если папа ушел, значит, я был недостаточно хорошим, а не потому, что взрослые не смогли договориться. Значит, если я стану успешным, умным, лучшим — он вернется или хотя бы пойме…
- **OLD**: Another common scenario is an absent parent. Children explain everything through themselves. If Dad left, it must mean I wasn’t good enough, not that the adults couldn’t work things out. So if I become successful, smart, the best, he’ll come back—or at least r…
- **NEW**: Another common scenario involves an absent parent. Children tend to internalize everything. Instead of seeing that the adults simply couldn't work things out, a child might think: "If Dad left, it must mean I wasn't good enough." They may believe that if they …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is much more idiomatic and flows like a professional English article. Translation B contains several 'translationese' markers (e.g., 'explain everything through themselves', 'add to your value') that sound unnatural to a native speaker.
  - [old/style/major] The phrase 'Children explain everything through themselves' is a direct calque of the Russian 'объясняют всё через себя' and is not idiomatic in English; 'internalize everything' in A is a much better way to convey this psychological concept.
  - [old/style/minor] 'add to your value' is slightly awkward compared to 'adds more value'.
  - [old/style/minor] 'achievement chasing' is less natural than 'achievement race' or 'the race for achievement'.
  - [old/style/minor] 'an addiction of its own, keeping the obsession... going' is wordy and less impactful than A's 'an addiction that fuels an obsession'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Translation B is much more idiomatic and psychologically sound. Specifically, it correctly uses 'internalize' for 'объясняют всё через себя', whereas A uses a clunky literal translation. B also handles the flow of the 'If Dad left...' paragraph much more naturally for an English reader.
  - [old/style/major] The phrase 'Children explain everything through themselves' is a heavy calque; 'internalize everything' is the correct psychological term.
  - [old/style/minor] The second paragraph in A is a bit choppy and follows the Russian sentence structure too closely.
  - [new/style/minor] The phrase 'Rest is perceived as weakness' is slightly more formal/passive than the original, but fits the narrative tone.

