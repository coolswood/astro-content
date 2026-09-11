# QA: слепое парное сравнение переводов — chunk20-vs-40

- **Дата**: 2026-09-11T17:25:35.407Z
- **Метка**: chunk20-vs-40
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/perfectionism.json
- **Локали**: de
- **Сэмпл/файл**: 15
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: dad60342cdc961ddb70bbe227434cd8fe8a10e01

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/perfectionism.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 12 | 🟢 1 | 🔴 1 | ⚪ 1 | 🟡 9 | 0 / 0 | 50% |
| **итого** | 12 | 🟢 1 | 🔴 1 | ⚪ 1 | 🟡 9 | 0 / 0 | 50% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×4, other/minor×1, mistranslation/major×1, style/major×1, terminology/minor×1; OLD — style/minor×13, style/major×2, mistranslation/major×1, addition/minor×1

### Детали пар (для спот-чека)

#### 🟡 de `/exercise/screen_2/texts`— вердикт неустойчив

- **RU**: <h2>Помочь тестированию реальности (когнитивной реструктуризации) могут следующие вопросы:</h2> <li>Какие у меня есть доказательства, подтверждающие эту мысль или убеждение?</li> <li>Полезна ли эта мысль?</li> <li>Есть ли другие способы, которыми я могу думать…
- **OLD**: <h2>Folgende Fragen können Ihnen beim Realitätscheck (der kognitiven Umstrukturierung) helfen:</h2> <li>Welche Beweise habe ich, die diesen Gedanken oder diese Überzeugung stützen?</li> <li>Ist dieser Gedanke hilfreich?</li> <li>Gibt es andere Wege, wie ich üb…
- **NEW**: <h2>Die folgenden Fragen können Ihnen dabei helfen, die Realität zu prüfen (kognitive Umstrukturierung):</h2> <li>Welche Beweise sprechen für diesen Gedanken oder diese Überzeugung?</li> <li>Ist dieser Gedanke hilfreich?</li> <li>Gibt es andere Wege, wie ich d…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A звучит более естественно и профессионально. Использование термина 'Realitätscheck' вместо тяжеловесного 'die Realität zu prüfen' — это отличная адаптация. Также в A лучше передана эмоциональная окраска (Euphorie вместо Glücksgefühl) и соблюдены правила пунктуации (кавычки).
  - [new/style/minor] Конструкция 'die Realität zu prüfen' звучит немного тяжеловесно по сравнению с 'Realitätscheck'.
  - [new/style/minor] В предложении 'Hilft Ihnen dieser Perfektionismus wirklich dabei...' — избыточное повторение слова Perfektionismus, которое в оригинале отсутствует (там просто 'с его помощью').
  - [new/other/minor] Отсутствуют немецкие типографские кавычки „ “ в вопросах, использованы прямые.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A звучит более естественно и литературно. Перевод B содержит несколько стилистических шероховатостей (например, 'Beschuldige ich mich selbst' звучит слишком тяжело и юридически, в то время как 'Vorwürfe machen' — это естественный способ сказать 'винить себя'). Также в A лучше передана структура предложений в блоке про перфекционизм.
  - [old/style/minor] 'Beschuldige ich mich selbst' — слишком официально/тяжело для терапевтического контекста, лучше 'sich Vorwürfe machen'.
  - [old/style/minor] 'Haben Sie Angst vor öffentlicher Bloßstellung' — 'Bloßstellung' (публичное унижение/выставление на посмешище) звучит чуть более агрессивно, чем 'öffentliche Kritik' или 'Spott' в оригинале.
  - [old/style/minor] Использование кавычек в вопросах 'Was passiert...' выглядит избыточным для немецкого UX, в то время как в A это вплетено в поток речи более гладко.

#### 🔴 de `/screen_3/texts` — OLD лучше (2:0)

