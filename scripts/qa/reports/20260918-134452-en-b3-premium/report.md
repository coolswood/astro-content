# QA: слепое парное сравнение переводов — en-b3-premium

- **Дата**: 2026-09-18T10:44:52.883Z
- **Метка**: en-b3-premium
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: texts/premium.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 8b5b94950329db2cb35cf00c251ee0fc00dc888f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## texts/premium.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 16 | 🟢 10 | 🔴 2 | ⚪ 0 | 🟡 4 | 0 / 0 | 83% |
| **итого** | 16 | 🟢 10 | 🔴 2 | ⚪ 0 | 🟡 4 | 0 / 0 | 83% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×3; OLD — style/minor×12, terminology/minor×3, terminology/major×3, style/major×2, mistranslation/minor×1, mistranslation/major×1, omission/minor×1

### Детали пар (для спот-чека)

#### 🟢 en `/list/7/description` — NEW лучше (2:0)

- **RU**: Добавляйте изображения к своим заметкам, чтобы передавать эмоции и контекст точнее. Все фото будут синхронизированы между устройствами и, при необходимости, доступны вашему психологу.
- **OLD**: Add images to your notes to convey emotions and context more precisely. All photos are synced across your devices and, if you choose, can be shared with your psychologist.
- **NEW**: Add images to your entries to convey emotions and context more accurately. All photos will be synced across your devices and, if needed, can be shared with your psychologist.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B uses the correct project terminology ('entries' instead of 'notes') and follows the original tense and nuance ('will be synced' and 'if needed') more accurately.
  - [old/terminology/minor] Used 'notes' instead of the standard 'entries' for journal records.
  - [old/mistranslation/minor] Changed 'if necessary' to 'if you choose', which slightly alters the tone from functional necessity to user preference.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A uses the correct terminology ('entries' instead of 'notes') and maintains the future tense ('will be synced') which accurately reflects the original intent. Translation B uses 'notes', which is a less precise term for journal entries in this context, and 'are synced', which sounds slightly more static than the intended functional promise.
  - [old/terminology/minor] uses 'notes' instead of the standard 'entries' for journal records
  - [old/style/minor] uses 'if you choose' instead of 'if needed', slightly changing the nuance of necessity

#### 🟡 en `/list/3/description`— вердикт неустойчив

- **RU**: Мы используем современные технологии распознавания речи с анализом эмоций. Приложение расставит знаки препинания и структурирует текст, чтобы он выглядел аккуратно. Получайте готовые записи в несколько раз быстрее, чем при вводе вручную.
- **OLD**: We use advanced speech recognition with emotion analysis. The app adds punctuation and structures your text so it looks neat and clear. Get complete entries several times faster than typing by hand.
- **NEW**: We use advanced speech recognition technology with emotion analysis. The app automatically adds punctuation and structures your text to keep it neat, allowing you to create entries much faster than typing manually.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 86)
  - Translation A is punchier, more direct, and follows the UX principle of brevity. Translation B is slightly wordy and uses a heavy 'allowing you to' construction which feels less like a modern app and more like a manual.
  - [new/style/minor] The phrase 'allowing you to create entries' is a bit wordy/clunky for a feature description; 'typing manually' is slightly redundant compared to 'typing by hand' or just 'typing'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more fluid and professional, using a natural 'allowing you to...' construction that connects the features to the user benefit. Translation B feels slightly choppy and uses 'Get complete entries', which is a bit clunky compared to the more idiomatic 'create entries'.
  - [old/style/minor] The sentence structure is a bit fragmented (choppy rhythm) compared to the smooth flow of A.

#### 🟢 en `/terms/texts` — NEW лучше (2:0)

