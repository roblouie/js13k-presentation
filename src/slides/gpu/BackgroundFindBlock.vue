<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`
// x = scrollX (152) + current pixel in scan line (0) = 152
// y = scrollY (8) + current scan line (10) = 18
private getTileIndexFromPixelLocation(x: number, y: number) {
  const tileSize = 8;
  const backgroundNumberOfTilesPerSide = 32;

  const tileX = Math.floor(x / tileSize); // 152 / 8 = 19
  const tileY = Math.floor(y / tileSize); // 18 / 8 = 2

  // (2 * 32) + 19 = 83
  return (tileY * backgroundNumberOfTilesPerSide) + tileX;
}`);

</script>

<template>
  <BaseSlideTemplate>

  <template v-slot:header>Find Block</template>

  <template v-slot:default>
    <div class="is-flex is-align-items-center" style="height: 80vh; padding: 3em 2em 3em 2em">

      <PrismEditor class="my-editor" style="width: 90vw; font-size: 0.8em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>