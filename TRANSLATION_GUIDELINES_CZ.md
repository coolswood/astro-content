# Pokyny pro překlad pro MindHealth (Čeština)

## 🌍 Obecné zásady

**Hlavní cíl:** Vytvořit podpůrné, empatické prostředí pro aplikaci duševního zdraví.

**Specifika aplikace:** MindHealth je aplikace pro **kognitivně-behaviorální terapii (KBT)**. Všechny překlady musí používat profesionální terminologii přijatou v KBT v češtině.

### 📝 Obecný styl
- **Přístup:** Přátelský, úctivý, profesionální ale přístupný
- **Cíl:** Vzbuzovat důvěru a pomáhat uživatelům v jejich duševní cestě
- **Tón:** Podpůrný, motivační, bez posuzování
- **Vyhnout se:** Příliš formálnímu, chladnému nebo příliš familiárnímu tónu

### 🎯 Filozofie překladu
- Přenášet smysl, ne písmena
- Používat přirozené české formulace
- Adaptovat kulturní zvláštnosti a idiomy
- **Používat profesionální KBT-terminologii**
- Vytvořit konzistentní zážitek v celé aplikaci

### 🧠 Důležitý princip: KBT-specifická terminologie
**MindHealth je založen na kognitivně-behaviorální terapii.** Všechny překlady musí používat přesnou psychologickou terminologii KBT:
- **Automatické myšlenky** - klíčový koncept KBT
- **Kognitivní zkreslení** - hlavní zaměření terapie
- **Adaptivní odpověď** - technika KBT
- **Prostřední přesvědčení** - koncept KBT Becka
- **Copingové strategie** - techniky KBT

**KRITICKY DŮLEŽITÉ:** Používat pouze ty termíny, které jsou přijaty v profesionální KBT-literatuře v češtině. Nevytvářet vlastní ekvivalenty.

### 📋 Univerzální postup práce
1. **Pochopení kontextu:** prostudovat funkcionalitu a cíl textu
2. **Srovnání s originálem:** POVINNÉ srovnání překladu s původním textem ze složky `ru/`
3. **Základní překlad:** přenést hlavní smysl s ohledem na originál
4. **Adaptace stylu:** přivést k odpovídajícímu tónu
5. **Terminologie:** použít sjednocené termíny
6. **Kontrola:** přirozenost znění a gramatika
7. **Finální kontrola:** soulad s kontrolním seznamem kvality

### 🔥 KRITICKY DŮLEŽITÉ PRAVIDLO: VŽDY srovnávat s originálem
**Při analýze jakéhokoli překladu POVINNĚ:**
1. Přečíst původní text ze složky `src/i18n/ru/`
2. Přečíst překlad do češtiny
3. **Řádkové srovnání** překladu s originálem
4. Zkontrolovat:
   - Přesnost přenosu smyslu
   - Zachování všech detailů a nuancí
   - Správnost překladu KBT-terminologie
   - Absenci zkreslení nebo vynechání

**NIKDY neanalyzovat překlad bez srovnání s originálem!** To vede k:
   - Přehlédnutí kritických chyb v terminologii
   - Nesprávnému hodnocení kvality
   - Ztrátě důležitých smyslových detailů
   - Nepřesným doporučením k opravě

### 🔍 Univerzální kontrolní seznam kvality
- [ ] **Srovnání s ruským originálem provedeno (KRITICKY DŮLEŽITÉ)**
- [ ] Konzistentní styl v celém souboru
- [ ] **Neformální úctivé oslovení (ty/tyho/tvůj)**
- [ ] **Korektní KBT-terminologie (kriticky důležité)**
- [ ] **Používají se pouze ustálené KBT-termíny**
- [ ] Přirozené znění pro rodilého mluvčího
- [ ] Kulturní adekvátnost
- [ ] Absence gramatických chyb
- [ ] Zachování podpůrného tónu
- [ ] Korektní přenos emocionálního poselství

### 🇨🇿 Specifické pravidla pro češtinu

**Obecné pravidlo pro všechny jazyky:**
- **Neformální úctivé oslovení (ty/tvoj/tvůj) - vědomé rozhodnutí**
- **Profesionální KBT-terminologie (kognitivně-behaviorální terapie)**
- Standardní psychologické termíny pro češtinu

**Důležitá poznámka:** Přestože ruská verze používá formální "Вы", pro všechny jazyky je vědomě zvolen neformální styl (ty/tvoj/tvůj). To vytváří důvěryčnější a podpůrnější atmosféru pro uživatele v kontextu duševního zdraví.

### 📝 Důležité pravidlo pro JSON pole
**Pro všechny jazyky:** V souborech překladu musí být přítomna všechna pole z ruského originálu:
- **Povinné pravidlo:** Všechna JSON pole z originálu musí být zkopírována do překladu
- **Jediná výjimka:** Pole `instagram` v story souborech může chybět
- **Zakázáno:** Mazat jakákoli jiná pole (title, description, texts, test, atd.)
- **KONTROLA:** Srovnávat JSON strukturu originálu a překladu

### 🖼️ Důležité pravidlo pro obrázky
**Pro všechny jazyky:** V souborech složky `stories/`:
- **Ruština:** používá vlastní obrázky (`.../ru/s1.png`)
- **Všechny ostatní jazyky:** používají anglické obrázky (`.../en/s1.png`)
- **Pravidlo:** NEMĚNIT cesty k obrázkům v stories pro jazyky kromě ruštiny

