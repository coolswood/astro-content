# QA: слепое парное сравнение переводов — de-perfectionism

- **Дата**: 2026-09-11T15:39:18.882Z
- **Метка**: de-perfectionism
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: story/distortions/perfectionism.json
- **Локали**: de
- **Сэмпл/файл**: 15
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: cae113132d5334979b55a246acce7c0237d35b6d

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## story/distortions/perfectionism.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 12 | 🟢 5 | 🔴 1 | ⚪ 0 | 🟡 6 | 0 / 0 | 83% |
| **итого** | 12 | 🟢 5 | 🔴 1 | ⚪ 0 | 🟡 6 | 0 / 0 | 83% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×10, style/major×2; OLD — style/minor×15, style/major×6, addition/minor×1

### Детали пар (для спот-чека)

#### 🟡 de `/exercise/screen_2/texts`— вердикт неустойчив

- **RU**: <h2>Помочь тестированию реальности (когнитивной реструктуризации) могут следующие вопросы:</h2> <li>Какие у меня есть доказательства, подтверждающие эту мысль или убеждение?</li> <li>Полезна ли эта мысль?</li> <li>Есть ли другие способы, которыми я могу думать…
- **OLD**: <h2>Diese Fragen können die Realitätsprüfung (kognitive Umstrukturierung) unterstützen:</h2> <li>Welche Belege habe ich für diesen Gedanken oder diese Überzeugung?</li> <li>Ist dieser Gedanke hilfreich?</li> <li>Gibt es andere Sichtweisen auf die Situation ode…
- **NEW**: <h2>Folgende Fragen können Ihnen beim Realitätscheck (der kognitiven Umstrukturierung) helfen:</h2> <li>Welche Beweise habe ich, die diesen Gedanken oder diese Überzeugung stützen?</li> <li>Ist dieser Gedanke hilfreich?</li> <li>Gibt es andere Wege, wie ich üb…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Перевод A звучит гораздо более естественно и профессионально. Он избегает тяжеловесных конструкций и калек, используя живой, эмпатичный язык, характерный для качественной немецкой литературы по психологии. Перевод B местами грешит избыточностью и менее удачными формулировками (например, 'Beschuldige ich mich selbst' вместо естественного 'Vorwürfe machen').
  - [new/style/major] Конструкция 'Beschuldige ich mich selbst unnötigerweise' звучит как калька и очень неестественно; в немецком лучше использовать 'sich Vorwürfe machen'.
  - [new/style/minor] Фраза 'Was passiert, wenn...' — грамматически верна, но в контексте саморефлексии вариант из перевода A ('Was wäre, wenn...') звучит более элегантно и по-литературному.
  - [new/style/minor] Использование 'alternative Antwort' в контексте формулирования убеждения допустимо, но 'alternative Überzeugung' (как в A) точнее передает смысл процесса когнитивной реструктуризации.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 86 / NEW 94)
  - Перевод A звучит более естественно и профессионально для терапевтического контекста. Он точнее передает нюансы оригинала, особенно в части 'alternative Antwort' (согласно глоссарию) и в эмоциональных вопросах. Перевод B местами слишком лаконичен, что делает его менее эмпатичным.
  - [old/style/minor] Фраза 'Deckt Perfektion wirklich diese Ängste... ab?' звучит немного тяжеловесно и не совсем естественно в данном контексте.
  - [old/omission/minor] В блоке про отчет пропущена важная часть вопроса 'а точно ли вы с его помощью закрываете эти страхи...?' — перевод B слишком сильно сокращает мысль.

#### 🟢 de `/screen_3/texts` — NEW лучше (2:0)

