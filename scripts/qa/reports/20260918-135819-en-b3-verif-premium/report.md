# QA: слепое парное сравнение переводов — en-b3-verif-premium

- **Дата**: 2026-09-18T10:58:19.166Z
- **Метка**: en-b3-verif-premium
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD~1
- **Файлы**: texts/premium.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 7
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: a4b1791ebbc7f608e45e9add25437bef463f001c

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## texts/premium.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 14 | 🟢 8 | 🔴 1 | ⚪ 0 | 🟡 5 | 0 / 0 | 89% |
| **итого** | 14 | 🟢 8 | 🔴 1 | ⚪ 0 | 🟡 5 | 0 / 0 | 89% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×3; OLD — style/minor×10, terminology/minor×3, style/major×3, addition/minor×1, terminology/major×1

### Детали пар (для спот-чека)

#### 🟢 en `/list/0/description` — NEW лучше (2:0)

- **RU**: Заполнять дневник автоматических мыслей порой бывает непросто. Наша система рекомендаций поможет вам в этом: подскажет, поддержит и аккуратно направит, чтобы избежать ошибок. Так работа с мыслями станет понятнее и комфортнее.
- **OLD**: Keeping an automatic thought diary can sometimes be challenging. Our AI recommendation system offers gentle prompts, supports you and guides you around common pitfalls so that working with your thoughts becomes clearer and more comfortable.
- **NEW**: Keeping an automatic thought journal can sometimes be challenging. Our recommendation system is here to help—offering guidance and support to help you navigate your thoughts more clearly and comfortably.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is much more natural and follows the 'supportive friend' tone, whereas A is wordy and uses clunky phrasing like 'guides you around common pitfalls'. B also correctly uses the project-standard term 'journal' instead of 'diary'.
  - [old/terminology/minor] used 'diary' instead of the required 'journal'
  - [old/style/major] clunky and heavy phrasing: 'guides you around common pitfalls' and 'offers gentle prompts, supports you and guides you' is repetitive and lacks rhythm
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 92)
  - Translation A is more idiomatic and flows better as a cohesive piece of text. Translation B uses 'diary' instead of the project-standard 'journal' and feels slightly cluttered with repetitive verbs.
  - [old/terminology/major] Used 'diary' instead of the required 'journal'.
  - [old/style/minor] The phrasing 'supports you and guides you around' is a bit clunky compared to the smoother flow of A.

#### 🟡 en `/last/advantages`— вердикт неустойчив

- **RU**: Экспорт данных в формате CSV Автосинхронизация данных с психологом Таймер для расслабляющих звуков Защита от повышения цены на подписку
- **OLD**: Data export in CSV format Automatic data sync with your psychologist Timer for relaxing sounds Protection against subscription price increases
- **NEW**: Export data as a CSV file Automatic data sync with your psychologist Timer for relaxing sounds Price protection for your subscription
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 85)
  - Translation A is more precise and professional, maintaining the noun-heavy structure typical of feature lists. Translation B's 'Price protection for your subscription' sounds slightly awkward compared to the more standard 'Protection against subscription price increases'.
  - [new/style/minor] The phrasing 'Price protection for your subscription' is a bit clunky for a feature list.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A uses more natural, concise UX patterns (e.g., 'Export data as...' instead of the heavy 'Data export in...').
  - [old/style/minor] The first line is a bit heavy/nominal; 'Data export in CSV format' sounds more like a technical manual than a clean app feature list.

#### 🟢 en `/list/7/description` — NEW лучше (2:0)

- **RU**: Добавляйте изображения к своим заметкам, чтобы передавать эмоции и контекст точнее. Все фото будут синхронизированы между устройствами и, при необходимости, доступны вашему психологу.
- **OLD**: Add images to your notes to convey emotions and context more precisely. All photos are synced across your devices and, if you choose, can be shared with your psychologist.
- **NEW**: Add images to your entries to convey emotions and context more accurately. All photos will be synced across your devices and, if needed, can be shared with your psychologist.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses the correct terminology ('entries' instead of 'notes') and maintains the future tense ('will be synced') which accurately reflects the original intent. Translation B uses 'notes', which is a less precise term for journal entries in this context, and 'are synced', which sounds more like a static state than a functional promise.
  - [old/terminology/minor] Used 'notes' instead of the standard 'entries' for journal records.
  - [old/style/minor] Changed 'if necessary' to 'if you choose', which slightly alters the nuance of the original intent.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation B uses the correct project terminology ('entries' instead of 'notes') and maintains the future tense ('will be synced') which matches the original intent. Translation A's use of 'if you choose' is a slight addition/deviation from 'if necessary'.
  - [old/terminology/minor] Used 'notes' instead of the standard 'entries'
  - [old/style/minor] Changed 'if necessary' to 'if you choose', which slightly alters the nuance

