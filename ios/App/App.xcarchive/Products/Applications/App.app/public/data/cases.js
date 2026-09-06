/* =====================================================================
   FOOTSTEPS OF THE TEACHER — ALL CASES (unified content file)
   ---------------------------------------------------------------------
   Five complete adventures in ONE schema. The engine renders these;
   content never touches engine logic. Add future cases by appending
   another object to the CASES registry at the bottom.

   SCHEMA (every case):
     {
       id, title, theme,
       badges: { key: {icon, name, desc}, ... },   // themed per case
       detours: [ {place, scene, lesson}, ... ],    // gentle wrong-turn scenes
       stops: [
         { place, tag, eli,
           spots: [ {ico, label, lead, clue}, ... ],   // 2–3 investigate spots
           ask, options:[...], answer:<index>, hint,
           sidequest: {title, desc, lesson, badge} | null },
         ...
         { place, tag, eli, final:true, teaching }      // reflection stop
       ]
     }

   RULES honored across all cases:
   - All scripture paraphrased (NO verbatim quotes).
   - Wisdom is a reward track (earned by investigating fully, solving without
     hints, side quests, enduring detours) — never a currency that gates progress.
   - Wrong answers route to a gentle detour (no lost progress).
   - Side quests optional.
   - Eli carries a flaw the theme cures, and grows from first stop to last.
   ===================================================================== */


/* =====================================================================
   CASE 1 — JESUS (early life) · "The Long-Awaited One"
   Theme: Patience & Trust.  Eli's flaw: wants to rush / skip ahead.
   Map: Nazareth → Bethlehem → Egypt → Nazareth (home)
   ===================================================================== */
const CASE_JESUS = {
  id: "jesus",
  title: "The Long-Awaited One",
  theme: "Patience & Trust",
  badges: {
    firstSteps: { icon:"👣",  name:"First Steps",     desc:"Began the journey" },
    patient:    { icon:"🕊️", name:"Patient Pilgrim",  desc:"Solved a stop with no hints" },
    thorough:   { icon:"🔍",  name:"Careful Seeker",   desc:"Investigated every spot at a location" },
    endured:    { icon:"🏜️", name:"Endured the Wild", desc:"Got through a detour gracefully" },
    helper:     { icon:"🤝",  name:"Kind Helper",      desc:"Completed a side quest" },
    finisher:   { icon:"✨",  name:"Trail Complete",   desc:"Finished the whole case" },
  },
  detours: [
    { place:"A Wrong Road",
      scene:"The path leads nowhere you meant to go. The sun climbs; the way is long and dry. Eli groans — but you keep walking, and you don't give up.",
      lesson:"Sometimes we take the long way. It isn't wasted if we keep trusting and keep going. You turn back, a little wiser." },
    { place:"Forty Days of Waiting",
      scene:"You wander into a quiet wilderness. There's nothing to do here but wait — and waiting is hard. Still, you rest, you breathe, and you remember why you set out.",
      lesson:"Even the Teacher spent long, patient days in the wild before his work began. Waiting can make us stronger. You find your way back to the trail." },
  ],
  // Multiple independent investigations that all converge on Bethlehem. startCase()
  // picks one at RANDOM each time the case is opened (no dice — silent), so players
  // follow different witnesses/prophecies to the same manger and never feel they're
  // repeating a level. The home card shows the generic case title; the chosen trail's
  // own title appears only once play begins.
  variants: [
   { title:"The Long-Awaited One", stops: [
    { place:"Nazareth", tag:"A quiet hill town in Galilee",
      eli:"A special baby is coming?! Can we skip ahead and meet him <b>now</b>?",
      spots:[
        { ico:"🏠", label:"Visit the carpenter's home", lead:"A young woman here was told she'd be part of an old promise.",
          clue:"She didn't demand to understand it all at once — she trusted, and waited." },
        { ico:"📜", label:"Read the old scroll", lead:"For hundreds of years people hoped for a promised Teacher.",
          clue:"The promise pointed to a small town in Judah — the shepherd-king's own town." },
        { ico:"🌿", label:"Talk by the olive trees", lead:"An elder smiles at your hurry.",
          clue:"'The ones who wait well,' she says, 'are the ones who see the most.'" },
      ],
      ask:"Where does the promise say the child will be born?",
      options:["Jerusalem, the capital","Bethlehem, the shepherd-king's town","Jericho, the oldest city"],
      answer:1,
      hint:"Look again at the scroll's clue — it names the town of the shepherd-king (King David).",
      sidequest:{ title:"Help carry water", desc:"An older neighbor struggles with a heavy jar. Stop and help?",
        lesson:"You slow down to help. It costs you a moment — and Eli notices that helping others rarely fits our schedule, yet always matters.", badge:"helper" } },

    { place:"Bethlehem", tag:"The town of David, in Judea",
      eli:"We made it — but it's packed and there's nowhere to stay. I'd have planned this <b>way</b> better.",
      spots:[
        { ico:"⭐", label:"Follow the bright star", lead:"A light has settled over a humble shelter.",
          clue:"The awaited child arrived not in a palace, but among animals and simple folk." },
        { ico:"🐑", label:"Ask the shepherds", lead:"Shepherds were the first to be told.",
          clue:"The ones who slowed down to look were the first to find him." },
        { ico:"👑", label:"Listen at the gate", lead:"Travelers whisper of a fearful king nearby.",
          clue:"Danger is coming — the family must flee south, toward the land of the great river." },
      ],
      ask:"Where must the family flee to stay safe?",
      options:["Egypt, across the desert","Rome, to the emperor","Samaria, to the north"],
      answer:0,
      hint:"The gate clue says flee SOUTH to the land of the great river — think of the old story of slavery and rescue.",
      sidequest:null },

    { place:"Egypt", tag:"Safe across the desert",
      eli:"We ran all this way and now we just... wait <b>again</b>? Ugh.",
      spots:[
        { ico:"🌾", label:"Rest by the river", lead:"The family settles, far from danger.",
          clue:"They stay only as long as needed — not rushing back into danger." },
        { ico:"🌟", label:"Wait for the sign", lead:"They trust they'll know when it's time.",
          clue:"When the danger passes, they'll return home — not to Bethlehem, but where they began." },
      ],
      ask:"Where does the family finally settle to raise the child?",
      options:["Back to Bethlehem","Nazareth, their home town","Capernaum by the sea"],
      answer:1,
      hint:"The clue says 'where they began' — the very first town in this journey.",
      sidequest:null },

    { place:"Nazareth", tag:"Home again — the growing years",
      eli:"Wait, we're back where we started... but I feel different. I think I finally get it.",
      final:true,
      teaching:"He grew here for many quiet years — learning, helping, waiting for the right time. The most important person in the whole story spent most of it being patient. That was the lesson all along." },
   ] },

   { title:"The Shepherd's Trail", stops: [
    { place:"Jerusalem", tag:"The busy holy city",
      eli:"Angels?! A whole SKY full of them? Where — I want to see them right now!",
      spots:[
        { ico:"🛕", label:"Listen at the temple courts", lead:"Worshipers are buzzing with a strange report.",
          clue:"A priest says shepherds rushed in at dawn claiming they saw a sky full of angels." },
        { ico:"🧺", label:"Ask the market traders", lead:"Traders from the countryside nod knowingly.",
          clue:"Those shepherds came from the fields just outside Bethlehem." },
      ],
      ask:"Where did the shepherds come from?",
      options:["The docks of Joppa","The gardens of Jericho","The fields near Bethlehem"],
      answer:2,
      hint:"The traders say the shepherds came from the fields just outside Bethlehem.",
      sidequest:{ title:"Comfort a frightened child", desc:"The crowd's excitement has scared a little one. Kneel and reassure them before rushing on?",
        lesson:"You stop to comfort the child. Eli's in a hurry — but sees that news of a Savior is good news precisely because it reaches even the small and the scared.", badge:"helper" } },

    { place:"The Shepherd Fields", tag:"Open pastures outside Bethlehem",
      eli:"Okay, okay — tell me EVERYTHING. What exactly did the angel say?",
      spots:[
        { ico:"🐑", label:"Hear the shepherds' story", lead:"The shepherds are still wide-eyed with wonder.",
          clue:"The angel told them: today in the City of David a Savior has been born." },
        { ico:"✨", label:"Look where they point", lead:"One shepherd points back toward the town.",
          clue:"The sign they were given: a baby wrapped in cloths, lying in a manger." },
      ],
      ask:"What sign did the angel say the shepherds would find?",
      options:["A crown upon a throne","A baby lying in a manger","A star fallen in a well"],
      answer:1,
      hint:"The angel's sign was a newborn wrapped in swaddling cloths, lying in a manger.",
      sidequest:null },

    { place:"Bethlehem", tag:"The crowded little town",
      eli:"They ran through the whole town searching? Which way — let's follow them!",
      spots:[
        { ico:"🏠", label:"Ask the townsfolk", lead:"Residents remember the shepherds well.",
          clue:"They hurried door to door, asking everyone about a newborn baby." },
        { ico:"👵", label:"Talk with an elderly woman", lead:"She smiles at the memory.",
          clue:"They finally stopped at the stable behind the crowded inn." },
      ],
      ask:"Where did the shepherds' search finally end?",
      options:["The stable behind the inn","The gate of the city","The house of the mayor"],
      answer:0,
      hint:"The elderly woman says they stopped at the stable behind the crowded inn.",
      sidequest:null },

    { place:"The Manger", tag:"A stable in Bethlehem",
      eli:"The ordinary, overlooked shepherds were the very first ones here. I did NOT expect that.",
      final:true,
      teaching:"The first to worship the newborn King weren't kings or priests — they were shepherds working the night shift in the fields. God shared the greatest news of all with the humble and the ordinary first. The lowest were the first to kneel." },
   ] },

   { title:"Following the Star", stops: [
    { place:"The East", tag:"A far-off land of star-watchers",
      eli:"A brand-new star? Let's chase it RIGHT now — come on!",
      spots:[
        { ico:"🔭", label:"Study with the astronomers", lead:"Wise men (Magi) pore over the night sky.",
          clue:"An unusual new star has risen — they believe it announces the birth of a king." },
        { ico:"📜", label:"Search the ancient writings", lead:"A Magi carefully unrolls a foreign scroll.",
          clue:"The old writings point them toward one land: Israel." },
      ],
      ask:"To which land do the wise men set out?",
      options:["Egypt","Israel","Greece"],
      answer:1,
      hint:"The scrolls the Magi study point them toward the land of Israel.",
      sidequest:{ title:"Share your provisions", desc:"The road west is long, and a poorer traveler has run short of food. Share some of yours?",
        lesson:"You share your bread on the road. Eli wanted to press on faster — but learns a journey toward the King is better walked with open hands.", badge:"helper" } },

    { place:"Jerusalem", tag:"The royal city",
      eli:"Just ask the king where the baby is — that's easy, right?",
      spots:[
        { ico:"👑", label:"Visit King Herod's court", lead:"The Magi ask plainly where the one born King of the Jews can be found.",
          clue:"Herod is troubled by the question — and secretly summons the priests and scribes." },
        { ico:"📖", label:"Listen to the priests", lead:"The scholars search the words of the prophets.",
          clue:"The prophet Micah named the birthplace long ago: Bethlehem." },
      ],
      ask:"Which town did the prophet Micah name as the birthplace?",
      options:["Nazareth","Bethany","Bethlehem"],
      answer:2,
      hint:"The priests quote the prophet Micah — the ruler will come from Bethlehem.",
      sidequest:null },

    { place:"Bethlehem", tag:"The little town, at last",
      eli:"The star's moving again — look, it's stopping right over... there!",
      spots:[
        { ico:"⭐", label:"Follow the star", lead:"The star goes on ahead of the Magi and halts.",
          clue:"It stops directly over the place where the child is." },
        { ico:"🎁", label:"Ready the treasures", lead:"The wise men open their travel chests.",
          clue:"Gifts fit for a king: gold, frankincense, and myrrh." },
      ],
      ask:"What does the star finally do?",
      options:["Stops over the child's place","Falls into the sea","Splits into three"],
      answer:0,
      hint:"The star goes ahead of them and stops over the very place where the child is.",
      sidequest:null },

    { place:"The Manger", tag:"A stable in Bethlehem",
      eli:"We followed a light across the whole world... and it led us to him. Worth every single mile.",
      final:true,
      teaching:"The wise men traveled for months, following a star across deserts and kingdoms, just to kneel before a child and offer their finest treasures — gold, frankincense, and myrrh. The newborn King is worth any journey, and worthy of our very best." },
   ] },

   { title:"The Prophecy Hunt", stops: [
    { place:"The Temple Library", tag:"Halls of ancient scrolls in Jerusalem",
      eli:"Dusty old scrolls? Can't we just skip ahead and find the baby already?",
      spots:[
        { ico:"📜", label:"Meet the scroll keeper", lead:"An old scribe presses a scroll into your hands.",
          clue:"He says only: find the child spoken of by the prophets." },
        { ico:"📖", label:"Read Isaiah's scroll", lead:"You unroll the words of the prophet Isaiah.",
          clue:"'A virgin shall conceive and bear a son.' A margin note names a young woman in Nazareth." },
      ],
      ask:"Where does Isaiah's clue send you first?",
      options:["Bethlehem","Nazareth","Jericho"],
      answer:1,
      hint:"The margin note beside Isaiah's words points to a young woman in Nazareth.",
      sidequest:{ title:"Reshelve the fallen scrolls", desc:"A shelf of ancient scrolls has toppled. Take a moment to set them right?",
        lesson:"You carefully restore the scrolls. Eli wanted to rush off — but sees that these old promises were kept safe by patient hands for hundreds of years.", badge:"helper" } },

    { place:"Nazareth", tag:"A quiet hill town in Galilee",
      eli:"So the scroll was right! Let's find out where they went next!",
      spots:[
        { ico:"🏠", label:"Speak with Mary", lead:"Mary remembers the angel's visit clearly.",
          clue:"'The Lord has done exactly as He promised,' she says." },
        { ico:"🪚", label:"Ask Joseph the carpenter", lead:"Joseph is packing for a journey.",
          clue:"'The census calls us to Bethlehem,' he says." },
      ],
      ask:"Where does the census send Mary and Joseph next?",
      options:["Capernaum","Egypt","Bethlehem"],
      answer:2,
      hint:"Joseph says the census calls the family to Bethlehem.",
      sidequest:null },

    { place:"Bethlehem", tag:"The town of the prophecy",
      eli:"Another scroll here too? Okay — what does THIS one say?",
      spots:[
        { ico:"📜", label:"Find the scroll of Micah", lead:"A second prophecy waits in Bethlehem.",
          clue:"'But you, Bethlehem... from you shall come a ruler.'" },
        { ico:"🏘️", label:"Ask the residents", lead:"Neighbors share fresh news from the night before.",
          clue:"A child has just been born here — sheltered in a stable." },
      ],
      ask:"Which prophet foretold that the ruler would come from Bethlehem?",
      options:["Jonah","Micah","Daniel"],
      answer:1,
      hint:"The scroll found in Bethlehem quotes the prophet Micah.",
      sidequest:null },

    { place:"The Manger", tag:"A stable in Bethlehem",
      eli:"Every clue, every prophecy, written hundreds of years apart... all pointing to this one child. Wow.",
      final:true,
      teaching:"Prophets foretold this child hundreds of years before his birth — his mother, his town, his family line. Every ancient clue pointed to the same manger in Bethlehem. God kept every promise, down to the smallest detail. The long wait was never uncertain — it was always leading here." },
   ] },
  ]
};
// default stops for the home-screen card (stop count) and as a safe fallback
CASE_JESUS.stops = CASE_JESUS.variants[0].stops;


/* =====================================================================
   CASE 2 — DAVID · "The Shepherd Who Became King"
   Theme: Courage & Humility.  Eli's flaw: wants to be the big hero.
   Map: Bethlehem → Valley of Elah → Saul's Court → The Wilderness → Jerusalem
   ===================================================================== */
const CASE_DAVID = {
  id: "david",
  title: "The Shepherd Who Became King",
  theme: "Courage & Humility",
  badges: {
    firstSteps: { icon:"👣", name:"First Steps",         desc:"Began the journey" },
    brave:      { icon:"🦁", name:"Brave Heart",          desc:"Solved a stop with no hints" },
    thorough:   { icon:"🔍", name:"Careful Seeker",       desc:"Investigated every spot at a location" },
    restraint:  { icon:"🕊️", name:"Gentle Strength",      desc:"Chose the humble path in a detour" },
    helper:     { icon:"🤝", name:"Faithful Friend",      desc:"Completed a side quest" },
    crowned:    { icon:"👑", name:"Crowned in Time",      desc:"Finished the whole case" },
  },
  detours: [
    { place:"The Prideful Path",
      scene:"Eli grabs for glory — rushing ahead to look strong and important. It goes badly, and the crowd's cheers fade fast. Strength shown off is soon forgotten.",
      lesson:"Trying to look like the hero isn't the same as being one. You step back, humbled, and remember why you set out." },
    { place:"The Hasty Choice",
      scene:"You reach for the quick win, the shortcut to power. But grabbing what isn't yours yet only leads down a dead end. Some things must be waited for.",
      lesson:"The patient, honest road is longer — but it's the one that lasts. You find your way back to the trail." },
  ],
  // Four investigation trails converging on David's rise (see startCase for the random pick).
  variants: [
   { title:"The Shepherd Who Became King", stops: [
    { place:"Bethlehem", tag:"The fields where a shepherd boy tends sheep",
      eli:"If I were the youngest of eight brothers, I'd want to prove I'm the <b>best</b>. Bet David felt that too!",
      spots:[
        { ico:"🐑", label:"Watch him with the sheep", lead:"The youngest son, left in the fields while his brothers are called first.",
          clue:"He guards the flock faithfully when no one is watching — courage no one sees yet." },
        { ico:"🫙", label:"Look at the horn of oil", lead:"A prophet named Samuel comes looking, not for the tallest or strongest.",
          clue:"He passes over the big, impressive brothers — the chosen one is the overlooked shepherd." },
        { ico:"🎶", label:"Listen to his harp", lead:"David plays music to calm a troubled king.",
          clue:"His gift takes him next to the royal camp — toward where two armies face off in a valley." },
      ],
      ask:"Where does David go next, carrying food to his brothers?",
      options:["The Valley of Elah, where the armies meet","Egypt, to trade","Jerusalem, to be crowned"],
      answer:0,
      hint:"The harp clue points to a valley where two armies face off — that's the Valley of Elah, where a giant is taunting Israel.",
      sidequest:{ title:"Carry bread to the brothers", desc:"David's father asks him to bring food to his older brothers at the camp. Go quietly and serve?",
        lesson:"He doesn't complain about the errand. Eli learns that great people still do small, humble jobs — and often that's exactly how they end up in the right place at the right time.", badge:"helper" } },

    { place:"Valley of Elah", tag:"Where a giant challenges an army",
      eli:"A GIANT?! Everybody's scared. This is David's big chance to look awesome in front of everyone!",
      spots:[
        { ico:"🗻", label:"See the giant Goliath", lead:"A huge warrior taunts Israel's army, and every soldier is afraid.",
          clue:"The problem looks far too big — but David asks why everyone is trusting in size instead of God." },
        { ico:"🛡️", label:"Try on the king's armor", lead:"King Saul offers his own heavy armor.",
          clue:"David sets it aside — he won't pretend to be someone he isn't. He'll face this as himself." },
        { ico:"🪨", label:"Gather stones from the brook", lead:"Five smooth stones and a simple sling.",
          clue:"His courage isn't in weapons — it's in trusting the God who helped him protect the sheep." },
      ],
      ask:"How does David choose to face Goliath?",
      options:["In the king's heavy armor, to look strong","As himself, with a sling and trust","He waits for the soldiers to do it"],
      answer:1,
      hint:"The armor clue is key — David won't pretend to be someone he isn't. He faces the giant as himself.",
      sidequest:null },

    { place:"Saul's Court", tag:"The palace — where jealousy grows",
      eli:"Now David's famous! Everyone loves him! ...Wait, why does the king look so angry?",
      spots:[
        { ico:"🎻", label:"Play music for the king", lead:"David serves faithfully, even as King Saul grows jealous of him.",
          clue:"Doing right doesn't always make life easy — sometimes it makes powerful people jealous." },
        { ico:"🗡️", label:"Notice the king's spear", lead:"Saul, consumed by envy, turns on the young hero.",
          clue:"David must flee for his life — out to the caves and hills of the wilderness." },
        { ico:"🤝", label:"Meet Jonathan, the king's son", lead:"The prince becomes David's loyal friend and protects him.",
          clue:"True friends help us do the right thing — Jonathan helps David escape to the wild lands." },
      ],
      ask:"Where does David flee to escape Saul's anger?",
      options:["The wilderness caves","Back to Bethlehem's fields","Across the sea"],
      answer:0,
      hint:"The spear clue says it plainly — David flees to the caves and hills of the wilderness.",
      sidequest:null },

    { place:"The Wilderness", tag:"Hiding in the caves — the hardest test",
      eli:"Okay, David's hiding in a cave and the king who wants him GONE just walked in alone. Get him! This is his chance!",
      spots:[
        { ico:"🕳️", label:"See Saul enter the cave", lead:"The very king hunting David wanders in, defenseless, not knowing David is there.",
          clue:"David could end it all right now. Everyone would say he had the right." },
        { ico:"✂️", label:"Cut only the robe", lead:"Instead of harming Saul, David quietly cuts a corner of his robe — and even that grieves him.",
          clue:"Real strength is having the power to strike, and choosing mercy instead." },
        { ico:"⏳", label:"Choose to wait", lead:"David refuses to grab the crown by force.",
          clue:"He will wait for the right time, God's time — not seize power his own way." },
      ],
      ask:"What does David do when he could destroy his enemy?",
      options:["Strikes him down to take the throne","Spares him and waits for the right time","Runs away and gives up"],
      answer:1,
      hint:"The robe and 'choose to wait' clues point the same way: real strength is having power and choosing mercy.",
      sidequest:{ title:"Show yourself honestly", desc:"David could stay hidden. Instead he calls out to Saul afterward to show he meant no harm. Speak the truth openly?",
        lesson:"David proves his heart by being honest even with someone who wants to hurt him. Eli sees that humility isn't weakness — it takes more courage than fighting.", badge:"restraint" } },

    { place:"Jerusalem", tag:"Crowned at last — in the right time",
      eli:"He finally becomes king! And he did it the hard way — the patient, honest way. I think that's braver than the giant, honestly.",
      final:true,
      teaching:"David faced a giant with courage — but his greatest strength was refusing to seize the crown by force, and sparing the king who hunted him. He waited, stayed humble, and trusted God's timing. Courage got him to the battle; humility made him worthy of the throne." },
   ] },

   { title:"The Prophet's Secret Errand", stops: [
    { place:"Ramah", tag:"Where the old prophet Samuel grieves",
      eli:"A brand-new king? I'd send for the biggest, strongest, most impressive man in the land. Obvious pick.",
      spots:[
        { ico:"🕯️", label:"Sit with Samuel", lead:"The prophet Samuel is still grieving that King Saul turned away from God.",
          clue:"God tells him to stop grieving — fill your horn with oil, for a new king has been chosen." },
        { ico:"📜", label:"Read God's instructions", lead:"God gives Samuel a secret errand.",
          clue:"Go to Bethlehem, to the house of a man named Jesse — the new king is one of his sons." },
      ],
      ask:"Where does God send Samuel to find the new king?",
      options:["The palace in Gibeah","Jesse's house in Bethlehem","The army camp"],
      answer:1,
      hint:"God's instructions name Bethlehem, and the house of Jesse.",
      sidequest:{ title:"Steady a nervous traveler", desc:"Samuel fears King Saul will hear of this secret errand. Walk with him and calm his fears?",
        lesson:"You keep the worried prophet company on a risky road. Eli sees that quiet courage often walks beside someone who's scared.", badge:"helper" } },

    { place:"Jesse's House", tag:"Seven sons pass by, one at a time",
      eli:"The oldest brother is tall and handsome — THAT'S the king, surely. Let's crown him and go!",
      spots:[
        { ico:"💪", label:"Watch the eldest sons", lead:"Jesse's tall, strong older sons pass before Samuel one by one.",
          clue:"Samuel is impressed by the first — but God says no to him, and to the next, and the next." },
        { ico:"❤️", label:"Hear what God says", lead:"God explains why he keeps saying no.",
          clue:"People look at the outside — height and looks — but God looks at the heart." },
      ],
      ask:"Why does God turn down the tall, impressive older brothers?",
      options:["They were too old","God looks at the heart, not the outside","They didn't want the job"],
      answer:1,
      hint:"God tells Samuel that people judge by looks, but God judges by the heart.",
      sidequest:null },

    { place:"The Sheep Fields", tag:"The one no one thought to call",
      eli:"There's ANOTHER son? Out with the sheep? Nobody even invited him inside...",
      spots:[
        { ico:"🐏", label:"Ask about the youngest", lead:"Samuel asks Jesse if he has any more sons.",
          clue:"The youngest, David, wasn't even called in — he's out watching the sheep." },
        { ico:"🫒", label:"See the anointing", lead:"They send for David, and God speaks.",
          clue:"'Rise and anoint him — this is the one.' Samuel pours the oil over the shepherd boy." },
      ],
      ask:"Where was David while the others were being considered?",
      options:["Out tending the sheep","Asleep in the house","Away at war"],
      answer:0,
      hint:"David, the youngest, was overlooked — out in the fields tending the sheep.",
      sidequest:null },

    { place:"The Least, Chosen", tag:"God's surprising pick",
      eli:"The youngest, smallest, forgotten shepherd — HE'S the king God wanted. I keep sizing people up wrong, don't I?",
      final:true,
      teaching:"When God chose Israel's greatest king, he passed over the tall, strong, impressive brothers and chose David — the youngest, left out in the fields with the sheep. God doesn't measure people the way we do. He looks past height and looks and reputation, straight to the heart. The humble and overlooked are exactly the ones he loves to lift up." },
   ] },

   { title:"Forty Days of Fear", stops: [
    { place:"The Valley of Elah", tag:"Two armies, frozen on the hills",
      eli:"There's a REWARD for beating the giant? I'd be first in line — think of the glory!",
      spots:[
        { ico:"⛰️", label:"Survey the two camps", lead:"Israel's army and the Philistine army face off across a valley.",
          clue:"No one dares fight. A giant named Goliath, over nine feet tall in bronze armor, steps out." },
        { ico:"📣", label:"Count the challenges", lead:"The giant bellows the same dare, morning and evening.",
          clue:"For forty days he taunts Israel — 'Send me a man to fight!' — and every soldier trembles." },
      ],
      ask:"How long has Goliath been taunting Israel's army?",
      options:["Three days","Forty days","A single morning"],
      answer:1,
      hint:"The clue counts the challenges — forty days, morning and evening.",
      sidequest:{ title:"Cheer a fearful soldier", desc:"A young soldier is shaking with fear in the ranks. Stop and encourage him?",
        lesson:"You steady a frightened soldier instead of pushing past. Eli learns courage can be shared — it grows when we lift each other.", badge:"helper" } },

    { place:"King Saul's Tent", tag:"A king as afraid as his men",
      eli:"Even the KING won't fight? He's the tallest man in Israel! Okay — what's the deal here?",
      spots:[
        { ico:"👑", label:"Listen at the king's tent", lead:"King Saul and all his soldiers are terrified of the giant.",
          clue:"Saul offers a huge reward to anyone who defeats Goliath: riches, his daughter, and freedom from taxes." },
        { ico:"😰", label:"Feel the fear in camp", lead:"Day after day, no one steps forward.",
          clue:"The bigger the reward grows, the clearer it is — everyone is simply too afraid." },
      ],
      ask:"What does King Saul offer to whoever defeats Goliath?",
      options:["A great reward and his daughter","A new suit of armor","A quiet farm"],
      answer:0,
      hint:"Saul promises riches, his daughter in marriage, and a tax-free family.",
      sidequest:null },

    { place:"The Supply Road", tag:"An unexpected volunteer arrives",
      eli:"A shepherd kid showed up with lunch for his brothers — and HE'S the one upset that no one will fight?",
      spots:[
        { ico:"🧀", label:"Follow the errand boy", lead:"Jesse sends young David with bread and cheese for his soldier brothers.",
          clue:"David arrives just as Goliath roars his daily taunt." },
        { ico:"🔥", label:"Hear David's heart", lead:"David is stunned that no one will stand up.",
          clue:"He isn't after the reward — he's upset the giant dares to defy the living God. David volunteers." },
      ],
      ask:"Who finally steps forward to face the giant?",
      options:["A veteran captain","David, the shepherd boy","The king himself"],
      answer:1,
      hint:"It's David — the young shepherd who came with food — who volunteers.",
      sidequest:null },

    { place:"One Boy Steps Forward", tag:"Courage where everyone else froze",
      eli:"Everyone bigger and stronger was frozen with fear — and the shepherd boy stepped up. Not for the prize. For God.",
      final:true,
      teaching:"For forty days a whole army, and even their tall king, stood frozen in fear. Then a shepherd boy — too young to be a soldier, there only to bring lunch — stepped forward. He wasn't chasing the reward; he simply couldn't stand to see the giant mock God while everyone else trembled. Courage isn't the absence of fear. It's caring about the right thing enough to step forward when everyone else steps back." },
   ] },

   { title:"Not by Sword or Spear", stops: [
    { place:"The King's Armor", tag:"Borrowed strength that doesn't fit",
      eli:"If I'm fighting a giant, give me the biggest sword and the heaviest armor in the kingdom!",
      spots:[
        { ico:"🛡️", label:"Try on Saul's armor", lead:"King Saul dresses David in his own royal armor and helmet.",
          clue:"It's far too big and heavy — David can barely walk in it." },
        { ico:"🚶", label:"Watch David decide", lead:"David takes it all off again.",
          clue:"He won't fight in borrowed strength he can't use — he'll go as himself, trusting God." },
      ],
      ask:"Why does David take off the king's armor?",
      options:["It was too big and he couldn't move","It was the wrong color","He wanted a shield instead"],
      answer:0,
      hint:"The armor was too big and heavy — David couldn't fight in it, so he went as himself.",
      sidequest:{ title:"Return a borrowed thing", desc:"Someone pressed a fancy tool on you that isn't yours to use. Kindly give it back and use what you know?",
        lesson:"You hand back what wasn't yours and trust what you've been given. Eli learns real strength is being honestly yourself, not pretending to be bigger.", badge:"helper" } },

    { place:"The Brook", tag:"Small stones and a steady heart",
      eli:"Just a sling and some pebbles? Against a NINE-FOOT giant? This can't possibly work...",
      spots:[
        { ico:"🪨", label:"Gather at the stream", lead:"David picks five smooth stones from the brook and takes his shepherd's sling.",
          clue:"The same sling he used to guard his sheep from lions and bears is all he brings." },
        { ico:"🗣️", label:"Hear David answer the giant", lead:"Goliath laughs and mocks the boy.",
          clue:"David answers that he comes not with sword and spear, but in the name of the Lord — the battle is God's." },
      ],
      ask:"What does David bring to face Goliath?",
      options:["A sling and a smooth stone","A borrowed sword","A war horse"],
      answer:0,
      hint:"David chooses his shepherd's sling and smooth stones — and his trust in God.",
      sidequest:null },

    { place:"The Clash", tag:"The giant falls",
      eli:"Okay... he's actually running AT the giant. Here it goes!",
      spots:[
        { ico:"🏃", label:"Watch David charge", lead:"David runs quickly toward the battle line.",
          clue:"He slings a single stone — it strikes Goliath in the forehead, and the giant falls face-down." },
        { ico:"🌄", label:"See the armies react", lead:"Israel erupts; the Philistines flee.",
          clue:"The unbeatable giant is beaten — not by a bigger weapon, but by a boy who trusted God." },
      ],
      ask:"How does David defeat the giant?",
      options:["One slung stone to the forehead","A long sword fight","He waits for the army"],
      answer:0,
      hint:"David slings one smooth stone; it strikes Goliath's forehead and he falls.",
      sidequest:null },

    { place:"The Battle Is the Lord's", tag:"Strength that isn't about size",
      eli:"He didn't win with muscles or armor. He won because he trusted God — and stayed humble enough to fight as himself. THAT'S the strong way.",
      final:true,
      teaching:"Everyone measured the fight by size: the giant was huge, the boy was small, so surely the giant would win. But David refused the borrowed armor, took his simple sling, and ran toward the giant declaring the battle belonged to God. One stone was enough. Real strength was never about who's biggest — it's about trusting God and staying humble enough to be exactly who you are. Courage got David to the valley; humility and trust won the day." },
   ] },
  ]
};
CASE_DAVID.stops = CASE_DAVID.variants[0].stops;


