/* ═══════════════════════════════════════════════════════════════
   SIGA·SIGA · Ente Autárquico de Monitoreo de la Argentinidad
   Monitoreamos todo. No arreglamos nada. Siga, siga.
   Todo canvas 2D hand-rolled — el mapa es point-in-polygon sobre
   un contorno criollo de la República. Sin librerías.
   Fable 5, versión argenta.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

const $  = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const rand  = (a, b) => a + Math.random() * (b - a);
const randi = (a, b) => Math.floor(rand(a, b + 1));
const pick  = (arr) => arr[Math.floor(Math.random() * arr.length)];
const _ult = new WeakMap();
const pickNR = (a) => { let v; do { v = pick(a); } while (a.length > 1 && v === _ult.get(a)); _ult.set(a, v); return v; };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const pad   = (n, l = 2) => String(n).padStart(l, '0');
const pesos = (n, dec = 2) => n.toLocaleString('es-AR', { minimumFractionDigits: dec, maximumFractionDigits: dec });

let BARDO = false;

/* ═══════════════ GEOGRAFÍA CRIOLLA ═══════════════ */
/* Contorno aproximado de la República, [lon, lat]. Reconocible,
   no catastral. Dibujado a ojo, como los planos del tío. */

const ARG_CONTINENTAL = [
  [-66.6,-21.8],[-64.9,-22.2],[-64.3,-22.7],[-63.9,-22.2],[-62.8,-22.0],
  [-62.3,-22.5],[-61.0,-23.6],[-60.0,-24.0],[-58.6,-24.8],[-57.6,-25.4],
  [-58.2,-26.4],[-58.6,-27.3],[-56.9,-27.5],[-55.7,-27.1],[-54.6,-25.6],
  [-53.7,-26.2],[-54.0,-27.2],[-55.6,-28.1],[-57.0,-29.7],[-57.6,-30.2],
  [-58.1,-31.8],[-58.2,-32.5],[-58.4,-33.1],[-58.5,-34.0],[-58.3,-34.7],
  [-57.1,-35.4],[-57.3,-36.2],[-56.7,-36.8],[-57.5,-38.1],[-58.7,-38.5],
  [-60.9,-38.9],[-62.1,-38.8],[-62.2,-39.3],[-62.3,-40.6],[-63.5,-41.2],
  [-64.7,-40.8],[-65.1,-41.0],[-64.4,-42.4],[-63.6,-42.3],[-63.6,-42.8],
  [-65.3,-43.6],[-65.7,-45.0],[-67.3,-45.8],[-67.6,-46.5],[-66.8,-47.0],
  [-65.8,-47.9],[-67.5,-49.0],[-67.8,-50.0],[-69.0,-51.5],[-68.4,-52.3],
  [-69.9,-52.0],[-72.2,-51.7],[-72.3,-50.6],[-71.9,-49.3],[-71.4,-48.8],
  [-71.7,-47.8],[-71.6,-46.5],[-71.7,-45.5],[-71.3,-44.8],[-71.8,-44.0],
  [-71.6,-43.2],[-72.1,-42.3],[-71.7,-40.9],[-71.5,-39.5],[-70.9,-38.4],
  [-71.2,-37.5],[-70.4,-36.2],[-70.0,-35.3],[-69.8,-34.2],[-70.1,-33.2],
  [-70.0,-32.2],[-69.7,-31.0],[-70.2,-30.0],[-69.8,-29.2],[-69.0,-28.0],
  [-68.3,-27.0],[-68.6,-26.3],[-68.4,-25.2],[-67.3,-24.0],[-67.0,-23.0],
];

const ARG_TDF = [
  [-68.6,-52.65],[-65.2,-54.4],[-65.1,-54.9],[-66.3,-55.1],[-68.6,-54.9],
];

const ISLAS = [
  [[-61.3,-51.4],[-60.2,-51.3],[-60.0,-52.2],[-61.3,-52.0]],
  [[-59.7,-51.3],[-57.8,-51.5],[-58.4,-52.3],[-59.7,-52.0]],
];

const CIUDADES = [
  { n: 'CABA',           lat: -34.6, lon: -58.4 },
  { n: 'LA PLATA',       lat: -34.9, lon: -57.9 },
  { n: 'ROSARIO',        lat: -32.9, lon: -60.6 },
  { n: 'CÓRDOBA',        lat: -31.4, lon: -64.2 },
  { n: 'MENDOZA',        lat: -32.9, lon: -68.8 },
  { n: 'TUCUMÁN',        lat: -26.8, lon: -65.2 },
  { n: 'SALTA',          lat: -24.8, lon: -65.4 },
  { n: 'JUJUY',          lat: -24.2, lon: -65.3 },
  { n: 'CORRIENTES',     lat: -27.5, lon: -58.8 },
  { n: 'POSADAS',        lat: -27.4, lon: -55.9 },
  { n: 'SANTA FE',       lat: -31.6, lon: -60.7 },
  { n: 'MAR DEL PLATA',  lat: -38.0, lon: -57.5 },
  { n: 'BAHÍA BLANCA',   lat: -38.7, lon: -62.3 },
  { n: 'NEUQUÉN',        lat: -38.9, lon: -68.1 },
  { n: 'BARILOCHE',      lat: -41.1, lon: -71.3 },
  { n: 'COMODORO',       lat: -45.9, lon: -67.5 },
  { n: 'RÍO GALLEGOS',   lat: -51.6, lon: -69.2 },
  { n: 'USHUAIA',        lat: -54.8, lon: -68.3 },
  { n: 'SAN JUAN',       lat: -31.5, lon: -68.5 },
  { n: 'RESISTENCIA',    lat: -27.5, lon: -59.0 },
];

/* ═══════════════ CONTENIDO ═══════════════ */

const EVENTOS_MAPA = [
  'pico de fernet fuera de horario · proporción 70/30 verificada',
  'asado entre semana detectado · se investiga qué festejaban',
  'Zonda despeinando la provincia · alerta en peluquerías',
  'primer lobo marino del día fotografiado 40.000 veces',
  'el fin del mundo reporta que sigue todo ahí',
  'contingente de egresados entró en fase caótica controlada',
  'bocinazo sincronizado · afinado en La menor',
  'empanada con repulgue perfecto · patrimonio verificado',
  'milanesa tamaño provincia homologada oficialmente',
  'vecina pronosticó lluvia por la rodilla · radar coincide',
  'se pidió "una birra" y llegaron tres · redondeo criollo',
  'alguien gritó "¡ahí va!" y no iba nadie',
  'ola de "¿vieron el partido ayer?" en 8,4M de oficinas',
  'humedad al 91% · nivel de queja: conversacional',
  'cortaron la calle para un cumpleaños de 92 · procede',
  'choripán doblado con técnica reglamentaria',
  'la pava quedó a punto justo cuando sonó el timbre',
  'colectivo llegó al toque · pasajeros desconfiados',
  'dulce de leche clasificado como bien estratégico',
  'tres autos estacionados "un minutito" hace dos horas',
  'señor regando la vereda a las 7 AM · ritual confirmado',
  'se cantó envido con 33 · la mesa aplaude de pie',
  'se abrió un paraguas antes de la primera gota · vecino profeta',
  'olor a pan tostado en toda la cuadra · nadie admite ser',
  'la costanera reporta 400 mates simultáneos · récord parcial',
  'caminata "de una vueltita" superó los 8 km',
  'piletazo masivo al primer día de 28 grados',
  'siesta provincial en curso · no molestar bajo ningún concepto',
  'se mencionó "feriado puente" y la moral subió 12 puntos',
  'gol festejado en tres bares con 4 segundos de delay entre sí',
  'un remisero explicó la economía nacional en 11 cuadras',
  'taxista pronosticó el resultado del domingo · históricamente infalible',
  'facturas calientes recién salidas · fila espontánea instantánea',
  'peatón cruzó por mitad de cuadra mirando el celular · ileso, como siempre',
  'se juntaron "a tomar unos mates" hace 6 horas · siguen ahí',
  'jubilados resolvieron el país en un banco de plaza · acta no disponible',
  'alguien silbó una cumbia y tres desconocidos la siguieron',
  'kiosco abrió en horario · clientela desorientada',
  'se escuchó "de una" como respuesta a cuatro preguntas distintas',
];

