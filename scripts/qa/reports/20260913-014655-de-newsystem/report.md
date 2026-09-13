# QA: слепое парное сравнение переводов — de-newsystem

- **Дата**: 2026-09-12T22:46:55.928Z
- **Метка**: de-newsystem
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/start.json
- **Локали**: de
- **Сэмпл/файл**: 3
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 30b56bc18b00a3d1f474cb07c30edcd508b703d1

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/start.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 3 | 🟢 3 | 🔴 0 | ⚪ 0 | 🟡 0 | 0 / 0 | 100% |
| **итого** | 3 | 🟢 3 | 🔴 0 | ⚪ 0 | 🟡 0 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×2; OLD — terminology/minor×4, style/minor×3

### Детали пар (для спот-чека)

#### 🟢 de `/screen_1/texts` — NEW лучше (2:0)

- **RU**: В современном мире, полном стрессов и неопределённости, психологическое благополучие как никогда важно. Миллионы людей ежедневно сталкиваются с трудностями — от лёгкого дискомфорта и тревоги до серьёзных состояний, таких как депрессия, невроз, посттравматическ…
- **OLD**: In einer modernen Welt voller Stress und Unsicherheit ist das psychische Wohlbefinden wichtiger denn je. Millionen von Menschen stehen täglich vor Herausforderungen – von leichtem Unbehagen und Angst bis hin zu ernsthaften Zuständen wie Depressionen, Neurosen,…
- **NEW**: In einer modernen Welt voller Stress und Unsicherheit ist das psychische Wohlbefinden wichtiger denn je. Millionen von Menschen stehen täglich vor Herausforderungen – von leichtem Unbehagen und Angst bis hin zu belastenden Zuständen wie Depressionen, Neurosen …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B значительно лучше справляется с терминологией и стилистикой. Он использует правильный термин 'Glaubenssätze' вместо 'Überzeugungen', корректно переводит 'эмоции' как 'Gefühle' (согласно глоссарию для интерфейсов) и избегает тяжеловесных конструкций, делая текст более живым и эмпатичным.
  - [old/terminology/minor] Использовано 'destruktive Überzeugungen' вместо принятого в КПТ 'destruktive Glaubenssätze'.
  - [old/terminology/minor] Использовано 'Emotionen' вместо 'Gefühle'.
  - [old/style/minor] Перевод 'неполноценным' как 'unvollständig' звучит скорее как 'незавершенный', в то время как 'minderwertig' (в B) точнее передает психологический подтекст оригинала.
  - [new/style/minor] В предложении про корни в детстве использован пассивный залог, что звучит чуть более естественно для немецкого описания процессов, чем в A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Translation A is much more natural and follows the professional psychological tone required. It correctly uses the term 'destruktive Glaubenssätze' (as per glossary) and avoids the clunky 'Das Vorhandensein von...' (the presence of...) used in B. A also uses correct German typography for quotes.
  - [old/terminology/minor] Used 'destruktive Überzeugungen' instead of the preferred 'destruktive Glaubenssätze'.
  - [old/style/major] The construction 'Das Vorhandensein solcher Schwierigkeiten macht Sie nicht...' is a typical nominalization/translationese that sounds unnatural in German; A's approach is much smoother.
  - [old/style/minor] Used single quotes in the blockquote instead of German typographic quotes.
  - [old/style/minor] The phrase 'detaillierter vertiefen' is a pleonasm (tautology).
  - [new/style/minor] The colon after 'führen' in the 4th paragraph is slightly unconventional, but acceptable for emphasis.

#### 🟢 de `/description` — NEW лучше (2:0)