/* =====================================================================
   CASE 3 — MOSES · "The Long Road to Freedom"
   Theme: Perseverance & Trust.  Eli's flaw: wants to quit when it's hard.
   Map: Midian → Egypt → The Red Sea → The Wilderness → Mount Sinai
   ===================================================================== */
const CASE_MOSES = {
  id: "moses",
  title: "The Long Road to Freedom",
  theme: "Perseverance & Trust",
  badges: {
    firstSteps: { icon:"👣", name:"First Steps",           desc:"Began the journey" },
    steady:     { icon:"🔥", name:"Steady Heart",           desc:"Solved a stop with no hints" },
    thorough:   { icon:"🔍", name:"Careful Seeker",         desc:"Investigated every spot at a location" },
    endured:    { icon:"🏜️", name:"Kept Going",             desc:"Pressed on through a detour" },
    helper:     { icon:"🤝", name:"Burden Bearer",          desc:"Completed a side quest" },
    freed:      { icon:"⛰️", name:"Reached the Mountain",   desc:"Finished the whole case" },
  },
  detours: [
    { place:"The Grumbling Road",
      scene:"Eli wants to turn back the moment the way gets hard. 'This is too much — let's just quit!' The road feels longer when all you do is complain about it.",
      lesson:"Giving up the instant it's difficult never gets us there. You take a breath, keep your eyes ahead, and step forward again." },
    { place:"The Short-Cut That Wasn't",
      scene:"You reach for the fast, easy way out. But the shortcut loops back on itself — some journeys simply have to be walked, one step at a time.",
      lesson:"Trusting the long road is its own kind of strength. You find your footing and rejoin the path." },
  ],
  // Four trails converging on the road to freedom (random pick in startCase).
  variants: [
   { title:"The Long Road to Freedom", stops: [
    { place:"Midian", tag:"A quiet desert where a shepherd hides from his past",
      eli:"Moses ran away and became a shepherd? I'd want to forget the whole thing and never go back. Way easier!",
      spots:[
        { ico:"🔥", label:"Approach the burning bush", lead:"A bush burns but is not consumed, and a voice calls Moses by name.",
          clue:"He's told to go back to Egypt — the very place he fled — to free his people." },
        { ico:"🦯", label:"Look at the shepherd's staff", lead:"An ordinary staff in his hand.",
          clue:"God will use the simple thing Moses already holds to do something impossible." },
        { ico:"😨", label:"Listen to his excuses", lead:"Moses lists every reason he can't: he's not able, not a speaker, not brave enough.",
          clue:"He's afraid — but he's told he won't go alone. The road leads back to Egypt and Pharaoh." },
      ],
      ask:"Where must Moses go, even though he's afraid?",
      options:["Back to Egypt, to face Pharaoh","Stay hidden in Midian","North to a new country"],
      answer:0,
      hint:"The bush clue says it plainly — he must return to the very place he ran from: Egypt.",
      sidequest:{ title:"Bring Aaron alongside", desc:"Moses is scared to speak. His brother Aaron offers to help him. Accept the help instead of going it alone?",
        lesson:"Moses lets his brother walk with him. Eli learns that pressing on doesn't mean doing it all alone — the strong ones accept help.", badge:"helper" } },

    { place:"Egypt", tag:"Before Pharaoh — where 'no' comes again and again",
      eli:"Moses asked Pharaoh to let the people go and he said NO. So... give up now, right? Right?",
      spots:[
        { ico:"👑", label:"Stand before Pharaoh", lead:"Again and again Moses asks, and again and again Pharaoh refuses.",
          clue:"Perseverance means asking again even after 'no' — Moses does not quit." },
        { ico:"🐸", label:"Watch the signs unfold", lead:"One sign after another shows Pharaoh's stubbornness.",
          clue:"Each refusal is met with patience and resolve, not surrender." },
        { ico:"🌙", label:"Prepare for the night of leaving", lead:"At last the people are told to get ready to go — quickly.",
          clue:"Freedom is coming; they must journey toward the sea at the edge of the land." },
      ],
      ask:"After Pharaoh finally relents, where do the people head?",
      options:["Toward the Red Sea","Deeper into Egypt","Up into the mountains first"],
      answer:0,
      hint:"The 'night of leaving' clue points them toward the sea at the edge of the land — the Red Sea.",
      sidequest:null },

    { place:"The Red Sea", tag:"Trapped between water and an army",
      eli:"Water ahead, Pharaoh's army behind. It's OVER. There's literally no way. Time to panic!",
      spots:[
        { ico:"🌊", label:"Face the impossible water", lead:"The sea blocks the way; the army is closing in behind.",
          clue:"When there seems to be no way forward, trust looks for the way no one expected." },
        { ico:"🦯", label:"Raise the staff again", lead:"Moses lifts the same simple staff over the water.",
          clue:"The thing he already held becomes the way through — the waters open a path." },
        { ico:"🚶", label:"Step onto the path", lead:"A dry road appears where there was only sea.",
          clue:"They must walk forward through it — perseverance means taking the step, not just seeing the path." },
      ],
      ask:"What do the people do when the way opens?",
      options:["Walk forward through the sea","Wait on the shore to be sure","Turn back toward Egypt"],
      answer:0,
      hint:"A path appeared — but trust means moving. They walk forward through the sea.",
      sidequest:null },

    { place:"The Wilderness", tag:"Free at last — but the journey isn't over",
      eli:"They're free! So we're done... wait, there's a whole DESERT to cross now? Ugh, seriously?",
      spots:[
        { ico:"🍞", label:"Gather the morning bread", lead:"Each day, just enough food appears for that day.",
          clue:"Trust is learning to depend on enough for today, and keep walking toward tomorrow." },
        { ico:"💧", label:"Find water from the rock", lead:"Even in a dry place, provision comes.",
          clue:"The long road is provided for, step by step, toward a mountain ahead." },
        { ico:"⛰️", label:"Look to the mountain", lead:"A great mountain rises in the distance.",
          clue:"There, at Sinai, the people will meet God and receive his words." },
      ],
      ask:"Where is the long desert road leading them?",
      options:["To Mount Sinai","Back to the Red Sea","Around in endless circles on purpose"],
      answer:0,
      hint:"The 'look to the mountain' clue names it — they're heading to Mount Sinai.",
      sidequest:{ title:"Help a weary traveler", desc:"An older traveler is struggling in the heat. Slow down and carry their load a while?",
        lesson:"You shoulder someone else's burden for a stretch. Eli sees that perseverance isn't just finishing — it's helping others finish too.", badge:"helper" } },

    { place:"Mount Sinai", tag:"The mountain — where the journey's purpose is revealed",
      eli:"We made it to the mountain. That whole long road... every hard step actually got us somewhere. I think I finally get why we didn't quit.",
      final:true,
      teaching:"Moses ran from his past, faced a king who said no again and again, walked toward a sea with no way through, and crossed a desert that tested everyone. He kept going — not because it was easy, but because he trusted. At the mountain, the people met God. Perseverance isn't never being afraid or tired. It's taking the next step anyway, and trusting where the road leads." },
   ] },

   { title:"The Voice in the Flames", stops: [
    { place:"Horeb", tag:"The far side of the desert, tending sheep",
      eli:"If God asked ME to march back to the place I ran from? I'd say no thanks and keep my quiet little job.",
      spots:[
        { ico:"🔥", label:"Approach the burning bush", lead:"Moses spots a bush wrapped in flames out in the wilderness.",
          clue:"It burns and burns — yet it is not burned up. A voice calls his name from the fire." },
        { ico:"👣", label:"Stand on holy ground", lead:"The voice tells Moses to take off his sandals.",
          clue:"'I am the God of your fathers. I have seen my people suffering in Egypt, and I am sending you.'" },
      ],
      ask:"What was so strange about the bush Moses saw?",
      options:["It could talk on its own","It burned but was not burned up","It grew fruit in winter"],
      answer:1,
      hint:"The bush was on fire, yet the flames never consumed it — and God spoke from within it.",
      sidequest:{ title:"Coax out a hidden helper", desc:"A shy person nearby has a real gift but hides from being noticed. Gently encourage them to use it?",
        lesson:"You draw out someone afraid to be seen. Eli learns that God often calls the reluctant — the ones who feel least ready.", badge:"helper" } },

    { place:"The Reluctant Reply", tag:"A shepherd full of excuses",
      eli:"'Who am I to do this?' — honestly, that's exactly what I'd say too. Let someone braver go!",
      spots:[
        { ico:"🙋", label:"Hear Moses's excuses", lead:"Moses protests that he's a nobody and a poor speaker.",
          clue:"God doesn't say Moses is impressive — he says, 'I will be with you.'" },
        { ico:"🐍", label:"Watch the signs", lead:"God turns Moses's staff into a snake and back again.",
          clue:"And he sends Moses's brother Aaron to speak alongside him — Moses won't go alone." },
      ],
      ask:"How does God answer Moses's fear that he isn't good enough?",
      options:["He finds a different person","He promises to be with him and sends Aaron to help","He makes Moses a king first"],
      answer:1,
      hint:"God promises 'I will be with you' and sends Aaron alongside him.",
      sidequest:null },

    { place:"The Road Back to Egypt", tag:"Saying yes to the hard thing",
      eli:"He's actually going back? Into danger, to the place he fled? That takes more than I thought I had.",
      spots:[
        { ico:"🥾", label:"Follow Moses's choice", lead:"Moses takes the staff of God and turns toward Egypt.",
          clue:"He's still afraid — but he goes anyway, one step at a time." },
        { ico:"🤝", label:"Meet Aaron on the way", lead:"Aaron comes out to meet him in the wilderness.",
          clue:"Two brothers, one mission: to tell Pharaoh to let God's people go." },
      ],
      ask:"What does Moses finally decide to do?",
      options:["Go back to free his people, afraid but trusting","Stay in the desert with his sheep","Wait for someone braver"],
      answer:0,
      hint:"Moses takes God's staff and heads back to Egypt — scared, but going anyway.",
      sidequest:null },

    { place:"The Reluctant Rescuer Says Yes", tag:"God uses the unready",
      eli:"He felt too small, too scared, too unready — and God used him anyway. Maybe 'not ready' isn't the same as 'no.'",
      final:true,
      teaching:"God called Moses from a burning bush, and Moses was full of reasons why not: he wasn't impressive, wasn't a good speaker, wasn't ready. God never argued that Moses was amazing — he simply promised, 'I will be with you,' and sent help alongside him. Perseverance often starts here: not with feeling ready, but with taking the first scared step because you trust the One who called you." },
   ] },

   { title:"Let My People Go", stops: [
    { place:"Pharaoh's Court", tag:"A demand, and a hard 'no'",
      eli:"They ask once, the king says no, and... that's that, right? Time to give up.",
      spots:[
        { ico:"🏛️", label:"Stand before Pharaoh", lead:"Moses and Aaron deliver God's message: let my people go.",
          clue:"Pharaoh refuses flatly — and makes the slaves work even harder to punish them." },
        { ico:"😤", label:"Feel the setback", lead:"Things get worse before they get better.",
          clue:"The people are angry at Moses. It would be so easy to quit right here." },
      ],
      ask:"How does Pharaoh respond the very first time?",
      options:["He lets them go at once","He refuses and makes the work harder","He asks for time to think"],
      answer:1,
      hint:"Pharaoh flatly refuses — and cruelly increases the slaves' workload.",
      sidequest:{ title:"Encourage the discouraged", desc:"The people blame Moses when things get harder. Steady a downcast worker and remind them not to lose heart?",
        lesson:"You lift someone when the first try made things worse. Eli learns perseverance means not quitting at the first 'no.'", badge:"helper" } },

    { place:"The Ten Signs", tag:"'No' after 'no' after 'no'",
      eli:"Wait — Moses keeps GOING back? After all those refusals? Why not just stop?",
      spots:[
        { ico:"🐸", label:"Witness the wonders", lead:"God sends sign after sign — the Nile turns to blood, then frogs, and more.",
          clue:"Pharaoh's own magicians can't keep up; even they say this is the finger of God." },
        { ico:"🪨", label:"Watch Pharaoh's heart", lead:"Again and again Pharaoh almost gives in, then hardens his heart.",
          clue:"Every time he says no, Moses comes back and tries again. He does not give up." },
      ],
      ask:"Why do the signs and plagues keep coming, one after another?",
      options:["Pharaoh keeps refusing to let the people go","God forgot to stop","The people asked for more"],
      answer:0,
      hint:"Each time Pharaoh hardens his heart and refuses, so Moses returns and God sends another sign.",
      sidequest:null },

    { place:"The Passover Night", tag:"The night everything changed",
      eli:"After all those tries... is THIS the one that finally works?",
      spots:[
        { ico:"🐑", label:"Mark the doorposts", lead:"God tells each family to share a lamb and put its blood on their doorframes.",
          clue:"That night the final plague passes over every home marked by the blood." },
        { ico:"🚪", label:"See Pharaoh break", lead:"At last, in the dark, Pharaoh summons Moses.",
          clue:"'Go — take your people and leave!' After all the noes, the yes finally comes." },
      ],
      ask:"What finally makes Pharaoh set the people free?",
      options:["The last, most terrible plague on Passover night","A gift of gold","A friendly letter"],
      answer:0,
      hint:"It's the final plague, on the night of the Passover, that at last breaks Pharaoh's resolve.",
      sidequest:null },

    { place:"Freedom at Last", tag:"The reward of not quitting",
      eli:"So many refusals — and Moses went back every single time. If he'd stopped at the first no, they'd still be slaves.",
      final:true,
      teaching:"Moses asked Pharaoh to free the people, and the answer was no — then no again, and again, and again. It would have been so easy to quit after the first refusal, especially when things got harder. But Moses kept going back, trusting God through every setback, until at last the people walked free. Perseverance isn't winning on the first try. It's refusing to give up on the right thing, one 'try again' at a time." },
   ] },

   { title:"A Wall of Water", stops: [
    { place:"Trapped at the Sea", tag:"Nowhere left to run",
      eli:"Water in front, an army behind — it's hopeless. This is the part where everybody gives up.",
      spots:[
        { ico:"🌊", label:"Look at the sea ahead", lead:"The freed people reach the edge of the Red Sea — and stop.",
          clue:"There is no boat, no bridge, no way across the deep water." },
        { ico:"🐎", label:"Look at the dust behind", lead:"Pharaoh changed his mind and sent his whole army after them.",
          clue:"Chariots thunder closer. The people are trapped between the water and the soldiers, and they panic." },
      ],
      ask:"What has the people trapped at the sea?",
      options:["A storm overhead","The sea ahead and Pharaoh's army behind","A locked city gate"],
      answer:1,
      hint:"They're caught between the deep sea in front and the chariots charging up behind.",
      sidequest:{ title:"Calm a panicking crowd", desc:"People around you are frightened and shouting. Help calm just one family and point them to hope?",
        lesson:"You bring calm where there's panic. Eli learns that trust is a choice you make even when every way looks blocked.", badge:"helper" } },

    { place:"Stand Firm", tag:"Trust before you can see the way",
      eli:"Moses says don't be afraid? With the sea RIGHT THERE? How can he be so sure?",
      spots:[
        { ico:"🙌", label:"Hear Moses steady them", lead:"Moses tells the people not to fear — God will make a way.",
          clue:"A pillar of cloud moves behind them, standing between the people and the army all night." },
        { ico:"🦯", label:"See God's instruction", lead:"God speaks to Moses at the water's edge.",
          clue:"'Lift up your staff and stretch out your hand over the sea.' Moses obeys, though he can't yet see how it will work." },
      ],
      ask:"What does God tell Moses to do at the sea?",
      options:["Build a boat","Stretch out his hand and staff over the water","Turn back and surrender"],
      answer:1,
      hint:"God tells Moses to raise his staff and stretch his hand over the sea.",
      sidequest:null },

    { place:"The Crossing", tag:"A path where there was none",
      eli:"The water is... SPLITTING? There's a road right through the middle of the sea!",
      spots:[
        { ico:"💨", label:"Watch the wind blow", lead:"A strong wind blows all night and the waters divide.",
          clue:"The sea opens into two walls of water with dry ground in between." },
        { ico:"👣", label:"Cross on dry ground", lead:"The whole nation walks through the sea on dry land.",
          clue:"When the army follows, the walls of water rush back — and God's people are safe on the far shore." },
      ],
      ask:"How do the people finally cross the sea?",
      options:["On dry ground through the parted waters","In a fleet of boats","Over a stone bridge"],
      answer:0,
      hint:"God parts the sea into walls of water, and the people cross on dry ground.",
      sidequest:null },

    { place:"Through the Sea", tag:"The way that opened one step at a time",
      eli:"There was NO way through — until they trusted and took a step. Then the way appeared. I'll remember that.",
      final:true,
      teaching:"Caught between an army and a sea, with no way out that anyone could see, the people were sure it was over. But Moses trusted, stretched out his hand, and God opened a road right through the deep. They crossed on dry ground and reached the far shore free. Sometimes the way forward only opens as you take the next trusting step. Perseverance walks toward the sea before it sees the path — and finds that God makes one." },
   ] },
  ]
};
CASE_MOSES.stops = CASE_MOSES.variants[0].stops;


/* =====================================================================
   CASE 4 — RUTH · "The Faithful Heart"
   Theme: Loyalty & Faithfulness.  Eli's flaw: only stays when it benefits him.
   Map: Moab → The Road to Bethlehem → The Barley Fields → The Threshing Floor → Bethlehem
   ===================================================================== */
