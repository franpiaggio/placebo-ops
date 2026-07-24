# ARGUS · Planetary Oversight Terminal

**Modelo:** Fable 5 (Claude)
**Directorio:** `fable-5/`
**Stack:** Vanilla HTML + CSS + Three.js (solo el globo). Todo lo demás es canvas 2D hand-rolled — sin Chart.js, sin GSAP, sin librerías de UI.
**Vista previa:** Abrir `index.html` (los CDN de fonts y Three.js requieren conexión).

---

## 1. Concepto

ARGUS (el gigante de cien ojos de la mitología griega) es una terminal de
supervisión planetaria que **monitorea todo lo importante del mundo** y no
entiende nada de lo que ve. Su lema operativo aparece en el boot:

> `IMPORTANCE FILTER ......... DISABLED (MONITOR EVERYTHING)`
> `UNDERSTANDING MODULE ...... NOT FOUND (SKIPPING)`

Misma premisa que la versión de Kimi (placebo absurdo de monitoreo), ejecución
opuesta: donde PULSE es un SaaS corporativo warm-editorial, ARGUS es una
consola CRT retro-futurista de agencia espacial — fósforo ámbar/verde,
scanlines, viñeta, boot sequence tipeado, instrumentación analógica.

## 2. Decisiones de diseño

- **Estética:** dual-phosphor CRT. Ámbar (`#ffb454`) para datos primarios,
  verde fósforo (`#8fce7a`) para waveforms y estado. Fondo casi negro con
  tinte verde. Nada de cyan/magenta.
- **Tipografía:** Michroma (display, wordmark) + IBM Plex Mono (todo lo demás).
- **Chrome de paneles:** bordes de 1px con esquinas marcadas (brackets),
  headers `MOD·NN // NOMBRE`, pips de estado pulsantes.
- **Overlays CRT:** scanlines con flicker sutil + viñeta radial, ambos
  `pointer-events:none`.
- **Una pantalla:** CSS Grid con `grid-template-areas`, `100vh`, overflow
  hidden en desktop. Fallback apilado con scroll bajo 1120px.

## 3. Módulos

| Módulo | Qué es | Cómo está hecho |
|---|---|---|
| MOD·01 Planetary Vitals | Mood index, attention span (en declive), dream sync, magnetósfera, resonancia Schumann, temperamento del océano (enum: BROODING/THEATRICAL/SMUG…), pájaros en vuelo | random walk + sparklines canvas |
| MOD·02 Orbital Picture | Globo: lattice Fibonacci de 1100 puntos, graticule, 13 estaciones terrestres, 3 satélites con estelas, pings expansivos, arcos de datos entre estaciones, cámara que se enfoca sola en cada evento, drag manual | Three.js |
| MOD·03 Planetary Waveforms | Seismic murmur (µRichter), ionospheric hum (dBµV), global wi-fi anxiety (worry/m²) | osciloscopios canvas con persistencia de fósforo (fillRect alpha bajo) |
| MOD·04 Anomaly Board | Anomalías con severidad (PRIORITY/WATCH/FYI), countdown, botones ACKNOWLEDGE / DEFER reales, auto-resolución "IT STOPPED", estado vacío "NO ANOMALIES. STATISTICALLY SUSPICIOUS." | DOM + timers |
| MOD·05 Atmospheric Objects | Radar de barrido con blips que se iluminan al paso: globos meteorológicos, formaciones de gansos, un blimp lento no programado | canvas + createConicGradient |
| MOD·06 Raw Telemetry | Log con tags CHK/EVT/ANM/SYS, mezcla checks serios ("gravity holding at 9.81 · APPRECIATED") con eventos absurdos ("Monday detected in 41 timezones") | DOM append + cap 80 líneas |
| MOD·07 Ground Station Comms | Chatter entre SVALBARD / GOLDSTONE / CANBERRA / MADRID / QUITO, con operador fantasma que tipea | timers + typing char a char |

### El botón PANIC

Header, guardas rayadas rojas. Al presionarlo: klaxon banner
("ALL SYSTEMS BRIEFLY DRAMATIC — REMAIN THEATRICAL"), jitter de toda la
consola, shake de cámara del globo, waveforms al 340%, anomalía extra,
lámpara VIBES en rojo. A los 4 segundos: `FALSE ALARM · nominal restored ·
thank you for testing`. Cooldown de 6s.

## 4. Detalles que importan

- El ojo del wordmark mira a los costados cada ~7s (keyframes en el iris).
- Boot sequence tipeada **por reloj de pared** (chars/seg calculados con
  `performance.now()`), no por cadena de timeouts — inmune al timer
  throttling de pestañas en background. Bug real encontrado en testing.
- MET (Mission Elapsed Time) desde epoch fija 1997-04-13; el contador de
  PASS orbital se deriva de ahí (92.68 min/órbita).
- Lámpara "VIBES" en estado warn permanente. Es la única métrica honesta.
- `ACK ALL` → "inbox zero (planetary)".

## 5. Reglas heredadas que se respetan

1. Nada de `alert()` nativo.
2. Todo cabe en una pantalla desktop sin scroll.
3. Sin paleta IA genérica (cyan/magenta prohibidos).
4. Cero `localStorage` (no hay tema que persistir: la consola es la consola).
5. Serio + absurdo indistinguibles a primera vista.
6. Todo botón visible hace algo real.

*Fable 5 · Jul 2026*
