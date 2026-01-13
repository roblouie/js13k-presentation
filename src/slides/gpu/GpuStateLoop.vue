<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`tick(cycles: number) {
  this.cycleCounter += cycles;

  switch (lcdStatusRegister.mode) {
    case LcdStatusMode.SearchingOAM:
      if (this.cycleCounter >= this.cyclesPerScanlineOam) { // 80 cycles
        this.cycleCounter -= this.cyclesPerScanlineOam;
        lcdStatusRegister.mode = LcdStatusMode.TransferringDataToLCD;
      }
      break;

    case LcdStatusMode.TransferringDataToLCD:
      if (this.cycleCounter >= this.cyclesPerScanlineVram) { // 172 cycles
        this.cycleCounter -= this.cyclesPerScanlineVram;

        lcdStatusRegister.mode = LcdStatusMode.InHBlank;
      }
      break;

    case LcdStatusMode.InHBlank:
      if (this.cycleCounter >= GPU.CyclesPerHBlank) { // 204 cycles
        this.drawScanline();

        this.cycleCounter -= GPU.CyclesPerHBlank;

        lineYRegister.value++;

        if (lineYRegister.value === GPU.ScreenHeight) { // 144 lines
          lcdStatusRegister.mode = LcdStatusMode.InVBlank;
        } else {
          lcdStatusRegister.mode = LcdStatusMode.SearchingOAM;
        }
      }
      break;

    case LcdStatusMode.InVBlank:
      if (this.cycleCounter >= GPU.CyclesPerScanline) {
        lineYRegister.value++;

        this.cycleCounter -= GPU.CyclesPerScanline;

        if (lineYRegister.value === GPU.HeightIncludingOffscreen) { // 154 lines
          lcdStatusRegister.mode = LcdStatusMode.SearchingOAM;
          lineYRegister.value = 0;
        }
      }
      break;
  }
}`);

</script>

<template>
  <BaseSlideTemplate>

  <template v-slot:header>
    Gpu Tick
  </template>

  <template v-slot:default>
    <div style="height: 85vh; padding: 1em 2em 4em 2em">
      <PrismEditor class="my-editor" style="width: 90vw; font-size: 0.8em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>