- **RU**: Исследователи считают, что невротический перфекционизм формируется под воздействием детского опыта с родителями, которые проявляли любовь условно (за оценки, результаты и т. п.) или вообще не проявляли никакого одобрения. В том и другом случае у ребенка появля…
- **OLD**: Forscher glauben, dass neurotischer Perfektionismus durch Kindheitserfahrungen mit Eltern entsteht, die Liebe nur bedingt (für Noten, Ergebnisse usw.) zeigten oder überhaupt keine Anerkennung gaben. In beiden Fällen entwickelt das Kind den Wunsch, perfekt zu s…
- **NEW**: Forscher gehen davon aus, dass neurotischer Perfektionismus durch Erfahrungen in der Kindheit geprägt wird – etwa durch Eltern, die Liebe nur an Bedingungen knüpften (z. B. an Noten oder Leistungen) oder gar keine Anerkennung zeigten. In beiden Fällen entwicke…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Перевод B звучит гораздо естественнее и профессиональнее. Он избегает калек с русского и использует правильную психологическую терминологию (например, 'Schwarz-Weiß-Denken' вместо тяжеловесного 'polarisiertes Denken'). Перевод A страдает от излишней буквальности и стилистических неточностей.
  - [old/style/major] «Ausgezeichneten-Syndrom» — это калька, в немецком нет такого термина для 'синдрома отличника'; в B использовано более точное «Musterknaben-Syndrom».
  - [old/style/major] «polarisiertes Denken» звучит как сухой академический термин, в то время как для описания когнитивного искажения в контексте самопомощи носители скажут «Schwarz-Weiß-Denken».
  - [old/style/minor] «Der Schulbesuch des Kindes» — звучит тяжеловесно, как в официальном отчете, в то время как «Mit dem Schuleintritt» (в B) — естественный способ описать начало школьного периода.
  - [old/style/minor] «Liebe nur bedingt zeigten» — грамматически верно, но «Liebe an Bedingungen knüpfen» (в B) является устойчивым и более естественным выражением для описата условной любви.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Перевод A демонстрирует высокий уровень владения языком: он использует естественные идиоматические выражения (например, 'Schwarz-Weiß-Denken' вместо кальки 'polarisiertes Denken') и удачно адаптирует 'синдром отличника' как 'Musterknaben-Syndrom', что звучит абсолютно естественно для немецкого читателя. Перевод B перегружен кальками с русского и звучит тяжеловесно.
  - [old/style/major] Использование 'polarisiertes Denken' — это прямая калька, в немецком психологическом контексте говорят 'Schwarz-Weiß-Denken'.
  - [old/style/major] 'Ausgezeichneten-Syndrom' — это дословный перевод, который не является устоявшимся термином; 'Musterknaben-Syndrom' в варианте A гораздо лучше.
  - [old/style/minor] 'Der Schulbesuch des Kindes' звучит слишком официально/канцелярски по сравнению с 'Mit dem Schuleintritt'.
  - [old/style/minor] 'Forscher glauben' звучит менее профессионально, чем 'Forscher gehen davon aus'.

#### 🟡 de `/exercise/screen_1/texts`— вердикт неустойчив

- **RU**: Современные ученые различают два типа перфекционизма: негативный и позитивный, или, иначе говоря, здоровый и патологический. Чтобы превратить минус в плюс, важно сочетать свои лидерские качества и стремление к совершенству со здравым смыслом и рациональностью.…
- **OLD**: Die heutige Forschung unterscheidet zwei Arten von Perfektionismus: negativ und positiv – anders gesagt: gesund und pathologisch. Damit aus einem Minus ein Plus wird, gilt es Führungsqualitäten und den Drang nach Exzellenz mit gesundem Menschenverstand und Rat…
- **NEW**: Die moderne Wissenschaft unterscheidet zwischen zwei Arten von Perfektionismus: dem negativen und dem positiven – oder anders ausgedrückt: dem pathologischen und dem gesunden. Um das Negative in etwas Positives zu verwandeln, ist es wichtig, das Streben nach E…
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Перевод A звучит гораздо более естественно и профессионально для немецкого читателя. Он избегает тяжеловесных конструкций, характерных для перевода (например, 'Es ist wichtig zu...'), и использует более живой, элегантный синтаксис. Также перевод A правильно обработал кавычки в цитате, используя немецкие „“, в то время как перевод B оставил их отсутствующими или неверными.
  - [new/style/major] Много номинализаций и тяжелых конструкций типа 'Es ist wichtig zu...', что делает текст сухим и напоминающим перевод.
  - [new/style/minor] В цитате отсутствуют немецкие типографские кавычки „“.
  - [new/style/minor] Фраза 'dass man alles zu 100 % machen muss' звучит немного просторечно по сравнению с более точным 'alles müsse zu 100 % gelingen' в варианте A.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Перевод A выполнен безупречно с точки зрения стилистики, терминологии и пунктуации. Перевод B содержит критическую ошибку в оформлении кавычек (использование русских « » вместо немецких „ “), нарушает терминологию (использует 'Tagebuch automatischer Gedanken' вместо принятого 'Gedankentagebuch') и звучит местами излишне сухо.
  - [old/terminology/major] Использовано 'Tagebuch automatischer Gedanken' вместо стандартного КПТ-термина 'Gedankentagebuch'.
  - [old/style/major] Использованы русские кавычки « » вместо немецких „ “.
  - [old/style/minor] Фраза 'Damit aus einem Minus ein Plus wird' звучит как калька с русского, в то время как у A более естественный оборот.

