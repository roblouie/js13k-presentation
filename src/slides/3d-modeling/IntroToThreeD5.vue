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
        <img src="./scale-matrix.png" />
      </div>
      <p>Items in the diagonal will scale vectors</p>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>