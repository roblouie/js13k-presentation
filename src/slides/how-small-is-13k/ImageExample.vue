<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      How small is 13kb?
    </template>

    <template v-slot:default>
      <img src="./sky.png" />
      240x160 low res sky png (lossless compression set to max)
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  font-size: 1.7em;
  padding: 0 2em;
}

img {
  height: 100%;
}

li {
  margin-bottom: 1em;
}
</style>