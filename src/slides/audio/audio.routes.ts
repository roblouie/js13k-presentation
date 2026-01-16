import AudioOpening from "./AudioOpening.vue";
import Enveloping1 from "./Enveloping1.vue";
import Notes from "./Notes.vue";
import InstrumentSample1 from "./InstrumentSample1.vue";
import Music from "./Music.vue";
import SpatialAudio from "./SpatialAudio.vue";
import AudioBufferIntro from "./AudioBufferIntro.vue";
import DigitalAudioSampling from "./DigitalAudioSampling.vue";
import AudioTiming from "./AudioTiming.vue";
import SoundFunctions from "./SoundFunctions.vue";
import SweepTiming from "./SweepTiming.vue";

export const audioRoutes = [
  { slide: AudioOpening, notes: [] },
    { slide: DigitalAudioSampling, notes: [] },
    { slide: AudioBufferIntro, notes: [
      `const audioCtx = new AudioContext();
const rate = audioCtx.sampleRate;
const myArrayBuffer = audioCtx.createBuffer(1, rate, rate);
const bufferData = myArrayBuffer.getChannelData(0);

const middleCFrequency = 161;
const radians = 2 * Math.PI;
let sweep = 0;
const phaseStep = () => radians * (middleCFrequency + sweep) / audioCtx.sampleRate;
let phase = 0;

let volume = 0;

for (let i = 0; i < bufferData.length; i++) {
  if (i < bufferData.length * 0.33 && volume < 1) {
    volume += 0.0003;
  }
  
  if (i > bufferData.length * 0.66 && volume > 0) {
    volume -= 0.00005;
  }

  bufferData[i] = Math.sin(phase) > 0 ? volume : -volume;
  phase += phaseStep();
  sweep += 0.005;
}

const source = audioCtx.createBufferSource();
source.buffer = myArrayBuffer;
source.connect(audioCtx.destination);
source.start();`,

          'Also remember to show white noise with enveloping because its cool',
    ] },

  { slide: SoundFunctions, notes: [] },

  { slide: AudioTiming, notes: [] },
  { slide: SweepTiming, notes: [] },

];
