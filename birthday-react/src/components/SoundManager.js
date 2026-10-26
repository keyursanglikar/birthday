class SoundManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.muted = false;
    this.synthActive = false;
    this.synthInterval = null;
    this.step = 0;
  }

  getAudioContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.muted ? 0 : 0.45;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  setMuted(isMuted) {
    this.muted = isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = isMuted ? 0 : 0.45;
    }
  }

  tone(freq, delay = 0, duration = 0.5, type = 'sine', volume = 0.1) {
    if (this.muted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime + delay;
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {
      // Audio fallback
    }
  }

  chime() {
    [784, 988, 1175, 1568].forEach((f, i) => this.tone(f, i * 0.08, 0.8, 'sine', 0.12));
  }

  tada() {
    [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, i * 0.08, 0.7, 'triangle', 0.14));
  }

  pop() {
    if (this.muted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const n = ctx.sampleRate * 0.1;
      const b = ctx.createBuffer(1, n, ctx.sampleRate);
      const d = b.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
      const s = ctx.createBufferSource();
      s.buffer = b;
      const g = ctx.createGain();
      g.gain.value = 0.5;
      s.connect(g);
      g.connect(this.masterGain);
      s.start();
    } catch {
      // Audio buffer fallback
    }
  }

  whoosh() {
    this.tone(300, 0, 1.0, 'sine', 0.06);
    this.tone(180, 0, 1.4, 'triangle', 0.05);
  }

  boom() {
    this.tone(90, 0, 0.5, 'sawtooth', 0.2);
    this.tone(60, 0, 0.7, 'sine', 0.25);
    this.pop();
  }

  startRomanticMelody() {
    if (this.synthActive) return;
    this.synthActive = true;
    try {
      this.getAudioContext();
      const chords = [
        [293.66, 369.99, 440.0],
        [220.0, 277.18, 329.63],
        [246.94, 293.66, 369.99],
        [196.0, 246.94, 293.66]
      ];
      this.synthInterval = setInterval(() => {
        if (!this.synthActive) return;
        const chord = chords[Math.floor(this.step / 8) % chords.length];
        const beat = this.step % 8;
        if (beat === 0) {
          chord.forEach(f => this.tone(f / 2, 0, 3.2, 'sine', 0.06));
        }
        this.tone(chord[beat % 3] * 1.5, 0, 0.8, 'triangle', 0.05);
        if (beat % 2 === 0 && Math.random() < 0.7) {
          const notes = [587.33, 659.25, 739.99, 880.0];
          this.tone(notes[(this.step / 2) % notes.length], 0.05, 1.1, 'sine', 0.04);
        }
        this.step++;
      }, 520);
    } catch {
      // Audio synth fallback
    }
  }

  stopRomanticMelody() {
    this.synthActive = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const sounds = new SoundManager();
