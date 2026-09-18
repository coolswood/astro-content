# Merge-back победителей OLD — CONTENT (dry-run план)

- **Дата**: 2026-09-18T21:42:51.280Z
- **Отчёт eval**: scripts/qa/reports/20260918-233038-en-final-g1-distortions/report.json
- **Базлайн OLD**: git 16e1697 (src/i18n/<lang>/<file>)
- **Цели**: src/i18n/<lang>/<file> — distortions.json
- **Язык**: en
- **Режим**: DRY-RUN (запись только по --apply)
- **Итог**: применить 22, skip 0, no-op 0; файловая валидация после мерджа: пройдена

Кандидаты — стабильные поражения NEW (судья 2:0 за OLD). Ограждения: (a) существование ключа/пути; (b) validateTranslation OLD-текста; (c) легаси-терминология; (d) плейсхолдеры ru-канона; (content) OLD в git сверён с pair.oldText.

⚠️ Для контента: не применять к файлам с ручной редактурой без сверки — отличие OLD может быть намеренным решением, а не «легаси случайно лучше».

## Решения

| Файл | Ключ | Решение | Причина |
|---|---|---|---|
| `distortions.json` | `/FILTER/textHTML` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/LABEL/dialogSummary` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/COMMON/dialog/0` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/COMMON/dialog/1` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/COMMON/dialog/2` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/COMMON/dialog/3` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/MAYBE/textHTML` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/COMMON/dialogSummary` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/MORE_MINE/textHTML` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/LABEL/dialog/0` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/LABEL/dialog/1` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/LABEL/dialog/2` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/LABEL/dialog/3` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/CATASTROPHIZATION/dialog/0` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/CATASTROPHIZATION/dialog/1` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/CATASTROPHIZATION/dialog/2` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/CATASTROPHIZATION/dialog/3` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/CATASTROPHIZATION/dialog/4` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/DISCVAL/dialog/0` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/DISCVAL/dialog/1` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/DISCVAL/dialog/2` | ✅ apply | перенесён текст OLD (2:0) |
| `distortions.json` | `/DISCVAL/dialog/3` | ✅ apply | перенесён текст OLD (2:0) |

## Переносы (было → стало)

### `distortions.json` → `/FILTER/textHTML`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 96/84
- **Судья**: Translation B is much more idiomatic and flows like a professional English article. It avoids the clunky, repetitive structures of Translation A (e.g., 'negative moments and... positive ones') in favor of more natural phrasing ('zero in on negatives and overlook positives').
- **Было (NEW)**: "<p>Mental filtering is a cognitive distortion where we focus primarily on negative moments and pay almost no attention to the positive ones. For example, after an unsuccessful interview, a person might focus solely on the rejection, forgetting the valuable experience and new knowledge that will help them in the future.</p><p>This approach can lead to feelings of dissatisfaction and lower your mood, even when there is plenty of good in your life. Often, mental filtering goes hand in hand with other distortions, such as black-and-white thinking or discounting the positive.</p><p>To gradually overcome mental filtering, it is helpful to practice noticing positive moments, asking yourself supportive questions, and reminding yourself of your successes and strengths.</p>"
- **Стало (OLD)**: "<p>Mental filtering is a cognitive distortion where we zero in on negatives and overlook positives. After an unsuccessful interview, for example, someone might focus only on the rejection, missing the useful experience and new insights that could help next time.</p><p>This habit can breed dissatisfaction and low mood—even when there’s plenty of good in life. Mental filtering often goes hand in hand with other distortions, such as black-and-white thinking or discounting the positive.</p><p>To gradually move past mental filtering, practice noticing positive moments, asking yourself supportive questions, and reminding yourself of your strengths and successes.</p>"

### `distortions.json` → `/LABEL/dialogSummary`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 95/88
- **Судья**: Translation A is more idiomatic and flows better for a native speaker. 'Labels someone' is a much more natural way to describe the cognitive distortion of labeling than 'concludes that a man is'.
- **Было (NEW)**: "Character 1 concludes that a man is a “bad father” after seeing a single episode of him shouting at his children. Character 2 offers a more balanced perspective, reminding them that one observation isn’t enough and that people can behave differently in different situations."
- **Стало (OLD)**: "Character 1 labels someone a “bad father” after witnessing one moment of him yelling at his children. Character 2 offers a more measured view, noting that a single observation isn’t enough and that people can show different sides in different situations."