const CASE_RUTH = {
  id: "ruth",
  title: "The Faithful Heart",
  theme: "Loyalty & Faithfulness",
  badges: {
    firstSteps: { icon:"👣", name:"First Steps",     desc:"Began the journey" },
    faithful:   { icon:"💛", name:"Faithful Heart",   desc:"Solved a stop with no hints" },
    thorough:   { icon:"🔍", name:"Careful Seeker",    desc:"Investigated every spot at a location" },
    stayed:     { icon:"🪢", name:"Stayed True",       desc:"Chose loyalty in a detour" },
    kind:       { icon:"🌾", name:"Quiet Kindness",    desc:"Completed a side quest" },
    home:       { icon:"🏡", name:"Found a Home",       desc:"Finished the whole case" },
  },
  detours: [
    { place:"The Easy Goodbye",
      scene:"Eli figures there's nothing in it for him, so why stay? 'Let's just leave — someone else can deal with it.' But walking away from people who need us leaves an emptiness the easy road can't fill.",
      lesson:"Loyalty means staying even when there's no reward in sight. You turn back toward the one who needs you." },
    { place:"The What's-In-It-For-Me Road",
      scene:"You weigh whether being faithful is 'worth it.' But love kept only when it pays isn't really love. The road of loyalty asks for more than that.",
      lesson:"Faithfulness gives without counting the cost. You choose to stay, and the path steadies under you." },
  ],
  // Four trails converging on Ruth's faithfulness and redemption (random pick in startCase).
  variants: [
   { title:"The Faithful Heart", stops: [
    { place:"Moab", tag:"A foreign land, after great loss",
      eli:"Both husbands gone, and Naomi's heading back to her homeland alone. Ruth doesn't owe her anything now — I'd just go find a better deal, honestly.",
      spots:[
        { ico:"💔", label:"Sit with Naomi's grief", lead:"Naomi has lost so much, and tells her daughters-in-law to go back to their own families.",
          clue:"There's no reward offered for staying — only hardship. This is where loyalty is truly tested." },
        { ico:"👋", label:"Watch Orpah choose", lead:"The other daughter-in-law says a tearful goodbye and returns home — an understandable choice.",
          clue:"Ruth is given every reason to leave too. What she does next is a choice of the heart." },
        { ico:"🤝", label:"Hear Ruth's promise", lead:"Ruth refuses to leave Naomi's side.",
          clue:"She pledges to go wherever Naomi goes — and Naomi is going home, to Bethlehem." },
      ],
      ask:"What does Ruth choose to do?",
      options:["Stay loyal and go with Naomi to Bethlehem","Return to her own family in Moab","Wait in Moab for a better offer"],
      answer:0,
      hint:"Ruth's promise clue is the heart of it — she pledges to go wherever Naomi goes, toward Bethlehem.",
      sidequest:null },

    { place:"The Road to Bethlehem", tag:"A long walk toward an uncertain future",
      eli:"They're walking all this way with no plan, no money, nothing promised. Why would anyone DO that?",
      spots:[
        { ico:"🛤️", label:"Walk the long road", lead:"Two widows travel together toward a town where only one of them belongs.",
          clue:"Ruth is leaving everything familiar out of love — loyalty that costs something is the realest kind." },
        { ico:"🌾", label:"See the harvest ahead", lead:"They arrive as the barley harvest is beginning.",
          clue:"Ruth will have to work humbly in the fields to provide for them both." },
        { ico:"🙏", label:"Notice Ruth's resolve", lead:"She's ready to do hard, lowly work without complaint.",
          clue:"Her next step is to the barley fields, to gather leftover grain for her and Naomi." },
      ],
      ask:"How will Ruth provide for herself and Naomi?",
      options:["By gathering leftover grain in the fields","By asking the town for charity","By returning to Moab for help"],
      answer:0,
      hint:"The harvest clue points the way — Ruth goes to the barley fields to gather leftover grain.",
      sidequest:{ title:"Share the first grain", desc:"Ruth's first small handful of grain — she could keep it all. Bring it home to Naomi first?",
        lesson:"Ruth thinks of Naomi before herself. Eli notices that faithful people give first and keep less — and somehow never end up empty.", badge:"kind" } },

    { place:"The Barley Fields", tag:"Humble work under the sun",
      eli:"Picking up leftover grain in someone else's field? That's the lowest job there is. I'd be too proud for that.",
      spots:[
        { ico:"🌾", label:"Gather with the workers", lead:"Ruth works hard and humbly, from morning on, gathering what the harvesters leave behind.",
          clue:"She doesn't see the work as beneath her — faithfulness is willing to do the humble thing." },
        { ico:"👨‍🌾", label:"Meet Boaz, the field's owner", lead:"A kind landowner named Boaz notices Ruth and hears how faithful she's been to Naomi.",
          clue:"Her loyalty has been seen. Boaz shows her unexpected kindness and protection." },
        { ico:"💛", label:"Learn why he's kind", lead:"Boaz says he's heard how Ruth left everything to care for Naomi.",
          clue:"Kindness is meeting her faithfulness. The next step leads toward Boaz, a family redeemer." },
      ],
      ask:"Why does Boaz show Ruth such kindness?",
      options:["Because he heard of her faithfulness to Naomi","Because she demanded it","By pure random chance"],
      answer:0,
      hint:"Boaz says it himself — he's heard how faithfully Ruth cared for Naomi. Her loyalty was seen.",
      sidequest:null },

    { place:"The Threshing Floor", tag:"A quiet, brave, faithful request",
      eli:"Wait, so being loyal all this time... people actually noticed? Huh. Maybe it's not about the reward after all.",
      spots:[
        { ico:"🌙", label:"Follow Naomi's wise plan", lead:"Naomi guides Ruth to ask Boaz, as a family redeemer, to care for them.",
          clue:"Ruth trusts Naomi's guidance — faithfulness runs both directions between them now." },
        { ico:"🤝", label:"Watch Boaz respond", lead:"Boaz honors Ruth's request and praises her character and loyalty.",
          clue:"He commits to do right by her, honorably and properly." },
        { ico:"🏡", label:"See the path to a home", lead:"What began in loss is turning toward a new family and a future.",
          clue:"The road now leads back into Bethlehem — toward a home and a redeemed future." },
      ],
      ask:"How does Boaz answer Ruth's faithful request?",
      options:["He honors it and commits to care for them","He turns her away","He tells her to go back to Moab"],
      answer:0,
      hint:"Boaz honors Ruth's character — he commits to do right by her and Naomi.",
      sidequest:{ title:"Comfort Naomi", desc:"Naomi still carries her old grief. Sit with her and share the good news gently?",
        lesson:"Ruth brings Naomi hope after so much sorrow. Eli sees that faithfulness heals — staying true to someone can bring them back to life inside.", badge:"kind" } },

    { place:"Bethlehem", tag:"A home, a family, and a place in a bigger story",
      eli:"She stayed faithful when there was nothing in it for her — and it led to a whole home and family. I think loyalty might be the strongest thing there is.",
      final:true,
      teaching:"Ruth had every reason to walk away. Instead she stayed faithful to Naomi through loss, a long road, and humble work, expecting nothing in return. Her quiet loyalty was seen, met with kindness, and led to a home she never demanded. And her story became part of a much bigger one — she is remembered in the family line that leads all the way to Jesus. Faithfulness rarely looks flashy. But staying true, especially when no one's watching, is one of the strongest things a heart can do." },
   ] },

   { title:"Where You Go, I Will Go", stops: [
    { place:"Moab", tag:"Three widows, and a hard road home",
      eli:"If there's nothing left for me in it, I'd look out for myself. Why stay loyal to someone who can't help you?",
      spots:[
        { ico:"💔", label:"Learn what happened", lead:"A famine had driven Naomi's family far from home to Moab.",
          clue:"There, over the years, Naomi's husband and both of her sons died. She is left with her two sons' widows." },
        { ico:"🧳", label:"Watch Naomi prepare", lead:"Hearing there's food again in Bethlehem, Naomi sets out to go home.",
          clue:"She's lost nearly everything — but she still has two loyal daughters-in-law beside her." },
      ],
      ask:"What great loss has Naomi suffered in Moab?",
      options:["Her husband and both her sons have died","Her house burned down","She lost her way in the desert"],
      answer:0,
      hint:"Naomi's husband and both of her sons died, leaving three widows.",
      sidequest:{ title:"Sit with a grieving neighbor", desc:"Someone nearby has lost a loved one and feels forgotten. Stay a while and grieve with them?",
        lesson:"You keep company with someone in loss instead of hurrying on. Eli learns that showing up for the hurting is a quiet kind of loyalty.", badge:"helper" } },

    { place:"The Crossroads", tag:"Naomi tells them to turn back",
      eli:"Naomi's telling them to leave — free pass to go home! Most people would take it in a heartbeat.",
      spots:[
        { ico:"🛤️", label:"Hear Naomi's blessing", lead:"Naomi urges both young widows to return to their own families and start again.",
          clue:"She has nothing left to offer them — no husbands, no home, no security." },
        { ico:"👋", label:"Watch Orpah decide", lead:"One daughter-in-law, Orpah, tearfully says goodbye and turns back.",
          clue:"It's the sensible choice — but Ruth still won't let go of Naomi's hand." },
      ],
      ask:"What does Naomi urge her daughters-in-law to do?",
      options:["Come to Bethlehem no matter what","Go back to their own families and homes","Find new work in Moab"],
      answer:1,
      hint:"Having nothing to give them, Naomi tells them to return to their own families.",
      sidequest:null },

    { place:"Ruth's Vow", tag:"A promise with nothing in it for her",
      eli:"She's staying? With an old widow, headed to a strange country, with no reward waiting? ...Why?",
      spots:[
        { ico:"🤝", label:"Hear Ruth's promise", lead:"Ruth clings to Naomi and makes a vow.",
          clue:"'Where you go I will go; your people will be my people, and your God my God.'" },
        { ico:"🌾", label:"See where love leads", lead:"Together the two widows set out for Bethlehem.",
          clue:"Ruth gains nothing by this — she stays purely out of love and loyalty." },
      ],
      ask:"What does Ruth choose to do?",
      options:["Stay with Naomi no matter what","Return home like Orpah","Wait in Moab for better times"],
      answer:0,
      hint:"Ruth refuses to leave, vowing to stay with Naomi and her God.",
      sidequest:null },

    { place:"A Promise That Cost Everything", tag:"Loyalty that expects nothing back",
      eli:"There was nothing in it for her — and she stayed anyway. Maybe that's what makes loyalty so strong: it doesn't need a reward.",
      final:true,
      teaching:"When everything fell apart, Naomi had nothing left to offer — and the sensible thing was to walk away, as Orpah did. But Ruth clung to her and vowed to stay, gaining nothing for herself. That's what real faithfulness looks like: choosing to stay loyal when there's no reward in it, simply because you love. Quiet promises like that turn out to be some of the strongest things in the world." },
   ] },

   { title:"Under His Wings", stops: [
    { place:"The Barley Fields", tag:"Hard, humble work at harvest",
      eli:"Picking up leftover scraps behind the workers? That's beneath me. I'd want a real job with real pay.",
      spots:[
        { ico:"🌾", label:"Watch Ruth glean", lead:"Ruth goes into the fields to gather leftover grain the harvesters drop.",
          clue:"It's stooping, tiring work in the sun — but it's how she and Naomi will eat." },
        { ico:"☀️", label:"See her keep at it", lead:"She works from morning with barely a rest.",
          clue:"No complaints, no shortcuts — just faithful, humble labor to care for Naomi." },
      ],
      ask:"How does Ruth get food for herself and Naomi?",
      options:["By gleaning leftover grain in the fields","By begging at the gate","By selling her jewelry"],
      answer:0,
      hint:"Ruth gleans — gathering the leftover grain the harvesters leave behind.",
      sidequest:{ title:"Take on a humble chore", desc:"There's an unglamorous job nobody wants to do. Quietly do it well without being asked?",
        lesson:"You do the lowly task without complaint. Eli learns that faithfulness often looks like humble work no one applauds.", badge:"helper" } },

    { place:"Boaz Notices", tag:"Kindness meets a good reputation",
      eli:"Why would the rich landowner even glance at a poor foreign woman gleaning scraps?",
      spots:[
        { ico:"🧔", label:"Meet Boaz", lead:"Boaz, the field's owner, asks his workers who the young woman is.",
          clue:"He's already heard how faithfully she has cared for her mother-in-law, Naomi." },
        { ico:"🍞", label:"Receive his welcome", lead:"Boaz tells Ruth to stay safe in his field and share his workers' food and water.",
          clue:"He blesses her for taking refuge under God's wings, and treats a stranger with honor." },
      ],
      ask:"Why does Boaz show Ruth such kindness?",
      options:["He heard how faithful she'd been to Naomi","She was the richest woman there","She demanded to be treated well"],
      answer:0,
      hint:"Boaz had heard of Ruth's loyalty to Naomi, and honored her for it.",
      sidequest:null },

    { place:"A Full Basket Home", tag:"Faithfulness, quietly rewarded",
      eli:"Wait — he told his workers to DROP extra grain on purpose, just for her?",
      spots:[
        { ico:"🌾", label:"See the extra grain", lead:"Boaz quietly tells his workers to leave handfuls behind for Ruth.",
          clue:"She gathers far more than a gleaner ever could — an armful of provision." },
        { ico:"🏠", label:"Bring it to Naomi", lead:"Ruth carries the abundance home.",
          clue:"Naomi sees God's kindness at work, and hope returns to her heart." },
      ],
      ask:"What does Ruth bring home from the field?",
      options:["Far more grain than a gleaner could expect","A single small handful","Nothing that day"],
      answer:0,
      hint:"Thanks to Boaz's quiet generosity, Ruth brings home an abundance of grain.",
      sidequest:null },

    { place:"Kindness Meets Faithfulness", tag:"Loyalty that gets noticed",
      eli:"She wasn't loyal to get anything — but her faithfulness got noticed anyway, and met with kindness. That's a good way for a story to turn.",
      final:true,
      teaching:"Ruth didn't glean the fields to be noticed; she did humble, tiring work simply to care for Naomi. But her quiet faithfulness had already reached Boaz's ears, and he met it with generosity — protection, food, and grain left behind on purpose. Loyalty rarely announces itself, yet it has a way of being seen. Stay faithful in the small, unglamorous things, and kindness often comes to meet you." },
   ] },

   { title:"The Kinsman-Redeemer", stops: [
    { place:"Naomi's Plan", tag:"A relative who could rescue them",
      eli:"So there's a relative who could help? Why would he bother taking on someone else's troubles?",
      spots:[
        { ico:"💡", label:"Hear Naomi's idea", lead:"Naomi realizes Boaz is a close relative of their family.",
          clue:"By their law, a near relative — a 'kinsman-redeemer' — could rescue a family that had lost everything." },
        { ico:"🌙", label:"Send Ruth to ask", lead:"Naomi tells Ruth to go to Boaz and ask for his protection and care.",
          clue:"Ruth humbly asks Boaz to take her family under his covering." },
      ],
      ask:"What is a 'kinsman-redeemer'?",
      options:["A relative who can rescue and provide for the family","A judge at the city gate","A soldier for hire"],
      answer:0,
      hint:"It's a close relative who, by their law, could redeem — rescue and care for — a family in need.",
      sidequest:{ title:"Offer help before you're asked", desc:"Someone near you is struggling but too proud to ask. Quietly step in and lighten their load?",
        lesson:"You redeem a hard moment for someone who couldn't ask. Eli learns that faithfulness means stepping in to rescue, not just staying nearby.", badge:"helper" } },

    { place:"The City Gate", tag:"A promise made in the open",
      eli:"There's ANOTHER relative with first dibs? This could all fall apart...",
      spots:[
        { ico:"⚖️", label:"Watch at the gate", lead:"Boaz gathers the town elders and the nearer relative to settle it publicly.",
          clue:"The closer relative could redeem the land — but he backs out, unwilling to take on Ruth's family." },
        { ico:"🤝", label:"See Boaz step up", lead:"Boaz gladly takes the responsibility himself.",
          clue:"Before the whole town, he pledges to redeem the family and take Ruth as his wife." },
      ],
      ask:"Who agrees to redeem the family and marry Ruth?",
      options:["Boaz","The nearer relative","One of the town elders"],
      answer:0,
      hint:"The nearer relative declines, and Boaz steps forward to redeem the family himself.",
      sidequest:null },

    { place:"A Son Named Obed", tag:"A small story inside a huge one",
      eli:"They had a baby — and that baby's family line leads to... KING DAVID? And on to Jesus?",
      spots:[
        { ico:"👶", label:"Meet baby Obed", lead:"Ruth and Boaz marry, and God blesses them with a son named Obed.",
          clue:"Naomi, once empty-handed and grieving, now holds a grandchild and a future." },
        { ico:"📜", label:"Trace the family line", lead:"Follow Obed's family forward.",
          clue:"Obed becomes the grandfather of King David — so Ruth is woven into the family line that leads to Jesus." },
      ],
      ask:"Whose famous family line does faithful Ruth become part of?",
      options:["King David's — the line leading to Jesus","A line of Egyptian kings","No one remembers"],
      answer:0,
      hint:"Ruth's son Obed is the grandfather of King David, placing her in the line that leads to Jesus.",
      sidequest:null },

    { place:"Woven Into the Story", tag:"Quiet loyalty, lasting reward",
      eli:"A loyal foreign widow, gleaning scraps — and she ends up in the family line of the King of kings. Faithfulness really does matter more than I thought.",
      final:true,
      teaching:"Ruth never demanded anything. She stayed loyal, worked humbly, and trusted — and Boaz, a redeemer, stepped in to rescue her family. Their son Obed became grandfather to King David, weaving this quiet, faithful woman into the greatest story of all, the line that leads to Jesus. You never know how far a faithful heart will reach. Stay true in the small things, and God can make your quiet loyalty part of something enormous." },
   ] },
  ]
};
CASE_RUTH.stops = CASE_RUTH.variants[0].stops;


/* =====================================================================
   CASE 5 — PAUL · "The Heart That Changed"
   Theme: Transformation & Mission.  Eli's flaw: believes people can't change.
   Map: Road to Damascus → Damascus → Antioch → The Missionary Journeys → Rome
   ===================================================================== */
const CASE_PAUL = {
  id: "paul",
  title: "The Heart That Changed",
  theme: "Transformation & Mission",
  badges: {
    firstSteps: { icon:"👣", name:"First Steps",       desc:"Began the journey" },
    changed:    { icon:"✨", name:"New Heart",          desc:"Solved a stop with no hints" },
    thorough:   { icon:"🔍", name:"Careful Seeker",     desc:"Investigated every spot at a location" },
    forgiven:   { icon:"🕊️", name:"Second Chance",      desc:"Chose grace in a detour" },
    sent:       { icon:"⛵", name:"Fellow Sender",       desc:"Completed a side quest" },
    finished:   { icon:"📜", name:"Finished the Race",   desc:"Finished the whole case" },
  },
  detours: [
    { place:"The 'People Can't Change' Road",
      scene:"Eli's sure of it: 'Once a bad guy, always a bad guy. He'll never really change.' But writing people off keeps us stuck in the past — and misses the miracle right in front of us.",
      lesson:"People can be transformed. Giving someone the chance to change is its own kind of courage. You reopen your heart to the possibility." },
    { place:"The Grudge Path",
      scene:"You want to hold the past against him — he did real harm, after all. But a heart clenched around old wrongs can't receive a new story.",
      lesson:"Grace means letting a changed person be new. You loosen your grip and step back onto the road." },
  ],
  // Four trails converging on Saul's transformation into Paul (random pick in startCase).
  variants: [
   { title:"The Heart That Changed", stops: [
    { place:"The Road to Damascus", tag:"Where a man set against the truth is stopped in his tracks",
      eli:"This guy Saul HUNTS people who follow Jesus. He's the villain. There's no way HE turns good — no chance.",
      spots:[
        { ico:"⚡", label:"See the blinding light", lead:"A brilliant light stops Saul on the road, and a voice asks why he's fighting against the truth.",
          clue:"The fiercest opponent is met not with punishment, but with a question and a chance to change." },
        { ico:"🙈", label:"Notice he's now blind", lead:"Saul, once so sure and powerful, is left blind and helpless, led by the hand.",
          clue:"Sometimes we have to lose our old certainty before we can truly see. He's led into Damascus." },
        { ico:"❓", label:"Hear his new question", lead:"The proud persecutor humbly asks what he should do now.",
          clue:"A changed heart begins with a humble question. The road leads into the city of Damascus." },
      ],
      ask:"Where is the blinded Saul led next?",
      options:["Into the city of Damascus","Back home in triumph","Off to hunt more believers"],
      answer:0,
      hint:"The light clue and the blindness both lead the same way — he's led by the hand into Damascus.",
      sidequest:null },

    { place:"Damascus", tag:"Where an enemy is welcomed as a brother",
      eli:"Okay but even IF he changed... who's going to trust him? He hurt people. I sure wouldn't go near him.",
      spots:[
        { ico:"🙏", label:"Meet brave Ananias", lead:"A believer named Ananias is asked to go and help Saul — the very man who came to arrest people like him.",
          clue:"It takes courage to offer grace to a former enemy. Ananias goes anyway." },
        { ico:"👁️", label:"Watch his sight return", lead:"Saul's blindness lifts; he can see again, in every sense.",
          clue:"The change is real. The man who fought the truth now wants to tell everyone about it." },
        { ico:"📣", label:"Hear him start preaching", lead:"To everyone's shock, Saul begins proclaiming the very faith he tried to destroy.",
          clue:"His mission is beginning. It will take him to a city where believers are first sent out — Antioch." },
      ],
      ask:"What does the changed Saul immediately begin to do?",
      options:["Preach the faith he once fought","Quietly hide his past","Go back to his old ways"],
      answer:0,
      hint:"His sight-returned clue leads straight into it — he starts preaching the very faith he once tried to destroy.",
      sidequest:{ title:"Stand up for the newcomer", desc:"Other believers are still afraid of Saul. Vouch for him, so he isn't turned away?",
        lesson:"Someone chooses to believe Saul has really changed, and gives him a chance. Eli sees that transformation needs someone willing to trust it.", badge:"sent" } },

    { place:"Antioch", tag:"Where the mission is launched to the whole world",
      eli:"So he's really one of them now. Fine. But this is a small local thing, right? How far can it even go?",
      spots:[
        { ico:"⛪", label:"Join the growing community", lead:"In Antioch the believers grow strong, and here they're first called 'Christians.'",
          clue:"What started with one changed heart is becoming a movement." },
        { ico:"🗺️", label:"See the map of the world", lead:"Saul — now called Paul — is set apart to carry the message far beyond his own people.",
          clue:"Transformation isn't just for him; it's meant to be shared. He's being sent out on long journeys." },
        { ico:"⛵", label:"Prepare the ships", lead:"Paul sets out across seas and cities to share the good news.",
          clue:"His mission takes him on great journeys across many lands and dangers." },
      ],
      ask:"What is Paul now sent out to do?",
      options:["Travel far to share the message","Stay in one town forever","Retire from it all"],
      answer:0,
      hint:"The world-map clue is the key — Paul is sent out on long journeys to share the message far and wide.",
      sidequest:null },

    { place:"The Missionary Journeys", tag:"Hardship, courage, and letters that outlived him",
      eli:"He's getting shipwrecked, thrown in prison, chased out of towns... and he STILL keeps going? Even I have to admit — that's a real change.",
      spots:[
        { ico:"⛈️", label:"Survive the shipwreck", lead:"Storms, prison, and danger meet Paul at every turn, yet he presses on.",
          clue:"A transformed heart doesn't quit when the mission gets hard." },
        { ico:"✉️", label:"Read the letters he writes", lead:"Even from prison, Paul writes letters of encouragement to far-off communities.",
          clue:"His words, written in chains, would be copied and carried for thousands of years." },
        { ico:"🏛️", label:"Set course for Rome", lead:"Paul's mission draws him toward the very heart of the empire.",
          clue:"His road leads to Rome, to carry the message to the center of the known world." },
      ],
      ask:"Where does Paul's long mission finally lead him?",
      options:["To Rome, the heart of the empire","Home to retire quietly","Back to persecuting believers"],
      answer:0,
      hint:"The 'set course' clue names it — his road leads to Rome, the center of the known world.",
      sidequest:{ title:"Encourage a young helper", desc:"Paul's young companion Timothy is discouraged. Take a moment to strengthen him?",
        lesson:"Paul pours courage into the next generation instead of keeping it all himself. Eli learns that mission means lifting others to carry it on.", badge:"sent" } },

    { place:"Rome", tag:"The end of one road — and letters that never stopped traveling",
      eli:"The biggest villain became one of the greatest heroes. I was so sure people couldn't change. I was wrong — and I'm really glad I was.",
      final:true,
      teaching:"Saul set out to destroy the faith — and became Paul, the man who carried it farther than anyone. He was stopped, humbled, changed, welcomed by people brave enough to give him a chance, and sent across the world through storms, prisons, and shipwrecks. His letters, written in chains, were copied by hand and carried for two thousand years — words still read today. No one is beyond change, and a changed heart can carry the truth farther than we can imagine. That's the mission: to be transformed, and to help carry it on." },
   ] },

   { title:"The Persecutor", stops: [
    { place:"Jerusalem", tag:"A young man who's sure he's right",
      eli:"Some people are just bad guys, plain and simple. They never change — everybody knows that.",
      spots:[
        { ico:"🧥", label:"Watch at Stephen's trial", lead:"A follower of Jesus named Stephen is dragged out and stoned for his faith.",
          clue:"A young man named Saul stands by approving, guarding the coats of those who do it." },
        { ico:"😠", label:"See Saul's zeal", lead:"Saul is certain these believers are dangerous and must be stopped.",
          clue:"He is utterly convinced he's serving God — and utterly wrong." },
      ],
      ask:"What does Saul do at the death of Stephen?",
      options:["Tries to stop it","Stands by approving and guards the coats","Weeps and walks away"],
      answer:1,
      hint:"Saul watches approvingly and guards the coats of those stoning Stephen.",
      sidequest:{ title:"Give someone a fair hearing", desc:"Everyone has already decided a newcomer is 'trouble.' Take the time to actually listen to their side?",
        lesson:"You refuse to write someone off before knowing them. Eli learns that being sure you're right isn't the same as being right.", badge:"helper" } },

    { place:"House to House", tag:"A man breathing threats",
      eli:"So he's not just watching now — he's hunting people down? See, told you: bad to the bone.",
      spots:[
        { ico:"🚪", label:"Follow Saul's raids", lead:"Saul goes from house to house, dragging off men and women who follow Jesus.",
          clue:"He throws them in prison, doing everything he can to stamp out the young faith." },
        { ico:"🔥", label:"Feel his fury", lead:"The believers scatter in fear wherever Saul goes.",
          clue:"He is, by every measure, the last person on earth you'd expect God to use." },
      ],
      ask:"What is Saul doing to the followers of Jesus?",
      options:["Quietly ignoring them","Hunting them down and arresting them","Secretly helping them"],
      answer:1,
      hint:"Saul goes house to house, arresting believers and throwing them in prison.",
      sidequest:null },

    { place:"Letters to Damascus", tag:"Setting out to do more harm",
      eli:"Now he's getting official papers to arrest even MORE of them, in another city? This guy is beyond hope.",
      spots:[
        { ico:"📜", label:"Examine the letters", lead:"Saul gets official letters granting him power to arrest believers in Damascus.",
          clue:"He sets out on the road, determined to drag them back to Jerusalem in chains." },
        { ico:"🛣️", label:"Watch him ride out", lead:"Saul travels toward Damascus, full of threats.",
          clue:"He has no idea that on this very road, everything about him is about to change." },
      ],
      ask:"Where is Saul headed, and why?",
      options:["To Damascus, to arrest believers","To Rome, to see the emperor","Home, to rest"],
      answer:0,
      hint:"Saul carries letters to Damascus so he can arrest and imprison the believers there.",
      sidequest:null },

    { place:"The Last Man You'd Expect", tag:"No one is beyond change",
      eli:"He's the WORST enemy the believers have... and I have a funny feeling he's the one about to change the most. I did NOT see that coming.",
      final:true,
      teaching:"Saul wasn't a small-time troublemaker — he approved of killing believers and hunted them house to house. If anyone seemed beyond hope, it was him. That's exactly the point. The very man everyone had written off was the one God was about to transform into the greatest missionary who ever lived. No one — no one — is too far gone for a changed heart." },
   ] },

   { title:"The Reluctant Helper", stops: [
    { place:"A House in Damascus", tag:"A believer given a hard assignment",
      eli:"God wants a believer to go HELP the man who came to arrest him? No way. I'd hide.",
      spots:[
        { ico:"🙏", label:"Meet Ananias", lead:"A follower of Jesus named Ananias is praying when God speaks to him in a vision.",
          clue:"God tells him to go to a house on Straight Street and find a man named Saul." },
        { ico:"👁️", label:"Learn Saul's state", lead:"Saul has been struck blind and is waiting, praying, for three days.",
          clue:"God says Ananias is to lay hands on Saul so he can see again." },
      ],
      ask:"Whom does God send Ananias to help?",
      options:["Saul, the persecutor","A sick king","A lost child"],
      answer:0,
      hint:"God sends Ananias to Saul, the man who had come to arrest believers.",
      sidequest:{ title:"Do a scary right thing", desc:"You're asked to be kind to someone who once hurt you. Take a breath and do the kind thing anyway?",
        lesson:"You choose to help even though it's frightening. Eli learns that transformation sometimes needs a brave person willing to reach out first.", badge:"helper" } },

    { place:"Ananias's Fear", tag:"Every reason to say no",
      eli:"Of COURSE he's scared! Everyone knows what Saul has done. This is a trap, surely.",
      spots:[
        { ico:"😨", label:"Hear his objection", lead:"Ananias protests to God about the assignment.",
          clue:"'Lord, I've heard how much harm this man has done to your people!'" },
        { ico:"✨", label:"Hear God's answer", lead:"God gently but firmly reassures him.",
          clue:"'Go — this man is my chosen instrument to carry my name to the nations.'" },
      ],
      ask:"Why is Ananias afraid to go to Saul?",
      options:["Saul had been arresting and harming believers","Saul was a giant","The road was too far"],
      answer:0,
      hint:"Ananias knew Saul's cruel reputation — he'd been hunting believers like him.",
      sidequest:null },

    { place:"Brother Saul", tag:"An enemy welcomed as family",
      eli:"He actually WENT? And called the man 'brother'? After everything?",
      spots:[
        { ico:"🤲", label:"Watch Ananias obey", lead:"Ananias goes to the house, lays his hands on Saul, and calls him 'Brother Saul.'",
          clue:"Something like scales falls from Saul's eyes, and he can see again." },
        { ico:"💧", label:"See Saul baptized", lead:"Saul gets up, is baptized, and eats.",
          clue:"The hunter has become a brother — welcomed by the very people he came to arrest." },
      ],
      ask:"What happens when Ananias bravely obeys?",
      options:["Saul regains his sight and is baptized","Saul arrests him on the spot","Nothing at all"],
      answer:0,
      hint:"Ananias lays hands on Saul; his sight returns and he is baptized.",
      sidequest:null },

    { place:"The Welcome That Changed a Man", tag:"Grace with skin on",
      eli:"Saul changed on the road — but it took a scared believer being brave enough to welcome him. Both of them had to trust.",
      final:true,
      teaching:"God changed Saul's heart on the road — but the transformation needed one more thing: someone willing to welcome him. Ananias had every reason to refuse; he knew exactly what Saul had done. Yet he obeyed, laid his hands on his enemy, and called him 'brother.' Real transformation often needs brave people willing to give the changed a chance. Be the one who reaches out first." },
   ] },

   { title:"The New Mission", stops: [
    { place:"The Synagogues of Damascus", tag:"The hunter now preaches",
      eli:"People really change and then just... go right back to normal, right? This won't actually stick.",
      spots:[
        { ico:"📣", label:"Hear Saul preach", lead:"Right away, Saul begins telling everyone that Jesus is the Son of God.",
          clue:"The very man who came to arrest believers is now boldly preaching the faith." },
        { ico:"😲", label:"See the crowd's shock", lead:"Everyone who hears him is astonished.",
          clue:"'Isn't this the man who came here to drag us away in chains?' They can hardly believe it." },
      ],
      ask:"What does Saul do right after his heart is changed?",
      options:["Boldly preaches that Jesus is God's Son","Goes back to arresting believers","Leaves quietly and hides"],
      answer:0,
      hint:"Saul immediately begins preaching Jesus in the synagogues — the opposite of why he came.",
      sidequest:{ title:"Cheer on a fresh start", desc:"Someone is trying hard to change, and others keep doubting them. Encourage their new start out loud?",
        lesson:"You back someone's fresh start instead of doubting it. Eli learns that a changed life deserves support, not suspicion.", badge:"helper" } },

    { place:"The Plot", tag:"The mission gets dangerous",
      eli:"Uh oh — now the people who USED to be his side want him dead? Being changed cost him everything.",
      spots:[
        { ico:"🗡️", label:"Uncover the danger", lead:"Saul's former allies are furious at his change and plan to kill him.",
          clue:"They watch the city gates closely, day and night, waiting to catch him." },
        { ico:"🛡️", label:"See the believers rally", lead:"The believers he once hunted now work to protect him.",
          clue:"The people Saul came to arrest are the ones who will save his life." },
      ],
      ask:"What danger does the changed Saul now face?",
      options:["A plot to kill him","A heavy fine","Being sent home"],
      answer:0,
      hint:"His former allies plot to kill him and watch the gates to catch him.",
      sidequest:null },

    { place:"Over the Wall", tag:"A daring nighttime escape",
      eli:"They lowered him in a BASKET over the city wall? That's the most Carmen-Sandiego thing yet!",
      spots:[
        { ico:"🧺", label:"Watch the escape", lead:"At night, the believers put Saul in a large basket.",
          clue:"They lower him down through an opening in the city wall, past the watching gates." },
        { ico:"🌟", label:"See the mission continue", lead:"Saul slips safely away to keep preaching elsewhere.",
          clue:"His change wasn't a passing mood — it became the mission of his whole life." },
      ],
      ask:"How does Saul escape the plot in Damascus?",
      options:["Lowered in a basket over the city wall","He fights his way out","He surrenders"],
      answer:0,
      hint:"The believers lower Saul in a basket through an opening in the wall at night.",
      sidequest:null },

    { place:"The Message Carries On", tag:"A changed heart on a mission",
      eli:"He didn't just change and stop there — he spent the rest of his life carrying the good news, whatever it cost. The change was real.",
      final:true,
      teaching:"Saul's transformation wasn't a passing feeling — it became his whole life's mission. He preached at once, faced deadly plots, and escaped in a basket over a wall, all to carry the very message he once tried to destroy. He traveled the world and wrote letters, still read two thousand years later. A truly changed heart doesn't just turn around; it carries the truth forward, further than anyone imagined." },
   ] },
  ]
};
CASE_PAUL.stops = CASE_PAUL.variants[0].stops;


