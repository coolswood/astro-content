# QA: слепое парное сравнение переводов — pathmap-vs-tree

- **Дата**: 2026-09-11T20:15:55.952Z
- **Метка**: pathmap-vs-tree
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/perfectionism.json
- **Локали**: de
- **Сэмпл/файл**: 15
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: ca0dac8ff6809a59445bd7a3d0780b969c051ed6

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/perfectionism.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 12 | 🟢 3 | 🔴 2 | ⚪ 0 | 🟡 7 | 0 / 0 | 60% |
| **итого** | 12 | 🟢 3 | 🔴 2 | ⚪ 0 | 🟡 7 | 0 / 0 | 60% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×7, mistranslation/major×1, omission/minor×1, omission/major×1, mistranslation/minor×1, style/major×1; OLD — style/minor×11, terminology/minor×2, style/major×1, addition/minor×1, omission/minor×1

### Детали пар (для спот-чека)

#### 🟡 de `/exercise/screen_2/texts`— вердикт неустойчив

- **RU**: <h2>Помочь тестированию реальности (когнитивной реструктуризации) могут следующие вопросы:</h2> <li>Какие у меня есть доказательства, подтверждающие эту мысль или убеждение?</li> <li>Полезна ли эта мысль?</li> <li>Есть ли другие способы, которыми я могу думать…
- **OLD**: <h2>Folgende Fragen können Ihnen beim Realitätscheck (der kognitiven Umstrukturierung) helfen:</h2> <li>Welche Beweise habe ich, die diesen Gedanken oder diese Überzeugung stützen?</li> <li>Ist dieser Gedanke hilfreich?</li> <li>Gibt es andere Wege, wie ich üb…
- **NEW**: <h2>Die folgenden Fragen können helfen, die Realität zu prüfen (kognitive Umstrukturierung):</h2> <li>Welche Beweise habe ich, die diesen Gedanken oder diese Überzeugung stützen?</li> <li>Ist dieser Gedanke hilfreich?</li> <li>Gibt es andere Wege, wie ich über…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A звучит гораздо более естественно и профессионально. В нем лучше выдержан ритм текста, а формулировки (например, 'Realitätscheck' вместо тяжеловесного 'die Realität zu prüfen' и 'das Rennen geht von vorne los' вместо 'der Kreislauf') звучат как живая немецкая речь, а не перевод. Перевод B местами грешит избыточностью и менее удачным синтаксисом.
  - [new/style/minor] Заголовок 'Die folgenden Fragen können helfen, die Realität zu prüfen' звучит тяжеловесно по сравнению с 'Realitätscheck'.
  - [new/style/minor] Фраза 'Bewältigt dieses Verhalten wirklich Ihre Ängste' звучит немного суховато/клинически, в то время как вариант A более эмпатичен.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод A звучит более естественно и литературно. В нем лучше переданы нюансы разговорного стиля (например, 'geht der Kreislauf wieder von vorne los' вместо кальки 'geht das Rennen von vorne los'). Также перевод A точнее соблюдает структуру предложений оригинала в части вопросов про перфекционизм.
  - [old/style/minor] Фраза 'geht das Rennen von vorne los' является слишком буквальным переводом русской метафоры 'в эту гонку', в немецком это звучит неестественно; вариант A с 'Kreislauf' (цикл) гораздо уместнее.
  - [old/style/minor] Использование 'perfekt performt' — это англицизм, который звучит несколько тяжеловесно в данном контексте, хотя и допустим; вариант A 'einen perfekten Auftritt hingelegt' звучит более по-немецки.

#### 🔴 de `/screen_3/texts` — OLD лучше (2:0)

