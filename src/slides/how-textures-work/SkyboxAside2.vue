<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Skybox
    </template>

    <template v-slot:default>
      <div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly">
        <img src="./skybox.png" style="height: 21em;" />
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  font-size: 1.5em;
}
</style>