/* =====================================================================
   REGISTRY — the engine reads this. Order = suggested play order.
   Claude Code: import CASES and render by id. Add new cases by appending.
   ===================================================================== */
/* =====================================================================
   CASE 6 — NOAH · "The Ark and the Promise"
   Theme: Obedience & Faith.  Eli's flaw: wants to do it his own way / doubts.
   Story-moments: Field → Ark Yard → The Door → On the Waters → The Rainbow
   Unlocks the "Fill the Ark" workshop.
   ===================================================================== */
const CASE_NOAH = {
  id: "noah",
  title: "The Ark and the Promise",
  theme: "Obedience & Faith",
  badges: {
    firstSteps: { icon:"👣",  name:"First Steps",        desc:"Began the journey" },
    faithful:   { icon:"🔨",  name:"Faithful Builder",    desc:"Solved a stop with no hints" },
    thorough:   { icon:"🔍",  name:"Careful Seeker",      desc:"Investigated every spot at a location" },
    steady:     { icon:"🌧️", name:"Weathered the Storm", desc:"Pressed on through a detour" },
    helper:     { icon:"🤝",  name:"Kind Helper",         desc:"Completed a side quest" },
    promise:    { icon:"🌈",  name:"Kept the Promise",    desc:"Finished the whole case" },
  },
  detours: [
    { place:"The Doubters' Road",
      scene:"Eli listens to the crowd who laugh at the ark. 'Why build a boat on dry land? This is silly!' Following the doubters leads nowhere but in a long circle.",
      lesson:"Doing the right thing can look strange to everyone else. You turn back and keep trusting." },
    { place:"The My-Own-Way Path",
      scene:"Eli wants to build it his own way and ignore the plans. But guesses and shortcuts leave the ark leaky and unsafe — some instructions are worth following exactly.",
      lesson:"Obedience means trusting the plan even when we can't see the whole picture yet. You find your way back." },
  ],
  // Four trails converging on the ark and the rainbow promise (random pick in startCase).
  variants: [
   { title:"The Ark and the Promise", stops: [
    { place:"Noah's Field", tag:"Where a strange task begins",
      eli:"Build a giant boat? Out here, with no water anywhere? That makes <b>no</b> sense. I'd just... not.",
      spots:[
        { ico:"📜", label:"Hear the warning", lead:"Noah is told a great flood is coming, and to build an ark to save his family and the animals.",
          clue:"It sounds impossible — but Noah listens carefully instead of arguing." },
        { ico:"📏", label:"Measure the plans", lead:"Exact instructions: how long, how wide, how tall, and what wood to use.",
          clue:"Noah follows the plan exactly, even the parts he doesn't understand yet." },
        { ico:"😐", label:"Notice the neighbors", lead:"Everyone thinks Noah is foolish for building a boat on dry land.",
          clue:"Doing right doesn't always look right to others. Noah begins anyway." },
      ],
      ask:"What does Noah do when he's given this strange task?",
      options:["Argue that it makes no sense","Obey and start building the ark","Wait to see if it rains first"],
      answer:1,
      hint:"Look again at 'measure the plans' — Noah follows the instructions exactly, even before he understands them.",
      sidequest:{ title:"Help gather the wood", desc:"The work is huge and Noah's sons are tired. Lend a hand hauling timber?",
        lesson:"You pitch in on the hard, unglamorous work. Eli sees that obeying often means plain hard work, done faithfully.", badge:"helper" } },

    { place:"The Ark Yard", tag:"Years of building while others laugh",
      eli:"He's <b>still</b> building? For years? And everyone's still laughing? I'd have quit ages ago.",
      spots:[
        { ico:"🔨", label:"Watch the building", lead:"Year after year, Noah and his family keep working on the enormous ark.",
          clue:"Faith isn't a one-day thing — it's showing up and obeying, day after day." },
        { ico:"🗣️", label:"Hear the mockers", lead:"Crowds gather to laugh and jeer at the huge boat on dry ground.",
          clue:"Noah doesn't stop because people mock him — he keeps his eyes on the task." },
        { ico:"🌿", label:"See it finished", lead:"At last the ark is complete, sealed with pitch inside and out.",
          clue:"The long, patient obedience is nearly done. Now come the animals." },
      ],
      ask:"Why does Noah keep building despite all the mocking?",
      options:["He trusts God's word more than the crowd","He enjoys the attention","He isn't sure, but keeps busy"],
      answer:0,
      hint:"The 'mockers' clue is the key — Noah keeps his eyes on the task instead of on the crowd.",
      sidequest:null },

    { place:"The Great Door", tag:"Two by two",
      eli:"Okay <b>this</b> part is cool. Every animal, two by two? How do they all even fit?",
      spots:[
        { ico:"🐘", label:"Count the pairs", lead:"The animals come, two by two — a male and female of every kind.",
          clue:"Everything needed to start the world again is being gathered safely aboard." },
        { ico:"🍞", label:"Check the stores", lead:"Food for every animal and the family, enough for a long time.",
          clue:"Obedience thinks ahead — Noah has prepared for a long wait." },
        { ico:"🚪", label:"Look at the door", lead:"When all are aboard, the great door must be shut.",
          clue:"Noah doesn't shut it himself — the door is shut for him, and then the rain begins." },
      ],
      ask:"Who shuts the great door of the ark?",
      options:["Noah shuts it himself","God shuts them safely in","The animals push it closed"],
      answer:1,
      hint:"The 'door' clue says it plainly — Noah doesn't shut it himself; it is shut for him.",
      sidequest:{ title:"Settle the frightened animals", desc:"As the rain starts, the animals are scared. Move among them to calm them?",
        lesson:"You bring calm in a scary moment. Eli learns that trusting God doesn't mean nothing is scary — it means being steady inside the storm.", badge:"helper" } },

    { place:"On the Waters", tag:"Rain, then a long, long wait",
      eli:"They're safe... but now they just float here for how long? Waiting is the <b>worst</b> part!",
      spots:[
        { ico:"🌧️", label:"Endure the rain", lead:"It rains forty days and nights, and the waters cover everything.",
          clue:"The safe ones are the ones who obeyed and waited inside the ark." },
        { ico:"🕊️", label:"Send the dove", lead:"After many days, Noah sends out a dove to look for dry land. It returns with nothing.",
          clue:"Not yet. Noah waits, and sends it out again." },
        { ico:"🌿", label:"The dove returns", lead:"At last the dove comes back carrying a fresh olive leaf.",
          clue:"The waters are going down. Dry land — and a new beginning — is near." },
      ],
      ask:"How does Noah know it is nearly safe to leave the ark?",
      options:["The rain simply stops","The dove returns with an olive leaf","He just gets tired of waiting"],
      answer:1,
      hint:"The 'dove returns' clue — the olive leaf is the sign that the waters are going down.",
      sidequest:null },

    { place:"The Rainbow", tag:"A promise across the sky",
      eli:"We made it. All that building, all that waiting... and it wasn't silly at all. I think I finally get it.",
      final:true,
      teaching:"Noah obeyed when it made no sense, built for years while everyone laughed, gathered the animals two by two, and waited out the long storm — all because he trusted. When the family and animals finally stepped onto dry land, God set a rainbow in the sky as a promise never to flood the whole earth again. Obedience and faith aren't about understanding everything first. They're about trusting the One who does, and doing the next right thing — even when it looks strange to everyone else." },
   ] },

   { title:"The Strangest Blueprint", stops: [
    { place:"A World Gone Wrong", tag:"One faithful man in a dark time",
      eli:"Build a giant boat on dry land with no rain in sight? That's the silliest instruction I've ever heard. I'd ignore it.",
      spots:[
        { ico:"🌍", label:"Look at the world", lead:"The earth has filled up with cruelty and wrong.",
          clue:"Yet one man, Noah, quietly keeps walking faithfully with God." },
        { ico:"🙏", label:"Meet Noah", lead:"God decides to begin again, and looks for someone he can trust.",
          clue:"He chooses Noah — not the strongest or richest, but the one who obeys." },
      ],
      ask:"Why does God choose Noah?",
      options:["He was the wealthiest man alive","He walked faithfully with God","He was the best sailor"],
      answer:1,
      hint:"In a world gone wrong, Noah stood out because he walked faithfully with God.",
      sidequest:{ title:"Do right when it's unpopular", desc:"Everyone around is cutting a corner. Quietly do the honest thing even though no one else is?",
        lesson:"You do right while others don't. Eli learns that faithfulness sometimes means standing alone.", badge:"helper" } },

    { place:"The Instructions", tag:"A blueprint that made no sense",
      eli:"Wait — he wrote down the EXACT measurements? For a boat? Nowhere near water?",
      spots:[
        { ico:"📐", label:"Read the plans", lead:"God gives Noah a detailed design: a huge ark of wood, with rooms, a door, and a window.",
          clue:"It's enormous — big enough for his family and pairs of every kind of animal." },
        { ico:"🔨", label:"Start the work", lead:"Noah gathers wood and begins to build, far from any sea.",
          clue:"It makes no sense to anyone — but Noah simply does exactly what God said." },
      ],
      ask:"What does God tell Noah to build?",
      options:["A giant boat, the ark","A tall tower","A stone wall"],
      answer:0,
      hint:"God gives Noah the plans for an ark — an enormous wooden boat.",
      sidequest:null },

    { place:"Years of Hammering", tag:"Obeying while everyone laughs",
      eli:"People are LAUGHING at him... and he just keeps building? For YEARS? Why not quit?",
      spots:[
        { ico:"😆", label:"Hear the mockers", lead:"Neighbors point and laugh at the giant boat on dry land.",
          clue:"There's no sea and no rain — building it looks utterly foolish." },
        { ico:"💪", label:"Watch Noah keep going", lead:"Day after day, year after year, Noah keeps building.",
          clue:"He trusts God more than he fears the laughter, and he never stops." },
      ],
      ask:"How do people react while Noah builds the ark?",
      options:["They help him eagerly","They laugh and mock him","They ignore him completely"],
      answer:1,
      hint:"With no sea and no rain, the neighbors mock Noah for building a giant boat.",
      sidequest:null },

    { place:"Faith That Keeps Hammering", tag:"Obedience before it makes sense",
      eli:"He obeyed for YEARS while everyone laughed, before a single drop fell. That's a kind of faith I want to have.",
      final:true,
      teaching:"God asked Noah to do something that made no sense at all — build a massive boat far from any water — and Noah simply obeyed, hammering away for years while his neighbors laughed. He didn't wait to understand it all first; he trusted the One who did. That's faith: doing the next right thing God asks, even when it looks foolish to everyone around you and the rain hasn't started yet." },
   ] },

   { title:"Two by Two", stops: [
    { place:"The Gathering", tag:"Animals coming from everywhere",
      eli:"How do you get every kind of animal onto one boat? That's impossible — this plan is falling apart.",
      spots:[
        { ico:"🦓", label:"Watch the animals come", lead:"From every direction, animals begin arriving at the finished ark.",
          clue:"They come in pairs — two of every kind, a male and a female — led by God, not chased by Noah." },
        { ico:"🐘", label:"See them board", lead:"Pair by pair, the animals file up the ramp into the ark.",
          clue:"What looked impossible happens quietly, exactly as God said it would." },
      ],
      ask:"How do the animals come to the ark?",
      options:["Two by two, a pair of each kind","All of one kind at a time","Noah hunts them down"],
      answer:0,
      hint:"The animals come in pairs — two of every kind, male and female.",
      sidequest:{ title:"Welcome the ones left out", desc:"Some kids are being left out of a group. Go make room and bring them in?",
        lesson:"You make sure no one's left outside. Eli learns that God's rescue makes room for everyone who will come.", badge:"helper" } },

    { place:"The Family Boards", tag:"Eight who trusted",
      eli:"So the whole world laughed... and only Noah's little family actually got on board?",
      spots:[
        { ico:"👨‍👩‍👦", label:"Count the family", lead:"Noah, his wife, his three sons, and their wives step aboard.",
          clue:"Just eight people in all — the ones who believed and obeyed." },
        { ico:"🍎", label:"Check the supplies", lead:"They bring food for the family and all the animals.",
          clue:"Everything God told them to gather is ready. They've obeyed down to the last detail." },
      ],
      ask:"How many people go into the ark?",
      options:["Eight — Noah's family","Just Noah alone","A hundred neighbors"],
      answer:0,
      hint:"Noah, his wife, his three sons and their wives — eight people in all.",
      sidequest:null },

    { place:"God Shuts the Door", tag:"Safe inside before the storm",
      eli:"Noah didn't even close the door himself — GOD did? Then the rain came?",
      spots:[
        { ico:"🚪", label:"See the door close", lead:"When everyone is safely inside, the LORD himself shuts the door of the ark.",
          clue:"They are sealed in, safe, before a single drop has fallen." },
        { ico:"🌧️", label:"Feel the first rain", lead:"Then the sky opens and the rain begins.",
          clue:"The obedience of years is what carried them safely inside in time." },
      ],
      ask:"Who shuts the door of the ark?",
      options:["God himself","Noah's eldest son","The strongest animal"],
      answer:0,
      hint:"The LORD himself shuts them safely inside before the rain begins.",
      sidequest:null },

    { place:"Safe Inside", tag:"Where obedience led",
      eli:"All those years of trusting and obeying... they led right here, to being safe inside when the storm hit. It was worth it.",
      final:true,
      teaching:"When the finished ark stood ready, the animals came two by two, Noah's family of eight stepped aboard, and God himself shut the door — sealing them safely in before the first raindrop fell. Every strange instruction Noah had obeyed for years led to this moment of shelter. Obedience isn't always understood in the middle of it. But trusting God and doing what he says has a way of bringing you exactly where you need to be." },
   ] },

   { title:"The Dove and the Rainbow", stops: [
    { place:"Forty Days of Rain", tag:"Waiting out the long storm",
      eli:"Stuck on a boat in endless rain? I'd be so done. When does this part just... end?",
      spots:[
        { ico:"🌊", label:"Watch the waters rise", lead:"Rain falls for forty days and nights until water covers everything.",
          clue:"The ark floats safely on top of the deep, carrying its precious cargo." },
        { ico:"⏳", label:"Feel the long wait", lead:"Even after the rain stops, they wait for the waters to go down.",
          clue:"Faith isn't only obeying — sometimes it's the patience to wait for God's timing." },
      ],
      ask:"How long did the rain fall?",
      options:["Forty days and forty nights","A single afternoon","A whole year"],
      answer:0,
      hint:"The rain fell for forty days and forty nights.",
      sidequest:{ title:"Keep someone company while they wait", desc:"A friend is stuck waiting on something hard and slow. Wait it out beside them?",
        lesson:"You sit with someone through a long wait. Eli learns that faith includes patience when nothing seems to be happening.", badge:"helper" } },

    { place:"The Dove Returns", tag:"A leaf that means hope",
      eli:"He sent out a bird to check for land? Clever. What did it find?",
      spots:[
        { ico:"🕊️", label:"Send out the birds", lead:"Noah sends a raven, then a dove, to see if the waters have gone down.",
          clue:"The dove comes back the second time carrying a fresh olive leaf in its beak." },
        { ico:"🌿", label:"Read the sign", lead:"An olive leaf means plants are growing again.",
          clue:"When Noah sends the dove once more and it doesn't return, he knows the land is dry." },
      ],
      ask:"What does the dove bring back to the ark?",
      options:["A fresh olive leaf","A fish","A stone"],
      answer:0,
      hint:"The dove returns with a fresh olive leaf — a sign the land is drying and plants are growing.",
      sidequest:null },

    { place:"The Promise in the Sky", tag:"A new beginning, sealed by God",
      eli:"They finally step onto dry land — and God paints a RAINBOW as a promise? What a way to end it.",
      spots:[
        { ico:"👣", label:"Step onto dry land", lead:"Noah, his family, and all the animals come out onto the fresh, dry earth.",
          clue:"The first thing Noah does is stop and worship the God who saved them." },
        { ico:"🌈", label:"See the rainbow", lead:"God sets a rainbow in the clouds.",
          clue:"It's his promise: never again will a flood destroy the whole earth." },
      ],
      ask:"What is the rainbow a sign of?",
      options:["God's promise to never flood the whole earth again","A coming storm","The way back to the ark"],
      answer:0,
      hint:"God sets the rainbow as the sign of his promise never to flood the whole earth again.",
      sidequest:null },

    { place:"A Promise Kept", tag:"Where faithful obedience leads",
      eli:"Obey, trust, wait... and it ends with a rainbow and a promise. God was faithful the whole time — I just couldn't see the end yet.",
      final:true,
      teaching:"Noah waited out the long storm, sent out the dove, and at last stepped onto dry ground with his family and the animals. He worshiped — and God answered with a rainbow, a promise never to flood the whole earth again. All that trusting and obeying, even the patient waiting, led to a fresh start sealed by God's own promise. Faithful obedience may feel long in the middle, but it always ends up somewhere good in the hands of a God who keeps his word." },
   ] },
  ]
};
CASE_NOAH.stops = CASE_NOAH.variants[0].stops;


/* =====================================================================
   CASE 7 — DANIEL · "The Lions' Den"
   Theme: Courage & Faithfulness.  Eli's flaw: hides who he is to fit in / avoid trouble.
   Story-moments: The King's Court → The Trap → The Open Window → The Den → Morning
   Unlocks the "Daniel in the Lions' Den" scene.
   ===================================================================== */