const REG_CHK = [
  'termo nacional … LLENO',
  'yerba en la lata … QUEDA UN FONDITO',
  'asado del domingo … CONFIRMADO (falta confirmar)',
  'reservas de dulce de leche … 94% · NOMINAL',
  'carbón … HAY (DICE EL COLO)',
  'presión de la SUBE … CARGADA (con saldo negativo)',
  'vuelto del kiosco … EN CARAMELOS · ACEPTADO',
  'stock de facturas … 6 MEDIALUNAS, 2 VIGILANTES',
  'nivel del Río de la Plata … MARRÓN ESTABLE',
  'alambre estructural … AGUANTANDO TODO',
  'chimichurri madurando … 48HS · EN TÉRMINO',
  'hielo para el fernet … ALCANZA (NO ALCANZA)',
  'sifón de soda … PRESIÓN REGLAMENTARIA',
  'tapita del bidón … PERDIDA (COMO SIEMPRE)',
  'obelisco … SIGUE AHÍ · VERIFICADO',
  'la banda de sonido del país … CUMBIA A LO LEJOS',
  'pan lactal … QUEDAN LAS PUNTAS (NADIE LAS COME)',
  'tupper de la abuela … EN CIRCULACIÓN HACE 14 AÑOS',
  'bombilla … TAPADA A MEDIAS · SE BANCA',
  'centrifugado del lavarropas … AVISÓ A TODA LA CASA',
  'radio del taller … PASANDO LOS HITS DE SIEMPRE',
  'ventilador de techo … VELOCIDAD 2 (LA 3 HACE RUIDO)',
  'control remoto … FUNCIONA SI LO APRETÁS FUERTE',
  'mesa del fondo … RENGUEA · CALZADA CON CARTÓN',
  'olla de la abuela … INMORTAL · VERIFICADO',
  'cargador ajeno … EN PRÉSTAMO DESDE 2019',
  'destapador … DONDE SIEMPRE (NADIE SABE DÓNDE)',
];

const REG_EVT = [
  'colectivo avistado en horario · MILAGRO REGISTRADO',
  'abuela cocinó para 40 · eran 6 invitados',
  'audio de WhatsApp de 4:32 · resumido en "que sí"',
  'grupo familiar debate si el lunes es puente · sin resolución',
  '"dale que llegamos" pronunciado a 40 cuadras',
  'DT de WhatsApp propuso línea de 5 · aprobado por unanimidad',
  'perro llamado Negro respondió en 12 provincias a la vez',
  'tía subió foto de milanesas · 84 me gusta en 4 minutos',
  'se dijo "no, si ya sé" sin saber · 4,2M de casos',
  'ñoquis del 29 · stock y asistencia nominales',
  'bocina tocada 0,2s después del verde · récord igualado',
  'pibe del delivery elogió al perro · confianza barrial al alza',
  '"ahora vengo" promedio nacional: 2h 40min',
  'se ató con alambre una cosa que ya estaba atada con alambre',
  'discusión tortilla con/sin cebolla · empate técnico otra vez',
  'el "último y nos vamos" entró en su tercera hora',
  'aplauso al aterrizar · tradición aeronáutica vigente',
  'muzzarella declarada patrimonio en 3 partidos bonaerenses',
  'se dijo "cortita y al pie" en una reunión de directorio',
  '"¿me tirás la data?" alcanzó máximo histórico mensual',
  'un "dale, nos vemos" no especificó fecha ni lugar · tradición intacta',
  'se usó "viste" como puntuación 40 veces en una llamada',
  'la palabra "quilombo" describió 7 situaciones distintas hoy',
  'un argentino le explicó el mate a un turista · duró 45 minutos',
  'se prometió "última porción" antes de las tres siguientes',
  'el "ya salgo" coincidió con la ducha empezando',
  'aplauso en el cine · película nacional confirmada',
  'un asador defendió su punto con bibliografía inventada',
  'bolsa guardada dentro de otra bolsa · sistema nacional de bolsas OK',
  '"lo tengo en el auto" resultó cierto · asombro generalizado',
  'se pidió "un minutito" con duración real de 40 minutos',
  'el perro se comió algo en la calle · vivió para contarla',
];

const ALERTAS = [
  { sev: 'grave', titulo: 'MATE LAVADO EN CIRCULACIÓN', lugar: 'SECTOR CENTRO · CEBADOR EN SUMARIO',
    cuerpo: 'Se recomienda cambiar la yerba, pedir disculpas y reflexionar.' },
  { sev: 'ojo', titulo: 'TORTILLA SIN CEBOLLA SERVIDA', lugar: 'BODEGÓN S/N · MESA 12',
    cuerpo: 'Debate nacional reabierto. Comisión de Papas convocada de urgencia.' },
  { sev: 'dato', titulo: '"AHORA VENGO" HACE 3 HORAS', lugar: 'PARADERO DESCONOCIDO',
    cuerpo: 'El sujeto avisó. El que avisa no traiciona. Caso archivado.' },
  { sev: 'grave', titulo: 'EMPANADA CON PASAS INFILTRADA', lugar: 'PEDIDO GRUPAL #4471',
    cuerpo: 'Nadie la pidió. Nadie la reclama. Permanece en la caja, observando.' },
  { sev: 'ojo', titulo: 'APLAUSO AL ASADOR PENDIENTE', lugar: 'PATIO TRASERO · ZONA SUR',
    cuerpo: 'Punto perfecto certificado. El protocolo exige ovación inmediata.' },
  { sev: 'dato', titulo: 'FALTA ENVIDO CANTADO CON 23', lugar: 'CLUB SOCIAL · MESA 4',
    cuerpo: 'Mintió con una confianza admirable. Se evalúa darle la razón.' },
  { sev: 'ojo', titulo: 'CORTE DE LUZ RESUELTO SOLO', lugar: 'GRILLA NACIONAL',
    cuerpo: 'Volvió antes de encontrar la linterna. Nadie sabe qué pasó. Nadie pregunta.' },
  { sev: 'dato', titulo: 'VEREDA REGADA 7:00 AM', lugar: 'BARRIO RESIDENCIAL',
    cuerpo: 'Ritual matutino ejecutado con manguera reglamentaria. Todo en orden.' },
  { sev: 'grave', titulo: 'GRUPO "ASADO SÁBADO" SIN FECHA', lugar: 'WHATSAPP FEDERAL',
    cuerpo: '847 mensajes. Cero confirmaciones. Actividad sospechosamente normal.' },
  { sev: 'ojo', titulo: 'BIZCOCHITOS DE GRASA AGOTADOS', lugar: 'ESTACIÓN DE SERVICIO · RUTA 3',
    cuerpo: 'Quedan de manteca. La fila los mira con respeto pero sin amor.' },
  { sev: 'dato', titulo: 'HELADERA CON SOLO SIFÓN Y MOSTAZA', lugar: 'DEPTO 2 AMBIENTES',
    cuerpo: 'Configuración clásica de fin de mes. Se monitorea con empatía.' },
  { sev: 'ojo', titulo: 'SE DIJO "PICADITA" Y ERA BANQUETE', lugar: 'CASA DE LA TÍA',
    cuerpo: 'Fiambre en tres niveles. Nadie estaba preparado. Nadie se queja.' },
  { sev: 'ojo', titulo: 'SE PRESTÓ LA LAPICERA Y NO VOLVIÓ', lugar: 'OFICINA PÚBLICA · VENTANILLA 3',
    cuerpo: 'La birome tenía la tapita mordida. Valor sentimental incalculable. Búsqueda activa.' },
  { sev: 'dato', titulo: 'FACTURAS COMPRADAS "PARA DESPUÉS"', lugar: 'PANADERÍA LA ESPIGA DE ORO',
    cuerpo: 'Consumidas en el auto antes de llegar. Comportamiento dentro de parámetros.' },
  { sev: 'grave', titulo: 'HIELO PEDIDO A ÚLTIMA HORA', lugar: 'CHINO DE LA ESQUINA',
    cuerpo: 'Sábado 21:47. Situación crítica pero históricamente superada.' },
  { sev: 'ojo', titulo: 'ZAPATILLAS NUEVAS PISADAS', lugar: 'BAILE · PISTA CENTRAL',
    cuerpo: 'El agresor pidió perdón. La víctima dijo "no pasa nada". Pasaba.' },
  { sev: 'dato', titulo: 'PARRILLA VECINA HUMEANDO', lugar: 'BALCONES ALEDAÑOS',
    cuerpo: 'Nadie de este edificio fue invitado. Se monitorea con el corazón roto.' },
  { sev: 'ojo', titulo: '"TRAÉ ALGO DULCE" INTERPRETADO LIBREMENTE', lugar: 'REUNIÓN FAMILIAR',
    cuerpo: 'Llegaron tres budines y ninguna gaseosa. Auditoría en curso.' },
];

