# QA: слепое парное сравнение переводов — de-newsystem

- **Дата**: 2026-09-12T22:46:17.989Z
- **Метка**: de-newsystem
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/perfectionism.json
- **Локали**: de
- **Сэмпл/файл**: 3
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 30b56bc18b00a3d1f474cb07c30edcd508b703d1

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/perfectionism.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 3 | 🟢 2 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | 100% |
| **итого** | 3 | 🟢 2 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | 100% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×3, mistranslation/major×1, omission/minor×1; OLD — style/minor×3, terminology/minor×2

### Детали пар (для спот-чека)

#### 🟢 de `/exercise/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Помочь тестированию реальности (когнитивной реструктуризации) могут следующие вопросы:</h2> <li>Какие у меня есть доказательства, подтверждающие эту мысль или убеждение?</li> <li>Полезна ли эта мысль?</li> <li>Есть ли другие способы, которыми я могу думать…
- **OLD**: <h2>Die folgenden Fragen können helfen, die Realität zu prüfen (kognitive Umstrukturierung):</h2> <li>Welche Beweise habe ich, die diesen Gedanken oder diese Überzeugung stützen?</li> <li>Ist dieser Gedanke hilfreich?</li> <li>Gibt es andere Wege, wie ich über…
- **NEW**: <h2>Die folgenden Fragen können Ihnen helfen, Ihre Gedanken auf ihren Realitätsgehalt zu prüfen (kognitive Umstrukturierung):</h2> <li>Welche Beweise sprechen für diesen Gedanken oder diese Überzeugung?</li> <li>Ist dieser Gedanke hilfreich für mich?</li> <li>…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B звучит более естественно и профессионально для терапевтического контекста. Он лучше справляется с передачей нюансов (например, 'alternative Sichtweise' вместо 'alternative Antwort' и 'Bedürfnisse stillen' вместо 'Bedürfnisse bewältigen'). Перевод A содержит стилистическую шероховатость в фразе 'Bewältigt dieses Verhalten wirklich Ihre Ängste', что звучит как калька.
  - [old/style/minor] Фраза 'Bewältigt dieses Verhalten wirklich Ihre Ängste' звучит неестественно; страхи обычно 'преодолевают' или 'смягчают', а не 'справляются ими как поведением'.
  - [old/terminology/minor] Использовано 'alternative Antwort' (альтернативный ответ), в то время как в КПТ контексте 'alternative Sichtweise' (альтернативная точка зрения) является более точным и принятым термином.
  - [new/style/minor] Фраза 'geht das Rennen von vorne los' — вольный перевод 'снова в эту гонку', но в данном контексте звучит вполне по-немецки.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more natural and stylistically superior. It avoids the clunky 'es-constructions' and literal translations found in B. Specifically, A uses 'Gedanken auf ihren Realitätsgehalt zu prüfen' which is much more professional than B's 'die Realität zu prüfen'. A also handles the 'if... then' questions and the emotional nuances of the text with better flow and rhythm.
  - [old/style/minor] The phrase 'die Realität zu prüfen' sounds a bit too simplistic/literal compared to the psychological context.
  - [old/style/minor] The question 'Bewältigt dieses Verhalten wirklich Ihre Ängste...' is a bit heavy/clunky (nominalization style).
  - [old/style/minor] The use of 'Euphorie' for 'блаженство' is a slight shift in tone, though acceptable; however, A's 'Glück empfunden' fits the empathetic tone better.

#### 🟡 de `/screen_3/texts`— вердикт неустойчив

