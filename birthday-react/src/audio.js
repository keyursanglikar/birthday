class RomanticSoundEngine {
  constructor() {
    this.audio = null;
    this.synthActive = false;
    this.synthTimer = null;
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.volume = 0.45;
    this.step = 0;
  }

  initAudio(src) {
    if (!this.audio && typeof Audio !== 'undefined') {
      this.audio = new Audio();
      this.audio.src = src || '/music/tum-se-hi.mp3';
      this.audio.loop = true;
      this.audio.volume = this.volume;

      // Gracefully switch to ambient acoustic piano synthesizer if MP3 is missing
      this.audio.addEventListener('error', () => {
        this.startAmbientSynth();
      });
    }
  }

  play(src) {
    this.initAudio(src);
    if (this.audio) {
      const promise = this.audio.play();
      if (promise !== undefined) {
        promise.catch(() => {
          this.startAmbientSynth();
        });
      }
    } else {
      this.startAmbientSynth();
    }
  }

  pause() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
    this.stopAmbientSynth();
  }

  togglePlay() {
    if (this.audio && !this.audio.paused) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.audio) {
      this.audio.muted = muted;
    }
    if (this.masterGain) {
      this.masterGain.gain.value = muted ? 0 : this.volume;
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    if (this.masterGain && !this.isMuted) {
      this.masterGain.gain.value = this.volume;
    }
  }

  getAudioContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.isMuted ? 0 : this.volume * 0.4;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  tone(freq, delay = 0, duration = 0.8, type = 'sine', vel = 0.1) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime + delay;
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(vel, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Audio fallback
    }
  }

  startAmbientSynth() {
    if (this.synthActive) return;
    this.synthActive = true;
    try {
      this.getAudioContext();
      // Gentle romantic melody resembling soft acoustic progression (D - A - Bm - G)
      const chords = [
        [293.66, 369.99, 440.0], // D
        [220.0, 277.18, 329.63], // A
        [246.94, 293.66, 369.99], // Bm
        [196.0, 246.94, 293.66]  // G
      ];
      this.synthTimer = setInterval(() => {
        if (!this.synthActive) return;
        const chord = chords[Math.floor(this.step / 8) % chords.length];
        const beat = this.step % 8;
        if (beat === 0) {
          chord.forEach(f => this.tone(f / 2, 0, 3.2, 'sine', 0.08));
        }
        this.tone(chord[beat % 3] * 1.5, 0, 0.9, 'triangle', 0.06);
        if (beat % 2 === 0) {
          const melody = [587.33, 659.25, 739.99, 880.0];
          this.tone(melody[(this.step / 2) % melody.length], 0.1, 1.2, 'sine', 0.04);
        }
        this.step++;
      }, 540);
    } catch {
      // Audio fallback
    }
  }

  stopAmbientSynth() {
    this.synthActive = false;
    if (this.synthTimer) {
      clearInterval(this.synthTimer);
      this.synthTimer = null;
    }
  }
}

export const soundManager = new RomanticSoundEngine();
