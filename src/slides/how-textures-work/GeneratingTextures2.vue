<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {onMounted, ref} from "vue";
import Prism from 'prismjs';
import {EnhancedImageData} from "../../utils.ts";

const canvas = ref<HTMLCanvasElement>(null);

Prism.highlightAll(); // Re-runs syntax highlighting

const fract = (x: number) => x - Math.floor(x);

onMounted(() => {
  Prism.highlightAll(); // Re-runs syntax highlighting

  const context = canvas.value!.getContext('2d')!;

  const { width, height } = context.canvas;

  context.clearRect(0, 0, width, height);
  context.beginPath();

  context.moveTo(0, height / 2);

  for (let x = 0; x < width; x++) {
    const virtualX = x / 75;
    const y = fract(Math.sin(virtualX) * 9_000);      //height / 2 + 100 * Math.sin((x * frequency * Math.PI * 2) / width);
    context.lineTo(x, y * 200 + (height / 2) - 200);
  }

  context.strokeStyle = "#ffffff";
  context.lineWidth = 1;
  context.stroke();
});

</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Random number
    </template>

    <template v-slot:default>

        <canvas ref="canvas" width="500" height="500" />

<!--      TODO: Make editable if possible in reasonable time-->

<!--      TODO: Add input you can input number and print output-->

<!--      TODO: Show example of drawing like 8x8 color tiles with Math.random vs this formula-->
      <pre><code class="language-javascript">const fract = (n: number) => n - Math.floor(n);
const y = fract(Math.sin(x) * 1)</code></pre>
    </template>
  </BaseSlideTemplate>

</template>

<style scoped>

</style>