# QA: слепое парное сравнение переводов — en-final-g23-triangle

- **Дата**: 2026-09-18T20:48:15.106Z
- **Метка**: en-final-g23-triangle
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/triangle.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/triangle.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 7 | 🟢 5 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |
| **итого** | 7 | 🟢 5 | 🔴 0 | ⚪ 0 | 🟡 2 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×1; OLD — style/minor×8, terminology/major×2, style/major×1, omission/major×1, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟢 en `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Выход есть — и КПТ как раз про этот выход. Давайте взглянем на диалог клиента с психологом, чтобы увидеть более подробно, как работает эта триада: <dialog>Я постоянно чувствую тревогу. Кажется, что я всё делаю не так, и что окружающие меня осуждают.</dialog> <…
- **OLD**: There is a way out — and CBT is exactly about this. Let’s look at a dialogue between a client and a psychologist to see in more detail how this triad works:
- **NEW**: There is a way out—and CBT is all about finding it. Let’s look at a dialogue between a client and a psychologist to see how this triad works in more detail: <dialog>I constantly feel anxious. It feels like I’m doing everything wrong and that everyone around me…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 96)
  - Translation B is much more idiomatic and natural for a native speaker. Translation A's opening sentence is a clunky literal translation of the Russian structure, whereas B uses a much more natural English phrasing ('CBT is all about finding it'). B also handles the dialogue flow with better rhythm and vocabulary.
  - [old/style/major] The opening 'CBT is exactly about this' is a heavy calque from Russian; 'CBT is all about...' is the natural English equivalent.
  - [old/omission/major] The entire dialogue section is missing from Translation A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 30 / NEW 96)
  - Translation A is a complete, high-quality, and idiomatic translation that follows all CBT terminology and tone guidelines. Translation B is a massive omission, providing only the first two lines of the text.
  - [old/omission/critical] The entire dialogue and the majority of the text are missing.

#### 🟡 en `/test/answers`— вердикт неустойчив

- **RU**: Мысли, чувства и поведение функционируют независимо друг от друга, и изменение одного из них не влияет на остальные Мысли влияют на чувства и поведение, но чувства и поведение не влияют на мысли Мысли, чувства и поведение взаимосвязаны, и изменение одного из н…
- **OLD**: Thoughts, feelings, and behavior function independently of each other, and changing one of them does not affect the others Thoughts influence feelings and behavior, but feelings and behavior do not influence thoughts Thoughts, feelings, and behavior are interc…
- **NEW**: Thoughts, feelings, and behavior function independently, and changing one does not affect the others. Thoughts affect feelings and behavior, but feelings and behavior do not affect thoughts. Thoughts, feelings, and behavior are interconnected, and changing one…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more precise and maintains the formal structure of the original statements. Translation B uses 'affect' and 'influence' inconsistently compared to the original, and the omission of 'of each other' in the first sentence makes it slightly less precise.
  - [new/style/minor] Inconsistent use of 'affect' and 'influence' compared to the original's rhythmic structure; 'function independently' is slightly less complete than 'function independently of each other' in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more concise and follows natural English rhythm, avoiding the repetitive 'of each other' and 'of them' found in B. Translation A also uses 'affect' and 'influence' more effectively to maintain a professional yet readable tone.
  - [old/style/minor] Wordiness: 'independently of each other' and 'changing one of them' are unnecessarily heavy for this context.

#### 🟢 en `/screen_2/texts` — NEW лучше (2:0)

- **RU**: Чтобы наглядно увидеть работу этой триады, рассмотрим пример: вы идёте по улице и замечаете бывшего партнёра, с которым вы расстались. Мысль: «Он выглядит счастливым, а я — неудачница». Эмоция: грусть, обида, злость. Телесная реакция: напряжение в плечах, учащ…
- **OLD**: To clearly see how this triad works, let’s look at an example: you are walking down the street and notice an ex-partner you once broke up with. Thought: “He looks happy, and I’m a loser.” Emotion: sadness, hurt, anger. Physical reaction: tension in the shoulde…
- **NEW**: To see this triad in action, let’s look at an example: you are walking down the street and notice an ex-partner. Thought: “They look happy, and I’m a failure.” Emotion: sadness, resentment, anger. Physical reaction: tension in the shoulders, racing heart. Beha…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A is much more idiomatic and follows the project's tone guidelines perfectly. It uses gender-neutral 'they' for the ex-partner, which is more natural in modern English UX, whereas B's 'he/him' is a specific assumption. A also uses 'unhelpful behavior' which aligns with the project's terminology for 'неадаптивный/неэффективный' in a soft, non-judgmental way.
  - [old/style/minor] Uses 'loser' which is a bit more slangy/harsh than the original 'неудачница' in a clinical context; 'rapid heartbeat' is slightly more formal than 'racing heart'.
  - [old/terminology/minor] Uses 'ineffective behavior' instead of 'unhelpful behavior', which is the preferred project term for non-adaptive patterns.
  - [old/style/minor] The phrasing 'an ex-partner you once broke up with' is redundant (an ex-partner is someone you broke up with).
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is much more idiomatic and follows the 'expert friend' tone perfectly. It uses better vocabulary (e.g., 'distressing' instead of 'painful', 'racing heart' instead of 'rapid heartbeat') and handles gender neutrality more naturally in the first example.
  - [old/style/minor] The phrase 'an ex-partner you once broke up with' is redundant; 'ex-partner' already implies the breakup.
  - [old/style/minor] 'I'm a loser' is a bit more colloquial/childish than 'I'm a failure' in a psychological context.
  - [old/style/minor] 'rapid heartbeat' is grammatically fine but 'racing heart' is more natural for describing physical sensations.
  - [old/style/minor] 'painful feelings' is slightly less professional/precise than 'distressing feelings' in CBT contexts.

#### 🟢 en `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Давайте разберёмся с главным принципом когнитивно-поведенческой терапии — взаимосвязью мыслей, эмоций и наших реакций. Представьте треугольник, у которого вершины — это мысли, чувства и поведение. Эти три элемента не просто сосуществуют: они постоянно взаимоде…
- **OLD**: Let’s look at the core principle of cognitive-behavioral therapy — the connection between thoughts, emotions, and our reactions. Imagine a triangle whose corners are thoughts, feelings, and behavior. These three elements don’t just coexist: they constantly int…
- **NEW**: Let’s explore the core principle of cognitive behavioral therapy (CBT)—the interconnectedness of our thoughts, emotions, and behaviors. Imagine a triangle where the vertices are thoughts, feelings, and behavior. These three elements don’t just coexist; they co…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and follows the professional tone of a 'knowledgeable friend' much better. It uses superior phrasing like 'making sense of a situation' and 'racing heart' instead of the slightly clunky 'explain a situation to ourselves' or 'rapid heartbeat'.
  - [old/style/minor] The phrase 'explain a situation to ourselves' is a bit of a Russianism; 'making sense of' is much more natural in English.
  - [old/style/minor] The use of 'we' in the examples (We lose our wallet) is grammatically fine but slightly less engaging for a UX/article context than the 'you' used in A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is much more idiomatic and follows the professional CBT-style narrative guidelines. It uses better vocabulary ('interconnectedness', 'making sense of', 'physiological responses') and correctly handles the shift to 'you' for the examples, which sounds more natural in English than the literal 'we' used in A.
  - [old/style/minor] Uses 'corners' instead of 'vertices' for a triangle, which is less precise; 'physical reactions' is slightly less professional than 'physiological responses'; 'we' in examples feels slightly repetitive/clunky compared to 'you'.
  - [new/style/minor] The use of 'you' in the examples ('The car breaks down—you feel angry') is a slight departure from the 'we' in the original, but it is a standard and better way to write English instructional/educational text.