- **RU**: Исследователи считают, что невротический перфекционизм формируется под воздействием детского опыта с родителями, которые проявляли любовь условно (за оценки, результаты и т. п.) или вообще не проявляли никакого одобрения. В том и другом случае у ребенка появля…
- **OLD**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe nur an Bedingungen knüpften (z. B. an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwicke…
- **NEW**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe an Bedingungen knüpften (wie etwa an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwickel…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Перевод A гораздо точнее передает смысл оригинала, особенно в части 'синдрома отличника' (Musterknaben-Syndrom), в то время как перевод B заменяет его на 'чрезмерное стремление к достижениям', что является смысловой потерей. Также в A лучше сохранена структура предложений и нюансы родительского поведения.
  - [new/mistranslation/major] Синдром отличника переведен как 'Übersteigerte Leistungsstreben', что является описанием процесса, а не конкретным термином/феноменом, как в оригинале.
  - [new/omission/minor] Пропущено предложение про то, что родители перфекционистов проявляют чрезмерную критику и отказывают в поддержке (второй абзац оригинала).
  - [new/style/minor] Фраза 'müssen Kinder ihre Erfolge... formalisieren' звучит чуть более принудительно, чем в оригинале, где акцент на стимуле (stimuliert).
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Перевод B гораздо точнее передает смысл оригинала, особенно в части описания поведения родителей, которую перевод A пропустил (omission). Также перевод B лучше адаптирует понятие «синдром отличника» через уместный немецкий термин «Musterknaben-Syndrom», в то время как перевод A использует слишком тяжеловесную и не совсем точную конструкцию.
  - [new/omission/major] Пропущено целое предложение: 'Часто родители перфекционистов проявляют чрезмерную критику, отказывают ребенку в поддержке и проявляют высокую требовательность.'
  - [new/mistranslation/minor] «Übersteigerte Leistungsstreben» — не является стандартным эквивалентом «синдрома отличника».
  - [old/style/minor] В последнем предложении фраза «als den ersten Platz nicht erreichen zu können» звучит чуть более громоздко, чем в оригинале, но смысл передан верно.

#### 🟡 de `/exercise/screen_1/texts`— вердикт неустойчив

- **RU**: Современные ученые различают два типа перфекционизма: негативный и позитивный, или, иначе говоря, здоровый и патологический. Чтобы превратить минус в плюс, важно сочетать свои лидерские качества и стремление к совершенству со здравым смыслом и рациональностью.…
- **OLD**: Die moderne Wissenschaft unterscheidet zwischen zwei Arten von Perfektionismus: dem negativen und dem positiven – oder anders ausgedrückt: dem pathologischen und dem gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach E…
- **NEW**: Die moderne Wissenschaft unterscheidet zwei Arten von Perfektionismus: den ungesunden und den gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach Exzellenz mit gesundem Menschenverstand und Rationalität zu verbinden. Wi…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Перевод A гораздо точнее передает структуру оригинала, особенно в первом предложении, где важно было сохранить противопоставление 'негативный/позитивный' и 'патологический/здоровый'. Перевод B упростил это, потеряв часть смысла. Также в A лучше передана цитата Майкла Джордана и соблюдены нюансы логических связей.
  - [new/omission/major] В первом предложении пропущен важный смысловой блок: 'негативный и позитивный, или, иначе говоря, здоровый и патологический'. Перевод B сразу переходит к 'ungesunden und gesunden', что искажает авторскую логику.
  - [new/mistranslation/minor] Фраза 'dass die Belastung weitaus größer ist als der Nutzen' (нагрузка больше пользы) — это вольная интерпретация 'трудностей больше, чем преимуществ', звучит менее естественно в данном контексте.
  - [new/style/minor] В цитате Джордана 'Erfolg gehabt' звучит чуть менее сильно и естественно, чем 'es geschafft' в контексте преодоления трудностей.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Перевод A звучит более естественно и профессионально. В частности, он лучше справляется с передачей смысла 'трудностей больше, чем преимуществ' через 'Belastung vs. Nutzen', в то время как B использует более сухую конструкцию. Также в A лучше передана цитата Майкла Джордана ('Erfolg gehabt' звучит более законченно в данном контексте).
  - [old/style/minor] Фраза 'dass die Nachteile die Vorteile bei Weitem überwiegen' звучит немного тяжеловесно по сравнению с более элегантным вариантом в A.
  - [old/style/minor] Конструкция 'oder Sie halten andere ähnliche perfektionistische Überzeugungen' грамматически не совсем полная (пропущен предлог или глагол требует дополнения в другом виде, например 'halten an ... fest').

#### 🟢 de `/exercise/title` — NEW лучше (2:0)

- **RU**: Как быть, если перфекционизм есть, идеала нет, а вы хотите нормально жить?
- **OLD**: Was tun, wenn der Perfektionismus da ist, das Ideal aber fehlt und Sie einfach normal leben wollen?
- **NEW**: Wie geht man mit Perfektionismus um, wenn das Ideal unerreichbar scheint, man aber ein normales Leben führen möchte?
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 95)
  - Перевод A звучит как естественный заголовок статьи или главы, используя элегантную конструкцию 'wenn das Ideal unerreichbar scheint'. Перевод B слишком калькирует русский синтаксис ('wenn der Perfektionismus da ist'), что звучит по-детски и неестественно для немецкого языка.
  - [old/style/major] Конструкция 'der Perfektionismus da ist' является прямой калькой русского 'перфекционизм есть' и звучит крайне непрофессионально.
  - [old/style/minor] Слишком разговорный и упрощенный тон ('einfach normal leben wollen') по сравнению с оригиналом.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Перевод B звучит гораздо более естественно и профессионально для терапевтического контекста. Перевод A содержит кальку 'der Perfektionismus da ist', что звучит по-детски и не по-немецки.
  - [old/style/major] Конструкция 'der Perfektionismus da ist' является калькой с русского 'перфекционизм есть' и звучит неестественно для носителя.
  - [old/style/minor] Слишком буквальный перевод вопроса 'Как быть' (Was tun), в то время как в немецком в данном контексте лучше использовать 'Wie geht man mit... um'.

#### 🟢 de `/exercise/description` — NEW лучше (2:0)

- **RU**: Статья рассматривает два типа перфекционизма негативный и позитивный, предлагая эффективные рекомендации по работе с перфекционистскими тенденциями. Автор представляет восемь ключевых стратегий, включая мотивацию к изменениям, когнитивную реструктуризацию, ори…
- **OLD**: Dieser Artikel beleuchtet zwei Arten von Perfektionismus – den negativen und den positiven – und bietet effektive Empfehlungen im Umgang mit perfektionistischen Tendenzen. Der Autor stellt acht zentrale Strategien vor, darunter die Motivation zur Veränderung, …
- **NEW**: Dieser Artikel beleuchtet zwei Arten von Perfektionismus – den ungesunden und den gesunden – und bietet effektive Strategien für den Umgang mit perfektionistischen Tendenzen. Es werden acht zentrale Ansätze vorgestellt, darunter die Motivation zur Veränderung,…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A значительно лучше адаптирован под немецкую психологическую стилистику. Использование терминов 'ungesund/gesund' вместо 'negativ/positiv' звучит более профессионально и естественно для контекста терапии. Также перевод A использует правильный термин 'Grundüberzeugungen' вместо простого 'Überzeugungen'.
  - [old/terminology/minor] Использование 'negativen/positiven' вместо более уместных в психологии 'ungesunden/gesunden' (хотя это близко к оригиналу, для DE рынка A звучит лучше).
  - [old/terminology/minor] Пропущено 'Grund-' в 'Grundüberzeugungen', что является ключевым термином КПТ.
  - [old/style/minor] Фраза 'sich täglich um sich selbst zu kümmern' звучит немного тяжеловесно по сравнению с более элегантным 'achtsam mit sich selbst umzugehen' в варианте A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Перевод B звучит гораздо естественнее и профессиональнее. Использование 'ungesunden/gesunden' вместо 'negativen/positiven' лучше передает психологический контекст, а замена 'lieben' на 'annehmen' и 'sich kümmern' на 'achtsam umgehen' делает текст менее клишированным и более глубоким, что соответствует тону экспертного, но эмпатичного текста.
  - [old/style/minor] Использование 'negativen und positiven' звучит немного упрощенно для психологического текста; 'lieben' в контексте самопринятия в немецком часто звучит слишком эмоционально/поверхностно по сравнению с 'annehmen'.
  - [old/terminology/minor] Пропущено уточнение 'Grundüberzeugungen', хотя в контексте статьи это было бы уместнее.

#### 🟡 de `/screen_2/texts`— вердикт неустойчив

- **RU**: <h2>Модель перфекционизма на примере</h2> Напомним, что согласно когнитивно-поведенческой психотерапии, наш жизненный опыт формирует убеждения о себе, других людях и мире. Эти убеждения, в свою очередь, определяют наши жизненные стратегии и правила. В качестве…
- **OLD**: <h2>Ein Modell des Perfektionismus am Beispiel</h2> Zur Erinnerung: Gemäß der kognitiven Verhaltenstherapie (KVT) prägen unsere Lebenserfahrungen die Überzeugungen über uns selbst, andere Menschen und die Welt. Diese Überzeugungen bestimmen wiederum unsere Leb…
- **NEW**: <h2>Ein Modell des Perfektionismus am Beispiel</h2> Zur Erinnerung: Gemäß der Kognitiven Verhaltenstherapie (KVT) prägen unsere Lebenserfahrungen die Überzeugungen über uns selbst, andere Menschen und die Welt. Diese Überzeugungen bestimmen wiederum unsere Leb…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод A звучит более естественно и профессионально. В частности, в списке убеждений фраза 'Ich darf keine Fehler machen' (A) гораздо лучше передает смысл 'Я не имею права на ошибку' в контексте внутреннего правила, чем буквальная и тяжеловесная 'Ich habe kein Recht auf Fehler' (B). Также перевод A точнее передает возрастную категорию (Grundschulalter).
  - [old/style/minor] Фраза 'Ich habe kein Recht auf Fehler' звучит как юридическое лишение прав, а не как психологическое убеждение; вариант 'Ich darf keine Fehler machen' — стандарт для КПТ.
  - [old/style/minor] В последнем предложении 'Vorschulalter' допустимо, но 'Grundschulalter' в контексте развития ребенка звучит более естественно для немецкого образовательного контекста.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 91)
  - Translation A is more precise and stylistically superior. It correctly translates 'отлично' as 'sehr gut' (the standard German grade), whereas B uses 'hervorragend' (which is an adjective, not a grade). A also handles the nuances of the list items and the closing paragraph more naturally.
  - [new/mistranslation/minor] Used 'hervorragend' for a grade, but in a school context 'sehr gut' is the actual term for the grade 'excellent'.
  - [new/style/minor] The phrase 'im Kindergarten- oder Grundschulalter' is slightly less elegant than A's 'im frühen Kindes- oder Vorschulalter' in a psychological context.

