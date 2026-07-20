# 🎨 Footsteps of the Teacher — Art Asset List

> **▶️ THE ART IS DONE.** Every one of the 11 scenes is real art. There is nothing you
> need to draw. `staff`, `water` (Moses) and `fruit`, `leaves` (Eden) were intentionally
> dropped — they're already covered by other art (the parted-sea backdrop is the water,
> Moses holds his own staff, the forbidden tree has fruit, Adam & Eve wear fig leaves).
> The only emoji left in any scene is the Damascus `light` ⚡, and `saul_damascus` already
> has the light beam built in — so it's optional too.
>
> **✅ 2026-07-20 (all in & live):** the nativity animals + wise men, the full Eden story
> set, the Damascus Road (Saul + risen `jesus` + road + donkey/horse), `noah`, `ox`,
> `palm`, `well`, `house`, the olive `tree`, and barley — plus backdrops `desert`,
> `garden_of_eden`, `road_damascus`, `barley_field`, and one mountain that serves both
> `mount_sinai` (Moses) and `sermon_mount` (Jesus). Save each file with the **exact
> lowercase name**, drop it in the folder, commit + push — it appears in the game
> automatically. When you've got a batch in, ping me and I'll confirm they're loading
> (and wire the `place("...")` command for any background scenes you made).

---


This is the complete list of art the game can use. Draw/find any of these, save it
with the **exact filename shown**, drop it in the right folder, and it appears in the
game automatically — no code changes needed.

---

## ⚠️ READ THIS FIRST — how the names work

The game looks for a file by an **exact, all-lowercase name**. If the name doesn't
match exactly, the game quietly falls back to the emoji instead. So:

| Rule | Right ✅ | Wrong ❌ |
|------|---------|---------|
| **All lowercase** | `moses.png` | `Moses.png`, `MOSES.png` |
| **Underscores, not spaces** | `red_sea.png` | `red sea.png`, `Split_red_sea.png` |
| **Exact spelling from this list** | `serpent.png` | `snake.png` |
| **Always `.png`** | `tree.png` | `tree.jpg`, `apple_tree.png` |

> The web server is case-sensitive (Linux). `Moses.png` and `moses.png` are two
> different files to it — only `moses.png` will load. When in doubt, **copy the name
> straight from this doc.**

### Two folders

- **`assets/sprites/`** — small pieces you place on the grid (people, animals, objects).
- **`assets/scenes/`** — big illustrations: the wide "story pictures," and the
  **full-stage backgrounds** (like the ark) that fill the whole scene behind everything.

A piece can even be a scene-sized image — the loader checks `sprites/` first, then
`scenes/`, then the emoji.

### About your example names

You listed some names — here's the exact filename each one needs to be:

| You wrote | Save it as | Notes |
|-----------|-----------|-------|
| `Moses` | `moses.png` | lowercase |
| `apple_tree` | `tree.png` **+** `fruit.png` | the tree and the apple are two separate pieces |
| `Adam` | `adam.png` | Adam has his own piece in the Eden scene now. |
| `Eve` | `eve.png` | Eve has her own piece in the Eden scene now. |
| `God` | *(not placed)* | The Eden story tells about God but never places a God figure — intentionally. Nothing to draw. |
| `red_sea`, `Split_red_sea` | `red_sea.png` **+** `red_sea_split.png` | ✅ **Both are in.** You drew the sea closed *and* the sea parted, so they're now two backdrops: `place("red_sea")` shows the water, `place("red_sea_split")` opens it. |
| `Moses_10_command` | `moses_tablets.png` | ✅ **In.** It's Moses *holding* the tablets, so it's named for the man, not the stones — `place("moses_tablets")` in the Red Sea workshop. |
| `david_harp` | `david_harp.png` | ✅ **In.** `place("david_harp")` in the David & Goliath workshop. |
| `jesus_risen_light` | `jesus.png` | The risen Jesus in the tomb scene is the `jesus` piece. Draw him glowing and it'll shine in all his scenes. |
| `cow`, `donkey`, `sheep` | `cow.png`, `donkey.png`, `sheep.png` | all needed — see the table below |
| `eden`, `sermon_mount` | `eden.png`, `sermon_mount.png` | **new full-stage backdrops** — see "Backgrounds" |

---

## 1️⃣ Sprites still needed — none ✅

