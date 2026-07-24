/****************************************************
 * PULSE Operations Center
 * Interactive Globe + Task Monitor
 ****************************************************/

const CONFIG = {
  kanbanMoveInterval: 5000,
  activityInterval: 4000,
  alertInterval: 7000,
  chatInterval: 5000,
  kpiUpdateInterval: 3000,
  chartUpdateInterval: 500,
  notificationInterval: 5500,
  autoResolveAlertTime: 15000,
  maxActivityItems: 18,
  maxAlerts: 5,
  maxChatMessages: 20,
  maxNotifications: 12,
};

const USERS = [
  { name: 'Alex P.', seed: 'Alex' },
  { name: 'Sam Q.', seed: 'Sam' },
  { name: 'Jordan L.', seed: 'Jordan' },
  { name: 'Taylor X.', seed: 'Taylor' },
  { name: 'Morgan Z.', seed: 'Morgan' },
  { name: 'Riley V.', seed: 'Riley' },
];

const KANBAN_TITLES = [
  // Infra realista
  'Investigate memory leak in auth-service',
  'Update SSL certificates for api-gateway',
  'Refactor database connection pool logic',
  'Deploy hotfix to production us-east-1',
  'Add Redis caching layer to user sessions',
  'Monitor Kafka lag on consumer group B',
  'Rollback failed canary in eu-west-1',
  'Tune JVM heap size for billing-worker',
  'Set up new Grafana alerts for latency',
  'Validate backup restoration pipeline',
  'Review infrastructure cost report Q3',
  'Migrate legacy logs to S3 Glacier',
  'Patch CVE-2024-XXXX in nginx ingress',
  'Optimize Elasticsearch index mapping',
  'Implement circuit breaker for payments',
  // Absurdo / vigilancia corporativa
  'Recalibrate breakroom coffee weight sensors',
  'Audit ficus #12 leaf-drop rate anomaly',
  'Reduce open-office conversational decibel ceiling',
  'Wellness check on cars in lot C since Tuesday',
  'Deploy praise algorithm to plant #7',
  'Investigate keyboard acoustics in pod 4B',
  'Tune dopamine delivery pipeline for cat videos',
  'Rollback citizen mood classification to v2.1',
  'Update billboard smile-detection threshold',
  'Refactor umbrella-prediction model for District 7',
  'Patch printer grief protocol on HP-7F',
  'Monitor vending machine tuna sandwich returns',
  'Validate restroom visit productivity metric',
  'Implement ghost-ping auto-response handler',
  'Recalibrate eyeball dwell time on Ad-Board-7',
];

const KANBAN_TAGS = ['SRE', 'INFRA', 'SEC', 'DEV', 'OPS'];
const PRIORITIES = ['high', 'medium', 'low'];

const ACTIVITY_ACTIONS = [
  // Infra
  'resolved incident', 'deployed to production', 'reverted commit',
  'escalated ticket', 'closed alert', 'restarted service',
  'merged PR', 'approved deployment', 'generated report',
  'synchronized configuration',
  // Global monitoring
  'flagged currency volatility', 'logged demographic shift',
  'reported energy spike', 'noted commodity movement',
  'annotated rainfall data', 'cross-referenced transit load',
  // Absurdo / vigilancia corporativa
  'calibrated coffee stockpile sensors',
  'investigated ficus #12 morale index',
  'patched printer grief protocol',
  'updated billboard smile count',
  'approved restroom break efficiency',
  'recycled air intake quota met',
  'tuned predictive umbrella model',
  'logged ghost ping duration',
  'calibrated keyboard acoustics threshold',
  'reset dopamine delivery funnel',
];

const ACTIVITY_TARGETS = [
  // Infra
  '#INC-4421', '#DEP-8892', '#ALERT-3310', '#SVC-7721',
  '#TICKET-1102', '#NODE-9934', '#HOST-7', '#PIPE-X',
  '#CLUSTER-A', '#POOL-B',
  // Absurdo / vigilancia
  '#CAF-991', '#FIC-12', '#HP7F-JAM', '#ADM-7',
  '#DOP-231', '#UMB-D7', '#GHOST-47', '#ACOU-4B',
  '#REST-Q3', '#AIR-18K', '#BATH-08', '#SMILE-3',
];

const ALERT_TITLES = [
  // Infra realista
  'Critical latency spike on api-gateway',
  'High memory usage on worker nodes',
  'Database connection pool exhausted',
  'Cache miss rate above threshold',
  'Failed health checks on service mesh',
  'Disk usage > 85% on log aggregators',
  'Kafka consumer lag increasing',
  'SSL certificate expiring in 7 days',
  'Unusual CPU pattern detected',
  'Replication lag on primary DB',
  // Absurdo / vigilancia corporativa
  'Coffee stockpile below 18 cups equivalent',
  'Ficus #12 leaf-drop rate up 34%',
  'Keyboard acoustics flagged in pod 4B',
  'Yawning cascade detected in APAC',
  'Vending machine sentiment critical (Snack D-7)',
  'Office chair occupancy variance down 12%',
  'Ghost ping unresolved for 47 minutes',
  'Restroom visit variance exceeds Z-score -1.8',
  'Predictive umbrella model confidence below 85%',
  'Dopamine delivery pipeline stalled',
];

const ALERT_DESCS = [
  // Infra
  'P95 latency exceeded 1200ms for the last 3 minutes on api-gateway pods.',
  'Memory utilization on worker pool reached 92%. Consider scaling or restart.',
  'All connections in the pool are active. New requests are being queued.',
  'Redis cache miss rate is at 34%. Origin servers under increased load.',
  'Istio sidecar health checks failing intermittently on 3 pods.',
  'Log aggregator nodes approaching capacity. Rotation policy triggered.',
  'Consumer group B is falling behind by 45k messages.',
  'Certificate for api.domain.com expires in 7 days. Renewal required.',
  'Anomalous CPU usage pattern detected on node us-east-1c-07.',
  'Read replica is 8 seconds behind primary. Replication thread active.',
  // Absurdo
  'Breakroom reserves critical. Procurement ticket #CAF-991 auto-opened.',
  'Office ficus #12 showing stress signals. Praise algorithm recommended.',
  'Typing cadence in pod 4B indicates possible creative thought. Review scheduled.',
  'Consecutive yawns in APAC exceeded threshold (3 in 5 min). Injecting caffeine ads.',
  'Snack D-7 (tuna sandwich) returned to shelf 8 times today. Delisting imminent.',
  'Chair occupancy variance down 12% in sector C. Alert: workforce may be thinking.',
  'Message read without response for 47 min. Social credit adjustment pending.',
  'Sam almorzó a las 11:47. Z-score: -1.8. Outlier logged in wellness db.',
  'District 7 umbrella demand forecast confidence at 82%. Below SLA threshold.',
  'Cat video engagement funnel conversion stalled. Dopamine delivery queue backing up.',
];

