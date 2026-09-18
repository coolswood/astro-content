# QA: слепое парное сравнение переводов — en-final-g1-relax

- **Дата**: 2026-09-18T20:33:18.705Z
- **Метка**: en-final-g1-relax
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: relax.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## relax.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 9 | 🟢 4 | 🔴 0 | ⚪ 0 | 🟡 5 | 0 / 0 | 100% |
| **итого** | 9 | 🟢 4 | 🔴 0 | ⚪ 0 | 🟡 5 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×4, mistranslation/major×1; OLD — style/minor×2, style/major×1, mistranslation/major×1

### Детали пар (для спот-чека)

#### 🟢 en `/sounds/vacuum_cleaner` — NEW лучше (2:0)

- **RU**: Пылесос
- **OLD**: Vacuum Cleaner
- **NEW**: Vacuum cleaner
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - According to the project's style guide, UI elements and labels should use sentence case (only the first word capitalized). Translation B follows this rule, whereas A uses Title Case.
  - [old/style/minor] Uses Title Case instead of sentence case for a single-word label
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - According to the style guide, UI strings and labels should use sentence case (only the first word capitalized). Translation A follows this rule, while Translation B uses Title Case, which is incorrect for a simple noun label.
  - [old/style/minor] Uses Title Case instead of sentence case for a single-word label

#### 🟢 en `/sounds/conditioner` — NEW лучше (2:0)

- **RU**: Кондиционер
- **OLD**: Air Conditioner
- **NEW**: Air conditioner
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - According to the project's style guide, UI elements and labels should use sentence case (only the first word capitalized). Translation B follows this rule, whereas A uses Title Case.
  - [old/style/minor] Uses Title Case instead of sentence case for a single-word label
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - According to the project's style guide, UI elements and labels should use sentence case (only the first word capitalized) unless they are specific brand names or section titles. 'Air conditioner' follows this rule, whereas 'Air Conditioner' uses Title Case unnecessarily.
  - [old/style/minor] Incorrect capitalization (Title Case instead of sentence case for a general term/label)

#### 🟢 en `/sounds/drops` — NEW лучше (2:0)

- **RU**: Капли
- **OLD**: Dripping Water
- **NEW**: Drops
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 40 / NEW 95)
  - In the context of an app (likely a feature name or a metaphor), 'Drops' is the natural, concise noun. 'Dripping Water' sounds like a literal description of a physical process or a title of a nature documentary, which is unnatural for UI/UX.
  - [old/style/major] Too literal and wordy; sounds like a description of an action rather than a name/label.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 40 / NEW 100)
  - The original is a single noun 'Капли' (Drops), likely a title or a category. Translation A is a direct and accurate equivalent, whereas Translation B adds unnecessary words ('Water') and changes the noun to a gerund ('Dripping'), which is a mistranslation of the intent.
  - [old/mistranslation/major] Changed a simple noun 'Drops' into a descriptive phrase 'Dripping Water'
  - [old/addition/minor] Added 'Water' which is not present in the original

#### 🟡 en `/sounds/rain_roof`— вердикт неустойчив

- **RU**: Дождь по крыше
- **OLD**: Rain on the Roof
- **NEW**: Rain on the roof
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 95)
  - As a title, 'Rain on the Roof' follows standard Title Case conventions, whereas 'Rain on the roof' looks like an unfinished sentence or a fragment.
  - [new/style/minor] Does not follow Title Case for a title/heading
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A follows the sentence case rule for titles/headers as specified in the instructions, whereas Translation B uses Title Case which is less standard for simple UI headers in this project.
  - [old/style/minor] Uses Title Case instead of sentence case for a simple header

#### 🟡 en `/headers/instruments`— вердикт неустойчив

- **RU**: Музыкальные инструменты
- **OLD**: Musical Instruments
- **NEW**: Musical instruments
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 90)
  - The original is a title/heading. According to the guidelines for titles, Title Case (A) is appropriate, whereas sentence case (B) is typically reserved for UI elements like buttons or list items.
  - [new/style/minor] Uses sentence case for a heading, which is less standard for a main title/category name in this context.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - According to the project guidelines, UI strings and labels should use sentence case (only the first word capitalized), whereas Translation B uses Title Case.
  - [old/style/minor] Uses Title Case instead of the required sentence case for UI elements.

#### 🟡 en `/sounds/metro`— вердикт неустойчив

- **RU**: Метро
- **OLD**: Subway
- **NEW**: Metro
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - For a US English market, 'Subway' is the most natural and common term for an underground transit system, whereas 'Metro' often feels more international or specific to certain cities.
  - [new/style/minor] While 'Metro' is understood, 'Subway' is more idiomatic for the target US market.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 100)
  - Since the target market is international (US English), 'Metro' is a universally understood term for rapid transit, whereas 'Subway' is specifically North American. However, without context, 'Metro' is the safer, more neutral choice for a global audience.
  - [old/style/minor] Subway is more regional (US) and might feel less 'international' than Metro in a global app context.

#### 🟡 en `/sounds/bowl`— вердикт неустойчив

- **RU**: Чаша
- **OLD**: Singing Bowl
- **NEW**: Bowl
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 40)
  - In the context of mental well-being and mindfulness, 'Чаша' almost certainly refers to a 'Singing Bowl'. Translation B is too literal and loses the specific meaning of the object.
  - [new/mistranslation/major] The translation is too generic; 'Bowl' alone doesn't convey the intended meditative object.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 70 / NEW 100)
  - The original is a single word 'Чаша' without any modifiers. Translation A is a faithful, direct translation. Translation B adds 'Singing', which is an assumption not present in the source text.
  - [old/addition/major] Added 'Singing' which is not in the original text

#### 🟢 en `/sounds/seal` — NEW лучше (2:0)

- **RU**: Морской котик
- **OLD**: Seal
- **NEW**: Fur seal
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 70 / NEW 95)
  - The Russian term 'Морской котик' refers specifically to a fur seal, whereas 'Seal' is a generic term for all seals. Translation B is more accurate and precise.
  - [old/mistranslation/major] The translation is too generic; 'Seal' loses the specific species identity of 'Морской котик'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 70 / NEW 100)
  - Translation A is precise and correctly identifies the specific species (Fur seal), whereas Translation B is too generic (Seal), losing the specific meaning of the original.
  - [old/omission/major] The specific identifier 'Морской котик' (Fur seal) is reduced to a general 'Seal', which is a different animal group.

#### 🟡 en `/sounds/snow_steps`— вердикт неустойчив

- **RU**: Шаги по снегу
- **OLD**: Footsteps on Snow
- **NEW**: Footsteps in snow
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 90)
  - Translation A uses Title Case, which is appropriate for a title/heading, and the preposition 'on' is more natural for footsteps appearing on the surface of the snow. Translation B uses lowercase and 'in', which is grammatically possible but less idiomatic for a title.
  - [new/style/minor] Lowercase 'snow' in a title and the preposition 'in' make it feel less like a formal heading compared to A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - Translation A follows the sentence case rule for titles/labels and uses the more natural preposition 'in snow' for tracks left in the substance. Translation B incorrectly capitalizes 'Snow' and uses 'on', which sounds slightly less idiomatic for tracks embedded in the snow.
  - [old/style/minor] Incorrect capitalization of 'Snow' (should be sentence case) and less natural preposition 'on'.