const CASE_DANIEL = {
  id: "daniel",
  title: "The Lions' Den",
  theme: "Courage & Faithfulness",
  badges: {
    firstSteps: { icon:"👣", name:"First Steps",       desc:"Began the journey" },
    brave:      { icon:"🦁", name:"Lion Heart",         desc:"Solved a stop with no hints" },
    thorough:   { icon:"🔍", name:"Careful Seeker",     desc:"Investigated every spot at a location" },
    steadfast:  { icon:"🕊️", name:"Stood Firm",         desc:"Held to what's right through a detour" },
    helper:     { icon:"🤝", name:"Kind Helper",        desc:"Completed a side quest" },
    delivered:  { icon:"👑", name:"Delivered",          desc:"Finished the whole case" },
  },
  detours: [
    { place:"The Hide-It Road",
      scene:"Eli figures the safe move is to blend in — 'just pray quietly, or skip it this once, so nobody notices.' But pretending to be someone you're not leads in a nervous circle and never feels right.",
      lesson:"Courage isn't loud, but it is honest. You can be faithful and kind at the same time. You turn back, ready to stand firm." },
    { place:"The Please-Everyone Path",
      scene:"Eli tries to keep everyone happy and bend whichever way the crowd leans. But you can't follow God and the crowd in opposite directions at once — the path just doubles back.",
      lesson:"Sometimes doing right means someone won't be pleased, and that's okay. You find your footing and rejoin the trail." },
  ],
  // Four trails converging on the lions' den (random pick in startCase).
  variants: [
   { title:"The Lions' Den", stops: [
    { place:"The King's Court", tag:"A faithful man far from home",
      eli:"Daniel's a foreigner serving a foreign king? I'd just keep my head down and blend in so nobody bugs me.",
      spots:[
        { ico:"⭐", label:"Watch him work", lead:"Daniel serves the king so honestly and wisely that he's promoted above everyone.",
          clue:"He does everything with excellence — and never hides who he is or who he prays to." },
        { ico:"🙏", label:"See his habit", lead:"Three times a day, Daniel kneels and prays toward home, thanking God.",
          clue:"Rain or shine, promotion or danger, his faithful habit never changes." },
        { ico:"😠", label:"Notice the officials", lead:"Other officials are jealous of Daniel and want him gone.",
          clue:"They search for any fault — but find none, except that he'll always be faithful to his God." },
      ],
      ask:"Why can't the jealous officials find anything to accuse Daniel of?",
      options:["He does everything honestly and faithfully","He hides all his mistakes well","He bribes them to stay quiet"],
      answer:0,
      hint:"The 'watch him work' clue is the key — he serves with excellence and honesty, so there's no fault to find.",
      sidequest:{ title:"Encourage a nervous friend", desc:"A younger servant is scared to be honest about his faith. Sit with him and steady him?",
        lesson:"You help a friend find courage to be himself. Eli sees that being faithful is easier when we help each other stand.", badge:"helper" } },

    { place:"The Trap", tag:"A law made to catch a good man",
      eli:"Wait, they tricked the king into a law that says only pray to HIM for 30 days? That's a trap aimed right at Daniel!",
      spots:[
        { ico:"📜", label:"Read the new law", lead:"The officials flatter the king into signing a law: for thirty days, pray only to the king.",
          clue:"Anyone who prays to God instead will be thrown to the lions." },
        { ico:"🖋️", label:"See the king's seal", lead:"Once signed, the law of the land cannot be changed — not even by the king.",
          clue:"The trap is set. Now everyone waits to see what Daniel will do." },
        { ico:"👀", label:"Spot the watchers", lead:"The jealous officials linger near Daniel's house, waiting.",
          clue:"They're sure he'll keep praying to God — and they mean to catch him." },
      ],
      ask:"When Daniel hears about the law, what does he do?",
      options:["Stops praying to stay safe","Keeps praying to God, just as always","Prays only in secret so no one sees"],
      answer:1,
      hint:"Think back to his 'habit' — three times a day, windows open. His faithfulness doesn't change because of a threat.",
      sidequest:null },

    { place:"The Open Window", tag:"Faithful in plain sight",
      eli:"He could at least close the window and pray quietly! ...But he's not even hiding it. That's kind of amazing, honestly.",
      spots:[
        { ico:"🪟", label:"See the open window", lead:"Daniel goes home, opens his windows toward Jerusalem, and prays as he always has.",
          clue:"He doesn't hide and he doesn't show off — he simply stays faithful, out in the open." },
        { ico:"🙏", label:"Hear his prayer", lead:"He gives thanks to God, the same as every other day.",
          clue:"Courage here isn't a big brave speech — it's quietly doing the right thing anyway." },
        { ico:"🏃", label:"Watch the officials run", lead:"The watchers see him and hurry straight to the king.",
          clue:"They've caught him, and now the king is trapped by his own unchangeable law." },
      ],
      ask:"How does Daniel show courage in this moment?",
      options:["By fighting the officials off","By quietly staying faithful, out in the open","By running away to another city"],
      answer:1,
      hint:"The 'open window' clue says it — he doesn't hide and doesn't show off; he just keeps doing right.",
      sidequest:{ title:"Speak up kindly", desc:"A servant mocks Daniel for praying. Stand beside Daniel and answer with kindness, not anger?",
        lesson:"You defend a friend gently instead of harshly. Eli learns that courage and kindness belong together.", badge:"helper" } },

    { place:"The Den", tag:"The hardest night",
      eli:"The king likes Daniel but HAS to throw him in? And now we just... wait by a den of lions all night? This is the scariest part.",
      spots:[
        { ico:"😔", label:"See the king's sorrow", lead:"The king is grieved — he tried all day to save Daniel, but the law can't be changed.",
          clue:"As Daniel is lowered in, the king says, 'May your God, whom you serve faithfully, rescue you.'" },
        { ico:"🪨", label:"Watch the stone", lead:"A great stone is rolled over the mouth of the den and sealed.",
          clue:"Now nothing can be done but wait, and trust." },
        { ico:"🌙", label:"Keep the long vigil", lead:"The king can't eat or sleep all night, hoping.",
          clue:"At the first light of morning, he rushes to the den to see." },
      ],
      ask:"What does the king hope for as he waits all night?",
      options:["That Daniel's God will rescue him","That the lions aren't hungry","That the officials will change the law"],
      answer:0,
      hint:"Read what the king says at the 'sorrow' clue — he hopes the God Daniel serves will rescue him.",
      sidequest:null },

    { place:"Morning", tag:"The mouths of the lions are shut",
      eli:"He's ALIVE! The lions didn't touch him! I came in wanting to hide who I was... and Daniel just showed me the braver way.",
      final:true,
      teaching:"Daniel served faithfully in a foreign land, and when a law was made to trap him, he kept praying to God exactly as he always had — not hiding, not showing off, just quietly faithful even when it could cost him everything. Thrown to the lions, he trusted God through the long dark night. In the morning the king found him unharmed: God had shut the lions' mouths. Courage isn't never being afraid. It's staying true to God and doing the next right thing — especially when it's hard, and especially when others are watching." },
   ] },

   { title:"The Jealous Plot", stops: [
    { place:"The Palace", tag:"A servant too good to ignore",
      eli:"If everyone else at work resented me, I'd just blend in and stop standing out. Way safer.",
      spots:[
        { ico:"📈", label:"Watch Daniel work", lead:"Daniel serves King Darius so wisely and honestly that he rises above all the other officials.",
          clue:"The king plans to put him in charge of the whole kingdom." },
        { ico:"🤨", label:"Feel the jealousy", lead:"The other officials burn with envy at Daniel's success.",
          clue:"They start hunting for something — anything — to use against him." },
      ],
      ask:"Why does King Darius favor Daniel above the others?",
      options:["Daniel was the king's cousin","His excellent, trustworthy work","He gave the biggest gifts"],
      answer:1,
      hint:"Daniel served so wisely and honestly that the king wanted to promote him over everyone.",
      sidequest:{ title:"Praise a rival honestly", desc:"Someone you might envy did great work. Give them real, public credit instead of grumbling?",
        lesson:"You honor someone instead of envying them. Eli learns that jealousy is a trap — and honesty is the braver road.", badge:"helper" } },

    { place:"No Fault to Find", tag:"An honest man gives no handle",
      eli:"They're digging for dirt on Daniel? Bet they find something — everybody's got a secret.",
      spots:[
        { ico:"🔎", label:"Watch them investigate", lead:"The jealous officials search Daniel's work for any mistake or corruption.",
          clue:"They find nothing — he is completely faithful and trustworthy." },
        { ico:"🙏", label:"Spot their only angle", lead:"They realize the only way to trap him is through his faith.",
          clue:"'We'll never trap Daniel unless it has to do with the law of his God.'" },
      ],
      ask:"Why can't the officials find anything to accuse Daniel of?",
      options:["He was too sneaky","He was honest and faithful — no corruption","He paid them off"],
      answer:1,
      hint:"Daniel was so trustworthy that they found no fault — the only angle left was his faith.",
      sidequest:null },

    { place:"The Trick Law", tag:"A trap dressed up as an honor",
      eli:"A law that says pray only to the KING for a month? That's a trap with Daniel's name on it.",
      spots:[
        { ico:"📜", label:"Read the new law", lead:"The officials flatter the king into signing a law they invented.",
          clue:"For thirty days, anyone who prays to anyone but the king will be thrown into the lions' den." },
        { ico:"🔒", label:"See the catch", lead:"Once the king signs, the law cannot be changed — not even by him.",
          clue:"They know Daniel prays to God every day. The trap is set." },
      ],
      ask:"What does the trick law forbid for thirty days?",
      options:["Praying to anyone but the king","Leaving the city","Eating bread"],
      answer:0,
      hint:"The law bans praying to anyone except the king — aimed straight at Daniel's daily prayers.",
      sidequest:null },

    { place:"A Trap Set for a Good Man", tag:"Faithfulness in the crosshairs",
      eli:"They couldn't find ANYTHING wrong with him — so they made being faithful against the law. That tells you how good he really was.",
      final:true,
      teaching:"Daniel's enemies searched and searched for a flaw, and found none — he was simply honest and faithful in everything. So they made a law that turned his very faithfulness into a crime. Being good doesn't make everyone happy; sometimes it makes jealous people angry. But a life with nothing to hide gives no handle to those who'd trip you up. The trap was set — and Daniel's integrity would meet it head-on." },
   ] },

   { title:"The Open Window", stops: [
    { place:"The News Arrives", tag:"A choice: hide, or stay true",
      eli:"Okay, if praying could get me thrown to lions? I'd just skip it quietly for a month. Nobody would blame me.",
      spots:[
        { ico:"📰", label:"Bring Daniel the news", lead:"Daniel learns the trap law has been signed and sealed.",
          clue:"He knows exactly what it means — and exactly what he'll do." },
        { ico:"🕊️", label:"Watch his response", lead:"Daniel doesn't panic, argue, or protest.",
          clue:"He simply goes home to pray, just as he always has." },
      ],
      ask:"What does Daniel do when he hears about the law?",
      options:["Stops praying to stay safe","Keeps praying to God as always","Flees the city"],
      answer:1,
      hint:"Daniel doesn't hide — he goes home and keeps praying just as he always had.",
      sidequest:{ title:"Keep a good habit under pressure", desc:"Doing the right thing just got harder and less popular. Keep it up quietly anyway?",
        lesson:"You hold to what's right even when it's suddenly costly. Eli learns that faithfulness means not dropping good habits the moment they're tested.", badge:"helper" } },

    { place:"Three Times a Day", tag:"Faithful in plain sight",
      eli:"He opened the windows? He's not even trying to HIDE it? That's either brave or crazy...",
      spots:[
        { ico:"🪟", label:"See the open windows", lead:"Daniel goes to his upstairs room, where the windows open toward Jerusalem.",
          clue:"He doesn't sneak — he prays the same open way he always has." },
        { ico:"🙇", label:"Count his prayers", lead:"Daniel kneels and prays and gives thanks to God.",
          clue:"Three times a day, just as before — not hiding, not showing off, simply faithful." },
      ],
      ask:"How often does Daniel pray, even under the new law?",
      options:["Three times a day, as always","Once, in secret","Never again"],
      answer:0,
      hint:"Daniel keeps praying three times a day at his open window, exactly as he always had.",
      sidequest:null },

    { place:"Caught and Condemned", tag:"When doing right costs everything",
      eli:"They caught him... and even the KING can't undo his own law? So Daniel really gets thrown in?",
      spots:[
        { ico:"👀", label:"See them catch him", lead:"The officials spy Daniel praying and rush to accuse him before the king.",
          clue:"They remind the king his law cannot be changed." },
        { ico:"😟", label:"Watch the king's dismay", lead:"Darius is horrified — he likes Daniel and tries all day to save him.",
          clue:"But the law is fixed, and Daniel is led to the lions' den." },
      ],
      ask:"What happens when Daniel is caught praying?",
      options:["He is thrown into the lions' den","He is quietly forgiven","He is made king"],
      answer:0,
      hint:"Trapped by his own unchangeable law, the king must have Daniel thrown to the lions.",
      sidequest:null },

    { place:"He Would Not Hide", tag:"Faithful, whatever the cost",
      eli:"He could've prayed with the curtains shut and stayed safe. Instead he stayed true, right out in the open. That's the braver way — the way I want to be.",
      final:true,
      teaching:"Daniel could have skipped praying for a month, or done it in secret with the windows shut, and no one would have blamed him. Instead he kept praying openly, three times a day, exactly as always — not to show off, just refusing to hide who he was. Real courage isn't loud. It's quietly staying true to God even when it might cost you everything. Daniel wouldn't hide — and God would meet him in the dark." },
   ] },

   { title:"The Sleepless King", stops: [
    { place:"A King Who Cannot Sleep", tag:"The long night of waiting",
      eli:"So the powerful king just shrugs and moves on, right? Daniel's on his own now.",
      spots:[
        { ico:"🌙", label:"Watch the king all night", lead:"King Darius, who loves Daniel, is heartbroken over the trap he fell into.",
          clue:"He refuses food and entertainment and cannot sleep a wink all night long." },
        { ico:"🤞", label:"Hear his hope", lead:"The king clings to one hope as he paces.",
          clue:"'May the God you serve so faithfully rescue you,' he had told Daniel." },
      ],
      ask:"How does King Darius spend the night?",
      options:["Feasting happily","Sleepless and worried, refusing to eat","Away on a trip"],
      answer:1,
      hint:"Darius is so distressed he can't eat or sleep, hoping Daniel's God will rescue him.",
      sidequest:{ title:"Sit up with a worried friend", desc:"Someone is up all night sick with worry. Keep them company and share their hope?",
        lesson:"You share someone's long, worried night. Eli learns that hope is easier to hold when we don't wait in the dark alone.", badge:"helper" } },

    { place:"In the Den", tag:"Not alone among the lions",
      eli:"He's in there with real, hungry lions all night. How is he not... you know?",
      spots:[
        { ico:"🦁", label:"Look into the den", lead:"Daniel spends the whole night among the lions.",
          clue:"God sends an angel who shuts the lions' mouths, so they do him no harm." },
        { ico:"😌", label:"See Daniel's peace", lead:"Daniel rests through the night, unharmed.",
          clue:"He is not alone in the dark — God is right there with him." },
      ],
      ask:"What keeps Daniel safe among the lions?",
      options:["An angel who shuts the lions' mouths","A thick iron cage","The lions weren't hungry"],
      answer:0,
      hint:"God sends an angel to shut the lions' mouths so they can't harm Daniel.",
      sidequest:null },

    { place:"Dawn at the Den", tag:"The morning after the dark",
      eli:"The king RAN to the den at sunrise? And Daniel actually answers back — alive?!",
      spots:[
        { ico:"🌅", label:"Race to the den at dawn", lead:"At first light the king hurries to the den and calls out anxiously.",
          clue:"'Daniel — was your God able to rescue you from the lions?'" },
        { ico:"🎉", label:"Hear Daniel answer", lead:"A voice comes up from the den.",
          clue:"'My God sent his angel and shut the lions' mouths.' Daniel is completely unharmed." },
      ],
      ask:"What does the king find at dawn?",
      options:["Daniel alive and unharmed","An empty den","Only footprints"],
      answer:0,
      hint:"At dawn Daniel answers from the den — alive and unharmed; God shut the lions' mouths.",
      sidequest:null },

    { place:"Alive at Dawn", tag:"God in the long dark night",
      eli:"He stayed faithful, trusted God through the scariest night imaginable — and walked out alive. Being true was worth it after all.",
      final:true,
      teaching:"While a worried king lay sleepless all night, Daniel spent that same night among lions — and was not alone. God sent an angel to shut their mouths, and at dawn Daniel walked out unharmed. Staying faithful had led him into real danger, through a long dark night, and out the other side into the morning. Courage doesn't mean the dark night never comes. It means trusting that God is with you in it — and that morning is coming." },
   ] },
  ]
};
CASE_DANIEL.stops = CASE_DANIEL.variants[0].stops;


/* =====================================================================
   CASE 8 — THE EMPTY TOMB · "Roll the Stone Away"
   Theme: Hope.  Eli's flaw: gives up when things look hopeless.
   Handled gently for kids — grief is real, but the darkest moment isn't the end.
   Story-moments: The Saddest Evening → Before Dawn → The Stone Is Rolled Away →
                  The Good News → He Is Risen
   Unlocks the "Roll the Stone Away" scene.
   ===================================================================== */
const CASE_TOMB = {
  id: "tomb",
  title: "Roll the Stone Away",
  theme: "Hope",
  badges: {
    firstSteps: { icon:"👣", name:"First Steps",       desc:"Began the journey" },
    brave:      { icon:"🌅", name:"First Light",        desc:"Solved a stop with no hints" },
    thorough:   { icon:"🔍", name:"Careful Seeker",     desc:"Investigated every spot at a location" },
    steadfast:  { icon:"🕊️", name:"Kept Hoping",        desc:"Held onto hope through a detour" },
    helper:     { icon:"🤝", name:"Kind Helper",        desc:"Completed a side quest" },
    delivered:  { icon:"💛", name:"Hope Carrier",       desc:"Finished the whole case" },
  },
  detours: [
    { place:"The Give-Up Grove",
      scene:"When things look this bad, Eli figures, why even bother — just stay home in the dark. But sitting still in the dark never once changed the dark; the little grove just loops back on itself.",
      lesson:"Hope doesn't mean pretending things aren't sad. It means still showing up, even when you can't see how it'll turn out. You turn back toward the tomb." },
    { place:"The It's-Too-Late Trail",
      scene:"'It's over,' Eli sighs. 'Nothing good can come now.' But the 'too late' path just circles around and around, never arriving anywhere.",
      lesson:"Sometimes the very best thing comes right after the very worst — so it's worth staying till morning. You find the trail again." },
  ],
  // Four independent eyewitness trails, all converging on the risen Christ. Picked at
  // random each time the case opens (see startCase) — the women, the runners, the
  // guards, and the Emmaus travelers each reach the same empty tomb a different way.
  variants: [
   { title:"Roll the Stone Away", stops: [
    { place:"The Saddest Evening", tag:"When love shows up anyway",
      eli:"Their teacher and friend has died. Everyone's heartbroken and scared, hiding inside. Honestly? I'd probably give up too.",
      spots:[
        { ico:"💔", label:"Sit with their sadness", lead:"Jesus' friends are grieving. Their teacher, who they loved, is gone, and the world feels dark.",
          clue:"Being sad isn't wrong — even brave, faithful people cry when they lose someone they love." },
        { ico:"🚪", label:"See the locked room", lead:"Most of the friends have shut themselves away, afraid of what might happen next.",
          clue:"Fear makes us want to hide. But hiding never rolled a single stone away." },
        { ico:"🕯️", label:"Notice the women", lead:"A few women who loved Jesus quietly gather sweet spices to care for his body.",
          clue:"Even in their sadness, their love wants to do one last kind thing for him." },
      ],
      ask:"What do the grieving women decide to do, even though they're heartbroken?",
      options:["Go to the tomb to lovingly care for him","Stay home and give up","Pretend nothing sad has happened"],
      answer:0,
      hint:"Look at the 'notice the women' clue — their love wants to do one last kind thing, so they get ready to go.",
      sidequest:{ title:"Sit with a sad friend", desc:"Someone nearby is crying and alone. Just sit beside them, no fixing, only company?",
        lesson:"You keep a sad person company instead of walking past. Eli learns that showing up matters even when you can't make it better.", badge:"helper" } },

    { place:"Before Dawn", tag:"Walking toward the impossible",
      eli:"It's dark, they're sad, AND there's a giant stone they can't move... but they're still walking. Why keep going?",
      spots:[
        { ico:"🌑", label:"Walk in the dark", lead:"Very early, while it's still dark, the women set out for the tomb.",
          clue:"They don't wait for everything to feel okay — they go while it's still hard." },
        { ico:"🪨", label:"Worry about the stone", lead:"On the way they fret: a huge, heavy stone seals the tomb's door.",
          clue:"'Who will roll the stone away for us?' they ask each other. They have no idea how." },
        { ico:"💗", label:"Follow their love", lead:"They keep walking anyway, spices in hand, love pulling them forward.",
          clue:"Sometimes you take the next step before you can see how it all works out." },
      ],
      ask:"What worries the women as they walk toward the tomb?",
      options:["That it might rain","The huge stone they can't move","That they forgot the spices"],
      answer:1,
      hint:"The 'worry about the stone' clue has it — a huge, heavy stone seals the door and they can't move it.",
      sidequest:null },

    { place:"The Stone Is Rolled Away", tag:"The worry undone",
      eli:"Wait — the stone they were so worried about... is already moved? The thing they thought was impossible is just... handled?",
      spots:[
        { ico:"↔️", label:"See the moved stone", lead:"They arrive — and the great stone has already been rolled away from the door.",
          clue:"The very thing they worried about the whole walk was taken care of before they got there." },
        { ico:"🕳️", label:"Look inside", lead:"They peek into the tomb, hearts pounding. It's empty.",
          clue:"Where they expected only sadness, something completely unexpected is waiting." },
        { ico:"🧻", label:"Notice the folded cloths", lead:"The linen cloths lie neatly folded where his body had been.",
          clue:"This is no robbery — everything is calm and in order. Something wonderful, not terrible, has happened." },
      ],
      ask:"What do the women find when they reach the tomb?",
      options:["The stone rolled away and the tomb empty","The stone still sealing the door","A crowd blocking the way"],
      answer:0,
      hint:"The 'moved stone' and 'look inside' clues together: the stone's rolled away and the tomb is empty.",
      sidequest:null },

    { place:"The Good News", tag:"Fear turns to joy",
      eli:"An angel! And instead of 'bad news,' it's the BEST news. And then — go tell everyone? They get to be the messengers?",
      spots:[
        { ico:"✨", label:"Hear the angel", lead:"A shining angel greets them: 'Don't be afraid. He is not here — he is risen!'",
          clue:"The saddest weekend of their lives turns, in one sentence, into the most joyful morning." },
        { ico:"💛", label:"Feel it change", lead:"Their fear and grief start melting into a joy almost too big to hold.",
          clue:"Hope didn't erase their sadness — it met them right inside it and turned it around." },
        { ico:"🏃‍♀️", label:"Watch them run", lead:"The angel says, 'Go quickly and tell the others!' — and they run.",
          clue:"The ones who showed up in the dark get to be the very first to carry the good news." },
      ],
      ask:"What does the angel tell the women to do?",
      options:["Keep it a secret","Go quickly and tell the others the good news","Wait quietly at the tomb"],
      answer:1,
      hint:"The 'watch them run' clue — the angel sends them to go quickly and tell everyone.",
      sidequest:{ title:"Share a bit of good news", desc:"You know something that would cheer someone up. Go out of your way to tell them?",
        lesson:"You carry good news to someone who needed it. Eli sees that hope grows bigger the moment you share it.", badge:"helper" } },

    { place:"He Is Risen", tag:"The best thing after the worst",
      eli:"I walked in ready to give up when things looked hopeless. And the whole story was pointing at ONE thing: the dark part wasn't the end. That changes everything.",
      final:true,
      teaching:"On the saddest evening, everything looked finished — their friend was gone, a huge stone sealed the tomb, and it was easy to give up. But a few people loved enough to keep showing up, walking through the dark toward a problem far too big for them. When they arrived, the impossible stone was already rolled away and the tomb was empty: Jesus was alive. Their grief turned to joy, and they became the first to carry that hope to everyone else. That's what hope is. Not pretending the hard part isn't hard — but trusting that the dark part isn't the end of the story, and still taking the next step toward morning." },
   ] },

   { title:"The Runners", stops: [
    { place:"The Locked Room", tag:"Where the disciples hide, afraid",
      eli:"The women say the tomb is EMPTY and he's alive? Sounds too good to be true. Why get my hopes up just to be let down?",
      spots:[
        { ico:"🚪", label:"Enter the hidden room", lead:"Most of Jesus' friends have locked themselves away, sure the story is over.",
          clue:"Fear had them convinced nothing good could happen now." },
        { ico:"🏃‍♀️", label:"Hear the women's report", lead:"Mary Magdalene bursts in, breathless.",
          clue:"'The stone is rolled away — the tomb is empty!' she cries. Most brush it off as wishful talk." },
        { ico:"👀", label:"Watch Peter and John", lead:"Two of them can't sit still.",
          clue:"Peter and John decide they must see for themselves, and bolt out the door." },
      ],
      ask:"What do Peter and John do when they hear the women's report?",
      options:["Ignore it and stay hidden","Run to the tomb to see for themselves","Report it to the soldiers"],
      answer:1,
      hint:"The 'watch Peter and John' clue — they can't sit still, and run out to see for themselves.",
      sidequest:{ title:"Encourage a doubter", desc:"A friend is scared to hope again after being let down. Gently urge them to come and see for themselves?",
        lesson:"You coax a discouraged friend to take one more look. Eli learns hope sometimes just needs someone willing to go with you.", badge:"helper" } },

    { place:"The Race to the Tomb", tag:"Two friends run through the morning",
      eli:"They're actually RUNNING? Okay... maybe there's something to this after all.",
      spots:[
        { ico:"👟", label:"Keep pace with the runners", lead:"Both men run as hard as they can down the road.",
          clue:"John, the younger, outruns Peter and reaches the tomb first." },
        { ico:"🪨", label:"See the open door", lead:"The great sealing stone is already rolled aside.",
          clue:"The thing that should have stopped them is standing wide open." },
      ],
      ask:"Who reaches the empty tomb first?",
      options:["Peter","John, the younger","They arrive together"],
      answer:1,
      hint:"The clue says John, the younger, outran Peter and got there first.",
      sidequest:null },

    { place:"Inside the Tomb", tag:"What the linen cloths reveal",
      eli:"They actually went IN? What did they find — is it really empty?",
      spots:[
        { ico:"🧻", label:"Look at the linen cloths", lead:"The burial wrappings are still there — but empty.",
          clue:"The cloths lie neatly, and the head cloth is folded by itself, off to the side." },
        { ico:"💡", label:"Watch John's face", lead:"John steps inside, sees, and understands.",
          clue:"No grave-robber leaves the wrappings folded and tidy. Something far greater happened here." },
      ],
      ask:"What convinces John that this was no robbery?",
      options:["The neatly folded cloths left behind","Muddy footprints","A ransom note"],
      answer:0,
      hint:"The 'linen cloths' clue — robbers don't fold the wrappings; John sees the tidy tomb and believes.",
      sidequest:null },

    { place:"He Saw and Believed", tag:"Doubt turns to faith",
      eli:"I walked in sure it was too good to be true. But they ran, they looked, and they believed. Maybe it really is okay to let yourself hope.",
      final:true,
      teaching:"When the women brought impossible news, it would have been easy to stay locked away and call it wishful thinking. But Peter and John loved enough to run and look for themselves — and the empty tomb with its neatly folded cloths turned their doubt into faith. Hope often begins with simply being willing to go and see. The dark part wasn't the end after all." },
   ] },

   { title:"The Guards' Report", stops: [
    { place:"The Sealed Tomb", tag:"Soldiers set to guard a grave",
      eli:"They put armed SOLDIERS on a tomb? Sounds like the powerful people making sure the story stays 'over.' Figures — they always win.",
      spots:[
        { ico:"🪖", label:"Inspect the guard post", lead:"Roman soldiers stand watch at the tomb.",
          clue:"The leaders feared the body might be taken, so they sealed the stone and posted a guard." },
        { ico:"🔏", label:"Examine the seal", lead:"An official seal is stamped across the stone.",
          clue:"No one could open it without Rome knowing — the grave was locked up tight." },
      ],
      ask:"Why did the leaders post soldiers at the tomb?",
      options:["To honor Jesus","To make sure no one could move the body","To keep the rain out"],
      answer:1,
      hint:"The 'guard post' clue — they feared the body would be taken, so they sealed and guarded it.",
      sidequest:{ title:"Speak up for the truth", desc:"Someone is being pressured to repeat a story they know is false. Quietly stand with the truth?",
        lesson:"You choose honesty when going along would be easier. Eli sees the truth is worth standing for, even against powerful people.", badge:"helper" } },

    { place:"The Morning Everything Shook", tag:"When the guards' watch fell apart",
      eli:"So did the tough soldiers keep it shut? ...What actually happened out there?",
      spots:[
        { ico:"🌋", label:"Feel the ground shake", lead:"At dawn the earth trembles violently.",
          clue:"An angel rolls the great stone back as if it weighs nothing at all." },
        { ico:"😨", label:"See the guards' faces", lead:"The hardened soldiers freeze in terror.",
          clue:"The mighty guards shake and fall down like dead men. Their sealed tomb is now wide open and empty." },
      ],
      ask:"What happens to the guards on Easter morning?",
      options:["They march away in triumph","They shake with fear as the tomb opens","They roll the stone shut again"],
      answer:1,
      hint:"The 'guards' faces' clue — the earthquake and angel leave the soldiers helpless; the tomb stands open.",
      sidequest:null },

    { place:"The Cover-Up", tag:"A bribe to bury the truth",
      eli:"Wait — they're going to PAY the guards to lie about it? See? The powerful always win in the end...",
      spots:[
        { ico:"💰", label:"Follow the money", lead:"The leaders meet the shaken soldiers in secret.",
          clue:"They hand over a large sum of money to say the disciples stole the body while they slept." },
        { ico:"🗣️", label:"Trace the rumor", lead:"The false story is sent out through the city.",
          clue:"But if the guards were asleep, how could they know who took him? The cover story falls apart." },
      ],
      ask:"What are the guards paid to say?",
      options:["That the disciples stole the body","That they saw an angel","That nothing happened at all"],
      answer:0,
      hint:"The 'follow the money' clue — they're bribed to claim the disciples stole the body while they slept.",
      sidequest:null },

    { place:"The Truth They Couldn't Bury", tag:"An empty tomb no one could explain",
      eli:"They sealed it, guarded it, and even paid people to lie — and STILL couldn't keep him in the grave. The truth won. I didn't think it could.",
      final:true,
      teaching:"The most powerful people around did everything they could to keep the story shut: a sealed stone, armed guards, even a bribe to spread a lie. But no seal, no soldier, and no cover-up could keep Jesus in the tomb. The empty grave they worked so hard to explain away became the very proof that He had risen. Hope isn't fragile — the truth of Easter is stronger than every power that tried to bury it." },
   ] },

   { title:"The Road to Emmaus", stops: [
    { place:"Leaving Jerusalem", tag:"Two friends walking home, heavy-hearted",
      eli:"They're leaving town, heads down, sure it's all over. Honestly? That's exactly what I'd do.",
      spots:[
        { ico:"🚶", label:"Join the two travelers", lead:"Two of Jesus' followers walk the road to a village called Emmaus.",
          clue:"They'd hoped Jesus was the one to rescue Israel — but he'd died, and now they're trudging home sad." },
        { ico:"🗨️", label:"Listen to their talk", lead:"They go over everything that happened that weekend.",
          clue:"They even mention the women's strange report of an empty tomb — but they can't bring themselves to believe it." },
      ],
      ask:"Why are the two disciples leaving Jerusalem?",
      options:["They gave up hope after Jesus died","They were chased out of the city","They were headed to a feast"],
      answer:0,
      hint:"The 'join the travelers' clue — their hope was crushed when Jesus died, so they're heading home.",
      sidequest:{ title:"Walk with the lonely", desc:"Someone nearby is trudging along downhearted and alone. Fall into step and keep them company?",
        lesson:"You walk a while beside someone low. Eli learns hope often returns when we're not left to walk the dark road alone.", badge:"helper" } },

    { place:"The Stranger on the Road", tag:"A traveler who explains everything",
      eli:"Some stranger just... joined them? And they don't even realize who he is?",
      spots:[
        { ico:"🧑", label:"Meet the stranger", lead:"A man falls into step with them along the road.",
          clue:"They don't recognize him — but he gently asks why they look so sad." },
        { ico:"📜", label:"Hear him open the scriptures", lead:"The stranger walks them through the old promises.",
          clue:"He shows how the prophets said the Messiah would suffer and then rise. Their hearts begin to burn with hope." },
      ],
      ask:"What does the stranger do as they walk together?",
      options:["Explains how the scriptures pointed to this all along","Asks them for directions","Warns them of robbers ahead"],
      answer:0,
      hint:"The 'open the scriptures' clue — he shows how the prophets foretold the Messiah would rise.",
      sidequest:null },

    { place:"The Breaking of Bread", tag:"Recognized at the table",
      eli:"They invited him to stay for supper — and THEN what? Who IS he?!",
      spots:[
        { ico:"🍞", label:"Watch him break the bread", lead:"At the table, the stranger takes bread, blesses it, and breaks it.",
          clue:"In that familiar moment, something clicks — their eyes are opened." },
        { ico:"😲", label:"See the recognition", lead:"Suddenly they know exactly who he is.",
          clue:"It's Jesus — alive! And the instant they recognize him, he vanishes from their sight." },
      ],
      ask:"When do the two travelers finally recognize the stranger?",
      options:["When he breaks the bread","When he says his name","When he shows them a map"],
      answer:0,
      hint:"The 'breaking bread' clue — their eyes are opened the moment he breaks the bread; it's Jesus, alive.",
      sidequest:null },

    { place:"Their Hearts Burned Within Them", tag:"Hope walking home",
      eli:"They started that road ready to give up — and the whole time, the risen Jesus was walking right beside them. They just couldn't see it yet. That gives me chills.",
      final:true,
      teaching:"Two friends walked away from Jerusalem with their hopes crushed, certain the story was over. But the risen Jesus fell into step beside them — unrecognized — and showed them the whole story had been leading here all along. When he broke the bread, their eyes were opened: he was alive. They ran back to Jerusalem that very night with hearts on fire. Sometimes hope is walking right beside us in the dark, long before we recognize it. The worst part was never the end." },
   ] },
  ]
};
// default stops for the home-screen card (stop count) and as a safe fallback
CASE_TOMB.stops = CASE_TOMB.variants[0].stops;


/* =====================================================================
   CASE 9 — LOAVES & FISHES · "The Loaves and Fishes"
   Theme: God Provides (generosity over worry).  Eli's flaw: worries there's
   never enough, so he keeps what he has and looks away from others' need.
   Story-moments: The Hungry Hillside → The Big Problem → The Boy's Lunch →
                  Give Thanks and Share → Twelve Baskets Left
   Unlocks the "The Loaves and Fishes" scene.
   ===================================================================== */
