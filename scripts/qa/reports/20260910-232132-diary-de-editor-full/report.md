# QA: слепое парное сравнение переводов — diary-de-editor-full

- **Дата**: 2026-09-10T20:21:32.579Z
- **Метка**: diary-de-editor-full
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/main-only-diary
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
| de | 5 | 🟢 2 | 🔴 0 | ⚪ 0 | 🟡 3 | 0 / 0 | 100% |
| **итого** | 5 | 🟢 2 | 🔴 0 | ⚪ 0 | 🟡 3 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — mistranslation/major×1; OLD — style/minor×5, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟡 de `/screen_2/texts`— вердикт неустойчив

- **RU**: <h2>Автоматическая мысль</h2> Этот блок посвящён тому, как мы интерпретируем ситуацию. Чтобы заметить свои мысли, спросите себя: «О чём я сейчас думаю?» Выделите самую значимую и эмоционально заряженную мысль. Если формулировка слишком общая, уточните её и сде…
- **OLD**: <h2>Automatischer Gedanke</h2> Dieser Block widmet sich der Frage, wie wir eine Situation interpretieren. Um Ihre Gedanken zu bemerken, fragen Sie sich: „Worüber denke ich gerade nach?“ Identifizieren Sie den bedeutendsten und emotionalsten Gedanken. Wenn die …
- **NEW**: <h2>Automatischer Gedanke</h2> Dieser Block widmet sich der Frage, wie wir eine Situation interpretieren. Um Ihre Gedanken zu bemerken, fragen Sie sich: „Worüber denke ich gerade nach?“ Identifizieren Sie den bedeutendsten und emotionalsten Gedanken. Wenn die …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 98)
  - Перевод A безупречен с точки зрения терминологии, грамматики и пунктуации. Перевод B содержит мелкую ошибку в использовании сослагательного наклонения (Konjunktiv II) и нарушает правила немецкой типографики (точка после кавычек).
  - [old/style/minor] В предложении 'Was wären das schlimmste...' правильно использовать 'Was wäre...', так как подлежащее 'das schlimmste' стоит в единственном числе.
  - [old/style/minor] Нарушена типографика: в немецком языке точка ставится ПОСЛЕ закрывающих кавычек, если цитата является частью предложения, а не самостоятельным высказыванием. В A: '...machen können' könnten Sie... (верно). В B: '...machen können', könnten Sie... (неверно).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 94)
  - Both translations are excellent and follow the glossary perfectly. Translation A is slightly better due to a more precise rendering of 'адаптивный' (adaptivere) and a more natural flow in the final sentence.
  - [new/omission/minor] In the 'Alternative Antwort' section, it omits 'adaptivere' (more adaptive), simply saying 'hilfreichere' (more helpful). While acceptable, A is closer to the original intent.
  - [new/style/minor] The final sentence 'überspringen Sie diesen Block einfach für den Moment' is slightly less elegant than A's version.

#### 🟡 de `/screen_3/texts`— вердикт неустойчив

- **RU**: <h2>Зачем вести дневник автоматических мыслей?</h2> Ведение дневника — ключ к глубокому самопознанию: он помогает лучше понимать свои эмоции, мысли и поведение. Регулярные записи позволяют видеть повторяющиеся паттерны, влияющие на настроение и поступки. Проце…
- **OLD**: <h2>Warum ein Gedankentagebuch führen?</h2> Das Führen eines Tagebuchs ist der Schlüssel zu tiefer Selbsterkenntnis: Es hilft Ihnen, Ihre Emotionen, Gedanken und Ihr Verhalten besser zu verstehen. Regelmäßige Einträge ermöglichen es, wiederkehrende Muster zu e…
- **NEW**: <h2>Warum sollte man ein Gedankentagebuch führen?</h2> Das Führen eines Tagebuchs ist der Schlüssel zu tiefer Selbsterkenntnis: Es hilft Ihnen, Ihre Emotionen, Gedanken und Ihr Verhalten besser zu verstehen. Regelmäßige Einträge ermöglichen es, wiederkehrende …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Both translations are excellent and follow the terminology guidelines (Gedankentagebuch, Situation, etc.). Translation A is slightly better due to a more natural flow in the sentence 'und können Ihre Reaktionen leichter steuern' compared to B, and a more elegant rendering of the phrase 'und wir irren uns' (B) vs 'doch das täuscht meist' (A).
  - [old/style/minor] The phrase 'und wir irren uns' is a bit blunt/clunky compared to the more sophisticated 'doch das täuscht meist' in A.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 92)
  - Перевод A более точен в плане передачи смысла оригинала. В частности, в блоке про память перевод A корректно передает 'ошибаемся' (wir irren uns), в то время как перевод B использует более вольное 'das täuscht meist'. Также перевод A точнее передает нюанс 'видеть результаты' (Ergebnisse zu sehen) против 'видеть прогресс' (Fortschritte zu sehen) в контексте регулярности.
  - [new/style/minor] Фраза 'doch das täuscht meist' звучит чуть более отстраненно, чем прямое 'und wir irren uns', которое лучше передает эмоциональный посыл оригинала.

#### 🟡 de `/description`— вердикт неустойчив

