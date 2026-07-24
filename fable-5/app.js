/* ═══════════════════════════════════════════════════════════════
   ARGUS · Planetary Oversight Terminal
   Monitoring everything. Understanding nothing.
   Three.js for the orbital picture; every other instrument is
   hand-rolled canvas 2D. No chart libraries were consulted.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

const $  = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const rand   = (a, b) => a + Math.random() * (b - a);
const randi  = (a, b) => Math.floor(rand(a, b + 1));
const pick   = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp  = (v, a, b) => Math.min(b, Math.max(a, v));
const pad    = (n, l = 2) => String(n).padStart(l, '0');

const MISSION_EPOCH = Date.parse('1997-04-13T06:00:00Z');
const ORBIT_MINUTES = 92.68;

let ALARM = false;

/* ═══════════════ CONTENT POOLS ═══════════════ */

const STATIONS = [
  { name: 'REYKJAVÍK',  lat:  64.1, lon: -21.9 },
  { name: 'SVALBARD',   lat:  78.2, lon:  15.6 },
  { name: 'GOLDSTONE',  lat:  35.4, lon:-116.9 },
  { name: 'QUITO',      lat:  -0.2, lon: -78.5 },
  { name: 'SÃO PAULO',  lat: -23.5, lon: -46.6 },
  { name: 'CAPE TOWN',  lat: -33.9, lon:  18.4 },
  { name: 'MADRID',     lat:  40.4, lon:  -3.7 },
  { name: 'LAGOS',      lat:   6.5, lon:   3.4 },
  { name: 'MUMBAI',     lat:  19.1, lon:  72.9 },
  { name: 'SINGAPORE',  lat:   1.3, lon: 103.8 },
  { name: 'TOKYO',      lat:  35.7, lon: 139.7 },
  { name: 'CANBERRA',   lat: -35.3, lon: 149.1 },
  { name: 'HONOLULU',   lat:  21.3, lon:-157.9 },
];

const GLOBE_EVENTS = [
  'Puffin census drift +2.1% · recount ordered',
  'Ionospheric hum matches a popular lullaby',
  'Tide arrived 14 cm early · praised for initiative',
  'Aurora rehearsal detected · opening night Thursday',
  'Submarine cable humming in D minor',
  'Cloud formation resembles previous cloud formation',
  '4,012 starlings departed on schedule',
  'Sahara dust shipment en route · ETA Thursday',
  'Bioluminescent bloom glowing without a permit',
  'Volcano cleared its throat · no further statement',
  'Jet stream drifted 40 km north · shrug issued',
  'Lighthouse blinked twice · other lighthouse replied',
  'Coffee consumption spike · deemed structural',
  'Magnetic north wandering again · compasses briefed',
  'Whale choir tuning near fiber route · audio quality: superb',
  'Glacier advanced 4 cm · fastest this fiscal quarter',
  'Container ship reports sea "very flat today"',
  'Monsoon filed correct paperwork for once',
  'Meteor shower RSVP’d late · slot found anyway',
  'Fog bank loitering with intent to be atmospheric',
];

const LOG_CHK = [
  'magnetotail integrity … NOMINAL',
  'equator still equidistant … VERIFIED',
  'gravity holding at 9.81 … APPRECIATED',
  'GPS constellation agrees on where everything is',
  'ozone layer patched · see release notes',
  'moon phase sync check … 100%',
  'tectonic plates moving at agreed speed',
  'atmospheric pressure peer-reviewed',
  'day/night cycle executed without incident',
  'planetary rotation: 1 (one) per day · CONFIRMED',
  'sea level double-checked against the sea',
  'horizon rendered at all longitudes',
  'sunrise deployed to production (rolling east→west)',
  'core temperature warm · as designed',
  'Van Allen belts holding their shape',
  'checksum of Pacific Ocean … MATCH',
];

const LOG_EVT = [
  'baguette futures stable · Paris relay',
  'global elevator smalltalk down 2.4%',
  'Monday detected in 41 timezones',
  'collective déjà vu event logged · logged',
  'antipodes still perfectly opposed',
  'tide at Bay of Fundy: enthusiastic',
  'pigeon #88,214 deviated from flight plan · forgiven',
  'Mariana Trench pressure: peer reviewed',
  'cumulus cloud achieved ideal fluffiness · archived',
  'international date line experienced mild confusion',
  'the Alps remain pointy · trend stable',
  'humidity in Singapore: yes',
  'penguin huddle efficiency at record 94%',
  'wind over Patagonia showing off again',
  'global hum briefly harmonized · nobody noticed',
  'sunset in Santorini rated 9.7 · judges strict',
  'Gulf Stream maintaining its opinion',
  'sand dune in Namibia relocated 11 cm · paperwork filed',
];

