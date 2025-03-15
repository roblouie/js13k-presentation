<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Perlin Noise
    </template>

    <template v-slot:default>
      <div class="is-flex is-flex-direction-row is-align-items-center is-justify-content-space-evenly">
        <img src="./single-pixel-perlin.png" class="mr-6" style="height: 17em;" />
        <div>
          For each pixel:
          <ul class="mt-3">
            <li>
              Find the direction from the pixel to each corner of it's cell in the grid
            </li>
            <li>
              Calculate the dot product between each pixel <-> corner direction and each corner's direction.
              In plain terms, how much does the grid corner point back towards the pixel arrow, on a scale of -1 to 1.
            </li>
            <li>
              Use smoothstep or Perlin's own fade function to interpolate the x and y differences, then interpolate
              that interpolation to get a single value. This ensures a smooth transition between grid cells.
            </li>
          </ul>
        </div>
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
</style>