- **RU**: В статье разбирается практика ведения «Дневника автоматических мыслей» как одного из ключевых инструментов когнитивно-поведенческой терапии (КПТ). Мы объясняем, как корректно фиксировать и анализировать автоматические мысли, чтобы снижать уровень психологическ…
- **OLD**: In diesem Artikel wird das „Gedankentagebuch“ als eines der zentralen Instrumente der Kognitiven Verhaltenstherapie (KVT) erläutert. Wir erklären Ihnen, wie Sie automatische Gedanken korrekt erfassen und analysieren können, um Ihr Befinden zu verbessern und di…
- **NEW**: In diesem Artikel wird das „Gedankentagebuch“ als eines der zentralen Instrumente der Kognitiven Verhaltenstherapie (KVT) erläutert. Wir erklären Ihnen, wie Sie automatische Gedanken präzise erfassen und analysieren können, um Ihr psychisches Wohlbefinden zu s…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод B точнее передает смысл оригинала. В переводе A допущена смысловая ошибка: вместо 'снижения дискомфорта' (was die psychische Belastung reduziert) написано 'повышение благополучия' (Wohlbefinden steigern), что является позитивной трансформацией, а не прямой передачей цели процесса. Также в B использован более уместный термин 'Befinden' для обозначения состояния.
  - [new/mistranslation/major] Оригинал говорит о снижении дискомфорта, а перевод A — о повышении благополучия. Хотя это логически связано, это искажение цели действия в контексте КПТ.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B точнее передает смысл фразы 'снижать уровень психологического дискомфорта' через 'psychisches Wohlbefinden steigern' (улучшение благополучия), в то время как вариант A слишком упрощает это до 'Befinden verbessern'.
  - [old/style/minor] Использование 'Befinden' без уточнения 'psychisch' делает фразу менее точной по сравнению с оригиналом, где акцент именно на психологическом дискомфорте.

#### 🟢 de `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Одна из ключевых задач КПТ — работа с мыслями. Автоматические мысли — это «компактные» версии ваших убеждений; они отражают содержание более глубоких слоёв мышления. Прежде чем работать с мыслью, её важно заметить и зафиксировать. В этой главе вы познакомитесь…
- **OLD**: Eine der Kernaufgaben der KVT ist die Arbeit mit Gedanken. Automatische Gedanken sind quasi „komprimierte“ Versionen Ihrer Überzeugungen; sie spiegeln den Inhalt tieferer Gedankenebenen wider. Bevor Sie an einem Gedanken arbeiten können, ist es wichtig, ihn wa…
- **NEW**: Eine der Kernaufgaben der KVT ist die Arbeit mit Gedanken. Automatische Gedanken sind quasi „Kurzfassungen“ Ihrer Überzeugungen; sie spiegeln den Inhalt tieferer Gedankenebenen wider. Bevor man an einem Gedanken arbeiten kann, ist es wichtig, ihn wahrzunehmen …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 97)
  - Перевод B лучше справляется с адаптацией терминологии и стилистики. В частности, использование 'hilfreicherer Gedanke' вместо 'konstruktiverer Gedanke' в контексте 'Alternative Antwort' более точно соответствует принятой в немецкой КПТ практике, указанной в глоссарии. Также 'Kurzfassungen' звучит более естественно для носителя, чем 'komprimierte Versionen'.
  - [old/terminology/minor] Использование 'konstruktiverer Gedanke' допустимо, но 'hilfreicherer Gedanke' является предпочтительным термином в немецкой КПТ-практике для 'Alternative Antwort'.
  - [old/style/minor] 'komprimierte Versionen' звучит немного технически/математически, 'Kurzfassungen' в переводе B звучит более литературно и естественно.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Перевод A звучит более естественно и профессионально. Использование 'Kurzfassungen' вместо 'komprimierte Versionen' в контексте мыслей гораздо лучше передает смысл, так как 'komprimiert' звучит слишком технически (как сжатие данных). Также в A лучше соблюдена логика обращения к пользователю.
  - [old/style/minor] Использование 'komprimierte Versionen' звучит излишне технически/машинно для психологического текста; 'Kurzfassungen' в A — более удачный вариант.

#### 🟢 de `/test/answers` — NEW лучше (2:0)

- **RU**: Я чувствую себя ужасно Начальник повысил голос во время совещания, раскритиковав мой отчет Я неудачник У меня всё валится из рук
- **OLD**: Ich fühle mich schrecklich Der Chef wurde während der Besprechung laut und kritisierte meinen Bericht Ich bin ein Versager Mir fällt alles so schwer
- **NEW**: Ich fühle mich schrecklich Mein Chef erhob während der Besprechung die Stimme und kritisierte meinen Bericht Ich bin ein Versager Mir fällt alles so schwer
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B звучит более естественно и литературно. Фраза 'die Stimme erheben' является более точным и стилистически уместным эквивалентом для 'повысить голос', чем просто 'laut werden' в переводе A.
  - [old/style/minor] Конструкция 'wurde laut' звучит несколько упрощенно и разговорно по сравнению с более элегантным 'erhob die Stimme'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод A более точно передает нюанс оригинала 'повысил голос' (erhob die Stimme), в то время как перевод B использует более разговорное 'wurde laut' (стал громким).
  - [old/style/minor] Использование 'Der Chef' вместо 'Mein Chef' звучит чуть менее лично, хотя в контексте может быть допустимо; 'wurde laut' — менее изящная передача действия 'повысил голос'.