const ANOMALIES = [
  { sev:'amber', title:'IONOSPHERIC HUM +3 dB', loc:'SRI LANKA SECTOR',
    body:'Frequency matches a well-known lullaby. Investigating politely.' },
  { sev:'grey',  title:'RUBBER DUCK FLOTILLA', loc:'NORTH PACIFIC GYRE',
    body:'6,142 units adrift since the 1992 shipment. Morale reportedly high.' },
  { sev:'amber', title:'HUMPBACK KARAOKE', loc:'TRANS-ATLANTIC CABLE 7',
    body:'Whale song bleeding into fiber traffic. Users report improved mood.' },
  { sev:'red',   title:'MOON SMUGNESS +0.3%', loc:'LUNAR ORBIT',
    body:'Cause unknown. Telescope operators advised not to engage.' },
  { sev:'grey',  title:'SPONTANEOUS APPLAUSE', loc:'LISBON · TRAM 28',
    body:'No performance detected. Applause deemed structural.' },
  { sev:'amber', title:'JET LAG CLUSTER', loc:'IST–JFK CORRIDOR',
    body:'212 passengers unsure what day it is. Consensus forming slowly.' },
  { sev:'grey',  title:'BIOLUMINESCENT BLOOM', loc:'TASMAN SEA',
    body:'Ocean glowing unsupervised. Aesthetic risk assessed: acceptable.' },
  { sev:'amber', title:'UNSCHEDULED RAINBOW', loc:'QUITO HIGHLANDS',
    body:'Double variant. Meteorology refuses to take credit.' },
  { sev:'red',   title:'SLOW BLIMP', loc:'FL180 · MID-ATLANTIC',
    body:'Extremely slow. Direction: eventually west. Tracking at our leisure.' },
  { sev:'amber', title:'MAGNETIC NORTH WANDERING', loc:'ARCTIC SHELF',
    body:'Pole drifting toward Siberia again. Compass vendors notified.' },
  { sev:'grey',  title:'GLACIER OVERTAKE ATTEMPT', loc:'SVALBARD',
    body:'Glacier moved 4 cm past a slower glacier. Sportsmanship: intact.' },
  { sev:'amber', title:'SYNCHRONIZED YAWNING', loc:'UTC+8 BAND',
    body:'3 yawns in 5 minutes across the timezone. Caffeine uplink armed.' },
  { sev:'grey',  title:'FOG WITH MAIN-CHARACTER ENERGY', loc:'SAN FRANCISCO BAY',
    body:'Rolling in dramatically. Bridge partially obscured for effect.' },
  { sev:'amber', title:'SEAGULL AT SENSOR ARRAY', loc:'REYKJAVÍK STATION',
    body:'Staring directly into instrument. Instrument staring back.' },
];

const COMMS = [
  ['GOLDSTONE', 'carrier lock acquired on ARGUS-7 · clean'],
  ['SVALBARD',  'it is snowing again'],
  ['CANBERRA',  'ack. jealous.'],
  ['MADRID',    'handshake at 8.4 GHz · nominal'],
  ['QUITO',     'equatorial advantage noted. again.'],
  ['SVALBARD',  'polar bear at perimeter · badge not visible'],
  ['GOLDSTONE', 'telemetry nominal · burrito acquired'],
  ['CANBERRA',  'downlink 2.1 Gbps · mostly penguin photos'],
  ['MADRID',    'siesta window opens in 12 min · queue accordingly'],
  ['QUITO',     'clear skies · the volcano is being photogenic'],
  ['GOLDSTONE', 'dish 3 pointing at nothing in particular · vibes good'],
  ['SVALBARD',  'sun scheduled to return in several months · noted'],
  ['CANBERRA',  'kangaroo cleared from apron · resume ops'],
  ['MADRID',    'received 1.2M readings · all of them fine'],
  ['SVALBARD',  'aurora overhead · work briefly impossible'],
  ['QUITO',     'gravity slightly lower up here · morale slightly higher'],
];

const COMMS_TYPED = [
  'confirm planet still rotating…',
  'requesting vibe check, all stations…',
  'logging sunset quality report…',
  'uploading 40TB of cloud photos…',
  'recalibrating the concept of "normal"…',
  'asking the ocean how it feels…',
];

const STATION_COLORS = {
  GOLDSTONE:'#ffb454', SVALBARD:'#8fce7a', CANBERRA:'#ffd18f',
  MADRID:'#c8e6a0', QUITO:'#ffc98a',
};

/* ═══════════════ BOOT SEQUENCE ═══════════════ */

const BOOT_LINES = [
  'ARGUS OS v5.0.1 — PANOPTIC ORBITAL SYSTEMS',
  'COLD START… PHOSPHOR WARM.',
  'MOUNTING /dev/everything ………………… OK',
  'CALIBRATING 100 EYES ………………………… 100/100',
  'ACQUIRING PLANET …………………………………… FOUND (1)',
  'SUBSCRIBING TO ALL EVENTS ……………… DONE',
  'IMPORTANCE FILTER ………………………………… DISABLED (MONITOR EVERYTHING)',
  'UNDERSTANDING MODULE ………………………… NOT FOUND (SKIPPING)',
  '',
  '> ALL SYSTEMS NOMINAL. BEGIN OVERSIGHT.',
];

