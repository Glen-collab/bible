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
  const SCENE_BASE = 'assets/scenes/';
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
        <div class="rz-code" id="rzcode"></div>
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
    // optional scene background (e.g. the ark) — animals get placed on top of it
    if (CFG.background) {
      const bg = document.createElement('img');
      bg.className = 'stage-bg'; bg.alt = '';
      bg.src = 'assets/scenes/' + CFG.background + '.png';
      stage.appendChild(bg);
    }
    $('rulerTop').style.gridTemplateColumns = `22px repeat(${COLS},1fr)`;
    $('rulerLeft').style.gridTemplateRows = `repeat(${ROWS},1fr)`;

    buildRulers(); buildPalette(); buildCommands(); renderRungs();
    tutorSay(CFG.rungs[0].goal
      ? `Let's start! Type <code>${escapeHtml(CFG.rungs[0].command || firstCommand())}</code> and press Run. The two numbers are <b>column</b> (across ↔) and <b>row</b> (down ↕). Once a piece is on the stage, <b>tap it</b> to make it bigger or smaller.`
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
  function sizeSprite(el, size) {
    el.style.width = (size * 100 / COLS) + '%';
    el.style.height = (size * 100 / ROWS) + '%';
  }
  function place(name, col, row, size) {
    if (typeof name !== 'string') throw { kind: 'quotes' };
    if (!(name in ITEMS)) throw { kind: 'unknownItem', got: name };
    if (typeof col !== 'number' || typeof row !== 'number') throw { kind: 'numbers' };
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) throw { kind: 'range', col, row };
    size = (typeof size === 'number' && size > 0) ? Math.max(0.25, Math.min(5, size)) : 1;
    const k = keyOf(col, row);
    let cell = cells[k];
    if (cell) {
      cell.name = name; cell.size = size; paintSprite(cell.el, name); sizeSprite(cell.el, size);
      cell.el.classList.remove('celebrate'); void cell.el.offsetWidth; cell.el.classList.add('celebrate');
    } else {
      const el = document.createElement('div');
      el.className = 'sprite celebrate';
      sizeSprite(el, size);
      paintSprite(el, name);
      positionEl(el, col, row);
      el.onclick = () => selectSprite(el);   // tap a piece to resize it
      $('stage').appendChild(el);
      cell = cells[k] = { name, el, size, col, row };
    }
    el_cell(cells[k].el, cells[k]);
    chime(520 + col * 40);
    return name + ' placed at ' + col + ', ' + row + (size !== 1 ? ', size ' + size : '');
  }
  function el_cell(el, rec) { el._cell = rec; }
  function reposition(s, nc, nr) {
    const rec = cells[s.k] || {};
    delete cells[s.k];
    const nk = keyOf(nc, nr);
    if (cells[nk] && cells[nk].el !== s.el) { cells[nk].el.remove(); } // clear whatever it lands on
    s.el.classList.add('moving');
    positionEl(s.el, nc, nr);
    cells[nk] = { name: rec.name, el: s.el, size: rec.size || 1, rot: rec.rot || 0, flipped: rec.flipped || false, col: nc, row: nr };
    el_cell(s.el, cells[nk]);
  }
  function move(name, a, b) {
    const s = findByName(name); if (!s) throw { kind: 'notPlaced', got: name };
    // move("name", col, row) -> go straight to that square
    if (typeof a === 'number' && typeof b === 'number') {
      const nc = Math.max(0, Math.min(COLS - 1, Math.round(a)));
      const nr = Math.max(0, Math.min(ROWS - 1, Math.round(b)));
      reposition(s, nc, nr); sweepChime();
      return name + ' moves to ' + nc + ', ' + nr;
    }
    // move("name", dir) or move("name", dir, steps)
    const dir = a;
    const d = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] }[dir];
    if (!d) throw { kind: 'dir', got: dir };
    const steps = (typeof b === 'number' && b > 0) ? b : (COLS + ROWS); // no count given -> slide to the edge
    const nc = Math.max(0, Math.min(COLS - 1, s.col + d[0] * steps));
    const nr = Math.max(0, Math.min(ROWS - 1, s.row + d[1] * steps));
    reposition(s, nc, nr); sweepChime();
    return name + ' moves ' + dir + (typeof b === 'number' ? ' ' + b : '') + '!';
  }

  function findKeyOfEl(el) { for (const k in cells) if (cells[k].el === el) return k; return null; }
  function remove(name) {
    const s = findByName(name); if (!s) throw { kind: 'notPlaced', got: name };
    delete cells[s.k]; s.el.remove();
    if (selected === s.el) WS._deselect();
    return name + ' removed';
  }
  function applyTransform(el, rec) {
    const t = `rotate(${rec.rot || 0}deg) scaleX(${rec.flipped ? -1 : 1})`;
    const img = el.querySelector && el.querySelector('img');
    if (img) img.style.transform = t; else el.style.transform = t;
  }
  function flip(name) {
    const s = findByName(name); if (!s) throw { kind: 'notPlaced', got: name };
    const rec = cells[s.k]; rec.flipped = !rec.flipped; applyTransform(s.el, rec);
    return name + (rec.flipped ? ' flipped' : ' unflipped');
  }
  function rotate(name, deg) {
    const s = findByName(name); if (!s) throw { kind: 'notPlaced', got: name };
    if (typeof deg !== 'number') deg = 90;
    const rec = cells[s.k]; rec.rot = (rec.rot || 0) + deg; applyTransform(s.el, rec);
    return name + ' rotated to ' + (((rec.rot % 360) + 360) % 360) + '°';
  }

  /* ---- tap-a-piece to resize it (＋ / −) or delete it ---- */
  let selected = null;
  function codeColor(s) {
    return String(s)
      .replace(/("[^"]*")/g, '<span class="c-str">$1</span>')
      .replace(/\b(-?\d+(?:\.\d+)?)\b/g, '<span class="c-num">$1</span>')
      .replace(/\b(place|move|remove|flip|rotate)\b/g, '<span class="c-fn">$1</span>');
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
    showCode('place("' + c.name + '", ' + c.col + ', ' + c.row + ((c.size && c.size !== 1) ? ', ' + c.size : '') + ')');
  }
  WS._resize = function (dir) {
    if (!selected || !selected._cell) return;
    let sz = Math.max(0.25, Math.min(5, (selected._cell.size || 1) + dir * 0.25));
    selected._cell.size = sz; sizeSprite(selected, sz);
    $('rzval').textContent = sz.toFixed(2) + '×';
    const c = selected._cell;
    showCode('place("' + c.name + '", ' + c.col + ', ' + c.row + ', ' + sz + ')');
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
    const k = findKeyOfEl(selected); if (k) delete cells[k];
    selected.remove();
    print('> remove("' + nm + '")', 'echo'); print('✓ ' + nm + ' removed', 'ok');
    WS._deselect();
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
      let tried = false;
      img.onerror = function () { if (!tried) { tried = true; img.src = SCENE_BASE + k + '.png'; } else { img.remove(); ico.textContent = ITEMS[k]; } };
      img.src = SPRITE_BASE + k + '.png';
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
    if (!last) { nw.innerHTML = `<button class="btn" onclick="FootstepsWorkshop._advance()">Next step →</button>`; return; }
    // last rung done — offer the finale (the "wow"), then practice / map
    let html = '';
    if (CFG.finale && window.FootstepsFinale) {
      tutorSay(`⭐ <b>You built the whole scene!</b> Want to see what your code can really do?`);
      html += `<button class="btn" onclick="FootstepsWorkshop._finale()">🦉 Bring the scene to life</button>`;
    }
    if (CFG.practice && CFG.practice.enabled) html += `<button class="btn olive" onclick="FootstepsWorkshop._practice()">Practice on your own →</button>`;
    html += `<button class="btn ghost" onclick="FootstepsWorkshop._exit()">Back to the map</button>`;
    nw.innerHTML = html;
  }
  WS._finale = function () {
    if (window.FootstepsFinale) window.FootstepsFinale.stop();
    $('nextwrap').innerHTML = '';
    return window.FootstepsFinale.run({
      stage: $('stage'), out: $('termout'), ada: $('tutorbody'),
      cells: cells, COLS: COLS, ROWS: ROWS, ITEMS: ITEMS, config: CFG.finale,
      onDone: finaleDone,
    });
  };
  function finaleDone() {
    let html = '';
    if (CFG.practice && CFG.practice.enabled) html += `<button class="btn olive" onclick="FootstepsWorkshop._practice()">Practice on your own →</button>`;
    html += `<button class="btn" onclick="FootstepsWorkshop._finale()">↻ Play the finale again</button>`;
    html += `<button class="btn ghost" onclick="FootstepsWorkshop._exit()">Back to the map</button>`;
    $('nextwrap').innerHTML = html;
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

  WS._exit = function () { if (window.FootstepsFinale) window.FootstepsFinale.stop(); if (opts.onExit) opts.onExit(); };

  /* ---- small helpers ---- */
  function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function linkifyCode(s) {
    // wrap place(...)/move(...) calls in the goal text with <code>
    return String(s).replace(/((?:place|move)\([^)]*\))/g, '<code>$1</code>');
  }

  window.FootstepsWorkshop = WS;
})();
