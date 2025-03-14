<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {onMounted, ref, watch} from "vue";
import {highlight, languages} from 'prismjs';
import {PrismEditor} from "vue-prism-editor";

const canvas = ref<HTMLCanvasElement>(null);

// const fract = (x: number) => x - Math.floor(x);

const code = ref(`function seededRandom(x) {
  const fract = (n) => n - Math.floor(n);
  return fract(Math.sin(x) * 1);
}`);

onMounted(drawLine);

watch(code, drawLine);

function drawLine() {
  const context = canvas.value!.getContext('2d')!;

  const { width, height } = context.canvas;

  context.clearRect(0, 0, width, height);
  context.beginPath();

  context.moveTo(0, height / 2);

  try {
    let seededRandom;
    eval(`seededRandom = ${code.value}`);

    for (let x = 0; x < width; x++) {
      const virtualX = x / 75;
      const y = seededRandom(virtualX);
      context.lineTo(x, y * 200 + (height / 2) - 200);
    }
  } catch(e) {
    console.warn('invalid code');
  }



  context.strokeStyle = "#ffffff";
  context.lineWidth = 1;
  context.stroke();
}



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
      <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.js, 'js')" />
    </template>
  </BaseSlideTemplate>

</template>

<style scoped>
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;
  width: auto;
  max-width: 100%;
  min-width: 40em;

  height: auto;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  line-height: 1.5;
  padding: 1em;
}


</style>

<style>
/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>