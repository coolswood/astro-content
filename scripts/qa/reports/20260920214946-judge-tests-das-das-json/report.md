# Коллегия: tests/das/das.json

## ar — раундов 3, правок 5 · НЕ сошлось (лимит раундов)

**Вердикт: major_edits · score 82** — Основная проблема — критическая потеря смысла в блоке /steps_description/0/fact, где удалено научное обоснование. Также наблюдается склонность переводчика к избыточному добавлению эпитетов (over-translation), что нарушает точность. Необходимо восстановить пропущенные предложения и привести текст в строгое соответствие с оригиналом, убрав лишние 'деструктивные' и прочие добавления.

- [раунд 1] `/steps/12`: يبدو لي الأشخاص المليئون بالأفكار أكثر قيمة من أولئك الذين لا يملكونها → **يبدو لي أن الأشخاص المليئين بالأفكار أكثر قيمة من أولئك الذين لا يملكونها**
- [раунд 1] `/steps/5`: من المهم بالنسبة لي لأشعر بالسعادة أن أشعر بحب الآخرين → **من المهم بالنسبة لي الشعور بحب الآخرين لأشعر بالسعادة**
- [раунд 2] `/steps_description/0/fact`: تُظهر الأبحاث أن النقد السلبي ينشط مناطق في الدماغ مرتبطة بالألم. وهذا → **وهذا يفسر لماذا قد يكون النقد مؤلماً للغاية على المستوى العاطفي.**
- [раунд 3] `/steps_description/0/fact`: وهذا يفسر لماذا قد يكون النقد مؤلماً للغاية على المستوى العاطفي. → **تُظهر الأبحاث أن النقد السلبي ينشط مناطق في الدماغ مرتبطة بالألم، وهذا يفسر لماذا قد يكون **
- [раунд 3] `/steps_description/1/fact`: يعد وضع الحدود الشخصية جانباً مهماً في العلاقات الصحية. إن القدرة على  → **إن القدرة على قول «لا» والتعبير عن الاحتياجات تساعد في الحفاظ على علاقات صحية وقائمة على ا**

- ⏭ отклонено (раунд 1): The term 'الهدّامة' (destructive/dysfunctional) effectively covers both 'убеждения' and 'паттерны' in this context, making the translation natural and concise without losing the intended meaning.
- ⏭ отклонено (раунд 2): The addition of 'الهدّامة' (destructive/dysfunctional) is a valid transcreation of 'дисфункциональные'. In Arabic psychological contexts, 'dysfunctional' is often rendered as 'هدّامة' or 'غير سوية' to sound natural. It is not an error.
- ⏭ отклонено (раунд 3): This is a valid transcreation. In Arabic, 'dysfunctional patterns' (الأنماط الفكرية الهدّامة) requires an adjective to sound natural and convey the negative connotation of 'dysfunctional' in this psychological context.
