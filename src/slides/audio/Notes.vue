<script setup lang="ts">
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

const code = `function playNote(note: number, enveloper: GainNode) {
  const frequency = 440 * 2 ** ((note-69) / 12);
  const oscillator = new OscillatorNode(audioContext);
  oscillator.frequency.value = frequency;
  oscillator.connect(enveloper);
  oscillator.start();
}`;
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Notes
    </template>

    <template v-slot:default>

      <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />

    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
.my-editor {
  height: 25em;
}
</style>