#### 🔴 de `/exercise/screen_3/texts` — OLD лучше (2:0)

- **RU**: В жизни редко что дается без ошибок и неудач. Никто не рождается мастером – мы учимся, пробуем, ошибаемся и постепенно совершенствуемся. Так разрешите себе быть неидеальным, делать что-то не до конца, допускать промахи. Ошибки – не враги, а помощники на пути к…
- **OLD**: Im Leben gibt es selten etwas ohne Fehler und Rückschläge. Niemand wird als Meister geboren – wir lernen durch Ausprobieren, machen Fehler und verbessern uns Schritt für Schritt. Erlauben Sie sich daher, unvollkommen zu sein, Dinge nicht immer perfekt zu Ende …
- **NEW**: Im Leben läuft selten alles reibungslos. Rückschläge gehören dazu. Niemand wird als Meister geboren – wir lernen durch Ausprobieren, machen Fehler und verbessern uns Schritt für Schritt. Erlauben Sie sich daher, unvollkommen zu sein, Dinge nicht immer perfekt …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 89)
  - Перевод A звучит более естественно и профессионально. В нем лучше переданы нюансы (например, 'grüne Wellen' вместо 'grüne Ampeln' для описания беспрепятственного движения) и соблюдена более высокая литературная планка, характерная для качественного терапевтического контента. Перевод B местами звучит чуть более упрощенно или тяжеловесно.
  - [new/style/minor] Фраза 'wie der Dozent an diesem Tag gestimmt ist' звучит немного разговорно, в то время как 'Tagesform' в варианте A — это идеальный термин для описания состояния человека в данный момент.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод B звучит гораздо более естественно и профессионально. Он избегает тяжеловесных конструкций и использует отличные идиоматические выражения (например, 'grüne Wellen' вместо буквального 'grüne Ampeln'), что делает текст живым, а не переведенным.
  - [new/style/minor] Фраза 'An manchen Tagen haben Sie nur grüne Ampeln' звучит немного тяжеловесно; носитель скорее скажет 'grüne Welle'.
  - [new/style/minor] В предложении про оценку действия ('...eher nach dem Weg bewerten, den Sie gegangen sind') чувствуется калька с русского синтаксиса.

