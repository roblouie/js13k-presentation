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
import ApuOrchestration from "./ApuOrchestration.vue";
import Audio1 from "./Audio1.vue";
import AudioCycleVisualizer from "./AudioCycleVisualizer.vue";
import VisualizerSlide from "./VisualizerSlide.vue";

export const audioRoutes = [
  { slide: AudioOpening, notes: [] },
    { slide: DigitalAudioSampling, notes: [] },
    { slide: AudioBufferIntro, notes: [
        `start with white noise and explain buffer data in general`,
          `replace white noise with a sin wave`,
          `const noteFrequency = 161;
const radians = 2 * Math.PI;
const phaseStep = radians * noteFrequency / rate;
let phase = 0;
for (let i = 0; i < bufferData.length; i++) {
  bufferData[i] = Math.sin(phase);
  phase += phaseStep;
}`,

    `Now convert to square wave with Math.sin(phase) > 0 ? -1 : 1. ADD DUTY CYCLES`,

          `Then add sweep:`,

          `const noteFrequency = 161;
let sweep = 0;
const radians = 2 * Math.PI;
const phaseStep = () => radians * (noteFrequency + sweep) / rate;
let phase = 0;
for (let i = 0; i < bufferData.length; i++) {
  bufferData[i] = Math.sin(phase);
  phase += phaseStep();
  sweep += -0.001
}`,


      `const noteFrequency = 21;
const radians = 2 * Math.PI;
let sweep = 0;
const phaseStep = () => radians * (noteFrequency + sweep) / rate;
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
  sweep += 0.001;
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
  { slide: ApuOrchestration, notes: [] },
  { slide: Audio1, notes: [] },
  { slide: VisualizerSlide, notes: [] },

];