const CHAT_MESSAGES = [
  // Infra
  'Anyone seeing elevated 500s?',
  'Auth service looks stable now',
  'Need another pair of eyes on the PR',
  'Redis cache seems flushed unexpectedly',
  'Gateway latency is spiking in us-west-2',
  'Deploying hotfix to prod in 5 min',
  'DB pool issue resolved after restart',
  'Who touched the nginx config?',
  'Throughput back to normal levels',
  'False alarm, it was a scheduled job',
  'Merging to main, all checks passed',
  'Nodes autoscaled to 24 instances',
  'Buffer cleared, ingestion resumed',
  'Latency normalized after rollback',
  // Global context
  'EUR/USD volatility is wild today',
  'Anyone monitoring the energy grid spikes?',
  'Demographic data anomaly in FR dataset',
  'Solar flare might affect our sat links',
  'Shipping delays could impact our CDN',
  'Commodity futures shifting, keep an eye',
  'Transit overload in BR region noted',
  'Rainfall sensors reporting deficits again',
  // Absurdo / vigilancia corporativa
  'Algorithm says my mood is "unprofitable" today',
  'Citizen score dropped because I skipped breakfast',
  'Dopamine metrics are down, someone post a cat video',
  'Predictive model says I need an umbrella in 3 hours',
  'My eyeball dwell time on ads is below OKR this week',
  'Productivity team wants fewer bathroom breaks',
  'Sentiment analysis says pineapple pizza is losing',
  'They logged 3 involuntary smiles at the billboard',
  'Ficus #12 needs water. Morgan, ticket is yours.',
  'HP-7F jammed again. Support counselor assigned.',
  'Taco truck at 400m. Predicted productivity dip incoming.',
  'Ghost ping detector went off. Social credit adjusted.',
  'Keyboard acoustics in 4B flagged. Creative thought suspected.',
  'Coffee reserves critical. Procurement #CAF-991 opened.',
  'My calendar has 4 focus blocks. HR says it is suspicious.',
];

const NOTIFICATIONS = [
  // Infra
  { title: 'Deployment completed', desc: 'Auth-service v2.4.1 deployed to production successfully.', type: 'info' },
  { title: 'Warning threshold', desc: 'Cache miss rate exceeded 30% in the last 5 minutes.', type: 'warn' },
  { title: 'Node failure', desc: 'Node us-east-1c-07 experienced a brief network partition.', type: 'error' },
  { title: 'Synchronization complete', desc: 'Configuration sync across all regions finished with 0 errors.', type: 'info' },
  { title: 'High memory alert', desc: 'RAM usage on billing-worker pool is at 91%.', type: 'warn' },
  { title: 'Incident closed', desc: 'Incident #DEP-8892 was marked as resolved.', type: 'info' },
  { title: 'New pull request', desc: 'Jordan L. opened a PR for refactoring connection pool logic.', type: 'info' },
  // Global / data
  { title: 'EUR/USD spread widened', desc: 'Currency pair volatility index increased 14% in the last hour.', type: 'warn' },
  { title: 'Tokyo market open', desc: 'Trading volume on N225 futures up 22% compared to yesterday.', type: 'info' },
  { title: 'Birth rate anomaly detected', desc: 'Demographic dataset FR-2024-Q3 shows -2.1% deviation from projection.', type: 'info' },
  { title: 'Energy demand spike', desc: 'Grid load in DE-CENTRAL region peaked at 94% capacity.', type: 'warn' },
  { title: 'Commodity index shifted', desc: 'Agricultural futures volume rose 18% across SE-ASIA exchanges.', type: 'info' },
  { title: 'Migration pattern update', desc: 'Population flow sensors NA-CENTRAL recorded unusual northbound density.', type: 'info' },
  { title: 'Shipping route disrupted', desc: 'Container traffic through SUEZ corridor down 31% this week.', type: 'warn' },
  { title: 'Solar flare detected', desc: 'Geomagnetic disturbance index Kp=6. Satellite comms monitoring active.', type: 'info' },
  { title: 'Arctic ice coverage', desc: 'Remote sensing data shows -4.3% surface deviation vs seasonal mean.', type: 'info' },
  { title: 'Public transit load', desc: 'Metro ridership BR-SAO peaked at 127% nominal capacity.', type: 'warn' },
  { title: 'Rainfall deficit alert', desc: 'Precipitation sensors SA-EAST report -38% vs 30-year average.', type: 'warn' },
  { title: 'Unemployment data release', desc: 'Labor statistics UK-NORTH updated. Delta vs forecast: +0.4pp.', type: 'info' },
  // Absurdo / vigilancia corporativa
  { title: 'Sentiment shift detected', desc: 'Pineapple pizza sentiment dropped 18 points in social feeds. Escalating.', type: 'warn' },
  { title: 'Citizen score updated', desc: 'Region 12B average: +0.2 for on-time coffee consumption, -0.1 for jaywalking.', type: 'info' },
  { title: 'Dopamine delivery up', desc: 'Cat video engagement funnel converted 2.3% more users to 3-minute sessions.', type: 'info' },
  { title: 'Eyeball dwell time peak', desc: 'Average ad stare duration hit 340ms in NA-CENTRAL. Target: 350ms.', type: 'warn' },
  { title: 'Mood classification', desc: 'Algorithm detected your regional mood today is "unprofitable". Optimizing.', type: 'info' },
  { title: 'Bathroom break efficiency', desc: 'Productivity metric: restroom visits down 8% this quarter. Target met.', type: 'info' },
  { title: 'Attention span benchmark', desc: 'Median focus duration: 2.3 seconds. Below quarterly OKR of 2.5s.', type: 'warn' },
  { title: 'Predictive umbrella model', desc: 'AI forecasts 4 umbrellas needed in District 7 tomorrow with 92% confidence.', type: 'info' },
  { title: 'Billboard smile count', desc: 'Facial recognition logged 3 involuntary smiles at Ad-Board-7. Revenue +€0.04.', type: 'info' },
  { title: 'Algorithm recommends air', desc: 'Personalized nutrition update: recycled air intake increased to 18,000 L/day.', type: 'info' },
  { title: 'Coffee stockpile critical', desc: 'Breakroom reserves below 18 cups equivalent. Procurement ticket #CAF-991 opened.', type: 'warn' },
  { title: 'Seagull migration anomaly', desc: 'Coastal sensors detected 47% more seagulls near data center exhaust vents.', type: 'info' },
  { title: 'Keyboard acoustics flagged', desc: 'Typing cadence in pod 4B indicates possible creative thought. Review scheduled.', type: 'warn' },
  { title: 'Yawning cascade detected', desc: 'Consecutive yawns in APAC region exceeded threshold (3 in 5 min). Injecting caffeine ads.', type: 'warn' },
  { title: 'Plant morale low', desc: 'Office ficus #12 leaf-drop rate up 34%. Recommending praise algorithm.', type: 'info' },
  { title: 'Vending machine sentiment', desc: 'Snack D-7 (tuna sandwich) returned to shelf 8 times today. Delisting imminent.', type: 'warn' },
  { title: 'Parking lot occupancy', desc: 'Lot C has 3 cars that have not moved since Tuesday. Tagging for wellness check.', type: 'info' },
  { title: 'Printer grief', desc: 'HP-7F jammed for the 14th time. Assigning it a support counselor.', type: 'warn' },
  { title: 'Calendar density alert', desc: 'User has 4 consecutive focus time blocks. Treating as suspicious behavior.', type: 'warn' },
  { title: 'Slack emoji velocity', desc: 'Thumbs-up to message ratio fell below 0.3. Morale intervention triggered.', type: 'warn' },
];

let kanbanIdCounter = 1;
let alertIdCounter = 1;
let smoothieChart = null;
let chartSeries = {};
let kanbanCards = [];
let activeAlerts = [];
let notifications = [];
let currentTheme = 'light';
let globeMaterials = null;

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function formatTime(d) { return d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }); }

