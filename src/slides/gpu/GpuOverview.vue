<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      GPU Overview
    </template>

    <template v-slot:default>
      <div>
      <h1 class="is-size-4"></h1>
      <ul>
        <li>Draw scanlines to the screen one-by-one and maintain the GPUs internal state, in sync with the CPU</li>
        <li>For each pixel in the scanline, determine what color to draw based on tile data, drawing state, priority, and palette</li>
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