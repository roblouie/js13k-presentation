<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";

const audioPlayer = ref<HTMLAudioElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;

onMounted(getQuestion);

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});

async function getQuestion() {
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 1024;
  const sourceNode = audioCtx.createMediaElementSource(audioPlayer.value!);
  sourceNode.connect(analyser);
  analyser.connect(audioCtx.destination);

  const bufferLength = analyser.frequencyBinCount;

  const data = new Uint8Array(bufferLength);

  const context = canvas.value!.getContext('2d')!;
  const canvasSize = new DOMPoint(canvas.value!.width, canvas.value!.height);
  const barWidth = (canvasSize.x / data.length) * 1.6;
  const canvasCenterX = canvasSize.x / 2;

  const getSoundData = () => {
    analyser.getByteFrequencyData(data);
    context.clearRect(0, 0, canvasSize.x, canvasSize.y);

    let direction = 1;
    let offset = 0

    data.forEach((value, index) => {
      const barHeight = value * 3;
      const barX = canvasCenterX + barWidth * offset * direction;

      if (index % 2 === 0) {
        offset++;
      }

      direction *= -1;

      context.fillStyle = `rgba(66, 88, 255, ${value / 90})`;
      context.fillRect(barX, canvasSize.y, barWidth, -barHeight);
    });

    animationFrameId = requestAnimationFrame(getSoundData);
  };

  getSoundData();
}
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      How small is 13kb?
    </template>

    <template v-slot:default>
      <div class="full-height is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
        <canvas ref="canvas" width="1280" height="560" class="mb-4" />
        <audio autoplay="true" class="mb-3" controls ref="audioPlayer" src="/elevator-door-and-ding.mp3"></audio>
      </div>

      Six second clip of elevator
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
canvas {
  height: 18em;
}
</style>