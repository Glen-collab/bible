# 🎨 Footsteps of the Teacher — Art Asset List

> **▶️ START HERE TOMORROW:** You need **13 sprite images** (→ `assets/sprites/`) and,
> optionally, **3 background scenes** (→ `assets/scenes/`). The exact copy-paste
> filename lists are at the very bottom (§📋).
>
> **✅ 2026-07-20 batch is in:** cow, sheep, donkey, camel, horse, adam, eve, serpent,
> the whole Eden story set (forbidden_tree, cherub, adam_eve_lion, the eating poses,
> adam_eve_shame), and the wise men — plus two backdrops, `desert` and
> `garden_of_eden`. All loading live. Save each file with the **exact
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

## 1️⃣ Sprites still needed (these currently show an emoji)

Save all of these in **`assets/sprites/`**. Grouped by the case/scene they appear in
so you can knock out one scene at a time.

### 🐑 Common animals & objects (used in several scenes — highest value)
| Filename | Now shows | Used in |
|----------|-----------|---------|
| `ox.png` | 🐂 | The Barley Field |
| `house.png` | 🏠 | Barley Field · Damascus Road |
| `palm.png` | 🌴 | The Damascus Road |
| `well.png` | 🪣 | The Barley Field |
| *(sheep, donkey, cow, horse, camel all have art ✅)* | | |

### ⚔️ Case: David and Goliath *(Valley of Elah)*
*(david, david_harp, goliath, armies, chariot all have art ✅ — nothing left here)*

### 🌊 Case: Parting the Red Sea *(Moses)*
| Filename | Now shows | Note |
|----------|-----------|------|
| `staff.png` | 🦯 | Moses's staff / rod |
| `water.png` | 🌊 | the standing walls of water — the kid raises these themselves |
| *(moses + moses_tablets already have art ✅, and both Red Sea backdrops are wired ✅)* | | |

### 🌾 Case: The Barley Field *(Ruth)*
| Filename | Now shows | Note |
|----------|-----------|------|
| `wheat.png` | 🌾 | sheaves of barley |
| *(also uses `ox`, `well`, `house`, `sheep` from the common table above)* | | |

### ⚡ Case: The Damascus Road *(Paul)*
| Filename | Now shows | Note |
|----------|-----------|------|
| `light.png` | ⚡ | the bright light from heaven |
| *(also uses `horse`, `house`, `palm` from the common table)* | | |

### 🚢 Case: Fill the Ark *(Noah)*
| Filename | Now shows | Note |
|----------|-----------|------|
| `noah.png` | 🧔 | Noah *(all the ark animals already have art ✅)* |

### 🦁 Case: Daniel in the Lions' Den
*(the den + lions use `daniel_lion_den.png` and King Darius is `king.png` — both done ✅)*

### 🌅 Case: Roll the Stone Away *(Empty Tomb)* & 🍞 Loaves & Fishes & ⛰️ Sermon
| Filename | Now shows | Note |
|----------|-----------|------|
| `jesus.png` | 🧍 | Jesus — appears in the tomb (risen), the feeding, and the sermon. Draw him glowing/risen and he'll shine in all three. |

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

> **The two Red Seas are a pair.** Placing one replaces the other, so in the Moses
> workshop the kid sets the closed sea, places Moses and his staff, and then types
> `place("red_sea_split")` — and the water opens. The miracle happens by their own line
> of code. *(The scattered 🌊/🐟 that used to speckle the finale are gone — the painted
> backdrop is the water.)*

### 🆕 New backgrounds you asked about — draw the art and I'll wire the command:
Save the file, then tell me and I'll add the one-word command so kids can drop it in.
(These are *optional* — every scene already works with the ground + pieces; a painted
backdrop just makes it richer.)

| Filename (save in `assets/scenes/`) | Scene it would set | Command I'd add |
|-------------------------------------|--------------------|-----------------|
| `sermon_mount.png` | The Sermon on the Mount — green hillside overlooking the lake | `place("sermon_mount")` |
| `barley_field.png` | Ruth — golden barley field at harvest | `place("barley_field")` |
| `damascus_road.png` | Paul — the dusty road with a burst of light | `place("damascus_road")` |

> `eden` is done ✅ (`garden_of_eden.png`), and **David's valley is covered by
> `desert.png`** — the same desert backdrop is reusable for any dry-land story, so
> `valley_elah` isn't needed as its own file. Daniel's den already has
> `daniel_lion_den.png`.

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
`goliath` · `gorilla` · `hippo` · `horse` · `joseph` · `kangaroo` · `king` · `lion` ·
`man` · `mary` · `monkey` · `moses` · `moses_tablets` · `mouse` · `ostrich` · `owl` ·
`panda` · `rainbow` · `rhino` · `serpent` · `sheep` · `snail` · `squirrel` · `tiger` ·
`toucan` · `wisemen` · `zebra`

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

## 📋 Quick copy-paste checklist (the 13 sprites still on emoji)

```
assets/sprites/jesus.png
assets/sprites/noah.png
assets/sprites/staff.png
assets/sprites/water.png
assets/sprites/ox.png
assets/sprites/house.png
assets/sprites/palm.png
assets/sprites/well.png
assets/sprites/wheat.png
assets/sprites/light.png
assets/sprites/tree.png
assets/sprites/fruit.png
assets/sprites/leaves.png
```

Optional backgrounds (in `assets/scenes/`):
```
assets/scenes/sermon_mount.png
assets/scenes/barley_field.png
assets/scenes/damascus_road.png
```

### 🏆 Best next batch
`jesus.png` is now the single highest-value sprite left — he's a stand-in emoji in
**three** scenes (the tomb, the feeding, the sermon). One drawing lights up all three.
After that, `noah` (the ark) and Moses's `staff` + `water` finish the two scenes that
are already backdrop-complete.
