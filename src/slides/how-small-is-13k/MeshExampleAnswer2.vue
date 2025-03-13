<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      How small is 13kb?
    </template>

    <template v-slot:default>
      <div  class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
        <div class="answer has-text-weight-bold has-text-link">Position X - 4 bytes</div>
        <div class="answer has-text-weight-bold has-text-link">Position Y - 4 bytes</div>
        <div class="answer has-text-weight-bold has-text-link">Position Z - 4 bytes</div>
        <div class="answer has-text-weight-bold has-text-primary">Normal X - 4 bytes</div>
        <div class="answer has-text-weight-bold has-text-primary">Normal Y - 4 bytes</div>
        <div class="answer has-text-weight-bold has-text-primary">Normal Z - 4 bytes</div>
        <div class="answer has-text-weight-bold has-text-info">Texture U - 4 bytes</div>
        <div class="answer has-text-weight-bold has-text-info">Texture V - 4 bytes</div>

        <div class="subtext mt-6">32 bytes gets you one point of a polygon</div>
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
.answer {
  font-size: 1.5em;
}

.subtext {
  font-size: 2em;
}

li {
  margin-bottom: 1em;
}
</style>