Every scene's pieces have real art. This section used to list the missing sprites;
they're all drawn now. Kept below for the record are the two cases people ask about:

### 🌊 Case: Parting the Red Sea *(Moses)* — done ✅
`moses`, `moses_tablets`, `crowd_listening` have art; both Red Sea backdrops and the
`mount_sinai` backdrop are wired. `staff` and `water` were **intentionally dropped** —
Moses holds his own staff, and the `red_sea_split` backdrop is the water.

### 🌾 Case: The Barley Field *(Ruth)* — done ✅
`wheat` (the barley), `ox`, `well`, `house`, `sheep`, plus the `barley_field` backdrop.

### ⚡ Case: The Damascus Road *(Paul)* — done ✅
Real art in: `saul_damascus` (Saul struck down, the light beam built in), `jesus`
(the risen Jesus appearing), `road_damascus` (the backdrop), plus `horse`, `donkey`,
`wheat`. Still emoji, all optional: `light` ⚡ (the beam is already in `saul_damascus`),
`palm` 🌴, `house` 🏠.

### 🚢 Case: Fill the Ark *(Noah)*
| Filename | Now shows | Note |
|----------|-----------|------|
| `noah.png` | 🧔 | Noah — **the only missing figure**; the ark + every animal already have art ✅ |

### 🦁 Case: Daniel in the Lions' Den
*(the den + lions use `daniel_lion_den.png` and King Darius is `king.png` — both done ✅)*