function runBoot(done) {
  const el = $('#bootText');
  const full = BOOT_LINES.join('\n') + '\n';
  const CPS = 300; // chars per second — wall-clock based, immune to timer throttling
  const t0 = performance.now();
  let finished = false;
  (function tick() {
    const n = Math.floor((performance.now() - t0) / 1000 * CPS);
    if (n >= full.length) {
      if (finished) return;
      finished = true;
      el.textContent = full;
      setTimeout(() => { $('#boot').classList.add('off'); document.body.classList.add('booted'); done(); }, 420);
      return;
    }
    el.textContent = full.slice(0, n) + '█';
    setTimeout(tick, 24);
  })();
}

/* ═══════════════ CLOCK / MET / PASS ═══════════════ */

function startClock() {
  const utcEl = $('#utcClock'), metEl = $('#met'), passEl = $('#pass');
  setInterval(() => {
    const now = new Date();
    utcEl.textContent = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
    const ms = now.getTime() - MISSION_EPOCH;
    const d = Math.floor(ms / 864e5);
    const h = Math.floor(ms / 36e5) % 24;
    const m = Math.floor(ms / 6e4) % 60;
    metEl.textContent = `${d}d ${pad(h)}:${pad(m)}`;
    passEl.textContent = Math.floor(ms / 6e4 / ORBIT_MINUTES).toLocaleString('en-US');
  }, 1000);
}

/* ═══════════════ MOD 01 · VITALS ═══════════════ */

const VITALS = [
  { name:'PLANETARY MOOD INDEX', unit:'/100', v:71, min:55, max:92, step:2.5, dec:0 },
  { name:'GLOBAL ATTENTION SPAN', unit:'sec', v:7.4, min:4.9, max:8.3, step:0.22, dec:1, bias:-0.015 },
  { name:'COLLECTIVE DREAM SYNC', unit:'%', v:34, min:12, max:71, step:4, dec:0 },
  { name:'MAGNETOSPHERE INTEGRITY', unit:'%', v:99.97, min:99.9, max:99.99, step:0.02, dec:2 },
  { name:'SCHUMANN RESONANCE', unit:'Hz', v:7.83, min:7.71, max:7.96, step:0.03, dec:2 },
  { name:'OCEAN TEMPERAMENT', enum:['CALM','BROODING','THEATRICAL','REFLECTIVE','CHOPPY-CHIC','SMUG'], ei:0 },
  { name:'BIRDS CURRENTLY AIRBORNE', unit:'', v:1284502, min:900000, max:1600000, step:24000, dec:0, big:true },
];

const CONTINENTS = [
  ['N. AMERICA', 62], ['S. AMERICA', 71], ['EUROPE', 58],
  ['AFRICA', 77], ['ASIA', 84], ['OCEANIA', 49],
];

function initVitals() {
  const wrap = $('#vitals');
  VITALS.forEach((vt, i) => {
    const row = document.createElement('div');
    row.className = 'vital';
    if (vt.enum) {
      row.innerHTML = `<div class="vl"><div class="vname">${vt.name}</div>
        <div class="vval enum" id="vv${i}">${vt.enum[0]}</div></div>
        <span class="vtrend" id="vtr${i}">·</span>`;
    } else {
      row.innerHTML = `<div class="vl"><div class="vname">${vt.name}</div>
        <div class="vval" id="vv${i}">—<small>${vt.unit}</small></div></div>
        <span class="vtrend" id="vtr${i}">·</span><canvas id="vc${i}"></canvas>`;
      vt.hist = Array.from({ length: 34 }, () => vt.v + rand(-vt.step, vt.step));
    }
    wrap.appendChild(row);
  });

  const bars = $('#continentBars');
  CONTINENTS.forEach(([n], i) => {
    const r = document.createElement('div');
    r.className = 'cbar';
    r.innerHTML = `<span class="cn">${n}</span>
      <div class="ctrack"><div class="cfill" id="cf${i}" style="width:0%"></div></div>
      <span class="cv" id="cv${i}">—</span>`;
    bars.appendChild(r);
  });

  updateVitals();
  setInterval(updateVitals, 2400);
  setInterval(updateContinents, 3600);
  updateContinents();
}

function fmtVital(vt) {
  if (vt.big) return Math.round(vt.v).toLocaleString('en-US');
  return vt.v.toFixed(vt.dec);
}

function updateVitals() {
  VITALS.forEach((vt, i) => {
    const el = $(`#vv${i}`), tr = $(`#vtr${i}`);
    if (vt.enum) {
      if (Math.random() < 0.22) {
        vt.ei = (vt.ei + randi(1, vt.enum.length - 1)) % vt.enum.length;
        el.textContent = vt.enum[vt.ei];
        tr.textContent = '~'; tr.className = 'vtrend';
      }
      return;
    }
    const prev = vt.v;
    const surge = ALARM ? 3 : 1;
    vt.v = clamp(vt.v + rand(-vt.step, vt.step) * surge + (vt.bias || 0), vt.min, vt.max);
    vt.hist.push(vt.v); vt.hist.shift();
    el.innerHTML = `${fmtVital(vt)}<small>${vt.unit}</small>`;
    const d = vt.v - prev;
    tr.textContent = Math.abs(d) < vt.step * 0.15 ? '·' : d > 0 ? '▲' : '▼';
    tr.className = 'vtrend ' + (Math.abs(d) < vt.step * 0.15 ? '' : d > 0 ? 'up' : 'dn');
    drawSpark(i, vt);
  });
}

