<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      How small is 13kb?
    </template>

    <template v-slot:default>
      <div  class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center full-height">
        <div class="subtext"></div>
        <img src="./ps1.png" />

        <div class="subtext mt-6 has-text-centered">About 400 vertices is as big as the entire game is allowed to be</div>
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
img {
  flex-grow: 1;
}

.subtext {
  font-size: 1.7em;
}

li {
  margin-bottom: 1em;
}
</style>