#### 🔴 de `/exercise/title` — OLD лучше (2:0)

- **RU**: Как быть, если перфекционизм есть, идеала нет, а вы хотите нормально жить?
- **OLD**: Was tun, wenn Perfektionismus da ist, das Ideal fehlt – und Sie einfach gut leben wollen?
- **NEW**: Was tun, wenn der Perfektionismus da ist, das Ideal aber fehlt und Sie einfach normal leben wollen?
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 85)
  - Перевод B звучит более естественно и ритмично. Использование тире создает правильную эмоциональную паузу, а 'gut leben' в данном контексте звучит более по-немецки, чем буквальное 'normal leben', которое может восприниматься как 'жить посредственно'.
  - [new/style/minor] Артикль 'der Perfektionismus' делает фразу чуть более тяжеловесной и менее разговорной, чем в варианте B.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 85)
  - Перевод A звучит более естественно и литературно за счет использования тире, создающего нужный ритм, и более удачного подбора слова 'gut leben' вместо тяжеловесного 'normal leben'.
  - [new/style/minor] Конструкция 'das Ideal aber fehlt' звучит чуть более сухо и формально по сравнению с вариантом A.

#### 🟡 de `/exercise/description`— вердикт неустойчив

- **RU**: Статья рассматривает два типа перфекционизма негативный и позитивный, предлагая эффективные рекомендации по работе с перфекционистскими тенденциями. Автор представляет восемь ключевых стратегий, включая мотивацию к изменениям, когнитивную реструктуризацию, ори…
- **OLD**: Der Beitrag unterscheidet zwischen negativem und positivem (gesundem vs. ungesundem) Perfektionismus und bietet wirksame Empfehlungen zum Umgang mit perfektionistischen Tendenzen. Vorgestellt werden acht zentrale Strategien, darunter Veränderungsmotivation, ko…
- **NEW**: Dieser Artikel beleuchtet zwei Arten von Perfektionismus – den negativen und den positiven – und bietet effektive Empfehlungen im Umgang mit perfektionistischen Tendenzen. Der Autor stellt acht zentrale Strategien vor, darunter die Motivation zur Veränderung, …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод A является точным, стилистически безупречным и полностью соответствует оригиналу. Перевод B содержит лишние пояснения в скобках, которых нет в оригинале, и меняет структуру предложений, что делает его менее точным.
  - [old/addition/minor] Добавлено пояснение '(gesundem vs. ungesundem)', которого нет в исходном тексте.
  - [old/style/minor] Использование 'wir' (мы) вместо нейтрального или третьего лица, что немного меняет тон оригинала.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 82)
  - Перевод A звучит гораздо более естественно и профессионально для немецкого читателя, используя элегантные синтаксические конструкции вместо тяжеловесных калек с русского. Перевод B страдает от избыточного использования существительных и конструкций, которые делают текст сухим и академичным.
  - [new/style/major] Использование 'Der Autor stellt... vor' и 'indem man lernt...' создает тяжеловесный, 'переведенный' стиль. В немецком научно-популярном стиле предпочтительнее пассивные конструкции или безличные обороты, как в варианте A.
  - [new/style/minor] Фраза 'die Formung neuer... Überzeugungen' звучит менее естественно, чем 'Formulierung' или 'Entwicklung'.

#### 🟢 de `/screen_2/texts` — NEW лучше (2:0)