function drawSpark(i, vt) {
  const c = $(`#vc${i}`);
  if (!c) return;
  const dpr = Math.min(devicePixelRatio, 2);
  const w = c.clientWidth || 74, h = c.clientHeight || 24;
  c.width = w * dpr; c.height = h * dpr;
  const x = c.getContext('2d');
  x.scale(dpr, dpr);
  const lo = Math.min(...vt.hist), hi = Math.max(...vt.hist), span = hi - lo || 1;
  x.strokeStyle = 'rgba(255,180,84,.75)';
  x.shadowColor = 'rgba(255,180,84,.6)'; x.shadowBlur = 3;
  x.lineWidth = 1;
  x.beginPath();
  vt.hist.forEach((v, j) => {
    const px = (j / (vt.hist.length - 1)) * w;
    const py = h - 3 - ((v - lo) / span) * (h - 7);
    j ? x.lineTo(px, py) : x.moveTo(px, py);
  });
  x.stroke();
}

function updateContinents() {
  CONTINENTS.forEach((c, i) => {
    c[1] = clamp(c[1] + rand(-7, 7), 22, 97);
    $(`#cf${i}`).style.width = c[1] + '%';
    $(`#cv${i}`).textContent = Math.round(c[1]);
  });
}

/* ═══════════════ MOD 02 · GLOBE (Three.js) ═══════════════ */

const globe = { events: [], sats: [], arcs: [], yaw: 0, pitch: 0.42, targetYaw: null, dragging: false, shake: 0 };

function latLonToVec3(lat, lon, r) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  );
}