/* Precios anclados al tipo de cambio real (~$1.420/USD, jul 2026):
   blue ≈ 1 USD · alfajor triple ≈ 2 USD · equipo de mate ≈ 4 USD ·
   chori ≈ 3,5 USD · mila napo c/papas ≈ 10 USD · fernet bien servido ≈ 5 USD */
const COTIZACIONES = [
  { n: 'DÓLAR BLUE',         v: 1423.50, paso: 6 },
  { n: 'DÓLAR ALFAJOR',      v: 2850.00, paso: 14 },
  { n: 'DÓLAR MATE',         v: 5680.00, paso: 28 },
  { n: 'DÓLAR CHORIPÁN',     v: 4970.00, paso: 25 },
  { n: 'DÓLAR MILA NAPO',    v: 14200.00, paso: 70 },
  { n: 'DÓLAR FERNET 70/30', v: 7100.00, paso: 35 },
];

const GRUPO_SCRIPT = [
  ['El Colo',    '#f6b40e', 'bueno gente, ¿sábado entonces?'],
  ['La Tana',    '#ff6b35', 'yo sábado no puedo, tengo lo de mi vieja'],
  ['Cabezón',    '#75aadb', '¿domingo?'],
  ['El Ruso',    '#7fb069', 'el domingo hay fútbol, ni en pedo'],
  ['Flaquita',   '#e8a0b8', 'el otro finde seguro seguro'],
  ['Tío Carlos', '#b09be8', '🎙 audio (4:32)'],
  ['El Colo',    '#f6b40e', '¿alguien lo escuchó al tío?'],
  ['Cabezón',    '#75aadb', 'no'],
  ['La Tana',    '#ff6b35', 'no'],
  ['El Ruso',    '#7fb069', 'dice que sí a todo, como siempre'],
  ['Flaquita',   '#e8a0b8', 'yo llevo la ensalada 🥗'],
  ['Cabezón',    '#75aadb', 'yo el carbón, posta esta vez'],
  ['El Ruso',    '#7fb069', 'yo llevo el hambre jajaja'],
  ['El Colo',    '#f6b40e', 'dale, entonces ¿quedamos?'],
  ['La Tana',    '#ff6b35', 'quedamos en que vemos'],
  ['Tío Carlos', '#b09be8', '🎙 audio (7:18)'],
  ['El Colo',    '#f6b40e', 'bueno lo definimos en la semana'],
  ['Flaquita',   '#e8a0b8', 'sí sí, en la semana fijo'],
  ['Cabezón',    '#75aadb', '👍'],
  ['El Ruso',    '#7fb069', '👍'],
  ['La Tana',    '#ff6b35', '¿y si mejor pizza?'],
  ['El Colo',    '#f6b40e', 'TANA NO EMPECEMOS DE NUEVO'],
];

/* ═══════════════ ARRANQUE ═══════════════ */

const BOOT_LINEAS = [
  'SIGA·SIGA v1.0 — ENTE AUTÁRQUICO DE LA ARGENTINIDAD',
  'CALENTANDO PAVA ……………………………… 82°C (PELO)',
  'MONTANDO /dev/parrilla ……………… OK (CON DIARIO Y ALAMBRE)',
  'CARGANDO SUBE ………………………………… SALDO NEGATIVO (VIAJA IGUAL)',
  'SINCRONIZANDO HORA ARGENTINA … +20 MIN DE CORTESÍA',
  'BUSCANDO CARBÓN …………………………… HAY (DICE EL COLO)',
  'MÓDULO DE VERGÜENZA ………………… NO INSTALADO',
  'ESCANEANDO 23 JURISDICCIONES … TODAS OPINANDO',
  '',
  '> TODO PIOLA. ARRANCAMOS.',
];

function arrancar(done) {
  const el = $('#bootText');
  const full = BOOT_LINEAS.join('\n') + '\n';
  const CPS = 300; // por reloj de pared — inmune al throttling
  const t0 = performance.now();
  let fin = false;
  (function tic() {
    const n = Math.floor((performance.now() - t0) / 1000 * CPS);
    if (n >= full.length) {
      if (fin) return;
      fin = true;
      el.textContent = full;
      setTimeout(() => { $('#boot').classList.add('off'); document.body.classList.add('listo'); done(); }, 450);
      return;
    }
    el.textContent = full.slice(0, n) + '█';
    setTimeout(tic, 24);
  })();
}

/* ═══════════════ RELOJ + FERIADO ═══════════════ */

function iniciarReloj() {
  const horaEl = $('#hora');
  const feriadoEl = $('#feriado');
  const FERIADO = Date.parse('2026-08-17T00:00:00-03:00'); // Gral. San Martín
  setInterval(() => {
    horaEl.textContent = new Date().toLocaleTimeString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires', hour12: false,
    });
    const dias = Math.ceil((FERIADO - Date.now()) / 864e5);
    feriadoEl.textContent = dias > 0
      ? `FERIADO EN ${dias} DÍAS`
      : 'HABRÁ OTRO FERIADO (SIEMPRE HAY)';
  }, 1000);
}

/* ═══════════════ MOD 01 · VITALES ═══════════════ */

