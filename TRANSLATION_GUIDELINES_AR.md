# Arabic Translation Guidelines

## 🌍 Arabic Language Specifics for MindHealth

**Main Goal:** Create a supportive, empathetic atmosphere for the mental health application in Arabic.

**Application Specifics:** MindHealth is an application for **Cognitive Behavioral Therapy (CBT)**. All translations must use professional terminology accepted in Arabic CBT.

### 📝 General Style

- **Approach:** Friendly, respectful, warm
- **Address:** Formal respectful form (أنتم/حضراتكم) in general context, possibly informal (أنت/انت) in therapy context
- **Goal:** Build trust and help users in their mental health journey
- **Tone:** Supportive, motivating, non-judgmental
- **Avoid:** Overly formal, cold, or overly familiar tone

### 🧠 Most Important Principle: CBT Terminology in Arabic

**🚨 CRITICAL IMPORTANT RULE:**

**Cognitive distortions → `التشوّهات المعرفية`** ✅
**NOT `التحريفات المعرفية`** ❌

**Explanation (rev. 2026-09-20):** Termine anchoring follows the project's own corpus and UI, not external literature: the application (`diary_field_distortions`) and all texts of `ar/distortions.json` use **التشوّهات المعرفية** (singular — تشوّه معرفي, with shadda تشوّه). «التحريفات» does not occur in the corpus — do not use it. The full verified glossary: `scripts/prompts/ar/glossary.json` (50 terms, each anchored to UI keys and corpus counts).

**Mandatory CBT Terms:**

- **Automatic thoughts** → `الأفكار التلقائية`
- **Cognitive distortions** → `التشوّهات المعرفية` (important: not "التحريفات"!)
- **Core beliefs** → `المعتقدات الجوهرية` (in app UI strings: `معتقدات عميقة`)
- **Intermediate beliefs** → `المعتقدات الوسيطة`
- **Coping cards** → `بطاقات التأقلم` (coping strategies — `استراتيجيات التأقلم`; not `المواجهة`)
- **Cognitive-behavioral therapy** → `العلاج المعرفي السلوكي (CBT)`
- **Adaptive response** → `الاستجابة التكيفية`

**Psychiatric and Psychological Terms:**

- **Eating disorders** → `اضطرابات الأكل`
- **Anorexia nervosa** → `فقدان الشهية العصبي`
- **Bulimia** → `الشره المرضي`
- **Obsessive-compulsive disorder (OCD)** → `اضطراب الوسواس القهري`
- **Panic disorder** → `اضطراب الهلع`
- **Social anxiety disorder** → `الرهاب الاجتماعي` (as in the corpus tests; `اضطراب القلق الاجتماعي` — 1 file only)
- **Generalized anxiety disorder** → `اضطراب القلق المعمم`
- **Attention deficit hyperactivity disorder (ADHD)** → `اضطراب فرط الحركة وتشتت الانتباه` (as in the corpus; no ADHD abbreviation)

### 📋 Grammatical and Stylistic Rules

#### ❌ Common Mistakes

**1. Direct Calques from English:**

- **Mistake:** `أنا أشعر بشعور الخدر`
- **Correct:** `أشعر بالخدر` (avoid tautology)

**2. Non-Arabic constructions:**

- **Mistake:** `لدي إحساس بالرفاهية`
- **Correct:** `أشعر بالراحة` or `أنا بخير`

**3. Literal translation of idioms:**

- **Mistake:** `أخذ نفسي في يدي` (literal translation)
- **Correct:** `سيطرت على نفسي` or `ضبطت أعصابي`

**4. Tautology and redundant expressions:**

- **Mistake:** `باستمرار مستمر`
- **Correct:** `باستمرار` or `دائماً`
- **Mistake:** `مشاعر المشاعر`
- **Correct:** `المشاعر`

**5. Incorrect use of active/passive participles:**

- **Mistake:** `شخص الذي هو قلق`
- **Correct:** `شخص قلق` or `شخص يعاني من القلق`

**6. Anglicisms in syntax:**

- **Mistake:** `أنا فعلت هذا لكي`
- **Correct:** `فعلت هذا لـ` or `فعلت هذا من أجل`

**7. Incorrect prepositions:**

- **Mistake:** `حسب الإحصاء`
- **Correct:** `وفقاً للإحصاء` or `بحسب الإحصاء`

#### ✅ Recommended Constructions

**For comparison:**

- `لا علاقة لـ A بـ B`
- `A يختلف عن B`

**For examples:**

- `مثلاً، ~` or `على سبيل المثال، ~`
- `في حالة عندما ~`

