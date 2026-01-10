<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

const code = ref(`(0b00_111_110).toString(16);`);

const result = computed(() => {
  try {
    return eval(code.value)
  } catch(e) {
    console.log(e.value);
    return 'Error';
  }
});


</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      <div style="font-size: 0.9em !important;">LD r, n (Load immediate into register)</div>
    </template>

    <template v-slot:default>
      <div class="is-flex flex-column is-align-items-center" style="width: 80vw; margin-bottom: 1em; margin-top: -3em;">
        <PrismEditor class="my-editor" style="width: 60%; height:100%" v-model="code" :highlight="code => highlight(code, languages.js, 'js')" />
        <div class="ml-3">{{ result }}</div>
      </div>
      <img src="./load-immediate.png" style="width: 80vw; filter: invert();" />
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>