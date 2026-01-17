<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      GPU Every Frame (16.66 ms)
    </template>

    <template v-slot:default>
      <div>
      <h1 class="is-size-4"></h1>
      <ul>
        <li>Sample a pixel from background, window, and sprite layer 160 times each, per-scanline</li>
        <li>Sort those 480 pixels (160 x 3 layers) by priority to produce the final 160 pixels for the scanline</li>
        <li>Do this for each of 144 scanlines, resulting in 69,120 pixel samples to produce the final 23,040 (160x144) pixel frame </li>

      </ul>
      </div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  list-style: disclosure-closed;
  margin: 1em;
  font-size: 2em;
}

li {
  margin-bottom: 0.5em;
}
</style>