#### 🟡 de `/exercise/screen_4/texts`— вердикт неустойчив

- **RU**: <h2>Используйте «технику жадности»</h2> Она основана на том простом факте, что большинство из нас стремится быть совершенным, чтобы преуспеть в жизни. Возможно, вам не приходило в голову, что вы можете оказаться намного успешнее, если понизите стандарты. К при…
- **OLD**: <h2>Nutzen Sie die „Gier-Technik“</h2> Sie basiert auf der einfachen Tatsache, dass die meisten von uns nach Perfektion streben, um im Leben erfolgreich zu sein. Dabei ist Ihnen vielleicht noch nicht bewusst, dass Sie viel erfolgreicher sein könnten, wenn Sie …
- **NEW**: <h2>Nutzen Sie die „Gier-Technik“</h2> Sie basiert auf der einfachen Tatsache, dass die meisten von uns nach Perfektion streben, um im Leben erfolgreich zu sein. Dabei ist Ihnen vielleicht noch nicht bewusst, dass Sie viel erfolgreicher sein könnten, wenn Sie …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 89 / NEW 96)
  - Перевод A звучит более естественно и профессионально. В нем лучше выдержан баланс между эмпатией и экспертностью. Перевод B содержит небольшую пунктуационную ошибку (лишняя запятая в третьем абзаце) и менее удачные формулировки в списках.
  - [old/style/minor] Лишняя запятая: '...deutlich mehr, ebenso gute Arbeiten...' — это грамматическая ошибка.
  - [old/style/minor] Фраза 'habe ein Recht auf Liebe' звучит слишком юридически/формально по сравнению с более естественным 'verdiene Liebe' в A.
  - [old/style/minor] В списке 'Ich, andere oder die Welt' звучит чуть менее гладко, чем в A.
  - [new/style/minor] В последнем предложении 'sich selbst bedingungslos zu akzeptieren' — это отличная адаптация, хотя в оригинале 'любить'. В контексте КПТ 'akzeptieren' часто звучит более терапевтично, чем 'lieben', но это на грани вкуса.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is more natural and stylistically superior. It avoids clunky constructions and uses better word choices for a therapeutic context (e.g., 'Ansprüche relativieren' instead of 'mildern', and 'gutheißen' instead of 'billigen').
  - [new/style/minor] 'Ansprüche mildern' sounds a bit unnatural; 'relativieren' or 'senken' is better.
  - [new/style/minor] 'billigen' is very formal/archaic in this context; 'gutheißen' or 'zustimmen' is more modern.
  - [new/style/minor] 'Schicksalsschlag' implies a sudden tragic event, whereas the original 'приговор' (sentence/verdict) is better captured by 'Schicksal' in this context.
  - [new/style/minor] The phrasing 'hätte seinen Kollegen eventuell voraus sein können' is slightly wordy compared to A's 'hätte seine Kollegen überholt'.

