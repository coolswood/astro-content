# QA: слепое парное сравнение переводов — en-final-g67-psychologist

- **Дата**: 2026-09-18T21:41:27.050Z
- **Метка**: en-final-g67-psychologist
- **Сравнение**: NEW = рабочее дерево; OLD = --git-ref 16e1697
- **Файлы**: texts/psychologist.json
- **Локали**: en
- **Сэмпл/файл**: 20
- **Seed**: 42
- **Min-chars**: 0
- **Модель**: google/gemma-4-26B-A4B-it
- **Endpoint**: http://127.0.0.1:8000/v1
- **git HEAD**: 2ce791cdd43e4fc690400862cb7534197d57f71f

> Вердикт учитывается только при устойчивых 2:0 (два прохода в разных порядках A/B).
> «Не хуже» = стабильный win-rate NEW ≥ 50% и критических замечаний у NEW не больше, чем у OLD.

## texts/psychologist.json

| Язык | Пар | NEW лучше | OLD лучше | Ничья | Нестаб. | Crit NEW/OLD | Win-rate NEW |
|---|---|---|---|---|---|---|---|
| en | 1 | 🟢 0 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | — |
| **итого** | 1 | 🟢 0 | 🔴 0 | ⚪ 0 | 🟡 1 | 0 / 0 | — |

### Замечания судьи (тип/severity, из первых проходов)

- **en**: NEW — —; OLD — terminology/major×1, terminology/minor×1, style/minor×1

### Детали пар (для спот-чека)

#### 🟡 en ``— вердикт неустойчив

- **RU**: Подключите вашего психолога прямо в приложение! Теперь специалист сможет видеть ваши записи из дневника автоматических мыслей и поддерживать вас ещё эффективнее. Все записи автоматически синхронизируются в его личном кабинете. При этом вы в любой момент можете…
- **OLD**: Connect your psychologist right in the app! Your psychologist will be able to see your automatic thought diary entries and support you even more effectively. All entries are automatically synced to their professional account, and you can revoke access at any t…
- **NEW**: Connect with your psychologist directly in the app! Now your specialist can see your automatic thought journal entries and support you even more effectively. All entries sync automatically to their personal dashboard. You can revoke access at any time. How to …
- Проход [A=NEW, B=OLD]: победитель new, уверенность high (оценки OLD 82 / NEW 98)
  - Translation A follows the glossary perfectly (automatic thought journal, dashboard) and sounds more natural for a modern app. Translation B uses 'diary' instead of 'journal' and 'professional account' instead of 'dashboard', which feels less idiomatic in this UX context.
  - [old/terminology/major] Used 'diary' instead of the required 'journal' for automatic thought journal.
  - [old/terminology/minor] Used 'professional account' instead of 'dashboard' (личный кабинет).
  - [old/style/minor] Missing 'a' in 'Invite a psychologist' (though buttons often omit it, the original had it and A's version is smoother).
- Проход [A=OLD, B=NEW]: победитель old, уверенность high (оценки OLD 92 / NEW 82)
  - Translation A uses the correct terminology ('automatic thought diary' is acceptable, though 'journal' is preferred, but it correctly handles the professional context) and more natural phrasing. Translation B uses 'personal dashboard' for the psychologist, which sounds like a user-facing feature rather than a professional interface, and 'Invite a psychologist' deviates from the likely UI label 'Invite psychologist'.
  - [new/terminology/minor] Uses 'personal dashboard' instead of 'professional account/dashboard', which is slightly off for a specialist's view.
  - [new/style/minor] The addition of 'a' in 'Invite a psychologist' might not match the actual UI button (sentence case/label style).
  - [new/style/minor] 'Done!' is a bit more abrupt than the warmer 'That's it!' or 'You're all set!' in this context, though acceptable.