- **RU**: Исследователи считают, что невротический перфекционизм формируется под воздействием детского опыта с родителями, которые проявляли любовь условно (за оценки, результаты и т. п.) или вообще не проявляли никакого одобрения. В том и другом случае у ребенка появля…
- **OLD**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe an Bedingungen knüpften (wie etwa an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwickel…
- **NEW**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe nur an Bedingungen knüpften (wie etwa an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwi…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 78)
  - Перевод A гораздо точнее передает смысл оригинала. Перевод B допускает серьезную смысловую ошибку, заменяя 'синдром отличника' на 'Musterknaben-Syndrom' (что в немецком языке звучит как идиома о 'образцовом мальчике', но не является устоявшимся психологическим термином для описания перфекционизма) и искажает фразу про ценность ребенка. Также в A лучше передана структура предложений без лишних нагромождений.
  - [new/mistranslation/major] «Musterknaben-Syndrom» — это не эквивалент «синдрома отличника» в психологическом контексте; это скорее разговорное описание 'образцового ребенка', тогда как в A использовано более подходящее по смыслу описание.
  - [new/omission/minor] В первом абзаце пропущено уточнение 'для себя и для них' (für sich selbst und für sie), что важно для передачи мотивации ребенка.
  - [new/style/minor] Использование 'Beziehungsarbeit' (работа над отношениями) в контексте нехватки поддержки от родителей звучит слишком по-терапевтически/профессионально, в то время как оригинал говорит о помощи в отношениях (Zuwendung/Unterstützung).
  - [old/style/minor] Перевод «Übersteigerte Leistungsstreben» для «синдрома отличника» является вольной интерпретацией, так как прямого термина нет, но это звучит лучше, чем ошибка в B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 94)
  - Перевод A гораздо точнее передает смысл оригинала, особенно в части 'синдрома отличника' и ценности ребенка 'для себя и для них'. Перевод B допускает серьезную смысловую ошибку, заменяя 'синдром отличника' на 'чрезмерное стремление к достижениям', что является другим психологическим понятием.
  - [old/mistranslation/major] «синдром отличника» переведен как «Übersteigerte Leistungsstreben», что не является эквивалентом и искажает суть термина.
  - [old/omission/major] Пропущено предложение про критику и требовательность родителей во втором абзаце.
  - [old/style/minor] В списке пунктов пропущено упоминание помощи в отношениях (Beziehungsarbeit/Unterstützung in Beziehungen), заменено на более узкое 'Zuwendung'.
  - [new/style/minor] Использование «Musterknaben-Syndrom» — это очень удачная и естественная адаптация «синдрома отличника» для немецкого языка.

#### 🟢 de `/exercise/screen_1/texts` — NEW лучше (2:0)

- **RU**: Современные ученые различают два типа перфекционизма: негативный и позитивный, или, иначе говоря, здоровый и патологический. Чтобы превратить минус в плюс, важно сочетать свои лидерские качества и стремление к совершенству со здравым смыслом и рациональностью.…
- **OLD**: Die moderne Wissenschaft unterscheidet zwei Arten von Perfektionismus: den ungesunden und den gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach Exzellenz mit gesundem Menschenverstand und Rationalität zu verbinden. Wi…
- **NEW**: Die moderne Wissenschaft unterscheidet zwei Arten von Perfektionismus: den negativen und den positiven – oder anders ausgedrückt: den ungesunden und den gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach Exzellenz mit …
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B значительно лучше справляется с терминологией и стилистикой. В частности, он использует утвержденный термин 'alternative Sichtweise' вместо 'rationale Antwort', что критично для консистентности приложения. Также перевод B более естественно передает смысл предложения про плюсы и минусы ('Nachteile deutlich überwiegen') и лучше адаптирует фразу про убеждения.
  - [old/terminology/minor] Использовал 'rationale Antwort' вместо принятого в глоссарии 'alternative Sichtweise'.
  - [old/style/minor] Фраза 'dass man auf keinen Fall Fehler machen darf' звучит чуть менее естественно, чем вариант в B.
  - [new/style/minor] В первом предложении добавлено тире, что делает структуру более живой, чем в A, хотя в оригинале запятая.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A безупречен: он точно следует оригиналу, соблюдает все требования по терминологии (Gedankentagebuch, alternative Sichtweise) и звучит максимально естественно. Перевод B допускает серьезную ошибку в первом предложении (omission), выбрасывая часть оригинала про негативный/позитивный перфекционизм, и использует менее удачную формулировку 'rationale Antwort' вместо принятого в глоссарии термина 'alternative Sichtweise'.
  - [old/omission/major] Пропущено противопоставление 'negativen und den positiven' в первом предложении.
  - [old/terminology/minor] Использовано 'rationale Antwort' вместо рекомендованного 'alternative Sichtweise'.
  - [old/style/minor] Фраза 'Belastung ist größer als der Nutzen' (нагрузка больше пользы) — это вольный перевод 'трудностей больше, чем преимуществ', звучащий чуть менее естественно в данном контексте.

