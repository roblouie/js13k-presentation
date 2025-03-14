<script setup lang="ts">
// generate texture with noise
// seeded randomness
// -> perlin noise

import {onMounted, ref} from "vue";
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {EnhancedImageData} from "../../utils.ts";

const canvas = ref<HTMLCanvasElement>(null);

const code = `const imageData = new EnhancedImageData(3, 3);

const randomByte = () => Math.random() * 255;

for (let x = 0; x < 3; x++) {
  for (let y = 0; y < 3; y++) {
    const red = randomByte();
    const green = randomByte();
    const blue = randomByte();
    imageData.setPixel(x, y, red, green, blue);
  }
}

context.putImageData(imageData, 0, 0);`;

onMounted(drawRandomToCanvas)

function drawRandomToCanvas() {
  const context = canvas.value!.getContext('2d')!;
  const { width, height } = context.canvas;

  context.clearRect(0, 0, width, height);

  const imageData = new EnhancedImageData(3, 3);

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      imageData.setPixel(x, y, Math.random() * 255, Math.random() * 255, Math.random() * 255)
    }
  }

  context.putImageData(imageData, 0, 0);
}

</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Random Number
    </template>

    <template v-slot:default>
      <div class="editor-result-horizontal">
        <div>
          <canvas ref="canvas" width="3" height="3" />
          <div class="is-flex is-align-items-center is-justify-content-center mt-3">

            <button class="button is-primary" @click="drawRandomToCanvas()">Redraw</button>

          </div>
        </div>


        <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.js, 'js')" />

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
</style>