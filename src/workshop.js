/* =====================================================================
   FOOTSTEPS OF THE TEACHER — Workshop engine (learn real code)
   ---------------------------------------------------------------------
   The kid types REAL JavaScript — place("donkey", 3, 4), move("donkey",
   "right") — and watches the scene build on a grid. Ada the owl reads
   messy attempts and offers the corrected real line ("did you mean…?").

   Config-driven: renders any workshop from data/workshops.js.
     FootstepsWorkshop.play(workshopConfig, { onExit });

   The tutor "brain" is inferIntent() — a pure (messy text -> suggested
   line) function, deliberately swappable for a future Claude API call.
   ===================================================================== */
(function () {
  const $ = (id) => document.getElementById(id);
  const WS = {};

  let CFG, ITEMS, COLS, ROWS, opts;
  // cells: "col,row" -> { name, el }.  Keying by CELL (not by name) lets the
  // same item appear in several places at once — a real flock — while move()
  // still works because it finds a sprite by name.
  let cells, showGrid, rung, mode, score, target, actx;

  WS.play = function (config, options) {
    CFG = config;
    opts = options || {};
    ITEMS = window.FOOTSTEPS_WORKSHOPS.WORKSHOP_ITEMS;
    COLS = CFG.grid.cols; ROWS = CFG.grid.rows;
    cells = {}; showGrid = true; rung = 0; mode = 'guided'; score = 0; target = null;
    render();
  };

  const keyOf = (c, r) => c + ',' + r;
  function findByName(name) {
    for (const k in cells) if (cells[k].name === name) { const p = k.split(','); return { k, el: cells[k].el, col: +p[0], row: +p[1] }; }
    return null;
  }
  const itemAt = (name, c, r) => { const s = cells[keyOf(c, r)]; return !!s && s.name === name; };

  /* ---- build a check() for a rung from its data shape ---- */
  function rungCheck(r) {
    if (r.goalMove) {
      const { item, dir } = r.goalMove;
      return () => {
        const s = findByName(item); if (!s) return false;
        if (dir === 'right') return s.col >= COLS - 2;
        if (dir === 'left') return s.col <= 1;
        if (dir === 'down') return s.row >= ROWS - 2;
        if (dir === 'up') return s.row <= 1;
        return false;
      };
    }
    if (r.goalItem && r.target) return () => itemAt(r.goalItem, r.target.col, r.target.row);
    if (r.goalItem) return () => !!findByName(r.goalItem);
    return () => true;
  }

  /* ---- render the whole workshop UI into #screen ---- */
  function render() {
    const hdr = $('appheader'); if (hdr) hdr.style.display = 'none';
    const sb = $('statusbar'); if (sb) sb.style.display = 'none';
    $('screen').innerHTML = `
      <div class="workshop-head">
        <button class="backbtn" style="float:left" onclick="FootstepsWorkshop._exit()">← Map</button>
        <div class="kicker">Workshop · ${CFG.subtitle || 'Same Truth, New Scribes'}</div>
        <h2>${wsTitle(CFG.title)}</h2>
      </div>
      <div class="rungs" id="rungs"></div>
      <div class="goal" id="goal"></div>
      <div class="toolbar">
        <div class="toggle" id="gridToggle" onclick="FootstepsWorkshop._toggleGrid()"><span class="sw"></span> Grid &amp; numbers</div>
        <button class="palettebtn" onclick="FootstepsWorkshop._togglePalette()">📦 Objects you can place</button>
      </div>
      <div class="palette" id="palette"></div>
      <div class="stage-outer">
        <div class="ruler-top" id="rulerTop"></div>
        <div class="stage-row"><div class="ruler-left" id="rulerLeft"></div>
          <div class="stage-wrap"><div id="stage" class="grid"></div></div></div>
      </div>
      <div class="scorebar" id="scorebar"><span id="scoretxt">Practice</span><b id="scoreval">0</b></div>
      <div class="console">
        <div class="term-bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span class="ttl">code.js — type real JavaScript</span></div>
        <div id="termout"><span class="sys">// The computer is ready. Type a command and press Run.</span></div>
        <div class="inputline"><span class="prompt">&gt;</span><input id="cmd" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder='place("${firstItem()}", 3, 4)'><button class="runbtn" onclick="FootstepsWorkshop._run()">Run</button></div>
      </div>
      <div class="tutor" id="tutor">
        <div class="t-head"><div class="t-face">🦉</div><div><div class="t-name">Ada <span>· your code helper</span></div></div></div>
        <div class="t-body" id="tutorbody"></div>
        <div id="dym"></div>
      </div>
      <div id="nextwrap"></div>`;

    // size the stage + rulers to the grid
    const stage = $('stage');
    stage.style.aspectRatio = `${COLS}/${ROWS}`;
    stage.style.backgroundSize = `${100 / COLS}% ${100 / ROWS}%`;
    $('rulerTop').style.gridTemplateColumns = `22px repeat(${COLS},1fr)`;
    $('rulerLeft').style.gridTemplateRows = `repeat(${ROWS},1fr)`;

    buildRulers(); buildPalette(); renderRungs();
    tutorSay(CFG.rungs[0].goal
      ? `Let's start! Type <code>${escapeHtml(CFG.rungs[0].command || firstCommand())}</code> and press Run. The two numbers are <b>column</b> (across ↔) and <b>row</b> (down ↕).`
      : `Let's build the scene! Follow the goal above.`);
    const cmd = $('cmd');
    cmd.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); WS._run(); } });
    cmd.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function wsTitle(t) {
    // italicize the noun after "the"/"Build the" for a little flourish, else plain
    return t.replace(/\b(the [^,]+)$/i, '<em>$1</em>');
  }
  function firstItem() { const r = CFG.rungs.find(x => x.goalItem); return r ? r.goalItem : Object.keys(ITEMS)[0]; }
  function firstCommand() { const r = CFG.rungs[0]; return r.goalItem && r.target ? `place("${r.goalItem}", ${r.target.col}, ${r.target.row})` : `place("${firstItem()}", 3, 4)`; }

  /* ---- the real functions the kid's JS calls ---- */
  function positionEl(el, col, row) {
    el.style.left = (col * (100 / COLS)) + '%';
    el.style.top = (row * (100 / ROWS)) + '%';
  }
  function place(name, col, row) {
    if (typeof name !== 'string') throw { kind: 'quotes' };
    if (!(name in ITEMS)) throw { kind: 'unknownItem', got: name };
    if (typeof col !== 'number' || typeof row !== 'number') throw { kind: 'numbers' };
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) throw { kind: 'range', col, row };
    const k = keyOf(col, row);
    let cell = cells[k];
    if (cell) {
      // a sprite is already in this cell — swap what it shows
      cell.name = name; cell.el.textContent = ITEMS[name];
      cell.el.classList.remove('celebrate'); void cell.el.offsetWidth; cell.el.classList.add('celebrate');
    } else {
      const el = document.createElement('div');
      el.className = 'sprite celebrate';
      el.style.width = (100 / COLS) + '%'; el.style.height = (100 / ROWS) + '%';
      el.textContent = ITEMS[name];
      positionEl(el, col, row);
      $('stage').appendChild(el);
      cells[k] = { name, el };
    }
    chime(520 + col * 40);
    return name + ' placed at ' + col + ', ' + row;
  }
  function move(name, dir) {
    const s = findByName(name); if (!s) throw { kind: 'notPlaced', got: name };
    const d = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] }[dir];
    if (!d) throw { kind: 'dir', got: dir };
    const nc = Math.max(0, Math.min(COLS - 1, s.col + d[0] * COLS));
    const nr = Math.max(0, Math.min(ROWS - 1, s.row + d[1] * ROWS));
    delete cells[s.k];
    const nk = keyOf(nc, nr);
    if (cells[nk] && cells[nk].el !== s.el) { cells[nk].el.remove(); } // clear whatever it lands on
    s.el.classList.add('moving');
    positionEl(s.el, nc, nr);
    cells[nk] = { name, el: s.el };
    sweepChime();
    return name + ' moves ' + dir + '!';
  }

  /* ---- sound ---- */
  function chime(f) { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const o = actx.createOscillator(), g = actx.createGain(); o.type = 'sine'; o.frequency.value = f; o.connect(g); g.connect(actx.destination); g.gain.setValueAtTime(.0001, actx.currentTime); g.gain.exponentialRampToValueAtTime(.15, actx.currentTime + .02); g.gain.exponentialRampToValueAtTime(.0001, actx.currentTime + .25); o.start(); o.stop(actx.currentTime + .26); } catch (e) {} }
  function sweepChime() { [440, 560, 680, 820].forEach((f, i) => setTimeout(() => chime(f), i * 90)); }
  function happyChime() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => chime(f), i * 80)); }

  function print(t, cls) { const s = document.createElement('span'); s.className = cls || ''; s.textContent = t + '\n'; $('termout').appendChild(s); $('termout').scrollTop = $('termout').scrollHeight; }

  function buildRulers() {
    const rt = $('rulerTop'); rt.innerHTML = '<span></span>';
    for (let c = 0; c < COLS; c++) rt.innerHTML += `<span>${c}</span>`;
    const rl = $('rulerLeft'); rl.innerHTML = '';
    for (let r = 0; r < ROWS; r++) rl.innerHTML += `<span>${r}</span>`;
  }
  function buildPalette() {
    const items = CFG.items && CFG.items.length ? CFG.items : Object.keys(ITEMS);
    const p = $('palette'); p.innerHTML = '';
    items.forEach((k) => {
      if (!ITEMS[k]) return;
      const b = document.createElement('button');
      b.className = 'p-item';
      b.innerHTML = `<span class="emo">${ITEMS[k]}</span>"${k}"`;
      b.onclick = () => { const c = $('cmd'); c.value = `place("${k}", 3, 3)`; c.focus(); };
      p.appendChild(b);
    });
  }
  WS._togglePalette = function () { $('palette').classList.toggle('open'); };
  WS._toggleGrid = function () {
    showGrid = !showGrid;
    $('stage').classList.toggle('grid', showGrid);
    $('gridToggle').classList.toggle('off', !showGrid);
    $('rulerTop').style.opacity = showGrid ? 1 : .2;
    $('rulerLeft').style.opacity = showGrid ? 1 : .2;
  };

  function renderRungs() {
    const r = $('rungs'); r.innerHTML = '';
    CFG.rungs.forEach((x, i) => {
      const d = document.createElement('span');
      d.className = 'rung ' + (i < rung ? 'done' : i === rung ? 'here' : '');
      d.textContent = x.label;
      r.appendChild(d);
    });
    $('goal').innerHTML = `<div class="g-lab">Your goal</div><div class="g-txt">${linkifyCode(CFG.rungs[rung].goal)}</div>`;
  }
  function tutorSay(html) { $('tutorbody').innerHTML = html; $('dym').innerHTML = ''; }

  function didYouMean(q, line) {
    $('dym').innerHTML = `<div class="didyoumean"><div class="dym-q">${q}</div><code class="dym-code">${escapeHtml(line)}</code><div class="dym-btns"><button class="dym-yes" onclick="FootstepsWorkshop._accept('${line.replace(/'/g, "\\'")}')">Yes, show me!</button><button class="dym-no" onclick="FootstepsWorkshop._dismiss()">Let me try</button></div></div>`;
  }
  WS._accept = function (l) { $('cmd').value = l; $('dym').innerHTML = ''; WS._run(true); };
  WS._dismiss = function () { $('dym').innerHTML = ''; $('cmd').focus(); };

  /* ---- the tutor brain: messy text -> suggested real line (swappable) ---- */
  function inferIntent(raw) {
    const t = raw.trim(), low = t.toLowerCase();
    let item = null;
    for (const k of Object.keys(ITEMS)) { if (low.includes(k)) item = k; }
    if (!item && /d[o0]nk|donky|donki|dnky/.test(low)) item = 'donkey';
    if (!item && /mang|crib/.test(low)) item = 'manger';
    if (!item && /star/.test(low)) item = 'star';
    if (!item && /sheep|lamb/.test(low)) item = 'sheep';
    if (!item && /sheph/.test(low)) item = 'shepherd';
    const nums = (t.match(/-?\d+/g) || []).map(Number);
    const dir = (low.match(/left|right|up|down/) || [])[0];
    const wantsMove = /move|go|walk|run|slide|cross/.test(low);
    const wantsPlace = /place|put|add|make|draw|set|spawn/.test(low) || (!wantsMove && nums.length >= 2);
    if (wantsMove && item) return { line: `move("${item}", "${dir || 'right'}")`, why: `Looks like you want to <b>move the ${item}</b>.` };
    if ((wantsPlace || item) && item) { const c = nums[0] ?? 3, r = nums[1] ?? 4; return { line: `place("${item}", ${c}, ${r})`, why: `Looks like you're placing the <b>${item}</b>${nums.length >= 2 ? ` at column ${c}, row ${r}` : ''}.` }; }
    if (nums.length >= 2 && !item) {
      const cur = CFG.rungs[rung];
      const gi = (mode === 'practice' && target) ? target.item : (cur && cur.goalItem ? cur.goalItem : firstItem());
      return { line: `place("${gi}", ${nums[0]}, ${nums[1]})`, why: `Did you want to place the <b>${gi}</b> there?` };
    }
    return null;
  }

  function explainError(e) {
    if (e && e.kind) switch (e.kind) {
      case 'quotes': return { msg: `The name needs quotes around it, like "${firstItem()}".` };
      case 'unknownItem': return { msg: `I don't know "${e.got}". Tap "Objects you can place" to see the list.` };
      case 'numbers': return { msg: `Both spots need to be numbers — a column and a row.` };
      case 'range': return { msg: `That's off the stage. Columns go 0–${COLS - 1}, rows go 0–${ROWS - 1}. You wrote ${e.col}, ${e.row}.` };
      case 'notPlaced': return { msg: `Place the ${e.got} first, then you can move it.` };
      case 'dir': return { msg: `Direction should be "left", "right", "up", or "down".` };
    }
    if (e instanceof Error && e.name === 'ReferenceError') {
      const m = (e.message.match(/variable:\s*([A-Za-z_$][\w$]*)/) || e.message.match(/([A-Za-z_$][\w$]*)\s+is not defined/) || [])[1];
      return { msg: `${m ? `"${m}"` : 'That'} isn't a command I know — the two commands are place(…) and move(…).` };
    }
    return { msg: `That's not quite valid code yet — usually a missing quote, comma, or bracket.` };
  }

  WS._run = function (fromSug) {
    const cmd = $('cmd');
    const raw = cmd.value; if (!raw.trim()) return;
    print('> ' + raw, 'echo');
    let result, threw = null;
    try { result = Function('place', 'move', `"use strict"; return (${raw});`)(place, move); }
    catch (err) { threw = err; }
    if (threw === null) {
      print('✓ ' + (result || 'done'), 'ok'); cmd.value = '';
      if (mode === 'practice') { checkPractice(); return; }
      if (rungCheck(CFG.rungs[rung])()) onRungComplete();
      else tutorSay(`Nice — that ran! ${nudge()}`);
      return;
    }
    const ex = explainError(threw); print('… ' + ex.msg, 'err');
    const g = inferIntent(raw);
    if (g) { tutorSay(`${g.why} ${ex.msg}`); didYouMean('Did you mean this?', g.line); }
    else tutorSay(`${ex.msg}<br><br>Remember the shape: <code>place("${firstItem()}", 3, 4)</code> — word in quotes, then two numbers.`);
    cmd.value = '';
  };

  function nudge() {
    const r = CFG.rungs[rung];
    if (r.goalMove) return `Send it ${r.goalMove.dir}: <code>move("${r.goalMove.item}", "${r.goalMove.dir}")</code>.`;
    if (r.goalItem && r.target) return `Get it to <b>column ${r.target.col}, row ${r.target.row}</b>: <code>place("${r.goalItem}", ${r.target.col}, ${r.target.row})</code>.`;
    return `Keep going toward the goal above!`;
  }

  function onRungComplete() {
    happyChime();
    const last = rung === CFG.rungs.length - 1;
    const msgs = [
      `🎉 <b>You did it!</b> You wrote real JavaScript and it appeared — that's exactly how coders put things on a screen.`,
      `✨ <b>Nicely done!</b> One line of code brought it to life.`,
      `🪵 <b>In place.</b> You're building a whole scene, one real line at a time.`,
      `⭐ <b>Beautiful.</b> Every piece placed with real code. You're a scribe now.`,
    ];
    tutorSay(msgs[Math.min(rung, msgs.length - 1)]);
    $('dym').innerHTML = '';
    const nw = $('nextwrap');
    if (!last) nw.innerHTML = `<button class="btn" onclick="FootstepsWorkshop._advance()">Next step →</button>`;
    else if (CFG.practice && CFG.practice.enabled) nw.innerHTML = `<button class="btn olive" onclick="FootstepsWorkshop._practice()">Now practice on your own →</button><button class="btn ghost" onclick="FootstepsWorkshop._exit()">Back to the map</button>`;
    else nw.innerHTML = `<button class="btn olive" onclick="FootstepsWorkshop._exit()">Back to the map →</button>`;
  }
  WS._advance = function () { rung++; $('nextwrap').innerHTML = ''; renderRungs(); tutorSay(linkifyCode(CFG.rungs[rung].goal)); $('cmd').focus(); };

  /* ---- free practice mode ---- */
  WS._practice = function () {
    mode = 'practice'; score = 0;
    $('nextwrap').innerHTML = ''; $('rungs').style.display = 'none';
    $('scorebar').classList.add('show');
    $('goal').innerHTML = `<div class="g-lab">Practice Mode</div><div class="g-txt">${CFG.practice.prompt || "I'll call out a spot — you write the code to place it there."}</div>`;
    tutorSay(`Free practice! Use the grid numbers to aim. When you're confident, hide the grid and picture it in your head — that's what real coders do.`);
    newTarget();
  };
  function newTarget() {
    clearTargetMark();
    const keys = (CFG.items && CFG.items.length ? CFG.items : Object.keys(ITEMS)).filter(k => ITEMS[k]);
    const item = keys[Math.floor(Math.random() * keys.length)];
    const col = Math.floor(Math.random() * COLS), row = Math.floor(Math.random() * ROWS);
    target = { item, col, row };
    const m = document.createElement('div');
    m.className = 'target-mark'; m.id = 'tmark';
    m.style.width = (100 / COLS) + '%'; m.style.height = (100 / ROWS) + '%';
    m.style.left = (col * (100 / COLS)) + '%'; m.style.top = (row * (100 / ROWS)) + '%';
    $('stage').appendChild(m);
    $('scoretxt').textContent = `Place the ${item} at ${col}, ${row}`;
    tutorSay(`Place the <b>${item}</b> at <b>column ${col}, row ${row}</b>. Write the code and press Run!`);
  }
  function clearTargetMark() { const m = $('tmark'); if (m) m.remove(); }
  function checkPractice() {
    if (itemAt(target.item, target.col, target.row)) {
      score++; $('scoreval').textContent = score; happyChime();
      tutorSay(`✅ <b>Perfect!</b> The ${target.item} is exactly where I asked. ${score >= 3 ? "You're getting good at this!" : ''}`);
      $('cmd').value = ''; setTimeout(newTarget, 1150);
    } else {
      const s = findByName(target.item);
      if (s) tutorSay(`So close! The ${target.item} landed at <b>${s.col}, ${s.row}</b>, but I asked for <b>${target.col}, ${target.row}</b>. First number is column (across), second is row (down). Try again!`);
    }
  }

  WS._exit = function () { if (opts.onExit) opts.onExit(); };

  /* ---- small helpers ---- */
  function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function linkifyCode(s) {
    // wrap place(...)/move(...) calls in the goal text with <code>
    return String(s).replace(/((?:place|move)\([^)]*\))/g, '<code>$1</code>');
  }

  window.FootstepsWorkshop = WS;
})();
