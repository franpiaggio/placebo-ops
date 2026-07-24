/* ═══════════════════════════════════════════════════════════════
   PLENUM · Standing Committee on Planetary Compliance
   A deliberative body monitoring global compliance with treaties
   that regulate small talk, punctuality, and biscuit reserves.
   Political in posture, absurd in jurisdiction, neutral in fact.

   World map is a hand-built dot-matrix (point-in-polygon over
   coarse continent outlines). Everything is canvas 2D — no libs.
   Opus 4.8.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

const $  = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const rand  = (a, b) => a + Math.random() * (b - a);
const randi = (a, b) => Math.floor(rand(a, b + 1));
const pick  = (a) => a[Math.floor(Math.random() * a.length)];
const _last = new WeakMap();
const pickNR = (a) => { let v; do { v = pick(a); } while (a.length > 1 && v === _last.get(a)); _last.set(a, v); return v; };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const pad   = (n, l = 2) => String(n).padStart(l, '0');
const hex   = (n) => n.toString(16).toUpperCase().padStart(4, '0');

let DISORDER = false;

/* ═══════════════ CONTENT ═══════════════ */

/* Delegations — real cities used strictly as neutral coordinates. */
const NODES = [
  { city: 'GENEVA',    del: 14, lat:  46.2, lon:   6.1 },
  { city: 'NEW YORK',  del: 27, lat:  40.7, lon: -74.0 },
  { city: 'VIENNA',    del: 9,  lat:  48.2, lon:  16.4 },
  { city: 'NAIROBI',   del: 41, lat:  -1.3, lon:  36.8 },
  { city: 'SINGAPORE', del: 33, lat:   1.3, lon: 103.8 },
  { city: 'BRASÍLIA',  del: 55, lat: -15.8, lon: -47.9 },
  { city: 'TOKYO',     del: 21, lat:  35.7, lon: 139.7 },
  { city: 'CANBERRA',  del: 61, lat: -35.3, lon: 149.1 },
  { city: 'REYKJAVÍK', del: 2,  lat:  64.1, lon: -21.9 },
  { city: 'NEW DELHI', del: 44, lat:  28.6, lon:  77.2 },
  { city: 'CAIRO',     del: 20, lat:  30.0, lon:  31.2 },
  { city: 'OTTAWA',    del: 13, lat:  45.4, lon: -75.7 },
  { city: 'PRETORIA',  del: 38, lat: -25.7, lon:  28.2 },
  { city: 'ASTANA',    del: 47, lat:  51.2, lon:  71.4 },
  { city: 'LIMA',      del: 52, lat: -12.0, lon: -77.0 },
  { city: 'OSLO',      del: 6,  lat:  59.9, lon:  10.7 },
];

const MAP_EVENTS = [
  'unscheduled applause detected — no motion was before the floor',
  'delegation seen sharing biscuits without tabling a resolution',
  'punctuality exceeded treaty ceiling by 4 minutes — inquiry opened',
  'small-talk reserves replenished ahead of quarterly summit',
  'consensus reached prematurely — reconvening to slow it down',
  'unsanctioned enthusiasm registered at coastal monitoring buoy',
  'coffee break ran 90 seconds over Protocol 14-B allowance',
  'two delegations agreed on something — sub-committee alarmed',
  'umbrella-readiness index nominal despite clear skies',
  'a footnote was ratified without debate — precedent noted',
  'quorum achieved by accident — chair advised not to mention it',
  'regional patience index recovered after prolonged meeting',
  'someone used the good stationery — audit forthcoming',
  'nap detected during plenary — logged as "strategic reflection"',
  'handshake duration within tolerance — firmness commendable',
  'unauthorized optimism vented near the observation deck',
];

const RES_TITLES = [
  'On the Standardization of the Mid-Meeting Coffee Break',
  'Concerning the Non-Proliferation of Unsolicited Feedback',
  'Regulating the Global Reserve of Small Talk',
  'On Mandatory Minimum Enthusiasm at Ribbon Cuttings',
  'Establishing a Ceiling for Elevator Silence',
  'Protocol on the Fair Distribution of Window Seats',
  'On the Ethical Sourcing of Committee Biscuits',
  'Concerning the Right to Leave a Meeting Early',
  'Regulating Cross-Border Flow of Weekend Plans',
  'On the Universal Standard for the Word "Fine"',
  'Establishing Quiet Hours in the International Airspace of Opinions',
  'Concerning the Recognition of Mondays as a Load-Bearing Day',
  'On the Global Registry of Slightly Wrong Clocks',
  'Regulating the Import and Export of Second Opinions',
  'On the Preservation of Awkward Silences as Cultural Heritage',
  'Concerning the Ceremonial Handshake and its Firmness',
  'Establishing a Buffer Zone Around Lunch',
  'On the Ratification of the Term "Circling Back"',
];

