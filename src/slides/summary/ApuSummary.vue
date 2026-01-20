<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      APU Every Frame (16.66 ms)
    </template>

    <template v-slot:default>
      <div>
      <h1 class="is-size-4"></h1>
      <ul>
        <li>Step all 4 sound function per instruction (15,000 - 20,000 times) to update the position in the duty cycle, custom wave, or noise, to produce the desired frequency</li>
        <li>Sample all 4 sound functions 735 times, resulting in 2940 samples that are averaged together for the final sound</li>
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