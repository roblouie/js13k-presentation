<script setup lang="ts">
// generate texture with noise
// seeded randomness
// -> perlin noise

import {ref} from "vue";
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

const code = ref(`<svg height="512" width="512">
  <filter height="100%" id="rw" width="100%" x="0" y="0">
    <feDropShadow dx="1" dy="1" result="s"/>
    <feTurbulence baseFrequency="0.007" numOctaves="9" stitchTiles="stitch" type="fractalNoise"/>
    <feComposite in="s" k2="0.5" k3="0.5" operator="arithmetic"/>
    <feComponentTransfer>
      <feFuncA type="table" tableValues="0,0.1,0.2,0.3,0.4,0.2,0.4,0.2,0.4"/>
    </feComponentTransfer>
    <feDiffuseLighting lighting-color="#ffd" surfaceScale="2.5">
      <feDistantLight azimuth="265" elevation="4"/>
    </feDiffuseLighting>
  </filter>
  <rect filter="url(#rw)" height="100%" width="100%"/>
</svg>`);

</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      SVGs are Good
    </template>

    <template v-slot:default>
      <div class="editor-result-horizontal">

        <div v-html="code">

        </div>

        <PrismEditor class="my-editor" language="markup" v-model="code"
                     :highlight="code => highlight(code, languages.markup)"/>

      </div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
canvas {
  width: 20em;
  height: 20em;
  image-rendering: pixelated;
}

.my-editor {
  height: 24em;
  font-size: 0.8em;
}
</style>