function buildSmoothieChart() {
  const canvas = document.getElementById('mainChart');
  if (!canvas) return null;
  const isDark = currentTheme === 'dark';
  const sc = new SmoothieChart({
    grid: {
      fillStyle: isDark ? '#1e1e1e' : '#faf9f7',
      strokeStyle: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(28,25,23,0.06)',
      lineWidth: 1,
      millisPerLine: 4000,
      verticalSections: 4,
      borderVisible: false,
    },
    labels: {
      fillStyle: isDark ? '#9a9590' : '#a09a92',
      fontSize: 10,
      fontFamily: "'Inter', sans-serif",
      precision: 0,
    },
    maxValue: 100,
    minValue: 0,
    millisPerPixel: 20,
  });
  sc.addTimeSeries(chartSeries.traffic, {
    strokeStyle: isDark ? '#60a5fa' : '#1e40af',
    fillStyle: isDark ? 'rgba(96,165,250,0.08)' : 'rgba(30,64,175,0.06)',
    lineWidth: 2,
  });
  sc.addTimeSeries(chartSeries.load, {
    strokeStyle: isDark ? '#f97316' : '#b45309',
    fillStyle: isDark ? 'rgba(249,115,22,0.06)' : 'rgba(180,83,9,0.04)',
    lineWidth: 2,
  });
  sc.streamTo(canvas, 0);
  return sc;
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('pulse-theme', theme);

  if (smoothieChart) {
    smoothieChart.stop();
    smoothieChart = buildSmoothieChart();
  }

  if (globeMaterials) {
    const dotCol = theme === 'dark' ? 0x555555 : 0x9a9590;
    const arcCol = 0x78716c;
    if (globeMaterials.dots) globeMaterials.dots.color.set(dotCol);
    if (globeMaterials.arc) globeMaterials.arc.color.set(arcCol);
    if (theme === 'dark') {
      globeMaterials.rings.forEach(m => m.color.set(0x666666));
    } else {
      globeMaterials.rings.forEach((m, i) => {
        const cols = [0xb45309, 0x1e40af, 0x166534];
        m.color.set(cols[i]);
      });
    }
    const canvas = document.getElementById('globeCanvas');
    if (canvas) {
      const renderer = canvas.__renderer;
      if (renderer) renderer.setClearColor(cssVarToHex('--globe-bg'), 1);
    }
  }

  const sparkColors = currentTheme === 'dark'
    ? { kpi1: '#60a5fa', kpi2: '#fbbf24', kpi3: '#4ade80', kpi4: '#f87171' }
    : { kpi1: '#1e40af', kpi2: '#b45309', kpi3: '#166534', kpi4: '#991b1b' };
  Object.keys(sparkHistory).forEach(k => drawSparkline('spark' + k.slice(-1), sparkColors[k]));
}

// ============================
// THREE.JS INTERACTIVE GLOBE
// ============================
function cssVarToHex(name) {
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!val) return 0x000000;
  if (val.startsWith('#')) return parseInt(val.slice(1), 16);
  const rgb = val.match(/\d+/g);
  if (rgb && rgb.length >= 3) return (parseInt(rgb[0]) << 16) | (parseInt(rgb[1]) << 8) | parseInt(rgb[2]);
  return 0x000000;
}

function getGlobeDotColor() {
  return currentTheme === 'dark' ? 0x555555 : 0x9a9590;
}

