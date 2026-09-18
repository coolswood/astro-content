# QA: слепое парное сравнение переводов — en-final-g23-positive

- **Дата**: 2026-09-18T20:44:54.448Z
- **Метка**: en-final-g23-positive
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/positive.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/positive.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 7 | 🟢 1 | 🔴 1 | ⚪ 0 | 🟡 5 | 0 / 0 | 50% |
| **итого** | 7 | 🟢 1 | 🔴 1 | ⚪ 0 | 🟡 5 | 0 / 0 | 50% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×2; OLD — style/minor×6

### Детали пар (для спот-чека)

#### 🟡 en `/title`— вердикт неустойчив

- **RU**: Позитивное мышление — это не про КПТ!
- **OLD**: Positive Thinking Is Not What CBT Is About!
- **NEW**: Positive thinking isn’t CBT!
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A captures the nuance of 'это не про...' (it's not about...) much more naturally and idiomatically for an article title. Translation B is a bit too blunt and sounds like a direct, slightly clunky translation of the Russian structure.
  - [new/style/minor] Too literal/blunt; lacks the conversational 'it's not about' nuance of the original.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is punchy, idiomatic, and perfectly captures the informal, provocative tone of the original. Translation B is wordy, heavy, and sounds like a clunky literal translation of the Russian structure.
  - [old/style/major] Too wordy and lacks the impact of the original; sounds unnatural for a headline/hook.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: Статья объясняет различия между позитивным мышлением и когнитивно-поведенческой терапией (КПТ). В отличие от простого «думай о хорошем», КПТ работает с когнитивными искажениями и помогает менять поведение адаптивно и реалистично. Такой подход опирается на факт…
- **OLD**: This article explains the difference between positive thinking and cognitive-behavioral therapy (CBT). Unlike simply “thinking positive”, CBT works with cognitive distortions and helps you change your behavior in an adaptive and realistic way. This approach re…
- **NEW**: This article explains the difference between positive thinking and cognitive behavioral therapy (CBT). Unlike simply “thinking positive,” CBT works with cognitive distortions to help you change your behavior in an adaptive and realistic way. This approach reli…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and flows better, using 'managing emotions' and 'navigating complex life situations' which sounds much more natural for a mental health article than the literal phrasing in A.
  - [old/style/minor] The phrase 'which makes it effective for dealing with...' is slightly clunky and more 'translated' in feel compared to the more fluid B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and flows better, using 'managing emotions' and 'navigating complex life situations' which sounds more professional and natural for a mental health article. Translation B uses slightly more clunky phrasing ('dealing with', 'difficult life situations').
  - [old/style/minor] Punctuation error: the comma should be outside the quotation marks in US English, but the phrasing 'dealing with' is also less sophisticated than 'managing'.
  - [old/style/minor] The phrase 'difficult life situations' is a bit generic compared to the more polished 'complex life situations'.

#### 🟡 en `/screen_1/texts`— вердикт неустойчив

- **RU**: Вы можете спросить: значит, нужно просто всегда думать о хорошем? Закрыть глаза на проблемы, окружить себя «радужным заборчиком» и повторять: «всё хорошо, всё отлично»? Совсем нет! Связь КПТ с позитивным мышлением примерно как у компьютерной мыши с полевой: зв…
- **OLD**: You might ask: so do I just need to constantly think about good things? Close my eyes to problems, build a little “rainbow fence” around myself and repeat: “Everything is fine, everything is great”? Absolutely not! The connection between CBT and positive think…
- **NEW**: You might ask: so, should I just always think positively? Should I ignore my problems, surround myself with a “rainbow fence,” and keep repeating, “everything is fine, everything is great”? Not at all! The connection between CBT and positive thinking is a bit …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and flows better as a piece of engaging content. It uses more natural phrasing like 'testing your ideas against facts' and 'That is where the similarity ends'.
  - [old/style/minor] The phrasing 'think about good things' is a bit clunky compared to 'think positively'. 'Urges us' is slightly more aggressive than the original 'призывает'. 'Feel the difference?' without 'Do you' is acceptable in casual text but A's version is more polished for an article.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 88)
  - Translation A is more idiomatic and flows better as a piece of narrative content. Translation B feels slightly more repetitive and formal (e.g., 'the connection between... is a bit like the connection between...').
  - [new/style/minor] Repetitive structure in the mouse analogy ('the connection... is a bit like the connection...').
  - [new/style/minor] The phrase 'That is where the similarity ends' is slightly more stiff than the more natural 'And that’s where the similarities end' in A.

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: Позитивное мышление — это умение не падать духом и видеть хорошее в любой ситуации, искренне веря, что всё к лучшему. Когнитивно-поведенческая терапия нацелена на распознавание и коррекцию когнитивных искажений (непродуктивных мыслей и убеждений) и последующее…
- **OLD**: Positive thinking is the ability to keep your spirits up and see the good in any situation, genuinely believing that everything happens for the best. Cognitive-behavioral therapy is aimed at identifying and correcting cognitive distortions (unhelpful thoughts …
- **NEW**: Positive thinking is the ability to stay upbeat and see the good in any situation, sincerely believing that everything will turn out for the best. Cognitive behavioral therapy aims to recognize and correct cognitive distortions (unhelpful thoughts and beliefs)…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and flows better as a cohesive article. It uses more natural phrasing like 'lose touch with reality' and 'does more harm than good' instead of the slightly clunky 'reality drops out of the equation' or 'doing ourselves a disservice' in B.
  - [old/style/minor] The phrase 'reality drops out of the equation' is a bit literal/clunky compared to 'lose touch with reality'.
  - [old/style/minor] The translation of 'медвежья услуга' as 'doing ourselves a disservice' is correct, but 'does more harm than good' in A feels more natural in this context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows better as a cohesive narrative. Translation B contains a slight mistranslation in the final paragraph ('does more harm than good' vs 'disservice') and feels slightly more fragmented.
  - [new/style/minor] The phrase 'does more harm than good' is a bit cliché compared to the more precise 'doing ourselves a disservice' which matches the Russian 'медвежья услуга' better in this context.
  - [new/style/minor] The phrasing 'every 'bad' thought with a 'good' one' adds words ('thought') not present in the original, making it slightly less punchy than A.

#### 🟡 en `/test/answers`— вердикт неустойчив

- **RU**: Позитивное мышление и КПТ фокусируются на поиске позитивного в каждой жизненной ситуации Позитивное мышление и КПТ оба фокусируются на изменении поведения, а не мышления Позитивное мышление предлагает заменять все негативные мысли на позитивные, в то время как…
- **OLD**: Positive thinking and CBT both focus on looking for the positive in every life situation Positive thinking and CBT both focus on changing behavior rather than thinking Positive thinking suggests replacing all negative thoughts with positive ones, whereas CBT f…
- **NEW**: Both positive thinking and CBT focus on finding the positive in every life situation. Both positive thinking and CBT focus on changing behavior rather than thinking. Positive thinking suggests replacing all negative thoughts with positive ones, while CBT focus…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 90)
  - Translation A is slightly more natural and idiomatic for an educational/article context. The use of 'encourages you' in the fourth sentence is a better stylistic choice for the target tone than the repetitive 'suggests' in B.
  - [new/style/minor] Repetitive use of 'suggests' and 'while' makes the rhythm feel a bit flat compared to A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more consistent and follows a clean, professional rhythm. Translation B introduces unnecessary 'whereas' and 'encourages you' which, while not wrong, makes the text feel slightly more wordy and less direct than the original.
  - [old/style/minor] Inconsistent use of 'whereas' vs 'while' and the addition of 'you' in the last sentence adds unnecessary wordiness compared to the concise original.

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: Приведём пример: Представьте неприятное событие: потеря работы, болезнь или тяжёлое расставание — ситуации, где боль реальна. Подход позитивного мышления предложит подменить переживания оптимистичными формулами вроде: «Не думай о плохом, всё обязательно будет …
- **OLD**: Let’s look at an example: Imagine something difficult happens: you lose your job, get ill, or go through a painful breakup — situations where the pain is very real. The positive-thinking approach will suggest replacing your feelings with optimistic formulas li…
- **NEW**: Let’s look at an example: Imagine an unpleasant event: losing a job, an illness, or a difficult breakup—situations where the pain is very real. A positive thinking approach might suggest replacing your feelings with optimistic formulas like: “Don’t think about…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 89 / NEW 96)
  - Translation A is more polished and idiomatic. It uses better phrasing like 'everything is bound to be fine' and 'manage our emotions', whereas B feels slightly more translated. A also correctly uses the em dash without spaces, which is more standard for high-quality English prose in this context.
  - [old/style/minor] The phrasing 'check how well they fit the facts' is a bit wordy compared to the more natural 'checking them against the facts'.
  - [old/style/minor] The use of spaces around the em dash is less common in professional US English publishing than the closed em dash used in A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and flows like a well-written English article. Translation B has several minor stylistic issues, such as 'an illness' (unnatural in this context) and 'manage our emotions... much better' (clunky compared to A's 'cope better').
  - [new/style/minor] 'an illness' sounds slightly unnatural in a list of events; 'losing a job' or 'getting sick' is better.
  - [new/style/minor] 'manage our emotions and real-life tasks much better' is a bit wordy and less idiomatic than 'cope better with our emotions and real-life challenges'.

#### 🔴 en `/test/question` — OLD лучше (2:0)

- **RU**: Какое утверждение наиболее точно описывает различие между позитивным мышлением и КПТ?
- **OLD**: Which statement best describes the difference between positive thinking and CBT?
- **NEW**: Which statement most accurately describes the difference between positive thinking and CBT?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - While both are grammatically correct, 'best describes' is the idiomatic standard for multiple-choice questions or comparative assessments in English. 'Most accurately describes' sounds slightly more formal and heavy.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A is more idiomatic and natural for a native speaker; 'best describes' is the standard way to phrase such questions in English, whereas 'most accurately describes' sounds slightly more formal and heavy.
  - [new/style/minor] slightly wordy/formal compared to the natural 'best describes'