const CABLE_FROM = () => `DELEGATION-${pad(pick(NODES).del)}`;
const CABLE_BODY = [
  'Requesting emergency quorum re: biscuit tin depletion in Annex C.',
  'Confirm receipt of the good pens. Repeat: the good pens.',
  'The other delegation nodded. We are interpreting this as consent.',
  'Motion to extend the coffee break has itself been tabled indefinitely.',
  'Weather nominal. Morale nominal. Agenda item 7 remains unreadable.',
  'They served the small biscuits again. Filing formal disappointment.',
  'Consensus is forming. Requesting instructions on how to prevent it.',
  'Umbrella deployed preemptively. Sky remains uncooperatively clear.',
  'Delegate fell asleep. We have logged it as "deep strategic listening".',
  'The clock in Chamber 4 is 3 minutes fast. This is now a jurisdictional matter.',
  'Handshake was firm. Perhaps too firm. Awaiting further guidance.',
  'Someone said "let\'s take this offline". No one knows where offline is.',
  'The footnote has been ratified. The footnote now has its own footnote.',
  'Requesting clarification on whether Thursday counts. It always has. Confirm.',
  'We have run out of ways to say "noted". Please advise on synonyms.',
  'Adjournment blocked by a delegate who wished to add "one small thing".',
];

const DIR_TITLES = [
  'sanctions on unsolicited feedback',
  'moratorium on premature consensus',
  'embargo on the phrase "quick question"',
  'temporary ceiling on meeting duration',
  'restriction on same-day agenda changes',
  'quota on decorative but unread reports',
  'freeze on new working groups',
  'ban on scheduling meetings before coffee',
  'tariff on the export of second opinions',
  'curfew on optimism after 17:00 local',
  'levy on excessive punctuality',
  'suspension of the word "synergy"',
];

const REGIONS = [
  { name: 'NORTHERN SECTOR', v: 84 },
  { name: 'ATLANTIC RIM',    v: 71 },
  { name: 'CENTRAL BELT',    v: 62 },
  { name: 'EQUATORIAL ARC',  v: 78 },
  { name: 'PACIFIC SPHERE',  v: 55 },
  { name: 'SOUTHERN REACH',  v: 90 },
  { name: 'POLAR ANNEX',     v: 97 },
];

/* Larger pool the ledger rotates through — the 7 map macro-regions
   plus extra sub-jurisdictions (some geographic, some absurd). */
const LEDGER_POOL = [
  ...REGIONS, // by reference — drifting these also feeds the map choropleth + quorum
  { name: 'BOREAL FRONTIER', v: 66 },
  { name: 'MERIDIAN ARC',    v: 73 },
  { name: 'TEMPORAL BUFFER', v: 81 },
  { name: 'BISCUIT ZONE 7',  v: 59 },
  { name: 'QUIET QUARTER',   v: 88 },
  { name: 'LUNCH PERIMETER', v: 64 },
  { name: 'SMALLTALK BASIN', v: 70 },
  { name: 'PUNCTUALITY BELT',v: 47 },
  { name: 'CONSENSUS SHELF', v: 92 },
  { name: 'ELEVATOR SHAFT',  v: 76 },
  { name: 'STATIONERY WING', v: 68 },
  { name: 'COFFEE CORRIDOR', v: 61 },
  { name: 'MONDAY MARGIN',   v: 43 },
  { name: 'FOOTNOTE ANNEX',  v: 85 },
];

const POSTURES = [
  { label: 'DECOROUS',    cls: '' },
  { label: 'CORDIAL',     cls: '' },
  { label: 'GUARDED',     cls: 'warn' },
  { label: 'TENSE',       cls: 'warn' },
  { label: 'FRACTIOUS',   cls: 'crit' },
];

/* ═══════════════ UPLINK HANDSHAKE ═══════════════ */

const UPLINK_STEPS = [
  ['ESTABLISHING SECURE UPLINK', 'OK'],
  ['AUTHENTICATING CREDENTIALS', 'OK'],
  ['SYNCING GEOSAT CONSTELLATION', '7/7'],
  ['DECRYPTING CABLE STREAM', 'OK'],
  ['LOADING TREATY REGISTER', '2,841'],
  ['CONVENING PLENARY SESSION', '4,412'],
];

function runUplink(done) {
  const box = $('#uplinkLines');
  let i = 0;
  (function step() {
    if (i >= UPLINK_STEPS.length) {
      setTimeout(() => {
        $('#uplink').classList.add('off');
        document.body.classList.add('convened');
        done();
      }, 520);
      return;
    }
    const [label, ok] = UPLINK_STEPS[i];
    const line = document.createElement('div');
    line.innerHTML = `<b>›</b> ${label} <span class="ok">${ok}</span>`;
    box.appendChild(line);
    i++;
    setTimeout(step, rand(230, 400));
  })();
}

/* ═══════════════ CLOCK ═══════════════ */