- **RU**: Исследователи считают, что невротический перфекционизм формируется под воздействием детского опыта с родителями, которые проявляли любовь условно (за оценки, результаты и т. п.) или вообще не проявляли никакого одобрения. В том и другом случае у ребенка появля…
- **OLD**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe nur an Bedingungen knüpften (z. B. an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwicke…
- **NEW**: Forscher gehen davon aus, dass neurotischer Perfektionismus oft durch Kindheitserfahrungen geprägt wird – etwa wenn Eltern Liebe an Bedingungen knüpften (wie an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen wächst in dem Kind der …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 94 / NEW 82)
  - Перевод A гораздо точнее передает культурный контекст. Термин 'Musterknabe' идеально соответствует русскому 'синдрому отличника' в контексте школы, в то время как 'Musterstudent' (перевод B) относится к студентам вузов. Также перевод A лучше справляется с передачей нюансов в последнем предложении.
  - [new/mistranslation/major] Использование 'Musterstudent' вместо 'Musterknabe' — ошибка регистра (школа vs вуз).
  - [new/style/minor] Фраза 'als niemals die Spitze erreichen zu können' звучит чуть менее естественно в данном контексте, чем вариант в A.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод B гораздо лучше справляется с культурной адаптацией. Использование термина 'Musterknaben-Syndrom' вместо кальки 'Musterstudent-Syndrom' делает текст естественным для носителя. Также в B более точно переданы нюансы (например, 'Bestrafung' вместо 'Ablehnung' в контексте избегания наказаний).
  - [new/style/major] Использование 'Musterstudent-Syndrom' — это калька; в немецком языке для описания 'отличника' (в контексте поведения) используется 'Musterknabe'.
  - [new/mistranslation/minor] В предложении про избегание наказаний использовано 'Ablehnung' (отвержение), хотя в оригинале 'наказания' (Bestrafung).
  - [old/style/minor] Фраза 'Erfolge... zu formalisieren' звучит немного тяжеловесно, но допустимо.

#### 🟡 de `/exercise/screen_1/texts`— вердикт неустойчив

- **RU**: Современные ученые различают два типа перфекционизма: негативный и позитивный, или, иначе говоря, здоровый и патологический. Чтобы превратить минус в плюс, важно сочетать свои лидерские качества и стремление к совершенству со здравым смыслом и рациональностью.…
- **OLD**: Die moderne Wissenschaft unterscheidet zwischen zwei Arten von Perfektionismus: dem negativen und dem positiven – oder anders ausgedrückt: dem pathologischen und dem gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach E…
- **NEW**: In der modernen Wissenschaft unterscheidet man zwei Arten von Perfektionismus: den negativen und den positiven – oder anders gesagt: den ungesunden und den gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach Exzellenz m…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A безупречен с точки зрения терминологии и стиля. Перевод B допустил ошибку в кавычках (использовал прямые вместо немецких типографских) и не совсем точно передал терминологию в контексте КПТ (использовал 'hilfreiche Antwort' вместо 'rationale Antwort', хотя в оригинале 'рациональный'). Также в A лучше передана структура предложения про убеждения.
  - [new/style/major] Использование прямых кавычек вместо немецких „ “ в цитате Майкла Джордана — критическое нарушение правил типографики для немецкого рынка.
  - [new/terminology/minor] В контексте КПТ 'rationale Antwort' (как в A) является более точным соответствием 'рациональному ответу', чем 'hilfreiche Antwort'.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 85 / NEW 96)
  - Перевод A значительно лучше справляется с типографикой и терминологией. В частности, он правильно использует немецкие кавычки „“ внутри цитаты, в то время как в B они отсутствуют. Также перевод A точнее передает терминологию КПТ (hilfreiche Antwort вместо рациональной), что более естественно для немецкой практики, и лучше структурирует предложение о перфекционистских убеждениях.
  - [old/other/major] Отсутствуют немецкие типографские кавычки в цитате Майкла Джордана.
  - [old/style/minor] Конструкция 'oder Sie halten andere ähnliche...' звучит немного тяжеловесно по сравнению с гладким вариантом в A.
  - [old/terminology/minor] Использование 'rationale Antwort' допустимо, но 'hilfreiche Antwort' — более стандартный термин в контексте работы с дневником мыслей.

