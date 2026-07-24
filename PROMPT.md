# PROMPT — Centro de Monitoreo Ficticio

> Este archivo es el prompt completo. Se le pasa tal cual a cada modelo, sin
> contexto adicional. Cada intento es independiente: el modelo NO debe mirar
> otras carpetas del repo ni basarse en intentos previos.

---

## Instrucciones para el modelo

Construí un **dashboard de monitoreo en tiempo real, 100% ficticio**, como
página web standalone. Tiene que verse y sentirse como una herramienta seria
en producción, monitoreando una situación real ahí afuera — pero todo es
inventado. Nadie lo opera. Nada de lo que muestra existe.

Trabajá en una carpeta con el nombre de tu modelo (ej: `mi-modelo/`).
No abras ni leas otras carpetas del repositorio.

### 1. Tono e identidad — lo decidís vos

Elegí una **mezcla de al menos dos** de estos registros (la proporción es tuya):

- **Serio corporativo** — NOC/SRE, SLAs, tickets, jerga enterprise
- **Sátira política** — burocracia, comités, geopolítica leve, doble discurso institucional
- **Sci-fi** — agencias espaciales, señales anómalas, protocolos de contención
- **Técnico crudo** — telemetría, logs, unidades de medida, precisión obsesiva

Nunca un solo registro puro: la gracia está en la mezcla. Inventá el nombre
del producto, su identidad visual, su historia implícita. Comprometete con
una estética fuerte y coherente — la que quieras, pero que sea una decisión,
no un default.

### 2. Contenido — lo generás vos

Vos definís **qué** monitorea el dashboard y **cuántos** tipos de eventos
existen. No hay lista dada: inventá tu propio universo de métricas, alertas,
incidentes y actores. Requisitos del contenido:

- Serio y absurdo tienen que ser **indistinguibles a primera vista**.
- Suficiente variedad de eventos como para que mirarlo 5 minutos no se
  sienta repetitivo ni en loop evidente.
- Que se perciba una **situación real siendo monitoreada**: los eventos
  deben sugerir una narrativa (cosas que empiezan, escalan, se resuelven,
  dejan consecuencias), no ser ruido aleatorio desconectado.

### 3. Dinámica — el dashboard está vivo

- **Ritmo variable**: momentos de calma operativa, ráfagas de actividad,
  y ocasionalmente algo de caos genuino. No un tick uniforme cada N segundos.
- **Severidades mezcladas**: no todo es alerta roja. Info, avisos, éxitos,
  degradaciones, recuperaciones. El rojo tiene que ser raro para que importe.
- **Sensación de avance**: cosas que progresan y terminan — tareas que se
  completan, incidentes que se cierran, contadores que llegan a su meta.
- **Acciones reales**: al menos algunos controles visibles deben hacer algo
  de verdad dentro de la página (resolver, confirmar, silenciar, escalar).
  Ningún botón puramente decorativo.
- **Orden y caos alternados**: el sistema a veces se estabiliza, a veces se
  desborda. Que el estado general del dashboard tenga sus propios ciclos.

### 4. Reglas duras (las únicas)

1. Standalone: abrir `index.html` en un navegador y funciona. CDNs permitidos.
2. Todo falso. Sin backend, sin datos reales, sin llamadas a APIs externas.
3. Sin `alert()`/`confirm()` nativos del navegador.
4. Alta calidad y fidelidad: no pares hasta que parezca software real en producción.
5. No preguntes nada: tomá todas las decisiones vos y ejecutá.

### 5. Documentá tus decisiones

Al terminar, escribí un `DECISIONS.md` en tu carpeta explicando:

- Qué mezcla de tonos elegiste y por qué
- Qué universo/situación inventaste para monitorear
- Cuántos tipos de eventos creaste y cómo manejás el ritmo (calma/caos)
- Stack y decisiones técnicas relevantes
- Qué decisión creés que distingue tu versión de cualquier otra posible

---

## Notas para el humano (no van en el prompt)

- Copiar desde "Instrucciones para el modelo" hasta el final de la sección 5.
- Un intento por modelo, carpeta por modelo (`kimi-k2.6/`, `opus-4.8/`, `fable-5/`, ...).
- El `DECISIONS.md` es el artefacto de comparación entre modelos: mismo
  prompt, decisiones distintas.
- No corregir estética ni contenido en el primer pase: el objetivo es ver
  el criterio propio de cada modelo, no converger a un gusto.