function startClock() {
  const utc = $('#utc');
  setInterval(() => {
    const n = new Date();
    utc.textContent = `${pad(n.getUTCHours())}:${pad(n.getUTCMinutes())}:${pad(n.getUTCSeconds())}`;
  }, 1000);
}

/* ═══════════════ WORLD MAP · dot-matrix ═══════════════ */
/* Coarse continent outlines as [lon,lat] polygons. Reconizable,
   not accurate. Point-in-polygon fills a lat/lon grid with dots. */

const LANDMASSES = [
  { r: 'NORTHERN SECTOR', p: [[-168,65],[-160,71],[-140,70],[-125,70],[-95,72],[-80,73],[-60,68],[-55,52],[-70,45],[-80,42],[-81,25],[-97,25],[-105,20],[-110,23],[-117,32],[-125,40],[-125,48],[-135,58],[-150,60],[-168,65]] }, // N America
  { r: 'SOUTHERN REACH',  p: [[-81,8],[-77,0],[-80,-5],[-75,-15],[-70,-20],[-70,-40],[-73,-52],[-68,-55],[-63,-40],[-58,-34],[-48,-25],[-35,-8],[-35,-5],[-50,0],[-60,5],[-77,10],[-81,8]] }, // S America
  { r: 'NORTHERN SECTOR', p: [[-45,60],[-30,60],[-20,70],[-25,80],[-40,83],[-55,80],[-58,70],[-45,60]] }, // Greenland
  { r: 'ATLANTIC RIM',    p: [[-10,36],[-9,44],[-5,48],[0,50],[3,51],[-2,58],[6,62],[15,68],[28,71],[30,60],[40,58],[42,50],[38,46],[28,41],[20,39],[12,40],[6,44],[-2,43],[-9,37],[-10,36]] }, // Europe
  { r: 'ATLANTIC RIM',    p: [[-10,51],[-6,55],[-3,58],[-2,53],[1,52],[-5,50],[-10,51]] }, // UK/Ireland
  { r: 'EQUATORIAL ARC',  p: [[-17,15],[-17,27],[-10,35],[10,37],[11,33],[20,32],[32,31],[35,25],[43,12],[51,12],[42,-2],[40,-15],[35,-22],[25,-34],[18,-35],[12,-18],[8,4],[-8,5],[-17,15]] }, // Africa
  { r: 'EQUATORIAL ARC',  p: [[43,-12],[50,-15],[50,-25],[45,-25],[43,-12]] }, // Madagascar
  { r: 'CENTRAL BELT',    p: [[30,60],[28,71],[60,73],[100,77],[140,73],[168,70],[180,68],[180,62],[160,61],[140,53],[135,45],[130,43],[122,40],[120,32],[110,21],[108,10],[95,8],[92,20],[88,22],[80,10],[77,8],[72,20],[60,25],[50,28],[45,40],[40,45],[45,50],[40,58],[30,60]] }, // Asia
  { r: 'PACIFIC SPHERE',  p: [[130,31],[135,34],[140,38],[142,43],[140,45],[137,37],[132,33],[130,31]] }, // Japan
  { r: 'PACIFIC SPHERE',  p: [[95,5],[105,0],[106,-6],[98,-4],[95,2],[95,5]] }, // Sumatra
  { r: 'PACIFIC SPHERE',  p: [[108,-6],[115,-8],[113,-8],[105,-7],[108,-6]] }, // Java
  { r: 'PACIFIC SPHERE',  p: [[109,4],[117,4],[118,-3],[110,-4],[109,4]] }, // Borneo
  { r: 'PACIFIC SPHERE',  p: [[120,18],[126,14],[126,6],[121,7],[120,18]] }, // Philippines
  { r: 'PACIFIC SPHERE',  p: [[131,-1],[150,-6],[147,-9],[132,-9],[131,-1]] }, // New Guinea
  { r: 'PACIFIC SPHERE',  p: [[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[145,-16],[150,-22],[153,-28],[150,-38],[143,-39],[135,-35],[129,-32],[115,-34],[113,-26],[114,-22]] }, // Australia
  { r: 'PACIFIC SPHERE',  p: [[166,-45],[174,-41],[178,-38],[173,-42],[168,-47],[166,-45]] }, // NZ
  { r: 'NORTHERN SECTOR', p: [[-24,64],[-14,64],[-14,66],[-22,67],[-24,64]] }, // Iceland
];

function pointInPoly(lon, lat, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
    if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) inside = !inside;
  }
  return inside;
}

const REGION_IDX = {};
REGIONS.forEach((r, i) => REGION_IDX[r.name] = i);

/* Precompute land points once (lat/lon + region). */
const LAND = [];
(function buildLand() {
  for (let lat = -78; lat <= 82; lat += 2) {
    for (let lon = -178; lon <= 178; lon += 2) {
      let region = null;
      if (lat < -63) { region = 'POLAR ANNEX'; }       // Antarctica cap
      else {
        for (const m of LANDMASSES) {
          if (pointInPoly(lon, lat, m.p)) { region = m.r; break; }
        }
      }
      if (region) LAND.push({ lat, lon, ri: REGION_IDX[region] });
    }
  }
})();