/* Pool de métricas — 7 visibles, van rotando cada unos segundos */
const VITALES = [
  { n: 'TEMPERATURA DEL AGUA', u: '°C', v: 82.4, min: 74, max: 93, paso: 0.9, dec: 1,
    estado: (v) => v < 78 ? 'TIBIA (OJO)' : v <= 87 ? 'PELO' : 'TE QUEMÁS' },
  { n: 'ÍNDICE NACIONAL DE AGUANTE', u: '/100', v: 87, min: 62, max: 99, paso: 2.5, dec: 0 },
  { n: 'CHAMUYO AMBIENTE', u: '%', v: 64, min: 40, max: 96, paso: 4, dec: 0 },
  { n: 'HUMEDAD (SENSACIÓN)', u: '%', v: 89, min: 74, max: 99, paso: 2, dec: 0,
    estado: (v) => v > 92 ? 'PEGAJOSA' : 'SE BANCA' },
  { n: 'STOCK YERBATERO', u: 't', v: 284502, min: 220000, max: 340000, paso: 6000, dec: 0, big: true },
  { n: 'PACIENCIA EN FILA', u: 'min', v: 7.2, min: 3.1, max: 9.5, paso: 0.4, dec: 1, sesgo: -0.02 },
  { n: 'ÁNIMO NACIONAL', enum: ['QUEJOSO PERO FELIZ', 'MODO FINDE', 'NOSTÁLGICO', 'ENFIESTADO', 'ANSIOSO', 'NI AHÍ'], ei: 0 },
  { n: 'PRESIÓN DEL SIFÓN', u: 'kPa', v: 312, min: 280, max: 340, paso: 6, dec: 0 },
  { n: 'SOBREMESA PROMEDIO', u: 'hs', v: 2.8, min: 1.2, max: 4.9, paso: 0.3, dec: 1, sesgo: 0.01 },
  { n: 'BOCINAZOS ACUMULADOS', u: '/h', v: 48210, min: 30000, max: 70000, paso: 2500, dec: 0, big: true },
  { n: 'FACTURAS EN CIRCULACIÓN', u: 'doc/h', v: 1842, min: 900, max: 2600, paso: 120, dec: 0, big: true },
  { n: 'GENTE DICIENDO "YA SALGO"', u: 'miles', v: 312, min: 180, max: 520, paso: 22, dec: 0 },
  { n: 'DEBATE FUTBOLERO', u: '°C', v: 74, min: 40, max: 99, paso: 6, dec: 0,
    estado: (v) => v > 90 ? 'AL ROJO' : v > 65 ? 'CALIENTE' : 'TIBIO' },
  { n: 'RESERVA DE HIELO', u: 'bolsitas', v: 8420, min: 2000, max: 15000, paso: 900, dec: 0, big: true,
    estado: (v) => v < 4000 ? 'CRÍTICO (ES SÁBADO)' : 'OK' },
];

const FEDERAL = [
  ['AMBA', 71], ['CENTRO', 76], ['NOA', 84], ['NEA', 80],
  ['CUYO', 78], ['PATAGONIA', 88], ['CÓRDOBA*', 94],
];

const SLOTS_VIT = 7;
const vitVisibles = Array.from({ length: SLOTS_VIT }, (_, i) => i);
const vitFilas = [];

function iniciarVitales() {
  const wrap = $('#vitales');
  VITALES.forEach((vt) => {
    if (!vt.enum) vt.hist = Array.from({ length: 32 }, () => vt.v + rand(-vt.paso, vt.paso));
  });
  for (let i = 0; i < SLOTS_VIT; i++) {
    const fila = document.createElement('div');
    fila.className = 'vital';
    fila.innerHTML = `<div class="vl"><div class="vnombre"></div>
      <div class="vvalor">—</div></div>
      <span class="vtend">·</span><canvas></canvas>`;
    wrap.appendChild(fila);
    vitFilas.push(fila);
  }

  const barras = $('#federalBars');
  FEDERAL.forEach(([n], i) => {
    const f = document.createElement('div');
    f.className = 'fbar';
    f.innerHTML = `<span class="fn">${n}</span>
      <div class="ftrack"><div class="ffill" id="ff${i}" style="width:0%"></div></div>
      <span class="fv" id="fv${i}">—</span>`;
    barras.appendChild(f);
  });

  actualizarVitales();
  setInterval(actualizarVitales, 2400);
  setInterval(rotarVital, 6200);
  actualizarFederal();
  setInterval(actualizarFederal, 3600);
}

function renderVital(slot, tendencia) {
  const vt = VITALES[vitVisibles[slot]];
  const fila = vitFilas[slot];
  fila.querySelector('.vnombre').textContent = vt.n;
  const val = fila.querySelector('.vvalor');
  const cv = fila.querySelector('canvas');
  const t = fila.querySelector('.vtend');
  if (vt.enum) {
    val.className = 'vvalor enum';
    val.textContent = BARDO ? 'ALTERADO' : vt.enum[vt.ei];
    cv.style.display = 'none';
    t.textContent = '·'; t.className = 'vtend';
    return;
  }
  val.className = 'vvalor';
  const num = vt.big ? Math.round(vt.v).toLocaleString('es-AR') : vt.v.toFixed(vt.dec).replace('.', ',');
  const estado = vt.estado ? `<span class="estado">${vt.estado(vt.v)}</span>` : '';
  val.innerHTML = `${num}<small>${vt.u}</small>${estado}`;
  cv.style.display = '';
  if (tendencia !== undefined) {
    t.textContent = Math.abs(tendencia) < vt.paso * 0.15 ? '·' : tendencia > 0 ? '▲' : '▼';
    t.className = 'vtend ' + (Math.abs(tendencia) < vt.paso * 0.15 ? '' : tendencia > 0 ? 'up' : 'dn');
  }
  dibujarSpark(cv, vt);
}

function actualizarVitales() {
  /* deriva TODO el pool — las métricas ocultas siguen viviendo */
  VITALES.forEach((vt) => {
    if (vt.enum) {
      if (Math.random() < 0.2) vt.ei = (vt.ei + randi(1, vt.enum.length - 1)) % vt.enum.length;
      return;
    }
    vt.prev = vt.v;
    const factor = BARDO ? 3 : 1;
    vt.v = clamp(vt.v + rand(-vt.paso, vt.paso) * factor + (vt.sesgo || 0), vt.min, vt.max);
    vt.hist.push(vt.v); vt.hist.shift();
  });
  for (let s = 0; s < SLOTS_VIT; s++) {
    const vt = VITALES[vitVisibles[s]];
    renderVital(s, vt.enum ? undefined : vt.v - vt.prev);
  }
}

function rotarVital() {
  const libres = VITALES.map((_, i) => i).filter((i) => !vitVisibles.includes(i));
  if (!libres.length) return;
  const slot = randi(0, SLOTS_VIT - 1);
  const nuevo = pick(libres);
  const fila = vitFilas[slot];
  fila.classList.add('cambio');
  setTimeout(() => {
    vitVisibles[slot] = nuevo;
    renderVital(slot);
    requestAnimationFrame(() => fila.classList.remove('cambio'));
  }, 300);
}

function dibujarSpark(c, vt) {
  if (!c) return;
  const dpr = Math.min(devicePixelRatio, 2);
  const w = c.clientWidth || 70, h = c.clientHeight || 23;
  c.width = w * dpr; c.height = h * dpr;
  const x = c.getContext('2d');
  x.scale(dpr, dpr);
  const lo = Math.min(...vt.hist), hi = Math.max(...vt.hist), span = hi - lo || 1;
  x.strokeStyle = 'rgba(246,180,14,.75)';
  x.shadowColor = 'rgba(246,180,14,.55)'; x.shadowBlur = 3;
  x.lineWidth = 1;
  x.beginPath();
  vt.hist.forEach((v, j) => {
    const px = (j / (vt.hist.length - 1)) * w;
    const py = h - 3 - ((v - lo) / span) * (h - 7);
    j ? x.lineTo(px, py) : x.moveTo(px, py);
  });
  x.stroke();
}

function actualizarFederal() {
  FEDERAL.forEach((f, i) => {
    f[1] = clamp(f[1] + rand(-6, 6), 40, 99);
    $(`#ff${i}`).style.width = f[1] + '%';
    $(`#fv${i}`).textContent = Math.round(f[1]);
  });
}

/* ═══════════════ MOD 02 · MAPA ═══════════════ */

function dentroDe(lon, lat, poli) {
  let dentro = false;
  for (let i = 0, j = poli.length - 1; i < poli.length; j = i++) {
    const xi = poli[i][0], yi = poli[i][1], xj = poli[j][0], yj = poli[j][1];
    if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) dentro = !dentro;
  }
  return dentro;
}

