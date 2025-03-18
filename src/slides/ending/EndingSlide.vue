<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

const cycler = ref(0);

let intervalId = 0;

onMounted(() => {
  intervalId = setInterval(() => {
    cycler.value++;
    if (cycler.value === 4) {
      cycler.value = 0;
    }
  }, 10_000);
});

onUnmounted(() => {
  clearInterval(intervalId);
})
</script>

<template>
  <transition name="fade">
<div v-if="cycler === 0"  class="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly" style="height: 100vh; position: absolute; width: 100vw;">
  <div style="font-size: 3em;">13th Floor</div>
  <div class="is-flex">
    <img src="./13th-floor-img.png" class="mr-5" />
    <img src="./13th-floor.png" />
  </div>
  <div class="has-text-centered">
  <div>2024</div>
  <div>1st Place</div>
  </div>
</div>
  </transition>

  <transition name="fade">
  <div v-if="cycler === 1" class="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly" style="height: 100vh; position: absolute; width: 100vw;">
    <div style="font-size: 3em;">Upyri</div>
    <div class="is-flex">
      <img src="./upyri-img.jpg" class="mr-5" />
      <img src="./upyri.png" />
    </div>

    <div class="has-text-centered">
      <div>2023</div>
      <div>5th Place</div>
    </div>
  </div>
  </transition>

  <transition name="fade">
  <div v-if="cycler === 2" class="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly" style="height: 100vh; position: absolute; width: 100vw;">
    <div style="font-size: 3em;">Charon Jr.</div>
    <div class="is-flex">
      <img src="./charon-img.jpg" class="mr-5" />
      <img src="./charon-jr.png" />
    </div>
    <div class="has-text-centered">
      <div>2022</div>
      <div>6th Place</div>
    </div>
  </div>
  </transition>


  <transition name="fade">
  <div v-if="cycler === 3" class="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly" style="height: 100vh; position: absolute; width: 100vw;">
    <div style="font-size: 3em;">Andrew Adamson YouTube</div>
    <img src="./webgl.png" />
    <div class="has-text-centered">
      <div>Excellent resource for learning WebGL 2</div>
    </div>
  </div>
  </transition>
</template>

<style scoped>
img {
  height: 15em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>