function glowTexture(color) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(32, 32, 2, 32, 32, 30);
  g.addColorStop(0, color);
  g.addColorStop(0.35, color + 'aa');
  g.addColorStop(1, 'transparent');
  x.fillStyle = g;
  x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function initGlobe() {
  const wrap = $('.globe-wrap'), canvas = $('#globeCanvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
  const R = 1;

  /* Fibonacci dot lattice */
  const N = 1100, pos = new Float32Array(N * 3);
  const GA = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = GA * i;
    pos[i * 3] = Math.cos(th) * rad * R;
    pos[i * 3 + 1] = y * R;
    pos[i * 3 + 2] = Math.sin(th) * rad * R;
  }
  const dotsGeo = new THREE.BufferGeometry();
  dotsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(dotsGeo, new THREE.PointsMaterial({
    color: 0x8a6a3a, size: 0.011, transparent: true, opacity: 0.85,
  })));

  /* Graticule */
  const gratMat = new THREE.LineBasicMaterial({ color: 0x4c6b42, transparent: true, opacity: 0.22 });
  const circle = (fn) => {
    const pts = [];
    for (let a = 0; a <= 360; a += 4) pts.push(fn(a * Math.PI / 180));
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    scene.add(new THREE.Line(g, gratMat));
  };
  for (let lat = -60; lat <= 60; lat += 30) {
    const r = Math.cos(lat * Math.PI / 180) * R, y = Math.sin(lat * Math.PI / 180) * R;
    circle((a) => new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
  }
  for (let lon = 0; lon < 180; lon += 30) {
    const q = lon * Math.PI / 180;
    circle((a) => new THREE.Vector3(
      Math.cos(a) * Math.cos(q) * R, Math.sin(a) * R, Math.cos(a) * Math.sin(q) * R));
  }

  /* Ground stations */
  const stTex = glowTexture('#ffb454');
  STATIONS.forEach((st) => {
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({
      map: stTex, transparent: true, opacity: 0.95, depthWrite: false,
    }));
    st.vec = latLonToVec3(st.lat, st.lon, R * 1.005);
    spr.position.copy(st.vec);
    spr.scale.setScalar(0.055);
    st.sprite = spr;
    scene.add(spr);
  });

  /* Satellites */
  const satTex = glowTexture('#8fce7a');
  for (let i = 0; i < 3; i++) {
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: satTex, transparent: true, depthWrite: false }));
    spr.scale.setScalar(0.05);
    scene.add(spr);
    const trailGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const trail = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({
      color: 0x8fce7a, transparent: true, opacity: 0.35,
    }));
    scene.add(trail);
    globe.sats.push({
      spr, trail, pts: [],
      r: rand(1.28, 1.5), speed: rand(0.25, 0.45) * (i % 2 ? -1 : 1),
      inc: rand(0.3, 1.2), phase: rand(0, 6.28), t: 0,
    });
  }

  /* Event ping rings */
  globe.spawnPing = (st) => {
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(0.028, 0.036, 40),
      new THREE.MeshBasicMaterial({ color: 0xffb454, transparent: true, opacity: 0.9, side: THREE.DoubleSide })
    );
    mesh.position.copy(st.vec);
    mesh.lookAt(st.vec.clone().multiplyScalar(2));
    scene.add(mesh);
    globe.events.push({ mesh, t: 0 });
    st.sprite.scale.setScalar(0.1);
  };

  /* Great-circle-ish data arcs */
  globe.spawnArc = (a, b) => {
    const pts = [];
    const va = a.vec.clone().normalize(), vb = b.vec.clone().normalize();
    for (let i = 0; i <= 42; i++) {
      const t = i / 42;
      const v = va.clone().lerp(vb, t).normalize().multiplyScalar(R * (1 + 0.3 * Math.sin(t * Math.PI)));
      pts.push(v);
    }
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: 0xffd18f, transparent: true, opacity: 0.65 })
    );
    scene.add(line);
    const packet = new THREE.Sprite(new THREE.SpriteMaterial({ map: stTex, transparent: true, depthWrite: false }));
    packet.scale.setScalar(0.04);
    scene.add(packet);
    globe.arcs.push({ line, packet, pts, t: 0 });
  };

  /* Camera control */
  const applyCamera = () => {
    const d = 2.75;
    const sx = globe.shake > 0 ? rand(-globe.shake, globe.shake) : 0;
    const sy = globe.shake > 0 ? rand(-globe.shake, globe.shake) : 0;
    camera.position.set(
      d * Math.cos(globe.pitch) * Math.sin(globe.yaw) + sx,
      d * Math.sin(globe.pitch) + sy,
      d * Math.cos(globe.pitch) * Math.cos(globe.yaw)
    );
    camera.lookAt(0, 0, 0);
  };

  let lastPointer = null, manualUntil = 0;
  wrap.addEventListener('pointerdown', (e) => { lastPointer = [e.clientX, e.clientY]; globe.dragging = true; });
  addEventListener('pointermove', (e) => {
    if (!globe.dragging) return;
    globe.yaw   += (e.clientX - lastPointer[0]) * 0.005;
    globe.pitch  = clamp(globe.pitch + (e.clientY - lastPointer[1]) * 0.004, -1.2, 1.2);
    lastPointer = [e.clientX, e.clientY];
    manualUntil = performance.now() + 5000;
    globe.targetYaw = null;
  });
  addEventListener('pointerup', () => { globe.dragging = false; });

  const resize = () => {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(wrap);
  resize();

  globe.focusOn = (st) => {
    // Aim camera yaw at the station's longitude-ish angle
    globe.targetYaw = Math.atan2(st.vec.x, st.vec.z);
  };

  let prev = performance.now();
  (function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min((now - prev) / 1000, 0.1);
    prev = now;

    if (!globe.dragging && now > manualUntil) {
      if (globe.targetYaw !== null) {
        let d = globe.targetYaw - globe.yaw;
        d = Math.atan2(Math.sin(d), Math.cos(d));
        globe.yaw += d * dt * 2.2;
        if (Math.abs(d) < 0.02) globe.targetYaw = null;
      } else {
        globe.yaw += dt * 0.09;
      }
    }
    globe.shake = Math.max(0, globe.shake - dt * 0.12);

    globe.sats.forEach((s) => {
      s.t += dt * s.speed;
      const p = new THREE.Vector3(
        Math.cos(s.t + s.phase) * s.r,
        Math.sin(s.t + s.phase) * Math.sin(s.inc) * s.r,
        Math.sin(s.t + s.phase) * Math.cos(s.inc) * s.r
      );
      s.spr.position.copy(p);
      s.pts.push(p.clone());
      if (s.pts.length > 46) s.pts.shift();
      s.trail.geometry.setFromPoints(s.pts);
    });

    for (let i = globe.events.length - 1; i >= 0; i--) {
      const ev = globe.events[i];
      ev.t += dt;
      const k = ev.t / 1.7;
      ev.mesh.scale.setScalar(1 + k * 6);
      ev.mesh.material.opacity = 0.9 * (1 - k);
      if (k >= 1) { scene.remove(ev.mesh); globe.events.splice(i, 1); }
    }

    STATIONS.forEach((st) => {
      const cur = st.sprite.scale.x;
      if (cur > 0.055) st.sprite.scale.setScalar(Math.max(0.055, cur - dt * 0.06));
    });

    for (let i = globe.arcs.length - 1; i >= 0; i--) {
      const a = globe.arcs[i];
      a.t += dt / 2.6;
      const idx = Math.min(a.pts.length - 1, Math.floor(a.t * a.pts.length));
      a.packet.position.copy(a.pts[idx]);
      a.line.material.opacity = 0.65 * (1 - a.t);
      if (a.t >= 1) { scene.remove(a.line); scene.remove(a.packet); globe.arcs.splice(i, 1); }
    }

    applyCamera();
    renderer.render(scene, camera);
  })(prev);

  $('#hudSats').textContent = 'SATS 8,142';
}

