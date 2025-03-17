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
        <img src="./identity-matrix.png" />
      </div>
      <p>The identity matrix has 1s in a diagonal and the rest 0.</p>
      <p>Any vector times this matrix is the original vector. Can you think of what else we could do with this diagonal pattern?</p>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>