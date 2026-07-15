# Footsteps of the Teacher — Project Status & Handoff

_Last updated: 2026-07-11. Living snapshot of what's built, how it works, and what's next._

**Live:** https://glen-collab.github.io/bible/ · **Repo:** Glen-collab/bible

---

## What it is

A faith-based, kid-facing web app with two connected halves:

1. **The Game** — *Where in the World Is Carmen Sandiego?*-style deduction cases. A kid walks a
   Bible figure's journey, investigates each stop, weighs clues, and decides where the trail leads.
   Earns **Wisdom** (a reward track, never a currency) and **badges**. Wrong turns are **gentle
   detours** (a short lesson, no lost progress). Companion **Eli** carries a flaw the theme cures.
2. **The Coding Workshops** — after a case, the kid types **real JavaScript** (`place("donkey", 3, 4)`)
   to build that story's scene on a grid. **Ada the owl** tutors gently and reads intent
   ("did you mean…?"). The spine: *Same Truth, New Scribes* — you're handed the scribe's pen.

Between the story and the workshop sits the **Round Table** — a parent+child discussion that
brings the lesson home ("when you were my age…"). And a **Build a Scene sandbox** lets kids create
freely from the real art.

---

## Architecture (content-driven, no build step)

Plain `<script>` tags + browser globals so it runs straight on GitHub Pages. Engine and content
are separate — adding a case/scene is (mostly) data.

```
index.html            loads everything
data/cases.js         6 cases (jesus, david, moses, ruth, paul, noah) + ROUNDTABLES pools
data/workshops.js     coding-workshop configs + WORKSHOP_ITEMS (name→emoji) map
src/engine.js         case engine — renders ANY case; badges resolved by position
src/roundtable.js     parent+child discussion between story and workshop
src/finale.js         "bring the scene to life" animation + teach + tinker
src/workshop.js       coding workshop: console, grid, sprites, tutor, all the sandbox commands
src/app.js            home / case picker + "Build a Scene" section + routing
styles/footsteps.css  one parchment/scribe design system
assets/sprites/       small piece art (auto-loaded by item name; emoji fallback)
assets/scenes/        big illustrations (backdrops + placeable big pieces)
tools/sprite-calibrator.html   tune per-sprite sizes → outputs a scale map
docs/FOOTSTEPS.md     original master design doc · docs/footsteps-art-spec.md · this file
```

Flow per case: **story → Round Table → workshop → finale → home.**

---

## The Game (6 cases)

| # | Case | Figure | Theme | Workshop it unlocks |
|---|------|--------|-------|---------------------|
| 1 | The Long-Awaited One | Jesus (birth) | Patience & Trust | Build the Manger Scene |
| 2 | The Shepherd Who Became King | David | Courage & Humility | Build the Shepherd's Field |
| 3 | The Long Road to Freedom | Moses | Perseverance & Trust | Light the Desert Road |
| 4 | The Faithful Heart | Ruth | Loyalty & Faithfulness | Build the Harvest Home |
| 5 | The Heart That Changed | Paul | Transformation & Mission | Carry the Light |
| 6 | The Ark and the Promise | Noah | Obedience & Faith | Fill the Ark |

Each case: id, title, theme, 6 badges (fixed role order: begin / no-hint-solve / investigate-all /
detour / side-quest / finish), 2 detours, 4–5 stops (investigate spots → clue → deduce), a final
teaching, and a `roundtable` pool set. All scripture **paraphrased, never quoted**.

## Round Table (per case)

Pools per case: ~5 kid + 5 grown-up + 4 together prompts + rotating "you're not alone" lines. One
per slot picked at random each visit (no immediate repeat) — **random but focused**. Fixed arc:
**kid → grown-up's own childhood memory → together.** Keepsake 🫖 badge (separate from Wisdom).

## The Finale ("bring the scene to life")

After the last workshop rung, Ada offers a button that animates the kid's OWN scene (nightfall,
twinkles, scenery, shimmer, wander loop, dove) while streaming the REAL code (shown = executed).
Then tap/hover any line for a kid explanation, and "✎ play" lines expose a live −/+ number tinkerer.

---

## Build a Scene (free-play sandbox) — 6 scenes

Standalone workshops on the home screen (also become case rewards as their cases get built):

