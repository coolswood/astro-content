# QA: слепое парное сравнение переводов — de-newsystem

- **Дата**: 2026-09-12T22:47:48.368Z
- **Метка**: de-newsystem
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref HEAD
- **Файлы**: tests/sociophobia.json
- **Локали**: de
- **Сэмпл/файл**: 3
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 30b56bc18b00a3d1f474cb07c30edcd508b703d1

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## tests/sociophobia.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| de | 3 | 🟢 1 | 🔴 1 | ⚪ 0 | 🟡 1 | 0 / 0 | 50% |
| **итого** | 3 | 🟢 1 | 🔴 1 | ⚪ 0 | 🟡 1 | 0 / 0 | 50% |

### Замечания судьи (тип/severity, из первых проходов)

- **de**: NEW — style/minor×2; OLD — style/major×1

### Детали пар (для спот-чека)

#### 🟡 de `/variants/15`— вердикт неустойчив

- **RU**: Никогда Иногда Часто Постоянно
- **OLD**: Nie Manchmal Oft Ständig
- **NEW**: Nie Manchmal Häufig Ständig
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 90 / NEW 98)
  - Both translations are grammatically correct, but 'Häufig' in B is more stylistically appropriate for a scale of frequency in a therapeutic or formal context than 'Oft' in A.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 98 / NEW 85)
  - Перевод B использует 'Oft', что является наиболее естественным и стандартным вариантом для шкалы частотности в немецком языке. 'Häufig' в переводе A звучит чуть более официально/статистически, что менее подходит для пользовательского интерфейса.
  - [new/style/minor] Häufig звучит более формально, чем привычное в таких шкалах Oft.

#### 🟢 de `/variants/14` — NEW лучше (2:0)

- **RU**: Нет Легкая тревога Умеренная тревога Интенсивная тревога
- **OLD**: Nein Leichte Angst Mäßige Angst Starke Angst
- **NEW**: Keine Leichte Angst Mäßige Angst Starke Angst
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 70 / NEW 100)
  - В контексте шкалы состояний (отсутствие симптома) 'Keine' является правильным ответом, тогда как 'Nein' — это грамматическая калька с русского 'Нет', которая звучит неестественно для немецкого интерфейса.
  - [old/style/major] Использование 'Nein' вместо 'Keine' при описании отсутствия состояния (Angst) является типичной ошибкой перевода (калькой).
- Проход [A=OLD, B=NEW]: победитель new, уверенность high (оценки OLD 75 / NEW 100)
  - В контексте шкалы оценки состояния (отсутствие симптома) 'Keine' является стандартным и естественным вариантом, в то время как 'Nein' звучит как ответ на вопрос и является калькой с русского.
  - [old/style/major] Использование 'Nein' вместо 'Keine' для обозначения отсутствия симптома звучит неестественно для носителя (калька с 'Нет').

#### 🔴 de `/steps_description/21/text` — OLD лучше (2:0)

- **RU**: Страх писать или делать записи в присутствии других людей иногда называют "скриптофобией". Это частный случай социальной тревожности, связанный с боязнью оценки со стороны окружающих.
- **OLD**: Die Angst, in Anwesenheit anderer zu schreiben oder Notizen zu machen, wird bisweilen „Scriptophobie“ genannt – eine spezifische Form sozialer Bewertungsangst.
- **NEW**: Die Angst, in Anwesenheit anderer zu schreiben oder Notizen zu machen, wird manchmal als „Skriptophobie“ bezeichnet. Dies ist ein spezieller Fall von sozialer Angst, der mit der Furcht vor der Bewertung durch andere verbunden ist.
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 95 / NEW 82)
  - Перевод A звучит гораздо более естественно и профессионально, объединяя две части оригинала в одно элегантное предложение, в то время как перевод B страдает от избыточного дробления и тяжеловесных конструкций.
  - [new/style/minor] Излишнее дробление на два предложения делает текст менее плавным (staccato-Stil).
  - [new/style/minor] Конструкция 'Dies ist ein spezieller Fall...' звучит как сухой перевод с русского, а не живой немецкий текст.
- Проход [A=NEW, B=OLD]: победитель old, уверенность high (оценки OLD 96 / NEW 85)
  - Перевод B звучит гораздо более естественно и профессионально для немецкого языка, избегая тяжеловесных конструкций. Перевод A страдает от избыточного использования придаточных предложений, характерных для кальки с русского.
  - [new/style/minor] Конструкция 'Dies ist ein spezieller Fall..., der mit...' звучит слишком академично и громоздко (Nominalstil/Relativsatz-Kette), в то время как вариант B использует более элегантное тире и точный термин 'soziale Bewertungsangst'.
  - [new/terminology/minor] Использование 'sozialer Angst' допустимо, но в контексте психологии 'soziale Bewertungsangst' (как в варианте B) является более точным и устоявшимся термином.

