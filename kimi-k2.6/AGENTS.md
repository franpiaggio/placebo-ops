# PULSE // Operations Center

**Directorio:** `/Users/franciscopiaggio/localwork/nonsense/`  
**Stack:** Vanilla HTML + CSS + Three.js + Smoothie Charts + GSAP  
**Vista previa:** Abrir `index.html` en cualquier navegador (Chrome recomendado).

---

## 1. Qué es esto

Un dashboard operacional 100% ficticio de monitoreo global, diseñado para parecer una herramienta corporativa de NOC/SRE real, pero con datos absurdos, satíricos y de contexto mundial. Todo funciona en loop continuo sin intervención humana.

El objetivo es que **se vea como algo en producción**: cifras que cambian, gráficos que se actualizan, alertas que se resuelven, tarjetas que se mueven entre columnas, un globo 3D con eventos, un chat de equipo, y dos cursores fantasma simulando co-edición estilo Figma.

---

## 2. Tono del prompting / estilo de desarrollo

Las solicitudes del usuario siguieron este patrón:

- **Vaga al principio, precisa después.** El usuario arranca con una intención grande ("dashboard con todo") y refina en iteraciones ("menos absurdo", "más responsive", "no clickear el tema").
- **Prioriza sensación sobre especificación.** No pide "un botón rojo", pide "que parezca real", "que no suene a IA slop", "sensación de live feed".
- **Criterios estéticos emocionales.** "Anti-IA-slop", "warm editorial", "no glows genéricos", "identidad bien marcada".
- **Rechazo a lo obvio.** Rechazó la estética dark-cyan-magenta genérica de dashboards IA. Prefirió paleta warm (cream, serif fonts, acentos tierra).
- **Acepta decisiones del modelo.** Dijo explícitamente "sos libre de elegir con qué y como", "no tenés que preguntarme nada".
- **Iterativo sin miedo a reescribir.** Cada feedback implicó reescribir archivos enteros, no parches.
- **Humor inteligente, no político.** Pidió "algo gracioso leve pero sin sonar incorrecto políticamente". La línea: *sátira corporativa/distópica sobre vigilancia, no sátira política/partidaria*.
- **Todo en una pantalla.** Exigió fit exacto sin scroll forzado, usando flexbox y viewport proportions.

**Conclusión para otros modelos:** Este usuario prefiere que **tomes decisiones fuertes de diseño** y luego ajustes por feedback. No quiere ser interrogado. La estética importa tanto como la funcionalidad.

---

## 3. Estructura del proyecto

```
nonsense/
├── index.html          # Layout completo, sidebar, header, grid de widgets, canvas Three.js
├── styles.css          # ~340 líneas, paleta dual light/dark, responsive completo
├── app.js              # ~1300 líneas, motor de simulación, Three.js, Chart.js, GSAP
└── (este archivo)
```

### Layout visual

1. **Sidebar** (~220px desktop, ~52px icon-only en tablet, bottom-nav en mobile)
2. **Header** — reloj, bell notifications, avatar, theme toggle
3. **KPI Row** — 4 métricas con sparklines SVG animados
4. **Globe + Task Monitor** — Three.js globe a la izquierda, kanban a la derecha
5. **Bottom Row** — Traffic chart, Active Alerts, Team Comms

---

## 4. Características principales

### 4.1. Globo 3D interactivo (Three.js)

- **Dot-matrix sphere:** ~1200 puntos en lattice Fibonacci.
- **Region nodes:** 8 ciudades (NY, SF, London, Tokyo, Mumbai, São Paulo, Singapore, Sydney).
- **Eventos visuales:** ping wave expansiva + flash de nodo + data packet viajando por arco.
- **Cámara:** orbita suave, se acerca automáticamente al evento, drag manual con mouse/touch.
- **Overlay HTML:** muestra timestamp + región + descripción del evento en vivo.

### 4.2. Kanban / Live Operations

- 4 columnas: **Queued → Active → Review → Closed**
- Tarjetas se mueven solas cada 5s con transición GSAP (slide direccional)
- Cuando todo llega a Closed, se resetea con nuevas tareas

### 4.3. Alertas resolvibles

- Se generan automáticamente
- Cada alerta tiene botones **Resolve** e **Ignore** reales
- El panel muestra countdown visual (barra roja que decrece)
- Botón **Resolve All** dismiss masivo

### 4.4. Chat del equipo

- Mensajes ficticios de 6 usuarios
- Input simulado (typing letra por letra)
- Respuestas tipo "Acknowledged", "LGTM", "On it"

### 4.5. Fake Cursors (Figma style)

- Dos cursores: `Jordan L.` (terracota) y `Sam Q.` (blue)
- Se mueven solos, hacen click en elementos funcionales reales
- Sólo interactúan con: kanban cards, alert buttons, Resolve All, Clear Notifs, Bell icon, Chart buttons
- **NUNCA** clickean: nav items, theme toggle, KPIs vacíos, headers decorativos