### `distortions.json` → `/COMMON/dialog/0`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/82 · 95/88
- **Судья**: Translation A sounds much more natural and idiomatic for a supportive mental health context. Translation B uses clunky, textbook-like phrasing such as 'no time management skills' and 'chronically unpunctual', which feels stiff and non-native.
- **Было (NEW)**: "I can’t believe it, I’m late again. It seems like I’m always late and have no time management skills at all."
- **Стало (OLD)**: "I can’t believe it—I was late again. Looks like I’m always late and can’t manage my time at all."

### `distortions.json` → `/COMMON/dialog/1`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/82 · 95/88
- **Судья**: Translation A sounds much more natural and idiomatic for a supportive mental health context. Translation B uses clunky, textbook-like phrasing such as 'no time management skills' and 'chronically unpunctual', which feels stiff and non-native.
- **Было (NEW)**: "Wait, don’t jump to conclusions. Remember how many times you’ve been on time. One instance of being late doesn’t make you chronically unpunctual."
- **Стало (OLD)**: "Hold on—don’t rush to that conclusion. Think of how many times you’ve arrived on time. One late arrival doesn’t make you chronically late."

### `distortions.json` → `/COMMON/dialog/2`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/82 · 95/88
- **Судья**: Translation A sounds much more natural and idiomatic for a supportive mental health context. Translation B uses clunky, textbook-like phrasing such as 'no time management skills' and 'chronically unpunctual', which feels stiff and non-native.
- **Было (NEW)**: "But it’s been happening more often lately. I feel like I’ve lost control."
- **Стало (OLD)**: "But lately it’s been happening more often. I feel like I’ve lost control."

### `distortions.json` → `/COMMON/dialog/3`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/82 · 95/88
- **Судья**: Translation A sounds much more natural and idiomatic for a supportive mental health context. Translation B uses clunky, textbook-like phrasing such as 'no time management skills' and 'chronically unpunctual', which feels stiff and non-native.
- **Было (NEW)**: "Let’s look at the facts. Being late once or even twice isn’t a personality trait. External circumstances might have been at play. We can look into the reasons and think about what might help next time."
- **Стало (OLD)**: "Let’s look at the facts. Being late once—or even a couple of times—doesn’t define you. External factors may have played a role. We can examine the reasons and consider what might help next time."

### `distortions.json` → `/MAYBE/textHTML`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/86 · 96/88
- **Судья**: Translation A sounds much more natural and idiomatic, using engaging phrases like 'slip into... mode' and 'spin fantasies'. Translation B is grammatically correct but feels more like a literal translation with slightly clunky phrasing (e.g., 'unavailable in reality').
- **Было (NEW)**: "<p>The “should have” distortion occurs when we mentally revisit past events and imagine ideal alternatives that were actually unavailable in reality. We start thinking in terms of “what if” and create fantasies about how things could have turned out differently.</p><p>Sometimes this shows up in communication: we tell ourselves or others that things should have been done differently, without considering the actual circumstances at the time.</p><p>This perspective often leads to feelings of guilt, regret, and dissatisfaction, as we compare reality to unattainable, ideal scenarios. It is helpful to remember that the past cannot be changed, but we can choose what to do next.</p>"
- **Стало (OLD)**: "<p>“If only” thinking is a cognitive distortion where we mentally revisit the past and imagine ideal alternatives that weren’t actually available. We slip into “what if” mode and spin fantasies about how things could have turned out differently.</p><p>It can also show up in conversation: we tell ourselves or others that things should have been done differently, without accounting for the real circumstances in which events unfolded.</p><p>This mindset often leads to guilt, regret, and dissatisfaction, as we compare reality with unattainable ideals. It helps to remember that the past is fixed—we can choose our next step.</p>"

### `distortions.json` → `/COMMON/dialogSummary`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/88 · 95/88
- **Судья**: Translation B is more idiomatic and concise, using 'labeling themselves' which sounds more natural in a psychological context than the wordier 'attributing... to themselves'. It also avoids the slightly clunky 'single instance of being late' in favor of a smoother flow.
- **Было (NEW)**: "Character 1 overgeneralizes from a single instance of being late, attributing chronic disorganization to themselves. Character 2 gently brings the focus back to the facts, reminding them of times they were punctual and suggesting they look at the situation more specifically."
- **Стало (OLD)**: "Character 1 overgeneralizes from being late once, labeling themselves as chronically disorganized. Character 2 gently brings the focus back to facts, reminding them of times they arrived on time and encouraging a more specific view of the situation."