function initGlobe() {
  const canvas = document.getElementById('globeCanvas');
  if (!canvas) return;
  const container = canvas.parentElement;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
  canvas.__renderer = renderer;
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(cssVarToHex('--globe-bg'), 1);

  const world = new THREE.Group();
  scene.add(world);

  globeMaterials = { dots: null, rings: [], arc: null, bg: null };
  globeMaterials.bg = renderer.getClearColor(new THREE.Color());

  // Clean dot sphere — fewer, subtler
  const dotCount = 1200;
  const dotPositions = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < dotCount; i++) {
    const y = 1 - (i / (dotCount - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    dotPositions.push(Math.cos(theta) * radius, y, Math.sin(theta) * radius);
  }
  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
  globeMaterials.dots = new THREE.PointsMaterial({
    color: getGlobeDotColor(), size: 0.02, sizeAttenuation: true, transparent: true, opacity: 0.5,
  });
  world.add(new THREE.Points(dotGeo, globeMaterials.dots));

  // Regions
  const regions = [
    { id: 'us-east-1', lat: 40.7, lon: -74, status: 'ok' },
    { id: 'us-west-2', lat: 37.8, lon: -122, status: 'warn' },
    { id: 'eu-west-1', lat: 51.5, lon: -0.1, status: 'ok' },
    { id: 'ap-south-1', lat: 19.0, lon: 72.8, status: 'ok' },
    { id: 'sa-east-1', lat: -23.5, lon: -46.6, status: 'ok' },
    { id: 'ap-northeast-1', lat: 35.6, lon: 139.6, status: 'ok' },
    { id: 'ap-southeast-1', lat: 1.3, lon: 103.8, status: 'ok' },
    { id: 'ap-southeast-2', lat: -33.8, lon: 151.2, status: 'ok' },
  ];

  const statusColors = { ok: 0x166534, warn: 0xb45309, error: 0x991b1b, info: 0x1e40af };

  function latLonToVec3(lat, lon, r) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }

  const regionMeshes = [];
  regions.forEach(r => {
    const pos = latLonToVec3(r.lat, r.lon, 1.02);
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.028, 12, 12),
      new THREE.MeshBasicMaterial({ color: statusColors[r.status], transparent: true, opacity: 0.9 })
    );
    core.position.copy(pos);
    world.add(core);

    // Single subtle ring
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.04, 0.05, 32),
      new THREE.MeshBasicMaterial({ color: statusColors[r.status], transparent: true, opacity: 0.25, side: THREE.DoubleSide })
    );
    ring.position.copy(pos).multiplyScalar(1.005);
    ring.lookAt(0, 0, 0);
    world.add(ring);

    regionMeshes.push({ core, ring, data: r, pos: pos.clone() });
  });

  // Fewer, cleaner arcs
  globeMaterials.arc = new THREE.LineBasicMaterial({ color: 0x78716c, transparent: true, opacity: 0.2 });
  const arcs = [];
  const packets = [];

  function createArc(fromReg, toReg) {
    const a = regions.find(r => r.id === fromReg);
    const b = regions.find(r => r.id === toReg);
    if (!a || !b) return;
    const ap = latLonToVec3(a.lat, a.lon, 1.02);
    const bp = latLonToVec3(b.lat, b.lon, 1.02);
    const mid = new THREE.Vector3().addVectors(ap, bp).multiplyScalar(0.5).normalize().multiplyScalar(1.3);
    const curve = new THREE.QuadraticBezierCurve3(ap, mid, bp);
    const points = curve.getPoints(60);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geo, globeMaterials.arc);
    world.add(line);
    arcs.push({ line, curve, points, from: fromReg, to: toReg });
    return arcs[arcs.length - 1];
  }

  createArc('us-east-1', 'eu-west-1');
  createArc('us-west-2', 'ap-northeast-1');
  createArc('ap-south-1', 'ap-southeast-1');
  createArc('sa-east-1', 'us-east-1');
  createArc('eu-west-1', 'ap-south-1');

  function spawnPacket(arcIdx, color) {
    const arc = arcs[arcIdx];
    if (!arc) return;
    const packet = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 8, 8),
      new THREE.MeshBasicMaterial({ color: color || 0x1e40af, transparent: true, opacity: 0.8 })
    );
    packet.position.copy(arc.points[0]);
    world.add(packet);
    packets.push({ mesh: packet, arc: arc, progress: 0, speed: 0.008 + Math.random() * 0.012 });
  }

  // Ping waves — single clean expanding ring
  const pingWaves = [];
  function spawnPingWave(regionId, color, intensity) {
    intensity = intensity || 1;
    const reg = regions.find(r => r.id === regionId);
    if (!reg) return;
    const pos = latLonToVec3(reg.lat, reg.lon, 1.02);
    const ringGeo = new THREE.RingGeometry(0.04, 0.045, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: color || statusColors.error,
      transparent: true,
      opacity: 0.7 * intensity,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(ringGeo, ringMat);
    mesh.position.copy(pos).multiplyScalar(1.02);
    mesh.lookAt(0, 0, 0);
    world.add(mesh);
    pingWaves.push({ mesh, mat: ringMat, scale: 1, opacity: 0.7 * intensity, speed: 0.025 + Math.random() * 0.015 });
  }

  // One thin orbital ring only
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x78716c, transparent: true, opacity: 0.15 });
  globeMaterials.rings.push(ringMat);
  const torus = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.004, 8, 120), ringMat);
  torus.rotation.x = Math.PI / 2 + 0.3;
  torus.rotation.y = 0.4;
  world.add(torus);
  torus.userData = { speed: 0.001 };

  // Camera & interaction
  let camRadius = 2.6;
  let camTheta = 0.3;
  let camPhi = 0.25;
  let targetTheta = 0.3;
  let targetPhi = 0.25;
  let targetRadius = 2.6;
  let isDragging = false;
  let lastMouseX = 0, lastMouseY = 0;
  let autoRotateSpeed = 0.001;
  let idleTime = 0;

  canvas.addEventListener('mousedown', e => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    idleTime = 0;
    autoRotateSpeed = 0;
  });
  window.addEventListener('mouseup', () => { isDragging = false; autoRotateSpeed = 0.001; });
  canvas.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    targetTheta -= dx * 0.005;
    targetPhi = Math.max(-0.6, Math.min(0.6, targetPhi - dy * 0.005));
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    idleTime = 0;
  });
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
      idleTime = 0;
      autoRotateSpeed = 0;
    }
  }, { passive: true });
  canvas.addEventListener('touchend', () => { isDragging = false; autoRotateSpeed = 0.001; });
  canvas.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMouseX;
    const dy = e.touches[0].clientY - lastMouseY;
    targetTheta -= dx * 0.005;
    targetPhi = Math.max(-0.6, Math.min(0.6, targetPhi - dy * 0.005));
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
    idleTime = 0;
  }, { passive: true });

  // Event feed overlay
  const overlay = document.createElement('div');
  overlay.className = 'globe-event-overlay';
  overlay.id = 'globeEventOverlay';
  overlay.innerHTML = '<div class="globe-event-line" id="globeEventLine"></div>';
  container.appendChild(overlay);

  // Widget border flash element
  const widget = container.closest('.globe-widget');
  let flashTimeout = null;
  function flashWidgetBorder(color) {
    if (!widget) return;
    widget.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
    widget.style.boxShadow = '0 0 0 2px ' + color + ', 0 0 20px ' + color + '40';
    widget.style.borderColor = color;
    if (flashTimeout) clearTimeout(flashTimeout);
    flashTimeout = setTimeout(() => {
      widget.style.boxShadow = '';
      widget.style.borderColor = '';
    }, 1400);
  }

  const GLOBE_EVENTS = [
    // Infra events
    { region: 'us-east-1', text: 'Deploy initiated', color: '#1e40af', severity: 'info' },
    { region: 'us-west-2', text: 'Latency spike 1.2s', color: '#b45309', severity: 'warn' },
    { region: 'eu-west-1', text: 'Auto-scaling triggered', color: '#166534', severity: 'info' },
    { region: 'ap-south-1', text: 'DB failover complete', color: '#166534', severity: 'info' },
    { region: 'ap-northeast-1', text: 'DDoS mitigated', color: '#1e40af', severity: 'info' },
    { region: 'us-east-1', text: 'Critical: memory leak', color: '#991b1b', severity: 'error' },
    { region: 'sa-east-1', text: 'Node rebooted', color: '#b45309', severity: 'warn' },
    { region: 'ap-southeast-1', text: 'Cache warmed', color: '#166534', severity: 'info' },
    { region: 'us-west-2', text: 'Alert: disk 92%', color: '#991b1b', severity: 'error' },
    { region: 'eu-west-1', text: 'Traffic spike +340%', color: '#b45309', severity: 'warn' },
    // Global context — data only
    { region: 'ap-northeast-1', text: 'Currency volatility +14%', color: '#b45309', severity: 'warn' },
    { region: 'eu-west-1', text: 'Energy grid load peaked 94%', color: '#b45309', severity: 'warn' },
    { region: 'ap-south-1', text: 'Birth rate delta -2.1%', color: '#1e40af', severity: 'info' },
    { region: 'sa-east-1', text: 'Transit capacity 127%', color: '#b45309', severity: 'warn' },
    { region: 'us-east-1', text: 'Solar flare Kp=6 detected', color: '#1e40af', severity: 'info' },
    { region: 'ap-southeast-1', text: 'Shipping volume down 31%', color: '#b45309', severity: 'warn' },
    { region: 'us-west-2', text: 'Commodity futures +18%', color: '#166534', severity: 'info' },
    { region: 'eu-west-1', text: 'Rainfall deficit -38%', color: '#991b1b', severity: 'error' },
    { region: 'ap-northeast-1', text: 'Population flow density up', color: '#1e40af', severity: 'info' },
    { region: 'us-east-1', text: 'Labor data delta +0.4pp', color: '#166534', severity: 'info' },
    // Satirical corporate surveillance — absurd, apolitical
    { region: 'us-east-1', text: 'Citizen score +0.2', color: '#166534', severity: 'info' },
    { region: 'us-west-2', text: 'Eyeball dwell 340ms', color: '#b45309', severity: 'warn' },
    { region: 'eu-west-1', text: 'Dopamine up 12%', color: '#166534', severity: 'info' },
    { region: 'ap-northeast-1', text: 'Attention span 2.3s', color: '#991b1b', severity: 'error' },
    { region: 'ap-south-1', text: 'Sentiment: pizza -18', color: '#b45309', severity: 'warn' },
    { region: 'sa-east-1', text: 'Predicted 4 umbrellas', color: '#1e40af', severity: 'info' },
    { region: 'ap-southeast-1', text: 'Involuntary smiles: 3', color: '#166534', severity: 'info' },
    { region: 'us-east-1', text: 'Mood: "unprofitable"', color: '#991b1b', severity: 'error' },
    { region: 'eu-west-1', text: 'Break efficiency +8%', color: '#166534', severity: 'info' },
    { region: 'us-west-2', text: 'Algorithm recommends air', color: '#1e40af', severity: 'info' },
  ];

  function triggerGlobeEvent(evt) {
    const reg = regions.find(r => r.id === evt.region);
    if (!reg) return;
    const colorHex = parseInt(evt.color.replace('#', ''), 16);

    const rm = regionMeshes.find(m => m.data.id === evt.region);
    if (rm) {
      // Flash the node big and bright
      rm.core.material.color.set(colorHex);
      rm.core.material.opacity = 1;
      rm.core.scale.set(2.5, 2.5, 2.5);
      rm.ring.material.color.set(colorHex);
      rm.ring.material.opacity = 0.8;
      rm.ring.scale.set(1.5, 1.5, 1.5);

      setTimeout(() => {
        rm.core.material.color.set(statusColors[reg.status]);
        rm.core.material.opacity = 0.9;
        rm.ring.material.color.set(statusColors[reg.status]);
        rm.ring.material.opacity = 0.25;
        gsap.to(rm.core.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
        gsap.to(rm.ring.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
      }, 700);
    }

    // Big, clean ping wave
    spawnPingWave(evt.region, colorHex, evt.severity === 'error' ? 1.3 : 0.8);

    // Send a packet along an arc if one exists
    const target = pick(regions.filter(r => r.id !== evt.region));
    const arcIdx = arcs.findIndex(a => (a.from === evt.region && a.to === target.id) || (a.from === target.id && a.to === evt.region));
    if (arcIdx >= 0) spawnPacket(arcIdx, colorHex);

    // Camera focus
    const targetPos = latLonToVec3(reg.lat, reg.lon, 1);
    const eventTheta = Math.atan2(targetPos.x, targetPos.z);
    const eventPhi = Math.asin(Math.max(-1, Math.min(1, targetPos.y)));
    targetTheta = eventTheta + 0.15;
    targetPhi = -eventPhi * 0.5;
    targetRadius = 2.2;
    setTimeout(() => { targetRadius = 2.6; }, 2200);

    // Widget border flash
    flashWidgetBorder(evt.color);

    // HTML overlay
    const line = document.getElementById('globeEventLine');
    if (line) {
      line.innerHTML = '<span class="globe-event-pip" style="background:' + evt.color + '"></span>' +
        '<span class="globe-event-time">' + formatTime(new Date()) + '</span>' +
        '<span class="globe-event-region">' + evt.region + '</span>' +
        '<span class="globe-event-text">' + evt.text + '</span>';
      line.style.borderLeftColor = evt.color;
      gsap.fromTo(line, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
      gsap.to(line, { opacity: 0, y: -6, duration: 0.3, delay: 3.5, ease: 'power2.in' });
    }
  }

  function scheduleGlobeEvent() {
    setTimeout(() => {
      triggerGlobeEvent(pick(GLOBE_EVENTS));
      scheduleGlobeEvent();
    }, rand(2500, 7000));
  }

  // Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.016;
    idleTime += 0.016;

    camTheta += (targetTheta - camTheta) * 0.04;
    camPhi += (targetPhi - camPhi) * 0.04;
    camRadius += (targetRadius - camRadius) * 0.03;

    if (idleTime > 3 && !isDragging) targetTheta += autoRotateSpeed;

    camera.position.x = camRadius * Math.sin(camTheta) * Math.cos(camPhi);
    camera.position.y = camRadius * Math.sin(camPhi);
    camera.position.z = camRadius * Math.cos(camTheta) * Math.cos(camPhi);
    camera.lookAt(0, 0, 0);

    world.rotation.y += 0.0003;

    world.children.forEach(child => {
      if (child.userData && child.userData.speed) child.rotation.z += child.userData.speed;
    });

    regionMeshes.forEach((m, i) => {
      const s = 1 + Math.sin(time * 2 + i) * 0.2;
      m.ring.scale.set(s, s, s);
      m.ring.material.opacity = 0.25 - (s - 1) * 0.1;
    });

    // Ping waves
    for (let i = pingWaves.length - 1; i >= 0; i--) {
      const pw = pingWaves[i];
      pw.scale += pw.speed;
      pw.mesh.scale.set(pw.scale, pw.scale, pw.scale);
      pw.mat.opacity = pw.opacity * Math.max(0, 1 - (pw.scale - 1) / 3);
      if (pw.scale > 4) {
        world.remove(pw.mesh);
        pw.mesh.geometry.dispose();
        pw.mat.dispose();
        pingWaves.splice(i, 1);
      }
    }

    // Packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.progress += p.speed;
      if (p.progress >= 1) {
        world.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        packets.splice(i, 1);
        continue;
      }
      const pt = p.arc.curve.getPoint(p.progress);
      p.mesh.position.copy(pt);
      p.mesh.scale.setScalar(1 + Math.sin(p.progress * Math.PI) * 0.6);
      p.mesh.material.opacity = 0.8 * (1 - Math.abs(p.progress - 0.5) * 1.5);
    }

    // Occasional background packet
    if (Math.random() < 0.015 && arcs.length > 0) {
      spawnPacket(rand(0, arcs.length - 1));
    }

    renderer.render(scene, camera);
  }
  animate();

  scheduleGlobeEvent();

  window.addEventListener('resize', () => {
    const w = container.clientWidth, h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

// ============================
// CHARTS (Smoothie — real-time scrolling)
// ============================
function initCharts() {
  const canvas = document.getElementById('mainChart');
  if (!canvas) return;
  const container = canvas.parentElement;
  if (!container) return;

  function sizeCanvas() {
    const w = container.clientWidth || 300;
    const h = container.clientHeight || 150;
    canvas.width = w;
    canvas.height = h;
  }

  sizeCanvas();

  if (!chartSeries.traffic) chartSeries.traffic = new TimeSeries();
  if (!chartSeries.load) chartSeries.load = new TimeSeries();
  smoothieChart = buildSmoothieChart();

  window.addEventListener('resize', () => {
    sizeCanvas();
  });

  const now = Date.now();
  for (let i = 24; i >= 0; i--) {
    chartSeries.traffic.append(now - i * 1000, rand(30, 85));
    chartSeries.load.append(now - i * 1000, rand(20, 70));
  }
}

function updateCharts() {
  if (!chartSeries.traffic || !chartSeries.load) return;
  const now = Date.now();
  chartSeries.traffic.append(now, rand(30, 90));
  chartSeries.load.append(now, rand(20, 75));
}

// ============================
// KPI + SPARKLINES
// ============================
let kpiTargets = { kpi1: 64, kpi2: 142, kpi3: 28, kpi4: 1.2 };
let kpiCurrent = { ...kpiTargets };
const sparkHistory = {
  kpi1: Array.from({ length: 20 }, () => rand(40, 80)),
  kpi2: Array.from({ length: 20 }, () => rand(100, 200)),
  kpi3: Array.from({ length: 20 }, () => rand(20, 40)),
  kpi4: Array.from({ length: 20 }, () => rand(0, 3)),
};

function drawSparkline(id, color) {
  const container = document.getElementById(id);
  if (!container) return;
  const w = container.clientWidth || 60;
  const h = container.clientHeight || 28;
  const data = sparkHistory[id.replace('spark', 'kpi')];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return x + ',' + y;
  }).join(' ');

  container.innerHTML = '<svg width="' + w + '" height="' + h + '" style="overflow:visible">' +
    '<polyline points="' + points + '" fill="none" stroke="' + color + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<circle cx="' + w + '" cy="' + (h - ((data[data.length - 1] - min) / range) * h) + '" r="2" fill="' + color + '"/>' +
    '</svg>';
}

function updateKPIs() {
  const colors = { kpi1: '#1e40af', kpi2: '#b45309', kpi3: '#166534', kpi4: '#991b1b' };
  const deltas = { kpi1: rand(-3, 4), kpi2: rand(-8, 10), kpi3: rand(-1, 2), kpi4: parseFloat((Math.random() * 0.4 - 0.15).toFixed(2)) };
  Object.keys(deltas).forEach(id => {
    kpiTargets[id] = Math.max(0, parseFloat((kpiTargets[id] + deltas[id]).toFixed(id === 'kpi4' ? 2 : 0)));
    const hist = sparkHistory[id];
    hist.push(kpiTargets[id]);
    hist.shift();
    const el = document.getElementById(id);
    if (el) {
      gsap.to(kpiCurrent, {
        [id]: kpiTargets[id],
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          const val = kpiCurrent[id];
          el.innerText = id === 'kpi4' ? val.toFixed(2) : Math.round(val);
        }
      });
    }
    drawSparkline('spark' + id.slice(-1), colors[id]);
  });
}

