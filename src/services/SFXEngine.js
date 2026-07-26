/**
 * SFXEngine — Web Audio API synthesized sounds.
 * No external audio files. All sounds generated programmatically.
 *
 * Features:
 * - Dual-sine whistle with rapid frequency drop
 * - Dribble: low-frequency damped triangle impact
 * - Cheer: upward arpeggio synth chord + noise
 * - Master mute switch that suspends/resumes AudioContext
 */

let audioCtx = null;
let _muted = false;

function getCtx() {
  if (_muted) return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return null;
    }
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function createGain(ctx, startTime, value, duration, endValue = 0.001) {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(value, startTime);
  gain.gain.exponentialRampToValueAtTime(endValue, startTime + duration);
  gain.connect(ctx.destination);
  return gain;
}

function createOsc(ctx, type, freq, startTime, duration, gainValue = 0.2) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(gainValue, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
  return { osc, gain };
}

/** Master mute: suspends AudioContext entirely */
export function setMuted(muted) {
  _muted = muted;
  if (audioCtx) {
    if (muted) {
      audioCtx.suspend().catch(() => {});
    } else {
      audioCtx.resume().catch(() => {});
    }
  }
}

export function isMuted() {
  return _muted;
}

const sfx = {
  /** Dual-sine whistle: rapid frequency drop, used for correct answers */
  whistle() {
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      // Primary sine: 800→1600→1200
      const osc1 = ctx.createOscillator();
      const g1 = createGain(ctx, t, 0.25, 0.4);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(800, t);
      osc1.frequency.exponentialRampToValueAtTime(1600, t + 0.08);
      osc1.frequency.exponentialRampToValueAtTime(1200, t + 0.2);
      osc1.connect(g1);

      // Secondary sine: higher harmony
      const osc2 = ctx.createOscillator();
      const g2 = createGain(ctx, t, 0.1, 0.35);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1200, t);
      osc2.frequency.exponentialRampToValueAtTime(2400, t + 0.08);
      osc2.frequency.exponentialRampToValueAtTime(1800, t + 0.2);
      osc2.connect(g2);

      osc1.start(t); osc1.stop(t + 0.4);
      osc2.start(t + 0.02); osc2.stop(t + 0.35);
    } catch (e) { /* silent */ }
  },

  /** Dribble: low-frequency damped impact */
  dribble() {
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = createGain(ctx, t, 0.3, 0.1);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.08);
      osc.connect(gain);
      osc.start(t); osc.stop(t + 0.12);
    } catch (e) { /* silent */ }
  },

  /** Cheer: upward arpeggio + filtered noise burst */
  cheer() {
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      // Noise burst (crowd)
      const bufSize = ctx.sampleRate * 0.6;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      filter.Q.value = 0.8;
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(0, t);
      ng.gain.linearRampToValueAtTime(0.1, t + 0.1);
      ng.gain.linearRampToValueAtTime(0.06, t + 0.35);
      ng.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
      noise.connect(filter);
      filter.connect(ng);
      ng.connect(ctx.destination);
      noise.start(t); noise.stop(t + 0.7);

      // Arpeggio: C5→E5→G5→C6 (upward)
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        const start = t + 0.05 + i * 0.1;
        osc.type = 'sine';
        osc.frequency.value = freq;
        g.gain.setValueAtTime(0, start);
        g.gain.linearRampToValueAtTime(0.15, start + 0.04);
        g.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.3);
      });
    } catch (e) { /* silent */ }
  },

  /** Level up fanfare: C major chord arpeggio */
  levelUp() {
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = t + i * 0.12;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.2, start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.25);
        osc.start(start);
        osc.stop(start + 0.3);
      });
    } catch (e) { /* silent */ }
  },

  /** Wrong answer: descending sawtooth buzz */
  wrong() {
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = createGain(ctx, t, 0.18, 0.3);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.25);
      osc.connect(gain);
      osc.start(t); osc.stop(t + 0.3);
    } catch (e) { /* silent */ }
  },

  /** Swish: filtered noise sweep (net sound) */
  swish() {
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const bufSize = ctx.sampleRate * 0.3;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, t);
      filter.frequency.exponentialRampToValueAtTime(3000, t + 0.15);
      const gain = createGain(ctx, t, 0.1, 0.3);
      noise.connect(filter);
      filter.connect(gain);
      noise.start(t); noise.stop(t + 0.3);
    } catch (e) { /* silent */ }
  },
};

export default sfx;
