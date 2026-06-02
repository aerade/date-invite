let ctx: AudioContext | null = null;
let bgGain: GainNode | null = null;
let bgOscillators: OscillatorNode[] = [];
let bgRunning = false;

function getCtx(): AudioContext {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return ctx;
}

export function unlockAudio() {
  const c = getCtx();
  if (c.state === 'suspended') c.resume();
}

export function playLaughter() {
  const audio = new Audio("/laugh.mp3");
  audio.volume = 0.85;
  audio.play().catch(() => {});
}

let joyAudio: HTMLAudioElement | null = null;

export function playJoy() {
  joyAudio = new Audio("/joy.mp3");
  joyAudio.volume = 0.9;
  joyAudio.play().catch(() => {});
}

export function stopJoy() {
  if (joyAudio) {
    joyAudio.pause();
    joyAudio.currentTime = 0;
    joyAudio = null;
  }
}

export function playCameraShutter() {
  const c = getCtx();
  const now = c.currentTime;
  // click burst
  const buf = c.createBuffer(1, c.sampleRate * 0.06, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 4);
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const g = c.createGain();
  g.gain.value = 0.8;
  src.connect(g);
  g.connect(c.destination);
  src.start(now);

  // high tone blip
  const osc = c.createOscillator();
  const g2 = c.createGain();
  osc.connect(g2);
  g2.connect(c.destination);
  osc.frequency.value = 5000;
  osc.type = 'square';
  g2.gain.setValueAtTime(0.06, now);
  g2.gain.linearRampToValueAtTime(0, now + 0.04);
  osc.start(now);
  osc.stop(now + 0.05);
}

export function playAww() {
  const audio = new Audio("/aww.mp3");
  audio.volume = 0.9;
  audio.play().catch(() => {});
}

export function playCurtainClose() {
  const c = getCtx();
  const now = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.connect(g);
  g.connect(c.destination);
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.linearRampToValueAtTime(60, now + 1.2);
  osc.type = 'sawtooth';
  g.gain.setValueAtTime(0.25, now);
  g.gain.linearRampToValueAtTime(0, now + 1.5);
  osc.start(now);
  osc.stop(now + 1.5);
  // whoosh noise
  const buf = c.createBuffer(1, c.sampleRate * 1.2, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const env = Math.pow(1 - i / data.length, 1.5);
    data[i] = (Math.random() * 2 - 1) * env * 0.3;
  }
  const src2 = c.createBufferSource();
  src2.buffer = buf;
  src2.connect(c.destination);
  src2.start(now);
}

export function startBackgroundMusic() {
  if (bgRunning) return;
  bgRunning = true;
  const c = getCtx();
  bgGain = c.createGain();
  bgGain.gain.value = 0.06;
  bgGain.connect(c.destination);

  const chords = [
    [220, 261.63, 329.63],
    [174.61, 220, 261.63],
    [261.63, 329.63, 392],
    [196, 246.94, 293.66],
  ];
  const beatLen = 2.5;
  const now = c.currentTime;

  function scheduleChords(startTime: number, repeat: number) {
    if (!bgRunning) return;
    chords.forEach((chord, ci) => {
      chord.forEach((freq) => {
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(g);
        if (bgGain) g.connect(bgGain);
        const t = startTime + ci * beatLen;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(1, t + 0.3);
        g.gain.linearRampToValueAtTime(0.7, t + 1.0);
        g.gain.linearRampToValueAtTime(0, t + beatLen - 0.1);
        osc.start(t);
        osc.stop(t + beatLen);
        bgOscillators.push(osc);
      });
    });
    const totalLen = chords.length * beatLen;
    if (repeat > 0) {
      setTimeout(() => scheduleChords(startTime + totalLen, repeat - 1), (totalLen - 2) * 1000);
    }
  }

  scheduleChords(now, 20);
}

export function stopBackgroundMusic() {
  bgRunning = false;
  bgOscillators.forEach(o => { try { o.stop(); } catch (_) {} });
  bgOscillators = [];
  if (bgGain) {
    bgGain.gain.linearRampToValueAtTime(0, getCtx().currentTime + 0.5);
  }
}

export function playHeartbeat() {
  const c = getCtx();
  const now = c.currentTime;
  [now, now + 0.25].forEach((t) => {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.frequency.value = 80;
    osc.type = 'sine';
    osc.connect(g);
    g.connect(c.destination);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.4, t + 0.05);
    g.gain.linearRampToValueAtTime(0, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.2);
  });
}
