# QA: слепое парное сравнение переводов — editor-thinking-ab

- **Дата**: 2026-09-11T16:17:42.542Z
- **Метка**: editor-thinking-ab
- **Сравнение**: NEW = рабочее дерево; OLD = --old-dir /tmp/ab-de-baseline
- **Файлы**: story/distortions/perfectionism.json
- **Локали**: de
- **Сэмпл/файл**: 12
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 52d3189556b85f412ef73a0bcff2bcc056768545

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/perfectionism.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 8 | 🟢 1 | 🔴 2 | ⚪ 3 | 🟡 2 | 0 / 0 | 33% |
| **итого** | 8 | 🟢 1 | 🔴 2 | ⚪ 3 | 🟡 2 | 0 / 0 | 33% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — omission/minor×2, style/minor×1; OLD — style/minor×2, style/major×1

### Детали пар (для спот-чека)

#### ⚪ de `/exercise/screen_2/texts`— ничья (2:0)

- **RU**: <h2>Помочь тестированию реальности (когнитивной реструктуризации) могут следующие вопросы:</h2> <li>Какие у меня есть доказательства, подтверждающие эту мысль или убеждение?</li> <li>Полезна ли эта мысль?</li> <li>Есть ли другие способы, которыми я могу думать…
- **OLD**: <h2>Folgende Fragen können Ihnen beim Realitätscheck (der kognitiven Umstrukturierung) helfen:</h2> <li>Welche Beweise habe ich, die diesen Gedanken oder diese Überzeugung stützen?</li> <li>Ist dieser Gedanke hilfreich?</li> <li>Gibt es andere Wege, wie ich üb…
- **NEW**: <h2>Diese Fragen können Ihnen beim Realitätscheck (der kognitiven Umstrukturierung) helfen:</h2> <li>Welche Beweise habe ich, die diesen Gedanken oder diese Überzeugung stützen?</li> <li>Ist dieser Gedanke hilfreich?</li> <li>Gibt es andere Wege, wie ich über …
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - The two translations are virtually identical. They both follow all stylistic guidelines, use correct German typography (low-high quotes), and employ the correct CBT terminology (kognitive Umstrukturierung, alternative Antwort). The only difference is a very minor stylistic variation in one sentence, which does not affect the quality or meaning.
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Both translations are of exceptionally high quality, following all stylistic, terminological, and typographic rules. They are virtually identical in the core text, with only negligible differences in sentence structure in the latter half that do not affect the quality or meaning.
  - [new/style/minor] Slightly more concise in the 'Schauen Sie sich um' sentence, which is fine.
  - [old/style/minor] Slightly more literal to the Russian 'Осмотритесь и спросите себя' (Schauen Sie sich um und fragen Sie sich), but still sounds natural.

#### ⚪ de `/screen_3/texts`— ничья (2:0)