/* Fire a globe event: ping + caption + camera + log, sometimes an arc */
function triggerGlobeEvent() {
  const st = pick(STATIONS);
  const desc = pick(GLOBE_EVENTS);
  globe.spawnPing(st);
  globe.focusOn(st);
  if (Math.random() < 0.55) {
    let other = pick(STATIONS);
    while (other === st) other = pick(STATIONS);
    globe.spawnArc(st, other);
  }
  const now = new Date();
  $('.gc-time').textContent = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())} UTC`;
  $('.gc-loc').textContent = st.name;
  $('.gc-desc').textContent = desc;
  logLine('evt', `${st.name} · ${desc}`);
  scopeSpike(randi(0, 2), rand(0.5, 1));
}

/* ═══════════════ MOD 03 · SCOPES ═══════════════ */

const scopes = [];

function initScopes() {
  $$('.scope canvas').forEach((c, i) => {
    scopes.push({
      c, x: null, t: rand(0, 100),
      f1: rand(0.9, 1.7), f2: rand(2.4, 4.2), f3: rand(6, 11),
      amp: rand(0.5, 0.8), spike: 0,
      valEl: $(`#scv${i}`),
      unit: ['µRichter', 'dBµV', 'worry/m²'][i],
    });
  });

  const resize = () => scopes.forEach((s) => {
    const dpr = Math.min(devicePixelRatio, 2);
    s.w = s.c.clientWidth; s.h = s.c.clientHeight;
    s.c.width = s.w * dpr; s.c.height = s.h * dpr;
    s.x = s.c.getContext('2d');
    s.x.setTransform(dpr, 0, 0, dpr, 0, 0);
    s.x.fillStyle = '#0b0d09';
    s.x.fillRect(0, 0, s.w, s.h);
  });
  addEventListener('resize', resize);
  setTimeout(resize, 50);

  let prev = performance.now();
  (function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min((now - prev) / 1000, 0.1);
    prev = now;
    scopes.forEach((s) => {
      if (!s.x || !s.w) return;
      s.t += dt * (ALARM ? 4 : 1.6);
      s.spike = Math.max(0, s.spike - dt * 0.5);

      /* phosphor persistence */
      s.x.fillStyle = 'rgba(11,13,9,.16)';
      s.x.fillRect(0, 0, s.w, s.h);

      /* grid */
      s.x.strokeStyle = 'rgba(35,40,25,.5)';
      s.x.lineWidth = 1;
      s.x.beginPath();
      for (let gx = 0; gx < s.w; gx += 26) { s.x.moveTo(gx, 0); s.x.lineTo(gx, s.h); }
      for (let gy = 0; gy < s.h; gy += 26) { s.x.moveTo(0, gy); s.x.lineTo(s.w, gy); }
      s.x.stroke();

      /* waveform */
      const mid = s.h * 0.58, A = (s.h * 0.24) * (s.amp + s.spike * 1.6 + (ALARM ? 0.7 : 0));
      s.x.strokeStyle = '#8fce7a';
      s.x.shadowColor = 'rgba(143,206,122,.8)';
      s.x.shadowBlur = 6;
      s.x.lineWidth = 1.4;
      s.x.beginPath();
      for (let px = 0; px <= s.w; px += 2) {
        const u = px / s.w * Math.PI * 2;
        const v = Math.sin(u * s.f1 + s.t) * 0.55
                + Math.sin(u * s.f2 + s.t * 1.7) * 0.3
                + Math.sin(u * s.f3 + s.t * 2.3) * 0.15
                + rand(-0.05, 0.05);
        const py = mid + v * A;
        px ? s.x.lineTo(px, py) : s.x.moveTo(px, py);
      }
      s.x.stroke();
      s.x.shadowBlur = 0;
    });
  })(prev);

  setInterval(() => scopes.forEach((s) => {
    s.valEl.textContent = `${(s.amp * 40 + s.spike * 60 + rand(-2, 2) + (ALARM ? 55 : 0)).toFixed(1)} ${s.unit}`;
  }), 900);
}

function scopeSpike(i, amt) { if (scopes[i]) scopes[i].spike = Math.min(1.4, scopes[i].spike + amt); }

/* ═══════════════ MOD 04 · ANOMALIES ═══════════════ */

let anomSeq = 0;

function spawnAnomaly(force) {
  const list = $('#anomalies');
  if (!force && list.querySelectorAll('.anom').length >= 4) return;
  $('.anom-empty')?.remove();

  const a = pick(ANOMALIES);
  const id = ++anomSeq;
  const el = document.createElement('div');
  el.className = 'anom';
  el.innerHTML = `
    <div class="anom-top">
      <span class="anom-sev ${a.sev}">${a.sev === 'red' ? 'PRIORITY' : a.sev === 'amber' ? 'WATCH' : 'FYI'}</span>
      <span class="anom-title">${a.title}</span>
    </div>
    <div class="anom-loc">${a.loc} · REF #AN-${String(4000 + id)}</div>
    <div class="anom-body">${a.body}</div>
    <div class="anom-actions">
      <button class="ack">ACKNOWLEDGE</button>
      <button class="defer">DEFER</button>
    </div>
    <div class="anom-count" style="width:100%"></div>`;
  list.prepend(el);
  logLine('anm', `${a.title} · ${a.loc}`);

  /* countdown */
  let life = randi(24, 40);
  const bar = el.querySelector('.anom-count');
  const iv = setInterval(() => {
    life--;
    bar.style.width = clamp(life / 40 * 100, 0, 100) + '%';
    if (life <= 0) { clearInterval(iv); settle('AUTO-RESOLVED (IT STOPPED)'); }
  }, 1000);

  function settle(stamp) {
    clearInterval(iv);
    el.querySelector('.anom-actions').outerHTML = `<div class="anom-stamp">✓ ${stamp}</div>`;
    bar.remove();
    setTimeout(() => {
      el.classList.add('gone');
      setTimeout(() => { el.remove(); ensureAnomEmpty(); }, 500);
    }, 2600);
  }

  el.querySelector('.ack').onclick = () => { settle('ACKNOWLEDGED · NO ACTION TAKEN'); logLine('sys', `AN-${4000 + id} acknowledged · filed under "noted"`); };
  el.querySelector('.defer').onclick = () => { settle('DEFERRED (INDEFINITELY)'); logLine('sys', `AN-${4000 + id} deferred to a calmer era`); };
  el._settle = settle;
}

