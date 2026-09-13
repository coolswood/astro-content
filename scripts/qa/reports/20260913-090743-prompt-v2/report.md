# QA: слепое парное сравнение переводов — prompt-v2

- **Дата**: 2026-09-13T06:07:43.642Z
- **Метка**: prompt-v2
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/perfectionism.json
- **Локали**: de
- **Сэмпл/файл**: 3
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: e5f619e3caa4d09e8c2e79d0b392e4f3042b4e2d

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/perfectionism.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 3 | 🟢 0 | 🔴 2 | ⚪ 0 | 🟡 1 | 0 / 0 | 0% |
| **итого** | 3 | 🟢 0 | 🔴 2 | ⚪ 0 | 🟡 1 | 0 / 0 | 0% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×3, terminology/major×1, mistranslation/minor×1; OLD — —

### Детали пар (для спот-чека)

#### 🔴 de `/exercise/screen_2/texts` — OLD лучше (2:0)

- **RU**: <h2>Помочь тестированию реальности (когнитивной реструктуризации) могут следующие вопросы:</h2> <li>Какие у меня есть доказательства, подтверждающие эту мысль или убеждение?</li> <li>Полезна ли эта мысль?</li> <li>Есть ли другие способы, которыми я могу думать…
- **OLD**: <h2>Die folgenden Fragen können Ihnen helfen, Ihre Gedanken auf ihren Realitätsgehalt zu prüfen (kognitive Umstrukturierung):</h2> <li>Welche Beweise sprechen für diesen Gedanken oder diese Überzeugung?</li> <li>Ist dieser Gedanke hilfreich für mich?</li> <li>…
- **NEW**: <h2>Die folgenden Fragen können Ihnen helfen, Ihre Gedanken auf die Realität zu prüfen (kognitive Umstrukturierung):</h2> <li>Welche Beweise habe ich, die diesen Gedanken oder diese Überzeugung stützen?</li> <li>Ist dieser Gedanke hilfreich für mich?</li> <li>…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more professional and follows the glossary perfectly. Specifically, it correctly uses 'alternative Sichtweise' for the adaptive response, whereas B uses 'alternative Überzeugung', which is a different concept in CBT. A also sounds more natural in its phrasing.
  - [new/terminology/major] Used 'alternative Überzeugung' instead of the required 'alternative Sichtweise' for the adaptive response context.
  - [new/style/minor] The phrasing 'auf die Realität zu prüfen' is slightly less elegant than 'auf ihren Realitätsgehalt zu prüfen'.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation B is more professional and adheres better to the provided glossary and stylistic guidelines. Specifically, it correctly uses 'Alternative Sichtweise' instead of a literal translation, and its phrasing is more natural for a therapeutic context.
  - [new/terminology/minor] Used 'alternative Überzeugung' instead of the required 'Alternative Sichtweise'.
  - [new/style/minor] The phrasing 'Gedanken auf die Realität zu prüfen' is slightly less idiomatic than 'auf ihren Realitätsgehalt zu prüfen'.
  - [new/style/minor] The translation of 'жажда признания' as 'Sehnsucht nach Anerkennung' is okay, but 'Wunsch nach Anerkennung' in B is more neutral and fits the expert-friend tone better.
  - [old/style/minor] The phrase 'Helfen Ihnen diese Verhaltensweisen' is a slight deviation from 'закрываете эти страхи', but it sounds much more natural in German than a literal translation of 'closing needs'.

#### 🟡 de `/screen_3/texts`— вердикт неустойчив

- **RU**: Исследователи считают, что невротический перфекционизм формируется под воздействием детского опыта с родителями, которые проявляли любовь условно (за оценки, результаты и т. п.) или вообще не проявляли никакого одобрения. В том и другом случае у ребенка появля…
- **OLD**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe nur an Bedingungen knüpften (wie etwa an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwi…
- **NEW**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe nur an Bedingungen knüpften (wie etwa an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwi…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Перевод A более точен в передаче нюансов оригинала. В частности, термин 'Musterknaben-Syndrom' (синдром отличника) в контексте школы и перфекционизма звучит гораздо естественнее и точнее, чем 'Überflieger-Syndrom' (синдром 'выскочки' или сверхчеловека) в переводе B. Также перевод A лучше сохраняет структуру последнего предложения.
  - [new/mistranslation/minor] «Überflieger-Syndrom» не совсем эквивалентно «синдрому отличника»; Überflieger — это скорее успешный, выдающийся человек, а не тот, кто стремится к идеалу из страха.
  - [new/style/minor] Фраза «wird das Kind dazu angehalten» (ребенка побуждают) немного меняет смысл оригинала «стимулирует его формализовать» (процесс идет через систему оценок).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 94)
  - Перевод A гораздо естественнее звучит в части описания 'синдрома отличника'. Перевод B использует термин 'Musterknaben-Syndrom', который в немецком языке не является устоявшимся психологическим термином и звучит скорее как описание 'золотого ребенка', в то время как 'Überflieger-Syndrom' или просто описание механизма в A ближе к контексту перфекционизма. Также в A лучше выстроена структура последнего предложения.
  - [old/style/major] Термин 'Musterknaben-Syndrom' звучит неестественно; в немецком это скорее 'Musterknabe' (отличник), но не 'синдром'.
  - [old/style/minor] Фраза 'Beziehungsarbeit' (работа над отношениями) в контексте нехватки поддержки у ребенка звучит слишком по-канцелярски/терапевтично, в оригинале просто 'помощь в отношениях'.
  - [old/style/minor] Конструкция 'wird die Strategie gewählt' (пассив) в последнем абзаце тяжеловесна по сравнению с активным 'wählt das Kind' в варианте A.

#### 🔴 de `/exercise/screen_1/texts` — OLD лучше (2:0)

- **RU**: Современные ученые различают два типа перфекционизма: негативный и позитивный, или, иначе говоря, здоровый и патологический. Чтобы превратить минус в плюс, важно сочетать свои лидерские качества и стремление к совершенству со здравым смыслом и рациональностью.…
- **OLD**: Die moderne Wissenschaft unterscheidet zwei Arten von Perfektionismus: den negativen und den positiven – oder anders ausgedrückt: den ungesunden und den gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach Exzellenz mit …
- **NEW**: Die moderne Wissenschaft unterscheidet zwei Arten von Perfektionismus: den negativen und den positiven – oder anders ausgedrückt: den ungesunden und den gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach Exzellenz mit …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 90)
  - Перевод A безупречен: он точно следует глоссарию (alternative Sichtweise formulieren), соблюдает правила типографики (немецкие кавычки „“) и сохраняет естественный ритм. Перевод B допустим, но содержит небольшую стилистическую шероховатость в конце и использует менее удачную конструкцию в одном из предложений.
  - [new/style/minor] Конструкция 'ihnen eine alternative Sichtweise geben' звучит чуть менее естественно, чем 'formulieren' в контекте КПТ.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод B более точен в плане терминологии и стилистики. В частности, использование 'eine alternative Sichtweise formulieren' звучит более естественно для процесса работы в дневнике, чем 'geben'. Также перевод B лучше справляется с перечислением в предложении про убеждения, избегая тяжеловесного 'oder' в середине конструкции.
  - [new/style/minor] Фраза 'ihnen eine alternative Sichtweise geben' звучит немного упрощенно/разговорно по сравнению с 'formulieren'.
  - [new/style/minor] В предложении про убеждения структура 'oder halten an...' чуть менее гладкая, чем в варианте B.

