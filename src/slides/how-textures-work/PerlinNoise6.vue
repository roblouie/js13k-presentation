<script setup lang="ts">

import {onMounted, ref} from "vue";
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import "prismjs/components/prism-typescript";
import {PrismEditor} from "vue-prism-editor";
import {EnhancedImageData} from "../../utils.ts";

const canvas = ref<HTMLCanvasElement>(null);

const code = `import { EnhancedDOMPoint } from '@/engine/enhanced-dom-point';
import { doTimes, hexToRgba } from "@/engine/helpers";

export const enum NoiseType {
  Perlin,
  Turbulent,
  Edge,
  Blobs,
  Lines,
}

class NoiseMaker {
  private perms: number[] = [];
  private directions: EnhancedDOMPoint[] = [];

  constructor() {
    for (let i = 0; i < 256; i++) {
      const val = i * 2.0 * Math.PI / 256;
      this.directions.push(new EnhancedDOMPoint(
        Math.cos(val),
        Math.sin(val),
        Math.cos(val),
      ));
    }
  }

  getDirection(permsIndex: number) {
    return this.directions[this.perms[permsIndex]];
  }

  seedVal = -1;
  seed(seedValue: number) {
    this.seedVal = seedValue;
    const initialPerm: number[] = [];
    for (let i = 0; i < 256; i++) {
      initialPerm.push(i);
    }
    const shuffledPerm = this.shuffle(initialPerm, seedValue);
    this.perms = [...shuffledPerm, ...shuffledPerm];
  }

  private shuffle(array: number[], initialSeed: number) {
    let currentIndex = array.length;
    let randomIndex;
    let seed = initialSeed;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      const randomNumber = this.randomNumber(seed);
      randomIndex = Math.floor(Math.abs(randomNumber) * currentIndex);
      // Floating point math causes deviation across browsers, so change the random number to a whole number before seeding again
      seed = Math.trunc(randomNumber * 10000);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  private noise(pixelPosition: EnhancedDOMPoint, per: number) {
    const difference = new EnhancedDOMPoint();

    const step = (dist: number) => 1 - 6*dist**5 + 15*dist**4 - 10*dist**3;

    const surflet = (gridPosition: EnhancedDOMPoint) => {
      difference.subtractVectors(pixelPosition, gridPosition);
      const perm = gridPosition.modifyComponents(component => Math.trunc(component) % per);
      let hashed = this.perms[this.perms[this.perms[perm.x] + perm.y] + perm.z];

      const grad = difference.dot(this.directions[hashed]);

      const poly = difference.modifyComponents(component => step(Math.abs(component)));
      return poly.x * poly.y * poly.z * grad;
    }

    const ints = new EnhancedDOMPoint();
    const gridPos = new EnhancedDOMPoint();
    ints.set(pixelPosition).modifyComponents(Math.trunc)

    let total = 0;
    doTimes(2, z => {
      doTimes(2, y => {
        doTimes(2, x => {
          gridPos.set(ints.x + x, ints.y + y, ints.z + z);
          total += surflet(gridPos);
        })
      })
    });
    return total;
  }

  private pixelPosition = new EnhancedDOMPoint();
  private fBm(position: EnhancedDOMPoint, per: number, octs: number, noiseType: NoiseType): number {
    let value = 0;
    const baseMethod = (o: number) => 0.5**o * this.noise(this.pixelPosition.set(position.x*2**o, position.y*2**o, position.z*2**o), per*2**o);
    for (let o = 0; o < octs; o++) {
      switch (noiseType) {
        case NoiseType.Perlin:
          value += baseMethod(o);
          break;
        case NoiseType.Turbulent:
          value += Math.abs(baseMethod(o));
          break;
        case NoiseType.Edge:
          value -= Math.abs(baseMethod(o));
          break;
        case NoiseType.Blobs:
          value = baseMethod(o);
          break;
        case NoiseType.Lines:
          value = Math.abs(baseMethod(o));
          break;
      }
    }
    return value;
  }

  noiseLandscape(size: number,frequency: number, octals: number, noiseType: NoiseType, scale: number) {
    const values = [];
    const position = new EnhancedDOMPoint();
    for (let verticalPosition = 0; verticalPosition < size; verticalPosition++) {
      for (let horizontalPosition = 0; horizontalPosition < size; horizontalPosition++) {
        values.push(this.fBm(position.set(horizontalPosition * frequency, verticalPosition * frequency), Math.trunc(size * frequency), octals, noiseType) * scale);
      }
    }
    return values;
  }

  noiseCache: {[key: string]: number} = {};
  noiseImage(
    size: number,
    frequency: number,
    octals: number,
    noiseType: NoiseType,
    color: string,
    colorScale = 128,
    isInverted = false,
    horizontalDimension: "x" | "y" | "z" = 'x',
    verticalDimension: "x" | "y" | "z" = 'y',
    sliceDimension: "x" | "y" | "z" = 'z',
    slice = 0,
    flip = false): ImageData {
    const [red, green, blue] = hexToRgba(color);
    const imageData = new ImageData(size, size);
    let imageDataIndex = 0;

    const position = new EnhancedDOMPoint();
    const flipBase = size - 1;
    for (let verticalPosition = 0; verticalPosition < size; verticalPosition++) {
      for (let horizontalPosition = 0; horizontalPosition < size; horizontalPosition++) {
        position[horizontalDimension] = (flip ? flipBase - horizontalPosition : horizontalPosition) * frequency;
        position[verticalDimension] = verticalPosition * frequency;
        position[sliceDimension] = slice * frequency;

        const per = Math.trunc(size * frequency);
        const cacheKey = position.toArray().toString() + per + octals + noiseType;
        const cachedNoise = this.noiseCache[cacheKey];

        const noiseValue = cachedNoise ?? this.fBm(position, per, octals, noiseType);
        if (!cachedNoise) {
          this.noiseCache[cacheKey] = noiseValue;
        }
        const computed = noiseValue * colorScale + colorScale;
        imageData.data[imageDataIndex] = red;
        imageData.data[imageDataIndex + 1] = green;
        imageData.data[imageDataIndex + 2] = blue;
        imageData.data[imageDataIndex + 3] = isInverted ? 255 - computed : computed;
        imageDataIndex += 4;
      }
    }

    return imageData;
  }

  randomNumber(seed: number): number {
    return (Math.sin(seed) * 800000) % 1;
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
      <PrismEditor class="my-editor" line-numbers v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
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
  font-size: 0.5em;
}
</style>