# SIGA·SIGA · Ente Autárquico de Monitoreo de la Argentinidad

**Modelo:** Fable 5 (Claude) — versión argenta
**Directorio:** `fable-5-argenta/`
**Stack:** Vanilla HTML + CSS + JS. Todo canvas 2D hand-rolled, cero librerías. El mapa de Argentina es point-in-polygon sobre un contorno dibujado a ojo ("como los planos del tío").
**Vista previa:** Abrir `index.html` (solo Google Fonts requiere conexión).

---

## 1. Concepto

Mismo placebo absurdo de monitoreo total, pero el objeto monitoreado es **la
argentinidad**. SIGA·SIGA (por el árbitro que no cobra nada) es un ente
autárquico ficticio que vigila el temple nacional en tiempo real: la
temperatura del agua del mate, el stock yerbatero, el chamuyo ambiente y un
grupo de WhatsApp que jamás va a confirmar la fecha del asado.

Lema del boot:

> `MÓDULO DE VERGÜENZA ………… NO INSTALADO`
> `> TODO PIOLA. ARRANCAMOS.`

## 2. Identidad

- **Paleta:** carbón de parrilla `#131110` + **celeste bandera** `#75aadb` +
  **sol de mayo** `#f6b40e` + **brasa** `#ff6b35`. La línea inferior de la
  cabecera es un degradé celeste-blanco-celeste al 50% de opacidad.
- **Tipografía 100% argentina:** Chivo y Chivo Mono, de **Omnibus-Type**
  (fundición de Buenos Aires). Detalle no negociable.
- **Sello:** sol de mayo hecho con `repeating-conic-gradient`, girando a
  1 vuelta/minuto.
- **Números en `es-AR`:** decimales con coma, miles con punto
  (`$ 1.486,52`) vía `toLocaleString('es-AR')`. Hora en
  `America/Argentina/Buenos_Aires`.
- **UI enteramente en castellano rioplatense**, voseo incluido
  ("TOCÁ PARA REPORTAR", "TE QUEMÁS").

## 3. Módulos

| Módulo | Qué es |
|---|---|
| MOD·01 Signos Vitales | Temperatura del agua (con estado: TIBIA/PELO/TE QUEMÁS), Índice Nacional de Aguante, chamuyo ambiente, humedad (PEGAJOSA/SE BANCA), stock yerbatero en toneladas, paciencia en fila (en declive), ánimo nacional (enum: QUEJOSO PERO FELIZ, MODO FINDE, NI AHÍ…) |
| MOD·01b Termómetro Federal | Barras por región: AMBA, Centro, NOA, NEA, Cuyo, Patagonia y Córdoba* (categoría propia, obviamente) |
| MOD·02 Teatro de Operaciones | Mapa dot-matrix de la República (ver §4) con 20 ciudades, pings de eventos, mira sobre la ciudad activa y click-para-reportar |
| MOD·03 Ondas Nacionales | Osciloscopios: Bocina Ambiente · 9 de Julio (dB), Densidad de "Che" (che/min), Ansiedad por el Vuelto (mangos/m²) |
| MOD·04 Alertas Nacionales | Expedientes N° XXXX/26 con severidad GRAVE/OJO/DATO, botones ATENDER / MAÑANA, countdown y auto-resolución "SE RESOLVIÓ SOLO · COMO SIEMPRE". Botón "TODO BIEN" cierra todo de un saque |
| MOD·05 Mesa de Cotizaciones | Dólar blue, alfajor, mate, choripán, mila napo y fernet 70/30 con sesgo alcista (obvio) + Brecha Emocional |
| MOD·06 Registro Nacional | Log CHK/EVT/OJO/SYS mezclando checks domésticos ("tupper de la abuela … EN CIRCULACIÓN HACE 14 AÑOS") con eventos nacionales |
| MOD·07 Grupo del Asado | Chat estilo WhatsApp "ASADO SÁBADO (DEFINITIVO 2)": guión de 22 mensajes en loop eterno donde El Colo, La Tana, Cabezón, El Ruso, Flaquita y el Tío Carlos (audios de 4:32, sin escuchar) jamás confirman fecha. Al cerrar cada ciclo: "grupo del asado completó otro ciclo sin fecha · récord vigente" |

### El botón BARDO

Al presionarlo: banner brasa "SE ARMÓ EL BARDO — MANTENGA LA CALMA, CHE — EL
QUE AVISA NO TRAICIONA", tembleque general, 5 pings en cascada por el mapa,
ondas al 340%, alerta extra, luz VIBRA en rojo. A los 4,4s: "YA FUE · TODO
TRANQUI · SIGA SIGA".

## 4. El mapa criollo

- Contorno continental como **un polígono de ~80 vértices `[lon,lat]`**
  trazado a mano (reconocible, no catastral), más Tierra del Fuego e islas.
- **Point-in-polygon (ray casting)** sobre grilla de 0,42° → ~1.300 puntos
  celestes rasterizados una vez a canvas offscreen.
- Proyección equirectangular con corrección `cos(38°)` — bautizada
  "EQUIRECTANGULAR CRIOLLA" en el header del panel.
- 20 ciudades en dorado. **Click en el mapa** = "reporte ciudadano: actividad
  argenta confirmada a ojo" en la ciudad más cercana.

## 5. Reglas

1. Humor costumbrista, nunca político-partidario. Nada de figuras públicas,
   clubes puntuales ni temas sensibles. La sátira es sobre **la vida cotidiana
   y la burocracia criolla** (expedientes, entes autárquicos, "siga siga").
2. Todo cabe en una pantalla desktop; apilado con scroll < 1120px.
3. Serio + absurdo indistinguibles: cada dato lleva unidad, expediente o
   timestamp.
4. Todo botón hace algo real. Cero `alert()`, cero `localStorage`.
5. Boot tipeado por reloj de pared (inmune al throttling de pestañas).
6. `pickNR` anti-repetición en todos los pools.

*Fable 5 · versión argenta · Jul 2026*
