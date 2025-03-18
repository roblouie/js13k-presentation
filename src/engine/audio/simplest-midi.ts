export const audioContext = new AudioContext();
export const compressor = audioContext.createDynamicsCompressor();
export const biquadFilter = audioContext.createBiquadFilter();
biquadFilter.type = 'lowshelf';
biquadFilter.frequency.value = 500;
biquadFilter.gain.value = 20;
biquadFilter.connect(compressor);
compressor.threshold.value = -50;
compressor.knee.value = 40;
compressor.ratio.value = 12;
compressor.connect(audioContext.destination);

export type InstrumentData = {
  output: number; // Output destination, 0= output, n = fm to specified oscillator
  waveform: 'sawtooth' | 'square' | 'triangle' | 'sine' | 'n0' | 'n1'; // waveform
  volume: number; // volume
  tuneFactor: number; // tune factor according to note#
  frequency: number; // fixed frequency in Hz
  attack: number; // attack time
  hold: number; // hold time
  decay: number; // decay time
  sustain: number; // sustain level
  release: number; // release time
  pitchBend: number; // pitch bend
  pitchBendSpeed: number; // pitch bend speed factor
  volumeKeyTracking: number; // volume key tracking factor
}

const blen = audioContext.sampleRate * 0.5;
const noiseBuf={};
noiseBuf['n0'] = audioContext.createBuffer(1,blen,audioContext.sampleRate);
noiseBuf['n1'] = audioContext.createBuffer(1,blen,audioContext.sampleRate);
for(let i=0;i<blen;++i){
  noiseBuf['n0'].getChannelData(0)[i]=Math.random()*2-1;
}
for(let jj=0;jj<64;++jj){
  const r1=Math.random()*10+1;
  const r2=Math.random()*10+1;
  for(let i=0;i<blen;++i){
    const dd=Math.sin((i/blen)*2*Math.PI*440*r1)*Math.sin((i/blen)*2*Math.PI*440*r2);
    noiseBuf['n1'].getChannelData(0)[i]+=dd/8;
  }
}

export class SimplestMidiRev2 {
  volume_ = audioContext.createGain();
  modulator = audioContext.createGain();
  bend = 0;

  constructor() {}

  playNote(startTime: number, note: number, volume: number,instrumentDatas: InstrumentData[], duration: number) {
    let out;
    let sc;
    const o: any[] =[]; // Oscillator or audiobuffersourcenode
    const g: GainNode[] = [];
    const vp=[];
    const fp: any=[];
    const releases=[];
    const frequency=440*2**((note-69)/12);
    for(let i=0;i<instrumentDatas.length;++i) {
      const instrumentInfo=instrumentDatas[i];

      if(instrumentInfo.output === 0) {
        out=this.volume_;
        sc=volume*volume/16384;
        // pn.t is tune factor according to note#
        // pn.f is fixed frequency in Hz.
        // This seems to be using these values to get the frequency of the note
        fp[i]=frequency*instrumentInfo.tuneFactor+instrumentInfo.frequency;
      }
      else if(o[instrumentInfo.output - 1].frequency) {
        out = o[instrumentInfo.output - 1].frequency;
        sc = fp[instrumentInfo.output - 1];
        fp[i] = fp[instrumentInfo.output - 1] * instrumentInfo.tuneFactor + instrumentInfo.frequency;
      }
      else {
        out=o[instrumentInfo.output - 1].playbackRate;
        sc = fp[instrumentInfo.output - 1] / 440;
        fp[i] = fp[instrumentInfo.output - 1] * instrumentInfo.tuneFactor + instrumentInfo.frequency;
      }
      switch(instrumentInfo.waveform[0]){
        case "n":
          o[i]=audioContext.createBufferSource();
          o[i].buffer=noiseBuf[instrumentInfo.waveform as 'n0' |'n1'];
          o[i].loop=true;
          o[i].playbackRate.value=fp[i]/440;
          if(instrumentInfo.pitchBend!=1)
            this._setParamTarget(o[i].playbackRate,fp[i]/440*instrumentInfo.pitchBend,startTime,instrumentInfo.pitchBendSpeed);
          if (o[i].detune) {
            this.modulator.connect(o[i].detune);
            o[i].detune.value=this.bend;
          }
          break;
        default:
          const oscillator = new OscillatorNode(audioContext);
          // Creates oscillator for notes that aren't noise based
          o[i]=audioContext.createOscillator();

          // sets the frequency as determined in the previous part
          o[i].frequency.value=fp[i];

          // If there's a pitch bend set the frequency at time using q which is the pitch bend speed factor
          if(instrumentInfo.pitchBend!=1)
            this._setParamTarget(o[i].frequency,fp[i]*instrumentInfo.pitchBend,startTime,instrumentInfo.pitchBendSpeed);

          o[i].type=instrumentInfo.waveform; // Wave type is set here for set wave types like sine, triangle, etc
          if (o[i].detune) {
            this.modulator.connect(o[i].detune);
            o[i].detune.value=this.bend;
          }
          break;
      }

      g[i]=audioContext.createGain(); // gain node for this note
      releases[i]=instrumentInfo.release; // release time for this note
      o[i].connect(g[i]); // connect the oscillator to the gain node
      g[i].connect(out); // connect the gain node to the output
      vp[i]=sc*instrumentInfo.volume; // pn.v is volume, but not 100% sure on vp[i], but sees to set volume
      if(instrumentInfo.volumeKeyTracking) // pn.k is volume key tracking factor. Som adjustment is made to volume based on this if present
        vp[i]*=2**((note-60)/12*instrumentInfo.volumeKeyTracking);
      if(instrumentInfo.attack){ // pn.a is attack, and the following code sets the attack by setting gain to 0 then ramping to volume at time
        g[i].gain.value=0;
        g[i].gain.setValueAtTime(0,startTime);
        g[i].gain.linearRampToValueAtTime(vp[i],startTime+instrumentInfo.attack);
      }
      else // if there's no attack, just set the gain to the volume at time
        g[i].gain.setValueAtTime(vp[i],startTime);

      const startupDuration=startTime+instrumentInfo.attack+instrumentInfo.hold;
      this._setParamTarget(g[i].gain,instrumentInfo.sustain*vp[i],startupDuration,instrumentInfo.decay); // sets decay / off of the note, based on whether there is a decay (pn.d)
      o[i].start(startTime); // start the oscillator

      // Stop oscillators when they finish
      for(let k=g.length-1;k>=0;--k){
        g[k].gain.cancelScheduledValues(instrumentInfo.decay + duration);
        this._setParamTarget(g[k].gain,0,duration,instrumentInfo.decay);
        o[i].stop(duration + instrumentInfo.decay);
      }
    }
  }

  private _setParamTarget(audioParam: AudioParam,value: number, startTime: number, duration: number) {
    if(duration!=0) // If there's a duration
      audioParam.setTargetAtTime(value,startTime,duration); // use setTargetAtTime to gradually adjust to new value
    else
      audioParam.setValueAtTime(value,startTime); // otherwise set it instantly at time
  }
}
