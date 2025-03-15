<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {ref} from "vue";

const isBorderOn = ref(false);
const isRotated = ref(false);

function showBorder() {
  isBorderOn.value = !isBorderOn.value;
}

function rotate() {
  isRotated.value = !isRotated.value;
}
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Tiling
    </template>

    <template v-slot:default>
      <div class="is-flex flex-column is-justify-content-center is-align-items-center is-flex-wrap-wrap" style="padding: 0 8em">
        <img @click="showBorder" src="./texture-example-2.svg"  class="tile-image" style="height: 12em;" :class="{ 'bordered': isBorderOn }" />
        <img @click="rotate" src="./texture-example-2.svg" style="height: 12em;" class="tile-image" :class="{ 'bordered': isBorderOn, 'rotate': isRotated }" />
        <img src="./texture-example-2.svg" style="height: 12em;"  class="tile-image" :class="{ 'bordered': isBorderOn }" />
        <img src="./texture-example-2.svg" style="height: 12em;"  class="tile-image" :class="{ 'bordered': isBorderOn }" />
        <img src="./texture-example-2.svg" style="height: 12em;"  class="tile-image" :class="{ 'bordered': isBorderOn }" />
        <img src="./texture-example-2.svg" style="height: 12em;"  class="tile-image" :class="{ 'bordered': isBorderOn }" />
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  font-size: 1.5em;
}

.bordered {
  border: 1px solid white;
}

.rotate {

  animation:spin 2s forwards;

}

img {
  display: block;
  margin-left: -1px;
}

@keyframes spin {
  100% {
    transform:rotate(90deg);
  }
}
</style>