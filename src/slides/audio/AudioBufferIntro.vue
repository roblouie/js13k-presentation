<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {computed, onMounted, ref, useTemplateRef, watch} from "vue";
import {useDebounce} from "@/utils.ts";

const code = ref(`const audioCtx = new AudioContext();
const rate = audioCtx.sampleRate;
const myArrayBuffer = audioCtx.createBuffer(1, rate, rate);
const bufferData = myArrayBuffer.getChannelData(0);


for (let i = 0; i < bufferData.length; i++) {
  bufferData[i] = Math.random();
}

const source = audioCtx.createBufferSource();
source.buffer = myArrayBuffer;
source.connect(audioCtx.destination);
source.start();`);

const canvasElement = useTemplateRef<HTMLCanvasElement>('canvas');

const [debounce, clearDebounce] = useDebounce();

onMounted(playAudioAndDrawToCanvas);

watch(code, () => {
  debounce(playAudioAndDrawToCanvas, 800);
});

function playAudioAndDrawToCanvas() {
  if (!canvasElement.value) {
    return;
  }

  const context = canvasElement.value.getContext('2d');
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.beginPath();
  context.moveTo(0, 0);
  context.moveTo(0, 200);
  context.lineWidth = 5;
  context.strokeStyle = 'white';

  try {
    const func = eval(`(function audio() { ${code.value} return myArrayBuffer; })`);
    const bufferData = func().getChannelData(0);
    bufferData.slice(0, Math.floor(bufferData.length / 20)).forEach((val, index) => {
      context.lineTo(index / 1.5, val * -195 + 200);
    });
    context.stroke();
  } catch(e) {
    console.log(e.value);
  }
}

</script>

<template>
  <BaseSlideTemplate>

  <template v-slot:default>
    <div class="is-flex is-align-items-center" style="height: 100vh; padding: 3em 2em 3em 2em">

      <PrismEditor class="my-editor" style="width: 65vw; font-size: 0.8em;" v-model="code" :highlight="code => highlight(code, languages.js, 'js')" />

      <div style="width: 30vw; text-align: center; font-size: 1em;">
        <canvas ref="canvas" width="400" height="400" />
      </div>
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>
canvas {
  border: 2px solid gray;
}
</style>