### 4.6. Dark mode

- Toggle en header con animación luna/sun
- Persistencia en `localStorage`
- Detecta `prefers-color-scheme`
- Adapta Smoothie Charts, Three.js globe, y sparklines al cambiar

### 4.7. Responsive

- Desktop: sidebar completa, grid multi-columna
- Tablet (< 1365px): sidebar colapsa a iconos
- Tablet pequeña (< 1023px): bottom nav bar
- Mobile (< 768px): layout apilado vertical
- Tiny (< 480px): ultra-compacto

---

## 5. Paleta de colores

### Light mode
- Background: `#f0ede8` (warm cream)
- Panel: `#faf9f7` (off-white)
- Border: `#d6d1c9` (warm tan)
- Text: `#1c1917` (near-black)
- Acentos: deep blue `#1e40af`, terracotta `#b45309`, forest green `#166534`, dark red `#991b1b`

### Dark mode
- Background: `#121212`
- Panel: `#1e1e1e`
- Border: `#2a2a2a`
- Text: `#e8e6e3`
- Acentos: sky blue `#60a5fa`, orange `#f97316`, mint `#4ade80`, coral `#f87171`

---

## 6. Cómo correr / reproducir

1. Abrir `index.html` directamente en Chrome/Safari/Firefox.
2. No requiere servidor (CDNs para Three.js, Smoothie Charts, GSAP).
3. Para desarrollo: cualquier servidor estático (`python3 -m http.server` o `npx serve`).
4. Todo el estado es en memoria; recargar la página resetea.

---

## 7. Arquitectura del código

### `app.js` — módulos principales

- `initGlobe()` — Three.js scene, camera, renderer, animation loop
- `initCharts()` — Smoothie Charts real-time scrolling (Traffic/Load)
- `updateKPIs()` + `drawSparkline()` — contadores animados con GSAP + SVG sparklines
- `initKanban()` / `moveKanbanCard()` / `autoMoveKanban()` — pipeline de tareas
- `createAlert()` / `resolveAlert()` / `ignoreAlert()` — sistema de alertas
- `addChatMessage()` / `autoChat()` — feed de comunicaciones
- `addNotification()` / `renderNotification()` — centro de notificaciones
- `initFakeCursors()` / `startCursorLoop()` — cursores fantasma Figma
- `triggerGlobeEvent()` — emite eventos en el globo (flash + ping + packet + overlay)
- `applyTheme()` — cambio de tema con adaptación de Smoothie Charts y Three.js

### CSS clave

- CSS variables con `[data-theme="dark"]` override
- `clamp()` para todo: tamaños proporcionales a viewport
- Flexbox con `overflow: hidden` para fit exacto sin scroll
- Media queries: 1365px, 1023px, 767px, 479px

---

## 8. Ideas abiertas: eventos y monitoreos inútiles para agregar

Esta sección es intencionalmente abierta. Cualquier modelo que continúe este proyecto puede agregar items de esta lista o inventar nuevos siguiendo la misma fórmula: **dato realista + absurdo corporativo/social, sin posición política**.

### 8.1. Nuevos tipos de notificación

- `Boredom index peaked` — "Office chair occupancy variance down 12% in sector C. Alert: workforce may be thinking."
- `Seagull migration anomaly` — "Coastal sensors detected 47% more seagulls near data center exhaust vents."
- `Coffee stockpile critical` — "Breakroom reserves below 18 cups equivalent. Procurement ticket #CAF-991 opened."
- `Keyboard acoustics flagged` — "Typing cadence in pod 4B indicates possible creative thought. Review scheduled."
- `Yawning cascade detected` — "Consecutive yawns in APAC region exceeded threshold (3 in 5 min). Injecting caffeine ads."
- `Plant morale low` — "Office ficus #12 leaf-drop rate up 34%. Recommending praise algorithm."
- `Vending machine sentiment` — "Snack D-7 (tuna sandwich) returned to shelf 8 times today. Delisting imminent."
- `Elevator smalltalk AI` — "Conversational filler words per floor reduced. Social cohesion metric: amber."
- `Parking lot occupancy` — "Lot C has 3 cars that haven't moved since Tuesday. Tagging for wellness check."
- `Printer grief` — "HP-7F jammed for the 14th time. Assigning it a support counselor."
- `Calendar density alert` — "User has 4 consecutive 'focus time' blocks. Treating as suspicious behavior."
- `Slack emoji velocity` — "Thumbs-up to message ratio fell below 0.3. Morale intervention triggered."

### 8.2. Nuevos eventos de globo 3D