**For conclusions:**

- `إذن، ~` or `لذلك، ~`
- `وبهذا، ~`

**For therapeutic context:**

- `دعنا ننظر في ~`
- `من المهم فهم أن ~`
- `يجب ملاحظة أن ~`

### 🔍 Arabic Specific Verification

**After creating translation, MUST check:**

1. **Absence of anglicisms** and calques
2. **Correctness of prepositions** and grammatical cases
3. **Naturalness of Arabic constructions** - read aloud
4. **Terminological accuracy** according to CBT standards
5. **Cultural adaptation** of expressions and concepts
6. **Stylistic unity** throughout the application

### 📝 Stylistic Recommendations

**Supportive text style:**

- Use `دعنا` and `لنجرب` for suggestions
- Add `يرجى الانتباه` or `من المهم` for emphasis
- Avoid overly categorical statements

**Good style examples:**

- `هل تشعر بهذا الفرق؟`
- `دعنا ننظر في هذا معاً`
- `هل أفهم بشكل صحيح أن ~`

### 🚨 Critical Mistakes to Avoid

1. **Direct calques** from English
2. **Anglicisms** in vocabulary and syntax
3. **Overly formal or dry tone**
4. **Incorrect CBT terminology**
5. **Non-Arabic grammatical constructions**
6. **Tautology** and redundancy
7. **Using "التحريفات"** instead of "التشوّهات" for cognitive distortions (the corpus and app UI use تشوّه, see glossary)

### 🎯 Specific Rules to Avoid Common Problems

#### ❌ Problematic Constructions

**1. Excessive use of the word "شعور":**

- **Mistake:** `لدي شعور بأنني أشعر بالقلق`
- **Correct:** `أشعر بالقلق` or `أنا قلق`

**2. Constructions not typical for Arabic:**

- **Mistake:** `أعاني من نوبات الدوار`
- **Correct:** `أتعرض لنوبات الدوار` or `أصابني نوبات الدوار`

**3. English conjunctions and prepositions:**

- **Mistake:** `بسبب ذلك، أن`
- **Correct:** `بسبب ذلك،` or `لهذا السبب،`

**4. Incorrect word order:**

- **Mistake:** `أنا أشعر نفسي أكثر عصبية`
- **Correct:** `أشعر بأني أكثر عصبية` or `أصبحت أكثر عصبية`

**5. Medical terminology:**

- **Mistake:** `متلازمة نقص الانتباه` (incomplete name)
- **Correct:** `اضطراب فرط الحركة وتشتت الانتباه` (as in the corpus; ADHD abbreviation not used)

#### ✅ Recommended Expressions

**For softening expressions:**

- Use `ربما` or `من المحتمل` instead of categorical statements
- Replace sharp forms with softer alternatives
- Add `يبدو` or `من المحتمل` to express caution

**For natural speech rhythm:**

- Use `على سبيل المثال` instead of `مثلاً فقط`
- Prefer `وفقاً لـ` instead of `حسب` (where appropriate)
- Use `يُشار` instead of `يُلاحظ`

**For warm, supportive tone:**

- `يرجى الانتباه` instead of `انتبه`
- `نحن نؤمن بأن ~` to express support
- Avoid exclamation marks in therapeutic context

### 📚 Useful Resources

- **Dictionaries:** Almaany, Arabic Lexicon
- **Grammar:** Modern Standard Arabic grammar guides
- **Terminology:** Arabic Psychological Dictionary, WHO Arabic terminology
- **Naturalness check:** Reading aloud, consultation with native speakers

**Remember:** Arabic translation should sound as if written by an Arabic psychologist for Arabic patients, not as a translation from English.

### 🔧 Important Rule About Constants

- **Forbidden:** Changing constant names in translation text
- **Constants:** Include variables, identifiers, function names, system variables (e.g., `{{userName}}`, `ACTIVITY_ID`, `api_key`, etc.)
- **Rule:** All constants must remain in original form without translation
- **CHECK:** Ensure all constants in text were not translated or changed

### 🔍 Final Verification

**After creating translation, MUST check:**

1. **Absence of anglicisms** and calques
2. **Naturalness of Arabic constructions** - read aloud
3. **Stylistic appropriateness** for psychological context
4. **Terminological accuracy** according to CBT standards
5. **Cultural adaptation** of expressions and concepts
6. **Standardization of answer options** in tests
7. **Terminology consistency** throughout the application

---

**Important:** This document is alive and regularly updated. Please supplement it with new rules and examples you find during work with translations.