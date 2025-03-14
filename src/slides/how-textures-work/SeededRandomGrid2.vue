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

const code = `const imageData = new EnhancedImageData(300, 300);

let workingSeed = seed;

for (let x = 0; x < 300; x++) {
  for (let y = 0; y < 300; y++) {
    const red = seededRandom(workingSeed) * 255;
    const green = seededRandom(red) * 255;
    const blue = seededRandom(green) * 255;
    workingSeed = blue;
    imageData.setPixel(x, y, red, green, blue);
  }
}

context.putImageData(imageData, 0, 0);`;

onMounted(drawRandomToCanvas);

const seed = ref(5);

const fract = (n: number) => n - Math.floor(n);

function seededRandom(x: number) {
  return fract(Math.sin(x) * 800_000);
}

function drawRandomToCanvas() {
  const context = canvas.value!.getContext('2d')!;
  const { width, height } = context.canvas;

  context.clearRect(0, 0, width, height);

  const imageData = new EnhancedImageData(300, 300);

  const randomByte = (seed: number) => seededRandom(seed) * 255;

  let workingSeed = seed.value;

  for (let x = 0; x < 300; x++) {
    for (let y = 0; y < 300; y++) {
      const red = randomByte(workingSeed);
      const green = randomByte(red);
      const blue = randomByte(green);
      workingSeed = blue;
      imageData.setPixel(x, y, red, green, blue)
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
          <canvas ref="canvas" width="300" height="300" />
          <div class="is-flex is-align-items-center is-justify-content-center mt-3">
            <input class="input mr-6" type="number" v-model="seed" placeholder="seed" />
            <button class="button is-primary" @click="drawRandomToCanvas">Redraw</button>
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