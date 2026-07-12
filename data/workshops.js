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
  angel:"👼", palm:"🌴", house:"🏠", well:"🪣", fire:"🔥",
  // animals (real art in assets/sprites/, emoji fallback here)
  elephant:"🐘", giraffe:"🦒", zebra:"🦓", tiger:"🐅", lion:"🦁",
  hippo:"🦛", rhino:"🦏", gorilla:"🦍", panda:"🐼", kangaroo:"🦘",
  monkey:"🐒", flamingo:"🦩", toucan:"🦜", ostrich:"🐦", deer:"🦌",
  baby_deer:"🦌", mouse:"🐭", snail:"🐌", butterfly:"🦋", squirrel:"🐿️",
  owl:"🦉", rainbow:"🌈",
  // figures for the iconic-scene rethemes
  david:"🧒", goliath:"🧌", mary:"🧕", joseph:"🧔", man:"🧑", female:"👩", baby_jesus:"👶",
  armies:"⚔️", chariot:"🛞", horse:"🐴",
  // resurrection scene pieces
  boulder:"🪨", jesus:"🧍", king:"🤴",
  // nativity stand-ins (emoji until real art is added)
  cow:"🐄", noah:"🧔",
  // backdrop objects: placing one becomes the whole scene (manger already above)
  ark:"🚢", tomb:"⚰️",
  // larger illustrated images (loaded from assets/scenes/) usable as placeable
  // pieces too — scale them up with place(name, col, row, size) or the ＋ button
  jesus_tomb:"⚰️", crowd_listening:"👥", crowd_eating_fish:"🍽️",
  jesus_sermon:"🧎", jesus_teaching:"📖", jesus_help_woman:"🤝",
  jesus_2fish_2bread:"🐟", loaves_fish:"🍞", daniel_lion_den:"🦁"
};

/* Real functions the kid's JS calls (defined in the engine):
     place(name, col, row)      // place an item on the grid
     move(name, direction)      // "left" | "right" | "up" | "down"
   Grid is COLS x ROWS (default 8 x 6). Columns 0–7 across, rows 0–5 down. */