const CASE_LOAVES = {
  id: "loaves",
  title: "The Loaves and Fishes",
  theme: "God Provides",
  badges: {
    firstSteps: { icon:"👣", name:"First Steps",       desc:"Began the journey" },
    brave:      { icon:"🍞", name:"Enough Faith",       desc:"Solved a stop with no hints" },
    thorough:   { icon:"🔍", name:"Careful Seeker",     desc:"Investigated every spot at a location" },
    steadfast:  { icon:"🕊️", name:"Trusted Anyway",     desc:"Chose to trust through a detour" },
    helper:     { icon:"🤝", name:"Kind Helper",        desc:"Completed a side quest" },
    delivered:  { icon:"🧺", name:"Baskets Full",       desc:"Finished the whole case" },
  },
  detours: [
    { place:"The Not-Enough Nook",
      scene:"Eli's certain there's never enough to go around, so the safe move is to keep his own snack and say nothing. But counting your own little pile over and over never once made it grow.",
      lesson:"Worry whispers 'not enough' before you've even tried. Generosity says 'let's share what we have and see.' You head back to the crowd." },
    { place:"The Someone-Else's-Problem Path",
      scene:"'All these hungry people aren't really my job,' Eli decides, and slips toward the exit. But walking past someone who needs help just leads down a lonely, empty little loop.",
      lesson:"You don't have to fix everything — but you can offer something. You turn around and rejoin the others." },
  ],
  // Four trails converging on the feeding of the five thousand (random pick in startCase).
  variants: [
   { title:"The Loaves and Fishes", stops: [
    { place:"The Hungry Hillside", tag:"A huge crowd, and evening coming",
      eli:"Thousands of people, way out here, and it's getting dark and everyone's hungry. Yikes. Not my problem though, right?",
      spots:[
        { ico:"👥", label:"Count the crowd", lead:"A crowd of thousands has followed Jesus all day to hear him.",
          clue:"Five thousand men, plus women and children — a whole town's worth of hungry people." },
        { ico:"🌆", label:"Watch the sun sink", lead:"The day is almost gone, and they're far from any village.",
          clue:"There's no shop, no market, nowhere nearby to buy food for so many." },
        { ico:"😟", label:"Hear the disciples", lead:"Jesus' helpers are getting worried about all these hungry people.",
          clue:"'Send them away,' they say, 'so they can go find their own food. We can't possibly feed them all.'" },
      ],
      ask:"What do the worried disciples want to do about the hungry crowd?",
      options:["Send everyone away to find their own food","Share what little they have","Ask the crowd to wait until morning"],
      answer:0,
      hint:"Listen to the 'hear the disciples' clue — they want to send everyone away because they think they can't feed them.",
      sidequest:null },

    { place:"The Big Problem", tag:"Doing the impossible math",
      eli:"They did the math and it'd cost a fortune. When it's that big, isn't it smarter to just give up?",
      spots:[
        { ico:"🪙", label:"Count the cost", lead:"The disciples figure it would take more than half a year's pay to buy everyone even a bite.",
          clue:"By their math, it's flat-out impossible. There is nowhere near enough money." },
        { ico:"🙌", label:"Check their hands", lead:"They look around at what they actually have on hand.",
          clue:"Almost nothing. The problem feels far bigger than anything they can offer." },
        { ico:"🤔", label:"Feel the worry", lead:"The mood turns to 'we can't,' 'there's not enough,' 'it can't be done.'",
          clue:"Worry has a way of counting the problem over and over and never counting what God can do." },
      ],
      ask:"What is the disciples' attitude about feeding the crowd?",
      options:["They're sure it's impossible — there's not nearly enough","They're excited to try","They think the crowd should pay"],
      answer:0,
      hint:"Every clue here points the same way — they've decided it can't be done because there's not enough.",
      sidequest:{ title:"Encourage a discouraged friend", desc:"Someone near you has given up before even trying. Cheer them on to give it a go?",
        lesson:"You help a friend try instead of quit. Eli learns 'impossible' often just means 'not yet started.'", badge:"helper" } },

    { place:"The Boy's Lunch", tag:"A small gift, freely offered",
      eli:"Wait — one KID just offered his whole lunch? Five little loaves and two fish, for thousands? That's... actually kind of brave.",
      spots:[
        { ico:"🧺", label:"See the little basket", lead:"A boy in the crowd has a small lunch: five loaves of bread and two little fish.",
          clue:"It's not much at all — barely a meal for one growing kid." },
        { ico:"💛", label:"Watch him offer it", lead:"Instead of quietly eating it himself, the boy hands his whole lunch over to share.",
          clue:"He gives everything he has, even though it looks way too small to matter." },
        { ico:"🙄", label:"Notice the doubt", lead:"A disciple sighs, 'But what is that among so many?'",
          clue:"To worried eyes, a small gift looks useless. To Jesus, it's exactly enough to start with." },
      ],
      ask:"What does the boy do with his small lunch?",
      options:["Eats it quietly by himself","Offers his whole lunch to be shared","Sells it to the highest bidder"],
      answer:1,
      hint:"The 'watch him offer it' clue — he hands over his whole lunch to share, even though it seems too small.",
      sidequest:null },

    { place:"Give Thanks and Share", tag:"A little becomes a lot",
      eli:"He just... said thank you, and started sharing it? And it keeps GOING? The baskets aren't running out!",
      spots:[
        { ico:"🙏", label:"Hear the thanks", lead:"Jesus takes the little lunch, looks up, and gives thanks to God for it.",
          clue:"He starts with gratitude for the small thing — not complaint about how little it is." },
        { ico:"🍞", label:"Watch it multiply", lead:"He breaks the bread and fish and keeps handing it out... and out... and out.",
          clue:"The little lunch keeps coming. The more they give away, the more there is." },
        { ico:"😋", label:"See everyone eat", lead:"All across the hillside, thousands of people eat until they're full.",
          clue:"Every single person gets enough — from one boy's lunch given in love." },
      ],
      ask:"What happens as the small lunch is shared out?",
      options:["It runs out after a few people","There's more than enough — everyone eats their fill","Only the disciples get to eat"],
      answer:1,
      hint:"The 'watch it multiply' and 'see everyone eat' clues — the little lunch becomes more than enough for all.",
      sidequest:null },

    { place:"Twelve Baskets Left", tag:"More than enough",
      eli:"Twelve whole baskets LEFT OVER? I came in worried there'd never be enough for me. Turns out a little, shared, was enough for everybody.",
      final:true,
      teaching:"Five thousand hungry people, one impossible problem, and the disciples' answer was 'send them away — there's not enough.' Then one boy offered his tiny lunch, Jesus gave thanks for it, and as it was shared it became more than enough — with twelve baskets to spare. That's how God provides. You don't need to have a lot before you can help; you just need to offer what you have. Worry is always sure there won't be enough, so it holds on tight and looks away. But a small gift, given with thanks and love, has a way of stretching further than anyone counted on."
    },
   ] },

   { title:"The Impossible Problem", stops: [
    { place:"The Gathering Crowd", tag:"Thousands come to a lonely place",
      eli:"That many people showing up? I'd be counting my snacks and making sure I got mine first.",
      spots:[
        { ico:"👥", label:"Watch the crowd arrive", lead:"Thousands of people follow Jesus to a remote hillside.",
          clue:"They come hungry to hear him teach and to be healed — five thousand men, plus women and children." },
        { ico:"🌄", label:"Feel the day slip away", lead:"Jesus teaches and heals until the sun starts to sink.",
          clue:"It's getting late, everyone's hungry, and there are no shops for miles." },
      ],
      ask:"Why has the huge crowd come to this lonely place?",
      options:["To hear Jesus and be healed","To go to market","To watch a battle"],
      answer:0,
      hint:"The crowd came hungry to hear Jesus teach and to be healed.",
      sidequest:{ title:"Notice who's hungry", desc:"Someone nearby is going without while others have plenty. Quietly make sure they're included?",
        lesson:"You notice a need others walked past. Eli learns that seeing people's hunger is the first step to helping.", badge:"helper" } },

    { place:"You Feed Them", tag:"A task that feels impossible",
      eli:"'Send them away to buy their own food' — yeah, that's what I'd say. Not my problem, right?",
      spots:[
        { ico:"🗣️", label:"Hear the disciples' plan", lead:"The disciples urge Jesus to send the crowd away to find food.",
          clue:"Instead, Jesus says something startling: 'You give them something to eat.'" },
        { ico:"😳", label:"See their reaction", lead:"The disciples are stunned by the idea.",
          clue:"Feed thousands? With what? They have almost nothing." },
      ],
      ask:"What does Jesus tell the disciples to do about the hungry crowd?",
      options:["Send everyone home","Feed them themselves","Ignore the problem"],
      answer:1,
      hint:"Rather than send them away, Jesus tells the disciples, 'You give them something to eat.'",
      sidequest:null },

    { place:"The Impossible Math", tag:"Worry counts what's missing",
      eli:"See? They did the math and there's nowhere near enough. Told you — never enough to go around.",
      spots:[
        { ico:"🧮", label:"Do the numbers with Philip", lead:"Philip figures the cost of feeding everyone.",
          clue:"Even eight months' wages wouldn't buy enough bread for each person to get a bite." },
        { ico:"😔", label:"Feel the hopelessness", lead:"The disciples see only what they lack.",
          clue:"By every calculation, the problem is far too big to solve." },
      ],
      ask:"What do the disciples conclude about feeding the crowd?",
      options:["It's easy","There is nowhere near enough","They'll just share a little"],
      answer:1,
      hint:"Philip figures even months of wages couldn't buy enough — there's not nearly enough.",
      sidequest:null },

    { place:"Too Big to Fix", tag:"Where worry always stops",
      eli:"The disciples got stuck on 'not enough' — that's exactly where I always get stuck too. But I have a feeling Jesus isn't finished...",
      final:true,
      teaching:"Faced with thousands of hungry people and almost no food, the disciples did the math and came up empty: send them away, there's not enough. That's where worry always stops — counting what's missing and giving up. But 'not enough for us' is never the end of the story with God. The problem that looked far too big was about to become the setting for one of his greatest gifts." },
   ] },

   { title:"The Boy's Lunch", stops: [
    { place:"Searching the Crowd", tag:"Looking for anything at all",
      eli:"Find food in a crowd of thousands? Good luck. Everyone's hoarding their own, obviously.",
      spots:[
        { ico:"🔍", label:"Search with Andrew", lead:"The disciple Andrew moves through the crowd, hunting for any food at all.",
          clue:"Among thousands of people, hardly anyone has brought a thing." },
        { ico:"🧒", label:"Spot the one who shares", lead:"Andrew finds a single boy willing to offer what he has.",
          clue:"While grown-ups hold tight to their own, a child steps forward." },
      ],
      ask:"What does Andrew go looking for in the crowd?",
      options:["A doctor","Any food to feed people","A place to sit"],
      answer:1,
      hint:"Andrew searches the crowd for any food at all to help feed the people.",
      sidequest:{ title:"Give first", desc:"There's a little of something good to share, and everyone's waiting for someone else to start. Be the first to give?",
        lesson:"You give before anyone else will. Eli learns that generosity usually needs someone brave enough to go first.", badge:"helper" } },

    { place:"Five Loaves, Two Fish", tag:"A very small offering",
      eli:"A little kid's lunch? Five little rolls and a couple of fish? That's nothing against thousands.",
      spots:[
        { ico:"🍞", label:"Count the loaves", lead:"The boy has five small barley loaves.",
          clue:"Barley bread was the food of poor folk — this is a humble lunch." },
        { ico:"🐟", label:"Count the fish", lead:"He also has two little dried fish.",
          clue:"It's not much at all — but it's everything he has, and he's willing to give it." },
      ],
      ask:"What does the boy have to offer?",
      options:["Five loaves and two fish","A basket of gold","A jug of water"],
      answer:0,
      hint:"The boy offers his lunch: five small barley loaves and two fish.",
      sidequest:null },

    { place:"But What Is That?", tag:"The gift handed over",
      eli:"Even Andrew says 'what good is that among so many?' — and the boy hands it over anyway?",
      spots:[
        { ico:"🤲", label:"Hear Andrew's doubt", lead:"Andrew brings the boy to Jesus, unsure.",
          clue:"'But what is that among so many?' he wonders aloud." },
        { ico:"💛", label:"Watch the boy give", lead:"The boy places his whole lunch into Jesus' hands.",
          clue:"He doesn't hold back the little he has — he simply offers it." },
      ],
      ask:"What does the boy do with his small lunch?",
      options:["Eats it quickly himself","Gives it to Jesus","Hides it away"],
      answer:1,
      hint:"Despite the doubt, the boy hands his whole small lunch over to Jesus.",
      sidequest:null },

    { place:"The Little That Was Offered", tag:"Small gifts in open hands",
      eli:"A kid's tiny lunch, given away instead of hoarded. I keep wanting to hold on tight — but he just... opened his hands.",
      final:true,
      teaching:"In a crowd of thousands where the grown-ups held tight to their own, one boy offered his small barley lunch — five loaves and two fish — even when a disciple doubted it could matter. That's the whole secret of how God provides: you don't need to have much before you can help. You just need to offer what's in your hands. Worry clutches and looks away; generosity opens up and gives. And a small gift, freely given, is exactly what God loves to multiply." },
   ] },

   { title:"Twelve Baskets Over", stops: [
    { place:"Sit Down on the Grass", tag:"Getting ready for a miracle",
      eli:"Why would he tell thousands of hungry people to sit down when there's basically no food? Weird move.",
      spots:[
        { ico:"🌱", label:"Watch them be seated", lead:"Jesus tells the disciples to have everyone sit down on the green grass.",
          clue:"The people settle in groups, thousands of them, and wait to see what he'll do." },
        { ico:"🙂", label:"Feel the calm", lead:"There's a strange peace as everyone gets ready.",
          clue:"Jesus isn't worried at all — he already knows what he's about to do." },
      ],
      ask:"What does Jesus have the huge crowd do first?",
      options:["Sit down on the grass","Line up single file","Go home"],
      answer:0,
      hint:"Jesus has the disciples seat everyone on the grass in groups.",
      sidequest:{ title:"Set the table for others", desc:"A meal or snack is about to be shared. Quietly help get everyone seated and ready before you take yours?",
        lesson:"You serve the setup instead of grabbing first. Eli learns that provision flows best when we make room for everyone.", badge:"helper" } },

    { place:"He Gave Thanks", tag:"The small lunch, blessed",
      eli:"He's thanking God for... five rolls and two fish? For thousands? I'd be too busy panicking.",
      spots:[
        { ico:"🙏", label:"Watch Jesus give thanks", lead:"Jesus takes the five loaves and two fish and looks up to heaven.",
          clue:"He gives thanks to God for the little that's there — before there's any sign of more." },
        { ico:"🍞", label:"See him break the bread", lead:"He begins breaking the bread and fish and handing them to the disciples to pass out.",
          clue:"And somehow, the food keeps coming, and coming, and coming." },
      ],
      ask:"What does Jesus do before the food is shared?",
      options:["Gives thanks to God","Sends for more supplies","Divides it into tiny crumbs"],
      answer:0,
      hint:"Jesus looks up to heaven and gives thanks for the loaves and fish before sharing them.",
      sidequest:null },

    { place:"More Than Enough", tag:"Leftovers from almost nothing",
      eli:"Everyone ate until they were FULL? From one kid's lunch? And there were LEFTOVERS?",
      spots:[
        { ico:"😋", label:"Watch everyone eat", lead:"All five thousand (plus women and children) eat as much as they want.",
          clue:"Every single person is completely satisfied — no one goes hungry." },
        { ico:"🧺", label:"Gather the leftovers", lead:"The disciples collect what's left over.",
          clue:"Twelve full baskets of pieces remain — far more than they started with." },
      ],
      ask:"How much food was left over after everyone ate?",
      options:["Twelve baskets full","A few crumbs","Nothing at all"],
      answer:0,
      hint:"After everyone was full, the disciples gathered twelve baskets of leftovers.",
      sidequest:null },

    { place:"Enough, and More", tag:"How God provides",
      eli:"Twelve whole baskets LEFT OVER — from a lunch I would've called 'not enough.' A little, given and blessed, fed everybody.",
      final:true,
      teaching:"Jesus seated the crowd, took a boy's tiny lunch, gave thanks for it, and began to share — and it kept multiplying until thousands ate their fill and twelve baskets of leftovers remained. What started as 'not nearly enough' became far more than enough. That's how God provides: not by us having a lot, but by us offering the little we have with thanks. In grateful, open hands, a small gift stretches further than anyone could count." },
   ] },
  ]
};
CASE_LOAVES.stops = CASE_LOAVES.variants[0].stops;


/* =====================================================================
   CASE 10 — THE GARDEN · "The Garden and the Serpent"
   Theme: Honesty & Grace (why we hide — fear and shame — and being found in love).
   Handled gently for kids: everyone does wrong; the instinct is to hide and blame;
   but love comes looking, and honesty is the way back. God's "Where are you?" is
   an invitation to stop hiding, not a trap.
   Story-moments: The Good Garden → The Sneaky Question → The Choice →
                  Hiding in the Bushes → Still Loved
   Unlocks the "The Garden of Eden" scene.
   ===================================================================== */
const CASE_EDEN = {
  id: "eden",
  title: "The Garden and the Serpent",
  theme: "Honesty & Grace",
  badges: {
    firstSteps: { icon:"👣", name:"First Steps",       desc:"Began the journey" },
    brave:      { icon:"🍎", name:"Saw the Trick",      desc:"Solved a stop with no hints" },
    thorough:   { icon:"🔍", name:"Careful Seeker",     desc:"Investigated every spot at a location" },
    steadfast:  { icon:"🕊️", name:"Came Out of Hiding", desc:"Chose honesty through a detour" },
    helper:     { icon:"🤝", name:"Kind Helper",        desc:"Completed a side quest" },
    delivered:  { icon:"💚", name:"Covered in Love",    desc:"Finished the whole case" },
  },
  detours: [
    { place:"The Blame-It Bush",
      scene:"The moment he's caught, Eli's first move is 'It wasn't me — it was them!' But pointing fingers just spins you round and round the bush and never fixes a single thing.",
      lesson:"Blaming someone else feels safer for a second, but it keeps the mess exactly where it is. Owning your part is the only way forward. You step back onto the path." },
    { place:"The Hide-Away Hollow",
      scene:"Eli figures if he just tucks the mistake away where nobody can see, it'll be like it never happened. But the hollow only gets darker and lonelier the deeper he hides.",
      lesson:"Hiding from the people who love you doesn't make the wrong disappear — it just makes you feel alone with it. Coming out into the light is a relief. You turn back." },
  ],
  // Four trails converging on honesty and grace in the garden (random pick in startCase).
  variants: [
   { title:"The Garden and the Serpent", stops: [
    { place:"The Good Garden", tag:"Everything given, one loving rule",
      eli:"A perfect garden, everything you need, and just one 'please don't'? How hard could following ONE rule be?",
      spots:[
        { ico:"🌳", label:"Walk the garden", lead:"The first people live in a beautiful garden where everything they need is provided.",
          clue:"It's all a gift — food, friendship, and God walking with them in the cool of the day." },
        { ico:"😊", label:"Feel the trust", lead:"There's nothing to hide and nothing to fear. They're safe, known, and loved.",
          clue:"Being fully seen and still loved — that's how it was meant to be from the start." },
        { ico:"🍎", label:"Find the one tree", lead:"There's a single tree they're asked not to eat from — just one loving boundary.",
          clue:"The rule isn't to be mean; it's like a parent saying 'don't touch the hot stove.' It's for their good." },
      ],
      ask:"Why does God give them the one rule about the tree?",
      options:["To be mean and spoil their fun","Because the boundary is for their good","Because God forgot to explain it"],
      answer:1,
      hint:"The 'find the one tree' clue compares it to 'don't touch the hot stove' — a loving boundary, not a mean one.",
      sidequest:null },

    { place:"The Sneaky Question", tag:"When a lie sounds like a good idea",
      eli:"The snake didn't say 'break the rule.' He just went 'did God REALLY say that? You're missing out...' Ohh, that's sneaky.",
      spots:[
        { ico:"🐍", label:"Hear the serpent", lead:"A crafty serpent slides up and asks, 'Did God really say you can't eat from any tree?'",
          clue:"He twists the words — God said one tree, but the serpent makes it sound like God is holding out on them." },
        { ico:"🎣", label:"Spot the hook", lead:"'You won't really be in trouble,' he says. 'You're just missing out on something great.'",
          clue:"The oldest trick: make the wrong thing look wonderful and the good rule look unfair." },
        { ico:"👀", label:"Look at the fruit", lead:"Suddenly the forbidden fruit looks shiny, delicious, and impossible to resist.",
          clue:"A temptation almost always looks better in the moment than it turns out to be." },
      ],
      ask:"What is the serpent really doing with his sneaky question?",
      options:["Honestly asking for directions","Twisting the truth to make wrong look good","Warning them to be careful"],
      answer:1,
      hint:"The 'spot the hook' clue names it — he makes the wrong thing look wonderful and the good rule look unfair.",
      sidequest:{ title:"Warn a friend kindly", desc:"A friend is being talked into something they'll regret. Gently tell them what you see?",
        lesson:"You help a friend spot a bad idea before they're stuck in it. Eli learns real friends tell the truth kindly.", badge:"helper" } },

    { place:"The Choice", tag:"The one thing they weren't to do",
      eli:"And... they did it. The one thing. And right away everything felt different — kind of like when I know I've messed up.",
      spots:[
        { ico:"🍏", label:"See the moment", lead:"They take the fruit and eat — doing the one thing they were lovingly asked not to do.",
          clue:"For a second it feels exciting. Then, almost at once, something inside them changes." },
        { ico:"😳", label:"Feel the 'uh-oh'", lead:"Suddenly they feel exposed and ashamed, like they want to cover up and disappear.",
          clue:"That heavy, hiding feeling has a name: shame. It's new, and it doesn't feel good at all." },
        { ico:"🍃", label:"Watch them cover up", lead:"They quickly sew fig leaves together, trying to hide how they feel.",
          clue:"The very first thing wrongdoing makes us want to do is cover up and hide." },
      ],
      ask:"How do the man and woman feel right after they break the one rule?",
      options:["Proud and happy","Suddenly ashamed and wanting to hide","Bored and sleepy"],
      answer:1,
      hint:"The 'feel the uh-oh' clue names the new feeling — shame — that makes them want to cover up and disappear.",
      sidequest:null },

    { place:"Hiding in the Bushes", tag:"'Where are you?'",
      eli:"They're hiding in the BUSHES from God. And then blaming each other and the snake. Oof... I do that exact thing.",
      spots:[
        { ico:"🌿", label:"Find them hiding", lead:"When they hear God walking in the garden, they hide themselves among the trees.",
          clue:"They're not hiding because God is scary — they're hiding because they're ashamed of what they did." },
        { ico:"🗣️", label:"Hear the question", lead:"God calls out gently, 'Where are you?'",
          clue:"God knows exactly where they are. The question is an invitation: come out, stop hiding, tell me the truth." },
        { ico:"👉", label:"Catch the blame", lead:"When asked, the man blames the woman, the woman blames the serpent — anyone but themselves.",
          clue:"'It wasn't me!' Blaming others is almost as old as the first mistake. It never actually helps." },
      ],
      ask:"Why do the man and woman hide from God in the bushes?",
      options:["They're afraid and ashamed of what they did","They're playing a fun game of hide-and-seek","They're too tired to come out"],
      answer:0,
      hint:"The 'find them hiding' clue — they hide not because God is scary, but because they're ashamed of what they did.",
      sidequest:{ title:"Own up alongside a friend", desc:"You and a friend both goofed. Be the first to say 'I did it too'?",
        lesson:"You own your part instead of pointing fingers. Eli learns that telling the truth takes the weight off everyone.", badge:"helper" } },

    { place:"Still Loved", tag:"Found, and covered in love",
      eli:"There were consequences — but God didn't stop loving them. He came LOOKING for them, and even made them real clothes. I came in hiding my mistakes. Turns out the way back is to stop hiding.",
      final:true,
      teaching:"In the good garden there was one loving rule, and a sneaky voice made breaking it look like a great idea. The moment they did, everything changed: for the first time they felt shame, sewed leaves to cover up, hid in the bushes, and blamed each other. But notice what God did. He came walking through the garden and called, 'Where are you?' — not because he couldn't find them, but to invite them out of hiding. There were real consequences, yet he didn't stop loving them; he even made them proper clothes to cover them, and promised that one day everything broken would be made right. That's the truth under this whole story: everyone does wrong sometimes, and the first thing wrong makes us want to do is hide and blame. But hiding from someone who loves you only leaves you lonely. Being honest is the way back — and love comes looking for you even when you've messed up."
    },
   ] },

   { title:"The Serpent's Question", stops: [
    { place:"The One Rule", tag:"A whole garden, and a single boundary",
      eli:"One rule in the whole garden? Honestly, I'd be tempted to break it just to see what happens.",
      spots:[
        { ico:"🌳", label:"Look around the garden", lead:"God has given Adam and Eve a beautiful garden full of good trees to enjoy.",
          clue:"They may eat freely from almost every tree — the garden is overflowing with 'yes.'" },
        { ico:"🚫", label:"Learn the one rule", lead:"There is a single loving boundary.",
          clue:"'Don't eat from that one tree,' God says — a rule meant to protect, not to spoil their joy." },
      ],
      ask:"What was God's one rule in the garden?",
      options:["Don't eat from that one tree","Never leave the garden","Don't name the animals"],
      answer:0,
      hint:"Out of a whole garden of 'yes,' there was one tree they were told not to eat from.",
      sidequest:{ title:"Respect a good boundary", desc:"There's a rule that feels annoying but is there to keep someone safe. Honor it without grumbling?",
        lesson:"You keep a good rule even when it's tempting not to. Eli learns that loving rules protect us, they don't spoil the fun.", badge:"helper" } },

    { place:"Did God Really Say?", tag:"A crafty voice twists the truth",
      eli:"A talking snake making the one bad idea sound GREAT? This is how trouble always starts...",
      spots:[
        { ico:"🐍", label:"Hear the serpent", lead:"A crafty serpent slides up to Eve with a sly question.",
          clue:"'Did God really say you can't eat from any tree?' — twisting God's kind words into something unfair." },
        { ico:"🍎", label:"Catch the lie", lead:"The serpent promises the very opposite of what God said.",
          clue:"'You won't really die — you'll become like God.' It's a lie that makes the wrong thing look wonderful." },
      ],
      ask:"What does the serpent do to Eve?",
      options:["Warns her kindly","Twists God's words and tells a lie","Offers her a different tree"],
      answer:1,
      hint:"The serpent twists what God said and tells an outright lie to make the wrong choice look good.",
      sidequest:null },

    { place:"The Choice", tag:"When wrong looks good",
      eli:"The fruit looks nice, the snake sounds convincing... uh oh. I can see where this goes.",
      spots:[
        { ico:"👀", label:"See how it looks", lead:"Eve looks at the tree — the fruit seems good and pleasing and wise.",
          clue:"The lie has done its work: the forbidden thing now looks like a great idea." },
        { ico:"🤝", label:"Watch the choice", lead:"Eve takes some and eats, and gives some to Adam, who eats too.",
          clue:"In one moment, the one loving rule is broken." },
      ],
      ask:"What do Adam and Eve do?",
      options:["Walk away from the tree","Eat the forbidden fruit","Ask God first"],
      answer:1,
      hint:"Believing the lie, Eve takes the fruit and eats, and gives some to Adam.",
      sidequest:null },

    { place:"The First Wrong Choice", tag:"How a lie leads us astray",
      eli:"A lie made the one wrong thing look like the best idea ever. I'll be watching out for THAT trick from now on.",
      final:true,
      teaching:"God gave a whole garden of good things and just one loving boundary. But a crafty voice twisted his words and made the one wrong choice look wonderful — 'you won't die, you'll be like God.' That's how temptation almost always works: it dresses up the wrong thing to look good and makes the truth sound unfair. Learning to spot the lie, and to trust that God's rules are for our good, is the first step to living wisely." },
   ] },

   { title:"Hiding in the Bushes", stops: [
    { place:"A New Feeling", tag:"Shame arrives for the first time",
      eli:"They broke the rule — bet the very first thing they want to do is cover it up. That's what I always want to do.",
      spots:[
        { ico:"😳", label:"Notice the change", lead:"The moment they eat, something shifts inside them.",
          clue:"For the very first time, they feel ashamed and exposed." },
        { ico:"🍃", label:"Watch them cover up", lead:"They quickly sew fig leaves together.",
          clue:"They try to cover the wrong themselves — the first attempt to hide a mistake." },
      ],
      ask:"What do Adam and Eve feel and do right after eating?",
      options:["Proud and happy","Ashamed, and they cover themselves","Nothing changes"],
      answer:1,
      hint:"For the first time they feel shame, and sew fig leaves to cover themselves.",
      sidequest:{ title:"Own a small mistake", desc:"You did something small wrong that no one noticed. Admit it out loud instead of covering it up?",
        lesson:"You own up instead of hiding it. Eli learns that honesty feels scary for a second, but hiding feels bad far longer.", badge:"helper" } },

    { place:"Into the Trees", tag:"Running from the One who loves them",
      eli:"They hear God coming and they HIDE? ...Okay, yeah, that's exactly what I'd do too.",
      spots:[
        { ico:"👣", label:"Hear God walking", lead:"They hear the sound of God walking in the garden in the cool of the day.",
          clue:"Instead of running TO him as before, they run away." },
        { ico:"🌳", label:"Watch them hide", lead:"Adam and Eve hide themselves among the trees.",
          clue:"Hiding from someone who loves you doesn't fix anything — it only leaves you lonely and afraid." },
      ],
      ask:"What do Adam and Eve do when they hear God coming?",
      options:["Run to greet him","Hide among the trees","Call out cheerfully"],
      answer:1,
      hint:"Ashamed, they hide themselves among the trees instead of running to God.",
      sidequest:null },

    { place:"It Wasn't Me", tag:"Passing the blame around",
      eli:"'She made me do it!' 'The snake made me do it!' Nobody just says 'I did it,' do they?",
      spots:[
        { ico:"🗣️", label:"Hear God's question", lead:"God calls out, 'Where are you?' and gently asks what happened.",
          clue:"He isn't lost — he's giving them a chance to be honest." },
        { ico:"👉", label:"Watch the blame fly", lead:"Adam blames Eve; Eve blames the serpent.",
          clue:"Everyone points somewhere else. No one simply says, 'I did it, and I'm sorry.'" },
      ],
      ask:"What do Adam and Eve do when God asks what happened?",
      options:["Each blames someone else","Both tell the truth right away","Stay perfectly silent"],
      answer:0,
      hint:"Adam blames Eve, and Eve blames the serpent — everyone passes the blame.",
      sidequest:null },

    { place:"The First Hiding", tag:"Why hiding never helps",
      eli:"Hide the mistake, then blame someone else — that's my go-to move. But it just left them scared and alone. Maybe there's a better way.",
      final:true,
      teaching:"The moment they did wrong, everything in them wanted to cover it up, hide in the bushes, and blame someone else. That's the oldest instinct there is — and we all feel it. But hiding from someone who loves you never makes things better; it only leaves you lonely and afraid. The wrong thing wrongdoing does isn't just the rule we broke — it's the way it tempts us to hide instead of coming clean." },
   ] },

   { title:"Love Came Looking", stops: [
    { place:"Where Are You?", tag:"A search that isn't about finding",
      eli:"They ran and hid — so God's angry and done with them now, right? That's how it works.",
      spots:[
        { ico:"🚶", label:"Hear God call", lead:"God walks through the garden calling, 'Where are you?'",
          clue:"He knows exactly where they are — he's calling to invite them OUT of hiding." },
        { ico:"💛", label:"See his heart", lead:"God comes toward them, not away.",
          clue:"Even after they hid from him, love comes looking for them." },
      ],
      ask:"Why does God call out, 'Where are you?'",
      options:["He truly couldn't find them","To invite them out of hiding","To scare them away"],
      answer:1,
      hint:"God isn't lost — he calls out to draw them gently out of hiding.",
      sidequest:{ title:"Go find someone hiding", desc:"A friend messed up and is avoiding everyone, sure they're in trouble. Go find them and let them know they're still loved?",
        lesson:"You go looking for someone who's hiding in shame. Eli learns that real love comes looking, even after we've messed up.", badge:"helper" } },

    { place:"Consequences, but Not Abandoned", tag:"Still loved through the hard part",
      eli:"There ARE consequences — so this is the part where he gives up on them, surely...",
      spots:[
        { ico:"⚖️", label:"Hear the consequences", lead:"There are real, sad results from the wrong choice.",
          clue:"Life outside the garden will be harder now — choices have consequences." },
        { ico:"🤍", label:"Watch what God does next", lead:"But God does not walk away from them.",
          clue:"He keeps caring for them even now — his love doesn't switch off when we fail." },
      ],
      ask:"Does God stop loving Adam and Eve after they disobey?",
      options:["Yes, he abandons them","No — he keeps caring for them","He forgets about them"],
      answer:1,
      hint:"There are real consequences, but God does not stop loving them.",
      sidequest:null },

    { place:"Clothed, and a Promise", tag:"Grace with a gift and a hope",
      eli:"He MADE them real clothes? And promised to fix what's broken someday? After all that?",
      spots:[
        { ico:"🧥", label:"Receive the gift", lead:"God makes proper clothes for Adam and Eve to cover them.",
          clue:"Their flimsy fig leaves weren't enough — so God himself provides what they need." },
        { ico:"🌅", label:"Hear the promise", lead:"God gives a promise of hope for the future.",
          clue:"One day, he promises, everything broken will be made right — a rescuer is coming." },
      ],
      ask:"What does God do for Adam and Eve as they leave the garden?",
      options:["Makes them clothes and promises to make things right","Locks the gate and forgets them","Takes back all his gifts"],
      answer:0,
      hint:"God clothes them himself and promises that one day everything broken will be made right.",
      sidequest:null },

    { place:"The Way Back Is to Stop Hiding", tag:"Honesty meets grace",
      eli:"They hid, they blamed — and love came looking anyway, covered them, and promised to fix things. I don't have to hide my mistakes. I can come out.",
      final:true,
      teaching:"Adam and Eve hid and blamed, sure they were finished. But God came walking through the garden calling, 'Where are you?' — not to catch them, but to bring them out of hiding. There were real consequences, yet he never stopped loving them; he even made them proper clothes and promised a rescuer would one day make everything right. That's the truth under the whole story: everyone does wrong, and wrong makes us want to hide. But honesty is the way back — and love comes looking for you even when you've messed up." },
   ] },
  ]
};
CASE_EDEN.stops = CASE_EDEN.variants[0].stops;


