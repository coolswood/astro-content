# QA: слепое парное сравнение переводов — prompt-v2-big

- **Дата**: 2026-09-13T06:22:19.292Z
- **Метка**: prompt-v2-big
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: tests/sociophobia.json
- **Локали**: de
- **Сэмпл/файл**: 6
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: e5f619e3caa4d09e8c2e79d0b392e4f3042b4e2d

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/sociophobia.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 6 | 🟢 1 | 🔴 2 | ⚪ 0 | 🟡 3 | 0 / 0 | 33% |
| **итого** | 6 | 🟢 1 | 🔴 2 | ⚪ 0 | 🟡 3 | 0 / 0 | 33% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — mistranslation/major×1, style/minor×1, style/major×1; OLD — style/minor×2, mistranslation/major×1

### Детали пар (для спот-чека)

#### 🟡 de `/variants/15`— вердикт неустойчив

- **RU**: Никогда Иногда Часто Постоянно
- **OLD**: Nie Manchmal Häufig Ständig
- **NEW**: Nie Manchmal Oft Ständig
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - В контексте шкалы частоты (Likert scale) пара 'Manchmal — Oft' является наиболее естественной и стандартной для немецкого языка. 'Häufig' звучит чуть более формально/книжно, что делает вариант B более подходящим для UX интерфейса.
  - [old/style/minor] Использование 'Häufig' вместо 'Oft' делает шкалу менее разговорной и чуть более тяжеловесной для мобильного приложения.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Both translations are correct, but B is slightly better for a UI context. 'Häufig' is a more neutral and standard term for frequency scales in German psychological assessments than 'Oft', which can sound a bit more colloquial.

#### 🔴 de `/variants/14` — OLD лучше (2:0)

- **RU**: Нет Легкая тревога Умеренная тревога Интенсивная тревога
- **OLD**: Keine Leichte Angst Mäßige Angst Starke Angst
- **NEW**: Nein Leichte Angst Moderate Angst Starke Angst
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 75)
  - Для обозначения отсутствия симптома (шкала интенсивности) в немецком языке используется 'Keine', а не 'Nein', которое является ответом на вопрос. Перевод B также использует более точный термин 'Mäßige' для 'умеренной'.
  - [new/mistranslation/major] Использование 'Nein' вместо 'Keine' при описании отсутствия состояния (шкала) — грубая ошибка, 'Nein' — это просто 'нет' на вопрос.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 75)
  - Перевод A идеально подходит для интерфейса (UI) оценки состояния, используя 'Keine' для обозначения отсутствия симптома. Перевод B содержит ошибку в первом пункте ('Nein' — это ответ на вопрос, а не состояние) и использует англицизм 'Moderate' вместо естественного немецкого 'Mäßige'.
  - [new/mistranslation/major] Использование 'Nein' вместо 'Keine' для обозначения отсутствия тревоги — грубая ошибка в контексте UI.
  - [new/style/minor] Использование 'Moderate' вместо 'Mäßige' звучит как калька с английского.

#### 🔴 de `/variants/22` — OLD лучше (2:0)

- **RU**: Нет Легкая тревога Умеренная тревога Интенсивная тревога
- **OLD**: Nein Leichte Angst Mäßige Angst Starke Angst
- **NEW**: Nein Leichte Angst Moderate Angst Starke Angst
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Перевод B использует более естественный и точный для немецкого языка термин 'Mäßige Angst' для обозначения умеренной степени. 'Moderate Angst' в переводе A звучит более клинически/сухо, хотя и допустимо.
  - [new/style/minor] Использование 'Moderate' вместо 'Mäßig' делает текст чуть более формальным и менее естественным для пользовательского интерфейса.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - Перевод A идеально соответствует немецкой психологической терминологии. Перевод B использует 'moderate', что является англицизмом и звучит менее естественно в данном контексте, чем немецкое 'mäßig'.
  - [new/style/minor] Использование 'moderate' вместо 'mäßige' звучит как калька с английского.

#### 🟡 de `/steps_description/21/text`— вердикт неустойчив

