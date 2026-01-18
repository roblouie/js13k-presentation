<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`// PC - 2 bytes
// SP - 2 bytes
// A, F, B, C, D, E, H, L - 1 byte each
const registersView = new DataView(new ArrayBuffer(12));

this.F = new CpuFlagRegister(0, registersView, -1);
this.A = new CpuRegister(1, registersView, 0b111);
this.C = new CpuRegister(2, registersView, 0b001);
this.B = new CpuRegister(3, registersView, 0b000);
this.E = new CpuRegister(4, registersView, 0b011);
this.D = new CpuRegister(5, registersView, 0b010);
this.L = new CpuRegister(6, registersView, 0b101);
this.H = new CpuRegister(7, registersView, 0b100);

this.AF = new DoubleCpuRegister(0, registersView, 0b11);
this.BC = new DoubleCpuRegister(2, registersView, 0b00);
this.DE = new DoubleCpuRegister(4, registersView, 0b01);
this.HL = new DoubleCpuRegister(6, registersView, 0b10);

this.programCounter = new DoubleCpuRegister(8, registersView, -1);
this.stackPointer = new DoubleCpuRegister(10, registersView, 0b11);

this.baseRegisters = [this.A, this.B, this.C, this.D, this.E, this.H, this.L];
this.registerPairs = [this.AF, this.BC, this.DE, this.HL, this.stackPointer];`);

</script>

<template>
  <BaseSlideTemplate>
  <template v-slot:default>
    <div class="is-flex is-align-items-center" style="height: 94vh; padding: 2em 2em 3em 2em">

      <PrismEditor class="my-editor" style="width: 90vw; font-size: 0.8em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>