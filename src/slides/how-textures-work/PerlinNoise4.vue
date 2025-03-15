<script setup lang="ts">
// generate texture with noise
// seeded randomness
// -> perlin noise

import {onMounted, ref} from "vue";
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import "prismjs/components/prism-typescript";
import {PrismEditor} from "vue-prism-editor";
import {EnhancedImageData} from "../../utils.ts";

const canvas = ref<HTMLCanvasElement>(null);

const code = `class PerlinNoise {
  private perm: number[] = [];

  constructor(seed: number) {
    this.perm = this.generatePermutationTable(seed);
  }

  private generatePermutationTable(seed: number): number[] {
    const table = new Array(512);
    const perm = new Array(256).fill(0).map((_, i) => i);

    let random = seed;
    for (let i = 255; i > 0; i--) {
      random = seededRandom(random)
      const j = random % (i + 1);
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }

    for (let i = 0; i < 512; i++) {
      table[i] = perm[i & 255];
    }

    return table;
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return (h & 1 ? -u : u) + (h & 2 ? -2.0 * v : 2.0 * v);
  }

  noise(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = this.fade(x);
    const v = this.fade(y);

    const aa = this.perm[X] + Y;
    const ab = this.perm[X] + Y + 1;
    const ba = this.perm[X + 1] + Y;
    const bb = this.perm[X + 1] + Y + 1;

    const gradAA = this.grad(this.perm[aa], x, y);
    const gradBA = this.grad(this.perm[ba], x - 1, y);
    const gradAB = this.grad(this.perm[ab], x, y - 1);
    const gradBB = this.grad(this.perm[bb], x - 1, y - 1);

    const lerpX1 = this.lerp(gradAA, gradBA, u);
    const lerpX2 = this.lerp(gradAB, gradBB, u);

    return this.lerp(lerpX1, lerpX2, v);
  }
}`;

class PerlinNoise {
  private perm: number[] = [];

  constructor(seed: number = Math.random() * 256) {
    this.perm = this.generatePermutationTable(seed);
  }

  private generatePermutationTable(seed: number): number[] {
    const table = new Array(512);
    const perm = new Array(256).fill(0).map((_, i) => i);

    let random = seed;
    for (let i = 255; i > 0; i--) {
      random = (random * 16807) % 2147483647;
      const j = random % (i + 1);
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }

    for (let i = 0; i < 512; i++) {
      table[i] = perm[i & 255];
    }

    return table;
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return (h & 1 ? -u : u) + (h & 2 ? -2.0 * v : 2.0 * v);
  }

  noise(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = this.fade(x);
    const v = this.fade(y);

    const aa = this.perm[X] + Y;
    const ab = this.perm[X] + Y + 1;
    const ba = this.perm[X + 1] + Y;
    const bb = this.perm[X + 1] + Y + 1;

    const gradAA = this.grad(this.perm[aa], x, y);
    const gradBA = this.grad(this.perm[ba], x - 1, y);
    const gradAB = this.grad(this.perm[ab], x, y - 1);
    const gradBB = this.grad(this.perm[bb], x - 1, y - 1);

    const lerpX1 = this.lerp(gradAA, gradBA, u);
    const lerpX2 = this.lerp(gradAB, gradBB, u);

    return this.lerp(lerpX1, lerpX2, v);
  }
}

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

  const perlin = new PerlinNoise(seed.value);

  for (let x = 0; x < 256; x++) {
    for (let y = 0; y < 256; y++) {
      const value = (perlin.noise(x / 64, y / 64) + 1) * 128;
      const red = value;
      const green = value;
      const blue = value;
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

        <PrismEditor class="my-editor" line-numbers v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />

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
  max-height: 24rem;
  font-size: 0.8em;
}
</style>