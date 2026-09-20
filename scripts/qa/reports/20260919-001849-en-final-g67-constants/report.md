# QA: слепое парное сравнение переводов — en-final-g67-constants

- **Дата**: 2026-09-18T21:18:49.355Z
- **Метка**: en-final-g67-constants
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: tests/constants.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/constants.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 4 | 🟢 0 | 🔴 2 | ⚪ 0 | 🟡 2 | 0 / 0 | 0% |
| **итого** | 4 | 🟢 0 | 🔴 2 | ⚪ 0 | 🟡 2 | 0 / 0 | 0% |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×1, style/major×1; OLD — style/minor×1

### Детали пар (для спот-чека)

#### 🔴 en `/sdvg` — OLD лучше (2:0)

- **RU**: Синдром дефицита внимания
- **OLD**: Attention deficit hyperactivity disorder (ADHD)
- **NEW**: ADHD
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 75)
  - The original text is the full name of the disorder, not its abbreviation. Translation B follows the rule of introducing the full term before the acronym, which is standard for educational/psychological content.
  - [new/style/minor] Uses only the abbreviation, which is too informal for a title/heading and doesn't match the original's completeness.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 75)
  - Translation A follows the standard rule of introducing a term with its full name followed by the abbreviation in parentheses, which is essential for educational/CBT content. Translation B is too abrupt for a title/heading and lacks the necessary formal introduction.
  - [new/style/minor] Too laconic for a heading; lacks the full term required for clarity and professional tone.

#### 🟡 en `/burnout`— вердикт неустойчив

- **RU**: Выгорание на работе
- **OLD**: Work burnout
- **NEW**: Burnout
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 98)
  - In English, 'Burnout' is the standard, idiomatic way to refer to occupational burnout without needing the redundant 'work'.
  - [old/style/minor] The addition of 'work' makes it sound slightly repetitive or like a direct translation from Russian, whereas 'Burnout' alone is the natural term for this concept.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 70)
  - Translation A accurately reflects the original meaning by specifying the context (work), whereas Translation B is too generic and loses the specific subject of the text.
  - [new/omission/major] The word 'work' (на работе) is omitted, making the translation overly broad.

#### 🔴 en `/okr` — OLD лучше (2:0)

- **RU**: Обсессивно-компульсивное расстройство
- **OLD**: Obsessive-compulsive disorder (OCD)
- **NEW**: OCD
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 100 / NEW 70)
  - According to the project guidelines, terms must be introduced with their full name followed by the abbreviation in parentheses upon first mention. Translation A is an abbreviation only, which violates the rule for first mentions.
  - [new/style/major] Uses only the abbreviation without the full term, which is incorrect for a first mention/heading.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 70)
  - The original text provides the full name of the disorder, so the translation must follow the rule of introducing the term in full before using the abbreviation. Translation B is an omission of the primary term.
  - [new/omission/major] The full name 'Obsessive-compulsive disorder' is missing; only the abbreviation is provided.

#### 🟡 en `/eat`— вердикт неустойчив

- **RU**: Расстройство пищевого поведения
- **OLD**: Eating disorder
- **NEW**: Eating disorders
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 95)
  - The original Russian text is in the singular form ('Расстройство'), so the singular English translation is more accurate. While 'Eating disorders' (B) is a common way to refer to the category in general, 'Eating disorder' (A) is a direct and precise match for the source.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 90 / NEW 100)
  - The Russian original uses the plural form ('Расстройства'), which is the standard way to refer to this category of conditions in English. Translation A correctly reflects this, while Translation B uses the singular, which sounds like a specific diagnosis rather than a general category.
  - [old/style/minor] Uses singular 'disorder' instead of the plural 'disorders' used in the original and standard medical English for this category.