#### ⚪ de `/exercise/title`— ничья (2:0)

- **RU**: Как быть, если перфекционизм есть, идеала нет, а вы хотите нормально жить?
- **OLD**: Was tun, wenn der Perfektionismus da ist, das Ideal aber fehlt und Sie einfach normal leben wollen?
- **NEW**: Was tun, wenn der Perfektionismus da ist, das Ideal aber fehlt und Sie einfach nur normal leben wollen?
- Проход [A=NEW, B=OLD]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Оба перевода безупречны. Разница между 'einfach nur' и 'einfach' в данном контексте минимальна и является вопросом стилистического нюанса (усиления), а не ошибкой.
- Проход [A=OLD, B=NEW]: победитель tie, уверенность high (оценки OLD 98 / NEW 98)
  - Оба перевода безупречны с точки зрения грамматики, стиля и передачи смысла. Разница между 'einfach' и 'einfach nur' в данном контексте является вопросом индивидуального стилистического предпочтения и не влияет на качество.

#### 🟡 de `/exercise/description`— вердикт неустойчив

- **RU**: Статья рассматривает два типа перфекционизма негативный и позитивный, предлагая эффективные рекомендации по работе с перфекционистскими тенденциями. Автор представляет восемь ключевых стратегий, включая мотивацию к изменениям, когнитивную реструктуризацию, ори…
- **OLD**: Dieser Artikel beleuchtet zwei Arten von Perfektionismus – den negativen und den positiven – und bietet effektive Empfehlungen im Umgang mit perfektionistischen Tendenzen. Der Autor stellt acht zentrale Strategien vor, darunter die Motivation zur Veränderung, …
- **NEW**: Dieser Artikel beleuchtet zwei Arten von Perfektionismus – den negativen und den positiven – und bietet effektive Strategien im Umgang mit perfektionistischen Tendenzen. Es werden acht zentrale Ansätze vorgestellt, darunter die Motivation zur Veränderung, kogn…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A звучит гораздо более естественно и профессионально для немецкого читателя. Он избегает калькирования структуры оригинала (особенно в последнем предложении) и использует более уместные психологические термины, такие как 'Selbstmitgefühl' вместо буквального 'sich selbst lieben'.
  - [old/style/major] Последнее предложение — типичная калька с русского: 'sich selbst bedingungslos zu lieben und sich täglich um sich selbst zu kümmern' звучит тяжеловесно и неестественно для немецкого научного или научно-популярного стиля.
  - [old/style/minor] Использование 'Der Autor stellt... vor' — грамматически верно, но в немецких статьях чаще используется безличная форма 'Es werden... vorgestellt', что делает текст более объективным.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Перевод A максимально точно передает содержание оригинала, включая количество стратегий и конкретные действия (любовь к себе, забота о себе). Перевод B допускает смысловые искажения (omissions/mistranslations), заменяя 'любовь к себе' на 'самосострадание' и 'заботу' на 'осознанность', что меняет авторский посыл.
  - [new/omission/major] Пропущено упоминание автора ('Der Autor stellt... vor' заменено на пассив 'Es werden... vorgestellt').
  - [new/mistranslation/major] Фраза 'любить себя безусловно' заменена на 'Selbstmitgefühl entwickeln' (развивать самосострадание), а 'заботиться о себе' на 'achtsam mit sich selbst umgehen' (быть осознанным к себе). Это изменение терминологии, не предусмотренное оригиналом.
  - [new/mistranslation/minor] В первом предложении 'Empfehlungen' (рекомендации) заменены на 'Strategien' (стратегии), что немного меняет оттенок текста.

#### 🟡 de `/screen_2/texts`— вердикт неустойчив