- **RU**: Статья знакомит с основами когнитивно-поведенческой терапии (КПТ) и показывает, как глубинные и промежуточные убеждения формируют автоматические мысли и эмоции. Через образ яблоневого дерева поясняется, каким образом внутренние установки влияют на восприятие с…
- **OLD**: Dieser Artikel führt Sie in die Grundlagen der Kognitiven Verhaltenstherapie (KVT) ein und zeigt auf, wie Grundüberzeugungen und Zwischenüberzeugungen automatische Gedanken und Emotionen formen. Anhand der Metapher eines Apfelbaums wird erläutert, wie innere E…
- **NEW**: Dieser Artikel führt Sie in die Grundlagen der Kognitiven Verhaltenstherapie (KVT) ein und zeigt auf, wie Grundüberzeugungen und Zwischenüberzeugungen automatische Gedanken und Gefühle prägen. Anhand des Bildes eines Apfelbaums wird erläutert, wie innere Einst…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 98)
  - Перевод B лучше следует глоссарию и правилам UX: использован термин 'Gefühle' вместо 'Emotionen' для интерфейсного контекста и 'Situation' вместо 'Ereignis' согласно стандартам КПТ. Также 'prägen' звучит более естественно, чем 'formen'.
  - [old/terminology/minor] Использование 'Emotionen' вместо 'Gefühle' и 'Ereignissen' вместо 'Situationen' (не по глоссарию КПТ).
  - [old/style/minor] 'formen' звучит чуть более механически, чем 'prägen'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Перевод A лучше следует глоссарию и правилам стилистики: использование 'Gefühle' вместо 'Emotionen' в контексте интерфейса/обучения и замена 'Ereignis' на 'Situation' делает текст более естественным для немецкого пользователя. Также 'Bild' в данном контексте звучит мягче, чем 'Metapher'.
  - [old/terminology/minor] Использование 'Emotionen' вместо 'Gefühle' (согласно глоссарию для интерфейсов/обучения) и 'Ereignis' вместо 'Situation' (согласно стандартам КПТ-бланков).
  - [old/style/minor] Слово 'formt' (формирует) допустимо, но 'prägen' в переводе A звучит более профессионально и литературно для описания влияния убеждений.

#### 🟢 de `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Рассмотрим пример. Двум коллегам сделали одинаковое замечание по работе: Мария: с детства у неё сформировалось глубинное убеждение «Я недостаточно хороша». Её промежуточное убеждение: «Чтобы меня ценили, я должна быть безупречна». Получив критику, она думает: …
- **OLD**: Betrachten wir ein Beispiel. Zwei Kolleginnen erhielten die gleiche Rückmeldung zu ihrer Arbeit: Maria: Sie hat seit ihrer Kindheit die Grundüberzeugung entwickelt: „Ich bin nicht gut genug.“ Ihre Zwischenüberzeugung lautet: „Um geschätzt zu werden, muss ich m…
- **NEW**: Betrachten wir ein Beispiel. Zwei Kolleginnen erhalten dieselbe Rückmeldung zu ihrer Arbeit: Maria: Seit ihrer Kindheit hat sie die Grundüberzeugung „Ich bin nicht gut genug“ entwickelt. Ihre Zwischenüberzeugung lautet: „Um wertgeschätzt zu werden, muss ich pe…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B звучит гораздо естественнее и лучше соответствует глоссарию и стилистическим правилам. В частности, B правильно использует термин 'Gefühle' вместо 'Emotionen' в контексте связи мыслей и поведения, а также более удачно адаптирует концовку, избегая тяжеловесных конструкций.
  - [old/terminology/minor] Использует 'Emotionen' там, где по глоссарию для связного текста/интерфейса лучше подходит 'Gefühle' (хотя 'Emotionen' допустимо, B точнее следует духу гайдлайна).
  - [old/style/minor] Концовка 'lassen Sie Ihr Leben... werden' звучит немного тяжеловесно и по-книжному по сравнению с более живым 'damit Ihr Leben... wird' в варианте B.
  - [new/style/minor] В предложении про Кристину 'Die Folge sind...' звучит чуть более сухо, чем в оригинале, но это допустимая вариация.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A демонстрирует более высокий уровень владения языком и точное соблюдение глоссария. В частности, он использует термин 'Gefühle' вместо 'Emotionen' в контексте влияния на поведение, что соответствует инструкциям для интерфейсов и текстов приложения. Также перевод A лучше передает нюансы (например, 'Kraftlosigkeit' звучит естественнее в данном контексте, чем 'Erschöpfung', и 'wahrnehmen'/'verändern' в связке с KVT звучит профессиональнее).
  - [old/terminology/minor] Использование 'Emotionen' вместо 'Gefühle' (хотя в связном тексте это допустимо, 'Gefühle' предпочтительнее согласно глоссарию для этого контекста).
  - [old/terminology/major] Использование 'Ereignis' вместо 'Situation', что прямо противоречит правилам терминологии (Situation — стандарт для КПТ).
  - [old/style/minor] Фраза 'Bereitschaft für neue Erfahrungen' — это калька, 'Experimentierfreude' в переводе A звучит гораздо более по-немецки.