const mapState = {
  events: [], arcs: [], sweep: 0, frame: 0,
  W: 0, H: 0, base: null, activeNode: null,
};

function initMap() {
  const wrap = $('.map-wrap');
  const canvas = $('#mapCanvas');
  const dpr = Math.min(devicePixelRatio, 2);
  const ctx = canvas.getContext('2d');

  const project = (lat, lon, W, H) => [
    (lon + 180) / 360 * W,
    (90 - lat) / 180 * H,
  ];

  function buildBase() {
    const W = mapState.W, H = mapState.H;
    const oc = document.createElement('canvas');
    oc.width = W * dpr; oc.height = H * dpr;
    const c = oc.getContext('2d');
    c.scale(dpr, dpr);
    LAND.forEach((pt) => {
      const [x, y] = project(pt.lat, pt.lon, W, H);
      const comp = REGIONS[pt.ri].v;
      // tint by compliance: high = blue-green, low = amber
      let col;
      if (comp >= 80) col = 'rgba(79,180,119,0.55)';
      else if (comp >= 65) col = 'rgba(77,157,255,0.5)';
      else if (comp >= 52) col = 'rgba(217,164,65,0.5)';
      else col = 'rgba(230,66,94,0.5)';
      c.fillStyle = col;
      c.fillRect(x - 0.9, y - 0.9, 1.8, 1.8);
    });
    mapState.base = oc;
  }

  function resize() {
    mapState.W = wrap.clientWidth;
    mapState.H = wrap.clientHeight;
    canvas.width = mapState.W * dpr;
    canvas.height = mapState.H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildBase();
  }
  new ResizeObserver(resize).observe(wrap);
  resize();
  setInterval(buildBase, 5200); // recolor as compliance drifts

  $('#mapNodes').textContent = `NODES ${NODES.length}/${NODES.length}`;

  mapState.fireEvent = (node, desc) => {
    const [x, y] = project(node.lat, node.lon, mapState.W, mapState.H);
    mapState.events.push({ x, y, t: 0, r: 0 });
    mapState.activeNode = node;
    // maybe draw an uplink arc to another node
    if (Math.random() < 0.6) {
      let other = pick(NODES);
      while (other === node) other = pick(NODES);
      const [x2, y2] = project(other.lat, other.lon, mapState.W, mapState.H);
      mapState.arcs.push({ x1: x, y1: y, x2, y2, t: 0 });
    }
    // readout
    const n = new Date();
    $('.mr-tag').textContent = `◈ ${Math.random() < 0.3 ? 'FLASH' : 'INTERCEPT'} · DEL-${pad(node.del)}`;
    $('.mr-loc').textContent = `${node.city} SECTOR`;
    $('.mr-meta').textContent =
      `SIGINT ${randi(71, 99)}% · ${rand(12, 21).toFixed(3)} MHz · lat ${node.lat.toFixed(1)} lon ${node.lon.toFixed(1)}`;
    $('.mr-desc').textContent = desc;
  };

  let prev = performance.now();
  (function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min((now - prev) / 1000, 0.1);
    prev = now;
    const W = mapState.W, H = mapState.H;
    if (!W) return;

    ctx.clearRect(0, 0, W, H);
    if (mapState.base) ctx.drawImage(mapState.base, 0, 0, W, H);

    // sweep line (scanning longitudes W→E, wraps)
    mapState.sweep = (mapState.sweep + dt * (DISORDER ? 60 : 24)) % 360;
    const sx = mapState.sweep / 360 * W;
    const grad = ctx.createLinearGradient(sx - 60, 0, sx, 0);
    grad.addColorStop(0, 'rgba(77,157,255,0)');
    grad.addColorStop(1, 'rgba(77,157,255,0.12)');
    ctx.fillStyle = grad;
    ctx.fillRect(sx - 60, 0, 60, H);
    ctx.strokeStyle = 'rgba(120,180,255,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, H); ctx.stroke();
    $('#sweepDeg').textContent = pad(Math.round(mapState.sweep - 180 + 180), 3);

    // arcs
    for (let i = mapState.arcs.length - 1; i >= 0; i--) {
      const a = mapState.arcs[i];
      a.t += dt / 2.4;
      const mx = (a.x1 + a.x2) / 2, my = (a.y1 + a.y2) / 2 - Math.abs(a.x2 - a.x1) * 0.18 - 20;
      ctx.strokeStyle = `rgba(217,164,65,${0.5 * (1 - a.t)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(a.x1, a.y1);
      ctx.quadraticCurveTo(mx, my, a.x2, a.y2);
      ctx.stroke();
      // packet
      const tt = clamp(a.t * 1.4, 0, 1);
      const px = (1 - tt) * (1 - tt) * a.x1 + 2 * (1 - tt) * tt * mx + tt * tt * a.x2;
      const py = (1 - tt) * (1 - tt) * a.y1 + 2 * (1 - tt) * tt * my + tt * tt * a.y2;
      ctx.fillStyle = `rgba(240,196,105,${1 - a.t})`;
      ctx.beginPath(); ctx.arc(px, py, 2, 0, 6.28); ctx.fill();
      if (a.t >= 1) mapState.arcs.splice(i, 1);
    }

    // static nodes
    NODES.forEach((nd) => {
      const [x, y] = project(nd.lat, nd.lon, W, H);
      nd._x = x; nd._y = y;
      ctx.fillStyle = 'rgba(205,216,236,0.75)';
      ctx.fillRect(x - 1, y - 1, 2, 2);
      ctx.strokeStyle = 'rgba(77,157,255,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 6.28); ctx.stroke();
    });

    // event pings
    for (let i = mapState.events.length - 1; i >= 0; i--) {
      const e = mapState.events[i];
      e.t += dt;
      const k = e.t / 2;
      const r = k * 34;
      ctx.strokeStyle = `rgba(230,66,94,${0.9 * (1 - k)})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(e.x, e.y, r, 0, 6.28); ctx.stroke();
      if (k < 0.4) {
        ctx.fillStyle = `rgba(240,196,105,${1 - k * 2.5})`;
        ctx.beginPath(); ctx.arc(e.x, e.y, 4, 0, 6.28); ctx.fill();
      }
      if (k >= 1) mapState.events.splice(i, 1);
    }

    // active node crosshair
    if (mapState.activeNode && mapState.activeNode._x) {
      const nd = mapState.activeNode;
      ctx.strokeStyle = 'rgba(240,196,105,0.6)';
      ctx.lineWidth = 1;
      const s = 7;
      ctx.beginPath();
      ctx.moveTo(nd._x - s, nd._y); ctx.lineTo(nd._x - 3, nd._y);
      ctx.moveTo(nd._x + 3, nd._y); ctx.lineTo(nd._x + s, nd._y);
      ctx.moveTo(nd._x, nd._y - s); ctx.lineTo(nd._x, nd._y - 3);
      ctx.moveTo(nd._x, nd._y + 3); ctx.lineTo(nd._x, nd._y + s);
      ctx.stroke();
    }

    mapState.frame++;
  })(prev);
}

