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
  stops: [
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
  ]
};


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
  stops: [
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
  ]
};


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
  stops: [
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
  ]
};


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
  stops: [
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
  ]
};


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
  stops: [
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
  ]
};


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
  stops: [
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
  ]
};


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
  stops: [
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
  ]
};


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
  stops: [
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
  ]
};


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
  stops: [
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
  ]
};


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
  stops: [
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
  ]
};


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
};

const CASE_ORDER = ["jesus", "david", "moses", "ruth", "paul", "noah", "daniel", "tomb", "loaves", "eden"];

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
