// Tiny WebAudio chimes — no external assets needed.
let ctx: AudioContext | null = null;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
  }
  return ctx;
}

function tone(freq: number, duration = 0.18, type: OscillatorType = "sine", gain = 0.12, when = 0) {
  const c = getCtx();
  if (!c) return;
  const t = c.currentTime + when;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(g).connect(c.destination);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

export const sfx = {
  success: () => {
    tone(660, 0.12, "triangle", 0.15);
    tone(880, 0.18, "triangle", 0.15, 0.09);
    tone(1320, 0.22, "triangle", 0.12, 0.18);
  },
  error: () => {
    tone(220, 0.18, "sawtooth", 0.1);
    tone(160, 0.25, "sawtooth", 0.1, 0.1);
  },
  pickup: () => tone(520, 0.08, "sine", 0.08),
  click: () => tone(740, 0.06, "square", 0.06),
};
