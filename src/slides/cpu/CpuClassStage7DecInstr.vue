<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`// Dec r
this.registers.baseRegisters.forEach(register => {
  this.operations[(register.code << 3) + 0b101] = () => {
    const newValue = (register.value - 1) & 0xff;
    registers.F.isResultZero = newValue === 0;
    registers.F.isHalfCarry = (register.value & 0x0f) === 0;
    registers.F.isSubtraction = true;
    register.value = newValue;
  };
});`);

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      <img src="./dec-r-instr.png" style="width: 80vw; filter: invert();" />
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