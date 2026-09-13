# QA: слепое парное сравнение переводов — post-fix

- **Дата**: 2026-09-10T19:22:44.755Z
- **Метка**: post-fix
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/pre-retranslate-20260910
- **Файлы**: story/start.json
- **Локали**: de
- **Сэмпл/файл**: 10
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:18000/v1
- **git HEAD**: 36d852476e185b53ddaa07e23e872b048f0a70b0

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/start.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 5 | 🟢 3 | 🔴 1 | ⚪ 0 | 🟡 1 | 0 / 1 | 75% |
| **итого** | 5 | 🟢 3 | 🔴 1 | ⚪ 0 | 🟡 1 | 0 / 1 | 75% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×3, other/major×1; OLD — terminology/minor×2, style/minor×2, omission/critical×1, addition/major×1, style/major×1, terminology/major×1, omission/minor×1

### Детали пар (для спот-чека)

#### 🔴 de `/title` — OLD лучше (2:0)

- **RU**: Понимание себя через когнитивно-поведенческую терапию
- **OLD**: Sich selbst verstehen mit Hilfe der KVT
- **NEW**: Sich selbst verstehen durch Kognitive Verhaltenstherapie
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Перевод B звучит более естественно и профессионально для немецкого языка, используя общепринятую аббревиатуру KVT. Перевод A грамматически допустим, но звучит как калька с русского.
  - [new/style/minor] Конструкция 'durch Kognitive Verhaltenstherapie' звучит немного тяжеловесно; использование аббревиатуры KVT в заголовках более характерно для немецкой практики.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Перевод A звучит более естественно и лаконично для заголовка, используя общепринятую аббревиатуру KVT. Перевод B избыточен и звучит слишком академично для названия раздела или статьи.
  - [new/style/minor] Использование полного названия вместо аббревиатуры в заголовке делает фразу тяжеловесной; отсутствие артикля перед названием метода делает звучание менее гладким.

#### 🟢 de `/screen_1/texts` — NEW лучше (2:0)

- **RU**: В современном мире, полном стрессов и неопределённости, психологическое благополучие как никогда важно. Миллионы людей ежедневно сталкиваются с трудностями — от лёгкого дискомфорта и тревоги до серьёзных состояний, таких как депрессия, невроз, посттравматическ…
- **OLD**: In einer Welt voller Stress und Ungewissheit ist psychisches Wohlbefinden wichtiger denn je. Millionen Menschen begegnen täglich Belastungen – von leichtem Unbehagen und Anspannung bis hin zu handfesten Störungsbildern wie Depression, Angststörung, Posttraumat…
- **NEW**: In einer modernen Welt voller Stress und Unsicherheit ist das psychische Wohlbefinden wichtiger denn je. Millionen von Menschen stehen täglich vor Herausforderungen – von leichtem Unbehagen und Angst bis hin zu ernsthaften Zuständen wie Depressionen, Neurosen,…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation B is much more professional and follows the glossary and typography rules. Translation A has a critical error: it repeats the last two paragraphs twice (omission of the quote and duplication of content), and it fails to use the correct German quotation marks.
  - [old/omission/critical] The quote by Rebecca Walker is completely missing.
  - [old/addition/major] The text repeats the final section twice with slightly different wording.
  - [old/style/major] Uses standard quotes instead of German typographic quotes „ “.
  - [old/terminology/minor] Used 'Grundannahmen' instead of 'destruktive Überzeugungen' or 'Glaubenssätze', though 'Grundannahmen' is acceptable, it's less precise here.
  - [new/style/minor] Uses single quotes in the quote block, but the text itself is otherwise perfect.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Translation A is a high-quality, professional text that follows all stylistic and terminological guidelines. Translation B contains a major structural error (repetition of the final paragraph) and uses less precise terminology.
  - [old/addition/critical] The last paragraph is repeated almost verbatim, which is a major error for a final product.
  - [old/mistranslation/major] The translation of 'деструктивные установки' as 'hinderliche Grundannahmen' is weak; 'destruktive Überzeugungen' (as in A) is the standard clinical term.
  - [old/style/minor] The flow is slightly more fragmented compared to the smooth, empathetic tone of A.

