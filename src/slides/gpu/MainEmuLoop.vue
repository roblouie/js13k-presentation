<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`// Inside gameboy.ts
// For each frame in requestAnimationFrame, limited to 60fps
while (this.cycles <= GPU.CyclesPerFrame) {
  const cycleForTick = this.cpu.tick();
  this.gpu.tick(cycleForTick);
  this.apu.tick(cycleForTick);
  this.cycles += cycleForTick;
}

this.cycles -= GPU.CyclesPerFrame;
`);

</script>

<template>
  <BaseSlideTemplate>

  <template v-slot:header>
    Main Loop
  </template>

  <template v-slot:default>
    <div style="height: 65vh; padding: 1em 2em 4em 2em">
      <PrismEditor class="my-editor" style="width: 90vw; font-size: 0.9em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>