- **RU**: <h2>Модель перфекционизма на примере</h2> Напомним, что согласно когнитивно-поведенческой психотерапии, наш жизненный опыт формирует убеждения о себе, других людях и мире. Эти убеждения, в свою очередь, определяют наши жизненные стратегии и правила. В качестве…
- **OLD**: <h2>Ein Modell des Perfektionismus am Beispiel</h2> Zur Erinnerung: Gemäß der kognitiven Verhaltenstherapie (KVT) prägen unsere Lebenserfahrungen die Überzeugungen über uns selbst, andere Menschen und die Welt. Diese Überzeugungen bestimmen wiederum unsere Leb…
- **NEW**: <h2>Ein Beispiel für das Modell des Perfektionismus</h2> Zur Erinnerung: Im Rahmen der Kognitiven Verhaltenstherapie wissen wir, dass unsere Lebenserfahrungen die Überzeugungen prägen, die wir über uns selbst, andere Menschen und die Welt haben. Diese Überzeug…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more natural and stylistically superior. It avoids the slightly clunky 'am Beispiel' in the header and handles the list of beliefs with much better flow and idiomatic precision. Translation B's list items feel a bit more like direct translations from Russian rather than natural German thoughts.
  - [old/style/minor] The title 'Ein Modell des Perfektionismus am Beispiel' is grammatically okay but sounds slightly less professional than A's version.
  - [old/style/minor] In the list, 'Wenn ich nicht das Maximum gebe' is a bit literal; 'mein Bestes geben' (as in A) is the standard idiomatic expression.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 89)
  - Перевод A звучит более естественно и профессионально. В нем лучше выдержан ритм повествования, а формулировки в списке убеждений (особенно в 4-м пункте) звучат более по-немецки, чем в B. Перевод B содержит небольшую стилистическую шероховатость в части 'wie etwa dem eines Arztes' (избыточно) и чуть менее удачную передачу смысла в списке убеждений.
  - [new/style/minor] Конструкция 'wie etwa dem eines Arztes' звучит тяжеловесно по сравнению с лаконичным 'etwa die Medizin' в A.
  - [new/style/minor] В списке убеждений фраза 'dass ich versagt habe' (что я потерпел неудачу) — это сильное усиление оригинала 'я делаю плохо', что немного искажает нюанс самокритики.

#### 🟡 de `/exercise/screen_3/texts`— вердикт неустойчив

- **RU**: В жизни редко что дается без ошибок и неудач. Никто не рождается мастером – мы учимся, пробуем, ошибаемся и постепенно совершенствуемся. Так разрешите себе быть неидеальным, делать что-то не до конца, допускать промахи. Ошибки – не враги, а помощники на пути к…
- **OLD**: Im Leben gibt es selten etwas ohne Fehler und Rückschläge. Niemand wird als Meister geboren – wir lernen durch Ausprobieren, machen Fehler und verbessern uns Schritt für Schritt. Erlauben Sie sich daher, unvollkommen zu sein, Dinge nicht immer perfekt zu Ende …
- **NEW**: Im Leben geht es selten ohne Fehler und Rückschläge. Niemand wird als Meister geboren – wir lernen durch Ausprobieren, machen Fehler und verbessern uns Schritt für Schritt. Erlauben Sie sich daher, unvollkommen zu sein, Dinge nicht immer zu Ende zu führen oder…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B звучит гораздо естественнее и лучше следует правилам немецкой стилистики. В частности, он правильно использует безличную конструкцию 'wird Ihnen ... viel leichter fallen' вместо кальки 'werden Sie ... besser zurechtkommen'. Также перевод B точнее передает нюанс 'близкие' через 'Angehörige' (в контексте поддержки) и более органично вплетает детали в предложения.
  - [old/style/minor] Конструкция 'werden Sie ... viel besser zurechtkommen' — грамматически верная, но звучит чуть более тяжеловесно и менее эмпатично, чем 'wird Ihnen ... leichter fallen'.
  - [old/style/minor] Фраза 'Mitmenschen' (соплеменники/люди вокруг) в данном контексте звучит чуть более отстраненно, чем 'Angehörige' (близкие/родные), которые подразумеваются в оригинале.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 90)
  - Перевод B звучит более естественно и литературно. В нем лучше переданы идиоматические выражения (например, 'grüne Wellen' вместо простого 'Ampeln sind grün') и эмоциональный тон. Перевод A более сухой и местами кажется калькой.
  - [new/style/minor] Фраза 'Die Welt geht nicht unter, wenn Sie etwas nicht perfekt machen' грамматически верна, но звучит чуть менее гладко, чем у B. 'Ampeln sind meist grün' — слишком простое описание для описания 'зеленой волны'.
  - [old/style/minor] В предложении 'beobachten Sie Ihre Reaktion' (наблюдайте за своей реакцией) в оригинале 'наблюдайте за результатом', но в контексте психологии это допустимая и даже более глубокая транскреация.

