# QA: слепое парное сравнение переводов — de-newsystem

- **Дата**: 2026-09-12T22:47:22.402Z
- **Метка**: de-newsystem
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: distortions.json
- **Локали**: de
- **Сэмпл/файл**: 3
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 30b56bc18b00a3d1f474cb07c30edcd508b703d1

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## distortions.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 3 | 🟢 1 | 🔴 1 | ⚪ 0 | 🟡 1 | 0 / 0 | 50% |
| **итого** | 3 | 🟢 1 | 🔴 1 | ⚪ 0 | 🟡 1 | 0 / 0 | 50% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×2; OLD — style/minor×2, mistranslation/major×1, omission/minor×1

### Детали пар (для спот-чека)

#### 🟢 de `/READ/dialogSummary` — NEW лучше (2:0)

- **RU**: В диалоге персонаж 1 делает вывод о настроении коллеги, основываясь на собственных предположениях. Персонаж 2 мягко напоминает, что без прямого разговора нельзя быть уверенным в мыслях и чувствах другого человека.
- **OLD**: Person 1 deutet das Verhalten einer Kollegin aufgrund bloßer Annahmen. Person 2 erinnert daran, dass ohne Rückfrage unklar bleibt, was die Kollegin tatsächlich denkt oder fühlt.
- **NEW**: In diesem Dialog zieht Person 1 einen Schluss über die Stimmung eines Kollegen, basierend auf eigenen Vermutungen. Person 2 erinnert sanft daran, dass man sich ohne ein direktes Gespräch nicht über die Gedanken und Gefühle eines anderen sicher sein kann.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Перевод B гораздо ближе к оригиналу по смыслу и структуре, сохраняя все нюансы (настроение, мягкое напоминание, уверенность). Перевод A слишком сильно сокращает текст и меняет 'настроение' на 'поведение', что является смысловой потерей.
  - [old/mistranslation/major] Заменил 'настроение' (Stimmung) на 'поведение' (Verhalten), что меняет суть наблюдения.
  - [old/omission/minor] Упущено 'мягко' (sanft) и 'собственные предположения' (eigene Vermutungen).
  - [old/style/minor] Фраза 'Person 1 deutet...' звучит немного обрывисто по сравнению с контекстом описания диалога.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 65 / NEW 92)
  - Перевод A точно передает смысл оригинала, сохраняя структуру и все детали. Перевод B содержит грубые искажения: он меняет пол коллеги (с 'коллеги' на 'женщину'), заменяет 'вывод о настроении' на 'интерпретацию поведения' и теряет нюанс 'мягкого напоминания'.
  - [old/mistranslation/major] Смена пола персонажа (Kollegin вместо Kollegen) и подмена понятий (интерпретация поведения вместо вывода о настроении).
  - [old/omission/minor] Утеряно наречие 'sanft' (мягко), что меняет тон высказывания.

#### 🟡 de `/FILTER/textHTML`— вердикт неустойчив

- **RU**: <p>Мысленный фильтр — это когнитивное искажение, при котором мы замечаем в первую очередь негативные моменты и почти не обращаем внимания на положительные. Например, после неудачного интервью человек может сосредоточиться только на отказе, забывая о ценном опы…
- **OLD**: <p>Der mentale Filter ist eine kognitive Verzerrung, bei der wir vor allem negative Aspekte wahrnehmen und Positives kaum berücksichtigen. Nach einem erfolglosen Vorstellungsgespräch etwa konzentriert man sich ausschließlich auf die Absage und übersieht, welch…
- **NEW**: <p>Der mentale Filter ist eine kognitive Verzerrung, bei der wir uns vor allem auf negative Aspekte konzentrieren und positive Erlebnisse fast völlig ausblenden. Wenn Sie beispielsweise nach einem misslungenen Vorstellungsgespräch nur an die Absage denken, ver…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A идеально попадает в Tone of Voice: он звучит эмпатично, использует вежливое обращение 'Sie', как того требуют стандарты для терапевтических приложений, и при этом сохраняет профессиональную терминологию. Перевод B переходит на безличное 'man', что делает текст более сухим и отстраненным.
  - [old/style/minor] Использование безличного 'man' вместо вежливого 'Sie' снижает уровень эмпатии и персонализации, характерный для качественного терапевтического контента.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A звучит более естественно и профессионально для терапевтического контекста, используя гладкие синтаксические конструкции. Перевод B переходит на 'Sie' (вы) там, где в оригинале используется обобщающее 'человек', что создает ненужный акцент на читателе и нарушает ритм повествования.
  - [new/style/minor] Необоснованный переход на прямое обращение 'Sie' во втором предложении, в то время как оригинал описывает общую ситуацию ('человек может').
  - [new/style/minor] Конструкция 'vergessen Sie vielleicht' звучит чуть более тяжеловесно по сравнению с лаконичным вариантом в A.

#### 🔴 de `/DUE/dialogSummary` — OLD лучше (2:0)

- **RU**: Персонаж 1 демонстрирует должествование, считая, что обязан работать без выходных, чтобы добиться успеха, ориентируясь на историю других людей. Персонаж 2 помогает ему взглянуть шире, напоминая, что у каждого свой путь, и баланс между трудом и отдыхом может бы…
- **OLD**: Person 1 zeigt „Sollte“-Denken und glaubt, ohne Pausen arbeiten zu müssen, um Erfolg zu haben – orientiert an Geschichten anderer. Person 2 lädt zu einem weiteren Blick ein und erinnert daran, dass jeder Mensch seinen eigenen Weg hat und ein Ausgleich zwischen…
- **NEW**: Person 1 zeigt „Muss-Denken“, indem er glaubt, er müsse ohne freie Tage arbeiten, um Erfolg zu haben, wobei er sich an den Lebensgeschichten anderer orientiert. Person 2 hilft ihm, den Blick zu weiten und erinnert ihn daran, dass jeder seinen eigenen Weg hat u…
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Перевод B звучит гораздо более естественно и профессионально, избегая тяжеловесных конструкций. Использование 'Sollte-Denken' точнее передает психологический термин 'должествование' (Should-statements), чем 'Muss-Denken'.
  - [new/style/minor] Конструкция 'indem er glaubt, er müsse' звучит тяжеловесно и напоминает кальку с русского.
  - [new/style/minor] Фраза 'den Blick zu weiten' допустима, но 'lädt zu einem weiteren Blick ein' в варианте B звучит более эмпатично и по-терапевтически.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Перевод A звучит гораздо более естественно и профессионально для терапевтического контекста. Использование термина „Sollte“-Denken (вместо „Muss-Denken“) точнее передает психологический термин «должествование» (should statements), а структура предложений более лаконична и приятна для чтения.
  - [new/terminology/minor] „Muss-Denken“ — это скорее «мысли о необходимости», в то время как в КПТ «должествование» — это именно „Sollte“-Denken.
  - [new/style/minor] Конструкция „indem er glaubt, er müsse“ звучит тяжеловесно и избыточно (канцелярит).