- **RU**: Исследователи считают, что невротический перфекционизм формируется под воздействием детского опыта с родителями, которые проявляли любовь условно (за оценки, результаты и т. п.) или вообще не проявляли никакого одобрения. В том и другом случае у ребенка появля…
- **OLD**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe nur an Bedingungen knüpften (z. B. an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwicke…
- **NEW**: Die Forschung geht davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe nur an Bedingungen knüpften (z. B. an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entw…
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Both translations are virtually identical and of exceptionally high quality. They avoid Russian syntactic structures, use appropriate psychological terminology (e.g., 'Schwarz-Weiß-Denken'), and handle the 'Musterknaben-Syndrom' adaptation perfectly. The only difference is a negligible variation in the first sentence ('Forscher gehen davon aus' vs 'Die Forschung geht davon aus'), both of which are natural and correct.
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Both translations are identical. They are excellent, using natural German phrasing (e.g., 'an Bedingungen knüpfen', 'Schwarz-Weiß-Denken') and correctly handling the psychological context and typography.

#### 🟡 de `/exercise/screen_1/texts`— вердикт неустойчив

- **RU**: Современные ученые различают два типа перфекционизма: негативный и позитивный, или, иначе говоря, здоровый и патологический. Чтобы превратить минус в плюс, важно сочетать свои лидерские качества и стремление к совершенству со здравым смыслом и рациональностью.…
- **OLD**: Die moderne Wissenschaft unterscheidet zwischen zwei Arten von Perfektionismus: dem negativen und dem positiven – oder anders ausgedrückt: dem pathologischen und dem gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach E…
- **NEW**: Die Wissenschaft unterscheidet zwischen zwei Arten von Perfektionismus: dem negativen und dem positiven – oder anders ausgedrückt: dem pathologischen und dem gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach Exzellenz…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 98 / NEW 95)
  - Оба перевода выполнены на высочайшем уровне, с соблюдением всей терминологии (Gedankentagebuch, rationale Antwort) и отличным стилем. Разница лишь в одном слове в первом предложении: перевод A сохраняет 'Die moderne Wissenschaft' (современные ученые/наука), что точнее передает оригинал, в то время как B опускает 'moderne'. Также в A использованы правильные немецкие кавычки в цитате, хотя в обоих вариантах технический тег <q> требует внимания к атрибутам.
  - [new/omission/minor] пропущено прилагательное 'moderne' в первом предложении
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Both translations are virtually identical and of professional quality. They correctly use the required terminology (Gedankentagebuch, rationale Antwort) and follow the stylistic guidelines perfectly. The only difference is the quotation marks in the Michael Jordan quote, but since the original used a custom tag <q>, both versions are acceptable, though A's use of standard German quotes is slightly more conventional for text content.

#### 🟡 de `/exercise/title`— вердикт неустойчив

- **RU**: Как быть, если перфекционизм есть, идеала нет, а вы хотите нормально жить?
- **OLD**: Was tun, wenn der Perfektionismus da ist, das Ideal aber fehlt und Sie einfach normal leben wollen?
- **NEW**: Was tun, wenn der Perfektionismus überhandnimmt, das Ideal aber unerreichbar bleibt?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 92)
  - Перевод A звучит гораздо более естественно и литературно, используя удачную метафору 'überhandnimmt' (берет верх/преобладает), что идеально передает смысл 'перфекционизм есть'. Перевод B страдает от тяжеловесной кальки 'der Perfektionismus da ist' и избыточного, упрощенного слога в конце.
  - [old/style/major] Конструкция 'der Perfektionismus da ist' — это типичная калька с русского, которая звучит очень непрофессионально и по-детски.
  - [old/style/minor] Фраза 'einfach normal leben wollen' звучит слишком обыденно и теряет философский/терапевтический подтекст оригинала.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 75)
  - Перевод A точно передает смысл оригинала, включая финальную часть про желание 'нормально жить'. Перевод B значительно сокращает текст, теряя важную часть посыла (omission), и меняет смысл 'наличия' перфекционизма на его 'преобладание' (überhandnimmt).
  - [new/omission/major] Пропущена часть фразы 'а вы хотите нормально жить?'
  - [new/style/minor] Использование 'überhandnimmt' (берет верх/преобладает) — это интерпретация, которой нет в оригинале.

#### 🟢 de `/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Модель перфекционизма на примере</h2> Напомним, что согласно когнитивно-поведенческой психотерапии, наш жизненный опыт формирует убеждения о себе, других людях и мире. Эти убеждения, в свою очередь, определяют наши жизненные стратегии и правила. В качестве…
- **OLD**: <h2>Ein Modell des Perfektionismus am Beispiel</h2> Zur Erinnerung: Gemäß der kognitiven Verhaltenstherapie (KVT) prägen unsere Lebenserfahrungen die Überzeugungen über uns selbst, andere Menschen und die Welt. Diese Überzeugungen bestimmen wiederum unsere Leb…
- **NEW**: <h2>Ein Beispiel für Perfektionismus</h2> Zur Erinnerung: In der kognitiven Verhaltenstherapie (KVT) geht man davon aus, dass unsere Lebenserfahrungen die Überzeugungen über uns selbst, andere Menschen und die Welt prägen. Diese Überzeugungen bestimmen wiederu…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Both translations are excellent and follow all professional guidelines, including terminology (Grundüberzeugung, KVT). Translation A is slightly better due to a more natural heading and a more precise rendering of the 'Teufelskreis' sentence.
  - [old/style/minor] The heading 'Ein Modell des Perfektionismus am Beispiel' is slightly clunky compared to A's 'Ein Beispiel für Perfektionismus'. Also, A's use of 'allerdings' in the circular logic sentence flows better than B's 'aber'.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 92 / NEW 96)
  - Both translations are excellent and follow the professional CBT terminology perfectly. Translation B is slightly superior due to more natural phrasing in the narrative sections (e.g., 'Sollte ihm dies gelingen' vs 'Wenn ihm dies gelingt' and 'gerecht werden kann' vs 'gerecht zu werden').
  - [old/style/minor] The phrasing 'Wenn ihm dies gelingt' is grammatically correct but slightly more colloquial/basic than the more elegant 'Sollte ihm dies gelingen' used in B. 'gerecht zu werden' is a bit more clunky than 'gerecht werden kann' in this context.

#### 🔴 de `/exercise/screen_3/texts` — OLD лучше (2:0)