#### 🟡 de `/screen_4/texts`— вердикт неустойчив

- **RU**: Помимо влияния семьи, перфекционизм поощряется современным обществом. В школе и университетах преподаватели любят послушных учеников-отличников, а работодатели ценят сотрудников-перфекционистов. Рыночная экономика подталкивает людей к конкуренции, стремлению п…
- **OLD**: Neben dem Einfluss der Familie wird Perfektionismus auch durch die moderne Gesellschaft gefördert. In Schulen und Universitäten werden gehorsame Musterschüler geschätzt, und auch Arbeitgeber suchen Mitarbeiter mit perfektionistischen Zügen. Die Marktwirtschaft…
- **NEW**: Neben dem familiären Einfluss wird Perfektionismus auch durch die moderne Gesellschaft gefördert. In Schulen und Universitäten werden oft die gehorsamen Musterschüler geschätzt, und auch Arbeitgeber suchen nach perfektionistischen Mitarbeitern. Die Marktwirtsc…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 89 / NEW 96)
  - Перевод A звучит гораздо более естественно и литературно. Перевод B содержит несколько стилистических шероховатостей (например, 'Moden' вместо 'Modetrends' и 'Arbeiten Da Vincis'), которые выдают переводческую работу, в то время как вариант A адаптирован под качественный немецкий текст.
  - [old/style/minor] 'Moden' звучит неестественно в данном контексте, лучше 'Modetrends' или 'Mode'.
  - [old/style/minor] 'Arbeiten Da Vincis' — грамматически допустимо, но в немецком языке для художников чаще используется 'Werke' или 'Gemälde'.
  - [old/style/minor] 'Mitarbeiter mit perfektionistischen Zügen' — чуть более громоздко, чем лаконичное 'perfektionistische Mitarbeiter'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 89)
  - Translation A is more faithful to the original text and sounds more natural. Translation B makes an unauthorized interpretation/addition in the paragraph about the definition of an ideal, turning a descriptive sentence into a philosophical claim about a 'theoretical state'.
  - [new/addition/minor] Added 'lediglich ein theoretischer Zustand' (merely a theoretical state), which changes the nuance of the original definition of an ideal.
  - [new/style/minor] The phrasing 'einen ebenso attraktiven Freundeskreis' is a bit more distant than the original 'attraktiven Freunden' (attractive friends), though acceptable.

