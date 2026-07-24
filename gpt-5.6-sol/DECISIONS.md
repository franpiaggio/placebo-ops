# UMBRAL — Decisiones de diseño

## Mezcla de tonos

Elegí una mezcla de **técnico crudo**, **sátira política** y **sci-fi institucional**. La interfaz usa precisión de telemetría, SLAs, latencias, vectores y estados operativos como lenguaje base; sobre esa superficie aparecen tratados orbitales, cuotas de amanecer y causalidad administrativa. La sátira no tiene un tratamiento visual distinto: un formulario “en vuelo” tiene la misma jerarquía que una desviación de órbita. Esa paridad hace que lo serio y lo absurdo no puedan separarse a primera vista.

## Universo monitoreado

UMBRAL es un centro automático de continuidad cívico-orbital. Supervisa el **Corredor ASTER**, una jurisdicción donde varios gobiernos comparten luz solar, órbitas y versiones públicas de los hechos. La situación principal es la transferencia de 6.2 MLux de “amanecer compensatorio” por el convoy ASTER-9. El viaje atraviesa mandato, inyección, aduana fotónica y ratificación, mientras la interfaz sigue incidentes semánticos, quórums relativistas y deuda luminosa.

La narrativa progresa: la misión gana porcentaje, completa hitos, reduce deuda y finalmente cierra; entonces comienza una obligación nueva. Los incidentes pueden confirmarse, escalarse o resolverse, y cada acción deja una consecuencia en el despacho y en las métricas.

## Eventos y ritmo

Hay **16 tipos base de eventos** distribuidos entre información, avisos, cierres y una anomalía crítica rara. Además, las acciones del usuario y los cambios de fase producen eventos contextuales adicionales.

El scheduler no usa un tick uniforme. Alterna cuatro posturas:

- Calma: intervalos de 4.2 a 9.2 segundos.
- Ráfaga deliberativa: intervalos de 1.1 a 3.1 segundos.
- Caos: intervalos de 0.48 a 1.4 segundos.
- Recuperación: intervalos de 2.1 a 5.1 segundos.

Los cambios modifican también consenso, latencia, avance de misión, lenguaje del estado general y velocidad del campo orbital. El caos puede ocurrir como ciclo del sistema o activarse con **Inyectar contingencia**; dura un tiempo limitado y desemboca en recuperación.

## Stack y decisiones técnicas

- Un único `index.html` con HTML, CSS y JavaScript nativos.
- Cero backend, cero APIs, cero datos reales y cero dependencias de red.
- Canvas 2D con `requestAnimationFrame` para el campo orbital.
- Transiciones CSS con una curva personalizada para cambios de estado, feed, botones y notificaciones.
- Grid rígido dentro de `100dvh`, con `overflow: hidden`, para garantizar una consola completa sin scroll en desktop.
- Adaptación compacta para pantallas estrechas: conserva mapa, incidentes y feed, y retira módulos secundarios antes de forzar scroll.
- Controles funcionales: pausar/reanudar, silenciar, filtrar eventos, confirmar casos, escalar, resolver, confirmar la cola e inyectar una contingencia.
- Notificaciones propias en lugar de `alert()` o `confirm()`.

## Decisión distintiva

La idea central es tratar **la burocracia como una fuerza física medible**. En UMBRAL, una ambigüedad legal cambia metros de órbita, una versión pública puede adelantarse causalmente al hecho y el amanecer necesita validez administrativa. No es sólo decoración verbal: esa premisa conecta el mapa, las métricas, los protocolos, los incidentes y la evolución de la simulación en una única máquina narrativa.