- **RU**: Для подписок на 3 и 12 месяцев предусмотрен пробный период на 3 дня. После его завершения сумма, соответствующая выбранному периоду, будет списана автоматически. Оплачивая подписку впервые, вы подтверждаете согласие на последующие автоматические списания средс…
- **OLD**: Subscriptions for 3 and 12 months include a 3-day trial period. After the trial period ends, the corresponding amount for the selected period will be automatically charged. By making the first payment, you agree to further automatic charges according to your c…
- **NEW**: A 3-day trial period is provided for 3-month and 12-month subscriptions. Once the trial ends, the amount corresponding to your chosen plan will be charged automatically. By making your first subscription payment, you agree to subsequent automatic charges accor…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is more professional, concise, and follows the UX guidelines perfectly. Translation B contains several clunky phrases ('no money will be charged from your card') and a significant mistranslation regarding the cancellation logic in the fifth paragraph.
  - [old/mistranslation/major] The original says 'If you cancel after payment, access is retained'. B says 'If you cancel the subscription renewal after making a payment...', which changes the logic of the sentence and makes it confusing.
  - [old/style/minor] The phrase 'no money will be charged from your card' is too wordy and informal for a legal/subscription notice; 'you will not be charged' is the standard UX pattern.
  - [old/style/minor] Uses 'premium features' (lowercase) instead of the brand-specific 'Premium features' (capitalized) as per the glossary/context.
  - [old/omission/minor] In point 2, 'without your consent' is omitted, which is a key legal qualifier in the original.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation B is more concise, professional, and follows the UX guidelines better. It uses 'Premium' (capitalized as per instructions) and avoids wordy, slightly unnatural phrases like 'no money will be charged from your card' found in A.
  - [old/style/minor] The phrase 'no money will be charged from your card' is a bit clunky/wordy for UX; 'you will not be charged' is more natural.
  - [old/addition/minor] Added 'in the app' which was not in the original.
  - [old/style/minor] Uses 'premium features' instead of the brand-aligned 'Premium features'.
  - [new/style/minor] The phrase 'after a payment has been processed' is slightly more formal than the original, but fits the legal/subscription context well.

#### 🟡 en `/last/title`— вердикт неустойчив

- **RU**: Также будут доступны следующие функции:
- **OLD**: You also get access to the following features:
- **NEW**: The following features are also available:
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is a direct, professional, and standard way to introduce a list of features in a UI/UX context. Translation B is slightly more wordy and adds a sense of 'getting access' which isn't explicitly in the source.
  - [old/style/minor] Slightly more verbose than necessary for a standard feature list introduction.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Translation A uses a more engaging, user-centric tone ('You get access'), which fits the 'understanding friend' persona, whereas B is a passive, dry, and somewhat robotic construction.
  - [new/style/minor] Passive voice makes the text feel like a dry manual rather than a warm app interface.

#### 🟢 en `/list/2/title` — NEW лучше (2:0)

- **RU**: Безопасность персональных данных
- **OLD**: Personal data security
- **NEW**: Data privacy and security
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation A is the standard, idiomatic way to express this concept in English (Data privacy and security). Translation B is grammatically correct but sounds slightly more like a technical specification rather than a user-facing heading.
  - [old/style/minor] Lacks the 'privacy' aspect which is implied in the Russian 'Безопасность персональных данных' in a legal/UX context, and sounds slightly less natural as a heading.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - While A is a literal translation, B is the standard, idiomatic way to express this concept in English-speaking markets (Data privacy and security).
  - [old/style/minor] Sounds slightly more like a direct translation from Russian; 'Data privacy' is a more natural pairing with 'security' in this context.

#### 🟢 en `/list/0/description` — NEW лучше (2:0)

