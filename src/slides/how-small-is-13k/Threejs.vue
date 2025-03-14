<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      How small is 13kb?
    </template>

    <template v-slot:default>
      <div class="full-height flex-column is-justify-content-center is-align-items-center">
        <img src="./threejs.png" />
      </div>
      Three.js zipped is ~13x the size the game is allowed to
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
</style>