#### 🟢 en `/list/1/description` — NEW лучше (2:0)

- **RU**: Делитесь своими переживаниями с нашим AI, и он поможет взглянуть на ситуацию под новым углом. Искусственный интеллект предложит поддерживающие рекомендации и покажет когнитивные искажения, чтобы вы могли работать с ними более эффективно.
- **OLD**: Share your experiences with our AI, and it will help you look at your situation from a fresh perspective. The system will offer supportive recommendations and highlight cognitive distortions so you can work with them more effectively.
- **NEW**: Share your experiences with our AI to gain a fresh perspective. The AI provides supportive recommendations and identifies cognitive distortions, helping you work through them more effectively.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more concise, professional, and follows the 'expert friend' tone perfectly. Translation B is wordy, uses 'the system' (which sounds cold/robotic), and contains unnecessary filler words.
  - [old/style/minor] The phrase 'the system' sounds too clinical and impersonal compared to the warm tone required.
  - [old/style/minor] Overly wordy construction ('and it will help you look at your situation from a fresh perspective') compared to the more natural 'to gain a fresh perspective'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and concise, using 'work through' (the correct CBT collocation) and avoiding the repetitive 'The system' used in A. It flows much more naturally for a native speaker.
  - [old/style/minor] Using 'The system' feels a bit cold/robotic compared to the warm tone of the original; 'work with them' is less idiomatic than 'work through them' in a CBT context.

#### 🟢 en `/list/0/title` — NEW лучше (2:0)

- **RU**: AI рекомендации при заполнении дневника
- **OLD**: AI guidance for your thought diary
- **NEW**: AI-powered journaling guidance
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is concise, professional, and uses the idiomatic 'AI-powered' which is standard for modern UX. Translation B is wordy and uses 'thought diary', which is a clunky, non-standard way to refer to a journal in English.
  - [old/style/major] The phrase 'thought diary' sounds like a literal translation from Russian and is not a natural term for a mental health app; 'journal' is the standard.
  - [old/style/minor] The structure 'AI guidance for your...' is unnecessarily wordy for a UI heading/label.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B uses much more natural, modern UX terminology ('AI-powered', 'journaling'). Translation A uses 'thought diary', which is a clunky, non-standard term in English; the project glossary specifies 'journal'.
  - [old/terminology/major] Used 'thought diary' instead of the standard 'journal' or 'thought record'.
  - [old/style/minor] The phrasing 'for your thought diary' sounds like a literal translation from Russian and is not idiomatic for a feature title.

#### 🟡 en `/list/5/description`— вердикт неустойчив

- **RU**: Тесты созданы при участии профессиональных психологов и сопровождаются понятными пояснениями. Они помогут лучше понять себя и отслеживать изменения в состоянии со временем.
- **OLD**: Our tests are developed with input from professional psychologists and come with clear explanations. They help you understand yourself better and track changes in your state over time.
- **NEW**: Our tests are developed with professional psychologists and include clear explanations. They will help you understand yourself better and track changes in your mental well-being over time.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses 'mental well-being', which is the project's standard term for 'состояние' in this context, whereas B uses 'state', which sounds unnatural and vague in English. A also flows more smoothly as a professional yet supportive introduction.
  - [old/style/major] the word 'state' is a weak, non-idiomatic translation for 'состояние' in a mental health context; 'mental well-being' or 'mood' is preferred
  - [old/style/minor] the phrase 'come with' is slightly more casual than the polished 'include' used in A, though not strictly an error
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more natural and avoids the awkward phrasing 'developed with professional psychologists' (which implies they were the subjects of development). Translation B uses 'mental well-being' which is a good term, but 'changes in your state' in A is a more direct and natural way to describe fluctuations in mood/condition in this context.
  - [new/style/major] The phrase 'developed with professional psychologists' sounds like the psychologists were the ones being developed, rather than contributors to the creation process.
  - [new/style/minor] The use of 'They will help' is slightly more formal/predictive than the more immediate 'They help' used in A, which fits the 'understanding friend' tone better.