| Scene | Uses | Notes |
|-------|------|-------|
| 🌈 Fill the Ark | ark backdrop + animal sprites | reward of the **Noah** case |
| 🌅 Roll the Stone Away | tomb backdrop, boulder on a **rail**, jesus reveal | boulder sealed (2,1) / open (0,1); Ada coaches open/close |
| 🦁 Daniel in the Lions' Den | den illustration + **king** stand-in + dove | case: TODO |
| 🐟 The Loaves and Fishes | jesus_2fish_2bread + crowd + dove | case: TODO |
| ⛰️ The Sermon on the Mount | jesus_teaching + crowd + dove | case: TODO |
| 👶 The Manger Scene | manger backdrop + holy family + animals | maps to Jesus case |

## Sandbox commands (real JavaScript)

- `place("name", col, row)` — put a piece on the grid
- `place("name", col, row, size)` — with a size in cells (default 1, or a per-item DEFAULT_SIZE)
- `move("name", "right")` slide to edge · `move("name", "right", 2)` distance · `move("name", 3, 4)` go to a spot
- `remove("name")` (`delete` is a reserved word — nice lesson) · `flip("name")` · `rotate("name", 90)`
- **Backdrops:** `place("manger"/"ark"/"tomb")` fills the whole stage; pieces layer on top
- **Rails:** a piece can be constrained to two spots (the tomb boulder: left opens, right closes)
- **Tap a piece** → bar with ＋/− size, ↻ rotate, ⇋ flip, 🗑 delete, and a **↑←↓→ nudge D-pad** —
  all showing the live `move()/place()` code with a `// center at grid X, Y` comment.

---

## Art pipeline

- **Sprites auto-load** `assets/sprites/<item>.png`, falling back to `assets/scenes/<item>.png`, then
  the emoji. So dropping a PNG in "upgrades" a piece with no code change.
- **Per-piece sizing:** `SPRITE_SCALE` (fill within a cell) + `DEFAULT_SIZE` (how many cells a piece
  spans, e.g. crowds 4.25, boulder 5, figures 1.5). Tune visually with `tools/sprite-calibrator.html`
  (slider per sprite → "Copy scale map" → paste back to bake in). Desktop copy points at the live site.
- **Stand-in emoji pieces awaiting real PNGs:** `jesus` (🧍), `cow` (🐄), plus `donkey`/`sheep`
  (nativity). Name a file after the item, drop it in `assets/sprites/`, done.
- **Backdrops** are the exception — a scene PNG needs one line in `BACKDROPS` (workshop.js) to
  become a `place("name")` command. The Red Sea uses two (`red_sea` closed → `red_sea_split`
  parted); placing one replaces the other, so the sea opens on the kid's own command.

## Deploy & verify

- **SSH deploy key** (no tokens): remote `git@github.com:Glen-collab/bible.git`, per-repo
  `core.sshCommand` → `~/.ssh/footsteps_deploy`. `git push origin main` just works; Pages auto-rebuilds.
- **Tests** (no node in this env — uses macOS `jsc`): data + module-load validation, place/move/flock,
  full end-to-end workshop+finale, round-table flow, all-workshops driver. 600+ checks; run before each push.

---

## Status

**Done & live:** the full app — 6 cases, Round Tables, 6 coding workshops + finale, the 6-scene
sandbox, the complete command set, backdrops/rails/D-pad/center-comments, the art pipeline, SSH deploys.

**Next (agreed plan):** build a full deduction case for each remaining sandbox scene, ONE AT A TIME
(story → Round Table → build), keeping the sandbox for free play. Noah is done. Remaining:
- 🦁 **Daniel** — courage under pressure → Lions' Den
- 🌅 **The Empty Tomb / Resurrection** — hope → Roll the Stone Away
- 🐟 **Loaves & Fishes** — God provides → Feeding the 5,000
- ⛰️ **Sermon on the Mount** — how to live → the Sermon

**Art to finish:** `jesus.png`, `donkey.png`, `cow.png`, `sheep.png` (all auto-upgrade on drop-in).
Full list + exact filenames: `docs/ART-ASSETS-NEEDED.md`.

**How to add a case:** `CASE_X` in cases.js + add to `CASES`/`CASE_ORDER` + a `ROUNDTABLES` entry +
`CASE_EMOJI` in app.js + set the scene workshop's `forCase` (keep `standalone:true`) + update the
test's expected `CASE_ORDER` length.