#### 🟡 de `/exercise/screen_4/texts`— вердикт неустойчив

- **RU**: <h2>Используйте «технику жадности»</h2> Она основана на том простом факте, что большинство из нас стремится быть совершенным, чтобы преуспеть в жизни. Возможно, вам не приходило в голову, что вы можете оказаться намного успешнее, если понизите стандарты. К при…
- **OLD**: <h2>Nutzen Sie die „Gier-Technik“</h2> Sie basiert auf der einfachen Tatsache, dass die meisten von uns nach Perfektion streben, um im Leben erfolgreich zu sein. Dabei ist Ihnen vielleicht noch nicht bewusst, dass Sie viel erfolgreicher sein könnten, wenn Sie …
- **NEW**: <h2>Nutzen Sie die „Gier-Technik“</h2> Sie basiert auf der einfachen Tatsache, dass die meisten von uns nach Perfektion streben, um im Leben erfolgreich zu sein. Vielleicht ist Ihnen noch nicht bewusst, dass Sie sogar erfolgreicher sein könnten, wenn Sie Ihre …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 89 / NEW 96)
  - Перевод A звучит более естественно и профессионально. Он лучше справляется с передачей нюансов (например, 'Widerstandskraft' vs 'Resilienz' в данном контексте или 'hilfreichere, alternative Antworten' вместо обрывистого финала в B). Также в A лучше соблюдена структура предложений, избегающая тяжеловесности.
  - [old/style/minor] Фраза 'habe ein Recht auf Liebe' звучит слишком юридически/формально для терапевтического контекста, в то время как 'verdiene' (A) — это стандарт для психологических текстов.
  - [old/style/minor] В конце предложения 'durch hilfreichere zu ersetzen' пропущено существительное, что делает фразу грамматически незавершенной или слишком разговорной для качественного текста.
  - [old/style/minor] Использование 'gutheißen' (одобрять/одобрять поступок) в контексте людей звучит менее естественно, чем 'gut finden' (A).
  - [old/style/minor] В предложении про статью лишняя запятая: '...deutlich mehr, ebenso gute Arbeiten...' (ошибка пунктуации).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 89)
  - Translation A is more natural and stylistically superior. It avoids the clunky syntax in the bullet points of B and uses more idiomatic German (e.g., 'überholen' instead of 'voraus sein können'). It also follows the 'anti-translation' rules better, particularly regarding the flow of the sentences.
  - [new/style/minor] The bullet point 'Ich/andere/die Welt' is a bit too much of a literal transcription of the Russian slash-style; A's 'Ich, andere oder die Welt' is much more natural in German prose.
  - [new/style/minor] The construction 'werde ich nicht anerkannt / werde ich scheitern' is slightly repetitive and heavy compared to A.
  - [new/style/minor] The phrase 'Widerstandskraft zu zeigen' is grammatically correct but 'Resilienz zu zeigen' (as in A) is the standard professional term in a therapeutic context.

#### 🟡 de `/screen_4/texts`— вердикт неустойчив