- **RU**: <h2>Модель перфекционизма на примере</h2> Напомним, что согласно когнитивно-поведенческой психотерапии, наш жизненный опыт формирует убеждения о себе, других людях и мире. Эти убеждения, в свою очередь, определяют наши жизненные стратегии и правила. В качестве…
- **OLD**: <h2>Das Modell des Perfektionismus anhand eines Beispiels</h2> Denken Sie daran, dass laut der kognitiven Verhaltenstherapie unsere Lebenserfahrungen Überzeugungen über uns selbst, andere Menschen und die Welt formen. Diese Überzeugungen wiederum bestimmen uns…
- **NEW**: <h2>Ein Modell des Perfektionismus am Beispiel</h2> Zur Erinnerung: Gemäß der kognitiven Verhaltenstherapie (KVT) prägen unsere Lebenserfahrungen die Überzeugungen über uns selbst, andere Menschen und die Welt. Diese Überzeugungen bestimmen wiederum unsere Leb…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation A is much more natural and professional. It avoids the clunky 'Denken Sie daran' (which sounds like a literal translation of 'Remember that') and uses better phrasing for the psychological context. Translation B has several stylistic issues and slightly awkward sentence structures.
  - [old/style/major] The opening 'Denken Sie daran' is a typical translationese/calque of 'Remember that'; in German, 'Zur Erinnerung' or a direct statement is much more natural.
  - [old/style/minor] The list items in B are somewhat clunky and less idiomatic than in A (e.g., 'Ich muss alles schaffen' is a weak translation for 'У меня должно все получаться').
  - [old/style/minor] The phrasing 'drängten ihn zu einem... Beruf als Arzt' is grammatically awkward compared to A's 'drängten ihn in einen... Beruf'.
  - [new/style/minor] The title 'Ein Modell des Perfektionismus am Beispiel' is slightly abrupt, but grammatically correct and professional.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод B значительно лучше передает естественный немецкий язык и использует правильную терминологию (Grundüberzeugung). Перевод A звучит более калькированно и содержит стилистические неточности в списке убеждений.
  - [old/style/minor] «Denken Sie daran» звучит как прямое указание/команда, в то время как «Zur Erinnerung» — более мягкое и естественное введение темы.
  - [old/style/major] Список убеждений (li) звучит неестественно. Например, «Ich muss alles schaffen» — это скорее «я должен со всем справиться», а не «у меня должно всё получаться». «Schlecht zu sein ist nicht erlaubt» — звучит как запрет для ребенка, а не как внутреннее убеждение взрослого.
  - [old/terminology/minor] Пропущена аббревиатура KVT, которая является стандартом.
  - [new/style/minor] В одном месте «...etwa die Medizin» (например, медицина) вместо «...einen Arzt» (врач), но это допустимая транскреация для плавности текста.

#### 🟡 de `/exercise/screen_3/texts`— вердикт неустойчив

- **RU**: В жизни редко что дается без ошибок и неудач. Никто не рождается мастером – мы учимся, пробуем, ошибаемся и постепенно совершенствуемся. Так разрешите себе быть неидеальным, делать что-то не до конца, допускать промахи. Ошибки – не враги, а помощники на пути к…
- **OLD**: Im Leben gelingt wenig ohne Fehler und Rückschläge. Niemand wird als Meister geboren – wir lernen, probieren, irren uns und verbessern uns Schritt für Schritt. Erlauben Sie sich deshalb Unvollkommenheit: Dinge unvollständig zu lassen, daneben zu greifen. Fehle…
- **NEW**: Im Leben gibt es selten etwas ohne Fehler und Rückschläge. Niemand wird als Meister geboren – wir lernen durch Ausprobieren, machen Fehler und verbessern uns Schritt für Schritt. Erlauben Sie sich daher, unvollkommen zu sein, Dinge nicht immer perfekt zu Ende …
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Перевод A звучит гораздо более естественно и профессионально для немецкого читателя. Он избегает тяжеловесных конструкций, использует живой язык (например, 'über Bord werfen', 'Tagesform der Lehrperson') и демонстрирует отличную работу с синтаксисом. Перевод B местами грешит калькой и излишней многословностью.
  - [new/style/minor] Конструкция 'Es ist jedoch nicht ratsam...' звучит слишком официально/назидательно по сравнению с оригиналом.
  - [new/style/minor] Фраза 'Der Perfektionismus nährt sich von Niederlagen' — неплохая метафора, но 'Perfektionismus liebt Niederlagen' в A звучит более по-авторски и живо.
  - [new/style/minor] Использование 'Student' (мужской род) вместо гендерно-нейтрального или инклюзивного варианта в современном немецком контексте (хотя это допустимо, вариант A с 'Student*in' более современен для терапевтического приложения).
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A звучит более естественно, гладко и профессионально для терапевтического контекста. Перевод B местами слишком лаконичен, что делает его сухим, а использование гендерно-нейтрального 'Student*in' в данном контексте (хотя и современно) нарушает заданный в инструкции принцип избегания сложных конструкций через перестроение фразы.
  - [old/style/minor] Текст звучит немного обрывисто (staccato), местами теряется эмпатичный тон оригинала.
  - [old/style/minor] Использование 'Student*in' — это хороший тон в медиа, но в контексте инструкций по самопомощи часто лучше использовать нейтральные формулировки или перестроить предложение, как того требует гайдлайн.