function triggerMapEvent() {
  const node = pick(NODES);
  const desc = pickNR(MAP_EVENTS);
  mapState.fireEvent(node, desc);
  logCable(node, desc);
}

/* ═══════════════ GAUGES (SEC·A) ═══════════════ */

const GAUGES = [
  { name: 'AWKWARDNESS POSTURE', unit: '/5', v: 2.4, min: 1, max: 5, step: 0.4, dec: 1, invert: true },
  { name: 'SMALL-TALK RESERVE',  unit: '%', v: 68,  min: 20, max: 95, step: 5, dec: 0 },
  { name: 'PATIENCE INDEX',      unit: '',  v: 74,  min: 30, max: 99, step: 6, dec: 0 },
  { name: 'CONSENSUS INTEGRITY', unit: '%', v: 88,  min: 55, max: 99, step: 3, dec: 0 },
];

function initGauges() {
  const wrap = $('#gauges');
  const dpr = Math.min(devicePixelRatio, 2);
  GAUGES.forEach((g, i) => {
    const el = document.createElement('div');
    el.className = 'gauge';
    el.innerHTML = `<canvas id="gc${i}"></canvas>
      <div class="g-name">${g.name}</div>
      <div class="g-val" id="gv${i}">—<small>${g.unit}</small></div>`;
    wrap.appendChild(el);
  });

  function draw(i) {
    const g = GAUGES[i];
    const c = $(`#gc${i}`);
    const w = c.clientWidth, h = c.clientHeight;
    if (!w) return;
    c.width = w * dpr; c.height = h * dpr;
    const x = c.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cx = w / 2, cy = h - 4, R = Math.min(w / 2 - 6, h - 8);
    const A0 = Math.PI, A1 = 0;
    // track
    x.lineWidth = 3;
    x.strokeStyle = 'rgba(41,64,102,0.6)';
    x.beginPath(); x.arc(cx, cy, R, A0, A1); x.stroke();
    // ticks
    for (let t = 0; t <= 10; t++) {
      const a = A0 + (A1 - A0) * (t / 10);
      const r0 = R - 2, r1 = R + 3;
      x.strokeStyle = 'rgba(56,74,99,0.8)';
      x.lineWidth = 1;
      x.beginPath();
      x.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
      x.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      x.stroke();
    }
    // value arc
    const frac = (g.v - g.min) / (g.max - g.min);
    const av = A0 + (A1 - A0) * frac;
    let danger = g.invert ? frac > 0.6 : frac < 0.35;
    let warn = g.invert ? frac > 0.4 : frac < 0.55;
    const col = danger ? '#e6425e' : warn ? '#d9a441' : '#4fb477';
    x.lineWidth = 3;
    x.strokeStyle = col;
    x.shadowColor = col; x.shadowBlur = 6;
    x.beginPath(); x.arc(cx, cy, R, A0, av); x.stroke();
    x.shadowBlur = 0;
    // needle
    x.strokeStyle = '#eef3fb';
    x.lineWidth = 1.5;
    x.beginPath();
    x.moveTo(cx, cy);
    x.lineTo(cx + Math.cos(av) * (R - 4), cy + Math.sin(av) * (R - 4));
    x.stroke();
    x.fillStyle = '#eef3fb';
    x.beginPath(); x.arc(cx, cy, 2.5, 0, 6.28); x.fill();

    $(`#gv${i}`).innerHTML = `${g.v.toFixed(g.dec)}<small>${g.unit}</small>`;
  }

  function update() {
    GAUGES.forEach((g, i) => {
      const surge = DISORDER ? 2.5 : 1;
      g.v = clamp(g.v + rand(-g.step, g.step) * surge, g.min, g.max);
      draw(i);
    });
  }
  update();
  setInterval(update, 2200);
  addEventListener('resize', () => GAUGES.forEach((_, i) => draw(i)));
}