- **RU**: Помимо влияния семьи, перфекционизм поощряется современным обществом. В школе и университетах преподаватели любят послушных учеников-отличников, а работодатели ценят сотрудников-перфекционистов. Рыночная экономика подталкивает людей к конкуренции, стремлению п…
- **OLD**: Neben dem Einfluss der Familie wird Perfektionismus auch durch die moderne Gesellschaft gefördert. In Schulen und Universitäten werden gehorsame Musterschüler geschätzt, und auch Arbeitgeber suchen Mitarbeiter mit perfektionistischen Zügen. Die Marktwirtschaft…
- **NEW**: Neben dem Einfluss der Familie wird Perfektionismus auch durch die moderne Gesellschaft befeuert. In der Schule und an der Universität werden pflichtbewusste Musterschüler geschätzt, und Arbeitgeber bevorzugen Mitarbeiter, die absolut fehlerfrei arbeiten wolle…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Translation A is more sophisticated and sounds like high-quality German non-fiction. It avoids literal translations (e.g., using 'befeuert' for 'encouraged/promoted' in a social context and 'gesellschaftlich anerkannt' for 'part of society') which makes it flow much more naturally.
  - [old/style/minor] The phrasing 'gehorsame Musterschüler' sounds slightly more like 'obedient/submissive' in a negative sense compared to the more neutral/positive 'pflichtbewusst' in A.
  - [old/style/minor] The sentence 'Ein absolutes Ideal existiert nicht – es ist ein vollendeter Zustand eines Objekts oder Phänomens' is a bit too close to the Russian syntactic structure, making it feel slightly heavy/translated.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 89)
  - Translation A is more elegant and flows naturally like a high-quality German non-fiction text. Translation B has a few minor stylistic clunkiness issues and a slight mistranslation regarding 'success dependency'.
  - [new/mistranslation/minor] The original says 'зависимость от достижений' (achievement dependency), while B uses 'Erfolgsabhängigkeit' (success dependency). While close, 'Leistungsabhängigkeit' in A is more precise in a psychological context.
  - [new/style/minor] The phrase 'unser Verständnis von Schönheit' is slightly less fluid than A's 'ein bestimmtes Verständnis'.
  - [new/style/minor] The sentence 'Gibt es etwas, das für alle Menschen absolut perfekt ist?' is fine, but A's flow in the preceding paragraphs feels more professional and less repetitive.

#### 🟢 de `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Желание достичь высоких стандартов, успешно выполнить задачи и быть продуктивным является довольно положительным качеством. Также, как желание быть принятым, одобренным, любимым или иметь значимые достижения в жизни. Когда это остается на уровне желаний, стрем…
- **OLD**: Der Wunsch, hohe Standards zu setzen, Aufgaben erfolgreich zu bewältigen und produktiv zu sein, ist eine durchaus positive Eigenschaft. Ähnlich verhält es sich mit dem Bedürfnis, akzeptiert, geschätzt und geliebt zu werden oder bedeutende Leistungen im Leben z…
- **NEW**: Das Streben nach hohen Standards, der Wunsch, Aufgaben erfolgreich zu bewältigen und produktiv zu sein, ist im Grunde eine positive Eigenschaft. Ähnlich verhält es sich mit dem Wunsch, akzeptiert, geschätzt und geliebt zu werden oder bedeutende Leistungen im L…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B звучит более естественно и профессионально. В списке характеристик (li) перевод A допускает грамматическую несогласованность (смешивает глаголы и существительные), в то время как B либо сохраняет структуру, либо использует более живые обороты. Также в цитате вариант B («tarnt») гораздо лучше передает метафору притворства, чем буквальный «vorgibt zu sein» в варианте A.
  - [old/style/major] В списке (li) нарушена параллельность конструкций: первые два пункта — глаголы, а следующие — существительные (sehr harte Selbstkritik, Schwierigkeiten). Это звучит как плохой перевод. В B исправлено на глаголы или логичные обороты.
  - [old/style/minor] Цитата: 'vorgibt, stilvoll zu sein' звучит немного тяжеловесно по сравнению с 'tarnt sich als elegant'.
  - [new/style/minor] В списке 'konzentriert sich auf Misserfolge und Fehler' — слово 'Fehler' здесь немного дублирует смысл 'Misserfolge', но это допустимо для усиления.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Перевод A звучит гораздо более естественно и литературно. В переводе B допущены серьезные грамматические ошибки в списке (bullet points), где структура предложений нарушена (отсутствие глаголов или несогласованность), что делает текст рваным. Перевод A соблюдает параллелизм и грамматическую стройность.
  - [old/style/major] В списке (li) нарушена грамматическая структура: пункты 'sehr harte Selbstkritik...' и 'Schwierigkeiten...' не являются законченными фразами, которые логически продолжают вводную часть, в отличие от глагольных конструкций в A.
  - [old/style/minor] Фраза 'ohne Erfolge wahrzunehmen' звучит чуть менее естественно в данном контексте, чем 'während Erfolge ignoriert werden' в A.

