# Footsteps — Art Asset Spec & Grok Prompt Sheet

A handoff doc for generating all images, organized as a **reusable library**.
Generate each asset once; cases reuse them. Drag the finished files into the
folder structure below and Claude Code loads them by filename.

---

## 0. THE LOCKED STYLE BLOCK  (paste at the END of every prompt)

> Warm storybook illustration, soft gouache texture, golden-hour Middle Eastern
> palette of terracotta, olive, sand, and warm gold. Gentle rounded shapes,
> hand-painted feel, soft rim lighting. Friendly and reverent, suitable for
> children. No text, no words, no letters, no logos in the image. Clean
> composition with simple background depth. Consistent illustrated style across
> the whole set.

**Why this matters:** consistency across 30+ images depends on this block being
*identical* every time. Don't reword it. Just change the subject line above it.

**One reference trick:** generate ONE image first (Nazareth), approve the look,
then in Grok say "in the exact same style as the previous image" + the style
block. This keeps the whole set visually unified.

---

## 1. FOLDER STRUCTURE  (name files exactly like this)

```
/assets
  /scenes     → location backgrounds (4:3, 1600x1200, .jpg)
  /map        → the tappable map screen (3:2, 1920x1280, .jpg)
  /pins       → map markers (1:1, 512x512, transparent .png)
  /chars      → people, reusable across cases (1:1, 1024x1024, transparent .png)
  /props      → reward/clue objects (1:1, 512x512, transparent .png)
  /icon       → app icon (1:1, 1024x1024, .png)
```

Rule: file = lowercase subject, no spaces. `bethlehem.jpg`, `pin-bethlehem.png`,
`char-eli-curious.png`. If it's named after the place, the code finds it.

---

## 2. SCENES — the reusable location library  (4:3, 1600x1200)

These are backgrounds. Multiple cases reuse the same location, so we paint the
PLACE, not a specific event. Generate one per location.

| File | Subject line to paste above the style block |
|---|---|
| `nazareth.jpg` | A small peaceful hillside village in ancient Galilee, modest stone houses, olive trees, distant green hills, a quiet dirt path. |
| `bethlehem.jpg` | A small ancient town in the hills of Judea at dusk, clustered stone dwellings, a glowing star above, gentle lamplight in windows. |
| `egypt.jpg` | An ancient Egyptian river landscape, palm trees along a wide calm river, distant sandstone structures, warm desert light. |
| `jerusalem.jpg` | A grand ancient walled city on a hill, large stone temple complex, busy market streets below, dramatic warm sky. |
| `capernaum.jpg` | A peaceful fishing village on the shore of a large calm lake, wooden fishing boats, nets drying, soft morning light. |
| `jordan-river.jpg` | A gentle river winding through green reeds and low hills, shallow clear water, soft reflective light. |
| `wilderness.jpg` | A vast quiet rocky desert wilderness, rolling sand and stone, sparse scrub, wide empty sky, sense of solitude. |
| `cana.jpg` | A modest village courtyard set for a joyful celebration, stone water jars, draped cloth, warm festive evening light. |
| `samaria-well.jpg` | An ancient stone well beside a dusty road at midday, a few olive trees, bright warm sun, a town in the distance. |
| `bethany.jpg` | A small quiet village near a hillside, modest homes among gardens and fig trees, gentle afternoon light. |
| `mount-galilee.jpg` | A grassy green hillside overlooking a wide calm lake, gentle slope, soft clouds, peaceful gathering space. |
| `road-emmaus.jpg` | A long dusty country road at golden hour winding between low hills toward a distant village, long warm shadows. |

> 12 locations cover every case below with room to spare. Start with the 3 you
> need for Case One: nazareth, bethlehem, egypt.

---

## 3. MAP — the navigation screen  (3:2, 1920x1280)

| File | Subject line |
|---|---|
| `worldmap.jpg` | A hand-painted antique-style regional map showing the lands of Galilee, Judea, and Egypt around a central lake and a river, decorative hills and tiny illustrated towns, aged parchment background, NO labels and NO text. |

Pins are added in code on top — so the map itself stays text-free and reusable.

---

## 4. PINS — tappable markers  (1:1, 512x512, transparent PNG)

One per location. Same simple style so the map reads cleanly. Subject line for
each is identical except the little icon motif:

> A single small map marker icon, rounded teardrop pin shape in warm gold and
> terracotta, with a tiny [MOTIF] symbol on it, centered, on a fully
> transparent background.

