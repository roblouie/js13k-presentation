<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {computed, ref} from "vue";

const code = ref(`const hexColor = 0xFC10A8;`);

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
    <span style="color: #FC10A8">CSS COLOR: </span>
    <span style="color: red">FC</span>
    <span style="color: green">10</span>
    <span style="color: blue">A8</span>
  </template>

  <template v-slot:default>
    <div class="is-flex is-align-items-center" style="height: 100vh; padding: 3em 2em 3em 2em">

      <PrismEditor class="my-editor" style="width: 60vw;" v-model="code" :highlight="code => highlight(code, languages.js, 'js')" />

      <div style="width: 35vw; text-align: center; font-size: 1.3em;">
        {{ result }}
      </div>
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>