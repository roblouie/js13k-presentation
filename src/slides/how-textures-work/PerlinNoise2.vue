<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Perlin Noise
    </template>

    <template v-slot:default>
      <div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly">
        <img src="./perlin-grid.png" style="height: 17em; margin-bottom: 2em;" />
        <div>
          Instead of using our seeded random number generator to generate pixels, we generate unit vectors
          on a grid.
        </div>
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  font-size: 1.5em;
}
</style>