### 🎨 Obecné cíle překladu
Vytvořit texty, které:
- Podporují uživatele v jejich duševní cestě
- Vzbuzují důvěru a empatii
- Jsou srozumitelné a přirozené pro rodilé mluvčí
- Zachovávají profesionalismus
- Jsou konzistentní v celé aplikaci

### ⚠️ Kritické chyby (pro všechny jazyky)
- **Analýza překladu BEZ srovnání s originálem (KRITICKÁ CHYBA)**
- **Chybějící JSON pole z originálu (KRITICKÁ CHYBA)**
- Míchání různých stylů oslovení v jednom souboru
- **Použití formálního oslovení místo neformálního**
- Doslovný překlad idiomů a výrazů
- **Nesprávná KBT-terminologie (kriticky důležité)**
- **Používání nestandardních psychologických termínů**
- Ztráta emocionálního poselství
- Kulturně neadekvátní výrazy

### 🚨 Zvlášť kritické chyby pro KBT-aplikaci:
- **NESPRÁVNĚ:** Vytvářet vlastní překlady KBT-termínů
- **SPRÁVNĚ:** Používat pouze ustálenou KBT-terminologii v cílovém jazyce
- **KONTROLA:** Termíny musí odpovídat profesionální KBT-literatuře

### 🔥 Kriticky důležité pro styl oslovení:
- **PRAVIDLO:** Používat neformální úctivé oslovení (ty/tvůj)
- **NESPRÁVNĚ:** Používat formální oslovení (Vy/usted)
- **ZÁKLAD:** Vytvoření důvěrné atmosféry v aplikaci duševního zdraví

## 🇨🇿 Češtině specifické pokyny

### 🔤 České terminologické standardy pro KBT

**Základní KBT-termíny:**
- **KBT** - kognitivně-behaviorální terapie
- **Automatické myšlenky** - automatic thoughts
- **Kognitivní zkreslení** - cognitive distortions
- **Adaptivní odpověď** - adaptive response
- **Hlubinná přesvědčení** - core beliefs
- **Prostřední přesvědčení** - intermediate beliefs
- **Copingové strategie** - coping strategies

**Specifické české psychologické termíny:**
- **Duševní zdraví** - mental health
- **Psycholog** - psychologist/therapist
- **Terapie** - therapy
- **Deník** - journal
- **Myšlenky** - thoughts
- **Emoce** - emotions
- **Chování** - behavior
- **Tělesné pocity** - body sensations

### 📝 Gramatické a stylistické pravidly

**Skloňování a pády:**
- Důsledné používání správných pádů
- Správné skloňování psychologických termínů
- Konzistentní používání 2. osoby (ty/tvůj/tvůj)

**Předložky a spojky:**
- Přirozené používání českých předložek
- Správná vazba slov v psychologických kontextech

**Časování:**
- Konzistentní používání časů
- Přirozené české časové vazby

### 🎯 Kulturní adaptace

**Idiomy a výrazy:**
- Překládat význam, ne doslova
- Používat české ekvivalenty
- Adaptovat kulturní specifika

**Příklady:**
- Russian "я чувствую" → Czech "Cítím"
- Russian "я думаю" → Czech "Myslím si"
- Russian "мне кажется" → Czech "Zdá se mi"

### ✅ Kontrolní seznam kvality pro češtinu

**Terminologická správnost:**
- [ ] **KBT** (správně)
- [ ] **Automatické myšlenky** (správně)
- [ ] **Kognitivní zkreslení** (správně)
- [ ] **Adaptivní odpověď** (správně)
- [ ] **Hlubinná přesvědčení** (správně)
- [ ] **Prostřední přesvědčení** (správně)
- [ ] **Duševní zdraví** (správně)

**Stylistická správnost:**
- [ ] Neformální úctivé oslovení (ty/tvůj)
- [ ] Přirozené české formulace
- [ ] Konzistentní styl v celém textu
- [ ] Podpůrný a empatický tón
- [ ] Absence gramatických chyb

**Strukturální správnost:**
- [ ] Všechna JSON pole zachována
- [ ] Správná JSON struktura
- [ ] Žádná chybějící data
- [ ] Správné formátování

### 🔄 Nejčastější chyby a jak se jim vyhnout

**Chyby v terminologii:**
- ❌ "KPT" → ✅ **"KBT"** (správná čeština)
- ❌ "Alternativní odpověď" → ✅ **"Adaptivní odpověď"**
- ❌ "Přechodná přesvědčení" → ✅ **"Prostřední přesvědčení"**
- ❌ "Hluboké přesvědčení" → ✅ **"Hlubinná přesvědčení"**

**Stylistické chyby:**
- ❌ Formální oslovení "Vy" → ✅ Neformální "ty"
- ❌ Doslovné překlady → ✅ Přirozené české formulace
- ❌ Ruské konstrukce → ✅ České gramatické vazby

### 🎯 Cíle kvality pro české překlady

Vytvořit texty, které:
- Jsou srozumitelné pro české uživatele
- Používají správnou odbornou terminologii
- Vytvářejí podpůrnou atmosféru
- Jsou kulturně adekvátní
- Zachovávají profesionální standard

---

**Tento dokument slouží jako kompletní průvodce pro překladatele pracující na české verzi aplikace MindHealth. Je nezbytné dodržovat všechny tyto pokyny pro zachování kvality a konzistence v celé aplikaci.**