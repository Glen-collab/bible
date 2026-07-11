/* =====================================================================
   FOOTSTEPS OF THE TEACHER — Round Table (parent + child discussion)
   ---------------------------------------------------------------------
   Shown between a case's story and its workshop. Reads the case's
   `roundtable` pools (kid / parent / together / notAlone) and picks one
   prompt per slot at random each visit (no immediate repeat) — fresh, but
   always on-theme. Framing, labels, and the keepsake badge are generic.

   FootstepsRoundTable.play(caseObj, { onDone })
     onDone() — proceed (to the workshop). Called on finish OR skip.
   ===================================================================== */
(function () {
  const $ = (id) => document.getElementById(id);
  const RT = {};

  const SLOTS = [
    { key: 'kid', label: 'For you', face: '🧒', hint: "Big or small — there's no wrong answer." },
    { key: 'parent', label: 'For your grown-up', face: '🧑', hint: "<b>Go first.</b> A real story from your own childhood means the most." },
    { key: 'together', label: 'Together', face: '🤝', hint: 'Say it out loud, and check in on it later.' },
  ];
  const PARENT_NOTE = "<b>Grown-ups:</b> kids share the most when <b>you go first</b> and are honest about your own struggles. There are no wrong answers here.";
  const VARY_NOTE = "🎲 The questions change each time — so you can come back to this table again and again.";
  const BADGE = { icon: '🫖', name: 'Round Table' };

  let C, opts, cur, step;
  const lastPick = {};                         // persists across visits (in-memory)

  function pick(pool, key) {
    if (!pool || !pool.length) return '';
    if (pool.length === 1) return pool[0];
    let idx, guard = 0;
    do { idx = Math.floor(Math.random() * pool.length); guard++; } while (idx === lastPick[key] && guard < 20);
    lastPick[key] = idx;
    return pool[idx];
  }
  function newSession() {
    const rt = C.roundtable;
    cur = {
      notAlone: pick(rt.notAlone, C.id + ':na'),
      prompts: SLOTS.map((s) => ({ label: s.label, face: s.face, hint: s.hint, key: s.key, q: pick(rt[s.key], C.id + ':' + s.key) })),
    };
  }

  RT.play = function (caseObj, options) {
    C = caseObj; opts = options || {};
    const sb = $('statusbar'); if (sb) sb.style.display = 'none';
    const hd = $('appheader'); if (hd) hd.style.display = 'none';
    renderIntro();
  };

  function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  function dots(active) {
    let h = '<div class="rt-dots">';
    for (let i = 0; i < cur.prompts.length; i++) { const c = i < active ? 'done' : i === active ? 'on' : ''; h += `<span class="d ${c}"></span>`; }
    return h + '</div>';
  }

  function renderIntro() {
    step = -1; newSession();
    $('screen').innerHTML = `<div class="rt-head"><div class="kicker">Round Table</div><h1>Talk it <em>over</em></h1></div>
      <div class="card">
        <p class="blurb">The story you just walked was about <b>${C.theme}</b>. Before you build the scene in code, take a few minutes together — no rushing, just talk.</p>
        <div class="notalone">${cur.notAlone}</div>
        <div class="pnote">${PARENT_NOTE}</div>
        <p class="rt-hint" style="text-align:center;margin-top:14px">${VARY_NOTE}</p>
        <button class="btn" onclick="FootstepsRoundTable._go(0)">Start the round table →</button>
        <button class="btn ghost" style="margin-top:10px" onclick="FootstepsRoundTable._skip()">Skip for now →</button>
      </div>`;
    scrollTop();
  }
  function renderPrompt(i) {
    step = i;
    const p = cur.prompts[i];
    const last = i === cur.prompts.length - 1;
    $('screen').innerHTML = dots(i) + `<div class="card">
      <div class="rt-prompt">
        <span class="rt-who ${p.key}">${p.label}</span>
        <div class="rt-face">${p.face}</div>
        <div class="rt-q">${p.q}</div>
        <div class="rt-hint">${p.hint}</div>
      </div>
      <div class="rt-nav">
        <button class="btn ghost" onclick="FootstepsRoundTable._go(${i - 1})">←</button>
        <button class="btn ${last ? 'olive' : ''}" onclick="FootstepsRoundTable._go(${i + 1})">${last ? 'We talked it over ✓' : 'Next →'}</button>
      </div>`;
    scrollTop();
  }
  function renderDone() {
    step = cur.prompts.length;
    $('screen').innerHTML = dots(cur.prompts.length) + `<div class="card" style="text-align:center">
      <div class="rt-badge"><div class="bi">${BADGE.icon}</div><div class="bn">${BADGE.name}</div></div>
      <p class="blurb" style="margin-top:10px">You talked it over — and that conversation is part of the story now, too. When you're ready, take up the pen and build the scene in code.</p>
      <button class="btn olive" onclick="FootstepsRoundTable._done()">Take up the pen — build the scene →</button>
    </div>`;
    scrollTop();
  }

  RT._go = function (i) {
    if (i < 0) { renderIntro(); return; }
    if (i >= cur.prompts.length) { renderDone(); return; }
    renderPrompt(i);
  };
  RT._skip = function () { if (opts.onDone) opts.onDone(); };
  RT._done = function () { if (opts.onDone) opts.onDone(); };

  window.FootstepsRoundTable = RT;
})();
