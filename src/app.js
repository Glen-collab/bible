/* =====================================================================
   FOOTSTEPS OF THE TEACHER — app shell
   ---------------------------------------------------------------------
   Top-level navigation between the home/case-picker, the case engine,
   and the coding Workshop. Content lives in /data; rendering lives in
   the engines. This file just wires them together.
   ===================================================================== */
(function () {
  const $ = (id) => document.getElementById(id);
  const { CASES, CASE_ORDER } = window.FOOTSTEPS_CASES;
  const { WORKSHOPS } = window.FOOTSTEPS_WORKSHOPS;

  const CASE_EMOJI = { jesus: '🫏', david: '🐑', moses: '🔥', ruth: '🌾', paul: '⛵', noah: '🚢', daniel: '🦁', tomb: '🌅' };
  const SCENE_EMOJI = { noahsArk: '🌈', emptyTomb: '🌅', danielDen: '🦁', feeding5000: '🐟', sermonMount: '⛰️', theManger: '👶', shepherdField: '🪨', desertJourney: '🌊', harvestField: '🌾', carryTheLight: '⚡' };

  function workshopForCase(caseId) {
    return Object.values(WORKSHOPS).find((w) => w.forCase === caseId) || null;
  }
  function standaloneScenes() {
    return Object.values(WORKSHOPS).filter((w) => w.standalone);
  }

  /* ---- home / case picker ---- */
  function renderHome() {
    $('statusbar').style.display = 'none';
    const hdr = $('appheader'); if (hdr) hdr.style.display = 'none';
    let cards = '';
    CASE_ORDER.forEach((id, i) => {
      const c = CASES[id]; if (!c) return;
      const hasWs = !!workshopForCase(id);
      cards += `<button class="case-card" onclick="FootstepsApp.startCase('${id}')">
        <span class="cc-emoji">${CASE_EMOJI[id] || '📜'}</span>
        <span class="cc-body">
          <span class="cc-num">CASE ${String(i + 1).padStart(2, '0')}${hasWs ? ' · + Workshop' : ''}</span>
          <span class="cc-name">${c.title}</span>
          <span class="cc-theme">${c.theme} · ${c.stops.length} stops</span>
        </span>
        <span class="cc-arrow">→</span>
      </button>`;
    });
    $('screen').innerHTML = `
      <div class="home-hero">
        <div class="sun"></div>
        <div class="kicker">Same Truth · New Scribes</div>
        <h1>Footsteps <em>of the Teacher</em></h1>
        <div class="home-tagline">Walk a great story. Gather the clues. Then take up the scribe's pen and build it in real code.</div>
      </div>
      <div class="intro-note">
        Each <b>case</b> follows a real journey across real places. Investigate, weigh the clues, and choose where the trail leads — earn <b>Wisdom</b> and <b>badges</b> as you go. Finish a case and its <b>Workshop</b> unlocks, where you write real JavaScript to build the scene yourself.
      </div>
      <div class="section-lab">Choose your case</div>
      ${cards}
      ${sceneSection()}
      <footer>Footsteps of the Teacher · Phase 1 web build</footer>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---- play a case, then hand off to its Workshop ---- */
  function startCase(id) {
    const c = CASES[id]; if (!c) return;
    const ws = workshopForCase(id);
    const hasRT = !!(c.roundtable && window.FootstepsRoundTable);
    window.FootstepsEngine.play(c, {
      onExit: renderHome,
      completeLabel: hasRT ? 'Talk it over with a grown-up →' : (ws ? 'Take up the pen — enter the Workshop →' : 'Back to the map'),
      onComplete: () => afterStory(c, ws),
    });
  }

  // story done -> optional Round Table -> workshop (or home)
  function afterStory(c, ws) {
    if (c.roundtable && window.FootstepsRoundTable) window.FootstepsRoundTable.play(c, { onDone: () => afterRoundTable(ws) });
    else afterRoundTable(ws);
  }
  function afterRoundTable(ws) { if (ws) startWorkshop(ws); else renderHome(); }

  function startWorkshop(ws) {
    window.FootstepsWorkshop.play(ws, { onExit: renderHome });
  }

  // "Build a Scene" — standalone workshops with no full case behind them
  function sceneSection() {
    const scenes = standaloneScenes();
    if (!scenes.length) return '';
    let cards = '';
    scenes.forEach((w) => {
      cards += `<button class="case-card" onclick="FootstepsApp.startScene('${w.id}')">
        <span class="cc-emoji">${SCENE_EMOJI[w.id] || '🛠️'}</span>
        <span class="cc-body"><span class="cc-num">BUILD A SCENE</span>
          <span class="cc-name">${w.title}</span>
          <span class="cc-theme">${w.subtitle || 'Learn to code'} · real JavaScript</span></span>
        <span class="cc-arrow">→</span></button>`;
    });
    return `<div class="section-lab">Build a scene</div>${cards}`;
  }
  function startScene(id) { const w = WORKSHOPS[id]; if (w) startWorkshop(w); }

  window.FootstepsApp = { renderHome, startCase, startWorkshop, startScene };

  document.addEventListener('DOMContentLoaded', renderHome);
})();