#### 🟢 en `/terms/texts` — NEW лучше (2:0)

- **RU**: Для подписок на 3 и 12 месяцев предусмотрен пробный период на 3 дня. После его завершения сумма, соответствующая выбранному периоду, будет списана автоматически. Оплачивая подписку впервые, вы подтверждаете согласие на последующие автоматические списания средс…
- **OLD**: Subscriptions for 3 and 12 months include a 3-day trial period. After the trial period ends, the corresponding amount for the selected period will be automatically charged. By making the first payment, you agree to further automatic charges according to your c…
- **NEW**: A 3-day trial period is provided for 3-month and 12-month subscriptions. Once the trial ends, the amount corresponding to your chosen plan will be charged automatically. By making your first subscription payment, you agree to subsequent automatic charges accor…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation B is more concise, professional, and follows the UX guidelines better (e.g., using 'Premium' as a proper noun and avoiding wordy phrases like 'no money will be charged from your card').
  - [old/style/minor] The phrase 'no money will be charged from your card' is slightly clunky/unnatural compared to 'you will not be charged'.
  - [old/addition/minor] Added 'in the app' which wasn't in the original.
  - [new/style/minor] The phrase 'after a payment has been processed' is slightly more formal than the original, but fits the legal/billing context well.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is more professional, concise, and follows the UX guidelines perfectly. Translation B contains several clunky phrases ('no money will be charged from your card') and a mistranslation regarding the cancellation logic in the fifth paragraph.
  - [old/mistranslation/major] The original says 'If you cancel after payment, access is retained'. B says 'If you cancel the subscription renewal after making a payment...', which changes the meaning to canceling the renewal specifically, whereas A correctly addresses the cancellation of the subscription itself.
  - [old/style/minor] The phrase 'no money will be charged from your card' is wordy and less professional than 'you will not be charged'.
  - [old/omission/minor] In point 2, B omits 'without your consent', which is a key legal/clarity component of the original.

#### 🟡 en `/list/4/title`— вердикт неустойчив

- **RU**: Синхронизация между всеми устройствами
- **OLD**: Sync across all your devices
- **NEW**: Sync across all devices
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A is more natural and follows the 'warm, expert friend' tone by using the possessive 'your', which is standard for modern UX/UI. Translation B is slightly more clinical/dry.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 100)
  - Translation A is more concise and follows standard UX patterns for technical features. Translation B adds 'your', which is grammatically correct but slightly wordier than necessary for a feature label.
  - [old/style/minor] unnecessary addition of 'your' for a UI label

#### 🟡 en `/list/7/title`— вердикт неустойчив

- **RU**: Добавление изображений к записям
- **OLD**: Attach images to your entries
- **NEW**: Add images to your entries
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A uses 'Attach', which is a more natural and idiomatic verb for adding files or media to an existing entry in a digital context. Translation B is grammatically correct but sounds slightly more literal/mechanical.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A uses 'Add', which is the standard, direct imperative for UI actions. Translation B uses 'Attach', which is grammatically correct but sounds slightly more technical/formal (like email attachments) rather than a natural app feature.

#### 🔴 en `/last/title` — OLD лучше (2:0)

- **RU**: Также будут доступны следующие функции:
- **OLD**: You also get access to the following features:
- **NEW**: The following features are also available:
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A is more engaging and fits the 'understanding friend' tone of the app by using the active 'You get access'. Translation B is a standard, slightly dry passive construction.
  - [new/style/minor] Passive voice makes it sound more like a formal manual than a supportive app interface.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation B is more engaging and fits the 'understanding friend-expert' tone of the app, whereas A is a bit dry and passive. B sounds more like a benefit being offered to the user.
  - [new/style/minor] Sounds slightly more like a formal manual/documentation rather than a supportive app interface.

#### 🟢 en `/list/2/title` — NEW лучше (2:0)