/* ═══════════════ LEDGER (SEC·A2) ═══════════════ */

function initLedger() {
  const wrap = $('#ledger');
  const SLOTS = 7;
  const shown = Array.from({ length: SLOTS }, (_, i) => i); // pool index per visible slot

  const rows = [];
  for (let i = 0; i < SLOTS; i++) {
    const el = document.createElement('div');
    el.className = 'lrow';
    el.innerHTML = `<span class="lname"></span>
      <div class="ltrack"><div class="lfill"></div></div>
      <span class="lval"></span>`;
    wrap.appendChild(el);
    rows.push(el);
  }

  function renderSlot(i) {
    const r = LEDGER_POOL[shown[i]];
    const row = rows[i];
    row.querySelector('.lname').textContent = r.name;
    const f = row.querySelector('.lfill');
    f.style.width = r.v + '%';
    f.className = 'lfill' + (r.v < 52 ? ' low' : r.v < 66 ? ' warn' : '');
    row.querySelector('.lval').innerHTML = `${Math.round(r.v)}<small>%</small>`;
  }

  function drift() {
    LEDGER_POOL.forEach((r) => { r.v = clamp(r.v + rand(-4, 4), 38, 99); });
    for (let i = 0; i < SLOTS; i++) renderSlot(i);
    updateQuorum();
  }

  function rotate() {
    const available = LEDGER_POOL
      .map((_, idx) => idx)
      .filter((idx) => !shown.includes(idx));
    if (!available.length) return;
    const slot = randi(0, SLOTS - 1);
    const next = pick(available);
    const row = rows[slot];
    row.classList.add('swapping');
    setTimeout(() => {
      shown[slot] = next;
      renderSlot(slot);
      requestAnimationFrame(() => row.classList.remove('swapping'));
    }, 320);
  }

  for (let i = 0; i < SLOTS; i++) renderSlot(i);
  drift();
  setInterval(drift, 3400);
  setInterval(rotate, 5500);
}

/* ═══════════════ RESOLUTIONS (SEC·C) ═══════════════ */

let resSeq = 2846;

