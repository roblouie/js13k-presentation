<script setup lang="ts">
// generate texture with noise
// seeded randomness
// -> perlin noise

import {ref} from "vue";
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      SVGs are Good
    </template>

    <template v-slot:default>
      <img src="./upyri-skybox-top.svg" />
      <div class="subtext">2048x2048 skybox top</div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
canvas {
  width: 20em;
  height: 20em;
  image-rendering: pixelated;
}

.subtext {
  font-size: 1.2em;
  margin-top: 1em;
}

img {
  height: 23em;
}
</style>