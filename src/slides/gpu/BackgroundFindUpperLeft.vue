<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`
// tile = 83, scrollX = 152, scrollY = 18
private getPositionInTile(tile: number, scrollX: number, scrollY: number) {
  const tileSize = 8;
  const backgroundNumberOfTilesPerSide = 32;

  const posY = Math.floor(tile / backgroundNumberOfTilesPerSide); // 83 / 32 = 2
  const posX = tile - posY * backgroundNumberOfTilesPerSide; // 83 - 64 = 19

  const upperLeftCorner = { x: posX * tileSize, y: posY * tileSize }; // x: 152, y: 16
  const posXInTile = scrollX - upperLeftCorner.x; // 152 - 152 = 0
  const posYInTile = scrollY - upperLeftCorner.y; //18 - 16 = 2
  return { x: posXInTile, y: posYInTile };
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