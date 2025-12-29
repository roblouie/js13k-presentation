<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Early Computers
    </template>

    <template v-slot:default>
      <img src="./early-pc-4.png" />
      <div class="mt-2">Soon computers needed to display characters</div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
img {
  height: 24em;
}
</style>