### `distortions.json` → `/MORE_MINE/textHTML`

- **Оценки судьи OLD/NEW (2 прохода)**: 95/84 · 96/88
- **Судья**: Translation A is much more idiomatic and flows like a professional English article. Translation B feels like a direct translation from Russian, using heavy, clunky structures like 'The “magnification and minimization” distortion occurs when...' and 'It is helpful to learn to...'.
- **Было (NEW)**: "<p>The “magnification and minimization” distortion occurs when we look at events in an overly one-sided way, missing the nuances and details. With magnification, negative moments seem huge and significant, as if seen through a magnifying glass. With minimization, we downplay our strengths, successes, and positive events, as if they don’t matter.</p><p>For example, a person might consider themselves a failure due to small mistakes while failing to notice their own achievements and the efforts that led them to success.</p><p>This approach can negatively impact self-esteem and relationships, as the perception of reality becomes distorted. It is helpful to learn to notice the balance: seeing both the mistakes and the strengths, and valuing the contributions you are already making.</p>"
- **Стало (OLD)**: "<p>Magnification and minimization is a cognitive distortion where we view events in an overly one-sided way and lose nuance. With magnification, negative moments seem huge and significant, as if under a magnifying glass. With minimization, we downplay our strengths, successes, and positive events, as if they hardly matter.</p><p>For example, someone might see themselves as a failure because of small mistakes while overlooking the effort and achievements that led to their success.</p><p>This mindset can harm self-esteem and relationships because it distorts our perception of reality. It helps to practice balance: notice both missteps and strengths, and give real weight to the contributions you already make.</p>"

### `distortions.json` → `/LABEL/dialog/0`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation B uses much more natural, idiomatic English for this context. 'Sweeping judgments' is a far superior collocation than 'categorical conclusions', and 'under stress' sounds more native than 'in stressful situations'.
- **Было (NEW)**: "I saw that man shouting at his kids in the park. He’s definitely a bad father."
- **Стало (OLD)**: "I saw that man yelling at his kids in the park. He’s definitely a bad father."

### `distortions.json` → `/LABEL/dialog/1`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation B uses much more natural, idiomatic English for this context. 'Sweeping judgments' is a far superior collocation than 'categorical conclusions', and 'under stress' sounds more native than 'in stressful situations'.
- **Было (NEW)**: "It’s hard to judge based on just one moment. Maybe he was having a hard day or something happened that threw him off balance."
- **Стало (OLD)**: "It’s hard to judge based on one moment. Maybe he had a tough day or something happened that threw him off balance."

### `distortions.json` → `/LABEL/dialog/2`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation B uses much more natural, idiomatic English for this context. 'Sweeping judgments' is a far superior collocation than 'categorical conclusions', and 'under stress' sounds more native than 'in stressful situations'.
- **Было (NEW)**: "I would never act like that with my own children. It seems like he just can’t handle being a parent."
- **Стало (OLD)**: "I would never behave like that with my children. It seems like he just can’t handle being a parent."

### `distortions.json` → `/LABEL/dialog/3`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 95/88
- **Судья**: Translation B uses much more natural, idiomatic English for this context. 'Sweeping judgments' is a far superior collocation than 'categorical conclusions', and 'under stress' sounds more native than 'in stressful situations'.
- **Было (NEW)**: "Categorical conclusions can be misleading. People react differently in stressful situations, and on another day, he might be a very caring and attentive father."
- **Стало (OLD)**: "Sweeping judgments can be misleading. People react differently under stress, and on another day he might be a very caring and attentive father."

### `distortions.json` → `/CATASTROPHIZATION/dialog/0`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 95/82
- **Судья**: Translation B sounds much more natural and idiomatic for a dialogue. Translation A uses slightly clunky phrasing like 'rejected at the interview' and 'without work forever', whereas B uses common conversational expressions like 'I didn't get the job' and 'end up with nothing'.
- **Было (NEW)**: "I was rejected at the interview. That’s it—now I’ll never find a job and I'll be without work forever."
- **Стало (OLD)**: "I didn’t get the job. That’s it—I’ll never find work and I’ll end up with nothing."

### `distortions.json` → `/CATASTROPHIZATION/dialog/1`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 95/82
- **Судья**: Translation B sounds much more natural and idiomatic for a dialogue. Translation A uses slightly clunky phrasing like 'rejected at the interview' and 'without work forever', whereas B uses common conversational expressions like 'I didn't get the job' and 'end up with nothing'.
- **Было (NEW)**: "But you sent your resume to several other vacancies, right?"
- **Стало (OLD)**: "But you applied to several other openings too, right?"