#### 🟢 en `/screen_4/texts` — NEW лучше (2:0)

- **RU**: Работая с мыслями, можно менять эмоции и поведение к лучшему. Мы научимся замечать негативные мысли, проверять их на реалистичность и заменять более адаптивными. Это поможет разорвать замкнутый круг негатива и почувствовать себя устойчивее. Так работает базова…
- **OLD**: By working with thoughts, we can change emotions and behavior for the better. We will learn to notice negative thoughts, test how realistic they are, and replace them with more adaptive ones. This helps break the vicious circle of negativity and helps you feel…
- **NEW**: By working with your thoughts, you can change your emotions and behavior for the better. We will learn to notice unhelpful thoughts, check them for realism, and replace them with more adaptive ones. This will help you break the cycle of negativity and feel mor…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A follows all CBT terminology guidelines (using 'unhelpful' instead of 'negative' or 'destructive') and maintains a much more natural, supportive tone. Translation B contains several 'translationese' markers and violates the specific instruction regarding 'healthy/unhealthy' thoughts.
  - [old/terminology/major] Used 'negative' and 'destructive' instead of the required 'unhelpful' for thoughts.
  - [old/terminology/major] Used 'healthier' instead of 'helpful' for thoughts/reactions.
  - [old/style/minor] Used 'Don't despair', which is too heavy/dramatic compared to the supportive 'Don't be discouraged'.
  - [old/style/minor] The phrasing 'test how realistic they are' is slightly clunky compared to 'check them for realism'.
  - [old/style/minor] Used 'stable' instead of 'resilient', which is a more accurate and professional term for psychological well-being in this context.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B follows the project's specific CBT terminology (unhelpful/helpful instead of destructive/healthier) and uses more natural, idiomatic English (ruminating, resilient, don't be discouraged).
  - [old/terminology/major] Used 'destructive' and 'healthier' instead of the required 'unhelpful' and 'helpful' for CBT thoughts.
  - [old/style/minor] The phrasing 'individual nuances are added on top of it' is slightly clunky/translated.
  - [old/style/minor] Used 'A person with anxiety' which is grammatically okay but 'An anxious person' or 'Someone with anxiety' is more natural in this context.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: Статья объясняет основы когнитивно-поведенческой терапии и показывает, как мысли, чувства и поведение связаны между собой. На примерах диалога психолога и клиента видно, как изменение мышления помогает улучшить эмоциональное состояние и поступки. В конце — пон…
