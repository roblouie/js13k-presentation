<script setup lang="ts">
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

const code = `function envelope(
  volume: number,
  decayFactor: number,
  attack: number,
  decay: number,
  sustain: number,
  release: number
): GainNode {
  const gain = new GainNode(audioContext);
  gain.setValueAtTime(0);
  gain.linearRampToValueAtTime(volume, attack);
  gain.setTargetAtTime(volume - decayFactor, attack, decay);
  gain.setTargetAtTime(0, attack + decay + sustain, release);
  return gain;
}`;
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Enveloping
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