// ============================
// KANBAN - renamed to Task Monitor
// ============================
function createKanbanCard(column) {
  const id = 'TK-' + String(kanbanIdCounter++).padStart(4, '0');
  const title = pick(KANBAN_TITLES);
  const tag = pick(KANBAN_TAGS);
  const priority = pick(PRIORITIES);
  const users = [pick(USERS), pick(USERS)].filter((u, i, a) => a.indexOf(u) === i);
  const card = { id, title, tag, priority, users, column };
  kanbanCards.push(card);
  renderKanbanCard(card, true);
  updateKanbanCounts();
  return card;
}

function renderKanbanCard(card, animateIn) {
  const col = document.getElementById(card.column);
  if (!col) return;
  const el = document.createElement('div');
  el.className = 'kanban-card';
  el.dataset.cardId = card.id;
  el.innerHTML = '<div class="kanban-card-header"><span class="kanban-card-id">' + card.id + '</span><span class="kanban-card-priority ' + card.priority + '"></span></div>' +
    '<div class="kanban-card-title">' + card.title + '</div>' +
    '<div class="kanban-card-meta"><span class="kanban-card-tag">' + card.tag + '</span>' +
    '<div class="kanban-card-avatars">' + card.users.map(u => '<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=' + u.seed + '" alt="' + u.name + '" title="' + u.name + '">').join('') + '</div></div>';
  col.appendChild(el);
  if (animateIn) gsap.from(el, { opacity: 0, y: 10, duration: 0.35, ease: 'power2.out' });
}

