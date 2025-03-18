<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Depth Buffer From Light
    </template>

    <template v-slot:default>
      <div class="is-flex-grow-1 is-flex flex-column is-justify-content-center is-align-items-center">

        <img src="./depth-buffer-2.png" />
      </div>
      <p>Testing a pixel during render against it's position in the depth buffer</p>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  font-size: 1.7em;
  padding: 0 2em;
}

img {
  height: 20em;
}

li {
  margin-bottom: 1em;
}
</style>