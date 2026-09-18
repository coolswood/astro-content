# QA: слепое парное сравнение переводов — en-final-g1-articles

- **Дата**: 2026-09-18T20:24:48.538Z
- **Метка**: en-final-g1-articles
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: articles.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## articles.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 1 | 🟢 0 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | — |
| **итого** | 1 | 🟢 0 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | — |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — style/minor×4; OLD — —

### Детали пар (для спот-чека)

#### 🟡 en ``— вердикт неустойчив

- **RU**: Каждая прочитанная глава — это вклад в вашу внутреннюю опору. Вы замечаете больше и понимаете себя глубже. А это и есть путь к более здоровой жизни ✨ Каждая прочитанная строка приближает Вас к настоящему «Я». Понимание своих реакций и мотивов — это и есть путь…
- **OLD**: Every chapter you read is an investment in your inner strength. You notice more and understand yourself more deeply — and that’s exactly the path toward a healthier life ✨ Every line you read brings you closer to your true self. Understanding your reactions an…
- **NEW**: Every chapter you read is an investment in your inner strength. You’re noticing more and understanding yourself more deeply. And that is exactly what the path to a healthier life looks like ✨ Every line you read brings you closer to your true self. Understandi…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more idiomatic and follows the UX guidelines perfectly, using natural flow and contractions. Translation B feels slightly more 'translated' due to wordier structures and less natural phrasing in several places.
  - [new/style/minor] 'And that is exactly what the path... looks like' is unnecessarily wordy compared to the punchy A version.
  - [new/style/minor] 'Psychological literacy' is less common in a supportive UX context than 'Mental health literacy'.
  - [new/style/minor] 'Every new discovery' is a bit literal; 'insight' in A is much more natural for this context.
  - [new/style/minor] 'Emotional balance' is fine, but 'inner balance' (A) or 'peace of mind' (B's earlier part) fits the tone of the surrounding text better.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more idiomatic and follows the project's tone guidelines perfectly, especially regarding the use of 'mental well-being' and the flow of sentences. Translation B feels slightly more fragmented and uses less precise terminology (e.g., 'mental health literacy' instead of the more natural 'psychological literacy').
  - [old/style/minor] The phrasing 'mental health literacy' is a bit clunky compared to 'psychological literacy'.
  - [old/style/minor] The use of 'calm' as a noun for 'спокойствие' in this context is slightly less natural than 'peace of mind'.

