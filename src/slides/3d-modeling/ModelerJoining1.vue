<script setup lang="ts">

import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

c

const code = ref(`new MoldableCube(10, 10, 10, 1, 1, 1)`);

// const runCodeComputed = computed(() => {
//   return new Function('MoldableCube', `
//   return ${code.value}
// `);
// })



onMounted(() => {

});
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