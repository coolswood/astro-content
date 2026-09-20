# QA: слепое парное сравнение переводов — en-final-g23-depths

- **Дата**: 2026-09-18T20:41:24.134Z
- **Метка**: en-final-g23-depths
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: story/depths.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/depths.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 6 | 🟢 1 | 🔴 1 | ⚪ 0 | 🟡 4 | 0 / 0 | 50% |
| **итого** | 6 | 🟢 1 | 🔴 1 | ⚪ 0 | 🟡 4 | 0 / 0 | 50% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×10; OLD — terminology/major×1, terminology/minor×1, style/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/screen_1/texts`— вердикт неустойчив

- **RU**: Мы подошли к самому глубокому уровню — уровню глубинных убеждений. Глубинные убеждения — это устойчивые и часто неосознаваемые идеи о себе, других людях и окружающем мире. Они формируются ещё в детстве и могут оказывать сильное влияние на наше поведение и пере…
- **OLD**: We’ve now reached the deepest level—the level of core beliefs. Core beliefs are relatively stable, often unconscious ideas about yourself, other people, and the world. They typically form in childhood and can strongly influence your behavior and experience, ev…
- **NEW**: We’ve reached the deepest level—the level of core beliefs. Core beliefs are stable ideas about yourself, others, and the world around you that often remain outside of awareness. They are formed in childhood and can strongly influence your behavior and emotions…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more idiomatic and follows the project's tone guidelines better. It uses 'unconscious' (which is acceptable in this context, though B's 'outside of awareness' is more strictly aligned with the glossary) and flows more naturally. Translation B has several clunky phrases like 'your life train runs on' and 'manifest at the same time', which feel like translations rather than natural English.
  - [new/style/minor] 'your life train runs on' is a bit clunky compared to 'guide the train of your life'.
  - [new/style/minor] 'manifest at the same time' is slightly more formal/stiff than 'show up together'.
  - [new/style/minor] 'This perception affects his actions' is a bit dry; A's 'This lens shapes his actions' is much more evocative and natural for a narrative.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A follows all the specific terminology and stylistic guidelines provided, especially regarding CBT terms and the 'outside of awareness' phrasing. Translation B uses 'unconscious' and 'rails', which are less idiomatic or violate the specific instructions for this project.
  - [old/terminology/major] Used 'unconscious' instead of the required 'often remain outside of awareness'.
  - [old/style/minor] Used 'rails' instead of 'tracks' (tracks is more common for trains in this metaphor) and 'disguised' instead of 'subtle'.
  - [old/omission/major] The entire <stepper> block is missing, which is a critical structural element of the original text.

#### 🟢 en `/description` — NEW лучше (2:0)

- **RU**: В этой статье мы поговорим о глубинных убеждениях — фундаментальных представлениях о себе, мире и людях, которые лежат в основе наших реакций и формируют промежуточные убеждения и автоматические мысли. Особое внимание уделим трём категориям таких убеждений — с…
- **OLD**: This article explores core beliefs—fundamental assumptions about yourself, other people, and the world that underlie your reactions and shape your intermediate beliefs and automatic thoughts. We focus on three categories of core beliefs—helplessness, unaccepta…
- **NEW**: In this article, we’ll talk about core beliefs—the fundamental ideas about yourself, the world, and others that drive your reactions and shape your intermediate beliefs and automatic thoughts. We’ll focus on three specific categories: helplessness, unlovabilit…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and aligns better with the project's specific terminology (mental well-being) and tone. Translation A uses 'unacceptability' which is a clunky, non-standard term for this context, whereas B's 'unlovability' (though a slight departure from the literal 'неприятие') or the general flow of B feels more like a natural English article.
  - [old/terminology/major] Used 'unacceptability' for 'неприятие', which sounds unnatural in a CBT context; 'unlovability' or 'rejection' would be better, though B's choice is also a creative leap.
  - [old/terminology/minor] Used 'emotional well-being' instead of the preferred 'mental well-being'.
  - [old/style/minor] The phrasing 'create lasting change' is a bit generic compared to the more precise 'shift your state' or 'make steady progress' in B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more natural, follows the 'understanding friend' tone, and uses better terminology. Translation B uses 'unacceptability' which is a mistranslation of 'неприятие' in a CBT context (should be unlovability or rejection), and 'emotional well-being' is less preferred than 'mental well-being' for this context.
  - [old/terminology/major] 'unacceptability' is a poor translation for 'неприятие' (unlovability/rejection) in the context of core beliefs; it sounds like a quality of an object rather than a feeling of being unlovable.
  - [old/style/minor] The tone is slightly more academic/dry compared to the warmer 'we'll talk about' in A.
  - [old/terminology/minor] Used 'emotional well-being' instead of the preferred 'mental well-being'.

#### 🟡 en `/screen_3/texts`— вердикт неустойчив

- **RU**: <h2>Глубинные убеждения категории никчемности</h2> Эта категория связана с ощущением собственной неполноценности и незначительности. Человек ощущает себя хуже других и недостойным внимания и уважения. О себе: «Я ничтожество», «Я неудачник», «Я глуп», «Я беспол…
- **OLD**: Core beliefs in the worthlessness category This category involves feeling inferior and insignificant. The person sees themselves as worse than others and undeserving of attention and respect. About self: “I’m worthless,” “I’m a failure,” “I’m stupid,” “I’m use…
- **NEW**: <h2>Worthlessness core beliefs</h2> This category is linked to feelings of inadequacy and insignificance. A person feels inferior to others and unworthy of attention and respect. About self: “I am worthless,” “I am a failure,” “I am stupid,” “I am useless.” Ab…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 86)
  - Translation A is more idiomatic and follows the UX/tone guidelines perfectly. It uses natural contractions ('I'm', 'that's', 'don't') and flows much better as a piece of psychoeducation. Translation B feels slightly more formal/stiff and has a minor issue with the translation of 'Мир меня наказывает' (using continuous 'is punishing' instead of the more natural simple 'punishes').
  - [new/style/minor] Lack of contractions makes the tone feel slightly less like a 'supportive friend' and more like a textbook.
  - [new/style/minor] The phrase 'the world is punishing me' is less idiomatic than 'the world punishes me' in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is more polished and adheres better to the professional CBT tone. It uses more natural phrasing like 'linked to feelings of' and 'working through', whereas B feels slightly more fragmented. A's handling of the 'important' block is also more idiomatic.
  - [old/style/minor] The heading 'Core beliefs in the worthlessness category' is a bit wordy compared to the punchy 'Worthlessness core beliefs'.
  - [old/style/minor] The phrase 'go straight to the deepest level' is slightly less precise than 'work on your core beliefs immediately' in a clinical context.

#### 🔴 en `/test/answers` — OLD лучше (2:0)

- **RU**: «Я слаб и не способен справиться с трудностями», «Мир слишком сложен для меня» «Я никому не нужен», «Я ничтожество», «Я не достоин любви» «Люди меня осуждают», «Люди злые и отвергнут меня» «Я грешен», «Другие лучше меня», «Мир меня наказывает»
- **OLD**: “I’m weak and can’t handle difficulties,” “The world is too complex for me” “No one needs me,” “I’m worthless,” “I don’t deserve love” “People judge me,” “People are cruel and will reject me” “I am sinful,” “Others are better than me,” “The world punishes me”
- **NEW**: “I am weak and unable to cope with difficulties,” “The world is too complex for me” “No one needs me,” “I am worthless,” “I am unworthy of love” “People judge me,” “People are mean and will reject me” “I am sinful,” “Others are better than me,” “The world is p…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A sounds more natural and idiomatic for internal monologue/core beliefs by using contractions. Translation B is slightly too formal and heavy for these types of thoughts.
  - [new/style/minor] Use of 'I am' instead of 'I'm' makes the thoughts feel stiff and less like a natural inner voice; 'mean' is a bit too childish/simple for this context compared to 'cruel'.
  - [new/style/minor] The use of Present Continuous 'is punishing me' instead of Present Simple 'punishes me' slightly shifts the nuance from a general belief to a temporary state.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation B sounds more natural and idiomatic for internal monologue/core beliefs. The use of contractions ('I'm', 'can't') and the choice of 'don't deserve love' and 'cruel' feel more authentic to how a native speaker would express these thoughts.
  - [new/style/minor] The phrasing 'I am weak and unable to cope' is slightly formal/stiff for a personal thought; 'I don't deserve love' (B) is more common than 'I am unworthy of love' (A) in this context.

#### 🟡 en `/title`— вердикт неустойчив

- **RU**: Глубинные убеждения
- **OLD**: Core Beliefs
- **NEW**: Core beliefs
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - In the context of a title or a section header, Title Case (A) is the standard for English-speaking markets, whereas sentence case (B) is typically reserved for UI labels or list items.
  - [new/style/minor] Uses sentence case for what appears to be a main section title/heading.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 100)
  - Translation A follows the sentence case rule for UI elements/headers, whereas Translation B uses Title Case, which is not the standard for this project's UI.
  - [old/style/minor] Uses Title Case instead of sentence case as per instructions for UI/headers

#### 🟡 en `/screen_2/texts`— вердикт неустойчив

- **RU**: <h2>Три категории глубинных убеждений</h2> Основатель КПТ Аарон Бек выделил две категории глубинных убеждений, позже его дочь Джудит Бек добавила третью. Эти категории могут пересекаться. Например, чувство никчемности может усиливать беспомощность: «Я ничего н…
- **OLD**: Three categories of core beliefs CBT founder Aaron Beck described two main categories of core beliefs; his daughter, Judith Beck, later added a third. These categories can overlap. For example, a sense of worthlessness can intensify helplessness: “I can’t do a…
- **NEW**: <h2>Three categories of core beliefs</h2> CBT founder Aaron Beck identified two categories of core beliefs, and his daughter, Judith Beck, later added a third. These categories can overlap. For example, a sense of worthlessness can reinforce helplessness: “I c…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more natural and follows the UX guidelines better, using contractions ('I'm', 'They'll') which makes the internal monologue of the examples feel more authentic. Translation B is slightly too formal/stiff for a mental health app, using 'I am' instead of 'I'm', and its heading structure ('Helplessness core beliefs') is less idiomatic than A's approach.
  - [new/style/minor] Overuse of 'I am' instead of contractions makes the examples sound robotic rather than like natural internal thoughts.
  - [new/style/minor] The headings 'Helplessness core beliefs' are grammatically okay but less fluid than 'Core beliefs in the helplessness category'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation A is superior because it maintains the original HTML structure (h2 tags) and uses more precise, idiomatic terminology for the core belief categories. Translation B uses 'unacceptability category', which is a clunky, non-standard way to describe the 'unlovability' (непринятие) theme in CBT, whereas A's 'Unlovability core beliefs' sounds like a natural heading.
  - [old/omission/minor] Missing h2 tags for headings.
  - [old/style/minor] 'unacceptability category' is awkward; 'unlovability' is the standard psychological theme here.
  - [old/style/minor] The translation of 'непринятие' as 'unacceptability' is a semantic mismatch; it refers to the feeling of being unlovable/unwanted, not the quality of being unacceptable.

