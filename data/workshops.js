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
    practice: { enabled:true, prompt:"I'll call out a spot — you write the code to place it there." },
    // the "bring the scene to life" finale (animates the kid's OWN placed scene)
    finale: {
      sky: "night",
      twinkle: 9,                                 // editable: stars in the sky
      grass: { emoji:"🌿", n:6, rows:[4,5] },      // editable: scenery scattered in
      extras: [ { emoji:"🐑", n:2, rows:[4,4] } ], // one-time extra flock members
      dove: true,
      shimmer: ["star","lamp"],                    // placed items that glow, if present
      wander: ["donkey","sheep","ox","camel","dove"] // placed items that roam
    }
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
    practice: { enabled:true, prompt:"Fill the field! I'll call out where each animal goes." },
    finale: {
      sky: "night",
      twinkle: 9,
      grass: { emoji:"🌿", n:8, rows:[4,5] },
      extras: [ { emoji:"🌾", n:4, rows:[5,5] } ],
      fire: [1,5],                                 // a campfire for the shepherd
      dove: true,
      shimmer: ["star","lamp"],
      wander: ["sheep","shepherd","ox"]
    }
  },

  /* ---- Workshop for CASE 3 (Moses): light the desert road ---- */
  desertJourney: {
    id: "desertJourney",
    forCase: "moses",
    title: "Light the Desert Road",
    subtitle: "Same Truth, New Scribes",
    grid: { cols: 8, rows: 6 },
    items: ["palm","well","fire","camel","sheep","star","lamp","dove","ox"],
    aiPreview: [ 'place("palm", 1, 2)', 'place("well", 3, 4)', 'place("fire", 6, 1)', 'place("camel", 1, 4)' ],
    rungs: [
      { id:0, label:"1 · Oasis",     goalItem:"palm",  target:{col:1,row:2},
        goal:'A resting place in the desert. Type place("palm", 1, 2).' },
      { id:1, label:"2 · Water",     goalItem:"well",  target:{col:3,row:4},
        goal:'Every journey needs water. Add a well: place("well", 3, 4).' },
      { id:2, label:"3 · The fire",  goalItem:"fire",  target:{col:6,row:1},
        goal:'A pillar of fire to lead by night: place("fire", 6, 1).' },
      { id:3, label:"4 · The camel", goalItem:"camel", target:{col:1,row:4},
        goal:'Bring a camel to the caravan: place("camel", 1, 4).' },
      { id:4, label:"5 · Move on",   goalMove:{item:"camel",dir:"right"},
        goal:'Lead the caravan across the desert! move("camel", "right").' },
    ],
    practice: { enabled:true, prompt:"Set up camp! I'll call out where each thing goes." },
    finale: { sky:"night", twinkle:10, grass:{emoji:"🌴", n:4, rows:[2,4]}, dove:true, shimmer:["star","lamp"], wander:["camel","sheep","ox","donkey"] }
  },

  /* ---- Workshop for CASE 4 (Ruth): build the harvest home ---- */
  harvestField: {
    id: "harvestField",
    forCase: "ruth",
    title: "Build the Harvest Home",
    subtitle: "Same Truth, New Scribes",
    grid: { cols: 8, rows: 6 },
    items: ["house","well","ox","sheep","donkey","star","lamp","dove","palm"],
    aiPreview: [ 'place("house", 6, 2)', 'place("well", 4, 4)', 'place("ox", 1, 4)' ],
    rungs: [
      { id:0, label:"1 · A home",  goalItem:"house", target:{col:6,row:2},
        goal:'After a long road, a home. Type place("house", 6, 2).' },
      { id:1, label:"2 · The well", goalItem:"well", target:{col:4,row:4},
        goal:'Water for the workers: place("well", 4, 4).' },
      { id:2, label:"3 · The ox",   goalItem:"ox",   target:{col:1,row:4},
        goal:'An ox for the harvest field: place("ox", 1, 4).' },
      { id:3, label:"4 · To work",  goalMove:{item:"ox",dir:"right"},
        goal:'Work the field! move("ox", "right").' },
    ],
    practice: { enabled:true, prompt:"Build the homestead! I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"🌾", n:10, rows:[3,5]}, extras:[{emoji:"🌿",n:4,rows:[4,5]}], dove:true, shimmer:["star","lamp"], wander:["ox","sheep","donkey"] }
  },

  /* ---- Workshop for CASE 5 (Paul): carry the light ---- */
  carryTheLight: {
    id: "carryTheLight",
    forCase: "paul",
    title: "Carry the Light",
    subtitle: "Same Truth, New Scribes",
    grid: { cols: 8, rows: 6 },
    items: ["lamp","house","star","dove","donkey","camel","palm","well","fire"],
    aiPreview: [ 'place("lamp", 1, 3)', 'place("house", 5, 2)', 'place("dove", 0, 3)' ],
    rungs: [
      { id:0, label:"1 · The light",   goalItem:"lamp",  target:{col:1,row:3},
        goal:'The good news is a light. Type place("lamp", 1, 3).' },
      { id:1, label:"2 · A city",      goalItem:"house", target:{col:5,row:2},
        goal:'Carry it to a city: place("house", 5, 2).' },
      { id:2, label:"3 · The message", goalItem:"dove",  target:{col:0,row:3},
        goal:'Ready the messenger: place("dove", 0, 3).' },
      { id:3, label:"4 · Send it far", goalMove:{item:"dove",dir:"right"},
        goal:'Send the message across the sea! move("dove", "right").' },
    ],
    practice: { enabled:true, prompt:"Light the cities! I'll call out where each one goes." },
    finale: { sky:"night", twinkle:12, grass:{emoji:"🪔", n:6, rows:[2,4]}, extras:[{emoji:"⭐",n:3,rows:[0,1]}], dove:true, shimmer:["lamp","star"], wander:["dove","donkey","camel"] }
  },

};

if (typeof window !== "undefined") {
  window.FOOTSTEPS_WORKSHOPS = { WORKSHOPS, WORKSHOP_ITEMS };
}
// ES modules:  export { WORKSHOPS, WORKSHOP_ITEMS };
// CommonJS:    module.exports = { WORKSHOPS, WORKSHOP_ITEMS };
