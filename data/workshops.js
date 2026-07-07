/* =====================================================================
   FOOTSTEPS — WORKSHOPS (coding mini-games, data-driven)
   ---------------------------------------------------------------------
   Each case can unlock a "Workshop" after its final stop: the kid types
   REAL JavaScript to build that case's scene, one line at a time.

   The reference implementation is prototypes/workshop-donkey-reference.html
   (fully working: real-JS console, numbered grid + toggle, object palette,
   intent-reading pattern-matching tutor, sound, and a practice mode).

   This file is the DATA layer for that engine. Claude Code: wire the
   Workshop engine (extracted from the reference) to read these configs,
   the same way the case engine reads data/cases.js.

   The tutor "brain" is inferIntent() in the reference — a pure function
   (messy text -> suggested real line). Keep it swappable so a future
   Claude API call can replace pattern-matching for open-ended code.
   ===================================================================== */

/* Shared object palette available in every workshop (name -> emoji/sprite key).
   Claude Code: replace emoji with real sprite images from /assets later. */
const WORKSHOP_ITEMS = {
  donkey:"🫏", sheep:"🐑", camel:"🐪", ox:"🐂", dove:"🕊️",
  manger:"🪵", star:"⭐", lamp:"🪔", shepherd:"🧎", wiseman:"🧙",
  angel:"👼", palm:"🌴", house:"🏠", well:"🪣", fire:"🔥"
};

/* Real functions the kid's JS calls (defined in the engine):
     place(name, col, row)      // place an item on the grid
     move(name, direction)      // "left" | "right" | "up" | "down"
   Grid is COLS x ROWS (default 8 x 6). Columns 0–7 across, rows 0–5 down. */

const WORKSHOPS = {

  /* ---- Workshop for CASE 1 (Jesus / Nativity): build the manger scene ---- */
  nativity: {
    id: "nativity",
    forCase: "jesus",
    title: "Build the Manger Scene",
    subtitle: "Same Truth, New Scribes",
    grid: { cols: 8, rows: 6 },
    // "here's what the computer can make" — shown first as the AI preview
    aiPreview: [
      'place("star", 6, 0)',
      'place("manger", 3, 5)',
      'place("donkey", 2, 4)',
      'place("sheep", 5, 4)',
    ],
    // the magic ladder — one new idea per rung
    rungs: [
      { id:0, label:"1 · Donkey",   goalItem:"donkey",  target:{col:3,row:4},
        goal:'Type place("donkey", 3, 4) to make the donkey appear. Numbers = column (across), row (down).' },
      { id:1, label:"2 · Move him", goalMove:{item:"donkey",dir:"right"},
        goal:'Send him across the stable! Type move("donkey", "right") and watch him go.' },
      { id:2, label:"3 · Manger",   goalItem:"manger",  target:{col:3,row:5},
        goal:'Add a manger: place("manger", 3, 5).' },
      { id:3, label:"4 · Star",     goalItem:"star",    target:{col:6,row:0},
        goal:'Hang the star up high: place("star", 6, 0). A small row number is near the top.' },
    ],
    // after the guided rungs -> free practice/challenge mode (auto-generated targets)
    practice: { enabled:true, prompt:"I'll call out a spot — you write the code to place it there." }
  },

  /* ---- Stub for future workshops (one per case). Fill target arrangements. ---- */
  shepherdField: {
    id: "shepherdField",
    forCase: "david",
    title: "Build the Shepherd's Field",
    subtitle: "Same Truth, New Scribes",
    grid: { cols: 8, rows: 6 },
    aiPreview: [ 'place("sheep", 2, 4)', 'place("sheep", 4, 4)', 'place("shepherd", 3, 3)', 'place("star", 6, 0)' ],
    rungs: [
      { id:0, label:"1 · Sheep",    goalItem:"sheep",    target:{col:2,row:4},
        goal:'Place a sheep in the field: place("sheep", 2, 4).' },
      { id:1, label:"2 · Shepherd", goalItem:"shepherd", target:{col:3,row:3},
        goal:'Add the shepherd watching over them: place("shepherd", 3, 3).' },
      { id:2, label:"3 · More sheep", goalItem:"sheep",  target:{col:5,row:4},
        goal:'A flock needs more than one. Place another sheep: place("sheep", 5, 4).' },
    ],
    practice: { enabled:true, prompt:"Fill the field! I'll call out where each animal goes." }
  },

  // moses / ruth / paul workshops: add here following the same shape.
};

if (typeof window !== "undefined") {
  window.FOOTSTEPS_WORKSHOPS = { WORKSHOPS, WORKSHOP_ITEMS };
}
// ES modules:  export { WORKSHOPS, WORKSHOP_ITEMS };
// CommonJS:    module.exports = { WORKSHOPS, WORKSHOP_ITEMS };
