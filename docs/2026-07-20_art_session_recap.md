# Footsteps — Art & Scene Session Recap (2026-07-20)

A living record of the art push that took *Footsteps of the Teacher* from "mostly
emoji stand-ins" to **every one of the 11 scenes rendering in real illustration**.
Written so anyone (or a future session) can pick up where this left off.

---

## TL;DR

- **All 11 scenes are 100% real art.** No emoji stand-ins remain in any scene.
- Added ~30 new sprites and **6 new backdrops**, then **compressed everything** — the
  repo's art footprint dropped by ~12 MB with no visible quality loss.
- Two small **engine features** were added along the way: the finale can now sprinkle a
  real sprite (not just an emoji), and "nightfall" now darkens the whole painted
  backdrop, not just the sky behind gaps.
- Four pieces (`staff`, `water`, `fruit`, `leaves`) were **intentionally dropped** —
  each is already covered by other art — so nothing looks unfinished.

---

## How the art pipeline works (the important part)

Drop a correctly-named PNG in the right folder, commit, push — it appears in the game
automatically. No code change for a straight swap.

- **`assets/sprites/<name>.png`** — small pieces placed on the grid. The loader tries
  `sprites/` first, then `scenes/`, then falls back to the item's emoji.
- **`assets/scenes/<name>.png`** — big illustrations and full-stage **backdrops**.
- Names must be **exact lowercase**, underscores not spaces, always `.png` (the web
  server is case-sensitive).
- **Backdrops** are the one exception that needs a line of code: an entry in the
  `BACKDROPS` map in `src/workshop.js` turns a scene file into a `place("name")` command.

**File-size rule:** high-res masters live in `Desktop/bible_sprites` (untouched). The
copies in the repo are compressed (resize + 256-color quantize, alpha preserved). When
new art comes in oversized, it gets shrunk before committing — e.g. the well went
2.7 MB → 41 KB, the house 1.7 MB → 160 KB, with no visible loss.

---

## Scenes — final state (11/11 real art)

