<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

const code = ref(`(0b11_000_011).toString(16);`);

const result = computed(() => {
  try {
    return eval(code.value)
  } catch(e) {
    console.log(e.value);
  }
});


</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Instruction Cycles
    </template>

    <template v-slot:default>
      <img src="../cpu/nop.png" style="width: 60vw; filter: invert();" />
      <img src="../cpu/jp-instr.png" style="width: 60vw; filter: invert();" />
      <img src="../cpu/dec-r-instr.png" style="width: 60vw; filter: invert();" />
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
img {
  margin-bottom: 0.5em;
}
</style>