# Footsteps of the Teacher

A faith-based deduction-and-discovery game for kids (ages ~6–12), inspired by
*Where in the World Is Carmen Sandiego?*, that teaches biblical truth **and** the
basics of real coding in the same app.

Built as HTML/JS, wrapped with **Capacitor** for the iOS App Store. Target price
**$2.99**. Primary audience: homeschool / Sunday school kids and families.

> Design captured 2026-07-02. This document is the source of truth for the
> project's vision, mechanics, content format, art pipeline, and build plan.
> It is written so Claude Code can pick it up and begin assembling the real app.

---

## 1. The Heart of It — "Same Truth, New Scribes"

This is the philosophical spine of the whole app. It answers the hardest critic
(faith communities wary that AI/tech is a rival to God) and it doubles as the
in-app origin story.

**The through-line is transmission.** Clay tablet → scroll → codex → printing
press → screen → code. Each was a new *technology of language* that a generation
feared, and each became the vessel that carried the truth forward. Code is simply
the newest link in that chain — not a replacement for the message, but the next
scribe's tool.

**The manuscript anchor (use accurately — a skeptic will check):**
- The Dead Sea Scrolls pushed manuscript evidence back over 1,000 years, in some
  cases to within a few centuries of the originals.
- Comparative studies show ~95% word-for-word identity; remaining differences are
  mostly spelling and slips of the pen, with **no changes in meaning**.
- The Isaiah scroll: only ~13 small changes after 1,000 years of copying, 8 of
  them already known from other ancient sources.
