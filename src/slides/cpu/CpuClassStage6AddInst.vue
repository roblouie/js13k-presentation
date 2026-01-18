<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`// Add A, r
this.registers.baseRegisters.forEach(register => {
  this.operations[0b10000000 + register.code] = () => {
    const newValue = accumulatorVal + toAdd;
    registers.F.isResultZero = (newValue & 0xff) === 0;
    registers.F.isHalfCarry = ((accumulatorVal & 0x0f) + (toAdd & 0x0f)) > 0x0f;
    registers.F.isSubtraction = false;
    registers.F.isCarry = newValue > 0xff;
    registers.A.value = newValue;
  };
});`);

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Add A, r
    </template>
  <template v-slot:default>
    <div class="is-flex is-align-items-center" style="height: 65vh; padding: 2em 2em 3em 2em; margin-top: -1em;">

      <PrismEditor class="my-editor" style="width: 95vw; font-size: 0.9em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>