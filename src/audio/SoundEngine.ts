class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private panner: StereoPannerNode | null = null;
  private droneGain: GainNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;
  private targetFilterFreq: number = 140;

  constructor() {
    // AudioContext will be initialized on user gesture (Beat 0)
  }

  public init(): boolean {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return true;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output stage with safety dynamics compressor to prevent clipping
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-16, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(10, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.65, this.ctx.currentTime);

      // Stereo panner for cursor spatialization
      if (this.ctx.createStereoPanner) {
        this.panner = this.ctx.createStereoPanner();
        this.panner.pan.setValueAtTime(0, this.ctx.currentTime);
        this.masterGain.connect(this.compressor);
        this.compressor.connect(this.panner);
        this.panner.connect(this.ctx.destination);
      } else {
        this.masterGain.connect(this.compressor);
        this.compressor.connect(this.ctx.destination);
      }

      this.startAmbientDrone();
      this.isInitialized = true;
      return true;
    } catch (e) {
      console.warn('Web Audio API initialization failed:', e);
      return false;
    }
  }

  private startAmbientDrone() {
    if (!this.ctx || !this.masterGain) return;

    // Filter stage for the drone (modulated by scroll velocity)
    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(140, this.ctx.currentTime);
    this.droneFilter.Q.setValueAtTime(2.2, this.ctx.currentTime);

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    // Smooth fade in over 2 seconds
    this.droneGain.gain.exponentialRampToValueAtTime(0.24, this.ctx.currentTime + 2.0);

    // Osc 1: Sub-bass 48 Hz sine
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(48, this.ctx.currentTime);

    // Osc 2: Detuned 51.8 Hz triangle for rhythmic interference pulse
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(51.8, this.ctx.currentTime);

    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc2.connect(this.droneFilter);
    this.droneFilter.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  /**
   * Modulate the drone low-pass filter based on scroll velocity
   */
  public updateScrollVelocity(velocity: number) {
    if (!this.ctx || !this.droneFilter || this.isMuted) return;
    if (this.ctx.state !== 'running') return;

    const absVel = Math.min(Math.abs(velocity), 100);
    // Velocity scales the filter from 140 Hz up to 1800 Hz
    this.targetFilterFreq = 140 + Math.pow(absVel / 100, 1.2) * 1660;

    const now = this.ctx.currentTime;
    this.droneFilter.frequency.setTargetAtTime(this.targetFilterFreq, now, 0.08);
  }

  /**
   * Pan sounds subtly left-to-right based on mouse cursor X (-1.0 to 1.0)
   */
  public updateCursorPan(normalizedX: number) {
    if (!this.ctx || !this.panner) return;
    if (this.ctx.state !== 'running') return;
    const clampedPan = Math.max(-0.5, Math.min(0.5, normalizedX * 0.5));
    this.panner.pan.setTargetAtTime(clampedPan, this.ctx.currentTime, 0.05);
  }

  /**
   * Section Notch Tick: Ultra-short synthetic click when crossing section boundaries
   */
  public playSectionTick() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state !== 'running') return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.035);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  /**
   * Button Hover Blip: Subtle high-frequency acoustic feedback
   */
  public playHoverBlip(freq = 1350) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state !== 'running') return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.4, now + 0.03);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.035);
  }

  /**
   * Button Click / Interaction confirmation
   */
  public playClickBeep() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state !== 'running') return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.setValueAtTime(1760, now + 0.025);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.065);
  }

  /**
   * Project Collision Trigger / Cinematic Sub-Impact Boom
   */
  public playSubImpact() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state !== 'running') return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Heavy bass drop: 100 Hz down to 24 Hz
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(24, now + 0.7);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.85);
  }

  /**
   * Ignition Riser: Played during Beat 0 -> Beat 1 gate entry
   */
  public playIgnitionSequence() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    // Riser oscillator
    const riserOsc = this.ctx.createOscillator();
    const riserGain = this.ctx.createGain();
    riserOsc.type = 'sawtooth';
    riserOsc.frequency.setValueAtTime(55, now);
    riserOsc.frequency.exponentialRampToValueAtTime(420, now + 1.0);

    const riserFilter = this.ctx.createBiquadFilter();
    riserFilter.type = 'lowpass';
    riserFilter.frequency.setValueAtTime(180, now);
    riserFilter.frequency.exponentialRampToValueAtTime(2200, now + 1.0);

    riserGain.gain.setValueAtTime(0.01, now);
    riserGain.gain.linearRampToValueAtTime(0.18, now + 0.85);
    riserGain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    riserOsc.connect(riserFilter);
    riserFilter.connect(riserGain);
    riserGain.connect(this.masterGain);

    riserOsc.start(now);
    riserOsc.stop(now + 1.15);

    setTimeout(() => {
      this.playSubImpact();
    }, 1000);
  }

  // --- 404 REBELS 3D TALWAR DUEL SOUND EFFECTS ---

  /**
   * Synthesizes a rapid aerodynamic sword swing / whoosh
   */
  public playSwordSwing(pitchOffset: number = 0): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Buffer noise generation for whoosh air turbulence
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.8;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(4.0, now);
    const startFreq = 1400 + pitchOffset * 200;
    filter.frequency.setValueAtTime(startFreq, now);
    filter.frequency.exponentialRampToValueAtTime(280, now + 0.22);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.23);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseSource.start(now);
    noiseSource.stop(now + 0.24);
  }

  /**
   * Synthesizes a sharp, metallic blade clash with inharmonic ringing overtones
   */
  public playSwordClash(intensity: number = 1.0): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Metallic Inharmonic Ringing Components (Talwar high-tensile steel)
    const freqs = [1980, 2640, 4200];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();
      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq + (Math.random() * 40 - 20), now);

      const amp = (0.28 / (idx + 1)) * intensity;
      oscGain.gain.setValueAtTime(amp, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35 + idx * 0.08);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + 0.45);
    });

    // Sharp impact noise transient
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(3200, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4 * intensity, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.04);
  }

  /**
   * Synthesizes the plasma energy buildup as talwars lock together
   */
  public playEnergyCharge(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 1.2);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(5, now);
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 1.2);

    // Tremolo LFO for crackling plasma effect
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(28, now);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.12, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 1.0);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

    lfo.connect(gain.gain);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    lfo.start(now);
    osc.start(now);
    lfo.stop(now + 1.25);
    osc.stop(now + 1.25);
  }

  /**
   * Synthesizes the climactic 404 Rebels genesis shockwave detonation
   */
  public playGenesisShockwave(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Sub-harmonic concussion boom
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.85);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.75, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 1.15);

    // Explosive sonic burst
    const bufferSize = this.ctx.sampleRate * 0.9;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.2));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + 0.8);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.95);
  }

  public toggleMute(): boolean {
    if (!this.ctx || !this.masterGain) return false;

    this.isMuted = !this.isMuted;
    const now = this.ctx.currentTime;
    if (this.isMuted) {
      this.masterGain.gain.setTargetAtTime(0.0001, now, 0.05);
    } else {
      this.masterGain.gain.setTargetAtTime(0.65, now, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsInitialized(): boolean {
    return this.isInitialized;
  }
}

export const soundEngine = new SoundEngine();
