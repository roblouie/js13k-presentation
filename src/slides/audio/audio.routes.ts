import AudioOpening from "./AudioOpening.vue";
import Enveloping1 from "./Enveloping1.vue";
import Enveloping2 from "./Enveloping2.vue";
import Notes from "./Notes.vue";

export const audioRoutes = [
  { slide: AudioOpening, notes: [
    `We cover audio first since it's a fairly standard usage of the WebAudio API`,
      `Review the synth image shown and talk about how oscillators can be passed into other inputs, etc`,
      'We can use these tools to make "instruments", which can be musical instruments to make music with, or individual sound effects'
    ] },
  { slide: Enveloping1, notes: [
    'To make any sort of instruments, we need a couple things, first is enveloping',
    ] },
  { slide: Enveloping2, notes: [
    `We can use linearRampToValueAtTime, because we don't need a start time here`,
      `We can now attach this gain node to any other audio node and we have enveloping`,
    ] },
  { slide: Notes, notes: [
    `We use midi key values. This is useful not only because it's a standard where we can use any tool to create music and export the notes, but also because we can make the requencies`
    ] },
];