- **RU**: Заполнять дневник автоматических мыслей порой бывает непросто. Наша система рекомендаций поможет вам в этом: подскажет, поддержит и аккуратно направит, чтобы избежать ошибок. Так работа с мыслями станет понятнее и комфортнее.
- **OLD**: Keeping an automatic thought diary can sometimes be challenging. Our AI recommendation system offers gentle prompts, supports you and guides you around common pitfalls so that working with your thoughts becomes clearer and more comfortable.
- **NEW**: Keeping an automatic thought journal can sometimes be challenging. Our recommendation system is here to help—offering guidance and support to help you navigate your thoughts more clearly and comfortably.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation B is much more natural and follows the 'understanding friend' tone, whereas A is wordy and uses clunky phrasing like 'guides you around common pitfalls'. B also correctly uses the project-standard term 'journal' instead of 'diary'.
  - [old/terminology/minor] Used 'diary' instead of the required 'journal'.
  - [old/style/major] The phrase 'guides you around common pitfalls' is a heavy, non-idiomatic construction; 'offers gentle prompts' is also a bit wordy for this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 92)
  - Translation A is much more natural and follows the 'supportive friend' tone, whereas B is wordy and uses 'diary' instead of the required 'journal'.
  - [old/terminology/major] Used 'diary' instead of the project-standard 'journal'.
  - [old/style/minor] The phrasing 'guides you around common pitfalls' is a bit clunky and literal compared to the smoother A.
  - [old/addition/minor] Added 'AI' which was not in the original text.

#### 🟢 en `/list/4/description` — NEW лучше (2:0)

- **RU**: Ваши записи надёжно зашифрованы и хранятся на сервере. Это позволяет вам работать с дневником на разных устройствах и иметь доступ к своим данным всегда и везде.
- **OLD**: Your entries are securely encrypted and stored on our server. This lets you work with your diary on different devices and have access to your data anytime, anywhere.
- **NEW**: Your entries are securely encrypted and stored on our server. This allows you to use your journal on different devices and access your data anytime, anywhere.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B follows the project glossary by using 'journal' instead of 'diary' and uses more professional, natural phrasing ('allows you to use' vs 'lets you work with').
  - [old/terminology/major] Used 'diary' instead of the required 'journal'
  - [old/style/minor] 'Work with your diary' sounds slightly unnatural/clunky compared to 'use your journal'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A follows the project glossary by using 'journal' instead of 'diary' and uses more natural phrasing ('use your journal' vs 'work with your diary').
  - [old/terminology/major] Used 'diary' instead of the required 'journal'
  - [old/style/minor] 'work with your journal' is a bit clunky compared to 'use your journal'

#### 🟢 en `/list/0/title` — NEW лучше (2:0)

- **RU**: AI рекомендации при заполнении дневника
- **OLD**: AI guidance for your thought diary
- **NEW**: AI-powered journaling guidance
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A uses professional, idiomatic UX terminology ('AI-powered') and follows the project's glossary ('journaling'). Translation B is clunky, uses 'thought diary' (which is not a standard term), and sounds like a literal translation from Russian.
  - [old/terminology/major] Used 'thought diary' instead of the standard 'journal' or 'thought record'.
  - [old/style/major] The phrasing 'guidance for your thought diary' is unnatural and wordy for a UI header.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B uses the idiomatic 'AI-powered' and the standard term 'journaling', whereas Translation A uses 'thought diary', which is a clunky, non-standard calque of the Russian 'дневник мыслей'.
  - [old/terminology/major] Used 'thought diary' instead of the standard 'journal' or 'journaling'.
  - [old/style/minor] The phrasing 'guidance for your... diary' sounds unnatural compared to 'journaling guidance'.

#### 🟢 en `/list/6/description` — NEW лучше (2:0)

- **RU**: Мы собрали большую базу знаний по психологическому благополучию и продолжаем её расширять. Читайте статьи без ограничений и открывайте новые способы заботиться о себе каждый день.
- **OLD**: We’ve built a rich knowledge base on psychological well-being and keep expanding it. Read articles without limits and discover new ways to take care of yourself every day.
- **NEW**: We have built an extensive knowledge base on mental well-being and are constantly expanding it. Read unlimited articles and discover new ways to practice self-care every day.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Translation B uses the project-standard term 'mental well-being' and more natural, idiomatic phrasing ('unlimited articles', 'practice self-care'). Translation A uses 'psychological well-being', which is slightly too academic for this context, and 'without limits' sounds a bit clunky.
  - [old/terminology/minor] used 'psychological well-being' instead of the preferred 'mental well-being'
  - [old/style/minor] 'Read articles without limits' is less idiomatic than 'Read unlimited articles'
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A follows the project's terminology guidelines perfectly, using 'mental well-being' instead of the more academic 'psychological well-being'. It also uses more natural, idiomatic phrasing ('unlimited articles' vs 'articles without limits').
  - [old/terminology/minor] used 'psychological well-being' instead of the preferred 'mental well-being'
  - [old/style/minor] 'articles without limits' sounds slightly clunky compared to 'unlimited articles'

