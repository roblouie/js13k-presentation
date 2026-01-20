<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`// Load R, N
this.registers.baseRegisters.forEach(register => {
  this.operations[(register.code << 3) + 0b110] = () => {
    const valueToLoad = memory.readByte(registers.programCounter.value);
    registers.programCounter.value++;
    register.value = valueToLoad;
  }
});`);

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      LD R, N Definition
    </template>
  <template v-slot:default>
    <div class="is-flex is-align-items-center" style="height: 50vh; padding: 2em 2em 3em 2em; margin-top: -1em;">

      <PrismEditor class="my-editor" style="width: 90vw; font-size: 0.8em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>