- New Testament: ~5,700 Greek manuscripts — the best-attested text of the ancient
  world (Homer's Iliad, the runner-up, has ~643).
- Old Testament: an estimated 17,000+ Hebrew scrolls/codices before the 1700s.

**Tone rule:** invitational, not argumentative. Lead with wonder, not debate.
Do **not** overclaim "perfect" — "95% word-for-word, the rest spelling, no change
in meaning" is more credible than "flawless" and is what scholarship supports.

**In-app framing (intro / "Why We Made This" screen):**
> *The story you're about to explore was carried for you across three thousand
> years — on clay, on scrolls, in books, and now on screens. Copied by hand,
> letter by letter, thousands of times, and it never changed. Today we're going
> to learn the newest way to carry it: code. Same truth. New scribes.*

This reframes the coding Workshop from a STEM bolt-on into the thematic heart:
the kid is being handed the scribe's pen for the next millennium.

---

## 2. Core Game Loop (per case)

A "case" = one biblical figure's journey across real geography. Each **stop** on
the journey runs this loop:

1. **Arrive** at a location. The companion character **Eli** says something
   (his flaw speaking — impatience, pride, etc.).
2. **Investigate** — the location has 2–3 spots to examine. Each reveals a short
   teaching + a partial clue. Gathering all of them = the patience lesson, and
   earns Wisdom + a badge. (Player may decide after just one.)
3. **Decide** — weigh the clues, choose the next location from options.
4. **Right** → trail continues, Wisdom earned. **Wrong** → a **gentle detour**
   (a short scene + lesson, e.g. "Forty Days of Waiting"), earn a Wisdom point for
   enduring, then rejoin the trail **with no progress lost**.
5. **Optional side quest** — a "stop and help/serve" choice granting bonus Wisdom
   + a badge. Skippable; rewards the patient.

The final stop of each case is a reflection (no puzzle) that lands the theme, then
the **Workshop** (coding mini-game, see §5) unlocks.

---

## 3. Design Principles (locked decisions)

- **Wisdom = a reward track, NOT a currency.** Hints are always free (no kid ever
  gets hard-stuck). How you play earns Wisdom (investigating fully, solving without
  hints, side quests, enduring detours). Wisdom unlocks **badges**. The virtue is
  rewarded and visible but never gates progress. (Theologically nicer too: wisdom
  is a gift you grow into, not a coin you spend.)
- **Wrong answers are gentle teaching detours, never punishments.** No lost
  progress. The setback becomes content. Keeps it Kids-Category-friendly.
- **Side quests are optional depth**, not required. Completionists get more; rushers
  can still finish.
- **All scripture text is original / paraphrased — NEVER verbatim quoted.** Avoids
  translation licensing entirely. (If ever quoting is wanted, use public-domain WEB
  — World English Bible.)
- **Eli is the emotional payload.** Each case, Eli carries a flaw that the theme
  cures; he visibly grows from the first stop to the last. Rename freely (variable).
- **Faces:** full illustrated faces are acceptable for this project (creator's call).
- **Each case gets themed flavor** — its own badges, ranks, detour scenes, and Eli
  voice — not just new clues.

---

## 4. Content Format — the `CASE` object

The engine is **content-driven**. Each adventure is a standalone data object the
engine renders. **This is the key architectural principle: engine and content are
separate.** New adventures are pure data; the engine never changes.

Target structure (Claude Code: split into `/cases/*.js` or `.json`, one per case):

```js
const CASE = {
  title: "The Shepherd Who Became King",
  theme: "Courage & Humility",
  badges: { /* key: {icon, name, desc} — themed per case */ },
  detours: [ { place, scene, lesson }, ... ],   // gentle wrong-turn scenes
  stops: [
    {
      place: "Bethlehem",
      tag: "The fields where a shepherd boy tends sheep",
      eli: "Eli's flaw speaking here...",
      spots: [
        { ico: "🐑", label: "Watch him with the sheep",
          lead: "Short teaching line.",
          clue: "Partial clue pointing toward the next location." },
        // 2–3 spots
      ],
      ask: "The deduction question.",
      options: ["Wrong A", "Correct answer", "Wrong B"],
      answer: 1,                     // index of correct option
      hint: "Free, always-available coaching hint.",
      sidequest: {                   // optional, or null
        title, desc, lesson, badge   // badge = key into badges{}
      }
    },
    // ...more stops...
    {
      place: "Jerusalem", tag: "...", eli: "...growth line...",
      final: true,
      teaching: "The reflection that lands the theme."
    }
  ]
};
```

**Reusability:** locations, characters, and props are a shared library (see §6).
Cases mix-and-match them, so each new case needs only a few *new* art assets.

---

## 5. The Workshop — Learn Real Code (the differentiator)

After a case's final stop, a **Workshop** unlocks: the kid builds that case's scene
by typing **real JavaScript**, one line at a time, and watches it appear. This is
the "same truth, new scribes" spine made playable.

**Origin of the idea:** the creator's own 2nd/3rd-grade memory — placing one pixel
in MS-DOS, then more, building a donkey, then making it move across the screen.
That progression IS the curriculum. The magic is: **type → run → it appears.**

### The "magic ladder" (progression, one new command per rung)
1. Place one item → "I made something appear."
2. Place a few → build a shape (manger, donkey).
3. Arrange into a scene → "I made a *picture*."
4. Make one move → the donkey crosses the screen → "I made it *alive*."

### Language decision: REAL JavaScript, with a safety net
- The kid types **authentic JS** — real function calls, real parens, quotes,
  commas, numbers. Not blocks, not a made-up language.
- We pre-load a **tiny vocabulary of real JS functions** with dead-simple names:
  `place("donkey", 3, 4)` and later `move("donkey", "right")`.
- Our code **catches every error** and translates the browser's scary message into
  a kind, kid-friendly hint. Real language, real syntax discipline, gentle coaching.
- A DOS-style console + a grid canvas + an always-visible tutor panel beside it.

### The tutor = intent-reading via PATTERN-MATCHING (v1)
This is the standout feature. The tutor reads what the kid *was trying to do* and
offers the corrected real line as a yes/no.

- Kid types something broken/half-right: `place donkey 3 4`, `PlaceDonkey(3,4)`,
  `place("donky", 3, 4)`, `place("donkey" 3 4)`, or just `donkey`.
- Matcher strips input to intent: found a "place-ish" word + "donkey-ish" word +
  two numbers? → reconstruct the correct line.
- Tutor offers: **"Did you mean to place the donkey at column 3, row 4? →
  `place("donkey", 3, 4)` — tap yes to see it."** Yes → the real, correct syntax
  drops into the console and runs. **That's the magic moment:** correct code
  materializes from their messy attempt.
- Tutor also coaches **position**: "Your donkey's on the left. Want him further
  right? Make the first number bigger: `place("donkey", 6, 4)`." Teaches the
  coordinate system AND the syntax together.
- Hints are **always visible** beside the console (creator's choice), so it works
  for a dyslexic 6-year-old and a confident 12-year-old alike — use the hint or
  don't; either way they're learning real syntax.

### v1 = pattern-matching (offline, free, ships clean). AI upgrade later.
For a small command vocabulary, a well-written matcher *feels* like AI to the kid
and covers ~95% of what they'll type. It's offline (fits Kids-Category cleanly),
free, and instant. **Build the Workshop so the "brain" is swappable:** later, the
matcher can be replaced by a real Claude API call for open-ended free-form code,
without rewriting the Workshop. (See §9 for the API-in-artifacts note.)

### Workshop config (data-driven, like cases)
```js
const WORKSHOP = {
  forCase: "nativity",
  grid: { cols: 8, rows: 6 },
  items: ["donkey", "manger", "star", "sheep", "shepherd", "lamp"],
  aiPreview: "/* the finished scene shown first: 'here's what the computer can make' */",
  rungs: [
    { goal: "Place the donkey", command: 'place("donkey", 3, 4)',
      matchIntent: {verb:["place"], item:["donkey"], args:2},
      hints: [ /* position + syntax coaching */ ] },
    // ...place manger, star... then move("donkey","right")
  ]
};
```

---

## 6. Art Pipeline (Grok or any image gen → drag-and-drop)

A separate spec exists: **`footsteps-art-spec.md`** (full ready-to-paste prompts).
Key points for Claude Code:

- **Locked style block** pasted identically on every prompt for consistency.
  Generate Nazareth first as the reference image, then "same style as before."
- **Reusable library:** paint each location/character/prop ONCE; cases reuse them.
  ~41 images cover 4 full cases; later cases are mostly free.
- **Naming = the contract.** Files named after their `place`/`char` field,
  lowercase, no spaces. Code loads by filename.

```
/assets
  /scenes   nazareth.jpg, bethlehem.jpg, egypt.jpg ...   (4:3, 1600x1200)
  /map      worldmap.jpg                                  (3:2, 1920x1280)
  /pins     pin-nazareth.png ...                          (1:1, 512, transparent)
  /chars    char-eli-impatient.png, char-jesus.png ...    (1:1, 1024, transparent)
  /props    prop-scroll.png, prop-star.png ...            (1:1, 512, transparent)
  /icon     appicon.png                                   (1024x1024, no alpha)
```

Eli gets 3 expressions (impatient / curious / content) to show his arc.

---

## 7. Case Roadmap

| # | Case | Figure | Theme | Status |
|---|------|--------|-------|--------|
| 1 | The Long-Awaited One | Jesus (early life) | Patience & Trust | **Prototype built** |
| 2 | The Shepherd Who Became King | David | Courage & Humility | **Prototype built** |
| 3 | (planned) | Moses | Perseverance / faith | To write |
| 4 | (planned) | Ruth | Loyalty / faithfulness | To write |
| 5 | (planned) | Paul | Transformation / mission | To write |

Cases 1 & 2 exist as standalone playable HTML prototypes (see §8). Content for
future cases is written in-chat as `CASE` objects, then dropped into `/cases`.

Note: Case 1's map arc is Nazareth → Bethlehem → Egypt → Nazareth (4 stops in the
first MVP; a 6-stop expansion outline exists). Case 2 is Bethlehem → Valley of Elah
→ Saul's Court → Wilderness → Jerusalem (5 stops).

---

## 8. Current Assets (prototypes already built)

Three playable single-file HTML prototypes exist (engine + content in one file each):
- **Case 1 MVP** — Nativity, patience, simple text-choice version.
- **Case 1 v1.0** — full engine: investigation, Wisdom, badges, gentle detours, side quest.
- **Case 2** — David, courage & humility, same v1.0 engine, different content.

These prove the engine is content-driven (same logic ran a "waiting" story and a
"rising" story with zero logic changes). They are the reference implementation for
Claude Code to refactor from.

---

## 9. Build Plan / Handoff to Claude Code

**Division of labor:**
- **Design & content** (writing cases, Workshop scripts, teachings): done in Claude
  chat, one polished `CASE`/`WORKSHOP` object at a time, playable before locking.
- **App assembly** (this repo, Claude Code): everything below.

**Claude Code tasks, in order:**
1. **Refactor**: split the shared **engine** out of the prototype HTML into its own
   module. Put each case in `/cases` as pure data. Put Workshop configs in
   `/workshops`. Engine reads content; content never touches engine.
2. **Project structure** (suggested):
   ```
   /src        engine, workshop interpreter, tutor (pattern-matcher)
   /cases      one data file per adventure
   /workshops  one config per coding mini-game
   /assets     art (see §6)
   /www        built web app Capacitor wraps
   ```
3. **Capacitor wrap**: init Capacitor, generate the iOS project, app icon, splash.
4. **Persistence**: replace any in-memory/localStorage state with the native
   **Preferences** plugin (Wisdom, badges, progress). NOTE: browser storage is
   restricted in the Kids Category and in the current prototypes — this swap is
   required for real save state.
5. **Map screen**: build the tappable illustrated map (worldmap.jpg + pins) as the
   navigation UI between stops. (Prototypes use text choices as a stand-in.)
6. **Workshop interpreter**: real-JS console + grid renderer + pattern-matching
   tutor with intent-reading "did you mean…?" flow. Keep the tutor "brain" swappable
   for a future Claude API upgrade.
7. **Kids Category compliance**: no third-party analytics/ads, privacy policy,
   fully offline, collect nothing. Keep it clean and it sails through review.
8. **Ship**: Apple Developer Program ($99/yr), App Store Connect, submit at $2.99.

**Optional future AI upgrade (Workshop tutor):** the Anthropic API can be called
from the app to read open-ended kid code and coach it like a human tutor. Adds
internet + per-call cost + privacy-disclosure overhead — deliberately deferred past
v1. Architect the tutor so this is a brain-swap, not a rewrite.

---

## 10. Naming / Trademark Note

Do **not** ship under "Where in the World Is..." — that phrasing is strongly tied to
the Carmen Sandiego trademark and Apple pulls apps over it. The *mechanic* is free
to use; the name is not. Working title: **"Footsteps of the Teacher."** Other
candidates: "Prophecy Quest," "Trail of Nazareth."

---

## 11. Open Questions for Next Sessions

- Finish writing Cases 3–5 (Moses / Ruth / Paul) as `CASE` objects.
- Build & playtest the rung-1 donkey Workshop (real JS + pattern-matching tutor).
- Decide the 6-item set + target arrangement for the Nativity Workshop scene.
- Expand Case 1 to the full 6-stop version (outline exists).
- Draft the parent-facing "Why We Made This" screen using the §1 framing.