function moveKanbanCard(cardId, toColumn) {
  const card = kanbanCards.find(c => c.id === cardId);
  if (!card || card.column === toColumn) return;
  const el = document.querySelector('[data-card-id="' + cardId + '"]');
  if (!el) return;
  const flow = { backlog: 0, progress: 1, review: 2, done: 3 };
  const direction = flow[toColumn] > flow[card.column] ? 1 : -1;
  gsap.to(el, {
    x: direction * 40, opacity: 0, scale: 0.92, duration: 0.35, ease: 'power2.in',
    onComplete: () => {
      const newCol = document.getElementById(toColumn);
      newCol.appendChild(el);
      card.column = toColumn;
      gsap.set(el, { x: direction * -40, opacity: 0, scale: 0.92 });
      gsap.to(el, { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', onComplete: () => {
        updateKanbanCounts();
        if (toColumn === 'done') addActivity(pick(USERS).name + ' completed', card.id);
      }});
    }
  });
}

function updateKanbanCounts() {
  ['backlog', 'progress', 'review', 'done'].forEach(c => {
    const count = kanbanCards.filter(k => k.column === c).length;
    const el = document.getElementById('col-' + c);
    if (el) gsap.to(el, { innerText: count, duration: 0.3, snap: { innerText: 1 } });
  });
  document.getElementById('kanbanCount').innerText = kanbanCards.length + ' tasks';
}

function autoMoveKanban() {
  const movable = kanbanCards.filter(c => c.column !== 'done');
  if (movable.length === 0) {
    const doneCards = kanbanCards.filter(c => c.column === 'done');
    doneCards.forEach((c, i) => {
      const el = document.querySelector('[data-card-id="' + c.id + '"]');
      if (el) gsap.to(el, { x: 30, opacity: 0, scale: 0.9, duration: 0.3, delay: i * 0.06, ease: 'power2.in', onComplete: () => el.remove() });
    });
    kanbanCards = kanbanCards.filter(c => c.column !== 'done');
    setTimeout(() => {
      for (let i = 0; i < 4; i++) createKanbanCard('backlog');
      updateKanbanCounts();
    }, 300);
    return;
  }
  const card = pick(movable);
  const flow = { backlog: 'progress', progress: 'review', review: 'done' };
  const next = flow[card.column];
  if (next) moveKanbanCard(card.id, next);
}

function initKanban() {
  for (let i = 0; i < 3; i++) createKanbanCard('backlog');
  for (let i = 0; i < 2; i++) createKanbanCard('progress');
  for (let i = 0; i < 2; i++) createKanbanCard('review');
  for (let i = 0; i < 2; i++) createKanbanCard('done');
  updateKanbanCounts();
}

// ============================
// ACTIVITY
// ============================
function addActivity(action, target) {
  const list = document.getElementById('activityList');
  if (!list) return;
  const user = pick(USERS);
  const item = document.createElement('div');
  item.className = 'activity-item';
  item.innerHTML = '<img class="activity-avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.seed + '" alt="' + user.name + '">' +
    '<div class="activity-content"><div class="activity-text"><strong>' + user.name + '</strong> ' + action + ' <strong>' + target + '</strong></div>' +
    '<div class="activity-time">' + formatTime(new Date()) + '</div></div>';
  list.insertBefore(item, list.firstChild);
  gsap.from(item, { opacity: 0, x: -12, duration: 0.3, ease: 'power2.out' });
  while (list.children.length > CONFIG.maxActivityItems) list.removeChild(list.lastChild);
}

function autoActivity() {
  addActivity(pick(ACTIVITY_ACTIONS), pick(ACTIVITY_TARGETS));
}

// ============================
// ALERTS
// ============================
function createAlert(autoResolve) {
  const id = 'ALERT-' + alertIdCounter++;
  const title = pick(ALERT_TITLES);
  const desc = pick(ALERT_DESCS);
  const severity = rand(1, 3);
  const alert = { id, title, desc, severity, time: Date.now() };
  activeAlerts.push(alert);
  renderAlert(alert);
  if (autoResolve) setTimeout(() => resolveAlert(id), CONFIG.autoResolveAlertTime);
  return alert;
}

function renderAlert(alert) {
  const list = document.getElementById('alertsList');
  const el = document.createElement('div');
  el.className = 'alert-item';
  el.dataset.alertId = alert.id;
  const sev = alert.severity === 1 ? 'P1' : alert.severity === 2 ? 'P2' : 'P3';
  el.innerHTML = '<div class="alert-severity">' + sev + '</div>' +
    '<div class="alert-content"><div class="alert-title">' + alert.title + '</div>' +
    '<div class="alert-desc">' + alert.desc + '</div>' +
    '<div class="alert-actions"><button class="alert-btn resolve" data-aid="' + alert.id + '">Resolve</button>' +
    '<button class="alert-btn ignore" data-aid="' + alert.id + '">Ignore</button></div></div>';
  list.insertBefore(el, list.firstChild);
  gsap.from(el, { opacity: 0, x: 16, duration: 0.35, ease: 'power2.out' });
  el.querySelector('.alert-btn.resolve').addEventListener('click', () => resolveAlert(alert.id));
  el.querySelector('.alert-btn.ignore').addEventListener('click', () => ignoreAlert(alert.id));
  while (list.children.length > CONFIG.maxAlerts) {
    const old = list.lastChild;
    if (old) { activeAlerts = activeAlerts.filter(a => a.id !== old.dataset.alertId); old.remove(); }
  }
  showToast(alert);
}

