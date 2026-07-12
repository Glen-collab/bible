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

  // A sprite shows real art (assets/sprites/<name>.png) if that file exists,
  // and falls back to its emoji if not. So dropping a PNG in "upgrades" a piece
  // automatically — no code change. See assets/README.md for the naming contract.
  const SPRITE_BASE = 'assets/sprites/';
  // How much of its cell each sprite fills (a mouse ≠ an elephant). Tune with
  // tools/sprite-calibrator.html; default 0.85. Only affects real-art sprites.
  const SPRITE_SCALE = {
    mouse:0.40, snail:0.42, butterfly:0.50, squirrel:0.55, toucan:0.55, baby_deer:0.60, owl:0.62, dove:0.60,
    flamingo:0.68, monkey:0.70, deer:0.72, ostrich:0.75, kangaroo:0.78, panda:0.80, rainbow:0.90,
    lion:0.95, zebra:0.95, tiger:0.98, gorilla:1.00, camel:1.00, ox:1.00, hippo:1.05, rhino:1.05, elephant:1.15, giraffe:1.20,
    goliath:1.15, joseph:1.05, mary:0.95, david:0.90, man:0.90, female:0.90,
    boulder:0.85,
  };
  // Default number of cells a piece spans when no size is given. Big illustrated
  // images (crowds, scenes) are drawn wide, so they need more cells to look right
  // next to single figures. Kids can still override with place(name, c, r, size).
  const DEFAULT_SIZE = {
    boulder: 5,
    man: 1.5, female: 1.5, angel: 1.5, mary: 1.5, joseph: 1.5, jesus: 2, king: 1.5, goliath: 2.25, david: 1.25,
    baby_jesus: 1.2, cow: 1.5, noah: 1.5, armies: 2.5, chariot: 1.8, horse: 1.25,
    crowd_listening: 4.25, daniel_lion_den: 5,
    jesus_tomb: 3, jesus_sermon: 4, jesus_teaching: 3.5, jesus_help_woman: 3.5,
    crowd_eating_fish: 1.5, jesus_2fish_2bread: 1.5, loaves_fish: 4,
  };
  const SCENE_BASE = 'assets/scenes/';
  // "Backdrop" items: placing one sets the whole scene behind the grid (instead of
  // dropping a small piece), and everything else places on top. item name -> scene file.
  const BACKDROPS = { manger: 'manger', ark: 'noahs_ark', tomb: 'jesus_tomb' };
  let backdropEl = null, backdropName = null;
  function setBackdrop(file) {
    if (!backdropEl) {
      backdropEl = document.createElement('img');
      backdropEl.className = 'stage-bg'; backdropEl.alt = '';
      $('stage').appendChild(backdropEl);   // .stage-bg has z-index:0 so it stays behind sprites
    }
    backdropEl.src = SCENE_BASE + file + '.png'; backdropName = file;
  }
  function clearBackdrop() { if (backdropEl) { backdropEl.remove(); backdropEl = null; } backdropName = null; }
  function paintSprite(el, name) {
    const emoji = (window.FOOTSTEPS_WORKSHOPS.WORKSHOP_ITEMS[name]) || '';
    el.textContent = '';
    const img = document.createElement('img');
    img.className = 'spr-img'; img.alt = '';
    const s = (SPRITE_SCALE[name] || 0.85) * 100;
    img.style.width = s + '%'; img.style.height = s + '%';
    let triedScenes = false;
    img.onerror = function () {
      if (!triedScenes) { triedScenes = true; img.src = SCENE_BASE + name + '.png'; } // try scenes/ next
      else { el.textContent = emoji; }                                                 // then fall back to emoji
    };
    img.src = SPRITE_BASE + name + '.png';
    el.appendChild(img);
  }

  let CFG, ITEMS, COLS, ROWS, opts;
  // sprites: a flat LIST of placed pieces { name, el, col, row, size, rot, flipped, _cx, _cy }.
  // A list (not one-per-cell) lets pieces STACK and overlap freely — placing one never
  // deletes another. A flock is just several sprites with the same name.
  let sprites, showGrid, rung, mode, score, target, actx;

  WS.play = function (config, options) {
    CFG = config;
    opts = options || {};
    ITEMS = window.FOOTSTEPS_WORKSHOPS.WORKSHOP_ITEMS;
    COLS = CFG.grid.cols; ROWS = CFG.grid.rows;
    sprites = []; showGrid = true; rung = 0; mode = 'guided'; score = 0; target = null;
    backdropEl = null; backdropName = null; railMsg = null;
    render();
  };

  function findByName(name) { return sprites.find((s) => s.name === name) || null; }
  const itemAt = (name, c, r) => sprites.some((s) => s.name === name && s.col === c && s.row === r);

  /* ---- build a check() for a rung from its data shape ---- */
  function rungCheck(r) {
    if (r.goalItem && BACKDROPS[r.goalItem]) return () => backdropName === BACKDROPS[r.goalItem];
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
      <div class="railtip" id="railtip" style="display:none"></div>
      <div class="toolbar">
        <div class="toggle" id="gridToggle" onclick="FootstepsWorkshop._toggleGrid()"><span class="sw"></span> Grid</div>
        <button class="palettebtn" onclick="FootstepsWorkshop._togglePalette()">📦 Objects</button>
        <button class="palettebtn" onclick="FootstepsWorkshop._toggleCommands()">⌨️ Commands</button>
      </div>
      <div class="palette" id="palette"></div>
      <div class="palette" id="commands"></div>
      <div class="stage-outer">
        <div class="ruler-top" id="rulerTop"></div>
        <div class="stage-row"><div class="ruler-left" id="rulerLeft"></div>
          <div class="stage-wrap"><div id="stage" class="grid"></div></div></div>
      </div>
      <div class="resizebar" id="resizebar" style="display:none">
        <div class="rz-row">
          <span class="rz-lab"><b id="rzname"></b></span>
          <button class="rz-b" title="smaller" onclick="FootstepsWorkshop._resize(-1)">−</button>
          <span id="rzval">1.00×</span>
          <button class="rz-b" title="bigger" onclick="FootstepsWorkshop._resize(1)">＋</button>
          <button class="rz-b" title="rotate" onclick="FootstepsWorkshop._rotateSelected()">↻</button>
          <button class="rz-b" title="flip" onclick="FootstepsWorkshop._flipSelected()">⇋</button>
          <button class="rz-b rz-del" title="delete" onclick="FootstepsWorkshop._deleteSelected()">🗑</button>
          <button class="rz-done" onclick="FootstepsWorkshop._deselect()">done</button>
        </div>
        <div class="rz-dpad">
          <span class="rz-dlab">nudge</span>
          <button class="rz-b" title="up" onclick="FootstepsWorkshop._nudge(0,-1)">↑</button>
          <button class="rz-b" title="left" onclick="FootstepsWorkshop._nudge(-1,0)">←</button>
          <button class="rz-b" title="down" onclick="FootstepsWorkshop._nudge(0,1)">↓</button>
          <button class="rz-b" title="right" onclick="FootstepsWorkshop._nudge(1,0)">→</button>
        </div>
        <div class="rz-code" id="rzcode"></div>
      </div>
      <div class="scorebar" id="scorebar"><span id="scoretxt">Practice</span><b id="scoreval">0</b></div>
      <div class="console">
        <div class="term-bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span class="ttl">code.js — type real JavaScript</span></div>
        <div id="termout"><span class="sys">// The computer is ready. Type a command and press Run.</span></div>
        <div class="inputline"><span class="prompt">&gt;</span><input id="cmd" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder='place("${firstItem()}", 3, 4)'><button class="runbtn" onclick="FootstepsWorkshop._run()">Run</button></div>
      </div>
      <div id="finalebar"></div>
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
    // optional preset scene background (e.g. the ark) — pieces get placed on top of it
    if (CFG.background) setBackdrop(CFG.background);
    // optional simple CSS landscape so pieces stand on ground instead of floating
    if (CFG.ground) stage.classList.add('ground-' + CFG.ground);
    $('rulerTop').style.gridTemplateColumns = `22px repeat(${COLS},1fr)`;
    $('rulerLeft').style.gridTemplateRows = `repeat(${ROWS},1fr)`;

    buildRulers(); buildPalette(); buildCommands(); renderRungs();
    if (CFG.rail) {
      const rt = $('railtip'); rt.style.display = 'block';
      rt.innerHTML = '🦉 <b>Ada:</b> the stone rolls on a track — <code>move("' + CFG.rail.item + '", "left")</code> opens the tomb, <code>move("' + CFG.rail.item + '", "right")</code> seals it.';
    }
    // always-available "bring the scene to life" — place freely, then run it whenever
    if (CFG.finale && window.FootstepsFinale) {
      $('finalebar').innerHTML = '<button class="btn olive" onclick="FootstepsWorkshop._finale()">🦉 Bring the scene to life — watch the code run</button>';
    }
    tutorSay(CFG.freeBuild
      ? `Fill the scene! Type <code>${escapeHtml(firstCommand())}</code> (or tap <b>📦 Objects</b>), place as many as you like in any order, then tap <b>🦉 Bring the scene to life</b>. Tap any piece to move or resize it.`
      : (CFG.rungs[0].goal
        ? `Let's start! Type <code>${escapeHtml(CFG.rungs[0].command || firstCommand())}</code> and press Run. The two numbers are <b>column</b> (across ↔) and <b>row</b> (down ↕). Once a piece is on the stage, <b>tap it</b> to make it bigger or smaller.`
        : `Let's build the scene! Follow the goal above.`));
    const cmd = $('cmd');
    cmd.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); WS._run(); } });
    cmd.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function wsTitle(t) {
    // italicize the noun after "the"/"Build the" for a little flourish, else plain
    return t.replace(/\b(the [^,]+)$/i, '<em>$1</em>');
  }
  function firstItem() { const r = (CFG.rungs || []).find(x => x.goalItem); if (r) return r.goalItem; return (CFG.items && CFG.items[0]) || Object.keys(ITEMS)[0]; }
  function firstCommand() { const r = (CFG.rungs || [])[0]; return (r && r.goalItem && r.target) ? `place("${r.goalItem}", ${r.target.col}, ${r.target.row})` : `place("${firstItem()}", 3, 3)`; }

  /* ---- the real functions the kid's JS calls ---- */
  function positionEl(el, col, row) {
    el.style.left = (col * (100 / COLS)) + '%';
    el.style.top = (row * (100 / ROWS)) + '%';
  }
  function sizeSprite(el, size) {
    el.style.width = (size * 100 / COLS) + '%';
    el.style.height = (size * 100 / ROWS) + '%';
  }
  // pieces anchor by their corner; this reports where the visual center lands
  function numStr(n) { return (n % 1 === 0) ? String(n) : n.toFixed(1); }
  function centerCells(col, row, size) { size = size || 1; return numStr(col + (size - 1) / 2) + ', ' + numStr(row + (size - 1) / 2); }
  function centerNote(col, row, size) { return '  // center at grid ' + centerCells(col, row, size); }
  function place(name, col, row, size) {
    if (typeof name !== 'string') throw { kind: 'quotes' };
    if (!(name in ITEMS)) throw { kind: 'unknownItem', got: name };
    if (BACKDROPS[name]) { setBackdrop(BACKDROPS[name]); chime(440); return name + ' set as the scene'; }
    if (CFG.rail && CFG.rail.item === name) { col = CFG.rail.home.col; row = CFG.rail.home.row; railMsg = railHint(false, name); }  // railed piece snaps home (sealed)
    if (typeof col !== 'number' || typeof row !== 'number') throw { kind: 'numbers' };
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) throw { kind: 'range', col, row };
    size = (typeof size === 'number' && size > 0) ? Math.max(0.25, Math.min(6, size)) : (DEFAULT_SIZE[name] || 1);
    const el = document.createElement('div');
    el.className = 'sprite celebrate';
    sizeSprite(el, size);
    paintSprite(el, name);
    positionEl(el, col, row, size);
    el.onclick = () => selectSprite(el);   // tap a piece to select/resize it
    $('stage').appendChild(el);
    const rec = { name, el, col, row, size, rot: 0, flipped: false, _cx: col + size / 2, _cy: row + size / 2 };
    sprites.push(rec); el._cell = rec;      // a new piece each time — overlapping is fine, nothing is replaced
    chime(520 + col * 40);
    return name + ' placed at ' + col + ', ' + row + (size !== 1 ? ', size ' + size : '') + centerNote(col, row, size);
  }
  function el_cell(el, rec) { el._cell = rec; }
  function moveRec(rec, nc, nr) {   // relocate a piece; never removes whatever it lands on
    rec.col = nc; rec.row = nr;
    rec.el.classList.add('moving');
    positionEl(rec.el, nc, nr, rec.size);
    rec._cx = nc + (rec.size || 1) / 2; rec._cy = nr + (rec.size || 1) / 2;
  }
  function move(name, a, b) {
    const s = findByName(name); if (!s) throw { kind: 'notPlaced', got: name };
    // railed piece: only rolls between "home" (sealed) and "open"
    if (CFG.rail && CFG.rail.item === name) {
      const home = CFG.rail.home, open = CFG.rail.open;
      let dest;
      if (typeof a === 'number' && typeof b === 'number') {
        const dH = Math.abs(a - home.col) + Math.abs(b - home.row), dO = Math.abs(a - open.col) + Math.abs(b - open.row);
        dest = dO < dH ? open : home;
      } else { dest = (a === 'left') ? open : home; }
      moveRec(s, dest.col, dest.row); sweepChime();
      railMsg = railHint(dest === open, name);
      return name + (dest === open ? ' rolls away — the tomb is open!' : ' rolls back — sealed.') + centerNote(dest.col, dest.row, s.size);
    }
    // move("name", col, row) -> go straight to that square
    if (typeof a === 'number' && typeof b === 'number') {
      const nc = Math.max(0, Math.min(COLS - 1, Math.round(a)));
      const nr = Math.max(0, Math.min(ROWS - 1, Math.round(b)));
      moveRec(s, nc, nr); sweepChime();
      return name + ' moves to ' + nc + ', ' + nr + centerNote(nc, nr, s.size);
    }
    // move("name", dir) or move("name", dir, steps)
    const dir = a;
    const d = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] }[dir];
    if (!d) throw { kind: 'dir', got: dir };
    const steps = (typeof b === 'number' && b > 0) ? b : (COLS + ROWS); // no count given -> slide to the edge
    const nc = Math.max(0, Math.min(COLS - 1, s.col + d[0] * steps));
    const nr = Math.max(0, Math.min(ROWS - 1, s.row + d[1] * steps));
    moveRec(s, nc, nr); sweepChime();
    return name + ' moves ' + dir + (typeof b === 'number' ? ' ' + b : '') + centerNote(nc, nr, s.size);
  }

  function removeRec(rec) {
    const i = sprites.indexOf(rec); if (i >= 0) sprites.splice(i, 1);
    rec.el.remove(); if (selected === rec.el) WS._deselect();
  }
  function remove(name) {
    if (BACKDROPS[name] && backdropName === BACKDROPS[name]) { clearBackdrop(); return name + ' removed from the scene'; }
    const s = findByName(name); if (!s) throw { kind: 'notPlaced', got: name };
    removeRec(s);
    return name + ' removed';
  }
  function applyTransform(el, rec) {
    const t = `rotate(${rec.rot || 0}deg) scaleX(${rec.flipped ? -1 : 1})`;
    const img = el.querySelector && el.querySelector('img');
    if (img) img.style.transform = t; else el.style.transform = t;
  }
  function flip(name) {
    const s = findByName(name); if (!s) throw { kind: 'notPlaced', got: name };
    s.flipped = !s.flipped; applyTransform(s.el, s);
    return name + (s.flipped ? ' flipped' : ' unflipped');
  }
  function rotate(name, deg) {
    const s = findByName(name); if (!s) throw { kind: 'notPlaced', got: name };
    if (typeof deg !== 'number') deg = 90;
    s.rot = (s.rot || 0) + deg; applyTransform(s.el, s);
    return name + ' rotated to ' + (((s.rot % 360) + 360) % 360) + '°';
  }

  /* ---- tap-a-piece to resize it (＋ / −) or delete it ---- */
  let selected = null;
  let railMsg = null;   // Ada's next open/close hint after a railed piece moves
  function railHint(isOpen, name) {
    return isOpen
      ? 'The tomb is <b>open</b>. Roll the stone back to seal it: <code>move("' + name + '", "right")</code>.'
      : 'The stone is <b>sealed</b> over the door. Roll it away to open the tomb: <code>move("' + name + '", "left")</code>.';
  }
  function codeColor(s) {
    s = String(s);
    const i = s.indexOf('//');
    let code = i >= 0 ? s.slice(0, i) : s;
    const cmt = i >= 0 ? s.slice(i) : '';
    code = code
      .replace(/("[^"]*")/g, '<span class="c-str">$1</span>')
      .replace(/\b(-?\d+(?:\.\d+)?)\b/g, '<span class="c-num">$1</span>')
      .replace(/\b(place|move|remove|flip|rotate)\b/g, '<span class="c-fn">$1</span>');
    return code + (cmt ? '<span class="c-cmt">' + cmt + '</span>' : '');
  }
  function showCode(str) {
    const el = $('rzcode'); if (!el) return;
    el.innerHTML = codeColor(str);
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
  }
  function selectSprite(el) {
    if (!el._cell) return;
    if (selected) selected.classList.remove('selected');
    selected = el; el.classList.add('selected');
    const bar = $('resizebar'); if (!bar) return;
    bar.style.display = 'flex';
    const c = el._cell;
    $('rzname').textContent = c.name;
    $('rzval').textContent = (c.size || 1).toFixed(2) + '×';
    showCode('place("' + c.name + '", ' + c.col + ', ' + c.row + ((c.size && c.size !== 1) ? ', ' + c.size : '') + ')' + centerNote(c.col, c.row, c.size || 1));
  }
  WS._resize = function (dir) {
    if (!selected || !selected._cell) return;
    const c = selected._cell;
    const sz = Math.max(0.25, Math.min(6, (c.size || 1) + dir * 0.25));
    c.size = sz; sizeSprite(selected, sz);
    // grow from the remembered center so the piece stays put as it changes size
    selected.style.left = ((c._cx - sz / 2) * 100 / COLS) + '%';
    selected.style.top = ((c._cy - sz / 2) * 100 / ROWS) + '%';
    $('rzval').textContent = sz.toFixed(2) + '×';
    showCode('place("' + c.name + '", ' + c.col + ', ' + c.row + ', ' + sz + ')  // center at grid ' + numStr(c._cx - 0.5) + ', ' + numStr(c._cy - 0.5));
    print('> place("' + c.name + '", ' + c.col + ', ' + c.row + ', ' + sz + ')', 'echo');
    chime(500 + sz * 120);
  };
  WS._deselect = function () {
    if (selected) selected.classList.remove('selected');
    selected = null;
    const bar = $('resizebar'); if (bar) bar.style.display = 'none';
  };
  WS._deleteSelected = function () {
    if (!selected || !selected._cell) return;
    const nm = selected._cell.name;
    removeRec(selected._cell);
    print('> remove("' + nm + '")', 'echo'); print('✓ ' + nm + ' removed', 'ok');
    chime(300);
  };
  WS._flipSelected = function () {
    if (!selected || !selected._cell) return;
    flip(selected._cell.name);
    showCode('flip("' + selected._cell.name + '")');
    print('> flip("' + selected._cell.name + '")', 'echo');
  };
  WS._rotateSelected = function () {
    if (!selected || !selected._cell) return;
    rotate(selected._cell.name, 45);
    showCode('rotate("' + selected._cell.name + '", 45)');
    print('> rotate("' + selected._cell.name + '", 45)', 'echo');
  };
  WS._nudge = function (dx, dy) {
    if (!selected || !selected._cell) return;
    const c = selected._cell;
    // a railed piece (the tomb stone) only rolls left/right — no floating up/down
    if (CFG.rail && CFG.rail.item === c.name) {
      if (dx === 0) { tutorSay('The stone rolls on a track — use ← to open, → to close.'); return; }
      const dir = dx < 0 ? 'left' : 'right';
      move(c.name, dir); railMsg = null;
      tutorSay(railHint(dir === 'left', c.name));
      showCode('move("' + c.name + '", "' + dir + '")');
      print('> move("' + c.name + '", "' + dir + '")', 'echo'); chime(480);
      return;
    }
    const nc = Math.max(0, Math.min(COLS - 1, c.col + dx));
    const nr = Math.max(0, Math.min(ROWS - 1, c.row + dy));
    if (nc === c.col && nr === c.row) return;
    moveRec(c, nc, nr);
    showCode('move("' + c.name + '", ' + nc + ', ' + nr + ')' + centerNote(nc, nr, c.size || 1));
    print('> move("' + c.name + '", ' + nc + ', ' + nr + ')', 'echo');
    chime(480);
  };

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
      const ico = document.createElement('span'); ico.className = 'p-ico';
      const img = document.createElement('img'); img.className = 'p-img'; img.alt = '';
      if (BACKDROPS[k]) {
        img.src = SCENE_BASE + BACKDROPS[k] + '.png';                  // backdrop items show their scene art
        img.onerror = function () { img.remove(); ico.textContent = ITEMS[k]; };
      } else {
        let tried = false;
        img.onerror = function () { if (!tried) { tried = true; img.src = SCENE_BASE + k + '.png'; } else { img.remove(); ico.textContent = ITEMS[k]; } };
        img.src = SPRITE_BASE + k + '.png';
      }
      ico.appendChild(img);
      const nm = document.createElement('span'); nm.className = 'p-name'; nm.textContent = '"' + k + '"';
      b.appendChild(ico); b.appendChild(nm);
      b.onclick = () => { const c = $('cmd'); c.value = `place("${k}", 3, 3)`; c.focus(); };
      p.appendChild(b);
    });
  }
  function buildCommands() {
    const it = firstItem();
    const CMDS = [
      ['place("' + it + '", 3, 3)', 'put something on the stage'],
      ['place("' + it + '", 3, 3, 2)', 'bigger or smaller (size)'],
      ['move("' + it + '", "right")', 'slide it to the edge'],
      ['move("' + it + '", "right", 2)', 'move it 2 squares (distance)'],
      ['move("' + it + '", 3, 4)', 'move it to a spot'],
      ['remove("' + it + '")', 'take it off the stage'],
      ['flip("' + it + '")', 'face the other way'],
      ['rotate("' + it + '", 90)', 'turn it around'],
    ];
    const p = $('commands'); p.innerHTML = '';
    CMDS.forEach(([code, desc]) => {
      const b = document.createElement('button'); b.className = 'p-item cmd-item';
      b.innerHTML = `<span class="cmd-code">${escapeHtml(code)}</span><span class="cmd-desc">${desc}</span>`;
      b.onclick = () => { const c = $('cmd'); c.value = code; c.focus(); };
      p.appendChild(b);
    });
  }
  WS._togglePalette = function () { $('palette').classList.toggle('open'); $('commands').classList.remove('open'); };
  WS._toggleCommands = function () { $('commands').classList.toggle('open'); $('palette').classList.remove('open'); };
  WS._toggleGrid = function () {
    showGrid = !showGrid;
    $('stage').classList.toggle('grid', showGrid);
    $('gridToggle').classList.toggle('off', !showGrid);
    $('rulerTop').style.opacity = showGrid ? 1 : .2;
    $('rulerLeft').style.opacity = showGrid ? 1 : .2;
  };

  function renderRungs() {
    const r = $('rungs');
    if (CFG.freeBuild) {   // no numbered steps — place anything, then bring it to life
      r.style.display = 'none';
      $('goal').innerHTML = `<div class="g-lab">Free build</div><div class="g-txt">${linkifyCode(CFG.freeGoal || 'Place whatever you like — one or many, in any order — then tap the owl button to bring it to life.')}</div>`;
      return;
    }
    r.style.display = '';
    r.innerHTML = '';
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
      case 'dir': return { msg: `Use a direction — "left", "right", "up", or "down". Add a number for distance, like move("${firstItem()}", "right", 2), or move to a spot with move("${firstItem()}", 3, 2).` };
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
    try { result = Function('place', 'move', 'remove', 'flip', 'rotate', `"use strict"; return (${raw});`)(place, move, remove, flip, rotate); }
    catch (err) { threw = err; }
    if (threw === null) {
      print('✓ ' + (result || 'done'), 'ok'); cmd.value = '';
      if (mode === 'practice') { railMsg = null; checkPractice(); return; }
      if (CFG.freeBuild) {
        if (railMsg) { tutorSay(railMsg); railMsg = null; }
        else tutorSay(`Nice — that ran! Add as many as you like, then tap <b>🦉 Bring the scene to life</b>.`);
        return;
      }
      if (rungCheck(CFG.rungs[rung])()) onRungComplete();
      else if (railMsg) tutorSay(railMsg);
      else tutorSay(`Nice — that ran! ${nudge()}`);
      railMsg = null;
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
    if (!last) { nw.innerHTML = `<button class="btn" onclick="FootstepsWorkshop._advance()">Next step →</button>`; return; }
    // last guided step done — the finale button is already always-visible below the console
    let html = '';
    if (CFG.finale && window.FootstepsFinale) tutorSay(`⭐ <b>You finished the steps!</b> Add anything else you like, then tap <b>🦉 Bring the scene to life</b> below to watch your code run.`);
    if (CFG.practice && CFG.practice.enabled) html += `<button class="btn olive" onclick="FootstepsWorkshop._practice()">Practice on your own →</button>`;
    html += `<button class="btn ghost" onclick="FootstepsWorkshop._exit()">Back to the map</button>`;
    nw.innerHTML = html;
  }
  WS._finale = function () {
    if (window.FootstepsFinale) window.FootstepsFinale.stop();
    $('nextwrap').innerHTML = '';
    const fb = $('finalebar'); if (fb) fb.style.display = 'none';
    return window.FootstepsFinale.run({
      stage: $('stage'), out: $('termout'), ada: $('tutorbody'),
      sprites: sprites, COLS: COLS, ROWS: ROWS, ITEMS: ITEMS, config: CFG.finale,
      onDone: finaleDone,
    });
  };
  function finaleDone() {
    const fb = $('finalebar'); if (fb) fb.style.display = 'block';
    let html = '';
    if (CFG.practice && CFG.practice.enabled) html += `<button class="btn olive" onclick="FootstepsWorkshop._practice()">Practice on your own →</button>`;
    html += `<button class="btn ghost" onclick="FootstepsWorkshop._exit()">Back to the map</button>`;
    $('nextwrap').innerHTML = html;
  }
  WS._advance = function () { if (CFG.freeBuild) return; rung++; $('nextwrap').innerHTML = ''; renderRungs(); tutorSay(linkifyCode(CFG.rungs[rung].goal)); $('cmd').focus(); };

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
    const keys = (CFG.items && CFG.items.length ? CFG.items : Object.keys(ITEMS)).filter(k => ITEMS[k] && !BACKDROPS[k]);
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

  WS._exit = function () { if (window.FootstepsFinale) window.FootstepsFinale.stop(); if (opts.onExit) opts.onExit(); };

  /* ---- small helpers ---- */
  function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function linkifyCode(s) {
    // wrap place(...)/move(...) calls in the goal text with <code>
    return String(s).replace(/((?:place|move)\([^)]*\))/g, '<code>$1</code>');
  }

  window.FootstepsWorkshop = WS;
})();
