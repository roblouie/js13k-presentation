<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

const cameraCanvas = ref<HTMLCanvasElement>(null);
const isWireframe = ref(false);


let cube;
let item;

let animationFrameId = -1;

gl.canvas.width = 1024;
gl.canvas.height = 1024;
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

const code = ref(`new MoldableCube(10, 10, 10, 1, 1, 1)
  .merge(
    new MoldableCube(5, 15, 10, 1, 1, 1)
    .translate_(7.5, 2.5)
    .done_()
  ).done_()`);

// const runCodeComputed = computed(() => {
//   return new Function('MoldableCube', `
//   return ${code.value}
// `);
// })



onMounted(() => {

});


onUnmounted(() => cancelAnimationFrame(animationFrameId));
</script>

<template>

  <div class="is-flex is-align-items-center" style="height: 100vh; padding: 3em 2em 3em 2em">
    <div>
    <label class="checkbox">
      <input type="checkbox" v-model="isWireframe" />
      Wireframe
    </label>
    <canvas
      tabindex="0"
      width="1024"
      height="1024"
      ref="cameraCanvas"
      @mousemove="onCameraMouseMove"
      oncontextmenu="return false;"
    ></canvas>
    </div>
    <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.js, 'js')" />
  </div>
</template>
<style scoped>
canvas {
  border: 1px solid gray;
  height: 25em;
  outline: none;
}

.my-editor {
  height: 25em;
  margin-left: 2em;
  margin-top: 1em;
}
</style>