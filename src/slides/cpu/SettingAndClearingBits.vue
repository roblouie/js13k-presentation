<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {computed, ref} from "vue";

const code = ref(`  0b0100_0000
| 0b0000_0000`);

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
    Setting and Clearing Bits
  </template>

  <template v-slot:default>
    <div class="is-flex is-flex-direction-column" style="height: 100vh; padding: 3em 2em 3em 2em">

      <PrismEditor class="my-editor" style="width: 60vw; height: 25vh; font-size: 1.5em;" v-model="code" :highlight="code => highlight(code, languages.js, 'js')" />

      <div style="border-top: 4px solid white; font-size: 1.5em; padding-left: 2em; padding-top: 0.5em; font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;">
        0b{{ result.toString(2).padStart(8, '0').substring(0, 4) }}_{{ result.toString(2).padStart(8, '0').substring(4) }}
      </div>
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>