#### 🟡 de `/exercise/screen_4/texts`— вердикт неустойчив

- **RU**: <h2>Используйте «технику жадности»</h2> Она основана на том простом факте, что большинство из нас стремится быть совершенным, чтобы преуспеть в жизни. Возможно, вам не приходило в голову, что вы можете оказаться намного успешнее, если понизите стандарты. К при…
- **OLD**: <h2>Nutzen Sie die „Gier-Technik“</h2> Sie basiert auf der einfachen Beobachtung, dass viele von uns nach Perfektion streben, um erfolgreich zu sein. Vielleicht kam Ihnen noch nicht der Gedanke, dass Sie deutlich erfolgreicher sein könnten, wenn Sie Ihre Stand…
- **NEW**: <h2>Nutzen Sie die „Gier-Technik“</h2> Sie basiert auf der einfachen Tatsache, dass die meisten von uns nach Perfektion streben, um im Leben erfolgreich zu sein. Dabei ist Ihnen vielleicht noch nicht bewusst, dass Sie viel erfolgreicher sein könnten, wenn Sie …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод A звучит более естественно, профессионально и плавно. Он лучше соблюдает баланс между эмпатией и экспертностью, избегая резких переходов. Перевод B местами слишком лаконичен, что делает ритм текста рваным, а некоторые конструкции (например, 'verdiene Liebe und Respekt – auch ohne Perfektion') звучат менее элегантно, чем в варианте A.
  - [old/style/minor] Ритм текста слишком отрывистый, местами напоминает тезисы, а не связный текст для чтения.
  - [old/style/minor] Фраза 'verdiene Liebe und Respekt – auch ohne Perfektion' звучит немного упрощенно по сравнению с более глубоким 'habe ein Recht auf Liebe und Respekt' в контексте терапии.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 96 / NEW 88)
  - Translation A is much more natural and elegant. It avoids the heavy, slightly clunky sentence structures found in B and uses more idiomatic German (e.g., 'festzubeißen' instead of 'zu versuchen... zu erzielen'). A also follows the 'anti-calc' rules better, especially regarding the flow of the text.
  - [new/style/minor] The sentence 'Es fällt oft leichter...' is a bit wordy compared to the original's punchy tone.
  - [new/style/minor] The phrasing 'haben ein Recht auf Liebe' sounds a bit too legalistic/heavy for a therapeutic context; 'verdiene' (in A) is much more empathetic.

#### 🟢 de `/screen_4/texts` — NEW лучше (2:0)

