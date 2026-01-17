<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import AudioCycleVisualizer from "@/slides/audio/AudioCycleVisualizer.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Visualization
    </template>

    <template v-slot:default>
      <div class="is-flex-grow-1 is-flex flex-column is-justify-content-center is-align-items-center">

        <AudioCycleVisualizer />
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
img {
  height: 25em;
}
</style>