function resolveAlert(id) {
  const idx = activeAlerts.findIndex(a => a.id === id);
  if (idx === -1) return;
  activeAlerts.splice(idx, 1);
  const el = document.querySelector('[data-alert-id="' + id + '"]');
  if (el) {
    el.classList.add('resolving');
    gsap.to(el, { opacity: 0, x: -30, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, duration: 0.4, ease: 'power2.in', onComplete: () => el.remove() });
  }
  addActivity('resolved alert', id);
}

function ignoreAlert(id) { resolveAlert(id); }

function showToast(alert) {
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = 'alert-toast';
  el.innerHTML = '<div class="toast-icon">!</div><div class="toast-content"><div class="toast-title">' + alert.title + '</div>' +
    '<div class="toast-desc">' + alert.desc.substring(0, 55) + '...</div></div>' +
    '<button class="toast-close">x</button>';
  container.appendChild(el);
  el.querySelector('.toast-close').addEventListener('click', () => { el.classList.add('resolving'); setTimeout(() => el.remove(), 400); });
  setTimeout(() => { el.classList.add('resolving'); setTimeout(() => el.remove(), 400); }, 6000);
}

function initAlerts() {
  for (let i = 0; i < 3; i++) createAlert(true);
}

// ============================
// CHAT
// ============================
function addChatMessage(text, isOwn, user) {
  const container = document.getElementById('chatMessages');
  const u = user || pick(USERS);
  const msg = document.createElement('div');
  msg.className = 'chat-message' + (isOwn ? ' own' : '');
  msg.innerHTML = '<img class="chat-msg-avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=' + u.seed + '" alt="' + u.name + '">' +
    '<div class="chat-msg-content">' + (!isOwn ? '<div class="chat-msg-author">' + u.name + '</div>' : '') +
    '<div class="chat-msg-bubble">' + text + '</div></div>';
  container.appendChild(msg);
  gsap.from(msg, { opacity: 0, y: 6, duration: 0.25, ease: 'power2.out' });
  container.scrollTop = container.scrollHeight;
  while (container.children.length > CONFIG.maxChatMessages) container.removeChild(container.firstChild);
}

function autoChat() {
  addChatMessage(pick(CHAT_MESSAGES), false);
}

// ============================
// NOTIFICATIONS
// ============================
function addNotification(notif) {
  const n = notif || pick(NOTIFICATIONS);
  notifications.unshift({ ...n, time: Date.now(), read: false });
  if (notifications.length > CONFIG.maxNotifications) notifications.pop();
  renderNotification(n);
  updateNotifBadge();
}

function renderNotification(n) {
  const list = document.getElementById('notifList');
  const el = document.createElement('div');
  el.className = 'notif-item unread ' + n.type;
  const icons = { info: 'i', warn: '!', error: 'x' };
  el.innerHTML = '<div class="notif-icon ' + n.type + '">' + icons[n.type] + '</div>' +
    '<div class="notif-content"><div class="notif-title">' + n.title + '</div>' +
    '<div class="notif-desc">' + n.desc + '</div>' +
    '<div class="notif-time">' + formatTime(new Date()) + '</div></div>';
  list.insertBefore(el, list.firstChild);
  while (list.children.length > CONFIG.maxNotifications) list.removeChild(list.lastChild);
}

function updateNotifBadge() {
  const unread = notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notifBadge');
  if (badge) { badge.innerText = unread; badge.style.display = unread > 0 ? 'flex' : 'none'; }
}

function initNotifications() {
  for (let i = 0; i < 6; i++) addNotification();
}

// ============================
// CLOCK
// ============================
function updateClock() {
  const now = new Date();
  const t = document.getElementById('clock');
  const d = document.getElementById('date');
  if (t) t.innerText = formatTime(now);
  if (d) d.innerText = now.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
}

