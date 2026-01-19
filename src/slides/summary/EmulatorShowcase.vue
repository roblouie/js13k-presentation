<script setup lang="ts">
import {useTemplateRef} from "vue";
import { Gameboy } from "@/gameboy.ts";
import BaseSlideTemplate from "@/BaseSlideTemplate.vue";

const canvas = useTemplateRef('canvas');

async function onFileChange(event: InputEvent) {
  const gameboy = new Gameboy();

  if (event.target.files && event.target.files[0]) {
    // Convert the selected file into an array buffer
    const rom = await fileToArrayBuffer(event.target.files[0]);

    // load game
    gameboy.loadGame(rom);

    gameboy.apu.enableSound();

    const context = canvas.value.getContext('2d')!;
    gameboy.onFrameFinished((imageData: ImageData) => {
      context.putImageData(imageData, 0, 0);
    });

    gameboy.run(); // Run the game
  }
}

function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);

    fileReader.onerror = () => {
      fileReader.abort();
      reject(new Error('Error parsing file'))
    }

    fileReader.readAsArrayBuffer(file);
  });
}
</script>

<template>
  <div style="height: 100vh;" class="is-flex is-flex-direction-column is-justify-content-space-evenly is-align-items-center">
    <input type="file" ref="fileInput" @change="onFileChange" />
    <canvas width="160" height="144" ref="canvas" />
  </div>
</template>

<style scoped>
canvas {
  width: 40vw;
  //image-rendering: pixelated;
}

input {
  font-size: 1.2em;
  width: 80vw;
}
</style>