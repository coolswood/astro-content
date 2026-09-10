# QA: слепое парное сравнение переводов — diary-de-old-vs-new

- **Дата**: 2026-09-10T19:59:02.231Z
- **Метка**: diary-de-old-vs-new
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/pre-retranslate-20260910-diary
- **Файлы**: story/diary.json
- **Локали**: de
- **Сэмпл/файл**: 10
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:18000/v1
- **git HEAD**: dfc3438ef3704cb281f71defd66df4e4cefbc132

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/diary.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 7 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 2 | 100% |
| **итого** | 7 | 🟢 6 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 2 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×1; OLD — style/minor×7, terminology/major×6, omission/critical×2, mistranslation/major×1, omission/minor×1, style/major×1

### Детали пар (для спот-чека)

#### 🟢 de `/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Автоматическая мысль</h2> Этот блок посвящён тому, как мы интерпретируем ситуацию. Чтобы заметить свои мысли, спросите себя: «О чём я сейчас думаю?» Выделите самую значимую и эмоционально заряженную мысль. Если формулировка слишком общая, уточните её и сде…
- **OLD**: Automatischer Gedanke Dieser Block betrifft unsere Interpretation der Situation. Um Ihre Gedanken zu bemerken, fragen Sie sich: „Woran denke ich gerade?“ Heben Sie den am stärksten emotional aufgeladenen Gedanken hervor. Wenn die Formulierung zu vage ist, präz…
- **NEW**: <h2>Automatischer Gedanke</h2> Dieser Block widmet sich der Frage, wie wir eine Situation interpretieren. Um Ihre Gedanken zu bemerken, fragen Sie sich: „Worüber denke ich gerade nach?“ Identifizieren Sie den bedeutendsten und emotionalsten Gedanken. Wenn die …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Translation A is professional, follows all glossary requirements, and maintains the correct HTML structure. Translation B fails significantly by omitting HTML tags, using incorrect terminology ('Ereignis' instead of 'Situation'), and providing a non-standard translation for 'Adaptive Antwort'.
  - [old/omission/critical] All HTML tags (h2, li, important) were removed, which breaks the UI structure.
  - [old/terminology/major] Used 'Ereignis' instead of the required 'Situation'.
  - [old/terminology/major] Used 'Adaptiver Antwortsatz' instead of the required 'Alternative Antwort'.
  - [old/style/minor] The phrasing 'Ich bekomme nie etwas gut hin' is a bit too colloquial compared to the professional tone of A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Перевод B значительно лучше, так как он строго следует глоссарию (использует 'Situation' вместо 'Ereignis' и 'Alternative Antwort' вместо 'Adaptiver Antwortsatz') и сохраняет HTML-разметку. Перевод A содержит грубые ошибки в терминологии и теряет теги.
  - [old/omission/major] Полностью потеряны все HTML-теги (h2, li, important), что критично для структуры документа.
  - [old/terminology/major] Использовано 'Ereignis' вместо требуемого 'Situation'; 'Adaptiver Antwortsatz' — это неверная калька, в то время как в глоссарии указано 'Alternative Antwort'.
  - [old/style/minor] Фраза 'Adaptiver Antwortsatz' звучит неестественно для немецкого пользователя.
  - [new/style/minor] В разделе 'Körperliche Empfindungen' можно было бы использовать 'Druck im Bauch' вместо 'Schwere', но это допустимо.

#### 🟢 de `/title` — NEW лучше (2:0)

- **RU**: Дневник автоматических мыслей
- **OLD**: Tagebuch automatischer Gedanken
- **NEW**: Gedankentagebuch
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Перевод A использует устоявшийся термин 'Gedankentagebuch', который является стандартным названием инструмента СМЭР в немецкой КПТ согласно глоссарию. Перевод B грамматически верен, но звучит избыточно и менее естественно для интерфейса приложения.
  - [old/style/minor] Звучит как дословный перевод, в то время как в немецкой психологической практике используется компактное словосочетание 'Gedankentagebuch'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Перевод B использует устоявшийся в немецкой КПТ термин 'Gedankentagebuch', который звучит естественно и профессионально. Перевод A является грамматически верным, но звучит как тяжеловесная калька с русского.
  - [old/style/minor] Звучит избыточно и менее естественно для носителя, чем общепринятый термин 'Gedankentagebuch'.

#### 🟢 de `/screen_3/texts` — NEW лучше (2:0)

