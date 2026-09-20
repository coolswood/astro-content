# QA: слепое парное сравнение переводов — en-final-g23-affirmation

- **Дата**: 2026-09-18T20:37:15.643Z
- **Метка**: en-final-g23-affirmation
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: homeBot/affirmation.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## homeBot/affirmation.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 1 | 🟢 0 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | — |
| **итого** | 1 | 🟢 0 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | — |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — —; OLD — omission/minor×1, style/minor×1

### Детали пар (для спот-чека)

#### 🟡 en ``— вердикт неустойчив

- **RU**: Я достоин счастья и любви в своей жизни. Каждый день я становлюсь сильнее и мудрее. Я выбираю позитивное мышление и принимаю себя таким, какой я есть. Я отпускаю прошлое и двигаюсь вперед с надеждой и уверенностью. Мои чувства имеют значение, я позволяю себе и…
- **OLD**: I am worthy of happiness and love. Every day I grow stronger and wiser. I choose positive thinking and accept myself as I am. I let go of the past and move forward with hope and confidence. My feelings matter; I allow myself to express them and let them go. I …
- **NEW**: I deserve happiness and love in my life. Every day, I become stronger and wiser. I choose positive thinking and accept myself exactly as I am. I let go of the past and move forward with hope and confidence. My feelings matter; I allow myself to express and rel…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 91 / NEW 96)
  - Translation A is more faithful to the original text's structure and completeness. It avoids the slight omissions found in B (e.g., 'in my life', 'and my abilities') and maintains a more consistent, rhythmic flow suitable for affirmations.
  - [old/omission/minor] Omitted several qualifying phrases like 'in my life' or 'and my abilities' which, while making the text punchier, deviates from the original's specific intent.
  - [old/style/minor] Some phrasing is slightly less idiomatic for affirmations, e.g., 'I care for my well-being' instead of 'I support my well-being'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 90)
  - Translation A is superior because it feels more like natural, idiomatic English affirmations. It avoids the slightly repetitive and 'translated' feel of Translation B by using more varied and sophisticated vocabulary (e.g., 'cherish', 'aligned', 'embrace', 'reach for more') and better rhythmic flow. Translation B often falls into literalism (e.g., 'I meet each day' vs 'I greet each day', 'I rejoice in' vs 'I welcome').
  - [new/style/minor] Some phrasing is slightly clunky or overly literal (e.g., 'I meet each day', 'I rejoice in every new day').
  - [new/style/minor] Uses 'Universe' with a capital U, which is fine, but A's more subtle approach to these spiritual concepts feels more modern for a mental health app.

