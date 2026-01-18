<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`export class GPU {
  static ScreenWidth = 160;
  static ScreenHeight = 144;
  private static HeightIncludingVBlank = 154;

  private static CyclesPerScanlineOam = 80;
  private static CyclesPerScanlineVram = 172;
  private static CyclesPerHBlank = 204;

  private static CyclesPerScanline = GPU.CyclesPerHBlank
                                   + GPU.CyclesPerScanlineOam
                                   + GPU.CyclesPerScanlineVram; // 456 cycles / scanline
  private static CyclesPerVBlank = 4560;
  static CyclesPerFrame = (GPU.CyclesPerScanline * GPU.HeightIncludingVBlank);
}`);

</script>

<template>
  <BaseSlideTemplate>

  <template v-slot:header>
    70224 Cycles Per Frame
  </template>

  <template v-slot:default>
    <div style="height: 90vh; padding: 1em 2em 4em 2em">
      <PrismEditor class="my-editor" style="width: 90vw; font-size: 0.9em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>