#### 🟡 de `/screen_1/texts`— вердикт неустойчив

- **RU**: Желание достичь высоких стандартов, успешно выполнить задачи и быть продуктивным является довольно положительным качеством. Также, как желание быть принятым, одобренным, любимым или иметь значимые достижения в жизни. Когда это остается на уровне желаний, стрем…
- **OLD**: Der Wunsch, hohe Standards zu setzen, Aufgaben erfolgreich zu bewältigen und produktiv zu sein, ist eine durchaus positive Eigenschaft. Ähnlich verhält es sich mit dem Bedürfnis, akzeptiert, geschätzt und geliebt zu werden oder bedeutende Leistungen im Leben z…
- **NEW**: Das Bestreben, hohe Standards zu erreichen, Aufgaben erfolgreich zu bewältigen und produktiv zu sein, ist eine durchaus positive Eigenschaft. Ebenso wie der Wunsch, akzeptiert, geschätzt und geliebt zu werden oder im Leben bedeutende Leistungen zu erbringen. S…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 86)
  - Перевод A гораздо лучше справляется с грамматической структурой списка (bullet points). В немецком языке элементы списка должны быть либо однородными по части речи, либо грамматически согласованными с вводной фразой. В переводе A пункты списка — это полноценные предложения или глагольные конструкции, что звучит естественно. В переводе B в последнем пункте происходит резкий переход к существительному (das ständige Aufschieben), что ломает ритм. Также перевод A точнее передает метафору в цитате.
  - [new/style/major] Нарушена параллельность списка: пункты начинаются с глаголов, но последний пункт — существительное (das ständige Aufschieben), что грамматически некорректно относительно вводной фразы.
  - [new/style/minor] В цитате использовано 'Pelzmantel' (меховое пальто), в то время как в оригинале 'норковая шуба' (Nerzmantel), что немного снижает точность образа.
  - [old/style/minor] В списке четвертый пункт 'sehr harte Selbstkritik...' технически является существительным, а не глаголом, что создает легкую несогласованность с предыдущими глагольными пунктами, но это менее критично, чем в варианте B.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 92)
  - Перевод A более точен в плане грамматического параллелизма в списках и лучше передает метафору в цитате. В переводе B допущены ошибки в структуре списка (смешение глаголов и существительных), что нарушает стилистику.
  - [old/style/major] Нарушен параллелизм в списке (bullet points): первые два пункта начинаются с глаголов, а последующие — с существительных (sehr harte Selbstkritik, Schwierigkeiten, ständiges Aufschieben). Это делает текст тяжелым для чтения.
  - [old/style/minor] В цитате 'elegant' переведено как 'stilvoll', что допустимо, но 'schick' в варианте A лучше передает контраст с 'страхом'.
  - [new/style/minor] В списке последний пункт 'das ständige Aufschieben...' — это существительное, в то время как остальные — глаголы. Это небольшая стилистическая шероховатость, но она менее критична, чем в варианте B.

