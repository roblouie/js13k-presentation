<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Basic Lighting
    </template>

    <template v-slot:default>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  font-size: 1.7em;
  padding: 0 2em;
}

li {
  margin-bottom: 1em;
}

iframe {
  aspect-ratio: 16 / 9;
  width: auto;
  height: 100%;
}
</style>