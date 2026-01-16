import AudioOpening from "./AudioOpening.vue";
import Enveloping1 from "./Enveloping1.vue";
import Enveloping2 from "./Enveloping2.vue";
import Notes from "./Notes.vue";
import InstrumentSample1 from "./InstrumentSample1.vue";
import Music from "./Music.vue";
import SpatialAudio from "./SpatialAudio.vue";
import AudioBufferIntro from "./AudioBufferIntro.vue";

export const audioRoutes = [
  { slide: AudioOpening, notes: [] },
  { slide: AudioBufferIntro, notes: [
      `const audioCtx = new AudioContext();
const myArrayBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate, audioCtx.sampleRate);
const bufferData = myArrayBuffer.getChannelData(0);


const middleCFrequency = 161;
const radians = 2 * Math.PI;
const phaseStep = radians * middleCFrequency / audioCtx.sampleRate;
let phase = 0;

for (let i = 0; i < bufferData.length; i++) {
  bufferData[i] = Math.sin(phase) > 0 ? 1 : -1;
  phase += phaseStep;
}


const source = audioCtx.createBufferSource();
source.buffer = myArrayBuffer;
source.connect(audioCtx.destination);
source.start();`
    ] }

];