/* Región federal de cada punto — misma data que el Termómetro (MOD·01b).
   Índices en FEDERAL: 0 AMBA · 1 CENTRO · 2 NOA · 3 NEA · 4 CUYO ·
   5 PATAGONIA · 6 CÓRDOBA* */
function regionDe(lon, lat) {
  if (lat < -33.5 && lat > -35.8 && lon > -60.2 && lon < -57.0) return 0; // AMBA
  if (lat > -30 && lon < -63.5) return 2;                                 // NOA
  if (lat >= -30.5 && lon >= -63.5) return 3;                             // NEA
  if (lat <= -40) return 5;                                               // PATAGONIA
  if (lat <= -30 && lat > -37.5 && lon < -66.5) return 4;                 // CUYO
  if (lat <= -29 && lat > -35.5 && lon >= -66.5 && lon < -61.5) return 6; // CÓRDOBA*
  return 1;                                                               // CENTRO
}

/* Grilla de puntos de tierra, calculada una vez (con su región). */
const TIERRA = [];
(function construir() {
  const PASO = 0.42;
  for (let lat = -55.4; lat <= -21.6; lat += PASO) {
    for (let lon = -73.6; lon <= -53.4; lon += PASO) {
      if (dentroDe(lon, lat, ARG_CONTINENTAL) || dentroDe(lon, lat, ARG_TDF)
          || ISLAS.some((p) => dentroDe(lon, lat, p))) {
        TIERRA.push([lon, lat, regionDe(lon, lat)]);
      }
    }
  }
})();

/* Corredores troncales — trazado grueso, como el mapa de la terminal */
const RUTAS = [
  { n: 'RN 9 · CORREDOR NORTE', p: [[-58.4,-34.6],[-60.6,-32.9],[-62.1,-32.2],[-64.2,-31.4],[-64.9,-29.4],[-65.2,-26.8],[-65.4,-24.8],[-65.3,-24.2]] },
  { n: 'RN 7 · A CUYO', p: [[-58.4,-34.6],[-60.9,-34.5],[-63.4,-34.1],[-66.3,-33.3],[-68.8,-32.9]] },
  { n: 'RN 3 · ATLÁNTICA', p: [[-58.4,-34.6],[-60.5,-36.5],[-62.3,-38.7],[-64.0,-40.8],[-65.3,-43.3],[-67.5,-45.9],[-67.8,-49.0],[-69.2,-51.6],[-68.3,-54.8]] },
  { n: 'RN 40 · LA CUARENTA', p: [[-65.3,-24.2],[-66.2,-26.5],[-68.5,-29.5],[-69.2,-31.6],[-68.8,-32.9],[-69.8,-34.5],[-70.2,-36.5],[-70.4,-38.9],[-71.3,-41.1],[-71.5,-44.5],[-71.6,-47.5],[-72.1,-50.0],[-69.2,-51.6]] },
  { n: 'RN 2 · A LA COSTA', p: [[-58.4,-34.6],[-57.9,-35.5],[-57.6,-36.6],[-57.5,-38.0]] },
];

const VEHICULOS_TIPOS = [
  'MICRO SEMI-CAMA', 'CAMIÓN DE HACIENDA', 'MOTORHOME DE JUBILADOS',
  'FLETE "EL RAYO"', 'COMBI DE EGRESADOS', 'CISTERNA DE FERNET',
  'REPARTO DE FACTURAS', 'CAMIONETA CON PERRO ATRÁS',
];

/* Sistemas meteorológicos — uno a la vez, cruzando despacio */
const CLIMAS = [
  { n: 'SUDESTADA', desde: [-56.0,-37.5], hasta: [-59.5,-33.8], radio: 2.5, dur: 50,
    log: 'sudestada entrando por el estuario · ropa tendida en riesgo' },
  { n: 'ZONDA', desde: [-70.5,-33.0], hasta: [-66.5,-32.5], radio: 1.6, dur: 45,
    log: 'viento Zonda bajando la cordillera · peinados en emergencia' },
  { n: 'TORMENTA DE SANTA ROSA', desde: [-64.5,-37.5], hasta: [-59.0,-33.5], radio: 2.8, dur: 55,
    log: 'la de Santa Rosa llegó puntual · sorprendió igual, como todos los años' },
  { n: 'NIEBLA MAÑANERA', desde: [-59.5,-33.5], hasta: [-58.0,-34.8], radio: 1.8, dur: 40,
    log: 'niebla cerrada en el litoral · todo el mundo maneja igual' },
  { n: 'VIENTO PATAGÓNICO', desde: [-71.0,-50.0], hasta: [-65.5,-44.0], radio: 3.5, dur: 60,
    log: 'viento patagónico sostenido · boinas aseguradas con doble nudo' },
];

const mapa = { eventos: [], W: 0, H: 0, activa: null, nEventos: 0 };