function ensureAnomEmpty() {
  const list = $('#anomalies');
  if (!list.querySelector('.anom')) {
    list.innerHTML = `<div class="anom-empty">NO ANOMALIES.<br>STATISTICALLY SUSPICIOUS.<br>MONITORING THE ABSENCE.</div>`;
  }
}

function initAnomalies() {
  ensureAnomEmpty();
  setTimeout(() => spawnAnomaly(), 3000);
  setInterval(() => { if (Math.random() < 0.75) spawnAnomaly(); }, 9000);
  $('#ackAll').onclick = () => {
    $$('#anomalies .anom').forEach((el) => el._settle && el._settle('BULK-ACKNOWLEDGED · EFFICIENCY ACHIEVED'));
    logLine('sys', 'all anomalies acknowledged at once · inbox zero (planetary)');
  };
}

/* ═══════════════ MOD 05 · RADAR ═══════════════ */

function initRadar() {
  const c = $('#radarCanvas');
  const wrap = $('.radar-wrap');
  let w, h, x, cx, cy, R2;
  const dpr = Math.min(devicePixelRatio, 2);

  const BLIP_TYPES = [
    'WX BALLOON', 'GOOSE V-FORMATION', 'SLOW BLIMP', 'DELIVERY DRONE ×142',
    'SEAGULL (LARGE)', 'LOST KITE', 'CUMULUS (SUSPICIOUS)', 'MIGRATING DATA',
  ];
  const blips = Array.from({ length: 5 }, () => ({
    a: rand(0, 6.28), r: rand(0.25, 0.92), alpha: 0,
    type: pick(BLIP_TYPES), drift: rand(-0.02, 0.02),
  }));

  const resize = () => {
    w = wrap.clientWidth; h = wrap.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    x = c.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = w / 2; cy = h / 2 + 4; R2 = Math.min(w, h) / 2 - 14;
  };
  new ResizeObserver(resize).observe(wrap);
  resize();

  let sweep = 0, prev = performance.now();
  setInterval(() => {
    /* occasionally swap a blip */
    const b = pick(blips);
    b.a = rand(0, 6.28); b.r = rand(0.25, 0.92); b.type = pick(BLIP_TYPES); b.alpha = 0;
  }, 14000);

  (function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min((now - prev) / 1000, 0.1);
    prev = now;
    if (!x || !w) return;
    sweep = (sweep + dt * (ALARM ? 3.4 : 1.1)) % (Math.PI * 2);

    x.fillStyle = 'rgba(11,13,9,.28)';
    x.fillRect(0, 0, w, h);

    /* rings + cross */
    x.strokeStyle = 'rgba(76,107,66,.4)';
    x.lineWidth = 1;
    [0.33, 0.66, 1].forEach((k) => {
      x.beginPath(); x.arc(cx, cy, R2 * k, 0, 6.284); x.stroke();
    });
    x.beginPath();
    x.moveTo(cx - R2, cy); x.lineTo(cx + R2, cy);
    x.moveTo(cx, cy - R2); x.lineTo(cx, cy + R2);
    x.stroke();

    /* sweep wedge */
    const grad = x.createConicGradient
      ? (() => { const g = x.createConicGradient(sweep, cx, cy); g.addColorStop(0, 'rgba(143,206,122,.5)'); g.addColorStop(0.09, 'rgba(143,206,122,.06)'); g.addColorStop(0.13, 'transparent'); g.addColorStop(1, 'transparent'); return g; })()
      : 'rgba(143,206,122,.15)';
    x.fillStyle = grad;
    x.beginPath();
    x.moveTo(cx, cy);
    x.arc(cx, cy, R2, sweep, sweep + 0.9);
    x.closePath();
    x.fill();

    /* sweep leading edge */
    x.strokeStyle = 'rgba(143,206,122,.9)';
    x.shadowColor = 'rgba(143,206,122,.8)'; x.shadowBlur = 6;
    x.beginPath();
    x.moveTo(cx, cy);
    x.lineTo(cx + Math.cos(sweep) * R2, cy + Math.sin(sweep) * R2);
    x.stroke();
    x.shadowBlur = 0;

    /* blips */
    blips.forEach((b) => {
      b.a += b.drift * dt;
      let diff = Math.abs(((sweep - b.a) % 6.283 + 6.283) % 6.283);
      if (diff < 0.06) b.alpha = 1;
      b.alpha = Math.max(0, b.alpha - dt * 0.18);
      if (b.alpha <= 0.01) return;
      const bx = cx + Math.cos(b.a) * R2 * b.r;
      const by = cy + Math.sin(b.a) * R2 * b.r;
      x.fillStyle = `rgba(255,180,84,${b.alpha})`;
      x.shadowColor = 'rgba(255,180,84,.9)'; x.shadowBlur = 7;
      x.fillRect(bx - 2, by - 2, 4, 4);
      x.shadowBlur = 0;
      if (b.alpha > 0.45) {
        x.fillStyle = `rgba(255,209,143,${b.alpha * 0.9})`;
        x.font = '8px "IBM Plex Mono"';
        x.textAlign = bx > cx ? 'right' : 'left';
        x.fillText(b.type, bx + (bx > cx ? -6 : 6), by - 5);
      }
    });
  })(prev);
}

