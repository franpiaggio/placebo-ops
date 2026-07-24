# Decisiones

## Mezcla de tonos

Elegí una mezcla de NOC/SRE corporativo, sátira burocrática y sci-fi institucional. La proporción principal es operativa: SLAs, SLOs, incidentes, severidades, colas, remediación y postmortems. Encima aparece la capa absurda: comités orbitales, decretos con latencia, quorum extraplanetario, neutralidad auditada y expedientes que flotan. El objetivo fue que el texto pudiera parecer serio durante un segundo antes de volverse claramente imposible.

## Universo monitoreado

El dashboard se llama **Mandato Orbital**. Monitorea una infraestructura ficticia de continuidad institucional extraplanetaria: balizas, corredores de aclamación, cámaras de eco, nodos de quorum y subcomités de órbita baja. La situación implícita es una burocracia política que intenta mantener estable un relato oficial distribuido por estaciones espaciales y comités automatizados.

Nada representa datos reales. Todos los nombres, métricas, incidentes, actores y lugares son inventados.

## Eventos y ritmo

Creé 8 tipos de eventos: `SIG`, `SLA`, `WRN`, `DEG`, `REC`, `SEC`, `GOV` y `OPS`.

El ritmo se maneja con tres fases internas: calma operacional, ráfaga de dictámenes y caos procedimental. Cada fase cambia la frecuencia de eventos, la probabilidad de severidades, la evolución de métricas y la apertura de incidentes. Los eventos no llegan con un intervalo fijo: usan tiempos aleatorios y ráfagas cortas para evitar sensación de loop uniforme.

Los incidentes tienen progreso, pueden escalar, resolverse manualmente o cerrarse automáticamente si la remediación ceremonial está activa. Las tareas también avanzan y terminan, generando eventos de recuperación o éxito.

## Stack y técnica

Es una página standalone: `index.html` con CSS y JavaScript embebidos. No hay backend, almacenamiento persistente ni llamadas a APIs de datos. La única dependencia externa opcional es Google Fonts por CDN para la tipografía.

Los controles visibles modifican estado real dentro de la página: confirmar cola, silenciar eventos, escalar, forzar estabilidad, activar o suspender remediación automática, resolver incidentes y confirmar incidentes individuales. No usé `alert()` ni `confirm()`.

La simulación vive en un objeto `state`, con renderizado directo al DOM. Preferí esta arquitectura simple porque el requisito era standalone y de alta fidelidad visual, no una app framework-heavy.

## Decisión distintiva

La decisión que más distingue esta versión es tratar la burocracia como si fuera una red física observable. No es solo un dashboard con métricas absurdas: intenta mostrar una maquinaria institucional completa, con telemetría, narrativa, negación plausible, ritual operativo y consecuencias visuales cuando el sistema se desborda.
