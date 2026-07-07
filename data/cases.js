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
const CASES = {
  jesus: CASE_JESUS,
  david: CASE_DAVID,
  moses: CASE_MOSES,
  ruth:  CASE_RUTH,
  paul:  CASE_PAUL,
};

const CASE_ORDER = ["jesus", "david", "moses", "ruth", "paul"];

/* Universal badge earned across any case (engine may reference) */
const SHARED_RANKS = {
  // wisdom thresholds -> rank label (engine can map per case or globally)
  low:  "Eager Beginner",
  mid:  "Faithful Traveler",
  high: "Patient Pilgrim",
};

// Export style is left flexible for Claude Code's chosen module system:
// ES modules:   export { CASES, CASE_ORDER, SHARED_RANKS };
// CommonJS:     module.exports = { CASES, CASE_ORDER, SHARED_RANKS };
// Browser glob: window.FOOTSTEPS_CASES = { CASES, CASE_ORDER, SHARED_RANKS };
if (typeof window !== "undefined") {
  window.FOOTSTEPS_CASES = { CASES, CASE_ORDER, SHARED_RANKS };
}