- **RU**: Безопасность персональных данных
- **OLD**: Personal data security
- **NEW**: Data privacy and security
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - While A is a literal translation, B is the standard, idiomatic way to express this concept in English-speaking markets (Data privacy and security).
  - [old/style/minor] Sounds slightly more like a direct translation from Russian; 'Data privacy' is a more natural pairing for security in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is the standard, idiomatic way to express this concept in English (Data privacy and security). Translation B is grammatically correct but sounds slightly more like a technical specification or a narrow legal heading rather than a user-friendly section title.
  - [old/style/minor] Lacks the 'privacy' aspect which is standard for this heading; sounds a bit clipped/dry compared to the idiomatic 'Data privacy and security'.

#### 🟢 en `/list/4/description` — NEW лучше (2:0)

- **RU**: Ваши записи надёжно зашифрованы и хранятся на сервере. Это позволяет вам работать с дневником на разных устройствах и иметь доступ к своим данным всегда и везде.
- **OLD**: Your entries are securely encrypted and stored on our server. This lets you work with your diary on different devices and have access to your data anytime, anywhere.
- **NEW**: Your entries are securely encrypted and stored on our server. This allows you to use your journal on different devices and access your data anytime, anywhere.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A uses the correct project terminology ('journal' instead of 'diary') and sounds more natural for a modern app. Translation B uses 'work with your diary', which is a clunky calque of the Russian 'работать с дневником'.
  - [old/terminology/major] Used 'diary' instead of the required 'journal'
  - [old/style/minor] 'work with your journal' is an unnatural phrasing in English; 'use your journal' is much better
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B follows the project glossary by using 'journal' instead of 'diary' and uses more professional 'allows you to' instead of the slightly more colloquial 'lets you'.
  - [old/terminology/major] Used 'diary' instead of the required 'journal'
  - [old/style/minor] The phrasing 'work with your diary' is a bit clunky compared to 'use your journal'

#### 🟡 en `/list/3/description`— вердикт неустойчив

- **RU**: Мы используем современные технологии распознавания речи с анализом эмоций. Приложение расставит знаки препинания и структурирует текст, чтобы он выглядел аккуратно. Получайте готовые записи в несколько раз быстрее, чем при вводе вручную.
- **OLD**: We use advanced speech recognition with emotion analysis. The app adds punctuation and structures your text so it looks neat and clear. Get complete entries several times faster than typing by hand.
- **NEW**: We use advanced speech recognition technology with emotion analysis. The app automatically adds punctuation and structures your text to keep it neat, allowing you to create entries much faster than typing manually.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more fluid and sounds like professional UX copy. Translation B feels slightly fragmented and uses 'Get complete entries', which is a bit clunky compared to the more natural 'allowing you to create entries'.
  - [old/style/minor] The sentence structure is a bit choppy; 'Get complete entries' sounds slightly unnatural in this context.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 86)
  - Translation A is more punchy, natural, and follows the UX principle of brevity. Translation B is slightly wordy and uses a heavy 'allowing you to' construction which feels less like a modern app and more like a manual.
  - [new/style/minor] The phrase 'allowing you to create entries' is a bit heavy/wordy for a feature description; 'typing manually' is slightly redundant compared to 'typing by hand' or just 'typing'.

#### 🟢 en `/list/6/description` — NEW лучше (2:0)

- **RU**: Мы собрали большую базу знаний по психологическому благополучию и продолжаем её расширять. Читайте статьи без ограничений и открывайте новые способы заботиться о себе каждый день.
- **OLD**: We’ve built a rich knowledge base on psychological well-being and keep expanding it. Read articles without limits and discover new ways to take care of yourself every day.
- **NEW**: We have built an extensive knowledge base on mental well-being and are constantly expanding it. Read unlimited articles and discover new ways to practice self-care every day.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A follows the glossary perfectly by using 'mental well-being' instead of the more academic 'psychological well-being' and uses the idiomatic 'practice self-care'.
  - [old/terminology/minor] used 'psychological well-being' instead of the preferred 'mental well-being'
  - [old/style/minor] 'Read articles without limits' is slightly clunky compared to 'Read unlimited articles'
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B uses the project-standard term 'mental well-being' and more natural, idiomatic phrasing ('unlimited articles', 'practice self-care'). Translation A uses 'psychological well-being', which is slightly too academic for this context, and 'take care of yourself' is a bit more literal than the polished 'practice self-care'.
  - [old/terminology/minor] used 'psychological well-being' instead of the preferred 'mental well-being'
  - [old/style/minor] 'Read articles without limits' is slightly clunkier than 'Read unlimited articles'