#### 🟢 en `/list/7/title` — NEW лучше (2:0)

- **RU**: Добавление изображений к записям
- **OLD**: Attach images to your entries
- **NEW**: Add images to your entries
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Translation B is a direct and natural translation of the original action. Translation A uses 'Attach', which is grammatically correct but implies a different UX pattern (like an email attachment) rather than the simple act of adding content to a journal entry.
  - [old/style/minor] The verb 'Attach' is slightly less natural for a journal entry context than 'Add' or 'Include'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Translation A uses the more natural and standard UX term 'Add' for this context, whereas 'Attach' sounds slightly more technical/formal (like email attachments).
  - [old/style/minor] 'Attach' is grammatically correct but less common for a friendly, modern app interface than 'Add'.

#### 🟡 en `/list/4/title`— вердикт неустойчив

- **RU**: Синхронизация между всеми устройствами
- **OLD**: Sync across all your devices
- **NEW**: Sync across all devices
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 92)
  - Translation A is more natural for a user-facing interface as it uses the possessive 'your', creating a more personal and engaging tone. Translation B is grammatically correct but sounds slightly more clinical or generic.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 95 / NEW 100)
  - Translation A is more concise and follows standard UX patterns for feature descriptions. Translation B adds 'your', which is grammatically correct but slightly more wordy for a UI label.
  - [old/style/minor] unnecessary addition of 'your' for a brief UI string

#### 🔴 en `/list/2/description` — OLD лучше (2:0)

- **RU**: Вы можете установить пароль на вход в приложение, а ваши данные будут дополнительно зашифрованы. Это обеспечивает высокий уровень защиты и гарантирует, что доступ к вашим записям будет только у вас.
- **OLD**: You can set a password to enter the app, and your data is additionally encrypted. This provides a high level of protection and ensures that only you have access to your entries.
- **NEW**: You can set a passcode to enter the app, and your data is further protected by encryption. This ensures a high level of security, guaranteeing that your entries remain accessible only to you.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Translation A is more direct, natural, and follows the UX principle of simplicity. Translation B is slightly wordy and uses a heavy, passive construction ('protected by encryption') which feels less like a modern app interface.
  - [new/style/minor] The phrase 'guaranteeing that your entries remain accessible only to you' is unnecessarily long and heavy for a security notice.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more direct, natural, and follows the original structure more closely without unnecessary wordiness. Translation A's phrasing 'guaranteeing that your entries remain accessible only to you' is slightly clunky and shifts the focus to accessibility rather than access control.
  - [new/style/minor] The phrase 'guaranteeing that your entries remain accessible only to you' is a bit wordy and less punchy than the original's intent.

#### 🔴 en `/list/3/title` — OLD лучше (2:0)

- **RU**: AI-распознавание речи
- **OLD**: AI-powered speech recognition
- **NEW**: AI voice recognition
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation A uses the more professional and standard industry term 'speech recognition', whereas B uses 'voice recognition', which is slightly more colloquial. A also correctly captures the nuance of 'AI-powered' for 'AI-распознавание'.
  - [new/style/minor] 'Voice recognition' is acceptable but 'speech recognition' is the standard technical term for processing spoken language.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Translation B uses the more natural and professional 'AI-powered' construction, which is standard for tech products. Translation A is grammatically correct but sounds slightly more like a literal translation or a raw label.
  - [new/style/minor] A bit blunt/clipped; lacks the polished feel of 'AI-powered' typical for modern UX.

#### 🟡 en `/list/5/description`— вердикт неустойчив