### `distortions.json` → `/CATASTROPHIZATION/dialog/2`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 95/82
- **Судья**: Translation B sounds much more natural and idiomatic for a dialogue. Translation A uses slightly clunky phrasing like 'rejected at the interview' and 'without work forever', whereas B uses common conversational expressions like 'I didn't get the job' and 'end up with nothing'.
- **Было (NEW)**: "Yes, but what’s the point? If they didn’t take me here, it means nobody wants me. All my efforts are just pointless."
- **Стало (OLD)**: "Yes, but what’s the point? If I wasn’t chosen here, it means no one needs me. Any effort is pointless."

### `distortions.json` → `/CATASTROPHIZATION/dialog/3`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 95/82
- **Судья**: Translation B sounds much more natural and idiomatic for a dialogue. Translation A uses slightly clunky phrasing like 'rejected at the interview' and 'without work forever', whereas B uses common conversational expressions like 'I didn't get the job' and 'end up with nothing'.
- **Было (NEW)**: "Such a harsh conclusion can only increase your distress. Perhaps it’s worth giving yourself some time, reassessing your expectations, and continuing the search."
- **Стало (OLD)**: "That harsh conclusion will only intensify your distress. Give yourself some time, revisit your expectations, and keep looking."

### `distortions.json` → `/CATASTROPHIZATION/dialog/4`

- **Оценки судьи OLD/NEW (2 прохода)**: 94/86 · 95/82
- **Судья**: Translation B sounds much more natural and idiomatic for a dialogue. Translation A uses slightly clunky phrasing like 'rejected at the interview' and 'without work forever', whereas B uses common conversational expressions like 'I didn't get the job' and 'end up with nothing'.
- **Было (NEW)**: "But how can I not think about the failure? It feels like proof that I won’t find a place anywhere and all my plans are falling apart."
- **Стало (OLD)**: "But how do I stop thinking about failure? It feels like proof there’s no place for me and that all my plans are falling apart."

### `distortions.json` → `/DISCVAL/dialog/0`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 96/88
- **Судья**: Translation A sounds much more natural and idiomatic for a supportive conversation. The use of em dashes and the phrase 'taking on' instead of the repetitive 'leading' makes the dialogue flow better.
- **Было (NEW)**: "I got promoted; now I’ll be leading new projects."
- **Стало (OLD)**: "I got promoted—I’ll be leading new projects."

### `distortions.json` → `/DISCVAL/dialog/1`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 96/88
- **Судья**: Translation A sounds much more natural and idiomatic for a supportive conversation. The use of em dashes and the phrase 'taking on' instead of the repetitive 'leading' makes the dialogue flow better.
- **Было (NEW)**: "That’s wonderful news, congratulations! What kind of projects will you be leading?"
- **Стало (OLD)**: "That’s wonderful news—congratulations! What projects will you be taking on?"

### `distortions.json` → `/DISCVAL/dialog/2`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 96/88
- **Судья**: Translation A sounds much more natural and idiomatic for a supportive conversation. The use of em dashes and the phrase 'taking on' instead of the repetitive 'leading' makes the dialogue flow better.
- **Было (NEW)**: "The projects are difficult, and there will be a lot of work. I feel like they’ve just piled more responsibilities on me."
- **Стало (OLD)**: "They’re challenging, and there’ll be a lot of work. It feels like they just piled extra responsibilities on me."

### `distortions.json` → `/DISCVAL/dialog/3`

- **Оценки судьи OLD/NEW (2 прохода)**: 96/88 · 96/88
- **Судья**: Translation A sounds much more natural and idiomatic for a supportive conversation. The use of em dashes and the phrase 'taking on' instead of the repetitive 'leading' makes the dialogue flow better.
- **Было (NEW)**: "It certainly can be a challenge, but don’t forget that you weren’t chosen by chance. You’ve reached an important milestone, and this is a great opportunity to grow and show what you can do."
- **Стало (OLD)**: "It may be a real challenge, but you weren’t chosen by accident. You’ve reached an important milestone, and it’s a great opportunity to grow and show what you can do."

## Легаси-терминология (guard c)

Список: ["dysfunctional","Diary","diary","psychological well-being","Therapist"]; сверка подстрочная, без учёта регистра (консервативно: любое вхождение = skip «нужен перегон»).

