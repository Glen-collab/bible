/* =====================================================================
   FOOTSTEPS OF THE TEACHER — case engine (content-driven)
   ---------------------------------------------------------------------
   Renders ANY case object from data/cases.js. It never contains story
   content — it reads the case's stops, badges, and detours.

   Usage:
     FootstepsEngine.play(caseObj, {
       onExit: () => {...},              // "back to the map"
       onComplete: (stats) => {...},     // primary CTA on the win screen
       completeLabel: "Enter the Workshop →"
     });

   Badge roles are resolved by POSITION in each case's badges object, which
   is authored in a fixed order across all cases:
     [0] begin  [1] no-hint solve  [2] investigate-all
     [3] detour endured  [4] side quest  [5] finished
   (Side quests also carry an explicit `badge` key that always wins.)
   ===================================================================== */
(function () {
  const $ = (id) => document.getElementById(id);

  const Engine = {};
  let C, opts, roles;
  let stage, wisdom, earned, visitedSpots, sqDone;
  // per-stop memory that must survive a detour + re-render
  let stopHinted, stopWrong, stopThorough;

  function resolveRoles(caseObj) {
    const keys = Object.keys(caseObj.badges);
    return {
      begin: keys[0],
      noHint: keys[1],
      thorough: keys[2],
      detour: keys[3],
      sidequest: keys[4],
      finish: keys[5],
    };
  }

  Engine.play = function (caseObj, options) {
    C = caseObj;
    opts = options || {};
    roles = resolveRoles(caseObj);
    stage = 0; wisdom = 0; earned = {}; sqDone = {};
    stopHinted = {}; stopWrong = {}; stopThorough = {};
    renderIntro();
  };

  /* ---- rewards ---- */
  function award(key) {
    if (!key || earned[key]) return;
    if (!C.badges[key]) return;           // engine only awards badges the case defines
    earned[key] = true;
    toast(`${C.badges[key].icon}  Badge: ${C.badges[key].name}`);
  }
  function addWisdom(n, why) { wisdom += n; updateStatus(); if (why) toast(`+${n} Wisdom · ${why}`); }
  function updateStatus() { const w = $('wval'); if (w) w.textContent = wisdom; }
  function toast(msg) {
    const t = $('toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2200);
  }

  function showStatusBar(show) {
    const sb = $('statusbar');
    if (!sb) return;
    sb.style.display = show ? 'flex' : 'none';
    sb.innerHTML = `<div class="left">
        <button class="backbtn" onclick="FootstepsEngine._exit()">← Map</button>
        <div class="wisdom"><span class="gem"></span><span id="wval">${wisdom}</span> Wisdom</div>
      </div>
      <div class="badgecount" onclick="FootstepsEngine._badges()">☆ Badges</div>`;
  }

  Engine._exit = function () { if (opts.onExit) opts.onExit(); };
  Engine._badges = showBadges;

  function screenEl() { return $('screen'); }
  function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  function trailDots(active) {
    let h = '<div class="trail">';
    for (let i = 0; i < C.stops.length; i++) {
      const c = i < active ? 'done' : (i === active ? 'here' : '');
      h += `<span class="dot ${c}"></span>`;
    }
    return h + '</div>';
  }

  /* ---- case intro ---- */
  function renderIntro() {
    showStatusBar(false);
    const hdr = $('appheader'); if (hdr) hdr.style.display = 'none';
    const idx = (window.FOOTSTEPS_CASES.CASE_ORDER.indexOf(C.id) + 1) || 1;
    screenEl().innerHTML = `<div id="title" style="text-align:center;padding-top:10px">
      <button class="backbtn" style="float:left" onclick="FootstepsEngine._exit()">← Map</button>
      <div class="sun"></div>
      <div class="kicker" style="margin-top:8px">Case ${roman(idx)} · ${C.theme}</div>
      <h1 style="margin-top:6px">${C.title}</h1>
      <p class="blurb">Walk beside <b>Eli</b> — investigate each place, gather clues, and choose where the trail leads. Earn <b>Wisdom</b> and collect <b>badges</b> as you go.</p>
      <div class="casebar"><div class="ct">${C.stops.length} stops · investigate, deduce, endure</div>
        <div class="cs">Theme: ${C.theme}</div></div>
      <button class="btn" onclick="FootstepsEngine._start()">Begin the Journey</button>
    </div>`;
    scrollTop();
  }
  Engine._start = function () {
    showStatusBar(true); updateStatus();
    award(roles.begin);
    renderStop();
  };

  /* ---- a stop ---- */
  function renderStop() {
    const s = C.stops[stage]; visitedSpots = 0;
    if (s.final) { renderFinal(); return; }
    screenEl().innerHTML = trailDots(stage) + `<div class="card">
      <div class="place-name">${s.place}</div><div class="place-tag">${s.tag}</div>
      <div class="eli"><div class="face">\u{1F9D2}</div><div class="said"><b>Eli:</b> ${s.eli}</div></div>
      <div class="sectlabel">Investigate · gather what you can</div>
      <div id="spots"></div>
      <div id="reveals"></div>
      <div id="decision" style="display:none">
        <div class="sectlabel">Decide · where does the trail lead?</div>
        <div class="ask">${s.ask}</div>
        <button class="hintbtn" onclick="FootstepsEngine._hint()">Need a hint?</button>
        <div class="hintbox" id="hintbox">${s.hint || ''}</div>
        <div id="choices"></div>
        <div class="fb good" id="fb"></div>
      </div></div>`;
    const sb = $('spots');
    s.spots.forEach((sp, i) => {
      const b = document.createElement('button');
      b.className = 'spot';
      b.innerHTML = `<span class="ico">${sp.ico}</span> ${sp.label}`;
      b.onclick = () => investigate(b, sp);
      sb.appendChild(b);
    });
    scrollTop();
  }

  function investigate(el, sp) {
    if (el.classList.contains('visited')) return;
    el.classList.add('visited'); el.onclick = null;
    visitedSpots++;
    const r = document.createElement('div');
    r.className = 'reveal';
    r.innerHTML = `<div class="lead">${sp.lead}</div>${sp.clue ? `<div class="clue">${sp.clue}</div>` : ''}`;
    $('reveals').appendChild(r);
    const s = C.stops[stage];
    if (visitedSpots >= s.spots.length) {
      award(roles.thorough);
      if (!stopThorough[stage]) { stopThorough[stage] = true; addWisdom(1, 'investigated everything'); }
    }
    if (visitedSpots >= 1) {
      $('decision').style.display = 'block';
      if ($('choices').childElementCount === 0) buildChoices(s);
    }
  }

  function buildChoices(s) {
    const box = $('choices');
    // shuffle the DISPLAY order so the correct answer isn't always in the same spot;
    // each button keeps its original index, so the answer logic is unchanged.
    const order = s.options.map((_, i) => i);
    for (let j = order.length - 1; j > 0; j--) { const k = Math.floor(Math.random() * (j + 1)); const t = order[j]; order[j] = order[k]; order[k] = t; }
    order.forEach((i) => {
      const b = document.createElement('button');
      b.className = 'choice'; b.textContent = s.options[i];
      b.onclick = () => pick(i, b, s);
      box.appendChild(b);
    });
    if (s.sidequest && !sqDone[stage]) {
      const sq = document.createElement('div');
      sq.className = 'sidequest';
      sq.innerHTML = `<div class="sq-t">Side Quest · ${s.sidequest.title}</div><div class="sq-d">${s.sidequest.desc}</div>`;
      const yes = document.createElement('button');
      yes.className = 'btn ghost'; yes.style.marginTop = '0'; yes.textContent = 'Stop and help';
      yes.onclick = () => doSideQuest(s, sq);
      sq.appendChild(yes);
      box.after(sq);
    }
  }

  function doSideQuest(s, node) {
    sqDone[stage] = true;
    node.innerHTML = `<div class="sq-t">${s.sidequest.title}</div><div class="sq-d" style="font-style:italic;margin-top:8px">${s.sidequest.lesson}</div>`;
    award(s.sidequest.badge || roles.sidequest);
    addWisdom(2, 'helped a neighbor');
  }

  Engine._hint = function () { const h = $('hintbox'); if (h) h.classList.add('show'); stopHinted[stage] = true; };

  function pick(i, el, s) {
    const fb = $('fb');
    if (i === s.answer) {
      document.querySelectorAll('.choice').forEach(c => { c.onclick = null; c.classList.add('locked'); });
      el.classList.remove('locked');
      const clean = !stopHinted[stage] && !stopWrong[stage];
      if (clean) { award(roles.noHint); addWisdom(2, 'solved without a hint'); }
      else { addWisdom(1, 'trail found'); }
      fb.className = 'fb good show';
      fb.innerHTML = `<b>Yes — the trail continues.</b> ${clean ? 'First try, no hint. Eli is genuinely impressed.' : 'You worked it out. Eli sees that slowing down pays off.'}`;
      const next = document.createElement('button');
      next.className = 'btn';
      next.textContent = stage < C.stops.length - 2 ? 'Travel onward →' : 'Follow the trail on →';
      next.onclick = () => { stage++; renderStop(); };
      fb.after(next);
    } else {
      stopWrong[stage] = true;
      el.classList.add('locked'); el.onclick = null;
      renderDetour(s);
    }
  }

  /* ---- gentle detour: no progress lost ---- */
  function renderDetour(s) {
    const list = C.detours && C.detours.length ? C.detours : [
      { place: 'A Wrong Road', scene: 'The path leads nowhere you meant to go, but you keep walking and you don’t give up.', lesson: 'Sometimes we take the long way. It isn’t wasted if we keep going.' }
    ];
    const d = list[Math.floor(Math.random() * list.length)];
    screenEl().innerHTML = trailDots(stage) + `<div class="card detour">
      <div class="place-name">\u{1F3DC}️ ${d.place}</div><div class="place-tag">A detour — not the end of the road</div>
      <div class="detour-scene">${d.scene}</div>
      <div class="reveal"><div class="lead">${d.lesson}</div></div>
      <button class="btn olive" onclick="FootstepsEngine._back()">Find your way back</button></div>`;
    award(roles.detour); addWisdom(1, 'endured the detour');
    scrollTop();
  }
  Engine._back = function () { renderStop(); toast('Back on the trail — try the clues again'); };

  /* ---- final reflection ---- */
  function renderFinal() {
    const s = C.stops[stage];
    screenEl().innerHTML = trailDots(stage) + `<div class="card">
      <div class="place-name">${s.place}</div><div class="place-tag">${s.tag || ''}</div>
      <div class="eli"><div class="face">\u{1F60C}</div><div class="said"><b>Eli:</b> ${s.eli}</div></div>
      <div class="reveal"><div class="clue" style="font-style:italic">${s.teaching}</div></div>
      <button class="btn olive" onclick="FootstepsEngine._win()">Complete the Case</button></div>`;
    scrollTop();
  }

  Engine._win = function () {
    award(roles.finish);
    const got = Object.keys(earned).length, tot = Object.keys(C.badges).length;
    const R = window.FOOTSTEPS_CASES.SHARED_RANKS;
    const rank = wisdom >= 12 ? R.high : wisdom >= 8 ? R.mid : R.low;
    const label = opts.completeLabel || 'Back to the map';
    screenEl().innerHTML = trailDots(C.stops.length) + `<div class="card" style="text-align:center">
      <div class="kicker" style="color:var(--olive-deep)">Case Solved</div>
      <h1 style="font-size:23px;margin:6px 0 2px">You walked the whole trail</h1>
      <div class="sun small" style="margin:12px auto"></div>
      <p class="blurb">Theme carried home: <b>${C.theme}</b>.</p>
      <div style="text-align:left;margin:16px 4px">
        <div class="stat"><span>Rank earned</span><b>${rank}</b></div>
        <div class="stat"><span>Wisdom gathered</span><b>${wisdom}</b></div>
        <div class="stat"><span>Badges</span><b>${got} of ${tot}</b></div>
      </div>
      <button class="btn" onclick="FootstepsEngine._complete()">${label}</button>
      <button class="btn ghost" onclick="FootstepsEngine._badges()">See your badges</button>
      <button class="btn olive" onclick="FootstepsEngine._exit()">Back to the map</button></div>`;
    scrollTop();
  };
  Engine._complete = function () {
    const stats = { wisdom, badges: Object.keys(earned).length, caseId: C.id };
    if (opts.onComplete) opts.onComplete(stats); else Engine._exit();
  };

  /* ---- badges modal ---- */
  function showBadges() {
    const g = $('badgegrid'); if (!g) return;
    g.innerHTML = '';
    Object.entries(C.badges).forEach(([k, b]) => {
      const has = earned[k];
      g.innerHTML += `<div class="badge ${has ? '' : 'locked'}"><div class="bi">${b.icon}</div><div class="bn">${b.name}</div><div class="bd">${has ? b.desc : 'Locked'}</div></div>`;
    });
    $('badgeModal').classList.add('show');
  }

  function roman(n) { return ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'][n] || String(n); }

  window.FootstepsEngine = Engine;
})();
