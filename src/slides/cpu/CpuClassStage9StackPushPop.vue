<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`pushToStack(word: number) {
  this.registers.stackPointer.value -= 2;
  memory.writeWord(this.registers.stackPointer.value, word);
}

popFromStack() {
  const value = memory.readWord(this.registers.stackPointer.value);
  this.registers.stackPointer.value += 2;

  return value;
}`);

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      CPU Stack Push / Pop
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