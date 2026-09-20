# QA: слепое парное сравнение переводов — en-final-g23-intermediate

- **Дата**: 2026-09-18T20:44:11.724Z
- **Метка**: en-final-g23-intermediate
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/intermediate.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/intermediate.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 7 | 🟢 3 | 🔴 1 | ⚪ 0 | 🟡 3 | 0 / 1 | 75% |
| **итого** | 7 | 🟢 3 | 🔴 1 | ⚪ 0 | 🟡 3 | 0 / 1 | 75% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×3, terminology/minor×1, omission/minor×1, style/major×1; OLD — style/minor×4, omission/critical×1, omission/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: Большинство наших установок формируется в детстве, пока мы только учимся понимать себя и мир. Многие из нас слышали типичные фразы, вроде: <li>Мужчины не плачут.</li> <li>Не съешь кашу — не вырастешь.</li> И вот взрослый человек с установкой «Мужчины не плачут…
- **OLD**: Most of our beliefs are formed in childhood, while we’re still learning to understand ourselves and the world. Many of us have heard typical phrases like: Men don’t cry. If you don’t eat your porridge, you won’t grow. And then an adult with the belief “Men don…
- **NEW**: Most of our assumptions are formed in childhood, while we are still learning to understand ourselves and the world. Many of us have heard typical phrases like: <li>Men don’t cry.</li> <li>If you don’t eat your porridge, you won’t grow up.</li> An adult living …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A is much more natural and follows the project's tone guidelines (using contractions like 'we're' and 'don't'). Translation B uses 'assumptions' instead of 'beliefs' for the opening, which is a weaker choice in a CBT context, and its phrasing is slightly more formal/stiff.
  - [new/terminology/minor] Used 'assumptions' for 'установки' in the first sentence; 'beliefs' is more consistent with the CBT context and the rest of the text.
  - [new/style/minor] Avoids contractions ('we are', 'we will'), making it feel less like a 'supportive friend' and more like a textbook.
  - [new/omission/minor] The Gandhi quote was omitted in translation B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is more professional and follows the CBT terminology and stylistic guidelines perfectly. Translation B has several issues: it loses the HTML tags (<li>), uses a slightly clunky 'on the contrary' which feels translated, and misses the nuance of 'unhelpful' (using 'hold us back' instead), which is the project's standard for describing beliefs.
  - [old/omission/major] Lost the <li> tags present in the original.
  - [old/style/minor] 'on the contrary' is a bit heavy/academic for this warm tone.
  - [old/terminology/minor] Used 'hold us back' instead of the preferred 'unhelpful' to describe beliefs.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: В этой статье мы разбираем концепцию промежуточных убеждений — тех самых внутренних правил и установок, через которые мы воспринимаем мир. Они связаны с автоматическими мыслями и часто определяют наше эмоциональное состояние и реакции. Осознание и переосмыслен…
- **OLD**: In this article, we look at the concept of intermediate beliefs — the inner rules and assumptions through which we perceive the world. They are linked to automatic thoughts and often determine our emotional state and reactions. Becoming aware of these beliefs …
- **NEW**: In this article, we explore the concept of intermediate beliefs—the internal rules and assumptions through which we perceive the world. They are closely linked to automatic thoughts and often shape our emotional states and reactions. Recognizing and re-examini…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A uses superior vocabulary ('explore' instead of 'look at', 'shape' instead of 'determine') and adheres perfectly to the CBT-friendly tone. It also correctly uses 'helpful' as per the project guidelines for positive cognitive restructuring.
  - [old/style/minor] 'look at' is a bit too casual/weak for an article introduction; 'determine' is too deterministic for CBT principles; 'supportive' is okay, but 'helpful' is the preferred term for cognitive patterns.
  - [old/style/minor] The use of 'our thinking' at the end feels slightly repetitive and less direct than 'your thinking'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses more idiomatic and professional CBT terminology ('shape our emotional states', 're-examining') and follows the instruction to use 'helpful' instead of 'supportive' for cognitive processes. It also correctly uses the em dash without spaces (though spaces are allowed, B's flow is superior) and adopts a more natural tone.
  - [old/terminology/minor] Used 'supportive' for thinking, whereas 'helpful' is the preferred term for cognitive flexibility in CBT context.
  - [old/style/minor] The phrasing 'Becoming aware of... and rethinking them' is slightly clunky compared to 'Recognizing and re-examining'.

#### 🟡 en `/test/question`— вердикт неустойчив

- **RU**: Какая из следующих фраз является примером промежуточного убеждения?
- **OLD**: Which of the following phrases is an example of an intermediate belief?
- **NEW**: Which of the following is an example of an intermediate belief?
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Translation B is more concise and natural for a quiz/test format. In English, 'Which of the following is...' is the standard idiomatic way to present multiple-choice questions, making 'phrases' redundant.
  - [old/style/minor] slightly wordy/redundant due to the inclusion of 'phrases'
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation B is more precise because it includes the word 'phrases', which directly corresponds to the original 'фраз'. Translation A is grammatically correct and natural, but slightly less accurate to the source text.
  - [new/omission/minor] Missing the word 'phrases' (фраз)

#### 🟡 en `/test/answers`— вердикт неустойчив

- **RU**: Погода сегодня отличная Чтобы быть сильным, нужно скрывать свои эмоции Завтра будет новый день Она не ответила на моё сообщение
- **OLD**: The weather is great today To be strong, you have to hide your emotions Tomorrow is a new day She didn’t reply to my message
- **NEW**: The weather is great today To be strong, you must hide your emotions Tomorrow is a new day She didn’t reply to my message
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Both translations are grammatically correct, but A is more natural for the context of a journal/app. 'Have to' sounds more like a common observation or a perceived necessity, whereas 'must' in B sounds overly formal and heavy.
  - [new/style/minor] The use of 'must' is slightly too formal and authoritative for a supportive, conversational tone.
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Both translations are perfect, natural, and follow all stylistic guidelines. The difference between 'must' and 'have to' is negligible in this context.

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Посмотрим, как промежуточные убеждения связаны с автоматическими мыслями. <b>Автоматическая мысль:</b> Она не ответила на моё сообщение, значит, я что-то сделал не так. <b>Промежуточное убеждение:</b> Если я буду всегда угождать другим, то меня полюбят. <b>Авт…
- **OLD**: Let’s see how intermediate beliefs are connected to automatic thoughts. An automatic thought is an instant reaction. Behind it there is usually a rule we live by — our intermediate belief.
- **NEW**: Let’s see how intermediate beliefs are connected to automatic thoughts. <b>Automatic thought:</b> She didn’t reply to my message, so I must have done something wrong. <b>Intermediate belief:</b> If I always please others, then they will love me. <b>Automatic t…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 30 / NEW 96)
  - Translation A is a massive omission, containing only the introductory and concluding sentences while completely skipping all the core examples. Translation B is excellent, follows all CBT terminology guidelines, and maintains the correct tone and formatting.
  - [old/omission/critical] The entire middle section containing the examples of automatic thoughts and intermediate beliefs is missing.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 40 / NEW 98)
  - Translation A is a complete and accurate translation of the entire text, including all examples and the concluding explanation. Translation B is a massive omission, containing only the first sentence and the last paragraph, completely skipping the core examples.
  - [old/omission/critical] The entire middle section containing the examples of automatic thoughts and intermediate beliefs is missing.