function spawnResolution() {
  const list = $('#resList');
  if (list.querySelectorAll('.res:not(.gone)').length >= 4) return;
  const no = ++resSeq;
  const title = pickNR(RES_TITLES);
  const el = document.createElement('div');
  el.className = 'res s-debate';
  el.dataset.state = 'debate';
  let f = randi(20, 60), a = randi(10, 40), x = randi(5, 30);
  el.innerHTML = `
    <div class="res-top">
      <span class="res-no">RES/${no}</span>
      <span class="res-status s-debate">IN DEBATE</span>
    </div>
    <div class="res-title">${title}</div>
    <div class="res-votes">
      <span class="vf">FOR <b class="vf-n">${f}</b></span>
      <span class="va">AGST <b class="va-n">${a}</b></span>
      <span class="vx">ABS <b class="vx-n">${x}</b></span>
    </div>
    <div class="res-bar"><i class="bf"></i><i class="ba"></i><i class="bx"></i></div>`;
  list.prepend(el);

  const setBar = () => {
    const tot = f + a + x || 1;
    el.querySelector('.bf').style.width = f / tot * 100 + '%';
    el.querySelector('.ba').style.width = a / tot * 100 + '%';
    el.querySelector('.bx').style.width = x / tot * 100 + '%';
  };
  setBar();

  // live voting
  const voteIv = setInterval(() => {
    f += randi(0, 4); a += randi(0, 3); x += randi(0, 1);
    el.querySelector('.vf-n').textContent = f;
    el.querySelector('.va-n').textContent = a;
    el.querySelector('.vx-n').textContent = x;
    setBar();
  }, 1400);

  // resolve after a while
  setTimeout(() => {
    clearInterval(voteIv);
    const vetoed = Math.random() < 0.28;
    const adopted = !vetoed && f > a;
    const st = vetoed ? 'vetoed' : adopted ? 'adopted' : 'tabled';
    const label = vetoed ? 'VETOED' : adopted ? 'ADOPTED' : 'TABLED';
    el.className = `res s-${st}`;
    el.dataset.state = st;
    const badge = el.querySelector('.res-status');
    badge.className = `res-status s-${st}`;
    badge.textContent = label;
    logTicker(`RES/${no} ${label}`, st);
    setTimeout(() => {
      el.classList.add('gone');
      setTimeout(() => el.remove(), 500);
    }, 3800);
  }, randi(7000, 12000));

  el._forceResolve = () => {
    clearInterval(voteIv);
    el.className = 'res s-adopted';
    const badge = el.querySelector('.res-status');
    badge.className = 'res-status s-adopted';
    badge.textContent = 'ADOPTED';
    setTimeout(() => { el.classList.add('gone'); setTimeout(() => el.remove(), 500); }, 2200);
  };
}

function initResolutions() {
  for (let i = 0; i < 3; i++) setTimeout(spawnResolution, i * 700);
  setInterval(spawnResolution, 6500);
  $('#ratifyAll').onclick = () => {
    $$('#resList .res').forEach((el) => el._forceResolve && el._forceResolve());
    logTicker('CHAIR RATIFIED ALL PENDING RESOLUTIONS — RECORD TIME', 'adopted');
  };
}

/* ═══════════════ DIRECTIVES (SEC·C2) ═══════════════ */

let dirSeq = 87;

function spawnDirective() {
  const wrap = $('#directives');
  if (wrap.querySelectorAll('.dir').length >= 3) {
    wrap.lastElementChild && wrap.lastElementChild.remove();
  }
  const no = ++dirSeq;
  const letter = pick(['A', 'B', 'C', 'D']);
  const title = pickNR(DIR_TITLES);
  const scope = pick(['GLOBAL', 'NORTHERN SECTOR', 'ATLANTIC RIM', 'PACIFIC SPHERE', 'ALL DELEGATIONS']);
  const el = document.createElement('div');
  el.className = 'dir';
  el.innerHTML = `
    <div class="dir-top">
      <span class="dir-no">DIRECTIVE ${no}-${letter}</span>
      <span class="dir-scope">${scope}</span>
    </div>
    <div class="dir-title">${title}</div>
    <div class="dir-meta">
      <span>COMPLIANCE <b>${randi(58, 94)}%</b></span>
      <span>ENFORCEMENT <b>${pick(['STRICT', 'ADVISORY', 'CEREMONIAL', 'SPORADIC'])}</b></span>
    </div>
    <div class="dir-count" style="width:100%"></div>`;
  wrap.prepend(el);

  let life = randi(30, 55);
  const bar = el.querySelector('.dir-count');
  const iv = setInterval(() => {
    life--;
    bar.style.width = clamp(life / 55 * 100, 0, 100) + '%';
    if (life <= 0) {
      clearInterval(iv);
      el.querySelector('.dir-title').innerHTML += ' <span style="color:var(--green)">· EXPIRED</span>';
      setTimeout(() => el.remove(), 2000);
    }
  }, 1000);
}

function initDirectives() {
  spawnDirective();
  setTimeout(spawnDirective, 1500);
  setInterval(spawnDirective, 9000);
}

/* ═══════════════ CABLES (SEC·D) ═══════════════ */

function logCable(node, contextDesc) {
  const box = $('#cables');
  const from = node ? `DELEGATION-${pad(node.del)}` : CABLE_FROM();
  const to = Math.random() < 0.5 ? 'SECRETARIAT' : CABLE_FROM();
  const flash = Math.random() < 0.35;
  const n = new Date();
  const t = `${pad(n.getUTCHours())}:${pad(n.getUTCMinutes())}:${pad(n.getUTCSeconds())}Z`;
  const body = pickNR(CABLE_BODY);
  const el = document.createElement('div');
  el.className = 'cable';
  el.innerHTML = `
    <div class="cable-h">
      <span class="cable-id">CABLE 0x${hex(randi(4096, 65535))}</span>
      <span class="cable-flash ${flash ? 'flash' : 'routine'}">${flash ? 'PRIORITY FLASH' : 'ROUTINE'}</span>
      <span class="cable-route">${from} <span class="arw">→</span> ${to}</span>
    </div>
    <div class="cable-meta">${t} · SIGINT ${randi(74, 99)}% · ${rand(12, 21).toFixed(3)} MHz · GEOSAT-${randi(1, 7)} · PROTO PLX-${randi(2, 9)}</div>
    <div class="cable-body">${body}</div>`;
  box.prepend(el);
  while (box.children.length > 14) box.lastElementChild.remove();
}