const WORKSHOPS = {

  /* ---- Workshops (each is a case's reward). The Jesus case uses theManger. ---- */
  shepherdField: {
    id: "shepherdField",
    forCase: "david",
    standalone: true,
    freeBuild: true,
    title: "David and Goliath",
    subtitle: "The Valley of Elah",
    grid: { cols: 8, rows: 6 },
    ground: "grass",
    freeGoal: 'Set up the showdown! Place David — place("david", 1, 3) — and the giant Goliath, the two armies on the hills, plus horses and chariots. Then tap the 🦉 button to bring it to life.',
    items: ["david","goliath","armies","horse","chariot","sheep","dove"],
    aiPreview: [ 'place("david", 1, 3)', 'place("goliath", 6, 3)', 'place("armies", 3, 1)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: {
      sky: "day",
      twinkle: 0,
      grass: { emoji:"🌿", n:6, rows:[4,5] },
      extras: [ { emoji:"🪨", n:3, rows:[4,5] } ],   // five smooth stones in the brook
      dove: true,
      shimmer: ["david"],
      wander: ["horse","sheep","david"]
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

  /* ---- Standalone scene (no full case yet): Noah's Ark ---- */
  noahsArk: {
    id: "noahsArk",
    standalone: true,                              // stays in the free-play "Build a Scene" sandbox
    forCase: "noah",                               // …and unlocks as the reward of the Noah case
    title: "Fill the Ark",
    subtitle: "Two by Two",
    grid: { cols: 8, rows: 6 },
    background: "noahs_ark",                        // the ark art sits behind the grid; animals board the deck
    freeBuild: true,
    freeGoal: 'Fill the ark! Start with Noah — place("noah", 3, 3) — then bring the animals aboard, two by two if you like. Add as many as you want, then tap the 🦉 button below to bring it to life.',
    items: ["noah","elephant","giraffe","lion","zebra","tiger","panda","monkey","kangaroo","owl","mouse","butterfly","rainbow","dove"],
    aiPreview: [ 'place("elephant", 1, 4)', 'place("elephant", 2, 4)', 'place("giraffe", 4, 3)', 'place("dove", 6, 1)' ],
    rungs: [
      { id:0, label:"1 · First aboard", goalItem:"elephant", target:{col:1,row:4},
        goal:'Bring the first animal aboard: place("elephant", 1, 4).' },
      { id:1, label:"2 · Two by two",   goalItem:"elephant", target:{col:2,row:4},
        goal:'Two by two! Bring its pair: place("elephant", 2, 4).' },
      { id:2, label:"3 · A tall one",   goalItem:"giraffe",  target:{col:4,row:3},
        goal:'Now a giraffe: place("giraffe", 4, 3).' },
      { id:3, label:"4 · The smallest", goalItem:"mouse",    target:{col:5,row:5},
        goal:'Even the smallest creature has a place: place("mouse", 5, 5).' },
      { id:4, label:"5 · The dove",     goalItem:"dove",     target:{col:6,row:1},
        goal:'The dove will search for dry land: place("dove", 6, 1).' },
    ],
    practice: { enabled:true, prompt:"Fill the ark! I'll call out which animal goes where." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"💧", n:8, rows:[0,2]}, extras:[{emoji:"🌈", n:1, rows:[0,0]}], dove:true, shimmer:[], wander:["elephant","giraffe","lion","zebra","tiger","panda","monkey","kangaroo","mouse","butterfly"] }
  },

  /* ---- Standalone scene: the empty tomb (roll the stone away) ---- */
  emptyTomb: {
    id: "emptyTomb",
    standalone: true,
    title: "Roll the Stone Away",
    subtitle: "He is not here",
    grid: { cols: 8, rows: 6 },
    items: ["tomb","boulder","jesus","angel","man","female","crowd_listening","dove"],
    // the stone is on a track: it always sits at "home" (sealed) and rolls to "open"
    rail: { item:"boulder", home:{col:2,row:1}, open:{col:0,row:1} },
    aiPreview: [ 'place("tomb")', 'place("boulder", 2, 1)', 'move("boulder", "left")', 'place("jesus", 4, 3)' ],
    rungs: [
      { id:0, label:"1 · The tomb", goalItem:"tomb",
        goal:'Set the tomb as your scene: place("tomb"). It fills the whole stage.' },
      { id:1, label:"2 · Seal it",  goalItem:"boulder", target:{col:2,row:1},
        goal:'Roll the great stone over the door: place("boulder"). It sits right at the entrance.' },
      { id:2, label:"3 · Roll it away", goalMove:{item:"boulder",dir:"left"},
        goal:'On the third day, roll the stone away: move("boulder", "left"). Roll it back with move("boulder", "right").' },
      { id:3, label:"4 · He is risen", goalItem:"jesus", target:{col:4,row:3},
        goal:'The tomb is empty — reveal him: place("jesus", 4, 3).' },
    ],
    practice: { enabled:true, prompt:"I'll call out where the figures go." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"🌿", n:5, rows:[4,5]}, extras:[{emoji:"✨", n:7, rows:[0,2]}], dove:true, shimmer:["jesus","angel"], wander:["dove"] }
  },

  /* ---- Standalone scene: Daniel in the lions' den ---- */
  danielDen: {
    id: "danielDen",
    standalone: true,
    title: "Daniel in the Lions' Den",
    subtitle: "Shut the Lions' Mouths",
    grid: { cols: 8, rows: 6 },
    ground: "cave",
    items: ["daniel_lion_den","lion","king","angel","man","dove"],
    aiPreview: [ 'place("daniel_lion_den", 3, 0)', 'place("king", 6, 4)', 'place("dove", 4, 0)' ],
    rungs: [
      { id:0, label:"1 · The den",  goalItem:"daniel_lion_den", target:{col:3,row:0},
        goal:'Set the lions\' den: place("daniel_lion_den", 3, 0).' },
      { id:1, label:"2 · The king", goalItem:"king", target:{col:6,row:4},
        goal:'At dawn the king comes to check on Daniel: place("king", 6, 4).' },
      { id:2, label:"3 · A dove",   goalItem:"dove", target:{col:4,row:0},
        goal:'Send a dove over the den: place("dove", 4, 0).' },
    ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"🌿", n:4, rows:[4,5]}, extras:[{emoji:"✨", n:5, rows:[0,2]}], dove:true, shimmer:["angel"], wander:["dove","lion"] }
  },

  /* ---- Standalone scene: the loaves and fishes ---- */
  feeding5000: {
    id: "feeding5000",
    standalone: true,
    title: "The Loaves and Fishes",
    subtitle: "Feeding the Five Thousand",
    grid: { cols: 8, rows: 6 },
    ground: "grass",
    items: ["jesus_2fish_2bread","loaves_fish","crowd_eating_fish","jesus","dove","man","female","crowd_listening"],
    aiPreview: [ 'place("jesus_2fish_2bread", 2, 2)', 'place("crowd_eating_fish", 5, 3)', 'place("dove", 4, 0)' ],
    rungs: [
      { id:0, label:"1 · Jesus",     goalItem:"jesus_2fish_2bread", target:{col:2,row:2},
        goal:'Jesus holds two fish and five loaves: place("jesus_2fish_2bread", 2, 2).' },
      { id:1, label:"2 · The crowd", goalItem:"crowd_eating_fish", target:{col:5,row:3},
        goal:'A great crowd is fed: place("crowd_eating_fish", 5, 3).' },
      { id:2, label:"3 · A dove",    goalItem:"dove", target:{col:4,row:0},
        goal:'Send a dove over the crowd: place("dove", 4, 0).' },
    ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"🌿", n:5, rows:[4,5]}, extras:[{emoji:"✨", n:5, rows:[0,2]}], dove:true, shimmer:["jesus"], wander:["dove"] }
  },

  /* ---- Standalone scene: the sermon on the mount ---- */
  sermonMount: {
    id: "sermonMount",
    standalone: true,
    title: "The Sermon on the Mount",
    subtitle: "Blessed are...",
    grid: { cols: 8, rows: 6 },
    ground: "hill",
    items: ["jesus_teaching","crowd_listening","jesus","dove","man","female"],
    aiPreview: [ 'place("jesus_teaching", 2, 2)', 'place("crowd_listening", 5, 3)', 'place("dove", 4, 0)' ],
    rungs: [
      { id:0, label:"1 · The Teacher", goalItem:"jesus_teaching", target:{col:2,row:2},
        goal:'Jesus teaches on the hillside: place("jesus_teaching", 2, 2).' },
      { id:1, label:"2 · The crowd",   goalItem:"crowd_listening", target:{col:5,row:3},
        goal:'The crowd gathers to listen: place("crowd_listening", 5, 3).' },
      { id:2, label:"3 · A dove",      goalItem:"dove", target:{col:4,row:0},
        goal:'A dove settles over them: place("dove", 4, 0).' },
    ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"🌿", n:6, rows:[4,5]}, extras:[{emoji:"✨", n:4, rows:[0,2]}], dove:true, shimmer:[], wander:["dove"] }
  },

  /* ---- Standalone scene: the manger (where it all started) ---- */
  theManger: {
    id: "theManger",
    standalone: true,        // stays in the sandbox
    forCase: "jesus",        // …and is the reward of the Jesus case
    title: "The Manger Scene",
    subtitle: "Away in a Manger",
    grid: { cols: 8, rows: 6 },
    freeBuild: true,
    freeGoal: 'Build the manger scene! Start with place("manger") for the stable, then add baby Jesus, Mary, Joseph, an angel, and the animals wherever you like. Then bring it to life.',
    items: ["manger","baby_jesus","mary","joseph","angel","donkey","cow","sheep","baby_deer","dove","mouse","owl"],
    aiPreview: [ 'place("manger")', 'place("baby_jesus", 4, 3)', 'place("mary", 3, 3)', 'place("joseph", 5, 3)' ],
    rungs: [
      { id:0, label:"1 · The stable", goalItem:"manger",
        goal:'Set the stable: place("manger"). It fills the whole scene.' },
      { id:1, label:"2 · The baby",   goalItem:"baby_jesus", target:{col:4,row:3},
        goal:'Lay baby Jesus in the manger: place("baby_jesus", 4, 3).' },
      { id:2, label:"3 · Mary",       goalItem:"mary", target:{col:3,row:3},
        goal:'Add Mary beside him: place("mary", 3, 3). Then Joseph: place("joseph", 5, 3).' },
      { id:3, label:"4 · An angel",   goalItem:"angel", target:{col:4,row:0},
        goal:'Hang an angel above the stable: place("angel", 4, 0).' },
    ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"night", twinkle:12, grass:{emoji:"🌿", n:3, rows:[5,5]}, extras:[{emoji:"⭐", n:1, rows:[0,0]}], dove:true, shimmer:["baby_jesus","angel"], wander:["donkey","sheep","cow","baby_deer","dove","mouse"] }
  },

};

if (typeof window !== "undefined") {
  window.FOOTSTEPS_WORKSHOPS = { WORKSHOPS, WORKSHOP_ITEMS };
}
// ES modules:  export { WORKSHOPS, WORKSHOP_ITEMS };
// CommonJS:    module.exports = { WORKSHOPS, WORKSHOP_ITEMS };