#### 🟡 de `/title`— вердикт неустойчив

- **RU**: Зависимость от идеала, перфекционизм
- **OLD**: Die Falle des Perfektionismus: Das Streben nach dem Ideal
- **NEW**: Abhängigkeit vom Ideal, Perfektionismus
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 98)
  - Перевод A максимально точно и лаконично передает структуру оригинала, что идеально подходит для заголовка. Перевод B является вольной интерпретацией (transcreation), добавляя лишние слова ('Die Falle des...'), которых нет в оригинале.
  - [old/addition/minor] Добавлена метафора 'Die Falle' (ловушка), которой нет в оригинале
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Перевод A демонстрирует качественную транскреацию, превращая сухой список терминов в естественный, привлекательный заголовок, характерный для немецкой литературы по психологии. Перевод B является калькой, которая звучит слишком технически и тяжеловесно.
  - [new/style/major] Дословный перевод 'Abhängigkeit vom Ideal' звучит неестественно для заголовка; в немецком языке в данном контексте лучше использовать метафору ловушки (Falle) или описательный оборот.

#### 🟢 de `/description` — NEW лучше (2:0)

- **RU**: Статья исследует перфекционизм, подчеркивая, что стремление к высоким стандартам может быть полезным, но когда оно превращается в жесткие требования, это приводит к негативным последствиям, таким как тревожность и неудовлетворенность жизнью. Примеры из жизни п…
- **OLD**: Dieser Artikel beleuchtet das Phänomen des Perfektionismus und zeigt auf, dass das Streben nach hohen Standards durchaus wertvoll sein kann. Wenn dieses Streben jedoch in starre, unnachgiebige Forderungen umschlägt, führt es zu negativen Folgen wie Angstzustän…
- **NEW**: Dieser Artikel beleuchtet das Thema Perfektionismus und zeigt auf, dass das Streben nach hohen Standards durchaus wertvoll sein kann. Wenn daraus jedoch starre, unnachgiebige Anforderungen werden, führt dies oft zu negativen Folgen wie Angstzuständen und Unzuf…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод A точнее передает структуру оригинала, сохраняя все ключевые элементы (например, 'perfectionist behaviors' и 'acceptable result'), в то время как перевод B излишне сокращает текст, теряя важные детали.
  - [old/omission/minor] Пропущено упоминание поведения (Verhaltensweisen) и уточнение про 'приемлемый результат' (akzeptablen Ergebnis), что делает финал слишком абстрактным.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B точнее передает смысл оригинала, особенно в части 'приемлемого результата' (einem guten Ergebnis) и 'поведения' (Verhaltensweisen), которые в версии A были опущены или заменены на абстрактные понятия.
  - [old/omission/minor] Пропущено упоминание поведения (Verhaltensweisen) и конкретика про 'приемлемый результат' заменена на абстрактную 'акцептанцию' (Akzeptanz).
  - [old/style/minor] Фраза 'Ziel ist es...' (Цель состоит в том...) является добавлением, так как в оригинале 'автор призывает' (der Autor ruft dazu auf), хотя по смыслу это допустимая трансекреация.

