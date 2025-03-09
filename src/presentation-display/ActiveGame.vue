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
  <div class="full-wrapper content">
    <router-view v-slot="{ Component }">
        <keep-alive include="PlayerView">
            <component :is="Component" />
        </keep-alive>
    </router-view>
  </div>
</template>

<style>
.full-wrapper a {
  color: white;
  text-decoration: none;
}
</style>

<style scoped>

.full-wrapper {
  height: 100vh;
  overflow: hidden;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  z-index: -2;
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