// ============================
// GSAP ENTRANCE
// ============================
function runEntrance() {
  const tl = gsap.timeline();
  tl.to('.kpi-card', { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' })
    .to('.globe-widget', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.1)' }, '-=0.3')
    .to('.widget-card', { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power3.out' }, '-=0.4');
}

// ============================
// EVENTS
// ============================
function setupEvents() {
  const notifBtn = document.getElementById('notifBtn');
  const notifPanel = document.getElementById('notifPanel');
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifPanel.classList.toggle('open');
    if (notifPanel.classList.contains('open')) {
      notifications.forEach(n => n.read = true);
      updateNotifBadge();
      document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
    }
  });
  document.getElementById('clearNotifs').addEventListener('click', () => {
    document.getElementById('notifList').innerHTML = '';
    notifications = [];
    updateNotifBadge();
  });
  document.getElementById('dismissAll').addEventListener('click', () => {
    const alerts = document.querySelectorAll('.alert-item');
    alerts.forEach((el, i) => {
      gsap.to(el, { opacity: 0, x: -20, duration: 0.3, delay: i * 0.04, ease: 'power2.in', onComplete: () => el.remove() });
    });
    activeAlerts = [];
  });
  document.addEventListener('click', (e) => {
    if (!notifBtn.contains(e.target) && !notifPanel.contains(e.target)) notifPanel.classList.remove('open');
  });
}

// ============================
// LOOPS
// ============================
function startLoops() {
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(updateKPIs, CONFIG.kpiUpdateInterval);
  setInterval(updateCharts, CONFIG.chartUpdateInterval);
  setInterval(autoMoveKanban, CONFIG.kanbanMoveInterval);
  setInterval(autoActivity, CONFIG.activityInterval);
  setInterval(() => createAlert(true), CONFIG.alertInterval);
  setInterval(autoChat, CONFIG.chatInterval);
  setInterval(() => addNotification(), CONFIG.notificationInterval);
  setInterval(() => {
    const id = pick(['kpi1', 'kpi2', 'kpi3', 'kpi4']);
    const el = document.getElementById(id);
    if (el) gsap.to(el, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1 });
  }, 2200);
  setInterval(() => {
    if (Math.random() > 0.5) {
      const replies = ['Acknowledged', 'Checking now', 'Confirmed', 'On it', 'LGTM', 'Roger'];
      addChatMessage(pick(replies), true, USERS[0]);
    }
  }, 10000);
}

// ============================
// FAKE CURSORS
// ============================
const FAKE_CURSORS = [
  { id: 'cursor-1', name: 'Jordan L.', color: '#b45309' },
  { id: 'cursor-2', name: 'Sam Q.', color: '#1e40af' },
];

function initFakeCursors() {
  const layer = document.getElementById('fakeCursorsLayer');
  if (!layer) return;
  FAKE_CURSORS.forEach(cfg => {
    const el = document.createElement('div');
    el.className = 'fake-cursor';
    el.id = cfg.id;
    el.style.opacity = '0';
    el.innerHTML = '<div class="cursor-ring" style="border-color:' + cfg.color + '"></div>' +
      '<svg viewBox="0 0 24 24" fill="' + cfg.color + '">' +
      '<path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36Z"/>' +
      '</svg><div class="cursor-label" style="background:' + cfg.color + '">' + cfg.name + '</div>';
    layer.appendChild(el);
    gsap.to(el, { opacity: 1, duration: 0.6, delay: Math.random() * 1.5, ease: 'power2.out' });
    startCursorLoop(cfg, el);
  });
}

function getFunctionalTarget() {
  // Only elements that do something when clicked
  const pools = [
    { sel: '.kanban-cards .kanban-card', weight: 40 },
    { sel: '.alert-item .alert-btn.resolve', weight: 25 },
    { sel: '.alert-item .alert-btn.ignore', weight: 15 },
    { sel: '.dismiss-all', weight: 8 },
    { sel: '#clearNotifs', weight: 8 },
    { sel: '.notifications-btn', weight: 8 },
    { sel: '.chart-btn', weight: 5 },
  ];
  const totalWeight = pools.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * totalWeight;
  for (const pool of pools) {
    r -= pool.weight;
    if (r <= 0) {
      const items = document.querySelectorAll(pool.sel);
      if (!items.length) continue;
      return pick(Array.from(items));
    }
  }
  return null;
}

function startCursorLoop(cfg, cursorEl) {
  const ring = cursorEl.querySelector('.cursor-ring');

  async function nextAction() {
    const wait = rand(2000, 5000);
    await new Promise(r => setTimeout(r, wait));

    let target = getFunctionalTarget();
    // Retry a few times if nothing found
    for (let tries = 0; !target && tries < 5; tries++) {
      await new Promise(r => setTimeout(r, 300));
      target = getFunctionalTarget();
    }
    if (!target || !document.body.contains(target)) { nextAction(); return; }

    const rect = target.getBoundingClientRect();
    const destX = rect.left + rand(4, Math.max(4, rect.width - 4));
    const destY = rect.top + rand(4, Math.max(4, rect.height - 4));
    const duration = rand(1.0, 1.8);

    gsap.to(cursorEl, {
      x: destX, y: destY, duration, ease: 'power2.inOut',
      onComplete: () => {
        ring.classList.add('active');
        createClickRipple(destX, destY, cfg.color);

        setTimeout(() => {
          ring.classList.remove('active');

          // Execute real functional action
          if (target.classList.contains('kanban-card')) {
            const cardId = target.dataset.cardId;
            const card = kanbanCards.find(c => c.id === cardId);
            if (card && card.column !== 'done') {
              // Animate cursor following the card during move
              simulateKanbanDrag(cfg, cursorEl, target);
            } else {
              // Card is done, just highlight editing
              addEditingHighlight(target, cfg.color);
              setTimeout(nextAction, rand(600, 1200));
            }
          } else if (target.classList.contains('alert-btn') && target.classList.contains('resolve')) {
            gsap.fromTo(target, { scale: 0.92 }, { scale: 1, duration: 0.15 });
            target.click();
            setTimeout(nextAction, rand(600, 1200));
          } else if (target.classList.contains('alert-btn') && target.classList.contains('ignore')) {
            gsap.fromTo(target, { scale: 0.92 }, { scale: 1, duration: 0.15 });
            target.click();
            setTimeout(nextAction, rand(600, 1200));
          } else if (target.id === 'dismissAll') {
            gsap.fromTo(target, { scale: 0.92 }, { scale: 1, duration: 0.15 });
            target.click();
            setTimeout(nextAction, rand(600, 1200));
          } else if (target.id === 'clearNotifs') {
            gsap.fromTo(target, { scale: 0.92 }, { scale: 1, duration: 0.15 });
            target.click();
            setTimeout(nextAction, rand(600, 1200));
          } else if (target.classList.contains('notifications-btn')) {
            gsap.fromTo(target, { scale: 0.92 }, { scale: 1, duration: 0.15 });
            target.click();
            setTimeout(nextAction, rand(600, 1200));
          } else if (target.classList.contains('chart-btn')) {
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            target.classList.add('active');
            gsap.fromTo(target, { scale: 0.92 }, { scale: 1, duration: 0.15 });
            setTimeout(nextAction, rand(600, 1200));
          } else {
            setTimeout(nextAction, rand(600, 1200));
          }
        }, rand(350, 700));
      }
    });
  }

  const vw = window.innerWidth, vh = window.innerHeight;
  gsap.set(cursorEl, { x: rand(120, vw - 140), y: rand(100, vh - 140) });
  setTimeout(nextAction, rand(800, 2000));
}

function createClickRipple(x, y, color) {
  const ripple = document.createElement('div');
  ripple.className = 'cursor-click-ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.width = '20px';
  ripple.style.height = '20px';
  ripple.style.background = color;
  document.getElementById('fakeCursorsLayer').appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

function addEditingHighlight(target, color) {
  if (target.querySelector('.card-editing-highlight')) return;
  const hl = document.createElement('div');
  hl.className = 'card-editing-highlight';
  hl.style.borderColor = color;
  target.style.position = 'relative';
  target.appendChild(hl);
  setTimeout(() => { if (hl.parentNode) hl.remove(); }, rand(2500, 5000));
}

function simulateKanbanDrag(cfg, cursorEl, cardEl) {
  const cardId = cardEl.dataset.cardId;
  if (!cardId) return;
  const card = kanbanCards.find(c => c.id === cardId);
  if (!card || card.column === 'done') return;
  const flow = { backlog: 'progress', progress: 'review', review: 'done' };
  const next = flow[card.column];
  if (!next) return;
  const onMove = () => {
    if (!document.body.contains(cardEl)) return;
    const r = cardEl.getBoundingClientRect();
    gsap.to(cursorEl, { x: r.left + 8, y: r.top + 8, duration: 0.3, ease: 'power2.out', overwrite: true });
  };
  const interval = setInterval(onMove, 80);
  moveKanbanCard(cardId, next);
  setTimeout(() => clearInterval(interval), 900);
}

function simulateChatTyping(cfg) {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const phrases = [
    'checking the deploy...', 'latency is spiking', 'on it now',
    'looking into this', 'will update in 5', 'can someone verify?',
  ];
  const text = pick(phrases);
  input.value = '';
  let i = 0;
  const interval = setInterval(() => {
    input.value = text.substring(0, i + 1);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      setTimeout(() => { input.value = ''; }, rand(800, 1500));
    }
  }, rand(60, 120));
}

// ============================
// INIT
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('pulse-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  initCharts();
  initKanban();
  initAlerts();
  initNotifications();
  setupEvents();
  runEntrance();
  startLoops();
  initFakeCursors();
  initGlobe();

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(next);
    });
  }

  setTimeout(() => {
    const container = document.getElementById('toastContainer');
    const el = document.createElement('div');
    el.className = 'alert-toast';
    el.style.borderLeftColor = currentTheme === 'dark' ? '#60a5fa' : '#1e40af';
    el.innerHTML = '<div class="toast-icon" style="background:' + (currentTheme === 'dark' ? '#1e293b' : '#dbeafe') + ';color:' + (currentTheme === 'dark' ? '#60a5fa' : '#1e40af') + ';">OK</div>' +
      '<div class="toast-content"><div class="toast-title">PULSE Ops Online</div>' +
      '<div class="toast-desc">Monitoring active. All systems nominal.</div></div>';
    container.appendChild(el);
    setTimeout(() => { el.classList.add('resolving'); setTimeout(() => el.remove(), 400); }, 4000);
  }, 1200);
});
