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
  fawn:"🦌", mouse:"🐭", snail:"🐌", butterfly:"🦋", squirrel:"🐿️",
  owl:"🦉", rainbow:"🌈",
  // figures for the iconic-scene rethemes
  david:"🧒", goliath:"🧌", mary:"🧕", joseph:"🧔", man:"🧑", female:"👩", baby:"👶",
  armies:"⚔️", chariot:"🛞", horse:"🐴",
  // the two armies of the valley of Elah + the smooth stones
  israelites:"🛡️", philistines:"⚔️", rocks:"🪨",
  water:"🌊", staff:"🦯", moses:"🧔", light:"⚡", wheat:"🌾",
  // Ruth's story: Ruth, Boaz, Naomi + the barley harvest props
  ruth:"👩", boaz:"🧔", naomi:"🧕", barley:"🌾", figtree:"🌳", jar:"🏺", landscape:"🏞️",
  // the road to Damascus: Saul struck down by the light, the risen Jesus appears
  saul:"🧑", road:"🛤️", saul_fallen:"🧎", damascus:"🏛️",
  // second poses of David and Moses — the same person at a different moment of
  // his story, so they are their own pieces rather than replacing the first art
  harp:"🎵", tablets:"📜",
  // resurrection scene pieces
  boulder:"🪨", jesus:"🧍", king:"🤴", daniel:"🧑",
  // Feeding the 5,000: disciples, the loaves & fish, baskets, scenery
  disciples:"🧑", fish:"🐟", bread:"🍞", basket:"🧺", bigtree:"🌳", rubble:"🪨",
  // nativity stand-ins (emoji until real art is added)
  cow:"🐄", noah:"🧔",
  // Noah's ark — animals two by two (each sprite is a pair), + Noah poses
  noah_openarms:"🧔", noahkneel:"🧎",
  bears:"🐻", bunnies:"🐰", camels:"🐪", ducks:"🦆", elephants:"🐘",
  giraffes:"🦒", lions:"🦁", parrots:"🦜", zebras:"🦓", lambs:"🐑", doves:"🕊️",
  // the magi and their camel (nativity)
  wisemen:"🧙",
  // garden of eden scene pieces
  tree:"🌳", serpent:"🐍", fruit:"🍎", leaves:"🍃", adam:"🧑", eve:"👩",
  appletree:"🌳", cherub:"👼", flowerbush:"🌷", plant:"🌱", rock:"🪨",
  // Eden STORY poses — Adam & Eve at each moment of Genesis 2–3, so a kid can
  // build the whole arc: at peace with the animals, the temptation, the eating,
  // and the sorrowful leaving.
  peace:"🦁", reach:"🍎", taste:"🍎",
  bite:"🍎", share:"🍎", leave:"😔",
  // backdrop objects: placing one becomes the whole scene (manger already above)
  ark:"🚢", tomb:"⚰️", sea:"🌊", split:"🌊",
  desert:"🏜️", eden:"🌳", valley:"🏞️",
  field:"🌾", sinai:"⛰️", mount:"⛰️",
  // larger illustrated images (loaded from assets/scenes/) usable as placeable
  // pieces too — scale them up with place(name, col, row, size) or the ＋ button
  crowd:"👥", feast:"🍽️",
  sermon:"🧎", teaching:"📖", healing:"🤝",
  fishbread:"🐟", loaves:"🍞", den:"🦁"
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
    background: "valley",                            // the valley of Elah with the stream
    freeGoal: 'Set up the showdown! The valley of Elah is already here. Place David the shepherd boy — place("david", 1, 3) — and the giant Goliath facing him. Line the two armies on the hills: the Israelites — place("israelites", 1, 1) — and the Philistines — place("philistines", 6, 1). Add David\'s sheep and scatter some smooth stones. There is a quiet David too — place("harp") — before any of this. Then tap the 🦉 button to bring it to life.',
    items: ["david","harp","goliath","israelites","philistines","sheep","rocks","horse","chariot","valley","dove"],
    aiPreview: [ 'place("david", 1, 3)', 'place("goliath", 6, 3)', 'place("israelites", 1, 1)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: {
      sky: "day",
      twinkle: 0,
      grass: { sprite:"rocks", n:5, rows:[4,5] },    // five smooth stones scattered in the brook
      extras: [],
      dove: true,
      shimmer: ["david","harp"],   // harp never wanders — he is sitting on a rock
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
    background: "sea",                               // the sea is already there, still closed
    freeGoal: 'Part the Red Sea! The sea is already here. Place Moses, staff raised. When you are ready for the miracle, place("split") and the waters open. Now bring the whole nation through: place("crowd") behind Moses and he is leading his people across the dry path. Put Pharaoh\'s chariots behind them. And for what came after the crossing, switch the scene to the mountain — place("sinai") — and add place("tablets"), Moses down from Sinai with the ten commandments. Then tap the 🦉 button to bring it to life.',
    items: ["sea","split","sinai","moses","tablets","crowd","man","female","sheep","chariot","horse","dove"],
    aiPreview: [ 'place("moses", 0, 3)', 'place("split")', 'place("crowd", 5, 3)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    // No scattered 🌊/🐟 here: the sea backdrops already paint the water, and emoji
    // on top of them just float in the sky.
    finale: { sky:"day", twinkle:0, grass:null, extras:[], dove:true, shimmer:["moses","tablets"], wander:["man","female","sheep","horse"] }
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
    background: "field",                       // the golden barley field at harvest
    freeGoal: 'Build the barley harvest! The golden field is already here. Place Ruth gleaning grain — place("ruth", 2, 4) — and Boaz the kind landowner — place("boaz", 5, 3). Bring Naomi, her faithful mother-in-law, too. Add sheaves of barley, a well, a house, a donkey, and a fig tree wherever you like. Then tap the 🦉 button to bring it to life.',
    items: ["ruth","boaz","naomi","barley","sheep","well","house","donkey","figtree","jar","landscape","dove"],
    aiPreview: [ 'place("ruth", 2, 4)', 'place("boaz", 5, 3)', 'place("barley", 3, 5)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:{sprite:"barley", n:6, rows:[3,5]}, extras:[{emoji:"🌿",n:4,rows:[4,5]}], dove:true, shimmer:["ruth"], wander:["sheep","donkey","ruth","boaz"] }
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
    background: "road",                     // the dusty road to Damascus
    freeGoal: 'Set the road to Damascus! The road is already here. Place Saul struck to the ground — place("saul_fallen", 2, 4) — with the light bursting from heaven above him — place("light", 3, 1). The risen Jesus appears — place("jesus", 5, 1). His horse waits nearby, and the city of Damascus lies ahead — place("damascus", 6, 1). Then tap the 🦉 button to bring it to life.',
    items: ["road","saul_fallen","light","jesus","damascus","horse","saul","palm","donkey","dove"],
    aiPreview: [ 'place("saul_fallen", 2, 4)', 'place("light", 3, 1)', 'place("jesus", 5, 1)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:null, extras:[{emoji:"✨", n:6, rows:[0,2]}], dove:true, shimmer:["jesus","saul_fallen","light"], wander:["horse","donkey"] }
  },

  /* ---- Standalone scene (no full case yet): Noah's Ark ---- */
  noahsArk: {
    id: "noahsArk",
    standalone: true,                              // stays in the free-play "Build a Scene" sandbox
    forCase: "noah",                               // …and unlocks as the reward of the Noah case
    title: "Fill the Ark",
    subtitle: "Two by Two",
    grid: { cols: 8, rows: 6 },
    background: "flood",                      // the flood waters fill the scene…
    structure: "ark",                         // …with the ark floating on top; animals board its deck
    freeBuild: true,
    freeGoal: 'Fill the ark! Start with Noah — place("noah", 3, 3) — then bring the animals aboard two by two. Each pair boards together: place("elephants", 1, 4), place("lions", 4, 4), place("giraffes", 6, 3). Add as many pairs as you like — bears, camels, zebras, ducks, bunnies, parrots, deer, lambs. The dove and raven will search for dry land — place("doves", 6, 1). Then tap the 🦉 button to bring it to life.',
    items: ["noah","noahkneel","noah_openarms","elephants","giraffes","lions","zebras","bears","camels","deer","lambs","bunnies","ducks","parrots","doves","rainbow","dove"],
    aiPreview: [ 'place("elephants", 1, 4)', 'place("giraffes", 5, 3)', 'place("doves", 6, 1)' ],
    rungs: [
      { id:0, label:"1 · First aboard", goalItem:"elephants", target:{col:1,row:4},
        goal:'Bring the first pair aboard — they come two by two: place("elephants", 1, 4).' },
      { id:1, label:"2 · The tall ones", goalItem:"giraffes", target:{col:5,row:3},
        goal:'Now the tall pair: place("giraffes", 5, 3).' },
      { id:2, label:"3 · The lions",    goalItem:"lions",    target:{col:3,row:4},
        goal:'The lions board together: place("lions", 3, 4).' },
      { id:3, label:"4 · Dove & raven", goalItem:"doves",    target:{col:6,row:1},
        goal:'The dove and raven will search for dry land: place("doves", 6, 1).' },
    ],
    practice: { enabled:true, prompt:"Fill the ark! I'll call out which pair goes where." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"💧", n:8, rows:[0,2]}, extras:[{sprite:"rainbow", n:1, rows:[0,0], ifAbsent:true}], dove:true, shimmer:["rainbow"], wander:["elephants","giraffes","lions","zebras","bears","camels","deer"] }
  },

  /* ---- Standalone scene: the empty tomb (roll the stone away) ---- */
  emptyTomb: {
    id: "emptyTomb",
    standalone: true,
    forCase: "tomb",
    title: "Roll the Stone Away",
    subtitle: "He is not here",
    grid: { cols: 8, rows: 6 },
    background: "eden",                               // the tomb was in a garden (John 19:41)
    items: ["tomb","boulder","jesus","angel","man","female","crowd","dove"],
    // the stone is on a track: it always sits at "home" (sealed) and rolls to "open"
    rail: { item:"boulder", home:{col:2,row:1}, open:{col:0,row:1} },
    aiPreview: [ 'place("tomb")', 'place("boulder", 2, 1)', 'move("boulder", "left")', 'place("jesus", 4, 3)' ],
    rungs: [
      { id:0, label:"1 · The tomb", goalItem:"tomb",
        goal:'The tomb was set in a garden. Place the tomb: place("tomb").' },
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
    background: "desert",                             // the den sits out in the desert
    freeGoal: "Build the lions' den! The desert is already here. Set the den — place(\"den\", 3, 0) — then place Daniel himself — place(\"daniel\", 2, 4) — add the lions, the king who came at dawn, an angel, and a dove of peace. Arrange it however you like.",
    items: ["desert","den","daniel","lion","king","angel","dove"],
    aiPreview: [ 'place("den", 3, 0)', 'place("daniel", 2, 4)', 'place("king", 6, 4)' ],
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
    background: "hillside",                           // the green hillside by the lake
    aliases: { jesus: "jesusfeed" },                 // this story's own Jesus
    freeGoal: "Feed the five thousand! The green hillside by the lake is already here. Place Jesus — place(\"jesus\", 4, 2) — and his disciples handing out the food. A boy brought five loaves and two fish — place(\"loaves\", 3, 3) and place(\"fish\", 5, 3). Spread the great crowd across the slope — place(\"crowd\", 2, 4) — and fill baskets with what is left over. Then tap the 🦉 button to bring it to life.",
    items: ["jesus","disciples","loaves","fish","bread","basket","crowd","bigtree","rubble","dove"],
    aiPreview: [ 'place("jesus", 4, 2)', 'place("loaves", 3, 3)', 'place("crowd", 2, 4)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:{emoji:"🌿", n:5, rows:[4,5]}, extras:[{emoji:"✨", n:5, rows:[0,2]}], dove:true, shimmer:["jesus"], wander:["dove","disciples"] }
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
    background: "eden",                    // the lush garden fills the scene
    freeGoal: "Grow the good garden! It is already all around you. Place the one special tree — place(\"appletree\", 4, 1) — with the sly serpent in its branches. Put Adam and Eve in the garden, and add flowering bushes and little plants wherever you like — place(\"flowerbush\", 2, 4). The angel who guards the way is here too — place(\"cherub\", 7, 1). Then tap the 🦉 button to bring it to life.",
    items: ["appletree","serpent","adam","eve","cherub","flowerbush","plant","rock","tree","lion","sheep","deer","dove","peace","reach","taste","bite","share","leave"],
    aiPreview: [ 'place("appletree", 4, 1)', 'place("adam", 2, 3)', 'place("eve", 6, 3)', 'place("serpent", 4, 2)' ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"day", twinkle:0, grass:{sprite:"plant", n:5, rows:[4,5]}, extras:[{sprite:"flowerbush", n:4, rows:[3,4]},{emoji:"🦋", n:3, rows:[1,2]}], dove:true, shimmer:["appletree","cherub"], wander:["serpent","deer","dove"] }
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
    background: "mount",                       // the mountainside over the lake
    freeGoal: "Gather the hillside crowd! The mountain over the lake is already here. Place Jesus teaching — place(\"teaching\", 2, 2) — spread the listening crowd across the slope, add people who came to hear, and let a dove settle overhead — build it however you like.",
    items: ["teaching","crowd","jesus","dove","man","female","mount"],
    aiPreview: [ 'place("mount")', 'place("teaching", 2, 2)', 'place("crowd", 5, 3)' ],
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
    background: "desert",                             // the stable stands in the desert
    freeGoal: 'Build the manger scene! The desert is already here — add the stable with place("manger"), and it stands right in the desert. Then add baby Jesus, Mary, Joseph, an angel, and the animals wherever you like. The shepherds came to see him — place("shepherd") — and the wise men followed the star from far away — place("star", 4, 0) and place("wisemen", 6, 4). Then bring it to life and watch night fall.',
    items: ["manger","desert","baby","mary","joseph","angel","shepherd","wisemen","star","camel","donkey","cow","sheep","fawn","dove","mouse","owl"],
    aiPreview: [ 'place("manger")', 'place("baby", 4, 3)', 'place("mary", 3, 3)', 'place("joseph", 5, 3)' ],
    rungs: [
      { id:0, label:"1 · The stable", goalItem:"manger",
        goal:'Set the stable: place("manger"). It fills the whole scene.' },
      { id:1, label:"2 · The baby",   goalItem:"baby", target:{col:4,row:3},
        goal:'Lay baby Jesus in the manger: place("baby", 4, 3).' },
      { id:2, label:"3 · Mary",       goalItem:"mary", target:{col:3,row:3},
        goal:'Add Mary beside him: place("mary", 3, 3). Then Joseph: place("joseph", 5, 3).' },
      { id:3, label:"4 · An angel",   goalItem:"angel", target:{col:4,row:0},
        goal:'Hang an angel above the stable: place("angel", 4, 0).' },
    ],
    practice: { enabled:true, prompt:"I'll call out where each piece goes." },
    finale: { sky:"night", twinkle:12, grass:{emoji:"🌿", n:3, rows:[5,5]}, extras:[{emoji:"⭐", n:1, rows:[0,0]}], dove:true, shimmer:["baby","angel"], wander:["donkey","sheep","cow","fawn","dove","mouse","camel"] }
  },

};

if (typeof window !== "undefined") {
  window.FOOTSTEPS_WORKSHOPS = { WORKSHOPS, WORKSHOP_ITEMS };
}
// ES modules:  export { WORKSHOPS, WORKSHOP_ITEMS };
// CommonJS:    module.exports = { WORKSHOPS, WORKSHOP_ITEMS };