| Scene | Backdrop | Notable pieces |
|-------|----------|----------------|
| The Manger | `manger` (stable) **or** `desert` (outdoor) | wise men, camel, holy family, animals; **night falls when you run the code** |
| David & Goliath | `desert` (valley of Elah) | david, david_harp (2nd pose), goliath, armies, chariot |
| Parting the Red Sea | `red_sea` → `red_sea_split` (the sea parts on the kid's command); `mount_sinai` | moses, moses_tablets (the commandments), crowd |
| The Barley Field (Ruth) | `barley_field` | ruth/boaz, ox, well, house, sheep; barley sprinkles in |
| The Damascus Road (Paul) | `road_damascus` | saul_damascus (struck down, light built in), risen jesus, horse, donkey |
| Fill the Ark (Noah) | `noahs_ark` | noah + all the animals |
| Roll the Stone Away | `jesus_tomb` | boulder on a rail, risen jesus, angel |
| Daniel's Den | `daniel_lion_den` | daniel, lions, king (Darius) |
| Loaves & Fishes | — | jesus, crowds, loaves & fish |
| Garden of Eden | `garden_of_eden` | the full Genesis 2–3 arc (see below) |
| Sermon on the Mount | `sermon_mount` (shared mountain) | jesus teaching, the crowd |

---

## What got added this session

### Nativity
`wisemen` (the three magi) and `camel` joined the manger; the nativity animals
(`cow`, `sheep`, `donkey`) and `horse` upgraded from emoji.

### The Garden of Eden — the richest scene
The whole story is placeable: `forbidden_tree` (fruit + serpent in its branches),
`adam`, `eve`, `serpent`, `cherub` (the guardian with the flaming sword, Gen 3:24),
plus story poses `adam_eve_lion` (at peace with the animals), `eve_picking_forbiddenfruit`,
`eve_eating_fruit`, `adam_eat_forbiddenfruit`, `adam_eve_eating_fruit`, and
`adam_eve_shame` (the walk out of the garden). Backdrop `garden_of_eden`.

### The Damascus Road (Acts 9)
`saul_damascus` (Saul struck to the ground, the light beam built into the art),
`road_damascus` (backdrop), plus `donkey`/`horse` on the road. The `light` piece was
removed — Saul's art already carries it.

### The risen Jesus — one canonical piece
`jesus.png` is the glowing, risen Jesus. He's used everywhere Jesus appears — the tomb,
the feeding, the sermon, and in glory over Saul on the road. One drawing, every scene.

### Second poses
`david_harp` (David the shepherd boy on his rock, before the valley) and
`moses_tablets` (Moses down from Sinai with the commandments) are separate pieces, so a
kid can build either moment of the story without replacing the first art.

### Props & backdrops
`noah`, `ox`, `palm`, `well`, an olive `tree`, and a mud-brick `house`. Backdrops:
`desert` (reusable dry-land scene), `barley_field`, and one mountaintop that serves
**both** `mount_sinai` (Moses) and `sermon_mount` (Jesus).

---

## Engine changes

**Sprite scatter in the finale.** The "bring it to life" animation could only sprinkle
emoji. It can now sprinkle a real sprite via `grass:{sprite:"wheat", n:6, rows:[...]}`
(vs the old `grass:{emoji:"🌾", ...}`). Ruth's harvest and the Damascus roadside now
sprinkle the actual barley art. Backward compatible — emoji scatters are unchanged.
*(src/finale.js: `decor()` / `setGroup()` gained a sprite mode.)*

**Nightfall dims the backdrop.** `sky:"night"` used to only swap the stage's background
gradient, which a full backdrop image sits on top of and hides — so a painted scene
stayed bright at "night." Now `#stage.night .stage-bg` dims the backdrop image itself
(brightness .5, 1.2 s fade), so the whole scene turns to evening. Improves every night
scene. *(styles/footsteps.css.)*

---

## Intentionally dropped (don't redraw)

`staff`, `water` (Moses) and `fruit`, `leaves` (Eden) were pulled from their palettes —
each is already in the art: the `red_sea_split` backdrop is the water, `moses` holds his
own staff, `forbidden_tree` has fruit on it, and `adam`/`eve` wear fig leaves. Their
emoji item definitions still exist for the free-build sandbox; they just no longer show
an unfinished emoji in a scene. The Damascus `light` was dropped for the same reason.

---

## Compression pass

High-res masters were shrinking the download. Repo copies compressed with no visible
loss (resize + 256-color quantize, alpha preserved):

| File | Before | After |
|------|--------|-------|
| well | 2.7 MB | 41 KB |
| house | 1.7 MB | 160 KB |
| palm | 1.3 MB | 60 KB |
| barley_field | 2.4 MB | 651 KB |
| mount_sinai | 2.2 MB | 480 KB |
| garden_of_eden | 1.7 MB | 376 KB |
| noahs_ark | 860 KB | 129 KB |

Masters remain full-res in `Desktop/bible_sprites`.

---

## Open / optional (nothing blocking)

- The shared `mount_sinai` / `sermon_mount` backdrop had faint stock-watermark specks in
  an early version; the updated version is much cleaner and the compression pass softened
  them further. A dedicated `sermon_mount.png` could override the shared mountain someday.
- If any night scene beyond the manger should darken on run, set that scene's finale
  `sky` to `"night"` — one word.

---

## Where things live

```
data/workshops.js     WORKSHOP_ITEMS (name→emoji) + every scene's config
src/workshop.js       BACKDROPS map, SPRITE_SCALE, DEFAULT_SIZE, the place/move engine
src/finale.js         the "bring it to life" animation (nightfall, scatter, wander…)
styles/footsteps.css  the parchment design system (incl. the night backdrop dim)
assets/sprites/       small placeable art
assets/scenes/        backdrops + big illustrations
docs/ART-ASSETS-NEEDED.md   the running art checklist (now: nothing left to draw)
docs/PROJECT_STATUS.md      the overall project snapshot
```
