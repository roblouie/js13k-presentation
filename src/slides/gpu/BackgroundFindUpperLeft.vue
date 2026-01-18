<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`
// tile = 83, pixelX = 152, pixelY = 18
private getPositionInTile(tile: number, pixelX: number, pixelY: number) {
  const tileSize = 8;
  const backgroundNumberOfTilesPerSide = 32;

  // Find the upper left corner of our tile in the overall background
  const posY = Math.floor(tile / backgroundNumberOfTilesPerSide); // 83 / 32 = 2
  const posX = tile - posY * backgroundNumberOfTilesPerSide; // 83 - 64 = 19
  const upperLeftCorner = { x: posX * tileSize, y: posY * tileSize }; // x: 152, y: 16

  // Now if we subtract the upper left corner of the tile from our tile from our
  // overall pixel position, we will get the pixel in the tile
  const posXInTile = pixelX - upperLeftCorner.x; // 152 - 152 = 0
  const posYInTile = pixelY - upperLeftCorner.y; //18 - 16 = 2
  return { x: posXInTile, y: posYInTile };
}`);

</script>

<template>
  <BaseSlideTemplate>

  <template v-slot:header>Find Pixel in Tile</template>

  <template v-slot:default>
    <div class="is-flex is-align-items-center" style="height: 83vh; padding: 2em;">

      <PrismEditor class="my-editor" style="width: 90vw; font-size: 0.8em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>