#### 🟢 de `/description` — NEW лучше (2:0)

- **RU**: Статья знакомит с основами когнитивно-поведенческой терапии (КПТ) и показывает, как глубинные и промежуточные убеждения формируют автоматические мысли и эмоции. Через образ яблоневого дерева поясняется, каким образом внутренние установки влияют на восприятие с…
- **OLD**: Der Beitrag führt in die Grundlagen der Kognitiven Verhaltenstherapie (KVT) ein und zeigt, wie tief verwurzelte Überzeugungen und Zwischenüberzeugungen automatische Gedanken und Emotionen prägen. Anhand des Bildes eines Apfelbaums wird erläutert, wie innere An…
- **NEW**: Dieser Artikel führt Sie in die Grundlagen der Kognitiven Verhaltenstherapie (KVT) ein und zeigt auf, wie Grundüberzeugungen und Zwischenüberzeugungen automatische Gedanken und Emotionen formen. Anhand der Metapher eines Apfelbaums wird erläutert, wie innere E…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B лучше передает смысл и звучит более профессионально. Использование термина 'Grundüberzeugungen' вместо 'tief verwurzelte Überzeugungen' (последнее является описательным, а не терминологическим) и замена 'Bild' на 'Metapher' делает текст более качественным для психологического контекста.
  - [old/terminology/minor] Использовано описательное 'tief verwurzelte Überzeugungen' вместо закрепленного термина 'Grundüberzeugungen'.
  - [old/style/minor] 'Bild eines Apfelbaums' звучит слишком просто, в контексте психотерапии лучше использовать 'Metapher'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Перевод A безупречен: он строго следует глоссарию (Grundüberzeugungen, KVT) и звучит как профессиональный медицинский/терапевтический текст. Перевод B допускает терминологические ошибки, заменяя ключевые понятия (Grundüberzeugungen) на описательные фразы, что недопустимо для данного контекста.
  - [old/terminology/major] Использовано 'tief verwurzelte Überzeugungen' вместо строгого термина 'Grundüberzeugungen'
  - [old/terminology/minor] Использовано 'Annahmen' вместо 'Einstellungen' или 'Überzeugungen', что менее точно в контексте КПТ
  - [old/style/minor] Стиль более разговорный ('Beitrag', 'Gefühle'), в то время как оригинал требует более экспертного тона

#### 🟡 de `/screen_3/texts`— вердикт неустойчив

