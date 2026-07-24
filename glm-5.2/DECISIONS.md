# DECISIONS.md — LANTERN WATCH (glm-5.2)

## 1. Mezcla de tonos

Elegí **sci-fi + NOC/SRE + sátira burocrática**, en proporción ~40/40/20.

- **Sci-fi (40%)**: el "objeto" monitoreado no es infraestructura sino *deriva de fase* —
  señales anómalas detectadas por una red de "vigías" (posts) repartidos por sectores.
  Hay contención, aislamientos pre-autorizados, recalls, treaty-clocks, bandas ζ/M2/Ω.
- **NOC/SRE (40%)**: SLAs, ventanas, watchdogs, autopruebas `0x…`, latidos, sparklines,
  contadores abiertos/cerrados, rate `ev/s`, etc. La jerga operacional está íntegra: ACK,
  ESC, MUTE, RECALL, sweeps, holds de stream, fleet metrics.
- **Sátira burocrática (20%)**: un organigrama ficticio — *Pan-Rimliner Contingency
  Office*, *Comité Hemisférico*, *Subcomité Distribución*, *Rim-Y Pleno* — produce
  advisories "Tier-D" al pleno, registros de "asentimiento tácito", "silencio
  diplomático supera mandato provisional", inasistencias de comité que bajan el cuórum.
  La institución responde con formularios mientras el cielo se cae.

La proporción importa: el registro SRE ancla el dashboard en lo "serio de verdad", la
capa sci-fi le da narrativa (algo *está* pasando, no es solo un sistema), y la capa
burocrática introduce la incomodidad cómica — los redactan protocolos mientras la deriva
estalla. La gracia es que el texto técnico y el absurdo sean indistinguibles a primera vista
("Subcomité advierte inasistencia de Comité Hemisférico; cuórum bajo umbral hasta 04:22"
se lee como un severidad media perfecta).

## 2. El universo monitoreado

**LANTERN WATCH** es la Consola Tier-III del *Pan-Rimliner Contingency Office (PRCO)*,
una oficina inter-estatal que vigila la **deriva de fase** — un fenómeno desconocido
oficialmente catalogado como *"eventos cripto-periódicos atmosféricos transitorios"*.

La red se compone de:

- **~320 vigías** (posts) repartidos por 5 *sectores* (Kálmán, Rivet, Hjem, Oones, Ios),
  con prefijos IGC/IEX/LCO/NSX/RHV/KST.
- Una maquinaria de **comités** (Hemisférico, Distribución, Mantenimiento, etc.) que
  baja advisories "Tier-D" y opera un *treaty-clock* con umbral 85%.
- Un operador visible en sesión: *H. Ravenholt · Lt.Cdr-iii*.

Lo que se monitorea combina tres cosas a la vez, lo cual es lo que lo hace sentir
real: telemetría técnica (Hz, dB, kWh/km², latidos), estados de contención (integridad
%, aislamientos, recalls) y eventos institucionales (cuórum, advisories, ratificaciones).

## 3. Tipos de eventos y ritmo

**5 severidades** (no es RGB puro: el rojo es raro a propósito):
`INFO · NOTICE · WARN · DEGR · CRIT`

Cada severidad tiene ~10 templates con placeholders (`{node}`, `{com}`, `{band}`,
`{rid}`, `{hex}`, `{p}%`, `{k}s`, …) que se llenan al azar → cientos de variantes
combinatorias. Los *eventos de resolución* y los *advisories* tienen templates propios.

Más importante que la cantidad de templates es que **las entradas no son ruido
desconectado**: hay *folios* (incidentes) con un ciclo de vida determinista:

```
detection (WARN) → degradation (DEGR) → breach (CRIT)
                → isolation (WARN) → recover (NOTICE) → close (NOTICE)
```

Cada folio vive 30–40 s y arrastra KPIs (la integridad cae en breach, la deriva
sube, el treaty-clock se presiona). El operador puede **forzar el recall** desde
el panel derecho y cortocircuitar el ciclo a partir de "isolation".

**El ritmo es el punto clave** y se gobierna con un **ciclo de fases de 5 estados**
(duración 18–42 s cada uno):

| Fase             | Id.Severity-prob                         | Rate (ev/s) |
|------------------|------------------------------------------|-------------|
| STEADY           | mayormente INFO/NOTICE                   | 0.3–0.6     |
| READINESS/CONCERN| sube WARN, ocasional folio               | 0.4–0.9     |
| BREACH           | ráfagas DEGR+CRIT, bundles de 2–3 eventos| 0.8–1.9     |
| RECOVERY         | Notices de resolución                     | 0.5–1.1     |
| STABILIZED       | calma post-crisis                         | 0.4–0.7     |

Transiciones: STEADY→CONCERN (60%) o STABILIZED (40%); CONCERN→BREACH (80%) o STEADY;
BREACH→RECOVERY; RECOVERY→STABILIZED (70%) o CONCERN; STABILIZED→STEADY.

Esto produce ciclos de *calma → tensión → caos genuino → descongestión → calma*
que no se sienten en loop: las duraciones son aleatorias, los `nBurst` durante BREACH
esparza 2–3 eventos simultáneos, y la mezcla 60% telemetría / 40% avance-de-folios
genera una **narrativa** que va y vuelve, no una secuencia repetida.

