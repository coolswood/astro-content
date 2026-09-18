# QA: слепое парное сравнение переводов — en-b4-about_us

- **Дата**: 2026-09-18T11:48:59.543Z
- **Метка**: en-b4-about_us
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: texts/about_us.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 59773e25fd9cb826f3e71e3a543930f97721ad28

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## texts/about_us.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 1 | 🟢 0 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | — |
| **итого** | 1 | 🟢 0 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | — |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — —; OLD — style/minor×2, terminology/minor×1

### Детали пар (для спот-чека)

#### 🟡 en `/texts`— вердикт неустойчив

- **RU**: Вас приветствует команда MindHealth! Мы небольшая, но очень вдохновлённая команда, и да — на той самой фотографии действительно помещаемся все вместе. Мы семейная пара из Финляндии. Даниил — разработчик, который собственноручно написал каждую строчку кода в пр…
- **OLD**: The MindHealth team says hello! We’re a small but very inspired crew – and yes, everyone you see in that photo really does fit into one shot. We’re a couple based in Finland. Daniil is the developer who has personally written every line of code in the app. Sof…
- **NEW**: Welcome from the MindHealth team! We’re a small but highly inspired group, and yes — we really do all fit in that photo together. We’re a married couple from Finland. Daniil is the developer who personally wrote every single line of code in the app. Sofya is t…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more polished, professional, and follows the brand's tone of voice perfectly. It uses more natural idiomatic expressions (e.g., 'bring us smiles', 'get through tough times') and adheres strictly to the glossary (mental well-being). Translation B feels slightly more casual/fragmented and uses 'mental health' instead of the preferred 'mental well-being'.
  - [old/style/minor] The phrase 'The MindHealth team says hello!' is a bit weak for an intro compared to 'Welcome from...'.
  - [old/terminology/minor] Used 'mental health' instead of the project-standard 'mental well-being'.
  - [old/style/minor] 'everyone you see in that photo really does fit into one shot' is a bit wordy compared to the original.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 89)
  - Translation A sounds more natural and warm, fitting the 'understanding friend' tone. It uses better idiomatic expressions like 'fit into one shot' and 'move through tough times'. Translation B is slightly more formal and uses 'mental well-being' which is correct, but A's flow is superior for a personal story.
  - [new/style/minor] The phrasing 'Welcome from the MindHealth team!' is a bit stiff compared to the more natural 'The MindHealth team says hello!' or 'Welcome to MindHealth!'
  - [new/style/minor] The sentence 'In addition to us, we work with professionals...' is slightly more clinical/formal than the original's warm tone.