- **RU**: Рассмотрим пример. Двум коллегам сделали одинаковое замечание по работе: Мария: с детства у неё сформировалось глубинное убеждение «Я недостаточно хороша». Её промежуточное убеждение: «Чтобы меня ценили, я должна быть безупречна». Получив критику, она думает: …
- **OLD**: Ein Beispiel: Zwei Kolleginnen erhalten dieselbe Rückmeldung zur Arbeit: Maria: Seit Kindheitstagen hat sich bei ihr die Grundüberzeugung „Ich bin nicht gut genug“ gebildet. Ihre Zwischenüberzeugung lautet: „Damit man mich schätzt, muss ich makellos sein.“ Nac…
- **NEW**: Betrachten wir ein Beispiel. Zwei Kolleginnen erhielten die gleiche Rückmeldung zu ihrer Arbeit: Maria: Sie hat seit ihrer Kindheit die Grundüberzeugung entwickelt: „Ich bin nicht gut genug.“ Ihre Zwischenüberzeugung lautet: „Um geschätzt zu werden, muss ich m…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Translation A is much more natural and stylistically polished, sounding like a professional German textbook. Translation B contains a grammatical error in the important tag ('seine eigene Baum-Modell' instead of 'sein eigenes') and feels slightly more clunky/translated.
  - [new/other/major] Grammatical error in the <important> tag: 'seine eigene Baum-Modell' is incorrect; 'Modell' is neuter, so it must be 'sein eigenes Baum-Modell'.
  - [new/style/minor] The phrasing 'In diesem Kapitel haben wir nur einen Überblick gegeben' is a bit weak compared to the more elegant 'Heute haben wir die Landkarte skizziert' in A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Translation A is more professional and adheres strictly to the required terminology and tone. Translation B has some stylistic issues, such as the overly poetic/unnatural 'Kindheitstagen' and a slight loss of the empathetic 'expert friend' tone in the final paragraph.
  - [old/style/minor] 'Seit Kindheitstagen' sounds overly literary/poetic and is not appropriate for a psychological context; 'Seit der Kindheit' is better.
  - [old/style/minor] The transition 'Heute haben wir die Landkarte skizziert' is a bit too metaphorical compared to the original 'набросали общую картину'.
  - [old/style/minor] The final sentence 'stimmiger' is okay, but 'harmonischer' (from A) better captures the original 'гармоничной'.
  - [new/style/minor] The phrase 'Baum-Modell' is a bit clunky, but since it's a specific metaphor from the original, it's acceptable.

#### 🟢 de `/screen_2/texts` — NEW лучше (2:0)

- **RU**: В когнитивно-поведенческой терапии сознание условно описывается тремя уровнями: глубинные убеждения, промежуточные убеждения (правила) и автоматические мысли. Ключевая идея КПТ заключается в том, что самочувствие и чувства зависят от того, как мы думаем. <impo…
- **OLD**: In der KVT wird das Denken grob in drei Ebenen beschrieben: tief verwurzelte Überzeugungen, Zwischenüberzeugungen (Regeln) und automatische Gedanken. Die zentrale Idee der KVT: Befinden und Gefühle hängen davon ab, wie wir denken. Daraus folgt der Grundsatz: W…
- **NEW**: In der Kognitiven Verhaltenstherapie wird das Bewusstsein vereinfacht in drei Ebenen unterteilt: Grundüberzeugungen, Zwischenüberzeugungen (Regeln) und automatische Gedanken. Die Kernidee der KVT besteht darin, dass unser Befinden und unsere Gefühle davon abhä…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A безупречно следует глоссарию (Grundüberzeugungen, Zwischenüberzeugungen, KVT) и сохраняет структуру оригинала, включая вежливое обращение 'Sie'. Перевод B допускает терминологические отклонения (tief verwurzelte Überzeugungen вместо Grundüberzeugungen) и слишком сильно сокращает предложения, что делает текст менее глубоким и менее похожим на качественный обучающий материал.
  - [old/terminology/major] Использование 'tief verwurzelte Überzeugungen' вместо строгого термина 'Grundüberzeugungen'
  - [old/omission/minor] Сильное сокращение предложений в некоторых местах (например, в абзаце про суть KVT), что ведет к потере нюансов оригинала
  - [old/style/minor] Текст звучит более обрывисто, чем требует жанр эмпатичного экспертного руководства
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод B гораздо точнее следует оригиналу, соблюдает все требования глоссария (Grundüberzeugungen) и сохраняет вежливый тон (Sie/Ihnen), в то время как перевод A упрощает текст и игнорирует часть предложений.
  - [old/omission/major] Пропущено целое предложение: 'Это краткое изложение сути КПТ, но впереди у нас ещё много важных деталей...'
  - [old/terminology/major] Использовано 'tief verwurzelte Überzeugungen' вместо закрепленного в глоссарии термина 'Grundüberzeugungen'.
  - [old/style/minor] Текст звучит слишком обрывисто из-за сильного сокращения оригинала.
  - [new/style/minor] Фраза 'die Bedeutung wird durch die eigenen Überzeugungen verliehen' является легкой калькой, но в контексте психологии допустима.