- **RU**: В жизни редко что дается без ошибок и неудач. Никто не рождается мастером – мы учимся, пробуем, ошибаемся и постепенно совершенствуемся. Так разрешите себе быть неидеальным, делать что-то не до конца, допускать промахи. Ошибки – не враги, а помощники на пути к…
- **OLD**: Im Leben gibt es selten etwas ohne Fehler und Rückschläge. Niemand wird als Meister geboren – wir lernen durch Ausprobieren, machen Fehler und verbessern uns Schritt für Schritt. Erlauben Sie sich daher, unvollkommen zu sein, Dinge nicht immer perfekt zu Ende …
- **NEW**: Im Leben gibt es selten etwas ohne Fehler und Rückschläge. Niemand wird als Meister geboren – wir lernen durch Ausprobieren, machen Fehler und verbessern uns Schritt für Schritt. Erlauben Sie sich daher, unvollkommen zu sein, Dinge nicht immer perfekt zu Ende …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 100 / NEW 98)
  - Both translations are excellent and virtually identical, showing a high level of professional localization. Translation A is slightly better only because it avoids a minor typo found in B.
  - [new/style/minor] Typo: 'sowohl große als als kleine' (should be 'als auch').
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 96)
  - The translations are nearly identical and of extremely high quality. Translation B is slightly better due to the inclusion of the article 'Der' before 'Perfektionismus', which sounds more natural in this context in German.
  - [new/style/minor] Missing the article 'Der' before 'Perfektionismus' makes the sentence slightly less fluid, though not grammatically wrong.

#### ⚪ de `/exercise/screen_4/texts`— ничья (2:0)

- **RU**: <h2>Используйте «технику жадности»</h2> Она основана на том простом факте, что большинство из нас стремится быть совершенным, чтобы преуспеть в жизни. Возможно, вам не приходило в голову, что вы можете оказаться намного успешнее, если понизите стандарты. К при…
- **OLD**: <h2>Nutzen Sie die „Gier-Technik“</h2> Sie basiert auf der einfachen Tatsache, dass die meisten von uns nach Perfektion streben, um im Leben erfolgreich zu sein. Dabei ist Ihnen vielleicht noch nicht bewusst, dass Sie viel erfolgreicher sein könnten, wenn Sie …
- **NEW**: <h2>Nutzen Sie die „Gier-Technik“</h2> Sie basiert auf der einfachen Tatsache, dass die meisten von uns nach Perfektion streben, um im Leben erfolgreich zu sein. Dabei ist Ihnen vielleicht noch nicht bewusst, dass Sie viel erfolgreicher sein könnten, wenn Sie …
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Both translations are virtually identical and of exceptionally high quality. They follow all stylistic guidelines, use correct German typography (low-high quotes), and handle the psychological terminology perfectly. The only microscopic difference is in the second paragraph ('arbeitete... an' vs 'schrieb... an'), but both are natural and correct.
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 100 / NEW 100)
  - Both translations are virtually identical and of exceptionally high quality. They follow all stylistic guidelines, use correct German typography (low-high quotes), adhere to the 'Sie' form, and use appropriate psychological terminology (e.g., 'destruktive Überzeugungen', 'hilfreichere Gedanken'). The only difference is a tiny variation in the second paragraph ('schrieb... an' vs 'arbeitete... an'), both of which are perfectly natural and correct.

#### 🔴 de `/screen_1/texts` — OLD лучше (2:0)

- **RU**: Желание достичь высоких стандартов, успешно выполнить задачи и быть продуктивным является довольно положительным качеством. Также, как желание быть принятым, одобренным, любимым или иметь значимые достижения в жизни. Когда это остается на уровне желаний, стрем…
- **OLD**: Der Wunsch, hohe Standards zu setzen, Aufgaben erfolgreich zu bewältigen und produktiv zu sein, ist eine durchaus positive Eigenschaft. Ähnlich verhält es sich mit dem Bedürfnis, akzeptiert, geschätzt und geliebt zu werden oder bedeutende Leistungen im Leben z…
- **NEW**: Der Wunsch, hohe Standards zu setzen, Aufgaben erfolgreich zu bewältigen und produktiv zu sein, ist eine wertvolle Eigenschaft. Ähnlich verhält es sich mit dem Bedürfnis, akzeptiert, geschätzt und geliebt zu werden oder bedeutende Leistungen im Leben zu erbrin…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 92)
  - Перевод A точнее передает нюансы оригинала. В частности, он сохраняет эпитет 'серая' (graue) в описании рутины и более полно передает смысл фразы про критику (жестко критикует себя ИЛИ других), в то время как в B этот момент слегка упрощен.
  - [new/omission/minor] пропущено прилагательное 'graue' (серая) в описании рутины, что важно для передачи эмоционального тона оригинала
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 92)
  - Перевод B точнее передает эмоциональный окрас оригинала (добавлено 'grauen' для 'серой рутины') и чуть лучше справляется с нюансами (строгость критики). Оба перевода выполнены на высоком уровне.
  - [new/omission/minor] Пропущено прилагательное 'серая' (grau) в контексте рутины, что важно для передачи настроения оригинала.

