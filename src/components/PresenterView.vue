<script setup lang="ts">
import {broadcastCommand, routePosition} from "../presentation-display/presentation-controls.ts";
import {useRouter} from "vue-router";
import {slideRoutes} from "../slides/slide-routes.ts";
import {computed, onMounted} from "vue";
import {useRunOncePer} from "../utils.ts";

const { runOncePer, allowRerun } = useRunOncePer();

onMounted(() => {
  window.onkeydown = (event: KeyboardEvent) => {
    runOncePer(() => {
      if (event.key === 'ArrowLeft') {
        onPrevClick();
      } else if (event.key === 'ArrowRight') {
        onNextClick()
      }
    }, 300);
  };

  window.onkeyup = allowRerun;
})

function onNextClick() {
  if (routePosition.value < slideRoutes.length - 1) {
    routePosition.value++;
    localStorage.setItem('js13k_presentation_slide', routePosition.value.toString())
  }

  broadcastCommand({ command: 'Next' });
}

function onPrevClick() {
  if (routePosition.value >= 1) {
    routePosition.value--;
    localStorage.setItem('js13k_presentation_slide', routePosition.value.toString())
  }
  broadcastCommand({ command: 'Prev' });
}

const router = useRouter();

function launchDisplay() {
  const routeData = router.resolve(slideRoutes[0]);
  window.open(routeData.href, '_blank');
}

const activeSlideRoute = computed(() => {
  return slideRoutes[routePosition.value];
})
</script>

<template>
  <button class="button" @click="onPrevClick">Previous</button>
  <button class="button" @click="onNextClick">Next</button>

  <button class="button" @click="launchDisplay">Launch Display</button>

  <div>
    <ul>
      <li v-for="note in activeSlideRoute.meta.notes" :key="note" style="white-space: pre">{{ note }}</li>
    </ul>
  </div>
</template>

<style scoped>

</style>
