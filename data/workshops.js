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
  water:"🌊", staff:"🦯", moses:"🧔", light:"⚡", wheat:"🌾",
  // second poses of David and Moses — the same person at a different moment of
  // his story, so they are their own pieces rather than replacing the first art
  david_harp:"🎵", moses_tablets:"📜",
  // resurrection scene pieces
  boulder:"🪨", jesus:"🧍", king:"🤴",
  // nativity stand-ins (emoji until real art is added)
  cow:"🐄", noah:"🧔",
  // the magi and their camel (nativity)
  wisemen:"🧙",
  // garden of eden scene pieces
  tree:"🌳", serpent:"🐍", fruit:"🍎", leaves:"🍃", adam:"🧑", eve:"👩",
  forbidden_tree:"🌳", cherub:"👼",
  // Eden STORY poses — Adam & Eve at each moment of Genesis 2–3, so a kid can
  // build the whole arc: at peace with the animals, the temptation, the eating,
  // and the sorrowful leaving.
  adam_eve_lion:"🦁", eve_picking_forbiddenfruit:"🍎", eve_eating_fruit:"🍎",
  adam_eat_forbiddenfruit:"🍎", adam_eve_eating_fruit:"🍎", adam_eve_shame:"😔",
  // backdrop objects: placing one becomes the whole scene (manger already above)
  ark:"🚢", tomb:"⚰️", red_sea:"🌊", red_sea_split:"🌊",
  desert:"🏜️", garden_of_eden:"🌳", eden:"🌳",
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
    background: "desert",                            // the dry valley of Elah fills the scene
    freeGoal: 'Set up the showdown! The desert valley of Elah is already here. Place David — place("david", 1, 3) — and the giant Goliath, the two armies on the hills, plus horses and chariots. There is a quiet David too — place("david_harp") — the shepherd boy on his rock, before any of this. Then tap the 🦉 button to bring it to life.',
    items: ["david","david_harp","goliath","armies","horse","chariot","sheep","desert","dove"],
    aiPreview: [ 'place("david", 1, 3)', 'place("goliath", 6, 3)', 'place("armies", 3, 1)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: {
      sky: "day",
      twinkle: 0,
      grass: { emoji:"🌿", n:6, rows:[4,5] },
      extras: [ { emoji:"🪨", n:3, rows:[4,5] } ],   // five smooth stones in the brook
      dove: true,
      shimmer: ["david","david_harp"],   // david_harp never wanders — he is sitting on a rock
      wander: ["horse","sheep","david"]
    }
  },

  /* ---- Workshop for CASE 3 (Moses): light the desert road ---- */
  desertJourney: {
    id: "desertJourney",
    forCase: "moses",
    standalone: true,
    freeBuild: true,
    title: "Parting the Red Sea",
    subtitle: "The Long Road to Freedom",
    grid: { cols: 8, rows: 6 },
    ground: "sea",
    freeGoal: 'Part the Red Sea! Start with the sea — place("red_sea") — then place Moses and his staff. When you are ready for the miracle, place("red_sea_split") and the waters open. Now bring the whole nation through: place("crowd_listening") behind Moses and he is leading his people across the dry path. Put Pharaoh\'s chariots behind them. And for what came after the crossing, there is place("moses_tablets") — Moses down from the mountain with the ten commandments. Then tap the 🦉 button to bring it to life.',
    items: ["red_sea","red_sea_split","moses","moses_tablets","crowd_listening","staff","water","man","female","sheep","chariot","horse","dove"],
    aiPreview: [ 'place("red_sea")', 'place("moses", 0, 3)', 'place("red_sea_split")' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    // No scattered 🌊/🐟 here: the red_sea backdrops already paint the water, and emoji
    // on top of them just float in the sky.
    finale: { sky:"day", twinkle:0, grass:null, extras:[], dove:true, shimmer:["moses","staff","moses_tablets"], wander:["man","female","sheep","horse"] }
  },

  /* ---- Workshop for CASE 4 (Ruth): build the harvest home ---- */
  harvestField: {
    id: "harvestField",
    forCase: "ruth",
    standalone: true,
    freeBuild: true,
    title: "The Barley Field",
    subtitle: "The Faithful Heart",
    grid: { cols: 8, rows: 6 },
    ground: "grass",
    freeGoal: 'Build the barley harvest! Place Ruth gleaning grain — place("female", 2, 4) — Boaz the kind landowner, sheaves of wheat, an ox, and a home nearby. Then tap the 🦉 button to bring it to life.',
    items: ["female","man","wheat","ox","sheep","well","house","dove"],
    aiPreview: [ 'place("female", 2, 4)', 'place("man", 5, 3)', 'place("wheat", 3, 5)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"🌾", n:10, rows:[3,5]}, extras:[{emoji:"🌿",n:4,rows:[4,5]}], dove:true, shimmer:["female"], wander:["ox","sheep","female","man"] }
  },

  /* ---- Workshop for CASE 5 (Paul): carry the light ---- */
  carryTheLight: {
    id: "carryTheLight",
    forCase: "paul",
    standalone: true,
    freeBuild: true,
    title: "The Damascus Road",
    subtitle: "The Heart That Changed",
    grid: { cols: 8, rows: 6 },
    ground: "road",
    freeGoal: 'Set the road to Damascus! Place Saul traveling — place("man", 2, 4) — his companions and horse, and the blinding light from heaven above. Then tap the 🦉 button to bring it to life.',
    items: ["man","light","horse","palm","house","dove"],
    aiPreview: [ 'place("man", 2, 4)', 'place("light", 3, 0)', 'place("horse", 5, 4)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"🌿", n:4, rows:[4,5]}, extras:[{emoji:"⚡", n:4, rows:[0,2]}], dove:true, shimmer:["light","man"], wander:["horse","man"] }
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
    forCase: "tomb",
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
    freeBuild: true,
    forCase: "daniel",
    title: "Daniel in the Lions' Den",
    subtitle: "Shut the Lions' Mouths",
    grid: { cols: 8, rows: 6 },
    ground: "cave",
    freeGoal: "Build the lions' den! Place Daniel and the lions, add the king who came at dawn, an angel, and a dove of peace — arrange it however you like.",
    items: ["daniel_lion_den","lion","king","angel","man","dove"],
    aiPreview: [ 'place("daniel_lion_den", 3, 0)', 'place("king", 6, 4)', 'place("dove", 4, 0)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"🌿", n:4, rows:[4,5]}, extras:[{emoji:"✨", n:5, rows:[0,2]}], dove:true, shimmer:["angel"], wander:["dove","lion"] }
  },

  /* ---- Standalone scene: the loaves and fishes ---- */
  feeding5000: {
    id: "feeding5000",
    standalone: true,
    freeBuild: true,
    forCase: "loaves",
    title: "The Loaves and Fishes",
    subtitle: "Feeding the Five Thousand",
    grid: { cols: 8, rows: 6 },
    ground: "grass",
    freeGoal: "Feed the five thousand! Place Jesus with the loaves and fish, spread a great crowd across the hillside to share the meal, and send a dove overhead — build it however you like.",
    items: ["jesus_2fish_2bread","loaves_fish","crowd_eating_fish","jesus","dove","man","female","crowd_listening"],
    aiPreview: [ 'place("jesus_2fish_2bread", 2, 2)', 'place("crowd_eating_fish", 5, 3)', 'place("dove", 4, 0)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"🌿", n:5, rows:[4,5]}, extras:[{emoji:"✨", n:5, rows:[0,2]}], dove:true, shimmer:["jesus"], wander:["dove"] }
  },

  /* ---- Standalone scene: the garden of eden ---- */
  edenGarden: {
    id: "edenGarden",
    standalone: true,
    freeBuild: true,
    forCase: "eden",
    title: "The Garden of Eden",
    subtitle: "A very good garden",
    grid: { cols: 8, rows: 6 },
    ground: "garden",
    background: "garden_of_eden",                    // the lush garden fills the scene
    freeGoal: "Grow the good garden! It is already all around you. Place the one special tree — place(\"forbidden_tree\", 4, 1) — with the sly serpent waiting in its branches. Put Adam and Eve in the garden, at peace with the animals — try place(\"adam_eve_lion\", 3, 3). The whole story is here, one piece at a time: Eve reaching for the fruit, the quiet walk out of the garden — place(\"adam_eve_shame\") — and the angel who guards the way afterward, place(\"cherub\", 7, 1). Build any part you like, then tap the 🦉 button to bring it to life.",
    items: ["forbidden_tree","tree","fruit","serpent","adam","eve","adam_eve_lion","lion","sheep","deer","dove","leaves","eve_picking_forbiddenfruit","eve_eating_fruit","adam_eat_forbiddenfruit","adam_eve_eating_fruit","adam_eve_shame","cherub"],
    aiPreview: [ 'place("forbidden_tree", 4, 1)', 'place("adam", 2, 3)', 'place("eve", 6, 3)', 'place("serpent", 4, 2)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"🌿", n:4, rows:[4,5]}, extras:[{emoji:"🌸", n:5, rows:[3,4]},{emoji:"🦋", n:3, rows:[1,2]}], dove:true, shimmer:["forbidden_tree","fruit","cherub"], wander:["serpent","deer","dove"] }
  },

  /* ---- Standalone scene: the sermon on the mount ---- */
  sermonMount: {
    id: "sermonMount",
    standalone: true,
    freeBuild: true,
    forCase: "sermon",
    title: "The Sermon on the Mount",
    subtitle: "Blessed are...",
    grid: { cols: 8, rows: 6 },
    ground: "hill",
    freeGoal: "Gather the hillside crowd! Place Jesus teaching, spread the listening crowd across the slope, add people who came to hear, and let a dove settle overhead — build it however you like.",
    items: ["jesus_teaching","crowd_listening","jesus","dove","man","female"],
    aiPreview: [ 'place("jesus_teaching", 2, 2)', 'place("crowd_listening", 5, 3)', 'place("dove", 4, 0)' ],
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
    freeGoal: 'Build the manger scene! Start with place("manger") for the stable, then add baby Jesus, Mary, Joseph, an angel, and the animals wherever you like. The wise men came from far away following the star — add them with place("wisemen", 6, 4) and their camel. Then bring it to life.',
    items: ["manger","baby_jesus","mary","joseph","angel","wisemen","camel","donkey","cow","sheep","baby_deer","dove","mouse","owl"],
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
    finale: { sky:"night", twinkle:12, grass:{emoji:"🌿", n:3, rows:[5,5]}, extras:[{emoji:"⭐", n:1, rows:[0,0]}], dove:true, shimmer:["baby_jesus","angel"], wander:["donkey","sheep","cow","baby_deer","dove","mouse","camel"] }
  },

};

if (typeof window !== "undefined") {
  window.FOOTSTEPS_WORKSHOPS = { WORKSHOPS, WORKSHOP_ITEMS };
}
// ES modules:  export { WORKSHOPS, WORKSHOP_ITEMS };
// CommonJS:    module.exports = { WORKSHOPS, WORKSHOP_ITEMS };
