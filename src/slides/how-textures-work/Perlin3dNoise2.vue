<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Generating 3D Noise
    </template>

    <template v-slot:default>
      <div  class="centered-with-header is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
        <div class="subtext">256 x 256 x 256</div>
        <div class="answer has-text-weight-bold has-text-primary has-text-centered">16,777,216 pixels</div>
        <div class="subtext">134,217,728 dot products</div>
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
.answer {
  font-size: 6em;
}

.subtext {
  font-size: 2em;
}

li {
  margin-bottom: 1em;
}
</style>