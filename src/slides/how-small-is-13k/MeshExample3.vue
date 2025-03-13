<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      How small is 13kb?
    </template>

    <template v-slot:default>
      <img src="./texture-mapping.png" />
      Texture UV
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