<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {computed, onMounted, ref, watch} from "vue";
import {highlight, languages} from 'prismjs';
import {PrismEditor} from "vue-prism-editor";
import {useDebounce} from "../../utils.ts";

const canvas = ref<HTMLCanvasElement>(null);

const code = ref(`function seededRandom(x) {
  return Math.sin(x);
}`);

onMounted(drawLine);

const [debounce] = useDebounce();

watch(code, () => {
  debounce(drawLine, 300);
});

function drawLine() {
  const context = canvas.value!.getContext('2d')!;

  const { width, height } = context.canvas;

  context.clearRect(0, 0, width, height);

  context.beginPath();
  context.moveTo(0, height / 2);
  context.lineTo(width, height / 2);
  context.strokeStyle = "#777777dd";
  context.lineWidth = 1;
  context.stroke();

  context.beginPath();
  context.moveTo(width / 2, 0);
  context.lineTo(width / 2, height);
  context.strokeStyle = "#777777dd";
  context.lineWidth = 1;
  context.stroke();

  context.beginPath();


  try {
    let seededRandom;
    eval(`seededRandom = ${code.value}`);

    context.moveTo(seededRandom(0), height / 2);

    for (let x = 0; x < width; x++) {
      const virtualX = x / 79.5;
      const y = seededRandom(virtualX);
      context.lineTo(x, y * -200 + (height / 2));
    }
  } catch(e) {
    console.warn('invalid code');
  }

  context.strokeStyle = "#00d1b2";
  context.lineWidth = 2;
  context.stroke();
}

const input = ref(0);
const output = computed(() => {
  try {
    let seededRandom;
    eval(`seededRandom = ${code.value}`);
    return seededRandom(input.value);
  } catch(e) {
    return '';
  }

})

</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Random Number
    </template>

    <template v-slot:default>
      <div class="editor-result-horizontal">

        <canvas ref="canvas" width="500" height="500" />

<!--      TODO: Add input you can input number and print output-->

<!--      TODO: Show example of drawing like 8x8 color tiles with Math.random vs this formula-->
        <div style="width: 100%">
          <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.js, 'js')" />

          <div class="is-flex is-align-items-center mt-3">

            <div style="width: 6em;" class="mr-6">
              <input class="input" placeholder="Input" type="number" v-model="input" />
            </div>

            <div style="flex-grow: 1">
              Output: {{ output }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseSlideTemplate>

</template>

<style scoped>
canvas {
  width: 20em;
  height: 20em;
}

</style>

<style>

</style>