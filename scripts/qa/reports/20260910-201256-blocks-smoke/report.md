# QA: слепое парное сравнение переводов — blocks-smoke

- **Дата**: 2026-09-10T17:12:56.262Z
- **Метка**: blocks-smoke
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir backups/start-translations-20260910/v1-single-pass
- **Файлы**: story/start.json
- **Локали**: de
- **Сэмпл/файл**: 3
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
| de | 3 | 🟢 1 | 🔴 1 | ⚪ 0 | 🟡 1 | 1 / 0 | 50% |
| **итого** | 3 | 🟢 1 | 🔴 1 | ⚪ 0 | 🟡 1 | 1 / 0 | 50% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — addition/critical×1, omission/major×1, terminology/minor×1, style/minor×1; OLD — style/minor×2, terminology/major×1

### Детали пар (для спот-чека)

#### 🟡 de `/title`— вердикт неустойчив

- **RU**: Понимание себя через когнитивно-поведенческую терапию
- **OLD**: Sich selbst verstehen durch kognitive Verhaltenstherapie
- **NEW**: Sich selbst verstehen mit Hilfe der KVT
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - Перевод A использует общепринятую аббревиатуру KVT, что делает заголовок более лаконичным и естественным для немецкого пользователя, в то время как перевод B выглядит избыточно длинным и академичным для заголовка.
  - [old/style/minor] Отсутствие аббревиатуры KVT делает заголовок тяжеловесным; в немецком контексте KVT — стандарт де-факто.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Перевод A звучит более естественно и элегантно для заголовка. Перевод B перегружен конструкцией 'mit Hilfe der', что делает его тяжеловесным.
  - [new/style/minor] Излишне громоздкая конструкция 'mit Hilfe der' вместо лаконичного предлога 'durch' или 'mittels'.

#### 🔴 de `/screen_1/texts` — OLD лучше (2:0)

- **RU**: В современном мире, полном стрессов и неопределённости, психологическое благополучие как никогда важно. Миллионы людей ежедневно сталкиваются с трудностями — от лёгкого дискомфорта и тревоги до серьёзных состояний, таких как депрессия, невроз, посттравматическ…
- **OLD**: In einer modernen Welt voller Stress und Ungewissheit ist das psychische Wohlbefinden wichtiger denn je. Millionen von Menschen stehen täglich vor Herausforderungen – von leichtem Unbehagen und Angst bis hin zu ernsthaften Zuständen wie Depressionen, Neurosen,…
- **NEW**: In einer Welt voller Stress und Ungewissheit ist psychisches Wohlbefinden wichtiger denn je. Millionen Menschen begegnen täglich Belastungen – von leichtem Unbehagen und Anspannung bis hin zu handfesten Störungsbildern wie Depression, Angststörung, Posttraumat…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Translation A is a clean, professional, and accurate translation that follows all stylistic and terminological guidelines. Translation B contains a major structural error (repetition of a paragraph) and several terminological inconsistencies.
  - [new/addition/critical] The text repeats the entire sentence about 'vorübergehender Niedergeschlagenheit...' twice, which is a significant error.
  - [new/omission/major] The quote by Rebecca Walker is completely missing in version B.
  - [new/terminology/minor] Uses 'Grundannahmen' instead of the preferred 'destruktive Überzeugungen' or 'Glaubenssätze' contextually, though 'Grundannahmen' is a valid CBT term, it misses the 'destructive' nuance of the original.
  - [new/style/minor] The flow is slightly more fragmented compared to the smooth, empathetic tone of A.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 75)
  - Translation B is much more professional, follows the glossary (KVT, Kognitive Verhaltenstherapie), and maintains the correct tone. Translation A has a major structural error: it repeats the last two paragraphs almost verbatim, which is a significant omission/addition error.
  - [new/addition/critical] The text repeats the final section twice with slightly different wording, creating a broken flow.
  - [new/omission/major] The quote by Rebecca Walker is completely missing.
  - [new/terminology/minor] Used 'Grundannahmen' instead of the more precise 'destruktive Überzeugungen' or 'Glaubenssätze' in the context of the original.
  - [new/style/minor] The phrasing 'Wegweiser' is a bit poetic/metaphorical compared to the more clinical/supportive 'Ressource'.

#### 🟢 de `/description` — NEW лучше (2:0)

- **RU**: Статья знакомит с основами когнитивно-поведенческой терапии (КПТ) и показывает, как глубинные и промежуточные убеждения формируют автоматические мысли и эмоции. Через образ яблоневого дерева поясняется, каким образом внутренние установки влияют на восприятие с…
- **OLD**: Dieser Artikel führt in die Grundlagen der kognitiven Verhaltenstherapie (KVT) ein und zeigt auf, wie tief verwurzelte und zwischengeschaltete Überzeugungen automatische Gedanken und Emotionen formen. Mithilfe des Bildes eines Apfelbaums wird erklärt, wie inne…
- **NEW**: Der Beitrag führt in die Grundlagen der Kognitiven Verhaltenstherapie (KVT) ein und zeigt, wie tief verwurzelte Überzeugungen und Zwischenüberzeugungen automatische Gedanken und Emotionen prägen. Anhand des Bildes eines Apfelbaums wird erläutert, wie innere An…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод B значительно лучше использует профессиональную терминологию (Zwischenüberzeugungen) и звучит более естественно для немецкого читателя. Перевод A допускает грубую терминологическую ошибку, переводя 'промежуточные убеждения' как 'zwischengeschaltete Überzeugungen', что не является принятым термином в КПТ.
  - [old/terminology/major] Использовано 'zwischengeschaltete Überzeugungen' вместо корректного термина 'Zwischenüberzeugungen'.
  - [old/style/minor] Конструкция 'tief verwurzelte und zwischengeschaltete Überzeugungen' звучит тяжеловесно из-за попытки объединить два разных типа убеждений под одним прилагательным.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 98)
  - Перевод A безупречен: он использует правильную терминологию (Grundüberzeugungen/Zwischenüberzeugungen подразумеваются через контекст, но здесь 'tief verwurzelte Überzeugungen' звучит очень естественно) и обладает отличным ритмом. Перевод B содержит грубую терминологическую ошибку, пытаясь перевести 'промежуточные убеждения' как 'zwischengeschaltete Überzeugungen', что в контексте КПТ звучит абсурдно.
  - [old/terminology/major] «zwischengeschaltete Überzeugungen» — это технический термин (например, в электронике), а не психологический термин КПТ. Правильно: Zwischenüberzeugungen.
  - [old/style/minor] «innere Einstellungen» — допустимо, но «innere Annahmen» в переводе A лучше передает психологический контекст.

