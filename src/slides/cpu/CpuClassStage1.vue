<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`class Cpu {
  private programCounter = 0x100;
  private memory: Memory

  constructor(memory: Memory) {
    this.memory = memory;
  }

  runCycle() {
    const operation = this.memory.readByte(this.programCounter);
    this.programCounter++;
    // TODO: Lookup command and run it.
  }
}`);

</script>

<template>
  <BaseSlideTemplate>
  <template v-slot:header>
    CPU
  </template>


  <template v-slot:default>
    <div class="is-flex is-align-items-center" style="height: 80vh; padding: 2em 2em 3em 2em">

      <PrismEditor class="my-editor" style="width: 90vw; font-size: 0.8em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>