| File | [MOTIF] |
|---|---|
| `pin-nazareth.png` | little house |
| `pin-bethlehem.png` | small star |
| `pin-egypt.png` | palm tree |
| `pin-jerusalem.png` | temple arch |
| `pin-capernaum.png` | fishing boat |
| `pin-jordan-river.png` | water drop |
| `pin-wilderness.png` | rock/sun |
| `pin-cana.png` | water jar |
| `pin-samaria-well.png` | well |
| `pin-bethany.png` | fig tree |
| `pin-mount-galilee.png` | grassy hill |
| `pin-road-emmaus.png` | winding road |

---

## 5. CHARACTERS — fully reusable across all cases  (1:1, 1024x1024, transparent PNG)

The big reuse win. Paint each person once; they appear in many cases.

**Eli — the modern companion kid (3 expressions):**
> A friendly cartoon-illustrated young boy about 10 years old, modern casual
> clothes (t-shirt), short tidy hair, expressive face showing [EXPRESSION],
> half-body, on a fully transparent background.

| File | [EXPRESSION] |
|---|---|
| `char-eli-impatient.png` | impatient and antsy, arms crossed, eager |
| `char-eli-curious.png` | curious and wide-eyed, leaning in |
| `char-eli-content.png` | calm, peaceful, gently smiling |

**Sacred & supporting figures (full faces, warm and gentle):**
| File | Subject line |
|---|---|
| `char-jesus.png` | A warm gentle illustrated portrait of the Teacher, kind eyes, simple robe, soft light around him, half-body, transparent background. |
| `char-mary.png` | A young woman in a blue head covering with a calm, kind expression, half-body, transparent background. |
| `char-shepherd.png` | A humble shepherd with a staff and simple cloak, weathered kind face, half-body, transparent background. |
| `char-wiseman.png` | A traveler from the east in rich layered robes holding a small gift box, dignified, half-body, transparent background. |
| `char-disciple.png` | A simple fisherman in a rough tunic, friendly weathered face, half-body, transparent background. |
| `char-woman-well.png` | A woman in simple robes holding a clay water jar, thoughtful expression, half-body, transparent background. |

---

## 6. PROPS — clue/reward objects  (1:1, 512x512, transparent PNG)

Little objects that decorate clue cards and win screens. Reused everywhere.

| File | Subject line |
|---|---|
| `prop-scroll.png` | A rolled ancient scroll tied with cord, transparent background. |
| `prop-star.png` | A glowing warm golden star, transparent background. |
| `prop-lamp.png` | A small clay oil lamp with a gentle flame, transparent background. |
| `prop-bread.png` | A small loaf of rustic bread and a few fish, transparent background. |
| `prop-water-jar.png` | A clay water jar, transparent background. |
| `prop-crown.png` | A simple woven crown of olive branches, transparent background. |

---

## 7. APP ICON  (1:1, 1024x1024)

| File | Subject line |
|---|---|
| `appicon.png` | An app icon: a single warm glowing path of footprints leading toward a soft golden light over gentle hills, simple bold shapes, no text. |

> Apple needs 1024x1024 with no transparency and no rounded corners (the OS
> rounds it). Keep the design simple — it must read at tiny size.

---

## 8. THE CASE LIST  (what art each case consumes — all reusing the library)

This is your content roadmap. Note how few NEW images each new case needs.

**Case 1 — The Long-Awaited One** · *Patience & Trust* (built)
Scenes: nazareth, bethlehem, egypt · Chars: eli, mary, shepherd, wiseman, jesus
→ New art needed: just the Case-1 scenes + core characters.

**Case 2 — The Teacher by the Sea** · *Compassion*
Scenes: capernaum, mount-galilee, bethany · Chars: jesus, disciple, eli
→ New art: capernaum, mount-galilee, bethany scenes + disciple. Everything else reused.

**Case 3 — The Quiet Strength** · *Patience in trial / courage*
Scenes: wilderness, jordan-river, jerusalem · Chars: jesus, eli
→ New art: wilderness, jordan-river, jerusalem scenes. Characters all reused.

**Case 4 — The Unexpected Kindness** · *Loving your neighbor*
Scenes: samaria-well, road-emmaus, jerusalem · Chars: jesus, woman-well, eli
→ New art: samaria-well, road-emmaus scenes + woman-well. Rest reused.

**Total unique images for 4 full cases:**
~12 scenes + 1 map + 12 pins + 9 characters + 6 props + 1 icon = **~41 images**
…covering 4 complete cases. After that, new cases are mostly free (reuse).

---

## 9. HANDOFF CHECKLIST

1. Generate `nazareth.jpg` first → approve the style → lock it as your reference.
2. Batch the rest of the scenes using "same style as before" + style block.
3. Do characters on transparent background (Grok: say "transparent background"
   explicitly; if it adds one, you can knock it out later).
4. Drop everything into the `/assets` folders with exact filenames.
5. Tell Claude Code: "load scenes/characters/pins by the `place` and `char`
   fields in the CASE data" — naming convention does the rest.