/* =====================================================================
   CASE 11 — THE SERMON · "The Sermon on the Mount"
   Theme: How to Live (the upside-down kingdom — and doing it, not just hearing it).
   Eli's flaw: thinks the way to win is the world's way — be first, get even,
   look impressive, worry about everything.
   Story-moments: Up the Mountainside → Be a Light → Love Even Your Enemies →
                  Don't Worry, Treat Others Right → Build on the Rock
   Unlocks the "The Sermon on the Mount" scene.  Completes the set of 11.
   ===================================================================== */
const CASE_SERMON = {
  id: "sermon",
  title: "The Sermon on the Mount",
  theme: "How to Live",
  badges: {
    firstSteps: { icon:"👣", name:"First Steps",       desc:"Began the journey" },
    brave:      { icon:"🕯️", name:"Bright Lamp",        desc:"Solved a stop with no hints" },
    thorough:   { icon:"🔍", name:"Careful Seeker",     desc:"Investigated every spot at a location" },
    steadfast:  { icon:"🕊️", name:"Chose the Better Way", desc:"Took the kingdom way through a detour" },
    helper:     { icon:"🤝", name:"Kind Helper",        desc:"Completed a side quest" },
    delivered:  { icon:"🪨", name:"Built on Rock",       desc:"Finished the whole case" },
  },
  detours: [
    { place:"The Get-Even Gully",
      scene:"Someone's unkind, and Eli's sure the answer is to be twice as unkind right back. But trading meanness just rolls further and further downhill, and nobody ever climbs back up that way.",
      lesson:"Getting even feels good for a heartbeat, then leaves everyone worse off. Kindness is the only thing that actually breaks the cycle. You climb back to the path." },
    { place:"The Show-Off Summit",
      scene:"Eli figures the whole point of doing good is so everybody sees how great he is. But performing for applause is a peak that's never quite high enough — there's always someone clapping louder somewhere else.",
      lesson:"Good done to be seen leaves you empty; good done in love fills you up. You come down off the show-off summit and rejoin the climb." },
  ],
  // Four trails converging on how to live God's way (random pick in startCase).
  variants: [
   { title:"The Sermon on the Mount", stops: [
    { place:"Up the Mountainside", tag:"An upside-down happy list",
      eli:"Everybody climbed this mountain to hear him. And the first thing Jesus says about who's truly happy is... backwards from everything I thought.",
      spots:[
        { ico:"⛰️", label:"Join the crowd", lead:"A huge crowd climbs the hillside and sits to hear Jesus teach.",
          clue:"He's about to explain the best way to live — and it surprises everyone." },
        { ico:"💙", label:"Hear who's blessed", lead:"Jesus says the truly happy ones are the humble, the gentle, the merciful, the peacemakers.",
          clue:"Not the richest, loudest, or most powerful — the kind and humble are the ones who are truly blessed." },
        { ico:"🔄", label:"Feel it flip", lead:"It's the opposite of what the world usually says makes you a winner.",
          clue:"In God's kingdom, the way up is down: being humble and kind, not pushing to be first." },
      ],
      ask:"According to Jesus, who is truly blessed and happy?",
      options:["The richest and most powerful","The humble, kind, and peacemakers","The loudest and most famous"],
      answer:1,
      hint:"The 'hear who's blessed' clue lists them — the humble, gentle, merciful, and peacemakers, not the powerful.",
      sidequest:null },

    { place:"Be a Light", tag:"Shine to help, not to show off",
      eli:"He says I'm like a lamp? And you don't light a lamp just to hide it — but also not just to show off how bright you are. Hmm.",
      spots:[
        { ico:"🕯️", label:"See the lamp", lead:"Jesus says, 'You are the light of the world. No one lights a lamp and hides it under a bowl.'",
          clue:"A light is meant to be used — to help people see, not to be tucked away." },
        { ico:"✨", label:"Let it shine", lead:"'Let your light shine so people see the good you do.'",
          clue:"Your kindness can help others find their way — like a lamp on a stand lighting the whole room." },
        { ico:"🙏", label:"Catch the reason", lead:"The point isn't 'look how great I am' — it's so others are helped and give thanks to God.",
          clue:"Good deeds are a light for others' sake, not a spotlight for your own." },
      ],
      ask:"Why does Jesus say to let your light shine?",
      options:["So everyone admires how great you are","So others are helped and thankful to God","So you can win prizes"],
      answer:1,
      hint:"The 'catch the reason' clue — the light shines to help others and point to God, not to spotlight yourself.",
      sidequest:{ title:"Do a secret good deed", desc:"Help someone today without letting them know it was you. Just because it's kind?",
        lesson:"You do good with no one watching and no credit. Eli learns kindness feels best when it isn't for applause.", badge:"helper" } },

    { place:"Love Even Your Enemies", tag:"The hardest, bravest teaching",
      eli:"Wait — love people who are MEAN to me? Be kind to someone who was unkind first? That's the hardest thing he's said yet.",
      spots:[
        { ico:"💢", label:"Hear the world's way", lead:"Everyone knows the usual rule: love your friends and get back at your enemies.",
          clue:"It feels natural to be nice to nice people and mean to mean people." },
        { ico:"💗", label:"Hear Jesus' way", lead:"Jesus says something brand new: 'Love your enemies. Be kind to those who are unkind. Pray for them.'",
          clue:"Anyone can love their friends — it takes real courage to be kind to someone who wasn't kind to you." },
        { ico:"🕊️", label:"See what it does", lead:"Meeting unkindness with kindness is how the cycle of getting-even finally stops.",
          clue:"You can't fight meanness with more meanness — only kindness actually ends it." },
      ],
      ask:"What does Jesus say to do when someone is unkind to you?",
      options:["Get even so they learn their lesson","Love them and be kind back","Ignore them forever"],
      answer:1,
      hint:"The 'hear Jesus' way' clue — love your enemies and be kind even to those who were unkind to you.",
      sidequest:{ title:"Surprise a grump with kindness", desc:"Someone was short or grouchy with you. Answer with unexpected kindness instead?",
        lesson:"You break the meanness cycle with one kind move. Eli feels how much braver kindness is than getting even.", badge:"helper" } },

    { place:"Don't Worry, Treat Others Right", tag:"One simple golden rule",
      eli:"Look at the birds, look at the flowers — God takes care of them, so quit worrying? And treat others how I'd want to be treated? Okay, THAT one I can remember.",
      spots:[
        { ico:"🐦", label:"Watch the birds", lead:"Jesus points to the birds — they don't panic about food, and God feeds them.",
          clue:"If God cares for little birds and wildflowers, he surely cares about you. Worrying adds nothing." },
        { ico:"🌼", label:"See the flowers", lead:"'Even a king wasn't dressed as beautifully as these wildflowers,' he says.",
          clue:"Worry never once made a hard day better — trust does. Take today as it comes." },
        { ico:"🤝", label:"Learn the golden rule", lead:"'Treat others the way you would want to be treated.'",
          clue:"One simple rule to carry everywhere: before you act, ask how you'd want to be treated." },
      ],
      ask:"What simple rule does Jesus give for how to treat other people?",
      options:["Treat others how you'd want to be treated","Treat others however they treat you","Only be nice to your friends"],
      answer:0,
      hint:"The 'learn the golden rule' clue says it plainly — treat others the way you would want to be treated.",
      sidequest:null },

    { place:"Build on the Rock", tag:"Hearing it isn't enough — do it",
      eli:"Two builders, same storm. The one who actually DID what he heard? His house stood. I came in thinking winning was the world's way. Turns out the strong life is built by living this stuff, not just nodding at it.",
      final:true,
      teaching:"Jesus ended his hillside teaching with a picture. Two people build houses; the storm hits both. The wise one heard his words and actually did them — like building on solid rock, so the house stood firm. The foolish one heard the very same words but ignored them — like building on sand, and the house fell. That's the whole point of how to live: it's not enough just to hear good teaching and agree it's nice. The humble-happy list, being a light for others, loving even your enemies, trusting instead of worrying, treating people the way you'd want to be treated — these only make your life strong when you actually live them. Hearing is easy. Doing is what builds a life that stands when the storms come."
    },
   ] },

   { title:"The Upside-Down Blessings", stops: [
    { place:"The Mountainside", tag:"A teacher sits, the crowds lean in",
      eli:"To be happy you need to be rich, strong, and first — everybody knows that. Right?",
      spots:[
        { ico:"⛰️", label:"Climb to the teaching", lead:"Jesus goes up a mountainside, sits down, and his followers gather close.",
          clue:"He's about to teach the crowd how to really live — and it won't sound like the world's advice." },
        { ico:"👂", label:"Lean in with the crowd", lead:"The people quiet down to listen.",
          clue:"He begins with a list of who is truly blessed — truly happy." },
      ],
      ask:"How does Jesus give this famous teaching?",
      options:["Shouting from a boat","Sitting on a mountainside as crowds gather","Writing it on a wall"],
      answer:1,
      hint:"Jesus goes up the mountainside, sits down, and teaches the gathered crowd.",
      sidequest:{ title:"Lift up the overlooked", desc:"Someone quiet and unnoticed did something kind. Point it out and celebrate them?",
        lesson:"You honor someone the world would overlook. Eli learns that God's idea of 'great' isn't the loud, first, or richest.", badge:"helper" } },

    { place:"Blessed Are...", tag:"A happy list the world gets backwards",
      eli:"Wait — he says the HUMBLE and gentle are the happy ones? Not the winners? That's backwards!",
      spots:[
        { ico:"🕊️", label:"Hear the blessings", lead:"Jesus says the truly blessed are the humble, the gentle, the merciful, the peacemakers.",
          clue:"Not the proud or the pushy — the kind and lowly of heart." },
        { ico:"🔄", label:"Notice the flip", lead:"It's the exact opposite of the world's list of 'winners.'",
          clue:"God measures a good life by the heart, not by money, muscles, or being first." },
      ],
      ask:"Who does Jesus say is truly blessed?",
      options:["The richest and most powerful","The humble, gentle, and merciful","The loudest and toughest"],
      answer:1,
      hint:"Jesus blesses the humble, gentle, merciful, and peacemakers — the opposite of the world's list.",
      sidequest:null },

    { place:"A Different Kind of Great", tag:"God's measure of a good life",
      eli:"So being 'great' God's way means being kind and humble, not being on top. Nobody told me that.",
      spots:[
        { ico:"❤️", label:"Weigh the two lists", lead:"The world cheers the strong and first; Jesus lifts up the gentle and kind.",
          clue:"Real greatness, he says, grows in a humble heart." },
        { ico:"🌱", label:"See where it leads", lead:"This is the foundation for everything else he'll teach.",
          clue:"How to live starts with what you treasure — and God treasures the heart." },
      ],
      ask:"How is Jesus's idea of a blessed life different from the world's?",
      options:["It values the humble and kind, not the powerful","It's exactly the same","It only cares about money"],
      answer:0,
      hint:"Jesus flips the world's list — the humble and merciful are the truly blessed.",
      sidequest:null },

    { place:"Blessed Are the Humble", tag:"Greatness measured by the heart",
      eli:"I came in sure that winning the world's way was the whole point. Turns out the good life is measured by your heart, not your trophies.",
      final:true,
      teaching:"Jesus opened his hillside teaching with a happy list that turns the world upside down: the truly blessed aren't the richest, strongest, or first — they're the humble, the gentle, the merciful, the peacemakers. The world measures a good life by trophies; God measures it by the heart. How to live starts right here, with treasuring what God treasures — and he treasures a humble, loving heart above all the world's prizes." },
   ] },

   { title:"Salt, Light, and Love", stops: [
    { place:"Salt and Light", tag:"Made to make a difference",
      eli:"Keep your head down, don't stand out, look after yourself — that's the smart way to live, isn't it?",
      spots:[
        { ico:"🧂", label:"Hear 'you are salt'", lead:"Jesus tells the crowd they are the salt of the earth.",
          clue:"Salt brings out good flavor and keeps things from spoiling — his followers are meant to make life better around them." },
        { ico:"💡", label:"Hear 'you are light'", lead:"He says they are the light of the world.",
          clue:"'Don't hide your lamp under a basket — let it shine, so people see good and thank God.'" },
      ],
      ask:"What does Jesus call his followers?",
      options:["Salt of the earth and light of the world","Soldiers of an army","Judges of the people"],
      answer:0,
      hint:"Jesus calls them the salt of the earth and the light of the world — made to shine, not hide.",
      sidequest:{ title:"Shine for someone", desc:"You could brighten a gloomy moment for someone if you're willing to stand out a little. Do it?",
        lesson:"You let your light shine instead of hiding it. Eli learns we're meant to make things better around us, not just blend in.", badge:"helper" } },

    { place:"Love Your Enemies", tag:"Kindness that doesn't keep score",
      eli:"Love your FRIENDS, sure. But love the people who are MEAN to you? No way. They don't deserve it.",
      spots:[
        { ico:"🤝", label:"Hear the hard teaching", lead:"Jesus says anyone can love their friends — he calls for more.",
          clue:"'Love your enemies, and pray for those who are unkind to you.'" },
        { ico:"🕯️", label:"See the reason", lead:"He points to God, who is kind even to the ungrateful.",
          clue:"Living God's way means loving people who could never pay you back." },
      ],
      ask:"What does Jesus say to do about your enemies?",
      options:["Get even with them","Love them and pray for them","Ignore them forever"],
      answer:1,
      hint:"Jesus says to love your enemies and pray for those who are unkind to you.",
      sidequest:null },

    { place:"In Secret", tag:"Good done for God, not for credit",
      eli:"What's the point of doing something good if nobody sees it and I get no credit?",
      spots:[
        { ico:"🤫", label:"Hear about quiet giving", lead:"Jesus says when you give or pray, don't do it to be seen and praised.",
          clue:"Do your good deeds quietly, for God — not for a crowd's applause." },
        { ico:"👀", label:"Learn who's watching", lead:"He promises your Father sees what's done in secret.",
          clue:"The good no one else notices is the good God treasures most." },
      ],
      ask:"How does Jesus say we should do our good deeds?",
      options:["Loudly, so everyone sees","Quietly, for God, not for applause","Only when paid"],
      answer:1,
      hint:"Do good quietly and for God — not to show off or be praised by others.",
      sidequest:null },

    { place:"Shine, and Love the Hard-to-Love", tag:"Living it out, not showing it off",
      eli:"Be a light, love even the mean ones, and do good where nobody's clapping. That's a harder — and better — way to live than I thought.",
      final:true,
      teaching:"Jesus said his followers are salt and light — meant to make the world better and to shine, not hide. Then he raised the bar: love not just your friends but your enemies, and do your good deeds quietly for God rather than for applause. Living God's way isn't about being noticed or getting even. It's about shining with a love that doesn't keep score and doesn't need a crowd — the kind of goodness that points people to God." },
   ] },

   { title:"The Two Houses", stops: [
    { place:"Look at the Birds", tag:"A cure for worrying",
      eli:"How can you NOT worry? You've got to look out for yourself or you'll end up with nothing!",
      spots:[
        { ico:"🐦", label:"Watch the birds", lead:"Jesus points to the birds — they don't store up barns, yet God feeds them.",
          clue:"'You are worth much more than birds. Don't worry so much about tomorrow.'" },
        { ico:"🌷", label:"Look at the flowers", lead:"He points to the wildflowers, dressed more beautifully than a king.",
          clue:"'Seek God's kingdom first, and trust him to take care of the rest.'" },
      ],
      ask:"What does Jesus point to when he tells the crowd not to worry?",
      options:["The birds and flowers God cares for","A pile of gold","A locked storehouse"],
      answer:0,
      hint:"Jesus points to the birds and flowers God provides for, and says not to worry.",
      sidequest:{ title:"Trade a worry for a kindness", desc:"You're anxious about something — turn that energy into helping someone else instead?",
        lesson:"You swap worrying for doing good. Eli learns trusting God frees you to care for others instead of only yourself.", badge:"helper" } },

    { place:"The Golden Rule", tag:"One line to live by",
      eli:"Okay, if there's ONE rule for getting along with people, what is it?",
      spots:[
        { ico:"⚖️", label:"Hear the golden rule", lead:"Jesus sums up how to treat people in one line.",
          clue:"'Do to others whatever you would want them to do to you.'" },
        { ico:"🔁", label:"Try it out", lead:"It works for everything — kindness, honesty, sharing, forgiving.",
          clue:"Before you act, just picture yourself on the other side of it." },
      ],
      ask:"What is the 'golden rule' Jesus teaches?",
      options:["Treat others the way you'd want to be treated","Win at any cost","Only help your friends"],
      answer:0,
      hint:"The golden rule: do to others whatever you'd want them to do to you.",
      sidequest:null },

    { place:"Two Builders, One Storm", tag:"Hearing versus doing",
      eli:"Two houses, same storm — and the difference is whether you actually DID what you heard? Uh oh.",
      spots:[
        { ico:"🪨", label:"See the wise builder", lead:"One person hears Jesus' words and actually does them.",
          clue:"It's like building a house on rock — when the storm hits, the house stands firm." },
        { ico:"🏖️", label:"See the foolish builder", lead:"The other hears the very same words but ignores them.",
          clue:"It's like building on sand — when the storm hits, the house falls with a crash." },
      ],
      ask:"What makes the wise builder wise?",
      options:["He builds the biggest house","He hears Jesus' words AND does them","He builds fastest"],
      answer:1,
      hint:"The wise builder doesn't just hear the words — he actually does them, like building on rock.",
      sidequest:null },

    { place:"Build on the Rock", tag:"A life that stands in the storm",
      eli:"Both builders HEARD the same words. The one whose house stood actually lived them. I don't want to just nod at this stuff — I want to build my life on it.",
      final:true,
      teaching:"Jesus ended his hillside teaching with two builders and one storm. The wise one heard his words and actually did them — like building on rock, so the house stood. The foolish one heard the very same words but ignored them — like building on sand, and it fell. That's the whole point of how to live: don't just worry less, treat people kindly, and admire good teaching — actually live it. Hearing is easy. Doing is what builds a life that stands when the storms come." },
   ] },
  ]
};
CASE_SERMON.stops = CASE_SERMON.variants[0].stops;


const CASES = {
  jesus: CASE_JESUS,
  david: CASE_DAVID,
  moses: CASE_MOSES,
  ruth:  CASE_RUTH,
  paul:  CASE_PAUL,
  noah:  CASE_NOAH,
  daniel: CASE_DANIEL,
  tomb:  CASE_TOMB,
  loaves: CASE_LOAVES,
  eden:  CASE_EDEN,
  sermon: CASE_SERMON,
};

const CASE_ORDER = ["jesus", "david", "moses", "ruth", "paul", "noah", "daniel", "tomb", "loaves", "eden", "sermon"];

/* Universal badge earned across any case (engine may reference) */
const SHARED_RANKS = {
  // wisdom thresholds -> rank label (engine can map per case or globally)
  low:  "Eager Beginner",
  mid:  "Faithful Traveler",
  high: "Patient Pilgrim",
};

/* =====================================================================
   ROUND TABLES — parent+child discussion, one themed pool set per case.
   Shown between the story and the workshop. Each slot (kid / parent /
   together) is a POOL; the engine picks one at random each visit (no
   immediate repeat) so it stays fresh but always on-theme. notAlone is
   its own small pool. Framing/labels/badge are generic (in roundtable.js).
   ===================================================================== */
