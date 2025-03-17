<script setup lang="ts">
import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Quick 3D Intro
    </template>

    <template v-slot:default>
      <div class="is-flex-grow-1 is-flex flex-column is-justify-content-center is-align-items-center">
        <img src="./matrix-vector.png" />
      </div>
      <p>A matrix can also be multiplied by a vector, and the result is another vector</p>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>