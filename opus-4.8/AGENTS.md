# PLENUM · Standing Committee on Planetary Compliance

**Modelo:** Opus 4.8 (Claude)
**Directorio:** `opus-4.8/`
**Stack:** Vanilla HTML + CSS + JavaScript. **Cero librerías** — el mapa-mundi, los gauges, el radar de barrido y todos los gráficos son canvas 2D hand-rolled. Ni Three.js ni Chart.js.
**Vista previa:** Abrir `index.html` (solo los CDN de Google Fonts requieren conexión).

---

## 1. Concepto — "un poco más político"

El brief pedía la misma línea placebo pero **más político**, con un mapa y
"factos semi-absurdos pero como de control, mezclado con data técnica".

**PLENUM** es un cuerpo deliberativo mundial ficticio — una sesión plenaria
permanente — que monitorea el *cumplimiento global* de tratados que regulan
minucias de la vida cotidiana: small talk, puntualidad, reservas de biscuits,
el uso de la palabra "synergy". Tiene toda la maquinaria de un organismo
internacional de control: resoluciones con votación en vivo, vetos, quórum,
sanciones, directivas, delegaciones numeradas y cables diplomáticos
interceptados.

### La línea roja (heredada del lineamiento de Kimi)

> *sátira corporativa/distópica sobre vigilancia y burocracia — NUNCA sátira
> política/partidaria.*

Concretamente, para ser "político" sin ser incorrecto en temas sensibles:
- La sátira apunta a **la burocracia, el consenso y el control**, no a
  partidos, líderes ni ideologías reales.
- Las ciudades reales (Geneva, Nairobi, Brasília, Astana…) se usan **solo como
  coordenadas neutrales** de "delegaciones" numeradas. Nunca se les atribuye
  nada real ni negativo.
- La jurisdicción regulada es 100% inventada e inocua (coffee breaks, paraguas,
  silencios incómodos). Cero conflictos armados, disputas territoriales,
  fronteras en litigio, o temas humanitarios reales.

## 2. Estética — situation room / atlas clasificado

Deliberadamente distinta de las dos versiones previas (Kimi = SaaS warm-cream;
Fable = terminal CRT ámbar/verde). PLENUM es **azul noche institucional**:

- **Paleta:** fondo `#090e18`, paneles azul-pizarra, texto azul-blanco frío.
  Acentos: **dorado institucional** `#d9a441` (sellos, branding, arcos), **rojo
  de veto/flash** `#e6425e`, **azul HUD** `#4d9dff` (uplinks, data técnica),
  **verde de cumplimiento** `#4fb477`. Sin cyan/magenta.
- **Tipografía:** Zilla Slab (slab serif — tono legal/tratado, para branding y
  títulos de resoluciones) + Spline Sans Mono (todo lo técnico/HUD, en
  mayúsculas con tracking).
- **Textura:** grano de film sutil, graticule cartográfico sobre el mapa,
  marcas de esquina "TS//PLENUM//NOFORN", sello con anillo pulsante.

## 3. El mapa-mundi (SEC·B) — lo técnicamente distintivo

Un **dot-matrix world map hecho a mano, sin assets ni datos externos**:

1. Contornos de continentes definidos como ~17 polígonos toscos `[lon,lat]`
   (Norteamérica, Sudamérica, Europa, UK, África, Madagascar, Asia, Japón,
   Indonesia por islas, Australia, NZ, Groenlandia, Islandia). Antártida = casco
   por `lat < -63`.
2. **Point-in-polygon** (ray casting) sobre una grilla de 2° → array de puntos
   de tierra, cada uno con su región.
3. Los dots se **colorean por Compliance Index** (choropleth): verde alto →
   azul → ámbar → rojo bajo. El basemap se recolorea cada ~5s a medida que el
   cumplimiento deriva.
4. Encima: barrido de longitudes (scan line), 16 nodos-delegación, arcos de
   "uplink seguro" con paquetes viajando por curva Bézier, pings de eventos con
   crosshair, y un readout inferior con coords/SIGINT/MHz reales del nodo.

El basemap se rasteriza una vez a un canvas offscreen y se hace `drawImage` cada
frame (performance); la capa dinámica se dibuja arriba.

## 4. Módulos

| Módulo | Qué es |
|---|---|
| SEC·A Global Indices | 4 gauges de aguja canvas: Awkwardness Posture (/5, invertido), Small-Talk Reserve, Patience Index, Consensus Integrity |
| SEC·A2 Compliance Ledger | Barras de cumplimiento por 7 regiones ficticias (Northern Sector, Atlantic Rim, Polar Annex…) |
| SEC·B Surveillance Plot | El mapa (ver §3) |
| SEC·C Standing Resolutions | Resoluciones con votación FOR/AGST/ABS en vivo, resuelven a ADOPTED/VETOED/TABLED. Botón "RATIFY ALL" |
| SEC·C2 Active Directives | Sanciones/directivas con countdown ("levy on excessive punctuality", "suspension of the word synergy") |
| SEC·D Intercepted Cables | Feed télex diplomático: FROM/TO delegación, flash/routine, SIGINT %, MHz, GEOSAT, protocolo + cuerpo absurdo |
| Ticker "PLENUM WIRE" | Cinta inferior estilo Bloomberg de indicadores absurdos |

### Data técnica mezclada (el pedido explícito)

Cada evento/cable lleva: coordenadas lat/lon, confianza SIGINT %, frecuencia
MHz, ID de satélite (GEOSAT-1..7), protocolo (PLX-n), hash de cable (0x….),
timestamp UTC. La mezcla "burocracia absurda + jerga SIGINT" es el motor del
chiste.

### MOTION TO ADJOURN (el botón dramático)

Equivalente político del PANIC de Fable. Dispara: banner rojo que rota mensajes
("THE CHAIR HAS LOST CONTROL OF THE ROOM" → "DELEGATES SHOUTING PROCEDURALLY" →
"SOMEONE HAS INVOKED RULE 40(b)"), tremor de toda la interfaz, gauges y cables
acelerados, posture global a FRACTIOUS. A los 4.4s: "ORDER RESTORED — SESSION
RESUMES — NOTHING WAS DECIDED".

## 5. Reglas heredadas que se respetan

1. Nada de `alert()` nativo.
2. Todo cabe en una pantalla desktop (grid `100vh`); fallback apilado < 1180px.
3. Sin paleta IA genérica (cyan/magenta prohibidos).
4. Cero `localStorage`.
5. Serio + absurdo indistinguibles a primera vista.
6. Todo botón visible (RATIFY ALL, MOTION TO ADJOURN) hace algo real.
7. Anti-repetición (`pickNR`) en los pools de contenido para que no salgan dos
   resoluciones/cables idénticos seguidos — detalle de realismo.

*Opus 4.8 · Jul 2026*