## 4. Acciones reales (todos hacen algo)

- **ACK** en una entrada del feed: marca el folio firmado, tostada de confirmación
  ("asentimiento tácito registrado"), botón se desactiva, contador sube.
- **ESC**: sube la severidad (INFO→NOTICE→…→CRIT, máx. 2 escalados por evento),
  repinta el chip con animación GSAP. Si llega a CRIT, **abre un folio activo**
  en el panel derecho — el operador puede desatar un incidente a mano.
- **MUTE**: silencia visualmente el evento, lo atenúa, botonera se quita.
- **RECALL** en un folio activo (panel derecho): emite un Advisory Tier-D al pleno,
  acelera la resolución del incidente (salta a la stage de isolation → recovery),
  sube el `stAdviso`, decrece `closedTotal` cuando se cierra — etc.
- Filtros del feed (CRIT / WARN+ / RES / INFO / ALL): filtran con `applyFilter`
  usando fade-out + `display:none` con onComplete — no son puramente cosméticos.
- Acciones rápidas (`Emitir Advisory Tier-D`, `Mantener Stream`, `Forzar Sync Sweep`):
  emiten eventos, frenan temporalmente el stream, regulan KPIs (drift ↓, integridad ↑),
  spawn de folios notice. El botón HOLD es toogle persistente (cambia de fase "active").

## 5. Stack y decisiones técnicas

- **Standalone**: un solo `index.html`. CDNs: GSAP + Google Fonts (Space Grotesk +
  JetBrains Mono). Nada backend, ningún `fetch`/`WebSocket` (verificado con grep).
- **Sin frameworks**: Vanilla JS + CSS Grid. No Tailwind, no React. Densidad
  tipográfica FULL: base 11–12px mono, paddings 6–11px. Pensado para caber en
  1280×800 sin scroll y escalar bien hasta 1920×1080.
- **Layout**: CSS Grid 3×3 — `grid-template-columns: 294px 1fr 332px` y
  `grid-template-rows: 50px 1fr 40px`. Capacidad del feed se calcula en runtime a
  partir de `window.innerHeight` (`state.feedCap`), con `min 6 · max 14`. La
  columna izquierda son 4 KPIs equilibradas + panel de contadores abiertos; la
  derecha lleva stage-card, spectrum, folios activos y quick-actions.
- **Animaciones**: GSAP para todas las transiciones que importan (entradas del feed
  con `fromTo(-Y/-opacity/scale`), tweens de KPI counters con `snap`, width de
  barras con `overwrite:'auto'`, entradas de folios con `fromTo(X`, toasts con
  `fromTo`). Para el espectro y el ticker uso `requestAnimationFrame` en canvas
  (rAF es lo correcto para loops continuos — GSAP para transiciones discretas).
- **Estado interno**: un solo `state` (events, incidents, kpis, phaseIdx, etc.) +
  modelos derivados (KPIs se mueven hacia `target` con ruido procedural; el phase engine
  deriva los KPIs en cada stage de folio). Un solo `setInterval(heartbeat, 280)` decide
  próxima emisión vs. avance de folio; `setInterval(sampleKpis, 1200)` repinta
  KPIs, sparklines, stream rate.
- **Smoke testing**: código verificado en `jsdom` con stub de GSAP (incluyendo
  `onUpdate`-tweens, `onComplete`-tweens) y canvas stub; corrí simulaciones de
  ~5 min de wall-clock y entré en las 5 fases, 10 transiciones, folios cerrados
  automáticamente, sin errores en consola.

## 6. La decisión que distingue esta versión

La elección que considero más decisiva —y más propia— es **el motor de "folios" con
ciclo de vida determinista atado a las KPIs y a las fases**. Casi cualquier dashboard
que se precie produce eventosIndependientes al azar; aquí cada CRIT no es una línea
suelta sino el punto medio de una historia que ya empezó con dos entradas WARN/DEGR y
que va a terminar con dos entradas NOTICE, mientras empuja simultáneamente la
integridad abajo, el drift arriba y el treaty-clock — y deja consecuencias visibles
en las sparklines y en los contadores cuando se cierra.

La segunda decisión propietaria es **el "operador-presionado"**: un CRIT que ESCalaste
a mano abre un folio activo, y un RECALL manual cortocircuita el ciclo. Combinado con
el ciclo de fases, esto significa que en cualquier momento el dashboard puede tener
su propio desbordamiento Independiente de la cadencia natural — el operador es un
agente en la simulación, no un observador.

Una tercera decisión estética, más sutil: la paleta no es la default "dark dashboard
azul-violeta", sino **azul carbón profundo + ámbar/dorado de marca**, con scanlines
CRT sobrepuestas (un `body::before` con `mix-blend-mode:multiply`). Eso, sumado al
"la L estilizada en dorado" como logotipo del producto y al uso deliberado de `var(--brand)` en cada
borde izquierdo de panel, busca la estética de "sala de operaciones en un sótano del
Estado" — agencia seria, infraestructura anticuada pero cuidada, sin concesiones a
la estética "SaaS 2024-azulita".

— fin —