- **RU**: Страх писать или делать записи в присутствии других людей иногда называют "скриптофобией". Это частный случай социальной тревожности, связанный с боязнью оценки со стороны окружающих.
- **OLD**: Die Angst, in Anwesenheit anderer zu schreiben oder Notizen zu machen, wird manchmal als „Skriptophobie“ bezeichnet. Dies ist ein spezieller Fall von sozialer Angst, der mit der Furcht vor der Bewertung durch andere verbunden ist.
- **NEW**: Die Angst, in Anwesenheit anderer Menschen zu schreiben oder Aufzeichnungen zu machen, wird manchmal als „Skriptophobie“ bezeichnet. Dies ist eine spezifische Form der sozialen Angst, die mit der Befürchtung verbunden ist, von der Umgebung bewertet zu werden.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 88)
  - Перевод A звучит более естественно и профессионально. Перевод B использует тяжеловесную конструкцию 'von der Umgebung bewertet zu werden', которая является калькой и звучит неестественно для немецкого языка.
  - [new/style/major] Конструкция 'von der Umgebung bewertet zu werden' звучит как канцелярит; носитель скажет 'Bewertung durch andere' или 'von anderen bewertet zu werden'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод A звучит более естественно и профессионально. Использование 'von der Umgebung bewertet zu werden' в контексте социальной тревожности более характерно для немецкого языка, чем буквальный перевод 'Bewertung durch andere' в варианте B.
  - [old/style/minor] Конструкция 'ein spezieller Fall von sozialer Angst' звучит немного тяжеловесно и калькированно по сравнению с 'eine spezifische Form'.

#### 🟢 de `/steps_description/9/fact` — NEW лучше (2:0)

- **RU**: Адель, известная британская певица, страдает от социофобии и панических атак. Она избегает многолюдных мест, таких как метро, чтобы уменьшить риск появления панических симптомов.
- **OLD**: Adele, die berühmte britische Sängerin, leidet unter sozialer Phobie und Panikattacken. Sie meidet Menschenmengen wie die U-Bahn, um das Risiko von Paniksymptomen zu verringern.
- **NEW**: Adele, die berühmte britische Sängerin, leidet unter sozialer Phobie und Panikattacken. Sie meidet überfüllte Orte wie die U-Bahn, um das Risiko von Paniksymptomen zu verringern.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Перевод A корректно передает смысл 'многолюдных мест'. Перевод B допускает логическую ошибку (mistranslation), называя метро 'толпой людей' (Menschenmengen), что стилистически и логически неверно.
  - [old/mistranslation/major] Menschenmengen (толпы людей) нельзя приравнивать к U-Bahn (метро); метро — это место, а не сама толпа.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 95)
  - Перевод B точнее передает смысл оригинала («многолюдные места» — überfüllte Orte), в то время как перевод A («Menschenmengen» — толпы) немного сужает значение до самих групп людей, а не локаций.
  - [old/style/minor] Menschenmengen (толпы) — это не совсем то же самое, что многолюдные места (überfüllte Orte), хотя в контексте допустимо.

#### 🟡 de `/variants/2`— вердикт неустойчив

- **RU**: Приветливо и открыто С осторожностью и недоверием Пытаюсь избежать разговора Буквально бегу прочь
- **OLD**: Freundlich und offen Mit Vorsicht und Misstrauen Ich versuche, dem Gespräch aus dem Weg zu gehen Ich laufe buchstäblich weg
- **NEW**: Freundlich und offen. Mit Vorsicht und Misstrauen. Ich versuche, dem Gespräch aus dem Weg zu gehen. Ich möchte am liebsten sofort wegrennen.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Перевод A звучит более естественно и эмоционально сбалансированно для терапевтического контекста. Перевод B содержит кальку 'buchstäblich weg[laufen]', которая в немецком звучит слишком механистично и буквально, в то время как вариант A лучше передает состояние пользователя.
  - [old/style/minor] Фраза 'Ich laufe buchstäblich weg' звучит как калька с русского и слишком тяжеловесна для описания эмоции; вариант A 'Ich möchte am liebsten sofort wegrennen' гораздо более живой и естественный для носителя.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Перевод A точно передает смысл и интенсивность оригинала. Перевод B в последней фразе слишком сильно смягчает смысл («хочу убежать» вместо «бегу»), что искажает эмоциональный накал оригинала.
  - [new/mistranslation/major] Фраза 'Буквально бегу прочь' переведена как 'Ich möchte am liebsten sofort wegrennen' (Я бы лучше сразу убежал), что теряет значение 'буквально' и меняет действие с реального на желаемое.

