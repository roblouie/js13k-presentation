<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`class Cpu {
  private programCounter = 0x100;
  private memory: Memory;
  private operations: (() => void)[] = [];
  private registers = {
    a: 0,
    f: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    h: 0,
    l: 0,
  };

  constructor(memory: Memory) {
    this.memory = memory;

    // NOP
    this.operations[0b00_000_000] = () => {};

    // JMP
    this.operations[0b11_000_011] = () => {
      const addressToJumpTo = this.memory.readWord(this.programCounter);
      this.programCounter = addressToJumpTo;
    };

    // LD A, N
    this.operations[0b00_111_110] = () => {
      const valueToLoad = this.memory.readByte(this.programCounter);
      this.programCounter++;
      this.registers.a = valueToLoad;
    };

    // LD B, N
    this.operations[0b00_000_110] = () => {
      const valueToLoad = this.memory.readByte(this.programCounter);
      this.programCounter++;
      this.registers.b = valueToLoad;
    };

    // LD C, N
    this.operations[0b00_001_110] = () => {
      const valueToLoad = this.memory.readByte(this.programCounter);
      this.programCounter++;
      this.registers.c = valueToLoad;
    };

    // LD D, N
    this.operations[0b00_101_110] = () => {
      const valueToLoad = this.memory.readByte(this.programCounter);
      this.programCounter++;
      this.registers.d = valueToLoad;
    };

    // LD E, N
    this.operations[0b00_011_110] = () => {
      const valueToLoad = this.memory.readByte(this.programCounter);
      this.programCounter++;
      this.registers.e = valueToLoad;
    };

    // LD H, N
    this.operations[0b00_100_110] = () => {
      const valueToLoad = this.memory.readByte(this.programCounter);
      this.programCounter++;
      this.registers.h = valueToLoad;
    };

    // LD L, N
    this.operations[0b00_101_110] = () => {
      const valueToLoad = this.memory.readByte(this.programCounter);
      this.programCounter++;
      this.registers.l = valueToLoad;
    };
  }
}`);

</script>

<template>
  <BaseSlideTemplate>
  <template v-slot:default>
    <div class="is-flex is-align-items-center" style="height: 90vh; padding: 2em 2em 3em 2em">

      <PrismEditor class="my-editor" style="width: 90vw; font-size: 0.8em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>