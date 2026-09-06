/* =====================================================================
   FOOTSTEPS OF THE TEACHER — Round Table (parent + child discussion)
   ---------------------------------------------------------------------
   Shown between a case's story and its workshop. Two rounds share the
   same rolling structure, and the family picks which to play:

     • "Talk it over"  — heart-reflection pools (kid / parent / together).
     • "Bible Facts"   — a pool of {q, a} facts about the story; the
                         grown-up reads it, the child guesses, then reveal.

   Each pick is random each visit (no immediate repeat) — fresh, but
   always on-theme. The facts round only appears if the case defines a
   `facts` pool, so it rolls out case-by-case.

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
  const FACTS_HINT = "<b>Grown-up:</b> read it out loud, let them guess, then tap to reveal. Guessing is half the fun — no pressure to be right.";
  const VARY_NOTE = "🎲 The questions change each time — so you can come back to this table again and again.";
  const FACTS_COUNT = 3;               // how many fact cards per facts round
  const BADGE = { talk: { icon: '🫖', name: 'Round Table' }, facts: { icon: '📜', name: 'Bible Facts' } };

  let C, opts, cur, step, mode;
  let doneModes;                               // routes finished this visit, so the
                                               // done screen can offer the other one
  const lastPick = {};                         // persists across visits (in-memory)

  function pick(pool, key) {
    if (!pool || !pool.length) return '';
    if (pool.length === 1) return pool[0];
    let idx, guard = 0;
    do { idx = Math.floor(Math.random() * pool.length); guard++; } while (idx === lastPick[key] && guard < 20);
    lastPick[key] = idx;
    return pool[idx];
  }
  // pick n DISTINCT items from a pool at random (shuffled), capped at pool size
  function pickN(pool, n) {
    const a = (pool || []).slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
    return a.slice(0, Math.min(n, a.length));
  }
  function newSession() {
    const rt = C.roundtable;
    cur = {
      notAlone: pick(rt.notAlone, C.id + ':na'),
      prompts: SLOTS.map((s) => ({ label: s.label, face: s.face, hint: s.hint, key: s.key, q: pick(rt[s.key], C.id + ':' + s.key) })),
    };
  }
  function newFactsSession() {
    const rt = C.roundtable;
    cur = {
      prompts: pickN(rt.facts, FACTS_COUNT).map((f) => ({ q: f.q, a: f.a, revealed: false, face: '📜', key: 'facts' })),
    };
  }

  RT.play = function (caseObj, options) {
    C = caseObj; opts = options || {}; doneModes = new Set();
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
    step = -1; mode = null; newSession();
    const hasFacts = !!(C.roundtable && C.roundtable.facts && C.roundtable.facts.length);
    const factsBtn = hasFacts
      ? `<button class="btn olive" style="margin-top:10px" onclick="FootstepsRoundTable._start('facts')">🎲 Play Bible Facts →</button>`
      : '';
    $('screen').innerHTML = `<div class="rt-head"><div class="kicker">Round Table</div><h1>Talk it <em>over</em></h1></div>
      <div class="card">
        <p class="blurb">The story you just walked was about <b>${C.theme}</b>. Before you build the scene in code, take a few minutes together — no rushing, just talk${hasFacts ? ', or test what you remember' : ''}.</p>
        <div class="notalone">${cur.notAlone}</div>
        <div class="pnote">${PARENT_NOTE}</div>
        <p class="rt-hint" style="text-align:center;margin-top:14px">${VARY_NOTE}</p>
        <button class="btn" onclick="FootstepsRoundTable._start('talk')">Talk it over →</button>
        ${factsBtn}
        <button class="btn ghost" style="margin-top:10px" onclick="FootstepsRoundTable._skip()">Skip for now →</button>
      </div>`;
    scrollTop();
  }

  function renderPrompt(i) {
    step = i;
    const p = cur.prompts[i];
    const last = i === cur.prompts.length - 1;
    const nextLabel = last ? (mode === 'facts' ? 'All done ✓' : 'We talked it over ✓') : 'Next →';
    let body;
    if (mode === 'facts') {
      body = `<div class="rt-prompt">
        <span class="rt-who facts">Bible Fact</span>
        <div class="rt-face">${p.face}</div>
        <div class="rt-q">${p.q}</div>
        ${p.revealed
          ? `<div class="rt-answer">${p.a}</div>`
          : `<button class="btn ghost rt-reveal" onclick="FootstepsRoundTable._reveal(${i})">Show the answer</button>`}
        <div class="rt-hint">${FACTS_HINT}</div>
      </div>`;
    } else {
      body = `<div class="rt-prompt">
        <span class="rt-who ${p.key}">${p.label}</span>
        <div class="rt-face">${p.face}</div>
        <div class="rt-q">${p.q}</div>
        <div class="rt-hint">${p.hint}</div>
      </div>`;
    }
    $('screen').innerHTML = dots(i) + `<div class="card">
      ${body}
      <div class="rt-nav">
        <button class="btn ghost" onclick="FootstepsRoundTable._go(${i - 1})">←</button>
        <button class="btn ${last ? 'olive' : ''}" onclick="FootstepsRoundTable._go(${i + 1})">${nextLabel}</button>
      </div>`;
    scrollTop();
  }

  function renderDone() {
    step = cur.prompts.length;
    if (mode) doneModes.add(mode);
    const badge = BADGE[mode] || BADGE.talk;
    const blurb = mode === 'facts'
      ? "You know this story well — and every fact you remember makes it more your own. When you're ready, take up the pen and build the scene in code."
      : "You talked it over — and that conversation is part of the story now, too. When you're ready, take up the pen and build the scene in code.";

    // The two routes are a choice, not a fork in the road — whichever one you
    // just finished, the other is still here until you leave for the workshop.
    const hasFacts = !!(C.roundtable && C.roundtable.facts && C.roundtable.facts.length);
    let otherBtn = '';
    if (mode === 'facts' && !doneModes.has('talk')) {
      otherBtn = `<button class="btn" onclick="FootstepsRoundTable._start('talk')">Talk it over too →</button>`;
    } else if (mode === 'talk' && hasFacts && !doneModes.has('facts')) {
      otherBtn = `<button class="btn" onclick="FootstepsRoundTable._start('facts')">🎲 Play Bible Facts too →</button>`;
    }

    $('screen').innerHTML = dots(cur.prompts.length) + `<div class="card" style="text-align:center">
      <div class="rt-badge"><div class="bi">${badge.icon}</div><div class="bn">${badge.name}</div></div>
      <p class="blurb" style="margin-top:10px">${blurb}</p>
      ${otherBtn}
      <button class="btn olive" ${otherBtn ? 'style="margin-top:10px"' : ''} onclick="FootstepsRoundTable._done()">Take up the pen — build the scene →</button>
    </div>`;
    scrollTop();
  }

  RT._start = function (m) {
    mode = m;
    if (m === 'facts') newFactsSession(); else newSession();
    renderPrompt(0);
  };
  RT._reveal = function (i) { cur.prompts[i].revealed = true; renderPrompt(i); };
  RT._go = function (i) {
    if (i < 0) { renderIntro(); return; }
    if (i >= cur.prompts.length) { renderDone(); return; }
    renderPrompt(i);
  };
  RT._skip = function () { if (opts.onDone) opts.onDone(); };
  RT._done = function () { if (opts.onDone) opts.onDone(); };

  window.FootstepsRoundTable = RT;
})();
