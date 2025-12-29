<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Early Computers
    </template>

    <template v-slot:default>
      <img src="./early-pc-2.png" />
      <div class="mt-2">This has remained true even as computers have scaled up</div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
img {
  height: 24em;
}
</style>