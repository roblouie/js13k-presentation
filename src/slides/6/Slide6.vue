<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Surpassing Limitations
    </template>

    <template v-slot:default>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/WpG9XIfFkE0?si=CTUUAwkJcgEw_w32&amp;start=617&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>    </template>
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