/* ═══════════════ MOD 06 · LOG ═══════════════ */

function logLine(tag, msg) {
  const log = $('#log');
  if (!log) return;
  const now = new Date();
  const t = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
  const el = document.createElement('div');
  el.className = 'log-line' + (tag === 'chk' ? ' dim' : '');
  const label = { chk: 'CHK', evt: 'EVT', anm: 'ANM', sys: 'SYS' }[tag];
  el.innerHTML = `<span class="lt">${t}</span><span class="tag ${tag}">${label}</span><span class="msg">${msg}</span>`;
  log.appendChild(el);
  while (log.children.length > 80) log.firstChild.remove();
  log.scrollTop = log.scrollHeight;
}

function initLog() {
  logLine('sys', 'ARGUS oversight loop engaged · scope: everything');
  (function loop() {
    const r = Math.random();
    if (r < 0.55) logLine('chk', pick(LOG_CHK));
    else logLine('evt', pick(LOG_EVT));
    setTimeout(loop, ALARM ? rand(120, 300) : rand(900, 2300));
  })();
}

/* ═══════════════ MOD 07 · COMMS ═══════════════ */

function initComms() {
  const box = $('#comms');
  const typed = $('#commsTyped');
  let lastIdx = -1;

  function addComm() {
    let i = randi(0, COMMS.length - 1);
    if (i === lastIdx) i = (i + 1) % COMMS.length;
    lastIdx = i;
    const [st, msg] = COMMS[i];
    const el = document.createElement('div');
    el.className = 'comm';
    el.innerHTML = `<span class="cs" style="color:${STATION_COLORS[st] || '#8fce7a'}">${st}</span><span class="cm">${msg}</span>`;
    box.appendChild(el);
    while (box.children.length > 30) box.firstChild.remove();
    box.scrollTop = box.scrollHeight;
    setTimeout(addComm, rand(3800, 8500));
  }
  setTimeout(addComm, 1500);

  /* Fake operator typing loop */
  (function typeLoop() {
    const line = pick(COMMS_TYPED);
    let i = 0;
    (function typeChar() {
      typed.textContent = line.slice(0, i);
      if (i++ <= line.length) { setTimeout(typeChar, rand(35, 90)); return; }
      setTimeout(() => {
        typed.textContent = '';
        setTimeout(typeLoop, rand(3000, 7000));
      }, 2200);
    })();
  })();
}

/* ═══════════════ PANIC ═══════════════ */

function initPanic() {
  const btn = $('#panicBtn');
  let cooling = false;
  btn.onclick = () => {
    if (cooling) return;
    cooling = true;
    ALARM = true;
    btn.classList.add('armed');
    document.body.classList.add('alarm');
    $('#lampVibes').className = 'lamp err';
    globe.shake = 0.06;
    logLine('anm', 'PANIC INITIATED · everything briefly matters more');
    scopeSpike(0, 1.4); scopeSpike(1, 1.4); scopeSpike(2, 1.4);
    triggerGlobeEvent();
    spawnAnomaly(true);
    setTimeout(() => logLine('anm', 'dramatics at 340% of baseline · impressive'), 1200);
    setTimeout(() => logLine('sys', 'reviewing situation … situation is the same'), 2600);
    setTimeout(() => {
      ALARM = false;
      document.body.classList.remove('alarm');
      btn.classList.remove('armed');
      $('#lampVibes').className = 'lamp warn';
      logLine('sys', 'FALSE ALARM · nominal restored · thank you for testing');
    }, 4200);
    setTimeout(() => { cooling = false; }, 6000);
  };
}

/* ═══════════════ IGNITION ═══════════════ */

runBoot(() => {
  startClock();
  initVitals();
  initGlobe();
  initScopes();
  initAnomalies();
  initRadar();
  initLog();
  initComms();
  initPanic();
  setTimeout(triggerGlobeEvent, 2000);
  setInterval(() => { if (Math.random() < 0.8) triggerGlobeEvent(); }, 7500);
});