#### 🔴 en `/title` — OLD лучше (2:0)

- **RU**: Скрытые фильтры сознания: как промежуточные убеждения формируют наш мир
- **OLD**: Hidden Filters of the Mind: How Intermediate Beliefs Shape Our World
- **NEW**: Hidden filters of consciousness: how intermediate beliefs shape our world
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A uses 'the mind', which is the natural, idiomatic way to refer to mental processes in English. Translation B uses 'consciousness', which is a heavy, academic term that sounds like a literal translation of 'сознание' and is less appropriate for a mental well-being context.
  - [new/style/major] Use of 'consciousness' instead of 'the mind' creates an overly academic and unnatural tone for this genre.
  - [new/style/minor] Uses sentence case for a title that would typically be in Title Case or at least more formal in a publication context, though this is secondary to the word choice error.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Translation B uses much more natural, idiomatic English ('Filters of the Mind' vs 'Filters of Consciousness') and follows Title Case conventions appropriate for an article headline.
  - [new/style/major] 'Filters of consciousness' sounds overly academic and literal; 'Filters of the mind' is the standard idiomatic expression. Also, A uses sentence case for a headline where Title Case is more common for articles.
  - [new/style/minor] Missing Title Case for a headline.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Теперь мы спускаемся чуть глубже — от ветвей к стволу нашего условного дерева. Ствол символизирует «промежуточные убеждения». Их ещё называют «правилами», потому что это сформированные внутри нас установки и фильтры, через которые мы смотрим на себя, других и …
- **OLD**: Now we’re going a little deeper — from the branches down to the trunk of our imaginary tree. The trunk represents our “intermediate beliefs”. They are also called “rules” because they are the inner attitudes and filters through which we look at ourselves, othe…
- **NEW**: Now, let’s go a little deeper—moving from the branches to the trunk of our metaphorical tree. The trunk symbolizes “intermediate beliefs.” They are often called “rules” because they are the internal assumptions and filters through which we view ourselves, othe…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and follows the professional CBT narrative style better. It uses 'metaphorical tree' instead of 'imaginary' (which sounds like a child's game) and correctly uses 'assumptions' for 'установки' in the context of intermediate beliefs.
  - [old/style/minor] The use of 'imaginary tree' is slightly less professional than 'metaphorical tree' in a psychological context.
  - [old/omission/minor] The Instagram tag was omitted.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A is much more idiomatic and follows the professional tone of a mental health expert. It uses 'metaphorical tree' instead of the clunky 'imaginary tree' and correctly uses the em dash with proper spacing. Translation B has several stylistic issues, such as the awkward 'look at ourselves' instead of 'view ourselves' and a slightly less natural flow in the examples.
  - [old/style/minor] 'imaginary tree' sounds a bit childish compared to 'metaphorical tree'.
  - [old/style/minor] 'look at ourselves' is less professional in this context than 'view ourselves'.
  - [old/omission/minor] Missing the Instagram tag present in the original.