- **RU**: Помимо влияния семьи, перфекционизм поощряется современным обществом. В школе и университетах преподаватели любят послушных учеников-отличников, а работодатели ценят сотрудников-перфекционистов. Рыночная экономика подталкивает людей к конкуренции, стремлению п…
- **OLD**: Neben dem Einfluss der Familie wird Perfektionismus von der modernen Gesellschaft gefördert. In Schulen und Universitäten bevorzugen Lehrer gehorsame Musterschüler, und Arbeitgeber schätzen Perfektionisten. Die Marktwirtschaft treibt die Menschen zu Konkurrenz…
- **NEW**: Neben dem Einfluss der Familie wird Perfektionismus auch durch die moderne Gesellschaft gefördert. In Schulen und Universitäten werden gehorsame Musterschüler geschätzt, und auch Arbeitgeber suchen Mitarbeiter mit perfektionistischen Zügen. Die Marktwirtschaft…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 84 / NEW 96)
  - Translation A is much more natural and sophisticated. It avoids the clunky syntax and minor grammatical awkwardness found in B, such as the incorrect 'wie kann man sonst Erfolg haben?' (which should be a subordinate clause or a separate sentence) and the slightly unnatural 'Beziehungen zu nahen Menschen'. A flows like a professional German non-fiction text.
  - [old/style/major] The sentence 'Wenn Sie ein Perfektionist sind, sagen Sie wahrscheinlich, dass das Streben nach Perfektion normal ist, wie kann man sonst Erfolg haben?' is a comma splice/grammatical error in German; it should be a dash or a new sentence.
  - [old/style/minor] 'Beziehungen zu nahen Menschen' sounds like a literal translation of 'близкие люди'; 'Beziehungen zu Ihren Liebsten' or 'nahestehende Personen' is better.
  - [old/style/minor] 'völlig bedeutungslos' (meaningless) is a slight shift in meaning from 'völliger Unsinn' (absolute nonsense/rubbish).
  - [old/style/minor] 'Abhängigkeit von Erfolgen' is okay, but 'Leistungsabhängigkeit' (used in A) is the more precise psychological term for achievement addiction.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 88 / NEW 96)
  - Перевод B звучит гораздо более естественно и профессионально для немецкого читателя. В нем лучше выдержан ритм, использованы более точные лексические сочетания (например, 'Leistungsabhängigkeit' вместо 'Abhängigkeit von Erfolgen' и 'Gipfel der Kunst' вместо 'Höhepunkte'), а также лучше передана эмоциональная глубина текста без потери терапевтического тона.
  - [old/style/minor] Фраза 'völlig bedeutungslos' (совершенно бессмысленно) — это смысловое искажение оригинала 'абсолютная ерунда' (völliger Unsinn/Quatsch).
  - [old/style/minor] Конструкция 'wie kann man sonst Erfolg haben?' звучит немного обрывисто, в то время как вариант B с 'wie sonst sollte man...' более гладкий.
  - [old/terminology/minor] Abhängigkeit von Erfolgen — грамматически верно, но 'Leistungsabhängigkeit' — более устоявшийся термин в психологии.

#### 🟢 de `/screen_1/texts` — NEW лучше (2:0)

- **RU**: Желание достичь высоких стандартов, успешно выполнить задачи и быть продуктивным является довольно положительным качеством. Также, как желание быть принятым, одобренным, любимым или иметь значимые достижения в жизни. Когда это остается на уровне желаний, стрем…
- **OLD**: Das Streben nach hohen Standards, Aufgaben erfolgreich zu erfüllen und produktiv zu sein, ist eine ziemlich positive Eigenschaft. Ebenso wie der Wunsch, akzeptiert, anerkannt, geliebt zu werden oder bedeutende Erfolge im Leben zu erzielen. Solange dies auf der…
- **NEW**: Der Wunsch, hohe Standards zu setzen, Aufgaben erfolgreich zu bewältigen und produktiv zu sein, ist eine durchaus positive Eigenschaft. Ähnlich verhält es sich mit dem Bedürfnis, akzeptiert, geschätzt und geliebt zu werden oder bedeutende Leistungen im Leben z…
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Translation B is much more sophisticated and sounds like a professional psychological text written by a native speaker. Translation A contains several stylistic weaknesses and grammatical awkwardness.
  - [old/style/major] The phrase 'noch unerreichbareres' is grammatically incorrect (should be 'noch unerreichbareres' is not a word; 'noch unerreichbareres' is a double superlative error, it should be 'noch unerreichbareres' or 'noch ferneres').
  - [old/style/minor] The sentence structure 'Sie glauben, dass Sie... perfekt aussehen, fühlen, denken und sich verhalten müssen' is a bit clunky compared to B.
  - [old/style/minor] Uses 'bekommen' for recognition, which is a bit colloquial; 'empfinden' or 'erhalten' is better.
  - [new/style/minor] The list items in the bullet points are not grammatically parallel (some are verbs, some are noun phrases), but this is a common stylistic choice in German UI/UX to keep things concise.
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 95)
  - Перевод A звучит гораздо более естественно и профессионально. Он избегает калек (например, 'Kosten' в контексте усилий заменено на 'Preis', что в немецком языке уместнее для метафоры) и использует более богатый, литературный язык. Перевод B местами звучит сухо и слишком буквально (например, 'Kosten ihrer Erfüllung' или 'bekommen' вместо 'empfinden'). Также в A лучше передана цитата и структура списка.
  - [old/style/minor] Использование 'Kosten' (финансовые затраты) вместо 'Preis' (цена/цена усилий) звучит слишком технически.
  - [old/style/minor] Конструкция 'Freude bekommen' звучит по-детски/разговорно, 'Freude empfinden' (как в A) — более зрело и подходит для терапевтического контекста.
  - [old/style/minor] В списке использованы менее изящные формулировки, чем в A.

