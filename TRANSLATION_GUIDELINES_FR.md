# Lignes directrices pour la traduction en français

## 🌍 Spécificités du français pour MindHealth

**Objectif principal :** créer un climat de soutien et d'empathie dans une application de santé mentale en français.

**Spécificité de l'app :** MindHealth est une application de **thérapie cognitivo-comportementale (TCC)**. Toutes les traductions doivent utiliser la terminologie professionnelle de la TCC en français.

### 📝 Style général

- **Approche :** amicale, respectueuse, chaleureuse
- **Forme d'adresse :** `vous` (minuscule) par défaut, y compris pour le bot Alfred (l'original russe dit « Вы ») ; `tu` uniquement dans les répliques des dialogues intérieurs et des scènes où l'original russe dit « tu »
- **Objectif :** inspirer confiance et accompagner l'utilisateur dans son parcours
- **Tonalité :** de soutien, motivante, sans jugement
- **Éviter :** un ton trop bureaucratique, froid ou excessivement familier ; ne pas copier la majuscule russe de « Вы/Ваш »

### 🧠 Principe le plus important : terminologie TCC en français

**🚨 RÈGLE CRITIQUE — les abréviations sont françaises, pas anglaises :**

**Thérapie cognitivo-comportementale → `TCC`** ✅
**JAMAIS `CBT`** ❌ — la littérature psychologique française professionnelle dit TCC

**Intelligence artificielle → `IA`** ✅
**JAMAIS `AI`** ❌ — le corpus ancien mélange IA et AI (200 « AI » à corriger) ; le canon est IA partout

**Autres abréviations françaises obligatoires :**

- **TDAH** (СДВГ) — jamais ADHD
- **TOC** (ОКР) — l'abréviation française du trouble obsessionnel-compulsif
- **TCA** (РПП) — troubles des conduites alimentaires ; à développer lors de la première occurrence narrative
- **BDI** — Inventaire de dépression de Beck ; **DAS** — « Échelle des croyances dysfonctionnelles »

**Termes TCC obligatoires (ancrés dans le corpus du projet et l'UI de l'app) :**