### 🌅 Case: Roll the Stone Away *(Empty Tomb)* & 🍞 Loaves & Fishes & ⛰️ Sermon
*(`jesus.png` is done ✅ — the risen, glowing Jesus now shines in the tomb, the feeding,
the sermon, and the Damascus road. He's one canonical piece across every scene.)*

### 🌳 Case: The Garden and the Serpent *(Eden)* — the richest scene now
The whole Genesis 2–3 story is placeable. **Done ✅:** `adam`, `eve`, `serpent`,
`forbidden_tree` (the special tree, fruit + serpent already in its branches),
`cherub` (the angel with the flaming sword who guards the way — Gen 3:24), and the
story poses `adam_eve_lion` (at peace with the animals), `eve_picking_forbiddenfruit`,
`eve_eating_fruit`, `adam_eat_forbiddenfruit`, `adam_eve_eating_fruit`, and
`adam_eve_shame` (the sorrowful walk out). Backdrop `garden_of_eden.png` ✅ is wired
(`place("eden")` or `place("garden_of_eden")`).

| Filename | Now shows | Note |
|----------|-----------|------|
| `tree.png` | 🌳 | plain garden trees *(optional — `forbidden_tree` already covers the special one)* |
| `fruit.png` | 🍎 | a loose apple *(optional — the tree already has fruit on it)* |
| `leaves.png` | 🍃 | fig leaves *(optional)* |
| *(plus `lion`/`deer`/`sheep`/`dove` from the tables above)* | | |

---

## 2️⃣ Backgrounds — full-stage scenes (like the ark) 🖼️

These fill the **whole scene** behind all the pieces (kids type `place("ark")` and the
whole ark appears). Save these in **`assets/scenes/`**.

### ✅ Already wired up (art exists):
- `manger.png` — the stable *(command: `place("manger")`)*
- `noahs_ark.png` — the ark *(command: `place("ark")`)*
- `jesus_tomb.png` — the tomb *(command: `place("tomb")`)*
- `red_sea.png` — the sea, still closed *(command: `place("red_sea")`)*
- `red_sea_split.png` — the sea parted, dry path through *(command: `place("red_sea_split")`)*
- `desert.png` — dry valley / desert, reusable *(command: `place("desert")`; auto-set in David's scene)*
- `garden_of_eden.png` — the lush garden *(command: `place("eden")` or `place("garden_of_eden")`; auto-set in Eden)*
- `road_damascus.png` — the winding road through the hills *(command: `place("road_damascus")`; auto-set in Paul's scene)*
- `barley_field.png` — Ruth's golden field at harvest *(command: `place("barley_field")`; auto-set in Ruth's scene)*
- `mount_sinai_sermon_mount.png` — a mountaintop over a lake, **shared by two scenes**: `place("mount_sinai")` (Moses / commandments) and `place("sermon_mount")` (Jesus's sermon; auto-set there)

> **The two Red Seas are a pair.** Placing one replaces the other, so in the Moses
> workshop the kid sets the closed sea, places Moses, and then types
> `place("red_sea_split")` — and the water opens. The miracle happens by their own line
> of code. *(The scattered 🌊/🐟 that used to speckle the finale are gone — the painted
> backdrop is the water.)*

### 🆕 New backgrounds — all done ✅
Every backdrop that was on the wish list is now drawn and wired. If you ever want a
*dedicated* Sermon-on-the-Mount backdrop instead of the shared mountain, save
`assets/scenes/sermon_mount.png` and it overrides automatically — but it's optional.

> Done ✅: `eden` (`garden_of_eden.png`), Paul's road (`road_damascus.png`), and
> **David's valley is covered by `desert.png`** — reusable for any dry-land story, so
> `valley_elah` and `damascus_road` aren't needed as separate files. Daniel's den
> already has `daniel_lion_den.png`.

> Want any of these to also be a background? Just make the `.png` and I'll flip on the
> command in a two-minute change.

---

## 3️⃣ Big "story pictures" — already done ✅

These wide illustrations already have art. You *can* redraw them anytime (drop a new
file over the old name and it upgrades), but nothing's missing:

`crowd_listening.png` · `crowd_eating_fish.png` · `daniel_lion_den.png` ·
`jesus_teaching.png` · `jesus_sermon.png` · `jesus_help_woman.png` ·
`jesus_2fish_2bread.png` · `loaves_fish.png`

---

## 4️⃣ Sprites already done ✅ (don't redo these)

`adam` · `adam_eat_forbiddenfruit` · `adam_eve_eating_fruit` · `adam_eve_lion` ·
`adam_eve_shame` · `angel` · `armies` · `baby_deer` · `baby_jesus` · `boulder` ·
`butterfly` · `camel` · `cherub` · `chariot` · `cow` · `david` · `david_harp` · `deer` ·
`donkey` · `dove` · `elephant` · `eve` · `eve_eating_fruit` ·
`eve_picking_forbiddenfruit` · `female` · `flamingo` · `forbidden_tree` · `giraffe` ·
`goliath` · `gorilla` · `hippo` · `horse` · `house` · `jesus` *(risen)* · `joseph` ·
`kangaroo` · `king` · `lion` · `man` · `mary` · `monkey` · `moses` · `moses_tablets` ·
`mouse` · `noah` · `ostrich` · `owl` · `ox` · `palm` · `panda` · `rainbow` · `rhino` ·
`saul_damascus` · `serpent` · `sheep` · `snail` · `squirrel` · `tiger` · `toucan` ·
`tree` *(olive)* · `well` · `wheat` *(barley)* · `wisemen` · `zebra`

> **Two figures have a second pose:** `david` (with the sling) and `david_harp` (the
> shepherd boy on his rock); `moses` (staff raised at the sea) and `moses_tablets`
> (down from the mountain with the commandments). Same person, different moment — both
> are placeable, so a kid can build either scene.

> Note: `man.png` and `female.png` are the generic people used across most scenes.
> Eden now has its **own** `adam` / `eve` art (done ✅), so those are no longer generic.

---

## 5️⃣ Optional extras (defined but not in any scene yet)

These have emoji and aren't used in a case right now. Only worth drawing if you want
them for the free-build sandbox or a future scene: `star` ⭐ · `lamp` 🪔 ·
`shepherd` 🧎 · `fire` 🔥.

---

## 📋 Nothing left to draw ✅

All 11 scenes are real art. `staff`/`water` (Moses) and `fruit`/`leaves` (Eden) were
pulled from the palettes on purpose — the parted-sea backdrop is the water, Moses holds
his staff, the forbidden tree has fruit, and Adam & Eve wear fig leaves. Their emoji
definitions still exist for the free-build sandbox; they just no longer clutter a scene.

The only in-scene emoji is the Damascus `light` ⚡ (optional — `saul_damascus` already
has the beam). Drop an `assets/sprites/light.png` someday if you want it; otherwise
you're finished.

Backdrops, for reference — all wired and live:
`manger` · `ark` · `tomb` · `red_sea` / `red_sea_split` · `desert` · `garden_of_eden`
(`eden`) · `road_damascus` · `barley_field` · `mount_sinai` = `sermon_mount` (shared).
