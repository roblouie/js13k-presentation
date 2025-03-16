<script setup lang="ts">
// generate texture with noise
// seeded randomness
// -> perlin noise

import {ref} from "vue";
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

const code = ref(`<svg width="512" height="512">
  <filter id="noise">
    <feTurbulence baseFrequency="0.01" />
  </filter>

  <rect width="100%" height="100%" filter="url(#noise)"/>
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

        <PrismEditor class="my-editor" language="markup" v-model="code" :highlight="code => highlight(code, languages.markup)" />

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
  max-height: 24em;
}
</style>