- **RU**: <h2>Зачем вести дневник автоматических мыслей?</h2> Ведение дневника — ключ к глубокому самопознанию: он помогает лучше понимать свои эмоции, мысли и поведение. Регулярные записи позволяют видеть повторяющиеся паттерны, влияющие на настроение и поступки. Проце…
- **OLD**: Warum ein Tagebuch automatischer Gedanken führen? Das Tagebuch ist ein Schlüssel zu tieferem Verständnis: Es hilft, eigene Emotionen, Gedanken und Verhaltensweisen besser nachzuvollziehen. Regelmäßige Einträge machen wiederkehrende Muster sichtbar, die Stimmun…
- **NEW**: <h2>Warum ein Gedankentagebuch führen?</h2> Das Führen eines Tagebuchs ist der Schlüssel zu tiefer Selbsterkenntnis: Es hilft Ihnen, Ihre Emotionen, Gedanken und Ihr Verhalten besser zu verstehen. Regelmäßige Einträge ermöglichen es, wiederkehrende Muster zu e…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Translation A is much more professional, follows all HTML formatting requirements, and uses correct terminology. Translation B fails to preserve the HTML tags, uses a clumsy title, and contains a mistranslation ('Ungelesen' instead of 'not written down').
  - [old/omission/critical] All HTML tags (h2, important, li) were lost.
  - [old/mistranslation/major] Used 'Ungelesen' (unread) instead of 'Was nicht aufgeschrieben wird' (what is not written down).
  - [old/style/minor] The title 'Warum ein Tagebuch automatischer Gedanken führen?' is grammatically awkward compared to the standard 'Gedankentagebuch'.
  - [old/style/minor] The tone is slightly less polished/expert than A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is superior because it correctly uses the mandatory terminology 'Gedankentagebuch' and maintains the HTML structure, which was lost in A. B also sounds more natural and professional for a therapeutic context.
  - [old/omission/major] Lost all HTML tags (h2, important, li), which is critical for the UI/JSON structure.
  - [old/terminology/minor] Used 'Tagebuch automatischer Gedanken' instead of the standard 'Gedankentagebuch'.
  - [old/style/minor] The phrase 'Ungelesen verschwinden Eindrücke' (Unread impressions disappear) is a mistranslation of the original meaning; it should be about things not being written down.

#### 🟡 de `/description`— вердикт неустойчив

- **RU**: В статье разбирается практика ведения «Дневника автоматических мыслей» как одного из ключевых инструментов когнитивно-поведенческой терапии (КПТ). Мы объясняем, как корректно фиксировать и анализировать автоматические мысли, чтобы снижать уровень психологическ…
- **OLD**: Der Beitrag erläutert die Praxis des „Tagebuchs automatischer Gedanken“ als eines der zentralen Werkzeuge der Kognitiven Verhaltenstherapie (KVT). Wir zeigen, wie automatische Gedanken korrekt erfasst und ausgewertet werden, um psychische Belastung zu verringe…
- **NEW**: In diesem Artikel wird das „Gedankentagebuch“ als eines der zentralen Instrumente der Kognitiven Verhaltenstherapie (KVT) erläutert. Wir erklären Ihnen, wie Sie automatische Gedanken korrekt erfassen und analysieren können, um Ihr Befinden zu verbessern und di…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A идеально следует глоссарию (Gedankentagebuch, KVT, Befinden) и звучит максимально естественно для носителя. Перевод B содержит терминологическую ошибку в названии инструмента и звучит более тяжеловесно.
  - [old/terminology/major] Использовано 'Tagebuch automatischer Gedanken' вместо утвержденного термина 'Gedankentagebuch'.
  - [old/style/minor] Конструкция 'Arbeit an tieferen Ebenen Ihrer Überzeugungen' звучит избыточно и менее гладко, чем в варианте A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Перевод A идеально следует глоссарию (использует 'Tagebuch automatischer Gedanken' и 'KVT') и звучит более профессионально и гладко. Перевод B допускает терминологическую неточность, заменяя 'автоматические мысли' на просто 'Gedankentagebuch' в первом предложении, и использует менее точный термин 'Befinden' там, где речь идет о снижении дискомфорта.
  - [new/terminology/minor] В первом предложении пропущено уточнение 'автоматических мыслей', хотя в оригинале это ключевой термин.
  - [new/style/minor] Фраза 'um Ihr Befinden zu verbessern' (улучшить самочувствие) — это вольная интерпретация 'снижения психологического дискомфорта', которая звучит чуть более обыденно, чем в оригинале.

