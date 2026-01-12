<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`// JP NZ
this.operations[0b11_000_010] = () => {
  if (!registers.F.isResultZero) {
    const addressToJumpTo = memory.readWord(registers.programCounter.value);
    registers.programCounter.value = addressToJumpTo;
  } else {
    registers.programCounter.value += 2;
  }
};`);

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      JP NZ (Jump if Non Zero)
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