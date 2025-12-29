<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Early Computers
    </template>

    <template v-slot:default>
      <img src="./early-pc.png" />
      <div class="mt-2">Computers count in binary. 0 / 1 (On / Off) only.</div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
img {
  height: 24em;
}
</style>