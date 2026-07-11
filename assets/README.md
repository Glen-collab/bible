# Footsteps — Assets

Real art goes here. The app **auto-loads** it by filename — drop a file in with
the right name and it replaces the emoji placeholder automatically, no code change.

See `docs/footsteps-art-spec.md` for the full scenes / characters / pins pipeline
and the **locked style block** (paste it at the end of every Grok prompt so the
whole set matches).

## `assets/sprites/` — the little workshop pieces (what this doc is about)

These are the objects a kid places in the coding workshop (`place("donkey", 3, 4)`).
Right now they render as emoji; a PNG here upgrades them to real art.

**The contract (this is what makes it "just work"):**
- **Filename = the item name, lowercase, `.png`** — `donkey.png`, `sheep.png`, `goliath.png`.
  If the item is `place("donkey", ...)`, the file must be `assets/sprites/donkey.png`.
- **Square, transparent background** (~512×512 PNG). One object, centered, filling
  most of the frame with a little padding.
- **Same style across all of them** — use the locked style block from the art spec,
  plus: *"a single [SUBJECT], centered, simple, on a fully transparent background,
  small game-piece style."*
- No file yet? The app quietly falls back to the emoji. So you can add art one piece
  at a time — nothing breaks.

**Test the pipeline fast:** generate `donkey.png`, drop it here, open the Jesus
workshop → the donkey is now your art instead of 🫏. That proves the whole loop.

### Current sprite names (emoji placeholders in use)
donkey, sheep, camel, ox, dove, manger, star, lamp, shepherd, wiseman, angel,
palm, house, well, fire

### New names the iconic-scene rethemes will add
(these will get emoji placeholders too, so they work before you paint them)
- **David & Goliath:** `david`, `goliath`, `stone`, `shield`
- **Red Sea:** `moses`, `water`, `traveler`, `staff`
- **Damascus road:** `paul`, `light`, `horse`

> Reuse first: sheep, dove, star, lamp, palm, house, well, fire already cover a lot
> of every scene. Only the bold new names above actually need generating.