- **OLD**: This article explains the basics of cognitive-behavioral therapy and shows how thoughts, feelings, and behavior are interconnected. Through examples of a dialogue between a psychologist and a client, it illustrates how changing thinking patterns can improve em…
- **NEW**: This article explains the fundamentals of cognitive behavioral therapy (CBT) and shows how thoughts, feelings, and behavior are interconnected. Through examples of a dialogue between a psychologist and a client, you’ll see how changing your thinking can help i…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more polished and follows the 'understanding friend' tone perfectly by using 'you'll see' and 'practical strategies'. Translation B is slightly more formal/academic and uses 'vicious cycle', which is a bit more cliché than the smoother 'break the cycle' in A.
  - [old/style/minor] The phrase 'vicious cycle' is a bit heavy/cliché compared to the cleaner 'break the cycle' in A; 'it illustrates' is slightly more formal/dry than the direct 'you'll see'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B follows the project's terminology guidelines by introducing the 'CBT' acronym and uses a more natural, engaging tone ('you'll see', 'practical strategies') suitable for a mental health app. Translation A is grammatically correct but feels slightly more academic and less personal.
  - [old/terminology/minor] Did not introduce the 'CBT' acronym upon first mention of cognitive-behavioral therapy.
  - [old/style/minor] The phrase 'At the end, you'll find' is slightly less idiomatic for an article summary than 'It concludes with'.

#### 🟡 en `/test/question`— вердикт неустойчив

- **RU**: Какое из следующих утверждений наиболее точно описывает триаду мыслей, чувств и поведения?
- **OLD**: Which of the following statements best describes the triad of thoughts, feelings, and behavior?
- **NEW**: Which of the following statements most accurately describes the triad of thoughts, feelings, and behavior?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - While both are grammatically correct, 'best describes' is the standard, idiomatic way to phrase multiple-choice questions in English, whereas 'most accurately describes' sounds slightly more formal and heavy.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation B is a more precise and professional rendering of the original 'наиболее точно'. While 'best describes' is acceptable in casual English, 'most accurately describes' is the standard academic and clinical phrasing for psychological assessments.

