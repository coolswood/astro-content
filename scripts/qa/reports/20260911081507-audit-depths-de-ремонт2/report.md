# Коллегия: story/depths.json

## de — раундов 3, правок 13 · НЕ сошлось (лимит раундов)

**Вердикт: major_edits · score 82** — В переводе обнаружена критическая ошибка: потеряны технические ID для Instagram, что приведет к поломке функционала. Также есть небольшие смысловые потери в описании примеров. Требуется немедленное восстановление атрибутов в разметке.

- [раунд 1] `/title`: Tief verwurzelte Überzeugungen → **Grundüberzeugungen**
- [раунд 1] `/description`: In diesem Artikel sprechen wir über tief verwurzelte Überzeugungen – g → **In diesem Artikel sprechen wir über Grundüberzeugungen – grundlegende Annahmen über sich s**
- [раунд 1] `/screen_1/texts/0`: Wir nähern uns nun der tiefsten Ebene – den tief verwurzelten Überzeug → **Wir nähern uns nun der tiefsten Ebene – den Grundüberzeugungen.**
- [раунд 1] `/screen_1/texts/9`: Am Ende stößt er seine Partnerin unbewusst von sich weg – und bestätig → **Am Ende stößt er seine Partnerin unbewusst von sich weg – und bestätigt damit seine Grundü**
- [раунд 1] `/screen_2/texts/0`: <h2>Drei Kategorien tief verwurzelter Überzeugungen</h2> → **<h2>Drei Kategorien von Grundüberzeugungen</h2>**
- [раунд 1] `/screen_2/texts/6`: <h2>Überzeugungen der Kategorie Hilflosigkeit</h2> → **<h2>Grundüberzeugungen der Kategorie Hilflosigkeit</h2>**
- [раунд 1] `/screen_2/texts/11`: <h2>Überzeugungen der Kategorie Ablehnung</h2> → **<h2>Grundüberzeugungen der Kategorie Ablehnung</h2>**
- [раунд 1] `/screen_3/texts/0`: <h2>Überzeugungen der Kategorie Wertlosigkeit</h2> → **<h2>Grundüberzeugungen der Kategorie Wertlosigkeit</h2>**
- [раунд 1] `/screen_3/texts/8`: Wenn wir lernen, automatische Gedanken zu erkennen und realistische Al → **Wenn wir lernen, automatische Gedanken zu erkennen und realistische Alternativen zu finden**
- [раунд 2] `/screen_2/texts/4`: <instagram> → **<instagram ids="18040595774017860,18072414772851393">**
- [раунд 2] `/test/answers/1`: „Ich bin niemandem wichtig“, „Ich bin wertlos“, „Ich bin nicht liebens → **„Ich werde von niemandem gebraucht“, „Ich bin wertlos“, „Ich bin nicht liebenswert“**
- [раунд 3] `/screen_2/texts/4`: <instagram> → **<instagram ids="18040595774017860,18072414772851393">**
- [раунд 3] `/screen_2/texts/5`: Schauen wir uns die drei Kategorien im Detail an. → **Schauen wir uns die drei Kategorien und Beispiele für ihre Ausprägung im Detail an.**

- ⏭ отклонено (раунд 2): Это техническое замечание по поводу синтаксиса разметки, а не качества перевода. Переводчик корректно использовал немецкие кавычки внутри атрибутов; риск парсинга — вопрос к разработчикам, а не к лингвисту.
- ⏭ отклонено (раунд 2): Замечание касается структуры кода/разметки, а не текста. Перевод соответствует правилам типографики.
- ⏭ отклонено (раунд 3): Это техническая особенность разметки (XML-атрибуты), а не ошибка перевода или типографики. Использование одинарных кавычек для атрибутов — стандарт для XML/HTML, чтобы избежать конфликта с двойными кавычками внутри текста.
