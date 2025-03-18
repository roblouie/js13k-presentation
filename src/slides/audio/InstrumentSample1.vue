<script setup lang="ts">
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {audioContext, compressor, InstrumentData, SimplestMidiRev2} from "@/engine/audio/simplest-midi.ts";

const code = `const footstep: InstrumentData[] = [
  {
    waveform: "triangle",
    volume: 0.7,
    tuneFactor: 0.5,
    decay: 0.2,
    release: 0.2,
    pitchBend: 0.95
  },
  {
    waveform: "n1",
    volume: 9,
    output: 1,
    decay: 0.2,
    release: 0.2
  }
]`;


function playNote() {
  const audioPlayer = new SimplestMidiRev2();
  audioPlayer.volume_.connect(compressor);
  const defaults: InstrumentData = {output:0,waveform:"sine",tuneFactor:1,frequency:0,volume:0.5,attack:0,hold:0.01,decay:0.01,sustain:0,release:0.05,pitchBend:1,pitchBendSpeed:1,volumeKeyTracking:0}
  const footstep: InstrumentData[] = [{ ...defaults, waveform:"triangle",volume:0.7,tuneFactor:0.5,decay:0.2,release:0.2,pitchBend:0.95,},{ ...defaults, waveform:"n1",volume:9,output:1,decay:0.2,release:0.2,}]

  audioPlayer.playNote(audioContext.currentTime, 10, 40, footstep, audioContext.currentTime + 1);
}


</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Instrument Sample 1
    </template>

    <template v-slot:default>
      <div class="editor-result-horizontal is-align-items-center">

      <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />

      <div>
        <button @click="playNote()">Play</button>
      </div>
      </div>

    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
.my-editor {
  font-size: 0.8em;
  height: 28em;
}
</style>