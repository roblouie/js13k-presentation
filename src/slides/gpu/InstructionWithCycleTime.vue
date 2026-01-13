<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`// JMP nn
this.operations[0b11_000_011] = {
  cycles: 4,
  execute() {
    const addressToJumpTo = this.memory.readWord(this.programCounter);
    this.programCounter = addressToJumpTo;
  }
};`);

</script>

<template>
  <BaseSlideTemplate>

  <template v-slot:header>
    Instruction with Cycles
  </template>

  <template v-slot:default>
    <div style="height: 55vh; padding: 1em 2em 4em 2em">
      <PrismEditor class="my-editor" style="width: 90vw; font-size: 0.9em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>