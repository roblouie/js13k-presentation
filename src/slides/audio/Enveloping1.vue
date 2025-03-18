<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Enveloping
    </template>

    <template v-slot:default>
      <div class="is-flex-grow-1 is-flex flex-column is-justify-content-center is-align-items-center">

        <img src="./ADSR_parameter.svg" />
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
img {
  height: 25em;
}
</style>