<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      How small is 13kb?
    </template>

    <template v-slot:default>
      <div  class="centered-with-header is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
        <div class="answer has-text-weight-bold">87.8 kb</div>
        <div class="subtext">~6.75 x the size the entire game is allowed to be</div>
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
.answer {
  font-size: 7em;
}

.subtext {
  font-size: 2em;
}

li {
  margin-bottom: 1em;
}
</style>