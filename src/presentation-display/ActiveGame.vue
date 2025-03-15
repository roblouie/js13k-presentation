<script setup lang="ts">
import {onHostBroadcast, routePosition} from "./presentation-controls.ts";
import { useRouter } from "vue-router";
import {slideRoutes} from "../slides/slide-routes.ts";
import {onMounted} from "vue";

onMounted(wireBroadcasts);

function wireBroadcasts() {
  const router = useRouter();

  onHostBroadcast((event) => {
    if (event.data.command === 'Next' && routePosition.value < slideRoutes.length - 1) {
      routePosition.value++;
    }

    if (event.data.command === 'Prev' && routePosition.value >= 1) {
      routePosition.value--;
    }

    // if (event.data.command === 'Jump' && routePosition.value < (slideRoutes.length - 1)) {
    //   const roundOffset = roundRouteOffsets[event.data.to];
    //   if (roundOffset) {
    //     routePosition.value = roundOffset;
    //   }
    // }
    router.replace(slideRoutes[routePosition.value]);
  });
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style scoped>

.full-wrapper {
  padding: 2em;
  height: 100vh;
  overflow: hidden;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main {
  height: 100vh;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: -1;
}
</style>