#### 🟢 de `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Одна из ключевых задач КПТ — работа с мыслями. Автоматические мысли — это «компактные» версии ваших убеждений; они отражают содержание более глубоких слоёв мышления. Прежде чем работать с мыслью, её важно заметить и зафиксировать. В этой главе вы познакомитесь…
- **OLD**: Eine der Kernaufgaben der KVT ist die Arbeit mit Gedanken. Automatische Gedanken sind „komprimierte“ Versionen Ihrer Überzeugungen; sie spiegeln Inhalte tieferer Denkschichten wider. Bevor Sie mit einem Gedanken arbeiten, ist es wichtig, ihn wahrzunehmen und f…
- **NEW**: Eine der Kernaufgaben der KVT ist die Arbeit mit Gedanken. Automatische Gedanken sind quasi „komprimierte“ Versionen Ihrer Überzeugungen; sie spiegeln den Inhalt tieferer Gedankenebenen wider. Bevor Sie an einem Gedanken arbeiten können, ist es wichtig, ihn wa…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Перевод B значительно лучше соблюдает терминологию глоссария и правила оформления. Перевод A допускает критические ошибки в ключевых терминах (использует 'Ereignis' вместо 'Situation' и 'Alternativer Antwortsatz' вместо 'Alternative Antwort'), что недопустимо для КПТ-приложения.
  - [old/terminology/major] Использовано 'Ereignis' вместо требуемого 'Situation' для описания события.
  - [old/terminology/major] Использовано 'Alternativer Antwortsatz' вместо 'Alternative Antwort' (нарушение консистентности терминологии).
  - [old/omission/minor] Пропущены HTML-теги <important>, <li> и <h2>, что критично для структуры документа.
  - [new/style/minor] В одном месте использовано 'unangenehmen Emotionen', хотя 'Gefühle' звучало бы чуть естественнее, но это не ошибка.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Перевод A безупречен: он строго следует глоссарию (Situation вместо Ereignis, Gedankentagebuch), использует правильные немецкие кавычки „“ и сохраняет структуру HTML-тегов. Перевод B содержит терминологические ошибки и нарушает структуру оригинала.
  - [old/terminology/major] Использует 'Ereignis' вместо предписанного 'Situation' для описания события в КПТ.
  - [old/omission/major] Потеряны HTML-теги <li> и <important>, что критично для верстки.
  - [old/terminology/minor] Использует 'Alternativer Antwortsatz' вместо принятого 'Alternative Antwort'.
  - [old/style/minor] Тон чуть менее эмпатичен, чем в A.

#### 🟢 de `/test/question` — NEW лучше (2:0)

- **RU**: Какой из следующих примеров наиболее точно описывает запись в разделе "Ситуация"?
- **OLD**: Welche der folgenden Aussagen beschreibt eine Eintragung im Abschnitt „Situation“ am treffendsten?
- **NEW**: Welches der folgenden Beispiele beschreibt einen Eintrag im Bereich „Situation“ am genauesten?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Перевод A безупречен: он использует правильный термин 'Eintrag' согласно глоссарию и звучит абсолютно естественно. Перевод B содержит грамматическую ошибку ('eine Eintragung' вместо 'einen Eintrag') и использует менее подходящее слово 'Eintragung'.
  - [old/terminology/major] Использовано 'Eintragung' вместо рекомендованного 'Eintrag'
  - [old/style/major] Грамматическая ошибка: 'eine Eintragung' (женский род) вместо 'einen Eintrag' (мужской род)
  - [old/style/minor] Слово 'Aussagen' (утверждения) меняет смысл оригинала 'примеры' (Beispiele)
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Перевод B идеально следует глоссарию и звучит естественно. Перевод A содержит грамматическую ошибку в роде существительного и использует неверный термин для записи.
  - [old/terminology/major] Использовано 'Eintragung' вместо принятого в глоссарии 'Eintrag'.
  - [old/other/major] Ошибка в роде: должно быть 'ein Eintrag' (мужской род), а не 'eine Eintragung' (женский род, если бы слово было выбрано).
  - [old/style/minor] Слово 'Aussagen' (утверждения) меняет смысл оригинала 'примеров' (Beispiele).

#### 🟢 de `/test/answers` — NEW лучше (2:0)

- **RU**: Я чувствую себя ужасно Начальник повысил голос во время совещания, раскритиковав мой отчет Я неудачник У меня всё валится из рук
- **OLD**: Ich fühle mich furchtbar Die Chefin oder der Chef hat in der Besprechung die Stimme erhoben und meinen Bericht kritisiert Ich bin ein Versager Mir fällt alles aus den Händen
- **NEW**: Ich fühle mich schrecklich Der Chef wurde während der Besprechung laut und kritisierte meinen Bericht Ich bin ein Versager Mir fällt alles so schwer
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Перевод B звучит гораздо естественнее и точнее передает эмоциональное состояние. Фраза 'Mir fällt alles so schwer' — это идиоматичный способ выразить состояние 'у меня всё валится из рук' в контексте психологического состояния, в то время как перевод A слишком буквален.
  - [old/style/minor] Конструкция 'die Stimme erhoben' звучит излишне официально/литературно для описания ситуации на совещании; 'wurde laut' в варианте B звучит естественнее. Также 'Mir fällt alles aus den Händen' — это слишком буквальный перевод, который в немецком чаще означает физическую неуклюжесть, а не эмоциональный упадок.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Перевод A звучит естественно и передает эмоциональное состояние через идиому 'Mir fällt alles schwer' (мне всё дается с трудом), что соответствует контексту самокритики. Перевод B содержит грубую ошибку: фраза 'Mir fällt alles aus den Händen' является калькой и не используется в немецком языке в значении 'у меня всё валится из рук' (в значении потери контроля или неуклюжести).
  - [old/style/major] Неестественная калька 'Mir fällt alles aus den Händen' вместо идиоматичного 'Mir fällt alles schwer' или 'Ich habe alles nicht im Griff'.
  - [old/addition/minor] Добавлено 'Die Chefin oder der Chef', что избыточно и нарушает лаконичность оригинала.