function iniciarMapa() {
  const wrap = $('#mapaWrap');
  const canvas = $('#mapaCanvas');
  const dpr = Math.min(devicePixelRatio, 2);
  const ctx = canvas.getContext('2d');

  /* proyección: equirectangular con corrección cos(38°), centrada */
  const KX = Math.cos(38 * Math.PI / 180);
  const B = { lonMin: -73.6, lonMax: -53.4, latMin: -55.4, latMax: -21.6 };

  let escala = 1, offX = 0, offY = 0;
  let PTS = []; // tierra proyectada (coords base)
  let proyActual = null;

  /* índices de puntos agrupados por región (una sola vez) */
  const REGION_PTS = Array.from({ length: FEDERAL.length }, () => []);
  TIERRA.forEach((p, i) => REGION_PTS[p[2]].push(i));

  function calcularProyeccion() {
    const spanX = (B.lonMax - B.lonMin) * KX;
    const spanY = B.latMax - B.latMin;
    const m = 14; // margen chico: que la patria ocupe el panel
    escala = Math.min((mapa.W - m * 2) / spanX, (mapa.H - m * 2) / spanY);
    offX = (mapa.W - spanX * escala) / 2;
    offY = (mapa.H - spanY * escala) / 2;
    const proy = (lon, lat) => [
      offX + (lon - B.lonMin) * KX * escala,
      offY + (B.latMax - lat) * escala,
    ];
    proyActual = proy;
    PTS = TIERRA.map(([lon, lat]) => proy(lon, lat));
    CIUDADES.forEach((cd) => { [cd._x, cd._y] = proy(cd.lon, cd.lat); });
    /* rutas a coords de mundo + longitudes acumuladas */
    RUTAS.forEach((rt) => {
      rt._pts = rt.p.map(([lon, lat]) => proy(lon, lat));
      rt._acum = [0];
      for (let i = 1; i < rt._pts.length; i++) {
        rt._acum.push(rt._acum[i - 1] + Math.hypot(
          rt._pts[i][0] - rt._pts[i - 1][0],
          rt._pts[i][1] - rt._pts[i - 1][1]));
      }
      rt._total = rt._acum[rt._acum.length - 1];
    });
  }

  function posEnRuta(rt, s) {
    const a = rt._acum;
    let i = 1;
    while (i < a.length - 1 && a[i] < s) i++;
    const seg = a[i] - a[i - 1] || 1;
    const t = (s - a[i - 1]) / seg;
    const p0 = rt._pts[i - 1], p1 = rt._pts[i];
    return [p0[0] + (p1[0] - p0[0]) * t, p0[1] + (p1[1] - p0[1]) * t];
  }

  /* la flota federal: 2 vehículos por corredor */
  const FLOTA = [];
  function armarFlota() {
    if (FLOTA.length || !RUTAS[0]._total) return;
    RUTAS.forEach((rt) => {
      for (let i = 0; i < 2; i++) {
        FLOTA.push({
          rt, s: rand(0, rt._total), dir: Math.random() < 0.5 ? 1 : -1,
          vel: rand(5, 12), tipo: pickNR(VEHICULOS_TIPOS),
        });
      }
    });
  }

  /* clima: un sistema a la vez */
  let clima = null;
  let proxClima = performance.now() + 12000;

  function redim() {
    mapa.W = wrap.clientWidth; mapa.H = wrap.clientHeight;
    if (!mapa.W) return;
    canvas.width = mapa.W * dpr; canvas.height = mapa.H * dpr;
    calcularProyeccion();
    armarFlota();
  }
  new ResizeObserver(redim).observe(wrap);
  redim();

  /* ── cámara: paneo lento en reposo, zoom suave al evento ── */
  const cam = { z: 1.18, cx: 0, cy: 0 };
  let focoHasta = 0;      // timestamp hasta el cual seguimos enfocando
  let tIdle = rand(0, 100);

  const clampCam = (c) => {
    // que el viewport no se salga del lienzo
    c.cx = clamp(c.cx, mapa.W / (2 * c.z), mapa.W - mapa.W / (2 * c.z));
    c.cy = clamp(c.cy, mapa.H / (2 * c.z), mapa.H - mapa.H / (2 * c.z));
    return c;
  };

  const aPantalla = (x, y) => [
    (x - cam.cx) * cam.z + mapa.W / 2,
    (y - cam.cy) * cam.z + mapa.H / 2,
  ];

  /* click = reporte manual (en coords de mundo) */
  wrap.addEventListener('click', (e) => {
    const r = wrap.getBoundingClientRect();
    const sx = e.clientX - r.left, sy = e.clientY - r.top;
    const wx = (sx - mapa.W / 2) / cam.z + cam.cx;
    const wy = (sy - mapa.H / 2) / cam.z + cam.cy;
    let mejor = null, mejorD = 1e9;
    CIUDADES.forEach((cd) => {
      const d = (cd._x - wx) ** 2 + (cd._y - wy) ** 2;
      if (d < mejorD) { mejorD = d; mejor = cd; }
    });
    if (mejor) dispararEvento(mejor, 'reporte ciudadano: actividad argenta confirmada a ojo');
  });

  mapa.ping = (cd) => {
    mapa.eventos.push({ x: cd._x, y: cd._y, t: 0 });
    mapa.activa = cd;
    mapa.nEventos++;
    focoHasta = performance.now() + 4600;
    $('#hudEventos').textContent = `EVT ${mapa.nEventos}`;
  };

  let prev = performance.now();
  (function cuadro(now) {
    requestAnimationFrame(cuadro);
    const dt = Math.min((now - prev) / 1000, 0.1);
    prev = now;
    if (!mapa.W) return;

    /* ── objetivo de cámara ── */
    tIdle += dt;
    let obj;
    if (mapa.activa && now < focoHasta) {
      obj = clampCam({ z: 2.35, cx: mapa.activa._x, cy: mapa.activa._y });
    } else {
      // paneo perezoso por el territorio, apenas acercado
      obj = clampCam({
        z: 1.22,
        cx: mapa.W / 2 + Math.sin(tIdle * 0.11) * mapa.W * 0.07,
        cy: mapa.H / 2 + Math.cos(tIdle * 0.08) * mapa.H * 0.09,
      });
    }
    const k = 1 - Math.exp(-dt * 2.4); // ease exponencial, suave
    cam.z += (obj.z - cam.z) * k;
    cam.cx += (obj.cx - cam.cx) * k;
    cam.cy += (obj.cy - cam.cy) * k;
    clampCam(cam);

    /* ── dibujo en espacio de mundo (transform de cámara) ── */
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, mapa.W, mapa.H);
    ctx.setTransform(
      dpr * cam.z, 0, 0, dpr * cam.z,
      dpr * (mapa.W / 2 - cam.cx * cam.z),
      dpr * (mapa.H / 2 - cam.cy * cam.z)
    );

    /* tierra: choropleth vivo — brillo por región según Termómetro Federal */
    const d2 = 2.1, r2 = d2 / 2;
    for (let r = 0; r < FEDERAL.length; r++) {
      const alfa = 0.24 + (FEDERAL[r][1] / 100) * 0.5;
      ctx.fillStyle = `rgba(117,170,219,${alfa.toFixed(3)})`;
      const idxs = REGION_PTS[r];
      for (let j = 0; j < idxs.length; j++) {
        const p = PTS[idxs[j]];
        ctx.fillRect(p[0] - r2, p[1] - r2, d2, d2);
      }
    }

    /* corredores troncales */
    ctx.setLineDash([3 / cam.z, 4 / cam.z]);
    ctx.strokeStyle = 'rgba(138,127,114,0.42)';
    ctx.lineWidth = 1 / cam.z;
    RUTAS.forEach((rt) => {
      ctx.beginPath();
      rt._pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
      ctx.stroke();
    });
    ctx.setLineDash([]);

    /* la flota federal circulando */
    ctx.fillStyle = 'rgba(127,176,105,0.95)';
    FLOTA.forEach((v) => {
      v.s += v.vel * v.dir * dt * (BARDO ? 2.5 : 1);
      if (v.s <= 0) { v.s = 0; v.dir = 1; }
      if (v.s >= v.rt._total) { v.s = v.rt._total; v.dir = -1; }
      const [x, y] = posEnRuta(v.rt, v.s);
      v._x = x; v._y = y;
      ctx.fillRect(x - 1.3, y - 1.3, 2.6, 2.6);
    });

    /* ciudades */
    ctx.fillStyle = 'rgba(246,180,14,0.9)';
    CIUDADES.forEach((cd) => {
      ctx.beginPath(); ctx.arc(cd._x, cd._y, 2.1, 0, 6.28); ctx.fill();
    });

    /* sistema meteorológico itinerante */
    if (!clima && now > proxClima) {
      const def = pickNR(CLIMAS);
      clima = { def, t: 0 };
      $('#hudClima').textContent = `CLIMA: ${def.n}`;
      registrar('ojo', `SMN criollo: ${def.log}`);
    }
    if (clima) {
      clima.t += dt;
      const def = clima.def;
      if (clima.t >= def.dur) {
        clima = null;
        proxClima = now + rand(18000, 38000);
        $('#hudClima').textContent = 'CLIMA: DESPEJADO';
      } else {
        const kk = clima.t / def.dur;
        const lon = def.desde[0] + (def.hasta[0] - def.desde[0]) * kk;
        const lat = def.desde[1] + (def.hasta[1] - def.desde[1]) * kk;
        const [wx, wy] = proyActual(lon, lat);
        clima._wx = wx; clima._wy = wy;
        const R = def.radio * escala;
        const fade = Math.min(1, kk * 6, (1 - kk) * 6); // entra y sale suave
        const g = ctx.createRadialGradient(wx, wy, R * 0.12, wx, wy, R);
        g.addColorStop(0, `rgba(168,203,233,${0.2 * fade})`);
        g.addColorStop(1, 'rgba(168,203,233,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(wx, wy, R, 0, 6.28); ctx.fill();
        ctx.setLineDash([4 / cam.z, 5 / cam.z]);
        ctx.strokeStyle = `rgba(168,203,233,${0.4 * fade})`;
        ctx.lineWidth = 1 / cam.z;
        ctx.beginPath(); ctx.arc(wx, wy, R, 0, 6.28); ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    /* pings (en mundo) */
    for (let i = mapa.eventos.length - 1; i >= 0; i--) {
      const e = mapa.eventos[i];
      e.t += dt;
      const kk = e.t / 1.9;
      ctx.strokeStyle = `rgba(255,107,53,${0.9 * (1 - kk)})`;
      ctx.lineWidth = 1.6 / cam.z;
      ctx.beginPath(); ctx.arc(e.x, e.y, kk * 26, 0, 6.28); ctx.stroke();
      if (kk < 0.4) {
        ctx.fillStyle = `rgba(246,180,14,${1 - kk * 2.5})`;
        ctx.beginPath(); ctx.arc(e.x, e.y, 3.5, 0, 6.28); ctx.fill();
      }
      if (kk >= 1) mapa.eventos.splice(i, 1);
    }

    /* ── capa de pantalla: mira y etiquetas nítidas ── */
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (mapa.activa) {
      const [ax, ay] = aPantalla(mapa.activa._x, mapa.activa._y);
      const s = 9;
      ctx.strokeStyle = 'rgba(246,180,14,0.7)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(ax - s, ay); ctx.lineTo(ax - 4, ay);
      ctx.moveTo(ax + 4, ay); ctx.lineTo(ax + s, ay);
      ctx.moveTo(ax, ay - s); ctx.lineTo(ax, ay - 4);
      ctx.moveTo(ax, ay + 4); ctx.lineTo(ax, ay + s);
      ctx.stroke();
      if (ay < mapa.H - 42) { // no pisar el caption de abajo
        ctx.font = '700 12px "Chivo Mono"';
        ctx.fillStyle = 'rgba(246,180,14,0.95)';
        ctx.textAlign = ax > mapa.W / 2 ? 'right' : 'left';
        ctx.fillText(mapa.activa.n, ax + (ax > mapa.W / 2 ? -13 : 13), ay - 8);
      }
    }

    /* etiquetas de ciudades cercanas cuando hay zoom */
    if (cam.z > 1.55) {
      const alfa = clamp((cam.z - 1.55) / 0.6, 0, 0.75);
      ctx.font = '10px "Chivo Mono"';
      ctx.fillStyle = `rgba(168,203,233,${alfa})`;
      CIUDADES.forEach((cd) => {
        if (cd === mapa.activa) return;
        const [sx, sy] = aPantalla(cd._x, cd._y);
        if (sx < 14 || sx > mapa.W - 14 || sy < 14 || sy > mapa.H - 42) return;
        ctx.textAlign = sx > mapa.W / 2 ? 'right' : 'left';
        ctx.fillText(cd.n, sx + (sx > mapa.W / 2 ? -9 : 9), sy + 3);
      });
      /* la flota, identificada de cerca */
      const alfaF = clamp((cam.z - 1.7) / 0.5, 0, 0.7);
      if (alfaF > 0.05) {
        ctx.font = '9px "Chivo Mono"';
        ctx.fillStyle = `rgba(127,176,105,${alfaF})`;
        FLOTA.forEach((v) => {
          const [sx, sy] = aPantalla(v._x, v._y);
          if (sx < 14 || sx > mapa.W - 14 || sy < 14 || sy > mapa.H - 42) return;
          ctx.textAlign = 'left';
          ctx.fillText(v.tipo, sx + 7, sy - 5);
        });
      }
    }

    /* etiqueta del sistema meteorológico */
    if (clima && clima._wx !== undefined) {
      const [sx, sy] = aPantalla(clima._wx, clima._wy);
      if (sx > 20 && sx < mapa.W - 20 && sy > 24 && sy < mapa.H - 46) {
        ctx.font = '700 11px "Chivo Mono"';
        ctx.fillStyle = 'rgba(168,203,233,0.85)';
        ctx.textAlign = 'center';
        ctx.fillText(`◌ ${clima.def.n}`, sx, sy - clima.def.radio * escala * cam.z - 7);
      }
    }
  })(prev);
}

function dispararEvento(ciudad, descForzada) {
  const cd = ciudad || pick(CIUDADES);
  const desc = descForzada || pickNR(EVENTOS_MAPA);
  if (!cd._x) return;
  mapa.ping(cd);
  const n = new Date();
  $('.mc-hora').textContent = n.toLocaleTimeString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', hour12: false });
  $('.mc-lugar').textContent = cd.n;
  $('.mc-desc').textContent = desc;
  registrar('evt', `${cd.n} · ${desc}`);
  ondaSpike(randi(0, 2), rand(0.5, 1));
}

/* ═══════════════ MOD 03 · ONDAS ═══════════════ */

const ondas = [];

function iniciarOndas() {
  $$('.onda canvas').forEach((c, i) => {
    ondas.push({
      c, x: null, t: rand(0, 100),
      f1: rand(0.9, 1.7), f2: rand(2.4, 4.2), f3: rand(6, 11),
      amp: rand(0.5, 0.8), spike: 0,
      valEl: $(`#ov${i}`),
      unidad: ['dB', 'che/min', 'mangos/m²'][i],
    });
  });

  const redim = () => ondas.forEach((s) => {
    const dpr = Math.min(devicePixelRatio, 2);
    s.w = s.c.clientWidth; s.h = s.c.clientHeight;
    s.c.width = s.w * dpr; s.c.height = s.h * dpr;
    s.x = s.c.getContext('2d');
    s.x.setTransform(dpr, 0, 0, dpr, 0, 0);
    s.x.fillStyle = '#191614';
    s.x.fillRect(0, 0, s.w, s.h);
  });
  addEventListener('resize', redim);
  setTimeout(redim, 50);

  let prev = performance.now();
  (function cuadro(now) {
    requestAnimationFrame(cuadro);
    const dt = Math.min((now - prev) / 1000, 0.1);
    prev = now;
    ondas.forEach((s) => {
      if (!s.x || !s.w) return;
      s.t += dt * (BARDO ? 4 : 1.6);
      s.spike = Math.max(0, s.spike - dt * 0.5);

      s.x.fillStyle = 'rgba(25,22,20,.16)';
      s.x.fillRect(0, 0, s.w, s.h);

      s.x.strokeStyle = 'rgba(46,40,35,.55)';
      s.x.lineWidth = 1;
      s.x.beginPath();
      for (let gx = 0; gx < s.w; gx += 26) { s.x.moveTo(gx, 0); s.x.lineTo(gx, s.h); }
      for (let gy = 0; gy < s.h; gy += 26) { s.x.moveTo(0, gy); s.x.lineTo(s.w, gy); }
      s.x.stroke();

      const mid = s.h * 0.58, A = (s.h * 0.24) * (s.amp + s.spike * 1.6 + (BARDO ? 0.7 : 0));
      s.x.strokeStyle = '#75aadb';
      s.x.shadowColor = 'rgba(117,170,219,.8)';
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

  setInterval(() => ondas.forEach((s) => {
    s.valEl.textContent = `${pesos(s.amp * 40 + s.spike * 60 + rand(-2, 2) + (BARDO ? 55 : 0), 1)} ${s.unidad}`;
  }), 900);
}

function ondaSpike(i, amt) { if (ondas[i]) ondas[i].spike = Math.min(1.4, ondas[i].spike + amt); }

/* ═══════════════ MOD 04 · ALERTAS ═══════════════ */

let alertaSeq = 0;

function crearAlerta(forzar) {
  const lista = $('#alertas');
  if (!forzar && lista.querySelectorAll('.alerta').length >= 4) return;
  $('.al-vacio')?.remove();

  const a = pickNR(ALERTAS);
  const id = ++alertaSeq;
  const el = document.createElement('div');
  el.className = 'alerta';
  el.innerHTML = `
    <div class="al-top">
      <span class="al-sev ${a.sev}">${a.sev === 'grave' ? 'GRAVE' : a.sev === 'ojo' ? 'OJO' : 'DATO'}</span>
      <span class="al-titulo">${a.titulo}</span>
    </div>
    <div class="al-lugar">${a.lugar} · EXP. N° ${String(7000 + id)}/26</div>
    <div class="al-cuerpo">${a.cuerpo}</div>
    <div class="al-acciones">
      <button class="atender">ATENDER</button>
      <button class="manana">MAÑANA</button>
    </div>
    <div class="al-conteo" style="width:100%"></div>`;
  lista.prepend(el);
  registrar('ojo', `${a.titulo} · ${a.lugar}`);

  let vida = randi(24, 40);
  const barra = el.querySelector('.al-conteo');
  const iv = setInterval(() => {
    vida--;
    barra.style.width = clamp(vida / 40 * 100, 0, 100) + '%';
    if (vida <= 0) { clearInterval(iv); sellar('SE RESOLVIÓ SOLO · COMO SIEMPRE'); }
  }, 1000);

  function sellar(sello) {
    clearInterval(iv);
    el.querySelector('.al-acciones').outerHTML = `<div class="al-sello">✓ ${sello}</div>`;
    barra.remove();
    setTimeout(() => {
      el.classList.add('chau');
      setTimeout(() => { el.remove(); alertasVacias(); }, 500);
    }, 2600);
  }

  el.querySelector('.atender').onclick = () => { sellar('ATENDIDO · SE HIZO LO QUE SE PUDO'); registrar('sys', `exp. ${7000 + id}/26 atendido · atado con alambre`); };
  el.querySelector('.manana').onclick = () => { sellar('PATEADO PARA MAÑANA (FECHA ESTIMADA: NUNCA)'); registrar('sys', `exp. ${7000 + id}/26 pateado · clásico`); };
  el._sellar = sellar;
}

function alertasVacias() {
  const lista = $('#alertas');
  if (!lista.querySelector('.alerta')) {
    lista.innerHTML = `<div class="al-vacio">NO HAY ALERTAS.<br>DESCONFIE.<br>ALGO SE ESTÁ POR ROMPER.</div>`;
  }
}

function iniciarAlertas() {
  alertasVacias();
  setTimeout(() => crearAlerta(), 3000);
  setInterval(() => { if (Math.random() < 0.75) crearAlerta(); }, 9500);
  $('#todoBien').onclick = () => {
    $$('#alertas .alerta').forEach((el) => el._sellar && el._sellar('TODO BIEN · NO PASA NADA · SIGA SIGA'));
    registrar('sys', 'todas las alertas cerradas de un saque · eficiencia criolla');
  };
}

/* ═══════════════ MOD 05 · COTIZACIONES ═══════════════ */

function iniciarCotiz() {
  const wrap = $('#cotiz');
  COTIZACIONES.forEach((c, i) => {
    const fila = document.createElement('div');
    fila.className = 'crow';
    fila.innerHTML = `<span class="cn">${c.n}</span>
      <span class="cv" id="cv${i}">—</span>
      <span class="cd" id="cd${i}">—</span>`;
    wrap.appendChild(fila);
  });

  function actualizar() {
    COTIZACIONES.forEach((c, i) => {
      const delta = rand(-c.paso, c.paso * 1.15) * (BARDO ? 3 : 1); // sesgo alcista, obvio
      c.v = Math.max(10, c.v + delta);
      $(`#cv${i}`).textContent = c.pts ? `${Math.round(c.v).toLocaleString('es-AR')} pts` : `$ ${pesos(c.v)}`;
      const d = $(`#cd${i}`);
      d.textContent = `${delta >= 0 ? '▲' : '▼'} ${pesos(Math.abs(delta), 1)}`;
      d.className = 'cd ' + (delta >= 0 ? 'up' : 'dn');
    });
    $('#brecha').textContent = `${pesos(rand(72, 96), 1)}%`;
  }
  actualizar();
  setInterval(actualizar, 3000);
}

/* ═══════════════ MOD 06 · REGISTRO ═══════════════ */

function registrar(tag, msj) {
  const reg = $('#registro');
  if (!reg) return;
  const t = new Date().toLocaleTimeString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', hour12: false });
  const el = document.createElement('div');
  el.className = 'reg-linea' + (tag === 'chk' ? ' dim' : '');
  const label = { chk: 'CHK', evt: 'EVT', ojo: 'OJO', sys: 'SYS' }[tag];
  el.innerHTML = `<span class="rt">${t}</span><span class="tag ${tag}">${label}</span><span class="msj">${msj}</span>`;
  reg.appendChild(el);
  while (reg.children.length > 80) reg.firstChild.remove();
  reg.scrollTop = reg.scrollHeight;
}

function iniciarRegistro() {
  registrar('sys', 'monitoreo de la argentinidad iniciado · alcance: todo, más o menos');
  (function loop() {
    const r = Math.random();
    if (r < 0.55) registrar('chk', pickNR(REG_CHK));
    else registrar('evt', pickNR(REG_EVT));
    setTimeout(loop, BARDO ? rand(120, 300) : rand(1000, 2400));
  })();
}

/* ═══════════════ MOD 07 · GRUPO DEL ASADO ═══════════════ */

function iniciarGrupo() {
  const box = $('#grupo');
  const escribiendo = $('#escribiendo');
  let idx = 0;

  function siguiente() {
    const [quien, color, texto] = GRUPO_SCRIPT[idx];
    idx = (idx + 1) % GRUPO_SCRIPT.length;

    escribiendo.textContent = `${quien} está escribiendo`;
    escribiendo.classList.add('activo');

    setTimeout(() => {
      escribiendo.textContent = ' ';
      const t = new Date().toLocaleTimeString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', hour: '2-digit', minute: '2-digit', hour12: false });
      const el = document.createElement('div');
      el.className = 'msg';
      const cuerpo = texto.startsWith('🎙')
        ? `<span class="audio">${texto} · sin escuchar</span>`
        : texto;
      el.innerHTML = `<div class="quien" style="color:${color}">${quien}</div>
        <div class="texto">${cuerpo}</div>
        <div class="hora-msg">${t}</div>`;
      box.appendChild(el);
      while (box.children.length > 26) box.firstChild.remove();
      box.scrollTop = box.scrollHeight;
      if (idx === 0) registrar('evt', 'grupo del asado completó otro ciclo sin fecha · récord vigente');
      setTimeout(siguiente, rand(2400, 5200));
    }, rand(1200, 2600));
  }
  setTimeout(siguiente, 1600);
}

/* ═══════════════ BARDO ═══════════════ */

function iniciarBardo() {
  const btn = $('#bardoBtn');
  let enfriando = false;
  btn.onclick = () => {
    if (enfriando) return;
    enfriando = true;
    BARDO = true;
    btn.classList.add('armado');
    document.body.classList.add('bardo');
    $('#luzVibra').className = 'luz err';
    registrar('ojo', 'SE ARMÓ EL BARDO · magnitud: considerable');
    ondaSpike(0, 1.4); ondaSpike(1, 1.4); ondaSpike(2, 1.4);
    for (let i = 0; i < 5; i++) setTimeout(() => dispararEvento(), i * 350);
    crearAlerta(true);
    setTimeout(() => registrar('ojo', 'nivel de griterío al 340% · todos opinan a la vez'), 1200);
    setTimeout(() => registrar('sys', 'evaluando situación … la situación es la de siempre'), 2600);
    setTimeout(() => {
      BARDO = false;
      document.body.classList.remove('bardo');
      btn.classList.remove('armado');
      $('#luzVibra').className = 'luz warn';
      registrar('sys', 'YA FUE · TODO TRANQUI · SIGA SIGA');
    }, 4400);
    setTimeout(() => { enfriando = false; }, 6200);
  };
}

/* ═══════════════ IGNICIÓN ═══════════════ */

arrancar(() => {
  iniciarReloj();
  iniciarVitales();
  iniciarMapa();
  iniciarOndas();
  iniciarAlertas();
  iniciarCotiz();
  iniciarRegistro();
  iniciarGrupo();
  iniciarBardo();
  setTimeout(() => dispararEvento(), 1800);
  setInterval(() => { if (!BARDO) dispararEvento(); }, 7000);
});