#### 🟡 de `/title`— вердикт неустойчив

- **RU**: Зависимость от идеала, перфекционизм
- **OLD**: Abhängigkeit vom Ideal und Perfektionismus
- **NEW**: Die Falle des Perfektionismus: Das Streben nach dem Ideal
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 75 / NEW 95)
  - Перевод A значительно лучше адаптирован под контекст психологического контента: он звучит как естественный заголовок, используя метафору 'Die Falle' (ловушка), что соответствует тону экспертного, но поддерживающего приложения. Перевод B является сухой калькой с русского.
  - [old/style/major] Звучит как медицинский диагноз или сухой список терминов, а не как заголовок раздела или темы. Использование 'Abhängigkeit' (зависимость) в данном контексте звучит слишком клинически и тяжеловесно по сравнению с естественным для немецкого языка описанием процесса.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 75)
  - Перевод A максимально точно и лаконично передает смысл оригинала, сохраняя структуру заголовка. Перевод B является вольной интерпретацией (transcreation), добавляя лишние слова ('Die Falle des...'), которых нет в оригинале.
  - [new/addition/minor] Добавлена метафора 'Die Falle' (ловушка), которой нет в оригинале

#### 🟢 de `/description` — NEW лучше (2:0)

- **RU**: Статья исследует перфекционизм, подчеркивая, что стремление к высоким стандартам может быть полезным, но когда оно превращается в жесткие требования, это приводит к негативным последствиям, таким как тревожность и неудовлетворенность жизнью. Примеры из жизни п…
- **OLD**: Dieser Artikel untersucht den Perfektionismus und betont, dass das Streben nach hohen Standards hilfreich sein kann, aber wenn es sich in harte Anforderungen verwandelt, führt es zu negativen Folgen wie Angst und Unzufriedenheit im Leben. Beispiele aus dem Leb…
- **NEW**: Dieser Artikel beleuchtet das Phänomen des Perfektionismus und zeigt auf, dass das Streben nach hohen Standards durchaus wertvoll sein kann. Wenn dieses Streben jedoch in starre, unnachgiebige Forderungen umschlägt, führt es zu negativen Folgen wie Angstzustän…
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 78 / NEW 96)
  - Перевод A звучит как качественный научно-популярный текст, написанный носителем, с отличным ритмом и использованием точной терминологии (Grundüberzeugungen). Перевод B страдает от калькирования русской структуры предложений и звучит тяжеловесно.
  - [old/style/minor] Конструкция 'aber wenn es sich in harte Anforderungen verwandelt' является грамматически неуклюжей и слишком близкой к русскому синтаксису.
  - [old/style/minor] Фраза 'Unzufriedenheit im Leben' — типичная калька, носитель скорее скажет 'Lebensunzufriedenheit' или 'Unzufriedenheit mit dem Leben'.
  - [old/style/minor] Использование 'Abschließend fordert der Autor' звучит суховато и менее элегантно, чем перефразированный вариант в A.
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 82 / NEW 96)
  - Перевод B звучит гораздо более профессионально и естественно для немецкого научного или научно-популярного стиля. Он избегает калькирования структуры русского предложения и использует более точную лексику (например, 'starre, unnachgiebige Forderungen' вместо простого 'harte Anforderungen').
  - [old/style/minor] Текст звучит немного сухо и напоминает дословный перевод; фраза 'Unzufriedenheit im Leben' — допустимая, но менее изящная, чем в варианте B.

