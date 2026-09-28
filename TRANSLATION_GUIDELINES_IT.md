# Linee guida per la traduzione in italiano

## 🌍 Specificità dell'italiano per MindHealth

**Obiettivo principale:** creare un clima di sostegno ed empatia in un'app di salute mentale in italiano.

**Specificità dell'app:** MindHealth è un'app di **terapia cognitivo-comportamentale (TCC)**. Tutte le traduzioni devono usare la terminologia professionale della TCC in italiano.

### 📝 Stile generale

- **Approccio:** amichevole, rispettoso, caloroso
- **Forma di indirizzo:** formale `Lei` per il contesto generale; `tu` solo per la personalità del bot (contenuto homeBot su «ты» nell'originale russo)
- **Obiettivo:** generare fiducia e accompagnare l'utente nel suo percorso
- **Tono:** di sostegno, motivante, senza giudizi
- **Evitare:** tono troppo burocratico, freddo o eccessivamente confidenziale; mai il `voi`

### 🧠 Principio più importante: terminologia TCC in italiano

**🚨 REGOLA CRITICAMENTE IMPORTANTE — le abbreviazioni sono italiane, non inglesi:**

**Terapia cognitivo-comportamentale → `TCC`** ✅
**MAI `CBT`** ❌ — nella letteratura psicologica italiana professionale si usa TCC

**Intelligenza artificiale → `IA`** ✅
**MAI `AI`** ❌ — eccezione stabilita dal corpus: `ADHD` resta ADHD (dominante nella pratica clinica italiana)

**Termini TCB obbligatori (ancorati al corpus del progetto e all'UI dell'app):**

- **Pensiero automatico** → `pensiero automatico`
- **Distorsioni cognitive** → `distorsioni cognitive` (non «errori cognitivi»)
- **Convinzioni profonde (credenze profonde)** → nei testi del sito `credenze profonde`; `convinzioni profonde` solo nelle stringhe UI esistenti
- **Convinzioni intermedie** → nei testi del sito `credenze intermedie`
- **Convinzioni disfunzionali** → `convinzioni disfunzionali` (non «distruttive» nei testi)
- **Risposta adattiva** → `risposta adattiva`
- **Scheda di coping** → `scheda di coping` (l'anglicismo coping è consolidato)
- **Distorsione «avrei potuto»** → `«avrei potuto»`

**Nomi delle distorsioni = titoli `errors_*_title` dell'app + prime frasi degli articoli di distortions.json.** Il canone completo è nel glossario iniettato: ogni deviazione è un difetto.

**Termini psichiatrici e psicologici:**

- **Disturbi del comportamento alimentare** → `disturbi del comportamento alimentare` (non «disturbi alimentari»)
- **Disturbo ossessivo-compulsivo** → `disturbo ossessivo-compulsivo` (abbreviazione `DOC`; **mai `TOC`**, spagnolismo)
- **Fobia sociale / ansia sociale** → `ansia sociale` (termine DSM-5 italiano; «fobia sociale» solo come sinonimo)
- **ADHD** → `ADHD` (disturbo da deficit di attenzione e iperattività; non TDAH)
- **Burnout** → `burnout` (anglicismo consolidato, non «esaurimento»)

### 📋 Regole grammaticali e stilistiche

#### ❌ Errori comuni

**1. Calchi diretti dal russo:**

- **No:** `Effettuare la valutazione del livello di convinzione`
- **Sì:** `Valuti il livello di convinzione`

**2. Falsi amici e trappole lessicali:**

- «Осознать» → `rendersi conto` / `prendere coscienza`, **non** `realizzare`
- «Поддержка» (emotiva) → `sostegno`, **non** `supporto`
- `eventualmente` = «se mai / caso mai», **non** «alla fine»
- «Справиться с» → `affrontare` / `gestire` / `superare` secondo il contesto

**3. Barre di genere vietate:** `utente/a`, `grato/a`, `stanco/a` sono difetti. L'italiano risolve con `utente` (epiceno), forme Lei, infiniti e sostantivi («per cui prova gratitudine» invece di «grato/a»).

**4. Registro:** `Lei` di default (può, descriva, valuti); `tu` solo dove l'originale russo dà del tu (bot homeBot). Mai mescolare `Lei` e `tu` nello stesso file. Mai `voi`. Maiuscola di cortesia dentro la frase: `La`, `Le`, `Lei`, `Suo`, `Sua`.

#### ✅ Costruzioni raccomandate

- Verbo prima del sostantivo: le catene di sostantivi russi diventano costruzioni verbali
- Congiuntivo d'uso naturale: `è importante che + congiuntivo`, `se + congiuntivo` nelle ipotesi
- Clitici `ne` / `ci` naturali (`ne parleremo`, `ci sono`)
- Aggettivo dopo il sostantivo; participi al posto delle relative («che...»)

### 🔍 Verifica specifica per l'italiano

- Virgolette: solo caporali `«»` per termini, citazioni e pensieri; mai `"..."` né `“...”`
- Apostrofo tipografico `’` obbligatorio (`l'ansia`, `dell'emozione`), mai `'` dritto
- Trattino lungo `—` per inserti esplicativi; puntini di sospensione `…`
- Numeri: virgola decimale (`2,5`), punto per le migliaia
- Abbreviazioni: `ecc.` (т. д.), `cioè` (т. е.), `es.` (напр.)

### 🔧 Regola importante sulle costanti

I nomi di test, sezioni e strumenti del sito restano quelli del corpus italiano (sitemap): `Diario giornaliero` (ежедневник), `Diario della gratitudine`, `Dialogo socratico`, `Psicologo virtuale`, `Test sull'ansia`. La voce del diario è `voce` (non «entrata»/«record»); l'umore tracciato è `umore` (non «stato d'animo»).

### 🔍 Verifica finale

1. Tutti i termini TCC corrispondono al glossario iniettato?
2. Abbreviazioni: TCC / IA / DOC / ADHD — italiane (con l'eccezione ADHD)?
3. Registro coerente (Lei ovunque tranne la personalità del bot su tu)?
4. Virgolette «», apostrofi ’, trattini —?
5. Nessuna barra di genere, nessun calco dal russo?
6. Il paragrafo si legge come psicologia divulgativa italiana, non come traduzione?
