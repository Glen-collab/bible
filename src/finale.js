/* =====================================================================
   FOOTSTEPS OF THE TEACHER — Workshop finale ("bring the scene to life")
   ---------------------------------------------------------------------
   After the guided rungs, this animates the kid's OWN placed scene while
   streaming the REAL code that does it (displayed code === executed code).
   When it settles, a curious kid can hover/tap any line to have Ada explain
   it, and "play" lines expose a live -/+ number tinkerer.

   FootstepsFinale.run({ stage, out, ada, cells, COLS, ROWS, ITEMS, config, onDone })
     stage  #stage element (kid sprites already live here)
     out    #termout console element (code streams here)
     ada    #tutorbody element (Ada speaks by setting innerHTML)
     cells  workshop's live map "col,row" -> { name, el }
     config the workshop's `finale` data block (may be undefined -> defaults)
   FootstepsFinale.stop()  halt all animation timers (on exit / replay)
   ===================================================================== */
(function () {
  const CHAR_MS = 24;
  const F = {};
  let timers = [];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  F.stop = function () { timers.forEach(clearInterval); timers = []; };

  F.run = async function (ctx) {
    F.stop();
    const { stage, out, ada, sprites, COLS, ROWS, ITEMS } = ctx;
    const scene = sprites || [];
    const cfg = ctx.config || { sky: 'night', twinkle: 8, grass: { emoji: '🌿', n: 6, rows: [4, 5] }, dove: true, shimmer: ['star', 'lamp'], wander: ['donkey', 'sheep', 'ox', 'camel', 'dove'] };
    let linesRun = 0;

    // ---- occupancy: placed pieces + decor we add ----
    const decorKey = new Set();
    const keyOf = (c, r) => c + ',' + r;
    const occupied = new Set(scene.map((s) => keyOf(s.col, s.row)));
    const taken = (c, r) => occupied.has(keyOf(c, r)) || decorKey.has(keyOf(c, r));

    // ---- placed scene (the workshop's piece list) ----
    const placed = scene.map((s) => ({ name: s.name, el: s.el, col: s.col, row: s.row }));
    const has = (name) => placed.some((s) => s.name === name);
    const wanderEls = placed.filter((s) => (cfg.wander || []).indexOf(s.name) >= 0);

    // ---- decor sprite helpers ----
    function decor(token, c, r, cls, sprite) {
      const el = document.createElement('div');
      el.className = 'sprite ' + (cls || '');
      el.style.width = (100 / COLS) + '%'; el.style.height = (100 / ROWS) + '%';
      el.style.left = (c * (100 / COLS)) + '%'; el.style.top = (r * (100 / ROWS)) + '%';
      if (sprite) {
        // scatter a real PNG instead of an emoji (e.g. barley strands along a road).
        const img = document.createElement('img');
        img.className = 'spr-img'; img.alt = '';
        img.style.width = '100%'; img.style.height = '100%';
        img.onerror = function () { el.textContent = '🌾'; };   // last-ditch fallback
        img.src = 'assets/sprites/' + token + '.png';
        el.appendChild(img);
      } else {
        el.textContent = token;
      }
      el.dataset.k = keyOf(c, r);
      stage.appendChild(el); decorKey.add(keyOf(c, r));
      return el;
    }
    let twinkleEls = [], grassEls = [];
    function clearGroup(arr) { arr.forEach((e) => { decorKey.delete(e.dataset.k); e.remove(); }); arr.length = 0; }
    function setGroup(arr, emoji, n, rowMin, rowMax, cls, sprite) {
      clearGroup(arr);
      let made = 0, tries = 0;
      while (made < n && tries < 160) {
        tries++;
        const c = Math.floor(Math.random() * COLS);
        const r = rowMin + Math.floor(Math.random() * (rowMax - rowMin + 1));
        if (taken(c, r)) continue;
        arr.push(decor(emoji, c, r, cls, sprite)); made++;
      }
    }
    const setTwinkles = (n) => setGroup(twinkleEls, '✨', n, 0, 1, 'twinkle');
    // grass: null means the scene deliberately wants no scattered scenery — a painted
    // backdrop already fills it. Only an ABSENT key falls back to the default grass.
    const grassCfg = cfg.grass === undefined ? { emoji: '🌿', n: 6, rows: [4, 5] } : cfg.grass;
    // a scatter can be an emoji (grassCfg.emoji) or a real sprite (grassCfg.sprite).
    const grassToken = grassCfg && (grassCfg.sprite || grassCfg.emoji);
    const setGrass = (n) => setGroup(grassEls, grassToken, n, grassCfg.rows[0], grassCfg.rows[1], 'scenery', !!(grassCfg && grassCfg.sprite));

    function nightfall() { stage.classList.add('night'); }
    function shimmer(name) { const s = placed.find((x) => x.name === name); if (s) s.el.classList.add('shimmer'); }
    function lightFire(c, r) { decor('🔥', c, r, 'flicker'); }
    function roam(s) {
      const el = s.el;
      el.classList.add('roam');
      // pace SIDE TO SIDE on the row where it was placed, staying within ~2 cells
      // of that spot — so animals stay put on the deck instead of drifting off.
      const startC = s.col, startR = s.row;
      const minC = Math.max(0, startC - 2), maxC = Math.min(COLS - 1, startC + 2);
      el.dataset.c = startC;
      el.style.top = (startR * (100 / ROWS)) + '%';
      const t = setInterval(() => {
        let c = +el.dataset.c + (Math.random() < .5 ? -1 : 1);
        c = Math.max(minC, Math.min(maxC, c));
        el.dataset.c = c;
        el.style.left = (c * (100 / COLS)) + '%';   // row stays fixed
      }, 1300);
      timers.push(t);
    }
    function releaseDove() {
      const d = decor('🕊️', 0, 1, 'fly');
      requestAnimationFrame(() => { d.style.left = ((COLS - 1) * (100 / COLS)) + '%'; d.style.top = 0 + '%'; });
    }

    // ---- code streamer ----
    function color(line) {
      return line.replace(/(\/\/.*)$/, '<span class="c">$1</span>')
        .replace(/\b(for|const|of|function|await|let)\b/g, '<span class="k">$1</span>');
    }
    async function typeLine(line, explain, edit) {
      const div = document.createElement('div'); div.className = 'codeline';
      if (explain) div.dataset.explain = explain;
      if (edit) { div._edit = edit; div.classList.add('editable'); }
      const text = document.createElement('span'); div.appendChild(text);
      const caret = document.createElement('span'); caret.className = 'caret'; caret.textContent = '▋'; div.appendChild(caret);
      out.appendChild(div);
      for (let i = 0; i < line.length; i++) { text.innerHTML = color(line.slice(0, i + 1)); out.scrollTop = out.scrollHeight; await sleep(CHAR_MS); }
      text.innerHTML = color(line); caret.remove();
      linesRun++; out.scrollTop = out.scrollHeight;
    }
    const step = async (code, fn, pause, explain, edit) => { await typeLine(code, explain, edit); if (fn) fn(); await sleep(pause == null ? 650 : pause); };

    // ---- run the finale, building lines from the kid's actual scene ----
    ada.innerHTML = '<b>Ada:</b> Watch closely — the scene <i>and</i> the code…';
    out.innerHTML = '';
    out.classList.remove('teach');

    await step('// Ada is finishing the scene you built', null, 700,
      'This whole line is a <b>comment</b> — a note for people. The <code>//</code> at the front tells the computer to skip it.');

    if (cfg.sky === 'night') await step('nightfall();  // evening settles over the scene', nightfall, 1400,
      '<code>nightfall()</code> turns the sky to evening — one command changes the whole background.');

    if (cfg.twinkle) await step('twinkle(' + cfg.twinkle + ');   // stars wake up across the sky', () => setTwinkles(cfg.twinkle), 950,
      '<code>twinkle(' + cfg.twinkle + ')</code> makes that many stars sparkle. <b>Tap this line</b>, change the number with − and +, and press <b>Run</b>!',
      { value: cfg.twinkle, min: 1, max: 30, code: (n) => 'twinkle(' + n + ');   // stars wake up across the sky', run: setTwinkles, cheer: (n) => 'Now the sky has exactly <b>' + n + '</b> twinkling stars. ✨ Try another number!' });

    if (grassCfg && grassCfg.n) await step('scatter("' + grassToken + '", ' + grassCfg.n + ');  // scenery fills in', () => setGrass(grassCfg.n), 950,
      '<code>scatter</code> sprinkles that many into the scene, picking spots for you. <b>Tap this line</b> to grow it yourself.',
      { value: grassCfg.n, min: 1, max: 22, code: (n) => 'scatter("' + grassToken + '", ' + n + ');  // scenery fills in', run: setGrass, cheer: (n) => 'Now the scene has <b>' + n + '</b> — watch it change up and down. You just edited and ran real code. 🌾' });

    for (const ex of (cfg.extras || [])) {
      const exToken = ex.sprite || ex.emoji;
      await step('scatter("' + exToken + '", ' + ex.n + ');', () => setGroup([], exToken, ex.n, ex.rows[0], ex.rows[1], 'scenery', !!ex.sprite), 700,
        'The same <code>scatter</code> command again with new numbers — reusing a command is how coders build a lot, fast.');
    }

    for (const name of (cfg.shimmer || [])) {
      if (has(name)) await step(name + '.shimmer();  // your ' + name + ' begins to glow', () => shimmer(name), 1000,
        '<code>' + name + '.shimmer()</code> means “' + name + ' — do your shimmer.” The <b>' + name + '</b> you placed now glows. The <b>dot</b> means “this thing, do this action.”');
    }

    if (cfg.fire) await step('lightFire(' + cfg.fire[0] + ', ' + cfg.fire[1] + ');  // a campfire', () => lightFire(cfg.fire[0], cfg.fire[1]), 950,
      '<code>lightFire(' + cfg.fire[0] + ', ' + cfg.fire[1] + ')</code> puts a fire at column ' + cfg.fire[0] + ', row ' + cfg.fire[1] + ' — the same column/row idea you used with <code>place()</code>.');

    if (wanderEls.length) {
      await step('for (const animal of scene) {', null, 650,
        'This starts a <b>loop</b> — “for every animal you placed, do the next line,” however many there are.');
      await step('  animal.wander();  // ' + wanderEls.length + ' of them start to roam', () => wanderEls.forEach(roam), 850,
        '<code>animal.wander()</code> tells each animal to roam on its own. Because it’s <i>inside the loop</i>, <b>every</b> one does it.');
      await step('}', null, 800, 'The curly brace <code>}</code> closes the loop — it marks where “do it for every animal” ends.');
    }

    if (cfg.dove) await step('releaseDove();  // a dove crosses the sky', releaseDove, 1400,
      '<code>releaseDove()</code> sends a dove flying across the sky from one side to the other.');

    await step('// scene complete — drawn by ' + (linesRun + 1) + ' lines of real code', null, 300,
      'One more <b>comment</b> — just a note counting the lines. The computer skips it.');

    ada.innerHTML = '<b>Ada:</b> You placed the first pieces. Your code did the rest — the whole living scene, drawn by real JavaScript. <b>Curious what a line does? Hover or tap it.</b> <i>Same truth, new scribes.</i> 🌟';
    enableTeaching(out, ada);
    if (ctx.onDone) ctx.onDone();
  };

  /* ---- teaching + inline tinkerer (shared with the standalone prototype) ---- */
  function enableTeaching(out, ada) {
    out.classList.add('teach');
    const lines = out.querySelectorAll('.codeline');
    lines.forEach((el) => {
      if (!el.dataset.explain) return;
      el.classList.add('learn');
      const show = () => { lines.forEach((x) => x.classList.remove('active')); el.classList.add('active'); ada.innerHTML = '<b>Ada:</b> ' + el.dataset.explain; };
      el.addEventListener('mouseenter', show);
      el.addEventListener('click', () => { show(); if (el._edit) toggleEditor(el, ada); });
    });
    // one-time hint under the console
    const consoleEl = out.parentElement;
    if (consoleEl && !consoleEl._hinted) {
      consoleEl._hinted = true;
      const hint = document.createElement('div');
      hint.className = 'teachhint show';
      hint.innerHTML = '👆 Tap any line and Ada explains it. Lines marked <b>✎ play</b> let you change a number and Run it live.';
      consoleEl.after(hint);
    }
  }
  function toggleEditor(el, ada) { if (el._editorOpen) closeEditor(el); else openEditor(el, ada); }
  function closeEditor(el) { if (el._editbar) { el._editbar.remove(); el._editbar = null; } el._editorOpen = false; el.classList.remove('playing'); }
  function openEditor(el, ada) {
    el._editorOpen = true; el.classList.add('playing');
    const spec = el._edit; let val = spec.value;
    const codeText = el.querySelector('span');
    const bar = document.createElement('div'); bar.className = 'editbar';
    bar.innerHTML = '<span class="ed-lab">try a number →</span>'
      + '<button class="ed-b" data-d="-1">−</button><span class="ed-val"></span><button class="ed-b" data-d="1">+</button>'
      + '<button class="ed-run">Run ▶</button>';
    el.after(bar); el._editbar = bar;
    const valEl = bar.querySelector('.ed-val');
    const paint = () => { valEl.textContent = val; spec.value = val; codeText.innerHTML = colorStatic(spec.code(val)); };
    bar.querySelectorAll('.ed-b').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); val = Math.max(spec.min, Math.min(spec.max, val + +b.dataset.d)); paint(); }));
    bar.querySelector('.ed-run').addEventListener('click', (e) => { e.stopPropagation(); spec.run(val); ada.innerHTML = '<b>Ada:</b> ' + spec.cheer(val); });
    paint();
  }
  function colorStatic(line) {
    return line.replace(/(\/\/.*)$/, '<span class="c">$1</span>').replace(/\b(for|const|of|function|await|let)\b/g, '<span class="k">$1</span>');
  }

  window.FootstepsFinale = F;
})();