- **RU**: Тесты созданы при участии профессиональных психологов и сопровождаются понятными пояснениями. Они помогут лучше понять себя и отслеживать изменения в состоянии со временем.
- **OLD**: Our tests are developed with input from professional psychologists and come with clear explanations. They help you understand yourself better and track changes in your state over time.
- **NEW**: Our tests are developed with professional psychologists and include clear explanations. They will help you understand yourself better and track changes in your mental well-being over time.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Translation A is more idiomatic and follows the project's terminology guidelines, specifically using 'mental well-being' instead of the literal and awkward 'state'.
  - [old/terminology/major] Used 'state' instead of the preferred 'mental well-being' or 'mood' for describing psychological condition.
  - [old/style/minor] The phrase 'come with' is slightly more casual/colloquial than 'include', though not a mistake; however, 'state' makes the sentence feel less professional.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Translation A is more natural and idiomatic. Translation B's phrase 'developed with professional psychologists' sounds like they were the subjects of the tests, whereas 'with input from' in A correctly conveys their participation/consultation.
  - [new/style/major] The phrase 'developed with professional psychologists' is ambiguous and sounds like the psychologists were the ones being developed or were the test subjects; 'with input from' or 'in collaboration with' is much better.
  - [new/style/minor] The use of 'They will help' is slightly more formal/predictive than the more direct 'They help' used in A, which fits the 'understanding friend' tone better.

#### 🟢 en `/last/advantages` — NEW лучше (2:0)

- **RU**: Экспорт данных в формате CSV Автосинхронизация данных с психологом Таймер для расслабляющих звуков Защита от повышения цены на подписку
- **OLD**: Data export in CSV format Automatic data sync with your psychologist Timer for relaxing sounds Protection against subscription price increases
- **NEW**: Export data as a CSV file Automatic data sync with your psychologist Timer for relaxing sounds Price protection for your subscription
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 94)
  - Translation B uses more natural, concise English phrasing for a UI context, particularly in the first and last items. Translation A is slightly more wordy and formal (e.g., 'in CSV format' vs 'as a CSV file').
  - [old/style/minor] The phrasing 'Data export in CSV format' is a bit heavy/clunky for a feature list compared to 'Export data as a CSV file'.
  - [old/style/minor] 'Protection against subscription price increases' is grammatically correct but sounds overly long and bureaucratic for a benefit list.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Translation A uses more natural, concise UX patterns (e.g., 'Export data as...' instead of 'Data export in...'). Translation B's last line is too wordy and sounds like a literal translation of a legal clause rather than a feature benefit.
  - [old/style/minor] The first line is slightly heavy/formal for a feature list; 'Data export in CSV format' is less punchy than 'Export data as a CSV file'.
  - [old/style/major] The last line 'Protection against subscription price increases' is overly long and clunky for a UI/feature list; 'Price protection' is the standard way to express this concept.

#### 🟢 en `/list/1/description` — NEW лучше (2:0)

- **RU**: Делитесь своими переживаниями с нашим AI, и он поможет взглянуть на ситуацию под новым углом. Искусственный интеллект предложит поддерживающие рекомендации и покажет когнитивные искажения, чтобы вы могли работать с ними более эффективно.
- **OLD**: Share your experiences with our AI, and it will help you look at your situation from a fresh perspective. The system will offer supportive recommendations and highlight cognitive distortions so you can work with them more effectively.
- **NEW**: Share your experiences with our AI to gain a fresh perspective. The AI provides supportive recommendations and identifies cognitive distortions, helping you work through them more effectively.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 95)
  - Translation A is more concise, flows better, and avoids the repetitive 'The system will...' structure found in B. It uses a more natural, professional tone for a mental health app.
  - [old/style/minor] The use of 'The system' feels a bit cold and robotic compared to the warmer 'The AI' or simply starting with the action.
  - [old/style/minor] The sentence structure is slightly wordy and less punchy than A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation B is more idiomatic and follows the 'expert friend' tone better by using active, concise verbs. Translation A uses 'The system', which sounds cold and robotic, violating the warm tone requirement.
  - [old/style/minor] The use of 'The system' is too formal/mechanical for a supportive AI assistant.
  - [old/style/minor] The sentence structure is slightly more wordy than necessary for a modern UX/app context.

