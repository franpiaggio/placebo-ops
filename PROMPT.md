# PROMPT — Fictional Monitoring Center

> This file is the complete prompt. It is given verbatim to each model, with
> no additional context. Every attempt is independent: the model must NOT
> look at other folders in the repo or build on previous attempts.

---

## Instructions for the model

Build a **100% fictional real-time monitoring dashboard** as a standalone
web page. It has to look and feel like a serious tool running in production,
monitoring a real situation out there — but everything is invented. Nobody
operates it. Nothing it shows exists.

Work inside a folder named after your model (e.g. `my-model/`).
Do not open or read any other folder in the repository.

### 1. Tone and identity — your call

Pick a **mix of at least two** of these registers (the proportions are yours):

- **Corporate serious** — NOC/SRE, SLAs, tickets, enterprise jargon
- **Political satire** — bureaucracy, committees, light geopolitics, institutional doublespeak
- **Sci-fi** — space agencies, anomalous signals, containment protocols
- **Raw technical** — telemetry, logs, units of measurement, obsessive precision

Never a single pure register: the fun is in the mix. Invent the product's
name, its visual identity, its implied backstory. Commit to a strong,
coherent aesthetic — any one you want, but make it a decision, not a default.

### 2. Content — you generate it

You define **what** the dashboard monitors and **how many** event types
exist. There is no given list: invent your own universe of metrics, alerts,
incidents and actors. Content requirements:

- Serious and absurd must be **indistinguishable at first glance**.
- Enough event variety that watching it for 5 minutes never feels
  repetitive or like an obvious loop.
- It must feel like a **real situation being monitored**: events should
  suggest a narrative (things start, escalate, get resolved, leave
  consequences), not disconnected random noise.

### 3. Dynamics — the dashboard is alive

- **Variable rhythm**: moments of operational calm, bursts of activity,
  and occasionally some genuine chaos. Not a uniform tick every N seconds.
- **Mixed severities**: not everything is a red alert. Info, warnings,
  successes, degradations, recoveries. Red must be rare so it matters.
- **Sense of progress**: things that advance and finish — tasks completing,
  incidents closing, counters reaching their target.
- **Real actions**: at least some visible controls must actually do
  something within the page (resolve, acknowledge, mute, escalate).
  No purely decorative buttons.
- **Alternating order and chaos**: the system sometimes stabilizes,
  sometimes overflows. The dashboard's overall state should have cycles
  of its own.

### 4. Technical freedom — your call, 100%

Choose your own stack based on your plan: any libraries or none, CSS-only
graphics, 2D canvas, SVG, WebGL/GLSL shaders, 3D — whatever serves the
concept. The only requirement is **coherence**: every technical choice must
serve the identity and dynamics you designed, not be tech for tech's sake.
Own the decision and be able to justify it.

### 5. Hard rules (the only ones)

1. Standalone: open `index.html` in a browser and it works. CDNs allowed.
2. Everything fake. No backend, no real data, no external API calls.
3. No native browser `alert()`/`confirm()`.
4. High quality and fidelity: don't stop until it looks like real
   production software.
5. **Everything fits in one screen**: the full dashboard fits a desktop
   viewport with no vertical or horizontal scroll. Not a single pixel out.
6. **Smooth animations**: all motion must be fluid and eased (GSAP
   recommended). Nothing rough or abrupt — no hard jumps, no elements
   appearing/disappearing without transition, no reflows pushing the layout.
7. Don't ask anything: make every decision yourself and execute.

### 6. Document your decisions

When you finish, write a `DECISIONS.md` in your folder explaining:

- Which mix of tones you chose and why
- What universe/situation you invented to monitor
- How many event types you created and how you handle rhythm (calm/chaos)
- Stack and relevant technical decisions — and why they fit the concept
- Which decision you believe sets your version apart from any other possible one

---

## Notes for the human (not part of the prompt)

- Copy from "Instructions for the model" through the end of section 6.
- One attempt per model, one folder per model (`kimi-k2.6/`, `opus-4.8/`, `fable-5/`, ...).
- Each `DECISIONS.md` is the comparison artifact across models: same
  prompt, different decisions.
- Don't correct aesthetics or content on the first pass: the goal is to see
  each model's own judgment, not to converge on a taste.