function initCables() {
  logCable(null);
  (function loop() {
    logCable(null);
    setTimeout(loop, DISORDER ? rand(500, 1200) : rand(3200, 6500));
  })();
}

/* ═══════════════ TICKER ═══════════════ */

const TICKER_STATIC = [
  ['SMALL-TALK RESERVES', '▲2.1%', 'up'],
  ['MONDAYS', 'SANCTIONED', 'amb'],
  ['GLOBAL QUORUM', '88%', ''],
  ['PATIENCE INDEX', '▼0.4', 'dn'],
  ['BISCUIT FUTURES', '▲6.7%', 'up'],
  ['PREMATURE CONSENSUS', 'EMBARGOED', 'amb'],
  ['ELEVATOR SILENCE', 'WITHIN CEILING', ''],
  ['UNSOLICITED FEEDBACK', 'DOWN 12%', 'up'],
  ['MEETINGS RUNNING LONG', '▲3', 'dn'],
  ['THE WORD "SYNERGY"', 'SUSPENDED', 'amb'],
  ['UMBRELLA READINESS', 'NOMINAL', ''],
  ['SECOND OPINIONS', 'TARIFFED', 'amb'],
  ['PUNCTUALITY', 'FLAGGED AS SUSPICIOUS', 'dn'],
  ['COFFEE BREAK OVERRUN', '90s', 'dn'],
];

function buildTicker() {
  const track = $('#ticker');
  const make = () => TICKER_STATIC.map(([k, v, c]) =>
    `<span><b>${k}</b> <span class="${c}">${v}</span></span>`).join('');
  track.innerHTML = make() + make(); // doubled for seamless loop
}

function logTicker(msg, cls) {
  const track = $('#ticker');
  const span = document.createElement('span');
  const c = cls === 'adopted' ? 'up' : cls === 'vetoed' ? 'dn' : 'amb';
  span.innerHTML = `<b>◈</b> <span class="${c}">${msg}</span>`;
  track.prepend(span);
  if (track.children.length > 40) track.lastElementChild.remove();
}

/* ═══════════════ QUORUM / POSTURE ═══════════════ */

let postureIdx = 0;

function updateQuorum() {
  const avg = REGIONS.reduce((s, r) => s + r.v, 0) / REGIONS.length;
  $('#quorum').textContent = Math.round(avg) + '%';
  $('#motions').textContent = $$('#resList .res').length + randi(3, 9);

  // posture derived from consensus integrity gauge + randomness
  const ci = GAUGES[3].v;
  let target = ci > 85 ? 0 : ci > 78 ? 1 : ci > 70 ? 2 : ci > 62 ? 3 : 4;
  if (DISORDER) target = 4;
  postureIdx += Math.sign(target - postureIdx);
  postureIdx = clamp(postureIdx, 0, 4);
  const p = POSTURES[postureIdx];
  const el = $('#postureV');
  el.textContent = p.label;
  el.className = 'posture-v ' + p.cls;
}

/* ═══════════════ MOTION TO ADJOURN (dramatic) ═══════════════ */

function initAdjourn() {
  const btn = $('#adjourn');
  let cooling = false;
  btn.onclick = () => {
    if (cooling) return;
    cooling = true;
    DISORDER = true;
    btn.classList.add('hot');
    document.body.classList.add('disorder');
    $('#orderText').textContent = '◈ THE CHAIR HAS LOST CONTROL OF THE ROOM ◈';
    logTicker('MOTION TO ADJOURN — CHAOS ON THE FLOOR', 'vetoed');
    triggerMapEvent();
    spawnResolution();

    setTimeout(() => { $('#orderText').textContent = '◈ DELEGATES SHOUTING PROCEDURALLY ◈'; }, 1400);
    setTimeout(() => { $('#orderText').textContent = '◈ SOMEONE HAS INVOKED RULE 40(b) ◈'; }, 2800);
    setTimeout(() => {
      DISORDER = false;
      document.body.classList.remove('disorder');
      btn.classList.remove('hot');
      logTicker('ORDER RESTORED — SESSION RESUMES — NOTHING WAS DECIDED', 'adopted');
    }, 4400);
    setTimeout(() => { cooling = false; }, 6200);
  };
}

/* ═══════════════ IGNITION ═══════════════ */

runUplink(() => {
  startClock();
  initGauges();
  initLedger();
  initMap();
  initResolutions();
  initDirectives();
  initCables();
  buildTicker();
  initAdjourn();
  updateQuorum();
  setTimeout(triggerMapEvent, 1400);
  setInterval(() => { if (!DISORDER) triggerMapEvent(); }, 5200);
});