- `Penguin displacement` — Antártida: pingüino emperador se desvió 2.3km de ruta habitual
- `Sahara dust plume` — Polvo sahariano detectado en sensor de São Paulo
- `Northern lights interference` — Aurora boreal afectando satélite de comunicaciones sobre Oslo
- `Volcanic ash routing` — Ruta de vuelo desviada por ceniza en Indonesia
- `Tidal anomaly` — Mareas en Mumbai 14cm por encima de predicción
- `Magnetic declination shift` — Cambio en declinación magnética registrado en Singapore
- `Termite swarm` — Nube de termitas detectada por radar meteorológico en Texas
- `Balloon incident` — Objeto flotante no identificado a 18,000m sobre EU-West
- `Whale song interference` — Frecuencias de ballena jorobada superpuestas con cable submarino
- `Drone corridor` — 142 drones de reparto detectados en corredor aéreo de Tokyo

### 8.3. Nuevos paneles / widgets

- **Weather Mind Control** — "Probabilidad de que la lluvia afecte el ánimo del equipo: 64%"
- **Zodiac Engineering** — "Commit approval rate un 8% más alto cuando Mercurio no está retrógrado"
- **Food Truck Proximity** — "Taco truck a 400m. Predicted productivity dip in 12 minutes."
- **Parking Karma** — "Usuario Taylor ha encontrado lugar en primer piso 3 días seguidos. Investigando."
- **Plant Watering Matrix** — "Ficus #7 necesita riego. Ticket asignado a Morgan. SLA: 4 horas."
- **Ambient Noise Index** — "Decibeles en open office: 62.3. Conversación sobre fin de semana detectada."
- **Step Count Surveillance** — "Alex caminó 847 pasos ayer. Wellness bot preparing gentle inquiry."
- **Light Exposure Audit** — "Ventana sudoeste: lux promedio 340. Vitamina D projections: nominal."
- **Thermostat Democracy** — "Votación de temperatura: 22°C ganó con 4 votos. Disidente en piso 3 enfriado."
- **Ghost Ping Detector** — "Mensaje leído sin respuesta hace 47 min. Social credit adjusted."
- **Lunch Break Variance** — "Sam almorzó a las 11:47. Z-score: -1.8. Outlier logged."
- **Zoom Fatigue Forecast** — "Predicción: 3.2 cámaras apagadas en la próxima reunión. Confidence: 89%."

### 8.4. Nuevos tipos de alerta visual

- **Arco iris en el globo** — evento "rare natural phenomenon" con arcoiris viajando por la superficie
- **Pulso de ciudad dormida** — a las 3am, una ciudad entera parpadea una vez en el globo
- **Migración de datos** — literalmente paquetes de datos que "emigran" de un nodo a otro con pasaporte
- **Earthquake of commits** — un push masivo hace que el globo tiemble 0.3 segundos
- **Solar panel worship** — un nodo solar se ilumina más cuando el sol real está encima

### 8.5. Nuevos cursores / personajes

- `Riley V.` (verde) — cursor que solo resuelve alertas, nunca ignora
- `Taylor X.` (violeta) — cursor que solo mueve kanban cards a "Closed"
- `Morgan Z.` (gris) — cursor que solo clickea el bell icon repetidamente
- `Alex P.` (rojo) — cursor que solo clickea "Resolve All"

---

## 9. Reglas de diseño para mantener consistencia

1. **Nunca usar `alert()` nativo del browser.** Todo es inline, dentro del dashboard.
2. **Nunca bloquear el layout.** Todo debe caber en una pantalla sin scroll horizontal.
3. **Nunca usar colores genéricos de IA.** Evitar cyan `#00d4ff` y magenta `#ff3864` como acentos principales.
4. **Nunca tocar `localStorage` salvo el tema.** El resto es state efímero.
5. **Siempre usar GSAP para animaciones de entrada.** Stagger, no fade simple.
6. **Siempre mantener el chat ficticio.** Nadie real está escribiendo.
7. **Siempre que un cursor cliquee algo, debe hacer algo real.** Nunca click decorativo.
8. **Siempre mezclar serio + absurdo.** La gracia está en que sean indistinguibles a primera vista.

---

## 10. Historia de cambios (resumen de iteraciones)

| Iteración | Qué cambió |
|---|---|
| v1 | Dashboard absurdo total (ñoquis, tacos, gatos) — rechazado por "demasiado ridículo" |
| v2 | Copy realista profesional, sidebar compacto, charts smooth |
| v3 | Responsive completo, kanban FLIP animado, fit exacto en pantalla |
| v4 | Look anti-IA-slop: warm editorial, serif fonts, paleta cream/earth |
| v5 | Globo 3D interactivo con eventos, cámara dinámica, ping waves |
| v6 | Dark mode toggleable con persistencia y adaptación de Three.js |
| v7 | Fake cursors clickean solo elementos funcionales, nunca decorativos |
| v8 | Notificaciones mezcladas desde el inicio: infra + global + absurdo |

---

*Última actualización: Jul 2026*  
*Prompt original: "GEnera un dashboard con animaciones con GSAP, graficos, datos, notificaciones. Todo falso, todo sin sentido, no te detengas hast tener algo de alta calidad y fidelidad..."*
