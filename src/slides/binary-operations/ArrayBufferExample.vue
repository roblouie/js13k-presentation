<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {computed, ref} from "vue";

const code = ref(`const testBuffer = new ArrayBuffer(8);`);

const result = computed(() => {
  try {
    return eval(code.value)
  } catch(e) {
    console.log(e.value);
  }

});

const testBuffer = new ArrayBuffer(8);
const byteArray = new Uint8Array(testBuffer);
const twoByteArray = new Uint16Array(testBuffer);
const dataView = new DataView(testBuffer);
byteArray[0] = 0xff;
byteArray[1] = 0x10;
byteArray[2] = 0xa8;
byteArray[3] = 0x3c;
twoByteArray.length;
</script>

<template>
  <BaseSlideTemplate>

  <template v-slot:header>
    ArrayBuffer Example
  </template>

  <template v-slot:default>
    <div class="is-flex is-align-items-center" style="height: 100vh; padding: 3em 2em 3em 2em">

      <PrismEditor class="my-editor" style="width: 65vw;" v-model="code" :highlight="code => highlight(code, languages.js, 'js')" />

      <div style="width: 30vw; text-align: center; font-size: 1em;">
        {{ result }}
      </div>
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>