# QA: слепое парное сравнение переводов — en-final-g67-mood

- **Дата**: 2026-09-18T21:41:17.603Z
- **Метка**: en-final-g67-mood
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: texts/mood.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## texts/mood.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 6 | 🟢 0 | 🔴 0 | ⚪ 0 | 🟡 6 | 0 / 0 | — |
| **итого** | 6 | 🟢 0 | 🔴 0 | ⚪ 0 | 🟡 6 | 0 / 0 | — |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — mistranslation/major×1; OLD — style/minor×5, terminology/major×2, addition/minor×1, style/major×1, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/start/texts`— вердикт неустойчив

- **RU**: Оцените своё состояние до и после выполнения упражнений КПТ. Регулярные оценки помогают замечать динамику и понимать, как вы продвигаетесь. Вы можете выбирать удобный для себя формат. Мы предлагаем два варианта: Сначала дайте оценку утром. В течение дня выполн…
- **OLD**: Rate how you feel before and after doing CBT exercises. Regular check-ins help you notice changes over time and understand how you’re progressing. You can choose the format that works best for you. We suggest two options: First, check in with yourself in the m…
- **NEW**: Rate how you feel before and after your CBT exercises. Regular check-ins help you notice progress and understand how you’re moving forward. You can choose the format that works best for you. We suggest two options: First, do a check-in in the morning. Througho…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more concise, follows the UX guidelines perfectly, and uses the correct terminology ('psychologist' instead of 'therapist'). Translation B introduces unnecessary complexity and uses 'therapist', which contradicts the glossary.
  - [old/terminology/major] Used 'therapist' instead of the required 'psychologist'
  - [old/style/minor] Phrasing like 'check in with yourself' and 'rate your state' is slightly more wordy and less punchy than A's UX-friendly approach
  - [old/addition/minor] Added 'behavioral' to experiments, which wasn't in the original
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more idiomatic and flows better as a piece of supportive guidance. It uses natural phrasing like 'notice changes over time' and 'the one that feels most natural for you', whereas B feels slightly more repetitive and mechanical.
  - [new/style/minor] The phrase 'try new experiments' is a bit clunky compared to the standard CBT term 'run behavioral experiments' or simply 'do experiments'.
  - [new/style/minor] The sentence structure in the fourth paragraph is slightly fragmented compared to the smoother flow in A.

#### 🟡 en `/finish/texts`— вердикт неустойчив

- **RU**: Вы уже сделали первую оценку. Теперь попробуйте немного поддержать своё состояние и улучшить самочувствие. Вы можете воспользоваться инструментами приложения или пройти сессию с психологом — выберите то, что будет для вас комфортно. Когда завершите, возвращайт…
- **OLD**: You’ve already completed your initial check-in. Now try to support yourself a little and gently improve how you’re feeling. You can use the tools in the app or have a session with your psychologist — choose whatever feels most comfortable for you. When you’re …
- **NEW**: You’ve already completed your first check-in. Now, try to support yourself and improve how you feel. You can use the tools in the app or have a session with a psychologist — choose whatever feels most comfortable for you. Once you’re done, come back here and r…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more natural and follows the UX guidelines perfectly. Translation B uses 'evaluate your state' and 'reassess', which sound overly clinical and heavy compared to the warm, supportive tone required.
  - [old/style/major] 'evaluate your state' and 'reassess' are too formal/clinical; 'how you feel' or 'rate your mood' is better for a supportive tone.
  - [old/terminology/minor] 'your psychologist' implies the user already has one, whereas the original 'с психологом' is more general.
  - [old/style/minor] 'how things have shifted' is a bit wordy compared to the direct 'see changes'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 84)
  - Translation A sounds more natural and empathetic, using 'how you're feeling' and 'how things have shifted' which fits the 'understanding friend' tone. Translation B is slightly more clinical and repetitive.
  - [new/style/minor] The phrase 'rate how you feel again' is a bit clunky compared to 'evaluate your state once again' or 'reassess'.
  - [new/style/minor] The phrase 'throughout the day' changes the nuance of 'в течение дня' (within the day/later in the day) to imply a continuous process, whereas the original suggests a single follow-up point.

#### 🟡 en `/start/h2`— вердикт неустойчив

- **RU**: Ежедневная оценка самочувствия
- **OLD**: Daily Well-Being Check-In
- **NEW**: Daily well-being check-in
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A correctly follows the 'sentence case' rule for UI elements as specified in the instructions, whereas Translation B uses Title Case, which is incorrect for this context.
  - [old/style/minor] Uses Title Case instead of sentence case for a UI label
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - The original is a title/header. According to the style guide, titles can use Title Case, and 'Daily Well-Being Check-In' looks more professional and polished for a header than sentence case.
  - [new/style/minor] Uses sentence case for a title, which is less common for main headers in this context compared to Title Case.

#### 🟡 en `/finishScore/texts`— вердикт неустойчив

- **RU**: Этот показатель отражает, насколько продуктивно вы поработали в приложении — он учитывает несколько важных параметров. Чем выше итоговый результат, тем увереннее и быстрее вы продвигаетесь к улучшению своего психологического самочувствия.
- **OLD**: This metric reflects how productively you used the app — it takes several key factors into account. The higher your final score, the more confidently and quickly you move toward better psychological well-being.
- **NEW**: This score reflects how productively you’ve worked in the app — it takes several important parameters into account. The higher your score, the more confidently and quickly you’re moving toward improving your mental well-being.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A follows the project's terminology guidelines perfectly, using 'mental well-being' instead of the more academic 'psychological well-being', and uses natural present perfect for the user's progress. Translation B uses 'metric' and 'factors', which sound slightly more clinical/dry, and fails to use the preferred term for well-being.
  - [old/terminology/major] used 'psychological well-being' instead of the required 'mental well-being'
  - [old/style/minor] the phrasing 'how productively you used the app' is slightly less natural than 'how productively you've worked in the app' in this context
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Translation A is more idiomatic and follows the project's terminology perfectly. Translation B uses 'parameters' (a bit too technical/clunky) and 'worked in the app' (a literal calque of the Russian 'поработали'), whereas 'used the app' is much more natural for a native speaker.
  - [new/style/minor] 'worked in the app' is a literal translation of the Russian verb; 'used the app' is more natural.
  - [new/style/minor] 'parameters' sounds slightly more technical/robotic than 'factors' in this context.
  - [new/terminology/minor] Used 'mental well-being' instead of the preferred 'psychological well-being' for this specific context, though both are acceptable, A is more precise to the original.

#### 🟡 en `/finish/h2`— вердикт неустойчив

- **RU**: Повторная оценка самочувствия
- **OLD**: Reassess Your Well-Being
- **NEW**: Re-evaluate your well-being
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A follows the required sentence case for UI elements, whereas Translation B incorrectly uses Title Case. Translation A also feels more natural for a recurring action in a mental health app.
  - [old/style/minor] Uses Title Case instead of the required sentence case for UI strings
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A follows the sentence case rule for UI elements and uses a more natural, punchy verb for a re-assessment action. Translation B uses a hyphenated verb which is slightly more formal/clunky and fails the sentence case requirement.
  - [new/style/minor] Uses Title Case instead of sentence case; 'Re-evaluate' is slightly more academic than 'Reassess' in a UX context.

#### 🟡 en `/finishScore/h2`— вердикт неустойчив

- **RU**: Эффективность сегодня
- **OLD**: Today’s effectiveness
- **NEW**: Today’s progress
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 90 / NEW 75)
  - Translation A is a faithful and accurate rendering of the original. Translation B changes the meaning from 'effectiveness' to 'progress', which is a semantic shift.
  - [new/mistranslation/major] The word 'progress' does not mean 'effectiveness'; it changes the core meaning of the phrase.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 60 / NEW 95)
  - In a mental health or productivity context, 'progress' is the natural way to describe how well someone is doing or achieving their goals. 'Effectiveness' sounds overly clinical, robotic, and is a literal translation (calque) of the Russian 'эффективность'.
  - [old/style/major] Uses a literal translation of 'эффективность' which sounds unnatural in a UX/app context; 'progress' or 'productivity' would be better.