#### 🟡 de `/title`— вердикт неустойчив

- **RU**: Зависимость от идеала, перфекционизм
- **OLD**: Die Falle des Perfektionismus: Das Streben nach dem Ideal
- **NEW**: Die Falle des Ideals: Perfektionismus
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 80 / NEW 95)
  - Перевод A наиболее точно и лаконично передает структуру оригинала, сохраняя его характер как заголовка. Перевод B избыточен и меняет логическую связь, превращая два понятия в конструкцию 'ловушка перфекционизма: стремление к идеалу', что не соответствует оригиналу.
  - [old/style/minor] Излишняя сложность и изменение смысла: оригинал дает два параллельных понятия, а B выстраивает иерархию через 'стремление'.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Перевод A звучит гораздо более естественно и литературно для немецкого языка, превращая сухой список терминов в осмысленное название темы. Перевод B является калькой, которая звучит обрывисто и не передает нюанс 'зависимости' (в контексте ловушки).
  - [new/style/major] Слишком буквальный и сухой перевод, напоминающий машинный; не передает эмоциональную и смысловую связь между понятиями.

#### 🟡 de `/description`— вердикт неустойчив

- **RU**: Статья исследует перфекционизм, подчеркивая, что стремление к высоким стандартам может быть полезным, но когда оно превращается в жесткие требования, это приводит к негативным последствиям, таким как тревожность и неудовлетворенность жизнью. Примеры из жизни п…
- **OLD**: Dieser Artikel beleuchtet das Phänomen des Perfektionismus und zeigt auf, dass das Streben nach hohen Standards durchaus wertvoll sein kann. Wenn dieses Streben jedoch in starre, unnachgiebige Forderungen umschlägt, führt es zu negativen Folgen wie Angstzustän…
- **NEW**: Dieser Artikel beleuchtet das Thema Perfektionismus und zeigt auf, dass das Streben nach hohen Standards durchaus hilfreich sein kann. Sobald daraus jedoch starre Anforderungen werden, führt dies zu negativen Folgen wie Angstzuständen und Unzufriedenheit. Anha…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 95)
  - Перевод A более точно передает структуру оригинала, особенно в последнем предложении, где автор призывает к балансу. Перевод B в конце меняет смысл с 'автор призывает' на 'целью является', что является смысловым искажением (addition/mistranslation).
  - [old/mistranslation/major] В последнем предложении вместо передачи призыва автора (der Autor ruft auf...) используется конструкция 'Ziel ist es' (целью является), что меняет фокус высказывания.
  - [old/addition/minor] Добавлено слово 'tiefer' (глубокой) перед Unzufriedenheit, чего нет в оригинале.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A звучит более профессионально и литературно, используя точную терминологию (Grundüberzeugungen) и более элегантные синтаксические конструкции. Перевод B более буквален и местами звучит тяжеловесно.
  - [new/style/minor] Конструкция 'Sobald daraus jedoch starre Anforderungen werden' звучит немного упрощенно по сравнению с оригиналом.
  - [new/style/minor] Фраза 'Abschließend geht es darum' — типичный канцелярит, в то время как в A смысл передан более изящно через цель исследования.