const ROUNDTABLES = {
  jesus: { // Patience & Trust
    kid: [
      "What's something you really <i>don't</i> want to wait for right now?",
      "When is waiting the hardest for you — in the car, in line, for a special day?",
      "Has waiting for something ever made it feel <i>even better</i> when it finally came?",
      "What actually helps you when you have to wait and it's really hard?",
      "Is there something you're waiting for that you don't understand — that you just have to <i>trust</i> will be okay?",
    ],
    parent: [
      "When you were about this age, what's the hardest thing <i>you</i> ever had to wait for? How did it turn out?",
      "Was there a time as a kid you wanted something <i>now</i>, but waiting turned out better? Tell the story.",
      "What's something you waited a long time for as a kid — and was it worth it?",
      "When you were little, who helped you learn to be patient, and how?",
      "Was there a time you rushed something as a kid and wished you'd waited? What happened?",
    ],
    together: [
      "Pick <i>one</i> thing this week you'll both be patient about — and check in on it later.",
      "Think of something you're both waiting for. How can you help <i>each other</i> wait well?",
      "Name a 'waiting moment' that happens a lot in your week. What could make it easier for both of you?",
      "Choose something worth waiting for, and make a little plan for the wait together.",
    ],
    notAlone: [
      "Here's a secret: almost every grown-up still finds waiting hard, too. You're in good company.",
      "Even the oldest, wisest people you know still wrestle with waiting. You're not the only one.",
      "Waiting is hard for just about everybody — that's part of being human, not a problem with you.",
    ],
    // Bible-facts round (the Manger / Nativity). Parent reads it, child guesses, then reveal.
    // The engine picks a few at random each visit, so it stays fresh on replay.
    facts: [
      { q: "In what little town was baby Jesus born?", a: "Bethlehem — just as God's prophets had promised hundreds of years before." },
      { q: "Where did Mary lay the baby to sleep?", a: "In a manger — the box animals eat from — because there was no room for them in the inn." },
      { q: "Who were the very first visitors to come and see baby Jesus?", a: "Shepherds, who had been watching their sheep out in the fields at night." },
      { q: "Who told the shepherds the good news that Jesus was born?", a: "An angel — and then the whole sky filled with angels praising God!" },
      { q: "What did the wise men follow to find Jesus?", a: "A bright new star that led them a very long way, all the way from the East." },
      { q: "What three gifts did the wise men bring?", a: "Gold, frankincense, and myrrh — precious treasures fit for a king." },
      { q: "What was the name of Jesus's mother?", a: "Mary — a young woman who trusted God with her whole heart." },
      { q: "Who was Joseph in the story?", a: "The kind carpenter who took care of Mary and raised Jesus as his own son." },
      { q: "Why did Mary and Joseph have to travel to Bethlehem?", a: "The ruler ordered a big count of all the people (a census), so everyone went to their family's town." },
      { q: "What does the name 'Jesus' mean?", a: "'The Lord saves' — the angel gave him that name because he came to save his people." },
      { q: "What did the angels sing about that night?", a: "\"Glory to God, and peace on earth\" — the Savior had finally come." },
    ],
  },
  david: { // Courage & Humility
    kid: [
      "When is it hardest for you to be brave — trying something new, standing up for someone, admitting you're scared?",
      "Have you ever done something brave that <i>nobody saw</i> or clapped for? What was it?",
      "David was the youngest and smallest. When have you felt too little or too young to matter?",
      "What's the difference between being brave and just <i>showing off</i>? Can you think of an example?",
      "Is it braver to win a fight, or to walk away from one? Why do you think so?",
    ],
    parent: [
      "When you were about this age, what's the bravest thing you ever did — even if it was quiet?",
      "Was there a time as a kid you were scared but did the right thing anyway? Tell the story.",
      "Did you ever feel overlooked or 'too little' as a kid? How did that feel, and what changed?",
      "Was there a time you showed off and it backfired? What did you learn?",
      "Who taught you that real strength can be gentle? What did they do?",
    ],
    together: [
      "Name one brave-but-quiet thing you could each do this week — no applause needed.",
      "Is there someone who needs standing up for? How could you help them together?",
      "Pick a fear you'd each like to face, and agree to cheer each other on.",
      "Think of a moment coming up to choose the humble path. What would that look like?",
    ],
    notAlone: [
      "Even the bravest grown-ups get scared — courage isn't <i>not</i> being afraid, it's doing the good thing anyway.",
      "Every strong person you admire once felt small and overlooked. You're not the only one.",
      "Wanting to be the hero is normal — learning that quiet strength counts more takes everybody a lifetime.",
    ],
    facts: [
      { q: "What was the name of the giant David faced?", a: "Goliath — a Philistine warrior over nine feet tall!" },
      { q: "What was young David's job before the battle?", a: "He was a shepherd who watched over his father's sheep." },
      { q: "What weapon did David use to defeat Goliath?", a: "A sling and one small smooth stone — plus his trust in God." },
      { q: "How many stones did David pick up from the stream?", a: "Five smooth stones — but he only needed one." },
      { q: "Why did David take off the king's armor?", a: "It was too big and heavy — he wasn't used to it." },
      { q: "Who was the king of Israel who was too afraid to fight?", a: "King Saul — he and his whole army were scared of Goliath." },
      { q: "Where did David's stone strike Goliath?", a: "Right in the forehead — and the giant fell down." },
      { q: "What did David say would win the battle?", a: "He said the battle belonged to the Lord, who would help him." },
      { q: "What animals had David already fought to protect his sheep?", a: "A lion and a bear — God had helped him before." },
      { q: "Which army did Goliath fight for?", a: "The Philistines, enemies of God's people, Israel." },
      { q: "What did the shepherd boy David grow up to become?", a: "The greatest king of Israel." },
    ],
  },
  moses: { // Perseverance & Trust
    kid: [
      "What's something hard you wanted to quit — but were glad you didn't, or wish you hadn't?",
      "When something feels too big or too hard, what happens inside you? What do you want to do?",
      "Moses said 'I can't, I'm not good enough.' When have you felt like that?",
      "What's one small step you could take on something hard, even if you can't do the whole thing yet?",
      "Who helps you keep going when you really want to give up?",
    ],
    parent: [
      "When you were about this age, what's something hard you stuck with? What kept you going?",
      "Was there a time as a kid you quit something and wished you hadn't? Tell the story.",
      "Did you ever feel 'not good enough' for something as a kid? What happened next?",
      "Was there a long, hard stretch in your childhood that turned out to matter? What got you through?",
      "Who refused to let you give up when you were young — and are you glad now?",
    ],
    together: [
      "Name one hard thing you're each working on. How can you keep <i>each other</i> going this week?",
      "Pick a 'next small step' you could each take on something tough.",
      "Agree on a signal or a cheer for when one of you wants to quit.",
      "Think of a long journey you're on together. What would 'not giving up' look like this week?",
    ],
    notAlone: [
      "Everybody wants to quit when things get hard — pushing on anyway is something we all keep learning.",
      "Even the strongest people you know have felt 'not good enough.' You're in good company.",
      "Nobody makes the long journey alone — the strong ones accept help. That includes grown-ups.",
    ],
    facts: [
      { q: "What sea did God open a dry path through?", a: "The Red Sea — the water stood up like walls on both sides." },
      { q: "Who did God choose to lead His people out of Egypt?", a: "Moses, holding the special staff God gave him." },
      { q: "What were God's people escaping from in Egypt?", a: "Slavery — they had been forced to work for Pharaoh for years." },
      { q: "What did Moses stretch out over the sea?", a: "His hand and his staff — then God sent a strong wind all night." },
      { q: "Who was chasing the Israelites toward the sea?", a: "Pharaoh's army, with horses and chariots." },
      { q: "How did God guide the people by day and by night?", a: "A pillar of cloud by day and a pillar of fire by night." },
      { q: "What happened to the sea after the people crossed?", a: "It rushed back and covered Pharaoh's army behind them." },
      { q: "What did the people walk across the sea on?", a: "Dry ground — God even dried the seabed for them." },
      { q: "What did God later give Moses on Mount Sinai?", a: "The Ten Commandments — His rules for living." },
      { q: "Where did God first speak to Moses about freeing the people?", a: "From a bush that was on fire but never burned up." },
      { q: "How did the people celebrate once they were safe?", a: "They sang and danced, thanking God for rescuing them." },
    ],
  },
  ruth: { // Loyalty & Faithfulness
    kid: [
      "What does it mean to be a really good friend — even when it's <i>not</i> easy?",
      "Have you ever stuck with someone when it would've been easier to walk away? What happened?",
      "Ruth stayed when there was nothing in it for her. When is it hard to keep a promise?",
      "Who is someone you want to <i>always</i> be loyal to? Why them?",
      "What's the difference between being kind when it's easy and being faithful when it's hard?",
    ],
    parent: [
      "When you were about this age, who was a friend you stayed loyal to? What made them special?",
      "Was there a time as a kid someone stayed faithful to you when they didn't have to? How did it feel?",
      "Did you ever keep a hard promise as a kid? Tell the story.",
      "Was there a time you walked away from someone and wish you hadn't? What did you learn?",
      "Who taught you what real faithfulness looks like? What did they do?",
    ],
    together: [
      "Name one person you could each be more faithful to this week — and how.",
      "Is there someone who needs your loyalty right now? How could you show up for them together?",
      "Make a small promise to each other this week — and a plan to keep it.",
      "Think of a friend going through a hard time. What's one loyal thing you could do together?",
    ],
    notAlone: [
      "Staying faithful when it's hard is tough for everybody — that's what makes it mean so much.",
      "Almost everyone has walked away from someone and wished they'd stayed. You're not alone.",
      "The quiet, loyal people rarely get applause — but they hold the whole world together.",
    ],
    facts: [
      { q: "Who did Ruth refuse to leave, even when she could go home?", a: "Naomi, her mother-in-law — Ruth stayed loyal to her." },
      { q: "What famous promise did Ruth make to Naomi?", a: "'Where you go, I will go; your people will be my people.'" },
      { q: "What did Ruth do in the fields to get food?", a: "She gleaned — picking up the leftover grain the workers dropped." },
      { q: "What crop was being harvested in the story?", a: "Barley — a grain used to make bread." },
      { q: "Who was the kind landowner who let Ruth gather grain?", a: "Boaz, who noticed her hard work and made sure she was safe." },
      { q: "Where was Ruth originally from?", a: "Moab — she wasn't born an Israelite, but she chose to follow God." },
      { q: "How did Boaz treat Ruth, a stranger from another land?", a: "With great kindness — he protected her and shared his food." },
      { q: "What happened to Ruth and Boaz in the end?", a: "They married, and God blessed them with a baby boy." },
      { q: "Ruth became the great-grandmother of which famous king?", a: "King David — and Jesus came from that very same family." },
      { q: "Why had Naomi's family left home in the first place?", a: "A famine — there wasn't enough food, so they had to move away." },
      { q: "What does Ruth's story teach about being faithful?", a: "That staying loyal and kind, even when it's hard, is never wasted." },
    ],
  },
  paul: { // Transformation & Mission
    kid: [
      "Do you think people can <i>really</i> change? Have you ever seen someone change for the better?",
      "Is there something about yourself you'd like to change? What might help?",
      "Paul had done real wrong, and got a second chance. When has someone given <i>you</i> a second chance?",
      "Is it hard to give someone a second chance after they've hurt you? Why?",
      "If you had good news you couldn't keep to yourself, who would you tell first?",
    ],
    parent: [
      "When you were about this age, was there something about yourself you worked hard to change?",
      "Did someone give you a second chance as a kid when you didn't deserve it? Tell the story.",
      "Was there a person you'd written off who surprised you by changing? What happened?",
      "Was there a time you gave someone a second chance and were glad you did?",
      "Who believed you could change or grow when you were young? What did that do for you?",
    ],
    together: [
      "Name one thing you'd each like to change about yourselves — and how you'll help each other.",
      "Is there someone who deserves a second chance from you? How could you offer it together?",
      "Think of good news worth sharing. Who could you encourage together this week?",
      "Pick one small 'new start' you could make together this week.",
    ],
    notAlone: [
      "Everybody has parts of themselves they want to change — growing is lifelong, for grown-ups too.",
      "We've all written someone off and been proven wrong. Second chances surprise everybody.",
      "No one is beyond change — and that good news is for grown-ups just as much as kids.",
    ],
    facts: [
      { q: "What was Paul's name before he changed?", a: "Saul — and at first he was an enemy of Jesus's followers." },
      { q: "What happened to Saul on the road to Damascus?", a: "A bright light from heaven flashed, and he fell to the ground." },
      { q: "Whose voice did Saul hear from the light?", a: "Jesus, who asked, 'Saul, why are you hurting me?'" },
      { q: "What happened to Saul's eyes after the light?", a: "He went blind for three days, until God healed him." },
      { q: "What city was Saul traveling to?", a: "Damascus — he was going there to arrest Christians." },
      { q: "Who did God send to help Saul see again?", a: "A believer named Ananias, who prayed for him." },
      { q: "How did Saul change after meeting Jesus?", a: "He became a follower of Jesus and told everyone the good news." },
      { q: "What new name is Saul better known by?", a: "Paul — one of the greatest teachers and travelers for Jesus ever." },
      { q: "What did Paul spend the rest of his life doing?", a: "Traveling far and wide to tell people about Jesus." },
      { q: "Many books of the Bible are letters written by whom?", a: "Paul — he wrote to churches to teach and encourage them." },
      { q: "What does Paul's story show us about people?", a: "That anyone can change — no one is too far gone for a second chance." },
    ],
  },
  noah: { // Obedience & Faith
    kid: [
      "Has a grown-up ever asked you to do something that didn't make sense at first, but turned out to be right?",
      "Is it hard to keep doing the right thing when others laugh or say it's weird? When?",
      "What's something you have to do over and over, even when it's boring or nobody notices?",
      "When is it tempting to do things <i>your</i> own way instead of the way you were told?",
      "Who do you trust enough to obey even when you don't understand why?",
    ],
    parent: [
      "When you were about this age, was there a rule you didn't understand until later? Tell the story.",
      "Was there a time you did the right thing while others laughed or doubted you? How did it feel?",
      "Did you ever cut a corner or do it 'your own way' as a kid and wish you'd followed the plan?",
      "Who did you trust enough to obey when you were young, even without understanding why?",
      "What's something you had to keep at for a long time before it finally paid off?",
    ],
    together: [
      "Name one thing this week you'll do the right way, even if it's harder or slower.",
      "Is there an instruction — a rule, a chore — you could follow more faithfully together?",
      "Pick something worth being patient about, and encourage each other while you wait.",
      "Think of someone doing right while others doubt them. How could you cheer them on together?",
    ],
    notAlone: [
      "Almost everyone has felt silly doing the right thing while others laughed — you're in good company.",
      "Trusting instructions you don't fully understand yet is hard for grown-ups too.",
      "Doing the same faithful thing over and over, with no applause, is quietly one of the bravest things there is.",
    ],
    facts: [
      { q: "What did God tell Noah to build?", a: "A giant boat called an ark, to save his family and the animals." },
      { q: "How did the animals come onto the ark?", a: "Two by two — a male and a female of every kind." },
      { q: "How long did it rain during the great flood?", a: "Forty days and forty nights." },
      { q: "What bird did Noah send out to look for dry land?", a: "A dove — and it came back carrying an olive leaf." },
      { q: "What did the olive leaf tell Noah?", a: "That the water was going down and plants were growing again." },
      { q: "What did God put in the sky as a promise?", a: "A rainbow — a sign He would never flood the whole earth again." },
      { q: "How did people act while Noah built the ark?", a: "Many laughed at him, but Noah kept obeying God anyway." },
      { q: "How many people were saved on the ark?", a: "Eight — Noah, his wife, his three sons, and their wives." },
      { q: "What did Noah do first when he stepped off the ark?", a: "He thanked God and worshiped Him." },
      { q: "Why did Noah build such a strange, huge boat?", a: "Because God told him to — even though it had never rained like that." },
      { q: "What does Noah's story teach about obeying God?", a: "That trusting God is right, even when others don't understand." },
    ],
  },
  daniel: { // Courage & Faithfulness
    kid: [
      "When is it hard to do the right thing because you're afraid of what others will think?",
      "Have you ever felt like you had to hide something true about yourself to fit in?",
      "What's something you believe in that you'd keep doing even if others teased you?",
      "Is it braver to go along with the crowd, or to quietly do what's right? Why?",
      "Who helps you be brave when you're scared to stand out?",
    ],
    parent: [
      "When you were about this age, was there a time you stood for something while others didn't? Tell the story.",
      "Did you ever hide a part of who you were to fit in as a kid? How did that feel?",
      "Was there a time being honest cost you something, but you were glad you did it?",
      "Who taught you that you can be kind <i>and</i> stand firm at the same time?",
      "When were you scared but did the right thing anyway as a kid?",
    ],
    together: [
      "Name one thing this week you'll do right even if it's not popular — and back each other up.",
      "Is there someone being pressured to hide who they are? How could you stand with them?",
      "Pick a good habit — like Daniel's daily prayer — you'll both keep this week, no matter what.",
      "Think of a place it's hard to be honest. How can you help each other be brave there?",
    ],
    notAlone: [
      "Everybody feels the pull to blend in and hide — choosing to stay true is brave for grown-ups too.",
      "Doing right when it's unpopular is scary at any age. You're not the only one who finds it hard.",
      "Quiet, steady faithfulness — like Daniel's — is one of the bravest things there is, and it's rare.",
    ],
    facts: [
      { q: "What scary animals was Daniel thrown in with?", a: "Hungry lions — in a deep den — but God shut their mouths all night." },
      { q: "Why was Daniel thrown into the lions' den?", a: "Because he kept praying to God, even when a new law forbade it." },
      { q: "How many times a day did Daniel pray?", a: "Three times a day — by his open window, just as always." },
      { q: "What did God send to protect Daniel?", a: "An angel, who kept the lions from hurting him." },
      { q: "Who was the king who had Daniel thrown in the den?", a: "King Darius — who actually liked Daniel and hoped he'd be saved." },
      { q: "How did the king spend that night?", a: "So worried he couldn't sleep or eat, hoping Daniel was okay." },
      { q: "What did the king find in the morning?", a: "Daniel alive and unharmed — God had rescued him!" },
      { q: "Why did the other officials want to trap Daniel?", a: "They were jealous of how much the king trusted him." },
      { q: "What did Daniel do when he heard about the new law?", a: "He kept right on praying — he would not hide his faith." },
      { q: "What did King Darius do after Daniel was saved?", a: "He told everyone to honor Daniel's God, the living God." },
      { q: "What does Daniel's story teach about being brave?", a: "That staying faithful to God is worth it, even when it's scary." },
    ],
  },
  tomb: { // Hope
    kid: [
      "When was a time something felt hopeless, but then it turned out okay?",
      "What helps you keep going when you're sad or scared?",
      "Is it okay to be sad and still have hope at the same time? What would that look like?",
      "The women showed up even when it was dark and hard. When is it hard for you to 'show up'?",
      "Who do you go to when you need cheering up — and who comes to you?",
    ],
    parent: [
      "Tell about a time in your life that felt like an ending, but became a new beginning.",
      "When you were a kid, who showed up for you when things were hard? What did they do?",
      "Was there a season you almost gave up on something — and were glad later that you didn't?",
      "What's helped you hold onto hope through a genuinely hard time?",
      "When did someone's small act of showing up mean more to you than any fix could?",
    ],
    together: [
      "Is there someone going through a hard time you could 'show up' for this week — a note, a visit, a call?",
      "Name one worry that feels like a stone too big to move. Say it out loud together.",
      "Pick a family way to remember, when things feel dark, that the story isn't over yet.",
      "Think of good news you could go out of your way to share with someone soon.",
    ],
    notAlone: [
      "Everyone hits moments that feel hopeless — needing hope isn't weakness, it's being human.",
      "Grown-ups grieve and worry too; you don't have to pretend to be okay to be brave.",
      "Showing up for someone in the dark, before you can fix anything, is one of the most powerful things a person can do.",
    ],
    facts: [
      { q: "What was placed in front of Jesus's tomb?", a: "A great big stone, sealing the entrance shut." },
      { q: "Who came to the tomb early that morning?", a: "Some women who loved Jesus, bringing spices." },
      { q: "What did the women find when they arrived?", a: "The stone rolled away and the tomb empty!" },
      { q: "Who was waiting at the empty tomb to explain?", a: "An angel, who said, 'He is not here — He has risen!'" },
      { q: "On what day did Jesus rise from the dead?", a: "The third day — the very first Easter morning." },
      { q: "What does it mean that Jesus 'rose'?", a: "He came back to life — death could not hold Him." },
      { q: "Who was guarding the tomb before Jesus rose?", a: "Roman soldiers — but they couldn't stop what God was doing." },
      { q: "What did the women do after seeing the empty tomb?", a: "They ran to tell the disciples the wonderful news." },
      { q: "Did anyone see Jesus alive again afterward?", a: "Yes — His friends and many others saw and talked with Him." },
      { q: "Why is the empty tomb such good news for us?", a: "It shows Jesus's promises are true and gives us hope." },
      { q: "What holiday celebrates Jesus rising from the dead?", a: "Easter — the happiest morning in the whole story." },
    ],
  },
  loaves: { // God Provides
    kid: [
      "When did sharing something actually make you happier than keeping it?",
      "When do you worry there won't be enough — of food, time, or turns?",
      "What's one small thing you have plenty of that could help someone else?",
      "Is it hard to share when you don't have very much? Why?",
      "Who has shared something with you when you really needed it?",
    ],
    parent: [
      "Tell about a time you didn't have much but shared anyway — what happened?",
      "Was there a time you worried about 'enough' (money, time, food) and were provided for?",
      "Who was generous to you when you were young, in a way you still remember?",
      "When has a small gift you gave — or got — turned out to mean far more than its size?",
    ],
    together: [
      "Pick one thing your family has plenty of that you could share with someone this week.",
      "Is there a person you know who's short on something you could help with?",
      "Before your next meal, take a moment to give thanks out loud — and mean it, like Jesus did.",
      "Name a worry about 'not enough' out loud, then one small thing you could offer anyway.",
    ],
    notAlone: [
      "Almost everyone carries a quiet worry about whether there'll be enough — grown-ups included.",
      "Choosing to share when you're not sure you have enough is brave at any age.",
      "You never need to be rich or ready to help — offering the little you have is the whole secret.",
    ],
    facts: [
      { q: "About how many people did Jesus feed that day?", a: "Five thousand men, plus women and children — a huge crowd!" },
      { q: "What little bit of food did Jesus start with?", a: "Five loaves of bread and two small fish." },
      { q: "Who gave up his lunch to share?", a: "A young boy — it was his five loaves and two fish." },
      { q: "What did Jesus do before sharing the food?", a: "He looked up to heaven and gave thanks to God." },
      { q: "How much food was left over afterward?", a: "Twelve baskets full — far more than they started with!" },
      { q: "Why were the crowds following Jesus?", a: "To hear Him teach and to be healed." },
      { q: "What did the disciples worry about?", a: "That there wasn't nearly enough food for such a huge crowd." },
      { q: "What kind of miracle was this?", a: "Jesus made a tiny bit of food feed thousands of people." },
      { q: "Where did this miracle happen?", a: "On a grassy hillside near the Sea of Galilee." },
      { q: "How did the people feel after eating?", a: "Full and amazed — everyone had more than enough." },
      { q: "What does this story teach about what we have?", a: "That God can do amazing things with even our small gifts." },
    ],
  },
  eden: { // Honesty & Grace
    kid: [
      "When you do something wrong, do you want to hide it? Why do you think that is?",
      "Is it hard to say the words 'I did it'? What makes it hard?",
      "How do you feel after you finally tell the truth about something?",
      "Have you ever blamed someone else for something you did? What happened?",
      "Has someone ever forgiven you when you were sure they'd be mad? How did that feel?",
    ],
    parent: [
      "Tell about a time you hid a mistake as a kid — how did keeping it secret feel?",
      "Was there a time being honest about a wrong turned out far better than hiding it?",
      "Who forgave you for something big, and how did that change you?",
      "When you were young, did you feel safe telling a grown-up hard truths? What made the difference?",
    ],
    together: [
      "Make a family promise: telling the truth — even about a mistake — is always safe here.",
      "Agree together on what happens when someone owns a mistake: grace first, then making it right.",
      "Is anyone hiding something right now, feeling alone with it? How could you gently 'come find' each other?",
      "Practice the words out loud together: 'I did it, and I'm sorry.' They get easier with use.",
    ],
    notAlone: [
      "Hiding and blaming when we mess up is the oldest instinct there is — literally everyone feels it.",
      "Grown-ups feel shame too, and still want to hide sometimes; you're not the only one.",
      "Being loved and welcomed back after you've messed up is one of the very best feelings a person can have.",
    ],
    facts: [
      { q: "What was the name of the beautiful garden God made?", a: "The Garden of Eden — perfect and full of life." },
      { q: "Who were the first two people God created?", a: "Adam and Eve." },
      { q: "What one rule did God give about the trees?", a: "Not to eat from one special tree in the middle of the garden." },
      { q: "Who tricked Eve into breaking the rule?", a: "A crafty serpent, who told her a lie." },
      { q: "What did Adam and Eve do after they disobeyed?", a: "They felt ashamed and tried to hide from God." },
      { q: "When God asked what happened, what did they do?", a: "They blamed someone else instead of just saying, 'I did it.'" },
      { q: "What jobs did God give Adam in the garden?", a: "To take care of it and to name all the animals." },
      { q: "Did God stop loving Adam and Eve when they messed up?", a: "No — He still cared for them, even after they disobeyed." },
      { q: "How were Adam and Eve made special?", a: "God made them in His own image, to know and love Him." },
      { q: "What was the garden missing that our world has?", a: "Anything bad at all — until the very first wrong choice." },
      { q: "What does the Eden story teach about telling the truth?", a: "That hiding makes things worse — honesty is always better." },
    ],
  },
  sermon: { // How to Live
    kid: [
      "What do you think makes someone truly happy — having lots of stuff, or something else?",
      "When is it really hard to be kind to someone who was mean to you?",
      "What's a good thing you could do that nobody would ever know about?",
      "Do you treat others the way you'd want to be treated — even when it's hard?",
      "What do you worry about? Does worrying about it ever actually help?",
    ],
    parent: [
      "Who lived out quiet, everyday goodness in a way that shaped who you are?",
      "Tell about a time you were kind to someone who didn't deserve it — what happened?",
      "What's something you used to worry about a lot that never actually came true?",
      "When did doing the right thing quietly matter more than being noticed for it?",
    ],
    together: [
      "Pick one secret good deed each of you will do this week — no telling, no credit.",
      "Think of one 'hard to like' person you could be kind to or pray for this week.",
      "Name one worry out loud, then practice handing it over instead of carrying it.",
      "Make the golden rule your family motto this week: treat others how you'd want to be treated.",
    ],
    notAlone: [
      "Almost nobody finds 'love your enemies' easy — it's meant to stretch grown-ups too.",
      "Everyone worries, even knowing it doesn't help; you're in very good company.",
      "Doing good quietly, with no one clapping, is rare and beautiful — and it's the real thing.",
    ],
    facts: [
      { q: "Where did Jesus teach this famous sermon?", a: "On a mountainside, sitting down while the crowds gathered." },
      { q: "What is the 'Golden Rule' Jesus taught?", a: "Treat others the way you'd want to be treated." },
      { q: "What special prayer did Jesus teach here?", a: "The Lord's Prayer — 'Our Father, who art in heaven...'" },
      { q: "What did Jesus say to do about your enemies?", a: "Love them and pray for them — even people who are unkind." },
      { q: "Jesus said not to worry — what did He point to?", a: "The birds and the flowers, which God takes good care of." },
      { q: "What did Jesus call his followers, to help others?", a: "The 'salt of the earth' and the 'light of the world.'" },
      { q: "What did Jesus say about doing good deeds?", a: "Do them quietly for God, not to show off in front of others." },
      { q: "The 'Beatitudes' begin with which happy word?", a: "'Blessed' — like 'Blessed are the gentle and the peacemakers.'" },
      { q: "What two builders did Jesus tell a story about?", a: "One built his house on rock (wise), one on sand (foolish)." },
      { q: "What happens to the house built on the rock?", a: "It stands strong in the storm — like a life built on Jesus's words." },
      { q: "What is this whole sermon really teaching us?", a: "How to live God's way — with kindness, honesty, and trust." },
    ],
  },
};
// attach each round table to its case (keeps content grouped, cases lean)
Object.keys(ROUNDTABLES).forEach(function (id) { if (CASES[id]) CASES[id].roundtable = ROUNDTABLES[id]; });

// Export style is left flexible for Claude Code's chosen module system:
// ES modules:   export { CASES, CASE_ORDER, SHARED_RANKS };
// CommonJS:     module.exports = { CASES, CASE_ORDER, SHARED_RANKS };
// Browser glob: window.FOOTSTEPS_CASES = { CASES, CASE_ORDER, SHARED_RANKS };
if (typeof window !== "undefined") {
  window.FOOTSTEPS_CASES = { CASES, CASE_ORDER, SHARED_RANKS };
}