- **Pensée automatique** → `pensée automatique`
- **Distorsions cognitives** → `distorsions cognitives` (pas « biais cognitifs », pas « erreurs cognitives »)
- **Croyances profondes** → `croyances profondes` (pas « de base »)
- **Croyances intermédiaires** → `croyances intermédiaires`
- **Croyances dysfonctionnelles** → `croyances dysfonctionnelles` — PAS « destructrices » (le canon : standard clinique français + UI de l'app + « Échelle des croyances dysfonctionnelles » du corpus)
- **Niveau d'adhésion** → `niveau d'adhésion` (à la croyance), pas « niveau de croyance »
- **Fiche de coping** → `fiche de coping` (anglicisme consolidé ; pas « carte »)
- **Journal** (дневник) → `journal` ; **entrée** (запись) → `entrée` ; **journal quotidien** (ежедневник) ; **journal intelligent** (умный ежедневник). « Carnet » — seulement un carnet papier physique dans la prose
- **Bien-être psychologique** → `bien-être psychologique` (pas « équilibre psychologique »)

**Noms des distorsions = titres `errors_*_title` de l'app + premières phrases des articles de distortions.json.** Le canon complet est dans le glossaire injecté : chaque écart est un défaut. Particularités : `amplification et minimisation` (pas « exagération »), `dévalorisation du positif` (pas « dépréciation »), `pensée tout ou rien` (pas « noir et blanc »), `« J'aurais pu »` (pas « ça aurait pu »).

**Termes psychiatriques et psychologiques :**

- **Anxiété** → `anxiété` (jamais « angoisse » comme terme) ; **attaque de panique** → `attaque de panique` (pas « crise d'angoisse »)
- **Phobie sociale** → `phobie sociale` dans les narratifs ; « anxiété sociale » seulement dans les échelles du test sociophobia existantes
- **Pensées intrusives** (навязчивые мысли) → `pensées intrusives` ; « obsessionnelles » seulement dans le contexte du TOC
- **Burn-out** → `burn-out` avec trait d'union
- **Psychologue** → `psychologue` dans les textes du site (« Thérapeute » — uniquement la chaîne UI existante)

### 📋 Règles grammaticales et stylistiques

#### ❌ Erreurs courantes

**1. Calques directs du russe :**

- **Non :** « Effectuez l'évaluation de votre état émotionnel »
- **Oui :** « Évaluez votre état »

**2. Faux amis et pièges lexicaux :**

- « Справиться с » → `faire face à` / `gérer` / `surmonter` selon le contexte
- « Поддержка » (émotionnelle) → `soutien`, **non** `support`
- « Инсайт » → `prise de conscience` dans les narratifs (l'anglicisme `insight` reste seulement dans la chaîne UI existante)
- « Реализовать » (осознать) → `prendre conscience de`, **non** `réaliser`

**3. Écriture inclusive :** pas de points médians (`utilisateur·rice` interdit), pas de barres (`grato/a` interdit). Le français se résout avec des mots épicènes, `vous`, l'infinitif et les substantifs (« pour laquelle vous éprouvez de la gratitude » au lieu de « grateful »).

**4. Registre :** `vous` par défaut (minuscule à l'intérieur de la phrase) ; `tu` uniquement dans les dialogues-scènes où l'original russe dit « tu ». Ne pas mélanger les registres dans le même fichier. Le vouvoiement s'écrit en minuscules même dans les questions (« Comment vous sentez-vous ? »).

#### ✅ Constructions recommandées

- Le verbe avant le substantif : les chaînes de génitifs russes deviennent des constructions verbales
- Le futur simple et le conditionnel de politesse naturels (`vous pourrez`, `vous pourriez`)
- Les pronoms `en` / `y` naturels (`nous y reviendrons`, `il en résulte`)
- L'adjectif après le substantif ; les participes au lieu des relatives lourdes

### 🔍 Vérification spécifique au français

- Guillemets : uniquement « » **avec espaces ordinaires à l'intérieur** (« mots ») ; jamais `"..."` ni `“...”` ni espaces insécables U+00A0/U+202F
- Apostrophe typographique `’` obligatoire (`l’anxiété`, `d’une`, `j’ai`, `qu’est-ce que`), jamais `'` droit
- Ponctuation double : espace ordinaire avant `!` `?` `:` `;` (`Comment ça va ?`) — jamais collés, jamais insécables en JSON
- Tiret long `—` pour les incises ; points de suspension `…`
- Nombres : virgule décimale (`2,5`)

### 🔧 Règle importante sur les constantes

Les noms des tests, sections et outils du site restent ceux du corpus français (sitemap) : `Journal quotidien` (ежедневник), `Journal de gratitude`, `Journal intelligent`, `Psychologue virtuel`, `Test d'anxiété`, `Ressources supplémentaires en TCC`, `Échelle des croyances dysfonctionnelles`. Les champs du journal : `Situation / Comportement / Sensations corporelles / Conclusion / Émotions / Pensée automatique / Distorsions cognitives / Réponse plus adaptée`.

### 🔍 Vérification finale

1. Tous les termes TCC correspondent-ils au glossaire injecté ?
2. Abréviations : TCC / IA / TDAH / TOC / TCA — françaises (jamais CBT, AI, ADHD) ?
3. Registre cohérent (vous partout, tu seulement dans les dialogues-scènes ; jamais de majuscule russe) ?
4. Guillemets « » avec espaces, apostrophes ’, ponctuation double avec espace, tirets — ?
5. Aucune écriture inclusive à points médians, aucun calque du russe ?
6. Le paragraphe se lit-il comme de la psychologie vulgarisée française, pas comme une traduction ?
